'use server';

import { z } from 'zod';
import { addResource, deleteResource, updateResource } from '@/lib/resources';
import { revalidatePath } from 'next/cache';

// --- Upload Action ---
const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  pdf: z.instanceof(File).refine(file => file.size > 0, 'PDF file is required.'),
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
  
  // In a real app, you'd upload the file to a storage service (e.g., Firebase Storage)
  // and save the URL. Here, we'll just save the metadata with a placeholder path.
  await addResource({
    title,
    description,
    href: `/pdfs/${pdf.name}`, // Simulated path
  });

  revalidatePath('/admin/upload');
  revalidatePath('/resources');

  return {
    message: `Resource "${title}" uploaded successfully.`,
    errors: null,
  };
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

    await deleteResource(validatedFields.data.id);

    revalidatePath('/admin/upload');
    revalidatePath('/resources');

    return { message: 'Resource deleted successfully.' };
}