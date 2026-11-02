const r = require("./69.js");
const i = require("./66.js");
const s = require("./0.js");
const o = require("./20.js");
const a = require("./1.js");
const c = new r();
let l = -1;
const u = function (e, t, n, r, i) {
  const s = r.id;
  const c = r.opcode;
  const l = r._isHat;
  const u = r._isConditional;
  const h = r._isLoop;
  n.pushReportedValue(e);
  if (l) {
    if (n.stackClick) {
      n.status = o.STATUS_RUNNING;
    } else if (t.runtime.getIsEdgeActivatedHat(c)) {
      const r = n.target.hasEdgeActivatedValue(s);
      const i = n.target.updateEdgeActivatedValue(s, e);
      if (r ? !i && e : e) {
        n.status = o.STATUS_RUNNING;
      } else {
        t.retireThread(n);
      }
    } else if (e) {
      n.status = o.STATUS_RUNNING;
    } else {
      t.retireThread(n);
    }
  } else if ((u || h) && e !== undefined) {
    t.stepToBranch(n, a.toNumber(e), h);
  } else {
    if (i && e !== undefined && n.atStackTop() && (n.stackClick && t.runtime.visualReport(n.target, s, e), n.updateMonitor)) {
      const n = t.runtime.monitorBlocks.getBlock(s).targetId;
      if (n && !t.runtime.getTargetById(n)) {
        return;
      }
      t.runtime.requestUpdateMonitor({
        id: s,
        spriteName: n ? t.runtime.getTargetById(n).getName() : null,
        value: e
      });
    }
    n.status = o.STATUS_RUNNING;
  }
};
const h = (e, t, n, r, i) => {
  u(e, t, n, r, i);
  if (i && (!r._isHat || n.stackClick)) {
    let e;
    let t;
    do {
      const r = n.popStack();
      if (r === null) {
        return;
      }
      t = n.target.blocks.getNextBlock(r);
      if (t !== null) {
        break;
      }
      e = n.peekStackFrame();
    } while (e !== null && !e.isLoop);
    n.pushStack(t);
  }
};
const d = (e, t, n, r, i) => {
  if (n.status === o.STATUS_RUNNING) {
    n.status = o.STATUS_PROMISE_WAIT;
  }
  e.then(e => {
    h(e, t, n, r, i);
  }, e => {
    s.warn("Primitive rejected promise: ", e);
    h(`${e}`, t, n, r, i);
  });
};
class p {
  constructor(e, t) {
    this.id = t.id;
    this.opcode = t.opcode;
    this.fields = t.fields;
    this.inputs = t.inputs;
    this.mutation = t.mutation;
    this._profiler = null;
    this._profilerFrame = null;
    this._isHat = false;
    this._blockFunction = null;
    this._definedBlockFunction = false;
    this._isShadowBlock = false;
    this._shadowValue = null;
    this._fields = Object.assign({}, this.fields);
    this._inputs = Object.assign({}, this.inputs);
    this._argValues = {
      mutation: this.mutation
    };
    this._parentKey = null;
    this._parentValues = null;
    this._ops = [];
    const {
      runtime: n
    } = c.sequencer;
    const {
      opcode: r,
      fields: s,
      inputs: o
    } = this;
    this._isHat = n.getIsHat(r);
    this._blockFunction = n.getOpcodeFunction(r);
    this._definedBlockFunction = this._blockFunction !== undefined;
    const a = n._flowing[r];
    this._isConditional = !!a && !!a.conditional;
    this._isLoop = !!a && !!a.loop;
    const l = Object.keys(s);
    this._isShadowBlock = !this._definedBlockFunction && l.length === 1 && Object.keys(o).length === 0;
    this._shadowValue = this._isShadowBlock && s[l[0]].value;
    for (const e in s) {
      this._argValues[e] = e === "VARIABLE" || e === "LIST" || e === "BROADCAST_OPTION" ? {
        id: s[e].id,
        name: s[e].value
      } : s[e].value;
    }
    delete this._inputs.custom_block;
    if ("BROADCAST_INPUT" in this._inputs) {
      this._argValues.BROADCAST_OPTION = {
        id: null,
        name: null
      };
      const t = this._inputs.BROADCAST_INPUT;
      if (t.block === t.shadow) {
        const n = e.getBlock(t.shadow).fields.BROADCAST_OPTION;
        this._argValues.BROADCAST_OPTION.id = n.id;
        this._argValues.BROADCAST_OPTION.name = n.value;
        delete this._inputs.BROADCAST_INPUT;
      }
    }
    for (const t in this._inputs) {
      const n = this._inputs[t];
      if (n.block) {
        const r = i.getCached(e, n.block, p);
        if (r._isHat) {
          continue;
        }
        this._ops.push(...r._ops);
        r._parentKey = t;
        r._parentValues = this._argValues;
        if (r._isShadowBlock) {
          this._argValues[t] = r._shadowValue;
        }
      }
    }
    if (this._definedBlockFunction) {
      this._ops.push(this);
    }
  }
}
module.exports = function (e, t) {
  const n = e.runtime;
  c.sequencer = e;
  c.thread = t;
  const r = t.peekStack();
  const s = t.peekStackFrame();
  let h = t.blockContainer;
  let f = i.getCached(h, r, p);
  if (f === null && (h = n.flyoutBlocks, f = i.getCached(h, r, p), f === null)) {
    e.retireThread(t);
    return;
  }
  const m = f._ops;
  const g = m.length;
  let b = 0;
  if (s.reported !== null) {
    const e = s.reported;
    for (; b < e.length; b++) {
      const {
        opCached: t,
        inputValue: n
      } = e[b];
      const r = m.find(e => e.id === t);
      if (r) {
        const e = r._parentKey;
        const t = r._parentValues;
        if (e === "BROADCAST_INPUT") {
          t.BROADCAST_OPTION.id = null;
          t.BROADCAST_OPTION.name = a.toString(n);
        } else {
          t[e] = n;
        }
      }
    }
    if (e.length > 0) {
      const t = e.reverse().find(e => m.find(t => t.id === e.opCached));
      b = t ? m.findIndex(e => e.id === t.opCached) + 1 : 0;
    }
    if (t.justReported !== null && m[b] && m[b].id === s.reporting) {
      const e = m[b];
      const n = t.justReported;
      t.justReported = null;
      const r = e._parentKey;
      const i = e._parentValues;
      if (r === "BROADCAST_INPUT") {
        i.BROADCAST_OPTION.id = null;
        i.BROADCAST_OPTION.name = a.toString(n);
      } else {
        i[r] = n;
      }
      b += 1;
    }
    s.reporting = null;
    s.reported = null;
    s.waitingReporter = false;
  }
  const y = b;
  for (; b < g; b++) {
    const n = b === g - 1;
    const r = m[b];
    s.op = r;
    const i = r._blockFunction;
    const l = r._argValues;
    if (!h.forceNoGlow) {
      t.requestScriptGlowInFrame = true;
    }
    const p = i(l, c);
    const f = (E = p) !== null && typeof E == "object" && typeof E.then == "function";
    if (f || s.waitingReporter) {
      if (f) {
        d(p, e, t, r, n);
      }
      t.justReported = null;
      s.reporting = m[b].id;
      s.reported = m.slice(0, b).map(e => {
        const t = e._parentKey;
        const n = e._parentValues;
        if (t === "BROADCAST_INPUT") {
          return {
            opCached: e.id,
            inputValue: n[t].BROADCAST_OPTION.name
          };
        } else {
          return {
            opCached: e.id,
            inputValue: n[t]
          };
        }
      });
      break;
    }
    if (t.status === o.STATUS_RUNNING) {
      if (n) {
        u(p, e, t, r, n);
      } else {
        const e = r._parentKey;
        const t = r._parentValues;
        if (e === "BROADCAST_INPUT") {
          t.BROADCAST_OPTION.id = null;
          t.BROADCAST_OPTION.name = a.toString(p);
        } else {
          t[e] = p;
        }
      }
    } else if (t.status === o.STATUS_DONE) {
      break;
    }
  }
  var E;
  if (n.profiler !== null) {
    if (f._profiler !== n.profiler) {
      (function (e, t) {
        t._profiler = e;
        if (l === -1) {
          l = e.idByName("blockFunction");
        }
        const n = t._ops;
        for (let t = 0; t < n.length; t++) {
          n[t]._profilerFrame = e.frame(l, n[t].opcode);
        }
      })(n.profiler, f);
    }
    const e = Math.min(b + 1, g);
    for (let t = y; t < e; t++) {
      m[t]._profilerFrame.count += 1;
    }
  }
};