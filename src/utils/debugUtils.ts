
/**
 * Debug utilities for application troubleshooting
 */

/**
 * Show an overlay with technical information
 * This can be activated by adding ?debug=true to the URL
 */
export const initDebugMode = () => {
  // Only activate in dev mode or when debug param is present
  const isDev = import.meta.env.DEV;
  const urlParams = new URLSearchParams(window.location.search);
  const debugMode = urlParams.get('debug') === 'true';
  
  if (!isDev && !debugMode) return;
  
  console.log('🛠️ Debug mode activated');
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.bottom = '0';
  overlay.style.left = '0';
  overlay.style.zIndex = '9999';
  overlay.style.background = 'rgba(0,0,0,0.8)';
  overlay.style.color = 'white';
  overlay.style.fontFamily = 'monospace';
  overlay.style.padding = '10px';
  overlay.style.fontSize = '12px';
  overlay.style.maxHeight = '30vh';
  overlay.style.overflowY = 'auto';
  overlay.style.maxWidth = '100vw';
  overlay.style.width = '300px';
  
  // Add to DOM
  document.body.appendChild(overlay);
  
  // Update with basic info
  updateDebugInfo(overlay);
  
  // Update periodically
  setInterval(() => updateDebugInfo(overlay), 1000);
  
  return () => {
    document.body.removeChild(overlay);
  };
};

/**
 * Update debug overlay with current info
 */
const updateDebugInfo = (element: HTMLElement) => {
  const now = new Date();
  
  // Collect render timing data
  const timing = window.performance && window.performance.timing;
  const loadTime = timing ? (timing.loadEventEnd - timing.navigationStart) : 'N/A';
  const domReady = timing ? (timing.domComplete - timing.domLoading) : 'N/A';
  
  // API status check
  const mapyStatus = window.mapyApi?.loaded ? '✅ Loaded' : 
                     window.mapyApi?.loading ? '⏳ Loading' : 
                     window.mapyApi?.failed ? '❌ Failed' : 
                     '❓ Unknown';
  
  // Memory usage if available
  const memory = (performance as any).memory ? 
    `${Math.round((performance as any).memory.usedJSHeapSize / (1024 * 1024))}MB / 
     ${Math.round((performance as any).memory.jsHeapSizeLimit / (1024 * 1024))}MB` : 
    'N/A';
  
  element.innerHTML = `
    <div><strong>Debug Info</strong> (${now.toLocaleTimeString()})</div>
    <div>React: ${React ? '✅' : '❌'}</div>
    <div>Mapy.cz API: ${mapyStatus}</div>
    <div>Load time: ${loadTime}ms</div>
    <div>DOM Ready: ${domReady}ms</div>
    <div>Memory: ${memory}</div>
    <div>URL: ${window.location.pathname}</div>
    <div>User Agent: ${navigator.userAgent.substr(0, 50)}...</div>
    <div><button id="debug-clear-cache">Clear Cache</button></div>
  `;
  
  // Add click handler to clear cache button
  const clearButton = document.getElementById('debug-clear-cache');
  if (clearButton) {
    clearButton.onclick = async (e) => {
      e.preventDefault();
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        alert('All caches cleared! Refreshing page...');
        window.location.reload();
      } else {
        alert('Cache API not available');
      }
    };
  }
};

// For TypeScript
declare global {
  interface Window {
    React: any;
  }
}

// Auto-initialize if URL param is present
if (typeof window !== 'undefined') {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('debug') === 'true') {
    window.addEventListener('load', () => {
      setTimeout(initDebugMode, 1000);
    });
  }
}
