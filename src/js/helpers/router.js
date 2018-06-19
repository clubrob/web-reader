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
    navigate: function(view) {
      getContent(view, content => {
        // console.log('getContent', routes);
        if (typeof content.then === 'function') {
          content.then(result => {
            app.innerHTML = result;
          });
        } else {
          app.innerHTML = content;
        }
      });
      /* return routes.filter(r => r.path === path); */
    }
  };
})();

module.exports = Router;
