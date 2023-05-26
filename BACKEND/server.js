import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMW.js'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'
import path from 'path'

// can now read .env variables
dotenv.config()
const PORT = process.env.PORT || 4000

// console.log("MONGO_URI:", process.env.MONGO_URI)


connectDB()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/api/users', userRouter)

// Check for mode
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'FRONTEND/dist')))

  app.get("*", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "FRONTEND", "dist", index.html))
  })
} else {
  app.get("/", (req, res) => res.send("Server is ready"))
}

// Error handling
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))
