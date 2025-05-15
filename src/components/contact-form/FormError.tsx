
import { AlertTriangle } from 'lucide-react';

interface FormErrorProps {
  error: string | null;
}

const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
      <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
      <p className="text-red-700">{error}</p>
    </div>
  );
};

export default FormError;
