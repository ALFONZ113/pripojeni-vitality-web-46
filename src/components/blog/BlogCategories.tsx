
import { categories } from '../../data/blog';

interface BlogCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const BlogCategories = ({ selectedCategory, onCategoryChange }: BlogCategoriesProps) => {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`${
              selectedCategory === category.id
                ? 'bg-white text-poda-blue shadow-sm'
                : 'text-gray-600 hover:text-poda-blue'
            } px-4 py-2 rounded-lg font-medium transition-colors`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
