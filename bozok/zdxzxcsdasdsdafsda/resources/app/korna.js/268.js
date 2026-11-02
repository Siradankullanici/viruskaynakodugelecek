module.exports = {
  toXy: function (e, t) {
    if (t === undefined) {
      return e.slice();
    }
    const n = t[0].slice(1);
    const r = t[1].slice(1);
    return e.map(function (e) {
      return [e[n], e[r]];
    });
  },
  fromXy: function (e, t) {
    if (t === undefined) {
      return e.slice();
    }
    const n = t[0].slice(1);
    const r = t[1].slice(1);
    return e.map(function (e) {
      return function (e) {
        const t = {
          [n]: e[0],
          [r]: e[1]
        };
        return t;
      }(e);
    });
  }
};