const UI = require('./components/ui.js');

fetch('http://localhost:5000/api')
  .then(response => response.json())
  .then(data => {
    UI.populateList(data);
    console.log(data);
  });
