
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Define the blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  alt: string;
  customUrl?: string;
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: 8,
    title: '60 GHz Internet PODA: Revolučná Technológia pre Vysokorýchlostné Pripojenie',
    excerpt: 'Spoločnosť PODA prináša revolučnú technológiu internetového pripojenia využívajúcu frekvenčné pásmo 60 GHz, ktorá umožňuje rýchlosti až 600 Mb/s.',
    date: '10. 4. 2025',
    author: 'Team PODA',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    alt: 'Vysokorýchlostná bezdrôtová technológia',
    customUrl: '/blog/60ghz-internet'
  },
  {
    id: 7,
    title: 'Rozšíření optické sítě PODA v brněnském Komárově',
    excerpt: 'Společnost PODA nově připojila několik ulic v městské části Komárov k vysokorychlostní optické síti s rychlostí až 1 Gb/s.',
    date: '1. 4. 2025',
    author: 'Milan Terč',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1557191358-57dfbc468c2e?q=80&w=2070&auto=format&fit=crop',
    alt: 'Technik instalující optické vlákno'
  },
  {
    id: 1,
    title: 'Výhody technologie GPON pro domácí připojení',
    excerpt: 'Objevte, proč je optické připojení GPON revoluční technologií pro stabilní a rychlý internet...',
    date: '15. 6. 2023',
    author: 'Milan Terč',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1539431001722-33ec2dbf8df1?q=80&w=2070&auto=format&fit=crop',
    alt: 'Optické kabely vedoucí do routeru'
  }
];

const BlogPreview = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    // This simulates a dynamic load of blog posts
    // Adding a slight delay to ensure rendering happens after component mounts
    const timer = setTimeout(() => {
      setBlogPosts(defaultBlogPosts);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

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
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 group"
                data-post-id={post.id}
                data-version="v2025041504"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`${post.image}${post.image.includes('?') ? '&' : '?'}v=2025041504`}
                    alt={post.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width="640"
                    height="360"
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
                      to={post.customUrl || `/blog/${post.id}`} 
                      className="text-poda-blue hover:text-poda-orange font-medium flex items-center transition-colors"
                      aria-label={`Číst více o článku: ${post.title}`}
                    >
                      Číst více <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            // Show loading state if posts aren't loaded yet
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-gray-200 h-6 w-24 rounded"></div>
                    <div className="bg-gray-200 h-6 w-32 rounded"></div>
                  </div>
                  <div className="bg-gray-200 h-8 w-full rounded mb-3"></div>
                  <div className="bg-gray-200 h-20 w-full rounded mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-200 h-6 w-32 rounded"></div>
                    <div className="bg-gray-200 h-6 w-24 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          )}
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
