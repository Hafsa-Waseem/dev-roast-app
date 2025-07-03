
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
  createdAt?: any;
};

const resourcesCollection = collection(db, 'resources');

export async function getResources(): Promise<Resource[]> {
  try {
    const q = query(resourcesCollection, orderBy('createdAt', 'desc'));
    const resourcesSnapshot = await getDocs(q);
    const resourcesList = resourcesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Resource[];
    return resourcesList;
  } catch (error) {
    console.error("Error fetching resources from Firestore:", error);
    return [];
  }
}

export async function addResource(resource: Omit<Resource, 'id' | 'createdAt'>): Promise<Resource> {
  try {
    const docRef = await addDoc(resourcesCollection, {
      ...resource,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...resource } as Resource;
  } catch (error) {
    console.error("Error adding resource to Firestore:", error);
    throw new Error('Failed to add resource to the database.');
  }
}

export async function updateResource(id: string, updatedData: Partial<Omit<Resource, 'id' | 'href'>>): Promise<Resource | null> {
  try {
    const resourceDoc = doc(db, 'resources', id);
    await updateDoc(resourceDoc, updatedData);
    return { id, ...updatedData } as Resource;
  } catch (error) {
    console.error("Error updating resource in Firestore:", error);
    return null;
  }
}

export async function deleteResource(id: string): Promise<boolean> {
  try {
    const resourceDoc = doc(db, 'resources', id);
    await deleteDoc(resourceDoc);
    return true;
  } catch (error) {
    console.error("Error deleting resource from Firestore:", error);
    return false;
  }
}
