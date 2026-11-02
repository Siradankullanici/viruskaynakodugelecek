module.exports = class {
  constructor(e, t, n) {
    this.audioEngine = e;
    this.audioPlayer = t;
    this.lastEffect = n;
    this.value = this.DEFAULT_VALUE;
    this.initialized = false;
    this.inputNode = null;
    this.outputNode = null;
    this.target = null;
  }
  get name() {
    throw new Error(`${this.constructor.name}.name is not implemented`);
  }
  get DEFAULT_VALUE() {
    return 0;
  }
  get _isPatch() {
    return this.initialized && (this.value !== this.DEFAULT_VALUE || this.audioPlayer === null);
  }
  getInputNode() {
    if (this._isPatch) {
      return this.inputNode;
    } else {
      return this.target.getInputNode();
    }
  }
  initialize() {
    throw new Error(`${this.constructor.name}.initialize is not implemented.`);
  }
  _set() {
    throw new Error(`${this.constructor.name}._set is not implemented.`);
  }
  set(e) {
    if (!this.initialized) {
      this.initialize();
    }
    const t = this._isPatch;
    if (t) {
      this._lastPatch = this.audioEngine.currentTime;
    }
    if (e !== this.value) {
      this._set(e);
    }
    if (this._isPatch !== t && this.target !== null) {
      this.connect(this.target);
    }
  }
  update() {}
  clear() {
    this.set(this.DEFAULT_VALUE);
  }
  connect(e) {
    if (e === null) {
      throw new Error("target may not be null");
    }
    const t = e => {
      if (e) {
        return e === this || t(e.target);
      }
    };
    if (t(e)) {
      throw new Error("Effect cannot connect to itself");
    }
    this.target = e;
    if (this.outputNode !== null) {
      this.outputNode.disconnect();
    }
    if (this._isPatch || this._lastPatch + this.audioEngine.DECAY_DURATION < this.audioEngine.currentTime) {
      this.outputNode.connect(e.getInputNode());
    }
    if (this.lastEffect === null) {
      if (this.audioPlayer !== null) {
        this.audioPlayer.connect(this);
      }
    } else {
      this.lastEffect.connect(this);
    }
  }
  dispose() {
    this.inputNode = null;
    this.outputNode = null;
    this.target = null;
    this.initialized = false;
  }
};