import { NextResponse } from 'next/server'
import getNumbers from '@/methods/getNumbers'

export async function POST(request: Request) {
    try {
        let data = await request.json()

        const draws = await getNumbers({
            size: data.size,
            mainMin: 1,
            mainMax: 69,
            specialMin: 1,
            specialMax: 26,
            type: 'powerball',
        })

        return NextResponse.json(draws)
    } catch (error) {
        return NextResponse.error()
    }
}
