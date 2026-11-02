const r = require("./7.js");
const i = require("./31.js");
class s {
  constructor(e, t, n, i, o, a, c) {
    this.id = e || r();
    this.text = t;
    this.x = n;
    this.y = i;
    this.width = Math.max(Number(o), s.MIN_WIDTH);
    this.height = Math.max(Number(a), s.MIN_HEIGHT);
    this.minimized = c || false;
    this.blockId = null;
  }
  toXML() {
    return `<comment id="${this.id}" x="${this.x}" y="${this.y}" w="${this.width}" h="${this.height}" pinned="${this.blockId !== null}" minimized="${this.minimized}">${i(this.text)}</comment>`;
  }
  static get MIN_WIDTH() {
    return 20;
  }
  static get MIN_HEIGHT() {
    return 20;
  }
  static get DEFAULT_WIDTH() {
    return 100;
  }
  static get DEFAULT_HEIGHT() {
    return 100;
  }
}
module.exports = s;