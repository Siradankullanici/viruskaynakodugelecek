module.exports = class {
  constructor(e) {
    this._type = e;
    this._onOpen = null;
    this._onClose = null;
    this._onError = null;
    this._handleMessage = null;
    this._ws = null;
  }
  open() {
    if (!this._onOpen || !this._onClose || !this._onError || !this._handleMessage) {
      throw new Error("Must set open, close, message and error handlers before calling open on the socket");
    }
    let e;
    switch (this._type) {
      case "BLE":
        e = "scratch/ble";
        break;
      case "BT":
        e = "scratch/bt";
        break;
      default:
        throw new Error(`Unknown ScratchLink socket Type: ${this._type}`);
    }
    const t = (e, t) => {
      t.onopen = t.onerror = null;
      t.close();
      this._ws = e;
      this._ws.onopen = this._onOpen;
      this._ws.onclose = this._onClose;
      this._ws.onerror = this._onError;
      this._ws.onmessage = this._onMessage.bind(this);
    };
    const n = new WebSocket(`ws://127.0.0.1:20111/${e}`);
    const r = new WebSocket(`wss://device-manager.scratch.mit.edu:20110/${e}`);
    const i = setTimeout(() => {
      t(n, r);
      this._ws.onerror(new Event("timeout"));
    }, 15000);
    let s;
    let o;
    n.onopen = e => {
      clearTimeout(i);
      t(n, r);
      this._ws.onopen(e);
    };
    r.onopen = e => {
      clearTimeout(i);
      t(r, n);
      this._ws.onopen(e);
    };
    const a = () => {
      if (s && o) {
        clearTimeout(i);
        t(n, r);
        this._ws.onerror(s);
      }
    };
    n.onerror = e => {
      s = e;
      a();
    };
    r.onerror = e => {
      o = e;
      a();
    };
  }
  close() {
    this._ws.close();
    this._ws = null;
  }
  sendMessage(e) {
    const t = JSON.stringify(e);
    this._ws.send(t);
  }
  setOnOpen(e) {
    this._onOpen = e;
  }
  setOnClose(e) {
    this._onClose = e;
  }
  setOnError(e) {
    this._onError = e;
  }
  setHandleMessage(e) {
    this._handleMessage = e;
  }
  isOpen() {
    return this._ws && this._ws.readyState === this._ws.OPEN;
  }
  _onMessage(e) {
    const t = JSON.parse(e.data);
    this._handleMessage(t);
  }
};