const firebase = require('firebase/app');
require('firebase/auth');

const Auth = (function() {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN
  };

  firebase.initializeApp(firebaseConfig);

  return {
    idToken: null,
    login: function(user) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .catch(err => console.log(err.message));
    },
    logout: function() {
      this.idToken = null;
      return firebase.auth().signOut();
    },
    isLoggedIn: function() {
      return firebase.auth().currentUser ? true : false;
    },
    setToken: function(token) {
      this.idToken = token;
    },
    getToken: function() {
      return firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          return token;
        })
        .catch(err => console.error(err.message));
    },
    onAuthStateChanged: function(cb) {
      return firebase.auth().onAuthStateChanged(cb);
    }
  };
})();

module.exports = Auth;
