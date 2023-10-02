import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getNextLotteryDate } from "./getNextLotteryDate";

interface IProps {
    size: number;
    type: "powerball" | "megamillions";
}

const possibleCombinations = {
    powerball: 292201338,
    megamillions: 302575350,
};

export default async function enoughNumbersAreLeft({ size, type }: IProps) {
    const supabase = createServerComponentClient({ cookies });

    const drawing_date = getNextLotteryDate(type === "powerball" ? "Powerball" : "Mega Millions");

    const { data: claimedCombinations } = await supabase
        .from("claims")
        .select("*")
        .eq("lottery", type)
        .eq("drawing_date", drawing_date);

    if (!claimedCombinations) {
        return false;
    }

    return claimedCombinations.length < possibleCombinations[type] - size;
}
