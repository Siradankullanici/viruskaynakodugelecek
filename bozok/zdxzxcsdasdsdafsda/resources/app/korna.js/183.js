const r = require("./43.js");
const i = require("./3.js");
const s = require("./2.js");
const o = require("./12.js");
const a = require("./1.js");
const c = require("./5.js");
const l = require("./71.js");
const u = require("./217.js");
const h = {
  MOTION: "motion",
  DIRECTION: "direction"
};
const d = {
  STAGE: "Stage",
  SPRITE: "this sprite"
};
const p = {
  OFF: "off",
  ON: "on",
  ON_FLIPPED: "on-flipped"
};
class f {
  constructor(e) {
    this.runtime = e;
    this.detect = new u();
    this._lastUpdate = null;
    this.firstInstall = true;
    if (this.runtime.ioDevices) {
      this.runtime.on(r.PROJECT_LOADED, this.updateVideoDisplay.bind(this));
      this.runtime.on(r.PROJECT_RUN_START, this.reset.bind(this));
      this._loop();
    }
  }
  static get INTERVAL() {
    return 33;
  }
  static get DIMENSIONS() {
    return [480, 360];
  }
  static get STATE_KEY() {
    return "Scratch.videoSensing";
  }
  static get DEFAULT_MOTION_STATE() {
    return {
      motionFrameNumber: 0,
      motionAmount: 0,
      motionDirection: 0
    };
  }
  get globalVideoTransparency() {
    const e = this.runtime.getTargetForStage();
    if (e) {
      return e.videoTransparency;
    } else {
      return 50;
    }
  }
  set globalVideoTransparency(e) {
    const t = this.runtime.getTargetForStage();
    if (t) {
      t.videoTransparency = e;
    }
  }
  get globalVideoState() {
    const e = this.runtime.getTargetForStage();
    if (e) {
      return e.videoState;
    } else {
      return p.OFF;
    }
  }
  set globalVideoState(e) {
    const t = this.runtime.getTargetForStage();
    if (t) {
      t.videoState = e;
    }
  }
  updateVideoDisplay() {
    this.setVideoTransparency({
      TRANSPARENCY: this.globalVideoTransparency
    });
    this.videoToggle({
      VIDEO_STATE: this.globalVideoState
    });
  }
  reset() {
    this.detect.reset();
    const e = this.runtime.targets;
    for (let t = 0; t < e.length; t++) {
      const n = e[t].getCustomState(f.STATE_KEY);
      if (n) {
        n.motionAmount = 0;
        n.motionDirection = 0;
      }
    }
  }
  _loop() {
    const e = Math.max(this.runtime.currentStepTime, f.INTERVAL);
    this._loopInterval = setTimeout(this._loop.bind(this), e);
    const t = Date.now();
    if (this._lastUpdate === null) {
      this._lastUpdate = t;
    }
    if (t - this._lastUpdate > f.INTERVAL) {
      const e = this.runtime.ioDevices.video.getFrame({
        format: l.FORMAT_IMAGE_DATA,
        dimensions: f.DIMENSIONS
      });
      if (e) {
        this._lastUpdate = t;
        this.detect.addFrame(e.data);
      }
    }
  }
  _stopLoop() {
    clearTimeout(this._loopInterval);
  }
  _buildMenu(e) {
    return e.map((e, t) => {
      const n = {
        text: e.name
      };
      n.value = e.value || String(t + 1);
      return n;
    });
  }
  _getMotionState(e) {
    let t = e.getCustomState(f.STATE_KEY);
    if (!t) {
      t = o.simple(f.DEFAULT_MOTION_STATE);
      e.setCustomState(f.STATE_KEY, t);
    }
    return t;
  }
  static get SensingAttribute() {
    return h;
  }
  get ATTRIBUTE_INFO() {
    return [{
      name: c({
        id: "videoSensing.motion",
        default: "motion",
        description: "Attribute for the \"video [ATTRIBUTE] on [SUBJECT]\" block"
      }),
      value: h.MOTION
    }, {
      name: c({
        id: "videoSensing.direction",
        default: "direction",
        description: "Attribute for the \"video [ATTRIBUTE] on [SUBJECT]\" block"
      }),
      value: h.DIRECTION
    }];
  }
  static get SensingSubject() {
    return d;
  }
  get SUBJECT_INFO() {
    return [{
      name: c({
        id: "videoSensing.sprite",
        default: "sprite",
        description: "Subject for the \"video [ATTRIBUTE] on [SUBJECT]\" block"
      }),
      value: d.SPRITE
    }, {
      name: c({
        id: "videoSensing.stage",
        default: "stage",
        description: "Subject for the \"video [ATTRIBUTE] on [SUBJECT]\" block"
      }),
      value: d.STAGE
    }];
  }
  static get VideoState() {
    return p;
  }
  get VIDEO_STATE_INFO() {
    return [{
      name: c({
        id: "videoSensing.off",
        default: "off",
        description: "Option for the \"turn video [STATE]\" block"
      }),
      value: p.OFF
    }, {
      name: c({
        id: "videoSensing.on",
        default: "on",
        description: "Option for the \"turn video [STATE]\" block"
      }),
      value: p.ON
    }, {
      name: c({
        id: "videoSensing.onFlipped",
        default: "on flipped",
        description: "Option for the \"turn video [STATE]\" block that causes the video to be flipped horizontally (reversed as in a mirror)"
      }),
      value: p.ON_FLIPPED
    }];
  }
  getInfo() {
    if (this.firstInstall) {
      this.globalVideoState = p.ON;
      this.globalVideoTransparency = 50;
      this.updateVideoDisplay();
      this.firstInstall = false;
    }
    return {
      id: "videoSensing",
      name: c({
        id: "videoSensing.categoryName",
        default: "Video Sensing",
        description: "Label for the video sensing extension category"
      }),
      blockIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48dGl0bGU+RXh0ZW5zaW9ucy9Tb2Z0d2FyZS9WaWRlby1TZW5zaW5nLUJsb2NrPC90aXRsZT48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxMCkiPjxjaXJjbGUgY3g9IjMyIiBjeT0iMTYiIHI9IjQuNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMjUiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjEyIiByPSI0LjUiIGZpbGw9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgb3BhY2l0eT0iLjUiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjgiIHI9IjQuNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuNzUiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjQiIHI9IjQuNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZmlsbD0iIzRkNGQ0ZCIgZD0ibTIyLjY3MiA0LjQyLTYuMTcyIDRWNi4xYzAtMi4wMS0xLjU2My0zLjYtMy41LTMuNkg0LjFDMi4wNzYgMi41LjUgNC4wNzYuNSA2LjFWMTRjMCAxLjkyNyAxLjU4NCAzLjUxMiAzLjYgMy42SDEzYzEuOTAyIDAgMy41LTEuNjUzIDMuNS0zLjZ2LTIuMjgzbDYuMjU3IDMuNzU0LjA5Ny4wNzVjLjAyLjAyLjA5OC4wNTQuMTQ2LjA1NC4yNjcgMCAuNS0uMjE3LjUtLjVWNC44YzAgLjAzNy0uMDU2LS4wOTQtLjEyOS0uMjQzLS4xNDUtLjI0Mi0uNDMtLjI5OS0uNy0uMTM3WiIvPjwvZz48L3N2Zz4=",
      menuIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+RXh0ZW5zaW9ucy9Tb2Z0d2FyZS9WaWRlby1TZW5zaW5nLU1lbnU8L3RpdGxlPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA1KSI+PGNpcmNsZSBjeD0iMTYiIGN5PSI4IiByPSIyIiBmaWxsPSIjMGViZDhjIiBvcGFjaXR5PSIuMjUiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjYiIHI9IjIiIGZpbGw9IiMwZWJkOGMiIG9wYWNpdHk9Ii41Ii8+PGNpcmNsZSBjeD0iMTYiIGN5PSI0IiByPSIyIiBmaWxsPSIjMGViZDhjIiBvcGFjaXR5PSIuNzUiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwZWJkOGMiLz48cGF0aCBmaWxsPSIjNGQ0ZDRkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIuMTUiIHN0cm9rZS13aWR0aD0iLjUiIGQ9Im0xMS4zMzYgMi4yMS0zLjA4NiAyVjMuMDVjMC0xLjAwNS0uNzgxLTEuOC0xLjc1LTEuOEgyLjA1Yy0xLjAxMiAwLTEuOC43ODgtMS44IDEuOFY3YzAgLjk2NC43OTIgMS43NTYgMS44IDEuOEg2LjVjLjk1IDAgMS43NS0uODI3IDEuNzUtMS44VjUuODU4bC4zNzkuMjI4IDIuNzk4IDEuNjg3Yy4wMS4wMS4wNDkuMDI3LjA3My4wMjdhLjI1LjI1IDAgMCAwIC4yNS0uMjVWMi40YzAgLjAxOC0uMDI4LS4wNDctLjA2NC0uMTIxLS4wNzMtLjEyMS0uMjE1LS4xNS0uMzUtLjA3WiIvPjwvZz48L3N2Zz4=",
      blocks: [{
        opcode: "whenMotionGreaterThan",
        text: c({
          id: "videoSensing.whenMotionGreaterThan",
          default: "when video motion > [REFERENCE]",
          description: "Event that triggers when the amount of motion is greater than [REFERENCE]"
        }),
        blockType: s.HAT,
        arguments: {
          REFERENCE: {
            type: i.NUMBER,
            defaultValue: 10
          }
        }
      }, {
        opcode: "videoOn",
        blockType: s.REPORTER,
        text: c({
          id: "videoSensing.videoOn",
          default: "video [ATTRIBUTE] on [SUBJECT]",
          description: "Reporter that returns the amount of [ATTRIBUTE] for the selected [SUBJECT]"
        }),
        arguments: {
          ATTRIBUTE: {
            type: i.NUMBER,
            menu: "ATTRIBUTE",
            defaultValue: h.MOTION
          },
          SUBJECT: {
            type: i.NUMBER,
            menu: "SUBJECT",
            defaultValue: d.SPRITE
          }
        }
      }, {
        opcode: "videoToggle",
        text: c({
          id: "videoSensing.videoToggle",
          default: "turn video [VIDEO_STATE]",
          description: "Controls display of the video preview layer"
        }),
        arguments: {
          VIDEO_STATE: {
            type: i.NUMBER,
            menu: "VIDEO_STATE",
            defaultValue: p.ON
          }
        }
      }, {
        opcode: "setVideoTransparency",
        text: c({
          id: "videoSensing.setVideoTransparency",
          default: "set video transparency to [TRANSPARENCY]",
          description: "Controls transparency of the video preview layer"
        }),
        arguments: {
          TRANSPARENCY: {
            type: i.NUMBER,
            defaultValue: 50
          }
        }
      }],
      menus: {
        ATTRIBUTE: {
          acceptReporters: true,
          items: this._buildMenu(this.ATTRIBUTE_INFO)
        },
        SUBJECT: {
          acceptReporters: true,
          items: this._buildMenu(this.SUBJECT_INFO)
        },
        VIDEO_STATE: {
          acceptReporters: true,
          items: this._buildMenu(this.VIDEO_STATE_INFO)
        }
      }
    };
  }
  _analyzeLocalMotion(e) {
    const t = this.runtime.renderer._allDrawables[e.drawableID];
    const n = this._getMotionState(e);
    this.detect.getLocalMotion(t, n);
    return n;
  }
  videoOn(e, t) {
    if (this.runtime.privacyRestrictionsActive) {
      return -1;
    }
    this.detect.analyzeFrame();
    let n = this.detect;
    if (e.SUBJECT === d.SPRITE) {
      n = this._analyzeLocalMotion(t.target);
    }
    if (e.ATTRIBUTE === h.MOTION) {
      return n.motionAmount;
    } else {
      return n.motionDirection;
    }
  }
  whenMotionGreaterThan(e, t) {
    if (this.runtime.privacyRestrictionsActive) {
      return false;
    }
    this.detect.analyzeFrame();
    return this._analyzeLocalMotion(t.target).motionAmount > Number(e.REFERENCE);
  }
  videoToggle(e) {
    const t = e.VIDEO_STATE;
    this.globalVideoState = t;
    if (t === p.OFF) {
      this.runtime.ioDevices.video.disableVideo();
    } else {
      this.runtime.ioDevices.video.enableVideo();
      this.runtime.ioDevices.video.mirror = t === p.ON;
    }
  }
  setVideoTransparency(e) {
    const t = a.toNumber(e.TRANSPARENCY);
    this.globalVideoTransparency = t;
    this.runtime.ioDevices.video.setPreviewGhost(t);
  }
}
module.exports = f;