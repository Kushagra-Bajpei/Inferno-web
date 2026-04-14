import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLinkClick = (e, href) => {
    setIsActive(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/' + href);
      }
    }
  };

  return (
    <header>
      <div className="logo" id="logo-3d" style={{ display: 'none' }}>INFERNO</div>
      <div className="logo">
        <Link to="/">
          <img src="/INFERNO LOGO (2).png" alt="INFERNO Logo" className="logo-image" />
        </Link>
      </div>
      <nav>
        <ul className={isActive ? 'active' : ''}>
          <li><Link to="/#home" onClick={(e) => handleLinkClick(e, '#home')}>Home</Link></li>
          <li><Link to="/#about" onClick={(e) => handleLinkClick(e, '#about')}>About</Link></li>
          <li><Link to="/#events" onClick={(e) => handleLinkClick(e, '#events')}>Events</Link></li>
          <li><Link to="/team" onClick={() => setIsActive(false)}>Team</Link></li>
          <li><Link to="/gallery" onClick={() => setIsActive(false)}>Gallery</Link></li>
          <li><Link to="/#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Contact</Link></li>
        </ul>
      </nav>
      <div className={`menu-toggle ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="hamburger"></div>
      </div>
    </header>
  );
};

export default Navbar;
