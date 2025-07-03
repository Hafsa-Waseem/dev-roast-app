import fs from 'fs/promises';
import path from 'path';

export type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
};

const dataDir = path.join(process.cwd(), 'src/data');
const resourcesFilePath = path.join(dataDir, 'resources.json');

async function ensureDataFileExists() {
    try {
        await fs.access(resourcesFilePath);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            await fs.mkdir(dataDir, { recursive: true });
            await fs.writeFile(resourcesFilePath, '[]', 'utf-8');
        } else {
            throw error;
        }
    }
}

async function readResources(): Promise<Resource[]> {
  await ensureDataFileExists();
  try {
    const data = await fs.readFile(resourcesFilePath, 'utf-8');
    // Handle empty file case
    if (data.trim() === '') {
        return [];
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing resources file:", error);
    // If file is corrupt or unreadable, treat as empty
    return [];
  }
}

async function writeResources(resources: Resource[]): Promise<void> {
  await ensureDataFileExists();
  await fs.writeFile(resourcesFilePath, JSON.stringify(resources, null, 2), 'utf-8');
}

export async function getResources(): Promise<Resource[]> {
  try {
    return await readResources();
  } catch (error) {
    console.error("Failed to get resources due to an unhandled error:", error);
    return [];
  }
}

export async function addResource(resource: Omit<Resource, 'id'>): Promise<Resource> {
  const resources = await readResources();
  const newResource: Resource = {
    id: Date.now().toString(),
    ...resource,
  };
  resources.push(newResource);
  await writeResources(resources);
  return newResource;
}

export async function updateResource(id: string, updatedData: Partial<Omit<Resource, 'id' | 'href'>>): Promise<Resource | null> {
  const resources = await readResources();
  const resourceIndex = resources.findIndex(r => r.id === id);
  if (resourceIndex === -1) {
    return null;
  }
  resources[resourceIndex] = { ...resources[resourceIndex], ...updatedData };
  await writeResources(resources);
  return resources[resourceIndex];
}

export async function deleteResource(id: string): Promise<boolean> {
  const resources = await readResources();
  const resourceIndex = resources.findIndex(r => r.id === id);

  if (resourceIndex === -1) {
    return false; // Not found
  }
  
  const resourceToDelete = resources[resourceIndex];

  // If it's a local PDF, try to delete the physical file first.
  if (resourceToDelete.href.startsWith('/pdfs/')) {
    const filePath = path.join(process.cwd(), 'public', resourceToDelete.href);
    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      // If the file doesn't exist, we can ignore the error and proceed.
      // For any other error (e.g., permissions), we should stop and report it.
      if (error.code !== 'ENOENT') {
        console.error(`Failed to delete file at ${filePath}:`, error);
        // Re-throw the error to be caught by the server action.
        throw new Error(`Failed to delete the physical file. Please check server permissions.`);
      }
    }
  }

  // If file deletion was successful (or not needed/failed gracefully), remove the metadata.
  const updatedResources = resources.filter(r => r.id !== id);
  await writeResources(updatedResources);
  
  return true;
}
