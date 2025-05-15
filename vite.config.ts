
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// Import with an explicit JSX handling for build time
import { getNoScriptContent } from './src/utils/renderToString'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // This properly handles JSX in the project
    {
      name: 'inject-noscript-content',
      transformIndexHtml(html) {
        // Generate the NoScriptFallback component content
        const noScriptContent = getNoScriptContent();
        
        // Replace the noscript placeholder with the generated content
        return html.replace(
          /<noscript>\s*<!--\s*NoScript content will be injected here during the build process\s*-->\s*<\/noscript>/,
          `<noscript>${noScriptContent}</noscript>`
        );
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080
  },
  // Add esbuild options to ensure JSX is properly handled during build
  esbuild: {
    jsx: 'automatic',
  }
})
