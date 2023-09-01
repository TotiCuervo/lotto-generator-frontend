import pullLatestMegamillions from './pullLatestMegamillions'
import { NextResponse } from 'next/server'
import pullLatestPowerball from './pullLatestPowerball'

export default async function pullLatest() {
    await pullLatestMegamillions()
    await pullLatestPowerball()

    return NextResponse.json({
        status: 200,
        message: 'Hello world!!',
    })
}
