const Router = (function() {
  const routes = [];

  return {
    getContent: function(route, callback) {
      const routesArr = routes;

      for (let i = 0; i < routesArr.length; i++) {
        if (routesArr[i]['path'] === route.view) {
          // Passing route params and invoking view function
          callback(routesArr[i]['view'](route.params));
        }
      }
    },
    setRoute: function(path, view) {
      const newRoute = {
        path: path,
        view: view,
      };
      routes.push(newRoute);
    },
    navigate: function(route, container) {
      // Splitting route params into route
      let routeObj;
      if (route.indexOf('?') > 0) {
        routeObj = {
          view: route.split('?')[0],
          params: route.split('?')[1],
        };
      } else {
        routeObj = { view: route, params: null };
      }
      this.getContent(routeObj, (content, params) => {
        // Conditional to handle async or static view functions
        if (content && typeof content.then === 'function') {
          content
            .then(result => {
              window.history.pushState({ path: route }, '', route);
              return (container.innerHTML = result);
            })
            .catch(err => console.error(err.message));
        } else {
          window.history.pushState({ path: route }, '', route);
          container.innerHTML = content;
        }
      });
    },
  };
})();

module.exports = Router;
