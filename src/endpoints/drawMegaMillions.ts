import { client } from '@/utils'

export async function drawMegaMillions(size: number) {
    return client.post('draw/megamillions', {
        size,
    })
}
