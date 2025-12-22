import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignHorizontalJustifyStart, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const { theme } = useTheme();
    const isHome = location.pathname === '/';

    // Determine which logo to show
    // Note: 'system' preference is resolved to 'light' or 'dark' in the context, but the context exposes the raw preference.
    // We should ideally check if we need to resolve it, but for simplicity let's rely on a check.
    // Actually our ThemeContext applies class 'dark' to HTML. We can just use the 'dark' class logic?
    // No, we need to swap the image source. This requires JS logic.
    // A robust way for 'system' is to check window matchMedia or rely on the fact that your ThemeContext might expose the *resolved* theme if updated so.
    // However, looking at your ThemeContext implementation, it exposes `theme` as "light" | "dark" | "system".
    // If "system", the image swap might be tricky without a helper.
    // Let's use a simple CSS-based swap using <picture> or just CSS classes to hide/show images?
    // CSS-based is seamless and avoids hydration mismatch.

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/90 dark:border-gray-800 sticky top-0 z-50 no-print transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-8">
                        <img
                            src="/images/logo.png"
                            alt="ChequeKart"
                            className="w-8 h-8 object-contain absolute top-0 left-0 transition-opacity duration-300 dark:opacity-0"
                        />
                        <img
                            src="/images/logo-dark.png"
                            alt="ChequeKart"
                            className="w-8 h-8 object-contain absolute top-0 left-0 transition-opacity duration-300 opacity-0 dark:opacity-100"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500">
                            ChequeKart
                        </h1>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Smart Cheque Printer</p>
                    </div>
                </Link>

                <nav className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Link to="/about-us" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">About</Link>
                        <Link to="/faq" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">FAQ</Link>
                    </div>
                    <ThemeToggle />

                    {!isHome && (
                        <Link
                            to="/"
                            className="bg-teal-50 hover:bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:hover:bg-teal-900/50 dark:text-teal-300 dark:border-teal-800 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors border border-teal-100"
                        >
                            Open App <ArrowRight size={16} />
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};
