import admin, { type ServiceAccount } from 'firebase-admin';

const requiredAdminVars: Record<string, boolean> = {
  'FIREBASE_PROJECT_ID': !!process.env.FIREBASE_PROJECT_ID,
  'FIREBASE_CLIENT_EMAIL': !!process.env.FIREBASE_CLIENT_EMAIL,
  'FIREBASE_PRIVATE_KEY': !!process.env.FIREBASE_PRIVATE_KEY,
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export const missingAdminVars = Object.entries(requiredAdminVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const isFirebaseAdminConfigured = missingAdminVars.length === 0;

// Initialize the Firebase Admin SDK only if it's configured and not already initialized.
if (isFirebaseAdminConfigured && !admin.apps.length) {
  try {
    const serviceAccount: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    };
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization failed:', error.message);
  }
} else if (!admin.apps.length && missingAdminVars.length > 0) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Firebase Admin not configured. Missing variables: ${missingAdminVars.join(', ')}. Admin features will be disabled.`);
  }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminStorage = admin.apps.length ? admin.storage() : null;
