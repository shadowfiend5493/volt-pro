import { Route, Routes } from 'react-router-dom'
import './App.css'
import CartPage from './components/CartPage'
import ContactPage from './components/ContactPage'
import EngineersPage from './components/EngineersPage'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorPage from './components/ErrorPage'
import Header from './components/Header'
import Hero from './components/Hero'
import LoginPage from './components/LoginPage'
import MarketingPage from './components/MarketingPage'
import ProductDetailPage from './components/ProductDetailPage'
import ProductsPage from './components/ProductsPage'
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
    <ErrorBoundary>
      <Header />
      <main>
        {/* Routes decides which page component to render based on the browser URL. */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/engineers" element={<EngineersPage />} />
          {/* Each Route maps one clean URL to one page component, keeping navigation predictable. */}
          <Route path="/solutions" element={<MarketingPage pageKey="solutions" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/about" element={<MarketingPage pageKey="about" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Unknown URLs render a clear 404 instead of silently returning home. */}
          <Route
            path="*"
            element={(
              <ErrorPage
                statusCode="404"
                title="Page not found"
                message="The route you requested does not exist in VoltPro yet."
              />
            )}
          />
        </Routes>
      </main>
    </ErrorBoundary>
  )
}

export default App
