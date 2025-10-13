import React, { useState, useRef } from 'react';
import './Profile.scss';
import { FaUserEdit, FaGoogle, FaEnvelope, FaTrashAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

// New component imports
import EmailAuthModal from '../../components/EmailAuthModal/EmailAuthModal';
import Toast from '../../components/Toast/Toast';
import type { ToastProps } from '../../components/Toast/Toast'; // FIX: Import type separately

// Define a simplified Toast type for state management
type SimpleToast = Omit<ToastProps, 'onClose'>;

// Updated dummy data
const initialUserData = {
  name: 'Albertocẹp799',
  nickname: 'Berto',
  avatarUrl: 'https://i.imgur.com/exampleAvatar.png', // Placeholder image
  userId: 'user_1a2b3c4d5e6f7g8h9i0j',
  connections: {
    google: true,
    email: false,
  },
  notifications: {
    email: true,
    sms: false,
  }
};

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'connections' | 'notifications' | 'advanced'>('profile');
  const [userData, setUserData] = useState(initialUserData);
  const [showId, setShowId] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<SimpleToast[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Toast Management ---
  const addToast = (message: string, type: SimpleToast['type']) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserData(prev => ({ ...prev, avatarUrl: URL.createObjectURL(file) }));
      addToast('Avatar successfully updated!', 'success');
    }
  };
  
  const handleToggle = (key: 'email' | 'sms') => {
    const newStatus = !userData.notifications[key];
    setUserData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: newStatus },
    }));
    addToast(`${key === 'email' ? 'E-mail' : 'Phone'} notifications have been ${newStatus ? 'enabled' : 'disabled'}`, 'success');
  };

  // --- Tab Render Functions (Redesigned) ---

  const renderUserProfile = () => (
    <div className="tab-pane">
      <h3>User Profile</h3>
      <div className="form-group">
        <label>Name</label>
        <div className="input-with-icon">
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
          <FaUserEdit className="edit-icon" />
        </div>
      </div>
      <div className="form-group">
        <label>Nickname</label>
        <div className="input-with-icon">
          <input type="text" name="nickname" value={userData.nickname} onChange={handleInputChange} />
          <FaUserEdit className="edit-icon" />
        </div>
      </div>
      <button className="btn-primary">Save Changes</button>
    </div>
  );

  const renderConnections = () => (
    <div className="tab-pane">
      <h3>Connected Accounts</h3>
      <p>Link your accounts to streamline your login process and integrate your profiles.</p>
      <div className="connection-item">
        <div className="connection-info">
          <FaGoogle className="icon google" />
          <h4>Google</h4>
        </div>
        <button className={`btn-connect ${userData.connections.google ? 'btn-disconnect' : 'google'}`}>
          {userData.connections.google ? 'Disconnect' : 'Connect'}
        </button>
      </div>
      <div className="connection-item">
        <div className="connection-info">
          <FaEnvelope className="icon email" />
          <h4>Email</h4>
        </div>
         <button className={`btn-connect ${userData.connections.email ? 'btn-disconnect' : 'email'}`} onClick={() => !userData.connections.email && setIsModalOpen(true)}>
          {userData.connections.email ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="tab-pane">
      <h3>Notifications</h3>
       <div className="notification-group">
        <div className="info">
          <h4>E-mail Notifications</h4>
          <p>Receive important updates and notifications via email.</p>
        </div>
        <div className="action">
          <label className="switch">
            <input type="checkbox" checked={userData.notifications.email} onChange={() => handleToggle('email')} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="separator"></div>
      <div className="notification-group">
        <div className="info">
          <h4>SMS Notifications</h4>
          <p>Receive critical alerts and updates via text message.</p>
        </div>
        <div className="action">
          <label className="switch">
            <input type="checkbox" checked={userData.notifications.sms} onChange={() => handleToggle('sms')} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAdvanced = () => (
    <div className="tab-pane">
      <h3>Advanced Settings</h3>
      <div className="advanced-group">
          <div className="info">
              <h4>User ID</h4>
              <p>This is your unique and non-changeable identifier on the platform.</p>
          </div>
          <div className="action">
              <div className="user-id-box">
                  <span>{showId ? userData.userId : '∗'.repeat(24)}</span>
                  <button onClick={() => setShowId(!showId)}>
                      {showId ? <FaEyeSlash /> : <FaEye />}
                  </button>
              </div>
          </div>
      </div>
      <div className="separator danger-zone-separator"></div>
      <div className="danger-zone-content">
        <h4>Delete Account</h4>
        <p>Permanently delete your account and all associated content. This action is irreversible.</p>
        <button className="btn-danger"><FaTrashAlt /> Delete My Account</button>
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
          <img src={userData.avatarUrl} alt="User Avatar" className="avatar-image" />
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleAvatarChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button className="btn-upload" onClick={() => fileInputRef.current?.click()}>
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
