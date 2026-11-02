export class AssertionError extends Error {}
export class ValidationError extends AssertionError {}
const s = function (e, t) {
  if (!e) {
    throw new AssertionError(t);
  }
};
s.validate = function (e, t) {
  if (!e) {
    throw new ValidationError(t);
  }
};
class o {
  constructor(e, t = 0) {
    this.buffer = e;
    this.position = t;
    this.uint8a = new Uint8Array(this.buffer);
  }
  read(e) {
    const t = e.read(this.uint8a, this.position);
    if (e.size === 0) {
      this.position += e.sizeOf(this.uint8a, this.position);
    } else {
      this.position += e.size;
    }
    return t;
  }
  readStruct(e) {
    const t = new e(this.uint8a, this.position);
    this.position += e.size;
    return t;
  }
  resize(e) {
    if (this.buffer.byteLength < e) {
      const t = this.uint8a;
      const n = Math.pow(2, Math.ceil(Math.log(e) / Math.log(2)));
      this.buffer = new ArrayBuffer(n);
      this.uint8a = new Uint8Array(this.buffer);
      this.uint8a.set(t);
    }
  }
  write(e, t) {
    if (e.size === 0) {
      this.resize(this.position + e.writeSizeOf(t));
    } else {
      this.resize(this.position + e.size);
    }
    e.write(this.uint8a, this.position, t);
    if (e.size === 0) {
      this.position += e.writeSizeOf(this.uint8a, this.position);
    } else {
      this.position += e.size;
    }
    return t;
  }
  writeStruct(e, t) {
    this.resize(this.position + e.size);
    const n = Object.assign(new e(this.uint8a, this.position), t);
    this.position += e.size;
    return n;
  }
  writeBytes(e, t = 0, n = e.length) {
    s(e instanceof Uint8Array, "writeBytes must be passed an Uint8Array");
    this.resize(this.position + (n - t));
    for (let r = t; r < n; r++) {
      this.uint8a[this.position + r - t] = e[r];
    }
    this.position += n - t;
    return e;
  }
}
class a {
  constructor(e, t = Infinity) {
    this.iter = e;
    this.maxPosition = t;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    if (this.iter.stream.position >= this.maxPosition) {
      return {
        value: null,
        done: true
      };
    } else {
      return this.iter.next();
    }
  }
}
const c = () => {
  throw new Error("Not implemented");
};
const l = (() => {
  const e = new Uint16Array(1);
  const t = new Uint8Array(e.buffer);
  e[0] = 43707;
  return t[0] === 187;
})();
class u {
  constructor(e) {
    let {
      size: t = 0,
      sizeOf: n = () => t,
      writeSizeOf: r = c,
      toBytes: i = new Uint8Array(1),
      read: s,
      write: o = c
    } = e;
    this.size = t;
    this.sizeOf = n;
    this.writeSizeOf = r;
    this.toBytes = i;
    this.bytes = new Uint8Array(i.buffer);
    this.read = s;
    this.write = o;
  }
  asPropertyObject(e) {
    const t = this;
    return {
      get() {
        return t.read(this.uint8a, e + this.offset);
      },
      set(n) {
        return t.write(this.uint8a, e + this.offset, n);
      },
      enumerable: true
    };
  }
  read() {
    return null;
  }
}
const h = new u({
  size: 1,
  read: (e, t) => e[t],
  write: (e, t, n) => {
    e[t] = n;
    return n;
  }
});
const d = {
  size: 2,
  read(e, t) {
    this.bytes[1] = e[t + 0];
    this.bytes[0] = e[t + 1];
    return this.toBytes[0];
  },
  write(e, t, n) {
    this.toBytes[0] = n;
    e[t + 0] = this.bytes[1];
    e[t + 1] = this.bytes[0];
    return n;
  }
};
const p = {
  size: 2,
  read(e, t) {
    this.bytes[0] = e[t + 0];
    this.bytes[1] = e[t + 1];
    return this.toBytes[0];
  },
  write(e, t, n) {
    this.toBytes[0] = n;
    e[t + 0] = this.bytes[0];
    e[t + 1] = this.bytes[1];
    return n;
  }
};
let f;
f = l ? d : p;
new u(Object.assign({}, f, {
  toBytes: new Uint16Array(1)
}));
const m = new u(Object.assign({}, f, {
  toBytes: new Int16Array(1)
}));
const g = {
  size: 4,
  read(e, t) {
    this.bytes[3] = e[t + 0];
    this.bytes[2] = e[t + 1];
    this.bytes[1] = e[t + 2];
    this.bytes[0] = e[t + 3];
    return this.toBytes[0];
  },
  write(e, t, n) {
    this.toBytes[0] = n;
    e[t + 0] = this.bytes[3];
    e[t + 1] = this.bytes[2];
    e[t + 2] = this.bytes[1];
    e[t + 3] = this.bytes[0];
    return n;
  }
};
const b = {
  size: 4,
  read(e, t) {
    this.bytes[0] = e[t + 0];
    this.bytes[1] = e[t + 1];
    this.bytes[2] = e[t + 2];
    this.bytes[3] = e[t + 3];
    return this.toBytes[0];
  },
  write(e, t, n) {
    this.toBytes[0] = n;
    e[t + 0] = this.bytes[0];
    e[t + 1] = this.bytes[1];
    e[t + 2] = this.bytes[2];
    e[t + 3] = this.bytes[3];
    return n;
  }
};
let y;
y = l ? g : b;
const E = new u(Object.assign({}, y, {
  toBytes: new Int32Array(1)
}));
const T = new u(Object.assign({}, y, {
  toBytes: new Uint32Array(1)
}));
let v;
v = l ? p : d;
const A = new u(Object.assign({}, v, {
  toBytes: new Uint16Array(1)
}));
let w;
w = l ? b : g;
const S = new u(Object.assign({}, w, {
  toBytes: new Uint32Array(1)
}));
let k;
k = l ? {
  size: 8,
  read(e, t) {
    this.bytes[7] = e[t + 0];
    this.bytes[6] = e[t + 1];
    this.bytes[5] = e[t + 2];
    this.bytes[4] = e[t + 3];
    this.bytes[3] = e[t + 4];
    this.bytes[2] = e[t + 5];
    this.bytes[1] = e[t + 6];
    this.bytes[0] = e[t + 7];
    return this.toBytes[0];
  }
} : {
  size: 8,
  read(e, t) {
    this.bytes[7] = e[t + 0];
    this.bytes[6] = e[t + 1];
    this.bytes[5] = e[t + 2];
    this.bytes[4] = e[t + 3];
    this.bytes[3] = e[t + 4];
    this.bytes[2] = e[t + 5];
    this.bytes[1] = e[t + 6];
    this.bytes[0] = e[t + 7];
    return this.toBytes[0];
  }
};
const I = new u(Object.assign({}, k, {
  toBytes: new Float64Array(1)
}));
class O extends u {
  constructor(e) {
    super({
      size: e,
      read(t, n) {
        let r = "";
        for (let i = 0; i < e; i++) {
          const e = t[n + i];
          s(e <= 127, "Non-ascii character in FixedAsciiString");
          r += String.fromCharCode(e);
        }
        return r;
      },
      write(t, n, r) {
        for (let i = 0; i < e; i++) {
          const e = r.charCodeAt(i);
          s(e <= 127, "Non-ascii character in FixedAsciiString");
          t[n + i] = e;
        }
        return r;
      }
    });
  }
}
import * as N from "./21.js";
const R = 10485760;
let x;
x = new u(l ? {
  size: 3,
  read: (e, t) => e[t + 0] << 16 | e[t + 1] << 8 | e[t + 2]
} : {
  size: 3,
  read: (e, t) => e[t + 2] << 16 | e[t + 1] << 8 | e[t + 0]
});
const M = new u({
  sizeOf(e, t) {
    const n = m.read(e, t);
    return m.size + n;
  },
  read(e, t) {
    let n = 0;
    let r = 0;
    const i = m.read(e, t);
    for (let s = 0; s < i; s++) {
      n += r * h.read(e, t++);
      r *= 256;
    }
    return n;
  }
});
const C = new u({
  sizeOf(e, t) {
    const n = T.read(e, t);
    return T.size + n;
  },
  read(e, t) {
    const n = T.read(e, t);
    s(n < R, "asciiString too big");
    t += 4;
    let r = "";
    for (let i = 0; i < n; i++) {
      r += String.fromCharCode(e[t++]);
    }
    return r;
  }
});
const P = new u({
  sizeOf: (e, t) => T.size + T.read(e, t),
  read(e, t) {
    const n = T.read(e, t);
    s(n < R, "bytes too big");
    t += T.size;
    s(n < R, "uint8a array too big");
    return new Uint8Array(e.buffer, t, n);
  }
});
const L = new u({
  sizeOf: (e, t) => T.size + T.read(e, t) * 2,
  read(e, t) {
    const n = T.read(e, t);
    s(n < R, "sound too big");
    t += T.size;
    const r = n * 2;
    s(r < R, "uint8a array too big");
    return new Uint8Array(e.buffer, t, r);
  }
});
const D = new u({
  sizeOf: (e, t) => T.size + T.read(e, t) * T.size,
  read(e, t) {
    const n = T.read(e, t);
    s(n < R, "bitmap too big");
    t += T.size;
    s(n < R, "uint8a array too big");
    const r = new Uint32Array(n);
    for (let i = 0; i < n; i++) {
      r[i] = T.read(e, t);
      t += T.size;
    }
    return r;
  }
});
let B;
B = typeof TextDecoder == "undefined" ? new N.TextDecoder() : new TextDecoder();
const U = new u({
  sizeOf: (e, t) => T.size + T.read(e, t),
  read(e, t) {
    const n = T.read(e, t);
    s(n < R, "utf8 too big");
    t += T.size;
    s(n < R, "uint8a array too big");
    return B.decode(new Uint8Array(e.buffer, t, n));
  }
});
const F = new u({
  size: 4,
  read(e, t) {
    const n = T.read(e, t);
    return ((n >> 22 & 255) << 16 | -16777216 | (n >> 12 & 255) << 8 | n >> 2 & 255) >>> 0;
  }
});
const j = new u({
  size: 5,
  read(e, t) {
    const n = T.read(e, t);
    return (h.read(e, t) << 24 | (n >> 22 & 255) << 16 | (n >> 12 & 255) << 8 | n >> 2 & 255) >>> 0;
  }
});
const z = {
  NULL: 1,
  TRUE: 2,
  FALSE: 3,
  SMALL_INT: 4,
  SMALL_INT_16: 5,
  LARGE_INT_POSITIVE: 6,
  LARGE_INT_NEGATIVE: 7,
  FLOATING: 8,
  STRING: 9,
  SYMBOL: 10,
  BYTES: 11,
  SOUND: 12,
  BITMAP: 13,
  UTF8: 14,
  ARRAY: 20,
  ORDERED_COLLECTION: 21,
  SET: 22,
  IDENTITY_SET: 23,
  DICTIONARY: 24,
  IDENTITY_DICTIONARY: 25,
  COLOR: 30,
  TRANSLUCENT_COLOR: 31,
  POINT: 32,
  RECTANGLE: 33,
  FORM: 34,
  SQUEAK: 35,
  OBJECT_REF: 99,
  MORPH: 100,
  ALIGNMENT: 104,
  STATIC_STRING: 105,
  UPDATING_STRING: 106,
  SAMPLED_SOUND: 109,
  IMAGE_MORPH: 110,
  SPRITE: 124,
  STAGE: 125,
  WATCHER: 155,
  IMAGE_MEDIA: 162,
  SOUND_MEDIA: 164,
  MULTILINE_STRING: 171,
  WATCHER_READOUT_FRAME: 173,
  WATCHER_SLIDER: 174,
  LIST_WATCHER: 175
};
const G = Object.entries(z).reduce((e, t) => {
  let [n, r] = t;
  e[r] = n;
  return e;
}, {});
class V {
  constructor(e, t) {
    this.classId = e;
    this.position = t;
  }
}
const _ = e => typeof e == "object" && e ? e.valueOf() : e;
class Y extends V {
  constructor(e, t, n) {
    super(e, t);
    this.value = n;
  }
  valueOf() {
    return this.value;
  }
  toJSON() {
    if (this.classId === z.TRANSLUCENT_COLOR || this.classId === z.COLOR) {
      return this.value & 16777215;
    } else {
      return this.value;
    }
  }
  toString() {
    return this.value;
  }
}
class H extends V {
  constructor(e, t, n) {
    super(e, t);
    this.size = n;
  }
}
class W extends V {
  constructor(e, t, n) {
    super(e, t);
    this.index = n;
  }
  valueOf() {
    return `Ref(${this.index})`;
  }
}
class K extends H {
  constructor(e, t, n, r) {
    super(e, t, r);
    this.version = n;
  }
}
class X {
  constructor(e) {
    let {
      type: t = Y,
      read: n,
      value: r = n ? e => e.read(n) : null
    } = e;
    this.type = t;
    this.value = r;
  }
  next(e, t, n) {
    return {
      value: new this.type(t, n, this.value(e)),
      done: false
    };
  }
}
const Z = {
  [z.NULL]: {
    value: () => null
  },
  [z.TRUE]: {
    value: () => true
  },
  [z.FALSE]: {
    value: () => false
  },
  [z.SMALL_INT]: {
    read: E
  },
  [z.SMALL_INT_16]: {
    read: m
  },
  [z.LARGE_INT_POSITIVE]: {
    read: M
  },
  [z.LARGE_INT_NEGATIVE]: {
    read: M
  },
  [z.FLOATING]: {
    read: I
  },
  [z.STRING]: {
    read: C
  },
  [z.SYMBOL]: {
    read: C
  },
  [z.BYTES]: {
    read: P
  },
  [z.SOUND]: {
    read: L
  },
  [z.BITMAP]: {
    read: D
  },
  [z.UTF8]: {
    read: U
  },
  [z.ARRAY]: {
    type: H,
    read: E
  },
  [z.ORDERED_COLLECTION]: {
    type: H,
    read: E
  },
  [z.SET]: {
    type: H,
    read: E
  },
  [z.IDENTITY_SET]: {
    type: H,
    read: E
  },
  [z.DICTIONARY]: {
    type: H,
    value: e => e.read(E) * 2
  },
  [z.IDENTITY_DICTIONARY]: {
    type: H,
    value: e => e.read(E) * 2
  },
  [z.COLOR]: {
    read: F
  },
  [z.TRANSLUCENT_COLOR]: {
    read: j
  },
  [z.POINT]: {
    type: H,
    value: () => 2
  },
  [z.RECTANGLE]: {
    type: H,
    value: () => 4
  },
  [z.FORM]: {
    type: H,
    value: () => 5
  },
  [z.SQUEAK]: {
    type: H,
    value: () => 6
  },
  [z.OBJECT_REF]: {
    type: W,
    read: x
  }
};
const q = Array.from({
  length: 256
}, (e, t) => Z[t] ? new X(Z[t]) : null);
const Q = new X({
  type: class extends H {
    constructor(e, t) {
      super(e, t, 0);
    }
  },
  value: () => null
});
class J {
  constructor(e, t) {
    this.buffer = e;
    this.stream = new o(e, t);
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    if (this.stream.position >= this.stream.uint8a.length) {
      return {
        value: null,
        done: true
      };
    }
    const e = this.stream.position;
    const t = this.stream.read(h);
    const n = q[t];
    if (n !== null) {
      return n.next(this.stream, t, e);
    }
    if (t < z.OBJECT_REF) {
      return Q.next(this.stream, t, e);
    }
    const r = this.stream.read(h);
    const i = this.stream.read(h);
    return {
      value: new K(t, e, r, i),
      done: false
    };
  }
}
class $ {
  constructor(e) {
    let {
      classId: t,
      version: n,
      fields: r
    } = e;
    this.classId = t;
    this.version = n;
    this.fields = r;
  }
  get FIELDS() {
    return [];
  }
  get RAW_FIELDS() {
    return this.fields;
  }
  string(e) {
    return String(this.fields[e]);
  }
  number(e) {
    return +this.fields[e];
  }
  boolean(e) {
    return !!this.fields[e];
  }
  toString() {
    if (this.constructor === $) {
      return `${this.constructor.name} ${this.classId} ${G[this.classId]}`;
    } else {
      return this.constructor.name;
    }
  }
  static define(e, t = $) {
    class n extends t {
      get FIELDS() {
        return e;
      }
      static get FIELDS() {
        return e;
      }
    }
    Object.keys(e).forEach(t => {
      const r = e[t];
      Object.defineProperty(n.prototype, t.toLowerCase().replace(/_(\w)/g, e => {
        let [, t] = e;
        return t.toUpperCase();
      }), {
        get() {
          return this.fields[r];
        }
      });
    });
    return n;
  }
}
class ee {
  constructor() {
    let e;
    this.bit = new Uint32Array(1);
    this.crc = 0;
    this.c = 0;
    this.table = [];
    for (let t = 0; t < 256; t++) {
      e = t;
      for (let t = 0; t < 8; t++) {
        e = e & 1 ? e >>> 1 ^ 3988292384 : e >>> 1;
      }
      this.table[t] = e >>> 0;
    }
  }
  update(e, t = 0, n = e.length) {
    let r = ~this.crc >>> 0;
    for (let i = 0; i < n; i++) {
      r = r >>> 8 ^ this.table[(r ^ e[t + i]) & 255];
    }
    this.crc = ~r >>> 0;
    return this;
  }
  get digest() {
    return this.crc;
  }
}
const te = [0, 4278190080, 4294967295, 4286611584, 4294901760, 4278255360, 4278190335, 4278255615, 4294967040, 4294902015, 4280295456, 4282400832, 4284506208, 4288651167, 4290756543, 4292861919, 4278716424, 4279242768, 4279769112, 4280821800, 4281348144, 4281874488, 4282927176, 4283453520, 4283979864, 4285032552, 4285558896, 4286085240, 4287072135, 4287598479, 4288124823, 4289177511, 4289703855, 4290230199, 4291282887, 4291809231, 4292335575, 4293388263, 4293914607, 4294440951, 4278190080, 4278203136, 4278216192, 4278229248, 4278242304, 4278255360, 4278190131, 4278203187, 4278216243, 4278229299, 4278242355, 4278255411, 4278190182, 4278203238, 4278216294, 4278229350, 4278242406, 4278255462, 4278190233, 4278203289, 4278216345, 4278229401, 4278242457, 4278255513, 4278190284, 4278203340, 4278216396, 4278229452, 4278242508, 4278255564, 4278190335, 4278203391, 4278216447, 4278229503, 4278242559, 4278255615, 4281532416, 4281545472, 4281558528, 4281571584, 4281584640, 4281597696, 4281532467, 4281545523, 4281558579, 4281571635, 4281584691, 4281597747, 4281532518, 4281545574, 4281558630, 4281571686, 4281584742, 4281597798, 4281532569, 4281545625, 4281558681, 4281571737, 4281584793, 4281597849, 4281532620, 4281545676, 4281558732, 4281571788, 4281584844, 4281597900, 4281532671, 4281545727, 4281558783, 4281571839, 4281584895, 4281597951, 4284874752, 4284887808, 4284900864, 4284913920, 4284926976, 4284940032, 4284874803, 4284887859, 4284900915, 4284913971, 4284927027, 4284940083, 4284874854, 4284887910, 4284900966, 4284914022, 4284927078, 4284940134, 4284874905, 4284887961, 4284901017, 4284914073, 4284927129, 4284940185, 4284874956, 4284888012, 4284901068, 4284914124, 4284927180, 4284940236, 4284875007, 4284888063, 4284901119, 4284914175, 4284927231, 4284940287, 4288217088, 4288230144, 4288243200, 4288256256, 4288269312, 4288282368, 4288217139, 4288230195, 4288243251, 4288256307, 4288269363, 4288282419, 4288217190, 4288230246, 4288243302, 4288256358, 4288269414, 4288282470, 4288217241, 4288230297, 4288243353, 4288256409, 4288269465, 4288282521, 4288217292, 4288230348, 4288243404, 4288256460, 4288269516, 4288282572, 4288217343, 4288230399, 4288243455, 4288256511, 4288269567, 4288282623, 4291559424, 4291572480, 4291585536, 4291598592, 4291611648, 4291624704, 4291559475, 4291572531, 4291585587, 4291598643, 4291611699, 4291624755, 4291559526, 4291572582, 4291585638, 4291598694, 4291611750, 4291624806, 4291559577, 4291572633, 4291585689, 4291598745, 4291611801, 4291624857, 4291559628, 4291572684, 4291585740, 4291598796, 4291611852, 4291624908, 4291559679, 4291572735, 4291585791, 4291598847, 4291611903, 4291624959, 4294901760, 4294914816, 4294927872, 4294940928, 4294953984, 4294967040, 4294901811, 4294914867, 4294927923, 4294940979, 4294954035, 4294967091, 4294901862, 4294914918, 4294927974, 4294941030, 4294954086, 4294967142, 4294901913, 4294914969, 4294928025, 4294941081, 4294954137, 4294967193, 4294901964, 4294915020, 4294928076, 4294941132, 4294954188, 4294967244, 4294902015, 4294915071, 4294928127, 4294941183, 4294954239, 4294967295];
const ne = [4294967295, 4278190080];
const re = new u({
  sizeOf(e, t) {
    const n = e[t];
    if (n <= 223) {
      return 1;
    } else if (n <= 254) {
      return 2;
    } else {
      return 5;
    }
  },
  read(e, t) {
    const n = e[t];
    if (n <= 223) {
      return n;
    } else if (n <= 254) {
      return (n - 224) * 256 + e[t + 1];
    } else {
      return T.read(e, t + 1);
    }
  }
});
class ie {
  decode(e, t, n, r, i) {
    const s = this.decodePixels(r, n === 32);
    if (n <= 8) {
      i ||= n === 1 ? ne : te;
      return this.unpackPixels(s, e, t, n, i);
    }
    if (n === 16) {
      return this.raster16To32(s, e, t);
    }
    if (n === 32) {
      return s;
    }
    throw new Error("Unhandled Squeak Image depth.");
  }
  decodePixels(e, t) {
    let n;
    if (Array.isArray(e) || e instanceof Uint32Array) {
      n = new Uint32Array(e);
      if (t) {
        for (let e = 0; e < n.length; e++) {
          if (n[e] !== 0) {
            n[e] = n[e] | 4278190080;
          }
        }
      }
      return n;
    }
    const r = new o(e.buffer, e.byteOffset);
    const i = r.read(re);
    n = new Uint32Array(i);
    let s = 0;
    while (s < i) {
      const e = r.read(re);
      const i = e >> 2;
      let o;
      switch (e & 3) {
        case 0:
          s += i;
          break;
        case 1:
          o = r.read(h);
          o |= o << 24 | o << 16 | o << 8;
          if (t && o !== 0) {
            o |= 4278190080;
          }
          for (let e = 0; e < i; e++) {
            n[s++] = o;
          }
          break;
        case 2:
          o = r.read(T);
          if (t && o !== 0) {
            o |= 4278190080;
          }
          for (let e = 0; e < i; e++) {
            n[s++] = o;
          }
          break;
        case 3:
          for (let e = 0; e < i; e++) {
            o = r.read(T);
            if (t && o !== 0) {
              o |= 4278190080;
            }
            n[s++] = o;
          }
      }
    }
    return n;
  }
  unpackPixels(e, t, n, r, i) {
    const s = new Uint32Array(t * n);
    const o = (1 << r) - 1;
    const a = 32 / r;
    let c = 0;
    let l = 0;
    for (let u = 0; u < n; u++) {
      let n;
      let u = -1;
      for (let h = 0; h < t; h++) {
        if (u < 0) {
          u = r * (a - 1);
          n = e[l++];
        }
        s[c++] = i[n >> u & o];
        u -= r;
      }
    }
    return s;
  }
  raster16To32(e, t, n) {
    const r = new Uint32Array(e.length * 2);
    let i;
    let s;
    let o;
    let a = 0;
    let c = 0;
    for (let l = 0; l < n; l++) {
      i = -1;
      for (let n = 0; n < t; n++) {
        if (i < 0) {
          i = 16;
          s = e[a++];
        }
        o = s >> i & 65535;
        if (o !== 0) {
          o = (o >> 7 & 248) << 16 | 4278190080 | (o >> 2 & 248) << 8 | o << 3 & 248;
        }
        r[c++] = o;
        i -= 16;
      }
    }
    return r;
  }
  buildCustomColormap(e, t, n) {
    const r = new Uint32Array(1 << e);
    for (let e = 0; e < t.length; e++) {
      r[e] = n[t[e].index - 1];
    }
    return r;
  }
}
const se = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767];
const oe = {
  2: [-1, 2, -1, 2],
  3: [-1, -1, 2, 4, -1, -1, 2, 4],
  4: [-1, -1, -1, -1, 2, 4, 6, 8, -1, -1, -1, -1, 2, 4, 6, 8],
  5: [-1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 6, 8, 10, 13, 16, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 6, 8, 10, 13, 16]
};
class ae {
  constructor(e) {
    this.bitsPerSample = e;
    this.indexTable = oe[e];
    this.signMask = 1 << e - 1;
    this.valueMask = this.signMask - 1;
    this.valueHighBit = this.signMask >> 1;
    this.bitPosition = 0;
    this.currentByte = 0;
    this.stream = null;
    this.end = 0;
  }
  decode(e) {
    this.bitPosition = 0;
    this.currentByte = 0;
    this.stream = new o(e.buffer, e.byteOffset);
    this.end = e.byteOffset + e.length;
    const t = Math.floor(e.length * 8 / this.bitsPerSample);
    const n = new Int16Array(t);
    let r = 0;
    let i = 0;
    for (let e = 0; e < t; e++) {
      const t = this.nextCode();
      s(t >= 0, "Ran out of bits in Squeak Sound");
      let o = se[i];
      let a = 0;
      for (let e = this.valueHighBit; e > 0; e >>= 1) {
        if (t & e) {
          a += o;
        }
        o >>= 1;
      }
      a += o;
      r += t & this.signMask ? -a : a;
      i += this.indexTable[t];
      if (i < 0) {
        i = 0;
      }
      if (i > 88) {
        i = 88;
      }
      if (r > 32767) {
        r = 32767;
      }
      if (r < -32768) {
        r = -32768;
      }
      n[e] = r;
    }
    return n;
  }
  nextCode() {
    let e = this.bitsPerSample;
    let t = e - this.bitPosition;
    let n = t < 0 ? this.currentByte >> -t : this.currentByte << t;
    while (t > 0) {
      e -= this.bitPosition;
      if (!(this.end - this.stream.position > 0)) {
        this.currentByte = 0;
        this.bitPosition = 0;
        return -1;
      }
      this.currentByte = this.stream.read(h);
      this.bitPosition = 8;
      t = e - this.bitPosition;
      n += t < 0 ? this.currentByte >> -t : this.currentByte << t;
    }
    this.bitPosition -= e;
    this.currentByte = this.currentByte & 255 >> 8 - this.bitPosition;
    return n;
  }
  static samples(e, t) {
    return t.length * 8 / e;
  }
}
class ce {
  constructor(e = new Uint8Array(this.size), t = 0) {
    this.uint8a = e;
    this.offset = t;
  }
  equals(e) {
    for (const t in e) {
      if (this[t] !== e[t]) {
        return false;
      }
    }
    return true;
  }
  view() {
    const e = this.constructor.name;
    const t = {
      toString: () => e
    };
    for (const e in this.shape) {
      t[e] = this[e];
    }
    return t;
  }
  static initConstructor(e) {
    e.size = e.prototype.size;
    return e;
  }
  static extend(e) {
    const t = class extends ce {
      get shape() {
        return e;
      }
    };
    let n = 0;
    Object.keys(e).forEach(r => {
      Object.defineProperty(t.prototype, r, e[r].asPropertyObject(n));
      if (e[r].size === 0) {
        throw new Error("Packet cannot be defined with variable sized members.");
      }
      n += e[r].size;
    });
    t.prototype.size = n;
    t.size = n;
    return t;
  }
}
class le extends ce.extend({
  riff: new O(4),
  length: S,
  wave: new O(4)
}) {}
ce.initConstructor(le);
class ue extends ce.extend({
  chunkType: new O(4),
  length: S
}) {}
ce.initConstructor(ue);
class he extends ce.extend({
  format: A,
  channels: A,
  sampleRate: S,
  bytesPerSec: S,
  blockAlignment: A,
  bitsPerSample: A
}) {}
ce.initConstructor(he);
class de {
  encode(e, {
    channels: t = 1,
    sampleRate: n = 22050
  } = {}) {
    const r = new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
    const i = le.size + ue.size + he.size + ue.size + r.length;
    const s = new o(new ArrayBuffer(i));
    s.writeStruct(le, {
      riff: "RIFF",
      length: i - 8,
      wave: "WAVE"
    });
    s.writeStruct(ue, {
      chunkType: "fmt ",
      length: he.size
    });
    s.writeStruct(he, {
      format: 1,
      channels: t,
      sampleRate: n,
      bytesPerSec: n * 2 * t,
      blockAlignment: t * 2,
      bitsPerSample: 16
    });
    s.writeStruct(ue, {
      chunkType: "data",
      length: i - s.position - ue.size
    });
    s.writeBytes(r);
    return s.uint8a;
  }
  static encode(e, t) {
    return new de().encode(e, t);
  }
  static samples(e) {
    const t = new ue(e, le.size).length;
    return new ue(e, le.size + ue.size + t).length / 2;
  }
}
import * as pe from "./38.js";
var fe = pe;
class me extends $.define({
  X: 0,
  Y: 1
}) {}
class ge extends $.define({
  X: 0,
  Y: 1,
  X2: 2,
  Y2: 3
}) {
  get width() {
    return this.x2 - this.x;
  }
  get height() {
    return this.y2 - this.y;
  }
}
class be extends $.define({
  WIDTH: 0,
  HEIGHT: 1,
  DEPTH: 2,
  BYTES: 4,
  COLORMAP: 5
}) {
  get decoded() {
    this._decoded ||= (e => {
      for (let t = 0; t < e.length; t += 4) {
        const n = e[t + 2];
        const r = e[t + 0];
        e[t + 2] = r;
        e[t + 0] = n;
      }
      return e;
    })(new Uint8Array(new ie().decode(this.width.value, this.height.value, this.depth.value, this.bytes.value, this.colormap && this.colormap.map(e => e.valueOf())).buffer));
    return this._decoded;
  }
  get extension() {
    return "uncompressed";
  }
}
class ye extends $.define({
  STAGE_CONTENTS: 2,
  OBJ_NAME: 6,
  VARS: 7,
  BLOCKS_BIN: 8,
  IS_CLONE: 9,
  MEDIA: 10,
  CURRENT_COSTUME: 11,
  ZOOM: 12,
  H_PAN: 13,
  V_PAN: 14,
  OBSOLETE_SAVED_STATE: 15,
  SPRITE_ORDER_IN_LIBRARY: 16,
  VOLUME: 17,
  TEMPO_BPM: 18,
  SCENE_STATES: 19,
  LISTS: 20
}) {
  get spriteOrderInLibrary() {
    return this.fields[this.FIELDS.SPRITE_ORDER_IN_LIBRARY] || null;
  }
  get tempoBPM() {
    return this.fields[this.FIELDS.TEMPO_BPM] || 0;
  }
  get lists() {
    return this.fields[this.FIELDS.LISTS] || [];
  }
}
class Ee extends $.define({
  BOX: 0,
  PARENT: 1,
  COLOR: 3,
  VISIBLE: 4,
  OBJ_NAME: 6,
  VARS: 7,
  BLOCKS_BIN: 8,
  IS_CLONE: 9,
  MEDIA: 10,
  CURRENT_COSTUME: 11,
  VISIBILITY: 12,
  SCALE_POINT: 13,
  ROTATION_DEGREES: 14,
  ROTATION_STYLE: 15,
  VOLUME: 16,
  TEMPO_BPM: 17,
  DRAGGABLE: 18,
  SCENE_STATES: 19,
  LISTS: 20
}) {
  get scratchX() {
    return this.box.x + this.currentCostume.rotationCenter.x - 240;
  }
  get scratchY() {
    return 180 - (this.box.y + this.currentCostume.rotationCenter.y);
  }
  get visible() {
    return !(this.fields[this.FIELDS.VISIBLE] & 1);
  }
  get tempoBPM() {
    return this.fields[this.FIELDS.TEMPO_BPM] || 0;
  }
  get lists() {
    return this.fields[this.FIELDS.LISTS] || [];
  }
}
$.define({
  RECTANGLE: 0,
  FONT: 8,
  COLOR: 9,
  LINES: 11
});
class Te extends $.define({
  COSTUME_NAME: 0,
  BITMAP: 1,
  ROTATION_CENTER: 2,
  TEXT_DETAILS: 3,
  BASE_LAYER_DATA: 4,
  OLD_COMPOSITE: 5
}) {
  get image() {
    if (this.oldComposite instanceof be) {
      return this.oldComposite;
    } else if (this.baseLayerData.value) {
      return null;
    } else {
      return this.bitmap;
    }
  }
  get width() {
    if (this.image === null) {
      return -1;
    } else {
      return this.image.width;
    }
  }
  get height() {
    if (this.image === null) {
      return -1;
    } else {
      return this.image.height;
    }
  }
  get rawBytes() {
    if (this.image === null) {
      return this.baseLayerData.value.slice();
    } else {
      return this.image.bytes.value;
    }
  }
  get decoded() {
    if (this.image === null) {
      return this.baseLayerData.value.slice();
    } else {
      return this.image.decoded;
    }
  }
  get crc() {
    if (!this._crc) {
      const e = new ee().update(new Uint8Array(new Uint32Array([this.bitmap.width]).buffer)).update(new Uint8Array(new Uint32Array([this.bitmap.height]).buffer)).update(new Uint8Array(new Uint32Array([this.bitmap.depth]).buffer)).update(this.rawBytes);
      this._crc = e.digest;
    }
    return this._crc;
  }
  get extension() {
    if (this.oldComposite instanceof be) {
      return "uncompressed";
    } else if (this.baseLayerData.value) {
      return "jpg";
    } else {
      return "uncompressed";
    }
  }
  toString() {
    return `ImageMediaData "${this.costumeName}"`;
  }
}
class ve extends $.define({
  DATA: 3,
  RATE: 4
}) {}
class Ae extends $.define({
  NAME: 0,
  UNCOMPRESSED: 1,
  RATE: 4,
  BITS_PER_SAMPLE: 5,
  DATA: 6
}) {
  get rate() {
    if (this.uncompressed.data.value.length !== 0) {
      return this.uncompressed.rate;
    } else {
      return this.fields[this.FIELDS.RATE];
    }
  }
  get rawBytes() {
    if (this.data && this.data.value) {
      return this.data.value;
    } else {
      return this.uncompressed.data.value;
    }
  }
  get decoded() {
    if (!this._decoded) {
      if (this.data && this.data.value) {
        this._decoded = new ae(this.bitsPerSample.value).decode(this.data.value);
      } else {
        this._decoded = new Int16Array((e => {
          const t = new Uint8Array(e);
          for (let n = 0; n < t.length; n += 2) {
            t[n] = e[n + 1];
            t[n + 1] = e[n];
          }
          return t;
        })(this.uncompressed.data.value.slice()).buffer);
      }
    }
    return this._decoded;
  }
  get crc() {
    this._crc ||= new ee().update(new Uint32Array([this.rate])).update(this.rawBytes).digest;
    return this._crc;
  }
  get sampleCount() {
    if (this.data && this.data.value) {
      return ae.samples(this.bitsPerSample.value, this.data.value);
    } else {
      return this.uncompressed.data.value.length / 2;
    }
  }
  get extension() {
    return "pcm";
  }
  get wavEncodedData() {
    this._wavEncodedData ||= new Uint8Array(de.encode(this.decoded, {
      sampleRate: this.rate && this.rate.value
    }));
    return this._wavEncodedData;
  }
  get md5() {
    this._md5 ||= fe(this.wavEncodedData);
    return this._md5;
  }
  toString() {
    return `SoundMediaData "${this.name}"`;
  }
}
class we extends $.define({
  BOX: 0,
  HIDDEN_WHEN_NULL: 1,
  LIST_NAME: 8,
  CONTENTS: 9,
  TARGET: 10
}) {
  get x() {
    if (_(this.hiddenWhenNull) === null) {
      return 5;
    } else {
      return this.box.x + 1;
    }
  }
  get y() {
    if (_(this.hiddenWhenNull) === null) {
      return 5;
    } else {
      return this.box.y + 1;
    }
  }
  get width() {
    return this.box.width - 2;
  }
  get height() {
    return this.box.height - 2;
  }
}
class Se extends $.define({
  BOX: 0,
  PARENT: 1,
  FRAMES: 2,
  COLOR: 3,
  DIRECTION: 8,
  ALIGNMENT: 9
}) {}
class ke extends $.define({
  BOX: 0,
  PARENT: 1,
  COLOR: 3
}) {}
class Ie extends $.define({
  BOX: 0,
  COLOR: 3,
  VALUE: 8
}) {}
class Oe extends $.define({
  BOX: 0,
  READOUT_FRAME: 1,
  COLOR: 3,
  FONT: 6,
  VALUE: 8,
  TARGET: 10,
  CMD: 11,
  PARAM: 13
}) {}
class Ne extends $.define({
  BOX: 0
}) {}
const Re = 1;
const xe = 2;
const Me = 3;
class Ce extends $.define({
  BOX: 0,
  TARGET: 1,
  SHAPE: 2,
  READOUT: 14,
  READOUT_FRAME: 15,
  SLIDER: 16,
  ALIGNMENT: 17,
  SLIDER_MIN: 20,
  SLIDER_MAX: 21
}) {
  get x() {
    return this.box.x;
  }
  get y() {
    return this.box.y;
  }
  get mode() {
    if (_(this.slider) === null) {
      if (this.readoutFrame.box.height <= 14) {
        return Re;
      } else {
        return xe;
      }
    } else {
      return Me;
    }
  }
  get isDiscrete() {
    return Math.floor(this.sliderMin) === this.sliderMin && Math.floor(this.sliderMax) === this.sliderMax && Math.floor(this.readout.value) === this.readout.value;
  }
}
const Pe = {
  [z.POINT]: me,
  [z.RECTANGLE]: ge,
  [z.FORM]: be,
  [z.SQUEAK]: be,
  [z.SAMPLED_SOUND]: ve,
  [z.SPRITE]: Ee,
  [z.STAGE]: ye,
  [z.IMAGE_MEDIA]: Te,
  [z.SOUND_MEDIA]: Ae,
  [z.ALIGNMENT]: Se,
  [z.MORPH]: ke,
  [z.WATCHER_READOUT_FRAME]: Ne,
  [z.STATIC_STRING]: Ie,
  [z.UPDATING_STRING]: Oe,
  [z.WATCHER]: Ce,
  [z.LIST_WATCHER]: we
};
const Le = Array.from({
  length: 256
}, (e, t) => Pe[t] || null);
class De {
  constructor(e) {
    this.valueIterator = e;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const e = this.valueIterator.next();
    if (e.done) {
      return e;
    }
    const t = e.value;
    const {
      classId: n
    } = t;
    let r = t;
    if (t instanceof H) {
      r = [];
      for (let e = 0; e < t.size; e++) {
        r.push(this.next().value);
      }
    }
    if (Le[n] !== null || t instanceof K) {
      r = new (Le[t.classId] || $)({
        classId: t.classId,
        version: t.version,
        fields: r
      });
    }
    return {
      value: r,
      done: false
    };
  }
}
class Be {
  constructor(e) {
    this.table = Array.from(e);
    this.fixed = this.fix(this.table);
  }
  fix() {
    const e = [];
    for (let t = 0; t < this.table.length; t++) {
      this.fixItem(this.table[t]);
      e.push(this.table[t]);
    }
    return e;
  }
  fixItem(e) {
    if (e.fields !== undefined) {
      e = e.fields;
    }
    if (Array.isArray(e)) {
      for (let t = 0; t < e.length; t++) {
        e[t] = this.deref(e[t]);
      }
    }
  }
  deref(e) {
    if (e instanceof W) {
      return this.table[e.index - 1];
    } else {
      return e;
    }
  }
}
class Ue extends ce.extend({
  support8Bit: h,
  png: new O(3),
  dosLineEnding: new O(2),
  dosEndOfFile: new O(1),
  unixLineEnding: new O(1)
}) {
  static validate() {
    s(this.equals({
      support8Bit: 137,
      png: "PNG",
      dosLineEnding: "\r\n",
      dosEndOfFile: "",
      unixLineEnding: "\n"
    }), "PNGSignature does not match the expected values");
  }
}
ce.initConstructor(Ue);
class Fe extends ce.extend({
  length: T,
  chunkType: new O(4)
}) {}
ce.initConstructor(Fe);
class je extends ce.extend({
  checksum: T
}) {}
ce.initConstructor(je);
class ze extends ce.extend({
  width: T,
  height: T,
  bitDepth: h,
  colorType: h,
  compressionMethod: h,
  filterMethod: h,
  interlaceMethod: h
}) {}
ce.initConstructor(ze);
class Ge extends ce.extend({
  method: h
}) {}
ce.initConstructor(Ge);
class Ve {
  constructor() {
    this.adler = 1;
  }
  update(e, t, n) {
    let r = this.adler & 65535;
    let i = this.adler >>> 16;
    for (let s = 0; s < n; s++) {
      r = (r + e[t + s]) % 65521;
      i = (i + r) % 65521;
    }
    this.adler = i << 16 | r;
    return this;
  }
  get digest() {
    return this.adler;
  }
}
const _e = 65535;
class Ye extends ce.extend({
  cmf: h,
  flag: h
}) {}
ce.initConstructor(Ye);
class He extends ce.extend({
  lastPacket: h,
  length: A,
  lengthCheck: A
}) {}
ce.initConstructor(He);
class We extends ce.extend({
  checksum: S
}) {}
ce.initConstructor(We);
class Ke {
  constructor(e) {
    this.stream = e;
  }
  get uint8a() {
    return this.stream.uint8a;
  }
  set uint8a(e) {
    this.stream.uint8a = e;
    return this.stream.uint8a;
  }
  get position() {
    return this.stream.position;
  }
  set position(e) {
    this.stream.position = e;
    return this.stream.position;
  }
  writeStruct(e, t) {
    return this.stream.writeStruct(e, t);
  }
  writeBytes(e, t = 0, n = e.length) {
    return this.stream.writeBytes(e, t, n);
  }
}
class Xe extends Ke {
  constructor(e) {
    super(e);
    this.stream.writeStruct(Ye, {
      cmf: 8,
      flag: 29
    });
    this.adler = new Ve();
    this.chunk = this.stream.writeStruct(He, {
      lastPacket: 0,
      length: 0,
      lengthCheck: 65535
    });
  }
  get _deflateIndex() {
    return this.chunk.length;
  }
  set _deflateIndex(e) {
    this.chunk.length = e;
    this.chunk.lengthCheck = e ^ 65535;
    return this.chunk.length;
  }
  writeStruct(e, t) {
    this.writeBytes(Object.assign(new e(), t).uint8a);
  }
  writeBytes(e, t = 0, n = e.length) {
    let r = t;
    while (n - r > 0) {
      if (this._deflateIndex === _e) {
        this.chunk = this.stream.writeStruct(He, {
          lastPacket: 0,
          length: 0,
          lengthCheck: 65535
        });
      }
      const t = Math.min(n - r, _e - this._deflateIndex);
      this.stream.writeBytes(e, r, r + t);
      this._deflateIndex += t;
      r += t;
    }
    this.adler.update(e, t, n - t);
  }
  finish() {
    this.chunk.lastPacket = 1;
    this.stream.writeStruct(We, {
      checksum: this.adler.digest
    });
  }
  static estimateSize(e) {
    const t = Math.ceil(e / _e);
    return Ye.size + t * He.size + We.size + e;
  }
}
class Ze extends Ke {
  constructor(e, t = "IHDR") {
    super(e);
    this.start = this.stream.writeStruct(Fe, {
      length: 0,
      chunkType: t
    });
    this.crc = new ee();
  }
  finish() {
    const e = this.start.offset + this.start.size;
    const t = this.position - e;
    this.start.length = t;
    this.crc.update(this.stream.uint8a, e - T.size, t + T.size);
    this.stream.writeStruct(je, {
      checksum: this.crc.digest
    });
  }
  static size(e) {
    return Fe.size + e + je.size;
  }
}
class qe {
  encode(e, t, n) {
    const r = e * 4 + Ge.size;
    const i = r * t;
    const s = Ue.size + Ze.size(ze.size) + Ze.size(Xe.estimateSize(i)) + Ze.size(0);
    const a = new o(new ArrayBuffer(s));
    a.writeStruct(Ue, {
      support8Bit: 137,
      png: "PNG",
      dosLineEnding: "\r\n",
      dosEndOfFile: "",
      unixLineEnding: "\n"
    });
    const c = new Ze(a, "IHDR");
    c.writeStruct(ze, {
      width: e,
      height: t,
      bitDepth: 8,
      colorType: 6,
      compressionMethod: 0,
      filterMethod: 0,
      interlaceMethod: 0
    });
    c.finish();
    const l = new Ze(a, "IDAT");
    const u = new Xe(l);
    let h = 0;
    while (h < n.length) {
      u.writeStruct(Ge, {
        method: 0
      });
      const e = Math.min(n.length - h, r - Ge.size);
      u.writeBytes(n, h, h + e);
      h += e;
    }
    u.finish();
    l.finish();
    new Ze(a, "IEND").finish();
    return a.buffer;
  }
  static encode(e, t, n) {
    return new qe().encode(e, t, n);
  }
}
class Qe {
  constructor(e) {
    this.file = e;
  }
  async(e) {
    s(e === "uint8array", "SB1FakeZipFile only supports uint8array");
    return Promise.resolve(this.file.bytes);
  }
}
class Je {
  constructor(e) {
    this.files = e;
  }
  file(e) {
    if (e in this.files) {
      return new Qe(this.files[e]);
    }
  }
}
const $e = e => e.extension === "uncompressed" ? new Uint8Array(qe.encode(e.width, e.height, e.decoded)) : e.decoded;
const et = e => {
  const t = String(e[e.length - 1]);
  const n = e.length - 1;
  if (t === "mouse") {
    e[n] = "_mouse_";
  } else if (t === "edge") {
    e[n] = "_edge_";
  } else if (e[e.length - 1] instanceof ye) {
    e[n] = "_stage_";
  }
  return e;
};
const tt = {
  getParam: e => {
    let [t, n, r, i] = e;
    return [t, n, r, i || "r"];
  },
  changeVariable: e => [e[2], e[1], e[3]],
  EventHatMorph: e => String(e[1]) === "Scratch-StartClicked" ? ["whenGreenFlag"] : ["whenIReceive", e[1]],
  MouseClickEventHatMorph: () => ["whenClicked"],
  KeyEventHatMorph: e => ["whenKeyPressed", e[1]],
  stopScripts: e => String(e[1]) === "other scripts" ? [e[0], "other scripts in sprite"] : e,
  abs: e => ["computeFunction:of:", "abs", e[1]],
  sqrt: e => ["computeFunction:of:", "sqrt", e[1]],
  "\\\\": e => ["%", ...e.slice(1)],
  doReturn: () => ["stopScripts", "this script"],
  stopAll: () => ["stopScripts", "all"],
  "showBackground:": e => ["startScene", e[1]],
  nextBackground: () => ["nextScene"],
  doForeverIf: e => ["doForever", [["doIf", e[1], e[2]]]],
  "getAttribute:of:": et,
  "gotoSpriteOrMouse:": et,
  "distanceTo:": et,
  "pointTowards:": et,
  "touching:": et
};
const nt = e => {
  const {
    info: t,
    stageData: n,
    images: r,
    sounds: i
  } = e;
  const s = e => {
    const t = [];
    for (let n = 0; n < e.length; n += 2) {
      t.push([e[n], e[n + 1]]);
    }
    return t;
  };
  const o = e => {
    let [t, n] = e;
    return {
      name: t,
      value: n,
      isPersistent: false
    };
  };
  const a = e => {
    let [, {
      listName: t,
      contents: n,
      x: r,
      y: i,
      width: s,
      height: o,
      hiddenWhenNull: a
    }] = e;
    return {
      listName: t,
      contents: n,
      isPersistent: false,
      x: r,
      y: i,
      width: s,
      height: o,
      visible: (c = a, typeof c == "object" && c ? c.valueOf() : c) !== null
    };
    var c;
  };
  const c = e => {
    const t = i.findIndex(t => t.crc === e.crc);
    return {
      soundName: e.name,
      soundID: t,
      md5: `${e.md5}.wav`,
      sampleCount: e.sampleCount,
      rate: e.rate,
      format: ""
    };
  };
  const l = e => {
    const t = r.findIndex(t => t.crc === e.crc);
    return {
      costumeName: e.costumeName,
      baseLayerID: t,
      baseLayerMD5: `${fe(e.rawBytes)}.${n = e, n.extension === "uncompressed" ? "png" : "jpg"}`,
      bitmapResolution: 1,
      rotationCenterX: e.rotationCenter.x,
      rotationCenterY: e.rotationCenter.y
    };
    var n;
  };
  const u = e => {
    let t = e.map(d);
    const n = tt[t[0]];
    if (n) {
      t = n(t);
    }
    return t;
  };
  const h = e => e.map(u);
  const d = e => e instanceof Ee ? e.objName : Array.isArray(e) ? e.length === 0 || Array.isArray(e[0]) ? h(e) : u(e) : e;
  const p = e => [e[0].x, e[0].y, h(e[1])];
  const f = e => e instanceof Ee ? (e => {
    const t = e.media.filter(e => e instanceof Te);
    const r = e.media.filter(e => e instanceof Ae);
    return {
      objName: e.objName,
      variables: s(e.vars).map(o),
      lists: s(e.lists).map(a),
      scripts: e.blocksBin.map(p),
      costumes: t.map(l),
      currentCostumeIndex: t.findIndex(t => t.crc === e.currentCostume.crc),
      sounds: r.map(c),
      scratchX: e.scratchX,
      scratchY: e.scratchY,
      scale: e.scalePoint.x,
      direction: Math.round(e.rotationDegrees * 1000000) / 1000000 - 270,
      rotationStyle: e.rotationStyle,
      isDraggable: e.draggable,
      indexInLibrary: n.spriteOrderInLibrary.indexOf(e),
      visible: e.visible,
      spriteInfo: {}
    };
  })(e) : null;
  return JSON.parse(JSON.stringify(Object.assign((e => {
    const t = e.media.filter(e => e instanceof Te);
    const n = e.media.filter(e => e instanceof Ae);
    return {
      objName: e.objName,
      variables: s(e.vars).map(o),
      lists: s(e.lists).map(a),
      scripts: e.blocksBin.map(p),
      costumes: t.map(l),
      currentCostumeIndex: t.findIndex(t => t.crc === e.currentCostume.crc),
      sounds: n.map(c),
      penLayerMD5: "5c81a336fab8be57adc039a8a2b33ca9.png",
      penLayerID: 0,
      tempoBPM: e.tempoBPM,
      videoAlpha: 0.5,
      children: e.stageContents.map(f).filter(Boolean).reverse()
    };
  })(n), {
    info: (e => {
      const t = {};
      for (let n = 0; n < e.length; n += 2) {
        if (String(e[n]) !== "thumbnail") {
          t[String(e[n])] = String(e[n + 1]);
        }
      }
      return t;
    })(t)
  })));
};
class rt extends ce.extend({
  version: new O(10),
  infoByteLength: T
}) {
  validate() {
    s.validate(this.equals({
      version: "ScratchV01"
    }) || this.equals({
      version: "ScratchV02"
    }), "Invalid Scratch file signature.");
  }
}
ce.initConstructor(rt);
class it extends ce.extend({
  ObjS: new O(4),
  ObjSValue: h,
  Stch: new O(4),
  StchValue: h,
  numObjects: T
}) {
  validate() {
    s.validate(this.equals({
      ObjS: "ObjS",
      ObjSValue: 1,
      Stch: "Stch",
      StchValue: 1
    }), "Invalid Scratch file info packet header.");
  }
}
ce.initConstructor(it);
export class SB1File {
  constructor(e) {
    this.buffer = e;
    this.stream = new o(e);
    this.signature = this.stream.readStruct(rt);
    this.signature.validate();
    this.infoHeader = this.stream.readStruct(it);
    this.infoHeader.validate();
    this.stream.position += this.signature.infoByteLength - it.size;
    this.dataHeader = this.stream.readStruct(it);
    this.dataHeader.validate();
  }
  get json() {
    return nt({
      info: this.info(),
      stageData: this.data(),
      images: this.images(),
      sounds: this.sounds()
    });
  }
  get zip() {
    return (e => {
      let {
        images: t,
        sounds: n
      } = e;
      const r = {};
      let i = 0;
      for (const e of t) {
        r[`${i++}.${s = e, s.extension === "uncompressed" ? "png" : "jpg"}`] = {
          bytes: $e(e)
        };
      }
      var s;
      var o;
      i = 0;
      for (const e of n) {
        r[`${i++}.wav`] = {
          bytes: (o = e, o.wavEncodedData)
        };
      }
      return new Je(r);
    })({
      images: this.images(),
      sounds: this.sounds()
    });
  }
  view() {
    return {
      signature: this.signature,
      infoHeader: this.infoHeader,
      dataHeader: this.dataHeader,
      toString: () => "SB1File"
    };
  }
  infoRaw() {
    return new a(new J(this.buffer, this.infoHeader.offset + it.size), this.signature.infoByteLength + rt.size);
  }
  infoTable() {
    return new De(this.infoRaw());
  }
  info() {
    this._info ||= new Be(this.infoTable()).table[0];
    return this._info;
  }
  dataRaw() {
    return new a(new J(this.buffer, this.dataHeader.offset + it.size), this.stream.uint8a.length);
  }
  dataTable() {
    return new De(this.dataRaw());
  }
  dataFixed() {
    this._data ||= new Be(this.dataTable()).table;
    return this._data;
  }
  data() {
    return this.dataFixed()[0];
  }
  images() {
    const e = new Set();
    return this.dataFixed().filter(t => t instanceof Te && !e.has(t.crc) && (e.add(t.crc), true));
  }
  sounds() {
    const e = new Set();
    return this.dataFixed().filter(t => t instanceof Ae && !e.has(t.crc) && (e.add(t.crc), true));
  }
}