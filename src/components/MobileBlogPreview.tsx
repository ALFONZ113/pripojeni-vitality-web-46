
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { responsiveImageProps } from '../utils/imageUtils';

const MobileBlogPreview = () => {
  // Get only 2 most recent blog posts for mobile
  const recentPosts = [...blogPosts]
    .sort((a, b) => {
      const dateA = a.date.split('. ').reverse().join('-');
      const dateB = b.date.split('. ').reverse().join('-');
      return dateB.localeCompare(dateA);
    })
    .slice(0, 2);

  return (
    <section className="py-10 px-4 bg-white">
      <div className="container-custom">
        <div className="text-center mx-auto mb-8">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-2">
            Blog a novinky
          </span>
          <h2 className="text-2xl font-bold text-poda-blue mb-3">
            Zajímavé články
          </h2>
          <p className="text-gray-600 text-sm">
            Přečtěte si nejnovější články o technologiích a tipech pro lepší využití vašeho internetu.
          </p>
        </div>

        <div className="space-y-6">
          {recentPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  {...responsiveImageProps(post.image, post.alt || post.title, 400, 200)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                  <span className="bg-blue-50 text-poda-blue px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <time className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </time>
                </div>
                <h3 className="text-lg font-semibold text-poda-blue mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="text-poda-blue hover:text-poda-orange font-medium flex items-center text-sm"
                >
                  Číst více <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link 
            to="/blog" 
            className="btn-outline text-sm flex items-center py-2 px-4"
          >
            Všechny články <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MobileBlogPreview;
