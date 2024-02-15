import express from 'express'
import rankRouter from './router.js'
import morgan from 'morgan'
import mongoose from 'mongoose'
// import cors from 'cors'
import 'dotenv/config'

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

// router for ranks
app.use('/rank', rankRouter)

// error handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: 'ERROR', error: err })
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
