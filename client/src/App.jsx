import {
  Routes,
  Route,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Ranks from "./components/Ranks";
import CreateRank from "./components/CreateRank";
import Rank from "./components/Rank";
import { useEffect, useState } from "react";
import { getRanks } from "./api/rank";

function App() {
  const [ranks, setRanks] = useState([]);

  return (
    <>
      <nav className="nav">
        <h1>⛳️ Golf Course Ranker</h1>
        <div>
          <Link to="/">My Ranks</Link>
          <Link to="/create">Rank New Course</Link>
        </div>
      </nav>
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={<Ranks ranks={ranks} setRanks={setRanks} />}
          />
          <Route path="/create" element={<CreateRank />} />
          <Route path="/:id" element={<Rank />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
