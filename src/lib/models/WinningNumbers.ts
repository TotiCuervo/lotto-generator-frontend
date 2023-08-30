import { Schema, model, models } from 'mongoose'

export interface IWinningNumbers {
    dateDrawn: Date
    numbers: [number, number, number, number, number, number]
    multiplier: number
    type: string
}

const winningNumbersSchema = new Schema({
    dateDrawn: {
        type: Date,
        required: true,
    },
    numbers: {
        type: [Number, Number, Number, Number, Number, Number],
        required: true,
    },
    multiplier: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
})

const WinningNumbers =
    models.WinningNumbers || model('WinningNumbers', winningNumbersSchema)

export default WinningNumbers
