
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background to-muted dark:from-gray-900 dark:to-gray-800"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI0YwRjdGRiIgc3Ryb2tlLXdpZHRoPSIxIiBjeD0iMTAiIGN5PSIxMCIgcj0iMyIvPjwvZz48L3N2Zz4=')] opacity-40 dark:opacity-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 dark:bg-blue-500/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-100/40 dark:bg-orange-500/10 rounded-full filter blur-3xl opacity-30"></div>
    </div>
  );
};

export default HeroBackground;
