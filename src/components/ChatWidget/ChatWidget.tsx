import React, { useState } from 'react';
import { Widget } from '@typeform/embed-react';
import './ChatWidget.scss';
import { FaBolt, FaComments, FaHandshake, FaTimes, FaPaperPlane } from 'react-icons/fa';

// --- Typeform Popup Component ---
interface TypeformPopupProps {
  onClose: () => void;
}

const TypeformPopup: React.FC<TypeformPopupProps> = ({ onClose }) => {
  return (
    <div className="typeform-popup-overlay" onClick={onClose}>
      <div className="typeform-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-popup-button" onClick={onClose}><FaTimes /></button>
        <Widget id="wJ45k9bE" className="typeform-widget" />
      </div>
    </div>
  );
};

// --- Chat Window Component ---
interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="chat-window-container" onClick={(e) => e.stopPropagation()}>
      <div className="chat-header">
        <div className="brand-icon"><FaBolt /></div>
        <div className="header-text">
          <h3>Volt Support</h3>
          <p>Ask us anything, we'll reply quickly.</p>
        </div>
        <button className="close-chat-button" onClick={onClose}><FaTimes /></button>
      </div>
      <div className="chat-body">
        <div className="message message-reply">
          <div className="brand-icon-reply"><FaBolt /></div>
          <p>Hey there! Got any questions about our campaigns or communities? Drop them here.</p>
        </div>
      </div>
      <div className="chat-footer">
        <input type="text" placeholder="Type your message" />
        <button className="send-button"><FaPaperPlane /></button>
      </div>
    </div>
  );
};


// --- Main Chat Widget Component ---
const ChatWidget: React.FC = () => {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTypeformOpen, setIsTypeformOpen] = useState(false);

  const toggleLauncher = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Si ninguna ventana está abierta, abre el lanzador.
    // Si alguna ventana está abierta, el clic en el botón principal las cierra todas.
    if (!isChatOpen && !isTypeformOpen) {
      setIsLauncherOpen(!isLauncherOpen);
    } else {
      setIsChatOpen(false);
      setIsTypeformOpen(false);
      setIsLauncherOpen(false);
    }
  };

  const openChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLauncherOpen(false);
    setIsChatOpen(true);
  };

  const openTypeform = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLauncherOpen(false);
    setIsTypeformOpen(true);
  };

  const closeChat = () => setIsChatOpen(false);
  const closeTypeform = () => setIsTypeformOpen(false);

  const showLauncherIcon = !isLauncherOpen && !isChatOpen && !isTypeformOpen;

  return (
    <div className="chat-widget-container">
      {/* --- Popups Modales --- */}
      {isTypeformOpen && <TypeformPopup onClose={closeTypeform} />}
      
      <div className={`chat-main-container ${isChatOpen || isLauncherOpen ? 'visible' : ''}`}>
        {/* Ventana del Chat de Soporte */}
        <ChatWindow isOpen={isChatOpen} onClose={closeChat} />

        {/* Ventana de Selección del Lanzador */}
        {isLauncherOpen && (
          <div className="launcher-selector-window" onClick={(e) => e.stopPropagation()}>
             <div className="launcher-header">
                <h4>Welcome to Volt</h4>
                <p>How can we help you today?</p>
                <button className="close-launcher-button" onClick={() => setIsLauncherOpen(false)}><FaTimes /></button>
             </div>
            <button className="launcher-option" onClick={openChat}>
              <FaComments className="option-icon" />
              <div className="option-text">
                <h5>Support</h5>
                <p>Ask us a question</p>
              </div>
            </button>
            <div className="launcher-separator"></div>
            <button className="launcher-option" onClick={openTypeform}>
              <FaHandshake className="option-icon" />
              <div className="option-text">
                <h5>Secretlab Chair Collab</h5>
                <p>Apply for our campaign</p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Botón Flotante Principal */}
      <div className="launcher-button" onClick={toggleLauncher}>
        {showLauncherIcon ? <FaBolt className="launcher-icon" /> : <FaTimes className="launcher-icon close-icon" />}
      </div>
    </div>
  );
};

export default ChatWidget;
