
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
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
 * Fetches posts.
 * If Firebase is configured, it fetches from Firestore.
 * If Firebase is not configured, or if the fetch fails, it falls back to local JSON data.
 */
export async function getPosts(): Promise<Post[]> {
  // If client-side Firebase is not configured, return local data.
  if (!db || !isFirebaseConfigured) {
    console.warn("Firebase client not configured. Falling back to local posts data.");
    return postsData as Post[];
  }

  try {
    // Always fetch from Firestore if configured. It's the single source of truth.
    const postsCollection = collection(db, postsCollectionName);
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    const postsSnapshot = await getDocs(q);
    
    const postsList = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    return postsList;

  } catch (error) {
    // If there's an error fetching (e.g., permissions), log it and fall back to local data.
    console.error("Could not fetch posts from Firestore, falling back to local data. Error:", error);
    return postsData as Post[];
  }
}
