import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import type { BlogPost } from '../../data/blog/types';
import ContactCalculator from './ContactCalculator';
import PersonalAssistant from './PersonalAssistant';

interface BlogPostSidebarProps {
  relatedPosts: BlogPost[];
}

const BlogPostSidebar = ({ relatedPosts }: BlogPostSidebarProps) => {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-28 space-y-8">
        {/* Contact Calculator - Value-first lead magnet */}
        <ContactCalculator />
        
        {/* Personal Assistant - Progress-based engagement */}
        <PersonalAssistant />
        
        {/* Enhanced contact section with more compelling copy */}
        <div className="bg-gradient-to-br from-poda-blue to-poda-blue-dark rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Bezplatné poradenstvo</h3>
          <p className="text-blue-100 mb-4 text-sm leading-relaxed">
            Milan Terč má 15+ rokov skúseností s internetovým pripojením. 
            Nezáväzne vám poradí najlepšie riešenie pre váš dom či firmu.
          </p>
          <div className="space-y-3">
            <Link
              to="/kontakt"
              className="block w-full bg-white text-poda-blue hover:bg-blue-50 px-4 py-3 rounded-lg font-medium transition-colors text-center text-sm"
            >
              Získať poradenstvo zadarmo
            </Link>
            <a 
              href="tel:+420774100200"
              className="block w-full text-center text-blue-100 hover:text-white transition-colors text-sm"
            >
              📞 +420 774 100 200
            </a>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-300 text-xs text-blue-100">
            ✓ Bez skrytých poplatkov<br/>
            ✓ Inštalácia zadarmo<br/>
            ✓ 24/7 technická podpora
          </div>
        </div>
        
        {/* Related posts - keep existing functionality */}
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
