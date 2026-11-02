const r = require("./3.js");
const i = require("./2.js");
const s = require("./0.js");
const o = require("./5.js");
const a = require("./4.js");
const c = require("./30.js");
const l = require("./224.js");
const u = require("./225.js");
const h = {
  service: "d91714ef-28b9-4f91-ba16-f0d9a604f112",
  commandChar: "f4bf14a6-c7d5-4b6d-8aa8-df1a7c83adcb",
  responseChar: "b41e6675-a329-40e0-aa01-44d2f444babe"
};
const d = "Force and Acceleration extension stopped receiving data";
const p = 1;
const f = 2;
const m = 3;
const g = 4;
const b = 5;
const y = 6;
const E = 7;
class T {
  constructor(e, t) {
    this._runtime = e;
    this._ble = null;
    this._device = null;
    this._runtime.registerPeripheralExtension(t, this);
    this._extensionId = t;
    this._sensors = {
      force: 0,
      accelerationX: 0,
      accelerationY: 0,
      accelerationZ: 0,
      spinSpeedX: 0,
      spinSpeedY: 0,
      spinSpeedZ: 0
    };
    this._timeoutID = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
  }
  scan() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this._ble = new c(this._runtime, this._extensionId, {
      filters: [{
        namePrefix: "GDX-FOR"
      }],
      optionalServices: [h.service]
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
    this._sensors = {
      force: 0,
      accelerationX: 0,
      accelerationY: 0,
      accelerationZ: 0,
      spinSpeedX: 0,
      spinSpeedY: 0,
      spinSpeedZ: 0
    };
    if (this._timeoutID) {
      window.clearInterval(this._timeoutID);
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
  _onConnect() {
    const e = new u(this._ble, h);
    l.createDevice(e, {
      open: true,
      startMeasurements: false
    }).then(e => {
      this._device = e;
      this._device.keepValues = false;
      this._device.sensors.forEach(e => {
        e.setEnabled(true);
      });
      this._device.on("measurements-started", () => {
        this._device.sensors.filter(e => e.enabled).forEach(e => {
          e.on("value-changed", e => {
            this._onSensorValueChanged(e);
          });
        });
        this._timeoutID = window.setInterval(() => this._ble.handleDisconnectError(d), 4500);
      });
      this._device.start(80);
    });
  }
  _onSensorValueChanged(e) {
    switch (e.number) {
      case p:
        this._sensors.force = a.clamp(e.value * 2, -100, 100);
        break;
      case f:
        this._sensors.accelerationX = e.value;
        break;
      case m:
        this._sensors.accelerationY = e.value;
        break;
      case g:
        this._sensors.accelerationZ = e.value;
        break;
      case b:
        this._sensors.spinSpeedX = this._spinSpeedFromGyro(e.value);
        break;
      case y:
        this._sensors.spinSpeedY = this._spinSpeedFromGyro(e.value);
        break;
      case E:
        this._sensors.spinSpeedZ = this._spinSpeedFromGyro(e.value);
    }
    window.clearInterval(this._timeoutID);
    this._timeoutID = window.setInterval(() => this._ble.handleDisconnectError(d), 4500);
  }
  _spinSpeedFromGyro(e) {
    const t = 1000 / this._runtime.currentStepTime;
    e = a.radToDeg(e);
    e /= t;
    return e *= -1;
  }
  getForce() {
    return this._sensors.force;
  }
  getTiltFrontBack(e = false) {
    const t = this.getAccelerationX();
    const n = this.getAccelerationY();
    const r = this.getAccelerationZ();
    let i = n * n + r * r;
    i = Math.sqrt(i);
    if (i < 0.35) {
      i = t < 0 ? 90 : -90;
    } else {
      i = t / i;
      i = Math.atan(i);
      i = a.radToDeg(i) * -1;
    }
    if (e) {
      i *= -1;
    }
    return i;
  }
  getTiltLeftRight(e = false) {
    const t = this.getAccelerationX();
    const n = this.getAccelerationY();
    const r = this.getAccelerationZ();
    let i = t * t + r * r;
    i = Math.sqrt(i);
    if (i < 0.35) {
      i = n < 0 ? 90 : -90;
    } else {
      i = n / i;
      i = Math.atan(i);
      i = a.radToDeg(i) * -1;
    }
    if (e) {
      i *= -1;
    }
    return i;
  }
  getAccelerationX() {
    return this._sensors.accelerationX;
  }
  getAccelerationY() {
    return this._sensors.accelerationY;
  }
  getAccelerationZ() {
    return this._sensors.accelerationZ;
  }
  getSpinSpeedX() {
    return this._sensors.spinSpeedX;
  }
  getSpinSpeedY() {
    return this._sensors.spinSpeedY;
  }
  getSpinSpeedZ() {
    return this._sensors.spinSpeedZ;
  }
}
const v = "pushed";
const A = "pulled";
const w = "shaken";
const S = "started falling";
const k = "turned face up";
const I = "turned face down";
const O = "front";
const N = "back";
const R = "left";
const x = "right";
const M = "any";
const C = "x";
const P = "y";
const L = "z";
class D {
  static get EXTENSION_NAME() {
    return "Force and Acceleration";
  }
  static get EXTENSION_ID() {
    return "gdxfor";
  }
  get AXIS_MENU() {
    return [{
      text: "x",
      value: C
    }, {
      text: "y",
      value: P
    }, {
      text: "z",
      value: L
    }];
  }
  get TILT_MENU() {
    return [{
      text: o({
        id: "gdxfor.tiltDirectionMenu.front",
        default: "front",
        description: "label for front element in tilt direction picker for gdxfor extension"
      }),
      value: O
    }, {
      text: o({
        id: "gdxfor.tiltDirectionMenu.back",
        default: "back",
        description: "label for back element in tilt direction picker for gdxfor extension"
      }),
      value: N
    }, {
      text: o({
        id: "gdxfor.tiltDirectionMenu.left",
        default: "left",
        description: "label for left element in tilt direction picker for gdxfor extension"
      }),
      value: R
    }, {
      text: o({
        id: "gdxfor.tiltDirectionMenu.right",
        default: "right",
        description: "label for right element in tilt direction picker for gdxfor extension"
      }),
      value: x
    }];
  }
  get TILT_MENU_ANY() {
    return [...this.TILT_MENU, {
      text: o({
        id: "gdxfor.tiltDirectionMenu.any",
        default: "any",
        description: "label for any direction element in tilt direction picker for gdxfor extension"
      }),
      value: M
    }];
  }
  get PUSH_PULL_MENU() {
    return [{
      text: o({
        id: "gdxfor.pushed",
        default: "pushed",
        description: "the force sensor was pushed inward"
      }),
      value: v
    }, {
      text: o({
        id: "gdxfor.pulled",
        default: "pulled",
        description: "the force sensor was pulled outward"
      }),
      value: A
    }];
  }
  get GESTURE_MENU() {
    return [{
      text: o({
        id: "gdxfor.shaken",
        default: "shaken",
        description: "the sensor was shaken"
      }),
      value: w
    }, {
      text: o({
        id: "gdxfor.startedFalling",
        default: "started falling",
        description: "the sensor started free falling"
      }),
      value: S
    }, {
      text: o({
        id: "gdxfor.turnedFaceUp",
        default: "turned face up",
        description: "the sensor was turned to face up"
      }),
      value: k
    }, {
      text: o({
        id: "gdxfor.turnedFaceDown",
        default: "turned face down",
        description: "the sensor was turned to face down"
      }),
      value: I
    }];
  }
  constructor(e) {
    this.runtime = e;
    this._peripheral = new T(this.runtime, D.EXTENSION_ID);
  }
  getInfo() {
    return {
      id: D.EXTENSION_ID,
      name: D.EXTENSION_NAME,
      blockIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAABVNJREFUeNrtnH9MG1UcwMuIiWMaE7c5ptkUhyQaEzWLi8aE+BfRPxbjEowxipMlisxlTFAY9JAQoNfyG/wRGQyH9uj6AyiFzblRuohzxCmYjZ9tZaNlEGPUaNTEQZ/vW97Zs/bWwsKul3y/ySe8e+8Vvvn0vXv3jvY0NxJlHzuSSnihi9MJC1qdkagJyBlyr64+tUGjVGh5ow2SUTMgUTGBnE6YFxMp1XeSysYuUtnUHddAjpCrdCQqJlAiTypRFfKkEpUWKE1MFbA3On4EwrtbwRJSA2yWxJdAaUIv28fjEkm+KBAFytFziexvGyTv1neREr2JFBtM5J2GbpJL67K6LqLA65FtukAK622y566iWmtgn+kbFBiJV63f09F2PBD8Hbzwp1YvVJXXdj1S1ujYrtV1chxv/APaoM9e8wgKDCe/uS/4WipqrqCj43/bq+IGYQtt/4lC8pt6UaCUfaYL4q5gSfeBPVUjExUVnds4nXEJ+mabv0OBIrlHXeLom4n+N4Vp6Jv7yVkUKHKg5cyyQL3xTNT9t15wQt/9bU4UKPLmsS/Za4Xp6HeAhPHgCGzHEfgv2ce/JWz1/ZsQkqCRiUxCEmmfa7QvvAYFSimqsSxv9HnTQdnpy3cWQJ/CGguuwuEcODLAFhLBIy9Q8EKft1qdKDCcvZYRmMIBLW8MwDWfJiwqK21boR14zTqKAiNR0GQXR2FbhMXjKG2DPriVkyPn2JC4Gv+qCQuog7acjiEUKMcr3RdJicEU3A+XGUwZGhZQhrpi2kb7oMDrcfCjz9kljfE3rc78TGnNZ88ul43QhrezYrkrc7jGHByFUqCOtqHA2FbkUXLowxPksMEEQBnq8I403tJHgeoRWNhnJ64vngegjAJXQk7vV+R35x2EDGoAKEMdCoyV2v73QZwUqEOBsVLgOEGWBhNEeVCGOhS4Eo6cLCc/OzcDUF7d5ZB1lLz+6dfBOz35zQ5chWOV9XaTA/79CblIQYEyI0tWFscL5D2DiZTVmEl5vVU1AhUZWeGyKiJ8TlE9ApWXBahW4JpOw4qGaLLUL1BhWeoXqKAs9QuMLqtOVhYKZMexyEKBcgLZ8YrQNVtWAwoEZvsfhP3uqnDbd6JAr+NRsuhMXBVjPU+hQDwHosCbK3Cm72E4f60Jk/ZdKPBGmOh5AqcwTmEUiALx665RgFzjSiAkxOkFNX3hGnKOH4GiPE4FX/mHHFnOyguUPu6kVC+o56ET0tnCC/OKCYRHhkASaqZUJ1gVEwgP3uGqBAs8/kSND97heMFyyGxer1FnyJ9Tr84vRERs12CgQBSIAlEgBgpcC4HyoMAYdjb90eRxvNCHpqJHKiXth5nLozB1W1raXoBjyj2UBNQTPe4GYUPnzlWBwMtXfBMZGRk7UWLskQSykpOTHxJHIf05IpF4FyqKHltBVlZW1pNXZn3TINHt8bigjnErKgrFOjaqdlDup2xiddskEn0g8dTp0wVM4BbUxoLJSwtjo1SizWZ7AwROuT0DrP0+1LYcCeKq6/Z6z46PT3YzQSms/RY43r1nz+Mg0Ofz/8jaU1FdSGAa4PPP/UIlBdLT0x9jdUmU26Gcl5f3NAikU9nN2nagulCkgBS3x+sESQMDg0VwLOX8+WEDtF0aG7Owuu2oLRSbQUp7e/tLIMk/d/Uvp8vFZWZm7oIFhF4P6mj9NcpidV3dbibwTtQWikQ2JdOGh4drYRpTSBiLIFVyflyH2v4bt4EcoLW19cXJqamTs/65BXrO809MTvc2NjY+B22M9agrcmxg14FpMqSgvNim8yZ2nfcA417Kxnictv8ABNVN4ivCsdYAAAAASUVORK5CYII=",
      menuIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAAppJREFUeNrtmF1r01AYx6OI4CfQG2+88BMIXnjhy5V3XoikHZq+bCsKszChsS9Lk5WONFnbbSKIm5frSdLVrhWldm4qEzoVX5CpeCFeidsnENGZs/OEhcFaxtYl67noA394esp5+uuTf05ODrNdSGrx2JBcwK4pg1ZTqnGGaTeSMkoLqrYmqjoeuTPrqEhNADSTCkJtAw4pmijlilhUNMe7l8qXsEhqCxk0vGdA0MCDBXy1+tUJkVrPsVV3vwCvVb7gwXs1M67qZkw1zPDUvEkVYDQ7YyYyaE1SSqekseIF4q2//NisSQVgsPje8hSJA/a8fL5xBMYCpY+dB+xDb3B81Pi9dW5CNf4FjA+dB+TKyzhBvBcfR0fteZAnFM2E76jw4K27j82kvLmeQQ5j1NwkIfQax1Xjjz0PchijBpArfwYfmmKmkBPkwn24QWCMGkBQUH+HAQzUq73d2ULdfZJs0WL9EohOwOuPGvj/i4MgyOnsoPJkEtQ07n/4CYeml/DNqQUcmahaPhVHjf0HbIapwCKOE7Bdy1p1rG3WMMmTqu44YFsw6fFy02ZVyrkAGJ6c24CZ3w0MyH1AMWuAbzZgZraD6QigXazljz1DfvzKuNJSddTbecB6oQ+/1L0tVZsOdQ5wDgXxos7uSE8L/V1AG7BduQzo/Hsx1HQAUEZIUHXXThbg1ELIaCNtA6Zz2nH4t24Kzn8YtwOsUKk18K+VVUvV2tKuLl0XkHpAQUVnm7wla+cY2sLD8SmPn5cYWsPri15muciyJEmHqASEAySPj6+STuoMrUG6d9jji3z3+qMXqYFiOX6AdC5sfyb5BIEcpAawh+PPE8hvPcHoCbY/dpL48IcnEDvN0BTQMdYXWSH6yfpu33Cq7jqUK06WtbQJQQAAAABJRU5ErkJggg==",
      showStatusButton: true,
      blocks: [{
        opcode: "whenGesture",
        text: o({
          id: "gdxfor.whenGesture",
          default: "when [GESTURE]",
          description: "when the sensor detects a gesture"
        }),
        blockType: i.HAT,
        arguments: {
          GESTURE: {
            type: r.STRING,
            menu: "gestureOptions",
            defaultValue: w
          }
        }
      }, {
        opcode: "whenForcePushedOrPulled",
        text: o({
          id: "gdxfor.whenForcePushedOrPulled",
          default: "when force sensor [PUSH_PULL]",
          description: "when the force sensor is pushed or pulled"
        }),
        blockType: i.HAT,
        arguments: {
          PUSH_PULL: {
            type: r.STRING,
            menu: "pushPullOptions",
            defaultValue: v
          }
        }
      }, {
        opcode: "getForce",
        text: o({
          id: "gdxfor.getForce",
          default: "force",
          description: "gets force"
        }),
        blockType: i.REPORTER
      }, "---", {
        opcode: "whenTilted",
        text: o({
          id: "gdxfor.whenTilted",
          default: "when tilted [TILT]",
          description: "when the sensor detects tilt"
        }),
        blockType: i.HAT,
        arguments: {
          TILT: {
            type: r.STRING,
            menu: "tiltAnyOptions",
            defaultValue: M
          }
        }
      }, {
        opcode: "isTilted",
        text: o({
          id: "gdxfor.isTilted",
          default: "tilted [TILT]?",
          description: "is the device tilted?"
        }),
        blockType: i.BOOLEAN,
        arguments: {
          TILT: {
            type: r.STRING,
            menu: "tiltAnyOptions",
            defaultValue: M
          }
        }
      }, {
        opcode: "getTilt",
        text: o({
          id: "gdxfor.getTilt",
          default: "tilt angle [TILT]",
          description: "gets tilt"
        }),
        blockType: i.REPORTER,
        arguments: {
          TILT: {
            type: r.STRING,
            menu: "tiltOptions",
            defaultValue: O
          }
        }
      }, "---", {
        opcode: "isFreeFalling",
        text: o({
          id: "gdxfor.isFreeFalling",
          default: "falling?",
          description: "is the device in free fall?"
        }),
        blockType: i.BOOLEAN
      }, {
        opcode: "getSpinSpeed",
        text: o({
          id: "gdxfor.getSpin",
          default: "spin speed [DIRECTION]",
          description: "gets spin speed"
        }),
        blockType: i.REPORTER,
        arguments: {
          DIRECTION: {
            type: r.STRING,
            menu: "axisOptions",
            defaultValue: L
          }
        }
      }, {
        opcode: "getAcceleration",
        text: o({
          id: "gdxfor.getAcceleration",
          default: "acceleration [DIRECTION]",
          description: "gets acceleration"
        }),
        blockType: i.REPORTER,
        arguments: {
          DIRECTION: {
            type: r.STRING,
            menu: "axisOptions",
            defaultValue: C
          }
        }
      }],
      menus: {
        pushPullOptions: {
          acceptReporters: true,
          items: this.PUSH_PULL_MENU
        },
        gestureOptions: {
          acceptReporters: true,
          items: this.GESTURE_MENU
        },
        axisOptions: {
          acceptReporters: true,
          items: this.AXIS_MENU
        },
        tiltOptions: {
          acceptReporters: true,
          items: this.TILT_MENU
        },
        tiltAnyOptions: {
          acceptReporters: true,
          items: this.TILT_MENU_ANY
        }
      }
    };
  }
  whenForcePushedOrPulled(e) {
    switch (e.PUSH_PULL) {
      case v:
        return this._peripheral.getForce() < -5;
      case A:
        return this._peripheral.getForce() > 5;
      default:
        s.warn(`unknown push/pull value in whenForcePushedOrPulled: ${e.PUSH_PULL}`);
        return false;
    }
  }
  getForce() {
    return Math.round(this._peripheral.getForce());
  }
  whenGesture(e) {
    switch (e.GESTURE) {
      case w:
        return this.gestureMagnitude() > 30;
      case S:
        return this.isFreeFalling();
      case k:
        return this._isFacing(k);
      case I:
        return this._isFacing(I);
      default:
        s.warn(`unknown gesture value in whenGesture: ${e.GESTURE}`);
        return false;
    }
  }
  _isFacing(e) {
    if (this._facingUp === undefined) {
      this._facingUp = false;
    }
    if (this._facingDown === undefined) {
      this._facingDown = false;
    }
    let t = 9;
    if (this._facingUp || this._facingDown) {
      t -= 5;
    }
    this._facingUp = this._peripheral.getAccelerationZ() > t;
    this._facingDown = this._peripheral.getAccelerationZ() < t * -1;
    switch (e) {
      case k:
        return this._facingUp;
      case I:
        return this._facingDown;
      default:
        return false;
    }
  }
  whenTilted(e) {
    return this._isTilted(e.TILT);
  }
  isTilted(e) {
    return this._isTilted(e.TILT);
  }
  getTilt(e) {
    return this._getTiltAngle(e.TILT);
  }
  _isTilted(e) {
    if (e === M) {
      return this._getTiltAngle(O) > 15 || this._getTiltAngle(N) > 15 || this._getTiltAngle(R) > 15 || this._getTiltAngle(x) > 15;
    } else {
      return this._getTiltAngle(e) > 15;
    }
  }
  _getTiltAngle(e) {
    if (!this._peripheral.isConnected()) {
      return 0;
    }
    switch (e) {
      case O:
        return Math.round(this._peripheral.getTiltFrontBack(true));
      case N:
        return Math.round(this._peripheral.getTiltFrontBack(false));
      case R:
        return Math.round(this._peripheral.getTiltLeftRight(true));
      case x:
        return Math.round(this._peripheral.getTiltLeftRight(false));
      default:
        s.warn(`Unknown direction in getTilt: ${e}`);
    }
  }
  getSpinSpeed(e) {
    switch (e.DIRECTION) {
      case C:
        return Math.round(this._peripheral.getSpinSpeedX());
      case P:
        return Math.round(this._peripheral.getSpinSpeedY());
      case L:
        return Math.round(this._peripheral.getSpinSpeedZ());
      default:
        s.warn(`Unknown direction in getSpinSpeed: ${e.DIRECTION}`);
    }
  }
  getAcceleration(e) {
    switch (e.DIRECTION) {
      case C:
        return Math.round(this._peripheral.getAccelerationX());
      case P:
        return Math.round(this._peripheral.getAccelerationY());
      case L:
        return Math.round(this._peripheral.getAccelerationZ());
      default:
        s.warn(`Unknown direction in getAcceleration: ${e.DIRECTION}`);
    }
  }
  magnitude(e, t, n) {
    return Math.sqrt(e * e + t * t + n * n);
  }
  accelMagnitude() {
    return this.magnitude(this._peripheral.getAccelerationX(), this._peripheral.getAccelerationY(), this._peripheral.getAccelerationZ());
  }
  gestureMagnitude() {
    return this.accelMagnitude() - 9.8;
  }
  spinMagnitude() {
    return this.magnitude(this._peripheral.getSpinSpeedX(), this._peripheral.getSpinSpeedY(), this._peripheral.getSpinSpeedZ());
  }
  isFreeFalling() {
    if (!this._peripheral.isConnected()) {
      return false;
    }
    return this.accelMagnitude() < 0.5 + this.spinMagnitude() * 0.3;
  }
}
module.exports = D;