import React from 'react';
import './Features.scss';
import { FaBolt, FaUsers, FaChartLine, FaShieldAlt, FaCogs, FaHeadset } from 'react-icons/fa';

const Features: React.FC = () => {
  return (
    <div className="features-page">
      <div className="page-header">
        <h1>Powerful Features</h1>
        <p>Everything you need to supercharge your brand in the gaming world.</p>
      </div>
      <div className="page-content">
        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon"><FaBolt /></div>
            <h3>Instant Connections</h3>
            <p>Instantly connect with thousands of gaming influencers and communities.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><FaUsers /></div>
            <h3>Targeted Audience</h3>
            <p>Reach your ideal audience with precision targeting and analytics.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><FaChartLine /></div>
            <h3>Real-Time Analytics</h3>
            <p>Track your campaign performance in real-time and optimize for success.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><FaShieldAlt /></div>
            <h3>Brand Safety</h3>
            <p>Ensure your brand is represented in a safe and positive environment.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><FaCogs /></div>
            <h3>Campaign Management</h3>
            <p>Easily manage your campaigns, creators, and budgets in one place.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><FaHeadset /></div>
            <h3>24/7 Support</h3>
            <p>Our dedicated support team is here to help you every step of the way.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
