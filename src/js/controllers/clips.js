const Clips = (function() {
  const clipListView = require('../views/clip-list-view.js'),
    readClipView = require('../views/read-clip-view.js');

  const UISelectors = {
    clipUrl: '#clip-url',
    submitClip: '#submit-clip',
    clipList: '#clip-list'
  };

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
    addListItem: function(clip) {},
    deleteListItem: function(clip) {},
    getUISelectors: function() {
      return UISelectors;
    }
  };
})();

module.exports = Clips;
