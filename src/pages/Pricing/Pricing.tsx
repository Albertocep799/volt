import React from 'react';
import './Pricing.scss';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const Pricing: React.FC = () => {
  return (
    <div className="pricing-page">
      <div className="page-header">
        <h1>Flexible Pricing</h1>
        <p>Choose the plan that's right for you and your brand.</p>
      </div>
      <div className="page-content">
        <div className="pricing-grid">
          <div className="pricing-card">
            <h2>Starter</h2>
            <div className="price">$49<span>/mo</span></div>
            <ul className="features-list">
              <li><FaCheck /> 1 Campaign</li>
              <li><FaCheck /> 10 Creator Collaborations</li>
              <li><FaCheck /> Basic Analytics</li>
              <li><FaCheck /> Email Support</li>
            </ul>
            <Link to="/signup" className="btn btn-secondary">Choose Plan</Link>
          </div>
          <div className="pricing-card popular">
            <h2>Pro</h2>
            <div className="price">$99<span>/mo</span></div>
            <ul className="features-list">
              <li><FaCheck /> 5 Campaigns</li>
              <li><FaCheck /> 50 Creator Collaborations</li>
              <li><FaCheck /> Advanced Analytics</li>
              <li><FaCheck /> Priority Support</li>
            </ul>
            <Link to="/signup" className="btn btn-primary">Choose Plan</Link>
          </div>
          <div className="pricing-card">
            <h2>Enterprise</h2>
            <div className="price">Contact Us</div>
            <ul className="features-list">
              <li><FaCheck /> Unlimited Campaigns</li>
              <li><FaCheck /> Unlimited Collaborations</li>
              <li><FaCheck /> Custom Analytics & Reporting</li>
              <li><FaCheck /> Dedicated Account Manager</li>
            </ul>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
