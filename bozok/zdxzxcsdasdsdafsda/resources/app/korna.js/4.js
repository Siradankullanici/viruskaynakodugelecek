module.exports = class {
  static degToRad(e) {
    return e * Math.PI / 180;
  }
  static radToDeg(e) {
    return e * 180 / Math.PI;
  }
  static clamp(e, t, n) {
    return Math.min(Math.max(e, t), n);
  }
  static wrapClamp(e, t, n) {
    const r = n - t + 1;
    return e - Math.floor((e - t) / r) * r;
  }
  static tan(e) {
    switch (e %= 360) {
      case -270:
      case 90:
        return Infinity;
      case -90:
      case 270:
        return -Infinity;
      default:
        return Math.round(Math.tan(Math.PI * e / 180) * 10000000000) / 10000000000;
    }
  }
  static reducedSortOrdering(e) {
    const t = e.slice(0).sort((e, t) => e - t);
    return e.map(e => t.indexOf(e));
  }
  static inclusiveRandIntWithout(e, t, n) {
    const r = t - e;
    const i = e + Math.floor(Math.random() * r);
    if (i >= n) {
      return i + 1;
    } else {
      return i;
    }
  }
  static scale(e, t, n, r, i) {
    return (e - t) / (n - t) * (i - r) + r;
  }
};