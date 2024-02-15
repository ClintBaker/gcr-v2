import mongoose from 'mongoose'

const rankSchema = new mongoose.Schema({
  courseName: String,
  greenQuality: Number,
  proShop: Number,
  weather: Number,
  difficulty: Number,
  views: Number,
  service: Number,
  score: Number,
})

// middleware pre save
rankSchema.pre('save', function (next) {
  this.score =
    this.greenQuality +
    this.proShop +
    this.weather +
    this.difficulty +
    this.views +
    this.service
  next()
})

export const Rank = mongoose.model('Rank', rankSchema)
