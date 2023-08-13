import BallRow from '@/components/lottery/ball-row'
import LineGenerator from '@/components/forms/line-generator'
import AlsoPlayCallout from './callouts/also-play-callout'
import LineDisplay from './line-display'
import { useLotteryContext } from '@/context/LotteryContext'

export default function Hero() {
    const { currentType } = useLotteryContext()

    return (
        <section className="relative flex flex-col sm:min-h-screen">
            <div
                className={`mx-auto flex max-w-6xl grow flex-col justify-between px-4 sm:px-6`}
            >
                {/* Hero content */}
                <div className="pt-32 md:pt-80 ">
                    {/* Section header */}
                    <div className="pb-12 text-center md:pb-16">
                        <h1
                            className="mb-4 text-5xl font-extrabold leading-tighter tracking-tighter md:text-6xl"
                            data-aos="zoom-y-out"
                            data-aos-delay="150"
                        >
                            {currentType.name} Number Generator
                        </h1>
                        <div className="mx-auto max-w-3xl">
                            <p
                                className="mb-8 text-xl text-gray-600"
                                data-aos="zoom-y-out"
                                data-aos-delay="150"
                            >
                                Create your own line of random numbers to use in
                                upcoming draws.
                            </p>

                            <div
                                className="mx-auto mb-8 max-w-xs sm:flex sm:max-w-none sm:justify-center"
                                data-aos="zoom-y-out"
                                data-aos-delay="150"
                            >
                                <BallRow size={'large'} />
                            </div>
                            <div
                                className="mx-auto mb-8 max-w-xs sm:flex sm:max-w-none sm:justify-center"
                                data-aos="zoom-y-out"
                                data-aos-delay="150"
                            >
                                <LineGenerator />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LineDisplay />
            <AlsoPlayCallout />
        </section>
    )
}
