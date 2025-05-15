
interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" aria-live="assertive">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
        <h1 className="text-xl font-bold text-red-600 mb-4">Chyba při načítání</h1>
        <p className="text-gray-700 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Obnovit stránku
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
