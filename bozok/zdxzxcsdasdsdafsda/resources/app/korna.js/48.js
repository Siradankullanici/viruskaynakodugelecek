const r = require("./4.js");
const i = require("./6.js");
const s = require("./1.js");
const o = require("./12.js");
const a = require("./236.js");
const c = require("./13.js");
class l extends a {
  constructor(e, t) {
    super(t, e.blocks);
    this.sprite = e;
    this.renderer = null;
    if (this.runtime) {
      this.renderer = this.runtime.renderer;
    }
    this.drawableID = null;
    this.dragging = false;
    this.effects = {
      color: 0,
      fisheye: 0,
      whirl: 0,
      pixelate: 0,
      mosaic: 0,
      brightness: 0,
      ghost: 0
    };
    this.isOriginal = true;
    this.isStage = false;
    this.x = 0;
    this.y = 0;
    this.direction = 90;
    this.draggable = false;
    this.visible = true;
    this.size = 100;
    this.currentCostume = 0;
    this.rotationStyle = l.ROTATION_STYLE_ALL_AROUND;
    this.volume = 100;
    this.tempo = 60;
    this.videoTransparency = 50;
    this.videoState = l.VIDEO_STATE.ON;
    this.textToSpeechLanguage = null;
    this.onTargetMoved = null;
    this.onTargetVisualChange = null;
    this.interpolationData = null;
  }
  initDrawable(e) {
    if (this.renderer) {
      this.drawableID = this.renderer.createDrawable(e);
    }
    if (!this.isOriginal) {
      this.runtime.startHats("control_start_as_clone", null, this);
    }
  }
  get audioPlayer() {
    console.warn("get audioPlayer deprecated, please update to use .sprite.soundBank methods");
    console.warn(new Error("stack for debug").stack);
    const e = this.sprite.soundBank;
    const t = {
      playSound: t => e.play(this, t)
    };
    Object.defineProperty(this, "audioPlayer", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: t
    });
    return t;
  }
  initAudio() {}
  static get ROTATION_STYLE_ALL_AROUND() {
    return "all around";
  }
  static get ROTATION_STYLE_LEFT_RIGHT() {
    return "left-right";
  }
  static get ROTATION_STYLE_NONE() {
    return "don't rotate";
  }
  static get VIDEO_STATE() {
    return {
      OFF: "off",
      ON: "on",
      ON_FLIPPED: "on-flipped"
    };
  }
  emitVisualChange() {
    if (this.onTargetVisualChange) {
      this.onTargetVisualChange(this);
    }
  }
  setXY(e, t, n) {
    if (this.isStage) {
      return;
    }
    if (this.dragging && !n) {
      return;
    }
    const r = this.x;
    const i = this.y;
    if (this.renderer) {
      const n = this.runtime.runtimeOptions.fencing ? this.renderer.getFencedPositionOfDrawable(this.drawableID, [e, t]) : [e, t];
      this.x = n[0];
      this.y = n[1];
      this.renderer.updateDrawablePosition(this.drawableID, n);
      if (this.visible) {
        this.emitVisualChange();
        this.runtime.requestRedraw();
      }
    } else {
      this.x = e;
      this.y = t;
    }
    if (this.onTargetMoved) {
      this.onTargetMoved(this, r, i, n);
    }
    this.runtime.requestTargetsUpdate(this);
  }
  _getRenderedDirectionAndScale() {
    let e = this.direction;
    let t = [this.size, this.size];
    if (this.rotationStyle === l.ROTATION_STYLE_NONE) {
      e = 90;
    } else if (this.rotationStyle === l.ROTATION_STYLE_LEFT_RIGHT) {
      e = 90;
      t = [(this.direction < 0 ? -1 : 1) * this.size, this.size];
    }
    return {
      direction: e,
      scale: t
    };
  }
  setDirection(e) {
    if (!this.isStage && isFinite(e)) {
      this.direction = r.wrapClamp(e, -179, 180);
      if (this.renderer) {
        const {
          direction: e,
          scale: t
        } = this._getRenderedDirectionAndScale();
        this.renderer.updateDrawableDirectionScale(this.drawableID, e, t);
        if (this.visible) {
          this.emitVisualChange();
          this.runtime.requestRedraw();
        }
      }
      this.runtime.requestTargetsUpdate(this);
    }
  }
  setDraggable(e) {
    if (!this.isStage) {
      this.draggable = !!e;
      this.runtime.requestTargetsUpdate(this);
    }
  }
  setVisible(e) {
    if (!this.isStage) {
      this.visible = !!e;
      if (this.renderer) {
        this.renderer.updateDrawableVisible(this.drawableID, this.visible);
        if (this.visible) {
          this.emitVisualChange();
          this.runtime.requestRedraw();
        }
      }
      this.runtime.requestTargetsUpdate(this);
    }
  }
  setSize(e) {
    if (!this.isStage) {
      if (this.renderer) {
        const t = this.renderer.getCurrentSkinSize(this.drawableID);
        const n = t[0];
        const i = t[1];
        const s = this.runtime.runtimeOptions.fencing;
        const o = s ? Math.min(1, Math.max(5 / n, 5 / i)) : 0;
        const a = s ? Math.min(this.runtime.stageWidth * 1.5 / n, this.runtime.stageHeight * 1.5 / i) : Infinity;
        this.size = r.clamp(e / 100, o, a) * 100;
        const {
          direction: c,
          scale: l
        } = this._getRenderedDirectionAndScale();
        this.renderer.updateDrawableDirectionScale(this.drawableID, c, l);
        if (this.visible) {
          this.emitVisualChange();
          this.runtime.requestRedraw();
        }
      } else {
        this.size = e;
      }
      this.runtime.requestTargetsUpdate(this);
    }
  }
  setEffect(e, t) {
    if (Object.prototype.hasOwnProperty.call(this.effects, e)) {
      this.effects[e] = t;
      if (this.renderer) {
        this.renderer.updateDrawableEffect(this.drawableID, e, t);
        if (this.visible) {
          this.emitVisualChange();
          this.runtime.requestRedraw();
        }
      }
    }
  }
  clearEffects() {
    for (const e in this.effects) {
      if (Object.prototype.hasOwnProperty.call(this.effects, e)) {
        this.effects[e] = 0;
      }
    }
    if (this.renderer) {
      for (const e in this.effects) {
        if (Object.prototype.hasOwnProperty.call(this.effects, e)) {
          this.renderer.updateDrawableEffect(this.drawableID, e, 0);
        }
      }
      if (this.visible) {
        this.emitVisualChange();
        this.runtime.requestRedraw();
      }
    }
  }
  setCostume(e) {
    if ((e = Math.round(e)) === Infinity || e === -Infinity || !e) {
      e = 0;
    }
    this.currentCostume = r.wrapClamp(e, 0, this.sprite.costumes.length - 1);
    if (this.renderer) {
      const e = this.sprite.costumes[this.currentCostume];
      this.renderer.updateDrawableSkinId(this.drawableID, e.skinId);
      if (this.visible) {
        this.emitVisualChange();
        this.runtime.requestRedraw();
      }
    }
    this.runtime.requestTargetsUpdate(this);
  }
  addCostume(e, t) {
    if (typeof t != "number" || isNaN(t)) {
      this.sprite.addCostumeAt(e, this.sprite.costumes.length);
    } else {
      this.sprite.addCostumeAt(e, t);
    }
  }
  renameCostume(e, t) {
    const n = this.sprite.costumes.filter((t, n) => e !== n).map(e => e.name);
    const r = this.getCostumes()[e].name;
    const s = i.unusedName(t, n);
    this.getCostumes()[e].name = s;
    if (this.isStage) {
      const e = this.runtime.targets;
      for (let t = 0; t < e.length; t++) {
        e[t].blocks.updateAssetName(r, s, "backdrop");
      }
    } else {
      this.blocks.updateAssetName(r, s, "costume");
    }
  }
  deleteCostume(e) {
    const t = this.sprite.deleteCostume(e);
    if (t) {
      this.runtime.requestTargetsUpdate(this);
    }
    return t;
  }
  addSound(e, t) {
    const n = this.sprite.sounds.map(e => e.name);
    e.name = i.unusedName(e.name, n);
    if (typeof t != "number" || isNaN(t)) {
      this.sprite.sounds.push(e);
    } else {
      this.sprite.sounds.splice(t, 0, e);
    }
  }
  renameSound(e, t) {
    const n = this.sprite.sounds.filter((t, n) => e !== n).map(e => e.name);
    const r = this.sprite.sounds[e].name;
    const s = i.unusedName(t, n);
    this.sprite.sounds[e].name = s;
    this.blocks.updateAssetName(r, s, "sound");
  }
  deleteSound(e) {
    const t = this.sprite.deleteSound(e);
    if (t) {
      this.runtime.requestTargetsUpdate(this);
    }
    return t;
  }
  setRotationStyle(e) {
    if (e === l.ROTATION_STYLE_NONE) {
      this.rotationStyle = l.ROTATION_STYLE_NONE;
    } else if (e === l.ROTATION_STYLE_ALL_AROUND) {
      this.rotationStyle = l.ROTATION_STYLE_ALL_AROUND;
    } else if (e === l.ROTATION_STYLE_LEFT_RIGHT) {
      this.rotationStyle = l.ROTATION_STYLE_LEFT_RIGHT;
    }
    if (this.renderer) {
      const {
        direction: e,
        scale: t
      } = this._getRenderedDirectionAndScale();
      this.renderer.updateDrawableDirectionScale(this.drawableID, e, t);
      if (this.visible) {
        this.emitVisualChange();
        this.runtime.requestRedraw();
      }
    }
    this.runtime.requestTargetsUpdate(this);
  }
  getCostumeIndexByName(e) {
    const t = this.getCostumes();
    for (let n = 0; n < t.length; n++) {
      if (t[n].name === e) {
        return n;
      }
    }
    return -1;
  }
  getCurrentCostume() {
    return this.getCostumes()[this.currentCostume];
  }
  getCostumes() {
    return this.sprite.costumes;
  }
  reorderCostume(e, t) {
    if ((t = r.clamp(t, 0, this.sprite.costumes.length - 1)) === (e = r.clamp(e, 0, this.sprite.costumes.length - 1))) {
      return false;
    }
    const n = this.getCurrentCostume();
    const i = this.sprite.costumes[e];
    this.sprite.deleteCostumeAt(e);
    this.addCostume(i, t);
    this.currentCostume = this.getCostumeIndexByName(n.name);
    return true;
  }
  reorderSound(e, t) {
    if ((t = r.clamp(t, 0, this.sprite.sounds.length - 1)) === (e = r.clamp(e, 0, this.sprite.sounds.length - 1))) {
      return false;
    }
    const n = this.sprite.sounds[e];
    this.sprite.deleteSoundAt(e);
    this.addSound(n, t);
    return true;
  }
  getSounds() {
    return this.sprite.sounds;
  }
  updateAllDrawableProperties() {
    if (this.renderer) {
      const {
        direction: e,
        scale: t
      } = this._getRenderedDirectionAndScale();
      this.renderer.updateDrawablePosition(this.drawableID, [this.x, this.y]);
      this.renderer.updateDrawableDirectionScale(this.drawableID, e, t);
      this.renderer.updateDrawableVisible(this.drawableID, this.visible);
      const n = this.getCostumes()[this.currentCostume];
      this.renderer.updateDrawableSkinId(this.drawableID, n.skinId);
      for (const e in this.effects) {
        if (Object.prototype.hasOwnProperty.call(this.effects, e)) {
          this.renderer.updateDrawableEffect(this.drawableID, e, this.effects[e]);
        }
      }
      if (this.visible) {
        this.emitVisualChange();
        this.runtime.requestRedraw();
      }
    }
    this.runtime.requestTargetsUpdate(this);
  }
  getName() {
    return this.sprite.name;
  }
  isSprite() {
    return !this.isStage && this.isOriginal;
  }
  getBounds() {
    if (this.renderer) {
      return this.runtime.renderer.getBounds(this.drawableID);
    } else {
      return null;
    }
  }
  getBoundsForBubble() {
    if (this.renderer) {
      return this.runtime.renderer.getBoundsForBubble(this.drawableID);
    } else {
      return null;
    }
  }
  isTouchingObject(e) {
    if (e === "_mouse_") {
      if (!this.runtime.ioDevices.mouse) {
        return false;
      }
      const e = this.runtime.ioDevices.mouse.getClientX();
      const t = this.runtime.ioDevices.mouse.getClientY();
      return this.isTouchingPoint(e, t);
    }
    if (e === "_edge_") {
      return this.isTouchingEdge();
    } else {
      return this.isTouchingSprite(e);
    }
  }
  isTouchingPoint(e, t) {
    return !!this.renderer && this.renderer.drawableTouching(this.drawableID, e, t);
  }
  isTouchingEdge() {
    if (this.renderer) {
      const e = this.runtime.stageWidth;
      const t = this.runtime.stageHeight;
      const n = this.getBounds();
      if (n.left < -e / 2 || n.right > e / 2 || n.top > t / 2 || n.bottom < -t / 2) {
        return true;
      }
    }
    return false;
  }
  isTouchingSprite(e) {
    e = s.toString(e);
    const t = this.runtime.getSpriteTargetByName(e);
    if (!t || !this.renderer) {
      return false;
    }
    const n = t.sprite.clones.filter(e => !e.dragging).map(e => e.drawableID);
    return this.renderer.isTouchingDrawables(this.drawableID, n);
  }
  isTouchingColor(e) {
    return !!this.renderer && this.renderer.isTouchingColor(this.drawableID, e);
  }
  colorIsTouchingColor(e, t) {
    return !!this.renderer && this.renderer.isTouchingColor(this.drawableID, e, t);
  }
  getLayerOrder() {
    if (this.renderer) {
      return this.renderer.getDrawableOrder(this.drawableID);
    } else {
      return null;
    }
  }
  goToFront() {
    if (this.renderer) {
      this.renderer.setDrawableOrder(this.drawableID, Infinity, c.SPRITE_LAYER);
    }
    this.runtime.setExecutablePosition(this, Infinity);
  }
  goToBack() {
    if (this.renderer) {
      this.renderer.setDrawableOrder(this.drawableID, -Infinity, c.SPRITE_LAYER, false);
    }
    this.runtime.setExecutablePosition(this, -Infinity);
  }
  goForwardLayers(e) {
    if (this.renderer) {
      this.renderer.setDrawableOrder(this.drawableID, e, c.SPRITE_LAYER, true);
    }
    this.runtime.moveExecutable(this, e);
  }
  goBackwardLayers(e) {
    if (this.renderer) {
      this.renderer.setDrawableOrder(this.drawableID, -e, c.SPRITE_LAYER, true);
    }
    this.runtime.moveExecutable(this, -e);
  }
  goBehindOther(e) {
    if (this.renderer) {
      const t = this.renderer.setDrawableOrder(e.drawableID, 0, c.SPRITE_LAYER, true);
      this.renderer.setDrawableOrder(this.drawableID, t, c.SPRITE_LAYER);
    }
    const t = this.runtime.executableTargets.indexOf(e);
    this.runtime.setExecutablePosition(this, t);
  }
  keepInFence(e, t, n) {
    let r = n;
    r ||= {
      left: -this.runtime.stageWidth / 2,
      right: this.runtime.stageWidth / 2,
      top: this.runtime.stageHeight / 2,
      bottom: -this.runtime.stageHeight / 2
    };
    const i = this.getBounds();
    if (!i) {
      return;
    }
    i.left += e - this.x;
    i.right += e - this.x;
    i.top += t - this.y;
    i.bottom += t - this.y;
    let s = 0;
    let o = 0;
    if (i.left < r.left) {
      s += r.left - i.left;
    }
    if (i.right > r.right) {
      s += r.right - i.right;
    }
    if (i.top > r.top) {
      o += r.top - i.top;
    }
    if (i.bottom < r.bottom) {
      o += r.bottom - i.bottom;
    }
    return [e + s, t + o];
  }
  makeClone() {
    if (!this.runtime.clonesAvailable() || this.isStage) {
      return null;
    }
    this.runtime.changeCloneCounter(1);
    const e = this.sprite.createClone();
    e.x = this.x;
    e.y = this.y;
    e.direction = this.direction;
    e.draggable = this.draggable;
    e.visible = this.visible;
    e.size = this.size;
    e.currentCostume = this.currentCostume;
    e.rotationStyle = this.rotationStyle;
    e.effects = o.simple(this.effects);
    e.variables = this.duplicateVariables();
    e._edgeActivatedHatValues = o.simple(this._edgeActivatedHatValues);
    e.initDrawable(c.SPRITE_LAYER);
    e.updateAllDrawableProperties();
    return e;
  }
  duplicate() {
    return this.sprite.duplicate().then(e => {
      const t = e.createClone();
      t.x = (Math.random() - 0.5) * 400 / 2;
      t.y = (Math.random() - 0.5) * 300 / 2;
      t.direction = this.direction;
      t.draggable = this.draggable;
      t.visible = this.visible;
      t.size = this.size;
      t.currentCostume = this.currentCostume;
      t.rotationStyle = this.rotationStyle;
      t.effects = JSON.parse(JSON.stringify(this.effects));
      t.variables = this.duplicateVariables(t.blocks);
      t.updateAllDrawableProperties();
      return t;
    });
  }
  onGreenFlag() {
    this.clearEffects();
  }
  onStopAll() {
    this.clearEffects();
  }
  postSpriteInfo(e) {
    const t = Object.prototype.hasOwnProperty.call(e, "force") ? e.force : null;
    const n = Object.prototype.hasOwnProperty.call(e, "x");
    const r = Object.prototype.hasOwnProperty.call(e, "y");
    if (n || r) {
      this.setXY(n ? e.x : this.x, r ? e.y : this.y, t);
    }
    if (Object.prototype.hasOwnProperty.call(e, "direction")) {
      this.setDirection(e.direction);
    }
    if (Object.prototype.hasOwnProperty.call(e, "draggable")) {
      this.setDraggable(e.draggable);
    }
    if (Object.prototype.hasOwnProperty.call(e, "rotationStyle")) {
      this.setRotationStyle(e.rotationStyle);
    }
    if (Object.prototype.hasOwnProperty.call(e, "visible")) {
      this.setVisible(e.visible);
    }
    if (Object.prototype.hasOwnProperty.call(e, "size")) {
      this.setSize(e.size);
    }
  }
  startDrag() {
    this.dragging = true;
  }
  stopDrag() {
    this.dragging = false;
  }
  toJSON() {
    const e = this.getCostumes();
    return {
      id: this.id,
      name: this.getName(),
      isStage: this.isStage,
      x: this.x,
      y: this.y,
      size: this.size,
      direction: this.direction,
      draggable: this.draggable,
      currentCostume: this.currentCostume,
      costume: e[this.currentCostume],
      costumeCount: e.length,
      visible: this.visible,
      rotationStyle: this.rotationStyle,
      comments: this.comments,
      blocks: this.blocks._blocks,
      variables: this.variables,
      costumes: e,
      sounds: this.getSounds(),
      textToSpeechLanguage: this.textToSpeechLanguage,
      tempo: this.tempo,
      volume: this.volume,
      videoTransparency: this.videoTransparency,
      videoState: this.videoState
    };
  }
  dispose() {
    if (!this.isOriginal) {
      this.runtime.changeCloneCounter(-1);
    }
    this.runtime.stopForTarget(this);
    this.runtime.removeExecutable(this);
    if (this.renderer && this.drawableID !== null) {
      this.renderer.destroyDrawable(this.drawableID, this.isStage ? c.BACKGROUND_LAYER : c.SPRITE_LAYER);
      if (this.visible) {
        this.emitVisualChange();
        this.runtime.requestRedraw();
      }
    }
    this.sprite.removeClone(this);
  }
}
module.exports = l;