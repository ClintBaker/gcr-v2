import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserProvider'
import RankCard from './RankCard'
import './profile.css'
import { Link } from 'react-router-dom'

export default function Profile() {
  // user context
  const { getRanks, ranks, user } = useContext(UserContext)
  // onload get ranks
  useEffect(() => {
    getRanks()
  }, [])

  return (
    <div className="center">
      <h2 style={{ marginBottom: '25px' }}>Welcome, {user.username}</h2>
      <div className="ranks--container">
        <div className="heading center">
          <h3>My Ranks</h3>
        </div>
        <div className="ranks">
          {ranks &&
            ranks.map((rank) => <RankCard rank={rank} key={rank._id} />)}
          {!ranks.length > 0 && (
            <div
              style={{
                marginTop: '25px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <p>
                You don't currently have any ranks.{'   '}
                <Link to="/courses"> Start ranking!</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
