'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChequeData, BankLayout, PrintSettings } from '../types';
import { numberToWords } from '../utils/currency';
import { BANK_LAYOUTS } from '../utils/constants';
import { ChequePreview } from '../components/ChequePreview';
import { Printer, Settings, Building2, Type, Image as ImageIcon, Upload, LogIn, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

function ChequePrinterApp() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const bankParam = searchParams.get('bank');

    // State
    const [data, setData] = useState<ChequeData>({
        payee: '',
        amount: '' as any,
        amountInWords: '',
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        isBearer: false,
        isAccountPayee: true,
    });

    const [selectedBankId, setSelectedBankId] = useState<string>('canara');
    const [customBg, setCustomBg] = useState<string | null>(null);
    const [customLayouts, setCustomLayouts] = useState<BankLayout[]>([]);
    const [settings, setSettings] = useState<PrintSettings>({
        offsetX: 0,
        offsetY: 0,
        showBackground: true,
        fontSize: 12,
        fieldOffsets: {
            payee: { x: 0, y: 0 },
            acPayee: { x: 0, y: 0 },
            date: { x: 0, y: 0 },
            bearer: { x: 0, y: 0 },
            amountNumber: { x: 0, y: 0 },
            amountWords: { x: 0, y: 0 }
        }
    });

    // Fetch Custom templates from DB
    useEffect(() => {
        if (session) {
            fetch('/api/templates')
                .then(res => res.json())
                .then((dataList: any[]) => {
                    const mapped: BankLayout[] = dataList.map(t => ({
                        id: `custom-${t.id}`,
                        name: `[Custom] ${t.name}`,
                        imageUrl: t.imageUrl || '',
                        currencySymbol: '$', // Default USD for custom international cheques
                        currencySystem: 'international',
                        width: t.width,
                        height: t.height,
                        coords: typeof t.coords === 'string' ? JSON.parse(t.coords) : t.coords
                    }));
                    setCustomLayouts(mapped);
                })
                .catch(err => console.error(err));
        } else {
            setCustomLayouts([]);
        }
    }, [session]);

    // Merge standard layouts with user custom layouts
    const layouts = [...BANK_LAYOUTS, ...customLayouts];

    // Read URL bank param
    useEffect(() => {
        if (bankParam && layouts.some(l => l.id === bankParam)) {
            setSelectedBankId(bankParam);
        }
    }, [bankParam, layouts]);

    // Derived
    const selectedLayout = layouts.find(b => b.id === selectedBankId) || BANK_LAYOUTS[0];

    // Handlers
    const handleAmountChange = (val: string) => {
        const num = parseFloat(val);
        if (!isNaN(num)) {
            setData(prev => ({
                ...prev,
                amount: num,
                amountInWords: numberToWords(num, selectedLayout.currencySystem || 'indian')
            }));
        } else {
            setData(prev => ({
                ...prev,
                amount: '' as any,
                amountInWords: ''
            }));
        }
    };

    // Update words conversion when bank layout changes
    useEffect(() => {
        if (data.amount !== '') {
            setData(prev => ({
                ...prev,
                amountInWords: numberToWords(data.amount as number, selectedLayout.currencySystem || 'indian')
            }));
        }
    }, [selectedBankId, selectedLayout.currencySystem, data.amount]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomBg(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateFieldOffset = (field: keyof PrintSettings['fieldOffsets'], axis: 'x' | 'y', value: number) => {
        setSettings(prev => ({
            ...prev,
            fieldOffsets: {
                ...prev.fieldOffsets,
                [field]: {
                    ...prev.fieldOffsets[field],
                    [axis]: value
                }
            }
        }));
    };

    const handleFieldDrag = useCallback((field: keyof PrintSettings['fieldOffsets'], newOffset: { x: number, y: number }) => {
        setSettings(prev => ({
            ...prev,
            fieldOffsets: {
                ...prev.fieldOffsets,
                [field]: newOffset
            }
        }));
    }, []);

    const handlePrint = () => {
        const printContent = document.getElementById('printable-area');
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=1100,height=600');
        if (!printWindow) {
            alert("Pop-up blocked. Please allow popups for this site to print the cheque.");
            return;
        }

        const widthMm = selectedLayout.width || 203.2;
        const heightMm = selectedLayout.height || 93;

        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Cheque - ChequeKart</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { 
                background-color: #f8fafc; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                margin: 0;
            }
            .print-wrapper {
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            }
            .print-font { font-family: 'Courier Prime', monospace; }
            
            @media print {
                body { background: none; display: block; height: auto; }
                .print-wrapper { box-shadow: none; margin: 0; }
                #printable-area {
                    position: absolute !important;
                    top: 0 !important;
                    left: 2rem !important;
                    margin: 0 !important;
                    background-image: none !important;
                    border: none !important;
                    width: ${widthMm}mm !important;
                    height: ${heightMm}mm !important;
                }
            }
          </style>
        </head>
        <body>
            <div class="print-wrapper">
                ${printContent.outerHTML}
            </div>
            <script>
                window.onload = () => {
                    setTimeout(() => {
                        window.print();
                    }, 800);
                };
            </script>
        </body>
      </html>
    `;

        printWindow.document.write(html);
        printWindow.document.close();
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Controls */}
                    <div className="lg:col-span-1 space-y-6 no-print">
                        {/* Main Form */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 flex items-center justify-between">
                                <h2 className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                    <Type size={18} className="text-teal-600" /> <span className="tracking-tight">Details</span>
                                </h2>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Bank Selector */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Bank Layout</label>
                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <Building2 className="absolute left-3.5 top-3 text-gray-400 group-hover:text-teal-500 transition-colors" size={18} />
                                            <select
                                                value={selectedBankId}
                                                onChange={(e) => setSelectedBankId(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none appearance-none transition-all cursor-pointer text-gray-700 dark:text-gray-200 font-medium"
                                            >
                                                <optgroup label="Standard Banks">
                                                    {BANK_LAYOUTS.map(bank => (
                                                        <option key={bank.id} value={bank.id}>{bank.name}</option>
                                                    ))}
                                                </optgroup>
                                                {customLayouts.length > 0 && (
                                                    <optgroup label="Custom Templates">
                                                        {customLayouts.map(bank => (
                                                            <option key={bank.id} value={bank.id}>{bank.name}</option>
                                                        ))}
                                                    </optgroup>
                                                )}
                                            </select>
                                        </div>

                                        {/* Custom Background Upload */}
                                        <div className="flex items-center gap-2">
                                            <label className="flex-1 cursor-pointer group">
                                                <div className="flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-teal-50/30 hover:border-teal-400 transition-all">
                                                    <Upload size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-teal-600 transition-colors" />
                                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                                                        {customBg ? 'Change Cheque Image' : 'Upload Bank Cheque Image'}
                                                    </span>
                                                </div>
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            </label>
                                            {customBg && (
                                                <button
                                                    onClick={() => setCustomBg(null)}
                                                    className="text-xs text-red-500 hover:text-red-650 font-medium px-2 py-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData({ ...data, date: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-gray-50 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-750 dark:text-gray-100"
                                    />
                                </div>

                                {/* Payee */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pay Name</label>
                                    <input
                                        type="text"
                                        value={data.payee}
                                        onChange={(e) => setData({ ...data, payee: e.target.value })}
                                        placeholder="e.g. John Doe"
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-gray-50 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-750 placeholder:text-gray-400 dark:text-gray-100"
                                    />
                                </div>

                                {/* Amount Number */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 font-bold">{selectedLayout.currencySymbol || '₹'}</span>
                                        <input
                                            type="number"
                                            value={data.amount}
                                            onChange={(e) => handleAmountChange(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none font-mono transition-all bg-gray-50 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-750 text-lg font-medium text-teal-900 dark:text-teal-400"
                                        />
                                    </div>
                                </div>

                                {/* Amount Words */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Amount in Words</label>
                                    <textarea
                                        value={data.amountInWords}
                                        onChange={(e) => setData({ ...data, amountInWords: e.target.value })}
                                        rows={2}
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none resize-none bg-gray-50 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-750 transition-all text-gray-600 dark:text-gray-300"
                                    />
                                </div>

                                {/* Toggles */}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <label className="flex items-center gap-3 cursor-pointer bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-500 hover:bg-teal-50/20 transition-all group">
                                        <input
                                            type="checkbox"
                                            checked={data.isAccountPayee}
                                            onChange={(e) => setData({ ...data, isAccountPayee: e.target.checked })}
                                            className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium group-hover:text-teal-900 dark:group-hover:text-teal-400 transition-colors">Cross (A/C Payee)</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-500 hover:bg-teal-50/20 transition-all group">
                                        <input
                                            type="checkbox"
                                            checked={data.isBearer}
                                            onChange={(e) => setData({ ...data, isBearer: e.target.checked })}
                                            className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium group-hover:text-teal-900 dark:group-hover:text-teal-400 transition-colors">Bearer (No Strike)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Calibration Panel */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex items-center gap-2">
                                <Settings size={16} className="text-gray-500 dark:text-gray-400" />
                                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Print Calibration</h3>
                            </div>
                            <div className="p-5 space-y-6">
                                {/* Global Offset */}
                                <div className="space-y-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                                    <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Global Offset</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Global X (mm)</label>
                                            <input
                                                type="number"
                                                value={settings.offsetX}
                                                onChange={(e) => setSettings({ ...settings, offsetX: Number(e.target.value) })}
                                                className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Global Y (mm)</label>
                                            <input
                                                type="number"
                                                value={settings.offsetY}
                                                onChange={(e) => setSettings({ ...settings, offsetY: Number(e.target.value) })}
                                                className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Font Size */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Font Size (pt)</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min="8" max="16" step="1"
                                            value={settings.fontSize}
                                            onChange={(e) => setSettings({ ...settings, fontSize: Number(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300 w-12 text-center">{settings.fontSize}pt</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Login CTA */}
                        {!session && (
                            <div className="p-4 bg-teal-500/10 dark:bg-teal-950/20 border border-teal-500/20 rounded-2xl text-center space-y-3">
                                <Sparkles size={24} className="mx-auto text-teal-600 dark:text-teal-400" />
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Create Custom Templates</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                    Sign in to scan and save your own layouts for any cheque size in the world.
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-block px-4 py-2 bg-teal-650 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all"
                                >
                                    Sign In / Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Preview & Print Action */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-6 lg:p-10 min-h-[500px] flex flex-col items-center justify-center relative shadow-inner border border-gray-200 dark:border-gray-800 transition-colors">
                            <div className="absolute top-6 left-8 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest no-print flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                                Live Preview ({selectedLayout.name})
                            </div>

                            {/* Print Button */}
                            <div className="absolute top-4 right-8 no-print">
                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-teal-200/50 flex items-center gap-2 transition-all active:scale-95 hover:shadow-teal-300/50"
                                >
                                    <Printer size={18} /> Print Cheque
                                </button>
                            </div>

                            {/* Responsive Scroll Container */}
                            <div className="w-full overflow-x-auto py-8 no-scrollbar">
                                <div className="w-max mx-auto shadow-2xl shadow-slate-300/50">
                                    <ChequePreview
                                        data={data}
                                        layout={selectedLayout}
                                        settings={settings}
                                        customImageUrl={customBg}
                                        onFieldDrag={handleFieldDrag}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 max-w-md text-center no-print">
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-300 mb-2">Printing Tips</h4>
                                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1 text-left list-disc pl-5">
                                    <li>Insert the cheque leaf into the printer tray (usually face down, top edge first).</li>
                                    <li>Disable "Headers and Footers" in your browser's print dialog.</li>
                                    <li>Set paper size to "A4" or matching size.</li>
                                    <li>The background template image will <strong>not</strong> print, only your filled fields will.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function HomePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-teal-500"></div>
            </div>
        }>
            <ChequePrinterApp />
        </Suspense>
    );
}
