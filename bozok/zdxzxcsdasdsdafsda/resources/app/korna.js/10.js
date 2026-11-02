const r = require("./1.js");
const {
  InputOpcode: i,
  InputType: s
} = require("./15.js");
const o = require("./0.js");
class a {
  static getNumberInputType(e) {
    if (typeof e != "number") {
      throw new Error("Expected a number.");
    }
    if (e === Infinity) {
      return s.NUMBER_POS_INF;
    } else if (e === -Infinity) {
      return s.NUMBER_NEG_INF;
    } else if (e < 0) {
      if (Number.isInteger(e)) {
        return s.NUMBER_NEG_INT;
      } else {
        return s.NUMBER_NEG_FRACT;
      }
    } else if (e > 0) {
      if (Number.isInteger(e)) {
        return s.NUMBER_POS_INT;
      } else {
        return s.NUMBER_POS_FRACT;
      }
    } else if (Number.isNaN(e)) {
      return s.NUMBER_NAN;
    } else if (Object.is(e, -0)) {
      return s.NUMBER_NEG_ZERO;
    } else {
      return s.NUMBER_ZERO;
    }
  }
  constructor(e, t, n = {}, r = false) {
    this.opcode = e;
    this.type = t;
    this.inputs = n;
    this.yields = r;
  }
  isConstant(e) {
    if (this.opcode !== i.CONSTANT) {
      return false;
    }
    let t = this.inputs.value === e;
    if (!t && typeof e == "number") {
      t = +this.inputs.value === e;
    }
    return t;
  }
  isAlwaysType(e) {
    return (this.type & e) === this.type;
  }
  isSometimesType(e) {
    return !!(this.type & e);
  }
  toType(e) {
    let t;
    switch (e) {
      case s.BOOLEAN:
        t = i.CAST_BOOLEAN;
        break;
      case s.NUMBER:
        t = i.CAST_NUMBER;
        break;
      case s.NUMBER_INDEX:
        t = i.CAST_NUMBER_INDEX;
        break;
      case s.NUMBER_OR_NAN:
        t = i.CAST_NUMBER_OR_NAN;
        break;
      case s.STRING:
        t = i.CAST_STRING;
        break;
      case s.COLOR:
        t = i.CAST_COLOR;
        break;
      default:
        o.warn(`Cannot cast to type: ${e}`, this);
        throw new Error(`Cannot cast to type: ${e}`);
    }
    if (this.isAlwaysType(e)) {
      return this;
    }
    if (this.opcode === i.CONSTANT) {
      switch (t) {
        case i.CAST_BOOLEAN:
          this.inputs.value = r.toBoolean(this.inputs.value);
          this.type = s.BOOLEAN;
          break;
        case i.CAST_NUMBER:
        case i.CAST_NUMBER_INDEX:
        case i.CAST_NUMBER_OR_NAN:
          {
            if (this.isAlwaysType(s.BOOLEAN)) {
              this.type = s.NUMBER;
              this.inputs.value = +r.toBoolean(this.inputs.value);
            }
            const e = +this.inputs.value;
            if (e) {
              this.inputs.value = e;
            } else if (Object.is(e, -0)) {
              this.inputs.value = -0;
            } else {
              this.inputs.value = 0;
            }
            if (t === i.CAST_NUMBER_INDEX) {
              this.inputs.value |= 0;
            }
            this.type = a.getNumberInputType(this.inputs.value);
            break;
          }
        case i.CAST_STRING:
          this.inputs.value += "";
          this.type = s.STRING;
          break;
        case i.CAST_COLOR:
          this.inputs.value = r.toRgbColorList(this.inputs.value);
          this.type = s.COLOR;
      }
      return this;
    }
    return new a(t, e, {
      target: this
    });
  }
}
module.exports = {
  IntermediateStackBlock: class {
    constructor(e, t = {}, n = false) {
      this.opcode = e;
      this.inputs = t;
      this.yields = n;
      this.blockId = null;
      this.ignoreState = false;
      this.entryState = null;
      this.exitState = null;
    }
  },
  IntermediateInput: a,
  IntermediateStack: class {
    constructor(e) {
      this.blocks = e ?? [];
    }
  },
  IntermediateScript: class {
    constructor() {
      this.topBlockId = null;
      this.stack = null;
      this.isProcedure = false;
      this.procedureVariant = "";
      this.procedureCode = "";
      this.arguments = [];
      this.isWarp = false;
      this.yields = false;
      this.warpTimer = false;
      this.dependedProcedures = [];
      this.cachedCompileResult = null;
      this.cachedAnalysisEndState = null;
      this.executableHat = false;
    }
  },
  IntermediateRepresentation: class {
    constructor(e, t) {
      this.entry = e;
      this.procedures = t;
    }
    getProcedure(e) {
      return Object.values(this.procedures).find(t => t.procedureCode === e);
    }
  },
  stringifyType: e => {
    let t = [];
    for (const n in s) {
      const r = s[n];
      if ((r & e) === r) {
        for (const e of t) {
          s[e];
        }
        t = t.filter(e => (s[e] & r) !== s[e]);
        t.push(n);
      }
    }
    let n = null;
    for (const e of t) {
      n = n === null ? e : `${n} | ${e}`;
    }
    if (n === null) {
      return "INVALID";
    } else {
      return n;
    }
  }
};