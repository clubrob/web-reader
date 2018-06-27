function updateClipView(clip) {
  const tags = clip.tags;
  let tagGroup = '';
  tags.forEach(tag => {
    tagGroup += `<span class="tag-span">${tag}<span class="tag-delete"></span></span>`;
  });
  const editClip = `<div id="edit-manual-form" class="form">
  <h3>Edit</h3>
  <div class="form__field">
    <label class="form__field__label" for="edit-manual-form-title">Title</label>
    <input class="form__field__text" type="text" name="edit-manual-form-title" id="edit-manual-form-title" 
    value="${clip.title}">
  </div>
  <div class="form__field">
    <label for="edit-manual-form-url" class="form__field__label">URL</label>
    <input disabled type="text" name="edit-manual-form-url" id="edit-manual-form-url" class="form__field__text" 
    value="${clip.url}">
  </div>
  <div class="form__field">
    <label for="edit-manual-form-summary" class="form__field__label">Summary</label>
    <textarea class="form__field__textarea" name="edit-manual-form-summary" id="edit-manual-form-summary" cols="30" rows="10">${clip.summary}</textarea>
  </div>
  <div class="form__field">
    <label for="edit-manual-form-tags" class="form__field__label">Tags</label>
    <div class="form__field__tag__group">
      <input type="text" name="edit-manual-form-tags" id="edit-manual-form-tags" class="form__field__text form__field__text--tag">
      <div class="tag-holder">
        ${tagGroup}
      </div>
    </div>
  </div>
  <div class="form__field">
    <button class="form__field__button" id="edit-manual-form-submit">Save</button>
  </div>
</div>`;
  return editClip;
}

module.exports = updateClipView;
