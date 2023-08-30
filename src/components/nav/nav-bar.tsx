'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import MobileMenu from './mobile-menu'
import { useLotteryContext } from '@/context/LotteryContext'

export default function Header() {
    const { alternativeType } = useLotteryContext()
    const [top, setTop] = useState<boolean>(true)

    // detect whether user has scrolled the page down by 10px
    const scrollHandler = () => {
        window.pageYOffset > 10 ? setTop(false) : setTop(true)
    }

    useEffect(() => {
        scrollHandler()
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [top])

    return (
        <header
            className={`fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ${
                !top ? 'bg-white shadow-lg backdrop-blur-sm' : ''
            }`}
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <div className="flex h-16 items-center justify-between md:h-20">
                    <nav className="hidden md:flex">
                        <ul className="flex grow flex-wrap items-center justify-start">
                            <li>
                                <a
                                    href={`https://www.${alternativeType.website.toLowerCase()}`}
                                    className={`btn-sm ml-3 rounded-full bg-${alternativeType.baseColor} font-semibold ${alternativeType.textColor} hover:bg-${alternativeType.activeColor}`}
                                >
                                    {alternativeType.name} Number Generator
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="hidden md:flex md:grow">
                        <ul className="flex grow flex-wrap items-center justify-end">
                            <li>
                                <Link
                                    href="/signup"
                                    className="btn-sm ml-3 bg-red-600 text-gray-200 hover:bg-red-800"
                                >
                                    <span>Play Lottery</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <MobileMenu />
                </div>
            </div>
        </header>
    )
}
