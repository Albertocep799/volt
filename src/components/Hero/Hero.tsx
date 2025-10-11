import React, { useState } from 'react';
import './Hero.scss';

const Hero: React.FC = () => {
  const [isTypeformVisible, setTypeformVisible] = useState(false);

  const handleContactClick = () => {
    setTypeformVisible(true);
  };

  return (
    <section className={`hero ${isTypeformVisible ? 'typeform-active' : ''}`}>
      <div className="hero-content">
        <h1>
          Where top <span className="highlight">brands</span> meet top <span className="highlight">communities</span> on Discord
        </h1>
        <p>
          The creative agency and technology platform powering brand experiences across the best communities on Discord.
        </p>
        
        {/* This container will handle the animation for the buttons */}
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={handleContactClick}>
            Contact Sales
          </button>
          <a href="/contact" className="btn btn-secondary">
            For Creators
          </a>
        </div>

        {/* Typeform container - appears when active */}
        <div className="typeform-container">
          {isTypeformVisible && (
            <iframe
              src="https://p5bl72fjc8j.typeform.com/to/yiBrOMK1"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Typeform Contact"
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
