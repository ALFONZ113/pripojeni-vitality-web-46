
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import type { BlogPost } from '../../data/blog/types';

interface BlogPostSidebarProps {
  relatedPosts: BlogPost[];
}

const BlogPostSidebar = ({ relatedPosts }: BlogPostSidebarProps) => {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-28">
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-poda-blue mb-4">Kontaktní formulář</h3>
          <p className="text-gray-600 mb-6">
            Máte otázky k našim službám nebo potřebujete poradit s výběrem tarifu? Neváhejte nás kontaktovat.
          </p>
          <Link
            to="/kontakt"
            className="btn-secondary w-full flex justify-center"
          >
            Kontaktovat
          </Link>
        </div>
        
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-poda-blue mb-6">Související články</h3>
            <div className="space-y-4">
              {relatedPosts.map(relatedPost => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="block group"
                >
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-3">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-poda-blue group-hover:text-poda-orange transition-colors">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {relatedPost.date}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostSidebar;
