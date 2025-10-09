import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo-container">
        <Link to="/" className="logo">VOLT</Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><NavLink to="/brands">For Brands</NavLink></li>
          <li><NavLink to="/gamedevs">For Game Devs</NavLink></li>
          <li><NavLink to="/communities">For Communities</NavLink></li>
          <li><NavLink to="/company">Company</NavLink></li>
          <li><NavLink to="/careers">Careers</NavLink></li>
        </ul>
      </nav>
      <div className="auth-links">
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
