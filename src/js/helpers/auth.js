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

Auth.prototype.getToken = function() {
  return firebase
    .auth()
    .currentUser.getIdToken()
    .then(token => {
      return token;
    })
    .catch(err => console.error(err.message));
};

module.exports = Auth;
