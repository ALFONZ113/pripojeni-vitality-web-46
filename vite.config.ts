import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createRequire } from "module";
import fs from "fs";

// Generate slug from title (matching slugGenerator.ts logic)
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Get top 20 blog posts for pre-rendering by reading blog data files
const getTopBlogRoutes = (): string[] => {
  try {
    // Manually defined top 20 blog post slugs for pre-rendering
    // Update this list when adding important new blog posts
    const topBlogSlugs = [
      'ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi',
      'gpon-technologie-budoucnost-internetoveho-pripojeni',
      'o2-nej-prevzatie-poda-alternativa-zakaznici',
      'iptv-vs-traditionalni-tv-kompletni-pruvodce-2025',
      'panelak-internet-faq-vsechny-odpovedi',
      'polanka-60ghz-poda-super-2025',
      'gaming-ostrava-nejlepsi-internet-hry',
      'pomaly-internet-jak-zrychlit-pripojeni',
      'jak-vybrat-spravny-internet-domacnost-pruvodce',
      'ostrava-internet-pripojeni-srovnani',
      'karvina-internet-provider-srovnani',
      'optika-vs-med-proc-ostravsko-dostava-internet-21-stoleti',
      'wifi-6-co-prinese-nova-generace-bezdratu',
      'symetricke-pripojeni-proc-je-upload-dulezity',
      'jak-merit-rychlost-internetu-spravne',
      'stabilita-vs-rychlost-co-je-dulezitejsi',
      'smart-home-jake-pripojeni-potrebujete',
      'jak-funguje-opticke-pripojeni',
      'cloud-gaming-jake-pripojeni-je-idealni',
      'home-office-pozadavky-internet'
    ];
    
    return topBlogSlugs.map(slug => `/blog/${slug}`);
  } catch (error) {
    console.warn('Could not load blog posts for pre-rendering:', error);
    return [];
  }
};

const TOP_BLOG_ROUTES = getTopBlogRoutes();

// Precompute routes for prerendering (safe static routes only)
const STATIC_ROUTES = [
  "/",
  "/blog",
  "/internet-tv",
  "/iptv",
  "/kontakt",
  "/tarify",
  "/programy",
  "/promo-akce",
  "/pomoc-s-prechodem",
  // Geographic pages
  "/internet-ostrava",
  "/internet-karvina",
  "/internet-bohumin",
  "/internet-havirov",
  "/internet-poruba",
  // Legal and marketing
  "/ochrana-soukromi",
  "/obchodni-podminky",
  "/cookies",
  "/giga-internet",
  // Top 20 blog posts for better SEO indexing
  ...TOP_BLOG_ROUTES,
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins: any[] = [react()];
  if (mode === "development") {
    plugins.push(componentTagger());
  }
  if (mode === "production") {
    try {
      const require = createRequire(import.meta.url);
      // Support both CJS and ESM export shapes
      const mod: any = require("vite-plugin-prerender");
      const prerender = mod?.default ?? mod;
      if (typeof prerender === "function") {
        plugins.push(
          prerender({
            staticDir: path.resolve(__dirname, "dist"),
            routes: STATIC_ROUTES,
          })
        );
      } else {
        console.warn("[vite] vite-plugin-prerender loaded but is not a function; skipping.");
      }
    } catch (err) {
      console.warn("[vite] vite-plugin-prerender not available; skipping.", err);
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    plugins,
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
            vendor: ["react", "react-dom", "react-router-dom"],

            // UI chunk for component libraries
            ui: [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-toast",
              "@radix-ui/react-tabs",
              "lucide-react",
            ],

            // Utils chunk for utilities
            utils: [
              "clsx",
              "tailwind-merge",
              "class-variance-authority",
              "date-fns",
            ],

            // Animation and interaction chunk
            animations: ["framer-motion"],

            // Charts chunk (if used)
            charts: ["recharts"],
          },
        },
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,

      // Enable source maps in production for debugging
      sourcemap: false,

      // Minimize CSS and JS - only use terser in production
      minify: mode === "production" ? "terser" : false,
      terserOptions: mode === "production" ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } : undefined,
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "lucide-react",
      ],
    },
  };
});
