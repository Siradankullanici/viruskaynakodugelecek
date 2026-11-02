const r = require("./16.js");
module.exports = class {
  constructor(e, t) {
    let {
      service: n,
      commandChar: r,
      responseChar: i
    } = t;
    this.socket = e;
    this._service = n;
    this._commandChar = r;
    this._responseChar = i;
    this._onResponse = this._onResponse.bind(this);
    this._deviceOnResponse = null;
  }
  get godirectAdapter() {
    return true;
  }
  writeCommand(e) {
    const t = r.uint8ArrayToBase64(e);
    return this.socket.write(this._service, this._commandChar, t, "base64");
  }
  setup(e) {
    let {
      onResponse: t
    } = e;
    this._deviceOnResponse = t;
    return this.socket.startNotifications(this._service, this._responseChar, this._onResponse);
  }
  _onResponse(e) {
    const t = r.base64ToUint8Array(e);
    const n = new DataView(t.buffer);
    return this._deviceOnResponse(n);
  }
};