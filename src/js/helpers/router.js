const Router = function() {
  this.routes = [];
};

Router.prototype.getContent = function(route, callback) {
  if (route.params) {
    // Passing route params and invoking view function
    callback(this.routes[route.view](route.params));
  } else {
    callback(this.routes[route.view]);
  }
};

Router.prototype.setRoute = function(path, view, safe) {
  const newRoute = {
    path: path,
    view: view,
    safe: safe
  };
  this.routes.push(newRoute);
};

Router.prototype.navigate = function(route, container) {
  // Splitting route params into route
  if (route.indexOf('?') > 0) {
    route = {
      view: route.split('?')[0],
      params: route.split('?')[1]
    };
  } else {
    route = { view: route, params: null };
  }
  this.getContent(route, (content, params) => {
    // Conditional to handle async or static view functions
    if (content && typeof content.then === 'function') {
      content.then(result => {
        container.innerHTML = result;
      });
    } else {
      container.innerHTML = content;
    }
  });
};

module.exports = Router;
