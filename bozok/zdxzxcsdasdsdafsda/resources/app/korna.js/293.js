class n {
  constructor(e, t = 0, n = e.byteLength, {
    _uint8View: r = new Uint8Array(e)
  } = {}) {
    this.arrayBuffer = e;
    this.start = t;
    this.end = n;
    this._uint8View = r;
    this._position = t;
  }
  extract(e) {
    return new n(this.arrayBuffer, this._position, this._position + e, this);
  }
  getLength() {
    return this.end - this.start;
  }
  getBytesAvailable() {
    return this.end - this._position;
  }
  get position() {
    return this._position - this.start;
  }
  set position(e) {
    this._position = e + this.start;
  }
  readUint8() {
    const e = this._uint8View[this._position];
    this._position += 1;
    return e;
  }
  readUint8String(e) {
    const t = this._uint8View;
    let n = "";
    const r = this._position + e;
    for (let e = this._position; e < r; e++) {
      n += String.fromCharCode(t[e]);
    }
    this._position += e;
    return n;
  }
  readInt16() {
    const e = new Int16Array(this.arrayBuffer, this._position, 1)[0];
    this._position += 2;
    return e;
  }
  readUint16() {
    const e = new Uint16Array(this.arrayBuffer, this._position, 1)[0];
    this._position += 2;
    return e;
  }
  readInt32() {
    let e;
    e = this._position % 4 == 0 ? new Int32Array(this.arrayBuffer, this._position, 1)[0] : new Int32Array(this.arrayBuffer.slice(this._position, this._position + 4))[0];
    this._position += 4;
    return e;
  }
  readUint32() {
    const e = new Uint32Array(this.arrayBuffer, this._position, 1)[0];
    this._position += 4;
    return e;
  }
}
module.exports = n;