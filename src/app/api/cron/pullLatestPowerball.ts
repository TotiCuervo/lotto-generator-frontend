// import connectMongo from '@/lib/connectMongo'
// import WinningNumbers, { IWinningNumbers } from '@/lib/models/WinningNumbers'
import axios from "axios";

const apiUrl = "https://data.ny.gov/resource/d6yy-54nr.json";

interface PowerballData {
    draw_date: string;
    winning_numbers: string;
    multiplier: string;
}

async function getWinningNumbers() {
    // try {
    //     await connectMongo()
    //     const winningNumbers = WinningNumbers.find({
    //         type: 'Powerball',
    //     })
    //     return winningNumbers
    // } catch (error: any) {
    //     console.log('error', error.message)
    //     return []
    // }
}

async function getPowerballData() {
    const res = await axios.get(apiUrl);
    return res.data;
}

export default async function pullLatestPowerball() {
    // const currentWinningNumbers: IWinningNumbers[] = await getWinningNumbers()
    // const data = await getPowerballData()
    // data.forEach(async (item: PowerballData) => {
    //     const winningNumber = currentWinningNumbers.find((winningNumber) => {
    //         return (
    //             winningNumber.dateDrawn.getTime() ===
    //             new Date(item.draw_date).getTime()
    //         )
    //     })
    //     if (winningNumber) {
    //         return
    //     }
    //     const winningNumbers = item.winning_numbers.split(' ').map((number) => {
    //         return parseInt(number)
    //     })
    //     const winningNumberData = {
    //         dateDrawn: new Date(item.draw_date),
    //         numbers: winningNumbers,
    //         multiplier: parseInt(item.multiplier),
    //         type: 'Powerball',
    //     }
    //     const winningNumberModel = new WinningNumbers(winningNumberData)
    //     try {
    //         await winningNumberModel.save()
    //     } catch (err: any) {
    //         console.log('error', err.message)
    //     }
    // })
}
