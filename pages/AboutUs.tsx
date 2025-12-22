import React from 'react';
import { Navbar } from '../components/Navbar';
import { Users, Target, Zap } from 'lucide-react';

export const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main>
                {/* Hero */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 inline-block">
                            Simplifying Payments
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            ChequeKart started with a simple mission: to make printing cheques as easy as sending an email.
                        </p>
                    </div>
                </div>

                {/* Mission */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why we built this</h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    Writing cheques by hand is tedious, error-prone, and often looks unprofessional. Existing software is either too expensive, outdated, or difficult to configure for Indian banks.
                                </p>
                                <p>
                                    ChequeKart bridges this gap. We provide a modern, web-based solution that requires no installation, respects your privacy, and works with any standard printer.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                                <div className="bg-indigo-50 p-3 rounded-lg h-fit text-indigo-600">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Precision</h4>
                                    <p className="text-sm text-slate-500 mt-1">Pixel-perfect alignment for standard CTS-2010 cheques.</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                                <div className="bg-amber-50 p-3 rounded-lg h-fit text-amber-600">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Speed</h4>
                                    <p className="text-sm text-slate-500 mt-1">Generate values and words instantly. Print in seconds.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="bg-white py-20 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "User First", desc: "We design for the human, not just the printer." },
                                { title: "Privacy Always", desc: "Your financial data is yours alone." },
                                { title: "Simplicity", desc: "Complex problems, simple solutions." }
                            ].map((val, i) => (
                                <div key={i} className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                                    <p className="text-slate-600">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
