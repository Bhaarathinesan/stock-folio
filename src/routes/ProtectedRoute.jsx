/**
 * Protected Route Component
 * 
 * Restricts access to routes based on authentication status.
 * - If authenticated: renders the requested component
 * - If not authenticated: redirects to /login
 * - Preserves the originally requested URL for post-login redirect
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--bg-primary)',
      }}>
        <div style={{
          textAlign: 'center',
          color: 'var(--text-primary)',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(34, 197, 94, 0.3)',
            borderTop: '4px solid #22c55e',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem',
          }}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;
