const UI = (function() {
  const UIElements = {
    app: document.querySelector('#app'),
    logoutButton: document.querySelector('#sign-out-button')
  };

  return {
    getUIElements: function() {
      return UIElements;
    }
  };
})();

module.exports = UI;
