const Clips = function() {
  this.clipListView = require('../views/clip-crud/clip-list-view');
  this.readClipView = require('../views/clip-crud/read-clip-view');
};

Clips.prototype.clipsView = function() {
  return fetch('http://localhost:5000/api')
    .then(response => response.json())
    .then(data => this.clipListView(data))
    .catch(err => console.log(err.message));
};

Clips.prototype.readClip = function() {
  if (window.location.search.indexOf('=') > 0) {
    const slug = window.location.search.split('=')[1];
    console.log('READCLIP Search', window.location.search);
    console.log('READCLIP slug', slug);
    return fetch(`http://localhost:5000/api/read?s=${slug}`)
      .then(response => response.json())
      .then(response => this.readClipView(response))
      .catch(err => console.log(err.message));
  }
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
