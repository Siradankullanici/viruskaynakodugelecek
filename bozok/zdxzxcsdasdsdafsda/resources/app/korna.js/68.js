const r = require("./0.js");
const i = require("./2.js");
const s = require("./191.js");
const o = require("./47.js");
const a = require("./193.js");
const {
  StackOpcode: c,
  InputOpcode: l,
  InputType: u
} = require("./15.js");
const h = require("./46.js");
const d = require("./32.js");
const {
  IntermediateStackBlock: p,
  IntermediateInput: f,
  IntermediateStack: m,
  IntermediateScript: g,
  IntermediateRepresentation: b
} = require("./10.js");
const y = e => {
  if (typeof e != "string") {
    r.warn(`sanitize got unexpected type: ${typeof e}`);
    e = "" + e;
  }
  return JSON.stringify(e).slice(1, -1);
};
const E = "runtime.ext_pen";
const T = `${E}._getPenState(target)`;
const v = new s("factory");
const A = new s("fun");
const w = new s("gen");
const S = (e, t) => e.opcode === l.CONSTANT && (!!e.isAlwaysType(u.NUMBER) || !!e.isAlwaysType(u.STRING_NUM)) && (!t.isSometimesType(u.NUMBER_NAN | u.STRING_NAN | u.BOOLEAN_INTERPRETABLE) || +e.inputs.value != 0);
class k {
  constructor(e) {
    this.isLoop = e;
    this.isLastBlock = false;
  }
}
class I {
  constructor(e, t, n) {
    this.script = e;
    this.ir = t;
    this.target = n;
    this.source = "";
    this.isWarp = e.isWarp;
    this.isProcedure = e.isProcedure;
    this.warpTimer = e.warpTimer;
    this.frames = [];
    this.currentFrame = null;
    this.localVariables = new s("a");
    this._setupVariablesPool = new s("b");
    this._setupVariables = {};
    this.usesTemporaryLocal = false;
    this.descendedIntoModulo = false;
    this.isInHat = false;
    this.debug = this.target.runtime.debug;
    const r = this.target.runtime.sampler;
    this.sampler = r.enableCommands ? r : null;
    this.currentSamplerLocation = -1;
    this.oldCompilerStub = new h.JSGeneratorStub(this);
  }
  pushFrame(e) {
    this.frames.push(e);
    this.currentFrame = e;
  }
  popFrame() {
    this.frames.pop();
    this.currentFrame = this.frames[this.frames.length - 1];
  }
  isLastBlockInLoop() {
    for (let e = this.frames.length - 1; e >= 0; e--) {
      const t = this.frames[e];
      if (!t.isLastBlock) {
        return false;
      }
      if (t.isLoop) {
        return true;
      }
    }
    return false;
  }
  descendInput(e) {
    const t = e.inputs;
    switch (e.opcode) {
      case l.NOP:
        return "\"\"";
      case l.PROCEDURE_ARGUMENT:
        return `p${t.index}`;
      case l.ADDON_CALL:
        return `(${this.descendAddonCall(t)})`;
      case l.CAST_BOOLEAN:
        return `toBoolean(${this.descendInput(t.target)})`;
      case l.CAST_NUMBER:
        if (t.target.isAlwaysType(u.BOOLEAN)) {
          return `(+${this.descendInput(t.target)})`;
        } else {
          this.usesTemporaryLocal = true;
          if (t.target.isAlwaysType(u.NUMBER_OR_NAN)) {
            return `((t = ${this.descendInput(t.target)}) === t ? t : 0)`;
          } else {
            return `((t = +${this.descendInput(t.target)}) === t ? t : 0)`;
          }
        }
      case l.CAST_NUMBER_OR_NAN:
        return `(+${this.descendInput(t.target)})`;
      case l.CAST_NUMBER_INDEX:
        return `(${this.descendInput(t.target.toType(u.NUMBER_OR_NAN))} | 0)`;
      case l.CAST_STRING:
        return `("" + ${this.descendInput(t.target)})`;
      case l.CAST_COLOR:
        return `colorToList(${this.descendInput(t.target)})`;
      case l.COMPATIBILITY_LAYER:
        return `(${this.generateCompatibilityLayerCall(t, false)})`;
      case l.OLD_COMPILER_COMPATIBILITY_LAYER:
        return this.oldCompilerStub.descendInputFromNewCompiler(e);
      case l.CONSTANT:
        if (e.isAlwaysType(u.NUMBER)) {
          if (typeof t.value != "number") {
            throw new Error(`JS: '${e.type}' type constant had ${typeof t.value} type value. Expected number.`);
          }
          if (Object.is(t.value, -0)) {
            return "-0";
          } else {
            return t.value.toString();
          }
        }
        if (e.isAlwaysType(u.BOOLEAN)) {
          if (typeof t.value != "boolean") {
            throw new Error(`JS: '${e.type}' type constant had ${typeof t.value} type value. Expected boolean.`);
          }
          return t.value.toString();
        }
        if (e.isAlwaysType(u.COLOR)) {
          if (!Array.isArray(t.value)) {
            throw new Error(`JS: '${e.type}' type constant was not an array.`);
          }
          if (t.value.length !== 3) {
            throw new Error(`JS: '${e.type}' type constant had an array of length '${t.value.length}'. Expected 3.`);
          }
          for (let n = 0; n < 3; n++) {
            if (typeof t.value[n] != "number") {
              throw new Error(`JS: '${e.type}' type constant element ${n} had a value of type '${t.value[n]}'. Expected number.`);
            }
          }
          return `[${t.value[0]},${t.value[1]},${t.value[2]}]`;
        }
        if (e.isSometimesType(u.STRING)) {
          return `"${y(t.value.toString())}"`;
        }
        throw new Error(`JS: Unknown constant input type '${e.type}'.`);
      case l.SENSING_KEY_DOWN:
        return `runtime.ioDevices.keyboard.getKeyIsDown(${this.descendInput(t.key)})`;
      case l.LIST_CONTAINS:
        return `listContains(${this.referenceVariable(t.list)}, ${this.descendInput(t.item)})`;
      case l.LIST_CONTENTS:
        return `listContents(${this.referenceVariable(t.list)})`;
      case l.LIST_GET:
        if (a.supportsNullishCoalescing) {
          if (t.index.isAlwaysType(u.NUMBER_INTERPRETABLE | u.NUMBER_NAN)) {
            return `(${this.referenceVariable(t.list)}.value[${this.descendInput(t.index.toType(u.NUMBER_INDEX))} - 1] ?? "")`;
          }
          if (t.index.isConstant("last")) {
            return `(${this.referenceVariable(t.list)}.value[${this.referenceVariable(t.list)}.value.length - 1] ?? "")`;
          }
        }
        return `listGet(${this.referenceVariable(t.list)}.value, ${this.descendInput(t.index)})`;
      case l.LIST_INDEX_OF:
        return `(listFind(${this.referenceVariable(t.list)}.value, ${this.descendInput(t.item)}) + 1)`;
      case l.LIST_LENGTH:
        return `${this.referenceVariable(t.list)}.value.length`;
      case l.LOOKS_SIZE_GET:
        return "Math.round(target.size)";
      case l.LOOKS_BACKDROP_NAME:
        return "stage.getCostumes()[stage.currentCostume].name";
      case l.LOOKS_BACKDROP_NUMBER:
        return "(stage.currentCostume + 1)";
      case l.LOOKS_COSTUME_NAME:
        return "target.getCostumes()[target.currentCostume].name";
      case l.LOOKS_COSTUME_NUMBER:
        return "(target.currentCostume + 1)";
      case l.MOTION_DIRECTION_GET:
        return "target.direction";
      case l.MOTION_X_GET:
        return "limitPrecision(target.x)";
      case l.MOTION_Y_GET:
        return "limitPrecision(target.y)";
      case l.SENSING_MOUSE_DOWN:
        return "runtime.ioDevices.mouse.getIsDown()";
      case l.SENSING_MOUSE_X:
        return "runtime.ioDevices.mouse.getScratchX()";
      case l.SENSING_MOUSE_Y:
        return "runtime.ioDevices.mouse.getScratchY()";
      case l.OP_ABS:
        return `Math.abs(${this.descendInput(t.value)})`;
      case l.OP_ACOS:
        return `((Math.acos(${this.descendInput(t.value)}) * 180) / Math.PI)`;
      case l.OP_ADD:
        return `(${this.descendInput(t.left)} + ${this.descendInput(t.right)})`;
      case l.OP_AND:
        return `(${this.descendInput(t.left)} && ${this.descendInput(t.right)})`;
      case l.OP_ASIN:
        return `((Math.asin(${this.descendInput(t.value)}) * 180) / Math.PI)`;
      case l.OP_ATAN:
        return `((Math.atan(${this.descendInput(t.value)}) * 180) / Math.PI)`;
      case l.OP_CEILING:
        return `Math.ceil(${this.descendInput(t.value)})`;
      case l.OP_CONTAINS:
        return `(${this.descendInput(t.string)}.toLowerCase().indexOf(${this.descendInput(t.contains)}.toLowerCase()) !== -1)`;
      case l.OP_COS:
        return `(Math.round(Math.cos((Math.PI * ${this.descendInput(t.value)}) / 180) * 1e10) / 1e10)`;
      case l.OP_DIVIDE:
        return `(${this.descendInput(t.left)} / ${this.descendInput(t.right)})`;
      case l.OP_EQUALS:
        {
          const e = t.left;
          const n = t.right;
          if (e.isSometimesType(u.NUMBER_INTERPRETABLE) && n.isSometimesType(u.NUMBER_INTERPRETABLE)) {
            if (e.isAlwaysType(u.NUMBER_INTERPRETABLE) && n.isAlwaysType(u.NUMBER_INTERPRETABLE) || S(e, n) || S(n, e)) {
              return `(${this.descendInput(e.toType(u.NUMBER))} === ${this.descendInput(n.toType(u.NUMBER))})`;
            } else {
              return `compareEqual(${this.descendInput(e)}, ${this.descendInput(n)})`;
            }
          } else {
            return `(${this.descendInput(e.toType(u.STRING))}.toLowerCase() === ${this.descendInput(n.toType(u.STRING))}.toLowerCase())`;
          }
        }
      case l.OP_POW_E:
        return `Math.exp(${this.descendInput(t.value)})`;
      case l.OP_FLOOR:
        return `Math.floor(${this.descendInput(t.value)})`;
      case l.OP_GREATER:
        {
          const e = t.left;
          const n = t.right;
          if (e.isAlwaysType(u.NUMBER_INTERPRETABLE) && n.isAlwaysType(u.NUMBER_INTERPRETABLE | u.NUMBER_NAN)) {
            return `(${this.descendInput(e.toType(u.NUMBER))} > ${this.descendInput(n.toType(u.NUMBER_OR_NAN))})`;
          } else if (e.isAlwaysType(u.NUMBER_INTERPRETABLE | u.NUMBER_NAN) && n.isAlwaysType(u.NUMBER_INTERPRETABLE)) {
            return `!(${this.descendInput(e.toType(u.NUMBER_OR_NAN))} <= ${this.descendInput(n.toType(u.NUMBER))})`;
          } else if (e.isSometimesType(u.NUMBER_INTERPRETABLE) && n.isSometimesType(u.NUMBER_INTERPRETABLE)) {
            return `compareGreaterThan(${this.descendInput(e)}, ${this.descendInput(n)})`;
          } else {
            return `(${this.descendInput(e.toType(u.STRING))}.toLowerCase() > ${this.descendInput(n.toType(u.STRING))}.toLowerCase())`;
          }
        }
      case l.OP_JOIN:
        return `(${this.descendInput(t.left)} + ${this.descendInput(t.right)})`;
      case l.OP_LENGTH:
        return `${this.descendInput(t.string)}.length`;
      case l.OP_LESS:
        {
          const e = t.left;
          const n = t.right;
          if (e.isAlwaysType(u.NUMBER_INTERPRETABLE | u.NUMBER_NAN) && n.isAlwaysType(u.NUMBER_INTERPRETABLE)) {
            return `(${this.descendInput(e.toType(u.NUMBER_OR_NAN))} < ${this.descendInput(n.toType(u.NUMBER))})`;
          } else if (e.isAlwaysType(u.NUMBER_INTERPRETABLE) && n.isAlwaysType(u.NUMBER_INTERPRETABLE | u.NUMBER_NAN)) {
            return `!(${this.descendInput(e.toType(u.NUMBER))} >= ${this.descendInput(n.toType(u.NUMBER_OR_NAN))})`;
          } else if (e.isSometimesType(u.NUMBER_INTERPRETABLE) && n.isSometimesType(u.NUMBER_INTERPRETABLE)) {
            return `compareLessThan(${this.descendInput(e)}, ${this.descendInput(n)})`;
          } else {
            return `(${this.descendInput(e.toType(u.STRING))}.toLowerCase() < ${this.descendInput(n.toType(u.STRING))}.toLowerCase())`;
          }
        }
      case l.OP_LETTER_OF:
        return `((${this.descendInput(t.string)})[${this.descendInput(t.letter)} - 1] || "")`;
      case l.OP_LOG_E:
        return `Math.log(${this.descendInput(t.value)})`;
      case l.OP_LOG_10:
        return `(Math.log(${this.descendInput(t.value)}) / Math.LN10)`;
      case l.OP_MOD:
        this.descendedIntoModulo = true;
        return `mod(${this.descendInput(t.left)}, ${this.descendInput(t.right)})`;
      case l.OP_MULTIPLY:
        return `(${this.descendInput(t.left)} * ${this.descendInput(t.right)})`;
      case l.OP_NOT:
        return `!${this.descendInput(t.operand)}`;
      case l.OP_OR:
        return `(${this.descendInput(t.left)} || ${this.descendInput(t.right)})`;
      case l.OP_RANDOM:
        if (t.useInts) {
          return `randomInt(${this.descendInput(t.low)}, ${this.descendInput(t.high)})`;
        } else if (t.useFloats) {
          return `randomFloat(${this.descendInput(t.low)}, ${this.descendInput(t.high)})`;
        } else {
          return `runtime.ext_scratch3_operators._random(${this.descendInput(t.low)}, ${this.descendInput(t.high)})`;
        }
      case l.OP_ROUND:
        return `Math.round(${this.descendInput(t.value)})`;
      case l.OP_SIN:
        return `(Math.round(Math.sin((Math.PI * ${this.descendInput(t.value)}) / 180) * 1e10) / 1e10)`;
      case l.OP_SQRT:
        return `Math.sqrt(${this.descendInput(t.value)})`;
      case l.OP_SUBTRACT:
        return `(${this.descendInput(t.left)} - ${this.descendInput(t.right)})`;
      case l.OP_TAN:
        return `tan(${this.descendInput(t.value)})`;
      case l.OP_POW_10:
        return `(10 ** ${this.descendInput(t.value)})`;
      case l.PROCEDURE_CALL:
        {
          const e = t.code;
          const n = t.variant;
          const r = this.ir.procedures[n];
          if (r.stack === null) {
            return "\"\"";
          }
          const i = `thread.procedures["${y(n)}"]`;
          const s = [];
          for (const e of t.arguments) {
            s.push(this.descendInput(e));
          }
          const o = s.join(",");
          const a = !this.isWarp && e === this.script.procedureCode;
          const c = this.isInHat;
          if (a || c) {
            const e = r.yields ? "yieldThenCallGenerator" : "yieldThenCall";
            return `(yield* ${e}(${i}, ${o}))`;
          }
          if (r.yields) {
            return `(yield* ${i}(${o}))`;
          } else {
            return `${i}(${o})`;
          }
        }
      case l.SENSING_ANSWER:
        return "runtime.ext_scratch3_sensing._answer";
      case l.SENSING_COLOR_TOUCHING_COLOR:
        return `target.colorIsTouchingColor(${this.descendInput(t.target)}, ${this.descendInput(t.mask)})`;
      case l.SENSING_TIME_DATE:
        return "(new Date().getDate())";
      case l.SENSING_TIME_WEEKDAY:
        return "(new Date().getDay() + 1)";
      case l.SENSING_TIME_DAYS_SINCE_2000:
        return "daysSince2000()";
      case l.SENSING_DISTANCE:
        return `distance(${this.descendInput(t.target)})`;
      case l.SENSING_TIME_HOUR:
        return "(new Date().getHours())";
      case l.SENSING_TIME_MINUTE:
        return "(new Date().getMinutes())";
      case l.SENSING_TIME_MONTH:
        return "(new Date().getMonth() + 1)";
      case l.SENSING_OF:
        return `runtime.ext_scratch3_sensing.getAttributeOf({OBJECT: ${this.descendInput(t.object)}, PROPERTY: "${y(t.property)}" })`;
      case l.SENSING_OF_VOLUME:
        {
          const e = this.descendTargetReference(t.object);
          return `(${e} ? ${e}.volume : 0)`;
        }
      case l.SENSING_OF_BACKDROP_NUMBER:
        return "(stage.currentCostume + 1)";
      case l.SENSING_OF_BACKDROP_NAME:
        return "stage.getCostumes()[stage.currentCostume].name";
      case l.SENSING_OF_POS_X:
        {
          const e = this.descendTargetReference(t.object);
          return `(${e} ? ${e}.x : 0)`;
        }
      case l.SENSING_OF_POS_Y:
        {
          const e = this.descendTargetReference(t.object);
          return `(${e} ? ${e}.y : 0)`;
        }
      case l.SENSING_OF_DIRECTION:
        {
          const e = this.descendTargetReference(t.object);
          return `(${e} ? ${e}.direction : 0)`;
        }
      case l.SENSING_OF_COSTUME_NUMBER:
        {
          const e = this.descendTargetReference(t.object);
          return `(${e} ? ${e}.currentCostume + 1 : 0)`;
        }
      case l.SENSING_OF_COSTUME_NAME:
        {
          const e = this.descendTargetReference(t.object);
          return `(${e} ? ${e}.getCostumes()[${e}.currentCostume].name : 0)`;
        }
      case l.SENSING_OF_SIZE:
        {
          const e = this.descendTargetReference(t.object);
          return `(${e} ? ${e}.size : 0)`;
        }
      case l.SENSING_OF_VAR:
        {
          const e = this.descendTargetReference(t.object);
          const n = this.evaluateOnce(`${e} && ${e}.lookupVariableByNameAndType("${y(t.property)}", "", true)`);
          return `(${n} ? ${n}.value : 0)`;
        }
      case l.SENSING_TIME_SECOND:
        return "(new Date().getSeconds())";
      case l.SENSING_TOUCHING_OBJECT:
        return `target.isTouchingObject(${this.descendInput(t.object)})`;
      case l.SENSING_TOUCHING_COLOR:
        return `target.isTouchingColor(${this.descendInput(t.color)})`;
      case l.SENSING_USERNAME:
        return "runtime.ioDevices.userData.getUsername()";
      case l.SENSING_TIME_YEAR:
        return "(new Date().getFullYear())";
      case l.SENSING_TIMER_GET:
        return "runtime.ioDevices.clock.projectTimer()";
      case l.CONTROL_COUNTER:
        return "runtime.ext_scratch3_control._counter";
      case l.TW_KEY_LAST_PRESSED:
        return "runtime.ioDevices.keyboard.getLastKeyPressed()";
      case l.VAR_GET:
        return `${this.referenceVariable(t.variable)}.value`;
      default:
        r.warn(`JS: Unknown input: ${e.opcode}`, t);
        throw new Error(`JS: Unknown input: ${e.opcode}`);
    }
  }
  descendStackedBlock(e) {
    const t = e.inputs;
    switch (e.opcode) {
      case c.ADDON_CALL:
        this.source += `${this.descendAddonCall(t)};
`;
        break;
      case c.COMPATIBILITY_LAYER:
        {
          const e = this.isLastBlockInLoop();
          const n = t.blockType;
          if (n === i.COMMAND || n === i.HAT) {
            this.source += `${this.generateCompatibilityLayerCall(t, e)};
`;
          } else {
            if (n !== i.CONDITIONAL && n !== i.LOOP) {
              throw new Error(`Unknown block type: ${n}`);
            }
            {
              const e = this.localVariables.next();
              this.source += `const ${e} = createBranchInfo(${n === i.LOOP});
`;
              this.source += `while (${e}.branch = +(${this.generateCompatibilityLayerCall(t, false, e)})) {
`;
              this.source += `switch (${e}.branch) {
`;
              for (const e in t.substacks) {
                this.source += `case ${+e}: {
`;
                this.descendStack(t.substacks[e], new k(false));
                this.source += "break;\n";
                this.source += "}\n";
              }
              this.source += "}\n";
              this.source += `if (!${e}.isLoop) break;
`;
              this.yieldLoop();
              this.source += "}\n";
            }
          }
          if (e) {
            this.source += "if (hasResumedFromPromise) {hasResumedFromPromise = false;continue;}\n";
          }
          break;
        }
      case l.OLD_COMPILER_COMPATIBILITY_LAYER:
        return this.oldCompilerStub.descendStackedBlockFromNewCompiler(e);
      case c.HAT_EDGE:
        this.isInHat = true;
        this.source += "{\n";
        this.source += `const resolvedValue = ${this.descendInput(t.condition)};
`;
        this.source += `const id = "${y(t.id)}";
`;
        this.source += "const hasOldEdgeValue = target.hasEdgeActivatedValue(id);\n";
        this.source += "const oldEdgeValue = target.updateEdgeActivatedValue(id, resolvedValue);\n";
        this.source += "const edgeWasActivated = hasOldEdgeValue ? (!oldEdgeValue && resolvedValue) : resolvedValue;\n";
        this.source += "if (!edgeWasActivated) {\n";
        this.retire();
        this.source += "}\n";
        this.source += "yield;\n";
        this.source += "}\n";
        this.isInHat = false;
        break;
      case c.HAT_PREDICATE:
        this.isInHat = true;
        this.source += `if (!${this.descendInput(t.condition)}) {
`;
        this.retire();
        this.source += "}\n";
        this.source += "yield;\n";
        this.isInHat = false;
        break;
      case c.CONTROL_CLONE_CREATE:
        this.source += `runtime.ext_scratch3_control._createClone(${this.descendInput(t.target)}, target);
`;
        break;
      case c.CONTROL_CLONE_DELETE:
        this.source += "if (!target.isOriginal) {\n";
        this.source += "  runtime.disposeTarget(target);\n";
        this.source += "  runtime.stopForTarget(target);\n";
        this.retire();
        this.source += "}\n";
        break;
      case c.CONTROL_FOR:
        {
          const e = this.localVariables.next();
          this.source += `var ${e} = 0; `;
          this.source += `while (${e} < ${this.descendInput(t.count)}) { `;
          this.source += `${e}++; `;
          this.source += `${this.referenceVariable(t.variable)}.value = ${e};
`;
          this.descendStack(t.do, new k(true));
          this.yieldLoop();
          this.source += "}\n";
          break;
        }
      case c.CONTROL_IF_ELSE:
        this.source += `if (${this.descendInput(t.condition)}) {
`;
        this.descendStack(t.whenTrue, new k(false));
        if (t.whenFalse.blocks.length) {
          this.source += "} else {\n";
          this.descendStack(t.whenFalse, new k(false));
        }
        this.source += "}\n";
        break;
      case c.CONTROL_REPEAT:
        {
          const e = this.localVariables.next();
          if (t.times.isAlwaysType(u.NUMBER_INT | u.NUMBER_INF)) {
            this.source += `for (var ${e} = ${this.descendInput(t.times)}; ${e} > 0; ${e}--) {
`;
          } else {
            this.source += `for (var ${e} = ${this.descendInput(t.times)}; ${e} >= 0.5; ${e}--) {
`;
          }
          this.descendStack(t.do, new k(true));
          this.yieldLoop();
          this.source += "}\n";
          break;
        }
      case c.CONTROL_STOP_ALL:
        this.source += "runtime.stopAll();\n";
        this.retire();
        break;
      case c.CONTROL_STOP_OTHERS:
        this.source += "runtime.stopForTarget(target, thread);\n";
        break;
      case c.CONTROL_STOP_SCRIPT:
        this.stopScript();
        break;
      case c.CONTROL_WAIT:
        {
          const e = this.localVariables.next();
          this.source += "thread.timer = timer();\n";
          this.source += `var ${e} = Math.max(0, 1000 * ${this.descendInput(t.seconds)});
`;
          this.requestRedraw();
          this.yieldNotWarp();
          this.source += `while (thread.timer.timeElapsed() < ${e}) {
`;
          this.yieldStuckOrNotWarp();
          this.source += "}\n";
          this.source += "thread.timer = null;\n";
          break;
        }
      case c.CONTROL_WAIT_UNTIL:
        this.source += `while (!${this.descendInput(t.condition)}) {
`;
        this.yieldStuckOrNotWarp();
        this.source += "}\n";
        break;
      case c.CONTROL_WHILE:
        this.source += `while (${this.descendInput(t.condition)}) {
`;
        this.descendStack(t.do, new k(true));
        if (t.warpTimer) {
          this.yieldStuckOrNotWarp();
        } else {
          this.yieldLoop();
        }
        this.source += "}\n";
        break;
      case c.CONTROL_CLEAR_COUNTER:
        this.source += "runtime.ext_scratch3_control._counter = 0;\n";
        break;
      case c.CONTORL_INCR_COUNTER:
        this.source += "runtime.ext_scratch3_control._counter++;\n";
        break;
      case c.EVENT_BROADCAST:
        this.source += `startHats("event_whenbroadcastreceived", { BROADCAST_OPTION: ${this.descendInput(t.broadcast)} });
`;
        break;
      case c.EVENT_BROADCAST_AND_WAIT:
        this.source += `yield* waitThreads(startHats("event_whenbroadcastreceived", { BROADCAST_OPTION: ${this.descendInput(t.broadcast)} }));
`;
        this.yielded();
        break;
      case c.LIST_ADD:
        {
          const e = this.referenceVariable(t.list);
          this.source += `${e}.value.push(${this.descendInput(t.item)});
`;
          this.source += `${e}._monitorUpToDate = false;
`;
          break;
        }
      case c.LIST_DELETE:
        {
          const e = this.referenceVariable(t.list);
          if (t.index.isConstant("last")) {
            this.source += `${e}.value.pop();
`;
            this.source += `${e}._monitorUpToDate = false;
`;
            break;
          }
          if (t.index.isConstant(1)) {
            this.source += `${e}.value.shift();
`;
            this.source += `${e}._monitorUpToDate = false;
`;
            break;
          }
          this.source += `listDelete(${e}, ${this.descendInput(t.index)});
`;
          break;
        }
      case c.LIST_DELETE_ALL:
        this.source += `${this.referenceVariable(t.list)}.value = [];
`;
        break;
      case c.LIST_HIDE:
        this.source += `runtime.monitorBlocks.changeBlock({ id: "${y(t.list.id)}", element: "checkbox", value: false }, runtime);
`;
        break;
      case c.LIST_INSERT:
        {
          const e = this.referenceVariable(t.list);
          const n = this.descendInput(t.item);
          if (t.index.isConstant(1)) {
            this.source += `${e}.value.unshift(${n});
`;
            this.source += `${e}._monitorUpToDate = false;
`;
            break;
          }
          this.source += `listInsert(${e}, ${this.descendInput(t.index)}, ${n});
`;
          break;
        }
      case c.LIST_REPLACE:
        this.source += `listReplace(${this.referenceVariable(t.list)}, ${this.descendInput(t.index)}, ${this.descendInput(t.item)});
`;
        break;
      case c.LIST_SHOW:
        this.source += `runtime.monitorBlocks.changeBlock({ id: "${y(t.list.id)}", element: "checkbox", value: true }, runtime);
`;
        break;
      case c.LOOKS_LAYER_BACKWARD:
        if (!this.target.isStage) {
          this.source += `target.goBackwardLayers(${this.descendInput(t.layers)});
`;
        }
        break;
      case c.LOOKS_EFFECT_CLEAR:
        this.source += "target.clearEffects();\n";
        break;
      case c.LOOKS_EFFECT_CHANGE:
        if (Object.prototype.hasOwnProperty.call(this.target.effects, t.effect)) {
          this.source += `target.setEffect("${y(t.effect)}", runtime.ext_scratch3_looks.clampEffect("${y(t.effect)}", ${this.descendInput(t.value)} + target.effects["${y(t.effect)}"]));
`;
        }
        break;
      case c.LOOKS_SIZE_CHANGE:
        this.source += `target.setSize(target.size + ${this.descendInput(t.size)});
`;
        break;
      case c.LOOKS_LAYER_FORWARD:
        if (!this.target.isStage) {
          this.source += `target.goForwardLayers(${this.descendInput(t.layers)});
`;
        }
        break;
      case c.LOOKS_LAYER_BACK:
        if (!this.target.isStage) {
          this.source += "target.goToBack();\n";
        }
        break;
      case c.LOOKS_LAYER_FRONT:
        if (!this.target.isStage) {
          this.source += "target.goToFront();\n";
        }
        break;
      case c.LOOKS_HIDE:
        this.source += "target.setVisible(false);\n";
        this.source += "runtime.ext_scratch3_looks._renderBubble(target);\n";
        break;
      case c.LOOKS_BACKDROP_NEXT:
        this.source += "runtime.ext_scratch3_looks._setBackdrop(stage, stage.currentCostume + 1, true);\n";
        break;
      case c.LOOKS_COSTUME_NEXT:
        this.source += "target.setCostume(target.currentCostume + 1);\n";
        break;
      case c.LOOKS_EFFECT_SET:
        if (Object.prototype.hasOwnProperty.call(this.target.effects, t.effect)) {
          this.source += `target.setEffect("${y(t.effect)}", runtime.ext_scratch3_looks.clampEffect("${y(t.effect)}", ${this.descendInput(t.value)}));
`;
        }
        break;
      case c.LOOKS_SIZE_SET:
        this.source += `target.setSize(${this.descendInput(t.size)});
`;
        break;
      case c.LOOKS_SHOW:
        this.source += "target.setVisible(true);\n";
        this.source += "runtime.ext_scratch3_looks._renderBubble(target);\n";
        break;
      case c.LOOKS_BACKDROP_SET:
        this.source += `runtime.ext_scratch3_looks._setBackdrop(stage, ${this.descendInput(t.backdrop)});
`;
        break;
      case c.LOOKS_COSTUME_SET:
        this.source += `runtime.ext_scratch3_looks._setCostume(target, ${this.descendInput(t.costume)});
`;
        break;
      case c.LOOKS_SAY:
        this.source += `runtime.ext_scratch3_looks._say(${this.descendInput(t.message)}, target);
`;
        break;
      case c.LOOKS_THINK:
        this.source += `runtime.ext_scratch3_looks._think(${this.descendInput(t.message)}, target);
`;
        break;
      case c.MOTION_X_CHANGE:
        this.source += `target.setXY(target.x + ${this.descendInput(t.dx)}, target.y);
`;
        break;
      case c.MOTION_Y_CHANGE:
        this.source += `target.setXY(target.x, target.y + ${this.descendInput(t.dy)});
`;
        break;
      case c.MOTION_IF_ON_EDGE_BOUNCE:
        this.source += "runtime.ext_scratch3_motion._ifOnEdgeBounce(target);\n";
        break;
      case c.MOTION_DIRECTION_SET:
        this.source += `target.setDirection(${this.descendInput(t.direction)});
`;
        break;
      case c.MOTION_ROTATION_STYLE_SET:
        this.source += `target.setRotationStyle("${y(t.style)}");
`;
        break;
      case c.MOTION_X_SET:
      case c.MOTION_Y_SET:
      case c.MOTION_XY_SET:
        {
          this.descendedIntoModulo = false;
          const e = "x" in t ? this.descendInput(t.x) : "target.x";
          const n = "y" in t ? this.descendInput(t.y) : "target.y";
          this.source += `target.setXY(${e}, ${n});
`;
          if (this.descendedIntoModulo) {
            this.source += "if (target.interpolationData) target.interpolationData = null;\n";
          }
          break;
        }
      case c.MOTION_STEP:
        this.source += `runtime.ext_scratch3_motion._moveSteps(${this.descendInput(t.steps)}, target);
`;
        break;
      case c.NOP:
        break;
      case c.PEN_CLEAR:
        this.source += `${E}.clear();
`;
        break;
      case c.PEN_DOWN:
        this.source += `${E}._penDown(target);
`;
        break;
      case c.PEN_COLOR_PARAM_CHANGE:
        this.source += `${E}._setOrChangeColorParam(${this.descendInput(t.param)}, ${this.descendInput(t.value)}, ${T}, true);
`;
        break;
      case c.PEN_SIZE_CHANGE:
        this.source += `${E}._changePenSizeBy(${this.descendInput(t.size)}, target);
`;
        break;
      case c.PEN_COLOR_HUE_CHANGE_LEGACY:
        this.source += `${E}._changePenHueBy(${this.descendInput(t.hue)}, target);
`;
        break;
      case c.PEN_COLOR_SHADE_CHANGE_LEGACY:
        this.source += `${E}._changePenShadeBy(${this.descendInput(t.shade)}, target);
`;
        break;
      case c.PEN_COLOR_HUE_SET_LEGACY:
        this.source += `${E}._setPenHueToNumber(${this.descendInput(t.hue)}, target);
`;
        break;
      case c.PEN_COLOR_SHADE_SET_LEGACY:
        this.source += `${E}._setPenShadeToNumber(${this.descendInput(t.shade)}, target);
`;
        break;
      case c.PEN_COLOR_SET:
        this.source += `${E}._setPenColorToColor(${this.descendInput(t.color)}, target);
`;
        break;
      case c.PEN_COLOR_PARAM_SET:
        this.source += `${E}._setOrChangeColorParam(${this.descendInput(t.param)}, ${this.descendInput(t.value)}, ${T}, false);
`;
        break;
      case c.PEN_SIZE_SET:
        this.source += `${E}._setPenSizeTo(${this.descendInput(t.size)}, target);
`;
        break;
      case c.PEN_STAMP:
        this.source += `${E}._stamp(target);
`;
        break;
      case c.PEN_UP:
        this.source += `${E}._penUp(target);
`;
        break;
      case c.PROCEDURE_CALL:
        {
          const e = t.code;
          const n = t.variant;
          const r = this.ir.procedures[n];
          if (r.stack === null) {
            break;
          }
          if (!this.isWarp && e === this.script.procedureCode) {
            this.yieldNotWarp();
          }
          if (r.yields && (this.source += "yield* ", !this.script.yields)) {
            throw new Error("Script uses yielding procedure but is not marked as yielding.");
          }
          this.source += `thread.procedures["${y(n)}"](`;
          const i = [];
          for (const e of t.arguments) {
            i.push(this.descendInput(e));
          }
          this.source += i.join(",");
          this.source += ");\n";
          break;
        }
      case c.PROCEDURE_RETURN:
        this.stopScriptAndReturn(this.descendInput(t.value));
        break;
      case c.SENSING_TIMER_RESET:
        this.source += "runtime.ioDevices.clock.resetProjectTimer();\n";
        break;
      case c.DEBUGGER:
        this.source += "debugger;\n";
        break;
      case c.VAR_HIDE:
        this.source += `runtime.monitorBlocks.changeBlock({ id: "${y(t.variable.id)}", element: "checkbox", value: false }, runtime);
`;
        break;
      case c.VAR_SET:
        {
          const e = this.referenceVariable(t.variable);
          this.source += `${e}.value = ${this.descendInput(t.value)};
`;
          if (t.variable.isCloud) {
            this.source += `runtime.ioDevices.cloud.requestUpdateVariable("${y(t.variable.name)}", ${e}.value);
`;
          }
          break;
        }
      case c.VAR_SHOW:
        this.source += `runtime.monitorBlocks.changeBlock({ id: "${y(t.variable.id)}", element: "checkbox", value: true }, runtime);
`;
        break;
      case c.VISUAL_REPORT:
        {
          const e = this.localVariables.next();
          this.source += `const ${e} = ${this.descendInput(t.input)};`;
          this.source += `if (${e} !== undefined) runtime.visualReport(target, "${y(this.script.topBlockId)}", ${e});
`;
          break;
        }
      default:
        r.warn(`JS: Unknown stacked block: ${e.opcode}`, t);
        throw new Error(`JS: Unknown stacked block: ${e.opcode}`);
    }
  }
  descendTargetReference(e) {
    if (!e.isAlwaysType(u.STRING)) {
      throw new Error("JS: Object references must be strings!");
    }
    if (e.isConstant("_stage_")) {
      return "stage";
    } else {
      return this.evaluateOnce(`runtime.getSpriteTargetByName(${this.descendInput(e)})`);
    }
  }
  descendInputRecord(e) {
    let t = "{";
    for (const n of Object.keys(e)) {
      const r = e[n];
      t += `"${y(n)}":${this.descendInput(r)},`;
    }
    t += "}";
    return t;
  }
  descendStack(e, t) {
    this.pushFrame(t);
    const n = this.currentSamplerLocation;
    for (let n = 0; n < e.blocks.length; n++) {
      t.isLastBlock = n === e.blocks.length - 1;
      const r = e.blocks[n];
      if (this.sampler && r.blockId) {
        const e = this.target.sprite.clones[0].id;
        this.currentSamplerLocation = this.sampler.blockToLocation(e, r.blockId);
        this.source += `pc[0] = ${this.currentSamplerLocation};
`;
      }
      this.descendStackedBlock(r);
    }
    if (this.sampler && t.isLoop) {
      this.source += `pc[0] = ${n};
`;
    }
    this.currentSamplerLocation = n;
    this.popFrame();
  }
  descendAddonCall(e) {
    const t = this.descendInputRecord(e.arguments);
    const n = `runtime.getAddonBlock("${y(e.code)}").callback`;
    const r = `"${y(e.blockId)}"`;
    return `yield* executeInCompatibilityLayer(${t}, ${n}, ${this.isWarp}, false, ${r})`;
  }
  referenceVariable(e) {
    if (e.scope === "target") {
      return this.evaluateOnce(`target.variables["${y(e.id)}"]`);
    } else {
      return this.evaluateOnce(`stage.variables["${y(e.id)}"]`);
    }
  }
  evaluateOnce(e) {
    if (Object.prototype.hasOwnProperty.call(this._setupVariables, e)) {
      return this._setupVariables[e];
    }
    const t = this._setupVariablesPool.next();
    this._setupVariables[e] = t;
    return t;
  }
  retire() {
    if (this.isProcedure) {
      this.source += `retire(); throw ${o.RETIRE_MAGIC};
`;
    } else {
      this.source += "retire(); return;\n";
    }
  }
  yieldLoop() {
    if (this.warpTimer) {
      this.yieldStuckOrNotWarp();
    } else {
      this.yieldNotWarp();
    }
  }
  yieldNotWarp() {
    if (!this.isWarp) {
      this.source += "yield;\n";
      this.yielded();
      if (this.sampler) {
        this.source += `pc[0] = ${this.currentSamplerLocation};
`;
      }
    }
  }
  yieldStuckOrNotWarp() {
    if (this.isWarp) {
      if (this.sampler) {
        this.source += `pc[0] = ${d.WARP_TIMER};
`;
      }
      this.source += "if (isStuck()) yield;\n";
    } else {
      this.source += "yield;\n";
    }
    this.yielded();
    if (this.sampler) {
      this.source += `pc[0] = ${this.currentSamplerLocation};
`;
    }
  }
  yielded() {
    if (!this.script.yields) {
      throw new Error("Script yielded but is not marked as yielding.");
    }
  }
  requestRedraw() {
    this.source += "runtime.requestRedraw();\n";
  }
  generateCompatibilityLayerCall(e, t, n = null) {
    const r = e.opcode;
    let i = "yield* executeInCompatibilityLayer({";
    for (const t of Object.keys(e.inputs)) {
      const n = e.inputs[t];
      const r = this.descendInput(n);
      i += `"${y(t)}":${r},`;
    }
    for (const t of Object.keys(e.fields)) {
      const n = e.fields[t];
      i += `"${y(t)}":"${y(n)}",`;
    }
    const s = this.evaluateOnce(`runtime.getOpcodeFunction("${y(r)}")`);
    i += `}, ${s}, ${this.isWarp}, ${t}, "${y(e.id)}", ${n})`;
    this.yielded();
    return i;
  }
  getScriptFactoryName() {
    return v.next();
  }
  getScriptName(e) {
    let t = e ? w.next() : A.next();
    if (this.isProcedure) {
      const e = this.script.procedureCode.replace(/%[\w]/g, "").replace(/[^a-zA-Z0-9]/g, "_").substring(0, 20);
      t += `_${e}`;
    }
    return t;
  }
  stopScript() {
    if (this.isProcedure) {
      this.source += "return \"\";\n";
    } else {
      this.retire();
    }
  }
  stopScriptAndReturn(e) {
    if (this.isProcedure) {
      this.source += `return ${e};
`;
    } else {
      this.retire();
    }
  }
  createScriptFactory() {
    let e = "";
    e += `(function ${this.getScriptFactoryName()}(thread) { `;
    e += "const target = thread.target; ";
    e += "const runtime = target.runtime; ";
    e += "const stage = runtime.getTargetForStage();\n";
    if (this.sampler) {
      e += "const pc = runtime.sampler.pc;\n";
    }
    for (const t of Object.keys(this._setupVariables)) {
      const n = this._setupVariables[t];
      e += `const ${n} = ${t};
`;
    }
    e += "return ";
    if (this.script.yields) {
      e += "function* ";
    } else {
      e += "function ";
    }
    e += this.getScriptName(this.script.yields);
    e += " (";
    if (this.script.arguments.length) {
      const t = [];
      for (let e = 0; e < this.script.arguments.length; e++) {
        t.push(`p${e}`);
      }
      e += t.join(",");
    }
    e += ") {\n";
    if (this.usesTemporaryLocal) {
      e += "let t;\n";
    }
    e += this.source;
    e += "}; })";
    return e;
  }
  compile() {
    if (this.script.stack) {
      this.descendStack(this.script.stack, new k(false));
    }
    this.stopScript();
    const e = this.createScriptFactory();
    const t = o.scopedEval(e);
    if (this.debug) {
      r.info(`JS: ${this.target.getName()}: compiled ${this.script.procedureCode || "script"}`, e);
    }
    if (I.testingApparatus) {
      I.testingApparatus.report(this, e);
    }
    return t;
  }
}
I.unstable_exports = {
  factoryNameVariablePool: v,
  functionNameVariablePool: A,
  generatorNameVariablePool: w,
  VariablePool: s,
  PEN_EXT: E,
  PEN_STATE: T,
  Frame: k,
  sanitize: y
};
I.testingApparatus = null;
module.exports = I;