import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, showAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // This effect runs when the component mounts or isAuthenticated changes.
    if (!isAuthenticated) {
      // If the user is not logged in, we trigger the authentication modal.
      showAuthModal(true, 'login');
    }
  }, [isAuthenticated, showAuthModal]);

  if (!isAuthenticated) {
    // While the modal is being shown, we render a Navigate component.
    // This effectively changes the URL to '/' and passes the original location
    // in the state. Our AuthProvider will pick this up.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If the user is authenticated, we render the requested component.
  return children;
};

export default ProtectedRoute;
