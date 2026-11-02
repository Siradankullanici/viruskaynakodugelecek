module.exports = class {
  constructor(e) {
    this.runtime = e;
  }
  postData(e) {
    const t = {};
    if (e.deltaY < 0) {
      t.KEY_OPTION = "up arrow";
    } else {
      if (!(e.deltaY > 0)) {
        return;
      }
      t.KEY_OPTION = "down arrow";
    }
    this.runtime.startHats("event_whenkeypressed", t);
  }
};