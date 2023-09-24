import { Claim } from './Claim'

export type CartItem = Omit<Claim, 'id' | 'profile' | 'created_at'>
