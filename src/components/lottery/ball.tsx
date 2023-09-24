import useLotteryColorSchema from '@/hooks/useLotteryColorSchema'
import { LotteryType } from '@/types/LotteryType'
import React from 'react'

interface IProps {
    type: LotteryType
    number?: number
    state?: 'main' | 'special'
    size?: 'small' | 'medium' | 'large' | 'xlarge'
}

export default function Ball({
    type,
    number,
    state = 'main',
    size = 'medium',
}: IProps) {
    const { schema } = useLotteryColorSchema(type)

    const colorTransition =
        state === 'main'
            ? 'from-slate-200 to-slate-300'
            : `from-${schema.fromColor} to-${schema.activeColor}`

    const sizeChart = {
        small: 'h-10 w-10',
        medium: 'h-12 w-12',
        large: 'h-12 w-12 md:h-16 md:w-16',
        xlarge: 'h-20 w-20',
    }

    const sizeStyle = sizeChart[size]

    const textColor = state === 'main' ? 'text-black' : schema.textColor

    return (
        <div
            className={`transition duration-300 ease-in-out ${sizeStyle} rounded-full bg-gradient-to-br ${colorTransition} flex items-center justify-center`}
        >
            <p
                className={`text-base font-bold transition duration-300 ease-in-out ${textColor}`}
            >
                {number ? number : '?'}
            </p>
        </div>
    )
}
