import React from 'react';
import './UserDropdown.scss';
import { Link } from 'react-router-dom';
import { FaChartBar, FaTachometerAlt } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';

interface UserDropdownProps {
  logout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ logout }) => {
  return (
    <div className="user-dropdown">
      <ul>
        <li>
          {/* The link now correctly points to the new dashboard page */}
          <Link to="/dashboard">
            <FaTachometerAlt />
            <span>Panel <br/>de control</span>
          </Link>
        </li>
        <li>
          <Link to="/stats">
            <FaChartBar />
            <span>Estadísticas</span>
          </Link>
        </li>
        <li className="separator"></li> 
        <li className="logout-item" onClick={logout}>
            <HiOutlineLogout />
            <span>Cerrar sesión</span>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
