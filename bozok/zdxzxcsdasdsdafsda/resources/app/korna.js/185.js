var n = {
  amp: "&",
  apos: "'",
  lt: "<",
  gt: ">",
  quot: "\"",
  nbsp: "\xA0"
};
var r = /&([a-z]+);/gi;
module.exports = function (e) {
  return e.replace(r, function (e, t) {
    t = t.toLowerCase();
    if (n.hasOwnProperty(t)) {
      return n[t];
    } else {
      return e;
    }
  });
};