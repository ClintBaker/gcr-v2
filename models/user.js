import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// pre-save hook to encrypt user passwords before they hit db
userSchema.pre('save', function (next) {
  // define user from this
  const user = this
  // if we're not modifying password move on
  if (!user.isModified('password')) return next()
  //   hash password and move on
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    // set password to hashed result
    user.password = hash
    next()
  })
})

// schema method to compare passwords on login
userSchema.methods.checkPassword = function (passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) return callback(err)
    return callback(null, isMatch)
  })
}

// schema method to remove password
userSchema.methods.withoutPassword = function () {
  // convert this to an object so we can mutate without consequence
  const user = this.toObject()
  //   remove the password from the new object
  delete user.password
  //   return the new object
  return user
}

export const User = mongoose.model('User', userSchema)
