const r = require("./3.js");
const i = require("./2.js");
const s = require("./12.js");
const o = require("./1.js");
const a = require("./5.js");
const c = require("./4.js");
const l = require("./14.js");
let u = {};
try {
  u = require("./118.js");
} catch (e) {}
class h {
  constructor(e) {
    this.runtime = e;
    this._concurrencyCounter = 0;
    this._drumPlayers = [];
    this._instrumentPlayerArrays = [];
    this._instrumentPlayerNoteArrays = [];
    this._bufferSources = [];
    this._loadAllSounds();
    this._onTargetCreated = this._onTargetCreated.bind(this);
    this.runtime.on("targetWasCreated", this._onTargetCreated);
    this._playNoteForPicker = this._playNoteForPicker.bind(this);
    this.runtime.on("PLAY_NOTE", this._playNoteForPicker);
  }
  _loadAllSounds() {
    const e = [];
    this.DRUM_INFO.forEach((t, n) => {
      const r = `drums/${t.fileName}`;
      const i = this._storeSound(r, n, this._drumPlayers);
      e.push(i);
    });
    this.INSTRUMENT_INFO.forEach((t, n) => {
      this._instrumentPlayerArrays[n] = [];
      this._instrumentPlayerNoteArrays[n] = [];
      t.samples.forEach((r, i) => {
        const s = `instruments/${t.dirName}/${r}`;
        const o = this._storeSound(s, i, this._instrumentPlayerArrays[n]);
        e.push(o);
      });
    });
    Promise.all(e).then(() => {});
  }
  _storeSound(e, t, n) {
    const r = `${e}.mp3`;
    if (!u[r]) {
      return;
    }
    const i = u[r];
    return fetch(i).then(e => e.arrayBuffer()).then(e => this._decodeSound(e)).then(e => {
      n[t] = e;
    });
  }
  _decodeSound(e) {
    const t = this.runtime.audioEngine;
    if (t) {
      return t.decodeSoundPlayer({
        data: {
          buffer: e
        }
      });
    } else {
      return Promise.reject(new Error("No Audio Context Detected"));
    }
  }
  _buildMenu(e) {
    return e.map((e, t) => {
      const n = {
        text: e.name
      };
      n.value = String(t + 1);
      return n;
    });
  }
  get DRUM_INFO() {
    return [{
      name: a({
        id: "music.drumSnare",
        default: "(1) Snare Drum",
        description: "Sound of snare drum as used in a standard drum kit"
      }),
      fileName: "1-snare"
    }, {
      name: a({
        id: "music.drumBass",
        default: "(2) Bass Drum",
        description: "Sound of bass drum as used in a standard drum kit"
      }),
      fileName: "2-bass-drum"
    }, {
      name: a({
        id: "music.drumSideStick",
        default: "(3) Side Stick",
        description: "Sound of a drum stick hitting the side of a drum (usually the snare)"
      }),
      fileName: "3-side-stick"
    }, {
      name: a({
        id: "music.drumCrashCymbal",
        default: "(4) Crash Cymbal",
        description: "Sound of a drum stick hitting a crash cymbal"
      }),
      fileName: "4-crash-cymbal"
    }, {
      name: a({
        id: "music.drumOpenHiHat",
        default: "(5) Open Hi-Hat",
        description: "Sound of a drum stick hitting a hi-hat while open"
      }),
      fileName: "5-open-hi-hat"
    }, {
      name: a({
        id: "music.drumClosedHiHat",
        default: "(6) Closed Hi-Hat",
        description: "Sound of a drum stick hitting a hi-hat while closed"
      }),
      fileName: "6-closed-hi-hat"
    }, {
      name: a({
        id: "music.drumTambourine",
        default: "(7) Tambourine",
        description: "Sound of a tambourine being struck"
      }),
      fileName: "7-tambourine"
    }, {
      name: a({
        id: "music.drumHandClap",
        default: "(8) Hand Clap",
        description: "Sound of two hands clapping together"
      }),
      fileName: "8-hand-clap"
    }, {
      name: a({
        id: "music.drumClaves",
        default: "(9) Claves",
        description: "Sound of claves being struck together"
      }),
      fileName: "9-claves"
    }, {
      name: a({
        id: "music.drumWoodBlock",
        default: "(10) Wood Block",
        description: "Sound of a wood block being struck"
      }),
      fileName: "10-wood-block"
    }, {
      name: a({
        id: "music.drumCowbell",
        default: "(11) Cowbell",
        description: "Sound of a cowbell being struck"
      }),
      fileName: "11-cowbell"
    }, {
      name: a({
        id: "music.drumTriangle",
        default: "(12) Triangle",
        description: "Sound of a triangle (instrument) being struck"
      }),
      fileName: "12-triangle"
    }, {
      name: a({
        id: "music.drumBongo",
        default: "(13) Bongo",
        description: "Sound of a bongo being struck"
      }),
      fileName: "13-bongo"
    }, {
      name: a({
        id: "music.drumConga",
        default: "(14) Conga",
        description: "Sound of a conga being struck"
      }),
      fileName: "14-conga"
    }, {
      name: a({
        id: "music.drumCabasa",
        default: "(15) Cabasa",
        description: "Sound of a cabasa being shaken"
      }),
      fileName: "15-cabasa"
    }, {
      name: a({
        id: "music.drumGuiro",
        default: "(16) Guiro",
        description: "Sound of a guiro being played"
      }),
      fileName: "16-guiro"
    }, {
      name: a({
        id: "music.drumVibraslap",
        default: "(17) Vibraslap",
        description: "Sound of a Vibraslap being played"
      }),
      fileName: "17-vibraslap"
    }, {
      name: a({
        id: "music.drumCuica",
        default: "(18) Cuica",
        description: "Sound of a cuica being played"
      }),
      fileName: "18-cuica"
    }];
  }
  get INSTRUMENT_INFO() {
    return [{
      name: a({
        id: "music.instrumentPiano",
        default: "(1) Piano",
        description: "Sound of a piano"
      }),
      dirName: "1-piano",
      releaseTime: 0.5,
      samples: [24, 36, 48, 60, 72, 84, 96, 108]
    }, {
      name: a({
        id: "music.instrumentElectricPiano",
        default: "(2) Electric Piano",
        description: "Sound of an electric piano"
      }),
      dirName: "2-electric-piano",
      releaseTime: 0.5,
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentOrgan",
        default: "(3) Organ",
        description: "Sound of an organ"
      }),
      dirName: "3-organ",
      releaseTime: 0.5,
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentGuitar",
        default: "(4) Guitar",
        description: "Sound of an accoustic guitar"
      }),
      dirName: "4-guitar",
      releaseTime: 0.5,
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentElectricGuitar",
        default: "(5) Electric Guitar",
        description: "Sound of an electric guitar"
      }),
      dirName: "5-electric-guitar",
      releaseTime: 0.5,
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentBass",
        default: "(6) Bass",
        description: "Sound of an accoustic upright bass"
      }),
      dirName: "6-bass",
      releaseTime: 0.25,
      samples: [36, 48]
    }, {
      name: a({
        id: "music.instrumentPizzicato",
        default: "(7) Pizzicato",
        description: "Sound of a string instrument (e.g. violin) being plucked"
      }),
      dirName: "7-pizzicato",
      releaseTime: 0.25,
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentCello",
        default: "(8) Cello",
        description: "Sound of a cello being played with a bow"
      }),
      dirName: "8-cello",
      releaseTime: 0.1,
      samples: [36, 48, 60]
    }, {
      name: a({
        id: "music.instrumentTrombone",
        default: "(9) Trombone",
        description: "Sound of a trombone being played"
      }),
      dirName: "9-trombone",
      samples: [36, 48, 60]
    }, {
      name: a({
        id: "music.instrumentClarinet",
        default: "(10) Clarinet",
        description: "Sound of a clarinet being played"
      }),
      dirName: "10-clarinet",
      samples: [48, 60]
    }, {
      name: a({
        id: "music.instrumentSaxophone",
        default: "(11) Saxophone",
        description: "Sound of a saxophone being played"
      }),
      dirName: "11-saxophone",
      samples: [36, 60, 84]
    }, {
      name: a({
        id: "music.instrumentFlute",
        default: "(12) Flute",
        description: "Sound of a flute being played"
      }),
      dirName: "12-flute",
      samples: [60, 72]
    }, {
      name: a({
        id: "music.instrumentWoodenFlute",
        default: "(13) Wooden Flute",
        description: "Sound of a wooden flute being played"
      }),
      dirName: "13-wooden-flute",
      samples: [60, 72]
    }, {
      name: a({
        id: "music.instrumentBassoon",
        default: "(14) Bassoon",
        description: "Sound of a bassoon being played"
      }),
      dirName: "14-bassoon",
      samples: [36, 48, 60]
    }, {
      name: a({
        id: "music.instrumentChoir",
        default: "(15) Choir",
        description: "Sound of a choir singing"
      }),
      dirName: "15-choir",
      releaseTime: 0.25,
      samples: [48, 60, 72]
    }, {
      name: a({
        id: "music.instrumentVibraphone",
        default: "(16) Vibraphone",
        description: "Sound of a vibraphone being struck"
      }),
      dirName: "16-vibraphone",
      releaseTime: 0.5,
      samples: [60, 72]
    }, {
      name: a({
        id: "music.instrumentMusicBox",
        default: "(17) Music Box",
        description: "Sound of a music box playing"
      }),
      dirName: "17-music-box",
      releaseTime: 0.25,
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentSteelDrum",
        default: "(18) Steel Drum",
        description: "Sound of a steel drum being struck"
      }),
      dirName: "18-steel-drum",
      releaseTime: 0.5,
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentMarimba",
        default: "(19) Marimba",
        description: "Sound of a marimba being struck"
      }),
      dirName: "19-marimba",
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentSynthLead",
        default: "(20) Synth Lead",
        description: "Sound of a \"lead\" synthesizer being played"
      }),
      dirName: "20-synth-lead",
      releaseTime: 0.1,
      samples: [60]
    }, {
      name: a({
        id: "music.instrumentSynthPad",
        default: "(21) Synth Pad",
        description: "Sound of a \"pad\" synthesizer being played"
      }),
      dirName: "21-synth-pad",
      releaseTime: 0.25,
      samples: [60]
    }];
  }
  get MIDI_INSTRUMENTS() {
    return [1, 1, 1, 1, 2, 2, 4, 4, 17, 17, 17, 16, 19, 16, 17, 17, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 7, 8, 19, 8, 8, 8, 8, 15, 15, 15, 19, 9, 9, 9, 9, 9, 9, 9, 9, 11, 11, 11, 11, 14, 14, 14, 10, 12, 12, 13, 13, 13, 13, 12, 12, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 4, 4, 4, 4, 17, 14, 8, 10, 17, 17, 18, 19, 1, 1, 1, 1, 21, 21, 21, 21, 21, 21, 21, 21];
  }
  get MIDI_DRUMS() {
    return [[1, -4], [1, 0], [2, 0], [0, 0], [7, 0], [0, 2], [1, -6, 4], [5, 0], [1, -3, 3.2], [5, 0], [1, 0, 3], [4, -8], [1, 4, 3], [1, 7, 2.7], [3, -8], [1, 10, 2.7], [4, -2], [3, -11], [4, 2], [6, 0], [3, 0, 3.5], [10, 0], [3, -8, 3.5], [16, -6], [4, 2], [12, 2], [12, 0], [13, 0, 0.2], [13, 0, 2], [13, -5, 2], [12, 12], [12, 5], [10, 19], [10, 12], [14, 0], [14, 0], [17, 12], [17, 5], [15, 0], [15, 0], [8, 0], [9, 0], [9, -4], [17, -5], [17, 0], [11, -6, 1], [11, -6, 3]];
  }
  static get STATE_KEY() {
    return "Scratch.music";
  }
  static get DEFAULT_MUSIC_STATE() {
    return {
      currentInstrument: 0
    };
  }
  static get MIDI_NOTE_RANGE() {
    return {
      min: 0,
      max: 130
    };
  }
  static get BEAT_RANGE() {
    return {
      min: 0,
      max: 100
    };
  }
  static get TEMPO_RANGE() {
    return {
      min: 20,
      max: 500
    };
  }
  static get CONCURRENCY_LIMIT() {
    return 30;
  }
  _getMusicState(e) {
    let t = e.getCustomState(h.STATE_KEY);
    if (!t) {
      t = s.simple(h.DEFAULT_MUSIC_STATE);
      e.setCustomState(h.STATE_KEY, t);
    }
    return t;
  }
  _onTargetCreated(e, t) {
    if (t) {
      const n = t.getCustomState(h.STATE_KEY);
      if (n) {
        e.setCustomState(h.STATE_KEY, s.simple(n));
      }
    }
  }
  getInfo() {
    return {
      id: "music",
      name: a({
        id: "music.categoryName",
        default: "Music",
        description: "Label for the Music extension category"
      }),
      menuIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZmlsbD0iIzU3NWU3NSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYuMDkgMTIuOTM3Yy4yMjggMS4xNDEtLjgzMyAyLjA2My0yLjM3MyAyLjA2My0xLjUzNSAwLTIuOTYyLS45MjItMy4xODYtMi4wNjMtLjIzLTEuMTQyLjgzMy0yLjA2OCAyLjM3Mi0yLjA2OC4zMjMgMCAuNjQxLjA0Mi45NDUuMTE3YTMuNSAzLjUgMCAwIDEgLjQ2OC4xNTFjLjQzNS0uMDEtLjA1Mi0xLjE0Ny0uOTE3LTYuMTE0LTEuMDY3LTYuMTUyIDEuNTMtLjkzNSA0LjM4NC0xLjM3N3MuMDM4IDIuNDEtMS44MjUgMS45MjJjLTEuODYyLS40OTMtMi4zMjUtMy41NzcuMTMyIDcuMzd6TTcuNDYgOC41NjNjLTEuODYyLS40OTMtMi4zMjUtMy41NzYuMTMgNy4zN0M3LjgxNiAxNy4wNzMgNi43NTQgMTggNS4yMiAxOHMtMi45NjEtLjkyNi0zLjE5LTIuMDY4Yy0uMjI0LTEuMTQyLjgzNy0yLjA2NyAyLjM3NS0yLjA2Ny41MDEgMCAuOTg3LjA5OCAxLjQyNy4yNzIuNDEyLS4wMjgtLjA3NC0xLjE4OS0uOTMtNi4xMTQtMS4wNjgtNi4xNTMgMS41MjgtLjkzNiA0LjM4LTEuMzc3IDIuODU0LS40NDcuMDM4IDIuNDEtMS44MjMgMS45MTd6Ii8+PC9zdmc+",
      blockIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHRpdGxlPm11c2ljLWJsb2NrLWljb248L3RpdGxlPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMzIuMTggMjUuODc0QzMyLjYzNiAyOC4xNTcgMzAuNTEyIDMwIDI3LjQzMyAzMGMtMy4wNyAwLTUuOTIzLTEuODQzLTYuMzcyLTQuMTI2LS40NTgtMi4yODUgMS42NjUtNC4xMzYgNC43NDMtNC4xMzZhOCA4IDAgMCAxIDEuODkuMjM0Yy4zMzguMDg2LjYzNy4xOC45MzguMzAyLjg3LS4wMi0uMTA0LTIuMjk0LTEuODM1LTEyLjIzLTIuMTM0LTEyLjMwMiAzLjA2LTEuODcgOC43NjgtMi43NTIgNS43MDgtLjg4NS4wNzYgNC44Mi0zLjY1IDMuODQ0LTMuNzI0LS45ODctNC42NS03LjE1My4yNjMgMTQuNzM4em0tMTYuOTk4IDUuOTlDMTUuNjMgMzQuMTQ4IDEzLjUwNyAzNiAxMC40NCAzNmMtMy4wNyAwLTUuOTIyLTEuODUyLTYuMzgtNC4xMzYtLjQ0OC0yLjI4NCAxLjY3NC00LjEzNSA0Ljc1LTQuMTM1IDEuMDAzIDAgMS45NzUuMTk2IDIuODU1LjU0My44MjItLjA1NS0uMTUtMi4zNzctMS44NjItMTIuMjI4LTIuMTMzLTEyLjMwMyAzLjA2LTEuODcgOC43NjQtMi43NTMgNS43MDYtLjg5NC4wNzYgNC44Mi0zLjY0OCAzLjgzNHMtNC42NS03LjE1Mi4yNjIgMTQuNzM4eiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgeGxpbms6aHJlZj0iI2EiIGZpbGw9IiNmZmYiLz48cGF0aCBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIuMSIgZD0iTTI4LjQ1NiAyMS42NzVjLS4wMS0uMzEyLS4wODctLjgyNS0uMjU2LTEuNzAyLS4wOTYtLjQ5NS0uNjEyLTMuMDIyLS43NTMtMy43My0uMzk1LTEuOTgtLjc2LTMuOTItMS4xNDItNi4xMTMtLjczMi00LjIyMy0uNjkzLTYuMDUuMzQ0LTYuNTI3LjUtLjIzIDEuMDYtLjA4IDEuODQuMzUuNDE0LjIyNyAyLjE4MiAxLjM2NSAyLjA3IDEuMjk2IDEuOTk0IDEuMjQyIDMuNDY0IDEuNzc0IDQuOTMgMS41NDggMS41MjYtLjIzNyAyLjUwNC0uMDYgMi44NzYuNjE4LjM0OC42MzUuMDE1IDEuNDE2LS43MyAyLjE4LTEuNDcyIDEuNTE2LTMuOTc1IDIuNTE0LTUuODQ4IDIuMDIzLS44MjItLjIyLTEuMjM4LS40NjUtMi4zOC0xLjI2N2wtLjA5NS0uMDY2Yy4wNDcuNTkzLjI2NCAxLjc0LjcxNyAzLjgwMy4yOTQgMS4zMzYgMi4wOCA5LjE4NyAyLjYzNyAxMS42NzRsLjAwMi4wMTJjLjUyOCAyLjYzNy0xLjg3MyA0LjcyNC01LjIzNiA0LjcyNC0zLjI5IDAtNi4zNjMtMS45ODgtNi44NjItNC41MjgtLjUzLTIuNjQgMS44NzMtNC43MzQgNS4yMzMtNC43MzRhOC40IDguNCAwIDAgMSAyLjY1LjQzN3ptLTE2Ljk5NiA1Ljk5Yy0uMDEtLjMxOC0uMDktLjgzOC0uMjY2LTEuNzM3LS4wOS0uNDYtLjU5NS0yLjkzNy0uNzUzLTMuNzI3LS4zOS0xLjk2LS43NS0zLjg5LTEuMTMtNi4wNy0uNzMyLTQuMjIzLS42OTItNi4wNS4zNDQtNi41MjYuNTAyLS4yMyAxLjA2LS4wODIgMS44NC4zNS40MTUuMjI3IDIuMTgyIDEuMzY0IDIuMDcgMS4yOTUgMS45OTMgMS4yNDIgMy40NjIgMS43NzQgNC45MjYgMS41NDggMS41MjUtLjI0IDIuNTA0LS4wNjQgMi44NzYuNjE0LjM0OC42MzUuMDE1IDEuNDE1LS43MjggMi4xOC0xLjQ3NCAxLjUxNy0zLjk3NyAyLjUxMy01Ljg0NyAyLjAxNy0uODItLjIyLTEuMjM2LS40NjQtMi4zNzgtMS4yNjdsLS4wOTUtLjA2NWMuMDQ3LjU5My4yNjQgMS43NC43MTcgMy44MDIuMjk0IDEuMzM3IDIuMDc4IDkuMTkgMi42MzYgMTEuNjc1bC4wMDMuMDEzYy41MTcgMi42MzgtMS44ODQgNC43MzItNS4yMzQgNC43MzItMy4yODcgMC02LjM2LTEuOTkzLTYuODctNC41NC0uNTItMi42NCAxLjg4NC00LjczIDUuMjQtNC43My45MDUgMCAxLjgwMy4xNSAyLjY1LjQzNnoiLz48L2c+PC9zdmc+",
      blocks: [{
        opcode: "playDrumForBeats",
        blockType: i.COMMAND,
        text: a({
          id: "music.playDrumForBeats",
          default: "play drum [DRUM] for [BEATS] beats",
          description: "play drum sample for a number of beats"
        }),
        arguments: {
          DRUM: {
            type: r.NUMBER,
            menu: "DRUM",
            defaultValue: 1
          },
          BEATS: {
            type: r.NUMBER,
            defaultValue: 0.25
          }
        }
      }, {
        opcode: "midiPlayDrumForBeats",
        blockType: i.COMMAND,
        text: a({
          id: "music.midiPlayDrumForBeats",
          default: "play drum [DRUM] for [BEATS] beats",
          description: "play drum sample for a number of beats according to a mapping of MIDI codes"
        }),
        arguments: {
          DRUM: {
            type: r.NUMBER,
            menu: "DRUM",
            defaultValue: 1
          },
          BEATS: {
            type: r.NUMBER,
            defaultValue: 0.25
          }
        },
        hideFromPalette: true
      }, {
        opcode: "restForBeats",
        blockType: i.COMMAND,
        text: a({
          id: "music.restForBeats",
          default: "rest for [BEATS] beats",
          description: "rest (play no sound) for a number of beats"
        }),
        arguments: {
          BEATS: {
            type: r.NUMBER,
            defaultValue: 0.25
          }
        }
      }, {
        opcode: "playNoteForBeats",
        blockType: i.COMMAND,
        text: a({
          id: "music.playNoteForBeats",
          default: "play note [NOTE] for [BEATS] beats",
          description: "play a note for a number of beats"
        }),
        arguments: {
          NOTE: {
            type: r.NOTE,
            defaultValue: 60
          },
          BEATS: {
            type: r.NUMBER,
            defaultValue: 0.25
          }
        }
      }, {
        opcode: "setInstrument",
        blockType: i.COMMAND,
        text: a({
          id: "music.setInstrument",
          default: "set instrument to [INSTRUMENT]",
          description: "set the instrument (e.g. piano, guitar, trombone) for notes played"
        }),
        arguments: {
          INSTRUMENT: {
            type: r.NUMBER,
            menu: "INSTRUMENT",
            defaultValue: 1
          }
        }
      }, {
        opcode: "midiSetInstrument",
        blockType: i.COMMAND,
        text: a({
          id: "music.midiSetInstrument",
          default: "set instrument to [INSTRUMENT]",
          description: "set the instrument for notes played according to a mapping of MIDI codes"
        }),
        arguments: {
          INSTRUMENT: {
            type: r.NUMBER,
            defaultValue: 1
          }
        },
        hideFromPalette: true
      }, {
        opcode: "setTempo",
        blockType: i.COMMAND,
        text: a({
          id: "music.setTempo",
          default: "set tempo to [TEMPO]",
          description: "set tempo (speed) for notes, drums, and rests played"
        }),
        arguments: {
          TEMPO: {
            type: r.NUMBER,
            defaultValue: 60
          }
        }
      }, {
        opcode: "changeTempo",
        blockType: i.COMMAND,
        text: a({
          id: "music.changeTempo",
          default: "change tempo by [TEMPO]",
          description: "change tempo (speed) for notes, drums, and rests played"
        }),
        arguments: {
          TEMPO: {
            type: r.NUMBER,
            defaultValue: 20
          }
        }
      }, {
        opcode: "getTempo",
        text: a({
          id: "music.getTempo",
          default: "tempo",
          description: "get the current tempo (speed) for notes, drums, and rests played"
        }),
        blockType: i.REPORTER
      }],
      menus: {
        DRUM: {
          acceptReporters: true,
          items: this._buildMenu(this.DRUM_INFO)
        },
        INSTRUMENT: {
          acceptReporters: true,
          items: this._buildMenu(this.INSTRUMENT_INFO)
        }
      }
    };
  }
  _isConcurrencyLimited() {
    return this.runtime.runtimeOptions.miscLimits && this._concurrencyCounter > h.CONCURRENCY_LIMIT;
  }
  playDrumForBeats(e, t) {
    this._playDrumForBeats(e.DRUM, e.BEATS, t);
  }
  midiPlayDrumForBeats(e, t) {
    let n = o.toNumber(e.DRUM);
    n = Math.round(n);
    const r = this.MIDI_DRUMS[n - 35];
    n = r ? r[0] : 2;
    n += 1;
    this._playDrumForBeats(n, e.BEATS, t);
  }
  _playDrumForBeats(e, t, n) {
    if (this._stackTimerNeedsInit(n)) {
      e = o.toNumber(e);
      e = Math.round(e);
      e -= 1;
      e = c.wrapClamp(e, 0, this.DRUM_INFO.length - 1);
      t = o.toNumber(t);
      t = this._clampBeats(t);
      this._playDrumNum(n, e);
      this._startStackTimer(n, this._beatsToSec(t));
    } else {
      this._checkStackTimer(n);
    }
  }
  _playDrumNum(e, t) {
    if (e.runtime.audioEngine === null) {
      return;
    }
    if (e.target.sprite.soundBank === null) {
      return;
    }
    if (this._isConcurrencyLimited()) {
      return;
    }
    const n = this._drumPlayers[t];
    if (n === undefined) {
      return;
    }
    if (n.isPlaying && !n.isStarting) {
      n.take();
    }
    const r = e.runtime.audioEngine;
    const i = r.audioContext.createGain();
    i.gain.setValueAtTime(e.target.volume / 100, r.currentTime);
    i.connect(r.getInputNode());
    this._concurrencyCounter++;
    n.once("stop", () => {
      this._concurrencyCounter--;
    });
    n.play();
    n.connect({
      getInputNode: () => i
    });
  }
  restForBeats(e, t) {
    if (this._stackTimerNeedsInit(t)) {
      let n = o.toNumber(e.BEATS);
      n = this._clampBeats(n);
      this._startStackTimer(t, this._beatsToSec(n));
    } else {
      this._checkStackTimer(t);
    }
  }
  playNoteForBeats(e, t) {
    if (this._stackTimerNeedsInit(t)) {
      let n = o.toNumber(e.NOTE);
      n = c.clamp(n, h.MIDI_NOTE_RANGE.min, h.MIDI_NOTE_RANGE.max);
      let r = o.toNumber(e.BEATS);
      r = this._clampBeats(r);
      if (r === 0) {
        return;
      }
      const i = this._beatsToSec(r);
      this._playNote(t, n, i);
      this._startStackTimer(t, i);
    } else {
      this._checkStackTimer(t);
    }
  }
  _playNoteForPicker(e, t) {
    if (t !== this.getInfo().name) {
      return;
    }
    const n = {
      runtime: this.runtime,
      target: this.runtime.getEditingTarget()
    };
    this._playNote(n, e, 0.25);
  }
  _playNote(e, t, n) {
    if (e.runtime.audioEngine === null) {
      return;
    }
    if (e.target.sprite.soundBank === null) {
      return;
    }
    if (this._isConcurrencyLimited()) {
      return;
    }
    const r = this._getMusicState(e.target).currentInstrument;
    const i = this.INSTRUMENT_INFO[r].samples;
    const s = this._selectSampleIndexForNote(t, i);
    if (this._instrumentPlayerArrays[r] === undefined) {
      return;
    }
    if (this._instrumentPlayerArrays[r][s] === undefined) {
      return;
    }
    const o = e.runtime.audioEngine;
    this._instrumentPlayerNoteArrays[r][t] ||= this._instrumentPlayerArrays[r][s].take();
    const a = this._instrumentPlayerNoteArrays[r][t];
    if (a.isPlaying && !a.isStarting) {
      a.take();
    }
    const c = i[s];
    const l = this._ratioForPitchInterval(t - c);
    const u = o.audioContext;
    const h = u.createGain();
    h.gain.setValueAtTime(e.target.volume / 100, o.currentTime);
    const d = u.createGain();
    h.connect(d);
    d.connect(o.getInputNode());
    let p = this.INSTRUMENT_INFO[r].releaseTime;
    if (p === undefined) {
      p = 0.01;
    }
    const f = u.currentTime + n;
    const m = f + p;
    d.gain.setValueAtTime(1, f);
    d.gain.linearRampToValueAtTime(0.0001, m);
    this._concurrencyCounter++;
    a.once("stop", () => {
      this._concurrencyCounter--;
    });
    a.play();
    a.connect({
      getInputNode: () => h
    });
    a.outputNode.playbackRate.value = l;
    a.outputNode.stop(m);
  }
  _selectSampleIndexForNote(e, t) {
    for (let n = t.length - 1; n >= 0; n--) {
      if (e >= t[n]) {
        return n;
      }
    }
    return 0;
  }
  _ratioForPitchInterval(e) {
    return Math.pow(2, e / 12);
  }
  _clampBeats(e) {
    return c.clamp(e, h.BEAT_RANGE.min, h.BEAT_RANGE.max);
  }
  _beatsToSec(e) {
    return 60 / this.getTempo() * e;
  }
  _stackTimerNeedsInit(e) {
    return !e.stackFrame.timer;
  }
  _startStackTimer(e, t) {
    e.stackFrame.timer = new l();
    e.stackFrame.timer.start();
    e.stackFrame.duration = t;
    e.yield();
  }
  _checkStackTimer(e) {
    if (e.stackFrame.timer.timeElapsed() < e.stackFrame.duration * 1000) {
      e.yield();
    }
  }
  setInstrument(e, t) {
    this._setInstrument(e.INSTRUMENT, t, false);
  }
  midiSetInstrument(e, t) {
    this._setInstrument(e.INSTRUMENT, t, true);
  }
  _setInstrument(e, t, n) {
    const r = this._getMusicState(t.target);
    e = o.toNumber(e);
    e = Math.round(e);
    e -= 1;
    if (n) {
      e = (this.MIDI_INSTRUMENTS[e] || 0) - 1;
    }
    e = c.wrapClamp(e, 0, this.INSTRUMENT_INFO.length - 1);
    r.currentInstrument = e;
  }
  setTempo(e) {
    const t = o.toNumber(e.TEMPO);
    this._updateTempo(t);
  }
  changeTempo(e) {
    const t = o.toNumber(e.TEMPO) + this.getTempo();
    this._updateTempo(t);
  }
  _updateTempo(e) {
    e = c.clamp(e, h.TEMPO_RANGE.min, h.TEMPO_RANGE.max);
    const t = this.runtime.getTargetForStage();
    if (t) {
      t.tempo = e;
    }
  }
  getTempo() {
    const e = this.runtime.getTargetForStage();
    if (e) {
      return e.tempo;
    } else {
      return 60;
    }
  }
}
module.exports = h;