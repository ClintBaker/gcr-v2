import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRank, editRank, getRankById } from "../api/rank";
import "./css/Rank.css";

export default function Rank() {
  const { id } = useParams();

  const [rank, setRank] = useState("loading");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // on load get rank
    getRankById(setRank, setFormData, id);
  }, []);

  function handleDelete() {
    deleteRank(navigate, id);
  }

  function handleEdit() {
    setFormData(rank);
    setToggleEdit((prevToggleEdit) => !prevToggleEdit);
  }

  function handleSubmit() {
    editRank(setRank, id, formData, setFormData);
    setToggleEdit(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <>
      {!rank && <div>404 - Unable to find Rank</div>}
      {rank && rank !== "loading" && !toggleEdit && (
        <div className="rank--main">
          <h2>{rank.courseName}</h2>
          <div className="rank--btns">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <div className="rank--info">
            <span>Green Quality: {rank.greenQuality}</span>
            <span>Pro Shop: {rank.proShop}</span>
            <span>Weather: {rank.weather}</span>
            <span>Difficulty: {rank.difficulty}</span>
            <span>Views: {rank.views}</span>
            <span>Service: {rank.service}</span>
            <h4>Score: {rank.score}</h4>
          </div>
        </div>
      )}

      {rank && rank !== "loading" && toggleEdit && (
        <div className="rank--main">
          <h2>{rank.courseName}</h2>
          <div className="rank--btns">
            <button onClick={handleEdit}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <div className="rank--info">
            <div>
              <label>Green Quality</label>
              <input
                name="greenQuality"
                value={formData.greenQuality}
                type="number"
                onChange={handleChange}
                min={0}
                max={10}
                className="num--input"
              />
            </div>
            <div>
              <label>Pro Shop</label>
              <input
                name="proShop"
                value={formData.proShop}
                type="number"
                onChange={handleChange}
                min={0}
                max={10}
                className="num--input"
              />
            </div>
            <div>
              <label>Weather</label>
              <input
                name="weather"
                value={formData.weather}
                type="number"
                onChange={handleChange}
                min={0}
                max={10}
                className="num--input"
              />
            </div>
            <div>
              <label>Difficulty</label>
              <input
                name="difficulty"
                value={formData.difficulty}
                type="number"
                onChange={handleChange}
                min={0}
                max={10}
                className="num--input"
              />
            </div>
            <div>
              <label>Views</label>
              <input
                name="views"
                value={formData.views}
                type="number"
                onChange={handleChange}
                min={0}
                max={10}
                className="num--input"
              />
            </div>
            <div>
              <label>Service</label>
              <input
                name="service"
                value={formData.service}
                type="number"
                onChange={handleChange}
                min={0}
                max={10}
                className="num--input"
              />
            </div>
            <h4>Score: {rank.score}</h4>
          </div>
        </div>
      )}
    </>
  );
}
