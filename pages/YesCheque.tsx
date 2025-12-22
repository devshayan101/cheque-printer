import React from 'react';

/**
 * Bank-Specific SEO Page: Yes Bank
 * This page is optimized for the keyword: "Yes Bank Cheque Printer Online"
 * Helps users find ChequeKart when searching for Yes Bank-specific cheque printing solutions
 */

export const YesCheque: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* SEO-Optimized Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        Print Yes Bank Cheques Online with ChequeKart
                    </h1>
                    <p className="text-xl text-slate-600 mb-4">
                        Fast, accurate, and error-free Yes Bank cheque printing software. No download required.
                    </p>
                    <p className="text-base text-slate-500">
                        ChequeKart supports the complete Yes Bank cheque format with precise field alignment and smart accuracy.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Key Features Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Choose ChequeKart for Yes Bank Cheques?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Perfect Yes Bank Format Alignment</h3>
                            <p className="text-slate-600">Our software is specifically calibrated for Yes Bank cheque dimensions and field positions, ensuring every cheque prints correctly on the first try.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">AI-Powered Accuracy</h3>
                            <p className="text-slate-600">Automatic conversion of amounts to words in English, eliminating common errors in manual cheque writing.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Software Installation</h3>
                            <p className="text-slate-600">Web-based tool that works on any device with a browser. No downloads, no compatibility issues.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure and Private</h3>
                            <p className="text-slate-600">Your cheque data is processed locally in your browser. We never store or transmit your sensitive information.</p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Print a Yes Bank Cheque</h2>
                    <ol className="space-y-4">
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                            <div>
                                <h3 className="font-semibold text-slate-900">Select Yes Bank</h3>
                                <p className="text-slate-600">Choose "Yes Bank" from the bank layout dropdown in ChequeKart.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                            <div>
                                <h3 className="font-semibold text-slate-900">Enter Cheque Details</h3>
                                <p className="text-slate-600">Fill in the payee name, amount, date, and other required fields. The amount is automatically converted to words.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                            <div>
                                <h3 className="font-semibold text-slate-900">Preview Your Cheque</h3>
                                <p className="text-slate-600">Review the cheque preview to ensure all details are correct and properly aligned.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                            <div>
                                <h3 className="font-semibold text-slate-900">Print on Yes Bank Cheque Paper</h3>
                                <p className="text-slate-600">Load your Yes Bank cheque paper and click "Print Cheque". The software handles all alignment automatically.</p>
                            </div>
                        </li>
                    </ol>
                </section>

                {/* Yes Bank Cheque Specifications */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Yes Bank Cheque Specifications</h2>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full">
                            <tbody className="divide-y divide-slate-200">
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-slate-900">Cheque Size</td>
                                    <td className="px-6 py-4 text-slate-600">203.2 mm × 93 mm (Standard Indian cheque)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-slate-900">MICR Code Position</td>
                                    <td className="px-6 py-4 text-slate-600">Bottom of the cheque (Magnetic Ink Character Recognition)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-slate-900">IFSC Code</td>
                                    <td className="px-6 py-4 text-slate-600">Required for electronic clearing</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-slate-900">Cheque Validity</td>
                                    <td className="px-6 py-4 text-slate-600">6 months from the date of issue</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <summary className="font-semibold text-slate-900 cursor-pointer">Is ChequeKart compatible with all Yes Bank cheque formats?</summary>
                            <p className="text-slate-600 mt-3">Yes, ChequeKart supports all standard Yes Bank cheque formats. If you have a custom cheque format, you can upload your cheque image for custom alignment.</p>
                        </details>
                        <details className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <summary className="font-semibold text-slate-900 cursor-pointer">Can I adjust the field positions on my Yes Bank cheque?</summary>
                            <p className="text-slate-600 mt-3">Yes, ChequeKart provides fine-tuning controls for each field position. You can adjust the X and Y coordinates to match your specific cheque layout.</p>
                        </details>
                        <details className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <summary className="font-semibold text-slate-900 cursor-pointer">Is my cheque data secure?</summary>
                            <p className="text-slate-600 mt-3">Absolutely. All data processing happens in your browser. We do not store, transmit, or access any of your cheque information.</p>
                        </details>
                        <details className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                            <summary className="font-semibold text-slate-900 cursor-pointer">What should I do if the cheque doesn't print correctly?</summary>
                            <p className="text-slate-600 mt-3">Use the offset controls to adjust field positions. Start with small adjustments (1-2 mm) and print a test cheque to verify alignment.</p>
                        </details>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-indigo-600 text-white rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Print Your Yes Bank Cheques?</h2>
                    <p className="text-indigo-100 mb-6">Start using ChequeKart today. No sign-up required, completely free.</p>
                    <a href="/" className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                        Go to ChequeKart
                    </a>
                </section>
            </main>
        </div>
    );
};

export default YesCheque;
