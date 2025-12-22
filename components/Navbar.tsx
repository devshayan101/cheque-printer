import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignHorizontalJustifyStart, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <img src="/images/logo.png" alt="ChequeKart" className="w-8 h-8 object-contain" />
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500">
                            ChequeKart
                        </h1>
                        <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Smart Cheque Printer</p>
                    </div>
                </Link>

                <nav className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link to="/about-us" className="hover:text-teal-600 transition-colors">About</Link>
                        <Link to="/faq" className="hover:text-teal-600 transition-colors">FAQ</Link>
                    </div>

                    {!isHome && (
                        <Link
                            to="/"
                            className="bg-teal-50 hover:bg-teal-100 text-teal-700 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors border border-teal-100"
                        >
                            Open App <ArrowRight size={16} />
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};
