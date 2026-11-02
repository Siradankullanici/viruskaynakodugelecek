const r = require("./1.js");
module.exports = class {
  constructor(e) {
    this.runtime = e;
  }
  getPrimitives() {
    return {
      data_variable: this.getVariable,
      data_setvariableto: this.setVariableTo,
      data_changevariableby: this.changeVariableBy,
      data_hidevariable: this.hideVariable,
      data_showvariable: this.showVariable,
      data_listcontents: this.getListContents,
      data_addtolist: this.addToList,
      data_deleteoflist: this.deleteOfList,
      data_deletealloflist: this.deleteAllOfList,
      data_insertatlist: this.insertAtList,
      data_replaceitemoflist: this.replaceItemOfList,
      data_itemoflist: this.getItemOfList,
      data_itemnumoflist: this.getItemNumOfList,
      data_lengthoflist: this.lengthOfList,
      data_listcontainsitem: this.listContainsItem,
      data_hidelist: this.hideList,
      data_showlist: this.showList
    };
  }
  getVariable(e, t) {
    return t.target.lookupOrCreateVariable(e.VARIABLE.id, e.VARIABLE.name).value;
  }
  setVariableTo(e, t) {
    const n = t.target.lookupOrCreateVariable(e.VARIABLE.id, e.VARIABLE.name);
    n.value = e.VALUE;
    if (n.isCloud) {
      t.ioQuery("cloud", "requestUpdateVariable", [n.name, e.VALUE]);
    }
  }
  changeVariableBy(e, t) {
    const n = t.target.lookupOrCreateVariable(e.VARIABLE.id, e.VARIABLE.name);
    const i = r.toNumber(n.value) + r.toNumber(e.VALUE);
    n.value = i;
    if (n.isCloud) {
      t.ioQuery("cloud", "requestUpdateVariable", [n.name, i]);
    }
  }
  changeMonitorVisibility(e, t) {
    this.runtime.monitorBlocks.changeBlock({
      id: e,
      element: "checkbox",
      value: t
    }, this.runtime);
  }
  showVariable(e) {
    this.changeMonitorVisibility(e.VARIABLE.id, true);
  }
  hideVariable(e) {
    this.changeMonitorVisibility(e.VARIABLE.id, false);
  }
  showList(e) {
    this.changeMonitorVisibility(e.LIST.id, true);
  }
  hideList(e) {
    this.changeMonitorVisibility(e.LIST.id, false);
  }
  getListContents(e, t) {
    const n = t.target.lookupOrCreateList(e.LIST.id, e.LIST.name);
    if (t.thread.updateMonitor) {
      if (n._monitorUpToDate) {
        return n.value;
      } else {
        n._monitorUpToDate = true;
        return n.value.slice();
      }
    }
    let r = true;
    for (let e = 0; e < n.value.length; e++) {
      const t = n.value[e];
      if (typeof t != "string" || t.length !== 1) {
        r = false;
        break;
      }
    }
    if (r) {
      return n.value.join("");
    } else {
      return n.value.join(" ");
    }
  }
  addToList(e, t) {
    const n = t.target.lookupOrCreateList(e.LIST.id, e.LIST.name);
    n.value.push(e.ITEM);
    n._monitorUpToDate = false;
  }
  deleteOfList(e, t) {
    const n = t.target.lookupOrCreateList(e.LIST.id, e.LIST.name);
    const i = r.toListIndex(e.INDEX, n.value.length, true);
    if (i !== r.LIST_INVALID) {
      if (i !== r.LIST_ALL) {
        n.value.splice(i - 1, 1);
        n._monitorUpToDate = false;
      } else {
        n.value = [];
      }
    }
  }
  deleteAllOfList(e, t) {
    t.target.lookupOrCreateList(e.LIST.id, e.LIST.name).value = [];
  }
  insertAtList(e, t) {
    const n = e.ITEM;
    const i = t.target.lookupOrCreateList(e.LIST.id, e.LIST.name);
    const s = r.toListIndex(e.INDEX, i.value.length + 1, false);
    if (s !== r.LIST_INVALID) {
      i.value.splice(s - 1, 0, n);
      i._monitorUpToDate = false;
    }
  }
  replaceItemOfList(e, t) {
    const n = e.ITEM;
    const i = t.target.lookupOrCreateList(e.LIST.id, e.LIST.name);
    const s = r.toListIndex(e.INDEX, i.value.length, false);
    if (s !== r.LIST_INVALID) {
      i.value[s - 1] = n;
      i._monitorUpToDate = false;
    }
  }
  getItemOfList(e, t) {
    const n = t.target.lookupOrCreateList(e.LIST.id, e.LIST.name);
    const i = r.toListIndex(e.INDEX, n.value.length, false);
    if (i === r.LIST_INVALID) {
      return "";
    } else {
      return n.value[i - 1];
    }
  }
  getItemNumOfList(e, t) {
    const n = e.ITEM;
    const i = t.target.lookupOrCreateList(e.LIST.id, e.LIST.name);
    for (let e = 0; e < i.value.length; e++) {
      if (r.compare(i.value[e], n) === 0) {
        return e + 1;
      }
    }
    return 0;
  }
  lengthOfList(e, t) {
    return t.target.lookupOrCreateList(e.LIST.id, e.LIST.name).value.length;
  }
  listContainsItem(e, t) {
    const n = e.ITEM;
    const i = t.target.lookupOrCreateList(e.LIST.id, e.LIST.name);
    if (i.value.indexOf(n) >= 0) {
      return true;
    }
    for (let e = 0; e < i.value.length; e++) {
      if (r.compare(i.value[e], n) === 0) {
        return true;
      }
    }
    return false;
  }
};