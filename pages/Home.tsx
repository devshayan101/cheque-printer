import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChequeData, BankLayout, PrintSettings } from '../types';
import { numberToWords } from '../utils/currency';
import { BANK_LAYOUTS } from '../utils/constants';
import { ChequePreview } from '../components/ChequePreview';
import { Printer, Settings, Building2, Type, Image as ImageIcon, Upload } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Home: React.FC = () => {
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

    // Derived
    const selectedLayout = BANK_LAYOUTS.find(b => b.id === selectedBankId) || BANK_LAYOUTS[0];

    // Handlers
    const handleAmountChange = (val: string) => {
        const num = parseFloat(val);
        if (!isNaN(num)) {
            setData(prev => ({
                ...prev,
                amount: num,
                amountInWords: numberToWords(num)
            }));
        } else {
            setData(prev => ({
                ...prev,
                amount: '' as any,
                amountInWords: ''
            }));
        }
    };



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
        // Standard window.print() often fails in sandboxed iframes (like AI previews) due to missing 'allow-modals'.
        // We use a new window (popup) to create a clean print context.
        const printContent = document.getElementById('printable-area');
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=1100,height=600');

        if (!printWindow) {
            alert("Pop-up blocked. Please allow popups for this site to print the cheque.");
            return;
        }

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
                    background-image: none !important; /* Always hide cheque background image when printing on paper */
                    border: none !important;
                    width: 203.2mm !important;
                    height: 93mm !important;
                }
            }
          </style>
        </head>
        <body>
            <div class="print-wrapper">
                ${printContent.outerHTML}
            </div>
            <script>
                // Wait for Tailwind and Fonts to load before triggering print
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
        <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 pb-12 flex-grow transition-colors duration-300">
            {/* Header */}
            <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 no-print transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo.png" alt="ChequeKart Logo" className="w-10 h-10 object-contain" />
                        <div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500">
                                ChequeKart
                            </h1>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Smart Cheque Printer</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-teal-200/50 flex items-center gap-2 transition-all active:scale-95 hover:shadow-teal-300/50"
                        >
                            <Printer size={18} /> Print Cheque
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Controls */}
                    <div className="lg:col-span-1 space-y-6 no-print">



                        {/* Main Form */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all">
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
                                                {BANK_LAYOUTS.map(bank => (
                                                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                                                ))}
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
                                                    className="text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1 hover:bg-red-50 rounded"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-slate-400 leading-tight">
                                            * Upload a photo of your cheque to see exact alignment. The uploaded image is for preview only and will not print.
                                        </p>
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
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => handleAmountChange(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none font-mono transition-all bg-gray-50 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-750 text-lg font-medium text-teal-900 dark:text-teal-400"
                                    />
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

                                    <label className="flex items-center gap-3 cursor-pointer bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-500 hover:bg-teal-50/20 transition-all col-span-2 group">
                                        <input
                                            type="checkbox"
                                            checked={settings.showBackground}
                                            onChange={(e) => setSettings({ ...settings, showBackground: e.target.checked })}
                                            className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                        />
                                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium group-hover:text-teal-900 dark:group-hover:text-teal-400 transition-colors">
                                            <ImageIcon size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-teal-500" />
                                            <span>Show Cheque Image in Preview</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Calibration Panel - Always Visible */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all">
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

                                {/* Individual Offsets */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center justify-between">
                                        <span>Fine-tune Features</span>
                                        <span className="text-[10px] font-normal text-gray-400 dark:text-gray-500 normal-case">(X / Y mm)</span>
                                    </h4>

                                    <div className="space-y-2">
                                        {[
                                            { id: 'payee', label: 'Payee Name' },
                                            { id: 'date', label: 'Date' },
                                            { id: 'amountWords', label: 'Amount (Words)' },
                                            { id: 'amountNumber', label: 'Amount (Number)' },
                                            { id: 'acPayee', label: 'A/C Payee' },
                                            { id: 'bearer', label: 'Bearer Strike' },
                                        ].map((field) => (
                                            <div key={field.id} className="flex items-center justify-between gap-2 text-sm">
                                                <span className="text-gray-600 dark:text-gray-400 text-xs w-24 truncate" title={field.label}>{field.label}</span>
                                                <div className="flex gap-2 flex-1">
                                                    <input
                                                        type="number"
                                                        placeholder="X"
                                                        value={settings.fieldOffsets[field.id as keyof typeof settings.fieldOffsets].x}
                                                        onChange={(e) => updateFieldOffset(field.id as any, 'x', Number(e.target.value))}
                                                        className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded text-xs"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Y"
                                                        value={settings.fieldOffsets[field.id as keyof typeof settings.fieldOffsets].y}
                                                        onChange={(e) => updateFieldOffset(field.id as any, 'y', Number(e.target.value))}
                                                        className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded text-xs"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-[10px] text-slate-400 italic leading-tight pt-2 border-t border-slate-100">
                                    * Positive X moves right, Positive Y moves down.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-4 lg:p-10 min-h-[500px] flex flex-col items-center justify-center relative shadow-inner border border-gray-200 dark:border-gray-800 transition-colors">
                            <div className="absolute top-6 left-8 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest no-print flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                                Live Preview ({selectedLayout.name})
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
                                    <li>Insert the cheque leaf into the printer tray (usually face down, top edge first, but varies by printer).</li>
                                    <li>Disable "Headers and Footers" in your browser's print dialog.</li>
                                    <li>Set paper size to "A4" or custom if your driver supports it. The content is positioned absolutely for A4 sheets.</li>
                                    <li>The background image will <strong>not</strong> print, only the text will.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
