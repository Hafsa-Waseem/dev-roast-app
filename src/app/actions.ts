
'use server';

import { generateRoast, GenerateRoastInput } from '@/ai/flows/generate-roast';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminStorage } from '@/lib/firebase-admin';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

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

// Admin Login Action
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function handleAdminLogin(prevState: any, formData: FormData) {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid email or password format.' };
    }

    const { email, password } = validatedFields.data;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
        cookies().set('admin-auth', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        redirect('/admin/dashboard');
    }

    return { success: false, message: 'Invalid credentials.' };
}

// Add Resource Action
const addResourceSchema = z.object({
    title: z.string().min(3, 'Title is required and must be at least 3 characters.'),
    description: z.string().min(10, 'Description is required and must be at least 10 characters.'),
    pdfFile: z.any()
      .refine((file) => file instanceof File && file.size > 0, 'PDF file is required.')
      .refine((file) => file instanceof File && file.type === 'application/pdf', 'File must be a PDF.'),
});

export async function handleAddResource(prevState: any, formData: FormData) {
    if (!adminDb || !adminStorage) {
        return { success: false, message: 'Admin database or storage is not configured.' };
    }

    const validatedFields = addResourceSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        pdfFile: formData.get('pdfFile'),
    });
    
    if (!validatedFields.success) {
        const pdfError = validatedFields.error.flatten().fieldErrors.pdfFile?.[0];
        const titleError = validatedFields.error.flatten().fieldErrors.title?.[0];
        const descriptionError = validatedFields.error.flatten().fieldErrors.description?.[0];
        return { success: false, message: pdfError || titleError || descriptionError || 'Invalid form data.' };
    }

    const { title, description, pdfFile } = validatedFields.data;

    try {
        const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
        const fileName = `resources/${Date.now()}-${pdfFile.name}`;
        const file = adminStorage.bucket().file(fileName);

        await file.save(fileBuffer, {
            metadata: {
                contentType: 'application/pdf',
            },
        });

        const publicUrl = `https://storage.googleapis.com/${adminStorage.bucket().name}/${fileName}`;
        
        const resourceRef = adminDb.collection('resources').doc();
        await resourceRef.set({
            title,
            description,
            href: publicUrl,
            fileName: fileName,
            createdAt: FieldValue.serverTimestamp(),
        });
        
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
  if (!adminDb) {
    return { success: false, message: 'Admin database is not configured.' };
  }
  
  const validatedFields = editResourceSchema.safeParse(Object.fromEntries(formData.entries()));
  
  if (!validatedFields.success) {
    const titleError = validatedFields.error.flatten().fieldErrors.title?.[0];
    const descriptionError = validatedFields.error.flatten().fieldErrors.description?.[0];
    return { success: false, message: titleError || descriptionError || 'Invalid data.' };
  }

  const { id, title, description } = validatedFields.data;

  try {
    const resourceRef = adminDb.collection('resources').doc(id);
    await resourceRef.update({ title, description });
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
  if (!adminDb || !adminStorage) {
    return { success: false, message: 'Admin database or storage is not configured.' };
  }

  try {
    const resourceRef = adminDb.collection('resources').doc(id);
    const doc = await resourceRef.get();

    if (!doc.exists) {
      return { success: false, message: 'Resource not found.' };
    }

    const data = doc.data();
    if (data?.fileName) {
      // Delete the file from Cloud Storage
      const file = adminStorage.bucket().file(data.fileName);
      await file.delete().catch(err => {
        // Log error but don't block DB deletion if file doesn't exist
        console.warn(`Could not delete file ${data.fileName} from storage:`, err.message);
      });
    }
    
    // Delete the document from Firestore
    await resourceRef.delete();
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/resources');
    return { success: true, message: 'Resource deleted successfully!' };
  } catch (error) {
    console.error('Error deleting resource:', error);
    return { success: false, message: 'Failed to delete resource.' };
  }
}


    