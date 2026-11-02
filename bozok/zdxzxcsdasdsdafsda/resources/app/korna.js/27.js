const r = require("./11.js");
const i = require("./36.js");
const s = require("./270.js");
module.exports = class {
  constructor(e, t) {
    this._renderer = t;
    this._id = e;
    this._rotationCenter = r.v3.create(0, 0);
    this._texture = null;
    this._uniforms = {
      u_skinSize: [0, 0],
      u_skin: null
    };
    this._silhouette = new s();
    this.private = false;
  }
  dispose() {
    if (this._emptyImageTexture) {
      this._renderer.gl.deleteTexture(this._emptyImageTexture);
      this._emptyImageTexture = null;
    }
    this._id = i.ID_NONE;
  }
  get id() {
    return this._id;
  }
  get rotationCenter() {
    return this._rotationCenter;
  }
  get size() {
    return [0, 0];
  }
  useNearest(e, t) {
    return true;
  }
  calculateRotationCenter() {
    return [this.size[0] / 2, this.size[1] / 2];
  }
  getTexture(e) {
    return this._emptyImageTexture;
  }
  isMetricsReady() {
    return !!this.getTexture([100, 100]);
  }
  getFenceBounds(e, t) {
    return e.getAABB(t);
  }
  getUniforms(e) {
    this._uniforms.u_skin = this.getTexture(e);
    this._uniforms.u_skinSize = this.size;
    return this._uniforms;
  }
  emitWasAltered() {
    this._renderer.skinWasAltered(this);
  }
  updateSilhouette() {
    this._silhouette.unlazy();
  }
  _setTexture(e) {
    const t = this._renderer.gl;
    t.bindTexture(t.TEXTURE_2D, this._texture);
    t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
    t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    this._silhouette.update(e);
  }
  setEmptyImageData() {
    this._texture = null;
    if (!this._emptyImageData) {
      this._emptyImageData = new ImageData(1, 1);
      const e = this._renderer.gl;
      const t = {
        auto: true,
        wrap: e.CLAMP_TO_EDGE,
        src: this._emptyImageData
      };
      this._emptyImageTexture = r.createTexture(e, t);
    }
    this._rotationCenter[0] = 0;
    this._rotationCenter[1] = 0;
    this._silhouette.update(this._emptyImageData);
    this.emitWasAltered();
  }
  isTouchingNearest(e) {
    return this._silhouette.isTouchingNearest(e);
  }
  isTouchingLinear(e) {
    return this._silhouette.isTouchingLinear(e);
  }
};