const r = require("./53.js");
module.exports = class extends r {
  constructor(e, t, n) {
    super(e, t, n);
    this.leftGain = null;
    this.rightGain = null;
    this.channelMerger = null;
  }
  get name() {
    return "pan";
  }
  initialize() {
    const e = this.audioEngine.audioContext;
    this.inputNode = e.createGain();
    this.leftGain = e.createGain();
    this.rightGain = e.createGain();
    this.channelMerger = e.createChannelMerger(2);
    this.outputNode = this.channelMerger;
    this.inputNode.connect(this.leftGain);
    this.inputNode.connect(this.rightGain);
    this.leftGain.connect(this.channelMerger, 0, 0);
    this.rightGain.connect(this.channelMerger, 0, 1);
    this.initialized = true;
  }
  _set(e) {
    this.value = e;
    const t = (e + 100) / 200;
    const n = Math.cos(t * Math.PI / 2);
    const r = Math.sin(t * Math.PI / 2);
    const {
      currentTime: i,
      DECAY_WAIT: s,
      DECAY_DURATION: o
    } = this.audioEngine;
    this.leftGain.gain.setTargetAtTime(n, i + s, o);
    this.rightGain.gain.setTargetAtTime(r, i + s, o);
  }
  dispose() {
    if (this.initialized) {
      this.inputNode.disconnect();
      this.leftGain.disconnect();
      this.rightGain.disconnect();
      this.channelMerger.disconnect();
      this.inputNode = null;
      this.leftGain = null;
      this.rightGain = null;
      this.channelMerger = null;
      this.outputNode = null;
      this.target = null;
      this.initialized = false;
    }
  }
};