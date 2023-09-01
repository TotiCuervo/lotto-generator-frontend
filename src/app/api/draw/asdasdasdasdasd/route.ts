import pullLatest from '../../cron/pullLatest'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    console.log('log!')
    return pullLatest()
}
