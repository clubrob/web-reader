const Router = require('./helpers/router.js');
const Auth = require('./helpers/auth.js');
// Controllers
const Clip = require('./controllers/clipController.js'),
  Login = require('./controllers/loginController.js'),
  Home = require('./controllers/homeController.js'),
  UI = require('./controllers/uiController.js');

const App = (function(Router, Auth, Clip) {
  const currentPath = window.location.pathname + window.location.search;

  const safeHandler = function() {
    const safeElement = Array.from(document.querySelectorAll('.protected'));

    Auth.onAuthStateChanged(user => {
      if (user) {
        Auth.getToken()
          .then(token => Clip.setAuthState(token))
          .catch(err => console.error(err.message));
        safeElement.forEach(item => {
          item.classList.remove('hide');
        });
        document.querySelector('.nav__menu__item__link--login').style.display =
          'none';
      } else {
        Clip.setAuthState(null);
        console.log('nobody signed in', Auth.idToken);
        safeElement.forEach(item => {
          item.classList.add('hide');
        });
        document.querySelector('.nav__menu__item__link--login').style.display =
          'block';
      }
    });
  };

  const loadEventListeners = function() {
    const ui = UI.getUIElements();

    window.addEventListener('popstate', () => {
      Router.navigate(window.history.state.path, app);
      safeHandler();
    });

    document.addEventListener('DOMContentLoaded', safeHandler);

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

    ui.app.addEventListener('click', addClipUrlHandler);
    ui.app.addEventListener('click', addClipManualHandler);
    ui.app.addEventListener('click', updateClipHandler);
    ui.app.addEventListener('keyup', tagInputHandler);
    ui.app.addEventListener('click', tagDeleteHandler);
    ui.app.addEventListener('click', logInHandler);
    ui.logoutButton.addEventListener('click', logOutHandler);
  };

  const addClipUrlHandler = function(event) {
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
  };

  const addClipManualHandler = function(event) {
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
  };

  const updateClipHandler = function(event) {
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
  };

  const tagInputHandler = function(event) {
    const tagInput = event.target;
    const key = event.keyCode;
    const tagHolder = tagInput.nextElementSibling;

    if (
      tagInput &&
      tagInput.matches('.form__field__text--tag') &&
      key === 188
    ) {
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
  };

  const tagDeleteHandler = function(event) {
    const tagDelete = event.target;
    if (tagDelete && tagDelete.matches('.tag-delete')) {
      event.target.parentElement.remove();
    }
  };

  const logInHandler = function(event) {
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
  };

  const logOutHandler = function(event) {
    Auth.logout()
      .then(() => safeHandler())
      .catch(err => console.error(err.message));
    Router.navigate('/', app);
    event.preventDefault();
  };

  return {
    init: function() {
      // Set routes
      Router.setRoute('/', Home.indexView);
      Router.setRoute('/login', Login.loginView);
      Router.setRoute('/list', Clip.clipsView);
      Router.setRoute('/add', Clip.addClip);
      Router.setRoute('/read', Clip.readClip);
      Router.setRoute('/edit', Clip.readClip);
      Router.setRoute('/delete', Clip.deleteClip);
      Router.setRoute('/tag', Clip.tagClipList);

      loadEventListeners();

      window.history.pushState({ path: currentPath }, '', currentPath);
      Router.navigate(currentPath, app);
    }
  };
})(Router, Auth, Clip);

App.init();
