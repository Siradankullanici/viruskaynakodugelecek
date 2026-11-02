const r = require("./37.js");
module.exports = class {
  constructor(e) {
    this.audioContext = e;
    this.connectingToMic = false;
    this.mic = null;
  }
  getLoudness() {
    if (!this.mic && !this.connectingToMic) {
      this.connectingToMic = true;
      navigator.mediaDevices.getUserMedia({
        audio: true
      }).then(e => {
        this.audioStream = e;
        this.mic = this.audioContext.createMediaStreamSource(e);
        this.analyser = this.audioContext.createAnalyser();
        this.mic.connect(this.analyser);
        this.micDataArray = new Float32Array(this.analyser.fftSize);
      }).catch(e => {
        r.warn(e);
      });
    }
    if (this.mic && this.audioStream.active) {
      this.analyser.getFloatTimeDomainData(this.micDataArray);
      let e = 0;
      for (let t = 0; t < this.micDataArray.length; t++) {
        e += Math.pow(this.micDataArray[t], 2);
      }
      let t = Math.sqrt(e / this.micDataArray.length);
      if (this._lastValue) {
        t = Math.max(t, this._lastValue * 0.6);
      }
      this._lastValue = t;
      t *= 1.63;
      t = Math.sqrt(t);
      t = Math.round(t * 100);
      t = Math.min(t, 100);
      return t;
    }
    return -1;
  }
};