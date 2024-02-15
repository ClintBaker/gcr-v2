import mongoose, { Schema } from 'mongoose'
import { User } from './user.js'
import { Course } from './course.js'

const rankSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
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
