import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserProvider'
import RankCard from '../RankCard'

export default function Profile() {
  // user context
  const { getRanks, ranks } = useContext(UserContext)
  useEffect(() => {
    getRanks()
  }, [])
  return (
    <div>
      <h2>Welcome, user</h2>
      <div className="ranks--container">
        <div className="heading">
          <h2>My Ranks</h2>
        </div>
        <div className="ranks">
          {ranks.map((rank) => (
            <RankCard rank={rank} key={rank._id} />
          ))}
        </div>
      </div>
    </div>
  )
}
