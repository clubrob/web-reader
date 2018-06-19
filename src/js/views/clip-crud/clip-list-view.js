const clipListView = function(clips) {
  let html = '';
  clips.forEach(clip => {
    html += `
        <li class="clip">
          <div class="card">
            <div class="card__head">
              <h3 class="card__head__title">
                <a href="/read?url=${clip.url}" target="_blank">
                  ${clip.title}
                </a>
              </h3>
            </div>
            <div class="card__body">
            <p class="card__body__text">
              ${clip.summary}
            </p>
            </div>
            <div class="card__footer">
              <div class="card__footer__date">
                <p>Saved: ${clip.date}</p>
              </div>
              <div class="card__footer__share">
              </div>
              <div class="card__footer__modify">
                <a href="${clip.url}" target="_blank">Original</a>
                <a href="/edit/${clip.slug}" id="edit-clip">Edit</a>
                <a href="/delete/${clip.slug}" id="delete-clip">Delete</a>
              </div>
            </div>
          </div>
        </li>
      `;
  });
  return `<ul id="clip-list" class="cards">${html}</ul>`;
};

module.exports = clipListView;
