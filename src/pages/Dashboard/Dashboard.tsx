import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import { FaSort } from 'react-icons/fa';
import AddCommunityPopup from '../../components/AddCommunityPopup/AddCommunityPopup';
import {
  voltUser,
  voltCommunities,
  voltCampaigns,
} from '../../data/dash';
import type { Community, Campaign } from '../../data/dash';

const statusStyles: { [key: string]: string } = {
  'pending-approval': 'status-pending-approval',
  'pending': 'status-pending',
  'active': 'status-active',
};

const Dashboard: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleAddCommunityClick = () => setPopupOpen(true);
  const handleClosePopup = () => setPopupOpen(false);

  return (
    <div className="dashboard-layout">
      {/* The entire sidebar has been removed to revert to the original design. */}
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <h1>Hey {voltUser.username} 👋</h1>
        </header>
        
        {/* The main content is now permanently rendered. */}
        <section className="dashboard-section communities-section">
          <div className="section-header">
            <h2>My Communities</h2>
            <button className="btn-add-community" onClick={handleAddCommunityClick}>Add Community</button>
          </div>
          <div className="communities-grid">
            {voltCommunities.map((community: Community) => (
              <div key={community.id} className="community-card">
                <div className="community-icon"></div>
                <h3>{community.name}</h3>
                <p>Guild status: {community.guildStatus}</p>
                <Link to={`/community/${community.id}`} className="btn-manage">Manage</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section campaigns-section">
          <div className="section-header"><h2>My Campaigns</h2></div>
          <div className="campaigns-table">
            <div className="table-header">
              <span>Name</span>
              <span>Status <FaSort /></span>
              <span>Community</span>
              <span>Payment Info</span>
              <span>Number of Posts</span>
              <span>Activated At</span>
              <span>Link</span>
              <span>Brief</span>
            </div>
            <div className="table-body">
              {voltCampaigns.map((campaign: Campaign) => (
                <div key={campaign.id} className="table-row">
                  <span>{campaign.name}</span>
                  <div className="status-cell">
                    <span className={`status-badge ${statusStyles[campaign.status] || ''}`}>{campaign.status.replace('-', ' ')}</span>
                  </div>
                  <span>{campaign.communityName}</span>
                  <span>{campaign.paymentInfo}</span>
                  <span>{campaign.postCount}</span>
                  <span>{campaign.activationDate}</span>
                  <span>
                    {campaign.link !== 'No link' ? 
                      <a href={`https://${campaign.link}`} target="_blank" rel="noopener noreferrer">{campaign.link}</a> : 
                      'No link'}
                  </span>
                  <span><a href={campaign.briefUrl} target="_blank" rel="noopener noreferrer">View Brief</a></span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {isPopupOpen && <AddCommunityPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Dashboard;
