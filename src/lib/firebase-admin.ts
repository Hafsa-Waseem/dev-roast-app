import admin, { type ServiceAccount } from 'firebase-admin';

// Check if the required environment variables for Firebase Admin are set.
export const isFirebaseAdminConfigured =
  !!process.env.FIREBASE_PROJECT_ID &&
  !!process.env.FIREBASE_CLIENT_EMAIL &&
  !!process.env.FIREBASE_PRIVATE_KEY &&
  !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

// Initialize the Firebase Admin SDK only if it's configured and not already initialized.
if (isFirebaseAdminConfigured && !admin.apps.length) {
  try {
    // We construct the service account object from individual environment variables.
    // This is more reliable than parsing a JSON string.
    const serviceAccount: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // The private key from the JSON file needs to have its newlines escaped when stored in an .env file.
      // We replace the escaped newlines with actual newline characters.
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    };
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization failed:', error.message);
  }
} else if (!admin.apps.length) {
  if (process.env.NODE_ENV === 'development') {
    console.warn("Firebase Admin not configured. Required environment variables are missing. Admin features will be disabled.");
  }
}

// Export the admin database and storage instances.
// They will be null if the configuration is missing, allowing the app to run without crashing.
export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminStorage = admin.apps.length ? admin.storage() : null;
