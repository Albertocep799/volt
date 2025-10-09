import React from 'react';
import './Signup.scss';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Create Account</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
