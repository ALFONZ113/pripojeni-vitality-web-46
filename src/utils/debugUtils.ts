
import React from 'react';

// Debug state to track application status
export const debugState = {
  initialized: false,
  hydrated: false,
  animationsLoaded: false,
  mapyApiLoaded: false,
  serviceWorkerRegistered: false,
  timeToFirstRender: 0,
  errors: [] as string[]
};

// Debug mode
export const isDebugMode = (): boolean => {
  return window.location.search.includes('debug=true') || localStorage.getItem('debugMode') === 'true';
};

// Enable debug mode
export const enableDebugMode = (): void => {
  localStorage.setItem('debugMode', 'true');
  console.log('Debug mode enabled');
};

// Disable debug mode
export const disableDebugMode = (): void => {
  localStorage.removeItem('debugMode');
  console.log('Debug mode disabled');
};

// Log with timestamp if in debug mode
export const debugLog = (message: string, data?: any): void => {
  if (!isDebugMode()) return;
  
  const timestamp = new Date().toISOString();
  if (data) {
    console.log(`[${timestamp}] ${message}`, data);
  } else {
    console.log(`[${timestamp}] ${message}`);
  }
  
  // Add to debug state
  debugState.errors.push(`${timestamp}: ${message}`);
};

// Track loading time
export const startPerformanceTracking = (): void => {
  if (!isDebugMode()) return;
  
  window.performance.mark('app-start');
  debugLog('Application start tracking initiated');
};

// End tracking and log results
export const endPerformanceTracking = (marker: string): void => {
  if (!isDebugMode()) return;
  
  window.performance.mark(`${marker}-end`);
  window.performance.measure(marker, 'app-start', `${marker}-end`);
  
  const measures = window.performance.getEntriesByType('measure');
  const relevantMeasure = measures.find(m => m.name === marker);
  
  if (relevantMeasure) {
    debugLog(`${marker} took ${relevantMeasure.duration.toFixed(2)}ms`);
  }
};

// Error handler for global errors
export const setupGlobalErrorHandling = (): void => {
  if (!isDebugMode()) return;
  
  window.addEventListener('error', (event) => {
    debugLog(`Global error: ${event.message}`, {
      error: event.error,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    debugLog(`Unhandled promise rejection: ${event.reason}`, { reason: event.reason });
  });
};

// Mapy.cz API status tracking
interface MapyApiStatus {
  loaded: boolean;
  loading: boolean;
  failed: boolean;
  retries: number;
  maxRetries: number;
  retryTimeout: number;
}

// Define Mapy API status with required fields
export const mapyApi: MapyApiStatus = {
  loaded: false,
  loading: false,
  failed: false,
  retries: 0,
  maxRetries: 3,
  retryTimeout: 5000
};

// Debug overlay component
export const DebugOverlay: React.FC = () => {
  if (!isDebugMode()) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 9999,
        fontSize: '12px',
        maxWidth: '300px',
        maxHeight: '200px',
        overflowY: 'auto'
      }}
    >
      <h4 style={{ marginTop: 0 }}>Debug Info</h4>
      <div>
        <div>Initialized: {debugState.initialized ? '✓' : '✗'}</div>
        <div>Hydrated: {debugState.hydrated ? '✓' : '✗'}</div>
        <div>Animations: {debugState.animationsLoaded ? '✓' : '✗'}</div>
        <div>Mapy API: {mapyApi.loaded ? '✓' : mapyApi.loading ? '⟳' : '✗'}</div>
        <div>SW: {debugState.serviceWorkerRegistered ? '✓' : '✗'}</div>
        <div>Render time: {debugState.timeToFirstRender}ms</div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={() => disableDebugMode()}
          style={{ 
            backgroundColor: '#ff6b6b', 
            border: 'none', 
            borderRadius: '3px', 
            padding: '5px', 
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Disable Debug Mode
        </button>
      </div>
    </div>
  );
};

// Export a function to create a debug URL
export const createDebugUrl = (): string => {
  const url = new URL(window.location.href);
  url.searchParams.set('debug', 'true');
  return url.toString();
};
