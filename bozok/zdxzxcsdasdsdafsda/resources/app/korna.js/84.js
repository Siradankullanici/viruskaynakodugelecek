const r = require("./17.js");
const i = require("./48.js");
const s = require("./50.js");
const o = require("./23.js");
const a = require("./0.js");
const c = require("./7.js");
const l = require("./6.js");
const u = require("./4.js");
const h = require("./262.js");
const d = require("./49.js");
const p = require("./9.js");
const f = require("./24.js");
const m = require("./13.js");
const g = require("./72.js");
const {
  loadCostume: b
} = require("./35.js");
const {
  loadSound: y
} = require("./34.js");
const {
  deserializeCostume: E,
  deserializeSound: T
} = require("./83.js");
const v = ["argument", "control", "data", "event", "looks", "math", "motion", "operator", "procedures", "sensing", "sound"];
const A = /\u001f|\./;
const w = e => {
  const [t, n] = e.split(A);
  const r = g.generateExtensionId(t);
  return `${r}_${n}`;
};
const S = function (e) {
  const t = [{}];
  let n = 0;
  const r = e.split(/(?=[^\\]%[nbs])/);
  for (let e = 0; e < r.length; e++) {
    const i = r[e].trim();
    if (i.substring(0, 1) === "%") {
      const e = i.substring(1, 2);
      const r = {
        type: "input",
        inputName: "input" + n++
      };
      if (e === "n") {
        r.inputOp = "math_number";
      } else if (e === "s") {
        r.inputOp = "text";
      } else if (e === "b") {
        r.inputOp = "boolean";
      }
      t.push(r);
    }
  }
  return t;
};
const k = function (e) {
  return S(e).map(e => e.inputName).filter(e => e);
};
const I = function (e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t.push(r);
    if (r.children) {
      t = t.concat(I(r.children));
    }
    delete r.children;
  }
  return t;
};
const O = function (e, t, n, r, i, s, o) {
  const a = [];
  let c = null;
  for (let l = 0; l < e.length; l++) {
    const u = e[l];
    const h = L(u, t, n, r, i, s, o);
    const d = h[0];
    o = h[1];
    if (d) {
      if (c) {
        d.parent = c.id;
        c.next = d.id;
      }
      c = d;
      a.push(d);
    }
  }
  return [a, o];
};
const N = function () {
  let e = {};
  const t = (e, t, n) => `${e}-${l.replaceUnsafeChars(t)}-${n}`;
  return function (n, r) {
    if (r) {
      e = {};
    }
    return function (i, s) {
      if (r) {
        e[`${i}-${s}`] = t(n, i, s);
        return e[`${i}-${s}`];
      } else if (e[`${i}-${s}`]) {
        return e[`${i}-${s}`];
      } else {
        return t(n, i, s);
      }
    };
  };
}();
const R = function () {
  let e = {};
  const t = [];
  const n = c();
  return function (r) {
    if (r) {
      e = {};
    }
    return {
      broadcastMsgMapUpdater: function (r, i) {
        if ((r = r.toLowerCase()) === "") {
          r = n;
        }
        e[r] = `broadcastMsgId-${l.replaceUnsafeChars(r)}`;
        t.push(i);
        return e[r];
      },
      globalBroadcastMsgs: e,
      allBroadcastFields: t,
      emptyMsgName: n
    };
  };
}();
const x = (e, t, n, r) => {
  if (!h[e.cmd]) {
    a.warn(`Could not find monitor block with opcode: ${e.cmd}`);
    return;
  }
  const i = h[e.cmd].opcode;
  const s = i.indexOf("_");
  const o = i.substring(0, s);
  if (o === "videoSensing") {
    return;
  }
  if (v.indexOf(o) === -1 && o !== "" && !r.extensionIDs.has(o) && !e.visible) {
    return;
  }
  let c = null;
  if (!Object.prototype.hasOwnProperty.call(e, "target")) {
    for (let t = 0; t < n.length; t++) {
      const r = n[t];
      if (Object.keys(r.variables).filter(t => {
        const n = r.variables[t];
        return n.type === p.LIST_TYPE && n.name === e.listName;
      }).length > 0) {
        c = r;
        e.target = r.getName();
      }
    }
  }
  c = c || n.filter(t => t.getName() === e.target)[0];
  if (!c) {
    throw new Error("Cannot create monitor for target that cannot be found by name");
  }
  const l = N(c.id, false);
  const [u, d] = L([e.cmd, e.param], null, l, r, {}, null, null);
  if (e.cmd === "getVar:") {
    u.id = l(e.param, p.SCALAR_TYPE);
  } else if (e.cmd === "contentsOfList:") {
    u.id = l(e.param, p.LIST_TYPE);
  } else if (Object.prototype.hasOwnProperty.call(t.monitorBlockInfo, u.opcode)) {
    u.id = t.monitorBlockInfo[u.opcode].getId(c.id, u.fields);
  } else {
    u.id = u.opcode;
  }
  u.targetId = c.isStage ? null : c.id;
  u.isMonitored = e.visible;
  const m = t.monitorBlocks._blocks[u.id];
  if (m) {
    m.isMonitored = e.visible;
    m.targetId = u.targetId;
  } else {
    const e = I([u]);
    for (let n = 0; n < e.length; n++) {
      t.monitorBlocks.createBlock(e[n]);
    }
  }
  switch (e.mode) {
    case 1:
      e.mode = "default";
      break;
    case 2:
      e.mode = "large";
      break;
    case 3:
      e.mode = "slider";
  }
  t.requestAddMonitor(new f({
    id: u.id,
    targetId: u.targetId,
    spriteName: u.targetId ? e.target : null,
    opcode: u.opcode,
    params: t.monitorBlocks._getBlockParams(u),
    value: "",
    mode: e.mode,
    sliderMin: e.sliderMin,
    sliderMax: e.sliderMax,
    isDiscrete: e.isDiscrete,
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    visible: e.visible
  }));
};
const M = function (e, t, n, r) {
  if (!Object.prototype.hasOwnProperty.call(e, "objName")) {
    return null;
  }
  const i = {
    costumePromises: [],
    soundPromises: [],
    soundBank: t.audioEngine && t.audioEngine.createBank(),
    children: []
  };
  const s = i.costumePromises;
  if (Object.prototype.hasOwnProperty.call(e, "costumes")) {
    for (let i = 0; i < e.costumes.length; i++) {
      const o = e.costumes[i];
      const a = o.bitmapResolution || 1;
      const c = {
        name: o.costumeName,
        bitmapResolution: a,
        rotationCenterX: n ? a * 240 : o.rotationCenterX,
        rotationCenterY: n ? a * 180 : o.rotationCenterY,
        md5: o.baseLayerMD5,
        skinId: null
      };
      const u = o.baseLayerMD5;
      const h = l.splitFirst(u, ".");
      const d = h[0];
      let p;
      if (h.length === 2 && h[1]) {
        p = h[1];
      } else {
        p = "png";
        c.md5 = `${c.md5}.${p}`;
      }
      c.dataFormat = p;
      c.assetId = d;
      if (o.textLayerMD5) {
        c.textLayerMD5 = l.splitFirst(o.textLayerMD5, ".")[0];
      }
      const f = `${o.baseLayerID}.${p}`;
      const m = o.textLayerID ? `${o.textLayerID}.png` : null;
      s.push(t.wrapAssetRequest(() => E(c, t, r, f, m).then(() => b(c.md5, c, t, 2))));
    }
  }
  const {
    soundBank: o,
    soundPromises: a
  } = i;
  if (Object.prototype.hasOwnProperty.call(e, "sounds")) {
    for (let n = 0; n < e.sounds.length; n++) {
      const i = e.sounds[n];
      const s = {
        name: i.soundName,
        format: i.format,
        rate: i.rate,
        sampleCount: i.sampleCount,
        md5: i.md5,
        data: null
      };
      const c = i.md5;
      const u = l.splitFirst(c, ".");
      const h = u[0];
      const d = u[1].toLowerCase();
      s.dataFormat = d;
      s.assetId = h;
      const p = `${i.soundID}.${d}`;
      a.push(t.wrapAssetRequest(() => T(s, t, r, p).then(() => y(s, t, o))));
    }
  }
  const c = i.children;
  if (e.children) {
    for (let n = 0; n < e.children.length; n++) {
      c.push(M(e.children[n], t, false, r));
    }
  }
  return i;
};
const C = function (e, t, n, o, a, c, l) {
  if (!Object.prototype.hasOwnProperty.call(e, "objName")) {
    if (Object.prototype.hasOwnProperty.call(e, "listName")) {
      e.cmd = "contentsOfList:";
      e.param = e.listName;
      e.mode = "list";
    }
    e.deferredMonitor = true;
    return Promise.resolve(e);
  }
  const h = new r(t);
  const f = new s(h, t);
  if (Object.prototype.hasOwnProperty.call(e, "objName")) {
    if (o && e.objName !== "Stage") {
      for (const t of e.children) {
        if (!Object.prototype.hasOwnProperty.call(t, "objName") && t.target === e.objName) {
          t.target = "Stage";
        }
      }
      e.objName = "Stage";
    }
    f.name = e.objName;
  }
  const b = c.costumePromises;
  const {
    soundBank: y,
    soundPromises: E
  } = c;
  const T = f.createClone(o ? m.BACKGROUND_LAYER : m.SPRITE_LAYER);
  const v = N(T.id, o);
  const A = R(o);
  const w = A.broadcastMsgMapUpdater;
  if (Object.prototype.hasOwnProperty.call(e, "variables")) {
    for (let n = 0; n < e.variables.length; n++) {
      const r = e.variables[n];
      const i = r.isPersistent && o && t.canAddCloudVariable();
      const s = p.create(v(r.name, p.SCALAR_TYPE), r.name, p.SCALAR_TYPE, i);
      if (i) {
        t.addCloudVariable();
      }
      s.value = r.value;
      T.variables[s.id] = s;
    }
  }
  const S = {};
  if (Object.prototype.hasOwnProperty.call(e, "scriptComments")) {
    e.scriptComments.map(e => {
      const [t, n, r, i, s, o, a] = e;
      const c = e[5] >= 0;
      const l = new d(null, a, c ? null : t * 1.5, c ? null : n * 2.2, r * 1.5, i * 2.2, !s);
      if (c) {
        l.blockId = o;
        if (Object.prototype.hasOwnProperty.call(S, o)) {
          S[o].push(l);
        } else {
          S[o] = [l];
        }
      }
      return l;
    }).forEach(e => {
      T.comments[e.id] = e;
    });
  }
  if (Object.prototype.hasOwnProperty.call(e, "scripts")) {
    (function (e, t, n, r, i, s) {
      let o = 0;
      for (let a = 0; a < e.length; a++) {
        const c = e[a];
        const l = c[0];
        const u = c[1];
        const h = c[2];
        const d = {};
        const [p, f] = O(h, n, r, i, d, s, o);
        o = f;
        if (p[0]) {
          p[0].x = l * 1.5;
          p[0].y = u * 2.2;
          p[0].topLevel = true;
          p[0].parent = null;
        }
        const m = I(p);
        for (let e = 0; e < m.length; e++) {
          t.createBlock(m[e]);
        }
      }
    })(e.scripts, h, w, v, n, S);
  }
  for (const e in S) {
    S[e].forEach(e => {
      if (typeof e.blockId == "number") {
        e.blockId = null;
      }
    });
  }
  h.updateTargetSpecificBlocks(o);
  if (Object.prototype.hasOwnProperty.call(e, "lists")) {
    for (let t = 0; t < e.lists.length; t++) {
      const n = e.lists[t];
      const r = p.create(v(n.listName, p.LIST_TYPE), n.listName, p.LIST_TYPE, false);
      r.value = n.contents;
      T.variables[r.id] = r;
    }
  }
  if (Object.prototype.hasOwnProperty.call(e, "scratchX")) {
    T.x = e.scratchX;
  }
  if (Object.prototype.hasOwnProperty.call(e, "scratchY")) {
    T.y = e.scratchY;
  }
  if (Object.prototype.hasOwnProperty.call(e, "direction")) {
    T.direction = u.wrapClamp(e.direction, -179, 180);
  }
  if (Object.prototype.hasOwnProperty.call(e, "isDraggable")) {
    T.draggable = e.isDraggable;
  }
  if (Object.prototype.hasOwnProperty.call(e, "scale")) {
    T.size = e.scale * 100;
  }
  if (Object.prototype.hasOwnProperty.call(e, "visible")) {
    T.visible = e.visible;
  }
  if (Object.prototype.hasOwnProperty.call(e, "currentCostumeIndex")) {
    T.currentCostume = u.clamp(Math.floor(e.currentCostumeIndex), 0, e.costumes.length - 1);
  }
  if (Object.prototype.hasOwnProperty.call(e, "rotationStyle")) {
    if (e.rotationStyle === "none") {
      T.rotationStyle = i.ROTATION_STYLE_NONE;
    } else if (e.rotationStyle === "leftRight") {
      T.rotationStyle = i.ROTATION_STYLE_LEFT_RIGHT;
    } else if (e.rotationStyle === "normal") {
      T.rotationStyle = i.ROTATION_STYLE_ALL_AROUND;
    }
  }
  if (Object.prototype.hasOwnProperty.call(e, "tempoBPM")) {
    T.tempo = e.tempoBPM;
  }
  if (Object.prototype.hasOwnProperty.call(e, "videoAlpha")) {
    T.videoTransparency = 100 - e.videoAlpha * 100;
  }
  if (Object.prototype.hasOwnProperty.call(e, "info") && Object.prototype.hasOwnProperty.call(e.info, "videoOn")) {
    if (e.info.videoOn) {
      T.videoState = i.VIDEO_STATE.ON;
    } else {
      T.videoState = i.VIDEO_STATE.OFF;
    }
  }
  if (Object.prototype.hasOwnProperty.call(e, "indexInLibrary")) {
    l.set(T, e.indexInLibrary);
  }
  T.isStage = o;
  Promise.all(b).then(e => {
    f.costumes = e;
  });
  Promise.all(E).then(e => {
    f.sounds = e;
    f.soundBank = y || null;
  });
  const k = [];
  if (e.children) {
    for (let r = 0; r < e.children.length; r++) {
      k.push(C(e.children[r], t, n, false, a, c.children[r], l));
    }
  }
  if (o) {
    const t = e.info && e.info.savedExtensions;
    if (Array.isArray(t)) {
      for (const e of t) {
        const t = g.generateExtensionId(e.extensionName);
        const r = e.javascriptURL;
        n.extensionURLs.set(t, r);
      }
    }
  }
  return Promise.all(b.concat(E)).then(() => Promise.all(k).then(e => {
    if (T.isStage) {
      const e = A.globalBroadcastMsgs;
      const t = A.allBroadcastFields;
      const n = A.emptyMsgName;
      if (e[n]) {
        let r = 1;
        while (e[`message${r}`]) {
          r += 1;
        }
        const i = `message${r}`;
        e[i] = e[n];
        delete e[n];
        for (let e = 0; e < t.length; e++) {
          if (t[e].value === "") {
            t[e].value = i;
          }
        }
      }
      for (const t in e) {
        const n = e[t];
        const r = p.create(n, t, p.BROADCAST_MESSAGE_TYPE, false);
        T.variables[r.id] = r;
      }
    }
    let r = [T];
    const i = [];
    for (let t = 0; t < e.length; t++) {
      if (e[t]) {
        if (e[t].deferredMonitor) {
          i.push(e[t]);
        } else {
          r = r.concat(e[t]);
        }
      }
    }
    for (let e = 0; e < i.length; e++) {
      x(i[e], t, r, n);
    }
    return r;
  }));
};
const P = function (e) {
  const t = e[0];
  const n = t && h[t];
  if (n) {
    if (typeof n == "function") {
      return n(e);
    } else {
      return n;
    }
  } else if (t && (e => A.test(e))(t)) {
    return (e => {
      const t = e[0];
      const n = e.length - 1;
      const r = [];
      for (let e = 0; e < n; e++) {
        r.push({
          type: "input",
          inputOp: "text",
          inputName: g.argumentIndexToId(e)
        });
      }
      return {
        opcode: w(t),
        argMap: r
      };
    })(e);
  } else {
    a.warn(`Couldn't find SB2 block: ${t}`);
    return null;
  }
};
const L = function (e, t, n, r, i, s, l) {
  const u = s && typeof l == "number" && !isNaN(l) ? s[l] : null;
  const h = P(e);
  if (!h) {
    if (u) {
      u.forEach(e => {
        e.blockId = null;
        e.x = e.y = 0;
      });
    }
    return [null, l + 1];
  }
  const d = e[0];
  const f = h.opcode.indexOf("_");
  const m = h.opcode.substring(0, f);
  if (v.indexOf(m) === -1 && m !== "") {
    r.extensionIDs.add(m);
  }
  const g = {
    id: c(),
    opcode: h.opcode,
    inputs: {},
    fields: {},
    next: null,
    shadow: false,
    children: []
  };
  if (u) {
    g.comment = u[u.length - 1].id;
    u.forEach(e => {
      if (e.id === g.comment) {
        e.blockId = g.id;
      } else {
        e.blockId = null;
        e.x = e.y = 0;
      }
    });
  }
  l++;
  const b = i.expectedArg;
  if (d === "call") {
    h.argMap = S(e[1]);
  }
  for (let u = 0; u < h.argMap.length; u++) {
    const d = h.argMap[u];
    const f = e[u + 1];
    let m = false;
    if (d.type === "input") {
      const e = c();
      g.inputs[d.inputName] = {
        name: d.inputName,
        block: null,
        shadow: null
      };
      if (typeof f == "object" && f) {
        let e;
        i.expectedArg = d;
        if (typeof f[0] == "object" && f[0]) {
          [e, l] = O(f, t, n, r, i, s, l);
        } else {
          const o = L(f, t, n, r, i, s, l);
          e = o[0] ? [o[0]] : [];
          l = o[1];
        }
        i.expectedArg = b;
        if (e.length > 0) {
          let t = null;
          for (let n = 0; n < e.length; n++) {
            e[n].parent = n === 0 ? g.id : t;
            t = e[n].id;
          }
          g.inputs[d.inputName].block = e[0].id;
          g.children = g.children.concat(e);
        }
        m = true;
      }
      if (!d.inputOp) {
        a.warn(`Unknown input operation for input ${d.inputName} of opcode ${g.opcode}.`);
        continue;
      }
      if (d.inputOp === "boolean" || d.inputOp === "substack") {
        continue;
      }
      let u = f;
      let h = d.inputName;
      if (d.inputOp === "math_number" || d.inputOp === "math_whole_number" || d.inputOp === "math_positive_number" || d.inputOp === "math_integer" || d.inputOp === "math_angle") {
        h = "NUM";
        if (m) {
          u = 10;
        }
      } else if (d.inputOp === "text") {
        h = "TEXT";
        if (m) {
          u = "";
        }
      } else if (d.inputOp === "colour_picker") {
        u = o.decimalToHex(f);
        h = "COLOUR";
        if (m) {
          u = "#990000";
        }
      } else if (d.inputOp === "event_broadcast_menu") {
        h = "BROADCAST_OPTION";
        if (m) {
          u = "";
        }
      } else if (d.inputOp === "sensing_of_object_menu") {
        if (m || u === "Stage") {
          u = "_stage_";
        }
      } else if (d.inputOp === "note") {
        if (m) {
          u = 60;
        }
      } else if (d.inputOp === "music.menu.DRUM" || d.inputOp === "music.menu.INSTRUMENT") {
        if (m) {
          u = 1;
        }
      } else if (d.inputOp === "videoSensing.menu.ATTRIBUTE") {
        if (m) {
          u = "motion";
        }
      } else if (d.inputOp === "videoSensing.menu.SUBJECT") {
        if (m) {
          u = "this sprite";
        }
      } else if (d.inputOp === "videoSensing.menu.VIDEO_STATE") {
        if (m) {
          u = "on";
        }
      } else if (m) {
        u = "";
      }
      const p = {
        [h]: {
          name: h,
          value: u
        }
      };
      if (d.inputOp === "event_broadcast_menu") {
        const e = t(u, p[h]);
        p[h].id = e;
        p[h].variableType = d.variableType;
      }
      g.children.push({
        id: e,
        opcode: d.inputOp,
        inputs: {},
        fields: p,
        next: null,
        topLevel: false,
        parent: g.id,
        shadow: true
      });
      g.inputs[d.inputName].shadow = e;
      g.inputs[d.inputName].block ||= e;
    } else if (d.type === "field") {
      g.fields[d.fieldName] = {
        name: d.fieldName,
        value: f
      };
      if (d.fieldName === "CURRENTMENU") {
        g.fields[d.fieldName].value = f.toUpperCase();
        if (f === "day of week") {
          g.fields[d.fieldName].value = "DAYOFWEEK";
        }
      }
      if (d.fieldName === "VARIABLE") {
        g.fields[d.fieldName].id = n(f, p.SCALAR_TYPE);
      } else if (d.fieldName === "LIST") {
        g.fields[d.fieldName].id = n(f, p.LIST_TYPE);
      } else if (d.fieldName === "BROADCAST_OPTION") {
        const e = t(f, g.fields[d.fieldName]);
        g.fields[d.fieldName].id = e;
      }
      const e = d.variableType;
      if (typeof e == "string") {
        g.fields[d.fieldName].variableType = e;
      }
    }
  }
  switch (d) {
    case "comeToFront":
      g.fields.FRONT_BACK = {
        name: "FRONT_BACK",
        value: "front"
      };
      break;
    case "goBackByLayers:":
      g.fields.FORWARD_BACKWARD = {
        name: "FORWARD_BACKWARD",
        value: "backward"
      };
      break;
    case "backgroundIndex":
    case "costumeIndex":
      g.fields.NUMBER_NAME = {
        name: "NUMBER_NAME",
        value: "number"
      };
      break;
    case "sceneName":
    case "costumeName":
      g.fields.NUMBER_NAME = {
        name: "NUMBER_NAME",
        value: "name"
      };
  }
  if (d === "stopScripts") {
    if (e[1] === "other scripts in sprite" || e[1] === "other scripts in stage") {
      g.mutation = {
        tagName: "mutation",
        hasnext: "true",
        children: []
      };
    }
  } else if (d === "procDef") {
    const t = e.slice(1);
    const n = c();
    const r = "custom_block";
    g.inputs[r] = {
      name: r,
      block: n,
      shadow: n
    };
    g.children = [{
      id: n,
      opcode: "procedures_prototype",
      inputs: {},
      fields: {},
      next: null,
      shadow: true,
      children: [],
      mutation: {
        tagName: "mutation",
        proccode: t[0],
        argumentnames: JSON.stringify(t[1]),
        argumentids: JSON.stringify(k(t[0])),
        argumentdefaults: JSON.stringify(t[2]),
        warp: t[3],
        children: []
      }
    }];
  } else if (d === "call") {
    g.mutation = {
      tagName: "mutation",
      children: [],
      proccode: e[1],
      argumentids: JSON.stringify(k(e[1]))
    };
  } else if (d === "getParam") {
    let t = e[2];
    if (b && b.inputOp === "boolean" && t !== "b") {
      t = "b";
    }
    switch (t) {
      case "r":
        g.opcode = "argument_reporter_string_number";
        break;
      case "b":
        g.opcode = "argument_reporter_boolean";
    }
  }
  return [g, l];
};
module.exports = {
  deserialize: function (e, t, n, r) {
    const i = {
      extensionIDs: new Set(),
      extensionURLs: new Map()
    };
    const s = new Map();
    return Promise.resolve(M(e, t, !n, r)).then(e => Promise.resolve(e)).then(o => C(e, t, i, !n, r, o, s)).then(e => function (e, t) {
      const n = e.map((e, t) => ({
        target: e,
        layerOrder: t
      })).sort((e, n) => t.get(e.target) - t.get(n.target));
      return {
        targets: n.map(e => e.target),
        layerOrder: n.map(e => e.layerOrder)
      };
    }(e, s)).then(e => {
      let {
        targets: t,
        layerOrder: n
      } = e;
      return {
        targets: t,
        extensions: i,
        layerOrder: n
      };
    });
  }
};