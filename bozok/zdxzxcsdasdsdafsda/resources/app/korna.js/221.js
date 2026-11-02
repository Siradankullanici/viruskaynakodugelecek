const r = require("./5.js");
const i = require("./3.js");
const s = require("./2.js");
const o = require("./1.js");
const a = "SPACE";
const c = "LEFT";
const l = "RIGHT";
const u = "UP";
const h = "DOWN";
const d = {
  [a]: "space",
  [c]: "left arrow",
  [u]: "up arrow",
  [l]: "right arrow",
  [h]: "down arrow"
};
module.exports = class {
  constructor(e) {
    this.runtime = e;
    this.frameToggle = false;
    setInterval(() => {
      this.frameToggle = !this.frameToggle;
    }, this.runtime.currentStepTime);
    this.keyPressed = this.keyPressed.bind(this);
    this.runtime.on("KEY_PRESSED", this.keyPressed);
    this._clearkeyPressBuffer = this._clearkeyPressBuffer.bind(this);
    this.runtime.on("PROJECT_STOP_ALL", this._clearkeyPressBuffer);
    this.sequences = {};
    this.keyPressBuffer = [];
  }
  get KEY_TEXT_SHORT() {
    return {
      [a]: r({
        id: "makeymakey.spaceKey",
        default: "space",
        description: "The space key on a computer keyboard."
      }),
      [c]: r({
        id: "makeymakey.leftArrowShort",
        default: "left",
        description: "Short name for the left arrow key on a computer keyboard."
      }),
      [u]: r({
        id: "makeymakey.upArrowShort",
        default: "up",
        description: "Short name for the up arrow key on a computer keyboard."
      }),
      [l]: r({
        id: "makeymakey.rightArrowShort",
        default: "right",
        description: "Short name for the right arrow key on a computer keyboard."
      }),
      [h]: r({
        id: "makeymakey.downArrowShort",
        default: "down",
        description: "Short name for the down arrow key on a computer keyboard."
      })
    };
  }
  get DEFAULT_SEQUENCES() {
    return [`${c} ${u} ${l}`, `${l} ${u} ${c}`, `${c} ${l}`, `${l} ${c}`, `${u} ${h}`, `${h} ${u}`, `${u} ${l} ${h} ${c}`, `${u} ${c} ${h} ${l}`, `${u} ${u} ${h} ${h} ${c} ${l} ${c} ${l}`];
  }
  getInfo() {
    return {
      id: "makeymakey",
      name: "Makey Makey",
      blockIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHN0eWxlPi5zdDJ7ZmlsbDpyZWR9LnN0M3tmaWxsOiNlMGUwZTB9LnN0NHtmaWxsOm5vbmU7c3Ryb2tlOiM2NjY7c3Ryb2tlLXdpZHRoOi41O3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PHBhdGggaWQ9IkxheWVyXzYiIGZpbGw9IiNmZmYiIGQ9Ik0zNSAyOEg1YTEgMSAwIDAgMS0xLTFWMTJjMC0uNi40LTEgMS0xaDMwYy41IDAgMSAuNCAxIDF2MTVjMCAuNS0uNSAxLTEgMSIvPjxnIGlkPSJMYXllcl80Ij48cGF0aCBkPSJNNCAyNWgzMnYyLjdINHptOS0xaC0yLjJhMSAxIDAgMCAxLTEtMXYtOS43YzAtLjYuNC0xIDEtMUgxM2MuNiAwIDEgLjQgMSAxVjIzYzAgLjYtLjUgMS0xIDEiIGNsYXNzPSJzdDIiLz48cGF0aCBkPSJNNi4xIDE5LjN2LTIuMmMwLS41LjQtMSAxLTFoOS43Yy41IDAgMSAuNSAxIDF2Mi4yYzAgLjUtLjUgMS0xIDFINy4xYTEgMSAwIDAgMS0xLTEiIGNsYXNzPSJzdDIiLz48Y2lyY2xlIGN4PSIyMi44IiBjeT0iMTguMiIgcj0iMy40IiBjbGFzcz0ic3QyIi8+PGNpcmNsZSBjeD0iMzAuNiIgY3k9IjE4LjIiIHI9IjMuNCIgY2xhc3M9InN0MiIvPjxwYXRoIGQ9Ik00LjIgMjdoMzEuOXYuN0g0LjJ6IiBjbGFzcz0ic3QyIi8+PC9nPjxnIGlkPSJMYXllcl81Ij48Y2lyY2xlIGN4PSIyMi44IiBjeT0iMTguMiIgcj0iMi4zIiBjbGFzcz0ic3QzIi8+PGNpcmNsZSBjeD0iMzAuNiIgY3k9IjE4LjIiIHI9IjIuMyIgY2xhc3M9InN0MyIvPjxwYXRoIGQ9Ik0xMi41IDIyLjloLTEuMmMtLjMgMC0uNS0uMi0uNS0uNVYxNGMwLS4zLjItLjUuNS0uNWgxLjJjLjMgMCAuNS4yLjUuNXY4LjRjMCAuMy0uMi41LS41LjUiIGNsYXNzPSJzdDMiLz48cGF0aCBkPSJNNy4yIDE4Ljd2LTEuMmMwLS4zLjItLjUuNS0uNWg4LjRjLjMgMCAuNS4yLjUuNXYxLjJjMCAuMy0uMi41LS41LjVINy43Yy0uMyAwLS41LS4yLS41LS41TTQgMjZoMzJ2Mkg0eiIgY2xhc3M9InN0MyIvPjwvZz48ZyBpZD0iTGF5ZXJfMyI+PHBhdGggZD0iTTM1LjIgMjcuOUg0LjhhMSAxIDAgMCAxLTEtMVYxMi4xYzAtLjYuNS0xIDEtMWgzMC41Yy41IDAgMSAuNCAxIDFWMjdhMSAxIDAgMCAxLTEuMS45eiIgY2xhc3M9InN0NCIvPjxwYXRoIGQ9Ik0zNS4yIDI3LjlINC44YTEgMSAwIDAgMS0xLTFWMTIuMWMwLS42LjUtMSAxLTFoMzAuNWMuNSAwIDEgLjQgMSAxVjI3YTEgMSAwIDAgMS0xLjEuOXoiIGNsYXNzPSJzdDQiLz48L2c+PC9zdmc+",
      blocks: [{
        opcode: "whenMakeyKeyPressed",
        text: r({
          id: "makeymakey.whenKeyPressed",
          default: "when [KEY] key pressed",
          description: "when a keyboard key is pressed"
        }),
        blockType: s.HAT,
        arguments: {
          KEY: {
            type: i.STRING,
            menu: "KEY",
            defaultValue: a
          }
        }
      }, {
        opcode: "whenCodePressed",
        text: r({
          id: "makeymakey.whenKeysPressedInOrder",
          default: "when [SEQUENCE] pressed in order",
          description: "when a sequence of keyboard keys is pressed in a specific order"
        }),
        blockType: s.HAT,
        arguments: {
          SEQUENCE: {
            type: i.STRING,
            menu: "SEQUENCE",
            defaultValue: this.DEFAULT_SEQUENCES[0]
          }
        }
      }],
      menus: {
        KEY: {
          acceptReporters: true,
          items: [{
            text: r({
              id: "makeymakey.spaceKey",
              default: "space",
              description: "The space key on a computer keyboard."
            }),
            value: a
          }, {
            text: r({
              id: "makeymakey.upArrow",
              default: "up arrow",
              description: "The up arrow key on a computer keyboard."
            }),
            value: u
          }, {
            text: r({
              id: "makeymakey.downArrow",
              default: "down arrow",
              description: "The down arrow key on a computer keyboard."
            }),
            value: h
          }, {
            text: r({
              id: "makeymakey.rightArrow",
              default: "right arrow",
              description: "The right arrow key on a computer keyboard."
            }),
            value: l
          }, {
            text: r({
              id: "makeymakey.leftArrow",
              default: "left arrow",
              description: "The left arrow key on a computer keyboard."
            }),
            value: c
          }, {
            text: "w",
            value: "w"
          }, {
            text: "a",
            value: "a"
          }, {
            text: "s",
            value: "s"
          }, {
            text: "d",
            value: "d"
          }, {
            text: "f",
            value: "f"
          }, {
            text: "g",
            value: "g"
          }]
        },
        SEQUENCE: {
          acceptReporters: true,
          items: this.buildSequenceMenu(this.DEFAULT_SEQUENCES)
        }
      }
    };
  }
  buildSequenceMenu(e) {
    return e.map(e => this.getMenuItemForSequenceString(e));
  }
  getMenuItemForSequenceString(e) {
    let t = e.split(" ");
    t = t.map(e => this.KEY_TEXT_SHORT[e]);
    return {
      text: t.join(" "),
      value: e
    };
  }
  whenMakeyKeyPressed(e, t) {
    let n = e.KEY;
    if (d[e.KEY]) {
      n = d[e.KEY];
    }
    return t.ioQuery("keyboard", "getKeyIsDown", [n]) && this.frameToggle;
  }
  keyPressed(e) {
    e = (e = e.split(" ")[0]).toUpperCase();
    this.keyPressBuffer.push(e);
    if (this.keyPressBuffer.length > 100) {
      this.keyPressBuffer.shift();
    }
    for (const e in this.sequences) {
      const t = this.sequences[e].array;
      if (this.keyPressBuffer.length < t.length) {
        continue;
      }
      let n = false;
      const r = this.keyPressBuffer.slice(t.length * -1);
      for (let e = 0; e < t.length; e++) {
        if (t[e] !== r[e]) {
          n = true;
        }
      }
      if (!n) {
        this.sequences[e].completed = true;
        setTimeout(() => {
          this.sequences[e].completed = false;
        }, 100);
      }
    }
  }
  _clearkeyPressBuffer() {
    this.keyPressBuffer = [];
  }
  addSequence(e, t) {
    if (!Object.prototype.hasOwnProperty.call(this.sequences, e)) {
      this.sequences[e] = {
        array: t,
        completed: false
      };
    }
  }
  whenCodePressed(e) {
    const t = o.toString(e.SEQUENCE).toUpperCase();
    const n = t.split(" ");
    if (!(n.length < 2)) {
      this.addSequence(t, n);
      return this.sequences[t].completed;
    }
  }
};