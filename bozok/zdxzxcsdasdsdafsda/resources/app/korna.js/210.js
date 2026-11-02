const r = require("./1.js");
const i = require("./4.js");
module.exports = class {
  constructor(e) {
    this.runtime = e;
  }
  getPrimitives() {
    return {
      operator_add: this.add,
      operator_subtract: this.subtract,
      operator_multiply: this.multiply,
      operator_divide: this.divide,
      operator_lt: this.lt,
      operator_equals: this.equals,
      operator_gt: this.gt,
      operator_and: this.and,
      operator_or: this.or,
      operator_not: this.not,
      operator_random: this.random,
      operator_join: this.join,
      operator_letter_of: this.letterOf,
      operator_length: this.length,
      operator_contains: this.contains,
      operator_mod: this.mod,
      operator_round: this.round,
      operator_mathop: this.mathop
    };
  }
  add(e) {
    return r.toNumber(e.NUM1) + r.toNumber(e.NUM2);
  }
  subtract(e) {
    return r.toNumber(e.NUM1) - r.toNumber(e.NUM2);
  }
  multiply(e) {
    return r.toNumber(e.NUM1) * r.toNumber(e.NUM2);
  }
  divide(e) {
    return r.toNumber(e.NUM1) / r.toNumber(e.NUM2);
  }
  lt(e) {
    return r.compare(e.OPERAND1, e.OPERAND2) < 0;
  }
  equals(e) {
    return r.compare(e.OPERAND1, e.OPERAND2) === 0;
  }
  gt(e) {
    return r.compare(e.OPERAND1, e.OPERAND2) > 0;
  }
  and(e) {
    return r.toBoolean(e.OPERAND1) && r.toBoolean(e.OPERAND2);
  }
  or(e) {
    return r.toBoolean(e.OPERAND1) || r.toBoolean(e.OPERAND2);
  }
  not(e) {
    return !r.toBoolean(e.OPERAND);
  }
  random(e) {
    return this._random(e.FROM, e.TO);
  }
  _random(e, t) {
    const n = r.toNumber(e);
    const i = r.toNumber(t);
    const s = n <= i ? n : i;
    const o = n <= i ? i : n;
    if (s === o) {
      return s;
    } else if (r.isInt(e) && r.isInt(t)) {
      return s + Math.floor(Math.random() * (o + 1 - s));
    } else {
      return Math.random() * (o - s) + s;
    }
  }
  join(e) {
    return r.toString(e.STRING1) + r.toString(e.STRING2);
  }
  letterOf(e) {
    const t = r.toNumber(e.LETTER) - 1;
    const n = r.toString(e.STRING);
    if (t < 0 || t >= n.length) {
      return "";
    } else {
      return n.charAt(t);
    }
  }
  length(e) {
    return r.toString(e.STRING).length;
  }
  contains(e) {
    const t = function (e) {
      return r.toString(e).toLowerCase();
    };
    return t(e.STRING1).includes(t(e.STRING2));
  }
  mod(e) {
    const t = r.toNumber(e.NUM1);
    const n = r.toNumber(e.NUM2);
    let i = t % n;
    if (i / n < 0) {
      i += n;
    }
    return i;
  }
  round(e) {
    return Math.round(r.toNumber(e.NUM));
  }
  mathop(e) {
    const t = r.toString(e.OPERATOR).toLowerCase();
    const n = r.toNumber(e.NUM);
    switch (t) {
      case "abs":
        return Math.abs(n);
      case "floor":
        return Math.floor(n);
      case "ceiling":
        return Math.ceil(n);
      case "sqrt":
        return Math.sqrt(n);
      case "sin":
        return Math.round(Math.sin(Math.PI * n / 180) * 10000000000) / 10000000000;
      case "cos":
        return Math.round(Math.cos(Math.PI * n / 180) * 10000000000) / 10000000000;
      case "tan":
        return i.tan(n);
      case "asin":
        return Math.asin(n) * 180 / Math.PI;
      case "acos":
        return Math.acos(n) * 180 / Math.PI;
      case "atan":
        return Math.atan(n) * 180 / Math.PI;
      case "ln":
        return Math.log(n);
      case "log":
        return Math.log(n) / Math.LN10;
      case "e ^":
        return Math.exp(n);
      case "10 ^":
        return Math.pow(10, n);
    }
    return 0;
  }
};