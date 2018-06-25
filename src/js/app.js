const RouterClass = require('./helpers/router.js');
// const Auth = require('./helpers/auth.js');

const Router = new RouterClass();

// Controllers
const ClipClass = require('./controllers/clipController.js'),
  Login = require('./controllers/loginController.js'),
  Home = require('./controllers/homeController.js');

const Clip = new ClipClass();

// Global variables
const app = document.querySelector('#app');
const currentPath = window.location.pathname + window.location.search;

// Set routes
Router.setRoute('/', Home.indexView());
Router.setRoute('/login', Login.loginView());
Router.setRoute('/list', Clip.clipsView());
// Pass function ref instead of function invocation if using URL params
// Function is invoked at the router
Router.setRoute('/read', Clip.readClip);

// Event handlers
/* 
function deleteHandler(e) {
  if (e.target && e.target.matches('#delete-clip')) {
    let urlArray = e.target.attributes.href.value.split('/');
    urlArray.shift();
    const slug = urlArray[1];

    Clip.deleteClip(slug);

    e.preventDefault();
  }
}

function editHandler(e) {
  if (e.target && e.target.matches('#edit-clip')) {
    let urlArray = e.target.attributes.href.value.split('/');
    urlArray.shift();
    const slug = urlArray[1];

    Clip.editClip(slug);

    e.preventDefault();
  }
} */

// Event listeners
window.addEventListener('load', () => {
  document.querySelector('#test-load').value = 'butts';
});
window.addEventListener('popstate', () => {
  Router.navigate(window.history.state.path, app);
});

document.addEventListener('click', event => {
  const link = event.target;
  const href = event.target.attributes.href.value;
  if (link && link.matches('a')) {
    if (link.matches('.origin')) {
      window.open(href);
      event.preventDefault();
    }
    window.history.pushState({ path: href }, '', href);
    Router.navigate(href, app);
    event.preventDefault();
  }
});

window.history.pushState({ path: currentPath }, '', currentPath);
Router.navigate(currentPath, app);
