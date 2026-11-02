const r = require("./11.js");
const i = require("./27.js");
class s extends i {
  constructor(e, t) {
    super(e, t);
    this._costumeResolution = 1;
    this._textureSize = [0, 0];
  }
  dispose() {
    if (this._texture) {
      this._renderer.gl.deleteTexture(this._texture);
      this._texture = null;
    }
    super.dispose();
  }
  get size() {
    return [this._textureSize[0] / this._costumeResolution, this._textureSize[1] / this._costumeResolution];
  }
  getTexture(e) {
    return this._texture || super.getTexture();
  }
  setBitmap(e, t, n) {
    if (!e.width || !e.height) {
      super.setEmptyImageData();
      return;
    }
    const i = this._renderer.gl;
    let o = e;
    if (e instanceof HTMLCanvasElement && e.reusable !== false) {
      o = e.getContext("2d").getImageData(0, 0, e.width, e.height);
    }
    if (this._texture === null) {
      const e = {
        auto: false,
        wrap: i.CLAMP_TO_EDGE
      };
      this._texture = r.createTexture(i, e);
    }
    this._setTexture(o);
    this._costumeResolution = t || 2;
    this._textureSize = s._getBitmapSize(e);
    if (n === undefined) {
      n = this.calculateRotationCenter();
    }
    this._rotationCenter[0] = n[0];
    this._rotationCenter[1] = n[1];
    this.emitWasAltered();
  }
  static _getBitmapSize(e) {
    if (e instanceof HTMLImageElement) {
      return [e.naturalWidth || e.width, e.naturalHeight || e.height];
    } else if (e instanceof HTMLVideoElement) {
      return [e.videoWidth || e.width, e.videoHeight || e.height];
    } else {
      return [e.width, e.height];
    }
  }
}
module.exports = s;