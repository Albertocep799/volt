import React, { useState, useRef, useEffect } from 'react';
import './Features.scss';
import { FaPlayCircle, FaArrowRight, FaShieldAlt, FaRocket, FaChartLine, FaUsers, FaComments } from 'react-icons/fa';
import VideoControls from '../../components/VideoControls/VideoControls';

// Import assets
import videoFile from '../../assets/mp4-t.mp4';
import gifFile from '../../assets/gif-t.gif';

// --- Custom Hook for In-View Detection (FIXED) ---
const useInView = (ref: React.RefObject<HTMLElement | null>, options: IntersectionObserverInit = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isInView;
};


// Helper to format time
const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const featureCardsData = [
  {
    Icon: FaShieldAlt,
    title: 'Robust Security',
    description: 'Protecting your data is our top priority. We use end-to-end encryption and advanced security protocols to keep your information safe.',
  },
  {
    Icon: FaRocket,
    title: 'Blazing Fast Performance',
    description: 'Our infrastructure is optimized for speed, ensuring a seamless and responsive experience, no matter the scale.',
  },
  {
    Icon: FaChartLine,
    title: 'In-Depth Analytics',
    description: 'Gain valuable insights with our powerful analytics dashboard. Track your progress and make data-driven decisions.',
  },
];

const Features: React.FC = () => {
  const [showPreview, setShowPreview] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0); 
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const infoSectionRef = useRef<HTMLElement>(null);
  const cardsSectionRef = useRef<HTMLElement>(null);
  const communitySectionRef = useRef<HTMLElement>(null);

  const isInfoSectionInView = useInView(infoSectionRef, { threshold: 0.1 });
  const areCardsInView = useInView(cardsSectionRef, { threshold: 0.1 });
  const isCommunitySectionInView = useInView(communitySectionRef, { threshold: 0.1 });

  // Play or pause the video
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startPlayback = () => {
    setShowPreview(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(formatTime(video.currentTime));
    };

    const handleBuffer = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        setBuffered((bufferedEnd / video.duration) * 100);
      }
    };

    const setVideoDuration = () => setDuration(formatTime(video.duration));

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('progress', handleBuffer);
    video.addEventListener('loadedmetadata', setVideoDuration);
    
    if(!showPreview) video.play().catch(e => console.error("Autoplay was prevented:", e));

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('progress', handleBuffer);
      video.removeEventListener('loadedmetadata', setVideoDuration);
    };
  }, [showPreview]);

  const handleSeek = (forward: boolean) => {
    if (videoRef.current) {
      videoRef.current.currentTime += forward ? 10 : -10;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = Number(e.target.value) / 100;
      videoRef.current.volume = newVolume;
      setVolume(newVolume); // FIXED
      if(newVolume > 0 && isMuted) setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  return (
    <div className="features-page">
        <section className="hero-section">
            <div className="hero-content">
              <h1>A Next-Gen Platform</h1>
              <p>that enables measurable partnerships</p>
            </div>
        </section>

        <section className="video-section">
            <div ref={containerRef} className="video-player-container">
            {showPreview ? (
                <div className="video-preview" onClick={startPlayback}>
                <img src={gifFile} alt="Platform preview" className="preview-gif" />
                <FaPlayCircle className="play-icon" />
                </div>
            ) : (
                <div className="video-wrapper">
                  <video
                      ref={videoRef}
                      src={videoFile}
                      onClick={handlePlayPause}
                      onEnded={() => setIsPlaying(false)}
                  >
                      Your browser does not support the video tag.
                  </video>
                  <VideoControls
                      isPlaying={isPlaying}
                      onPlayPause={handlePlayPause}
                      onSeek={handleSeek}
                      progress={progress}
                      buffered={buffered}
                      onProgressChange={handleProgressChange}
                      currentTime={currentTime}
                      duration={duration}
                      volume={volume}
                      onVolumeChange={handleVolumeChange}
                      isMuted={isMuted}
                      onMuteToggle={handleMuteToggle}
                      onToggleFullScreen={handleToggleFullScreen}
                  />
                </div>
            )}
            </div>
        </section>

        <section ref={infoSectionRef} className={`info-section ${isInfoSectionInView ? 'is-visible' : ''}`}>
            <div className="info-content">
                <div className="text-content">
                    <h2>
                        <span className="highlight">PLANNED WITH DATA,</span>
                        <span>BUILT FOR CULTURE</span>
                    </h2>
                    <p>
                        Hundreds of past campaigns and contextual insights feed proprietary AI-enabled tech to find the right communities, craft native creative, and extend what performs.
                    </p>
                    <button className="learn-more-btn">
                        <span>Learn More</span>
                        <FaArrowRight />
                    </button>
                </div>
                <div className="image-content">
                    <div className="image-placeholder"></div>
                </div>
            </div>
        </section>

        <section ref={cardsSectionRef} className={`feature-cards-section ${areCardsInView ? 'is-visible' : ''}`}>
            <div className="section-header">
              <h2>Explore Our Core Features</h2>
              <p>We provide the tools you need to succeed and grow.</p>
            </div>
            <div className="cards-container">
              {featureCardsData.map((card, index) => (
                <div key={index} className="feature-card" style={{ transitionDelay: `${index * 0.15}s` }}>
                  <div className="card-image-placeholder"></div>
                  <div className="card-content">
                    <div className="card-icon"><card.Icon /></div>
                    <h3 className="card-title">{card.title}</h3>
                    <div className="card-hover-content">
                      <p>{card.description}</p>
                      <button>Learn More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </section>

        <section ref={communitySectionRef} className={`community-section ${isCommunitySectionInView ? 'is-visible' : ''}`}>
          <div className="community-content">
            <div className="text-content">
              <h2>
                <span className="highlight">DEEP INSIGHTS,</span>
                <span>REAL ENGAGEMENT</span>
              </h2>
              <p>
                Go beyond surface-level metrics. Understand your community's passion and build authentic, lasting connections with the people who matter most.
              </p>
              <ul className="benefits-list">
                <li><FaUsers /><span>Authentic Audiences</span><FaArrowRight /></li>
                <li><FaComments /><span>Genuine Conversations</span><FaArrowRight /></li>
                <li><FaChartLine /><span>Measurable Impact</span><FaArrowRight /></li>
              </ul>
            </div>
            <div className="image-content">
              <div className="image-placeholder"></div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Features;
