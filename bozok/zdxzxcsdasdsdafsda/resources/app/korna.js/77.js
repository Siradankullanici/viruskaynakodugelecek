module.exports = function (e) {
  const t = e.match(/<svg [^>]*>/);
  if (t && t[0].indexOf("xmlns=") === -1) {
    e = e.replace("<svg ", "<svg xmlns=\"http://www.w3.org/2000/svg\" ");
  }
  if (t && t[0].indexOf("&ns_") !== -1 && e.indexOf("<!DOCTYPE") === -1) {
    e = e.replace(t[0], t[0].replace(/&ns_[^;]+;/g, "http://ns.adobe.com/Extensibility/1.0/"));
  }
  if (e.includes("data:img/png")) {
    e = e.replace(/(<image[^>]+?xlink:href=["'])data:img\/png/g, (e, t) => `${t}data:image/png`);
  }
  const n = /(<[^>]+?xmlns:(?!xml=)[^ ]+=)"http:\/\/www.w3.org\/XML\/1998\/namespace"/g;
  if (e.match(n) !== null) {
    e = e.replace(n, (e, t) => `${t}"http://dummy.namespace"`);
  }
  return e = (e = (e = e.replace(/<(\/?)\s*svg:/g, "<$1")).replace(/<metadata>[\s\S]*<\/metadata>/, "<metadata></metadata>")).replace(/<script[\s\S]*>[\s\S]*<\/script>/, "<script></script>");
};