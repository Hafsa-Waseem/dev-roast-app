
import fs from 'fs/promises';
import path from 'path';

export type Post = {
  id: string;
  type: 'blog' | 'article' | 'meme';
  title: string; // Used for blog/article, can be empty for meme
  content: string; // excerpt for blog/article, caption for meme
  author?: string; // Optional, for blogs
  date?: string; // Optional, for blogs
};

const dataDir = path.join(process.cwd(), 'src/data');
const postsFilePath = path.join(dataDir, 'posts.json');

async function ensureDataFileExists() {
    try {
        await fs.access(postsFilePath);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            await fs.mkdir(dataDir, { recursive: true });
            await fs.writeFile(postsFilePath, '[]', 'utf-8');
        } else {
            throw error;
        }
    }
}

async function readPosts(): Promise<Post[]> {
  await ensureDataFileExists();
  try {
    const data = await fs.readFile(postsFilePath, 'utf-8');
    if (data.trim() === '') {
        return [];
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing posts file:", error);
    return [];
  }
}

async function writePosts(posts: Post[]): Promise<void> {
  await ensureDataFileExists();
  await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
}

export async function getPosts(): Promise<Post[]> {
  try {
    return await readPosts();
  } catch (error) {
    console.error("Failed to get posts due to an unhandled error:", error);
    return [];
  }
}

export async function addPost(post: Omit<Post, 'id'>): Promise<Post> {
  const posts = await readPosts();
  const newPost: Post = {
    id: Date.now().toString(),
    ...post,
  };
  posts.unshift(newPost); // Add to the beginning
  await writePosts(posts);
  return newPost;
}

export async function updatePost(id: string, updatedData: Partial<Omit<Post, 'id'>>): Promise<Post | null> {
  const posts = await readPosts();
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return null;
  }
  posts[postIndex] = { ...posts[postIndex], ...updatedData };
  await writePosts(posts);
  return posts[postIndex];
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await readPosts();
  const initialLength = posts.length;
  const updatedPosts = posts.filter(p => p.id !== id);
  
  if (updatedPosts.length === initialLength) {
    return false; // Not found
  }

  await writePosts(updatedPosts);
  return true;
}
