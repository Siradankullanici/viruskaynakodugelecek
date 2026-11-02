const r = require("./4.js");
const i = require("./1.js");
const s = require("./12.js");
const o = true;
class a {
  constructor(e) {
    this.runtime = e;
    this.waitingSounds = {};
    this.stopAllSounds = this.stopAllSounds.bind(this);
    this._stopWaitingSoundsForTarget = this._stopWaitingSoundsForTarget.bind(this);
    this._clearEffectsForAllTargets = this._clearEffectsForAllTargets.bind(this);
    if (this.runtime) {
      this.runtime.on("PROJECT_STOP_ALL", this.stopAllSounds);
      this.runtime.on("PROJECT_STOP_ALL", this._clearEffectsForAllTargets);
      this.runtime.on("STOP_FOR_TARGET", this._stopWaitingSoundsForTarget);
      this.runtime.on("PROJECT_START", this._clearEffectsForAllTargets);
    }
    this._onTargetCreated = this._onTargetCreated.bind(this);
    if (this.runtime) {
      e.on("targetWasCreated", this._onTargetCreated);
    }
  }
  static get STATE_KEY() {
    return "Scratch.sound";
  }
  static get DEFAULT_SOUND_STATE() {
    return {
      effects: {
        pitch: 0,
        pan: 0
      }
    };
  }
  static get MIDI_NOTE_RANGE() {
    return {
      min: 36,
      max: 96
    };
  }
  static get BEAT_RANGE() {
    return {
      min: 0,
      max: 100
    };
  }
  static get TEMPO_RANGE() {
    return {
      min: 20,
      max: 500
    };
  }
  static get EFFECT_RANGE() {
    return {
      pitch: {
        min: -360,
        max: 360
      },
      pan: {
        min: -100,
        max: 100
      }
    };
  }
  static get LARGER_EFFECT_RANGE() {
    return {
      pitch: {
        min: -1000,
        max: 1000
      },
      pan: {
        min: -100,
        max: 100
      }
    };
  }
  _getSoundState(e) {
    let t = e.getCustomState(a.STATE_KEY);
    if (!t) {
      t = s.simple(a.DEFAULT_SOUND_STATE);
      e.setCustomState(a.STATE_KEY, t);
      e.soundEffects = t.effects;
    }
    return t;
  }
  _onTargetCreated(e, t) {
    if (t) {
      const n = t.getCustomState(a.STATE_KEY);
      if (n && e) {
        e.setCustomState(a.STATE_KEY, s.simple(n));
        this._syncEffectsForTarget(e);
      }
    }
  }
  getPrimitives() {
    return {
      sound_play: this.playSound,
      sound_playuntildone: this.playSoundAndWait,
      sound_stopallsounds: this.stopAllSounds,
      sound_seteffectto: this.setEffect,
      sound_changeeffectby: this.changeEffect,
      sound_cleareffects: this.clearEffects,
      sound_sounds_menu: this.soundsMenu,
      sound_beats_menu: this.beatsMenu,
      sound_effects_menu: this.effectsMenu,
      sound_setvolumeto: this.setVolume,
      sound_changevolumeby: this.changeVolume,
      sound_volume: this.getVolume
    };
  }
  getMonitored() {
    return {
      sound_volume: {
        isSpriteSpecific: true,
        getId: e => `${e}_volume`
      }
    };
  }
  playSound(e, t) {
    this._playSound(e, t);
  }
  playSoundAndWait(e, t) {
    return this._playSound(e, t, o);
  }
  _playSound(e, t, n) {
    const r = this._getSoundIndex(e.SOUND_MENU, t);
    if (r >= 0) {
      const {
        target: e
      } = t;
      const {
        sprite: i
      } = e;
      const {
        soundId: s
      } = i.sounds[r];
      if (i.soundBank) {
        if (n === o) {
          this._addWaitingSound(e.id, s);
        } else {
          this._removeWaitingSound(e.id, s);
        }
        return i.soundBank.playSound(e, s);
      }
    }
  }
  _addWaitingSound(e, t) {
    this.waitingSounds[e] ||= new Set();
    this.waitingSounds[e].add(t);
  }
  _removeWaitingSound(e, t) {
    if (this.waitingSounds[e]) {
      this.waitingSounds[e].delete(t);
    }
  }
  _getSoundIndex(e, t) {
    const n = t.target.sprite.sounds.length;
    if (n === 0) {
      return -1;
    }
    const i = this.getSoundIndexByName(e, t);
    if (i !== -1) {
      return i;
    }
    const s = parseInt(e, 10);
    if (isNaN(s)) {
      return -1;
    } else {
      return r.wrapClamp(s - 1, 0, n - 1);
    }
  }
  getSoundIndexByName(e, t) {
    const n = t.target.sprite.sounds;
    for (let t = 0; t < n.length; t++) {
      if (n[t].name === e) {
        return t;
      }
    }
    return -1;
  }
  stopAllSounds() {
    if (this.runtime.targets === null) {
      return;
    }
    const e = this.runtime.targets;
    for (let t = 0; t < e.length; t++) {
      this._stopAllSoundsForTarget(e[t]);
    }
  }
  _stopAllSoundsForTarget(e) {
    if (e.sprite.soundBank) {
      e.sprite.soundBank.stopAllSounds(e);
      if (this.waitingSounds[e.id]) {
        this.waitingSounds[e.id].clear();
      }
    }
  }
  _stopWaitingSoundsForTarget(e) {
    if (e.sprite.soundBank && this.waitingSounds[e.id]) {
      for (const t of this.waitingSounds[e.id].values()) {
        e.sprite.soundBank.stop(e, t);
      }
      this.waitingSounds[e.id].clear();
    }
  }
  setEffect(e, t) {
    return this._updateEffect(e, t, false);
  }
  changeEffect(e, t) {
    return this._updateEffect(e, t, true);
  }
  _updateEffect(e, t, n) {
    const s = i.toString(e.EFFECT).toLowerCase();
    const o = i.toNumber(e.VALUE);
    const c = this._getSoundState(t.target);
    if (!Object.prototype.hasOwnProperty.call(c.effects, s)) {
      return;
    }
    if (n) {
      c.effects[s] += o;
    } else {
      c.effects[s] = o;
    }
    const l = this.runtime.runtimeOptions.miscLimits;
    const {
      min: u,
      max: h
    } = l ? a.EFFECT_RANGE[s] : a.LARGER_EFFECT_RANGE[s];
    c.effects[s] = r.clamp(c.effects[s], u, h);
    this._syncEffectsForTarget(t.target);
    if (l) {
      return Promise.resolve();
    }
    this.runtime.requestRedraw();
  }
  _syncEffectsForTarget(e) {
    if (e && e.sprite.soundBank) {
      e.soundEffects = this._getSoundState(e).effects;
      e.sprite.soundBank.setEffects(e);
    }
  }
  clearEffects(e, t) {
    this._clearEffectsForTarget(t.target);
  }
  _clearEffectsForTarget(e) {
    const t = this._getSoundState(e);
    for (const e in t.effects) {
      if (Object.prototype.hasOwnProperty.call(t.effects, e)) {
        t.effects[e] = 0;
      }
    }
    this._syncEffectsForTarget(e);
  }
  _clearEffectsForAllTargets() {
    if (this.runtime.targets === null) {
      return;
    }
    const e = this.runtime.targets;
    for (let t = 0; t < e.length; t++) {
      this._clearEffectsForTarget(e[t]);
    }
  }
  setVolume(e, t) {
    const n = i.toNumber(e.VOLUME);
    return this._updateVolume(n, t);
  }
  changeVolume(e, t) {
    const n = i.toNumber(e.VOLUME) + t.target.volume;
    return this._updateVolume(n, t);
  }
  _updateVolume(e, t) {
    e = r.clamp(e, 0, 100);
    t.target.volume = e;
    this._syncEffectsForTarget(t.target);
    if (this.runtime.runtimeOptions.miscLimits) {
      return Promise.resolve();
    }
    this.runtime.requestRedraw();
  }
  getVolume(e, t) {
    return t.target.volume;
  }
  soundsMenu(e) {
    return e.SOUND_MENU;
  }
  beatsMenu(e) {
    return e.BEATS;
  }
  effectsMenu(e) {
    return e.EFFECT;
  }
}
module.exports = a;