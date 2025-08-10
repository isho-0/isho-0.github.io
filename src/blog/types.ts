export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  author: string;
  readingTime: number;
  category: string;
  chapter?: string;
  order: number;
  prevPost?: string;
  nextPost?: string;
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  posts: BlogPostMeta[];
}

export interface BlogChapter {
  id: string;
  title: string;
  description: string;
  order: number;
  posts: BlogPostMeta[];
} 