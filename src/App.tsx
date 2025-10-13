import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Auth from './pages/Auth';
import Brands from './pages/Brands/Brands';
import GameDevs from './pages/GameDevs/GameDevs';
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

const AppContent = () => {
  const location = useLocation();
  const pageClass = location.pathname === '/' ? 'is-home' : '';
  const isStatisticPage = location.pathname === '/statistic';

  const isAuthenticated = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/community') || location.pathname.startsWith('/statistic');

  return (
    <div className={`App ${pageClass}`}>
      {!isStatisticPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/gamedevs" element={<GameDevs />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/company" element={<Company />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/auth" element={<Auth />} />
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
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
