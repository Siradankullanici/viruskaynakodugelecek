const r = require("./56.js");
const i = require("./0.js");
const s = require("./57.js");
const o = require("./2.js");
const a = require("./110.js");
const c = {
  coreExample: () => require("./111.js"),
  pen: () => require("./112.js"),
  wedo2: () => require("./113.js"),
  music: () => require("./117.js"),
  microbit: () => require("./180.js"),
  text2speech: () => require("./181.js"),
  translate: () => require("./182.js"),
  videoSensing: () => require("./183.js"),
  ev3: () => require("./219.js"),
  makeymakey: () => require("./221.js"),
  boost: () => require("./222.js"),
  gdxfor: () => require("./223.js"),
  tw: () => require("./226.js")
};
module.exports = class {
  constructor(e) {
    this.nextExtensionWorker = 0;
    this.pendingExtensions = [];
    this.pendingWorkers = [];
    this.workerURLs = [];
    this._loadedExtensions = new Map();
    this.securityManager = new a();
    this.vm = e;
    this.runtime = e.runtime;
    this.loadingAsyncExtensions = 0;
    this.asyncExtensionsLoadedCallbacks = [];
    this.builtinExtensions = Object.assign({}, c);
    r.setService("extensions", (e => {
      const t = {};
      t.registerExtensionServiceSync = e.registerExtensionServiceSync.bind(e);
      t.allocateWorker = e.allocateWorker.bind(e);
      t.onWorkerInit = e.onWorkerInit.bind(e);
      t.registerExtensionService = e.registerExtensionService.bind(e);
      return t;
    })(this)).catch(e => {
      i.error(`ExtensionManager was unable to register extension service: ${JSON.stringify(e)}`);
    });
  }
  isExtensionLoaded(e) {
    return this._loadedExtensions.has(e);
  }
  isBuiltinExtension(e) {
    return Object.prototype.hasOwnProperty.call(this.builtinExtensions, e);
  }
  loadExtensionIdSync(e) {
    if (!this.isBuiltinExtension(e)) {
      i.warn(`Could not find extension ${e} in the built in extensions.`);
      return;
    }
    if (this.isExtensionLoaded(e)) {
      const t = `Rejecting attempt to load a second extension with ID ${e}`;
      i.warn(t);
      return;
    }
    const t = new (this.builtinExtensions[e]())(this.runtime);
    const n = this._registerInternalExtension(t);
    this._loadedExtensions.set(e, n);
    this.runtime.compilerRegisterExtension(e, t);
  }
  addBuiltinExtension(e, t) {
    this.builtinExtensions[e] = () => t;
  }
  _isValidExtensionURL(e) {
    try {
      const t = new URL(e);
      return t.protocol === "https:" || t.protocol === "http:" || t.protocol === "data:" || t.protocol === "file:";
    } catch (e) {
      return false;
    }
  }
  async loadExtensionURL(e) {
    if (this.isBuiltinExtension(e)) {
      this.loadExtensionIdSync(e);
      return;
    }
    if (this.isExtensionURLLoaded(e)) {
      return;
    }
    if (!this._isValidExtensionURL(e)) {
      throw new Error(`Invalid extension URL: ${e}`);
    }
    this.runtime.setExternalCommunicationMethod("customExtensions", true);
    this.loadingAsyncExtensions++;
    const t = await this.securityManager.getSandboxMode(e);
    const i = await this.securityManager.rewriteExtensionURL(e);
    if (t === "unsandboxed") {
      const {
        load: t
      } = require("./227.js");
      const s = await t(i, this.vm).catch(e => this._failedLoadingExtensionScript(e));
      const o = this.nextExtensionWorker++;
      this.workerURLs[o] = e;
      for (const e of s) {
        const t = e.getInfo();
        const n = `unsandboxed.${o}.${t.id}`;
        r.setServiceSync(n, e);
        r.callSync("extensions", "registerExtensionServiceSync", n);
        this._loadedExtensions.set(t.id, n);
      }
      this._finishedLoadingExtensionScript();
      return;
    }
    let s;
    if (t === "worker") {
      s = require("./234.js");
    } else {
      if (t !== "iframe") {
        throw new Error(`Invalid sandbox mode: ${t}`);
      }
      s = (await require.e(1).then(require.t.bind(null, 303, 7))).default;
    }
    return new Promise((e, t) => {
      this.pendingExtensions.push({
        extensionURL: i,
        resolve: e,
        reject: t
      });
      r.addWorker(new s());
    }).catch(e => this._failedLoadingExtensionScript(e));
  }
  allAsyncExtensionsLoaded() {
    if (this.loadingAsyncExtensions !== 0) {
      return new Promise((e, t) => {
        this.asyncExtensionsLoadedCallbacks.push({
          resolve: e,
          reject: t
        });
      });
    }
  }
  refreshBlocks(e) {
    const t = e => r.call(e, "getInfo").then(t => {
      t = this._prepareExtensionInfo(e, t);
      r.call("runtime", "_refreshExtensionPrimitives", t);
    }).catch(e => {
      i.error("Failed to refresh built-in extension primitives", e);
    });
    if (e) {
      if (this._loadedExtensions.has(e)) {
        return t(this._loadedExtensions.get(e));
      } else {
        return Promise.reject(new Error(`Unknown extension: ${e}`));
      }
    }
    const n = Array.from(this._loadedExtensions.values()).map(t);
    return Promise.all(n);
  }
  allocateWorker() {
    const e = this.nextExtensionWorker++;
    const t = this.pendingExtensions.shift();
    this.pendingWorkers[e] = t;
    this.workerURLs[e] = t.extensionURL;
    return [e, t.extensionURL];
  }
  registerExtensionServiceSync(e) {
    const t = r.callSync(e, "getInfo");
    this._registerExtensionInfo(e, t);
  }
  registerExtensionService(e) {
    r.call(e, "getInfo").then(t => {
      this._loadedExtensions.set(t.id, e);
      this._registerExtensionInfo(e, t);
      this._finishedLoadingExtensionScript();
    });
  }
  _finishedLoadingExtensionScript() {
    this.loadingAsyncExtensions--;
    if (this.loadingAsyncExtensions === 0) {
      this.asyncExtensionsLoadedCallbacks.forEach(e => e.resolve());
      this.asyncExtensionsLoadedCallbacks = [];
    }
  }
  _failedLoadingExtensionScript(e) {
    this.loadingAsyncExtensions--;
    this.asyncExtensionsLoadedCallbacks.forEach(t => t.reject(e));
    this.asyncExtensionsLoadedCallbacks = [];
    throw e;
  }
  onWorkerInit(e, t) {
    const n = this.pendingWorkers[e];
    delete this.pendingWorkers[e];
    if (t) {
      n.reject(t);
    } else {
      n.resolve();
    }
  }
  _registerInternalExtension(e) {
    const t = e.getInfo();
    const n = this.nextExtensionWorker++;
    const i = `extension_${n}_${t.id}`;
    r.setServiceSync(i, e);
    r.callSync("extensions", "registerExtensionServiceSync", i);
    return i;
  }
  _registerExtensionInfo(e, t) {
    t = this._prepareExtensionInfo(e, t);
    r.call("runtime", "_registerExtensionPrimitives", t).catch(t => {
      i.error(`Failed to register primitives for extension on service ${e}:`, t);
    });
  }
  _prepareExtensionInfo(e, t) {
    t = Object.assign({}, t);
    if (!/^[a-z0-9]+$/i.test(t.id)) {
      throw new Error("Invalid extension id");
    }
    t.name = t.name || t.id;
    t.blocks = t.blocks || [];
    t.targetTypes = t.targetTypes || [];
    t.blocks = t.blocks.reduce((t, n) => {
      try {
        let r;
        if (n === "---") {
          r = "---";
        } else {
          r = this._prepareBlockInfo(e, n);
        }
        t.push(r);
      } catch (e) {
        i.error(`Error processing block: ${e.message}, Block:
${JSON.stringify(n)}`);
      }
      return t;
    }, []);
    t.menus = t.menus || {};
    t.menus = this._prepareMenuInfo(e, t.menus);
    return t;
  }
  _prepareMenuInfo(e, t) {
    const n = Object.getOwnPropertyNames(t);
    for (let i = 0; i < n.length; i++) {
      const s = n[i];
      let o = t[s];
      if (!o.items) {
        o = {
          items: o
        };
        t[s] = o;
      }
      if (typeof o.items == "string") {
        const t = o.items;
        const n = r.services[e];
        o.items = this._getExtensionMenuItems.bind(this, n, t);
      }
    }
    return t;
  }
  _getExtensionMenuItems(e, t) {
    const n = this.runtime.getEditingTarget() || this.runtime.getTargetForStage();
    const r = n ? n.id : null;
    const i = this.runtime.makeMessageContextForTarget(n);
    const o = e[t].call(e, r).map(e => {
      switch (typeof (e = s(e, i))) {
        case "object":
          return [s(e.text, i), e.value];
        case "string":
          return [e, e];
        default:
          return e;
      }
    });
    if (!o || o.length < 1) {
      throw new Error(`Extension menu returned no items: ${t}`);
    }
    return o;
  }
  _prepareBlockInfo(e, t) {
    if (t.blockType === o.XML) {
      (t = Object.assign({}, t)).xml = String(t.xml) || "";
      return t;
    }
    (t = Object.assign({}, {
      blockType: o.COMMAND,
      terminal: false,
      blockAllThreads: false,
      arguments: {}
    }, t)).text = t.text || t.opcode;
    switch (t.blockType) {
      case o.EVENT:
        if (t.func) {
          i.warn(`Ignoring function "${t.func}" for event block ${t.opcode}`);
        }
        break;
      case o.BUTTON:
        if (t.opcode) {
          i.warn(`Ignoring opcode "${t.opcode}" for button with text: ${t.text}`);
        }
        t.callFunc = () => {
          r.call(e, t.func);
        };
        break;
      case o.LABEL:
        if (t.opcode) {
          i.warn(`Ignoring opcode "${t.opcode}" for label: ${t.text}`);
        }
        break;
      default:
        {
          if (!t.opcode) {
            throw new Error("Missing opcode for block");
          }
          const n = t.func || t.opcode;
          const s = t.isDynamic ? e => e && e.mutation && e.mutation.blockInfo : () => t;
          const o = (() => {
            if (r._isRemoteService(e)) {
              return (t, i, s) => r.call(e, n, t, i, s).then(e => typeof e == "number" || typeof e == "string" || typeof e == "boolean" ? e : `${e}`);
            }
            const t = r.services[e];
            if (!t[n]) {
              i.warn(`Could not find extension block function called ${n}`);
            }
            return (e, r, i) => t[n](e, r, i);
          })();
          t.func = (e, t) => {
            const n = s(e);
            return o(e, t, n);
          };
          break;
        }
    }
    return t;
  }
  getExtensionURLs() {
    const e = {};
    for (const [t, n] of this._loadedExtensions.entries()) {
      if (Object.prototype.hasOwnProperty.call(this.builtinExtensions, t)) {
        continue;
      }
      const r = +n.split(".")[1];
      const i = this.workerURLs[r];
      if (typeof i == "string") {
        e[t] = i;
      }
    }
    return e;
  }
  isExtensionURLLoaded(e) {
    return Object.values(this.workerURLs).includes(e);
  }
};