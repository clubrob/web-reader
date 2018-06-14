const Router = (function() {
  const routes = [];

  return {
    setRoute: function(route) {
      routes.push(route);
    },
    getRoutes: function() {
      return routes;
    },
    navigate: function(path) {
      return routes.filter(r => r.path === path);
    }
  };
})();

module.exports = Router;
