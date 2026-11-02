const {
  EventEmitter: r
} = require("./19.js");
const i = require("./93.js");
const s = "ended";
class o extends r {
  constructor(e, t) {
    let {
      id: n,
      buffer: r
    } = t;
    super();
    this.id = n;
    this.audioEngine = e;
    this.buffer = r;
    this.outputNode = null;
    this.volumeEffect = null;
    this.target = null;
    this.initialized = false;
    this.isPlaying = false;
    this.startingUntil = 0;
    this.playbackRate = 1;
    this.handleEvent = this.handleEvent.bind(this);
  }
  get isStarting() {
    return this.isPlaying && this.startingUntil > this.audioEngine.currentTime;
  }
  handleEvent(e) {
    if (e.type === s) {
      this.onEnded();
    }
  }
  onEnded() {
    this.emit("stop");
    this.isPlaying = false;
  }
  _createSource() {
    if (this.outputNode !== null) {
      this.outputNode.removeEventListener(s, this.handleEvent);
      this.outputNode.disconnect();
    }
    this.outputNode = this.audioEngine.audioContext.createBufferSource();
    this.outputNode.playbackRate.value = this.playbackRate;
    this.outputNode.buffer = this.buffer;
    this.outputNode.addEventListener(s, this.handleEvent);
    if (this.target !== null) {
      this.connect(this.target);
    }
  }
  initialize() {
    this.initialized = true;
    this._createSource();
  }
  connect(e) {
    if (e === this.volumeEffect) {
      this.outputNode.disconnect();
      this.outputNode.connect(this.volumeEffect.getInputNode());
      return;
    } else {
      this.target = e;
      if (this.initialized) {
        if (this.volumeEffect === null) {
          this.outputNode.disconnect();
          this.outputNode.connect(e.getInputNode());
        } else {
          this.volumeEffect.connect(e);
        }
        return this;
      } else {
        return undefined;
      }
    }
  }
  dispose() {
    if (this.initialized) {
      this.stopImmediately();
      if (this.volumeEffect !== null) {
        this.volumeEffect.dispose();
        this.volumeEffect = null;
      }
      this.outputNode.disconnect();
      this.outputNode = null;
      this.target = null;
      this.initialized = false;
    }
  }
  take() {
    if (this.outputNode) {
      this.outputNode.removeEventListener(s, this.handleEvent);
    }
    const e = new o(this.audioEngine, this);
    e.playbackRate = this.playbackRate;
    if (this.isPlaying) {
      e.startingUntil = this.startingUntil;
      e.isPlaying = this.isPlaying;
      e.initialized = this.initialized;
      e.outputNode = this.outputNode;
      e.outputNode.addEventListener(s, e.handleEvent);
      e.volumeEffect = this.volumeEffect;
      if (e.volumeEffect) {
        e.volumeEffect.audioPlayer = e;
      }
      if (this.target !== null) {
        e.connect(this.target);
      }
      this.emit("stop");
      e.emit("play");
    }
    this.outputNode = null;
    this.volumeEffect = null;
    this.initialized = false;
    this.startingUntil = 0;
    this.isPlaying = false;
    return e;
  }
  play() {
    if (this.isStarting) {
      this.emit("stop");
      this.emit("play");
      return;
    }
    if (this.isPlaying) {
      this.stop();
    }
    if (this.initialized) {
      this._createSource();
    } else {
      this.initialize();
    }
    this.outputNode.start();
    this.isPlaying = true;
    const {
      currentTime: e,
      DECAY_DURATION: t
    } = this.audioEngine;
    this.startingUntil = e + t;
    this.emit("play");
  }
  stop() {
    if (!this.isPlaying) {
      return;
    }
    const e = this.take();
    e.volumeEffect = new i(e.audioEngine, e, null);
    e.volumeEffect.connect(e.target);
    e.finished().then(() => e.dispose());
    e.volumeEffect.set(0);
    const {
      currentTime: t,
      DECAY_DURATION: n
    } = this.audioEngine;
    e.outputNode.stop(t + n);
  }
  stopImmediately() {
    if (this.isPlaying) {
      this.outputNode.stop();
      this.isPlaying = false;
      this.startingUntil = 0;
      this.emit("stop");
    }
  }
  finished() {
    return new Promise(e => {
      this.once("stop", e);
    });
  }
  setPlaybackRate(e) {
    this.playbackRate = e;
    if (this.initialized) {
      this.outputNode.playbackRate.value = e;
    }
  }
}
module.exports = o;