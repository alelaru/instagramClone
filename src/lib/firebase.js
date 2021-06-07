import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//Here i want to import the seed file
// import { seedDatabase } from "../seed"

const config = { 
    apiKey: "AIzaSyAqnSO_IQ-iPg2ZSxlgkaC87sca2RE8-Ik",
    authDomain: "instagramclone-c2164.firebaseapp.com",
    projectId: "instagramclone-c2164",
    storageBucket: "instagramclone-c2164.appspot.com",
    messagingSenderId: "71570511270",
    appId: "1:71570511270:web:e6517ac35d9188c9e8ab67"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue }  = Firebase.firestore;

//Here is where i want to call the config once
//We did it once and we are done DO NOT USE IT
// seedDatabase(firebase);

export { firebase, FieldValue };