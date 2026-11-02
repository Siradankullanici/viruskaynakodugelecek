module.exports = class {
  constructor(e) {
    this._ctx = e;
    this._cache = {};
  }
  beginMeasurementSession() {}
  endMeasurementSession() {}
  measureText(e) {
    this._cache[e] ||= this._ctx.measureText(e).width;
    return this._cache[e];
  }
  clearCache() {
    this._cache = {};
  }
};