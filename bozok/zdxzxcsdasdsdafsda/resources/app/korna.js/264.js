const r = require("./19.js");
const i = require("./265.js");
const s = require("./11.js");
const o = require("./25.js");
const a = require("./27.js");
const c = require("./271.js");
const l = require("./272.js");
const u = require("./86.js");
const h = require("./276.js");
const d = require("./36.js");
const p = require("./28.js");
const f = require("./277.js");
const m = require("./278.js");
const g = require("./87.js");
const b = require("./89.js");
const y = require("./88.js");
const E = s.v3.create();
const T = new u();
const v = new u();
const A = new Uint8ClampedArray(4);
const w = new Uint8ClampedArray(4);
const S = [3, 3];
const k = (e, t, n) => (e[0] & 248) == (t[n + 0] & 248) && (e[1] & 248) == (t[n + 1] & 248) && (e[2] & 240) == (t[n + 2] & 240);
let I;
let O;
class N extends r {
  static isSupported(e) {
    try {
      e = e || document.createElement("canvas");
      const t = {
        alpha: true,
        stencil: true,
        antialias: false,
        powerPreference: N.powerPreference
      };
      return !!e.getContext("webgl2", t) || !!e.getContext("webgl", t) || !!e.getContext("experimental-webgl", t);
    } catch (e) {
      return false;
    }
  }
  static _getContext(e) {
    const t = {
      alpha: true,
      stencil: true,
      antialias: false,
      powerPreference: N.powerPreference
    };
    return s.getContext(e, t);
  }
  constructor(e, t, r, i, y) {
    super();
    const E = this._gl = N._getContext(e);
    if (!E) {
      throw new Error("Could not get WebGL context: this browser or environment may not support WebGL.");
    }
    this._useGpuMode = N.UseGpuModes.Automatic;
    this._allDrawables = [];
    this._allSkins = [];
    this._drawList = [];
    this._groupOrdering = [];
    this._layerGroups = {};
    this._nextDrawableId = d.ID_NONE + 1;
    this._nextSkinId = d.ID_NONE + 1;
    this._projection = s.m4.identity();
    this._shaderManager = new p(E);
    this._regionId = null;
    this._exitRegion = null;
    this._backgroundDrawRegionId = {
      enter: () => this._enterDrawBackground(),
      exit: () => this._exitDrawBackground()
    };
    this._snapshotCallbacks = [];
    this._backgroundColor4f = [0, 0, 0, 1];
    this._backgroundColor3b = new Uint8ClampedArray(3);
    this._penSkinId = null;
    this.useHighQualityRender = false;
    this.offscreenTouching = false;
    this.dirty = true;
    this.overlayContainer = document.createElement("div");
    this.overlayContainer.className = "scratch-render-overlays";
    this._overlays = [];
    if (!O) {
      O = document.createElement("style");
      O.textContent = require("./287.js");
      O.className = "scratch-render-styles";
      document.head.appendChild(O);
    }
    this._createGeometry();
    this.on(d.Events.NativeSizeChanged, this.onNativeSizeChanged);
    E.canvas.addEventListener("webglcontextlost", () => {
      this.emit(d.Events.ContextLost);
    });
    this.setBackgroundColor(1, 1, 1);
    this.setStageSize(t || -240, r || 240, i || -180, y || 180);
    this.resize(this._nativeSize[0], this._nativeSize[1]);
    E.disable(E.DEPTH_TEST);
    E.enable(E.BLEND);
    E.blendFunc(E.ONE, E.ONE_MINUS_SRC_ALPHA);
    this.allowPrivateSkinAccess = true;
    this.maxTextureDimension = 2048;
    this.customFonts = {};
    this._customFontStyles = null;
    this.exports = {
      twgl: s,
      SVGRenderer: o,
      Drawable: l,
      Skin: a,
      BitmapSkin: c,
      TextBubbleSkin: m,
      PenSkin: h,
      SVGSkin: f,
      CanvasMeasurementProvider: b,
      Rectangle: u,
      EffectTransform: g,
      ShaderManager: p
    };
  }
  setUseHighQualityRender(e) {
    this.dirty = true;
    this.useHighQualityRender = e;
    this.emit(d.Events.UseHighQualityRenderChanged, e);
    this._updateRenderQuality();
  }
  _updateRenderQuality() {
    if (this._penSkinId !== null) {
      const e = this._allSkins[this._penSkinId];
      if (e) {
        if (this.useHighQualityRender) {
          e.setRenderQuality(this.canvas.width / this._nativeSize[0]);
        } else {
          e.setRenderQuality(1);
        }
      }
    }
    for (const e of this._allDrawables) {
      if (e) {
        e.setHighQuality(this.useHighQualityRender);
      }
    }
  }
  setPrivateSkinAccess(e) {
    this.allowPrivateSkinAccess = e;
    this.emit(d.Events.AllowPrivateSkinAccessChanged, e);
  }
  setMaxTextureDimension(e) {
    const t = this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
    this.maxTextureDimension = Math.min(e, t);
  }
  get gl() {
    return this._gl;
  }
  get canvas() {
    return this._gl && this._gl.canvas;
  }
  resize(e, t) {
    const {
      canvas: n
    } = this._gl;
    const r = window.devicePixelRatio || 1;
    const i = Math.round(e * r);
    const s = Math.round(t * r);
    if (n.width !== i || n.height !== s) {
      n.width = i;
      n.height = s;
      this._updateRenderQuality();
      this._updateOverlays();
      this.dirty = true;
      this.draw();
    }
  }
  setBackgroundColor(e, t, n, r = 1) {
    this.dirty = true;
    this._backgroundColor4f[0] = e * r;
    this._backgroundColor4f[1] = t * r;
    this._backgroundColor4f[2] = n * r;
    this._backgroundColor4f[3] = r;
    this._backgroundColor3b[0] = e * r * 255;
    this._backgroundColor3b[1] = t * r * 255;
    this._backgroundColor3b[2] = n * r * 255;
  }
  setDebugCanvas(e) {
    this._debugCanvas = e;
  }
  setUseGpuMode(e) {
    this._useGpuMode = e;
  }
  setStageSize(e, t, n, r) {
    this._xLeft = e;
    this._xRight = t;
    this._yBottom = n;
    this._yTop = r;
    this._projection = s.m4.ortho(e, t, n, r, -1, 1);
    this._setNativeSize(Math.abs(t - e), Math.abs(n - r));
  }
  getNativeSize() {
    return [this._nativeSize[0], this._nativeSize[1]];
  }
  _setNativeSize(e, t) {
    this._nativeSize = [e, t];
    this._updateOverlays();
    this.emit(d.Events.NativeSizeChanged, {
      newSize: this._nativeSize
    });
  }
  addOverlay(e, t = "scale") {
    const n = document.createElement("div");
    n.appendChild(e);
    this.overlayContainer.appendChild(n);
    const r = {
      container: n,
      userElement: e,
      mode: t
    };
    this._overlays.push(r);
    this._updateOverlays();
    return r;
  }
  removeOverlay(e) {
    const t = this._overlays.findIndex(t => t.userElement === e);
    if (t !== -1) {
      this._overlays[t].container.remove();
      this._overlays.splice(t, 1);
    }
  }
  _updateOverlays() {
    const [e, t] = this._nativeSize;
    const n = this.canvas.width / window.devicePixelRatio;
    const r = this.canvas.height / window.devicePixelRatio;
    this.overlayContainer.style.width = `${n}px`;
    this.overlayContainer.style.height = `${r}px`;
    for (const i of this._overlays) {
      const s = i.container;
      if (i.mode === "scale" || i.mode === "scale-centered") {
        const o = n / e;
        const a = r / t;
        s.style.width = `${e}px`;
        s.style.height = `${t}px`;
        const c = `scale(${o}, ${a})`;
        s.style.transformOrigin = "top left";
        if (i.mode === "scale") {
          s.style.transform = c;
        } else {
          const n = `translate(${e / 2}px, ${t / 2}px)`;
          s.style.transform = `${c} ${n}`;
        }
      } else {
        s.style.transform = "";
        s.style.width = "100%";
        s.style.height = "100%";
      }
    }
  }
  createBitmapSkin(e, t, n) {
    const r = this._nextSkinId++;
    const i = new c(r, this);
    i.setBitmap(e, t, n);
    this._allSkins[r] = i;
    return r;
  }
  createSVGSkin(e, t) {
    const n = this._nextSkinId++;
    const r = new f(n, this);
    r.setSVG(e, t);
    this._allSkins[n] = r;
    return n;
  }
  createPenSkin() {
    const e = this._nextSkinId++;
    const t = new h(e, this);
    this._allSkins[e] = t;
    this._penSkinId = e;
    this._updateRenderQuality();
    return e;
  }
  createTextSkin(e, t, n) {
    const r = this._nextSkinId++;
    const i = new m(r, this);
    i.setTextBubble(e, t, n);
    this._allSkins[r] = i;
    return r;
  }
  updateSVGSkin(e, t, n) {
    if (this._allSkins[e] instanceof f) {
      this._allSkins[e].setSVG(t, n);
      return;
    }
    const r = new f(e, this);
    r.setSVG(t, n);
    this._reskin(e, r);
  }
  updateBitmapSkin(e, t, n, r) {
    if (this._allSkins[e] instanceof c) {
      this._allSkins[e].setBitmap(t, n, r);
      return;
    }
    const i = new c(e, this);
    i.setBitmap(t, n, r);
    this._reskin(e, i);
  }
  _reskin(e, t) {
    const n = this._allSkins[e];
    this._allSkins[e] = t;
    for (const e of this._allDrawables) {
      if (e && e.skin === n) {
        e.skin = t;
      }
    }
    n.dispose();
  }
  updateTextSkin(e, t, n, r) {
    if (this._allSkins[e] instanceof m) {
      this._allSkins[e].setTextBubble(t, n, r);
      return;
    }
    const i = new m(e, this);
    i.setTextBubble(t, n, r);
    this._reskin(e, i);
  }
  destroySkin(e) {
    this._allSkins[e].dispose();
    delete this._allSkins[e];
  }
  createDrawable(e) {
    if (!e || !Object.prototype.hasOwnProperty.call(this._layerGroups, e)) {
      y.warn("Cannot create a drawable without a known layer group");
      return;
    }
    const t = this._nextDrawableId++;
    const n = new l(t, this);
    this._allDrawables[t] = n;
    this._addToDrawList(t, e);
    n.setHighQuality(this.useHighQualityRender);
    n.skin = null;
    return t;
  }
  createTextWrapper(e) {
    return new (I ||= require("./279.js"), I)(e);
  }
  markSkinAsPrivate(e) {
    const t = this._allSkins[e];
    if (t) {
      t.private = true;
    }
  }
  markDrawableAsNoninteractive(e) {
    const t = this._allDrawables[e];
    if (t) {
      t.interactive = false;
    }
  }
  setLayerGroupOrdering(e) {
    this._groupOrdering = e;
    for (let e = 0; e < this._groupOrdering.length; e++) {
      this._layerGroups[this._groupOrdering[e]] = {
        groupIndex: e,
        drawListOffset: 0
      };
    }
  }
  _addToDrawList(e, t) {
    const n = this._layerGroups[t];
    const r = n.groupIndex;
    const i = this._endIndexForKnownLayerGroup(n);
    this._drawList.splice(i, 0, e);
    this._updateOffsets("add", r);
  }
  _updateOffsets(e, t) {
    for (let n = t + 1; n < this._groupOrdering.length; n++) {
      const t = this._groupOrdering[n];
      if (e === "add") {
        this._layerGroups[t].drawListOffset++;
      } else if (e === "delete") {
        this._layerGroups[t].drawListOffset--;
      }
    }
  }
  get _visibleDrawList() {
    return this._drawList.filter(e => this._allDrawables[e]._visible);
  }
  _endIndexForKnownLayerGroup(e) {
    const t = e.groupIndex;
    if (t === this._groupOrdering.length - 1) {
      return this._drawList.length;
    } else {
      return this._layerGroups[this._groupOrdering[t + 1]].drawListOffset;
    }
  }
  destroyDrawable(e, t) {
    if (!t || !Object.prototype.hasOwnProperty.call(this._layerGroups, t)) {
      y.warn("Cannot destroy drawable without known layer group.");
      return;
    }
    this.dirty = true;
    this._allDrawables[e].dispose();
    delete this._allDrawables[e];
    const n = this._layerGroups[t];
    const r = this._endIndexForKnownLayerGroup(n);
    let i = n.drawListOffset;
    while (i < r && this._drawList[i] !== e) {
      i++;
    }
    if (i < r) {
      this._drawList.splice(i, 1);
      this._updateOffsets("delete", n.groupIndex);
      return;
    }
    i = this._drawList.indexOf(e);
    if (i !== -1) {
      this._drawList.splice(i, 1);
      for (const e of this._groupOrdering) {
        if (this._layerGroups[e].drawListOffset > i) {
          this._layerGroups[e].drawListOffset--;
        }
      }
    } else {
      y.warn("Could not destroy drawable that could not be found in draw list.");
    }
  }
  getDrawableOrder(e) {
    return this._drawList.indexOf(e);
  }
  setDrawableOrder(e, t, n, r, i) {
    if (!n || !Object.prototype.hasOwnProperty.call(this._layerGroups, n)) {
      y.warn("Cannot set the order of a drawable without a known layer group.");
      return;
    }
    this.dirty = true;
    const s = this._layerGroups[n];
    const o = s.drawListOffset;
    const a = this._endIndexForKnownLayerGroup(s);
    let c = o;
    while (c < a && this._drawList[c] !== e) {
      c++;
    }
    if (c < a) {
      if (t === 0) {
        return c;
      }
      this._drawList.splice(c, 1)[0];
      let n = t;
      if (r) {
        n += c;
      }
      const s = (i || 0) + o;
      const l = s >= o && s < a ? s : o;
      n = Math.max(n, l);
      n = Math.min(n, a);
      this._drawList.splice(n, 0, e);
      return n;
    }
    return null;
  }
  skinWasAltered(e) {
    for (let t = 0; t < this._drawList.length; t++) {
      const n = this._drawList[t];
      const r = this._allDrawables[n];
      if (r._skin === e) {
        r._skinWasAltered();
      }
    }
  }
  draw() {
    if (!this.dirty) {
      return;
    }
    this.dirty = false;
    this._doExitDrawRegion();
    const e = this._gl;
    s.bindFramebufferInfo(e, null);
    e.viewport(0, 0, e.canvas.width, e.canvas.height);
    e.clearColor(this._backgroundColor4f[0], this._backgroundColor4f[1], this._backgroundColor4f[2], this._backgroundColor4f[3]);
    e.clear(e.COLOR_BUFFER_BIT);
    const t = this._snapshotCallbacks.length > 0;
    this._drawThese(this._drawList, p.DRAW_MODE.default, this._projection, {
      framebufferWidth: e.canvas.width,
      framebufferHeight: e.canvas.height,
      skipPrivateSkins: t
    });
    if (t) {
      const t = e.canvas.toDataURL();
      this._snapshotCallbacks.forEach(e => e(t));
      this._snapshotCallbacks = [];
      this.dirty = true;
    }
  }
  getBounds(e) {
    const t = this._allDrawables[e];
    if (t.needsConvexHullPoints()) {
      const n = this._getConvexHullPointsForDrawable(e);
      t.setConvexHullPoints(n);
    }
    const n = t.getFastBounds();
    if (this._debugCanvas) {
      const e = this._gl;
      this._debugCanvas.width = e.canvas.width;
      this._debugCanvas.height = e.canvas.height;
      const t = this._debugCanvas.getContext("2d");
      t.drawImage(e.canvas, 0, 0);
      t.strokeStyle = "#FF0000";
      const r = window.devicePixelRatio;
      t.strokeRect(r * (n.left + this._nativeSize[0] / 2), r * (-n.top + this._nativeSize[1] / 2), r * (n.right - n.left), r * (-n.bottom + n.top));
    }
    return n;
  }
  getBoundsForBubble(e) {
    const t = this._allDrawables[e];
    if (t.needsConvexHullPoints()) {
      const n = this._getConvexHullPointsForDrawable(e);
      t.setConvexHullPoints(n);
    }
    const n = t.getBoundsForBubble();
    if (this._debugCanvas) {
      const e = this._gl;
      this._debugCanvas.width = e.canvas.width;
      this._debugCanvas.height = e.canvas.height;
      const t = this._debugCanvas.getContext("2d");
      t.drawImage(e.canvas, 0, 0);
      t.strokeStyle = "#FF0000";
      const r = window.devicePixelRatio;
      t.strokeRect(r * (n.left + this._nativeSize[0] / 2), r * (-n.top + this._nativeSize[1] / 2), r * (n.right - n.left), r * (-n.bottom + n.top));
    }
    return n;
  }
  getCurrentSkinSize(e) {
    const t = this._allDrawables[e];
    return this.getSkinSize(t.skin.id);
  }
  getSkinSize(e) {
    return this._allSkins[e].size;
  }
  getSkinRotationCenter(e) {
    return this._allSkins[e].calculateRotationCenter();
  }
  isTouchingColor(e, t, n) {
    const r = this._candidatesTouching(e, this._visibleDrawList);
    let i;
    if (k(t, this._backgroundColor3b, 0)) {
      i = this._touchingBounds(e);
      if (i === null) {
        return false;
      }
    } else {
      if (r.length === 0) {
        return false;
      }
      i = this._candidatesBounds(r);
    }
    const s = this._getMaxPixelsForCPU();
    const o = this._debugCanvas && this._debugCanvas.getContext("2d");
    if (o) {
      this._debugCanvas.width = i.width;
      this._debugCanvas.height = i.height;
    }
    if (i.width * i.height * (r.length + 1) >= s) {
      this._isTouchingColorGpuStart(e, r.map(e => {
        let {
          id: t
        } = e;
        return t;
      }).reverse(), i, t, n);
    }
    const a = this._allDrawables[e];
    const c = E;
    const u = A;
    const h = Boolean(n);
    a.updateCPURenderAttributes();
    const d = ~p.EFFECT_INFO.ghost.mask;
    for (let e = i.bottom; e <= i.top; e++) {
      if (i.width * (e - i.bottom) * (r.length + 1) >= s) {
        return this._isTouchingColorGpuFin(i, t, e - i.bottom);
      }
      for (let s = i.left; s <= i.right; s++) {
        c[1] = e;
        c[0] = s;
        if ((h ? (f = l.sampleColor4b(c, a, u, d), m = n, f[3] > 0 && (f[0] & 252) == (m[0] & 252) && (f[1] & 252) == (m[1] & 252) && (f[2] & 252) == (m[2] & 252)) : a.isTouching(c)) && (this.sampleColor4b(c, r, u), o && (o.fillStyle = `rgb(${u[0]},${u[1]},${u[2]})`, o.fillRect(s - i.left, i.bottom - e, 1, 1)), k(u, t, 0))) {
          return true;
        }
      }
    }
    var f;
    var m;
    return false;
  }
  _getMaxPixelsForCPU() {
    switch (this._useGpuMode) {
      case N.UseGpuModes.ForceCPU:
        return Infinity;
      case N.UseGpuModes.ForceGPU:
        return 0;
      case N.UseGpuModes.Automatic:
      default:
        return 40000;
    }
  }
  _enterDrawBackground() {
    const e = this.gl;
    const t = this._shaderManager.getShader(p.DRAW_MODE.background, 0);
    e.disable(e.BLEND);
    e.useProgram(t.program);
    s.setBuffersAndAttributes(e, t, this._bufferInfo);
  }
  _exitDrawBackground() {
    const e = this.gl;
    e.enable(e.BLEND);
  }
  _isTouchingColorGpuStart(e, t, n, r, i) {
    this._doExitDrawRegion();
    const o = this._gl;
    s.bindFramebufferInfo(o, this._queryBufferInfo);
    o.viewport(0, 0, n.width, n.height);
    const a = s.m4.ortho(n.left, n.right, n.top, n.bottom, -1, 1);
    let c;
    o.clearColor(0, 0, 0, 0);
    o.clear(o.COLOR_BUFFER_BIT | o.STENCIL_BUFFER_BIT);
    if (i) {
      c = {
        u_colorMask: [i[0] / 255, i[1] / 255, i[2] / 255],
        u_colorMaskTolerance: 2 / 255
      };
    }
    try {
      o.enable(o.STENCIL_TEST);
      o.stencilFunc(o.ALWAYS, 1, 1);
      o.stencilOp(o.KEEP, o.KEEP, o.REPLACE);
      o.colorMask(false, false, false, false);
      this._drawThese([e], i ? p.DRAW_MODE.colorMask : p.DRAW_MODE.silhouette, a, {
        extraUniforms: c,
        ignoreVisibility: true,
        effectMask: ~p.EFFECT_INFO.ghost.mask
      });
      o.stencilFunc(o.EQUAL, 1, 1);
      o.stencilOp(o.KEEP, o.KEEP, o.KEEP);
      o.colorMask(true, true, true, true);
      this.enterDrawRegion(this._backgroundDrawRegionId);
      const n = {
        u_backgroundColor: this._backgroundColor4f
      };
      const r = this._shaderManager.getShader(p.DRAW_MODE.background, 0);
      s.setUniforms(r, n);
      s.drawBufferInfo(o, this._bufferInfo, o.TRIANGLES);
      this._drawThese(t, p.DRAW_MODE.default, a, {
        idFilterFunc: t => t !== e
      });
    } finally {
      o.colorMask(true, true, true, true);
      o.disable(o.STENCIL_TEST);
      this._doExitDrawRegion();
    }
  }
  _isTouchingColorGpuFin(e, t, n) {
    const r = this._gl;
    const i = new Uint8Array(Math.floor(e.width * (e.height - n) * 4));
    r.readPixels(0, 0, e.width, e.height - n, r.RGBA, r.UNSIGNED_BYTE, i);
    if (this._debugCanvas) {
      this._debugCanvas.width = e.width;
      this._debugCanvas.height = e.height;
      const t = this._debugCanvas.getContext("2d");
      const r = t.getImageData(0, 0, e.width, e.height - n);
      r.data.set(i);
      t.putImageData(r, 0, 0);
    }
    for (let e = 0; e < i.length; e += 4) {
      if (i[e + 3] !== 0 && k(t, i, e)) {
        return true;
      }
    }
    return false;
  }
  isTouchingDrawables(e, t = this._drawList) {
    if (!this._allDrawables[e]._visible) {
      return false;
    }
    const n = this._candidatesTouching(e, t.filter(e => this._allDrawables[e]._visible));
    if (n.length === 0) {
      return false;
    }
    const r = this._candidatesBounds(n);
    const i = this._allDrawables[e];
    const s = E;
    i.updateCPURenderAttributes();
    for (let e = r.left; e <= r.right; e++) {
      s[0] = e;
      for (let e = r.bottom; e <= r.top; e++) {
        s[1] = e;
        if (i.isTouching(s)) {
          for (let e = 0; e < n.length; e++) {
            if (n[e].drawable.isTouching(s)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  clientSpaceToScratchBounds(e, t, n = 1, r = 1) {
    const i = this._gl;
    const s = this._nativeSize[0] / i.canvas.clientWidth;
    const o = this._nativeSize[1] / i.canvas.clientHeight;
    n *= s;
    r *= o;
    n = Math.max(1, Math.min(Math.round(n), S[0]));
    r = Math.max(1, Math.min(Math.round(r), S[1]));
    const a = e * s - (n - 1) / 2;
    const c = t * o + (r - 1) / 2;
    const l = n % 2 ? 0 : -0.5;
    const h = r % 2 ? 0 : -0.5;
    const d = new u();
    d.initFromBounds(Math.floor(this._xLeft + a + l), Math.floor(this._xLeft + a + l + n - 1), Math.ceil(this._yTop - c + h), Math.ceil(this._yTop - c + h + r - 1));
    return d;
  }
  drawableTouching(e, t, n, r, i) {
    const o = this._allDrawables[e];
    if (!o) {
      return false;
    }
    const a = this.clientSpaceToScratchBounds(t, n, r, i);
    const c = o.getFastBounds();
    c.snapToInt();
    if (!c.intersects(a)) {
      return false;
    }
    o.updateCPURenderAttributes();
    const l = s.v3.create();
    for (l[1] = a.bottom; l[1] <= a.top; l[1]++) {
      for (l[0] = a.left; l[0] <= a.right; l[0]++) {
        if (o.isTouching(l)) {
          return true;
        }
      }
    }
    return false;
  }
  pick(e, t, n, r, i) {
    const o = this.clientSpaceToScratchBounds(e, t, n, r);
    if (o.left === -Infinity || o.bottom === -Infinity) {
      return d.ID_NONE;
    }
    if ((i = (i || this._drawList).filter(e => {
      const t = this._allDrawables[e];
      if (!i && !t.interactive) {
        return false;
      }
      if (t.getVisible() && t.getUniforms().u_ghost !== 0) {
        const e = t.getFastBounds();
        return !!o.intersects(e) && (t.updateCPURenderAttributes(), true);
      }
      return false;
    })).length === 0) {
      return d.ID_NONE;
    }
    const a = [];
    const c = s.v3.create(0, 0, 0);
    for (c[1] = o.bottom; c[1] <= o.top; c[1]++) {
      for (c[0] = o.left; c[0] <= o.right; c[0]++) {
        for (let e = i.length - 1; e >= 0; e--) {
          const t = i[e];
          if (this._allDrawables[t].isTouching(c)) {
            a[t] = (a[t] || 0) + 1;
            break;
          }
        }
      }
    }
    a[d.ID_NONE] = 0;
    let l = d.ID_NONE;
    for (const e in a) {
      if (Object.prototype.hasOwnProperty.call(a, e) && a[e] > a[l]) {
        l = e;
      }
    }
    return Number(l);
  }
  extractDrawableScreenSpace(e) {
    const t = this._allDrawables[e];
    if (!t) {
      throw new Error(`Could not extract drawable with ID ${e}; it does not exist`);
    }
    this._doExitDrawRegion();
    const n = this._nativeSize[0] * 0.5;
    const r = this._nativeSize[1] * 0.5;
    const i = t.getFastBounds();
    const o = this.canvas;
    const a = o.width / this._nativeSize[0];
    const c = new u();
    c.initFromBounds((i.left + n) * a, (i.right + n) * a, (r - i.top) * a, (r - i.bottom) * a);
    c.snapToInt();
    i.initFromBounds(c.left / a - n, c.right / a - n, r - c.top / a, r - c.bottom / a);
    const l = this._gl;
    const h = l.getParameter(l.MAX_TEXTURE_SIZE);
    const d = Math.min(2048, c.width, h);
    const f = Math.min(2048, c.height, h);
    const m = s.createFramebufferInfo(l, [{
      format: l.RGBA
    }], d, f);
    try {
      s.bindFramebufferInfo(l, m);
      l.viewport(0, 0, d, f);
      const t = s.m4.ortho(i.left, i.right, i.top, i.bottom, -1, 1);
      l.clearColor(0, 0, 0, 0);
      l.clear(l.COLOR_BUFFER_BIT);
      this._drawThese([e], p.DRAW_MODE.straightAlpha, t, {
        effectMask: ~p.EFFECT_INFO.ghost.mask,
        framebufferWidth: o.width,
        framebufferHeight: o.height
      });
      const n = new Uint8Array(Math.floor(d * f * 4));
      l.readPixels(0, 0, d, f, l.RGBA, l.UNSIGNED_BYTE, n);
      const r = new ImageData(new Uint8ClampedArray(n.buffer), d, f);
      const a = o.getBoundingClientRect().width / o.width;
      return {
        imageData: r,
        x: c.left * a,
        y: c.bottom * a,
        width: c.width * a,
        height: c.height * a
      };
    } finally {
      l.deleteFramebuffer(m.framebuffer);
    }
  }
  extractColor(e, t, n) {
    this._doExitDrawRegion();
    const r = Math.round(this._nativeSize[0] * (e / this._gl.canvas.clientWidth - 0.5));
    const i = Math.round(-this._nativeSize[1] * (t / this._gl.canvas.clientHeight - 0.5));
    const o = this._gl;
    s.bindFramebufferInfo(o, this._queryBufferInfo);
    const a = new u();
    a.initFromBounds(r - n, r + n, i - n, i + n);
    const c = r - a.left;
    const l = a.top - i;
    o.viewport(0, 0, a.width, a.height);
    const h = s.m4.ortho(a.left, a.right, a.top, a.bottom, -1, 1);
    o.clearColor(this._backgroundColor4f[0], this._backgroundColor4f[1], this._backgroundColor4f[2], this._backgroundColor4f[3]);
    o.clear(o.COLOR_BUFFER_BIT);
    this._drawThese(this._drawList, p.DRAW_MODE.default, h);
    const d = new Uint8Array(Math.floor(a.width * a.height * 4));
    o.readPixels(0, 0, a.width, a.height, o.RGBA, o.UNSIGNED_BYTE, d);
    const f = Math.floor((l * a.width + c) * 4);
    const m = {
      r: d[f],
      g: d[f + 1],
      b: d[f + 2],
      a: d[f + 3]
    };
    if (this._debugCanvas) {
      this._debugCanvas.width = a.width;
      this._debugCanvas.height = a.height;
      const e = this._debugCanvas.getContext("2d");
      const t = e.createImageData(a.width, a.height);
      t.data.set(d);
      e.putImageData(t, 0, 0);
      e.strokeStyle = "black";
      e.fillStyle = `rgba(${m.r}, ${m.g}, ${m.b}, ${m.a})`;
      e.rect(c - 4, l - 4, 8, 8);
      e.fill();
      e.stroke();
    }
    return {
      data: d,
      width: a.width,
      height: a.height,
      color: m
    };
  }
  _touchingBounds(e) {
    const t = this._allDrawables[e];
    if (!t.skin || !t.skin.getTexture([100, 100])) {
      return null;
    }
    const n = t.getFastBounds();
    if (!this.offscreenTouching) {
      n.clamp(this._xLeft, this._xRight, this._yBottom, this._yTop);
    }
    n.snapToInt();
    if (n.width === 0 || n.height === 0) {
      return null;
    } else {
      return n;
    }
  }
  _candidatesTouching(e, t) {
    const n = this._touchingBounds(e);
    const r = [];
    if (n === null) {
      return r;
    }
    for (let i = t.length - 1; i >= 0; i--) {
      const s = t[i];
      if (s !== e) {
        const e = this._allDrawables[s];
        if (e.skin instanceof m) {
          continue;
        }
        if (e.skin && e._visible) {
          if (!this.allowPrivateSkinAccess && e.skin.private) {
            continue;
          }
          e.updateCPURenderAttributes();
          const t = e.getFastBounds();
          t.snapToInt();
          if (n.intersects(t)) {
            r.push({
              id: s,
              drawable: e,
              intersection: u.intersect(n, t)
            });
          }
        }
      }
    }
    return r;
  }
  _candidatesBounds(e) {
    return e.reduce((e, t) => {
      let {
        intersection: n
      } = t;
      if (e) {
        return u.union(e, n, T);
      } else {
        return n;
      }
    }, null);
  }
  updateDrawableSkinId(e, t) {
    const n = this._allDrawables[e];
    if (n) {
      n.skin = this._allSkins[t];
    }
  }
  updateDrawablePosition(e, t) {
    const n = this._allDrawables[e];
    if (n) {
      n.updatePosition(t);
    }
  }
  updateDrawableDirection(e, t) {
    const n = this._allDrawables[e];
    if (n) {
      n.updateDirection(t);
    }
  }
  updateDrawableScale(e, t) {
    const n = this._allDrawables[e];
    if (n) {
      n.updateScale(t);
    }
  }
  updateDrawableDirectionScale(e, t, n) {
    const r = this._allDrawables[e];
    if (r) {
      r.updateDirection(t);
      r.updateScale(n);
    }
  }
  updateDrawableVisible(e, t) {
    const n = this._allDrawables[e];
    if (n) {
      n.updateVisible(t);
    }
  }
  updateDrawableEffect(e, t, n) {
    const r = this._allDrawables[e];
    if (r) {
      r.updateEffect(t, n);
    }
  }
  updateDrawableProperties(e, t) {
    const n = this._allDrawables[e];
    if (n) {
      if ("skinId" in t) {
        this.updateDrawableSkinId(e, t.skinId);
      }
      n.updateProperties(t);
    }
  }
  getFencedPositionOfDrawable(e, t) {
    let n = t[0];
    let r = t[1];
    const i = this._allDrawables[e];
    if (!i) {
      return [n, r];
    }
    const s = n - i._position[0];
    const o = r - i._position[1];
    const a = i._skin.getFenceBounds(i, v);
    const c = Math.floor(Math.min(a.width, a.height) / 2);
    const l = this._xRight - Math.min(15, c);
    if (a.right + s < -l) {
      n = Math.ceil(i._position[0] - (l + a.right));
    } else if (a.left + s > l) {
      n = Math.floor(i._position[0] + (l - a.left));
    }
    const u = this._yTop - Math.min(15, c);
    if (a.top + o < -u) {
      r = Math.ceil(i._position[1] - (u + a.top));
    } else if (a.bottom + o > u) {
      r = Math.floor(i._position[1] + (u - a.bottom));
    }
    return [n, r];
  }
  penClear(e) {
    this.dirty = true;
    this._allSkins[e].clear();
  }
  penPoint(e, t, n, r) {
    this.dirty = true;
    this._allSkins[e].drawPoint(t, n, r);
  }
  penLine(e, t, n, r, i, s) {
    this.dirty = true;
    this._allSkins[e].drawLine(t, n, r, i, s);
  }
  penStamp(e, t) {
    const n = this._allDrawables[t];
    if (!n || !n.skin || !n.skin.isMetricsReady()) {
      return;
    }
    const r = n.getFastBounds();
    if (!this.offscreenTouching) {
      r.clamp(this._xLeft, this._xRight, this._yBottom, this._yTop);
    }
    if (r.width === 0 || r.height === 0) {
      return;
    }
    this._doExitDrawRegion();
    const i = this._allSkins[e];
    const o = this._gl;
    s.bindFramebufferInfo(o, i._framebuffer);
    const a = i.renderQuality;
    r.left *= a;
    r.right *= a;
    r.top *= a;
    r.bottom *= a;
    r.snapToInt();
    o.viewport(this._nativeSize[0] * 0.5 * a + r.left, this._nativeSize[1] * 0.5 * a - r.top, r.width, r.height);
    const c = s.m4.ortho(r.left / a, r.right / a, r.top / a, r.bottom / a, -1, 1);
    this._drawThese([t], p.DRAW_MODE.default, c, {
      ignoreVisibility: true,
      framebufferWidth: this._nativeSize[0] * a,
      framebufferHeight: this._nativeSize[1] * a
    });
    i._silhouetteDirty = true;
    this.dirty = true;
  }
  _createGeometry() {
    this._bufferInfo = s.createBufferInfoFromArrays(this._gl, {
      a_position: {
        numComponents: 2,
        data: [-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5]
      },
      a_texCoord: {
        numComponents: 2,
        data: [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1]
      }
    });
  }
  onNativeSizeChanged(e) {
    this.dirty = true;
    const [t, n] = e.newSize;
    const r = this._gl;
    const i = [{
      format: r.RGBA
    }, {
      format: r.DEPTH_STENCIL
    }];
    this._pickBufferInfo ||= s.createFramebufferInfo(r, i, S[0], S[1]);
    if (this._queryBufferInfo) {
      s.resizeFramebufferInfo(r, this._queryBufferInfo, i, t, n);
    } else {
      this._queryBufferInfo = s.createFramebufferInfo(r, i, t, n);
    }
  }
  enterDrawRegion(e, t = e.enter, n = e.exit) {
    if (this._regionId !== e) {
      this._doExitDrawRegion();
      this._regionId = e;
      t();
      this._exitRegion = n;
    }
  }
  _doExitDrawRegion() {
    if (this._exitRegion !== null) {
      this._exitRegion();
    }
    this._exitRegion = null;
    this._regionId = null;
  }
  _drawThese(e, t, n, r = {}) {
    const i = this._gl;
    let o = null;
    const a = "framebufferWidth" in r && "framebufferHeight" in r && r.framebufferWidth !== this._nativeSize[0] && r.framebufferHeight !== this._nativeSize[1];
    const c = e.length;
    for (let l = 0; l < c; ++l) {
      const c = e[l];
      if (r.filter && !r.filter(c)) {
        continue;
      }
      const u = this._allDrawables[c];
      if (!u.getVisible() && !r.ignoreVisibility) {
        continue;
      }
      const h = a ? [u.scale[0] * r.framebufferWidth / this._nativeSize[0], u.scale[1] * r.framebufferHeight / this._nativeSize[1]] : u.scale;
      if (!u.skin) {
        continue;
      }
      if (r.skipPrivateSkins && u.skin.private) {
        continue;
      }
      if (!u.skin.getTexture(h)) {
        continue;
      }
      const d = {};
      let p = u.enabledEffects;
      p &= Object.prototype.hasOwnProperty.call(r, "effectMask") ? r.effectMask : p;
      const f = this._shaderManager.getShader(t, p);
      if (this._regionId !== f) {
        this._doExitDrawRegion();
        this._regionId = f;
        o = f;
        i.useProgram(o.program);
        s.setBuffersAndAttributes(i, o, this._bufferInfo);
        Object.assign(d, {
          u_projectionMatrix: n
        });
      }
      Object.assign(d, u.skin.getUniforms(h), u.getUniforms());
      if (r.extraUniforms) {
        Object.assign(d, r.extraUniforms);
      }
      if (d.u_skin) {
        s.setTextureParameters(i, d.u_skin, {
          minMag: u.skin.useNearest(h, u) ? i.NEAREST : i.LINEAR
        });
      }
      s.setUniforms(o, d);
      s.drawBufferInfo(i, this._bufferInfo, i.TRIANGLES);
    }
    this._regionId = null;
  }
  _getConvexHullPointsForDrawable(e) {
    const t = this._allDrawables[e];
    const [n, r] = t.skin.size;
    if (!t.getVisible() || n === 0 || r === 0) {
      return [];
    }
    t.updateCPURenderAttributes();
    const o = function (e, t, n) {
      return (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]);
    };
    const a = [];
    const c = [];
    let l = -1;
    let u = -1;
    const h = s.v3.create();
    const d = s.v3.create();
    let p;
    for (let e = 0; e < r; e++) {
      h[1] = e / r;
      let i = 0;
      for (; i < n; i++) {
        h[0] = i / n;
        g.transformPoint(t, h, d);
        if (t.skin.isTouchingLinear(d)) {
          p = [i, e];
          break;
        }
      }
      if (!(i >= n)) {
        while (l > 0 && !(o(a[l], a[l - 1], p) > 0)) {
          --l;
        }
        a[++l] = p;
        i = n - 1;
        for (; i >= 0; i--) {
          h[0] = i / n;
          g.transformPoint(t, h, d);
          if (t.skin.isTouchingLinear(d)) {
            p = [i, e];
            break;
          }
        }
        while (u > 0 && !(o(c[u], c[u - 1], p) < 0)) {
          --u;
        }
        c[++u] = p;
      }
    }
    const f = a;
    f.length = l + 1;
    for (let e = u; e >= 0; --e) {
      f.push(c[e]);
    }
    return i(f, Infinity);
  }
  sampleColor4b(e, t, n) {
    (n = n || new Uint8ClampedArray(4))[0] = 0;
    n[1] = 0;
    n[2] = 0;
    let r = 1;
    for (let i = 0; r !== 0 && i < t.length; i++) {
      l.sampleColor4b(e, t[i].drawable, w);
      n[0] += w[0] * r;
      n[1] += w[1] * r;
      n[2] += w[2] * r;
      r *= 1 - w[3] / 255;
    }
    n[0] += this._backgroundColor4f[0] * 255 * r;
    n[1] += this._backgroundColor4f[1] * 255 * r;
    n[2] += this._backgroundColor4f[2] * 255 * r;
    r *= 1 - this._backgroundColor4f[3];
    n[3] = (1 - r) * 255;
    return n;
  }
  requestSnapshot(e) {
    this.dirty = true;
    this._snapshotCallbacks.push(e);
  }
  setCustomFonts(e) {
    this.customFonts = e;
    const t = Object.values(e).join("\n");
    if (t.length) {
      if (!this._customFontStyles) {
        this._customFontStyles = document.createElement("style");
        this._customFontStyles.className = "renderer-custom-fonts";
        document.head.appendChild(this._customFontStyles);
      }
      this._customFontStyles.textContent = t;
    } else if (this._customFontStyles) {
      this._customFontStyles.remove();
      this._customFontStyles = null;
    }
    if (typeof document == "object" && typeof document.fonts == "object" && typeof document.fonts.load == "function") {
      const t = Object.keys(e);
      for (const e of t) {
        document.fonts.load(`12px ${e}`);
      }
    }
  }
}
N.prototype.canHazPixels = N.prototype.extractDrawableScreenSpace;
N.UseGpuModes = {
  Automatic: "Automatic",
  ForceGPU: "ForceGPU",
  ForceCPU: "ForceCPU"
};
N.powerPreference = "default";
module.exports = N;