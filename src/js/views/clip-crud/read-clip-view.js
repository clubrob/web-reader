const readClip = function(clip) {
  const readMe = `
    <article class="clip">
    <h1>${clip.title}</h1>
    <div>${clip.content}</div>
    </article>
  `;
  return readMe;
};

module.exports = readClip;
