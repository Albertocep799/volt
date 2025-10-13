
import React, { useState } from 'react';
import './EmailAuthModal.scss';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

interface EmailAuthModalProps {
  onClose: () => void;
}

const EmailAuthModal: React.FC<EmailAuthModalProps> = ({ onClose }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const renderLoginForm = () => (
    <>
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="example@gmail.com" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <div className="input-with-icon">
          <input type={showPassword ? 'text' : 'password'} placeholder="--" />
          <div className="icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <div className="form-group">
        <label>Name</label>
        <input type="text" placeholder="John Doe" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="example@gmail.com" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <div className="input-with-icon">
          <input type={showPassword ? 'text' : 'password'} placeholder="--" />
          <div className="icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Repeat password</label>
        <div className="input-with-icon">
          <input type={showRepeatPassword ? 'text' : 'password'} placeholder="--" />
          <div className="icon" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
            {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
        
        <h2>Authorize with Email</h2>

        <div className="auth-tabs">
          <button 
            className={`tab-btn ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => setAuthMode('login')}
          >
            Login
          </button>
          <button 
            className={`tab-btn ${authMode === 'register' ? 'active' : ''}`}
            onClick={() => setAuthMode('register')}
          >
            Registration
          </button>
        </div>

        <form className="auth-form">
          {authMode === 'login' ? renderLoginForm() : renderRegisterForm()}

          <div className="captcha-placeholder">
            {/* Replace with a real captcha like reCAPTCHA or Cloudflare Turnstile */}
            <div className="spinner"></div>
            <span>Verificando...</span>
            <div className="captcha-logo">
                <p>Cloudflare</p>
            </div>
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EmailAuthModal;
