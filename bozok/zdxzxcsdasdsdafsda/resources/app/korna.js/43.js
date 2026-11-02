function r(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    if (t) {
      r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      });
    }
    n.push.apply(n, r);
  }
  return n;
}
function i(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (typeof e != "object" || !e) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var r = n.call(e, t || "default");
        if (typeof r != "object") {
          return r;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (typeof t == "symbol") {
      return t;
    } else {
      return t + "";
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
const s = require("./19.js");
const o = require("./63.js");
const a = require("./302.js");
const c = require("./3.js");
const l = require("./17.js");
const u = require("./67.js");
const h = require("./2.js");
const d = require("./186.js");
const p = require("./187.js");
const f = require("./33.js");
const m = require("./47.js");
const g = require("./70.js");
const b = require("./40.js");
const y = require("./20.js");
const E = require("./0.js");
const T = require("./57.js");
const v = require("./13.js");
const A = require("./9.js");
const w = require("./31.js");
const S = require("./194.js");
const k = require("./195.js");
const I = require("./42.js");
const O = require("./197.js");
const N = require("./198.js");
const R = require("./199.js");
const x = require("./32.js");
const M = require("./200.js");
const C = require("./201.js");
const P = require("./202.js");
const L = require("./203.js");
const D = require("./204.js");
const B = require("./205.js");
const U = require("./71.js");
const F = require("./6.js");
const j = require("./7.js");
const z = {
  scratch3_control: require("./206.js"),
  scratch3_event: require("./207.js"),
  scratch3_looks: require("./208.js"),
  scratch3_motion: require("./209.js"),
  scratch3_operators: require("./210.js"),
  scratch3_sound: require("./211.js"),
  scratch3_sensing: require("./212.js"),
  scratch3_data: require("./213.js"),
  scratch3_procedures: require("./214.js")
};
const G = require("./215.js");
const V = require("./216.js");
const _ = require("./24.js");
const H = " // _twconfig_";
const W = (() => {
  const e = {
    [c.ANGLE]: {
      shadow: {
        type: "math_angle",
        fieldName: "NUM"
      }
    },
    [c.COLOR]: {
      shadow: {
        type: "colour_picker",
        fieldName: "COLOUR"
      }
    },
    [c.NUMBER]: {
      shadow: {
        type: "math_number",
        fieldName: "NUM"
      }
    },
    [c.STRING]: {
      shadow: {
        type: "text",
        fieldName: "TEXT"
      }
    },
    [c.BOOLEAN]: {
      check: "Boolean"
    },
    [c.MATRIX]: {
      shadow: {
        type: "matrix",
        fieldName: "MATRIX"
      }
    },
    [c.NOTE]: {
      shadow: {
        type: "note",
        fieldName: "NOTE"
      }
    },
    [c.IMAGE]: {
      fieldType: "field_image"
    },
    [c.COSTUME]: {
      shadow: {
        type: "looks_costume",
        fieldName: "COSTUME"
      }
    },
    [c.SOUND]: {
      shadow: {
        type: "sound_sounds_menu",
        fieldName: "SOUND_MENU"
      }
    }
  };
  return e;
})();
const K = e => {
  let t = 0;
  return {
    canAddCloudVariable: () => t < e.limit,
    addCloudVariable: () => {
      t++;
    },
    removeCloudVariable: () => {
      t--;
    },
    hasCloudVariables: () => t > 0,
    getNumberOfCloudVariables: () => t
  };
};
let X = -1;
let Z = -1;
let q = -1;
class Q extends s {
  constructor() {
    super();
    this.targets = [];
    this.executableTargets = [];
    this.threads = [];
    this.threadMap = new Map();
    this.sequencer = new p(this);
    this.flyoutBlocks = new l(this, true);
    this.monitorBlocks = new l(this, true);
    this._editingTarget = null;
    this._primitives = {};
    this._blockInfo = [];
    this._hats = {};
    this._flowing = {};
    this._scriptGlowsPreviousFrame = [];
    this._nonMonitorThreadCount = 0;
    this._lastStepDoneThreads = null;
    this._cloneCounter = 0;
    this._refreshTargets = false;
    this.monitorBlockInfo = {};
    this._monitorState = new R();
    this.turboMode = false;
    this.frameLoop = new V(this);
    this.currentStepTime = 1000 / 30;
    this.updateCurrentMSecs();
    this.redrawRequested = false;
    this._registerBlockPackages();
    this.ioDevices = {
      clock: new M(this),
      cloud: new C(this),
      keyboard: new P(this),
      mouse: new L(this),
      mouseWheel: new D(this),
      userData: new B(),
      video: new U(this)
    };
    this.peripheralExtensions = {};
    this.profiler = null;
    this.sampler = new x(this);
    this.cloudOptions = {
      limit: 10
    };
    const e = K(this.cloudOptions);
    this.hasCloudData = e.hasCloudVariables;
    this.canAddCloudVariable = e.canAddCloudVariable;
    this.getNumberOfCloudVariables = e.getNumberOfCloudVariables;
    this.addCloudVariable = this._initializeAddCloudVariable(e);
    this.removeCloudVariable = this._initializeRemoveCloudVariable(e);
    this.origin = null;
    this.platform = Object.assign({}, O);
    this._initScratchLink();
    this.resetRunId();
    this._stageTarget = null;
    this.addonBlocks = {};
    this.stageWidth = Q.STAGE_WIDTH;
    this.stageHeight = Q.STAGE_HEIGHT;
    this.runtimeOptions = {
      maxClones: Q.MAX_CLONES,
      miscLimits: true,
      fencing: true
    };
    this.compilerOptions = {
      enabled: true,
      warpTimer: false
    };
    this.debug = false;
    this._lastStepTime = Date.now();
    this.interpolationEnabled = false;
    this._defaultStoredSettings = this._generateAllProjectOptions();
    this.isPackaged = false;
    this.externalCommunicationMethods = {
      cloudVariables: false,
      customExtensions: false
    };
    this.on(Q.HAS_CLOUD_DATA_UPDATE, e => {
      this.setExternalCommunicationMethod("cloudVariables", e);
    });
    this.enforcePrivacy = true;
    this.privacyRestrictionsActive = false;
    this.extensionButtons = new Map();
    this.fontManager = new k(this);
    this.extensionStorage = {};
    this.totalAssetRequests = 0;
    this.finishedAssetRequests = 0;
  }
  static get STAGE_WIDTH() {
    return 480;
  }
  static get STAGE_HEIGHT() {
    return 360;
  }
  static get SCRIPT_GLOW_ON() {
    return "SCRIPT_GLOW_ON";
  }
  static get SCRIPT_GLOW_OFF() {
    return "SCRIPT_GLOW_OFF";
  }
  static get BLOCK_GLOW_ON() {
    return "BLOCK_GLOW_ON";
  }
  static get BLOCK_GLOW_OFF() {
    return "BLOCK_GLOW_OFF";
  }
  static get HAS_CLOUD_DATA_UPDATE() {
    return "HAS_CLOUD_DATA_UPDATE";
  }
  static get TURBO_MODE_ON() {
    return "TURBO_MODE_ON";
  }
  static get TURBO_MODE_OFF() {
    return "TURBO_MODE_OFF";
  }
  static get RUNTIME_OPTIONS_CHANGED() {
    return "RUNTIME_OPTIONS_CHANGED";
  }
  static get COMPILER_OPTIONS_CHANGED() {
    return "COMPILER_OPTIONS_CHANGED";
  }
  static get FRAMERATE_CHANGED() {
    return "FRAMERATE_CHANGED";
  }
  static get INTERPOLATION_CHANGED() {
    return "INTERPOLATION_CHANGED";
  }
  static get STAGE_SIZE_CHANGED() {
    return "STAGE_SIZE_CHANGED";
  }
  static get COMPILE_ERROR() {
    return "COMPILE_ERROR";
  }
  static get BEFORE_EXECUTE() {
    return "BEFORE_EXECUTE";
  }
  static get AFTER_EXECUTE() {
    return "AFTER_EXECUTE";
  }
  static get ASSET_PROGRESS() {
    return "ASSET_PROGRESS";
  }
  static get PROJECT_START() {
    return "PROJECT_START";
  }
  static get PROJECT_RUN_START() {
    return "PROJECT_RUN_START";
  }
  static get PROJECT_RUN_STOP() {
    return "PROJECT_RUN_STOP";
  }
  static get PROJECT_STOP_ALL() {
    return "PROJECT_STOP_ALL";
  }
  static get STOP_FOR_TARGET() {
    return "STOP_FOR_TARGET";
  }
  static get VISUAL_REPORT() {
    return "VISUAL_REPORT";
  }
  static get PROJECT_LOADED() {
    return "PROJECT_LOADED";
  }
  static get PROJECT_CHANGED() {
    return "PROJECT_CHANGED";
  }
  static get TOOLBOX_EXTENSIONS_NEED_UPDATE() {
    return "TOOLBOX_EXTENSIONS_NEED_UPDATE";
  }
  static get TARGETS_UPDATE() {
    return "TARGETS_UPDATE";
  }
  static get MONITORS_UPDATE() {
    return "MONITORS_UPDATE";
  }
  static get BLOCK_DRAG_UPDATE() {
    return "BLOCK_DRAG_UPDATE";
  }
  static get BLOCK_DRAG_END() {
    return "BLOCK_DRAG_END";
  }
  static get EXTENSION_ADDED() {
    return "EXTENSION_ADDED";
  }
  static get EXTENSION_FIELD_ADDED() {
    return "EXTENSION_FIELD_ADDED";
  }
  static get PERIPHERAL_LIST_UPDATE() {
    return "PERIPHERAL_LIST_UPDATE";
  }
  static get USER_PICKED_PERIPHERAL() {
    return "USER_PICKED_PERIPHERAL";
  }
  static get PERIPHERAL_CONNECTED() {
    return "PERIPHERAL_CONNECTED";
  }
  static get PERIPHERAL_DISCONNECTED() {
    return "PERIPHERAL_DISCONNECTED";
  }
  static get PERIPHERAL_REQUEST_ERROR() {
    return "PERIPHERAL_REQUEST_ERROR";
  }
  static get PERIPHERAL_CONNECTION_LOST_ERROR() {
    return "PERIPHERAL_CONNECTION_LOST_ERROR";
  }
  static get PERIPHERAL_SCAN_TIMEOUT() {
    return "PERIPHERAL_SCAN_TIMEOUT";
  }
  static get MIC_LISTENING() {
    return "MIC_LISTENING";
  }
  static get BLOCKSINFO_UPDATE() {
    return "BLOCKSINFO_UPDATE";
  }
  static get RUNTIME_STARTED() {
    return "RUNTIME_STARTED";
  }
  static get RUNTIME_STOPPED() {
    return "RUNTIME_STOPPED";
  }
  static get RUNTIME_DISPOSED() {
    return "RUNTIME_DISPOSED";
  }
  static get BLOCKS_NEED_UPDATE() {
    return "BLOCKS_NEED_UPDATE";
  }
  static get PLATFORM_MISMATCH() {
    return "PLATFORM_MISMATCH";
  }
  static get THREAD_STEP_INTERVAL() {
    return 1000 / 60;
  }
  static get THREAD_STEP_INTERVAL_COMPATIBILITY() {
    return 1000 / 30;
  }
  static get MAX_CLONES() {
    return 300;
  }
  _initializeAddCloudVariable(e) {
    return () => {
      const t = this.hasCloudData();
      e.addCloudVariable();
      if (!t && this.hasCloudData()) {
        this.emit(Q.HAS_CLOUD_DATA_UPDATE, true);
      }
    };
  }
  _initializeRemoveCloudVariable(e) {
    return () => {
      const t = this.hasCloudData();
      e.removeCloudVariable();
      if (t && !this.hasCloudData()) {
        this.emit(Q.HAS_CLOUD_DATA_UPDATE, false);
      }
    };
  }
  _registerBlockPackages() {
    for (const e in z) {
      if (Object.prototype.hasOwnProperty.call(z, e)) {
        const t = new z[e](this);
        if (t.getPrimitives) {
          const e = t.getPrimitives();
          for (const n in e) {
            if (Object.prototype.hasOwnProperty.call(e, n)) {
              this._primitives[n] = e[n].bind(t);
            }
          }
        }
        if (t.getHats) {
          const e = t.getHats();
          for (const t in e) {
            if (Object.prototype.hasOwnProperty.call(e, t)) {
              this._hats[t] = e[t];
            }
          }
        }
        if (t.getMonitored) {
          this.monitorBlockInfo = Object.assign({}, this.monitorBlockInfo, t.getMonitored());
        }
        this.compilerRegisterExtension(e, t);
      }
    }
  }
  compilerRegisterExtension(e, t) {
    this[`ext_${e}`] = t;
  }
  getMonitorState() {
    return this._monitorState;
  }
  _makeExtensionMenuId(e, t) {
    return `${t}_menu_${e}`;
  }
  makeMessageContextForTarget(e) {
    const t = {};
    if (e = e || this.getEditingTarget() || this.getTargetForStage()) {
      t.targetType = e.isStage ? b.STAGE : b.SPRITE;
    }
  }
  _registerExtensionPrimitives(e) {
    const t = {
      id: e.id,
      name: T(e.name),
      showStatusButton: e.showStatusButton,
      blockIconURI: e.blockIconURI,
      menuIconURI: e.menuIconURI
    };
    if (e.color1) {
      t.color1 = e.color1;
      t.color2 = e.color2;
      t.color3 = e.color3;
    } else {
      t.color1 = "#0FBD8C";
      t.color2 = "#0DA57A";
      t.color3 = "#0B8E69";
    }
    this._blockInfo.push(t);
    this._fillExtensionCategory(t, e);
    for (const n in t.customFieldTypes) {
      if (Object.prototype.hasOwnProperty.call(e.customFieldTypes, n)) {
        const e = t.customFieldTypes[n];
        this.emit(Q.EXTENSION_FIELD_ADDED, {
          name: `field_${e.extendedName}`,
          implementation: e.fieldImplementation
        });
      }
    }
    this.emit(Q.EXTENSION_ADDED, t);
  }
  _refreshExtensionPrimitives(e) {
    const t = this._blockInfo.find(t => t.id === e.id);
    if (t) {
      t.name = T(e.name);
      this._fillExtensionCategory(t, e);
      this.emit(Q.BLOCKSINFO_UPDATE, t);
    }
  }
  _fillExtensionCategory(e, t) {
    e.blocks = [];
    e.customFieldTypes = {};
    e.menus = [];
    e.menuInfo = {};
    for (const n in t.menus) {
      if (Object.prototype.hasOwnProperty.call(t.menus, n)) {
        const r = t.menus[n];
        const i = this._buildMenuForScratchBlocks(n, r, e);
        e.menus.push(i);
        e.menuInfo[n] = r;
      }
    }
    for (const n in t.customFieldTypes) {
      if (Object.prototype.hasOwnProperty.call(t.customFieldTypes, n)) {
        const r = t.customFieldTypes[n];
        const i = this._buildCustomFieldInfo(n, r, t.id, e);
        e.customFieldTypes[n] = i;
      }
    }
    if (t.docsURI) {
      const n = {
        info: {},
        xml: `<button text="${w(T({
          id: "tw.blocks.openDocs",
          default: "Open Documentation",
          description: "Button that opens site with more documentation about an extension"
        }))}" callbackKey="OPEN_EXTENSION_DOCS" callbackData="${w(t.docsURI)}"></button>`
      };
      e.blocks.push(n);
    }
    for (const n of t.blocks) {
      try {
        const t = this._convertForScratchBlocks(n, e);
        e.blocks.push(t);
        if (t.json) {
          const e = t.json.type;
          if (n.blockType !== h.EVENT) {
            this._primitives[e] = t.info.func;
          }
          if (n.blockType === h.EVENT || n.blockType === h.HAT) {
            this._hats[e] = {
              edgeActivated: n.isEdgeActivated,
              restartExistingThreads: n.shouldRestartExistingThreads
            };
          } else if (n.blockType === h.CONDITIONAL) {
            this._flowing[e] = {
              conditional: true,
              loop: false
            };
          } else if (n.blockType === h.LOOP) {
            this._flowing[e] = {
              conditional: false,
              loop: true
            };
          }
        }
      } catch (e) {
        E.error("Error parsing block: ", {
          block: n,
          error: e
        });
      }
    }
  }
  _convertMenuItems(e) {
    if (typeof e != "function") {
      const t = this.makeMessageContextForTarget();
      return e.map(e => {
        const n = T(e, t);
        switch (typeof n) {
          case "string":
            return [n, n];
          case "object":
            return [T(e.text, t), e.value];
          default:
            throw new Error(`Can't interpret menu item: ${JSON.stringify(e)}`);
        }
      });
    }
    return e;
  }
  _buildMenuForScratchBlocks(e, t, n) {
    const r = this._makeExtensionMenuId(e, n.id);
    const i = this._convertMenuItems(t.items);
    return {
      json: {
        message0: "%1",
        type: r,
        inputsInline: true,
        output: "String",
        colour: n.color1,
        colourSecondary: n.color2,
        colourTertiary: n.color3,
        outputShape: t.acceptReporters ? g.OUTPUT_SHAPE_ROUND : g.OUTPUT_SHAPE_SQUARE,
        args0: [{
          type: "field_dropdown",
          name: e,
          options: i
        }]
      }
    };
  }
  _buildCustomFieldInfo(e, t, n, r) {
    const i = `${n}_${e}`;
    return {
      fieldName: e,
      extendedName: i,
      argumentTypeInfo: {
        shadow: {
          type: i,
          fieldName: `field_${i}`
        }
      },
      scratchBlocksDefinition: this._buildCustomFieldTypeForScratchBlocks(i, t.output, t.outputShape, r),
      fieldImplementation: t.implementation
    };
  }
  _buildCustomFieldTypeForScratchBlocks(e, t, n, r) {
    return {
      json: {
        type: e,
        message0: "%1",
        inputsInline: true,
        output: t,
        colour: r.color1,
        colourSecondary: r.color2,
        colourTertiary: r.color3,
        outputShape: n,
        args0: [{
          name: `field_${e}`,
          type: `field_${e}`
        }]
      }
    };
  }
  _convertForScratchBlocks(e, t) {
    if (e === "---") {
      return this._convertSeparatorForScratchBlocks(e);
    } else if (e.blockType === h.LABEL) {
      return this._convertLabelForScratchBlocks(e);
    } else if (e.blockType === h.BUTTON) {
      return this._convertButtonForScratchBlocks(e, t);
    } else if (e.blockType === h.XML) {
      return this._convertXmlForScratchBlocks(e);
    } else {
      return this._convertBlockForScratchBlocks(e, t);
    }
  }
  _convertBlockForScratchBlocks(e, t) {
    const s = `${t.id}_${e.opcode}`;
    const o = {
      type: s,
      inputsInline: true,
      category: t.name,
      extensions: [],
      colour: e.color1 ?? t.color1,
      colourSecondary: e.color2 ?? t.color2,
      colourTertiary: e.color3 ?? t.color3
    };
    const a = {
      argsMap: {},
      blockJSON: o,
      categoryInfo: t,
      blockInfo: e,
      inputList: []
    };
    const c = e.blockIconURI || t.blockIconURI;
    o.extensions.push("from_extension");
    if (o.colour === "#0FBD8C" && o.colourSecondary === "#0DA57A" && o.colourTertiary === "#0B8E69") {
      o.extensions.push("default_extension_colors");
    }
    if (c) {
      o.extensions.push("scratch_extension");
      o.message0 = "%1 %2";
      const e = {
        type: "field_image",
        src: c,
        width: 40,
        height: 40
      };
      const t = {
        type: "field_vertical_separator"
      };
      o.args0 = [e, t];
    }
    switch (e.blockType) {
      case h.COMMAND:
        o.outputShape = g.OUTPUT_SHAPE_SQUARE;
        o.previousStatement = null;
        if (!e.isTerminal) {
          o.nextStatement = null;
        }
        break;
      case h.REPORTER:
        o.output = e.allowDropAnywhere ? null : "String";
        o.outputShape = g.OUTPUT_SHAPE_ROUND;
        break;
      case h.BOOLEAN:
        o.output = "Boolean";
        o.outputShape = g.OUTPUT_SHAPE_HEXAGONAL;
        break;
      case h.HAT:
      case h.EVENT:
        if (!Object.prototype.hasOwnProperty.call(e, "isEdgeActivated")) {
          e.isEdgeActivated = true;
        }
        o.outputShape = g.OUTPUT_SHAPE_SQUARE;
        o.nextStatement = null;
        break;
      case h.CONDITIONAL:
      case h.LOOP:
        e.branchCount = e.branchCount || 1;
        o.outputShape = g.OUTPUT_SHAPE_SQUARE;
        o.previousStatement = null;
        if (!e.isTerminal) {
          o.nextStatement = null;
        }
    }
    if (e.blockShape) {
      o.outputShape = e.blockShape;
    }
    const l = Array.isArray(e.text) ? e.text : [e.text];
    let u = 0;
    let d = 0;
    let p = 0;
    const f = this._convertPlaceholders.bind(this, a);
    const m = this.makeMessageContextForTarget();
    while (u < l.length || d < e.branchCount) {
      if (u < l.length) {
        a.outLineNum = p;
        const e = T(l[u], m).replace(/\[(.+?)]/g, f);
        if (o[`message${p}`]) {
          o[`message${p}`] += e;
        } else {
          o[`message${p}`] = e;
        }
        ++u;
        ++p;
      }
      if (d < e.branchCount) {
        o[`message${p}`] = "%1";
        o[`args${p}`] = [{
          type: "input_statement",
          name: `SUBSTACK${d > 0 ? d + 1 : ""}`
        }];
        ++d;
        ++p;
      }
    }
    if (e.blockType === h.REPORTER || e.blockType === h.BOOLEAN) {
      if (!e.disableMonitor && a.inputList.length === 0) {
        o.checkboxInFlyout = true;
      }
    } else if (e.branchIconURI || e.blockType === h.LOOP && !Object.prototype.hasOwnProperty.call(e, "branchIconURI")) {
      o[`lastDummyAlign${p}`] = "RIGHT";
      o[`message${p}`] = "%1";
      o[`args${p}`] = [{
        type: "field_image",
        src: e.branchIconURI ?? "media://repeat.svg",
        width: 24,
        height: 24,
        alt: "*",
        flip_rtl: true
      }];
      ++p;
    }
    const y = e.isDynamic ? `<mutation blockInfo="${w(JSON.stringify(e))}"/>` : "";
    const E = a.inputList.join("");
    const v = `<block type="${w(s)}">${y}${E}</block>`;
    if (e.extensions) {
      for (const t of e.extensions) {
        if (!o.extensions.includes(t)) {
          o.extensions.push(t);
        }
      }
    }
    return {
      info: a.blockInfo,
      json: a.blockJSON,
      xml: v
    };
  }
  _convertSeparatorForScratchBlocks(e) {
    return {
      info: e,
      xml: "<sep gap=\"36\"/>"
    };
  }
  _convertLabelForScratchBlocks(e) {
    return {
      info: e,
      xml: `<label text="${w(e.text)}"></label>`
    };
  }
  _convertButtonForScratchBlocks(e, t) {
    const n = this.makeMessageContextForTarget();
    const r = T(e.text, n);
    if (["MAKE_A_LIST", "MAKE_A_PROCEDURE", "MAKE_A_VARIABLE"].includes(e.func)) {
      return {
        info: e,
        xml: `<button text="${w(r)}" callbackKey="${w(e.func)}"></button>`
      };
    }
    const i = `${t.id}_${e.func}`;
    this.extensionButtons.set(i, e.callFunc);
    return {
      info: e,
      xml: `<button text="${w(r)}" callbackKey="EXTENSION_CALLBACK" callbackData="${w(i)}"></button>`
    };
  }
  _convertXmlForScratchBlocks(e) {
    return {
      info: e,
      xml: e.xml
    };
  }
  handleExtensionButtonPress(e) {
    this.extensionButtons.get(e)();
  }
  _constructInlineImageJson(e) {
    if (!e.dataURI) {
      E.warn("Missing data URI in extension block with argument type IMAGE");
    }
    return {
      type: "field_image",
      src: e.dataURI || "",
      width: 24,
      height: 24,
      flip_rtl: e.flipRTL || false
    };
  }
  _convertPlaceholders(e, t, n) {
    const r = e.blockInfo.arguments[n] || {};
    let i;
    let s = W[r.type] || {};
    if (!W[r.type] && e.categoryInfo.customFieldTypes[r.type]) {
      s = e.categoryInfo.customFieldTypes[r.type].argumentTypeInfo;
    }
    if (s.fieldType === "field_image") {
      i = this._constructInlineImageJson(r);
    } else {
      i = {
        type: "input_value",
        name: n
      };
      const t = r.defaultValue === undefined ? null : T(r.defaultValue, this.makeMessageContextForTarget()).toString();
      let o;
      let a;
      let c;
      if (s.check) {
        i.check = s.check;
      }
      if (r.menu) {
        const t = e.categoryInfo.menuInfo[r.menu];
        if (t.acceptReporters) {
          o = n;
          a = this._makeExtensionMenuId(r.menu, e.categoryInfo.id);
          c = r.menu;
        } else {
          i.type = "field_dropdown";
          i.options = this._convertMenuItems(t.items);
          o = null;
          a = null;
          c = n;
        }
      } else {
        o = n;
        a = s.shadow && s.shadow.type || null;
        c = s.shadow && s.shadow.fieldName || null;
      }
      if (o) {
        e.inputList.push(`<value name="${w(n)}">`);
      }
      if (a) {
        e.inputList.push(`<shadow type="${w(a)}">`);
      }
      if (t !== null && c) {
        e.inputList.push(`<field name="${w(c)}">${w(t)}</field>`);
      }
      if (a) {
        e.inputList.push("</shadow>");
      }
      if (o) {
        e.inputList.push("</value>");
      }
    }
    const o = `args${e.outLineNum}`;
    const a = e.blockJSON[o] = e.blockJSON[o] || [];
    if (i) {
      a.push(i);
    }
    const c = a.length;
    e.argsMap[n] = c;
    return `%${c}`;
  }
  getBlocksXML(e) {
    return this._blockInfo.map(t => {
      const {
        name: n,
        color1: r,
        color2: i
      } = t;
      const s = t.blocks.filter(t => {
        let n = true;
        if (e && t.info.filter) {
          n = t.info.filter.includes(e.isStage ? b.STAGE : b.SPRITE);
        }
        return n && !t.info.hideFromPalette;
      });
      const o = `colour="${w(r)}" secondaryColour="${w(i)}"`;
      let a = "";
      if (t.menuIconURI) {
        a = t.menuIconURI;
      } else if (t.blockIconURI) {
        a = t.blockIconURI;
      }
      const c = a ? `iconURI="${w(a)}"` : "";
      let l = "";
      if (t.showStatusButton) {
        l = "showStatusButton=\"true\"";
      }
      let u = `<category name="${w(n)}"`;
      u += ` id="${w(t.id)}"`;
      u += ` ${l}`;
      u += ` ${o}`;
      u += ` ${c}>`;
      u += s.map(e => e.xml).join("");
      u += "</category>";
      return {
        id: t.id,
        xml: u
      };
    });
  }
  getBlocksJSON() {
    return this._blockInfo.reduce((e, t) => e.concat(t.blocks.map(e => e.json)), []);
  }
  _initScratchLink() {
    if (typeof self != "undefined" && typeof document != "undefined" && document.getElementById && self.origin && self.origin !== "null" && self.navigator && self.navigator.userAgent && !self.navigator.userAgent.includes("Node.js") && !self.navigator.userAgent.includes("jsdom")) {
      if (!document.getElementById("scratch-link-extension-script")) {
        const e = document.createElement("script");
        e.id = "scratch-link-extension-script";
        document.body.appendChild(e);
        self.postMessage("inject-scratch-link-script", self.origin);
      }
    }
  }
  getScratchLinkSocket(e) {
    return (this._linkSocketFactory || this._defaultScratchLinkSocketFactory)(e);
  }
  configureScratchLinkSocketFactory(e) {
    this._linkSocketFactory = e;
  }
  _defaultScratchLinkSocketFactory(e) {
    const t = self.Scratch;
    const n = t && t.ScratchLinkSafariSocket;
    if (n && n.isSafariHelperCompatible()) {
      return new n(e);
    } else {
      return new S(e);
    }
  }
  registerPeripheralExtension(e, t) {
    this.peripheralExtensions[e] = t;
  }
  scanForPeripheral(e) {
    if (this.peripheralExtensions[e]) {
      this.peripheralExtensions[e].scan();
    }
  }
  connectPeripheral(e, t) {
    if (this.peripheralExtensions[e]) {
      this.peripheralExtensions[e].connect(t);
    }
  }
  disconnectPeripheral(e) {
    if (this.peripheralExtensions[e]) {
      this.peripheralExtensions[e].disconnect();
    }
  }
  getPeripheralIsConnected(e) {
    let t = false;
    if (this.peripheralExtensions[e]) {
      t = this.peripheralExtensions[e].isConnected();
    }
    return t;
  }
  emitMicListening(e) {
    this.emit(Q.MIC_LISTENING, e);
  }
  getOpcodeFunction(e) {
    return this._primitives[e];
  }
  getIsHat(e) {
    return Object.prototype.hasOwnProperty.call(this._hats, e);
  }
  getIsEdgeActivatedHat(e) {
    return Object.prototype.hasOwnProperty.call(this._hats, e) && this._hats[e].edgeActivated;
  }
  attachAudioEngine(e) {
    this.audioEngine = e;
  }
  attachRenderer(e) {
    this.renderer = e;
    this.renderer.setLayerGroupOrdering(v.LAYER_GROUPS);
    this.renderer.offscreenTouching = !this.runtimeOptions.fencing;
    this.updatePrivacy();
  }
  attachV2BitmapAdapter(e) {
    this.v2BitmapAdapter = e;
  }
  attachStorage(e) {
    this.storage = e;
    if (this.isPackaged) {
      const t = e.createAsset;
      let n = 0;
      e.createAsset = function (e, r, i, s, o) {
        s ||= (++n).toString();
        return t.call(this, e, r, i, s, false);
      };
    }
    I.setFetch(e.scratchFetch.scratchFetch);
    this.resetRunId();
  }
  _pushThread(e, t, n) {
    const r = new y(e);
    r.target = t;
    r.stackClick = Boolean(n && n.stackClick);
    r.updateMonitor = Boolean(n && n.updateMonitor);
    r.blockContainer = r.updateMonitor ? this.monitorBlocks : t.blocks;
    r.pushStack(e);
    this.threads.push(r);
    if (!r.stackClick && !r.updateMonitor) {
      this.threadMap.set(r.getId(), r);
    }
    if ((!n || !n.updateMonitor) && !!this.compilerOptions.enabled) {
      r.tryCompile();
    }
    return r;
  }
  _stopThread(e) {
    e.isKilled = true;
    this.sequencer.retireThread(e);
  }
  _restartThread(e) {
    const t = new y(e.topBlock);
    t.target = e.target;
    t.stackClick = e.stackClick;
    t.updateMonitor = e.updateMonitor;
    t.blockContainer = e.blockContainer;
    t.pushStack(e.topBlock);
    if (e.triedToCompile && this.compilerOptions.enabled) {
      t.tryCompile();
    }
    if (!t.stackClick && !t.updateMonitor) {
      this.threadMap.set(t.getId(), t);
    }
    const n = this.threads.indexOf(e);
    if (n > -1) {
      this.threads[n] = t;
      return t;
    } else {
      this.threads.push(e);
      return e;
    }
  }
  emitCompileError(e, t) {
    this.emit(Q.COMPILE_ERROR, e, t);
  }
  isActiveThread(e) {
    return e.stack.length > 0 && e.status !== y.STATUS_DONE && this.threads.indexOf(e) > -1;
  }
  isWaitingThread(e) {
    return e.status === y.STATUS_PROMISE_WAIT || e.status === y.STATUS_YIELD_TICK || !this.isActiveThread(e);
  }
  toggleScript(e, t) {
    t = Object.assign({
      target: this._editingTarget,
      stackClick: false
    }, t);
    for (let n = 0; n < this.threads.length; n++) {
      if (this.threads[n].target === t.target && this.threads[n].topBlock === e && this.threads[n].status !== y.STATUS_DONE) {
        const r = t.target.blocks;
        const i = r.getOpcode(r.getBlock(e));
        if (this.getIsEdgeActivatedHat(i) && this.threads[n].stackClick !== t.stackClick) {
          continue;
        }
        this._stopThread(this.threads[n]);
        return;
      }
    }
    this._pushThread(e, t.target, t);
  }
  addMonitorScript(e, t) {
    t ||= this._editingTarget;
    for (let t = 0; t < this.threads.length; t++) {
      if (this.threads[t].topBlock === e && this.threads[t].status !== y.STATUS_DONE && this.threads[t].updateMonitor) {
        return;
      }
    }
    this._pushThread(e, t, {
      updateMonitor: true
    });
  }
  allScriptsDo(e, t) {
    let n = this.executableTargets;
    if (t) {
      n = [t];
    }
    for (let t = n.length - 1; t >= 0; t--) {
      const r = n[t];
      const i = r.blocks.getScripts();
      for (let t = 0; t < i.length; t++) {
        e(i[t], r);
      }
    }
  }
  allScriptsByOpcodeDo(e, t, n) {
    let r = this.executableTargets;
    if (n) {
      r = [n];
    }
    for (let n = r.length - 1; n >= 0; n--) {
      const i = r[n];
      const s = u.getScripts(i.blocks, e);
      for (let e = 0; e < s.length; e++) {
        t(s[e], i);
      }
    }
  }
  startHats(e, t, n) {
    if (!Object.prototype.hasOwnProperty.call(this._hats, e)) {
      return;
    }
    const r = [];
    const i = this._hats[e];
    for (const e in t) {
      if (Object.prototype.hasOwnProperty.call(t, e)) {
        t[e] = t[e].toUpperCase();
      }
    }
    const s = this.threads.length;
    this.allScriptsByOpcodeDo(e, (e, n) => {
      const {
        blockId: o,
        fieldsOfInputs: a
      } = e;
      for (const e in t) {
        if (a[e].value !== t[e]) {
          return;
        }
      }
      if (i.restartExistingThreads) {
        const e = this.threadMap.get(y.getIdFromTargetAndBlock(n, o));
        if (e) {
          r.push(this._restartThread(e));
          return;
        }
      } else {
        for (let e = 0; e < s; e++) {
          if (this.threads[e].target === n && this.threads[e].topBlock === o && !this.threads[e].stackClick && this.threads[e].status !== y.STATUS_DONE) {
            return;
          }
        }
      }
      r.push(this._pushThread(o, n));
    }, n);
    r.forEach(e => {
      if (e.isCompiled) {
        if (e.executableHat) {
          m.saveGlobalState();
          m(e);
          m.restoreGlobalState();
        }
      } else {
        f(this.sequencer, e);
        e.goToNextBlock();
      }
    });
    return r;
  }
  dispose() {
    this.stopAll();
    this.targets.forEach(e => {
      if (e.isOriginal) {
        e.deleteMonitors();
      }
    });
    this.targets.map(this.disposeTarget, this);
    this.extensionStorage = {};
    if (!this._monitorState.empty()) {
      this._monitorState = new R();
      this.emit(Q.MONITORS_UPDATE, this._monitorState.shallowClone());
    }
    this.emit(Q.RUNTIME_DISPOSED);
    this.ioDevices.clock.resetProjectTimer();
    this.fontManager.clear();
    if (this.hasCloudData()) {
      this.emit(Q.HAS_CLOUD_DATA_UPDATE, false);
    }
    this.ioDevices.cloud.clear();
    const e = K(this.cloudOptions);
    this.hasCloudData = e.hasCloudVariables;
    this.canAddCloudVariable = e.canAddCloudVariable;
    this.getNumberOfCloudVariables = e.getNumberOfCloudVariables;
    this.addCloudVariable = this._initializeAddCloudVariable(e);
    this.removeCloudVariable = this._initializeRemoveCloudVariable(e);
    this.resetProgress();
  }
  addTarget(e) {
    this.targets.push(e);
    this.executableTargets.push(e);
    if (e.isStage && !this._stageTarget) {
      this._stageTarget = e;
    }
  }
  moveExecutable(e, t) {
    const n = this.executableTargets.indexOf(e);
    this.executableTargets.splice(n, 1);
    let r = n + t;
    if (r > this.executableTargets.length) {
      r = this.executableTargets.length;
    }
    if (r <= 0) {
      r = this.executableTargets.length > 0 && this.executableTargets[0].isStage ? 1 : 0;
    }
    this.executableTargets.splice(r, 0, e);
    return r;
  }
  setExecutablePosition(e, t) {
    const n = this.executableTargets.indexOf(e);
    return this.moveExecutable(e, t - n);
  }
  removeExecutable(e) {
    const t = this.executableTargets.indexOf(e);
    if (t > -1) {
      this.executableTargets.splice(t, 1);
    }
  }
  disposeTarget(e) {
    this.targets = this.targets.filter(t => e !== t || (t.dispose(), false));
    if (this._stageTarget === e) {
      this._stageTarget = null;
    }
  }
  stopForTarget(e, t) {
    this.emit(Q.STOP_FOR_TARGET, e, t);
    for (let n = 0; n < this.threads.length; n++) {
      if (this.threads[n] !== t && this.threads[n].target === e) {
        this._stopThread(this.threads[n]);
      }
    }
  }
  resetRunId() {
    if (!this.storage) {
      return;
    }
    const e = a.v1();
    this.storage.scratchFetch.setMetadata(this.storage.scratchFetch.RequestMetadata.RunId, e);
  }
  greenFlag() {
    this.stopAll();
    this.emit(Q.PROJECT_START);
    this.updateCurrentMSecs();
    this.ioDevices.clock.resetProjectTimer();
    this.targets.forEach(e => e.clearEdgeActivatedValues());
    for (let e = 0; e < this.targets.length; e++) {
      this.targets[e].onGreenFlag();
    }
    this.startHats("event_whenflagclicked");
  }
  stopAll() {
    this.emit(Q.PROJECT_STOP_ALL);
    const e = [];
    for (let t = 0; t < this.targets.length; t++) {
      this.targets[t].onStopAll();
      if (Object.prototype.hasOwnProperty.call(this.targets[t], "isOriginal") && !this.targets[t].isOriginal) {
        this.targets[t].dispose();
      } else {
        e.push(this.targets[t]);
      }
    }
    this.targets = e;
    if (this.sequencer.activeThread !== null) {
      this._stopThread(this.sequencer.activeThread);
    }
    this.threads = [];
    this.threadMap.clear();
    this.resetRunId();
  }
  _renderInterpolatedPositions() {
    const e = this._lastStepTime;
    const t = Date.now() - e;
    const n = Math.min(1, Math.max(0, t / this.currentStepTime));
    G.interpolate(this, n);
    if (this.renderer) {
      if (this.sampler.enableBasic) {
        this.sampler.pc[0] = x.RENDERER;
      }
      this.renderer.draw();
      if (this.sampler.enableBasic) {
        this.sampler.pc[0] = x.IDLE;
      }
    }
  }
  updateThreadMap() {
    this.threadMap.clear();
    for (const e of this.threads) {
      if (!e.stackClick && !e.updateMonitor) {
        this.threadMap.set(e.getId(), e);
      }
    }
  }
  _step() {
    if (this.sampler.enableBasic) {
      this.sampler.pc[0] = x.RUNTIME;
    }
    if (this.interpolationEnabled) {
      G.setupInitialState(this);
    }
    if (this.profiler !== null) {
      if (X === -1) {
        X = this.profiler.idByName("Runtime._step");
      }
      this.profiler.start(X);
    }
    this.threads = this.threads.filter(e => !e.isKilled);
    this.updateThreadMap();
    for (const e in this._hats) {
      if (!Object.prototype.hasOwnProperty.call(this._hats, e)) {
        continue;
      }
      if (this._hats[e].edgeActivated) {
        this.startHats(e);
      }
    }
    this.redrawRequested = false;
    this._pushMonitors();
    if (this.profiler !== null) {
      if (Z === -1) {
        Z = this.profiler.idByName("Sequencer.stepThreads");
      }
      this.profiler.start(Z);
    }
    this.emit(Q.BEFORE_EXECUTE);
    const e = this.sequencer.stepThreads();
    if (this.profiler !== null) {
      this.profiler.stop();
    }
    this.emit(Q.AFTER_EXECUTE);
    this._updateGlows(e);
    this._emitProjectRunStatus(this.threads.length + e.length - this._getMonitorThreadCount([...this.threads, ...e]));
    this._lastStepDoneThreads = e;
    if (this.renderer) {
      if (this.profiler !== null) {
        if (q === -1) {
          q = this.profiler.idByName("RenderWebGL.draw");
        }
        this.profiler.start(q);
      }
      if (!document.hidden && !this.frameLoop._interpolationAnimation) {
        if (this.sampler.enableBasic) {
          this.sampler.pc[0] = x.RENDERER;
        }
        this.renderer.draw();
        if (this.sampler.enableBasic) {
          this.sampler.pc[0] = x.RUNTIME;
        }
      }
      if (this.profiler !== null) {
        this.profiler.stop();
      }
    }
    if (this._refreshTargets) {
      this.emit(Q.TARGETS_UPDATE, false);
      this._refreshTargets = false;
    }
    if (this._monitorState.dirty) {
      this.emit(Q.MONITORS_UPDATE, this._monitorState.shallowClone());
      this._monitorState.dirty = false;
    }
    if (this.profiler !== null) {
      this.profiler.stop();
      this.profiler.reportFrames();
    }
    if (this.interpolationEnabled) {
      this._lastStepTime = Date.now();
    }
    if (this.sampler.enableBasic) {
      this.sampler.pc[0] = x.IDLE;
    }
  }
  _getMonitorThreadCount(e) {
    let t = 0;
    e.forEach(e => {
      if (e.updateMonitor) {
        t++;
      }
    });
    return t;
  }
  _pushMonitors() {
    if (this.targets.length !== 0) {
      this.monitorBlocks.runAllMonitored(this);
    }
  }
  setEditingTarget(e) {
    const t = this._editingTarget;
    this._editingTarget = e;
    this._scriptGlowsPreviousFrame = [];
    this._updateGlows();
    if (t !== this._editingTarget) {
      this.requestToolboxExtensionsUpdate();
    }
  }
  setCompatibilityMode(e) {
    if (e) {
      this.setFramerate(30);
    } else {
      this.setFramerate(60);
    }
  }
  setFramerate(e) {
    if (e > 250) {
      e = 250;
    }
    if (e < 0) {
      e = 1;
    }
    this.frameLoop.setFramerate(e);
    this.emit(Q.FRAMERATE_CHANGED, e);
  }
  setInterpolation(e) {
    this.interpolationEnabled = e;
    this.frameLoop.setInterpolation(this.interpolationEnabled);
    this.emit(Q.INTERPOLATION_CHANGED, e);
  }
  setRuntimeOptions(e) {
    this.runtimeOptions = Object.assign({}, this.runtimeOptions, e);
    this.emit(Q.RUNTIME_OPTIONS_CHANGED, this.runtimeOptions);
    if (this.renderer) {
      this.renderer.offscreenTouching = !this.runtimeOptions.fencing;
    }
  }
  setCompilerOptions(e) {
    this.compilerOptions = Object.assign({}, this.compilerOptions, e);
    this.resetAllCaches();
    this.emit(Q.COMPILER_OPTIONS_CHANGED, this.compilerOptions);
  }
  setStageSize(e, t) {
    e = Math.round(Math.max(1, e));
    t = Math.round(Math.max(1, t));
    if (this.stageWidth !== e || this.stageHeight !== t) {
      const n = e - this.stageWidth;
      const r = t - this.stageHeight;
      if (this._monitorState.size > 0) {
        const e = n / 2;
        const t = r / 2;
        for (const n of this._monitorState.valueSeq()) {
          this.requestUpdateMonitor({
            id: n.id,
            x: n.get("x") + e,
            y: n.get("y") + t
          });
        }
        this.emit(Q.MONITORS_UPDATE, this._monitorState.shallowClone());
      }
      this.stageWidth = e;
      this.stageHeight = t;
      if (this.renderer) {
        this.renderer.setStageSize(-e / 2, e / 2, -t / 2, t / 2);
      }
      this.emit(Q.STAGE_SIZE_CHANGED, e, t);
    }
  }
  setInEditor(e) {}
  convertToPackagedRuntime() {
    if (this.storage) {
      throw new Error("convertToPackagedRuntime must be called before attachStorage");
    }
    this.isPackaged = true;
  }
  resetAllCaches() {
    for (const e of this.targets) {
      if (e.isOriginal) {
        e.blocks.resetCache();
      }
    }
    this.flyoutBlocks.resetCache();
    this.monitorBlocks.resetCache();
  }
  addAddonBlock(e) {
    const t = e.procedureCode;
    const n = e.arguments || [];
    const s = n;
    const o = n.map((e, t) => `arg${t}`);
    const a = e.argumentDefaults || [];
    const c = n.map((e, t) => a[t] === undefined ? "" : `${a[t]}`);
    this.addonBlocks[t] = function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] ?? {};
        if (t % 2) {
          r(Object(n), true).forEach(function (t) {
            i(e, t, n[t]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
        } else {
          r(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
        }
      }
      return e;
    }({
      namesIdsDefaults: [s, o, c]
    }, e);
    if (!e.hidden) {
      const n = "a-b";
      let r = this._blockInfo.find(e => e.id === n);
      if (!r) {
        const e = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\"><path d=\"M14.92 1.053A13.835 13.835 0 0 0 1.052 14.919v18.162a13.835 13.835 0 0 0 13.866 13.866h18.162a13.835 13.835 0 0 0 13.866-13.866V14.919A13.835 13.835 0 0 0 33.081 1.053zm16.6 12.746L41.72 24 31.52 34.201l-3.276-3.275L35.17 24l-6.926-6.926Zm-15.116.073 3.278 3.278L12.83 24l6.926 6.926L16.48 34.2 6.28 24Z\" style=\"fill:#29beb8;fill-opacity:1;stroke:none;stroke-width:1.51371;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\"/></svg>";
        r = {
          id: n,
          name: T({
            id: "tw.blocks.addons",
            default: "Addons",
            description: "Name of the addon block category in the extension list"
          }),
          color1: "#29beb8",
          color2: "#3aa8a4",
          color3: "#3aa8a4",
          menuIconURI: `data:image/svg+xml;,${encodeURIComponent(e)}`,
          blocks: [],
          customFieldTypes: {},
          menus: []
        };
        this._blockInfo.unshift(r);
      }
      const i = (t.match(/%[nbs]/g) || []).map((e, t) => {
        if (c[t] === "" || e !== "%s" && e !== "%n") {
          return "";
        }
        const n = e === "%n" ? "math_number" : "text";
        const r = e === "%n" ? "NUM" : "TEXT";
        return `<value name="${w(o[t])}"><shadow type="${n}"><field name="${r}">${w(c[t])}</field></shadow></value>`;
      }).join("");
      r.blocks.push({
        info: {},
        xml: `<block type="procedures_call" gap="16"><mutation generateshadows="true" warp="false" proccode="${w(t)}" argumentnames="${w(JSON.stringify(s))}" argumentids="${w(JSON.stringify(o))}" argumentdefaults="${w(JSON.stringify(c))}"${e.return ? ` return="${w(e.return.toString())}"` : ""}></mutation>${i}</block>`
      });
    }
    this.resetAllCaches();
  }
  getAddonBlock(e) {
    if (Object.prototype.hasOwnProperty.call(this.addonBlocks, e)) {
      return this.addonBlocks[e];
    } else {
      return null;
    }
  }
  findProjectOptionsComment() {
    const e = this.getTargetForStage().comments;
    for (const t of Object.values(e)) {
      if (t.text.includes(H)) {
        return t;
      }
    }
    return null;
  }
  parseProjectOptions() {
    const e = this.findProjectOptionsComment();
    if (!e) {
      return;
    }
    const t = e.text.split("\n").find(e => e.endsWith(H));
    if (!t) {
      E.warn("Config comment does not contain valid line");
      return;
    }
    const n = t.substr(0, t.length - 14);
    let r;
    try {
      r = o.parse(n);
      if (!r || typeof r != "object") {
        throw new Error("Invalid object");
      }
    } catch (e) {
      E.warn("Config comment has invalid JSON", e);
      return;
    }
    if (typeof r.framerate == "number") {
      this.setFramerate(r.framerate);
    }
    if (r.turbo) {
      this.turboMode = true;
      this.emit(Q.TURBO_MODE_ON);
    }
    if (r.interpolation) {
      this.setInterpolation(true);
    }
    if (r.runtimeOptions) {
      this.setRuntimeOptions(r.runtimeOptions);
    }
    if (r.hq && this.renderer) {
      this.renderer.setUseHighQualityRender(true);
    }
    const i = +r.width || this.stageWidth;
    const s = +r.height || this.stageHeight;
    if (i !== this.stageWidth || s !== this.stageHeight) {
      this.setStageSize(i, s);
    }
  }
  _generateAllProjectOptions() {
    return {
      framerate: this.frameLoop.framerate,
      runtimeOptions: this.runtimeOptions,
      interpolation: this.interpolationEnabled,
      turbo: this.turboMode,
      hq: !!this.renderer && this.renderer.useHighQualityRender,
      width: this.stageWidth,
      height: this.stageHeight
    };
  }
  generateDifferingProjectOptions() {
    const e = (t, n) => {
      const r = {};
      for (const i of Object.keys(n)) {
        const s = n[i];
        const o = t[i];
        if (typeof s == "object" && s) {
          const t = e(o, s);
          if (Object.keys(t).length > 0) {
            r[i] = t;
          }
        } else if (s !== o) {
          r[i] = s;
        }
      }
      return r;
    };
    return e(this._defaultStoredSettings, this._generateAllProjectOptions());
  }
  storeProjectOptions() {
    const e = this.generateDifferingProjectOptions();
    const t = `Configuration for https://turbowarp.org/
You can move, resize, and minimize this comment, but don't edit it by hand. This comment can be deleted to remove the stored settings.
${o.stringify(e)}${H}`;
    const n = this.findProjectOptionsComment();
    if (n) {
      n.text = t;
    } else {
      this.getTargetForStage().createComment(j(), null, t, 50, 50, 350, 170, false);
    }
    this.emitProjectChanged();
  }
  precompile() {
    this.allScriptsDo((e, t) => {
      const n = t.blocks.getBlock(e);
      if (this.getIsHat(n.opcode)) {
        const n = new y(e);
        n.target = t;
        n.blockContainer = t.blocks;
        n.tryCompile();
      }
    });
  }
  enableDebug() {
    this.resetAllCaches();
    this.debug = true;
  }
  _updateGlows(e) {
    const t = [];
    t.push(...this.threads);
    if (e) {
      t.push(...e);
    }
    const n = [];
    const r = [];
    for (let e = 0; e < t.length; e++) {
      const r = t[e];
      const i = r.target;
      if (i === this._editingTarget) {
        const e = r.blockGlowInFrame;
        if (r.requestScriptGlowInFrame || r.stackClick) {
          let t = i.blocks.getTopLevelScript(e);
          t ||= this.flyoutBlocks.getTopLevelScript(e);
          if (t) {
            n.push(t);
          }
        }
      }
    }
    for (let e = 0; e < this._scriptGlowsPreviousFrame.length; e++) {
      const t = this._scriptGlowsPreviousFrame[e];
      if (n.indexOf(t) < 0) {
        this.glowScript(t, false);
      } else {
        r.push(t);
      }
    }
    for (let e = 0; e < n.length; e++) {
      const t = n[e];
      if (this._scriptGlowsPreviousFrame.indexOf(t) < 0) {
        this.glowScript(t, true);
        r.push(t);
      }
    }
    this._scriptGlowsPreviousFrame = r;
  }
  _emitProjectRunStatus(e) {
    if (this._nonMonitorThreadCount === 0 && e > 0) {
      this.emit(Q.PROJECT_RUN_START);
    }
    if (this._nonMonitorThreadCount > 0 && e === 0) {
      this.emit(Q.PROJECT_RUN_STOP);
    }
    this._nonMonitorThreadCount = e;
  }
  quietGlow(e) {
    const t = this._scriptGlowsPreviousFrame.indexOf(e);
    if (t > -1) {
      this._scriptGlowsPreviousFrame.splice(t, 1);
    }
  }
  glowBlock(e, t) {
    if (t) {
      this.emit(Q.BLOCK_GLOW_ON, {
        id: e
      });
    } else {
      this.emit(Q.BLOCK_GLOW_OFF, {
        id: e
      });
    }
  }
  glowScript(e, t) {
    if (t) {
      this.emit(Q.SCRIPT_GLOW_ON, {
        id: e
      });
    } else {
      this.emit(Q.SCRIPT_GLOW_OFF, {
        id: e
      });
    }
  }
  emitBlockDragUpdate(e) {
    this.emit(Q.BLOCK_DRAG_UPDATE, e);
  }
  emitBlockEndDrag(e, t) {
    this.emit(Q.BLOCK_DRAG_END, e, t);
  }
  visualReport(e, t, n) {
    if (e === this.getEditingTarget()) {
      this.emit(Q.VISUAL_REPORT, {
        id: t,
        value: N(n)
      });
    }
  }
  requestAddMonitor(e) {
    if (!this.requestUpdateMonitor(e)) {
      this._monitorState.set(e.id, e);
    }
  }
  requestUpdateMonitor(e) {
    const t = (e = _.externalDeltaToJS(e)).id;
    return !!this._monitorState.has(t) && (this._monitorState.set(t, e), true);
  }
  requestRemoveMonitor(e) {
    this._monitorState.delete(e);
  }
  requestHideMonitor(e) {
    return this.requestUpdateMonitor({
      id: e,
      visible: false
    });
  }
  requestShowMonitor(e) {
    return this.requestUpdateMonitor({
      id: e,
      visible: true
    });
  }
  requestRemoveMonitorByTargetId(e) {
    this._monitorState.filter(t => t.targetId !== e);
  }
  getTargetById(e) {
    for (let t = 0; t < this.targets.length; t++) {
      const n = this.targets[t];
      if (n.id === e) {
        return n;
      }
    }
  }
  getSpriteTargetByName(e) {
    for (let t = 0; t < this.targets.length; t++) {
      const n = this.targets[t];
      if (!n.isStage && n.sprite && n.sprite.name === e) {
        return n;
      }
    }
  }
  getTargetByDrawableId(e) {
    for (let t = 0; t < this.targets.length; t++) {
      const n = this.targets[t];
      if (n.drawableID === e) {
        return n;
      }
    }
  }
  changeCloneCounter(e) {
    this._cloneCounter += e;
  }
  clonesAvailable() {
    return this._cloneCounter < this.runtimeOptions.maxClones;
  }
  handleProjectLoaded() {
    this.emit(Q.PROJECT_LOADED);
    this.resetRunId();
  }
  emitProjectChanged() {
    this.emit(Q.PROJECT_CHANGED);
  }
  fireTargetWasCreated(e, t) {
    this.emit("targetWasCreated", e, t);
  }
  fireTargetWasRemoved(e) {
    this.emit("targetWasRemoved", e);
  }
  getTargetForStage() {
    if (this._stageTarget) {
      return this._stageTarget;
    }
    for (let e = 0; e < this.targets.length; e++) {
      const t = this.targets[e];
      if (t.isStage) {
        this._stageTarget = t;
        return t;
      }
    }
  }
  getEditingTarget() {
    return this._editingTarget;
  }
  getAllVarNamesOfType(e) {
    let t = [];
    for (const n of this.targets) {
      const r = n.getAllVariableNamesInScopeByType(e, true);
      t = t.concat(r);
    }
    return t;
  }
  getLabelForOpcode(e) {
    const [t, n] = F.splitFirst(e, "_");
    if (!t || !n) {
      return;
    }
    const r = this._blockInfo.find(e => e.id === t);
    if (!r) {
      return;
    }
    const i = r.blocks.find(e => e.info.opcode === n);
    if (i) {
      return {
        category: "extension",
        label: `${r.name}: ${i.info.text}`
      };
    } else {
      return undefined;
    }
  }
  createNewGlobalVariable(e, t, n) {
    const r = typeof n == "string" ? n : A.SCALAR_TYPE;
    const i = this.getAllVarNamesOfType(r);
    const s = F.unusedName(e, i);
    const o = A.create(t || j(), s, r);
    this.getTargetForStage().variables[o.id] = o;
    return o;
  }
  requestRedraw() {
    this.redrawRequested = true;
  }
  requestTargetsUpdate(e) {
    if (e.isOriginal) {
      this._refreshTargets = true;
    }
  }
  requestBlocksUpdate() {
    this.emit(Q.BLOCKS_NEED_UPDATE);
  }
  requestToolboxExtensionsUpdate() {
    this.emit(Q.TOOLBOX_EXTENSIONS_NEED_UPDATE);
  }
  start() {
    if (!this.frameLoop.running) {
      this.frameLoop.start();
      this.emit(Q.RUNTIME_STARTED);
    }
  }
  stop() {
    this.quit();
  }
  quit() {
    if (this.frameLoop.running) {
      this.frameLoop.stop();
      this.emit(Q.RUNTIME_STOPPED);
    }
  }
  enableProfiling(e) {
    if (d.available()) {
      this.profiler = new d(e);
    }
  }
  disableProfiling() {
    this.profiler = null;
  }
  updateCurrentMSecs() {
    this.currentMSecs = Date.now();
  }
  updatePrivacy() {
    this.privacyRestrictionsActive = this.enforcePrivacy && Object.values(this.externalCommunicationMethods).some(e => e);
    if (this.renderer && this.renderer.setPrivateSkinAccess) {
      this.renderer.setPrivateSkinAccess(!this.privacyRestrictionsActive);
    }
  }
  setEnforcePrivacy(e) {
    this.enforcePrivacy = e;
    this.updatePrivacy();
  }
  setExternalCommunicationMethod(e, t) {
    if (!Object.prototype.hasOwnProperty.call(this.externalCommunicationMethods, e)) {
      throw new Error(`Unknown method: ${e}`);
    }
    this.externalCommunicationMethods[e] = t;
    this.updatePrivacy();
  }
  emitAssetProgress() {
    this.emit(Q.ASSET_PROGRESS, this.finishedAssetRequests, this.totalAssetRequests);
  }
  resetProgress() {
    this.finishedAssetRequests = 0;
    this.totalAssetRequests = 0;
    this.emitAssetProgress();
  }
  wrapAssetRequest(e) {
    this.totalAssetRequests++;
    this.emitAssetProgress();
    return e().then(e => {
      this.finishedAssetRequests++;
      this.emitAssetProgress();
      return e;
    }, e => {
      this.finishedAssetRequests++;
      this.emitAssetProgress();
      throw e;
    });
  }
}
module.exports = Q;