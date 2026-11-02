const n = e => e != null;
class r {
  constructor(e) {
    var u;
    var m;
    this.id = e.id ?? null;
    this.spriteName = e.spriteName ?? null;
    this.targetId = e.targetId ?? null;
    this.opcode = e.opcode ?? null;
    this.value = e.value ?? null;
    this.params = e.params ?? null;
    this.mode = e.mode ?? "default";
    this.sliderMin = e.sliderMin ?? 0;
    this.sliderMax = e.sliderMax ?? 100;
    this.isDiscrete = (u = e.isDiscrete) === null || u === undefined || u;
    this.x = e.x ?? null;
    this.y = e.y ?? null;
    this.width = e.width ?? 0;
    this.height = e.height ?? 0;
    this.visible = (m = e.visible) === null || m === undefined || m;
  }
  get(e) {
    switch (e) {
      case "id":
        return this.id;
      case "spriteName":
        return this.spriteName;
      case "targetId":
        return this.targetId;
      case "opcode":
        return this.opcode;
      case "value":
        return this.value;
      case "params":
        return this.params;
      case "mode":
        return this.mode;
      case "sliderMin":
        return this.sliderMin;
      case "sliderMax":
        return this.sliderMax;
      case "isDiscrete":
        return this.isDiscrete;
      case "x":
        return this.x;
      case "y":
        return this.y;
      case "width":
        return this.width;
      case "height":
        return this.height;
      case "visible":
        return this.visible;
    }
    return null;
  }
  merge(e) {
    let t = false;
    if (n(e.id) && !Object.is(this.id, e.id)) {
      this.id = e.id;
      t = true;
    }
    if (n(e.spriteName) && !Object.is(this.spriteName, e.spriteName)) {
      this.spriteName = e.spriteName;
      t = true;
    }
    if (n(e.targetId) && !Object.is(this.targetId, e.targetId)) {
      this.targetId = e.targetId;
      t = true;
    }
    if (n(e.opcode) && !Object.is(this.opcode, e.opcode)) {
      this.opcode = e.opcode;
      t = true;
    }
    if (n(e.value) && !Object.is(this.value, e.value)) {
      this.value = e.value;
      t = true;
    }
    if (n(e.params) && !Object.is(this.params, e.params)) {
      this.params = e.params;
      t = true;
    }
    if (n(e.mode) && !Object.is(this.mode, e.mode)) {
      this.mode = e.mode;
      t = true;
    }
    if (n(e.sliderMin) && !Object.is(this.sliderMin, e.sliderMin)) {
      this.sliderMin = e.sliderMin;
      t = true;
    }
    if (n(e.sliderMax) && !Object.is(this.sliderMax, e.sliderMax)) {
      this.sliderMax = e.sliderMax;
      t = true;
    }
    if (n(e.isDiscrete) && !Object.is(this.isDiscrete, e.isDiscrete)) {
      this.isDiscrete = e.isDiscrete;
      t = true;
    }
    if (n(e.x) && !Object.is(this.x, e.x)) {
      this.x = e.x;
      t = true;
    }
    if (n(e.y) && !Object.is(this.y, e.y)) {
      this.y = e.y;
      t = true;
    }
    if (n(e.width) && !Object.is(this.width, e.width)) {
      this.width = e.width;
      t = true;
    }
    if (n(e.height) && !Object.is(this.height, e.height)) {
      this.height = e.height;
      t = true;
    }
    if (n(e.visible) && !Object.is(this.visible, e.visible)) {
      this.visible = e.visible;
      t = true;
    }
    return t;
  }
}
r.externalDeltaToJS = e => typeof e.toJS == "function" ? e.toJS() : e instanceof Map ? Object.fromEntries(Array.from(e.entries())) : e;
module.exports = r;