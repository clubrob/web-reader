const Auth = (function() {
  const firebase = require('firebase/app');
  require('firebase/auth');

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN
  };

  firebase.initializeApp(firebaseConfig);

  return {
    isLoggedIn: firebase
      .auth()
      .onAuthStateChanged(user => (user ? true : false))
  };
})();
