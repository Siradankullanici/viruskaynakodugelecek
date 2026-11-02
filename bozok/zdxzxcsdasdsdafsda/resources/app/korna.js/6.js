const r = require("./0.js");
class i {
  static withoutTrailingDigits(e) {
    let t = e.length - 1;
    while (t >= 0 && "0123456789".indexOf(e.charAt(t)) > -1) {
      t--;
    }
    return e.slice(0, t + 1);
  }
  static unusedName(e, t) {
    if (t.indexOf(e) < 0) {
      return e;
    }
    e = i.withoutTrailingDigits(e);
    let n = 2;
    while (t.indexOf(e + n) >= 0) {
      n++;
    }
    return e + n;
  }
  static caseInsensitiveUnusedName(e, t) {
    const n = e => t.some(t => t.toLowerCase() === e.toLowerCase());
    if (!n(e)) {
      return e;
    }
    e = i.withoutTrailingDigits(e);
    let r = 2;
    while (n(`${e}${r}`)) {
      r++;
    }
    return `${e}${r}`;
  }
  static splitFirst(e, t) {
    const n = e.indexOf(t);
    if (n >= 0) {
      return [e.substring(0, n), e.substring(n + 1)];
    } else {
      return [e, null];
    }
  }
  static stringify(e) {
    return JSON.stringify(e, (e, t) => typeof t != "number" || t !== Infinity && t !== -Infinity && !isNaN(t) ? t : 0);
  }
  static replaceUnsafeChars(e) {
    if (typeof e != "string") {
      if (!Array.isArray(e)) {
        r.error("Unexpected input recieved in replaceUnsafeChars");
        return e;
      }
      e = String(e);
    }
    return e.replace(/[<>&'"]/g, e => {
      switch (e) {
        case "<":
          return "lt";
        case ">":
          return "gt";
        case "&":
          return "amp";
        case "'":
          return "apos";
        case "\"":
          return "quot";
      }
    });
  }
}
module.exports = i;