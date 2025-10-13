import React from 'react';
import { Link } from 'react-router-dom';
import './UserDropdown.scss';
import { FaUserCircle, FaTachometerAlt, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

interface UserDropdownProps {
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onLogout }) => {
  return (
    <div className="user-dropdown-container">
      <ul className="dropdown-menu">
        <li>
          <Link to="/profile">
            <FaUserCircle />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/statistic">
            <FaChartBar />
            <span>Statistics</span>
          </Link>
        </li>
        <div className="separator"></div>
        <li onClick={onLogout} className="logout-item">
            <FaSignOutAlt />
            <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
