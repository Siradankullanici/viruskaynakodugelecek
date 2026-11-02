module.exports = e => typeof e == "object" && e !== null ? JSON.stringify(e, (() => {
  const e = new WeakSet();
  return (t, n) => {
    if (typeof n == "object" && n !== null) {
      if (e.has(n)) {
        if (Array.isArray(n)) {
          return "[...]";
        } else {
          return "{...}";
        }
      }
      e.add(n);
    }
    return n;
  };
})()) : Object.is(e, -0) ? "-0" : `${e}`;