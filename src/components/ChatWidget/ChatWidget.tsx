import React, { useState, useEffect } from 'react';
import { FaBolt, FaPaperPlane, FaTimes } from 'react-icons/fa';
import './ChatWidget.scss';

import { voltCampaigns } from '../../data/dash';
import type { Campaign } from '../../data/dash';

interface ChatWidgetProps {
  isAuthenticated?: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState<'support' | string>('support');

  // Efecto para resetear el canal si el usuario cierra sesión
  useEffect(() => {
    if (!isAuthenticated) {
      setActiveChannel('support');
    }
  }, [isAuthenticated]);

  const toggleChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Las campañas solo están disponibles para usuarios autenticados
  const activeCampaigns = isAuthenticated ? voltCampaigns.filter(c => c.status === 'active') : [];

  const getChannelInfo = () => {
    if (activeChannel === 'support') {
      return {
        name: 'Volt Support',
        message: 'Hey there! Got any questions about our campaigns or communities? Drop them here.',
      };
    }
    const campaign = voltCampaigns.find(c => c.id === activeChannel);
    return campaign 
      ? { name: campaign.name, message: `Welcome to the chat for ${campaign.name}. How can we help?` }
      : { name: 'Volt Support', message: 'Chat not found. Please select a valid channel.' };
  };

  const { name: channelName, message: channelMessage } = getChannelInfo();

  return (
    <div className={`chat-widget-container ${isOpen ? 'open' : ''}`}>
      {/* Ventana del Chat */}
      <div className="chat-launcher-window" onClick={(e) => e.stopPropagation()}>
        <div className="chat-content">
          <div className="chat-header">
            <div className="brand-icon">
              <FaBolt />
            </div>
            <div className="header-text">
              <h3>{channelName}</h3>
              <p>Ask us anything, we'll reply quickly.</p>
            </div>
            <button className="close-chat-button" onClick={toggleChat}><FaTimes /></button>
          </div>

          {/* Selector de Canal (solo si está autenticado y hay campañas activas) */}
          {activeCampaigns.length > 0 && (
            <div className="chat-channel-selector">
              <button className={activeChannel === 'support' ? 'active' : ''} onClick={() => setActiveChannel('support')}>
                Support
              </button>
              {activeCampaigns.map(campaign => (
                <button key={campaign.id} className={activeChannel === campaign.id ? 'active' : ''} onClick={() => setActiveChannel(campaign.id)}>
                  {campaign.name}
                </button>
              ))}
            </div>
          )}

          <div className="chat-body">
            <div className="message message-reply">
              <div className="brand-icon-reply">
                <FaBolt />
              </div>
              <p>{channelMessage}</p>
            </div>
          </div>
          
          <div className="chat-footer">
            <input type="text" placeholder="Type your message" />
            <button className="send-button"><FaPaperPlane /></button>
          </div>
        </div>
      </div>

      {/* Botón para abrir el chat */}
      <div className="launcher-button" onClick={toggleChat}>
        <FaBolt className="launcher-icon" />
      </div>
    </div>
  );
};

export default ChatWidget;
