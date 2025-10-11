import React, { useState, useEffect } from 'react';
import './Dashboard.scss';
import { FaSort } from 'react-icons/fa';

// Mock user data structure
interface User {
  username: string;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('volt-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        {/* Safety check to ensure user exists before accessing username */}
        {user && <h1>Hey {user.username} 👋</h1>}
      </header>

      {/* "My Communities" Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>My Communities</h2>
          <button className="btn-add-community">Add Community</button>
        </div>
        <div className="section-content">
          <p className="empty-state">No Results</p>
        </div>
      </section>

      {/* "My Campaigns" Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>My Campaigns</h2>
        </div>
        <div className="section-content campaigns-table">
          <div className="table-header">
            <span>Name</span>
            <span>Status <FaSort /></span>
            <span>Community</span>
            <span>Payment Info</span>
            <span>Number of Posts</span>
            <span>Activated At</span>
            <span>Link</span>
            <span>Brief</span>
            <span>Chat</span>
          </div>
          <div className="table-body">
            <p className="empty-state">No deals</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
