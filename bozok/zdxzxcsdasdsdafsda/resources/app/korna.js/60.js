var r = "zero";
var i = "one";
var s = "two";
var o = "few";
var a = "many";
var c = "other";
var l = [function (e) {
  if (+e === 1) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t >= 0 && t <= 1) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  if (Math.floor(Math.abs(+e)) === 0 || +e === 1) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 0) {
    return r;
  } else if (t === 1) {
    return i;
  } else if (t === 2) {
    return s;
  } else if (t % 100 >= 3 && t % 100 <= 10) {
    return o;
  } else if (t % 100 >= 11 && t % 100 <= 99) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  if (t === 1 && n === 0) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t % 10 == 1 && t % 100 != 11) {
    return i;
  } else if (t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 12 || t % 100 > 14)) {
    return o;
  } else if (t % 10 == 0 || t % 10 >= 5 && t % 10 <= 9 || t % 100 >= 11 && t % 100 <= 14) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t % 10 == 1 && t % 100 != 11 && t % 100 != 71 && t % 100 != 91) {
    return i;
  } else if (t % 10 == 2 && t % 100 != 12 && t % 100 != 72 && t % 100 != 92) {
    return s;
  } else if ((t % 10 >= 3 && t % 10 <= 4 || t % 10 == 9) && (t % 100 < 10 || t % 100 > 19) && (t % 100 < 70 || t % 100 > 79) && (t % 100 < 90 || t % 100 > 99)) {
    return o;
  } else if (t !== 0 && t % 1000000 == 0) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  var r = +(e + ".").split(".")[1];
  if (n === 0 && t % 10 == 1 && t % 100 != 11 || r % 10 == 1 && r % 100 != 11) {
    return i;
  } else if (n === 0 && t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 12 || t % 100 > 14) || r % 10 >= 2 && r % 10 <= 4 && (r % 100 < 12 || r % 100 > 14)) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  if (t === 1 && n === 0) {
    return i;
  } else if (t >= 2 && t <= 4 && n === 0) {
    return o;
  } else if (n !== 0) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 0) {
    return r;
  } else if (t === 1) {
    return i;
  } else if (t === 2) {
    return s;
  } else if (t === 3) {
    return o;
  } else if (t === 6) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = +("" + e).replace(/^[^.]*.?|0+$/g, "");
  if (+e === 1 || n !== 0 && (t === 0 || t === 1)) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  var r = +(e + ".").split(".")[1];
  if (n === 0 && t % 100 == 1 || r % 100 == 1) {
    return i;
  } else if (n === 0 && t % 100 == 2 || r % 100 == 2) {
    return s;
  } else if (n === 0 && t % 100 >= 3 && t % 100 <= 4 || r % 100 >= 3 && r % 100 <= 4) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  if (t === 0 || t === 1) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  var r = +(e + ".").split(".")[1];
  if (n === 0 && (t === 1 || t === 2 || t === 3) || n === 0 && t % 10 != 4 && t % 10 != 6 && t % 10 != 9 || n !== 0 && r % 10 != 4 && r % 10 != 6 && r % 10 != 9) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1) {
    return i;
  } else if (t === 2) {
    return s;
  } else if (t >= 3 && t <= 6) {
    return o;
  } else if (t >= 7 && t <= 10) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1 || t === 11) {
    return i;
  } else if (t === 2 || t === 12) {
    return s;
  } else if (t >= 3 && t <= 10 || t >= 13 && t <= 19) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  if (n === 0 && t % 10 == 1) {
    return i;
  } else if (n === 0 && t % 10 == 2) {
    return s;
  } else if (n !== 0 || t % 100 != 0 && t % 100 != 20 && t % 100 != 40 && t % 100 != 60 && t % 100 != 80) {
    if (n !== 0) {
      return a;
    } else {
      return c;
    }
  } else {
    return o;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  var r = +e;
  if (t === 1 && n === 0) {
    return i;
  } else if (t === 2 && n === 0) {
    return s;
  } else if (n === 0 && (r < 0 || r > 10) && r % 10 == 0) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = +("" + e).replace(/^[^.]*.?|0+$/g, "");
  if (n === 0 && t % 10 == 1 && t % 100 != 11 || n !== 0) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1) {
    return i;
  } else if (t === 2) {
    return s;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 0) {
    return r;
  } else if (t === 1) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = +e;
  if (n === 0) {
    return r;
  } else if (t !== 0 && t !== 1 || n === 0) {
    return c;
  } else {
    return i;
  }
}, function (e) {
  var t = +(e + ".").split(".")[1];
  var n = +e;
  if (n % 10 == 1 && (n % 100 < 11 || n % 100 > 19)) {
    return i;
  } else if (n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19)) {
    return o;
  } else if (t !== 0) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = (e + ".").split(".")[1].length;
  var n = +(e + ".").split(".")[1];
  var s = +e;
  if (s % 10 == 0 || s % 100 >= 11 && s % 100 <= 19 || t === 2 && n % 100 >= 11 && n % 100 <= 19) {
    return r;
  } else if (s % 10 == 1 && s % 100 != 11 || t === 2 && n % 10 == 1 && n % 100 != 11 || t !== 2 && n % 10 == 1) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  var r = +(e + ".").split(".")[1];
  if (n === 0 && t % 10 == 1 && t % 100 != 11 || r % 10 == 1 && r % 100 != 11) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  var r = +e;
  if (t === 1 && n === 0) {
    return i;
  } else if (n !== 0 || r === 0 || r !== 1 && r % 100 >= 1 && r % 100 <= 19) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1) {
    return i;
  } else if (t === 0 || t % 100 >= 2 && t % 100 <= 10) {
    return o;
  } else if (t % 100 >= 11 && t % 100 <= 19) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  if (t === 1 && n === 0) {
    return i;
  } else if (n === 0 && t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 12 || t % 100 > 14)) {
    return o;
  } else if (n === 0 && t !== 1 && t % 10 >= 0 && t % 10 <= 1 || n === 0 && t % 10 >= 5 && t % 10 <= 9 || n === 0 && t % 100 >= 12 && t % 100 <= 14) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  if (t >= 0 && t <= 1) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  if (n === 0 && t % 10 == 1 && t % 100 != 11) {
    return i;
  } else if (n === 0 && t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 12 || t % 100 > 14)) {
    return o;
  } else if (n === 0 && t % 10 == 0 || n === 0 && t % 10 >= 5 && t % 10 <= 9 || n === 0 && t % 100 >= 11 && t % 100 <= 14) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (Math.floor(Math.abs(+e)) === 0 || t === 1) {
    return i;
  } else if (t >= 2 && t <= 10) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = +(e + ".").split(".")[1];
  var r = +e;
  if (r === 0 || r === 1 || t === 0 && n === 1) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  var n = (e + ".").split(".")[1].length;
  if (n === 0 && t % 100 == 1) {
    return i;
  } else if (n === 0 && t % 100 == 2) {
    return s;
  } else if (n === 0 && t % 100 >= 3 && t % 100 <= 4 || n !== 0) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t >= 0 && t <= 1 || t >= 11 && t <= 99) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1 || t === 5 || t === 7 || t === 8 || t === 9 || t === 10) {
    return i;
  } else if (t === 2 || t === 3) {
    return s;
  } else if (t === 4) {
    return o;
  } else if (t === 6) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  if (t % 10 == 1 || t % 10 == 2 || t % 10 == 5 || t % 10 == 7 || t % 10 == 8 || t % 100 == 20 || t % 100 == 50 || t % 100 == 70 || t % 100 == 80) {
    return i;
  } else if (t % 10 == 3 || t % 10 == 4 || t % 1000 == 100 || t % 1000 == 200 || t % 1000 == 300 || t % 1000 == 400 || t % 1000 == 500 || t % 1000 == 600 || t % 1000 == 700 || t % 1000 == 800 || t % 1000 == 900) {
    return o;
  } else if (t === 0 || t % 10 == 6 || t % 100 == 40 || t % 100 == 60 || t % 100 == 90) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t % 10 != 2 && t % 10 != 3 || t % 100 == 12 || t % 100 == 13) {
    return c;
  } else {
    return o;
  }
}, function (e) {
  var t = +e;
  if (t === 1 || t === 3) {
    return i;
  } else if (t === 2) {
    return s;
  } else if (t === 4) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 0 || t === 7 || t === 8 || t === 9) {
    return r;
  } else if (t === 1) {
    return i;
  } else if (t === 2) {
    return s;
  } else if (t === 3 || t === 4) {
    return o;
  } else if (t === 5 || t === 6) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t % 10 == 1 && t % 100 != 11) {
    return i;
  } else if (t % 10 == 2 && t % 100 != 12) {
    return s;
  } else if (t % 10 == 3 && t % 100 != 13) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1 || t === 11) {
    return i;
  } else if (t === 2 || t === 12) {
    return s;
  } else if (t === 3 || t === 13) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1) {
    return i;
  } else if (t === 2 || t === 3) {
    return s;
  } else if (t === 4) {
    return o;
  } else if (t === 6) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1 || t === 5) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 11 || t === 8 || t === 80 || t === 800) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  if (t === 1) {
    return i;
  } else if (t === 0 || t % 100 >= 2 && t % 100 <= 20 || t % 100 == 40 || t % 100 == 60 || t % 100 == 80) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t % 10 == 6 || t % 10 == 9 || t % 10 == 0 && t !== 0) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = Math.floor(Math.abs(+e));
  if (t % 10 == 1 && t % 100 != 11) {
    return i;
  } else if (t % 10 == 2 && t % 100 != 12) {
    return s;
  } else if (t % 10 != 7 && t % 10 != 8 || t % 100 == 17 || t % 100 == 18) {
    return c;
  } else {
    return a;
  }
}, function (e) {
  var t = +e;
  if (t === 1) {
    return i;
  } else if (t === 2 || t === 3) {
    return s;
  } else if (t === 4) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t >= 1 && t <= 4) {
    return i;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1 || t === 5 || t >= 7 && t <= 9) {
    return i;
  } else if (t === 2 || t === 3) {
    return s;
  } else if (t === 4) {
    return o;
  } else if (t === 6) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t === 1) {
    return i;
  } else if (t % 10 == 4 && t % 100 != 14) {
    return a;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t % 10 != 1 && t % 10 != 2 || t % 100 == 11 || t % 100 == 12) {
    return c;
  } else {
    return i;
  }
}, function (e) {
  var t = +e;
  if (t % 10 == 6 || t % 10 == 9 || t === 10) {
    return o;
  } else {
    return c;
  }
}, function (e) {
  var t = +e;
  if (t % 10 == 3 && t % 100 != 13) {
    return o;
  } else {
    return c;
  }
}];
module.exports = {
  af: {
    cardinal: l[0]
  },
  ak: {
    cardinal: l[1]
  },
  am: {
    cardinal: l[2]
  },
  ar: {
    cardinal: l[3]
  },
  ars: {
    cardinal: l[3]
  },
  as: {
    cardinal: l[2],
    ordinal: l[34]
  },
  asa: {
    cardinal: l[0]
  },
  ast: {
    cardinal: l[4]
  },
  az: {
    cardinal: l[0],
    ordinal: l[35]
  },
  be: {
    cardinal: l[5],
    ordinal: l[36]
  },
  bem: {
    cardinal: l[0]
  },
  bez: {
    cardinal: l[0]
  },
  bg: {
    cardinal: l[0]
  },
  bh: {
    cardinal: l[1]
  },
  bn: {
    cardinal: l[2],
    ordinal: l[34]
  },
  br: {
    cardinal: l[6]
  },
  brx: {
    cardinal: l[0]
  },
  bs: {
    cardinal: l[7]
  },
  ca: {
    cardinal: l[4],
    ordinal: l[37]
  },
  ce: {
    cardinal: l[0]
  },
  cgg: {
    cardinal: l[0]
  },
  chr: {
    cardinal: l[0]
  },
  ckb: {
    cardinal: l[0]
  },
  cs: {
    cardinal: l[8]
  },
  cy: {
    cardinal: l[9],
    ordinal: l[38]
  },
  da: {
    cardinal: l[10]
  },
  de: {
    cardinal: l[4]
  },
  dsb: {
    cardinal: l[11]
  },
  dv: {
    cardinal: l[0]
  },
  ee: {
    cardinal: l[0]
  },
  el: {
    cardinal: l[0]
  },
  en: {
    cardinal: l[4],
    ordinal: l[39]
  },
  eo: {
    cardinal: l[0]
  },
  es: {
    cardinal: l[0]
  },
  et: {
    cardinal: l[4]
  },
  eu: {
    cardinal: l[0]
  },
  fa: {
    cardinal: l[2]
  },
  ff: {
    cardinal: l[12]
  },
  fi: {
    cardinal: l[4]
  },
  fil: {
    cardinal: l[13],
    ordinal: l[0]
  },
  fo: {
    cardinal: l[0]
  },
  fr: {
    cardinal: l[12],
    ordinal: l[0]
  },
  fur: {
    cardinal: l[0]
  },
  fy: {
    cardinal: l[4]
  },
  ga: {
    cardinal: l[14],
    ordinal: l[0]
  },
  gd: {
    cardinal: l[15],
    ordinal: l[40]
  },
  gl: {
    cardinal: l[4]
  },
  gsw: {
    cardinal: l[0]
  },
  gu: {
    cardinal: l[2],
    ordinal: l[41]
  },
  guw: {
    cardinal: l[1]
  },
  gv: {
    cardinal: l[16]
  },
  ha: {
    cardinal: l[0]
  },
  haw: {
    cardinal: l[0]
  },
  he: {
    cardinal: l[17]
  },
  hi: {
    cardinal: l[2],
    ordinal: l[41]
  },
  hr: {
    cardinal: l[7]
  },
  hsb: {
    cardinal: l[11]
  },
  hu: {
    cardinal: l[0],
    ordinal: l[42]
  },
  hy: {
    cardinal: l[12],
    ordinal: l[0]
  },
  ia: {
    cardinal: l[4]
  },
  io: {
    cardinal: l[4]
  },
  is: {
    cardinal: l[18]
  },
  it: {
    cardinal: l[4],
    ordinal: l[43]
  },
  iu: {
    cardinal: l[19]
  },
  iw: {
    cardinal: l[17]
  },
  jgo: {
    cardinal: l[0]
  },
  ji: {
    cardinal: l[4]
  },
  jmc: {
    cardinal: l[0]
  },
  ka: {
    cardinal: l[0],
    ordinal: l[44]
  },
  kab: {
    cardinal: l[12]
  },
  kaj: {
    cardinal: l[0]
  },
  kcg: {
    cardinal: l[0]
  },
  kk: {
    cardinal: l[0],
    ordinal: l[45]
  },
  kkj: {
    cardinal: l[0]
  },
  kl: {
    cardinal: l[0]
  },
  kn: {
    cardinal: l[2]
  },
  ks: {
    cardinal: l[0]
  },
  ksb: {
    cardinal: l[0]
  },
  ksh: {
    cardinal: l[20]
  },
  ku: {
    cardinal: l[0]
  },
  kw: {
    cardinal: l[19]
  },
  ky: {
    cardinal: l[0]
  },
  lag: {
    cardinal: l[21]
  },
  lb: {
    cardinal: l[0]
  },
  lg: {
    cardinal: l[0]
  },
  ln: {
    cardinal: l[1]
  },
  lt: {
    cardinal: l[22]
  },
  lv: {
    cardinal: l[23]
  },
  mas: {
    cardinal: l[0]
  },
  mg: {
    cardinal: l[1]
  },
  mgo: {
    cardinal: l[0]
  },
  mk: {
    cardinal: l[24],
    ordinal: l[46]
  },
  ml: {
    cardinal: l[0]
  },
  mn: {
    cardinal: l[0]
  },
  mo: {
    cardinal: l[25],
    ordinal: l[0]
  },
  mr: {
    cardinal: l[2],
    ordinal: l[47]
  },
  mt: {
    cardinal: l[26]
  },
  nah: {
    cardinal: l[0]
  },
  naq: {
    cardinal: l[19]
  },
  nb: {
    cardinal: l[0]
  },
  nd: {
    cardinal: l[0]
  },
  ne: {
    cardinal: l[0],
    ordinal: l[48]
  },
  nl: {
    cardinal: l[4]
  },
  nn: {
    cardinal: l[0]
  },
  nnh: {
    cardinal: l[0]
  },
  no: {
    cardinal: l[0]
  },
  nr: {
    cardinal: l[0]
  },
  nso: {
    cardinal: l[1]
  },
  ny: {
    cardinal: l[0]
  },
  nyn: {
    cardinal: l[0]
  },
  om: {
    cardinal: l[0]
  },
  or: {
    cardinal: l[0],
    ordinal: l[49]
  },
  os: {
    cardinal: l[0]
  },
  pa: {
    cardinal: l[1]
  },
  pap: {
    cardinal: l[0]
  },
  pl: {
    cardinal: l[27]
  },
  prg: {
    cardinal: l[23]
  },
  ps: {
    cardinal: l[0]
  },
  pt: {
    cardinal: l[28]
  },
  "pt-PT": {
    cardinal: l[4]
  },
  rm: {
    cardinal: l[0]
  },
  ro: {
    cardinal: l[25],
    ordinal: l[0]
  },
  rof: {
    cardinal: l[0]
  },
  ru: {
    cardinal: l[29]
  },
  rwk: {
    cardinal: l[0]
  },
  saq: {
    cardinal: l[0]
  },
  sc: {
    cardinal: l[4],
    ordinal: l[43]
  },
  scn: {
    cardinal: l[4],
    ordinal: l[43]
  },
  sd: {
    cardinal: l[0]
  },
  sdh: {
    cardinal: l[0]
  },
  se: {
    cardinal: l[19]
  },
  seh: {
    cardinal: l[0]
  },
  sh: {
    cardinal: l[7]
  },
  shi: {
    cardinal: l[30]
  },
  si: {
    cardinal: l[31]
  },
  sk: {
    cardinal: l[8]
  },
  sl: {
    cardinal: l[32]
  },
  sma: {
    cardinal: l[19]
  },
  smi: {
    cardinal: l[19]
  },
  smj: {
    cardinal: l[19]
  },
  smn: {
    cardinal: l[19]
  },
  sms: {
    cardinal: l[19]
  },
  sn: {
    cardinal: l[0]
  },
  so: {
    cardinal: l[0]
  },
  sq: {
    cardinal: l[0],
    ordinal: l[50]
  },
  sr: {
    cardinal: l[7]
  },
  ss: {
    cardinal: l[0]
  },
  ssy: {
    cardinal: l[0]
  },
  st: {
    cardinal: l[0]
  },
  sv: {
    cardinal: l[4],
    ordinal: l[51]
  },
  sw: {
    cardinal: l[4]
  },
  syr: {
    cardinal: l[0]
  },
  ta: {
    cardinal: l[0]
  },
  te: {
    cardinal: l[0]
  },
  teo: {
    cardinal: l[0]
  },
  ti: {
    cardinal: l[1]
  },
  tig: {
    cardinal: l[0]
  },
  tk: {
    cardinal: l[0],
    ordinal: l[52]
  },
  tl: {
    cardinal: l[13],
    ordinal: l[0]
  },
  tn: {
    cardinal: l[0]
  },
  tr: {
    cardinal: l[0]
  },
  ts: {
    cardinal: l[0]
  },
  tzm: {
    cardinal: l[33]
  },
  ug: {
    cardinal: l[0]
  },
  uk: {
    cardinal: l[29],
    ordinal: l[53]
  },
  ur: {
    cardinal: l[4]
  },
  uz: {
    cardinal: l[0]
  },
  ve: {
    cardinal: l[0]
  },
  vo: {
    cardinal: l[0]
  },
  vun: {
    cardinal: l[0]
  },
  wa: {
    cardinal: l[1]
  },
  wae: {
    cardinal: l[0]
  },
  xh: {
    cardinal: l[0]
  },
  xog: {
    cardinal: l[0]
  },
  yi: {
    cardinal: l[4]
  },
  zu: {
    cardinal: l[2]
  },
  lo: {
    ordinal: l[0]
  },
  ms: {
    ordinal: l[0]
  },
  vi: {
    ordinal: l[0]
  }
};