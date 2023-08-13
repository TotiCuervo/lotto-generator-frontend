import { useLotteryContext } from '@/context/LotteryContext'
import React from 'react'

interface IProps {
    number?: number
    state?: 'main' | 'special'
    size?: 'small' | 'medium' | 'large' | 'xlarge'
}

export default function Ball({
    number,
    state = 'main',
    size = 'medium',
}: IProps) {
    const { currentType } = useLotteryContext()

    const colorTransition =
        state === 'main'
            ? 'from-slate-200 to-slate-300'
            : `from-${currentType.fromColor} to-${currentType.activeColor}`

    const sizeChart = {
        small: 'h-10 w-10',
        medium: 'h-12 w-12',
        large: 'h-12 w-12 md:h-16 md:w-16',
        xlarge: 'h-20 w-20',
    }

    const sizeStyle = sizeChart[size]

    const textColor = state === 'main' ? 'text-black' : currentType.textColor

    return (
        <div
            className={`${sizeStyle} rounded-full bg-gradient-to-br ${colorTransition} flex items-center justify-center`}
        >
            <p className={`text-base font-bold ${textColor}`}>
                {number ? number : '?'}
            </p>
        </div>
    )
}
