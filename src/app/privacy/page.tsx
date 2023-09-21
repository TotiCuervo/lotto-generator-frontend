interface Section {
    title: string
    descriptions: Description[]
}

interface Description {
    title?: string
    subtext: string
}

export default function Example() {
    const sections: Section[] = [
        {
            title: 'Introduction',
            descriptions: [
                {
                    subtext:
                        'Welcome to The Best Lottery Generator! We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and services. By using our website, you consent to the practices described in this policy.',
                },
            ],
        },
        {
            title: 'Information We Collect',
            descriptions: [
                {
                    title: 'User Account Information',
                    subtext:
                        'When you create an account on our website, we collect personal information such as your name, email address, and password.',
                },
                {
                    title: 'Number Combinations',
                    subtext:
                        'We generate number combinations for you based on your preferences for the Powerball and/or Mega Millions lottery. These combinations may be associated with your account.',
                },
                {
                    title: 'Reservation Data',
                    subtext:
                        'When you reserve number combinations, we collect data about the combinations you reserve and the credits used for each reservation.',
                },
                {
                    title: 'Payment Information',
                    subtext:
                        'If you purchase credits, we collect payment information, such as credit card details, to process your transactions. Please note that we do not store this information; it is handled securely by our payment processor.',
                },
                {
                    title: 'Usage Information',
                    subtext:
                        'We collect data about your interactions with our website, such as the pages you visit, the actions you take, and your IP address.',
                },
            ],
        },
        {
            title: 'How We Use Your Information',
            descriptions: [
                {
                    title: 'Number Combinations',
                    subtext:
                        'We use the information you provide to generate and reserve number combinations for you.',
                },
                {
                    title: 'Account Management',
                    subtext:
                        'Your account information is used to manage and personalize your user experience on our website.',
                },
                {
                    title: 'Credit Transactions',
                    subtext:
                        'We use your payment information to process credit purchases and manage credit balances associated with your account.',
                },
                {
                    title: 'Communication',

                    subtext:
                        'We may send you service-related emails, such as updates, account notifications, and promotional offers. You can opt out of promotional emails at any time.',
                },
                {
                    title: 'Analytics',
                    subtext:
                        'We analyze usage data to improve our website, services, and user experience.',
                },
            ],
        },
        {
            title: 'How We Share Your Information',
            descriptions: [
                {
                    title: 'Reservation Data',
                    subtext:
                        'When you reserve number combinations, other users will not have access to those specific combinations. However, your username or other non-personal information may be visible to other users to prevent duplicate reservations.',
                },
                {
                    title: 'Third-Party Services',
                    subtext:
                        'We may use third-party service providers to assist with website functionality, analytics, and payment processing. These providers have access to your information as necessary to perform their services but are obligated to protect it.',
                },
                {
                    title: 'Legal Compliance',
                    subtext:
                        'We may disclose your information to comply with legal obligations, respond to government requests, or protect our rights, privacy, safety, or property.',
                },
            ],
        },
        {
            title: 'Security',
            descriptions: [
                {
                    subtext:
                        'We implement reasonable security measures to protect your personal information. However, no method of data transmission over the internet is entirely secure, and we cannot guarantee the security of your data.',
                },
            ],
        },
        {
            title: 'Your Choices',
            descriptions: [
                {
                    subtext:
                        'You have the right to access, update, or delete your personal information. You can manage your account settings and communication preferences through your account dashboard. If you have any questions or requests regarding your data, please contact us at PB.MM.Generator@gmail.com.',
                },
            ],
        },
        {
            title: 'Changes to this Privacy Policy',
            descriptions: [
                {
                    subtext:
                        'We may update this Privacy Policy periodically to reflect changes in our practices or for legal and regulatory reasons. We will notify you of any significant changes through email or a notice on our website.',
                },
            ],
        },
        {
            title: 'Contact Us',
            descriptions: [
                {
                    subtext:
                        'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at PB.MM.Generator@gmail.com.',
                },
            ],
        },
    ]
    return (
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Privacy Policy
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Last Updated: September 21st, 2023
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
                    {sections.map((section, sectionIndex) => (
                        <div>
                            <div className="block text-lg font-semibold leading-6 text-gray-900">
                                {section.title}
                            </div>
                            {section.descriptions.map(
                                (description, descriptionIndex) => (
                                    <div className="mt-3">
                                        <span className="text-base leading-6 text-gray-800">
                                            {description.title && (
                                                <span className="font-medium leading-6 text-gray-900">
                                                    {`${sectionIndex + 1}.${
                                                        descriptionIndex + 1
                                                    } ${description.title}: `}
                                                </span>
                                            )}
                                            {description.subtext}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
