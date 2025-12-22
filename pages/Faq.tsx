import React from 'react';
import { Navbar } from '../components/Navbar';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const Faq: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3.5 bg-teal-50 text-teal-600 rounded-2xl mb-6 shadow-sm shadow-teal-100">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h1>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about ChequeKart and printing cheques.
                    </p>
                </div>


                <div className="space-y-6">
                    {[
                        {
                            q: "Is the printed cheque valid in banks?",
                            a: "Yes. According to CTS-2010 guidelines, printed cheques are valid as long as the signature is original. Check with your specific bank for any custom requirements."
                        },
                        {
                            q: "What paper size should I use?",
                            a: "You should use the original cheque leaf provided by your bank. Our tool helps you align the text onto that specific leaf. In printer settings, set the paper size to the cheque dimensions (standard: 203.2mm x 93mm) or use 'A4' and follow our positioning guide."
                        },
                        {
                            q: "My text is not aligning correctly. What should I do?",
                            a: "Use the 'Print Calibration' panel on the left side of the app. You can adjust the global X/Y offsets or fine-tune individual fields like Payee or Date to match your printer's behavior."
                        },
                        {
                            q: "Is my data safe?",
                            a: "Absolutely. ChequeKart runs entirely in your browser. No cheque data is ever sent to our servers. What you type stays on your device."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <details className="group">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.q}</h3>
                                    <span className="text-gray-400 group-open:text-teal-600 group-open:rotate-180 transition-all duration-300">
                                        <ChevronDown size={20} />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent group-open:border-gray-50">
                                    {item.a}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            </main >
        </div >
    );
};
