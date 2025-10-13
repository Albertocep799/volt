import React, { useEffect, useState } from 'react';
import './Toast.scss';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
  onClose: (id: number) => void;
}

const ICONS = {
  success: <FaCheckCircle />,
  error: <FaExclamationCircle />,
  info: <FaInfoCircle />,
};

const ANIMATION_DURATION = 400; // ms

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Auto-close timer
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle the exit animation
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onClose(id);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isExiting, id, onClose]);
  
  const handleClose = () => {
    setIsExiting(true);
  };

  return (
    <div 
      className={`toast-item toast-${type} ${isExiting ? 'exiting' : ''}`}
      style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
    >
      <div className="toast-icon">
        {ICONS[type]}
      </div>
      <div className="toast-content">
        <p className="toast-title">{type === 'success' ? 'Done!' : type.charAt(0).toUpperCase() + type.slice(1)}</p>
        <p className="toast-message">{message}</p>
      </div>
      <button className="toast-close" onClick={handleClose}>&times;</button>
    </div>
  );
};

export default Toast;
