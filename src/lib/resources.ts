
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
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

/**
 * Fetches resources.
 * If Firebase is configured, it fetches from Firestore.
 * If Firebase is not configured, or if the fetch fails, it falls back to local JSON data.
 */
export async function getResources(): Promise<Resource[]> {
   // If client-side Firebase is not configured, return local data.
  if (!db || !isFirebaseConfigured) {
    console.warn("Firebase client not configured. Falling back to local resources data.");
    return resourcesData as Resource[];
  }
  
  try {
    // Always fetch from Firestore if configured. It's the single source of truth.
    const resourcesCollection = collection(db, resourcesCollectionName);
    const q = query(resourcesCollection, orderBy('createdAt', 'desc'));
    const resourcesSnapshot = await getDocs(q);

    const resourcesList = resourcesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Resource[];
    
    return resourcesList;

  } catch (error) {
     // If there's an error fetching (e.g., permissions), log it and fall back to local data.
    console.error("Could not fetch resources from Firestore, falling back to local data. Error:", error);
    return resourcesData as Resource[];
  }
}
