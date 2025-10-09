import React from 'react';
import './Company.scss';

const Company: React.FC = () => {
  return (
    <div className="company-page">
      <div className="page-header">
        <h1>About Us</h1>
        <p>We are a passionate team dedicated to connecting brands with the gaming world.</p>
      </div>
      <div className="page-content">
        <p>Content for the Company page.</p>
      </div>
    </div>
  );
};

export default Company;
