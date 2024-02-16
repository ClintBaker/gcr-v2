import { Navigate, Route, Routes, Link } from 'react-router-dom'
import Auth from './components/auth/Auth'
import Profile from './components/profile/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import './components/css//new/main.css'
import { UserContext } from './context/UserProvider'
import { useContext } from 'react'
import Courses from './components/courses/Courses'
import Rank from './components/Rank'
import CreateRank from './components/CreateRank'

function App() {
  // get context
  const { token, user, logout } = useContext(UserContext)

  return (
    <>
      <nav className="nav">
        {/* <div>
          <Link to="/">My Ranks</Link>
          <Link to="/create">Rank New Course</Link>
        </div> */}
        <div className="nav-left">
          <h1>⛳️ Golf Course Ranker</h1>
          <Link to="/profile">My Ranks</Link>
          <Link to="/courses">Courses</Link>
        </div>
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
            path="/profile"
            element={
              <ProtectedRoute token={token} redirect="/">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute token={token} redirect="/">
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rank/:rankId"
            element={
              <ProtectedRoute token={token} redirect="/">
                <Rank />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/:courseId/:courseName"
            element={
              <ProtectedRoute token={token} redirect="/">
                <CreateRank />
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
