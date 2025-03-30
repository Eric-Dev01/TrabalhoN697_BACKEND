import express from 'express'
import cors from 'cors'
import clientRoutes from './routers/clientRoute.js'

const app = express()
const port = 3000

const corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use (express.json())
app.use (cors (corsOptions))

app.use ('/api', clientRoutes)

app.listen (port, () => {
    console.log (`Server running on port ${port}`)
})