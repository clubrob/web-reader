const Clips = function() {};
const endpoint = 'http://localhost:5000/api';

Clips.prototype.clipsView = function() {
  const clipListView = require('../views/clip-list-view');
  return fetch(endpoint)
    .then(response => response.json())
    .then(data => clipListView(data))
    .catch(err => console.log(err.message));
};

Clips.prototype.addClip = function() {
  const createClipView = require('../views/clip-crud/clip-create-view');
  return createClipView();
};

Clips.prototype.createClip = async function(clip) {
  await fetch(`${endpoint}/save`, {
    body: JSON.stringify(clip),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  })
    .then(res => res.json())
    .then(res => {
      window.location.replace(`../read?s=${res.slug}`);
    })
    .catch(err => console.log(err.message));
};

Clips.prototype.readClip = function(s) {
  var viewFunction;
  if (window.location.pathname === '/read') {
    viewFunction = require('../views/clip-crud/clip-read-view');
  }
  if (window.location.pathname === '/edit') {
    viewFunction = require('../views/clip-crud/clip-update-view.js');
  }
  const slug = s.split('=')[1];
  return fetch(`${endpoint}/read?s=${slug}`)
    .then(response => response.json())
    .then(response => {
      return viewFunction(response);
    })
    .catch(err => console.log(err.message));
};

Clips.prototype.deleteClip = function(s) {
  const slug = s.split('=')[1];
  const deleteView = require('../views/clip-crud/clip-delete-view.js');
  return fetch(`${endpoint}/clip/${slug}`, {
    method: 'DELETE',
    mode: 'cors'
  })
    .then(() => window.location.replace('../list'))
    .catch(err => console.log(err.message));
};

Clips.prototype.editClip = function(clip) {
  const slug = clip.slug;
  fetch(`${endpoint}/clip/${slug}`, {
    body: JSON.stringify(clip),
    mode: 'cors',
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT'
  })
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
};

Clips.prototype.tagClipList = function(t) {
  console.log(t.substr(2));
  return t;
};

module.exports = Clips;
