import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore modülü eklendi

const firebaseConfig = {
  apiKey: "AIzaSyBpGbAoQT7aHIxTmbXPwwiwtbSh2G6LIP0",
  authDomain: "teknogencsoruprojesi.firebaseapp.com",
  projectId: "teknogencsoruprojesi",
  storageBucket: "teknogencsoruprojesi.appspot.com",
  messagingSenderId: "235028183093",
  appId: "1:235028183093:web:b15a9e8659ab468c6d997c"
};

// Firebase uygulamasını başlatma kodum:
const app = initializeApp(firebaseConfig);

// Firebase Authentication modülünü baslatma ve dısa aktarma kodum
export const auth = getAuth(app);

// Firestore modülünü başlatma ve dısa aktarma kodum
export const db = getFirestore(app);

// Oturumu kapatma islevini dısa aktarma kodum
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully!');
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};
