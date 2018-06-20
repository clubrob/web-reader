const auth = require('../helpers/auth.js');

const Login = (function() {
  const loginView = require('../views/login-view.js');

  return {
    loginView: function() {
      return loginView;
    }
  };
})();

module.exports = Login;
