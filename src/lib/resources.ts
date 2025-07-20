
import resourcesData from '@/data/resources.json';

export type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
  fileName?: string; // Add fileName for storage management
};

/**
 * Fetches resources from the local resources.json file.
 */
export async function getResources(): Promise<Resource[]> {
  // This function will now simply return the data from the imported JSON file.
  // The `adminOnly` parameter is no longer needed but the async signature is kept
  // for consistency and future-proofing.
  return resourcesData as Resource[];
}
