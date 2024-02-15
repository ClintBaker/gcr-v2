import { Router } from 'express'
import { createCourse, getCourses } from '../handlers/course.js'

const courseRouter = Router()

courseRouter.get('/', getCourses)
courseRouter.post('/', createCourse)

export default courseRouter
