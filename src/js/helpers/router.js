const Router = function() {
  this.routes = {};
};

Router.prototype.getContent = function(view, cb) {
  cb(this.routes[view]);
};

Router.prototype.setRoute = function(path, view) {
  this.routes[path] = view;
};

Router.prototype.navigate = function(view, container) {
  this.getContent(view, content => {
    console.log('NAVIGATE view', view);
    console.log('NAVIGATE pathname', window.location.pathname);
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
