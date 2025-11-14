import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCogs, FaChartLine, FaShieldAlt, FaBullseye, FaUsers, FaSyncAlt, FaChartBar, FaInfinity, FaChevronRight } from 'react-icons/fa';
import { SiNike, SiAmazon, SiGoogle, SiSpotify, SiNetflix, SiUber, SiShopify } from 'react-icons/si';
import './Brands.scss';

// Custom hook for detecting when an element is in view
const useInView = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
  { name: 'Nike', component: <SiNike />, color: '#FFFFFF' },
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

// Data for the feature showcase section
const featureData = [
  {
    number: '01',
    title: 'STRATEGIZE',
    description: 'Our team sets you up for success by transforming your brief into a creative strategy, suggested community partners and deliverables so you\'re informed and ready to push the button.',
  },
  {
    number: '02',
    title: 'EXECUTE',
    description: 'From activating a single community to a cross-platform global campaign, we’ve got you covered. We work with our managed network of communities to guarantee authentic, on-brand and impactful results.',
  },
  {
    number: '03',
    title: 'AMPLIFY',
    description: `We're not just about activating communities. We're about making noise. We leverage our network of influencers, social media channels, and paid media to ensure your campaign reaches its maximum potential.`,
  },
  {
    number: '04',
    title: 'REPORT',
    description: 'Transparency is key. We provide comprehensive reports that go beyond vanity metrics. We track reach, engagement, sentiment, and conversions, giving you a clear picture of your campaign\'s ROI.',
  },
];

// Data for the key features section
const keyFeaturesData = [
  {
    icon: <FaBullseye />,
    title: 'Audience Precision',
    description: 'Target specific demographics, interests, and behaviors within communities to ensure your message hits the mark, every time.'
  },
  {
    icon: <FaUsers />,
    title: 'Authentic Engagement',
    description: 'Foster genuine connections by participating in conversations, not just advertising. Become part of the community story.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Brand Safety First',
    description: 'Our moderation and vetting process ensures your brand is represented in safe, positive, and brand-additive environments.'
  },
  {
    icon: <FaSyncAlt />,
    title: 'Seamless Integration',
    description: 'Campaigns are woven into the fabric of the community experience, feeling natural and welcome, not disruptive.'
  },
  {
    icon: <FaChartBar />,
    title: 'Actionable Insights',
    description: 'Go beyond impressions. We provide deep insights into community sentiment, engagement quality, and conversion drivers.'
  },
  {
    icon: <FaInfinity />,
    title: 'Infinite Possibilities',
    description: 'Always On. Always Engaging. Always Learning.',
    special: 'animated-text'
  },
];

// Data for the FAQ section
const faqData = [
  {
    question: "What kind of communities are in your network?",
    answer: "Our network spans across diverse verticals including gaming, technology, AI, fashion, and entertainment. We hand-pick communities that foster high engagement and authentic conversations relevant to your brand."
  },
  {
    question: "How do you ensure brand safety during campaigns?",
    answer: "Brand safety is paramount. We have a rigorous vetting process for all community partners and employ multi-layered moderation tools. Campaigns are constantly monitored to ensure all interactions are positive and brand-safe."
  },
  {
    question: "What is the typical timeline for a campaign?",
    answer: "A standard campaign, from strategy to final report, typically runs for 4-6 weeks. However, we can tailor timelines based on your objectives, from short-term activations to long-term 'always-on' presences."
  },
  {
    question: "How do you measure the ROI of a campaign?",
    answer: "We go beyond vanity metrics. ROI is measured through a combination of reach, engagement quality, sentiment analysis, lead generation, and direct conversions, all tracked and detailed in our comprehensive reports."
  },
  {
    question: "Can we target specific regions or languages?",
    answer: "Absolutely. Our network is global, with communities catering to various languages and geographical locations. We can build a hyper-targeted strategy to reach the exact audience segment you need, wherever they are."
  },
  {
    question: "What's the difference between this and influencer marketing?",
    answer: "While related, community marketing focuses on building a presence within an existing group of enthusiasts. It’s about being part of the conversation, not just broadcasting a message. This fosters deeper, more authentic, and longer-lasting brand affinity."
  }
];

interface FeatureBlockProps {
  feature: {
    number: string;
    title: string;
    description: string;
  };
  index: number;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ feature, index }) => {
    const [ref, isInView] = useInView({ threshold: 0.4, rootMargin: "0px 0px -10% 0px" });

    return (
        <article 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className={`feature-block ${index % 2 !== 0 ? 'layout-reversed' : ''} ${isInView ? 'in-view' : ''}`}>
            <div className="feature-text-content">
              <div className="feature-number">{feature.number}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
            <div className="feature-image-placeholder"></div>
        </article>
    );
}

interface KeyFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  special?: string;
}

interface FeatureCardProps {
  feature: KeyFeature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.3, rootMargin: "0px 0px -15% 0px" });

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>} 
      className={`feature-card ${isInView ? 'in-view' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="card-icon">{feature.icon}</div>
      <h4 className="card-title">{feature.title}</h4>
      {feature.special === 'animated-text' ? (
        <p className="card-description animated-text-description">
          {feature.description.split('. ').map((sentence, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.5 + 0.5}s`}}>{sentence}.</span>
          ))}
        </p>
      ) : (
        <p className="card-description">{feature.description}</p>
      )}
    </div>
  );
};

interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
  };
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index, isActive, onClick }) => {
  return (
    <div 
      className={`faq-item ${isActive ? 'active' : ''}`}
      style={{ '--index': index } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="faq-question">
        <h5>{faq.question}</h5>
        <FaChevronRight className="faq-arrow" />
      </div>
      <div className="faq-answer">
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

const Brands: React.FC = () => {
  const [howRef, howInView] = useInView({ threshold: 0.2 });
  const [activeFaqs, setActiveFaqs] = useState<{ left: number | null; right: number | null }>({ left: null, right: null });

  const handleFaqClick = (column: 'left' | 'right', index: number) => {
    setActiveFaqs(prev => {
        const currentActive = prev[column];
        return {
            ...prev,
            [column]: currentActive === index ? null : index
        };
    });
  };

  return (
    <div className="brands-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="left-image-placeholder"></div>
          <div className="hero-text-content">
            <h1>CONNECT WITH <span>COMMUNITIES</span></h1>
            <p>Partner with gaming, tech, AI and fandom communities as a fully-managed service.</p>
            <Link to="/contact" className="btn btn-primary">Start Campaign</Link>
          </div>
          <div className="right-image-placeholder"></div>
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

      <section className="feature-showcase-section">
        {featureData.map((feature, index) => (
          <FeatureBlock key={index} feature={feature} index={index} />
        ))}
      </section>

      <section className="key-features-section">
        <h2 className="section-title">
          BEYOND THE
          <span className="highlighted-block">METRICS</span>
        </h2>
        <div className="features-grid">
          {keyFeaturesData.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2 className="section-title">
          FREQUENTLY ASKED
          <span className="highlighted-block">QUESTIONS</span>
        </h2>
        <div className="faq-container">
          <div className="faq-column">
            {faqData.slice(0, 3).map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                index={index} 
                isActive={activeFaqs.left === index}
                onClick={() => handleFaqClick('left', index)}
              />
            ))}
          </div>
          <div className="faq-column">
            {faqData.slice(3, 6).map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                index={index} 
                isActive={activeFaqs.right === index}
                onClick={() => handleFaqClick('right', index)}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Brands;
