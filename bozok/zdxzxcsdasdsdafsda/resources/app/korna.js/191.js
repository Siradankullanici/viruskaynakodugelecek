module.exports = class {
  constructor(e) {
    if (e.trim().length === 0) {
      throw new Error("prefix cannot be empty");
    }
    this.prefix = e;
    this.count = 0;
  }
  next() {
    return `${this.prefix}${this.count++}`;
  }
};