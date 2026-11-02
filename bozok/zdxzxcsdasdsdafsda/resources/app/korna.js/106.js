const r = require("./0.js");
module.exports = class {
  constructor() {
    this.callbacks = [];
    this.nextResponseId = 0;
  }
  call(e, t) {
    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) {
      r[i - 2] = arguments[i];
    }
    return this.transferCall(e, t, null, ...r);
  }
  transferCall(e, t, n) {
    try {
      const {
        provider: o,
        isRemote: a
      } = this._getServiceProvider(e);
      if (o) {
        for (var r = arguments.length, i = new Array(r > 3 ? r - 3 : 0), s = 3; s < r; s++) {
          i[s - 3] = arguments[s];
        }
        if (a) {
          return this._remoteTransferCall(o, e, t, n, ...i);
        }
        const c = o[t].apply(o, i);
        return Promise.resolve(c);
      }
      return Promise.reject(new Error(`Service not found: ${e}`));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  _isRemoteService(e) {
    return this._getServiceProvider(e).isRemote;
  }
  _remoteCall(e, t, n) {
    for (var r = arguments.length, i = new Array(r > 3 ? r - 3 : 0), s = 3; s < r; s++) {
      i[s - 3] = arguments[s];
    }
    return this._remoteTransferCall(e, t, n, null, ...i);
  }
  _remoteTransferCall(e, t, n, r) {
    for (var i = arguments.length, s = new Array(i > 4 ? i - 4 : 0), o = 4; o < i; o++) {
      s[o - 4] = arguments[o];
    }
    return new Promise((i, o) => {
      const a = this._storeCallbacks(i, o);
      if (s.length > 0 && typeof s[s.length - 1].func == "function") {
        s.pop();
        s.pop();
      }
      if (r) {
        e.postMessage({
          service: t,
          method: n,
          responseId: a,
          args: s
        }, r);
      } else {
        e.postMessage({
          service: t,
          method: n,
          responseId: a,
          args: s
        });
      }
    });
  }
  _storeCallbacks(e, t) {
    const n = this.nextResponseId++;
    this.callbacks[n] = [e, t];
    return n;
  }
  _deliverResponse(e, t) {
    try {
      const [n, r] = this.callbacks[e];
      delete this.callbacks[e];
      if (t.error) {
        r(t.error);
      } else {
        n(t.result);
      }
    } catch (e) {
      r.error(`Dispatch callback failed: ${e}`);
    }
  }
  _onMessage(e, t) {
    const n = t.data;
    let i;
    n.args = n.args || [];
    if (n.service) {
      i = n.service === "dispatch" ? this._onDispatchMessage(e, n) : this.call(n.service, n.method, ...n.args);
    } else if (n.responseId === undefined) {
      r.error(`Dispatch caught malformed message from a worker: ${JSON.stringify(t)}`);
    } else {
      this._deliverResponse(n.responseId, n);
    }
    if (i) {
      if (n.responseId === undefined) {
        r.error(`Dispatch message missing required response ID: ${JSON.stringify(t)}`);
      } else {
        i.then(t => e.postMessage({
          responseId: n.responseId,
          result: t
        }), t => e.postMessage({
          responseId: n.responseId,
          error: `${t}`
        }));
      }
    }
  }
  _getServiceProvider(e) {
    throw new Error(`Could not get provider for ${e}: _getServiceProvider not implemented`);
  }
  _onDispatchMessage(e, t) {
    throw new Error(`Unimplemented dispatch message handler cannot handle ${t.method} method`);
  }
};