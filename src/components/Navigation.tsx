import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  const navItems = [
    { name: 'Join Us', path: '/' },
    { name: 'Home', path: '/home' },
    { name: 'Try On', path: '/try-on' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar" style={{ transition: 'all 0.3s ease' }}>
      <div className="navbar-inner">
        <Link 
          to="/" 
          className="navbar-logo"
          style={{ transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.filter = 'brightness(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'brightness(1)';
          }}
        >
          <div 
            className="navbar-logo-dot"
            style={{ transition: 'all 0.3s ease' }}
          ></div>
          GlowGuide
        </Link>
        <div className="navbar-links">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`navbar-link${isActive(item.path) ? ' active' : ''}`}
              style={{ 
                transition: 'all 0.3s ease',
                transform: hoveredItem === item.name ? 'translateY(-2px)' : 'translateY(0)',
                filter: hoveredItem === item.name ? 'brightness(1.1)' : 'brightness(1)'
              }}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;