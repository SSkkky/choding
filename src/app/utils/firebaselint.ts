// src\lib\firebaselint.ts

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyC3V62mTpTextkt3iRu2btxeTdGIKK7wCs",
    authDomain: "choding.firebaseapp.com",
    projectId: "choding",
    storageBucket: "choding.appspot.com",
    messagingSenderId: "124692663276",
    appId: "1:124692663276:web:4a29a06add6264ac4c8ec9",
    measurementId: "G-FN4F5WKCB1"
};

const app = initializeApp(firebaseConfig);

let messaging: any;

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
    messaging = getMessaging();
}

export const getClientToken = async () => {
    let currentToken = await getToken(messaging, { vapidKey: 'BKFEV0OTAT4dD-emi_jhmPNyBIdgZU9Lau_ZkpoLUNpgAKEbI37dxNHPp470aWdkjYd8VHgMzdPj3SLFcGtk5MQ' });
    return currentToken;
}