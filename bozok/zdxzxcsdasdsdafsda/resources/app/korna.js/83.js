const r = require("./22.js");
const i = require("./0.js");
module.exports = {
  deserializeSound: function (e, t, n, s) {
    const o = s || e.md5;
    const a = t.storage;
    if (!a) {
      i.warn("No storage module present; cannot load sound asset: ", o);
      return Promise.resolve(null);
    }
    if (!n) {
      return Promise.resolve(null);
    }
    let c = n.file(o);
    if (!c) {
      const e = new RegExp(`^([^/]*/)?${o}\$`);
      c = n.file(e)[0];
    }
    if (!c) {
      i.error(`Could not find sound file associated with the ${e.name} sound.`);
      return Promise.resolve(null);
    }
    if (!r.support.uint8array) {
      i.error("JSZip uint8array is not supported in this browser.");
      return Promise.resolve(null);
    }
    const l = e.dataFormat.toLowerCase() === "mp3" ? a.DataFormat.MP3 : a.DataFormat.WAV;
    return c.async("uint8array").then(e => a.createAsset(a.AssetType.Sound, l, e, null, true)).then(t => {
      e.asset = t;
      e.assetId = t.assetId;
      e.md5 = `${t.assetId}.${t.dataFormat}`;
    });
  },
  deserializeCostume: function (e, t, n, s, o) {
    const a = t.storage;
    const c = e.assetId;
    const l = s || `${c}.${e.dataFormat}`;
    if (!a) {
      i.warn("No storage module present; cannot load costume asset: ", l);
      return Promise.resolve(null);
    }
    if (e.asset) {
      return Promise.resolve(a.createAsset(e.asset.assetType, e.asset.dataFormat, new Uint8Array(Object.keys(e.asset.data).map(t => e.asset.data[t])), null, true)).then(t => {
        e.asset = t;
        e.assetId = t.assetId;
        e.md5 = `${t.assetId}.${t.dataFormat}`;
      });
    }
    if (!n) {
      return Promise.resolve(null);
    }
    let u = n.file(l);
    if (!u) {
      const e = new RegExp(`^([^/]*/)?${l}\$`);
      u = n.file(e)[0];
    }
    if (!u) {
      i.error(`Could not find costume file associated with the ${e.name} costume.`);
      return Promise.resolve(null);
    }
    let h = null;
    const d = e.dataFormat.toLowerCase();
    if (d === "svg") {
      h = a.AssetType.ImageVector;
    } else if (["png", "bmp", "jpeg", "jpg", "gif"].indexOf(d) >= 0) {
      h = a.AssetType.ImageBitmap;
    } else {
      i.error(`Unexpected file format for costume: ${d}`);
    }
    if (!r.support.uint8array) {
      i.error("JSZip uint8array is not supported in this browser.");
      return Promise.resolve(null);
    }
    let p;
    if (e.textLayerMD5) {
      const t = n.file(o);
      if (!t) {
        i.error(`Could not find text layer file associated with the ${e.name} costume.`);
        return Promise.resolve(null);
      }
      p = t.async("uint8array").then(t => a.createAsset(a.AssetType.ImageBitmap, "png", t, e.textLayerMD5)).then(t => {
        e.textLayerAsset = t;
      });
    } else {
      p = Promise.resolve(null);
    }
    return Promise.all([p, u.async("uint8array").then(e => a.createAsset(h, d, e, null, true)).then(t => {
      e.asset = t;
      e.assetId = t.assetId;
      e.md5 = `${t.assetId}.${t.dataFormat}`;
    })]);
  }
};