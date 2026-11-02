module.exports = function (e, t) {
  t ||= {};
  if (typeof (e = e && e.__esModule ? e.default : e) != "string") {
    return e;
  } else {
    if (/^['"].*['"]$/.test(e)) {
      e = e.slice(1, -1);
    }
    if (t.hash) {
      e += t.hash;
    }
    if (/["'() \t\n]/.test(e) || t.needQuotes) {
      return `"${e.replace(/"/g, "\\\"").replace(/\n/g, "\\n")}"`;
    } else {
      return e;
    }
  }
};