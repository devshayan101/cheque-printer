import React from 'react';
import { Link } from 'react-router-dom';
import { AlignHorizontalJustifyStart, Github, Twitter, Linkedin } from 'lucide-react';

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
        <footer className="bg-white border-t border-slate-200 mt-auto no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-4 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
                            <div className="bg-indigo-600 p-1.5 rounded-lg text-white group-hover:bg-indigo-700 transition-colors">
                                <AlignHorizontalJustifyStart size={20} />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                                ChequeKart
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                            The professional standard for printing Indian bank cheques. Accurate, secure, and easy to use.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h3 className="font-semibold text-slate-900 mb-4">Supported Banks</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm text-slate-500">
                            {banks.map((bank) => (
                                <Link
                                    key={bank.path}
                                    to={bank.path}
                                    className="hover:text-indigo-600 transition-colors truncate"
                                    title={bank.name}
                                >
                                    {bank.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link to="/about-us" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                            <li><Link to="/faq" className="hover:text-indigo-600 transition-colors">FAQ</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">© {new Date().getFullYear()} ChequeKart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
