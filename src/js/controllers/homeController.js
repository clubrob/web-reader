const Home = (function() {
  // const endpoint =
  //   'https://us-central1-web-reader-api.cloudfunctions.net/reader';
  const endpoint = 'http://localhost:5001/web-reader-api/us-central1/reader';

  return {
    indexView: function() {
      const homeView = require('../views/home-view.js');
      const homeTagView = require('../views/clip-list-view.js');

      return fetch(`${endpoint}/featured`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'get',
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          return homeView + homeTagView(res);
        })
        .catch(err => console.error(err.message));
    },
  };
})();

module.exports = Home;
