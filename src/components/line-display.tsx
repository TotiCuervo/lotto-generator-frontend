import { useDrawContext } from '@/context/DrawContext'
import React from 'react'
import BallRow from './lottery/ball-row'

export default function LineDisplay() {
    const { draws } = useDrawContext()

    if (draws.length === 0) {
        return null
    }

    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                <h3
                    className="text-2xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4 text-center"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                >
                    Results
                </h3>
                {draws.map((draw, index) => (
                    <div className="pt-10" key={`draw-${index}`}>
                        <div
                            className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center mb-8"
                            data-aos="zoom-y-out"
                            data-aos-delay="150"
                        >
                            <div className="grid grid cols-12 gap-3">
                                <div>
                                    <span
                                        className="text-xl md:text-xl font-extrabold leading-tighter tracking-tighter mb-4 "
                                        data-aos="zoom-y-out"
                                        data-aos-delay="150"
                                    >
                                        Line #{index + 1}
                                    </span>
                                </div>
                                <div>
                                    <BallRow
                                        main={draw.slice(0, 5)}
                                        special={draw[5]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
