import { Search } from 'lucide-react';

interface BlogSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const BlogSearch = ({ searchTerm, onSearch }: BlogSearchProps) => {
  return (
    <div className="relative max-w-xl mx-auto reveal-animation delay-300">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Hledat články..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-12 pr-4 py-3.5 w-full bg-secondary/50 border border-border rounded-xl text-foreground text-base placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
      />
    </div>
  );
};

export default BlogSearch;
