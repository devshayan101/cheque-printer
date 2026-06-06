'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Upload, HelpCircle, Save, Trash2, Edit2, Play, Sparkles, Move } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FieldCoords {
  x: number;
  y: number;
  spacing?: number;
  width?: number;
  lineHeight?: number;
}

interface Coords {
  date: FieldCoords & { spacing: number };
  payee: FieldCoords;
  amountWords: FieldCoords & { width: number; lineHeight: number };
  amountNumber: FieldCoords;
  bearer: FieldCoords;
  acPayee: FieldCoords;
}

interface SavedTemplate {
  id: string;
  name: string;
  width: number;
  height: number;
  imageUrl: string | null;
  coords: string;
}

export default function ScanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  // Template Form State
  const [templateName, setTemplateName] = useState('');
  const [width, setWidth] = useState('203.2'); // in mm
  const [height, setHeight] = useState('93'); // in mm
  const [image, setImage] = useState<string | null>(null);
  
  // Coordinates State
  const [coords, setCoords] = useState<Coords>({
    date: { x: 154, y: 8, spacing: 5.0 },
    payee: { x: 16, y: 20 },
    amountWords: { x: 25, y: 30, width: 130, lineHeight: 8 },
    amountNumber: { x: 156, y: 36 },
    bearer: { x: 180, y: 23 },
    acPayee: { x: 40, y: 5 },
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  
  // Drag State
  const [dragState, setDragState] = useState<{
    field: keyof Coords;
    startX: number;
    startY: number;
    startFieldX: number;
    startFieldY: number;
  } | null>(null);

  // Fetch saved templates
  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/templates');
      if (res.ok) {
        const data = await res.json();
        setSavedTemplates(data);
      }
    } catch (err) {
      console.error('Error fetching templates:', err);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchTemplates();
    }
  }, [status, router, fetchTemplates]);

  // Handle Dragging
  useEffect(() => {
    if (!dragState) return;

    const handleMove = (clientX: number, clientY: number) => {
      const dxPx = clientX - dragState.startX;
      const dyPx = clientY - dragState.startY;

      // Convert px to mm (approx 3.7795 px per mm)
      const dxMm = dxPx / 3.7795;
      const dyMm = dyPx / 3.7795;

      const newX = Number((dragState.startFieldX + dxMm).toFixed(1));
      const newY = Number((dragState.startFieldY + dyMm).toFixed(1));

      // Clamp coordinates to template dimensions
      const maxW = parseFloat(width);
      const maxH = parseFloat(height);
      const clampedX = Math.max(0, Math.min(newX, maxW));
      const clampedY = Math.max(0, Math.min(newY, maxH));

      setCoords((prev) => ({
        ...prev,
        [dragState.field]: {
          ...prev[dragState.field],
          x: clampedX,
          y: clampedY,
        },
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleEnd = () => {
      setDragState(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragState, width, height]);

  const handleMouseDown = (e: React.MouseEvent, field: keyof Coords) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState({
      field,
      startX: e.clientX,
      startY: e.clientY,
      startFieldX: coords[field].x,
      startFieldY: coords[field].y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent, field: keyof Coords) => {
    e.stopPropagation();
    const touch = e.touches[0];
    setDragState({
      field,
      startX: touch.clientX,
      startY: touch.clientY,
      startFieldX: coords[field].x,
      startFieldY: coords[field].y,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAIDetection = async () => {
    if (!image) {
      setError('Please upload a cheque image first.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/detect-fields', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to detect fields');
      }

      if (data.coords) {
        // Map percentage coordinates from Gemini to millimeter coordinates
        const wVal = parseFloat(width);
        const hVal = parseFloat(height);

        const newCoords: Coords = {
          date: {
            x: Number(((data.coords.date?.x / 100) * wVal).toFixed(1)),
            y: Number(((data.coords.date?.y / 100) * hVal).toFixed(1)),
            spacing: coords.date.spacing,
          },
          payee: {
            x: Number(((data.coords.payee?.x / 100) * wVal).toFixed(1)),
            y: Number(((data.coords.payee?.y / 100) * hVal).toFixed(1)),
          },
          amountWords: {
            x: Number(((data.coords.amountWords?.x / 100) * wVal).toFixed(1)),
            y: Number(((data.coords.amountWords?.y / 100) * hVal).toFixed(1)),
            width: coords.amountWords.width,
            lineHeight: coords.amountWords.lineHeight,
          },
          amountNumber: {
            x: Number(((data.coords.amountNumber?.x / 100) * wVal).toFixed(1)),
            y: Number(((data.coords.amountNumber?.y / 100) * hVal).toFixed(1)),
          },
          bearer: {
            x: Number(((data.coords.bearer?.x / 100) * wVal).toFixed(1)),
            y: Number(((data.coords.bearer?.y / 100) * hVal).toFixed(1)),
          },
          acPayee: {
            x: Number(((data.coords.acPayee?.x / 100) * wVal).toFixed(1)),
            y: Number(((data.coords.acPayee?.y / 100) * hVal).toFixed(1)),
          },
        };

        setCoords(newCoords);
        setSuccess('AI field detection successful! You can now fine-tune by dragging fields.');
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred during AI field detection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateName) {
      setError('Please enter a template name.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: templateName,
          width: parseFloat(width),
          height: parseFloat(height),
          imageUrl: image,
          coords,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save template');
      }

      setSuccess(`Template "${templateName}" saved successfully!`);
      setTemplateName('');
      setImage(null);
      fetchTemplates();
    } catch (err: any) {
      setError(err.message || 'Error saving template.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTemplate = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete template "${name}"?`)) return;

    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccess(`Template "${name}" deleted.`);
        fetchTemplates();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete template');
      }
    } catch (err) {
      setError('Error deleting template.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/10 to-cyan-50/10 dark:from-slate-950 dark:via-teal-950/10 dark:to-cyan-950/10 transition-colors duration-300 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500 tracking-tight">
              AI Cheque Scanner & Custom Templates
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Create a custom template for ANY bank in the world using Gemini AI field detection.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-2xl border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 text-sm font-medium rounded-2xl border border-teal-100 dark:border-teal-900/30">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Calibration Settings */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-150 dark:border-gray-800 p-6 space-y-5">
              <h2 className="font-bold text-gray-900 dark:text-gray-100 text-lg flex items-center gap-2">
                <Edit2 size={18} className="text-teal-600" /> Define Template
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Template Name</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g. Chase Bank Business"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-gray-50 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-750 dark:text-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Width (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-gray-50 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-750 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Height (mm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none bg-gray-50 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-750 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cheque Image</label>
                <label className="w-full cursor-pointer group block">
                  <div className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 hover:bg-teal-50/20 hover:border-teal-400 transition-all text-center">
                    <Upload size={24} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                      {image ? 'Change Cheque Image' : 'Upload Bank Cheque Image'}
                    </span>
                    <span className="text-[10px] text-gray-400">PNG, JPG or JPEG</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {image && (
                <button
                  onClick={triggerAIDetection}
                  disabled={loading}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-indigo-200 dark:shadow-none"
                >
                  <Sparkles size={16} /> {loading ? 'Analyzing Cheque...' : 'Run Gemini AI Detection'}
                </button>
              )}

              {image && (
                <button
                  onClick={handleSaveTemplate}
                  disabled={loading}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-teal-200 dark:shadow-none"
                >
                  <Save size={16} /> Save Custom Template
                </button>
              )}
            </div>

            {/* Fine-Tuning Coordinates list */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-150 dark:border-gray-800 p-6 space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Coordinate Controls (mm)</h3>
              <div className="space-y-3">
                {Object.keys(coords).map((fieldKey) => {
                  const key = fieldKey as keyof Coords;
                  return (
                    <div key={key} className="space-y-1">
                      <div className="text-xs font-semibold text-gray-500 capitalize">{key}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-gray-400">X:</span>
                          <input
                            type="number"
                            step="0.5"
                            value={coords[key].x}
                            onChange={(e) => setCoords({
                              ...coords,
                              [key]: { ...coords[key], x: parseFloat(e.target.value) || 0 }
                            })}
                            className="w-full px-2 py-1 border border-gray-250 dark:border-gray-700 dark:bg-gray-800 rounded text-xs"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-gray-400">Y:</span>
                          <input
                            type="number"
                            step="0.5"
                            value={coords[key].y}
                            onChange={(e) => setCoords({
                              ...coords,
                              [key]: { ...coords[key], y: parseFloat(e.target.value) || 0 }
                            })}
                            className="w-full px-2 py-1 border border-gray-250 dark:border-gray-700 dark:bg-gray-800 rounded text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle/Right: Interactive Drag-and-drop Visualizer */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-150 dark:border-gray-800 min-h-[400px] flex flex-col items-center justify-center relative shadow-sm">
              <div className="absolute top-4 left-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                Alignment Calibration Canvas
              </div>

              {image ? (
                <div className="overflow-x-auto w-full py-8">
                  <div
                    className="relative border border-slate-350 bg-slate-100 mx-auto select-none overflow-hidden"
                    style={{
                      width: `${width}mm`,
                      height: `${height}mm`,
                      backgroundImage: `url(${image})`,
                      backgroundSize: '100% 100%',
                    }}
                  >
                    {/* Draggable overlays */}
                    {Object.keys(coords).map((fieldKey) => {
                      const key = fieldKey as keyof Coords;
                      const field = coords[key];
                      return (
                        <div
                          key={key}
                          onMouseDown={(e) => handleMouseDown(e, key)}
                          onTouchStart={(e) => handleTouchStart(e, key)}
                          className="absolute border border-teal-500/50 bg-teal-500/20 text-teal-800 dark:text-teal-200 px-2 py-0.5 rounded text-[10px] font-bold cursor-move flex items-center gap-1 shadow-md"
                          style={{
                            left: `${field.x}mm`,
                            top: `${field.y}mm`,
                            transform: 'translate(-50%, -50%)', // Anchor at coordinates
                          }}
                        >
                          <Move size={10} />
                          {key.toUpperCase()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 space-y-3">
                  <Upload size={48} className="mx-auto text-gray-300 dark:text-gray-700 animate-bounce" />
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">No Cheque Image Uploaded</h3>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    Please upload an image of your physical cheque in the left panel to configure coordinate alignments.
                  </p>
                </div>
              )}
            </div>

            {/* Saved Templates database list */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-150 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">Your Custom Templates</h3>
              {savedTemplates.length === 0 ? (
                <p className="text-xs text-gray-400">No custom templates saved yet. Create one above!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedTemplates.map((tpl) => (
                    <div key={tpl.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-between hover:border-teal-500 dark:hover:border-teal-500 transition-all">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{tpl.name}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">{tpl.width}mm × {tpl.height}mm</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setTemplateName(tpl.name);
                            setWidth(tpl.width.toString());
                            setHeight(tpl.height.toString());
                            setImage(tpl.imageUrl);
                            setCoords(JSON.parse(tpl.coords));
                            setSuccess(`Loaded template "${tpl.name}". You can now edit and save.`);
                          }}
                          className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-600 dark:text-gray-300 rounded-xl transition-colors"
                          title="Edit Template"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(tpl.id, tpl.name)}
                          className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 rounded-xl transition-colors"
                          title="Delete Template"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
