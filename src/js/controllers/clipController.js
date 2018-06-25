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
  const body = { url: clip };
  console.log(body);
  await fetch(`${endpoint}/save`, {
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
    .then(res => res.json())
    .catch(err => console.log(err.message));
};

Clips.prototype.readClip = function(s) {
  const readClipView = require('../views/clip-crud/clip-read-view');
  const slug = s.split('=')[1];
  return fetch(`${endpoint}/read?s=${slug}`)
    .then(response => response.json())
    .then(response => {
      return readClipView(response);
    })
    .catch(err => console.log(err.message));
};

Clips.prototype.deleteClip = function(s) {
  const slug = s.split('=')[1];
  console.log(slug);
  fetch(`${endpoint}/clip/${slug}`, {
    method: 'DELETE'
  })
    .then(() => {
      window.history.back();
      window.location.reload();
    })
    .catch(err => console.log(err.message));
};

Clips.prototype.editClip = function(s) {
  console.log(s);
  return s;
};

module.exports = Clips;
