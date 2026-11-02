const r = require("./11.js");
const i = require("./36.js");
const s = require("./27.js");
const o = require("./28.js");
const a = {
  color4f: [0, 0, 1, 1],
  diameter: 1
};
const c = 163800;
module.exports = class extends s {
  constructor(e, t) {
    super(e, t);
    this._size = null;
    this._framebuffer = null;
    this._silhouetteDirty = false;
    this._silhouettePixels = null;
    this._silhouetteImageData = null;
    this._lineOnBufferDrawRegionId = {
      enter: () => this._enterDrawLineOnBuffer(),
      exit: () => this._exitDrawLineOnBuffer()
    };
    this._usePenBufferDrawRegionId = {
      enter: () => this._enterUsePenBuffer(),
      exit: () => this._exitUsePenBuffer()
    };
    const n = this._renderer.gl;
    this.renderQuality = 1;
    this._nativeSize = t.getNativeSize();
    this._lineShader = this._renderer._shaderManager.getShader(o.DRAW_MODE.line, 0);
    this._drawTextureShader = this._renderer._shaderManager.getShader(o.DRAW_MODE.default, 0);
    this._drawTextureRegionId = {
      enter: () => this._enterDrawTexture(),
      exit: () => this._exitDrawTexture()
    };
    this.a_position_glbuffer = n.createBuffer();
    this.a_position_loc = n.getAttribLocation(this._lineShader.program, "a_position");
    this.a_lineColor_loc = n.getAttribLocation(this._lineShader.program, "a_lineColor");
    this.a_lineThicknessAndLength_loc = n.getAttribLocation(this._lineShader.program, "a_lineThicknessAndLength");
    this.a_penPoints_loc = n.getAttribLocation(this._lineShader.program, "a_penPoints");
    this.attribute_glbuffer = n.createBuffer();
    this.attribute_index = 0;
    this.attribute_data = new Float32Array(c);
    n.bindBuffer(n.ARRAY_BUFFER, this.attribute_glbuffer);
    n.bufferData(n.ARRAY_BUFFER, this.attribute_data.length * 4, n.STREAM_DRAW);
    if (n.drawArraysInstanced) {
      this.instancedRendering = true;
      this.glDrawArraysInstanced = n.drawArraysInstanced.bind(n);
      this.glVertexAttribDivisor = n.vertexAttribDivisor.bind(n);
    } else {
      const e = n.getExtension("ANGLE_instanced_arrays");
      if (e) {
        this.instancedRendering = true;
        this.glDrawArraysInstanced = e.drawArraysInstancedANGLE.bind(e);
        this.glVertexAttribDivisor = e.vertexAttribDivisorANGLE.bind(e);
      } else {
        this.instancedRendering = false;
      }
    }
    if (this.instancedRendering) {
      n.bindBuffer(n.ARRAY_BUFFER, this.a_position_glbuffer);
      n.bufferData(n.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), n.STATIC_DRAW);
    } else {
      const e = new Float32Array(32760);
      for (let t = 0; t < e.length; t += 12) {
        e[t + 0] = 1;
        e[t + 1] = 0;
        e[t + 2] = 0;
        e[t + 3] = 0;
        e[t + 4] = 1;
        e[t + 5] = 1;
        e[t + 6] = 1;
        e[t + 7] = 1;
        e[t + 8] = 0;
        e[t + 9] = 0;
        e[t + 10] = 0;
        e[t + 11] = 1;
      }
      n.bindBuffer(n.ARRAY_BUFFER, this.a_position_glbuffer);
      n.bufferData(n.ARRAY_BUFFER, e, n.STATIC_DRAW);
    }
    this.onNativeSizeChanged = this.onNativeSizeChanged.bind(this);
    this._renderer.on(i.Events.NativeSizeChanged, this.onNativeSizeChanged);
    this._setCanvasSize(t.getNativeSize());
  }
  dispose() {
    this._renderer.removeListener(i.Events.NativeSizeChanged, this.onNativeSizeChanged);
    this._renderer.gl.deleteTexture(this._texture);
    this._texture = null;
    super.dispose();
  }
  get size() {
    return this._nativeSize;
  }
  useNearest(e) {
    return Math.max(e[0], e[1]) >= 100;
  }
  getTexture(e) {
    return this._texture;
  }
  clear() {
    this._renderer.enterDrawRegion(this._usePenBufferDrawRegionId);
    const e = this._renderer.gl;
    e.clearColor(0, 0, 0, 0);
    e.clear(e.COLOR_BUFFER_BIT);
    this._silhouetteDirty = true;
  }
  drawPoint(e, t, n) {
    this.drawLine(e, t, n, t, n);
  }
  drawLine(e, t, n, r, i) {
    const s = e.diameter || a.diameter;
    const o = s === 1 || s === 3 ? 0.5 : 0;
    this._drawLineOnBuffer(e, t + o, n + o, r + o, i + o);
    this._silhouetteDirty = true;
  }
  _enterDrawLineOnBuffer() {
    const e = this._renderer.gl;
    r.bindFramebufferInfo(e, this._framebuffer);
    e.viewport(0, 0, this._size[0], this._size[1]);
    const t = this._lineShader;
    e.useProgram(t.program);
    const n = {
      u_skin: this._texture,
      u_stageSize: this._size
    };
    r.setUniforms(t, n);
    e.bindBuffer(e.ARRAY_BUFFER, this.a_position_glbuffer);
    e.enableVertexAttribArray(this.a_position_loc);
    e.vertexAttribPointer(this.a_position_loc, 2, e.FLOAT, false, 8, 0);
    this.attribute_index = 0;
  }
  _exitDrawLineOnBuffer() {
    if (this.attribute_index) {
      this._flushLines();
    }
    const e = this._renderer.gl;
    r.bindFramebufferInfo(e, null);
  }
  _enterUsePenBuffer() {
    r.bindFramebufferInfo(this._renderer.gl, this._framebuffer);
  }
  _exitUsePenBuffer() {
    r.bindFramebufferInfo(this._renderer.gl, null);
  }
  _enterDrawTexture() {
    this._enterUsePenBuffer();
    const e = this._renderer.gl;
    e.viewport(0, 0, this._size[0], this._size[1]);
    e.useProgram(this._drawTextureShader.program);
    r.setBuffersAndAttributes(e, this._drawTextureShader, this._renderer._bufferInfo);
  }
  _exitDrawTexture() {
    this._exitUsePenBuffer();
  }
  _drawPenTexture(e) {
    this._renderer.enterDrawRegion(this._drawTextureRegionId);
    const t = this._renderer.gl;
    const n = this._size[0];
    const i = this._size[1];
    const s = {
      u_skin: e,
      u_projectionMatrix: r.m4.ortho(n / 2, n / -2, i / -2, i / 2, -1, 1, r.m4.identity()),
      u_modelMatrix: r.m4.scaling(r.v3.create(n, i, 0), r.m4.identity())
    };
    r.setTextureParameters(t, e, {
      minMag: t.NEAREST
    });
    r.setUniforms(this._drawTextureShader, s);
    r.drawBufferInfo(t, this._renderer._bufferInfo, t.TRIANGLES);
  }
  _drawLineOnBuffer(e, t, n, r, i) {
    this._renderer.enterDrawRegion(this._lineOnBufferDrawRegionId);
    const s = this.instancedRendering ? 1 : 6;
    if (this.attribute_index + s * 10 > c) {
      this._flushLines();
    }
    const o = e.color4f || a.color4f;
    t *= this.renderQuality;
    n *= this.renderQuality;
    const l = (r *= this.renderQuality) - t;
    const u = (i *= this.renderQuality) - n;
    const h = Math.sqrt(l * l + u * u);
    const d = (e.diameter || a.diameter) * this.renderQuality;
    for (let e = 0; e < s; e++) {
      this.attribute_data[this.attribute_index] = o[0] * o[3];
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = o[1] * o[3];
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = o[2] * o[3];
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = o[3];
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = d;
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = h;
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = t;
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = -n;
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = l;
      this.attribute_index++;
      this.attribute_data[this.attribute_index] = -u;
      this.attribute_index++;
    }
  }
  _flushLines() {
    const e = this._renderer.gl;
    e.bindBuffer(e.ARRAY_BUFFER, this.attribute_glbuffer);
    e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.attribute_data.buffer, 0, this.attribute_index));
    e.enableVertexAttribArray(this.a_lineColor_loc);
    e.vertexAttribPointer(this.a_lineColor_loc, 4, e.FLOAT, false, 40, 0);
    e.enableVertexAttribArray(this.a_lineThicknessAndLength_loc);
    e.vertexAttribPointer(this.a_lineThicknessAndLength_loc, 2, e.FLOAT, false, 40, 16);
    e.enableVertexAttribArray(this.a_penPoints_loc);
    e.vertexAttribPointer(this.a_penPoints_loc, 4, e.FLOAT, false, 40, 24);
    if (this.instancedRendering) {
      this.glVertexAttribDivisor(this.a_lineColor_loc, 1);
      this.glVertexAttribDivisor(this.a_lineThicknessAndLength_loc, 1);
      this.glVertexAttribDivisor(this.a_penPoints_loc, 1);
      this.glDrawArraysInstanced(e.TRIANGLE_STRIP, 0, 4, this.attribute_index / 10);
      this.glVertexAttribDivisor(this.a_lineColor_loc, 0);
      this.glVertexAttribDivisor(this.a_lineThicknessAndLength_loc, 0);
      this.glVertexAttribDivisor(this.a_penPoints_loc, 0);
    } else {
      e.drawArrays(e.TRIANGLES, 0, this.attribute_index / 10);
    }
    this.attribute_index = 0;
    this._silhouetteDirty = true;
  }
  onNativeSizeChanged(e) {
    this._nativeSize = e.newSize;
    this._setCanvasSize([e.newSize[0] * this.renderQuality, e.newSize[1] * this.renderQuality]);
    this.emitWasAltered();
  }
  _setCanvasSize(e) {
    const [t, n] = e;
    if (this._size && this._size[0] === t && this._size[1] === n) {
      return;
    }
    this._size = e;
    this._rotationCenter[0] = this._nativeSize[0] / 2;
    this._rotationCenter[1] = this._nativeSize[1] / 2;
    const i = this._renderer.gl;
    const s = this._texture;
    this._texture = r.createTexture(i, {
      mag: i.NEAREST,
      min: i.NEAREST,
      wrap: i.CLAMP_TO_EDGE,
      width: t,
      height: n
    });
    const o = [{
      format: i.RGBA,
      attachment: this._texture
    }];
    this._framebuffer;
    this._framebuffer = r.createFramebufferInfo(i, o, t, n);
    i.clearColor(0, 0, 0, 0);
    i.clear(i.COLOR_BUFFER_BIT);
    if (s) {
      this._drawPenTexture(s);
    }
    this._silhouettePixels = new Uint8Array(Math.floor(t * n * 4));
    this._silhouetteImageData = new ImageData(t, n);
    this._silhouetteDirty = true;
  }
  setRenderQuality(e) {
    if (this.renderQuality !== e) {
      this.renderQuality = e;
      this._setCanvasSize([Math.round(this._nativeSize[0] * e), Math.round(this._nativeSize[1] * e)]);
    }
  }
  updateSilhouette() {
    if (this._silhouetteDirty) {
      this._renderer.enterDrawRegion(this._usePenBufferDrawRegionId);
      const e = this._renderer.gl;
      e.readPixels(0, 0, this._size[0], this._size[1], e.RGBA, e.UNSIGNED_BYTE, this._silhouettePixels);
      this._silhouetteImageData.data.set(this._silhouettePixels);
      this._silhouette.update(this._silhouetteImageData, true);
      this._silhouetteDirty = false;
    }
  }
};