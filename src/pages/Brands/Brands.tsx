import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCogs, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { SiNike, SiAmazon, SiGoogle, SiSpotify, SiNetflix, SiUber, SiShopify } from 'react-icons/si';
import './Brands.scss';

// Custom hook for detecting when an element is in view
const useInView = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if(ref.current) observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

// Animated Counter Component
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000, prefix = '', suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const range = end - start;
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const increment = Math.min(progress / duration, 1) * range;
        setCount(Math.floor(start + increment));
        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <div className="counter-item" ref={ref as React.RefObject<HTMLDivElement>}>
      <h3 className="counter-number">{prefix}{count}{suffix}</h3>
      <p className="counter-label">{label}</p>
    </div>
  );
};

// Logos with their original brand color for the hover effect
const logos = [
  { name: 'Nike', component: <SiNike />, color: '#FFFFFF' }, // Nike is usually black or white, white is fine.
  { name: 'Amazon', component: <SiAmazon />, color: '#FF9900' },
  { name: 'Google', component: <SiGoogle />, color: '#4285F4' },
  { name: 'Spotify', component: <SiSpotify />, color: '#1DB954' },
  { name: 'Netflix', component: <SiNetflix />, color: '#E50914' },
  { name: 'Uber', component: <SiUber />, color: '#000000' },
  { name: 'Shopify', component: <SiShopify />, color: '#95BF47' },
];

const LogoTicker: React.FC = () => (
  <div className="logo-ticker-container">
    <div className="logo-track">
      {/* Duplicate the logos for a seamless loop */}
      {[...logos, ...logos].map((logo, index) => (
        <div 
          className="logo-item" 
          key={index} 
          title={logo.name}
          style={{ '--logo-hover-color': logo.color } as React.CSSProperties}
        >
          {logo.component}
        </div>
      ))}
    </div>
  </div>
);

const Brands: React.FC = () => {
  const [howRef, howInView] = useInView({ threshold: 0.2 });

  return (
    <div className="brands-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="left-image-placeholder">
            {/* Image will be placed here */}
          </div>
          <div className="hero-text-content">
            <h1>CONNECT WITH <span>COMMUNITIES</span></h1>
            <p>Partner with gaming, tech, AI and fandom communities as a fully-managed service.</p>
            <Link to="/contact" className="btn btn-primary">Start Campaign</Link>
          </div>
          <div className="right-image-placeholder">
            {/* Image will be placed here */}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <AnimatedCounter end={200} suffix="MM" label="Monthly active users on Discord" />
          <AnimatedCounter end={48} suffix="MM+" label="Existing global reach" />
          <AnimatedCounter end={470} suffix="+" label="Communities in our network" />
        </div>
      </section>

      <section ref={howRef as React.RefObject<HTMLDivElement>} className={`how-we-do-it-section animated-section ${howInView ? 'in-view' : ''}`}>
        <div className="how-content">
          <div className="how-title-container">
            <h2>How We<br/>Do It</h2>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
          <div className="how-features-list">
            <div className="feature-item">
              <div className="feature-icon"><FaCogs/></div>
              <div className="feature-text">
                <h3>END-TO-END DELIVERY</h3>
                <p>From brief to brand lift, all under one roof. We take your campaign objective and translate it into a high-performing, community-first execution.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaChartLine/></div>
              <div className="feature-text">
                <h3>INSIGHT-LED STRATEGY</h3>
                <p>We plan with real data, not guesswork. Every campaign starts with a strategy rooted in what's worked and why.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaShieldAlt/></div>
              <div className="feature-text">
                <h3>TRUSTED + TRANSPARENT</h3>
                <p>Clear pricing and 100% transparency. We've built long-term relationships with community managers and know how to run campaigns without disruption.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="logo-ticker-section">
        <h4 className="section-subtitle">Trusted by world-class companies</h4>
        <LogoTicker />
      </section>

      <section className="campaign-process-section">
        <h2 className="section-title">
          OUR CAMPAIGN
          <span className="highlighted-block">PROCESS</span>
        </h2>
      </section>

    </div>
  );
};

export default Brands;
