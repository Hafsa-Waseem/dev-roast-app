
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
 * Fetches resources. It first tries to fetch from Firebase Admin.
 * If the database is not configured or the fetch fails, it falls back
 * to returning the local resources.json data.
 */
export async function getResources(): Promise<Resource[]> {
  // If adminDb is not initialized, fall back to local data immediately.
  if (!adminDb) {
    return resourcesData as Resource[];
  }
  
  try {
    const resourcesCollection = adminDb.collection(resourcesCollectionName);
    const resourcesSnapshot = await resourcesCollection.orderBy('createdAt', 'desc').get();
    
    const firestoreResources = resourcesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Resource[];

    // Combine firestore resources with local resources, giving priority to firestore
    const allResources = [...firestoreResources, ...resourcesData];
    
    // Remove duplicates, preferring the one from firestore
    const uniqueResources = allResources.reduce((acc, current) => {
        if (!acc.find(item => item.id === current.id)) {
            acc.push(current);
        }
        return acc;
    }, [] as Resource[]);

    return uniqueResources;

  } catch (error) {
     console.error("Could not fetch resources from Firestore. Falling back to local data. Error:", error);
     // On any other error, also fall back to local data.
    return resourcesData as Resource[];
  }
}
