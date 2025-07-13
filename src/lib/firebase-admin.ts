import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

let isInitialized = admin.apps.length > 0;

if (!isInitialized) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    
    if (serviceAccountString && storageBucket) {
      const serviceAccount: ServiceAccount = JSON.parse(serviceAccountString);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: storageBucket,
      });
      isInitialized = true;
    }
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization failed:', error.message);
    isInitialized = false; 
  }
}

export const adminDb = isInitialized ? admin.firestore() : null;
export const adminStorage = isInitialized ? admin.storage() : null;
