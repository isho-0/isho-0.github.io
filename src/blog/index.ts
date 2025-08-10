import { BlogPost, BlogPostMeta, BlogCategory, BlogChapter } from './types';
import { marked } from 'marked';

// Vite의 import.meta.glob으로 모든 md 파일을 raw로 가져옴
const postFiles = import.meta.glob('./categories/**/*.md', { as: 'raw' });

// 마크다운 파일의 메타데이터 파싱
const parseMetadata = (content: string): Omit<BlogPostMeta, 'id'> => {
  const metadata = content.split('---')[1];
  const lines = metadata.split('\n');
  const metadataObj: any = {};

  lines.forEach((line) => {
    const [key, ...value] = line.split(':');
    if (key && value.length) {
      const trimmedKey = key.trim();
      const trimmedValue = value.join(':').trim();
      if (trimmedKey === 'tags') {
        metadataObj[trimmedKey] = JSON.parse(trimmedValue);
      } else if (trimmedKey === 'readingTime' || trimmedKey === 'order') {
        metadataObj[trimmedKey] = parseInt(trimmedValue);
      } else {
        metadataObj[trimmedKey] = trimmedValue.replace(/^"|"$/g, '');
      }
    }
  });
  return metadataObj;
};

// 모든 블로그 게시글 가져오기
export const getAllPosts = async (): Promise<BlogPostMeta[]> => {
  const posts: BlogPostMeta[] = [];
  for (const path in postFiles) {
    const content = await postFiles[path]() as string;
    const metadata = parseMetadata(content);
    posts.push({
      ...metadata,
      id: path.replace('./categories/', '').replace('.md', ''),
    });
  }
  return posts;
};

// 카테고리별 게시글 가져오기
export const getPostsByCategory = async (category: string): Promise<BlogPostMeta[]> => {
  const allPosts = await getAllPosts();
  return allPosts
    .filter(post => post.category === category)
    .sort((a, b) => a.order - b.order);
};

// 챕터별 게시글 가져오기
export const getPostsByChapter = async (category: string, chapter: string): Promise<BlogPostMeta[]> => {
  const allPosts = await getAllPosts();
  return allPosts
    .filter(post => post.category === category && post.chapter === chapter)
    .sort((a, b) => a.order - b.order);
};

// 특정 게시글 가져오기
export const getBlogPost = async (id: string): Promise<BlogPost> => {
  const filePath = `./categories/${id}.md`;
  const fileLoader = postFiles[filePath];
  if (!fileLoader) throw new Error('해당 게시글을 찾을 수 없습니다.');
  const content = await fileLoader() as string;
  const metadata = parseMetadata(content);
  const htmlContent = marked((content.split('---')[2] || '').trim());

  // 이전/다음 글 찾기
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.id === id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1].id : undefined;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1].id : undefined;

  return {
    ...metadata,
    id,
    content: htmlContent,
    prevPost,
    nextPost
  };
};

// 카테고리 목록 가져오기
export const getCategories = async (): Promise<BlogCategory[]> => {
  const allPosts = await getAllPosts();
  const categories = new Map<string, BlogCategory>();

  allPosts.forEach(post => {
    if (!categories.has(post.category)) {
      categories.set(post.category, {
        id: post.category,
        name: post.category.charAt(0).toUpperCase() + post.category.slice(1),
        description: `${post.category} 관련 글들`,
        image: `/blog/assets/${post.category}/category.jpg`,
        posts: []
      });
    }
    categories.get(post.category)?.posts.push(post);
  });

  return Array.from(categories.values());
}; 