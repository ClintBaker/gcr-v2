import { Rank } from '../models/rank.js'

export const getRanks = async (req, res, next) => {
  try {
    // get user's ranks
    const ranks = await Rank.find({ userId: req.auth._id })
    res.status(200).send({ message: 'Successfully retrieved ranks', ranks })
  } catch (e) {
    return next(e.message)
  }
}

export const getOneRank = async (req, res, next) => {
  try {
    // find the rank and make sure it's owned by user
    const rank = await Rank.findOne({
      _id: req.params.id,
      userId: req.auth._id,
    })
    // if unable to find send error
    if (!rank) {
      res.status(404)
      return next(new Error('Unable to find rank'))
    }
    // return the rank
    res.status(200).send({ message: 'SUCCESS', rank })
  } catch (e) {
    next(e)
  }
}

export const createRank = async (req, res, next) => {
  try {
    // create rank and associate with userId
    const rank = await Rank.create({ ...req.body, userId: req.auth._id })
    res.status(200).send({ message: 'Successfully created rank', rank })
  } catch (e) {
    return next(e.message)
  }
}

export const editRank = async (req, res, next) => {
  try {
    // find rank that is associated with userId
    const rank = await Rank.findOne({
      _id: req.params.id,
      userId: req.auth._id,
    })

    // if you can't find the rank return error
    if (!rank) {
      res.status(404)
      return next(new Error('Resource not found'))
    }

    // edit the rank
    Object.keys(req.body).forEach((key) => {
      rank[key] = req.body[key]
    })

    // return the updatedRank
    const updatedRank = await rank.save()
    res
      .status(200)
      .send({ message: 'Successfully updated rank', rank: updatedRank })
  } catch (e) {
    return next(e.message)
  }
}

export const deleteRank = async (req, res, next) => {
  try {
    // find rank that is associated to user
    const rank = await Rank.findOneAndDelete({
      _id: req.params.id,
      userId: req.auth._id,
    })
    // if it wasn't found return error
    if (!rank) {
      res.status(404)
      return next(new Error('Resource not found'))
    }
    // otherwise return success
    res.status(200).send({ message: 'Successfully deleted rank', rank })
  } catch (e) {
    next(e)
  }
}
