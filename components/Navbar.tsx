import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignHorizontalJustifyStart, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white group-hover:bg-indigo-700 transition-colors">
                        <AlignHorizontalJustifyStart size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                            ChequeKart
                        </h1>
                        <p className="text-xs text-slate-500 font-medium">Smart Cheque Printer</p>
                    </div>
                </Link>

                <nav className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link to="/about-us" className="hover:text-indigo-600 transition-colors">About</Link>
                        <Link to="/faq" className="hover:text-indigo-600 transition-colors">FAQ</Link>
                    </div>

                    {!isHome && (
                        <Link
                            to="/"
                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors"
                        >
                            Open App <ArrowRight size={16} />
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};
