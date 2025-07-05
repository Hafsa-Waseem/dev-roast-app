
'use server';

import { z } from 'zod';
import { addResource, deleteResource, updateResource } from '@/lib/resources';
import { addPost, deletePost, updatePost } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  link: z.string().url('Please enter a valid URL.').optional(),
});


export async function handleUploadResource(prevState: any, formData: FormData) {
  const file = formData.get('file') as File | null;
  const link = formData.get('link') as string | null;

  if ((!link || link === '') && (!file || file.size === 0)) {
    return {
      message: 'Validation failed.',
      errors: { link: ['An external link or a file upload is required.'], file: ['A file upload or an external link is required.'] },
    };
  }

  if (link && link !== '' && file && file.size > 0) {
     return {
      message: 'Validation failed.',
      errors: { link: ['Please provide either a file or a link, not both.'], file: ['Please provide either a file or a link, not both.'] },
    };
  }
  
  const validatedFields = uploadSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    link: link || undefined,
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description } = validatedFields.data;
  let resourceUrl = '';
  
  try {
    if (file && file.size > 0) {
        if (!storage) {
            throw new Error('Firebase Storage is not configured. Cannot upload file.');
        }
        if (file.type !== 'application/pdf') {
             return { message: 'Invalid file type. Please upload a PDF.', errors: null };
        }
        const storageRef = ref(storage, `resources/${Date.now()}-${file.name}`);
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        await uploadBytes(storageRef, fileBuffer, { contentType: 'application/pdf' });
        resourceUrl = await getDownloadURL(storageRef);
    } else {
        resourceUrl = link!;
    }
    
    await addResource({
      title,
      description,
      href: resourceUrl,
    });
  
    revalidatePath('/admin/upload');
    revalidatePath('/resources');
  
    return {
      message: `Resource "${title}" added successfully.`,
      errors: null,
    };
  } catch (error: any) {
    console.error('Resource creation failed:', error);
    return {
      message: error.message || 'An unexpected error occurred during resource creation.',
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
    } catch (error: any) {
        console.error('Resource update failed:', error);
        return {
            message: error.message || 'An unexpected error occurred while updating the resource.',
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
        await deleteResource(validatedFields.data.id);

        revalidatePath('/admin/upload');
        revalidatePath('/resources');

        return { message: 'Resource deleted successfully.' };
    } catch (error: any) {
        console.error('Resource deletion failed:', error);
        return { message: error.message || 'An unexpected error occurred during resource deletion.' };
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
  } catch (error: any) {
    console.error('Add post failed:', error);
    return { message: error.message || 'An unexpected error occurred.', errors: null };
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
    } catch (error: any) {
        console.error('Update post failed:', error);
        return { message: error.message || 'An unexpected error occurred.', errors: null };
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

    try {
        await deletePost(validatedFields.data.id);

        revalidatePath('/admin/upload');
        revalidatePath('/blogs');
        revalidatePath('/articles');
        revalidatePath('/memes');

        return { message: 'Post deleted successfully.' };
    } catch (error: any) {
        console.error('Post deletion failed:', error);
        return { message: error.message || 'An unexpected error occurred during post deletion.' };
    }
}
