import { LotteryType } from '@/types/LotteryType'

export function getNextLotteryDate(type: LotteryType) {
    return type === 'Powerball'
        ? getPowerballNextLotteryDate()
        : getMegaMillionsNextLotteryDate()
}

function getPowerballNextLotteryDate() {
    const now = new Date()

    // find the next closest Monday, Wednesday, or Saturday, depending on the day of the week, can be today
    const day = now.getDay()
    const daysUntilNextDraw = [1, 3, 6].find((d) => d > day) || 1
    const nextDrawDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + daysUntilNextDraw
    )
    nextDrawDate.setHours(21, 59, 59, 999)

    return nextDrawDate
}

function getMegaMillionsNextLotteryDate() {
    const now = new Date()

    // find the next closest Tuesday or Friday, depending on the day of the week, can be today
    const day = now.getDay()
    const daysUntilNextDraw = [2, 5].find((d) => d > day) || 2
    const nextDrawDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + daysUntilNextDraw
    )
    nextDrawDate.setHours(21, 59, 59, 999)

    return nextDrawDate
}
