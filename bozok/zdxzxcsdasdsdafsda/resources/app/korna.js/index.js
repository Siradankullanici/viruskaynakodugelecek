var r = {};
export let VM = a.a;
export let Renderer = l.a;
export let AudioEngine = p.a;
export let JSZip = s.a;
import * as i from "./22.js";
var s = i;
import * as o from "./55.js";
var a = o;
import * as c from "./85.js";
var l = c;
import * as u from "./91.js";
var h = u;
import * as d from "./92.js";
var p = d;
import * as f from "./25.js";
class m extends h {
  constructor() {
    super();
    this._totalAssets = 0;
    this._loadedAssets = 0;
  }
  _updateProgress() {
    if (this.onprogress) {
      this.onprogress(this._totalAssets, this._loadedAssets);
    }
  }
  load(e, t, n) {
    if (e === this.AssetType.ImageBitmap || e === this.AssetType.ImageVector || e === this.AssetType.Sound || e === this.AssetType.Font) {
      this._totalAssets++;
      this._updateProgress();
      return super.load(e, t, n).then(e => {
        this._loadedAssets++;
        this._updateProgress();
        return e;
      });
    } else {
      return super.load(e, t, n);
    }
  }
}
export var Storage = m;
class b {
  constructor() {
    this._events = {};
  }
  addEventListener(e, t) {
    this._events[e] ||= [];
    this._events[e].push(t);
  }
  removeEventListener(e, t) {
    const n = this._events[e];
    if (n) {
      this._events[e] = n.filter(e => e !== t);
    }
  }
  dispatchEvent(e) {
    const t = this._events[e.type];
    if (t) {
      for (const n of t) {
        n(e);
      }
    }
  }
}
const y = [];
const E = e => {
  let t;
  var n;
  if (y.length === 0) {
    n = {
      audio: false,
      video: e
    };
    t = navigator.mediaDevices ? navigator.mediaDevices.getUserMedia(n) : Promise.reject(new Error("video is not supported in this context (insecure domain?)"));
    y.push(t);
  } else if (y.length > 0) {
    t = y[0];
    y.push(true);
  }
  return t;
};
class T {
  constructor() {
    this.mirror = true;
    this._frameCacheTimeout = 16;
    this._video = null;
    this._track = null;
    this._workspace = [];
  }
  static get FORMAT_IMAGE_DATA() {
    return "image-data";
  }
  static get FORMAT_CANVAS() {
    return "canvas";
  }
  static get DIMENSIONS() {
    return [480, 360];
  }
  static get ORDER() {
    return 1;
  }
  get video() {
    return this._video;
  }
  enableVideo() {
    this.enabled = true;
    return this._setupVideo();
  }
  disableVideo() {
    this.enabled = false;
    if (this._singleSetup) {
      this._singleSetup.then(this._teardown.bind(this)).catch(e => this.onError(e));
    }
  }
  _teardown() {
    if (this.enabled === false) {
      y.pop();
      const e = !(y.length > 0);
      this._singleSetup = null;
      this._video = null;
      if (this._track && e) {
        this._track.stop();
      }
      this._track = null;
    }
  }
  getFrame(e) {
    let {
      dimensions: t = T.DIMENSIONS,
      mirror: n = this.mirror,
      format: r = T.FORMAT_IMAGE_DATA,
      cacheTimeout: i = this._frameCacheTimeout
    } = e;
    if (!this.videoReady) {
      return null;
    }
    const [s, o] = t;
    const a = this._getWorkspace({
      dimensions: t,
      mirror: Boolean(n)
    });
    const {
      videoWidth: c,
      videoHeight: l
    } = this._video;
    const {
      canvas: u,
      context: h,
      lastUpdate: d,
      cacheData: p
    } = a;
    const f = Date.now();
    if (d + i < f) {
      if (n) {
        h.scale(-1, 1);
        h.translate(s * -1, 0);
      }
      h.drawImage(this._video, 0, 0, c, l, 0, 0, s, o);
      h.setTransform(1, 0, 0, 1, 0, 0);
      a.lastUpdate = f;
    }
    p[r] ||= {
      lastUpdate: 0
    };
    const m = p[r];
    if (m.lastUpdate + i < f) {
      if (r === T.FORMAT_IMAGE_DATA) {
        m.lastData = h.getImageData(0, 0, s, o);
      } else if (r === T.FORMAT_CANVAS) {
        m.lastUpdate = Infinity;
        m.lastData = u;
      } else {
        console.error(`video io error - unimplemented format ${r}`);
        m.lastUpdate = Infinity;
        m.lastData = null;
      }
      m.lastUpdate = Math.max(a.lastUpdate, m.lastUpdate);
    }
    return m.lastData;
  }
  onError(e) {
    console.error("Unhandled video io device error", e);
  }
  _setupVideo() {
    this._singleSetup ||= E({
      width: {
        min: 480,
        ideal: 640
      },
      height: {
        min: 360,
        ideal: 480
      }
    }).then(e => {
      this._video = document.createElement("video");
      try {
        this._video.srcObject = e;
      } catch (t) {
        this._video.src = window.URL.createObjectURL(e);
      }
      this._video.play();
      this._track = e.getTracks()[0];
      return this;
    }).catch(e => {
      this._singleSetup = null;
      this.onError(e);
    });
    return this._singleSetup;
  }
  get videoReady() {
    if (!this.enabled) {
      return false;
    }
    if (!this._video) {
      return false;
    }
    if (!this._track) {
      return false;
    }
    const {
      videoWidth: e,
      videoHeight: t
    } = this._video;
    return typeof e == "number" && typeof t == "number" && e !== 0 && t !== 0;
  }
  _getWorkspace(e) {
    let {
      dimensions: t,
      mirror: n
    } = e;
    let r = this._workspace.find(e => e.dimensions.join("-") === t.join("-") && e.mirror === n);
    if (!r) {
      r = {
        dimensions: t,
        mirror: n,
        canvas: document.createElement("canvas"),
        lastUpdate: 0,
        cacheData: {}
      };
      r.canvas.width = t[0];
      r.canvas.height = t[1];
      r.context = r.canvas.getContext("2d");
      this._workspace.push(r);
    }
    return r;
  }
}
var v = T;
export var Cloud = {
  CloudManager: class {
    constructor(e) {
      this.parent = e;
      this.providers = [];
      this.overrides = new Map();
    }
    hasCloudData() {
      return this.parent.vm.runtime.hasCloudData();
    }
    projectReady() {
      if (this.hasCloudData()) {
        for (const e of this.providers) {
          e.enable();
        }
      }
    }
    setVariable(e, t, n) {
      if (!this.overrides.has(t) || this.overrides.get(t) === e) {
        this.parent.vm.postIOData("cloud", {
          varUpdate: {
            name: t,
            value: n
          }
        });
      }
    }
    getUsername() {
      return this.parent._username;
    }
    addProvider(e) {
      e.manager = this;
      if (this.hasCloudData()) {
        e.enable();
      }
      this.providers.push(e);
    }
    requestCloseConnection() {}
    createVariable(e, t) {}
    renameVariable(e, t) {}
    deleteVariable(e) {}
    addProviderOverride(e, t) {
      if (t && !this.providers.includes(t)) {
        throw new Error("Manager is not aware of this provider");
      }
      this.overrides.set(e, t);
    }
    updateVariable(e, t) {
      if (this.overrides.has(e)) {
        const n = this.overrides.get(e);
        if (n) {
          n.handleUpdateVariable(e, t);
        }
      } else {
        for (const n of this.providers) {
          n.handleUpdateVariable(e, t);
        }
      }
    }
  },
  WebSocketProvider: class {
    constructor(e, t) {
      this.cloudHosts = Array.isArray(e) ? e : [e];
      this.projectId = t;
      this.attemptedConnections = 0;
      this.bufferedMessages = [];
      this.scheduledBufferedSend = null;
      this.reconnectTimeout = null;
      this.openConnection = this.openConnection.bind(this);
      this._scheduledSendBufferedMessages = this._scheduledSendBufferedMessages.bind(this);
    }
    enable() {
      this.openConnection();
    }
    setProjectId(e) {
      this.projectId = e;
      this.closeAndReconnect();
    }
    openConnection() {
      if (!this.projectId) {
        console.warn("Project ID is empty. Cloud variable connection is unlikely to work.");
      }
      this.currentCloudHost = this.cloudHosts[this.attemptedConnections % this.cloudHosts.length];
      this.attemptedConnections++;
      console.log(`Connecting to ${this.currentCloudHost} with ID ${this.projectId}, username ${this.manager.getUsername()}`);
      try {
        this.ws = new WebSocket(this.currentCloudHost);
      } catch (e) {
        console.error(e);
        throw new Error(`Cloud host ${this.currentCloudHost} is invalid: ${e}`);
      }
      this.ws.onerror = this.onerror.bind(this);
      this.ws.onmessage = this.onmessage.bind(this);
      this.ws.onopen = this.onopen.bind(this);
      this.ws.onclose = this.onclose.bind(this);
    }
    onerror(e) {
      console.error("WebSocket error", e);
    }
    onmessage(e) {
      for (const t of e.data.split("\n")) {
        if (t) {
          const e = JSON.parse(t);
          if (e.method === "set") {
            this.manager.setVariable(this, e.name, e.value);
          }
        }
      }
    }
    onopen() {
      this.attemptedConnections = 0;
      this.writeToServer({
        method: "handshake"
      });
      this.sendBufferedMessages();
      console.log("WebSocket connected");
    }
    onclose(e) {
      if (e && e.code === 4002) {
        console.log("Username is invalid; not reconnecting.");
        return;
      }
      if (e && e.code === 4003) {
        console.log("Cloud variable server is full; not reconnecting.");
        return;
      }
      if (e && e.code === 4004) {
        console.log("Project is blocked; not reconnecting.");
        return;
      }
      const t = Math.random() * (Math.pow(2, Math.min(this.attemptedConnections + 1, 5)) - 1) * 1000;
      console.log(`Connection lost; reconnecting in ${Math.round(t)}ms`);
      this.reconnectTimeout = setTimeout(this.openConnection, t);
    }
    closeAndReconnect() {
      console.log("Closing connection and reconnecting.");
      if (this.ws) {
        this.ws.onclose = null;
        this.ws.onerror = null;
        this.ws.close();
      }
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = setTimeout(this.openConnection, 1000 / 30);
    }
    canWriteToServer() {
      return this.ws && this.ws.readyState === WebSocket.OPEN;
    }
    scheduleBufferedSend() {
      if (!this.scheduledBufferedSend) {
        this.scheduledBufferedSend = true;
        Promise.resolve().then(this._scheduledSendBufferedMessages);
      }
    }
    _scheduledSendBufferedMessages() {
      this.scheduledBufferedSend = false;
      if (this.canWriteToServer()) {
        this.sendBufferedMessages();
      }
    }
    sendBufferedMessages() {
      for (const e of this.bufferedMessages) {
        this.writeToServer(e);
      }
      this.bufferedMessages.length = 0;
    }
    bufferedWriteToServer(e) {
      this.bufferedMessages.push(e);
      this.scheduleBufferedSend();
    }
    writeToServer(e) {
      e.project_id = this.projectId;
      e.user = this.manager.getUsername();
      this.ws.send(JSON.stringify(e));
    }
    handleUpdateVariable(e, t) {
      for (const n of this.bufferedMessages) {
        if (n.name === e) {
          n.value = t;
          return;
        }
      }
      this.bufferedWriteToServer({
        method: "set",
        name: e,
        value: t
      });
    }
  },
  LocalStorageProvider: class {
    constructor(e = "p4:cloudvariables") {
      this.key = e;
      this.variables = {};
      this.handleStorageEvent = this.handleStorageEvent.bind(this);
    }
    readFromLocalStorage() {
      let e;
      try {
        e = JSON.parse(localStorage.getItem(this.key));
        if (!e || typeof e != "object") {
          return;
        }
      } catch (e) {
        return;
      }
      this.variables = e;
      for (const e of Object.keys(this.variables)) {
        this.manager.setVariable(this, e, this.variables[e]);
      }
    }
    storeToLocalStorage() {
      try {
        localStorage.setItem(this.key, JSON.stringify(this.variables));
      } catch (e) {}
    }
    handleStorageEvent(e) {
      if (e.key === this.key && e.storageArea === localStorage) {
        this.readFromLocalStorage();
      }
    }
    enable() {
      this.readFromLocalStorage();
      window.addEventListener("storage", this.handleStorageEvent);
    }
    handleUpdateVariable(e, t) {
      this.variables[e] = t;
      this.storeToLocalStorage();
    }
  }
};
import * as w from "./94.js";
var S = w;
import * as k from "./54.js";
var I = {
  insert: e => {
    var t = document.head || document.body || document.documentElement;
    t.insertBefore(e, t.firstChild);
  },
  singleton: false
};
S(k.a, I);
var O = k.a.locals || {};
const N = e => new Promise((t, n) => {
  const r = new FileReader();
  r.onload = () => t(r.result);
  r.onerror = () => n(new Error(`Cannot read as text: ${r.error}`));
  r.readAsText(e);
});
var R = class {
  constructor(e, t) {
    this.el = e;
    this.callback = t;
    this.el.addEventListener("dragover", this.ondragover.bind(this));
    this.el.addEventListener("dragleave", this.ondragleave.bind(this));
    this.el.addEventListener("drop", this.ondrop.bind(this));
  }
  ondragover(e) {
    if (e.dataTransfer.types.includes("Files")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      this.el.classList.add(O.dropping);
    }
  }
  ondragleave(e) {
    e.preventDefault();
    this.el.classList.remove(O.dropping);
  }
  ondrop(e) {
    e.preventDefault();
    this.el.classList.remove(O.dropping);
    if (e.dataTransfer.types.includes("Files") && e.dataTransfer.files.length > 0) {
      Promise.all(Array.from(e.dataTransfer.files).map(N)).then(e => {
        this.callback(e);
      });
    }
  }
};
var x = class {
  constructor(e, t) {
    this.parent = e;
    this.text = t;
    this.root = document.createElement("div");
    this.root.className = O.questionRoot;
    this.inner = document.createElement("div");
    this.inner.className = O.questionInner;
    if (t) {
      this.textElement = document.createElement("div");
      this.textElement.textContent = t;
      this.textElement.className = O.questionText;
    }
    this.inputContainer = document.createElement("div");
    this.inputContainer.className = O.questionInputOuter;
    this.input = document.createElement("input");
    this.input.className = O.questionInput;
    this.input.addEventListener("keypress", this.onkeypress.bind(this));
    this.dropper = new R(this.input, this.dropperCallback.bind(this));
    this.submitButton = document.createElement("button");
    this.submitButton.className = O.questionSubmitButton;
    this.submitButton.addEventListener("click", this.onsubmitpressclick.bind(this));
    this.inputContainer.appendChild(this.input);
    this.inputContainer.appendChild(this.submitButton);
    if (this.textElement) {
      this.inner.appendChild(this.textElement);
    }
    this.inner.appendChild(this.inputContainer);
    this.root.appendChild(this.inner);
    this.parent._addLayer(this.root);
    this.input.focus();
    this.answerCallback = new Promise(e => {
      this.callback = e;
    });
  }
  answer() {
    return this.answerCallback;
  }
  submit() {
    this.callback(this.input.value);
    this.destroy();
  }
  onkeypress(e) {
    if (e.key === "Enter") {
      this.submit();
    }
  }
  dropperCallback(e) {
    const t = e.join("").replace(/\r?\n/g, " ");
    this.input.value = t;
  }
  onsubmitpressclick() {
    this.submit();
  }
  destroy() {
    this.root.remove();
    this.parent.question = null;
  }
};
var M = class {
  constructor(e) {
    this.parent = e;
    this.root = document.createElement("div");
    this.root.className = O.contextMenu;
    this._onmousedown = this._onmousedown.bind(this);
    this._onresize = this._onresize.bind(this);
    this._onblur = this._onblur.bind(this);
  }
  _onmousedown(e) {
    if (!this.root.contains(e.target)) {
      this.destroy();
    }
  }
  _onresize() {
    this.destroy();
  }
  _onblur() {
    this.destroy();
  }
  add(e) {
    const t = document.createElement("button");
    t.className = O.contextMenuItem;
    t.textContent = e.text;
    t.addEventListener("click", () => {
      this.destroy();
      e.callback();
    });
    t.addEventListener("contextmenu", e => {
      e.preventDefault();
    });
    this.root.appendChild(t);
  }
  show(e) {
    document.addEventListener("mousedown", this._onmousedown);
    window.addEventListener("resize", this._onresize);
    window.addEventListener("blur", this._onblur);
    this.parent._addLayer(this.root);
    const t = this.parent.layersRect;
    const n = this.root.getBoundingClientRect();
    let r = e.clientX - t.left;
    let i = e.clientY - t.top;
    if (r + n.width > t.width) {
      r -= n.width;
    }
    if (i + n.height > t.height) {
      i -= n.height;
    }
    this.root.style.transform = `translate(${r}px, ${i}px)`;
    getComputedStyle(this.root).opacity;
    this.root.style.opacity = "1";
  }
  destroy() {
    document.removeEventListener("mousedown", this._onmousedown);
    window.removeEventListener("resize", this._onresize);
    window.removeEventListener("blur", this._onblur);
    this.root.style.opacity = "0";
    this.root.style.pointerEvents = "none";
    setTimeout(() => {
      this.root.remove();
    }, 200);
  }
};
var C = (e, t) => {
  if (typeof ExternalDownloadHelper != "undefined") {
    ExternalDownloadHelper.download(e, t);
    return;
  }
  const n = document.createElement("a");
  document.body.appendChild(n);
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(t, e);
  } else if ("download" in HTMLAnchorElement.prototype) {
    const r = window.URL.createObjectURL(t);
    n.href = r;
    n.download = e;
    n.type = t.type;
    n.click();
    window.setTimeout(() => {
      document.body.removeChild(n);
      window.URL.revokeObjectURL(r);
    }, 1000);
  } else {
    let e = window.open("", "_blank");
    const n = new FileReader();
    n.onloadend = function () {
      e.location.href = n.result;
      e = null;
    };
    n.readAsDataURL(t);
  }
};
const P = e => typeof e == "object" && e !== null ? JSON.stringify(e, (() => {
  const e = new WeakSet();
  return (t, n) => {
    if (typeof n == "object" && n !== null) {
      if (e.has(n)) {
        if (Array.isArray(n)) {
          return "[...]";
        } else {
          return "{...}";
        }
      }
      e.add(n);
    }
    return n;
  };
})()) : Object.is(e, -0) ? "-0" : `${e}`;
class L {
  constructor(e, t) {
    this.parent = e;
    this.id = t.get("id");
    this.spriteName = t.get("spriteName");
    this.targetId = t.get("targetId");
    this.opcode = t.get("opcode");
    this.params = t.get("params");
    this.root = document.createElement("div");
    this.root.className = O.monitorRoot;
    this.root.dataset.id = this.id;
    this.root.dataset.opcode = this.opcode;
    this.parent._monitorOverlay.appendChild(this.root);
  }
  getLabel() {
    let e;
    if (this.opcode === "data_variable") {
      e = this.params.VARIABLE;
    } else if (this.opcode === "data_listcontents") {
      e = this.params.LIST;
    } else if (this.opcode === "motion_xposition") {
      e = this.parent.getMessage("var-x");
    } else if (this.opcode === "motion_yposition") {
      e = this.parent.getMessage("var-y");
    } else if (this.opcode === "motion_direction") {
      e = this.parent.getMessage("var-direction");
    } else if (this.opcode === "sensing_username") {
      e = this.parent.getMessage("var-username");
    } else if (this.opcode === "looks_costumenumbername") {
      e = this.params.NUMBER_NAME === "number" ? this.parent.getMessage("var-costume-number") : this.parent.getMessage("var-costume-name");
    } else if (this.opcode === "looks_backdropnumbername") {
      e = this.params.NUMBER_NAME === "number" ? this.parent.getMessage("var-backdrop-number") : this.parent.getMessage("var-backdrop-name");
    } else if (this.opcode === "looks_size") {
      e = this.parent.getMessage("var-size");
    } else if (this.opcode === "sensing_answer") {
      e = this.parent.getMessage("var-answer");
    } else if (this.opcode === "sensing_mousedown") {
      e = this.parent.getMessage("var-mousedown");
    } else if (this.opcode === "sensing_mousex") {
      e = this.parent.getMessage("var-mousex");
    } else if (this.opcode === "sensing_mousey") {
      e = this.parent.getMessage("var-mousey");
    } else if (this.opcode === "sensing_loudness") {
      e = this.parent.getMessage("var-loudness");
    } else if (this.opcode === "sensing_timer") {
      e = this.parent.getMessage("var-timer");
    } else if (this.opcode === "sensing_dayssince2000") {
      e = this.parent.getMessage("var-dayssince2000");
    } else if (this.opcode === "sound_volume") {
      e = this.parent.getMessage("var-volume");
    } else if (this.opcode === "sensing_current") {
      const t = this.params.CURRENTMENU.toLowerCase();
      if (t === "year") {
        e = this.parent.getMessage("var-year");
      } else if (t === "month") {
        e = this.parent.getMessage("var-month");
      } else if (t === "date") {
        e = this.parent.getMessage("var-date");
      } else if (t === "dayofweek") {
        e = this.parent.getMessage("var-day-of-week");
      } else if (t === "hour") {
        e = this.parent.getMessage("var-hour");
      } else if (t === "minute") {
        e = this.parent.getMessage("var-minute");
      } else if (t === "second") {
        e = this.parent.getMessage("var-second");
      }
    } else {
      const t = this.parent.vm.runtime.getLabelForOpcode(this.opcode);
      e = t ? t.label : this.opcode;
    }
    if (this.spriteName) {
      return `${this.spriteName}: ${e}`;
    } else {
      return e;
    }
  }
  getTarget() {
    if (this.targetId) {
      return this.parent.vm.runtime.getTargetById(this.targetId);
    } else {
      return this.parent.vm.runtime.getTargetForStage();
    }
  }
  getVmVariable() {
    return this.getTarget().variables[this.id];
  }
  update(e) {
    this.x = e.get("x");
    this.y = e.get("y");
    this.visible = e.get("visible");
    this.root.style.transform = `translate(${Math.round(this.x)}px, ${Math.round(this.y)}px)`;
    this.root.style.display = this.visible ? "" : "none";
  }
}
class D extends L {
  constructor(e, t) {
    super(e, t);
    this.mode = t.get("mode");
    if (this.mode === "large") {
      this.valueElement = document.createElement("div");
      this.valueElement.className = O.monitorLargeValue + " " + O.monitorValueColor;
      this.root.appendChild(this.valueElement);
    } else {
      this.inner = document.createElement("div");
      this.inner.className = O.monitorInner;
      this.valueRow = document.createElement("div");
      this.valueRow.className = O.monitorRow;
      this.label = document.createElement("div");
      this.label.className = O.monitorLabel;
      this.label.textContent = this.getLabel();
      this.valueElement = document.createElement("div");
      this.valueElement.className = O.monitorValue + " " + O.monitorValueColor;
      this.valueRow.appendChild(this.label);
      this.valueRow.appendChild(this.valueElement);
      this.inner.appendChild(this.valueRow);
      if (this.mode === "slider") {
        this.sliderRow = document.createElement("div");
        this.sliderRow.className = O.monitorRow;
        this.slider = document.createElement("input");
        this.slider.className = O.monitorSlider;
        this.slider.type = "range";
        this.slider.min = t.get("sliderMin");
        this.slider.max = t.get("sliderMax");
        this.slider.step = t.get("isDiscrete") ? 1 : 0.01;
        this.slider.addEventListener("input", this.onsliderchange.bind(this));
        this.sliderRow.appendChild(this.slider);
        this.inner.appendChild(this.sliderRow);
      }
      this.root.appendChild(this.inner);
    }
    this.parent._monitorOverlay.appendChild(this.root);
    this._value = "";
  }
  setVariableValue(e) {
    const t = this.getVmVariable();
    t.value = e;
    if (t.isCloud) {
      this.parent.vm.runtime.ioDevices.cloud.requestUpdateVariable(t.name, t.value);
    }
    this._value = e;
    this.valueElement.textContent = e;
  }
  onsliderchange(e) {
    this.setVariableValue(+e.target.value);
  }
  update(e) {
    super.update(e);
    if (!this.visible) {
      return;
    }
    let t = e.get("value");
    if (typeof t == "number" && !Object.is(t, -0)) {
      t = Number(t.toFixed(6));
    }
    t = P(t);
    if (this._value !== t) {
      this._value = t;
      this.valueElement.textContent = t;
      if (this.slider) {
        this.slider.value = t;
      }
    }
  }
}
class B {
  constructor(e) {
    this.monitor = e;
    this.index = -1;
    this.value = "";
    this.isFocused = false;
    this.root = document.createElement("label");
    this.root.className = O.monitorRowRoot;
    this.indexEl = document.createElement("div");
    this.indexEl.className = O.monitorRowIndex;
    this.valueOuter = document.createElement("div");
    this.valueOuter.className = O.monitorRowValueOuter;
    this.editable = this.monitor.editable;
    if (this.editable) {
      this.valueInner = document.createElement("input");
      this.valueInner.className = O.monitorRowValueInner;
      this.valueInner.addEventListener("focusin", this._onfocusin.bind(this));
      this.valueInner.addEventListener("focusout", this._onfocusout.bind(this));
      this.valueInner.addEventListener("keypress", this._onkeypress.bind(this));
      this.valueInner.addEventListener("keydown", this._onkeydown.bind(this));
      this.valueInner.addEventListener("input", this._oninput.bind(this));
      this.valueOuter.appendChild(this.valueInner);
      this.deleteButton = document.createElement("button");
      this.deleteButton.className = O.monitorRowDelete;
      this.deleteButton.textContent = "×";
      this.deleteButton.addEventListener("mousedown", this._onclickdelete.bind(this));
      this.valueOuter.appendChild(this.deleteButton);
    } else {
      this.valueInner = document.createElement("div");
      this.valueInner.className = O.monitorRowValueInner;
      this.valueOuter.appendChild(this.valueInner);
    }
    this.valueInner.addEventListener("contextmenu", this._oncontextmenu.bind(this));
    this.root.appendChild(this.indexEl);
    this.root.appendChild(this.valueOuter);
  }
  isLocked() {
    return this.isFocused;
  }
  _onfocusin() {
    if (!this.isFocused) {
      this.isFocused = true;
      this.valueInner.select();
      this.root.classList.add(O.monitorRowValueEditing);
      this.addNewValue = false;
      this.deleteValue = false;
      this.valueWasChanged = false;
    }
  }
  _onfocusout() {
    if (this.isFocused) {
      this.value = this.valueInner.value;
      this.isFocused = false;
      this.root.classList.remove(O.monitorRowValueEditing);
      if (this.deleteValue) {
        const e = [...this.monitor.value];
        e.splice(this.index, 1);
        this.monitor.setValue(e);
        this.monitor.tryToFocusRow(Math.min(e.length - 1, this.index));
      } else if (this.valueWasChanged || this.addNewValue) {
        const e = [...this.monitor.value];
        e[this.index] = this.value;
        if (this.addNewValue) {
          e.splice(this.index + 1, 0, "");
        }
        this.monitor.setValue(e);
        if (this.addNewValue) {
          this.monitor.tryToFocusRow(this.index + 1);
        }
      }
    }
  }
  _oninput() {
    this.valueWasChanged = true;
  }
  _onkeypress(e) {
    if (e.key === "Enter") {
      this.addNewValue = true;
      this.valueInner.blur();
    }
  }
  _onkeydown(e) {
    if (e.key === "Escape") {
      this.valueInner.blur();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault();
      let t = this.index;
      if (e.key === "ArrowUp" || e.key === "Tab" && e.shiftKey) {
        t--;
        if (t < 0) {
          t = this.monitor.value.length - 1;
        }
      } else {
        t++;
        if (t >= this.monitor.value.length) {
          t = 0;
        }
      }
      this.monitor.tryToFocusRow(t);
    }
  }
  _onclickdelete(e) {
    e.preventDefault();
    this.deleteValue = true;
    this.valueInner.blur();
  }
  _oncontextmenu(e) {
    if (this.editable) {
      e.stopPropagation();
    } else {
      const t = getSelection();
      if (this.valueInner.contains(t.anchorNode) && !t.isCollapsed) {
        e.stopPropagation();
      }
    }
  }
  setIndex(e) {
    if (this.index !== e) {
      this.index = e;
      this.root.dataset.index = e;
      this.root.style.transform = `translateY(${e * 24}px)`;
      this.indexEl.textContent = e + 1;
    }
  }
  setValue(e) {
    e = P(e);
    if (this.value !== e && !this.isFocused) {
      this.value = e;
      if (this.editable) {
        this.valueInner.value = e;
      } else {
        this.valueInner.textContent = e;
      }
    }
  }
  focus() {
    if (!this.isFocused) {
      this.valueInner.focus();
    }
  }
  unfocus() {
    if (this.isFocused) {
      this.valueInner.blur();
    }
  }
}
class U extends L {
  constructor(e, t) {
    super(e, t);
    this.editable = e.editableLists;
    this.rows = new Map();
    this.cachedRows = [];
    this.scrollTop = 0;
    this.oldLength = -1;
    this.label = document.createElement("div");
    this.label.className = O.monitorListLabel;
    this.label.textContent = this.getLabel();
    this.footer = document.createElement("div");
    this.footer.className = O.monitorListFooter;
    this.footerText = document.createElement("div");
    this.footerText.className = O.monitorListFooterText;
    this.rowsOuter = document.createElement("div");
    this.rowsOuter.className = O.monitorRowsOuter;
    this.rowsInner = document.createElement("div");
    this.rowsInner.className = O.monitorRowsInner;
    this.rowsInner.addEventListener("scroll", this._onscroll.bind(this), {
      passive: true
    });
    this.endPoint = document.createElement("div");
    this.endPoint.className = O.monitorRowsEndpoint;
    this.emptyLabel = document.createElement("div");
    this.emptyLabel.textContent = e.getMessage("list-empty");
    this.emptyLabel.className = O.monitorEmpty;
    if (this.editable) {
      this.addButton = document.createElement("button");
      this.addButton.className = O.monitorListAdd;
      this.addButton.textContent = "+";
      this.addButton.addEventListener("click", this._onclickaddbutton.bind(this));
      this.footer.appendChild(this.addButton);
    }
    this.rowsInner.appendChild(this.endPoint);
    this.rowsInner.appendChild(this.emptyLabel);
    this.rowsOuter.appendChild(this.rowsInner);
    this.footer.appendChild(this.footerText);
    this.root.appendChild(this.label);
    this.root.appendChild(this.rowsOuter);
    this.root.appendChild(this.footer);
    this.dropper = new R(this.rowsOuter, this.dropperCallback.bind(this));
    this.handleImport = this.handleImport.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.root.addEventListener("contextmenu", this._oncontextmenu.bind(this));
  }
  _onclickaddbutton(e) {
    this.setValue([...this.value, ""]);
    this.tryToFocusRow(this.value.length - 1);
  }
  unfocusAllRows() {
    for (const e of this.rows.values()) {
      e.unfocus();
    }
  }
  tryToFocusRow(e) {
    if (e >= 0 && e < this.value.length) {
      this.unfocusAllRows();
      let t = this.rows.get(e);
      t ||= this.createRow(e);
      t.focus();
    }
  }
  _onscroll(e) {
    this.scrollTop = e.target.scrollTop;
    this.updateValue(this.value);
  }
  _oncontextmenu(e) {
    e.preventDefault();
    const t = new M(this.parent);
    t.add({
      text: this.parent.getMessage("list-import"),
      callback: this.handleImport
    });
    t.add({
      text: this.parent.getMessage("list-export"),
      callback: this.handleExport
    });
    t.show(e);
  }
  handleImport() {
    const e = document.createElement("input");
    e.type = "file";
    e.accept = ".txt,.csv,.tsv";
    e.style.display = "none";
    document.body.appendChild(e);
    e.addEventListener("change", e => {
      const t = e.target.files;
      if (t.length === 0) {
        return;
      }
      const n = t[0];
      N(n).then(e => this.import(e));
    });
    e.click();
  }
  import(e) {
    const t = e.split(/\r?\n/);
    this.setValue(t);
  }
  handleExport() {
    const e = this.getValue().join("\n");
    const t = new Blob([e], {
      type: "text/plain"
    });
    C(`${this.getLabel()}.txt`, t);
  }
  dropperCallback(e) {
    this.import(e.join("\n"));
  }
  getValue() {
    return this.getVmVariable().value;
  }
  setValue(e) {
    this.getVmVariable().value = e;
    this.updateValue(e);
  }
  update(e) {
    super.update(e);
    if (this.visible) {
      this.width = e.get("width") || 100;
      this.height = e.get("height") || 200;
      this.root.style.width = `${this.width}px`;
      this.root.style.height = `${this.height}px`;
      this.updateValue(e.get("value"));
    }
  }
  createRow(e) {
    const t = this.cachedRows.pop() || new B(this);
    t.setIndex(e);
    t.setValue(this.value[e]);
    this.rows.set(e, t);
    let n = false;
    for (const r of this.rowsInner.children) {
      const i = r.dataset.index;
      if (!i) {
        continue;
      }
      if (+i > e) {
        this.rowsInner.insertBefore(t.root, r);
        n = true;
        break;
      }
    }
    if (!n) {
      this.rowsInner.appendChild(t.root);
    }
    return t;
  }
  updateValue(e) {
    this.value = e;
    if (e.length !== this.oldLength) {
      this.oldLength = e.length;
      this.footerText.textContent = this.parent.getMessage("list-length").replace("{n}", e.length);
      this.endPoint.style.transform = `translateY(${e.length * 24}px)`;
      this.emptyLabel.style.display = e.length ? "none" : "";
    }
    let t = Math.floor(this.scrollTop / 24) - 5;
    if (t < 0) {
      t = 0;
    }
    let n = Math.ceil((this.scrollTop + this.height) / 24) + 3;
    if (n > e.length - 1) {
      n = e.length - 1;
    }
    for (const r of this.rows.keys()) {
      if (r < t || r > n) {
        const t = this.rows.get(r);
        if (!t.isLocked() || r >= e.length) {
          t.unfocus();
          t.root.remove();
          this.rows.delete(r);
          if (this.cachedRows.length < 10) {
            this.cachedRows.push(t);
          }
        }
      }
    }
    for (let r = t; r <= n; r++) {
      const t = this.rows.get(r);
      if (t) {
        t.setValue(e[r]);
      } else {
        this.createRow(r);
      }
    }
  }
}
var F = class {
  constructor() {
    this.hasItem = false;
    this.root = document.createElement("div");
    this.root.className = O.controlsBar;
    this.start = document.createElement("div");
    this.end = document.createElement("div");
    this.root.appendChild(this.start);
    this.root.appendChild(this.end);
  }
  addToStart(e) {
    this.hasItem = true;
    this.start.appendChild(e);
  }
  addToEnd(e) {
    this.hasItem = true;
    this.end.appendChild(e);
  }
  computeHeight() {
    if (this.hasItem) {
      return this.root.getBoundingClientRect().height;
    } else {
      return 0;
    }
  }
};
const j = e => typeof e == "number" || typeof e == "string" || typeof e == "boolean";
import * as z from "./98.js";
const G = e => e.touches && e.touches[0] ? {
  x: e.touches[0].clientX,
  y: e.touches[0].clientY
} : e.changedTouches && e.changedTouches[0] ? {
  x: e.changedTouches[0].clientX,
  y: e.changedTouches[0].clientY
} : {
  x: e.clientX,
  y: e.clientY
};
const V = e => typeof e == "function" ? e : () => e;
export class Scaffolding extends b {
  constructor() {
    super();
    this.width = 480;
    this.height = 360;
    this.resizeMode = "preserve-ratio";
    this.editableLists = false;
    this.shouldConnectPeripherals = true;
    this.usePackagedRuntime = false;
    this.messages = z;
    this._monitors = new Map();
    this._mousedownPosition = null;
    this._draggingId = null;
    this._draggingStartMousePosition = null;
    this._draggingStartSpritePosition = null;
    this._offsetFromTop = 0;
    this._offsetFromBottom = 0;
    this._offsetFromLeft = 0;
    this._offsetFromRight = 0;
    this._root = document.createElement("div");
    this._root.className = O.root;
    this._layers = document.createElement("div");
    this._layers.className = O.layers;
    this._root.appendChild(this._layers);
    this._canvas = document.createElement("canvas");
    this._canvas.className = O.canvas;
    this._addLayer(this._canvas);
    this._overlays = document.createElement("div");
    this._overlays.className = O.scaledOverlaysInner;
    this._overlaysOuter = document.createElement("div");
    this._overlaysOuter.className = O.scaledOverlaysOuter;
    this._overlaysOuter.appendChild(this._overlays);
    this._addLayer(this._overlaysOuter);
    this._monitorOverlay = document.createElement("div");
    this._monitorOverlay.className = O.monitorOverlay;
    this._overlays.appendChild(this._monitorOverlay);
    this._topControls = new F();
    this._layers.appendChild(this._topControls.root);
    document.addEventListener("mousemove", this._onmousemove.bind(this));
    this._canvas.addEventListener("mousedown", this._onmousedown.bind(this));
    document.addEventListener("mouseup", this._onmouseup.bind(this));
    this._canvas.addEventListener("touchstart", this._ontouchstart.bind(this));
    document.addEventListener("touchmove", this._ontouchmove.bind(this));
    document.addEventListener("touchend", this._ontouchend.bind(this));
    this._canvas.addEventListener("contextmenu", this._oncontextmenu.bind(this));
    this._canvas.addEventListener("wheel", this._onwheel.bind(this));
    document.addEventListener("keydown", this._onkeydown.bind(this));
    document.addEventListener("keyup", this._onkeyup.bind(this));
    window.addEventListener("resize", this._onresize.bind(this));
  }
  _addLayer(e) {
    this._layers.appendChild(e);
  }
  _scratchCoordinates(e, t) {
    return {
      x: this.width / this.layersRect.width * (e - this.layersRect.width / 2),
      y: -this.height / this.layersRect.height * (t - this.layersRect.height / 2)
    };
  }
  _onmousemove(e) {
    const {
      x: t,
      y: n
    } = G(e);
    const r = {
      x: t - this.layersRect.left,
      y: n - this.layersRect.top,
      canvasWidth: this.layersRect.width,
      canvasHeight: this.layersRect.height
    };
    if (this._mousedownPosition && !this._draggingId) {
      if (Math.sqrt(Math.pow(r.x - this._mousedownPosition.x, 2) + Math.pow(r.y - this._mousedownPosition.y, 2)) > 3) {
        this._startDragging(r.x, r.y);
        this._cancelDragTimeout();
      }
    } else if (this._draggingId) {
      const e = this._scratchCoordinates(r.x, r.y);
      this.vm.postSpriteInfo({
        x: e.x - this._draggingStartMousePosition.x + this._draggingStartSpritePosition.x,
        y: e.y - this._draggingStartMousePosition.y + this._draggingStartSpritePosition.y,
        force: true
      });
    }
    this.vm.postIOData("mouse", r);
  }
  _startDragging(e, t) {
    if (this._draggingId) {
      return;
    }
    const n = this.renderer.pick(e, t);
    if (n === -1 || n === false) {
      return;
    }
    const r = this.vm.getTargetIdForDrawableId(n);
    if (r === null) {
      return;
    }
    const i = this.vm.runtime.getTargetById(r);
    if (i.draggable) {
      i.goToFront();
      this._draggingId = r;
      this._draggingStartMousePosition = this._scratchCoordinates(e, t);
      this._draggingStartSpritePosition = {
        x: i.x,
        y: i.y
      };
      this.vm.startDrag(r);
    }
  }
  _cancelDragTimeout() {
    clearTimeout(this._dragTimeout);
    this._dragTimeout = null;
  }
  _onmousedown(e) {
    const {
      x: t,
      y: n
    } = G(e);
    const r = {
      x: t - this.layersRect.left,
      y: n - this.layersRect.top,
      button: e.button,
      canvasWidth: this.layersRect.width,
      canvasHeight: this.layersRect.height,
      isDown: true
    };
    const i = typeof TouchEvent != "undefined" && e instanceof TouchEvent;
    if (e.button === 0 || i) {
      this._dragTimeout = setTimeout(this._startDragging.bind(this, r.x, r.y), 400);
    }
    if (i) {
      e.preventDefault();
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
    }
    this._mousedownPosition = {
      x: r.x,
      y: r.y
    };
    this.vm.postIOData("mouse", r);
  }
  _onmouseup(e) {
    this._cancelDragTimeout();
    const {
      x: t,
      y: n
    } = G(e);
    const r = {
      x: t - this.layersRect.left,
      y: n - this.layersRect.top,
      button: e.button,
      canvasWidth: this.layersRect.width,
      canvasHeight: this.layersRect.height,
      isDown: false,
      wasDragged: this._draggingId !== null
    };
    this._mousedownPosition = null;
    this.vm.postIOData("mouse", r);
    if (this._draggingId) {
      this.vm.stopDrag(this._draggingId);
      this._draggingStartMousePosition = null;
      this._draggingStartSpritePosition = null;
      this._draggingId = null;
    }
  }
  _ontouchstart(e) {
    this._onmousedown(e);
  }
  _ontouchmove(e) {
    this._onmousemove(e);
  }
  _ontouchend(e) {
    this._onmouseup(e);
  }
  _oncontextmenu(e) {
    e.preventDefault();
  }
  _onwheel(e) {
    const t = {
      deltaX: e.deltaX,
      deltaY: e.deltaY
    };
    this.vm.postIOData("mouseWheel", t);
  }
  _onkeydown(e) {
    if (e.target !== document && e.target !== document.body) {
      return;
    }
    const t = {
      key: e.key,
      keyCode: e.keyCode,
      isDown: true
    };
    this.vm.postIOData("keyboard", t);
    if (e.keyCode === 32 || e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 8 || e.keyCode === 222 || e.keyCode === 191) {
      e.preventDefault();
    }
  }
  _onkeyup(e) {
    const t = {
      key: e.key,
      keyCode: e.keyCode,
      isDown: false
    };
    this.vm.postIOData("keyboard", t);
    if (e.target !== document && e.target !== document.body) {
      e.preventDefault();
    }
  }
  _onresize() {
    this.relayout();
  }
  relayout() {
    const e = this._root.getBoundingClientRect();
    const t = Math.max(1, e.width);
    const n = Math.max(1, e.height);
    const r = this._offsetFromTop + this._topControls.computeHeight();
    const i = this._offsetFromBottom;
    const s = this._offsetFromLeft;
    const o = this._offsetFromRight;
    const a = Math.max(1, t - s - o);
    const c = Math.max(1, n - r - i);
    if (this.resizeMode === "dynamic-resize") {
      if (this.vm.setStageSize) {
        this.width = a;
        this.height = c;
        this.vm.setStageSize(this.width, this.height);
      } else {
        console.warn("dynamic-resize not supported: vm does not implement setStageSize");
      }
    }
    let l = a;
    let u = c;
    if (this.resizeMode !== "stretch") {
      l = u / this.height * this.width;
      if (l > a) {
        u = a / this.width * this.height;
        l = a;
      }
    }
    const h = window.devicePixelRatio || 1;
    const d = e => Math.round(e * h) / h;
    l = d(l);
    u = d(u);
    const p = n - u;
    const f = t - l;
    const m = d((f - s - o) / 2 + s - f / 2);
    const g = d((p - r - i) / 2 + r - p / 2);
    this._layers.style.transform = `translate(${m}px, ${g}px)`;
    this._layers.style.width = `${l}px`;
    this._layers.style.height = `${u}px`;
    this._overlays.style.transform = `scale(${l / this.width}, ${u / this.height})`;
    this.renderer.resize(l, u);
    this.layersRect = this._layers.getBoundingClientRect();
  }
  appendTo(e) {
    e.appendChild(this._root);
    this.relayout();
  }
  setup() {
    this.vm = new a();
    this.vm.setCompatibilityMode(true);
    this.vm.setLocale(navigator.language);
    this.vm.on("MONITORS_UPDATE", this._onmonitorsupdate.bind(this));
    this.vm.runtime.on("QUESTION", this._onquestion.bind(this));
    this.vm.on("PROJECT_RUN_START", () => this.dispatchEvent(new Event("PROJECT_RUN_START")));
    this.vm.on("PROJECT_RUN_STOP", () => this.dispatchEvent(new Event("PROJECT_RUN_STOP")));
    if (this.usePackagedRuntime && this.vm.convertToPackagedRuntime) {
      this.vm.convertToPackagedRuntime();
    }
    if (this.vm.setStageSize) {
      this.vm.setStageSize(this.width, this.height);
    }
    if (this.vm.runtime.cloudOptions) {
      this.vm.runtime.cloudOptions.limit = Infinity;
    }
    this.vm.on("STAGE_SIZE_CHANGED", (e, t) => {
      if (this.width !== e || this.height !== t) {
        this.width = e;
        this.height = t;
        this.relayout();
      }
    });
    this.cloudManager = new Cloud.CloudManager(this);
    this.renderer = new l(this._canvas, -this.width / 2, this.width / 2, -this.height / 2, this.height / 2);
    this.vm.attachRenderer(this.renderer);
    if (this.renderer.overlayContainer) {
      this._layers.insertBefore(this.renderer.overlayContainer, this._overlaysOuter);
    }
    this.storage = new Storage();
    this.vm.attachStorage(this.storage);
    if (typeof AudioContext != "undefined" || typeof webkitAudioContext != "undefined") {
      this.audioEngine = new p();
      this.vm.attachAudioEngine(this.audioEngine);
    } else {
      console.warn("AudioContext not supported. Sound will not work.");
    }
    this.bitmapAdapter = new f.BitmapAdapter();
    this.vm.attachV2BitmapAdapter(this.bitmapAdapter);
    this.videoProvider = new v();
    this.vm.setVideoProvider(this.videoProvider);
  }
  async _connectPeripherals() {
    const e = e => new Promise(t => {
      const n = t => {
        const n = Object.keys(t).map(e => t[e]);
        if (n.length > 0) {
          const t = n[0];
          console.log("Connecting to peripheral", t);
          this.vm.connectPeripheral(e, t.peripheralId);
        } else {
          console.error("No peripherals found for", e);
        }
        i();
      };
      const r = () => {
        console.error("Peripheral scan timed out for", e);
        i();
      };
      const i = () => {
        this.vm.removeListener("PERIPHERAL_LIST_UPDATE", n);
        this.vm.removeListener("PERIPHERAL_SCAN_TIMEOUT", r);
        t();
      };
      this.vm.on("PERIPHERAL_LIST_UPDATE", n);
      this.vm.on("PERIPHERAL_SCAN_TIMEOUT", r);
      this.vm.scanForPeripheral(e);
    });
    for (const t of Object.keys(this.vm.runtime.peripheralExtensions)) {
      await e(t);
    }
  }
  _onmonitorsupdate(e) {
    for (const t of e.valueSeq()) {
      const e = t.get("id");
      if (!this._monitors.has(e)) {
        if (!t.get("visible")) {
          continue;
        }
        if (t.get("mode") === "list") {
          this._monitors.set(e, new U(this, t));
        } else {
          this._monitors.set(e, new D(this, t));
        }
      }
      this._monitors.get(e).update(t);
    }
  }
  ask(e) {
    this._question = new x(this, e);
    return this._question.answer();
  }
  _onquestion(e) {
    if (this._question) {
      this._question.destroy();
    }
    if (e !== null) {
      this.ask(e).then(e => {
        this.vm.runtime.emit("ANSWER", e);
      });
    }
  }
  loadProject(e) {
    return this.vm.loadProject(e).then(() => {
      this.vm.setCloudProvider(this.cloudManager);
      this.cloudManager.projectReady();
      this.renderer.draw();
      setTimeout(() => {
        this.renderer.draw();
      });
      if (this.shouldConnectPeripherals) {
        this._connectPeripherals();
      }
    });
  }
  setUsername(e) {
    this._username = e;
    this.vm.postIOData("userData", {
      username: e
    });
  }
  addCloudProvider(e) {
    this.cloudManager.addProvider(e);
  }
  addCloudProviderOverride(e, t) {
    this.cloudManager.addProviderOverride(e, t);
  }
  addControlButton(e) {
    let {
      element: t,
      where: n
    } = e;
    if (n === "top-left") {
      this._topControls.addToStart(t);
    } else {
      if (n !== "top-right") {
        throw new Error(`Unknown 'where': ${n}`);
      }
      this._topControls.addToEnd(t);
    }
    this.relayout();
  }
  getMessage(e) {
    return this.messages[e] || e;
  }
  setAccentColor(e) {
    this._root.style.setProperty("--sc-accent-color", e);
    this._root.style.setProperty("--sc-accent-color-transparent", `${e}59`);
  }
  start() {
    this.vm.start();
    this.vm.greenFlag();
  }
  greenFlag() {
    this.start();
  }
  stopAll() {
    this.vm.stopAll();
  }
  _lookupVariable(e, t) {
    const n = this.vm.runtime.getTargetForStage().lookupVariableByNameAndType(e, t);
    if (!n) {
      throw new Error(`Global ${t || "variable"} does not exist: ${e}`);
    }
    return n;
  }
  setExtensionSecurityManager(e) {
    const t = this.vm.extensionManager.securityManager;
    if (t) {
      for (const [n, r] of Object.entries(e)) {
        t[n] = V(r);
      }
    } else {
      console.warn("setExtensionSecurityManager not supported: there is no security manager");
    }
  }
  getVariable(e) {
    return this._lookupVariable(e, "").value;
  }
  setVariable(e, t) {
    if (!j(t)) {
      throw new Error("Invalid variable value");
    }
    this._lookupVariable(e, "").value = t;
  }
  getList(e) {
    return this._lookupVariable(e, "list").value;
  }
  setList(e, t) {
    if (!(e => {
      if (!Array.isArray(e)) {
        return false;
      }
      for (let t = 0; t < e.length; t++) {
        if (!j(e[t])) {
          return false;
        }
      }
      return true;
    })(t)) {
      throw new Error("Invalid list value");
    }
    this._lookupVariable(e, "list").value = t;
  }
}
if (window.Scaffolding) {
  throw new Error("Scaffolding already exists on this page");
}
window.Scaffolding = r;