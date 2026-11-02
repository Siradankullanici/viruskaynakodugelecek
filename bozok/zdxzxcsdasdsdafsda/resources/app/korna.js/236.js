const r = require("./19.js");
const i = require("./17.js");
const s = require("./9.js");
const o = require("./49.js");
const a = require("./7.js");
const c = require("./0.js");
const l = require("./6.js");
const u = require("./74.js");
module.exports = class extends r {
  constructor(e, t) {
    super();
    t ||= new i(e);
    this.runtime = e;
    this.id = a();
    this.blocks = t;
    this.variables = {};
    this.comments = {};
    this._customState = {};
    this._edgeActivatedHatValues = {};
    this.extensionStorage = {};
  }
  onGreenFlag() {}
  getName() {
    return this.id;
  }
  updateEdgeActivatedValue(e, t) {
    const n = this._edgeActivatedHatValues[e];
    this._edgeActivatedHatValues[e] = t;
    return n;
  }
  hasEdgeActivatedValue(e) {
    return Object.prototype.hasOwnProperty.call(this._edgeActivatedHatValues, e);
  }
  clearEdgeActivatedValues() {
    this._edgeActivatedHatValues = {};
  }
  lookupOrCreateVariable(e, t) {
    let n = this.lookupVariableById(e);
    if (n) {
      return n;
    }
    n = this.lookupVariableByNameAndType(t, s.SCALAR_TYPE);
    if (n) {
      return n;
    }
    const r = s.create(e, t, s.SCALAR_TYPE, false);
    this.variables[e] = r;
    return r;
  }
  lookupBroadcastMsg(e, t) {
    let n;
    if (e) {
      n = this.lookupVariableById(e);
    } else if (t) {
      n = this.lookupBroadcastByInputValue(t);
    } else {
      c.error("Cannot find broadcast message if neither id nor name are provided.");
    }
    if (n) {
      if (t && n.name.toLowerCase() !== t.toLowerCase()) {
        c.error(`Found broadcast message with id: ${e}, butits name, ${n.name} did not match expected name ${t}.`);
      }
      if (n.type !== s.BROADCAST_MESSAGE_TYPE) {
        c.error(`Found variable with id: ${e}, but its type ${n.type}did not match expected type ${s.BROADCAST_MESSAGE_TYPE}`);
      }
      return n;
    }
  }
  lookupBroadcastByInputValue(e) {
    const t = this.variables;
    for (const n in t) {
      if (t[n].type === s.BROADCAST_MESSAGE_TYPE && t[n].name.toLowerCase() === e.toLowerCase()) {
        return t[n];
      }
    }
  }
  lookupVariableById(e) {
    if (Object.prototype.hasOwnProperty.call(this.variables, e)) {
      return this.variables[e];
    }
    if (this.runtime && !this.isStage) {
      const t = this.runtime.getTargetForStage();
      if (t && Object.prototype.hasOwnProperty.call(t.variables, e)) {
        return t.variables[e];
      }
    }
  }
  lookupVariableByNameAndType(e, t, n) {
    if (typeof e == "string") {
      if (typeof t != "string") {
        t = s.SCALAR_TYPE;
      }
      n = n || false;
      for (const n in this.variables) {
        const r = this.variables[n];
        if (r.name === e && r.type === t) {
          return r;
        }
      }
      if (!n && this.runtime && !this.isStage) {
        const n = this.runtime.getTargetForStage();
        if (n) {
          for (const r in n.variables) {
            const i = n.variables[r];
            if (i.name === e && i.type === t) {
              return i;
            }
          }
        }
      }
      return null;
    }
  }
  lookupOrCreateList(e, t) {
    let n = this.lookupVariableById(e);
    if (n) {
      return n;
    }
    n = this.lookupVariableByNameAndType(t, s.LIST_TYPE);
    if (n) {
      return n;
    }
    const r = s.create(e, t, s.LIST_TYPE, false);
    this.variables[e] = r;
    return r;
  }
  createVariable(e, t, n, r) {
    if (!Object.prototype.hasOwnProperty.call(this.variables, e)) {
      const i = s.create(e, t, n, false);
      if (r && this.isStage && this.runtime.canAddCloudVariable()) {
        i.isCloud = true;
        this.runtime.addCloudVariable();
        this.runtime.ioDevices.cloud.requestCreateVariable(i);
      }
      this.variables[e] = i;
    }
  }
  createComment(e, t, n, r, i, s, a, l) {
    if (!Object.prototype.hasOwnProperty.call(this.comments, e)) {
      const u = new o(e, n, r, i, s, a, l);
      if (t) {
        u.blockId = t;
        const n = this.blocks.getBlock(t);
        if (n) {
          n.comment = e;
        } else {
          c.warn(`Could not find block with id ${t} associated with commentId: ${e}`);
        }
      }
      this.comments[e] = u;
    }
  }
  renameVariable(e, t) {
    if (Object.prototype.hasOwnProperty.call(this.variables, e)) {
      const n = this.variables[e];
      if (n.id === e) {
        const r = n.name;
        n.name = t;
        if (this.runtime) {
          if (n.isCloud && this.isStage) {
            this.runtime.ioDevices.cloud.requestRenameVariable(r, t);
          }
          if (n.type === s.SCALAR_TYPE) {
            let e = false;
            this.runtime.targets.forEach(n => {
              e = n.blocks.updateSensingOfReference(r, t, this.isStage ? "_stage_" : this.getName()) || e;
            });
            if (e) {
              this.runtime.requestBlocksUpdate();
            }
          }
          const i = this.runtime.monitorBlocks;
          i.changeBlock({
            id: e,
            element: "field",
            name: n.type === s.LIST_TYPE ? "LIST" : "VARIABLE",
            value: e
          }, this.runtime);
          const o = i.getBlock(n.id);
          if (o) {
            this.runtime.requestUpdateMonitor({
              id: e,
              params: i._getBlockParams(o)
            });
          }
        }
      }
    }
  }
  deleteVariable(e) {
    if (Object.prototype.hasOwnProperty.call(this.variables, e)) {
      const t = this.variables[e].name;
      const n = this.variables[e].isCloud;
      delete this.variables[e];
      if (this.runtime) {
        if (n && this.isStage) {
          this.runtime.ioDevices.cloud.requestDeleteVariable(t);
          this.runtime.removeCloudVariable();
        }
        this.runtime.monitorBlocks.deleteBlock(e);
        this.runtime.requestRemoveMonitor(e);
      }
    }
  }
  deleteMonitors() {
    let e;
    this.runtime.requestRemoveMonitorByTargetId(this.id);
    e = this.isStage ? Object.keys(this.variables) : Object.keys(this.runtime.monitorBlocks._blocks).filter(e => this.runtime.monitorBlocks._blocks[e].targetId === this.id);
    for (const t of e) {
      this.runtime.monitorBlocks.deleteBlock(t);
    }
  }
  duplicateVariable(e, t) {
    if (Object.prototype.hasOwnProperty.call(this.variables, e)) {
      const n = this.variables[e];
      const r = s.createSibling(n, t ? e : null, n.name, n.type, n.isCloud);
      if (r.type === s.LIST_TYPE) {
        r.value = n.value.slice(0);
      } else {
        r.value = n.value;
      }
      return r;
    }
    return null;
  }
  duplicateVariables(e) {
    let t;
    if (e) {
      t = e.getAllVariableAndListReferences();
    }
    return Object.keys(this.variables).reduce((n, r) => {
      const i = this.duplicateVariable(r, !e);
      n[i.id] = i;
      if (e && t) {
        const e = t[r];
        if (e) {
          this.mergeVariables(r, i.id, e);
        }
      }
      return n;
    }, {});
  }
  postSpriteInfo() {}
  getCustomState(e) {
    return this._customState[e];
  }
  setCustomState(e, t) {
    this._customState[e] = t;
  }
  dispose() {
    this._customState = {};
    if (this.runtime) {
      this.runtime.removeExecutable(this);
    }
  }
  getAllVariableNamesInScopeByType(e, t) {
    if (typeof e != "string") {
      e = s.SCALAR_TYPE;
    }
    t = t || false;
    const n = Object.values(this.variables).filter(t => t.type === e).map(e => e.name);
    if (t || this.isStage || !this.runtime) {
      return n;
    }
    const r = this.runtime.getTargetForStage().getAllVariableNamesInScopeByType(e);
    return n.concat(r);
  }
  mergeVariables(e, t, n, r) {
    const i = n || this.blocks.getAllVariableAndListReferences()[e];
    u.updateVariableIdentifiers(i, t, r);
  }
  shareLocalVariableToStage(e, t) {
    if (!this.runtime) {
      return;
    }
    const n = this.variables[e];
    if (!n) {
      c.warn("Cannot share a local variable to the stage if it's not local.");
      return;
    }
    const r = this.runtime.getTargetForStage();
    const i = `StageVarFromLocal_${e}`;
    let s = r.lookupVariableById(i);
    if (!s) {
      const e = n.name;
      const t = n.type;
      const r = `Stage: ${e}`;
      s = this.runtime.createNewGlobalVariable(r, i, t);
    }
    this.mergeVariables(e, s.id, t, s.name);
  }
  shareLocalVariableToSprite(e, t, n) {
    if (!this.runtime) {
      return;
    }
    if (this.isStage) {
      return;
    }
    const r = this.variables[e];
    if (!r) {
      c.warn("Tried to call 'shareLocalVariableToSprite' with a non-local variable.");
      return;
    }
    const i = r.name;
    const o = r.type;
    const a = t.lookupVariableByNameAndType(i, o);
    let l;
    if (a) {
      l = a.id;
    } else {
      const e = s.create(null, i, o);
      l = e.id;
      t.variables[l] = e;
    }
    this.mergeVariables(e, l, n);
  }
  resolveVariableSharingConflictsWithTarget(e, t) {
    if (this.isStage) {
      return;
    }
    const n = this.blocks.getAllVariableAndListReferences(e);
    for (const e in n) {
      if (!this.variables[e]) {
        continue;
      }
      const r = n[e];
      if (t.isStage) {
        this.shareLocalVariableToStage(e, r);
      } else {
        this.shareLocalVariableToSprite(e, t, r);
      }
    }
  }
  fixUpVariableReferences() {
    if (!this.runtime) {
      return;
    }
    if (this.isStage) {
      return;
    }
    const e = this.runtime.getTargetForStage();
    if (!e || !e.variables) {
      return;
    }
    const t = (t, n, r) => {
      if (e.lookupVariableByNameAndType(n, r)) {
        const e = l.unusedName(`${this.getName()}: ${n}`, this.getAllVariableNamesInScopeByType(r));
        this.renameVariable(t, e);
        return e;
      }
      return null;
    };
    const n = this.blocks.getAllVariableAndListReferences();
    const r = [];
    if (Object.keys(this.variables).length > 0) {
      for (const e in this.variables) {
        if (Object.prototype.hasOwnProperty.call(this.variables, e)) {
          if (!n[e]) {
            r.push(e);
          }
        }
      }
    }
    const i = Object.create(null);
    const s = Object.create(null);
    const o = {};
    const a = e => {
      const t = o[e];
      return t || (o[e] = this.runtime.getAllVarNamesOfType(e), o[e]);
    };
    for (const r in n) {
      const o = n[r][0];
      const c = o.referencingField.value;
      const u = o.type;
      if (this.lookupVariableById(r)) {
        if (Object.prototype.hasOwnProperty.call(this.variables, r)) {
          const e = t(r, c, u);
          if (e) {
            n[r].map(t => {
              t.referencingField.value = e;
              return t;
            });
          }
        }
      } else {
        const t = e.lookupVariableByNameAndType(c, u);
        if (t) {
          i[r] ||= t.id;
        } else {
          const t = a(u);
          const n = l.unusedName(c, t);
          e.createVariable(r, n, u);
          s[r] ||= n;
        }
      }
    }
    for (const e in r) {
      const n = r[e];
      t(n, this.variables[n].name, this.variables[n].type);
    }
    for (const e in i) {
      const t = i[e];
      const r = n[e];
      this.mergeVariables(e, t, r);
    }
    for (const e in s) {
      const t = s[e];
      n[e].map(e => {
        e.referencingField.value = t;
        return e;
      });
    }
  }
};