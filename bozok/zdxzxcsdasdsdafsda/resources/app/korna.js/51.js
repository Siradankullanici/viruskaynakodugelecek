module.exports = function () {
  "use strict";

  function e(e, t) {
    if (t == null || t > e.length) {
      t = e.length;
    }
    for (var n = 0, r = Array(t); n < t; n++) {
      r[n] = e[n];
    }
    return r;
  }
  function t(e) {
    if (Array.isArray(e)) {
      return e;
    }
  }
  function n(e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var r;
      var i;
      var s;
      var o;
      var a = [];
      var c = true;
      var l = false;
      try {
        s = (n = n.call(e)).next;
        if (t === 0) ;else {
          for (; !(c = (r = s.call(n)).done) && (a.push(r.value), a.length !== t); c = true);
        }
      } catch (e) {
        l = true;
        i = e;
      } finally {
        try {
          if (!c && n.return != null && (o = n.return(), Object(o) !== o)) {
            return;
          }
        } finally {
          if (l) {
            throw i;
          }
        }
      }
      return a;
    }
  }
  function r() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function i(e, i) {
    return t(e) || n(e, i) || s(e, i) || r();
  }
  function s(t, n) {
    if (t) {
      if (typeof t == "string") {
        return e(t, n);
      }
      var r = {}.toString.call(t).slice(8, -1);
      if (r === "Object" && t.constructor) {
        r = t.constructor.name;
      }
      if (r === "Map" || r === "Set") {
        return Array.from(t);
      } else if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) {
        return e(t, n);
      } else {
        return undefined;
      }
    }
  }
  const o = Object.entries;
  const a = Object.setPrototypeOf;
  const c = Object.isFrozen;
  const l = Object.getPrototypeOf;
  const u = Object.getOwnPropertyDescriptor;
  let h = Object.freeze;
  let d = Object.seal;
  let p = Object.create;
  let f = typeof Reflect != "undefined" && Reflect;
  let m = f.apply;
  let g = f.construct;
  h ||= function (e) {
    return e;
  };
  d ||= function (e) {
    return e;
  };
  m ||= function (e, t) {
    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) {
      r[i - 2] = arguments[i];
    }
    return e.apply(t, r);
  };
  g ||= function (e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
      n[r - 1] = arguments[r];
    }
    return new e(...n);
  };
  const b = U(Array.prototype.forEach);
  const y = U(Array.prototype.lastIndexOf);
  const E = U(Array.prototype.pop);
  const T = U(Array.prototype.push);
  const v = U(Array.prototype.splice);
  const A = Array.isArray;
  const w = U(String.prototype.toLowerCase);
  const S = U(String.prototype.toString);
  const k = U(String.prototype.match);
  const I = U(String.prototype.replace);
  const O = U(String.prototype.indexOf);
  const N = U(String.prototype.trim);
  const R = U(Number.prototype.toString);
  const x = U(Boolean.prototype.toString);
  const M = typeof BigInt == "undefined" ? null : U(BigInt.prototype.toString);
  const C = typeof Symbol == "undefined" ? null : U(Symbol.prototype.toString);
  const P = U(Object.prototype.hasOwnProperty);
  const L = U(Object.prototype.toString);
  const D = U(RegExp.prototype.test);
  const B = F(TypeError);
  function U(e) {
    return function (t) {
      if (t instanceof RegExp) {
        t.lastIndex = 0;
      }
      for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) {
        r[i - 1] = arguments[i];
      }
      return m(e, t, r);
    };
  }
  function F(e) {
    return function () {
      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) {
        n[r] = arguments[r];
      }
      return g(e, n);
    };
  }
  function j(e, t, n = w) {
    if (a) {
      a(e, null);
    }
    if (!A(t)) {
      return e;
    }
    let r = t.length;
    while (r--) {
      let i = t[r];
      if (typeof i == "string") {
        const e = n(i);
        if (e !== i) {
          if (!c(t)) {
            t[r] = e;
          }
          i = e;
        }
      }
      e[i] = true;
    }
    return e;
  }
  function z(e) {
    for (let t = 0; t < e.length; t++) {
      if (!P(e, t)) {
        e[t] = null;
      }
    }
    return e;
  }
  function G(e) {
    const t = p(null);
    for (const r of o(e)) {
      var n = i(r, 2);
      const s = n[0];
      const o = n[1];
      if (P(e, s)) {
        if (A(o)) {
          t[s] = z(o);
        } else if (o && typeof o == "object" && o.constructor === Object) {
          t[s] = G(o);
        } else {
          t[s] = o;
        }
      }
    }
    return t;
  }
  function V(e) {
    switch (typeof e) {
      case "string":
        return e;
      case "number":
        return R(e);
      case "boolean":
        return x(e);
      case "bigint":
        if (M) {
          return M(e);
        } else {
          return "0";
        }
      case "symbol":
        if (C) {
          return C(e);
        } else {
          return "Symbol()";
        }
      case "undefined":
      default:
        return L(e);
      case "function":
      case "object":
        {
          if (e === null) {
            return L(e);
          }
          const t = e;
          const n = _(t, "toString");
          if (typeof n == "function") {
            const e = n(t);
            if (typeof e == "string") {
              return e;
            } else {
              return L(e);
            }
          }
          return L(e);
        }
    }
  }
  function _(e, t) {
    while (e !== null) {
      const n = u(e, t);
      if (n) {
        if (n.get) {
          return U(n.get);
        }
        if (typeof n.value == "function") {
          return U(n.value);
        }
      }
      e = l(e);
    }
    function n() {
      return null;
    }
    return n;
  }
  function Y(e) {
    try {
      D(e, "");
      return true;
    } catch (e) {
      return false;
    }
  }
  const H = h(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
  const W = h(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
  const K = h(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
  const X = h(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
  const Z = h(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
  const q = h(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
  const Q = h(["#text"]);
  const J = h(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]);
  const $ = h(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
  const ee = h(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
  const te = h(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
  const ne = d(/{{[\w\W]*|^[\w\W]*}}/g);
  const re = d(/<%[\w\W]*|^[\w\W]*%>/g);
  const ie = d(/\${[\w\W]*/g);
  const se = d(/^data-[\-\w.\u00B7-\uFFFF]+$/);
  const oe = d(/^aria-[\-\w]+$/);
  const ae = d(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
  const ce = d(/^(?:\w+script|data):/i);
  const le = d(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
  const ue = d(/^html$/i);
  const he = d(/^[a-z][.\w]*(-[.\w]+)+$/i);
  const de = {
    element: 1,
    text: 3,
    progressingInstruction: 7,
    comment: 8,
    document: 9
  };
  const pe = function () {
    if (typeof window == "undefined") {
      return null;
    } else {
      return window;
    }
  };
  const fe = function (e, t) {
    if (typeof e != "object" || typeof e.createPolicy != "function") {
      return null;
    }
    let n = null;
    const r = "data-tt-policy-suffix";
    if (t && t.hasAttribute(r)) {
      n = t.getAttribute(r);
    }
    const i = "dompurify" + (n ? "#" + n : "");
    try {
      return e.createPolicy(i, {
        createHTML: e => e,
        createScriptURL: e => e
      });
    } catch (e) {
      console.warn("TrustedTypes policy " + i + " could not be created.");
      return null;
    }
  };
  const me = function () {
    return {
      afterSanitizeAttributes: [],
      afterSanitizeElements: [],
      afterSanitizeShadowDOM: [],
      beforeSanitizeAttributes: [],
      beforeSanitizeElements: [],
      beforeSanitizeShadowDOM: [],
      uponSanitizeAttribute: [],
      uponSanitizeElement: [],
      uponSanitizeShadowNode: []
    };
  };
  function ge(e = pe()) {
    const t = e => ge(e);
    t.version = "3.4.5";
    t.removed = [];
    if (!e || !e.document || e.document.nodeType !== de.document || !e.Element) {
      t.isSupported = false;
      return t;
    }
    let n = e.document;
    const r = n;
    const i = r.currentScript;
    const s = e.DocumentFragment;
    const a = e.HTMLTemplateElement;
    const c = e.Node;
    const l = e.Element;
    const u = e.NodeFilter;
    const d = e.NamedNodeMap;
    const f = d === undefined ? e.NamedNodeMap || e.MozNamedAttrMap : d;
    const m = e.HTMLFormElement;
    const g = e.DOMParser;
    const R = e.trustedTypes;
    const x = l.prototype;
    const M = _(x, "cloneNode");
    const C = _(x, "remove");
    const L = _(x, "nextSibling");
    const U = _(x, "childNodes");
    const F = _(x, "parentNode");
    const z = c && c.prototype ? _(c.prototype, "nodeType") : null;
    if (typeof a == "function") {
      const e = n.createElement("template");
      if (e.content && e.content.ownerDocument) {
        n = e.content.ownerDocument;
      }
    }
    let be;
    let ye = "";
    const Ee = n;
    const Te = Ee.implementation;
    const ve = Ee.createNodeIterator;
    const Ae = Ee.createDocumentFragment;
    const we = Ee.getElementsByTagName;
    const Se = r.importNode;
    let ke = me();
    t.isSupported = typeof o == "function" && typeof F == "function" && Te && Te.createHTMLDocument !== undefined;
    const Ie = ne;
    const Oe = re;
    const Ne = ie;
    const Re = se;
    const xe = oe;
    const Me = ce;
    const Ce = le;
    const Pe = he;
    let Le = ae;
    let De = null;
    const Be = j({}, [...H, ...W, ...K, ...Z, ...Q]);
    let Ue = null;
    const Fe = j({}, [...J, ...$, ...ee, ...te]);
    let je = Object.seal(p(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    let ze = null;
    let Ge = null;
    const Ve = Object.seal(p(null, {
      tagCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      }
    }));
    let _e = true;
    let Ye = true;
    let He = false;
    let We = true;
    let Ke = false;
    let Xe = true;
    let Ze = false;
    let qe = false;
    let Qe = false;
    let Je = false;
    let $e = false;
    let et = false;
    let tt = true;
    let nt = false;
    const rt = "user-content-";
    let it = true;
    let st = false;
    let ot = {};
    let at = null;
    const ct = j({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    let lt = null;
    const ut = j({}, ["audio", "video", "img", "source", "image", "track"]);
    let ht = null;
    const dt = j({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
    const pt = "http://www.w3.org/1998/Math/MathML";
    const ft = "http://www.w3.org/2000/svg";
    const mt = "http://www.w3.org/1999/xhtml";
    let gt = mt;
    let bt = false;
    let yt = null;
    const Et = j({}, [pt, ft, mt], S);
    let Tt = j({}, ["mi", "mo", "mn", "ms", "mtext"]);
    let vt = j({}, ["annotation-xml"]);
    const At = j({}, ["title", "style", "font", "a", "script"]);
    let wt = null;
    const St = ["application/xhtml+xml", "text/html"];
    const kt = "text/html";
    let It = null;
    let Ot = null;
    const Nt = n.createElement("form");
    const Rt = function (e) {
      return e instanceof RegExp || e instanceof Function;
    };
    const xt = function (e = {}) {
      if (Ot && Ot === e) {
        return;
      }
      if (!e || typeof e != "object") {
        e = {};
      }
      e = G(e);
      wt = St.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? kt : e.PARSER_MEDIA_TYPE;
      It = wt === "application/xhtml+xml" ? S : w;
      De = P(e, "ALLOWED_TAGS") && A(e.ALLOWED_TAGS) ? j({}, e.ALLOWED_TAGS, It) : Be;
      Ue = P(e, "ALLOWED_ATTR") && A(e.ALLOWED_ATTR) ? j({}, e.ALLOWED_ATTR, It) : Fe;
      yt = P(e, "ALLOWED_NAMESPACES") && A(e.ALLOWED_NAMESPACES) ? j({}, e.ALLOWED_NAMESPACES, S) : Et;
      ht = P(e, "ADD_URI_SAFE_ATTR") && A(e.ADD_URI_SAFE_ATTR) ? j(G(dt), e.ADD_URI_SAFE_ATTR, It) : dt;
      lt = P(e, "ADD_DATA_URI_TAGS") && A(e.ADD_DATA_URI_TAGS) ? j(G(ut), e.ADD_DATA_URI_TAGS, It) : ut;
      at = P(e, "FORBID_CONTENTS") && A(e.FORBID_CONTENTS) ? j({}, e.FORBID_CONTENTS, It) : ct;
      ze = P(e, "FORBID_TAGS") && A(e.FORBID_TAGS) ? j({}, e.FORBID_TAGS, It) : G({});
      Ge = P(e, "FORBID_ATTR") && A(e.FORBID_ATTR) ? j({}, e.FORBID_ATTR, It) : G({});
      ot = !!P(e, "USE_PROFILES") && (e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? G(e.USE_PROFILES) : e.USE_PROFILES);
      _e = e.ALLOW_ARIA_ATTR !== false;
      Ye = e.ALLOW_DATA_ATTR !== false;
      He = e.ALLOW_UNKNOWN_PROTOCOLS || false;
      We = e.ALLOW_SELF_CLOSE_IN_ATTR !== false;
      Ke = e.SAFE_FOR_TEMPLATES || false;
      Xe = e.SAFE_FOR_XML !== false;
      Ze = e.WHOLE_DOCUMENT || false;
      Je = e.RETURN_DOM || false;
      $e = e.RETURN_DOM_FRAGMENT || false;
      et = e.RETURN_TRUSTED_TYPE || false;
      Qe = e.FORCE_BODY || false;
      tt = e.SANITIZE_DOM !== false;
      nt = e.SANITIZE_NAMED_PROPS || false;
      it = e.KEEP_CONTENT !== false;
      st = e.IN_PLACE || false;
      Le = Y(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : ae;
      gt = typeof e.NAMESPACE == "string" ? e.NAMESPACE : mt;
      Tt = P(e, "MATHML_TEXT_INTEGRATION_POINTS") && e.MATHML_TEXT_INTEGRATION_POINTS && typeof e.MATHML_TEXT_INTEGRATION_POINTS == "object" ? G(e.MATHML_TEXT_INTEGRATION_POINTS) : j({}, ["mi", "mo", "mn", "ms", "mtext"]);
      vt = P(e, "HTML_INTEGRATION_POINTS") && e.HTML_INTEGRATION_POINTS && typeof e.HTML_INTEGRATION_POINTS == "object" ? G(e.HTML_INTEGRATION_POINTS) : j({}, ["annotation-xml"]);
      const t = P(e, "CUSTOM_ELEMENT_HANDLING") && e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING == "object" ? G(e.CUSTOM_ELEMENT_HANDLING) : p(null);
      je = p(null);
      if (P(t, "tagNameCheck") && Rt(t.tagNameCheck)) {
        je.tagNameCheck = t.tagNameCheck;
      }
      if (P(t, "attributeNameCheck") && Rt(t.attributeNameCheck)) {
        je.attributeNameCheck = t.attributeNameCheck;
      }
      if (P(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean") {
        je.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements;
      }
      if (Ke) {
        Ye = false;
      }
      if ($e) {
        Je = true;
      }
      if (ot) {
        De = j({}, Q);
        Ue = p(null);
        if (ot.html === true) {
          j(De, H);
          j(Ue, J);
        }
        if (ot.svg === true) {
          j(De, W);
          j(Ue, $);
          j(Ue, te);
        }
        if (ot.svgFilters === true) {
          j(De, K);
          j(Ue, $);
          j(Ue, te);
        }
        if (ot.mathMl === true) {
          j(De, Z);
          j(Ue, ee);
          j(Ue, te);
        }
      }
      Ve.tagCheck = null;
      Ve.attributeCheck = null;
      if (P(e, "ADD_TAGS")) {
        if (typeof e.ADD_TAGS == "function") {
          Ve.tagCheck = e.ADD_TAGS;
        } else if (A(e.ADD_TAGS)) {
          if (De === Be) {
            De = G(De);
          }
          j(De, e.ADD_TAGS, It);
        }
      }
      if (P(e, "ADD_ATTR")) {
        if (typeof e.ADD_ATTR == "function") {
          Ve.attributeCheck = e.ADD_ATTR;
        } else if (A(e.ADD_ATTR)) {
          if (Ue === Fe) {
            Ue = G(Ue);
          }
          j(Ue, e.ADD_ATTR, It);
        }
      }
      if (P(e, "ADD_URI_SAFE_ATTR") && A(e.ADD_URI_SAFE_ATTR)) {
        j(ht, e.ADD_URI_SAFE_ATTR, It);
      }
      if (P(e, "FORBID_CONTENTS") && A(e.FORBID_CONTENTS)) {
        if (at === ct) {
          at = G(at);
        }
        j(at, e.FORBID_CONTENTS, It);
      }
      if (P(e, "ADD_FORBID_CONTENTS") && A(e.ADD_FORBID_CONTENTS)) {
        if (at === ct) {
          at = G(at);
        }
        j(at, e.ADD_FORBID_CONTENTS, It);
      }
      if (it) {
        De["#text"] = true;
      }
      if (Ze) {
        j(De, ["html", "head", "body"]);
      }
      if (De.table) {
        j(De, ["tbody"]);
        delete ze.tbody;
      }
      if (e.TRUSTED_TYPES_POLICY) {
        if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") {
          throw B("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
        }
        if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") {
          throw B("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
        }
        be = e.TRUSTED_TYPES_POLICY;
        ye = be.createHTML("");
      } else {
        if (be === undefined) {
          be = fe(R, i);
        }
        if (be !== null && typeof ye == "string") {
          ye = be.createHTML("");
        }
      }
      if (h) {
        h(e);
      }
      Ot = e;
    };
    const Mt = j({}, [...W, ...K, ...X]);
    const Ct = j({}, [...Z, ...q]);
    const Pt = function (e) {
      let t = F(e);
      if (!t || !t.tagName) {
        t = {
          namespaceURI: gt,
          tagName: "template"
        };
      }
      const n = w(e.tagName);
      const r = w(t.tagName);
      return !!yt[e.namespaceURI] && (e.namespaceURI === ft ? t.namespaceURI === mt ? n === "svg" : t.namespaceURI === pt ? n === "svg" && (r === "annotation-xml" || Tt[r]) : Boolean(Mt[n]) : e.namespaceURI === pt ? t.namespaceURI === mt ? n === "math" : t.namespaceURI === ft ? n === "math" && vt[r] : Boolean(Ct[n]) : e.namespaceURI === mt ? (t.namespaceURI !== ft || !!vt[r]) && (t.namespaceURI !== pt || !!Tt[r]) && !Ct[n] && (At[n] || !Mt[n]) : wt === "application/xhtml+xml" && !!yt[e.namespaceURI]);
    };
    const Lt = function (e) {
      T(t.removed, {
        element: e
      });
      try {
        F(e).removeChild(e);
      } catch (t) {
        C(e);
      }
    };
    const Dt = function (e, n) {
      try {
        T(t.removed, {
          attribute: n.getAttributeNode(e),
          from: n
        });
      } catch (e) {
        T(t.removed, {
          attribute: null,
          from: n
        });
      }
      n.removeAttribute(e);
      if (e === "is") {
        if (Je || $e) {
          try {
            Lt(n);
          } catch (e) {}
        } else {
          try {
            n.setAttribute(e, "");
          } catch (e) {}
        }
      }
    };
    const Bt = function (e) {
      let t = null;
      let r = null;
      if (Qe) {
        e = "<remove></remove>" + e;
      } else {
        const t = k(e, /^[\r\n\t ]+/);
        r = t && t[0];
      }
      if (wt === "application/xhtml+xml" && gt === mt) {
        e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>";
      }
      const i = be ? be.createHTML(e) : e;
      if (gt === mt) {
        try {
          t = new g().parseFromString(i, wt);
        } catch (e) {}
      }
      if (!t || !t.documentElement) {
        t = Te.createDocument(gt, "template", null);
        try {
          t.documentElement.innerHTML = bt ? ye : i;
        } catch (e) {}
      }
      const s = t.body || t.documentElement;
      if (e && r) {
        s.insertBefore(n.createTextNode(r), s.childNodes[0] || null);
      }
      if (gt === mt) {
        return we.call(t, Ze ? "html" : "body")[0];
      } else if (Ze) {
        return t.documentElement;
      } else {
        return s;
      }
    };
    const Ut = function (e) {
      return ve.call(e.ownerDocument || e, e, u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION, null);
    };
    const Ft = function (e) {
      e.normalize();
      const t = ve.call(e.ownerDocument || e, e, u.SHOW_TEXT | u.SHOW_COMMENT | u.SHOW_CDATA_SECTION | u.SHOW_PROCESSING_INSTRUCTION, null);
      let n = t.nextNode();
      while (n) {
        let e = n.data;
        b([Ie, Oe, Ne], t => {
          e = I(e, t, " ");
        });
        n.data = e;
        n = t.nextNode();
      }
    };
    const jt = function (e) {
      return e instanceof m && (typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || !(e.attributes instanceof f) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function");
    };
    const zt = function (e) {
      if (!z || typeof e != "object" || e === null) {
        return false;
      }
      try {
        return typeof z(e) == "number";
      } catch (e) {
        return false;
      }
    };
    function Gt(e, n, r) {
      b(e, e => {
        e.call(t, n, r, Ot);
      });
    }
    const Vt = function (e) {
      let n = null;
      Gt(ke.beforeSanitizeElements, e, null);
      if (jt(e)) {
        Lt(e);
        return true;
      }
      const r = It(e.nodeName);
      Gt(ke.uponSanitizeElement, e, {
        tagName: r,
        allowedTags: De
      });
      if (Xe && e.hasChildNodes() && !zt(e.firstElementChild) && D(/<[/\w!]/g, e.innerHTML) && D(/<[/\w!]/g, e.textContent)) {
        Lt(e);
        return true;
      }
      if (Xe && e.namespaceURI === mt && r === "style" && zt(e.firstElementChild)) {
        Lt(e);
        return true;
      }
      if (e.nodeType === de.progressingInstruction) {
        Lt(e);
        return true;
      }
      if (Xe && e.nodeType === de.comment && D(/<[/\w]/g, e.data)) {
        Lt(e);
        return true;
      }
      if (ze[r] || (!(Ve.tagCheck instanceof Function) || !Ve.tagCheck(r)) && !De[r]) {
        if (!ze[r] && Ht(r)) {
          if (je.tagNameCheck instanceof RegExp && D(je.tagNameCheck, r)) {
            return false;
          }
          if (je.tagNameCheck instanceof Function && je.tagNameCheck(r)) {
            return false;
          }
        }
        if (it && !at[r]) {
          const t = F(e) || e.parentNode;
          const n = U(e) || e.childNodes;
          if (n && t) {
            for (let r = n.length - 1; r >= 0; --r) {
              const i = M(n[r], true);
              t.insertBefore(i, L(e));
            }
          }
        }
        Lt(e);
        return true;
      }
      if (e instanceof l && !Pt(e)) {
        Lt(e);
        return true;
      } else if (r !== "noscript" && r !== "noembed" && r !== "noframes" || !D(/<\/no(script|embed|frames)/i, e.innerHTML)) {
        if (Ke && e.nodeType === de.text) {
          n = e.textContent;
          b([Ie, Oe, Ne], e => {
            n = I(n, e, " ");
          });
          if (e.textContent !== n) {
            T(t.removed, {
              element: e.cloneNode()
            });
            e.textContent = n;
          }
        }
        Gt(ke.afterSanitizeElements, e, null);
        return false;
      } else {
        Lt(e);
        return true;
      }
    };
    const _t = function (e, t, r) {
      if (Ge[t]) {
        return false;
      }
      if (tt && (t === "id" || t === "name") && (r in n || r in Nt)) {
        return false;
      }
      const i = Ue[t] || Ve.attributeCheck instanceof Function && Ve.attributeCheck(t, e);
      if (Ye && !Ge[t] && D(Re, t)) ;else if (_e && D(xe, t)) ;else if (!i || Ge[t]) {
        if ((!Ht(e) || (!(je.tagNameCheck instanceof RegExp) || !D(je.tagNameCheck, e)) && (!(je.tagNameCheck instanceof Function) || !je.tagNameCheck(e)) || (!(je.attributeNameCheck instanceof RegExp) || !D(je.attributeNameCheck, t)) && (!(je.attributeNameCheck instanceof Function) || !je.attributeNameCheck(t, e))) && (t !== "is" || !je.allowCustomizedBuiltInElements || (!(je.tagNameCheck instanceof RegExp) || !D(je.tagNameCheck, r)) && (!(je.tagNameCheck instanceof Function) || !je.tagNameCheck(r)))) {
          return false;
        }
      } else if (ht[t]) ;else if (D(Le, I(r, Ce, ""))) ;else if (t !== "src" && t !== "xlink:href" && t !== "href" || e === "script" || O(r, "data:") !== 0 || !lt[e]) {
        if (He && !D(Me, I(r, Ce, ""))) ;else if (r) {
          return false;
        }
      }
      return true;
    };
    const Yt = j({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]);
    const Ht = function (e) {
      return !Yt[w(e)] && D(Pe, e);
    };
    const Wt = function (e) {
      Gt(ke.beforeSanitizeAttributes, e, null);
      const n = e.attributes;
      if (!n || jt(e)) {
        return;
      }
      const r = {
        attrName: "",
        attrValue: "",
        keepAttr: true,
        allowedAttributes: Ue,
        forceKeepAttr: undefined
      };
      let i = n.length;
      while (i--) {
        const s = n[i];
        const o = s.name;
        const a = s.namespaceURI;
        const c = s.value;
        const l = It(o);
        const u = c;
        let h = o === "value" ? u : N(u);
        r.attrName = l;
        r.attrValue = h;
        r.keepAttr = true;
        r.forceKeepAttr = undefined;
        Gt(ke.uponSanitizeAttribute, e, r);
        h = r.attrValue;
        if (!!nt && (l === "id" || l === "name") && O(h, rt) !== 0) {
          Dt(o, e);
          h = rt + h;
        }
        if (Xe && D(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, h)) {
          Dt(o, e);
          continue;
        }
        if (l === "attributename" && k(h, "href")) {
          Dt(o, e);
          continue;
        }
        if (r.forceKeepAttr) {
          continue;
        }
        if (!r.keepAttr) {
          Dt(o, e);
          continue;
        }
        if (!We && D(/\/>/i, h)) {
          Dt(o, e);
          continue;
        }
        if (Ke) {
          b([Ie, Oe, Ne], e => {
            h = I(h, e, " ");
          });
        }
        const d = It(e.nodeName);
        if (_t(d, l, h)) {
          if (be && typeof R == "object" && typeof R.getAttributeType == "function") {
            if (a) ;else {
              switch (R.getAttributeType(d, l)) {
                case "TrustedHTML":
                  h = be.createHTML(h);
                  break;
                case "TrustedScriptURL":
                  h = be.createScriptURL(h);
              }
            }
          }
          if (h !== u) {
            try {
              if (a) {
                e.setAttributeNS(a, o, h);
              } else {
                e.setAttribute(o, h);
              }
              if (jt(e)) {
                Lt(e);
              } else {
                E(t.removed);
              }
            } catch (t) {
              Dt(o, e);
            }
          }
        } else {
          Dt(o, e);
        }
      }
      Gt(ke.afterSanitizeAttributes, e, null);
    };
    const Kt = function (e) {
      let t = null;
      const n = Ut(e);
      for (Gt(ke.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) {
        Gt(ke.uponSanitizeShadowNode, t, null);
        Vt(t);
        Wt(t);
        if (t.content instanceof s) {
          Kt(t.content);
        }
      }
      Gt(ke.afterSanitizeShadowDOM, e, null);
    };
    const Xt = function (e) {
      if (e.nodeType === de.element && e.shadowRoot instanceof s) {
        const t = e.shadowRoot;
        Xt(t);
        Kt(t);
      }
      const t = e.childNodes;
      if (!t) {
        return;
      }
      const n = [];
      b(t, e => {
        T(n, e);
      });
      for (const e of n) {
        Xt(e);
      }
    };
    t.sanitize = function (e, n = {}) {
      let i = null;
      let o = null;
      let a = null;
      let c = null;
      bt = !e;
      if (bt) {
        e = "<!-->";
      }
      if (typeof e != "string" && !zt(e) && typeof (e = V(e)) != "string") {
        throw B("dirty is not a string, aborting");
      }
      if (!t.isSupported) {
        return e;
      }
      if (!qe) {
        xt(n);
      }
      t.removed = [];
      if (typeof e == "string") {
        st = false;
      }
      if (st) {
        const t = e.nodeName;
        if (typeof t == "string") {
          const e = It(t);
          if (!De[e] || ze[e]) {
            throw B("root node is forbidden and cannot be sanitized in-place");
          }
        }
        Xt(e);
      } else if (zt(e)) {
        i = Bt("<!---->");
        o = i.ownerDocument.importNode(e, true);
        if (o.nodeType === de.element && o.nodeName === "BODY" || o.nodeName === "HTML") {
          i = o;
        } else {
          i.appendChild(o);
        }
        Xt(o);
      } else {
        if (!Je && !Ke && !Ze && e.indexOf("<") === -1) {
          if (be && et) {
            return be.createHTML(e);
          } else {
            return e;
          }
        }
        i = Bt(e);
        if (!i) {
          if (Je) {
            return null;
          } else if (et) {
            return ye;
          } else {
            return "";
          }
        }
      }
      if (i && Qe) {
        Lt(i.firstChild);
      }
      const l = Ut(st ? e : i);
      while (a = l.nextNode()) {
        Vt(a);
        Wt(a);
        if (a.content instanceof s) {
          Kt(a.content);
        }
      }
      if (st) {
        if (Ke) {
          Ft(e);
        }
        return e;
      }
      if (Je) {
        if (Ke) {
          Ft(i);
        }
        if ($e) {
          for (c = Ae.call(i.ownerDocument); i.firstChild;) {
            c.appendChild(i.firstChild);
          }
        } else {
          c = i;
        }
        if (Ue.shadowroot || Ue.shadowrootmode) {
          c = Se.call(r, c, true);
        }
        return c;
      }
      let u = Ze ? i.outerHTML : i.innerHTML;
      if (Ze && De["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && D(ue, i.ownerDocument.doctype.name)) {
        u = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + u;
      }
      if (Ke) {
        b([Ie, Oe, Ne], e => {
          u = I(u, e, " ");
        });
      }
      if (be && et) {
        return be.createHTML(u);
      } else {
        return u;
      }
    };
    t.setConfig = function () {
      xt(arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {});
      qe = true;
    };
    t.clearConfig = function () {
      Ot = null;
      qe = false;
    };
    t.isValidAttribute = function (e, t, n) {
      if (!Ot) {
        xt({});
      }
      const r = It(e);
      const i = It(t);
      return _t(r, i, n);
    };
    t.addHook = function (e, t) {
      if (typeof t == "function") {
        T(ke[e], t);
      }
    };
    t.removeHook = function (e, t) {
      if (t !== undefined) {
        const n = y(ke[e], t);
        if (n === -1) {
          return undefined;
        } else {
          return v(ke[e], n, 1)[0];
        }
      }
      return E(ke[e]);
    };
    t.removeHooks = function (e) {
      ke[e] = [];
    };
    t.removeAllHooks = function () {
      ke = me();
    };
    return t;
  }
  return ge();
}();