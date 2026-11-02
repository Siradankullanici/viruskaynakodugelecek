const r = require("./7.js");
const i = require("./31.js");
class s {
  constructor(e, t, n, i) {
    this.id = e || r();
    this.name = t;
    this.type = n;
    this.isCloud = i;
    switch (this.type) {
      case s.SCALAR_TYPE:
        this.value = 0;
        break;
      case s.LIST_TYPE:
        this.value = [];
        this._monitorUpToDate = false;
        break;
      case s.BROADCAST_MESSAGE_TYPE:
        this.value = this.name;
        break;
      default:
        throw new Error(`Invalid variable type: ${this.type}`);
    }
  }
  static create(e, t, n, r) {
    if (n === s.LIST_TYPE) {
      return new o(e, t, n, r);
    }
    return new class extends s {}(e, t, n, r);
  }
  static createSibling(e, t, n, r, i) {
    return new (0, e.constructor)(t, n, r, i);
  }
  toXML(e) {
    e = e === true;
    return `<variable type="${this.type}" id="${this.id}" islocal="${e}" iscloud="${this.isCloud}">${i(this.name)}</variable>`;
  }
  static get SCALAR_TYPE() {
    return "";
  }
  static get LIST_TYPE() {
    return "list";
  }
  static get BROADCAST_MESSAGE_TYPE() {
    return "broadcast_msg";
  }
}
class o extends s {}
module.exports = s;