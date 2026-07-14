import { Route, Routes } from 'react-router-dom'
import './App.css'
import EngineersPage from './components/EngineersPage'
import Header from './components/Header'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import TrustedBy from './components/TrustedBy'

// HomePage groups the landing-page sections so routing stays easy to read.
const HomePage = () => (
  <>
    <Hero />
    <StatsBar />
    <TrustedBy />
  </>
)

function App() {
  return (
    <>
      <Header />
      <main>
        {/* Routes decides which page component to render based on the browser URL. */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/engineers" element={<EngineersPage />} />
          {/* Fallback keeps unbuilt pages from showing a blank screen. */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
