const loginView = `
  <h1>Log In</h1>
  <form class="form" id="login-form">
    <div class="form__field">
      <label for="app_email" class="form__field__label">Email</label>
      <input type="text" name="app_email" id="app_email" class="form__field__text">
    </div>
    <div class="form__field">
      <label for="app_password" class="form__field__label">Password</label>
      <input type="password" name="app_password" id="app_password" class="form__field__text">
    </div>
    <div class="form__field">
      <button id="sign-in-button" class="form__field__button">Sign In</button>
    </div>
  </form>
`;

module.exports = loginView;
