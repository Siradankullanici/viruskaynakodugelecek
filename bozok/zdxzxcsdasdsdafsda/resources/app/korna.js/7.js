const n = "!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
module.exports = function () {
  const e = n.length;
  const t = [];
  for (let r = 0; r < 20; r++) {
    t[r] = n.charAt(Math.random() * e);
  }
  return t.join("");
};