
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  imageUrl?: string;
  alt?: string;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
}

export const categories: BlogCategory[] = [
  { id: 'all', name: 'Všechny články' },
  { id: 'Technologie', name: 'Technologie' },
  { id: 'Tipy a rady', name: 'Tipy a rady' },
  { id: 'Služby', name: 'Služby' }
];
