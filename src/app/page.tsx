'use client'

import Hero from '@/components/hero'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { DrawProvider } from '@/context/DrawContext'
import HowItWorks from '@/components/howitworks/how-it-works'

export default function Home() {
    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 700,
            easing: 'ease-out-cubic',
        })
    })
    return (
        <DrawProvider>
            <Hero />
            <HowItWorks />
        </DrawProvider>
    )
}
