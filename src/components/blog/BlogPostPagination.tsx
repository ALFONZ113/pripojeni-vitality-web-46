
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../data/blog/types';
import { getPageTrackingParams } from '../../utils/blogMetadata';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface BlogPostPaginationProps {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

const BlogPostPagination = ({ prevPost, nextPost }: BlogPostPaginationProps) => {
  return (
    <section className="section-padding pt-4 pb-12 bg-blue-50">
      <div className="container-custom">
        <Pagination>
          <PaginationContent>
            {prevPost && (
              <PaginationItem>
                <PaginationPrevious 
                  href={`/blog/${prevPost.id}${getPageTrackingParams(prevPost.id, prevPost.category)}`}
                  aria-label={`Předchozí článek: ${prevPost.title}`}
                />
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationLink href="/blog" aria-label="Všechny články">
                Všechny články
              </PaginationLink>
            </PaginationItem>
            
            {nextPost && (
              <PaginationItem>
                <PaginationNext 
                  href={`/blog/${nextPost.id}${getPageTrackingParams(nextPost.id, nextPost.category)}`}
                  aria-label={`Další článek: ${nextPost.title}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default BlogPostPagination;
