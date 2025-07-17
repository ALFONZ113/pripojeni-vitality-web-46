
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Prerendering disabled for now - using static content approach
    // mode === 'production' && prerender({...}),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: true, // Ensure module preloading is enabled
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and core libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          
          // UI chunk for component libraries
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-tabs',
            'lucide-react'
          ],
          
          // Utils chunk for utilities
          utils: [
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
            'date-fns'
          ],
          
          // Animation and interaction chunk
          animations: ['framer-motion'],
          
          // Charts chunk (if used)
          charts: ['recharts']
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    // Enable source maps in production for debugging
    sourcemap: false,
    
    // Minimize CSS and JS - only use terser in production
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    } : undefined,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'lucide-react'
    ],
  },
}));
