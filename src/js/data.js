import { firebase } from './services/firebase';
/* import tempData from './tempdata/data.json'; */

const DataCtrl = (function() {
  // Initialize Cloud Firestore through Firebase
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });

  const clipsRef = db.collection('clips');

  const Clip = function(id, date, title, url, summary) {
    this.id = id;
    this.date = new Date(date.seconds * 1000);
    this.title = title;
    this.url = url;
    this.summary = summary;
  };

  return {
    getClip: function(id) {},
    getClips: function() {
      const clipsList = [];
      /* tempData.forEach((clip) => {
        clipsList.push(new Clip(clip.id, clip.date, clip.title, clip.url, clip.summary));
      }); */

      return clipsRef
        .orderBy('date', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(clip => {
            clipsList.push(
              new Clip(
                clip.id,
                clip.data().date,
                clip.data().title,
                clip.data().url,
                clip.data().summary
              )
            );
          });
          return clipsList;
        });
    },
    saveClip: function(clip) {
      /* db.collection("clips").add(clip)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        }); */
    },
    updateClip: function(clip) {},
    deleteClip: function(clip) {}
  };
})();

export default DataCtrl;
