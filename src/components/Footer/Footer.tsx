import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Volt. All rights reserved.</p>
      <div className="social-links">
        <a href="#">Twitter</a>
        <a href="#">LinkedIn</a>
        <a href="#">Discord</a>
      </div>
    </footer>
  );
};

export default Footer;
