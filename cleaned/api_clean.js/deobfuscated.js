(function () {
  var aa = typeof Object.defineProperties == "function" ? Object.defineProperty : function (a, b, c) {
    if (a == Array.prototype || a == Object.prototype) {
      return a;
    }
    a[b] = c.value;
    return a;
  };
  function ba(a) {
    a = [typeof globalThis == "object" && globalThis, a, typeof window == "object" && window, typeof self == "object" && self, typeof global == "object" && global];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) {
        return c;
      }
    }
    throw Error("Cannot find global object");
  }
  var ca = ba(this);
  function g(a, b) {
    if (b) {
      a: {
        var c = ca;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) {
            break a;
          }
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        if (b != d && b != null) {
          aa(c, a, {
            configurable: true,
            writable: true,
            value: b
          });
        }
      }
    }
  }
  function h(a, b, c) {
    if (a == null) {
      throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    }
    if (b instanceof RegExp) {
      throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    }
    return a + "";
  }
  g("String.prototype.endsWith", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        var d = h(this, b, "endsWith");
        b += "";
        if (c === undefined) {
          c = d.length;
        }
        c = Math.max(0, Math.min(c | 0, d.length));
        for (var e = b.length; e > 0 && c > 0;) {
          if (d[--c] != b[--e]) {
            return false;
          }
        }
        return e <= 0;
      };
    }
  });
  g("Object.is", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        if (b === c) {
          return b !== 0 || 1 / b === 1 / c;
        } else {
          return b !== b && c !== c;
        }
      };
    }
  });
  g("Array.prototype.includes", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        var d = this;
        if (d instanceof String) {
          d = String(d);
        }
        var e = d.length;
        c = c || 0;
        for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
          var f = d[c];
          if (f === b || Object.is(f, b)) {
            return true;
          }
        }
        return false;
      };
    }
  });
  g("String.prototype.includes", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        return h(this, b, "includes").indexOf(b, c || 0) !== -1;
      };
    }
  });
  window.gapi = window.gapi || {};
  window.gapi.o = new Date().getTime(); /*
                                        Copyright The Closure Library Authors.
                                        SPDX-License-Identifier: Apache-2.0
                                        */
  var m = this || self;
  var n = "closure_uid_" + (Math.random() * 1000000000 >>> 0);
  var da = 0;
  function t(a) {
    return a;
  }
  /*
  Copyright Google LLC
  SPDX-License-Identifier: Apache-2.0
  */
  var x = {};
  function y(a) {
    if (x !== x) {
      throw Error("Bad secret");
    }
    this.l = a;
  }
  y.prototype.toString = function () {
    return this.l;
  };
  new y("about:blank");
  new y("about:invalid#zClosurez");
  var A = [];
  function D(a) {
    console.warn("A URL with content '" + a + "' was sanitized away.");
  }
  if (A.indexOf(D) === -1) {
    A.push(D);
  }
  /*
  gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
  var E = window;
  var F = document;
  var ea = E.location;
  function fa() {}
  var ha = /\[native code\]/;
  function H(a, b, c) {
    return a[b] = a[b] || c;
  }
  function ia(a) {
    a = a.sort();
    var b = [];
    var c = undefined;
    for (var d = 0; d < a.length; d++) {
      var e = a[d];
      if (e != c) {
        b.push(e);
      }
      c = e;
    }
    return b;
  }
  function I() {
    var a;
    if ((a = Object.create) && ha.test(a)) {
      a = a(null);
    } else {
      a = {};
      for (var b in a) {
        a[b] = undefined;
      }
    }
    return a;
  }
  var J = H(E, "gapi", {});
  var M = {};
  M = H(E, "___jsl", I());
  H(M, "I", 0);
  H(M, "hel", 10);
  function N() {
    var a = ea.href;
    if (M.dpo) {
      var b = M.h;
    } else {
      b = M.h;
      var c = RegExp("([#].*&|[#])jsh=([^&#]*)", "g");
      var d = RegExp("([?#].*&|[?#])jsh=([^&#]*)", "g");
      if (a = a && (c.exec(a) || d.exec(a))) {
        try {
          b = decodeURIComponent(a[2]);
        } catch (e) {}
      }
    }
    return b;
  }
  function ja(a) {
    var b = H(M, "PQ", []);
    M.PQ = [];
    var c = b.length;
    if (c === 0) {
      a();
    } else {
      var d = 0;
      var e = function () {
        if (++d === c) {
          a();
        }
      };
      for (var f = 0; f < c; f++) {
        b[f](e);
      }
    }
  }
  function O(a) {
    return H(H(M, "H", I()), a, I());
  }
  var P = H(M, "perf", I());
  var Q = H(P, "g", I());
  var ka = H(P, "i", I());
  H(P, "r", []);
  I();
  I();
  function R(a, b, c) {
    var d = P.r;
    if (typeof d === "function") {
      d(a, b, c);
    } else {
      d.push([a, b, c]);
    }
  }
  function T(a, b, c) {
    if (b && b.length > 0) {
      b = ma(b);
      if (c && c.length > 0) {
        b += "___" + ma(c);
      }
      if (b.length > 28) {
        b = b.substr(0, 28) + (b.length - 28);
      }
      c = b;
      b = H(ka, "_p", I());
      H(b, c, I())[a] = new Date().getTime();
      R(a, "_p", c);
    }
  }
  function ma(a) {
    return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/,/g, "_");
  }
  var na = I();
  var U = [];
  function V(a) {
    throw Error("Bad hint: " + a);
  }
  U.push(["jsl", function (a) {
    for (var b in a) {
      if (Object.prototype.hasOwnProperty.call(a, b)) {
        var c = a[b];
        if (typeof c == "object") {
          M[b] = H(M, b, []).concat(c);
        } else {
          H(M, b, c);
        }
      }
    }
    if (b = a.u) {
      a = H(M, "us", []);
      a.push(b);
      if (b = /^https:(.*)$/.exec(b)) {
        a.push("http:" + b[1]);
      }
    }
  }]);
  var oa = /^(\/[a-zA-Z0-9_\-]+)+$/;
  var pa = [/\/amp\//, /\/amp$/, /^\/amp$/];
  var qa = /^[a-zA-Z0-9\-_\.,!]+$/;
  var ra = /^gapi\.loaded_[0-9]+$/;
  var sa = /^[a-zA-Z0-9,._-]+$/;
  function wa(a, b, c, d, e) {
    var f = a.split(";");
    var k = f.shift();
    var l = na[k];
    var p = null;
    if (l) {
      p = l(f, b, c, d);
    } else {
      V("no hint processor for: " + k);
    }
    if (!p) {
      V("failed to generate load url");
    }
    b = p;
    c = b.match(ta);
    if (!(d = b.match(ua)) || d.length !== 1 || !va.test(b) || !c || c.length !== 1) {
      V("failed sanity: " + a);
    }
    try {
      a = "?";
      if (e && e.length > 0) {
        c = b = 0;
        for (d = {}; c < e.length;) {
          var q = e[c++];
          f = undefined;
          k = typeof q;
          f = k == "object" && q != null || k == "function" ? "o" + (Object.prototype.hasOwnProperty.call(q, n) && q[n] || (q[n] = ++da)) : (typeof q).charAt(0) + q;
          if (!Object.prototype.hasOwnProperty.call(d, f)) {
            d[f] = true;
            e[b++] = q;
          }
        }
        e.length = b;
        p = p + "?le=" + e.join(",");
        a = "&";
      }
      if (M.rol) {
        var z = M.ol;
        if (z && z.length) {
          p = "" + p + a + "ol=" + z.length;
        }
      }
    } catch (G) {}
    return p;
  }
  function za(a, b, c, d) {
    a = xa(a);
    if (!ra.test(c)) {
      V("invalid_callback");
    }
    b = ya(b);
    d = d && d.length ? ya(d) : null;
    function e(f) {
      return encodeURIComponent(f).replace(/%2C/g, ",");
    }
    return [encodeURIComponent(a.pathPrefix).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.g ? "/am=" + e(a.g) : "", a.i ? "/rs=" + e(a.i) : "", a.j ? "/t=" + e(a.j) : "", "/cb=", e(c)].join("");
  }
  function xa(a) {
    if (a.charAt(0) !== "/") {
      V("relative path");
    }
    for (var b = a.substring(1).split("/"), c = []; b.length;) {
      a = b.shift();
      if (!a.length || a.indexOf(".") == 0) {
        V("empty/relative directory");
      } else if (a.indexOf("=") > 0) {
        b.unshift(a);
        break;
      }
      c.push(a);
    }
    a = {};
    for (var d = 0, e = b.length; d < e; ++d) {
      var f = b[d].split("=");
      var k = decodeURIComponent(f[0]);
      var l = decodeURIComponent(f[1]);
      if (f.length == 2 && k && l) {
        a[k] = a[k] || l;
      }
    }
    b = "/" + c.join("/");
    if (!oa.test(b)) {
      V("invalid_prefix");
    }
    c = 0;
    for (d = pa.length; c < d; ++c) {
      if (pa[c].test(b)) {
        V("invalid_prefix");
      }
    }
    c = W(a, "k", true);
    d = W(a, "am");
    e = W(a, "rs");
    a = W(a, "t");
    return {
      pathPrefix: b,
      version: c,
      g: d,
      i: e,
      j: a
    };
  }
  function ya(a) {
    var b = [];
    for (var c = 0, d = a.length; c < d; ++c) {
      var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
      if (sa.test(e)) {
        b.push(e);
      }
    }
    return b.join(",");
  }
  function W(a, b, c) {
    a = a[b];
    if (!a && c) {
      V("missing: " + b);
    }
    if (a) {
      if (qa.test(a)) {
        return a;
      }
      V("invalid: " + b);
    }
    return null;
  }
  var va = /^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/;
  var ua = /\/cb=/g;
  var ta = /\/\//g;
  na.m = function (a, b, c, d) {
    if (!(a = a[0])) {
      V("missing_hint");
    }
    return "https://apis.google.com" + za(a, b, c, d);
  };
  var X = "script";
  var Aa = /^[-+_0-9\/A-Za-z]+={0,2}$/;
  function Ba(a, b) {
    var c = [];
    for (var d = 0; d < a.length; ++d) {
      var e = a[d];
      var f;
      if (f = e) {
        a: {
          for (f = 0; f < b.length; f++) {
            if (b[f] === e) {
              break a;
            }
          }
          f = -1;
        }
        f = f < 0;
      }
      if (f) {
        c.push(e);
      }
    }
    return c;
  }
  function Ca() {
    var a = M.nonce;
    if (a !== undefined) {
      if (a && a === String(a) && a.match(Aa)) {
        return a;
      } else {
        return M.nonce = null;
      }
    } else if (F.querySelector) {
      if (a = F.querySelector("script[nonce]")) {
        a = a.nonce || a.getAttribute("nonce") || "";
        if (a && a === String(a) && a.match(Aa)) {
          return M.nonce = a;
        } else {
          return M.nonce = null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  function Ea(a) {
    if (F.readyState != "loading") {
      Da(a);
    } else {
      var b = Ca();
      var c = "";
      if (b !== null) {
        c = " nonce=\"" + b + "\"";
      }
      a = "<" + X + " src=\"" + encodeURI(a) + "\"" + c + "></" + X + ">";
      F.write(Y ? Y.createHTML(a) : a);
    }
  }
  function Da(a) {
    var b = F.createElement(X);
    b.setAttribute("src", Y ? Y.createScriptURL(a) : a);
    a = Ca();
    if (a !== null) {
      b.setAttribute("nonce", a);
    }
    b.async = "true";
    if (a = F.getElementsByTagName(X)[0]) {
      a.parentNode.insertBefore(b, a);
    } else {
      (F.head || F.body || F.documentElement).appendChild(b);
    }
  }
  function Ga(a, b, c) {
    Fa(function () {
      var d = b === N() ? H(J, "_", I()) : I();
      d = H(O(b), "_", d);
      a(d);
    }, c);
  }
  function Ia(a, b) {
    var c = b || {};
    if (typeof b == "function") {
      c = {};
      c.callback = b;
    }
    var d = (b = c) && b._c;
    if (d) {
      for (var e = 0; e < U.length; e++) {
        var f = U[e][0];
        var k = U[e][1];
        if (k && Object.prototype.hasOwnProperty.call(d, f)) {
          k(d[f], a, b);
        }
      }
    }
    b = [];
    if (a) {
      b = a.split(":");
    } else if (c.features) {
      b = c.features;
    }
    if (!(a = c.h) && (a = N(), !a)) {
      throw Error("Bad hint: !hint");
    }
    Ha(b || [], c, a);
  }
  function Ha(a, b, c) {
    a = ia(a) || [];
    var d = b.callback;
    var e = b.config;
    var f = b.timeout;
    var k = b.ontimeout;
    var l = b.onerror;
    var p = undefined;
    if (typeof l == "function") {
      p = l;
    }
    var q = null;
    var z = false;
    if (f && !k || !f && k) {
      throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
    }
    l = H(O(c), "r", []).sort();
    var G = H(O(c), "L", []).sort();
    var Ma = M.le || [];
    var K = [].concat(l);
    function la(w, B) {
      if (z) {
        return 0;
      }
      E.clearTimeout(q);
      G.push.apply(G, r);
      var C = ((J || {}).config || {}).update;
      if (C) {
        C(e);
      } else if (e) {
        H(M, "cu", []).push(e);
      }
      if (B) {
        T("me0", w, K);
        try {
          Ga(B, c, p);
        } finally {
          T("me1", w, K);
        }
      }
      return 1;
    }
    if (f > 0) {
      q = E.setTimeout(function () {
        z = true;
        k();
      }, f);
    }
    var r = Ba(a, G);
    if (r.length) {
      r = Ba(a, l);
      var u = H(M, "CP", []);
      var v = u.length;
      u[v] = function (w) {
        if (!w) {
          return 0;
        }
        T("ml1", r, K);
        function B(L) {
          u[v] = null;
          if (la(r, w)) {
            ja(function () {
              if (d) {
                d();
              }
              L();
            });
          }
        }
        function C() {
          var L = u[v + 1];
          if (L) {
            L();
          }
        }
        if (v > 0 && u[v - 1]) {
          u[v] = function () {
            B(C);
          };
        } else {
          B(C);
        }
      };
      if (r.length) {
        var S = "loaded_" + M.I++;
        J[S] = function (w) {
          u[v](w);
          J[S] = null;
        };
        a = wa(c, r, "gapi." + S, l, Ma);
        l.push.apply(l, r);
        T("ml0", r, K);
        if (b.sync || E.___gapisync) {
          Ea(a);
        } else {
          Da(a);
        }
      } else {
        u[v](fa);
      }
    } else if (la(r) && d) {
      d();
    }
  }
  var Ja;
  var Ka = null;
  var Z = m.trustedTypes;
  if (Z && Z.createPolicy) {
    try {
      Ka = Z.createPolicy("gapi#gapi", {
        createHTML: t,
        createScript: t,
        createScriptURL: t
      });
    } catch (a) {
      if (m.console) {
        m.console.error(a.message);
      }
    }
  }
  Ja = Ka;
  var Y = Ja;
  function Fa(a, b) {
    if (M.hee && M.hel > 0) {
      try {
        return a();
      } catch (c) {
        if (b) {
          b(c);
        }
        M.hel--;
        Ia("debug_error", function () {
          try {
            window.___jsl.hefn(c);
          } catch (d) {
            throw c;
          }
        });
      }
    } else {
      try {
        return a();
      } catch (c) {
        if (b) {
          b(c);
        }
        throw c;
      }
    }
  }
  var La = J.load;
  if (La) {
    H(M, "ol", []).push(La);
  }
  J.load = function (a, b) {
    return Fa(function () {
      return Ia(a, b);
    });
  };
  U.unshift(["url", function (a, b, c) {
    if (!!a && (!b || b === "") && !!a.endsWith(".js")) {
      a = a.substring(0, a.length - 3);
      b = a.lastIndexOf("/") + 1;
      if (!(b >= a.length)) {
        a = a.substr(b).split(":").filter(function (d) {
          return !["api", "platform"].includes(d);
        });
        c.features = a;
      }
    }
  }]);
  Q.bs0 = window.gapi._bs || new Date().getTime();
  R("bs0");
  Q.bs1 = new Date().getTime();
  R("bs1");
  delete window.gapi._bs;
  window.gapi.load("", {
    callback: window.gapi_onload,
    _c: {
      url: "https://apis.google.com/js/api.js",
      jsl: {
        ci: {
          "oauth-flow": {
            authUrl: "https://accounts.google.com/o/oauth2/auth",
            proxyUrl: "https://accounts.google.com/o/oauth2/postmessageRelay",
            disableOpt: true,
            idpIframeUrl: "https://accounts.google.com/o/oauth2/iframe",
            usegapi: false
          },
          debug: {
            reportExceptionRate: 1,
            forceIm: false,
            rethrowException: true,
            host: "https://apis.google.com"
          },
          gen204logger: {
            interval: 30000,
            rate: 0.01,
            batch: false
          },
          enableMultilogin: true,
          "googleapis.config": {
            auth: {
              useFirstPartyAuthV2: true
            },
            root: "https://content.googleapis.com",
            "root-1p": "https://clients6.google.com"
          },
          inline: {
            css: 1
          },
          disableRealtimeCallback: false,
          drive_share: {
            skipInitCommand: true
          },
          csi: {
            rate: 0.01
          },
          client: {
            cors: false
          },
          signInDeprecation: {
            rate: 0
          },
          include_granted_scopes: true,
          llang: "en",
          iframes: {
            youtube: {
              params: {
                location: ["search", "hash"]
              },
              url: ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1",
              methods: ["scroll", "openwindow"]
            },
            ytsubscribe: {
              url: "https://www.youtube.com/subscribe_embed?usegapi=1"
            },
            plus_circle: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi=1"
            },
            plus_share: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare=true&usegapi=1"
            },
            rbr_s: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
            },
            ":source:": "3p",
            playemm: {
              url: "https://play.google.com/work/embedded/search?usegapi=1&usegapi=1"
            },
            savetoandroidpay: {
              url: "https://pay.google.com/gp/v/widget/save"
            },
            blogger: {
              params: {
                location: ["search", "hash"]
              },
              url: ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi=1",
              methods: ["scroll", "openwindow"]
            },
            evwidget: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix:_/events/widget?usegapi=1"
            },
            partnersbadge: {
              url: "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi=1"
            },
            dataconnector: {
              url: "https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi=1"
            },
            surveyoptin: {
              url: "https://www.google.com/shopping/customerreviews/optin?usegapi=1"
            },
            ":socialhost:": "https://apis.google.com",
            shortlists: {
              url: ""
            },
            hangout: {
              url: "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
            },
            plus_followers: {
              params: {
                url: ""
              },
              url: ":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"
            },
            post: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi=1"
            },
            signin: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix:_/widget/render/signin?usegapi=1",
              methods: ["onauth"]
            },
            rbr_i: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
            },
            share: {
              url: ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi=1"
            },
            plusone: {
              params: {
                count: "",
                size: "",
                url: ""
              },
              url: ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi=1"
            },
            comments: {
              params: {
                location: ["search", "hash"]
              },
              url: ":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1",
              methods: ["scroll", "openwindow"]
            },
            ":im_socialhost:": "https://plus.googleapis.com",
            backdrop: {
              url: "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi=1"
            },
            visibility: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi=1"
            },
            autocomplete: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix:_/widget/render/autocomplete"
            },
            ":signuphost:": "https://plus.google.com",
            ratingbadge: {
              url: "https://www.google.com/shopping/merchantverse/?usegapi=1"
            },
            appcirclepicker: {
              url: ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
            },
            follow: {
              url: ":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"
            },
            community: {
              url: ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"
            },
            sharetoclassroom: {
              url: "https://classroom.google.com/sharewidget?usegapi=1"
            },
            ytshare: {
              params: {
                url: ""
              },
              url: ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi=1"
            },
            plus: {
              url: ":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"
            },
            family_creation: {
              params: {
                url: ""
              },
              url: "https://families.google.com/webcreation?usegapi=1&usegapi=1"
            },
            commentcount: {
              url: ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"
            },
            configurator: {
              url: ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"
            },
            zoomableimage: {
              url: "https://ssl.gstatic.com/microscope/embed/"
            },
            appfinder: {
              url: "https://workspace.google.com/:session_prefix:marketplace/appfinder?usegapi=1"
            },
            savetowallet: {
              url: "https://pay.google.com/gp/v/widget/save"
            },
            person: {
              url: ":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"
            },
            savetodrive: {
              url: "https://drive.google.com/savetodrivebutton?usegapi=1",
              methods: ["save"]
            },
            page: {
              url: ":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"
            },
            card: {
              url: ":socialhost:/:session_prefix:_/hovercard/card"
            }
          }
        },
        h: "m;/_/scs/abc-static/_/js/k=gapi.lb.en.W5qDlPExdtA.O/d=1/rs=AHpOoo8JInlRP_yLzwScb00AozrrUS6gJg/m=__features__",
        u: "https://apis.google.com/js/api.js",
        hee: true,
        dpo: false,
        le: ["scs"]
      },
      platform: "backdrop blogger comments commentcount community donation family_creation follow hangout health page partnersbadge person playemm playreview plus plusone post ratingbadge savetoandroidpay savetodrive savetowallet sharetoclassroom shortlists signin2 surveyoptin visibility youtube ytsubscribe zoomableimage".split(" "),
      annotation: ["interactivepost", "recobar", "signin2", "autocomplete"]
    }
  });
  H(M, "le", []).push("fedcm_migration_mod");
}).call(this);