import React, { useState } from 'react';
import './ChatWidget.scss';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';

// Using placeholder avatars to prevent build errors
const avatar1 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80";
const avatar2 = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chat-widget-container ${isOpen ? 'open' : ''}`}>
      <button className="chat-toggle-button" onClick={toggleChat}>
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="avatar-group">
                <img src={avatar1} alt="Support Team Member 1" className="avatar" />
                <img src={avatar2} alt="Support Team Member 2" className="avatar" />
            </div>
            <div className="header-text">
              <h3>Amanda, Logan</h3>
              <p>We typically reply in a few minutes</p>
            </div>
          </div>

          <div className="chat-body">
            <div className="message message-reply">
              <div className="avatar-group">
                <img src={avatar1} alt="Support Team Member 1" className="avatar" />
                <img src={avatar2} alt="Support Team Member 2" className="avatar" />
              </div>
              <p>Got any questions? Drop them here and one of the team can help.</p>
            </div>
          </div>

          <div className="chat-footer">
            <input type="text" placeholder="Ask me anything..." />
            <button className="send-button"><FaPaperPlane/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
