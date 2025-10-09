import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={`header ${navOpen ? 'nav-open' : ''}`}>
      <div className="logo">
        <NavLink to="/">Volt</NavLink>
      </div>
      <button className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className="main-nav">
        <ul>
          <li><NavLink to="/features" activeClassName="active" onClick={() => setNavOpen(false)}>Features</NavLink></li>
          <li><NavLink to="/how-it-works" activeClassName="active" onClick={() => setNavOpen(false)}>How It Works</NavLink></li>
          <li><NavLink to="/testimonials" activeClassName="active" onClick={() => setNavOpen(false)}>Testimonials</NavLink></li>
          <li><NavLink to="/faq" activeClassName="active" onClick={() => setNavOpen(false)}>FAQ</NavLink></li>
        </ul>
      </nav>
      <div className="actions">
        <NavLink to="/login" className="btn btn-secondary">Login</NavLink>
        <NavLink to="/contact" className="btn btn-primary">Contact Us</NavLink>
      </div>
    </header>
  );
};

export default Header;
