const Clips = function() {};

Clips.prototype.clipsView = function() {
  const clipListView = require('../views/clip-crud/clip-list-view');
  return fetch('http://localhost:5000/api')
    .then(response => response.json())
    .then(data => clipListView(data))
    .catch(err => console.log(err.message));
};

Clips.prototype.readClip = function(s) {
  const readClipView = require('../views/clip-crud/read-clip-view');
  const slug = s.split('=')[1];
  return fetch(`http://localhost:5000/api/read?s=${slug}`)
    .then(response => response.json())
    .then(response => {
      return readClipView(response);
    })
    .catch(err => console.log(err.message));
};

Clips.prototype.deleteClip = function(slug) {
  console.log(slug);
  return slug;
};

Clips.prototype.editClip = function(slug) {
  console.log(slug);
  return slug;
};

module.exports = Clips;
