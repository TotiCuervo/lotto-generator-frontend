import clientPromise from './clientPromise'

export default async function db() {
    const client = await clientPromise
    return client.db('test')
}
