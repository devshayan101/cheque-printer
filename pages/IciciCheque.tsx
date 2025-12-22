import React from 'react';

/**
 * Bank-Specific SEO Page: ICICI Bank
 * This page is optimized for the keyword: "ICICI Cheque Printer Online"
 * Helps users find ChequeKart when searching for ICICI-specific cheque printing solutions
 */

export const IciciCheque: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* SEO-Optimized Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Print ICICI Bank Cheques Online with ChequeKart
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Fast, accurate, and error-free ICICI cheque printing software. No download required.
          </p>
          <p className="text-base text-gray-500">
            ChequeKart supports the complete ICICI cheque format with precise field alignment and smart accuracy.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Why Choose ChequeKart for ICICI Cheques?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect ICICI Format Alignment</h3>
              <p className="text-gray-600">Our software is specifically calibrated for ICICI cheque dimensions and field positions, ensuring every cheque prints correctly on the first try.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Accuracy</h3>
              <p className="text-gray-600">Automatic conversion of amounts to words in English, eliminating common errors in manual cheque writing.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Software Installation</h3>
              <p className="text-gray-600">Web-based tool that works on any device with a browser. No downloads, no compatibility issues.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure and Private</h3>
              <p className="text-gray-600">Your cheque data is processed locally in your browser. We never store or transmit your sensitive information.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">How to Print an ICICI Cheque</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full shadow-lg shadow-teal-200 flex items-center justify-center font-bold">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Select ICICI Bank</h3>
                <p className="text-gray-600">Choose "ICICI Bank" from the bank layout dropdown in ChequeKart.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full shadow-lg shadow-teal-200 flex items-center justify-center font-bold">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Enter Cheque Details</h3>
                <p className="text-gray-600">Fill in the payee name, amount, date, and other required fields. The amount is automatically converted to words.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full shadow-lg shadow-teal-200 flex items-center justify-center font-bold">3</span>
              <div>
                <h3 className="font-semibold text-gray-900">Preview Your Cheque</h3>
                <p className="text-gray-600">Review the cheque preview to ensure all details are correct and properly aligned.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full shadow-lg shadow-teal-200 flex items-center justify-center font-bold">4</span>
              <div>
                <h3 className="font-semibold text-gray-900">Print on ICICI Cheque Paper</h3>
                <p className="text-gray-600">Load your ICICI cheque paper and click "Print Cheque". The software handles all alignment automatically.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* ICICI Cheque Specifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">ICICI Cheque Specifications</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900">Cheque Size</td>
                  <td className="px-6 py-4 text-gray-600">203.2 mm × 93 mm (Standard Indian cheque)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900">MICR Code Position</td>
                  <td className="px-6 py-4 text-gray-600">Bottom of the cheque (Magnetic Ink Character Recognition)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900">IFSC Code</td>
                  <td className="px-6 py-4 text-gray-600">Required for electronic clearing</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-900">Cheque Validity</td>
                  <td className="px-6 py-4 text-gray-600">6 months from the date of issue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <summary className="font-semibold text-gray-900 cursor-pointer">Is ChequeKart compatible with all ICICI cheque formats?</summary>
              <p className="text-gray-600 mt-3">Yes, ChequeKart supports all standard ICICI cheque formats. If you have a custom cheque format, you can upload your cheque image for custom alignment.</p>
            </details>
            <details className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <summary className="font-semibold text-gray-900 cursor-pointer">Can I adjust the field positions on my ICICI cheque?</summary>
              <p className="text-gray-600 mt-3">Yes, ChequeKart provides fine-tuning controls for each field position. You can adjust the X and Y coordinates to match your specific cheque layout.</p>
            </details>
            <details className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <summary className="font-semibold text-gray-900 cursor-pointer">Is my cheque data secure?</summary>
              <p className="text-gray-600 mt-3">Absolutely. All data processing happens in your browser. We do not store, transmit, or access any of your cheque information.</p>
            </details>
            <details className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <summary className="font-semibold text-gray-900 cursor-pointer">What should I do if the cheque doesn't print correctly?</summary>
              <p className="text-gray-600 mt-3">Use the offset controls to adjust field positions. Start with small adjustments (1-2 mm) and print a test cheque to verify alignment.</p>
            </details>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg shadow-teal-200/50 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Print Your ICICI Cheques?</h2>
          <p className="text-teal-100 mb-6">Start using ChequeKart today. No sign-up required, completely free.</p>
          <a href="/" className="inline-block bg-white text-teal-600 px-6 py-3 rounded-2xl font-semibold hover:bg-teal-50 transition-colors">
            Go to ChequeKart
          </a>
        </section>
      </main>
    </div>
  );
};

export default IciciCheque;

