const r = require("./0.js");
module.exports = function (e) {
  if (typeof e != "string") {
    if (!Array.isArray(e)) {
      r.error("Unexpected input recieved in replaceUnsafeChars");
      return e;
    }
    e = String(e);
  }
  return e.replace(/[<>&'"]/g, e => {
    switch (e) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case "\"":
        return "&quot;";
    }
  });
};