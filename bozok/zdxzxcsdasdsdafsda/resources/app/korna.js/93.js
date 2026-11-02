const r = require("./53.js");
module.exports = class extends r {
  get DEFAULT_VALUE() {
    return 100;
  }
  get name() {
    return "volume";
  }
  initialize() {
    this.inputNode = this.audioEngine.audioContext.createGain();
    this.outputNode = this.inputNode;
    this.initialized = true;
  }
  _set(e) {
    this.value = e;
    const {
      gain: t
    } = this.outputNode;
    const {
      currentTime: n,
      DECAY_DURATION: r
    } = this.audioEngine;
    t.linearRampToValueAtTime(e / 100, n + r);
  }
  dispose() {
    if (this.initialized) {
      this.outputNode.disconnect();
      this.inputNode = null;
      this.outputNode = null;
      this.target = null;
      this.initialized = false;
    }
  }
};