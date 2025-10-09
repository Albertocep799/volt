import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Features from './pages/Features/Features';
import Home from './pages/Home/Home';
import Pricing from './pages/Pricing/Pricing';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
