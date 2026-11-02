var r = require("./22.js");
module.exports = function (e, t, n) {
  var i = "Failed to unzip and extract project.json, with error: ";
  return r.loadAsync(e).then(function (e) {
    const r = t ? e.file(/^([^/]*\/)?sprite\.json$/)[0] : e.file(/^([^/]*\/)?project\.json$/)[0];
    if (r) {
      return r.async("string").then(function (t) {
        return n(null, [t, e]);
      });
    } else {
      return n(i + "missing project or sprite json");
    }
  }).catch(function (e) {
    return n(i + e);
  });
};