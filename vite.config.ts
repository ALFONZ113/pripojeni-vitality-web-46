
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
        manualChunks: (id) => {
          // Node modules chunking strategy
          if (id.includes('node_modules')) {
            // Core React libraries
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            
            // UI libraries
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            
            // Utility libraries
            if (id.includes('clsx') || id.includes('tailwind') || id.includes('class-variance') || id.includes('date-fns')) {
              return 'vendor-utils';
            }
            
            // Animation libraries
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            
            // Charts and data visualization
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            
            // Query and data management
            if (id.includes('@tanstack') || id.includes('@supabase')) {
              return 'vendor-data';
            }
            
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'vendor-forms';
            }
            
            // Remaining node_modules
            return 'vendor-misc';
          }
          
          // App-specific chunks
          if (id.includes('/pages/')) {
            return 'pages';
          }
          
          if (id.includes('/components/blog/')) {
            return 'blog';
          }
          
          if (id.includes('/data/blog/')) {
            return 'blog-data';
          }
          
          if (id.includes('/utils/')) {
            return 'utils';
          }
        },
        
        // Optimize chunk naming
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `js/[name]-[hash].js`;
        },
        
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return `assets/[name]-[hash].[ext]`;
          }
          
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return `images/[name]-[hash].[ext]`;
          }
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
      },
    },
    
    // Performance optimizations
    chunkSizeWarningLimit: 800,
    sourcemap: false,
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    } : undefined,
    
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: mode === 'production',
    
    // Target modern browsers for better performance
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
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
