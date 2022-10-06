
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBUDGDneacQniYkDhYb0fiAlVQn54ZWV1M',
  authDomain: 'netflix-clone-dc8bf.firebaseapp.com',
  projectId: 'netflix-clone-dc8bf',
  storageBucket: 'netflix-clone-dc8bf.appspot.com',
  messagingSenderId: '260705102880',
  appId: '1:260705102880:web:696f11503716140344e045',
  measurementId: 'G-CKM0XVXEYN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
