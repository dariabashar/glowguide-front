import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Lips Gloss', img: '/public/examples/custom.jpg' },
  { name: 'Moisturizer', img: '/public/examples/day.jpg' },
  { name: 'Eyeliner', img: '/public/examples/evening.jpg' },
  { name: 'Serum', img: '/public/examples/custom.jpg' },
  { name: 'Cleanser', img: '/public/examples/day.jpg' },
  { name: 'Perfume', img: '/public/examples/evening.jpg' },
];

const products = [
  { name: 'Flawless Foundation', price: 10, img: '/public/examples/day.jpg', rating: 5 },
  { name: 'Premium Foundation', price: 15, img: '/public/examples/custom.jpg', rating: 4 },
  { name: 'Active Foundation', price: 12, img: '/public/examples/evening.jpg', rating: 4 },
  { name: 'Liquid Lip Gloss', price: 16, img: '/public/examples/custom.jpg', rating: 5 },
  { name: 'Natural Cream', price: 9, img: '/public/examples/day.jpg', rating: 4 },
  { name: 'Lipstick Set', price: 14, img: '/public/examples/evening.jpg', rating: 5 },
  { name: 'Gold Eyeshadow', price: 11, img: '/public/examples/custom.jpg', rating: 4 },
  { name: 'Face Mist', price: 13, img: '/public/examples/day.jpg', rating: 4 },
];

export default function Home() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 4, hours: 19, minutes: 22, seconds: 50 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 100%)', minHeight: '100vh' }}>
      {/* Top Bar */}
      <div style={{ background: '#f8e1ef', color: '#a855f7', fontSize: 14, padding: '8px 0', textAlign: 'center', letterSpacing: 0.5 }}>
        Summer Sale Starts Now • Free Shipping Over $50 • support@glowguide.com
      </div>
      {/* Header/Menu */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1280, margin: '0 auto', padding: '24px 32px 0 32px' }}>
        <div style={{ fontWeight: 900, fontSize: 32, color: '#a855f7', letterSpacing: 2 }}>GlowGuide</div>
        <nav style={{ display: 'flex', gap: 32, fontWeight: 600, fontSize: 18 }}>
          <span style={{ cursor: 'pointer', color: '#a855f7' }} onClick={() => navigate('/')}>Home</span>
          <span style={{ cursor: 'pointer' }}>Shop</span>
          <span style={{ cursor: 'pointer' }}>About</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </nav>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <span style={{ fontSize: 18, color: '#a855f7', cursor: 'pointer' }}>EN</span>
          <span style={{ fontSize: 18, color: '#a855f7', cursor: 'pointer' }}>Cart</span>
        </div>
      </div>
      {/* Hero Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, maxWidth: 1200, margin: '48px auto 0 auto', flexWrap: 'wrap' }}>
        <img src="/public/examples/custom.jpg" alt="hero" style={{ width: 420, borderRadius: 32, boxShadow: '0 8px 48px #e9d5ff55', objectFit: 'cover' }} />
        <div style={{ maxWidth: 500 }}>
          <div style={{ color: '#f472b6', fontWeight: 700, fontSize: 18, letterSpacing: 1, marginBottom: 12 }}>TOP BRANDS</div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#a855f7', margin: 0, lineHeight: 1.1 }}>Spotless Beauty For Your Healthy Skin</h1>
          <p style={{ color: '#6b21a8', fontSize: 18, margin: '24px 0 32px 0', lineHeight: 1.6 }}>
            Discover your perfect look with AI-powered recommendations and virtual try-on. Shop the best in beauty, skincare, and more.
          </p>
          <div style={{ display: 'flex', gap: 18 }}>
            <button style={{ background: 'linear-gradient(90deg, #f472b6 0%, #a78bfa 100%)', color: 'white', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '14px 36px', cursor: 'pointer', boxShadow: '0 2px 8px #f472b655', transition: 'all 0.2s' }}>Shop Now</button>
            <button style={{ background: 'white', color: '#a855f7', fontWeight: 700, fontSize: 18, border: '2px solid #a855f7', borderRadius: 8, padding: '14px 36px', cursor: 'pointer', boxShadow: '0 2px 8px #a855f755', transition: 'all 0.2s' }}>Read More</button>
          </div>
        </div>
      </div>
      {/* Category Section */}
      <div style={{ maxWidth: 1100, margin: '64px auto 0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 32, color: '#a855f7' }}>Shop By Category</h2>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <img src={cat.img} alt={cat.name} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 12px #a855f733' }} />
              <span style={{ fontWeight: 600, color: '#6b21a8', fontSize: 16 }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Products Section */}
      <div style={{ maxWidth: 1200, margin: '64px auto 0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 32, color: '#a855f7' }}>Hand Picked Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
          {products.map(prod => (
            <div key={prod.name} style={{ background: 'white', borderRadius: 24, boxShadow: '0 8px 32px #a78bfa22', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.3s, transform 0.3s', cursor: 'pointer' }}>
              <img src={prod.img} alt={prod.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 16, marginBottom: 18, boxShadow: '0 2px 12px #f472b633' }} />
              <div style={{ fontWeight: 700, fontSize: 18, color: '#a855f7', marginBottom: 8 }}>{prod.name}</div>
              <div style={{ color: '#6b21a8', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>${prod.price.toFixed(2)}</div>
              <div style={{ color: '#f472b6', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{'★'.repeat(prod.rating)}{'☆'.repeat(5 - prod.rating)}</div>
              <button style={{ background: 'linear-gradient(90deg, #f472b6 0%, #a78bfa 100%)', color: 'white', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '10px 28px', cursor: 'pointer', marginTop: 8, boxShadow: '0 2px 8px #f472b655', transition: 'all 0.2s' }}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 80 }} />
    </div>
  );
}