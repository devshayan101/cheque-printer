import React, { useState } from 'react';
import { Wand2, Loader2, AlertCircle } from 'lucide-react';
import { parseChequeDetails } from '../services/geminiService';
import { ChequeData } from '../types';
import { numberToWords } from '../utils/currency';

interface SmartFillProps {
  onFill: (data: Partial<ChequeData>) => void;
}

export const SmartFill: React.FC<SmartFillProps> = ({ onFill }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSmartFill = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await parseChequeDetails(prompt);
      if (result) {
        // Transform the result to match ChequeData structure
        const filledData: Partial<ChequeData> = {
          payee: result.payee || '',
          amount: result.amount || 0,
          amountInWords: result.amount ? numberToWords(result.amount) : '',
          isBearer: result.isBearer || false,
        };
        
        // Handle Date (API returns DD-MM-YYYY, app uses YYYY-MM-DD)
        if (result.date) {
            const [d, m, y] = result.date.split('-');
            if (d && m && y) {
                filledData.date = `${y}-${m}-${d}`;
            }
        }
        
        onFill(filledData);
      }
    } catch (err: any) {
      if (err.message && err.message.includes('API Key')) {
          setError("API Key missing. Please configure the app environment.");
      } else {
          setError("Failed to parse details. Please try again or fill manually.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 mb-6">
      <div className="flex items-start gap-3">
        <div className="mt-1 bg-white p-2 rounded-lg shadow-sm text-blue-600">
            <Wand2 size={20} />
        </div>
        <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Smart Fill (Gemini AI)</h3>
            <p className="text-xs text-blue-700 mb-3">
                Type naturally, e.g., "Pay 25000 to Rajesh Kumar for interior design work"
            </p>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter cheque details..."
                    className="flex-1 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                    onKeyDown={(e) => e.key === 'Enter' && handleSmartFill()}
                />
                <button 
                    onClick={handleSmartFill}
                    disabled={loading || !prompt.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : 'Fill'}
                </button>
            </div>
            {error && (
                <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} /> {error}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
