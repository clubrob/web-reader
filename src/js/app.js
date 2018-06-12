const firebase = require('firebase/app');
require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN
};
firebase.initializeApp(firebaseConfig);

const UI = require('./components/ui.js');

const toggleSignIn = function(e) {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    const email = document.querySelector('#app-email').value;
    const password = document.querySelector('#app-password').value;

    if (email.length < 4) {
      alert('Please enter email');
      return;
    }
    if (password.length < 4) {
      alert('Please enter password');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location = 'http://localhost:3000/index.html';
      })
      .catch(err => {
        console.log(err);
      });
  }
  e.preventDefault();
};

if (window.location.pathname === '/login.html') {
  const signInToggle = document.querySelector('#sign-in-toggle');
  signInToggle.addEventListener('click', toggleSignIn);

  const signOutToggle = document.querySelector('#sign-out-toggle');
  signOutToggle.addEventListener('click', () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location = 'login.html';
      });
  });
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(data => {
        UI.populateList(data);
        /* console.log(data); */
      });
    console.log(user);
  } else {
    if (window.location.pathname !== '/login.html') {
      window.location = 'http://localhost:3000/login.html';
    }
  }
});
