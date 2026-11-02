class n {
  static get BACKGROUND_LAYER() {
    return "background";
  }
  static get VIDEO_LAYER() {
    return "video";
  }
  static get PEN_LAYER() {
    return "pen";
  }
  static get SPRITE_LAYER() {
    return "sprite";
  }
  static get LAYER_GROUPS() {
    return [n.BACKGROUND_LAYER, n.VIDEO_LAYER, n.PEN_LAYER, n.SPRITE_LAYER];
  }
}
module.exports = n;