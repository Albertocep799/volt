import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaStar, FaUserCheck, FaHandshake, FaSun, FaAdjust, FaMoon } from 'react-icons/fa';
import './ServerCard.scss';
import type { Server } from '../../data/network';

interface ServerCardProps {
  server: Server;
}

// Helper to get the correct icon based on peak activity hours
const PeakActivityIcon: React.FC<{ peakHours: Server['peakActivityHours'] }> = ({ peakHours }) => {
  // Since we've corrected the data, there should only be one peak hour.
  // This logic handles the display of the correct icon for that hour.
  const peakHour = peakHours[0] || ''; 
  let icon = null;
  let title = '';

  if (peakHour.includes('Night')) {
    icon = <FaMoon className="stat-icon" />;
    title = `Peak Activity: Night (0-6)`;
  } else if (peakHour.includes('Evening')) {
    icon = <FaAdjust className="stat-icon" />;
    title = `Peak Activity: Evening (18-24)`;
  } else if (peakHour.includes('Afternoon')) {
    icon = <FaSun className="stat-icon" />; // Using FaSun for Afternoon now
    title = `Peak Activity: Afternoon (12-18)`;
  } else if (peakHour.includes('Morning')) {
    icon = <FaSun className="stat-icon" />;
    title = `Peak Activity: Morning (6-12)`;
  }

  if (!icon) {
    return null;
  }

  return (
    <div className="stat-item" title={title}>
      {icon}
    </div>
  );
};

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  // Helper to determine the color class for the acceptance rate badge
  const getAcceptanceRateStatus = (rate: number) => {
    if (rate >= 70) return 'high';
    if (rate >= 31) return 'medium';
    return 'low';
  };

  return (
    <Link to={`/network/${server.id}`} className="server-card">
      <div className="server-card-header">
          <img src={server.bannerUrl} alt={`${server.name} banner`} className="server-card-banner" />
          <div className={`acceptance-rate-badge ${getAcceptanceRateStatus(server.promotionAcceptanceRate)}`}>
              {server.promotionAcceptanceRate}%
          </div>
          <div className="server-card-icon-wrapper">
            <img src={server.iconUrl} alt={`${server.name} icon`} className="server-card-icon"/>
          </div>
      </div>
      
      <div className="server-card-body">
          <div className="server-card-name">
              <h3>{server.name}</h3>
              {server.isVerified && <FaCheckCircle className="verified-icon" />}
          </div>
          <p className="server-card-members">{formatMemberCount(server.memberCount)} members</p>
          <p className="server-card-description">{server.description}</p>
      </div>

      <div className="server-card-footer">
          <div className="server-card-stats">
              <div className="stat-item">
                  <FaStar className="stat-icon" />
                  <span>{server.rating.toFixed(1)}</span>
              </div>
              <PeakActivityIcon peakHours={server.peakActivityHours} />
              {server.hasInfluencers && (
                  <div className="stat-item" title="Has Influencers">
                      <FaUserCheck className="stat-icon" />
                  </div>
              )}
              {server.hasPreviousCollaborations && (
                  <div className="stat-item" title="Has Previous Collaborations">
                      <FaHandshake className="stat-icon" />
                  </div>
              )}
          </div>
          <div className="server-card-category">
              <span>{server.category}</span>
          </div>
      </div>
    </Link>
  );
};

export default ServerCard;
