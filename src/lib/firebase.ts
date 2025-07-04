
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

// Check if all necessary Firebase config values are present
export const isFirebaseConfigured = 
    !!firebaseConfig.apiKey &&
    !!firebaseConfig.authDomain &&
    !!firebaseConfig.projectId &&
    !!firebaseConfig.storageBucket &&
    !!firebaseConfig.messagingSenderId &&
    !!firebaseConfig.appId;

if (isFirebaseConfigured) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (e) {
    console.error("Firebase client-side initialization failed:", e);
    db = null;
    storage = null;
  }
} else {
  if (process.env.NODE_ENV === 'development') {
    console.warn("Firebase client-side configuration is missing or incomplete. Features requiring client-side Firebase will fall back to local data.");
  }
}

export { db, storage };
