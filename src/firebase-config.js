
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDvJ2gm2pDbZ9TNVC-pmohchqj-nb0gkxk",
  authDomain: "kanda-vtp-analytics-dashboard.firebaseapp.com",
  databaseURL: "https://kanda-vtp-analytics-dashboard-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kanda-vtp-analytics-dashboard",
  storageBucket: "kanda-vtp-analytics-dashboard.firebasestorage.app",
  messagingSenderId: "871333268300",
  appId: "1:871333268300:web:c08d229c5eea1db7169de9",
  measurementId: "G-M4R484F3ZD"
};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };

export const auth = getAuth(app);
export const database = getDatabase(app);

