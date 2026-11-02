const r = require("./16.js");
module.exports = e => {
  try {
    const t = e.match(/^data:([/-\w\d]*);base64,/i);
    if (t) {
      const n = t[1].toLowerCase();
      const i = e.substring(t[0].length);
      const s = r.base64ToUint8Array(i);
      return new Response(s, {
        headers: {
          "content-type": n,
          "content-length": s.byteLength
        }
      });
    }
  } catch (e) {}
  return null;
};