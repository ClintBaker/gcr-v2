import { useContext, useState } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../../context/UserProvider'

export default function Auth() {
  // toggle state
  const [formToggle, setFormToggle] = useState(false)

  // user context
  const { signin, signup, logout } = useContext(UserContext)

  function handleToggle() {
    setFormToggle((prevFormToggle) => !prevFormToggle)
  }
  return (
    <div className="container">
      <h2>{formToggle ? 'Sign up' : 'Sign in'}</h2>
      <AuthForm submit={formToggle ? signup : signin} />
      <a className="link" onClick={handleToggle}>
        {formToggle
          ? 'Already have an account? Sign in.'
          : 'Need an account? Create one.'}
      </a>
    </div>
  )
}
