import jwt from 'jsonwebtoken'

const generateTokenAndCookie = (res, userId) => {
  // token generation
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  // Send generated token in an httpOnly cookie
  res.cookie(
    "jwt",
    token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30 // Thirty days
    }
  )
}


export { generateTokenAndCookie }
