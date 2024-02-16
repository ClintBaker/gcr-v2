import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserProvider'
import RankCard from './RankCard'
import './profile.css'

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
        </div>
      </div>
    </div>
  )
}
