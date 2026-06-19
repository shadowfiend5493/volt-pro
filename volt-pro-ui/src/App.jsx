import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import TrustedBy from './components/TrustedBy'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <TrustedBy />
      </main>
    </>
  )
}

export default App
