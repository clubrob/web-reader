const Home = (function() {
  const homeView = require('../views/home-view.js');

  return {
    indexView: function() {
      return homeView;
    },
  };
})();

module.exports = Home;
