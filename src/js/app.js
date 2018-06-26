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
Router.setRoute('/add', Clip.addClip());
// Pass function ref instead of function invocation if using URL params
// Function is invoked at the router
Router.setRoute('/read', Clip.readClip);
Router.setRoute('/delete', Clip.deleteClip);

// Event handlers
function addClipHandler(event) {
  const btn = event.target;
  if (btn && btn.matches('#add-clip')) {
    const url = document.querySelector('#clip-url').value;

    // Clip.createClip(url);
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

// Event listeners
window.addEventListener('popstate', () => {
  Router.navigate(window.history.state.path, app);
});

document.addEventListener('click', event => {
  const link = event.target;

  if (link && link.matches('a')) {
    const href = event.target.attributes.href.value;
    window.history.pushState({ path: href }, '', href);
    Router.navigate(href, app);
    event.preventDefault();
  }
});

app.addEventListener('click', addClipHandler);
app.addEventListener('keyup', tagInputHandler);
app.addEventListener('click', tagDeleteHandler);

window.history.pushState({ path: currentPath }, '', currentPath);
Router.navigate(currentPath, app);
