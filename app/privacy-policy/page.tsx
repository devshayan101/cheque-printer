import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Shield, Lock, Eye } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - ChequeKart',
  description: 'Learn how ChequeKart secures your bank cheque data with offline processing and local storage.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">Privacy Policy</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-none transition-all">
                        <Shield className="text-teal-600 dark:text-teal-400 mb-4" size={32} />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Zero Data Collection</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">We do not store or transmit your cheque details. Everything happens locally.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-none transition-all">
                        <Lock className="text-teal-600 dark:text-teal-400 mb-4" size={32} />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Secure Processing</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">All calculations and generation happen within your secure browser environment.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md dark:shadow-none transition-all">
                        <Eye className="text-teal-600 dark:text-teal-400 mb-4" size={32} />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Transparent</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Our code is open for review. What you see is exactly what you get.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-12 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed transition-all">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">1. Information We Collect</h2>
                        <p>
                            ChequeKart is designed primarily as a client-side application. For user template storage, templates are stored securely in a local database and are only accessible by you. We do not sell or share any bank details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">2. Local Storage & Database</h2>
                        <p>
                            We may use your browser's local storage to save your print preferences. Custom cheque templates you design are saved in a secure SQLite database on your device (or self-hosted setup) tied to your secure authentication.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">3. Security</h2>
                        <p>
                            We prioritize data security by using industry-standard password hashing (bcrypt) and session management techniques.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">4. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at info@chequekart.org.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
