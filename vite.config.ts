
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

// Critical routes for prerendering
const PRERENDER_ROUTES = [
  '/',
  '/internet-tv',
  '/iptv', 
  '/kontakt',
  '/tarify',
  '/programy',
  '/blog',
  '/promo-akce',
  '/internet-ostrava',
  '/internet-karvina',
  '/internet-bohumin',
  '/internet-havirov',
  '/internet-poruba',
  '/ochrana-soukromi',
  '/obchodni-podminky',
  '/cookies'
];

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
    mode === 'production' && prerender({
      routes: PRERENDER_ROUTES,
      rendererOptions: {
        renderAfterTime: 500,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }),
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
          // Core vendor chunk
          vendor: ['react', 'react-dom'],
          
          // Router chunk - loaded on demand
          router: ['react-router-dom'],
          
          // UI library chunk - loaded lazily
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-tabs',
          ],
          
          // Icons - loaded on demand
          icons: ['lucide-react'],
          
          // Utils - small and frequently used
          utils: [
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
          ],
          
          // Animation chunk - loaded on interaction
          animations: ['framer-motion'],
          
          // Charts - loaded only when needed
          charts: ['recharts'],
          
          // Date utilities - loaded on demand
          dates: ['date-fns']
        },
      },
    },
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 500,
    
    // Enable source maps only in development
    sourcemap: mode === 'development',
    
    // Aggressive minification in production
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    } : undefined,
  },
  
  // Optimize dependencies for faster loading
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    exclude: [
      'framer-motion',
      'recharts', 
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu'
    ]
  },
}));
