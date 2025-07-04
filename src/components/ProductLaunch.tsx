import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductLaunch.css';

const features = [
  {
    title: 'Smart Beauty Analysis',
    description: 'Our AI scans your features to reveal your unique beauty profile and unlock tailored insights.'
  },
  {
    title: 'Expert Makeup Matches',
    description: 'Receive handpicked makeup ideas and color palettes that fit your style and complexion.'
  },
  {
    title: 'See Your New Look Instantly',
    description: 'Try on makeup virtually and preview your transformation in real time.'
  }
];

const steps = [
  {
    title: 'Upload Your Photo',
    desc: 'Start by uploading a clear photo of yourself. Our AI will analyze your unique features.'
  },
  {
    title: 'Choose a Makeup Style',
    desc: 'Select from a curated list of trending and classic makeup looks, or upload your own reference.'
  },
  {
    title: 'See the Magic',
    desc: 'Watch as GlowGuide instantly applies your chosen look, letting you preview and adjust in real time.'
  }
];

const testimonials = [
  {
    name: 'Emily R.',
    text: 'GlowGuide completely changed how I approach makeup. The AI recommendations are spot on, and the virtual try-on is so much fun!',
    img: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    name: 'Sophia L.',
    text: 'I love how inclusive and easy to use GlowGuide is. I discovered new looks I never would have tried!',
    img: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Ava M.',
    text: 'The technology is amazing. I feel more confident and creative with my beauty routine now.',
    img: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

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