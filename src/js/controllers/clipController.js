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
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        method: 'get',
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => clipListView(res))
        .catch(err => console.error(err.message));
    },
    addClip: function() {
      const createClipView = require('../views/clip-crud/clip-create-view');
      return createClipView();
    },
    createClip: function(clip) {
      return fetch(`${endpoint}/save`, {
        body: JSON.stringify(clip),
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        method: 'post',
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err.message));
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
        .then(res => res.json())
        .then(res => readClipView(res[0]))
        .catch(err => console.error(err.message));
    },
    deleteClip: function(slug) {
      return fetch(`${endpoint}/delete/${slug}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
        .then(res => res)
        .catch(err => console.error(err.message));
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
        .then(res => res.json())
        .then(res => editClipView(res[0]))
        .catch(err => console.error(err.message));
    },
    updateClip: async function(clip) {
      const slug = clip.slug;
      await fetch(`${endpoint}/save/${slug}`, {
        body: JSON.stringify(clip),
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        method: 'put'
      })
        .then(res => res)
        .catch(err => console.error(err.message));
    },
    tagClipList: function(tag) {
      console.log(tag.substr(2));
      return tag;
    }
  };
})();

module.exports = Clips;
