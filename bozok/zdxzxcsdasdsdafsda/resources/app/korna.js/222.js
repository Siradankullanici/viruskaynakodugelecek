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
const p = "00001623-1212-efde-1623-785feabcd123";
const f = "00001624-1212-efde-1623-785feabcd123";
const m = 100;
const g = 20;
const b = 20;
const y = 21;
const E = 23;
const T = 37;
const v = 38;
const A = 39;
const w = 40;
const S = 1;
const k = 2;
const I = 4;
const O = {
  A: 55,
  B: 56,
  C: 1,
  D: 2
};
const N = {
  A: 0,
  B: 1,
  C: 2,
  D: 3
};
let R = N;
const x = "any";
const M = "none";
const C = "red";
const P = "blue";
const L = "green";
const D = "yellow";
const B = "white";
const U = "black";
const F = {
  [M]: 255,
  [C]: 9,
  [P]: 3,
  [L]: 5,
  [D]: 7,
  [B]: 10,
  [U]: 0
};
const j = {
  HUB_PROPERTIES: 1,
  HUB_ACTIONS: 2,
  HUB_ALERTS: 3,
  HUB_ATTACHED_IO: 4,
  ERROR: 5,
  PORT_INPUT_FORMAT_SETUP_SINGLE: 65,
  PORT_INPUT_FORMAT_SETUP_COMBINED: 66,
  PORT_INFORMATION: 67,
  PORT_MODEINFORMATION: 68,
  PORT_VALUE: 69,
  PORT_VALUE_COMBINED: 70,
  PORT_INPUT_FORMAT: 71,
  PORT_INPUT_FORMAT_COMBINED: 72,
  OUTPUT: 129,
  PORT_FEEDBACK: 130
};
const z = 3;
const G = 5;
const V = 1;
const _ = 7;
const Y = 11;
const H = 81;
const W = 16;
const K = 1;
const X = 0;
const Z = 127;
const q = 0;
const Q = 1;
const J = 0;
const $ = 0;
const ee = 1;
const te = 0;
const ne = 2;
const re = 0;
const ie = 0;
const se = 1;
const oe = 2;
const ae = 3;
const ce = function (e) {
  const t = new ArrayBuffer(4);
  const n = new DataView(t);
  n.setInt32(0, e);
  return [n.getInt8(3), n.getInt8(2), n.getInt8(1), n.getInt8(0)];
};
const le = function (e) {
  const t = Uint8Array.from(e);
  return new DataView(t.buffer).getInt32(0, true);
};
class ue {
  constructor(e, t) {
    this._parent = e;
    this._index = t;
    this._direction = 1;
    this._power = 50;
    this._position = 0;
    this._status = ie;
    this._pendingDurationTimeoutId = null;
    this._pendingDurationTimeoutStartTime = null;
    this._pendingDurationTimeoutDelay = null;
    this._pendingRotationDestination = null;
    this._pendingRotationPromise = null;
    this.turnOff = this.turnOff.bind(this);
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
    this._power = e === 0 ? 0 : u.scale(e, 1, 100, 10, 100);
  }
  get position() {
    return this._position;
  }
  set position(e) {
    this._position = e;
  }
  get status() {
    return this._status;
  }
  set status(e) {
    this._clearRotationState();
    this._clearDurationTimeout();
    this._status = e;
  }
  get pendingDurationTimeoutStartTime() {
    return this._pendingDurationTimeoutStartTime;
  }
  get pendingDurationTimeoutDelay() {
    return this._pendingDurationTimeoutDelay;
  }
  get pendingRotationDestination() {
    return this._pendingRotationDestination;
  }
  get pendingRotationPromise() {
    return this._pendingRotationPromise;
  }
  set pendingRotationPromise(e) {
    this._pendingRotationPromise = e;
  }
  _turnOn() {
    const e = this._parent.generateOutputCommand(this._index, W, _, [this.power * this.direction, u.clamp(this.power + 10, 0, 100), q]);
    this._parent.send(f, e);
  }
  turnOnForever() {
    this.status = se;
    this._turnOn();
  }
  turnOnFor(e) {
    e = Math.max(0, e);
    this.status = oe;
    this._turnOn();
    this._setNewDurationTimeout(this.turnOff, e);
  }
  turnOnForDegrees(e, t) {
    e = Math.max(0, e);
    const n = this._parent.generateOutputCommand(this._index, W ^ K, Y, [...ce(e), this.power * this.direction * t, u.clamp(this.power + 10, 0, 100), Z, q]);
    this.status = ae;
    this._pendingRotationDestination = this.position + e * this.direction * t;
    this._parent.send(f, n);
  }
  turnOff() {
    let e = !(arguments.length > 0) || arguments[0] === undefined || arguments[0];
    const t = this._parent.generateOutputCommand(this._index, W, V, [X]);
    this.status = ie;
    this._parent.send(f, t, e);
  }
  _clearDurationTimeout() {
    if (this._pendingDurationTimeoutId !== null) {
      clearTimeout(this._pendingDurationTimeoutId);
      this._pendingDurationTimeoutId = null;
      this._pendingDurationTimeoutStartTime = null;
      this._pendingDurationTimeoutDelay = null;
    }
  }
  _setNewDurationTimeout(e, t) {
    this._clearDurationTimeout();
    const n = setTimeout(() => {
      if (this._pendingDurationTimeoutId === n) {
        this._pendingDurationTimeoutId = null;
        this._pendingDurationTimeoutStartTime = null;
        this._pendingDurationTimeoutDelay = null;
      }
      e();
    }, t);
    this._pendingDurationTimeoutId = n;
    this._pendingDurationTimeoutStartTime = Date.now();
    this._pendingDurationTimeoutDelay = t;
  }
  _clearRotationState() {
    if (this._pendingRotationPromise !== null) {
      this._pendingRotationPromise();
      this._pendingRotationPromise = null;
    }
    this._pendingRotationDestination = null;
  }
}
class he {
  constructor(e, t) {
    this._runtime = e;
    this._runtime.on("PROJECT_STOP_ALL", this.stopAll.bind(this));
    this._extensionId = t;
    this._ports = [];
    this._motors = [];
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      color: M,
      previousColor: M
    };
    this._colorSamples = [];
    this._ble = null;
    this._runtime.registerPeripheralExtension(t, this);
    this._rateLimiter = new h(g);
    this._pingDeviceId = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._pingDevice = this._pingDevice.bind(this);
  }
  get tiltX() {
    return this._sensors.tiltX;
  }
  get tiltY() {
    return this._sensors.tiltY;
  }
  get color() {
    return this._sensors.color;
  }
  get previousColor() {
    return this._sensors.previousColor;
  }
  boostColorForIndex(e) {
    return Object.keys(F).find(t => F[t] === e) || M;
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
    const n = this.generateOutputCommand(this._ports.indexOf(E), W ^ K, H, [ee, ...t]);
    return this.send(f, n);
  }
  setLEDMode() {
    const e = this.generateInputCommand(this._ports.indexOf(E), ee, 0, false);
    return this.send(f, e);
  }
  stopAll() {
    if (this.isConnected()) {
      this.stopAllMotors();
    }
  }
  scan() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this._ble = new c(this._runtime, this._extensionId, {
      filters: [{
        services: [p],
        manufacturerData: {
          919: {
            dataPrefix: [0, 64],
            mask: [0, 255]
          }
        }
      }],
      optionalServices: []
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
    this._ports = [];
    this._motors = [];
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      color: M,
      previousColor: M
    };
    if (this._pingDeviceId) {
      window.clearInterval(this._pingDeviceId);
      this._pingDeviceId = null;
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
        return this._ble.write(p, e, l.uint8ArrayToBase64(t), "base64");
      }
    } else {
      return Promise.resolve();
    }
  }
  generateOutputCommand(e, t, n, r) {
    const i = [0, j.OUTPUT, e, t, n, ...r];
    i.unshift(i.length + 1);
    return i;
  }
  generateInputCommand(e, t, n, r) {
    const i = [0, j.PORT_INPUT_FORMAT_SETUP_SINGLE, e, t].concat(ce(n)).concat([r]);
    i.unshift(i.length + 1);
    return i;
  }
  _onConnect() {
    this._ble.startNotifications(p, f, this._onMessage);
    this._pingDeviceId = window.setInterval(this._pingDevice, 5000);
    setTimeout(() => {
      const e = [0, j.HUB_PROPERTIES, z, G];
      e.unshift(e.length + 1);
      this.send(f, e, false);
    }, 500);
  }
  _onMessage(e) {
    const t = l.base64ToUint8Array(e);
    const n = t[2];
    const r = t[3];
    switch (n) {
      case j.HUB_PROPERTIES:
        switch (t[3]) {
          case z:
            {
              const e = le([36, 2, 0, 16]);
              if (le(t.slice(5, t.length)) < e) {
                R = O;
                d.info("Move Hub firmware older than version 1.0.00.0224 detected. Using old port mapping.");
              } else {
                R = N;
              }
              break;
            }
        }
        break;
      case j.HUB_ATTACHED_IO:
        {
          const e = t[4];
          const n = t[5];
          switch (e) {
            case Q:
              this._registerSensorOrMotor(r, n);
              break;
            case J:
              this._clearPort(r);
          }
          break;
        }
      case j.PORT_VALUE:
        {
          const e = this._ports[r];
          switch (e) {
            case w:
              this._sensors.tiltX = t[4];
              this._sensors.tiltY = t[5];
              break;
            case T:
              this._colorSamples.unshift(t[4]);
              if (this._colorSamples.length > 5) {
                this._colorSamples.pop();
                if (this._colorSamples.every((e, t, n) => e === n[0])) {
                  this._sensors.previousColor = this._sensors.color;
                  this._sensors.color = this.boostColorForIndex(this._colorSamples[0]);
                } else {
                  this._sensors.color = M;
                }
              } else {
                this._sensors.color = M;
              }
              break;
            case v:
            case A:
              this.motor(r).position = le(t.slice(4, 8));
              break;
            case y:
            case b:
            case E:
              break;
            default:
              d.warn(`Unknown sensor value! Type: ${e}`);
          }
          break;
        }
      case j.PORT_FEEDBACK:
        {
          const e = t[4];
          const n = this.motor(r);
          if (n) {
            if (!(e & S) && e & (k ^ I) && n.status === ae) {
              n.status = ie;
            }
          }
          break;
        }
      case j.ERROR:
        d.warn(`Error reported by hub: ${t}`);
    }
  }
  _pingDevice() {
    this._ble.read(p, f, false);
  }
  _registerSensorOrMotor(e, t) {
    this._ports[e] = t;
    if (t === A || t === v) {
      this._motors[e] = new ue(this, e);
    }
    let n = null;
    let r = 1;
    switch (t) {
      case A:
      case v:
        n = ne;
        break;
      case T:
        n = te;
        r = 0;
        break;
      case E:
        n = ee;
        this.setLEDMode();
        this.setLED(255);
        break;
      case w:
        n = $;
        break;
      default:
        n = re;
    }
    const i = this.generateInputCommand(e, n, r, true);
    this.send(f, i);
  }
  _clearPort(e) {
    const t = this._ports[e];
    if (t === w) {
      this._sensors.tiltX = this._sensors.tiltY = 0;
    }
    if (t === T) {
      this._sensors.color = M;
    }
    this._ports[e] = "none";
    this._motors[e] = null;
  }
}
const de = "A";
const pe = "B";
const fe = "C";
const me = "D";
const ge = "AB";
const be = "ABCD";
const ye = "this way";
const Ee = "that way";
const Te = "reverse";
const ve = "up";
const Ae = "down";
const we = "left";
const Se = "right";
const ke = "any";
class Ie {
  static get EXTENSION_ID() {
    return "boost";
  }
  static get TILT_THRESHOLD() {
    return 15;
  }
  constructor(e) {
    this.runtime = e;
    this._peripheral = new he(this.runtime, Ie.EXTENSION_ID);
  }
  getInfo() {
    return {
      id: Ie.EXTENSION_ID,
      name: "BOOST",
      blockIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpQTFRF////6+zskJmy3+Hk6N/b+YZO/2Ya6dfO9/j5vsPSlZ62////fIel5ufo1AuBvgAAAAF0Uk5TAEDm2GYAAADNSURBVHja7dfRDoMgDIXhuQmbpbz/645JsspKOiM1u9j5E7gw8YtCSPSCEEII/VlE/aEjskeJ2LEXya6tYDLK79KOfgWm5AhOOU91HgftbJCoN46C+yJvkJ3XEKAJ6ujhBYo4BOaPblcRh0ERvUARh8A5xBhmQ2TW51uffQFDLIXciM0p1meaWCdgXLv3xfZ2eebvYO5VCWGMVVWvbIML89KA9cpmVptig1xqwHplMwso+YJuryy5bIpjZ4HZrZNA19w/OPE3gBBCCB3vCQkmeCf31OYLAAAAAElFTkSuQmCC",
      showStatusButton: true,
      blocks: [{
        opcode: "motorOnFor",
        text: o({
          id: "boost.motorOnFor",
          default: "turn motor [MOTOR_ID] for [DURATION] seconds",
          description: "turn a motor on for some time"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: de
          },
          DURATION: {
            type: r.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: "motorOnForRotation",
        text: o({
          id: "boost.motorOnForRotation",
          default: "turn motor [MOTOR_ID] for [ROTATION] rotations",
          description: "turn a motor on for rotation"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: de
          },
          ROTATION: {
            type: r.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: "motorOn",
        text: o({
          id: "boost.motorOn",
          default: "turn motor [MOTOR_ID] on",
          description: "turn a motor on indefinitely"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: de
          }
        }
      }, {
        opcode: "motorOff",
        text: o({
          id: "boost.motorOff",
          default: "turn motor [MOTOR_ID] off",
          description: "turn a motor off"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: de
          }
        }
      }, {
        opcode: "setMotorPower",
        text: o({
          id: "boost.setMotorPower",
          default: "set motor [MOTOR_ID] speed to [POWER] %",
          description: "set the motor's speed without turning it on"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: be
          },
          POWER: {
            type: r.NUMBER,
            defaultValue: 100
          }
        }
      }, {
        opcode: "setMotorDirection",
        text: o({
          id: "boost.setMotorDirection",
          default: "set motor [MOTOR_ID] direction [MOTOR_DIRECTION]",
          description: "set the motor's turn direction without turning it on"
        }),
        blockType: i.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: r.STRING,
            menu: "MOTOR_ID",
            defaultValue: de
          },
          MOTOR_DIRECTION: {
            type: r.STRING,
            menu: "MOTOR_DIRECTION",
            defaultValue: ye
          }
        }
      }, {
        opcode: "getMotorPosition",
        text: o({
          id: "boost.getMotorPosition",
          default: "motor [MOTOR_REPORTER_ID] position",
          description: "the position returned by the motor"
        }),
        blockType: i.REPORTER,
        arguments: {
          MOTOR_REPORTER_ID: {
            type: r.STRING,
            menu: "MOTOR_REPORTER_ID",
            defaultValue: de
          }
        }
      }, {
        opcode: "whenColor",
        text: o({
          id: "boost.whenColor",
          default: "when [COLOR] brick seen",
          description: "check for when color"
        }),
        blockType: i.HAT,
        arguments: {
          COLOR: {
            type: r.STRING,
            menu: "COLOR",
            defaultValue: x
          }
        }
      }, {
        opcode: "seeingColor",
        text: o({
          id: "boost.seeingColor",
          default: "seeing [COLOR] brick?",
          description: "is the color sensor seeing a certain color?"
        }),
        blockType: i.BOOLEAN,
        arguments: {
          COLOR: {
            type: r.STRING,
            menu: "COLOR",
            defaultValue: x
          }
        }
      }, {
        opcode: "whenTilted",
        text: o({
          id: "boost.whenTilted",
          default: "when tilted [TILT_DIRECTION_ANY]",
          description: "check when tilted in a certain direction"
        }),
        func: "isTilted",
        blockType: i.HAT,
        arguments: {
          TILT_DIRECTION_ANY: {
            type: r.STRING,
            menu: "TILT_DIRECTION_ANY",
            defaultValue: ke
          }
        }
      }, {
        opcode: "getTiltAngle",
        text: o({
          id: "boost.getTiltAngle",
          default: "tilt angle [TILT_DIRECTION]",
          description: "the angle returned by the tilt sensor"
        }),
        blockType: i.REPORTER,
        arguments: {
          TILT_DIRECTION: {
            type: r.STRING,
            menu: "TILT_DIRECTION",
            defaultValue: ve
          }
        }
      }, {
        opcode: "setLightHue",
        text: o({
          id: "boost.setLightHue",
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
      }],
      menus: {
        MOTOR_ID: {
          acceptReporters: true,
          items: [{
            text: "A",
            value: de
          }, {
            text: "B",
            value: pe
          }, {
            text: "C",
            value: fe
          }, {
            text: "D",
            value: me
          }, {
            text: "AB",
            value: ge
          }, {
            text: "ABCD",
            value: be
          }]
        },
        MOTOR_REPORTER_ID: {
          acceptReporters: true,
          items: [{
            text: "A",
            value: de
          }, {
            text: "B",
            value: pe
          }, {
            text: "C",
            value: fe
          }, {
            text: "D",
            value: me
          }]
        },
        MOTOR_DIRECTION: {
          acceptReporters: true,
          items: [{
            text: o({
              id: "boost.motorDirection.forward",
              default: "this way",
              description: "label for forward element in motor direction menu for LEGO Boost extension"
            }),
            value: ye
          }, {
            text: o({
              id: "boost.motorDirection.backward",
              default: "that way",
              description: "label for backward element in motor direction menu for LEGO Boost extension"
            }),
            value: Ee
          }, {
            text: o({
              id: "boost.motorDirection.reverse",
              default: "reverse",
              description: "label for reverse element in motor direction menu for LEGO Boost extension"
            }),
            value: Te
          }]
        },
        TILT_DIRECTION: {
          acceptReporters: true,
          items: [{
            text: o({
              id: "boost.tiltDirection.up",
              default: "up",
              description: "label for up element in tilt direction menu for LEGO Boost extension"
            }),
            value: ve
          }, {
            text: o({
              id: "boost.tiltDirection.down",
              default: "down",
              description: "label for down element in tilt direction menu for LEGO Boost extension"
            }),
            value: Ae
          }, {
            text: o({
              id: "boost.tiltDirection.left",
              default: "left",
              description: "label for left element in tilt direction menu for LEGO Boost extension"
            }),
            value: we
          }, {
            text: o({
              id: "boost.tiltDirection.right",
              default: "right",
              description: "label for right element in tilt direction menu for LEGO Boost extension"
            }),
            value: Se
          }]
        },
        TILT_DIRECTION_ANY: {
          acceptReporters: true,
          items: [{
            text: o({
              id: "boost.tiltDirection.up",
              default: "up"
            }),
            value: ve
          }, {
            text: o({
              id: "boost.tiltDirection.down",
              default: "down"
            }),
            value: Ae
          }, {
            text: o({
              id: "boost.tiltDirection.left",
              default: "left"
            }),
            value: we
          }, {
            text: o({
              id: "boost.tiltDirection.right",
              default: "right"
            }),
            value: Se
          }, {
            text: o({
              id: "boost.tiltDirection.any",
              default: "any",
              description: "label for any element in tilt direction menu for LEGO Boost extension"
            }),
            value: ke
          }]
        },
        COLOR: {
          acceptReporters: true,
          items: [{
            text: o({
              id: "boost.color.red",
              default: "red",
              description: "the color red"
            }),
            value: C
          }, {
            text: o({
              id: "boost.color.blue",
              default: "blue",
              description: "the color blue"
            }),
            value: P
          }, {
            text: o({
              id: "boost.color.green",
              default: "green",
              description: "the color green"
            }),
            value: L
          }, {
            text: o({
              id: "boost.color.yellow",
              default: "yellow",
              description: "the color yellow"
            }),
            value: D
          }, {
            text: o({
              id: "boost.color.white",
              default: "white",
              desription: "the color white"
            }),
            value: B
          }, {
            text: o({
              id: "boost.color.black",
              default: "black",
              description: "the color black"
            }),
            value: U
          }, {
            text: o({
              id: "boost.color.any",
              default: "any color",
              description: "any color"
            }),
            value: x
          }]
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
  motorOnForRotation(e) {
    let t = s.toNumber(e.ROTATION) * 360;
    const n = Math.sign(t);
    t = Math.abs(u.clamp(t, -360000, 360000));
    const r = [];
    this._forEachMotor(e.MOTOR_ID, e => {
      r.push(e);
    });
    const i = r.map(e => {
      const r = this._peripheral.motor(e);
      if (r) {
        if (r.power === 0) {
          return Promise.resolve();
        } else {
          return new Promise(e => {
            r.turnOnForDegrees(t, n);
            r.pendingRotationPromise = e;
          });
        }
      } else {
        return null;
      }
    });
    return Promise.all(i).then(() => {});
  }
  motorOn(e) {
    this._forEachMotor(e.MOTOR_ID, e => {
      const t = this._peripheral.motor(e);
      if (t) {
        t.turnOnForever();
      }
    });
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, m);
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
      }, m);
    });
  }
  setMotorPower(e) {
    this._forEachMotor(e.MOTOR_ID, t => {
      const n = this._peripheral.motor(t);
      if (n) {
        n.power = u.clamp(s.toNumber(e.POWER), 0, 100);
        switch (n.status) {
          case se:
            n.turnOnForever();
            break;
          case oe:
            n.turnOnFor(n.pendingDurationTimeoutStartTime + n.pendingDurationTimeoutDelay - Date.now());
        }
      }
    });
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, m);
    });
  }
  setMotorDirection(e) {
    this._forEachMotor(e.MOTOR_ID, t => {
      const n = this._peripheral.motor(t);
      if (n) {
        switch (e.MOTOR_DIRECTION) {
          case ye:
            n.direction = 1;
            break;
          case Ee:
            n.direction = -1;
            break;
          case Te:
            n.direction = -n.direction;
            break;
          default:
            d.warn(`Unknown motor direction in setMotorDirection: ${e.DIRECTION}`);
        }
        if (n) {
          switch (n.status) {
            case se:
              n.turnOnForever();
              break;
            case oe:
              n.turnOnFor(n.pendingDurationTimeoutStartTime + n.pendingDurationTimeoutDelay - Date.now());
          }
        }
      }
    });
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, m);
    });
  }
  getMotorPosition(e) {
    let t = null;
    switch (e.MOTOR_REPORTER_ID) {
      case de:
        t = R.A;
        break;
      case pe:
        t = R.B;
        break;
      case fe:
        t = R.C;
        break;
      case me:
        t = R.D;
        break;
      default:
        d.warn("Asked for a motor position that doesnt exist!");
        return false;
    }
    if (t !== null && this._peripheral.motor(t)) {
      let e = this._peripheral.motor(t).position;
      if (t === R.A) {
        e *= -1;
      }
      return u.wrapClamp(e, 0, 360);
    }
    return 0;
  }
  _forEachMotor(e, t) {
    let n;
    switch (e) {
      case de:
        n = [R.A];
        break;
      case pe:
        n = [R.B];
        break;
      case fe:
        n = [R.C];
        break;
      case me:
        n = [R.D];
        break;
      case ge:
        n = [R.A, R.B];
        break;
      case be:
        n = [R.A, R.B, R.C, R.D];
        break;
      default:
        d.warn(`Invalid motor ID: ${e}`);
        n = [];
    }
    for (const e of n) {
      t(e);
    }
  }
  whenTilted(e) {
    return this._isTilted(e.TILT_DIRECTION_ANY);
  }
  isTilted(e) {
    return this._isTilted(e.TILT_DIRECTION_ANY);
  }
  getTiltAngle(e) {
    return this._getTiltAngle(e.TILT_DIRECTION);
  }
  _isTilted(e) {
    if (e === ke) {
      return Math.abs(this._peripheral.tiltX) >= Ie.TILT_THRESHOLD || Math.abs(this._peripheral.tiltY) >= Ie.TILT_THRESHOLD;
    } else {
      return this._getTiltAngle(e) >= Ie.TILT_THRESHOLD;
    }
  }
  _getTiltAngle(e) {
    switch (e) {
      case ve:
        if (this._peripheral.tiltY > 90) {
          return 256 - this._peripheral.tiltY;
        } else {
          return -this._peripheral.tiltY;
        }
      case Ae:
        if (this._peripheral.tiltY > 90) {
          return this._peripheral.tiltY - 256;
        } else {
          return this._peripheral.tiltY;
        }
      case we:
        if (this._peripheral.tiltX > 90) {
          return this._peripheral.tiltX - 256;
        } else {
          return this._peripheral.tiltX;
        }
      case Se:
        if (this._peripheral.tiltX > 90) {
          return 256 - this._peripheral.tiltX;
        } else {
          return -this._peripheral.tiltX;
        }
      default:
        d.warn(`Unknown tilt direction in _getTiltAngle: ${e}`);
    }
  }
  whenColor(e) {
    if (e.COLOR === x) {
      return this._peripheral.color !== M && this._peripheral.color !== this._peripheral.previousColor;
    } else {
      return e.COLOR === this._peripheral.color;
    }
  }
  seeingColor(e) {
    if (e.COLOR === x) {
      return this._peripheral.color !== M;
    } else {
      return e.COLOR === this._peripheral.color;
    }
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
    this._peripheral._led = t;
    this._peripheral.setLED(i);
    return new Promise(e => {
      window.setTimeout(() => {
        e();
      }, m);
    });
  }
}
module.exports = Ie;