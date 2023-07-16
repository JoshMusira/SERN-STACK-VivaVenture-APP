// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCBEjM3PVGfYP2k7gheZBzbaPMo2axg7E8",
    authDomain: "uploadingfile-34fcb.firebaseapp.com",
    projectId: "uploadingfile-34fcb",
    storageBucket: "uploadingfile-34fcb.appspot.com",
    messagingSenderId: "108213320722",
    appId: "1:108213320722:web:1f73cb4e4d5d6f51bd6ccb",
    measurementId: "G-R841RN5YMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
const analytics = getAnalytics(app);