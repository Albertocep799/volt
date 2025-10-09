import React from 'react';
import './About.scss';

const About: React.FC = () => {
  const teamImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About Volt</h1>
        <p>We are a passionate team dedicated to revolutionizing brand engagement in the gaming world.</p>
      </div>
      <div className="page-content">
        <div className="about-section">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>Our mission is to empower brands to connect with the vibrant and ever-growing gaming community in a meaningful and authentic way. We believe in the power of gaming to create connections and build lasting relationships.</p>
          </div>
          <div className="about-image">
            <img src={teamImage} alt="Our Team" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
