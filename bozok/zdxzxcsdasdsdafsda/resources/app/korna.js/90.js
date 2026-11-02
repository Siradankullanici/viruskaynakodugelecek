var r;
var i;
i = require("./281.js");
r = function () {
  function e(e) {
    var t;
    var n;
    var r;
    if ((t = typeof e.readUInt32BE == "function" && typeof e.slice == "function") || e instanceof Uint8Array) {
      if (t) {
        this.highStart = e.readUInt32BE(0);
        this.errorValue = e.readUInt32BE(4);
        n = e.readUInt32BE(8);
        e = e.slice(12);
      } else {
        r = new DataView(e.buffer);
        this.highStart = r.getUint32(0);
        this.errorValue = r.getUint32(4);
        n = r.getUint32(8);
        e = e.subarray(12);
      }
      e = i(e, new Uint8Array(n));
      e = i(e, new Uint8Array(n));
      this.data = new Uint32Array(e.buffer);
    } else {
      this.data = e.data;
      this.highStart = e.highStart;
      this.errorValue = e.errorValue;
    }
  }
  e.prototype.get = function (e) {
    var t;
    if (e < 0 || e > 1114111) {
      return this.errorValue;
    } else if (e < 55296 || e > 56319 && e <= 65535) {
      t = (this.data[e >> 5] << 2) + (e & 31);
      return this.data[t];
    } else if (e <= 65535) {
      t = (this.data[2048 + (e - 55296 >> 5)] << 2) + (e & 31);
      return this.data[t];
    } else if (e < this.highStart) {
      t = this.data[2080 + (e >> 11)];
      t = ((t = this.data[t + (e >> 5 & 63)]) << 2) + (e & 31);
      return this.data[t];
    } else {
      return this.data[this.data.length - 4];
    }
  };
  return e;
}();
module.exports = r;