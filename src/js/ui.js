const UICtrl = (function () {
  const UISelectors = {
    clipUrl: '#clip-url',
    submitClip: '#submit-clip',
    clipList: '#clip-list'
  }

  return {
    populateList: function (clips) {
      let html = '';
      clips.forEach((clip) => {
        html += `
          <li class="clip" data-doc=${clip.id}>
            <div class="card">
              <div class="card__head">
                <h3><a href="${clip.url}" target="_blank">${clip.title}</a></h3>
              </div>
              <div class="card__body">
                ${clip.summary}
              </div>
              <div class="card__footer">
                <div class="date">
                  <p>Saved: ${clip.date.toDateString()}</p>
                </div>
                <div class="share">
                </div>
                <div class="modify">
                </div>
              </div>
            </div>
          </li>
        `;
      });
      // Insert into DOM
      document.querySelector(UISelectors.clipList).innerHTML = html;
    },
    addListItem: function (clip) {

    },
    deleteListItem: function (clip) {

    },
    getUISelectors: function () {
      return UISelectors;
    }
  }
})();

export default UICtrl;