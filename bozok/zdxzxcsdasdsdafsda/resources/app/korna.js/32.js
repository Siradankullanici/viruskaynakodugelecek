function n(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (typeof e != "object" || !e) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var r = n.call(e, t || "default");
        if (typeof r != "object") {
          return r;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (typeof t == "symbol") {
      return t;
    } else {
      return t + "";
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
class r {
  constructor(e) {
    this.runtime = e;
    this.pc = null;
    this.enableBasic = false;
    this.enableCommands = false;
    this.locations = [];
    this.blockLocations = new Map();
  }
  isAvailable() {
    return typeof SharedArrayBuffer == "function";
  }
  setEnabled(e) {
    if (e > 0 && !this.isAvailable()) {
      throw new Error("Sampler is not available");
    }
    if (this.pc === null && e > 0) {
      this.pc = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));
    }
    this.enableBasic = e >= r.LEVEL_BASIC;
    this.enableCommands = e >= r.LEVEL_COMMANDS;
    this.runtime.resetAllCaches();
  }
  blockToLocation(e, t) {
    let n = this.blockLocations.get(e);
    if (!n) {
      n = new Map();
      this.blockLocations.set(e, n);
    }
    let r = n.get(t);
    if (r === undefined) {
      this.locations.push({
        blockId: t,
        spriteId: e
      });
      r = this.locations.length - 1;
      n.set(t, r);
    }
    return r;
  }
  locationToBlock(e) {
    if (e < 0) {
      throw new Error("Tried to get block from a reserved location ID");
    }
    return this.locations[e];
  }
}
n(r, "IDLE", -1);
n(r, "RUNTIME", -2);
n(r, "RENDERER", -3);
n(r, "WARP_TIMER", -4);
n(r, "LEVEL_BASIC", 1);
n(r, "LEVEL_COMMANDS", 2);
module.exports = r;