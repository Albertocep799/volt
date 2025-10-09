import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { FaBolt, FaUsers, FaChartLine } from 'react-icons/fa';

const Home: React.FC = () => {
  const heroImage = "https://images.unsplash.com/photo-1555066931-4365d1469c8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Unleash the Power of Volt</h1>
          <p>Supercharge your brand's reach in the gaming universe. Connect with streamers, creators, and communities like never before.</p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/features" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Volt" />
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon"><FaBolt /></div>
          <h2>Instant Connections</h2>
          <p>Instantly connect with thousands of gaming influencers and communities.</p>
        </div>
        <div className="feature">
          <div className="feature-icon"><FaUsers /></div>
          <h2>Targeted Audience</h2>
          <p>Reach your ideal audience with precision targeting and analytics.</p>
        </div>
        <div className="feature">
          <div className="feature-icon"><FaChartLine /></div>
          <h2>Real-Time Analytics</h2>
          <p>Track your campaign performance in real-time and optimize for success.</p>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Amplify Your Brand?</h2>
        <Link to="/signup" className="btn btn-primary">Join Volt Today</Link>
      </section>
    </div>
  );
};

export default Home;
