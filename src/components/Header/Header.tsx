import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { FaDiscord, FaBars, FaTimes } from 'react-icons/fa';
import UserDropdown from '../UserDropdown/UserDropdown';

const mockUser = {
  username: 'iron7ii',
  avatar: 'https://i.imgur.com/8a0wX2S.jpeg',
};

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('volt-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('volt-user');
    }
  }, []);

  const login = () => {
    localStorage.setItem('volt-user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('volt-user');
    setUser(null);
    setIsDropdownOpen(false);
  };

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeMenu = () => setIsNavOpen(false); // Closes mobile navigation
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Gets the correct class for active links
  const getLinkClass = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

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

  useEffect(() => {
    closeMenu(); // Close mobile nav on any route change
  }, [location]);

  return (
    <header className="main-header">
      <div className="logo-container">
        <Link to="/" className="logo">VOLT</Link>
      </div>

      <nav className={`main-nav ${isNavOpen ? 'open' : ''}`}>
        <ul>
            {/* Updated Navigation Links */}
            <li><Link to="/brands" className={getLinkClass('/brands')} onClick={closeMenu}>For Brands</Link></li>
            <li><Link to="/gamedevs" className={getLinkClass('/gamedevs')} onClick={closeMenu}>For Game Devs</Link></li>
            <li><Link to="/communities" className={getLinkClass('/communities')} onClick={closeMenu}>For Communities</Link></li>
            <li><Link to="/company" className={getLinkClass('/company')} onClick={closeMenu}>Company</Link></li>
            <li><Link to="/careers" className={getLinkClass('/careers')} onClick={closeMenu}>Careers</Link></li>
        </ul>
      </nav>

      <div className="auth-links" ref={dropdownRef}>
        {user ? (
          <div className="user-info-container">
            <button className="user-info-button" onClick={toggleDropdown}>
              <span className="username">{user.username}</span>
              <img src={user.avatar} alt="User Avatar" className="user-avatar" />
            </button>
            {isDropdownOpen && <UserDropdown logout={logout} />}
          </div>
        ) : (
          <a href="/auth" className="btn-discord-login" onClick={(e) => { e.preventDefault(); login(); }}>
            <FaDiscord />
            <span>Login with Discord</span>
          </a>
        )}
      </div>

      <div className="menu-toggle" onClick={toggleNav}>
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
