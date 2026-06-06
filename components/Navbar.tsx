'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlignHorizontalJustifyStart, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useSession, signOut } from 'next-auth/react';

export const Navbar: React.FC = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isHome = pathname === '/';

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/90 dark:border-gray-800 sticky top-0 z-50 no-print transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
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
                        <Link href="/about-us" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">About</Link>
                        <Link href="/faq" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">FAQ</Link>
                        {session && (
                            <Link href="/scan" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-semibold text-teal-600 dark:text-teal-400">Scan & Custom Templates</Link>
                        )}
                    </div>
                    <ThemeToggle />

                    {session ? (
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">Hi, {session.user?.name || session.user?.email}</span>
                            <button
                                onClick={() => signOut()}
                                className="text-xs text-red-500 hover:underline"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-600"
                        >
                            Sign In / Register
                        </Link>
                    )}

                    {!isHome && (
                        <Link
                            href="/"
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
