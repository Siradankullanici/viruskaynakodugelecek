const r = require("./1.js");
module.exports = class {
  constructor(e) {
    this.runtime = e;
    this.runtime.on("KEY_PRESSED", e => {
      this.runtime.startHats("event_whenkeypressed", {
        KEY_OPTION: e
      });
      this.runtime.startHats("event_whenkeypressed", {
        KEY_OPTION: "any"
      });
    });
  }
  getPrimitives() {
    return {
      event_whentouchingobject: this.touchingObject,
      event_broadcast: this.broadcast,
      event_broadcastandwait: this.broadcastAndWait,
      event_whengreaterthan: this.hatGreaterThanPredicate
    };
  }
  getHats() {
    return {
      event_whenflagclicked: {
        restartExistingThreads: true
      },
      event_whenkeypressed: {
        restartExistingThreads: false
      },
      event_whenthisspriteclicked: {
        restartExistingThreads: true
      },
      event_whentouchingobject: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      event_whenstageclicked: {
        restartExistingThreads: true
      },
      event_whenbackdropswitchesto: {
        restartExistingThreads: true
      },
      event_whengreaterthan: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      event_whenbroadcastreceived: {
        restartExistingThreads: true
      }
    };
  }
  touchingObject(e, t) {
    return t.target.isTouchingObject(e.TOUCHINGOBJECTMENU);
  }
  hatGreaterThanPredicate(e, t) {
    const n = r.toString(e.WHENGREATERTHANMENU).toLowerCase();
    const i = r.toNumber(e.VALUE);
    switch (n) {
      case "timer":
        return t.ioQuery("clock", "projectTimer") > i;
      case "loudness":
        return this.runtime.audioEngine && this.runtime.audioEngine.getLoudness() > i;
    }
    return false;
  }
  broadcast(e, t) {
    const n = t.runtime.getTargetForStage().lookupBroadcastMsg(e.BROADCAST_OPTION.id, e.BROADCAST_OPTION.name);
    if (n) {
      const e = n.name;
      t.startHats("event_whenbroadcastreceived", {
        BROADCAST_OPTION: e
      });
    }
  }
  broadcastAndWait(e, t) {
    t.stackFrame.broadcastVar ||= t.runtime.getTargetForStage().lookupBroadcastMsg(e.BROADCAST_OPTION.id, e.BROADCAST_OPTION.name);
    if (t.stackFrame.broadcastVar) {
      const e = t.stackFrame.broadcastVar.name;
      if (!t.stackFrame.startedThreads && (t.stackFrame.startedThreads = t.startHats("event_whenbroadcastreceived", {
        BROADCAST_OPTION: e
      }), t.stackFrame.startedThreads.length === 0)) {
        return;
      }
      const n = this;
      if (t.stackFrame.startedThreads.some(e => n.runtime.threads.indexOf(e) !== -1)) {
        if (t.stackFrame.startedThreads.every(e => n.runtime.isWaitingThread(e))) {
          t.yieldTick();
        } else {
          t.yield();
        }
      }
    }
  }
};