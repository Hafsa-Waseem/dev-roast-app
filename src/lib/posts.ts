
import { adminDb } from './firebase-admin';
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

const postsCollectionName = 'posts';

/**
 * Fetches posts. It first tries to fetch from Firebase Admin.
 * If the database is not configured or the fetch fails, it falls back
 * to returning the local posts.json data.
 */
export async function getPosts(): Promise<Post[]> {
  // If adminDb is not initialized, fall back to local data immediately.
  if (!adminDb) {
    // Make sure to cast to Post[] to match the return type
    return postsData as Post[];
  }

  try {
    const postsCollection = adminDb.collection(postsCollectionName);
    const postsSnapshot = await postsCollection.orderBy('createdAt', 'desc').get();
    
    // If there are no posts in Firestore, also fall back to local data.
    if (postsSnapshot.empty) {
        return postsData as Post[];
    }
    
    const postsList = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    return postsList;

  } catch (error) {
    console.error("Could not fetch posts from Firestore. Falling back to local data. Error:", error);
    // On any other error, also fall back to local data.
    return postsData as Post[];
  }
}
