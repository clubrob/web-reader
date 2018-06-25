function createClipView() {
  const addClip = `
    <div id="add-url-form">
      <label for="clip-url">Link to save:</label>
      <input type="text" name="clip-url" id="clip-url" value="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters">
      <button id="add-clip">Add Link</button>
    </div>
    `;
  return addClip;
}

module.exports = createClipView;
