import React from 'react';
import './HowItWorks.scss';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Sign Up</h3>
          <p>Create your Volt account in seconds.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Connect</h3>
          <p>Link your devices to the Volt network.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Enjoy</h3>
          <p>Experience the future of energy.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
