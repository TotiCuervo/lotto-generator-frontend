'use client'

import BallRow from '@/components/lottery/ball-row'
import LineGenerator from '@/components/forms/line-generator'
import { LotteryType } from '@/types/LotteryType'
import TextSwitch from '@/components/switch/text-switch'
import { useState } from 'react'
import { DrawProvider } from '@/context/DrawContext'
import DrawResults from '@/components/draw-results'

export default function LotterySection() {
    const [type, setType] = useState<LotteryType>('Powerball')
    return (
        <DrawProvider type={type}>
            <div
                className="mx-auto mb-8 max-w-xs sm:flex sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="150"
            >
                <TextSwitch type={type} setType={setType} />
            </div>
            <div
                className="mx-auto mb-8 max-w-xs sm:flex sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="150"
            >
                <BallRow size={'large'} type={type} />
            </div>
            <div
                className="mb-8 flex justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="150"
            >
                <LineGenerator type={type} />
            </div>
            <div className="mx-auto mb-8 sm:flex sm:justify-center">
                <DrawResults type={type} />
            </div>
        </DrawProvider>
    )
}
