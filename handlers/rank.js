import { Rank } from '../models/rank.js'

export const getRanks = async (req, res, next) => {
  try {
    const ranks = await Rank.find()
    res
      .status(200)
      .send({ message: 'Successfully retrieved ranks', data: ranks })
  } catch (e) {
    next(e)
  }
}

export const getOneRank = async (req, res, next) => {
  try {
    const rank = await Rank.findById(req.params.id)
    res.status(200).send({ message: 'Successfully found rank', data: rank })
  } catch (e) {
    next(e)
  }
}

export const createRank = async (req, res, next) => {
  try {
    const rank = await Rank.create(req.body)
    res.status(200).send({ message: 'Successfully created rank', data: rank })
  } catch (e) {
    next(e)
  }
}

export const editRank = async (req, res, next) => {
  try {
    const updatedRank = await Rank.findById(req.params.id)
    Object.keys(req.body).forEach((key) => {
      updatedRank[key] = req.body[key]
    })

    const rank = await updatedRank.save()
    res.status(200).send({ message: 'Successfully updated rank', data: rank })
  } catch (e) {
    next(e)
  }
}

export const deleteRank = async (req, res, next) => {
  try {
    const rank = await Rank.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: 'Successfully deleted rank', data: rank })
  } catch (e) {
    next(e)
  }
}
