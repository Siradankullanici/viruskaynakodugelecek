function n(e, t, n) {
  return (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]);
}
module.exports = function (e) {
  var t;
  var r = function (e) {
    var t = [];
    for (var r = 0; r < e.length; r++) {
      while (t.length >= 2 && n(t[t.length - 2], t[t.length - 1], e[r]) <= 0) {
        t.pop();
      }
      t.push(e[r]);
    }
    t.pop();
    return t;
  }(e);
  var i = function (e) {
    for (var t = e.reverse(), r = [], i = 0; i < t.length; i++) {
      while (r.length >= 2 && n(r[r.length - 2], r[r.length - 1], t[i]) <= 0) {
        r.pop();
      }
      r.push(t[i]);
    }
    r.pop();
    return r;
  }(e);
  (t = i.concat(r)).push(e[0]);
  return t;
};