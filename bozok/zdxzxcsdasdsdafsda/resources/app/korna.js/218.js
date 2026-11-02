const n = 180 / Math.PI;
const r = {
  u: 0,
  v: 0
};
const i = function (e) {
  return (e + 270) % 360 - 180;
};
module.exports = {
  motionVector: function (e, t, n, i, s, o = r) {
    const a = t * t - e * n;
    if (a) {
      const r = -(s * t - i * n);
      const c = -(t * i - e * s);
      const l = 8 / a;
      o.u = r * l;
      o.v = c * l;
    } else {
      const r = (t + e) * (t + e) + (n + t) * (n + t);
      if (r) {
        const a = -(s + i) * (8 / r);
        o.u = (t + e) * a;
        o.v = (n + t) * a;
      } else {
        o.u = 0;
        o.v = 0;
      }
    }
    return o;
  },
  scratchDegrees: i,
  scratchAtan2: function (e, t) {
    return i(Math.atan2(e, t) * n);
  }
};