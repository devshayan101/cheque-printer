import React, { useRef, useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const iconMap = {
        light: <Sun size={20} />,
        dark: <Moon size={20} />,
        system: <Monitor size={20} />,
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
                aria-label="Toggle theme"
            >
                {iconMap[theme]}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50 overflow-hidden text-sm font-medium">
                    <button
                        onClick={() => { setTheme('light'); setIsOpen(false); }}
                        className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${theme === 'light' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                        <Sun size={16} /> Light
                    </button>
                    <button
                        onClick={() => { setTheme('dark'); setIsOpen(false); }}
                        className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${theme === 'dark' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                        <Moon size={16} /> Dark
                    </button>
                    <button
                        onClick={() => { setTheme('system'); setIsOpen(false); }}
                        className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${theme === 'system' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                        <Monitor size={16} /> System
                    </button>
                </div>
            )}
        </div>
    );
};
