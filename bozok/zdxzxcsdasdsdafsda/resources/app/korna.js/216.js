const n = typeof requestAnimationFrame == "function" ? requestAnimationFrame : e => setTimeout(e, 1000 / 60);
const r = typeof requestAnimationFrame == "function" ? cancelAnimationFrame : clearTimeout;
const i = e => {
  let t;
  const i = () => {
    t = n(i);
    e();
  };
  t = n(i);
  return {
    cancel: () => r(t)
  };
};
module.exports = class {
  constructor(e) {
    this.runtime = e;
    this.running = false;
    this.setFramerate(30);
    this.setInterpolation(false);
    this.stepCallback = this.stepCallback.bind(this);
    this.interpolationCallback = this.interpolationCallback.bind(this);
    this._stepInterval = null;
    this._interpolationAnimation = null;
    this._stepAnimation = null;
    this._noopAnimation = null;
  }
  setFramerate(e) {
    this.framerate = e;
    this._restart();
  }
  setInterpolation(e) {
    this.interpolation = e;
    this._restart();
  }
  stepCallback() {
    this.runtime._step();
  }
  interpolationCallback() {
    this.runtime._renderInterpolatedPositions();
  }
  noopCallback() {}
  _restart() {
    if (this.running) {
      this.stop();
      this.start();
    }
  }
  start() {
    this.running = true;
    if (this.framerate === 0) {
      this._stepAnimation = i(this.stepCallback);
      this.runtime.currentStepTime = 1000 / 60;
    } else {
      if (this.interpolation) {
        this._interpolationAnimation = i(this.interpolationCallback);
      } else if (this.framerate >= 30 && navigator.userAgent.includes("Chrome") && (navigator.userAgent.includes("Windows") || navigator.userAgent.includes("Android"))) {
        this._noopAnimation = i(this.noopCallback);
      }
      this._stepInterval = setInterval(this.stepCallback, 1000 / this.framerate);
      this.runtime.currentStepTime = 1000 / this.framerate;
    }
  }
  stop() {
    this.running = false;
    clearInterval(this._stepInterval);
    if (this._interpolationAnimation) {
      this._interpolationAnimation.cancel();
      this._interpolationAnimation = null;
    }
    if (this._stepAnimation) {
      this._stepAnimation.cancel();
      this._stepAnimation = null;
    }
    if (this._noopAnimation) {
      this._noopAnimation.cancel();
      this._noopAnimation = null;
    }
  }
};