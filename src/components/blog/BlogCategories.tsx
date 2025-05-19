
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
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-poda-blue text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
