const r = require("./11.js");
class i {
  constructor(e) {
    this._gl = e;
    this._shaderCache = {};
    for (const e in i.DRAW_MODE) {
      if (Object.prototype.hasOwnProperty.call(i.DRAW_MODE, e)) {
        this._shaderCache[e] = [];
      }
    }
  }
  getShader(e, t) {
    const n = this._shaderCache[e];
    if (e === i.DRAW_MODE.silhouette) {
      t &= ~(i.EFFECT_INFO.color.mask | i.EFFECT_INFO.brightness.mask);
    }
    let r = n[t];
    r ||= n[t] = this._buildShader(e, t);
    return r;
  }
  _buildShader(e, t) {
    const s = i.EFFECTS.length;
    const o = [`#define DRAW_MODE_${e}`];
    for (let e = 0; e < s; ++e) {
      if (t & 1 << e) {
        o.push(`#define ENABLE_${i.EFFECTS[e]}`);
      }
    }
    const a = `${o.join("\n")}
`;
    const c = a + require("./273.js");
    const l = a + require("./274.js");
    let u = null;
    const h = r.createProgramInfo(this._gl, [c, l], null, null, e => {
      console.error(e);
      const t = e.match(/\*\*\* Error compiling shader: ([\s\S]+)/);
      u = t ? t[1].trim() : e;
    });
    if (!h) {
      throw new Error(`Failed to compile shader (mode ${e}, effects ${t}): ${u}`);
    }
    return h;
  }
}
i.EFFECT_INFO = {
  color: {
    uniformName: "u_color",
    mask: 1,
    converter: e => e / 200 % 1,
    shapeChanges: false
  },
  fisheye: {
    uniformName: "u_fisheye",
    mask: 2,
    converter: e => Math.max(0, (e + 100) / 100),
    shapeChanges: true
  },
  whirl: {
    uniformName: "u_whirl",
    mask: 4,
    converter: e => -e * Math.PI / 180,
    shapeChanges: true
  },
  pixelate: {
    uniformName: "u_pixelate",
    mask: 8,
    converter: e => Math.abs(e) / 10,
    shapeChanges: true
  },
  mosaic: {
    uniformName: "u_mosaic",
    mask: 16,
    converter: e => {
      e = Math.round((Math.abs(e) + 10) / 10);
      return Math.max(1, Math.min(e, 512));
    },
    shapeChanges: true
  },
  brightness: {
    uniformName: "u_brightness",
    mask: 32,
    converter: e => Math.max(-100, Math.min(e, 100)) / 100,
    shapeChanges: false
  },
  ghost: {
    uniformName: "u_ghost",
    mask: 64,
    converter: e => 1 - Math.max(0, Math.min(e, 100)) / 100,
    shapeChanges: false
  }
};
i.EFFECTS = Object.keys(i.EFFECT_INFO);
i.DRAW_MODE = {
  default: "default",
  straightAlpha: "straightAlpha",
  silhouette: "silhouette",
  colorMask: "colorMask",
  line: "line",
  background: "background"
};
module.exports = i;