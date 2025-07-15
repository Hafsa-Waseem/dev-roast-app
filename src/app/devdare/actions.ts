'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// Define paths to our local JSON database files
const daresFilePath = path.join(process.cwd(), 'src', 'data', 'dares.json');
const completionsFilePath = path.join(process.cwd(), 'src', 'data', 'completions.json');

type Dare = {
  id: string;
  text: string;
};

type Completion = {
  id: string;
  dareId: string;
  deviceId: string;
  name: string;
  timestamp: string;
};

// --- Helper functions to read/write JSON files ---

async function readDares(): Promise<Dare[]> {
  try {
    const data = await fs.readFile(daresFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading dares file:', error);
    // Return a default dare if file doesn't exist or is empty
    return [{ id: 'default-dare', text: 'Create a dares.json file in src/data to get started!' }];
  }
}

async function readCompletions(): Promise<Completion[]> {
  try {
    const data = await fs.readFile(completionsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
}

async function writeCompletions(completions: Completion[]): Promise<void> {
  try {
    await fs.writeFile(completionsFilePath, JSON.stringify(completions, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing completions file:', error);
  }
}

// --- Get a random dare ---
export async function getRandomDare() {
  try {
    const dares = await readDares();
    if (dares.length === 0) {
      return { dare: { id: 'no-dares', text: 'No dares found in dares.json. Add some!' } };
    }
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    return { dare: { id: randomDare.id, text: randomDare.text } };
  } catch (error) {
    console.error('Error fetching dare:', error);
    return { error: 'Could not fetch a dare.' };
  }
}

// --- Complete a dare ---
const completeDareSchema = z.object({
  dareId: z.string().min(1),
  deviceId: z.string().min(1),
  name: z.string().optional(),
});

export async function handleCompleteDare(prevState: any, formData: FormData) {
  const validatedFields = completeDareSchema.safeParse({
    dareId: formData.get('dareId'),
    deviceId: formData.get('deviceId'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid data provided.' };
  }

  const { dareId, deviceId, name } = validatedFields.data;

  try {
    if (dareId === 'default-dare' || dareId === 'no-dares') {
      return { error: "This is a placeholder dare and cannot be completed." };
    }
    
    const completions = await readCompletions();
    const newCompletion: Completion = {
      id: crypto.randomUUID(),
      dareId,
      deviceId,
      name: name || `AnonymousDev-${deviceId.substring(0, 6)}`,
      timestamp: new Date().toISOString(),
    };
    
    completions.push(newCompletion);
    await writeCompletions(completions);

    revalidatePath('/leaderboard');
    return { success: true, message: "Dare completed! You're awesome!" };
  } catch (error) {
    console.error('Error completing dare:', error);
    return { error: 'Could not save completion.' };
  }
}

// --- Get leaderboard data ---
export async function getLeaderboard() {
  try {
    const completions = await readCompletions();
    if (completions.length === 0) {
      return [];
    }

    const completionsByPerson: Record<string, { name: string, count: number }> = {};

    completions.forEach(completion => {
      const key = completion.name || completion.deviceId;
      if (!completionsByPerson[key]) {
        completionsByPerson[key] = { name: completion.name || `AnonymousDev-${completion.deviceId.substring(0,6)}`, count: 0 };
      }
      completionsByPerson[key].count++;
    });

    return Object.values(completionsByPerson)
      .sort((a, b) => b.count - a.count)
      .map((p, index) => ({ ...p, rank: index + 1 }));
      
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}
