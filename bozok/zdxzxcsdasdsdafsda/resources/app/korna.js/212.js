const r = require("./1.js");
const i = require("./14.js");
const s = require("./44.js");
module.exports = class {
  constructor(e) {
    this.runtime = e;
    this._answer = "";
    this._timer = new i();
    this._cachedLoudness = -1;
    this._cachedLoudnessTimestamp = 0;
    this._questionList = [];
    this.runtime.on("ANSWER", this._onAnswer.bind(this));
    this.runtime.on("PROJECT_START", this._resetAnswer.bind(this));
    this.runtime.on("PROJECT_STOP_ALL", this._clearAllQuestions.bind(this));
    this.runtime.on("STOP_FOR_TARGET", this._clearTargetQuestions.bind(this));
    this.runtime.on("RUNTIME_DISPOSED", this._resetAnswer.bind(this));
  }
  getPrimitives() {
    return {
      sensing_touchingobject: this.touchingObject,
      sensing_touchingcolor: this.touchingColor,
      sensing_coloristouchingcolor: this.colorTouchingColor,
      sensing_distanceto: this.distanceTo,
      sensing_timer: this.getTimer,
      sensing_resettimer: this.resetTimer,
      sensing_of: this.getAttributeOf,
      sensing_mousex: this.getMouseX,
      sensing_mousey: this.getMouseY,
      sensing_setdragmode: this.setDragMode,
      sensing_mousedown: this.getMouseDown,
      sensing_keypressed: this.getKeyPressed,
      sensing_current: this.current,
      sensing_dayssince2000: this.daysSince2000,
      sensing_loudness: this.getLoudness,
      sensing_loud: this.isLoud,
      sensing_askandwait: this.askAndWait,
      sensing_answer: this.getAnswer,
      sensing_username: this.getUsername,
      sensing_userid: () => {},
      sensing_online: this.isOnline
    };
  }
  getMonitored() {
    return {
      sensing_answer: {
        getId: () => "answer"
      },
      sensing_mousedown: {
        getId: () => "mousedown"
      },
      sensing_mousex: {
        getId: () => "mousex"
      },
      sensing_mousey: {
        getId: () => "mousey"
      },
      sensing_loudness: {
        getId: () => "loudness"
      },
      sensing_timer: {
        getId: () => "timer"
      },
      sensing_dayssince2000: {
        getId: () => "dayssince2000"
      },
      sensing_current: {
        getId: (e, t) => s("current", t)
      },
      sensing_online: {
        getId: () => "online"
      }
    };
  }
  _onAnswer(e) {
    this._answer = e;
    const t = this._questionList.shift();
    if (t) {
      const [e, n, r, i, s] = t;
      if (i && !s) {
        this.runtime.emit("SAY", r, "say", "");
      }
      n();
      this._askNextQuestion();
    }
  }
  _resetAnswer() {
    this._answer = "";
  }
  _enqueueAsk(e, t, n, r, i) {
    this._questionList.push([e, t, n, r, i]);
  }
  _askNextQuestion() {
    if (this._questionList.length > 0) {
      const [e, t, n, r, i] = this._questionList[0];
      if (r && !i) {
        this.runtime.emit("SAY", n, "say", e);
        this.runtime.emit("QUESTION", "");
      } else {
        this.runtime.emit("QUESTION", e);
      }
    }
  }
  _clearAllQuestions() {
    this._questionList = [];
    this.runtime.emit("QUESTION", null);
  }
  _clearTargetQuestions(e) {
    const t = this._questionList.length > 0 && this._questionList[0][2] === e;
    this._questionList = this._questionList.filter(t => t[2] !== e);
    if (t) {
      this.runtime.emit("SAY", e, "say", "");
      if (this._questionList.length > 0) {
        this._askNextQuestion();
      } else {
        this.runtime.emit("QUESTION", null);
      }
    }
  }
  askAndWait(e, t) {
    const n = t.target;
    return new Promise(t => {
      const r = this._questionList.length > 0;
      this._enqueueAsk(String(e.QUESTION), t, n, n.visible, n.isStage);
      if (!r) {
        this._askNextQuestion();
      }
    });
  }
  getAnswer() {
    return this._answer;
  }
  touchingObject(e, t) {
    return t.target.isTouchingObject(e.TOUCHINGOBJECTMENU);
  }
  touchingColor(e, t) {
    const n = r.toRgbColorList(e.COLOR);
    return t.target.isTouchingColor(n);
  }
  colorTouchingColor(e, t) {
    const n = r.toRgbColorList(e.COLOR);
    const i = r.toRgbColorList(e.COLOR2);
    return t.target.colorIsTouchingColor(i, n);
  }
  distanceTo(e, t) {
    if (t.target.isStage) {
      return 10000;
    }
    let n = 0;
    let i = 0;
    if (e.DISTANCETOMENU === "_mouse_") {
      n = t.ioQuery("mouse", "getScratchX");
      i = t.ioQuery("mouse", "getScratchY");
    } else {
      e.DISTANCETOMENU = r.toString(e.DISTANCETOMENU);
      const t = this.runtime.getSpriteTargetByName(e.DISTANCETOMENU);
      if (!t) {
        return 10000;
      }
      n = t.x;
      i = t.y;
    }
    const s = t.target.x - n;
    const o = t.target.y - i;
    return Math.sqrt(s * s + o * o);
  }
  setDragMode(e, t) {
    t.target.setDraggable(e.DRAG_MODE === "draggable");
  }
  getTimer(e, t) {
    return t.ioQuery("clock", "projectTimer");
  }
  resetTimer(e, t) {
    t.ioQuery("clock", "resetProjectTimer");
  }
  getMouseX(e, t) {
    return t.ioQuery("mouse", "getScratchX");
  }
  getMouseY(e, t) {
    return t.ioQuery("mouse", "getScratchY");
  }
  getMouseDown(e, t) {
    return t.ioQuery("mouse", "getIsDown");
  }
  current(e) {
    const t = r.toString(e.CURRENTMENU).toLowerCase();
    const n = new Date();
    switch (t) {
      case "year":
        return n.getFullYear();
      case "month":
        return n.getMonth() + 1;
      case "date":
        return n.getDate();
      case "dayofweek":
        return n.getDay() + 1;
      case "hour":
        return n.getHours();
      case "minute":
        return n.getMinutes();
      case "second":
        return n.getSeconds();
    }
    return 0;
  }
  getKeyPressed(e, t) {
    return t.ioQuery("keyboard", "getKeyIsDown", [e.KEY_OPTION]);
  }
  daysSince2000() {
    const e = new Date(2000, 0, 1);
    const t = new Date();
    const n = t.getTimezoneOffset() - e.getTimezoneOffset();
    let r = t.valueOf() - e.valueOf();
    r += (t.getTimezoneOffset() - n) * 60 * 1000;
    return r / 86400000;
  }
  getLoudness() {
    if (this.runtime.audioEngine === undefined) {
      return -1;
    }
    if (this.runtime.currentStepTime === null) {
      return -1;
    }
    if (!(this._timer.time() - this._cachedLoudnessTimestamp < this.runtime.currentStepTime)) {
      this._cachedLoudnessTimestamp = this._timer.time();
      this._cachedLoudness = this.runtime.audioEngine.getLoudness();
    }
    return this._cachedLoudness;
  }
  isLoud() {
    return this.getLoudness() > 10;
  }
  getAttributeOf(e) {
    let t;
    if (e.OBJECT === "_stage_") {
      t = this.runtime.getTargetForStage();
    } else {
      e.OBJECT = r.toString(e.OBJECT);
      t = this.runtime.getSpriteTargetByName(e.OBJECT);
    }
    if (!t) {
      return 0;
    }
    if (t.isStage) {
      switch (e.PROPERTY) {
        case "background #":
        case "backdrop #":
          return t.currentCostume + 1;
        case "backdrop name":
          return t.getCostumes()[t.currentCostume].name;
        case "volume":
          return t.volume;
      }
    } else {
      switch (e.PROPERTY) {
        case "x position":
          return t.x;
        case "y position":
          return t.y;
        case "direction":
          return t.direction;
        case "costume #":
          return t.currentCostume + 1;
        case "costume name":
          return t.getCostumes()[t.currentCostume].name;
        case "size":
          return t.size;
        case "volume":
          return t.volume;
      }
    }
    const n = e.PROPERTY;
    const i = t.lookupVariableByNameAndType(n, "", true);
    if (i) {
      return i.value;
    } else {
      return 0;
    }
  }
  getUsername(e, t) {
    return t.ioQuery("userData", "getUsername");
  }
  isOnline() {
    return typeof navigator != "object" || typeof navigator.onLine != "boolean" || navigator.onLine;
  }
};