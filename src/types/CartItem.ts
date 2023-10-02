import { Combination } from "./Combination";

export interface CartItem {
    combination: Combination;
    drawing_date: Date;
    error?: boolean;
    errorMessage?: string;
}
