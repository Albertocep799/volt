import React, { createContext, useState, useContext, type ReactNode, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthModal from '../components/AuthModal/AuthModal';

// --- Types ---
interface User {
  id: string;
  username: string;
  avatar: string | null;
}

type AuthProviderType = 'discord' | 'google' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  provider: AuthProviderType;
  logout: () => void;
  showAuthModal: (show: boolean, mode?: 'login' | 'signup') => void;
}

// --- API Endpoints ---
const PROVIDER_DETAILS = {
  discord: { apiEndpoint: 'https://discord.com/api/users/@me' },
  google: { apiEndpoint: 'https://www.googleapis.com/oauth2/v2/userinfo' },
};

// --- Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provider Component ---
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [provider, setProvider] = useState<AuthProviderType>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Capture the intended path if we were redirected from a protected route
  useEffect(() => {
    if (location.state?.from?.pathname) {
      setRedirectPath(location.state.from.pathname);
      // Clean the location state to prevent accidental re-navigation
      window.history.replaceState({}, document.title)
    }
  }, [location.state]);

  const logout = useCallback(() => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('tokenType', { path: '/' });
    Cookies.remove('authProvider', { path: '/' });
    setUser(null);
    setIsAuthenticated(false);
    setProvider(null);
    setIsAuthModalOpen(false);
    setRedirectPath(null); // Clear redirect path on logout
    navigate('/');
  }, [navigate]);

  const showAuthModal = useCallback((show: boolean, mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(show);
  }, []);

  const fetchUserDetails = useCallback(async (token: string, tokenType: string, loginProvider: NonNullable<AuthProviderType>) => {
    const details = PROVIDER_DETAILS[loginProvider];
    if (!details) return logout();

    try {
      const response = await fetch(details.apiEndpoint, {
        headers: { 'Authorization': `${tokenType} ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const data = await response.json();
      
      const normalizedUser: User = loginProvider === 'google'
        ? { id: data.id, username: data.name, avatar: data.picture }
        : { id: data.id, username: data.username, avatar: data.avatar };

      setUser(normalizedUser);
      setIsAuthenticated(true);
      setProvider(loginProvider);
      setIsAuthModalOpen(false);
      
      // --- REDIRECT LOGIC ---
      if (redirectPath) {
        navigate(redirectPath); // Navigate to intended page
        setRedirectPath(null); // Clear the path
      } else {
        navigate('/dashboard'); // Navigate to default dashboard
      }

    } catch (error) {
      console.error(`Authentication error with ${loginProvider}:`, error);
      logout();
    }
  }, [logout, navigate, redirectPath]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");
    const tokenType = params.get("token_type") || 'Bearer';
    const expiresIn = params.get("expires_in");
    const state = params.get("state") as AuthProviderType;

    if (accessToken && expiresIn && state && (state === 'discord' || state === 'google')) {
      window.history.replaceState({}, document.title, window.location.pathname);
      
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + parseInt(expiresIn, 10));

      Cookies.set('accessToken', accessToken, { path: '/', expires });
      Cookies.set('tokenType', tokenType, { path: '/', expires });
      Cookies.set('authProvider', state, { path: '/', expires });
      
      fetchUserDetails(accessToken, tokenType, state);
    
    } else if (!isAuthenticated) {
      const existingToken = Cookies.get('accessToken');
      const existingTokenType = Cookies.get('tokenType') || 'Bearer';
      const existingProvider = Cookies.get('authProvider') as AuthProviderType;
      
      if (existingToken && existingProvider) {
          fetchUserDetails(existingToken, existingTokenType, existingProvider);
      }
    }
  }, [isAuthenticated, fetchUserDetails]);

  const value = { isAuthenticated, user, provider, logout, showAuthModal };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {isAuthModalOpen && (
        <AuthModal
          mode={authModalMode}
          onClose={() => setIsAuthModalOpen(false)}
          onSwitchMode={() => setAuthModalMode(prev => prev === 'login' ? 'signup' : 'login')}
        />
      )}
    </AuthContext.Provider>
  );
};

// --- Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
