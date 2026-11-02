const r = require("./14.js");
const i = require("./20.js");
const s = require("./33.js");
const o = require("./47.js");
const a = require("./32.js");
let c = -1;
let l = -1;
let u = -1;
class h {
  constructor(e) {
    this.timer = new r();
    this.runtime = e;
    this.activeThread = null;
  }
  static get WARP_TIME() {
    return 500;
  }
  stepThreads() {
    const e = this.runtime.currentStepTime * 0.75;
    this.runtime.updateCurrentMSecs();
    this.timer.start();
    let t = Infinity;
    let n = false;
    const r = [];
    while (this.runtime.threads.length > 0 && t > 0 && this.timer.timeElapsed() < e && (this.runtime.turboMode || !this.runtime.redrawRequested)) {
      if (this.runtime.profiler !== null) {
        if (l === -1) {
          l = this.runtime.profiler.idByName("Sequencer.stepThreads#inner");
        }
        this.runtime.profiler.start(l);
      }
      t = 0;
      let e = false;
      const s = this.runtime.threads;
      for (let r = 0; r < s.length; r++) {
        const o = this.activeThread = s[r];
        if (o.stack.length !== 0 && o.status !== i.STATUS_DONE) {
          if (o.status === i.STATUS_YIELD_TICK && !n) {
            o.status = i.STATUS_RUNNING;
          }
          if (o.status === i.STATUS_RUNNING || o.status === i.STATUS_YIELD) {
            if (this.runtime.profiler !== null) {
              if (c === -1) {
                c = this.runtime.profiler.idByName("Sequencer.stepThread");
              }
              this.runtime.profiler.increment(c);
            }
            this.stepThread(o);
            o.warpTimer = null;
          }
          if (o.status === i.STATUS_RUNNING) {
            t++;
          }
          if (o.stack.length === 0 || o.status === i.STATUS_DONE) {
            e = true;
          }
        } else {
          e = true;
        }
      }
      n = true;
      if (this.runtime.profiler !== null) {
        this.runtime.profiler.stop();
      }
      if (e) {
        let e = 0;
        for (let t = 0; t < this.runtime.threads.length; t++) {
          const n = this.runtime.threads[t];
          if (n.stack.length !== 0 && n.status !== i.STATUS_DONE) {
            this.runtime.threads[e] = n;
            e++;
          } else {
            this.runtime.threadMap.delete(n.getId());
            r.push(n);
          }
        }
        this.runtime.threads.length = e;
      }
    }
    this.activeThread = null;
    return r;
  }
  stepThread(e) {
    if (e.isCompiled) {
      o(e);
      if (this.runtime.sampler.enableBasic) {
        this.runtime.sampler.pc[0] = a.RUNTIME;
      }
      return;
    }
    let t = e.peekStack();
    if (t || (e.popStack(), e.stack.length !== 0)) {
      while (t = e.peekStack()) {
        const n = e.stack.length;
        let o = e.peekStackFrame().warpMode;
        if (o && !e.warpTimer) {
          e.warpTimer = new r();
          e.warpTimer.start();
        }
        if (this.runtime.profiler !== null) {
          if (u === -1) {
            u = this.runtime.profiler.idByName("execute");
          }
          this.runtime.profiler.increment(u);
        }
        if (e.target === null) {
          this.retireThread(e);
        } else {
          s(this, e);
        }
        e.blockGlowInFrame = t;
        if (e.status === i.STATUS_YIELD) {
          e.status = i.STATUS_RUNNING;
          if (o && e.warpTimer.timeElapsed() <= h.WARP_TIME) {
            continue;
          }
          return;
        }
        if (e.status === i.STATUS_PROMISE_WAIT) {
          return;
        }
        if (e.status === i.STATUS_YIELD_TICK) {
          return;
        }
        if (e.status === i.STATUS_DONE) {
          return;
        }
        for (e.stack.length !== n || e.peekStack() !== t || e.peekStackFrame().waitingReporter || e.goToNextBlock(); !e.peekStack();) {
          e.popStack();
          if (e.stack.length === 0) {
            e.status = i.STATUS_DONE;
            return;
          }
          const t = e.peekStackFrame();
          o = t.warpMode;
          if (t.isLoop) {
            if (!o || e.warpTimer.timeElapsed() > h.WARP_TIME) {
              return;
            }
          } else if (!t.waitingReporter) {
            e.goToNextBlock();
          }
        }
      }
    } else {
      e.status = i.STATUS_DONE;
    }
  }
  stepToBranch(e, t, n) {
    t ||= 1;
    const r = e.peekStack();
    const i = e.target.blocks.getBranch(r, t);
    e.peekStackFrame().isLoop = n;
    if (i) {
      e.pushStack(i);
    } else {
      e.pushStack(null);
    }
  }
  stepToProcedure(e, t) {
    const n = e.target.blocks.getProcedureDefinition(t);
    if (!n) {
      return;
    }
    const r = e.isRecursiveCall(t);
    e.pushStack(n);
    if (e.peekStackFrame().warpMode && e.warpTimer.timeElapsed() > h.WARP_TIME) {
      e.status = i.STATUS_YIELD;
    } else {
      const t = e.target.blocks.getBlock(n);
      const s = e.target.blocks.getBlock(t.inputs.custom_block.block);
      let o = false;
      if (s && s.mutation) {
        const e = s.mutation.warp;
        if (typeof e == "boolean") {
          o = e;
        } else if (typeof e == "string") {
          o = JSON.parse(e);
        }
      }
      if (o) {
        e.peekStackFrame().warpMode = true;
      } else if (r) {
        e.status = i.STATUS_YIELD;
      }
    }
  }
  retireThread(e) {
    e.stack = [];
    e.stackFrame = [];
    e.requestScriptGlowInFrame = false;
    e.status = i.STATUS_DONE;
    if (e.isCompiled) {
      e.procedures = null;
      e.generator = null;
      e.compiledFunction = null;
    }
  }
}
module.exports = h;