module.exports = {
  supportsNullishCoalescing: (() => {
    try {
      new Function("undefined ?? 3");
      return true;
    } catch (e) {
      return false;
    }
  })()
};