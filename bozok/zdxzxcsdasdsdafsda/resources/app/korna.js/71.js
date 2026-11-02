const r = require("./13.js");
class i {
  constructor(e) {
    this.runtime = e;
    this.provider = null;
    this._skinId = -1;
    this._drawable = -1;
    this._ghost = 0;
    this._forceTransparentPreview = false;
  }
  static get FORMAT_IMAGE_DATA() {
    return "image-data";
  }
  static get FORMAT_CANVAS() {
    return "canvas";
  }
  static get DIMENSIONS() {
    return [480, 360];
  }
  static get ORDER() {
    return 1;
  }
  setProvider(e) {
    this.provider = e;
  }
  enableVideo() {
    if (this.provider) {
      return this.provider.enableVideo().then(() => this._setupPreview());
    } else {
      return null;
    }
  }
  disableVideo() {
    this._disablePreview();
    if (!this.provider) {
      return null;
    }
    this.provider.disableVideo();
  }
  getFrame(e) {
    let {
      dimensions: t = i.DIMENSIONS,
      mirror: n = this.mirror,
      format: r = i.FORMAT_IMAGE_DATA,
      cacheTimeout: s = this._frameCacheTimeout
    } = e;
    if (this.provider) {
      return this.provider.getFrame({
        dimensions: t,
        mirror: n,
        format: r,
        cacheTimeout: s
      });
    } else {
      return null;
    }
  }
  setPreviewGhost(e) {
    this._ghost = e;
    if (this._drawable !== -1) {
      this.runtime.renderer.updateDrawableEffect(this._drawable, "ghost", this._forceTransparentPreview ? 100 : e);
    }
  }
  _disablePreview() {
    if (this._skinId !== -1) {
      this.runtime.renderer.updateBitmapSkin(this._skinId, new ImageData(...i.DIMENSIONS), 1);
      this.runtime.renderer.updateDrawableVisible(this._drawable, false);
    }
    this._renderPreviewFrame = null;
  }
  _setupPreview() {
    const {
      renderer: e
    } = this.runtime;
    if (e) {
      if (this._skinId === -1 && this._drawable === -1) {
        this._skinId = e.createBitmapSkin(new ImageData(...i.DIMENSIONS), 1);
        this._drawable = e.createDrawable(r.VIDEO_LAYER);
        e.updateDrawableSkinId(this._drawable, this._skinId);
        if (e.markSkinAsPrivate) {
          e.markSkinAsPrivate(this._skinId);
        }
        if (e.markDrawableAsNoninteractive) {
          e.markDrawableAsNoninteractive(this._drawable);
        }
      }
      if (!this._renderPreviewFrame) {
        e.updateDrawableEffect(this._drawable, "ghost", this._forceTransparentPreview ? 100 : this._ghost);
        e.updateDrawableVisible(this._drawable, true);
        this._renderPreviewFrame = () => {
          clearTimeout(this._renderPreviewTimeout);
          if (!this._renderPreviewFrame) {
            return;
          }
          this._renderPreviewTimeout = setTimeout(this._renderPreviewFrame, this.runtime.currentStepTime);
          const t = this.getFrame({
            format: i.FORMAT_IMAGE_DATA,
            cacheTimeout: this.runtime.currentStepTime
          });
          if (t) {
            e.updateBitmapSkin(this._skinId, t, 1);
            this.runtime.requestRedraw();
          } else {
            e.updateBitmapSkin(this._skinId, new ImageData(...i.DIMENSIONS), 1);
          }
        };
        this._renderPreviewFrame();
      }
    }
  }
  get videoReady() {
    return !!this.provider && this.provider.videoReady;
  }
  postData(e) {
    let {
      forceTransparentPreview: t
    } = e;
    this._forceTransparentPreview = t;
    this.setPreviewGhost(this._ghost);
  }
}
module.exports = i;