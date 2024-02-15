import Auth from './components/auth/Auth'

function App() {
  return (
    <>
      <nav className="nav">
        <h1>⛳️ Golf Course Ranker</h1>
        {/* <div>
          <Link to="/">My Ranks</Link>
          <Link to="/create">Rank New Course</Link>
        </div> */}
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Auth />} />
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
