const r = require("./11.js");
const i = require("./89.js");
const s = require("./27.js");
const o = {
  maxLineWidth: 170,
  minWidth: 50,
  strokeWidth: 4,
  padding: 10,
  cornerRadius: 16,
  tailHeight: 12,
  font: "Helvetica",
  fontSize: 14,
  fontHeightRatio: 0.9,
  lineHeight: 16,
  bubbleFill: "white",
  bubbleStroke: "rgba(0, 0, 0, 0.15)",
  textFill: "#575E75"
};
module.exports = class extends s {
  constructor(e, t) {
    super(e, t);
    this._canvas = document.createElement("canvas");
    this._size = [0, 0];
    this._renderedScale = 0;
    this._lines = [];
    this._textAreaSize = {
      width: 0,
      height: 0
    };
    this._bubbleType = "";
    this._pointsLeft = false;
    this._textDirty = true;
    this._textureDirty = true;
    this._style = o;
    this.measurementProvider = new i(this._canvas.getContext("2d"));
    this.textWrapper = t.createTextWrapper(this.measurementProvider);
    this._restyleCanvas();
  }
  dispose() {
    if (this._texture) {
      this._renderer.gl.deleteTexture(this._texture);
      this._texture = null;
    }
    this._canvas = null;
    super.dispose();
  }
  get size() {
    if (this._textDirty) {
      this._reflowLines();
    }
    return this._size;
  }
  setTextBubble(e, t, n) {
    this._text = t;
    this._bubbleType = e;
    this._pointsLeft = n;
    this._textDirty = true;
    this._textureDirty = true;
    this.emitWasAltered();
  }
  setStyle(e) {
    this._style = Object.assign({}, this._style, e);
    this.measurementProvider.clearCache();
    this._restyleCanvas();
    this._textDirty = true;
    this._textureDirty = true;
    this.emitWasAltered();
  }
  _restyleCanvas() {
    this._canvas.getContext("2d").font = `${this._style.fontSize}px ${this._style.font}, sans-serif`;
  }
  _reflowLines() {
    this._lines = this.textWrapper.wrapText(this._style.maxLineWidth, this._text);
    let e = 0;
    for (const t of this._lines) {
      e = Math.max(e, this.measurementProvider.measureText(t));
    }
    const t = Math.max(e, this._style.minWidth) + this._style.padding * 2;
    const n = this._style.lineHeight * this._lines.length + this._style.padding * 2;
    this._textAreaSize.width = t;
    this._textAreaSize.height = n;
    this._size[0] = t + this._style.strokeWidth;
    this._size[1] = n + this._style.strokeWidth + this._style.tailHeight;
    this._textDirty = false;
  }
  _renderTextBubble(e) {
    const t = this._canvas.getContext("2d");
    if (this._textDirty) {
      this._reflowLines();
    }
    const n = this._textAreaSize.width;
    const r = this._textAreaSize.height;
    this._canvas.width = Math.ceil(this._size[0] * e);
    this._canvas.height = Math.ceil(this._size[1] * e);
    this._restyleCanvas();
    t.setTransform(1, 0, 0, 1, 0, 0);
    t.clearRect(0, 0, this._canvas.width, this._canvas.height);
    t.scale(e, e);
    t.translate(this._style.strokeWidth * 0.5, this._style.strokeWidth * 0.5);
    t.save();
    if (this._pointsLeft) {
      t.scale(-1, 1);
      t.translate(-n, 0);
    }
    t.beginPath();
    t.moveTo(this._style.cornerRadius, r);
    t.arcTo(0, r, 0, r - this._style.cornerRadius, this._style.cornerRadius);
    t.arcTo(0, 0, n, 0, this._style.cornerRadius);
    t.arcTo(n, 0, n, r, this._style.cornerRadius);
    t.arcTo(n, r, n - this._style.cornerRadius, r, this._style.cornerRadius);
    t.save();
    t.translate(n - this._style.cornerRadius, r);
    if (this._bubbleType === "say") {
      t.bezierCurveTo(0, 4, 4, 8, 4, 10);
      t.arcTo(4, 12, 2, 12, 2);
      t.bezierCurveTo(-1, 12, -11, 8, -16, 0);
      t.closePath();
    } else {
      t.arc(-16, 0, 4, 0, Math.PI);
      t.closePath();
      t.moveTo(-7, 7.25);
      t.arc(-9.25, 7.25, 2.25, 0, Math.PI * 2);
      t.moveTo(0, 9.5);
      t.arc(-1.5, 9.5, 1.5, 0, Math.PI * 2);
    }
    t.restore();
    t.fillStyle = this._style.bubbleFill;
    t.strokeStyle = this._style.bubbleStroke;
    t.lineWidth = this._style.strokeWidth;
    t.stroke();
    t.fill();
    t.restore();
    t.fillStyle = this._style.textFill;
    const i = this._lines;
    for (let e = 0; e < i.length; e++) {
      const n = i[e];
      t.fillText(n, this._style.padding, this._style.padding + this._style.lineHeight * e + this._style.fontHeightRatio * this._style.fontSize);
    }
    this._renderedScale = e;
  }
  updateSilhouette(e = [100, 100]) {
    this.getTexture(e);
  }
  getTexture(e) {
    const t = e ? Math.max(Math.abs(e[0]), Math.abs(e[1])) : 100;
    const n = Math.min(10, t / 100);
    if (this._textureDirty || this._renderedScale !== n) {
      this._renderTextBubble(n);
      this._textureDirty = false;
      const e = this._canvas.getContext("2d").getImageData(0, 0, this._canvas.width, this._canvas.height);
      const t = this._renderer.gl;
      if (this._texture === null) {
        const e = {
          auto: false,
          wrap: t.CLAMP_TO_EDGE
        };
        this._texture = r.createTexture(t, e);
      }
      this._setTexture(e);
    }
    return this._texture;
  }
};