import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { expressjwt } from 'express-jwt'
import 'dotenv/config'

import authRouter from './routes/auth.js'
import rankRouter from './routes/rank.js'
import courseRouter from './routes/course.js'

// import tools to handle static react app
import path from 'path'
const __dirname = path.resolve()

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
// static react app
app.use(express.static(path.join(__dirname, 'client', 'dist')))

// protect
app.use(
  '/app/api',
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })
)

// auth routes
app.use('/app/auth', authRouter)
// protected routes
app.use('/app/api/rank', rankRouter)
app.use('/app/api/course', courseRouter)

// error handling
app.use((err, req, res, next) => {
  console.log(err)
  res.send({ message: 'ERROR', error: err.message })
})

// static react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
