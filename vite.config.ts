
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { componentTagger } from 'lovable-tagger'
// Import with an explicit JSX handling for build time
import { getNoScriptContent } from './src/utils/renderToString'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(), // This properly handles JSX in the project
    mode === 'development' && componentTagger(),
    {
      name: 'inject-noscript-content',
      transformIndexHtml(html: string) {
        // Generate the NoScriptFallback component content
        const noScriptContent = getNoScriptContent();
        
        // Replace the noscript placeholder with the generated content
        return html.replace(
          /<noscript>\s*<!--\s*NoScript content will be injected here during the build process\s*-->\s*<\/noscript>/,
          `<noscript>${noScriptContent}</noscript>`
        );
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    host: "::",
    port: 8080
  },
  // Explicitly configure esbuild to handle JSX during build
  esbuild: {
    jsx: 'automatic',
  }
}))
