const r = require("./1.js");
module.exports = class {
  constructor(e) {
    this.runtime = e;
    this._counter = 0;
    this.runtime.on("RUNTIME_DISPOSED", this.clearCounter.bind(this));
  }
  getPrimitives() {
    return {
      control_repeat: this.repeat,
      control_repeat_until: this.repeatUntil,
      control_while: this.repeatWhile,
      control_for_each: this.forEach,
      control_forever: this.forever,
      control_wait: this.wait,
      control_wait_until: this.waitUntil,
      control_if: this.if,
      control_if_else: this.ifElse,
      control_stop: this.stop,
      control_create_clone_of: this.createClone,
      control_delete_this_clone: this.deleteClone,
      control_get_counter: this.getCounter,
      control_incr_counter: this.incrCounter,
      control_clear_counter: this.clearCounter,
      control_all_at_once: this.allAtOnce
    };
  }
  getHats() {
    return {
      control_start_as_clone: {
        restartExistingThreads: false
      }
    };
  }
  repeat(e, t) {
    const n = Math.round(r.toNumber(e.TIMES));
    if (t.stackFrame.loopCounter === undefined) {
      t.stackFrame.loopCounter = n;
    }
    t.stackFrame.loopCounter--;
    if (t.stackFrame.loopCounter >= 0) {
      t.startBranch(1, true);
    }
  }
  repeatUntil(e, t) {
    if (!r.toBoolean(e.CONDITION)) {
      t.startBranch(1, true);
    }
  }
  repeatWhile(e, t) {
    if (r.toBoolean(e.CONDITION)) {
      t.startBranch(1, true);
    }
  }
  forEach(e, t) {
    const n = t.target.lookupOrCreateVariable(e.VARIABLE.id, e.VARIABLE.name);
    if (t.stackFrame.index === undefined) {
      t.stackFrame.index = 0;
    }
    if (t.stackFrame.index < Number(e.VALUE)) {
      t.stackFrame.index++;
      n.value = t.stackFrame.index;
      t.startBranch(1, true);
    }
  }
  waitUntil(e, t) {
    if (!r.toBoolean(e.CONDITION)) {
      t.yield();
    }
  }
  forever(e, t) {
    t.startBranch(1, true);
  }
  wait(e, t) {
    if (t.stackTimerNeedsInit()) {
      const n = Math.max(0, r.toNumber(e.DURATION) * 1000);
      t.startStackTimer(n);
      this.runtime.requestRedraw();
      t.yield();
    } else if (!t.stackTimerFinished()) {
      t.yield();
    }
  }
  if(e, t) {
    if (r.toBoolean(e.CONDITION)) {
      t.startBranch(1, false);
    }
  }
  ifElse(e, t) {
    if (r.toBoolean(e.CONDITION)) {
      t.startBranch(1, false);
    } else {
      t.startBranch(2, false);
    }
  }
  stop(e, t) {
    const n = e.STOP_OPTION;
    if (n === "all") {
      t.stopAll();
    } else if (n === "other scripts in sprite" || n === "other scripts in stage") {
      t.stopOtherTargetThreads();
    } else if (n === "this script") {
      t.stopThisScript();
    }
  }
  createClone(e, t) {
    this._createClone(r.toString(e.CLONE_OPTION), t.target);
  }
  _createClone(e, t) {
    let n;
    n = e === "_myself_" ? t : this.runtime.getSpriteTargetByName(e);
    if (!n) {
      return;
    }
    const r = n.makeClone();
    if (r) {
      this.runtime.addTarget(r);
      r.goBehindOther(n);
    }
  }
  deleteClone(e, t) {
    if (!t.target.isOriginal) {
      this.runtime.disposeTarget(t.target);
      this.runtime.stopForTarget(t.target);
    }
  }
  getCounter() {
    return this._counter;
  }
  clearCounter() {
    this._counter = 0;
  }
  incrCounter() {
    this._counter++;
  }
  allAtOnce(e, t) {
    t.startBranch(1, false);
  }
};