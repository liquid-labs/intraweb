import asyncHandler from 'express-async-handler';
import express from 'express';
import gcpMetadata from 'gcp-metadata';
import { Storage } from '@google-cloud/storage';
import { OAuth2Client } from 'google-auth-library';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var arrayWithHoles = createCommonjsModule(function (module) {
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(arrayWithHoles);

var iterableToArrayLimit = createCommonjsModule(function (module) {
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(iterableToArrayLimit);

var arrayLikeToArray = createCommonjsModule(function (module) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(arrayLikeToArray);

var unsupportedIterableToArray = createCommonjsModule(function (module) {
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(unsupportedIterableToArray);

var nonIterableRest = createCommonjsModule(function (module) {
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(nonIterableRest);

var slicedToArray = createCommonjsModule(function (module) {
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _slicedToArray = unwrapExports(slicedToArray);

var asyncToGenerator = createCommonjsModule(function (module) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _asyncToGenerator = unwrapExports(asyncToGenerator);

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var regenerator = runtime_1;

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2021, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

var defaults$5 = {exports: {}};

function getDefaults$1() {
  return {
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}

function changeDefaults$1(newDefaults) {
  defaults$5.exports.defaults = newDefaults;
}

defaults$5.exports = {
  defaults: getDefaults$1(),
  getDefaults: getDefaults$1,
  changeDefaults: changeDefaults$1
};

/**
 * Helpers
 */

const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$3(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}

const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

function unescape$1(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

const caret = /(^|[^\[])\^/g;
function edit$1(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, '$1');
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}

const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl$1(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape$1(href))
        .replace(nonWordAndColonTest, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (justDomain.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim$1(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];
  const relativeBase = base.indexOf(':') === -1;

  if (href.substring(0, 2) === '//') {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, '$1') + href;
  } else if (href.charAt(0) === '/') {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, '$1') + href;
  } else {
    return base + href;
  }
}

const noopTest$1 = { exec: function noopTest() {} };

function merge$2(obj) {
  let i = 1,
    target,
    key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells$1(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
      let escaped = false,
        curr = offset;
      while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
      if (escaped) {
        // odd number of slashes means | is escaped
        // so we leave it alone
        return '|';
      } else {
        // add space before unescaped |
        return ' |';
      }
    }),
    cells = row.split(/ \|/);
  let i = 0;

  // First/last cell in a row cannot be empty if it has no leading/trailing pipe
  if (!cells[0].trim()) { cells.shift(); }
  if (!cells[cells.length - 1].trim()) { cells.pop(); }

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim$1(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  let suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, l - suffLen);
}

function findClosingBracket$1(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0,
    i = 0;
  for (; i < l; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}

function checkSanitizeDeprecation$1(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

// copied from https://stackoverflow.com/a/5450113/806777
function repeatString$1(pattern, count) {
  if (count < 1) {
    return '';
  }
  let result = '';
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}

var helpers = {
  escape: escape$3,
  unescape: unescape$1,
  edit: edit$1,
  cleanUrl: cleanUrl$1,
  resolveUrl,
  noopTest: noopTest$1,
  merge: merge$2,
  splitCells: splitCells$1,
  rtrim: rtrim$1,
  findClosingBracket: findClosingBracket$1,
  checkSanitizeDeprecation: checkSanitizeDeprecation$1,
  repeatString: repeatString$1
};

const { defaults: defaults$4 } = defaults$5.exports;
const {
  rtrim,
  splitCells,
  escape: escape$2,
  findClosingBracket
} = helpers;

function outputLink(cap, link, raw, lexer) {
  const href = link.href;
  const title = link.title ? escape$2(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, '$1');

  if (cap[0].charAt(0) !== '!') {
    lexer.state.inLink = true;
    const token = {
      type: 'link',
      raw,
      href,
      title,
      text,
      tokens: lexer.inlineTokens(text, [])
    };
    lexer.state.inLink = false;
    return token;
  } else {
    return {
      type: 'image',
      raw,
      href,
      title,
      text: escape$2(text)
    };
  }
}

function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);

  if (matchIndentToCode === null) {
    return text;
  }

  const indentToCode = matchIndentToCode[1];

  return text
    .split('\n')
    .map(node => {
      const matchIndentInNode = node.match(/^\s+/);
      if (matchIndentInNode === null) {
        return node;
      }

      const [indentInNode] = matchIndentInNode;

      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }

      return node;
    })
    .join('\n');
}

/**
 * Tokenizer
 */
var Tokenizer_1 = class Tokenizer {
  constructor(options) {
    this.options = options || defaults$4;
  }

  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap) {
      if (cap[0].length > 1) {
        return {
          type: 'space',
          raw: cap[0]
        };
      }
      return { raw: '\n' };
    }
  }

  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, '');
      return {
        type: 'code',
        raw: cap[0],
        codeBlockStyle: 'indented',
        text: !this.options.pedantic
          ? rtrim(text, '\n')
          : text
      };
    }
  }

  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || '');

      return {
        type: 'code',
        raw,
        lang: cap[2] ? cap[2].trim() : cap[2],
        text
      };
    }
  }

  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();

      // remove trailing #s
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, '#');
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          // CommonMark requires space before trailing #s
          text = trimmed.trim();
        }
      }

      const token = {
        type: 'heading',
        raw: cap[0],
        depth: cap[1].length,
        text: text,
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }

  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: 'hr',
        raw: cap[0]
      };
    }
  }

  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *> ?/gm, '');

      return {
        type: 'blockquote',
        raw: cap[0],
        tokens: this.lexer.blockTokens(text, []),
        text
      };
    }
  }

  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine,
        line, lines, itemContents;

      let bull = cap[1].trim();
      const isordered = bull.length > 1;

      const list = {
        type: 'list',
        raw: '',
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : '',
        loose: false,
        items: []
      };

      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;

      if (this.options.pedantic) {
        bull = isordered ? bull : '[*+-]';
      }

      // Get next list item
      const itemRegex = new RegExp(`^( {0,3}${bull})((?: [^\\n]*| *)(?:\\n[^\\n]*)*(?:\\n|$))`);

      // Get each top-level item
      while (src) {
        if (this.rules.block.hr.test(src)) { // End list if we encounter an HR (possibly move into itemRegex?)
          break;
        }

        if (!(cap = itemRegex.exec(src))) {
          break;
        }

        lines = cap[2].split('\n');

        if (this.options.pedantic) {
          indent = 2;
          itemContents = lines[0].trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/); // Find first non-space char
          indent = cap[1].length + (indent > 4 ? 1 : indent); // intented code blocks after 4 spaces; indent is always 1
          itemContents = lines[0].slice(indent - cap[1].length);
        }

        blankLine = false;
        raw = cap[0];

        if (!lines[0] && /^ *$/.test(lines[1])) { // items begin with at most one blank line
          raw = cap[1] + lines.slice(0, 2).join('\n') + '\n';
          list.loose = true;
          lines = [];
        }

        const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])`);

        for (i = 1; i < lines.length; i++) {
          line = lines[i];

          if (this.options.pedantic) { // Re-align to follow commonmark nesting rules
            line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ');
          }

          // End list item if found start of new bullet
          if (nextBulletRegex.test(line)) {
            raw = cap[1] + lines.slice(0, i).join('\n') + '\n';
            break;
          }

          // Until we encounter a blank line, item contents do not need indentation
          if (!blankLine) {
            if (!line.trim()) { // Check if current line is empty
              blankLine = true;
            }

            // Dedent if possible
            if (line.search(/[^ ]/) >= indent) {
              itemContents += '\n' + line.slice(indent);
            } else {
              itemContents += '\n' + line;
            }
            continue;
          }

          // Dedent this line
          if (line.search(/[^ ]/) >= indent || !line.trim()) {
            itemContents += '\n' + line.slice(indent);
            continue;
          } else { // Line was not properly indented; end of this item
            raw = cap[1] + lines.slice(0, i).join('\n') + '\n';
            break;
          }
        }

        if (!list.loose) {
          // If the previous item ended with a blank line, the list is loose
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }

        // Check for task list items
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== '[ ] ';
            itemContents = itemContents.replace(/^\[[ xX]\] +/, '');
          }
        }

        list.items.push({
          type: 'list_item',
          raw: raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });

        list.raw += raw;
        src = src.slice(raw.length);
      }

      // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();

      const l = list.items.length;

      // Item child tokens handled here at end because we needed to have the final item to trim it first
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        if (list.items[i].tokens.some(t => t.type === 'space')) {
          list.loose = true;
          list.items[i].loose = true;
        }
      }

      return list;
    }
  }

  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: 'html',
        raw: cap[0],
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      };
      if (this.options.sanitize) {
        token.type = 'paragraph';
        token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0]);
        token.tokens = [];
        this.lexer.inline(token.text, token.tokens);
      }
      return token;
    }
  }

  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      return {
        type: 'def',
        tag,
        raw: cap[0],
        href: cap[2],
        title: cap[3]
      };
    }
  }

  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: 'table',
        header: splitCells(cap[1]).map(c => { return { text: c }; }),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        rows: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        item.raw = cap[0];

        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map(c => { return { text: c }; });
        }

        // parse child tokens inside headers and cells

        // header child tokens
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = [];
          this.lexer.inlineTokens(item.header[j].text, item.header[j].tokens);
        }

        // cell child tokens
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = [];
            this.lexer.inlineTokens(row[k].text, row[k].tokens);
          }
        }

        return item;
      }
    }
  }

  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      const token = {
        type: 'heading',
        raw: cap[0],
        depth: cap[2].charAt(0) === '=' ? 1 : 2,
        text: cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }

  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const token = {
        type: 'paragraph',
        raw: cap[0],
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }

  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      const token = {
        type: 'text',
        raw: cap[0],
        text: cap[0],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }

  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: 'escape',
        raw: cap[0],
        text: escape$2(cap[1])
      };
    }
  }

  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }

      return {
        type: this.options.sanitize
          ? 'text'
          : 'html',
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize
          ? (this.options.sanitizer
            ? this.options.sanitizer(cap[0])
            : escape$2(cap[0]))
          : cap[0]
      };
    }
  }

  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        // commonmark requires matching angle brackets
        if (!(/>$/.test(trimmedUrl))) {
          return;
        }

        // ending angle bracket cannot be escaped
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        // find closing parenthesis
        const lastParenIndex = findClosingBracket(cap[2], '()');
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf('!') === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = '';
        }
      }
      let href = cap[2];
      let title = '';
      if (this.options.pedantic) {
        // split pedantic href and title
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }

      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !(/>$/.test(trimmedUrl))) {
          // pedantic allows starting angle bracket without ending angle bracket
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
        title: title ? title.replace(this.rules.inline._escapes, '$1') : title
      }, cap[0], this.lexer);
    }
  }

  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src))
        || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        const text = cap[0].charAt(0);
        return {
          type: 'text',
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }

  emStrong(src, maskedSrc, prevChar = '') {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match) return;

    // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u)) return;

    const nextChar = match[1] || match[2] || '';

    if (!nextChar || (nextChar && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;

      const endReg = match[0][0] === '*' ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;

      // Clip maskedSrc to same section of string as src (move to lexer?)
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);

      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];

        if (!rDelim) continue; // skip single * in __abc*abc__

        rLength = rDelim.length;

        if (match[3] || match[4]) { // found another Left Delim
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) { // either Left or Right Delim
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue; // CommonMark Emphasis Rules 9-10
          }
        }

        delimTotal -= rLength;

        if (delimTotal > 0) continue; // Haven't found enough closing delimiters

        // Remove extra characters. *a*** -> *a*
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);

        // Create `em` if smallest delimiter has odd char count. *a***
        if (Math.min(lLength, rLength) % 2) {
          const text = src.slice(1, lLength + match.index + rLength);
          return {
            type: 'em',
            raw: src.slice(0, lLength + match.index + rLength + 1),
            text,
            tokens: this.lexer.inlineTokens(text, [])
          };
        }

        // Create 'strong' if smallest delimiter has even char count. **a***
        const text = src.slice(2, lLength + match.index + rLength - 1);
        return {
          type: 'strong',
          raw: src.slice(0, lLength + match.index + rLength + 1),
          text,
          tokens: this.lexer.inlineTokens(text, [])
        };
      }
    }
  }

  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, ' ');
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape$2(text, true);
      return {
        type: 'codespan',
        raw: cap[0],
        text
      };
    }
  }

  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: 'br',
        raw: cap[0]
      };
    }
  }

  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: 'del',
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2], [])
      };
    }
  }

  autolink(src, mangle) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === '@') {
        text = escape$2(this.options.mangle ? mangle(cap[1]) : cap[1]);
        href = 'mailto:' + text;
      } else {
        text = escape$2(cap[1]);
        href = text;
      }

      return {
        type: 'link',
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: 'text',
            raw: text,
            text
          }
        ]
      };
    }
  }

  url(src, mangle) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === '@') {
        text = escape$2(this.options.mangle ? mangle(cap[0]) : cap[0]);
        href = 'mailto:' + text;
      } else {
        // do extended autolink path validation
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape$2(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      return {
        type: 'link',
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: 'text',
            raw: text,
            text
          }
        ]
      };
    }
  }

  inlineText(src, smartypants) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0])) : cap[0];
      } else {
        text = escape$2(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
      }
      return {
        type: 'text',
        raw: cap[0],
        text
      };
    }
  }
};

const {
  noopTest,
  edit,
  merge: merge$1
} = helpers;

/**
 * Block-Level Grammar
 */
const block$1 = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
    + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
    + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
    + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};

block$1._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block$1._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block$1.def = edit(block$1.def)
  .replace('label', block$1._label)
  .replace('title', block$1._title)
  .getRegex();

block$1.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block$1.listItemStart = edit(/^( *)(bull) */)
  .replace('bull', block$1.bullet)
  .getRegex();

block$1.list = edit(block$1.list)
  .replace(/bull/g, block$1.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block$1.def.source + ')')
  .getRegex();

block$1._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block$1._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block$1.html = edit(block$1.html, 'i')
  .replace('comment', block$1._comment)
  .replace('tag', block$1._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block$1.paragraph = edit(block$1._paragraph)
  .replace('hr', block$1.hr)
  .replace('heading', ' {0,3}#{1,6} ')
  .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
  .replace('tag', block$1._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block$1.blockquote = edit(block$1.blockquote)
  .replace('paragraph', block$1.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block$1.normal = merge$1({}, block$1);

/**
 * GFM Block Grammar
 */

block$1.gfm = merge$1({}, block$1.normal, {
  table: '^ *([^\\n ].*\\|.*)\\n' // Header
    + ' {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)\\|?' // Align
    + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
});

block$1.gfm.table = edit(block$1.gfm.table)
  .replace('hr', block$1.hr)
  .replace('heading', ' {0,3}#{1,6} ')
  .replace('blockquote', ' {0,3}>')
  .replace('code', ' {4}[^\\n]')
  .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
  .replace('tag', block$1._tag) // tables can be interrupted by type (6) html blocks
  .getRegex();

/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block$1.pedantic = merge$1({}, block$1.normal, {
  html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block$1._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest, // fences not supported
  paragraph: edit(block$1.normal._paragraph)
    .replace('hr', block$1.hr)
    .replace('heading', ' *#{1,6} *[^\n]')
    .replace('lheading', block$1.lheading)
    .replace('blockquote', ' {0,3}>')
    .replace('|fences', '')
    .replace('|list', '')
    .replace('|html', '')
    .getRegex()
});

/**
 * Inline-Level Grammar
 */
const inline$1 = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  reflinkSearch: 'reflink|nolink(?!\\()',
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //        () Skip other delimiter (1) #***                   (2) a***#, a***                   (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
    rDelimAst: /\_\_[^_*]*?\*[^_*]*?\_\_|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd: /\*\*[^_*]*?\_[^_*]*?\*\*|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};

// list of punctuation marks from CommonMark spec
// without * and _ to handle the different emphasis markers * and _
inline$1._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
inline$1.punctuation = edit(inline$1.punctuation).replace(/punctuation/g, inline$1._punctuation).getRegex();

// sequences em should skip over [title](link), `code`, <html>
inline$1.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline$1.escapedEmSt = /\\\*|\\_/g;

inline$1._comment = edit(block$1._comment).replace('(?:-->|$)', '-->').getRegex();

inline$1.emStrong.lDelim = edit(inline$1.emStrong.lDelim)
  .replace(/punct/g, inline$1._punctuation)
  .getRegex();

inline$1.emStrong.rDelimAst = edit(inline$1.emStrong.rDelimAst, 'g')
  .replace(/punct/g, inline$1._punctuation)
  .getRegex();

inline$1.emStrong.rDelimUnd = edit(inline$1.emStrong.rDelimUnd, 'g')
  .replace(/punct/g, inline$1._punctuation)
  .getRegex();

inline$1._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline$1._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline$1._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline$1.autolink = edit(inline$1.autolink)
  .replace('scheme', inline$1._scheme)
  .replace('email', inline$1._email)
  .getRegex();

inline$1._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline$1.tag = edit(inline$1.tag)
  .replace('comment', inline$1._comment)
  .replace('attribute', inline$1._attribute)
  .getRegex();

inline$1._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline$1._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline$1._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline$1.link = edit(inline$1.link)
  .replace('label', inline$1._label)
  .replace('href', inline$1._href)
  .replace('title', inline$1._title)
  .getRegex();

inline$1.reflink = edit(inline$1.reflink)
  .replace('label', inline$1._label)
  .getRegex();

inline$1.reflinkSearch = edit(inline$1.reflinkSearch, 'g')
  .replace('reflink', inline$1.reflink)
  .replace('nolink', inline$1.nolink)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline$1.normal = merge$1({}, inline$1);

/**
 * Pedantic Inline Grammar
 */

inline$1.pedantic = merge$1({}, inline$1.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline$1._label)
    .getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline$1._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline$1.gfm = merge$1({}, inline$1.normal, {
  escape: edit(inline$1.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});

inline$1.gfm.url = edit(inline$1.gfm.url, 'i')
  .replace('email', inline$1.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline$1.breaks = merge$1({}, inline$1.gfm, {
  br: edit(inline$1.br).replace('{2,}', '*').getRegex(),
  text: edit(inline$1.gfm.text)
    .replace('\\b_', '\\b_| {2,}\\n')
    .replace(/\{2,\}/g, '*')
    .getRegex()
});

var rules = {
  block: block$1,
  inline: inline$1
};

const Tokenizer$1 = Tokenizer_1;
const { defaults: defaults$3 } = defaults$5.exports;
const { block, inline } = rules;
const { repeatString } = helpers;

/**
 * smartypants text replacement
 */
function smartypants(text) {
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
}

/**
 * mangle email addresses
 */
function mangle(text) {
  let out = '',
    i,
    ch;

  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
}

/**
 * Block Lexer
 */
var Lexer_1 = class Lexer {
  constructor(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults$3;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer$1();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };

    const rules = {
      block: block.normal,
      inline: inline.normal
    };

    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }

  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }

  /**
   * Static Lex Method
   */
  static lex(src, options) {
    const lexer = new Lexer(options);
    return lexer.lex(src);
  }

  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options) {
    const lexer = new Lexer(options);
    return lexer.inlineTokens(src);
  }

  /**
   * Preprocessing
   */
  lex(src) {
    src = src
      .replace(/\r\n|\r/g, '\n')
      .replace(/\t/g, '    ');

    this.blockTokens(src, this.tokens);

    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }

    return this.tokens;
  }

  /**
   * Lexing
   */
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/^ +$/gm, '');
    }
    let token, lastToken, cutSrc, lastParagraphClipped;

    while (src) {
      if (this.options.extensions
        && this.options.extensions.block
        && this.options.extensions.block.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
        continue;
      }

      // newline
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.type) {
          tokens.push(token);
        }
        continue;
      }

      // code
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        // An indented code block cannot interrupt a paragraph.
        if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      // fences
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // heading
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // hr
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // blockquote
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // list
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // html
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // def
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }

      // table (gfm)
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // lheading
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // top-level paragraph
      // prevent paragraph consuming extensions by clipping 'src' to extension start
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === 'number' && tempStart >= 0) { startIndex = Math.min(startIndex, tempStart); }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === 'paragraph') {
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = (cutSrc.length !== src.length);
        src = src.substring(token.raw.length);
        continue;
      }

      // text
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === 'text') {
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      if (src) {
        const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }

    this.state.top = true;
    return tokens;
  }

  inline(src, tokens) {
    this.inlineQueue.push({ src, tokens });
  }

  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;

    // String with links masked to avoid interference with em and strong
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;

    // Mask out reflinks
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    // Mask out other blocks
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }

    // Mask out escaped em & strong delimiters
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    }

    while (src) {
      if (!keepPrevChar) {
        prevChar = '';
      }
      keepPrevChar = false;

      // extensions
      if (this.options.extensions
        && this.options.extensions.inline
        && this.options.extensions.inline.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
        continue;
      }

      // escape
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // tag
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === 'text' && lastToken.type === 'text') {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      // link
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // reflink, nolink
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === 'text' && lastToken.type === 'text') {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      // em & strong
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // code
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // br
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // del (gfm)
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // autolink
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // url (gfm)
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }

      // text
      // prevent inlineText consuming extensions by clipping 'src' to extension start
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === 'number' && tempStart >= 0) { startIndex = Math.min(startIndex, tempStart); }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== '_') { // Track prevChar before string of ____ started
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === 'text') {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }

      if (src) {
        const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }

    return tokens;
  }
};

const { defaults: defaults$2 } = defaults$5.exports;
const {
  cleanUrl,
  escape: escape$1
} = helpers;

/**
 * Renderer
 */
var Renderer_1 = class Renderer {
  constructor(options) {
    this.options = options || defaults$2;
  }

  code(code, infostring, escaped) {
    const lang = (infostring || '').match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }

    code = code.replace(/\n$/, '') + '\n';

    if (!lang) {
      return '<pre><code>'
        + (escaped ? code : escape$1(code, true))
        + '</code></pre>\n';
    }

    return '<pre><code class="'
      + this.options.langPrefix
      + escape$1(lang, true)
      + '">'
      + (escaped ? code : escape$1(code, true))
      + '</code></pre>\n';
  }

  blockquote(quote) {
    return '<blockquote>\n' + quote + '</blockquote>\n';
  }

  html(html) {
    return html;
  }

  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return '<h'
        + level
        + ' id="'
        + this.options.headerPrefix
        + slugger.slug(raw)
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
    }
    // ignore IDs
    return '<h' + level + '>' + text + '</h' + level + '>\n';
  }

  hr() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  }

  list(body, ordered, start) {
    const type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
    return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  }

  listitem(text) {
    return '<li>' + text + '</li>\n';
  }

  checkbox(checked) {
    return '<input '
      + (checked ? 'checked="" ' : '')
      + 'disabled="" type="checkbox"'
      + (this.options.xhtml ? ' /' : '')
      + '> ';
  }

  paragraph(text) {
    return '<p>' + text + '</p>\n';
  }

  table(header, body) {
    if (body) body = '<tbody>' + body + '</tbody>';

    return '<table>\n'
      + '<thead>\n'
      + header
      + '</thead>\n'
      + body
      + '</table>\n';
  }

  tablerow(content) {
    return '<tr>\n' + content + '</tr>\n';
  }

  tablecell(content, flags) {
    const type = flags.header ? 'th' : 'td';
    const tag = flags.align
      ? '<' + type + ' align="' + flags.align + '">'
      : '<' + type + '>';
    return tag + content + '</' + type + '>\n';
  }

  // span level renderer
  strong(text) {
    return '<strong>' + text + '</strong>';
  }

  em(text) {
    return '<em>' + text + '</em>';
  }

  codespan(text) {
    return '<code>' + text + '</code>';
  }

  br() {
    return this.options.xhtml ? '<br/>' : '<br>';
  }

  del(text) {
    return '<del>' + text + '</del>';
  }

  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape$1(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  }

  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }

    let out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  }

  text(text) {
    return text;
  }
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

var TextRenderer_1 = class TextRenderer {
  // no need for block level renderers
  strong(text) {
    return text;
  }

  em(text) {
    return text;
  }

  codespan(text) {
    return text;
  }

  del(text) {
    return text;
  }

  html(text) {
    return text;
  }

  text(text) {
    return text;
  }

  link(href, title, text) {
    return '' + text;
  }

  image(href, title, text) {
    return '' + text;
  }

  br() {
    return '';
  }
};

/**
 * Slugger generates header id
 */

var Slugger_1 = class Slugger {
  constructor() {
    this.seen = {};
  }

  serialize(value) {
    return value
      .toLowerCase()
      .trim()
      // remove html tags
      .replace(/<[!\/a-z].*?>/ig, '')
      // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
      .replace(/\s/g, '-');
  }

  /**
   * Finds the next safe (unique) slug to use
   */
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + '-' + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }

  /**
   * Convert string to unique id
   * @param {object} options
   * @param {boolean} options.dryrun Generates the next unique slug without updating the internal accumulator.
   */
  slug(value, options = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options.dryrun);
  }
};

const Renderer$1 = Renderer_1;
const TextRenderer$1 = TextRenderer_1;
const Slugger$1 = Slugger_1;
const { defaults: defaults$1 } = defaults$5.exports;
const {
  unescape
} = helpers;

/**
 * Parsing & Compiling
 */
var Parser_1 = class Parser {
  constructor(options) {
    this.options = options || defaults$1;
    this.options.renderer = this.options.renderer || new Renderer$1();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer$1();
    this.slugger = new Slugger$1();
  }

  /**
   * Static Parse Method
   */
  static parse(tokens, options) {
    const parser = new Parser(options);
    return parser.parse(tokens);
  }

  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options) {
    const parser = new Parser(options);
    return parser.parseInline(tokens);
  }

  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = '',
      i,
      j,
      k,
      l2,
      l3,
      row,
      cell,
      header,
      body,
      token,
      ordered,
      start,
      loose,
      itemBody,
      item,
      checked,
      task,
      checkbox,
      ret;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];

      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(token.type)) {
          out += ret || '';
          continue;
        }
      }

      switch (token.type) {
        case 'space': {
          continue;
        }
        case 'hr': {
          out += this.renderer.hr();
          continue;
        }
        case 'heading': {
          out += this.renderer.heading(
            this.parseInline(token.tokens),
            token.depth,
            unescape(this.parseInline(token.tokens, this.textRenderer)),
            this.slugger);
          continue;
        }
        case 'code': {
          out += this.renderer.code(token.text,
            token.lang,
            token.escaped);
          continue;
        }
        case 'table': {
          header = '';

          // header
          cell = '';
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(
              this.parseInline(token.header[j].tokens),
              { header: true, align: token.align[j] }
            );
          }
          header += this.renderer.tablerow(cell);

          body = '';
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];

            cell = '';
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(
                this.parseInline(row[k].tokens),
                { header: false, align: token.align[k] }
              );
            }

            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case 'blockquote': {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case 'list': {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;

          body = '';
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;

            itemBody = '';
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
                  item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                    item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: 'text',
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }

            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }

          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case 'html': {
          // TODO parse inline content if parameter markdown=1
          out += this.renderer.html(token.text);
          continue;
        }
        case 'paragraph': {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case 'text': {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === 'text') {
            token = tokens[++i];
            body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }

        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }

    return out;
  }

  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = '',
      i,
      token,
      ret;

    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];

      // Run any renderer extensions
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(token.type)) {
          out += ret || '';
          continue;
        }
      }

      switch (token.type) {
        case 'escape': {
          out += renderer.text(token.text);
          break;
        }
        case 'html': {
          out += renderer.html(token.text);
          break;
        }
        case 'link': {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case 'image': {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case 'strong': {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'em': {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'codespan': {
          out += renderer.codespan(token.text);
          break;
        }
        case 'br': {
          out += renderer.br();
          break;
        }
        case 'del': {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case 'text': {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};

const Lexer = Lexer_1;
const Parser = Parser_1;
const Tokenizer = Tokenizer_1;
const Renderer = Renderer_1;
const TextRenderer = TextRenderer_1;
const Slugger = Slugger_1;
const {
  merge,
  checkSanitizeDeprecation,
  escape
} = helpers;
const {
  getDefaults,
  changeDefaults,
  defaults
} = defaults$5.exports;

/**
 * Marked
 */
function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (typeof opt === 'function') {
    callback = opt;
    opt = null;
  }

  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);

  if (callback) {
    const highlight = opt.highlight;
    let tokens;

    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    const done = function(err) {
      let out;

      if (!err) {
        try {
          if (opt.walkTokens) {
            marked.walkTokens(tokens, opt.walkTokens);
          }
          out = Parser.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!tokens.length) return done();

    let pending = 0;
    marked.walkTokens(tokens, function(token) {
      if (token.type === 'code') {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function(err, code) {
            if (err) {
              return done(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }

            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });

    if (pending === 0) {
      done();
    }

    return;
  }

  try {
    const tokens = Lexer.lex(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parse(tokens, opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if (opt.silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  changeDefaults(marked.defaults);
  return marked;
};

marked.getDefaults = getDefaults;

marked.defaults = defaults;

/**
 * Use Extension
 */

marked.use = function(...args) {
  const opts = merge({}, ...args);
  const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
  let hasExtensions;

  args.forEach((pack) => {
    // ==-- Parse "addon" extensions --== //
    if (pack.extensions) {
      hasExtensions = true;
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error('extension name required');
        }
        if (ext.renderer) { // Renderer extensions
          const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
          if (prevRenderer) {
            // Replace extension with func to run new extension but fall back if false
            extensions.renderers[ext.name] = function(...args) {
              let ret = ext.renderer.apply(this, args);
              if (ret === false) {
                ret = prevRenderer.apply(this, args);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) { // Tokenizer Extensions
          if (!ext.level || (ext.level !== 'block' && ext.level !== 'inline')) {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) { // Function to check for start of token
            if (ext.level === 'block') {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === 'inline') {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) { // Child tokens to be visited by walkTokens
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
    }

    // ==-- Parse "overwrite" extensions --== //
    if (pack.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        // Replace renderer with func to run extension, but fall back if false
        renderer[prop] = (...args) => {
          let ret = pack.renderer[prop].apply(renderer, args);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        // Replace tokenizer with func to run extension, but fall back if false
        tokenizer[prop] = (...args) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }

    // ==-- Parse WalkTokens extensions --== //
    if (pack.walkTokens) {
      const walkTokens = marked.defaults.walkTokens;
      opts.walkTokens = (token) => {
        pack.walkTokens.call(this, token);
        if (walkTokens) {
          walkTokens(token);
        }
      };
    }

    if (hasExtensions) {
      opts.extensions = extensions;
    }

    marked.setOptions(opts);
  });
};

/**
 * Run callback for every token
 */

marked.walkTokens = function(tokens, callback) {
  for (const token of tokens) {
    callback(token);
    switch (token.type) {
      case 'table': {
        for (const cell of token.header) {
          marked.walkTokens(cell.tokens, callback);
        }
        for (const row of token.rows) {
          for (const cell of row) {
            marked.walkTokens(cell.tokens, callback);
          }
        }
        break;
      }
      case 'list': {
        marked.walkTokens(token.items, callback);
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) { // Walk any extensions
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            marked.walkTokens(token[childTokens], callback);
          });
        } else if (token.tokens) {
          marked.walkTokens(token.tokens, callback);
        }
      }
    }
  }
};

/**
 * Parse Inline
 */
marked.parseInline = function(src, opt) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked.parseInline(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked.parseInline(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  opt = merge({}, marked.defaults, opt || {});
  checkSanitizeDeprecation(opt);

  try {
    const tokens = Lexer.lexInline(src, opt);
    if (opt.walkTokens) {
      marked.walkTokens(tokens, opt.walkTokens);
    }
    return Parser.parseInline(tokens, opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if (opt.silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.Tokenizer = Tokenizer;

marked.Slugger = Slugger;

marked.parse = marked;

var marked_1 = marked;

var setupAccessLib = function setupAccessLib(_ref) {
  var projectId = _ref.projectId,
      projectNumber = _ref.projectNumber;
  var expectedAudience = null;

  if (projectNumber && projectId) {
    // Expected Audience for App Engine.
    expectedAudience = "/projects/".concat(projectNumber, "/apps/").concat(projectId);
  }
  /* else if (projectNumber && backendServiceId) { // for future ref; not used here
    // Expected Audience for Compute Engine
    expectedAudience = `/projects/${projectNumber}/global/backendServices/${backendServiceId}`
  } */
  else {
    throw new Error('Could not determine \'expected audience\' for JWT verification.');
  }

  return {
    verifyToken: function () {
      var _verifyToken = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(req) {
        var _req$headers;

        var iapJwt, oAuth2Client, response, ticket;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                iapJwt = (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers['x-goog-iap-jwt-assertion'];
                oAuth2Client = new OAuth2Client(); // Verify the id_token, and access the claims.

                _context.next = 4;
                return oAuth2Client.getIapPublicKeys();

              case 4:
                response = _context.sent;
                _context.next = 7;
                return oAuth2Client.verifySignedJwtWithCertsAsync(iapJwt, response.pubkeys, expectedAudience, ['https://cloud.google.com/iap']);

              case 7:
                ticket = _context.sent;
                return _context.abrupt("return", ticket);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function verifyToken(_x) {
        return _verifyToken.apply(this, arguments);
      }

      return verifyToken;
    }()
  };
};

var projectId = process.env.GOOGLE_CLOUD_PROJECT;
console.log("Starting server for project '".concat(projectId, "'...")); // have to use the 'metadata' server for project number

var isAvailable = await gcpMetadata.isAvailable();

if (!isAvailable) {
  // TODO: Support fallback modes and 'unverified' access when configured for it
  throw new Error('Metadata not available, cannot proceed.');
}

console.log("Metadata available: ".concat(isAvailable));
var projectNumber = await gcpMetadata.project('numeric-project-id'); // setup access checker

var accessLib = setupAccessLib({
  projectId: projectId,
  projectNumber: projectNumber
}); // setup storage stuff

var storage = new Storage();
var bucketId = process.env.BUCKET;

if (!bucketId) {
  throw new Error("No 'BUCKET' environment variable found (or is empty).");
} // Useful info for the logs.


console.log("Connecting to bucket: ".concat(bucketId));
var bucket = storage.bucket(bucketId); // setup web server stuff

var app = express();
app.set('trust proxy', true);
var PORT = process.env.PORT || 8080;
var fileRegex = /.*\.[^./]+$/;
var commonImageFiles = /\.(jpg|png|gif)$/i;

var htmlOpen = function htmlOpen(path) {
  return "<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\"/>\n    <title>".concat(path, "</title>\n    <!--[if lt IE 9]>\n    <script src=\"//html5shim.googlecode.com/svn/trunk/html5.js\"></script>\n    <![endif]-->\n    <style>\n    /*\nCopyright (c) 2017 Chris Patuzzo\nhttps://twitter.com/chrispatuzzo\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n*/\n\nbody {\n  font-family: Helvetica, arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.6;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  background-color: white;\n  padding: 30px;\n  color: #333;\n}\n\nbody > *:first-child {\n  margin-top: 0 !important;\n}\n\nbody > *:last-child {\n  margin-bottom: 0 !important;\n}\n\na {\n  color: #4183C4;\n  text-decoration: none;\n}\n\na.absent {\n  color: #cc0000;\n}\n\na.anchor {\n  display: block;\n  padding-left: 30px;\n  margin-left: -30px;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin: 20px 0 10px;\n  padding: 0;\n  font-weight: bold;\n  -webkit-font-smoothing: antialiased;\n  cursor: text;\n  position: relative;\n}\n\nh2:first-child, h1:first-child, h1:first-child + h2, h3:first-child, h4:first-child, h5:first-child, h6:first-child {\n  margin-top: 0;\n  padding-top: 0;\n}\n\nh1:hover a.anchor, h2:hover a.anchor, h3:hover a.anchor, h4:hover a.anchor, h5:hover a.anchor, h6:hover a.anchor {\n  text-decoration: none;\n}\n\nh1 tt, h1 code {\n  font-size: inherit;\n}\n\nh2 tt, h2 code {\n  font-size: inherit;\n}\n\nh3 tt, h3 code {\n  font-size: inherit;\n}\n\nh4 tt, h4 code {\n  font-size: inherit;\n}\n\nh5 tt, h5 code {\n  font-size: inherit;\n}\n\nh6 tt, h6 code {\n  font-size: inherit;\n}\n\nh1 {\n  font-size: 28px;\n  color: black;\n}\n\nh2 {\n  font-size: 24px;\n  border-bottom: 1px solid #cccccc;\n  color: black;\n}\n\nh3 {\n  font-size: 18px;\n}\n\nh4 {\n  font-size: 16px;\n}\n\nh5 {\n  font-size: 14px;\n}\n\nh6 {\n  color: #777777;\n  font-size: 14px;\n}\n\np, blockquote, ul, ol, dl, li, table, pre {\n  margin: 15px 0;\n}\n\nhr {\n  border: 0 none;\n  color: #cccccc;\n  height: 4px;\n  padding: 0;\n}\n\nbody > h2:first-child {\n  margin-top: 0;\n  padding-top: 0;\n}\n\nbody > h1:first-child {\n  margin-top: 0;\n  padding-top: 0;\n}\n\nbody > h1:first-child + h2 {\n  margin-top: 0;\n  padding-top: 0;\n}\n\nbody > h3:first-child, body > h4:first-child, body > h5:first-child, body > h6:first-child {\n  margin-top: 0;\n  padding-top: 0;\n}\n\na:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6 {\n  margin-top: 0;\n  padding-top: 0;\n}\n\nh1 p, h2 p, h3 p, h4 p, h5 p, h6 p {\n  margin-top: 0;\n}\n\nli p.first {\n  display: inline-block;\n}\n\nul, ol {\n  padding-left: 30px;\n}\n\nul :first-child, ol :first-child {\n  margin-top: 0;\n}\n\nul :last-child, ol :last-child {\n  margin-bottom: 0;\n}\n\ndl {\n  padding: 0;\n}\n\ndl dt {\n  font-size: 14px;\n  font-weight: bold;\n  font-style: italic;\n  padding: 0;\n  margin: 15px 0 5px;\n}\n\ndl dt:first-child {\n  padding: 0;\n}\n\ndl dt > :first-child {\n  margin-top: 0;\n}\n\ndl dt > :last-child {\n  margin-bottom: 0;\n}\n\ndl dd {\n  margin: 0 0 15px;\n  padding: 0 15px;\n}\n\ndl dd > :first-child {\n  margin-top: 0;\n}\n\ndl dd > :last-child {\n  margin-bottom: 0;\n}\n\nblockquote {\n  border-left: 4px solid #dddddd;\n  padding: 0 15px;\n  color: #777777;\n}\n\nblockquote > :first-child {\n  margin-top: 0;\n}\n\nblockquote > :last-child {\n  margin-bottom: 0;\n}\n\ntable {\n  padding: 0;\n}\ntable tr {\n  border-top: 1px solid #cccccc;\n  background-color: white;\n  margin: 0;\n  padding: 0;\n}\n\ntable tr:nth-child(2n) {\n  background-color: #f8f8f8;\n}\n\ntable tr th {\n  font-weight: bold;\n  border: 1px solid #cccccc;\n  text-align: left;\n  margin: 0;\n  padding: 6px 13px;\n}\n\ntable tr td {\n  border: 1px solid #cccccc;\n  text-align: left;\n  margin: 0;\n  padding: 6px 13px;\n}\n\ntable tr th :first-child, table tr td :first-child {\n  margin-top: 0;\n}\n\ntable tr th :last-child, table tr td :last-child {\n  margin-bottom: 0;\n}\n\nimg {\n  max-width: 100%;\n}\n\nspan.frame {\n  display: block;\n  overflow: hidden;\n}\n\nspan.frame > span {\n  border: 1px solid #dddddd;\n  display: block;\n  float: left;\n  overflow: hidden;\n  margin: 13px 0 0;\n  padding: 7px;\n  width: auto;\n}\n\nspan.frame span img {\n  display: block;\n  float: left;\n}\n\nspan.frame span span {\n  clear: both;\n  color: #333333;\n  display: block;\n  padding: 5px 0 0;\n}\n\nspan.align-center {\n  display: block;\n  overflow: hidden;\n  clear: both;\n}\n\nspan.align-center > span {\n  display: block;\n  overflow: hidden;\n  margin: 13px auto 0;\n  text-align: center;\n}\n\nspan.align-center span img {\n  margin: 0 auto;\n  text-align: center;\n}\n\nspan.align-right {\n  display: block;\n  overflow: hidden;\n  clear: both;\n}\n\nspan.align-right > span {\n  display: block;\n  overflow: hidden;\n  margin: 13px 0 0;\n  text-align: right;\n}\n\nspan.align-right span img {\n  margin: 0;\n  text-align: right;\n}\n\nspan.float-left {\n  display: block;\n  margin-right: 13px;\n  overflow: hidden;\n  float: left;\n}\n\nspan.float-left span {\n  margin: 13px 0 0;\n}\n\nspan.float-right {\n  display: block;\n  margin-left: 13px;\n  overflow: hidden;\n  float: right;\n}\n\nspan.float-right > span {\n  display: block;\n  overflow: hidden;\n  margin: 13px auto 0;\n  text-align: right;\n}\n\ncode, tt {\n  margin: 0 2px;\n  padding: 0 5px;\n  white-space: nowrap;\n  border: 1px solid #eaeaea;\n  background-color: #f8f8f8;\n  border-radius: 3px;\n}\n\npre code {\n  margin: 0;\n  padding: 0;\n  white-space: pre;\n  border: none;\n  background: transparent;\n}\n\n.highlight pre {\n  background-color: #f8f8f8;\n  border: 1px solid #cccccc;\n  font-size: 13px;\n  line-height: 19px;\n  overflow: auto;\n  padding: 6px 10px;\n  border-radius: 3px;\n}\n\npre {\n  background-color: #f8f8f8;\n  border: 1px solid #cccccc;\n  font-size: 13px;\n  line-height: 19px;\n  overflow: auto;\n  padding: 6px 10px;\n  border-radius: 3px;\n}\n\npre code, pre tt {\n  background-color: transparent;\n  border: none;\n}\n\n/* ----- mine: */\nsamp {\n  border: 1px solid #cccccc;\n  display: inline-block;\n  background-color: #f8f8f8;\n  border-radius: 3px;\n  padding: 0 2px;\n}\n    </style>\n  </head>\n<body>");
};

var htmlEnd = function htmlEnd() {
  return "\n</body>\n</html>";
};

var markedOptions = {
  smartLists: true
};

var readBucketFile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref) {
    var path, res, next, file, _yield$file$exists, _yield$file$exists2, exists, reader, imageMatchResults, markdown;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = _ref.path, res = _ref.res, next = _ref.next;
            _context.prev = 1;
            // first, check if file exists.
            file = bucket.file(path);
            _context.next = 5;
            return file.exists();

          case 5:
            _yield$file$exists = _context.sent;
            _yield$file$exists2 = _slicedToArray(_yield$file$exists, 1);
            exists = _yield$file$exists2[0];

            if (exists) {
              reader = file.createReadStream();
              reader.on('error', function (err) {
                console.error("Error while reading file: ".concat(err));
                res.status(500).send("Error reading file '".concat(path, "': ").concat(err)).end();
              }); // is the file an image type?

              imageMatchResults = path.match(commonImageFiles);

              if (path.match(commonImageFiles)) {
                res.writeHead(200, {
                  'content-type': "image/".concat(imageMatchResults[1].toLowerCase())
                });
              }

              if (path.endsWith('.md')) {
                markdown = '';
                reader.on('data', function (d) {
                  markdown += d;
                }).on('end', function () {
                  var breadcrumbs = renderBreadcrumbs(path);
                  res.send("".concat(htmlOpen(path), "\n\n").concat(breadcrumbs, "\n\n").concat(marked_1(markdown, markedOptions), "\n\n").concat(breadcrumbs, "\n\n").concat(htmlEnd()));
                });
              } else {
                reader.pipe(res);
              }
            } else {
              // No such file, send 404
              res.status(404).send("No such file: '".concat(path, "'")).end();
            }

            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            console.error("Caught exception while processing '".concat(path, "'."));
            res.status(500).send("Error reading: ".concat(path));
            return _context.abrupt("return", next(_context.t0));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));

  return function readBucketFile(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var startSlash = /^\//;
var endSlash = /\/$/;

var renderBreadcrumbs = function renderBreadcrumbs(path, options) {
  var output = '';

  if (!path || path === '') {
    return output;
  }

  var _ref3 = options || {},
      _ref3$format = _ref3.format,
      format = _ref3$format === void 0 ? 'html' : _ref3$format; // We remove the end slash to avoid an empty array element.


  var pathBits = path.replace(endSlash, '').split('/'); // Each path bit represents a step back, but we step back into the prior element. E.g., if we see path "foo/bar",
  // so stepping back one takes us to foo and stepping back two takes us to the root. So we unshift a root element and
  // pop the last element to make everything match up.

  pathBits.unshift('&lt;root&gt;');
  pathBits.pop();
  var pathBitsLength = pathBits.length; // Breadcrumbs for a file end with the current dir and then move back. For a directory, you're stepping back in each
  // iteration.

  var linkBits = path.match(fileRegex) ? pathBits.map(function (b, i) {
    return i + 1 === pathBitsLength ? '.' : Array(pathBitsLength - (i + 1)).fill('..').join('/');
  }) : pathBits.map(function (b, i) {
    return Array(pathBitsLength - i).fill('..').join('/');
  });

  for (var i = 0; i < pathBits.length; i += 1) {
    if (format === 'markdown') {
      output += "[".concat(pathBits[i], "/](").concat(linkBits[i], ") ");
    } else {
      // default to HTML
      output += "<a href=\"".concat(linkBits[i], "\">").concat(pathBits[i], "/</a> ");
    }
  }

  return output;
};

var renderFiles = function renderFiles(_ref4) {
  var path = _ref4.path,
      files = _ref4.files,
      folders = _ref4.folders,
      res = _ref4.res;
  // Our 'path' comes in full relative from the root. However, we want to show only the relative bits.
  var deprefixer = new RegExp("".concat(path, "/?")); // open up with some boilerplace HTML

  var html = "".concat(htmlOpen(path), "\n  <div id=\"breadcrumbs\">\n    ").concat(renderBreadcrumbs(path), "\n  </div>\n  <h1>").concat(path, "</h1>");

  if (folders.length > 0) {
    html += "\n  <h2 id=\"folders\">Folders</h2>\n    ".concat(folders.length, " total\n  <ul>\n");
    folders.forEach(function (folder) {
      var localRef = folder.replace(deprefixer, '');
      html += "    <li><a href=\"".concat(encodeURIComponent(localRef.replace(endSlash, '')), "/\">").concat(localRef, "</a></li>\n");
    });
    html += '  </ul>';
  }

  if (files && files.length > 0) {
    html += "\n  <h2 id=\"files\">Files</h2>\n  ".concat(files.length, " total\n  <ul>\n");
    files.forEach(function (file) {
      var localRef = file.name.replace(deprefixer, '');
      html += "    <li><a href=\"".concat(encodeURIComponent(localRef), "\">").concat(localRef, "</a></li>\n");
    });
    html += '  </ul>';
  }

  html += htmlEnd();
  res.send(html).end();
};

var indexerQueryOptions = {
  delimiter: '/',
  includeTrailingDelimiter: true,
  autoPaginate: false // ?? necessary to see sub-folders

};

var indexBucket = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_ref5) {
    var path, res, next, indexPath, file, _yield$file$exists3, _yield$file$exists4, exists, folders, query, indexPager;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            path = _ref5.path, res = _ref5.res, next = _ref5.next;
            _context2.prev = 1;

            // TODO: I think now that we asyncHandler, we can forgo generic try-catch blocks
            // We expect the root path to be ''; all others should end with a '/'
            if (path !== '' && !path.match(endSlash)) {
              res.redirect(301, "".concat(path, "/")).end();
            }

            indexPath = "".concat(path, "index.html");
            file = bucket.file(indexPath);
            _context2.next = 7;
            return file.exists();

          case 7:
            _yield$file$exists3 = _context2.sent;
            _yield$file$exists4 = _slicedToArray(_yield$file$exists3, 1);
            exists = _yield$file$exists4[0];

            if (!exists) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", readBucketFile({
              path: indexPath,
              res: res
            }));

          case 12:
            folders = [];
            query = Object.assign({
              prefix: path
            }, indexerQueryOptions); // OK, the Cloud Storage API (as of v5) is finicky and will only show you files in the 'await' version, e.g.:
            //
            // const [ files ] = await bucket.getFiles(query)
            //
            // In order to get the 'folders', you have to do to things:
            // 1) Inculde 'autoPaginate' in the query and
            // 2) Call using a callback method.
            //
            // In this form, you get to see the API response, which allows you to look at the 'prefixes' within the current search
            // prefix. These can be mapped to logical sub-folders in our bucket scheme.

            indexPager = function indexPager(err, files, nextQuery, apiResponse) {
              if (err) {
                res.setStatus(500).send("Error while processing results: ".concat(err)).end();
              } // all good!


              if (apiResponse.prefixes && apiResponse.prefixes.length > 0) {
                folders = folders.concat(apiResponse.prefixes);
              }

              if (nextQuery) {
                bucket.getFiles(nextQuery, indexPager);
              } else {
                // we've built up all the folders
                // If there's nothing here, treat as 404
                if ((!files || files.length === 0) && folders.length === 0) {
                  res.status(404).send("No such folder: '".concat(path, "'")).end();
                } else {
                  renderFiles({
                    path: path,
                    files: files,
                    folders: folders,
                    res: res
                  });
                }
              }
            }; // here's where we actually kick everything off by doing the search.


            bucket.getFiles(query, indexPager);
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](1);
            res.status(500).send("Explosion! ".concat(_context2.t0));
            return _context2.abrupt("return", next(_context2.t0));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 18]]);
  }));

  return function indexBucket(_x2) {
    return _ref6.apply(this, arguments);
  };
}(); //
// request processing setup
// async because our handsers are async


var commonProcessor = function commonProcessor(render) {
  return /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(req, res, next) {
      var path;
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return accessLib.verifyToken(req);

            case 3:
              _context3.next = 10;
              break;

            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              console.error("Exception while verifying access: ".concat(_context3.t0));
              res.status(401).send("Request authorization token could not be verified.\n".concat(_context3.t0));
              return _context3.abrupt("return", next(_context3.t0));

            case 10:
              // Cloud storage doesn't like an initial '/', so we remove any.
              path = decodeURIComponent(req.path.replace(startSlash, ''));
              res.on('error', function (err) {
                console.error("Error in the response output stream: ".concat(err));
              });
              _context3.prev = 12;
              render({
                path: path,
                res: res,
                next: next
              });
              _context3.next = 21;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t1 = _context3["catch"](12);
              console.error("Exception while rendering: ".concat(_context3.t1));
              res.status(500).send("Exception encountered while rendering result: ".concat(_context3.t1));
              return _context3.abrupt("return", next(_context3.t1));

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 5], [12, 16]]);
    }));

    return function (_x3, _x4, _x5) {
      return _ref7.apply(this, arguments);
    };
  }();
};

app.get(fileRegex, asyncHandler(commonProcessor(readBucketFile))); // if it's not a file, maybe it's a bucket.

app.get('*', asyncHandler(commonProcessor(indexBucket))); // start the server

app.listen(PORT, function () {
  console.log("App listening on port ".concat(PORT));
  console.log('Press Ctrl+C to quit.');
});

export { app as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwZW5naW5lL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwiLi4vLi4vc3JjL2FwcGVuZ2luZS9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIi4uLy4uL3NyYy9hcHBlbmdpbmUvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlMaWtlVG9BcnJheS5qcyIsIi4uLy4uL3NyYy9hcHBlbmdpbmUvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCIuLi8uLi9zcmMvYXBwZW5naW5lL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL25vbkl0ZXJhYmxlUmVzdC5qcyIsIi4uLy4uL3NyYy9hcHBlbmdpbmUvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIi4uLy4uL3NyYy9hcHBlbmdpbmUvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvci5qcyIsIi4uLy4uL3NyYy9hcHBlbmdpbmUvbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIi4uLy4uL3NyYy9hcHBlbmdpbmUvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwiLi4vLi4vc3JjL2FwcGVuZ2luZS9ub2RlX21vZHVsZXMvbWFya2VkL2xpYi9tYXJrZWQuZXNtLmpzIiwiLi4vLi4vc3JjL2FwcGVuZ2luZS9saWIvYWNjZXNzLmpzIiwiLi4vLi4vc3JjL2FwcGVuZ2luZS9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlcztcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlMaWtlVG9BcnJheTtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJ2YXIgYXJyYXlMaWtlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIik7XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIik7XG5cbnZhciB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yO1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCIvKipcbiAqIG1hcmtlZCAtIGEgbWFya2Rvd24gcGFyc2VyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAyMSwgQ2hyaXN0b3BoZXIgSmVmZnJleS4gKE1JVCBMaWNlbnNlZClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZWRqcy9tYXJrZWRcbiAqL1xuXG4vKipcbiAqIERPIE5PVCBFRElUIFRISVMgRklMRVxuICogVGhlIGNvZGUgaW4gdGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBmcm9tIGZpbGVzIGluIC4vc3JjL1xuICovXG5cbnZhciBkZWZhdWx0cyQ1ID0ge2V4cG9ydHM6IHt9fTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdHMkMSgpIHtcbiAgcmV0dXJuIHtcbiAgICBiYXNlVXJsOiBudWxsLFxuICAgIGJyZWFrczogZmFsc2UsXG4gICAgZXh0ZW5zaW9uczogbnVsbCxcbiAgICBnZm06IHRydWUsXG4gICAgaGVhZGVySWRzOiB0cnVlLFxuICAgIGhlYWRlclByZWZpeDogJycsXG4gICAgaGlnaGxpZ2h0OiBudWxsLFxuICAgIGxhbmdQcmVmaXg6ICdsYW5ndWFnZS0nLFxuICAgIG1hbmdsZTogdHJ1ZSxcbiAgICBwZWRhbnRpYzogZmFsc2UsXG4gICAgcmVuZGVyZXI6IG51bGwsXG4gICAgc2FuaXRpemU6IGZhbHNlLFxuICAgIHNhbml0aXplcjogbnVsbCxcbiAgICBzaWxlbnQ6IGZhbHNlLFxuICAgIHNtYXJ0TGlzdHM6IGZhbHNlLFxuICAgIHNtYXJ0eXBhbnRzOiBmYWxzZSxcbiAgICB0b2tlbml6ZXI6IG51bGwsXG4gICAgd2Fsa1Rva2VuczogbnVsbCxcbiAgICB4aHRtbDogZmFsc2VcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hhbmdlRGVmYXVsdHMkMShuZXdEZWZhdWx0cykge1xuICBkZWZhdWx0cyQ1LmV4cG9ydHMuZGVmYXVsdHMgPSBuZXdEZWZhdWx0cztcbn1cblxuZGVmYXVsdHMkNS5leHBvcnRzID0ge1xuICBkZWZhdWx0czogZ2V0RGVmYXVsdHMkMSgpLFxuICBnZXREZWZhdWx0czogZ2V0RGVmYXVsdHMkMSxcbiAgY2hhbmdlRGVmYXVsdHM6IGNoYW5nZURlZmF1bHRzJDFcbn07XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5cbmNvbnN0IGVzY2FwZVRlc3QgPSAvWyY8PlwiJ10vO1xuY29uc3QgZXNjYXBlUmVwbGFjZSA9IC9bJjw+XCInXS9nO1xuY29uc3QgZXNjYXBlVGVzdE5vRW5jb2RlID0gL1s8PlwiJ118Jig/ISM/XFx3KzspLztcbmNvbnN0IGVzY2FwZVJlcGxhY2VOb0VuY29kZSA9IC9bPD5cIiddfCYoPyEjP1xcdys7KS9nO1xuY29uc3QgZXNjYXBlUmVwbGFjZW1lbnRzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiMzOTsnXG59O1xuY29uc3QgZ2V0RXNjYXBlUmVwbGFjZW1lbnQgPSAoY2gpID0+IGVzY2FwZVJlcGxhY2VtZW50c1tjaF07XG5mdW5jdGlvbiBlc2NhcGUkMyhodG1sLCBlbmNvZGUpIHtcbiAgaWYgKGVuY29kZSkge1xuICAgIGlmIChlc2NhcGVUZXN0LnRlc3QoaHRtbCkpIHtcbiAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoZXNjYXBlUmVwbGFjZSwgZ2V0RXNjYXBlUmVwbGFjZW1lbnQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZXNjYXBlVGVzdE5vRW5jb2RlLnRlc3QoaHRtbCkpIHtcbiAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoZXNjYXBlUmVwbGFjZU5vRW5jb2RlLCBnZXRFc2NhcGVSZXBsYWNlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGh0bWw7XG59XG5cbmNvbnN0IHVuZXNjYXBlVGVzdCA9IC8mKCMoPzpcXGQrKXwoPzojeFswLTlBLUZhLWZdKyl8KD86XFx3KykpOz8vaWc7XG5cbmZ1bmN0aW9uIHVuZXNjYXBlJDEoaHRtbCkge1xuICAvLyBleHBsaWNpdGx5IG1hdGNoIGRlY2ltYWwsIGhleCwgYW5kIG5hbWVkIEhUTUwgZW50aXRpZXNcbiAgcmV0dXJuIGh0bWwucmVwbGFjZSh1bmVzY2FwZVRlc3QsIChfLCBuKSA9PiB7XG4gICAgbiA9IG4udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobiA9PT0gJ2NvbG9uJykgcmV0dXJuICc6JztcbiAgICBpZiAobi5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgcmV0dXJuIG4uY2hhckF0KDEpID09PSAneCdcbiAgICAgICAgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG4uc3Vic3RyaW5nKDIpLCAxNikpXG4gICAgICAgIDogU3RyaW5nLmZyb21DaGFyQ29kZSgrbi5zdWJzdHJpbmcoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0pO1xufVxuXG5jb25zdCBjYXJldCA9IC8oXnxbXlxcW10pXFxeL2c7XG5mdW5jdGlvbiBlZGl0JDEocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHJlZ2V4LnNvdXJjZSB8fCByZWdleDtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICBjb25zdCBvYmogPSB7XG4gICAgcmVwbGFjZTogKG5hbWUsIHZhbCkgPT4ge1xuICAgICAgdmFsID0gdmFsLnNvdXJjZSB8fCB2YWw7XG4gICAgICB2YWwgPSB2YWwucmVwbGFjZShjYXJldCwgJyQxJyk7XG4gICAgICByZWdleCA9IHJlZ2V4LnJlcGxhY2UobmFtZSwgdmFsKTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICBnZXRSZWdleDogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgsIG9wdCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub25Xb3JkQW5kQ29sb25UZXN0ID0gL1teXFx3Ol0vZztcbmNvbnN0IG9yaWdpbkluZGVwZW5kZW50VXJsID0gL14kfF5bYS16XVthLXowLTkrLi1dKjp8Xls/I10vaTtcbmZ1bmN0aW9uIGNsZWFuVXJsJDEoc2FuaXRpemUsIGJhc2UsIGhyZWYpIHtcbiAgaWYgKHNhbml0aXplKSB7XG4gICAgbGV0IHByb3Q7XG4gICAgdHJ5IHtcbiAgICAgIHByb3QgPSBkZWNvZGVVUklDb21wb25lbnQodW5lc2NhcGUkMShocmVmKSlcbiAgICAgICAgLnJlcGxhY2Uobm9uV29yZEFuZENvbG9uVGVzdCwgJycpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCdkYXRhOicpID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgaWYgKGJhc2UgJiYgIW9yaWdpbkluZGVwZW5kZW50VXJsLnRlc3QoaHJlZikpIHtcbiAgICBocmVmID0gcmVzb2x2ZVVybChiYXNlLCBocmVmKTtcbiAgfVxuICB0cnkge1xuICAgIGhyZWYgPSBlbmNvZGVVUkkoaHJlZikucmVwbGFjZSgvJTI1L2csICclJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gaHJlZjtcbn1cblxuY29uc3QgYmFzZVVybHMgPSB7fTtcbmNvbnN0IGp1c3REb21haW4gPSAvXlteOl0rOlxcLypbXi9dKiQvO1xuY29uc3QgcHJvdG9jb2wgPSAvXihbXjpdKzopW1xcc1xcU10qJC87XG5jb25zdCBkb21haW4gPSAvXihbXjpdKzpcXC8qW14vXSopW1xcc1xcU10qJC87XG5cbmZ1bmN0aW9uIHJlc29sdmVVcmwoYmFzZSwgaHJlZikge1xuICBpZiAoIWJhc2VVcmxzWycgJyArIGJhc2VdKSB7XG4gICAgLy8gd2UgY2FuIGlnbm9yZSBldmVyeXRoaW5nIGluIGJhc2UgYWZ0ZXIgdGhlIGxhc3Qgc2xhc2ggb2YgaXRzIHBhdGggY29tcG9uZW50LFxuICAgIC8vIGJ1dCB3ZSBtaWdodCBuZWVkIHRvIGFkZCBfdGhhdF9cbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTNcbiAgICBpZiAoanVzdERvbWFpbi50ZXN0KGJhc2UpKSB7XG4gICAgICBiYXNlVXJsc1snICcgKyBiYXNlXSA9IGJhc2UgKyAnLyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhc2VVcmxzWycgJyArIGJhc2VdID0gcnRyaW0kMShiYXNlLCAnLycsIHRydWUpO1xuICAgIH1cbiAgfVxuICBiYXNlID0gYmFzZVVybHNbJyAnICsgYmFzZV07XG4gIGNvbnN0IHJlbGF0aXZlQmFzZSA9IGJhc2UuaW5kZXhPZignOicpID09PSAtMTtcblxuICBpZiAoaHJlZi5zdWJzdHJpbmcoMCwgMikgPT09ICcvLycpIHtcbiAgICBpZiAocmVsYXRpdmVCYXNlKSB7XG4gICAgICByZXR1cm4gaHJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGJhc2UucmVwbGFjZShwcm90b2NvbCwgJyQxJykgKyBocmVmO1xuICB9IGVsc2UgaWYgKGhyZWYuY2hhckF0KDApID09PSAnLycpIHtcbiAgICBpZiAocmVsYXRpdmVCYXNlKSB7XG4gICAgICByZXR1cm4gaHJlZjtcbiAgICB9XG4gICAgcmV0dXJuIGJhc2UucmVwbGFjZShkb21haW4sICckMScpICsgaHJlZjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZSArIGhyZWY7XG4gIH1cbn1cblxuY29uc3Qgbm9vcFRlc3QkMSA9IHsgZXhlYzogZnVuY3Rpb24gbm9vcFRlc3QoKSB7fSB9O1xuXG5mdW5jdGlvbiBtZXJnZSQyKG9iaikge1xuICBsZXQgaSA9IDEsXG4gICAgdGFyZ2V0LFxuICAgIGtleTtcblxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRhcmdldCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gdGFyZ2V0W2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gc3BsaXRDZWxscyQxKHRhYmxlUm93LCBjb3VudCkge1xuICAvLyBlbnN1cmUgdGhhdCBldmVyeSBjZWxsLWRlbGltaXRpbmcgcGlwZSBoYXMgYSBzcGFjZVxuICAvLyBiZWZvcmUgaXQgdG8gZGlzdGluZ3Vpc2ggaXQgZnJvbSBhbiBlc2NhcGVkIHBpcGVcbiAgY29uc3Qgcm93ID0gdGFibGVSb3cucmVwbGFjZSgvXFx8L2csIChtYXRjaCwgb2Zmc2V0LCBzdHIpID0+IHtcbiAgICAgIGxldCBlc2NhcGVkID0gZmFsc2UsXG4gICAgICAgIGN1cnIgPSBvZmZzZXQ7XG4gICAgICB3aGlsZSAoLS1jdXJyID49IDAgJiYgc3RyW2N1cnJdID09PSAnXFxcXCcpIGVzY2FwZWQgPSAhZXNjYXBlZDtcbiAgICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICAgIC8vIG9kZCBudW1iZXIgb2Ygc2xhc2hlcyBtZWFucyB8IGlzIGVzY2FwZWRcbiAgICAgICAgLy8gc28gd2UgbGVhdmUgaXQgYWxvbmVcbiAgICAgICAgcmV0dXJuICd8JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFkZCBzcGFjZSBiZWZvcmUgdW5lc2NhcGVkIHxcbiAgICAgICAgcmV0dXJuICcgfCc7XG4gICAgICB9XG4gICAgfSksXG4gICAgY2VsbHMgPSByb3cuc3BsaXQoLyBcXHwvKTtcbiAgbGV0IGkgPSAwO1xuXG4gIC8vIEZpcnN0L2xhc3QgY2VsbCBpbiBhIHJvdyBjYW5ub3QgYmUgZW1wdHkgaWYgaXQgaGFzIG5vIGxlYWRpbmcvdHJhaWxpbmcgcGlwZVxuICBpZiAoIWNlbGxzWzBdLnRyaW0oKSkgeyBjZWxscy5zaGlmdCgpOyB9XG4gIGlmICghY2VsbHNbY2VsbHMubGVuZ3RoIC0gMV0udHJpbSgpKSB7IGNlbGxzLnBvcCgpOyB9XG5cbiAgaWYgKGNlbGxzLmxlbmd0aCA+IGNvdW50KSB7XG4gICAgY2VsbHMuc3BsaWNlKGNvdW50KTtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoY2VsbHMubGVuZ3RoIDwgY291bnQpIGNlbGxzLnB1c2goJycpO1xuICB9XG5cbiAgZm9yICg7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgIC8vIGxlYWRpbmcgb3IgdHJhaWxpbmcgd2hpdGVzcGFjZSBpcyBpZ25vcmVkIHBlciB0aGUgZ2ZtIHNwZWNcbiAgICBjZWxsc1tpXSA9IGNlbGxzW2ldLnRyaW0oKS5yZXBsYWNlKC9cXFxcXFx8L2csICd8Jyk7XG4gIH1cbiAgcmV0dXJuIGNlbGxzO1xufVxuXG4vLyBSZW1vdmUgdHJhaWxpbmcgJ2Mncy4gRXF1aXZhbGVudCB0byBzdHIucmVwbGFjZSgvYyokLywgJycpLlxuLy8gL2MqJC8gaXMgdnVsbmVyYWJsZSB0byBSRURPUy5cbi8vIGludmVydDogUmVtb3ZlIHN1ZmZpeCBvZiBub24tYyBjaGFycyBpbnN0ZWFkLiBEZWZhdWx0IGZhbHNleS5cbmZ1bmN0aW9uIHJ0cmltJDEoc3RyLCBjLCBpbnZlcnQpIHtcbiAgY29uc3QgbCA9IHN0ci5sZW5ndGg7XG4gIGlmIChsID09PSAwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLy8gTGVuZ3RoIG9mIHN1ZmZpeCBtYXRjaGluZyB0aGUgaW52ZXJ0IGNvbmRpdGlvbi5cbiAgbGV0IHN1ZmZMZW4gPSAwO1xuXG4gIC8vIFN0ZXAgbGVmdCB1bnRpbCB3ZSBmYWlsIHRvIG1hdGNoIHRoZSBpbnZlcnQgY29uZGl0aW9uLlxuICB3aGlsZSAoc3VmZkxlbiA8IGwpIHtcbiAgICBjb25zdCBjdXJyQ2hhciA9IHN0ci5jaGFyQXQobCAtIHN1ZmZMZW4gLSAxKTtcbiAgICBpZiAoY3VyckNoYXIgPT09IGMgJiYgIWludmVydCkge1xuICAgICAgc3VmZkxlbisrO1xuICAgIH0gZWxzZSBpZiAoY3VyckNoYXIgIT09IGMgJiYgaW52ZXJ0KSB7XG4gICAgICBzdWZmTGVuKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHIuc3Vic3RyKDAsIGwgLSBzdWZmTGVuKTtcbn1cblxuZnVuY3Rpb24gZmluZENsb3NpbmdCcmFja2V0JDEoc3RyLCBiKSB7XG4gIGlmIChzdHIuaW5kZXhPZihiWzFdKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgY29uc3QgbCA9IHN0ci5sZW5ndGg7XG4gIGxldCBsZXZlbCA9IDAsXG4gICAgaSA9IDA7XG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKHN0cltpXSA9PT0gJ1xcXFwnKSB7XG4gICAgICBpKys7XG4gICAgfSBlbHNlIGlmIChzdHJbaV0gPT09IGJbMF0pIHtcbiAgICAgIGxldmVsKys7XG4gICAgfSBlbHNlIGlmIChzdHJbaV0gPT09IGJbMV0pIHtcbiAgICAgIGxldmVsLS07XG4gICAgICBpZiAobGV2ZWwgPCAwKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGNoZWNrU2FuaXRpemVEZXByZWNhdGlvbiQxKG9wdCkge1xuICBpZiAob3B0ICYmIG9wdC5zYW5pdGl6ZSAmJiAhb3B0LnNpbGVudCkge1xuICAgIGNvbnNvbGUud2FybignbWFya2VkKCk6IHNhbml0aXplIGFuZCBzYW5pdGl6ZXIgcGFyYW1ldGVycyBhcmUgZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDAuNy4wLCBzaG91bGQgbm90IGJlIHVzZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLiBSZWFkIG1vcmUgaGVyZTogaHR0cHM6Ly9tYXJrZWQuanMub3JnLyMvVVNJTkdfQURWQU5DRUQubWQjb3B0aW9ucycpO1xuICB9XG59XG5cbi8vIGNvcGllZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NDUwMTEzLzgwNjc3N1xuZnVuY3Rpb24gcmVwZWF0U3RyaW5nJDEocGF0dGVybiwgY291bnQpIHtcbiAgaWYgKGNvdW50IDwgMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBsZXQgcmVzdWx0ID0gJyc7XG4gIHdoaWxlIChjb3VudCA+IDEpIHtcbiAgICBpZiAoY291bnQgJiAxKSB7XG4gICAgICByZXN1bHQgKz0gcGF0dGVybjtcbiAgICB9XG4gICAgY291bnQgPj49IDE7XG4gICAgcGF0dGVybiArPSBwYXR0ZXJuO1xuICB9XG4gIHJldHVybiByZXN1bHQgKyBwYXR0ZXJuO1xufVxuXG52YXIgaGVscGVycyA9IHtcbiAgZXNjYXBlOiBlc2NhcGUkMyxcbiAgdW5lc2NhcGU6IHVuZXNjYXBlJDEsXG4gIGVkaXQ6IGVkaXQkMSxcbiAgY2xlYW5Vcmw6IGNsZWFuVXJsJDEsXG4gIHJlc29sdmVVcmwsXG4gIG5vb3BUZXN0OiBub29wVGVzdCQxLFxuICBtZXJnZTogbWVyZ2UkMixcbiAgc3BsaXRDZWxsczogc3BsaXRDZWxscyQxLFxuICBydHJpbTogcnRyaW0kMSxcbiAgZmluZENsb3NpbmdCcmFja2V0OiBmaW5kQ2xvc2luZ0JyYWNrZXQkMSxcbiAgY2hlY2tTYW5pdGl6ZURlcHJlY2F0aW9uOiBjaGVja1Nhbml0aXplRGVwcmVjYXRpb24kMSxcbiAgcmVwZWF0U3RyaW5nOiByZXBlYXRTdHJpbmckMVxufTtcblxuY29uc3QgeyBkZWZhdWx0czogZGVmYXVsdHMkNCB9ID0gZGVmYXVsdHMkNS5leHBvcnRzO1xuY29uc3Qge1xuICBydHJpbSxcbiAgc3BsaXRDZWxscyxcbiAgZXNjYXBlOiBlc2NhcGUkMixcbiAgZmluZENsb3NpbmdCcmFja2V0XG59ID0gaGVscGVycztcblxuZnVuY3Rpb24gb3V0cHV0TGluayhjYXAsIGxpbmssIHJhdywgbGV4ZXIpIHtcbiAgY29uc3QgaHJlZiA9IGxpbmsuaHJlZjtcbiAgY29uc3QgdGl0bGUgPSBsaW5rLnRpdGxlID8gZXNjYXBlJDIobGluay50aXRsZSkgOiBudWxsO1xuICBjb25zdCB0ZXh0ID0gY2FwWzFdLnJlcGxhY2UoL1xcXFwoW1xcW1xcXV0pL2csICckMScpO1xuXG4gIGlmIChjYXBbMF0uY2hhckF0KDApICE9PSAnIScpIHtcbiAgICBsZXhlci5zdGF0ZS5pbkxpbmsgPSB0cnVlO1xuICAgIGNvbnN0IHRva2VuID0ge1xuICAgICAgdHlwZTogJ2xpbmsnLFxuICAgICAgcmF3LFxuICAgICAgaHJlZixcbiAgICAgIHRpdGxlLFxuICAgICAgdGV4dCxcbiAgICAgIHRva2VuczogbGV4ZXIuaW5saW5lVG9rZW5zKHRleHQsIFtdKVxuICAgIH07XG4gICAgbGV4ZXIuc3RhdGUuaW5MaW5rID0gZmFsc2U7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgcmF3LFxuICAgICAgaHJlZixcbiAgICAgIHRpdGxlLFxuICAgICAgdGV4dDogZXNjYXBlJDIodGV4dClcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGluZGVudENvZGVDb21wZW5zYXRpb24ocmF3LCB0ZXh0KSB7XG4gIGNvbnN0IG1hdGNoSW5kZW50VG9Db2RlID0gcmF3Lm1hdGNoKC9eKFxccyspKD86YGBgKS8pO1xuXG4gIGlmIChtYXRjaEluZGVudFRvQ29kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgY29uc3QgaW5kZW50VG9Db2RlID0gbWF0Y2hJbmRlbnRUb0NvZGVbMV07XG5cbiAgcmV0dXJuIHRleHRcbiAgICAuc3BsaXQoJ1xcbicpXG4gICAgLm1hcChub2RlID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoSW5kZW50SW5Ob2RlID0gbm9kZS5tYXRjaCgvXlxccysvKTtcbiAgICAgIGlmIChtYXRjaEluZGVudEluTm9kZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgW2luZGVudEluTm9kZV0gPSBtYXRjaEluZGVudEluTm9kZTtcblxuICAgICAgaWYgKGluZGVudEluTm9kZS5sZW5ndGggPj0gaW5kZW50VG9Db2RlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbm9kZS5zbGljZShpbmRlbnRUb0NvZGUubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSlcbiAgICAuam9pbignXFxuJyk7XG59XG5cbi8qKlxuICogVG9rZW5pemVyXG4gKi9cbnZhciBUb2tlbml6ZXJfMSA9IGNsYXNzIFRva2VuaXplciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGRlZmF1bHRzJDQ7XG4gIH1cblxuICBzcGFjZShzcmMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLm5ld2xpbmUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIGlmIChjYXBbMF0ubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6ICdzcGFjZScsXG4gICAgICAgICAgcmF3OiBjYXBbMF1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHJhdzogJ1xcbicgfTtcbiAgICB9XG4gIH1cblxuICBjb2RlKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuYmxvY2suY29kZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgY29uc3QgdGV4dCA9IGNhcFswXS5yZXBsYWNlKC9eIHsxLDR9L2dtLCAnJyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBjb2RlQmxvY2tTdHlsZTogJ2luZGVudGVkJyxcbiAgICAgICAgdGV4dDogIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICAgID8gcnRyaW0odGV4dCwgJ1xcbicpXG4gICAgICAgICAgOiB0ZXh0XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGZlbmNlcyhzcmMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmZlbmNlcy5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgY29uc3QgcmF3ID0gY2FwWzBdO1xuICAgICAgY29uc3QgdGV4dCA9IGluZGVudENvZGVDb21wZW5zYXRpb24ocmF3LCBjYXBbM10gfHwgJycpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIHJhdyxcbiAgICAgICAgbGFuZzogY2FwWzJdID8gY2FwWzJdLnRyaW0oKSA6IGNhcFsyXSxcbiAgICAgICAgdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBoZWFkaW5nKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuYmxvY2suaGVhZGluZy5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgbGV0IHRleHQgPSBjYXBbMl0udHJpbSgpO1xuXG4gICAgICAvLyByZW1vdmUgdHJhaWxpbmcgI3NcbiAgICAgIGlmICgvIyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgY29uc3QgdHJpbW1lZCA9IHJ0cmltKHRleHQsICcjJyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgICAgICB0ZXh0ID0gdHJpbW1lZC50cmltKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRyaW1tZWQgfHwgLyAkLy50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICAgICAgLy8gQ29tbW9uTWFyayByZXF1aXJlcyBzcGFjZSBiZWZvcmUgdHJhaWxpbmcgI3NcbiAgICAgICAgICB0ZXh0ID0gdHJpbW1lZC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdG9rZW4gPSB7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIGRlcHRoOiBjYXBbMV0ubGVuZ3RoLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICB0b2tlbnM6IFtdXG4gICAgICB9O1xuICAgICAgdGhpcy5sZXhlci5pbmxpbmUodG9rZW4udGV4dCwgdG9rZW4udG9rZW5zKTtcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gIH1cblxuICBocihzcmMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmhyLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnaHInLFxuICAgICAgICByYXc6IGNhcFswXVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBibG9ja3F1b3RlKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuYmxvY2suYmxvY2txdW90ZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgY29uc3QgdGV4dCA9IGNhcFswXS5yZXBsYWNlKC9eICo+ID8vZ20sICcnKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGUnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmJsb2NrVG9rZW5zKHRleHQsIFtdKSxcbiAgICAgICAgdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBsaXN0KHNyYykge1xuICAgIGxldCBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmxpc3QuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIGxldCByYXcsIGlzdGFzaywgaXNjaGVja2VkLCBpbmRlbnQsIGksIGJsYW5rTGluZSwgZW5kc1dpdGhCbGFua0xpbmUsXG4gICAgICAgIGxpbmUsIGxpbmVzLCBpdGVtQ29udGVudHM7XG5cbiAgICAgIGxldCBidWxsID0gY2FwWzFdLnRyaW0oKTtcbiAgICAgIGNvbnN0IGlzb3JkZXJlZCA9IGJ1bGwubGVuZ3RoID4gMTtcblxuICAgICAgY29uc3QgbGlzdCA9IHtcbiAgICAgICAgdHlwZTogJ2xpc3QnLFxuICAgICAgICByYXc6ICcnLFxuICAgICAgICBvcmRlcmVkOiBpc29yZGVyZWQsXG4gICAgICAgIHN0YXJ0OiBpc29yZGVyZWQgPyArYnVsbC5zbGljZSgwLCAtMSkgOiAnJyxcbiAgICAgICAgbG9vc2U6IGZhbHNlLFxuICAgICAgICBpdGVtczogW11cbiAgICAgIH07XG5cbiAgICAgIGJ1bGwgPSBpc29yZGVyZWQgPyBgXFxcXGR7MSw5fVxcXFwke2J1bGwuc2xpY2UoLTEpfWAgOiBgXFxcXCR7YnVsbH1gO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgICAgIGJ1bGwgPSBpc29yZGVyZWQgPyBidWxsIDogJ1sqKy1dJztcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IG5leHQgbGlzdCBpdGVtXG4gICAgICBjb25zdCBpdGVtUmVnZXggPSBuZXcgUmVnRXhwKGBeKCB7MCwzfSR7YnVsbH0pKCg/OiBbXlxcXFxuXSp8ICopKD86XFxcXG5bXlxcXFxuXSopKig/OlxcXFxufCQpKWApO1xuXG4gICAgICAvLyBHZXQgZWFjaCB0b3AtbGV2ZWwgaXRlbVxuICAgICAgd2hpbGUgKHNyYykge1xuICAgICAgICBpZiAodGhpcy5ydWxlcy5ibG9jay5oci50ZXN0KHNyYykpIHsgLy8gRW5kIGxpc3QgaWYgd2UgZW5jb3VudGVyIGFuIEhSIChwb3NzaWJseSBtb3ZlIGludG8gaXRlbVJlZ2V4PylcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNhcCA9IGl0ZW1SZWdleC5leGVjKHNyYykpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBsaW5lcyA9IGNhcFsyXS5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICAgIGluZGVudCA9IDI7XG4gICAgICAgICAgaXRlbUNvbnRlbnRzID0gbGluZXNbMF0udHJpbUxlZnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmRlbnQgPSBjYXBbMl0uc2VhcmNoKC9bXiBdLyk7IC8vIEZpbmQgZmlyc3Qgbm9uLXNwYWNlIGNoYXJcbiAgICAgICAgICBpbmRlbnQgPSBjYXBbMV0ubGVuZ3RoICsgKGluZGVudCA+IDQgPyAxIDogaW5kZW50KTsgLy8gaW50ZW50ZWQgY29kZSBibG9ja3MgYWZ0ZXIgNCBzcGFjZXM7IGluZGVudCBpcyBhbHdheXMgMVxuICAgICAgICAgIGl0ZW1Db250ZW50cyA9IGxpbmVzWzBdLnNsaWNlKGluZGVudCAtIGNhcFsxXS5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmxhbmtMaW5lID0gZmFsc2U7XG4gICAgICAgIHJhdyA9IGNhcFswXTtcblxuICAgICAgICBpZiAoIWxpbmVzWzBdICYmIC9eICokLy50ZXN0KGxpbmVzWzFdKSkgeyAvLyBpdGVtcyBiZWdpbiB3aXRoIGF0IG1vc3Qgb25lIGJsYW5rIGxpbmVcbiAgICAgICAgICByYXcgPSBjYXBbMV0gKyBsaW5lcy5zbGljZSgwLCAyKS5qb2luKCdcXG4nKSArICdcXG4nO1xuICAgICAgICAgIGxpc3QubG9vc2UgPSB0cnVlO1xuICAgICAgICAgIGxpbmVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0QnVsbGV0UmVnZXggPSBuZXcgUmVnRXhwKGBeIHswLCR7TWF0aC5taW4oMywgaW5kZW50IC0gMSl9fSg/OlsqKy1dfFxcXFxkezEsOX1bLildKWApO1xuXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxpbmUgPSBsaW5lc1tpXTtcblxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHsgLy8gUmUtYWxpZ24gdG8gZm9sbG93IGNvbW1vbm1hcmsgbmVzdGluZyBydWxlc1xuICAgICAgICAgICAgbGluZSA9IGxpbmUucmVwbGFjZSgvXiB7MSw0fSg/PSggezR9KSpbXiBdKS9nLCAnICAnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBFbmQgbGlzdCBpdGVtIGlmIGZvdW5kIHN0YXJ0IG9mIG5ldyBidWxsZXRcbiAgICAgICAgICBpZiAobmV4dEJ1bGxldFJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIHJhdyA9IGNhcFsxXSArIGxpbmVzLnNsaWNlKDAsIGkpLmpvaW4oJ1xcbicpICsgJ1xcbic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBVbnRpbCB3ZSBlbmNvdW50ZXIgYSBibGFuayBsaW5lLCBpdGVtIGNvbnRlbnRzIGRvIG5vdCBuZWVkIGluZGVudGF0aW9uXG4gICAgICAgICAgaWYgKCFibGFua0xpbmUpIHtcbiAgICAgICAgICAgIGlmICghbGluZS50cmltKCkpIHsgLy8gQ2hlY2sgaWYgY3VycmVudCBsaW5lIGlzIGVtcHR5XG4gICAgICAgICAgICAgIGJsYW5rTGluZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERlZGVudCBpZiBwb3NzaWJsZVxuICAgICAgICAgICAgaWYgKGxpbmUuc2VhcmNoKC9bXiBdLykgPj0gaW5kZW50KSB7XG4gICAgICAgICAgICAgIGl0ZW1Db250ZW50cyArPSAnXFxuJyArIGxpbmUuc2xpY2UoaW5kZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGl0ZW1Db250ZW50cyArPSAnXFxuJyArIGxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEZWRlbnQgdGhpcyBsaW5lXG4gICAgICAgICAgaWYgKGxpbmUuc2VhcmNoKC9bXiBdLykgPj0gaW5kZW50IHx8ICFsaW5lLnRyaW0oKSkge1xuICAgICAgICAgICAgaXRlbUNvbnRlbnRzICs9ICdcXG4nICsgbGluZS5zbGljZShpbmRlbnQpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gTGluZSB3YXMgbm90IHByb3Blcmx5IGluZGVudGVkOyBlbmQgb2YgdGhpcyBpdGVtXG4gICAgICAgICAgICByYXcgPSBjYXBbMV0gKyBsaW5lcy5zbGljZSgwLCBpKS5qb2luKCdcXG4nKSArICdcXG4nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFsaXN0Lmxvb3NlKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIHByZXZpb3VzIGl0ZW0gZW5kZWQgd2l0aCBhIGJsYW5rIGxpbmUsIHRoZSBsaXN0IGlzIGxvb3NlXG4gICAgICAgICAgaWYgKGVuZHNXaXRoQmxhbmtMaW5lKSB7XG4gICAgICAgICAgICBsaXN0Lmxvb3NlID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKC9cXG4gKlxcbiAqJC8udGVzdChyYXcpKSB7XG4gICAgICAgICAgICBlbmRzV2l0aEJsYW5rTGluZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRhc2sgbGlzdCBpdGVtc1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgICAgICAgIGlzdGFzayA9IC9eXFxbWyB4WF1cXF0gLy5leGVjKGl0ZW1Db250ZW50cyk7XG4gICAgICAgICAgaWYgKGlzdGFzaykge1xuICAgICAgICAgICAgaXNjaGVja2VkID0gaXN0YXNrWzBdICE9PSAnWyBdICc7XG4gICAgICAgICAgICBpdGVtQ29udGVudHMgPSBpdGVtQ29udGVudHMucmVwbGFjZSgvXlxcW1sgeFhdXFxdICsvLCAnJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5pdGVtcy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnbGlzdF9pdGVtJyxcbiAgICAgICAgICByYXc6IHJhdyxcbiAgICAgICAgICB0YXNrOiAhIWlzdGFzayxcbiAgICAgICAgICBjaGVja2VkOiBpc2NoZWNrZWQsXG4gICAgICAgICAgbG9vc2U6IGZhbHNlLFxuICAgICAgICAgIHRleHQ6IGl0ZW1Db250ZW50c1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0LnJhdyArPSByYXc7XG4gICAgICAgIHNyYyA9IHNyYy5zbGljZShyYXcubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRG8gbm90IGNvbnN1bWUgbmV3bGluZXMgYXQgZW5kIG9mIGZpbmFsIGl0ZW0uIEFsdGVybmF0aXZlbHksIG1ha2UgaXRlbVJlZ2V4ICpzdGFydCogd2l0aCBhbnkgbmV3bGluZXMgdG8gc2ltcGxpZnkvc3BlZWQgdXAgZW5kc1dpdGhCbGFua0xpbmUgbG9naWNcbiAgICAgIGxpc3QuaXRlbXNbbGlzdC5pdGVtcy5sZW5ndGggLSAxXS5yYXcgPSByYXcudHJpbVJpZ2h0KCk7XG4gICAgICBsaXN0Lml0ZW1zW2xpc3QuaXRlbXMubGVuZ3RoIC0gMV0udGV4dCA9IGl0ZW1Db250ZW50cy50cmltUmlnaHQoKTtcbiAgICAgIGxpc3QucmF3ID0gbGlzdC5yYXcudHJpbVJpZ2h0KCk7XG5cbiAgICAgIGNvbnN0IGwgPSBsaXN0Lml0ZW1zLmxlbmd0aDtcblxuICAgICAgLy8gSXRlbSBjaGlsZCB0b2tlbnMgaGFuZGxlZCBoZXJlIGF0IGVuZCBiZWNhdXNlIHdlIG5lZWRlZCB0byBoYXZlIHRoZSBmaW5hbCBpdGVtIHRvIHRyaW0gaXQgZmlyc3RcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS50b3AgPSBmYWxzZTtcbiAgICAgICAgbGlzdC5pdGVtc1tpXS50b2tlbnMgPSB0aGlzLmxleGVyLmJsb2NrVG9rZW5zKGxpc3QuaXRlbXNbaV0udGV4dCwgW10pO1xuICAgICAgICBpZiAobGlzdC5pdGVtc1tpXS50b2tlbnMuc29tZSh0ID0+IHQudHlwZSA9PT0gJ3NwYWNlJykpIHtcbiAgICAgICAgICBsaXN0Lmxvb3NlID0gdHJ1ZTtcbiAgICAgICAgICBsaXN0Lml0ZW1zW2ldLmxvb3NlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gIH1cblxuICBodG1sKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuYmxvY2suaHRtbC5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgY29uc3QgdG9rZW4gPSB7XG4gICAgICAgIHR5cGU6ICdodG1sJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHByZTogIXRoaXMub3B0aW9ucy5zYW5pdGl6ZXJcbiAgICAgICAgICAmJiAoY2FwWzFdID09PSAncHJlJyB8fCBjYXBbMV0gPT09ICdzY3JpcHQnIHx8IGNhcFsxXSA9PT0gJ3N0eWxlJyksXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICAgICAgdG9rZW4udHlwZSA9ICdwYXJhZ3JhcGgnO1xuICAgICAgICB0b2tlbi50ZXh0ID0gdGhpcy5vcHRpb25zLnNhbml0aXplciA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoY2FwWzBdKSA6IGVzY2FwZSQyKGNhcFswXSk7XG4gICAgICAgIHRva2VuLnRva2VucyA9IFtdO1xuICAgICAgICB0aGlzLmxleGVyLmlubGluZSh0b2tlbi50ZXh0LCB0b2tlbi50b2tlbnMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgfVxuXG4gIGRlZihzcmMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmRlZi5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgaWYgKGNhcFszXSkgY2FwWzNdID0gY2FwWzNdLnN1YnN0cmluZygxLCBjYXBbM10ubGVuZ3RoIC0gMSk7XG4gICAgICBjb25zdCB0YWcgPSBjYXBbMV0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZGVmJyxcbiAgICAgICAgdGFnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgaHJlZjogY2FwWzJdLFxuICAgICAgICB0aXRsZTogY2FwWzNdXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHRhYmxlKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuYmxvY2sudGFibGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogc3BsaXRDZWxscyhjYXBbMV0pLm1hcChjID0+IHsgcmV0dXJuIHsgdGV4dDogYyB9OyB9KSxcbiAgICAgICAgYWxpZ246IGNhcFsyXS5yZXBsYWNlKC9eICp8XFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICByb3dzOiBjYXBbM10gPyBjYXBbM10ucmVwbGFjZSgvXFxuJC8sICcnKS5zcGxpdCgnXFxuJykgOiBbXVxuICAgICAgfTtcblxuICAgICAgaWYgKGl0ZW0uaGVhZGVyLmxlbmd0aCA9PT0gaXRlbS5hbGlnbi5sZW5ndGgpIHtcbiAgICAgICAgaXRlbS5yYXcgPSBjYXBbMF07XG5cbiAgICAgICAgbGV0IGwgPSBpdGVtLmFsaWduLmxlbmd0aDtcbiAgICAgICAgbGV0IGksIGosIGssIHJvdztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsID0gaXRlbS5yb3dzLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGl0ZW0ucm93c1tpXSA9IHNwbGl0Q2VsbHMoaXRlbS5yb3dzW2ldLCBpdGVtLmhlYWRlci5sZW5ndGgpLm1hcChjID0+IHsgcmV0dXJuIHsgdGV4dDogYyB9OyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBhcnNlIGNoaWxkIHRva2VucyBpbnNpZGUgaGVhZGVycyBhbmQgY2VsbHNcblxuICAgICAgICAvLyBoZWFkZXIgY2hpbGQgdG9rZW5zXG4gICAgICAgIGwgPSBpdGVtLmhlYWRlci5sZW5ndGg7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICBpdGVtLmhlYWRlcltqXS50b2tlbnMgPSBbXTtcbiAgICAgICAgICB0aGlzLmxleGVyLmlubGluZVRva2VucyhpdGVtLmhlYWRlcltqXS50ZXh0LCBpdGVtLmhlYWRlcltqXS50b2tlbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2VsbCBjaGlsZCB0b2tlbnNcbiAgICAgICAgbCA9IGl0ZW0ucm93cy5sZW5ndGg7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICByb3cgPSBpdGVtLnJvd3Nbal07XG4gICAgICAgICAgZm9yIChrID0gMDsgayA8IHJvdy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgcm93W2tdLnRva2VucyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5sZXhlci5pbmxpbmVUb2tlbnMocm93W2tdLnRleHQsIHJvd1trXS50b2tlbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxoZWFkaW5nKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuYmxvY2subGhlYWRpbmcuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIGNvbnN0IHRva2VuID0ge1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBkZXB0aDogY2FwWzJdLmNoYXJBdCgwKSA9PT0gJz0nID8gMSA6IDIsXG4gICAgICAgIHRleHQ6IGNhcFsxXSxcbiAgICAgICAgdG9rZW5zOiBbXVxuICAgICAgfTtcbiAgICAgIHRoaXMubGV4ZXIuaW5saW5lKHRva2VuLnRleHQsIHRva2VuLnRva2Vucyk7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICB9XG5cbiAgcGFyYWdyYXBoKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuYmxvY2sucGFyYWdyYXBoLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHtcbiAgICAgICAgdHlwZTogJ3BhcmFncmFwaCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiBjYXBbMV0uY2hhckF0KGNhcFsxXS5sZW5ndGggLSAxKSA9PT0gJ1xcbidcbiAgICAgICAgICA/IGNhcFsxXS5zbGljZSgwLCAtMSlcbiAgICAgICAgICA6IGNhcFsxXSxcbiAgICAgICAgdG9rZW5zOiBbXVxuICAgICAgfTtcbiAgICAgIHRoaXMubGV4ZXIuaW5saW5lKHRva2VuLnRleHQsIHRva2VuLnRva2Vucyk7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICB9XG5cbiAgdGV4dChzcmMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLnRleHQuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIGNvbnN0IHRva2VuID0ge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiBjYXBbMF0sXG4gICAgICAgIHRva2VuczogW11cbiAgICAgIH07XG4gICAgICB0aGlzLmxleGVyLmlubGluZSh0b2tlbi50ZXh0LCB0b2tlbi50b2tlbnMpO1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZShzcmMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5lc2NhcGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdlc2NhcGUnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogZXNjYXBlJDIoY2FwWzFdKVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICB0YWcoc3JjKSB7XG4gICAgY29uc3QgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUudGFnLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICBpZiAoIXRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rICYmIC9ePGEgL2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZXhlci5zdGF0ZS5pbkxpbmsgJiYgL148XFwvYT4vaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrICYmIC9ePChwcmV8Y29kZXxrYmR8c2NyaXB0KShcXHN8PikvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrICYmIC9ePFxcLyhwcmV8Y29kZXxrYmR8c2NyaXB0KShcXHN8PikvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICAgID8gJ3RleHQnXG4gICAgICAgICAgOiAnaHRtbCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBpbkxpbms6IHRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rLFxuICAgICAgICBpblJhd0Jsb2NrOiB0aGlzLmxleGVyLnN0YXRlLmluUmF3QmxvY2ssXG4gICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICAgID8gKHRoaXMub3B0aW9ucy5zYW5pdGl6ZXJcbiAgICAgICAgICAgID8gdGhpcy5vcHRpb25zLnNhbml0aXplcihjYXBbMF0pXG4gICAgICAgICAgICA6IGVzY2FwZSQyKGNhcFswXSkpXG4gICAgICAgICAgOiBjYXBbMF1cbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbGluayhzcmMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5saW5rLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICBjb25zdCB0cmltbWVkVXJsID0gY2FwWzJdLnRyaW0oKTtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnBlZGFudGljICYmIC9ePC8udGVzdCh0cmltbWVkVXJsKSkge1xuICAgICAgICAvLyBjb21tb25tYXJrIHJlcXVpcmVzIG1hdGNoaW5nIGFuZ2xlIGJyYWNrZXRzXG4gICAgICAgIGlmICghKC8+JC8udGVzdCh0cmltbWVkVXJsKSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmRpbmcgYW5nbGUgYnJhY2tldCBjYW5ub3QgYmUgZXNjYXBlZFxuICAgICAgICBjb25zdCBydHJpbVNsYXNoID0gcnRyaW0odHJpbW1lZFVybC5zbGljZSgwLCAtMSksICdcXFxcJyk7XG4gICAgICAgIGlmICgodHJpbW1lZFVybC5sZW5ndGggLSBydHJpbVNsYXNoLmxlbmd0aCkgJSAyID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaW5kIGNsb3NpbmcgcGFyZW50aGVzaXNcbiAgICAgICAgY29uc3QgbGFzdFBhcmVuSW5kZXggPSBmaW5kQ2xvc2luZ0JyYWNrZXQoY2FwWzJdLCAnKCknKTtcbiAgICAgICAgaWYgKGxhc3RQYXJlbkluZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBzdGFydCA9IGNhcFswXS5pbmRleE9mKCchJykgPT09IDAgPyA1IDogNDtcbiAgICAgICAgICBjb25zdCBsaW5rTGVuID0gc3RhcnQgKyBjYXBbMV0ubGVuZ3RoICsgbGFzdFBhcmVuSW5kZXg7XG4gICAgICAgICAgY2FwWzJdID0gY2FwWzJdLnN1YnN0cmluZygwLCBsYXN0UGFyZW5JbmRleCk7XG4gICAgICAgICAgY2FwWzBdID0gY2FwWzBdLnN1YnN0cmluZygwLCBsaW5rTGVuKS50cmltKCk7XG4gICAgICAgICAgY2FwWzNdID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCBocmVmID0gY2FwWzJdO1xuICAgICAgbGV0IHRpdGxlID0gJyc7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgICAgIC8vIHNwbGl0IHBlZGFudGljIGhyZWYgYW5kIHRpdGxlXG4gICAgICAgIGNvbnN0IGxpbmsgPSAvXihbXidcIl0qW15cXHNdKVxccysoWydcIl0pKC4qKVxcMi8uZXhlYyhocmVmKTtcblxuICAgICAgICBpZiAobGluaykge1xuICAgICAgICAgIGhyZWYgPSBsaW5rWzFdO1xuICAgICAgICAgIHRpdGxlID0gbGlua1szXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGl0bGUgPSBjYXBbM10gPyBjYXBbM10uc2xpY2UoMSwgLTEpIDogJyc7XG4gICAgICB9XG5cbiAgICAgIGhyZWYgPSBocmVmLnRyaW0oKTtcbiAgICAgIGlmICgvXjwvLnRlc3QoaHJlZikpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYyAmJiAhKC8+JC8udGVzdCh0cmltbWVkVXJsKSkpIHtcbiAgICAgICAgICAvLyBwZWRhbnRpYyBhbGxvd3Mgc3RhcnRpbmcgYW5nbGUgYnJhY2tldCB3aXRob3V0IGVuZGluZyBhbmdsZSBicmFja2V0XG4gICAgICAgICAgaHJlZiA9IGhyZWYuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHJlZiA9IGhyZWYuc2xpY2UoMSwgLTEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0TGluayhjYXAsIHtcbiAgICAgICAgaHJlZjogaHJlZiA/IGhyZWYucmVwbGFjZSh0aGlzLnJ1bGVzLmlubGluZS5fZXNjYXBlcywgJyQxJykgOiBocmVmLFxuICAgICAgICB0aXRsZTogdGl0bGUgPyB0aXRsZS5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6IHRpdGxlXG4gICAgICB9LCBjYXBbMF0sIHRoaXMubGV4ZXIpO1xuICAgIH1cbiAgfVxuXG4gIHJlZmxpbmsoc3JjLCBsaW5rcykge1xuICAgIGxldCBjYXA7XG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5yZWZsaW5rLmV4ZWMoc3JjKSlcbiAgICAgICAgfHwgKGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLm5vbGluay5leGVjKHNyYykpKSB7XG4gICAgICBsZXQgbGluayA9IChjYXBbMl0gfHwgY2FwWzFdKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICBsaW5rID0gbGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluayB8fCAhbGluay5ocmVmKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBjYXBbMF0uY2hhckF0KDApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICByYXc6IHRleHQsXG4gICAgICAgICAgdGV4dFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dExpbmsoY2FwLCBsaW5rLCBjYXBbMF0sIHRoaXMubGV4ZXIpO1xuICAgIH1cbiAgfVxuXG4gIGVtU3Ryb25nKHNyYywgbWFza2VkU3JjLCBwcmV2Q2hhciA9ICcnKSB7XG4gICAgbGV0IG1hdGNoID0gdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcubERlbGltLmV4ZWMoc3JjKTtcbiAgICBpZiAoIW1hdGNoKSByZXR1cm47XG5cbiAgICAvLyBfIGNhbid0IGJlIGJldHdlZW4gdHdvIGFscGhhbnVtZXJpY3MuIFxccHtMfVxccHtOfSBpbmNsdWRlcyBub24tZW5nbGlzaCBhbHBoYWJldC9udW1iZXJzIGFzIHdlbGxcbiAgICBpZiAobWF0Y2hbM10gJiYgcHJldkNoYXIubWF0Y2goL1tcXHB7TH1cXHB7Tn1dL3UpKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXh0Q2hhciA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8ICcnO1xuXG4gICAgaWYgKCFuZXh0Q2hhciB8fCAobmV4dENoYXIgJiYgKHByZXZDaGFyID09PSAnJyB8fCB0aGlzLnJ1bGVzLmlubGluZS5wdW5jdHVhdGlvbi5leGVjKHByZXZDaGFyKSkpKSB7XG4gICAgICBjb25zdCBsTGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoIC0gMTtcbiAgICAgIGxldCByRGVsaW0sIHJMZW5ndGgsIGRlbGltVG90YWwgPSBsTGVuZ3RoLCBtaWREZWxpbVRvdGFsID0gMDtcblxuICAgICAgY29uc3QgZW5kUmVnID0gbWF0Y2hbMF1bMF0gPT09ICcqJyA/IHRoaXMucnVsZXMuaW5saW5lLmVtU3Ryb25nLnJEZWxpbUFzdCA6IHRoaXMucnVsZXMuaW5saW5lLmVtU3Ryb25nLnJEZWxpbVVuZDtcbiAgICAgIGVuZFJlZy5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAvLyBDbGlwIG1hc2tlZFNyYyB0byBzYW1lIHNlY3Rpb24gb2Ygc3RyaW5nIGFzIHNyYyAobW92ZSB0byBsZXhlcj8pXG4gICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoLTEgKiBzcmMubGVuZ3RoICsgbExlbmd0aCk7XG5cbiAgICAgIHdoaWxlICgobWF0Y2ggPSBlbmRSZWcuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICAgIHJEZWxpbSA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8IG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IG1hdGNoWzZdO1xuXG4gICAgICAgIGlmICghckRlbGltKSBjb250aW51ZTsgLy8gc2tpcCBzaW5nbGUgKiBpbiBfX2FiYyphYmNfX1xuXG4gICAgICAgIHJMZW5ndGggPSByRGVsaW0ubGVuZ3RoO1xuXG4gICAgICAgIGlmIChtYXRjaFszXSB8fCBtYXRjaFs0XSkgeyAvLyBmb3VuZCBhbm90aGVyIExlZnQgRGVsaW1cbiAgICAgICAgICBkZWxpbVRvdGFsICs9IHJMZW5ndGg7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbNV0gfHwgbWF0Y2hbNl0pIHsgLy8gZWl0aGVyIExlZnQgb3IgUmlnaHQgRGVsaW1cbiAgICAgICAgICBpZiAobExlbmd0aCAlIDMgJiYgISgobExlbmd0aCArIHJMZW5ndGgpICUgMykpIHtcbiAgICAgICAgICAgIG1pZERlbGltVG90YWwgKz0gckxlbmd0aDtcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBDb21tb25NYXJrIEVtcGhhc2lzIFJ1bGVzIDktMTBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkZWxpbVRvdGFsIC09IHJMZW5ndGg7XG5cbiAgICAgICAgaWYgKGRlbGltVG90YWwgPiAwKSBjb250aW51ZTsgLy8gSGF2ZW4ndCBmb3VuZCBlbm91Z2ggY2xvc2luZyBkZWxpbWl0ZXJzXG5cbiAgICAgICAgLy8gUmVtb3ZlIGV4dHJhIGNoYXJhY3RlcnMuICphKioqIC0+ICphKlxuICAgICAgICByTGVuZ3RoID0gTWF0aC5taW4ockxlbmd0aCwgckxlbmd0aCArIGRlbGltVG90YWwgKyBtaWREZWxpbVRvdGFsKTtcblxuICAgICAgICAvLyBDcmVhdGUgYGVtYCBpZiBzbWFsbGVzdCBkZWxpbWl0ZXIgaGFzIG9kZCBjaGFyIGNvdW50LiAqYSoqKlxuICAgICAgICBpZiAoTWF0aC5taW4obExlbmd0aCwgckxlbmd0aCkgJSAyKSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IHNyYy5zbGljZSgxLCBsTGVuZ3RoICsgbWF0Y2guaW5kZXggKyByTGVuZ3RoKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ2VtJyxcbiAgICAgICAgICAgIHJhdzogc3JjLnNsaWNlKDAsIGxMZW5ndGggKyBtYXRjaC5pbmRleCArIHJMZW5ndGggKyAxKSxcbiAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICB0b2tlbnM6IHRoaXMubGV4ZXIuaW5saW5lVG9rZW5zKHRleHQsIFtdKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgJ3N0cm9uZycgaWYgc21hbGxlc3QgZGVsaW1pdGVyIGhhcyBldmVuIGNoYXIgY291bnQuICoqYSoqKlxuICAgICAgICBjb25zdCB0ZXh0ID0gc3JjLnNsaWNlKDIsIGxMZW5ndGggKyBtYXRjaC5pbmRleCArIHJMZW5ndGggLSAxKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAnc3Ryb25nJyxcbiAgICAgICAgICByYXc6IHNyYy5zbGljZSgwLCBsTGVuZ3RoICsgbWF0Y2guaW5kZXggKyByTGVuZ3RoICsgMSksXG4gICAgICAgICAgdGV4dCxcbiAgICAgICAgICB0b2tlbnM6IHRoaXMubGV4ZXIuaW5saW5lVG9rZW5zKHRleHQsIFtdKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvZGVzcGFuKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLmNvZGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIGxldCB0ZXh0ID0gY2FwWzJdLnJlcGxhY2UoL1xcbi9nLCAnICcpO1xuICAgICAgY29uc3QgaGFzTm9uU3BhY2VDaGFycyA9IC9bXiBdLy50ZXN0KHRleHQpO1xuICAgICAgY29uc3QgaGFzU3BhY2VDaGFyc09uQm90aEVuZHMgPSAvXiAvLnRlc3QodGV4dCkgJiYgLyAkLy50ZXN0KHRleHQpO1xuICAgICAgaWYgKGhhc05vblNwYWNlQ2hhcnMgJiYgaGFzU3BhY2VDaGFyc09uQm90aEVuZHMpIHtcbiAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDEsIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgICB0ZXh0ID0gZXNjYXBlJDIodGV4dCwgdHJ1ZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnY29kZXNwYW4nLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBicihzcmMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5ici5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2JyJyxcbiAgICAgICAgcmF3OiBjYXBbMF1cbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgZGVsKHNyYykge1xuICAgIGNvbnN0IGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLmRlbC5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2RlbCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiBjYXBbMl0sXG4gICAgICAgIHRva2VuczogdGhpcy5sZXhlci5pbmxpbmVUb2tlbnMoY2FwWzJdLCBbXSlcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgYXV0b2xpbmsoc3JjLCBtYW5nbGUpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5hdXRvbGluay5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgbGV0IHRleHQsIGhyZWY7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZSQyKHRoaXMub3B0aW9ucy5tYW5nbGUgPyBtYW5nbGUoY2FwWzFdKSA6IGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSAnbWFpbHRvOicgKyB0ZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZSQyKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnbGluaycsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0LFxuICAgICAgICBocmVmLFxuICAgICAgICB0b2tlbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICByYXc6IHRleHQsXG4gICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHVybChzcmMsIG1hbmdsZSkge1xuICAgIGxldCBjYXA7XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLnVybC5leGVjKHNyYykpIHtcbiAgICAgIGxldCB0ZXh0LCBocmVmO1xuICAgICAgaWYgKGNhcFsyXSA9PT0gJ0AnKSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUkMih0aGlzLm9wdGlvbnMubWFuZ2xlID8gbWFuZ2xlKGNhcFswXSkgOiBjYXBbMF0pO1xuICAgICAgICBocmVmID0gJ21haWx0bzonICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRvIGV4dGVuZGVkIGF1dG9saW5rIHBhdGggdmFsaWRhdGlvblxuICAgICAgICBsZXQgcHJldkNhcFplcm87XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBwcmV2Q2FwWmVybyA9IGNhcFswXTtcbiAgICAgICAgICBjYXBbMF0gPSB0aGlzLnJ1bGVzLmlubGluZS5fYmFja3BlZGFsLmV4ZWMoY2FwWzBdKVswXTtcbiAgICAgICAgfSB3aGlsZSAocHJldkNhcFplcm8gIT09IGNhcFswXSk7XG4gICAgICAgIHRleHQgPSBlc2NhcGUkMihjYXBbMF0pO1xuICAgICAgICBpZiAoY2FwWzFdID09PSAnd3d3LicpIHtcbiAgICAgICAgICBocmVmID0gJ2h0dHA6Ly8nICsgdGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBocmVmID0gdGV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2xpbmsnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dCxcbiAgICAgICAgaHJlZixcbiAgICAgICAgdG9rZW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgcmF3OiB0ZXh0LFxuICAgICAgICAgICAgdGV4dFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpbmxpbmVUZXh0KHNyYywgc21hcnR5cGFudHMpIHtcbiAgICBjb25zdCBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS50ZXh0LmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICBsZXQgdGV4dDtcbiAgICAgIGlmICh0aGlzLmxleGVyLnN0YXRlLmluUmF3QmxvY2spIHtcbiAgICAgICAgdGV4dCA9IHRoaXMub3B0aW9ucy5zYW5pdGl6ZSA/ICh0aGlzLm9wdGlvbnMuc2FuaXRpemVyID8gdGhpcy5vcHRpb25zLnNhbml0aXplcihjYXBbMF0pIDogZXNjYXBlJDIoY2FwWzBdKSkgOiBjYXBbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gZXNjYXBlJDIodGhpcy5vcHRpb25zLnNtYXJ0eXBhbnRzID8gc21hcnR5cGFudHMoY2FwWzBdKSA6IGNhcFswXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0XG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcblxuY29uc3Qge1xuICBub29wVGVzdCxcbiAgZWRpdCxcbiAgbWVyZ2U6IG1lcmdlJDFcbn0gPSBoZWxwZXJzO1xuXG4vKipcbiAqIEJsb2NrLUxldmVsIEdyYW1tYXJcbiAqL1xuY29uc3QgYmxvY2skMSA9IHtcbiAgbmV3bGluZTogL14oPzogKig/OlxcbnwkKSkrLyxcbiAgY29kZTogL14oIHs0fVteXFxuXSsoPzpcXG4oPzogKig/OlxcbnwkKSkqKT8pKy8sXG4gIGZlbmNlczogL14gezAsM30oYHszLH0oPz1bXmBcXG5dKlxcbil8fnszLH0pKFteXFxuXSopXFxuKD86fChbXFxzXFxTXSo/KVxcbikoPzogezAsM31cXDFbfmBdKiAqKD89XFxufCQpfCQpLyxcbiAgaHI6IC9eIHswLDN9KCg/Oi0gKil7Myx9fCg/Ol8gKil7Myx9fCg/OlxcKiAqKXszLH0pKD86XFxuK3wkKS8sXG4gIGhlYWRpbmc6IC9eIHswLDN9KCN7MSw2fSkoPz1cXHN8JCkoLiopKD86XFxuK3wkKS8sXG4gIGJsb2NrcXVvdGU6IC9eKCB7MCwzfT4gPyhwYXJhZ3JhcGh8W15cXG5dKikoPzpcXG58JCkpKy8sXG4gIGxpc3Q6IC9eKCB7MCwzfWJ1bGwpKCBbXlxcbl0rPyk/KD86XFxufCQpLyxcbiAgaHRtbDogJ14gezAsM30oPzonIC8vIG9wdGlvbmFsIGluZGVudGF0aW9uXG4gICAgKyAnPChzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhKVtcXFxccz5dW1xcXFxzXFxcXFNdKj8oPzo8L1xcXFwxPlteXFxcXG5dKlxcXFxuK3wkKScgLy8gKDEpXG4gICAgKyAnfGNvbW1lbnRbXlxcXFxuXSooXFxcXG4rfCQpJyAvLyAoMilcbiAgICArICd8PFxcXFw/W1xcXFxzXFxcXFNdKj8oPzpcXFxcPz5cXFxcbip8JCknIC8vICgzKVxuICAgICsgJ3w8IVtBLVpdW1xcXFxzXFxcXFNdKj8oPzo+XFxcXG4qfCQpJyAvLyAoNClcbiAgICArICd8PCFcXFxcW0NEQVRBXFxcXFtbXFxcXHNcXFxcU10qPyg/OlxcXFxdXFxcXF0+XFxcXG4qfCQpJyAvLyAoNSlcbiAgICArICd8PC8/KHRhZykoPzogK3xcXFxcbnwvPz4pW1xcXFxzXFxcXFNdKj8oPzooPzpcXFxcbiAqKStcXFxcbnwkKScgLy8gKDYpXG4gICAgKyAnfDwoPyFzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhKShbYS16XVtcXFxcdy1dKikoPzphdHRyaWJ1dGUpKj8gKi8/Pig/PVsgXFxcXHRdKig/OlxcXFxufCQpKVtcXFxcc1xcXFxTXSo/KD86KD86XFxcXG4gKikrXFxcXG58JCknIC8vICg3KSBvcGVuIHRhZ1xuICAgICsgJ3w8Lyg/IXNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpW2Etel1bXFxcXHctXSpcXFxccyo+KD89WyBcXFxcdF0qKD86XFxcXG58JCkpW1xcXFxzXFxcXFNdKj8oPzooPzpcXFxcbiAqKStcXFxcbnwkKScgLy8gKDcpIGNsb3NpbmcgdGFnXG4gICAgKyAnKScsXG4gIGRlZjogL14gezAsM31cXFsobGFiZWwpXFxdOiAqXFxuPyAqPD8oW15cXHM+XSspPj8oPzooPzogK1xcbj8gKnwgKlxcbiAqKSh0aXRsZSkpPyAqKD86XFxuK3wkKS8sXG4gIHRhYmxlOiBub29wVGVzdCxcbiAgbGhlYWRpbmc6IC9eKFteXFxuXSspXFxuIHswLDN9KD0rfC0rKSAqKD86XFxuK3wkKS8sXG4gIC8vIHJlZ2V4IHRlbXBsYXRlLCBwbGFjZWhvbGRlcnMgd2lsbCBiZSByZXBsYWNlZCBhY2NvcmRpbmcgdG8gZGlmZmVyZW50IHBhcmFncmFwaFxuICAvLyBpbnRlcnJ1cHRpb24gcnVsZXMgb2YgY29tbW9ubWFyayBhbmQgdGhlIG9yaWdpbmFsIG1hcmtkb3duIHNwZWM6XG4gIF9wYXJhZ3JhcGg6IC9eKFteXFxuXSsoPzpcXG4oPyFocnxoZWFkaW5nfGxoZWFkaW5nfGJsb2NrcXVvdGV8ZmVuY2VzfGxpc3R8aHRtbHwgK1xcbilbXlxcbl0rKSopLyxcbiAgdGV4dDogL15bXlxcbl0rL1xufTtcblxuYmxvY2skMS5fbGFiZWwgPSAvKD8hXFxzKlxcXSkoPzpcXFxcW1xcW1xcXV18W15cXFtcXF1dKSsvO1xuYmxvY2skMS5fdGl0bGUgPSAvKD86XCIoPzpcXFxcXCI/fFteXCJcXFxcXSkqXCJ8J1teJ1xcbl0qKD86XFxuW14nXFxuXSspKlxcbj8nfFxcKFteKCldKlxcKSkvO1xuYmxvY2skMS5kZWYgPSBlZGl0KGJsb2NrJDEuZGVmKVxuICAucmVwbGFjZSgnbGFiZWwnLCBibG9jayQxLl9sYWJlbClcbiAgLnJlcGxhY2UoJ3RpdGxlJywgYmxvY2skMS5fdGl0bGUpXG4gIC5nZXRSZWdleCgpO1xuXG5ibG9jayQxLmJ1bGxldCA9IC8oPzpbKistXXxcXGR7MSw5fVsuKV0pLztcbmJsb2NrJDEubGlzdEl0ZW1TdGFydCA9IGVkaXQoL14oICopKGJ1bGwpICovKVxuICAucmVwbGFjZSgnYnVsbCcsIGJsb2NrJDEuYnVsbGV0KVxuICAuZ2V0UmVnZXgoKTtcblxuYmxvY2skMS5saXN0ID0gZWRpdChibG9jayQxLmxpc3QpXG4gIC5yZXBsYWNlKC9idWxsL2csIGJsb2NrJDEuYnVsbGV0KVxuICAucmVwbGFjZSgnaHInLCAnXFxcXG4rKD89XFxcXDE/KD86KD86LSAqKXszLH18KD86XyAqKXszLH18KD86XFxcXCogKil7Myx9KSg/OlxcXFxuK3wkKSknKVxuICAucmVwbGFjZSgnZGVmJywgJ1xcXFxuKyg/PScgKyBibG9jayQxLmRlZi5zb3VyY2UgKyAnKScpXG4gIC5nZXRSZWdleCgpO1xuXG5ibG9jayQxLl90YWcgPSAnYWRkcmVzc3xhcnRpY2xlfGFzaWRlfGJhc2V8YmFzZWZvbnR8YmxvY2txdW90ZXxib2R5fGNhcHRpb24nXG4gICsgJ3xjZW50ZXJ8Y29sfGNvbGdyb3VwfGRkfGRldGFpbHN8ZGlhbG9nfGRpcnxkaXZ8ZGx8ZHR8ZmllbGRzZXR8ZmlnY2FwdGlvbidcbiAgKyAnfGZpZ3VyZXxmb290ZXJ8Zm9ybXxmcmFtZXxmcmFtZXNldHxoWzEtNl18aGVhZHxoZWFkZXJ8aHJ8aHRtbHxpZnJhbWUnXG4gICsgJ3xsZWdlbmR8bGl8bGlua3xtYWlufG1lbnV8bWVudWl0ZW18bWV0YXxuYXZ8bm9mcmFtZXN8b2x8b3B0Z3JvdXB8b3B0aW9uJ1xuICArICd8cHxwYXJhbXxzZWN0aW9ufHNvdXJjZXxzdW1tYXJ5fHRhYmxlfHRib2R5fHRkfHRmb290fHRofHRoZWFkfHRpdGxlfHRyJ1xuICArICd8dHJhY2t8dWwnO1xuYmxvY2skMS5fY29tbWVudCA9IC88IS0tKD8hLT8+KVtcXHNcXFNdKj8oPzotLT58JCkvO1xuYmxvY2skMS5odG1sID0gZWRpdChibG9jayQxLmh0bWwsICdpJylcbiAgLnJlcGxhY2UoJ2NvbW1lbnQnLCBibG9jayQxLl9jb21tZW50KVxuICAucmVwbGFjZSgndGFnJywgYmxvY2skMS5fdGFnKVxuICAucmVwbGFjZSgnYXR0cmlidXRlJywgLyArW2EtekEtWjpfXVtcXHcuOi1dKig/OiAqPSAqXCJbXlwiXFxuXSpcInwgKj0gKidbXidcXG5dKid8ICo9ICpbXlxcc1wiJz08PmBdKyk/LylcbiAgLmdldFJlZ2V4KCk7XG5cbmJsb2NrJDEucGFyYWdyYXBoID0gZWRpdChibG9jayQxLl9wYXJhZ3JhcGgpXG4gIC5yZXBsYWNlKCdocicsIGJsb2NrJDEuaHIpXG4gIC5yZXBsYWNlKCdoZWFkaW5nJywgJyB7MCwzfSN7MSw2fSAnKVxuICAucmVwbGFjZSgnfGxoZWFkaW5nJywgJycpIC8vIHNldGV4IGhlYWRpbmdzIGRvbid0IGludGVycnVwdCBjb21tb25tYXJrIHBhcmFncmFwaHNcbiAgLnJlcGxhY2UoJ2Jsb2NrcXVvdGUnLCAnIHswLDN9PicpXG4gIC5yZXBsYWNlKCdmZW5jZXMnLCAnIHswLDN9KD86YHszLH0oPz1bXmBcXFxcbl0qXFxcXG4pfH57Myx9KVteXFxcXG5dKlxcXFxuJylcbiAgLnJlcGxhY2UoJ2xpc3QnLCAnIHswLDN9KD86WyorLV18MVsuKV0pICcpIC8vIG9ubHkgbGlzdHMgc3RhcnRpbmcgZnJvbSAxIGNhbiBpbnRlcnJ1cHRcbiAgLnJlcGxhY2UoJ2h0bWwnLCAnPC8/KD86dGFnKSg/OiArfFxcXFxufC8/Pil8PCg/OnNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWF8IS0tKScpXG4gIC5yZXBsYWNlKCd0YWcnLCBibG9jayQxLl90YWcpIC8vIHBhcnMgY2FuIGJlIGludGVycnVwdGVkIGJ5IHR5cGUgKDYpIGh0bWwgYmxvY2tzXG4gIC5nZXRSZWdleCgpO1xuXG5ibG9jayQxLmJsb2NrcXVvdGUgPSBlZGl0KGJsb2NrJDEuYmxvY2txdW90ZSlcbiAgLnJlcGxhY2UoJ3BhcmFncmFwaCcsIGJsb2NrJDEucGFyYWdyYXBoKVxuICAuZ2V0UmVnZXgoKTtcblxuLyoqXG4gKiBOb3JtYWwgQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrJDEubm9ybWFsID0gbWVyZ2UkMSh7fSwgYmxvY2skMSk7XG5cbi8qKlxuICogR0ZNIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jayQxLmdmbSA9IG1lcmdlJDEoe30sIGJsb2NrJDEubm9ybWFsLCB7XG4gIHRhYmxlOiAnXiAqKFteXFxcXG4gXS4qXFxcXHwuKilcXFxcbicgLy8gSGVhZGVyXG4gICAgKyAnIHswLDN9KD86XFxcXHwgKik/KDo/LSs6PyAqKD86XFxcXHwgKjo/LSs6PyAqKSopXFxcXHw/JyAvLyBBbGlnblxuICAgICsgJyg/OlxcXFxuKCg/Oig/ISAqXFxcXG58aHJ8aGVhZGluZ3xibG9ja3F1b3RlfGNvZGV8ZmVuY2VzfGxpc3R8aHRtbCkuKig/OlxcXFxufCQpKSopXFxcXG4qfCQpJyAvLyBDZWxsc1xufSk7XG5cbmJsb2NrJDEuZ2ZtLnRhYmxlID0gZWRpdChibG9jayQxLmdmbS50YWJsZSlcbiAgLnJlcGxhY2UoJ2hyJywgYmxvY2skMS5ocilcbiAgLnJlcGxhY2UoJ2hlYWRpbmcnLCAnIHswLDN9I3sxLDZ9ICcpXG4gIC5yZXBsYWNlKCdibG9ja3F1b3RlJywgJyB7MCwzfT4nKVxuICAucmVwbGFjZSgnY29kZScsICcgezR9W15cXFxcbl0nKVxuICAucmVwbGFjZSgnZmVuY2VzJywgJyB7MCwzfSg/OmB7Myx9KD89W15gXFxcXG5dKlxcXFxuKXx+ezMsfSlbXlxcXFxuXSpcXFxcbicpXG4gIC5yZXBsYWNlKCdsaXN0JywgJyB7MCwzfSg/OlsqKy1dfDFbLildKSAnKSAvLyBvbmx5IGxpc3RzIHN0YXJ0aW5nIGZyb20gMSBjYW4gaW50ZXJydXB0XG4gIC5yZXBsYWNlKCdodG1sJywgJzwvPyg/OnRhZykoPzogK3xcXFxcbnwvPz4pfDwoPzpzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhfCEtLSknKVxuICAucmVwbGFjZSgndGFnJywgYmxvY2skMS5fdGFnKSAvLyB0YWJsZXMgY2FuIGJlIGludGVycnVwdGVkIGJ5IHR5cGUgKDYpIGh0bWwgYmxvY2tzXG4gIC5nZXRSZWdleCgpO1xuXG4vKipcbiAqIFBlZGFudGljIGdyYW1tYXIgKG9yaWdpbmFsIEpvaG4gR3J1YmVyJ3MgbG9vc2UgbWFya2Rvd24gc3BlY2lmaWNhdGlvbilcbiAqL1xuXG5ibG9jayQxLnBlZGFudGljID0gbWVyZ2UkMSh7fSwgYmxvY2skMS5ub3JtYWwsIHtcbiAgaHRtbDogZWRpdChcbiAgICAnXiAqKD86Y29tbWVudCAqKD86XFxcXG58XFxcXHMqJCknXG4gICAgKyAnfDwodGFnKVtcXFxcc1xcXFxTXSs/PC9cXFxcMT4gKig/OlxcXFxuezIsfXxcXFxccyokKScgLy8gY2xvc2VkIHRhZ1xuICAgICsgJ3w8dGFnKD86XCJbXlwiXSpcInxcXCdbXlxcJ10qXFwnfFxcXFxzW15cXCdcIi8+XFxcXHNdKikqPy8/PiAqKD86XFxcXG57Mix9fFxcXFxzKiQpKScpXG4gICAgLnJlcGxhY2UoJ2NvbW1lbnQnLCBibG9jayQxLl9jb21tZW50KVxuICAgIC5yZXBsYWNlKC90YWcvZywgJyg/ISg/OidcbiAgICAgICsgJ2F8ZW18c3Ryb25nfHNtYWxsfHN8Y2l0ZXxxfGRmbnxhYmJyfGRhdGF8dGltZXxjb2RlfHZhcnxzYW1wfGtiZHxzdWInXG4gICAgICArICd8c3VwfGl8Ynx1fG1hcmt8cnVieXxydHxycHxiZGl8YmRvfHNwYW58YnJ8d2JyfGluc3xkZWx8aW1nKSdcbiAgICAgICsgJ1xcXFxiKVxcXFx3Kyg/ITp8W15cXFxcd1xcXFxzQF0qQClcXFxcYicpXG4gICAgLmdldFJlZ2V4KCksXG4gIGRlZjogL14gKlxcWyhbXlxcXV0rKVxcXTogKjw/KFteXFxzPl0rKT4/KD86ICsoW1wiKF1bXlxcbl0rW1wiKV0pKT8gKig/Olxcbit8JCkvLFxuICBoZWFkaW5nOiAvXigjezEsNn0pKC4qKSg/Olxcbit8JCkvLFxuICBmZW5jZXM6IG5vb3BUZXN0LCAvLyBmZW5jZXMgbm90IHN1cHBvcnRlZFxuICBwYXJhZ3JhcGg6IGVkaXQoYmxvY2skMS5ub3JtYWwuX3BhcmFncmFwaClcbiAgICAucmVwbGFjZSgnaHInLCBibG9jayQxLmhyKVxuICAgIC5yZXBsYWNlKCdoZWFkaW5nJywgJyAqI3sxLDZ9ICpbXlxcbl0nKVxuICAgIC5yZXBsYWNlKCdsaGVhZGluZycsIGJsb2NrJDEubGhlYWRpbmcpXG4gICAgLnJlcGxhY2UoJ2Jsb2NrcXVvdGUnLCAnIHswLDN9PicpXG4gICAgLnJlcGxhY2UoJ3xmZW5jZXMnLCAnJylcbiAgICAucmVwbGFjZSgnfGxpc3QnLCAnJylcbiAgICAucmVwbGFjZSgnfGh0bWwnLCAnJylcbiAgICAuZ2V0UmVnZXgoKVxufSk7XG5cbi8qKlxuICogSW5saW5lLUxldmVsIEdyYW1tYXJcbiAqL1xuY29uc3QgaW5saW5lJDEgPSB7XG4gIGVzY2FwZTogL15cXFxcKFshXCIjJCUmJygpKissXFwtLi86Ozw9Pj9AXFxbXFxdXFxcXF5fYHt8fX5dKS8sXG4gIGF1dG9saW5rOiAvXjwoc2NoZW1lOlteXFxzXFx4MDAtXFx4MWY8Pl0qfGVtYWlsKT4vLFxuICB1cmw6IG5vb3BUZXN0LFxuICB0YWc6ICdeY29tbWVudCdcbiAgICArICd8XjwvW2EtekEtWl1bXFxcXHc6LV0qXFxcXHMqPicgLy8gc2VsZi1jbG9zaW5nIHRhZ1xuICAgICsgJ3xePFthLXpBLVpdW1xcXFx3LV0qKD86YXR0cmlidXRlKSo/XFxcXHMqLz8+JyAvLyBvcGVuIHRhZ1xuICAgICsgJ3xePFxcXFw/W1xcXFxzXFxcXFNdKj9cXFxcPz4nIC8vIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIGUuZy4gPD9waHAgPz5cbiAgICArICd8XjwhW2EtekEtWl0rXFxcXHNbXFxcXHNcXFxcU10qPz4nIC8vIGRlY2xhcmF0aW9uLCBlLmcuIDwhRE9DVFlQRSBodG1sPlxuICAgICsgJ3xePCFcXFxcW0NEQVRBXFxcXFtbXFxcXHNcXFxcU10qP1xcXFxdXFxcXF0+JywgLy8gQ0RBVEEgc2VjdGlvblxuICBsaW5rOiAvXiE/XFxbKGxhYmVsKVxcXVxcKFxccyooaHJlZikoPzpcXHMrKHRpdGxlKSk/XFxzKlxcKS8sXG4gIHJlZmxpbms6IC9eIT9cXFsobGFiZWwpXFxdXFxbKD8hXFxzKlxcXSkoKD86XFxcXFtcXFtcXF1dP3xbXlxcW1xcXVxcXFxdKSspXFxdLyxcbiAgbm9saW5rOiAvXiE/XFxbKD8hXFxzKlxcXSkoKD86XFxbW15cXFtcXF1dKlxcXXxcXFxcW1xcW1xcXV18W15cXFtcXF1dKSopXFxdKD86XFxbXFxdKT8vLFxuICByZWZsaW5rU2VhcmNoOiAncmVmbGlua3xub2xpbmsoPyFcXFxcKCknLFxuICBlbVN0cm9uZzoge1xuICAgIGxEZWxpbTogL14oPzpcXCorKD86KFtwdW5jdF9dKXxbXlxccypdKSl8Xl8rKD86KFtwdW5jdCpdKXwoW15cXHNfXSkpLyxcbiAgICAvLyAgICAgICAgKDEpIGFuZCAoMikgY2FuIG9ubHkgYmUgYSBSaWdodCBEZWxpbWl0ZXIuICgzKSBhbmQgKDQpIGNhbiBvbmx5IGJlIExlZnQuICAoNSkgYW5kICg2KSBjYW4gYmUgZWl0aGVyIExlZnQgb3IgUmlnaHQuXG4gICAgLy8gICAgICAgICgpIFNraXAgb3RoZXIgZGVsaW1pdGVyICgxKSAjKioqICAgICAgICAgICAgICAgICAgICgyKSBhKioqIywgYSoqKiAgICAgICAgICAgICAgICAgICAoMykgIyoqKmEsICoqKmEgICAgICAgICAgICAgICAgICg0KSAqKiojICAgICAgICAgICAgICAoNSkgIyoqKiMgICAgICAgICAgICAgICAgICg2KSBhKioqYVxuICAgIHJEZWxpbUFzdDogL1xcX1xcX1teXypdKj9cXCpbXl8qXSo/XFxfXFxffFtwdW5jdF9dKFxcKispKD89W1xcc118JCl8W15wdW5jdCpfXFxzXShcXCorKSg/PVtwdW5jdF9cXHNdfCQpfFtwdW5jdF9cXHNdKFxcKispKD89W15wdW5jdCpfXFxzXSl8W1xcc10oXFwqKykoPz1bcHVuY3RfXSl8W3B1bmN0X10oXFwqKykoPz1bcHVuY3RfXSl8W15wdW5jdCpfXFxzXShcXCorKSg/PVtecHVuY3QqX1xcc10pLyxcbiAgICByRGVsaW1VbmQ6IC9cXCpcXCpbXl8qXSo/XFxfW15fKl0qP1xcKlxcKnxbcHVuY3QqXShcXF8rKSg/PVtcXHNdfCQpfFtecHVuY3QqX1xcc10oXFxfKykoPz1bcHVuY3QqXFxzXXwkKXxbcHVuY3QqXFxzXShcXF8rKSg/PVtecHVuY3QqX1xcc10pfFtcXHNdKFxcXyspKD89W3B1bmN0Kl0pfFtwdW5jdCpdKFxcXyspKD89W3B1bmN0Kl0pLyAvLyBeLSBOb3QgYWxsb3dlZCBmb3IgX1xuICB9LFxuICBjb2RlOiAvXihgKykoW15gXXxbXmBdW1xcc1xcU10qP1teYF0pXFwxKD8hYCkvLFxuICBicjogL14oIHsyLH18XFxcXClcXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3BUZXN0LFxuICB0ZXh0OiAvXihgK3xbXmBdKSg/Oig/PSB7Mix9XFxuKXxbXFxzXFxTXSo/KD86KD89W1xcXFw8IVxcW2AqX118XFxiX3wkKXxbXiBdKD89IHsyLH1cXG4pKSkvLFxuICBwdW5jdHVhdGlvbjogL14oW1xcc3B1bmN0dWF0aW9uXSkvXG59O1xuXG4vLyBsaXN0IG9mIHB1bmN0dWF0aW9uIG1hcmtzIGZyb20gQ29tbW9uTWFyayBzcGVjXG4vLyB3aXRob3V0ICogYW5kIF8gdG8gaGFuZGxlIHRoZSBkaWZmZXJlbnQgZW1waGFzaXMgbWFya2VycyAqIGFuZCBfXG5pbmxpbmUkMS5fcHVuY3R1YXRpb24gPSAnIVwiIyQlJlxcJygpK1xcXFwtLiwvOjs8PT4/QFxcXFxbXFxcXF1gXnt8fX4nO1xuaW5saW5lJDEucHVuY3R1YXRpb24gPSBlZGl0KGlubGluZSQxLnB1bmN0dWF0aW9uKS5yZXBsYWNlKC9wdW5jdHVhdGlvbi9nLCBpbmxpbmUkMS5fcHVuY3R1YXRpb24pLmdldFJlZ2V4KCk7XG5cbi8vIHNlcXVlbmNlcyBlbSBzaG91bGQgc2tpcCBvdmVyIFt0aXRsZV0obGluayksIGBjb2RlYCwgPGh0bWw+XG5pbmxpbmUkMS5ibG9ja1NraXAgPSAvXFxbW15cXF1dKj9cXF1cXChbXlxcKV0qP1xcKXxgW15gXSo/YHw8W14+XSo/Pi9nO1xuaW5saW5lJDEuZXNjYXBlZEVtU3QgPSAvXFxcXFxcKnxcXFxcXy9nO1xuXG5pbmxpbmUkMS5fY29tbWVudCA9IGVkaXQoYmxvY2skMS5fY29tbWVudCkucmVwbGFjZSgnKD86LS0+fCQpJywgJy0tPicpLmdldFJlZ2V4KCk7XG5cbmlubGluZSQxLmVtU3Ryb25nLmxEZWxpbSA9IGVkaXQoaW5saW5lJDEuZW1TdHJvbmcubERlbGltKVxuICAucmVwbGFjZSgvcHVuY3QvZywgaW5saW5lJDEuX3B1bmN0dWF0aW9uKVxuICAuZ2V0UmVnZXgoKTtcblxuaW5saW5lJDEuZW1TdHJvbmcuckRlbGltQXN0ID0gZWRpdChpbmxpbmUkMS5lbVN0cm9uZy5yRGVsaW1Bc3QsICdnJylcbiAgLnJlcGxhY2UoL3B1bmN0L2csIGlubGluZSQxLl9wdW5jdHVhdGlvbilcbiAgLmdldFJlZ2V4KCk7XG5cbmlubGluZSQxLmVtU3Ryb25nLnJEZWxpbVVuZCA9IGVkaXQoaW5saW5lJDEuZW1TdHJvbmcuckRlbGltVW5kLCAnZycpXG4gIC5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUkMS5fcHVuY3R1YXRpb24pXG4gIC5nZXRSZWdleCgpO1xuXG5pbmxpbmUkMS5fZXNjYXBlcyA9IC9cXFxcKFshXCIjJCUmJygpKissXFwtLi86Ozw9Pj9AXFxbXFxdXFxcXF5fYHt8fX5dKS9nO1xuXG5pbmxpbmUkMS5fc2NoZW1lID0gL1thLXpBLVpdW2EtekEtWjAtOSsuLV17MSwzMX0vO1xuaW5saW5lJDEuX2VtYWlsID0gL1thLXpBLVowLTkuISMkJSYnKisvPT9eX2B7fH1+LV0rKEApW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KD86XFwuW2EtekEtWjAtOV0oPzpbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KSsoPyFbLV9dKS87XG5pbmxpbmUkMS5hdXRvbGluayA9IGVkaXQoaW5saW5lJDEuYXV0b2xpbmspXG4gIC5yZXBsYWNlKCdzY2hlbWUnLCBpbmxpbmUkMS5fc2NoZW1lKVxuICAucmVwbGFjZSgnZW1haWwnLCBpbmxpbmUkMS5fZW1haWwpXG4gIC5nZXRSZWdleCgpO1xuXG5pbmxpbmUkMS5fYXR0cmlidXRlID0gL1xccytbYS16QS1aOl9dW1xcdy46LV0qKD86XFxzKj1cXHMqXCJbXlwiXSpcInxcXHMqPVxccyonW14nXSonfFxccyo9XFxzKlteXFxzXCInPTw+YF0rKT8vO1xuXG5pbmxpbmUkMS50YWcgPSBlZGl0KGlubGluZSQxLnRhZylcbiAgLnJlcGxhY2UoJ2NvbW1lbnQnLCBpbmxpbmUkMS5fY29tbWVudClcbiAgLnJlcGxhY2UoJ2F0dHJpYnV0ZScsIGlubGluZSQxLl9hdHRyaWJ1dGUpXG4gIC5nZXRSZWdleCgpO1xuXG5pbmxpbmUkMS5fbGFiZWwgPSAvKD86XFxbKD86XFxcXC58W15cXFtcXF1cXFxcXSkqXFxdfFxcXFwufGBbXmBdKmB8W15cXFtcXF1cXFxcYF0pKj8vO1xuaW5saW5lJDEuX2hyZWYgPSAvPCg/OlxcXFwufFteXFxuPD5cXFxcXSkrPnxbXlxcc1xceDAwLVxceDFmXSovO1xuaW5saW5lJDEuX3RpdGxlID0gL1wiKD86XFxcXFwiP3xbXlwiXFxcXF0pKlwifCcoPzpcXFxcJz98W14nXFxcXF0pKid8XFwoKD86XFxcXFxcKT98W14pXFxcXF0pKlxcKS87XG5cbmlubGluZSQxLmxpbmsgPSBlZGl0KGlubGluZSQxLmxpbmspXG4gIC5yZXBsYWNlKCdsYWJlbCcsIGlubGluZSQxLl9sYWJlbClcbiAgLnJlcGxhY2UoJ2hyZWYnLCBpbmxpbmUkMS5faHJlZilcbiAgLnJlcGxhY2UoJ3RpdGxlJywgaW5saW5lJDEuX3RpdGxlKVxuICAuZ2V0UmVnZXgoKTtcblxuaW5saW5lJDEucmVmbGluayA9IGVkaXQoaW5saW5lJDEucmVmbGluaylcbiAgLnJlcGxhY2UoJ2xhYmVsJywgaW5saW5lJDEuX2xhYmVsKVxuICAuZ2V0UmVnZXgoKTtcblxuaW5saW5lJDEucmVmbGlua1NlYXJjaCA9IGVkaXQoaW5saW5lJDEucmVmbGlua1NlYXJjaCwgJ2cnKVxuICAucmVwbGFjZSgncmVmbGluaycsIGlubGluZSQxLnJlZmxpbmspXG4gIC5yZXBsYWNlKCdub2xpbmsnLCBpbmxpbmUkMS5ub2xpbmspXG4gIC5nZXRSZWdleCgpO1xuXG4vKipcbiAqIE5vcm1hbCBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZSQxLm5vcm1hbCA9IG1lcmdlJDEoe30sIGlubGluZSQxKTtcblxuLyoqXG4gKiBQZWRhbnRpYyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZSQxLnBlZGFudGljID0gbWVyZ2UkMSh7fSwgaW5saW5lJDEubm9ybWFsLCB7XG4gIHN0cm9uZzoge1xuICAgIHN0YXJ0OiAvXl9ffFxcKlxcKi8sXG4gICAgbWlkZGxlOiAvXl9fKD89XFxTKShbXFxzXFxTXSo/XFxTKV9fKD8hXyl8XlxcKlxcKig/PVxcUykoW1xcc1xcU10qP1xcUylcXCpcXCooPyFcXCopLyxcbiAgICBlbmRBc3Q6IC9cXCpcXCooPyFcXCopL2csXG4gICAgZW5kVW5kOiAvX18oPyFfKS9nXG4gIH0sXG4gIGVtOiB7XG4gICAgc3RhcnQ6IC9eX3xcXCovLFxuICAgIG1pZGRsZTogL14oKVxcKig/PVxcUykoW1xcc1xcU10qP1xcUylcXCooPyFcXCopfF5fKD89XFxTKShbXFxzXFxTXSo/XFxTKV8oPyFfKS8sXG4gICAgZW5kQXN0OiAvXFwqKD8hXFwqKS9nLFxuICAgIGVuZFVuZDogL18oPyFfKS9nXG4gIH0sXG4gIGxpbms6IGVkaXQoL14hP1xcWyhsYWJlbClcXF1cXCgoLio/KVxcKS8pXG4gICAgLnJlcGxhY2UoJ2xhYmVsJywgaW5saW5lJDEuX2xhYmVsKVxuICAgIC5nZXRSZWdleCgpLFxuICByZWZsaW5rOiBlZGl0KC9eIT9cXFsobGFiZWwpXFxdXFxzKlxcWyhbXlxcXV0qKVxcXS8pXG4gICAgLnJlcGxhY2UoJ2xhYmVsJywgaW5saW5lJDEuX2xhYmVsKVxuICAgIC5nZXRSZWdleCgpXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUkMS5nZm0gPSBtZXJnZSQxKHt9LCBpbmxpbmUkMS5ub3JtYWwsIHtcbiAgZXNjYXBlOiBlZGl0KGlubGluZSQxLmVzY2FwZSkucmVwbGFjZSgnXSknLCAnfnxdKScpLmdldFJlZ2V4KCksXG4gIF9leHRlbmRlZF9lbWFpbDogL1tBLVphLXowLTkuXystXSsoQClbYS16QS1aMC05LV9dKyg/OlxcLlthLXpBLVowLTktX10qW2EtekEtWjAtOV0pKyg/IVstX10pLyxcbiAgdXJsOiAvXigoPzpmdHB8aHR0cHM/KTpcXC9cXC98d3d3XFwuKSg/OlthLXpBLVowLTlcXC1dK1xcLj8pK1teXFxzPF0qfF5lbWFpbC8sXG4gIF9iYWNrcGVkYWw6IC8oPzpbXj8hLiw6OypffigpJl0rfFxcKFteKV0qXFwpfCYoPyFbYS16QS1aMC05XSs7JCl8Wz8hLiw6OypffildKyg/ISQpKSsvLFxuICBkZWw6IC9eKH5+PykoPz1bXlxcc35dKShbXFxzXFxTXSo/W15cXHN+XSlcXDEoPz1bXn5dfCQpLyxcbiAgdGV4dDogL14oW2B+XSt8W15gfl0pKD86KD89IHsyLH1cXG4pfCg/PVthLXpBLVowLTkuISMkJSYnKitcXC89P19ge1xcfH1+LV0rQCl8W1xcc1xcU10qPyg/Oig/PVtcXFxcPCFcXFtgKn5fXXxcXGJffGh0dHBzPzpcXC9cXC98ZnRwOlxcL1xcL3x3d3dcXC58JCl8W14gXSg/PSB7Mix9XFxuKXxbXmEtekEtWjAtOS4hIyQlJicqK1xcLz0/X2B7XFx8fX4tXSg/PVthLXpBLVowLTkuISMkJSYnKitcXC89P19ge1xcfH1+LV0rQCkpKS9cbn0pO1xuXG5pbmxpbmUkMS5nZm0udXJsID0gZWRpdChpbmxpbmUkMS5nZm0udXJsLCAnaScpXG4gIC5yZXBsYWNlKCdlbWFpbCcsIGlubGluZSQxLmdmbS5fZXh0ZW5kZWRfZW1haWwpXG4gIC5nZXRSZWdleCgpO1xuLyoqXG4gKiBHRk0gKyBMaW5lIEJyZWFrcyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZSQxLmJyZWFrcyA9IG1lcmdlJDEoe30sIGlubGluZSQxLmdmbSwge1xuICBicjogZWRpdChpbmxpbmUkMS5icikucmVwbGFjZSgnezIsfScsICcqJykuZ2V0UmVnZXgoKSxcbiAgdGV4dDogZWRpdChpbmxpbmUkMS5nZm0udGV4dClcbiAgICAucmVwbGFjZSgnXFxcXGJfJywgJ1xcXFxiX3wgezIsfVxcXFxuJylcbiAgICAucmVwbGFjZSgvXFx7MixcXH0vZywgJyonKVxuICAgIC5nZXRSZWdleCgpXG59KTtcblxudmFyIHJ1bGVzID0ge1xuICBibG9jazogYmxvY2skMSxcbiAgaW5saW5lOiBpbmxpbmUkMVxufTtcblxuY29uc3QgVG9rZW5pemVyJDEgPSBUb2tlbml6ZXJfMTtcbmNvbnN0IHsgZGVmYXVsdHM6IGRlZmF1bHRzJDMgfSA9IGRlZmF1bHRzJDUuZXhwb3J0cztcbmNvbnN0IHsgYmxvY2ssIGlubGluZSB9ID0gcnVsZXM7XG5jb25zdCB7IHJlcGVhdFN0cmluZyB9ID0gaGVscGVycztcblxuLyoqXG4gKiBzbWFydHlwYW50cyB0ZXh0IHJlcGxhY2VtZW50XG4gKi9cbmZ1bmN0aW9uIHNtYXJ0eXBhbnRzKHRleHQpIHtcbiAgcmV0dXJuIHRleHRcbiAgICAvLyBlbS1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0tL2csICdcXHUyMDE0JylcbiAgICAvLyBlbi1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0vZywgJ1xcdTIwMTMnKVxuICAgIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcIlxcc10pJy9nLCAnJDFcXHUyMDE4JylcbiAgICAvLyBjbG9zaW5nIHNpbmdsZXMgJiBhcG9zdHJvcGhlc1xuICAgIC5yZXBsYWNlKC8nL2csICdcXHUyMDE5JylcbiAgICAvLyBvcGVuaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgJyQxXFx1MjAxYycpXG4gICAgLy8gY2xvc2luZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoL1wiL2csICdcXHUyMDFkJylcbiAgICAvLyBlbGxpcHNlc1xuICAgIC5yZXBsYWNlKC9cXC57M30vZywgJ1xcdTIwMjYnKTtcbn1cblxuLyoqXG4gKiBtYW5nbGUgZW1haWwgYWRkcmVzc2VzXG4gKi9cbmZ1bmN0aW9uIG1hbmdsZSh0ZXh0KSB7XG4gIGxldCBvdXQgPSAnJyxcbiAgICBpLFxuICAgIGNoO1xuXG4gIGNvbnN0IGwgPSB0ZXh0Lmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGNoID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBjaCA9ICd4JyArIGNoLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgb3V0ICs9ICcmIycgKyBjaCArICc7JztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQmxvY2sgTGV4ZXJcbiAqL1xudmFyIExleGVyXzEgPSBjbGFzcyBMZXhlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnRva2VucyA9IFtdO1xuICAgIHRoaXMudG9rZW5zLmxpbmtzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGRlZmF1bHRzJDM7XG4gICAgdGhpcy5vcHRpb25zLnRva2VuaXplciA9IHRoaXMub3B0aW9ucy50b2tlbml6ZXIgfHwgbmV3IFRva2VuaXplciQxKCk7XG4gICAgdGhpcy50b2tlbml6ZXIgPSB0aGlzLm9wdGlvbnMudG9rZW5pemVyO1xuICAgIHRoaXMudG9rZW5pemVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdGhpcy50b2tlbml6ZXIubGV4ZXIgPSB0aGlzO1xuICAgIHRoaXMuaW5saW5lUXVldWUgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaW5MaW5rOiBmYWxzZSxcbiAgICAgIGluUmF3QmxvY2s6IGZhbHNlLFxuICAgICAgdG9wOiB0cnVlXG4gICAgfTtcblxuICAgIGNvbnN0IHJ1bGVzID0ge1xuICAgICAgYmxvY2s6IGJsb2NrLm5vcm1hbCxcbiAgICAgIGlubGluZTogaW5saW5lLm5vcm1hbFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgICBydWxlcy5ibG9jayA9IGJsb2NrLnBlZGFudGljO1xuICAgICAgcnVsZXMuaW5saW5lID0gaW5saW5lLnBlZGFudGljO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgICAgcnVsZXMuYmxvY2sgPSBibG9jay5nZm07XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmJyZWFrcykge1xuICAgICAgICBydWxlcy5pbmxpbmUgPSBpbmxpbmUuYnJlYWtzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcnVsZXMuaW5saW5lID0gaW5saW5lLmdmbTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50b2tlbml6ZXIucnVsZXMgPSBydWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvc2UgUnVsZXNcbiAgICovXG4gIHN0YXRpYyBnZXQgcnVsZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJsb2NrLFxuICAgICAgaW5saW5lXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgTGV4IE1ldGhvZFxuICAgKi9cbiAgc3RhdGljIGxleChzcmMsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBsZXhlciA9IG5ldyBMZXhlcihvcHRpb25zKTtcbiAgICByZXR1cm4gbGV4ZXIubGV4KHNyYyk7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGljIExleCBJbmxpbmUgTWV0aG9kXG4gICAqL1xuICBzdGF0aWMgbGV4SW5saW5lKHNyYywgb3B0aW9ucykge1xuICAgIGNvbnN0IGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICAgIHJldHVybiBsZXhlci5pbmxpbmVUb2tlbnMoc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwcm9jZXNzaW5nXG4gICAqL1xuICBsZXgoc3JjKSB7XG4gICAgc3JjID0gc3JjXG4gICAgICAucmVwbGFjZSgvXFxyXFxufFxcci9nLCAnXFxuJylcbiAgICAgIC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKTtcblxuICAgIHRoaXMuYmxvY2tUb2tlbnMoc3JjLCB0aGlzLnRva2Vucyk7XG5cbiAgICBsZXQgbmV4dDtcbiAgICB3aGlsZSAobmV4dCA9IHRoaXMuaW5saW5lUXVldWUuc2hpZnQoKSkge1xuICAgICAgdGhpcy5pbmxpbmVUb2tlbnMobmV4dC5zcmMsIG5leHQudG9rZW5zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50b2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogTGV4aW5nXG4gICAqL1xuICBibG9ja1Rva2VucyhzcmMsIHRva2VucyA9IFtdKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgc3JjID0gc3JjLnJlcGxhY2UoL14gKyQvZ20sICcnKTtcbiAgICB9XG4gICAgbGV0IHRva2VuLCBsYXN0VG9rZW4sIGN1dFNyYywgbGFzdFBhcmFncmFwaENsaXBwZWQ7XG5cbiAgICB3aGlsZSAoc3JjKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmV4dGVuc2lvbnNcbiAgICAgICAgJiYgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMuYmxvY2tcbiAgICAgICAgJiYgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMuYmxvY2suc29tZSgoZXh0VG9rZW5pemVyKSA9PiB7XG4gICAgICAgICAgaWYgKHRva2VuID0gZXh0VG9rZW5pemVyLmNhbGwoeyBsZXhlcjogdGhpcyB9LCBzcmMsIHRva2VucykpIHtcbiAgICAgICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gbmV3bGluZVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuc3BhY2Uoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBpZiAodG9rZW4udHlwZSkge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29kZVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuY29kZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIC8vIEFuIGluZGVudGVkIGNvZGUgYmxvY2sgY2Fubm90IGludGVycnVwdCBhIHBhcmFncmFwaC5cbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiAobGFzdFRva2VuLnR5cGUgPT09ICdwYXJhZ3JhcGgnIHx8IGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnJhdyArPSAnXFxuJyArIHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSAnXFxuJyArIHRva2VuLnRleHQ7XG4gICAgICAgICAgdGhpcy5pbmxpbmVRdWV1ZVt0aGlzLmlubGluZVF1ZXVlLmxlbmd0aCAtIDFdLnNyYyA9IGxhc3RUb2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZmVuY2VzXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5mZW5jZXMoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBoZWFkaW5nXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5oZWFkaW5nKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaHJcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmhyKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gYmxvY2txdW90ZVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuYmxvY2txdW90ZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGxpc3RcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmxpc3Qoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBodG1sXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5odG1sKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZGVmXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5kZWYoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobGFzdFRva2VuICYmIChsYXN0VG9rZW4udHlwZSA9PT0gJ3BhcmFncmFwaCcgfHwgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0JykpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9ICdcXG4nICsgdG9rZW4ucmF3O1xuICAgICAgICAgIGxhc3RUb2tlbi50ZXh0ICs9ICdcXG4nICsgdG9rZW4ucmF3O1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWVbdGhpcy5pbmxpbmVRdWV1ZS5sZW5ndGggLSAxXS5zcmMgPSBsYXN0VG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy50b2tlbnMubGlua3NbdG9rZW4udGFnXSkge1xuICAgICAgICAgIHRoaXMudG9rZW5zLmxpbmtzW3Rva2VuLnRhZ10gPSB7XG4gICAgICAgICAgICBocmVmOiB0b2tlbi5ocmVmLFxuICAgICAgICAgICAgdGl0bGU6IHRva2VuLnRpdGxlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGFibGUgKGdmbSlcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLnRhYmxlKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gbGhlYWRpbmdcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmxoZWFkaW5nKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdG9wLWxldmVsIHBhcmFncmFwaFxuICAgICAgLy8gcHJldmVudCBwYXJhZ3JhcGggY29uc3VtaW5nIGV4dGVuc2lvbnMgYnkgY2xpcHBpbmcgJ3NyYycgdG8gZXh0ZW5zaW9uIHN0YXJ0XG4gICAgICBjdXRTcmMgPSBzcmM7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmV4dGVuc2lvbnMgJiYgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMuc3RhcnRCbG9jaykge1xuICAgICAgICBsZXQgc3RhcnRJbmRleCA9IEluZmluaXR5O1xuICAgICAgICBjb25zdCB0ZW1wU3JjID0gc3JjLnNsaWNlKDEpO1xuICAgICAgICBsZXQgdGVtcFN0YXJ0O1xuICAgICAgICB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5zdGFydEJsb2NrLmZvckVhY2goZnVuY3Rpb24oZ2V0U3RhcnRJbmRleCkge1xuICAgICAgICAgIHRlbXBTdGFydCA9IGdldFN0YXJ0SW5kZXguY2FsbCh7IGxleGVyOiB0aGlzIH0sIHRlbXBTcmMpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdGVtcFN0YXJ0ID09PSAnbnVtYmVyJyAmJiB0ZW1wU3RhcnQgPj0gMCkgeyBzdGFydEluZGV4ID0gTWF0aC5taW4oc3RhcnRJbmRleCwgdGVtcFN0YXJ0KTsgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHN0YXJ0SW5kZXggPCBJbmZpbml0eSAmJiBzdGFydEluZGV4ID49IDApIHtcbiAgICAgICAgICBjdXRTcmMgPSBzcmMuc3Vic3RyaW5nKDAsIHN0YXJ0SW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc3RhdGUudG9wICYmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLnBhcmFncmFwaChjdXRTcmMpKSkge1xuICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobGFzdFBhcmFncmFwaENsaXBwZWQgJiYgbGFzdFRva2VuLnR5cGUgPT09ICdwYXJhZ3JhcGgnKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnJhdyArPSAnXFxuJyArIHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSAnXFxuJyArIHRva2VuLnRleHQ7XG4gICAgICAgICAgdGhpcy5pbmxpbmVRdWV1ZS5wb3AoKTtcbiAgICAgICAgICB0aGlzLmlubGluZVF1ZXVlW3RoaXMuaW5saW5lUXVldWUubGVuZ3RoIC0gMV0uc3JjID0gbGFzdFRva2VuLnRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RQYXJhZ3JhcGhDbGlwcGVkID0gKGN1dFNyYy5sZW5ndGggIT09IHNyYy5sZW5ndGgpO1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGV4dFxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIudGV4dChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gJ1xcbicgKyB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gJ1xcbicgKyB0b2tlbi50ZXh0O1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWUucG9wKCk7XG4gICAgICAgICAgdGhpcy5pbmxpbmVRdWV1ZVt0aGlzLmlubGluZVF1ZXVlLmxlbmd0aCAtIDFdLnNyYyA9IGxhc3RUb2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNyYykge1xuICAgICAgICBjb25zdCBlcnJNc2cgPSAnSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJNc2cpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS50b3AgPSB0cnVlO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBpbmxpbmUoc3JjLCB0b2tlbnMpIHtcbiAgICB0aGlzLmlubGluZVF1ZXVlLnB1c2goeyBzcmMsIHRva2VucyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXhpbmcvQ29tcGlsaW5nXG4gICAqL1xuICBpbmxpbmVUb2tlbnMoc3JjLCB0b2tlbnMgPSBbXSkge1xuICAgIGxldCB0b2tlbiwgbGFzdFRva2VuLCBjdXRTcmM7XG5cbiAgICAvLyBTdHJpbmcgd2l0aCBsaW5rcyBtYXNrZWQgdG8gYXZvaWQgaW50ZXJmZXJlbmNlIHdpdGggZW0gYW5kIHN0cm9uZ1xuICAgIGxldCBtYXNrZWRTcmMgPSBzcmM7XG4gICAgbGV0IG1hdGNoO1xuICAgIGxldCBrZWVwUHJldkNoYXIsIHByZXZDaGFyO1xuXG4gICAgLy8gTWFzayBvdXQgcmVmbGlua3NcbiAgICBpZiAodGhpcy50b2tlbnMubGlua3MpIHtcbiAgICAgIGNvbnN0IGxpbmtzID0gT2JqZWN0LmtleXModGhpcy50b2tlbnMubGlua3MpO1xuICAgICAgaWYgKGxpbmtzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IHRoaXMudG9rZW5pemVyLnJ1bGVzLmlubGluZS5yZWZsaW5rU2VhcmNoLmV4ZWMobWFza2VkU3JjKSkgIT0gbnVsbCkge1xuICAgICAgICAgIGlmIChsaW5rcy5pbmNsdWRlcyhtYXRjaFswXS5zbGljZShtYXRjaFswXS5sYXN0SW5kZXhPZignWycpICsgMSwgLTEpKSkge1xuICAgICAgICAgICAgbWFza2VkU3JjID0gbWFza2VkU3JjLnNsaWNlKDAsIG1hdGNoLmluZGV4KSArICdbJyArIHJlcGVhdFN0cmluZygnYScsIG1hdGNoWzBdLmxlbmd0aCAtIDIpICsgJ10nICsgbWFza2VkU3JjLnNsaWNlKHRoaXMudG9rZW5pemVyLnJ1bGVzLmlubGluZS5yZWZsaW5rU2VhcmNoLmxhc3RJbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE1hc2sgb3V0IG90aGVyIGJsb2Nrc1xuICAgIHdoaWxlICgobWF0Y2ggPSB0aGlzLnRva2VuaXplci5ydWxlcy5pbmxpbmUuYmxvY2tTa2lwLmV4ZWMobWFza2VkU3JjKSkgIT0gbnVsbCkge1xuICAgICAgbWFza2VkU3JjID0gbWFza2VkU3JjLnNsaWNlKDAsIG1hdGNoLmluZGV4KSArICdbJyArIHJlcGVhdFN0cmluZygnYScsIG1hdGNoWzBdLmxlbmd0aCAtIDIpICsgJ10nICsgbWFza2VkU3JjLnNsaWNlKHRoaXMudG9rZW5pemVyLnJ1bGVzLmlubGluZS5ibG9ja1NraXAubGFzdEluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBNYXNrIG91dCBlc2NhcGVkIGVtICYgc3Ryb25nIGRlbGltaXRlcnNcbiAgICB3aGlsZSAoKG1hdGNoID0gdGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLmVzY2FwZWRFbVN0LmV4ZWMobWFza2VkU3JjKSkgIT0gbnVsbCkge1xuICAgICAgbWFza2VkU3JjID0gbWFza2VkU3JjLnNsaWNlKDAsIG1hdGNoLmluZGV4KSArICcrKycgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLmVzY2FwZWRFbVN0Lmxhc3RJbmRleCk7XG4gICAgfVxuXG4gICAgd2hpbGUgKHNyYykge1xuICAgICAgaWYgKCFrZWVwUHJldkNoYXIpIHtcbiAgICAgICAgcHJldkNoYXIgPSAnJztcbiAgICAgIH1cbiAgICAgIGtlZXBQcmV2Q2hhciA9IGZhbHNlO1xuXG4gICAgICAvLyBleHRlbnNpb25zXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmV4dGVuc2lvbnNcbiAgICAgICAgJiYgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMuaW5saW5lXG4gICAgICAgICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmlubGluZS5zb21lKChleHRUb2tlbml6ZXIpID0+IHtcbiAgICAgICAgICBpZiAodG9rZW4gPSBleHRUb2tlbml6ZXIuY2FsbCh7IGxleGVyOiB0aGlzIH0sIHNyYywgdG9rZW5zKSkge1xuICAgICAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBlc2NhcGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmVzY2FwZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRhZ1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIudGFnKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiB0b2tlbi50eXBlID09PSAndGV4dCcgJiYgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gdG9rZW4ucmF3O1xuICAgICAgICAgIGxhc3RUb2tlbi50ZXh0ICs9IHRva2VuLnRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBsaW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saW5rKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5yZWZsaW5rKHNyYywgdGhpcy50b2tlbnMubGlua3MpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9IHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZW0gJiBzdHJvbmdcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmVtU3Ryb25nKHNyYywgbWFza2VkU3JjLCBwcmV2Q2hhcikpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29kZVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuY29kZXNwYW4oc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBiclxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuYnIoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWwgKGdmbSlcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmRlbChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGF1dG9saW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5hdXRvbGluayhzcmMsIG1hbmdsZSkpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdXJsIChnZm0pXG4gICAgICBpZiAoIXRoaXMuc3RhdGUuaW5MaW5rICYmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLnVybChzcmMsIG1hbmdsZSkpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRcbiAgICAgIC8vIHByZXZlbnQgaW5saW5lVGV4dCBjb25zdW1pbmcgZXh0ZW5zaW9ucyBieSBjbGlwcGluZyAnc3JjJyB0byBleHRlbnNpb24gc3RhcnRcbiAgICAgIGN1dFNyYyA9IHNyYztcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5zdGFydElubGluZSkge1xuICAgICAgICBsZXQgc3RhcnRJbmRleCA9IEluZmluaXR5O1xuICAgICAgICBjb25zdCB0ZW1wU3JjID0gc3JjLnNsaWNlKDEpO1xuICAgICAgICBsZXQgdGVtcFN0YXJ0O1xuICAgICAgICB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5zdGFydElubGluZS5mb3JFYWNoKGZ1bmN0aW9uKGdldFN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICB0ZW1wU3RhcnQgPSBnZXRTdGFydEluZGV4LmNhbGwoeyBsZXhlcjogdGhpcyB9LCB0ZW1wU3JjKTtcbiAgICAgICAgICBpZiAodHlwZW9mIHRlbXBTdGFydCA9PT0gJ251bWJlcicgJiYgdGVtcFN0YXJ0ID49IDApIHsgc3RhcnRJbmRleCA9IE1hdGgubWluKHN0YXJ0SW5kZXgsIHRlbXBTdGFydCk7IH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzdGFydEluZGV4IDwgSW5maW5pdHkgJiYgc3RhcnRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgY3V0U3JjID0gc3JjLnN1YnN0cmluZygwLCBzdGFydEluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmlubGluZVRleHQoY3V0U3JjLCBzbWFydHlwYW50cykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgaWYgKHRva2VuLnJhdy5zbGljZSgtMSkgIT09ICdfJykgeyAvLyBUcmFjayBwcmV2Q2hhciBiZWZvcmUgc3RyaW5nIG9mIF9fX18gc3RhcnRlZFxuICAgICAgICAgIHByZXZDaGFyID0gdG9rZW4ucmF3LnNsaWNlKC0xKTtcbiAgICAgICAgfVxuICAgICAgICBrZWVwUHJldkNoYXIgPSB0cnVlO1xuICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAobGFzdFRva2VuICYmIGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9IHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNyYykge1xuICAgICAgICBjb25zdCBlcnJNc2cgPSAnSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJNc2cpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxufTtcblxuY29uc3QgeyBkZWZhdWx0czogZGVmYXVsdHMkMiB9ID0gZGVmYXVsdHMkNS5leHBvcnRzO1xuY29uc3Qge1xuICBjbGVhblVybCxcbiAgZXNjYXBlOiBlc2NhcGUkMVxufSA9IGhlbHBlcnM7XG5cbi8qKlxuICogUmVuZGVyZXJcbiAqL1xudmFyIFJlbmRlcmVyXzEgPSBjbGFzcyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGRlZmF1bHRzJDI7XG4gIH1cblxuICBjb2RlKGNvZGUsIGluZm9zdHJpbmcsIGVzY2FwZWQpIHtcbiAgICBjb25zdCBsYW5nID0gKGluZm9zdHJpbmcgfHwgJycpLm1hdGNoKC9cXFMqLylbMF07XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICAgIGNvbnN0IG91dCA9IHRoaXMub3B0aW9ucy5oaWdobGlnaHQoY29kZSwgbGFuZyk7XG4gICAgICBpZiAob3V0ICE9IG51bGwgJiYgb3V0ICE9PSBjb2RlKSB7XG4gICAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgICBjb2RlID0gb3V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcbiQvLCAnJykgKyAnXFxuJztcblxuICAgIGlmICghbGFuZykge1xuICAgICAgcmV0dXJuICc8cHJlPjxjb2RlPidcbiAgICAgICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUkMShjb2RlLCB0cnVlKSlcbiAgICAgICAgKyAnPC9jb2RlPjwvcHJlPlxcbic7XG4gICAgfVxuXG4gICAgcmV0dXJuICc8cHJlPjxjb2RlIGNsYXNzPVwiJ1xuICAgICAgKyB0aGlzLm9wdGlvbnMubGFuZ1ByZWZpeFxuICAgICAgKyBlc2NhcGUkMShsYW5nLCB0cnVlKVxuICAgICAgKyAnXCI+J1xuICAgICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUkMShjb2RlLCB0cnVlKSlcbiAgICAgICsgJzwvY29kZT48L3ByZT5cXG4nO1xuICB9XG5cbiAgYmxvY2txdW90ZShxdW90ZSkge1xuICAgIHJldHVybiAnPGJsb2NrcXVvdGU+XFxuJyArIHF1b3RlICsgJzwvYmxvY2txdW90ZT5cXG4nO1xuICB9XG5cbiAgaHRtbChodG1sKSB7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH1cblxuICBoZWFkaW5nKHRleHQsIGxldmVsLCByYXcsIHNsdWdnZXIpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcklkcykge1xuICAgICAgcmV0dXJuICc8aCdcbiAgICAgICAgKyBsZXZlbFxuICAgICAgICArICcgaWQ9XCInXG4gICAgICAgICsgdGhpcy5vcHRpb25zLmhlYWRlclByZWZpeFxuICAgICAgICArIHNsdWdnZXIuc2x1ZyhyYXcpXG4gICAgICAgICsgJ1wiPidcbiAgICAgICAgKyB0ZXh0XG4gICAgICAgICsgJzwvaCdcbiAgICAgICAgKyBsZXZlbFxuICAgICAgICArICc+XFxuJztcbiAgICB9XG4gICAgLy8gaWdub3JlIElEc1xuICAgIHJldHVybiAnPGgnICsgbGV2ZWwgKyAnPicgKyB0ZXh0ICsgJzwvaCcgKyBsZXZlbCArICc+XFxuJztcbiAgfVxuXG4gIGhyKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGhyLz5cXG4nIDogJzxocj5cXG4nO1xuICB9XG5cbiAgbGlzdChib2R5LCBvcmRlcmVkLCBzdGFydCkge1xuICAgIGNvbnN0IHR5cGUgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCcsXG4gICAgICBzdGFydGF0dCA9IChvcmRlcmVkICYmIHN0YXJ0ICE9PSAxKSA/ICgnIHN0YXJ0PVwiJyArIHN0YXJ0ICsgJ1wiJykgOiAnJztcbiAgICByZXR1cm4gJzwnICsgdHlwZSArIHN0YXJ0YXR0ICsgJz5cXG4nICsgYm9keSArICc8LycgKyB0eXBlICsgJz5cXG4nO1xuICB9XG5cbiAgbGlzdGl0ZW0odGV4dCkge1xuICAgIHJldHVybiAnPGxpPicgKyB0ZXh0ICsgJzwvbGk+XFxuJztcbiAgfVxuXG4gIGNoZWNrYm94KGNoZWNrZWQpIHtcbiAgICByZXR1cm4gJzxpbnB1dCAnXG4gICAgICArIChjaGVja2VkID8gJ2NoZWNrZWQ9XCJcIiAnIDogJycpXG4gICAgICArICdkaXNhYmxlZD1cIlwiIHR5cGU9XCJjaGVja2JveFwiJ1xuICAgICAgKyAodGhpcy5vcHRpb25zLnhodG1sID8gJyAvJyA6ICcnKVxuICAgICAgKyAnPiAnO1xuICB9XG5cbiAgcGFyYWdyYXBoKHRleHQpIHtcbiAgICByZXR1cm4gJzxwPicgKyB0ZXh0ICsgJzwvcD5cXG4nO1xuICB9XG5cbiAgdGFibGUoaGVhZGVyLCBib2R5KSB7XG4gICAgaWYgKGJvZHkpIGJvZHkgPSAnPHRib2R5PicgKyBib2R5ICsgJzwvdGJvZHk+JztcblxuICAgIHJldHVybiAnPHRhYmxlPlxcbidcbiAgICAgICsgJzx0aGVhZD5cXG4nXG4gICAgICArIGhlYWRlclxuICAgICAgKyAnPC90aGVhZD5cXG4nXG4gICAgICArIGJvZHlcbiAgICAgICsgJzwvdGFibGU+XFxuJztcbiAgfVxuXG4gIHRhYmxlcm93KGNvbnRlbnQpIHtcbiAgICByZXR1cm4gJzx0cj5cXG4nICsgY29udGVudCArICc8L3RyPlxcbic7XG4gIH1cblxuICB0YWJsZWNlbGwoY29udGVudCwgZmxhZ3MpIHtcbiAgICBjb25zdCB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gICAgY29uc3QgdGFnID0gZmxhZ3MuYWxpZ25cbiAgICAgID8gJzwnICsgdHlwZSArICcgYWxpZ249XCInICsgZmxhZ3MuYWxpZ24gKyAnXCI+J1xuICAgICAgOiAnPCcgKyB0eXBlICsgJz4nO1xuICAgIHJldHVybiB0YWcgKyBjb250ZW50ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG4gIH1cblxuICAvLyBzcGFuIGxldmVsIHJlbmRlcmVyXG4gIHN0cm9uZyh0ZXh0KSB7XG4gICAgcmV0dXJuICc8c3Ryb25nPicgKyB0ZXh0ICsgJzwvc3Ryb25nPic7XG4gIH1cblxuICBlbSh0ZXh0KSB7XG4gICAgcmV0dXJuICc8ZW0+JyArIHRleHQgKyAnPC9lbT4nO1xuICB9XG5cbiAgY29kZXNwYW4odGV4dCkge1xuICAgIHJldHVybiAnPGNvZGU+JyArIHRleHQgKyAnPC9jb2RlPic7XG4gIH1cblxuICBicigpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxici8+JyA6ICc8YnI+JztcbiAgfVxuXG4gIGRlbCh0ZXh0KSB7XG4gICAgcmV0dXJuICc8ZGVsPicgKyB0ZXh0ICsgJzwvZGVsPic7XG4gIH1cblxuICBsaW5rKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgaHJlZiA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSwgdGhpcy5vcHRpb25zLmJhc2VVcmwsIGhyZWYpO1xuICAgIGlmIChocmVmID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgbGV0IG91dCA9ICc8YSBocmVmPVwiJyArIGVzY2FwZSQxKGhyZWYpICsgJ1wiJztcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgICB9XG4gICAgb3V0ICs9ICc+JyArIHRleHQgKyAnPC9hPic7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGltYWdlKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgaHJlZiA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSwgdGhpcy5vcHRpb25zLmJhc2VVcmwsIGhyZWYpO1xuICAgIGlmIChocmVmID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG5cbiAgICBsZXQgb3V0ID0gJzxpbWcgc3JjPVwiJyArIGhyZWYgKyAnXCIgYWx0PVwiJyArIHRleHQgKyAnXCInO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICAgIH1cbiAgICBvdXQgKz0gdGhpcy5vcHRpb25zLnhodG1sID8gJy8+JyA6ICc+JztcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgdGV4dCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn07XG5cbi8qKlxuICogVGV4dFJlbmRlcmVyXG4gKiByZXR1cm5zIG9ubHkgdGhlIHRleHR1YWwgcGFydCBvZiB0aGUgdG9rZW5cbiAqL1xuXG52YXIgVGV4dFJlbmRlcmVyXzEgPSBjbGFzcyBUZXh0UmVuZGVyZXIge1xuICAvLyBubyBuZWVkIGZvciBibG9jayBsZXZlbCByZW5kZXJlcnNcbiAgc3Ryb25nKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIGVtKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIGNvZGVzcGFuKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIGRlbCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBodG1sKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHRleHQodGV4dCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgbGluayhocmVmLCB0aXRsZSwgdGV4dCkge1xuICAgIHJldHVybiAnJyArIHRleHQ7XG4gIH1cblxuICBpbWFnZShocmVmLCB0aXRsZSwgdGV4dCkge1xuICAgIHJldHVybiAnJyArIHRleHQ7XG4gIH1cblxuICBicigpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbi8qKlxuICogU2x1Z2dlciBnZW5lcmF0ZXMgaGVhZGVyIGlkXG4gKi9cblxudmFyIFNsdWdnZXJfMSA9IGNsYXNzIFNsdWdnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlZW4gPSB7fTtcbiAgfVxuXG4gIHNlcmlhbGl6ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC50cmltKClcbiAgICAgIC8vIHJlbW92ZSBodG1sIHRhZ3NcbiAgICAgIC5yZXBsYWNlKC88WyFcXC9hLXpdLio/Pi9pZywgJycpXG4gICAgICAvLyByZW1vdmUgdW53YW50ZWQgY2hhcnNcbiAgICAgIC5yZXBsYWNlKC9bXFx1MjAwMC1cXHUyMDZGXFx1MkUwMC1cXHUyRTdGXFxcXCchXCIjJCUmKCkqKywuLzo7PD0+P0BbXFxdXmB7fH1+XS9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXHMvZywgJy0nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgbmV4dCBzYWZlICh1bmlxdWUpIHNsdWcgdG8gdXNlXG4gICAqL1xuICBnZXROZXh0U2FmZVNsdWcob3JpZ2luYWxTbHVnLCBpc0RyeVJ1bikge1xuICAgIGxldCBzbHVnID0gb3JpZ2luYWxTbHVnO1xuICAgIGxldCBvY2N1cmVuY2VBY2N1bXVsYXRvciA9IDA7XG4gICAgaWYgKHRoaXMuc2Vlbi5oYXNPd25Qcm9wZXJ0eShzbHVnKSkge1xuICAgICAgb2NjdXJlbmNlQWNjdW11bGF0b3IgPSB0aGlzLnNlZW5bb3JpZ2luYWxTbHVnXTtcbiAgICAgIGRvIHtcbiAgICAgICAgb2NjdXJlbmNlQWNjdW11bGF0b3IrKztcbiAgICAgICAgc2x1ZyA9IG9yaWdpbmFsU2x1ZyArICctJyArIG9jY3VyZW5jZUFjY3VtdWxhdG9yO1xuICAgICAgfSB3aGlsZSAodGhpcy5zZWVuLmhhc093blByb3BlcnR5KHNsdWcpKTtcbiAgICB9XG4gICAgaWYgKCFpc0RyeVJ1bikge1xuICAgICAgdGhpcy5zZWVuW29yaWdpbmFsU2x1Z10gPSBvY2N1cmVuY2VBY2N1bXVsYXRvcjtcbiAgICAgIHRoaXMuc2VlbltzbHVnXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiBzbHVnO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgc3RyaW5nIHRvIHVuaXF1ZSBpZFxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuZHJ5cnVuIEdlbmVyYXRlcyB0aGUgbmV4dCB1bmlxdWUgc2x1ZyB3aXRob3V0IHVwZGF0aW5nIHRoZSBpbnRlcm5hbCBhY2N1bXVsYXRvci5cbiAgICovXG4gIHNsdWcodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHNsdWcgPSB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmV4dFNhZmVTbHVnKHNsdWcsIG9wdGlvbnMuZHJ5cnVuKTtcbiAgfVxufTtcblxuY29uc3QgUmVuZGVyZXIkMSA9IFJlbmRlcmVyXzE7XG5jb25zdCBUZXh0UmVuZGVyZXIkMSA9IFRleHRSZW5kZXJlcl8xO1xuY29uc3QgU2x1Z2dlciQxID0gU2x1Z2dlcl8xO1xuY29uc3QgeyBkZWZhdWx0czogZGVmYXVsdHMkMSB9ID0gZGVmYXVsdHMkNS5leHBvcnRzO1xuY29uc3Qge1xuICB1bmVzY2FwZVxufSA9IGhlbHBlcnM7XG5cbi8qKlxuICogUGFyc2luZyAmIENvbXBpbGluZ1xuICovXG52YXIgUGFyc2VyXzEgPSBjbGFzcyBQYXJzZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBkZWZhdWx0cyQxO1xuICAgIHRoaXMub3B0aW9ucy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXIkMSgpO1xuICAgIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gICAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHRoaXMudGV4dFJlbmRlcmVyID0gbmV3IFRleHRSZW5kZXJlciQxKCk7XG4gICAgdGhpcy5zbHVnZ2VyID0gbmV3IFNsdWdnZXIkMSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBQYXJzZSBNZXRob2RcbiAgICovXG4gIHN0YXRpYyBwYXJzZSh0b2tlbnMsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKG9wdGlvbnMpO1xuICAgIHJldHVybiBwYXJzZXIucGFyc2UodG9rZW5zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgUGFyc2UgSW5saW5lIE1ldGhvZFxuICAgKi9cbiAgc3RhdGljIHBhcnNlSW5saW5lKHRva2Vucywgb3B0aW9ucykge1xuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZUlubGluZSh0b2tlbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIExvb3BcbiAgICovXG4gIHBhcnNlKHRva2VucywgdG9wID0gdHJ1ZSkge1xuICAgIGxldCBvdXQgPSAnJyxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgayxcbiAgICAgIGwyLFxuICAgICAgbDMsXG4gICAgICByb3csXG4gICAgICBjZWxsLFxuICAgICAgaGVhZGVyLFxuICAgICAgYm9keSxcbiAgICAgIHRva2VuLFxuICAgICAgb3JkZXJlZCxcbiAgICAgIHN0YXJ0LFxuICAgICAgbG9vc2UsXG4gICAgICBpdGVtQm9keSxcbiAgICAgIGl0ZW0sXG4gICAgICBjaGVja2VkLFxuICAgICAgdGFzayxcbiAgICAgIGNoZWNrYm94LFxuICAgICAgcmV0O1xuXG4gICAgY29uc3QgbCA9IHRva2Vucy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIC8vIFJ1biBhbnkgcmVuZGVyZXIgZXh0ZW5zaW9uc1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnJlbmRlcmVycyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5yZW5kZXJlcnNbdG9rZW4udHlwZV0pIHtcbiAgICAgICAgcmV0ID0gdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMucmVuZGVyZXJzW3Rva2VuLnR5cGVdLmNhbGwoeyBwYXJzZXI6IHRoaXMgfSwgdG9rZW4pO1xuICAgICAgICBpZiAocmV0ICE9PSBmYWxzZSB8fCAhWydzcGFjZScsICdocicsICdoZWFkaW5nJywgJ2NvZGUnLCAndGFibGUnLCAnYmxvY2txdW90ZScsICdsaXN0JywgJ2h0bWwnLCAncGFyYWdyYXBoJywgJ3RleHQnXS5pbmNsdWRlcyh0b2tlbi50eXBlKSkge1xuICAgICAgICAgIG91dCArPSByZXQgfHwgJyc7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3NwYWNlJzoge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2hyJzoge1xuICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmhyKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnaGVhZGluZyc6IHtcbiAgICAgICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5oZWFkaW5nKFxuICAgICAgICAgICAgdGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMpLFxuICAgICAgICAgICAgdG9rZW4uZGVwdGgsXG4gICAgICAgICAgICB1bmVzY2FwZSh0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgdGhpcy50ZXh0UmVuZGVyZXIpKSxcbiAgICAgICAgICAgIHRoaXMuc2x1Z2dlcik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29kZSc6IHtcbiAgICAgICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5jb2RlKHRva2VuLnRleHQsXG4gICAgICAgICAgICB0b2tlbi5sYW5nLFxuICAgICAgICAgICAgdG9rZW4uZXNjYXBlZCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGFibGUnOiB7XG4gICAgICAgICAgaGVhZGVyID0gJyc7XG5cbiAgICAgICAgICAvLyBoZWFkZXJcbiAgICAgICAgICBjZWxsID0gJyc7XG4gICAgICAgICAgbDIgPSB0b2tlbi5oZWFkZXIubGVuZ3RoO1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsMjsgaisrKSB7XG4gICAgICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgICAgICAgICAgICB0aGlzLnBhcnNlSW5saW5lKHRva2VuLmhlYWRlcltqXS50b2tlbnMpLFxuICAgICAgICAgICAgICB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRva2VuLmFsaWduW2pdIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhlYWRlciArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuXG4gICAgICAgICAgYm9keSA9ICcnO1xuICAgICAgICAgIGwyID0gdG9rZW4ucm93cy5sZW5ndGg7XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IGwyOyBqKyspIHtcbiAgICAgICAgICAgIHJvdyA9IHRva2VuLnJvd3Nbal07XG5cbiAgICAgICAgICAgIGNlbGwgPSAnJztcbiAgICAgICAgICAgIGwzID0gcm93Lmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBsMzsgaysrKSB7XG4gICAgICAgICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUlubGluZShyb3dba10udG9rZW5zKSxcbiAgICAgICAgICAgICAgICB7IGhlYWRlcjogZmFsc2UsIGFsaWduOiB0b2tlbi5hbGlnbltrXSB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJvZHkgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdibG9ja3F1b3RlJzoge1xuICAgICAgICAgIGJvZHkgPSB0aGlzLnBhcnNlKHRva2VuLnRva2Vucyk7XG4gICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuYmxvY2txdW90ZShib2R5KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdsaXN0Jzoge1xuICAgICAgICAgIG9yZGVyZWQgPSB0b2tlbi5vcmRlcmVkO1xuICAgICAgICAgIHN0YXJ0ID0gdG9rZW4uc3RhcnQ7XG4gICAgICAgICAgbG9vc2UgPSB0b2tlbi5sb29zZTtcbiAgICAgICAgICBsMiA9IHRva2VuLml0ZW1zLmxlbmd0aDtcblxuICAgICAgICAgIGJvZHkgPSAnJztcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbDI7IGorKykge1xuICAgICAgICAgICAgaXRlbSA9IHRva2VuLml0ZW1zW2pdO1xuICAgICAgICAgICAgY2hlY2tlZCA9IGl0ZW0uY2hlY2tlZDtcbiAgICAgICAgICAgIHRhc2sgPSBpdGVtLnRhc2s7XG5cbiAgICAgICAgICAgIGl0ZW1Cb2R5ID0gJyc7XG4gICAgICAgICAgICBpZiAoaXRlbS50YXNrKSB7XG4gICAgICAgICAgICAgIGNoZWNrYm94ID0gdGhpcy5yZW5kZXJlci5jaGVja2JveChjaGVja2VkKTtcbiAgICAgICAgICAgICAgaWYgKGxvb3NlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udG9rZW5zLmxlbmd0aCA+IDAgJiYgaXRlbS50b2tlbnNbMF0udHlwZSA9PT0gJ3BhcmFncmFwaCcpIHtcbiAgICAgICAgICAgICAgICAgIGl0ZW0udG9rZW5zWzBdLnRleHQgPSBjaGVja2JveCArICcgJyArIGl0ZW0udG9rZW5zWzBdLnRleHQ7XG4gICAgICAgICAgICAgICAgICBpZiAoaXRlbS50b2tlbnNbMF0udG9rZW5zICYmIGl0ZW0udG9rZW5zWzBdLnRva2Vucy5sZW5ndGggPiAwICYmIGl0ZW0udG9rZW5zWzBdLnRva2Vuc1swXS50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50b2tlbnNbMF0udG9rZW5zWzBdLnRleHQgPSBjaGVja2JveCArICcgJyArIGl0ZW0udG9rZW5zWzBdLnRva2Vuc1swXS50ZXh0O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpdGVtLnRva2Vucy51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjaGVja2JveFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW1Cb2R5ICs9IGNoZWNrYm94O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW1Cb2R5ICs9IHRoaXMucGFyc2UoaXRlbS50b2tlbnMsIGxvb3NlKTtcbiAgICAgICAgICAgIGJvZHkgKz0gdGhpcy5yZW5kZXJlci5saXN0aXRlbShpdGVtQm9keSwgdGFzaywgY2hlY2tlZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGlzdChib2R5LCBvcmRlcmVkLCBzdGFydCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHRtbCc6IHtcbiAgICAgICAgICAvLyBUT0RPIHBhcnNlIGlubGluZSBjb250ZW50IGlmIHBhcmFtZXRlciBtYXJrZG93bj0xXG4gICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuaHRtbCh0b2tlbi50ZXh0KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdwYXJhZ3JhcGgnOiB7XG4gICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VJbmxpbmUodG9rZW4udG9rZW5zKSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgICBib2R5ID0gdG9rZW4udG9rZW5zID8gdGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMpIDogdG9rZW4udGV4dDtcbiAgICAgICAgICB3aGlsZSAoaSArIDEgPCBsICYmIHRva2Vuc1tpICsgMV0udHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1srK2ldO1xuICAgICAgICAgICAgYm9keSArPSAnXFxuJyArICh0b2tlbi50b2tlbnMgPyB0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucykgOiB0b2tlbi50ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0ICs9IHRvcCA/IHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKGJvZHkpIDogYm9keTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjb25zdCBlcnJNc2cgPSAnVG9rZW4gd2l0aCBcIicgKyB0b2tlbi50eXBlICsgJ1wiIHR5cGUgd2FzIG5vdCBmb3VuZC4nO1xuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJNc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgSW5saW5lIFRva2Vuc1xuICAgKi9cbiAgcGFyc2VJbmxpbmUodG9rZW5zLCByZW5kZXJlcikge1xuICAgIHJlbmRlcmVyID0gcmVuZGVyZXIgfHwgdGhpcy5yZW5kZXJlcjtcbiAgICBsZXQgb3V0ID0gJycsXG4gICAgICBpLFxuICAgICAgdG9rZW4sXG4gICAgICByZXQ7XG5cbiAgICBjb25zdCBsID0gdG9rZW5zLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgLy8gUnVuIGFueSByZW5kZXJlciBleHRlbnNpb25zXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmV4dGVuc2lvbnMgJiYgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMucmVuZGVyZXJzICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnJlbmRlcmVyc1t0b2tlbi50eXBlXSkge1xuICAgICAgICByZXQgPSB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5yZW5kZXJlcnNbdG9rZW4udHlwZV0uY2FsbCh7IHBhcnNlcjogdGhpcyB9LCB0b2tlbik7XG4gICAgICAgIGlmIChyZXQgIT09IGZhbHNlIHx8ICFbJ2VzY2FwZScsICdodG1sJywgJ2xpbmsnLCAnaW1hZ2UnLCAnc3Ryb25nJywgJ2VtJywgJ2NvZGVzcGFuJywgJ2JyJywgJ2RlbCcsICd0ZXh0J10uaW5jbHVkZXModG9rZW4udHlwZSkpIHtcbiAgICAgICAgICBvdXQgKz0gcmV0IHx8ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICBjYXNlICdlc2NhcGUnOiB7XG4gICAgICAgICAgb3V0ICs9IHJlbmRlcmVyLnRleHQodG9rZW4udGV4dCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHRtbCc6IHtcbiAgICAgICAgICBvdXQgKz0gcmVuZGVyZXIuaHRtbCh0b2tlbi50ZXh0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdsaW5rJzoge1xuICAgICAgICAgIG91dCArPSByZW5kZXJlci5saW5rKHRva2VuLmhyZWYsIHRva2VuLnRpdGxlLCB0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdpbWFnZSc6IHtcbiAgICAgICAgICBvdXQgKz0gcmVuZGVyZXIuaW1hZ2UodG9rZW4uaHJlZiwgdG9rZW4udGl0bGUsIHRva2VuLnRleHQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3N0cm9uZyc6IHtcbiAgICAgICAgICBvdXQgKz0gcmVuZGVyZXIuc3Ryb25nKHRoaXMucGFyc2VJbmxpbmUodG9rZW4udG9rZW5zLCByZW5kZXJlcikpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2VtJzoge1xuICAgICAgICAgIG91dCArPSByZW5kZXJlci5lbSh0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjb2Rlc3Bhbic6IHtcbiAgICAgICAgICBvdXQgKz0gcmVuZGVyZXIuY29kZXNwYW4odG9rZW4udGV4dCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnYnInOiB7XG4gICAgICAgICAgb3V0ICs9IHJlbmRlcmVyLmJyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnZGVsJzoge1xuICAgICAgICAgIG91dCArPSByZW5kZXJlci5kZWwodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMsIHJlbmRlcmVyKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGV4dCc6IHtcbiAgICAgICAgICBvdXQgKz0gcmVuZGVyZXIudGV4dCh0b2tlbi50ZXh0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgY29uc3QgZXJyTXNnID0gJ1Rva2VuIHdpdGggXCInICsgdG9rZW4udHlwZSArICdcIiB0eXBlIHdhcyBub3QgZm91bmQuJztcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNpbGVudCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyTXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfVxufTtcblxuY29uc3QgTGV4ZXIgPSBMZXhlcl8xO1xuY29uc3QgUGFyc2VyID0gUGFyc2VyXzE7XG5jb25zdCBUb2tlbml6ZXIgPSBUb2tlbml6ZXJfMTtcbmNvbnN0IFJlbmRlcmVyID0gUmVuZGVyZXJfMTtcbmNvbnN0IFRleHRSZW5kZXJlciA9IFRleHRSZW5kZXJlcl8xO1xuY29uc3QgU2x1Z2dlciA9IFNsdWdnZXJfMTtcbmNvbnN0IHtcbiAgbWVyZ2UsXG4gIGNoZWNrU2FuaXRpemVEZXByZWNhdGlvbixcbiAgZXNjYXBlXG59ID0gaGVscGVycztcbmNvbnN0IHtcbiAgZ2V0RGVmYXVsdHMsXG4gIGNoYW5nZURlZmF1bHRzLFxuICBkZWZhdWx0c1xufSA9IGRlZmF1bHRzJDUuZXhwb3J0cztcblxuLyoqXG4gKiBNYXJrZWRcbiAqL1xuZnVuY3Rpb24gbWFya2VkKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICAvLyB0aHJvdyBlcnJvciBpbiBjYXNlIG9mIG5vbiBzdHJpbmcgaW5wdXRcbiAgaWYgKHR5cGVvZiBzcmMgPT09ICd1bmRlZmluZWQnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbWFya2VkKCk6IGlucHV0IHBhcmFtZXRlciBpcyB1bmRlZmluZWQgb3IgbnVsbCcpO1xuICB9XG4gIGlmICh0eXBlb2Ygc3JjICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignbWFya2VkKCk6IGlucHV0IHBhcmFtZXRlciBpcyBvZiB0eXBlICdcbiAgICAgICsgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNyYykgKyAnLCBzdHJpbmcgZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHQ7XG4gICAgb3B0ID0gbnVsbDtcbiAgfVxuXG4gIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCB8fCB7fSk7XG4gIGNoZWNrU2FuaXRpemVEZXByZWNhdGlvbihvcHQpO1xuXG4gIGlmIChjYWxsYmFjaykge1xuICAgIGNvbnN0IGhpZ2hsaWdodCA9IG9wdC5oaWdobGlnaHQ7XG4gICAgbGV0IHRva2VucztcblxuICAgIHRyeSB7XG4gICAgICB0b2tlbnMgPSBMZXhlci5sZXgoc3JjLCBvcHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICB9XG5cbiAgICBjb25zdCBkb25lID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICBsZXQgb3V0O1xuXG4gICAgICBpZiAoIWVycikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChvcHQud2Fsa1Rva2Vucykge1xuICAgICAgICAgICAgbWFya2VkLndhbGtUb2tlbnModG9rZW5zLCBvcHQud2Fsa1Rva2Vucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG91dCA9IFBhcnNlci5wYXJzZSh0b2tlbnMsIG9wdCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBlcnIgPSBlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9wdC5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG5cbiAgICAgIHJldHVybiBlcnJcbiAgICAgICAgPyBjYWxsYmFjayhlcnIpXG4gICAgICAgIDogY2FsbGJhY2sobnVsbCwgb3V0KTtcbiAgICB9O1xuXG4gICAgaWYgKCFoaWdobGlnaHQgfHwgaGlnaGxpZ2h0Lmxlbmd0aCA8IDMpIHtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlIG9wdC5oaWdobGlnaHQ7XG5cbiAgICBpZiAoIXRva2Vucy5sZW5ndGgpIHJldHVybiBkb25lKCk7XG5cbiAgICBsZXQgcGVuZGluZyA9IDA7XG4gICAgbWFya2VkLndhbGtUb2tlbnModG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICBwZW5kaW5nKys7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGhpZ2hsaWdodCh0b2tlbi50ZXh0LCB0b2tlbi5sYW5nLCBmdW5jdGlvbihlcnIsIGNvZGUpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2RlICE9IG51bGwgJiYgY29kZSAhPT0gdG9rZW4udGV4dCkge1xuICAgICAgICAgICAgICB0b2tlbi50ZXh0ID0gY29kZTtcbiAgICAgICAgICAgICAgdG9rZW4uZXNjYXBlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBlbmRpbmctLTtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nID09PSAwKSB7XG4gICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocGVuZGluZyA9PT0gMCkge1xuICAgICAgZG9uZSgpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW5zID0gTGV4ZXIubGV4KHNyYywgb3B0KTtcbiAgICBpZiAob3B0LndhbGtUb2tlbnMpIHtcbiAgICAgIG1hcmtlZC53YWxrVG9rZW5zKHRva2Vucywgb3B0LndhbGtUb2tlbnMpO1xuICAgIH1cbiAgICByZXR1cm4gUGFyc2VyLnBhcnNlKHRva2Vucywgb3B0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGUubWVzc2FnZSArPSAnXFxuUGxlYXNlIHJlcG9ydCB0aGlzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZWRqcy9tYXJrZWQuJztcbiAgICBpZiAob3B0LnNpbGVudCkge1xuICAgICAgcmV0dXJuICc8cD5BbiBlcnJvciBvY2N1cnJlZDo8L3A+PHByZT4nXG4gICAgICAgICsgZXNjYXBlKGUubWVzc2FnZSArICcnLCB0cnVlKVxuICAgICAgICArICc8L3ByZT4nO1xuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbi8qKlxuICogT3B0aW9uc1xuICovXG5cbm1hcmtlZC5vcHRpb25zID1cbm1hcmtlZC5zZXRPcHRpb25zID0gZnVuY3Rpb24ob3B0KSB7XG4gIG1lcmdlKG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgY2hhbmdlRGVmYXVsdHMobWFya2VkLmRlZmF1bHRzKTtcbiAgcmV0dXJuIG1hcmtlZDtcbn07XG5cbm1hcmtlZC5nZXREZWZhdWx0cyA9IGdldERlZmF1bHRzO1xuXG5tYXJrZWQuZGVmYXVsdHMgPSBkZWZhdWx0cztcblxuLyoqXG4gKiBVc2UgRXh0ZW5zaW9uXG4gKi9cblxubWFya2VkLnVzZSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgY29uc3Qgb3B0cyA9IG1lcmdlKHt9LCAuLi5hcmdzKTtcbiAgY29uc3QgZXh0ZW5zaW9ucyA9IG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zIHx8IHsgcmVuZGVyZXJzOiB7fSwgY2hpbGRUb2tlbnM6IHt9IH07XG4gIGxldCBoYXNFeHRlbnNpb25zO1xuXG4gIGFyZ3MuZm9yRWFjaCgocGFjaykgPT4ge1xuICAgIC8vID09LS0gUGFyc2UgXCJhZGRvblwiIGV4dGVuc2lvbnMgLS09PSAvL1xuICAgIGlmIChwYWNrLmV4dGVuc2lvbnMpIHtcbiAgICAgIGhhc0V4dGVuc2lvbnMgPSB0cnVlO1xuICAgICAgcGFjay5leHRlbnNpb25zLmZvckVhY2goKGV4dCkgPT4ge1xuICAgICAgICBpZiAoIWV4dC5uYW1lKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHRlbnNpb24gbmFtZSByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHQucmVuZGVyZXIpIHsgLy8gUmVuZGVyZXIgZXh0ZW5zaW9uc1xuICAgICAgICAgIGNvbnN0IHByZXZSZW5kZXJlciA9IGV4dGVuc2lvbnMucmVuZGVyZXJzID8gZXh0ZW5zaW9ucy5yZW5kZXJlcnNbZXh0Lm5hbWVdIDogbnVsbDtcbiAgICAgICAgICBpZiAocHJldlJlbmRlcmVyKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIGV4dGVuc2lvbiB3aXRoIGZ1bmMgdG8gcnVuIG5ldyBleHRlbnNpb24gYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgICAgZXh0ZW5zaW9ucy5yZW5kZXJlcnNbZXh0Lm5hbWVdID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICAgICAgICBsZXQgcmV0ID0gZXh0LnJlbmRlcmVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldCA9IHByZXZSZW5kZXJlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5zaW9ucy5yZW5kZXJlcnNbZXh0Lm5hbWVdID0gZXh0LnJlbmRlcmVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXh0LnRva2VuaXplcikgeyAvLyBUb2tlbml6ZXIgRXh0ZW5zaW9uc1xuICAgICAgICAgIGlmICghZXh0LmxldmVsIHx8IChleHQubGV2ZWwgIT09ICdibG9jaycgJiYgZXh0LmxldmVsICE9PSAnaW5saW5lJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImV4dGVuc2lvbiBsZXZlbCBtdXN0IGJlICdibG9jaycgb3IgJ2lubGluZSdcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChleHRlbnNpb25zW2V4dC5sZXZlbF0pIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnNbZXh0LmxldmVsXS51bnNoaWZ0KGV4dC50b2tlbml6ZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRlbnNpb25zW2V4dC5sZXZlbF0gPSBbZXh0LnRva2VuaXplcl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChleHQuc3RhcnQpIHsgLy8gRnVuY3Rpb24gdG8gY2hlY2sgZm9yIHN0YXJ0IG9mIHRva2VuXG4gICAgICAgICAgICBpZiAoZXh0LmxldmVsID09PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgIGlmIChleHRlbnNpb25zLnN0YXJ0QmxvY2spIHtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zLnN0YXJ0QmxvY2sucHVzaChleHQuc3RhcnQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRCbG9jayA9IFtleHQuc3RhcnRdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV4dC5sZXZlbCA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuc3RhcnRJbmxpbmUpIHtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zLnN0YXJ0SW5saW5lLnB1c2goZXh0LnN0YXJ0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zLnN0YXJ0SW5saW5lID0gW2V4dC5zdGFydF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4dC5jaGlsZFRva2VucykgeyAvLyBDaGlsZCB0b2tlbnMgdG8gYmUgdmlzaXRlZCBieSB3YWxrVG9rZW5zXG4gICAgICAgICAgZXh0ZW5zaW9ucy5jaGlsZFRva2Vuc1tleHQubmFtZV0gPSBleHQuY2hpbGRUb2tlbnM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vID09LS0gUGFyc2UgXCJvdmVyd3JpdGVcIiBleHRlbnNpb25zIC0tPT0gLy9cbiAgICBpZiAocGFjay5yZW5kZXJlcikge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSBtYXJrZWQuZGVmYXVsdHMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyKCk7XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gcGFjay5yZW5kZXJlcikge1xuICAgICAgICBjb25zdCBwcmV2UmVuZGVyZXIgPSByZW5kZXJlcltwcm9wXTtcbiAgICAgICAgLy8gUmVwbGFjZSByZW5kZXJlciB3aXRoIGZ1bmMgdG8gcnVuIGV4dGVuc2lvbiwgYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICByZW5kZXJlcltwcm9wXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgbGV0IHJldCA9IHBhY2sucmVuZGVyZXJbcHJvcF0uYXBwbHkocmVuZGVyZXIsIGFyZ3MpO1xuICAgICAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXQgPSBwcmV2UmVuZGVyZXIuYXBwbHkocmVuZGVyZXIsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgb3B0cy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIH1cbiAgICBpZiAocGFjay50b2tlbml6ZXIpIHtcbiAgICAgIGNvbnN0IHRva2VuaXplciA9IG1hcmtlZC5kZWZhdWx0cy50b2tlbml6ZXIgfHwgbmV3IFRva2VuaXplcigpO1xuICAgICAgZm9yIChjb25zdCBwcm9wIGluIHBhY2sudG9rZW5pemVyKSB7XG4gICAgICAgIGNvbnN0IHByZXZUb2tlbml6ZXIgPSB0b2tlbml6ZXJbcHJvcF07XG4gICAgICAgIC8vIFJlcGxhY2UgdG9rZW5pemVyIHdpdGggZnVuYyB0byBydW4gZXh0ZW5zaW9uLCBidXQgZmFsbCBiYWNrIGlmIGZhbHNlXG4gICAgICAgIHRva2VuaXplcltwcm9wXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgbGV0IHJldCA9IHBhY2sudG9rZW5pemVyW3Byb3BdLmFwcGx5KHRva2VuaXplciwgYXJncyk7XG4gICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldCA9IHByZXZUb2tlbml6ZXIuYXBwbHkodG9rZW5pemVyLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIG9wdHMudG9rZW5pemVyID0gdG9rZW5pemVyO1xuICAgIH1cblxuICAgIC8vID09LS0gUGFyc2UgV2Fsa1Rva2VucyBleHRlbnNpb25zIC0tPT0gLy9cbiAgICBpZiAocGFjay53YWxrVG9rZW5zKSB7XG4gICAgICBjb25zdCB3YWxrVG9rZW5zID0gbWFya2VkLmRlZmF1bHRzLndhbGtUb2tlbnM7XG4gICAgICBvcHRzLndhbGtUb2tlbnMgPSAodG9rZW4pID0+IHtcbiAgICAgICAgcGFjay53YWxrVG9rZW5zLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICBpZiAod2Fsa1Rva2Vucykge1xuICAgICAgICAgIHdhbGtUb2tlbnModG9rZW4pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChoYXNFeHRlbnNpb25zKSB7XG4gICAgICBvcHRzLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgIH1cblxuICAgIG1hcmtlZC5zZXRPcHRpb25zKG9wdHMpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUnVuIGNhbGxiYWNrIGZvciBldmVyeSB0b2tlblxuICovXG5cbm1hcmtlZC53YWxrVG9rZW5zID0gZnVuY3Rpb24odG9rZW5zLCBjYWxsYmFjaykge1xuICBmb3IgKGNvbnN0IHRva2VuIG9mIHRva2Vucykge1xuICAgIGNhbGxiYWNrKHRva2VuKTtcbiAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RhYmxlJzoge1xuICAgICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgdG9rZW4uaGVhZGVyKSB7XG4gICAgICAgICAgbWFya2VkLndhbGtUb2tlbnMoY2VsbC50b2tlbnMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiB0b2tlbi5yb3dzKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHJvdykge1xuICAgICAgICAgICAgbWFya2VkLndhbGtUb2tlbnMoY2VsbC50b2tlbnMsIGNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdsaXN0Jzoge1xuICAgICAgICBtYXJrZWQud2Fsa1Rva2Vucyh0b2tlbi5pdGVtcywgY2FsbGJhY2spO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zICYmIG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zLmNoaWxkVG9rZW5zICYmIG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zLmNoaWxkVG9rZW5zW3Rva2VuLnR5cGVdKSB7IC8vIFdhbGsgYW55IGV4dGVuc2lvbnNcbiAgICAgICAgICBtYXJrZWQuZGVmYXVsdHMuZXh0ZW5zaW9ucy5jaGlsZFRva2Vuc1t0b2tlbi50eXBlXS5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkVG9rZW5zKSB7XG4gICAgICAgICAgICBtYXJrZWQud2Fsa1Rva2Vucyh0b2tlbltjaGlsZFRva2Vuc10sIGNhbGxiYWNrKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50b2tlbnMpIHtcbiAgICAgICAgICBtYXJrZWQud2Fsa1Rva2Vucyh0b2tlbi50b2tlbnMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBQYXJzZSBJbmxpbmVcbiAqL1xubWFya2VkLnBhcnNlSW5saW5lID0gZnVuY3Rpb24oc3JjLCBvcHQpIHtcbiAgLy8gdGhyb3cgZXJyb3IgaW4gY2FzZSBvZiBub24gc3RyaW5nIGlucHV0XG4gIGlmICh0eXBlb2Ygc3JjID09PSAndW5kZWZpbmVkJyB8fCBzcmMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21hcmtlZC5wYXJzZUlubGluZSgpOiBpbnB1dCBwYXJhbWV0ZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwnKTtcbiAgfVxuICBpZiAodHlwZW9mIHNyYyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21hcmtlZC5wYXJzZUlubGluZSgpOiBpbnB1dCBwYXJhbWV0ZXIgaXMgb2YgdHlwZSAnXG4gICAgICArIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzcmMpICsgJywgc3RyaW5nIGV4cGVjdGVkJyk7XG4gIH1cblxuICBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQgfHwge30pO1xuICBjaGVja1Nhbml0aXplRGVwcmVjYXRpb24ob3B0KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHRva2VucyA9IExleGVyLmxleElubGluZShzcmMsIG9wdCk7XG4gICAgaWYgKG9wdC53YWxrVG9rZW5zKSB7XG4gICAgICBtYXJrZWQud2Fsa1Rva2Vucyh0b2tlbnMsIG9wdC53YWxrVG9rZW5zKTtcbiAgICB9XG4gICAgcmV0dXJuIFBhcnNlci5wYXJzZUlubGluZSh0b2tlbnMsIG9wdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vbWFya2VkanMvbWFya2VkLic7XG4gICAgaWYgKG9wdC5zaWxlbnQpIHtcbiAgICAgIHJldHVybiAnPHA+QW4gZXJyb3Igb2NjdXJyZWQ6PC9wPjxwcmU+J1xuICAgICAgICArIGVzY2FwZShlLm1lc3NhZ2UgKyAnJywgdHJ1ZSlcbiAgICAgICAgKyAnPC9wcmU+JztcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xuXG5tYXJrZWQuUGFyc2VyID0gUGFyc2VyO1xubWFya2VkLnBhcnNlciA9IFBhcnNlci5wYXJzZTtcblxubWFya2VkLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5tYXJrZWQuVGV4dFJlbmRlcmVyID0gVGV4dFJlbmRlcmVyO1xuXG5tYXJrZWQuTGV4ZXIgPSBMZXhlcjtcbm1hcmtlZC5sZXhlciA9IExleGVyLmxleDtcblxubWFya2VkLlRva2VuaXplciA9IFRva2VuaXplcjtcblxubWFya2VkLlNsdWdnZXIgPSBTbHVnZ2VyO1xuXG5tYXJrZWQucGFyc2UgPSBtYXJrZWQ7XG5cbnZhciBtYXJrZWRfMSA9IG1hcmtlZDtcblxuZXhwb3J0IHsgbWFya2VkXzEgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IHsgT0F1dGgyQ2xpZW50IH0gZnJvbSAnZ29vZ2xlLWF1dGgtbGlicmFyeSdcblxuY29uc3Qgc2V0dXBBY2Nlc3NMaWIgPSAoeyBwcm9qZWN0SWQsIHByb2plY3ROdW1iZXIgfSkgPT4ge1xuICBsZXQgZXhwZWN0ZWRBdWRpZW5jZSA9IG51bGxcbiAgaWYgKHByb2plY3ROdW1iZXIgJiYgcHJvamVjdElkKSB7XG4gICAgLy8gRXhwZWN0ZWQgQXVkaWVuY2UgZm9yIEFwcCBFbmdpbmUuXG4gICAgZXhwZWN0ZWRBdWRpZW5jZSA9IGAvcHJvamVjdHMvJHtwcm9qZWN0TnVtYmVyfS9hcHBzLyR7cHJvamVjdElkfWBcbiAgfVxuICAvKiBlbHNlIGlmIChwcm9qZWN0TnVtYmVyICYmIGJhY2tlbmRTZXJ2aWNlSWQpIHsgLy8gZm9yIGZ1dHVyZSByZWY7IG5vdCB1c2VkIGhlcmVcbiAgICAvLyBFeHBlY3RlZCBBdWRpZW5jZSBmb3IgQ29tcHV0ZSBFbmdpbmVcbiAgICBleHBlY3RlZEF1ZGllbmNlID0gYC9wcm9qZWN0cy8ke3Byb2plY3ROdW1iZXJ9L2dsb2JhbC9iYWNrZW5kU2VydmljZXMvJHtiYWNrZW5kU2VydmljZUlkfWBcbiAgfSAqL1xuICBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBkZXRlcm1pbmUgXFwnZXhwZWN0ZWQgYXVkaWVuY2VcXCcgZm9yIEpXVCB2ZXJpZmljYXRpb24uJylcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmVyaWZ5VG9rZW4gOiBhc3luYyhyZXEpID0+IHtcbiAgICAgIGNvbnN0IGlhcEp3dCA9IHJlcS5oZWFkZXJzPy5bJ3gtZ29vZy1pYXAtand0LWFzc2VydGlvbiddXG5cbiAgICAgIGNvbnN0IG9BdXRoMkNsaWVudCA9IG5ldyBPQXV0aDJDbGllbnQoKVxuICAgICAgLy8gVmVyaWZ5IHRoZSBpZF90b2tlbiwgYW5kIGFjY2VzcyB0aGUgY2xhaW1zLlxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvQXV0aDJDbGllbnQuZ2V0SWFwUHVibGljS2V5cygpXG4gICAgICBjb25zdCB0aWNrZXQgPSBhd2FpdCBvQXV0aDJDbGllbnQudmVyaWZ5U2lnbmVkSnd0V2l0aENlcnRzQXN5bmMoXG4gICAgICAgIGlhcEp3dCxcbiAgICAgICAgcmVzcG9uc2UucHVia2V5cyxcbiAgICAgICAgZXhwZWN0ZWRBdWRpZW5jZSxcbiAgICAgICAgWydodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vaWFwJ11cbiAgICAgIClcblxuICAgICAgcmV0dXJuIHRpY2tldFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBzZXR1cEFjY2Vzc0xpYiB9XG4iLCIvKipcbiogIyMgT3ZlcnZpZXdcbipcbiogU2VydmVzIGZpbGVzIGZyb20gYSBDbG91ZCBTdG9yYWdlIGJ1Y2tldCBhcyBpZiBmcm9tIGEgbG9jYWwgZmlsZXN5c3RlbS5cbipcbiogVGhlIGJhc2ljIGZsb3cgaXM6XG4qIDEuIERldGVybWluZSBidWNrZXQgY29uZmlnIGFuZCBjb25uZWN0LlxuKiAyLiBMaXN0ZW4uXG4qIDMuIEV4YW1pbmUgaW5jb21pbmcgcmVxdWVzdHMuXG4qICAgMy4xIElmIHRoZXJlJ3MgYSBzdWZmaXgsIHBhc3MgaGFuZGxpbmcgdG8gdGhlIGZpbGUgaGFuZGxlci5cbiogICAzLjIgRXZlcnl0aGluZyBlbHNlIGlzIGFzc3VtZWQgdG8gYmUgYSBkaXJlY3RvcnkgcmVmZXJlbmNlLiBQYXNzIGhhbmRsaW5nIHRvIHRoZSBkaXJlY3RvcnkgaW5kZXhlci5cbiogNC4gQmFjayB0byBsaXN0ZW5pbmcuXG4qXG4qICMjIFJlZmVyZW5jZXNcbipcbiogKiBFcnJvciBoYW5kbGluZyBhbmQgaGFuZGxpbmcgb2YgYXN5bmNocm9ub3VzIGZsb3cgaW5mb3JtZWQgcHJpbWFyaWx5IGJ5IFtVc2luZyBBc3luYy9hd2FpdCBpblxuKiAgIEV4cHJlc3NdKGh0dHBzOi8vemVsbHdrLmNvbS9ibG9nL2FzeW5jLWF3YWl0LWV4cHJlc3MvKSBmcm9tIEp1bHkgMjAyMS5cbiovXG5cbmltcG9ydCBhc3luY0hhbmRsZXIgZnJvbSAnZXhwcmVzcy1hc3luYy1oYW5kbGVyJ1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCBnY3BNZXRhZGF0YSBmcm9tICdnY3AtbWV0YWRhdGEnXG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCdcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICdAZ29vZ2xlLWNsb3VkL3N0b3JhZ2UnXG5cbmltcG9ydCB7IHNldHVwQWNjZXNzTGliIH0gZnJvbSAnLi9saWIvYWNjZXNzJ1xuXG4vLyBHZXQgYmFzaWMgcHJvamVjdCBpbmZvXG5jb25zdCBwcm9qZWN0SWQgPSBwcm9jZXNzLmVudi5HT09HTEVfQ0xPVURfUFJPSkVDVFxuY29uc29sZS5sb2coYFN0YXJ0aW5nIHNlcnZlciBmb3IgcHJvamVjdCAnJHtwcm9qZWN0SWR9Jy4uLmApXG5cbi8vIGhhdmUgdG8gdXNlIHRoZSAnbWV0YWRhdGEnIHNlcnZlciBmb3IgcHJvamVjdCBudW1iZXJcbmNvbnN0IGlzQXZhaWxhYmxlID0gYXdhaXQgZ2NwTWV0YWRhdGEuaXNBdmFpbGFibGUoKVxuaWYgKCFpc0F2YWlsYWJsZSkgeyAvLyBUT0RPOiBTdXBwb3J0IGZhbGxiYWNrIG1vZGVzIGFuZCAndW52ZXJpZmllZCcgYWNjZXNzIHdoZW4gY29uZmlndXJlZCBmb3IgaXRcbiAgdGhyb3cgbmV3IEVycm9yKCdNZXRhZGF0YSBub3QgYXZhaWxhYmxlLCBjYW5ub3QgcHJvY2VlZC4nKVxufVxuY29uc29sZS5sb2coYE1ldGFkYXRhIGF2YWlsYWJsZTogJHtpc0F2YWlsYWJsZX1gKVxuXG5jb25zdCBwcm9qZWN0TnVtYmVyID0gYXdhaXQgZ2NwTWV0YWRhdGEucHJvamVjdCgnbnVtZXJpYy1wcm9qZWN0LWlkJylcblxuLy8gc2V0dXAgYWNjZXNzIGNoZWNrZXJcbmNvbnN0IGFjY2Vzc0xpYiA9IHNldHVwQWNjZXNzTGliKHsgcHJvamVjdElkLCBwcm9qZWN0TnVtYmVyIH0pXG5cbi8vIHNldHVwIHN0b3JhZ2Ugc3R1ZmZcbmNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpXG5cbmNvbnN0IGJ1Y2tldElkID0gcHJvY2Vzcy5lbnYuQlVDS0VUXG5pZiAoIWJ1Y2tldElkKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vICdCVUNLRVQnIGVudmlyb25tZW50IHZhcmlhYmxlIGZvdW5kIChvciBpcyBlbXB0eSkuXCIpXG59XG4vLyBVc2VmdWwgaW5mbyBmb3IgdGhlIGxvZ3MuXG5jb25zb2xlLmxvZyhgQ29ubmVjdGluZyB0byBidWNrZXQ6ICR7YnVja2V0SWR9YClcbmNvbnN0IGJ1Y2tldCA9IHN0b3JhZ2UuYnVja2V0KGJ1Y2tldElkKVxuXG4vLyBzZXR1cCB3ZWIgc2VydmVyIHN0dWZmXG5jb25zdCBhcHAgPSBleHByZXNzKClcbmFwcC5zZXQoJ3RydXN0IHByb3h5JywgdHJ1ZSlcbmNvbnN0IFBPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDgwODBcblxuY29uc3QgZmlsZVJlZ2V4ID0gLy4qXFwuW14uL10rJC9cbmNvbnN0IGNvbW1vbkltYWdlRmlsZXMgPSAvXFwuKGpwZ3xwbmd8Z2lmKSQvaVxuXG5jb25zdCBodG1sT3BlbiA9IChwYXRoKSA9PiBgPCFkb2N0eXBlIGh0bWw+XG48aHRtbD5cbiAgPGhlYWQ+XG4gICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCIvPlxuICAgIDx0aXRsZT4ke3BhdGh9PC90aXRsZT5cbiAgICA8IS0tW2lmIGx0IElFIDldPlxuICAgIDxzY3JpcHQgc3JjPVwiLy9odG1sNXNoaW0uZ29vZ2xlY29kZS5jb20vc3ZuL3RydW5rL2h0bWw1LmpzXCI+PC9zY3JpcHQ+XG4gICAgPCFbZW5kaWZdLS0+XG4gICAgPHN0eWxlPlxuICAgIC8qXG5Db3B5cmlnaHQgKGMpIDIwMTcgQ2hyaXMgUGF0dXp6b1xuaHR0cHM6Ly90d2l0dGVyLmNvbS9jaHJpc3BhdHV6em9cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxuYm9keSB7XG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIGFyaWFsLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjY7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG5ib2R5ID4gKjpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcbn1cblxuYm9keSA+ICo6bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi1ib3R0b206IDAgIWltcG9ydGFudDtcbn1cblxuYSB7XG4gIGNvbG9yOiAjNDE4M0M0O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbmEuYWJzZW50IHtcbiAgY29sb3I6ICNjYzAwMDA7XG59XG5cbmEuYW5jaG9yIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmctbGVmdDogMzBweDtcbiAgbWFyZ2luLWxlZnQ6IC0zMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG59XG5cbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYge1xuICBtYXJnaW46IDIwcHggMCAxMHB4O1xuICBwYWRkaW5nOiAwO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIGN1cnNvcjogdGV4dDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG5oMjpmaXJzdC1jaGlsZCwgaDE6Zmlyc3QtY2hpbGQsIGgxOmZpcnN0LWNoaWxkICsgaDIsIGgzOmZpcnN0LWNoaWxkLCBoNDpmaXJzdC1jaGlsZCwgaDU6Zmlyc3QtY2hpbGQsIGg2OmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgcGFkZGluZy10b3A6IDA7XG59XG5cbmgxOmhvdmVyIGEuYW5jaG9yLCBoMjpob3ZlciBhLmFuY2hvciwgaDM6aG92ZXIgYS5hbmNob3IsIGg0OmhvdmVyIGEuYW5jaG9yLCBoNTpob3ZlciBhLmFuY2hvciwgaDY6aG92ZXIgYS5hbmNob3Ige1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbmgxIHR0LCBoMSBjb2RlIHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xufVxuXG5oMiB0dCwgaDIgY29kZSB7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbn1cblxuaDMgdHQsIGgzIGNvZGUge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG59XG5cbmg0IHR0LCBoNCBjb2RlIHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xufVxuXG5oNSB0dCwgaDUgY29kZSB7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbn1cblxuaDYgdHQsIGg2IGNvZGUge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG59XG5cbmgxIHtcbiAgZm9udC1zaXplOiAyOHB4O1xuICBjb2xvcjogYmxhY2s7XG59XG5cbmgyIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjY2NjYztcbiAgY29sb3I6IGJsYWNrO1xufVxuXG5oMyB7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuaDQge1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbmg1IHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG5oNiB7XG4gIGNvbG9yOiAjNzc3Nzc3O1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbnAsIGJsb2NrcXVvdGUsIHVsLCBvbCwgZGwsIGxpLCB0YWJsZSwgcHJlIHtcbiAgbWFyZ2luOiAxNXB4IDA7XG59XG5cbmhyIHtcbiAgYm9yZGVyOiAwIG5vbmU7XG4gIGNvbG9yOiAjY2NjY2NjO1xuICBoZWlnaHQ6IDRweDtcbiAgcGFkZGluZzogMDtcbn1cblxuYm9keSA+IGgyOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgcGFkZGluZy10b3A6IDA7XG59XG5cbmJvZHkgPiBoMTpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIHBhZGRpbmctdG9wOiAwO1xufVxuXG5ib2R5ID4gaDE6Zmlyc3QtY2hpbGQgKyBoMiB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIHBhZGRpbmctdG9wOiAwO1xufVxuXG5ib2R5ID4gaDM6Zmlyc3QtY2hpbGQsIGJvZHkgPiBoNDpmaXJzdC1jaGlsZCwgYm9keSA+IGg1OmZpcnN0LWNoaWxkLCBib2R5ID4gaDY6Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4tdG9wOiAwO1xuICBwYWRkaW5nLXRvcDogMDtcbn1cblxuYTpmaXJzdC1jaGlsZCBoMSwgYTpmaXJzdC1jaGlsZCBoMiwgYTpmaXJzdC1jaGlsZCBoMywgYTpmaXJzdC1jaGlsZCBoNCwgYTpmaXJzdC1jaGlsZCBoNSwgYTpmaXJzdC1jaGlsZCBoNiB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIHBhZGRpbmctdG9wOiAwO1xufVxuXG5oMSBwLCBoMiBwLCBoMyBwLCBoNCBwLCBoNSBwLCBoNiBwIHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxubGkgcC5maXJzdCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxudWwsIG9sIHtcbiAgcGFkZGluZy1sZWZ0OiAzMHB4O1xufVxuXG51bCA6Zmlyc3QtY2hpbGQsIG9sIDpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG5cbnVsIDpsYXN0LWNoaWxkLCBvbCA6bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbmRsIHtcbiAgcGFkZGluZzogMDtcbn1cblxuZGwgZHQge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMTVweCAwIDVweDtcbn1cblxuZGwgZHQ6Zmlyc3QtY2hpbGQge1xuICBwYWRkaW5nOiAwO1xufVxuXG5kbCBkdCA+IDpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG5cbmRsIGR0ID4gOmxhc3QtY2hpbGQge1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG5kbCBkZCB7XG4gIG1hcmdpbjogMCAwIDE1cHg7XG4gIHBhZGRpbmc6IDAgMTVweDtcbn1cblxuZGwgZGQgPiA6Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4tdG9wOiAwO1xufVxuXG5kbCBkZCA+IDpsYXN0LWNoaWxkIHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuYmxvY2txdW90ZSB7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2RkZGRkZDtcbiAgcGFkZGluZzogMCAxNXB4O1xuICBjb2xvcjogIzc3Nzc3Nztcbn1cblxuYmxvY2txdW90ZSA+IDpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG5cbmJsb2NrcXVvdGUgPiA6bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbnRhYmxlIHtcbiAgcGFkZGluZzogMDtcbn1cbnRhYmxlIHRyIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2NjY2M7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbnRhYmxlIHRyOm50aC1jaGlsZCgybikge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xufVxuXG50YWJsZSB0ciB0aCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjY2NjO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDZweCAxM3B4O1xufVxuXG50YWJsZSB0ciB0ZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2NjY2M7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogNnB4IDEzcHg7XG59XG5cbnRhYmxlIHRyIHRoIDpmaXJzdC1jaGlsZCwgdGFibGUgdHIgdGQgOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxudGFibGUgdHIgdGggOmxhc3QtY2hpbGQsIHRhYmxlIHRyIHRkIDpsYXN0LWNoaWxkIHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuaW1nIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuXG5zcGFuLmZyYW1lIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbnNwYW4uZnJhbWUgPiBzcGFuIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZGRkZDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZsb2F0OiBsZWZ0O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW46IDEzcHggMCAwO1xuICBwYWRkaW5nOiA3cHg7XG4gIHdpZHRoOiBhdXRvO1xufVxuXG5zcGFuLmZyYW1lIHNwYW4gaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZsb2F0OiBsZWZ0O1xufVxuXG5zcGFuLmZyYW1lIHNwYW4gc3BhbiB7XG4gIGNsZWFyOiBib3RoO1xuICBjb2xvcjogIzMzMzMzMztcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDVweCAwIDA7XG59XG5cbnNwYW4uYWxpZ24tY2VudGVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGNsZWFyOiBib3RoO1xufVxuXG5zcGFuLmFsaWduLWNlbnRlciA+IHNwYW4ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luOiAxM3B4IGF1dG8gMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5zcGFuLmFsaWduLWNlbnRlciBzcGFuIGltZyB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbnNwYW4uYWxpZ24tcmlnaHQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY2xlYXI6IGJvdGg7XG59XG5cbnNwYW4uYWxpZ24tcmlnaHQgPiBzcGFuIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbjogMTNweCAwIDA7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG5zcGFuLmFsaWduLXJpZ2h0IHNwYW4gaW1nIHtcbiAgbWFyZ2luOiAwO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuc3Bhbi5mbG9hdC1sZWZ0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1yaWdodDogMTNweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5cbnNwYW4uZmxvYXQtbGVmdCBzcGFuIHtcbiAgbWFyZ2luOiAxM3B4IDAgMDtcbn1cblxuc3Bhbi5mbG9hdC1yaWdodCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tbGVmdDogMTNweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuXG5zcGFuLmZsb2F0LXJpZ2h0ID4gc3BhbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW46IDEzcHggYXV0byAwO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuY29kZSwgdHQge1xuICBtYXJnaW46IDAgMnB4O1xuICBwYWRkaW5nOiAwIDVweDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG5wcmUgY29kZSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgd2hpdGUtc3BhY2U6IHByZTtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuLmhpZ2hsaWdodCBwcmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOGY4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjY2NjO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGxpbmUtaGVpZ2h0OiAxOXB4O1xuICBvdmVyZmxvdzogYXV0bztcbiAgcGFkZGluZzogNnB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxucHJlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcbiAgZm9udC1zaXplOiAxM3B4O1xuICBsaW5lLWhlaWdodDogMTlweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHBhZGRpbmc6IDZweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG5cbnByZSBjb2RlLCBwcmUgdHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4vKiAtLS0tLSBtaW5lOiAqL1xuc2FtcCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2NjY2M7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAwIDJweDtcbn1cbiAgICA8L3N0eWxlPlxuICA8L2hlYWQ+XG48Ym9keT5gXG5cbmNvbnN0IGh0bWxFbmQgPSAoKSA9PiBgXG48L2JvZHk+XG48L2h0bWw+YFxuXG5jb25zdCBtYXJrZWRPcHRpb25zID0ge1xuICBzbWFydExpc3RzIDogdHJ1ZVxufVxuXG5jb25zdCByZWFkQnVja2V0RmlsZSA9IGFzeW5jKHsgcGF0aCwgcmVzLCBuZXh0IH0pID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBmaXJzdCwgY2hlY2sgaWYgZmlsZSBleGlzdHMuXG4gICAgY29uc3QgZmlsZSA9IGJ1Y2tldC5maWxlKHBhdGgpXG4gICAgY29uc3QgW2V4aXN0c10gPSBhd2FpdCBmaWxlLmV4aXN0cygpXG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgY29uc3QgcmVhZGVyID0gZmlsZS5jcmVhdGVSZWFkU3RyZWFtKClcbiAgICAgIHJlYWRlci5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoaWxlIHJlYWRpbmcgZmlsZTogJHtlcnJ9YClcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoYEVycm9yIHJlYWRpbmcgZmlsZSAnJHtwYXRofSc6ICR7ZXJyfWApLmVuZCgpXG4gICAgICB9KVxuXG4gICAgICAvLyBpcyB0aGUgZmlsZSBhbiBpbWFnZSB0eXBlP1xuICAgICAgY29uc3QgaW1hZ2VNYXRjaFJlc3VsdHMgPSBwYXRoLm1hdGNoKGNvbW1vbkltYWdlRmlsZXMpXG4gICAgICBpZiAocGF0aC5tYXRjaChjb21tb25JbWFnZUZpbGVzKSkge1xuICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnY29udGVudC10eXBlJyA6IGBpbWFnZS8ke2ltYWdlTWF0Y2hSZXN1bHRzWzFdLnRvTG93ZXJDYXNlKCl9YCB9KVxuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5lbmRzV2l0aCgnLm1kJykpIHtcbiAgICAgICAgbGV0IG1hcmtkb3duID0gJydcbiAgICAgICAgcmVhZGVyLm9uKCdkYXRhJywgKGQpID0+IHsgbWFya2Rvd24gKz0gZCB9KVxuICAgICAgICAgIC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnJlYWRjcnVtYnMgPSByZW5kZXJCcmVhZGNydW1icyhwYXRoKVxuICAgICAgICAgICAgcmVzLnNlbmQoYCR7aHRtbE9wZW4ocGF0aCl9XFxuXFxuJHticmVhZGNydW1ic31cXG5cXG4ke21hcmtlZChtYXJrZG93biwgbWFya2VkT3B0aW9ucyl9XFxuXFxuJHticmVhZGNydW1ic31cXG5cXG4ke2h0bWxFbmQoKX1gKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVhZGVyLnBpcGUocmVzKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHsgLy8gTm8gc3VjaCBmaWxlLCBzZW5kIDQwNFxuICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoYE5vIHN1Y2ggZmlsZTogJyR7cGF0aH0nYCkuZW5kKClcbiAgICB9XG4gIH1cbiAgY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoYENhdWdodCBleGNlcHRpb24gd2hpbGUgcHJvY2Vzc2luZyAnJHtwYXRofScuYClcbiAgICByZXMuc3RhdHVzKDUwMCkuc2VuZChgRXJyb3IgcmVhZGluZzogJHtwYXRofWApXG4gICAgcmV0dXJuIG5leHQoZXJyKSAvLyBmb3IgZXhwcmVzcyBlcnJvciBoYW5kbGluZ1xuICB9XG59XG5cbmNvbnN0IHN0YXJ0U2xhc2ggPSAvXlxcLy9cbmNvbnN0IGVuZFNsYXNoID0gL1xcLyQvXG5cbmNvbnN0IHJlbmRlckJyZWFkY3J1bWJzID0gKHBhdGgsIG9wdGlvbnMpID0+IHtcbiAgbGV0IG91dHB1dCA9ICcnXG4gIGlmICghcGF0aCB8fCBwYXRoID09PSAnJykgeyByZXR1cm4gb3V0cHV0IH1cblxuICBjb25zdCB7IGZvcm1hdCA9ICdodG1sJyB9ID0gb3B0aW9ucyB8fCB7fVxuXG4gIC8vIFdlIHJlbW92ZSB0aGUgZW5kIHNsYXNoIHRvIGF2b2lkIGFuIGVtcHR5IGFycmF5IGVsZW1lbnQuXG4gIGNvbnN0IHBhdGhCaXRzID0gcGF0aC5yZXBsYWNlKGVuZFNsYXNoLCAnJykuc3BsaXQoJy8nKVxuICAvLyBFYWNoIHBhdGggYml0IHJlcHJlc2VudHMgYSBzdGVwIGJhY2ssIGJ1dCB3ZSBzdGVwIGJhY2sgaW50byB0aGUgcHJpb3IgZWxlbWVudC4gRS5nLiwgaWYgd2Ugc2VlIHBhdGggXCJmb28vYmFyXCIsXG4gIC8vIHNvIHN0ZXBwaW5nIGJhY2sgb25lIHRha2VzIHVzIHRvIGZvbyBhbmQgc3RlcHBpbmcgYmFjayB0d28gdGFrZXMgdXMgdG8gdGhlIHJvb3QuIFNvIHdlIHVuc2hpZnQgYSByb290IGVsZW1lbnQgYW5kXG4gIC8vIHBvcCB0aGUgbGFzdCBlbGVtZW50IHRvIG1ha2UgZXZlcnl0aGluZyBtYXRjaCB1cC5cbiAgcGF0aEJpdHMudW5zaGlmdCgnJmx0O3Jvb3QmZ3Q7JylcbiAgcGF0aEJpdHMucG9wKClcbiAgY29uc3QgcGF0aEJpdHNMZW5ndGggPSBwYXRoQml0cy5sZW5ndGhcbiAgLy8gQnJlYWRjcnVtYnMgZm9yIGEgZmlsZSBlbmQgd2l0aCB0aGUgY3VycmVudCBkaXIgYW5kIHRoZW4gbW92ZSBiYWNrLiBGb3IgYSBkaXJlY3RvcnksIHlvdSdyZSBzdGVwcGluZyBiYWNrIGluIGVhY2hcbiAgLy8gaXRlcmF0aW9uLlxuICBjb25zdCBsaW5rQml0cyA9IHBhdGgubWF0Y2goZmlsZVJlZ2V4KVxuICAgID8gcGF0aEJpdHMubWFwKChiLCBpKSA9PiAoaSArIDEpID09PSBwYXRoQml0c0xlbmd0aFxuICAgICAgPyAnLidcbiAgICAgIDogQXJyYXkocGF0aEJpdHNMZW5ndGggLSAoaSArIDEpKS5maWxsKCcuLicpLmpvaW4oJy8nKVxuICAgIClcbiAgICA6IHBhdGhCaXRzLm1hcCgoYiwgaSkgPT4gQXJyYXkocGF0aEJpdHNMZW5ndGggLSBpKS5maWxsKCcuLicpLmpvaW4oJy8nKSlcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhCaXRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gJ21hcmtkb3duJykge1xuICAgICAgb3V0cHV0ICs9IGBbJHtwYXRoQml0c1tpXX0vXSgke2xpbmtCaXRzW2ldfSkgYFxuICAgIH1cbiAgICBlbHNlIHsgLy8gZGVmYXVsdCB0byBIVE1MXG4gICAgICBvdXRwdXQgKz0gYDxhIGhyZWY9XCIke2xpbmtCaXRzW2ldfVwiPiR7cGF0aEJpdHNbaV19LzwvYT4gYFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuY29uc3QgcmVuZGVyRmlsZXMgPSAoeyBwYXRoLCBmaWxlcywgZm9sZGVycywgcmVzIH0pID0+IHtcbiAgLy8gT3VyICdwYXRoJyBjb21lcyBpbiBmdWxsIHJlbGF0aXZlIGZyb20gdGhlIHJvb3QuIEhvd2V2ZXIsIHdlIHdhbnQgdG8gc2hvdyBvbmx5IHRoZSByZWxhdGl2ZSBiaXRzLlxuICBjb25zdCBkZXByZWZpeGVyID0gbmV3IFJlZ0V4cChgJHtwYXRofS8/YClcbiAgLy8gb3BlbiB1cCB3aXRoIHNvbWUgYm9pbGVycGxhY2UgSFRNTFxuICBsZXQgaHRtbCA9IGAke2h0bWxPcGVuKHBhdGgpfVxuICA8ZGl2IGlkPVwiYnJlYWRjcnVtYnNcIj5cbiAgICAke3JlbmRlckJyZWFkY3J1bWJzKHBhdGgpfVxuICA8L2Rpdj5cbiAgPGgxPiR7cGF0aH08L2gxPmBcblxuICBpZiAoZm9sZGVycy5sZW5ndGggPiAwKSB7XG4gICAgaHRtbCArPSBgXG4gIDxoMiBpZD1cImZvbGRlcnNcIj5Gb2xkZXJzPC9oMj5cbiAgICAke2ZvbGRlcnMubGVuZ3RofSB0b3RhbFxuICA8dWw+XFxuYFxuICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgY29uc3QgbG9jYWxSZWYgPSBmb2xkZXIucmVwbGFjZShkZXByZWZpeGVyLCAnJylcbiAgICAgIGh0bWwgKz0gYCAgICA8bGk+PGEgaHJlZj1cIiR7ZW5jb2RlVVJJQ29tcG9uZW50KGxvY2FsUmVmLnJlcGxhY2UoZW5kU2xhc2gsICcnKSl9L1wiPiR7bG9jYWxSZWZ9PC9hPjwvbGk+XFxuYFxuICAgIH0pXG5cbiAgICBodG1sICs9ICcgIDwvdWw+J1xuICB9XG5cbiAgaWYgKGZpbGVzICYmIGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICBodG1sICs9IGBcbiAgPGgyIGlkPVwiZmlsZXNcIj5GaWxlczwvaDI+XG4gICR7ZmlsZXMubGVuZ3RofSB0b3RhbFxuICA8dWw+XFxuYFxuXG4gICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIGNvbnN0IGxvY2FsUmVmID0gZmlsZS5uYW1lLnJlcGxhY2UoZGVwcmVmaXhlciwgJycpXG4gICAgICBodG1sICs9IGAgICAgPGxpPjxhIGhyZWY9XCIke2VuY29kZVVSSUNvbXBvbmVudChsb2NhbFJlZil9XCI+JHtsb2NhbFJlZn08L2E+PC9saT5cXG5gXG4gICAgfSlcblxuICAgIGh0bWwgKz0gJyAgPC91bD4nXG4gIH1cbiAgaHRtbCArPSBodG1sRW5kKClcblxuICByZXMuc2VuZChodG1sKS5lbmQoKVxufVxuXG5jb25zdCBpbmRleGVyUXVlcnlPcHRpb25zID0ge1xuICBkZWxpbWl0ZXIgICAgICAgICAgICAgICAgOiAnLycsXG4gIGluY2x1ZGVUcmFpbGluZ0RlbGltaXRlciA6IHRydWUsXG4gIGF1dG9QYWdpbmF0ZSAgICAgICAgICAgICA6IGZhbHNlIC8vID8/IG5lY2Vzc2FyeSB0byBzZWUgc3ViLWZvbGRlcnNcbn1cblxuY29uc3QgaW5kZXhCdWNrZXQgPSBhc3luYyh7IHBhdGgsIHJlcywgbmV4dCB9KSA9PiB7XG4gIHRyeSB7IC8vIFRPRE86IEkgdGhpbmsgbm93IHRoYXQgd2UgYXN5bmNIYW5kbGVyLCB3ZSBjYW4gZm9yZ28gZ2VuZXJpYyB0cnktY2F0Y2ggYmxvY2tzXG4gICAgLy8gV2UgZXhwZWN0IHRoZSByb290IHBhdGggdG8gYmUgJyc7IGFsbCBvdGhlcnMgc2hvdWxkIGVuZCB3aXRoIGEgJy8nXG4gICAgaWYgKHBhdGggIT09ICcnICYmICFwYXRoLm1hdGNoKGVuZFNsYXNoKSkge1xuICAgICAgcmVzLnJlZGlyZWN0KDMwMSwgYCR7cGF0aH0vYCkuZW5kKClcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleFBhdGggPSBgJHtwYXRofWluZGV4Lmh0bWxgXG4gICAgY29uc3QgZmlsZSA9IGJ1Y2tldC5maWxlKGluZGV4UGF0aClcbiAgICBjb25zdCBbZXhpc3RzXSA9IGF3YWl0IGZpbGUuZXhpc3RzKClcbiAgICBpZiAoZXhpc3RzKSB7XG4gICAgICByZXR1cm4gcmVhZEJ1Y2tldEZpbGUoeyBwYXRoIDogaW5kZXhQYXRoLCByZXMgfSlcbiAgICB9XG5cbiAgICBsZXQgZm9sZGVycyA9IFtdXG4gICAgY29uc3QgcXVlcnkgPSBPYmplY3QuYXNzaWduKHsgcHJlZml4IDogcGF0aCB9LCBpbmRleGVyUXVlcnlPcHRpb25zKVxuXG4gICAgLy8gT0ssIHRoZSBDbG91ZCBTdG9yYWdlIEFQSSAoYXMgb2YgdjUpIGlzIGZpbmlja3kgYW5kIHdpbGwgb25seSBzaG93IHlvdSBmaWxlcyBpbiB0aGUgJ2F3YWl0JyB2ZXJzaW9uLCBlLmcuOlxuICAgIC8vXG4gICAgLy8gY29uc3QgWyBmaWxlcyBdID0gYXdhaXQgYnVja2V0LmdldEZpbGVzKHF1ZXJ5KVxuICAgIC8vXG4gICAgLy8gSW4gb3JkZXIgdG8gZ2V0IHRoZSAnZm9sZGVycycsIHlvdSBoYXZlIHRvIGRvIHRvIHRoaW5nczpcbiAgICAvLyAxKSBJbmN1bGRlICdhdXRvUGFnaW5hdGUnIGluIHRoZSBxdWVyeSBhbmRcbiAgICAvLyAyKSBDYWxsIHVzaW5nIGEgY2FsbGJhY2sgbWV0aG9kLlxuICAgIC8vXG4gICAgLy8gSW4gdGhpcyBmb3JtLCB5b3UgZ2V0IHRvIHNlZSB0aGUgQVBJIHJlc3BvbnNlLCB3aGljaCBhbGxvd3MgeW91IHRvIGxvb2sgYXQgdGhlICdwcmVmaXhlcycgd2l0aGluIHRoZSBjdXJyZW50IHNlYXJjaFxuICAgIC8vIHByZWZpeC4gVGhlc2UgY2FuIGJlIG1hcHBlZCB0byBsb2dpY2FsIHN1Yi1mb2xkZXJzIGluIG91ciBidWNrZXQgc2NoZW1lLlxuICAgIGNvbnN0IGluZGV4UGFnZXIgPSAoZXJyLCBmaWxlcywgbmV4dFF1ZXJ5LCBhcGlSZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXMuc2V0U3RhdHVzKDUwMCkuc2VuZChgRXJyb3Igd2hpbGUgcHJvY2Vzc2luZyByZXN1bHRzOiAke2Vycn1gKS5lbmQoKVxuICAgICAgfVxuICAgICAgLy8gYWxsIGdvb2QhXG4gICAgICBpZiAoYXBpUmVzcG9uc2UucHJlZml4ZXMgJiYgYXBpUmVzcG9uc2UucHJlZml4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb2xkZXJzID0gZm9sZGVycy5jb25jYXQoYXBpUmVzcG9uc2UucHJlZml4ZXMpXG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0UXVlcnkpIHtcbiAgICAgICAgYnVja2V0LmdldEZpbGVzKG5leHRRdWVyeSwgaW5kZXhQYWdlcilcbiAgICAgIH1cbiAgICAgIGVsc2UgeyAvLyB3ZSd2ZSBidWlsdCB1cCBhbGwgdGhlIGZvbGRlcnNcbiAgICAgICAgLy8gSWYgdGhlcmUncyBub3RoaW5nIGhlcmUsIHRyZWF0IGFzIDQwNFxuICAgICAgICBpZiAoKCFmaWxlcyB8fCBmaWxlcy5sZW5ndGggPT09IDApICYmIGZvbGRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoYE5vIHN1Y2ggZm9sZGVyOiAnJHtwYXRofSdgKS5lbmQoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlbmRlckZpbGVzKHsgcGF0aCwgZmlsZXMsIGZvbGRlcnMsIHJlcyB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaGVyZSdzIHdoZXJlIHdlIGFjdHVhbGx5IGtpY2sgZXZlcnl0aGluZyBvZmYgYnkgZG9pbmcgdGhlIHNlYXJjaC5cbiAgICBidWNrZXQuZ2V0RmlsZXMocXVlcnksIGluZGV4UGFnZXIpXG4gIH0gLy8gdHJ5XG4gIGNhdGNoIChlKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoYEV4cGxvc2lvbiEgJHtlfWApXG4gICAgcmV0dXJuIG5leHQoZSkgLy8gZm9yIGV4cHJlc3MgZXJyb3IgaGFuZGxpbmdcbiAgfVxufVxuXG4vL1xuXG4vLyByZXF1ZXN0IHByb2Nlc3Npbmcgc2V0dXBcblxuLy8gYXN5bmMgYmVjYXVzZSBvdXIgaGFuZHNlcnMgYXJlIGFzeW5jXG5jb25zdCBjb21tb25Qcm9jZXNzb3IgPSAocmVuZGVyKSA9PiBhc3luYyhyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAvLyBsZXQgdXNlckVtYWlsID0gbnVsbFxuICB0cnkge1xuICAgIC8vIGNvbnN0IHRpY2tldCA9IGF3YWl0IGFjY2Vzc0xpYi52ZXJpZnlUb2tlbihyZXEpXG4gICAgYXdhaXQgYWNjZXNzTGliLnZlcmlmeVRva2VuKHJlcSlcbiAgICAvLyB1c2VyRW1haWwgPSB0aWNrZXQucGF5bG9hZC5lbWFpbFxuICAgIC8vIGNvbnNvbGUubG9nKGBSZXF1ZXN0aW5nIHVzZXI6ICR7dXNlckVtYWlsfWApXG4gIH1cbiAgY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGBFeGNlcHRpb24gd2hpbGUgdmVyaWZ5aW5nIGFjY2VzczogJHtlfWApXG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoYFJlcXVlc3QgYXV0aG9yaXphdGlvbiB0b2tlbiBjb3VsZCBub3QgYmUgdmVyaWZpZWQuXFxuJHtlfWApXG4gICAgcmV0dXJuIG5leHQoZSlcbiAgfVxuXG4gIC8vIENsb3VkIHN0b3JhZ2UgZG9lc24ndCBsaWtlIGFuIGluaXRpYWwgJy8nLCBzbyB3ZSByZW1vdmUgYW55LlxuICBjb25zdCBwYXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KHJlcS5wYXRoLnJlcGxhY2Uoc3RhcnRTbGFzaCwgJycpKVxuXG4gIHJlcy5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgY29uc29sZS5lcnJvcihgRXJyb3IgaW4gdGhlIHJlc3BvbnNlIG91dHB1dCBzdHJlYW06ICR7ZXJyfWApXG4gIH0pXG5cbiAgdHJ5IHtcbiAgICByZW5kZXIoeyBwYXRoLCByZXMsIG5leHQgfSlcbiAgfVxuICBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoYEV4Y2VwdGlvbiB3aGlsZSByZW5kZXJpbmc6ICR7ZX1gKVxuICAgIHJlcy5zdGF0dXMoNTAwKS5zZW5kKGBFeGNlcHRpb24gZW5jb3VudGVyZWQgd2hpbGUgcmVuZGVyaW5nIHJlc3VsdDogJHtlfWApXG4gICAgcmV0dXJuIG5leHQoZSlcbiAgfVxufVxuXG5hcHAuZ2V0KGZpbGVSZWdleCwgYXN5bmNIYW5kbGVyKGNvbW1vblByb2Nlc3NvcihyZWFkQnVja2V0RmlsZSkpKVxuLy8gaWYgaXQncyBub3QgYSBmaWxlLCBtYXliZSBpdCdzIGEgYnVja2V0LlxuYXBwLmdldCgnKicsIGFzeW5jSGFuZGxlcihjb21tb25Qcm9jZXNzb3IoaW5kZXhCdWNrZXQpKSlcblxuLy8gc3RhcnQgdGhlIHNlcnZlclxuYXBwLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBBcHAgbGlzdGVuaW5nIG9uIHBvcnQgJHtQT1JUfWApXG4gIGNvbnNvbGUubG9nKCdQcmVzcyBDdHJsK0MgdG8gcXVpdC4nKVxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXBwXG4iXSwibmFtZXMiOlsidW5kZWZpbmVkIiwicmVxdWlyZSQkMCIsInNldHVwQWNjZXNzTGliIiwicHJvamVjdElkIiwicHJvamVjdE51bWJlciIsImV4cGVjdGVkQXVkaWVuY2UiLCJFcnJvciIsInZlcmlmeVRva2VuIiwicmVxIiwiaWFwSnd0IiwiaGVhZGVycyIsIm9BdXRoMkNsaWVudCIsIk9BdXRoMkNsaWVudCIsImdldElhcFB1YmxpY0tleXMiLCJyZXNwb25zZSIsInZlcmlmeVNpZ25lZEp3dFdpdGhDZXJ0c0FzeW5jIiwicHVia2V5cyIsInRpY2tldCIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xPVURfUFJPSkVDVCIsImNvbnNvbGUiLCJsb2ciLCJpc0F2YWlsYWJsZSIsImdjcE1ldGFkYXRhIiwicHJvamVjdCIsImFjY2Vzc0xpYiIsInN0b3JhZ2UiLCJTdG9yYWdlIiwiYnVja2V0SWQiLCJCVUNLRVQiLCJidWNrZXQiLCJhcHAiLCJleHByZXNzIiwic2V0IiwiUE9SVCIsImZpbGVSZWdleCIsImNvbW1vbkltYWdlRmlsZXMiLCJodG1sT3BlbiIsInBhdGgiLCJodG1sRW5kIiwibWFya2VkT3B0aW9ucyIsInNtYXJ0TGlzdHMiLCJyZWFkQnVja2V0RmlsZSIsInJlcyIsIm5leHQiLCJmaWxlIiwiZXhpc3RzIiwicmVhZGVyIiwiY3JlYXRlUmVhZFN0cmVhbSIsIm9uIiwiZXJyIiwiZXJyb3IiLCJzdGF0dXMiLCJzZW5kIiwiZW5kIiwiaW1hZ2VNYXRjaFJlc3VsdHMiLCJtYXRjaCIsIndyaXRlSGVhZCIsInRvTG93ZXJDYXNlIiwiZW5kc1dpdGgiLCJtYXJrZG93biIsImQiLCJicmVhZGNydW1icyIsInJlbmRlckJyZWFkY3J1bWJzIiwibWFya2VkIiwicGlwZSIsInN0YXJ0U2xhc2giLCJlbmRTbGFzaCIsIm9wdGlvbnMiLCJvdXRwdXQiLCJmb3JtYXQiLCJwYXRoQml0cyIsInJlcGxhY2UiLCJzcGxpdCIsInVuc2hpZnQiLCJwb3AiLCJwYXRoQml0c0xlbmd0aCIsImxlbmd0aCIsImxpbmtCaXRzIiwibWFwIiwiYiIsImkiLCJBcnJheSIsImZpbGwiLCJqb2luIiwicmVuZGVyRmlsZXMiLCJmaWxlcyIsImZvbGRlcnMiLCJkZXByZWZpeGVyIiwiUmVnRXhwIiwiaHRtbCIsImZvckVhY2giLCJmb2xkZXIiLCJsb2NhbFJlZiIsImVuY29kZVVSSUNvbXBvbmVudCIsIm5hbWUiLCJpbmRleGVyUXVlcnlPcHRpb25zIiwiZGVsaW1pdGVyIiwiaW5jbHVkZVRyYWlsaW5nRGVsaW1pdGVyIiwiYXV0b1BhZ2luYXRlIiwiaW5kZXhCdWNrZXQiLCJyZWRpcmVjdCIsImluZGV4UGF0aCIsInF1ZXJ5IiwiT2JqZWN0IiwiYXNzaWduIiwicHJlZml4IiwiaW5kZXhQYWdlciIsIm5leHRRdWVyeSIsImFwaVJlc3BvbnNlIiwic2V0U3RhdHVzIiwicHJlZml4ZXMiLCJjb25jYXQiLCJnZXRGaWxlcyIsImNvbW1vblByb2Nlc3NvciIsInJlbmRlciIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldCIsImFzeW5jSGFuZGxlciIsImxpc3RlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFO0FBQzlCLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3JDLENBQUM7QUFDRDtBQUNBLGNBQWMsR0FBRyxlQUFlLENBQUM7QUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLHlCQUF5QixHQUFHLElBQUk7Ozs7OztBQ0w1RSxTQUFTLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7QUFDdkMsRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDM0c7QUFDQSxFQUFFLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxPQUFPO0FBQ3pCLEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ2pCO0FBQ0EsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDYjtBQUNBLEVBQUUsSUFBSTtBQUNOLElBQUksS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRTtBQUN0RSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCO0FBQ0EsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxNQUFNO0FBQ3hDLEtBQUs7QUFDTCxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUU7QUFDaEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2QsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQ2IsR0FBRyxTQUFTO0FBQ1osSUFBSSxJQUFJO0FBQ1IsTUFBTSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7QUFDdEQsS0FBSyxTQUFTO0FBQ2QsTUFBTSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUN2QixLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDRDtBQUNBLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQztBQUN2QyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUseUJBQXlCLEdBQUcsSUFBSTs7Ozs7O0FDL0I1RSxTQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDckMsRUFBRSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDeEQ7QUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQixHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNEO0FBQ0EsY0FBYyxHQUFHLGlCQUFpQixDQUFDO0FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsR0FBRyxJQUFJOzs7Ozs7QUNUNUUsU0FBUywyQkFBMkIsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQ2hELEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPO0FBQ2pCLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUUsT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDaEUsRUFBRSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELEVBQUUsSUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQzlELEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUUsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELEVBQUUsSUFBSSxDQUFDLEtBQUssV0FBVyxJQUFJLDBDQUEwQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLGdCQUFnQixDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsSCxDQUFDO0FBQ0Q7QUFDQSxjQUFjLEdBQUcsMkJBQTJCLENBQUM7QUFDN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLHlCQUF5QixHQUFHLElBQUk7Ozs7OztBQ1o1RSxTQUFTLGdCQUFnQixHQUFHO0FBQzVCLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQywySUFBMkksQ0FBQyxDQUFDO0FBQ25LLENBQUM7QUFDRDtBQUNBLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUseUJBQXlCLEdBQUcsSUFBSTs7Ozs7O0FDRzVFLFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7QUFDaEMsRUFBRSxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksMEJBQTBCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLGVBQWUsRUFBRSxDQUFDO0FBQ3hILENBQUM7QUFDRDtBQUNBLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLHlCQUF5QixHQUFHLElBQUk7Ozs7OztBQ2I1RSxTQUFTLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMzRSxFQUFFLElBQUk7QUFDTixJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixJQUFJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDM0IsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ2xCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xCLElBQUksT0FBTztBQUNYLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25CLEdBQUcsTUFBTTtBQUNULElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxTQUFTLGlCQUFpQixDQUFDLEVBQUUsRUFBRTtBQUMvQixFQUFFLE9BQU8sWUFBWTtBQUNyQixJQUFJLElBQUksSUFBSSxHQUFHLElBQUk7QUFDbkIsUUFBUSxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDbEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyQztBQUNBLE1BQU0sU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQzVCLFFBQVEsa0JBQWtCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDL0UsT0FBTztBQUNQO0FBQ0EsTUFBTSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDM0IsUUFBUSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM5RSxPQUFPO0FBQ1A7QUFDQSxNQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QixLQUFLLENBQUMsQ0FBQztBQUNQLEdBQUcsQ0FBQztBQUNKLENBQUM7QUFDRDtBQUNBLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztBQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUseUJBQXlCLEdBQUcsSUFBSTs7Ozs7O0FDckM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxJQUFJLFVBQVUsT0FBTyxFQUFFO0FBRWxDO0FBQ0EsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQzVCLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztBQUNqQyxFQUFFLElBQUlBLFdBQVMsQ0FBQztBQUNoQixFQUFFLElBQUksT0FBTyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzNELEVBQUUsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUM7QUFDeEQsRUFBRSxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksaUJBQWlCLENBQUM7QUFDdkUsRUFBRSxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksZUFBZSxDQUFDO0FBQ2pFO0FBQ0EsRUFBRSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNuQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNwQyxNQUFNLEtBQUssRUFBRSxLQUFLO0FBQ2xCLE1BQU0sVUFBVSxFQUFFLElBQUk7QUFDdEIsTUFBTSxZQUFZLEVBQUUsSUFBSTtBQUN4QixNQUFNLFFBQVEsRUFBRSxJQUFJO0FBQ3BCLEtBQUssQ0FBQyxDQUFDO0FBQ1AsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixHQUFHO0FBQ0gsRUFBRSxJQUFJO0FBQ047QUFDQSxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkIsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ2hCLElBQUksTUFBTSxHQUFHLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDdkMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDOUIsS0FBSyxDQUFDO0FBQ04sR0FBRztBQUNIO0FBQ0EsRUFBRSxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7QUFDckQ7QUFDQSxJQUFJLElBQUksY0FBYyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxZQUFZLFNBQVMsR0FBRyxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ2pHLElBQUksSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUQsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSxTQUFTLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakU7QUFDQSxJQUFJLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLEdBQUc7QUFDSCxFQUFFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLFNBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ2xDLElBQUksSUFBSTtBQUNSLE1BQU0sT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDeEQsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ2xCLE1BQU0sT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3pDLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUM7QUFDaEQsRUFBRSxJQUFJLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDO0FBQ2hELEVBQUUsSUFBSSxpQkFBaUIsR0FBRyxXQUFXLENBQUM7QUFDdEMsRUFBRSxJQUFJLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxFQUFFLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLFNBQVMsU0FBUyxHQUFHLEVBQUU7QUFDekIsRUFBRSxTQUFTLGlCQUFpQixHQUFHLEVBQUU7QUFDakMsRUFBRSxTQUFTLDBCQUEwQixHQUFHLEVBQUU7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUM3QixFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsWUFBWTtBQUN4RCxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxDQUFDO0FBQ0w7QUFDQSxFQUFFLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDdkMsRUFBRSxJQUFJLHVCQUF1QixHQUFHLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0UsRUFBRSxJQUFJLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QixLQUFLLEVBQUU7QUFDcEMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLGNBQWMsQ0FBQyxFQUFFO0FBQzVEO0FBQ0E7QUFDQSxJQUFJLGlCQUFpQixHQUFHLHVCQUF1QixDQUFDO0FBQ2hELEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxFQUFFLEdBQUcsMEJBQTBCLENBQUMsU0FBUztBQUMvQyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNELEVBQUUsaUJBQWlCLENBQUMsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0FBQzNELEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUN4RCxFQUFFLE1BQU0sQ0FBQywwQkFBMEIsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUN2RSxFQUFFLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxNQUFNO0FBQ3hDLElBQUksMEJBQTBCO0FBQzlCLElBQUksaUJBQWlCO0FBQ3JCLElBQUksbUJBQW1CO0FBQ3ZCLEdBQUcsQ0FBQztBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUUsU0FBUyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUU7QUFDNUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsTUFBTSxFQUFFO0FBQ3pELE1BQU0sTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxHQUFHLEVBQUU7QUFDOUMsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3pDLE9BQU8sQ0FBQyxDQUFDO0FBQ1QsS0FBSyxDQUFDLENBQUM7QUFDUCxHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLE1BQU0sRUFBRTtBQUNqRCxJQUFJLElBQUksSUFBSSxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ2xFLElBQUksT0FBTyxJQUFJO0FBQ2YsUUFBUSxJQUFJLEtBQUssaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxNQUFNLG1CQUFtQjtBQUMvRCxRQUFRLEtBQUssQ0FBQztBQUNkLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsTUFBTSxFQUFFO0FBQ2xDLElBQUksSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQy9CLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUNoRSxLQUFLLE1BQU07QUFDWCxNQUFNLE1BQU0sQ0FBQyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7QUFDcEQsTUFBTSxNQUFNLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDN0QsS0FBSztBQUNMLElBQUksTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLElBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIsR0FBRyxDQUFDO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsRUFBRTtBQUNoQyxJQUFJLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDNUIsR0FBRyxDQUFDO0FBQ0o7QUFDQSxFQUFFLFNBQVMsYUFBYSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUU7QUFDakQsSUFBSSxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDbEQsTUFBTSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMvRCxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7QUFDbkMsUUFBUSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLE9BQU8sTUFBTTtBQUNiLFFBQVEsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNoQyxRQUFRLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDakMsUUFBUSxJQUFJLEtBQUs7QUFDakIsWUFBWSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQ3JDLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQUU7QUFDM0MsVUFBVSxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRTtBQUN6RSxZQUFZLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNuRCxXQUFXLEVBQUUsU0FBUyxHQUFHLEVBQUU7QUFDM0IsWUFBWSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEQsV0FBVyxDQUFDLENBQUM7QUFDYixTQUFTO0FBQ1Q7QUFDQSxRQUFRLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxTQUFTLEVBQUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsVUFBVSxNQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztBQUNuQyxVQUFVLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQixTQUFTLEVBQUUsU0FBUyxLQUFLLEVBQUU7QUFDM0I7QUFDQTtBQUNBLFVBQVUsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDekQsU0FBUyxDQUFDLENBQUM7QUFDWCxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLGVBQWUsQ0FBQztBQUN4QjtBQUNBLElBQUksU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUNsQyxNQUFNLFNBQVMsMEJBQTBCLEdBQUc7QUFDNUMsUUFBUSxPQUFPLElBQUksV0FBVyxDQUFDLFNBQVMsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUN6RCxVQUFVLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvQyxTQUFTLENBQUMsQ0FBQztBQUNYLE9BQU87QUFDUDtBQUNBLE1BQU0sT0FBTyxlQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZUFBZSxHQUFHLGVBQWUsQ0FBQyxJQUFJO0FBQzlDLFVBQVUsMEJBQTBCO0FBQ3BDO0FBQ0E7QUFDQSxVQUFVLDBCQUEwQjtBQUNwQyxTQUFTLEdBQUcsMEJBQTBCLEVBQUUsQ0FBQztBQUN6QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUMzQixHQUFHO0FBQ0g7QUFDQSxFQUFFLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqRCxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLG1CQUFtQixFQUFFLFlBQVk7QUFDbkUsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixHQUFHLENBQUMsQ0FBQztBQUNMLEVBQUUsT0FBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBUyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO0FBQzdFLElBQUksSUFBSSxXQUFXLEtBQUssS0FBSyxDQUFDLEVBQUUsV0FBVyxHQUFHLE9BQU8sQ0FBQztBQUN0RDtBQUNBLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFhO0FBQ2hDLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQztBQUMvQyxNQUFNLFdBQVc7QUFDakIsS0FBSyxDQUFDO0FBQ047QUFDQSxJQUFJLE9BQU8sT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztBQUMvQyxRQUFRLElBQUk7QUFDWixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxNQUFNLEVBQUU7QUFDMUMsVUFBVSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDMUQsU0FBUyxDQUFDLENBQUM7QUFDWCxHQUFHLENBQUM7QUFDSjtBQUNBLEVBQUUsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNwRCxJQUFJLElBQUksS0FBSyxHQUFHLHNCQUFzQixDQUFDO0FBQ3ZDO0FBQ0EsSUFBSSxPQUFPLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7QUFDeEMsTUFBTSxJQUFJLEtBQUssS0FBSyxpQkFBaUIsRUFBRTtBQUN2QyxRQUFRLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN4RCxPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksS0FBSyxLQUFLLGlCQUFpQixFQUFFO0FBQ3ZDLFFBQVEsSUFBSSxNQUFNLEtBQUssT0FBTyxFQUFFO0FBQ2hDLFVBQVUsTUFBTSxHQUFHLENBQUM7QUFDcEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFFBQVEsT0FBTyxVQUFVLEVBQUUsQ0FBQztBQUM1QixPQUFPO0FBQ1A7QUFDQSxNQUFNLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQzlCLE1BQU0sT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDeEI7QUFDQSxNQUFNLE9BQU8sSUFBSSxFQUFFO0FBQ25CLFFBQVEsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUN4QyxRQUFRLElBQUksUUFBUSxFQUFFO0FBQ3RCLFVBQVUsSUFBSSxjQUFjLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RFLFVBQVUsSUFBSSxjQUFjLEVBQUU7QUFDOUIsWUFBWSxJQUFJLGNBQWMsS0FBSyxnQkFBZ0IsRUFBRSxTQUFTO0FBQzlELFlBQVksT0FBTyxjQUFjLENBQUM7QUFDbEMsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtBQUN2QztBQUNBO0FBQ0EsVUFBVSxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNyRDtBQUNBLFNBQVMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO0FBQy9DLFVBQVUsSUFBSSxLQUFLLEtBQUssc0JBQXNCLEVBQUU7QUFDaEQsWUFBWSxLQUFLLEdBQUcsaUJBQWlCLENBQUM7QUFDdEMsWUFBWSxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDOUIsV0FBVztBQUNYO0FBQ0EsVUFBVSxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pEO0FBQ0EsU0FBUyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDaEQsVUFBVSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEQsU0FBUztBQUNUO0FBQ0EsUUFBUSxLQUFLLEdBQUcsaUJBQWlCLENBQUM7QUFDbEM7QUFDQSxRQUFRLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RELFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUN0QztBQUNBO0FBQ0EsVUFBVSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUk7QUFDOUIsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxzQkFBc0IsQ0FBQztBQUNyQztBQUNBLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLGdCQUFnQixFQUFFO0FBQy9DLFlBQVksU0FBUztBQUNyQixXQUFXO0FBQ1g7QUFDQSxVQUFVLE9BQU87QUFDakIsWUFBWSxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUc7QUFDN0IsWUFBWSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7QUFDOUIsV0FBVyxDQUFDO0FBQ1o7QUFDQSxTQUFTLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUM1QyxVQUFVLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztBQUNwQztBQUNBO0FBQ0EsVUFBVSxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUNuQyxVQUFVLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNuQyxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUssQ0FBQztBQUNOLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxTQUFTLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDbEQsSUFBSSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRCxJQUFJLElBQUksTUFBTSxLQUFLQSxXQUFTLEVBQUU7QUFDOUI7QUFDQTtBQUNBLE1BQU0sT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDOUI7QUFDQSxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7QUFDdEM7QUFDQSxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN6QztBQUNBO0FBQ0EsVUFBVSxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztBQUNwQyxVQUFVLE9BQU8sQ0FBQyxHQUFHLEdBQUdBLFdBQVMsQ0FBQztBQUNsQyxVQUFVLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRDtBQUNBLFVBQVUsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtBQUMxQztBQUNBO0FBQ0EsWUFBWSxPQUFPLGdCQUFnQixDQUFDO0FBQ3BDLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQSxRQUFRLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQ2pDLFFBQVEsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLFNBQVM7QUFDbkMsVUFBVSxnREFBZ0QsQ0FBQyxDQUFDO0FBQzVELE9BQU87QUFDUDtBQUNBLE1BQU0sT0FBTyxnQkFBZ0IsQ0FBQztBQUM5QixLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEU7QUFDQSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7QUFDakMsTUFBTSxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUMvQixNQUFNLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUMvQixNQUFNLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzlCLE1BQU0sT0FBTyxnQkFBZ0IsQ0FBQztBQUM5QixLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDMUI7QUFDQSxJQUFJLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDaEIsTUFBTSxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUMvQixNQUFNLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUN0RSxNQUFNLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzlCLE1BQU0sT0FBTyxnQkFBZ0IsQ0FBQztBQUM5QixLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtBQUNuQjtBQUNBO0FBQ0EsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDaEQ7QUFDQTtBQUNBLE1BQU0sT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO0FBQ3ZDLFFBQVEsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDaEMsUUFBUSxPQUFPLENBQUMsR0FBRyxHQUFHQSxXQUFTLENBQUM7QUFDaEMsT0FBTztBQUNQO0FBQ0EsS0FBSyxNQUFNO0FBQ1g7QUFDQSxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ2xCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzVCLElBQUksT0FBTyxnQkFBZ0IsQ0FBQztBQUM1QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRSxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM1QjtBQUNBLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLFdBQVc7QUFDeEMsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxXQUFXO0FBQ3BDLElBQUksT0FBTyxvQkFBb0IsQ0FBQztBQUNoQyxHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUU7QUFDOUIsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwQztBQUNBLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO0FBQ25CLE1BQU0sS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0IsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDbkIsTUFBTSxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxNQUFNLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CLEtBQUs7QUFDTDtBQUNBLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEMsR0FBRztBQUNIO0FBQ0EsRUFBRSxTQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztBQUN4QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQzNCLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ3RCLElBQUksS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFDOUIsR0FBRztBQUNIO0FBQ0EsRUFBRSxTQUFTLE9BQU8sQ0FBQyxXQUFXLEVBQUU7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxNQUFNLEVBQUU7QUFDbEMsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDbEIsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUM1QixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsS0FBSztBQUNMLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxTQUFTLElBQUksR0FBRztBQUMzQixNQUFNLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUMxQixRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM3QixRQUFRLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUMzQixVQUFVLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQzNCLFVBQVUsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDNUIsVUFBVSxPQUFPLElBQUksQ0FBQztBQUN0QixTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN2QixNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ2xCLEtBQUssQ0FBQztBQUNOLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxTQUFTLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDNUIsSUFBSSxJQUFJLFFBQVEsRUFBRTtBQUNsQixNQUFNLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwRCxNQUFNLElBQUksY0FBYyxFQUFFO0FBQzFCLFFBQVEsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdDLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxPQUFPLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO0FBQy9DLFFBQVEsT0FBTyxRQUFRLENBQUM7QUFDeEIsT0FBTztBQUNQO0FBQ0EsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNuQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxTQUFTLElBQUksR0FBRztBQUMzQyxVQUFVLE9BQU8sRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUN4QyxZQUFZLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDMUMsY0FBYyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxjQUFjLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2hDLGNBQWMsT0FBTyxJQUFJLENBQUM7QUFDMUIsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBLFVBQVUsSUFBSSxDQUFDLEtBQUssR0FBR0EsV0FBUyxDQUFDO0FBQ2pDLFVBQVUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDM0I7QUFDQSxVQUFVLE9BQU8sSUFBSSxDQUFDO0FBQ3RCLFNBQVMsQ0FBQztBQUNWO0FBQ0EsUUFBUSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztBQUNoQyxHQUFHO0FBQ0gsRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUMxQjtBQUNBLEVBQUUsU0FBUyxVQUFVLEdBQUc7QUFDeEIsSUFBSSxPQUFPLEVBQUUsS0FBSyxFQUFFQSxXQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQzVDLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxDQUFDLFNBQVMsR0FBRztBQUN0QixJQUFJLFdBQVcsRUFBRSxPQUFPO0FBQ3hCO0FBQ0EsSUFBSSxLQUFLLEVBQUUsU0FBUyxhQUFhLEVBQUU7QUFDbkMsTUFBTSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNwQixNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCO0FBQ0E7QUFDQSxNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBR0EsV0FBUyxDQUFDO0FBQ3pDLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDeEIsTUFBTSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUMzQjtBQUNBLE1BQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDM0IsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHQSxXQUFTLENBQUM7QUFDM0I7QUFDQSxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzdDO0FBQ0EsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQzFCLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDL0I7QUFDQSxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO0FBQ3BDLGNBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0FBQ3JDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdEMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUdBLFdBQVMsQ0FBQztBQUNuQyxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksRUFBRSxXQUFXO0FBQ3JCLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDdkI7QUFDQSxNQUFNLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsTUFBTSxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQzVDLE1BQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUN2QyxRQUFRLE1BQU0sVUFBVSxDQUFDLEdBQUcsQ0FBQztBQUM3QixPQUFPO0FBQ1A7QUFDQSxNQUFNLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztBQUN2QixLQUFLO0FBQ0w7QUFDQSxJQUFJLGlCQUFpQixFQUFFLFNBQVMsU0FBUyxFQUFFO0FBQzNDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ3JCLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFDeEIsT0FBTztBQUNQO0FBQ0EsTUFBTSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDekIsTUFBTSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ25DLFFBQVEsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7QUFDOUIsUUFBUSxNQUFNLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztBQUMvQixRQUFRLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQzNCO0FBQ0EsUUFBUSxJQUFJLE1BQU0sRUFBRTtBQUNwQjtBQUNBO0FBQ0EsVUFBVSxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNsQyxVQUFVLE9BQU8sQ0FBQyxHQUFHLEdBQUdBLFdBQVMsQ0FBQztBQUNsQyxTQUFTO0FBQ1Q7QUFDQSxRQUFRLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQztBQUN6QixPQUFPO0FBQ1A7QUFDQSxNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDNUQsUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLFFBQVEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztBQUN0QztBQUNBLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtBQUNyQztBQUNBO0FBQ0E7QUFDQSxVQUFVLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLFNBQVM7QUFDVDtBQUNBLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDdkMsVUFBVSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RCxVQUFVLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzVEO0FBQ0EsVUFBVSxJQUFJLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDdEMsWUFBWSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUM1QyxjQUFjLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbEQsYUFBYSxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFO0FBQ3JELGNBQWMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLGFBQWE7QUFDYjtBQUNBLFdBQVcsTUFBTSxJQUFJLFFBQVEsRUFBRTtBQUMvQixZQUFZLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQzVDLGNBQWMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsRCxhQUFhO0FBQ2I7QUFDQSxXQUFXLE1BQU0sSUFBSSxVQUFVLEVBQUU7QUFDakMsWUFBWSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRTtBQUM5QyxjQUFjLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QyxhQUFhO0FBQ2I7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7QUFDdEUsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsSUFBSSxNQUFNLEVBQUUsU0FBUyxJQUFJLEVBQUUsR0FBRyxFQUFFO0FBQ2hDLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUM1RCxRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkMsUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUk7QUFDckMsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUM7QUFDNUMsWUFBWSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDMUMsVUFBVSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDbkMsVUFBVSxNQUFNO0FBQ2hCLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksWUFBWTtBQUN0QixXQUFXLElBQUksS0FBSyxPQUFPO0FBQzNCLFdBQVcsSUFBSSxLQUFLLFVBQVUsQ0FBQztBQUMvQixVQUFVLFlBQVksQ0FBQyxNQUFNLElBQUksR0FBRztBQUNwQyxVQUFVLEdBQUcsSUFBSSxZQUFZLENBQUMsVUFBVSxFQUFFO0FBQzFDO0FBQ0E7QUFDQSxRQUFRLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDNUIsT0FBTztBQUNQO0FBQ0EsTUFBTSxJQUFJLE1BQU0sR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDL0QsTUFBTSxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN6QixNQUFNLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ3ZCO0FBQ0EsTUFBTSxJQUFJLFlBQVksRUFBRTtBQUN4QixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQzdCLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO0FBQzVDLFFBQVEsT0FBTyxnQkFBZ0IsQ0FBQztBQUNoQyxPQUFPO0FBQ1A7QUFDQSxNQUFNLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuQyxLQUFLO0FBQ0w7QUFDQSxJQUFJLFFBQVEsRUFBRSxTQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDekMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQ25DLFFBQVEsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ3pCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU87QUFDakMsVUFBVSxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUN0QyxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUMvQixPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUMzQyxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQzFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7QUFDL0IsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUMxQixPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxRQUFRLEVBQUU7QUFDdkQsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUM3QixPQUFPO0FBQ1A7QUFDQSxNQUFNLE9BQU8sZ0JBQWdCLENBQUM7QUFDOUIsS0FBSztBQUNMO0FBQ0EsSUFBSSxNQUFNLEVBQUUsU0FBUyxVQUFVLEVBQUU7QUFDakMsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQzVELFFBQVEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxRQUFRLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7QUFDN0MsVUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFELFVBQVUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLFVBQVUsT0FBTyxnQkFBZ0IsQ0FBQztBQUNsQyxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxFQUFFLFNBQVMsTUFBTSxFQUFFO0FBQzlCLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUM1RCxRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkMsUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO0FBQ3JDLFVBQVUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztBQUN4QyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7QUFDdkMsWUFBWSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ3BDLFlBQVksYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLFdBQVc7QUFDWCxVQUFVLE9BQU8sTUFBTSxDQUFDO0FBQ3hCLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTSxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDL0MsS0FBSztBQUNMO0FBQ0EsSUFBSSxhQUFhLEVBQUUsU0FBUyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRTtBQUMzRCxNQUFNLElBQUksQ0FBQyxRQUFRLEdBQUc7QUFDdEIsUUFBUSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQyxRQUFRLFVBQVUsRUFBRSxVQUFVO0FBQzlCLFFBQVEsT0FBTyxFQUFFLE9BQU87QUFDeEIsT0FBTyxDQUFDO0FBQ1I7QUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7QUFDbEM7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLEdBQUcsR0FBR0EsV0FBUyxDQUFDO0FBQzdCLE9BQU87QUFDUDtBQUNBLE1BQU0sT0FBTyxnQkFBZ0IsQ0FBQztBQUM5QixLQUFLO0FBQ0wsR0FBRyxDQUFDO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsT0FBTyxPQUFPLENBQUM7QUFDakI7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUErQixNQUFNLENBQUMsT0FBTyxDQUFLO0FBQ2xELENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxJQUFJO0FBQ0osRUFBRSxrQkFBa0IsR0FBRyxPQUFPLENBQUM7QUFDL0IsQ0FBQyxDQUFDLE9BQU8sb0JBQW9CLEVBQUU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO0FBQ3RDLElBQUksVUFBVSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQztBQUM1QyxHQUFHLE1BQU07QUFDVCxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRCxHQUFHO0FBQ0g7OztBQ2p2QkEsZUFBYyxHQUFHQyxTQUE4Qjs7QUNBL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksVUFBVSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9CO0FBQ0EsU0FBUyxhQUFhLEdBQUc7QUFDekIsRUFBRSxPQUFPO0FBQ1QsSUFBSSxPQUFPLEVBQUUsSUFBSTtBQUNqQixJQUFJLE1BQU0sRUFBRSxLQUFLO0FBQ2pCLElBQUksVUFBVSxFQUFFLElBQUk7QUFDcEIsSUFBSSxHQUFHLEVBQUUsSUFBSTtBQUNiLElBQUksU0FBUyxFQUFFLElBQUk7QUFDbkIsSUFBSSxZQUFZLEVBQUUsRUFBRTtBQUNwQixJQUFJLFNBQVMsRUFBRSxJQUFJO0FBQ25CLElBQUksVUFBVSxFQUFFLFdBQVc7QUFDM0IsSUFBSSxNQUFNLEVBQUUsSUFBSTtBQUNoQixJQUFJLFFBQVEsRUFBRSxLQUFLO0FBQ25CLElBQUksUUFBUSxFQUFFLElBQUk7QUFDbEIsSUFBSSxRQUFRLEVBQUUsS0FBSztBQUNuQixJQUFJLFNBQVMsRUFBRSxJQUFJO0FBQ25CLElBQUksTUFBTSxFQUFFLEtBQUs7QUFDakIsSUFBSSxVQUFVLEVBQUUsS0FBSztBQUNyQixJQUFJLFdBQVcsRUFBRSxLQUFLO0FBQ3RCLElBQUksU0FBUyxFQUFFLElBQUk7QUFDbkIsSUFBSSxVQUFVLEVBQUUsSUFBSTtBQUNwQixJQUFJLEtBQUssRUFBRSxLQUFLO0FBQ2hCLEdBQUcsQ0FBQztBQUNKLENBQUM7QUFDRDtBQUNBLFNBQVMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFO0FBQ3ZDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0FBQzVDLENBQUM7QUFDRDtBQUNBLFVBQVUsQ0FBQyxPQUFPLEdBQUc7QUFDckIsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFO0FBQzNCLEVBQUUsV0FBVyxFQUFFLGFBQWE7QUFDNUIsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCO0FBQ2xDLENBQUMsQ0FBQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDN0IsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDO0FBQ2pDLE1BQU0sa0JBQWtCLEdBQUcsb0JBQW9CLENBQUM7QUFDaEQsTUFBTSxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztBQUNwRCxNQUFNLGtCQUFrQixHQUFHO0FBQzNCLEVBQUUsR0FBRyxFQUFFLE9BQU87QUFDZCxFQUFFLEdBQUcsRUFBRSxNQUFNO0FBQ2IsRUFBRSxHQUFHLEVBQUUsTUFBTTtBQUNiLEVBQUUsR0FBRyxFQUFFLFFBQVE7QUFDZixFQUFFLEdBQUcsRUFBRSxPQUFPO0FBQ2QsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLEVBQUUsS0FBSyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM1RCxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLEVBQUUsSUFBSSxNQUFNLEVBQUU7QUFDZCxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMvQixNQUFNLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztBQUMvRCxLQUFLO0FBQ0wsR0FBRyxNQUFNO0FBQ1QsSUFBSSxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN2QyxNQUFNLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3ZFLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNEO0FBQ0EsTUFBTSxZQUFZLEdBQUcsNENBQTRDLENBQUM7QUFDbEU7QUFDQSxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUU7QUFDMUI7QUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLO0FBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN4QixJQUFJLElBQUksQ0FBQyxLQUFLLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUNsQyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7QUFDN0IsTUFBTSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztBQUNoQyxVQUFVLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDM0QsVUFBVSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9DLEtBQUs7QUFDTCxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBQ2QsR0FBRyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0Q7QUFDQSxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUM7QUFDN0IsU0FBUyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtBQUM1QixFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztBQUNoQyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ2xCLEVBQUUsTUFBTSxHQUFHLEdBQUc7QUFDZCxJQUFJLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUs7QUFDNUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7QUFDOUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkMsTUFBTSxPQUFPLEdBQUcsQ0FBQztBQUNqQixLQUFLO0FBQ0wsSUFBSSxRQUFRLEVBQUUsTUFBTTtBQUNwQixNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLEtBQUs7QUFDTCxHQUFHLENBQUM7QUFDSixFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUNEO0FBQ0EsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUM7QUFDdEMsTUFBTSxvQkFBb0IsR0FBRywrQkFBK0IsQ0FBQztBQUM3RCxTQUFTLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUMxQyxFQUFFLElBQUksUUFBUSxFQUFFO0FBQ2hCLElBQUksSUFBSSxJQUFJLENBQUM7QUFDYixJQUFJLElBQUk7QUFDUixNQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakQsU0FBUyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO0FBQ3pDLFNBQVMsV0FBVyxFQUFFLENBQUM7QUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ2hCLE1BQU0sT0FBTyxJQUFJLENBQUM7QUFDbEIsS0FBSztBQUNMLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM3RyxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ2xCLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNoRCxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLEdBQUc7QUFDSCxFQUFFLElBQUk7QUFDTixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoRCxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLEdBQUc7QUFDSCxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNEO0FBQ0EsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUFDO0FBQ3RDLE1BQU0sUUFBUSxHQUFHLG1CQUFtQixDQUFDO0FBQ3JDLE1BQU0sTUFBTSxHQUFHLDJCQUEyQixDQUFDO0FBQzNDO0FBQ0EsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNoQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQy9CLE1BQU0sUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ3hDLEtBQUssTUFBTTtBQUNYLE1BQU0sUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RCxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDOUIsRUFBRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2hEO0FBQ0EsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtBQUNyQyxJQUFJLElBQUksWUFBWSxFQUFFO0FBQ3RCLE1BQU0sT0FBTyxJQUFJLENBQUM7QUFDbEIsS0FBSztBQUNMLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDL0MsR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7QUFDckMsSUFBSSxJQUFJLFlBQVksRUFBRTtBQUN0QixNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ2xCLEtBQUs7QUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzdDLEdBQUcsTUFBTTtBQUNULElBQUksT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxNQUFNLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLFFBQVEsR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUNwRDtBQUNBLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUN0QixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDWCxJQUFJLE1BQU07QUFDVixJQUFJLEdBQUcsQ0FBQztBQUNSO0FBQ0EsRUFBRSxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BDLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUN4QixNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtBQUM3RCxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUNEO0FBQ0EsU0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtBQUN2QztBQUNBO0FBQ0EsRUFBRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLO0FBQzlELE1BQU0sSUFBSSxPQUFPLEdBQUcsS0FBSztBQUN6QixRQUFRLElBQUksR0FBRyxNQUFNLENBQUM7QUFDdEIsTUFBTSxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUNuRSxNQUFNLElBQUksT0FBTyxFQUFFO0FBQ25CO0FBQ0E7QUFDQSxRQUFRLE9BQU8sR0FBRyxDQUFDO0FBQ25CLE9BQU8sTUFBTTtBQUNiO0FBQ0EsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixPQUFPO0FBQ1AsS0FBSyxDQUFDO0FBQ04sSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNaO0FBQ0E7QUFDQSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtBQUMxQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO0FBQ3ZEO0FBQ0EsRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFO0FBQzVCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixHQUFHLE1BQU07QUFDVCxJQUFJLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoRCxHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEM7QUFDQSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNyRCxHQUFHO0FBQ0gsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQ2pDLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUN2QixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNmLElBQUksT0FBTyxFQUFFLENBQUM7QUFDZCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCO0FBQ0E7QUFDQSxFQUFFLE9BQU8sT0FBTyxHQUFHLENBQUMsRUFBRTtBQUN0QixJQUFJLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNqRCxJQUFJLElBQUksUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNuQyxNQUFNLE9BQU8sRUFBRSxDQUFDO0FBQ2hCLEtBQUssTUFBTSxJQUFJLFFBQVEsS0FBSyxDQUFDLElBQUksTUFBTSxFQUFFO0FBQ3pDLE1BQU0sT0FBTyxFQUFFLENBQUM7QUFDaEIsS0FBSyxNQUFNO0FBQ1gsTUFBTSxNQUFNO0FBQ1osS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUNEO0FBQ0EsU0FBUyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO0FBQ3RDLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2hDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNkLEdBQUc7QUFDSCxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDdkIsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDO0FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDekIsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNWLEtBQUssTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEMsTUFBTSxLQUFLLEVBQUUsQ0FBQztBQUNkLEtBQUssTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEMsTUFBTSxLQUFLLEVBQUUsQ0FBQztBQUNkLE1BQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQ3JCLFFBQVEsT0FBTyxDQUFDLENBQUM7QUFDakIsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQztBQUNEO0FBQ0EsU0FBUywwQkFBMEIsQ0FBQyxHQUFHLEVBQUU7QUFDekMsRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtBQUMxQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMseU1BQXlNLENBQUMsQ0FBQztBQUM1TixHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQSxTQUFTLGNBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3hDLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQ2pCLElBQUksT0FBTyxFQUFFLENBQUM7QUFDZCxHQUFHO0FBQ0gsRUFBRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEIsRUFBRSxPQUFPLEtBQUssR0FBRyxDQUFDLEVBQUU7QUFDcEIsSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7QUFDbkIsTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDO0FBQ3hCLEtBQUs7QUFDTCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDaEIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDO0FBQ3ZCLEdBQUc7QUFDSCxFQUFFLE9BQU8sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUMxQixDQUFDO0FBQ0Q7QUFDQSxJQUFJLE9BQU8sR0FBRztBQUNkLEVBQUUsTUFBTSxFQUFFLFFBQVE7QUFDbEIsRUFBRSxRQUFRLEVBQUUsVUFBVTtBQUN0QixFQUFFLElBQUksRUFBRSxNQUFNO0FBQ2QsRUFBRSxRQUFRLEVBQUUsVUFBVTtBQUN0QixFQUFFLFVBQVU7QUFDWixFQUFFLFFBQVEsRUFBRSxVQUFVO0FBQ3RCLEVBQUUsS0FBSyxFQUFFLE9BQU87QUFDaEIsRUFBRSxVQUFVLEVBQUUsWUFBWTtBQUMxQixFQUFFLEtBQUssRUFBRSxPQUFPO0FBQ2hCLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CO0FBQzFDLEVBQUUsd0JBQXdCLEVBQUUsMEJBQTBCO0FBQ3RELEVBQUUsWUFBWSxFQUFFLGNBQWM7QUFDOUIsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7QUFDcEQsTUFBTTtBQUNOLEVBQUUsS0FBSztBQUNQLEVBQUUsVUFBVTtBQUNaLEVBQUUsTUFBTSxFQUFFLFFBQVE7QUFDbEIsRUFBRSxrQkFBa0I7QUFDcEIsQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUNaO0FBQ0EsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQzNDLEVBQUUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN6QixFQUFFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDekQsRUFBRSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRDtBQUNBLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUNoQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUM5QixJQUFJLE1BQU0sS0FBSyxHQUFHO0FBQ2xCLE1BQU0sSUFBSSxFQUFFLE1BQU07QUFDbEIsTUFBTSxHQUFHO0FBQ1QsTUFBTSxJQUFJO0FBQ1YsTUFBTSxLQUFLO0FBQ1gsTUFBTSxJQUFJO0FBQ1YsTUFBTSxNQUFNLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQzFDLEtBQUssQ0FBQztBQUNOLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQy9CLElBQUksT0FBTyxLQUFLLENBQUM7QUFDakIsR0FBRyxNQUFNO0FBQ1QsSUFBSSxPQUFPO0FBQ1gsTUFBTSxJQUFJLEVBQUUsT0FBTztBQUNuQixNQUFNLEdBQUc7QUFDVCxNQUFNLElBQUk7QUFDVixNQUFNLEtBQUs7QUFDWCxNQUFNLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQzFCLEtBQUssQ0FBQztBQUNOLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDM0MsRUFBRSxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdkQ7QUFDQSxFQUFFLElBQUksaUJBQWlCLEtBQUssSUFBSSxFQUFFO0FBQ2xDLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsR0FBRztBQUNIO0FBQ0EsRUFBRSxNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QztBQUNBLEVBQUUsT0FBTyxJQUFJO0FBQ2IsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ2hCLEtBQUssR0FBRyxDQUFDLElBQUksSUFBSTtBQUNqQixNQUFNLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRCxNQUFNLElBQUksaUJBQWlCLEtBQUssSUFBSSxFQUFFO0FBQ3RDLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsT0FBTztBQUNQO0FBQ0EsTUFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7QUFDL0M7QUFDQSxNQUFNLElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO0FBQ3RELFFBQVEsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQyxPQUFPO0FBQ1A7QUFDQSxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ2xCLEtBQUssQ0FBQztBQUNOLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksV0FBVyxHQUFHLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLFVBQVUsQ0FBQztBQUN6QyxHQUFHO0FBQ0g7QUFDQSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUU7QUFDYixJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUM3QixRQUFRLE9BQU87QUFDZixVQUFVLElBQUksRUFBRSxPQUFPO0FBQ3ZCLFVBQVUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckIsU0FBUyxDQUFDO0FBQ1YsT0FBTztBQUNQLE1BQU0sT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUMzQixLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1osSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixNQUFNLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sT0FBTztBQUNiLFFBQVEsSUFBSSxFQUFFLE1BQU07QUFDcEIsUUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuQixRQUFRLGNBQWMsRUFBRSxVQUFVO0FBQ2xDLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO0FBQ3BDLFlBQVksS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7QUFDN0IsWUFBWSxJQUFJO0FBQ2hCLE9BQU8sQ0FBQztBQUNSLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDZCxJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEQsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sTUFBTSxJQUFJLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM3RDtBQUNBLE1BQU0sT0FBTztBQUNiLFFBQVEsSUFBSSxFQUFFLE1BQU07QUFDcEIsUUFBUSxHQUFHO0FBQ1gsUUFBUSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdDLFFBQVEsSUFBSTtBQUNaLE9BQU8sQ0FBQztBQUNSLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDZixJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQy9CO0FBQ0E7QUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMzQixRQUFRLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDekMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO0FBQ25DLFVBQVUsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNoQyxTQUFTLE1BQU0sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ25EO0FBQ0EsVUFBVSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2hDLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxNQUFNLE1BQU0sS0FBSyxHQUFHO0FBQ3BCLFFBQVEsSUFBSSxFQUFFLFNBQVM7QUFDdkIsUUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuQixRQUFRLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtBQUM1QixRQUFRLElBQUksRUFBRSxJQUFJO0FBQ2xCLFFBQVEsTUFBTSxFQUFFLEVBQUU7QUFDbEIsT0FBTyxDQUFDO0FBQ1IsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsRCxNQUFNLE9BQU8sS0FBSyxDQUFDO0FBQ25CLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7QUFDVixJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUMsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sT0FBTztBQUNiLFFBQVEsSUFBSSxFQUFFLElBQUk7QUFDbEIsUUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuQixPQUFPLENBQUM7QUFDUixLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ2xCLElBQUksTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0RCxJQUFJLElBQUksR0FBRyxFQUFFO0FBQ2IsTUFBTSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNsRDtBQUNBLE1BQU0sT0FBTztBQUNiLFFBQVEsSUFBSSxFQUFFLFlBQVk7QUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuQixRQUFRLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0FBQ2hELFFBQVEsSUFBSTtBQUNaLE9BQU8sQ0FBQztBQUNSLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDWixJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUMsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxpQkFBaUI7QUFDekUsUUFBUSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQztBQUNsQztBQUNBLE1BQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQy9CLE1BQU0sTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDeEM7QUFDQSxNQUFNLE1BQU0sSUFBSSxHQUFHO0FBQ25CLFFBQVEsSUFBSSxFQUFFLE1BQU07QUFDcEIsUUFBUSxHQUFHLEVBQUUsRUFBRTtBQUNmLFFBQVEsT0FBTyxFQUFFLFNBQVM7QUFDMUIsUUFBUSxLQUFLLEVBQUUsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ2xELFFBQVEsS0FBSyxFQUFFLEtBQUs7QUFDcEIsUUFBUSxLQUFLLEVBQUUsRUFBRTtBQUNqQixPQUFPLENBQUM7QUFDUjtBQUNBLE1BQU0sSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDckU7QUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDakMsUUFBUSxJQUFJLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7QUFDMUMsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNLE1BQU0sU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLENBQUM7QUFDaEc7QUFDQTtBQUNBLE1BQU0sT0FBTyxHQUFHLEVBQUU7QUFDbEIsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDM0MsVUFBVSxNQUFNO0FBQ2hCLFNBQVM7QUFDVDtBQUNBLFFBQVEsSUFBSSxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDMUMsVUFBVSxNQUFNO0FBQ2hCLFNBQVM7QUFDVDtBQUNBLFFBQVEsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkM7QUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDbkMsVUFBVSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFVBQVUsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM3QyxTQUFTLE1BQU07QUFDZixVQUFVLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLFVBQVUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDN0QsVUFBVSxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hFLFNBQVM7QUFDVDtBQUNBLFFBQVEsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUMxQixRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckI7QUFDQSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNoRCxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUM3RCxVQUFVLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQzVCLFVBQVUsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNyQixTQUFTO0FBQ1Q7QUFDQSxRQUFRLE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7QUFDckc7QUFDQSxRQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzQyxVQUFVLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUI7QUFDQSxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDckMsWUFBWSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqRSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVUsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzFDLFlBQVksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQy9ELFlBQVksTUFBTTtBQUNsQixXQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVUsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUMxQixZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDOUIsY0FBYyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQy9CLGFBQWE7QUFDYjtBQUNBO0FBQ0EsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxFQUFFO0FBQy9DLGNBQWMsWUFBWSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELGFBQWEsTUFBTTtBQUNuQixjQUFjLFlBQVksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQzFDLGFBQWE7QUFDYixZQUFZLFNBQVM7QUFDckIsV0FBVztBQUNYO0FBQ0E7QUFDQSxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDN0QsWUFBWSxZQUFZLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEQsWUFBWSxTQUFTO0FBQ3JCLFdBQVcsTUFBTTtBQUNqQixZQUFZLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMvRCxZQUFZLE1BQU07QUFDbEIsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDekI7QUFDQSxVQUFVLElBQUksaUJBQWlCLEVBQUU7QUFDakMsWUFBWSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUM5QixXQUFXLE1BQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzVDLFlBQVksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQ3JDLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUM5QixVQUFVLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BELFVBQVUsSUFBSSxNQUFNLEVBQUU7QUFDdEIsWUFBWSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQztBQUM3QyxZQUFZLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0EsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN4QixVQUFVLElBQUksRUFBRSxXQUFXO0FBQzNCLFVBQVUsR0FBRyxFQUFFLEdBQUc7QUFDbEIsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDeEIsVUFBVSxPQUFPLEVBQUUsU0FBUztBQUM1QixVQUFVLEtBQUssRUFBRSxLQUFLO0FBQ3RCLFVBQVUsSUFBSSxFQUFFLFlBQVk7QUFDNUIsU0FBUyxDQUFDLENBQUM7QUFDWDtBQUNBLFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7QUFDeEIsUUFBUSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEMsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUM5RCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN4RSxNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN0QztBQUNBLE1BQU0sTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDbEM7QUFDQTtBQUNBLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDOUIsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ3JDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDOUUsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsRUFBRTtBQUNoRSxVQUFVLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQzVCLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ3JDLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ2xCLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDWixJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEQsSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUNiLE1BQU0sTUFBTSxLQUFLLEdBQUc7QUFDcEIsUUFBUSxJQUFJLEVBQUUsTUFBTTtBQUNwQixRQUFRLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25CLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO0FBQ3BDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUM7QUFDNUUsUUFBUSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwQixPQUFPLENBQUM7QUFDUixNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDakMsUUFBUSxLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztBQUNqQyxRQUFRLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLFFBQVEsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDMUIsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwRCxPQUFPO0FBQ1AsTUFBTSxPQUFPLEtBQUssQ0FBQztBQUNuQixLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO0FBQ1gsSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9DLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLE1BQU0sTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUQsTUFBTSxPQUFPO0FBQ2IsUUFBUSxJQUFJLEVBQUUsS0FBSztBQUNuQixRQUFRLEdBQUc7QUFDWCxRQUFRLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25CLFFBQVEsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDcEIsUUFBUSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyQixPQUFPLENBQUM7QUFDUixLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFO0FBQ2IsSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pELElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixNQUFNLE1BQU0sSUFBSSxHQUFHO0FBQ25CLFFBQVEsSUFBSSxFQUFFLE9BQU87QUFDckIsUUFBUSxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNwRSxRQUFRLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBQy9ELFFBQVEsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNqRSxPQUFPLENBQUM7QUFDUjtBQUNBLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNwRCxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCO0FBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNsQyxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO0FBQ3pCLFFBQVEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsVUFBVSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQy9DLFlBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7QUFDcEMsV0FBVyxNQUFNLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdkQsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUNyQyxXQUFXLE1BQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN0RCxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ25DLFdBQVcsTUFBTTtBQUNqQixZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2pDLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUM3QixRQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hHLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQy9CLFFBQVEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsVUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDckMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlFLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDN0IsUUFBUSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoQyxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLFVBQVUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxF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TUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3RHLE1BQU0sTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDMUMsTUFBTSxJQUFJLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxHQUFHLE9BQU8sRUFBRSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQ25FO0FBQ0EsTUFBTSxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztBQUN2SCxNQUFNLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQzNCO0FBQ0E7QUFDQSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUM7QUFDN0Q7QUFDQSxNQUFNLE9BQU8sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDdkQsUUFBUSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEY7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUztBQUM5QjtBQUNBLFFBQVEsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEM7QUFDQSxRQUFRLElBQUksS0FBSyxDQUFDLENBQUMs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
