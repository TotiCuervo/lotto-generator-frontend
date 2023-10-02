import { LotteryType } from "@/types/LotteryType";

export default function convertDateToDateString(date: Date): string {
    return date.toISOString().split("T")[0];
}
