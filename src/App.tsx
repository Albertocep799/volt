import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthDiscord from './pages/AuthDiscord';
import AuthGoogle from './pages/AuthGoogle';
import Brands from './pages/Brands/Brands';
import Network from './pages/Network/Network';
import ServerProfile from './pages/ServerProfile/ServerProfile';
import Communities from './pages/Communities/Communities';
import Company from './pages/Company/Company';
import Careers from './pages/Careers/Careers';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import ChatWidget from './components/ChatWidget/ChatWidget';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import CommunityAnalytics from './pages/CommunityAnalytics/CommunityAnalytics';
import ProfilePage from './pages/Profile/Profile';
import Statistic from './pages/Statistic/Statistic';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/utils/ScrollToTop';
import Features from './pages/Features/Features';

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const pageClass = location.pathname === '/' ? 'is-home' : '';
  const isStatisticPage = location.pathname === '/statistic';

  return (
    <div className={`App ${pageClass}`}>
      <ScrollToTop />
      {!isStatisticPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/network" element={<Network />} />
          <Route path="/network/:serverId" element={<ServerProfile />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/company" element={<Company />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/auth/discord" element={<AuthDiscord />} />
          <Route path="/auth/google" element={<AuthGoogle />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community/:communityId" element={<CommunityAnalytics />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/statistic" element={<Statistic />} />
        </Routes>
      </main>
      {!isStatisticPage && <Footer />}
      <ChatWidget isAuthenticated={isAuthenticated} />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
