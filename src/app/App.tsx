import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Index from "../pages/Index"
import TryOn from "../components/TryOn"
import About from "../components/About"
import ProductLaunch from "../components/ProductLaunch"
import Navigation from "../components/Navigation"
import MakeupLivePreview from "../components/MakeupLivePreview"
import AuthPage from "../pages/AuthPage"
import MakeupGenerator from "../pages/MakeupGenerator"

import { initGA, trackPageView } from "../utils/analytics"

// Обёртка для маршрутов с отслеживанием просмотров страниц
const AnalyticsWrapper = () => {
  const location = useLocation()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location])

  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<ProductLaunch />} />
        <Route path="/home" element={<Index />} />
        <Route path="/try-on" element={<TryOn />} />
        <Route path="/about" element={<About />} />
        <Route path="/launch" element={<ProductLaunch />} />
        <Route path="/preview" element={<MakeupLivePreview />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/makeup-generator" element={<MakeupGenerator />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  )
}

const App = () => (
  <BrowserRouter>
    <AnalyticsWrapper />
  </BrowserRouter>
)

export default App
