import { client } from '@/utils'

export async function drawPowerball(size: number) {
    return client.post('draw/powerball', {
        size,
    })
}
