const r = require("./184.js");
const i = require("./64.js");
const s = require("./31.js");
const o = require("./24.js");
const a = require("./12.js");
const c = require("./66.js");
const l = require("./67.js");
const u = require("./0.js");
const h = require("./9.js");
const d = require("./44.js");
class p {
  constructor(e, t) {
    this.runtime = e;
    this._blocks = {};
    this._scripts = [];
    Object.defineProperty(this, "_cache", {
      writable: true,
      enumerable: false
    });
    this._cache = {
      inputs: {},
      procedureParamNames: {},
      procedureDefinitions: {},
      _executeCached: {},
      _monitored: null,
      scripts: {},
      compiledScripts: {},
      compiledProcedures: {},
      proceduresPopulated: false
    };
    this.forceNoGlow = t || false;
  }
  getCachedCompileResult(e) {
    if (Object.prototype.hasOwnProperty.call(this._cache.compiledScripts, e)) {
      return this._cache.compiledScripts[e];
    } else {
      return null;
    }
  }
  cacheCompileResult(e, t) {
    this._cache.compiledScripts[e] = {
      success: true,
      value: t
    };
  }
  cacheCompileError(e, t) {
    this._cache.compiledScripts[e] = {
      success: false,
      value: t
    };
  }
  static get BRANCH_INPUT_PREFIX() {
    return "SUBSTACK";
  }
  getBlock(e) {
    return this._blocks[e];
  }
  getScripts() {
    return this._scripts;
  }
  getNextBlock(e) {
    const t = this._blocks[e];
    if (t === undefined) {
      return null;
    } else {
      return t.next;
    }
  }
  getBranch(e, t) {
    const n = this._blocks[e];
    if (n === undefined) {
      return null;
    }
    t ||= 1;
    let r = p.BRANCH_INPUT_PREFIX;
    if (t > 1) {
      r += t;
    }
    const i = n.inputs[r];
    if (i === undefined) {
      return null;
    } else {
      return i.block;
    }
  }
  getOpcode(e) {
    if (e === undefined) {
      return null;
    } else {
      return e.opcode;
    }
  }
  getFields(e) {
    if (e === undefined) {
      return null;
    } else {
      return e.fields;
    }
  }
  getInputs(e) {
    if (e === undefined) {
      return null;
    }
    let t = this._cache.inputs[e.id];
    if (t !== undefined) {
      return t;
    }
    t = {};
    for (const n in e.inputs) {
      if (n.substring(0, p.BRANCH_INPUT_PREFIX.length) !== p.BRANCH_INPUT_PREFIX) {
        t[n] = e.inputs[n];
      }
    }
    this._cache.inputs[e.id] = t;
    return t;
  }
  getMutation(e) {
    if (e === undefined) {
      return null;
    } else {
      return e.mutation;
    }
  }
  getTopLevelScript(e) {
    let t = this._blocks[e];
    if (t === undefined) {
      return null;
    }
    while (t.parent !== null) {
      t = this._blocks[t.parent];
    }
    return t.id;
  }
  getProcedureDefinition(e) {
    const t = this._cache.procedureDefinitions[e];
    if (t !== undefined) {
      return t;
    }
    for (const t in this._blocks) {
      if (!Object.prototype.hasOwnProperty.call(this._blocks, t)) {
        continue;
      }
      const n = this._blocks[t];
      if (n.opcode === "procedures_definition") {
        const r = this._getCustomBlockInternal(n);
        if (r && r.mutation.proccode === e) {
          this._cache.procedureDefinitions[e] = t;
          return t;
        }
      }
    }
    this._cache.procedureDefinitions[e] = null;
    return null;
  }
  getProcedureParamNamesAndIds(e) {
    return this.getProcedureParamNamesIdsAndDefaults(e).slice(0, 2);
  }
  getProcedureParamNamesIdsAndDefaults(e) {
    const t = this._cache.procedureParamNames[e];
    if (t !== undefined) {
      return t;
    }
    for (const t in this._blocks) {
      if (!Object.prototype.hasOwnProperty.call(this._blocks, t)) {
        continue;
      }
      const n = this._blocks[t];
      if (n.opcode === "procedures_prototype" && n.mutation.proccode === e) {
        const t = JSON.parse(n.mutation.argumentnames);
        const r = JSON.parse(n.mutation.argumentids);
        const i = JSON.parse(n.mutation.argumentdefaults);
        this._cache.procedureParamNames[e] = [t, r, i];
        return this._cache.procedureParamNames[e];
      }
    }
    const n = this.runtime.getAddonBlock(e);
    if (n) {
      this._cache.procedureParamNames[e] = n.namesIdsDefaults;
      return n.namesIdsDefaults;
    } else {
      this._cache.procedureParamNames[e] = null;
      return null;
    }
  }
  populateProcedureCache() {
    if (!this._cache.proceduresPopulated) {
      for (const e in this._blocks) {
        if (!Object.prototype.hasOwnProperty.call(this._blocks, e)) {
          continue;
        }
        const t = this._blocks[e];
        if (t.opcode !== "procedures_prototype") {
          if (t.opcode === "procedures_definition") {
            const n = this._getCustomBlockInternal(t);
            if (n) {
              const t = n.mutation.proccode;
              this._cache.procedureDefinitions[t] ||= e;
              continue;
            }
          }
        } else {
          const e = t.mutation.proccode;
          if (!this._cache.procedureParamNames[e]) {
            const n = JSON.parse(t.mutation.argumentnames);
            const r = JSON.parse(t.mutation.argumentids);
            const i = JSON.parse(t.mutation.argumentdefaults);
            this._cache.procedureParamNames[e] = [n, r, i];
          }
        }
      }
      this._cache.proceduresPopulated = true;
    }
  }
  duplicate() {
    const e = new p(this.runtime, this.forceNoGlow);
    e._blocks = a.simple(this._blocks);
    e._scripts = a.simple(this._scripts);
    return e;
  }
  blocklyListen(e) {
    if (typeof e != "object") {
      return;
    }
    if (typeof e.blockId != "string" && typeof e.varId != "string" && typeof e.commentId != "string") {
      return;
    }
    const t = this.runtime.getTargetForStage();
    const n = this.runtime.getEditingTarget();
    if (e.element !== "stackclick") {
      switch (e.type) {
        case "create":
          {
            const t = r(e);
            for (let e = 0; e < t.length; e++) {
              this.createBlock(t[e]);
            }
            break;
          }
        case "change":
          this.changeBlock({
            id: e.blockId,
            element: e.element,
            name: e.name,
            value: e.newValue
          });
          break;
        case "move":
          this.moveBlock({
            id: e.blockId,
            oldParent: e.oldParentId,
            oldInput: e.oldInputName,
            newParent: e.newParentId,
            newInput: e.newInputName,
            newCoordinate: e.newCoordinate
          });
          break;
        case "dragOutside":
          this.runtime.emitBlockDragUpdate(e.isOutside);
          break;
        case "endDrag":
          this.runtime.emitBlockDragUpdate(false);
          if (e.isOutside) {
            const t = r(e);
            this.runtime.emitBlockEndDrag(t, e.blockId);
          }
          break;
        case "delete":
          if (!Object.prototype.hasOwnProperty.call(this._blocks, e.blockId) || this._blocks[e.blockId].shadow) {
            return;
          }
          if (this._blocks[e.blockId].topLevel) {
            this.runtime.quietGlow(e.blockId);
          }
          this.deleteBlock(e.blockId);
          break;
        case "var_create":
          this.resetCache();
          if (e.isLocal && n && !n.isStage && !e.isCloud) {
            if (!n.lookupVariableById(e.varId)) {
              n.createVariable(e.varId, e.varName, e.varType);
              this.emitProjectChanged();
            }
          } else {
            if (t.lookupVariableById(e.varId)) {
              return;
            }
            const n = this.runtime.targets.filter(e => e.isOriginal);
            for (const t of n) {
              if (t.lookupVariableByNameAndType(e.varName, e.varType, true)) {
                return;
              }
            }
            t.createVariable(e.varId, e.varName, e.varType, e.isCloud);
            this.emitProjectChanged();
          }
          break;
        case "var_rename":
          if (n && Object.prototype.hasOwnProperty.call(n.variables, e.varId)) {
            n.renameVariable(e.varId, e.newName);
            n.blocks.updateBlocksAfterVarRename(e.varId, e.newName);
          } else {
            t.renameVariable(e.varId, e.newName);
            const n = this.runtime.targets;
            for (let t = 0; t < n.length; t++) {
              n[t].blocks.updateBlocksAfterVarRename(e.varId, e.newName);
            }
          }
          this.emitProjectChanged();
          break;
        case "var_delete":
          this.resetCache();
          (n && Object.prototype.hasOwnProperty.call(n.variables, e.varId) ? n : t).deleteVariable(e.varId);
          this.emitProjectChanged();
          break;
        case "comment_create":
          this.resetCache();
          if (this.runtime.getEditingTarget()) {
            const t = this.runtime.getEditingTarget();
            t.createComment(e.commentId, e.blockId, e.text, e.xy.x, e.xy.y, e.width, e.height, e.minimized);
            if (t.comments[e.commentId].x === null && t.comments[e.commentId].y === null) {
              t.comments[e.commentId].x = e.xy.x;
              t.comments[e.commentId].y = e.xy.y;
            }
          }
          this.emitProjectChanged();
          break;
        case "comment_change":
          this.resetCache();
          if (this.runtime.getEditingTarget()) {
            const t = this.runtime.getEditingTarget();
            if (!Object.prototype.hasOwnProperty.call(t.comments, e.commentId)) {
              u.warn(`Cannot change comment with id ${e.commentId} because it does not exist.`);
              return;
            }
            const n = t.comments[e.commentId];
            const r = e.newContents_;
            if (Object.prototype.hasOwnProperty.call(r, "minimized")) {
              n.minimized = r.minimized;
            }
            if (Object.prototype.hasOwnProperty.call(r, "width") && Object.prototype.hasOwnProperty.call(r, "height")) {
              n.width = r.width;
              n.height = r.height;
            }
            if (Object.prototype.hasOwnProperty.call(r, "text")) {
              n.text = r.text;
            }
            this.emitProjectChanged();
          }
          break;
        case "comment_move":
          if (this.runtime.getEditingTarget()) {
            const t = this.runtime.getEditingTarget();
            if (t && !Object.prototype.hasOwnProperty.call(t.comments, e.commentId)) {
              u.warn(`Cannot change comment with id ${e.commentId} because it does not exist.`);
              return;
            }
            const n = t.comments[e.commentId];
            const r = e.newCoordinate_;
            n.x = r.x;
            n.y = r.y;
            this.emitProjectChanged();
          }
          break;
        case "comment_delete":
          this.resetCache();
          if (this.runtime.getEditingTarget()) {
            const t = this.runtime.getEditingTarget();
            if (!Object.prototype.hasOwnProperty.call(t.comments, e.commentId)) {
              return;
            }
            delete t.comments[e.commentId];
            if (e.blockId) {
              const n = t.blocks.getBlock(e.blockId);
              if (!n) {
                u.warn(`Could not find block referenced by comment with id: ${e.commentId}`);
                return;
              }
              delete n.comment;
            }
            this.emitProjectChanged();
          }
      }
    } else {
      this.runtime.toggleScript(e.blockId, {
        stackClick: true
      });
    }
  }
  resetCache() {
    this._cache.inputs = {};
    this._cache.procedureParamNames = {};
    this._cache.procedureDefinitions = {};
    this._cache._executeCached = {};
    this._cache._monitored = null;
    this._cache.scripts = {};
    this._cache.compiledScripts = {};
    this._cache.compiledProcedures = {};
    this._cache.proceduresPopulated = false;
  }
  emitProjectChanged() {
    if (!this.forceNoGlow) {
      this.runtime.emitProjectChanged();
    }
  }
  createBlock(e) {
    if (!Object.prototype.hasOwnProperty.call(this._blocks, e.id)) {
      if (e.id !== "__proto__") {
        this._blocks[e.id] = e;
        if (e.topLevel) {
          this._addScript(e.id);
        }
        this.resetCache();
        this.emitProjectChanged();
      }
    }
  }
  changeBlock(e) {
    if (["field", "mutation", "checkbox"].indexOf(e.element) === -1) {
      return;
    }
    let t = this._blocks[e.id];
    if (t !== undefined) {
      switch (e.element) {
        case "field":
          if (!t.fields[e.name]) {
            return;
          }
          if (e.name === "VARIABLE" || e.name === "LIST" || e.name === "BROADCAST_OPTION") {
            const n = this.runtime.getEditingTarget().lookupVariableById(e.value);
            if (n) {
              t.fields[e.name].value = n.name;
              t.fields[e.name].id = e.value;
            }
          } else {
            t.fields[e.name].value = e.value;
            if (t.opcode === "sensing_of_object_menu") {
              if (t.fields.OBJECT.value === "_stage_") {
                this._blocks[t.parent].fields.PROPERTY.value = "backdrop #";
              } else {
                this._blocks[t.parent].fields.PROPERTY.value = "x position";
              }
              this.runtime.requestBlocksUpdate();
            }
            const n = t.shadow && t.parent ? this._blocks[t.parent] : t;
            if (n.isMonitored) {
              this.runtime.requestUpdateMonitor({
                id: n.id,
                params: this._getBlockParams(n)
              });
            }
          }
          break;
        case "mutation":
          t.mutation = i(e.value);
          break;
        case "checkbox":
          {
            if (t.fields && Object.keys(t.fields).length > 0 && t.opcode !== "data_variable" && t.opcode !== "data_listcontents") {
              const e = d(t.id, t.fields);
              let n = this.runtime.monitorBlocks.getBlock(e);
              if (!n) {
                n = JSON.parse(JSON.stringify(t));
                n.id = e;
                this.runtime.monitorBlocks.createBlock(n);
              }
              t = n;
            }
            const n = t.isMonitored;
            t.isMonitored = e.value;
            let r = false;
            if (t.opcode === "data_variable") {
              r = !this.runtime.getTargetForStage().variables[t.fields.VARIABLE.id];
            } else if (t.opcode === "data_listcontents") {
              r = !this.runtime.getTargetForStage().variables[t.fields.LIST.id];
            }
            const i = r || Object.prototype.hasOwnProperty.call(this.runtime.monitorBlockInfo, t.opcode) && this.runtime.monitorBlockInfo[t.opcode].isSpriteSpecific;
            t.targetId = i ? t.targetId || this.runtime.getEditingTarget().id : null;
            if (n && !t.isMonitored) {
              this.runtime.requestHideMonitor(t.id);
            } else if (!n && t.isMonitored) {
              if (!this.runtime.requestShowMonitor(t.id)) {
                this.runtime.requestAddMonitor(new o({
                  id: t.id,
                  targetId: t.targetId,
                  spriteName: t.targetId ? this.runtime.getTargetById(t.targetId).getName() : null,
                  opcode: t.opcode,
                  params: this._getBlockParams(t),
                  value: "",
                  mode: t.opcode === "data_listcontents" ? "list" : "default"
                }));
              }
            }
            break;
          }
      }
      this.emitProjectChanged();
      this.resetCache();
    }
  }
  moveBlock(e) {
    if (!Object.prototype.hasOwnProperty.call(this._blocks, e.id)) {
      return;
    }
    const t = this._blocks[e.id];
    let n = false;
    if (e.newCoordinate) {
      n = t.x !== e.newCoordinate.x || t.y !== e.newCoordinate.y;
      t.x = e.newCoordinate.x;
      t.y = e.newCoordinate.y;
    }
    if (e.oldParent !== undefined) {
      const t = this._blocks[e.oldParent];
      if (e.oldInput !== undefined && t.inputs[e.oldInput].block === e.id) {
        t.inputs[e.oldInput].block = null;
      } else if (t.next === e.id) {
        t.next = null;
      }
      this._blocks[e.id].parent = null;
      n = true;
    }
    if (e.newParent === undefined) {
      this._addScript(e.id);
    } else {
      this._deleteScript(e.id);
      if (e.newInput === undefined) {
        this._blocks[e.newParent].next = e.id;
      } else {
        let t = null;
        if (Object.prototype.hasOwnProperty.call(this._blocks[e.newParent].inputs, e.newInput)) {
          t = this._blocks[e.newParent].inputs[e.newInput].shadow;
        }
        if (this._blocks[e.id].shadow) {
          t = e.id;
        }
        this._blocks[e.newParent].inputs[e.newInput] = {
          name: e.newInput,
          block: e.id,
          shadow: t
        };
      }
      this._blocks[e.id].parent = e.newParent;
      n = true;
    }
    this.resetCache();
    if (n) {
      this.emitProjectChanged();
    }
  }
  runAllMonitored(e) {
    if (this._cache._monitored === null) {
      this._cache._monitored = Object.keys(this._blocks).filter(e => this.getBlock(e).isMonitored).map(t => {
        const n = this.getBlock(t).targetId;
        return {
          blockId: t,
          target: n ? e.getTargetById(n) : null
        };
      });
    }
    const t = this._cache._monitored;
    for (let n = 0; n < t.length; n++) {
      const {
        blockId: r,
        target: i
      } = t[n];
      e.addMonitorScript(r, i);
    }
  }
  deleteBlock(e) {
    const t = this._blocks[e];
    if (t) {
      if (t.next !== null) {
        this.deleteBlock(t.next);
      }
      for (const e in t.inputs) {
        if (t.inputs[e].block !== null) {
          this.deleteBlock(t.inputs[e].block);
        }
        if (t.inputs[e].shadow !== null && t.inputs[e].shadow !== t.inputs[e].block) {
          this.deleteBlock(t.inputs[e].shadow);
        }
      }
      this._deleteScript(e);
      delete this._blocks[e];
      this.resetCache();
      this.emitProjectChanged();
    }
  }
  deleteAllBlocks() {
    Object.keys(this._blocks).forEach(e => this.deleteBlock(e));
  }
  getAllVariableAndListReferences(e, t) {
    const n = e || this._blocks;
    const r = Object.create(null);
    for (const e in n) {
      let i = null;
      let s = null;
      if (n[e].fields.VARIABLE) {
        i = n[e].fields.VARIABLE;
        s = h.SCALAR_TYPE;
      } else if (n[e].fields.LIST) {
        i = n[e].fields.LIST;
        s = h.LIST_TYPE;
      } else if (t && n[e].fields.BROADCAST_OPTION) {
        i = n[e].fields.BROADCAST_OPTION;
        s = h.BROADCAST_MESSAGE_TYPE;
      }
      if (i) {
        const e = i.id;
        if (r[e]) {
          r[e].push({
            referencingField: i,
            type: s
          });
        } else {
          r[e] = [{
            referencingField: i,
            type: s
          }];
        }
      }
    }
    return r;
  }
  updateBlocksAfterVarRename(e, t) {
    const n = this._blocks;
    for (const r in n) {
      let i = null;
      if (n[r].fields.VARIABLE) {
        i = n[r].fields.VARIABLE;
      } else if (n[r].fields.LIST) {
        i = n[r].fields.LIST;
      }
      if (i) {
        if (e === i.id) {
          i.value = t;
        }
      }
    }
  }
  updateTargetSpecificBlocks(e) {
    const t = this._blocks;
    for (const n in t) {
      if (e && t[n].opcode === "event_whenthisspriteclicked") {
        t[n].opcode = "event_whenstageclicked";
      } else if (!e && t[n].opcode === "event_whenstageclicked") {
        t[n].opcode = "event_whenthisspriteclicked";
      }
    }
  }
  updateAssetName(e, t, n) {
    let r;
    if (n === "costume") {
      r = this._getCostumeField.bind(this);
    } else if (n === "sound") {
      r = this._getSoundField.bind(this);
    } else if (n === "backdrop") {
      r = this._getBackdropField.bind(this);
    } else {
      if (n !== "sprite") {
        return;
      }
      r = this._getSpriteField.bind(this);
    }
    const i = this._blocks;
    for (const n in i) {
      const i = r(n);
      if (i && i.value === e) {
        i.value = t;
      }
    }
    this.resetCache();
  }
  updateSensingOfReference(e, t, n) {
    const r = this._blocks;
    let i = false;
    for (const s in r) {
      const o = r[s];
      if (o.opcode === "sensing_of" && o.fields.PROPERTY.value === e && o.inputs.OBJECT.block === o.inputs.OBJECT.shadow) {
        if (this.getBlock(o.inputs.OBJECT.block).fields.OBJECT.value === n) {
          o.fields.PROPERTY.value = t;
          i = true;
        }
      }
    }
    if (i) {
      this.resetCache();
    }
    return i;
  }
  _getCostumeField(e) {
    const t = this.getBlock(e);
    if (t && Object.prototype.hasOwnProperty.call(t.fields, "COSTUME")) {
      return t.fields.COSTUME;
    } else {
      return null;
    }
  }
  _getSoundField(e) {
    const t = this.getBlock(e);
    if (t && Object.prototype.hasOwnProperty.call(t.fields, "SOUND_MENU")) {
      return t.fields.SOUND_MENU;
    } else {
      return null;
    }
  }
  _getBackdropField(e) {
    const t = this.getBlock(e);
    if (t && Object.prototype.hasOwnProperty.call(t.fields, "BACKDROP")) {
      return t.fields.BACKDROP;
    } else {
      return null;
    }
  }
  _getSpriteField(e) {
    const t = this.getBlock(e);
    if (!t) {
      return null;
    }
    const n = ["TOWARDS", "TO", "OBJECT", "VIDEOONMENU2", "DISTANCETOMENU", "TOUCHINGOBJECTMENU", "CLONE_OPTION"];
    for (let e = 0; e < n.length; e++) {
      const r = n[e];
      if (Object.prototype.hasOwnProperty.call(t.fields, r)) {
        return t.fields[r];
      }
    }
    return null;
  }
  toXML(e) {
    return this._scripts.map(t => this.blockToXML(t, e)).join();
  }
  blockToXML(e, t) {
    const n = this._blocks[e];
    if (!n) {
      return;
    }
    const r = n.shadow ? "shadow" : "block";
    let i = `<${r}
                id="${s(n.id)}"
                type="${s(n.opcode)}"
                ${n.topLevel ? `x="${n.x}" y="${n.y}"` : ""}
            >`;
    const o = n.comment;
    if (o) {
      if (t) {
        if (Object.prototype.hasOwnProperty.call(t, o)) {
          i += t[o].toXML();
        } else {
          u.warn(`Could not find comment with id: ${o} in provided comment descriptions.`);
        }
      } else {
        u.warn(`Cannot serialize comment with id: ${o}; no comment descriptions provided.`);
      }
    }
    if (n.mutation) {
      i += this.mutationToXML(n.mutation);
    }
    for (const e in n.inputs) {
      if (!Object.prototype.hasOwnProperty.call(n.inputs, e)) {
        continue;
      }
      const r = n.inputs[e];
      if (r.block || r.shadow) {
        i += `<value name="${s(r.name)}">`;
        if (r.block) {
          i += this.blockToXML(r.block, t);
        }
        if (r.shadow && r.shadow !== r.block) {
          i += this.blockToXML(r.shadow, t);
        }
        i += "</value>";
      }
    }
    for (const e in n.fields) {
      if (!Object.prototype.hasOwnProperty.call(n.fields, e)) {
        continue;
      }
      const t = n.fields[e];
      i += `<field name="${s(t.name)}"`;
      const r = t.id;
      if (r) {
        i += ` id="${s(r)}"`;
      }
      const o = t.variableType;
      if (typeof o == "string") {
        i += ` variabletype="${s(o)}"`;
      }
      let a = t.value;
      if (typeof a == "string") {
        a = s(t.value);
      }
      i += `>${a}</field>`;
    }
    if (n.next) {
      i += `<next>${this.blockToXML(n.next, t)}</next>`;
    }
    i += `</${r}>`;
    return i;
  }
  mutationToXML(e) {
    let t = `<${e.tagName}`;
    for (const n in e) {
      if (n === "children" || n === "tagName") {
        continue;
      }
      let r = typeof e[n] == "string" ? s(e[n]) : e[n];
      if (n === "blockInfo") {
        r = s(JSON.stringify(e[n]));
      }
      t += ` ${n}="${r}"`;
    }
    t += ">";
    for (let n = 0; n < e.children.length; n++) {
      t += this.mutationToXML(e.children[n]);
    }
    t += `</${e.tagName}>`;
    return t;
  }
  _getBlockParams(e) {
    const t = {};
    for (const n in e.fields) {
      t[n] = e.fields[n].value;
    }
    for (const n in e.inputs) {
      const r = this._blocks[e.inputs[n].block];
      for (const e in r.fields) {
        t[e] = r.fields[e].value;
      }
    }
    return t;
  }
  _getCustomBlockInternal(e) {
    if (e.inputs && e.inputs.custom_block) {
      return this._blocks[e.inputs.custom_block.block];
    }
  }
  _addScript(e) {
    if (!(this._scripts.indexOf(e) > -1)) {
      this._scripts.push(e);
      this._blocks[e].topLevel = true;
    }
  }
  _deleteScript(e) {
    const t = this._scripts.indexOf(e);
    if (t > -1) {
      this._scripts.splice(t, 1);
    }
    if (this._blocks[e]) {
      this._blocks[e].topLevel = false;
    }
  }
}
c.getCached = function (e, t, n) {
  let r = e._cache._executeCached[t];
  if (r !== undefined) {
    return r;
  }
  const i = e.getBlock(t);
  if (i === undefined) {
    return null;
  } else {
    r = n === undefined ? {
      id: t,
      opcode: e.getOpcode(i),
      fields: e.getFields(i),
      inputs: e.getInputs(i),
      mutation: e.getMutation(i)
    } : new n(e, {
      id: t,
      opcode: e.getOpcode(i),
      fields: e.getFields(i),
      inputs: e.getInputs(i),
      mutation: e.getMutation(i)
    });
    e._cache._executeCached[t] = r;
    return r;
  }
};
const f = l._RuntimeScriptCache;
l.getScripts = function (e, t) {
  let n = e._cache.scripts[t];
  if (!n) {
    n = e._cache.scripts[t] = [];
    const r = e._scripts;
    for (let i = 0; i < r.length; i++) {
      const s = r[i];
      if (e.getBlock(s).opcode === t) {
        n.push(new f(e, s));
      }
    }
  }
  return n;
};
module.exports = p;