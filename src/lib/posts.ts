
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
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

export async function getPosts(): Promise<Post[]> {
  // If Firebase is configured, try to fetch from it.
  if (db && isFirebaseConfigured) {
    try {
      const postsCollection = collection(db, postsCollectionName);
      const q = query(postsCollection, orderBy('createdAt', 'desc'));
      const postsSnapshot = await getDocs(q);
      
      // If Firestore has data, return it.
      if (!postsSnapshot.empty) {
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        return postsList;
      }
    } catch (error) {
      // Silently catch the error. This prevents the app from showing a scary
      // "PERMISSION_DENIED" error when Firebase credentials are not yet set.
      // The function will then fall through to return local data.
    }
  }
  
  // If Firebase is not configured, or if it's empty/errored, return local fallback data.
  return postsData as Post[];
}

export async function addPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
  if (!db || !isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Cannot add post.');
  }
  try {
    const postsCollection = collection(db, postsCollectionName);
    const docRef = await addDoc(postsCollection, {
      ...post,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...post } as Post;
  } catch (error) {
    console.error("Error adding post to Firestore:", error);
    throw new Error('Failed to add post to the database.');
  }
}

export async function updatePost(id: string, updatedData: Partial<Omit<Post, 'id'>>): Promise<Post | null> {
  if (!db || !isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Cannot update post.');
  }
  try {
    const postDoc = doc(db, postsCollectionName, id);
    await updateDoc(postDoc, updatedData);
    return { id, ...updatedData } as Post;
  } catch (error) {
    console.error("Error updating post in Firestore:", error);
    return null;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  if (!db || !isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Cannot delete post.');
  }
  try {
    const postDoc = doc(db, postsCollectionName, id);
    await deleteDoc(postDoc);
    return true;
  } catch (error) {
    console.error("Error deleting post from Firestore:", error);
    return false;
  }
}

    