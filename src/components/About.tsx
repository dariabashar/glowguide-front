import { useState } from 'react';
import './About.css';

const About = () => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const values = [
    {
      title: "Self-Love First",
      description: "We believe beauty starts with loving yourself exactly as you are."
    },
    {
      title: "Inclusive Beauty",
      description: "Our AI technology works for all skin tones, ages, and face shapes."
    },
    {
      title: "Innovation Meets Beauty",
      description: "Cutting-edge technology to enhance your natural beauty journey."
    },
    {
      title: "Quality Promise",
      description: "Only the best recommendations from trusted beauty brands."
    }
  ];

  return (
    <div className="about-root">
      <div className="about-bubbles">
        <div className="about-bubble b1"></div>
        <div className="about-bubble b2"></div>
        <div className="about-bubble b3"></div>
        <div className="about-bubble b4"></div>
        <div className="about-bubble b5"></div>
      </div>
      <div className="about-sparkles" aria-hidden="true"></div>
      <section className="about-hero fadein">
        <h1 className="about-title-glow">About GlowGuide</h1>
        <p className="about-subtitle">Revolutionizing beauty with AI-powered, personalized makeup recommendations for everyone.</p>
      </section>
      <section className="about-story glass fadein">
        <div className="about-story-content">
          <h2 className="about-section-title">Our Story</h2>
          <div className="about-story-text">
            <p>
              GlowGuide was born from a simple belief: everyone deserves to feel beautiful and confident in their own skin. Our founder, Sarah, struggled for years to find makeup that truly complemented her unique features.
            </p>
            <p>
              Traditional beauty advice was often one-size-fits-all, ignoring the beautiful diversity of individual faces, skin tones, and personal styles. That's when we decided to harness the power of AI to create truly personalized beauty recommendations.
            </p>
            <p>
              Today, GlowGuide uses advanced computer vision and machine learning to analyze your unique features and suggest makeup looks that enhance your natural beauty. We're not about changing who you are – we're about helping you glow even brighter.
            </p>
          </div>
        </div>
        <div className="about-story-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
            alt="Beauty and technology"
            className="about-story-image"
          />
          <div className="about-story-bubble"></div>
        </div>
      </section>
      <section className="about-values fadein">
        <h2 className="about-section-title">Our Values</h2>
        <div className="about-values-row">
          {values.map((value, index) => (
            <div
              key={index}
              className={`about-value-card glass${hoveredValue === index ? ' hovered' : ''}`}
              onMouseEnter={() => setHoveredValue(index)}
              onMouseLeave={() => setHoveredValue(null)}
            >
              <h3 className="about-value-title">{value.title}</h3>
              <p className="about-value-desc">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-mission glass fadein">
        <h2 className="about-section-title">Our Mission</h2>
        <p className="about-mission-text">
          To democratize personalized beauty by making AI-powered makeup recommendations accessible to everyone, celebrating the unique beauty in each individual while fostering confidence and self-expression.
        </p>
      </section>
      <section className="about-stats fadein">
        <div className="about-stat-card glass">
          <div className="about-stat-number">95%</div>
          <div className="about-stat-label">Satisfaction Rate</div>
        </div>
        <div className="about-stat-card glass">
          <div className="about-stat-number">24/7</div>
          <div className="about-stat-label">AI Support</div>
        </div>
      </section>
    </div>
  );
};

export default About;