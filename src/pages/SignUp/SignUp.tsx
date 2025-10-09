import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

const SignUp: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Create Your Account</h1>
          <p>Join Volt and connect with the gaming world's top brands.</p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary">Create Account</button>
          </form>
          <div className="auth-switch">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
