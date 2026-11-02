module.exports = class {
  constructor() {
    this._requestID = 0;
    this._openRequests = {};
  }
  sendRemoteRequest(e, t) {
    const n = this._requestID++;
    const r = new Promise((e, t) => {
      this._openRequests[n] = {
        resolve: e,
        reject: t
      };
    });
    this._sendRequest(e, t, n);
    return r;
  }
  sendRemoteNotification(e, t) {
    this._sendRequest(e, t);
  }
  didReceiveCall() {
    throw new Error("Must override didReceiveCall");
  }
  _sendMessage() {
    throw new Error("Must override _sendMessage");
  }
  _sendRequest(e, t, n) {
    const r = {
      jsonrpc: "2.0",
      method: e,
      params: t
    };
    if (n !== null) {
      r.id = n;
    }
    this._sendMessage(r);
  }
  _handleMessage(e) {
    if (e.jsonrpc !== "2.0") {
      throw new Error(`Bad or missing JSON-RPC version in message: ${e}`);
    }
    if (Object.prototype.hasOwnProperty.call(e, "method")) {
      this._handleRequest(e);
    } else {
      this._handleResponse(e);
    }
  }
  _sendResponse(e, t, n) {
    const r = {
      jsonrpc: "2.0",
      id: e
    };
    if (n) {
      r.error = n;
    } else {
      r.result = t || null;
    }
    this._sendMessage(r);
  }
  _handleResponse(e) {
    const {
      result: t,
      error: n,
      id: r
    } = e;
    const i = this._openRequests[r];
    delete this._openRequests[r];
    if (i) {
      if (n) {
        i.reject(n);
      } else {
        i.resolve(t);
      }
    }
  }
  _handleRequest(e) {
    const {
      method: t,
      params: n,
      id: r
    } = e;
    const i = this.didReceiveCall(t, n);
    if (r != null) {
      Promise.resolve(i).then(e => {
        this._sendResponse(r, e);
      }, e => {
        this._sendResponse(r, null, e);
      });
    }
  }
};