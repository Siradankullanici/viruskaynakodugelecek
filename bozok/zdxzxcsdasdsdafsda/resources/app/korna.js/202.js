const r = require("./1.js");
const i = {
  SPACE: "space",
  LEFT: "left arrow",
  UP: "up arrow",
  RIGHT: "right arrow",
  DOWN: "down arrow",
  ENTER: "enter",
  BACKSPACE: "backspace",
  DELETE: "delete",
  SHIFT: "shift",
  CAPS_LOCK: "caps lock",
  SCROLL_LOCK: "scroll lock",
  CONTROL: "control",
  ESCAPE: "escape",
  INSERT: "insert",
  HOME: "home",
  END: "end",
  PAGE_UP: "page up",
  PAGE_DOWN: "page down"
};
const s = new Set(Object.values(i));
module.exports = class {
  constructor(e) {
    this._keysPressed = [];
    this.runtime = e;
    this.lastKeyPressed = "";
    this._numeralKeyCodesToStringKey = new Map();
    this._usedKeys = new Set();
  }
  _keyStringToScratchKey(e) {
    switch (e = r.toString(e)) {
      case " ":
        return i.SPACE;
      case "ArrowLeft":
      case "Left":
        return i.LEFT;
      case "ArrowUp":
      case "Up":
        return i.UP;
      case "Right":
      case "ArrowRight":
        return i.RIGHT;
      case "Down":
      case "ArrowDown":
        return i.DOWN;
      case "Enter":
        return i.ENTER;
      case "Backspace":
        return i.BACKSPACE;
      case "Delete":
        return i.DELETE;
      case "Shift":
        return i.SHIFT;
      case "CapsLock":
        return i.CAPS_LOCK;
      case "ScrollLock":
        return i.SCROLL_LOCK;
      case "Control":
        return i.CONTROL;
      case "Escape":
        return i.ESCAPE;
      case "Insert":
        return i.INSERT;
      case "Home":
        return i.HOME;
      case "End":
        return i.END;
      case "PageUp":
        return i.PAGE_UP;
      case "PageDown":
        return i.PAGE_DOWN;
    }
    if (e.length > 1) {
      return "";
    } else {
      return e;
    }
  }
  _keyArgToScratchKey(e) {
    if (typeof e == "number") {
      if (e >= 48 && e <= 90) {
        return String.fromCharCode(e);
      }
      switch (e) {
        case 32:
          return i.SPACE;
        case 37:
          return i.LEFT;
        case 38:
          return i.UP;
        case 39:
          return i.RIGHT;
        case 40:
          return i.DOWN;
      }
    }
    if ((e = r.toString(e)).length > 1 && s.has(e)) {
      return e;
    } else {
      if (e.length > 1) {
        e = e[0];
      }
      if (e === " ") {
        return i.SPACE;
      } else if (e === "\r") {
        return i.ENTER;
      } else if (e === "") {
        return i.ESCAPE;
      } else {
        return e.toUpperCase();
      }
    }
  }
  postData(e) {
    if (!e.key) {
      return;
    }
    const t = this._keyStringToScratchKey(e.key);
    const n = t.length === 1 ? t.toUpperCase() : t;
    if (n === "") {
      return;
    }
    const r = this._keysPressed.indexOf(n);
    if (e.isDown) {
      this.lastKeyPressed = t;
      this.runtime.emit("KEY_PRESSED", n);
      if (r < 0) {
        this._keysPressed.push(n);
      }
    } else if (r > -1) {
      this._keysPressed.splice(r, 1);
    }
    if (Object.prototype.hasOwnProperty.call(e, "keyCode")) {
      const t = e.keyCode;
      if (this._numeralKeyCodesToStringKey.has(t)) {
        const e = this._numeralKeyCodesToStringKey.get(t);
        if (e !== n) {
          const t = this._keysPressed.indexOf(e);
          if (t !== -1) {
            this._keysPressed.splice(t, 1);
          }
        }
      }
      this._numeralKeyCodesToStringKey.set(t, n);
    }
  }
  getKeyIsDown(e) {
    if (e === "any") {
      return this._keysPressed.length > 0;
    }
    const t = this._keyArgToScratchKey(e);
    this._usedKeys.add(t);
    return this._keysPressed.indexOf(t) > -1;
  }
  getLastKeyPressed() {
    return this.lastKeyPressed;
  }
  hasUsedKey(e) {
    return this._usedKeys.has(e);
  }
};