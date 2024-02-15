import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export const createJWT = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET)
  return token
}

export const signup = async (req, res, next) => {
  try {
    // get user to validate if username already exists
    const user = await User.findOne({
      username: req.body.username.toLowerCase(),
    })
    // if user exists, throw error
    if (user) {
      res.status(403)
      return next(new Error('Username already exists'))
    }

    try {
      // otherwise, create the user
      const newUser = new User(req.body)
      const savedUser = await newUser.save()
      // once user is created create a token (remove password from user obj so it's not in the token)
      const token = createJWT(savedUser.withoutPassword())
      //   send back user and token
      res.status(201).send({
        message: 'user created successfully',
        user: savedUser.withoutPassword(),
        token,
      })
    } catch (e) {
      res.status(500)
      return next(new Error('Unable to create user'))
    }
  } catch (e) {
    // if error with db, throw error
    res.status(500)
    return next(e)
  }
}

export const signin = async (req, res, next) => {
  try {
    // find the user
    const user = await User.findOne({
      username: req.body.username.toLowerCase(),
    })
    // if user doesn't exist throw error
    if (!user) {
      res.status(403)
      return next(new Error('Username or password incorrect'))
    }
    // compare passwords
    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err) {
        res.status(403)
        return next(new Error('Username or password incorrect'))
      }

      if (!isMatch) {
        res.status(403)
        return next(new Error('Username or password incorrect'))
      }

      //   get a token
      const token = createJWT(user.withoutPassword())
      //   return user and token
      res.status(200).send({
        message: 'Successfully signed in',
        user: user.withoutPassword(),
        token,
      })
    })
  } catch (e) {
    // error with db
    res.status(500)
    return next(e)
  }
}
