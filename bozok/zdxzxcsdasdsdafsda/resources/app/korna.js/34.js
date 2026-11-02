const r = require("./6.js");
const i = require("./0.js");
const s = function (e, t, n, r) {
  e.assetId = t.assetId;
  if (n.audioEngine) {
    return n.audioEngine.decodeSoundPlayer(Object.assign({}, e, {
      data: t.data
    })).then(t => {
      e.soundId = t.id;
      const i = t.buffer;
      e.rate = i.sampleRate;
      e.sampleCount = i.length;
      if (r !== null) {
        r.addSoundPlayer(t);
      }
      if (n.isPackaged) {
        e.asset = null;
      }
      return e;
    });
  } else {
    i.warn("No audio engine present; cannot load sound asset: ", e.md5);
    return Promise.resolve(e);
  }
};
const o = function (e, t, n) {
  const r = e.asset;
  const i = e.assetId;
  const o = e.sampleCount;
  const a = e.rate;
  const c = e.format;
  const l = e.dataFormat;
  e.assetId = t.storage.defaultAssetId.Sound;
  e.asset = t.storage.get(e.assetId);
  e.md5 = `${e.assetId}.${e.asset.dataFormat}`;
  return s(e, e.asset, t, n).then(e => {
    e.broken = {};
    e.broken.assetId = i;
    e.broken.md5 = `${i}.${l}`;
    e.broken.asset = r;
    e.broken.sampleCount = o;
    e.broken.rate = a;
    e.broken.format = c;
    e.broken.dataFormat = l;
    return e;
  });
};
module.exports = {
  loadSound: function (e, t, n) {
    if (!t.storage) {
      i.warn("No storage module present; cannot load sound asset: ", e.md5);
      return Promise.resolve(e);
    }
    const a = r.splitFirst(e.md5, ".");
    const c = a[0];
    const l = a[1].toLowerCase();
    e.dataFormat = l;
    return (e.asset && Promise.resolve(e.asset) || t.storage.load(t.storage.AssetType.Sound, c, l)).then(r => {
      e.asset = r;
      if (r) {
        return s(e, r, t, n);
      } else {
        i.warn("Failed to find sound data: ", e.md5);
        return o(e, t, n);
      }
    }).catch(r => {
      i.warn(`Failed to load sound: ${e.md5} with error: ${r}`);
      return o(e, t, n);
    });
  },
  loadSoundFromAsset: s
};