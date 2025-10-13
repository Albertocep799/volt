import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import { FaStar, FaUsers, FaPaintBrush, FaTools } from 'react-icons/fa';

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

const Home: React.FC = () => {
  const [isTypeformVisible, setTypeformVisible] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const typeformContainerRef = useRef<HTMLDivElement>(null);
  const [sauceRef, sauceInView] = useInView({ threshold: 0.1 });
  const [feature1Ref, feature1InView] = useInView({ threshold: 0.2 });
  const [feature2Ref, feature2InView] = useInView({ threshold: 0.2 });
  const [creatorsRef, creatorsInView] = useInView({ threshold: 0.2 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3 });

  // Load Typeform embed script and track its loading status
  useEffect(() => {
    const scriptId = 'typeform-embed-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript && (window as any).typeform) {
        setIsScriptLoaded(true);
        return;
    }

    if (!existingScript) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = '//embed.typeform.com/next/embed.js';
        script.async = true;
        script.onload = () => {
          setIsScriptLoaded(true);
        };
        document.body.appendChild(script);
    }
  }, []);

  // Create and destroy Typeform widget
  useEffect(() => {
    const container = typeformContainerRef.current;
    if (container && isTypeformVisible && isScriptLoaded) {
      const typeform = (window as any).typeform;
      if (typeform && typeof typeform.createWidget === 'function') {
        typeform.createWidget('yiBrOMK1', {
          container: container,
          hideFooter: true,
          transparentBackground: true,
        });
      }

      // Cleanup function
      return () => {
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      };
    }
  }, [isTypeformVisible, isScriptLoaded]);

  const handleContactClick = () => {
    setTypeformVisible(true);
  };

  const handleCloseTypeform = () => {
    setTypeformVisible(false);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text-content">
            <h1>Supercharge your brand's reach in the gaming universe.</h1>
            <p>Connect with millions of gamers and influencers. Drive engagement and create authentic brand experiences.</p>
          </div>
          
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <button onClick={handleContactClick} className="btn btn-secondary">Contact Sales</button>
          </div>

          {isTypeformVisible && (
            <div className="typeform-modal">
              <div className="typeform-modal-content">
                <button onClick={handleCloseTypeform} className="close-typeform-btn">&times;</button>
                <div ref={typeformContainerRef} style={{width: '100%', height: '500px'}}></div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section ref={sauceRef as React.RefObject<HTMLDivElement>} className={`secret-sauce-section animated-section ${sauceInView ? 'in-view' : ''}`}>
        <div className="secret-sauce-content">
          <div className="secret-sauce-header">
            <h2>Our Secret Sauce 🚀</h2>
            <p>What's powering our high-performing campaigns?</p>
          </div>
          <div className="secret-sauce-grid">
            <div className="secret-sauce-item">
              <FaStar className="item-icon" />
              <h3>Insight</h3>
              <p>We know what works. Volt uses performance data from hundreds of campaigns to recommend which audiences, formats, and creative hooks drive results.</p>
            </div>
            <div className="secret-sauce-item">
              <FaUsers className="item-icon" />
              <h3>Communities</h3>
              <p>Our unrivaled network of 48mil+ members provides the variety of large and small, weird and wonderful spaces for valuable brand partnerships at scale.</p>
            </div>
            <div className="secret-sauce-item">
              <FaPaintBrush className="item-icon" />
              <h3>Creative</h3>
              <p>Community-first ideas, not recycled ads. Our team builds activations that feel native to the gaming world, crafting moments that communities want to engage with.</p>
            </div>
            <div className="secret-sauce-item">
              <FaTools className="item-icon" />
              <h3>Technology</h3>
              <p>Built to scale community media. Our ever-improving platform lets us plan, launch, and measure everything in one place.</p>
            </div>
          </div>
          <div className="secret-sauce-cta">
            <Link to="/contact" className="btn btn-dark">Get in touch</Link>
          </div>
        </div>
      </section>

      <section ref={feature1Ref as React.RefObject<HTMLDivElement>} className={`feature-section animated-section ${feature1InView ? 'in-view' : ''}`}>
        <div className="feature-content">
          <div className="feature-text">
            <h2>Powerful Campaign Management</h2>
            <p>From one-off sponsored posts to large-scale, multi-channel campaigns, our dashboard makes it easy to manage everything. Track progress, communicate with creators, and analyze results in real-time.</p>
            <div className="feature-actions">
              <Link to="/about" className="btn btn-primary">Explore Features</Link>
            </div>
          </div>
          <div className="feature-image-placeholder">
          </div>
        </div>
      </section>

      <section ref={feature2Ref as React.RefObject<HTMLDivElement>} className={`feature-section feature-section--reversed animated-section ${feature2InView ? 'in-view' : ''}`}>
        <div className="feature-content">
          <div className="feature-text">
            <h2>The Right Creators for Your Brand</h2>
            <p>Move beyond simple follower counts. Our platform helps you discover authentic creators whose communities are the perfect fit for your brand. Filter by game, audience demographics, engagement rates, and more to build genuine connections.</p>
            <div className="feature-actions">
              <Link to="/about" className="btn btn-secondary">Browse Creators</Link>
            </div>
          </div>
          <div className="feature-image-placeholder">
          </div>
        </div>
      </section>

      <section ref={creatorsRef as React.RefObject<HTMLDivElement>} className={`for-creators-section animated-section ${creatorsInView ? 'in-view' : ''}`}>
        <div className="for-creators-content">
          <div className="for-creators-text">
            <h2>Are you a Creator?</h2>
            <p>Turn your passion into a profession. Volt connects you with amazing brands for authentic, engaging partnerships. We provide the tools and support to help you grow, monetize, and stay true to your voice.</p>
            <Link to="/signup" className="btn btn-primary">Join the Network</Link>
          </div>
        </div>
      </section>

      <section ref={testimonialsRef as React.RefObject<HTMLDivElement>} className={`testimonials-section animated-section ${testimonialsInView ? 'in-view' : ''}`}>
        <div className="testimonials-header">
          <h2>Solving <span>huge problems</span> for huge brands</h2>
        </div>
        <div className="testimonial-list">
            <div className="testimonial-item">
              <p>"Discord has always been a channel I wanted to test advertising on, but couldn't figure out the best way to do it. That's where Volt came in."</p>
              <div className="testimonial-author">
                <span>Andrew Bender</span>
                <small>As. Product Marketing Manager, World of Warships</small>
              </div>
            </div>
            <div className="testimonial-item">
              <p>"Volt is to this day our most efficient solution for community growth. They bring exactly the right audiences to our server & surpass expectations with each activation."</p>
              <div className="testimonial-author">
                <span>Laurent Denis</span>
                <small>Senior Marketing Manager, Gunzilla Games</small>
              </div>
            </div>
            <div className="testimonial-item">
              <p>"We were impressed with how Volt seamlessly activated top communities. Their tailored approach for each community, including localized messaging, made a huge impact."</p>
              <div className="testimonial-author">
                <span>Sam Seungha</span>
                <small>Major9</small>
              </div>
            </div>
        </div>
      </section>

      <section ref={ctaRef as React.RefObject<HTMLDivElement>} className={`cta-section animated-section ${ctaInView ? 'in-view' : ''}`}>
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join Volt today and take your brand to the next level.</p>
          <Link to="/signup" className="btn btn-primary btn-lg">Sign Up Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
