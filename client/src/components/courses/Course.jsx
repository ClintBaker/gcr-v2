import { useNavigate } from 'react-router-dom'

export default function Course({ course }) {
  const navigate = useNavigate()

  function handleRank() {
    navigate(`/create/${course._id}`)
  }

  return (
    <div className="container course--card">
      <h2>{course.name}</h2>
      <h5>Location: {course.location}</h5>
      <span>Green Quality: {course.greenQuality}</span>
      <span>Pro Shop: {course.proShop}</span>
      <span>Weather: {course.weather}</span>
      <span>Difficulty: {course.difficulty}</span>
      <span>Views: {course.views}</span>
      <span>Service: {course.service}</span>
      <h4>Score: {course.score}</h4>
      <button onClick={handleRank}>Rank this course</button>
    </div>
  )
}
