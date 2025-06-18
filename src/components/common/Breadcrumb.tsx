
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  const location = useLocation();
  
  // Generate breadcrumb items from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Úvod', href: '/' }
    ];
    
    let currentPath = '';
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      
      // Map path segments to readable titles
      const titles: Record<string, string> = {
        'blog': 'Blog',
        'kontakt': 'Kontakt',
        'tarify': 'Tarify',
        'programy': 'TV Programy',
        'iptv': 'IPTV',
        'internet-tv': 'Internet + TV',
        'internet-ostrava': 'Internet Ostrava',
        'internet-karvina': 'Internet Karviná',
        'internet-bohumin': 'Internet Bohumín',
        'internet-havirov': 'Internet Havířov',
        'internet-poruba': 'Internet Poruba'
      };
      
      const title = titles[part] || part.charAt(0).toUpperCase() + part.slice(1);
      
      // Don't add link for the current page (last item)
      breadcrumbs.push({
        title,
        href: index === pathParts.length - 1 ? undefined : currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = items || generateBreadcrumbs();
  
  if (breadcrumbItems.length <= 1) return null;
  
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            )}
            {item.href ? (
              <Link 
                to={item.href}
                className="text-gray-600 hover:text-poda-blue transition-colors flex items-center"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.title}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium flex items-center">
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
