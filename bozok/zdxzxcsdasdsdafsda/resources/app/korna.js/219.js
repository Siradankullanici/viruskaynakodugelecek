const r = require("./3.js");
const i = require("./2.js");
const s = require("./1.js");
const o = require("./5.js");
const a = require("./7.js");
const c = require("./220.js");
const l = require("./16.js");
const u = require("./4.js");
const h = require("./41.js");
const d = require("./0.js");
const p = 129;
const f = 130;
const m = 131;
const g = 225;
const b = 32;
const y = 96;
const E = 0;
const T = 128;
const v = 2;
const A = 175;
const w = 163;
const S = 179;
const k = 148;
const I = 1;
const O = 0;
const N = 152;
const R = 157;
const x = 0;
const M = 0;
const C = 1;
const P = 50;
const L = 0;
const D = 32;
const B = {
  29: "color",
  30: "ultrasonic",
  32: "gyro",
  16: "touch",
  8: "mediumMotor",
  7: "largeMotor",
  126: "none",
  125: "none"
};
const U = {
  touch: 0,
  color: 1,
  ultrasonic: 1,
  none: 0
};
const F = {
  touch: "button",
  color: "brightness",
  ultrasonic: "distance"
};
class j {
  constructor(e, t, n) {
    this._parent = e;
    this._index = t;
    this._type = n;
    this._direction = 1;
    this._power = 50;
    this._position = 0;
    this._commandID = null;
    this._coastDelay = 1000;
  }
  get type() {
    return this._type;
  }
  set type(e) {
    this._type = e;
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
    this._power = e;
  }
  get position() {
    return this._position;
  }
  set position(e) {
    let t = e[0] + e[1] * 256 + e[2] * 256 * 256 + e[3] * 256 * 256 * 256;
    if (t > 2147483647) {
      t -= 4294967296;
    }
    this._position = t;
  }
  turnOnFor(e) {
    if (this._power === 0) {
      return;
    }
    const t = this._portMask(this._index);
    let n = e;
    let r = this._power * this._direction;
    const i = P;
    let s = [];
    s[0] = A;
    if (r < 0) {
      r *= -1;
      n *= -1;
    }
    const o = n < 0 ? 256 - r : r;
    n = Math.abs(n);
    let a = i;
    let c = i;
    let l = n - i * 2;
    if (l < 0) {
      a = Math.floor(n / 2);
      l = 0;
      c = n - a;
    }
    const u = this._runValues(l);
    s = s.concat([x, t, p, o & 255, p, a]).concat(u.concat([p, c, C]));
    const h = this._parent.generateCommand(T, s);
    this._parent.send(h);
    this.coastAfter(e);
  }
  coastAfter(e) {
    if (this._power === 0) {
      return;
    }
    const t = a();
    this._commandID = t;
    setTimeout(() => {
      if (this._commandID === t) {
        this.coast();
        this._commandID = null;
      }
    }, e + this._coastDelay);
  }
  coast() {
    if (this._power === 0) {
      return;
    }
    const e = this._parent.generateCommand(T, [w, x, this._portMask(this._index), M]);
    this._parent.send(e, false);
  }
  _runValues(e) {
    if (e < 32767) {
      return [f, e & 255, e >> 8 & 255];
    } else {
      return [m, e & 255, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255];
    }
  }
  _portMask(e) {
    return Math.pow(2, e);
  }
}
class z {
  constructor(e, t) {
    this._runtime = e;
    this._runtime.on("PROJECT_STOP_ALL", this.stopAll.bind(this));
    this._extensionId = t;
    this._sensorPorts = [];
    this._motorPorts = [];
    this._sensors = {
      distance: 0,
      brightness: 0,
      buttons: [0, 0, 0, 0]
    };
    this._motors = [null, null, null, null];
    this._pollingInterval = 150;
    this._pollingIntervalID = null;
    this._pollingCounter = 0;
    this._bt = null;
    this._runtime.registerPeripheralExtension(t, this);
    this._rateLimiter = new h(40);
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._pollValues = this._pollValues.bind(this);
  }
  get distance() {
    let e = this._sensors.distance > 100 ? 100 : this._sensors.distance;
    e = e < 0 ? 0 : e;
    e = Math.round(e * 100) / 100;
    return e;
  }
  get brightness() {
    return this._sensors.brightness;
  }
  motor(e) {
    return this._motors[e];
  }
  isButtonPressed(e) {
    return this._sensors.buttons[e] === 1;
  }
  beep(e, t) {
    const n = this.generateCommand(T, [k, I, p, 2, f, e, e >> 8, f, t, t >> 8]);
    this.send(n);
  }
  stopAll() {
    this.stopAllMotors();
    this.stopSound();
  }
  stopSound() {
    const e = this.generateCommand(T, [k, O]);
    this.send(e, false);
  }
  stopAllMotors() {
    this._motors.forEach(e => {
      if (e) {
        e.coast();
      }
    });
  }
  scan() {
    if (this._bt) {
      this._bt.disconnect();
    }
    this._bt = new c(this._runtime, this._extensionId, {
      majorDeviceClass: 8,
      minorDeviceClass: 1
    }, this._onConnect, this.reset, this._onMessage);
  }
  connect(e) {
    if (this._bt) {
      this._bt.connectPeripheral(e, "1234");
    }
  }
  disconnect() {
    if (this._bt) {
      this._bt.disconnect();
    }
    this.reset();
  }
  reset() {
    this._sensorPorts = [];
    this._motorPorts = [];
    this._sensors = {
      distance: 0,
      brightness: 0,
      buttons: [0, 0, 0, 0]
    };
    this._motors = [null, null, null, null];
    if (this._pollingIntervalID) {
      window.clearInterval(this._pollingIntervalID);
      this._pollingIntervalID = null;
    }
  }
  isConnected() {
    let e = false;
    if (this._bt) {
      e = this._bt.isConnected();
    }
    return e;
  }
  send(e) {
    let t = !(arguments.length > 1) || arguments[1] === undefined || arguments[1];
    if (this.isConnected()) {
      if (t && !this._rateLimiter.okayToSend()) {
        return Promise.resolve();
      } else {
        return this._bt.sendMessage({
          message: l.uint8ArrayToBase64(e),
          encoding: "base64"
        });
      }
    } else {
      return Promise.resolve();
    }
  }
  generateCommand(e, t, n = 0) {
    let r = [];
    r[2] = 0;
    r[3] = 0;
    r[4] = e;
    r[5] = n & 255;
    r[6] = n >> 8 && 255;
    r = r.concat(t);
    const i = r.length - 2;
    r[0] = i & 255;
    r[1] = i >> 8 && 255;
    return r;
  }
  _onConnect() {
    this._pollingIntervalID = window.setInterval(this._pollValues, this._pollingInterval);
  }
  _pollValues() {
    if (!this.isConnected()) {
      window.clearInterval(this._pollingIntervalID);
      return;
    }
    const e = [];
    let t = 0;
    let n = 0;
    if (this._pollingCounter % 20 == 0) {
      e[0] = N;
      e[1] = p;
      e[2] = D;
      e[3] = y;
      e[4] = g;
      e[5] = b;
      t = 33;
      this._updateDevices = true;
    } else {
      let r = 0;
      for (let t = 0; t < 4; t++) {
        if (this._sensorPorts[t] !== "none") {
          e[r + 0] = R;
          e[r + 1] = x;
          e[r + 2] = t;
          e[r + 3] = L;
          e[r + 4] = U[this._sensorPorts[t]];
          e[r + 5] = g;
          e[r + 6] = n * 4;
          r += 7;
        }
        n++;
      }
      for (let t = 0; t < 4; t++) {
        e[r + 0] = S;
        e[r + 1] = x;
        e[r + 2] = t;
        e[r + 3] = g;
        e[r + 4] = n * 4;
        r += 5;
        n++;
      }
      t = n * 4;
    }
    const r = this.generateCommand(E, e, t);
    this.send(r);
    this._pollingCounter++;
  }
  _onMessage(e) {
    const t = e.message;
    const n = l.base64ToUint8Array(t);
    if (n[4] === v) {
      if (this._updateDevices) {
        for (let e = 0; e < 4; e++) {
          const t = B[n[e + 5]];
          this._sensorPorts[e] = t || "none";
        }
        for (let e = 0; e < 4; e++) {
          const t = B[n[e + 21]];
          this._motorPorts[e] = t || "none";
        }
        for (let e = 0; e < 4; e++) {
          const t = this._motorPorts[e];
          if (t !== "none" && !this._motors[e]) {
            this._motors[e] = new j(this, e, t);
          }
          if (t === "none" && this._motors[e]) {
            this._motors[e] = null;
          }
        }
        this._updateDevices = false;
      } else if (!this._sensorPorts.includes(undefined) && !this._motorPorts.includes(undefined)) {
        let e = 5;
        for (let t = 0; t < 4; t++) {
          const r = new Uint8Array([n[e], n[e + 1], n[e + 2], n[e + 3]]).buffer;
          const i = new DataView(r).getFloat32(0, true);
          if (F[this._sensorPorts[t]] === "button") {
            this._sensors.buttons[t] = i || 0;
          } else if (F[this._sensorPorts[t]]) {
            this._sensors[F[this._sensorPorts[t]]] = i || 0;
          }
          e += 4;
        }
        for (let t = 0; t < 4; t++) {
          const r = [n[e], n[e + 1], n[e + 2], n[e + 3]];
          if (this._motors[t]) {
            this._motors[t].position = r;
          }
          e += 4;
        }
      }
    }
  }
}
const G = ["A", "B", "C", "D"];
const V = ["1", "2", "3", "4"];
class _ {
  static get EXTENSION_ID() {
    return "ev3";
  }
  constructor(e) {
    this.runtime = e;
    this._peripheral = new z(this.runtime, _.EXTENSION_ID);
    this._playNoteForPicker = this._playNoteForPicker.bind(this);
    this.runtime.on("PLAY_NOTE", this._playNoteForPicker);
  }
  getInfo() {
    return {
      id: _.EXTENSION_ID,
      name: "LEGO EV3",
      blockIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48dGl0bGU+ZXYzLWJsb2NrLWljb248L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS41IDMuNSkiPjxyZWN0IHdpZHRoPSIyOCIgaGVpZ2h0PSIyNS44MSIgeD0iLjUiIHk9IjMuNTkiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzdjODdhNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiByeD0iMSIvPjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIzMiIgeD0iMi41IiB5PSIuNSIgZmlsbD0iI2U2ZTdlOCIgc3Ryb2tlPSIjN2M4N2E1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHJ4PSIxIi8+PHBhdGggZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjN2M4N2E1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0yLjUgMTQuNWgyNHYxM2gtMjR6Ii8+PHBhdGggZmlsbD0iI2U2ZTdlOCIgc3Ryb2tlPSIjN2M4N2E1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0xNC41IDEwLjV2NCIvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iNC41IiB5PSIyLjUiIGZpbGw9IiM0MTQ3NTciIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMiIgeD0iMTMuNSIgeT0iMjAuMTMiIGZpbGw9IiM3Yzg3YTUiIG9wYWNpdHk9Ii41IiByeD0iLjUiLz48cGF0aCBmaWxsPSIjN2M4N2E1IiBkPSJNOS4wNiAyMC4xM2gxLjVhLjUuNSAwIDAgMSAuNS41djFhLjUuNSAwIDAgMS0uNS41aC0xLjVhMSAxIDAgMCAxIDAtMk0xOS45MyAyMi4xM2gtMS41MWEuNS41IDAgMCAxLS41LS41di0xYS41LjUgMCAwIDEgLjUtLjVoMS41YTEgMSAwIDAgMSAuMDEgMk04LjIzIDE3LjVINWEuNS41IDAgMCAxLS41LS41di0yLjVoNmwtMS44NSAyLjc4YS41MS41MSAwIDAgMS0uNDIuMjJNMTguMTUgMTguODVsLS41LjVhLjUuNSAwIDAgMC0uMTUuMzZWMjBhLjUuNSAwIDAgMS0uNS41aC0uNWEuNS41IDAgMCAxLS41LS41LjUuNSAwIDAgMC0uNS0uNWgtMmEuNS41IDAgMCAwLS41LjUuNS41IDAgMCAxLS41LjVIMTJhLjUuNSAwIDAgMS0uNS0uNXYtLjI5YS41LjUgMCAwIDAtLjE1LS4zNmwtLjUtLjVhLjUxLjUxIDAgMCAxIDAtLjcxbDEuNTEtMS40OWEuNDcuNDcgMCAwIDEgLjM1LS4xNWgzLjU4YS40Ny40NyAwIDAgMSAuMzUuMTVsMS41MSAxLjQ5YS41MS41MSAwIDAgMSAwIC43MU0xMC44NSAyMy40NWwuNS0uNWEuNS41IDAgMCAwIC4xNS0uMzZ2LS4yOWEuNS41IDAgMCAxIC41LS41aC41YS41LjUgMCAwIDEgLjUuNS41LjUgMCAwIDAgLjUuNWgyYS41LjUgMCAwIDAgLjUtLjUuNS41IDAgMCAxIC41LS41aC41YS41LjUgMCAwIDEgLjUuNXYuMjlhLjUuNSAwIDAgMCAuMTUuMzZsLjUuNWEuNS41IDAgMCAxIDAgLjdsLTEuNTEgMS41YS40Ny40NyAwIDAgMS0uMzUuMTVoLTMuNThhLjQ3LjQ3IDAgMCAxLS4zNS0uMTVsLTEuNTEtMS41YS41LjUgMCAwIDEgMC0uNyIgb3BhY2l0eT0iLjUiLz48cGF0aCBmaWxsPSIjZjE1YTI5IiBzdHJva2U9IiNjYzRjMjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTIxLjUgMjcuNWg1djRhMSAxIDAgMCAxLTEgMWgtNHoiLz48L2c+PC9zdmc+",
      showStatusButton: true,
      blocks: [{
        opcode: "motorTurnClockwise",
        text: o({
          id: "ev3.motorTurnClockwise",
          default: "motor [PORT] turn this way for [TIME] seconds",
          description: "turn a motor clockwise for some time"
        }),
        blockType: i.COMMAND,
        arguments: {
          PORT: {
            type: r.STRING,
            menu: "motorPorts",
            defaultValue: 0
          },
          TIME: {
            type: r.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: "motorTurnCounterClockwise",
        text: o({
          id: "ev3.motorTurnCounterClockwise",
          default: "motor [PORT] turn that way for [TIME] seconds",
          description: "turn a motor counter-clockwise for some time"
        }),
        blockType: i.COMMAND,
        arguments: {
          PORT: {
            type: r.STRING,
            menu: "motorPorts",
            defaultValue: 0
          },
          TIME: {
            type: r.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: "motorSetPower",
        text: o({
          id: "ev3.motorSetPower",
          default: "motor [PORT] set power [POWER] %",
          description: "set a motor's power to some value"
        }),
        blockType: i.COMMAND,
        arguments: {
          PORT: {
            type: r.STRING,
            menu: "motorPorts",
            defaultValue: 0
          },
          POWER: {
            type: r.NUMBER,
            defaultValue: 100
          }
        }
      }, {
        opcode: "getMotorPosition",
        text: o({
          id: "ev3.getMotorPosition",
          default: "motor [PORT] position",
          description: "get the measured degrees a motor has turned"
        }),
        blockType: i.REPORTER,
        arguments: {
          PORT: {
            type: r.STRING,
            menu: "motorPorts",
            defaultValue: 0
          }
        }
      }, {
        opcode: "whenButtonPressed",
        text: o({
          id: "ev3.whenButtonPressed",
          default: "when button [PORT] pressed",
          description: "when a button connected to a port is pressed"
        }),
        blockType: i.HAT,
        arguments: {
          PORT: {
            type: r.STRING,
            menu: "sensorPorts",
            defaultValue: 0
          }
        }
      }, {
        opcode: "whenDistanceLessThan",
        text: o({
          id: "ev3.whenDistanceLessThan",
          default: "when distance < [DISTANCE]",
          description: "when the value measured by the distance sensor is less than some value"
        }),
        blockType: i.HAT,
        arguments: {
          DISTANCE: {
            type: r.NUMBER,
            defaultValue: 5
          }
        }
      }, {
        opcode: "whenBrightnessLessThan",
        text: o({
          id: "ev3.whenBrightnessLessThan",
          default: "when brightness < [DISTANCE]",
          description: "when value measured by brightness sensor is less than some value"
        }),
        blockType: i.HAT,
        arguments: {
          DISTANCE: {
            type: r.NUMBER,
            defaultValue: 50
          }
        }
      }, {
        opcode: "buttonPressed",
        text: o({
          id: "ev3.buttonPressed",
          default: "button [PORT] pressed?",
          description: "is a button on some port pressed?"
        }),
        blockType: i.BOOLEAN,
        arguments: {
          PORT: {
            type: r.STRING,
            menu: "sensorPorts",
            defaultValue: 0
          }
        }
      }, {
        opcode: "getDistance",
        text: o({
          id: "ev3.getDistance",
          default: "distance",
          description: "gets measured distance"
        }),
        blockType: i.REPORTER
      }, {
        opcode: "getBrightness",
        text: o({
          id: "ev3.getBrightness",
          default: "brightness",
          description: "gets measured brightness"
        }),
        blockType: i.REPORTER
      }, {
        opcode: "beep",
        text: o({
          id: "ev3.beepNote",
          default: "beep note [NOTE] for [TIME] secs",
          description: "play some note on EV3 for some time"
        }),
        blockType: i.COMMAND,
        arguments: {
          NOTE: {
            type: r.NOTE,
            defaultValue: 60
          },
          TIME: {
            type: r.NUMBER,
            defaultValue: 0.5
          }
        }
      }],
      menus: {
        motorPorts: {
          acceptReporters: true,
          items: this._formatMenu(G)
        },
        sensorPorts: {
          acceptReporters: true,
          items: this._formatMenu(V)
        }
      }
    };
  }
  motorTurnClockwise(e) {
    const t = s.toNumber(e.PORT);
    let n = s.toNumber(e.TIME) * 1000;
    n = u.clamp(n, 0, 15000);
    return new Promise(e => {
      this._forEachMotor(t, e => {
        const t = this._peripheral.motor(e);
        if (t) {
          t.direction = 1;
          t.turnOnFor(n);
        }
      });
      setTimeout(e, n);
    });
  }
  motorTurnCounterClockwise(e) {
    const t = s.toNumber(e.PORT);
    let n = s.toNumber(e.TIME) * 1000;
    n = u.clamp(n, 0, 15000);
    return new Promise(e => {
      this._forEachMotor(t, e => {
        const t = this._peripheral.motor(e);
        if (t) {
          t.direction = -1;
          t.turnOnFor(n);
        }
      });
      setTimeout(e, n);
    });
  }
  motorSetPower(e) {
    const t = s.toNumber(e.PORT);
    const n = u.clamp(s.toNumber(e.POWER), 0, 100);
    this._forEachMotor(t, e => {
      const t = this._peripheral.motor(e);
      if (t) {
        t.power = n;
      }
    });
  }
  getMotorPosition(e) {
    const t = s.toNumber(e.PORT);
    if (![0, 1, 2, 3].includes(t)) {
      return;
    }
    const n = this._peripheral.motor(t);
    let r = 0;
    if (n) {
      r = u.wrapClamp(n.position, 0, 360);
    }
    return r;
  }
  whenButtonPressed(e) {
    const t = s.toNumber(e.PORT);
    if ([0, 1, 2, 3].includes(t)) {
      return this._peripheral.isButtonPressed(t);
    }
  }
  whenDistanceLessThan(e) {
    const t = u.clamp(s.toNumber(e.DISTANCE), 0, 100);
    return this._peripheral.distance < t;
  }
  whenBrightnessLessThan(e) {
    const t = u.clamp(s.toNumber(e.DISTANCE), 0, 100);
    return this._peripheral.brightness < t;
  }
  buttonPressed(e) {
    const t = s.toNumber(e.PORT);
    if ([0, 1, 2, 3].includes(t)) {
      return this._peripheral.isButtonPressed(t);
    }
  }
  getDistance() {
    return this._peripheral.distance;
  }
  getBrightness() {
    return this._peripheral.brightness;
  }
  _playNoteForPicker(e, t) {
    if (t === this.getInfo().name) {
      this.beep({
        NOTE: e,
        TIME: 0.25
      });
    }
  }
  beep(e) {
    const t = u.clamp(s.toNumber(e.NOTE), 47, 99);
    let n = s.toNumber(e.TIME) * 1000;
    n = u.clamp(n, 0, 3000);
    if (n !== 0) {
      return new Promise(e => {
        const r = Math.pow(2, (t - 69 + 12) / 12) * 440;
        this._peripheral.beep(r, n);
        setTimeout(e, n);
      });
    }
  }
  _forEachMotor(e, t) {
    let n;
    switch (e) {
      case 0:
        n = [0];
        break;
      case 1:
        n = [1];
        break;
      case 2:
        n = [2];
        break;
      case 3:
        n = [3];
        break;
      default:
        d.warn(`Invalid motor ID: ${e}`);
        n = [];
    }
    for (const e of n) {
      t(e);
    }
  }
  _formatMenu(e) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = {
        text: e[n]
      };
      r.value = n.toString();
      t.push(r);
    }
    return t;
  }
}
module.exports = _;