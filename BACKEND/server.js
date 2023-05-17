import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMW.js'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'

// can now read .env variables
dotenv.config()
const PORT = process.env.PORT || 4000

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/api/users', userRouter)

// Error handling
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))
