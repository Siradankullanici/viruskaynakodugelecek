const r = require("./75.js");
const i = require("./78.js");
module.exports = class {
  constructor(e) {
    this._canvas = e || document.createElement("canvas");
    this._context = this._canvas.getContext("2d");
    this._measurements = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this._cachedImage = null;
    this.loaded = false;
  }
  get canvas() {
    return this._canvas;
  }
  get size() {
    return [this._measurements.width, this._measurements.height];
  }
  get viewOffset() {
    return [this._measurements.x, this._measurements.y];
  }
  loadString(e, t) {
    this._cachedImage = null;
    const n = r(e, t);
    this._svgTag = n;
    this._measurements = {
      width: n.viewBox.baseVal.width,
      height: n.viewBox.baseVal.height,
      x: n.viewBox.baseVal.x,
      y: n.viewBox.baseVal.y
    };
  }
  loadSVG(e, t, n) {
    this.loadString(e, t);
    this._createSVGImage(n);
  }
  _createSVGImage(e) {
    if (this._cachedImage === null) {
      this._cachedImage = new Image();
    }
    const t = this._cachedImage;
    t.onload = () => {
      this.loaded = true;
      if (e) {
        e();
      }
    };
    const n = this.toString(true);
    t.src = `data:image/svg+xml;utf8,${encodeURIComponent(n)}`;
    this.loaded = false;
  }
  toString(e) {
    return i(this._svgTag, e);
  }
  draw(e) {
    if (!this.loaded) {
      throw new Error("SVG image has not finished loading");
    }
    this._drawFromImage(e);
  }
  _drawFromImage(e) {
    if (this._cachedImage === null) {
      return;
    }
    const t = Number.isFinite(e) ? e : 1;
    const n = this._measurements;
    this._canvas.width = n.width * t;
    this._canvas.height = n.height * t;
    if (!(this._canvas.width <= 0) && !(this._canvas.height <= 0) && !(this._cachedImage.naturalWidth <= 0) && !(this._cachedImage.naturalHeight <= 0)) {
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
      this._context.setTransform(t, 0, 0, t, 0, 0);
      this._context.drawImage(this._cachedImage, 0, 0);
    }
  }
};