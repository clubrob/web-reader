const Auth = (function() {
  const firebase = require('firebase/app');
  require('firebase/auth');

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN
  };

  firebase.initializeApp(firebaseConfig);

  return {
    logIn: function(user) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .catch(err => console.log(err.message));
    }
    /* isLoggedIn: function() {
      return firebase
        .auth()
        .onAuthStateChanged(
          user => (user ? (loggedIn = true) : (loggedIn = false))
        );
    } */
  };
})();

module.exports = Auth;
