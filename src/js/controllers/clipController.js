const Clips = (function() {
  const endpoint =
    'https://us-central1-web-reader-api.cloudfunctions.net/reader';
  // const endpoint = 'http://localhost:5001/web-reader-api/us-central1/reader';

  const authState = {
    token: null
  };

  return {
    setAuthState: function(token) {
      authState.token = token;
    },
    clipsView: function() {
      const clipListView = require('../views/clip-list-view');
      return fetch(`${endpoint}/read`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => {
          return clipListView(data);
        })
        .catch(err => console.log(err.message));
    },
    addClip: function() {
      const createClipView = require('../views/clip-crud/clip-create-view');
      return createClipView();
    },
    createClip: async function(clip) {
      await fetch(`${endpoint}/save`, {
        body: JSON.stringify(clip),
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        method: 'post',
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => {
          window.location.replace(`../read?s=${res.slug}`);
          return;
        })
        .catch(err => console.log(err.message));
    },
    readClip: function(slug) {
      const readClipView = require('../views/clip-crud/clip-read-view');

      const s = slug.split('=')[1];
      return fetch(`${endpoint}/read/${s}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
        .then(response => response.json())
        .then(response => {
          return readClipView(response[0]);
        })
        .catch(err => console.log(err.message));
    },
    deleteClip: function(slug) {
      const s = slug.split('=')[1];
      const deleteView = require('../views/clip-crud/clip-delete-view.js');
      return fetch(`${endpoint}/delete/${s}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
        .then(() => window.location.replace('../list'))
        .catch(err => console.log(err.message));
    },
    editClip: function(slug) {
      const editClipView = require('../views/clip-crud/clip-update-view');

      const s = slug.split('=')[1];
      return fetch(`${endpoint}/read/${s}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
        .then(response => response.json())
        .then(response => {
          return editClipView(response[0]);
        })
        .catch(err => console.log(err.message));
    },
    updateClip: function(clip) {
      const slug = clip.slug;
      fetch(`${endpoint}/save/${slug}`, {
        body: JSON.stringify(clip),
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        method: 'put'
      })
        .then(res => {
          window.location.replace(`../read?s=${slug}`);
          return;
        })
        .catch(err => console.log(err.message));
    },
    tagClipList: function(t) {
      console.log(t.substr(2));
      return t;
    }
  };
})();

module.exports = Clips;
