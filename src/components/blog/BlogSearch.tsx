
import { Search } from 'lucide-react';

interface BlogSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const BlogSearch = ({ searchTerm, onSearch }: BlogSearchProps) => {
  return (
    <div className="relative max-w-xl mx-auto reveal-animation delay-300">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Hledat články..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
      />
    </div>
  );
};

export default BlogSearch;
