import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Badge } from '../ui/badge';
import { blogPosts } from '@/data/blog';
import { getBlogPostUrl } from '@/utils/blogRouting';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';

const FeaturedBlogPosts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Select first 3 posts
  const featuredPosts = blogPosts.slice(0, 3);

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="badge-gold mb-4 inline-block">
            <BookOpen className="w-4 h-4" />
            Blog
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Nejnovější <span className="text-gradient-gold">články</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body">
            Průvodci, novinky a odborné rady pro výběr nejlepšího internetu
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post, index) => {
            const readingTime = estimateReadingTime(post.content);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
              >
                <Link
                  to={getBlogPostUrl(post)}
                  className="block h-full group"
                >
                  <div className="glass-card rounded-2xl overflow-hidden h-full hover:border-primary/30 transition-all duration-300">
                    {/* Image */}
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.alt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/90 text-primary-foreground border-0 font-body text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground font-body text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readingTime} min
                          </span>
                        </div>
                        
                        <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all font-body">
                          Číst
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <Button variant="noir" size="xl" asChild>
            <Link to="/blog">
              Všechny články
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
