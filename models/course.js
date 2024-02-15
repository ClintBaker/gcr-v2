import mongoose, { Schema } from 'mongoose'
import { Rank } from './rank.js'

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  greenQuality: { type: Number, default: 0 },
  proShop: { type: Number, default: 0 },
  weather: { type: Number, default: 0 },
  difficulty: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  service: { type: Number, default: 0 },
  totalRanks: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
})

// pre save to tally totals for each value
courseSchema.methods.updateTotals = async function () {
  try {
    //   define an array of all ranks for this course
    const ranks = await Rank.find({ courseId: this._id })
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
    this.totalRanks = ranks.length
    this.score = cv.score
    //   move along
    try {
      await this.save()
      return 'Success'
    } catch (e) {
      return e.message
    }
  } catch (e) {
    return e.message
  }
}

export const Course = mongoose.model('Course', courseSchema)
