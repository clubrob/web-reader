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
      safeHandler();
      Router.navigate(window.history.state.path, app);
    });

    document.addEventListener('click', event => {
      const link = event.target;

      if (link && link.matches('a')) {
        // console.log(Auth.isLoggedIn());
        const href = event.target.attributes.href.value;
        if (href.indexOf('http') >= 0) {
          window.open(href, '_blank');
        } else {
          safeHandler();
          Router.navigate(href, app);
        }
        event.preventDefault();
      }
    });

    ui.app.addEventListener('click', addClipUrlHandler);
    ui.app.addEventListener('click', updateClipHandler);
    ui.app.addEventListener('click', deleteClipHandler);
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

      Clip.createClip(clip)
        .then(() => Router.navigate('/list', app))
        .catch(err => console.error(err.message));
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

      Clip.updateClip(clip)
        .then(() => Router.navigate('/list', app))
        .catch(err => console.error(err.message));
      event.preventDefault();
    }
  };

  const deleteClipHandler = function(event) {
    const link = event.target;
    if (link && link.matches('#delete-clip')) {
      // TODO Confirm DELETE modal
      const slug = link.href.split('=')[1];

      Clip.deleteClip(slug)
        .then(() => Router.navigate('/list', app))
        .catch(err => console.error(err.message))
    }
    event.preventDefault();
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
      Router.setRoute('/edit', Clip.editClip);
      Router.setRoute('/tag', Clip.tagClipList);

      loadEventListeners();

      Auth.onAuthStateChanged(user => {
        if (user) {
          Auth.getToken()
            .then(token => {
              Clip.setAuthState(token);
              safeHandler();
              return Router.navigate(currentPath, app);
            })
            .catch(err => console.error(err.message));
        } else {
          safeHandler();
          Router.navigate('/', app);
        }
      });
    }
  };
})(Router, Auth, Clip);

App.init();
