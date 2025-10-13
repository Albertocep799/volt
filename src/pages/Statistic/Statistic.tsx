import React from 'react';
import { Link } from 'react-router-dom';
import './Statistic.scss';
import { FaChevronRight, FaPlus } from 'react-icons/fa';
import { voltUser, voltCommunities } from '../../data/dash';

const additionalServers = [
  { id: '3', name: 'Minecraft Staffs Hispanos', icon: 'https://i.imgur.com/3Y2173l.png' },
  { id: '4', name: 'Sinners', icon: 'https://i.imgur.com/16FEVQF.png' },
  { id: '5', name: 'Staffs Hispanos', icon: 'https://i.imgur.com/T3f0TfT.png' },
  { id: '6', name: 'Gold and Glory', icon: 'https://i.imgur.com/T3f0TfT.png' },
  { id: '7', name: 'Nexus Voyagers', icon: 'https://i.imgur.com/T3f0TfT.png' }
];

const Statistic: React.FC = () => {
  const registeredServers = voltCommunities;
  const unregisteredServers = additionalServers.filter(
    (server) => !registeredServers.some((registered) => registered.id === server.id)
  );

  const getSafeIcon = (url?: string) => {
    const fallbackIcon = 'https://i.imgur.com/T3f0TfT.png';
    if (url && !url.includes('example.com')) {
      return url;
    }
    return fallbackIcon;
  };

  return (
    <div className="statistic-page-background">
      <div className="statistic-content-wrapper">
        <div className="statistic-card">
          <div className="logged-in-as">
            <img src={getSafeIcon(voltUser.avatar)} alt="User Avatar" />
            <span>Logged in as <strong>{voltUser.username}</strong></span>
          </div>
          <div className="server-list-container">
            <div className="server-list registered-servers">
              {registeredServers.map(server => (
                <Link to={`/community/${server.id}`} key={server.id} className="server-item">
                  <div className="server-info">
                    <img src={getSafeIcon(server.imageUrl)} alt={`${server.name} icon`} className="server-icon" />
                    <span className="server-name">{server.name}</span>
                  </div>
                  <FaChevronRight className="action-icon" />
                </Link>
              ))}
            </div>
            <div className="separator"></div>
            <div className="server-list unregistered-servers">
              {unregisteredServers.map(server => (
                <div key={server.id} className="server-item">
                  <div className="server-info">
                    <img src={getSafeIcon(server.icon)} alt={`${server.name} icon`} className="server-icon" />
                    <span className="server-name">{server.name}</span>
                  </div>
                  <FaPlus className="action-icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="statistic-footer">
          <p>
            <span>© 2025 Volt</span>
            <span className="separator-dot">•</span>
            <Link to="/terms-of-service">Terms</Link>
            <span className="separator-dot">•</span>
            <Link to="/privacy-policy">Privacy</Link>
            <span className="separator-dot">•</span>
            <Link to="/legal">Legal Notice</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Statistic;
