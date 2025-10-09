import React, { useState, useEffect, useRef } from 'react';
import './Company.scss';

// Custom hook for detecting when an element is in view
const useInView = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // We can unobserve after it's in view so it doesn't re-trigger
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


const Company: React.FC = () => {
  const [lineHeight, setLineHeight] = useState(0);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Refs for each section to observe
  const [missionRef, missionInView] = useInView({ threshold: 0.5 });
  const [visionRef, visionInView] = useInView({ threshold: 0.5 });
  const [imageRef, imageInView] = useInView({ threshold: 0.5 });
  const [joinRef, joinInView] = useInView({ threshold: 0.5 });
  const [teamRef, teamInView] = useInView({ threshold: 0.2 });
  const [futureRef, futureInView] = useInView({ threshold: 0.2 });

  const handleScroll = () => {
    if (timelineContainerRef.current) {
      const { top, height } = timelineContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate scroll percentage through the timeline container
      const scrollPercent = Math.max(0, (windowHeight - top) / (height - windowHeight * 0.2));
      const cappedPercent = Math.min(1, scrollPercent);
      setLineHeight(cappedPercent * 100);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="company-page">
      <section className="company-hero">
        <h1>We're Volt.</h1>
        <p>A new frontier for brands, creators, and communities in gaming.</p>
      </section>

      <div className="timeline-container" ref={timelineContainerRef}>
        <div className="timeline-line" style={{ height: `${lineHeight}%` }}></div>
        <div className="timeline-content">

          <div ref={missionRef as React.RefObject<HTMLDivElement>} className={`timeline-section ${missionInView ? 'in-view' : ''}`}>
              <div className="content-wrapper"><h2>Our Mission</h2><p>To forge authentic connections in the gaming universe. We empower creators and brands to build lasting communities through shared passion and innovative technology.</p></div>
          </div>

          <div ref={visionRef as React.RefObject<HTMLDivElement>} className={`timeline-section ${visionInView ? 'in-view' : ''}`}>
              <div className="content-wrapper"><h2>Our Vision</h2><p>To be the central platform where every gamer, creator, and brand can find their spark. We envision a future where digital interaction is more meaningful, rewarding, and fun.</p></div>
          </div>

          <div ref={imageRef as React.RefObject<HTMLDivElement>} className={`timeline-section image-section ${imageInView ? 'in-view' : ''}`}>
              <div className="content-wrapper"><img src="/placeholder.jpg" alt="Volt Team working" /><p className="image-caption">Our team of strategists, creatives, and developers.</p></div>
          </div>

          <div ref={joinRef as React.RefObject<HTMLDivElement>} className={`timeline-section ${joinInView ? 'in-view' : ''}`}>
            <div className="content-wrapper"><h2>Join Our Journey</h2><p>We are always looking for passionate individuals to join our quest. If you are driven by innovation and love gaming, we want to hear from you.</p></div>
          </div>

        </div>
      </div>

      <section ref={teamRef as React.RefObject<HTMLDivElement>} className={`team-section ${teamInView ? 'in-view' : ''}`}>
        <h2 className="section-title">The <span className="highlight">Team</span> Behind Volt</h2>
        <div className="team-grid">
          <div className="team-member"><img src="/placeholders/person1.jpg" alt="Team Member 1" /><div className="member-info"><h3>Alex Drake</h3><p>Founder & CEO</p></div></div>
          <div className="team-member"><img src="/placeholders/person2.jpg" alt="Team Member 2" /><div className="member-info"><h3>Jasmine Kaur</h3><p>Head of Partnerships</p></div></div>
          <div className="team-member"><img src="/placeholders/person3.jpg" alt="Team Member 3" /><div className="member-info"><h3>Leo Chen</h3><p>Lead Developer</p></div></div>
          <div className="team-member"><img src="/placeholders/person4.jpg" alt="Team Member 4" /><div className="member-info"><h3>Maria Garcia</h3><p>Community Manager</p></div></div>
        </div>
      </section>

      <section ref={futureRef as React.RefObject<HTMLDivElement>} className={`future-section ${futureInView ? 'in-view' : ''}`}>
        <h2 className="section-title">Our <span className="highlight">Future</span></h2>
        <div className="future-cards">
          <div className="future-card"><div className="card-icon"></div><h3>Expanding Networks</h3><p>Grow our creator network to include a wider range of games and regions.</p></div>
          <div className="future-card"><div className="card-icon"></div><h3>Advanced Analytics</h3><p>Develop cutting-edge tools for brands to measure campaign impact and ROI.</p></div>
          <div className="future-card"><div className="card-icon"></div><h3>Community Features</h3><p>Launch new platform features that allow for deeper community engagement.</p></div>
        </div>
      </section>
    </div>
  );
};

export default Company;
