const r = require("./289.js");
const i = require("./37.js");
const s = require("./291.js");
const o = require("./292.js");
const a = require("./294.js");
const c = require("./295.js");
const l = require("./296.js");
const u = require("./297.js");
const h = require("./298.js");
const d = require("./93.js");
const p = require("./299.js");
module.exports = class {
  constructor(e = (() => {
    const e = window.AudioContext || window.webkitAudioContext;
    if (!e) {
      throw new Error("Browser does not support AudioContext");
    }
    return new e();
  })()) {
    this.audioContext = e;
    this.inputNode = this.audioContext.createGain();
    this.inputNode.connect(this.audioContext.destination);
    this.audioBuffers = {};
    this.loudness = null;
    this.effects = [u, h, d];
    r(this.audioContext);
  }
  get currentTime() {
    return this.audioContext.currentTime;
  }
  get EFFECT_NAMES() {
    return {
      pitch: "pitch",
      pan: "pan"
    };
  }
  get DECAY_DURATION() {
    return 0.025;
  }
  get DECAY_WAIT() {
    return 0.05;
  }
  getInputNode() {
    return this.inputNode;
  }
  _decodeSound(e) {
    const t = e.data.buffer.slice(0);
    const n = s();
    var r;
    var a;
    return (r = this.audioContext, a = t, r.decodeAudioData.length === 1 ? r.decodeAudioData(a) : new Promise((e, t) => {
      r.decodeAudioData(a, t => e(t), e => t(e));
    })).catch(() => {
      if (e.data.length === 0) {
        return this._emptySound();
      }
      const t = e.data.buffer.slice(0);
      return new o(this.audioContext).decode(t).catch(() => this._emptySound());
    }).then(e => [n, e], e => {
      i.warn("audio data could not be decoded", e);
    });
  }
  _emptySound() {
    return this.audioContext.createBuffer(1, 1, this.audioContext.sampleRate);
  }
  decodeSound(e) {
    return this._decodeSound(e).then(e => {
      let [t, n] = e;
      this.audioBuffers[t] = n;
      return t;
    });
  }
  decodeSoundPlayer(e) {
    return this._decodeSound(e).then(e => {
      let [t, n] = e;
      return new c(this, {
        id: t,
        buffer: n
      });
    });
  }
  getLoudness() {
    this.loudness ||= new a(this.audioContext);
    return this.loudness.getLoudness();
  }
  createEffectChain() {
    const e = new l(this, this.effects);
    e.connect(this);
    return e;
  }
  createBank() {
    return new p(this, this.createEffectChain());
  }
};