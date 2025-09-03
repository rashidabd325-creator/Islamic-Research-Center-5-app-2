// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "আপনার_API_KEY",
  authDomain: "আপনার_PROJECT_ID.firebaseapp.com",
  projectId: "আপনার_PROJECT_ID",
  storageBucket: "আপনার_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
