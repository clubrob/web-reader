import firebase from 'firebase/app';
import firestore from 'firebase/firestore';
import firebaseui from 'firebaseui';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const uiConfig = {
  signInSuccessUrl: 'index.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

// Initialize the FirebaseUI Widget using Firebase.
var authUi = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
authUi.start('#firebaseui-auth-container', uiConfig);

export { firebase, authUi };
