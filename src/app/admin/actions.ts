'use server';

import { z } from 'zod';
import { addResource, deleteResource, updateResource } from '@/lib/resources';
import { addPost, deletePost, updatePost } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- Admin Login Action ---
const loginSchema = z.object({
  secretKey: z.string().min(1, 'Secret key is required.'),
});

export async function handleAdminLogin(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    secretKey: formData.get('secretKey'),
  });

  if (!validatedFields.success) {
    return { message: 'Secret key cannot be empty.' };
  }

  const adminSecret = process.env.ADMIN_SECRET_KEY;

  if (!adminSecret) {
     return { message: 'Admin secret key is not configured on the server.' };
  }

  if (validatedFields.data.secretKey === adminSecret) {
    cookies().set('admin_token', adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    redirect('/admin/upload');
  } else {
    return { message: 'Invalid secret key. Please try again.' };
  }
}

// --- Upload Action ---
const uploadSchema = z
  .object({
    title: z.string().min(1, 'Title is required.'),
    description: z.string().min(1, 'Description is required.'),
    pdf: z.instanceof(File).optional(),
    link: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const pdfProvided = data.pdf && data.pdf.size > 0;
    const linkProvided = data.link && data.link.trim() !== '';

    if (!pdfProvided && !linkProvided) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Either a PDF file or an external link must be provided.',
        path: ['pdf'],
      });
    }

    if (pdfProvided && linkProvided) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide either a PDF file or a link, not both.',
        path: ['link'],
      });
    }
  });


export async function handleUploadResource(prevState: any, formData: FormData) {
  const validatedFields = uploadSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    pdf: formData.get('pdf'),
    link: formData.get('link'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { title, description, pdf, link } = validatedFields.data;
  
  try {
    let resourceHref = '';

    // Case 1: PDF file is uploaded
    if (pdf && pdf.size > 0) {
        const pdfsPath = path.join(process.cwd(), 'public', 'pdfs');
        await fs.mkdir(pdfsPath, { recursive: true });
        
        const safeFilename = pdf.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = path.join(pdfsPath, safeFilename);
        const fileBuffer = Buffer.from(await pdf.arrayBuffer());
        await fs.writeFile(filePath, fileBuffer);
        resourceHref = `/pdfs/${safeFilename}`;
    } 
    // Case 2: External link is provided
    else if (link) {
        resourceHref = link;
    }

    // Save metadata to JSON
    await addResource({
      title,
      description,
      href: resourceHref,
    });
  
    revalidatePath('/admin/upload');
    revalidatePath('/resources');
  
    return {
      message: `Resource "${title}" added successfully.`,
      errors: null,
    };
  } catch (error) {
    console.error('Resource creation failed:', error);
    return {
      message: 'An unexpected error occurred during resource creation.',
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

    try {
        const { id, title, description } = validatedFields.data;
        await updateResource(id, { title, description });

        revalidatePath('/admin/upload');
        revalidatePath('/resources');
        
        return { message: 'Resource updated successfully.', errors: null };
    } catch (error) {
        console.error('Resource update failed:', error);
        return {
            message: 'An unexpected error occurred while updating the resource.',
            errors: null,
        };
    }
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

    try {
        const deleted = await deleteResource(validatedFields.data.id);

        if (!deleted) {
          return { message: 'Resource not found.' };
        }

        revalidatePath('/admin/upload');
        revalidatePath('/resources');

        return { message: 'Resource deleted successfully.' };
    } catch (error) {
        console.error('Resource deletion failed:', error);
        return { message: 'An unexpected error occurred during resource deletion.' };
    }
}


// --- Post Actions ---

const basePostSchema = z.object({
  content: z.string().min(1, 'Content is required.'),
  // These are optional at the base level
  title: z.string().optional(),
  author: z.string().optional(),
  date: z.string().optional(),
});

const postSchema = z.discriminatedUnion("type", [
  basePostSchema.extend({
    type: z.literal("blog"),
    title: z.string({ required_error: "Title is required for blogs." }).min(1, "Title is required for blogs."),
    author: z.string({ required_error: "Author is required for blogs." }).min(1, "Author is required for blogs."),
    date: z.string({ required_error: "Date is required for blogs." }).min(1, "Date is required for blogs."),
  }),
  basePostSchema.extend({
    type: z.literal("article"),
    title: z.string({ required_error: "Title is required for articles." }).min(1, "Title is required for articles."),
  }),
  basePostSchema.extend({
    type: z.literal("meme"),
  }),
]);


export async function handleAddPost(prevState: any, formData: FormData) {
  const validatedFields = postSchema.safeParse({
    type: formData.get('type'),
    title: formData.get('title'),
    content: formData.get('content'),
    author: formData.get('author'),
    date: formData.get('date'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const postData = validatedFields.data;
    await addPost({
        type: postData.type,
        title: postData.title || '',
        content: postData.content,
        author: postData.author,
        date: postData.date
    });
    
    revalidatePath('/admin/upload');
    revalidatePath('/blogs');
    revalidatePath('/articles');
    revalidatePath('/memes');

    return { message: `${postData.type.charAt(0).toUpperCase() + postData.type.slice(1)} added successfully.`, errors: null };
  } catch (error) {
    console.error('Add post failed:', error);
    return { message: 'An unexpected error occurred.', errors: null };
  }
}

export async function handleUpdatePost(prevState: any, formData: FormData) {
    const validatedFields = postSchema.extend({id: z.string().min(1, "ID is missing")}).safeParse({
        id: formData.get('id'),
        type: formData.get('type'),
        title: formData.get('title'),
        content: formData.get('content'),
        author: formData.get('author'),
        date: formData.get('date'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Validation failed.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    try {
        const { id, ...postData } = validatedFields.data;
        await updatePost(id, {
            type: postData.type,
            title: postData.title || '',
            content: postData.content,
            author: postData.author,
            date: postData.date
        });

        revalidatePath('/admin/upload');
        revalidatePath('/blogs');
        revalidatePath('/articles');
        revalidatePath('/memes');

        return { message: 'Post updated successfully.', errors: null };
    } catch (error) {
        console.error('Update post failed:', error);
        return { message: 'An unexpected error occurred.', errors: null };
    }
}


const deletePostSchema = z.object({
    id: z.string().min(1),
});

export async function handleDeletePost(prevState: any, formData: FormData) {
    const validatedFields = deletePostSchema.safeParse({
        id: formData.get('id'),
    });

    if (!validatedFields.success) {
        return { message: 'Invalid post ID.' };
    }

    const deleted = await deletePost(validatedFields.data.id);

    if (!deleted) {
      return { message: 'Post not found.' };
    }

    revalidatePath('/admin/upload');
    revalidatePath('/blogs');
    revalidatePath('/articles');
    revalidatePath('/memes');

    return { message: 'Post deleted successfully.' };
}
