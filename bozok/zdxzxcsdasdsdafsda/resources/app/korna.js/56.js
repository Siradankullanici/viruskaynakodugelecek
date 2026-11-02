const r = require("./106.js");
const i = require("./0.js");
module.exports = new class extends r {
  constructor() {
    super();
    this.services = {};
    this.workerClass = typeof Worker == "undefined" ? null : Worker;
    this.workers = [];
  }
  callSync(e, t) {
    const {
      provider: n,
      isRemote: r
    } = this._getServiceProvider(e);
    if (n) {
      if (r) {
        throw new Error(`Cannot use 'callSync' on remote provider for service ${e}.`);
      }
      for (var i = arguments.length, s = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++) {
        s[o - 2] = arguments[o];
      }
      return n[t].apply(n, s);
    }
    throw new Error(`Provider not found for service: ${e}`);
  }
  setServiceSync(e, t) {
    if (Object.prototype.hasOwnProperty.call(this.services, e)) {
      i.warn(`Central dispatch replacing existing service provider for ${e}`);
    }
    this.services[e] = t;
  }
  setService(e, t) {
    try {
      this.setServiceSync(e, t);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
  addWorker(e) {
    if (this.workers.indexOf(e) === -1) {
      this.workers.push(e);
      e.onmessage = this._onMessage.bind(this, e);
      this._remoteCall(e, "dispatch", "handshake").catch(e => {
        i.error(`Could not handshake with worker: ${e}`);
      });
    } else {
      i.warn("Central dispatch ignoring attempt to add duplicate worker");
    }
  }
  _getServiceProvider(e) {
    const t = this.services[e];
    return t && {
      provider: t,
      isRemote: Boolean(this.workerClass && t instanceof this.workerClass || t.isRemote)
    };
  }
  _onDispatchMessage(e, t) {
    let n;
    if (t.method === "setService") {
      n = this.setService(t.args[0], e);
    } else {
      i.error(`Central dispatch received message for unknown method: ${t.method}`);
    }
    return n;
  }
}();