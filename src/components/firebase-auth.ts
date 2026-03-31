import { onAuthStateChanged, signInWithEmailAndPassword, type Unsubscribe, type User } from 'firebase/auth';
import { firebaseAuth } from './firebase-config.ts';

export function observeAuthState(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithEmailPassword(email: string, password: string) {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
}

export function formatUserName(user: User): string {
  const displayName = user.displayName?.trim();
  if (displayName) {
    return displayName;
  }

  const email = user.email?.trim();
  if (email) {
    return email.split('@')[0] || email;
  }

  return 'Scout';
}
