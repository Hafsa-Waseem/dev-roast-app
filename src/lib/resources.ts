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
  const resourceToDelete = resources.find(r => r.id === id);

  if (!resourceToDelete) {
    return false; // Not found
  }

  // Delete the associated file from public/pdfs
  try {
    if (resourceToDelete.href.startsWith('/pdfs/')) {
        const filePath = path.join(process.cwd(), 'public', resourceToDelete.href);
        await fs.unlink(filePath);
    }
  } catch (error: any) {
    // If file doesn't exist, ENOENT error code. We can ignore that.
    if (error.code !== 'ENOENT') {
        console.error(`Failed to delete file for resource ${id}:`, error);
        // We might choose to not proceed with metadata deletion if file deletion fails.
        // For now, we will log the error and continue to delete the metadata.
    }
  }

  const updatedResources = resources.filter(r => r.id !== id);
  await writeResources(updatedResources);
  
  return true;
}
