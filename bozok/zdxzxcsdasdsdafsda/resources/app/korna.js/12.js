module.exports = class {
  static simple(e) {
    return JSON.parse(JSON.stringify(e));
  }
};