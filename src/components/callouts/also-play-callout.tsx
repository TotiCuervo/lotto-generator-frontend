import useLotteryColorSchema from '@/hooks/useLotteryColorSchema'
import { LotteryType } from '@/types/LotteryType'
import Link from 'next/link'
import React from 'react'

interface IProps {
    type: LotteryType
}
export default function AlsoPlayCallout({ type }: IProps) {
    const { alternativeSchema } = useLotteryColorSchema(type)

    return (
        <div className="bg-gray-900 p-6">
            <div className="mx-auto grid max-w-6xl grid-cols-1 content-center text-center md:grid-cols-2">
                <div>
                    <h2 className="mb-2 text-4xl font-bold text-white">
                        Play {alternativeSchema.name}?
                    </h2>
                    <p className="text-xl text-gray-300">
                        Try out the {alternativeSchema.name} Number Generator.
                    </p>
                </div>
                <div className="mx-auto flex">
                    <div className="h-fit self-center">
                        <Link
                            href={`/${alternativeSchema.name
                                .toLocaleLowerCase()
                                .replace(/\s+/g, '')}`}
                            className={`btn mt-8 rounded-full bg-${alternativeSchema.baseColor} text-lg font-semibold ${alternativeSchema.textColor} hover:bg-${alternativeSchema.activeColor}  md:mt-0`}
                        >
                            <span>
                                {alternativeSchema.name} Number Generator
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
