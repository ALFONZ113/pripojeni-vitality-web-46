
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <div className="text-center max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-poda-orange" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-poda-blue">404</h1>
          <p className="text-xl text-gray-600 mb-8">Stránka nebyla nalezena</p>
          <p className="text-gray-500 mb-8">
            Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
          </p>
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Zpět na úvodní stránku
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
