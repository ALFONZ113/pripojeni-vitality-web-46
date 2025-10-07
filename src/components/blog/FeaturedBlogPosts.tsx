import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { blogPosts } from '@/data/blog';
import { getBlogPostUrl } from '@/utils/blogRouting';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const FeaturedBlogPosts = () => {
  // Vybrat 3 najnovšie články (prvé 3 v poli)
  const featuredPosts = blogPosts.slice(0, 3);

  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            📚 Blog
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Najnovšie články a tipy
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Průvodci, novinky a odborné rady pro výběr nejlepšího internetu v Ostravě a okolí
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredPosts.map((post) => {
            const readingTime = estimateReadingTime(post.content);
            return (
              <Link
                key={post.id}
                to={getBlogPostUrl(post)}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.image}
                      alt={post.alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {readingTime} min
                      </span>
                    </div>
                    
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="line-clamp-3 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      
                      <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                        Číst více
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg group"
          >
            Všechny články na blogu
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
