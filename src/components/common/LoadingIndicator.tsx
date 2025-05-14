
import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const LoadingIndicator = ({ fullScreen = false, size = 'medium' }: LoadingIndicatorProps) => {
  const sizeMap = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-busy="true" aria-live="polite">
        <Loader2 className={`${sizeMap[size]} text-poda-blue animate-spin`} />
      </div>
    );
  }
  
  return (
    <div className="h-20 flex items-center justify-center">
      <Loader2 className={`${sizeMap[size]} text-poda-blue animate-spin`} />
    </div>
  );
};

export default LoadingIndicator;
