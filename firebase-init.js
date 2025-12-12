// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  runTransaction,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:"AIzaSyDdKe6vnWEbSq5FHz1Y6Pz3QdVjcrrq5CA",
  authDomain:"dolvar-7cc8e.firebaseapp.com",
  projectId:"dolvar-7cc8e",
  storageBucket:"dolvar-7cc8e.firebasestorage.app",
  messagingSenderId:"284313401192",
  appId:"1:284313401192:web:0d2c088d37c5fbe8f008dd",
  measurementId:"G-D6PRWJGLGQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// expose toàn bộ Firebase ra global
window.__FB = {
  app, auth, db, provider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  serverTimestamp,
  doc, getDoc, setDoc, updateDoc, addDoc, runTransaction, collection
};

// hàm đăng nhập — gọi từ mọi iframe
window.signIn = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.error("Login failed:", e);
    alert("Không đăng nhập được: " + e.message);
  }
};

// hàm đăng xuất (nếu muốn dùng)
window.signOutFB = async () => {
  try { await signOut(auth); }
  catch(e){ console.error(e); }
};

console.log("Firebase initialized globally");
