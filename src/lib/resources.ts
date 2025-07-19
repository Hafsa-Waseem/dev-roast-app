
import { adminDb } from './firebase-admin';
import resourcesData from '@/data/resources.json';

export type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
  fileName?: string; // Add fileName for storage management
  createdAt?: any;
};

const resourcesCollectionName = 'resources';

/**
 * Fetches resources. It first tries to fetch from Firebase Admin.
 * If the database is not configured or the fetch fails, it falls back
 * to returning the local resources.json data.
 * @param adminOnly - If true, only fetches from Firestore and does not include local JSON data.
 */
export async function getResources(adminOnly = false): Promise<Resource[]> {
  // If adminDb is not initialized, fall back to local data immediately.
  if (!adminDb) {
    return adminOnly ? [] : (resourcesData as Resource[]);
  }
  
  try {
    const resourcesCollection = adminDb.collection(resourcesCollectionName);
    const resourcesSnapshot = await resourcesCollection.orderBy('createdAt', 'desc').get();
    
    const firestoreResources = resourcesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Resource[];

    if (adminOnly) {
      return firestoreResources;
    }

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
    return adminOnly ? [] : (resourcesData as Resource[]);
  }
}

    