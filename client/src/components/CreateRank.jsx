import { useContext, useEffect, useState } from 'react'
import './css/create.css'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

export default function CreateRank() {
  const navigate = useNavigate()
  const { createRank } = useContext(UserContext)

  const { courseName, courseId } = useParams()

  const [formData, setFormData] = useState({
    courseId,
    greenQuality: 5,
    proShop: 5,
    weather: 5,
    difficulty: 5,
    views: 5,
    service: 5,
  })

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    createRank(formData)
    navigate('/profile')
  }

  return (
    <div className="create--container">
      <h2>Rank {courseName}</h2>
      <form onSubmit={handleSubmit} className="create--form">
        <div className="form--collection">
          <div>
            <label>Green Quality</label>
            <input
              type="number"
              name="greenQuality"
              value={formData.greenQuality}
              onChange={handleChange}
              min={0}
              max={10}
            />
          </div>
          <div>
            <label>Pro Shop</label>
            <input
              type="number"
              name="proShop"
              value={formData.proShop}
              onChange={handleChange}
              min={0}
              max={10}
            />
          </div>
          <div>
            <label>Weather</label>
            <input
              type="number"
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              min={0}
              max={10}
            />
          </div>
        </div>
        <div className="form--collection">
          <div>
            <label>Difficulty</label>
            <input
              type="number"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              min={0}
              max={10}
            />
          </div>
          <div>
            <label>Views</label>
            <input
              type="number"
              name="views"
              value={formData.views}
              onChange={handleChange}
              min={0}
              max={10}
            />
          </div>
          <div>
            <label>Service</label>
            <input
              type="number"
              name="service"
              value={formData.service}
              onChange={handleChange}
              min={0}
              max={10}
            />
          </div>
        </div>
        <button className="submit">Submit</button>
      </form>
    </div>
  )
}
