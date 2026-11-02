module.exports = class {
  constructor() {
    this._username = "";
  }
  postData(e) {
    this._username = e.username;
  }
  getUsername() {
    return this._username;
  }
};