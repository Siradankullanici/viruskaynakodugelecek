const r = require("./3.js");
const i = require("./2.js");
const s = require("./1.js");
const o = require("./0.js");
const {
  fetchWithTimeout: a
} = require("./42.js");
const c = require("./62.js");
const l = require("./5.js");
module.exports = class {
  constructor() {
    this._viewerLanguageCode = this.getViewerLanguageCode();
    this._supportedLanguages = [];
    this._randomLanguageCode = "en";
    this._translateResult = "";
    this._lastLangTranslated = "";
    this._lastTextTranslated = "";
  }
  static get STATE_KEY() {
    return "Scratch.translate";
  }
  getInfo() {
    this._supportedLanguages = this._getSupportedLanguages(this.getViewerLanguageCode());
    this._randomLanguageCode = this._supportedLanguages[Math.floor(Math.random() * this._supportedLanguages.length)].value;
    return {
      id: "translate",
      name: l({
        id: "translate.categoryName",
        default: "Translate",
        description: "Name of extension that adds translate blocks"
      }),
      blockIconURI: "data:image/png;base64,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",
      menuIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAACXBIWXMAABYlAAAWJQFJUiTwAAABXFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAOvYwAAACOjo6EhIQOvYx4eHicnJwOvYytra0OvYykpKSfn5/BwcEOvYy0tLSvr6+pqakOvYy1tbXExMQOvYy+vr66urrCwsIOvYzLy8vFxcXAwMC9vb3GxsYOvYzKysrHx8cOvYy9vb20tLTLy8sOvYzR0dHPz88OvYzU1NTS0tIOvYza2trX19fV1dUOvYze3t7c3Nz////9/f36+vr4+Pj0+P/19fXx8fHp8v/u7u7s7Ozq6+7d6//n5+fl5eXS5f/i4uLf4eXg4ODb29vH3v/Z2dnV19y82P/R0dG10/+x0f/KzNSgx/+bxP+rv9uVwf+Rv/+1uMKPvv+huNmIt/h/tP+gpLFsqf9rqf9lpf+Wmqhho/9fov9coP9an/9Znv9Ynf9VnP9Smv9Rmf9Nl/+BhpdJkPMOvYx2fI5rcoZhZ31XXnVRayw6AAAAOXRSTlMAAgUHCgwOEBMbHSAgMTBBQENFTlBSU1ZgZHBwcnOBgI6QkpOgoK2usLS3vMDJydDX1+Dk5OXw8vIZ3wVeAAACCklEQVR42tXU7XPSMBzA8SAoDjYEFcUxrIN1PoHMbaJpC7UFbOfDUKdOUFHLfM6MmP//zoQuCWm90ze+8PsCcsnnfnc0APhvWlipKa0s0M06xljPKa6wbRtwLsPeLgCgNzGtBGSZLc4k3crQgyyjWQkrNj/vtfnKrgBaehNjXcKaGPjtrRhZY67MRmp5ASGtvT8ajdAX+rI/G8tgGYcpcIBEAw5zoasrEHpP0QfP+4gGHuQQlJhrpiUM+4o8D32GUEAmpZPwGTr4hJ5IyMprwkkIJwi9gwLy4rB3gNCkZzh9n3btfFhxMRGBvTeUTdD3F77Tmcvx144r8CFC6Dlsv35lw0j25eQRrJps4PuXd+nbPRfGcs/xL08fih6YcWhWj+CxdQfyHvFF9/CwG3sCydU77myS4z7mh0NChhKKTjYMutG/eOYqP/xByPQ38IILoelXEuKZ7pDplOzEYdUy3capBBBwTIZjMo7DxetrxdT8LU1JEJCff77OPTJrLwbT2lkFBmS8uxuQIArTTYxL85CQLvtAREDpqJQ/NDVDwDqelaPLZTsO7WUOcZhGl6kNK+qsjRSHeY2yzTJgZRpuJ8xiyui4jQyQ6Ri30uEyVbgUdpNJ89ZpOk+WbWHczAKlzA2HSn8JKJVamNIryl5y1e9AK3otWZ3SOlBKLK3fvl8Ef1XqROJf/Xv/Ao6e1+rnxxl1AAAAAElFTkSuQmCC",
      blocks: [{
        opcode: "getTranslate",
        text: l({
          id: "translate.translateBlock",
          default: "translate [WORDS] to [LANGUAGE]",
          description: "translate some text to a different language"
        }),
        blockType: i.REPORTER,
        arguments: {
          WORDS: {
            type: r.STRING,
            defaultValue: l({
              id: "translate.defaultTextToTranslate",
              default: "hello",
              description: "hello: the default text to translate"
            })
          },
          LANGUAGE: {
            type: r.STRING,
            menu: "languages",
            defaultValue: this._randomLanguageCode
          }
        }
      }, {
        opcode: "getViewerLanguage",
        text: l({
          id: "translate.viewerLanguage",
          default: "language",
          description: "the languge of the project viewer"
        }),
        blockType: i.REPORTER,
        arguments: {}
      }],
      menus: {
        languages: {
          acceptReporters: true,
          items: this._supportedLanguages
        }
      }
    };
  }
  _getSupportedLanguages(e) {
    return c.menuMap[e].map(e => ({
      text: e.name,
      value: e.code
    }));
  }
  getViewerLanguage() {
    this._viewerLanguageCode = this.getViewerLanguageCode();
    const e = c.menuMap[this._viewerLanguageCode];
    let t = e.find(e => e.code === this._viewerLanguageCode);
    if (!t && c.scratchToGoogleMap[this._viewerLanguageCode]) {
      const n = c.scratchToGoogleMap[this._viewerLanguageCode];
      t = e.find(e => e.code === n);
    }
    let n = this._viewerLanguageCode;
    if (t) {
      n = t.name;
    }
    return n;
  }
  getViewerLanguageCode() {
    const e = [l.setup().locale].concat(navigator.languages);
    const t = Object.keys(c.menuMap);
    return (e.reduce((e, n) => e || (t.indexOf(n.toLowerCase()) > -1 ? n : e), "") || "en").toLowerCase();
  }
  getLanguageCodeFromArg(e) {
    const t = s.toString(e).toLowerCase();
    if (Object.prototype.hasOwnProperty.call(c.menuMap, t)) {
      return t;
    } else if (Object.prototype.hasOwnProperty.call(c.nameMap, t)) {
      return c.nameMap[t];
    } else if (c.previouslySupported.indexOf(t) !== -1) {
      return t;
    } else {
      return "en";
    }
  }
  getTranslate(e) {
    if (/^\d+$/.test(e.WORDS)) {
      return Promise.resolve(e.WORDS);
    }
    if (this._lastTextTranslated === e.WORDS && this._lastLangTranslated === e.LANGUAGE) {
      return this._translateResult;
    }
    const t = this.getLanguageCodeFromArg(e.LANGUAGE);
    let n = `https://trampoline.turbowarp.org/translate/translate?language=`;
    n += t;
    n += "&text=";
    n += encodeURIComponent(e.WORDS);
    const r = this;
    return a(n, {}, 10000).then(e => e.text()).then(t => {
      const n = JSON.parse(t).result;
      r._translateResult = n;
      r._lastTextTranslated = e.WORDS;
      r._lastLangTranslated = e.LANGUAGE;
      return n;
    }).catch(t => {
      o.warn(`error fetching translate result! ${t}`);
      return e.WORDS;
    });
  }
};