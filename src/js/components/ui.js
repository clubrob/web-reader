const UI = (function() {
  const UISelectors = {
    clipUrl: '#clip-url',
    submitClip: '#submit-clip',
    clipList: '#clip-list'
  };

  return {
    populateList: function(clips) {
      let html = '';
      clips.forEach(clip => {
        html += `
          <li class="clip">
            <div class="card">
              <div class="card__head">
                <h3><a href="${clip.url}" target="_blank">${clip.title}</a></h3>
              </div>
              <div class="card__body">
                ${clip.summary}
              </div>
              <div class="card__footer">
                <div class="date">
                  <p>Saved: ${clip.date}</p>
                </div>
                <div class="share">
                </div>
                <div class="modify">
                  <a href="/edit/${clip.slug}">Edit</a> | 
                  <a href="/delete/${clip.slug}">Delete</a>
                </div>
              </div>
            </div>
          </li>
        `;
      });
      // Insert into DOM
      document.querySelector(UISelectors.clipList).innerHTML = html;
    },
    addListItem: function(clip) {},
    deleteListItem: function(clip) {},
    getUISelectors: function() {
      return UISelectors;
    }
  };
})();

module.exports = UI;
