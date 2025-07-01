
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'lucide-react'],
          utils: ['clsx', 'tailwind-merge', '@tanstack/react-query']
        },
      },
    },
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 800,
    
    // Production optimizations
    sourcemap: false,
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
      mangle: {
        safari10: true,
      },
    } : undefined,
  },
  
  // Enhanced optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'lucide-react',
      '@tanstack/react-query'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // Enable experimental features for better performance
  experimental: {
    renderBuiltUrl(filename, { hostId, hostType, type }) {
      if (type === 'asset' && /\.(png|jpg|jpeg|gif|svg|webp)$/.test(filename)) {
        return `/${filename}`;
      }
      return { relative: true };
    }
  }
}));
