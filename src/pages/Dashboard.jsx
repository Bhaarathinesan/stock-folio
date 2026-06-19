/**
 * Dashboard Page
 * 
 * Protected page accessible only to authenticated users.
 * Displays user information and logout functionality.
 */

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <header className="dashboard__header">
          <div className="dashboard__branding">
            <div className="dashboard__logo">📊</div>
            <h1>Portfolio Dashboard</h1>
          </div>
          <button className="dashboard__logout" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </header>

        <main className="dashboard__content">
          <div className="welcome-card">
            <div className="welcome-card__icon">✅</div>
            <h2>Welcome to Portfolio Dashboard</h2>
            <p className="welcome-card__user">
              Logged in as: <strong>{user?.name || 'User'}</strong>
            </p>
            <p className="welcome-card__email">{user?.email}</p>
            <div className="welcome-card__badge">
              🔒 This page is protected
            </div>
            <p className="welcome-card__description">
              User successfully authenticated. You now have access to the portfolio management system.
            </p>
          </div>

          <div className="dashboard__grid">
            <div className="dashboard__card">
              <div className="dashboard__card-icon">📈</div>
              <h3>Portfolio Overview</h3>
              <p>Track your investments and monitor performance</p>
            </div>

            <div className="dashboard__card">
              <div className="dashboard__card-icon">💼</div>
              <h3>Holdings</h3>
              <p>View and manage your stock holdings</p>
            </div>

            <div className="dashboard__card">
              <div className="dashboard__card-icon">📊</div>
              <h3>Analytics</h3>
              <p>Detailed insights and market analysis</p>
            </div>

            <div className="dashboard__card">
              <div className="dashboard__card-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Manage your account and preferences</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
