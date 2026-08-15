'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const inFile = process.argv[2] || 'final_decoded_readable.js';
const outFile = process.argv[3] || 'final_decoded_clean.js';

const src = fs.readFileSync(path.resolve(inFile), 'utf8');

// ---------------------------------------------------------------------------
// 1. Lexing: mark which offsets are inside string literals or comments so we
//    never scan `function`, `_0x2051D4[`, or `_0x0F3EF55[` inside them.
// ---------------------------------------------------------------------------
function lex(src) {
  const state = new Uint8Array(src.length); // 0=code 1=string 2=linecomment 3=blockcomment
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') {
      const start = i;
      i += 2;
      while (i < n && src[i] !== '\n') { state[i] = 2; i++; }
      state[start] = 2; state[start + 1] = 2;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      const start = i;
      i += 2;
      state[start] = 3; state[start + 1] = 3;
      while (i < n) {
        state[i] = 3;
        if (src[i] === '*' && src[i + 1] === '/') { state[i + 1] = 3; i += 2; break; }
        i++;
      }
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const start = i;
      state[start] = 1;
      i++;
      while (i < n) {
        state[i] = 1;
        if (src[i] === '\\') { state[i + 1] = 1; i += 2; continue; }
        if (src[i] === c) { i++; break; }
        i++;
      }
      continue;
    }
    i++;
  }
  return state;
}

const T = lex(src);

// ---------------------------------------------------------------------------
// 2. JS string literal decoder -> unescaped value.
// ---------------------------------------------------------------------------
function parseJsString(literal) {
  const q = literal[0];
  let out = '';
  let i = 1;
  const n = literal.length - 1;
  while (i < n) {
    const c = literal[i];
    if (c === '\\') {
      const e = literal[i + 1];
      switch (e) {
        case 'n': out += '\n'; break;
        case 't': out += '\t'; break;
        case 'r': out += '\r'; break;
        case 'b': out += '\b'; break;
        case 'f': out += '\f'; break;
        case 'v': out += '\v'; break;
        case '0': out += '\0'; break;
        case 'x': out += String.fromCharCode(parseInt(literal.substr(i + 2, 2), 16)); i += 2; break;
        case 'u': {
          if (literal[i + 2] === '{') {
            const end = literal.indexOf('}', i + 3);
            out += String.fromCodePoint(parseInt(literal.substr(i + 3, end - i - 3), 16));
            i = end;
          } else {
            out += String.fromCharCode(parseInt(literal.substr(i + 2, 4), 16));
            i += 4;
          }
          break;
        }
        default: out += e; break;
      }
      i += 2;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// 3. Find and parse the constant array `_0x0F3EF55=[...]`. No eval.
// ---------------------------------------------------------------------------
function findArray() {
  const m = src.match(/(?:var|const|let)\s+_0x0F3EF55\s*=\s*\[/);
  if (!m) return null;
  const arrStart = m.index + m[0].length - 1;
  let depth = 0;
  for (let i = arrStart; i < src.length; i++) {
    if (T[i] !== 0) continue;
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) return src.slice(m.index, i + 1); }
  }
  return null;
}

function parseArrayLiteral(text) {
  const arr = [];
  let i = text.indexOf('[') + 1;
  const n = text.length - 1;
  while (i < n) {
    while (i < n && /\s/.test(text[i])) i++;
    if (text[i] === ',') { i++; continue; }
    if (text[i] === '"' || text[i] === "'") {
      let j = i + 1;
      while (j < n) {
        if (text[j] === '\\') { j += 2; continue; }
        if (text[j] === text[i]) break;
        j++;
      }
      arr.push(parseJsString(text.slice(i, j + 1)));
      i = j + 1;
    } else if (/[0-9]/.test(text[i]) || text[i] === '-' || text[i] === '.') {
      let j = i;
      while (j < n && /[0-9a-zA-Z_.x]/.test(text[j])) j++;
      const tok = text.slice(i, j);
      const v = parseInt(tok, 10);
      arr.push(Number.isNaN(v) ? Number(tok) : v);
      i = j;
    } else {
      const w = text.slice(i).match(/^[A-Za-z_$][A-Za-z0-9_$]*/);
      if (w) {
        const kw = w[0];
        arr.push(kw === 'undefined' ? undefined : kw === 'null' ? null : kw === 'true' ? true : kw === 'false' ? false : undefined);
        i += w[0].length;
      } else i++;
    }
  }
  return arr;
}

// ---------------------------------------------------------------------------
// 4. Find the pool string `_0x2051D4="..."` (the largest string literal ever
//    assigned to a variable named `_0x2051D4`; byte-buffer locals use arrays).
// ---------------------------------------------------------------------------
function readStringAt(i) {
  if (src[i] !== '"' && src[i] !== "'" && src[i] !== '`') return null;
  const q = src[i];
  let j = i + 1;
  while (j < src.length) {
    if (src[j] === '\\') { j += 2; continue; }
    if (src[j] === q) return src.slice(i, j + 1);
    j++;
  }
  return null;
}

function findPool() {
  const re = /_0x2051D4\s*=\s*/g;
  let m;
  let best = null;
  let bestLen = 0;
  while ((m = re.exec(src))) {
    if (T[m.index] !== 0) continue;
    let j = re.lastIndex;
    while (j < src.length && /\s/.test(src[j])) j++;
    const lit = readStringAt(j);
    if (!lit) continue;
    const val = parseJsString(lit);
    if (val.length > bestLen) { bestLen = val.length; best = val; }
  }
  return best;
}

// ---------------------------------------------------------------------------
// 5. Scope scanning. A synthetic global scope wraps the whole file; every
//    top-level function is a direct child of it. Handles function
//    declarations, `NAME = function`, `NAME: function`, and arrow scopes.
// ---------------------------------------------------------------------------
const GLOBAL = { name: '<global>', openBrace: 0, closeBrace: src.length, parent: null, isGlobal: true };
const scopes = [GLOBAL];

function scanScopes() {
  const re = /(?:function\s+([A-Za-z0-9_$]+)\s*\(|([A-Za-z0-9_$]+)\s*=\s*function\s*\(|([A-Za-z0-9_$]+)\s*:\s*function\s*\(|((?:\([^)]*\)|[A-Za-z0-9_$]+))\s*=>\s*\{)/g;
  const n = src.length;
  const stack = [GLOBAL];
  let m;
  while ((m = re.exec(src))) {
    const idx = m.index;
    if (T[idx] !== 0) continue;
    const openBrace = src.indexOf('{', idx);
    if (openBrace < 0 || T[openBrace] !== 0) continue;
    while (stack.length > 1 && stack[stack.length - 1].closeBrace < openBrace) stack.pop();
    const name = m[1] || m[2] || m[3] || '';
    const sc = {
      name,
      openBrace,
      closeBrace: null,
      bodyStart: openBrace + 1,
      parent: stack[stack.length - 1],
    };
    let depth = 0;
    for (let i = openBrace; i < n; i++) {
      if (T[i] !== 0) continue;
      if (src[i] === '{') depth++;
      else if (src[i] === '}') {
        depth--;
        if (depth === 0) { sc.closeBrace = i; break; }
      }
    }
    if (sc.closeBrace !== null) {
      scopes.push(sc);
      stack.push(sc);
    }
  }
}
scanScopes();

// ---------------------------------------------------------------------------
// 6. Own body (code excluding nested function bodies).
// ---------------------------------------------------------------------------
function ownBody(sc) {
  if (sc.closeBrace === null) return '';
  const children = scopes.filter(c => c.parent === sc && !c.isGlobal).sort((a, b) => a.openBrace - b.openBrace);
  let out = '';
  let pos = sc.bodyStart;
  for (const c of children) {
    out += src.slice(pos, c.openBrace);
    pos = c.closeBrace + 1;
  }
  out += src.slice(pos, sc.closeBrace);
  return out;
}

// ---------------------------------------------------------------------------
// 7. Find the first quoted string literal in code text whose unescaped length
//    is >= 70 (the base91 alphabet) and return its unescaped value.
// ---------------------------------------------------------------------------
function extractLongString(text) {
  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (c === '"' || c === "'") {
      let j = i + 1;
      let closed = false;
      while (j < n) {
        if (text[j] === '\\') { j += 2; continue; }
        if (text[j] === c) { closed = true; break; }
        j++;
      }
      if (closed) {
        const val = parseJsString(text.slice(i, j + 1));
        if (val.length >= 70) return val;
        i = j + 1;
        continue;
      }
      break;
    }
    i++;
  }
  return null;
}

// ---------------------------------------------------------------------------
// 8. Classify each scope as decoder (base91 alphabet + `return _0x2D8BAC(`)
//    or wrapper (`return DECODER(_0x2051D4[` with DECODER != _0x2D8BAC).
//    Builds scope -> { wrapperName -> alphabet } for every scope.
// ---------------------------------------------------------------------------
const scopeMap = new Map(); // scope -> Map(wrapperName -> alphabet)

function classify() {
  const decoderNameByScope = new Map();
  for (const sc of scopes) {
    if (sc.isGlobal) continue;
    const body = ownBody(sc);
    if (!body) continue;
    if (/return\s+_0x2D8BAC\s*\(/.test(body)) {
      const alpha = extractLongString(body);
      if (alpha) {
        decoderNameByScope.set(sc, alpha);
        continue;
      }
    }
    const wm = body.match(/return\s+([A-Za-z0-9_$]+)\s*\(\s*_0x2051D4\s*\[/);
    if (wm) {
      const dname = wm[1];
      if (dname === '_0x2D8BAC') continue;
      const parent = sc.parent;
      if (!parent) continue;
      let alpha = null;
      for (const c of scopes) {
        if (c.parent === parent && c.name === dname && decoderNameByScope.has(c)) {
          alpha = decoderNameByScope.get(c);
          break;
        }
      }
      if (alpha) {
        if (!scopeMap.has(parent)) scopeMap.set(parent, new Map());
        scopeMap.get(parent).set(sc.name, alpha);
      }
    }
  }
}
classify();

// ---------------------------------------------------------------------------
// 9. Resolve a wrapper call at position `pos` to its alphabet by walking from
//    the innermost enclosing scope outward.
// ---------------------------------------------------------------------------
function innermostScopeAt(pos) {
  let best = null;
  for (const sc of scopes) {
    if (sc.isGlobal) continue;
    if (sc.openBrace <= pos && pos <= sc.closeBrace) {
      if (!best || sc.openBrace > best.openBrace) best = sc;
    }
  }
  return best || GLOBAL;
}

function resolveAlphabetAt(pos, wrapperName) {
  let sc = innermostScopeAt(pos);
  while (sc) {
    const m = scopeMap.get(sc);
    if (m && m.has(wrapperName)) return m.get(wrapperName);
    sc = sc.parent;
  }
  return null;
}

// ---------------------------------------------------------------------------
// 10. Base91 decoder (mirror of `_0x162B62`).
// ---------------------------------------------------------------------------
function base91Decode(str, alphabet) {
  const N = 91, L = 8191;
  const out = [];
  let v = -1, bf = 0, n = 0;
  for (let i = 0; i < str.length; i++) {
    const c = alphabet.indexOf(str[i]);
    if (c < 0) continue;
    if (v < 0) v = c;
    else {
      v += c * N;
      bf |= v << n;
      n += (v & L) > 88 ? 13 : 14;
      while (n > 7) { out.push(bf & 255); bf >>= 8; n -= 8; }
      v = -1;
    }
  }
  if (v > -1) out.push((bf | (v << n)) & 255);
  return out;
}

function utf8BytesToString(bytes) {
  let s = '';
  let i = 0;
  const n = bytes.length;
  while (i < n) {
    const b = bytes[i];
    if (b < 0x80) { s += String.fromCharCode(b); i++; }
    else if (b < 0xE0) { s += String.fromCharCode(((b & 0x1F) << 6) | (bytes[i + 1] & 0x3F)); i += 2; }
    else if (b < 0xF0) { s += String.fromCharCode(((b & 0x0F) << 12) | ((bytes[i + 1] & 0x3F) << 6) | (bytes[i + 2] & 0x3F)); i += 3; }
    else {
      let cp = ((b & 0x07) << 18) | ((bytes[i + 1] & 0x3F) << 12) | ((bytes[i + 2] & 0x3F) << 6) | (bytes[i + 3] & 0x3F);
      cp -= 0x10000;
      s += String.fromCharCode(0xD800 + (cp >> 10), 0xDC00 + (cp & 0x3FF));
      i += 4;
    }
  }
  return s;
}

function decodeBase91(str, alphabet) {
  return utf8BytesToString(base91Decode(str, alphabet));
}

// ---------------------------------------------------------------------------
// 11. Main pass: collect replacements (start,end,text), sort, apply.
// ---------------------------------------------------------------------------
const arr = parseArrayLiteral(findArray());
const pool = findPool();
if (!pool) { console.error('Could not locate pool string _0x2051D4.'); process.exit(1); }
if (!arr) { console.error('Could not locate array _0x0F3EF55.'); process.exit(1); }

function resolveArrayRef(idxStr) {
  const n = parseInt(idxStr, 10);
  if (Number.isNaN(n) || n < 0 || n >= arr.length) return { oob: true };
  return arr[n];
}

const repl = [];

// (a) wrapper calls: NAME(ARG1, ARG2)
const callRe = /([A-Za-z_$][A-Za-z0-9_$]*)\s*\(\s*((?:_0x0F3EF55\s*\[\s*\d+\s*\]|\d+))\s*,\s*((?:_0x0F3EF55\s*\[\s*\d+\s*\]|\d+))\s*\)/g;
let m;
while ((m = callRe.exec(src))) {
  if (T[m.index] !== 0) continue;
  const wrapperName = m[1];
  const aMatch = m[2].match(/^_0x0F3EF55\s*\[\s*(\d+)\s*\]$/);
  const bMatch = m[3].match(/^_0x0F3EF55\s*\[\s*(\d+)\s*\]$/);
  const a = aMatch ? resolveArrayRef(aMatch[1]) : parseInt(m[2], 10);
  const b = bMatch ? resolveArrayRef(bMatch[1]) : parseInt(m[3], 10);
  if ((a && a.oob) || (b && b.oob)) continue;
  if (typeof a !== 'number' || typeof b !== 'number' || a < 0 || b < 0) continue;
  const alphabet = resolveAlphabetAt(m.index, wrapperName);
  if (!alphabet) continue;
  const chunk = pool.substr(a, b);
  const decoded = decodeBase91(chunk, alphabet);
  repl.push({ start: m.index, end: m.index + m[0].length, text: JSON.stringify(decoded) });
}

// (b) array references: _0x0F3EF55[n]
const arrRe = /_0x0F3EF55\s*\[\s*(\d+)\s*\]/g;
while ((m = arrRe.exec(src))) {
  if (T[m.index] !== 0) continue;
  const val = resolveArrayRef(m[1]);
  if (val && val.oob) continue;
  const text = typeof val === 'number' ? String(val)
    : val === null ? 'null'
    : val === undefined ? 'undefined'
    : JSON.stringify(val);
  repl.push({ start: m.index, end: m.index + m[0].length, text });
}

repl.sort((a, b) => a.start - b.start);
let out = '';
let pos = 0;
for (const r of repl) {
  if (r.start < pos) continue; // already covered by a wrapping replacement
  out += src.slice(pos, r.start);
  out += r.text;
  pos = r.end;
}
out += src.slice(pos);

fs.writeFileSync(path.resolve(outFile), out, 'utf8');
console.log('done. replacements: ' + repl.length + '  output: ' + outFile);