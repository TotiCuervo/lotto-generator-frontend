import useLotteryColorSchema from '@/hooks/useLotteryColorSchema'
import { LotteryType } from '@/types/LotteryType'

interface IProps {
    type: LotteryType
}

export default function HowItWorks({ type }: IProps) {
    const { schema } = useLotteryColorSchema(type)
    return (
        <section className="relative bg-gray-100 pb-20">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <div className="pt-12 md:pt-20">
                    <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
                        <h1 className="h2 mb-4">How it works</h1>
                        <p className="text-xl text-gray-600">
                            Welcome to the {schema.name} Number Generator, where
                            you can customize your own set of random numbers for
                            the upcoming draws. This generator will help you
                            generate multiple sets of numbers until you find the
                            combination that suits you best.
                        </p>
                    </div>

                    <div className="grid-cols-12 md:gap-6">
                        {/* Content */}
                        <div
                            className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6"
                            data-aos="fade-right"
                        >
                            <div className="mb-8 md:pr-4 lg:pr-12 xl:pr-16">
                                <h4 className="h4 mb-3">
                                    1. Choose how many lines of numbers you'd
                                    like
                                </h4>
                                <p className="text-xl text-gray-600">
                                    You can choose between 1 and 10 lines of
                                    numbers. Use the plus and minus buttons to
                                    add or subtract lines.
                                </p>
                            </div>
                            <div className="mb-8 md:pr-4 lg:pr-12 xl:pr-16">
                                <h4 className="h4 mb-3">
                                    2. Click the "Generate" button
                                </h4>
                                <p className="text-xl text-gray-600">
                                    Once you've chosen the number of lines you
                                    want, click the "Generate" button to
                                    generate your numbers. Your results will
                                    show below.
                                </p>
                            </div>
                            <div className="mb-8 md:pr-4 lg:pr-12 xl:pr-16">
                                <h4 className="h4 mb-3">
                                    3. Repeat until you find your lucky numbers
                                </h4>
                                <p className="text-xl text-gray-600">
                                    If you don't like the numbers you've
                                    generated, click the "Generate" button again
                                    to generate a new set of numbers. Repeat
                                    this process until you find the numbers you
                                    like.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
