const {
  StackOpcode: r,
  InputOpcode: i,
  InputType: s
} = require("./15.js");
const o = require("./0.js");
const {
  IntermediateStack: a,
  IntermediateInput: c,
  IntermediateScript: l,
  IntermediateRepresentation: u,
  IntermediateStackBlock: h
} = require("./10.js");
class d {
  constructor() {
    this.variables = Object.create(null);
  }
  clear() {
    let e = false;
    for (const t in this.variables) {
      if (this.variables[t] !== s.ANY) {
        e = true;
        break;
      }
    }
    this.variables = Object.create(null);
    return e;
  }
  clone() {
    const e = new d();
    for (const t in this.variables) {
      e.variables[t] = this.variables[t];
    }
    return e;
  }
  mutate(e, t) {
    let n = false;
    for (const r in e.variables) {
      const e = t(r);
      if (e !== this.variables[r]) {
        this.variables[r] = e;
        n = n || true;
      }
    }
    for (const r in this.variables) {
      if (!e.variables[r]) {
        const e = t(r);
        if (e !== this.variables[r]) {
          this.variables[r] = e;
          n = n || true;
        }
      }
    }
    return n;
  }
  or(e) {
    return this.mutate(e, t => {
      return (this.variables[t] ?? s.ANY) | (e.variables[t] ?? s.ANY);
    });
  }
  after(e) {
    return this.mutate(e, t => {
      const r = e.variables[t];
      return r || (this.variables[t] ?? s.ANY);
    });
  }
  overwrite(e) {
    return this.mutate(e, t => {
      return e.variables[t] ?? s.ANY;
    });
  }
  setVariableType(e, t) {
    return this.variables[e.id] !== t && (this.variables[e.id] = t, true);
  }
  getVariableType(e) {
    return this.variables[e.id] ?? s.ANY;
  }
}
module.exports = {
  IROptimizer: class {
    constructor(e) {
      this.ir = e;
      this.ignoreYields = false;
      this.exitState = null;
    }
    getInputType(e, t) {
      const n = e.inputs;
      switch (e.opcode) {
        case i.VAR_GET:
          return t.getVariableType(n.variable);
        case i.ADDON_CALL:
          break;
        case i.CAST_BOOLEAN:
          {
            const e = n.target.type;
            if ((e & s.BOOLEAN) === e) {
              return e;
            } else {
              return s.BOOLEAN;
            }
          }
        case i.CAST_NUMBER:
          {
            const e = n.target.type;
            if ((e & s.NUMBER) === e) {
              return e;
            } else {
              return s.NUMBER;
            }
          }
        case i.CAST_NUMBER_INDEX:
          {
            const e = n.target.type;
            if ((e & s.NUMBER_INDEX) === e) {
              return e;
            } else {
              return s.NUMBER_INDEX;
            }
          }
        case i.CAST_NUMBER_OR_NAN:
          {
            const e = n.target.type;
            if ((e & s.NUMBER_OR_NAN) === e) {
              return e;
            } else {
              return s.NUMBER_OR_NAN;
            }
          }
        case i.CAST_STRING:
          {
            const e = n.target.type;
            if ((e & s.STRING) === e) {
              return e;
            } else {
              return s.STRING;
            }
          }
        case i.OP_ADD:
          {
            const e = n.left.type;
            const t = n.right.type;
            let r = 0;
            if (function () {
              return !!(e & s.NUMBER_POS_INF) && !!(t & s.NUMBER_NEG_INF) || !!(e & s.NUMBER_NEG_INF) && !!(t & s.NUMBER_POS_INF) || undefined;
            }()) {
              r |= s.NUMBER_NAN;
            }
            const i = function () {
              return !!(e & s.NUMBER_FRACT) || !!(t & s.NUMBER_FRACT) || undefined;
            }();
            if (function () {
              return !!(e & s.NUMBER_POS) || !!(t & s.NUMBER_POS) || undefined;
            }()) {
              r |= s.NUMBER_POS_INT | s.NUMBER_POS_INF;
              if (i) {
                r |= s.NUMBER_POS_FRACT;
              }
            }
            if (function () {
              return !!(e & s.NUMBER_NEG) || !!(t & s.NUMBER_NEG) || undefined;
            }()) {
              r |= s.NUMBER_NEG_INT | s.NUMBER_NEG_INF;
              if (i) {
                r |= s.NUMBER_NEG_FRACT;
              }
            }
            if (function () {
              return !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_NEG_REAL) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_ZERO) || !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_NEG_ZERO) || !!(e & s.NUMBER_NEG_ZERO) && !!(t & s.NUMBER_ZERO) || undefined;
            }()) {
              r |= s.NUMBER_ZERO;
            }
            if (function () {
              if (e & s.NUMBER_NEG_ZERO && t & s.NUMBER_NEG_ZERO) {
                return true;
              }
            }()) {
              r |= s.NUMBER_NEG_ZERO;
            }
            return r;
          }
        case i.OP_SUBTRACT:
          {
            const e = n.left.type;
            const t = n.right.type;
            let r = 0;
            if (function () {
              return !!(e & s.NUMBER_POS_INF) && !!(t & s.NUMBER_POS_INF) || !!(e & s.NUMBER_NEG_INF) && !!(t & s.NUMBER_NEG_INF) || undefined;
            }()) {
              r |= s.NUMBER_NAN;
            }
            const i = function () {
              return !!(e & s.NUMBER_FRACT) || !!(t & s.NUMBER_FRACT) || undefined;
            }();
            if (function () {
              return !!(e & s.NUMBER_POS) || !!(t & s.NUMBER_NEG) || undefined;
            }()) {
              r |= s.NUMBER_POS_INT | s.NUMBER_POS_INF;
              if (i) {
                r |= s.NUMBER_POS_FRACT;
              }
            }
            if (function () {
              return !!(e & s.NUMBER_NEG) || !!(t & s.NUMBER_POS) || undefined;
            }()) {
              r |= s.NUMBER_NEG_INT | s.NUMBER_NEG_INF;
              if (i) {
                r |= s.NUMBER_NEG_FRACT;
              }
            }
            if (function () {
              return !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_NEG_REAL) || !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_ZERO) || !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_NEG_ZERO) || !!(e & s.NUMBER_NEG_ZERO) && !!(t & s.NUMBER_NEG_ZERO) || undefined;
            }()) {
              r |= s.NUMBER_ZERO;
            }
            if (function () {
              if (e & s.NUMBER_NEG_ZERO && t & s.NUMBER_ZERO) {
                return true;
              }
            }()) {
              r |= s.NUMBER_NEG_ZERO;
            }
            return r;
          }
        case i.OP_MULTIPLY:
          {
            const e = n.left.type;
            const t = n.right.type;
            let r = 0;
            if (function () {
              return !!(e & s.NUMBER_INF) && !!(t & s.NUMBER_ANY_ZERO) || !!(e & s.NUMBER_ANY_ZERO) && !!(t & s.NUMBER_INF) || undefined;
            }()) {
              r |= s.NUMBER_NAN;
            }
            const i = function () {
              return !!(e & s.NUMBER_FRACT) || !!(t & s.NUMBER_FRACT) || undefined;
            }();
            if (function () {
              return !!(e & s.NUMBER_POS) && !!(t & s.NUMBER_POS) || !!(e & s.NUMBER_NEG) && !!(t & s.NUMBER_NEG) || undefined;
            }()) {
              r |= s.NUMBER_POS_INT | s.NUMBER_POS_INF;
              if (i) {
                r |= s.NUMBER_POS_FRACT;
              }
            }
            if (function () {
              return !!(e & s.NUMBER_POS) && !!(t & s.NUMBER_NEG) || !!(e & s.NUMBER_NEG) && !!(t & s.NUMBER_POS) || undefined;
            }()) {
              r |= s.NUMBER_NEG_INT | s.NUMBER_NEG_INF;
              if (i) {
                r |= s.NUMBER_NEG_FRACT;
              }
            }
            if (function () {
              return !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_ZERO) || !!(e & s.NUMBER_NEG_ZERO) && !!(t & s.NUMBER_NEG_ZERO) || !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_NEG_ZERO) && !!(t & s.NUMBER_NEG_REAL) || !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_ZERO) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_NEG_ZERO) || !!(e & s.NUMBER_FRACT) && !!(t & s.NUMBER_FRACT) || undefined;
            }()) {
              r |= s.NUMBER_ZERO;
            }
            if (function () {
              return !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_NEG_ZERO) || !!(e & s.NUMBER_NEG_ZERO) && !!(t & s.NUMBER_ZERO) || !!(e & s.NUMBER_NEG_ZERO) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_NEG_REAL) || !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_NEG_ZERO) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_ZERO) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_NEG_REAL) || undefined;
            }()) {
              r |= s.NUMBER_NEG_ZERO;
            }
            return r;
          }
        case i.OP_DIVIDE:
          {
            const e = n.left.type;
            const t = n.right.type;
            let r = 0;
            if (function () {
              return !!(e & s.NUMBER_ANY_ZERO) && !!(t & s.NUMBER_ANY_ZERO) || !!(e & s.NUMBER_INF) && !!(t & s.NUMBER_INF) || !!(e & s.NUMBER_ANY_ZERO) && !!(t & s.NUMBER_NAN) || undefined;
            }()) {
              r |= s.NUMBER_NAN;
            }
            if (function () {
              return !!(e & s.NUMBER_POS) && !!(t & s.NUMBER_POS) || !!(e & s.NUMBER_NEG) && !!(t & s.NUMBER_NEG) || undefined;
            }()) {
              r |= s.NUMBER_POS;
            }
            if (function () {
              return !!(e & s.NUMBER_NEG) && !!(t & s.NUMBER_ZERO) || !!(e & s.NUMBER_POS) && !!(t & s.NUMBER_NEG_ZERO) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_NEG_REAL) || undefined;
            }()) {
              r |= s.NUMBER_NEG_INF;
            }
            if (function () {
              return !!(e & s.NUMBER_POS) && !!(t & s.NUMBER_ZERO) || !!(e & s.NUMBER_NEG) && !!(t & s.NUMBER_NEG_ZERO) || !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_NEG_REAL) || undefined;
            }()) {
              r |= s.NUMBER_POS_INF;
            }
            if (function () {
              return !!(e & s.NUMBER_POS) && !!(t & s.NUMBER_NEG) || !!(e & s.NUMBER_NEG) && !!(t & s.NUMBER_POS) || undefined;
            }()) {
              r |= s.NUMBER_NEG;
            }
            if (function () {
              return !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_POS) || !!(e & s.NUMBER_NEG_ZERO) && !!(t & s.NUMBER_NEG) || !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_NEG_REAL) || !!(e & s.NUMBER_POS) && !!(t & s.NUMBER_POS_INF) || !!(e & s.NUMBER_NEG) && !!(t & s.NUMBER_NEG_INF) || undefined;
            }()) {
              r |= s.NUMBER_ZERO;
            }
            if (function () {
              return !!(e & s.NUMBER_NEG_ZERO) && !!(t & s.NUMBER_POS) || !!(e & s.NUMBER_ZERO) && !!(t & s.NUMBER_NEG) || !!(e & s.NUMBER_NEG_REAL) && !!(t & s.NUMBER_POS_REAL) || !!(e & s.NUMBER_POS_REAL) && !!(t & s.NUMBER_NEG_REAL) || !!(e & s.NUMBER_POS) && !!(t & s.NUMBER_NEG_INF) || !!(e & s.NUMBER_NEG) && !!(t & s.NUMBER_POS_INF) || undefined;
            }()) {
              r |= s.NUMBER_NEG_ZERO;
            }
            return r;
          }
      }
      return e.type;
    }
    analyzeInputBlock(e, t) {
      const n = e.inputs;
      let r = this.analyzeInputs(n, t);
      const s = this.getInputType(e, t);
      r = r || s !== e.type;
      e.type = s;
      switch (e.opcode) {
        case i.ADDON_CALL:
          r = t.clear() || r;
          break;
        case i.PROCEDURE_CALL:
          {
            r = this.analyzeInputs(n.inputs, t) || r;
            const e = this.ir.procedures[n.variant];
            r = e && e.cachedAnalysisEndState ? e.yields ? t.overwrite(e.cachedAnalysisEndState) || r : t.after(e.cachedAnalysisEndState) || r : t.clear() || r;
            break;
          }
      }
      return r;
    }
    analyzeInputs(e, t) {
      let n = false;
      for (const r in e) {
        const i = e[r];
        if (i instanceof c) {
          n = this.analyzeInputBlock(i, t) || n;
        }
      }
      return n;
    }
    addPossibleExitState(e) {
      if (this.exitState !== null) {
        this.exitState.or(e);
      } else {
        this.exitState = e.clone();
      }
    }
    analyzeStackBlock(e, t) {
      const n = e.inputs;
      let i = false;
      if (e.ignoreState) {
        t = t.clone();
      }
      switch (e.opcode) {
        case r.VAR_SET:
          i = this.analyzeInputs(n, t) || i;
          i = t.setVariableType(n.variable, n.value.type) || i;
          break;
        case r.CONTROL_WHILE:
        case r.CONTROL_FOR:
          i = this.analyzeInputs(n, t) || i;
          i = this.analyzeLoopedStack(n.do, t, e, true) || i;
          break;
        case r.CONTROL_REPEAT:
          i = this.analyzeInputs(n, t) || i;
          i = this.analyzeLoopedStack(n.do, t, e, false) || i;
          break;
        case r.CONTROL_IF_ELSE:
          {
            i = this.analyzeInputs(n, t) || i;
            const e = t.clone();
            i = this.analyzeStack(n.whenTrue, e) || i;
            i = this.analyzeStack(n.whenFalse, t) || i;
            i = t.or(e) || i;
            break;
          }
        case r.CONTROL_STOP_SCRIPT:
        case r.PROCEDURE_RETURN:
          i = this.analyzeInputs(n, t) || i;
          this.addPossibleExitState(t);
          break;
        case r.CONTROL_WAIT_UNTIL:
          i = t.clear() || i;
          i = this.analyzeInputs(n, t) || i;
          break;
        case r.PROCEDURE_CALL:
          {
            i = this.analyzeInputs(n, t) || i;
            i = this.analyzeInputs(n.inputs, t) || i;
            const e = this.ir.procedures[n.variant];
            i = e && e.cachedAnalysisEndState ? e.yields ? t.overwrite(e.cachedAnalysisEndState) || i : t.after(e.cachedAnalysisEndState) || i : t.clear() || i;
            break;
          }
        case r.COMPATIBILITY_LAYER:
          i = this.analyzeInputs(n, t) || i;
          this.analyzeInputs(n.inputs, t);
          for (const e in n.substacks) {
            const r = t.clone();
            i = this.analyzeStack(n.substacks[e], r) || i;
            i = t.or(r) || i;
          }
          break;
        default:
          i = this.analyzeInputs(n, t) || i;
      }
      return i;
    }
    analyzeStack(e, t) {
      if (!e) {
        return false;
      }
      let n = false;
      for (const r of e.blocks) {
        let e = this.analyzeStackBlock(r, t);
        if (!r.ignoreState) {
          if (r.yields && !this.ignoreYields) {
            e = t.clear() || e;
          }
          if (e) {
            if (r.exitState) {
              r.exitState.or(t);
            } else {
              r.exitState = t.clone();
            }
            n = true;
          }
        }
      }
      return n;
    }
    analyzeLoopedStack(e, t, n, r) {
      let i = false;
      if (n.yields && !this.ignoreYields) {
        i = t.clear();
        if (r) {
          i = this.analyzeInputs(n.inputs, t) || i;
        }
        n.entryState = t.clone();
        n.exitState = t.clone();
        return this.analyzeStack(e, t) || i;
      }
      let s;
      let a = 0;
      do {
        if (a > 10000) {
          o.error("analyzeLoopedStack stuck in likely infinite loop; quitting", n, t);
          i = t.clear();
          n.entryState = t.clone();
          n.exitState = t.clone();
          i = this.analyzeInputs(n.inputs, t) || i;
          return this.analyzeStack(e, t) || i;
        }
        a++;
        const c = t.clone();
        i = this.analyzeStack(e, c) || i;
        i = (s = t.or(c)) || i;
        if (r) {
          i = this.analyzeInputs(n.inputs, t) || i;
        }
      } while (s);
      n.entryState = t.clone();
      return i;
    }
    optimizeInput(e, t) {
      for (const n in e.inputs) {
        const r = e.inputs[n];
        if (r instanceof c) {
          e.inputs[n] = this.optimizeInput(r, t);
        }
      }
      switch (e.opcode) {
        case i.CAST_BOOLEAN:
          {
            const t = e.inputs.target.type;
            if ((t & s.BOOLEAN) === t) {
              return e.inputs.target;
            } else {
              return e;
            }
          }
        case i.CAST_NUMBER:
          {
            const t = e.inputs.target.type;
            if ((t & s.NUMBER) === t) {
              return e.inputs.target;
            } else {
              return e;
            }
          }
        case i.CAST_NUMBER_INDEX:
          {
            const t = e.inputs.target.type;
            if ((t & s.NUMBER_INDEX) === t) {
              return e.inputs.target;
            } else {
              return e;
            }
          }
        case i.CAST_NUMBER_OR_NAN:
          {
            const t = e.inputs.target.type;
            if ((t & s.NUMBER_OR_NAN) === t) {
              return e.inputs.target;
            } else {
              return e;
            }
          }
        case i.CAST_STRING:
          {
            const t = e.inputs.target.type;
            if ((t & s.STRING) === t) {
              return e.inputs.target;
            } else {
              return e;
            }
          }
      }
      return e;
    }
    optimizeStack(e, t) {
      if (e) {
        for (const n of e.blocks) {
          if (n.entryState) {
            t = n.entryState;
          }
          for (const e in n.inputs) {
            const r = n.inputs[e];
            if (r instanceof c) {
              n.inputs[e] = this.optimizeInput(r, t);
            } else if (r instanceof a) {
              this.optimizeStack(r, t);
            }
          }
          if (n.exitState) {
            t = n.exitState;
          }
        }
      }
    }
    optimizeScript(e, t) {
      if (e.isProcedure) {
        if (t.has(e.procedureVariant)) {
          return;
        }
        t.add(e.procedureVariant);
      }
      for (const n of e.dependedProcedures) {
        this.optimizeScript(this.ir.procedures[n], t);
      }
      this.exitState = null;
      const n = new d();
      this.analyzeStack(e.stack, n);
      this.addPossibleExitState(n);
      e.cachedAnalysisEndState = this.exitState;
      this.optimizeStack(e.stack, new d());
    }
    optimize() {
      this.optimizeScript(this.ir.entry, new Set());
    }
  },
  TypeState: d
};