import getRandomIntInclusive from '@/methods/getRandomIntInclusive'
import db from '@/lib/db'

interface IProps {
    size: number
    mainMin: number
    mainMax: number
    specialMin: number
    specialMax: number
    type: 'powerball' | 'megamillions'
}

type Draw = number[]
type Draws = Draw[]

export default async function getNumbers({
    size,
    mainMin,
    mainMax,
    specialMin,
    specialMax,
    type,
}: IProps) {
    const dbClient = await db()

    if (size > 10) {
        size = 10
    }

    let draws: Draws = []

    while (draws.length < size) {
        let draw: Draw = []

        for (let i = 0; i < 5; i++) {
            draw.push(getRandomIntInclusive(mainMin, mainMax, draw))
        }

        draw.sort((a, b) => a - b)

        draw.push(getRandomIntInclusive(specialMin, specialMax))

        const winningNumbers = await dbClient
            .collection('winningnumbers')
            .findOne({
                numbers: draw,
                type,
            })

        if (winningNumbers || draws.includes(draw)) {
            return
        }

        draws.push(draw)
    }

    return draws
}
