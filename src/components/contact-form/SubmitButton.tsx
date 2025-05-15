
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className={`btn-secondary flex items-center justify-center min-w-[180px] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Odesílání...
          </>
        ) : 'Odeslat formulář'}
      </button>
    </div>
  );
};

export default SubmitButton;
