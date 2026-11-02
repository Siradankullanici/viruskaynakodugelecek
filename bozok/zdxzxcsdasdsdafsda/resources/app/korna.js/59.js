module.exports = function (e, t) {
  if (typeof e == "string" && t[e]) {
    return e;
  }
  var n = [].concat(e || []);
  for (var r = 0, i = n.length; r < i; ++r) {
    for (var s = n[r].split("-"); s.length;) {
      var o = s.join("-");
      if (t[o]) {
        return o;
      }
      s.pop();
    }
  }
};