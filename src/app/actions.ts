'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import resourcesData from '@/data/resources.json';
import { generateRoast, GenerateRoastInput } from '@/ai/flows/generate-roast';

type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
  fileName?: string;
};

// Roast Generation Action
const roastSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  programmingBattlefield: z.string(),
  jobRole: z.string(),
});

export async function handleGenerateRoast(prevState: any, formData: FormData) {
  try {
    const validatedFields = roastSchema.safeParse({
      name: formData.get('name'),
      programmingBattlefield: formData.get('programmingBattlefield'),
      jobRole: formData.get('jobRole'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Validation failed',
        errors: validatedFields.error.flatten().fieldErrors,
        roast: null,
      };
    }

    const input: GenerateRoastInput = {
      name: validatedFields.data.name,
      programmingBattlefield: validatedFields.data.programmingBattlefield,
      jobRole: validatedFields.data.jobRole,
    };

    const result = await generateRoast(input);

    return {
      message: 'Success',
      roast: result.roast,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred.',
      roast: null,
      errors: null,
    };
  }
}

// Helper to write to the local resources.json
async function writeResources(resources: Resource[]) {
  const filePath = path.join(process.cwd(), 'src/data/resources.json');
  await fs.writeFile(filePath, JSON.stringify(resources, null, 2), 'utf-8');
}


// Add Resource Action
const addResourceSchema = z.object({
    title: z.string().min(3, 'Title is required and must be at least 3 characters.'),
    description: z.string().min(10, 'Description is required and must be at least 10 characters.'),
});

export async function handleAddResource(prevState: any, formData: FormData) {
    const validatedFields = addResourceSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        const { fieldErrors } = validatedFields.error.flatten();
        return { success: false, message: fieldErrors.title?.[0] || fieldErrors.description?.[0] || 'Invalid form data.' };
    }
    
    const pdfFile = formData.get('pdfFile');

    if (!(pdfFile instanceof File) || pdfFile.size === 0) {
        return { success: false, message: 'PDF file is required.' };
    }

    if (pdfFile.type !== 'application/pdf') {
        return { success: false, message: 'File must be a PDF.' };
    }

    const { title, description } = validatedFields.data;
    const resources: Resource[] = [...resourcesData];

    try {
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
        const fileName = `${Date.now()}-${pdfFile.name.replace(/\s+/g, '_')}`;
        const publicPath = path.join('public', 'pdfs', fileName);
        const filePath = path.join(process.cwd(), publicPath);
        
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, fileBuffer);

        const newResource: Resource = {
            id: `resource-${Date.now()}`,
            title,
            description,
            href: `/pdfs/${fileName}`, 
            fileName: fileName,
        };

        resources.unshift(newResource);
        await writeResources(resources);
        
        revalidatePath('/admin/dashboard');
        revalidatePath('/resources');
        return { success: true, message: 'Resource added successfully!' };
    } catch (error) {
        console.error('Error uploading resource:', error);
        return { success: false, message: 'An unexpected error occurred during upload.' };
    }
}


// Edit Resource Action
const editResourceSchema = z.object({
  id: z.string(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

export async function handleEditResource(prevState: any, formData: FormData) {
  const validatedFields = editResourceSchema.safeParse(Object.fromEntries(formData.entries()));
  
  if (!validatedFields.success) {
    const titleError = validatedFields.error.flatten().fieldErrors.title?.[0];
    const descriptionError = validatedFields.error.flatten().fieldErrors.description?.[0];
    return { success: false, message: titleError || descriptionError || 'Invalid data.' };
  }

  const { id, title, description } = validatedFields.data;
  const resources: Resource[] = [...resourcesData];
  const resourceIndex = resources.findIndex(r => r.id === id);

  if (resourceIndex === -1) {
    return { success: false, message: 'Resource not found.' };
  }

  try {
    resources[resourceIndex] = { ...resources[resourceIndex], title, description };
    await writeResources(resources);
    revalidatePath('/admin/dashboard');
    revalidatePath('/resources');
    return { success: true, message: 'Resource updated successfully!' };
  } catch (error) {
    console.error('Error updating resource:', error);
    return { success: false, message: 'Failed to update resource.' };
  }
}

// Delete Resource Action
export async function handleDeleteResource(id: string) {
  let resources: Resource[] = [...resourcesData];
  const resourceToDelete = resources.find(r => r.id === id);

  if (!resourceToDelete) {
    return { success: false, message: 'Resource not found.' };
  }

  try {
    // Delete the file from public/pdfs
    if (resourceToDelete.fileName) {
      const filePath = path.join(process.cwd(), 'public', 'pdfs', resourceToDelete.fileName);
      try {
        await fs.unlink(filePath);
      } catch (fileError: any) {
        // Log error but don't block DB deletion if file doesn't exist
        console.warn(`Could not delete file ${resourceToDelete.fileName}:`, fileError.message);
      }
    }
    
    // Delete the entry from the JSON file
    resources = resources.filter(r => r.id !== id);
    await writeResources(resources);
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/resources');
    return { success: true, message: 'Resource deleted successfully!' };
  } catch (error) {
    console.error('Error deleting resource:', error);
    return { success: false, message: 'Failed to delete resource.' };
  }
}

// Admin Login Action is removed as we are not using cookie-based auth anymore for this simple setup.
// If needed, a more robust auth system can be added later.
export async function handleAdminLogin(prevState: any, formData: FormData) {
    console.log("Admin login is currently disabled.");
    return { success: false, message: 'Admin login is not configured.' };
}
