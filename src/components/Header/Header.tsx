import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import UserDropdown from '../UserDropdown/UserDropdown';
import AuthModal from '../AuthModal/AuthModal';
import './Header.scss';

const Header: React.FC = () => {
  // Now consuming the provider as well to make the avatar logic work for both services
  const { isAuthenticated, user, provider, logout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'signup'>('login');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isAuthenticated, isModalOpen]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const openModal = (mode: 'login' | 'signup') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const switchModalMode = () => {
    setModalMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
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

  // CORRECTED: This function now handles avatars from both Google and Discord.
  const getAvatarUrl = () => {
    if (!user || !user.avatar) {
      // Fallback for users without a custom avatar (Discord style)
      const discordDefaultAvatarIndex = parseInt(user?.id.slice(-1) ?? '0') % 5;
      return `https://cdn.discordapp.com/embed/avatars/${discordDefaultAvatarIndex}.png`;
    }

    // Google provides a full URL, so we use it directly.
    if (provider === 'google') {
      return user.avatar;
    }

    // For Discord, we construct the URL as before.
    if (provider === 'discord') {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    }

    // A generic fallback in case the provider is not set, though it shouldn't happen.
    return user.avatar;
  };

  return (
    <>
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
          {isAuthenticated && user ? (
            <div className="user-info-container" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="user-info-button">
                <span className="username">{user.username}</span>
                <img src={getAvatarUrl()} alt="User Avatar" className="user-avatar" />
              </button>
              {isDropdownOpen && <UserDropdown onLogout={handleLogout} />}
            </div>
          ) : (
            <>
              <button onClick={() => openModal('login')} className="auth-btn login">Log In</button>
              <button onClick={() => openModal('signup')} className="auth-btn signup">Sign Up</button>
            </>
          )}
        </div>
        <div className="menu-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>
          {isNavOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      {isModalOpen && (
        <AuthModal 
          mode={modalMode} 
          onClose={closeModal} 
          onSwitchMode={switchModalMode} 
        />
      )}
    </>
  );
};

export default Header;
