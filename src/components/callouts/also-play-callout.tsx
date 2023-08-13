import { useLotteryContext } from '@/context/LotteryContext'
import React from 'react'

export default function AlsoPlayCallout() {
    const { alternativeType } = useLotteryContext()
    return (
        <div className="bg-gray-900 p-6">
            <div className="mx-auto grid max-w-6xl grid-cols-1 content-center text-center md:grid-cols-2">
                <div>
                    <h2 className="mb-2 text-4xl font-bold text-white">
                        Play {alternativeType.name}?
                    </h2>
                    <p className="text-xl text-gray-300">
                        Try out the {alternativeType.name} Number Generator.
                    </p>
                </div>
                <div className="mx-auto flex">
                    <div className="h-fit self-center">
                        <a
                            href="/mega-million"
                            className={`btn mt-8 rounded-full bg-${alternativeType.baseColor} text-lg font-semibold ${alternativeType.textColor} hover:bg-${alternativeType.activeColor}  md:mt-0`}
                        >
                            <span>{alternativeType.name} Number Generator</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
