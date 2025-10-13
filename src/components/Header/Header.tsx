import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaDiscord, FaBars, FaTimes } from 'react-icons/fa';
import UserDropdown from '../UserDropdown/UserDropdown';
import './Header.scss';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dummy user data - replace with actual auth context
  const isAuthenticated = true;
  const user = { username: 'iron7ii', profilePic: 'https://via.placeholder.com/40' };

  const handleLogout = () => {
    console.log('User logged out');
    setIsDropdownOpen(false);
    // Implement actual logout logic here
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="main-header">
      <div className="logo-container">
        <Link to="/" className="logo">VOLT</Link>
      </div>
      <nav className={`main-nav ${isNavOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to="/brands">For Brands</NavLink></li>
          <li><NavLink to="/game-devs">For Game Devs</NavLink></li>
          <li><NavLink to="/communities">For Communities</NavLink></li>
          <li><NavLink to="/company">Company</NavLink></li>
          <li><NavLink to="/careers">Careers</NavLink></li>
        </ul>
      </nav>
      <div className="auth-links">
        {isAuthenticated ? (
          <div className="user-info-container" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="user-info-button">
              <span className="username">{user.username}</span>
              <img src={user.profilePic} alt="User Avatar" className="user-avatar" />
            </button>
            {isDropdownOpen && (
               <UserDropdown onLogout={handleLogout} />
            )}
          </div>
        ) : (
          <Link to="/login/discord" className="btn-discord-login">
            <FaDiscord />
            Login with Discord
          </Link>
        )}
      </div>
      <div className="menu-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
