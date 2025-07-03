
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export type Post = {
  id: string;
  type: 'blog' | 'article' | 'meme';
  title: string;
  content: string;
  author?: string;
  date?: string;
  createdAt?: any;
};

const postsCollection = collection(db, 'posts');

export async function getPosts(): Promise<Post[]> {
  try {
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    const postsSnapshot = await getDocs(q);
    const postsList = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
    return postsList;
  } catch (error) {
    console.error("Error fetching posts from Firestore:", error);
    return [];
  }
}

export async function addPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
  try {
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
  try {
    const postDoc = doc(db, 'posts', id);
    await updateDoc(postDoc, updatedData);
    return { id, ...updatedData } as Post;
  } catch (error) {
    console.error("Error updating post in Firestore:", error);
    return null;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
    return true;
  } catch (error) {
    console.error("Error deleting post from Firestore:", error);
    return false;
  }
}
