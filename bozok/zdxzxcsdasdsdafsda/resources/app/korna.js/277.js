const r = require("./11.js");
const i = require("./27.js");
const {
  loadSvgString: s,
  serializeSvgToString: o
} = require("./25.js");
const a = require("./28.js");
module.exports = class extends i {
  constructor(e, t) {
    super(e, t);
    this._svgImage = document.createElement("img");
    this._svgImageLoaded = false;
    this._size = [0, 0];
    this._canvas = document.createElement("canvas");
    this._context = this._canvas.getContext("2d");
    this._scaledMIPs = [];
    this._largestMIPScale = 0;
    this._maxTextureScale = 1;
  }
  dispose() {
    this.resetMIPs();
    this._svgImage.onload = null;
    super.dispose();
  }
  get size() {
    return [this._size[0], this._size[1]];
  }
  useNearest(e, t) {
    return !(t.enabledEffects & (a.EFFECT_INFO.fisheye.mask | a.EFFECT_INFO.whirl.mask | a.EFFECT_INFO.pixelate.mask | a.EFFECT_INFO.mosaic.mask)) && t._direction % 90 == 0 && Math.abs(e[0]) > 99 && Math.abs(e[0]) < 101 && Math.abs(e[1]) > 99 && Math.abs(e[1]) < 101;
  }
  createMIP(e) {
    const t = this._largestMIPScale < e;
    if (!t) {
      this._silhouette.unlazy();
    }
    const [n, i] = this._size;
    this._canvas.width = n * e;
    this._canvas.height = i * e;
    if (this._canvas.width <= 0 || this._canvas.height <= 0 || this._svgImage.naturalWidth <= 0 || this._svgImage.naturalHeight <= 0) {
      return super.getTexture();
    }
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._context.setTransform(e, 0, 0, e, 0, 0);
    this._context.drawImage(this._svgImage, 0, 0);
    const s = this._canvas;
    const o = {
      auto: false,
      wrap: this._renderer.gl.CLAMP_TO_EDGE,
      src: s,
      premultiplyAlpha: true
    };
    const a = r.createTexture(this._renderer.gl, o);
    if (t) {
      this._silhouette.update(s);
      this._largestMIPScale = e;
    }
    return a;
  }
  updateSilhouette(e = [100, 100]) {
    this.getTexture(e);
    this._silhouette.unlazy();
  }
  getTexture(e) {
    const t = e ? Math.max(Math.abs(e[0]), Math.abs(e[1])) : 100;
    const n = Math.min(t / 100, this._maxTextureScale);
    const r = Math.max(Math.ceil(Math.log2(n)) + 8, 0);
    const i = Math.pow(2, r - 8);
    if (this._svgImageLoaded && !this._scaledMIPs[r]) {
      this._scaledMIPs[r] = this.createMIP(i);
    }
    return this._scaledMIPs[r] || super.getTexture();
  }
  resetMIPs() {
    this._scaledMIPs.forEach(e => this._renderer.gl.deleteTexture(e));
    this._scaledMIPs.length = 0;
    this._largestMIPScale = 0;
  }
  setSVG(e, t) {
    const n = s(e);
    const r = o(n, this._renderer.customFonts);
    this._svgImageLoaded = false;
    const {
      x: i,
      y: a,
      width: c,
      height: l
    } = n.viewBox.baseVal;
    this._size[0] = c;
    this._size[1] = l;
    this._svgImage.onload = () => {
      if (c === 0 || l === 0) {
        super.setEmptyImageData();
        return;
      }
      const e = Math.ceil(Math.max(c, l));
      const n = this._renderer.maxTextureDimension;
      let r = 2;
      for (; e * r <= n; r *= 2) {
        this._maxTextureScale = r;
      }
      this.resetMIPs();
      if (t === undefined) {
        t = this.calculateRotationCenter();
      }
      this._rotationCenter[0] = t[0] - i;
      this._rotationCenter[1] = t[1] - a;
      this._svgImageLoaded = true;
      this.emitWasAltered();
    };
    this._svgImage.src = `data:image/svg+xml;utf8,${encodeURIComponent(r)}`;
  }
};