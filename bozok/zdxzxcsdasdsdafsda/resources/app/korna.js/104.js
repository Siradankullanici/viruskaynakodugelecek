let r;
r = typeof TextEncoder == "undefined" ? require("./21.js").TextEncoder : TextEncoder;
const i = require("./19.js");
const s = require("./22.js");
const o = require("./18.js").Buffer;
const a = require("./56.js");
const c = require("./107.js");
const l = require("./0.js");
const u = require("./4.js");
const h = require("./43.js");
const d = require("./48.js");
const p = require("./50.js");
const f = require("./6.js");
const m = require("./5.js");
const g = require("./9.js");
const b = require("./81.js");
const {
  loadCostume: y
} = require("./35.js");
const {
  loadSound: E
} = require("./34.js");
const {
  serializeSounds: T,
  serializeCostumes: v
} = require("./254.js");
require("./255.js");
const {
  exportCostume: A
} = require("./80.js");
const w = require("./16.js");
const S = require("./32.js");
const k = ["_mouse_", "_stage_", "_edge_", "_myself_", "_random_"];
const I = [];
m.setup({
  missingTranslation: "ignore"
});
module.exports = class extends i {
  constructor() {
    super();
    this.runtime = new h();
    a.setService("runtime", (e => {
      const t = {};
      t._refreshExtensionPrimitives = e._refreshExtensionPrimitives.bind(e);
      t._registerExtensionPrimitives = e._registerExtensionPrimitives.bind(e);
      return t;
    })(this.runtime)).catch(e => {
      l.error(`Failed to register runtime service: ${JSON.stringify(e)}`);
    });
    this.editingTarget = null;
    this._dragTarget = null;
    this.runtime.on(h.SCRIPT_GLOW_ON, e => {
      this.emit(h.SCRIPT_GLOW_ON, e);
    });
    this.runtime.on(h.SCRIPT_GLOW_OFF, e => {
      this.emit(h.SCRIPT_GLOW_OFF, e);
    });
    this.runtime.on(h.BLOCK_GLOW_ON, e => {
      this.emit(h.BLOCK_GLOW_ON, e);
    });
    this.runtime.on(h.BLOCK_GLOW_OFF, e => {
      this.emit(h.BLOCK_GLOW_OFF, e);
    });
    this.runtime.on(h.PROJECT_START, () => {
      this.emit(h.PROJECT_START);
    });
    this.runtime.on(h.PROJECT_RUN_START, () => {
      this.emit(h.PROJECT_RUN_START);
    });
    this.runtime.on(h.PROJECT_RUN_STOP, () => {
      this.emit(h.PROJECT_RUN_STOP);
    });
    this.runtime.on(h.PROJECT_CHANGED, () => {
      this.emit(h.PROJECT_CHANGED);
    });
    this.runtime.on(h.VISUAL_REPORT, e => {
      this.emit(h.VISUAL_REPORT, e);
    });
    this.runtime.on(h.TARGETS_UPDATE, e => {
      this.emitTargetsUpdate(e);
    });
    this.runtime.on(h.MONITORS_UPDATE, e => {
      this.emit(h.MONITORS_UPDATE, e);
    });
    this.runtime.on(h.BLOCK_DRAG_UPDATE, e => {
      this.emit(h.BLOCK_DRAG_UPDATE, e);
    });
    this.runtime.on(h.BLOCK_DRAG_END, (e, t) => {
      this.emit(h.BLOCK_DRAG_END, e, t);
    });
    this.runtime.on(h.EXTENSION_ADDED, e => {
      this.emit(h.EXTENSION_ADDED, e);
    });
    this.runtime.on(h.EXTENSION_FIELD_ADDED, (e, t) => {
      this.emit(h.EXTENSION_FIELD_ADDED, e, t);
    });
    this.runtime.on(h.BLOCKSINFO_UPDATE, e => {
      this.emit(h.BLOCKSINFO_UPDATE, e);
    });
    this.runtime.on(h.BLOCKS_NEED_UPDATE, () => {
      this.emitWorkspaceUpdate();
    });
    this.runtime.on(h.TOOLBOX_EXTENSIONS_NEED_UPDATE, () => {
      this.extensionManager.refreshBlocks();
    });
    this.runtime.on(h.PERIPHERAL_LIST_UPDATE, e => {
      this.emit(h.PERIPHERAL_LIST_UPDATE, e);
    });
    this.runtime.on(h.USER_PICKED_PERIPHERAL, e => {
      this.emit(h.USER_PICKED_PERIPHERAL, e);
    });
    this.runtime.on(h.PERIPHERAL_CONNECTED, () => this.emit(h.PERIPHERAL_CONNECTED));
    this.runtime.on(h.PERIPHERAL_REQUEST_ERROR, () => this.emit(h.PERIPHERAL_REQUEST_ERROR));
    this.runtime.on(h.PERIPHERAL_DISCONNECTED, () => this.emit(h.PERIPHERAL_DISCONNECTED));
    this.runtime.on(h.PERIPHERAL_CONNECTION_LOST_ERROR, e => this.emit(h.PERIPHERAL_CONNECTION_LOST_ERROR, e));
    this.runtime.on(h.PERIPHERAL_SCAN_TIMEOUT, () => this.emit(h.PERIPHERAL_SCAN_TIMEOUT));
    this.runtime.on(h.MIC_LISTENING, e => {
      this.emit(h.MIC_LISTENING, e);
    });
    this.runtime.on(h.RUNTIME_STARTED, () => {
      this.emit(h.RUNTIME_STARTED);
    });
    this.runtime.on(h.RUNTIME_STOPPED, () => {
      this.emit(h.RUNTIME_STOPPED);
    });
    this.runtime.on(h.HAS_CLOUD_DATA_UPDATE, e => {
      this.emit(h.HAS_CLOUD_DATA_UPDATE, e);
    });
    this.runtime.on(h.RUNTIME_OPTIONS_CHANGED, e => {
      this.emit(h.RUNTIME_OPTIONS_CHANGED, e);
    });
    this.runtime.on(h.COMPILER_OPTIONS_CHANGED, e => {
      this.emit(h.COMPILER_OPTIONS_CHANGED, e);
    });
    this.runtime.on(h.FRAMERATE_CHANGED, e => {
      this.emit(h.FRAMERATE_CHANGED, e);
    });
    this.runtime.on(h.INTERPOLATION_CHANGED, e => {
      this.emit(h.INTERPOLATION_CHANGED, e);
    });
    this.runtime.on(h.STAGE_SIZE_CHANGED, (e, t) => {
      this.emit(h.STAGE_SIZE_CHANGED, e, t);
    });
    this.runtime.on(h.COMPILE_ERROR, (e, t) => {
      this.emit(h.COMPILE_ERROR, e, t);
    });
    this.runtime.on(h.ASSET_PROGRESS, (e, t) => {
      this.emit(h.ASSET_PROGRESS, e, t);
    });
    this.runtime.on(h.TURBO_MODE_OFF, () => {
      this.emit(h.TURBO_MODE_OFF);
    });
    this.runtime.on(h.TURBO_MODE_ON, () => {
      this.emit(h.TURBO_MODE_ON);
    });
    this.extensionManager = new c(this);
    this.securityManager = this.extensionManager.securityManager;
    this.runtime.extensionManager = this.extensionManager;
    for (const e of I) {
      this.extensionManager.loadExtensionIdSync(e);
    }
    this.blockListener = this.blockListener.bind(this);
    this.flyoutBlockListener = this.flyoutBlockListener.bind(this);
    this.monitorBlockListener = this.monitorBlockListener.bind(this);
    this.variableListener = this.variableListener.bind(this);
    this.exports = {
      Sprite: p,
      RenderedTarget: d,
      JSZip: s,
      Variable: g,
      Sampler: S,
      these_broke_before_and_will_break_again: () => {
        console.warn("You are using unsupported APIs. WHEN your code breaks, do not expect help.");
        return {
          JSGenerator: require("./68.js"),
          IRGenerator: require("./45.js").IRGenerator,
          ScriptTreeGenerator: require("./45.js").ScriptTreeGenerator,
          IntermediateStackBlock: require("./10.js").IntermediateStackBlock,
          IntermediateInput: require("./10.js").IntermediateInput,
          IntermediateStack: require("./10.js").IntermediateStack,
          IntermediateScript: require("./10.js").IntermediateScript,
          IntermediateRepresentation: require("./10.js").IntermediateRepresentation,
          StackOpcode: require("./15.js").StackOpcode,
          InputOpcode: require("./15.js").InputOpcode,
          InputType: require("./15.js").InputType,
          Thread: require("./20.js"),
          execute: require("./33.js")
        };
      },
      i_will_not_ask_for_help_when_these_break: () => {
        this.emit("LEGACY_EXTENSION_API", "i_will_not_ask_for_help_when_these_break");
        const e = require("./46.js");
        e.enabled = true;
        return {
          IRGenerator: e.IRGeneratorStub,
          ScriptTreeGenerator: e.ScriptTreeGeneratorStub,
          JSGenerator: e.JSGeneratorStub,
          Thread: require("./20.js"),
          execute: require("./33.js")
        };
      }
    };
  }
  start() {
    this.runtime.start();
  }
  stop() {
    this.quit();
  }
  quit() {
    this.runtime.quit();
  }
  greenFlag() {
    this.runtime.greenFlag();
  }
  setTurboMode(e) {
    this.runtime.turboMode = !!e;
    if (this.runtime.turboMode) {
      this.emit(h.TURBO_MODE_ON);
    } else {
      this.emit(h.TURBO_MODE_OFF);
    }
  }
  setCompatibilityMode(e) {
    this.runtime.setCompatibilityMode(!!e);
  }
  setFramerate(e) {
    this.runtime.setFramerate(e);
  }
  setInterpolation(e) {
    this.runtime.setInterpolation(e);
  }
  setRuntimeOptions(e) {
    this.runtime.setRuntimeOptions(e);
  }
  setCompilerOptions(e) {
    this.runtime.setCompilerOptions(e);
  }
  setStageSize(e, t) {
    this.runtime.setStageSize(e, t);
  }
  setInEditor(e) {
    this.runtime.setInEditor(e);
  }
  convertToPackagedRuntime() {
    this.runtime.convertToPackagedRuntime();
  }
  addAddonBlock(e) {
    this.runtime.addAddonBlock(e);
  }
  getAddonBlock(e) {
    return this.runtime.getAddonBlock(e);
  }
  storeProjectOptions() {
    this.runtime.storeProjectOptions();
    if (this.editingTarget.isStage) {
      this.emitWorkspaceUpdate();
    }
  }
  enableDebug() {
    this.runtime.enableDebug();
    return "enabled debug mode";
  }
  handleExtensionButtonPress(e) {
    this.runtime.handleExtensionButtonPress(e);
  }
  stopAll() {
    this.runtime.stopAll();
  }
  clear() {
    this.runtime.dispose();
    this.editingTarget = null;
    this.emitTargetsUpdate(false);
  }
  getPlaygroundData() {
    const e = this;
    const t = this.runtime.threads.filter(t => t.target === e.editingTarget);
    const n = JSON.stringify(t, (e, t) => {
      if (e !== "target" && e !== "blockContainer") {
        return t;
      }
    }, 2);
    this.emit("playgroundData", {
      blocks: this.editingTarget.blocks,
      threads: n
    });
  }
  postIOData(e, t) {
    if (this.runtime.ioDevices[e]) {
      this.runtime.ioDevices[e].postData(t);
    }
  }
  setVideoProvider(e) {
    this.runtime.ioDevices.video.setProvider(e);
  }
  setCloudProvider(e) {
    this.runtime.ioDevices.cloud.setProvider(e);
  }
  scanForPeripheral(e) {
    this.runtime.scanForPeripheral(e);
  }
  connectPeripheral(e, t) {
    this.runtime.connectPeripheral(e, t);
  }
  disconnectPeripheral(e) {
    this.runtime.disconnectPeripheral(e);
  }
  getPeripheralIsConnected(e) {
    return this.runtime.getPeripheralIsConnected(e);
  }
  loadProject(e) {
    if (typeof e == "object" && !(e instanceof ArrayBuffer) && !ArrayBuffer.isView(e)) {
      e = JSON.stringify(e);
    }
    return new Promise((t, r) => {
      require("./82.js")(e, false, (e, n) => {
        if (e) {
          return r(e);
        }
        t(n);
      });
    }).catch(t => {
      const {
        SB1File: r,
        ValidationError: i
      } = require("./300.js");
      try {
        const t = new r(e);
        const n = t.json;
        n.projectVersion = 2;
        return Promise.resolve([n, t.zip]);
      } catch (e) {
        if (!(e instanceof i) && !`${e}`.includes("Non-ascii character in FixedAsciiString")) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(t);
    }).then(e => this.deserializeProject(e[0], e[1])).then(() => this.runtime.handleProjectLoaded()).catch(e => Object.prototype.hasOwnProperty.call(e, "validationError") ? Promise.reject(JSON.stringify(e)) : Promise.reject(e));
  }
  downloadProjectId(e) {
    const t = this.runtime.storage;
    if (!t) {
      l.error("No storage module present; cannot load project: ", e);
      return;
    }
    const n = this;
    t.load(t.AssetType.Project, e).then(t => t ? n.loadProject(t.data) : (l.error(`Failed to fetch project with id: ${e}`), null));
  }
  _saveProjectZip() {
    const e = this.toJSON();
    const t = new s();
    t.file("project.json", e);
    this._addFileDescsToZip(this.serializeAssets(), t);
    const n = new Date(1591657163000);
    for (const e of Object.values(t.files)) {
      e.date = n;
    }
    const r = [".json", ".svg", ".wav", ".ttf", ".otf"];
    for (const e of Object.values(t.files)) {
      if (r.some(t => e.name.endsWith(t))) {
        e.options.compression = "DEFLATE";
      } else {
        e.options.compression = "STORE";
      }
    }
    return t;
  }
  saveProjectSb3(e) {
    return this._saveProjectZip().generateAsync({
      type: e || "blob",
      mimeType: "application/x.scratch.sb3"
    });
  }
  saveProjectSb3Stream(e) {
    return this._saveProjectZip().generateInternalStream({
      type: e || "arraybuffer",
      mimeType: "application/x.scratch.sb3",
      compression: "DEFLATE"
    });
  }
  saveProjectSb3DontZip() {
    const e = this.toJSON();
    const t = {
      "project.json": new r().encode(e)
    };
    for (const e of this.serializeAssets()) {
      t[e.fileName] = e.fileContent;
    }
    return t;
  }
  get assets() {
    return [...this.runtime.targets.reduce((e, t) => e.concat(t.sprite.sounds.map(e => e.asset)).concat(t.sprite.costumes.map(e => e.asset)), []), ...this.runtime.fontManager.serializeAssets()];
  }
  serializeAssets(e) {
    return [...v(this.runtime, e), ...T(this.runtime, e), ...this.runtime.fontManager.serializeAssets().map(e => ({
      fileName: `${e.assetId}.${e.dataFormat}`,
      fileContent: e.data
    }))];
  }
  _addFileDescsToZip(e, t) {
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      t.file(r.fileName, r.fileContent);
    }
  }
  exportSprite(e, t) {
    const n = this.toJSON(e);
    const r = new s();
    r.file("sprite.json", n);
    this._addFileDescsToZip(this.serializeAssets(e), r);
    return r.generateAsync({
      type: typeof t == "string" ? t : "blob",
      mimeType: "application/x.scratch.sprite3",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6
      }
    });
  }
  toJSON(e, t) {
    const r = require("./26.js");
    return f.stringify(r.serialize(this.runtime, e, t));
  }
  fromJSON(e) {
    l.warn("fromJSON is now just a wrapper around loadProject, please use that function instead.");
    return this.loadProject(e);
  }
  deserializeProject(e, t) {
    this.clear();
    if (typeof performance != "undefined") {
      performance.mark("scratch-vm-deserialize-start");
    }
    const r = this.runtime;
    return function () {
      const i = e.projectVersion;
      if (i === 2) {
        return require("./84.js").deserialize(e, r, false, t);
      }
      if (i === 3) {
        return require("./26.js").deserialize(e, r, t);
      }
      return Promise.reject("Unable to verify Scratch Project version.");
    }().then(e => {
      let {
        targets: t,
        extensions: n,
        layerOrder: r
      } = e;
      if (typeof performance != "undefined") {
        performance.mark("scratch-vm-deserialize-end");
        try {
          performance.measure("scratch-vm-deserialize", "scratch-vm-deserialize-start", "scratch-vm-deserialize-end");
        } catch (e) {
          l.error(e);
        }
      }
      return this.installTargets(t, n, true, r);
    });
  }
  async _loadExtensions(e, t = new Map()) {
    const r = require("./263.js");
    const i = [];
    for (const n of e) {
      if (this.extensionManager.isExtensionLoaded(n)) ;else if (this.extensionManager.isBuiltinExtension(n)) {
        this.extensionManager.loadExtensionIdSync(n);
      } else {
        let e = t.get(n);
        if (!e && Object.prototype.hasOwnProperty.call(r, n)) {
          e = r[n];
        }
        if (!e) {
          throw new Error(`Unknown extension: ${n}`);
        }
        if (!(await this.securityManager.canLoadExtensionFromProject(e))) {
          throw new Error(`Permission to load extension denied: ${n}`);
        }
        i.push(this.extensionManager.loadExtensionURL(e));
      }
    }
    return Promise.all(i);
  }
  async installTargets(e, t, n, r) {
    await this.extensionManager.allAsyncExtensionsLoaded();
    let i = null;
    if (r) {
      i = new Map();
      e.forEach((e, t) => {
        if (e) {
          i.set(e, r[t]);
        }
      });
    }
    e = e.filter(e => !!e);
    return this._loadExtensions(t.extensionIDs, t.extensionURLs).then(() => {
      e.forEach(e => {
        this.runtime.addTarget(e);
        e.updateAllDrawableProperties();
        if (e.isSprite()) {
          this.renameSprite(e.id, e.getName());
        }
      });
      if (i) {
        this.runtime.executableTargets.sort((e, t) => i.get(e) - i.get(t));
      }
      if (n && e.length > 1) {
        this.editingTarget = e[1];
      } else {
        this.editingTarget = e[0];
      }
      if (!n) {
        this.editingTarget.fixUpVariableReferences();
      }
      if (n) {
        this.runtime.parseProjectOptions();
      }
      this.emitTargetsUpdate(false);
      this.emitWorkspaceUpdate();
      this.runtime.setEditingTarget(this.editingTarget);
      this.runtime.ioDevices.cloud.setStage(this.runtime.getTargetForStage());
    });
  }
  addSprite(e) {
    const t = "Sprite Upload Error:";
    if (typeof e == "object" && !(e instanceof ArrayBuffer) && !ArrayBuffer.isView(e)) {
      e = JSON.stringify(e);
    }
    return new Promise((t, r) => {
      require("./82.js")(e, true, (e, n) => {
        if (e) {
          return r(e);
        }
        t(n);
      });
    }).then(e => {
      const n = e[0].projectVersion;
      if (n === 2) {
        return this._addSprite2(e[0], e[1]);
      } else if (n === 3) {
        return this._addSprite3(e[0], e[1]);
      } else {
        return Promise.reject(`${t} Unable to verify sprite version.`);
      }
    }).then(() => this.runtime.emitProjectChanged()).catch(e => Object.prototype.hasOwnProperty.call(e, "validationError") ? Promise.reject(JSON.stringify(e)) : Promise.reject(`${t} ${e}`));
  }
  _addSprite2(e, t) {
    return require("./84.js").deserialize(e, this.runtime, true, t).then(e => {
      let {
        targets: t,
        extensions: n,
        layerOrder: r
      } = e;
      return this.installTargets(t, n, false, r);
    });
  }
  _addSprite3(e, t) {
    return require("./26.js").deserialize(e, this.runtime, t, true).then(e => {
      let {
        targets: t,
        extensions: n,
        layerOrder: r
      } = e;
      return this.installTargets(t, n, false, r);
    });
  }
  addCostume(e, t, n, r) {
    const i = n ? this.runtime.getTargetById(n) : this.editingTarget;
    if (i) {
      return y(e, t, this.runtime, r).then(() => {
        i.addCostume(t);
        i.setCostume(i.getCostumes().length - 1);
        this.runtime.emitProjectChanged();
      });
    } else {
      return Promise.reject();
    }
  }
  addCostumeFromLibrary(e, t) {
    if (this.editingTarget) {
      return this.addCostume(e, t, this.editingTarget.id, 2);
    } else {
      return Promise.reject();
    }
  }
  duplicateCostume(e) {
    const t = this.editingTarget.getCostumes()[e];
    const n = Object.assign({}, t);
    const r = `${n.assetId}.${n.dataFormat}`;
    return y(r, n, this.runtime).then(() => {
      this.editingTarget.addCostume(n, e + 1);
      this.editingTarget.setCostume(e + 1);
      this.emitTargetsUpdate();
    });
  }
  duplicateSound(e) {
    const t = this.editingTarget.getSounds()[e];
    const n = Object.assign({}, t);
    return E(n, this.runtime, this.editingTarget.sprite.soundBank).then(() => {
      this.editingTarget.addSound(n, e + 1);
      this.emitTargetsUpdate();
    });
  }
  renameCostume(e, t) {
    this.editingTarget.renameCostume(e, t);
    this.emitTargetsUpdate();
  }
  deleteCostume(e) {
    const t = this.editingTarget;
    const n = t.deleteCostume(e);
    if (n) {
      this.runtime.emitProjectChanged();
      return () => {
        const e = `${n.assetId}.${n.dataFormat}`;
        return y(e, n, this.runtime).then(() => {
          if (t.sprite.clones.length !== 0) {
            t.addCostume(n);
            this.emitTargetsUpdate();
          } else if (this.runtime.renderer && typeof n.skinId == "number") {
            this.runtime.renderer.destroySkin(n.skinId);
          }
        });
      };
    } else {
      return null;
    }
  }
  addSound(e, t) {
    const n = t ? this.runtime.getTargetById(t) : this.editingTarget;
    if (n) {
      return E(e, this.runtime, n.sprite.soundBank).then(() => {
        n.addSound(e);
        this.emitTargetsUpdate();
      });
    } else {
      return Promise.reject(new Error(`No target with ID: ${t}`));
    }
  }
  renameSound(e, t) {
    this.editingTarget.renameSound(e, t);
    this.emitTargetsUpdate();
  }
  getSoundBuffer(e) {
    const t = this.editingTarget.sprite.sounds[e].soundId;
    if (t && this.runtime && this.runtime.audioEngine) {
      return this.editingTarget.sprite.soundBank.getSoundPlayer(t).buffer;
    } else {
      return null;
    }
  }
  updateSoundBuffer(e, t, n) {
    const r = this.editingTarget.sprite.sounds[e];
    if (r && r.broken) {
      delete r.broken;
    }
    const i = r ? r.soundId : null;
    if (i && this.runtime && this.runtime.audioEngine) {
      this.editingTarget.sprite.soundBank.getSoundPlayer(i).buffer = t;
    }
    if (n) {
      r.format = "";
      const e = this.runtime.storage;
      r.asset = e.createAsset(e.AssetType.Sound, e.DataFormat.WAV, n, null, true);
      r.assetId = r.asset.assetId;
      r.dataFormat = e.DataFormat.WAV;
      r.md5 = `${r.assetId}.${r.dataFormat}`;
      r.sampleCount = t.length;
      r.rate = t.sampleRate;
    }
    this.emitTargetsUpdate();
  }
  deleteSound(e) {
    const t = this.editingTarget;
    const n = this.editingTarget.deleteSound(e);
    if (n) {
      this.runtime.emitProjectChanged();
      return () => {
        const e = t.sprite.soundBank;
        return E(n, this.runtime, e).then(() => {
          if (t.sprite.clones.length !== 0) {
            t.addSound(n);
            this.emitTargetsUpdate();
          } else if (e && typeof e.removeSoundPlayer == "function") {
            e.removeSoundPlayer(n.soundId);
          }
        });
      };
    }
    return null;
  }
  getCostume(e) {
    const t = this.editingTarget.getCostumes()[e].asset;
    if (!t || !this.runtime || !this.runtime.storage) {
      return null;
    }
    const n = t.dataFormat;
    if (n === this.runtime.storage.DataFormat.SVG) {
      return t.decodeText();
    } else if (n === this.runtime.storage.DataFormat.PNG || n === this.runtime.storage.DataFormat.JPG) {
      return t.encodeDataURI();
    } else {
      l.error(`Unhandled format: ${t.dataFormat}`);
      return null;
    }
  }
  getExportedCostume(e) {
    return A(e);
  }
  getExportedCostumeBase64(e) {
    const t = this.getExportedCostume(e);
    return w.uint8ArrayToBase64(t);
  }
  updateBitmap(e, t, n, r, i) {
    return this._updateBitmap(this.editingTarget.getCostumes()[e], t, n, r, i);
  }
  _updateBitmap(e, t, n, r, i) {
    if (!e || !this.runtime || !this.runtime.renderer) {
      return;
    }
    if (e && e.broken) {
      delete e.broken;
    }
    e.rotationCenterX = n;
    e.rotationCenterY = r;
    const s = t.sourceWidth === 0 ? 0 : t.width;
    const a = t.sourceHeight === 0 ? 0 : t.height;
    const c = document.createElement("canvas");
    c.width = s;
    c.height = a;
    c.getContext("2d").putImageData(t, 0, 0);
    this.runtime.renderer.updateBitmapSkin(e.skinId, c, i, [n / i, r / i]);
    c.toBlob(t => {
      const n = new FileReader();
      n.addEventListener("loadend", () => {
        const t = this.runtime.storage;
        e.dataFormat = t.DataFormat.PNG;
        e.bitmapResolution = i;
        e.size = [s, a];
        e.asset = t.createAsset(t.AssetType.ImageBitmap, e.dataFormat, o.from(n.result), null, true);
        e.assetId = e.asset.assetId;
        e.md5 = `${e.assetId}.${e.dataFormat}`;
        this.emitTargetsUpdate();
      });
      if (t) {
        n.readAsArrayBuffer(t);
      }
    });
  }
  updateSvg(e, t, n, r) {
    return this._updateSvg(this.editingTarget.getCostumes()[e], t, n, r);
  }
  _updateSvg(e, t, n, i) {
    if (e && e.broken) {
      delete e.broken;
    }
    if (e && this.runtime && this.runtime.renderer) {
      e.rotationCenterX = n;
      e.rotationCenterY = i;
      this.runtime.renderer.updateSVGSkin(e.skinId, t, [n, i]);
      e.size = this.runtime.renderer.getSkinSize(e.skinId);
    }
    const s = this.runtime.storage;
    e.dataFormat = s.DataFormat.SVG;
    e.bitmapResolution = 1;
    e.asset = s.createAsset(s.AssetType.ImageVector, e.dataFormat, new r().encode(t), null, true);
    e.assetId = e.asset.assetId;
    e.md5 = `${e.assetId}.${e.dataFormat}`;
    this.emitTargetsUpdate();
  }
  addBackdrop(e, t) {
    return y(e, t, this.runtime).then(() => {
      const e = this.runtime.getTargetForStage();
      e.addCostume(t);
      e.setCostume(e.getCostumes().length - 1);
      this.runtime.emitProjectChanged();
    });
  }
  renameSprite(e, t) {
    const n = this.runtime.getTargetById(e);
    if (!n) {
      throw new Error("No target with the provided id.");
    }
    {
      if (!n.isSprite()) {
        throw new Error("Cannot rename non-sprite targets.");
      }
      const e = n.sprite;
      if (!e) {
        throw new Error("No sprite associated with this target.");
      }
      if (t && k.indexOf(t) === -1) {
        const r = this.runtime.targets.filter(e => e.isSprite() && e.id !== n.id).map(e => e.sprite.name);
        const i = e.name;
        const s = f.unusedName(t, r);
        e.name = s;
        if (i === s) {
          return;
        }
        const o = this.runtime.targets;
        for (let e = 0; e < o.length; e++) {
          o[e].blocks.updateAssetName(i, t, "sprite");
        }
        if (s !== i) {
          this.emitTargetsUpdate();
        }
      }
    }
  }
  deleteSprite(e) {
    const t = this.runtime.getTargetById(e);
    if (t) {
      if (!t.isSprite()) {
        throw new Error("Cannot delete non-sprite targets.");
      }
      const n = t.sprite;
      if (!n) {
        throw new Error("No sprite associated with this target.");
      }
      const r = this.exportSprite(e, "uint8array");
      const i = () => r.then(e => this.addSprite(e));
      t.deleteMonitors();
      const s = this.runtime.targets.indexOf(t);
      const o = n.clones.slice();
      for (const e of o) {
        this.runtime.stopForTarget(e);
        this.runtime.disposeTarget(e);
      }
      if (this.editingTarget && this.editingTarget.sprite === n) {
        const e = this.runtime.targets;
        if (e.length > 0) {
          this.setEditingTarget(e[Math.min(e.length - 1, s)].id);
        } else {
          this.editingTarget = null;
        }
      }
      this.emitTargetsUpdate();
      return i;
    }
    throw new Error("No target with the provided id.");
  }
  duplicateSprite(e) {
    const t = this.runtime.getTargetById(e);
    if (!t) {
      throw new Error("No target with the provided id.");
    }
    if (!t.isSprite()) {
      throw new Error("Cannot duplicate non-sprite targets.");
    }
    if (!t.sprite) {
      throw new Error("No sprite associated with this target.");
    }
    return t.duplicate().then(e => {
      this.runtime.addTarget(e);
      e.goBehindOther(t);
      this.setEditingTarget(e.id);
    });
  }
  attachAudioEngine(e) {
    this.runtime.attachAudioEngine(e);
  }
  attachRenderer(e) {
    this.runtime.attachRenderer(e);
  }
  get renderer() {
    return this.runtime && this.runtime.renderer;
  }
  attachV2SVGAdapter() {}
  attachV2BitmapAdapter(e) {
    this.runtime.attachV2BitmapAdapter(e);
  }
  attachStorage(e) {
    this.runtime.attachStorage(e);
  }
  setLocale(e, t) {
    if (e !== m.setup().locale) {
      m.setup({
        locale: e,
        translations: {
          [e]: t
        }
      });
    }
    this.emit("LOCALE_CHANGED", e);
    return this.extensionManager.refreshBlocks();
  }
  getLocale() {
    return m.setup().locale;
  }
  blockListener(e) {
    if (this.editingTarget) {
      this.editingTarget.blocks.blocklyListen(e);
    }
  }
  flyoutBlockListener(e) {
    this.runtime.flyoutBlocks.blocklyListen(e);
  }
  monitorBlockListener(e) {
    if (["create", "change"].indexOf(e.type) !== -1) {
      this.runtime.monitorBlocks.blocklyListen(e);
    }
  }
  variableListener(e) {
    if (["var_create", "var_rename", "var_delete"].indexOf(e.type) !== -1) {
      this.runtime.getTargetForStage().blocks.blocklyListen(e);
    }
  }
  clearFlyoutBlocks() {
    this.runtime.flyoutBlocks.deleteAllBlocks();
  }
  setEditingTarget(e) {
    if (this.editingTarget && e === this.editingTarget.id) {
      return;
    }
    const t = this.runtime.getTargetById(e);
    if (t) {
      this.editingTarget = t;
      this.emitTargetsUpdate(false);
      this.emitWorkspaceUpdate();
      this.runtime.setEditingTarget(t);
    }
  }
  exportStandaloneBlocks(e) {
    return require("./26.js").serializeStandaloneBlocks(e, this.runtime);
  }
  shareBlocksToTarget(e, t, r) {
    const i = require("./26.js");
    const {
      blocks: s,
      extensionURLs: o
    } = i.deserializeStandaloneBlocks(e);
    b(s);
    const a = this.runtime.getTargetById(t);
    if (r) {
      this.runtime.getTargetById(r).resolveVariableSharingConflictsWithTarget(s, a);
    }
    const c = new Set(s.map(e => i.getExtensionIdForOpcode(e.opcode)).filter(e => !!e).filter(e => !this.extensionManager.isExtensionLoaded(e)));
    return this._loadExtensions(c, o).then(() => {
      s.forEach(e => {
        a.blocks.createBlock(e);
      });
      a.blocks.updateTargetSpecificBlocks(a.isStage);
    });
  }
  shareCostumeToTarget(e, t) {
    const n = this.editingTarget.getCostumes()[e];
    const r = Object.assign({}, n);
    const i = `${r.assetId}.${r.dataFormat}`;
    return y(i, r, this.runtime).then(() => {
      const e = this.runtime.getTargetById(t);
      if (e) {
        e.addCostume(r);
        e.setCostume(e.getCostumes().length - 1);
      }
    });
  }
  shareSoundToTarget(e, t) {
    const n = this.editingTarget.getSounds()[e];
    const r = Object.assign({}, n);
    const i = this.runtime.getTargetById(t);
    return E(r, this.runtime, i.sprite.soundBank).then(() => {
      if (i) {
        i.addSound(r);
        this.emitTargetsUpdate();
      }
    });
  }
  refreshWorkspace() {
    if (this.editingTarget) {
      this.emitWorkspaceUpdate();
      this.runtime.setEditingTarget(this.editingTarget);
      this.emitTargetsUpdate(false);
    }
  }
  emitTargetsUpdate(e) {
    let t;
    if (e === undefined) {
      e = true;
    }
    const n = () => {
      t ||= this.runtime.targets.filter(e => !Object.prototype.hasOwnProperty.call(e, "isOriginal") || e.isOriginal).map(e => e.toJSON());
      return t;
    };
    this.emit("targetsUpdate", {
      get targetList() {
        return n();
      },
      editingTarget: this.editingTarget ? this.editingTarget.id : null
    });
    if (e) {
      this.runtime.emitProjectChanged();
    }
  }
  emitWorkspaceUpdate() {
    const e = this.runtime.getTargetForStage().variables;
    let t = [];
    for (const n in e) {
      if (e[n].type === g.BROADCAST_MESSAGE_TYPE) {
        t.push(n);
      }
    }
    for (let e = 0; e < this.runtime.targets.length; e++) {
      const n = this.runtime.targets[e].blocks._blocks;
      for (const e in n) {
        if (n[e].fields.BROADCAST_OPTION) {
          const r = n[e].fields.BROADCAST_OPTION.id;
          const i = t.indexOf(r);
          if (i !== -1) {
            t = t.slice(0, i).concat(t.slice(i + 1));
          }
        }
      }
    }
    for (let e = 0; e < t.length; e++) {
      const n = t[e];
      delete this.runtime.getTargetForStage().variables[n];
    }
    const n = Object.assign({}, this.runtime.getTargetForStage().variables);
    const r = this.editingTarget.isStage ? Object.create(null) : Object.assign({}, this.editingTarget.variables);
    const i = Object.keys(n).map(e => n[e]);
    const s = Object.keys(r).map(e => r[e]);
    const o = Object.keys(this.editingTarget.comments).map(e => this.editingTarget.comments[e]).filter(e => e.blockId === null);
    const a = `<xml xmlns="http://www.w3.org/1999/xhtml">
                            <variables>
                                ${i.map(e => e.toXML()).join()}
                                ${s.map(e => e.toXML(true)).join()}
                            </variables>
                            ${o.map(e => e.toXML()).join()}
                            ${this.editingTarget.blocks.toXML(this.editingTarget.comments)}
                        </xml>`;
    this.emit("workspaceUpdate", {
      xml: a
    });
  }
  getTargetIdForDrawableId(e) {
    const t = this.runtime.getTargetByDrawableId(e);
    if (t && Object.prototype.hasOwnProperty.call(t, "id") && Object.prototype.hasOwnProperty.call(t, "isStage") && !t.isStage) {
      return t.id;
    } else {
      return null;
    }
  }
  reorderTarget(e, t) {
    let n = this.runtime.targets;
    if ((e = u.clamp(e, 0, n.length - 1)) === (t = u.clamp(t, 0, n.length - 1))) {
      return false;
    }
    const r = n[e];
    n = n.slice(0, e).concat(n.slice(e + 1));
    n.splice(t, 0, r);
    this.runtime.targets = n;
    this.emitTargetsUpdate();
    return true;
  }
  reorderCostume(e, t, n) {
    const r = this.runtime.getTargetById(e);
    if (r) {
      const e = r.reorderCostume(t, n);
      if (e) {
        this.runtime.emitProjectChanged();
      }
      return e;
    }
    return false;
  }
  reorderSound(e, t, n) {
    const r = this.runtime.getTargetById(e);
    if (r) {
      const e = r.reorderSound(t, n);
      if (e) {
        this.runtime.emitProjectChanged();
      }
      return e;
    }
    return false;
  }
  startDrag(e) {
    const t = this.runtime.getTargetById(e);
    if (t) {
      this._dragTarget = t;
      t.startDrag();
    }
  }
  stopDrag(e) {
    const t = this.runtime.getTargetById(e);
    if (t) {
      this._dragTarget = null;
      t.stopDrag();
      this.setEditingTarget(t.sprite && t.sprite.clones[0] ? t.sprite.clones[0].id : t.id);
    }
  }
  postSpriteInfo(e) {
    if (this._dragTarget) {
      this._dragTarget.postSpriteInfo(e);
    } else {
      this.editingTarget.postSpriteInfo(e);
    }
    this.runtime.emitProjectChanged();
  }
  setVariableValue(e, t, n) {
    const r = this.runtime.getTargetById(e);
    if (r) {
      const e = r.lookupVariableById(t);
      if (e) {
        e.value = n;
        if (e.isCloud) {
          this.runtime.ioDevices.cloud.requestUpdateVariable(e.name, e.value);
        }
        return true;
      }
    }
    return false;
  }
  getVariableValue(e, t) {
    const n = this.runtime.getTargetById(e);
    if (n) {
      const e = n.lookupVariableById(t);
      if (e) {
        return e.value;
      }
    }
    return null;
  }
  configureScratchLinkSocketFactory(e) {
    this.runtime.configureScratchLinkSocketFactory(e);
  }
};