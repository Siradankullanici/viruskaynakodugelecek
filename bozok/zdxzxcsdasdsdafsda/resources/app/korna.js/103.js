var e = require("./8.js");
var t = require("./39.js");
(function (e) {
  "use strict";

  if (!e.setImmediate) {
    var n;
    var r;
    var i;
    var s;
    var o;
    var a = 1;
    var c = {};
    var l = false;
    var u = e.document;
    var h = Object.getPrototypeOf && Object.getPrototypeOf(e);
    h = h && h.setTimeout ? h : e;
    if ({}.toString.call(e.process) === "[object process]") {
      n = function (e) {
        t.nextTick(function () {
          p(e);
        });
      };
    } else if (!function () {
      if (e.postMessage && !e.importScripts) {
        var t = true;
        var n = e.onmessage;
        e.onmessage = function () {
          t = false;
        };
        e.postMessage("", "*");
        e.onmessage = n;
        return t;
      }
    }()) {
      if (e.MessageChannel) {
        (i = new MessageChannel()).port1.onmessage = function (e) {
          p(e.data);
        };
        n = function (e) {
          i.port2.postMessage(e);
        };
      } else if (u && "onreadystatechange" in u.createElement("script")) {
        r = u.documentElement;
        n = function (e) {
          var t = u.createElement("script");
          t.onreadystatechange = function () {
            p(e);
            t.onreadystatechange = null;
            r.removeChild(t);
            t = null;
          };
          r.appendChild(t);
        };
      } else {
        n = function (e) {
          setTimeout(p, 0, e);
        };
      }
    } else {
      s = "setImmediate$" + Math.random() + "$";
      o = function (t) {
        if (t.source === e && typeof t.data == "string" && t.data.indexOf(s) === 0) {
          p(+t.data.slice(s.length));
        }
      };
      if (e.addEventListener) {
        e.addEventListener("message", o, false);
      } else {
        e.attachEvent("onmessage", o);
      }
      n = function (t) {
        e.postMessage(s + t, "*");
      };
    }
    h.setImmediate = function (e) {
      if (typeof e != "function") {
        e = new Function("" + e);
      }
      for (var t = new Array(arguments.length - 1), r = 0; r < t.length; r++) {
        t[r] = arguments[r + 1];
      }
      var i = {
        callback: e,
        args: t
      };
      c[a] = i;
      n(a);
      return a++;
    };
    h.clearImmediate = d;
  }
  function d(e) {
    delete c[e];
  }
  function p(e) {
    if (l) {
      setTimeout(p, 0, e);
    } else {
      var t = c[e];
      if (t) {
        l = true;
        try {
          (function (e) {
            var t = e.callback;
            var n = e.args;
            switch (n.length) {
              case 0:
                t();
                break;
              case 1:
                t(n[0]);
                break;
              case 2:
                t(n[0], n[1]);
                break;
              case 3:
                t(n[0], n[1], n[2]);
                break;
              default:
                t.apply(undefined, n);
            }
          })(t);
        } finally {
          d(e);
          l = false;
        }
      }
    }
  }
})(typeof self == "undefined" ? e === undefined ? this : e : self);