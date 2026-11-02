var r = "{";
var i = "}";
var s = ",";
var o = "#";
var a = "<";
var c = ">";
var l = "</";
var u = "/>";
var h = "'";
var d = "offset:";
var p = ["number", "date", "time", "ordinal", "duration", "spellout"];
var f = ["plural", "select", "selectordinal"];
function m(e, t) {
  var n = e.pattern;
  var r = n.length;
  var s = [];
  var o = e.index;
  var a = g(e, t);
  if (a) {
    s.push(a);
  }
  if (a && e.tokens) {
    e.tokens.push(["text", n.slice(o, e.index)]);
  }
  while (e.index < r) {
    if (n[e.index] === i) {
      if (!t) {
        throw k(e);
      }
      break;
    }
    if (t && e.tagsType && n.slice(e.index, e.index + 2) === l) {
      break;
    }
    s.push(E(e));
    o = e.index;
    if (a = g(e, t)) {
      s.push(a);
    }
    if (a && e.tokens) {
      e.tokens.push(["text", n.slice(o, e.index)]);
    }
  }
  return s;
}
function g(e, t) {
  var n = e.pattern;
  for (var s = n.length, c = t === "plural" || t === "selectordinal", l = !!e.tagsType, u = t === "{style}", d = ""; e.index < s;) {
    var p = n[e.index];
    if (p === r || p === i || c && p === o || l && p === a || u && b(p.charCodeAt(0))) {
      break;
    }
    if (p === h) {
      if ((p = n[++e.index]) === h) {
        d += p;
        ++e.index;
      } else if (p === r || p === i || c && p === o || l && p === a || u) {
        for (d += p; ++e.index < s;) {
          if ((p = n[e.index]) === h && n[e.index + 1] === h) {
            d += h;
            ++e.index;
          } else {
            if (p === h) {
              ++e.index;
              break;
            }
            d += p;
          }
        }
      } else {
        d += h;
      }
    } else {
      d += p;
      ++e.index;
    }
  }
  return d;
}
function b(e) {
  return e >= 9 && e <= 13 || e === 32 || e === 133 || e === 160 || e === 6158 || e >= 8192 && e <= 8205 || e === 8232 || e === 8233 || e === 8239 || e === 8287 || e === 8288 || e === 12288 || e === 65279;
}
function y(e) {
  for (var t = e.pattern, n = t.length, r = e.index; e.index < n && b(t.charCodeAt(e.index));) {
    ++e.index;
  }
  if (r < e.index && e.tokens) {
    e.tokens.push(["space", e.pattern.slice(r, e.index)]);
  }
}
function E(e) {
  var t = e.pattern;
  if (t[e.index] === o) {
    if (e.tokens) {
      e.tokens.push(["syntax", o]);
    }
    ++e.index;
    return [o];
  }
  var n = function (e) {
    var t = e.tagsType;
    if (!t || e.pattern[e.index] !== a) {
      return;
    }
    if (e.pattern.slice(e.index, e.index + 2) === l) {
      throw k(e, null, "closing tag without matching opening tag");
    }
    if (e.tokens) {
      e.tokens.push(["syntax", a]);
    }
    ++e.index;
    var n = T(e, true);
    if (!n) {
      throw k(e, "placeholder id");
    }
    if (e.tokens) {
      e.tokens.push(["id", n]);
    }
    y(e);
    if (e.pattern.slice(e.index, e.index + 2) === u) {
      if (e.tokens) {
        e.tokens.push(["syntax", u]);
      }
      e.index += 2;
      return [n, t];
    }
    if (e.pattern[e.index] !== c) {
      throw k(e, c);
    }
    if (e.tokens) {
      e.tokens.push(["syntax", c]);
    }
    ++e.index;
    var r = m(e, t);
    var i = e.index;
    if (e.pattern.slice(e.index, e.index + 2) !== l) {
      throw k(e, l + n + c);
    }
    if (e.tokens) {
      e.tokens.push(["syntax", l]);
    }
    e.index += 2;
    var s = T(e, true);
    if (s && e.tokens) {
      e.tokens.push(["id", s]);
    }
    if (n !== s) {
      e.index = i;
      throw k(e, l + n + c, l + s + c);
    }
    y(e);
    if (e.pattern[e.index] !== c) {
      throw k(e, c);
    }
    if (e.tokens) {
      e.tokens.push(["syntax", c]);
    }
    ++e.index;
    return [n, t, {
      children: r
    }];
  }(e);
  if (n) {
    return n;
  }
  if (t[e.index] !== r) {
    throw k(e, r);
  }
  if (e.tokens) {
    e.tokens.push(["syntax", r]);
  }
  ++e.index;
  y(e);
  var h = T(e);
  if (!h) {
    throw k(e, "placeholder id");
  }
  if (e.tokens) {
    e.tokens.push(["id", h]);
  }
  y(e);
  var f = t[e.index];
  if (f === i) {
    if (e.tokens) {
      e.tokens.push(["syntax", i]);
    }
    ++e.index;
    return [h];
  }
  if (f !== s) {
    throw k(e, ", or }");
  }
  if (e.tokens) {
    e.tokens.push(["syntax", s]);
  }
  ++e.index;
  y(e);
  var g;
  var b = T(e);
  if (!b) {
    throw k(e, "placeholder type");
  }
  if (e.tokens) {
    e.tokens.push(["type", b]);
  }
  y(e);
  if ((f = t[e.index]) === i) {
    if (e.tokens) {
      e.tokens.push(["syntax", i]);
    }
    if (b === "plural" || b === "selectordinal" || b === "select") {
      throw k(e, b + " sub-messages");
    }
    ++e.index;
    return [h, b];
  }
  if (f !== s) {
    throw k(e, ", or }");
  }
  if (e.tokens) {
    e.tokens.push(["syntax", s]);
  }
  ++e.index;
  y(e);
  if (b === "plural" || b === "selectordinal") {
    var E = function (e) {
      var t = e.pattern;
      var n = t.length;
      var r = 0;
      if (t.slice(e.index, e.index + 7) === d) {
        if (e.tokens) {
          e.tokens.push(["offset", "offset"], ["syntax", ":"]);
        }
        e.index += 7;
        y(e);
        var i = e.index;
        while (e.index < n && A(t.charCodeAt(e.index))) {
          ++e.index;
        }
        if (i === e.index) {
          throw k(e, "offset number");
        }
        if (e.tokens) {
          e.tokens.push(["number", t.slice(i, e.index)]);
        }
        r = +t.slice(i, e.index);
      }
      return r;
    }(e);
    y(e);
    g = [h, b, E, w(e, b)];
  } else if (b === "select") {
    g = [h, b, w(e, b)];
  } else if (p.indexOf(b) >= 0) {
    g = [h, b, v(e)];
  } else {
    var S = e.index;
    var I = v(e);
    y(e);
    if (t[e.index] === r) {
      e.index = S;
      I = w(e, b);
    }
    g = [h, b, I];
  }
  y(e);
  if (t[e.index] !== i) {
    throw k(e, i);
  }
  if (e.tokens) {
    e.tokens.push(["syntax", i]);
  }
  ++e.index;
  return g;
}
function T(e, t) {
  var n = e.pattern;
  for (var l = n.length, u = ""; e.index < l;) {
    var d = n[e.index];
    if (d === r || d === i || d === s || d === o || d === h || b(d.charCodeAt(0)) || t && (d === a || d === c || d === "/")) {
      break;
    }
    u += d;
    ++e.index;
  }
  return u;
}
function v(e) {
  var t = e.index;
  var n = g(e, "{style}");
  if (!n) {
    throw k(e, "placeholder style name");
  }
  if (e.tokens) {
    e.tokens.push(["style", e.pattern.slice(t, e.index)]);
  }
  return n;
}
function A(e) {
  return e >= 48 && e <= 57;
}
function w(e, t) {
  for (var n = e.pattern, r = n.length, s = {}; e.index < r && n[e.index] !== i;) {
    var o = T(e);
    if (!o) {
      throw k(e, "sub-message selector");
    }
    if (e.tokens) {
      e.tokens.push(["selector", o]);
    }
    y(e);
    s[o] = S(e, t);
    y(e);
  }
  if (!s.other && f.indexOf(t) >= 0) {
    throw k(e, null, null, "\"other\" sub-message must be specified in " + t);
  }
  return s;
}
function S(e, t) {
  if (e.pattern[e.index] !== r) {
    throw k(e, "{ to start sub-message");
  }
  if (e.tokens) {
    e.tokens.push(["syntax", r]);
  }
  ++e.index;
  var n = m(e, t);
  if (e.pattern[e.index] !== i) {
    throw k(e, "} to end sub-message");
  }
  if (e.tokens) {
    e.tokens.push(["syntax", i]);
  }
  ++e.index;
  return n;
}
function k(e, t, n, r) {
  var i = e.pattern;
  var s = i.slice(0, e.index).split(/\r?\n/);
  var o = e.index;
  var a = s.length;
  var c = s.slice(-1)[0].length;
  n = n || (e.index >= i.length ? "end of message pattern" : T(e) || i[e.index]);
  r ||= function (e, t) {
    if (e) {
      return "Expected " + e + " but found " + t;
    } else {
      return "Unexpected " + t + " found";
    }
  }(t, n);
  return new I(r += " in " + i.replace(/\r?\n/g, "\n"), t, n, o, a, c);
}
function I(e, t, n, r, i, s) {
  Error.call(this, e);
  this.name = "SyntaxError";
  this.message = e;
  this.expected = t;
  this.found = n;
  this.offset = r;
  this.line = i;
  this.column = s;
}
exports = module.exports = function (e, t) {
  return m({
    pattern: String(e),
    index: 0,
    tagsType: t && t.tagsType || null,
    tokens: t && t.tokens || null
  }, "");
};
I.prototype = Object.create(Error.prototype);
exports.SyntaxError = I;