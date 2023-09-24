import LotterySection from './_components/lottery-section'

export default function Hero() {
    return (
        <section className="relative flex flex-col sm:min-h-screen">
            <div
                className={`mx-auto flex max-w-6xl grow flex-col justify-between px-4 sm:px-6`}
            >
                <div className="pt-32 md:pt-80 ">
                    <div className="pb-12 text-center md:pb-16">
                        <h1
                            className="mb-4 text-5xl font-extrabold leading-tighter tracking-tighter md:text-6xl"
                            data-aos="zoom-y-out"
                            data-aos-delay="150"
                        >
                            Lottery Number Generator
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
                            <LotterySection />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
