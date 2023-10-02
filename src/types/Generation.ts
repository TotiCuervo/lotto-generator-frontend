import { Database } from "@/types/schema";
import { Combination } from "./Combination";

export type _Generation = Database["public"]["Tables"]["generations"]["Row"];

export interface Generation extends Omit<_Generation, "combination"> {
    combination: Combination;
}
