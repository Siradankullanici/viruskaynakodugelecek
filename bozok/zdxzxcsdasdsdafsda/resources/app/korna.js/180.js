const r = require("./3.js");
const i = require("./2.js");
const s = require("./0.js");
const o = require("./1.js");
const a = require("./5.js");
const c = require("./30.js");
const l = require("./16.js");
const u = 129;
const h = 130;
const d = "micro:bit extension stopped receiving data";
const p = 61445;
const f = "5261da01-fa7e-42ab-850b-7c80220097cc";
const m = "5261da02-fa7e-42ab-850b-7c80220097cc";
class g {
  constructor(e, t) {
    this._runtime = e;
    this._ble = null;
    this._runtime.registerPeripheralExtension(t, this);
    this._extensionId = t;
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      buttonA: 0,
      buttonB: 0,
      touchPins: [0, 0, 0],
      gestureState: 0,
      ledMatrixState: new Uint8Array(5)
    };
    this._gestures = {
      moving: false,
      move: {
        active: false,
        timeout: false
      },
      shake: {
        active: false,
        timeout: false
      },
      jump: {
        active: false,
        timeout: false
      }
    };
    this._timeoutID = null;
    this._busy = false;
    this._busyTimeoutID = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
  }
  displayText(e) {
    const t = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) {
      t[n] = e.charCodeAt(n);
    }
    return this.send(u, t);
  }
  displayMatrix(e) {
    return this.send(h, e);
  }
  get tiltX() {
    return this._sensors.tiltX;
  }
  get tiltY() {
    return this._sensors.tiltY;
  }
  get buttonA() {
    return this._sensors.buttonA;
  }
  get buttonB() {
    return this._sensors.buttonB;
  }
  get gestureState() {
    return this._sensors.gestureState;
  }
  get ledMatrixState() {
    return this._sensors.ledMatrixState;
  }
  scan() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this._ble = new c(this._runtime, this._extensionId, {
      filters: [{
        services: [p]
      }]
    }, this._onConnect, this.reset);
  }
  connect(e) {
    if (this._ble) {
      this._ble.connectPeripheral(e);
    }
  }
  disconnect() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this.reset();
  }
  reset() {
    if (this._timeoutID) {
      window.clearTimeout(this._timeoutID);
      this._timeoutID = null;
    }
  }
  isConnected() {
    let e = false;
    if (this._ble) {
      e = this._ble.isConnected();
    }
    return e;
  }
  send(e, t) {
    if (!this.isConnected()) {
      return;
    }
    if (this._busy) {
      return;
    }
    this._busy = true;
    this._busyTimeoutID = window.setTimeout(() => {
      this._busy = false;
    }, 5000);
    const n = new Uint8Array(t.length + 1);
    n[0] = e;
    for (let e = 0; e < t.length; e++) {
      n[e + 1] = t[e];
    }
    const r = l.uint8ArrayToBase64(n);
    this._ble.write(p, m, r, "base64", true).then(() => {
      this._busy = false;
      window.clearTimeout(this._busyTimeoutID);
    });
  }
  _onConnect() {
    this._ble.read(p, f, true, this._onMessage);
    this._timeoutID = window.setTimeout(() => this._ble.handleDisconnectError(d), 4500);
  }
  _onMessage(e) {
    const t = l.base64ToUint8Array(e);
    this._sensors.tiltX = t[1] | t[0] << 8;
    if (this._sensors.tiltX > 32768) {
      this._sensors.tiltX -= 65536;
    }
    this._sensors.tiltY = t[3] | t[2] << 8;
    if (this._sensors.tiltY > 32768) {
      this._sensors.tiltY -= 65536;
    }
    this._sensors.buttonA = t[4];
    this._sensors.buttonB = t[5];
    this._sensors.touchPins[0] = t[6];
    this._sensors.touchPins[1] = t[7];
    this._sensors.touchPins[2] = t[8];
    this._sensors.gestureState = t[9];
    window.clearTimeout(this._timeoutID);
    this._timeoutID = window.setTimeout(() => this._ble.handleDisconnectError(d), 4500);
  }
  _checkPinState(e) {
    return this._sensors.touchPins[e];
  }
}
const b = "front";
const y = "back";
const E = "left";
const T = "right";
const v = "any";
const A = "moved";
const w = "shaken";
const S = "jumped";
const k = "A";
const I = "B";
const O = "any";
const N = "on";
const R = "off";
class x {
  static get EXTENSION_NAME() {
    return "micro:bit";
  }
  static get EXTENSION_ID() {
    return "microbit";
  }
  static get TILT_THRESHOLD() {
    return 15;
  }
  get BUTTONS_MENU() {
    return [{
      text: "A",
      value: k
    }, {
      text: "B",
      value: I
    }, {
      text: a({
        id: "microbit.buttonsMenu.any",
        default: "any",
        description: "label for \"any\" element in button picker for micro:bit extension"
      }),
      value: O
    }];
  }
  get GESTURES_MENU() {
    return [{
      text: a({
        id: "microbit.gesturesMenu.moved",
        default: "moved",
        description: "label for moved gesture in gesture picker for micro:bit extension"
      }),
      value: A
    }, {
      text: a({
        id: "microbit.gesturesMenu.shaken",
        default: "shaken",
        description: "label for shaken gesture in gesture picker for micro:bit extension"
      }),
      value: w
    }, {
      text: a({
        id: "microbit.gesturesMenu.jumped",
        default: "jumped",
        description: "label for jumped gesture in gesture picker for micro:bit extension"
      }),
      value: S
    }];
  }
  get PIN_STATE_MENU() {
    return [{
      text: a({
        id: "microbit.pinStateMenu.on",
        default: "on",
        description: "label for on element in pin state picker for micro:bit extension"
      }),
      value: N
    }, {
      text: a({
        id: "microbit.pinStateMenu.off",
        default: "off",
        description: "label for off element in pin state picker for micro:bit extension"
      }),
      value: R
    }];
  }
  get TILT_DIRECTION_MENU() {
    return [{
      text: a({
        id: "microbit.tiltDirectionMenu.front",
        default: "front",
        description: "label for front element in tilt direction picker for micro:bit extension"
      }),
      value: b
    }, {
      text: a({
        id: "microbit.tiltDirectionMenu.back",
        default: "back",
        description: "label for back element in tilt direction picker for micro:bit extension"
      }),
      value: y
    }, {
      text: a({
        id: "microbit.tiltDirectionMenu.left",
        default: "left",
        description: "label for left element in tilt direction picker for micro:bit extension"
      }),
      value: E
    }, {
      text: a({
        id: "microbit.tiltDirectionMenu.right",
        default: "right",
        description: "label for right element in tilt direction picker for micro:bit extension"
      }),
      value: T
    }];
  }
  get TILT_DIRECTION_ANY_MENU() {
    return [...this.TILT_DIRECTION_MENU, {
      text: a({
        id: "microbit.tiltDirectionMenu.any",
        default: "any",
        description: "label for any direction element in tilt direction picker for micro:bit extension"
      }),
      value: v
    }];
  }
  constructor(e) {
    this.runtime = e;
    this._peripheral = new g(this.runtime, x.EXTENSION_ID);
  }
  getInfo() {
    return {
      id: x.EXTENSION_ID,
      name: x.EXTENSION_NAME,
      blockIconURI: "data:image/png;base64,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",
      showStatusButton: true,
      blocks: [{
        opcode: "whenButtonPressed",
        text: a({
          id: "microbit.whenButtonPressed",
          default: "when [BTN] button pressed",
          description: "when the selected button on the micro:bit is pressed"
        }),
        blockType: i.HAT,
        arguments: {
          BTN: {
            type: r.STRING,
            menu: "buttons",
            defaultValue: k
          }
        }
      }, {
        opcode: "isButtonPressed",
        text: a({
          id: "microbit.isButtonPressed",
          default: "[BTN] button pressed?",
          description: "is the selected button on the micro:bit pressed?"
        }),
        blockType: i.BOOLEAN,
        arguments: {
          BTN: {
            type: r.STRING,
            menu: "buttons",
            defaultValue: k
          }
        }
      }, "---", {
        opcode: "whenGesture",
        text: a({
          id: "microbit.whenGesture",
          default: "when [GESTURE]",
          description: "when the selected gesture is detected by the micro:bit"
        }),
        blockType: i.HAT,
        arguments: {
          GESTURE: {
            type: r.STRING,
            menu: "gestures",
            defaultValue: A
          }
        }
      }, "---", {
        opcode: "displaySymbol",
        text: a({
          id: "microbit.displaySymbol",
          default: "display [MATRIX]",
          description: "display a pattern on the micro:bit display"
        }),
        blockType: i.COMMAND,
        arguments: {
          MATRIX: {
            type: r.MATRIX,
            defaultValue: "0101010101100010101000100"
          }
        }
      }, {
        opcode: "displayText",
        text: a({
          id: "microbit.displayText",
          default: "display text [TEXT]",
          description: "display text on the micro:bit display"
        }),
        blockType: i.COMMAND,
        arguments: {
          TEXT: {
            type: r.STRING,
            defaultValue: a({
              id: "microbit.defaultTextToDisplay",
              default: "Hello!",
              description: "default text to display.\n                                IMPORTANT - the micro:bit only supports letters a-z, A-Z.\n                                Please substitute a default word in your language\n                                that can be written with those characters,\n                                substitute non-accented characters or leave it as \"Hello!\".\n                                Check the micro:bit site documentation for details"
            })
          }
        }
      }, {
        opcode: "displayClear",
        text: a({
          id: "microbit.clearDisplay",
          default: "clear display",
          description: "display nothing on the micro:bit display"
        }),
        blockType: i.COMMAND
      }, "---", {
        opcode: "whenTilted",
        text: a({
          id: "microbit.whenTilted",
          default: "when tilted [DIRECTION]",
          description: "when the micro:bit is tilted in a direction"
        }),
        blockType: i.HAT,
        arguments: {
          DIRECTION: {
            type: r.STRING,
            menu: "tiltDirectionAny",
            defaultValue: v
          }
        }
      }, {
        opcode: "isTilted",
        text: a({
          id: "microbit.isTilted",
          default: "tilted [DIRECTION]?",
          description: "is the micro:bit is tilted in a direction?"
        }),
        blockType: i.BOOLEAN,
        arguments: {
          DIRECTION: {
            type: r.STRING,
            menu: "tiltDirectionAny",
            defaultValue: v
          }
        }
      }, {
        opcode: "getTiltAngle",
        text: a({
          id: "microbit.tiltAngle",
          default: "tilt angle [DIRECTION]",
          description: "how much the micro:bit is tilted in a direction"
        }),
        blockType: i.REPORTER,
        arguments: {
          DIRECTION: {
            type: r.STRING,
            menu: "tiltDirection",
            defaultValue: b
          }
        }
      }, "---", {
        opcode: "whenPinConnected",
        text: a({
          id: "microbit.whenPinConnected",
          default: "when pin [PIN] connected",
          description: "when the pin detects a connection to Earth/Ground"
        }),
        blockType: i.HAT,
        arguments: {
          PIN: {
            type: r.STRING,
            menu: "touchPins",
            defaultValue: "0"
          }
        }
      }],
      menus: {
        buttons: {
          acceptReporters: true,
          items: this.BUTTONS_MENU
        },
        gestures: {
          acceptReporters: true,
          items: this.GESTURES_MENU
        },
        pinState: {
          acceptReporters: true,
          items: this.PIN_STATE_MENU
        },
        tiltDirection: {
          acceptReporters: true,
          items: this.TILT_DIRECTION_MENU
        },
        tiltDirectionAny: {
          acceptReporters: true,
          items: this.TILT_DIRECTION_ANY_MENU
        },
        touchPins: {
          acceptReporters: true,
          items: ["0", "1", "2"]
        }
      }
    };
  }
  whenButtonPressed(e) {
    if (e.BTN === "any") {
      return this._peripheral.buttonA | this._peripheral.buttonB;
    } else if (e.BTN === "A") {
      return this._peripheral.buttonA;
    } else {
      return e.BTN === "B" && this._peripheral.buttonB;
    }
  }
  isButtonPressed(e) {
    if (e.BTN === "any") {
      return !!(this._peripheral.buttonA | this._peripheral.buttonB);
    } else if (e.BTN === "A") {
      return this._peripheral.buttonA !== 0;
    } else {
      return e.BTN === "B" && this._peripheral.buttonB !== 0;
    }
  }
  whenGesture(e) {
    const t = o.toString(e.GESTURE);
    if (t === "moved") {
      return this._peripheral.gestureState >> 2 & 1;
    } else if (t === "shaken") {
      return this._peripheral.gestureState & 1;
    } else {
      return t === "jumped" && this._peripheral.gestureState >> 1 & 1;
    }
  }
  displaySymbol(e) {
    const t = o.toString(e.MATRIX).replace(/\s/g, "").split("").reduce((e, t, n) => t === "0" ? e : e + Math.pow(2, n), 0);
    if (t !== null) {
      this._peripheral.ledMatrixState[0] = t & 31;
      this._peripheral.ledMatrixState[1] = t >> 5 & 31;
      this._peripheral.ledMatrixState[2] = t >> 10 & 31;
      this._peripheral.ledMatrixState[3] = t >> 15 & 31;
      this._peripheral.ledMatrixState[4] = t >> 20 & 31;
      this._peripheral.displayMatrix(this._peripheral.ledMatrixState);
    }
    return new Promise(e => {
      setTimeout(() => {
        e();
      }, 100);
    });
  }
  displayText(e) {
    const t = String(e.TEXT).substring(0, 19);
    if (t.length > 0) {
      this._peripheral.displayText(t);
    }
    const n = (t.length * 6 + 6) * 120;
    return new Promise(e => {
      setTimeout(() => {
        e();
      }, n);
    });
  }
  displayClear() {
    for (let e = 0; e < 5; e++) {
      this._peripheral.ledMatrixState[e] = 0;
    }
    this._peripheral.displayMatrix(this._peripheral.ledMatrixState);
    return new Promise(e => {
      setTimeout(() => {
        e();
      }, 100);
    });
  }
  whenTilted(e) {
    return this._isTilted(e.DIRECTION);
  }
  isTilted(e) {
    return this._isTilted(e.DIRECTION);
  }
  getTiltAngle(e) {
    return this._getTiltAngle(e.DIRECTION);
  }
  _isTilted(e) {
    if (e === v) {
      return Math.abs(this._peripheral.tiltX / 10) >= x.TILT_THRESHOLD || Math.abs(this._peripheral.tiltY / 10) >= x.TILT_THRESHOLD;
    } else {
      return this._getTiltAngle(e) >= x.TILT_THRESHOLD;
    }
  }
  _getTiltAngle(e) {
    switch (e) {
      case b:
        return Math.round(this._peripheral.tiltY / -10);
      case y:
        return Math.round(this._peripheral.tiltY / 10);
      case E:
        return Math.round(this._peripheral.tiltX / -10);
      case T:
        return Math.round(this._peripheral.tiltX / 10);
      default:
        s.warn(`Unknown tilt direction in _getTiltAngle: ${e}`);
    }
  }
  whenPinConnected(e) {
    const t = parseInt(e.PIN, 10);
    if (!isNaN(t)) {
      return !(t < 0) && !(t > 2) && this._peripheral._checkPinState(t);
    }
  }
}
module.exports = x;