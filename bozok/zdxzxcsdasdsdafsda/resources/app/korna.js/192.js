const r = require("./69.js");
module.exports = new class extends r {
  constructor() {
    super();
    this._stackFrame = {};
    this._startedBranch = null;
  }
  get stackFrame() {
    return this.thread?.compatibilityStackFrame;
  }
  startBranch(e, t) {
    this._startedBranch = [e, t];
  }
  startProcedure() {
    throw new Error("startProcedure is not supported by this BlockUtility");
  }
  initParams() {
    throw new Error("initParams is not supported by this BlockUtility");
  }
  pushParam() {
    throw new Error("pushParam is not supported by this BlockUtility");
  }
  getParam() {
    throw new Error("getParam is not supported by this BlockUtility");
  }
  init(e, t, n) {
    this.thread = e;
    this.sequencer = e.target.runtime.sequencer;
    this._startedBranch = null;
    e.stack[0] = t;
    e.compatibilityStackFrame = n;
  }
}();