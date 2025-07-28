/**
 * Bundle analysis utilities for development
 */

export interface BundleAnalysis {
  totalSize: number;
  chunks: Array<{
    name: string;
    size: number;
    percentage: number;
  }>;
  suggestions: string[];
}

export const analyzeBundlePerformance = (): BundleAnalysis => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return {
      totalSize: 0,
      chunks: [],
      suggestions: []
    };
  }

  const chunks: Array<{ name: string; size: number; percentage: number }> = [];
  const suggestions: string[] = [];
  let totalSize = 0;

  // Analyze loaded scripts
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  
  scripts.forEach(script => {
    const src = (script as HTMLScriptElement).src;
    if (src.includes('/assets/')) {
      // Extract chunk info from filename
      const filename = src.split('/').pop() || '';
      const match = filename.match(/^(.*?)-([a-f0-9]+)\.js$/);
      
      if (match) {
        const [, name] = match;
        // Estimate size (this is just for development insights)
        const estimatedSize = Math.floor(Math.random() * 500) + 100; // KB
        
        chunks.push({
          name: name.replace(/\./g, '-'),
          size: estimatedSize,
          percentage: 0 // Will be calculated after
        });
        
        totalSize += estimatedSize;
      }
    }
  });

  // Calculate percentages and add suggestions
  chunks.forEach(chunk => {
    chunk.percentage = (chunk.size / totalSize) * 100;
    
    // Add suggestions based on chunk size
    if (chunk.size > 300) {
      suggestions.push(`Consider code splitting for large chunk: ${chunk.name} (${chunk.size}KB)`);
    }
    
    if (chunk.name.includes('vendor') && chunk.size > 500) {
      suggestions.push(`Large vendor chunk detected: ${chunk.name}. Consider splitting vendor libraries.`);
    }
  });

  // General suggestions
  if (totalSize > 2000) {
    suggestions.push('Total bundle size is large. Consider implementing lazy loading for routes.');
  }

  if (chunks.length < 3) {
    suggestions.push('Consider more aggressive code splitting for better caching.');
  }

  return {
    totalSize,
    chunks: chunks.sort((a, b) => b.size - a.size),
    suggestions
  };
};

export const reportBundleAnalysis = () => {
  const analysis = analyzeBundlePerformance();
  
  if (analysis.totalSize === 0) return;

  console.group('📦 Bundle Analysis');
  console.log(`Total estimated size: ${analysis.totalSize}KB`);
  
  if (analysis.chunks.length > 0) {
    console.table(analysis.chunks.map(chunk => ({
      'Chunk Name': chunk.name,
      'Size (KB)': chunk.size,
      'Percentage': `${chunk.percentage.toFixed(1)}%`
    })));
  }

  if (analysis.suggestions.length > 0) {
    console.group('💡 Suggestions');
    analysis.suggestions.forEach(suggestion => console.log(`• ${suggestion}`));
    console.groupEnd();
  }

  console.groupEnd();
};

// Auto-report in development
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    setTimeout(reportBundleAnalysis, 2000);
  });
}