const r = require("./3.js");
const i = require("./2.js");
const s = require("./40.js");
const o = require("./1.js");
const a = require("./12.js");
const c = require("./23.js");
const l = require("./5.js");
const u = require("./4.js");
const h = require("./0.js");
const d = require("./13.js");
const p = new Float64Array(256);
for (let e = 0; e < 256; e++) {
  p[e] = e / 255;
}
const f = "color";
const m = "saturation";
const g = "brightness";
const b = "transparency";
class y {
  constructor(e) {
    this.runtime = e;
    this._penDrawableId = -1;
    this._penSkinId = -1;
    this._onTargetCreated = this._onTargetCreated.bind(this);
    this._onTargetMoved = this._onTargetMoved.bind(this);
    e.on("targetWasCreated", this._onTargetCreated);
    e.on("RUNTIME_DISPOSED", this.clear.bind(this));
  }
  static get DEFAULT_PEN_STATE() {
    return {
      penDown: false,
      color: 66.66,
      saturation: 100,
      brightness: 100,
      transparency: 0,
      _shade: 50,
      penAttributes: {
        color4f: [0, 0, 1, 1],
        diameter: 1
      }
    };
  }
  static get PEN_SIZE_RANGE() {
    return {
      min: 1,
      max: 1200
    };
  }
  static get STATE_KEY() {
    return "Scratch.pen";
  }
  _clampPenSize(e) {
    if (this.runtime.renderer && this.runtime.renderer.useHighQualityRender || !this.runtime.runtimeOptions.miscLimits) {
      return Math.max(0, e);
    } else {
      return u.clamp(e, y.PEN_SIZE_RANGE.min, y.PEN_SIZE_RANGE.max);
    }
  }
  _getPenLayerID() {
    const e = this.runtime.renderer;
    if (this._penSkinId < 0 && e) {
      this._penSkinId = e.createPenSkin();
      this._penDrawableId = e.createDrawable(d.PEN_LAYER);
      if (e.markDrawableAsNoninteractive) {
        e.markDrawableAsNoninteractive(this._penDrawableId);
      }
      e.updateDrawableSkinId(this._penDrawableId, this._penSkinId);
    }
    return this._penSkinId;
  }
  _getPenState(e) {
    let t = e._customState["Scratch.pen"];
    if (!t) {
      t = a.simple(y.DEFAULT_PEN_STATE);
      e.setCustomState(y.STATE_KEY, t);
    }
    return t;
  }
  _onTargetCreated(e, t) {
    if (t) {
      const n = t.getCustomState(y.STATE_KEY);
      if (n) {
        e.setCustomState(y.STATE_KEY, a.simple(n));
        if (n.penDown) {
          e.onTargetMoved = this._onTargetMoved;
        }
      }
    }
  }
  _onTargetMoved(e, t, n, r) {
    if (!r) {
      const r = this._getPenLayerID();
      if (r >= 0) {
        const i = this._getPenState(e);
        this.runtime.renderer.penLine(r, i.penAttributes, t, n, e.x, e.y);
        this.runtime.requestRedraw();
      }
    }
  }
  _wrapColor(e) {
    return u.wrapClamp(e, 0, 100);
  }
  _initColorParam() {
    return [{
      text: l({
        id: "pen.colorMenu.color",
        default: "color",
        description: "label for color element in color picker for pen extension"
      }),
      value: f
    }, {
      text: l({
        id: "pen.colorMenu.saturation",
        default: "saturation",
        description: "label for saturation element in color picker for pen extension"
      }),
      value: m
    }, {
      text: l({
        id: "pen.colorMenu.brightness",
        default: "brightness",
        description: "label for brightness element in color picker for pen extension"
      }),
      value: g
    }, {
      text: l({
        id: "pen.colorMenu.transparency",
        default: "transparency",
        description: "label for transparency element in color picker for pen extension"
      }),
      value: b
    }];
  }
  _clampColorParam(e) {
    return u.clamp(e, 0, 100);
  }
  _alphaToTransparency(e) {
    return (1 - e) * 100;
  }
  _transparencyToAlpha(e) {
    return 1 - e / 100;
  }
  getInfo() {
    return {
      id: "pen",
      name: l({
        id: "pen.categoryName",
        default: "Pen",
        description: "Label for the pen extension category"
      }),
      blockIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im04Ljc1MyAzNC42MDItNC4yNSAxLjc4IDEuNzgzLTQuMjM3YzEuMjE4LTIuODkyIDIuOTA3LTUuNDIzIDUuMDMtNy41MzhMMzEuMDY2IDQuOTNjLjg0Ni0uODQyIDIuNjUtLjQxIDQuMDMyLjk2NyAxLjM4IDEuMzc1IDEuODE2IDMuMTczLjk3IDQuMDE1TDE2LjMxOCAyOS41OWMtMi4xMjMgMi4xMTYtNC42NjQgMy44LTcuNTY1IDUuMDEyIi8+PHBhdGggZD0iTTI5LjQxIDYuMTFzLTQuNDUtMi4zNzgtOC4yMDIgNS43NzJjLTEuNzM0IDMuNzY2LTQuMzUgMS41NDYtNC4zNSAxLjU0NiIvPjxwYXRoIGZpbGw9IiM0Yzk3ZmYiIGQ9Ik0zNi40MiA4LjgyNWMwIC40NjMtLjE0Ljg3My0uNDMyIDEuMTY0bC05LjMzNSA5LjNjLjI4Mi0uMjkuNDEtLjY2OC40MS0xLjEyIDAtLjg3NC0uNTA3LTEuOTYzLTEuNDA2LTIuODY4LTEuMzYyLTEuMzU4LTMuMTQ3LTEuOC00LjAwMi0uOTlMMzAuOTkgNS4wMWMuODQ0LS44NCAyLjY1LS40MSA0LjAzNS45Ni44OTguOTA0IDEuMzk2IDEuOTgyIDEuMzk2IDIuODU1TTEwLjUxNSAzMy43NzRhMjQgMjQgMCAwIDEtMS43NjQuODNMNC41IDM2LjM4MmwxLjc4Ni00LjIzNWMuMjU4LS42MDQuNTMtMS4xODYuODMzLTEuNzU3LjY5LjE4MyAxLjQ0OC42MjUgMi4xMDggMS4yODIuNjYuNjU4IDEuMTAyIDEuNDEyIDEuMjg3IDIuMTAyIi8+PHBhdGggZmlsbD0iIzU3NWU3NSIgZD0iTTM2LjQ5OCA4Ljc0OGMwIC40NjQtLjE0Ljg3NC0uNDMzIDEuMTY1bC0xOS43NDIgMTkuNjhjLTIuMTMgMi4xMS00LjY3MyAzLjc5My03LjU3MiA1LjAxTDQuNSAzNi4zOGwuOTc0LTIuMzE2IDEuOTI1LS44MDhjMi44OTgtMS4yMTggNS40NC0yLjkgNy41Ny01LjAxbDE5Ljc0My0xOS42OGMuMjkyLS4yOTIuNDMyLS43MDIuNDMyLTEuMTY1IDAtLjY0Ni0uMjctMS40LS43OC0yLjEyMi4yNS4xNzIuNS4zNzcuNzM3LjYxNC44OTguOTA1IDEuMzk2IDEuOTgzIDEuMzk2IDIuODU2IiBvcGFjaXR5PSIuMTUiLz48cGF0aCBmaWxsPSIjNTc1ZTc1IiBkPSJNMTguNDUgMTIuODNhLjkwNC45MDQgMCAxIDEtLjkwMy0uOTAyYy41IDAgLjkwNC40MDQuOTA0LjkwNHoiLz48L2c+PC9zdmc+",
      blocks: [{
        blockType: i.LABEL,
        text: l({
          id: "tw.pen.stageSelected",
          default: "Stage selected: less pen blocks",
          description: "Label that appears in the Pen category when the stage is selected"
        }),
        filter: [s.STAGE]
      }, {
        opcode: "clear",
        blockType: i.COMMAND,
        text: l({
          id: "pen.clear",
          default: "erase all",
          description: "erase all pen trails and stamps"
        })
      }, {
        opcode: "stamp",
        blockType: i.COMMAND,
        text: l({
          id: "pen.stamp",
          default: "stamp",
          description: "render current costume on the background"
        }),
        filter: [s.SPRITE]
      }, {
        opcode: "penDown",
        blockType: i.COMMAND,
        text: l({
          id: "pen.penDown",
          default: "pen down",
          description: "start leaving a trail when the sprite moves"
        }),
        filter: [s.SPRITE]
      }, {
        opcode: "penUp",
        blockType: i.COMMAND,
        text: l({
          id: "pen.penUp",
          default: "pen up",
          description: "stop leaving a trail behind the sprite"
        }),
        filter: [s.SPRITE]
      }, {
        opcode: "setPenColorToColor",
        blockType: i.COMMAND,
        text: l({
          id: "pen.setColor",
          default: "set pen color to [COLOR]",
          description: "set the pen color to a particular (RGB) value"
        }),
        arguments: {
          COLOR: {
            type: r.COLOR
          }
        },
        filter: [s.SPRITE]
      }, {
        opcode: "changePenColorParamBy",
        blockType: i.COMMAND,
        text: l({
          id: "pen.changeColorParam",
          default: "change pen [COLOR_PARAM] by [VALUE]",
          description: "change the state of a pen color parameter"
        }),
        arguments: {
          COLOR_PARAM: {
            type: r.STRING,
            menu: "colorParam",
            defaultValue: f
          },
          VALUE: {
            type: r.NUMBER,
            defaultValue: 10
          }
        },
        filter: [s.SPRITE]
      }, {
        opcode: "setPenColorParamTo",
        blockType: i.COMMAND,
        text: l({
          id: "pen.setColorParam",
          default: "set pen [COLOR_PARAM] to [VALUE]",
          description: "set the state for a pen color parameter e.g. saturation"
        }),
        arguments: {
          COLOR_PARAM: {
            type: r.STRING,
            menu: "colorParam",
            defaultValue: f
          },
          VALUE: {
            type: r.NUMBER,
            defaultValue: 50
          }
        },
        filter: [s.SPRITE]
      }, {
        opcode: "changePenSizeBy",
        blockType: i.COMMAND,
        text: l({
          id: "pen.changeSize",
          default: "change pen size by [SIZE]",
          description: "change the diameter of the trail left by a sprite"
        }),
        arguments: {
          SIZE: {
            type: r.NUMBER,
            defaultValue: 1
          }
        },
        filter: [s.SPRITE]
      }, {
        opcode: "setPenSizeTo",
        blockType: i.COMMAND,
        text: l({
          id: "pen.setSize",
          default: "set pen size to [SIZE]",
          description: "set the diameter of a trail left by a sprite"
        }),
        arguments: {
          SIZE: {
            type: r.NUMBER,
            defaultValue: 1
          }
        },
        filter: [s.SPRITE]
      }, {
        opcode: "setPenShadeToNumber",
        blockType: i.COMMAND,
        text: l({
          id: "pen.setShade",
          default: "set pen shade to [SHADE]",
          description: "legacy pen blocks - set pen shade"
        }),
        arguments: {
          SHADE: {
            type: r.NUMBER,
            defaultValue: 1
          }
        },
        hideFromPalette: true
      }, {
        opcode: "changePenShadeBy",
        blockType: i.COMMAND,
        text: l({
          id: "pen.changeShade",
          default: "change pen shade by [SHADE]",
          description: "legacy pen blocks - change pen shade"
        }),
        arguments: {
          SHADE: {
            type: r.NUMBER,
            defaultValue: 1
          }
        },
        hideFromPalette: true
      }, {
        opcode: "setPenHueToNumber",
        blockType: i.COMMAND,
        text: l({
          id: "pen.setHue",
          default: "set pen color to [HUE]",
          description: "legacy pen blocks - set pen color to number"
        }),
        arguments: {
          HUE: {
            type: r.NUMBER,
            defaultValue: 1
          }
        },
        hideFromPalette: true
      }, {
        opcode: "changePenHueBy",
        blockType: i.COMMAND,
        text: l({
          id: "pen.changeHue",
          default: "change pen color by [HUE]",
          description: "legacy pen blocks - change pen color"
        }),
        arguments: {
          HUE: {
            type: r.NUMBER,
            defaultValue: 1
          }
        },
        hideFromPalette: true
      }],
      menus: {
        colorParam: {
          acceptReporters: true,
          items: this._initColorParam()
        }
      }
    };
  }
  clear() {
    const e = this._getPenLayerID();
    if (e >= 0) {
      this.runtime.renderer.penClear(e);
      this.runtime.requestRedraw();
    }
  }
  stamp(e, t) {
    this._stamp(t.target);
  }
  _stamp(e) {
    const t = this._getPenLayerID();
    if (t >= 0) {
      this.runtime.renderer.penStamp(t, e.drawableID);
      this.runtime.requestRedraw();
    }
  }
  penDown(e, t) {
    this._penDown(t.target);
  }
  _penDown(e) {
    const t = this._getPenState(e);
    if (!t.penDown) {
      t.penDown = true;
      e.onTargetMoved = this._onTargetMoved;
    }
    const n = this._getPenLayerID();
    if (n >= 0) {
      this.runtime.renderer.penPoint(n, t.penAttributes, e.x, e.y);
      this.runtime.requestRedraw();
    }
  }
  penUp(e, t) {
    this._penUp(t.target);
  }
  _penUp(e) {
    const t = this._getPenState(e);
    if (t.penDown) {
      t.penDown = false;
      e.onTargetMoved = null;
    }
  }
  setPenColorToColor(e, t) {
    this._setPenColorToColor(e.COLOR, t.target);
  }
  _setPenColorToColor(e, t) {
    const n = this._getPenState(t);
    let r;
    let i;
    let s;
    if (typeof e == "string" && e.charCodeAt(0) === 35) {
      const t = c.hexToRgb(e);
      if (t) {
        r = t.r;
        i = t.g;
        s = t.b;
      } else {
        r = 0;
        i = 0;
        s = 0;
      }
      n.transparency = 0;
    } else {
      const t = o.toNumber(e);
      const a = t >> 24 & 255;
      r = t >> 16 & 255;
      i = t >> 8 & 255;
      s = t & 255;
      n.transparency = (1 - (a > 0 ? a : 255) / 255) * 100;
    }
    const a = p[r];
    const l = p[i];
    const u = p[s];
    const h = Math.min(Math.min(a, l), u);
    const d = Math.max(Math.max(a, l), u);
    let f = 0;
    let m = 0;
    if (h !== d) {
      f = ((a === h ? 3 : l === h ? 5 : 1) - (a === h ? l - u : l === h ? u - a : a - l) / (d - h)) * 60;
      if (f === 360) {
        f = 0;
      }
      m = (d - h) / d;
    }
    n.color = f / 360 * 100;
    n.saturation = m * 100;
    n.brightness = d * 100;
    n._shade = n.brightness / 2;
    this._updatePenColor(n);
  }
  _updatePenColor(e) {
    const t = c.hsvToRgb({
      h: e.color * 360 / 100,
      s: e.saturation / 100,
      v: e.brightness / 100
    });
    e.penAttributes.color4f[0] = t.r / 255;
    e.penAttributes.color4f[1] = t.g / 255;
    e.penAttributes.color4f[2] = t.b / 255;
    e.penAttributes.color4f[3] = this._transparencyToAlpha(e.transparency);
  }
  _setOrChangeColorParam(e, t, n, r) {
    switch (e) {
      case f:
        n.color = this._wrapColor(t + (r ? n.color : 0));
        break;
      case m:
        n.saturation = this._clampColorParam(t + (r ? n.saturation : 0));
        break;
      case g:
        n.brightness = this._clampColorParam(t + (r ? n.brightness : 0));
        break;
      case b:
        n.transparency = this._clampColorParam(t + (r ? n.transparency : 0));
        break;
      default:
        h.warn(`Tried to set or change unknown color parameter: ${e}`);
    }
    this._updatePenColor(n);
  }
  changePenColorParamBy(e, t) {
    const n = this._getPenState(t.target);
    this._setOrChangeColorParam(e.COLOR_PARAM, o.toNumber(e.VALUE), n, true);
  }
  setPenColorParamTo(e, t) {
    const n = this._getPenState(t.target);
    this._setOrChangeColorParam(e.COLOR_PARAM, o.toNumber(e.VALUE), n, false);
  }
  changePenSizeBy(e, t) {
    this._changePenSizeBy(o.toNumber(e.SIZE), t.target);
  }
  _changePenSizeBy(e, t) {
    const n = this._getPenState(t).penAttributes;
    n.diameter = this._clampPenSize(n.diameter + e);
  }
  setPenSizeTo(e, t) {
    this._setPenSizeTo(o.toNumber(e.SIZE), t.target);
  }
  _setPenSizeTo(e, t) {
    this._getPenState(t).penAttributes.diameter = this._clampPenSize(e);
  }
  setPenHueToNumber(e, t) {
    this._setPenHueToNumber(o.toNumber(e.HUE), t.target);
  }
  _setPenHueToNumber(e, t) {
    const n = this._getPenState(t);
    const r = e / 2;
    this._setOrChangeColorParam(f, r, n, false);
    this._setOrChangeColorParam(b, 0, n, false);
    this._legacyUpdatePenColor(n);
  }
  changePenHueBy(e, t) {
    this._changePenHueBy(o.toNumber(e.HUE), t.target);
  }
  _changePenHueBy(e, t) {
    const n = this._getPenState(t);
    const r = e / 2;
    this._setOrChangeColorParam(f, r, n, true);
    this._legacyUpdatePenColor(n);
  }
  setPenShadeToNumber(e, t) {
    this._setPenShadeToNumber(o.toNumber(e.SHADE), t.target);
  }
  _setPenShadeToNumber(e, t) {
    const n = this._getPenState(t);
    let r = o.toNumber(e);
    r %= 200;
    if (r < 0) {
      r += 200;
    }
    n._shade = r;
    this._legacyUpdatePenColor(n);
  }
  changePenShadeBy(e, t) {
    this._changePenShadeBy(e.SHADE, t.target);
  }
  _changePenShadeBy(e, t) {
    const n = this._getPenState(t);
    const r = o.toNumber(e);
    this._setPenShadeToNumber(n._shade + r, t);
  }
  _legacyUpdatePenColor(e) {
    let t = c.hsvToRgb({
      h: e.color * 360 / 100,
      s: 1,
      v: 1
    });
    const n = e._shade > 100 ? 200 - e._shade : e._shade;
    t = n < 50 ? c.mixRgb(c.RGB_BLACK, t, (10 + n) / 60) : c.mixRgb(t, c.RGB_WHITE, (n - 50) / 60);
    const r = c.rgbToHsv(t);
    e.color = r.h * 100 / 360;
    e.saturation = r.s * 100;
    e.brightness = r.v * 100;
    this._updatePenColor(e);
  }
}
module.exports = y;