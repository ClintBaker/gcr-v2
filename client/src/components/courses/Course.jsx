import { useEffect } from 'react'

export default function Course({ course }) {
  useEffect(() => {
    console.log(course)
  }, [])
  return (
    <div className="container rank--card">
      <h2>{course.name}</h2>
      <h5>Location: {course.location}</h5>
      <span>Green Quality: {course.greenQuality}</span>
      <span>Pro Shop: {course.proShop}</span>
      <span>Weather: {course.weather}</span>
      <span>Difficulty: {course.difficulty}</span>
      <span>Views: {course.views}</span>
      <span>Service: {course.service}</span>
      <h4>Score: {course.score}</h4>
      <button>Rank this course</button>
    </div>
  )
}
