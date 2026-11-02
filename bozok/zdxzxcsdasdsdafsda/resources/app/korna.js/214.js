module.exports = class {
  constructor(e) {
    this.runtime = e;
  }
  getPrimitives() {
    return {
      procedures_definition: this.definition,
      procedures_call: this.call,
      procedures_return: this.return,
      argument_reporter_string_number: this.argumentReporterStringNumber,
      argument_reporter_boolean: this.argumentReporterBoolean
    };
  }
  definition() {}
  call(e, t) {
    const n = t.stackFrame;
    const r = !!e.mutation.return;
    if (n.executed) {
      if (r) {
        const e = n.returnValue;
        t.thread.peekStackFrame().params = null;
        delete n.returnValue;
        delete n.executed;
        return e;
      }
      return;
    }
    const i = e.mutation.proccode;
    const s = t.getProcedureParamNamesIdsAndDefaults(i);
    if (s === null) {
      if (r) {
        return "";
      } else {
        return undefined;
      }
    }
    const [o, a, c] = s;
    t.initParams();
    for (let n = 0; n < a.length; n++) {
      if (Object.prototype.hasOwnProperty.call(e, a[n])) {
        t.pushParam(o[n], e[a[n]]);
      } else {
        t.pushParam(o[n], c[n]);
      }
    }
    const l = t.runtime.getAddonBlock(i);
    if (l) {
      const e = l.callback(t.thread.getAllparams(), t);
      if (t.thread.status === 1) {
        n.executed = true;
      }
      return e;
    }
    n.executed = true;
    if (r) {
      t.thread.peekStackFrame().waitingReporter = true;
      n.returnValue = "";
    }
    t.startProcedure(i);
  }
  return(e, t) {
    t.stopThisScript();
    if (t.thread.peekStackFrame()) {
      t.stackFrame.returnValue = e.VALUE;
    }
  }
  argumentReporterStringNumber(e, t) {
    const n = t.getParam(e.VALUE);
    if (n === null) {
      if (String(e.VALUE).toLowerCase() === "last key pressed") {
        return t.ioQuery("keyboard", "getLastKeyPressed");
      } else {
        return 0;
      }
    } else {
      return n;
    }
  }
  argumentReporterBoolean(e, t) {
    const n = t.getParam(e.VALUE);
    if (n === null) {
      const n = String(e.VALUE).toLowerCase();
      return !!t.target.runtime.compilerOptions.enabled && n === "is compiled?" || n === "is turbowarp?" || 0;
    }
    return n;
  }
};