import { useNavigate } from "react-router-dom";
import "./css/RankCard.css";

export default function RankCard({ rank }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/${rank._id}`);
  }

  return (
    <div onClick={handleClick} className="rank--card">
      <h3>{rank.courseName}</h3>
      <span>Green Quality: {rank.greenQuality}</span>
      <span>Pro Shop: {rank.proShop}</span>
      <span>Weather: {rank.weather}</span>
      <span>Difficulty: {rank.difficulty}</span>
      <span>Views: {rank.views}</span>
      <span>Service: {rank.service}</span>
      <h4>Score: {rank.score}</h4>
    </div>
  );
}
