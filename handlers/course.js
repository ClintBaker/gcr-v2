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

export const getCourses = async (req, res, next) => {
  try {
    // get all courses
    const courses = await Course.find()
    // return value
    res.status(200).send({ message: 'SUCCESS', courses })
  } catch (e) {
    res.status(500)
    return next(e.message)
  }
}
