javascript: function clippit() {
  var d = document, 
  z = d.createElement('scr' + 'ipt'), 
  b = d.body, 
  l = d.location;

  try {
    if (!b) throw (0);
    d.title = '(Saving...) ' + d.title;
    z.setAttribute('src', 
    'http://localhost:5000/api/save?url=' + encodeURIComponent(l.href));
    b.appendChild(z);
  } catch (e) {
    alert('Please wait until the page has loaded.');
  }
}
clippit();
void(0)