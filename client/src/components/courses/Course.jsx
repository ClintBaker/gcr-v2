import { useNavigate } from 'react-router-dom'

export default function Course({ course }) {
  const navigate = useNavigate()

  function handleRank() {
    navigate(`/create/${course._id}/${course.name}`)
  }

  return (
    <div className="container course--card">
      <h2>{course.name}</h2>
      <h5>Location: {course.location}</h5>
      <span>Green Quality: {Math.round(course.greenQuality)}</span>
      <span>Pro Shop: {Math.round(course.proShop)}</span>
      <span>Weather: {Math.round(course.weather)}</span>
      <span>Difficulty: {Math.round(course.difficulty)}</span>
      <span>Views: {Math.round(course.views)}</span>
      <span>Service: {Math.round(course.service)}</span>
      <h4>Score: {Math.round(course.score)}</h4>
      <h5>Total Ranks: {course.totalRanks}</h5>
      <button onClick={handleRank}>Rank this course</button>
    </div>
  )
}
