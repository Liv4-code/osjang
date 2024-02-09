// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-olNRlolnzrQMGhgTZblvCdq1Fo-Zf9A",
    authDomain: "myosjang.firebaseapp.com",
    projectId: "myosjang",
    storageBucket: "myosjang.appspot.com",
    messagingSenderId: "1033970058929",
    appId: "1:1033970058929:web:11137eb987313504e68490",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
