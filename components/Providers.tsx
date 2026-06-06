'use client';

import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { SessionProvider } from 'next-auth/react';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
