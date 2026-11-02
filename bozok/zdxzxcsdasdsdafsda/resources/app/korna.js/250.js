const r = require("./251.js");
module.exports = class {
  constructor(e, t) {
    this._makeImage = e || (() => new Image());
    this._makeCanvas = t || (() => document.createElement("canvas"));
    this.stageWidth = 480;
    this.stageHeight = 360;
  }
  setStageSize(e, t) {
    this.stageWidth = e;
    this.stageHeight = t;
  }
  resize(e, t, n) {
    const r = this._makeCanvas();
    r.width = t;
    r.height = e.height;
    let i = r.getContext("2d");
    i.imageSmoothingEnabled = false;
    i.drawImage(e, 0, 0, r.width, r.height);
    const s = this._makeCanvas();
    s.width = t;
    s.height = n;
    i = s.getContext("2d");
    i.imageSmoothingEnabled = false;
    i.drawImage(r, 0, 0, s.width, s.height);
    return s;
  }
  convertResolution1Bitmap(e, t) {
    const n = this._makeImage();
    n.src = e;
    n.onload = () => {
      t(null, this.resize(n, n.width * 2, n.height * 2).toDataURL());
    };
    n.onerror = () => {
      t("Image load failed");
    };
  }
  getResizedWidthHeight(e, t) {
    const n = this.stageWidth;
    const r = this.stageHeight;
    if (e <= n && t <= r) {
      return {
        width: e * 2,
        height: t * 2
      };
    }
    if (e <= n * 2 && t <= r * 2) {
      return {
        width: e,
        height: t
      };
    }
    const i = e / t;
    if (i >= n / r) {
      return {
        width: n * 2,
        height: n * 2 / i
      };
    } else {
      return {
        width: r * 2 * i,
        height: r * 2
      };
    }
  }
  importBitmap(e, t) {
    let n = e;
    if (e instanceof ArrayBuffer) {
      n = this.convertBinaryToDataURI(e, t);
    }
    return new Promise((e, t) => {
      const r = this._makeImage();
      r.src = n;
      r.onload = () => {
        const t = this.getResizedWidthHeight(r.width, r.height);
        const n = this.resize(r, t.width, t.height).toDataURL();
        e(this.convertDataURIToBinary(n));
      };
      r.onerror = () => {
        t("Image load failed");
      };
    });
  }
  convertDataURIToBinary(e) {
    const t = ";base64,";
    const n = e.indexOf(t) + 8;
    const r = e.substring(n);
    const i = window.atob(r);
    const s = i.length;
    const o = new Uint8Array(new ArrayBuffer(s));
    for (let e = 0; e < s; e++) {
      o[e] = i.charCodeAt(e);
    }
    return o;
  }
  convertBinaryToDataURI(e, t) {
    return `data:${t};base64,${r.fromByteArray(new Uint8Array(e))}`;
  }
};