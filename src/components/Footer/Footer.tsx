import { Link } from 'react-router-dom';
import { FaDiscord, FaTwitter, FaYoutube } from 'react-icons/fa';
import CustomSelect from '../CustomSelect/CustomSelect'; // Import the new component
import './Footer.scss';

const Footer: React.FC = () => {
  // Define the language options for the custom select
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'da', label: 'Dansk' },
    { value: 'cs', label: 'Čeština' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column footer-brand">
          <h3>Volt</h3>
          <p>Supercharge your brand's reach in the gaming universe.</p>
          
          {/* Replace the old select with the new CustomSelect component */}
          <CustomSelect 
            label="Language" 
            options={languageOptions} 
            defaultSelected={languageOptions[0]}
          />

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
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-column footer-links">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
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
