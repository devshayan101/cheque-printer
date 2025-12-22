import React from 'react';
import { Navbar } from '../components/Navbar';
import { Shield, Lock, Eye } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Privacy Policy</h1>
                    <p className="text-gray-500 text-sm font-medium">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Shield className="text-teal-600 mb-4" size={32} />
                        <h3 className="font-semibold text-gray-900 mb-2">Zero Data Collection</h3>
                        <p className="text-sm text-gray-600">We do not store or transmit your cheque details. Everything happens locally.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Lock className="text-teal-600 mb-4" size={32} />
                        <h3 className="font-semibold text-gray-900 mb-2">Secure Processing</h3>
                        <p className="text-sm text-gray-600">All calculations and generation happen within your secure browser environment.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Eye className="text-teal-600 mb-4" size={32} />
                        <h3 className="font-semibold text-gray-900 mb-2">Transparent</h3>
                        <p className="text-sm text-gray-600">Our code is open for review. What you see is exactly what you get.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">1. Information We Collect</h2>
                        <p>
                            ChequeKart is designed as a client-side application. We do not collect, store, or share any personal information, banking details, or cheque data entered into the application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">2. Local Storage</h2>
                        <p>
                            We may use your browser's local storage solely to save your print preferences (such as calibration offsets) to improve your experience. This data never leaves your device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">3. Third-Party Services</h2>
                        <p>
                            We use standard web technologies. While we do not share data, the application is hosted on standard web infrastructure which may collect basic access logs (IP address, user agent) for security and maintenance purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">4. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at privacy@chequekart.com.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};
