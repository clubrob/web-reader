javascript:function clipMe() {
  var l = document.location;
  window.location = 'http://localhost:5000/api/save?url=' + l;
}
clipMe();
