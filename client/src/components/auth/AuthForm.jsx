import { useState } from 'react'

export default function AuthForm({ submit }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    submit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="username"
        value={formData.username}
        name="username"
        onChange={handleInputChange}
      />
      <input
        placeholder="password"
        value={formData.password}
        name="password"
        onChange={handleInputChange}
      />
      <button>Submit</button>
    </form>
  )
}
