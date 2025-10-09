import React from 'react';
import './Hero.scss';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Supercharge Your Workflow</h1>
        <p>Volt is a modern development environment that helps you build, test, and deploy applications faster than ever before.</p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </section>
  );
};

export default Hero;
