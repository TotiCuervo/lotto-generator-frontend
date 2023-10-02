import { NextResponse } from "next/server";
import getNumbers from "@/methods/getNumbers";
import enoughNumbersAreLeft from "@/methods/enoughNumbersAreLeft";
import { Generation } from "@/types/Generation";

export async function POST(request: Request) {
    try {
        let data = await request.json();

        if (!enoughNumbersAreLeft({ size: data.size, type: "powerball" })) {
            return NextResponse.json([]);
        }

        const generations: Generation[] = await getNumbers({
            size: data.size,
            mainMin: 1,
            mainMax: 70,
            specialMin: 1,
            specialMax: 25,
            type: "megamillions",
        });

        return NextResponse.json(generations);
    } catch (error) {
        return NextResponse.error();
    }
}
