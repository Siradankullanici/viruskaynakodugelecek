const r = require("./4.js");
const i = e => Math.round(e * 1000) / 1000;
module.exports = class {
  constructor(e) {
    this._clientX = 0;
    this._clientY = 0;
    this._scratchX = 0;
    this._scratchY = 0;
    this._buttons = new Set();
    this.usesRightClickDown = false;
    this._isDown = false;
    this.runtime = e;
  }
  _activateClickHats(e) {
    this.runtime.startHats("event_whenthisspriteclicked", null, e);
    this.runtime.startHats("event_whenstageclicked", null, e);
  }
  _pickTarget(e, t) {
    if (this.runtime.renderer) {
      const n = this.runtime.renderer.pick(e, t);
      for (let e = 0; e < this.runtime.targets.length; e++) {
        const t = this.runtime.targets[e];
        if (Object.prototype.hasOwnProperty.call(t, "drawableID") && t.drawableID === n) {
          return t;
        }
      }
    }
    return this.runtime.getTargetForStage();
  }
  postData(e) {
    if (typeof e.x == "number") {
      this._clientX = e.x;
      this._scratchX = r.clamp(this.runtime.stageWidth * (e.x / e.canvasWidth - 0.5), -this.runtime.stageWidth / 2, this.runtime.stageWidth / 2);
    }
    if (typeof e.y == "number") {
      this._clientY = e.y;
      this._scratchY = r.clamp(-this.runtime.stageHeight * (e.y / e.canvasHeight - 0.5), -this.runtime.stageHeight / 2, this.runtime.stageHeight / 2);
    }
    if (e.isDown !== undefined) {
      const t = e.button === undefined ? 0 : e.button;
      if (e.isDown) {
        this._buttons.add(t);
      } else {
        this._buttons.delete(t);
      }
      const n = this._isDown;
      this._isDown = e.isDown;
      if (n === this._isDown) {
        return;
      }
      if (e.wasDragged) {
        return;
      }
      if (!(e.x > 0) || !(e.x < e.canvasWidth) || !(e.y > 0) || !(e.y < e.canvasHeight)) {
        return;
      }
      const r = this._pickTarget(e.x, e.y);
      if (r) {
        const e = !n && this._isDown;
        const t = n && !this._isDown;
        if (r.draggable && t || !r.draggable && e) {
          this._activateClickHats(r);
        }
      }
    }
  }
  getClientX() {
    return this._clientX;
  }
  getClientY() {
    return this._clientY;
  }
  getScratchX() {
    if (this.runtime.runtimeOptions.miscLimits) {
      return Math.round(this._scratchX);
    } else {
      return i(this._scratchX);
    }
  }
  getScratchY() {
    if (this.runtime.runtimeOptions.miscLimits) {
      return Math.round(this._scratchY);
    } else {
      return i(this._scratchY);
    }
  }
  getIsDown() {
    return this._isDown;
  }
  getButtonIsDown(e) {
    if (e === 2) {
      this.usesRightClickDown = true;
    }
    return this._buttons.has(e);
  }
};