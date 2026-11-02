const r = require("./23.js");
const i = e => {
  if (typeof e != "string") {
    return false;
  }
  for (let t = 0; t < e.length; t++) {
    const n = e.charCodeAt(t);
    if (n >= 48 && n <= 57 || n === 9) {
      return false;
    }
  }
  return true;
};
class s {
  static toNumber(e) {
    if (typeof e == "number") {
      if (Number.isNaN(e)) {
        return 0;
      } else {
        return e;
      }
    }
    const t = Number(e);
    if (Number.isNaN(t)) {
      return 0;
    } else {
      return t;
    }
  }
  static toBoolean(e) {
    if (typeof e == "boolean") {
      return e;
    } else if (typeof e == "string") {
      return e !== "" && e !== "0" && e.toLowerCase() !== "false";
    } else {
      return Boolean(e);
    }
  }
  static toString(e) {
    return String(e);
  }
  static toRgbColorList(e) {
    const t = s.toRgbColorObject(e);
    return [t.r, t.g, t.b];
  }
  static toRgbColorObject(e) {
    let t;
    if (typeof e == "string" && e.substring(0, 1) === "#") {
      t = r.hexToRgb(e);
      t ||= {
        r: 0,
        g: 0,
        b: 0,
        a: 255
      };
    } else {
      t = r.decimalToRgb(s.toNumber(e));
    }
    return t;
  }
  static isWhiteSpace(e) {
    return e === null || typeof e == "string" && e.trim().length === 0;
  }
  static compare(e, t) {
    let n = Number(e);
    let r = Number(t);
    if (n === 0 && i(e)) {
      n = NaN;
    } else if (r === 0 && i(t)) {
      r = NaN;
    }
    if (isNaN(n) || isNaN(r)) {
      const n = String(e).toLowerCase();
      const r = String(t).toLowerCase();
      if (n < r) {
        return -1;
      } else if (n > r) {
        return 1;
      } else {
        return 0;
      }
    }
    if (n === Infinity && r === Infinity || n === -Infinity && r === -Infinity) {
      return 0;
    } else {
      return n - r;
    }
  }
  static isInt(e) {
    if (typeof e == "number") {
      return !!isNaN(e) || e === Math.floor(e);
    } else {
      return typeof e == "boolean" || typeof e == "string" && e.indexOf(".") < 0;
    }
  }
  static get LIST_INVALID() {
    return "INVALID";
  }
  static get LIST_ALL() {
    return "ALL";
  }
  static toListIndex(e, t, n) {
    if (typeof e != "number") {
      if (e === "all") {
        if (n) {
          return s.LIST_ALL;
        } else {
          return s.LIST_INVALID;
        }
      }
      if (e === "last") {
        if (t > 0) {
          return t;
        } else {
          return s.LIST_INVALID;
        }
      }
      if (e === "random" || e === "any") {
        if (t > 0) {
          return 1 + Math.floor(Math.random() * t);
        } else {
          return s.LIST_INVALID;
        }
      }
    }
    if ((e = Math.floor(s.toNumber(e))) < 1 || e > t) {
      return s.LIST_INVALID;
    } else {
      return e;
    }
  }
}
module.exports = s;