import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import './AddCommunityPopup.scss';

interface AddCommunityPopupProps {
  onClose: () => void;
}

const AddCommunityPopup: React.FC<AddCommunityPopupProps> = ({ onClose }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (inviteCode.trim() === '') {
      setIsValid(null);
      return;
    }

    setIsChecking(true);
    const debounce = setTimeout(() => {
      // Simulate API call to check if bot is in server
      console.log(`Checking invite code: ${inviteCode}`);
      const isBotInServer = Math.random() > 0.5; // Replace with actual API call
      setIsValid(isBotInServer);
      setIsChecking(false);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [inviteCode]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}><FaTimes /></button>
        <h2>Add Community by Invite Code</h2>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter invite code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <div className="validation-icon">
            {isChecking ? (
              <div className="loader"></div>
            ) : isValid === true ? (
              <FaCheckCircle className="icon-valid" />
            ) : isValid === false ? (
              <FaTimesCircle className="icon-invalid" />
            ) : null}
          </div>
        </div>
        <button className="submit-button" disabled={!isValid}>Submit</button>
      </div>
    </div>
  );
};

export default AddCommunityPopup;
