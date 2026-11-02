const r = require("./6.js");
const i = require("./0.js");
const s = require("./73.js");
const {
  loadSvgString: o,
  serializeSvgToString: a
} = require("./25.js");
const {
  parseVectorMetadata: c
} = require("./80.js");
const l = function (e, t, n, r) {
  return new Promise(i => {
    let s = e.asset.decodeText();
    if (n === undefined) {
      const t = c(s);
      if (t) {
        n = t;
        e.rotationCenterX = n[0];
        e.rotationCenterY = n[1];
      }
    }
    if (r && r === 2) {
      const n = a(o(s, true));
      if (s !== n) {
        s = n;
        const r = t.storage;
        e.asset.encodeTextData(n, r.DataFormat.SVG, true);
        e.assetId = e.asset.assetId;
        e.md5 = `${e.assetId}.${e.dataFormat}`;
      }
    }
    e.skinId = t.renderer.createSVGSkin(s, n);
    e.size = t.renderer.getSkinSize(e.skinId);
    if (!n) {
      n = t.renderer.getSkinRotationCenter(e.skinId);
      e.rotationCenterX = n[0];
      e.rotationCenterY = n[1];
      e.bitmapResolution = 1;
    }
    if (t.isPackaged) {
      e.asset = null;
    }
    i(e);
  });
};
const u = new class {
  constructor() {
    this.pool = [];
    this.clearSoon = null;
  }
  clear() {
    this.clearSoon ||= new Promise(e => setTimeout(e, 1000)).then(() => {
      this.pool.length = 0;
      this.clearSoon = null;
    });
  }
  create() {
    return this.pool.pop() || document.createElement("canvas");
  }
  release(e) {
    this.clear();
    this.pool.push(e);
  }
}();
const h = e => new Promise((t, n) => {
  const r = new Image();
  r.onload = function () {
    t(r);
    r.onload = null;
    r.onerror = null;
  };
  r.onerror = function () {
    n(new Error("Costume load failed. Asset could not be read."));
    r.onload = null;
    r.onerror = null;
  };
  r.src = e;
});
const d = new s(async e => {
  let t;
  for (let n = 0; n < 3; n++) {
    try {
      if (typeof createImageBitmap == "function") {
        const t = await createImageBitmap(new Blob([e.data.buffer], {
          type: e.assetType.contentType
        }));
        if (!t) {
          throw new Error(`createImageBitmap resolved with ${t}`);
        }
        return t;
      }
      return await h(e.encodeDataURI());
    } catch (e) {
      t ||= e;
      i.warn(e);
      await new Promise(e => setTimeout(e, Math.random() * 2000));
    }
  }
  throw t;
}, 25);
const p = function (e, t, n) {
  return function (e, t, n) {
    if (e && e.asset) {
      if (t.v2BitmapAdapter) {
        return Promise.all([e.asset, e.textLayerAsset].map(e => e ? d.do(e) : null)).then(r => {
          let [i, s] = r;
          if (!i) {
            throw new Error("Loading bitmap costume base failed.");
          }
          const o = e.bitmapResolution === 1 ? 2 : 1;
          let a;
          let c;
          if (s) {
            c = u.create();
            c.width = i.width;
            c.height = i.height;
            const e = c.getContext("2d");
            e.drawImage(i, 0, 0);
            e.drawImage(s, 0, 0);
            a = c;
          } else {
            a = i;
          }
          if (o !== 1) {
            a = t.v2BitmapAdapter.resize(a, a.width * o, a.height * o);
            if (c) {
              u.release(c);
            }
          }
          a.reusable = false;
          if (n) {
            n[0] = n[0] * o;
            n[1] = n[1] * o;
            e.rotationCenterX = n[0];
            e.rotationCenterY = n[1];
          }
          e.bitmapResolution = 2;
          delete e.textLayerMD5;
          delete e.textLayerAsset;
          return {
            image: a,
            rotationCenter: n,
            assetMatchesBase: o === 1 && !s
          };
        }).finally(() => {
          delete e.textLayerMD5;
          delete e.textLayerAsset;
        });
      } else {
        return Promise.reject("No V2 Bitmap adapter present.");
      }
    } else {
      return Promise.reject("Costume load failed. Assets were missing.");
    }
  }(e, t, n).then(n => {
    if (!n.assetMatchesBase) {
      (function (n) {
        if (!t.v2BitmapAdapter) {
          return Promise.reject("No V2 Bitmap adapter present.");
        }
        const r = t.storage;
        e.asset = r.createAsset(r.AssetType.ImageBitmap, r.DataFormat.PNG, t.v2BitmapAdapter.convertDataURIToBinary(n), null, true);
        e.dataFormat = r.DataFormat.PNG;
        e.assetId = e.asset.assetId;
        e.md5 = `${e.assetId}.${e.dataFormat}`;
      })((e => {
        if (e instanceof HTMLCanvasElement) {
          return e.toDataURL();
        }
        const t = u.create();
        t.width = e.width;
        t.height = e.height;
        t.getContext("2d").drawImage(e, 0, 0);
        const n = t.toDataURL();
        u.release(t);
        return n;
      })(n.image));
    }
    return n;
  }).then(n => {
    let r;
    let {
      image: i,
      rotationCenter: s
    } = n;
    if (s) {
      r = [s[0] / 2, s[1] / 2];
    }
    e.skinId = t.renderer.createBitmapSkin(i, e.bitmapResolution, r);
    const o = t.renderer.getSkinSize(e.skinId);
    e.size = [o[0] * 2, o[1] * 2];
    if (!s) {
      s = t.renderer.getSkinRotationCenter(e.skinId);
      e.rotationCenterX = s[0] * 2;
      e.rotationCenterY = s[1] * 2;
      e.bitmapResolution = 2;
    }
    if (t.isPackaged) {
      e.asset = null;
    }
    return e;
  });
};
const f = function (e, t) {
  const n = e.asset;
  const r = e.assetId;
  const i = e.rotationCenterX;
  const s = e.rotationCenterY;
  const o = e.bitmapResolution;
  const a = e.dataFormat;
  const c = t.storage.AssetType;
  const u = e.dataFormat === c.ImageVector.runtimeFormat;
  e.assetId = u ? t.storage.defaultAssetId.ImageVector : t.storage.defaultAssetId.ImageBitmap;
  e.asset = t.storage.get(e.assetId);
  e.md5 = `${e.assetId}.${e.asset.dataFormat}`;
  return (u ? l(e, t) : p(e, t)).then(e => {
    e.broken = {};
    e.broken.assetId = r;
    e.broken.md5 = `${r}.${a}`;
    e.broken.asset = n;
    e.broken.dataFormat = a;
    e.broken.rotationCenterX = i;
    e.broken.rotationCenterY = s;
    e.broken.bitmapResolution = o;
    return e;
  });
};
const m = function (e, t, n) {
  e.assetId = e.asset.assetId;
  if (!t.renderer) {
    i.warn("No rendering module present; cannot load costume: ", e.name);
    return Promise.resolve(e);
  }
  const r = t.storage.AssetType;
  let s;
  if (typeof e.rotationCenterX == "number" && !isNaN(e.rotationCenterX) && typeof e.rotationCenterY == "number" && !isNaN(e.rotationCenterY)) {
    s = [e.rotationCenterX, e.rotationCenterY];
  }
  if (e.asset.assetType.runtimeFormat === r.ImageVector.runtimeFormat) {
    return l(e, t, s, n).catch(n => {
      i.warn(`Error loading vector image: ${n}`);
      return f(e, t);
    });
  } else {
    return p(e, t, s).catch(n => {
      i.warn(`Error loading bitmap image: ${n}`);
      return f(e, t);
    });
  }
};
module.exports = {
  loadCostume: function (e, t, n, s) {
    const o = r.splitFirst(e, ".");
    const a = o[0];
    const c = o[1].toLowerCase();
    t.dataFormat = c;
    if (t.asset) {
      return m(t, n, s);
    }
    if (!n.storage) {
      i.warn("No storage module present; cannot load costume asset: ", e);
      return Promise.resolve(t);
    }
    if (!n.storage.defaultAssetId) {
      i.warn("No default assets found");
      return Promise.resolve(t);
    }
    const l = n.storage.AssetType;
    const u = c === "svg" ? l.ImageVector : l.ImageBitmap;
    const h = n.storage.load(u, a, c);
    let d;
    d = t.textLayerMD5 ? n.storage.load(l.ImageBitmap, t.textLayerMD5, "png") : Promise.resolve(null);
    return Promise.all([h, d]).then(e => e[0] ? (t.asset = e[0], e[1] && (t.textLayerAsset = e[1]), m(t, n, s)) : f(t, n)).catch(e => {
      i.warn("Error loading costume: ", e);
      return f(t, n);
    });
  },
  loadCostumeFromAsset: m
};