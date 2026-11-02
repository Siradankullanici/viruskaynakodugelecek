var t = require("./8.js");
class n {
  constructor(e = n.nowObj) {
    this.startTime = 0;
    this.nowObj = e;
  }
  static get USE_PERFORMANCE() {
    return false;
  }
  static get legacyDateCode() {
    return {
      now: function () {
        return new Date().getTime();
      }
    };
  }
  static get nowObj() {
    if (n.USE_PERFORMANCE && typeof self != "undefined" && self.performance && "now" in self.performance) {
      return self.performance;
    } else if (Date.now) {
      return Date;
    } else {
      return n.legacyDateCode;
    }
  }
  time() {
    return this.nowObj.now();
  }
  start() {
    this.startTime = this.nowObj.now();
  }
  timeElapsed() {
    return this.nowObj.now() - this.startTime;
  }
  setTimeout(e, n) {
    return t.setTimeout(e, n);
  }
  clearTimeout(e) {
    t.clearTimeout(e);
  }
}
module.exports = n;