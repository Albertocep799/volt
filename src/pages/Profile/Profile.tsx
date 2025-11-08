import React, { useState, useRef, useEffect } from 'react';
import './Profile.scss';
import { FaUserEdit, FaGoogle, FaEnvelope, FaTrashAlt, FaEye, FaEyeSlash, FaDiscord, FaPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

import EmailAuthModal from '../../components/EmailAuthModal/EmailAuthModal';
import Toast from '../../components/Toast/Toast';
import type { ToastProps } from '../../components/Toast/Toast';

type SimpleToast = Omit<ToastProps, 'onClose'>;

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, provider, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'connections' | 'notifications' | 'advanced'>('profile');
  const [showId, setShowId] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<SimpleToast[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editableUserData, setEditableUserData] = useState({
    name: '',
    nickname: '',
    avatarUrl: 'https://i.imgur.com/fg64g4l.png', // A generic default avatar
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: 'albertocepedamateo@gmail.com',
    phone: '', // Initially no phone
    emailEnabled: true,
    phoneEnabled: false,
  });

  // CORRECTED: The useEffect hook now correctly sets the avatar URL based on the auth provider.
  useEffect(() => {
    if (isAuthenticated && user) {
      let avatarUrl = 'https://i.imgur.com/fg64g4l.png'; // Default fallback

      if (user.avatar) {
        if (provider === 'google') {
          avatarUrl = user.avatar; // Google provides the full URL
        } else if (provider === 'discord') {
          avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        }
      } else if (provider === 'discord') {
        // Handle Discord's default avatars if user.avatar is null
        const discordDefaultAvatarIndex = parseInt(user.id.slice(-1)) % 5;
        avatarUrl = `https://cdn.discordapp.com/embed/avatars/${discordDefaultAvatarIndex}.png`;
      }
      
      setEditableUserData({
        name: user.username,
        nickname: user.username,
        avatarUrl: avatarUrl,
      });
    }
  }, [user, isAuthenticated, provider]); // Added provider to the dependency array

  const addToast = (message: string, type: SimpleToast['type']) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditableUserData(prev => ({ ...prev, avatarUrl: URL.createObjectURL(file) }));
      addToast('Avatar successfully updated!', 'success');
    }
  };

  const handleNotificationToggle = (key: 'emailEnabled' | 'phoneEnabled') => {
    const newStatus = !notificationSettings[key];
    const type = key === 'emailEnabled' ? 'E-mail' : 'Phone';
    addToast(`${type} notifications have been ${newStatus ? 'enabled' : 'disabled'}.`, 'success');
    setNotificationSettings(prev => ({ ...prev, [key]: newStatus }));
  };

  const renderUserProfile = () => (
    <div className="tab-pane">
      <h3>User Profile</h3>
      <div className="form-group">
        <label>Name</label>
        <div className="input-with-icon">
          <input type="text" name="name" value={editableUserData.name} onChange={handleInputChange} disabled={!isAuthenticated} />
          <FaUserEdit className="edit-icon" />
        </div>
      </div>
      <div className="form-group">
        <label>Nickname</label>
        <div className="input-with-icon">
          <input type="text" name="nickname" value={editableUserData.nickname} onChange={handleInputChange} disabled={!isAuthenticated} />
          <FaUserEdit className="edit-icon" />
        </div>
      </div>
      <button className="btn-primary" disabled={!isAuthenticated}>Save Changes</button>
    </div>
  );

  const renderConnections = () => {
    const isDiscordConnected = isAuthenticated && provider === 'discord';
    const isGoogleConnected = isAuthenticated && provider === 'google';

    return (
      <div className="tab-pane">
        <h3>Connected Accounts</h3>
        <p>Link your accounts to streamline your login process and integrate your profiles.</p>
        <div className="connection-item">
          <div className="connection-info">
            <FaDiscord className="icon discord" />
            <h4>Discord</h4>
          </div>
          <button className={`btn-connect ${isDiscordConnected ? 'btn-disconnect' : 'discord'}`} onClick={isDiscordConnected ? logout : () => { /* Connect logic */ }}>
            {isDiscordConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
        <div className="connection-item">
          <div className="connection-info">
            <FaGoogle className="icon google" />
            <h4>Google</h4>
          </div>
          <button className={`btn-connect ${isGoogleConnected ? 'btn-disconnect' : 'google'}`} onClick={isGoogleConnected ? logout : () => { /* Connect logic */ }}>
            {isGoogleConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
        <div className="connection-item">
          <div className="connection-info">
            <FaEnvelope className="icon email" />
            <h4>Email</h4>
          </div>
          <button className={`btn-connect email`} onClick={() => !isAuthenticated && setIsModalOpen(true)} disabled={isAuthenticated}>
            Connect
          </button>
        </div>
      </div>
    );
  };

  const renderNotifications = () => (
    <div className="tab-pane">
      <h3>Notifications</h3>
      <div className="notification-group">
        <div className="info">
          <h4>Notification e-mail</h4>
          <div className="email-address">
            <span>{notificationSettings.email}</span>
            <FaUserEdit className="edit-icon" />
          </div>
        </div>
        <div className="action">
          <label className="switch">
            <input type="checkbox" checked={notificationSettings.emailEnabled} onChange={() => handleNotificationToggle('emailEnabled')} />
            <span className="slider round"></span>
          </label>
          <span className="switch-label">Enable e-mail notifications</span>
        </div>
      </div>
      <div className="separator"></div>
      <div className="notification-group">
        <div className="info">
          <h4>Phone - SMS Notifications</h4>
          <button className="btn-add-phone">
            <FaPlus />
            Add phone
          </button>
        </div>
        <div className="action">
          <label className="switch">
            <input type="checkbox" checked={notificationSettings.phoneEnabled} onChange={() => handleNotificationToggle('phoneEnabled')} />
            <span className="slider round"></span>
          </label>
          <span className="switch-label">Enable phone notifications</span>
        </div>
      </div>
    </div>
  );

  const renderAdvanced = () => (
    <div className="tab-pane">
      <h3>Advanced Settings</h3>
      {isAuthenticated && user && (
        <div className="advanced-group">
          <div className="info">
            <h4>User ID</h4>
            <p>This is your unique Discord identifier.</p>
          </div>
          <div className="action-advanced">
            <div className="user-id-box">
              <span>{showId ? user.id : '∗'.repeat(user.id.length)}</span>
              <button onClick={() => setShowId(!showId)}>
                {showId ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="separator danger-zone-separator"></div>
      <div className="danger-zone-content">
        <h4>Delete Account</h4>
        <p>Permanently delete your account. This action is irreversible.</p>
        <button className="btn-danger" disabled={!isAuthenticated}><FaTrashAlt /> Delete My Account</button>
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="toast-container">
        {toasts.map(toast => <Toast key={toast.id} {...toast} onClose={removeToast} />)}
      </div>
      {isModalOpen && <EmailAuthModal onClose={() => setIsModalOpen(false)} />}
      <h1 className="profile-header-title">Profile</h1>
      <main className="profile-layout">
        <aside className="profile-avatar-section">
          <img src={editableUserData.avatarUrl} alt="User Avatar" className="avatar-image" />
          <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" style={{ display: 'none' }} disabled={!isAuthenticated} />
          <button className="btn-upload" onClick={() => fileInputRef.current?.click()} disabled={!isAuthenticated}>
            Change Avatar
          </button>
        </aside>
        <section className="profile-details-section">
          <nav className="tabs">
            <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>User Profile</button>
            <button onClick={() => setActiveTab('connections')} className={activeTab === 'connections' ? 'active' : ''}>Connections</button>
            <button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>Notifications</button>
            <button onClick={() => setActiveTab('advanced')} className={activeTab === 'advanced' ? 'active' : ''}>Advanced</button>
          </nav>
          <div className="tab-content">
            {activeTab === 'profile' && renderUserProfile()}
            {activeTab === 'connections' && renderConnections()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'advanced' && renderAdvanced()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
