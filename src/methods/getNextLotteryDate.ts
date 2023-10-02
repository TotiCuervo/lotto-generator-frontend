import { LotteryType } from "@/types/LotteryType";

export function getNextLotteryDate(type: LotteryType): Date;
export function getNextLotteryDate(type: LotteryType, stringFormat: true): string;
export function getNextLotteryDate(type: LotteryType, stringFormat?: boolean): Date | string {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    const daysOfLottery = type === "Powerball" ? [1, 3, 6] : [2, 5];

    let dayOfNextDrawing = 1;

    // If hour is greater than or equal to 22, then the next drawing is the next day
    if (hour >= 22) {
        dayOfNextDrawing = daysOfLottery.find((d) => d > day) || 1;
    } else {
        dayOfNextDrawing = daysOfLottery.find((d) => d >= day) || 1;
    }

    const daysUntilNextDrawing = dayOfNextDrawing - day;

    const nextDrawDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilNextDrawing);
    nextDrawDate.setHours(22, 0, 0, 0);

    if (stringFormat) {
        return nextDrawDate.toISOString().split("T")[0];
    } else {
        return nextDrawDate;
    }
}
