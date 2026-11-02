module.exports = {
  generateExtensionId: e => {
    const t = e.replace(/[^a-z0-9]/gi, "").toLowerCase();
    return `sbx${t}`;
  },
  argumentIndexToId: e => e.toString()
};