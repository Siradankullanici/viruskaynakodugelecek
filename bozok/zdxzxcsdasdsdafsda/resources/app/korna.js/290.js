const n = ["mousedown", "mouseup", "keydown", "keyup", "touchstart", "touchend"];
module.exports = e => {
  if (e.state === "running") {
    return;
  }
  const t = () => {
    if (e.state === "running") {
      (() => {
        e.removeEventListener("statechange", t);
        for (const e of n) {
          document.body.removeEventListener(e, r);
        }
      })();
    }
  };
  e.addEventListener("statechange", t);
  const r = () => {
    e.resume();
  };
  for (const e of n) {
    document.body.addEventListener(e, r);
  }
};