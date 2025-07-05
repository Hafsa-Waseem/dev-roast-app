import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

// Check for the required environment variables.
const requiredAdminVars: Record<string, boolean> = {
  'FIREBASE_SERVICE_ACCOUNT_JSON': !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  'ADMIN_SECRET_KEY': !!process.env.ADMIN_SECRET_KEY,
};

export const missingAdminVars = Object.entries(requiredAdminVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export let isFirebaseAdminConfigured = missingAdminVars.length === 0;

// Initialize the Firebase Admin SDK only if it's configured and not already initialized.
if (isFirebaseAdminConfigured && !admin.apps.length) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON!;
    const serviceAccount: ServiceAccount = JSON.parse(serviceAccountString);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization failed:', error.message);
    // If initialization fails, treat it as not configured.
    isFirebaseAdminConfigured = false; 
    missingAdminVars.push('FIREBASE_SERVICE_ACCOUNT_JSON (Invalid format)');
  }
} else if (missingAdminVars.length > 0) {
    isFirebaseAdminConfigured = false;
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminStorage = admin.apps.length ? admin.storage() : null;
