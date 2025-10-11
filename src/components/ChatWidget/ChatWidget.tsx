import React, { useState, useEffect } from 'react';
import './ChatWidget.scss';
import { FaBolt, FaTimes, FaPaperPlane } from 'react-icons/fa';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('chat-is-open');
    } else {
      document.body.classList.remove('chat-is-open');
    }
  }, [isOpen]);

  return (
    <div className={`chat-widget-container ${isOpen ? 'open' : ''}`}>
      {/* The chat window, which scales up and down */}
      <div className="chat-launcher-window">
        <div className="chat-content">
          <div className="chat-header">
            <div className="brand-icon">
              <FaBolt />
            </div>
            <div className="header-text">
              <h3>Volt Support</h3>
              <p>Ask us anything, we'll reply quickly.</p>
            </div>
            <button className="close-chat-button" onClick={toggleChat}><FaTimes /></button>
          </div>

          <div className="chat-body">
              <div className="message message-reply">
              <div className="brand-icon-reply">
                <FaBolt />
              </div>
              <p>Hey there! Got any questions about our campaigns or communities? Drop them here.</p>
            </div>
          </div>

          <div className="chat-footer">
            <input type="text" placeholder="Type your message" />
            <button className="send-button"><FaPaperPlane/></button>
          </div>
        </div>
      </div>

      {/* The launcher button - it fades in/out independently */}
      <div className="launcher-button" onClick={toggleChat}>
          <FaBolt className="launcher-icon" />
      </div>
    </div>
  );
};

export default ChatWidget;
