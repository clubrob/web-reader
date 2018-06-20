const Router = require('./helpers/router.js');

// Controllers
const Clips = require('./controllers/clips'),
  Login = require('./controllers/login'),
  Home = require('./controllers/home');

// Global variables
const app = document.querySelector('#app');
const currentPath = window.location.pathname;

// Set routes
Router.setRoute('/', Home.indexView());
Router.setRoute('/login', Login.loginView());
Router.setRoute('/list', Clips.clipsView());
Router.setRoute('/read', Clips.readClip());

// Init
const navLinks = Array.from(document.querySelectorAll('.route'));

function navHandler(e) {
  const linkPath = e.target.attributes.href.value;
  window.history.pushState(
    {
      path: linkPath
    },
    '',
    linkPath
  );
  Router.navigate(linkPath, app);
  e.preventDefault();
}

navLinks.forEach(link => {
  link.addEventListener('click', navHandler);
});

window.addEventListener('popstate', () => {
  Router.navigate(window.history.state.path, app);
});

function deleteHandler(e) {
  if (e.target && e.target.matches('#delete-clip')) {
    let urlArray = e.target.attributes.href.value.split('/');
    urlArray.shift();
    const slug = urlArray[1];

    Clips.deleteClip(slug);

    e.preventDefault();
  }
}

function editHandler(e) {
  if (e.target && e.target.matches('#edit-clip')) {
    let urlArray = e.target.attributes.href.value.split('/');
    urlArray.shift();
    const slug = urlArray[1];

    Clips.editClip(slug);

    e.preventDefault();
  }
}

app.addEventListener('click', deleteHandler, false);
app.addEventListener('click', editHandler, false);

Router.navigate(currentPath, app);
