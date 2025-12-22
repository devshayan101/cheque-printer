import React from 'react';
import { Navbar } from '../components/Navbar';
import { Users, Target, Zap } from 'lucide-react';

export const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main>
                {/* Hero */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500 inline-block tracking-tight">
                            Simplifying Payments
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                            ChequeKart started with a simple mission: to make printing cheques as easy as sending an email.
                        </p>
                    </div>
                </div>

                {/* Mission */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Why we built this</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                <p>
                                    Writing cheques by hand is tedious, error-prone, and often looks unprofessional. Existing software is either too expensive, outdated, or difficult to configure for Indian banks.
                                </p>
                                <p>
                                    ChequeKart bridges this gap. We provide a modern, web-based solution that requires no installation, respects your privacy, and works with any standard printer.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 flex gap-4 hover:shadow-xl transition-shadow">
                                <div className="bg-teal-50 p-4 rounded-xl h-fit text-teal-600">
                                    <Target size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Precision</h4>
                                    <p className="text-sm text-gray-500 mt-1">Pixel-perfect alignment for standard CTS-2010 cheques.</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 flex gap-4 hover:shadow-xl transition-shadow">
                                <div className="bg-cyan-50 p-4 rounded-xl h-fit text-cyan-600">
                                    <Zap size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Speed</h4>
                                    <p className="text-sm text-gray-500 mt-1">Generate values and words instantly. Print in seconds.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="bg-white py-24 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 tracking-tight">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "User First", desc: "We design for the human, not just the printer." },
                                { title: "Privacy Always", desc: "Your financial data is yours alone." },
                                { title: "Simplicity", desc: "Complex problems, simple solutions." }
                            ].map((val, i) => (
                                <div key={i} className="p-8 rounded-2xl bg-gray-50 hover:bg-teal-50/30 transition-colors">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{val.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
