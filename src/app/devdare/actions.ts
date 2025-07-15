'use server';

import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const daresCollection = 'dares';
const completionsCollection = 'completions';

// --- Get a random dare ---
export async function getRandomDare() {
  // If Firestore isn't configured, return a default dare to avoid crashing.
  if (!adminDb) {
    console.warn('Firebase Admin is not configured. Returning default dare.');
    return { 
        dare: { 
            id: 'default-dare', 
            text: 'Configure your Firebase Admin SDK to get a real dare!' 
        } 
    };
  }
  try {
    const daresSnapshot = await adminDb.collection(daresCollection).get();
    if (daresSnapshot.empty) {
      return { dare: { id: 'no-dares', text: 'No dares found in the database. Add some!' } };
    }
    const dares = daresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  if (!adminDb) {
    return { error: 'Database not configured. Cannot save completion.' };
  }

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
    // Prevent saving completions for default/error dares
    if (dareId === 'default-dare' || dareId === 'no-dares') {
        return { error: "This is a placeholder dare and cannot be completed." };
    }

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
    console.warn('Firebase Admin is not configured. Returning empty leaderboard.');
    return [];
  }
  try {
    const completionsSnapshot = await adminDb.collection(completionsCollection).orderBy('timestamp', 'desc').get();
    if (completionsSnapshot.empty) {
      return [];
    }

    const completionsByPerson: Record<string, { name: string, count: number }> = {};

    completionsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const key = data.name || data.deviceId;
      if (!completionsByPerson[key]) {
        completionsByPerson[key] = { name: data.name || `AnonymousDev-${data.deviceId.substring(0,6)}`, count: 0 };
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
