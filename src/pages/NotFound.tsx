import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="glass p-8 rounded-2xl border border-border mb-8 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 glow-gold">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-6xl font-heading font-bold mb-4 text-gradient-gold">404</h1>
            <p className="text-xl text-foreground mb-4">Stránka nebyla nalezena</p>
            <p className="text-muted-foreground mb-8">
              Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
            </p>
            <Link
              to="/"
              className="btn-gold inline-flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Zpět na úvodní stránku
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
