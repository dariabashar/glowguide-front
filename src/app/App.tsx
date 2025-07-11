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
// import { GoogleLoginButton } from '../components/GoogleloginButton'
// import { AuthCallback } from '../pages/AuthCallback';
// import { Dashboard } from '../pages/Dashboard';
import { initGA, trackPageView } from "../utils/analytics"
import { Analytics } from "@vercel/analytics/react";


const AnalyticsWrapper: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

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
        <Route path="/login" element={<GoogleLoginButton />} />
        <Route path="/auth/google/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AnalyticsWrapper />
    <Analytics />
  </BrowserRouter>
);

export default App;
