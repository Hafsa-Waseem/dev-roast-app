
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import resourcesData from '@/data/resources.json';

export type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
  createdAt?: any;
};

const resourcesCollectionName = 'resources';

export async function getResources(): Promise<Resource[]> {
  // If Firebase is configured, try fetching from it first.
  if (db && isFirebaseConfigured) {
    try {
      const resourcesCollection = collection(db, resourcesCollectionName);
      const q = query(resourcesCollection, orderBy('createdAt', 'desc'));
      const resourcesSnapshot = await getDocs(q);
      
      // If Firestore has data, return it.
      if (!resourcesSnapshot.empty) {
        const resourcesList = resourcesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Resource[];
        return resourcesList;
      }
    } catch (error) {
       // If there's an error fetching (e.g., wrong keys, permissions), log it and fall through.
      console.error("Could not fetch resources from Firestore, falling back to local data. Error:", error);
    }
  }

  // Fallback: If Firebase is not configured, is empty, or fails to fetch, return the local data.
  return resourcesData as Resource[];
}


export async function addResource(resource: Omit<Resource, 'id' | 'createdAt'>): Promise<Resource> {
  if (!db || !isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Cannot add resource.');
  }
  try {
    const resourcesCollection = collection(db, resourcesCollectionName);
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
  if (!db || !isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Cannot update resource.');
  }
  try {
    const resourceDoc = doc(db, resourcesCollectionName, id);
    await updateDoc(resourceDoc, updatedData);
    return { id, ...updatedData } as Resource;
  } catch (error) {
    console.error("Error updating resource in Firestore:", error);
    return null;
  }
}

export async function deleteResource(id: string): Promise<boolean> {
  if (!db || !isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Cannot delete resource.');
  }
  try {
    const resourceDoc = doc(db, resourcesCollectionName, id);
    await deleteDoc(resourceDoc);
    return true;
  } catch (error) {
    console.error("Error deleting resource from Firestore:", error);
    return false;
  }
}

    
