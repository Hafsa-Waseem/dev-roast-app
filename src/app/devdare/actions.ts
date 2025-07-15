'use server';

import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const daresCollection = 'dares';
const completionsCollection = 'completions';

// --- Get a random dare ---
export async function getRandomDare() {
  if (!adminDb) {
    return { error: 'Database not configured.' };
  }
  try {
    const daresSnapshot = await adminDb.collection(daresCollection).get();
    if (daresSnapshot.empty) {
      return { dare: { id: 'default', text: 'No dares found! Add one from the admin panel.' } };
    }
    const dares = daresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    return { dare: { id: randomDare.id, text: randomDare.text } };
  } catch (error) {
    console.error('Error fetching dare:', error);
    return { error: 'Could not fetch a dare.' };
  }
}

// --- Add a new dare (for admin) ---
const addDareSchema = z.object({
  dareText: z.string().min(10, 'Dare text must be at least 10 characters long.'),
});

export async function handleAddDare(prevState: any, formData: FormData) {
  if (!adminDb) return { message: 'Database not configured.', errors: null };

  const validatedFields = addDareSchema.safeParse({
    dareText: formData.get('dareText'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await adminDb.collection(daresCollection).add({
      text: validatedFields.data.dareText,
      createdAt: FieldValue.serverTimestamp(),
    });
    revalidatePath('/admin/add-dare');
    return { message: 'Dare added successfully!', errors: null };
  } catch (error) {
    console.error('Error adding dare:', error);
    return { message: 'Failed to add dare.', errors: null };
  }
}

// --- Complete a dare ---
const completeDareSchema = z.object({
  dareId: z.string().min(1),
  deviceId: z.string().min(1),
  name: z.string().optional(),
});

export async function handleCompleteDare(prevState: any, formData: FormData) {
  if (!adminDb) return { error: 'Database not configured.' };

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
    await adminDb.collection(completionsCollection).add({
      dareId: adminDb.collection(daresCollection).doc(dareId),
      deviceId,
      name: name || `AnonymousDev-${deviceId.substring(0, 6)}`,
      timestamp: FieldValue.serverTimestamp(),
    });

    revalidatePath('/leaderboard');
    return { success: true, message: "Dare completed! You're awesome!" };
  } catch (error) {
    console.error('Error completing dare:', error);
    return { error: 'Could not save completion.' };
  }
}

// --- Get leaderboard data ---
export async function getLeaderboard() {
  if (!adminDb) {
    return [];
  }
  try {
    const completionsSnapshot = await adminDb.collection(completionsCollection).get();
    if (completionsSnapshot.empty) {
      return [];
    }

    const completionsByPerson: Record<string, { name: string, count: number }> = {};

    completionsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const key = data.name || data.deviceId;
      if (!completionsByPerson[key]) {
        completionsByPerson[key] = { name: data.name, count: 0 };
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
