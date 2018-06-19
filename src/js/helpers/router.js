const Router = (function() {
  const routes = {};

  const getContent = function(view, cb) {
    cb(routes[view]);
  };

  return {
    setRoute: function(path, view) {
      routes[path] = view;
    },
    getRoutes: function() {
      return routes;
    },
    navigate: function(view, container) {
      getContent(view, content => {
        // Conditional to handle async or static view functions
        if (typeof content.then === 'function') {
          content.then(result => {
            container.innerHTML = result;
          });
        } else {
          container.innerHTML = content;
        }
      });
    }
  };
})();

module.exports = Router;
