const clipListView = function(clips) {
  let html = '';
  clips.forEach(clip => {
    let tagGroup = '';
    const tags = Object.keys(clip.tags);
    tags.forEach(tag => {
      tagGroup += `<a class="tag-span" href="/tag?t=${tag}">${tag}</a>`;
    });
    html += `
        <li class="clip">
          <div class="card">
            <div class="card__head">
              <h3 class="card__head__title">
                <a href="/read?s=${clip.slug}" class="read-link">
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
                <p>${tagGroup}</p>
              </div>
              <div class="card__footer__share">
              </div>
              <div class="card__footer__modify">
                <a href="${clip.url}" target="_blank">Original</a>
                <a href="/edit?s=${clip.slug}" id="edit-clip">Edit</a>
                <a href="/delete?s=${clip.slug}" id="delete-clip">Delete</a>
              </div>
            </div>
          </div>
        </li>
      `;
  });
  return `<ul id="clip-list" class="cards">${html}</ul>`;
};

module.exports = clipListView;
