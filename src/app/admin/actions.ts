'use server';

import { z } from 'zod';
import { addResource, deleteResource, updateResource } from '@/lib/resources';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// --- Upload Action ---
const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  pdf: z
    .instanceof(File)
    .refine(file => file.size > 0, 'PDF file is required.')
    .refine(file => file.type === 'application/pdf', 'Only PDF files are allowed.'),
});

export async function handleUploadResource(prevState: any, formData: FormData) {
  const validatedFields = uploadSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    pdf: formData.get('pdf'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { title, description, pdf } = validatedFields.data;
  
  try {
    // 1. Save the file to the public directory
    const pdfsPath = path.join(process.cwd(), 'public', 'pdfs');
    await fs.mkdir(pdfsPath, { recursive: true });
    
    const filePath = path.join(pdfsPath, pdf.name);
    const fileBuffer = Buffer.from(await pdf.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);
  
    // 2. Save metadata to JSON
    await addResource({
      title,
      description,
      href: `/pdfs/${pdf.name}`,
    });
  
    revalidatePath('/admin/upload');
    revalidatePath('/resources');
  
    return {
      message: `Resource "${title}" uploaded successfully.`,
      errors: null,
    };
  } catch (error) {
    console.error('File upload failed:', error);
    return {
      message: 'An unexpected error occurred during file upload.',
      errors: null,
    };
  }
}


// --- Edit Action ---
const editSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
});

export async function handleEditResource(prevState: any, formData: FormData) {
    const validatedFields = editSchema.safeParse({
        id: formData.get('id'),
        title: formData.get('title'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Validation failed.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { id, title, description } = validatedFields.data;
    await updateResource(id, { title, description });

    revalidatePath('/admin/upload');
    revalidatePath('/resources');
    
    return { message: 'Resource updated successfully.', errors: null };
}


// --- Delete Action ---
const deleteSchema = z.object({
    id: z.string().min(1),
});

export async function handleDeleteResource(prevState: any, formData: FormData) {
    const validatedFields = deleteSchema.safeParse({
        id: formData.get('id'),
    });

    if (!validatedFields.success) {
        return { message: 'Invalid resource ID.' };
    }

    const deleted = await deleteResource(validatedFields.data.id);

    if (!deleted) {
      return { message: 'Resource not found.' };
    }

    revalidatePath('/admin/upload');
    revalidatePath('/resources');

    return { message: 'Resource deleted successfully.' };
}
