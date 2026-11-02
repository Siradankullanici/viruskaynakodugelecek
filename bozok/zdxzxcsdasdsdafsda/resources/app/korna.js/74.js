class n {
  static _mergeVarRefObjects(e, t) {
    for (const n in t) {
      if (e[n]) {
        e[n] = e[n].concat(t[n]);
      } else {
        e[n] = t[n];
      }
    }
    return e;
  }
  static getAllVarRefsForTargets(e, t) {
    return e.map(e => e.blocks.getAllVariableAndListReferences(null, t)).reduce(n._mergeVarRefObjects, {});
  }
  static updateVariableIdentifiers(e, t, n) {
    e.map(e => {
      e.referencingField.id = t;
      if (n) {
        e.referencingField.value = n;
      }
      return e;
    });
  }
}
module.exports = n;