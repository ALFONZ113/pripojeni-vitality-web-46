
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  alt?: string;
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'Všechny' },
  { id: 'Technologie', name: 'Technologie' },
  { id: 'Tipy a rady', name: 'Tipy a rady' },
  { id: 'Služby', name: 'Služby' }
];
