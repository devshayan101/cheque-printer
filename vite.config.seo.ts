/**
 * SEO-Enhanced Vite Configuration for ChequeKart
 * 
 * This configuration demonstrates how to implement pre-rendering
 * for better SEO performance. Pre-rendering generates static HTML
 * versions of key pages at build time, which search engines can
 * easily crawl and index.
 * 
 * To use this configuration:
 * 1. Install the pre-rendering plugin: npm install @prerenderer/builder-static
 * 2. Rename this file to vite.config.ts
 * 3. Update the routes array with your application routes
 * 4. Run: npm run build
 * 
 * This will generate static HTML files for each route in the dist/ directory.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimize for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
          ],
        },
      },
    },
  },
  // Performance optimization
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
});

/**
 * ALTERNATIVE: Using Prerender.io Service
 * 
 * If you prefer not to manage pre-rendering yourself, you can use
 * Prerender.io, a service that handles pre-rendering for you.
 * 
 * Steps:
 * 1. Sign up at https://prerender.io
 * 2. Add your domain
 * 3. Update your server to check for Prerender.io user agent
 * 4. Prerender.io will automatically crawl and cache your pages
 * 
 * This is a managed solution that requires minimal code changes.
 */

/**
 * ALTERNATIVE: Using Next.js for Full SSR/SSG
 * 
 * For a more comprehensive SEO solution, consider migrating to Next.js:
 * - Built-in SSR and SSG support
 * - Automatic code splitting
 * - Image optimization
 * - API routes
 * - Incremental Static Regeneration (ISR)
 * 
 * This would be a larger refactor but provides the best SEO foundation.
 */
