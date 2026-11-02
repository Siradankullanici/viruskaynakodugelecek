const r = require("./5.js");
const i = require("./62.js");
const s = require("./3.js");
const o = require("./2.js");
const a = require("./1.js");
const c = require("./4.js");
const l = require("./12.js");
const u = require("./0.js");
const {
  fetchWithTimeout: h
} = require("./42.js");
const d = "ALTO";
const p = "TENOR";
const f = "SQUEAK";
const m = "GIANT";
const g = "KITTEN";
const b = "ar";
const y = "zh-cn";
const E = "da";
const T = "nl";
const v = "en";
const A = "fr";
const w = "de";
const S = "hi";
const k = "is";
const I = "it";
const O = "ja";
const N = "ko";
const R = "nb";
const x = "pl";
const M = "pt-br";
const C = "pt";
const P = "ro";
const L = "ru";
const D = "es";
const B = "es-419";
const U = "sv";
const F = "tr";
const j = "cy";
class z {
  constructor(e) {
    this.runtime = e;
    this._soundPlayers = new Map();
    this._stopAllSpeech = this._stopAllSpeech.bind(this);
    if (this.runtime) {
      this.runtime.on("PROJECT_STOP_ALL", this._stopAllSpeech);
    }
    this._onTargetCreated = this._onTargetCreated.bind(this);
    if (this.runtime) {
      e.on("targetWasCreated", this._onTargetCreated);
    }
    this._supportedLocales = this._getSupportedLocales();
  }
  get VOICE_INFO() {
    return {
      [d]: {
        name: r({
          id: "text2speech.alto",
          default: "alto",
          description: "Name for a voice with ambiguous gender."
        }),
        gender: "female",
        playbackRate: 1
      },
      [p]: {
        name: r({
          id: "text2speech.tenor",
          default: "tenor",
          description: "Name for a voice with ambiguous gender."
        }),
        gender: "male",
        playbackRate: 1
      },
      [f]: {
        name: r({
          id: "text2speech.squeak",
          default: "squeak",
          description: "Name for a funny voice with a high pitch."
        }),
        gender: "female",
        playbackRate: 1.19
      },
      [m]: {
        name: r({
          id: "text2speech.giant",
          default: "giant",
          description: "Name for a funny voice with a low pitch."
        }),
        gender: "male",
        playbackRate: 0.84
      },
      [g]: {
        name: r({
          id: "text2speech.kitten",
          default: "kitten",
          description: "A baby cat."
        }),
        gender: "female",
        playbackRate: 1.41
      }
    };
  }
  get LANGUAGE_INFO() {
    return {
      [b]: {
        name: "Arabic",
        locales: ["ar"],
        speechSynthLocale: "arb",
        singleGender: true
      },
      [y]: {
        name: "Chinese (Mandarin)",
        locales: ["zh-cn", "zh-tw"],
        speechSynthLocale: "cmn-CN",
        singleGender: true
      },
      [E]: {
        name: "Danish",
        locales: ["da"],
        speechSynthLocale: "da-DK"
      },
      [T]: {
        name: "Dutch",
        locales: ["nl"],
        speechSynthLocale: "nl-NL"
      },
      [v]: {
        name: "English",
        locales: ["en"],
        speechSynthLocale: "en-US"
      },
      [A]: {
        name: "French",
        locales: ["fr"],
        speechSynthLocale: "fr-FR"
      },
      [w]: {
        name: "German",
        locales: ["de"],
        speechSynthLocale: "de-DE"
      },
      [S]: {
        name: "Hindi",
        locales: ["hi"],
        speechSynthLocale: "hi-IN",
        singleGender: true
      },
      [k]: {
        name: "Icelandic",
        locales: ["is"],
        speechSynthLocale: "is-IS"
      },
      [I]: {
        name: "Italian",
        locales: ["it"],
        speechSynthLocale: "it-IT"
      },
      [O]: {
        name: "Japanese",
        locales: ["ja", "ja-hira"],
        speechSynthLocale: "ja-JP"
      },
      [N]: {
        name: "Korean",
        locales: ["ko"],
        speechSynthLocale: "ko-KR",
        singleGender: true
      },
      [R]: {
        name: "Norwegian",
        locales: ["nb", "nn"],
        speechSynthLocale: "nb-NO",
        singleGender: true
      },
      [x]: {
        name: "Polish",
        locales: ["pl"],
        speechSynthLocale: "pl-PL"
      },
      [M]: {
        name: "Portuguese (Brazilian)",
        locales: ["pt-br"],
        speechSynthLocale: "pt-BR"
      },
      [C]: {
        name: "Portuguese (European)",
        locales: ["pt"],
        speechSynthLocale: "pt-PT"
      },
      [P]: {
        name: "Romanian",
        locales: ["ro"],
        speechSynthLocale: "ro-RO",
        singleGender: true
      },
      [L]: {
        name: "Russian",
        locales: ["ru"],
        speechSynthLocale: "ru-RU"
      },
      [D]: {
        name: "Spanish (European)",
        locales: ["es"],
        speechSynthLocale: "es-ES"
      },
      [B]: {
        name: "Spanish (Latin American)",
        locales: ["es-419"],
        speechSynthLocale: "es-US"
      },
      [U]: {
        name: "Swedish",
        locales: ["sv"],
        speechSynthLocale: "sv-SE",
        singleGender: true
      },
      [F]: {
        name: "Turkish",
        locales: ["tr"],
        speechSynthLocale: "tr-TR",
        singleGender: true
      },
      [j]: {
        name: "Welsh",
        locales: ["cy"],
        speechSynthLocale: "cy-GB",
        singleGender: true
      }
    };
  }
  static get STATE_KEY() {
    return "Scratch.text2speech";
  }
  static get DEFAULT_TEXT2SPEECH_STATE() {
    return {
      voiceId: d
    };
  }
  get DEFAULT_LANGUAGE() {
    return "en";
  }
  _getState(e) {
    let t = e.getCustomState(z.STATE_KEY);
    if (!t) {
      t = l.simple(z.DEFAULT_TEXT2SPEECH_STATE);
      e.setCustomState(z.STATE_KEY, t);
    }
    return t;
  }
  _onTargetCreated(e, t) {
    if (t) {
      const n = t.getCustomState(z.STATE_KEY);
      if (n) {
        e.setCustomState(z.STATE_KEY, l.simple(n));
      }
    }
  }
  getInfo() {
    let e = "hello";
    if (this.isSupportedLanguage(this.getEditorLanguage())) {
      e = r({
        id: "text2speech.defaultTextToSpeak",
        default: "hello",
        description: "hello: the default text to speak"
      });
    }
    return {
      id: "text2speech",
      name: r({
        id: "text2speech.categoryName",
        default: "Text to Speech",
        description: "Name of the Text to Speech extension."
      }),
      blockIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48dGl0bGU+RXh0ZW5zaW9ucy9Tb2Z0d2FyZS9UZXh0LXRvLVNwZWVjaC1CbG9jazwvdGl0bGU+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIuMTUiPjxwYXRoIGZpbGw9IiM0ZDRkNGQiIGQ9Ik0xNS41IDIxLjY3YzAtMS4wMTYtMS40OTQtMS41ODYtMi4zODctLjc4MmwtMi43IDIuMTYzQTUuOTYgNS45NiAwIDAgMSA2LjcgMjQuMzNoLS40Yy0xLjAzNSAwLTEuOC42OS0xLjggMS41NzN2NC4yMzVjMCAuODgzLjc2NSAxLjU3MiAxLjggMS41NzJoLjRjMS40NTggMCAyLjc1NC40MjMgMy44MiAxLjI4N2wyLjU5OCAyLjE2MWMuOTA4Ljc1IDIuMzgyLjE4OCAyLjM4Mi0uODc2eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNS42NDQgMjAuNWMtMS42NjcgMS45MzctNC41MzkgMy40MjktNS45NzcgMy40MjlhMS4yNSAxLjI1IDAgMCAxLS41NTctLjEzN2MtLjM3Mi0uMTg2LS42MS0uNTQyLS42MS0xLjAzcTAtLjE1Ny4wNS0uMzA4Yy4wNzYtLjIzNi42MjQtLjk4Ni43MjctMS4xNzMuMjctLjQ4NC40NjItMS4wNzUuNTY2LTEuODY1QTguNSA4LjUgMCAwIDEgMjQgMy41aDRhOC41IDguNSAwIDEgMSAwIDE3eiIvPjwvZz48L3N2Zz4=",
      menuIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48dGl0bGU+RXh0ZW5zaW9ucy9Tb2Z0d2FyZS9UZXh0LXRvLVNwZWVjaC1NZW51PC90aXRsZT48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjxwYXRoIGZpbGw9IiM0ZDRkNGQiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSIgc3Ryb2tlLXdpZHRoPSIuNSIgZD0iTTcuNzUgMTAuODM1YzAtLjUwOC0uNzQ3LS43OTMtMS4xOTQtLjM5bC0xLjM1IDEuMDhjLS41MS40MDgtMS4xNjkuNjQtMS44NTYuNjRoLS4yYy0uNTE3IDAtLjkuMzQ2LS45Ljc4N3YyLjExN2MwIC40NDIuMzgzLjc4Ny45Ljc4N2guMmMuNzI5IDAgMS4zNzcuMjEgMS45MS42NDNsMS4zIDEuMDhjLjQ1My4zNzYgMS4xOS4wOTUgMS4xOS0uNDM3eiIvPjxwYXRoIGZpbGw9IiMwZWJkOGMiIGQ9Ik0xMi43MDUgMTBjLS45MTQgMS4xMzEtMi4zOTggMS43MTQtMi44NzIgMS43MTQgMCAwLS4zMzMgMC0uMzMzLS4zMzMgMC0uMjk2LjU2Mi0uNDguNjktMS44MTNBNCA0IDAgMCAxIDEyIDJoMmE0IDQgMCAxIDEgMCA4eiIvPjwvZz48L3N2Zz4=",
      blocks: [{
        opcode: "speakAndWait",
        text: r({
          id: "text2speech.speakAndWaitBlock",
          default: "speak [WORDS]",
          description: "Speak some words."
        }),
        blockType: o.COMMAND,
        arguments: {
          WORDS: {
            type: s.STRING,
            defaultValue: e
          }
        }
      }, {
        opcode: "setVoice",
        text: r({
          id: "text2speech.setVoiceBlock",
          default: "set voice to [VOICE]",
          description: "Set the voice for speech synthesis."
        }),
        blockType: o.COMMAND,
        arguments: {
          VOICE: {
            type: s.STRING,
            menu: "voices",
            defaultValue: d
          }
        }
      }, {
        opcode: "setLanguage",
        text: r({
          id: "text2speech.setLanguageBlock",
          default: "set language to [LANGUAGE]",
          description: "Set the language for speech synthesis."
        }),
        blockType: o.COMMAND,
        arguments: {
          LANGUAGE: {
            type: s.STRING,
            menu: "languages",
            defaultValue: this.getCurrentLanguage()
          }
        }
      }],
      menus: {
        voices: {
          acceptReporters: true,
          items: this.getVoiceMenu()
        },
        languages: {
          acceptReporters: true,
          items: this.getLanguageMenu()
        }
      }
    };
  }
  getEditorLanguage() {
    return (r.setup().locale || navigator.language || navigator.userLanguage || this.DEFAULT_LANGUAGE).toLowerCase();
  }
  getCurrentLanguage() {
    const e = this.runtime.getTargetForStage();
    if (e) {
      if (!e.textToSpeechLanguage) {
        this.setCurrentLanguage(this.getEditorLanguage());
      }
      return e.textToSpeechLanguage;
    } else {
      return this.DEFAULT_LANGUAGE;
    }
  }
  setCurrentLanguage(e) {
    const t = this.runtime.getTargetForStage();
    if (!t) {
      return;
    }
    if (this.isSupportedLanguage(e)) {
      t.textToSpeechLanguage = this._getExtensionLocaleForSupportedLocale(e);
    }
    const n = i.nameMap[e.toLowerCase()];
    if (n && this.isSupportedLanguage(n)) {
      t.textToSpeechLanguage = this._getExtensionLocaleForSupportedLocale(n);
    }
    t.textToSpeechLanguage ||= this.DEFAULT_LANGUAGE;
  }
  _getExtensionLocaleForSupportedLocale(e) {
    for (const t in this.LANGUAGE_INFO) {
      if (this.LANGUAGE_INFO[t].locales.includes(e)) {
        return t;
      }
    }
    u.error(`cannot find extension locale for locale ${e}`);
  }
  _getSpeechSynthLocale() {
    let e = this.LANGUAGE_INFO[this.DEFAULT_LANGUAGE].speechSynthLocale;
    if (this.LANGUAGE_INFO[this.getCurrentLanguage()]) {
      e = this.LANGUAGE_INFO[this.getCurrentLanguage()].speechSynthLocale;
    }
    return e;
  }
  _getSupportedLocales() {
    return Object.keys(this.LANGUAGE_INFO).reduce((e, t) => e.concat(this.LANGUAGE_INFO[t].locales), []);
  }
  isSupportedLanguage(e) {
    return this._supportedLocales.includes(e);
  }
  getVoiceMenu() {
    return Object.keys(this.VOICE_INFO).map(e => ({
      text: this.VOICE_INFO[e].name,
      value: e
    }));
  }
  getLanguageMenu() {
    const e = this.getEditorLanguage();
    const t = {};
    let n = i.menuMap[e];
    if (n) {
      let r = [];
      if (i.spokenLanguages) {
        r = i.spokenLanguages[e];
        n = n.concat(r);
      }
      n.forEach(e => {
        t[e.code] = e.name;
      });
    }
    return Object.keys(this.LANGUAGE_INFO).map(e => {
      let n = this.LANGUAGE_INFO[e].name;
      const r = t[e];
      if (r) {
        n = r;
      }
      n = n.charAt(0).toUpperCase() + n.slice(1);
      return {
        text: n,
        value: e
      };
    });
  }
  setVoice(e, t) {
    const n = this._getState(t.target);
    let r = e.VOICE;
    let i = parseInt(r, 10);
    if (!isNaN(i)) {
      i -= 1;
      i = c.wrapClamp(i, 0, Object.keys(this.VOICE_INFO).length - 1);
      r = Object.keys(this.VOICE_INFO)[i];
    }
    if (Object.keys(this.VOICE_INFO).includes(r)) {
      n.voiceId = r;
    }
  }
  setLanguage(e) {
    this.setCurrentLanguage(e.LANGUAGE);
  }
  _stopAllSpeech() {
    this._soundPlayers.forEach(e => {
      e.stop();
    });
  }
  speakAndWait(e, t) {
    let n = a.toString(e.WORDS);
    let r = this._getSpeechSynthLocale();
    const i = this._getState(t.target);
    let s = this.VOICE_INFO[i.voiceId].gender;
    let o = this.VOICE_INFO[i.voiceId].playbackRate;
    if (this.LANGUAGE_INFO[this.getCurrentLanguage()].singleGender) {
      s = "female";
      if (i.voiceId === p) {
        o = 0.89;
      }
      if (i.voiceId === m) {
        o = 0.79;
      }
    }
    if (i.voiceId === g) {
      n = n.replace(/\S+/g, "meow");
      r = this.LANGUAGE_INFO[this.DEFAULT_LANGUAGE].speechSynthLocale;
    }
    let c = `https://synthesis-service.scratch.mit.edu/synth`;
    c += `?locale=${r}`;
    c += `&gender=${s}`;
    c += `&text=${encodeURIComponent(n.substring(0, 128))}`;
    return h(c, {}, 10000).then(e => {
      if (e.status !== 200) {
        throw new Error(`HTTP ${e.status} error reaching translation service`);
      }
      return e.arrayBuffer();
    }).then(e => {
      const t = {
        data: {
          buffer: e
        }
      };
      return this.runtime.audioEngine.decodeSoundPlayer(t);
    }).then(e => {
      this._soundPlayers.set(e.id, e);
      e.setPlaybackRate(o);
      const t = this.runtime.audioEngine.createEffectChain();
      t.set("volume", 250);
      e.connect(t);
      e.play();
      return new Promise(t => {
        e.on("stop", () => {
          this._soundPlayers.delete(e.id);
          t();
        });
      });
    }).catch(e => {
      u.warn(e);
    });
  }
}
module.exports = z;