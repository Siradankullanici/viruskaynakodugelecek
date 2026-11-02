const r = require("./14.js");
module.exports = class {
  constructor(e) {
    this._projectTimer = new r({
      now: () => e.currentMSecs
    });
    this._projectTimer.start();
    this._pausedTime = null;
    this._paused = false;
    this.runtime = e;
  }
  projectTimer() {
    if (this._paused) {
      return this._pausedTime / 1000;
    } else {
      return this._projectTimer.timeElapsed() / 1000;
    }
  }
  pause() {
    this._paused = true;
    this._pausedTime = this._projectTimer.timeElapsed();
  }
  resume() {
    this._paused = false;
    const e = this._projectTimer.timeElapsed() - this._pausedTime;
    this._projectTimer.startTime += e;
  }
  resetProjectTimer() {
    this._projectTimer.start();
  }
};