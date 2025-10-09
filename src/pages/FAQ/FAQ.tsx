import React from 'react';
import './FAQ.scss';

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        <div className="faq-item">
          <h3>What is Volt?</h3>
          <p>Volt is a revolutionary platform for managing and distributing energy.</p>
        </div>
        <div className="faq-item">
          <h3>How do I get started?</h3>
          <p>Simply sign up for an account and connect your devices.</p>
        </div>
        <div className="faq-item">
          <h3>Is Volt available in my country?</h3>
          <p>We are currently expanding our services. Please check back soon for updates.</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
