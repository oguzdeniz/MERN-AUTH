import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

const protectRoute = asyncHandler(async (req, res, next) => {
  console.log('in protectRoute')
  let token
  token = req.cookies.jwt
  console.log('token:', token)
  const secret = process.env.JWT_SECRET
  console.log('secret:', secret)
  if (token) {
    try {
      const decoded = jwt.verify(token, secret)
      console.log('decoded:', decoded)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (err) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protectRoute }
