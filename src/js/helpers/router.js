const Router = function() {
  this.routes = {};
};

Router.prototype.getContent = function(view, cb) {
  cb(this.routes[view]);
};

Router.prototype.setRoute = function(path, view) {
  this.routes[path] = view;
};

Router.prototype.navigate = function(route, container) {
  this.getContent(route, content => {
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
