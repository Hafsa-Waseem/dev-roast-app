
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
  resources.unshift(newResource);
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
  const initialLength = resources.length;
  const updatedResources = resources.filter(r => r.id !== id);

  if (updatedResources.length === initialLength) {
    return false; // Not found
  }

  // Only update the JSON file, do not attempt to delete the physical file.
  // This is because the hosting environment has a read-only filesystem.
  await writeResources(updatedResources);
  
  return true;
}
