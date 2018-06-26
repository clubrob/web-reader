function createClipView() {
  const addClip = `<h3>Add by URL</h3>
<div id="add-url-form" class="form">
  <div class="form__field">
    <label class="form__field__label" for="add-url-form-url">URL</label>
    <input class="form__field__text" type="text" name="add-url-form-url" id="add-url-form-url" value="">
  </div>
  <div class="form__field">
    <label for="add-url-form-tags" class="form__field__label">Tags</label>
    <div class="form__field__tag__group">
      <input type="text" name="add-url-form-tags" id="add-url-form-tags" class="form__field__text form__field__text--tag"">
      <div class="tag-holder"><span class="tag-span">butts<span class="tag-delete"></span></span><span class="tag-span">gerkins<span class="tag-delete"></span></span></div>
    </div>
  </div>
</div>
<h3>Add Manually</h3>
<div id="add-manual-form" class="form">
  <div class="form__field">
    <label class="form__field__label" for="add-manual-form-title">Title</label>
    <input class="form__field__text" type="text" name="add-manual-form-title" id="add-manual-form-title">
  </div>
  <div class="form__field">
    <label for="add-manual-form-url" class="form__field__label">URL</label>
    <input type="text" name="add-manual-form-url" id="add-manual-form-url" class="form__field__text">
  </div>
  <div class="form__field">
    <label for="add-manual-form-summary" class="form__field__label">Summary</label>
    <textarea class="form__field__textarea" name="add-manual-form-summary" id="add-manual-form-summary" cols="30" rows="10"></textarea>
  </div>
  <div class="form__field">
    <label for="add-manual-form-tags" class="form__field__label">Tags</label>
    <div class="form__field__tag__group">
      <input type="text" name="add-manual-form-tags" id="add-manual-form-tags" class="form__field__text form__field__text--tag">
      <div class="tag-holder"></div>
    </div>
  </div>
</div>
<div class="form">
    <div class="form__field">
      <button class="form__field__button" id="add-clip">Add Link</button>
    </div>
</div>`;
  return addClip;
}

module.exports = createClipView;
