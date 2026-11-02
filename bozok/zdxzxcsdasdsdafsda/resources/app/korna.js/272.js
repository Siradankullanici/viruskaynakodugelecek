const r = require("./11.js");
const i = require("./86.js");
const s = require("./36.js");
const o = require("./28.js");
const a = require("./87.js");
const c = require("./88.js");
const l = r.v3.create();
const u = 0.000001;
const h = (e, t) => {
  const n = l;
  const r = t[0];
  const i = t[1];
  const s = e._inverseMatrix;
  const o = r * s[3] + i * s[7] + s[15];
  n[0] = 0.5 - (r * s[0] + i * s[4] + s[12]) / o;
  n[1] = (r * s[1] + i * s[5] + s[13]) / o + 0.5;
  if (Math.abs(n[0]) < u) {
    n[0] = 0;
  }
  if (Math.abs(n[1]) < u) {
    n[1] = 0;
  }
  if (e.enabledEffects !== 0 && n[0] >= 0 && n[0] < 1 && n[1] >= 0 && n[1] < 1) {
    a.transformPoint(e, n, n);
  }
  return n;
};
class d {
  constructor(e, t) {
    this._id = e;
    this._renderer = t;
    this._uniforms = {
      u_modelMatrix: r.m4.identity(),
      u_silhouetteColor: d.color4fFromID(this._id)
    };
    const n = o.EFFECTS.length;
    for (let e = 0; e < n; ++e) {
      const t = o.EFFECTS[e];
      const n = o.EFFECT_INFO[t];
      const r = n.converter;
      this._uniforms[n.uniformName] = r(0);
    }
    this._position = r.v3.create(0, 0);
    this._scale = r.v3.create(100, 100);
    this._direction = 90;
    this._transformDirty = true;
    this._rotationMatrix = r.m4.identity();
    this._rotationTransformDirty = true;
    this._rotationAdjusted = r.v3.create();
    this._rotationCenterDirty = true;
    this._skinScale = r.v3.create(0, 0, 0);
    this._skinScaleDirty = true;
    this._inverseMatrix = r.m4.identity();
    this._inverseTransformDirty = true;
    this._visible = true;
    this.enabledEffects = 0;
    this._convexHullPoints = null;
    this._convexHullDirty = true;
    this._transformedHullPoints = null;
    this._transformedHullDirty = true;
    this._skinWasAltered = this._skinWasAltered.bind(this);
    this.isTouching = this._isTouchingNever;
    this._highQuality = false;
    this.interactive = true;
  }
  setHighQuality(e) {
    this._highQuality = e;
  }
  dispose() {
    this.skin = null;
  }
  setTransformDirty() {
    this._transformDirty = true;
    this._inverseTransformDirty = true;
    this._transformedHullDirty = true;
  }
  get id() {
    return this._id;
  }
  get skin() {
    return this._skin;
  }
  set skin(e) {
    if (this._skin !== e) {
      this._skin = e;
      this._skinWasAltered();
    }
  }
  get scale() {
    return [this._scale[0], this._scale[1]];
  }
  getUniforms() {
    if (this._transformDirty) {
      this._calculateTransform();
    }
    return this._uniforms;
  }
  getVisible() {
    return this._visible;
  }
  updatePosition(e) {
    if (this._position[0] !== e[0] || this._position[1] !== e[1]) {
      if (this._highQuality) {
        this._position[0] = e[0];
        this._position[1] = e[1];
      } else {
        this._position[0] = Math.round(e[0]);
        this._position[1] = Math.round(e[1]);
      }
      this._renderer.dirty = true;
      this.setTransformDirty();
    }
  }
  updateDirection(e) {
    if (this._direction !== e) {
      this._direction = e;
      this._renderer.dirty = true;
      this._rotationTransformDirty = true;
      this.setTransformDirty();
    }
  }
  updateScale(e) {
    if (this._scale[0] !== e[0] || this._scale[1] !== e[1]) {
      this._scale[0] = e[0];
      this._scale[1] = e[1];
      this._renderer.dirty = true;
      this._rotationCenterDirty = true;
      this._skinScaleDirty = true;
      this.setTransformDirty();
    }
  }
  updateVisible(e) {
    if (this._visible !== e) {
      this._visible = e;
      this._renderer.dirty = true;
      this.setConvexHullDirty();
    }
  }
  updateEffect(e, t) {
    this._renderer.dirty = true;
    const n = o.EFFECT_INFO[e];
    if (t) {
      this.enabledEffects |= n.mask;
    } else {
      this.enabledEffects &= ~n.mask;
    }
    const r = n.converter;
    this._uniforms[n.uniformName] = r(t);
    if (n.shapeChanges) {
      this.setConvexHullDirty();
    }
  }
  updateProperties(e) {
    if ("position" in e) {
      this.updatePosition(e.position);
    }
    if ("direction" in e) {
      this.updateDirection(e.direction);
    }
    if ("scale" in e) {
      this.updateScale(e.scale);
    }
    if ("visible" in e) {
      this.updateVisible(e.visible);
    }
    const t = o.EFFECTS.length;
    for (let n = 0; n < t; ++n) {
      const t = o.EFFECTS[n];
      if (t in e) {
        this.updateEffect(t, e[t]);
      }
    }
  }
  _calculateTransform() {
    if (this._rotationTransformDirty) {
      const e = (270 - this._direction) * Math.PI / 180;
      const t = Math.cos(e);
      const n = Math.sin(e);
      this._rotationMatrix[0] = t;
      this._rotationMatrix[1] = n;
      this._rotationMatrix[4] = -n;
      this._rotationMatrix[5] = t;
      this._rotationTransformDirty = false;
    }
    if (this._rotationCenterDirty && this.skin !== null) {
      const e = this.skin.rotationCenter;
      const t = this.skin.size;
      const n = e[0];
      const r = e[1];
      const i = t[0];
      const s = t[1];
      const o = this._scale[0];
      const a = this._scale[1];
      const c = this._rotationAdjusted;
      c[0] = (n - i / 2) * o / 100;
      c[1] = (r - s / 2) * a / 100 * -1;
      this._rotationCenterDirty = false;
    }
    if (this._skinScaleDirty && this.skin !== null) {
      const e = this.skin.size;
      const t = this._skinScale;
      t[0] = e[0] * this._scale[0] / 100;
      t[1] = e[1] * this._scale[1] / 100;
      this._skinScaleDirty = false;
    }
    const e = this._uniforms.u_modelMatrix;
    const t = this._skinScale[0];
    const n = this._skinScale[1];
    const r = this._rotationMatrix[0];
    const i = this._rotationMatrix[1];
    const s = this._rotationMatrix[4];
    const o = this._rotationMatrix[5];
    const a = this._rotationAdjusted[0];
    const c = this._rotationAdjusted[1];
    const l = this._position[0];
    const u = this._position[1];
    e[0] = t * r;
    e[1] = t * i;
    e[4] = n * s;
    e[5] = n * o;
    e[12] = r * a + s * c + l;
    e[13] = i * a + o * c + u;
    this._transformDirty = false;
  }
  needsConvexHullPoints() {
    return !this._convexHullPoints || this._convexHullDirty || this._convexHullPoints.length === 0;
  }
  setConvexHullDirty() {
    this._convexHullDirty = true;
  }
  setConvexHullPoints(e) {
    this._convexHullPoints = e;
    this._convexHullDirty = false;
    this._transformedHullPoints = [];
    for (let t = 0; t < e.length; t++) {
      this._transformedHullPoints.push(r.v3.create());
    }
    this._transformedHullDirty = true;
  }
  _isTouchingNever(e) {
    return false;
  }
  _isTouchingNearest(e) {
    return this.skin.isTouchingNearest(h(this, e));
  }
  _isTouchingLinear(e) {
    return this.skin.isTouchingLinear(h(this, e));
  }
  getBounds(e) {
    if (this.needsConvexHullPoints()) {
      throw new Error("Needs updated convex hull points before bounds calculation.");
    }
    if (this._transformDirty) {
      this._calculateTransform();
    }
    const t = this._getTransformedHullPoints();
    (e = e || new i()).initFromPointsAABB(t);
    return e;
  }
  getBoundsForBubble(e) {
    if (this.needsConvexHullPoints()) {
      throw new Error("Needs updated convex hull points before bubble bounds calculation.");
    }
    if (this._transformDirty) {
      this._calculateTransform();
    }
    const t = this._getTransformedHullPoints();
    const n = Math.max.apply(null, t.map(e => e[1]));
    const r = t.filter(e => e[1] > n - 8);
    (e = e || new i()).initFromPointsAABB(r);
    return e;
  }
  getAABB(e) {
    if (this._transformDirty) {
      this._calculateTransform();
    }
    const t = this._uniforms.u_modelMatrix;
    (e = e || new i()).initFromModelMatrix(t);
    return e;
  }
  getFastBounds(e) {
    if (this.needsConvexHullPoints()) {
      return this.getAABB(e);
    } else {
      return this.getBounds(e);
    }
  }
  _getTransformedHullPoints() {
    if (!this._transformedHullDirty) {
      return this._transformedHullPoints;
    }
    const e = r.m4.ortho(-1, 1, -1, 1, -1, 1);
    const t = this.skin.size;
    const n = 1 / t[0] / 2;
    const i = 1 / t[1] / 2;
    const s = r.m4.multiply(this._uniforms.u_modelMatrix, e);
    for (let e = 0; e < this._convexHullPoints.length; e++) {
      const o = this._convexHullPoints[e];
      const a = this._transformedHullPoints[e];
      a[0] = 0.5 + -o[0] / t[0] - n;
      a[1] = o[1] / t[1] - 0.5 + i;
      r.m4.transformPoint(s, a, a);
    }
    this._transformedHullDirty = false;
    return this._transformedHullPoints;
  }
  updateMatrix() {
    if (this._transformDirty) {
      this._calculateTransform();
    }
    if (this._inverseTransformDirty) {
      const e = this._inverseMatrix;
      r.m4.copy(this._uniforms.u_modelMatrix, e);
      e[10] = 1;
      r.m4.inverse(e, e);
      this._inverseTransformDirty = false;
    }
  }
  updateCPURenderAttributes() {
    this.updateMatrix();
    if (this.skin) {
      this.skin.updateSilhouette(this._scale);
      if (this.skin.useNearest(this._scale, this)) {
        this.isTouching = this._isTouchingNearest;
      } else {
        this.isTouching = this._isTouchingLinear;
      }
    } else {
      c.warn(`Could not find skin for drawable with id: ${this._id}`);
      this.isTouching = this._isTouchingNever;
    }
  }
  _skinWasAltered() {
    this._renderer.dirty = true;
    this._rotationCenterDirty = true;
    this._skinScaleDirty = true;
    this.setConvexHullDirty();
    this.setTransformDirty();
  }
  static color4fFromID(e) {
    return [((e -= s.ID_NONE) & 255) / 255, (e >> 8 & 255) / 255, (e >> 16 & 255) / 255, 1];
  }
  static color3bToID(e, t, n) {
    let r;
    r = e & 255;
    r |= (t & 255) << 8;
    r |= (n & 255) << 16;
    return r + s.ID_NONE;
  }
  static sampleColor4b(e, t, n, r) {
    const i = h(t, e);
    if (i[0] < 0 || i[1] < 0 || i[0] > 1 || i[1] > 1) {
      n[0] = 0;
      n[1] = 0;
      n[2] = 0;
      n[3] = 0;
      return n;
    }
    const s = t.skin._silhouette.colorAtNearest(i, n);
    if (t.enabledEffects === 0) {
      return s;
    } else {
      return a.transformColor(t, s, r);
    }
  }
}
module.exports = d;