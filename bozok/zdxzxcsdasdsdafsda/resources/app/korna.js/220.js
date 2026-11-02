const r = require("./61.js");
module.exports = class extends r {
  constructor(e, t, n, r, i = null, s) {
    super();
    this._socket = e.getScratchLinkSocket("BT");
    this._socket.setOnOpen(this.requestPeripheral.bind(this));
    this._socket.setOnError(this._handleRequestError.bind(this));
    this._socket.setOnClose(this.handleDisconnectError.bind(this));
    this._socket.setHandleMessage(this._handleMessage.bind(this));
    this._sendMessage = this._socket.sendMessage.bind(this._socket);
    this._availablePeripherals = {};
    this._connectCallback = r;
    this._connected = false;
    this._characteristicDidChangeCallback = null;
    this._resetCallback = i;
    this._discoverTimeoutID = null;
    this._extensionId = t;
    this._peripheralOptions = n;
    this._messageCallback = s;
    this._runtime = e;
    this._socket.open();
  }
  requestPeripheral() {
    this._availablePeripherals = {};
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }
    this._discoverTimeoutID = window.setTimeout(this._handleDiscoverTimeout.bind(this), 15000);
    this.sendRemoteRequest("discover", this._peripheralOptions).catch(e => this._handleRequestError(e));
  }
  connectPeripheral(e, t = null) {
    const n = {
      peripheralId: e
    };
    if (t) {
      n.pin = t;
    }
    this.sendRemoteRequest("connect", n).then(() => {
      this._connected = true;
      this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
      this._connectCallback();
    }).catch(e => {
      this._handleRequestError(e);
    });
  }
  disconnect() {
    this._connected &&= false;
    if (this._socket.isOpen()) {
      this._socket.close();
    }
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED);
  }
  isConnected() {
    return this._connected;
  }
  sendMessage(e) {
    return this.sendRemoteRequest("send", e).catch(e => {
      this.handleDisconnectError(e);
    });
  }
  didReceiveCall(e, t) {
    switch (e) {
      case "didDiscoverPeripheral":
        this._availablePeripherals[t.peripheralId] = t;
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._availablePeripherals);
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case "userDidPickPeripheral":
        this._availablePeripherals[t.peripheralId] = t;
        this._runtime.emit(this._runtime.constructor.USER_PICKED_PERIPHERAL, this._availablePeripherals);
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case "userDidNotPickPeripheral":
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case "didReceiveMessage":
        this._messageCallback(t);
        break;
      default:
        return "nah";
    }
  }
  handleDisconnectError() {
    if (this._connected) {
      this.disconnect();
      if (this._resetCallback) {
        this._resetCallback();
      }
      this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTION_LOST_ERROR, {
        message: "Scratch lost connection to",
        extensionId: this._extensionId
      });
    }
  }
  _handleRequestError() {
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_REQUEST_ERROR, {
      message: "Scratch lost connection to",
      extensionId: this._extensionId
    });
  }
  _handleDiscoverTimeout() {
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
  }
};