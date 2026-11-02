const r = require("./1.js");
const i = require("./4.js");
const s = require("./14.js");
module.exports = class {
  constructor(e) {
    this.runtime = e;
  }
  getPrimitives() {
    return {
      motion_movesteps: this.moveSteps,
      motion_gotoxy: this.goToXY,
      motion_goto: this.goTo,
      motion_turnright: this.turnRight,
      motion_turnleft: this.turnLeft,
      motion_pointindirection: this.pointInDirection,
      motion_pointtowards: this.pointTowards,
      motion_glidesecstoxy: this.glide,
      motion_glideto: this.glideTo,
      motion_ifonedgebounce: this.ifOnEdgeBounce,
      motion_setrotationstyle: this.setRotationStyle,
      motion_changexby: this.changeX,
      motion_setx: this.setX,
      motion_changeyby: this.changeY,
      motion_sety: this.setY,
      motion_xposition: this.getX,
      motion_yposition: this.getY,
      motion_direction: this.getDirection,
      motion_scroll_right: () => {},
      motion_scroll_up: () => {},
      motion_align_scene: () => {},
      motion_xscroll: () => {},
      motion_yscroll: () => {}
    };
  }
  getMonitored() {
    return {
      motion_xposition: {
        isSpriteSpecific: true,
        getId: e => `${e}_xposition`
      },
      motion_yposition: {
        isSpriteSpecific: true,
        getId: e => `${e}_yposition`
      },
      motion_direction: {
        isSpriteSpecific: true,
        getId: e => `${e}_direction`
      }
    };
  }
  moveSteps(e, t) {
    const n = r.toNumber(e.STEPS);
    this._moveSteps(n, t.target);
  }
  _moveSteps(e, t) {
    const n = i.degToRad(90 - t.direction);
    const r = e * Math.cos(n);
    const s = e * Math.sin(n);
    t.setXY(t.x + r, t.y + s);
  }
  goToXY(e, t) {
    const n = r.toNumber(e.X);
    const i = r.toNumber(e.Y);
    t.target.setXY(n, i);
  }
  getTargetXY(e, t) {
    let n = 0;
    let i = 0;
    if (e === "_mouse_") {
      n = t.ioQuery("mouse", "getScratchX");
      i = t.ioQuery("mouse", "getScratchY");
    } else if (e === "_random_") {
      const e = this.runtime.stageWidth;
      const t = this.runtime.stageHeight;
      n = Math.round(e * (Math.random() - 0.5));
      i = Math.round(t * (Math.random() - 0.5));
    } else {
      e = r.toString(e);
      const t = this.runtime.getSpriteTargetByName(e);
      if (!t) {
        return;
      }
      n = t.x;
      i = t.y;
    }
    return [n, i];
  }
  goTo(e, t) {
    const n = this.getTargetXY(e.TO, t);
    if (n) {
      t.target.setXY(n[0], n[1]);
    }
  }
  turnRight(e, t) {
    const n = r.toNumber(e.DEGREES);
    t.target.setDirection(t.target.direction + n);
  }
  turnLeft(e, t) {
    const n = r.toNumber(e.DEGREES);
    t.target.setDirection(t.target.direction - n);
  }
  pointInDirection(e, t) {
    const n = r.toNumber(e.DIRECTION);
    t.target.setDirection(n);
  }
  pointTowards(e, t) {
    let n = 0;
    let s = 0;
    if (e.TOWARDS === "_mouse_") {
      n = t.ioQuery("mouse", "getScratchX");
      s = t.ioQuery("mouse", "getScratchY");
    } else {
      if (e.TOWARDS === "_random_") {
        t.target.setDirection(Math.round(Math.random() * 360) - 180);
        return;
      }
      {
        e.TOWARDS = r.toString(e.TOWARDS);
        const t = this.runtime.getSpriteTargetByName(e.TOWARDS);
        if (!t) {
          return;
        }
        n = t.x;
        s = t.y;
      }
    }
    const o = n - t.target.x;
    const a = s - t.target.y;
    const c = 90 - i.radToDeg(Math.atan2(a, o));
    t.target.setDirection(c);
  }
  glide(e, t) {
    if (t.stackFrame.timer) {
      const e = t.stackFrame.timer.timeElapsed();
      if (e < t.stackFrame.duration * 1000) {
        const n = e / (t.stackFrame.duration * 1000);
        const r = n * (t.stackFrame.endX - t.stackFrame.startX);
        const i = n * (t.stackFrame.endY - t.stackFrame.startY);
        t.target.setXY(t.stackFrame.startX + r, t.stackFrame.startY + i);
        t.yield();
      } else {
        t.target.setXY(t.stackFrame.endX, t.stackFrame.endY);
      }
    } else {
      t.stackFrame.timer = new s();
      t.stackFrame.timer.start();
      t.stackFrame.duration = r.toNumber(e.SECS);
      t.stackFrame.startX = t.target.x;
      t.stackFrame.startY = t.target.y;
      t.stackFrame.endX = r.toNumber(e.X);
      t.stackFrame.endY = r.toNumber(e.Y);
      if (t.stackFrame.duration <= 0) {
        t.target.setXY(t.stackFrame.endX, t.stackFrame.endY);
        return;
      }
      t.yield();
    }
  }
  glideTo(e, t) {
    const n = this.getTargetXY(e.TO, t);
    if (n) {
      this.glide({
        SECS: e.SECS,
        X: n[0],
        Y: n[1]
      }, t);
    }
  }
  ifOnEdgeBounce(e, t) {
    this._ifOnEdgeBounce(t.target);
  }
  _ifOnEdgeBounce(e) {
    const t = e.getBounds();
    if (!t) {
      return;
    }
    const n = this.runtime.stageWidth;
    const r = this.runtime.stageHeight;
    const s = Math.max(0, n / 2 + t.left);
    const o = Math.max(0, r / 2 - t.top);
    const a = Math.max(0, n / 2 - t.right);
    const c = Math.max(0, r / 2 + t.bottom);
    let l = "";
    let u = Infinity;
    if (s < u) {
      u = s;
      l = "left";
    }
    if (o < u) {
      u = o;
      l = "top";
    }
    if (a < u) {
      u = a;
      l = "right";
    }
    if (c < u) {
      u = c;
      l = "bottom";
    }
    if (u > 0) {
      return;
    }
    const h = i.degToRad(90 - e.direction);
    let d = Math.cos(h);
    let p = -Math.sin(h);
    if (l === "left") {
      d = Math.max(0.2, Math.abs(d));
    } else if (l === "top") {
      p = Math.max(0.2, Math.abs(p));
    } else if (l === "right") {
      d = 0 - Math.max(0.2, Math.abs(d));
    } else if (l === "bottom") {
      p = 0 - Math.max(0.2, Math.abs(p));
    }
    const f = i.radToDeg(Math.atan2(p, d)) + 90;
    e.setDirection(f);
    const m = e.keepInFence(e.x, e.y);
    e.setXY(m[0], m[1]);
  }
  setRotationStyle(e, t) {
    t.target.setRotationStyle(e.STYLE);
  }
  changeX(e, t) {
    const n = r.toNumber(e.DX);
    t.target.setXY(t.target.x + n, t.target.y);
  }
  setX(e, t) {
    const n = r.toNumber(e.X);
    t.target.setXY(n, t.target.y);
  }
  changeY(e, t) {
    const n = r.toNumber(e.DY);
    t.target.setXY(t.target.x, t.target.y + n);
  }
  setY(e, t) {
    const n = r.toNumber(e.Y);
    t.target.setXY(t.target.x, n);
  }
  getX(e, t) {
    return this.limitPrecision(t.target.x);
  }
  getY(e, t) {
    return this.limitPrecision(t.target.y);
  }
  getDirection(e, t) {
    return t.target.direction;
  }
  limitPrecision(e) {
    const t = Math.round(e);
    const n = e - t;
    if (Math.abs(n) < 1e-9) {
      return t;
    } else {
      return e;
    }
  }
};