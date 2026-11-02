const r = require("./53.js");
module.exports = class extends r {
  constructor(e, t, n) {
    super(e, t, n);
    this.ratio = 1;
  }
  get name() {
    return "pitch";
  }
  get _isPatch() {
    return false;
  }
  getInputNode() {
    return this.target.getInputNode();
  }
  initialize() {
    this.initialized = true;
  }
  _set(e) {
    this.value = e;
    this.ratio = this.getRatio(this.value);
    this.updatePlayers(this.audioPlayer.getSoundPlayers());
  }
  update() {
    this.updatePlayers(this.audioPlayer.getSoundPlayers());
  }
  getRatio(e) {
    const t = e / 10;
    return Math.pow(2, t / 12);
  }
  updatePlayer(e) {
    e.setPlaybackRate(this.ratio);
  }
  updatePlayers(e) {
    if (e) {
      for (const t in e) {
        if (Object.prototype.hasOwnProperty.call(e, t)) {
          this.updatePlayer(e[t]);
        }
      }
    }
  }
};