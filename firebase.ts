import admin from 'firebase-admin';

if (!admin.instanceId) {
  admin.initializeApp();
}

export const firestore = admin.firestore();
