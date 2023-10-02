import { Combination, CombinationInsert } from "@/types/Combination";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getOrCreateCombination(
    combination: Combination | CombinationInsert,
    supabase: SupabaseClient<any, "public", any>
) {
    const { data: combinations, error } = await supabase
        .from("combinations")
        .select("*")
        .eq("number_1", combination.number_1)
        .eq("number_2", combination.number_2)
        .eq("number_3", combination.number_3)
        .eq("number_4", combination.number_4)
        .eq("number_5", combination.number_5)
        .eq("special_number", combination.special_number)
        .eq("lottery", combination.lottery)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (combinations !== null) {
        return combinations;
    }

    const { data: newCombination, error: newCombinationError } = await supabase
        .from("combinations")
        .insert([combination])
        .select()
        .maybeSingle();

    if (newCombinationError) {
        throw newCombinationError;
    }

    return newCombination;
}
