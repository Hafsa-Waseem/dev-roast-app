'use server';

import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  pdf: z.instanceof(File).refine(file => file.size > 0, 'PDF file is required.'),
});

export async function handleUploadResource(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    pdf: formData.get('pdf'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
    };
  }
  
  // In a real application, you would upload the file to a storage service
  // like Firebase Storage or AWS S3 and save the metadata to a database.
  // For this prototype, we'll just log the details to the console.
  
  console.log('--- New Resource Uploaded ---');
  console.log('Title:', validatedFields.data.title);
  console.log('Description:', validatedFields.data.description);
  console.log('File Name:', validatedFields.data.pdf.name);
  console.log('File Size:', `${(validatedFields.data.pdf.size / 1024).toFixed(2)} KB`);
  console.log('-----------------------------');

  return {
    message: `Resource "${validatedFields.data.title}" uploaded successfully (simulated).`,
  };
}
