const r = require("./1.js");
const i = require("./12.js");
const s = require("./7.js");
const o = require("./13.js");
const a = require("./44.js");
const c = require("./4.js");
class l {
  constructor(e) {
    this.runtime = e;
    this._onTargetChanged = this._onTargetChanged.bind(this);
    this._onResetBubbles = this._onResetBubbles.bind(this);
    this._onTargetWillExit = this._onTargetWillExit.bind(this);
    this._updateBubble = this._updateBubble.bind(this);
    this.runtime.on("PROJECT_STOP_ALL", this._onResetBubbles);
    this.runtime.on("targetWasRemoved", this._onTargetWillExit);
    this.runtime.on(l.SAY_OR_THINK, this._updateBubble);
  }
  static get DEFAULT_BUBBLE_STATE() {
    return {
      drawableId: null,
      onSpriteRight: true,
      skinId: null,
      text: "",
      type: "say",
      usageId: null
    };
  }
  static get STATE_KEY() {
    return "Scratch.looks";
  }
  static get SAY_OR_THINK() {
    return "SAY";
  }
  static get SAY_BUBBLE_LIMIT() {
    return 330;
  }
  static get EFFECT_GHOST_LIMIT() {
    return {
      min: 0,
      max: 100
    };
  }
  static get EFFECT_BRIGHTNESS_LIMIT() {
    return {
      min: -100,
      max: 100
    };
  }
  _getBubbleState(e) {
    let t = e.getCustomState(l.STATE_KEY);
    if (!t) {
      t = i.simple(l.DEFAULT_BUBBLE_STATE);
      e.setCustomState(l.STATE_KEY, t);
    }
    return t;
  }
  _onTargetChanged(e) {
    if (this._getBubbleState(e).drawableId) {
      this._positionBubble(e);
    }
  }
  _onTargetWillExit(e) {
    const t = this._getBubbleState(e);
    if (t.drawableId && t.skinId) {
      this.runtime.renderer.destroyDrawable(t.drawableId, o.SPRITE_LAYER);
      this.runtime.renderer.destroySkin(t.skinId);
      t.drawableId = null;
      t.skinId = null;
      this.runtime.requestRedraw();
    }
    e.onTargetVisualChange = null;
  }
  _onResetBubbles() {
    for (let e = 0; e < this.runtime.targets.length; e++) {
      this._getBubbleState(this.runtime.targets[e]).text = "";
      this._onTargetWillExit(this.runtime.targets[e]);
    }
    clearTimeout(this._bubbleTimeout);
  }
  _positionBubble(e) {
    if (!e.visible) {
      return;
    }
    const t = this._getBubbleState(e);
    const [n, r] = this.runtime.renderer.getCurrentSkinSize(t.drawableId);
    let i;
    try {
      i = e.getBoundsForBubble();
    } catch (t) {
      i = {
        left: e.x,
        right: e.x,
        top: e.y,
        bottom: e.y
      };
    }
    const s = this.runtime.renderer.getNativeSize();
    const o = {
      left: -s[0] / 2,
      right: s[0] / 2,
      top: s[1] / 2,
      bottom: -s[1] / 2
    };
    if (t.onSpriteRight && n + i.right > o.right && i.left - n > o.left) {
      t.onSpriteRight = false;
      this._renderBubble(e);
    } else if (!t.onSpriteRight && i.left - n < o.left && n + i.right < o.right) {
      t.onSpriteRight = true;
      this._renderBubble(e);
    } else {
      this.runtime.renderer.updateDrawablePosition(t.drawableId, [t.onSpriteRight ? Math.max(o.left, Math.min(o.right - n, i.right)) : Math.min(o.right - n, Math.max(o.left, i.left - n)), Math.min(o.top, i.bottom + r)]);
      this.runtime.requestRedraw();
    }
  }
  _renderBubble(e) {
    if (!this.runtime.renderer) {
      return;
    }
    const t = this._getBubbleState(e);
    const {
      type: n,
      text: r,
      onSpriteRight: i
    } = t;
    if (e.visible && r !== "") {
      if (t.skinId) {
        this.runtime.renderer.updateTextSkin(t.skinId, n, r, i, [0, 0]);
      } else {
        e.onTargetVisualChange = this._onTargetChanged;
        t.drawableId = this.runtime.renderer.createDrawable(o.SPRITE_LAYER);
        t.skinId = this.runtime.renderer.createTextSkin(n, r, t.onSpriteRight, [0, 0]);
        this.runtime.renderer.updateDrawableSkinId(t.drawableId, t.skinId);
      }
      this._positionBubble(e);
    } else {
      this._onTargetWillExit(e);
    }
  }
  _formatBubbleText(e) {
    if (e === "") {
      return e;
    } else {
      if (typeof e == "number" && Math.abs(e) >= 0.01 && e % 1 != 0) {
        e = e.toFixed(2);
      }
      return e = String(e).substr(0, l.SAY_BUBBLE_LIMIT);
    }
  }
  _updateBubble(e, t, n) {
    const r = this._getBubbleState(e);
    r.type = t;
    r.text = this._formatBubbleText(n);
    r.usageId = s();
    this._renderBubble(e);
  }
  getPrimitives() {
    return {
      looks_say: this.say,
      looks_sayforsecs: this.sayforsecs,
      looks_think: this.think,
      looks_thinkforsecs: this.thinkforsecs,
      looks_show: this.show,
      looks_hide: this.hide,
      looks_hideallsprites: () => {},
      looks_switchcostumeto: this.switchCostume,
      looks_switchbackdropto: this.switchBackdrop,
      looks_switchbackdroptoandwait: this.switchBackdropAndWait,
      looks_nextcostume: this.nextCostume,
      looks_nextbackdrop: this.nextBackdrop,
      looks_changeeffectby: this.changeEffect,
      looks_seteffectto: this.setEffect,
      looks_cleargraphiceffects: this.clearEffects,
      looks_changesizeby: this.changeSize,
      looks_setsizeto: this.setSize,
      looks_changestretchby: () => {},
      looks_setstretchto: () => {},
      looks_gotofrontback: this.goToFrontBack,
      looks_goforwardbackwardlayers: this.goForwardBackwardLayers,
      looks_size: this.getSize,
      looks_costumenumbername: this.getCostumeNumberName,
      looks_backdropnumbername: this.getBackdropNumberName
    };
  }
  getMonitored() {
    return {
      looks_size: {
        isSpriteSpecific: true,
        getId: e => `${e}_size`
      },
      looks_costumenumbername: {
        isSpriteSpecific: true,
        getId: (e, t) => a(`${e}_costumenumbername`, t)
      },
      looks_backdropnumbername: {
        getId: (e, t) => a("backdropnumbername", t)
      }
    };
  }
  say(e, t) {
    const n = e.MESSAGE;
    this._say(n, t.target);
  }
  _say(e, t) {
    this.runtime.emit(l.SAY_OR_THINK, t, "say", e);
  }
  sayforsecs(e, t) {
    this.say(e, t);
    const n = t.target;
    const r = this._getBubbleState(n).usageId;
    return new Promise(t => {
      this._bubbleTimeout = setTimeout(() => {
        this._bubbleTimeout = null;
        if (this._getBubbleState(n).usageId === r) {
          this._updateBubble(n, "say", "");
        }
        t();
      }, e.SECS * 1000);
    });
  }
  think(e, t) {
    this._think(e.MESSAGE, t.target);
  }
  _think(e, t) {
    this.runtime.emit(l.SAY_OR_THINK, t, "think", e);
  }
  thinkforsecs(e, t) {
    this.think(e, t);
    const n = t.target;
    const r = this._getBubbleState(n).usageId;
    return new Promise(t => {
      this._bubbleTimeout = setTimeout(() => {
        this._bubbleTimeout = null;
        if (this._getBubbleState(n).usageId === r) {
          this._updateBubble(n, "think", "");
        }
        t();
      }, e.SECS * 1000);
    });
  }
  show(e, t) {
    t.target.setVisible(true);
    this._renderBubble(t.target);
  }
  hide(e, t) {
    t.target.setVisible(false);
    this._renderBubble(t.target);
  }
  _setCostume(e, t, n) {
    if (typeof t == "number") {
      e.setCostume(n ? t : t - 1);
    } else {
      const i = e.getCostumeIndexByName(t.toString());
      if (i !== -1) {
        e.setCostume(i);
      } else if (t === "next costume") {
        e.setCostume(e.currentCostume + 1);
      } else if (t === "previous costume") {
        e.setCostume(e.currentCostume - 1);
      } else if (!isNaN(t) && !r.isWhiteSpace(t)) {
        e.setCostume(n ? Number(t) : Number(t) - 1);
      }
    }
    return [];
  }
  _setBackdrop(e, t, n) {
    if (typeof t == "number") {
      e.setCostume(n ? t : t - 1);
    } else {
      const i = e.getCostumeIndexByName(t.toString());
      if (i !== -1) {
        e.setCostume(i);
      } else if (t === "next backdrop") {
        e.setCostume(e.currentCostume + 1);
      } else if (t === "previous backdrop") {
        e.setCostume(e.currentCostume - 1);
      } else if (t === "random backdrop") {
        const t = e.getCostumes().length;
        if (t > 1) {
          const n = 0;
          const r = t - 1;
          const i = e.currentCostume;
          const s = c.inclusiveRandIntWithout(n, r, i);
          e.setCostume(s);
        }
      } else if (!isNaN(t) && !r.isWhiteSpace(t)) {
        e.setCostume(n ? Number(t) : Number(t) - 1);
      }
    }
    const i = e.getCostumes()[e.currentCostume].name;
    return this.runtime.startHats("event_whenbackdropswitchesto", {
      BACKDROP: i
    });
  }
  switchCostume(e, t) {
    this._setCostume(t.target, e.COSTUME);
  }
  nextCostume(e, t) {
    this._setCostume(t.target, t.target.currentCostume + 1, true);
  }
  switchBackdrop(e) {
    this._setBackdrop(this.runtime.getTargetForStage(), e.BACKDROP);
  }
  switchBackdropAndWait(e, t) {
    if (!t.stackFrame.startedThreads && (t.stackFrame.startedThreads = this._setBackdrop(this.runtime.getTargetForStage(), e.BACKDROP), t.stackFrame.startedThreads.length === 0)) {
      return;
    }
    const n = this;
    if (t.stackFrame.startedThreads.some(e => n.runtime.threads.indexOf(e) !== -1)) {
      if (t.stackFrame.startedThreads.every(e => n.runtime.isWaitingThread(e))) {
        t.yieldTick();
      } else {
        t.yield();
      }
    }
  }
  nextBackdrop() {
    const e = this.runtime.getTargetForStage();
    this._setBackdrop(e, e.currentCostume + 1, true);
  }
  clampEffect(e, t) {
    let n = t;
    switch (e) {
      case "ghost":
        n = c.clamp(t, l.EFFECT_GHOST_LIMIT.min, l.EFFECT_GHOST_LIMIT.max);
        break;
      case "brightness":
        n = c.clamp(t, l.EFFECT_BRIGHTNESS_LIMIT.min, l.EFFECT_BRIGHTNESS_LIMIT.max);
    }
    return n;
  }
  changeEffect(e, t) {
    const n = r.toString(e.EFFECT).toLowerCase();
    const i = r.toNumber(e.CHANGE);
    if (!Object.prototype.hasOwnProperty.call(t.target.effects, n)) {
      return;
    }
    let s = i + t.target.effects[n];
    s = this.clampEffect(n, s);
    t.target.setEffect(n, s);
  }
  setEffect(e, t) {
    const n = r.toString(e.EFFECT).toLowerCase();
    let i = r.toNumber(e.VALUE);
    i = this.clampEffect(n, i);
    t.target.setEffect(n, i);
  }
  clearEffects(e, t) {
    t.target.clearEffects();
  }
  changeSize(e, t) {
    const n = r.toNumber(e.CHANGE);
    t.target.setSize(t.target.size + n);
  }
  setSize(e, t) {
    const n = r.toNumber(e.SIZE);
    t.target.setSize(n);
  }
  goToFrontBack(e, t) {
    if (!t.target.isStage) {
      if (e.FRONT_BACK === "front") {
        t.target.goToFront();
      } else {
        t.target.goToBack();
      }
    }
  }
  goForwardBackwardLayers(e, t) {
    if (!t.target.isStage) {
      if (e.FORWARD_BACKWARD === "forward") {
        t.target.goForwardLayers(r.toNumber(e.NUM));
      } else {
        t.target.goBackwardLayers(r.toNumber(e.NUM));
      }
    }
  }
  getSize(e, t) {
    return Math.round(t.target.size);
  }
  getBackdropNumberName(e) {
    const t = this.runtime.getTargetForStage();
    if (e.NUMBER_NAME === "number") {
      return t.currentCostume + 1;
    } else {
      return t.getCostumes()[t.currentCostume].name;
    }
  }
  getCostumeNumberName(e, t) {
    if (e.NUMBER_NAME === "number") {
      return t.target.currentCostume + 1;
    } else {
      return t.target.getCostumes()[t.target.currentCostume].name;
    }
  }
}
module.exports = l;