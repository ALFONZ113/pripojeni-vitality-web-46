
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import type { BlogPost } from '../../data/blogPosts';

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  // Format date for datetime attribute
  const formattedDate = post.date.split('. ').reverse().join('-');
  
  return (
    <section className="section-padding pt-10 pb-12 bg-gradient-to-b from-white to-blue-50">
      <div className="container-custom">
        <nav className="flex mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-poda-blue">Úvod</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">/</span>
              <Link to="/blog" className="hover:text-poda-blue">Blog</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">/</span>
              <span className="text-gray-700 truncate max-w-[200px]">{post.title}</span>
            </li>
          </ol>
        </nav>

        <Link 
          to="/blog" 
          className="inline-flex items-center text-poda-blue hover:text-poda-orange transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zpět na všechny články
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4 flex-wrap">
            <span className="bg-blue-100 text-poda-blue px-3 py-1 rounded-full text-sm font-medium">
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-poda-orange">
                {post.category}
              </Link>
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={formattedDate} itemProp="datePublished">{post.date}</time>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <User className="h-4 w-4 mr-1" />
              <span itemProp="author" itemScope itemType="http://schema.org/Person">
                <span itemProp="name">{post.author}</span>
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-poda-blue mb-6 leading-tight" itemProp="headline">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed" itemProp="description">
            {post.excerpt}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogPostHeader;
