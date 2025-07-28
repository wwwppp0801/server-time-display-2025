var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js
var wt = Object.defineProperty;
var Me = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "Me");
var yt = /* @__PURE__ */ __name((e, t, r) => t in e ? wt(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "yt");
var p = /* @__PURE__ */ __name((e, t, r) => yt(e, typeof t != "symbol" ? t + "" : t, r), "p");
var Ce = /* @__PURE__ */ __name((e, t, r) => t.has(e) || Me("Cannot " + r), "Ce");
var o = /* @__PURE__ */ __name((e, t, r) => (Ce(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "o");
var m = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? Me("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "m");
var u = /* @__PURE__ */ __name((e, t, r, s) => (Ce(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r), "u");
var v = /* @__PURE__ */ __name((e, t, r) => (Ce(e, t, "access private method"), r), "v");
var Ne = /* @__PURE__ */ __name((e, t, r, s) => ({ set _(n) {
  u(e, t, n, r);
}, get _() {
  return o(e, t, s);
} }), "Ne");
var _e = /* @__PURE__ */ __name((e, t, r) => (s, n) => {
  let i = -1;
  return a(0);
  async function a(l) {
    if (l <= i) throw new Error("next() called multiple times");
    i = l;
    let c, h = false, d;
    if (e[l] ? (d = e[l][0][0], s.req.routeIndex = l) : d = l === e.length && n || void 0, d) try {
      c = await d(s, () => a(l + 1));
    } catch (f) {
      if (f instanceof Error && t) s.error = f, c = await t(f, s), h = true;
      else throw f;
    }
    else s.finalized === false && r && (c = await r(s));
    return c && (s.finalized === false || h) && (s.res = c), s;
  }
  __name(a, "a");
}, "_e");
var bt = Symbol();
var Et = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: s = false } = t, i = (e instanceof st ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? Rt(e, { all: r, dot: s }) : {};
}, "Et");
async function Rt(e, t) {
  const r = await e.formData();
  return r ? Ot(r, t) : {};
}
__name(Rt, "Rt");
function Ot(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((s, n) => {
    t.all || n.endsWith("[]") ? jt(r, n, s) : r[n] = s;
  }), t.dot && Object.entries(r).forEach(([s, n]) => {
    s.includes(".") && (At(r, s, n), delete r[s]);
  }), r;
}
__name(Ot, "Ot");
var jt = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "jt");
var At = /* @__PURE__ */ __name((e, t, r) => {
  let s = e;
  const n = t.split(".");
  n.forEach((i, a) => {
    a === n.length - 1 ? s[i] = r : ((!s[i] || typeof s[i] != "object" || Array.isArray(s[i]) || s[i] instanceof File) && (s[i] = /* @__PURE__ */ Object.create(null)), s = s[i]);
  });
}, "At");
var Qe = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "Qe");
var Dt = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = St(e), s = Qe(r);
  return Pt(s, t);
}, "Dt");
var St = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, s) => {
    const n = `@${s}`;
    return t.push([n, r]), n;
  }), { groups: t, path: e };
}, "St");
var Pt = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [s] = t[r];
    for (let n = e.length - 1; n >= 0; n--) if (e[n].includes(s)) {
      e[n] = e[n].replace(s, t[r][1]);
      break;
    }
  }
  return e;
}, "Pt");
var be = {};
var Ct = /* @__PURE__ */ __name((e, t) => {
  if (e === "*") return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const s = `${e}#${t}`;
    return be[s] || (r[2] ? be[s] = t && t[0] !== ":" && t[0] !== "*" ? [s, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : be[s] = [e, r[1], true]), be[s];
  }
  return null;
}, "Ct");
var ke = /* @__PURE__ */ __name((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return t(r);
      } catch {
        return r;
      }
    });
  }
}, "ke");
var Tt = /* @__PURE__ */ __name((e) => ke(e, decodeURI), "Tt");
var Ze = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.charCodeAt(9) === 58 ? 13 : 8);
  let s = r;
  for (; s < t.length; s++) {
    const n = t.charCodeAt(s);
    if (n === 37) {
      const i = t.indexOf("?", s), a = t.slice(r, i === -1 ? void 0 : i);
      return Tt(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (n === 63) break;
  }
  return t.slice(r, s);
}, "Ze");
var Ht = /* @__PURE__ */ __name((e) => {
  const t = Ze(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Ht");
var te = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = te(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "te");
var et = /* @__PURE__ */ __name((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":")) return null;
  const t = e.split("/"), r = [];
  let s = "";
  return t.forEach((n) => {
    if (n !== "" && !/\:/.test(n)) s += "/" + n;
    else if (/\:/.test(n)) if (/\?/.test(n)) {
      r.length === 0 && s === "" ? r.push("/") : r.push(s);
      const i = n.replace("?", "");
      s += "/" + i, r.push(s);
    } else s += "/" + n;
  }), r.filter((n, i, a) => a.indexOf(n) === i);
}, "et");
var Te = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? ke(e, rt) : e) : e, "Te");
var tt = /* @__PURE__ */ __name((e, t, r) => {
  let s;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf(`?${t}`, 8);
    for (a === -1 && (a = e.indexOf(`&${t}`, 8)); a !== -1; ) {
      const l = e.charCodeAt(a + t.length + 1);
      if (l === 61) {
        const c = a + t.length + 2, h = e.indexOf("&", c);
        return Te(e.slice(c, h === -1 ? void 0 : h));
      } else if (l == 38 || isNaN(l)) return "";
      a = e.indexOf(`&${t}`, a + 1);
    }
    if (s = /[%+]/.test(e), !s) return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(e));
  let i = e.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = e.indexOf("&", i + 1);
    let l = e.indexOf("=", i);
    l > a && a !== -1 && (l = -1);
    let c = e.slice(i + 1, l === -1 ? a === -1 ? void 0 : a : l);
    if (s && (c = Te(c)), i = a, c === "") continue;
    let h;
    l === -1 ? h = "" : (h = e.slice(l + 1, a === -1 ? void 0 : a), s && (h = Te(h))), r ? (n[c] && Array.isArray(n[c]) || (n[c] = []), n[c].push(h)) : n[c] ?? (n[c] = h);
  }
  return t ? n[t] : n;
}, "tt");
var $t = tt;
var It = /* @__PURE__ */ __name((e, t) => tt(e, t, true), "It");
var rt = decodeURIComponent;
var Fe = /* @__PURE__ */ __name((e) => ke(e, rt), "Fe");
var se;
var D;
var N;
var nt;
var it;
var $e;
var F;
var ze;
var st = (ze = class {
  static {
    __name(this, "ze");
  }
  constructor(e, t = "/", r = [[]]) {
    m(this, N);
    p(this, "raw");
    m(this, se);
    m(this, D);
    p(this, "routeIndex", 0);
    p(this, "path");
    p(this, "bodyCache", {});
    m(this, F, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, s = t2[e2];
      if (s) return s;
      const n = Object.keys(t2)[0];
      return n ? t2[n].then((i) => (n === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, u(this, D, r), u(this, se, {});
  }
  param(e) {
    return e ? v(this, N, nt).call(this, e) : v(this, N, it).call(this);
  }
  query(e) {
    return $t(this.url, e);
  }
  queries(e) {
    return It(this.url, e);
  }
  header(e) {
    if (e) return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((r, s) => {
      t[s] = r;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Et(this, e));
  }
  json() {
    return o(this, F).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return o(this, F).call(this, "text");
  }
  arrayBuffer() {
    return o(this, F).call(this, "arrayBuffer");
  }
  blob() {
    return o(this, F).call(this, "blob");
  }
  formData() {
    return o(this, F).call(this, "formData");
  }
  addValidatedData(e, t) {
    o(this, se)[e] = t;
  }
  valid(e) {
    return o(this, se)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [bt]() {
    return o(this, D);
  }
  get matchedRoutes() {
    return o(this, D)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return o(this, D)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, se = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakSet(), nt = /* @__PURE__ */ __name(function(e) {
  const t = o(this, D)[0][this.routeIndex][1][e], r = v(this, N, $e).call(this, t);
  return r ? /\%/.test(r) ? Fe(r) : r : void 0;
}, "nt"), it = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(o(this, D)[0][this.routeIndex][1]);
  for (const r of t) {
    const s = v(this, N, $e).call(this, o(this, D)[0][this.routeIndex][1][r]);
    s && typeof s == "string" && (e[r] = /\%/.test(s) ? Fe(s) : s);
  }
  return e;
}, "it"), $e = /* @__PURE__ */ __name(function(e) {
  return o(this, D)[1] ? o(this, D)[1][e] : e;
}, "$e"), F = /* @__PURE__ */ new WeakMap(), ze);
var kt = { Stringify: 1 };
var ot = /* @__PURE__ */ __name(async (e, t, r, s, n) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (n ? n[0] += e : n = [e], Promise.all(i.map((l) => l({ phase: t, buffer: n, context: s }))).then((l) => Promise.all(l.filter(Boolean).map((c) => ot(c, t, false, s, n))).then(() => n[0]))) : Promise.resolve(e);
}, "ot");
var Lt = "text/plain; charset=UTF-8";
var He = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "He");
var pe;
var me;
var I;
var ne;
var k;
var O;
var ge;
var ie;
var oe;
var G;
var ve;
var xe;
var U;
var re;
var Be;
var Mt = (Be = class {
  static {
    __name(this, "Be");
  }
  constructor(e, t) {
    m(this, U);
    m(this, pe);
    m(this, me);
    p(this, "env", {});
    m(this, I);
    p(this, "finalized", false);
    p(this, "error");
    m(this, ne);
    m(this, k);
    m(this, O);
    m(this, ge);
    m(this, ie);
    m(this, oe);
    m(this, G);
    m(this, ve);
    m(this, xe);
    p(this, "render", (...e2) => (o(this, ie) ?? u(this, ie, (t2) => this.html(t2)), o(this, ie).call(this, ...e2)));
    p(this, "setLayout", (e2) => u(this, ge, e2));
    p(this, "getLayout", () => o(this, ge));
    p(this, "setRenderer", (e2) => {
      u(this, ie, e2);
    });
    p(this, "header", (e2, t2, r) => {
      this.finalized && u(this, O, new Response(o(this, O).body, o(this, O)));
      const s = o(this, O) ? o(this, O).headers : o(this, G) ?? u(this, G, new Headers());
      t2 === void 0 ? s.delete(e2) : r != null && r.append ? s.append(e2, t2) : s.set(e2, t2);
    });
    p(this, "status", (e2) => {
      u(this, ne, e2);
    });
    p(this, "set", (e2, t2) => {
      o(this, I) ?? u(this, I, /* @__PURE__ */ new Map()), o(this, I).set(e2, t2);
    });
    p(this, "get", (e2) => o(this, I) ? o(this, I).get(e2) : void 0);
    p(this, "newResponse", (...e2) => v(this, U, re).call(this, ...e2));
    p(this, "body", (e2, t2, r) => v(this, U, re).call(this, e2, t2, r));
    p(this, "text", (e2, t2, r) => !o(this, G) && !o(this, ne) && !t2 && !r && !this.finalized ? new Response(e2) : v(this, U, re).call(this, e2, t2, He(Lt, r)));
    p(this, "json", (e2, t2, r) => v(this, U, re).call(this, JSON.stringify(e2), t2, He("application/json", r)));
    p(this, "html", (e2, t2, r) => {
      const s = /* @__PURE__ */ __name((n) => v(this, U, re).call(this, n, t2, He("text/html; charset=UTF-8", r)), "s");
      return typeof e2 == "object" ? ot(e2, kt.Stringify, false, {}).then(s) : s(e2);
    });
    p(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    p(this, "notFound", () => (o(this, oe) ?? u(this, oe, () => new Response()), o(this, oe).call(this, this)));
    u(this, pe, e), t && (u(this, k, t.executionCtx), this.env = t.env, u(this, oe, t.notFoundHandler), u(this, xe, t.path), u(this, ve, t.matchResult));
  }
  get req() {
    return o(this, me) ?? u(this, me, new st(o(this, pe), o(this, xe), o(this, ve))), o(this, me);
  }
  get event() {
    if (o(this, k) && "respondWith" in o(this, k)) return o(this, k);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (o(this, k)) return o(this, k);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return o(this, O) || u(this, O, new Response(null, { headers: o(this, G) ?? u(this, G, new Headers()) }));
  }
  set res(e) {
    if (o(this, O) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of o(this, O).headers.entries()) if (t !== "content-type") if (t === "set-cookie") {
        const s = o(this, O).headers.getSetCookie();
        e.headers.delete("set-cookie");
        for (const n of s) e.headers.append("set-cookie", n);
      } else e.headers.set(t, r);
    }
    u(this, O, e), this.finalized = true;
  }
  get var() {
    return o(this, I) ? Object.fromEntries(o(this, I)) : {};
  }
}, pe = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakSet(), re = /* @__PURE__ */ __name(function(e, t, r) {
  const s = o(this, O) ? new Headers(o(this, O).headers) : o(this, G) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [a, l] of i) a.toLowerCase() === "set-cookie" ? s.append(a, l) : s.set(a, l);
  }
  if (r) for (const [i, a] of Object.entries(r)) if (typeof a == "string") s.set(i, a);
  else {
    s.delete(i);
    for (const l of a) s.append(i, l);
  }
  const n = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? o(this, ne);
  return new Response(e, { status: n, headers: s });
}, "re"), Be);
var w = "ALL";
var Nt = "all";
var _t = ["get", "post", "put", "delete", "options", "patch"];
var at = "Can not add a route since the matcher is already built.";
var ct = class extends Error {
  static {
    __name(this, "ct");
  }
};
var Ft = "__COMPOSED_HANDLER";
var Ut = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "Ut");
var Ue = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Ue");
var S;
var y;
var ht;
var P;
var W;
var Ee;
var Re;
var Ve;
var lt = (Ve = class {
  static {
    __name(this, "Ve");
  }
  constructor(t = {}) {
    m(this, y);
    p(this, "get");
    p(this, "post");
    p(this, "put");
    p(this, "delete");
    p(this, "options");
    p(this, "patch");
    p(this, "all");
    p(this, "on");
    p(this, "use");
    p(this, "router");
    p(this, "getPath");
    p(this, "_basePath", "/");
    m(this, S, "/");
    p(this, "routes", []);
    m(this, P, Ut);
    p(this, "errorHandler", Ue);
    p(this, "onError", (t2) => (this.errorHandler = t2, this));
    p(this, "notFound", (t2) => (u(this, P, t2), this));
    p(this, "fetch", (t2, ...r) => v(this, y, Re).call(this, t2, r[1], r[0], t2.method));
    p(this, "request", (t2, r, s2, n2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, s2, n2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${te("/", t2)}`, r), s2, n2)));
    p(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(v(this, y, Re).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [..._t, Nt].forEach((i) => {
      this[i] = (a, ...l) => (typeof a == "string" ? u(this, S, a) : v(this, y, W).call(this, i, o(this, S), a), l.forEach((c) => {
        v(this, y, W).call(this, i, o(this, S), c);
      }), this);
    }), this.on = (i, a, ...l) => {
      for (const c of [a].flat()) {
        u(this, S, c);
        for (const h of [i].flat()) l.map((d) => {
          v(this, y, W).call(this, h.toUpperCase(), o(this, S), d);
        });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? u(this, S, i) : (u(this, S, "*"), a.unshift(i)), a.forEach((l) => {
      v(this, y, W).call(this, w, o(this, S), l);
    }), this);
    const { strict: s, ...n } = t;
    Object.assign(this, n), this.getPath = s ?? true ? t.getPath ?? Ze : Ht;
  }
  route(t, r) {
    const s = this.basePath(t);
    return r.routes.map((n) => {
      var a;
      let i;
      r.errorHandler === Ue ? i = n.handler : (i = /* @__PURE__ */ __name(async (l, c) => (await _e([], r.errorHandler)(l, () => n.handler(l, c))).res, "i"), i[Ft] = n.handler), v(a = s, y, W).call(a, n.method, n.path, i);
    }), this;
  }
  basePath(t) {
    const r = v(this, y, ht).call(this);
    return r._basePath = te(this._basePath, t), r;
  }
  mount(t, r, s) {
    let n, i;
    s && (typeof s == "function" ? i = s : (i = s.optionHandler, s.replaceRequest === false ? n = /* @__PURE__ */ __name((c) => c, "n") : n = s.replaceRequest));
    const a = i ? (c) => {
      const h = i(c);
      return Array.isArray(h) ? h : [h];
    } : (c) => {
      let h;
      try {
        h = c.executionCtx;
      } catch {
      }
      return [c.env, h];
    };
    n || (n = (() => {
      const c = te(this._basePath, t), h = c === "/" ? 0 : c.length;
      return (d) => {
        const f = new URL(d.url);
        return f.pathname = f.pathname.slice(h) || "/", new Request(f, d);
      };
    })());
    const l = /* @__PURE__ */ __name(async (c, h) => {
      const d = await r(n(c.req.raw), ...a(c));
      if (d) return d;
      await h();
    }, "l");
    return v(this, y, W).call(this, w, te(t, "*"), l), this;
  }
}, S = /* @__PURE__ */ new WeakMap(), y = /* @__PURE__ */ new WeakSet(), ht = /* @__PURE__ */ __name(function() {
  const t = new lt({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, u(t, P, o(this, P)), t.routes = this.routes, t;
}, "ht"), P = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ __name(function(t, r, s) {
  t = t.toUpperCase(), r = te(this._basePath, r);
  const n = { basePath: this._basePath, path: r, method: t, handler: s };
  this.router.add(t, r, [s, n]), this.routes.push(n);
}, "W"), Ee = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error) return this.errorHandler(t, r);
  throw t;
}, "Ee"), Re = /* @__PURE__ */ __name(function(t, r, s, n) {
  if (n === "HEAD") return (async () => new Response(null, await v(this, y, Re).call(this, t, r, s, "GET")))();
  const i = this.getPath(t, { env: s }), a = this.router.match(n, i), l = new Mt(t, { path: i, matchResult: a, env: s, executionCtx: r, notFoundHandler: o(this, P) });
  if (a[0].length === 1) {
    let h;
    try {
      h = a[0][0][0][0](l, async () => {
        l.res = await o(this, P).call(this, l);
      });
    } catch (d) {
      return v(this, y, Ee).call(this, d, l);
    }
    return h instanceof Promise ? h.then((d) => d || (l.finalized ? l.res : o(this, P).call(this, l))).catch((d) => v(this, y, Ee).call(this, d, l)) : h ?? o(this, P).call(this, l);
  }
  const c = _e(a[0], this.errorHandler, o(this, P));
  return (async () => {
    try {
      const h = await c(l);
      if (!h.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return h.res;
    } catch (h) {
      return v(this, y, Ee).call(this, h, l);
    }
  })();
}, "Re"), Ve);
var je = "[^/]+";
var ue = ".*";
var fe = "(?:|/.*)";
var de = Symbol();
var qt = new Set(".\\+*[^]$()");
function zt(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === ue || e === fe ? 1 : t === ue || t === fe ? -1 : e === je ? 1 : t === je ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(zt, "zt");
var Y;
var X;
var C;
var We;
var Ie = (We = class {
  static {
    __name(this, "We");
  }
  constructor() {
    m(this, Y);
    m(this, X);
    m(this, C, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, s, n, i) {
    if (t.length === 0) {
      if (o(this, Y) !== void 0) throw de;
      if (i) return;
      u(this, Y, r);
      return;
    }
    const [a, ...l] = t, c = a === "*" ? l.length === 0 ? ["", "", ue] : ["", "", je] : a === "/*" ? ["", "", fe] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let h;
    if (c) {
      const d = c[1];
      let f = c[2] || je;
      if (d && c[2] && (f = f.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(f))) throw de;
      if (h = o(this, C)[f], !h) {
        if (Object.keys(o(this, C)).some((g) => g !== ue && g !== fe)) throw de;
        if (i) return;
        h = o(this, C)[f] = new Ie(), d !== "" && u(h, X, n.varIndex++);
      }
      !i && d !== "" && s.push([d, o(h, X)]);
    } else if (h = o(this, C)[a], !h) {
      if (Object.keys(o(this, C)).some((d) => d.length > 1 && d !== ue && d !== fe)) throw de;
      if (i) return;
      h = o(this, C)[a] = new Ie();
    }
    h.insert(l, r, s, n, i);
  }
  buildRegExpStr() {
    const r = Object.keys(o(this, C)).sort(zt).map((s) => {
      const n = o(this, C)[s];
      return (typeof o(n, X) == "number" ? `(${s})@${o(n, X)}` : qt.has(s) ? `\\${s}` : s) + n.buildRegExpStr();
    });
    return typeof o(this, Y) == "number" && r.unshift(`#${o(this, Y)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, Y = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), C = /* @__PURE__ */ new WeakMap(), We);
var Ae;
var we;
var Ke;
var Bt = (Ke = class {
  static {
    __name(this, "Ke");
  }
  constructor() {
    m(this, Ae, { varIndex: 0 });
    m(this, we, new Ie());
  }
  insert(e, t, r) {
    const s = [], n = [];
    for (let a = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (c) => {
        const h = `@\\${a}`;
        return n[a] = [h, c], a++, l = true, h;
      }), !l) break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = n.length - 1; a >= 0; a--) {
      const [l] = n[a];
      for (let c = i.length - 1; c >= 0; c--) if (i[c].indexOf(l) !== -1) {
        i[c] = i[c].replace(l, n[a][1]);
        break;
      }
    }
    return o(this, we).insert(i, t, s, o(this, Ae), r), s;
  }
  buildRegExp() {
    let e = o(this, we).buildRegExpStr();
    if (e === "") return [/^$/, [], []];
    let t = 0;
    const r = [], s = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (s[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, s];
  }
}, Ae = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Ke);
var dt = [];
var Vt = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Oe = /* @__PURE__ */ Object.create(null);
function ut(e) {
  return Oe[e] ?? (Oe[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(ut, "ut");
function Wt() {
  Oe = /* @__PURE__ */ Object.create(null);
}
__name(Wt, "Wt");
function Kt(e) {
  var h;
  const t = new Bt(), r = [];
  if (e.length === 0) return Vt;
  const s = e.map((d) => [!/\*|\/:/.test(d[0]), ...d]).sort(([d, f], [g, E]) => d ? 1 : g ? -1 : f.length - E.length), n = /* @__PURE__ */ Object.create(null);
  for (let d = 0, f = -1, g = s.length; d < g; d++) {
    const [E, T, x] = s[d];
    E ? n[T] = [x.map(([A]) => [A, /* @__PURE__ */ Object.create(null)]), dt] : f++;
    let j;
    try {
      j = t.insert(T, f, E);
    } catch (A) {
      throw A === de ? new ct(T) : A;
    }
    E || (r[f] = x.map(([A, Z]) => {
      const le = /* @__PURE__ */ Object.create(null);
      for (Z -= 1; Z >= 0; Z--) {
        const [H, Se] = j[Z];
        le[H] = Se;
      }
      return [A, le];
    }));
  }
  const [i, a, l] = t.buildRegExp();
  for (let d = 0, f = r.length; d < f; d++) for (let g = 0, E = r[d].length; g < E; g++) {
    const T = (h = r[d][g]) == null ? void 0 : h[1];
    if (!T) continue;
    const x = Object.keys(T);
    for (let j = 0, A = x.length; j < A; j++) T[x[j]] = l[T[x[j]]];
  }
  const c = [];
  for (const d in a) c[d] = r[a[d]];
  return [i, c, n];
}
__name(Kt, "Kt");
function ee(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((s, n) => n.length - s.length)) if (ut(r).test(t)) return [...e[r]];
  }
}
__name(ee, "ee");
var q;
var z;
var ce;
var ft;
var pt;
var Ge;
var Gt = (Ge = class {
  static {
    __name(this, "Ge");
  }
  constructor() {
    m(this, ce);
    p(this, "name", "RegExpRouter");
    m(this, q);
    m(this, z);
    u(this, q, { [w]: /* @__PURE__ */ Object.create(null) }), u(this, z, { [w]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const s = o(this, q), n = o(this, z);
    if (!s || !n) throw new Error(at);
    s[e] || [s, n].forEach((c) => {
      c[e] = /* @__PURE__ */ Object.create(null), Object.keys(c[w]).forEach((h) => {
        c[e][h] = [...c[w][h]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const c = ut(t);
      e === w ? Object.keys(s).forEach((h) => {
        var d;
        (d = s[h])[t] || (d[t] = ee(s[h], t) || ee(s[w], t) || []);
      }) : (l = s[e])[t] || (l[t] = ee(s[e], t) || ee(s[w], t) || []), Object.keys(s).forEach((h) => {
        (e === w || e === h) && Object.keys(s[h]).forEach((d) => {
          c.test(d) && s[h][d].push([r, i]);
        });
      }), Object.keys(n).forEach((h) => {
        (e === w || e === h) && Object.keys(n[h]).forEach((d) => c.test(d) && n[h][d].push([r, i]));
      });
      return;
    }
    const a = et(t) || [t];
    for (let c = 0, h = a.length; c < h; c++) {
      const d = a[c];
      Object.keys(n).forEach((f) => {
        var g;
        (e === w || e === f) && ((g = n[f])[d] || (g[d] = [...ee(s[f], d) || ee(s[w], d) || []]), n[f][d].push([r, i - h + c + 1]));
      });
    }
  }
  match(e, t) {
    Wt();
    const r = v(this, ce, ft).call(this);
    return this.match = (s, n) => {
      const i = r[s] || r[w], a = i[2][n];
      if (a) return a;
      const l = n.match(i[0]);
      if (!l) return [[], dt];
      const c = l.indexOf("", 1);
      return [i[1][c], l];
    }, this.match(e, t);
  }
}, q = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakSet(), ft = /* @__PURE__ */ __name(function() {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.keys(o(this, z)).concat(Object.keys(o(this, q))).forEach((t) => {
    e[t] || (e[t] = v(this, ce, pt).call(this, t));
  }), u(this, q, u(this, z, void 0)), e;
}, "ft"), pt = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === w;
  return [o(this, q), o(this, z)].forEach((s) => {
    const n = s[e] ? Object.keys(s[e]).map((i) => [i, s[e][i]]) : [];
    n.length !== 0 ? (r || (r = true), t.push(...n)) : e !== w && t.push(...Object.keys(s[w]).map((i) => [i, s[w][i]]));
  }), r ? Kt(t) : null;
}, "pt"), Ge);
var B;
var L;
var Ye;
var Yt = (Ye = class {
  static {
    __name(this, "Ye");
  }
  constructor(e) {
    p(this, "name", "SmartRouter");
    m(this, B, []);
    m(this, L, []);
    u(this, B, e.routers);
  }
  add(e, t, r) {
    if (!o(this, L)) throw new Error(at);
    o(this, L).push([e, t, r]);
  }
  match(e, t) {
    if (!o(this, L)) throw new Error("Fatal error");
    const r = o(this, B), s = o(this, L), n = r.length;
    let i = 0, a;
    for (; i < n; i++) {
      const l = r[i];
      try {
        for (let c = 0, h = s.length; c < h; c++) l.add(...s[c]);
        a = l.match(e, t);
      } catch (c) {
        if (c instanceof ct) continue;
        throw c;
      }
      this.match = l.match.bind(l), u(this, B, [l]), u(this, L, void 0);
      break;
    }
    if (i === n) throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (o(this, L) || o(this, B).length !== 1) throw new Error("No active router has been determined yet.");
    return o(this, B)[0];
  }
}, B = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), Ye);
var he = /* @__PURE__ */ Object.create(null);
var V;
var R;
var J;
var ae;
var b;
var M;
var K;
var Xe;
var mt = (Xe = class {
  static {
    __name(this, "Xe");
  }
  constructor(e, t, r) {
    m(this, M);
    m(this, V);
    m(this, R);
    m(this, J);
    m(this, ae, 0);
    m(this, b, he);
    if (u(this, R, r || /* @__PURE__ */ Object.create(null)), u(this, V, []), e && t) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: t, possibleKeys: [], score: 0 }, u(this, V, [s]);
    }
    u(this, J, []);
  }
  insert(e, t, r) {
    u(this, ae, ++Ne(this, ae)._);
    let s = this;
    const n = Dt(t), i = [];
    for (let a = 0, l = n.length; a < l; a++) {
      const c = n[a], h = n[a + 1], d = Ct(c, h), f = Array.isArray(d) ? d[0] : c;
      if (f in o(s, R)) {
        s = o(s, R)[f], d && i.push(d[1]);
        continue;
      }
      o(s, R)[f] = new mt(), d && (o(s, J).push(d), i.push(d[1])), s = o(s, R)[f];
    }
    return o(s, V).push({ [e]: { handler: r, possibleKeys: i.filter((a, l, c) => c.indexOf(a) === l), score: o(this, ae) } }), s;
  }
  search(e, t) {
    var l;
    const r = [];
    u(this, b, he);
    let n = [this];
    const i = Qe(t), a = [];
    for (let c = 0, h = i.length; c < h; c++) {
      const d = i[c], f = c === h - 1, g = [];
      for (let E = 0, T = n.length; E < T; E++) {
        const x = n[E], j = o(x, R)[d];
        j && (u(j, b, o(x, b)), f ? (o(j, R)["*"] && r.push(...v(this, M, K).call(this, o(j, R)["*"], e, o(x, b))), r.push(...v(this, M, K).call(this, j, e, o(x, b)))) : g.push(j));
        for (let A = 0, Z = o(x, J).length; A < Z; A++) {
          const le = o(x, J)[A], H = o(x, b) === he ? {} : { ...o(x, b) };
          if (le === "*") {
            const _ = o(x, R)["*"];
            _ && (r.push(...v(this, M, K).call(this, _, e, o(x, b))), u(_, b, H), g.push(_));
            continue;
          }
          if (!d) continue;
          const [Se, Le, ye] = le, $ = o(x, R)[Se], xt = i.slice(c).join("/");
          if (ye instanceof RegExp) {
            const _ = ye.exec(xt);
            if (_) {
              if (H[Le] = _[0], r.push(...v(this, M, K).call(this, $, e, o(x, b), H)), Object.keys(o($, R)).length) {
                u($, b, H);
                const Pe = ((l = _[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (a[Pe] || (a[Pe] = [])).push($);
              }
              continue;
            }
          }
          (ye === true || ye.test(d)) && (H[Le] = d, f ? (r.push(...v(this, M, K).call(this, $, e, H, o(x, b))), o($, R)["*"] && r.push(...v(this, M, K).call(this, o($, R)["*"], e, H, o(x, b)))) : (u($, b, H), g.push($)));
        }
      }
      n = g.concat(a.shift() ?? []);
    }
    return r.length > 1 && r.sort((c, h) => c.score - h.score), [r.map(({ handler: c, params: h }) => [c, h])];
  }
}, V = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), b = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet(), K = /* @__PURE__ */ __name(function(e, t, r, s) {
  const n = [];
  for (let i = 0, a = o(e, V).length; i < a; i++) {
    const l = o(e, V)[i], c = l[t] || l[w], h = {};
    if (c !== void 0 && (c.params = /* @__PURE__ */ Object.create(null), n.push(c), r !== he || s && s !== he)) for (let d = 0, f = c.possibleKeys.length; d < f; d++) {
      const g = c.possibleKeys[d], E = h[c.score];
      c.params[g] = s != null && s[g] && !E ? s[g] : r[g] ?? (s == null ? void 0 : s[g]), h[c.score] = true;
    }
  }
  return n;
}, "K"), Xe);
var Q;
var Je;
var Xt = (Je = class {
  static {
    __name(this, "Je");
  }
  constructor() {
    p(this, "name", "TrieRouter");
    m(this, Q);
    u(this, Q, new mt());
  }
  add(e, t, r) {
    const s = et(t);
    if (s) {
      for (let n = 0, i = s.length; n < i; n++) o(this, Q).insert(e, s[n], r);
      return;
    }
    o(this, Q).insert(e, t, r);
  }
  match(e, t) {
    return o(this, Q).search(e, t);
  }
}, Q = /* @__PURE__ */ new WeakMap(), Je);
var gt = class extends lt {
  static {
    __name(this, "gt");
  }
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Yt({ routers: [new Gt(), new Xt()] });
  }
};
var Jt = /* @__PURE__ */ __name((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, s = /* @__PURE__ */ ((i) => typeof i == "string" ? i === "*" ? () => i : (a) => i === a ? a : null : typeof i == "function" ? i : (a) => i.includes(a) ? a : null)(r.origin), n = ((i) => typeof i == "function" ? i : Array.isArray(i) ? () => i : () => [])(r.allowMethods);
  return async function(a, l) {
    var d;
    function c(f, g) {
      a.res.headers.set(f, g);
    }
    __name(c, "c");
    const h = s(a.req.header("origin") || "", a);
    if (h && c("Access-Control-Allow-Origin", h), r.origin !== "*") {
      const f = a.req.header("Vary");
      f ? c("Vary", f) : c("Vary", "Origin");
    }
    if (r.credentials && c("Access-Control-Allow-Credentials", "true"), (d = r.exposeHeaders) != null && d.length && c("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), a.req.method === "OPTIONS") {
      r.maxAge != null && c("Access-Control-Max-Age", r.maxAge.toString());
      const f = n(a.req.header("origin") || "", a);
      f.length && c("Access-Control-Allow-Methods", f.join(","));
      let g = r.allowHeaders;
      if (!(g != null && g.length)) {
        const E = a.req.header("Access-Control-Request-Headers");
        E && (g = E.split(/\s*,\s*/));
      }
      return g != null && g.length && (c("Access-Control-Allow-Headers", g.join(",")), a.res.headers.append("Vary", "Access-Control-Request-Headers")), a.res.headers.delete("Content-Length"), a.res.headers.delete("Content-Type"), new Response(null, { headers: a.res.headers, status: 204, statusText: "No Content" });
    }
    await l();
  };
}, "Jt");
var De = new gt();
De.use("/api/*", Jt());
De.get("/api/time", (e) => {
  const t = /* @__PURE__ */ new Date();
  return e.json({ utc: t.toISOString(), timestamp: t.getTime(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, formatted: { local: t.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }), utc: t.toUTCString(), iso: t.toISOString() } });
});
De.get("/", (e) => e.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\u670D\u52A1\u5668\u65F6\u95F4\u663E\u793A</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            /* \u670D\u52A1\u5668\u65F6\u95F4\u663E\u793A\u6837\u5F0F */
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }

            /* \u6570\u5B57\u65F6\u949F\u5B57\u4F53 */
            .font-mono {
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            }

            /* \u52A8\u753B\u6548\u679C */
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .animate-pulse {
                animation: pulse 2s infinite;
            }

            /* \u54CD\u5E94\u5F0F\u8C03\u6574 */
            @media (max-width: 768px) {
                .text-3xl {
                    font-size: 1.5rem;
                }
                
                .text-4xl {
                    font-size: 2rem;
                }
            }

            /* \u73BB\u7483\u6548\u679C\u589E\u5F3A */
            .backdrop-blur-lg {
                backdrop-filter: blur(20px);
            }

            .backdrop-blur-sm {
                backdrop-filter: blur(8px);
            }

            /* \u6E10\u53D8\u80CC\u666F */
            .bg-gradient-to-br {
                background: linear-gradient(to bottom right, #1e3a8a, #7c3aed);
            }

            /* \u52A0\u8F7D\u52A8\u753B */
            .loading {
                animation: fadeIn 0.5s ease-in-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* \u5361\u7247\u60AC\u505C\u6548\u679C */
            .bg-white\\/20:hover {
                background-color: rgba(255, 255, 255, 0.25);
                transition: background-color 0.3s ease;
            }

            /* \u6309\u94AE\u6837\u5F0F */
            button {
                transition: all 0.2s ease;
            }

            button:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        </style>
    </head>
    <body class="bg-gradient-to-br from-blue-900 to-purple-900 min-h-screen flex items-center justify-center">
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-2xl w-full mx-4">
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-white mb-2">
                    <i class="fas fa-clock mr-3 text-blue-300"></i>
                    \u670D\u52A1\u5668\u65F6\u95F4
                </h1>
                <p class="text-blue-200">\u5B9E\u65F6\u663E\u793A\u670D\u52A1\u5668\u65F6\u95F4\u4FE1\u606F</p>
            </div>
            
            <div id="time-display" class="space-y-6">
                <div class="loading text-center text-white">
                    <i class="fas fa-spinner fa-spin text-3xl"></i>
                    <p class="mt-2">\u6B63\u5728\u83B7\u53D6\u65F6\u95F4...</p>
                </div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script>
            // \u670D\u52A1\u5668\u65F6\u95F4\u663E\u793A\u5E94\u7528
            class ServerTimeDisplay {
                constructor() {
                    this.timeDisplay = document.getElementById('time-display');
                    this.updateInterval = null;
                    this.init();
                }

                async init() {
                    try {
                        await this.fetchServerTime();
                        this.startAutoUpdate();
                    } catch (error) {
                        this.showError('\u65E0\u6CD5\u83B7\u53D6\u670D\u52A1\u5668\u65F6\u95F4');
                    }
                }

                async fetchServerTime() {
                    try {
                        const response = await axios.get('/api/time');
                        const timeData = response.data;
                        this.displayTime(timeData);
                    } catch (error) {
                        console.error('\u83B7\u53D6\u670D\u52A1\u5668\u65F6\u95F4\u5931\u8D25:', error);
                        throw error;
                    }
                }

                displayTime(timeData) {
                    const now = new Date();
                    const serverTime = new Date(timeData.utc);
                    const timeDiff = Math.abs(now.getTime() - serverTime.getTime());
                    
                    this.timeDisplay.innerHTML = \`
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- \u4E3B\u65F6\u95F4\u663E\u793A -->
                            <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                                <div class="text-center">
                                    <div class="text-sm text-blue-200 mb-2">\u670D\u52A1\u5668\u65F6\u95F4</div>
                                    <div class="text-3xl font-mono font-bold text-white mb-2" id="server-time">
                                        \${this.formatTime(serverTime)}
                                    </div>
                                    <div class="text-sm text-blue-200">
                                        \${this.formatDate(serverTime)}
                                    </div>
                                </div>
                            </div>

                            <!-- \u672C\u5730\u65F6\u95F4\u5BF9\u6BD4 -->
                            <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                                <div class="text-center">
                                    <div class="text-sm text-blue-200 mb-2">\u672C\u5730\u65F6\u95F4</div>
                                    <div class="text-3xl font-mono font-bold text-white mb-2" id="local-time">
                                        \${this.formatTime(now)}
                                    </div>
                                    <div class="text-sm text-blue-200">
                                        \${this.formatDate(now)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- \u8BE6\u7EC6\u4FE1\u606F -->
                        <div class="mt-6 bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                                <i class="fas fa-info-circle mr-2"></i>
                                \u8BE6\u7EC6\u4FE1\u606F
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div class="text-blue-200">UTC \u65F6\u95F4:</div>
                                    <div class="text-white font-mono">\${timeData.formatted.utc}</div>
                                </div>
                                <div>
                                    <div class="text-blue-200">ISO \u683C\u5F0F:</div>
                                    <div class="text-white font-mono text-xs">\${timeData.formatted.iso}</div>
                                </div>
                                <div>
                                    <div class="text-blue-200">\u65F6\u95F4\u6233:</div>
                                    <div class="text-white font-mono">\${timeData.timestamp}</div>
                                </div>
                                <div>
                                    <div class="text-blue-200">\u65F6\u5DEE:</div>
                                    <div class="text-white font-mono \${timeDiff > 1000 ? 'text-yellow-300' : 'text-green-300'}">
                                        \${timeDiff < 1000 ? '\u540C\u6B65' : \`\${Math.round(timeDiff / 1000)}\u79D2\`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- \u72B6\u6001\u6307\u793A -->
                        <div class="mt-4 flex items-center justify-center space-x-4 text-sm text-blue-200">
                            <div class="flex items-center">
                                <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                \u5B9E\u65F6\u66F4\u65B0\u4E2D
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-sync-alt mr-2"></i>
                                \u6700\u540E\u66F4\u65B0: <span id="last-update">\${this.formatTime(new Date())}</span>
                            </div>
                        </div>
                    \`;
                }

                formatTime(date) {
                    return date.toLocaleTimeString('zh-CN', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                }

                formatDate(date) {
                    return date.toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                    });
                }

                startAutoUpdate() {
                    this.updateInterval = setInterval(() => {
                        this.fetchServerTime();
                    }, 1000);
                }

                showError(message) {
                    this.timeDisplay.innerHTML = \`
                        <div class="text-center text-red-300">
                            <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                            <p class="text-xl">\${message}</p>
                            <button onclick="location.reload()" class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">
                                <i class="fas fa-redo mr-2"></i>
                                \u91CD\u8BD5
                            </button>
                        </div>
                    \`;
                }

                destroy() {
                    if (this.updateInterval) {
                        clearInterval(this.updateInterval);
                    }
                }
            }

            // \u9875\u9762\u52A0\u8F7D\u540E\u521D\u59CB\u5316
            document.addEventListener('DOMContentLoaded', () => {
                window.timeDisplay = new ServerTimeDisplay();
            });

            // \u9875\u9762\u5173\u95ED\u65F6\u6E05\u7406
            window.addEventListener('beforeunload', () => {
                if (window.timeDisplay) {
                    window.timeDisplay.destroy();
                }
            });
        <\/script>
    </body>
    </html>
  `));
var qe = new gt();
var Qt = Object.assign({ "/src/index.tsx": De });
var vt = false;
for (const [, e] of Object.entries(Qt)) e && (qe.all("*", (t) => {
  let r;
  try {
    r = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, r);
}), qe.notFound((t) => {
  let r;
  try {
    r = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, r);
}), vt = true);
if (!vt) throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-GxheKl/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = qe;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-GxheKl/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=bundledWorker-0.3877338907168135.mjs.map
