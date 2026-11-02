module.exports = function (e, t, n) {
  if ("objName" in t) {
    t.projectVersion = 2;
    return n(null, t);
  }
  if (e) {
    if ("name" in t) {
      t.projectVersion = 3;
      return n(null, t);
    }
  } else if ("targets" in t) {
    t.projectVersion = 3;
    return n(null, t);
  }
  n(new Error("Could not parse as a valid SB2 or SB3 project."));
};