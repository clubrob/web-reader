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
Router.setRoute('/edit', Clip.readClip);
Router.setRoute('/delete', Clip.deleteClip);
Router.setRoute('/tag', Clip.tagClipList);

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

    // console.log(clip);
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
    // console.log(clip);
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

    // console.log(clip);
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

app.addEventListener('click', addClipUrlHandler);
app.addEventListener('click', addClipManualHandler);
app.addEventListener('click', updateClipHandler);
app.addEventListener('keyup', tagInputHandler);
app.addEventListener('click', tagDeleteHandler);

window.history.pushState({ path: currentPath }, '', currentPath);
Router.navigate(currentPath, app);
