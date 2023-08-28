export default function getRandomIntInclusive(
    min: number,
    max: number,
    exclude?: number[]
) {
    let arrayOfPossibleNumbers = []

    for (let i = min; i <= max; i++) {
        if (exclude === undefined || !exclude.includes(i)) {
            arrayOfPossibleNumbers.push(i)
        }
    }

    min = Math.ceil(0)
    max = Math.floor(arrayOfPossibleNumbers.length - 1)
    return arrayOfPossibleNumbers[
        Math.floor(Math.random() * (max - min + 1)) + min
    ]
}
