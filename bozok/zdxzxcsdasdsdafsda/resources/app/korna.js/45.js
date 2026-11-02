const r = require("./1.js");
const i = require("./6.js");
const s = require("./2.js");
const o = require("./9.js");
const a = require("./0.js");
const c = require("./189.js");
const {
  StackOpcode: l,
  InputOpcode: u,
  InputType: h
} = require("./15.js");
const {
  IntermediateStackBlock: d,
  IntermediateInput: p,
  IntermediateStack: f,
  IntermediateScript: m,
  IntermediateRepresentation: g
} = require("./10.js");
const b = require("./46.js");
const y = "";
const E = "list";
const T = e => e.substring(1);
class v {
  constructor(e) {
    this.thread = e;
    this.target = e.target;
    this.blocks = e.blockContainer;
    this.runtime = this.target.runtime;
    this.stage = this.runtime.getTargetForStage();
    this.script = new m();
    this.script.warpTimer = this.target.runtime.compilerOptions.warpTimer;
    this.variableCache = {};
    this.usesTimer = false;
    this.namesOfCostumesAndSounds = new Set();
    for (const e of this.runtime.targets) {
      if (e.isOriginal) {
        const t = e.sprite;
        for (const e of t.costumes) {
          this.namesOfCostumesAndSounds.add(e.name);
        }
        for (const e of t.sounds) {
          this.namesOfCostumesAndSounds.add(e.name);
        }
      }
    }
    this.oldCompilerStub = b.enabled ? new b.ScriptTreeGeneratorStub(this) : null;
  }
  setProcedureVariant(e) {
    const t = T(e);
    this.script.procedureVariant = e;
    this.script.procedureCode = t;
    this.script.isProcedure = true;
    const n = this.blocks.getProcedureParamNamesIdsAndDefaults(t);
    if (n === null) {
      throw new Error(`IR: cannot find procedure: ${e}`);
    }
    const [r, i, s] = n;
    this.script.arguments = r;
  }
  enableWarp() {
    this.script.isWarp = true;
  }
  getBlockById(e) {
    return this.blocks.getBlock(e) || this.blocks.runtime.flyoutBlocks.getBlock(e);
  }
  getBlockInfo(e) {
    const [t, n] = i.splitFirst(e, "_");
    if (!t || !n) {
      return null;
    }
    const r = this.runtime._blockInfo.find(e => e.id === t);
    if (!r) {
      return null;
    }
    const s = r.blocks.find(e => e.info.opcode === n);
    return s || null;
  }
  createConstantInput(e, t = false) {
    if (e === null) {
      throw new Error("IR: Constant cannot have a null value.");
    }
    const n = +(e += "");
    const r = t && this.namesOfCostumesAndSounds.has(e);
    if (!Number.isNaN(n) && (e.trim() !== "" || e.includes("\t"))) {
      if (r || n.toString() !== e) {
        return new p(u.CONSTANT, h.STRING_NUM, {
          value: e
        });
      } else {
        return new p(u.CONSTANT, p.getNumberInputType(n), {
          value: n
        });
      }
    }
    if (!r) {
      if (e === "true") {
        return new p(u.CONSTANT, h.STRING_BOOLEAN, {
          value: e
        });
      }
      if (e === "false") {
        return new p(u.CONSTANT, h.STRING_BOOLEAN, {
          value: e
        });
      }
    }
    return new p(u.CONSTANT, h.STRING_NAN, {
      value: e
    });
  }
  descendInputOfBlock(e, t, n = false) {
    const r = e.inputs[t];
    if (!r) {
      a.warn(`IR: ${e.opcode}: missing input ${t}`, e);
      return this.createConstantInput(0);
    }
    const i = r.block;
    const s = this.getBlockById(i);
    if (!s) {
      a.warn(`IR: ${e.opcode}: could not find input ${t} with ID ${i}`);
      return this.createConstantInput(0);
    }
    const o = this.descendInput(s, n);
    this.script.yields = this.script.yields || o.yields;
    return o;
  }
  descendInput(e, t = false) {
    if (this.oldCompilerStub) {
      const t = this.oldCompilerStub.descendInputFromNewCompiler(e);
      if (t) {
        return t;
      }
    }
    switch (e.opcode) {
      case "colour_picker":
        return this.createConstantInput(e.fields.COLOUR.value, true);
      case "math_angle":
      case "math_integer":
      case "math_number":
      case "math_positive_number":
      case "math_whole_number":
        return this.createConstantInput(e.fields.NUM.value, t);
      case "text":
        return this.createConstantInput(e.fields.TEXT.value, t);
      case "argument_reporter_string_number":
        {
          const t = String(e.fields.VALUE.value);
          const n = this.script.arguments.lastIndexOf(t);
          if (n === -1 && t.toLowerCase() === "last key pressed") {
            return new p(u.TW_KEY_LAST_PRESSED, h.STRING);
          } else if (n === -1) {
            return this.createConstantInput(0);
          } else {
            return new p(u.PROCEDURE_ARGUMENT, h.ANY, {
              index: n
            });
          }
        }
      case "argument_reporter_boolean":
        {
          const t = String(e.fields.VALUE.value);
          const n = this.script.arguments.lastIndexOf(t);
          if (n === -1) {
            if (t.toLowerCase() === "is compiled?" || t.toLowerCase() === "is turbowarp?") {
              return this.createConstantInput(true).toType(h.BOOLEAN);
            } else {
              return this.createConstantInput(0);
            }
          } else {
            return new p(u.PROCEDURE_ARGUMENT, h.ANY, {
              index: n
            });
          }
        }
      case "data_variable":
        return new p(u.VAR_GET, h.ANY, {
          variable: this.descendVariable(e, "VARIABLE", y)
        });
      case "data_itemoflist":
        return new p(u.LIST_GET, h.ANY, {
          list: this.descendVariable(e, "LIST", E),
          index: this.descendInputOfBlock(e, "INDEX")
        });
      case "data_lengthoflist":
        return new p(u.LIST_LENGTH, h.NUMBER_POS_INT | h.NUMBER_ZERO, {
          list: this.descendVariable(e, "LIST", E)
        });
      case "data_listcontainsitem":
        return new p(u.LIST_CONTAINS, h.BOOLEAN, {
          list: this.descendVariable(e, "LIST", E),
          item: this.descendInputOfBlock(e, "ITEM")
        });
      case "data_itemnumoflist":
        return new p(u.LIST_INDEX_OF, h.NUMBER_POS_INT | h.NUMBER_ZERO, {
          list: this.descendVariable(e, "LIST", E),
          item: this.descendInputOfBlock(e, "ITEM")
        });
      case "data_listcontents":
        return new p(u.LIST_CONTENTS, h.STRING, {
          list: this.descendVariable(e, "LIST", E)
        });
      case "event_broadcast_menu":
        {
          const t = e.fields.BROADCAST_OPTION;
          const n = this.target.lookupBroadcastMsg(t.id, t.value);
          const r = n ? n.name : "";
          return this.createConstantInput(r);
        }
      case "looks_backdropnumbername":
        if (e.fields.NUMBER_NAME.value === "number") {
          return new p(u.LOOKS_BACKDROP_NUMBER, h.NUMBER_POS_INT);
        } else {
          return new p(u.LOOKS_BACKDROP_NAME, h.STRING);
        }
      case "looks_costumenumbername":
        if (e.fields.NUMBER_NAME.value === "number") {
          return new p(u.LOOKS_COSTUME_NUMBER, h.NUMBER_POS_INT);
        } else {
          return new p(u.LOOKS_COSTUME_NAME, h.STRING);
        }
      case "looks_size":
        return new p(u.LOOKS_SIZE_GET, h.NUMBER_POS | h.NUMBER_ZERO);
      case "motion_direction":
        return new p(u.MOTION_DIRECTION_GET, h.NUMBER_REAL);
      case "motion_xposition":
        return new p(u.MOTION_X_GET, h.NUMBER);
      case "motion_yposition":
        return new p(u.MOTION_Y_GET, h.NUMBER);
      case "operator_add":
        return new p(u.OP_ADD, h.NUMBER_OR_NAN, {
          left: this.descendInputOfBlock(e, "NUM1").toType(h.NUMBER),
          right: this.descendInputOfBlock(e, "NUM2").toType(h.NUMBER)
        });
      case "operator_and":
        return new p(u.OP_AND, h.BOOLEAN, {
          left: this.descendInputOfBlock(e, "OPERAND1").toType(h.BOOLEAN),
          right: this.descendInputOfBlock(e, "OPERAND2").toType(h.BOOLEAN)
        });
      case "operator_contains":
        return new p(u.OP_CONTAINS, h.BOOLEAN, {
          string: this.descendInputOfBlock(e, "STRING1").toType(h.STRING),
          contains: this.descendInputOfBlock(e, "STRING2").toType(h.STRING)
        });
      case "operator_divide":
        return new p(u.OP_DIVIDE, h.NUMBER_OR_NAN, {
          left: this.descendInputOfBlock(e, "NUM1").toType(h.NUMBER),
          right: this.descendInputOfBlock(e, "NUM2").toType(h.NUMBER)
        });
      case "operator_equals":
        return new p(u.OP_EQUALS, h.BOOLEAN, {
          left: this.descendInputOfBlock(e, "OPERAND1"),
          right: this.descendInputOfBlock(e, "OPERAND2")
        });
      case "operator_gt":
        return new p(u.OP_GREATER, h.BOOLEAN, {
          left: this.descendInputOfBlock(e, "OPERAND1"),
          right: this.descendInputOfBlock(e, "OPERAND2")
        });
      case "operator_join":
        return new p(u.OP_JOIN, h.STRING, {
          left: this.descendInputOfBlock(e, "STRING1").toType(h.STRING),
          right: this.descendInputOfBlock(e, "STRING2").toType(h.STRING)
        });
      case "operator_length":
        return new p(u.OP_LENGTH, h.NUMBER_POS_INT | h.NUMBER_ZERO, {
          string: this.descendInputOfBlock(e, "STRING").toType(h.STRING)
        });
      case "operator_letter_of":
        return new p(u.OP_LETTER_OF, h.STRING, {
          letter: this.descendInputOfBlock(e, "LETTER").toType(h.NUMBER_INDEX),
          string: this.descendInputOfBlock(e, "STRING").toType(h.STRING)
        });
      case "operator_lt":
        return new p(u.OP_LESS, h.BOOLEAN, {
          left: this.descendInputOfBlock(e, "OPERAND1"),
          right: this.descendInputOfBlock(e, "OPERAND2")
        });
      case "operator_mathop":
        {
          const t = this.descendInputOfBlock(e, "NUM").toType(h.NUMBER);
          switch (e.fields.OPERATOR.value.toLowerCase()) {
            case "abs":
              return new p(u.OP_ABS, h.NUMBER_POS | h.NUMBER_ZERO, {
                value: t
              });
            case "floor":
              return new p(u.OP_FLOOR, h.NUMBER_INT | h.NUMBER_INF, {
                value: t
              });
            case "ceiling":
              return new p(u.OP_CEILING, h.NUMBER_INT | h.NUMBER_INF, {
                value: t
              });
            case "sqrt":
              return new p(u.OP_SQRT, h.NUMBER_OR_NAN, {
                value: t
              });
            case "sin":
              return new p(u.OP_SIN, h.NUMBER_OR_NAN, {
                value: t
              });
            case "cos":
              return new p(u.OP_COS, h.NUMBER_OR_NAN, {
                value: t
              });
            case "tan":
              return new p(u.OP_TAN, h.NUMBER_OR_NAN, {
                value: t
              });
            case "asin":
              return new p(u.OP_ASIN, h.NUMBER_OR_NAN, {
                value: t
              });
            case "acos":
              return new p(u.OP_ACOS, h.NUMBER_OR_NAN, {
                value: t
              });
            case "atan":
              return new p(u.OP_ATAN, h.NUMBER, {
                value: t
              });
            case "ln":
              return new p(u.OP_LOG_E, h.NUMBER_OR_NAN, {
                value: t
              });
            case "log":
              return new p(u.OP_LOG_10, h.NUMBER_OR_NAN, {
                value: t
              });
            case "e ^":
              return new p(u.OP_POW_E, h.NUMBER, {
                value: t
              });
            case "10 ^":
              return new p(u.OP_POW_10, h.NUMBER, {
                value: t
              });
            default:
              return this.createConstantInput(0);
          }
        }
      case "operator_mod":
        return new p(u.OP_MOD, h.NUMBER_OR_NAN, {
          left: this.descendInputOfBlock(e, "NUM1").toType(h.NUMBER),
          right: this.descendInputOfBlock(e, "NUM2").toType(h.NUMBER)
        });
      case "operator_multiply":
        return new p(u.OP_MULTIPLY, h.NUMBER_OR_NAN, {
          left: this.descendInputOfBlock(e, "NUM1").toType(h.NUMBER),
          right: this.descendInputOfBlock(e, "NUM2").toType(h.NUMBER)
        });
      case "operator_not":
        return new p(u.OP_NOT, h.BOOLEAN, {
          operand: this.descendInputOfBlock(e, "OPERAND").toType(h.BOOLEAN)
        });
      case "operator_or":
        return new p(u.OP_OR, h.BOOLEAN, {
          left: this.descendInputOfBlock(e, "OPERAND1").toType(h.BOOLEAN),
          right: this.descendInputOfBlock(e, "OPERAND2").toType(h.BOOLEAN)
        });
      case "operator_random":
        {
          const t = this.descendInputOfBlock(e, "FROM");
          const n = this.descendInputOfBlock(e, "TO");
          if (t.opcode === u.CONSTANT && n.opcode === u.CONSTANT) {
            const e = t.inputs.value;
            const i = n.inputs.value;
            const s = r.toNumber(e);
            const o = r.toNumber(i);
            if (s === o) {
              return this.createConstantInput(s);
            } else if (r.isInt(e) && r.isInt(i)) {
              return new p(u.OP_RANDOM, h.NUMBER, {
                low: (s <= o ? t : n).toType(h.NUMBER),
                high: (s <= o ? n : t).toType(h.NUMBER),
                useInts: true,
                useFloats: false
              });
            } else {
              return new p(u.OP_RANDOM, h.NUMBER_OR_NAN, {
                low: (s <= o ? t : n).toType(h.NUMBER),
                high: (s <= o ? n : t).toType(h.NUMBER),
                useInts: false,
                useFloats: true
              });
            }
          }
          if (t.opcode === u.CONSTANT) {
            if (!r.isInt(r.toNumber(t.inputs.value))) {
              return new p(u.OP_RANDOM, h.NUMBER_OR_NAN, {
                low: t.toType(h.NUMBER),
                high: n.toType(h.NUMBER),
                useInts: false,
                useFloats: true
              });
            }
          } else if (n.opcode === u.CONSTANT && !r.isInt(r.toNumber(t.inputs.value))) {
            return new p(u.OP_RANDOM, h.NUMBER_OR_NAN, {
              low: t.toType(h.NUMBER),
              high: n.toType(h.NUMBER),
              useInts: false,
              useFloats: true
            });
          }
          return new p(u.OP_RANDOM, h.NUMBER_OR_NAN, {
            low: t,
            high: n,
            useInts: false,
            useFloats: false
          });
        }
      case "operator_round":
        return new p(u.OP_ROUND, h.NUMBER_INT | h.NUMBER_INF, {
          value: this.descendInputOfBlock(e, "NUM").toType(h.NUMBER)
        });
      case "operator_subtract":
        return new p(u.OP_SUBTRACT, h.NUMBER_OR_NAN, {
          left: this.descendInputOfBlock(e, "NUM1").toType(h.NUMBER),
          right: this.descendInputOfBlock(e, "NUM2").toType(h.NUMBER)
        });
      case "procedures_call":
        {
          const t = this.getProcedureInfo(e);
          return new p(t.opcode, h.ANY, t.inputs, t.yields);
        }
      case "sensing_answer":
        return new p(u.SENSING_ANSWER, h.STRING);
      case "sensing_coloristouchingcolor":
        return new p(u.SENSING_COLOR_TOUCHING_COLOR, h.BOOLEAN, {
          target: this.descendInputOfBlock(e, "COLOR2").toType(h.COLOR),
          mask: this.descendInputOfBlock(e, "COLOR").toType(h.COLOR)
        });
      case "sensing_current":
        switch (e.fields.CURRENTMENU.value.toLowerCase()) {
          case "year":
            return new p(u.SENSING_TIME_YEAR, h.NUMBER_POS_INT | h.NUMBER_ZERO);
          case "month":
            return new p(u.SENSING_TIME_MONTH, h.NUMBER_POS_INT);
          case "date":
            return new p(u.SENSING_TIME_DATE, h.NUMBER_POS_INT);
          case "dayofweek":
            return new p(u.SENSING_TIME_WEEKDAY, h.NUMBER_POS_INT);
          case "hour":
            return new p(u.SENSING_TIME_HOUR, h.NUMBER_POS_INT | h.NUMBER_ZERO);
          case "minute":
            return new p(u.SENSING_TIME_MINUTE, h.NUMBER_POS_INT | h.NUMBER_ZERO);
          case "second":
            return new p(u.SENSING_TIME_SECOND, h.NUMBER_POS_INT | h.NUMBER_ZERO);
          default:
            return this.createConstantInput(0);
        }
      case "sensing_dayssince2000":
        return new p(u.SENSING_TIME_DAYS_SINCE_2000, h.NUMBER);
      case "sensing_distanceto":
        return new p(u.SENSING_DISTANCE, h.NUMBER_POS | h.NUMBER_ZERO, {
          target: this.descendInputOfBlock(e, "DISTANCETOMENU").toType(h.STRING)
        });
      case "sensing_keypressed":
        return new p(u.SENSING_KEY_DOWN, h.BOOLEAN, {
          key: this.descendInputOfBlock(e, "KEY_OPTION", true)
        });
      case "sensing_mousedown":
        return new p(u.SENSING_MOUSE_DOWN, h.BOOLEAN);
      case "sensing_mousex":
        return new p(u.SENSING_MOUSE_X, h.NUMBER);
      case "sensing_mousey":
        return new p(u.SENSING_MOUSE_Y, h.NUMBER);
      case "sensing_of":
        {
          const t = e.fields.PROPERTY.value;
          const n = this.descendInputOfBlock(e, "OBJECT").toType(h.STRING);
          if (n.opcode !== u.CONSTANT) {
            return new p(u.SENSING_OF, h.ANY, {
              object: n,
              property: t
            });
          }
          if (t === "volume") {
            return new p(u.SENSING_OF_VOLUME, h.NUMBER_POS_REAL | h.NUMBER_ZERO, {
              object: n,
              property: t
            });
          }
          if (n.isConstant("_stage_")) {
            switch (t) {
              case "background #":
              case "backdrop #":
                return new p(u.SENSING_OF_BACKDROP_NUMBER, h.NUMBER_POS_INT);
              case "backdrop name":
                return new p(u.SENSING_OF_BACKDROP_NAME, h.STRING);
            }
          } else {
            switch (t) {
              case "x position":
                return new p(u.SENSING_OF_POS_X, h.NUMBER, {
                  object: n
                });
              case "y position":
                return new p(u.SENSING_OF_POS_Y, h.NUMBER, {
                  object: n
                });
              case "direction":
                return new p(u.SENSING_OF_DIRECTION, h.NUMBER_REAL, {
                  object: n
                });
              case "costume #":
                return new p(u.SENSING_OF_COSTUME_NUMBER, h.NUMBER_POS_INT | h.NUMBER_ZERO, {
                  object: n
                });
              case "costume name":
                return new p(u.SENSING_OF_COSTUME_NAME, h.STRING | h.NUMBER_ZERO, {
                  object: n
                });
              case "size":
                return new p(u.SENSING_OF_SIZE, h.NUMBER_POS | h.NUMBER_ZERO, {
                  object: n
                });
            }
          }
          return new p(u.SENSING_OF_VAR, h.ANY, {
            object: n,
            property: t
          });
        }
      case "sensing_timer":
        this.usesTimer = true;
        return new p(u.SENSING_TIMER_GET, h.NUMBER_POS_REAL | h.NUMBER_ZERO);
      case "sensing_touchingcolor":
        return new p(u.SENSING_TOUCHING_COLOR, h.BOOLEAN, {
          color: this.descendInputOfBlock(e, "COLOR").toType(h.COLOR)
        });
      case "sensing_touchingobject":
        return new p(u.SENSING_TOUCHING_OBJECT, h.BOOLEAN, {
          object: this.descendInputOfBlock(e, "TOUCHINGOBJECTMENU")
        });
      case "sensing_username":
        return new p(u.SENSING_USERNAME, h.STRING);
      case "sound_sounds_menu":
        return this.createConstantInput(e.fields.SOUND_MENU.value, true);
      case "control_get_counter":
        return new p(u.CONTROL_COUNTER, h.NUMBER_POS_INT | h.NUMBER_ZERO);
      case "tw_getLastKeyPressed":
        return new p(u.TW_KEY_LAST_PRESSED, h.STRING);
      default:
        {
          if (this.runtime.getOpcodeFunction(e.opcode)) {
            if (c.inputs.includes(e.opcode)) {
              return this.descendCompatLayerInput(e);
            }
            const t = this.getBlockInfo(e.opcode);
            if (t) {
              const n = t.info.blockType;
              if (n === s.REPORTER || n === s.BOOLEAN) {
                return this.descendCompatLayerInput(e);
              }
            }
          }
          const n = Object.keys(e.inputs);
          const r = Object.keys(e.fields);
          if (n.length === 0 && r.length === 1) {
            return this.createConstantInput(e.fields[r[0]].value, t);
          }
          a.warn(`IR: Unknown input: ${e.opcode}`, e);
          throw new Error(`IR: Unknown input: ${e.opcode}`);
        }
    }
  }
  descendStackedBlock(e) {
    if (this.oldCompilerStub) {
      const t = this.oldCompilerStub.descendStackedBlockFromNewCompiler(e);
      if (t) {
        return t;
      }
    }
    switch (e.opcode) {
      case "control_all_at_once":
        return new d(l.CONTROL_IF_ELSE, {
          condition: this.createConstantInput(true).toType(h.BOOLEAN),
          whenTrue: this.descendSubstack(e, "SUBSTACK"),
          whenFalse: new f()
        });
      case "control_create_clone_of":
        return new d(l.CONTROL_CLONE_CREATE, {
          target: this.descendInputOfBlock(e, "CLONE_OPTION").toType(h.STRING)
        });
      case "control_delete_this_clone":
        return new d(l.CONTROL_CLONE_DELETE);
      case "control_forever":
        return new d(l.CONTROL_WHILE, {
          condition: this.createConstantInput(true).toType(h.BOOLEAN),
          do: this.descendSubstack(e, "SUBSTACK")
        }, this.analyzeLoop());
      case "control_for_each":
        return new d(l.CONTROL_FOR, {
          variable: this.descendVariable(e, "VARIABLE", y),
          count: this.descendInputOfBlock(e, "VALUE").toType(h.NUMBER),
          do: this.descendSubstack(e, "SUBSTACK")
        }, this.analyzeLoop());
      case "control_if":
        return new d(l.CONTROL_IF_ELSE, {
          condition: this.descendInputOfBlock(e, "CONDITION").toType(h.BOOLEAN),
          whenTrue: this.descendSubstack(e, "SUBSTACK"),
          whenFalse: new f()
        });
      case "control_if_else":
        return new d(l.CONTROL_IF_ELSE, {
          condition: this.descendInputOfBlock(e, "CONDITION").toType(h.BOOLEAN),
          whenTrue: this.descendSubstack(e, "SUBSTACK"),
          whenFalse: this.descendSubstack(e, "SUBSTACK2")
        });
      case "control_repeat":
        return new d(l.CONTROL_REPEAT, {
          times: this.descendInputOfBlock(e, "TIMES").toType(h.NUMBER),
          do: this.descendSubstack(e, "SUBSTACK")
        }, this.analyzeLoop());
      case "control_repeat_until":
        {
          this.usesTimer = false;
          const t = this.descendInputOfBlock(e, "CONDITION").toType(h.BOOLEAN);
          const n = this.usesTimer;
          return new d(l.CONTROL_WHILE, {
            condition: new p(u.OP_NOT, h.BOOLEAN, {
              operand: t
            }),
            do: this.descendSubstack(e, "SUBSTACK"),
            warpTimer: n
          }, this.analyzeLoop() || n);
        }
      case "control_stop":
        {
          const t = e.fields.STOP_OPTION.value;
          return new d(t === "all" ? l.CONTROL_STOP_ALL : t === "other scripts in sprite" || t === "other scripts in stage" ? l.CONTROL_STOP_OTHERS : t === "this script" ? l.CONTROL_STOP_SCRIPT : l.NOP);
        }
      case "control_wait":
        return new d(l.CONTROL_WAIT, {
          seconds: this.descendInputOfBlock(e, "DURATION").toType(h.NUMBER)
        }, true);
      case "control_wait_until":
        return new d(l.CONTROL_WAIT_UNTIL, {
          condition: this.descendInputOfBlock(e, "CONDITION").toType(h.BOOLEAN)
        }, true);
      case "control_while":
        return new d(l.CONTROL_WHILE, {
          condition: this.descendInputOfBlock(e, "CONDITION").toType(h.BOOLEAN),
          do: this.descendSubstack(e, "SUBSTACK"),
          warpTimer: false
        }, this.analyzeLoop());
      case "control_clear_counter":
        return new d(l.CONTROL_CLEAR_COUNTER);
      case "control_incr_counter":
        return new d(l.CONTORL_INCR_COUNTER);
      case "data_addtolist":
        return new d(l.LIST_ADD, {
          list: this.descendVariable(e, "LIST", E),
          item: this.descendInputOfBlock(e, "ITEM", true)
        });
      case "data_changevariableby":
        {
          const t = this.descendVariable(e, "VARIABLE", y);
          return new d(l.VAR_SET, {
            variable: t,
            value: new p(u.OP_ADD, h.NUMBER_OR_NAN, {
              left: new p(u.VAR_GET, h.ANY, {
                variable: t
              }).toType(h.NUMBER),
              right: this.descendInputOfBlock(e, "VALUE").toType(h.NUMBER)
            })
          });
        }
      case "data_deletealloflist":
        return new d(l.LIST_DELETE_ALL, {
          list: this.descendVariable(e, "LIST", E)
        });
      case "data_deleteoflist":
        {
          const t = this.descendInputOfBlock(e, "INDEX");
          if (t.isConstant("all")) {
            return new d(l.LIST_DELETE_ALL, {
              list: this.descendVariable(e, "LIST", E)
            });
          } else {
            return new d(l.LIST_DELETE, {
              list: this.descendVariable(e, "LIST", E),
              index: t
            });
          }
        }
      case "data_hidelist":
        return new d(l.LIST_HIDE, {
          list: this.descendVariable(e, "LIST", E)
        });
      case "data_hidevariable":
        return new d(l.VAR_HIDE, {
          variable: this.descendVariable(e, "VARIABLE", y)
        });
      case "data_insertatlist":
        return new d(l.LIST_INSERT, {
          list: this.descendVariable(e, "LIST", E),
          index: this.descendInputOfBlock(e, "INDEX"),
          item: this.descendInputOfBlock(e, "ITEM", true)
        });
      case "data_replaceitemoflist":
        return new d(l.LIST_REPLACE, {
          list: this.descendVariable(e, "LIST", E),
          index: this.descendInputOfBlock(e, "INDEX"),
          item: this.descendInputOfBlock(e, "ITEM", true)
        });
      case "data_setvariableto":
        return new d(l.VAR_SET, {
          variable: this.descendVariable(e, "VARIABLE", y),
          value: this.descendInputOfBlock(e, "VALUE", true)
        });
      case "data_showlist":
        return new d(l.LIST_SHOW, {
          list: this.descendVariable(e, "LIST", E)
        });
      case "data_showvariable":
        return new d(l.VAR_SHOW, {
          variable: this.descendVariable(e, "VARIABLE", y)
        });
      case "event_broadcast":
        return new d(l.EVENT_BROADCAST, {
          broadcast: this.descendInputOfBlock(e, "BROADCAST_INPUT").toType(h.STRING)
        });
      case "event_broadcastandwait":
        return new d(l.EVENT_BROADCAST_AND_WAIT, {
          broadcast: this.descendInputOfBlock(e, "BROADCAST_INPUT").toType(h.STRING)
        }, true);
      case "looks_changeeffectby":
        return new d(l.LOOKS_EFFECT_CHANGE, {
          effect: e.fields.EFFECT.value.toLowerCase(),
          value: this.descendInputOfBlock(e, "CHANGE").toType(h.NUMBER)
        });
      case "looks_changesizeby":
        return new d(l.LOOKS_SIZE_CHANGE, {
          size: this.descendInputOfBlock(e, "CHANGE").toType(h.NUMBER)
        });
      case "looks_cleargraphiceffects":
        return new d(l.LOOKS_EFFECT_CLEAR);
      case "looks_goforwardbackwardlayers":
        if (e.fields.FORWARD_BACKWARD.value === "forward") {
          return new d(l.LOOKS_LAYER_FORWARD, {
            layers: this.descendInputOfBlock(e, "NUM").toType(h.NUMBER)
          });
        } else {
          return new d(l.LOOKS_LAYER_BACKWARD, {
            layers: this.descendInputOfBlock(e, "NUM").toType(h.NUMBER)
          });
        }
      case "looks_gotofrontback":
        if (e.fields.FRONT_BACK.value === "front") {
          return new d(l.LOOKS_LAYER_FRONT);
        } else {
          return new d(l.LOOKS_LAYER_BACK);
        }
      case "looks_hide":
        return new d(l.LOOKS_HIDE);
      case "looks_nextbackdrop":
        return new d(l.LOOKS_BACKDROP_NEXT);
      case "looks_nextcostume":
        return new d(l.LOOKS_COSTUME_NEXT);
      case "looks_say":
        return new d(l.LOOKS_SAY, {
          message: this.descendInputOfBlock(e, "MESSAGE")
        });
      case "looks_seteffectto":
        return new d(l.LOOKS_EFFECT_SET, {
          effect: e.fields.EFFECT.value.toLowerCase(),
          value: this.descendInputOfBlock(e, "VALUE").toType(h.NUMBER)
        });
      case "looks_setsizeto":
        return new d(l.LOOKS_SIZE_SET, {
          size: this.descendInputOfBlock(e, "SIZE").toType(h.NUMBER)
        });
      case "looks_show":
        return new d(l.LOOKS_SHOW);
      case "looks_switchbackdropto":
        return new d(l.LOOKS_BACKDROP_SET, {
          backdrop: this.descendInputOfBlock(e, "BACKDROP", true)
        });
      case "looks_switchcostumeto":
        return new d(l.LOOKS_COSTUME_SET, {
          costume: this.descendInputOfBlock(e, "COSTUME", true)
        });
      case "looks_think":
        return new d(l.LOOKS_THINK, {
          message: this.descendInputOfBlock(e, "MESSAGE")
        });
      case "motion_changexby":
        return new d(l.MOTION_X_CHANGE, {
          dx: this.descendInputOfBlock(e, "DX").toType(h.NUMBER)
        });
      case "motion_changeyby":
        return new d(l.MOTION_Y_CHANGE, {
          dy: this.descendInputOfBlock(e, "DY").toType(h.NUMBER)
        });
      case "motion_gotoxy":
        return new d(l.MOTION_XY_SET, {
          x: this.descendInputOfBlock(e, "X").toType(h.NUMBER),
          y: this.descendInputOfBlock(e, "Y").toType(h.NUMBER)
        });
      case "motion_ifonedgebounce":
        return new d(l.MOTION_IF_ON_EDGE_BOUNCE);
      case "motion_movesteps":
        return new d(l.MOTION_STEP, {
          steps: this.descendInputOfBlock(e, "STEPS").toType(h.NUMBER)
        });
      case "motion_pointindirection":
        return new d(l.MOTION_DIRECTION_SET, {
          direction: this.descendInputOfBlock(e, "DIRECTION").toType(h.NUMBER)
        });
      case "motion_setrotationstyle":
        return new d(l.MOTION_ROTATION_STYLE_SET, {
          style: e.fields.STYLE.value
        });
      case "motion_setx":
        return new d(l.MOTION_X_SET, {
          x: this.descendInputOfBlock(e, "X").toType(h.NUMBER)
        });
      case "motion_sety":
        return new d(l.MOTION_Y_SET, {
          y: this.descendInputOfBlock(e, "Y").toType(h.NUMBER)
        });
      case "motion_turnleft":
        return new d(l.MOTION_DIRECTION_SET, {
          direction: new p(u.OP_SUBTRACT, h.NUMBER, {
            left: new p(u.MOTION_DIRECTION_GET, h.NUMBER),
            right: this.descendInputOfBlock(e, "DEGREES").toType(h.NUMBER)
          })
        });
      case "motion_turnright":
        return new d(l.MOTION_DIRECTION_SET, {
          direction: new p(u.OP_ADD, h.NUMBER, {
            left: new p(u.MOTION_DIRECTION_GET, h.NUMBER),
            right: this.descendInputOfBlock(e, "DEGREES").toType(h.NUMBER)
          })
        });
      case "pen_clear":
        return new d(l.PEN_CLEAR);
      case "pen_changePenColorParamBy":
        return new d(l.PEN_COLOR_PARAM_CHANGE, {
          param: this.descendInputOfBlock(e, "COLOR_PARAM").toType(h.STRING),
          value: this.descendInputOfBlock(e, "VALUE").toType(h.NUMBER)
        });
      case "pen_changePenHueBy":
        return new d(l.PEN_COLOR_HUE_CHANGE_LEGACY, {
          hue: this.descendInputOfBlock(e, "HUE").toType(h.NUMBER)
        });
      case "pen_changePenShadeBy":
        return new d(l.PEN_COLOR_SHADE_CHANGE_LEGACY, {
          shade: this.descendInputOfBlock(e, "SHADE").toType(h.NUMBER)
        });
      case "pen_penDown":
        return new d(l.PEN_DOWN);
      case "pen_penUp":
        return new d(l.PEN_UP);
      case "pen_setPenColorParamTo":
        return new d(l.PEN_COLOR_PARAM_SET, {
          param: this.descendInputOfBlock(e, "COLOR_PARAM").toType(h.STRING),
          value: this.descendInputOfBlock(e, "VALUE").toType(h.NUMBER)
        });
      case "pen_setPenColorToColor":
        return new d(l.PEN_COLOR_SET, {
          color: this.descendInputOfBlock(e, "COLOR")
        });
      case "pen_setPenHueToNumber":
        return new d(l.PEN_COLOR_HUE_SET_LEGACY, {
          hue: this.descendInputOfBlock(e, "HUE").toType(h.NUMBER)
        });
      case "pen_setPenShadeToNumber":
        return new d(l.PEN_COLOR_SHADE_SET_LEGACY, {
          shade: this.descendInputOfBlock(e, "SHADE").toType(h.NUMBER)
        });
      case "pen_setPenSizeTo":
        return new d(l.PEN_SIZE_SET, {
          size: this.descendInputOfBlock(e, "SIZE").toType(h.NUMBER)
        });
      case "pen_changePenSizeBy":
        return new d(l.PEN_SIZE_CHANGE, {
          size: this.descendInputOfBlock(e, "SIZE").toType(h.NUMBER)
        });
      case "pen_stamp":
        return new d(l.PEN_STAMP);
      case "procedures_call":
        {
          const t = e.mutation.proccode;
          if (e.mutation.return) {
            const t = this.descendVisualReport(e);
            if (t) {
              return t;
            }
          }
          if (t === "tw:debugger;") {
            return new d(l.DEBUGGER);
          }
          const n = this.getProcedureInfo(e);
          return new d(n.opcode, n.inputs, n.yields);
        }
      case "procedures_return":
        return new d(l.PROCEDURE_RETURN, {
          value: this.descendInputOfBlock(e, "VALUE")
        });
      case "sensing_resettimer":
        return new d(l.SENSING_TIMER_RESET);
      default:
        {
          if (this.runtime.getOpcodeFunction(e.opcode)) {
            if (c.stacked.includes(e.opcode)) {
              return this.descendCompatLayerStack(e);
            }
            const t = this.getBlockInfo(e.opcode);
            if (t) {
              const n = t.info.blockType;
              if (n === s.COMMAND || n === s.CONDITIONAL || n === s.LOOP) {
                return this.descendCompatLayerStack(e);
              }
            }
          }
          const t = this.descendVisualReport(e);
          if (t) {
            return t;
          }
          a.warn(`IR: Unknown stacked block: ${e.opcode}`, e);
          throw new Error(`IR: Unknown stacked block: ${e.opcode}`);
        }
    }
  }
  descendSubstack(e, t) {
    const n = e.inputs[t];
    if (!n) {
      return new f();
    }
    const r = n.block;
    return this.walkStack(r);
  }
  walkStack(e) {
    const t = new f();
    let n = e;
    while (n !== null) {
      const e = this.getBlockById(n);
      if (!e) {
        break;
      }
      const r = this.descendStackedBlock(e);
      r.blockId = n;
      this.script.yields = this.script.yields || r.yields;
      t.blocks.push(r);
      n = e.next;
    }
    return t;
  }
  getProcedureInfo(e) {
    const t = e.mutation.proccode;
    const n = this.blocks.getProcedureParamNamesIdsAndDefaults(t);
    if (n === null) {
      return {
        opcode: l.NOP,
        yields: false
      };
    }
    const [r, i, s] = n;
    if (this.runtime.getAddonBlock(t)) {
      const n = {};
      for (let t = 0; t < i.length; t++) {
        let o;
        o = e.inputs[i[t]] && e.inputs[i[t]].block ? this.descendInputOfBlock(e, i[t], true) : this.createConstantInput(s[t], true);
        n[r[t]] = o;
      }
      return {
        opcode: l.ADDON_CALL,
        inputs: {
          code: t,
          arguments: n,
          blockId: e.id
        },
        yields: true
      };
    }
    const o = this.blocks.getProcedureDefinition(t);
    const a = this.blocks.getBlock(o);
    if (!a) {
      return {
        opcode: l.NOP,
        yields: false
      };
    }
    const c = this.blocks.getBlock(a.inputs.custom_block.block);
    let u = this.script.isWarp;
    if (!u && c && c.mutation) {
      const e = c.mutation.warp;
      if (typeof e == "boolean") {
        u = e;
      } else if (typeof e == "string") {
        u = JSON.parse(e);
      }
    }
    d = t;
    const h = u ? `W${d}` : `Z${d}`;
    var d;
    if (!this.script.dependedProcedures.includes(h)) {
      this.script.dependedProcedures.push(h);
    }
    const p = [];
    for (let t = 0; t < i.length; t++) {
      let n;
      n = e.inputs[i[t]] && e.inputs[i[t]].block ? this.descendInputOfBlock(e, i[t], true) : this.createConstantInput(s[t], true);
      p.push(n);
    }
    return {
      opcode: l.PROCEDURE_CALL,
      inputs: {
        code: t,
        variant: h,
        arguments: p
      },
      yields: !this.script.isWarp && t === this.script.procedureCode
    };
  }
  descendVisualReport(e) {
    if (!this.thread.stackClick || e.next) {
      return null;
    }
    try {
      const t = this.descendInput(e);
      return new d(l.VISUAL_REPORT, {
        input: t
      }, t.yields);
    } catch (e) {
      return null;
    }
  }
  descendVariable(e, t, n) {
    const r = e.fields[t];
    const i = r.id;
    if (i && Object.prototype.hasOwnProperty.call(this.variableCache, i)) {
      return this.variableCache[i];
    }
    const s = this._descendVariable(i, r.value, n);
    this.variableCache[String(s.id)] = s;
    return s;
  }
  _descendVariable(e, t, n) {
    const r = this.target;
    const i = this.stage;
    if (Object.prototype.hasOwnProperty.call(r.variables, e)) {
      const t = r.variables[String(e)];
      return {
        scope: "target",
        id: t.id,
        name: t.name,
        isCloud: t.isCloud
      };
    }
    if (!r.isStage && i && Object.prototype.hasOwnProperty.call(i.variables, e)) {
      const t = i.variables[String(e)];
      return {
        scope: "stage",
        id: t.id,
        name: t.name,
        isCloud: t.isCloud
      };
    }
    for (const e in r.variables) {
      if (Object.prototype.hasOwnProperty.call(r.variables, e)) {
        const i = r.variables[e];
        if (i.name === t && i.type === n) {
          return {
            scope: "target",
            id: i.id,
            name: i.name,
            isCloud: i.isCloud
          };
        }
      }
    }
    if (!r.isStage && i) {
      for (const e in i.variables) {
        if (Object.prototype.hasOwnProperty.call(i.variables, e)) {
          const r = i.variables[e];
          if (r.name === t && r.type === n) {
            return {
              scope: "stage",
              id: r.id,
              name: r.name,
              isCloud: r.isCloud
            };
          }
        }
      }
    }
    const s = o.create(e, t, n, false);
    r.variables[String(e)] = s;
    if (r.sprite) {
      for (const i of r.sprite.clones) {
        if (!Object.prototype.hasOwnProperty.call(i.variables, e)) {
          i.variables[String(e)] = o.createSibling(s, e, t, n, false);
        }
      }
    }
    return {
      scope: "target",
      id: e,
      name: s.name,
      isCloud: s.isCloud
    };
  }
  descendCompatLayerInput(e) {
    const t = {};
    const n = {};
    for (const n of Object.keys(e.inputs)) {
      t[n] = this.descendInputOfBlock(e, n, true);
    }
    for (const t of Object.keys(e.fields)) {
      n[t] = e.fields[t].value;
    }
    return new p(u.COMPATIBILITY_LAYER, h.ANY, {
      opcode: e.opcode,
      id: e.id,
      inputs: t,
      fields: n
    }, true);
  }
  descendCompatLayerStack(e) {
    const t = {};
    for (const n of Object.keys(e.inputs)) {
      if (!n.startsWith("SUBSTACK")) {
        t[n] = this.descendInputOfBlock(e, n, true);
      }
    }
    const n = {};
    for (const t of Object.keys(e.fields)) {
      n[t] = e.fields[t].value;
    }
    const r = this.getBlockInfo(e.opcode);
    const i = r && r.info && r.info.blockType || s.COMMAND;
    const o = {};
    if (i === s.CONDITIONAL || i === s.LOOP) {
      for (const t in e.inputs) {
        if (!t.startsWith("SUBSTACK")) {
          continue;
        }
        const n = t === "SUBSTACK" ? 1 : +t.substring(8);
        if (!isNaN(n)) {
          o[n] = this.descendSubstack(e, t);
        }
      }
    }
    return new d(l.COMPATIBILITY_LAYER, {
      opcode: e.opcode,
      id: e.id,
      blockType: i,
      inputs: t,
      fields: n,
      substacks: o
    }, true);
  }
  analyzeLoop() {
    return !this.script.isWarp || this.script.warpTimer;
  }
  readTopBlockComment(e) {
    const t = this.target.comments[e];
    if (!t) {
      return;
    }
    const n = t.text;
    for (const e of n.split("\n")) {
      if (!/^tw\b/.test(e)) {
        continue;
      }
      const t = e.split(" ");
      for (const e of t) {
        switch (e) {
          case "nocompile":
            throw new Error("Script explicitly disables compilation");
          case "stuck":
            this.script.warpTimer = true;
        }
      }
      break;
    }
  }
  walkHat(e) {
    const t = e.next;
    const n = e.opcode;
    const r = this.runtime._hats[n];
    if (this.thread.stackClick) {
      if (this.runtime.getOpcodeFunction(n)) {
        const n = this.descendCompatLayerStack(e);
        this.script.yields = this.script.yields || n.yields;
        return new f([n, ...this.walkStack(t).blocks]);
      }
      return this.walkStack(t);
    }
    if (r.edgeActivated) {
      this.script.yields = true;
      this.script.executableHat = true;
      return new f([new d(l.HAT_EDGE, {
        id: e.id,
        condition: this.descendCompatLayerInput(e).toType(h.BOOLEAN)
      }), ...this.walkStack(t).blocks]);
    }
    if (this.runtime.getOpcodeFunction(n)) {
      this.script.yields = true;
      this.script.executableHat = true;
      return new f([new d(l.HAT_PREDICATE, {
        condition: this.descendCompatLayerInput(e).toType(h.BOOLEAN)
      }), ...this.walkStack(t).blocks]);
    } else {
      return this.walkStack(t);
    }
  }
  generate(e) {
    this.blocks.populateProcedureCache();
    this.script.topBlockId = e;
    const t = this.getBlockById(e);
    if (!t) {
      if (this.script.isProcedure) {
        return this.script;
      }
      throw new Error("Cannot find top block");
    }
    if (t.comment) {
      this.readTopBlockComment(t.comment);
    }
    if (this.runtime._hats[t.opcode]) {
      this.script.stack = this.walkHat(t);
    } else {
      let n;
      n = t.opcode === "procedures_definition" ? t.next : e;
      if (n) {
        this.script.stack = this.walkStack(n);
      }
    }
    return this.script;
  }
}
module.exports = {
  ScriptTreeGenerator: v,
  IRGenerator: class {
    constructor(e) {
      this.thread = e;
      this.blocks = e.blockContainer;
      this.proceduresToCompile = new Map();
      this.compilingProcedures = new Map();
      this.procedures = {};
      this.analyzedProcedures = new Set();
    }
    addProcedureDependencies(e) {
      for (const t of e) {
        if (Object.prototype.hasOwnProperty.call(this.procedures, t)) {
          continue;
        }
        if (this.compilingProcedures.has(t)) {
          continue;
        }
        if (this.proceduresToCompile.has(t)) {
          continue;
        }
        const e = T(t);
        const n = this.blocks.getProcedureDefinition(e);
        this.proceduresToCompile.set(t, n);
      }
    }
    generateScriptTree(e, t) {
      const n = e.generate(t);
      this.addProcedureDependencies(n.dependedProcedures);
      return n;
    }
    analyzeScript(e) {
      let t = false;
      for (const n of e.dependedProcedures) {
        const r = this.procedures[n];
        if (!this.analyzedProcedures.has(n)) {
          this.analyzedProcedures.add(n);
          if (this.analyzeScript(r)) {
            t = true;
          }
        }
        if (r.yields && !e.yields) {
          e.yields = true;
          t = true;
        }
      }
      return t;
    }
    generate() {
      const e = this.generateScriptTree(new v(this.thread), this.thread.topBlock);
      const t = this.blocks._cache.compiledProcedures;
      while (this.proceduresToCompile.size > 0) {
        this.compilingProcedures = this.proceduresToCompile;
        this.proceduresToCompile = new Map();
        for (const [e, n] of this.compilingProcedures.entries()) {
          if (t[e]) {
            const n = t[e];
            this.procedures[e] = n;
            this.addProcedureDependencies(n.dependedProcedures);
          } else {
            const r = e.charAt(0) === "W";
            const i = new v(this.thread);
            i.setProcedureVariant(e);
            if (r) {
              i.enableWarp();
            }
            const s = this.generateScriptTree(i, n);
            this.procedures[e] = s;
            t[e] = s;
          }
        }
      }
      while (this.analyzeScript(e)) {
        this.analyzedProcedures = new Set();
      }
      return new g(e, this.procedures);
    }
  }
};