import React, { useState, useEffect } from 'react';
import { ChequeData, BankLayout, PrintSettings } from '../types';
import { formatIndianNumber } from '../utils/currency';

interface ChequePreviewProps {
    data: ChequeData;
    layout: BankLayout;
    settings: PrintSettings;
    customImageUrl?: string | null;
    onFieldDrag?: (field: keyof PrintSettings['fieldOffsets'], newOffset: { x: number, y: number }) => void;
}

export const ChequePreview: React.FC<ChequePreviewProps> = ({ data, layout, settings, customImageUrl, onFieldDrag }) => {
    // 1mm approx 3.78px for screen display (96 DPI), but for print usually browsers handle physical units (mm, in) well.
    // We will use 'mm' units in CSS which browsers respect during print.
    // Standard Cheque Size: 203.2mm x 93mm (Aspect Ratio ~2.18)

    const { coords } = layout;
    const { offsetX, offsetY, fontSize, fieldOffsets } = settings;
    const backgroundImage = customImageUrl || layout.imageUrl;

    // Drag State
    const [dragState, setDragState] = useState<{
        field: keyof PrintSettings['fieldOffsets'];
        startX: number;
        startY: number;
        startOffsetX: number;
        startOffsetY: number;
    } | null>(null);

    // Handle Dragging (Mouse + Touch)
    useEffect(() => {
        if (!dragState || !onFieldDrag) return;

        const handleMove = (clientX: number, clientY: number) => {
            const dxPx = clientX - dragState.startX;
            const dyPx = clientY - dragState.startY;

            // Convert px to mm (approx 3.7795 px per mm)
            const dxMm = dxPx / 3.7795;
            const dyMm = dyPx / 3.7795;

            const newX = Number((dragState.startOffsetX + dxMm).toFixed(1));
            const newY = Number((dragState.startOffsetY + dyMm).toFixed(1));

            onFieldDrag(dragState.field, { x: newX, y: newY });
        };

        const handleMouseMove = (e: MouseEvent) => {
            handleMove(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault(); // Prevent scrolling while dragging
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
    }, [dragState, onFieldDrag]);

    const handleMouseDown = (e: React.MouseEvent, field: keyof PrintSettings['fieldOffsets']) => {
        if (!onFieldDrag) return;
        e.preventDefault(); // Prevent text selection
        e.stopPropagation();
        setDragState({
            field,
            startX: e.clientX,
            startY: e.clientY,
            startOffsetX: fieldOffsets[field].x,
            startOffsetY: fieldOffsets[field].y
        });
    };

    const handleTouchStart = (e: React.TouchEvent, field: keyof PrintSettings['fieldOffsets']) => {
        if (!onFieldDrag) return;
        e.stopPropagation();
        const touch = e.touches[0];
        setDragState({
            field,
            startX: touch.clientX,
            startY: touch.clientY,
            startOffsetX: fieldOffsets[field].x,
            startOffsetY: fieldOffsets[field].y
        });
    };

    const getDraggableClass = () => onFieldDrag ? 'cursor-move touch-none hover:outline hover:outline-2 hover:outline-teal-400/50 hover:bg-teal-50/20 rounded-sm transition-colors' : '';

    // Helper to calculate absolute position with offsets
    const pos = (x: number, y: number, fieldOffset: { x: number, y: number } = { x: 0, y: 0 }) => ({
        left: `${x + offsetX + fieldOffset.x}mm`,
        top: `${y + offsetY + fieldOffset.y}mm`,
        fontSize: `${fontSize}pt`,
    });

    // Split date into characters
    const dateParts = data.date ? data.date.split('-').reverse().join('').split('') : []; // YYYY-MM-DD -> DDMMYYYY -> ['D','D'...]

    return (
        <div
            id="printable-area"
            className="relative overflow-hidden bg-white print:bg-transparent select-none print:shadow-none"
            style={{
                width: '203.2mm',
                height: '93mm',
                // Force background to fill dimensions exactly to maintain coordinate alignment
                backgroundImage: settings.showBackground ? `url("${backgroundImage}")` : 'none',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                border: '1px solid #e2e8f0'
            }}
        >
            {/* A/C Payee Cross */}
            {data.isAccountPayee && (
                <div
                    className={`absolute font-bold text-center border-t-2 border-b-2 border-slate-900 -rotate-45 transform origin-center whitespace-nowrap px-4 py-1 print-font ${getDraggableClass()}`}
                    onMouseDown={(e) => handleMouseDown(e, 'acPayee')}
                    onTouchStart={(e) => handleTouchStart(e, 'acPayee')}
                    style={{
                        left: `${coords.acPayee.x + offsetX + fieldOffsets.acPayee.x}mm`,
                        top: `${coords.acPayee.y + offsetY + fieldOffsets.acPayee.y}mm`,
                        fontSize: `${fontSize - 2}pt`
                    }}
                >
                    A/C PAYEE
                </div>
            )}

            {/* Date */}
            <div
                className={`absolute flex print-font ${getDraggableClass()}`}
                onMouseDown={(e) => handleMouseDown(e, 'date')}
                onTouchStart={(e) => handleTouchStart(e, 'date')}
                style={{
                    left: `${coords.date.x + offsetX + fieldOffsets.date.x}mm`,
                    top: `${coords.date.y + offsetY + fieldOffsets.date.y}mm`
                }}
            >
                {dateParts.map((char, i) => (
                    <div key={i} style={{ width: `${coords.date.spacing}mm`, textAlign: 'center', fontSize: `${fontSize}pt`, letterSpacing: 0 }}>
                        {char}
                    </div>
                ))}
            </div>

            {/* Payee */}
            <div
                className={`absolute whitespace-nowrap uppercase font-medium print-font ${getDraggableClass()}`}
                onMouseDown={(e) => handleMouseDown(e, 'payee')}
                onTouchStart={(e) => handleTouchStart(e, 'payee')}
                style={pos(coords.payee.x, coords.payee.y, fieldOffsets.payee)}
            >
                ***{data.payee}***
            </div>

            {/* Amount in Words */}
            <div
                className={`absolute uppercase font-medium leading-relaxed print-font ${getDraggableClass()}`}
                onMouseDown={(e) => handleMouseDown(e, 'amountWords')}
                onTouchStart={(e) => handleTouchStart(e, 'amountWords')}
                style={{
                    left: `${coords.amountWords.x + offsetX + fieldOffsets.amountWords.x}mm`,
                    top: `${coords.amountWords.y + offsetY + fieldOffsets.amountWords.y}mm`,
                    width: `${coords.amountWords.width}mm`,
                    lineHeight: `${coords.amountWords.lineHeight}mm`, // Matches line spacing on physical cheque
                    fontSize: `${fontSize}pt`
                }}
            >
                ***{data.amountInWords}***
            </div>

            {/* Amount in Numbers */}
            <div
                className={`absolute font-bold print-font ${getDraggableClass()}`}
                onMouseDown={(e) => handleMouseDown(e, 'amountNumber')}
                onTouchStart={(e) => handleTouchStart(e, 'amountNumber')}
                style={{
                    ...pos(coords.amountNumber.x, coords.amountNumber.y, fieldOffsets.amountNumber),
                    fontSize: `${fontSize + 2}pt` // Usually slightly larger
                }}
            >
                {data.amount ? `${formatIndianNumber(data.amount)}/-` : ''}
            </div>

            {/* Strike out 'Or Bearer' */}
            {!data.isBearer && (
                <div
                    className={`absolute border-b-2 border-slate-900 w-12 print-font ${getDraggableClass()}`}
                    onMouseDown={(e) => handleMouseDown(e, 'bearer')}
                    onTouchStart={(e) => handleTouchStart(e, 'bearer')}
                    style={{
                        left: `${coords.bearer.x + offsetX + fieldOffsets.bearer.x}mm`,
                        top: `${coords.bearer.y + offsetY + fieldOffsets.bearer.y}mm`,
                        transform: 'rotate(-5deg)'
                    }}
                ></div>
            )}
        </div>
    );
};