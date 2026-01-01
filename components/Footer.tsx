import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    const banks = [
        { path: '/hdfc', name: 'HDFC Bank' },
        { path: '/icici', name: 'ICICI Bank' },
        { path: '/sbi', name: 'SBI Bank' },
        { path: '/canara', name: 'Canara Bank' },
        { path: '/axis', name: 'Axis Bank' },
        { path: '/pnb', name: 'Punjab National Bank' },
        { path: '/bob', name: 'Bank of Baroda' },
        { path: '/kotak', name: 'Kotak Mahindra Bank' },
        { path: '/union', name: 'Union Bank' },
        { path: '/idfc', name: 'IDFC First Bank' },
        { path: '/indusind', name: 'IndusInd Bank' },
        { path: '/yes', name: 'Yes Bank' },
        { path: '/indian', name: 'Indian Bank' },
    ];

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 mt-auto no-print transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-4 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
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
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500">
                                ChequeKart
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                            The professional standard for printing Indian bank cheques. Accurate, secure, and easy to use.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Supported Banks</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                            {banks.map((bank) => (
                                <Link
                                    key={bank.path}
                                    to={bank.path}
                                    className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors truncate"
                                    title={bank.name}
                                >
                                    {bank.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400 mb-8">
                            <li><Link to="/about-us" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">About Us</Link></li>
                            <li><Link to="/faq" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">FAQ</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                        </ul>

                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li>
                                <a href="mailto:info@chequekart.org" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                                    info@chequekart.org
                                </a>
                            </li>
                            <li>
                                <a href="mailto:feedback@chequekart.org" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2">
                                    feedback@chequekart.org
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 dark:text-gray-500 text-sm">© {new Date().getFullYear()} ChequeKart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
