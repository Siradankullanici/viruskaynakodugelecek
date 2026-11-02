const r = require("./14.js");
module.exports = class {
  constructor(e) {
    this._maxTokens = e;
    this._refillInterval = 1000 / e;
    this._count = this._maxTokens;
    this._timer = new r();
    this._timer.start();
    this._lastUpdateTime = this._timer.timeElapsed();
  }
  okayToSend() {
    const e = this._timer.timeElapsed();
    const t = e - this._lastUpdateTime;
    const n = Math.floor(t / this._refillInterval);
    if (n > 0) {
      this._lastUpdateTime = e;
    }
    this._count = Math.min(this._maxTokens, this._count + n);
    return this._count > 0 && (this._count--, true);
  }
};