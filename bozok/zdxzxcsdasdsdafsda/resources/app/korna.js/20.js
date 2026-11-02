const r = require("./0.js");
const i = [];
class s {
  constructor(e) {
    this.isLoop = false;
    this.warpMode = e;
    this.justReported = null;
    this.reporting = "";
    this.reported = null;
    this.waitingReporter = null;
    this.params = null;
    this.executionContext = null;
    this.op = null;
  }
  reset() {
    this.isLoop = false;
    this.warpMode = false;
    this.justReported = null;
    this.reported = null;
    this.waitingReporter = null;
    this.params = null;
    this.executionContext = null;
    this.op = null;
    return this;
  }
  reuse(e = this.warpMode) {
    this.reset();
    this.warpMode = Boolean(e);
    return this;
  }
  static create(e) {
    const t = i.pop();
    if (t !== undefined) {
      t.warpMode = Boolean(e);
      return t;
    } else {
      return new s(e);
    }
  }
  static release(e) {
    if (e !== undefined) {
      i.push(e.reset());
    }
  }
}
class o {
  constructor(e) {
    this.topBlock = e;
    this.stack = [];
    this.stackFrames = [];
    this.status = 0;
    this.isKilled = false;
    this.target = null;
    this.blockContainer = null;
    this.requestScriptGlowInFrame = false;
    this.blockGlowInFrame = null;
    this.warpTimer = null;
    this.justReported = null;
    this.triedToCompile = false;
    this.isCompiled = false;
    this.timer = null;
    this.generator = null;
    this.compiledFunction = null;
    this.procedures = null;
    this.executableHat = false;
    this.compatibilityStackFrame = null;
  }
  static get STATUS_RUNNING() {
    return 0;
  }
  static get STATUS_PROMISE_WAIT() {
    return 1;
  }
  static get STATUS_YIELD() {
    return 2;
  }
  static get STATUS_YIELD_TICK() {
    return 3;
  }
  static get STATUS_DONE() {
    return 4;
  }
  static getIdFromTargetAndBlock(e, t) {
    return `${e.id}&${t}`;
  }
  getId() {
    return o.getIdFromTargetAndBlock(this.target, this.topBlock);
  }
  pushStack(e) {
    this.stack.push(e);
    if (this.stack.length > this.stackFrames.length) {
      const e = this.stackFrames[this.stackFrames.length - 1];
      this.stackFrames.push(s.create(e !== undefined && e.warpMode));
    }
  }
  reuseStackForNextBlock(e) {
    this.stack[this.stack.length - 1] = e;
    this.stackFrames[this.stackFrames.length - 1].reuse();
  }
  popStack() {
    s.release(this.stackFrames.pop());
    return this.stack.pop();
  }
  stopThisScript() {
    let e = this.peekStack();
    while (e !== null) {
      const t = this.target.blocks.getBlock(e);
      if (this.peekStackFrame().waitingReporter) {
        break;
      }
      if (t !== undefined && t.opcode === "procedures_call") {
        this.goToNextBlock();
        break;
      }
      this.popStack();
      e = this.peekStack();
    }
    if (this.stack.length === 0) {
      this.requestScriptGlowInFrame = false;
      this.status = o.STATUS_DONE;
    }
  }
  peekStack() {
    if (this.stack.length > 0) {
      return this.stack[this.stack.length - 1];
    } else {
      return null;
    }
  }
  peekStackFrame() {
    if (this.stackFrames.length > 0) {
      return this.stackFrames[this.stackFrames.length - 1];
    } else {
      return null;
    }
  }
  peekParentStackFrame() {
    if (this.stackFrames.length > 1) {
      return this.stackFrames[this.stackFrames.length - 2];
    } else {
      return null;
    }
  }
  pushReportedValue(e) {
    this.justReported = e === undefined ? null : e;
  }
  initParams() {
    const e = this.peekStackFrame();
    if (e.params === null) {
      e.params = {};
    }
  }
  pushParam(e, t) {
    this.peekStackFrame().params[e] = t;
  }
  getParam(e) {
    for (let t = this.stackFrames.length - 1; t >= 0; t--) {
      const n = this.stackFrames[t];
      if (n.params !== null) {
        if (Object.prototype.hasOwnProperty.call(n.params, e)) {
          return n.params[e];
        } else {
          return null;
        }
      }
    }
    return null;
  }
  getAllparams() {
    return this.peekStackFrame().params;
  }
  atStackTop() {
    return this.peekStack() === this.topBlock;
  }
  goToNextBlock() {
    const e = this.target.blocks.getNextBlock(this.peekStack());
    this.reuseStackForNextBlock(e);
  }
  isRecursiveCall(e) {
    let t = 5;
    for (let n = this.stackFrames.length - 1 - 1; n >= 0; n--) {
      const r = this.target.blocks.getBlock(this.stackFrames[n].op.id) || this.target.runtime.flyoutBlocks.getBlock(this.stackFrames[n].op.id);
      if (r.opcode === "procedures_call" && r.mutation.proccode === e) {
        return true;
      }
      if (--t < 0) {
        return false;
      }
    }
    return false;
  }
  tryCompile() {
    if (!this.blockContainer) {
      return;
    }
    const e = require("./188.js");
    this.triedToCompile = true;
    const t = !this.stackClick;
    const i = this.topBlock;
    const s = this.blockContainer.getBlock(i) ? this.blockContainer : this.target.runtime.flyoutBlocks;
    const o = t && s.getCachedCompileResult(i);
    if (o && !o.success) {
      return;
    }
    let a;
    if (o) {
      a = o.value;
    } else {
      try {
        a = e(this);
        if (t) {
          s.cacheCompileResult(i, a);
        }
      } catch (e) {
        r.error("cannot compile script", this.target.getName(), e);
        if (t) {
          s.cacheCompileError(i, e);
        }
        this.target.runtime.emitCompileError(this.target, e);
        return;
      }
    }
    this.procedures = {};
    for (const e of Object.keys(a.procedures)) {
      this.procedures[e] = a.procedures[e](this);
    }
    const c = a.startingFunction(this);
    if (a.yields) {
      this.generator = c();
      this.compiledFunction = null;
    } else {
      this.generator = null;
      this.compiledFunction = c;
    }
    this.executableHat = a.executableHat;
    if (!this.blockContainer.forceNoGlow) {
      this.blockGlowInFrame = this.topBlock;
      this.requestScriptGlowInFrame = true;
    }
    this.isCompiled = true;
  }
}
o._StackFrame = s;
module.exports = o;