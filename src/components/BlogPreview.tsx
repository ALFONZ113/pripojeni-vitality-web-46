
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { responsiveImageProps } from '../utils/imageUtils';
import { getBlogPostUrl } from '../utils/blogRouting';

const BlogPreview = () => {
  // Get the 4 most recent blog posts
  const recentPosts = [...blogPosts]
    .sort((a, b) => {
      // Sort by date - assuming dates are in format "DD. MM. YYYY"
      const dateA = a.date.split('. ').reverse().join('-');
      const dateB = b.date.split('. ').reverse().join('-');
      return dateB.localeCompare(dateA);
    })
    .slice(0, 4);

  return (
    <section className="section-padding bg-white" aria-labelledby="blog-heading">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
            Blog a novinky
          </span>
          <h2 id="blog-heading" className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
            Zajímavé články a informace
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Přečtěte si nejnovější články o technologiích, tipech pro lepší využití vašeho internetu 
            a televize, a mnoho dalšího.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  {...responsiveImageProps(post.image, post.alt || post.title, 640, 360)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                  <span className="bg-blue-50 text-poda-blue px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <time className="flex items-center" dateTime={post.date.replace(/\. /g, '-').replace(/\./g, '')}>
                    <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                    {post.date}
                  </time>
                </div>
                <h3 className="text-xl font-semibold text-poda-blue mb-3 group-hover:text-poda-orange transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" aria-hidden="true" />
                    <span itemProp="author">{post.author}</span>
                  </div>
                  <Link 
                    to={getBlogPostUrl(post)} 
                    className="text-poda-blue hover:text-poda-orange font-medium flex items-center transition-colors"
                    aria-label={`Číst více o článku: ${post.title}`}
                  >
                    Číst více <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            to="/blog" 
            className="btn-outline flex items-center"
            aria-label="Zobrazit všechny články na blogu"
          >
            Zobrazit všechny články <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
