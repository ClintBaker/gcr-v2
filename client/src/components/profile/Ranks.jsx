import { useEffect } from 'react'
import RankCard from '../RankCard'
import './css/Ranks.css'
import { getRanks } from '../../api/rank'

export default function Ranks({ ranks, setRanks }) {
  useEffect(() => {
    getRanks(setRanks)
  }, [])
  return (
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
  )
}
