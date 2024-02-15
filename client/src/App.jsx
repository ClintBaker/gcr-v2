import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './components/auth/Auth'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import './components/css//new/main.css'
import { UserContext } from './context/UserProvider'
import { useContext } from 'react'

function App() {
  // get context
  const { token, user, logout } = useContext(UserContext)

  return (
    <>
      <nav className="nav">
        <h1>⛳️ Golf Course Ranker</h1>
        {/* <div>
          <Link to="/">My Ranks</Link>
          <Link to="/create">Rank New Course</Link>
        </div> */}
        {token && (
          <a onClick={logout} className="link">
            Logout
          </a>
        )}
      </nav>
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/profile" /> : <Auth />}
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute token={token} redirect="/">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/"
            element={<Ranks ranks={ranks} setRanks={setRanks} />}
          />
          <Route path="/create" element={<CreateRank />} />
          <Route path="/:id" element={<Rank />} /> */}
        </Routes>
      </main>
    </>
  )
}

export default App
