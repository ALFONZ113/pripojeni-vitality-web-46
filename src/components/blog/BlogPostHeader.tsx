import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import type { BlogPost } from '../../data/blog/types';
import BlogPostSocialActions from './BlogPostSocialActions';

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  const formattedDate = post.date.split('. ').reverse().join('-');
  const currentUrl = window.location.href;
  
  return (
    <section className="section-padding pt-10 pb-12 bg-background">
      <div className="container-custom">
        <nav className="flex mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-primary transition-colors">
                <span itemProp="name">Úvod</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="mx-1 text-border">/</span>
              <Link to="/blog" itemProp="item" className="hover:text-primary transition-colors">
                <span itemProp="name">Blog</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="mx-1 text-border">/</span>
              <span className="text-foreground truncate max-w-[200px]" itemProp="name">{post.title}</span>
              <meta itemProp="position" content="3" />
              <link itemProp="item" href={currentUrl} />
            </li>
          </ol>
        </nav>

        <Link 
          to="/blog" 
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Zpět na všechny články
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4 flex-wrap">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium border border-primary/20">
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-primary/80">
                {post.category}
              </Link>
            </span>
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={formattedDate} itemProp="datePublished">{post.date}</time>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <User className="h-4 w-4 mr-1" />
              <span itemProp="author" itemScope itemType="http://schema.org/Person">
                <span itemProp="name">{post.author}</span>
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight" itemProp="headline">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed" itemProp="description">
            {post.excerpt}
          </p>
          
          {/* Social sharing buttons */}
          <div className="mt-6 pt-6 border-t border-border">
            <BlogPostSocialActions 
              postTitle={post.title}
              postExcerpt={post.excerpt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostHeader;
