import getRandomIntInclusive from "@/methods/getRandomIntInclusive";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getNextLotteryDate } from "./getNextLotteryDate";
import { getOrCreateCombination } from "./getOrCreateCombination";
import { CombinationInsert } from "@/types/Combination";
import { Generation } from "@/types/Generation";

interface IProps {
    size: number;
    profileId?: string;
    mainMin: number;
    mainMax: number;
    specialMin: number;
    specialMax: number;
    type: "powerball" | "megamillions";
}

type TempDraw = number[];

export default async function getNumbers({ size, profileId, mainMin, mainMax, specialMin, specialMax, type }: IProps) {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (profileId !== user?.id) {
        profileId = undefined;
    }

    const drawing_date = getNextLotteryDate(type === "powerball" ? "Powerball" : "Mega Millions");
    const drawing_date_string = drawing_date.toISOString().split("T")[0];

    if (size > 10) {
        size = 10;
    }

    let generations: Generation[] = [];

    while (generations.length < size) {
        let draw: TempDraw = [];

        for (let i = 0; i < 5; i++) {
            draw.push(getRandomIntInclusive(mainMin, mainMax, draw));
        }

        draw.sort((a, b) => a - b);

        draw.push(getRandomIntInclusive(specialMin, specialMax));

        const formattedCombination: CombinationInsert = formatDrawToCombination(draw, type);

        const combination = await getOrCreateCombination(formattedCombination, supabase);

        if (generations.filter((g) => g.combination.id === combination.id).length > 0) {
            continue;
        }

        const { data: claim, error: claimError } = await supabase
            .from("claims")
            .select("*")
            .eq("drawing_date", drawing_date_string)
            .eq("combination", combination.id)
            .maybeSingle();

        if (claimError) {
            console.log({ claimError });
            continue;
        }

        if (claim !== null) {
            continue;
        }

        const { data: generation, error: generationError } = await supabase
            .from("generations")
            .insert([
                {
                    combination: combination.id,
                    drawing_date,
                    profile: profileId,
                },
            ])
            .select("*, combination ( * )")
            .maybeSingle();

        if (generationError) {
            console.log({ generationError });
            continue;
        }

        generations.push(generation);
    }

    return generations;
}

function formatDrawToCombination(draw: TempDraw, type: "powerball" | "megamillions"): CombinationInsert {
    return {
        number_1: draw[0],
        number_2: draw[1],
        number_3: draw[2],
        number_4: draw[3],
        number_5: draw[4],
        special_number: draw[5],
        lottery: type === "powerball" ? "Powerball" : "Mega Millions",
    };
}
