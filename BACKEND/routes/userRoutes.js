import express from 'express'
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js'
import { protectRoute } from '../middlewares/authMW.js'

const router = express.Router()
console.log('in userRoutes')

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.get('/profile', protectRoute, getUserProfile)
router.put('/profile', protectRoute, updateUserProfile)

export { router as userRouter }
