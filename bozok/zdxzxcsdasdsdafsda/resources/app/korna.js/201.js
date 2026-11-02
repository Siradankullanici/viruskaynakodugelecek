const r = require("./9.js");
const i = require("./0.js");
module.exports = class {
  constructor(e) {
    this.provider = null;
    this.runtime = e;
    this.stage = null;
  }
  setProvider(e) {
    this.provider = e;
  }
  setStage(e) {
    this.stage = e;
  }
  postData(e) {
    if (e.varUpdate) {
      this.updateCloudVariable(e.varUpdate);
    }
  }
  requestCreateVariable(e) {
    if (this.runtime.canAddCloudVariable() && this.provider) {
      this.provider.createVariable(e.name, e.value);
    }
  }
  requestUpdateVariable(e, t) {
    if (this.provider) {
      this.provider.updateVariable(e, t);
    }
  }
  requestRenameVariable(e, t) {
    if (this.provider) {
      this.provider.renameVariable(e, t);
    }
  }
  requestDeleteVariable(e) {
    if (this.provider) {
      this.provider.deleteVariable(e);
    }
  }
  updateCloudVariable(e) {
    const t = e.name;
    const n = this.stage.lookupVariableByNameAndType(t, r.SCALAR_TYPE);
    if (n && n.isCloud) {
      n.value = e.value;
    } else {
      i.warn(`Received an update for a cloud variable that does not exist: ${t}`);
    }
  }
  clear() {
    if (this.provider) {
      this.provider.requestCloseConnection();
      this.provider = null;
      this.stage = null;
    }
  }
};