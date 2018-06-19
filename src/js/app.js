const Router = require('./helpers/router.js');
// Controllers
const Clips = require('./controllers/clips'),
  Login = require('./controllers/login'),
  Home = require('./controllers/home');

const app = document.querySelector('#app');
const currentPath = window.location.pathname;

Router.setRoute('/', Home.indexView);
Router.setRoute('/login', Login.loginView);
Router.setRoute('/list', Clips.clipsView());
Router.setRoute('/read', Clips.readClip());

// Init
const navLinks = Array.from(document.querySelectorAll('.route'));
function navHandler(e) {
  const linkPath = e.target.attributes.href.value;
  window.history.pushState({ path: linkPath }, '', linkPath);
  console.log('path', linkPath);
  Router.navigate(linkPath);
  e.preventDefault();
}

navLinks.forEach(link => {
  link.addEventListener('click', navHandler);
});

window.addEventListener('popstate', () => {
  Router.navigate(window.history.state.path);
});

Router.navigate(currentPath);
// Read Clip
/* app.innerHTML = Clips.readClip(); */
