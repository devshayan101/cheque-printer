import React from 'react';
import { Inter, Courier_Prime } from 'next/font/google';
import { Providers } from '../components/Providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'ChequeKart - Free Online Cheque Printing',
  description: 'Print error-free bank cheques instantly with ChequeKart. Supports all major banks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${courierPrime.variable}`}>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
