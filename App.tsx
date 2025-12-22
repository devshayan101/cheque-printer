import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Faq } from './pages/Faq';
import { AboutUs } from './pages/AboutUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;