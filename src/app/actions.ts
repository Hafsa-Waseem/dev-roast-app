'use server';

import { generateRoast, GenerateRoastInput } from '@/ai/flows/generate-roast';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required.'),
  programmingBattlefield: z.string(),
});

export async function handleGenerateRoast(prevState: any, formData: FormData) {
  try {
    const validatedFields = schema.safeParse({
      name: formData.get('name'),
      programmingBattlefield: formData.get('programmingBattlefield'),
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
