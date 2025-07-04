import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-root hero-bg">
      <div className="hero-bubbles">
        <div className="hero-bubble b1"></div>
        <div className="hero-bubble b2"></div>
        <div className="hero-bubble b3"></div>
        <div className="hero-bubble b4"></div>
        <div className="hero-bubble b5"></div>
      </div>
      <div className="hero-sparkles" aria-hidden="true"></div>
      <main className="hero-main">
        <h1 className="hero-title-gradient">
          Discover Your Perfect Glow
        </h1>
        <p className="hero-desc">
          Upload your photo and let our AI analyze your unique features to provide personalized makeup recommendations that enhance your natural beauty.
        </p>
        <div className="hero-btn-row">
          <button className="hero-btn-main" onClick={() => navigate('/makeup-generator')}>
            Choose Photo
          </button>
          <button className="hero-btn-main" onClick={() => navigate('/try-on')}>
            Try Virtual Makeup
          </button>
        </div>
      </main>
    </div>
  );
};

export default Hero;