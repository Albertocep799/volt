import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column footer-brand">
          <h3>Volt</h3>
          <p>Supercharge your brand's reach in the gaming universe.</p>
          <div className="social-icons">
            <a href="#"><FaDiscord /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
        <div className="footer-column footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-column footer-links">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-column footer-newsletter">
          <h4>Stay Connected</h4>
          <p>Get the latest updates and news from Volt.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Volt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
