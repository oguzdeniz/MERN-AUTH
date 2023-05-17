import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI
    // console.log({ MONGO_URI })
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

export { connectDB }
