const firebase = require('firebase/app');
require('firebase/auth');

const RouterClass = require('./helpers/router.js');
const AuthClass = require('./helpers/auth.js');
// Controllers
const ClipControllerClass = require('./controllers/clipController.js'),
  Login = require('./controllers/loginController.js'),
  Home = require('./controllers/homeController.js');

const Router = new RouterClass();
const Auth = new AuthClass();
const Clip = new ClipControllerClass();

// Global variables
const app = document.querySelector('#app');
const currentPath = window.location.pathname + window.location.search;

document.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(firebase.auth().currentUser.displayName);
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(token => {
          console.log(token);
          return Clip.setToken(token);
        })
        .catch(err => console.error(err.message));
    } else {
      console.log('nobody signed in');
    }
  });
});

// Set routes
Router.setRoute('/', Home.indexView, false);
Router.setRoute('/login', Login.loginView, false);
Router.setRoute('/list', Clip.clipsView, true);
Router.setRoute('/add', Clip.addClip, true);
Router.setRoute('/read', Clip.readClip, true);
Router.setRoute('/edit', Clip.readClip, true);
Router.setRoute('/delete', Clip.deleteClip, true);
Router.setRoute('/tag', Clip.tagClipList, true);

function safeHandler() {
  const safeElement = Array.from(document.querySelectorAll('.protected'));

  if (Auth.isLoggedIn()) {
    safeElement.forEach(item => {
      item.classList.remove('hide');
    });
    document.querySelector('.nav__menu__item__link--login').style.display =
      'none';
  } else {
    console.log('butts');
    safeElement.forEach(item => {
      item.classList.add('hide');
    });
    document.querySelector('.nav__menu__item__link--login').style.display =
      'block';
  }
}

// Event handlers
function addClipUrlHandler(event) {
  const btn = event.target;
  if (btn && btn.matches('#add-url-form-submit')) {
    const form = document.querySelector('#add-url-form');

    const clip = {};
    clip.url = form.querySelector('#add-url-form-url').value;
    clip.tags = Array.from(form.getElementsByClassName('tag-span')).map(
      tag => tag.textContent
    );

    Clip.createClip(clip);
    event.preventDefault();
  }
}
function addClipManualHandler(event) {
  const btn = event.target;
  if (btn && btn.matches('#add-manual-form-submit')) {
    const form = document.querySelector('#add-manual-form');

    const clip = {};
    clip.title = form.querySelector('#add-manual-form-title').value;
    clip.url = form.querySelector('#add-manual-form-url').value;
    clip.summary = form.querySelector('#add-manual-form-summary').value;
    clip.tags = Array.from(form.getElementsByClassName('tag-span')).map(
      tag => tag.textContent
    );

    Clip.createClip(clip);
    event.preventDefault();
  }
}
function updateClipHandler(event) {
  const btn = event.target;
  if (btn && btn.matches('#edit-manual-form-submit')) {
    const form = document.querySelector('#edit-manual-form');

    const clip = {};
    clip.title = form.querySelector('#edit-manual-form-title').value;
    clip.summary = form.querySelector('#edit-manual-form-summary').value;
    clip.tags = Array.from(form.getElementsByClassName('tag-span')).map(
      tag => tag.textContent
    );
    clip.slug = window.location.search.substr(3);

    Clip.editClip(clip);
    event.preventDefault();
  }
}
function tagInputHandler(event) {
  const tagInput = event.target;
  const key = event.keyCode;
  const tagHolder = tagInput.nextElementSibling;

  if (tagInput && tagInput.matches('.form__field__text--tag') && key === 188) {
    // Build the tagSpan and children
    // Tag text, comma removed
    const tagText = document.createTextNode(
      tagInput.value.substr(0, tagInput.value.length - 1)
    );
    // Tag delete button
    let tagDelete = document.createElement('span');
    tagDelete.classList.add('tag-delete');
    // Tag wrapper span
    let tagSpan = document.createElement('span');
    tagSpan.classList.add('tag-span');
    // Put it all together
    tagSpan.appendChild(tagText);
    tagSpan.appendChild(tagDelete);
    tagHolder.appendChild(tagSpan);
    // Reset the form
    tagInput.value = '';
  }
}
function tagDeleteHandler(event) {
  const tagDelete = event.target;
  if (tagDelete && tagDelete.matches('.tag-delete')) {
    event.target.parentElement.remove();
  }
}
function logInHandler(event) {
  const btn = event.target;

  if (btn && btn.matches('#sign-in-button')) {
    const user = {};
    user.email = document.querySelector('#app_email').value;
    user.password = document.querySelector('#app_password').value;
    Auth.login(user)
      .then(() => safeHandler())
      .catch(err => console.error(err.message));
    Router.navigate('/', app);
    event.preventDefault();
  }
}
const logoutButton = document.querySelector('#sign-out-button');
function logOutHandler(event) {
  Auth.logout()
    .then(() => safeHandler())
    .catch(err => console.error(err.message));
  Router.navigate('/', app);
  event.preventDefault();
}

// Event listeners
window.addEventListener('popstate', () => {
  Router.navigate(window.history.state.path, app);
  safeHandler();
});

document.addEventListener('click', event => {
  const link = event.target;

  if (link && link.matches('a')) {
    console.log(Auth.isLoggedIn());
    const href = event.target.attributes.href.value;
    if (href.indexOf('http') < 0) {
      window.history.pushState({ path: href }, '', href);
    } else {
      window.open(href, '_blank');
    }
    safeHandler();
    Router.navigate(href, app);
    event.preventDefault();
  }
});

app.addEventListener('click', addClipUrlHandler);
app.addEventListener('click', addClipManualHandler);
app.addEventListener('click', updateClipHandler);
app.addEventListener('keyup', tagInputHandler);
app.addEventListener('click', tagDeleteHandler);
app.addEventListener('click', logInHandler);
logoutButton.addEventListener('click', logOutHandler);

window.history.pushState({ path: currentPath }, '', currentPath);
Router.navigate(currentPath, app);
