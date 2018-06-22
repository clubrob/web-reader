const RouterClass = require('./helpers/router.js');
// const Auth = require('./helpers/auth.js');

const Router = new RouterClass();

// Controllers
const ClipClass = require('./controllers/clipController.js'),
  Login = require('./controllers/loginController.js'),
  Home = require('./controllers/homeController.js');

const Clip = new ClipClass();
/* console.log(Clip); */

// Global variables
const app = document.querySelector('#app');
const currentPath = window.location.pathname;

// Set routes
Router.setRoute('/', Home.indexView());
Router.setRoute('/login', Login.loginView());
Router.setRoute('/list', Clip.clipsView());
Router.setRoute('/read', Clip.readClip());

// Event handlers
function navHandler(e) {
  const linkPath = e.target.attributes.href.value;
  window.history.pushState({ path: linkPath }, '', linkPath);
  Router.navigate(linkPath, app);
  e.preventDefault();
}

function readHandler(e) {
  if (e.target && e.target.matches('.read-link')) {
    const linkPath = e.target.attributes.href.value;
    window.history.pushState({ path: linkPath }, '', linkPath);
    Router.navigate(linkPath, app);
    e.preventDefault();
  }
}

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
}

// Event listeners
window.addEventListener('load', () => {
  document.querySelector('#test-load').value = 'butts';
});
window.addEventListener('popstate', () => {
  Router.navigate(window.history.state.path, app);
});
const navLinks = Array.from(document.querySelectorAll('.route'));
navLinks.forEach(link => {
  link.addEventListener('click', navHandler);
});
app.addEventListener('click', readHandler, false);
app.addEventListener('click', deleteHandler, false);
app.addEventListener('click', editHandler, false);

window.history.pushState({ path: currentPath }, '', currentPath);
Router.navigate(currentPath, app);
