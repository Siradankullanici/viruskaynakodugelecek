var n = "long";
var r = "short";
var i = "narrow";
var s = "numeric";
var o = "2-digit";
module.exports = {
  number: {
    decimal: {
      style: "decimal"
    },
    integer: {
      style: "decimal",
      maximumFractionDigits: 0
    },
    currency: {
      style: "currency",
      currency: "USD"
    },
    percent: {
      style: "percent"
    },
    default: {
      style: "decimal"
    }
  },
  date: {
    short: {
      month: s,
      day: s,
      year: o
    },
    medium: {
      month: r,
      day: s,
      year: s
    },
    long: {
      month: n,
      day: s,
      year: s
    },
    full: {
      month: n,
      day: s,
      year: s,
      weekday: n
    },
    default: {
      month: r,
      day: s,
      year: s
    }
  },
  time: {
    short: {
      hour: s,
      minute: s
    },
    medium: {
      hour: s,
      minute: s,
      second: s
    },
    long: {
      hour: s,
      minute: s,
      second: s,
      timeZoneName: r
    },
    full: {
      hour: s,
      minute: s,
      second: s,
      timeZoneName: r
    },
    default: {
      hour: s,
      minute: s,
      second: s
    }
  },
  duration: {
    default: {
      hours: {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0
      },
      minutes: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0
      },
      seconds: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 3
      }
    }
  },
  parseNumberPattern: function (e) {
    if (e) {
      var t = {};
      var n = e.match(/\b[A-Z]{3}\b/i);
      var r = e.replace(/[^¤]/g, "").length;
      if (!r && n) {
        r = 1;
      }
      if (r) {
        t.style = "currency";
        t.currencyDisplay = r === 1 ? "symbol" : r === 2 ? "code" : "name";
        t.currency = n ? n[0].toUpperCase() : "USD";
      } else if (e.indexOf("%") >= 0) {
        t.style = "percent";
      }
      if (!/[@#0]/.test(e)) {
        if (t.style) {
          return t;
        } else {
          return undefined;
        }
      }
      t.useGrouping = e.indexOf(",") >= 0;
      if (/E\+?[@#0]+/i.test(e) || e.indexOf("@") >= 0) {
        var i = e.replace(/E\+?[@#0]+|[^@#0]/gi, "");
        t.minimumSignificantDigits = Math.min(Math.max(i.replace(/[^@0]/g, "").length, 1), 21);
        t.maximumSignificantDigits = Math.min(Math.max(i.length, 1), 21);
      } else {
        var s = e.replace(/[^#0.]/g, "").split(".");
        for (var o = s[0], a = o.length - 1; o[a] === "0";) {
          --a;
        }
        t.minimumIntegerDigits = Math.min(Math.max(o.length - 1 - a, 1), 21);
        var c = s[1] || "";
        for (a = 0; c[a] === "0";) {
          ++a;
        }
        for (t.minimumFractionDigits = Math.min(Math.max(a, 0), 20); c[a] === "#";) {
          ++a;
        }
        t.maximumFractionDigits = Math.min(Math.max(a, 0), 20);
      }
      return t;
    }
  },
  parseDatePattern: function (e) {
    if (e) {
      var t = {};
      for (var a = 0; a < e.length;) {
        for (var c = e[a], l = 1; e[++a] === c;) {
          ++l;
        }
        switch (c) {
          case "G":
            t.era = l === 5 ? i : l === 4 ? n : r;
            break;
          case "y":
          case "Y":
            t.year = l === 2 ? o : s;
            break;
          case "M":
          case "L":
            l = Math.min(Math.max(l - 1, 0), 4);
            t.month = [s, o, r, n, i][l];
            break;
          case "E":
          case "e":
          case "c":
            t.weekday = l === 5 ? i : l === 4 ? n : r;
            break;
          case "d":
          case "D":
            t.day = l === 2 ? o : s;
            break;
          case "h":
          case "K":
            t.hour12 = true;
            t.hour = l === 2 ? o : s;
            break;
          case "H":
          case "k":
            t.hour12 = false;
            t.hour = l === 2 ? o : s;
            break;
          case "m":
            t.minute = l === 2 ? o : s;
            break;
          case "s":
          case "S":
            t.second = l === 2 ? o : s;
            break;
          case "z":
          case "Z":
          case "v":
          case "V":
            t.timeZoneName = l === 1 ? r : n;
        }
      }
      if (Object.keys(t).length) {
        return t;
      } else {
        return undefined;
      }
    }
  }
};