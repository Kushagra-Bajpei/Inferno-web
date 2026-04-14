import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer neat-clean">
      <div className="footer-top">
        <div className="footer-grid">
          {/* Column 1: Brand - Updated Section */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">INFERNO</h2>
            <p className="footer-desc">
              Igniting innovation and fostering a community of brilliant minds 
              to solve real-world challenges through technology.
            </p>
            <div className="footer-info-line">
              <span className="info-icon-span"><FaMapMarkerAlt /></span>
              <span>LPU, Punjab</span>
            </div>
            <div className="footer-social-v2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn-v2" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn-v2" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="/#events">Event Details</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><Link to="/team">Our Team</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col contact-col">
            <h3>Contact</h3>
            <ul>
              <li><a href="mailto:infernoofficial8@gmail.com">📩 infernoofficial8@gmail.com</a></li>
              <li><a href="tel:+916287830296">📱 +91 62878 30296</a></li>
              <li><a href="https://kushagra.portfolio" target="_blank" rel="noopener noreferrer">🌐 kushagra.portfolio</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-divider-container">
        <div className="footer-horizontal-line"></div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 INFERNO VERSE HACKATHON | ORGANIZED BY INFERNO | ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;
