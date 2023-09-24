import { IDraw } from './IDraw'
import { LotteryType } from './LotteryType'
import { Profile } from './Profile'

export interface Claim {
    id: number
    profile: Profile
    numbers: IDraw
    drawing_date: Date
    lottery: LotteryType
}
