const r = require("./3.js");
const i = require("./2.js");
const s = require("./1.js");
const o = require("./5.js");
const a = require("./23.js");
const c = require("./30.js");
const l = require("./16.js");
const u = require("./4.js");
const h = require("./41.js");
const d = require("./0.js");
const p = "00001523-1212-efde-1523-785feabcd123";
const f = "00004f0e-1212-efde-1523-785feabcd123";
const m = "00001527-1212-efde-1523-785feabcd123";
const g = "00001528-1212-efde-1523-785feabcd123";
const b = "00001560-1212-efde-1523-785feabcd123";
const y = "00001563-1212-efde-1523-785feabcd123";
const E = "00001565-1212-efde-1523-785feabcd123";
const T = 100;
const v = 1;
const A = 23;
const w = 34;
const S = 35;
const k = 6;
const I = 5;
const O = 1;
const N = 2;
const R = 3;
const x = 4;
const M = {
  TILT: 0,
  DISTANCE: 0,
  LED: 1
};
const C = {
  TILT: 0,
  DISTANCE: 1,
  LED: 0
};
class P {
  constructor(e, t) {
    this._parent = e;
    this._index = t;
    this._direction = 1;
    this._power = 100;
    this._isOn = false;
    this._pendingTimeoutId = null;
    this._pendingTimeoutStartTime = null;
    this._pendingTimeoutDelay = null;
    this.startBraking = this.startBraking.bind(this);
    this.turnOff = this.turnOff.bind(this);
  }
  static get BRAKE_TIME_MS() {
    return 1000;
  }
  get direction() {
    return this._direction;
  }
  set direction(e) {
    this._direction = e < 0 ? -1 : 1;
  }
  get power() {
    return this._power;
  }
  set power(e) {
    const t = Math.max(0, Math.min(e, 100));
    if (t === 0) {
      this._power = 0;
    } else {
      const e = 100 / t;
      this._power = 30 + 70 / e;
    }
  }
  get isOn() {
    return this._isOn;
  }
  get pendingTimeoutStartTime() {
    return this._pendingTimeoutStartTime;
  }
  get pendingTimeoutDelay() {
    return this._pendingTimeoutDelay;
  }
  turnOn() {
    const e = this._parent.generateOutputCommand(this._index + 1, O, [this._power * this._direction]);
    this._parent.send(E, e);
    this._isOn = true;
    this._clearTimeout();
  }
  turnOnFor(e) {
    if (this._power !== 0) {
      e = Math.max(0, e);
      this.turnOn();
      this._setNewTimeout(this.startBraking, e);
    }
  }
  startBraking() {
    if (this._power === 0) {
      return;
    }
    const e = this._parent.generateOutputCommand(this._index + 1, O, [127]);
    this._parent.send(E, e);
    this._isOn = false;
    this._setNewTimeout(this.turnOff, P.BRAKE_TIME_MS);
  }
  turnOff() {
    let e = !(arguments.length > 0) || arguments[0] === undefined || arguments[0];
    if (this._power === 0) {
      return;
    }
    const t = this._parent.generateOutputCommand(this._index + 1, O, [0]);
    this._parent.send(E, t, e);
    this._isOn = false;
  }
  _clearTimeout() {
    if (this._pendingTimeoutId !== null) {
      clearTimeout(this._pendingTimeoutId);
      this._pendingTimeoutId = null;
      this._pendingTimeoutStartTime = null;
      this._pendingTimeoutDelay = null;
    }
  }
  _setNewTimeout(e, t) {
    this._clearTimeout();
    const n = setTimeout(() => {
      if (this._pendingTimeoutId === n) {
        this._pendingTimeoutId = null;
        this._pendingTimeoutStartTime = null;
        this._pendingTimeoutDelay = null;
      }
      e();
    }, t);
    this._pendingTimeoutId = n;
    this._pendingTimeoutStartTime = Date.now();
    this._pendingTimeoutDelay = t;
  }
}
class L {
  constructor(e, t) {
    this._runtime = e;
    this._runtime.on("PROJECT_STOP_ALL", this.stopAll.bind(this));
    this._extensionId = t;
    this._ports = ["none", "none"];
    this._motors = [null, null];
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      distance: 0
    };
    this._ble = null;
    this._runtime.registerPeripheralExtension(t, this);
    this._rateLimiter = new h(20);
    this._batteryLevelIntervalId = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._checkBatteryLevel = this._checkBatteryLevel.bind(this);
  }
  get tiltX() {
    return this._sensors.tiltX;
  }
  get tiltY() {
    return this._sensors.tiltY;
  }
  get distance() {
    return this._sensors.distance;
  }
  motor(e) {
    return this._motors[e];
  }
  stopAllMotors() {
    this._motors.forEach(e => {
      if (e) {
        e.turnOff(false);
      }
    });
  }
  setLED(e) {
    const t = [e >> 16 & 255, e >> 8 & 255, e & 255];
    const n = this.generateOutputCommand(k, x, t);
    return this.send(E, n);
  }
  setLEDMode() {
    const e = this.generateInputCommand(k, A, M.LED, 0, C.LED, false);
    return this.send(y, e);
  }
  stopLED() {
    const e = this.generateOutputCommand(k, x, [0, 0, 0]);
    return this.send(E, e);
  }
  playTone(e, t) {
    const n = this.generateOutputCommand(I, N, [e, e >> 8, t, t >> 8]);
    return this.send(E, n);
  }
  stopTone() {
    const e = this.generateOutputCommand(I, R);
    return this.send(E, e, false);
  }
  stopAll() {
    if (this.isConnected()) {
      this.stopTone();
      this.stopAllMotors();
    }
  }
  scan() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this._ble = new c(this._runtime, this._extensionId, {
      filters: [{
        services: [p]
      }],
      optionalServices: [f]
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
    this._ports = ["none", "none"];
    this._motors = [null, null];
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      distance: 0
    };
    if (this._batteryLevelIntervalId) {
      window.clearInterval(this._batteryLevelIntervalId);
      this._batteryLevelIntervalId = null;
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
    let n = !(arguments.length > 2) || arguments[2] === undefined || arguments[2];
    if (this.isConnected()) {
      if (n && !this._rateLimiter.okayToSend()) {
        return Promise.resolve();
      } else {
        return this._ble.write(f, e, l.uint8ArrayToBase64(t), "base64");
      }
    } else {
      return Promise.resolve();
    }
  }
  generateOutputCommand(e, t, n = null) {
    let r = [e, t];
    if (n) {
      r = r.concat(n.length).concat(n);
    }
    return r;
  }
  generateInputCommand(e, t, n, r, i, s) {
    return [1, 2, e, t, n, r, 0, 0, 0, i, s ? 1 : 0];
  }
  _onConnect() {
    this.setLEDMode();
    this.setLED(255);
    this._ble.startNotifications(p, m, this._onMessage);
    this._batteryLevelIntervalId = window.setInterval(this._checkBatteryLevel, 5000);
  }
  _onMessage(e) {
    const t = l.base64ToUint8Array(e);
    switch (t[0]) {
      case 1:
      case 2:
        {
          const e = t[0];
          if (t[1] === 0) {
            this._clearPort(e);
          } else {
            this._registerSensorOrMotor(e, t[3]);
          }
          break;
        }
      default:
        {
          const e = t[1];
          const n = this._ports[e - 1];
          if (n === S) {
            this._sensors.distance = t[2];
          }
          if (n === w) {
            this._sensors.tiltX = t[2];
            this._sensors.tiltY = t[3];
          }
          break;
        }
    }
  }
  _checkBatteryLevel() {
    this._ble.read(p, g, false);
  }
  _registerSensorOrMotor(e, t) {
    this._ports[e - 1] = t;
    if (t === v) {
      this._motors[e - 1] = new P(this, e - 1);
    } else {
      const n = t === S ? "DISTANCE" : "TILT";
      const r = this.generateInputCommand(e, t, M[n], 1, C[n], true);
      this.send(y, r);
      this._ble.startNotifications(f, b, this._onMessage);
    }
  }
  _clearPort(e) {
    const t = this._ports[e - 1];
    if (t === w) {
      this._sensors.tiltX = this._sensors.tiltY = 0;
    }
    if (t === S) {
      this._sensors.distance = 0;
    }
    this._ports[e - 1] = "none";
    this._motors[e - 1] = null;
  }
}
const D = "motor";
const B = "motor A";
const U = "motor B";
const F = "all motors";
const j = "this way";
const z = "that way";
const G = "reverse";
const V = "up";
const _ = "down";
const Y = "left";
const H = "right";
const W = "any";
class K {
  static get EXTENSION_ID() {
    return "wedo2";
  }
  static get TILT_THRESHOLD() {
    return 15;
  }
  constructor(e) {
    this.runtime = e;
    this._peripheral = new L(this.runtime, K.EXTENSION_ID);
  }
  getInfo() {
    return {
      id: K.EXTENSION_ID,
      name: "WeDo 2.0",
      blockIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAACXBIWXMAABYlAAAWJQFJUiTwAAABQVBMVEX///98h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V8h6V9h6V8h6V8h6V8h6VwhKxyhat8h6V8h6VwhKxwhKx8h6U9ecw+e88/fdJAf9VBgNlDhN9EhuJGgM9GjOxHgM9Hju9Ij/JKk/lLlfxMl/9fkNVtmtlwhKx4hqd5o9x6h6Z8h6V9iKV9iKZ+iKZ+iaaAi6iBjKmCjamEjqqGkKyIkq6Jkq6MlrCOmLKQmbGUnbaVnraWn7WWn7aYobmZormao7qcpbudpbqevOWjq76lrcGqxOmttMevtsi1u8y2zey3vcu6v9C9w9K+w8/FytfLz9fO0t3O3fLS1dvS1uDX2d/a5vXe4ejf4eTm5+jm6O7v8PTz9/z39/n///+zX1z3AAAAInRSTlMAEDBAUFdgcICHkJygr7DAwc/Q3ODv8PD19vf7+/v8/f7+PDte4QAAAe9JREFUeNrt11tvEkEYxvGB1oqIjFVaDxWU0VqpJ2zVxx5kVayKumKp9ihai7vA+/0/gDOZNNbkzdJM9qJJ53cBhGf2n73YmxWe53med3plijIvxLiUWSHyspARWSknhMjJYsZsOSEmzJYp6GNmGxcjFAGMCWgiByAnpgFkxwBIIQ+3abvZY0nOTU6Vgac3Zha1mZvm89bic6BSAVAtVwFcktBkCUDJ/pQynxGsM9fhqCA456sItomeqNkHdWNe1doDordAuE9JugB7f1Ws67Wt7j6uG49U7YCI3mNV55KFbPCK7mn3b+uecU91iGgP6JNT8CwC0n6qubp1Rw2I6A2+kVvwMrZJ66j5uqUWSMMSOQavgYy2eng0uIfXrkGs8sGmczA4QcFPCcFNNWsfm7njB+OVhOCgpg5tHjM4fIeEIB08W7A69H+wF5uLe30i6veG5sZ6dtjAK/BBxr9gCGxQ3ETQpW6AZkzfgXBoj3x2CUKjHQChaWOHoPWIYgRxyAVXwFrCSF1ig2i0GGuwfzfAr029rPNBtCLGD3yIjBb4dTf6heX9VIPRFl5+TDUYfUEj3eCfBlIM2q8XKQbt6hBkuQe3WrzfLsFEPngE1lIOLuOra3AXXLAEuJsUjItlRqV6dWq0C/5NwvM8zzuV/gL7cbih1u2EKwAAAABJRU5ErkJggg==",
      showStatusButton: true,
      blocks: [{
        opcode: "motorOnFor",
        text: o({
          id: "wedo2.motorOnFor",
          default: "turn [MOTOR_ID] on for [DURATION] seconds",
          description: "turn a motor on for some time"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: D
          },
          DURATION: {
            type: r.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: "motorOn",
        text: o({
          id: "wedo2.motorOn",
          default: "turn [MOTOR_ID] on",
          description: "turn a motor on indefinitely"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: D
          }
        }
      }, {
        opcode: "motorOff",
        text: o({
          id: "wedo2.motorOff",
          default: "turn [MOTOR_ID] off",
          description: "turn a motor off"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: D
          }
        }
      }, {
        opcode: "startMotorPower",
        text: o({
          id: "wedo2.startMotorPower",
          default: "set [MOTOR_ID] power to [POWER]",
          description: "set the motor's power and turn it on"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: D
          },
          POWER: {
            type: r.NUMBER,
            defaultValue: 100
          }
        }
      }, {
        opcode: "setMotorDirection",
        text: o({
          id: "wedo2.setMotorDirection",
          default: "set [MOTOR_ID] direction to [MOTOR_DIRECTION]",
          description: "set the motor's turn direction"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: D
          },
          MOTOR_DIRECTION: {
            type: r.STRING,
            menu: "MOTOR_DIRECTION",
            defaultValue: j
          }
        }
      }, {
        opcode: "setLightHue",
        text: o({
          id: "wedo2.setLightHue",
          default: "set light color to [HUE]",
          description: "set the LED color"
        }),
        blockType: i.COMMAND,
        arguments: {
          HUE: {
            type: r.NUMBER,
            defaultValue: 50
          }
        }
      }, {
        opcode: "playNoteFor",
        text: o({
          id: "wedo2.playNoteFor",
          default: "play note [NOTE] for [DURATION] seconds",
          description: "play a certain note for some time"
        }),
        blockType: i.COMMAND,
        arguments: {
          NOTE: {
            type: r.NUMBER,
            defaultValue: 60
          },
          DURATION: {
            type: r.NUMBER,
            defaultValue: 0.5
          }
        },
        hideFromPalette: true
      }, {
        opcode: "whenDistance",
        text: o({
          id: "wedo2.whenDistance",
          default: "when distance [OP] [REFERENCE]",
          description: "check for when distance is < or > than reference"
        }),
        blockType: i.HAT,
        arguments: {
          OP: {
            type: r.STRING,
            menu: "OP",
            defaultValue: "<"
          },
          REFERENCE: {
            type: r.NUMBER,
            defaultValue: 50
          }
        }
      }, {
        opcode: "whenTilted",
        text: o({
          id: "wedo2.whenTilted",
          default: "when tilted [TILT_DIRECTION_ANY]",
          description: "check when tilted in a certain direction"
        }),
        func: "isTilted",
        blockType: i.HAT,
        arguments: {
          TILT_DIRECTION_ANY: {
            type: r.STRING,
            menu: "TILT_DIRECTION_ANY",
            defaultValue: W
          }
        }
      }, {
        opcode: "getDistance",
        text: o({
          id: "wedo2.getDistance",
          default: "distance",
          description: "the value returned by the distance sensor"
        }),
        blockType: i.REPORTER
      }, {
        opcode: "isTilted",
        text: o({
          id: "wedo2.isTilted",
          default: "tilted [TILT_DIRECTION_ANY]?",
          description: "whether the tilt sensor is tilted"
        }),
        blockType: i.BOOLEAN,
        arguments: {
          TILT_DIRECTION_ANY: {
            type: r.STRING,
            menu: "TILT_DIRECTION_ANY",
            defaultValue: W
          }
        }
      }, {
        opcode: "getTiltAngle",
        text: o({
          id: "wedo2.getTiltAngle",
          default: "tilt angle [TILT_DIRECTION]",
          description: "the angle returned by the tilt sensor"
        }),
        blockType: i.REPORTER,
        arguments: {
          TILT_DIRECTION: {
            type: r.STRING,
            menu: "TILT_DIRECTION",
            defaultValue: V
          }
        }
      }],
      menus: {
        MOTOR_ID: {
          acceptReporters: true,
          items: [{
            text: o({
              id: "wedo2.motorId.default",
              default: "motor",
              description: "label for motor element in motor menu for LEGO WeDo 2 extension"
            }),
            value: D
          }, {
            text: o({
              id: "wedo2.motorId.a",
              default: "motor A",
              description: "label for motor A element in motor menu for LEGO WeDo 2 extension"
            }),
            value: B
          }, {
            text: o({
              id: "wedo2.motorId.b",
              default: "motor B",
              description: "label for motor B element in motor menu for LEGO WeDo 2 extension"
            }),
            value: U
          }, {
            text: o({
              id: "wedo2.motorId.all",
              default: "all motors",
              description: "label for all motors element in motor menu for LEGO WeDo 2 extension"
            }),
            value: F
          }]
        },
        MOTOR_DIRECTION: {
          acceptReporters: true,
          items: [{
            text: o({
              id: "wedo2.motorDirection.forward",
              default: "this way",
              description: "label for forward element in motor direction menu for LEGO WeDo 2 extension"
            }),
            value: j
          }, {
            text: o({
              id: "wedo2.motorDirection.backward",
              default: "that way",
              description: "label for backward element in motor direction menu for LEGO WeDo 2 extension"
            }),
            value: z
          }, {
            text: o({
              id: "wedo2.motorDirection.reverse",
              default: "reverse",
              description: "label for reverse element in motor direction menu for LEGO WeDo 2 extension"
            }),
            value: G
          }]
        },
        TILT_DIRECTION: {
          acceptReporters: true,
          items: [{
            text: o({
              id: "wedo2.tiltDirection.up",
              default: "up",
              description: "label for up element in tilt direction menu for LEGO WeDo 2 extension"
            }),
            value: V
          }, {
            text: o({
              id: "wedo2.tiltDirection.down",
              default: "down",
              description: "label for down element in tilt direction menu for LEGO WeDo 2 extension"
            }),
            value: _
          }, {
            text: o({
              id: "wedo2.tiltDirection.left",
              default: "left",
              description: "label for left element in tilt direction menu for LEGO WeDo 2 extension"
            }),
            value: Y
          }, {
            text: o({
              id: "wedo2.tiltDirection.right",
              default: "right",
              description: "label for right element in tilt direction menu for LEGO WeDo 2 extension"
            }),
            value: H
          }]
        },
        TILT_DIRECTION_ANY: {
          acceptReporters: true,
          items: [{
            text: o({
              id: "wedo2.tiltDirection.up",
              default: "up"
            }),
            value: V
          }, {
            text: o({
              id: "wedo2.tiltDirection.down",
              default: "down"
            }),
            value: _
          }, {
            text: o({
              id: "wedo2.tiltDirection.left",
              default: "left"
            }),
            value: Y
          }, {
            text: o({
              id: "wedo2.tiltDirection.right",
              default: "right"
            }),
            value: H
          }, {
            text: o({
              id: "wedo2.tiltDirection.any",
              default: "any",
              description: "label for any element in tilt direction menu for LEGO WeDo 2 extension"
            }),
            value: W
          }]
        },
        OP: {
          acceptReporters: true,
          items: ["<", ">"]
        }
      }
    };
  }
  motorOnFor(e) {
    let t = s.toNumber(e.DURATION) * 1000;
    t = u.clamp(t, 0, 15000);
    return new Promise(n => {
      this._forEachMotor(e.MOTOR_ID, e => {
        const n = this._peripheral.motor(e);
        if (n) {
          n.turnOnFor(t);
        }
      });
      setTimeout(n, t);
    });
  }
  motorOn(e) {
    this._forEachMotor(e.MOTOR_ID, e => {
      const t = this._peripheral.motor(e);
      if (t) {
        t.turnOn();
      }
    });
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, T);
    });
  }
  motorOff(e) {
    this._forEachMotor(e.MOTOR_ID, e => {
      const t = this._peripheral.motor(e);
      if (t) {
        t.turnOff();
      }
    });
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, T);
    });
  }
  startMotorPower(e) {
    this._forEachMotor(e.MOTOR_ID, t => {
      const n = this._peripheral.motor(t);
      if (n) {
        n.power = u.clamp(s.toNumber(e.POWER), 0, 100);
        n.turnOn();
      }
    });
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, T);
    });
  }
  setMotorDirection(e) {
    this._forEachMotor(e.MOTOR_ID, t => {
      const n = this._peripheral.motor(t);
      if (n) {
        switch (e.MOTOR_DIRECTION) {
          case j:
            n.direction = 1;
            break;
          case z:
            n.direction = -1;
            break;
          case G:
            n.direction = -n.direction;
            break;
          default:
            d.warn(`Unknown motor direction in setMotorDirection: ${e.DIRECTION}`);
        }
        if (n.isOn) {
          if (n.pendingTimeoutDelay) {
            n.turnOnFor(n.pendingTimeoutStartTime + n.pendingTimeoutDelay - Date.now());
          } else {
            n.turnOn();
          }
        }
      }
    });
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, T);
    });
  }
  setLightHue(e) {
    let t = s.toNumber(e.HUE);
    t = u.wrapClamp(t, 0, 100);
    const n = t * 360 / 100;
    const r = a.hsvToRgb({
      h: n,
      s: 1,
      v: 1
    });
    const i = a.rgbToDecimal(r);
    this._peripheral.setLED(i);
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, T);
    });
  }
  playNoteFor(e) {
    let t = s.toNumber(e.DURATION) * 1000;
    t = u.clamp(t, 0, 3000);
    const n = u.clamp(s.toNumber(e.NOTE), 25, 125);
    if (t !== 0) {
      return new Promise(e => {
        const r = this._noteToTone(n);
        this._peripheral.playTone(r, t);
        setTimeout(e, t);
      });
    }
  }
  whenDistance(e) {
    switch (e.OP) {
      case "<":
        return this._peripheral.distance < s.toNumber(e.REFERENCE);
      case ">":
        return this._peripheral.distance > s.toNumber(e.REFERENCE);
      default:
        d.warn(`Unknown comparison operator in whenDistance: ${e.OP}`);
        return false;
    }
  }
  whenTilted(e) {
    return this._isTilted(e.TILT_DIRECTION_ANY);
  }
  getDistance() {
    return this._peripheral.distance;
  }
  isTilted(e) {
    return this._isTilted(e.TILT_DIRECTION_ANY);
  }
  getTiltAngle(e) {
    return this._getTiltAngle(e.TILT_DIRECTION);
  }
  _isTilted(e) {
    if (e === W) {
      return this._getTiltAngle(V) >= K.TILT_THRESHOLD || this._getTiltAngle(_) >= K.TILT_THRESHOLD || this._getTiltAngle(Y) >= K.TILT_THRESHOLD || this._getTiltAngle(H) >= K.TILT_THRESHOLD;
    } else {
      return this._getTiltAngle(e) >= K.TILT_THRESHOLD;
    }
  }
  _getTiltAngle(e) {
    switch (e) {
      case V:
        if (this._peripheral.tiltY > 45) {
          return 256 - this._peripheral.tiltY;
        } else {
          return -this._peripheral.tiltY;
        }
      case _:
        if (this._peripheral.tiltY > 45) {
          return this._peripheral.tiltY - 256;
        } else {
          return this._peripheral.tiltY;
        }
      case Y:
        if (this._peripheral.tiltX > 45) {
          return 256 - this._peripheral.tiltX;
        } else {
          return -this._peripheral.tiltX;
        }
      case H:
        if (this._peripheral.tiltX > 45) {
          return this._peripheral.tiltX - 256;
        } else {
          return this._peripheral.tiltX;
        }
      default:
        d.warn(`Unknown tilt direction in _getTiltAngle: ${e}`);
    }
  }
  _forEachMotor(e, t) {
    let n;
    switch (e) {
      case B:
        n = [0];
        break;
      case U:
        n = [1];
        break;
      case F:
      case D:
        n = [0, 1];
        break;
      default:
        d.warn(`Invalid motor ID: ${e}`);
        n = [];
    }
    for (const e of n) {
      t(e);
    }
  }
  _noteToTone(e) {
    return Math.pow(2, (e - 69) / 12) * 440;
  }
}
module.exports = K;