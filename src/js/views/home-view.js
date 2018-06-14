const homeView = `
  <form action="http://localhost:5000/api/save" method="post">
    <input type="text" name="url" id="url">
    <button type="submit" id="submit-clip">Add Link</button>
  </form>
`;

module.exports = homeView;
