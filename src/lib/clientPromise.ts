import { MongoClient } from 'mongodb'

const uri = process.env.NEXT_MONGO_URI

if (!process.env.NEXT_MONGO_URI) {
    throw new Error('Add Mongo URI to .env.local')
}

let client = new MongoClient(uri!)
let clientPromise = client.connect()

export default clientPromise
