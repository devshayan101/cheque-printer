import React, { useState, useEffect, useRef } from 'react';
import { ChequeData, BankLayout, PrintSettings } from './types';
import { numberToWords } from './utils/currency';
import { BANK_LAYOUTS } from './utils/constants';
import { ChequePreview } from './components/ChequePreview';
import { SmartFill } from './components/SmartFill';
import { Printer, Settings, Building2, AlignHorizontalJustifyStart, Type, Image as ImageIcon, Upload } from 'lucide-react';

const App: React.FC = () => {
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

    const handleSmartFillData = (filledData: Partial<ChequeData>) => {
        setData(prev => ({ ...prev, ...filledData }));
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
          <title>Print Cheque - ChequeMate AI</title>
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
                    left: 0 !important;
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
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white">
                            <AlignHorizontalJustifyStart size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                                ChequeMate AI
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">Smart Cheque Printer</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm flex items-center gap-2 transition-transform active:scale-95"
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

                        {/* Smart Fill Section */}
                        <SmartFill onFill={handleSmartFillData} />

                        {/* Main Form */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                                    <Type size={16} className="text-slate-500" /> Details
                                </h2>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* Bank Selector */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Bank Layout</label>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-2.5 text-slate-400" size={16} />
                                            <select
                                                value={selectedBankId}
                                                onChange={(e) => setSelectedBankId(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none transition-all"
                                            >
                                                {BANK_LAYOUTS.map(bank => (
                                                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Custom Background Upload */}
                                        <div className="flex items-center gap-2">
                                            <label className="flex-1 cursor-pointer group">
                                                <div className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 hover:border-indigo-400 transition-all">
                                                    <Upload size={14} className="text-slate-500 group-hover:text-indigo-600" />
                                                    <span className="text-xs font-medium text-slate-600 group-hover:text-indigo-700">
                                                        {customBg ? 'Change Cheque Image' : 'Upload Bank Cheque Image'}
                                                    </span>
                                                </div>
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            </label>
                                            {customBg && (
                                                <button
                                                    onClick={() => setCustomBg(null)}
                                                    className="text-xs text-red-500 hover:text-red-700 underline"
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
                                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData({ ...data, date: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>

                                {/* Payee */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Pay Name</label>
                                    <input
                                        type="text"
                                        value={data.payee}
                                        onChange={(e) => setData({ ...data, payee: e.target.value })}
                                        placeholder="e.g. John Doe"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>

                                {/* Amount Number */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => handleAmountChange(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                                    />
                                </div>

                                {/* Amount Words */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Amount in Words</label>
                                    <textarea
                                        value={data.amountInWords}
                                        onChange={(e) => setData({ ...data, amountInWords: e.target.value })}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-slate-50"
                                    />
                                </div>

                                {/* Toggles */}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-100 hover:border-indigo-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={data.isAccountPayee}
                                            onChange={(e) => setData({ ...data, isAccountPayee: e.target.checked })}
                                            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 border-gray-300"
                                        />
                                        <span className="text-sm text-slate-700 font-medium">Cross (A/C Payee)</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-100 hover:border-indigo-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={data.isBearer}
                                            onChange={(e) => setData({ ...data, isBearer: e.target.checked })}
                                            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 border-gray-300"
                                        />
                                        <span className="text-sm text-slate-700 font-medium">Bearer (No Strike)</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2 rounded-lg border border-slate-100 hover:border-indigo-100 transition-colors col-span-2">
                                        <input
                                            type="checkbox"
                                            checked={settings.showBackground}
                                            onChange={(e) => setSettings({ ...settings, showBackground: e.target.checked })}
                                            className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 border-gray-300"
                                        />
                                        <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <ImageIcon size={16} className="text-slate-400" />
                                            <span>Show Cheque Image in Preview</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Calibration Panel - Always Visible */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-5 py-3 border-b border-slate-100 bg-amber-50/50 flex items-center gap-2">
                                <Settings size={16} className="text-amber-600" />
                                <h3 className="text-sm font-semibold text-slate-800">Print Calibration</h3>
                            </div>
                            <div className="p-5 space-y-6">
                                {/* Global Offset */}
                                <div className="space-y-3 pb-4 border-b border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Global Offset</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-medium text-slate-500 mb-1">Global X (mm)</label>
                                            <input
                                                type="number"
                                                value={settings.offsetX}
                                                onChange={(e) => setSettings({ ...settings, offsetX: Number(e.target.value) })}
                                                className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-medium text-slate-500 mb-1">Global Y (mm)</label>
                                            <input
                                                type="number"
                                                value={settings.offsetY}
                                                onChange={(e) => setSettings({ ...settings, offsetY: Number(e.target.value) })}
                                                className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Font Size */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Font Size (pt)</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="range"
                                            min="8" max="16" step="1"
                                            value={settings.fontSize}
                                            onChange={(e) => setSettings({ ...settings, fontSize: Number(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <div className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600 w-12 text-center">{settings.fontSize}pt</div>
                                    </div>
                                </div>

                                {/* Individual Offsets */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                                        <span>Fine-tune Features</span>
                                        <span className="text-[10px] font-normal text-slate-400 normal-case">(X / Y mm)</span>
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
                                                <span className="text-slate-600 text-xs w-24 truncate" title={field.label}>{field.label}</span>
                                                <div className="flex gap-2 flex-1">
                                                    <input
                                                        type="number"
                                                        placeholder="X"
                                                        value={settings.fieldOffsets[field.id as keyof typeof settings.fieldOffsets].x}
                                                        onChange={(e) => updateFieldOffset(field.id as any, 'x', Number(e.target.value))}
                                                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Y"
                                                        value={settings.fieldOffsets[field.id as keyof typeof settings.fieldOffsets].y}
                                                        onChange={(e) => updateFieldOffset(field.id as any, 'y', Number(e.target.value))}
                                                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
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
                        <div className="bg-slate-100 rounded-xl shadow-inner border border-slate-200 p-4 lg:p-8 min-h-[400px] flex flex-col items-center justify-center relative">
                            <div className="absolute top-4 left-4 text-xs font-medium text-slate-400 uppercase tracking-widest no-print">
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
                                    />
                                </div>
                            </div>

                            <div className="mt-8 max-w-md text-center no-print">
                                <h4 className="text-sm font-semibold text-slate-800 mb-2">Printing Tips</h4>
                                <ul className="text-xs text-slate-500 space-y-1 text-left list-disc pl-5">
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

export default App;