import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SupabaseClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { CartItem } from "@/types/CartItem";
import { Profile } from "@/types/Profile";

interface Data {
    cartItems: CartItem[];
}

export async function POST(request: Request) {
    try {
        const supabase = createServerComponentClient({ cookies });

        const {
            data: { session },
        } = await supabase.auth.getSession();

        // If the user is not logged in, redirect them to the login page.
        if (!session) {
            return NextResponse.redirect("/login");
        }

        let data: Data = await request.json();

        // If the user is logged in, but the request doesn't have any cart items, return an error.
        if (!data.cartItems || data.cartItems.length === 0) {
            return NextResponse.error();
        }

        const { cartItems } = data;

        const pastCartItems = getAnyAreInPast(cartItems);

        // If any of the cart items are in the past, return an error.
        if (pastCartItems.length > 0) {
            return NextResponse.json(
                {
                    items: pastCartItems,
                    errorMessage: "Sorry, this ticket is for a drawing that has already happened.",
                },
                { status: 400 }
            );
        }

        const { data: profile, error: profileError } = (await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .maybeSingle()) as { data: Profile; error: any };

        if (profileError || !profile) {
            console.log(profileError, profile);
            return NextResponse.error();
        }

        // If the user doesn't have enough credits, return an error.
        if (profile.credits < cartItems.length) {
            return NextResponse.json(
                {
                    errorMessage: "Sorry, you don't have enough credits.",
                },
                { status: 500 }
            );
        }

        const { error } = await supabase.from("claims").insert(
            cartItems.map((cartItem) => {
                return {
                    profile: session!.user.id,
                    drawing_date: cartItem.drawing_date,
                    combination: cartItem.combination.id,
                };
            })
        );

        if (error) {
            const erroredItems = await findWhichErrored(cartItems, supabase);
            return NextResponse.json(
                { items: erroredItems, errorMessage: "Sorry, this number is already reserved." },
                { status: 400 }
            );
        }

        const { error: updateCreditError } = await supabase
            .from("profiles")
            .update({ credits: profile.credits - cartItems.length })
            .eq("id", profile.id);

        // If the user doesn't have enough credits, return an error.
        if (updateCreditError) {
            console.log(updateCreditError);
            return NextResponse.error();
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.error();
    }
}

async function findWhichErrored(cartItems: CartItem[], supabase: SupabaseClient<any, "public", any>) {
    const erroredItemsPromises = cartItems.map(async (item) => {
        const { data } = await supabase
            .from("claims")
            .select("*")
            .eq("drawing_date", item.drawing_date)
            .eq("combination", item.combination.id)
            .maybeSingle();

        if (data !== null) {
            return data;
        }
    });

    const erroredItems = (await Promise.all(erroredItemsPromises)).filter(Boolean);

    return erroredItems;
}

function getAnyAreInPast(cartItems: CartItem[]) {
    const now = new Date();

    const pastCartItems = cartItems.filter((item) => {
        const drawingDate = new Date(item.drawing_date);
        return drawingDate < now;
    });

    return pastCartItems;
}
