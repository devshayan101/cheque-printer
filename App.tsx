import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Faq } from './pages/Faq';
import { AboutUs } from './pages/AboutUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Footer } from './components/Footer';
import { HdfcCheque } from './pages/HdfcCheque';
import { IciciCheque } from './pages/IciciCheque';
import { CanaraCheque } from './pages/CanaraCheque';
import { SbiCheque } from './pages/SbiCheque';
import { AxisCheque } from './pages/AxisCheque';
import { PnbCheque } from './pages/PnbCheque';
import { BobCheque } from './pages/BobCheque';
import { KotakCheque } from './pages/KotakCheque';
import { UnionCheque } from './pages/UnionCheque';
import { IdfcCheque } from './pages/IdfcCheque';
import { IndusindCheque } from './pages/IndusindCheque';
import { YesCheque } from './pages/YesCheque';
import { IndianCheque } from './pages/IndianCheque';
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
                    <Route path="/hdfc" element={<HdfcCheque />} />
                    <Route path="/icici" element={<IciciCheque />} />
                    <Route path="/canara" element={<CanaraCheque />} />
                    <Route path="/sbi" element={<SbiCheque />} />
                    <Route path="/axis" element={<AxisCheque />} />
                    <Route path="/pnb" element={<PnbCheque />} />
                    <Route path="/bob" element={<BobCheque />} />
                    <Route path="/kotak" element={<KotakCheque />} />
                    <Route path="/union" element={<UnionCheque />} />
                    <Route path="/idfc" element={<IdfcCheque />} />
                    <Route path="/indusind" element={<IndusindCheque />} />
                    <Route path="/yes" element={<YesCheque />} />
                    <Route path="/indian" element={<IndianCheque />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;