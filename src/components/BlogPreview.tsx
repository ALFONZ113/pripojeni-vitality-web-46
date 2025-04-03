
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 7,
    title: 'Rozšíření optické sítě PODA v brněnském Komárově',
    excerpt: 'Společnost PODA nově připojila několik ulic v městské části Komárov k vysokorychlostní optické síti s rychlostí až 1 Gb/s.',
    date: '1. 4. 2025',
    author: 'Milan Terč',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1557191358-57dfbc468c2e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 1,
    title: 'Výhody technologie GPON pro domácí připojení',
    excerpt: 'Objevte, proč je optické připojení GPON revoluční technologií pro stabilní a rychlý internet...',
    date: '15. 6. 2023',
    author: 'Milan Terč',
    category: 'Technologie',
    image: 'https://images.unsplash.com/photo-1539431001722-33ec2dbf8df1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Jak vybrat nejlepší televizní balíček pro vaši rodinu',
    excerpt: 'Průvodce výběrem televzního balíčku, který uspokojí potřeby všech členů vaší domácnosti...',
    date: '2. 5. 2023',
    author: 'Tým PODA',
    category: 'Tipy a rady',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop'
  }
];

const BlogPreview = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
            Blog a novinky
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
            Zajímavé články a informace
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Přečtěte si nejnovější články o technologiích, tipech pro lepší využití vašeho internetu 
            a televize, a mnoho dalšího.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                  <span className="bg-blue-50 text-poda-blue px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-poda-blue mb-3 group-hover:text-poda-orange transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="text-poda-blue hover:text-poda-orange font-medium flex items-center transition-colors"
                  >
                    Číst více <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            to="/blog" 
            className="btn-outline flex items-center"
          >
            Zobrazit všechny články <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
