const Clips = (function() {
  const clipListView = require('../views/clip-crud/clip-list-view'),
    readClipView = require('../views/clip-crud/read-clip-view');

  return {
    clipsView: function() {
      return fetch('http://localhost:5000/api')
        .then(response => response.json())
        .then(data => clipListView(data))
        .catch(err => console.log(err.message));
    },
    readClip: function() {
      if (window.location.search.indexOf('=') > 0) {
        const slug = window.location.search.split('=')[1];
        return fetch(`http://localhost:5000/api/read?s=${slug}`)
          .then(response => response.json())
          .then(response => readClipView(response))
          .catch(err => console.log(err.message));
      }
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
