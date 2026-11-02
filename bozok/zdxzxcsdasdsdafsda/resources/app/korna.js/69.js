const r = require("./20.js");
const i = require("./14.js");
module.exports = class {
  constructor(e = null, t = null) {
    this.sequencer = e;
    this.thread = t;
    this._nowObj = {
      now: () => this.sequencer.runtime.currentMSecs
    };
  }
  get target() {
    return this.thread.target;
  }
  get runtime() {
    return this.sequencer.runtime;
  }
  get nowObj() {
    if (this.runtime) {
      return this._nowObj;
    } else {
      return null;
    }
  }
  get stackFrame() {
    const e = this.thread.peekStackFrame();
    if (e.executionContext === null) {
      e.executionContext = {};
    }
    return e.executionContext;
  }
  stackTimerFinished() {
    return !(this.stackFrame.timer.timeElapsed() < this.stackFrame.duration);
  }
  stackTimerNeedsInit() {
    return !this.stackFrame.timer;
  }
  startStackTimer(e) {
    if (this.nowObj) {
      this.stackFrame.timer = new i(this.nowObj);
    } else {
      this.stackFrame.timer = new i();
    }
    this.stackFrame.timer.start();
    this.stackFrame.duration = e;
  }
  yield() {
    this.thread.status = r.STATUS_YIELD;
  }
  yieldTick() {
    this.thread.status = r.STATUS_YIELD_TICK;
  }
  startBranch(e, t) {
    this.sequencer.stepToBranch(this.thread, e, t);
  }
  stopAll() {
    this.sequencer.runtime.stopAll();
  }
  stopOtherTargetThreads() {
    this.sequencer.runtime.stopForTarget(this.thread.target, this.thread);
  }
  stopThisScript() {
    this.thread.stopThisScript();
  }
  startProcedure(e) {
    this.sequencer.stepToProcedure(this.thread, e);
  }
  getProcedureParamNamesAndIds(e) {
    return this.thread.target.blocks.getProcedureParamNamesAndIds(e);
  }
  getProcedureParamNamesIdsAndDefaults(e) {
    return this.thread.target.blocks.getProcedureParamNamesIdsAndDefaults(e);
  }
  initParams() {
    this.thread.initParams();
  }
  pushParam(e, t) {
    this.thread.pushParam(e, t);
  }
  getParam(e) {
    return this.thread.getParam(e);
  }
  startHats(e, t, n) {
    const r = this.thread;
    const i = this.sequencer;
    const s = this.sequencer.runtime.startHats(e, t, n);
    this.thread = r;
    this.sequencer = i;
    return s;
  }
  ioQuery(e, t, n) {
    if (this.sequencer.runtime.ioDevices[e] && this.sequencer.runtime.ioDevices[e][t]) {
      const r = this.sequencer.runtime.ioDevices[e];
      return r[t].apply(r, n);
    }
  }
};