// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7IQY-OM7jRjtodHoFbPuwLlHB16oBSwc",
  authDomain: "upload-image-5ef80.firebaseapp.com",
  projectId: "upload-image-5ef80",
  storageBucket: "upload-image-5ef80.appspot.com",
  messagingSenderId: "69517762126",
  appId: "1:69517762126:web:d76958ec028bb16be3ad1f",
  measurementId: "G-0JQT5C52QK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
