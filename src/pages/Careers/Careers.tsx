import React from 'react';
import './Careers.scss';

const Careers: React.FC = () => {
  return (
    <div className="careers-page">
      <h1>Join Our Team</h1>
      <p>We are always looking for talented individuals to join our team. If you are passionate about gaming and technology, we would love to hear from you.</p>
      <div className="job-listings">
        <h2>Current Openings</h2>
        <div className="job-item">
          <h3>Community Manager</h3>
          <p>We are looking for a community manager to engage with our growing community of gamers and creators.</p>
        </div>
        <div className="job-item">
          <h3>Software Engineer</h3>
          <p>We are looking for a software engineer to help us build the future of gaming marketing.</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
