class n {
  constructor(e, t) {
    this.audioEngine = e;
    this.inputNode = this.audioEngine.audioContext.createGain();
    this.effects = t;
    let n = null;
    this._effects = t.reverse().map(t => {
      const r = new t(e, this, n);
      this[r.name] = r;
      n = r;
      return r;
    }).reverse();
    this.firstEffect = this._effects[0];
    this.lastEffect = this._effects[this._effects.length - 1];
    this._soundPlayers = new Set();
  }
  clone() {
    const e = new n(this.audioEngine, this.effects);
    if (this.target) {
      e.connect(this.target);
    }
    return e;
  }
  addSoundPlayer(e) {
    if (!this._soundPlayers.has(e)) {
      this._soundPlayers.add(e);
      this.update();
    }
  }
  removeSoundPlayer(e) {
    this._soundPlayers.delete(e);
  }
  getInputNode() {
    return this.inputNode;
  }
  connect(e) {
    const {
      firstEffect: t,
      lastEffect: n
    } = this;
    if (e === n) {
      this.inputNode.disconnect();
      this.inputNode.connect(n.getInputNode());
      return;
    }
    if (e !== t) {
      this.target = e;
      t.connect(e);
    }
  }
  getSoundPlayers() {
    return [...this._soundPlayers];
  }
  setEffectsFromTarget(e) {
    this._effects.forEach(t => {
      if ("soundEffects" in e && t.name in e.soundEffects) {
        t.set(e.soundEffects[t.name]);
      } else if (t.name in e) {
        t.set(e[t.name]);
      }
    });
  }
  set(e, t) {
    if (e in this) {
      this[e].set(t);
    }
  }
  update() {
    this._effects.forEach(e => e.update());
  }
  clear() {
    this._effects.forEach(e => e.clear());
  }
  dispose() {
    this._soundPlayers = null;
    this._effects.forEach(e => e.dispose());
    this._effects = null;
  }
}
module.exports = n;