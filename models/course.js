import mongoose, { Schema } from 'mongoose'
import { Rank } from './rank.js'

const courseSchema = new Schema({
  name: { type: String, required: true },
  location: String,
  greenQuality: Number,
  proShop: Number,
  weather: Number,
  difficulty: Number,
  views: Number,
  service: Number,
  score: Number,
})

// pre save to tally totals for each value
courseSchema.pre('save', async function (next) {
  //   define an array of all ranks for this course
  const ranks = await Rank.find({ course: this._id })
  //   if no ranks keep it moving
  if (!ranks.length > 0) return next()
  //  define composite values
  let cv = {
    greenQuality: 0,
    proShop: 0,
    weather: 0,
    difficulty: 0,
    views: 0,
    service: 0,
    score: 0,
  }
  // loop and increment & divide by multiplier
  ranks.forEach((rank) => {
    cv.greenQuality = cv.greenQuality + rank.greenQuality
    cv.proShop = cv.proShop + rank.proShop
    cv.weather = cv.weather + rank.weather
    cv.difficulty = cv.difficulty + rank.difficulty
    cv.views = cv.views + rank.views
    cv.service = cv.service + rank.service
    cv.score = cv.score + rank.score
  })
  //   divide by multiplier
  cv.greenQuality = cv.greenQuality / ranks.length
  cv.proShop = cv.proShop / ranks.length
  cv.weather = cv.weather / ranks.length
  cv.difficulty = cv.difficulty / ranks.length
  cv.views = cv.views / ranks.length
  cv.service = cv.service / ranks.length
  cv.score = cv.score / ranks.length
  //   apply to new saved item
  this.greenQuality = cv.greenQuality
  this.proShop = cv.proShop
  this.weather = cv.weather
  this.difficulty = cv.difficulty
  this.views = cv.views
  this.service = cv.service
  this.score = cv.score
  //   move along
  next()
})

export const Course = mongoose.model('Course', courseSchema)
