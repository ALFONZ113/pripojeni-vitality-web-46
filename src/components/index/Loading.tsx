
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  isFullScreen?: boolean;
}

const Loading = ({ isFullScreen = true }: LoadingProps) => {
  if (isFullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-busy="true" aria-live="polite">
        <Loader2 className="w-12 h-12 text-poda-blue animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="h-20 flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-poda-blue animate-spin" />
    </div>
  );
};

export default Loading;
