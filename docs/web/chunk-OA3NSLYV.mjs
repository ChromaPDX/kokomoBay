import {
  __commonJS
} from "./chunk-SZDDWZIA.mjs";

// ../testeranto/node_modules/scheduler/cjs/scheduler.development.js
var require_scheduler_development = __commonJS({
  "../testeranto/node_modules/scheduler/cjs/scheduler.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var enableSchedulerDebugging = false;
        var enableProfiling = false;
        var frameYieldMs = 5;
        function push(heap, node) {
          var index = heap.length;
          heap.push(node);
          siftUp(heap, node, index);
        }
        function peek(heap) {
          return heap.length === 0 ? null : heap[0];
        }
        function pop(heap) {
          if (heap.length === 0) {
            return null;
          }
          var first = heap[0];
          var last = heap.pop();
          if (last !== first) {
            heap[0] = last;
            siftDown(heap, last, 0);
          }
          return first;
        }
        function siftUp(heap, node, i) {
          var index = i;
          while (index > 0) {
            var parentIndex = index - 1 >>> 1;
            var parent = heap[parentIndex];
            if (compare(parent, node) > 0) {
              heap[parentIndex] = node;
              heap[index] = parent;
              index = parentIndex;
            } else {
              return;
            }
          }
        }
        function siftDown(heap, node, i) {
          var index = i;
          var length = heap.length;
          var halfLength = length >>> 1;
          while (index < halfLength) {
            var leftIndex = (index + 1) * 2 - 1;
            var left = heap[leftIndex];
            var rightIndex = leftIndex + 1;
            var right = heap[rightIndex];
            if (compare(left, node) < 0) {
              if (rightIndex < length && compare(right, left) < 0) {
                heap[index] = right;
                heap[rightIndex] = node;
                index = rightIndex;
              } else {
                heap[index] = left;
                heap[leftIndex] = node;
                index = leftIndex;
              }
            } else if (rightIndex < length && compare(right, node) < 0) {
              heap[index] = right;
              heap[rightIndex] = node;
              index = rightIndex;
            } else {
              return;
            }
          }
        }
        function compare(a, b) {
          var diff = a.sortIndex - b.sortIndex;
          return diff !== 0 ? diff : a.id - b.id;
        }
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        function markTaskErrored(task, ms) {
        }
        var hasPerformanceNow = typeof performance === "object" && typeof performance.now === "function";
        if (hasPerformanceNow) {
          var localPerformance = performance;
          exports.unstable_now = function() {
            return localPerformance.now();
          };
        } else {
          var localDate = Date;
          var initialTime = localDate.now();
          exports.unstable_now = function() {
            return localDate.now() - initialTime;
          };
        }
        var maxSigned31BitInt = 1073741823;
        var IMMEDIATE_PRIORITY_TIMEOUT = -1;
        var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5e3;
        var LOW_PRIORITY_TIMEOUT = 1e4;
        var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
        var taskQueue = [];
        var timerQueue = [];
        var taskIdCounter = 1;
        var currentTask = null;
        var currentPriorityLevel = NormalPriority;
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false;
        var localSetTimeout = typeof setTimeout === "function" ? setTimeout : null;
        var localClearTimeout = typeof clearTimeout === "function" ? clearTimeout : null;
        var localSetImmediate = typeof setImmediate !== "undefined" ? setImmediate : null;
        var isInputPending = typeof navigator !== "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;
        function advanceTimers(currentTime) {
          var timer = peek(timerQueue);
          while (timer !== null) {
            if (timer.callback === null) {
              pop(timerQueue);
            } else if (timer.startTime <= currentTime) {
              pop(timerQueue);
              timer.sortIndex = timer.expirationTime;
              push(taskQueue, timer);
            } else {
              return;
            }
            timer = peek(timerQueue);
          }
        }
        function handleTimeout(currentTime) {
          isHostTimeoutScheduled = false;
          advanceTimers(currentTime);
          if (!isHostCallbackScheduled) {
            if (peek(taskQueue) !== null) {
              isHostCallbackScheduled = true;
              requestHostCallback(flushWork);
            } else {
              var firstTimer = peek(timerQueue);
              if (firstTimer !== null) {
                requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
              }
            }
          }
        }
        function flushWork(hasTimeRemaining, initialTime2) {
          isHostCallbackScheduled = false;
          if (isHostTimeoutScheduled) {
            isHostTimeoutScheduled = false;
            cancelHostTimeout();
          }
          isPerformingWork = true;
          var previousPriorityLevel = currentPriorityLevel;
          try {
            if (enableProfiling) {
              try {
                return workLoop(hasTimeRemaining, initialTime2);
              } catch (error) {
                if (currentTask !== null) {
                  var currentTime = exports.unstable_now();
                  markTaskErrored(currentTask, currentTime);
                  currentTask.isQueued = false;
                }
                throw error;
              }
            } else {
              return workLoop(hasTimeRemaining, initialTime2);
            }
          } finally {
            currentTask = null;
            currentPriorityLevel = previousPriorityLevel;
            isPerformingWork = false;
          }
        }
        function workLoop(hasTimeRemaining, initialTime2) {
          var currentTime = initialTime2;
          advanceTimers(currentTime);
          currentTask = peek(taskQueue);
          while (currentTask !== null && !enableSchedulerDebugging) {
            if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
              break;
            }
            var callback = currentTask.callback;
            if (typeof callback === "function") {
              currentTask.callback = null;
              currentPriorityLevel = currentTask.priorityLevel;
              var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
              var continuationCallback = callback(didUserCallbackTimeout);
              currentTime = exports.unstable_now();
              if (typeof continuationCallback === "function") {
                currentTask.callback = continuationCallback;
              } else {
                if (currentTask === peek(taskQueue)) {
                  pop(taskQueue);
                }
              }
              advanceTimers(currentTime);
            } else {
              pop(taskQueue);
            }
            currentTask = peek(taskQueue);
          }
          if (currentTask !== null) {
            return true;
          } else {
            var firstTimer = peek(timerQueue);
            if (firstTimer !== null) {
              requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
            }
            return false;
          }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
          switch (priorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
            case LowPriority:
            case IdlePriority:
              break;
            default:
              priorityLevel = NormalPriority;
          }
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = priorityLevel;
          try {
            return eventHandler();
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        }
        function unstable_next(eventHandler) {
          var priorityLevel;
          switch (currentPriorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
              priorityLevel = NormalPriority;
              break;
            default:
              priorityLevel = currentPriorityLevel;
              break;
          }
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = priorityLevel;
          try {
            return eventHandler();
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        }
        function unstable_wrapCallback(callback) {
          var parentPriorityLevel = currentPriorityLevel;
          return function() {
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = parentPriorityLevel;
            try {
              return callback.apply(this, arguments);
            } finally {
              currentPriorityLevel = previousPriorityLevel;
            }
          };
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
          var currentTime = exports.unstable_now();
          var startTime2;
          if (typeof options === "object" && options !== null) {
            var delay = options.delay;
            if (typeof delay === "number" && delay > 0) {
              startTime2 = currentTime + delay;
            } else {
              startTime2 = currentTime;
            }
          } else {
            startTime2 = currentTime;
          }
          var timeout;
          switch (priorityLevel) {
            case ImmediatePriority:
              timeout = IMMEDIATE_PRIORITY_TIMEOUT;
              break;
            case UserBlockingPriority:
              timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
              break;
            case IdlePriority:
              timeout = IDLE_PRIORITY_TIMEOUT;
              break;
            case LowPriority:
              timeout = LOW_PRIORITY_TIMEOUT;
              break;
            case NormalPriority:
            default:
              timeout = NORMAL_PRIORITY_TIMEOUT;
              break;
          }
          var expirationTime = startTime2 + timeout;
          var newTask = {
            id: taskIdCounter++,
            callback,
            priorityLevel,
            startTime: startTime2,
            expirationTime,
            sortIndex: -1
          };
          if (startTime2 > currentTime) {
            newTask.sortIndex = startTime2;
            push(timerQueue, newTask);
            if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
              if (isHostTimeoutScheduled) {
                cancelHostTimeout();
              } else {
                isHostTimeoutScheduled = true;
              }
              requestHostTimeout(handleTimeout, startTime2 - currentTime);
            }
          } else {
            newTask.sortIndex = expirationTime;
            push(taskQueue, newTask);
            if (!isHostCallbackScheduled && !isPerformingWork) {
              isHostCallbackScheduled = true;
              requestHostCallback(flushWork);
            }
          }
          return newTask;
        }
        function unstable_pauseExecution() {
        }
        function unstable_continueExecution() {
          if (!isHostCallbackScheduled && !isPerformingWork) {
            isHostCallbackScheduled = true;
            requestHostCallback(flushWork);
          }
        }
        function unstable_getFirstCallbackNode() {
          return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
          task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
          return currentPriorityLevel;
        }
        var isMessageLoopRunning = false;
        var scheduledHostCallback = null;
        var taskTimeoutID = -1;
        var frameInterval = frameYieldMs;
        var startTime = -1;
        function shouldYieldToHost() {
          var timeElapsed = exports.unstable_now() - startTime;
          if (timeElapsed < frameInterval) {
            return false;
          }
          return true;
        }
        function requestPaint() {
        }
        function forceFrameRate(fps) {
          if (fps < 0 || fps > 125) {
            console["error"]("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
            return;
          }
          if (fps > 0) {
            frameInterval = Math.floor(1e3 / fps);
          } else {
            frameInterval = frameYieldMs;
          }
        }
        var performWorkUntilDeadline = function() {
          if (scheduledHostCallback !== null) {
            var currentTime = exports.unstable_now();
            startTime = currentTime;
            var hasTimeRemaining = true;
            var hasMoreWork = true;
            try {
              hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
            } finally {
              if (hasMoreWork) {
                schedulePerformWorkUntilDeadline();
              } else {
                isMessageLoopRunning = false;
                scheduledHostCallback = null;
              }
            }
          } else {
            isMessageLoopRunning = false;
          }
        };
        var schedulePerformWorkUntilDeadline;
        if (typeof localSetImmediate === "function") {
          schedulePerformWorkUntilDeadline = function() {
            localSetImmediate(performWorkUntilDeadline);
          };
        } else if (typeof MessageChannel !== "undefined") {
          var channel = new MessageChannel();
          var port = channel.port2;
          channel.port1.onmessage = performWorkUntilDeadline;
          schedulePerformWorkUntilDeadline = function() {
            port.postMessage(null);
          };
        } else {
          schedulePerformWorkUntilDeadline = function() {
            localSetTimeout(performWorkUntilDeadline, 0);
          };
        }
        function requestHostCallback(callback) {
          scheduledHostCallback = callback;
          if (!isMessageLoopRunning) {
            isMessageLoopRunning = true;
            schedulePerformWorkUntilDeadline();
          }
        }
        function requestHostTimeout(callback, ms) {
          taskTimeoutID = localSetTimeout(function() {
            callback(exports.unstable_now());
          }, ms);
        }
        function cancelHostTimeout() {
          localClearTimeout(taskTimeoutID);
          taskTimeoutID = -1;
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = null;
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_forceFrameRate = forceFrameRate;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_shouldYield = shouldYieldToHost;
        exports.unstable_wrapCallback = unstable_wrapCallback;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// ../testeranto/node_modules/scheduler/index.js
var require_scheduler = __commonJS({
  "../testeranto/node_modules/scheduler/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_scheduler_development();
    }
  }
});

// ../testeranto/dist/module/PM/index.js
var PM = class {
};

// ../testeranto/dist/module/PM/web.js
var PM_Web = class extends PM {
  constructor(t) {
    super();
    this.server = {};
    this.testResourceConfiguration = t;
  }
  waitForSelector(p, s) {
    return window["waitForSelector"](p, s);
  }
  screencast(opts) {
    return window["screencast"](Object.assign(Object.assign({}, opts), { path: this.testResourceConfiguration.fs + "/" + opts.path }), this.testResourceConfiguration.name);
  }
  screencastStop(recorder) {
    return window["screencastStop"](recorder);
  }
  closePage(p) {
    return window["closePage"](p);
  }
  goto(p, url) {
    return window["goto"](p, url);
  }
  newPage() {
    return window["newPage"]();
  }
  $(selector) {
    return window["$"](selector);
  }
  isDisabled(selector) {
    return window["isDisabled"](selector);
  }
  getAttribute(selector, attribute) {
    return window["getValue"](selector, attribute);
  }
  getValue(selector) {
    return window["getValue"](selector);
  }
  focusOn(selector) {
    return window["focusOn"](selector);
  }
  typeInto(value) {
    return window["typeInto"](value);
  }
  page() {
    return window["page"]();
  }
  click(selector) {
    return window["click"](selector);
  }
  customScreenShot(opts) {
    return window["customScreenShot"](Object.assign(Object.assign({}, opts), { path: this.testResourceConfiguration.fs + "/" + opts.path }), this.testResourceConfiguration.name);
  }
  existsSync(destFolder) {
    return window["existsSync"](destFolder);
  }
  mkdirSync(x) {
    return window["mkdirSync"](this.testResourceConfiguration.fs + "/");
  }
  write(writeObject, contents) {
    return window["write"](writeObject.uid, contents);
  }
  writeFileSync(filepath, contents) {
    return window["writeFileSync"](this.testResourceConfiguration.fs + "/" + filepath, contents, this.testResourceConfiguration.name);
  }
  createWriteStream(filepath) {
    return window["createWriteStream"](this.testResourceConfiguration.fs + "/" + filepath, this.testResourceConfiguration.name);
  }
  end(writeObject) {
    return window["end"](writeObject.uid);
  }
  customclose() {
    window["customclose"](this.testResourceConfiguration.fs, this.testResourceConfiguration.name);
  }
  testArtiFactoryfileWriter(tLog, callback) {
    return (fPath, value) => {
      callback(new Promise((res, rej) => {
        tLog("testArtiFactory =>", fPath);
      }));
    };
  }
};

// ../testeranto/dist/module/lib/index.js
var BaseTestInterface = {
  beforeAll: async (s) => s,
  beforeEach: async function(subject, initialValues, x, testResource, pm) {
    return subject;
  },
  afterEach: async (s) => s,
  afterAll: (store) => void 0,
  butThen: async (store, thenCb) => thenCb(store),
  andWhen: (a) => a,
  assertThis: () => null
};
var DefaultTestInterface = (p) => {
  return Object.assign(Object.assign({}, BaseTestInterface), p);
};
var defaultTestResourceRequirement = {
  ports: 0
};

// ../testeranto/dist/module/lib/abstractBase.js
var BaseSuite = class {
  constructor(name, index, givens = {}, checks = []) {
    this.name = name;
    this.index = index;
    this.givens = givens;
    this.checks = checks;
    this.fails = [];
  }
  features() {
    const features = Object.keys(this.givens).map((k) => this.givens[k].features).flat().filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
    return features || [];
  }
  toObj() {
    const givens = Object.keys(this.givens).map((k) => this.givens[k].toObj());
    return {
      name: this.name,
      givens,
      fails: this.fails,
      features: this.features()
    };
  }
  setup(s, artifactory, tr, pm) {
    return new Promise((res) => res(s));
  }
  assertThat(t) {
    return t;
  }
  afterAll(store, artifactory, pm) {
    return store;
  }
  async run(input, testResourceConfiguration, artifactory, tLog, pm) {
    this.testResourceConfiguration = testResourceConfiguration;
    tLog("test resources: ", JSON.stringify(testResourceConfiguration));
    const suiteArtifactory = (fPath, value) => artifactory(`suite-${this.index}-${this.name}/${fPath}`, value);
    tLog("\nSuite:", this.index, this.name);
    const sNdx = this.index;
    const sName = this.name;
    for (const [gKey, g] of Object.entries(this.givens)) {
      const beforeAllProxy = new Proxy(pm, {
        get(target, prop, receiver) {
          if (prop === "customScreenShot") {
            return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), {
              // path: `${filepath}/${opts.path}`,
              path: `suite-${sNdx}/beforeAll/${opts.path}`
            }), p);
          }
          if (prop === "writeFileSync") {
            return (fp, contents) => target[prop](`suite-${sNdx}/beforeAll/${fp}`, contents);
          }
          return Reflect.get(...arguments);
        }
      });
      const subject = await this.setup(input, suiteArtifactory, testResourceConfiguration, beforeAllProxy);
      const giver = this.givens[gKey];
      try {
        this.store = await giver.give(subject, gKey, testResourceConfiguration, this.assertThat, suiteArtifactory, tLog, pm, sNdx);
      } catch (e) {
        console.error(e);
        this.fails.push(giver);
      }
    }
    try {
      this.afterAll(
        this.store,
        artifactory,
        // afterAllProxy
        pm
      );
    } catch (e) {
      console.error(e);
    }
    return this;
  }
};
var BaseGiven = class {
  constructor(name, features, whens, thens, givenCB, initialValues) {
    this.name = name;
    this.features = features;
    this.whens = whens;
    this.thens = thens;
    this.givenCB = givenCB;
    this.initialValues = initialValues;
  }
  beforeAll(store, initializer, artifactory, testResource, initialValues, pm) {
    return store;
  }
  toObj() {
    return {
      key: this.key,
      name: this.name,
      whens: this.whens.map((w) => w.toObj()),
      thens: this.thens.map((t) => t.toObj()),
      error: this.error ? [this.error, this.error.stack] : null,
      // fail: this.fail ? [this.fail] : false,
      features: this.features
    };
  }
  async afterEach(store, key, artifactory, pm) {
    return store;
  }
  async give(subject, key, testResourceConfiguration, tester, artifactory, tLog, pm, suiteNdx) {
    this.key = key;
    tLog(`
 ${this.key}`);
    tLog(`
 Given: ${this.name}`);
    const givenArtifactory = (fPath, value) => artifactory(`given-${key}/${fPath}`, value);
    try {
      const beforeEachProxy = new Proxy(pm, {
        get(target, prop, receiver) {
          if (prop === "writeFileSync") {
            return (fp, contents) => target[prop](`suite-${suiteNdx}/given-${key}/when/beforeEach/${fp}`, contents);
          }
          if (prop === "customScreenShot") {
            return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), { path: `suite-${suiteNdx}/given-${key}/when/beforeEach/${opts.path}` }), p);
          }
          if (prop === "screencast") {
            return (opts, p) => target.screencast(Object.assign(Object.assign({}, opts), { path: `suite-${suiteNdx}/given-${key}/when/beforeEach/${opts.path}` }), p);
          }
          return Reflect.get(...arguments);
        }
      });
      this.uberCatcher((e) => {
        console.error(e);
        this.error = e.error;
        tLog(e.stack);
      });
      this.store = await this.givenThat(subject, testResourceConfiguration, givenArtifactory, this.givenCB, this.initialValues, beforeEachProxy);
      for (const [whenNdx, whenStep] of this.whens.entries()) {
        await whenStep.test(this.store, testResourceConfiguration, tLog, pm, `suite-${suiteNdx}/given-${key}/when/${whenNdx}`);
      }
      for (const [thenNdx, thenStep] of this.thens.entries()) {
        const t = await thenStep.test(this.store, testResourceConfiguration, tLog, pm, `suite-${suiteNdx}/given-${key}/then-${thenNdx}`);
        tester(t);
      }
    } catch (e) {
      console.error(e);
      this.error = e;
      tLog(e.stack);
    } finally {
      try {
        const afterEachProxy = new Proxy(pm, {
          get(target, prop, receiver) {
            if (prop === "customScreenShot") {
              return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), { path: `suite-${suiteNdx}/given-${key}/afterEach/${opts.path}` }), p);
            }
            if (prop === "writeFileSync") {
              return (fp, contents) => target[prop](`suite-${suiteNdx}/given-${key}/afterEach/${fp}`, contents);
            }
            return Reflect.get(...arguments);
          }
        });
        await this.afterEach(
          this.store,
          this.key,
          givenArtifactory,
          // pm
          afterEachProxy
        );
      } catch (e) {
        console.error("afterEach failed! no error will be recorded!", e);
      }
    }
    return this.store;
  }
};
var BaseWhen = class {
  constructor(name, whenCB) {
    this.name = name;
    this.whenCB = whenCB;
  }
  toObj() {
    return {
      name: this.name,
      error: this.error
    };
  }
  async test(store, testResourceConfiguration, tLog, pm, filepath) {
    tLog(" When:", this.name);
    const name = this.name;
    const andWhenProxy = new Proxy(pm, {
      get(target, prop, receiver) {
        if (prop === "customScreenShot") {
          return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), { path: `${filepath}/${opts.path}` }), p);
        }
        if (prop === "writeFileSync") {
          return (fp, contents) => target[prop](`${filepath}/andWhen/${fp}`, contents);
        }
        return Reflect.get(...arguments);
      }
    });
    return await this.andWhen(store, this.whenCB, testResourceConfiguration, andWhenProxy).catch((e) => {
      this.error = true;
    });
  }
};
var BaseThen = class {
  constructor(name, thenCB) {
    this.name = name;
    this.thenCB = thenCB;
    this.error = false;
  }
  toObj() {
    return {
      name: this.name,
      error: this.error
    };
  }
  async test(store, testResourceConfiguration, tLog, pm, filepath) {
    tLog(" Then:", this.name);
    try {
      const butThenProxy = new Proxy(pm, {
        get(target, prop, receiver) {
          if (prop === "customScreenShot") {
            return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), { path: `${filepath}/${opts.path}` }), p);
          }
          if (prop === "writeFileSync") {
            return (fp, contents) => target[prop](`${filepath}/${fp}`, contents);
          }
          return Reflect.get(...arguments);
        }
      });
      return this.butThen(store, this.thenCB, testResourceConfiguration, butThenProxy).catch((e) => {
        this.error = true;
        throw e;
      });
    } catch (e) {
      console.log("test failed", e);
      this.error = e.message;
      throw e;
    }
  }
};
var BaseCheck = class {
  constructor(name, features, checkCB, whens, thens) {
    this.name = name;
    this.features = features;
    this.checkCB = checkCB;
    this.whens = whens;
    this.thens = thens;
  }
  async afterEach(store, key, cb, pm) {
    return;
  }
  async check(subject, key, testResourceConfiguration, tester, artifactory, tLog, pm) {
    tLog(`
 Check: ${this.name}`);
    const store = await this.checkThat(subject, testResourceConfiguration, artifactory, pm);
    await this.checkCB(Object.entries(this.whens).reduce((a, [key2, when]) => {
      a[key2] = async (payload) => {
        return await when(payload, testResourceConfiguration).test(store, testResourceConfiguration, tLog, pm, "x");
      };
      return a;
    }, {}), Object.entries(this.thens).reduce((a, [key2, then]) => {
      a[key2] = async (payload) => {
        const t = await then(payload, testResourceConfiguration).test(store, testResourceConfiguration, tLog, pm);
        tester(t);
      };
      return a;
    }, {}));
    await this.afterEach(store, key, () => {
    }, pm);
    return;
  }
};

// ../testeranto/dist/module/lib/basebuilder.js
var BaseBuilder = class {
  constructor(input, suitesOverrides, givenOverides, whenOverides, thenOverides, checkOverides, testResourceRequirement, testSpecification) {
    this.input = input;
    this.artifacts = [];
    this.artifacts = [];
    this.testResourceRequirement = testResourceRequirement;
    this.suitesOverrides = suitesOverrides;
    this.givenOverides = givenOverides;
    this.whenOverides = whenOverides;
    this.thenOverides = thenOverides;
    this.checkOverides = checkOverides;
    this.testSpecification = testSpecification;
    this.specs = testSpecification(this.Suites(), this.Given(), this.When(), this.Then(), this.Check());
    this.testJobs = this.specs.map((suite) => {
      const suiteRunner = (suite2) => async (puppetMaster, tLog) => {
        const x = await suite2.run(input, puppetMaster.testResourceConfiguration, (fPath, value) => puppetMaster.testArtiFactoryfileWriter(tLog, (p) => {
          this.artifacts.push(p);
        })(puppetMaster.testResourceConfiguration.fs + "/" + fPath, value), tLog, puppetMaster);
        return x;
      };
      const runner = suiteRunner(suite);
      return {
        test: suite,
        toObj: () => {
          return suite.toObj();
        },
        runner,
        receiveTestResourceConfig: async function(puppetMaster) {
          const logFilePath = "log.txt";
          const access = await puppetMaster.createWriteStream(logFilePath);
          const tLog = (...l) => {
            puppetMaster.write(access, `${l.toString()}
`);
          };
          const suiteDone = await runner(puppetMaster, tLog);
          const logPromise = new Promise((res, rej) => {
            puppetMaster.end(access);
            res(true);
          });
          const numberOfFailures = Object.keys(suiteDone.givens).filter((k) => {
            return suiteDone.givens[k].error;
          }).length;
          puppetMaster.writeFileSync(`bdd_errors.txt`, numberOfFailures.toString());
          const o = this.toObj();
          puppetMaster.writeFileSync(`littleBoard.html`, `
            <!DOCTYPE html>
<html lang="en">

<head>
  <meta name="description" content="Webpage description goes here" />
  <meta charset="utf-8" />
  <title>kokomoBay - testeranto</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="" />

  <link rel="stylesheet" href="/kokomoBay/docs/TestReport.css" />
  <script src="/kokomoBay/docs/TestReport.js"><\/script>

</head>

  <body>
    <h1>Test report</h1>
            <div id="root"/>
  </body>
            `);
          puppetMaster.writeFileSync(`tests.json`, JSON.stringify(this.toObj(), null, 2));
          return {
            failed: numberOfFailures,
            artifacts: this.artifacts || [],
            logPromise,
            features: suiteDone.features()
          };
        }
      };
    });
  }
  Specs() {
    return this.specs;
  }
  Suites() {
    return this.suitesOverrides;
  }
  Given() {
    return this.givenOverides;
  }
  When() {
    return this.whenOverides;
  }
  Then() {
    return this.thenOverides;
  }
  Check() {
    return this.checkOverides;
  }
};

// ../testeranto/dist/module/lib/classBuilder.js
var ClassBuilder = class extends BaseBuilder {
  constructor(testImplementation, testSpecification, input, suiteKlasser, givenKlasser, whenKlasser, thenKlasser, checkKlasser, testResourceRequirement) {
    const classySuites = Object.entries(testImplementation.suites).reduce((a, [key], index) => {
      a[key] = (somestring, givens, checks) => {
        return new suiteKlasser.prototype.constructor(somestring, index, givens, checks);
      };
      return a;
    }, {});
    const classyGivens = Object.entries(testImplementation.givens).reduce((a, [key, g]) => {
      a[key] = (features, whens, thens, givEn) => {
        return new givenKlasser.prototype.constructor(key, features, whens, thens, testImplementation.givens[key], givEn);
      };
      return a;
    }, {});
    const classyWhens = Object.entries(testImplementation.whens).reduce((a, [key, whEn]) => {
      a[key] = (payload) => {
        return new whenKlasser.prototype.constructor(`${whEn.name}: ${payload && payload.toString()}`, whEn(payload));
      };
      return a;
    }, {});
    const classyThens = Object.entries(testImplementation.thens).reduce((a, [key, thEn]) => {
      a[key] = (expected, x) => {
        return new thenKlasser.prototype.constructor(`${thEn.name}: ${expected && expected.toString()}`, thEn(expected));
      };
      return a;
    }, {});
    const classyChecks = Object.entries(testImplementation.checks).reduce((a, [key, z]) => {
      a[key] = (somestring, features, callback) => {
        return new checkKlasser.prototype.constructor(somestring, features, callback, classyWhens, classyThens);
      };
      return a;
    }, {});
    super(input, classySuites, classyGivens, classyWhens, classyThens, classyChecks, testResourceRequirement, testSpecification);
  }
};

// ../testeranto/dist/module/lib/core.js
var Testeranto = class extends ClassBuilder {
  constructor(input, testSpecification, testImplementation, testResourceRequirement = defaultTestResourceRequirement, testInterface, uberCatcher) {
    const fullTestInterface = DefaultTestInterface(testInterface);
    super(testImplementation, testSpecification, input, class extends BaseSuite {
      afterAll(store, artifactory, pm) {
        return fullTestInterface.afterAll(
          store,
          // (fPath: string, value: unknown) =>
          //   // TODO does not work?
          //   {
          //     artifactory(`afterAll4-${this.name}/${fPath}`, value);
          //   },
          pm
        );
      }
      assertThat(t) {
        fullTestInterface.assertThis(t);
      }
      async setup(s, artifactory, tr, pm) {
        return (fullTestInterface.beforeAll || (async (input2, artifactory2, tr2, pm2) => input2))(
          s,
          this.testResourceConfiguration,
          // artifactory,
          pm
        );
      }
    }, class Given extends BaseGiven {
      constructor() {
        super(...arguments);
        this.uberCatcher = uberCatcher;
      }
      async givenThat(subject, testResource, artifactory, initializer, initialValues, pm) {
        return fullTestInterface.beforeEach(
          subject,
          initializer,
          // artifactory,
          testResource,
          initialValues,
          pm
        );
      }
      afterEach(store, key, artifactory, pm) {
        return new Promise((res) => res(fullTestInterface.afterEach(
          store,
          key,
          // (fPath: string, value: unknown) =>
          //   artifactory(`after/${fPath}`, value),
          pm
        )));
      }
    }, class When extends BaseWhen {
      async andWhen(store, whenCB, testResource, pm) {
        try {
          return await fullTestInterface.andWhen(store, whenCB, testResource, pm);
        } catch (e) {
          throw e;
        }
      }
    }, class Then extends BaseThen {
      async butThen(store, thenCB, testResource, pm) {
        return await fullTestInterface.butThen(store, thenCB, testResource, pm).then((v) => {
          return v;
        }, (e) => {
          console.log(" ERROR ", e);
          throw e;
        });
      }
    }, class Check extends BaseCheck {
      constructor(name, features, checkCallback, whens, thens, initialValues) {
        super(name, features, checkCallback, whens, thens);
        this.initialValues = initialValues;
      }
      async checkThat(subject, testResourceConfiguration, artifactory, pm) {
        return fullTestInterface.beforeEach(
          subject,
          this.initialValues,
          // (fPath: string, value: unknown) =>
          //   artifactory(`before/${fPath}`, value),
          testResourceConfiguration,
          this.initialValues,
          pm
        );
      }
      afterEach(store, key, artifactory, pm) {
        return new Promise((res) => res(fullTestInterface.afterEach(
          store,
          key,
          // (fPath: string, value: unknown) =>
          //   // TODO does not work?
          //   artifactory(`afterEach2-${this.name}/${fPath}`, value),
          pm
        )));
      }
    }, testResourceRequirement);
  }
};

// ../testeranto/dist/module/Web.js
var errorCallback = (e) => {
};
var unhandledrejectionCallback = (event) => {
  console.log("window.addEventListener unhandledrejection", event);
};
var WebTesteranto = class extends Testeranto {
  constructor(input, testSpecification, testImplementation, testResourceRequirement, testInterface) {
    super(input, testSpecification, testImplementation, testResourceRequirement, testInterface, (cb) => {
      window.removeEventListener("error", errorCallback);
      errorCallback = (e) => {
        console.log("window.addEventListener error", e);
        cb(e);
      };
      window.addEventListener("error", errorCallback);
      window.removeEventListener("unhandledrejection", unhandledrejectionCallback);
      window.removeEventListener("unhandledrejection", unhandledrejectionCallback);
      unhandledrejectionCallback = (event) => {
        console.log("window.addEventListener unhandledrejection", event);
        cb({ error: event.reason.message });
      };
      window.addEventListener("unhandledrejection", unhandledrejectionCallback);
    });
  }
  async receiveTestResourceConfig(partialTestResource) {
    const t = partialTestResource;
    const pm = new PM_Web(t);
    const { failed, artifacts, logPromise, features } = await this.testJobs[0].receiveTestResourceConfig(pm);
    return new Promise((res, rej) => {
      res({ features, failed });
    });
  }
};
var Web_default = async (input, testSpecification, testImplementation, testInterface, testResourceRequirement = defaultTestResourceRequirement) => {
  return new WebTesteranto(input, testSpecification, testImplementation, testResourceRequirement, testInterface);
};

export {
  Web_default,
  require_scheduler
};
/*! Bundled license information:

scheduler/cjs/scheduler.development.js:
  (**
   * @license React
   * scheduler.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
