export const _parse = e => {
  let t = 0;
  const n = n => {
    const {
      line: r,
      column: i
    } = (() => {
      let n = 0;
      let r = 0;
      for (let i = 0; i < t; i++) {
        if (e[i] === "\n") {
          n++;
          r = 0;
        } else {
          r++;
        }
      }
      return {
        line: n + 1,
        column: r + 1
      };
    })();
    throw new SyntaxError(`${n} (Line ${r} Column ${i})`);
  };
  const r = t => {
    if (t >= e.length) {
      n("Unexpected end of input");
    }
    return e[t];
  };
  const i = () => r(t);
  const s = () => {
    t++;
  };
  const o = e => {
    if (i() !== e) {
      n(`Expected '${e}' but found '${i()}'`);
    }
    s();
  };
  const a = (n = 1, i = 1) => {
    if (t + i + n > e.length) {
      return "";
    }
    if (n === 1) {
      return r(t + i);
    }
    let s = "";
    for (let e = 0; e < n; e++) {
      s += r(t + i + e);
    }
    return s;
  };
  const c = () => {
    while (true) {
      if (/\s/.test(i())) {
        s();
      } else {
        const e = a(2, 0);
        if (e === "//") {
          s();
          s();
          while (i() !== "\n") {
            s();
          }
        } else {
          if (e !== "/*") {
            break;
          }
          s();
          s();
          while (a(2, 0) !== "*/") {
            s();
          }
          s();
          s();
        }
      }
    }
  };
  const l = () => {
    c();
    switch (i()) {
      case "\"":
        return d();
      case "{":
        return f();
      case "[":
        return p();
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "-":
        return h();
      default:
        return u();
    }
  };
  const u = () => {
    if (a(4, 0) === "null") {
      for (let e = 0; e < 4; e++) {
        s();
      }
      return null;
    }
    if (a(4, 0) === "true") {
      for (let e = 0; e < 4; e++) {
        s();
      }
      return true;
    }
    if (a(5, 0) === "false") {
      for (let e = 0; e < 5; e++) {
        s();
      }
      return false;
    }
    if (a(8, 0) === "Infinity") {
      for (let e = 0; e < 8; e++) {
        s();
      }
      return Infinity;
    }
    if (a(3, 0) === "NaN") {
      for (let e = 0; e < 3; e++) {
        s();
      }
      return NaN;
    }
    n(`Unexpected character '${i()}'`);
  };
  const h = () => {
    if (a(9, 0) === "-Infinity") {
      for (let e = 0; e < 9; e++) {
        s();
      }
      return -Infinity;
    }
    let e = "";
    while (e += i(), /[\d.e+-]/i.test(a())) {
      s();
    }
    s();
    const t = +e;
    if (Number.isNaN(t)) {
      n(`Not a number: ${e}`);
    }
    return t;
  };
  const d = () => {
    o("\"");
    let e = "";
    while (true) {
      const t = i();
      if (t === "\"") {
        break;
      }
      if (t === "\\") {
        s();
        switch (i()) {
          case "\"":
            e += "\"";
            break;
          case "/":
            e += "/";
            break;
          case "\\":
            e += "\\";
            break;
          case "b":
            e += "\b";
            break;
          case "f":
            e += "\f";
            break;
          case "n":
            e += "\n";
            break;
          case "r":
            e += "\r";
            break;
          case "t":
            e += "\t";
            break;
          case "u":
            {
              let t = "";
              for (let e = 0; e < 4; e++) {
                s();
                const e = i();
                if (!/[0-9a-f]/i.test(e)) {
                  n(`Invalid hex code: ${e}`);
                }
                t += e;
              }
              const r = Number.parseInt(t, 16);
              e += String.fromCharCode(r);
              break;
            }
          default:
            n(`Invalid escape code: \\${i()}`);
        }
      } else {
        e += t;
      }
      s();
    }
    o("\"");
    return e;
  };
  const p = () => {
    o("[");
    c();
    const e = [];
    while (c(), i() !== "]") {
      const t = l();
      e.push(t);
      c();
      if (i() !== ",") {
        break;
      }
      s();
    }
    o("]");
    return e;
  };
  const f = () => {
    o("{");
    c();
    const e = {};
    while (c(), i() !== "}") {
      const t = d();
      c();
      o(":");
      const n = l();
      e[t] = n;
      c();
      if (i() !== ",") {
        break;
      }
      s();
    }
    o("}");
    return e;
  };
  return l();
};
export const parse = e => {
  try {
    return JSON.parse(e);
  } catch (t) {
    try {
      return _parse(e);
    } catch (e) {
      throw t;
    }
  }
};
export const stringify = e => {
  if (typeof e == "string") {
    return JSON.stringify(e);
  }
  if (typeof e == "number" || typeof e == "boolean") {
    return e.toString();
  }
  if (e == null || typeof e == "symbol") {
    return "null";
  }
  if (Array.isArray(e)) {
    return `[${e.map(e => stringify(e)).join(",")}]`;
  }
  if (typeof e == "object") {
    let t = "{";
    let n = true;
    const r = Object.keys(e);
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      const a = e[o];
      if (a !== undefined) {
        if (!n) {
          t += ",";
        }
        t += `${JSON.stringify(o)}:${stringify(a)}`;
        n = false;
      }
    }
    t += "}";
    return t;
  }
  if (typeof e == "bigint") {
    throw new TypeError("Can not stringify bigint");
  }
  throw new TypeError(`Can not stringify: ${e}`);
};