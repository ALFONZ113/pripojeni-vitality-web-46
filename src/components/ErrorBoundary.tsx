
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { debugLog } from '../utils/debugUtils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    debugLog('Error caught by boundary:', error);
    debugLog('Component stack:', info.componentStack);
    
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4" aria-live="assertive">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
            <h1 className="text-xl font-bold text-red-600 mb-4">Něco se pokazilo</h1>
            <p className="text-gray-700 mb-4">
              {this.state.error?.message || 'Došlo k neočekávané chybě.'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Obnovit stránku
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
