import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../../components/AuthModal/AuthModal';
import { mockServers, type Server, type Campaign, type SocialLinks, type FaqItem } from '../../data/network';
import { FaArrowLeft, FaCheckCircle, FaUsers, FaLanguage, FaChartBar, FaCalendarAlt, FaBullhorn, FaStar, FaGlobe, FaPalette, FaCode, FaMusic, FaReddit, FaKickstarterK, FaPlus, FaMinus, FaCalendarCheck, FaHandshake, FaQuestionCircle } from 'react-icons/fa';
import { FaXTwitter, FaTwitch, FaYoutube, FaDiscord } from 'react-icons/fa6';
import './ServerProfile.scss';

const getServerById = (isAuthenticated: boolean, serverId: string | undefined): Server | undefined => {
  if (!isAuthenticated || !serverId) {
    return undefined;
  }
  return mockServers.find(s => s.id === serverId);
};


// --- Sub-component for Campaign Statistics --- //
const ServerProfileCampaigns: React.FC<{ campaigns: Campaign[] }> = ({ campaigns }) => {
    if (campaigns.length === 0) {
        return <div className="no-campaigns-data">No campaign data available for this server.</div>;
    }

    const avgCtr = campaigns.reduce((acc, c) => acc + c.ctr, 0) / campaigns.length;
    const avgConversionRate = campaigns.reduce((acc, c) => acc + c.conversionRate, 0) / campaigns.length;

    return (
        <div className="server-profile-campaigns">
            <h3>Campaign Performance</h3>
            <div className="campaign-summary-stats">
                <div className="summary-stat-card">
                    <div className="stat-value">{avgCtr.toFixed(2)}%</div>
                    <div className="stat-label">Avg. Click-Through Rate (CTR)</div>
                </div>
                <div className="summary-stat-card">
                    <div className="stat-value">{avgConversionRate.toFixed(2)}%</div>
                    <div className="stat-label">Avg. Conversion Rate</div>
                </div>
            </div>

            <h4>Campaign History</h4>
            <div className="campaign-table-container">
                <table className="campaign-table">
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Period</th>
                            <th>Impressions</th>
                            <th>Clicks</th>
                            <th>CTR (%)</th>
                            <th>Conversions</th>
                            <th>Conv. Rate (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map(campaign => (
                            <tr key={campaign.id}>
                                <td>{campaign.name}</td>
                                <td>{`${campaign.startDate.toLocaleDateString()} - ${campaign.endDate.toLocaleDateString()}`}</td>
                                <td>{campaign.impressions.toLocaleString()}</td>
                                <td>{campaign.clicks.toLocaleString()}</td>
                                <td>{campaign.ctr.toFixed(2)}</td>
                                <td>{campaign.conversions.toLocaleString()}</td>
                                <td>{campaign.conversionRate.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- FAQ Accordion Item --- //
const AccordionItem: React.FC<{ item: FaqItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="faq-item">
        <button className="faq-question" onClick={onClick}>
            <span>{item.question}</span>
            {isOpen ? <FaMinus /> : <FaPlus />}
        </button>
        {isOpen && <div className="faq-answer"><p>{item.answer}</p></div>}
    </div>
);

// --- Sub-component for Server Overview --- //
const ServerProfileOverview: React.FC<{ server: Server }> = ({ server }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleFaqToggle = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
    <div className="server-profile-overview">
        <div className="overview-main-grid">
            {/* --- Main Content --- */}
            <div className="overview-main-content">
                <div className="overview-section">
                    <h3>About Us</h3>
                    <p>{server.description}</p>
                </div>

                <div className="overview-section">
                    <h3>Responsible Staff</h3>
                    <div className="staff-grid">
                        {server.staff.length > 0 ? server.staff.map((member, index) => (
                            <div key={index} className="staff-card">
                                <img src={member.avatarUrl} alt={member.name} className="staff-avatar" />
                                <div className="staff-info">
                                    <span className="staff-name">{member.name}</span>
                                    <span className="staff-role">{member.role}</span>
                                </div>
                            </div>
                        )) : <p>No staff information provided.</p>}
                    </div>
                </div>

                <div className="overview-section">
                    <h3><FaQuestionCircle /> Brand FAQ</h3>
                    <div className="faq-container">
                        {server.brandFaq.length > 0 ? server.brandFaq.map((faq, index) => (
                            <AccordionItem 
                                key={index} 
                                item={faq} 
                                isOpen={openFaq === index} 
                                onClick={() => handleFaqToggle(index)}
                            />
                        )) : <p>No frequently asked questions provided.</p>}
                    </div>
                </div>
            </div>

            {/* --- Sidebar --- */}
            <div className="overview-sidebar">
                 <div className="overview-section">
                    <h3>Server Insights</h3>
                    <div className="overview-stats-list">
                        <div className="stat-item"><FaUsers className="stat-icon" /> <strong>Members:</strong> {server.memberCount.toLocaleString()}</div>
                        <div className="stat-item"><FaStar className="stat-icon" /> <strong>Rating:</strong> {server.rating}/5.0</div>
                        <div className="stat-item"><FaLanguage className="stat-icon" /> <strong>Language:</strong> {server.language}</div>
                        <div className="stat-item"><FaChartBar className="stat-icon" /> <strong>Monthly Growth:</strong> {server.monthlyGrowth.toLocaleString()}</div>
                        <div className="stat-item"><FaBullhorn className="stat-icon" /> <strong>Promo Acceptance:</strong> {server.promotionAcceptanceRate}%</div>
                        <div className="stat-item"><FaCalendarAlt className="stat-icon" /> <strong>Last Promotion:</strong> {server.lastPromotionDate.toLocaleDateString()}</div>
                    </div>
                </div>

                <div className="overview-section">
                    <h3><FaCalendarCheck /> Event Availability</h3>
                    <div className="info-card">
                        <p>{server.eventAvailability}</p>
                    </div>
                </div>
                <div className="overview-section">
                    <h3><FaHandshake /> Accepted Collaborations</h3>
                    <div className="info-card">
                        <ul className="collab-list">
                            {server.collaborationTypes.length > 0 ? server.collaborationTypes.map((type, index) => (
                                <li key={index}>{type}</li>
                            )) : <li>No specific types listed.</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

// --- Main Profile Component --- //
const ServerProfile: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [modalMode, setModalMode] = useState<'login' | 'signup'>('login');
  const { serverId } = useParams<{ serverId: string }>();
  const [server, setServer] = useState<Server | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setServer(getServerById(isAuthenticated, serverId));
  }, [isAuthenticated, serverId]);

  if (!isAuthenticated) {
    return (
      <div className="network-auth-required">
        <AuthModal
          mode={modalMode}
          onClose={() => {}}
          onSwitchMode={() => setModalMode(prev => prev === 'login' ? 'signup' : 'login')}
        />
      </div>
    );
  }

  if (!server) {
    return (
      <div className="server-profile-page not-found">
        <h2>Server Not Found</h2>
        <Link to="/network" className="back-link">Back to Network</Link>
      </div>
    );
  }

  const categoryIcons: { [key: string]: React.ReactElement } = {
    Gaming: <FaGlobe/>,
    Anime: <FaPalette/>,
    Tech: <FaCode/>,
    Music: <FaMusic/>,
    Education: <FaUsers/>,
    'Art & Design': <FaPalette/>
  };

  const socialIcons: { [key in keyof SocialLinks]: React.ReactElement } = {
    youtube: <FaYoutube />,
    twitch: <FaTwitch />,
    twitter: <FaXTwitter />,
    reddit: <FaReddit />,
    kick: <FaKickstarterK />,
    discord: <FaDiscord />
  };

  return (
    <div className="server-profile-page">
        <div className="profile-header-banner" style={{ backgroundImage: `url(${server.bannerUrl})` }}>
            <Link to="/network" className="back-link"><FaArrowLeft /> Back to Network</Link>
        </div>
      
        <div className="profile-content">
            <div className="profile-details-header">
                <div className="profile-icon-wrapper">
                    <img src={server.iconUrl} alt={`${server.name} icon`} className="profile-icon" />
                </div>
                <div className="profile-name-actions">
                    <div className="profile-name">
                        <h1>{server.name}</h1>
                        {server.isVerified && <FaCheckCircle className="verified-icon" title="Verified Server" />}
                    </div>
                    <div className="profile-meta-container">
                        <div className="profile-socials">
                            {Object.entries(server.socials).map(([key, url]) => (
                                url && (
                                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={`social-link ${key}`}>
                                        {socialIcons[key as keyof SocialLinks]}
                                    </a>
                                )
                            ))}
                        </div>
                        <div className="profile-category">
                            {categoryIcons[server.category] || <FaGlobe />}
                            <span>{server.category}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-tabs">
                <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                <button className={`tab-btn ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => setActiveTab('campaigns')}>Campaigns</button>
            </div>

            <div className="profile-tab-content">
                {activeTab === 'overview' ? <ServerProfileOverview server={server} /> : <ServerProfileCampaigns campaigns={server.campaigns} />}
            </div>
        </div>
    </div>
  );
};

export default ServerProfile;
