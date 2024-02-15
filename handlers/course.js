import { Course } from '../models/course.js'

export const createCourse = async (req, res, next) => {
  try {
    // create course using all the snazzyness
    const course = await Course.create(req.body)
    res.status(201).send({ message: 'SUCCESS', course })
  } catch (e) {
    return next(e.message)
  }
}
