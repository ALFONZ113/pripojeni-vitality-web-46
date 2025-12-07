import { categories } from '../../data/blog';

interface BlogCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const BlogCategories = ({ selectedCategory, onCategoryChange }: BlogCategoriesProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? 'bg-primary text-primary-foreground glow-gold'
              : 'bg-secondary text-foreground hover:bg-muted border border-border'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default BlogCategories;
