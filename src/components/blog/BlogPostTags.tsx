
import { Link } from 'react-router-dom';

interface BlogPostTagsProps {
  category: string;
  tags?: string[];
  date: string;
}

const BlogPostTags = ({ category, tags, date }: BlogPostTagsProps) => {
  const formatDateForSchema = (dateStr: string) => {
    return dateStr.split('. ').reverse().join('-');
  };

  const formattedDate = formatDateForSchema(date);

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-full">
          <h3 className="text-gray-700 font-medium mb-2">Štítky:</h3>
          <div className="flex flex-wrap gap-2">
            <Link to={`/blog?category=${encodeURIComponent(category)}`} className="bg-poda-blue text-white px-3 py-1 rounded-full text-sm hover:bg-poda-blue-dark transition-colors">
              {category}
            </Link>
            {tags?.map((tag, index) => (
              <Link 
                key={index} 
                to={`/blog?tag=${encodeURIComponent(tag)}`} 
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-poda-blue hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-gray-600 shrink-0">
          Publikováno: <time dateTime={formattedDate}>{date}</time>
        </div>
      </div>
    </div>
  );
};

export default BlogPostTags;
