
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
    modulePreload: true,
    rollupOptions: {
      output: {
        // Advanced chunking strategy with dynamic imports
        manualChunks: (id) => {
          // Vendor chunks by library type
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            return 'vendor-other';
          }
          
          // App chunks by feature
          if (id.includes('/components/blog/')) {
            return 'chunk-blog';
          }
          if (id.includes('/components/ui/')) {
            return 'chunk-ui';
          }
          if (id.includes('/pages/')) {
            return 'chunk-pages';
          }
          if (id.includes('/utils/')) {
            return 'chunk-utils';
          }
        },
        
        // Optimize asset naming and organization
        chunkFileNames: (chunkInfo) => {
          return `assets/js/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.name || 'asset';
          const info = fileName.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(fileName)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(fileName)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(fileName)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      },
      
      // Tree shaking optimizations
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    
    // Target modern browsers for better optimization
    target: ['es2022', 'chrome89', 'firefox89', 'safari15'],
    
    // Optimize chunk sizes
    chunkSizeWarningLimit: 600,
    
    // Disable source maps for production
    sourcemap: false,
    
    // CSS optimization
    cssCodeSplit: true,
    // Use default CSS minifier instead of lightningcss
    
    // Enhanced minification
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        passes: 2,
        hoist_funs: true,
        hoist_vars: true
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
      }
    } : undefined,
    
    // Optimize output
    reportCompressedSize: false,
    
    // Enable aggressive asset inlining for small assets
    assetsInlineLimit: 4096
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
