const Router = require('./helpers/router.js');
// Controllers
const Clips = require('./controllers/clips'),
  Login = require('./controllers/login'),
  Home = require('./controllers/home');

const app = document.querySelector('#app');

const currentPath = window.location.pathname;

Router.setRoute({
  path: '/',
  view: Home.indexView
});
/* Router.setRoute({ path: '/list', view: Clips.populateList() }); */
Router.setRoute({
  path: '/login',
  view: Login.loginView
});
/* Router.setRoute('/read', { view: Home.indexView }); */

console.log('routes', Router.getRoutes());
//console.log('view', Router.navigate(currentPath)[0].view);
console.log('path', currentPath);
// const path = window.location.pathname;
app.innerHTML =
  typeof Router.navigate(currentPath)[0] !== 'undefined'
    ? Router.navigate(currentPath)[0].view
    : '404';
// Read Clip
/* app.innerHTML = Clips.readClip(); */
