import React from 'react';
import {
  FaPlay,
  FaPause,
  FaUndo,
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from 'react-icons/fa';
import './VideoControls.scss';

interface VideoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (forward: boolean) => void;
  progress: number;
  buffered: number; // New prop for buffered amount
  onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTime: string;
  duration: string;
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  onToggleFullScreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  onPlayPause,
  onSeek,
  progress,
  buffered,
  onProgressChange,
  currentTime,
  duration,
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle,
  onToggleFullScreen,
}) => {
  return (
    <div className="video-controls-container">
      <div className="progress-bar-wrapper">
          <div className="progress-bar-buffered" style={{ width: `${buffered}%` }} />
          <input
            type="range"
            className="progress-bar"
            value={progress}
            min="0"
            max="100"
            step="0.1"
            onChange={onProgressChange}
            style={{ backgroundSize: `${progress}% 100%` }}
          />
      </div>
      <div className="controls-bottom-bar">
        <div className="controls-left">
          <button onClick={onPlayPause} className="control-btn">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => onSeek(false)} className="control-btn seek-btn">
            <FaUndo />
            <span>10</span>
          </button>
          <button onClick={() => onSeek(true)} className="control-btn seek-btn">
            <FaRedo />
            <span>10</span>
          </button>
          <div className="volume-control">
            <button onClick={onMuteToggle} className="control-btn">
              {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              className="volume-slider"
              value={isMuted ? 0 : volume * 100}
              min="0"
              max="100"
              onChange={onVolumeChange}
              style={{ backgroundSize: `${isMuted ? 0 : volume * 100}% 100%` }}
            />
          </div>
          <span className="time-display">{currentTime} / {duration}</span>
        </div>
        <div className="controls-right">
          <button onClick={onToggleFullScreen} className="control-btn">
            <FaExpand />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
