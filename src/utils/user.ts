import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  createdAt?: unknown;
};

export async function createUserProfile(profile: UserProfile) {
  const ref = doc(db, 'users', profile.uid);
  await setDoc(ref, { ...profile, createdAt: serverTimestamp() }, { merge: true });
}
