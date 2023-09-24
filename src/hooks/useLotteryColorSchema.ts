import { LotteryType } from '@/types/LotteryType'

export const powerballSchema = {
    baseColor: 'red-500',
    activeColor: 'red-600',
    fromColor: 'red-400',
    textColor: 'text-white',
    name: 'Powerball',
}

export const megaMillionsSchema = {
    baseColor: 'yellow-500',
    activeColor: 'yellow-600',
    fromColor: 'yellow-400',
    textColor: 'text-black',
    name: 'Mega Millions',
}

export default function useLotteryColorSchema(type: LotteryType) {
    const schema = type === 'Powerball' ? powerballSchema : megaMillionsSchema
    const alternativeSchema =
        type === 'Powerball' ? megaMillionsSchema : powerballSchema

    return {
        schema,
        alternativeSchema,
    }
}
