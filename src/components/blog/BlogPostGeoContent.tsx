
import BlogCTA from './BlogCTA';

interface BlogPostGeoContentProps {
  location: string;
}

const BlogPostGeoContent = ({ location }: BlogPostGeoContentProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg my-8 border-l-4 border-poda-blue">
      <h4 className="text-lg font-semibold text-poda-blue mb-2">
        Služby PODA v {location}
      </h4>
      <p className="text-gray-700 mb-4">
        Hľadáte spoľahlivé internetové pripojenie v {location}? PODA poskytuje rýchly optický internet 
        s garantovanými rýchlosťami a bezplatnou inštaláciou. 
        <BlogCTA variant="inline" compact location={location} />
      </p>
    </div>
  );
};

export default BlogPostGeoContent;
