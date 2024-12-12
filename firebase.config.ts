import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoHKpRswn54nZeiKkQxKdz_ccq-9P3b14",
  authDomain: "goldie-b3ba7.firebaseapp.com",
  projectId: "goldie-b3ba7",
  storageBucket: "goldie-b3ba7.appspot.com",
  messagingSenderId: "1007503884026",
  appId: "1:1007503884026:web:9e252002a362fee0aa1343",
  measurementId: "G-4Y691G5YGG",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
