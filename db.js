import PG from 'pg'
import ENV from 'dotenv'

ENV.config()

const DB = new PG.Client ({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

DB.connect()

DB.on ('error', (error) => {
    console.error (`Unexpected error on the database: ${error}`)
    process.exit (-1)
})

export const QUERY = (text, params) => DB.query (text, params)