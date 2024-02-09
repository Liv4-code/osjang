// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCC9uF6PFaCrVAONc73QBQ6EJPp9kARNik",
    authDomain: "my-osjang.firebaseapp.com",
    projectId: "my-osjang",
    storageBucket: "my-osjang.appspot.com",
    messagingSenderId: "437799091455",
    appId: "1:437799091455:web:f1058322ecc5cb250560ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
