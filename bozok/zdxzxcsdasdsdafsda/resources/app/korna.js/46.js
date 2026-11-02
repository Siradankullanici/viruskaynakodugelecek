const {
  InputOpcode: r,
  InputType: i
} = require("./15.js");
const {
  IntermediateInput: s,
  IntermediateStackBlock: o,
  IntermediateStack: a
} = require("./10.js");
class c {
  constructor(e, t) {
    this.source = e;
    if (t instanceof s) {
      this.intermediate = t;
      this.type = 4;
    } else {
      this.intermediate = null;
      this.type = t;
    }
  }
  asNumber() {
    return `(+${this.source} || 0)`;
  }
  asNumberOrNaN() {
    return `(+${this.source})`;
  }
  asString() {
    return `("" + ${this.source})`;
  }
  asBoolean() {
    return `toBoolean(${this.source})`;
  }
  asColor() {
    return this.asUnknown();
  }
  asUnknown() {
    return this.source;
  }
  asSafe() {
    return this.asUnknown();
  }
  isAlwaysNumber() {
    return false;
  }
  isAlwaysNumberOrNaN() {
    return false;
  }
  isNeverNumber() {
    return false;
  }
}
class l {
  constructor(e) {
    this.prefix = e;
    this.count = 0;
  }
  next() {
    return `${this.prefix}${this.count++}`;
  }
}
class u {
  constructor(e) {
    this.real = e;
    this.fakeThis = {
      script: e.script,
      ir: e.ir,
      target: e.target,
      get frames() {
        return e.frames;
      },
      get currentFrame() {
        return e.currentFrame;
      },
      get source() {
        return e.source;
      },
      set source(t) {
        e.source = t;
      },
      localVariables: new l("oldCompilerLocal"),
      descendInput(t) {
        const n = e.descendInput(t);
        return new c(n, t);
      },
      descendStack(t, n) {
        e.descendStack(t, n);
      },
      yieldLoop: () => e.yieldLoop(),
      yieldNotWarp: () => e.yieldNotWarp(),
      yieldStuckOrNotWarp: () => e.yieldStuckOrNotWarp(),
      yielded: () => e.yielded(),
      requestRedraw: () => e.requestRedraw()
    };
  }
  descendInput(e) {
    throw new Error(`Unknown input: ${e.kind}`);
  }
  descendStackedBlock(e) {
    throw new Error(`Unknown stacked block: ${e.kind}`);
  }
  descendInputFromNewCompiler(e) {
    const t = e.inputs.oldNode;
    return this.descendInput.call(this.fakeThis, t).asSafe();
  }
  descendStackedBlockFromNewCompiler(e) {
    const t = e.inputs.oldNode;
    this.descendStackedBlock.call(this.fakeThis, t);
  }
}
u.unstable_exports = {
  TYPE_NUMBER: 1,
  TYPE_STRING: 2,
  TYPE_BOOLEAN: 3,
  TYPE_UNKNOWN: 4,
  TYPE_NUMBER_NAN: 5,
  VariablePool: l,
  TypedInput: c,
  Frame: class {
    constructor(e) {
      this.isLoop = e;
      this.isLastBlock = false;
    }
  }
};
const h = {
  enabled: false,
  IRGeneratorStub: class {},
  ScriptTreeGeneratorStub: class {
    constructor(e) {
      this.real = e;
      this.fakeThis = {
        thread: e.thread,
        target: e.target,
        blocks: e.blocks,
        runtime: e.runtime,
        stage: e.stage,
        script: e.script,
        descendInputOfBlock: (t, n) => e.descendInputOfBlock(t, n, true),
        descendSubstack: (t, n) => e.descendSubstack(t, n),
        analyzeLoop() {
          e.script.yields = true;
        }
      };
    }
    descendInput(e) {
      return null;
    }
    descendStackedBlock(e) {
      return null;
    }
    descendInputFromNewCompiler(e) {
      const t = this.descendInput.call(this.fakeThis, e);
      if (t) {
        return new s(r.OLD_COMPILER_COMPATIBILITY_LAYER, i.ANY, {
          oldNode: t
        }, true);
      } else {
        return null;
      }
    }
    descendStackedBlockFromNewCompiler(e) {
      const t = this.descendStackedBlock.call(this.fakeThis, e);
      if (t) {
        return new o(r.OLD_COMPILER_COMPATIBILITY_LAYER, {
          oldNode: t
        }, true);
      } else {
        return null;
      }
    }
  },
  TypedInput: c,
  JSGeneratorStub: u
};
module.exports = h;