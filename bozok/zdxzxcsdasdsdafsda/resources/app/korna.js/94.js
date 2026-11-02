var r;
function i() {
  if (r === undefined) {
    r = Boolean(window && document && document.all && !window.atob);
  }
  return r;
}
var s = function () {
  var e = {};
  return function (t) {
    if (e[t] === undefined) {
      var n = document.querySelector(t);
      if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) {
        try {
          n = n.contentDocument.head;
        } catch (e) {
          n = null;
        }
      }
      e[t] = n;
    }
    return e[t];
  };
}();
var o = [];
function a(e) {
  var t = -1;
  for (var n = 0; n < o.length; n++) {
    if (o[n].identifier === e) {
      t = n;
      break;
    }
  }
  return t;
}
function c(e, t) {
  var n = {};
  var r = [];
  for (var i = 0; i < e.length; i++) {
    var s = e[i];
    var c = t.base ? s[0] + t.base : s[0];
    var l = n[c] || 0;
    var u = `${c} ${l}`;
    n[c] = l + 1;
    var h = a(u);
    var d = {
      css: s[1],
      media: s[2],
      sourceMap: s[3]
    };
    if (h !== -1) {
      o[h].references++;
      o[h].updater(d);
    } else {
      o.push({
        identifier: u,
        updater: g(d, t),
        references: 1
      });
    }
    r.push(u);
  }
  return r;
}
function l(e) {
  var t = document.createElement("style");
  var r = e.attributes || {};
  if (r.nonce === undefined) {
    var i = require.nc;
    if (i) {
      r.nonce = i;
    }
  }
  Object.keys(r).forEach(function (e) {
    t.setAttribute(e, r[e]);
  });
  if (typeof e.insert == "function") {
    e.insert(t);
  } else {
    var o = s(e.insert || "head");
    if (!o) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }
    o.appendChild(t);
  }
  return t;
}
var u;
u = [];
function h(e, t) {
  u[e] = t;
  return u.filter(Boolean).join("\n");
}
function d(e, t, n, r) {
  var i = n ? "" : r.media ? `@media ${r.media} {${r.css}}` : r.css;
  if (e.styleSheet) {
    e.styleSheet.cssText = h(t, i);
  } else {
    var s = document.createTextNode(i);
    var o = e.childNodes;
    if (o[t]) {
      e.removeChild(o[t]);
    }
    if (o.length) {
      e.insertBefore(s, o[t]);
    } else {
      e.appendChild(s);
    }
  }
}
function p(e, t, n) {
  var r = n.css;
  var i = n.media;
  var s = n.sourceMap;
  if (i) {
    e.setAttribute("media", i);
  } else {
    e.removeAttribute("media");
  }
  if (s && typeof btoa != "undefined") {
    r += `
/*# sourceMappingURL=data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(s))))} */`;
  }
  if (e.styleSheet) {
    e.styleSheet.cssText = r;
  } else {
    while (e.firstChild) {
      e.removeChild(e.firstChild);
    }
    e.appendChild(document.createTextNode(r));
  }
}
var f = null;
var m = 0;
function g(e, t) {
  var n;
  var r;
  var i;
  if (t.singleton) {
    var s = m++;
    n = f ||= l(t);
    r = d.bind(null, n, s, false);
    i = d.bind(null, n, s, true);
  } else {
    n = l(t);
    r = p.bind(null, n, t);
    i = function () {
      (function (e) {
        if (e.parentNode === null) {
          return false;
        }
        e.parentNode.removeChild(e);
      })(n);
    };
  }
  r(e);
  return function (t) {
    if (t) {
      if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) {
        return;
      }
      r(e = t);
    } else {
      i();
    }
  };
}
module.exports = function (e, t) {
  if (!(t = t || {}).singleton && typeof t.singleton != "boolean") {
    t.singleton = i();
  }
  var n = c(e = e || [], t);
  return function (e) {
    e = e || [];
    if (Object.prototype.toString.call(e) === "[object Array]") {
      for (var r = 0; r < n.length; r++) {
        var i = a(n[r]);
        o[i].references--;
      }
      var s = c(e, t);
      for (var l = 0; l < n.length; l++) {
        var u = a(n[l]);
        if (o[u].references === 0) {
          o[u].updater();
          o.splice(u, 1);
        }
      }
      n = s;
    }
  };
};