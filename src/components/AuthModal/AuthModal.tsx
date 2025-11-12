import React, { useEffect, useRef, useState } from 'react';
import { FaTimes, FaGoogle, FaDiscord, FaCheck } from 'react-icons/fa';
import './AuthModal.scss';

// Extend the Window interface to include the turnstile object for TypeScript
declare global {
  interface Window {
    turnstile: any;
  }
}

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitchMode }) => {
  const [token, setToken] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validateEmail = (email: string) => {
    if (mode === 'signup' && !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (mode === 'signup') {
      const newCriteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
      };
      setPasswordCriteria(newCriteria);

      if (confirmPassword) {
        if (password !== confirmPassword) {
          setConfirmPasswordError('Passwords do not match.');
        } else {
          setConfirmPasswordError('');
        }
      }
      return Object.values(newCriteria).every(v => v);
    }
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password !== newConfirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);
      const doPasswordsMatch = password === confirmPassword;

      if (!doPasswordsMatch) {
        setConfirmPasswordError('Passwords do not match.');
      }

      if (isEmailValid && isPasswordValid && doPasswordsMatch) {
        console.log('Form is valid and ready to be submitted.');
      }
    } else {
      console.log('Logging in...');
    }
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEmailError('');
    setConfirmPasswordError('');
    setPasswordCriteria({
      length: false, uppercase: false, lowercase: false, number: false, special: false
    });
    setToken('');

    if (turnstileContainerRef.current && window.turnstile) {
      widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: '0x4AAAAAAB0iEGLj3LsOK3xV',
        callback: (token: string) => setToken(token),
        theme: 'light',
      });
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [mode]);

  const allPasswordCriteriaMet = Object.values(passwordCriteria).every(v => v);
  const isSignupFormInvalid = mode === 'signup' && (
    !email || !!emailError || 
    !password || !allPasswordCriteriaMet || 
    !confirmPassword || password !== confirmPassword || 
    !token
  );

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}><FaTimes /></button>
        <h2>{mode === 'login' ? 'Log In' : 'Create Account'}</h2>

        <div className="social-logins">
          <a href="/auth/google" className="social-btn google"><FaGoogle className="icon" /> Continue with Google</a>
          <a href="/auth/discord" className="social-btn discord"><FaDiscord className="icon" /> Continue with Discord</a>
        </div>

        <div className="divider">OR</div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="your@email.com" required value={email} onChange={handleEmailChange} />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required value={password} onChange={handlePasswordChange} />
            {mode === 'signup' && (
              <ul className="password-criteria-list">
                <li className={passwordCriteria.length ? 'valid' : 'invalid'}>{passwordCriteria.length ? <FaCheck /> : <FaTimes />} At least 8 characters</li>
                <li className={passwordCriteria.uppercase ? 'valid' : 'invalid'}>{passwordCriteria.uppercase ? <FaCheck /> : <FaTimes />} One uppercase letter</li>
                <li className={passwordCriteria.lowercase ? 'valid' : 'invalid'}>{passwordCriteria.lowercase ? <FaCheck /> : <FaTimes />} One lowercase letter</li>
                <li className={passwordCriteria.number ? 'valid' : 'invalid'}>{passwordCriteria.number ? <FaCheck /> : <FaTimes />} One number</li>
                <li className={passwordCriteria.special ? 'valid' : 'invalid'}>{passwordCriteria.special ? <FaCheck /> : <FaTimes />} One special character</li>
              </ul>
            )}
          </div>

          {mode === 'signup' && (
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="••••••••" required value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
            </div>
          )}
          
          <div ref={turnstileContainerRef} className="turnstile-widget-container"></div>

          <button type="submit" className="submit-btn" disabled={mode === 'login' ? !token : isSignupFormInvalid}>
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
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
