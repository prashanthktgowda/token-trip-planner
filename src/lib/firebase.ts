
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCyyEQADxM55wrfWo4AkWT-YEk5yEQh9rM",
  authDomain: "trip-planner-app-e58b6.firebaseapp.com",
  projectId: "trip-planner-app-e58b6",
  storageBucket: "trip-planner-app-e58b6.firebasestorage.app",
  messagingSenderId: "851184121781",
  appId: "1:851184121781:web:6ca0b1aec409d9e5028bfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
