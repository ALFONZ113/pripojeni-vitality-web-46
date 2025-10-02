/**
 * Critical CSS for immediate First Contentful Paint
 * This CSS is inlined in the head for instant rendering
 */

export const CRITICAL_CSS = `
  /* Reset and base styles */
  *, ::before, ::after { box-sizing: border-box; border: 0 solid; }
  html { line-height: 1.5; -webkit-text-size-adjust: 100%; tab-size: 4; font-family: ui-sans-serif, system-ui, sans-serif; }
  body { margin: 0; line-height: inherit; }
  
  /* Critical layout */
  .min-h-screen { min-height: 100vh; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { inset: 0; }
  .overflow-hidden { overflow: hidden; }
  .z-10 { z-index: 10; }
  
  /* Critical colors from design system */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 210 100% 45%;
    --primary-foreground: 210 40% 98%;
  }
  
  body { 
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
  
  /* Critical typography */
  .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .font-bold { font-weight: 700; }
  .text-center { text-align: center; }
  
  /* Critical spacing */
  .pt-20 { padding-top: 5rem; }
  .pb-16 { padding-bottom: 4rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .gap-4 { gap: 1rem; }
  .max-w-4xl { max-width: 56rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  
  /* Loading indicator */
  @keyframes spin { to { transform: rotate(360deg); } }
  .animate-spin { animation: spin 1s linear infinite; }
  .w-8 { width: 2rem; }
  .h-8 { height: 2rem; }
  .rounded-full { border-radius: 9999px; }
  .border-2 { border-width: 2px; }
  .border-primary { border-color: hsl(var(--primary)); }
  .border-t-transparent { border-top-color: transparent; }
`;

/**
 * Inject critical CSS into document head
 */
export const injectCriticalCSS = (): void => {
  if (typeof document === 'undefined') return;
  
  // Check if already injected
  if (document.querySelector('style[data-critical-css]')) return;
  
  const style = document.createElement('style');
  style.setAttribute('data-critical-css', 'true');
  style.textContent = CRITICAL_CSS;
  
  // Insert at the very beginning of head
  const firstChild = document.head.firstChild;
  if (firstChild) {
    document.head.insertBefore(style, firstChild);
  } else {
    document.head.appendChild(style);
  }
};
