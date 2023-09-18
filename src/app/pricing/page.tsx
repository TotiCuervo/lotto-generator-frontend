import Script from 'next/script'
import CreditsRemaining from '@/components/callouts/credits-remaining'
import StripePricingTable from '@/components/stripe/stripe-pricing-table'

export default function Pricing() {
    return (
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center overflow-visible py-2">
            <Script src="https://js.stripe.com/v3/pricing-table.js" />

            <main className="mb-8 mt-12 flex w-full flex-col items-center justify-center px-4 text-center sm:mb-0">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                            Buy Claim Credits
                        </p>
                    </div>
                </div>
                <p className="mx-auto mb-10 mt-6 max-w-2xl text-center text-lg leading-8 text-gray-500">
                    You currently have <CreditsRemaining />. Purchase more
                    below.
                </p>
            </main>
            <div className="w-full">
                <StripePricingTable
                    pricingTableId={process.env.NEXT_STRIPE_PRICING_TABLE!}
                    publishableKey={process.env.NEXT_STRIPE_PUBLISHING_KEY!}
                />
            </div>
            {/* <div className="mt-10 text-center">
                <h4 className="mt-2 flex-none text-2xl font-bold leading-6 tracking-tight sm:text-5xl">
                    What’s included
                </h4>
            </div>
            <ul
                role="list"
                className="mb-10 mt-8 grid grid-cols-1 gap-4 leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
                <li className="flex gap-x-3">
                    <svg
                        className="h-6 w-5 flex-none text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Save your generated rooms
                </li>

                <li className="flex gap-x-3">
                    <svg
                        className="h-6 w-5 flex-none text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Get more room styles and room types
                </li>

                <li className="flex gap-x-3">
                    <svg
                        className="h-6 w-5 flex-none text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Premium support by email
                </li>

                <li className="flex gap-x-3">
                    <svg
                        className="h-6 w-5 flex-none text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Ability to request features
                </li>
                <li className="flex gap-x-3">
                    <svg
                        className="h-6 w-5 flex-none text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Commercial usage of photos
                </li>
                <li className="flex gap-x-3">
                    <svg
                        className="h-6 w-5 flex-none text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Early access to new features
                </li>
            </ul> */}
            <p className="mb-5 mt-20 text-gray-800">
                Have an issue or question? Email{' '}
                <span className="text-red-600">PB.MM.Generator@gmail.com</span>
            </p>
        </div>
    )
}
