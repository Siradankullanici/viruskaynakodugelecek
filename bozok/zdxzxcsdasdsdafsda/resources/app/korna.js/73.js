module.exports = class {
  constructor(e, t) {
    this.callback = e;
    this.maxConcurrent = t;
    this._current = 0;
    this._queue = [];
  }
  do() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return new Promise((e, n) => {
      this._queue.push([e, n, t]);
      this._startNext();
    });
  }
  _startNext() {
    if (this._current >= this.maxConcurrent || this._queue.length === 0) {
      return;
    }
    this._current++;
    const [e, t, n] = this._queue.shift();
    this.callback.apply(null, n).then(t => {
      e(t);
      this._current--;
      this._startNext();
    }).catch(e => {
      t(e);
      this._current--;
      this._startNext();
    });
  }
};