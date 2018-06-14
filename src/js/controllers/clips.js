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

  var clips = '';

  fetch('http://localhost:5000/api')
    .then(response => response.json())
    .then(data => {
      clips += clipListView(data);
    })
    .catch(err => console.log(err.message));

  console.log(clips);

  return {
    /* clipListView: clipListView(clips), */
    readClip: function() {
      const url = queryStripper(window.location.search);

      fetch(`http://localhost:5000/api/read?url=${url}`)
        .then(response => response.json())
        .then(response => {
          const clip = readClipView(response);
          document.querySelector('#app').innerHTML = clip;
        })
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
