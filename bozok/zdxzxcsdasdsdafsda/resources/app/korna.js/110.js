module.exports = class {
  getSandboxMode(e) {
    return Promise.resolve("worker");
  }
  canLoadExtensionFromProject(e) {
    return Promise.resolve(false);
  }
  rewriteExtensionURL(e) {
    return Promise.resolve(e);
  }
  canFetch(e) {
    return Promise.resolve(true);
  }
  canOpenWindow(e) {
    return Promise.resolve(true);
  }
  canRedirect(e) {
    return Promise.resolve(true);
  }
  canRecordAudio() {
    return Promise.resolve(true);
  }
  canRecordVideo() {
    return Promise.resolve(true);
  }
  canReadClipboard() {
    return Promise.resolve(true);
  }
  canNotify() {
    return Promise.resolve(true);
  }
  canGeolocate() {
    return Promise.resolve(true);
  }
  canEmbed(e) {
    return Promise.resolve(true);
  }
  canDownload(e, t) {
    return Promise.resolve(true);
  }
};