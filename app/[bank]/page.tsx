import React from 'react';
import { notFound } from 'next/navigation';
import { BANK_LAYOUTS } from '../../utils/constants';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import Link from 'next/link';

interface Props {
  params: Promise<{ bank: string }>;
}

export async function generateStaticParams() {
  return BANK_LAYOUTS.map((bank) => ({
    bank: bank.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { bank } = await params;
  const layout = BANK_LAYOUTS.find((b) => b.id === bank);

  if (!layout) {
    return {
      title: 'Bank Cheque Printer - ChequeKart',
    };
  }

  return {
    title: `Print ${layout.name} Cheques Online | ChequeKart`,
    description: `Free online cheque printing tool calibrated for ${layout.name}. Align payee, date, amount, and print error-free cheques instantly.`,
  };
}

export default async function BankSeoPage({ params }: Props) {
  const { bank } = await params;
  const layout = BANK_LAYOUTS.find((b) => b.id === bank);

  if (!layout) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* SEO Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              Print {layout.name} Cheques Online with ChequeKart
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-light max-w-2xl mx-auto">
              Fast, accurate, and error-free {layout.name} cheque printing software. No software downloads required.
            </p>
            <Link
              href={`/?bank=${layout.id}`}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all active:scale-95 text-base"
            >
              Open {layout.name} Layout
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Why Choose */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 tracking-tight text-center">
              Why Choose ChequeKart for {layout.name} Cheques?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Perfect Layout Calibration</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our system coordinates are precisely mapped for {layout.name} cheque books, meaning payee, amount, date, and numbers will land exactly on the lines.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Smart Auto-Conversions</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Never write spelling errors in words again. Write numeric amounts, and the tool automatically converts the value to currency words in English.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No Software to Install</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  ChequeKart runs completely inside your web browser. Use it on any computer, mobile, or tablet with a printer connection.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-150 dark:border-gray-800 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Browser-Only Security</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your banking transactions stay private. Cheque details are processed offline inside your browser and are not sent to any web server.
                </p>
              </div>
            </div>
          </section>

          {/* How to use */}
          <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-150 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
              How to Print a {layout.name} Cheque
            </h2>
            <ol className="space-y-6">
              {[
                { step: "1", title: "Select Layout", desc: `Click the Open App button above to load the ${layout.name} layout on ChequeKart.` },
                { step: "2", title: "Enter Payee and Amount", desc: "Type in payee name, amount, date, and check cross payee or bearer options." },
                { step: "3", title: "Test with Plain Paper", desc: "Before printing on your official cheque leaf, print on standard A4 paper first. Hold it against the light with your cheque leaf behind it to check coordinates alignment." },
                { step: "4", title: "Calibrate & Print", desc: "If adjustments are needed, drag elements on-screen or change printer offsets. Insert your cheque leaf and click Print." },
              ].map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">{item.step}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
