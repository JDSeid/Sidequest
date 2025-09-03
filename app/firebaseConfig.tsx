// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwg_emwZGk7tD6TRXd5OulWs0_QaFC7tw",
  authDomain: "side-quest-1.firebaseapp.com",
  projectId: "side-quest-1",
  storageBucket: "side-quest-1.firebasestorage.app",
  messagingSenderId: "433050241838",
  appId: "1:433050241838:web:07218ee229babaa27848bf",
  measurementId: "G-HTWQPHKQZY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
