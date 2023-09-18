'use client'
import React from 'react'
import Script from 'next/script'
import { useSessionContext } from '@/context/SessionContext'

interface IProps {
    pricingTableId: string
    publishableKey: string
}
export default function StripePricingTable({
    pricingTableId,
    publishableKey,
}: IProps) {
    const { session } = useSessionContext()
    return (
        <>
            <Script src="https://js.stripe.com/v3/pricing-table.js" />
            {session?.user && (
                // @ts-ignore
                <stripe-pricing-table
                    pricing-table-id={pricingTableId}
                    publishable-key={publishableKey}
                    client-reference-id={session?.user.email}
                    customer-email={session?.user.email}
                />
            )}
        </>
    )
}
