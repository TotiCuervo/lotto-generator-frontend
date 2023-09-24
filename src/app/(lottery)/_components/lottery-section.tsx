'use client'

import BallRow from '@/components/lottery/ball-row'
import LineGenerator from '@/components/forms/line-generator'
import { LotteryType } from '@/types/LotteryType'
import { DrawProvider } from '@/context/DrawContext'
import DrawResults from '@/components/draw-results'

interface IProps {
    type: LotteryType
}

export default function LotterySection({ type }: IProps) {
    return (
        <DrawProvider type={type}>
            <div
                className="mx-auto mb-8 max-w-xs sm:flex sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="150"
            >
                <BallRow size={'large'} type={type} />
            </div>
            <div
                className="mx-auto mb-8 max-w-xs sm:flex sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="150"
            >
                <LineGenerator type={type} />
            </div>
            <div className="mt-10">
                <DrawResults type={type} />
            </div>
        </DrawProvider>
    )
}
