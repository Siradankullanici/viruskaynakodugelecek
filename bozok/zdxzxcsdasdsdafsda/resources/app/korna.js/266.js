function n(e, t, n, r, i, s) {
  var o = (s - t) * (n - e) - (r - t) * (i - e);
  return o > 0 || !(o < 0);
}
module.exports = function (e, t) {
  var r = e[0][0];
  var i = e[0][1];
  var s = e[1][0];
  var o = e[1][1];
  var a = t[0][0];
  var c = t[0][1];
  var l = t[1][0];
  var u = t[1][1];
  return n(r, i, a, c, l, u) !== n(s, o, a, c, l, u) && n(r, i, s, o, a, c) !== n(r, i, s, o, l, u);
};