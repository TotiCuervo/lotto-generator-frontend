import axios from 'axios'

const createClient = () =>
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin',
        },
        responseType: 'json',
    })

const client = createClient()

export default client
