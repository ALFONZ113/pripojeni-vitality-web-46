
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
    
    // Simplified rollup options for better mobile compatibility
    rollupOptions: {
      output: {
        // Simplified chunking strategy - less aggressive for mobile
        manualChunks: (id) => {
          // Only chunk vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            return 'vendor-other';
          }
          // Let Vite handle app chunks automatically
        },
        
        // Simplified asset naming
        chunkFileNames: `assets/js/[name]-[hash].js`,
        assetFileNames: `assets/[ext]/[name]-[hash].[ext]`
      },
      
      // Basic tree shaking
      treeshake: {
        moduleSideEffects: false
      }
    },
    
    // Target broader browser support for mobile
    target: ['es2020', 'chrome80', 'firefox78', 'safari14'],
    
    // Reasonable chunk size limit
    chunkSizeWarningLimit: 1000,
    
    // Enable source maps for development
    sourcemap: mode === 'development',
    
    // CSS optimization
    cssCodeSplit: true,
    
    // Simplified minification
    minify: mode === 'production' ? 'esbuild' : false,
    
    // Less aggressive asset inlining for mobile compatibility
    assetsInlineLimit: 2048
  },
  
  // Optimize dependencies for mobile
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
  },
}));
