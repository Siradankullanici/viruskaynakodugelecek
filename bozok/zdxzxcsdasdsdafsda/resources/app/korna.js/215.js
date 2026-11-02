module.exports = {
  setupInitialState: e => {
    const t = e.renderer;
    for (const n of e.targets) {
      const e = n._getRenderedDirectionAndScale();
      if (t && n.interpolationData) {
        const r = n.drawableID;
        t.updateDrawablePosition(r, [n.x, n.y]);
        t.updateDrawableDirectionScale(r, e.direction, e.scale);
        t.updateDrawableEffect(r, "ghost", n.effects.ghost);
      }
      if (n.visible && !n.isStage) {
        n.interpolationData = {
          x: n.x,
          y: n.y,
          direction: e.direction,
          scale: e.scale,
          costume: n.currentCostume,
          ghost: n.effects.ghost
        };
      } else {
        n.interpolationData = null;
      }
    }
  },
  interpolate: (e, t) => {
    const n = e.renderer;
    if (n) {
      for (const r of e.targets) {
        const e = r.interpolationData;
        if (!e) {
          continue;
        }
        if (!r.visible) {
          continue;
        }
        const i = r.drawableID;
        const s = r.x - e.x;
        const o = r.y - e.y;
        const a = Math.abs(s);
        const c = Math.abs(o);
        if (a > 0.1 || c > 0.1) {
          const r = n._allDrawables[i].getAABB();
          const l = Math.min(240, Math.max(50, (r.width + r.height) * 1.5));
          if (Math.sqrt(a ** 2 + c ** 2) < l) {
            const r = e.x + s * t;
            const a = e.y + o * t;
            n.updateDrawablePosition(i, [r, a]);
          }
        }
        const l = r.effects.ghost - e.ghost;
        const u = Math.abs(l);
        if (u > 0 && u < 25) {
          const e = r.effects.ghost + l * t;
          n.updateDrawableEffect(i, "ghost", e);
        }
        if (e.costume === r.currentCostume) {
          let {
            direction: s,
            scale: o
          } = r._getRenderedDirectionAndScale();
          let a = false;
          if (s !== e.direction && (s % 90 != 0 || e.direction % 90 != 0)) {
            const n = s * Math.PI / 180;
            const r = e.direction * Math.PI / 180;
            s = Math.atan2(Math.sin(n) * t + Math.sin(r) * (1 - t), Math.cos(n) * t + Math.cos(r) * (1 - t)) * 180 / Math.PI;
            a = true;
          }
          const c = e.scale;
          if ((o[0] !== c[0] || o[1] !== c[1]) && Math.sign(o[0]) === Math.sign(c[0]) && Math.sign(o[1]) === Math.sign(c[1])) {
            const e = o[0] - c[0];
            const n = o[1] - c[1];
            const r = Math.abs(e);
            const i = Math.abs(n);
            if (r < 100 && i < 100) {
              o[0] = c[0] + e * t;
              o[1] = c[1] + n * t;
              a = true;
            }
          }
          if (a) {
            n.updateDrawableDirectionScale(i, s, o);
          }
        }
      }
    }
  }
};