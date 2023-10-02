import { Database } from "@/types/schema";
import { LotteryType } from "./LotteryType";

type _Combination = Database["public"]["Tables"]["combinations"]["Row"];

export interface Combination extends _Combination {
    lottery: LotteryType;
}

export type CombinationInsert = Database["public"]["Tables"]["combinations"]["Insert"];
