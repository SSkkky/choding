import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3V62mTpTextkt3iRu2btxeTdGIKK7wCs",
  authDomain: "choding.firebaseapp.com",
  projectId: "choding",
  storageBucket: "choding.appspot.com",
  messagingSenderId: "124692663276",
  appId: "1:124692663276:web:4a29a06add6264ac4c8ec9",
  measurementId: "G-FN4F5WKCB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);