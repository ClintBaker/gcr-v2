import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { expressjwt } from 'express-jwt'
import 'dotenv/config'

import authRouter from './routes/auth.js'
import rankRouter from './routes/rank.js'

const app = express()

// call function to connect to DB
main().catch((err) => console.log(err))

// Function to connect to db
async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
}

// middleware
app.use(morgan('dev'))
app.use(express.json())

// protect
app.use(
  '/app/api',
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })
)

// auth routes
app.use('/app/auth', authRouter)
// protected routes
app.use('/app/api/rank', rankRouter)

// error handling
app.use((err, req, res, next) => {
  console.log(err)
  res.send({ message: 'ERROR', error: err.message })
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
