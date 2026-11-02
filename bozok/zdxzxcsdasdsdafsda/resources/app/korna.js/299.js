const r = require("./37.js");
module.exports = class {
  constructor(e, t) {
    this.audioEngine = e;
    this.soundPlayers = {};
    this.playerTargets = new Map();
    this.soundEffects = new Map();
    this.effectChainPrime = t;
  }
  addSoundPlayer(e) {
    this.soundPlayers[e.id] = e;
  }
  getSoundPlayer(e) {
    if (!this.soundPlayers[e]) {
      r.error(`SoundBank.getSoundPlayer(${e}): called missing sound in bank`);
    }
    return this.soundPlayers[e];
  }
  getSoundEffects(e) {
    if (!this.soundEffects.has(e)) {
      this.soundEffects.set(e, this.effectChainPrime.clone());
    }
    return this.soundEffects.get(e);
  }
  removeSoundPlayer(e) {
    const t = this.soundPlayers[e];
    if (t) {
      t.dispose();
      delete this.soundPlayers[e];
    }
    const n = this.soundEffects.get(e);
    if (n) {
      if (t) {
        n.removeSoundPlayer(t);
      }
      n.dispose();
      this.soundEffects.delete(e);
    }
    this.playerTargets.delete(e);
  }
  playSound(e, t) {
    const n = this.getSoundEffects(t);
    const r = this.getSoundPlayer(t);
    if (this.playerTargets.get(t) !== e) {
      r.stop();
    }
    this.playerTargets.set(t, e);
    n.addSoundPlayer(r);
    n.setEffectsFromTarget(e);
    r.connect(n);
    r.play();
    return r.finished();
  }
  setEffects(e) {
    this.playerTargets.forEach((t, n) => {
      if (t === e) {
        this.getSoundEffects(n).setEffectsFromTarget(e);
      }
    });
  }
  stop(e, t) {
    if (this.playerTargets.get(t) === e) {
      this.soundPlayers[t].stop();
    }
  }
  stopAllSounds(e = "*") {
    this.playerTargets.forEach((t, n) => {
      if (e === "*" || t === e) {
        this.getSoundPlayer(n).stop();
      }
    });
  }
  dispose() {
    this.playerTargets.clear();
    this.soundEffects.forEach(e => e.dispose());
    this.soundEffects.clear();
    for (const e in this.soundPlayers) {
      if (Object.prototype.hasOwnProperty.call(this.soundPlayers, e)) {
        this.soundPlayers[e].dispose();
      }
    }
    this.soundPlayers = {};
  }
};