function readClipView(clip) {
  const readMe = `
    <article class="readable-clip">
      <h2>${clip.title}</h2>
      ${clip.readable}
    </article>
  `;
  return readMe;
}

module.exports = readClipView;
