
import { Calendar, User, Clock, FileText, MapPin } from 'lucide-react';
import { calculateReadingTime, countWords } from '../../utils/slugGenerator';
import type { BlogPost } from '../../data/blog/types';

interface BlogPostMetaProps {
  post: BlogPost;
  showReadingTime?: boolean;
  showWordCount?: boolean;
  showLocation?: boolean;
}

const BlogPostMeta = ({ 
  post, 
  showReadingTime = true, 
  showWordCount = true,
  showLocation = true 
}: BlogPostMetaProps) => {
  const readingTime = calculateReadingTime(post.content);
  const wordCount = countWords(post.content);
  const formattedDate = post.date.split('. ').reverse().join('-');
  
  // Extract location from title or content if available
  const extractLocation = (text: string): string | null => {
    const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Frýdek-Místek', 'Havířov', 'Poruba', 'Orlová', 'Praha', 'Brno'];
    const found = locations.find(loc => text.includes(loc));
    return found || null;
  };
  
  const location = extractLocation(`${post.title} ${post.content}`);
  
  return (
    <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500 mb-6">
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        <time dateTime={formattedDate} itemProp="datePublished">
          {post.date}
        </time>
      </div>
      
      <div className="flex items-center">
        <User className="h-4 w-4 mr-1" />
        <span itemProp="author" itemScope itemType="http://schema.org/Person">
          <span itemProp="name">{post.author}</span>
        </span>
      </div>
      
      {showReadingTime && (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{readingTime} min čítania</span>
        </div>
      )}
      
      {showWordCount && (
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-1" />
          <span>{wordCount.toLocaleString()} slov</span>
        </div>
      )}
      
      {showLocation && location && (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
      )}
      
      <span className="bg-blue-100 text-poda-blue px-2 py-1 rounded text-xs">
        {post.category}
      </span>
    </div>
  );
};

export default BlogPostMeta;
