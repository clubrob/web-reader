const firebase = require('firebase/app');
require('firebase/auth');

const Auth = function() {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN
  };

  firebase.initializeApp(firebaseConfig);
};

Auth.prototype.login = function(user) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .catch(err => console.log(err.message));
};

Auth.prototype.logout = function() {
  return firebase.auth().signOut();
};

Auth.prototype.isLoggedIn = function() {
  return firebase.auth().currentUser ? true : false;
};

module.exports = Auth;
