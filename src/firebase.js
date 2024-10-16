import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAqxLALoj3U9ANJjjiIgS25yp7SzRyLfJI",
    authDomain: "medic-mode.firebaseapp.com",
    projectId: "medic-mode",
    storageBucket: "medic-mode.appspot.com",
    messagingSenderId: "915776285402",
    appId: "1:915776285402:web:e2bf03cfd80589277b13e3",
    measurementId: "G-EH0RVTHQXD"
  };


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 

export { auth, db, storage  };