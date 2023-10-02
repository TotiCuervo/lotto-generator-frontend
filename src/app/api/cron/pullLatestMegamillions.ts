// import connectMongo from '@/lib/connectMongo'
// import WinningNumbers, { IWinningNumbers } from '@/lib/models/WinningNumbers'
import axios from "axios";

const apiUrl = "https://data.ny.gov/resource/5xaw-6ayf.json";

interface MegamillionData {
    draw_date: string;
    winning_numbers: string;
    multiplier: string;
    mega_ball: string;
}

async function getWinningNumbers() {
    // try {
    //     await connectMongo()
    //     const winningNumbers = await WinningNumbers.find({
    //         type: 'Megamillion',
    //     })
    //     return winningNumbers
    // } catch (err: any) {
    //     console.log('error', err.message)
    //     return []
    // }
}

async function getMegamillionData() {
    const res = await axios.get(apiUrl);
    return res.data;
}

export default async function pullLatestMegamillions() {
    // const currentWinningNumbers: IWinningNumbers[] = await getWinningNumbers()
    // const data = await getMegamillionData()
    // data.forEach(async (item: MegamillionData) => {
    //     const winningNumber = currentWinningNumbers.find((winningNumber) => {
    //         return (
    //             winningNumber.dateDrawn.getTime() ===
    //             new Date(item.draw_date).getTime()
    //         )
    //     })
    //     if (winningNumber) {
    //         return
    //     }
    //     const winningNumbers = [
    //         ...item.winning_numbers.split(' ').map((number) => {
    //             return parseInt(number)
    //         }),
    //         parseInt(item.mega_ball),
    //     ]
    //     const winningNumberData = {
    //         dateDrawn: new Date(item.draw_date),
    //         numbers: winningNumbers,
    //         multiplier: parseInt(item.multiplier),
    //         type: 'Megamillion',
    //     }
    //     const winningNumberModel = new WinningNumbers(winningNumberData)
    //     try {
    //         await winningNumberModel.save()
    //     } catch (err: any) {
    //         console.log('error', err.message)
    //     }
    // })
}
