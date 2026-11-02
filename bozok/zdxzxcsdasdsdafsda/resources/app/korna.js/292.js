const r = require("./293.js");
const i = require("./37.js");
const s = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767];
const o = [-1, -1, -1, -1, 2, 4, 6, 8, -1, -1, -1, -1, 2, 4, 6, 8];
let a = null;
module.exports = class {
  constructor(e) {
    this.audioContext = e;
  }
  static get STEP_TABLE() {
    return s;
  }
  static get INDEX_TABLE() {
    return o;
  }
  decode(e) {
    return new Promise((t, n) => {
      const s = new r(e);
      if (s.readUint8String(4) !== "RIFF") {
        i.warn("incorrect adpcm wav header");
        n(new Error("incorrect adpcm wav header"));
      }
      const o = s.readInt32();
      if (o + 8 !== e.byteLength) {
        i.warn(`adpcm wav length in header: ${o} is incorrect`);
      }
      if (s.readUint8String(4) !== "WAVE") {
        i.warn("incorrect adpcm wav header");
        n(new Error("incorrect adpcm wav header"));
      }
      const a = this.extractChunk("fmt ", s);
      this.encoding = a.readUint16();
      this.channels = a.readUint16();
      this.samplesPerSecond = a.readUint32();
      this.bytesPerSecond = a.readUint32();
      this.blockAlignment = a.readUint16();
      this.bitsPerSample = a.readUint16();
      a.position += 2;
      this.samplesPerBlock = a.readUint16();
      this.adpcmBlockSize = (this.samplesPerBlock - 1) / 2 + 4;
      const c = this.extractChunk("data", s);
      const l = this.numberOfSamples(c, this.adpcmBlockSize);
      const u = this.audioContext.createBuffer(1, l, this.samplesPerSecond);
      this.imaDecompress(c, this.adpcmBlockSize, u.getChannelData(0));
      t(u);
    });
  }
  extractChunk(e, t) {
    for (t.position = 12; t.position < t.getLength() - 8;) {
      const n = t.readUint8String(4);
      const r = t.readInt32();
      if (n === e) {
        return t.extract(r);
      }
      t.position += r;
    }
  }
  numberOfSamples(e, t) {
    if (!e) {
      return 0;
    }
    e.position = 0;
    const n = e.getBytesAvailable();
    return (n / t | 0) * ((t - 4) * 2) + 1 + Math.max(n % t - 4, 0) * 2 + Math.min(n % t, 1);
  }
  imaDecompress(e, t, n) {
    let r;
    let i;
    let c;
    let l = 0;
    let u = -1;
    if (!e) {
      return;
    }
    e.position = 0;
    const h = n.length;
    const d = (t - 4) * 2;
    const p = function () {
      if (a === null) {
        const e = s.length;
        const t = o.length;
        a = new Array(e * t).fill(0);
        let n = 0;
        for (let r = 0; r < e; r++) {
          for (let e = 0; e < t; e++) {
            const t = s[r];
            let i = 0;
            if (e & 4) {
              i += t;
            }
            if (e & 2) {
              i += t >> 1;
            }
            if (e & 1) {
              i += t >> 2;
            }
            i += t >> 3;
            a[n++] = e & 8 ? -i : i;
          }
        }
      }
      return a;
    }();
    let f = 0;
    while (f < h) {
      r = e.readInt16();
      l = e.readUint8();
      e.position++;
      if (l > 88) {
        l = 88;
      }
      n[f++] = r / 32768;
      const t = Math.min(d, h - f);
      const s = f;
      while (f - s < t) {
        u = e.readUint8();
        i = u & 15;
        c = p[l * 16 + i];
        l += o[i];
        if (l > 88) {
          l = 88;
        } else if (l < 0) {
          l = 0;
        }
        r += c;
        if (r > 32767) {
          r = 32767;
        } else if (r < -32768) {
          r = -32768;
        }
        n[f++] = r / 32768;
        i = u >> 4 & 15;
        c = p[l * 16 + i];
        l += o[i];
        if (l > 88) {
          l = 88;
        } else if (l < 0) {
          l = 0;
        }
        r += c;
        if (r > 32767) {
          r = 32767;
        } else if (r < -32768) {
          r = -32768;
        }
        n[f++] = r / 32768;
      }
    }
  }
};