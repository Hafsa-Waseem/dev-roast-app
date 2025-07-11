// src/ai/flows/generate-roast.ts
'use server';

/**
 * @fileOverview A personalized roast generator AI agent.
 *
 * - generateRoast - A function that handles the roast generation process.
 * - GenerateRoastInput - The input type for the generateRoast function.
 * - GenerateRoastOutput - The return type for the generateRoast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRoastInputSchema = z.object({
  name: z.string().describe('The name of the person to roast.'),
  programmingBattlefield: z
    .string()
    .describe('The favorite programming battlefield of the person to roast.'),
  jobRole: z.string().describe('The job role of the person to roast.'),
});
export type GenerateRoastInput = z.infer<typeof GenerateRoastInputSchema>;

const GenerateRoastOutputSchema = z.object({
  roast: z.string().describe('The generated roast.'),
});
export type GenerateRoastOutput = z.infer<typeof GenerateRoastOutputSchema>;

export async function generateRoast(input: GenerateRoastInput): Promise<GenerateRoastOutput> {
  return generateRoastFlow(input);
}

const roastPrompt = ai.definePrompt({
  name: 'roastPrompt',
  input: {schema: z.object({
    name: GenerateRoastInputSchema.shape.name,
    jobRole: GenerateRoastInputSchema.shape.jobRole,
    programmingBattlefield: GenerateRoastInputSchema.shape.programmingBattlefield,
  })},
  output: {schema: z.object({ roast: GenerateRoastOutputSchema.shape.roast })},
  prompt: `You are a witty and sarcastic AI that generates roasts for people in the tech industry. The roast should be funny, clever, and specific to their details.

  Name: {{{name}}}
  Job Role: {{{jobRole}}}
  Favorite Programming Battlefield: {{{programmingBattlefield}}}

  Generate a roast that humorously targets their job role and their chosen programming battlefield. Be creative and a little edgy, but keep it in good fun.
  `,
  config: {
    safetySettings: [
        {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
        },
        {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
        },
    ],
  },
});


const generateRoastFlow = ai.defineFlow(
  {
    name: 'generateRoastFlow',
    inputSchema: GenerateRoastInputSchema,
    outputSchema: GenerateRoastOutputSchema,
  },
  async input => {
    const roastResult = await roastPrompt(input);
    const roast = roastResult.output?.roast || 'The AI is speechless. You are unroastable.';
    return { roast };
  }
);
