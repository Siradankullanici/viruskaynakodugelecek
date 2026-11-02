const r = require("./48.js");
const i = require("./17.js");
const {
  loadSoundFromAsset: s
} = require("./34.js");
const {
  loadCostumeFromAsset: o
} = require("./35.js");
const a = require("./81.js");
const c = require("./6.js");
const l = require("./13.js");
class u {
  constructor(e, t) {
    this.runtime = t;
    e ||= new i(t);
    this.blocks = e;
    this.name = "";
    this.costumes_ = [];
    this.sounds = [];
    this.clones = [];
    this.soundBank = null;
    if (this.runtime && this.runtime.audioEngine) {
      this.soundBank = this.runtime.audioEngine.createBank();
    }
  }
  set costumes(e) {
    this.costumes_ = [];
    for (const t of e) {
      this.addCostumeAt(t, this.costumes_.length);
    }
  }
  get costumes() {
    return this.costumes_;
  }
  addCostumeAt(e, t) {
    e.name ||= "";
    const n = this.costumes_.map(e => e.name);
    e.name = c.unusedName(e.name, n);
    this.costumes_.splice(t, 0, e);
  }
  deleteCostumeAt(e) {
    return this.costumes.splice(e, 1)[0];
  }
  deleteCostume(e) {
    const t = this.costumes_.length;
    if (t === 1 || e < 0 || e >= t) {
      return null;
    }
    const n = this.deleteCostumeAt(e);
    if (this.runtime.renderer && typeof n.skinId == "number") {
      this.runtime.renderer.destroySkin(n.skinId);
    }
    for (const t of this.clones) {
      if (t.currentCostume > e) {
        t.setCostume(t.currentCostume - 1);
      } else if (t.currentCostume === e) {
        t.setCostume(Math.min(e, this.costumes_.length - 1));
      }
    }
    return n;
  }
  deleteSoundAt(e) {
    return this.sounds.splice(e, 1)[0];
  }
  deleteSound(e) {
    if (e < 0 || e >= this.sounds.length) {
      return null;
    }
    const t = this.deleteSoundAt(e);
    if (this.soundBank && typeof t.soundId == "string" && typeof this.soundBank.removeSoundPlayer == "function") {
      this.soundBank.removeSoundPlayer(t.soundId);
    }
    return t;
  }
  createClone(e) {
    const t = new r(this, this.runtime);
    t.isOriginal = this.clones.length === 0;
    this.clones.push(t);
    t.initAudio();
    if (t.isOriginal) {
      const n = typeof e == "string" ? e : l.SPRITE_LAYER;
      t.initDrawable(n);
      this.runtime.fireTargetWasCreated(t);
    } else {
      this.runtime.fireTargetWasCreated(t, this.clones[0]);
    }
    return t;
  }
  removeClone(e) {
    this.runtime.fireTargetWasRemoved(e);
    const t = this.clones.indexOf(e);
    if (t >= 0) {
      this.clones.splice(t, 1);
    }
    if (this.clones.length === 0) {
      this.dispose();
    }
  }
  duplicate() {
    const e = new u(null, this.runtime);
    const t = this.blocks._blocks;
    const n = Object.keys(t).map(e => t[e]);
    const r = JSON.parse(JSON.stringify(n));
    a(r);
    r.forEach(t => {
      e.blocks.createBlock(t);
    });
    const i = this.runtime.targets.map(e => e.sprite.name);
    e.name = c.unusedName(this.name, i);
    const l = [];
    e.costumes = this.costumes_.map(e => {
      const t = Object.assign({}, e);
      l.push(o(t, this.runtime));
      return t;
    });
    e.sounds = this.sounds.map(t => {
      const n = Object.assign({}, t);
      const r = t.asset;
      l.push(s(n, r, this.runtime, e.soundBank));
      return n;
    });
    return Promise.all(l).then(() => e);
  }
  dispose() {
    if (this.runtime.renderer) {
      for (const e of this.costumes_) {
        if (typeof e.skinId == "number") {
          this.runtime.renderer.destroySkin(e.skinId);
        }
      }
    }
    this.costumes_ = [];
    this.sounds = [];
    if (this.soundBank) {
      this.soundBank.dispose();
      this.soundBank = null;
    }
  }
}
module.exports = u;