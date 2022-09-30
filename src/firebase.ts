import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBatE3C3zOeHg-A9foRx9TqgByW3z6I70U",
  authDomain: "my-app-cbaee.firebaseapp.com",
  projectId: "my-app-cbaee",
  storageBucket: "my-app-cbaee.appspot.com",
  messagingSenderId: "846164706734",
  appId: "1:846164706734:web:3e756e83829675f47cb43f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
