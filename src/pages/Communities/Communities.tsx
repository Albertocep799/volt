import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaBolt, FaTrophy, FaSyncAlt, FaUsers, FaArrowRight } from 'react-icons/fa';
import './Communities.scss';


// Custom Hook for Scroll-based Timeline Animation
const useTimelineAnimation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const { current: timeline } = timelineRef;
      const { current: steps } = stepRefs;
      const { current: progressBar } = progressBarRef;

      if (!timeline || !steps.length || !progressBar) return;

      const viewportCenter = window.innerHeight / 2;

      let currentActiveStep = -1;
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        if (step && step.getBoundingClientRect().top < viewportCenter) {
          currentActiveStep = i;
        }
      }
      
      if (currentActiveStep === -1) currentActiveStep = 0;

      setActiveStep(currentActiveStep);

      const activeStepElement = steps[currentActiveStep];
      if (activeStepElement) {
        // Position of the center of the number circle relative to the start of the timeline
        const newHeight = activeStepElement.offsetTop + activeStepElement.offsetHeight / 2;
        progressBar.style.height = `${newHeight}px`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Run only once

  return { timelineRef, stepRefs, progressBarRef, activeStep };
};


// Dummy data for server logos
const serverLogos = [
  { name: 'Server One', component: <img src="https://framerusercontent.com/images/2hPq4DMu8LtG6JVCQgbrsR1P8g.png?width=314&height=118" alt="Gunzilla"/> },
  { name: 'Server Two', component: <img src="https://framerusercontent.com/images/bP75tCWIENftKVppO7Np2Z7xdng.png?scale-down-to=512&width=2104&height=694" alt="Samsung"/> },
  { name: 'Server Three', component: <img src="https://framerusercontent.com/images/v1DLokKvHAAtgck12KqN2II.png?width=1024&height=768" alt="Alienware"/> },
  { name: 'Server Four', component: <img src="https://framerusercontent.com/images/f5avHfQV2mC5JNTuTumHlpa0Ls.png?scale-down-to=512&width=2400&height=2400" alt="Acer"/> },
  { name: 'Server Five', component: <img src="https://framerusercontent.com/images/zNQ32puFSWnH51S98eWqDBPmUrk.png?scale-down-to=512&width=2048&height=1526" alt="Roccat"/> },
  { name: 'Server Six', component: <img src="https://framerusercontent.com/images/DrKiS0OmY4PLFICvHXqTZuiLKNs.png?scale-down-to=1024&width=5000&height=2813" alt="Nike"/> },
  { name: 'Server Seven', component: <img src="https://framerusercontent.com/images/FPHjFd75xPyP7Vb5EZW61RA.png?scale-down-to=512&width=913&height=432" alt="Operadora"/> },
  { name: 'Server Eight', component: <img src="https://framerusercontent.com/images/RAkdNk9UmsRZDbNLrNoVNTUfRHc.png?scale-down-to=512&width=1600&height=675" alt="Electronic Arts"/> },
];

const ServerLogoTicker: React.FC = () => (
  <div className="logo-ticker-container">
    <div className="logo-track">
      {[...serverLogos, ...serverLogos].map((logo, index) => (
        <div 
          className="logo-item"
          key={index} 
          title={logo.name}
        >
          {logo.component}
        </div>
      ))}
    </div>
  </div>
);

// Data for the "Secret Sauce" section
const secretSauceData = [
  {
    icon: <FaBolt />,
    title: "SPARK PLATFORM",
    description: "Sign up to Spark, our proprietary platform that houses campaigns and community data to make working with Wildfire super easy."
  },
  {
    icon: <FaTrophy />,
    title: "PREMIUM BRANDS",
    description: "Forget low-grade collabs – we're here to make running a Discord community profitable and valuable."
  },
  {
    icon: <FaSyncAlt />,
    title: "BESPOKE FORMATS",
    description: "Trial and error. Trial and error. Now we're in a place where we know what converts and with which communities."
  },
  {
    icon: <FaUsers />,
    title: "DISCORD NATIVES",
    description: "Our team lives and breathes Discord, understanding how to integrate brands effectively without rejection."
  }
];

// Data for How It Works Timeline
const timelineData = [
    {
        title: "Sign Up on Spark",
        description: "Speak to one of the team, or go ahead and sign your community up on Spark, our proprietary platform to house communities and campaigns."
    },
    {
        title: "Input Details",
        description: "Submit your community info like where your audience is located, upcoming events and the types of brands you want to work with, so that we only send you relevant campaigns to suit."
    },
    {
        title: "Get Pinged",
        description: "When we get relevant upcoming campaigns from leading brands, you'll get an email notification instantly so you don't miss out."
    },
    {
        title: "Run Campaigns",
        description: "We work with you to co-create the branded content that goes out to your community, helping at every stage with asset creation and reporting performance."
    },
    {
        title: "Get Paid",
        description: "We pay you any prizing up front and then management fees after the campaign. Your time is paid for and brands integrate into a thriving superfan hub."
    }
];


const Communities: React.FC = () => {
  const { timelineRef, stepRefs, progressBarRef, activeStep } = useTimelineAnimation();

  return (
    <div className="communities-page">
      <section className="hero-section">
        <div className="hero-content">
          
          <div className="placeholder graph-placeholder">
            <div className="graph-header">
                <span>120%</span>
            </div>
            <div className="graph-body">
                <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M 0 45 Q 20 40, 30 25 T 60 15 T 90 5" stroke="white" strokeWidth="2" fill="none" />
                </svg>
            </div>
          </div>

          <div className="hero-text-content">
            <h1>MONETIZE YOUR <span className="highlight">COMMUNITY</span> AND GROW</h1>
            <p>Partner with relevant sponsors and start delivering more value to your community.</p>
            <Link to="/dashboard" className="btn btn-primary">Go to App</Link>
          </div>

          <div className="placeholder megaphone-placeholder"></div>
          <div className="placeholder discord-placeholder"><FaDiscord /></div>
          
          <div className="placeholder influencers-placeholder">
              <p className="influencers-title">Influencers</p>
              <div className="influencer-item">
                  <div className="influencer-avatar"></div>
                  <div className="influencer-details">
                      <p className="name">Terence John</p>
                      <p className="handle">Iron Dad</p>
                  </div>
                  <span className="status complete">Complete</span>
              </div>
              <div className="influencer-item">
                  <div className="influencer-avatar"></div>
                  <div className="influencer-details">
                      <p className="name">Steve Harrison</p>
                      <p className="handle">Walo Gamerz</p>
                  </div>
                  <span className="status ongoing">Ongoing</span>
              </div>
          </div>

        </div>
      </section>

      <section className="logo-ticker-section">
        <h4 className="section-subtitle">Trusted by leading servers</h4>
        <ServerLogoTicker />
      </section>

      <section className="secret-sauce-section">
        <div className="secret-sauce-content">
          <div className="title-column">
            <div className="title-content">
              <h2>OUR <span className="highlight">SECRET SAUCE</span></h2>
              <p className="subtitle">What can you expect from a Wildfire campaign?</p>
              <Link to="/spark" className="btn btn-dark">Sign Up to Spark <FaArrowRight /></Link>
            </div>
          </div>
          <div className="features-grid-column">
            <div className="features-grid">
              {secretSauceData.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon-wrapper"><div className="feature-icon">{feature.icon}</div></div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="how-it-works-section">
        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-progress-bar-track">
            <div className="timeline-progress-bar-fill" ref={progressBarRef}></div>
          </div>
          <div className="timeline-steps-container">
            {timelineData.map((step, index) => (
                <div 
                className={`timeline-step ${activeStep >= index ? 'is-active' : ''}`}
                key={index}
                ref={el => { stepRefs.current[index] = el; }}
              >
                <div className="timeline-step-number-container">
                    <div className="timeline-step-number">0{index + 1}</div>
                </div>
                <div className="timeline-step-content">
                    <h3 className="timeline-step-title">{step.title}</h3>
                    <p className="timeline-step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Communities;
