(function() {
  /**
   * @param {(Array|string)} a
   * @return {?}
   */
  function extend(a) {
    /** @type {Array} */
    a = [typeof globalThis == "object" && globalThis, a, typeof window == "object" && window, typeof self == "object" && self, typeof global == "object" && global];
    /** @type {number} */
    var i = 0;
    for (;i < a.length;++i) {
      var b = a[i];
      if (b && b.Math == Math) {
        return b;
      }
    }
    throw Error("Cannot find global object");
  }
  /**
   * @param {string} methodName
   * @param {Function} next
   * @return {undefined}
   */
  function dispatch(methodName, next) {
    if (next) {
      a: {
        var self = oldconfig;
        methodName = methodName.split(".");
        /** @type {number} */
        var method = 0;
        for (;method < methodName.length - 1;method++) {
          var callbackSymbol = methodName[method];
          if (!(callbackSymbol in self)) {
            break a;
          }
          self = self[callbackSymbol];
        }
        methodName = methodName[methodName.length - 1];
        method = self[methodName];
        next = next(method);
        if (next != method && next != null) {
          defineProperty(self, methodName, {
            configurable : true,
            writable : true,
            /** @type {Function} */
            value : next
          });
        }
      }
    }
  }
  /**
   * @param {?} num
   * @param {?} path
   * @param {string} range
   * @return {?}
   */
  function fn(num, path, range) {
    if (num == null) {
      throw new TypeError("The 'this' value for String.prototype." + range + " must not be null or undefined");
    }
    if (path instanceof RegExp) {
      throw new TypeError("First argument to String.prototype." + range + " must not be a regular expression");
    }
    return num + "";
  }
  /**
   * @param {string} object
   * @return {?}
   */
  function seal(object) {
    return object;
  }
  /**
   * @param {?} l
   * @return {undefined}
   */
  function b(l) {
    if (f !== f) {
      throw Error("Bad secret");
    }
    this.l = l;
  }
  /**
   * @param {string} not
   * @return {undefined}
   */
  function filter(not) {
    console.warn("A URL with content '" + not + "' was sanitized away.");
  }
  /**
   * @return {undefined}
   */
  function elem() {
  }
  /**
   * @param {?} text
   * @param {string} x
   * @param {Array} lab
   * @return {?}
   */
  function $(text, x, lab) {
    return text[x] = text[x] || lab;
  }
  /**
   * @param {Array} values
   * @return {?}
   */
  function keys(values) {
    values = values.sort();
    /** @type {Array} */
    var ret = [];
    var value = undefined;
    /** @type {number} */
    var i = 0;
    for (;i < values.length;i++) {
      var val = values[i];
      if (val != value) {
        ret.push(val);
      }
      value = val;
    }
    return ret;
  }
  /**
   * @return {?}
   */
  function create() {
    var data;
    if ((data = Object.create) && rbrace.test(data)) {
      /** @type {Object} */
      data = data(null);
    } else {
      data = {};
      var key;
      for (key in data) {
        data[key] = undefined;
      }
    }
    return data;
  }
  /**
   * @return {?}
   */
  function parse() {
    /** @type {string} */
    var s = l.href;
    if (args.dpo) {
      var body = args.h
    } else {
      body = args.h;
      /** @type {RegExp} */
      var re = RegExp("([#].*&|[#])jsh=([^&#]*)", "g");
      /** @type {RegExp} */
      var regex = RegExp("([?#].*&|[?#])jsh=([^&#]*)", "g");
      if (s = s && (re.exec(s) || regex.exec(s))) {
        try {
          /** @type {string} */
          body = decodeURIComponent(s[2]);
        } catch (e) {
        }
      }
    }
    return body;
  }
  /**
   * @param {Function} fn
   * @return {undefined}
   */
  function runTest(fn) {
    var scripts = $(args, "PQ", []);
    /** @type {Array} */
    args.PQ = [];
    var len = scripts.length;
    if (len === 0) {
      fn();
    } else {
      /** @type {number} */
      var fulfilled = 0;
      /**
       * @return {undefined}
       */
      var err = function() {
        if (++fulfilled === len) {
          fn();
        }
      };
      /** @type {number} */
      var i = 0;
      for (;i < len;i++) {
        scripts[i](err);
      }
    }
  }
  /**
   * @param {string} canvas
   * @return {?}
   */
  function render(canvas) {
    return $($(args, "H", create()), canvas, create());
  }
  /**
   * @param {string} element
   * @param {string} listener
   * @param {string} callback
   * @return {undefined}
   */
  function setup(element, listener, callback) {
    var remove = item.r;
    if (typeof remove === "function") {
      remove(element, listener, callback);
    } else {
      remove.push([element, listener, callback]);
    }
  }
  /**
   * @param {string} method
   * @param {string} s
   * @param {string} value
   * @return {undefined}
   */
  function add(method, s, value) {
    if (s && s.length > 0) {
      s = escape(s);
      if (value && value.length > 0) {
        s += "___" + escape(value);
      }
      if (s.length > 28) {
        s = s.substr(0, 28) + (s.length - 28);
      }
      /** @type {string} */
      value = s;
      s = $(v, "_p", create());
      /** @type {number} */
      $(s, value, create())[method] = (new Date).getTime();
      setup(method, "_p", value);
    }
  }
  /**
   * @param {(Array|RegExp|string)} text
   * @return {?}
   */
  function escape(text) {
    return text.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/,/g, "_");
  }
  /**
   * @param {string} error
   * @return {?}
   */
  function callback(error) {
    throw Error("Bad hint: " + error);
  }
  /**
   * @param {string} s
   * @param {number} value
   * @param {?} j
   * @param {Object} arr
   * @param {Array} b
   * @return {?}
   */
  function walk(s, value, j, arr, b) {
    var sel = s.split(";");
    var key = sel.shift();
    var fn = object[key];
    /** @type {null} */
    var result = null;
    if (fn) {
      result = fn(sel, value, j, arr);
    } else {
      callback("no hint processor for: " + key);
    }
    if (!result) {
      callback("failed to generate load url");
    }
    value = result;
    j = value.match(core_rnotwhite);
    if (!(arr = value.match(rclass)) || (arr.length !== 1 || (!rchecked.test(value) || (!j || j.length !== 1)))) {
      callback("failed sanity: " + s);
    }
    try {
      /** @type {string} */
      s = "?";
      if (b && b.length > 0) {
        /** @type {number} */
        j = value = 0;
        arr = {};
        for (;j < b.length;) {
          var events = b[j++];
          sel = undefined;
          /** @type {string} */
          key = typeof events;
          sel = key == "object" && events != null || key == "function" ? "o" + (Object.prototype.hasOwnProperty.call(events, type) && events[type] || (events[type] = ++i)) : (typeof events).charAt(0) + events;
          if (!Object.prototype.hasOwnProperty.call(arr, sel)) {
            /** @type {boolean} */
            arr[sel] = true;
            b[value++] = events;
          }
        }
        /** @type {number} */
        b.length = value;
        /** @type {string} */
        result = result + "?le=" + b.join(",");
        /** @type {string} */
        s = "&";
      }
      if (args.rol) {
        var items = args.ol;
        if (items && items.length) {
          /** @type {string} */
          result = "" + result + s + "ol=" + items.length;
        }
      }
    } catch (G) {
    }
    return result;
  }
  /**
   * @param {Object} result
   * @param {?} x
   * @param {?} name
   * @param {number} value
   * @return {?}
   */
  function test(result, x, name, value) {
    /**
     * @param {?} text
     * @return {?}
     */
    function f(text) {
      return encodeURIComponent(text).replace(/%2C/g, ",");
    }
    result = next(result);
    if (!rparentsprev.test(name)) {
      callback("invalid_callback");
    }
    x = clean(x);
    value = value && value.length ? clean(value) : null;
    return[encodeURIComponent(result.pathPrefix).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", f(result.version), "/m=", f(x), value ? "/exm=" + f(value) : "", "/rt=j/sv=1/d=1/ed=1", result.g ? "/am=" + f(result.g) : "", result.i ? "/rs=" + f(result.i) : "", result.j ? "/t=" + f(result.j) : "", "/cb=", f(name)].join("");
  }
  /**
   * @param {string} b
   * @return {?}
   */
  function next(b) {
    if (b.charAt(0) !== "/") {
      callback("relative path");
    }
    var path = b.substring(1).split("/");
    /** @type {Array} */
    var j = [];
    for (;path.length;) {
      b = path.shift();
      if (!b.length || b.indexOf(".") == 0) {
        callback("empty/relative directory");
      } else {
        if (b.indexOf("=") > 0) {
          path.unshift(b);
          break;
        }
      }
      j.push(b);
    }
    b = {};
    /** @type {number} */
    var i = 0;
    var e = path.length;
    for (;i < e;++i) {
      var keyValue = path[i].split("=");
      /** @type {string} */
      var a = decodeURIComponent(keyValue[0]);
      /** @type {string} */
      var c = decodeURIComponent(keyValue[1]);
      if (keyValue.length == 2 && (a && c)) {
        b[a] = b[a] || c;
      }
    }
    /** @type {string} */
    path = "/" + j.join("/");
    if (!ignore.test(path)) {
      callback("invalid_prefix");
    }
    /** @type {number} */
    j = 0;
    /** @type {number} */
    i = types.length;
    for (;j < i;++j) {
      if (types[j].test(path)) {
        callback("invalid_prefix");
      }
    }
    j = validate(b, "k", true);
    i = validate(b, "am");
    e = validate(b, "rs");
    b = validate(b, "t");
    return{
      pathPrefix : path,
      version : j,
      g : i,
      i : e,
      j : b
    };
  }
  /**
   * @param {?} array
   * @return {?}
   */
  function clean(array) {
    /** @type {Array} */
    var keys = [];
    /** @type {number} */
    var i = 0;
    var array_length = array.length;
    for (;i < array_length;++i) {
      var name = array[i].replace(/\./g, "_").replace(/-/g, "_");
      if (exclude.test(name)) {
        keys.push(name);
      }
    }
    return keys.join(",");
  }
  /**
   * @param {Object} e
   * @param {string} index
   * @param {boolean} create
   * @return {?}
   */
  function validate(e, index, create) {
    e = e[index];
    if (!e && create) {
      callback("missing: " + index);
    }
    if (e) {
      if (E.test(e)) {
        return e;
      }
      callback("invalid: " + index);
    }
    return null;
  }
  /**
   * @param {Array} segments
   * @param {Array} args
   * @return {?}
   */
  function serialize(segments, args) {
    /** @type {Array} */
    var r = [];
    /** @type {number} */
    var x = 0;
    for (;x < segments.length;++x) {
      var id = segments[x];
      var i;
      if (i = id) {
        a: {
          /** @type {number} */
          i = 0;
          for (;i < args.length;i++) {
            if (args[i] === id) {
              break a;
            }
          }
          /** @type {number} */
          i = -1;
        }
        /** @type {boolean} */
        i = i < 0;
      }
      if (i) {
        r.push(id);
      }
    }
    return r;
  }
  /**
   * @return {?}
   */
  function compile() {
    var data = args.nonce;
    if (data !== undefined) {
      if (data && (data === String(data) && data.match(typePattern))) {
        return data;
      } else {
        return args.nonce = null;
      }
    } else {
      if (doc.querySelector) {
        if (data = doc.querySelector("script[nonce]")) {
          data = data.nonce || (data.getAttribute("nonce") || "");
          if (data && (data === String(data) && data.match(typePattern))) {
            return args.nonce = data;
          } else {
            return args.nonce = null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
  /**
   * @param {string} value
   * @return {undefined}
   */
  function complete(value) {
    if (doc.readyState != "loading") {
      load(value);
    } else {
      var element = compile();
      /** @type {string} */
      var optsData = "";
      if (element !== null) {
        /** @type {string} */
        optsData = ' nonce="' + element + '"';
      }
      /** @type {string} */
      value = "<" + tagName + ' src="' + encodeURI(value) + '"' + optsData + "></" + tagName + ">";
      doc.write(index ? index.createHTML(value) : value);
    }
  }
  /**
   * @param {string} value
   * @return {undefined}
   */
  function load(value) {
    /** @type {Element} */
    var element = doc.createElement(tagName);
    element.setAttribute("src", index ? index.createScriptURL(value) : value);
    value = compile();
    if (value !== null) {
      element.setAttribute("nonce", value);
    }
    /** @type {string} */
    element.async = "true";
    if (value = doc.getElementsByTagName(tagName)[0]) {
      value.parentNode.insertBefore(element, value);
    } else {
      (doc.head || (doc.body || doc.documentElement)).appendChild(element);
    }
  }
  /**
   * @param {?} callback
   * @param {string} type
   * @param {?} err
   * @return {undefined}
   */
  function handler(callback, type, err) {
    ready(function() {
      var arg = type === parse() ? $(all, "_", create()) : create();
      arg = $(render(type), "_", arg);
      callback(arg);
    }, err);
  }
  /**
   * @param {(number|string)} url
   * @param {Object} options
   * @return {undefined}
   */
  function init(url, options) {
    var data = options || {};
    if (typeof options == "function") {
      data = {};
      /** @type {Object} */
      data.callback = options;
    }
    var matches = (options = data) && options._c;
    if (matches) {
      /** @type {number} */
      var i = 0;
      for (;i < queue.length;i++) {
        var sel = queue[i][0];
        var ajax = queue[i][1];
        if (ajax && Object.prototype.hasOwnProperty.call(matches, sel)) {
          ajax(matches[sel], url, options);
        }
      }
    }
    /** @type {Array} */
    options = [];
    if (url) {
      options = url.split(":");
    } else {
      if (data.features) {
        options = data.features;
      }
    }
    if (!(url = data.h) && (url = parse(), !url)) {
      throw Error("Bad hint: !hint");
    }
    update(options || [], data, url);
  }
  /**
   * @param {(Array|string)} value
   * @param {Object} config
   * @param {string} data
   * @return {undefined}
   */
  function update(value, config, data) {
    /**
     * @param {string} obj
     * @param {?} val
     * @return {?}
     */
    function update(obj, val) {
      if (z) {
        return 0;
      }
      root.clearTimeout(timer);
      newArgs.push.apply(newArgs, element);
      var _update = ((all || {}).config || {}).update;
      if (_update) {
        _update(e);
      } else {
        if (e) {
          $(args, "cu", []).push(e);
        }
      }
      if (val) {
        add("me0", obj, udataCur);
        try {
          handler(val, data, msg);
        } finally {
          add("me1", obj, udataCur);
        }
      }
      return 1;
    }
    value = keys(value) || [];
    var cb = config.callback;
    var e = config.config;
    var to = config.timeout;
    var link = config.ontimeout;
    var ret = config.onerror;
    var msg = undefined;
    if (typeof ret == "function") {
      /** @type {Function} */
      msg = ret;
    }
    /** @type {null} */
    var timer = null;
    /** @type {boolean} */
    var z = false;
    if (to && !link || !to && link) {
      throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
    }
    ret = $(render(data), "r", []).sort();
    var newArgs = $(render(data), "L", []).sort();
    var oldconfig = args.le || [];
    /** @type {Array} */
    var udataCur = [].concat(ret);
    if (to > 0) {
      /** @type {number} */
      timer = root.setTimeout(function() {
        /** @type {boolean} */
        z = true;
        link();
      }, to);
    }
    var element = serialize(value, newArgs);
    if (element.length) {
      element = serialize(value, ret);
      var a = $(args, "CP", []);
      var i = a.length;
      /**
       * @param {?} property
       * @return {?}
       */
      a[i] = function(property) {
        /**
         * @param {Function} done
         * @return {undefined}
         */
        function init(done) {
          /** @type {null} */
          a[i] = null;
          if (update(element, property)) {
            runTest(function() {
              if (cb) {
                cb();
              }
              done();
            });
          }
        }
        /**
         * @return {undefined}
         */
        function cb() {
          var next = a[i + 1];
          if (next) {
            next();
          }
        }
        if (!property) {
          return 0;
        }
        add("ml1", element, udataCur);
        if (i > 0 && a[i - 1]) {
          /**
           * @return {undefined}
           */
          a[i] = function() {
            init(cb);
          };
        } else {
          init(cb);
        }
      };
      if (element.length) {
        /** @type {string} */
        var packageDir = "loaded_" + args.I++;
        /**
         * @param {?} b
         * @return {undefined}
         */
        all[packageDir] = function(b) {
          a[i](b);
          /** @type {null} */
          all[packageDir] = null;
        };
        value = walk(data, element, "gapi." + packageDir, ret, oldconfig);
        ret.push.apply(ret, element);
        add("ml0", element, udataCur);
        if (config.sync || root.___gapisync) {
          complete(value);
        } else {
          load(value);
        }
      } else {
        a[i](elem);
      }
    } else {
      if (update(element) && cb) {
        cb();
      }
    }
  }
  /**
   * @param {Function} func
   * @param {?} text
   * @return {?}
   */
  function ready(func, text) {
    if (args.hee && args.hel > 0) {
      try {
        return func();
      } catch (passes) {
        if (text) {
          text(passes);
        }
        args.hel--;
        init("debug_error", function() {
          try {
            window.___jsl.hefn(passes);
          } catch (d) {
            throw passes;
          }
        });
      }
    } else {
      try {
        return func();
      } catch (failures) {
        if (text) {
          text(failures);
        }
        throw failures;
      }
    }
  }
  /** @type {Function} */
  var defineProperty = typeof Object.defineProperties == "function" ? Object.defineProperty : function(object, name, descriptor) {
    if (object == Array.prototype || object == Object.prototype) {
      return object;
    }
    object[name] = descriptor.value;
    return object;
  };
  var oldconfig = extend(this);
  dispatch("String.prototype.endsWith", function(dataAndEvents) {
    if (dataAndEvents) {
      return dataAndEvents;
    } else {
      return function(path, result) {
        var message = fn(this, path, "endsWith");
        path += "";
        if (result === undefined) {
          result = message.length;
        }
        /** @type {number} */
        result = Math.max(0, Math.min(result | 0, message.length));
        /** @type {number} */
        var pl = path.length;
        for (;pl > 0 && result > 0;) {
          if (message[--result] != path[--pl]) {
            return false;
          }
        }
        return pl <= 0;
      };
    }
  });
  dispatch("Object.is", function(dataAndEvents) {
    if (dataAndEvents) {
      return dataAndEvents;
    } else {
      return function(a, b) {
        if (a === b) {
          return a !== 0 || 1 / a === 1 / b;
        } else {
          return a !== a && b !== b;
        }
      };
    }
  });
  dispatch("Array.prototype.includes", function(dataAndEvents) {
    if (dataAndEvents) {
      return dataAndEvents;
    } else {
      return function(f, index) {
        var code = this;
        if (code instanceof String) {
          /** @type {string} */
          code = String(code);
        }
        var len = code.length;
        index = index || 0;
        if (index < 0) {
          /** @type {number} */
          index = Math.max(index + len, 0);
        }
        for (;index < len;index++) {
          var el = code[index];
          if (el === f || Object.is(el, f)) {
            return true;
          }
        }
        return false;
      };
    }
  });
  dispatch("String.prototype.includes", function(dataAndEvents) {
    if (dataAndEvents) {
      return dataAndEvents;
    } else {
      return function(selector, index) {
        return fn(this, selector, "includes").indexOf(selector, index || 0) !== -1;
      };
    }
  });
  window.gapi = window.gapi || {};
  /** @type {number} */
  window.gapi.o = (new Date).getTime();
  var data = this || self;
  /** @type {string} */
  var type = "closure_uid_" + (Math.random() * 1E9 >>> 0);
  /** @type {number} */
  var i = 0;
  var f = {};
  /**
   * @return {?}
   */
  b.prototype.toString = function() {
    return this.l;
  };
  new b("about:blank");
  new b("about:invalid#zClosurez");
  /** @type {Array} */
  var fullName = [];
  if (fullName.indexOf(filter) === -1) {
    fullName.push(filter);
  }
  /** @type {Window} */
  var root = window;
  /** @type {HTMLDocument} */
  var doc = document;
  /** @type {Location} */
  var l = root.location;
  /** @type {RegExp} */
  var rbrace = /\[native code\]/;
  var all = $(root, "gapi", {});
  var args = {};
  args = $(root, "___jsl", create());
  $(args, "I", 0);
  $(args, "hel", 10);
  var item = $(args, "perf", create());
  var g = $(item, "g", create());
  var v = $(item, "i", create());
  $(item, "r", []);
  create();
  create();
  var object = create();
  /** @type {Array} */
  var queue = [];
  queue.push(["jsl", function(elems) {
    var i;
    for (i in elems) {
      if (Object.prototype.hasOwnProperty.call(elems, i)) {
        var el = elems[i];
        if (typeof el == "object") {
          args[i] = $(args, i, []).concat(el);
        } else {
          $(args, i, el);
        }
      }
    }
    if (i = elems.u) {
      elems = $(args, "us", []);
      elems.push(i);
      if (i = /^https:(.*)$/.exec(i)) {
        elems.push("http:" + i[1]);
      }
    }
  }]);
  /** @type {RegExp} */
  var ignore = /^(\/[a-zA-Z0-9_\-]+)+$/;
  /** @type {Array} */
  var types = [/\/amp\//, /\/amp$/, /^\/amp$/];
  /** @type {RegExp} */
  var E = /^[a-zA-Z0-9\-_\.,!]+$/;
  /** @type {RegExp} */
  var rparentsprev = /^gapi\.loaded_[0-9]+$/;
  /** @type {RegExp} */
  var exclude = /^[a-zA-Z0-9,._-]+$/;
  /** @type {RegExp} */
  var rchecked = /^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/;
  /** @type {RegExp} */
  var rclass = /\/cb=/g;
  /** @type {RegExp} */
  var core_rnotwhite = /\/\//g;
  /**
   * @param {HTMLElement} a
   * @param {?} d
   * @param {?} count
   * @param {number} isXML
   * @return {?}
   */
  object.m = function(a, d, count, isXML) {
    if (!(a = a[0])) {
      callback("missing_hint");
    }
    return "https://apis.google.com" + test(a, d, count, isXML);
  };
  /** @type {string} */
  var tagName = "script";
  /** @type {RegExp} */
  var typePattern = /^[-+_0-9\/A-Za-z]+={0,2}$/;
  var error;
  /** @type {null} */
  var err = null;
  var config = data.trustedTypes;
  if (config && config.createPolicy) {
    try {
      err = config.createPolicy("gapi#gapi", {
        /** @type {function (string): ?} */
        createHTML : seal,
        /** @type {function (string): ?} */
        createScript : seal,
        /** @type {function (string): ?} */
        createScriptURL : seal
      });
    } catch (e) {
      if (data.console) {
        data.console.error(e.message);
      }
    }
  }
  error = err;
  var index = error;
  /** @type {function (string, Object): ?} */
  var copies = all.load;
  if (copies) {
    $(args, "ol", []).push(copies);
  }
  /**
   * @param {string} location
   * @param {Object} options
   * @return {?}
   */
  all.load = function(location, options) {
    return ready(function() {
      return init(location, options);
    });
  };
  queue.unshift(["url", function(word, index, el) {
    if (!!word && ((!index || index === "") && !!word.endsWith(".js"))) {
      word = word.substring(0, word.length - 3);
      index = word.lastIndexOf("/") + 1;
      if (!(index >= word.length)) {
        word = word.substr(index).split(":").filter(function(mod) {
          return!["api", "platform"].includes(mod);
        });
        /** @type {string} */
        el.features = word;
      }
    }
  }]);
  g.bs0 = window.gapi._bs || (new Date).getTime();
  setup("bs0");
  /** @type {number} */
  g.bs1 = (new Date).getTime();
  setup("bs1");
  delete window.gapi._bs;
  window.gapi.load("", {
    callback : window.gapi_onload,
    _c : {
      url : "https://apis.google.com/js/api.js",
      jsl : {
        ci : {
          "oauth-flow" : {
            authUrl : "https://accounts.google.com/o/oauth2/auth",
            proxyUrl : "https://accounts.google.com/o/oauth2/postmessageRelay",
            disableOpt : true,
            idpIframeUrl : "https://accounts.google.com/o/oauth2/iframe",
            usegapi : false
          },
          debug : {
            reportExceptionRate : 1,
            forceIm : false,
            rethrowException : true,
            host : "https://apis.google.com"
          },
          gen204logger : {
            interval : 3E4,
            rate : 0.01,
            batch : false
          },
          enableMultilogin : true,
          "googleapis.config" : {
            auth : {
              useFirstPartyAuthV2 : true
            },
            root : "https://content.googleapis.com",
            "root-1p" : "https://clients6.google.com"
          },
          inline : {
            css : 1
          },
          disableRealtimeCallback : false,
          drive_share : {
            skipInitCommand : true
          },
          csi : {
            rate : 0.01
          },
          client : {
            cors : false
          },
          signInDeprecation : {
            rate : 0
          },
          include_granted_scopes : true,
          llang : "en",
          iframes : {
            youtube : {
              params : {
                location : ["search", "hash"]
              },
              url : ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1",
              methods : ["scroll", "openwindow"]
            },
            ytsubscribe : {
              url : "https://www.youtube.com/subscribe_embed?usegapi=1"
            },
            plus_circle : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi=1"
            },
            plus_share : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare=true&usegapi=1"
            },
            rbr_s : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
            },
            ":source:" : "3p",
            playemm : {
              url : "https://play.google.com/work/embedded/search?usegapi=1&usegapi=1"
            },
            savetoandroidpay : {
              url : "https://pay.google.com/gp/v/widget/save"
            },
            blogger : {
              params : {
                location : ["search", "hash"]
              },
              url : ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi=1",
              methods : ["scroll", "openwindow"]
            },
            evwidget : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix:_/events/widget?usegapi=1"
            },
            partnersbadge : {
              url : "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi=1"
            },
            dataconnector : {
              url : "https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi=1"
            },
            surveyoptin : {
              url : "https://www.google.com/shopping/customerreviews/optin?usegapi=1"
            },
            ":socialhost:" : "https://apis.google.com",
            shortlists : {
              url : ""
            },
            hangout : {
              url : "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
            },
            plus_followers : {
              params : {
                url : ""
              },
              url : ":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"
            },
            post : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi=1"
            },
            signin : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix:_/widget/render/signin?usegapi=1",
              methods : ["onauth"]
            },
            rbr_i : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
            },
            share : {
              url : ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi=1"
            },
            plusone : {
              params : {
                count : "",
                size : "",
                url : ""
              },
              url : ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi=1"
            },
            comments : {
              params : {
                location : ["search", "hash"]
              },
              url : ":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1",
              methods : ["scroll", "openwindow"]
            },
            ":im_socialhost:" : "https://plus.googleapis.com",
            backdrop : {
              url : "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi=1"
            },
            visibility : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi=1"
            },
            autocomplete : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix:_/widget/render/autocomplete"
            },
            ":signuphost:" : "https://plus.google.com",
            ratingbadge : {
              url : "https://www.google.com/shopping/merchantverse/?usegapi=1"
            },
            appcirclepicker : {
              url : ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
            },
            follow : {
              url : ":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"
            },
            community : {
              url : ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"
            },
            sharetoclassroom : {
              url : "https://classroom.google.com/sharewidget?usegapi=1"
            },
            ytshare : {
              params : {
                url : ""
              },
              url : ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi=1"
            },
            plus : {
              url : ":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"
            },
            family_creation : {
              params : {
                url : ""
              },
              url : "https://families.google.com/webcreation?usegapi=1&usegapi=1"
            },
            commentcount : {
              url : ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"
            },
            configurator : {
              url : ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"
            },
            zoomableimage : {
              url : "https://ssl.gstatic.com/microscope/embed/"
            },
            appfinder : {
              url : "https://workspace.google.com/:session_prefix:marketplace/appfinder?usegapi=1"
            },
            savetowallet : {
              url : "https://pay.google.com/gp/v/widget/save"
            },
            person : {
              url : ":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"
            },
            savetodrive : {
              url : "https://drive.google.com/savetodrivebutton?usegapi=1",
              methods : ["save"]
            },
            page : {
              url : ":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"
            },
            card : {
              url : ":socialhost:/:session_prefix:_/hovercard/card"
            }
          }
        },
        h : "m;/_/scs/abc-static/_/js/k=gapi.lb.en.W5qDlPExdtA.O/d=1/rs=AHpOoo8JInlRP_yLzwScb00AozrrUS6gJg/m=__features__",
        u : "https://apis.google.com/js/api.js",
        hee : true,
        dpo : false,
        le : ["scs"]
      },
      platform : "backdrop blogger comments commentcount community donation family_creation follow hangout health page partnersbadge person playemm playreview plus plusone post ratingbadge savetoandroidpay savetodrive savetowallet sharetoclassroom shortlists signin2 surveyoptin visibility youtube ytsubscribe zoomableimage".split(" "),
      annotation : ["interactivepost", "recobar", "signin2", "autocomplete"]
    }
  });
  $(args, "le", []).push("fedcm_migration_mod");
}).call(this);

