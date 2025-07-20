
import postsData from '@/data/posts.json';

export type Post = {
  id: string;
  type: 'blog' | 'article' | 'meme';
  title?: string; // Title is optional, as memes don't have it
  content: string;
  author?: string;
  date?: string;
  createdAt?: any;
};

/**
 * Fetches posts. It reads from the local posts.json data.
 */
export async function getPosts(): Promise<Post[]> {
  // The function will now always return the local data.
  // The structure is kept for potential future database integration.
  return postsData as Post[];
}
