'use client'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

export const AOSInit = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 700,
            easing: 'ease-out-cubic',
        })
    }, [])
    return null
}
