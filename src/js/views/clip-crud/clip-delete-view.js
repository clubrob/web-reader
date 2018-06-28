function deleteClipView() {
  const deleteMe = `
    <article class="delete-view">
      <p class="loading">
        <img src="https://www.dropbox.com/s/iomyktx4k6x97mf/3.gif?raw=1" alt="waiting">
      </p>
    </article>
  `;
  return deleteMe;
}

module.exports = deleteClipView;
