'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSessionContext } from '@/context/SessionContext'
import LoginDropdown from './login-dropdown'
import ShoppingBag from './shopping-bag'

interface NavItem {
    name: string
    link: string
}

const navItems: NavItem[] = [
    { name: 'Powerball', link: '/powerball' },
    { name: 'Mega Millions', link: '/megamillions' },
]

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { session, profile } = useSessionContext()

    return (
        <header className="bg-white">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navItems.map((item) => (
                        <Link
                            href={item.link}
                            className="text-md font-semibold leading-6 text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden items-center lg:flex lg:flex-1 lg:justify-end">
                    {profile ? (
                        <>
                            <Link
                                href="/pricing"
                                className="mr-4 hidden space-x-2 border-r-2 border-gray-500 pr-4 transition hover:text-blue-400 sm:flex"
                            >
                                <div>Pricing</div>
                            </Link>
                            <Link
                                href="/pricing"
                                className="mr-4 hidden space-x-2 border-r-2 border-gray-500 pr-4 transition hover:text-blue-400 sm:flex"
                            >
                                <div>{`${profile?.credits} Credits`}</div>
                            </Link>
                            <LoginDropdown />
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="btn-sm ml-3 rounded-lg bg-slate-900 text-gray-200 hover:bg-slate-700"
                        >
                            <span>Login</span>
                        </Link>
                    )}
                    <div className="ml-4">
                        <ShoppingBag />
                    </div>
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navItems.map((item) => (
                                    <Link
                                        href={item.link}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="space-y-2 py-6">
                                {session ? (
                                    <>
                                        <Link
                                            href="/pricing"
                                            className="hidden space-x-2 transition hover:text-blue-400 sm:flex"
                                        >
                                            <div>Pricing</div>
                                        </Link>
                                        <Link
                                            href="/pricing"
                                            className="hidden space-x-2 transition hover:text-blue-400 sm:flex"
                                        >
                                            <div>{`${profile?.credits} Credits`}</div>
                                        </Link>
                                        <LoginDropdown />
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="btn-sm ml-3 rounded-lg bg-red-600 text-gray-200 hover:bg-red-800"
                                    >
                                        <span>Login</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
