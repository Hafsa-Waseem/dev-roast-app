import fs from 'fs/promises';
import path from 'path';

export type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
};

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'src/data');
const resourcesFilePath = path.join(dataDir, 'resources.json');

async function ensureDataFileExists() {
    try {
        await fs.access(resourcesFilePath);
    } catch (error) {
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
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading resources file:", error);
    return [];
  }
}

async function writeResources(resources: Resource[]): Promise<void> {
  await ensureDataFileExists();
  await fs.writeFile(resourcesFilePath, JSON.stringify(resources, null, 2), 'utf-8');
}

export async function getResources(): Promise<Resource[]> {
  return await readResources();
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
  let resources = await readResources();
  const initialLength = resources.length;
  resources = resources.filter(r => r.id !== id);
  if (resources.length === initialLength) {
    return false; // Not found
  }
  await writeResources(resources);
  return true;
}
