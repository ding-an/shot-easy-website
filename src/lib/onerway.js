/*! For license information please see pacypay.js.LICENSE.txt */
function getPacypayInstance() {
  var t = {
      61: function (t, e, n) {
        var r = n(698).default;
        function o() {
          "use strict";
          (t.exports = o =
            function () {
              return e;
            }),
            (t.exports.__esModule = !0),
            (t.exports.default = t.exports);
          var e = {},
            n = Object.prototype,
            i = n.hasOwnProperty,
            a =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            c = "function" == typeof Symbol ? Symbol : {},
            u = c.iterator || "@@iterator",
            s = c.asyncIterator || "@@asyncIterator",
            l = c.toStringTag || "@@toStringTag";
          function f(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            f({}, "");
          } catch (t) {
            f = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function p(t, e, n, r) {
            var o = e && e.prototype instanceof d ? e : d,
              i = Object.create(o.prototype),
              c = new O(r || []);
            return (
              a(i, "_invoke", {
                value: _(t, n, c),
              }),
              i
            );
          }
          function h(t, e, n) {
            try {
              return {
                type: "normal",
                arg: t.call(e, n),
              };
            } catch (t) {
              return {
                type: "throw",
                arg: t,
              };
            }
          }
          e.wrap = p;
          var y = {};
          function d() {}
          function m() {}
          function g() {}
          var v = {};
          f(v, u, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            w = b && b(b(C([])));
          w && w !== n && i.call(w, u) && (v = w);
          var x = (g.prototype = d.prototype = Object.create(v));
          function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              f(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function k(t, e) {
            function n(o, a, c, u) {
              var s = h(t[o], t, a);
              if ("throw" !== s.type) {
                var l = s.arg,
                  f = l.value;
                return f && "object" == r(f) && i.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        n("next", t, c, u);
                      },
                      function (t) {
                        n("throw", t, c, u);
                      }
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (l.value = t), c(l);
                      },
                      function (t) {
                        return n("throw", t, c, u);
                      }
                    );
              }
              u(s.arg);
            }
            var o;
            a(this, "_invoke", {
              value: function (t, r) {
                function i() {
                  return new e(function (e, o) {
                    n(t, r, e, o);
                  });
                }
                return (o = o ? o.then(i, i) : i());
              },
            });
          }
          function _(t, e, n) {
            var r = "suspendedStart";
            return function (o, i) {
              if ("executing" === r)
                throw new Error("Generator is already running");
              if ("completed" === r) {
                if ("throw" === o) throw i;
                return L();
              }
              for (n.method = o, n.arg = i; ; ) {
                var a = n.delegate;
                if (a) {
                  var c = P(a, n);
                  if (c) {
                    if (c === y) continue;
                    return c;
                  }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg;
                else if ("throw" === n.method) {
                  if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
                  n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                r = "executing";
                var u = h(t, e, n);
                if ("normal" === u.type) {
                  if (
                    ((r = n.done ? "completed" : "suspendedYield"), u.arg === y)
                  )
                    continue;
                  return {
                    value: u.arg,
                    done: n.done,
                  };
                }
                "throw" === u.type &&
                  ((r = "completed"), (n.method = "throw"), (n.arg = u.arg));
              }
            };
          }
          function P(t, e) {
            var n = e.method,
              r = t.iterator[n];
            if (void 0 === r)
              return (
                (e.delegate = null),
                ("throw" === n &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  P(t, e),
                  "throw" === e.method)) ||
                  ("return" !== n &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + n + "' method"
                    )))),
                y
              );
            var o = h(r, t.iterator, e.arg);
            if ("throw" === o.type)
              return (
                (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), y
              );
            var i = o.arg;
            return i
              ? i.done
                ? ((e[t.resultName] = i.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  y)
                : i
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                y);
          }
          function E(t) {
            var e = {
              tryLoc: t[0],
            };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function I(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function O(t) {
            (this.tryEntries = [
              {
                tryLoc: "root",
              },
            ]),
              t.forEach(E, this),
              this.reset(!0);
          }
          function C(t) {
            if (t) {
              var e = t[u];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  r = function e() {
                    for (; ++n < t.length; )
                      if (i.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (r.next = r);
              }
            }
            return {
              next: L,
            };
          }
          function L() {
            return {
              value: void 0,
              done: !0,
            };
          }
          return (
            (m.prototype = g),
            a(x, "constructor", {
              value: g,
              configurable: !0,
            }),
            a(g, "constructor", {
              value: m,
              configurable: !0,
            }),
            (m.displayName = f(g, l, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === m || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, g)
                  : ((t.__proto__ = g), f(t, l, "GeneratorFunction")),
                (t.prototype = Object.create(x)),
                t
              );
            }),
            (e.awrap = function (t) {
              return {
                __await: t,
              };
            }),
            S(k.prototype),
            f(k.prototype, s, function () {
              return this;
            }),
            (e.AsyncIterator = k),
            (e.async = function (t, n, r, o, i) {
              void 0 === i && (i = Promise);
              var a = new k(p(t, n, r, o), i);
              return e.isGeneratorFunction(n)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            S(x),
            f(x, l, "Generator"),
            f(x, u, function () {
              return this;
            }),
            f(x, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var r in e) n.push(r);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = C),
            (O.prototype = {
              constructor: O,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(I),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      i.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(n, r) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = n),
                    r && ((e.method = "next"), (e.arg = void 0)),
                    !!r
                  );
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    a = o.completion;
                  if ("root" === o.tryLoc) return n("end");
                  if (o.tryLoc <= this.prev) {
                    var c = i.call(o, "catchLoc"),
                      u = i.call(o, "finallyLoc");
                    if (c && u) {
                      if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var r = this.tryEntries[n];
                  if (
                    r.tryLoc <= this.prev &&
                    i.call(r, "finallyLoc") &&
                    this.prev < r.finallyLoc
                  ) {
                    var o = r;
                    break;
                  }
                }
                o &&
                  ("break" === t || "continue" === t) &&
                  o.tryLoc <= e &&
                  e <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), y)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  y
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), I(n), y;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      I(n);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, n) {
                return (
                  (this.delegate = {
                    iterator: C(t),
                    resultName: e,
                    nextLoc: n,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  y
                );
              },
            }),
            e
          );
        }
        (t.exports = o),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports);
      },
      698: function (t) {
        function e(n) {
          return (
            (t.exports = e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            (t.exports.__esModule = !0),
            (t.exports.default = t.exports),
            e(n)
          );
        }
        (t.exports = e),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports);
      },
      687: function (t, e, n) {
        var r = n(61)();
        t.exports = r;
        try {
          regeneratorRuntime = r;
        } catch (t) {
          "object" == typeof globalThis
            ? (globalThis.regeneratorRuntime = r)
            : Function("r", "regeneratorRuntime = r")(r);
        }
      },
    },
    e = {};
  function n(r) {
    var o = e[r];
    if (void 0 !== o) return o.exports;
    var i = (e[r] = {
      exports: {},
    });
    return t[r](i, i.exports, n), i.exports;
  }
  (n.n = function (t) {
    var e =
      t && t.__esModule
        ? function () {
            return t.default;
          }
        : function () {
            return t;
          };
    return (
      n.d(e, {
        a: e,
      }),
      e
    );
  }),
    (n.d = function (t, e) {
      for (var r in e)
        n.o(e, r) &&
          !n.o(t, r) &&
          Object.defineProperty(t, r, {
            enumerable: !0,
            get: e[r],
          });
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    });
  var r = {};
  return (
    (function () {
      "use strict";
      function t(e) {
        return (
          (t =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          t(e)
        );
      }
      function e(e) {
        var n = (function (e, n) {
          if ("object" !== t(e) || null === e) return e;
          var r = e[Symbol.toPrimitive];
          if (void 0 !== r) {
            var o = r.call(e, n || "default");
            if ("object" !== t(o)) return o;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === n ? String : Number)(e);
        })(e, "string");
        return "symbol" === t(n) ? n : String(n);
      }
      function o(t, n) {
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(t, e(o.key), o);
        }
      }
      function i(t, n, r) {
        return (
          (n = e(n)) in t
            ? Object.defineProperty(t, n, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[n] = r),
          t
        );
      }
      function a(t, e, n, r, o, i, a) {
        try {
          var c = t[i](a),
            u = c.value;
        } catch (t) {
          return void n(t);
        }
        c.done ? e(u) : Promise.resolve(u).then(r, o);
      }
      function c(t) {
        return function () {
          var e = this,
            n = arguments;
          return new Promise(function (r, o) {
            var i = t.apply(e, n);
            function c(t) {
              a(i, r, o, c, u, "next", t);
            }
            function u(t) {
              a(i, r, o, c, u, "throw", t);
            }
            c(void 0);
          });
        };
      }
      n.d(r, {
        default: function () {
          return b;
        },
      });
      var u = n(687),
        s = n.n(u),
        l = function (t, e) {
          var n = JSON.parse(e).iframeId,
            r = document.getElementById(n);
          r &&
            r.contentWindow.postMessage(
              {
                action: t,
                data: e,
              },
              "*"
            );
        },
        f = (function () {
          var t = c(
            s().mark(function t(e) {
              return s().wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (!window.ApplePaySession) {
                          t.next = 12;
                          break;
                        }
                        return (
                          (t.prev = 1),
                          (t.next = 4),
                          window.ApplePaySession.canMakePayments()
                        );
                      case 4:
                        if (!t.sent) {
                          t.next = 7;
                          break;
                        }
                        return t.abrupt("return", !0);
                      case 7:
                        t.next = 12;
                        break;
                      case 9:
                        (t.prev = 9),
                          (t.t0 = t.catch(1)),
                          console.error(
                            "ApplePay canMakePaymentsWithActiveCard error",
                            t.t0
                          );
                      case 12:
                        return t.abrupt("return", !1);
                      case 13:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                null,
                [[1, 9]]
              );
            })
          );
          return function (e) {
            return t.apply(this, arguments);
          };
        })(),
        p = (function () {
          var t = c(
            s().mark(function t(e, n) {
              var r, o, i;
              return s().wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (r = JSON.parse(e)),
                          (o = r.iframeId),
                          (t.prev = 2),
                          (t.next = 5),
                          f()
                        );
                      case 5:
                        if (!t.sent) {
                          t.next = 12;
                          break;
                        }
                        return (
                          ((i = new window.ApplePaySession(
                            1,
                            r.request
                          )).onvalidatemerchant = function (t) {
                            l(
                              "check_apple_pay_session",
                              JSON.stringify({
                                website: window.location.hostname,
                                verifyUrl: t.validationURL,
                                iframeId: o,
                              })
                            );
                          }),
                          (i.onpaymentauthorized = function (t) {
                            var e = t.payment.token;
                            l(
                              "apple_pay_submit",
                              JSON.stringify({
                                applePaymentToken: e,
                                iframeId: o,
                              })
                            );
                          }),
                          (i.oncancel = function (t) {
                            n[o] && n[o].onSubmitting && n[o].onSubmitting(!1);
                          }),
                          i.begin(),
                          t.abrupt("return", i)
                        );
                      case 12:
                        t.next = 16;
                        break;
                      case 14:
                        (t.prev = 14), (t.t0 = t.catch(2));
                      case 16:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                null,
                [[2, 14]]
              );
            })
          );
          return function (e, n) {
            return t.apply(this, arguments);
          };
        })(),
        h = function () {
          return (
            {
              sandbox: "https://sandbox-checkout-sdk.onerway.com",
              production: "https://checkout-sdk.onerway.com",
            }[
              (arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "production"
              ).toLowerCase()
            ] || "https://checkout-sdk.onerway.com"
          );
        },
        y = {},
        d = null;
      function m(t) {
        return g.apply(this, arguments);
      }
      function g() {
        return (g = c(
          s().mark(function t(e) {
            var n, r, o, i, a, c, u, h;
            return s().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    (n = e.data || {}),
                      (r = n.action),
                      (o = n.data),
                      (i = {}),
                      (t.t0 = r),
                      (t.next =
                        "pacypay_onsubmit" === t.t0
                          ? 5
                          : "pacypay_checkout_success" === t.t0
                          ? 8
                          : "pacypay_checkout_error" === t.t0
                          ? 23
                          : "pacypay_checkout_wh" === t.t0
                          ? 26
                          : "apple_pay_check_availability" === t.t0
                          ? 28
                          : "apple_pay_start" === t.t0
                          ? 34
                          : "apple_pay_session_validation" === t.t0
                          ? 38
                          : "apple_pay_completed" === t.t0
                          ? 40
                          : 43);
                    break;
                  case 5:
                    return (
                      (i = JSON.parse(o)).iframeId
                        ? ((a = i.iframeId),
                          y[a] &&
                            y[a].onSubmitting &&
                            y[a].onSubmitting(i.loading))
                        : y.original &&
                          y.original.onSubmitting &&
                          y.original.onSubmitting(i.loading),
                      t.abrupt("break", 43)
                    );
                  case 8:
                    if (!(i = JSON.parse(o)).iframeId) {
                      t.next = 18;
                      break;
                    }
                    if (
                      ((c = i.iframeId),
                      delete i.iframeId,
                      !y[c] || !y[c].onSubmitting)
                    ) {
                      t.next = 15;
                      break;
                    }
                    return (t.next = 15), y[c].onSubmitting(!1);
                  case 15:
                    i.respCode
                      ? y[c] &&
                        y[c].onPaymentCompleted &&
                        y[c].onPaymentCompleted(i)
                      : y[c] &&
                        y[c].onPaymentCompleted &&
                        y[c].onPaymentCompleted({
                          respCode: "20000",
                          respMsg: "Success",
                          data: i,
                        }),
                      (t.next = 22);
                    break;
                  case 18:
                    if (!y.original || !y.original.onSubmitting) {
                      t.next = 21;
                      break;
                    }
                    return (t.next = 21), y.original.onSubmitting(!1);
                  case 21:
                    y.original &&
                      y.original.onPaymentCompleted &&
                      y.original.onPaymentCompleted(i);
                  case 22:
                    return t.abrupt("break", 43);
                  case 23:
                    return (
                      (i = JSON.parse(o)).iframeId
                        ? ((u = i.iframeId),
                          delete i.iframeId,
                          y[u] && y[u].onSubmitting && y[u].onSubmitting(!1),
                          y[u] && y[u].onError && y[u].onError(i))
                        : y.original
                        ? (y.original.onSubmitting &&
                            y.original.onSubmitting(!1),
                          y.original.onError && y.original.onError(i))
                        : Object.keys(y).forEach(function (t) {
                            y[t].onSubmitting && y[t].onSubmitting(!1),
                              y[t].onError && y[t].onError(i);
                          }),
                      t.abrupt("break", 43)
                    );
                  case 26:
                    return (
                      Object.keys(y).forEach(function (t) {
                        ("original" === t ||
                          (y[t].props &&
                            (!y[t].props.mode ||
                              0 === y[t].props.mode.length ||
                              "CARD" === y[t].props.mode ||
                              y[t].props.mode.includes("CARD")))) &&
                          y[t].onChangeWH &&
                          y[t].onChangeWH(o);
                      }),
                      t.abrupt("break", 43)
                    );
                  case 28:
                    return (
                      (i = JSON.parse(o)),
                      (t.next = 31),
                      f(i.merchantIdentifier)
                    );
                  case 31:
                    return (
                      (h = t.sent),
                      l(
                        "apple_pay_init",
                        JSON.stringify({
                          iframeId: i.iframeId,
                          availability: h,
                        })
                      ),
                      t.abrupt("break", 43)
                    );
                  case 34:
                    return (t.next = 36), p(o, y);
                  case 36:
                    return (d = t.sent), t.abrupt("break", 43);
                  case 38:
                    try {
                      (i = JSON.parse(o)),
                        d.completeMerchantValidation(i.mSession);
                    } catch (t) {}
                    return t.abrupt("break", 43);
                  case 40:
                    return (
                      "F" === (i = JSON.parse(o)).status
                        ? d.completePayment(d.STATUS_FAILURE)
                        : d.completePayment(d.STATUS_SUCCESS),
                      t.abrupt("break", 43)
                    );
                  case 43:
                  case "end":
                    return t.stop();
                }
            }, t);
          })
        )).apply(this, arguments);
      }
      var v = (function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            if (
              ((function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
              i(this, "props", void 0),
              i(this, "container", void 0),
              i(this, "onPaymentCompleted", void 0),
              i(this, "onError", void 0),
              i(this, "_initContainerHeight", void 0),
              i(this, "_isSubmitting", !1),
              !t)
            )
              throw "Pacypay -> transactionId is null!";
            this.props = n;
            var r = "iframe_"
              .concat(new Date().getTime(), "_")
              .concat(Math.floor(1e3 * Math.random()));
            n.mode ? (y[r] = this) : (y.original = this),
              (this.container = n.container || "pacypay_checkout"),
              (this.onPaymentCompleted = n.onPaymentCompleted),
              (this.onError = n.onError),
              (this.onSubmit = n.onSubmit),
              (this.iframeId = r),
              this.createCheckout(n, t);
          }
          var n, r, a, u;
          return (
            (n = e),
            (r = [
              {
                key: "createCheckout",
                value: function (e, n) {
                  var r = this,
                    o = {};
                  try {
                    o = this.checkMerchant(e.environment);
                    var i = document.getElementById(this.container);
                    this._initContainerHeight = i.scrollHeight;
                    var a = (function (t) {
                      var e = t.src,
                        n = t.title,
                        r = void 0 === n ? "pacypay iframe" : n,
                        o = t.policy,
                        i = void 0 === o ? "origin" : o,
                        a = t.styleStr,
                        c =
                          void 0 === a
                            ? "border: none; height:100%; width:100%; overflow:hidden;"
                            : a,
                        u = document.createElement("iframe");
                      u.setAttribute("src", e),
                        u.setAttribute("class", "pacypay-iframe"),
                        u.setAttribute("allowpaymentrequest", !0),
                        "" === r || 0 === r.trim().length || "none" === r
                          ? u.setAttribute("role", "presentation")
                          : u.setAttribute("title", r),
                        u.setAttribute("allowtransparency", "true"),
                        u.setAttribute("style", c),
                        u.setAttribute("referrerpolicy", i),
                        u.setAttribute("scrolling", "no"),
                        u.setAttribute("allow", "payment *");
                      var s = document.createTextNode(
                        "<p>Your browser does not support iframes.</p>"
                      );
                      return u.appendChild(s), u;
                    })({
                      src: o.iframeUrl,
                    });
                    a.setAttribute("id", this.iframeId),
                      (i.innerHTML = ""),
                      i.appendChild(a),
                      window.removeEventListener("message", m, !0),
                      window.addEventListener("message", m, !0),
                      (a.onload = function () {
                        var o = e.mode,
                          i = t(o);
                        if (
                          (o &&
                            "string" === i &&
                            ("ApplePay" === o || "GooglePay" === o)) ||
                          ("object" === i &&
                            (o.includes("ApplePay") || o.includes("GooglePay")))
                        ) {
                          var a = document.createElement("meta");
                          a.setAttribute("http-equiv", "Feature-Policy"),
                            a.setAttribute("content", "payment 'self'"),
                            document.head.appendChild(a),
                            e.config &&
                              ((e.config.locale = e.locale),
                              (e.config.googlePayButtonType =
                                e.config.googlePayButtonType || "plain"),
                              (e.config.googlePayButtonColor =
                                e.config.googlePayButtonColor || "black"),
                              (e.config.buttonRadius =
                                e.config.buttonRadius || "4px"),
                              (e.config.applePayButtonType =
                                e.config.applePayButtonType || "plain"),
                              (e.config.applePayButtonColor =
                                e.config.applePayButtonColor || "black"),
                              ("GooglePay" === o || o.includes("GooglePay")) &&
                                (e.config.paymentMethod = "GooglePay"),
                              ("ApplePay" === o || o.includes("ApplePay")) &&
                                (e.config.paymentMethod = "ApplePay")),
                            (e.config.transactionId = n),
                            (e.config.originUrl = window.location.origin),
                            (e.config.iframeId = r.iframeId),
                            l(
                              "pacypay_theme",
                              JSON.stringify({
                                config: e.config,
                                iframeId: r.iframeId,
                              })
                            );
                        } else
                          e.config
                            ? (e.config.subProductType
                                ? (e.config.paymentMethod =
                                    "TOKEN" === e.config.subProductType
                                      ? "TOKEN_V2"
                                      : e.config.subProductType)
                                : (e.config.paymentMethod = "card"),
                              e.config.checkoutTheme ||
                                (e.config.checkoutTheme = "light"),
                              (e.config.showPayButton =
                                "boolean" != typeof e.config.showPayButton ||
                                !!e.config.showPayButton),
                              (e.config.buttonSeparation =
                                "boolean" != typeof e.config.buttonSeparation ||
                                !!e.config.buttonSeparation),
                              (e.config.displayBillingInformation =
                                "boolean" !=
                                  typeof e.config.displayBillingInformation ||
                                !!e.config.displayBillingInformation),
                              (e.config.locale = e.locale),
                              (e.config.displayCardholdername =
                                "boolean" !=
                                  typeof e.config.displayCardholdername ||
                                !!e.config.displayCardholdername))
                            : (e.config = {
                                paymentMethod: "card",
                                checkoutTheme: "light",
                                showPayButton: !0,
                                buttonSeparation: !0,
                                displayBillingInformation: !0,
                                locale: e.locale,
                              }),
                            (e.config.transactionId = n),
                            (e.config.originUrl = window.location.origin),
                            (e.config.iframeId = r.iframeId),
                            l(
                              "pacypay_theme",
                              JSON.stringify({
                                config: e.config,
                                iframeId: r.iframeId,
                              })
                            );
                      });
                  } catch (t) {
                    this.onError && this.onError(t);
                  }
                },
              },
              {
                key: "checkMerchant",
                value: function (t) {
                  return {
                    iframeUrl: h(t),
                  };
                },
              },
              {
                key: "submit",
                value: function () {
                  var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {};
                  (t.iframeId = this.iframeId),
                    l("pacypay_checkout_submit", JSON.stringify(t));
                },
              },
              {
                key: "onSubmitting",
                value:
                  ((u = c(
                    s().mark(function t() {
                      var e,
                        n = arguments;
                      return s().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                if (
                                  ((e =
                                    n.length > 0 && void 0 !== n[0] && n[0]),
                                  this.onSubmit)
                                ) {
                                  t.next = 3;
                                  break;
                                }
                                return t.abrupt("return");
                              case 3:
                                if (!e || this._isSubmitting) {
                                  t.next = 9;
                                  break;
                                }
                                return (
                                  (this._isSubmitting = !0),
                                  (t.next = 7),
                                  this.onSubmit(!0)
                                );
                              case 7:
                                t.next = 13;
                                break;
                              case 9:
                                if (e || !this._isSubmitting) {
                                  t.next = 13;
                                  break;
                                }
                                return (
                                  (this._isSubmitting = !1),
                                  (t.next = 13),
                                  this.onSubmit(!1)
                                );
                              case 13:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  )),
                  function () {
                    return u.apply(this, arguments);
                  }),
              },
              {
                key: "onChangeWH",
                value: function (t) {
                  var e = JSON.parse(t).height,
                    n = this._initContainerHeight;
                  this._initContainerHeight < e && (n = e),
                    (document.getElementById(this.container).style.height =
                      "".concat(n, "px"));
                },
              },
            ]),
            (a = [
              {
                key: "version",
                get: function () {
                  return "1.1.3";
                },
              },
            ]),
            r && o(n.prototype, r),
            a && o(n, a),
            Object.defineProperty(n, "prototype", {
              writable: !1,
            }),
            e
          );
        })(),
        b = v;
    })(),
    (r = r.default)
  );
}

export default getPacypayInstance();
