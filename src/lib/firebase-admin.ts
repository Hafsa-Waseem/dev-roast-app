import admin from 'firebase-admin';

// This function safely parses the service account key from the environment variable.
const getServiceAccount = () => {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountString) {
    return null;
  }
  try {
    // The key is stored as a Base64 string to handle newlines and special characters in environment variables.
    return JSON.parse(Buffer.from(serviceAccountString, 'base64').toString('utf-8'));
  } catch (e) {
    console.error('Failed to parse Firebase service account key. Make sure it is a valid, Base64-encoded JSON.', e);
    return null;
  }
};

const serviceAccount = getServiceAccount();

// Check if the essential parts of the service account are present.
export const isFirebaseAdminConfigured = !!(serviceAccount && serviceAccount.project_id);

// Initialize the Firebase Admin SDK only if it's not already initialized.
if (isFirebaseAdminConfigured && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.error('Firebase Admin SDK initialization failed:', error);
  }
}

// Export the admin database and storage instances.
// They will be null if the configuration is missing, allowing the app to run without crashing.
export const adminDb = isFirebaseAdminConfigured ? admin.firestore() : null;
export const adminStorage = isFirebaseAdminConfigured ? admin.storage() : null;
