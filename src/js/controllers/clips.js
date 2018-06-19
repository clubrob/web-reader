const Clips = (function() {
  const clipListView = require('../views/clip-crud/clip-list-view'),
    readClipView = require('../views/clip-crud/read-clip-view');

  function queryStripper(url) {
    // Remove '?url=' from window.location.search
    return url.substr(5);
  }

  return {
    clipsView: function() {
      return fetch('http://localhost:5000/api')
        .then(response => response.json())
        .then(data => clipListView(data))
        .catch(err => console.log(err.message));
    },
    readClip: function() {
      const url = queryStripper(window.location.search);

      return fetch(`http://localhost:5000/api/read?url=${url}`)
        .then(response => response.json())
        .then(response => readClipView(response))
        .catch(err => console.log(err.message));
    },
    deleteClip: function(slug) {
      console.log(slug);
      return slug;
    },
    editClip: function(slug) {
      console.log(slug);
      return slug;
    }
  };
})();

module.exports = Clips;
