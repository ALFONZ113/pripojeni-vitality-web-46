
interface BlogPostMetadataProps {
  title: string;
  excerpt?: string;
  author: string;
  date: string;
  image?: string;
}

const BlogPostMetadata = ({ title, excerpt, author, date, image }: BlogPostMetadataProps) => {
  const formatDateForSchema = (dateStr: string) => {
    return dateStr.split('. ').reverse().join('-');
  };

  const formattedDate = formatDateForSchema(date);
  const baseUrl = window.location.origin;

  return (
    <>
      {/* Schema.org metadata for rich snippets */}
      <meta itemProp="datePublished" content={formattedDate} />
      <meta itemProp="dateModified" content={formattedDate} />
      <meta itemProp="author" content={author} />
      <meta itemProp="headline" content={title} />
      <meta itemProp="description" content={excerpt || ''} />
      {image && <meta itemProp="image" content={image.startsWith('http') ? image : `${baseUrl}${image}`} />}
      <link itemProp="mainEntityOfPage" href={window.location.href} />
      <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
        <meta itemProp="name" content="Popri.cz" />
        <meta itemProp="url" content="https://www.popri.cz" />
        <div itemProp="logo" itemScope itemType="http://schema.org/ImageObject">
          <meta itemProp="url" content={`${baseUrl}/poda-logo.svg`} />
          <meta itemProp="width" content="200" />
          <meta itemProp="height" content="70" />
        </div>
        <meta itemProp="sameAs" content="https://www.facebook.com/podacz/" />
        <meta itemProp="sameAs" content="https://www.instagram.com/poda.cz/" />
      </div>
    </>
  );
};

export default BlogPostMetadata;
