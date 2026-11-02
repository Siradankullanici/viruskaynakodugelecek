const r = require("./43.js");
const i = require("./17.js");
const s = require("./50.js");
const o = require("./9.js");
const a = require("./49.js");
const c = require("./24.js");
const l = require("./13.js");
const u = require("./0.js");
const h = require("./7.js");
const d = require("./4.js");
const p = require("./6.js");
const f = require("./74.js");
const m = require("./261.js");
const {
  loadCostume: g
} = require("./35.js");
const {
  loadSound: b
} = require("./34.js");
const {
  deserializeCostume: y,
  deserializeSound: E
} = require("./83.js");
const T = Object.prototype.hasOwnProperty;
const v = ["argument", "colour", "control", "data", "event", "looks", "math", "motion", "operator", "procedures", "sensing", "sound"];
const A = 12;
const w = 13;
const S = {
  math_number: [4, "NUM"],
  math_positive_number: [5, "NUM"],
  math_whole_number: [6, "NUM"],
  math_integer: [7, "NUM"],
  math_angle: [8, "NUM"],
  colour_picker: [9, "COLOUR"],
  text: [10, "TEXT"],
  event_broadcast_menu: [11, "BROADCAST_OPTION"],
  data_variable: [A, "VARIABLE"],
  data_listcontents: [w, "LIST"]
};
const k = 8000;
const I = function (e) {
  const t = function (e) {
    if (T.call(S, e.opcode)) {
      const t = S[e.opcode];
      const n = t[0];
      const r = t[1];
      const i = e.fields[r];
      const s = [n, i.value];
      if (e.opcode === "event_broadcast_menu") {
        s.push(i.id);
      } else if (e.opcode === "data_variable" || e.opcode === "data_listcontents") {
        s.push(i.id);
        if (e.topLevel) {
          s.push(e.x ? Math.round(e.x) : 0);
          s.push(e.y ? Math.round(e.y) : 0);
        }
      }
      return s;
    }
    return null;
  }(e);
  if (t) {
    return t;
  }
  const n = Object.create(null);
  n.opcode = e.opcode;
  n.next = e.next;
  n.parent = e.parent;
  n.inputs = function (e) {
    const t = Object.create(null);
    for (const n in e) {
      if (T.call(e, n)) {
        if (e[n].block === e[n].shadow) {
          t[n] = [1, e[n].block];
        } else if (e[n].shadow === null) {
          t[n] = [2, e[n].block];
        } else {
          t[n] = [3, e[n].block, e[n].shadow];
        }
      }
    }
    return t;
  }(e.inputs);
  n.fields = function (e) {
    const t = Object.create(null);
    for (const n in e) {
      if (T.call(e, n)) {
        t[n] = [e[n].value];
        if (Object.prototype.hasOwnProperty.call(e[n], "id")) {
          t[n].push(e[n].id);
        }
      }
    }
    return t;
  }(e.fields);
  n.shadow = e.shadow;
  if (e.topLevel) {
    n.topLevel = true;
    n.x = e.x ? Math.round(e.x) : 0;
    n.y = e.y ? Math.round(e.y) : 0;
  } else {
    n.topLevel = false;
  }
  if (e.mutation) {
    n.mutation = e.mutation;
  }
  if (e.comment) {
    n.comment = e.comment;
  }
  return n;
};
const O = function (e, t) {
  const n = e.inputs;
  for (const e in n) {
    const r = n[e];
    for (let e = 1; e < r.length; e++) {
      if (!r[e]) {
        continue;
      }
      const n = r[e];
      const i = t[n];
      if (Array.isArray(i)) {
        r[e] = i;
        delete t[n];
      }
    }
  }
  return e;
};
const N = function (e) {
  const t = e.indexOf("_");
  const n = e.substring(0, t).replace(/[^\w-]/g, "-");
  if (v.indexOf(n) === -1 && n !== "") {
    return n;
  }
};
const R = (e, t) => {
  if (!t.extensionManager) {
    return null;
  }
  const n = t.extensionManager.getExtensionURLs();
  const r = {};
  for (const t of e) {
    const e = n[t];
    if (typeof e == "string") {
      r[t] = e;
    }
  }
  if (Object.keys(r).length === 0) {
    return null;
  } else {
    return r;
  }
};
const x = function (e) {
  const t = Object.create(null);
  const n = new Set();
  for (const r in e) {
    if (!Object.prototype.hasOwnProperty.call(e, r)) {
      continue;
    }
    t[r] = I(e[r]);
    const i = N(e[r].opcode);
    if (i) {
      n.add(i);
    }
  }
  for (const e in t) {
    const n = t[e];
    t[e] = O(n, t);
  }
  for (const e in t) {
    const n = t[e];
    if (Array.isArray(n) && [A, w].indexOf(n[0]) < 0) {
      u.warn(`Found an unexpected top level primitive with block ID: ${e}; deleting it from serialized blocks.`);
      delete t[e];
    }
  }
  return [t, Array.from(n)];
};
const M = function (e) {
  const t = Object.create(null);
  t.name = e.name;
  const n = e.broken || e;
  t.bitmapResolution = n.bitmapResolution;
  t.dataFormat = n.dataFormat.toLowerCase();
  t.assetId = n.assetId;
  t.md5ext = n.md5;
  t.rotationCenterX = n.rotationCenterX;
  t.rotationCenterY = n.rotationCenterY;
  return t;
};
const C = function (e) {
  const t = Object.create(null);
  t.name = e.name;
  const n = e.broken || e;
  t.assetId = n.assetId;
  t.dataFormat = n.dataFormat.toLowerCase();
  t.format = n.format;
  t.rate = n.rate;
  t.sampleCount = n.sampleCount;
  t.md5ext = n.md5;
  return t;
};
const P = function (e, t) {
  const n = Object.create(null);
  let r = [];
  n.isStage = e.isStage;
  n.name = n.isStage ? "Stage" : e.name;
  const i = function (e) {
    const t = Object.create(null);
    t.variables = Object.create(null);
    t.lists = Object.create(null);
    t.broadcasts = Object.create(null);
    for (const n in e) {
      const r = e[n];
      if (r.type !== o.BROADCAST_MESSAGE_TYPE) {
        if (r.type !== o.LIST_TYPE) {
          t.variables[n] = [r.name, r.value];
          if (r.isCloud) {
            t.variables[n].push(true);
          }
        } else {
          t.lists[n] = [r.name, r.value];
        }
      } else {
        t.broadcasts[n] = r.value;
      }
    }
    return t;
  }(e.variables);
  n.variables = i.variables;
  n.lists = i.lists;
  n.broadcasts = i.broadcasts;
  [n.blocks, r] = x(e.blocks);
  n.comments = function (e) {
    const t = Object.create(null);
    for (const n in e) {
      if (!Object.prototype.hasOwnProperty.call(e, n)) {
        continue;
      }
      const r = e[n];
      const i = Object.create(null);
      i.blockId = r.blockId;
      i.x = r.x;
      i.y = r.y;
      i.width = r.width;
      i.height = r.height;
      i.minimized = r.minimized;
      if (r.text.length > k) {
        i.text = r.text.substring(0, k);
        i.extraText = r.text.substring(k);
      } else {
        i.text = r.text;
      }
      t[n] = i;
    }
    return t;
  }(e.comments);
  if (e.currentCostume < 0 || e.currentCostume >= e.costumes.length) {
    u.warn(`currentCostume property for target ${e.name} is out of range`);
    e.currentCostume = d.clamp(e.currentCostume, 0, e.costumes.length - 1);
  }
  n.currentCostume = e.currentCostume;
  n.costumes = e.costumes.map(M);
  n.sounds = e.sounds.map(C);
  if (Object.prototype.hasOwnProperty.call(e, "volume")) {
    n.volume = e.volume;
  }
  if (Object.prototype.hasOwnProperty.call(e, "layerOrder")) {
    n.layerOrder = e.layerOrder;
  }
  if (n.isStage) {
    if (Object.prototype.hasOwnProperty.call(e, "tempo")) {
      n.tempo = e.tempo;
    }
    if (Object.prototype.hasOwnProperty.call(e, "videoTransparency")) {
      n.videoTransparency = e.videoTransparency;
    }
    if (Object.prototype.hasOwnProperty.call(e, "videoState")) {
      n.videoState = e.videoState;
    }
    if (Object.prototype.hasOwnProperty.call(e, "textToSpeechLanguage")) {
      n.textToSpeechLanguage = e.textToSpeechLanguage;
    }
  } else {
    n.visible = e.visible;
    n.x = e.x;
    n.y = e.y;
    n.size = e.size;
    n.direction = e.direction;
    n.draggable = e.draggable;
    n.rotationStyle = e.rotationStyle;
  }
  r.forEach(e => {
    t.add(e);
  });
  return n;
};
const L = (e, t) => {
  const n = {};
  let r = true;
  for (const [i, s] of Object.entries(e)) {
    if (t.has(i) && s != null) {
      r = false;
      n[i] = e[i];
    }
  }
  if (r) {
    return null;
  } else {
    return n;
  }
};
const D = function (e, t, n, r) {
  if (!Array.isArray(e)) {
    return e;
  }
  const i = Object.create(null);
  const s = h();
  i.id = s;
  i.next = null;
  i.parent = t;
  i.shadow = n;
  i.inputs = Object.create(null);
  switch (e[0]) {
    case 4:
      i.opcode = "math_number";
      i.fields = {
        NUM: {
          name: "NUM",
          value: e[1]
        }
      };
      i.topLevel = false;
      break;
    case 5:
      i.opcode = "math_positive_number";
      i.fields = {
        NUM: {
          name: "NUM",
          value: e[1]
        }
      };
      i.topLevel = false;
      break;
    case 6:
      i.opcode = "math_whole_number";
      i.fields = {
        NUM: {
          name: "NUM",
          value: e[1]
        }
      };
      i.topLevel = false;
      break;
    case 7:
      i.opcode = "math_integer";
      i.fields = {
        NUM: {
          name: "NUM",
          value: e[1]
        }
      };
      i.topLevel = false;
      break;
    case 8:
      i.opcode = "math_angle";
      i.fields = {
        NUM: {
          name: "NUM",
          value: e[1]
        }
      };
      i.topLevel = false;
      break;
    case 9:
      i.opcode = "colour_picker";
      i.fields = {
        COLOUR: {
          name: "COLOUR",
          value: e[1]
        }
      };
      i.topLevel = false;
      break;
    case 10:
      i.opcode = "text";
      i.fields = {
        TEXT: {
          name: "TEXT",
          value: e[1]
        }
      };
      i.topLevel = false;
      break;
    case 11:
      i.opcode = "event_broadcast_menu";
      i.fields = {
        BROADCAST_OPTION: {
          name: "BROADCAST_OPTION",
          value: e[1],
          id: e[2],
          variableType: o.BROADCAST_MESSAGE_TYPE
        }
      };
      i.topLevel = false;
      break;
    case A:
      i.opcode = "data_variable";
      i.fields = {
        VARIABLE: {
          name: "VARIABLE",
          value: e[1],
          id: e[2],
          variableType: o.SCALAR_TYPE
        }
      };
      if (e.length > 3) {
        i.topLevel = true;
        i.x = e[3];
        i.y = e[4];
      }
      break;
    case w:
      i.opcode = "data_listcontents";
      i.fields = {
        LIST: {
          name: "LIST",
          value: e[1],
          id: e[2],
          variableType: o.LIST_TYPE
        }
      };
      if (e.length > 3) {
        i.topLevel = true;
        i.x = e[3];
        i.y = e[4];
      }
      break;
    default:
      u.error(`Found unknown primitive type during deserialization: ${JSON.stringify(e)}`);
      return null;
  }
  r[s] = i;
  return s;
};
const B = function (e, t, n) {
  const r = {};
  for (const i in e) {
    if (!T.call(e, i)) {
      continue;
    }
    const s = e[i];
    if (!Array.isArray(s)) {
      continue;
    }
    let o = null;
    let a = null;
    const c = s[0];
    if (c === 1) {
      o = a = D(s[1], t, true, n);
    } else if (c === 2) {
      o = D(s[1], t, false, n);
    } else {
      o = D(s[1], t, false, n);
      a = D(s[2], t, true, n);
    }
    r[i] = {
      name: i,
      block: o,
      shadow: a
    };
  }
  return r;
};
const U = function (e) {
  const t = {};
  for (const n in e) {
    if (!T.call(e, n)) {
      continue;
    }
    const r = e[n];
    if (Array.isArray(r)) {
      t[n] = {
        name: n,
        value: r[0]
      };
      if (r.length > 1) {
        t[n].id = r[1];
      }
      if (n === "BROADCAST_OPTION") {
        t[n].variableType = o.BROADCAST_MESSAGE_TYPE;
      } else if (n === "VARIABLE") {
        t[n].variableType = o.SCALAR_TYPE;
      } else if (n === "LIST") {
        t[n].variableType = o.LIST_TYPE;
      }
    }
  }
  return t;
};
const F = function (e) {
  for (const t in e) {
    if (!Object.prototype.hasOwnProperty.call(e, t)) {
      continue;
    }
    const n = e[t];
    if (Array.isArray(n)) {
      delete e[t];
      D(n, null, false, e);
    } else {
      n.id = t;
      n.inputs = B(n.inputs, t, e);
      n.fields = U(n.fields);
    }
  }
  return e;
};
const j = function (e, t, n, r, c) {
  if (!Object.prototype.hasOwnProperty.call(e, "name")) {
    return Promise.resolve(null);
  }
  const u = new i(t);
  const h = new s(u, t);
  if (Object.prototype.hasOwnProperty.call(e, "name")) {
    h.name = e.name;
  }
  if (Object.prototype.hasOwnProperty.call(e, "blocks")) {
    F(e.blocks);
    for (const t in e.blocks) {
      if (!Object.prototype.hasOwnProperty.call(e.blocks, t)) {
        continue;
      }
      const r = e.blocks[t];
      u.createBlock(r);
      const i = N(r.opcode);
      if (i) {
        n.extensionIDs.add(i);
      }
    }
    (function (e) {
      for (const n in e) {
        if (!Object.prototype.hasOwnProperty.call(e, n)) {
          continue;
        }
        const r = e[n];
        switch (r.opcode) {
          case "procedures_prototype":
            r.shadow = true;
            break;
          case "argument_reporter_string_number":
          case "argument_reporter_boolean":
            {
              const t = e[r.parent];
              if (t && t.opcode === "procedures_prototype") {
                r.shadow = true;
              }
              break;
            }
          case "control_stop":
            if (!r.mutation) {
              var t;
              const e = (t = r.fields) === null || t === undefined || (t = t.STOP_OPTION) === null || t === undefined ? undefined : t.value;
              const n = e === "other scripts in sprite" || e === "other scripts in stage";
              r.mutation = {
                tagName: "mutation",
                hasnext: n ? "true" : "false",
                children: []
              };
            }
        }
      }
    })(e.blocks);
  }
  const {
    costumePromises: p
  } = c;
  const {
    soundBank: f,
    soundPromises: m
  } = c;
  const g = h.createClone(e.isStage ? l.BACKGROUND_LAYER : l.SPRITE_LAYER);
  if (Object.prototype.hasOwnProperty.call(e, "tempo")) {
    g.tempo = e.tempo;
  }
  if (Object.prototype.hasOwnProperty.call(e, "volume")) {
    g.volume = e.volume;
  }
  if (Object.prototype.hasOwnProperty.call(e, "videoTransparency")) {
    g.videoTransparency = e.videoTransparency;
  }
  if (Object.prototype.hasOwnProperty.call(e, "videoState")) {
    g.videoState = e.videoState;
  }
  if (Object.prototype.hasOwnProperty.call(e, "textToSpeechLanguage")) {
    g.textToSpeechLanguage = e.textToSpeechLanguage;
  }
  if (Object.prototype.hasOwnProperty.call(e, "variables")) {
    for (const n in e.variables) {
      const r = e.variables[n];
      const i = r.length === 3 && r[2] && e.isStage && t.canAddCloudVariable();
      const s = o.create(n, r[0], o.SCALAR_TYPE, i);
      if (i) {
        t.addCloudVariable();
      }
      s.value = r[1];
      g.variables[s.id] = s;
    }
  }
  if (Object.prototype.hasOwnProperty.call(e, "lists")) {
    for (const t in e.lists) {
      const n = e.lists[t];
      const r = o.create(t, n[0], o.LIST_TYPE, false);
      r.value = n[1];
      g.variables[r.id] = r;
    }
  }
  if (Object.prototype.hasOwnProperty.call(e, "broadcasts")) {
    for (const t in e.broadcasts) {
      const n = e.broadcasts[t];
      const r = o.create(t, n, o.BROADCAST_MESSAGE_TYPE, false);
      g.variables[r.id] = r;
    }
  }
  if (Object.prototype.hasOwnProperty.call(e, "comments")) {
    for (const t in e.comments) {
      const n = e.comments[t];
      const r = new a(t, n.text + (typeof n.extraText == "string" ? n.extraText : ""), n.x, n.y, n.width, n.height, n.minimized);
      if (n.blockId) {
        r.blockId = n.blockId;
      }
      g.comments[r.id] = r;
    }
  }
  if (Object.prototype.hasOwnProperty.call(e, "x")) {
    g.x = e.x;
  }
  if (Object.prototype.hasOwnProperty.call(e, "y")) {
    g.y = e.y;
  }
  if (Object.prototype.hasOwnProperty.call(e, "direction")) {
    g.direction = d.wrapClamp(e.direction, -179, 180);
  }
  if (Object.prototype.hasOwnProperty.call(e, "size")) {
    g.size = e.size;
  }
  if (Object.prototype.hasOwnProperty.call(e, "visible")) {
    g.visible = e.visible;
  }
  if (Object.prototype.hasOwnProperty.call(e, "currentCostume")) {
    g.currentCostume = d.clamp(e.currentCostume, 0, e.costumes.length - 1);
  }
  if (Object.prototype.hasOwnProperty.call(e, "rotationStyle")) {
    g.rotationStyle = e.rotationStyle;
  }
  if (Object.prototype.hasOwnProperty.call(e, "isStage")) {
    g.isStage = e.isStage;
  }
  if (Object.prototype.hasOwnProperty.call(e, "draggable")) {
    g.draggable = e.draggable;
  }
  if (Object.prototype.hasOwnProperty.call(e, "extensionStorage")) {
    g.extensionStorage = e.extensionStorage;
  }
  Promise.all(p).then(e => {
    h.costumes = e;
  });
  Promise.all(m).then(e => {
    h.sounds = e;
    h.soundBank = f || null;
  });
  return Promise.all(p.concat(m)).then(() => g);
};
module.exports = {
  serialize: function (e, t, {
    allowOptimization: n = true
  } = {}) {
    const r = Object.create(null);
    const i = new Set();
    const s = t ? [e.getTargetById(t)] : e.targets.filter(e => e.isOriginal);
    const o = function (e) {
      const t = e.map(e => e.getLayerOrder());
      return d.reducedSortOrdering(t);
    }(s);
    const a = s.map(e => e.toJSON());
    if (e.renderer && !t) {
      a.forEach((e, t) => {
        e.layerOrder = o[t];
      });
    }
    const c = a.map(e => P(e, i)).map((e, t) => {
      const n = s[t];
      const r = L(n.extensionStorage, i);
      if (r) {
        e.extensionStorage = r;
      }
      return e;
    });
    const l = e.fontManager.serializeJSON();
    if (t) {
      const t = c[0];
      if (i.size) {
        t.extensions = Array.from(i);
      }
      const n = R(i, e);
      if (n) {
        t.extensionURLs = n;
      }
      if (l) {
        t.customFonts = l;
      }
      return c[0];
    }
    const u = L(e.extensionStorage, i);
    if (u) {
      r.extensionStorage = u;
    }
    r.targets = c;
    r.monitors = function (e, t, n) {
      const r = (t.stageWidth - 480) / 2;
      const i = (t.stageHeight - 360) / 2;
      return e.valueSeq().filter(e => {
        const t = N(e.opcode);
        return !t || !!e.visible && (n.add(t), true);
      }).map(e => {
        const t = {
          id: e.id,
          mode: e.mode,
          opcode: e.opcode,
          params: e.params,
          spriteName: e.spriteName,
          value: Array.isArray(e.value) ? [] : 0,
          width: e.width,
          height: e.height,
          x: e.x - r,
          y: e.y - i,
          visible: e.visible
        };
        if (e.mode !== "list") {
          t.sliderMin = e.sliderMin;
          t.sliderMax = e.sliderMax;
          t.isDiscrete = e.isDiscrete;
        }
        return t;
      });
    }(e.getMonitorState(), e, i);
    r.extensions = Array.from(i);
    const h = R(i, e);
    if (h) {
      r.extensionURLs = h;
    }
    if (l) {
      r.customFonts = l;
    }
    const p = Object.create(null);
    p.semver = "3.0.0";
    p.vm = "0.2.0";
    if (e.origin) {
      p.origin = e.origin;
    }
    p.agent = "";
    p.platform = Object.assign({}, e.platform);
    r.meta = p;
    if (n) {
      m(r);
    }
    return r;
  },
  deserialize: async function (e, t, n, i) {
    await ((e, t) => {
      if (!e.meta || !e.meta.platform) {
        return;
      }
      if (e.meta.platform.name === t.platform.name) {
        return;
      }
      let n = t.listenerCount(r.PLATFORM_MISMATCH);
      if (n !== 0) {
        return new Promise(i => {
          t.emit(r.PLATFORM_MISMATCH, e.meta.platform, () => {
            n--;
            if (n === 0) {
              i();
            }
          });
        });
      } else {
        return undefined;
      }
    })(e, t);
    const s = {
      extensionIDs: new Set(),
      extensionURLs: new Map()
    };
    if (e.meta && e.meta.origin) {
      t.origin = e.meta.origin;
    } else {
      t.origin = null;
    }
    if (e.extensionURLs) {
      for (const [t, n] of Object.entries(e.extensionURLs)) {
        s.extensionURLs.set(t, n);
      }
    }
    let a;
    a = e.customFonts ? t.fontManager.deserialize(e.customFonts, n, i) : Promise.resolve();
    const l = ((i ? [e] : e.targets) || []).map((e, t) => Object.assign(e, {
      targetPaneOrder: t
    })).sort((e, t) => e.layerOrder - t.layerOrder);
    const h = e.monitors || [];
    let m;
    return a.then(() => l.map(e => function (e, t, n) {
      if (!Object.prototype.hasOwnProperty.call(e, "name")) {
        return Promise.resolve(null);
      }
      const r = {
        costumePromises: null,
        soundPromises: null,
        soundBank: t.audioEngine && t.audioEngine.createBank()
      };
      r.costumePromises = (e.costumes || []).map(e => {
        const r = {
          asset: e.asset,
          assetId: e.assetId,
          skinId: null,
          name: e.name,
          bitmapResolution: e.bitmapResolution,
          rotationCenterX: e.rotationCenterX,
          rotationCenterY: e.rotationCenterY
        };
        const i = e.dataFormat || e.assetType && e.assetType.runtimeFormat || "png";
        const s = Object.prototype.hasOwnProperty.call(e, "md5ext") ? e.md5ext : `${e.assetId}.${i}`;
        r.md5 = s;
        r.dataFormat = i;
        return t.wrapAssetRequest(() => y(r, t, n).then(() => g(s, r, t)));
      });
      r.soundPromises = (e.sounds || []).map(e => {
        const i = {
          assetId: e.assetId,
          format: e.format,
          rate: e.rate,
          sampleCount: e.sampleCount,
          name: e.name,
          md5: e.md5ext,
          dataFormat: e.dataFormat,
          data: null
        };
        return t.wrapAssetRequest(() => E(i, t, n).then(() => b(i, t, r.soundBank)));
      });
      return r;
    }(e, t, n))).then(e => Promise.resolve(e)).then(e => Promise.all(l.map((n, r) => j(n, t, s, 0, e[r])))).then(e => {
      const t = e.map((e, t) => ({
        target: e,
        layerOrder: t,
        targetPaneOrder: l[t].targetPaneOrder
      })).sort((e, t) => e.targetPaneOrder - t.targetPaneOrder);
      m = t.map(e => e.layerOrder);
      return t.map(e => e.target);
    }).then(e => function (e) {
      const t = f.getAllVarRefsForTargets(e, true);
      e.forEach(e => {
        Object.keys(e.variables).forEach(t => {
          const n = p.replaceUnsafeChars(t);
          if (n !== t) {
            e.variables[t].id = n;
            e.variables[n] = e.variables[t];
            delete e.variables[t];
          }
        });
      });
      for (const e in t) {
        const n = p.replaceUnsafeChars(e);
        if (e !== n) {
          f.updateVariableIdentifiers(t[e], n);
        }
      }
      return e;
    }(e)).then(n => {
      h.map(e => function (e, t, n, r) {
        const i = (t.stageWidth - 480) / 2;
        const s = (t.stageHeight - 360) / 2;
        e.x += i;
        e.y += s;
        e.x = d.clamp(e.x, 0, t.stageWidth);
        e.y = d.clamp(e.y, 0, t.stageHeight);
        if (e.spriteName) {
          const t = n.filter(t => t.sprite.name === e.spriteName);
          if (t && t.length > 0) {
            e.targetId = t[0].id;
          } else {
            u.warn(`Tried to deserialize sprite specific monitor ${e.opcode} but could not find sprite ${e.spriteName}.`);
          }
        }
        const a = t.monitorBlockInfo[e.opcode];
        if (e.opcode === "data_listcontents") {
          const t = e.targetId ? n.find(t => t.id === e.targetId) : n.find(e => e.isStage);
          if (t && Object.prototype.hasOwnProperty.call(t.variables, e.id)) {
            e.params.LIST = t.variables[e.id].name;
          }
        }
        const l = {};
        for (const t in e.params) {
          const n = {
            name: t,
            value: e.params[t]
          };
          l[t] = n;
        }
        if (e.opcode !== "data_variable" && e.opcode !== "data_listcontents" && a && a.isSpriteSpecific) {
          e.id = a.getId(e.targetId, l);
        } else {
          e.id = p.replaceUnsafeChars(e.id);
        }
        const h = T.call(t.monitorBlocks._blocks, e.id) ? t.monitorBlocks._blocks[e.id] : null;
        if (h) {
          h.isMonitored = e.visible;
          h.targetId = e.targetId;
        } else {
          const n = {
            id: e.id,
            opcode: e.opcode,
            inputs: {},
            fields: l,
            topLevel: true,
            next: null,
            parent: null,
            shadow: false,
            x: 0,
            y: 0,
            isMonitored: e.visible,
            targetId: e.targetId
          };
          if (e.opcode === "data_variable") {
            const t = n.fields.VARIABLE;
            t.id = e.id;
            t.variableType = o.SCALAR_TYPE;
          } else if (e.opcode === "data_listcontents") {
            const t = n.fields.LIST;
            t.id = e.id;
            t.variableType = o.LIST_TYPE;
          }
          t.monitorBlocks.createBlock(n);
          const i = N(n.opcode);
          if (i) {
            r.extensionIDs.add(i);
          }
        }
        t.requestAddMonitor(new c(e));
      }(e, t, n, s));
      if (Object.prototype.hasOwnProperty.call(e, "extensionStorage")) {
        t.extensionStorage = e.extensionStorage;
      }
      return n;
    }).then(e => ({
      targets: e,
      extensions: s,
      layerOrder: m
    }));
  },
  deserializeBlocks: F,
  serializeBlocks: x,
  deserializeStandaloneBlocks: e => {
    if ((e = JSON.parse(JSON.stringify(e))).extensionURLs) {
      const t = new Map();
      for (const [n, r] of Object.entries(e.extensionURLs)) {
        t.set(n, r);
      }
      return {
        blocks: e.blocks,
        extensionURLs: t
      };
    }
    return {
      blocks: e,
      extensionURLs: new Map()
    };
  },
  serializeStandaloneBlocks: (e, t) => {
    const n = new Set();
    for (const t of e) {
      const e = N(t.opcode);
      if (e) {
        n.add(e);
      }
    }
    const r = R(n, t);
    if (r) {
      return {
        blocks: e,
        extensionURLs: r
      };
    } else {
      return e;
    }
  },
  getExtensionIdForOpcode: N
};