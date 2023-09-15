import { client } from '@/utils'

export async function signout() {
    return client.post('/auth/signout')
}
