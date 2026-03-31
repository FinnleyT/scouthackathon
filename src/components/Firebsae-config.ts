import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase, type Database } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCriV9d_JCqjG3LhwP90Z8pk9GBE8lYnBA',
  authDomain: 'jotiscouts.firebaseapp.com',
  databaseURL: 'https://jotiscouts-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'jotiscouts',
  storageBucket: 'jotiscouts.firebasestorage.app',
  messagingSenderId: '1071802030192',
  appId: '1:1071802030192:web:e8d5f6b8c159284011fcb5',
  measurementId: 'G-3MSSRXTF6P',
} as const;

const useEmulators = import.meta.env.MODE === 'debug';

const emulatorHost = '127.0.0.1';
const emulatorPorts = {
  auth: 9099,
  firestore: 8080,
  database: 9000,
  storage: 9199,
} as const;

const emulatorsConnectedFlag = '__scout_firebase_emulators_connected__';

export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firebaseAuth: Auth = getAuth(firebaseApp);
export const firebaseFirestore: Firestore = getFirestore(firebaseApp);
export const firebaseDatabase: Database = getDatabase(firebaseApp);
export const firebaseStorage: FirebaseStorage = getStorage(firebaseApp);

if (useEmulators && !(globalThis as Record<string, unknown>)[emulatorsConnectedFlag]) {
  connectAuthEmulator(
    firebaseAuth,
    `http://${emulatorHost}:${emulatorPorts.auth}`,
    { disableWarnings: true },
  );
  connectFirestoreEmulator(firebaseFirestore, emulatorHost, emulatorPorts.firestore);
  connectDatabaseEmulator(firebaseDatabase, emulatorHost, emulatorPorts.database);
  connectStorageEmulator(firebaseStorage, emulatorHost, emulatorPorts.storage);

  (globalThis as Record<string, unknown>)[emulatorsConnectedFlag] = true;
}

export const firebaseEmulatorsEnabled = useEmulators;
