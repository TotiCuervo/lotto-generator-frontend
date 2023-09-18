import { NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'
import Stripe from 'stripe'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

interface Products {
    amount: number
    credits: number
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16',
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || ''

const products: Products[] = [
    {
        amount: 999,
        credits: 30,
    },
    {
        amount: 1999,
        credits: 100,
    },
    {
        amount: 2999,
        credits: 200,
    },
]

export async function POST(request: Request) {
    const supabase = createServerComponentClient({ cookies })
    const body = await request.text()
    const sig = headers().get('stripe-signature') as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : 'Unknown error'
        // On error, log and return the error message.
        if (err! instanceof Error) console.log(err)
        console.log(`❌ Error message: ${errorMessage}`)
        return NextResponse.json({ status: 400, body: errorMessage })
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id)

    // if payment intent is not succeeded or checkout session is not completed, return
    if (
        event.type !== 'payment_intent.succeeded' &&
        event.type !== 'checkout.session.completed'
    ) {
        if (event.type === 'payment_intent.payment_failed') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            console.log(
                `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
            )
        } else if (event.type === 'charge.succeeded') {
            const charge = event.data.object as Stripe.Charge
            console.log(`💵 Charge id: ${charge.id}`)
        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    }

    const paymentIntent = event.data.object as Stripe.PaymentIntent
    // console.log(`💰 PaymentIntent: ${JSON.stringify(paymentIntent)}`)

    // @ts-ignore
    const userEmail = paymentIntent.customer_details.email
    // @ts-ignore
    const paymentAmount = paymentIntent.amount_subtotal

    const creditAmount = products.find(
        (product) => product.amount === paymentAmount
    )?.credits

    console.log(`📧 User email: ${userEmail}`)

    if (!creditAmount) {
        console.log(`❌ No credit amount found for ${paymentAmount}`)
        return NextResponse.json({ received: true })
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select()
        .eq('username', userEmail)
        .single()

    console.log(`👤 Profile: ${JSON.stringify(profile)}`)

    if (!profile) {
        console.log(`❌ No profile found for ${userEmail}`)
        return NextResponse.json({ received: true })
    }

    console.log('updated credits', profile.credits + creditAmount)

    const { data, error } = await supabase
        .from('profiles')
        .update({ credits: profile.credits + creditAmount })
        .eq('id', profile.id)

    if (error) {
        console.log(`❌ Error updating credits for ${userEmail}`)
    }

    console.log(`✅ Credits updated for ${data}`)

    return NextResponse.json({ received: true })
}
