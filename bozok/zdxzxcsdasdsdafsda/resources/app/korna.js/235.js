var r = window.URL || window.webkitURL;
module.exports = function (e, t) {
  try {
    try {
      var n;
      try {
        (n = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder)()).append(e);
        n = n.getBlob();
      } catch (t) {
        n = new Blob([e]);
      }
      return new Worker(r.createObjectURL(n));
    } catch (t) {
      return new Worker("data:application/javascript," + encodeURIComponent(e));
    }
  } catch (e) {
    if (!t) {
      throw Error("Inline worker is not supported");
    }
    return new Worker(t);
  }
};