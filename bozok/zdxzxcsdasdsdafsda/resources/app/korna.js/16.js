const r = require("./114.js");
const i = require("./116.js");
class s {
  static base64ToUint8Array(e) {
    const t = r(e);
    const n = t.length;
    const i = new Uint8Array(n);
    for (let e = 0; e < n; e++) {
      i[e] = t.charCodeAt(e);
    }
    return i;
  }
  static uint8ArrayToBase64(e) {
    let t = "";
    const n = e.length;
    for (let r = 0; r < n; r++) {
      t += String.fromCharCode(e[r]);
    }
    return i(t);
  }
  static arrayBufferToBase64(e) {
    return s.uint8ArrayToBase64(new Uint8Array(e));
  }
}
module.exports = s;