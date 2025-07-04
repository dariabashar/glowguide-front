import { useNavigate } from 'react-router-dom';
import './ProductLaunch.css';

export default function ProductLaunch() {
  const navigate = useNavigate();

  return (
    <div className="product-root product-hero-bg">
      <div className="product-bubbles">
        <div className="product-bubble b1"></div>
        <div className="product-bubble b2"></div>
        <div className="product-bubble b3"></div>
        <div className="product-bubble b4"></div>
        <div className="product-bubble b5"></div>
      </div>
      <div className="product-sparkles" aria-hidden="true"></div>
      <main className="product-hero-main">
        <h1 className="product-title-gradient">
          Discover Your Best Look.<br/>
          Try On Makeup Instantly.<br/>
          Glow With Confidence.
        </h1>
        <p className="product-hero-desc">
          Experience AI-powered virtual makeup. Upload your photo, explore trending looks, and see yourself transformed in seconds — all from the comfort of your home.
        </p>
        <button className="product-btn-main" onClick={() => navigate('/auth')}>
          Try Now
        </button>
      </main>
    </div>
  );
} 