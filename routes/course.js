import { Router } from 'express'
import { createCourse } from '../handlers/course.js'

const courseRouter = Router()

courseRouter.post('/', createCourse)

export default courseRouter
