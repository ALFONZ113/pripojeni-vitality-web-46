import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createRequire } from "module";

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
