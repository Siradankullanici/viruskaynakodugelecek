const n = function (e, t, n) {
  const r = n ? [e.getTargetById(n)] : e.targets;
  const i = [];
  for (let e = 0; e < r.length; e++) {
    const n = r[e].sprite[t];
    for (let e = 0; e < n.length; e++) {
      const t = n[e];
      const r = t.broken ? t.broken.asset : t.asset;
      if (r) {
        i.push({
          fileName: `${r.assetId}.${r.dataFormat}`,
          fileContent: r.data
        });
      }
    }
  }
  return i;
};
module.exports = {
  serializeSounds: function (e, t) {
    return n(e, "sounds", t);
  },
  serializeCostumes: function (e, t) {
    return n(e, "costumes", t);
  }
};