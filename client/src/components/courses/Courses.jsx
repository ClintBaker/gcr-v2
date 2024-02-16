import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserProvider'
import Course from './Course'
import './course.css'

export default function Courses() {
  const { getCourses, courses } = useContext(UserContext)

  useEffect(() => {
    getCourses()
  }, [])
  return (
    <div>
      {courses &&
        courses.map((course) => <Course course={course} key={course._id} />)}
    </div>
  )
}
