
import { adminDb } from './firebase-admin';
import postsData from '@/data/posts.json';

export type Post = {
  id: string;
  type: 'blog' | 'article' | 'meme';
  title: string;
  content: string;
  author?: string;
  date?: string;
  createdAt?: any;
};

const postsCollectionName = 'posts';

/**
 * Fetches posts exclusively from the server-side using Firebase Admin.
 * If the database is not configured or the fetch fails, it returns an empty array.
 */
export async function getPosts(): Promise<Post[]> {
  // If adminDb is not initialized (meaning admin SDK is not configured), return empty.
  if (!adminDb) {
    return [];
  }

  try {
    const postsCollection = adminDb.collection(postsCollectionName);
    const postsSnapshot = await postsCollection.orderBy('createdAt', 'desc').get();
    
    const postsList = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    return postsList;

  } catch (error) {
    console.error("Could not fetch posts from Firestore via Admin SDK. Error:", error);
    // Return empty array on error to prevent crashes. The admin page will show it's empty.
    return [];
  }
}
