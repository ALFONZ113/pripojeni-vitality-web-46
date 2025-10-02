/**
 * Minimal component for fastest possible First Contentful Paint
 * This renders immediately with critical styles only
 */

const FastFCP = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center gap-4 items-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default FastFCP;
