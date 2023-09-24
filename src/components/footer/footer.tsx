import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col items-center text-center">
                    <p className="mx-auto mt-4 max-w-xl text-gray-500 dark:text-gray-400">
                        {process.env.NEXT_PUBLIC_DOMAIN} is not associated with
                        the Multi-State Lottery Association (MUSL) or any State
                        lottery. Neither MUSL nor any state lottery organization
                        has approved or endorsed the content and activities of
                        this website.
                    </p>
                </div>

                <hr className="my-10 border-gray-200 dark:border-gray-700" />

                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-sm text-gray-500">
                        © Copyright {new Date().getFullYear()}. All Rights
                        Reserved.
                    </p>

                    <div className="-mx-2 mt-3 flex sm:mt-0">
                        <Link
                            href="/privacy"
                            className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                            {' '}
                            Privacy{' '}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
