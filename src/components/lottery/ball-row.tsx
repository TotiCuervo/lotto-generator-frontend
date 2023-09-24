import React from 'react'
import Ball from './ball'
import { IBallRow } from '@/types/IBallRow'
import { LotteryType } from '@/types/LotteryType'

interface IProps extends Partial<IBallRow> {
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    type: LotteryType
}

export default function BallRow({
    main,
    special,
    size = 'medium',
    type,
}: IProps) {
    const EmptyRow = () => (
        <>
            {Array.from(Array(5).keys()).map((_, index) => (
                <Ball key={index} size={size} type={type} />
            ))}
            <Ball state="special" size={size} type={type} />
        </>
    )

    const ActiveRow = () => (
        <>
            {main!.map((ball, index) => (
                <Ball key={index} number={ball} size={size} type={type} />
            ))}
            <Ball number={special!} state="special" size={size} type={type} />
        </>
    )

    return (
        <div className="flex">
            <div className="grid grid-cols-6 gap-2">
                {main && special ? ActiveRow() : EmptyRow()}
            </div>
        </div>
    )
}
