'use client'

import { useSessionContext } from '@/context/SessionContext'
import React from 'react'

export default function CreditsRemaining() {
    const { profile } = useSessionContext()

    function getString() {
        if (!profile) return '0 credits'
        if (profile.credits === 0) return '0 credits'
        if (profile.credits === 1) return '1 credit'
        if (profile.credits > 1) return `${profile.credits} credits`
    }

    return <span className="font-semibold text-gray-400">{getString()}</span>
}
