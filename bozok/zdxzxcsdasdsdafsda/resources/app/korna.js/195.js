const r = require("./19.js");
const i = require("./196.js");
const s = require("./6.js");
const o = require("./0.js");
const a = e => e.replace(/[^-\w ]/g, "");
const c = (e, t) => {
  let n;
  const r = e.findIndex(e => e.family.toLowerCase() === t.family.toLowerCase());
  if (r !== -1) {
    n = e[r];
    e.splice(r, 1);
  }
  e.push(t);
  return n;
};
module.exports = class extends r {
  constructor(e) {
    super();
    this.runtime = e;
    this.fonts = [];
    this.restrictedFonts = new Set();
  }
  restrictFont(e) {
    if (!this.isValidSystemFont(e)) {
      throw new Error("Invalid font");
    }
    this.restrictedFonts.add(e.toLowerCase());
    const t = this.fonts.length;
    this.fonts = this.fonts.filter(e => e.system || this.isValidCustomFont(e.family));
    if (this.fonts.length !== t) {
      this.updateRenderer();
      this.changed();
    }
  }
  isValidSystemFont(e) {
    return /^[-\w ]+$/.test(e);
  }
  isValidCustomFont(e) {
    return /^[-\w ]+$/.test(e) && !this.restrictedFonts.has(e.toLowerCase());
  }
  isValidFamily(e) {
    return this.isValidSystemFont(e) && this.isValidCustomFont(e);
  }
  getUnusedSystemFont(e) {
    return s.caseInsensitiveUnusedName(a(e), this.fonts.map(e => e.family));
  }
  getUnusedCustomFont(e) {
    return s.caseInsensitiveUnusedName(a(e), [...this.fonts.map(e => e.family), ...this.restrictedFonts]);
  }
  hasFont(e) {
    return !!this.fonts.find(t => t.family.toLowerCase() === e.toLowerCase());
  }
  changed() {
    this.emit("change");
  }
  addSystemFont(e, t) {
    if (!this.isValidSystemFont(e)) {
      throw new Error("Invalid system font family");
    }
    const n = c(this.fonts, {
      system: true,
      family: e,
      fallback: t
    });
    if (n && !n.system) {
      this.updateRenderer();
    }
    this.changed();
  }
  addCustomFont(e, t, n) {
    if (!this.isValidCustomFont(e)) {
      throw new Error("Invalid custom font family");
    }
    c(this.fonts, {
      system: false,
      family: e,
      fallback: t,
      asset: n
    });
    this.updateRenderer();
    this.changed();
  }
  getFonts() {
    return this.fonts.map(e => ({
      system: e.system,
      name: e.family,
      family: `"${e.family}", ${e.fallback}`,
      data: e.asset ? e.asset.data : null,
      format: e.asset ? e.asset.dataFormat : null
    }));
  }
  deleteFont(e) {
    const [t] = this.fonts.splice(e, 1);
    if (!t.system) {
      this.updateRenderer();
    }
    this.changed();
  }
  clear() {
    const e = this.fonts.some(e => !e.system);
    this.fonts = [];
    if (e) {
      this.updateRenderer();
    }
    this.changed();
  }
  updateRenderer() {
    if (!this.runtime.renderer || !this.runtime.renderer.setCustomFonts) {
      return;
    }
    const e = {};
    for (const t of this.fonts) {
      if (!t.system) {
        const n = t.asset.encodeDataURI();
        const r = `@font-face { font-family: "${t.family}"; src: url("${n}"); }`;
        e[`"${t.family}", ${t.fallback}`] = r;
      }
    }
    this.runtime.renderer.setCustomFonts(e);
  }
  serializeJSON() {
    if (this.fonts.length === 0) {
      return null;
    } else {
      return this.fonts.map(e => {
        const t = {
          system: e.system,
          family: e.family,
          fallback: e.fallback
        };
        if (!e.system) {
          const n = e.asset;
          t.md5ext = `${n.assetId}.${n.dataFormat}`;
        }
        return t;
      });
    }
  }
  serializeAssets() {
    return this.fonts.filter(e => !e.system).map(e => e.asset);
  }
  async deserialize(e, t, n) {
    if (!n) {
      this.clear();
    }
    if (Array.isArray(e)) {
      for (const n of e) {
        if (n && typeof n == "object") {
          try {
            const e = n.system;
            const r = n.family;
            const s = n.fallback;
            if (typeof e != "boolean" || typeof r != "string" || typeof s != "string" || this.hasFont(r)) {
              continue;
            }
            if (e) {
              this.addSystemFont(r, s);
            } else {
              const e = n.md5ext;
              if (typeof e != "string") {
                continue;
              }
              const o = await i.getByMd5ext(this.runtime, t, this.runtime.storage.AssetType.Font, e);
              this.addCustomFont(r, s, o);
            }
          } catch (e) {
            o.error("could not add font", e);
          }
        }
      }
    }
  }
};