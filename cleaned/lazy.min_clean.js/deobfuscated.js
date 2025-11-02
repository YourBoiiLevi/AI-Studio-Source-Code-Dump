(function () {
  var m;
  var aa = typeof Object.create == "function" ? Object.create : function (a) {
    function b() {}
    b.prototype = a;
    return new b();
  };
  var ba = typeof Object.defineProperties == "function" ? Object.defineProperty : function (a, b, c) {
    if (a == Array.prototype || a == Object.prototype) {
      return a;
    }
    a[b] = c.value;
    return a;
  };
  function ca(a) {
    a = [typeof globalThis == "object" && globalThis, a, typeof window == "object" && window, typeof self == "object" && self, typeof global == "object" && global];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) {
        return c;
      }
    }
    throw Error("Cannot find global object");
  }
  var da = ca(this);
  function t(a, b) {
    if (b) {
      a: {
        var c = da;
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
          ba(c, a, {
            configurable: true,
            writable: true,
            value: b
          });
        }
      }
    }
  }
  var ea;
  if (typeof Object.setPrototypeOf == "function") {
    ea = Object.setPrototypeOf;
  } else {
    var fa;
    a: {
      var ha = {
        a: true
      };
      var ia = {};
      try {
        ia.__proto__ = ha;
        fa = ia.a;
        break a;
      } catch (a) {}
      fa = false;
    }
    ea = fa ? function (a, b) {
      a.__proto__ = b;
      if (a.__proto__ !== b) {
        throw new TypeError(a + " is not extensible");
      }
      return a;
    } : null;
  }
  var ja = ea;
  function u(a, b) {
    a.prototype = aa(b.prototype);
    a.prototype.constructor = a;
    if (ja) {
      ja(a, b);
    } else {
      for (var c in b) {
        if (c != "prototype") {
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            if (d) {
              Object.defineProperty(a, c, d);
            }
          } else {
            a[c] = b[c];
          }
        }
      }
    }
    a.superClass_ = b.prototype;
  }
  function ka(a) {
    var b = 0;
    return function () {
      if (b < a.length) {
        return {
          done: false,
          value: a[b++]
        };
      } else {
        return {
          done: true
        };
      }
    };
  }
  function w(a) {
    var b = typeof Symbol != "undefined" && Symbol.iterator && a[Symbol.iterator];
    if (b) {
      return b.call(a);
    }
    if (typeof a.length == "number") {
      return {
        next: ka(a)
      };
    }
    throw Error(String(a) + " is not an iterable or ArrayLike");
  }
  function la(a) {
    if (!(a instanceof Array)) {
      a = w(a);
      for (var b, c = []; !(b = a.next()).done;) {
        c.push(b.value);
      }
      a = c;
    }
    return a;
  }
  function x(a) {
    return na(a, a);
  }
  function na(a, b) {
    a.raw = b;
    if (Object.freeze) {
      Object.freeze(a);
      Object.freeze(b);
    }
    return a;
  }
  function y(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  var oa = typeof Object.assign == "function" ? Object.assign : function (a, b) {
    if (a == null) {
      throw new TypeError("No nullish arg");
    }
    a = Object(a);
    for (var c = 1; c < arguments.length; c++) {
      var d = arguments[c];
      if (d) {
        for (var e in d) {
          if (y(d, e)) {
            a[e] = d[e];
          }
        }
      }
    }
    return a;
  };
  t("Object.assign", function (a) {
    return a || oa;
  });
  function pa() {
    this.isRunning_ = false;
    this.yieldAllIterator_ = null;
    this.yieldResult = undefined;
    this.nextAddress = 1;
    this.finallyAddress_ = this.catchAddress_ = 0;
    this.abruptCompletion_ = null;
  }
  function qa(a) {
    if (a.isRunning_) {
      throw new TypeError("Generator is already running");
    }
    a.isRunning_ = true;
  }
  pa.prototype.next_ = function (a) {
    this.yieldResult = a;
  };
  pa.prototype.throw_ = function (a) {
    this.abruptCompletion_ = {
      exception: a,
      isException: true
    };
    this.nextAddress = this.catchAddress_ || this.finallyAddress_;
  };
  pa.prototype.return = function (a) {
    this.abruptCompletion_ = {
      return: a
    };
    this.nextAddress = this.finallyAddress_;
  };
  function ra(a, b, c) {
    a.nextAddress = c;
    return {
      value: b
    };
  }
  function sa(a) {
    this.context_ = new pa();
    this.program_ = a;
  }
  sa.prototype.next_ = function (a) {
    qa(this.context_);
    if (this.context_.yieldAllIterator_) {
      return ta(this, this.context_.yieldAllIterator_.next, a, this.context_.next_);
    }
    this.context_.next_(a);
    return ua(this);
  };
  function va(a, b) {
    qa(a.context_);
    var c = a.context_.yieldAllIterator_;
    if (c) {
      return ta(a, "return" in c ? c.return : function (d) {
        return {
          value: d,
          done: true
        };
      }, b, a.context_.return);
    }
    a.context_.return(b);
    return ua(a);
  }
  sa.prototype.throw_ = function (a) {
    qa(this.context_);
    if (this.context_.yieldAllIterator_) {
      return ta(this, this.context_.yieldAllIterator_.throw, a, this.context_.next_);
    }
    this.context_.throw_(a);
    return ua(this);
  };
  function ta(a, b, c, d) {
    try {
      var e = b.call(a.context_.yieldAllIterator_, c);
      if (!(e instanceof Object)) {
        throw new TypeError("Iterator result " + e + " is not an object");
      }
      if (!e.done) {
        a.context_.isRunning_ = false;
        return e;
      }
      var f = e.value;
    } catch (g) {
      a.context_.yieldAllIterator_ = null;
      a.context_.throw_(g);
      return ua(a);
    }
    a.context_.yieldAllIterator_ = null;
    d.call(a.context_, f);
    return ua(a);
  }
  function ua(a) {
    while (a.context_.nextAddress) {
      try {
        var b = a.program_(a.context_);
        if (b) {
          a.context_.isRunning_ = false;
          return {
            value: b.value,
            done: false
          };
        }
      } catch (c) {
        a.context_.yieldResult = undefined;
        a.context_.throw_(c);
      }
    }
    a.context_.isRunning_ = false;
    if (a.context_.abruptCompletion_) {
      b = a.context_.abruptCompletion_;
      a.context_.abruptCompletion_ = null;
      if (b.isException) {
        throw b.exception;
      }
      return {
        value: b.return,
        done: true
      };
    }
    return {
      value: undefined,
      done: true
    };
  }
  function wa(a) {
    this.next = function (b) {
      return a.next_(b);
    };
    this.throw = function (b) {
      return a.throw_(b);
    };
    this.return = function (b) {
      return va(a, b);
    };
    this[Symbol.iterator] = function () {
      return this;
    };
  }
  function xa(a) {
    function b(d) {
      return a.next(d);
    }
    function c(d) {
      return a.throw(d);
    }
    return new Promise(function (d, e) {
      function f(g) {
        if (g.done) {
          d(g.value);
        } else {
          Promise.resolve(g.value).then(b, c).then(f, e);
        }
      }
      f(a.next());
    });
  }
  function ya(a) {
    return xa(new wa(new sa(a)));
  }
  function za() {
    var a = Number(this);
    var b = [];
    for (var c = a; c < arguments.length; c++) {
      b[c - a] = arguments[c];
    }
    return b;
  }
  t("globalThis", function (a) {
    return a || da;
  });
  t("Symbol", function (a) {
    if (a) {
      return a;
    }
    function b(f, g) {
      this.$jscomp$symbol$id_ = f;
      ba(this, "description", {
        configurable: true,
        writable: true,
        value: g
      });
    }
    b.prototype.toString = function () {
      return this.$jscomp$symbol$id_;
    };
    var c = "jscomp_symbol_" + (Math.random() * 1000000000 >>> 0) + "_";
    var d = 0;
    function e(f) {
      if (this instanceof e) {
        throw new TypeError("Symbol is not a constructor");
      }
      return new b(c + (f || "") + "_" + d++, f);
    }
    return e;
  });
  t("Symbol.iterator", function (a) {
    if (a) {
      return a;
    }
    a = Symbol("Symbol.iterator");
    ba(Array.prototype, a, {
      configurable: true,
      writable: true,
      value: function () {
        return Aa(ka(this));
      }
    });
    return a;
  });
  function Aa(a) {
    a = {
      next: a
    };
    a[Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  t("Promise", function (a) {
    function b() {
      this.batch_ = null;
    }
    function c(g) {
      if (g instanceof e) {
        return g;
      } else {
        return new e(function (h) {
          h(g);
        });
      }
    }
    if (a) {
      return a;
    }
    b.prototype.asyncExecute = function (g) {
      if (this.batch_ == null) {
        this.batch_ = [];
        var h = this;
        this.asyncExecuteFunction(function () {
          h.executeBatch_();
        });
      }
      this.batch_.push(g);
    };
    var d = da.setTimeout;
    b.prototype.asyncExecuteFunction = function (g) {
      d(g, 0);
    };
    b.prototype.executeBatch_ = function () {
      while (this.batch_ && this.batch_.length) {
        var g = this.batch_;
        this.batch_ = [];
        for (var h = 0; h < g.length; ++h) {
          var k = g[h];
          g[h] = null;
          try {
            k();
          } catch (l) {
            this.asyncThrow_(l);
          }
        }
      }
      this.batch_ = null;
    };
    b.prototype.asyncThrow_ = function (g) {
      this.asyncExecuteFunction(function () {
        throw g;
      });
    };
    function e(g) {
      this.state_ = 0;
      this.result_ = undefined;
      this.onSettledCallbacks_ = [];
      this.isRejectionHandled_ = false;
      var h = this.createResolveAndReject_();
      try {
        g(h.resolve, h.reject);
      } catch (k) {
        h.reject(k);
      }
    }
    e.prototype.createResolveAndReject_ = function () {
      function g(l) {
        return function (n) {
          if (!k) {
            k = true;
            l.call(h, n);
          }
        };
      }
      var h = this;
      var k = false;
      return {
        resolve: g(this.resolveTo_),
        reject: g(this.reject_)
      };
    };
    e.prototype.resolveTo_ = function (g) {
      if (g === this) {
        this.reject_(new TypeError("A Promise cannot resolve to itself"));
      } else if (g instanceof e) {
        this.settleSameAsPromise_(g);
      } else {
        a: switch (typeof g) {
          case "object":
            var h = g != null;
            break a;
          case "function":
            h = true;
            break a;
          default:
            h = false;
        }
        if (h) {
          this.resolveToNonPromiseObj_(g);
        } else {
          this.fulfill_(g);
        }
      }
    };
    e.prototype.resolveToNonPromiseObj_ = function (g) {
      var h = undefined;
      try {
        h = g.then;
      } catch (k) {
        this.reject_(k);
        return;
      }
      if (typeof h == "function") {
        this.settleSameAsThenable_(h, g);
      } else {
        this.fulfill_(g);
      }
    };
    e.prototype.reject_ = function (g) {
      this.settle_(2, g);
    };
    e.prototype.fulfill_ = function (g) {
      this.settle_(1, g);
    };
    e.prototype.settle_ = function (g, h) {
      if (this.state_ != 0) {
        throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.state_);
      }
      this.state_ = g;
      this.result_ = h;
      if (this.state_ === 2) {
        this.scheduleUnhandledRejectionCheck_();
      }
      this.executeOnSettledCallbacks_();
    };
    e.prototype.scheduleUnhandledRejectionCheck_ = function () {
      var g = this;
      d(function () {
        if (g.notifyUnhandledRejection_()) {
          var h = da.console;
          if (typeof h !== "undefined") {
            h.error(g.result_);
          }
        }
      }, 1);
    };
    e.prototype.notifyUnhandledRejection_ = function () {
      if (this.isRejectionHandled_) {
        return false;
      }
      var g = da.CustomEvent;
      var h = da.Event;
      var k = da.dispatchEvent;
      if (typeof k === "undefined") {
        return true;
      }
      if (typeof g === "function") {
        g = new g("unhandledrejection", {
          cancelable: true
        });
      } else if (typeof h === "function") {
        g = new h("unhandledrejection", {
          cancelable: true
        });
      } else {
        g = da.document.createEvent("CustomEvent");
        g.initCustomEvent("unhandledrejection", false, true, g);
      }
      g.promise = this;
      g.reason = this.result_;
      return k(g);
    };
    e.prototype.executeOnSettledCallbacks_ = function () {
      if (this.onSettledCallbacks_ != null) {
        for (var g = 0; g < this.onSettledCallbacks_.length; ++g) {
          f.asyncExecute(this.onSettledCallbacks_[g]);
        }
        this.onSettledCallbacks_ = null;
      }
    };
    var f = new b();
    e.prototype.settleSameAsPromise_ = function (g) {
      var h = this.createResolveAndReject_();
      g.callWhenSettled_(h.resolve, h.reject);
    };
    e.prototype.settleSameAsThenable_ = function (g, h) {
      var k = this.createResolveAndReject_();
      try {
        g.call(h, k.resolve, k.reject);
      } catch (l) {
        k.reject(l);
      }
    };
    e.prototype.then = function (g, h) {
      function k(r, p) {
        if (typeof r == "function") {
          return function (v) {
            try {
              l(r(v));
            } catch (D) {
              n(D);
            }
          };
        } else {
          return p;
        }
      }
      var l;
      var n;
      var q = new e(function (r, p) {
        l = r;
        n = p;
      });
      this.callWhenSettled_(k(g, l), k(h, n));
      return q;
    };
    e.prototype.catch = function (g) {
      return this.then(undefined, g);
    };
    e.prototype.callWhenSettled_ = function (g, h) {
      function k() {
        switch (l.state_) {
          case 1:
            g(l.result_);
            break;
          case 2:
            h(l.result_);
            break;
          default:
            throw Error("Unexpected state: " + l.state_);
        }
      }
      var l = this;
      if (this.onSettledCallbacks_ == null) {
        f.asyncExecute(k);
      } else {
        this.onSettledCallbacks_.push(k);
      }
      this.isRejectionHandled_ = true;
    };
    e.resolve = c;
    e.reject = function (g) {
      return new e(function (h, k) {
        k(g);
      });
    };
    e.race = function (g) {
      return new e(function (h, k) {
        for (var l = w(g), n = l.next(); !n.done; n = l.next()) {
          c(n.value).callWhenSettled_(h, k);
        }
      });
    };
    e.all = function (g) {
      var h = w(g);
      var k = h.next();
      if (k.done) {
        return c([]);
      } else {
        return new e(function (l, n) {
          function q(v) {
            return function (D) {
              r[v] = D;
              p--;
              if (p == 0) {
                l(r);
              }
            };
          }
          var r = [];
          var p = 0;
          do {
            r.push(undefined);
            p++;
            c(k.value).callWhenSettled_(q(r.length - 1), n);
            k = h.next();
          } while (!k.done);
        });
      }
    };
    return e;
  });
  t("Symbol.dispose", function (a) {
    if (a) {
      return a;
    } else {
      return Symbol("Symbol.dispose");
    }
  });
  t("Array.prototype.find", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        a: {
          var d = this;
          if (d instanceof String) {
            d = String(d);
          }
          for (var e = d.length, f = 0; f < e; f++) {
            var g = d[f];
            if (b.call(c, g, f, d)) {
              b = g;
              break a;
            }
          }
          b = undefined;
        }
        return b;
      };
    }
  });
  t("WeakMap", function (a) {
    function b() {}
    function c(k) {
      var l = typeof k;
      return l === "object" && k !== null || l === "function";
    }
    function d(k) {
      if (!y(k, f)) {
        var l = new b();
        ba(k, f, {
          value: l
        });
      }
    }
    function e(k) {
      var l = Object[k];
      if (l) {
        Object[k] = function (n) {
          if (n instanceof b) {
            return n;
          }
          if (Object.isExtensible(n)) {
            d(n);
          }
          return l(n);
        };
      }
    }
    if (function () {
      if (!a || !Object.seal) {
        return false;
      }
      try {
        var k = Object.seal({});
        var l = Object.seal({});
        var n = new a([[k, 2], [l, 3]]);
        if (n.get(k) != 2 || n.get(l) != 3) {
          return false;
        }
        n.delete(k);
        n.set(l, 4);
        return !n.has(k) && n.get(l) == 4;
      } catch (q) {
        return false;
      }
    }()) {
      return a;
    }
    var f = "$jscomp_hidden_" + Math.random();
    e("freeze");
    e("preventExtensions");
    e("seal");
    var g = 0;
    function h(k) {
      this.id_ = (g += Math.random() + 1).toString();
      if (k) {
        k = w(k);
        for (var l; !(l = k.next()).done;) {
          l = l.value;
          this.set(l[0], l[1]);
        }
      }
    }
    h.prototype.set = function (k, l) {
      if (!c(k)) {
        throw Error("Invalid WeakMap key");
      }
      d(k);
      if (!y(k, f)) {
        throw Error("WeakMap key fail: " + k);
      }
      k[f][this.id_] = l;
      return this;
    };
    h.prototype.get = function (k) {
      if (c(k) && y(k, f)) {
        return k[f][this.id_];
      } else {
        return undefined;
      }
    };
    h.prototype.has = function (k) {
      return c(k) && y(k, f) && y(k[f], this.id_);
    };
    h.prototype.delete = function (k) {
      if (c(k) && y(k, f) && y(k[f], this.id_)) {
        return delete k[f][this.id_];
      } else {
        return false;
      }
    };
    return h;
  });
  t("Map", function (a) {
    if (function () {
      if (!a || typeof a != "function" || !a.prototype.entries || typeof Object.seal != "function") {
        return false;
      }
      try {
        var h = Object.seal({
          x: 4
        });
        var k = new a(w([[h, "s"]]));
        if (k.get(h) != "s" || k.size != 1 || k.get({
          x: 4
        }) || k.set({
          x: 4
        }, "t") != k || k.size != 2) {
          return false;
        }
        var l = k.entries();
        var n = l.next();
        if (n.done || n.value[0] != h || n.value[1] != "s") {
          return false;
        }
        n = l.next();
        if (n.done || n.value[0].x != 4 || n.value[1] != "t" || !l.next().done) {
          return false;
        } else {
          return true;
        }
      } catch (q) {
        return false;
      }
    }()) {
      return a;
    }
    var b = new WeakMap();
    function c(h) {
      this[0] = {};
      this[1] = f();
      this.size = 0;
      if (h) {
        h = w(h);
        for (var k; !(k = h.next()).done;) {
          k = k.value;
          this.set(k[0], k[1]);
        }
      }
    }
    c.prototype.set = function (h, k) {
      h = h === 0 ? 0 : h;
      var l = d(this, h);
      l.list ||= this[0][l.id] = [];
      if (l.entry) {
        l.entry.value = k;
      } else {
        l.entry = {
          next: this[1],
          previous: this[1].previous,
          head: this[1],
          key: h,
          value: k
        };
        l.list.push(l.entry);
        this[1].previous.next = l.entry;
        this[1].previous = l.entry;
        this.size++;
      }
      return this;
    };
    c.prototype.delete = function (h) {
      h = d(this, h);
      if (h.entry && h.list) {
        h.list.splice(h.index, 1);
        if (!h.list.length) {
          delete this[0][h.id];
        }
        h.entry.previous.next = h.entry.next;
        h.entry.next.previous = h.entry.previous;
        h.entry.head = null;
        this.size--;
        return true;
      } else {
        return false;
      }
    };
    c.prototype.clear = function () {
      this[0] = {};
      this[1] = this[1].previous = f();
      this.size = 0;
    };
    c.prototype.has = function (h) {
      return !!d(this, h).entry;
    };
    c.prototype.get = function (h) {
      return (h = d(this, h).entry) && h.value;
    };
    c.prototype.entries = function () {
      return e(this, function (h) {
        return [h.key, h.value];
      });
    };
    c.prototype.keys = function () {
      return e(this, function (h) {
        return h.key;
      });
    };
    c.prototype.values = function () {
      return e(this, function (h) {
        return h.value;
      });
    };
    c.prototype.forEach = function (h, k) {
      for (var l = this.entries(), n; !(n = l.next()).done;) {
        n = n.value;
        h.call(k, n[1], n[0], this);
      }
    };
    c.prototype[Symbol.iterator] = c.prototype.entries;
    function d(h, k) {
      var l = k && typeof k;
      if (l == "object" || l == "function") {
        if (b.has(k)) {
          l = b.get(k);
        } else {
          l = "" + ++g;
          b.set(k, l);
        }
      } else {
        l = "p_" + k;
      }
      var n = h[0][l];
      if (n && y(h[0], l)) {
        for (h = 0; h < n.length; h++) {
          var q = n[h];
          if (k !== k && q.key !== q.key || k === q.key) {
            return {
              id: l,
              list: n,
              index: h,
              entry: q
            };
          }
        }
      }
      return {
        id: l,
        list: n,
        index: -1,
        entry: undefined
      };
    }
    function e(h, k) {
      var l = h[1];
      return Aa(function () {
        if (l) {
          while (l.head != h[1]) {
            l = l.previous;
          }
          while (l.next != l.head) {
            l = l.next;
            return {
              done: false,
              value: k(l)
            };
          }
          l = null;
        }
        return {
          done: true,
          value: undefined
        };
      });
    }
    function f() {
      var h = {};
      return h.previous = h.next = h.head = h;
    }
    var g = 0;
    return c;
  });
  t("Set", function (a) {
    if (function () {
      if (!a || typeof a != "function" || !a.prototype.entries || typeof Object.seal != "function") {
        return false;
      }
      try {
        var c = Object.seal({
          x: 4
        });
        var d = new a(w([c]));
        if (!d.has(c) || d.size != 1 || d.add(c) != d || d.size != 1 || d.add({
          x: 4
        }) != d || d.size != 2) {
          return false;
        }
        var e = d.entries();
        var f = e.next();
        if (f.done || f.value[0] != c || f.value[1] != c) {
          return false;
        }
        f = e.next();
        if (f.done || f.value[0] == c || f.value[0].x != 4 || f.value[1] != f.value[0]) {
          return false;
        } else {
          return e.next().done;
        }
      } catch (g) {
        return false;
      }
    }()) {
      return a;
    }
    function b(c) {
      this.map_ = new Map();
      if (c) {
        c = w(c);
        for (var d; !(d = c.next()).done;) {
          this.add(d.value);
        }
      }
      this.size = this.map_.size;
    }
    b.prototype.add = function (c) {
      c = c === 0 ? 0 : c;
      this.map_.set(c, c);
      this.size = this.map_.size;
      return this;
    };
    b.prototype.delete = function (c) {
      c = this.map_.delete(c);
      this.size = this.map_.size;
      return c;
    };
    b.prototype.clear = function () {
      this.map_.clear();
      this.size = 0;
    };
    b.prototype.has = function (c) {
      return this.map_.has(c);
    };
    b.prototype.entries = function () {
      return this.map_.entries();
    };
    b.prototype.values = function () {
      return this.map_.values();
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function (c, d) {
      var e = this;
      this.map_.forEach(function (f) {
        return c.call(d, f, f, e);
      });
    };
    return b;
  });
  t("Object.values", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        var c = [];
        var d;
        for (d in b) {
          if (y(b, d)) {
            c.push(b[d]);
          }
        }
        return c;
      };
    }
  });
  t("Object.is", function (a) {
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
  t("Array.prototype.includes", function (a) {
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
  function Ba(a, b, c) {
    if (a == null) {
      throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    }
    if (b instanceof RegExp) {
      throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    }
    return a + "";
  }
  t("String.prototype.includes", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        return Ba(this, b, "includes").indexOf(b, c || 0) !== -1;
      };
    }
  });
  t("Array.from", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c, d) {
        c = c ?? function (h) {
          return h;
        };
        var e = [];
        var f = typeof Symbol != "undefined" && Symbol.iterator && b[Symbol.iterator];
        if (typeof f == "function") {
          b = f.call(b);
          var g = 0;
          while (!(f = b.next()).done) {
            e.push(c.call(d, f.value, g++));
          }
        } else {
          f = b.length;
          g = 0;
          for (; g < f; g++) {
            e.push(c.call(d, b[g], g));
          }
        }
        return e;
      };
    }
  });
  t("Object.entries", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        var c = [];
        var d;
        for (d in b) {
          if (y(b, d)) {
            c.push([d, b[d]]);
          }
        }
        return c;
      };
    }
  });
  t("Number.isFinite", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        if (typeof b !== "number") {
          return false;
        } else {
          return !isNaN(b) && b !== Infinity && b !== -Infinity;
        }
      };
    }
  });
  t("Number.MAX_SAFE_INTEGER", function () {
    return 9007199254740991;
  });
  t("Number.MIN_SAFE_INTEGER", function () {
    return -9007199254740991;
  });
  t("Number.isInteger", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        if (Number.isFinite(b)) {
          return b === Math.floor(b);
        } else {
          return false;
        }
      };
    }
  });
  t("Number.isSafeInteger", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        return Number.isInteger(b) && Math.abs(b) <= Number.MAX_SAFE_INTEGER;
      };
    }
  });
  t("String.prototype.startsWith", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        var d = Ba(this, b, "startsWith");
        b += "";
        var e = d.length;
        var f = b.length;
        c = Math.max(0, Math.min(c | 0, d.length));
        for (var g = 0; g < f && c < e;) {
          if (d[c++] != b[g++]) {
            return false;
          }
        }
        return g >= f;
      };
    }
  });
  function Ca(a, b) {
    if (a instanceof String) {
      a += "";
    }
    var c = 0;
    var d = false;
    var e = {
      next: function () {
        if (!d && c < a.length) {
          var f = c++;
          return {
            value: b(f, a[f]),
            done: false
          };
        }
        d = true;
        return {
          done: true,
          value: undefined
        };
      }
    };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  }
  t("Array.prototype.entries", function (a) {
    if (a) {
      return a;
    } else {
      return function () {
        return Ca(this, function (b, c) {
          return [b, c];
        });
      };
    }
  });
  t("Math.trunc", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        b = Number(b);
        if (isNaN(b) || b === Infinity || b === -Infinity || b === 0) {
          return b;
        }
        var c = Math.floor(Math.abs(b));
        if (b < 0) {
          return -c;
        } else {
          return c;
        }
      };
    }
  });
  t("Number.isNaN", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        return typeof b === "number" && isNaN(b);
      };
    }
  });
  t("Array.prototype.keys", function (a) {
    if (a) {
      return a;
    } else {
      return function () {
        return Ca(this, function (b) {
          return b;
        });
      };
    }
  });
  t("Array.prototype.values", function (a) {
    if (a) {
      return a;
    } else {
      return function () {
        return Ca(this, function (b, c) {
          return c;
        });
      };
    }
  });
  t("String.prototype.replaceAll", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        if (b instanceof RegExp && !b.global) {
          throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument.");
        }
        if (b instanceof RegExp) {
          return this.replace(b, c);
        } else {
          return this.replace(new RegExp(String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08"), "g"), c);
        }
      };
    }
  });
  t("Set.prototype.isSubsetOf", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        if (!(this instanceof Set)) {
          throw new TypeError("Method must be called on an instance of Set.");
        }
        if (typeof b !== "object" || b === null || typeof b.size !== "number" || b.size < 0 || typeof b.keys !== "function" || typeof b.has !== "function") {
          throw new TypeError("Argument must be set-like");
        }
        if (this.size > b.size) {
          return false;
        }
        var c = this.keys();
        for (var d = c.next(); !d.done;) {
          if (!b.has(d.value)) {
            return false;
          }
          d = c.next();
        }
        return true;
      };
    }
  }); /*
      Copyright The Closure Library Authors.
      SPDX-License-Identifier: Apache-2.0
      */
  var Da = Da || {};
  var z = this || self;
  function Ea(a, b, c) {
    a = a.split(".");
    c = c || z;
    for (var d; a.length && (d = a.shift());) {
      if (a.length || b === undefined) {
        c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {};
      } else {
        c[d] = b;
      }
    }
  }
  function A(a, b) {
    a = a.split(".");
    b = b || z;
    for (var c = 0; c < a.length; c++) {
      b = b[a[c]];
      if (b == null) {
        return null;
      }
    }
    return b;
  }
  function Fa(a) {
    var b = typeof a;
    if (b != "object") {
      return b;
    } else if (a) {
      if (Array.isArray(a)) {
        return "array";
      } else {
        return b;
      }
    } else {
      return "null";
    }
  }
  function Ga(a) {
    var b = Fa(a);
    return b == "array" || b == "object" && typeof a.length == "number";
  }
  function Ia(a) {
    var b = typeof a;
    return b == "object" && a != null || b == "function";
  }
  function Ja(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function Ka(a, b, c) {
    if (!a) {
      throw Error();
    }
    if (arguments.length > 2) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b, e);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function La(a, b, c) {
    La = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? Ja : Ka;
    return La.apply(null, arguments);
  }
  function Ma(a) {
    return a;
  }
  function Na(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.base = function (d, e, f) {
      var g = Array(arguments.length - 2);
      for (var h = 2; h < arguments.length; h++) {
        g[h - 2] = arguments[h];
      }
      return b.prototype[e].apply(d, g);
    };
  }
  /*
  Copyright Google LLC
  SPDX-License-Identifier: Apache-2.0
  */
  var Oa = globalThis.trustedTypes;
  var Pa;
  function Qa() {
    var a = null;
    if (!Oa) {
      return a;
    }
    try {
      function b(c) {
        return c;
      }
      a = Oa.createPolicy("uf-la#html", {
        createHTML: b,
        createScript: b,
        createScriptURL: b
      });
    } catch (c) {}
    return a;
  }
  ;
  function Ra(a) {
    this.privateDoNotAccessOrElseWrappedResourceUrl = a;
  }
  Ra.prototype.toString = function () {
    return this.privateDoNotAccessOrElseWrappedResourceUrl + "";
  };
  function Sa(a) {
    var b;
    if (Pa === undefined) {
      Pa = Qa();
    }
    a = (b = Pa) ? b.createScriptURL(a) : a;
    return new Ra(a);
  }
  function Ta(a) {
    if (a instanceof Ra) {
      return a.privateDoNotAccessOrElseWrappedResourceUrl;
    }
    throw Error("");
  }
  ;
  function Ua(a) {
    this.privateDoNotAccessOrElseWrappedUrl = a;
  }
  Ua.prototype.toString = function () {
    return this.privateDoNotAccessOrElseWrappedUrl;
  };
  var Va = new Ua("about:invalid#zClosurez");
  function Wa(a) {
    if (a instanceof Ua) {
      return a.privateDoNotAccessOrElseWrappedUrl;
    }
    throw Error("");
  }
  ;
  function B(a, b) {
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, B);
    } else {
      var c = Error().stack;
      if (c) {
        this.stack = c;
      }
    }
    if (a) {
      this.message = String(a);
    }
    if (b !== undefined) {
      this.cause = b;
    }
  }
  Na(B, Error);
  B.prototype.name = "CustomError";
  var Xa;
  function Ya(a) {
    z.setTimeout(function () {
      throw a;
    }, 0);
  }
  ;
  var Za = String.prototype.trim ? function (a) {
    return a.trim();
  } : function (a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
  };
  var $a;
  var ab = A("CLOSURE_FLAGS");
  var bb = ab && ab[748402147];
  $a = bb ?? true;
  function cb() {
    var a = z.navigator;
    if (a &&= a.userAgent) {
      return a;
    } else {
      return "";
    }
  }
  ;
  var db = Array.prototype.indexOf ? function (a, b) {
    return Array.prototype.indexOf.call(a, b, undefined);
  } : function (a, b) {
    if (typeof a === "string") {
      if (typeof b !== "string" || b.length != 1) {
        return -1;
      } else {
        return a.indexOf(b, 0);
      }
    }
    for (var c = 0; c < a.length; c++) {
      if (c in a && a[c] === b) {
        return c;
      }
    }
    return -1;
  };
  var eb = Array.prototype.forEach ? function (a, b) {
    Array.prototype.forEach.call(a, b, undefined);
  } : function (a, b) {
    for (var c = a.length, d = typeof a === "string" ? a.split("") : a, e = 0; e < c; e++) {
      if (e in d) {
        b.call(undefined, d[e], e, a);
      }
    }
  };
  var fb = Array.prototype.some ? function (a, b) {
    return Array.prototype.some.call(a, b, undefined);
  } : function (a, b) {
    for (var c = a.length, d = typeof a === "string" ? a.split("") : a, e = 0; e < c; e++) {
      if (e in d && b.call(undefined, d[e], e, a)) {
        return true;
      }
    }
    return false;
  };
  function gb(a, b) {
    b = db(a, b);
    var c;
    if (c = b >= 0) {
      Array.prototype.splice.call(a, b, 1);
    }
    return c;
  }
  function hb(a) {
    var b = a.length;
    if (b > 0) {
      var c = Array(b);
      for (var d = 0; d < b; d++) {
        c[d] = a[d];
      }
      return c;
    }
    return [];
  }
  ;
  var ib = cb().toLowerCase().indexOf("webkit") != -1 && cb().indexOf("Edge") == -1;
  var jb = ib && cb().indexOf("Mobile") != -1;
  var kb = {};
  var lb = null;
  function mb(a) {
    var b = [];
    var c = 0;
    for (var d = 0; d < a.length; d++) {
      var e = a.charCodeAt(d);
      if (e > 255) {
        b[c++] = e & 255;
        e >>= 8;
      }
      b[c++] = e;
    }
    a = 2;
    if (a === undefined) {
      a = 0;
    }
    if (!lb) {
      lb = {};
      c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
      d = ["+/=", "+/", "-_=", "-_.", "-_"];
      e = 0;
      for (; e < 5; e++) {
        var f = c.concat(d[e].split(""));
        kb[e] = f;
        for (var g = 0; g < f.length; g++) {
          var h = f[g];
          if (lb[h] === undefined) {
            lb[h] = g;
          }
        }
      }
    }
    a = kb[a];
    c = Array(Math.floor(b.length / 3));
    d = a[64] || "";
    for (e = f = 0; f < b.length - 2; f += 3) {
      var k = b[f];
      var l = b[f + 1];
      h = b[f + 2];
      g = a[k >> 2];
      k = a[(k & 3) << 4 | l >> 4];
      l = a[(l & 15) << 2 | h >> 6];
      h = a[h & 63];
      c[e++] = "" + g + k + l + h;
    }
    g = 0;
    h = d;
    switch (b.length - f) {
      case 2:
        g = b[f + 1];
        h = a[(g & 15) << 2] || d;
      case 1:
        b = b[f];
        c[e] = "" + a[b >> 2] + a[(b & 3) << 4 | g >> 4] + h + d;
    }
    return c.join("");
  }
  var nb = typeof Symbol === "function" && typeof Symbol() === "symbol";
  function ob(a, b, c) {
    if (typeof Symbol === "function" && typeof Symbol() === "symbol") {
      if ((c === undefined ? 0 : c) && Symbol.for && a) {
        return Symbol.for(a);
      } else if (a != null) {
        return Symbol(a);
      } else {
        return Symbol();
      }
    } else {
      return b;
    }
  }
  var pb = ob("jas", undefined, true);
  var qb = ob(undefined, Symbol());
  var sb = ob(undefined, "0ub");
  var tb = ob(undefined, "0ubs");
  var ub = ob(undefined, "0actk");
  var vb = ob("m_m", "messagePrototypeMarker", true);
  var wb = ob();
  Math.max.apply(Math, la(Object.values({
    IS_REPEATED_FIELD: 1,
    IS_IMMUTABLE_ARRAY: 2,
    IS_API_FORMATTED: 4,
    ONLY_MUTABLE_VALUES: 8,
    UNFROZEN_SHARED: 16,
    MUTABLE_REFERENCES_ARE_OWNED: 32,
    CONSTRUCTED: 64,
    HAS_MESSAGE_ID: 128,
    FROZEN_ARRAY: 256,
    STRING_FORMATTED: 512,
    GBIGINT_FORMATTED: 1024,
    HAS_WRAPPER: 2048,
    MUTABLE_SUBSTRUCTURES: 4096,
    KNOWN_MAP_ARRAY: 8192
  })));
  var xb = {
    internalArrayState: {
      value: 0,
      configurable: true,
      writable: true,
      enumerable: false
    }
  };
  var yb = Object.defineProperties;
  var C = nb ? pb : "internalArrayState";
  var zb;
  var Ab = [];
  E(Ab, 7);
  zb = Object.freeze(Ab);
  function Bb(a, b) {
    if (!nb && !(C in a)) {
      yb(a, xb);
    }
    a[C] |= b;
  }
  function E(a, b) {
    if (!nb && !(C in a)) {
      yb(a, xb);
    }
    a[C] = b;
  }
  ;
  function Cb() {
    return typeof BigInt === "function";
  }
  ;
  var Db = {};
  function Eb(a, b) {
    if (b === undefined) {
      return a.copyOnWrite !== Fb && !!((a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows[C] | 0) & 2);
    } else {
      return !!(b & 2) && a.copyOnWrite !== Fb;
    }
  }
  var Fb = {};
  var Gb = Object.freeze({});
  function Hb(a) {
    return a;
  }
  ;
  function Ib(a) {
    a.isGuard_doNotManuallySetPrettyPlease = true;
    return a;
  }
  ;
  var Jb = Ib(function (a) {
    return typeof a === "number";
  });
  var Kb = Ib(function (a) {
    return typeof a === "string";
  });
  var Lb = Ib(function (a) {
    return typeof a === "boolean";
  });
  var Mb = Ib(function (a) {
    return typeof a === "bigint";
  });
  var Nb = typeof z.BigInt === "function" && typeof z.BigInt(0) === "bigint";
  function F(a) {
    var b = a;
    if (Kb(b)) {
      if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(b)) {
        throw Error(String(b));
      }
    } else if (Jb(b) && !Number.isSafeInteger(b)) {
      throw Error(String(b));
    }
    if (Nb) {
      return BigInt(a);
    } else {
      return a = Lb(a) ? a ? "1" : "0" : Kb(a) ? a.trim() || "0" : String(a);
    }
  }
  var Ob = Ib(function (a) {
    if (Nb) {
      return Mb(a);
    } else {
      return Kb(a) && /^(?:-?[1-9]\d*|0)$/.test(a);
    }
  });
  var Ub = Ib(function (a) {
    if (Nb) {
      return a >= Pb && a <= Qb;
    } else if (a[0] === "-") {
      return Rb(a, Sb);
    } else {
      return Rb(a, Tb);
    }
  });
  var Sb = Number.MIN_SAFE_INTEGER.toString();
  var Pb = Nb ? BigInt(Number.MIN_SAFE_INTEGER) : undefined;
  var Tb = Number.MAX_SAFE_INTEGER.toString();
  var Qb = Nb ? BigInt(Number.MAX_SAFE_INTEGER) : undefined;
  function Rb(a, b) {
    if (a.length > b.length) {
      return false;
    }
    if (a.length < b.length || a === b) {
      return true;
    }
    for (var c = 0; c < a.length; c++) {
      var d = a[c];
      var e = b[c];
      if (d > e) {
        return false;
      }
      if (d < e) {
        return true;
      }
    }
  }
  ;
  var G = 0;
  var H = 0;
  function Vb(a) {
    var b = a >>> 0;
    G = b;
    H = (a - b) / 4294967296 >>> 0;
  }
  function Wb(a) {
    if (a < 0) {
      Vb(0 - a);
      var b = w(Xb(G, H));
      a = b.next().value;
      b = b.next().value;
      G = a >>> 0;
      H = b >>> 0;
    } else {
      Vb(a);
    }
  }
  function Yb(a, b) {
    b >>>= 0;
    a >>>= 0;
    if (b <= 2097151) {
      var c = "" + (b * 4294967296 + a);
    } else if (Cb()) {
      c = "" + (BigInt(b) << BigInt(32) | BigInt(a));
    } else {
      c = (a >>> 24 | b << 8) & 16777215;
      b = b >> 16 & 65535;
      a = (a & 16777215) + c * 6777216 + b * 6710656;
      c += b * 8147497;
      b *= 2;
      if (a >= 10000000) {
        c += a / 10000000 >>> 0;
        a %= 10000000;
      }
      if (c >= 10000000) {
        b += c / 10000000 >>> 0;
        c %= 10000000;
      }
      c = b + Zb(c) + Zb(a);
    }
    return c;
  }
  function Zb(a) {
    a = String(a);
    return "0000000".slice(a.length) + a;
  }
  function $b() {
    var a = G;
    var b = H;
    if (b & 2147483648) {
      if (Cb()) {
        a = "" + (BigInt(b | 0) << BigInt(32) | BigInt(a >>> 0));
      } else {
        b = w(Xb(a, b));
        a = b.next().value;
        b = b.next().value;
        a = "-" + Yb(a, b);
      }
    } else {
      a = Yb(a, b);
    }
    return a;
  }
  function Xb(a, b) {
    b = ~b;
    if (a) {
      a = ~a + 1;
    } else {
      b += 1;
    }
    return [a, b];
  }
  ;
  function ac(a, b) {
    a.__closure__error__context__984382 ||= {};
    a.__closure__error__context__984382.severity = b;
  }
  ;
  var bc = undefined;
  function cc(a) {
    a = Error(a);
    ac(a, "warning");
    return a;
  }
  function dc(a, b) {
    if (a != null) {
      var c;
      var d = (c = bc) != null ? c : bc = {};
      c = d[a] || 0;
      if (!(c >= b)) {
        d[a] = c + 1;
        a = Error();
        ac(a, "incident");
        Ya(a);
      }
    }
  }
  ;
  function ec(a) {
    return Array.prototype.slice.call(a);
  }
  ;
  var fc = typeof BigInt === "function" ? BigInt.asIntN : undefined;
  var hc = Number.isSafeInteger;
  var ic = Number.isFinite;
  var jc = Math.trunc;
  function kc(a) {
    return a.displayName || a.name || "unknown type name";
  }
  var lc = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
  function mc(a) {
    switch (typeof a) {
      case "bigint":
        return true;
      case "number":
        return ic(a);
      case "string":
        return lc.test(a);
      default:
        return false;
    }
  }
  function nc(a) {
    if (!ic(a)) {
      throw cc("enum");
    }
    return a | 0;
  }
  function oc(a) {
    if (a == null) {
      return a;
    } else if (ic(a)) {
      return a | 0;
    } else {
      return undefined;
    }
  }
  function pc(a) {
    if (typeof a !== "number") {
      throw cc("int32");
    }
    if (!ic(a)) {
      throw cc("int32");
    }
    return a | 0;
  }
  function qc(a) {
    var b = 0;
    b = b === undefined ? 0 : b;
    if (!mc(a)) {
      throw cc("int64");
    }
    var c = typeof a;
    switch (b) {
      case 512:
        switch (c) {
          case "string":
            return rc(a);
          case "bigint":
            return String(fc(64, a));
          default:
            return sc(a);
        }
      case 1024:
        switch (c) {
          case "string":
            return tc(a);
          case "bigint":
            return F(fc(64, a));
          default:
            return uc(a);
        }
      case 0:
        switch (c) {
          case "string":
            return rc(a);
          case "bigint":
            return F(fc(64, a));
          default:
            return vc(a);
        }
      default:
        throw Error("Unknown format requested type for int64");
    }
  }
  function wc(a) {
    var b = a.length;
    if (a[0] === "-" ? b < 20 || b === 20 && a <= "-9223372036854775808" : b < 19 || b === 19 && a <= "9223372036854775807") {
      return a;
    }
    if (a.length < 16) {
      Wb(Number(a));
    } else if (Cb()) {
      a = BigInt(a);
      G = Number(a & BigInt(4294967295)) >>> 0;
      H = Number(a >> BigInt(32) & BigInt(4294967295));
    } else {
      b = +(a[0] === "-");
      H = G = 0;
      for (var c = a.length, d = 0 + b, e = (c - b) % 6 + b; e <= c; d = e, e += 6) {
        d = Number(a.slice(d, e));
        H *= 1000000;
        G = G * 1000000 + d;
        if (G >= 4294967296) {
          H += Math.trunc(G / 4294967296);
          H >>>= 0;
          G >>>= 0;
        }
      }
      if (b) {
        b = w(Xb(G, H));
        a = b.next().value;
        b = b.next().value;
        G = a;
        H = b;
      }
    }
    return $b();
  }
  function vc(a) {
    mc(a);
    a = jc(a);
    if (!hc(a)) {
      Wb(a);
      var b = G;
      var c = H;
      if (a = c & 2147483648) {
        b = ~b + 1 >>> 0;
        c = ~c >>> 0;
        if (b == 0) {
          c = c + 1 >>> 0;
        }
      }
      var d = c * 4294967296 + (b >>> 0);
      b = Number.isSafeInteger(d) ? d : Yb(b, c);
      a = typeof b === "number" ? a ? -b : b : a ? "-" + b : b;
    }
    return a;
  }
  function sc(a) {
    mc(a);
    a = jc(a);
    if (hc(a)) {
      a = String(a);
    } else {
      Wb(a);
      a = $b();
    }
    return a;
  }
  function rc(a) {
    mc(a);
    var b = jc(Number(a));
    if (hc(b)) {
      return String(b);
    }
    b = a.indexOf(".");
    if (b !== -1) {
      a = a.substring(0, b);
    }
    return wc(a);
  }
  function tc(a) {
    var b = jc(Number(a));
    if (hc(b)) {
      return F(b);
    }
    b = a.indexOf(".");
    if (b !== -1) {
      a = a.substring(0, b);
    }
    if (Cb()) {
      return F(fc(64, BigInt(a)));
    } else {
      return F(wc(a));
    }
  }
  function uc(a) {
    if (hc(a)) {
      return F(vc(a));
    } else {
      return F(sc(a));
    }
  }
  function xc(a) {
    if (typeof a !== "string") {
      throw Error();
    }
    return a;
  }
  function I(a) {
    if (a != null && typeof a !== "string") {
      throw Error();
    }
    return a;
  }
  function yc(a) {
    if (a == null || typeof a === "string") {
      return a;
    } else {
      return undefined;
    }
  }
  ;
  var zc = {
    reviveIntoImmutable: true
  };
  function Ac(a, b, c) {
    var d = d === undefined ? false : d;
    if (Ma(wb) && Ma(qb) && c === wb) {
      c = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
      var e = c[qb];
      if (!e) {
        return;
      }
      if (e = e.reviveUnknownFields) {
        try {
          e(c, b, zc);
          return;
        } catch (f) {
          Ya(f);
        }
      }
    }
    if (d) {
      a = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
      if ((d = Ma(qb)) && d in a && (a = a[d])) {
        delete a[b];
      }
    }
  }
  function Bc(a, b) {
    var c = Ma(qb);
    var d;
    if (nb && c && ((d = a[c]) == null ? undefined : d[b]) != null) {
      dc(sb, 3);
    }
  }
  function Cc(a, b) {
    if (!(b < 100)) {
      dc(tb, 1);
    }
  }
  ;
  function Dc(a, b, c, d) {
    var e = d !== undefined;
    d = !!d;
    var f = Ma(qb);
    var g;
    if (!e && nb && f && (g = a[f])) {
      g.forEachUnknownField(Cc);
    }
    f = [];
    var h = a.length;
    g = 4294967295;
    var k = false;
    var l = !!(b & 64);
    var n = l ? b & 128 ? 0 : -1 : undefined;
    if (!(b & 1)) {
      var q = h && a[h - 1];
      if (q != null && typeof q === "object" && q.constructor === Object) {
        h--;
        g = h;
      } else {
        q = undefined;
      }
      if (l && !(b & 128) && !e) {
        k = true;
        var r;
        g = ((r = Ec) != null ? r : Hb)(g - n, n, a, q, undefined) + n;
      }
    }
    b = undefined;
    for (e = 0; e < h; e++) {
      r = a[e];
      if (r != null && (r = c(r, d)) != null) {
        if (l && e >= g) {
          var p = e - n;
          var v = undefined;
          ((v = b) != null ? v : b = {})[p] = r;
        } else {
          f[e] = r;
        }
      }
    }
    if (q) {
      for (var D in q) {
        a = q[D];
        if (a != null && (a = c(a, d)) != null) {
          h = +D;
          e = undefined;
          if (l && !Number.isNaN(h) && (e = h + n) < g) {
            f[e] = a;
          } else {
            h = undefined;
            ((h = b) != null ? h : b = {})[D] = a;
          }
        }
      }
    }
    if (b) {
      if (k) {
        f.push(b);
      } else {
        f[g] = b;
      }
    }
    return f;
  }
  function Fc(a) {
    switch (typeof a) {
      case "number":
        if (Number.isFinite(a)) {
          return a;
        } else {
          return "" + a;
        }
      case "bigint":
        if (Ub(a)) {
          return Number(a);
        } else {
          return "" + a;
        }
      case "boolean":
        if (a) {
          return 1;
        } else {
          return 0;
        }
      case "object":
        if (Array.isArray(a)) {
          var b = a[C] | 0;
          if (a.length === 0 && b & 1) {
            return undefined;
          } else {
            return Dc(a, b, Fc);
          }
        }
        if (a != null && a[vb] === Db) {
          return Gc(a);
        }
        return;
    }
    return a;
  }
  var Ec;
  function Gc(a) {
    a = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
    return Dc(a, a[C] | 0, Fc);
  }
  ;
  function J(a, b, c) {
    return Hc(a, b, c, 2048);
  }
  function Hc(a, b, c, d) {
    d = d === undefined ? 0 : d;
    if (a == null) {
      var e = 32;
      if (c) {
        a = [c];
        e |= 128;
      } else {
        a = [];
      }
      if (b) {
        e = e & -16760833 | (b & 1023) << 14;
      }
    } else {
      if (!Array.isArray(a)) {
        throw Error("narr");
      }
      e = a[C] | 0;
      if ($a && e & 1) {
        throw Error("rfarr");
      }
      if (e & 2048 && !(e & 2)) {
        Ic();
      }
      if (e & 256) {
        throw Error("farr");
      }
      if (e & 64) {
        if ((e | d) !== e) {
          E(a, e | d);
        }
        return a;
      }
      if (c && (e |= 128, c !== a[0])) {
        throw Error("mid");
      }
      a: {
        c = a;
        e |= 64;
        var f = c.length;
        if (f) {
          var g = f - 1;
          var h = c[g];
          if (h != null && typeof h === "object" && h.constructor === Object) {
            b = e & 128 ? 0 : -1;
            g -= b;
            if (g >= 1024) {
              throw Error("pvtlmt");
            }
            for (var k in h) {
              f = +k;
              if (f < g) {
                c[f + b] = h[k];
                delete h[k];
              }
            }
            e = e & -16760833 | (g & 1023) << 14;
            break a;
          }
        }
        if (b) {
          k = Math.max(b, f - (e & 128 ? 0 : -1));
          if (k > 1024) {
            throw Error("spvt");
          }
          e = e & -16760833 | (k & 1023) << 14;
        }
      }
    }
    E(a, e | 64 | d);
    return a;
  }
  function Ic() {
    if ($a) {
      throw Error("carr");
    }
    dc(ub, 5);
  }
  ;
  function Jc(a, b) {
    if (typeof a !== "object") {
      return a;
    }
    if (Array.isArray(a)) {
      var c = a[C] | 0;
      if (a.length === 0 && c & 1) {
        a = undefined;
      } else if (!(c & 2)) {
        if (!b || c & 4096 || c & 16) {
          a = Kc(a, c, false, b && !(c & 16));
        } else {
          Bb(a, 34);
          if (c & 4) {
            Object.freeze(a);
          }
        }
      }
      return a;
    }
    if (a != null && a[vb] === Db) {
      b = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
      c = b[C] | 0;
      if (Eb(a, c)) {
        return a;
      } else if (Lc(a, b, c)) {
        return Mc(a, b);
      } else {
        return Kc(b, c);
      }
    }
  }
  function Mc(a, b, c) {
    a = new a.constructor(b);
    if (c) {
      a.copyOnWrite = Fb;
    }
    a.noLegacyNull = Fb;
    return a;
  }
  function Kc(a, b, c, d) {
    if (d == null) {
      d = !!(b & 34);
    }
    a = Dc(a, b, Jc, d);
    d = 32;
    if (c) {
      d |= 2;
    }
    b = b & 16769217 | d;
    E(a, b);
    return a;
  }
  function Nc(a) {
    if (a.copyOnWrite !== Fb) {
      return false;
    }
    var b = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
    b = Kc(b, b[C] | 0);
    Bb(b, 2048);
    a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = b;
    a.copyOnWrite = undefined;
    a.noLegacyNull = undefined;
    return true;
  }
  function Oc(a) {
    if (!Nc(a) && Eb(a, a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows[C] | 0)) {
      throw Error();
    }
  }
  function Pc(a, b = a[C] | 0) {
    if (b & 32 && !(b & 4096)) {
      E(a, b | 4096);
    }
  }
  function Lc(a, b, c) {
    if (c & 2) {
      return true;
    } else if (c & 32 && !(c & 4096)) {
      E(b, c | 2);
      a.copyOnWrite = Fb;
      return true;
    } else {
      return false;
    }
  }
  ;
  var Qc = F(0);
  var Rc = {};
  function Tc(a, b, c, d) {
    Object.isExtensible(a);
    b = Sc(a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows, b, c);
    if (b !== null || d && a.noLegacyNull !== Fb) {
      return b;
    }
  }
  function Sc(a, b, c, d) {
    if (b === -1) {
      return null;
    }
    var e = b + (c ? 0 : -1);
    var f = a.length - 1;
    if (!(f < 1 + (c ? 0 : -1))) {
      if (e >= f) {
        var g = a[f];
        if (g != null && typeof g === "object" && g.constructor === Object) {
          c = g[b];
          var h = true;
        } else if (e === f) {
          c = g;
        } else {
          return;
        }
      } else {
        c = a[e];
      }
      if (d && c != null) {
        d = d(c);
        if (d == null) {
          return d;
        }
        if (!Object.is(d, c)) {
          if (h) {
            g[b] = d;
          } else {
            a[e] = d;
          }
          return d;
        }
      }
      return c;
    }
  }
  function Vc(a, b, c) {
    Oc(a);
    a = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
    Uc(a, a[C] | 0, b, c);
  }
  function Uc(a, b, c, d) {
    var e = c + -1;
    var f = a.length - 1;
    if (f >= 0 && e >= f) {
      var g = a[f];
      if (g != null && typeof g === "object" && g.constructor === Object) {
        g[c] = d;
        return b;
      }
    }
    if (e <= f) {
      a[e] = d;
      return b;
    }
    if (d !== undefined) {
      f = (b ??= a[C] | 0) >> 14 & 1023 || 536870912;
      if (c >= f) {
        if (d != null) {
          e = {};
          a[f + -1] = (e[c] = d, e);
        }
      } else {
        a[e] = d;
      }
    }
    return b;
  }
  function Wc(a, b, c, d, e) {
    var f = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
    var g = f[C] | 0;
    d = Eb(a, g) ? 1 : d;
    e = !!e || d === 3;
    if (d === 2 && Nc(a)) {
      f = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
      g = f[C] | 0;
    }
    a = Sc(f, b);
    var h = Array.isArray(a) ? a : zb;
    var k = h === zb ? 7 : h[C] | 0;
    a = k;
    if (g & 2) {
      a |= 2;
    }
    var l = a | 1;
    a = l & 4 ? false : true;
    if (a) {
      if (l & 4) {
        h = ec(h);
        k = 0;
        l = Xc(l, g);
        g = Uc(f, g, b, h);
      }
      for (var n = 0, q = 0; n < h.length; n++) {
        var r = c(h[n]);
        if (r != null) {
          h[q++] = r;
        }
      }
      if (q < n) {
        h.length = q;
      }
      c = (l | 4) & -513;
      l = c &= -1025;
      l &= -4097;
    }
    if (l !== k) {
      E(h, l);
      if (l & 2) {
        Object.freeze(h);
      }
    }
    c = h;
    k = h = l;
    if (d === 1 || (d !== 4 ? 0 : h & 2 || !(h & 16) && g & 32)) {
      if (!Yc(h)) {
        h |= !c.length || a && !(h & 4096) || g & 32 && !(h & 4096) && !(h & 16) ? 2 : 256;
        if (h !== k) {
          E(c, h);
        }
        Object.freeze(c);
      }
    } else {
      if (d === 2 && Yc(h)) {
        c = ec(c);
        k = 0;
        h = Xc(h, g);
        g = Uc(f, g, b, c);
      }
      if (!Yc(h)) {
        if (!e) {
          h |= 16;
        }
        if (h !== k) {
          E(c, h);
        }
      }
    }
    if (!(h & 2) && (!!(h & 4096) || !!(h & 16))) {
      Pc(f, g);
    }
    return c;
  }
  function Yc(a) {
    return !!(a & 2) && !!(a & 4) || !!(a & 256);
  }
  function Zc(a, b, c, d) {
    Oc(a);
    var e = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
    var f = e[C] | 0;
    if (c == null) {
      Uc(e, f, b);
      return a;
    }
    if (!Array.isArray(c)) {
      throw cc();
    }
    var g = c === zb ? 7 : c[C] | 0;
    var h = g;
    var k = Yc(g);
    var l = k || Object.isFrozen(c);
    if (!k) {
      g = 0;
    }
    if (!l) {
      c = ec(c);
      h = 0;
      g = Xc(g, f);
      l = false;
    }
    g |= 5;
    k = g & 4 ? g & 512 ? 512 : g & 1024 ? 1024 : 0 : undefined;
    k = k ?? 0;
    for (var n = 0; n < c.length; n++) {
      var q = c[n];
      var r = d(q, k);
      if (!Object.is(q, r)) {
        if (l) {
          c = ec(c);
          h = 0;
          g = Xc(g, f);
          l = false;
        }
        c[n] = r;
      }
    }
    if (g !== h) {
      if (l) {
        c = ec(c);
        g = Xc(g, f);
      }
      E(c, g);
    }
    Uc(e, f, b, c);
    return a;
  }
  function K(a, b, c, d) {
    Oc(a);
    var e = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
    Uc(e, e[C] | 0, b, (d === "0" ? Number(c) === 0 : c === d) ? undefined : c);
    return a;
  }
  function $c(a, b, c, d, e) {
    var f = false;
    d = Sc(a, d, e, function (g) {
      if (g != null && g[vb] === Db) {
        var h = g;
      } else if (Array.isArray(g)) {
        h = g[C] | 0;
        var k = h | b & 32;
        k |= b & 2;
        if (k !== h) {
          E(g, k);
        }
        h = new c(g);
      } else {
        h = undefined;
      }
      f = h !== g && h != null;
      return h;
    });
    if (d != null) {
      if (f && !Eb(d)) {
        Pc(a, b);
      }
      return d;
    }
  }
  function L(a, b, c) {
    var d = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
    var e = d[C] | 0;
    b = $c(d, e, b, c);
    if (b == null) {
      return b;
    }
    e = d[C] | 0;
    if (!Eb(a, e)) {
      var f = b;
      var g = f.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
      var h = g[C] | 0;
      f = Eb(f, h) ? Lc(f, g, h) ? Mc(f, g, true) : new f.constructor(Kc(g, h, false)) : f;
      if (f !== b) {
        if (Nc(a)) {
          d = a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
          e = d[C] | 0;
        }
        b = f;
        e = Uc(d, e, c, b);
        Pc(d, e);
      }
    }
    return b;
  }
  function M(a, b, c, d) {
    if (d != null) {
      if (!(d instanceof b)) {
        throw Error("Expected instanceof " + kc(b) + " but got " + (d && kc(d.constructor)));
      }
    } else {
      d = undefined;
    }
    Vc(a, c, d);
    if (d && !Eb(d)) {
      Pc(a.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows);
    }
    return a;
  }
  function Xc(a, b) {
    return a = (b & 2 ? a | 2 : a & -3) & -273;
  }
  function N(a, b) {
    var c = c === undefined ? false : c;
    a = Tc(a, b);
    a = a == null || typeof a === "boolean" ? a : typeof a === "number" ? !!a : undefined;
    return a ?? c;
  }
  function ad(a, b) {
    var c = c === undefined ? "" : c;
    return yc(Tc(a, b)) ?? c;
  }
  function bd(a, b, c) {
    a = Wc(a, b, yc, 3, true);
    if (typeof c !== "number" || c < 0 || c >= a.length) {
      throw Error();
    }
    return a[c];
  }
  function cd(a) {
    return Wc(a, 4, oc, Gb === undefined ? 2 : 4);
  }
  function P(a, b, c) {
    if (c != null && typeof c !== "boolean") {
      throw Error("Expected boolean but got " + Fa(c) + ": " + c);
    }
    return K(a, b, c, false);
  }
  function Q(a, b, c) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a, b, c);
  }
  Q.prototype.toJSON = function () {
    return Gc(this);
  };
  function dd(a, b) {
    if (b == null || b == "") {
      return new a();
    }
    b = JSON.parse(b);
    if (!Array.isArray(b)) {
      throw Error("dnarr");
    }
    Bb(b, 32);
    return new a(b);
  }
  Q.prototype.getExtension = function (a) {
    Bc(this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows, a.fieldIndex);
    Ac(this, a.fieldIndex, a.lazyParse);
    if (a.ctor) {
      if (a.isRepeated) {
        return a.getExtensionFn(this, a.ctor, a.fieldIndex, Gb === undefined ? 2 : 4, a.hasMessageId);
      } else {
        return a.getExtensionFn(this, a.ctor, a.fieldIndex, a.hasMessageId);
      }
    } else if (a.isRepeated) {
      return a.getExtensionFn(this, a.fieldIndex, Gb === undefined ? 2 : 4, a.hasMessageId);
    } else {
      return a.getExtensionFn(this, a.fieldIndex, a.defaultValue, a.hasMessageId);
    }
  };
  Q.prototype.hasExtension = function (a) {
    Bc(this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows, a.fieldIndex);
    Ac(this, a.fieldIndex, a.lazyParse);
    if (a.ctor) {
      var b = this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
      a = $c(b, b[C] | 0, a.ctor, a.fieldIndex, a.hasMessageId) !== undefined;
    } else {
      Bc(this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows, a.fieldIndex);
      Ac(this, a.fieldIndex, a.lazyParse);
      a = a.ctor ? a.getExtensionFn(this, a.ctor, a.fieldIndex, a.hasMessageId) : a.getExtensionFn(this, a.fieldIndex, null, a.hasMessageId);
      a = (a === null ? undefined : a) !== undefined;
    }
    return a;
  };
  Q.prototype.clone = function () {
    var a = this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows;
    var b = a[C] | 0;
    if (Lc(this, a, b)) {
      return Mc(this, a, true);
    } else {
      return new this.constructor(Kc(a, b, false));
    }
  };
  Q.prototype[vb] = Db;
  Q.prototype.toString = function () {
    return this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows.toString();
  };
  function ed(a, b) {
    for (var c in a) {
      b.call(undefined, a[c], c, a);
    }
  }
  function fd(a, b) {
    for (var c in a) {
      if (b.call(undefined, a[c], c, a)) {
        return true;
      }
    }
    return false;
  }
  var gd = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
  function hd(a, b) {
    var c;
    var d;
    for (var e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) {
        a[c] = d[c];
      }
      for (var f = 0; f < gd.length; f++) {
        c = gd[f];
        if (Object.prototype.hasOwnProperty.call(d, c)) {
          a[c] = d[c];
        }
      }
    }
  }
  ;
  function kd(a, b) {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a === id && b || "";
    this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = jd;
  }
  kd.prototype.toString = function () {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  };
  function ld(a) {
    if (a instanceof kd && a.constructor === kd && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === jd) {
      return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    } else {
      return "type_error:Const";
    }
  }
  function R(a) {
    return new kd(id, a);
  }
  var jd = {};
  var id = {};
  function md(a) {
    this.isValid = a;
  }
  function nd(a) {
    return new md(function (b) {
      return b.substr(0, a.length + 1).toLowerCase() === a + ":";
    });
  }
  var od = [nd("data"), nd("http"), nd("https"), nd("mailto"), nd("ftp"), new md(function (a) {
    return /^[^:]*([/?#]|$)/.test(a);
  })];
  function pd(a) {
    var b = b === undefined ? od : b;
    b = b === undefined ? od : b;
    a: if (!(a instanceof Ua)) {
      for (var c = 0; c < b.length; ++c) {
        var d = b[c];
        if (d instanceof md && d.isValid(a)) {
          a = new Ua(a);
          break a;
        }
      }
      a = undefined;
    }
    return a || Va;
  }
  var qd = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
  function rd(a) {
    a = a instanceof Ua ? Wa(a) : qd.test(a) ? a : undefined;
    return a;
  }
  ;
  function sd(a, b) {
    b = rd(b);
    if (b !== undefined) {
      a.open(b, undefined, undefined);
    }
  }
  function td(a) {
    a = a === undefined ? document : a;
    var b;
    var c;
    a = (c = (b = a).querySelector) == null ? undefined : c.call(b, "script[nonce]");
    if (a == null) {
      return "";
    } else {
      return a.nonce || a.getAttribute("nonce") || "";
    }
  }
  ;
  function ud(a, b) {
    a.src = Ta(b);
    if (b = td(a.ownerDocument)) {
      a.setAttribute("nonce", b);
    }
  }
  ;
  var vd = "alternate author bookmark canonical cite help icon license modulepreload next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" ");
  function S(a) {
    var b = za.apply(1, arguments);
    if (b.length === 0) {
      return Sa(a[0]);
    }
    var c = a[0];
    for (var d = 0; d < b.length; d++) {
      c += encodeURIComponent(b[d]) + a[d + 1];
    }
    return Sa(c);
  }
  ;
  function yd(a) {
    if (a) {
      return new wd(xd(a));
    } else {
      return Xa ||= new wd();
    }
  }
  function Ad(a, b) {
    ed(b, function (c, d) {
      if (d == "style") {
        a.style.cssText = c;
      } else if (d == "class") {
        a.className = c;
      } else if (d == "for") {
        a.htmlFor = c;
      } else if (zd.hasOwnProperty(d)) {
        a.setAttribute(zd[d], c);
      } else if (d.lastIndexOf("aria-", 0) == 0 || d.lastIndexOf("data-", 0) == 0) {
        a.setAttribute(d, c);
      } else {
        a[d] = c;
      }
    });
  }
  var zd = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
  };
  function Bd(a, b, c) {
    function d(h) {
      if (h) {
        b.appendChild(typeof h === "string" ? a.createTextNode(h) : h);
      }
    }
    for (var e = 1; e < c.length; e++) {
      var f = c[e];
      if (!Ga(f) || Ia(f) && f.nodeType > 0) {
        d(f);
      } else {
        a: {
          if (f && typeof f.length == "number") {
            if (Ia(f)) {
              var g = typeof f.item == "function" || typeof f.item == "string";
              break a;
            }
            if (typeof f === "function") {
              g = typeof f.item == "function";
              break a;
            }
          }
          g = false;
        }
        eb(g ? hb(f) : f, d);
      }
    }
  }
  function Cd(a, b) {
    b = String(b);
    if (a.contentType === "application/xhtml+xml") {
      b = b.toLowerCase();
    }
    return a.createElement(b);
  }
  function Dd(a) {
    if (a && a.parentNode) {
      return a.parentNode.removeChild(a);
    } else {
      return null;
    }
  }
  function xd(a) {
    if (a.nodeType == 9) {
      return a;
    } else {
      return a.ownerDocument || a.document;
    }
  }
  function wd(a) {
    this.document_ = a || z.document || document;
  }
  m = wd.prototype;
  m.getElementsByTagName = function (a, b) {
    return (b || this.document_).getElementsByTagName(String(a));
  };
  m.createElement = function (a) {
    return Cd(this.document_, a);
  };
  m.createTextNode = function (a) {
    return this.document_.createTextNode(String(a));
  };
  m.getWindow = function () {
    return this.document_.defaultView;
  };
  m.appendChild = function (a, b) {
    a.appendChild(b);
  };
  m.append = function (a, b) {
    Bd(xd(a), a, arguments);
  };
  m.canHaveChildren = function (a) {
    if (a.nodeType != 1) {
      return false;
    }
    switch (a.tagName) {
      case "APPLET":
      case "AREA":
      case "BASE":
      case "BR":
      case "COL":
      case "COMMAND":
      case "EMBED":
      case "FRAME":
      case "HR":
      case "IMG":
      case "INPUT":
      case "IFRAME":
      case "ISINDEX":
      case "KEYGEN":
      case "LINK":
      case "NOFRAMES":
      case "NOSCRIPT":
      case "META":
      case "OBJECT":
      case "PARAM":
      case "SCRIPT":
      case "SOURCE":
      case "STYLE":
      case "TRACK":
      case "WBR":
        return false;
    }
    return true;
  };
  m.removeNode = Dd;
  m.contains = function (a, b) {
    if (!a || !b) {
      return false;
    }
    if (a.contains && b.nodeType == 1) {
      return a == b || a.contains(b);
    }
    if (typeof a.compareDocumentPosition != "undefined") {
      return a == b || !!(a.compareDocumentPosition(b) & 16);
    }
    while (b && a != b) {
      b = b.parentNode;
    }
    return b == a;
  };
  var T = typeof AsyncContext !== "undefined" && typeof AsyncContext.Snapshot === "function" ? function (a) {
    return a && AsyncContext.Snapshot.wrap(a);
  } : function (a) {
    return a;
  };
  function Gd(a, b) {
    this.limit_ = 100;
    this.create_ = a;
    this.reset_ = b;
    this.occupants_ = 0;
    this.head_ = null;
  }
  Gd.prototype.get = function () {
    if (this.occupants_ > 0) {
      this.occupants_--;
      var a = this.head_;
      this.head_ = a.next;
      a.next = null;
    } else {
      a = this.create_();
    }
    return a;
  };
  Gd.prototype.put = function (a) {
    this.reset_(a);
    if (this.occupants_ < this.limit_) {
      this.occupants_++;
      a.next = this.head_;
      this.head_ = a;
    }
  };
  function Hd() {
    this.workTail_ = this.workHead_ = null;
  }
  Hd.prototype.add = function (a, b) {
    var c = Id.get();
    c.set(a, b);
    if (this.workTail_) {
      this.workTail_.next = c;
    } else {
      this.workHead_ = c;
    }
    this.workTail_ = c;
  };
  Hd.prototype.remove = function () {
    var a = null;
    if (this.workHead_) {
      a = this.workHead_;
      this.workHead_ = this.workHead_.next;
      if (!this.workHead_) {
        this.workTail_ = null;
      }
      a.next = null;
    }
    return a;
  };
  var Id = new Gd(function () {
    return new Jd();
  }, function (a) {
    return a.reset();
  });
  function Jd() {
    this.next = this.scope = this.fn = null;
  }
  Jd.prototype.set = function (a, b) {
    this.fn = a;
    this.scope = b;
    this.next = null;
  };
  Jd.prototype.reset = function () {
    this.next = this.scope = this.fn = null;
  };
  var Kd;
  var Ld = false;
  var Md = new Hd();
  function Od(a, b) {
    if (!Kd) {
      Nd();
    }
    if (!Ld) {
      Kd();
      Ld = true;
    }
    Md.add(a, b);
  }
  function Nd() {
    var a = Promise.resolve(undefined);
    Kd = function () {
      a.then(Pd);
    };
  }
  function Pd() {
    for (var a; a = Md.remove();) {
      try {
        a.fn.call(a.scope);
      } catch (b) {
        Ya(b);
      }
      Id.put(a);
    }
    Ld = false;
  }
  ;
  function Qd() {
    return true;
  }
  function Rd() {}
  function Sd(a) {
    if (!a) {
      return false;
    }
    try {
      return !!a.$goog_Thenable;
    } catch (b) {
      return false;
    }
  }
  function U(a) {
    this.state_ = 0;
    this.result_ = undefined;
    this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
    this.hadUnhandledRejection_ = this.executing_ = false;
    if (a != Rd) {
      try {
        var b = this;
        a.call(undefined, function (c) {
          Td(b, 2, c);
        }, function (c) {
          Td(b, 3, c);
        });
      } catch (c) {
        Td(this, 3, c);
      }
    }
  }
  function Ud() {
    this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = false;
  }
  Ud.prototype.reset = function () {
    this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = false;
  };
  var Vd = new Gd(function () {
    return new Ud();
  }, function (a) {
    a.reset();
  });
  function Wd(a, b, c) {
    var d = Vd.get();
    d.onFulfilled = a;
    d.onRejected = b;
    d.context = c;
    return d;
  }
  function Xd(a) {
    return new U(function (b, c) {
      c(a);
    });
  }
  function Zd() {
    var a;
    var b;
    var c = new U(function (d, e) {
      a = d;
      b = e;
    });
    return new Yd(c, a, b);
  }
  U.prototype.then = function (a, b, c) {
    return $d(this, T(typeof a === "function" ? a : null), T(typeof b === "function" ? b : null), c);
  };
  U.prototype.$goog_Thenable = true;
  function be(a, b, c, d) {
    ae(a, Wd(b || Rd, c || null, d));
  }
  U.prototype.finally = function (a) {
    var b = this;
    a = T(a);
    return new U(function (c, d) {
      be(b, function (e) {
        a();
        c(e);
      }, function (e) {
        a();
        d(e);
      });
    });
  };
  U.prototype.thenCatch = function (a, b) {
    return $d(this, null, T(a), b);
  };
  U.prototype.catch = U.prototype.thenCatch;
  U.prototype.cancel = function (a) {
    if (this.state_ == 0) {
      var b = new ce(a);
      Od(function () {
        de(this, b);
      }, this);
    }
  };
  function de(a, b) {
    if (a.state_ == 0) {
      if (a.parent_) {
        var c = a.parent_;
        if (c.callbackEntries_) {
          for (var d = 0, e = null, f = null, g = c.callbackEntries_; g && (g.always || (d++, g.child == a && (e = g), !e || !(d > 1))); g = g.next) {
            if (!e) {
              f = g;
            }
          }
          if (e) {
            if (c.state_ == 0 && d == 1) {
              de(c, b);
            } else {
              if (f) {
                d = f;
                if (d.next == c.callbackEntriesTail_) {
                  c.callbackEntriesTail_ = d;
                }
                d.next = d.next.next;
              } else {
                ee(c);
              }
              fe(c, e, 3, b);
            }
          }
        }
        a.parent_ = null;
      } else {
        Td(a, 3, b);
      }
    }
  }
  function ae(a, b) {
    if (!a.callbackEntries_ && (a.state_ == 2 || a.state_ == 3)) {
      ge(a);
    }
    if (a.callbackEntriesTail_) {
      a.callbackEntriesTail_.next = b;
    } else {
      a.callbackEntries_ = b;
    }
    a.callbackEntriesTail_ = b;
  }
  function $d(a, b, c, d) {
    var e = Wd(null, null, null);
    e.child = new U(function (f, g) {
      e.onFulfilled = b ? function (h) {
        try {
          var k = b.call(d, h);
          f(k);
        } catch (l) {
          g(l);
        }
      } : f;
      e.onRejected = c ? function (h) {
        try {
          var k = c.call(d, h);
          if (k === undefined && h instanceof ce) {
            g(h);
          } else {
            f(k);
          }
        } catch (l) {
          g(l);
        }
      } : g;
    });
    e.child.parent_ = a;
    ae(a, e);
    return e.child;
  }
  U.prototype.unblockAndFulfill_ = function (a) {
    this.state_ = 0;
    Td(this, 2, a);
  };
  U.prototype.unblockAndReject_ = function (a) {
    this.state_ = 0;
    Td(this, 3, a);
  };
  function Td(a, b, c) {
    if (a.state_ == 0) {
      if (a === c) {
        b = 3;
        c = new TypeError("Promise cannot resolve to itself");
      }
      a.state_ = 1;
      a: {
        var d = c;
        var e = a.unblockAndFulfill_;
        var f = a.unblockAndReject_;
        if (d instanceof U) {
          be(d, e, f, a);
          var g = true;
        } else if (Sd(d)) {
          d.then(e, f, a);
          g = true;
        } else {
          if (Ia(d)) {
            try {
              var h = d.then;
              if (typeof h === "function") {
                he(d, h, e, f, a);
                g = true;
                break a;
              }
            } catch (k) {
              f.call(a, k);
              g = true;
              break a;
            }
          }
          g = false;
        }
      }
      if (!g) {
        a.result_ = c;
        a.state_ = b;
        a.parent_ = null;
        ge(a);
        if (b == 3 && !(c instanceof ce)) {
          ie(a, c);
        }
      }
    }
  }
  function he(a, b, c, d, e) {
    var f = false;
    function g(k) {
      if (!f) {
        f = true;
        c.call(e, k);
      }
    }
    function h(k) {
      if (!f) {
        f = true;
        d.call(e, k);
      }
    }
    try {
      b.call(a, g, h);
    } catch (k) {
      h(k);
    }
  }
  function ge(a) {
    if (!a.executing_) {
      a.executing_ = true;
      Od(a.executeCallbacks_, a);
    }
  }
  function ee(a) {
    var b = null;
    if (a.callbackEntries_) {
      b = a.callbackEntries_;
      a.callbackEntries_ = b.next;
      b.next = null;
    }
    if (!a.callbackEntries_) {
      a.callbackEntriesTail_ = null;
    }
    return b;
  }
  U.prototype.executeCallbacks_ = function () {
    for (var a; a = ee(this);) {
      fe(this, a, this.state_, this.result_);
    }
    this.executing_ = false;
  };
  function fe(a, b, c, d) {
    if (c == 3 && b.onRejected && !b.always) {
      for (; a && a.hadUnhandledRejection_; a = a.parent_) {
        a.hadUnhandledRejection_ = false;
      }
    }
    if (b.child) {
      b.child.parent_ = null;
      je(b, c, d);
    } else {
      try {
        if (b.always) {
          b.onFulfilled.call(b.context);
        } else {
          je(b, c, d);
        }
      } catch (e) {
        ke.call(null, e);
      }
    }
    Vd.put(b);
  }
  function je(a, b, c) {
    if (b == 2) {
      a.onFulfilled.call(a.context, c);
    } else if (a.onRejected) {
      a.onRejected.call(a.context, c);
    }
  }
  function ie(a, b) {
    a.hadUnhandledRejection_ = true;
    Od(function () {
      if (a.hadUnhandledRejection_) {
        ke.call(null, b);
      }
    });
  }
  var ke = Ya;
  function ce(a) {
    B.call(this, a);
  }
  Na(ce, B);
  ce.prototype.name = "cancel";
  function Yd(a, b, c) {
    this.promise = a;
    this.resolve = b;
    this.reject = c;
  }
  /*
  Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: MIT
  */
  function V(a, b) {
    this.sequence_ = [];
    this.onCancelFunction_ = a;
    this.defaultScope_ = b || null;
    this.hadError_ = this.fired_ = false;
    this.result_ = undefined;
    this.silentlyCanceled_ = this.blocking_ = this.blocked_ = false;
    this.unhandledErrorId_ = 0;
    this.parent_ = null;
    this.branches_ = 0;
  }
  V.prototype.cancel = function (a) {
    if (this.fired_) {
      if (this.result_ instanceof V) {
        this.result_.cancel();
      }
    } else {
      if (this.parent_) {
        var b = this.parent_;
        delete this.parent_;
        if (a) {
          b.cancel(a);
        } else {
          b.branches_--;
          if (b.branches_ <= 0) {
            b.cancel();
          }
        }
      }
      if (this.onCancelFunction_) {
        this.onCancelFunction_.call(this.defaultScope_, this);
      } else {
        this.silentlyCanceled_ = true;
      }
      if (!this.fired_) {
        a = new le(this);
        me(this);
        ne(this, false, a);
      }
    }
  };
  V.prototype.continue_ = function (a, b) {
    this.blocked_ = false;
    ne(this, a, b);
  };
  function ne(a, b, c) {
    a.fired_ = true;
    a.result_ = c;
    a.hadError_ = !b;
    oe(a);
  }
  function me(a) {
    if (a.fired_) {
      if (!a.silentlyCanceled_) {
        throw new pe(a);
      }
      a.silentlyCanceled_ = false;
    }
  }
  V.prototype.callback = function (a) {
    me(this);
    ne(this, true, a);
  };
  V.prototype.addCallback = function (a, b) {
    return qe(this, a, null, b);
  };
  V.prototype.finally = function (a) {
    var b = this;
    return re(new Promise(function (c, d) {
      qe(b, function (e) {
        a();
        c(e);
      }, function (e) {
        a();
        d(e);
      });
    }));
  };
  function qe(a, b, c, d) {
    var e = a.fired_;
    if (!e) {
      if (b === c) {
        b = c = T(b);
      } else {
        b = T(b);
        c = T(c);
      }
    }
    a.sequence_.push([b, c, d]);
    if (e) {
      oe(a);
    }
    return a;
  }
  V.prototype.then = function (a, b, c) {
    var d;
    var e;
    var f = new U(function (g, h) {
      e = g;
      d = h;
    });
    qe(this, e, function (g) {
      if (g instanceof le) {
        f.cancel();
      } else {
        d(g);
      }
      return se;
    }, this);
    return f.then(a, b, c);
  };
  V.prototype.$goog_Thenable = true;
  function te(a) {
    return fb(a.sequence_, function (b) {
      return typeof b[1] === "function";
    });
  }
  var se = {};
  function oe(a) {
    if (a.unhandledErrorId_ && a.fired_ && te(a)) {
      var b = a.unhandledErrorId_;
      var c = ue[b];
      if (c) {
        z.clearTimeout(c.id_);
        delete ue[b];
      }
      a.unhandledErrorId_ = 0;
    }
    if (a.parent_) {
      a.parent_.branches_--;
      delete a.parent_;
    }
    b = a.result_;
    var d = c = false;
    for (; a.sequence_.length && !a.blocked_;) {
      var e = a.sequence_.shift();
      var f = e[0];
      var g = e[1];
      e = e[2];
      if (f = a.hadError_ ? g : f) {
        try {
          var h = f.call(e || a.defaultScope_, b);
          if (h === se) {
            h = undefined;
          }
          if (h !== undefined) {
            a.hadError_ = a.hadError_ && (h == b || h instanceof Error);
            a.result_ = b = h;
          }
          if (Sd(b) || typeof z.Promise === "function" && b instanceof z.Promise) {
            d = true;
            a.blocked_ = true;
          }
        } catch (k) {
          b = k;
          a.hadError_ = true;
          if (!te(a)) {
            c = true;
          }
        }
      }
    }
    a.result_ = b;
    if (d) {
      h = La(a.continue_, a, true);
      d = La(a.continue_, a, false);
      if (b instanceof V) {
        qe(b, h, d);
        b.blocking_ = true;
      } else {
        b.then(h, d);
      }
    }
    if (c) {
      b = new ve(b);
      ue[b.id_] = b;
      a.unhandledErrorId_ = b.id_;
    }
  }
  function re(a) {
    var b = new V();
    a.then(function (c) {
      b.callback(c);
    }, function (c) {
      me(b);
      ne(b, false, c);
    });
    return b;
  }
  function pe() {
    B.call(this);
  }
  Na(pe, B);
  pe.prototype.message = "Deferred has already fired";
  pe.prototype.name = "AlreadyCalledError";
  function le() {
    B.call(this);
  }
  Na(le, B);
  le.prototype.message = "Deferred was canceled";
  le.prototype.name = "CanceledError";
  function ve(a) {
    this.id_ = z.setTimeout(La(this.throwError, this), 0);
    this.error_ = a;
  }
  ve.prototype.throwError = function () {
    delete ue[this.id_];
    throw this.error_;
  };
  var ue = {};
  function Ae() {
    var a = Sa("https://apis.google.com/js/client.js");
    var b = {};
    var c = b.document || document;
    var d = Ta(a).toString();
    var e = new wd(c).createElement("SCRIPT");
    var f = {
      script_: e,
      timeout_: undefined
    };
    var g = new V(we, f);
    var h = null;
    var k = b.timeout ?? 5000;
    if (k > 0) {
      h = window.setTimeout(function () {
        xe(e, true);
        var l = new ye(1, "Timeout reached for loading script " + d);
        me(g);
        ne(g, false, l);
      }, k);
      f.timeout_ = h;
    }
    e.onload = e.onreadystatechange = function () {
      if (!e.readyState || e.readyState == "loaded" || e.readyState == "complete") {
        xe(e, b.cleanupWhenDone || false, h);
        g.callback(null);
      }
    };
    e.onerror = function () {
      xe(e, true, h);
      var l = new ye(0, "Error while loading script " + d);
      me(g);
      ne(g, false, l);
    };
    f = b.attributes || {};
    hd(f, {
      type: "text/javascript",
      charset: "UTF-8"
    });
    Ad(e, f);
    ud(e, a);
    ze(c).appendChild(e);
    return g;
  }
  function ze(a) {
    var b;
    if ((b = (a || document).getElementsByTagName("HEAD")) && b.length !== 0) {
      return b[0];
    } else {
      return a.documentElement;
    }
  }
  function we() {
    if (this && this.script_) {
      var a = this.script_;
      if (a && a.tagName == "SCRIPT") {
        xe(a, true, this.timeout_);
      }
    }
  }
  function xe(a, b, c) {
    if (c != null) {
      z.clearTimeout(c);
    }
    a.onload = function () {};
    a.onerror = function () {};
    a.onreadystatechange = function () {};
    if (b) {
      window.setTimeout(function () {
        Dd(a);
      }, 0);
    }
  }
  function ye(a, b) {
    var c = "Jsloader error (code #" + a + ")";
    if (b) {
      c += ": " + b;
    }
    B.call(this, c);
    this.code = a;
  }
  Na(ye, B);
  function Be(a) {
    var b = a.serverUrl;
    var c = a.apiKey;
    a = a.authUser === undefined ? 0 : a.authUser;
    this.serverUrl_ = b;
    this.apiKey_ = c;
    this.authUser_ = a;
  }
  Be.prototype.get = function (a, b) {
    return Ce(this, "GET", a, null, b);
  };
  function Ce(a, b, c, d, e) {
    var f;
    var g;
    var h;
    var k;
    var l;
    return ya(function (n) {
      if (n.nextAddress == 1) {
        return ra(n, De(), 2);
      }
      f = A("gapi.client");
      g = A("gapi.config");
      h = Ee();
      k = f.getToken();
      f.setToken(null);
      g.update("googleapis.config/auth/useFirstPartyAuth", true);
      g.update("googleapis.config/auth/useFirstPartyAuthV2", true);
      g.update("client/xd4", false);
      g.update("client/cors", false);
      g.update("client/apiKey", a.apiKey_);
      l = f.request({
        root: a.serverUrl_,
        path: c,
        method: b,
        body: d ? JSON.stringify(Gc(d)) : undefined,
        headers: {
          "Content-Type": "application/json+protobuf",
          "X-Goog-Api-Key": a.apiKey_,
          "X-Goog-AuthUser": a.authUser_
        }
      }).then(function (q) {
        try {
          return dd(e, q.body);
        } catch (r) {}
      });
      Fe(h);
      f.setToken(k);
      return n.return(l);
    });
  }
  function Ee() {
    var a = A("gapi.config");
    var b = {};
    b["googleapis.config/auth/useFirstPartyAuth"] = a.get("googleapis.config/auth/useFirstPartyAuth");
    b["googleapis.config/auth/useFirstPartyAuthV2"] = a.get("googleapis.config/auth/useFirstPartyAuthV2");
    b["client/xd4"] = a.get("client/xd4");
    b["client/cors"] = a.get("client/cors");
    b["client/apiKey"] = a.get("client/apiKey");
    return b;
  }
  function Fe(a) {
    var b = A("gapi.config");
    for (var c = w(Object.keys(a)), d = c.next(); !d.done; d = c.next()) {
      d = d.value;
      b.update(d, a[d]);
    }
  }
  function De() {
    if (A("gapi.load")) {
      return Ge();
    } else {
      return Ae().then(function () {
        return Ge();
      }, function (a) {
        return Xd("Failed initializing gapi.\nGapi error: " + a);
      });
    }
  }
  function Ge() {
    var a = Zd();
    var b = A("gapi.client");
    if (b) {
      a.resolve(b);
    } else {
      try {
        A("gapi.load")("client", {
          callback: function () {
            a.resolve(A("gapi.client"));
          }
        });
      } catch (c) {
        a.reject("Failed loading gapi library: client");
      }
    }
    return a.promise;
  }
  function W(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(W, Q);
  W.prototype.getSeconds = function () {
    var a = a === undefined ? Qc : a;
    var b = Tc(this, 1);
    var c = typeof b;
    b = b == null ? b : c === "bigint" ? F(fc(64, b)) : mc(b) ? c === "string" ? tc(b) : uc(b) : undefined;
    return b ?? a;
  };
  W.prototype.setSeconds = function (a) {
    a = a == null ? a : qc(a);
    return K(this, 1, a, "0");
  };
  function He() {
    var a = new W().setSeconds(new Date().getTimezoneOffset() * -60);
    return K(a, 2, pc(0), 0);
  }
  function Ie(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Ie, Q);
  Ie.prototype.getTimezoneOffset = function () {
    return L(this, W, 3);
  };
  Ie.prototype.setTimezoneOffset = function (a) {
    return M(this, W, 3, a);
  };
  function Je(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Je, Q);
  Je.prototype.setPlatform = function (a) {
    return K(this, 1, a == null ? a : nc(a), 0);
  };
  Je.prototype.setSupportedCapabilityList = function (a) {
    return Zc(this, 3, a, nc);
  };
  Je.prototype.setLibraryVersionInt = function (a) {
    return K(this, 4, a == null ? a : pc(a), 0);
  };
  function Ke(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Ke, Q);
  Ke.prototype.setDeviceInfo = function (a) {
    return M(this, Ie, 1, a);
  };
  Ke.prototype.setLibraryInfo = function (a) {
    return M(this, Je, 2, a);
  };
  function Le(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Le, Q);
  Le.prototype.getAllowedCompletionStyleList = function () {
    return cd(this);
  };
  function Me(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Me, Q);
  function Ne(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Ne, Q);
  Ne.prototype.getPromptDelay = function () {
    return L(this, Me, 1);
  };
  Ne.prototype.getAllowedPromptStyleList = function () {
    return cd(this);
  };
  function Oe(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Oe, Q);
  Oe.prototype.getLanguage = function () {
    return ad(this, 8);
  };
  Oe.prototype.getCompletion = function () {
    return L(this, Le, 2);
  };
  Oe.prototype.getDisplaySettings = function () {
    return L(this, Ne, 3);
  };
  function Pe(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Pe, Q);
  Pe.prototype.setIsScheduledSurvey = function (a) {
    return P(this, 1, a);
  };
  function Qe(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Qe, Q);
  function Re(a) {
    return ad(a, 1);
  }
  function Se(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Se, Q);
  m = Se.prototype;
  m.setTriggerId = function (a) {
    return K(this, 1, I(a), "");
  };
  m.setLanguageList = function (a) {
    return Zc(this, 2, a, xc);
  };
  m.getLanguage = function () {
    return bd(this, 2);
  };
  m.setTestingMode = function (a) {
    return P(this, 3, a);
  };
  m.getSurveyId = function () {
    return ad(this, 4);
  };
  m.setSurveyId = function (a) {
    Vc(this, 4, I(a));
  };
  function Te(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Te, Q);
  Te.prototype.setTriggerContext = function (a) {
    return M(this, Se, 1, a);
  };
  Te.prototype.setClientContext = function (a) {
    return M(this, Ke, 2, a);
  };
  Te.prototype.setScheduledSurveyContext = function (a) {
    M(this, Pe, 3, a);
  };
  function Ue(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Ue, Q);
  m = Ue.prototype;
  m.getSession = function () {
    return L(this, Qe, 1);
  };
  m.getSurveyPayload = function () {
    return L(this, Oe, 2);
  };
  m.getError = function (a) {
    return bd(this, 4, a);
  };
  m.getSurveyId = function () {
    return ad(this, 5);
  };
  m.setSurveyId = function (a) {
    K(this, 5, I(a), "");
  };
  function Ve() {
    this.actions_ = {};
  }
  Ve.prototype.register = function (a, b, c) {
    this.actions_[a] = {
      callback: b,
      isApplicable: c || Qd
    };
  };
  Ve.prototype.execute = function (a, b) {
    if ((a = this.actions_[a]) && a.isApplicable()) {
      a.callback.apply(null, b || []);
    }
  };
  Ve.prototype.isApplicable = function (a) {
    a = this.actions_[a];
    return !!a && a.isApplicable();
  };
  Ve.prototype.register = Ve.prototype.register;
  function We(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(We, Q);
  function Xe(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Xe, Q);
  Xe.prototype.setDirection = function (a) {
    return K(this, 8, I(a), "");
  };
  var Ye = function (a) {
    return function (b) {
      return dd(a, b);
    };
  }(Xe);
  function Ze(a) {
    if (!a) {
      return null;
    }
    a = yc(Tc(a, 4, undefined, Rc));
    if (a === null || a === undefined) {
      return null;
    } else {
      return Sa(a);
    }
  }
  ;
  var $e = x([""]);
  var af = x(["https://www.google.com/tools/feedback/help_panel_binary.js"]);
  function bf(a, b, c, d) {
    var e = a.helpCenterPath.startsWith("/") ? a.helpCenterPath.substring(1) : a.helpCenterPath;
    var f = c.document;
    var g = a.nonce;
    var h = Ye(b);
    h = L(h, We, 10) ? Ze(L(h, We, 10)) || S($e) : S(af);
    var k = yd(f).createElement("SCRIPT");
    if (g) {
      k.setAttribute("nonce", g);
    }
    k.onload = function () {
      c.startHelpCard({
        apiKey: "",
        context: a.helpCenterContext,
        directToGetHelp: false,
        enableSendFeedback: false,
        helpApiData: {
          helpApiConfig: a,
          productWindow: c
        },
        helpcenter: e,
        helpPanelStartTimeMs: a.helpPanelStartTimeMs,
        helpPanelTheme: a.helpPanelTheme,
        locale: a.locale,
        nd4cSettingsIsEnabled: false,
        onOpenHelpPanelCallback: d,
        serverData: b
      });
    };
    ud(k, h);
    f.body.appendChild(k);
  }
  ;
  var cf = x(["https://www.google.com/tools/feedback/"]);
  var df = x(["http://localhost.corp.google.com/inapp/"]);
  var ef = x(["http://localhost.proxy.googlers.com/inapp/"]);
  var ff = x(["https://asx-frontend-autopush.corp.google.com/inapp/"]);
  var gf = x(["https://asx-frontend-autopush.corp.google.com/tools/feedback/"]);
  var hf = x(["https://asx-frontend-autopush.corp.google.co.uk/inapp/"]);
  var jf = x(["https://asx-frontend-autopush.corp.google.co.uk/tools/feedback/"]);
  var kf = x(["https://asx-frontend-autopush.corp.google.de/inapp/"]);
  var lf = x(["https://asx-frontend-autopush.corp.google.de/tools/feedback/"]);
  var mf = x(["https://asx-frontend-autopush.corp.youtube.com/tools/feedback/"]);
  var nf = x(["https://asx-frontend-autopush.corp.youtube.com/inapp/"]);
  var of = x(["https://asx-help-frontend-autopush.corp.youtube.com/tools/feedback/"]);
  var pf = x(["https://asx-help-frontend-autopush.corp.youtube.com/inapp/"]);
  var qf = x(["https://asx-frontend-staging.corp.google.com/inapp/"]);
  var rf = x(["https://asx-frontend-staging.corp.google.com/tools/feedback/"]);
  var sf = x(["https://support.google.com/inapp/"]);
  var tf = x(["https://sandbox.google.com/inapp/"]);
  var uf = x(["https://sandbox.google.com/tools/feedback/"]);
  var vf = x(["https://www.google.cn/tools/feedback/"]);
  var wf = x(["https://help.youtube.com/tools/feedback/"]);
  var xf = x(["https://asx-frontend-staging.corp.google.com/inapp/"]);
  var yf = x(["https://asx-frontend-staging.corp.google.com/tools/feedback/"]);
  var zf = x(["https://localhost.corp.google.com/inapp/"]);
  var Af = x(["https://localhost.proxy.googlers.com/inapp/"]);
  var Bf = S(cf);
  var Cf = [S(df), S(ef)];
  var Df = [S(ff), S(gf), S(hf), S(jf), S(kf), S(lf), S(mf), S(nf), S(of), S(pf)];
  var Ef = [S(qf), S(rf)];
  var Ff = [Bf, S(sf), S(tf), S(uf), S(vf), S(wf), S(xf), S(yf), S(zf), S(Af)];
  la(Cf);
  la(Df);
  la(Ef);
  la(Ff);
  function Gf() {
    this.disposed_ = this.disposed_;
    this.onDisposeCallbacks_ = this.onDisposeCallbacks_;
  }
  Gf.prototype.disposed_ = false;
  Gf.prototype.isDisposed = function () {
    return this.disposed_;
  };
  Gf.prototype.dispose = function () {
    if (!this.disposed_) {
      this.disposed_ = true;
      this.disposeInternal();
    }
  };
  Gf.prototype[Symbol.dispose] = function () {
    this.dispose();
  };
  Gf.prototype.disposeInternal = function () {
    if (this.onDisposeCallbacks_) {
      while (this.onDisposeCallbacks_.length) {
        this.onDisposeCallbacks_.shift()();
      }
    }
  };
  function Hf(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.propagationStopped_ = false;
  }
  Hf.prototype.stopPropagation = function () {
    this.propagationStopped_ = true;
  };
  Hf.prototype.preventDefault = function () {
    this.defaultPrevented = true;
  };
  var If = function () {
    if (!z.addEventListener || !Object.defineProperty) {
      return false;
    }
    var a = false;
    var b = Object.defineProperty({}, "passive", {
      get: function () {
        a = true;
      }
    });
    try {
      function c() {}
      z.addEventListener("test", c, b);
      z.removeEventListener("test", c, b);
    } catch (d) {}
    return a;
  }();
  function Jf(a, b) {
    Hf.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.timeStamp = 0;
    this.event_ = null;
    if (a) {
      this.init(a, b);
    }
  }
  Na(Jf, Hf);
  Jf.prototype.init = function (a, b) {
    var c = this.type = a.type;
    var d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    b = a.relatedTarget;
    if (!b) {
      if (c == "mouseover") {
        b = a.fromElement;
      } else if (c == "mouseout") {
        b = a.toElement;
      }
    }
    this.relatedTarget = b;
    if (d) {
      this.clientX = d.clientX !== undefined ? d.clientX : d.pageX;
      this.clientY = d.clientY !== undefined ? d.clientY : d.pageY;
      this.screenX = d.screenX || 0;
      this.screenY = d.screenY || 0;
    } else {
      this.offsetX = ib || a.offsetX !== undefined ? a.offsetX : a.layerX;
      this.offsetY = ib || a.offsetY !== undefined ? a.offsetY : a.layerY;
      this.clientX = a.clientX !== undefined ? a.clientX : a.pageX;
      this.clientY = a.clientY !== undefined ? a.clientY : a.pageY;
      this.screenX = a.screenX || 0;
      this.screenY = a.screenY || 0;
    }
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || (c == "keypress" ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = a.pointerType;
    this.state = a.state;
    this.timeStamp = a.timeStamp;
    this.event_ = a;
    if (a.defaultPrevented) {
      Jf.superClass_.preventDefault.call(this);
    }
  };
  Jf.prototype.stopPropagation = function () {
    Jf.superClass_.stopPropagation.call(this);
    if (this.event_.stopPropagation) {
      this.event_.stopPropagation();
    } else {
      this.event_.cancelBubble = true;
    }
  };
  Jf.prototype.preventDefault = function () {
    Jf.superClass_.preventDefault.call(this);
    var a = this.event_;
    if (a.preventDefault) {
      a.preventDefault();
    } else {
      a.returnValue = false;
    }
  };
  var Of = "closure_listenable_" + (Math.random() * 1000000 | 0);
  var Pf = 0;
  function Qf(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.handler = e;
    this.key = ++Pf;
    this.removed = this.callOnce = false;
  }
  function Rf(a) {
    a.removed = true;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.handler = null;
  }
  function Sf(a) {
    this.src = a;
    this.listeners = {};
    this.typeCount_ = 0;
  }
  Sf.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.listeners[f];
    if (!a) {
      a = this.listeners[f] = [];
      this.typeCount_++;
    }
    var g = Tf(a, b, d, e);
    if (g > -1) {
      b = a[g];
      if (!c) {
        b.callOnce = false;
      }
    } else {
      b = new Qf(b, this.src, f, !!d, e);
      b.callOnce = c;
      a.push(b);
    }
    return b;
  };
  Sf.prototype.remove = function (a, b, c, d) {
    a = a.toString();
    if (!(a in this.listeners)) {
      return false;
    }
    var e = this.listeners[a];
    b = Tf(e, b, c, d);
    if (b > -1) {
      Rf(e[b]);
      Array.prototype.splice.call(e, b, 1);
      if (e.length == 0) {
        delete this.listeners[a];
        this.typeCount_--;
      }
      return true;
    } else {
      return false;
    }
  };
  function Uf(a, b) {
    var c = b.type;
    if (c in a.listeners && gb(a.listeners[c], b)) {
      Rf(b);
      if (a.listeners[c].length == 0) {
        delete a.listeners[c];
        a.typeCount_--;
      }
    }
  }
  Sf.prototype.getListener = function (a, b, c, d) {
    a = this.listeners[a.toString()];
    var e = -1;
    if (a) {
      e = Tf(a, b, c, d);
    }
    if (e > -1) {
      return a[e];
    } else {
      return null;
    }
  };
  Sf.prototype.hasListener = function (a, b) {
    var c = a !== undefined;
    var d = c ? a.toString() : "";
    var e = b !== undefined;
    return fd(this.listeners, function (f) {
      for (var g = 0; g < f.length; ++g) {
        if ((!c || f[g].type == d) && (!e || f[g].capture == b)) {
          return true;
        }
      }
      return false;
    });
  };
  function Tf(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d) {
        return e;
      }
    }
    return -1;
  }
  var Vf = "closure_lm_" + (Math.random() * 1000000 | 0);
  var Wf = {};
  var Xf = 0;
  function Zf(a, b, c, d, e) {
    if (d && d.once) {
      Yf(a, b, c, d, e);
    } else if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) {
        Zf(a, b[f], c, d, e);
      }
    } else {
      c = $f(c);
      if (a && a[Of]) {
        a.listen(b, c, Ia(d) ? !!d.capture : !!d, e);
      } else {
        ag(a, b, c, false, d, e);
      }
    }
  }
  function ag(a, b, c, d, e, f) {
    if (!b) {
      throw Error("Invalid event type");
    }
    var g = Ia(e) ? !!e.capture : !!e;
    var h = bg(a);
    if (!h) {
      a[Vf] = h = new Sf(a);
    }
    c = h.add(b, c, d, g, f);
    if (!c.proxy) {
      d = cg();
      c.proxy = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener) {
        if (!If) {
          e = g;
        }
        if (e === undefined) {
          e = false;
        }
        a.addEventListener(b.toString(), d, e);
      } else if (a.attachEvent) {
        a.attachEvent(dg(b.toString()), d);
      } else if (a.addListener && a.removeListener) {
        a.addListener(d);
      } else {
        throw Error("addEventListener and attachEvent are unavailable.");
      }
      Xf++;
    }
  }
  function cg() {
    var a = eg;
    function b(c) {
      return a.call(b.src, b.listener, c);
    }
    return b;
  }
  function Yf(a, b, c, d, e) {
    if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) {
        Yf(a, b[f], c, d, e);
      }
    } else {
      c = $f(c);
      if (a && a[Of]) {
        a.eventTargetListeners_.add(String(b), c, true, Ia(d) ? !!d.capture : !!d, e);
      } else {
        ag(a, b, c, true, d, e);
      }
    }
  }
  function fg(a, b, c, d, e) {
    if (Array.isArray(b)) {
      for (var f = 0; f < b.length; f++) {
        fg(a, b[f], c, d, e);
      }
    } else {
      d = Ia(d) ? !!d.capture : !!d;
      c = $f(c);
      if (a && a[Of]) {
        a.eventTargetListeners_.remove(String(b), c, d, e);
      } else if ((a &&= bg(a)) && (b = a.getListener(b, c, d, e))) {
        gg(b);
      }
    }
  }
  function gg(a) {
    if (typeof a !== "number" && a && !a.removed) {
      var b = a.src;
      if (b && b[Of]) {
        Uf(b.eventTargetListeners_, a);
      } else {
        var c = a.type;
        var d = a.proxy;
        if (b.removeEventListener) {
          b.removeEventListener(c, d, a.capture);
        } else if (b.detachEvent) {
          b.detachEvent(dg(c), d);
        } else if (b.addListener && b.removeListener) {
          b.removeListener(d);
        }
        Xf--;
        if (c = bg(b)) {
          Uf(c, a);
          if (c.typeCount_ == 0) {
            c.src = null;
            b[Vf] = null;
          }
        } else {
          Rf(a);
        }
      }
    }
  }
  function dg(a) {
    if (a in Wf) {
      return Wf[a];
    } else {
      return Wf[a] = "on" + a;
    }
  }
  function eg(a, b) {
    if (a.removed) {
      a = true;
    } else {
      b = new Jf(b, this);
      var c = a.listener;
      var d = a.handler || a.src;
      if (a.callOnce) {
        gg(a);
      }
      a = c.call(d, b);
    }
    return a;
  }
  function bg(a) {
    a = a[Vf];
    if (a instanceof Sf) {
      return a;
    } else {
      return null;
    }
  }
  var hg = "__closure_events_fn_" + (Math.random() * 1000000000 >>> 0);
  function $f(a) {
    if (typeof a === "function") {
      return a;
    }
    a[hg] ||= function (b) {
      return a.handleEvent(b);
    };
    return a[hg];
  }
  function ig() {
    Gf.call(this);
    this.eventTargetListeners_ = new Sf(this);
    this.actualEventTarget_ = this;
    this.parentEventTarget_ = null;
  }
  Na(ig, Gf);
  ig.prototype[Of] = true;
  m = ig.prototype;
  m.addEventListener = function (a, b, c, d) {
    Zf(this, a, b, c, d);
  };
  m.removeEventListener = function (a, b, c, d) {
    fg(this, a, b, c, d);
  };
  m.dispatchEvent = function (a) {
    var b = this.parentEventTarget_;
    if (b) {
      var c = [];
      var d = 1;
      for (; b; b = b.parentEventTarget_) {
        c.push(b);
        ++d;
      }
    }
    b = this.actualEventTarget_;
    d = a.type || a;
    if (typeof a === "string") {
      a = new Hf(a, b);
    } else if (a instanceof Hf) {
      a.target = a.target || b;
    } else {
      var e = a;
      a = new Hf(d, b);
      hd(a, e);
    }
    e = true;
    var f;
    if (c) {
      for (f = c.length - 1; !a.propagationStopped_ && f >= 0; f--) {
        var g = a.currentTarget = c[f];
        e = jg(g, d, true, a) && e;
      }
    }
    if (!a.propagationStopped_) {
      g = a.currentTarget = b;
      e = jg(g, d, true, a) && e;
      if (!a.propagationStopped_) {
        e = jg(g, d, false, a) && e;
      }
    }
    if (c) {
      for (f = 0; !a.propagationStopped_ && f < c.length; f++) {
        g = a.currentTarget = c[f];
        e = jg(g, d, false, a) && e;
      }
    }
    return e;
  };
  m.disposeInternal = function () {
    ig.superClass_.disposeInternal.call(this);
    if (this.eventTargetListeners_) {
      var a = this.eventTargetListeners_;
      var b = 0;
      var c;
      for (c in a.listeners) {
        for (var d = a.listeners[c], e = 0; e < d.length; e++) {
          ++b;
          Rf(d[e]);
        }
        delete a.listeners[c];
        a.typeCount_--;
      }
    }
    this.parentEventTarget_ = null;
  };
  m.listen = function (a, b, c, d) {
    return this.eventTargetListeners_.add(String(a), b, false, c, d);
  };
  function jg(a, b, c, d) {
    b = a.eventTargetListeners_.listeners[String(b)];
    if (!b) {
      return true;
    }
    b = b.concat();
    var e = true;
    for (var f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.removed && g.capture == c) {
        var h = g.listener;
        var k = g.handler || g.src;
        if (g.callOnce) {
          Uf(a.eventTargetListeners_, g);
        }
        e = h.call(k, d) !== false && e;
      }
    }
    return e && !d.defaultPrevented;
  }
  ig.prototype.getListener = function (a, b, c, d) {
    return this.eventTargetListeners_.getListener(String(a), b, c, d);
  };
  ig.prototype.hasListener = function (a, b) {
    return this.eventTargetListeners_.hasListener(a !== undefined ? String(a) : undefined, b);
  };
  function kg(a) {
    try {
      return z.JSON.parse(a);
    } catch (b) {}
    a = String(a);
    if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
      try {
        return eval("(" + a + ")");
      } catch (b) {}
    }
    throw Error("Invalid JSON string: " + a);
  }
  var lg = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
  function mg(a, b) {
    if (a) {
      a = a.split("&");
      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("=");
        var e = null;
        if (d >= 0) {
          var f = a[c].substring(0, d);
          e = a[c].substring(d + 1);
        } else {
          f = a[c];
        }
        b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
      }
    }
  }
  function X() {
    ig.call(this);
    this.headers = new Map();
    this.active_ = false;
    this.xhr_ = null;
    this.lastUri_ = "";
    this.inAbort_ = this.inOpen_ = this.inSend_ = this.errorDispatched_ = false;
    this.timeoutInterval_ = 0;
    this.timeoutId_ = null;
    this.responseType_ = "";
    this.progressEventsEnabled_ = this.withCredentials_ = false;
    this.attributionReportingOptions_ = this.trustToken_ = null;
  }
  Na(X, ig);
  var ng = /^https?$/i;
  var og = ["POST", "PUT"];
  var pg = [];
  function qg(a, b, c, d, e, f) {
    var g = new X();
    pg.push(g);
    if (b) {
      g.listen("complete", b);
    }
    g.eventTargetListeners_.add("ready", g.cleanupSend_, true, undefined, undefined);
    if (f) {
      g.timeoutInterval_ = Math.max(0, f);
    }
    g.withCredentials_ = true;
    g.send(a, c, d, e);
  }
  m = X.prototype;
  m.cleanupSend_ = function () {
    this.dispose();
    gb(pg, this);
  };
  m.setTrustToken = function (a) {
    this.trustToken_ = a;
  };
  m.setAttributionReporting = function (a) {
    this.attributionReportingOptions_ = a;
  };
  m.send = function (a, b, c, d) {
    if (this.xhr_) {
      throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + a);
    }
    b = b ? b.toUpperCase() : "GET";
    this.lastUri_ = a;
    this.errorDispatched_ = false;
    this.active_ = true;
    this.xhr_ = new XMLHttpRequest();
    this.xhr_.onreadystatechange = T(La(this.onReadyStateChange_, this));
    if (this.progressEventsEnabled_ && "onprogress" in this.xhr_) {
      this.xhr_.onprogress = T(La(function (g) {
        this.onProgressHandler_(g, true);
      }, this));
      if (this.xhr_.upload) {
        this.xhr_.upload.onprogress = T(La(this.onProgressHandler_, this));
      }
    }
    try {
      this.inOpen_ = true;
      this.xhr_.open(b, String(a), true);
      this.inOpen_ = false;
    } catch (g) {
      this.error_(5, g);
      return;
    }
    a = c || "";
    c = new Map(this.headers);
    if (d) {
      if (Object.getPrototypeOf(d) === Object.prototype) {
        for (var e in d) {
          c.set(e, d[e]);
        }
      } else if (typeof d.keys === "function" && typeof d.get === "function") {
        e = w(d.keys());
        for (var f = e.next(); !f.done; f = e.next()) {
          f = f.value;
          c.set(f, d.get(f));
        }
      } else {
        throw Error("Unknown input type for opt_headers: " + String(d));
      }
    }
    d = Array.from(c.keys()).find(function (g) {
      return g.toLowerCase() == "content-type";
    });
    e = z.FormData && a instanceof z.FormData;
    if (!!(db(og, b) >= 0) && !d && !e) {
      c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    }
    b = w(c);
    for (d = b.next(); !d.done; d = b.next()) {
      c = w(d.value);
      d = c.next().value;
      c = c.next().value;
      this.xhr_.setRequestHeader(d, c);
    }
    if (this.responseType_) {
      this.xhr_.responseType = this.responseType_;
    }
    if ("withCredentials" in this.xhr_ && this.xhr_.withCredentials !== this.withCredentials_) {
      this.xhr_.withCredentials = this.withCredentials_;
    }
    if ("setTrustToken" in this.xhr_ && this.trustToken_) {
      try {
        this.xhr_.setTrustToken(this.trustToken_);
      } catch (g) {}
    }
    if ("setAttributionReporting" in this.xhr_ && this.attributionReportingOptions_) {
      try {
        this.xhr_.setAttributionReporting(this.attributionReportingOptions_);
      } catch (g) {}
    }
    try {
      if (this.timeoutId_) {
        clearTimeout(this.timeoutId_);
        this.timeoutId_ = null;
      }
      if (this.timeoutInterval_ > 0) {
        this.timeoutId_ = setTimeout(this.timeout_.bind(this), this.timeoutInterval_);
      }
      this.inSend_ = true;
      this.xhr_.send(a);
      this.inSend_ = false;
    } catch (g) {
      this.error_(5, g);
    }
  };
  m.timeout_ = function () {
    if (typeof Da != "undefined" && this.xhr_) {
      this.dispatchEvent("timeout");
      this.abort(8);
    }
  };
  m.error_ = function () {
    this.active_ = false;
    if (this.xhr_) {
      this.inAbort_ = true;
      this.xhr_.abort();
      this.inAbort_ = false;
    }
    rg(this);
    sg(this);
  };
  function rg(a) {
    if (!a.errorDispatched_) {
      a.errorDispatched_ = true;
      a.dispatchEvent("complete");
      a.dispatchEvent("error");
    }
  }
  X.prototype.abort = function () {
    if (this.xhr_ && this.active_) {
      this.active_ = false;
      this.inAbort_ = true;
      this.xhr_.abort();
      this.inAbort_ = false;
      this.dispatchEvent("complete");
      this.dispatchEvent("abort");
      sg(this);
    }
  };
  X.prototype.disposeInternal = function () {
    if (this.xhr_) {
      if (this.active_) {
        this.active_ = false;
        this.inAbort_ = true;
        this.xhr_.abort();
        this.inAbort_ = false;
      }
      sg(this, true);
    }
    X.superClass_.disposeInternal.call(this);
  };
  X.prototype.onReadyStateChange_ = function () {
    if (!this.isDisposed()) {
      if (this.inOpen_ || this.inSend_ || this.inAbort_) {
        tg(this);
      } else {
        this.onReadyStateChangeEntryPoint_();
      }
    }
  };
  X.prototype.onReadyStateChangeEntryPoint_ = function () {
    tg(this);
  };
  function tg(a) {
    if (a.active_ && typeof Da != "undefined") {
      if (a.inSend_ && ug(a) == 4) {
        setTimeout(a.onReadyStateChange_.bind(a), 0);
      } else {
        a.dispatchEvent("readystatechange");
        if (ug(a) == 4) {
          a.active_ = false;
          try {
            try {
              var b = ug(a) > 2 ? a.xhr_.status : -1;
            } catch (g) {
              b = -1;
            }
            a: switch (b) {
              case 200:
              case 201:
              case 202:
              case 204:
              case 206:
              case 304:
              case 1223:
                var c = true;
                break a;
              default:
                c = false;
            }
            var d;
            if (!(d = c)) {
              var e;
              if (e = b === 0) {
                var f = String(a.lastUri_).match(lg)[1] || null;
                if (!f && z.self && z.self.location) {
                  f = z.self.location.protocol.slice(0, -1);
                }
                e = !ng.test(f ? f.toLowerCase() : "");
              }
              d = e;
            }
            if (d) {
              a.dispatchEvent("complete");
              a.dispatchEvent("success");
            } else {
              rg(a);
            }
          } finally {
            sg(a);
          }
        }
      }
    }
  }
  X.prototype.onProgressHandler_ = function (a, b) {
    this.dispatchEvent(vg(a, "progress"));
    this.dispatchEvent(vg(a, b ? "downloadprogress" : "uploadprogress"));
  };
  function vg(a, b) {
    return {
      type: b,
      lengthComputable: a.lengthComputable,
      loaded: a.loaded,
      total: a.total
    };
  }
  function sg(a, b) {
    if (a.xhr_) {
      if (a.timeoutId_) {
        clearTimeout(a.timeoutId_);
        a.timeoutId_ = null;
      }
      var c = a.xhr_;
      a.xhr_ = null;
      if (!b) {
        a.dispatchEvent("ready");
      }
      try {
        c.onreadystatechange = null;
      } catch (d) {}
    }
  }
  X.prototype.isActive = function () {
    return !!this.xhr_;
  };
  function ug(a) {
    if (a.xhr_) {
      return a.xhr_.readyState;
    } else {
      return 0;
    }
  }
  function wg(a) {
    if (a.xhr_) {
      a = a.xhr_.responseText;
      if (a.indexOf(")]}'\n") == 0) {
        a = a.substring(5);
      }
      a: {
        if (z.JSON) {
          try {
            var b = z.JSON.parse(a);
            break a;
          } catch (c) {}
        }
        b = kg(a);
      }
      return b;
    }
  }
  X.prototype.getResponseHeader = function (a) {
    if (this.xhr_ && ug(this) == 4) {
      a = this.xhr_.getResponseHeader(a);
      if (a === null) {
        return undefined;
      } else {
        return a;
      }
    }
  };
  X.prototype.getAllResponseHeaders = function () {
    if (this.xhr_ && ug(this) >= 2) {
      return this.xhr_.getAllResponseHeaders() || "";
    } else {
      return "";
    }
  };
  var xg = x([""]);
  var yg = x(["https://www.google.com/tools/feedback/help_panel_binary.js"]);
  function zg(a, b, c, d, e, f) {
    return ya(function (g) {
      return g.return(new Promise(function (h) {
        qg("" + a + "/repeater_help_panel?locale=" + b + "&helpContext=" + c + "&productId=" + d + "&helpcenter=" + e + "&openingMode=" + f, function (k) {
          k = k.target;
          var l = null;
          try {
            l = dd(Xe, JSON.stringify(wg(k)));
          } catch (n) {}
          h(l);
        });
      }));
    });
  }
  function Ag(a, b, c, d) {
    var e = a.helpCenterPath.startsWith("/") ? a.helpCenterPath.substring(1) : a.helpCenterPath;
    var f = Ye(b);
    var g = a.helpPanelMode || 0;
    var h = a.fixedHelpPanelContainer;
    var k = a.customHelpPanelContainer;
    if (h && g !== 1) {
      h = undefined;
    } else if (g === 1 && (!h || !!N(f, 5))) {
      g = 0;
      h = undefined;
    }
    if (k && g !== 2) {
      g = 2;
    } else if (g === 2 && (!k || !!a.anchor)) {
      g = 0;
      k = undefined;
    }
    var l = a.minimizeMode;
    if (g !== 2 || l && l !== 0) {
      if (g === 1) {
        l = 2;
      }
    } else {
      l = 2;
    }
    var n = a.openingMode;
    if (a.directToGetHelp) {
      n = 2;
    } else if (a.supportContentUrl || a.defaultHelpArticleId) {
      n = 3;
    }
    var q = c.document;
    var r = a.nonce;
    var p = L(f, We, 10) ? Ze(L(f, We, 10)) || S(xg) : S(yg);
    var v = A("document.location.href", c);
    if (!a.helpCenterContext && !a.context && !!v) {
      a.context = v.substring(0, 1200);
    }
    v = true;
    if (d) {
      var D = JSON.stringify(d);
      if (v = D.length <= 1200) {
        a.psdJson = D;
      }
    }
    if (!v) {
      d = {
        invalidPsd: true
      };
    }
    var O = a.helpPanelTheme;
    if (a.helpPanelTheme === 2) {
      O = c.matchMedia && c.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : 0;
    }
    v = yd(q).createElement("SCRIPT");
    if (r) {
      v.setAttribute("nonce", r);
    }
    v.onload = function () {
      c.startHelpPanel({
        helpcenter: e,
        apiKey: "testpage",
        channel: a.channel,
        context: a.context || a.helpCenterContext || c.location.href,
        defaultHelpArticleFragment: a.defaultHelpArticleFragment,
        defaultHelpArticleId: a.defaultHelpArticleId,
        defaultHelpArticleHelpcenterPath: a.defaultHelpArticleHelpcenterPath,
        directToGetHelp: a.directToGetHelp || false,
        openToHelpGuideEntryButtonId: a.openToHelpGuideEntryButtonId,
        enableHelpGuideMaximize: a.enableHelpGuideMaximize,
        enableHelpGuideConversationalAi: a.enableHelpGuideConversationalAi,
        enableHelpGuideHumanChat: a.enableHelpGuideHumanChat,
        internalHelpCenter: ad(f, 12),
        enableSendFeedback: a.enableSendFeedback || false,
        helpPanelTheme: O,
        locale: a.locale,
        nd4cSettingsIsEnabled: a.nd4cSettingsIsEnabled || false,
        nd4cSettingsCountryCode: a.nd4cSettingsCountryCode || "",
        serverData: b,
        supportContentUrl: a.supportContentUrl,
        symptom: a.symptom,
        helpApiData: {
          helpApiConfig: a,
          frdProductData: a.frdProductData,
          productData: d,
          productWindow: c
        },
        helpPanelMode: g,
        onPromotedProductLinkClickCallback: a.onPromotedProductLinkClickCallback,
        fixedHelpPanelContainer: h,
        customHelpPanelContainer: k,
        openingMode: n,
        onMinimizeCallback: a.onMinimizeCallback,
        onGseEventCallback: a.onGseEventCallback,
        minimizeMode: l || 0,
        helpFlowSessionId: a.helpFlowSessionId || a.supportVisitId,
        helpGuideHelpCenterEmbedEntryPoint: a.helpGuideHelpCenterEmbedEntryPoint,
        helpGuideCommonEmbedEntryPoint: a.helpGuideCommonEmbedEntryPoint,
        helpGuideStartingFlow: a.helpGuideStartingFlow,
        gseSessionOptions: a.gseSessionOptions,
        helpPanelStartTimeMs: a.helpPanelStartTimeMs,
        disableEndUserCredentials: a.disableEndUserCredentials,
        gsePageUrl: a.gsePageUrl,
        mendelIds: a.mendelIds,
        productDeepLinkRegex: a.productDeepLinkRegex,
        onProductDeepLinkClickCallback: a.onProductDeepLinkClickCallback,
        supportJourneyId: a.supportJourneyId
      });
    };
    ud(v, p);
    q.body.appendChild(v);
  }
  ;
  var Bg = {
    en: ["en-us"],
    ar: ["ar-eg"],
    zh: ["zh-cn", "zh-hans", "zh-hans-cn"],
    "zh-tw": ["zh-hant", "zh-hant-tw"],
    nl: ["nl-nl"],
    "en-gb": [],
    fr: ["fr-fr"],
    de: ["de-de"],
    it: ["it-it"],
    ja: ["ja-jp"],
    ko: ["ko-kr"],
    pl: ["pl-pl"],
    pt: ["pt-br"],
    ru: ["ru-ru"],
    es: ["es-es"],
    th: ["th-th"],
    tr: ["tr-tr"],
    "es-419": [],
    bg: ["bg-bg"],
    ca: ["ca-es"],
    hr: ["hr-hr"],
    cs: ["cs-cz"],
    da: ["da-dk"],
    fil: ["fil-ph", "tl", "tl-ph"],
    fi: ["fi-fi"],
    el: ["el-gr"],
    iw: ["he", "he-il", "iw-il"],
    hi: ["hi-in"],
    hu: ["hu-hu"],
    id: ["id-id", "in", "in-id"],
    lv: ["lv-lv"],
    lt: ["lt-lt"],
    no: ["no-no", "nb", "nb-no"],
    "pt-pt": [],
    ro: ["ro-ro", "mo"],
    sr: ["sr-rs", "sr-cyrl-rs"],
    sk: ["sk-sk"],
    sl: ["sl-sl"],
    sv: ["sv-se"],
    uk: ["uk-ua"],
    vi: ["vi-vn"],
    fa: ["fa-ir"],
    af: ["af-za"],
    bn: ["bn-in"],
    et: ["et-ee"],
    is: ["is-is"],
    ms: ["ms-my"],
    mr: ["mr-in"],
    sw: ["sw-tz"],
    ta: ["ta-in"],
    sq: ["sq-al"],
    hy: ["hy-am"],
    az: ["az-az"],
    my: ["my-mm"],
    ka: ["ka-ge"],
    kk: ["kk-kz"],
    km: ["km-kh"],
    lo: ["lo-la"],
    mk: ["mk-mk"],
    mn: ["mn-mn"],
    ne: ["ne-np"],
    si: ["si-lk"],
    am: ["am-et"],
    gu: ["gu-in"],
    kn: ["kn-in"],
    ml: ["ml-in"],
    te: ["te-in"],
    ur: ["ur-pk"],
    ky: ["ky-kg"],
    pa: ["pa-in"],
    uz: ["uz-uz"],
    "sr-latn": ["sh"],
    "fr-ca": ["fr-ca"]
  };
  var Cg = {};
  for (var Dg = w(Object.keys(Bg)), Eg = Dg.next(); !Eg.done; Eg = Dg.next()) {
    var Fg = Eg.value;
    Cg[Fg] = Fg;
    for (var Gg = w(Bg[Fg]), Hg = Gg.next(); !Hg.done; Hg = Gg.next()) {
      Cg[Hg.value] = Fg;
    }
  }
  ;
  function Ig(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Ig, Q);
  Ig.prototype.getTimezoneOffset = function () {
    return L(this, W, 3);
  };
  Ig.prototype.setTimezoneOffset = function (a) {
    return M(this, W, 3, a);
  };
  function Jg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Jg, Q);
  Jg.prototype.setPlatform = function (a) {
    return K(this, 1, a == null ? a : nc(a), 0);
  };
  Jg.prototype.setSupportedCapabilityList = function (a) {
    return Zc(this, 3, a, nc);
  };
  Jg.prototype.setLibraryVersionInt = function (a) {
    return K(this, 4, a == null ? a : pc(a), 0);
  };
  function Kg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Kg, Q);
  Kg.prototype.setDeviceInfo = function (a) {
    return M(this, Ig, 1, a);
  };
  Kg.prototype.setLibraryInfo = function (a) {
    return M(this, Jg, 2, a);
  };
  function Lg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Lg, Q);
  Lg.prototype.getAllowedCompletionStyleList = function () {
    return cd(this);
  };
  function Mg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Mg, Q);
  function Ng(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Ng, Q);
  Ng.prototype.getPromptDelay = function () {
    return L(this, Mg, 1);
  };
  Ng.prototype.getAllowedPromptStyleList = function () {
    return cd(this);
  };
  function Og(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Og, Q);
  Og.prototype.getLanguage = function () {
    return ad(this, 8);
  };
  Og.prototype.getCompletion = function () {
    return L(this, Lg, 2);
  };
  Og.prototype.getDisplaySettings = function () {
    return L(this, Ng, 3);
  };
  function Pg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Pg, Q);
  Pg.prototype.setIsScheduledSurvey = function (a) {
    return P(this, 1, a);
  };
  function Qg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Qg, Q);
  function Rg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Rg, Q);
  function Sg(a) {
    return N(a, 1);
  }
  function Tg(a) {
    var b = new Rg();
    return P(b, 1, a);
  }
  function Ug(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Ug, Q);
  m = Ug.prototype;
  m.setTriggerId = function (a) {
    return K(this, 1, I(a), "");
  };
  m.setLanguageList = function (a) {
    return Zc(this, 2, a, xc);
  };
  m.getLanguage = function () {
    return bd(this, 2);
  };
  m.setTestingMode = function (a) {
    return P(this, 3, a);
  };
  m.getSurveyId = function () {
    return ad(this, 4);
  };
  m.setSurveyId = function (a) {
    Vc(this, 4, I(a));
  };
  function Vg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Vg, Q);
  function Wg(a, b) {
    return K(a, 1, I(b), "");
  }
  Vg.prototype.setApiKey = function (a) {
    return K(this, 2, I(a), "");
  };
  Vg.prototype.setPlatform = function (a) {
    return K(this, 3, a == null ? a : nc(a), 0);
  };
  function Xg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Xg, Q);
  function Yg(a, b) {
    return M(a, Rg, 1, b);
  }
  function Zg(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(Zg, Q);
  Zg.prototype.setTriggerContext = function (a) {
    return M(this, Ug, 1, a);
  };
  Zg.prototype.setClientContext = function (a) {
    return M(this, Kg, 2, a);
  };
  Zg.prototype.setScheduledSurveyContext = function (a) {
    M(this, Pg, 3, a);
  };
  function $g(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u($g, Q);
  m = $g.prototype;
  m.getSession = function () {
    return L(this, Qg, 1);
  };
  m.getSurveyPayload = function () {
    return L(this, Og, 2);
  };
  m.getError = function (a) {
    return bd(this, 4, a);
  };
  m.getSurveyId = function () {
    return ad(this, 5);
  };
  m.setSurveyId = function (a) {
    K(this, 5, I(a), "");
  };
  function ah(a) {
    if (!a) {
      return "";
    }
    if (/^about:(?:blank|srcdoc)$/.test(a)) {
      return window.origin || "";
    }
    if (a.indexOf("blob:") === 0) {
      a = a.substring(5);
    }
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    if (a.indexOf("//") == 0) {
      a = window.location.protocol + a;
    }
    if (!/^[\w\-]*:\/\//.test(a)) {
      a = window.location.href;
    }
    var b = a.substring(a.indexOf("://") + 3);
    var c = b.indexOf("/");
    if (c != -1) {
      b = b.substring(0, c);
    }
    c = a.substring(0, a.indexOf("://"));
    if (!c) {
      throw Error("URI is missing protocol: " + a);
    }
    if (c !== "http" && c !== "https" && c !== "chrome-extension" && c !== "moz-extension" && c !== "file" && c !== "android-app" && c !== "chrome-search" && c !== "chrome-untrusted" && c !== "chrome" && c !== "app" && c !== "devtools") {
      throw Error("Invalid URI scheme in origin: " + c);
    }
    a = "";
    var d = b.indexOf(":");
    if (d != -1) {
      var e = b.substring(d + 1);
      b = b.substring(0, d);
      if (c === "http" && e !== "80" || c === "https" && e !== "443") {
        a = ":" + e;
      }
    }
    return c + "://" + b + a;
  }
  function bh() {
    function a() {
      e[0] = 1732584193;
      e[1] = 4023233417;
      e[2] = 2562383102;
      e[3] = 271733878;
      e[4] = 3285377520;
      n = l = 0;
    }
    function b(q) {
      var r = g;
      for (var p = 0; p < 64; p += 4) {
        r[p / 4] = q[p] << 24 | q[p + 1] << 16 | q[p + 2] << 8 | q[p + 3];
      }
      for (p = 16; p < 80; p++) {
        q = r[p - 3] ^ r[p - 8] ^ r[p - 14] ^ r[p - 16];
        r[p] = (q << 1 | q >>> 31) & 4294967295;
      }
      q = e[0];
      var v = e[1];
      var D = e[2];
      var O = e[3];
      var rb = e[4];
      for (p = 0; p < 80; p++) {
        if (p < 40) {
          if (p < 20) {
            var ma = O ^ v & (D ^ O);
            var Ha = 1518500249;
          } else {
            ma = v ^ D ^ O;
            Ha = 1859775393;
          }
        } else if (p < 60) {
          ma = v & D | O & (v | D);
          Ha = 2400959708;
        } else {
          ma = v ^ D ^ O;
          Ha = 3395469782;
        }
        ma = ((q << 5 | q >>> 27) & 4294967295) + ma + rb + Ha + r[p] & 4294967295;
        rb = O;
        O = D;
        D = (v << 30 | v >>> 2) & 4294967295;
        v = q;
        q = ma;
      }
      e[0] = e[0] + q & 4294967295;
      e[1] = e[1] + v & 4294967295;
      e[2] = e[2] + D & 4294967295;
      e[3] = e[3] + O & 4294967295;
      e[4] = e[4] + rb & 4294967295;
    }
    function c(q, r) {
      if (typeof q === "string") {
        q = unescape(encodeURIComponent(q));
        var p = [];
        for (var v = 0, D = q.length; v < D; ++v) {
          p.push(q.charCodeAt(v));
        }
        q = p;
      }
      r ||= q.length;
      p = 0;
      if (l == 0) {
        while (p + 64 < r) {
          b(q.slice(p, p + 64));
          p += 64;
          n += 64;
        }
      }
      while (p < r) {
        f[l++] = q[p++];
        n++;
        if (l == 64) {
          l = 0;
          b(f);
          while (p + 64 < r) {
            b(q.slice(p, p + 64));
            p += 64;
            n += 64;
          }
        }
      }
    }
    function d() {
      var q = [];
      var r = n * 8;
      if (l < 56) {
        c(h, 56 - l);
      } else {
        c(h, 64 - (l - 56));
      }
      for (var p = 63; p >= 56; p--) {
        f[p] = r & 255;
        r >>>= 8;
      }
      b(f);
      for (p = r = 0; p < 5; p++) {
        for (var v = 24; v >= 0; v -= 8) {
          q[r++] = e[p] >> v & 255;
        }
      }
      return q;
    }
    var e = [];
    var f = [];
    var g = [];
    var h = [128];
    for (var k = 1; k < 64; ++k) {
      h[k] = 0;
    }
    var l;
    var n;
    a();
    return {
      reset: a,
      update: c,
      digest: d,
      digestString: function () {
        for (var q = d(), r = "", p = 0; p < q.length; p++) {
          r += "0123456789ABCDEF".charAt(Math.floor(q[p] / 16)) + "0123456789ABCDEF".charAt(q[p] % 16);
        }
        return r;
      }
    };
  }
  ;
  function dh(a, b, c) {
    var d = String(z.location.href);
    if (d && a && b) {
      return [b, ch(ah(d), a, c || null)].join(" ");
    } else {
      return null;
    }
  }
  function ch(a, b, c) {
    var d = [];
    var e = [];
    if ((Array.isArray(c) ? 2 : 1) == 1) {
      e = [b, a];
      eb(d, function (h) {
        e.push(h);
      });
      return eh(e.join(" "));
    }
    var f = [];
    var g = [];
    eb(c, function (h) {
      g.push(h.key);
      f.push(h.value);
    });
    c = Math.floor(new Date().getTime() / 1000);
    e = f.length == 0 ? [c, b, a] : [f.join(":"), c, b, a];
    eb(d, function (h) {
      e.push(h);
    });
    a = eh(e.join(" "));
    a = [c, a];
    if (g.length != 0) {
      a.push(g.join(""));
    }
    return a.join("_");
  }
  function eh(a) {
    var b = bh();
    b.update(a);
    return b.digestString().toLowerCase();
  }
  function fh() {
    this.document_ = document || {
      cookie: ""
    };
  }
  m = fh.prototype;
  m.isEnabled = function () {
    if (!z.navigator.cookieEnabled) {
      return false;
    }
    if (!this.isEmpty()) {
      return true;
    }
    this.set("TESTCOOKIESENABLED", "1", {
      maxAge: 60
    });
    if (this.get("TESTCOOKIESENABLED") !== "1") {
      return false;
    }
    this.remove("TESTCOOKIESENABLED");
    return true;
  };
  m.set = function (a, b, c) {
    var d = false;
    if (typeof c === "object") {
      var e = c.sameSite;
      d = c.secure || false;
      var f = c.domain || undefined;
      var g = c.path || undefined;
      var h = c.maxAge;
    }
    if (/[;=\s]/.test(a)) {
      throw Error("Invalid cookie name \"" + a + "\"");
    }
    if (/[;\r\n]/.test(b)) {
      throw Error("Invalid cookie value \"" + b + "\"");
    }
    if (h === undefined) {
      h = -1;
    }
    this.document_.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (h < 0 ? "" : h == 0 ? ";expires=" + new Date(1970, 1, 1).toUTCString() : ";expires=" + new Date(Date.now() + h * 1000).toUTCString()) + (d ? ";secure" : "") + (e != null ? ";samesite=" + e : "");
  };
  m.get = function (a, b) {
    var c = a + "=";
    for (var d = (this.document_.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
      f = Za(d[e]);
      if (f.lastIndexOf(c, 0) == 0) {
        return f.slice(c.length);
      }
      if (f == a) {
        return "";
      }
    }
    return b;
  };
  m.remove = function (a, b, c) {
    var d = this.containsKey(a);
    this.set(a, "", {
      maxAge: 0,
      path: b,
      domain: c
    });
    return d;
  };
  m.getKeys = function () {
    return gh(this).keys;
  };
  m.getValues = function () {
    return gh(this).values;
  };
  m.isEmpty = function () {
    return !this.document_.cookie;
  };
  m.containsKey = function (a) {
    return this.get(a) !== undefined;
  };
  m.clear = function () {
    var a = gh(this).keys;
    for (var b = a.length - 1; b >= 0; b--) {
      this.remove(a[b]);
    }
  };
  function gh(a) {
    a = (a.document_.cookie || "").split(";");
    var b = [];
    var c = [];
    var d;
    var e;
    for (var f = 0; f < a.length; f++) {
      e = Za(a[f]);
      d = e.indexOf("=");
      if (d == -1) {
        b.push("");
        c.push(e);
      } else {
        b.push(e.substring(0, d));
        c.push(e.substring(d + 1));
      }
    }
    return {
      keys: b,
      values: c
    };
  }
  function hh(a, b, c, d) {
    if (!(a = z[a]) && typeof document !== "undefined") {
      a = new fh().get(b);
    }
    if (a) {
      return dh(a, c, d);
    } else {
      return null;
    }
  }
  function ih(a) {
    Ob(a);
    Ub(a);
    if (Ub(a)) {
      return Number(a);
    } else {
      return String(a);
    }
  }
  ;
  function jh(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(jh, Q);
  m = jh.prototype;
  m.getEnableSsEngine = function () {
    return N(this, 2);
  };
  m.getEnableAwr = function () {
    return N(this, 3);
  };
  m.getAlohaAutoGaRollout = function () {
    return N(this, 5);
  };
  m.getEnableConfigurator = function () {
    return N(this, 6);
  };
  m.getEnableMweb = function () {
    return N(this, 7);
  };
  m.getEnableCtlConsentCheckbox = function () {
    return N(this, 8);
  };
  m.getEnableIframe = function () {
    return N(this, 9);
  };
  function kh() {
    var a = new jh();
    a = P(a, 5, true);
    a = P(a, 2, true);
    a = P(a, 4, false);
    a = P(a, 8, true);
    return P(a, 9, true);
  }
  m = jh.prototype;
  m.getEnableScreenshotNudge = function () {
    return N(this, 10);
  };
  m.getEnableWebStartupConfigEndpoint = function () {
    return N(this, 11);
  };
  m.getEnableJunkNudge = function () {
    return N(this, 12);
  };
  m.getEnableConfiguratorLocale = function () {
    return N(this, 13);
  };
  m.getEnableTinyNoPointer = function () {
    return N(this, 14);
  };
  m.getEnableSupportSessionLogging = function () {
    return N(this, 15);
  };
  m.getEnableFileUploadForScreenshot = function () {
    return N(this, 16);
  };
  m.getEnableDirectDeflectionForSingleCategory = function () {
    return N(this, 17);
  };
  m.getEnableImageSanitization = function () {
    return N(this, 18);
  };
  m.getEnableAlohaBinarySplit = function () {
    return N(this, 19);
  };
  m.getEnableDbFeedbackIntents = function () {
    return N(this, 20);
  };
  m.getEnableMarkMandatoryFieldsWithRequired = function () {
    return N(this, 21);
  };
  m.getEnableFeedbackCategoryCustomUi = function () {
    return N(this, 22);
  };
  m.getEnableRealtimeCtl = function () {
    return N(this, 23);
  };
  function lh(a) {
    this.internalArrayDoNotAccessOrElseMightBeUndefinedWhoKnows = J(a);
  }
  u(lh, Q);
  function mh(a) {
    return nh.some(function (b) {
      return b.test(a);
    });
  }
  var nh = [/https:\/\/sandbox\.google\.com\/tools\/feedback/, /https:\/\/feedback-frontend-qual[a-z0-9.]*\.google\.com\/inapp/, /https:\/\/feedback-frontend-qual[a-z0-9.]*\.google\.com\/tools\/feedback/, /https:\/\/.*\.googleusercontent\.com\/inapp/];
  var oh = "af am ar-EG ar-JO ar-MA ar-SA ar-XB ar az be bg bn bs ca cs cy da de-AT de-CH de el en en-GB en-AU en-CA en-IE en-IN en-NZ en-SG en-XA en-XC en-ZA es es-419 es-AR es-BO es-CL es-CO es-CR es-DO es-EC es-GT es-HN es-MX es-NI es-PA es-PE es-PR es-PY es-SV es-US es-UY es-VE et eu fa fi fil fr-CA fr-CH fr gl gsw gu he hi hr hu hy id in is it iw ja ka kk km kn ko ky ln lo lt lv mk ml mn mo mr ms my nb ne nl no pa pl pt pt-BR pt-PT ro ru si sk sl sq sr-Latn sr sv sw ta te th tl tr uk ur uz vi zh zh-CN zh-HK zh-TW zu".split(" ");
  var ph = x(["https://www.gstatic.com/uservoice/feedback/client/web/", "/main_light_binary.js"]);
  var qh = x(["https://www.gstatic.com/uservoice/feedback/client/web/", "/main_binary__", ".js"]);
  function rh(a, b) {
    var c;
    var d = (c = a.formContent) == null ? undefined : c.locale;
    c = d == null ? undefined : d.split("-")[0];
    d = d && oh.includes(d) ? d : c && oh.includes(c) ? c : undefined;
    d = (d ?? "en").replaceAll("-", "_").toLowerCase();
    var e;
    a = ((e = a.initializationData) == null ? 0 : e.useNightlyRelease) ? "nightly" : "live";
    var f;
    if (b == null ? 0 : (f = b.getEnableAlohaBinarySplit) == null ? 0 : f.call(b)) {
      return S(ph, a);
    } else {
      return S(qh, a, d);
    }
  }
  ;
  function sh() {
    var a = Error.call(this, "Form is either loading or already opened");
    this.message = a.message;
    if ("stack" in a) {
      this.stack = a.stack;
    }
    this.name = "DuplicateFormError";
  }
  u(sh, Error);
  var th;
  var uh;
  var vh;
  var wh;
  function xh(a, b, c, d) {
    if (th && vh === b) {
      return th;
    }
    vh = b;
    var e = rh(a, d);
    return th = b.feedbackV2GlobalObject ? Promise.resolve(b.feedbackV2GlobalObject) : new Promise(function (f, g) {
      var h = Cd(document, "SCRIPT");
      ud(h, e);
      h.onload = function () {
        if (b.feedbackV2GlobalObject) {
          f(b.feedbackV2GlobalObject);
        } else {
          g(Error("feedbackV2GlobalObject not found on window."));
        }
      };
      h.onerror = function () {
        g(Error("Feedback binary script tag failed to load: " + e.toString()));
      };
      c.body.appendChild(h);
    });
  }
  function yh(a, b, c, d) {
    if (uh && wh === b) {
      return uh;
    }
    wh = b;
    var e = rh(a, d);
    return uh = b.feedbackV2GlobalObject ? Promise.resolve(b.feedbackV2GlobalObject) : new Promise(function (f, g) {
      var h = Cd(document, "SCRIPT");
      ud(h, e);
      h.onload = function () {
        if (b.feedbackV2GlobalObject) {
          f(b.feedbackV2GlobalObject);
        } else {
          g(Error("feedbackV2GlobalObject not found on window."));
        }
      };
      h.onerror = function () {
        g(Error("Feedback binary script tag failed to load: " + e.toString()));
      };
      c.body.appendChild(h);
    });
  }
  function zh(a, b, c, d, e) {
    e = e === undefined ? true : e;
    var f;
    var g;
    var h;
    var k;
    var l;
    return ya(function (n) {
      switch (n.nextAddress) {
        case 1:
          f = Date.now();
          return ra(n, xh(a, c, d, b), 2);
        case 2:
          g = n.yieldResult;
          if (!e && !((k = a.initializationData) == null ? 0 : k.useNightlyRelease) && !((l = a.initializationData) == null ? 0 : l.isLocalServer)) {
            h = g.initializeFeedbackClient(a, f, b);
            n.nextAddress = 3;
            break;
          }
          return ra(n, g.initializeFeedbackClientAsync(a, f, b), 4);
        case 4:
          h = n.yieldResult;
        case 3:
          h.initiateAloha();
          return n.return(h);
      }
    });
  }
  function Ah(a, b, c, d) {
    var e;
    var f;
    var g;
    return ya(function (h) {
      if (h.nextAddress == 1) {
        e = Date.now();
        return ra(h, yh(a, c, d.document, b), 2);
      }
      if (h.nextAddress != 3) {
        f = h.yieldResult;
        return ra(h, f.initializeFeedbackClientAsync(a, e, b, d), 3);
      }
      g = h.yieldResult;
      g.initiateAloha();
      return h.return(g);
    });
  }
  function Bh(a, b, c) {
    var d = true;
    d = d === undefined ? true : d;
    var e;
    var f;
    var g;
    var h;
    var k;
    var l;
    var n;
    var q;
    return ya(function (r) {
      e = c || z;
      if ((f = b) == null ? 0 : (h = (g = f).getEnableAlohaBinarySplit) == null ? 0 : h.call(g)) {
        k = e;
        if (k.isFormOpened) {
          throw new sh();
        }
        k.isFormOpened = true;
        a.callbacks = a.callbacks || {};
        l = a.callbacks.onClose || function () {};
        a.callbacks.onClose = function (p) {
          k.isFormOpened = false;
          l(p);
        };
        try {
          return r.return(Ah(a, b, k, e));
        } catch (p) {
          k.isFormOpened = false;
          throw p;
        }
      } else {
        n = e;
        if (n.isFormOpened) {
          throw new sh();
        }
        n.isFormOpened = true;
        a.callbacks = a.callbacks || {};
        q = a.callbacks.onClose || function () {};
        a.callbacks.onClose = function (p) {
          n.isFormOpened = false;
          q(p);
        };
        try {
          return r.return(zh(a, b, n, e.document, d));
        } catch (p) {
          n.isFormOpened = false;
          throw p;
        }
      }
      r.nextAddress = 0;
    });
  }
  ;
  function Ch(a, b) {
    return ya(function (c) {
      return c.return(new Promise(function (d, e) {
        if (Number.isInteger(Number(a)) && Number(a) > 0) {
          e = Dh(b ?? "") + "/aloha_form_properties?productId=" + a;
          qg(e, function (f) {
            f = f.target;
            var g = null;
            try {
              g = dd(lh, JSON.stringify(wg(f)));
            } catch (h) {
              f = new lh();
              g = kh();
              g = P(g, 7, true);
              g = P(g, 10, true);
              g = P(g, 12, true);
              g = P(g, 13, false);
              g = P(g, 14, true);
              g = P(g, 15, true);
              g = P(g, 20, false);
              g = M(f, jh, 1, g);
            }
            d(g);
          }, "GET", "", {}, 2000);
        } else {
          e(Error("Invalid product id: " + a));
        }
      }));
    });
  }
  function Dh(a) {
    if (mh(a)) {
      return a;
    } else {
      return "https://www.google.com/tools/feedback";
    }
  }
  ;
  function Eh(a, b, c) {
    a.timeOfStartCall = new Date().getTime();
    var d = c || z;
    var e = d.document;
    var f = a.nonce || td(d.document);
    if (f && !a.nonce) {
      a.nonce = f;
    }
    if (a.flow == "help") {
      var g = A("document.location.href", d);
      if (!a.helpCenterContext && g) {
        a.helpCenterContext = g.substring(0, 1200);
      }
      g = true;
      if (b && JSON && JSON.stringify) {
        var h = JSON.stringify(b);
        if (g = h.length <= 1200) {
          a.psdJson = h;
        }
      }
      if (!g) {
        b = {
          invalidPsd: true
        };
      }
    }
    b = [a, b, c];
    d.GOOGLE_FEEDBACK_START_ARGUMENTS = b;
    c = a.feedbackServerUri || "//www.google.com/tools/feedback";
    if (g = d.GOOGLE_FEEDBACK_START) {
      g.apply(d, b);
    } else {
      d = c + "/load.js?";
      for (var k in a) {
        b = a[k];
        if (b != null && !Ia(b)) {
          d += encodeURIComponent(k) + "=" + encodeURIComponent(b) + "&";
        }
      }
      a = yd(e).createElement("SCRIPT");
      if (f) {
        a.setAttribute("nonce", f);
      }
      ud(a, Sa(d));
      e.body.appendChild(a);
    }
  }
  function Fh(a, b, c, d) {
    var e;
    var f;
    return ya(function (g) {
      e = c || z;
      var h = a.serverEnvironment === "DEV";
      var k = c || z;
      k = a.nonce || td(k.document);
      h = {
        integrationKeys: {
          productId: a.productId,
          feedbackBucket: a.bucket,
          triggerId: a.triggerId
        },
        callbacks: {
          onClose: a.callback,
          onLoad: a.onLoadCallback
        },
        formContent: {
          locale: a.locale,
          disableScreenshot: a.disableScreenshotting,
          productDisplayName: undefined,
          announcement: undefined,
          issueCategories: undefined,
          includeSeveritySelection: undefined,
          customImageSrc: undefined,
          thankYouMessage: undefined,
          userEmail: undefined,
          defaultFormInputValues: undefined,
          defaultFormInputValuesString: undefined,
          abuseLink: a.abuseLink,
          additionalDataConsent: a.additionalDataConsent
        },
        initializationData: {
          isLocalServer: h,
          nonce: k,
          useNightlyRelease: h,
          feedbackJsUrl: undefined,
          feedbackCssUrl: undefined,
          feedbackJsUrlSerialized: undefined,
          feedbackCssUrlSerialized: undefined,
          submissionServerUri: a.feedbackServerUri,
          colorScheme: a.colorScheme
        },
        extraData: {
          productVersion: a.productVersion,
          authUser: a.authuser,
          configuratorId: a.configuratorId,
          customZIndex: a.customZIndex,
          tinyNoPointer: a.tinyNoPointer,
          allowNonLoggedInFeedback: a.allowNonLoggedInFeedback,
          enableAnonymousFeedback: a.enableAnonymousFeedback
        }
      };
      if (b) {
        k = new Map(Object.entries(b));
        h.extraData.productSpecificData = k;
      }
      f = h;
      return ra(g, Bh(f, d, e), 0);
    });
  }
  function Gh(a, b, c) {
    try {
      if (a.flow === "help") {
        var d = a.helpCenterPath.replace(/^\//, "");
        sd(c || window, "https://support.google.com/" + d);
      } else if (a.flow === "submit") {
        Eh(a, b, c);
      } else {
        Ch(a.productId, a.feedbackServerUri).then(function (e) {
          e = L(e, jh, 1);
          var f = !jb || (e == null ? undefined : e.getEnableMweb());
          var g = !a.tinyNoPointer || (e == null ? undefined : e.getEnableTinyNoPointer());
          if (!e || e.getAlohaAutoGaRollout() && f && g) {
            Fh(a, b, c, e).catch(function (h) {
              if (!!h && !(h instanceof sh)) {
                Eh(a, b, c);
              }
            });
          } else {
            Eh(a, b, c);
          }
        }, function (e) {
          if (!!e && !(e instanceof sh)) {
            Eh(a, b, c);
          }
        });
      }
    } catch (e) {
      Fh(a, b, c, null).catch(function (f) {
        if (!!f && !(f instanceof sh)) {
          Eh(a, b, c);
        }
      });
    }
  }
  Ea("userfeedback.api.startFeedback", Gh);
  function Hh(a, b) {
    var c = ld(a);
    if (!Ih.test(c)) {
      throw Error("Invalid TrustedResourceUrl format: " + c);
    }
    a = c.replace(Jh, function (d, e) {
      if (!Object.prototype.hasOwnProperty.call(b, e)) {
        throw Error("Found marker, \"" + e + "\", in format string, \"" + c + "\", but no valid label mapping found in args: " + JSON.stringify(b));
      }
      d = b[e];
      if (d instanceof kd) {
        return ld(d);
      } else {
        return encodeURIComponent(String(d));
      }
    });
    return Sa(a);
  }
  var Jh = /%{(\w+)}/g;
  var Ih = RegExp("^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)", "i");
  function Kh() {}
  Kh.prototype.next = function () {
    return Lh;
  };
  var Lh = {
    done: true,
    value: undefined
  };
  Kh.prototype.__iterator__ = function () {
    return this;
  };
  function Mh(a) {
    if (a instanceof Kh) {
      return a;
    }
    if (typeof a.__iterator__ == "function") {
      return a.__iterator__(false);
    }
    if (Ga(a)) {
      var b = 0;
      var c = new Kh();
      c.next = function () {
        while (true) {
          if (b >= a.length) {
            return Lh;
          }
          if (b in a) {
            return {
              value: a[b++],
              done: false
            };
          }
          b++;
        }
      };
      return c;
    }
    throw Error("Not implemented");
  }
  function Nh(a) {
    this.elements_ = {};
    if (a) {
      for (var b = 0; b < a.length; b++) {
        this.elements_[Oh(a[b])] = null;
      }
    }
    for (var c in Object.prototype);
  }
  var Ph = {};
  function Oh(a) {
    if (a in Ph || String(a).charCodeAt(0) == 32) {
      return " " + a;
    } else {
      return a;
    }
  }
  function Qh(a) {
    if (a.charCodeAt(0) == 32) {
      return a.slice(1);
    } else {
      return a;
    }
  }
  m = Nh.prototype;
  m.add = function (a) {
    this.elements_[Oh(a)] = null;
  };
  m.clear = function () {
    this.elements_ = {};
  };
  m.clone = function () {
    var a = new Nh();
    var b;
    for (b in this.elements_) {
      a.elements_[b] = null;
    }
    return a;
  };
  m.contains = function (a) {
    return Oh(a) in this.elements_;
  };
  m.has = function (a) {
    return this.contains(a);
  };
  m.equals = function (a) {
    return this.isSubsetOf(a) && a.isSubsetOf(this);
  };
  m.forEach = function (a, b) {
    for (var c in this.elements_) {
      a.call(b, Qh(c), undefined, this);
    }
  };
  m.values = Object.keys ? function () {
    return Object.keys(this.elements_).map(Qh, this);
  } : function () {
    var a = [];
    var b;
    for (b in this.elements_) {
      a.push(Qh(b));
    }
    return a;
  };
  m.getValues = function () {
    return this.values();
  };
  m.isEmpty = function () {
    for (var a in this.elements_) {
      return false;
    }
    return true;
  };
  m.isSubsetOf = function (a) {
    for (var b in this.elements_) {
      if (!(b in a.elements_)) {
        return false;
      }
    }
    return true;
  };
  m.isSupersetOf = function (a) {
    return a.isSubsetOf(this);
  };
  m.delete = function (a) {
    a = Oh(a);
    if (a in this.elements_) {
      delete this.elements_[a];
      return true;
    } else {
      return false;
    }
  };
  m.remove = function (a) {
    return this.delete(a);
  };
  m.__iterator__ = function () {
    return Mh(this.getValues());
  };
  function Rh(a) {
    if (a.getValues && typeof a.getValues == "function") {
      return a.getValues();
    }
    if (typeof Map !== "undefined" && a instanceof Map || typeof Set !== "undefined" && a instanceof Set) {
      return Array.from(a.values());
    }
    if (typeof a === "string") {
      return a.split("");
    }
    if (Ga(a)) {
      var b = [];
      for (var c = a.length, d = 0; d < c; d++) {
        b.push(a[d]);
      }
      return b;
    }
    b = [];
    c = 0;
    for (d in a) {
      b[c++] = a[d];
    }
    return b;
  }
  function Sh(a) {
    if (a.getKeys && typeof a.getKeys == "function") {
      return a.getKeys();
    }
    if (!a.getValues || typeof a.getValues != "function") {
      if (typeof Map !== "undefined" && a instanceof Map) {
        return Array.from(a.keys());
      }
      if (typeof Set === "undefined" || !(a instanceof Set)) {
        if (Ga(a) || typeof a === "string") {
          var b = [];
          a = a.length;
          for (var c = 0; c < a; c++) {
            b.push(c);
          }
          return b;
        }
        b = [];
        c = 0;
        for (var d in a) {
          b[c++] = d;
        }
        return b;
      }
    }
  }
  function Th(a, b, c) {
    if (a.forEach && typeof a.forEach == "function") {
      a.forEach(b, c);
    } else if (Ga(a) || typeof a === "string") {
      Array.prototype.forEach.call(a, b, c);
    } else {
      var d = Sh(a);
      var e = Rh(a);
      for (var f = e.length, g = 0; g < f; g++) {
        b.call(c, e[g], d && d[g], a);
      }
    }
  }
  function Uh(a) {
    this.domain_ = this.userInfo_ = this.scheme_ = "";
    this.port_ = null;
    this.fragment_ = this.path_ = "";
    this.ignoreCase_ = this.isReadOnly_ = false;
    if (a instanceof Uh) {
      this.ignoreCase_ = a.ignoreCase_;
      Vh(this, a.scheme_);
      var b = a.userInfo_;
      Y(this);
      this.userInfo_ = b;
      b = a.domain_;
      Y(this);
      this.domain_ = b;
      Wh(this, a.port_);
      b = a.path_;
      Y(this);
      this.path_ = b;
      Xh(this, a.queryData_.clone());
      a = a.fragment_;
      Y(this);
      this.fragment_ = a;
    } else if (a && (b = String(a).match(lg))) {
      this.ignoreCase_ = false;
      Vh(this, b[1] || "", true);
      a = b[2] || "";
      Y(this);
      this.userInfo_ = Yh(a);
      a = b[3] || "";
      Y(this);
      this.domain_ = Yh(a, true);
      Wh(this, b[4]);
      a = b[5] || "";
      Y(this);
      this.path_ = Yh(a, true);
      Xh(this, b[6] || "", true);
      a = b[7] || "";
      Y(this);
      this.fragment_ = Yh(a);
    } else {
      this.ignoreCase_ = false;
      this.queryData_ = new Zh(null, this.ignoreCase_);
    }
  }
  Uh.prototype.toString = function () {
    var a = [];
    var b = this.scheme_;
    if (b) {
      a.push($h(b, ai, true), ":");
    }
    var c = this.domain_;
    if (c || b == "file") {
      a.push("//");
      if (b = this.userInfo_) {
        a.push($h(b, ai, true), "@");
      }
      a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
      c = this.port_;
      if (c != null) {
        a.push(":", String(c));
      }
    }
    if (c = this.path_) {
      if (this.domain_ && c.charAt(0) != "/") {
        a.push("/");
      }
      a.push($h(c, c.charAt(0) == "/" ? bi : ci, true));
    }
    if (c = this.queryData_.toString()) {
      a.push("?", c);
    }
    if (c = this.fragment_) {
      a.push("#", $h(c, di));
    }
    return a.join("");
  };
  Uh.prototype.resolve = function (a) {
    var b = this.clone();
    var c = !!a.scheme_;
    if (c) {
      Vh(b, a.scheme_);
    } else {
      c = !!a.userInfo_;
    }
    if (c) {
      var d = a.userInfo_;
      Y(b);
      b.userInfo_ = d;
    } else {
      c = !!a.domain_;
    }
    if (c) {
      d = a.domain_;
      Y(b);
      b.domain_ = d;
    } else {
      c = a.port_ != null;
    }
    d = a.path_;
    if (c) {
      Wh(b, a.port_);
    } else if (c = !!a.path_) {
      if (d.charAt(0) != "/") {
        if (this.domain_ && !this.path_) {
          d = "/" + d;
        } else {
          var e = b.path_.lastIndexOf("/");
          if (e != -1) {
            d = b.path_.slice(0, e + 1) + d;
          }
        }
      }
      e = d;
      if (e == ".." || e == ".") {
        d = "";
      } else if (e.indexOf("./") != -1 || e.indexOf("/.") != -1) {
        d = e.lastIndexOf("/", 0) == 0;
        e = e.split("/");
        var f = [];
        for (var g = 0; g < e.length;) {
          var h = e[g++];
          if (h == ".") {
            if (d && g == e.length) {
              f.push("");
            }
          } else if (h == "..") {
            if (f.length > 1 || f.length == 1 && f[0] != "") {
              f.pop();
            }
            if (d && g == e.length) {
              f.push("");
            }
          } else {
            f.push(h);
            d = true;
          }
        }
        d = f.join("/");
      } else {
        d = e;
      }
    }
    if (c) {
      Y(b);
      b.path_ = d;
    } else {
      c = a.queryData_.toString() !== "";
    }
    if (c) {
      Xh(b, a.queryData_.clone());
    } else {
      c = !!a.fragment_;
    }
    if (c) {
      a = a.fragment_;
      Y(b);
      b.fragment_ = a;
    }
    return b;
  };
  Uh.prototype.clone = function () {
    return new Uh(this);
  };
  function Vh(a, b, c) {
    Y(a);
    a.scheme_ = c ? Yh(b, true) : b;
    a.scheme_ &&= a.scheme_.replace(/:$/, "");
    return a;
  }
  function Wh(a, b) {
    Y(a);
    if (b) {
      b = Number(b);
      if (isNaN(b) || b < 0) {
        throw Error("Bad port number " + b);
      }
      a.port_ = b;
    } else {
      a.port_ = null;
    }
  }
  function Xh(a, b, c) {
    Y(a);
    if (b instanceof Zh) {
      a.queryData_ = b;
      a.queryData_.setIgnoreCase(a.ignoreCase_);
    } else {
      if (!c) {
        b = $h(b, ei);
      }
      a.queryData_ = new Zh(b, a.ignoreCase_);
    }
  }
  Uh.prototype.getQuery = function () {
    return this.queryData_.toString();
  };
  Uh.prototype.removeParameter = function (a) {
    Y(this);
    this.queryData_.remove(a);
    return this;
  };
  function Y(a) {
    if (a.isReadOnly_) {
      throw Error("Tried to modify a read-only Uri");
    }
  }
  Uh.prototype.setIgnoreCase = function (a) {
    this.ignoreCase_ = a;
    if (this.queryData_) {
      this.queryData_.setIgnoreCase(a);
    }
  };
  function Yh(a, b) {
    if (a) {
      if (b) {
        return decodeURI(a.replace(/%25/g, "%2525"));
      } else {
        return decodeURIComponent(a);
      }
    } else {
      return "";
    }
  }
  function $h(a, b, c) {
    if (typeof a === "string") {
      a = encodeURI(a).replace(b, fi);
      if (c) {
        a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1");
      }
      return a;
    } else {
      return null;
    }
  }
  function fi(a) {
    a = a.charCodeAt(0);
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
  }
  var ai = /[#\/\?@]/g;
  var ci = /[#\?:]/g;
  var bi = /[#\?]/g;
  var ei = /[#\?@]/g;
  var di = /#/g;
  function Zh(a, b) {
    this.count_ = this.keyMap_ = null;
    this.encodedQuery_ = a || null;
    this.ignoreCase_ = !!b;
  }
  function gi(a) {
    if (!a.keyMap_) {
      a.keyMap_ = new Map();
      a.count_ = 0;
      if (a.encodedQuery_) {
        mg(a.encodedQuery_, function (b, c) {
          a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
        });
      }
    }
  }
  m = Zh.prototype;
  m.add = function (a, b) {
    gi(this);
    this.encodedQuery_ = null;
    a = hi(this, a);
    var c = this.keyMap_.get(a);
    if (!c) {
      this.keyMap_.set(a, c = []);
    }
    c.push(b);
    this.count_ += 1;
    return this;
  };
  m.remove = function (a) {
    gi(this);
    a = hi(this, a);
    if (this.keyMap_.has(a)) {
      this.encodedQuery_ = null;
      this.count_ -= this.keyMap_.get(a).length;
      return this.keyMap_.delete(a);
    } else {
      return false;
    }
  };
  m.clear = function () {
    this.keyMap_ = this.encodedQuery_ = null;
    this.count_ = 0;
  };
  m.isEmpty = function () {
    gi(this);
    return this.count_ == 0;
  };
  m.containsKey = function (a) {
    gi(this);
    a = hi(this, a);
    return this.keyMap_.has(a);
  };
  m.forEach = function (a, b) {
    gi(this);
    this.keyMap_.forEach(function (c, d) {
      c.forEach(function (e) {
        a.call(b, e, d, this);
      }, this);
    }, this);
  };
  m.getKeys = function () {
    gi(this);
    var a = Array.from(this.keyMap_.values());
    for (var b = Array.from(this.keyMap_.keys()), c = [], d = 0; d < b.length; d++) {
      for (var e = a[d], f = 0; f < e.length; f++) {
        c.push(b[d]);
      }
    }
    return c;
  };
  m.getValues = function (a) {
    gi(this);
    var b = [];
    if (typeof a === "string") {
      if (this.containsKey(a)) {
        b = b.concat(this.keyMap_.get(hi(this, a)));
      }
    } else {
      a = Array.from(this.keyMap_.values());
      for (var c = 0; c < a.length; c++) {
        b = b.concat(a[c]);
      }
    }
    return b;
  };
  m.set = function (a, b) {
    gi(this);
    this.encodedQuery_ = null;
    a = hi(this, a);
    if (this.containsKey(a)) {
      this.count_ -= this.keyMap_.get(a).length;
    }
    this.keyMap_.set(a, [b]);
    this.count_ += 1;
    return this;
  };
  m.get = function (a, b) {
    if (!a) {
      return b;
    }
    a = this.getValues(a);
    if (a.length > 0) {
      return String(a[0]);
    } else {
      return b;
    }
  };
  m.toString = function () {
    if (this.encodedQuery_) {
      return this.encodedQuery_;
    }
    if (!this.keyMap_) {
      return "";
    }
    var a = [];
    for (var b = Array.from(this.keyMap_.keys()), c = 0; c < b.length; c++) {
      var d = b[c];
      var e = encodeURIComponent(String(d));
      d = this.getValues(d);
      for (var f = 0; f < d.length; f++) {
        var g = e;
        if (d[f] !== "") {
          g += "=" + encodeURIComponent(String(d[f]));
        }
        a.push(g);
      }
    }
    return this.encodedQuery_ = a.join("&");
  };
  m.clone = function () {
    var a = new Zh();
    a.encodedQuery_ = this.encodedQuery_;
    if (this.keyMap_) {
      a.keyMap_ = new Map(this.keyMap_);
      a.count_ = this.count_;
    }
    return a;
  };
  function hi(a, b) {
    b = String(b);
    if (a.ignoreCase_) {
      b = b.toLowerCase();
    }
    return b;
  }
  Zh.prototype.setIgnoreCase = function (a) {
    if (a && !this.ignoreCase_) {
      gi(this);
      this.encodedQuery_ = null;
      this.keyMap_.forEach(function (b, c) {
        var d = c.toLowerCase();
        if (c != d) {
          this.remove(c);
          this.remove(d);
          if (b.length > 0) {
            this.encodedQuery_ = null;
            this.keyMap_.set(hi(this, d), hb(b));
            this.count_ += b.length;
          }
        }
      }, this);
    }
    this.ignoreCase_ = a;
  };
  Zh.prototype.extend = function (a) {
    for (var b = 0; b < arguments.length; b++) {
      Th(arguments[b], function (c, d) {
        this.add(d, c);
      }, this);
    }
  };
  new Nh("head HEAD link LINK style STYLE meta META defs DEFS script SCRIPT html HTML base BASE colgroup COLGROUP col COL wbr WBR content CONTENT slot SLOT".split(" "));
  new Nh("svg SVG polygon POLYGON g G br BR".split(" "));
  function ii(a, b) {
    a = new Uh(a);
    if (b === undefined || b) {
      return Vh(a, a.scheme_ || location.protocol).toString();
    } else {
      return Vh(a, "http").toString();
    }
  }
  ;
  var ji = x(["https://feedback.googleusercontent.com/resources/annotator.css"]);
  var ki = x(["https://feedback.googleusercontent.com/resources/render_frame2.html"]);
  S(ji);
  S(ki);
  function li(a) {
    var b = a || {};
    a = b.serverUri;
    var c = a + "/%{resource}";
    var d = {
      resource: R("chat_load.js")
    };
    b = b.https;
    var e = [R("//www.google.com/tools/feedback/%{resource}"), R("https://www.google.com/tools/feedback/%{resource}"), R("https://support.google.com/inapp/%{resource}"), R("https://sandbox.google.com/inapp/%{resource}"), R("https://feedback2-test.corp.google.com/inapp/%{resource}"), R("https://feedback2-test.corp.googleusercontent.com/inapp/%{resource}"), R("https://sandbox.google.com/tools/feedback/%{resource}"), R("https://feedback2-test.corp.google.com/tools/feedback/%{resource}"), R("https://feedback2-test.corp.googleusercontent.com/tools/feedback/%{resource}"), R("https://www.google.cn/tools/feedback/%{resource}")].filter(function (f) {
      return ld(f) == c;
    })[0];
    if (e) {
      return Hh(e, d);
    }
    a = ii(a, b === undefined || !!b);
    a = Wa(pd(a));
    return Hh(R("//www.google.com/tools/feedback/%{resource}"), d);
  }
  Ea("userfeedback.api.help.startHelpWithChatSupport", function (a, b) {
    a.flow = "help";
    Gh(a, b);
  });
  function mi(a, b) {
    var c = a.serverUri || "//www.google.com/tools/feedback";
    z.GOOGLE_HELP_CHAT_ARGUMENTS = arguments;
    var d = Cd(document, "SCRIPT");
    c = li({
      serverUri: c
    });
    ud(d, c);
    window.document.body.appendChild(d);
  }
  Ea("userfeedback.api.help.loadChatSupport", mi);
  var ni = x(["https://www.gstatic.com/uservoice/surveys/resources/", "/js/survey/survey_binary__", ".js"]);
  var oi = x(["https://gstatic.com/uservoice/surveys/resources/", "/js/survey/survey_", "_", ".css"]);
  var pi = Date.now();
  var qi = /uservoice\/surveys\/resources\/(non)?prod\/js\/survey\/survey_(dark|light)_(ltr|rtl)/gi;
  var ri = /uservoice\/surveys\/resources\/(non)?prod\/js\/survey\/survey_binary__/gi;
  function Z(a, b) {
    this.productId_ = a;
    this.receiverUri_ = b.receiverUri;
    this.locale_ = b.locale || b.locale || "en".replace(/-/g, "_");
    this.window_ = b.window || b.window || top;
    this.productData_ = b.productData || b.productData || {};
    a: {
      if (a = b.frdProductDataSerializedJspb || b.frdProductDataSerializedJspb) {
        try {
          var c = mb(a);
          break a;
        } catch (e) {
          c = undefined;
          break a;
        }
      }
      c = (c = b.frdProductData || b.frdProductData) ? si(c) : undefined;
    }
    this.frdProductDataBase64EncodedString_ = c;
    this.helpCenterPath_ = b.helpCenterPath || b.helpCenterPath || "";
    this.helpcenter = this.helpCenterPath_.startsWith("/") ? this.helpCenterPath_.substring(1) : this.helpCenterPath_;
    this.apiKey_ = b.apiKey || b.apiKey || "";
    this.renderApiUri_ = b.renderApiUri || b.renderApiUri || "";
    this.asxUiUri_ = b.asxUiUri || b.asxUiUri || "";
    var d;
    if (!(b = b.nonce || b.nonce)) {
      b = (d = this.window_) == null ? undefined : d.document;
      b = td(b);
    }
    this.nonce_ = b;
    this.surveyStartupConfig_ = Yg(new Xg(), Tg(false));
    this.thirdPartyDomainSupportEnabled_ = false;
  }
  m = Z.prototype;
  m.startFeedback = function (a) {
    var b = window.GOOGLE_FEEDBACK_DESTROY_FUNCTION;
    if (b) {
      b();
    }
    Gh(ti(this, a), this.productData_, this.window_);
  };
  m.updateProductData = function (a) {
    this.productData_ = Object.assign({}, this.productData_, a);
  };
  m.updateContext = function (a) {
    var b = A("gapi.rpc");
    if (b && document.getElementById("help_panel_main_frame") !== null) {
      a ||= A("document.location.href", window).substring(0, 1200);
      b.setup("");
      b.sendHandshake("help_panel_main_frame/help_panel_content_frame", "");
      b.call("help_panel_main_frame/help_panel_content_frame", "adaptContext", null, a);
    }
  };
  m.startHelp = function (a) {
    var b = this;
    var c = document.getElementById("help_panel_main_frame");
    if (c && c.style.visibility === "hidden") {
      c.style.visibility = "visible";
      if (a.onRestoreCallback) {
        a.onRestoreCallback();
      }
    } else {
      c = new Date().getTime();
      var d = a ? ui(this, a, c) : {};
      a = d.openingMode || 0;
      try {
        zg(this.receiverUri_ || "https://www.google.com/tools/feedback", this.locale_, d.helpCenterContext, this.productId_, this.helpcenter, a).then(function (e) {
          var f = d.fixedHelpPanelContainer;
          if (f) {
            var g = f.style.width;
            f.style.width = "0";
            f.style.display = "none";
            f.style.width = g ?? "360px";
            f.replaceChildren();
          } else {
            Dd(document.getElementById("help_panel_main_frame"));
          }
          Ag(d, JSON.stringify(Gc(e)), b.window_, b.productData_);
        });
      } catch (e) {
        sd(window, "https://support.google.com/" + this.helpcenter);
      }
    }
  };
  m.startHelpCard = function (a, b) {
    var c = this;
    var d = new Date().getTime();
    var e = a ? ui(this, a, d) : {};
    a = e.openingMode || 0;
    try {
      zg(this.receiverUri_ || "https://www.google.com/tools/feedback", this.locale_, e.helpCenterContext, this.productId_, this.helpcenter, a).then(function (f) {
        var g;
        if ((g = document.getElementById("help_card_main_frame")) != null) {
          g.remove();
        }
        bf(e, JSON.stringify(Gc(f)), c.window_, b || undefined);
      });
    } catch (f) {
      sd(window, "https://support.google.com/" + this.helpcenter);
    }
  };
  function ti(a, b) {
    b = b || {};
    return {
      bucket: b.bucket || b.bucket,
      locale: a.locale_,
      callback: b.onend || b.onend || function () {},
      onLoadCallback: b.onLoadCallback || b.onLoadCallback,
      serverUri: b.serverUri || b.serverUri || a.receiverUri_,
      productId: a.productId_,
      productVersion: b.productVersion || b.productVersion,
      authuser: b.authuser || b.authuser,
      abuseLink: b.abuseLink || b.abuseLink,
      customZIndex: b.customZIndex || b.customZIndex,
      flow: b.flow || b.flow || "wizard",
      enableAnonymousFeedback: b.enableAnonymousFeedback || b.enableAnonymousFeedback,
      allowNonLoggedInFeedback: b.allowNonLoggedInFeedback || b.allowNonLoggedInFeedback,
      tinyNoPointer: b.tinyNoPointer || b.tinyNoPointer,
      disableScreenshotAtStartup: b.disableScreenshotAtStartup || b.disableScreenshotAtStartup,
      disableScreenshotting: b.disableScreenshotting || b.disableScreenshotting,
      feedbackServerUri: b.feedbackServerUri || b.feedbackServerUri,
      colorScheme: b.colorScheme || b.colorScheme,
      triggerId: b.triggerId || b.triggerId,
      serverEnvironment: b.serverEnvironment || b.serverEnvironment
    };
  }
  function ui(a, b, c) {
    var d = b || {};
    b = ti(a, b);
    var e;
    var f;
    var g;
    var h;
    var k;
    var l;
    var n;
    var q = d.anchor;
    var r = d.channel;
    var p = d.context;
    var v = a.helpCenterPath_;
    var D = d.helpFlowSessionId;
    var O = d.enableSendFeedback || false;
    var rb = d.defaultHelpArticleId;
    var ma = d.supportContentUrl;
    var Ha = d.helpPanelTheme;
    var Bi = d.nd4cSettings ? d.nd4cSettings.isEnabled : false;
    var Ci = d.nd4cSettings ? d.nd4cSettings.countryCode : "";
    var Di = d.userIp ? d.userIp : "";
    var Ei = d.defaultHelpArticleFragment;
    var Fi = d.suggestHost;
    var Gi = a.renderApiUri_;
    var Hi = d.symptom;
    var Ii = d.timezone;
    var Ji = d.directToGetHelp || false;
    var Ki = (e = d.helpGuideOptions) == null ? undefined : e.openToHelpGuideEntryButtonId;
    e = (f = d.helpGuideOptions) == null ? undefined : f.enableHelpGuideMaximize;
    f = ((g = d.helpGuideOptions) == null ? undefined : g.enableHelpGuideConversationalAi) === false ? false : true;
    g = (h = d.helpGuideOptions) == null ? undefined : h.enableHelpGuideHumanChat;
    h = a.window_.location.protocol + "//" + a.window_.location.host;
    var Li = d.helpPanelMode;
    var Mi = d.fixedHelpPanelContainer;
    var Ni = d.customHelpPanelContainer;
    var Oi = a.frdProductDataBase64EncodedString_;
    var Pi = d.onCloseCallback;
    var Qi = d.onMinimizeCallback;
    var Ri = d.onLoadCallback;
    var Si = d.onPromotedProductLinkClickCallback;
    var Ti = d.onGseEventCallback;
    var Ui = d.openingMode;
    var Vi = d.minimizeMode;
    var Wi = ((k = d.helpGuideOptions) == null ? 0 : k.helpGuideHelpCenterEmbedEntryPoint) ? si(d.helpGuideOptions.helpGuideHelpCenterEmbedEntryPoint) : undefined;
    k = ((l = d.helpGuideOptions) == null ? 0 : l.helpGuideCommonEmbedEntryPoint) ? si(d.helpGuideOptions.helpGuideCommonEmbedEntryPoint) : undefined;
    a: {
      var Kf;
      if ((Kf = d.helpGuideOptions) == null ? 0 : Kf.helpGuideStartingFlowSerializedJspb) {
        try {
          var Ed = mb(d.helpGuideOptions.helpGuideStartingFlowSerializedJspb);
          break a;
        } catch (Xi) {
          Ed = undefined;
          break a;
        }
      }
      var Lf;
      Ed = ((Lf = d.helpGuideOptions) == null ? 0 : Lf.helpGuideStartingFlow) ? si(d.helpGuideOptions.helpGuideStartingFlow) : undefined;
    }
    a: {
      var Mf;
      if ((Mf = d.helpGuideOptions) == null ? 0 : Mf.gseSessionOptionsSerializedJspb) {
        try {
          var Fd = mb(d.helpGuideOptions.gseSessionOptionsSerializedJspb);
          break a;
        } catch (Xi) {
          Fd = undefined;
          break a;
        }
      }
      var Nf;
      Fd = ((Nf = d.helpGuideOptions) == null ? 0 : Nf.gseSessionOptions) ? si(d.helpGuideOptions.gseSessionOptions) : undefined;
    }
    a = {
      anchor: q,
      channel: r,
      flow: "help",
      helpCenterContext: p,
      helpCenterPath: v,
      helpFlowSessionId: D,
      enableSendFeedback: O,
      defaultHelpArticleId: rb,
      supportContentUrl: ma,
      helpPanelTheme: Ha,
      nd4cSettingsIsEnabled: Bi,
      nd4cSettingsCountryCode: Ci,
      userIp: Di,
      defaultHelpArticleFragment: Ei,
      newApi: true,
      suggestHost: Fi,
      renderApiUri: Gi,
      symptom: Hi,
      timezone: Ii,
      directToGetHelp: Ji,
      openToHelpGuideEntryButtonId: Ki,
      enableHelpGuideMaximize: e,
      enableHelpGuideConversationalAi: f,
      enableHelpGuideHumanChat: g,
      startedFromHelpApi: true,
      domain: h,
      helpPanelMode: Li,
      fixedHelpPanelContainer: Mi,
      customHelpPanelContainer: Ni,
      frdProductData: Oi,
      onCloseCallback: Pi,
      onMinimizeCallback: Qi,
      onLoadCallback: Ri,
      onPromotedProductLinkClickCallback: Si,
      onGseEventCallback: Ti,
      openingMode: Ui,
      minimizeMode: Vi,
      helpGuideHelpCenterEmbedEntryPoint: Wi,
      helpGuideCommonEmbedEntryPoint: k,
      helpGuideStartingFlow: Ed,
      gseSessionOptions: Fd,
      helpPanelStartTimeMs: c,
      asxUiUri: a.asxUiUri_,
      disableEndUserCredentials: d.disableEndUserCredentials,
      gsePageUrl: (n = d.helpGuideOptions) == null ? undefined : n.pageUrl
    };
    hd(b, a);
    return b;
  }
  m = Z.prototype;
  m.loadChatSupport = function (a) {
    var b = a || {};
    a = a ? ui(this, a) : {};
    hd(a, {
      escalationJSONString: b.escalationJSONString
    });
    mi(a, this.productData_);
  };
  m.requestSurvey = function (a) {
    if (!vi(a.triggerId)) {
      throw Error("Invalid triggerId");
    }
    var b = Date.now();
    wi(this, a, false).then(function (c, d) {
      var e = d.getSurveyPayload();
      if (e) {
        var f = xi(e);
        var g;
        if (d.getSession() && Re(d.getSession())) {
          g = Re(d.getSession());
        }
        var h = {
          surveyData: {
            surveyData: JSON.stringify(Gc(d)),
            triggerRequestTime: b,
            apiKey: this.apiKey_,
            nonProd: a.nonProd,
            language: e.getLanguage(),
            libraryVersion: 438217234,
            surveyMetadata: {
              triggerId: a.triggerId,
              sessionId: g,
              surveyId: d.getSurveyId()
            },
            feedback1pEnabled: Sg(L(this.surveyStartupConfig_, Rg, 1)),
            thirdPartyDomainSupportEnabled: this.thirdPartyDomainSupportEnabled_
          },
          triggerId: a.triggerId,
          surveyError: null
        };
        setTimeout(function () {
          return c(h);
        }, f * 1000);
      } else {
        h = {
          surveyData: null,
          triggerId: a.triggerId,
          surveyId: a.surveyIdForTestingMode,
          surveyError: {
            reason: "No eligible surveys."
          }
        };
        c(h);
      }
    }.bind(this, a.callback), function (c) {
      var d = "";
      try {
        d = JSON.stringify(c);
      } catch (e) {
        d = "message: " + c.message + ", stack: " + c.stack;
      }
      a.callback({
        surveyData: null,
        triggerId: a.triggerId,
        surveyError: {
          reason: "Failed to trigger survey: " + d
        }
      });
    });
  };
  m.presentSurvey = function (a) {
    if (a.surveyData) {
      var b = a.surveyData && a.surveyData.surveyData && a.surveyData.surveyData.surveyData ? a.surveyData.surveyData : a.surveyData;
      switch (a.defaultStyle) {
        case 1:
          var c;
          a.promptStyle = (c = a.promptStyle) != null ? c : 2;
          var d;
          a.completionStyle = (d = a.completionStyle) != null ? d : 2;
          break;
        default:
          var e;
          a.promptStyle = (e = a.promptStyle) != null ? e : 1;
          var f;
          a.completionStyle = (f = a.completionStyle) != null ? f : 1;
      }
      c = dd(Ue, b.surveyData).getSurveyPayload();
      d = a.promptStyle;
      e = c.getDisplaySettings().getAllowedPromptStyleList();
      a: if (d) {
        switch (d) {
          case 1:
            d = e.includes(1);
            break a;
          case 2:
            d = e.includes(2);
            break a;
        }
        d = false;
      } else {
        d = true;
      }
      if (d) {
        d = a.completionStyle;
        c = c.getCompletion().getAllowedCompletionStyleList();
        a: if (d) {
          switch (d) {
            case 1:
              c = c.includes(1);
              break a;
            case 2:
              c = c.includes(2);
              break a;
          }
          c = false;
        } else {
          c = true;
        }
        if (c) {
          if (a.parentDomElementId != undefined && a.parentDomElementId != "" && document.getElementById(a.parentDomElementId) == null) {
            if (a.listener && a.listener.surveyPrompted) {
              a.listener.surveyPrompted(a.surveyData, {
                reason: "Invalid parent dom element id"
              });
            }
          } else {
            c = b.nonProd ? "nonprod" : "prod";
            d = a.colorScheme === 2 ? "dark" : "light";
            e = document.body;
            a: {
              f = xd(e);
              if (f.defaultView && f.defaultView.getComputedStyle && (f = f.defaultView.getComputedStyle(e, null))) {
                f = f.direction || f.getPropertyValue("direction") || "";
                break a;
              }
              f = "";
            }
            f = (f || (e.currentStyle ? e.currentStyle.direction : null) || e.style && e.style.direction) == "rtl" ? "rtl" : "ltr";
            if (a.completionStyle === 2 && !yi("https://gstatic.com/uservoice/surveys/resources/" + c + "/js/survey/survey_" + d + "_" + f + ".css")) {
              zi();
              e = document.createElement("link");
              c = S(oi, c, d, f);
              if (c instanceof Ra) {
                e.href = Ta(c).toString();
                e.rel = "stylesheet";
              } else {
                if (vd.indexOf("stylesheet") === -1) {
                  throw Error("TrustedResourceUrl href attribute required with rel=\"stylesheet\"");
                }
                c = rd(c);
                if (c !== undefined) {
                  e.href = c;
                  e.rel = "stylesheet";
                }
              }
              document.head.appendChild(e);
            }
            Ai(this, a, b);
          }
        } else if (a.listener && a.listener.surveyPrompted) {
          a.listener.surveyPrompted(a.surveyData, {
            reason: "Invalid completion style"
          });
        }
      } else if (a.listener && a.listener.surveyPrompted) {
        a.listener.surveyPrompted(a.surveyData, {
          reason: "Invalid prompt style"
        });
      }
    }
  };
  m.dismissSurvey = function (a) {
    if (window.hatsNextGlobalObject && window.hatsNextGlobalObject.dismissSurvey) {
      window.hatsNextGlobalObject.dismissSurvey(a.surveyMetadata);
    }
  };
  m.scheduleSurvey = function (a) {
    if (!vi(a.triggerId)) {
      throw Error("Invalid triggerId");
    }
    wi(this, a, true).then(function (b) {
      b({
        surveyData: null,
        triggerId: a.triggerId,
        surveyId: a.surveyIdForTestingMode,
        surveyError: {
          reason: "Survey scheduled for later."
        }
      });
    }.bind(this, a.callback), function (b) {
      var c = "";
      try {
        c = JSON.stringify(b);
      } catch (d) {
        c = "message: " + b.message + ", stack: " + b.stack;
      }
      a.callback({
        surveyData: null,
        triggerId: a.triggerId,
        surveyError: {
          reason: "Failed to trigger survey: " + c
        }
      });
    });
  };
  m.registerHelpAction = function (a, b, c) {
    Yi().register(a, b, c);
  };
  m.executeHelpAction = function (a, b) {
    Yi().execute(a, b);
  };
  m.isHelpActionApplicable = function (a) {
    return Yi().isApplicable(a);
  };
  function Zi(a, b) {
    if (b.enableFeedback1pEndpoint && b.enableTestingMode) {
      a.surveyStartupConfig_ = Yg(new Xg(), Tg(true));
      return Promise.resolve(a.surveyStartupConfig_);
    }
    b = new Be({
      serverUrl: b.nonProd ? "https://stagingqual-feedback-pa-googleapis.sandbox.google.com" : "https://feedback-pa.clients6.google.com",
      apiKey: "AIzaSyCB6OnnfuitFnaYWu4BvtGKaoLFk4cm-GE",
      authUser: b.authuser
    });
    var c = Wg(new Vg(), (a.productId_ || "").toString()).setPlatform(1);
    return Ce(b, "POST", "v1/survey/startup_config", c, Xg).then(function (d) {
      return a.surveyStartupConfig_ = d;
    });
  }
  function wi(a, b, c) {
    return Zi(a, b).then(function (d) {
      if (Sg(L(d, Rg, 1))) {
        d = new Be({
          serverUrl: b.nonProd ? "https://stagingqual-feedback-pa-googleapis.sandbox.google.com" : "https://feedback-pa.clients6.google.com",
          apiKey: a.apiKey_,
          authUser: b.authuser
        });
        var e = $i(a, b);
        var f = He();
        f = new Ig().setTimezoneOffset(f);
        var g = new Jg().setPlatform(1).setLibraryVersionInt(438217234).setSupportedCapabilityList([1, 2]);
        var h = b.preferredSurveyLanguageList && b.preferredSurveyLanguageList.length > 0 ? b.preferredSurveyLanguageList : [a.locale_];
        h = new Ug().setTriggerId(b.triggerId).setLanguageList(h).setTestingMode(!!b.enableTestingMode);
        if (b.surveyIdForTestingMode != "" && b.surveyIdForTestingMode != undefined && b.enableTestingMode == 1) {
          h.setSurveyId(b.surveyIdForTestingMode);
        }
        f = new Zg().setTriggerContext(h).setClientContext(new Kg().setDeviceInfo(f).setLibraryInfo(g));
        if (c != "" && c != undefined && c == 1) {
          f.setScheduledSurveyContext(new Pg().setIsScheduledSurvey(c));
        }
        d = Ce(d, "POST", e, f, $g);
      } else {
        d = aj(a, b, c);
      }
      return d;
    }, function () {
      return aj(a, b, c);
    });
  }
  function $i(a, b) {
    var c = [];
    var d = ah(z == null ? undefined : z.location.href);
    var e = [];
    var f;
    if (f = z.__SAPISID || z.__APISID || z.__3PSAPISID || z.__1PSAPISID || z.__OVERRIDE_SID) {
      f = true;
    } else {
      if (typeof document !== "undefined") {
        f = new fh();
        f = f.get("SAPISID") || f.get("APISID") || f.get("__Secure-3PAPISID") || f.get("__Secure-1PAPISID");
      }
      f = !!f;
    }
    if (f) {
      f = (d = d.indexOf("https:") == 0 || d.indexOf("chrome-extension:") == 0 || d.indexOf("chrome-untrusted://new-tab-page") == 0 || d.indexOf("moz-extension:") == 0) ? z.__SAPISID : z.__APISID;
      if (!f && typeof document !== "undefined") {
        f = new fh();
        f = f.get(d ? "SAPISID" : "APISID") || f.get("__Secure-3PAPISID");
      }
      if (f = f ? dh(f, d ? "SAPISIDHASH" : "APISIDHASH", c) : null) {
        e.push(f);
      }
      if (d) {
        if (d = hh("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", c)) {
          e.push(d);
        }
        if (c = hh("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", c)) {
          e.push(c);
        }
      }
    }
    e = e.length == 0 ? null : e.join(" ");
    if (b.thirdPartyDomainSupportEnabled != undefined && b.thirdPartyDomainSupportEnabled) {
      a.thirdPartyDomainSupportEnabled_ = true;
      e = false;
    }
    if (e) {
      return "v1/survey/trigger";
    } else {
      return "v1/survey/trigger/trigger_anonymous";
    }
  }
  function aj(a, b, c) {
    var d = new Be({
      serverUrl: b.nonProd ? "https://test-scone-pa-googleapis.sandbox.google.com" : "https://scone-pa.clients6.google.com",
      apiKey: a.apiKey_,
      authUser: b.authuser
    });
    var e = $i(a, b);
    var f = He();
    f = new Ie().setTimezoneOffset(f);
    var g = new Je().setPlatform(1).setLibraryVersionInt(438217234).setSupportedCapabilityList([1, 2]);
    a = b.preferredSurveyLanguageList && b.preferredSurveyLanguageList.length > 0 ? b.preferredSurveyLanguageList : [a.locale_];
    a = new Se().setTriggerId(b.triggerId).setLanguageList(a).setTestingMode(!!b.enableTestingMode);
    if (b.surveyIdForTestingMode != "" && b.surveyIdForTestingMode != undefined && b.enableTestingMode == 1) {
      a.setSurveyId(b.surveyIdForTestingMode);
    }
    b = new Te().setTriggerContext(a).setClientContext(new Ke().setDeviceInfo(f).setLibraryInfo(g));
    if (c != "" && c != undefined && c == 1) {
      b.setScheduledSurveyContext(new Pe().setIsScheduledSurvey(c));
    }
    return Ce(d, "POST", e, b, Ue);
  }
  function vi(a) {
    return typeof a == "string" && !!a.match(/^[A-Za-z0-9]+$/);
  }
  function xi(a) {
    try {
      var b = parseInt;
      var c = a.getDisplaySettings().getPromptDelay();
      var d = L(c, W, 1);
      var e = b(ih(d.getSeconds()), 10);
      if (isNaN(e)) {
        e = 0;
      }
    } catch (k) {
      e = 0;
    }
    try {
      b = parseInt;
      var f = a.getDisplaySettings().getPromptDelay();
      var g = L(f, W, 2);
      var h = b(ih(g.getSeconds()), 10);
      if (isNaN(h)) {
        h = 0;
      }
    } catch (k) {
      h = 0;
    }
    return Math.floor(Math.random() * (h - e + 1)) + e;
  }
  function Ai(a, b, c) {
    var d = c.nonProd ? "nonprod" : "prod";
    var e = c.language && Cg[c.language.toLowerCase()] ? Cg[c.language.toLowerCase()] : Cg[a.locale_.toLowerCase()];
    e = e && e.replace("-", "_");
    if (e === "fa") {
      e = "en";
    }
    var f = e ? encodeURI(e) : "en";
    if (b.enableReloadScriptWhenLanguageChanges && !bj("https://www.gstatic.com/uservoice/surveys/resources/" + d + "/js/survey/survey_binary__" + f + ".js")) {
      cj();
    }
    if (window.hatsNextGlobalObject) {
      dj(b, c);
    } else {
      e = document.createElement("script");
      d = S(ni, d, f);
      ud(e, d);
      e.type = "text/javascript";
      e.onload = function () {
        return dj(b, c);
      };
      e.onerror = function () {
        if (b.listener && b.listener.surveyPrompted) {
          b.listener.surveyPrompted(c, {
            reason: "Failed to load survey binary"
          });
        }
      };
      e.setAttribute("data-survey-binary", "");
      if (a.nonce_) {
        e.setAttribute("nonce", a.nonce_);
      }
      if (!document.querySelector("[data-survey-binary]")) {
        document.body.appendChild(e);
      }
    }
  }
  function dj(a, b) {
    a: {
      var c = "triggerCutoffTime";
      if (a.parentDomElementId != null && a.parentDomElementId != "") {
        c += "_" + a.parentDomElementId;
      }
      if (window.hatsNextGlobalObject && window.hatsNextGlobalObject[c]) {
        if (window.hatsNextGlobalObject[c] > b.triggerRequestTime) {
          if (a.listener && a.listener.surveyPrompted) {
            a.listener.surveyPrompted(b, {
              reason: "Survey was triggered before the most recent survey event. Please re-trigger the survey."
            });
          }
          c = false;
          break a;
        }
      } else if (pi > b.triggerRequestTime) {
        if (a.listener && a.listener.surveyPrompted) {
          a.listener.surveyPrompted(b, {
            reason: "Survey must be triggered after initializing the help API."
          });
        }
        c = false;
        break a;
      }
      c = Date.now() - b.triggerRequestTime;
      if (c > 86400000) {
        if (a.listener && a.listener.surveyPrompted) {
          a.listener.surveyPrompted(b, {
            reason: "Survey must be triggered within the last 24 hours. Survey was triggered " + (c + " ms ago.")
          });
        }
        c = false;
      } else {
        c = true;
      }
    }
    if (c) {
      window.hatsNextGlobalObject.initSurvey({
        surveyTriggerResponse: b.surveyData,
        nonprod: b.nonProd,
        darkMode: a.colorScheme == 2,
        seamlessMode: a.seamlessMode,
        zIndex: a.customZIndex,
        triggerRequestTime: b.triggerRequestTime,
        authuser: a.authuser,
        apiKey: b.apiKey,
        locale: b.language,
        customLogoAltText: a.customLogoAltText,
        customLogoUrl: a.customLogoUrl,
        productData: a.productData,
        listener: a.listener,
        surveyData: b,
        surveyMetadata: b.surveyMetadata,
        promptStyle: a.promptStyle ?? 1,
        completionStyle: a.completionStyle ?? 1,
        defaultStyle: a.defaultStyle ?? 0,
        parentDomElementId: a.parentDomElementId,
        persistCompletionCard: a.persistCompletionCard,
        hidePrivacyBanner: a.hidePrivacyBanner,
        hideInlineSurveyBorder: a.hideInlineSurveyBorder,
        hideInlineSurveyBackground: a.hideInlineSurveyBackground,
        feedback1pEnabled: b.feedback1pEnabled,
        thirdPartyDomainSupportEnabled: b.thirdPartyDomainSupportEnabled
      });
    }
  }
  function Yi() {
    var a = A("help.globals.actions", top);
    if (!a) {
      a = new Ve();
      Ea("help.globals.actions", a, top);
    }
    return a;
  }
  function bj(a) {
    return [].concat(la(document.getElementsByTagName("script"))).find(function (b) {
      return b && b.getAttribute("src") === a;
    });
  }
  function cj() {
    [].concat(la(document.getElementsByTagName("script"))).forEach(function (a) {
      var b;
      if (a == null ? 0 : (b = a.getAttribute("src")) == null ? 0 : b.match(ri)) {
        a.parentNode.removeChild(a);
        window.hatsNextGlobalObject = null;
      }
    });
  }
  function zi() {
    document.querySelectorAll("link[rel=stylesheet]").forEach(function (a) {
      var b;
      if (a == null ? 0 : (b = a.getAttribute("href")) == null ? 0 : b.match(qi)) {
        a.parentNode.removeChild(a);
      }
    });
  }
  function si(a) {
    if (!a) {
      return "";
    }
    try {
      return mb(JSON.stringify(Gc(a)));
    } catch (b) {
      console.log("Failed to serialize and encode proto: ", b);
      return "";
    }
  }
  function yi(a) {
    return [].concat(la(document.querySelectorAll("link[rel=stylesheet]"))).find(function (b) {
      return b && b.getAttribute("href") === a;
    });
  }
  Z.prototype.isHelpActionApplicable = Z.prototype.isHelpActionApplicable;
  Z.prototype.executeHelpAction = Z.prototype.executeHelpAction;
  Z.prototype.registerHelpAction = Z.prototype.registerHelpAction;
  Z.prototype.scheduleSurvey = Z.prototype.scheduleSurvey;
  Z.prototype.dismissSurvey = Z.prototype.dismissSurvey;
  Z.prototype.presentSurvey = Z.prototype.presentSurvey;
  Z.prototype.requestSurvey = Z.prototype.requestSurvey;
  Z.prototype.loadChatSupport = Z.prototype.loadChatSupport;
  Z.prototype.startHelpCard = Z.prototype.startHelpCard;
  Z.prototype.startHelp = Z.prototype.startHelp;
  Z.prototype.updateContext = Z.prototype.updateContext;
  Z.prototype.updateProductData = Z.prototype.updateProductData;
  Z.prototype.startFeedback = Z.prototype.startFeedback;
  Ea("help.service.Lazy", Z);
  Ea("help.service.Lazy.create", function (a, b) {
    return new Z(a, b);
  });
}).call(this);