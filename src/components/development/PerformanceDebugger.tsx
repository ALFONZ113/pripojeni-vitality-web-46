
import React from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fcp?: number;
  cls?: number;
}

interface PerformanceDebuggerProps {
  performanceMetrics: PerformanceMetrics;
}

const PerformanceDebugger = ({ performanceMetrics }: PerformanceDebuggerProps) => {
  if (process.env.NODE_ENV !== 'development' || !performanceMetrics.lcp) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 text-xs rounded z-50">
      <div>LCP: {Math.round(performanceMetrics.lcp)}ms</div>
      <div>FCP: {performanceMetrics.fcp ? Math.round(performanceMetrics.fcp) : 'N/A'}ms</div>
      <div>CLS: {performanceMetrics.cls ? performanceMetrics.cls.toFixed(3) : 'N/A'}</div>
    </div>
  );
};

export default PerformanceDebugger;
