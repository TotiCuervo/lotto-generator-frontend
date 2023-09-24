import { LotteryType } from '@/types/LotteryType'
import React from 'react'
import { useDrawContext } from '@/context/DrawContext'
import LineRow from './rows/line-row'

interface IProps {
    type: LotteryType
}

export default function DrawResults({ type }: IProps) {
    const { draws } = useDrawContext()

    if (draws.length === 0) {
        return null
    }

    return (
        <div className="w-full ">
            <div className="grid grid-rows-1 gap-10">
                {draws.map((draw, index) => (
                    <LineRow
                        key={`draw-${index}`}
                        type={type}
                        draw={draw}
                        index={index + 1}
                    />
                ))}
            </div>
        </div>
    )
}
