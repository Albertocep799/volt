import React from 'react';
import './Testimonials.scss';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial-list">
        <div className="testimonial-item">
          <p>"Volt has completely changed the way I think about energy. It's a game-changer!"</p>
          <span>- Alex Johnson</span>
        </div>
        <div className="testimonial-item">
          <p>"I was skeptical at first, but Volt has exceeded all my expectations. Highly recommended!"</p>
          <span>- Maria Garcia</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
