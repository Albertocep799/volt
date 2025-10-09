import React from 'react';
import './Features.scss';

const Features: React.FC = () => {
  return (
    <section id="features" className="features">
      <h2>Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <div className="feature-image"></div>
          <h3>Feature One</h3>
          <p>Description of the first amazing feature.</p>
        </div>
        <div className="feature-item">
          <div className="feature-image"></div>
          <h3>Feature Two</h3>
          <p>Description of the second incredible feature.</p>
        </div>
        <div className="feature-item">
          <div className="feature-image"></div>
          <h3>Feature Three</h3>
          <p>Description of the third revolutionary feature.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
