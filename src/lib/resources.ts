
import { adminDb } from './firebase-admin';
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
 * Fetches resources exclusively from the server-side using Firebase Admin.
 * If the database is not configured or the fetch fails, it returns an empty array.
 */
export async function getResources(): Promise<Resource[]> {
  // If adminDb is not initialized (meaning admin SDK is not configured), return empty.
  if (!adminDb) {
    return [];
  }
  
  try {
    const resourcesCollection = adminDb.collection(resourcesCollectionName);
    const resourcesSnapshot = await resourcesCollection.orderBy('createdAt', 'desc').get();

    const resourcesList = resourcesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Resource[];
    
    return resourcesList;

  } catch (error) {
     console.error("Could not fetch resources from Firestore via Admin SDK. Error:", error);
     // Return empty array on error. The admin page will handle showing this state.
    return [];
  }
}
