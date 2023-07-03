import admin from 'firebase-admin';

if (!process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS_CLIENT_EMAIL) {
    throw new Error('Missing env variable NEXT_PUBLIC_FIREBASE_CREDENTIALS_CLIENT_EMAIL');
}

if (!process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS_PRIVATE_KEY) {
    throw new Error('Missing env variable NEXT_PUBLIC_FIREBASE_CREDENTIALS_PRIVATE_KEY');
}

if (!process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS_PROJECT_ID) {
    throw new Error('Missing env variable NEXT_PUBLIC_FIREBASE_CREDENTIALS_PROJECT_ID');
}

const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS_CLIENT_EMAIL;
const privateKey = process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS_PRIVATE_KEY.replace(/\\n/g, '\n');
const projectId = process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS_PROJECT_ID;

admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail,
        privateKey,
        projectId,
    })
  });

export const firestore = admin.firestore();
