import React from 'react';
import { FaTimes, FaGoogle, FaDiscord } from 'react-icons/fa';
import './AuthModal.scss';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitchMode }) => {

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}><FaTimes /></button>
        
        <h2>{mode === 'login' ? 'Log In' : 'Create Account'}</h2>

        <div className="social-logins">
          {/* CORRECTED: Now an anchor tag pointing to the correct Google auth route */}
          <a href="/auth/google" className="social-btn google">
            <FaGoogle className="icon" /> Continue with Google
          </a>
          {/* CORRECTED: Updated the href to the new Discord auth route */}
          <a href="/auth/discord" className="social-btn discord">
            <FaDiscord className="icon" /> Continue with Discord
          </a>
        </div>

        <div className="divider">OR</div>

        <form className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="your@email.com" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>
          
          <div className="turnstile-placeholder">
            Cloudflare Turnstile Widget
          </div>

          <button type="submit" className="submit-btn">{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
        </form>

        <div className="toggle-mode">
          {mode === 'login' ? (
            <>
              Don't have an account?
              <button onClick={onSwitchMode}>Sign Up</button>
            </>
          ) : (
            <>
              Already have an account?
              <button onClick={onSwitchMode}>Log In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
