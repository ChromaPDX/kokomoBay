import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  require_src
} from "./chunk-ECNFXUXQ.mjs";
import {
  NodeWebSocketTransport
} from "./chunk-4CEWYGDD.mjs";
import {
  __commonJS,
  __require,
  __toESM,
  init_cjs_shim
} from "./chunk-4UNHOY6E.mjs";

// ../testeranto/node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "../testeranto/node_modules/wrappy/wrappy.js"(exports, module) {
    init_cjs_shim();
    module.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// ../testeranto/node_modules/once/once.js
var require_once = __commonJS({
  "../testeranto/node_modules/once/once.js"(exports, module) {
    init_cjs_shim();
    var wrappy = require_wrappy();
    module.exports = wrappy(once);
    module.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// ../testeranto/node_modules/end-of-stream/index.js
var require_end_of_stream = __commonJS({
  "../testeranto/node_modules/end-of-stream/index.js"(exports, module) {
    init_cjs_shim();
    var once = require_once();
    var noop2 = function() {
    };
    var isRequest = function(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    };
    var isChildProcess = function(stream) {
      return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
    };
    var eos = function(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop2);
      var ws = stream._writableState;
      var rs = stream._readableState;
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var cancelled = false;
      var onlegacyfinish = function() {
        if (!stream.writable)
          onfinish();
      };
      var onfinish = function() {
        writable = false;
        if (!readable)
          callback.call(stream);
      };
      var onend = function() {
        readable = false;
        if (!writable)
          callback.call(stream);
      };
      var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
      };
      var onerror = function(err) {
        callback.call(stream, err);
      };
      var onclose = function() {
        process.nextTick(onclosenexttick);
      };
      var onclosenexttick = function() {
        if (cancelled)
          return;
        if (readable && !(rs && (rs.ended && !rs.destroyed)))
          return callback.call(stream, new Error("premature close"));
        if (writable && !(ws && (ws.ended && !ws.destroyed)))
          return callback.call(stream, new Error("premature close"));
      };
      var onrequest = function() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !ws) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (isChildProcess(stream))
        stream.on("exit", onexit);
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        cancelled = true;
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("exit", onexit);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    };
    module.exports = eos;
  }
});

// ../testeranto/node_modules/pump/index.js
var require_pump = __commonJS({
  "../testeranto/node_modules/pump/index.js"(exports, module) {
    init_cjs_shim();
    var once = require_once();
    var eos = require_end_of_stream();
    var fs4 = __require("fs");
    var noop2 = function() {
    };
    var ancient = /^v?\.0/.test(process.version);
    var isFn = function(fn) {
      return typeof fn === "function";
    };
    var isFS = function(stream) {
      if (!ancient)
        return false;
      if (!fs4)
        return false;
      return (stream instanceof (fs4.ReadStream || noop2) || stream instanceof (fs4.WriteStream || noop2)) && isFn(stream.close);
    };
    var isRequest = function(stream) {
      return stream.setHeader && isFn(stream.abort);
    };
    var destroyer = function(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      eos(stream, { readable: reading, writable: writing }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isFS(stream))
          return stream.close(noop2);
        if (isRequest(stream))
          return stream.abort();
        if (isFn(stream.destroy))
          return stream.destroy();
        callback(err || new Error("stream was destroyed"));
      };
    };
    var call = function(fn) {
      fn();
    };
    var pipe = function(from, to) {
      return from.pipe(to);
    };
    var pump = function() {
      var streams = Array.prototype.slice.call(arguments);
      var callback = isFn(streams[streams.length - 1] || noop2) && streams.pop() || noop2;
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2)
        throw new Error("pump requires two streams per minimum");
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error)
            error = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    };
    module.exports = pump;
  }
});

// ../testeranto/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = __commonJS({
  "../testeranto/node_modules/get-stream/buffer-stream.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var { PassThrough: PassThroughStream } = __require("stream");
    module.exports = (options) => {
      options = { ...options };
      const { array } = options;
      let { encoding } = options;
      const isBuffer = encoding === "buffer";
      let objectMode = false;
      if (array) {
        objectMode = !(encoding || isBuffer);
      } else {
        encoding = encoding || "utf8";
      }
      if (isBuffer) {
        encoding = null;
      }
      const stream = new PassThroughStream({ objectMode });
      if (encoding) {
        stream.setEncoding(encoding);
      }
      let length = 0;
      const chunks = [];
      stream.on("data", (chunk) => {
        chunks.push(chunk);
        if (objectMode) {
          length = chunks.length;
        } else {
          length += chunk.length;
        }
      });
      stream.getBufferedValue = () => {
        if (array) {
          return chunks;
        }
        return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
      };
      stream.getBufferedLength = () => length;
      return stream;
    };
  }
});

// ../testeranto/node_modules/get-stream/index.js
var require_get_stream = __commonJS({
  "../testeranto/node_modules/get-stream/index.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var { constants: BufferConstants } = __require("buffer");
    var pump = require_pump();
    var bufferStream = require_buffer_stream();
    var MaxBufferError = class extends Error {
      constructor() {
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
      }
    };
    async function getStream(inputStream, options) {
      if (!inputStream) {
        return Promise.reject(new Error("Expected a stream"));
      }
      options = {
        maxBuffer: Infinity,
        ...options
      };
      const { maxBuffer } = options;
      let stream;
      await new Promise((resolve2, reject) => {
        const rejectPromise = (error) => {
          if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
            error.bufferedData = stream.getBufferedValue();
          }
          reject(error);
        };
        stream = pump(inputStream, bufferStream(options), (error) => {
          if (error) {
            rejectPromise(error);
            return;
          }
          resolve2();
        });
        stream.on("data", () => {
          if (stream.getBufferedLength() > maxBuffer) {
            rejectPromise(new MaxBufferError());
          }
        });
      });
      return stream.getBufferedValue();
    }
    module.exports = getStream;
    module.exports.default = getStream;
    module.exports.buffer = (stream, options) => getStream(stream, { ...options, encoding: "buffer" });
    module.exports.array = (stream, options) => getStream(stream, { ...options, array: true });
    module.exports.MaxBufferError = MaxBufferError;
  }
});

// ../testeranto/node_modules/pend/index.js
var require_pend = __commonJS({
  "../testeranto/node_modules/pend/index.js"(exports, module) {
    init_cjs_shim();
    module.exports = Pend;
    function Pend() {
      this.pending = 0;
      this.max = Infinity;
      this.listeners = [];
      this.waiting = [];
      this.error = null;
    }
    Pend.prototype.go = function(fn) {
      if (this.pending < this.max) {
        pendGo(this, fn);
      } else {
        this.waiting.push(fn);
      }
    };
    Pend.prototype.wait = function(cb) {
      if (this.pending === 0) {
        cb(this.error);
      } else {
        this.listeners.push(cb);
      }
    };
    Pend.prototype.hold = function() {
      return pendHold(this);
    };
    function pendHold(self2) {
      self2.pending += 1;
      var called = false;
      return onCb;
      function onCb(err) {
        if (called)
          throw new Error("callback called twice");
        called = true;
        self2.error = self2.error || err;
        self2.pending -= 1;
        if (self2.waiting.length > 0 && self2.pending < self2.max) {
          pendGo(self2, self2.waiting.shift());
        } else if (self2.pending === 0) {
          var listeners = self2.listeners;
          self2.listeners = [];
          listeners.forEach(cbListener);
        }
      }
      function cbListener(listener) {
        listener(self2.error);
      }
    }
    function pendGo(self2, fn) {
      fn(pendHold(self2));
    }
  }
});

// ../testeranto/node_modules/fd-slicer/index.js
var require_fd_slicer = __commonJS({
  "../testeranto/node_modules/fd-slicer/index.js"(exports) {
    init_cjs_shim();
    var fs4 = __require("fs");
    var util2 = __require("util");
    var stream = __require("stream");
    var Readable = stream.Readable;
    var Writable = stream.Writable;
    var PassThrough = stream.PassThrough;
    var Pend = require_pend();
    var EventEmitter2 = __require("events").EventEmitter;
    exports.createFromBuffer = createFromBuffer;
    exports.createFromFd = createFromFd;
    exports.BufferSlicer = BufferSlicer;
    exports.FdSlicer = FdSlicer;
    util2.inherits(FdSlicer, EventEmitter2);
    function FdSlicer(fd, options) {
      options = options || {};
      EventEmitter2.call(this);
      this.fd = fd;
      this.pend = new Pend();
      this.pend.max = 1;
      this.refCount = 0;
      this.autoClose = !!options.autoClose;
    }
    FdSlicer.prototype.read = function(buffer, offset, length, position, callback) {
      var self2 = this;
      self2.pend.go(function(cb) {
        fs4.read(self2.fd, buffer, offset, length, position, function(err, bytesRead, buffer2) {
          cb();
          callback(err, bytesRead, buffer2);
        });
      });
    };
    FdSlicer.prototype.write = function(buffer, offset, length, position, callback) {
      var self2 = this;
      self2.pend.go(function(cb) {
        fs4.write(self2.fd, buffer, offset, length, position, function(err, written, buffer2) {
          cb();
          callback(err, written, buffer2);
        });
      });
    };
    FdSlicer.prototype.createReadStream = function(options) {
      return new ReadStream(this, options);
    };
    FdSlicer.prototype.createWriteStream = function(options) {
      return new WriteStream(this, options);
    };
    FdSlicer.prototype.ref = function() {
      this.refCount += 1;
    };
    FdSlicer.prototype.unref = function() {
      var self2 = this;
      self2.refCount -= 1;
      if (self2.refCount > 0)
        return;
      if (self2.refCount < 0)
        throw new Error("invalid unref");
      if (self2.autoClose) {
        fs4.close(self2.fd, onCloseDone);
      }
      function onCloseDone(err) {
        if (err) {
          self2.emit("error", err);
        } else {
          self2.emit("close");
        }
      }
    };
    util2.inherits(ReadStream, Readable);
    function ReadStream(context, options) {
      options = options || {};
      Readable.call(this, options);
      this.context = context;
      this.context.ref();
      this.start = options.start || 0;
      this.endOffset = options.end;
      this.pos = this.start;
      this.destroyed = false;
    }
    ReadStream.prototype._read = function(n) {
      var self2 = this;
      if (self2.destroyed)
        return;
      var toRead = Math.min(self2._readableState.highWaterMark, n);
      if (self2.endOffset != null) {
        toRead = Math.min(toRead, self2.endOffset - self2.pos);
      }
      if (toRead <= 0) {
        self2.destroyed = true;
        self2.push(null);
        self2.context.unref();
        return;
      }
      self2.context.pend.go(function(cb) {
        if (self2.destroyed)
          return cb();
        var buffer = new Buffer(toRead);
        fs4.read(self2.context.fd, buffer, 0, toRead, self2.pos, function(err, bytesRead) {
          if (err) {
            self2.destroy(err);
          } else if (bytesRead === 0) {
            self2.destroyed = true;
            self2.push(null);
            self2.context.unref();
          } else {
            self2.pos += bytesRead;
            self2.push(buffer.slice(0, bytesRead));
          }
          cb();
        });
      });
    };
    ReadStream.prototype.destroy = function(err) {
      if (this.destroyed)
        return;
      err = err || new Error("stream destroyed");
      this.destroyed = true;
      this.emit("error", err);
      this.context.unref();
    };
    util2.inherits(WriteStream, Writable);
    function WriteStream(context, options) {
      options = options || {};
      Writable.call(this, options);
      this.context = context;
      this.context.ref();
      this.start = options.start || 0;
      this.endOffset = options.end == null ? Infinity : +options.end;
      this.bytesWritten = 0;
      this.pos = this.start;
      this.destroyed = false;
      this.on("finish", this.destroy.bind(this));
    }
    WriteStream.prototype._write = function(buffer, encoding, callback) {
      var self2 = this;
      if (self2.destroyed)
        return;
      if (self2.pos + buffer.length > self2.endOffset) {
        var err = new Error("maximum file length exceeded");
        err.code = "ETOOBIG";
        self2.destroy();
        callback(err);
        return;
      }
      self2.context.pend.go(function(cb) {
        if (self2.destroyed)
          return cb();
        fs4.write(self2.context.fd, buffer, 0, buffer.length, self2.pos, function(err2, bytes) {
          if (err2) {
            self2.destroy();
            cb();
            callback(err2);
          } else {
            self2.bytesWritten += bytes;
            self2.pos += bytes;
            self2.emit("progress");
            cb();
            callback();
          }
        });
      });
    };
    WriteStream.prototype.destroy = function() {
      if (this.destroyed)
        return;
      this.destroyed = true;
      this.context.unref();
    };
    util2.inherits(BufferSlicer, EventEmitter2);
    function BufferSlicer(buffer, options) {
      EventEmitter2.call(this);
      options = options || {};
      this.refCount = 0;
      this.buffer = buffer;
      this.maxChunkSize = options.maxChunkSize || Number.MAX_SAFE_INTEGER;
    }
    BufferSlicer.prototype.read = function(buffer, offset, length, position, callback) {
      var end = position + length;
      var delta = end - this.buffer.length;
      var written = delta > 0 ? delta : length;
      this.buffer.copy(buffer, offset, position, end);
      setImmediate(function() {
        callback(null, written);
      });
    };
    BufferSlicer.prototype.write = function(buffer, offset, length, position, callback) {
      buffer.copy(this.buffer, position, offset, offset + length);
      setImmediate(function() {
        callback(null, length, buffer);
      });
    };
    BufferSlicer.prototype.createReadStream = function(options) {
      options = options || {};
      var readStream = new PassThrough(options);
      readStream.destroyed = false;
      readStream.start = options.start || 0;
      readStream.endOffset = options.end;
      readStream.pos = readStream.endOffset || this.buffer.length;
      var entireSlice = this.buffer.slice(readStream.start, readStream.pos);
      var offset = 0;
      while (true) {
        var nextOffset = offset + this.maxChunkSize;
        if (nextOffset >= entireSlice.length) {
          if (offset < entireSlice.length) {
            readStream.write(entireSlice.slice(offset, entireSlice.length));
          }
          break;
        }
        readStream.write(entireSlice.slice(offset, nextOffset));
        offset = nextOffset;
      }
      readStream.end();
      readStream.destroy = function() {
        readStream.destroyed = true;
      };
      return readStream;
    };
    BufferSlicer.prototype.createWriteStream = function(options) {
      var bufferSlicer = this;
      options = options || {};
      var writeStream = new Writable(options);
      writeStream.start = options.start || 0;
      writeStream.endOffset = options.end == null ? this.buffer.length : +options.end;
      writeStream.bytesWritten = 0;
      writeStream.pos = writeStream.start;
      writeStream.destroyed = false;
      writeStream._write = function(buffer, encoding, callback) {
        if (writeStream.destroyed)
          return;
        var end = writeStream.pos + buffer.length;
        if (end > writeStream.endOffset) {
          var err = new Error("maximum file length exceeded");
          err.code = "ETOOBIG";
          writeStream.destroyed = true;
          callback(err);
          return;
        }
        buffer.copy(bufferSlicer.buffer, writeStream.pos, 0, buffer.length);
        writeStream.bytesWritten += buffer.length;
        writeStream.pos = end;
        writeStream.emit("progress");
        callback();
      };
      writeStream.destroy = function() {
        writeStream.destroyed = true;
      };
      return writeStream;
    };
    BufferSlicer.prototype.ref = function() {
      this.refCount += 1;
    };
    BufferSlicer.prototype.unref = function() {
      this.refCount -= 1;
      if (this.refCount < 0) {
        throw new Error("invalid unref");
      }
    };
    function createFromBuffer(buffer, options) {
      return new BufferSlicer(buffer, options);
    }
    function createFromFd(fd, options) {
      return new FdSlicer(fd, options);
    }
  }
});

// ../testeranto/node_modules/buffer-crc32/index.js
var require_buffer_crc32 = __commonJS({
  "../testeranto/node_modules/buffer-crc32/index.js"(exports, module) {
    init_cjs_shim();
    var Buffer2 = __require("buffer").Buffer;
    var CRC_TABLE = [
      0,
      1996959894,
      3993919788,
      2567524794,
      124634137,
      1886057615,
      3915621685,
      2657392035,
      249268274,
      2044508324,
      3772115230,
      2547177864,
      162941995,
      2125561021,
      3887607047,
      2428444049,
      498536548,
      1789927666,
      4089016648,
      2227061214,
      450548861,
      1843258603,
      4107580753,
      2211677639,
      325883990,
      1684777152,
      4251122042,
      2321926636,
      335633487,
      1661365465,
      4195302755,
      2366115317,
      997073096,
      1281953886,
      3579855332,
      2724688242,
      1006888145,
      1258607687,
      3524101629,
      2768942443,
      901097722,
      1119000684,
      3686517206,
      2898065728,
      853044451,
      1172266101,
      3705015759,
      2882616665,
      651767980,
      1373503546,
      3369554304,
      3218104598,
      565507253,
      1454621731,
      3485111705,
      3099436303,
      671266974,
      1594198024,
      3322730930,
      2970347812,
      795835527,
      1483230225,
      3244367275,
      3060149565,
      1994146192,
      31158534,
      2563907772,
      4023717930,
      1907459465,
      112637215,
      2680153253,
      3904427059,
      2013776290,
      251722036,
      2517215374,
      3775830040,
      2137656763,
      141376813,
      2439277719,
      3865271297,
      1802195444,
      476864866,
      2238001368,
      4066508878,
      1812370925,
      453092731,
      2181625025,
      4111451223,
      1706088902,
      314042704,
      2344532202,
      4240017532,
      1658658271,
      366619977,
      2362670323,
      4224994405,
      1303535960,
      984961486,
      2747007092,
      3569037538,
      1256170817,
      1037604311,
      2765210733,
      3554079995,
      1131014506,
      879679996,
      2909243462,
      3663771856,
      1141124467,
      855842277,
      2852801631,
      3708648649,
      1342533948,
      654459306,
      3188396048,
      3373015174,
      1466479909,
      544179635,
      3110523913,
      3462522015,
      1591671054,
      702138776,
      2966460450,
      3352799412,
      1504918807,
      783551873,
      3082640443,
      3233442989,
      3988292384,
      2596254646,
      62317068,
      1957810842,
      3939845945,
      2647816111,
      81470997,
      1943803523,
      3814918930,
      2489596804,
      225274430,
      2053790376,
      3826175755,
      2466906013,
      167816743,
      2097651377,
      4027552580,
      2265490386,
      503444072,
      1762050814,
      4150417245,
      2154129355,
      426522225,
      1852507879,
      4275313526,
      2312317920,
      282753626,
      1742555852,
      4189708143,
      2394877945,
      397917763,
      1622183637,
      3604390888,
      2714866558,
      953729732,
      1340076626,
      3518719985,
      2797360999,
      1068828381,
      1219638859,
      3624741850,
      2936675148,
      906185462,
      1090812512,
      3747672003,
      2825379669,
      829329135,
      1181335161,
      3412177804,
      3160834842,
      628085408,
      1382605366,
      3423369109,
      3138078467,
      570562233,
      1426400815,
      3317316542,
      2998733608,
      733239954,
      1555261956,
      3268935591,
      3050360625,
      752459403,
      1541320221,
      2607071920,
      3965973030,
      1969922972,
      40735498,
      2617837225,
      3943577151,
      1913087877,
      83908371,
      2512341634,
      3803740692,
      2075208622,
      213261112,
      2463272603,
      3855990285,
      2094854071,
      198958881,
      2262029012,
      4057260610,
      1759359992,
      534414190,
      2176718541,
      4139329115,
      1873836001,
      414664567,
      2282248934,
      4279200368,
      1711684554,
      285281116,
      2405801727,
      4167216745,
      1634467795,
      376229701,
      2685067896,
      3608007406,
      1308918612,
      956543938,
      2808555105,
      3495958263,
      1231636301,
      1047427035,
      2932959818,
      3654703836,
      1088359270,
      936918e3,
      2847714899,
      3736837829,
      1202900863,
      817233897,
      3183342108,
      3401237130,
      1404277552,
      615818150,
      3134207493,
      3453421203,
      1423857449,
      601450431,
      3009837614,
      3294710456,
      1567103746,
      711928724,
      3020668471,
      3272380065,
      1510334235,
      755167117
    ];
    if (typeof Int32Array !== "undefined") {
      CRC_TABLE = new Int32Array(CRC_TABLE);
    }
    function ensureBuffer(input) {
      if (Buffer2.isBuffer(input)) {
        return input;
      }
      var hasNewBufferAPI = typeof Buffer2.alloc === "function" && typeof Buffer2.from === "function";
      if (typeof input === "number") {
        return hasNewBufferAPI ? Buffer2.alloc(input) : new Buffer2(input);
      } else if (typeof input === "string") {
        return hasNewBufferAPI ? Buffer2.from(input) : new Buffer2(input);
      } else {
        throw new Error("input must be buffer, number, or string, received " + typeof input);
      }
    }
    function bufferizeInt(num) {
      var tmp = ensureBuffer(4);
      tmp.writeInt32BE(num, 0);
      return tmp;
    }
    function _crc32(buf, previous) {
      buf = ensureBuffer(buf);
      if (Buffer2.isBuffer(previous)) {
        previous = previous.readUInt32BE(0);
      }
      var crc = ~~previous ^ -1;
      for (var n = 0; n < buf.length; n++) {
        crc = CRC_TABLE[(crc ^ buf[n]) & 255] ^ crc >>> 8;
      }
      return crc ^ -1;
    }
    function crc32() {
      return bufferizeInt(_crc32.apply(null, arguments));
    }
    crc32.signed = function() {
      return _crc32.apply(null, arguments);
    };
    crc32.unsigned = function() {
      return _crc32.apply(null, arguments) >>> 0;
    };
    module.exports = crc32;
  }
});

// ../testeranto/node_modules/yauzl/index.js
var require_yauzl = __commonJS({
  "../testeranto/node_modules/yauzl/index.js"(exports) {
    init_cjs_shim();
    var fs4 = __require("fs");
    var zlib = __require("zlib");
    var fd_slicer = require_fd_slicer();
    var crc32 = require_buffer_crc32();
    var util2 = __require("util");
    var EventEmitter2 = __require("events").EventEmitter;
    var Transform = __require("stream").Transform;
    var PassThrough = __require("stream").PassThrough;
    var Writable = __require("stream").Writable;
    exports.open = open;
    exports.fromFd = fromFd;
    exports.fromBuffer = fromBuffer;
    exports.fromRandomAccessReader = fromRandomAccessReader;
    exports.dosDateTimeToDate = dosDateTimeToDate;
    exports.validateFileName = validateFileName;
    exports.ZipFile = ZipFile;
    exports.Entry = Entry;
    exports.RandomAccessReader = RandomAccessReader;
    function open(path5, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      if (options == null)
        options = {};
      if (options.autoClose == null)
        options.autoClose = true;
      if (options.lazyEntries == null)
        options.lazyEntries = false;
      if (options.decodeStrings == null)
        options.decodeStrings = true;
      if (options.validateEntrySizes == null)
        options.validateEntrySizes = true;
      if (options.strictFileNames == null)
        options.strictFileNames = false;
      if (callback == null)
        callback = defaultCallback;
      fs4.open(path5, "r", function(err, fd) {
        if (err)
          return callback(err);
        fromFd(fd, options, function(err2, zipfile) {
          if (err2)
            fs4.close(fd, defaultCallback);
          callback(err2, zipfile);
        });
      });
    }
    function fromFd(fd, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      if (options == null)
        options = {};
      if (options.autoClose == null)
        options.autoClose = false;
      if (options.lazyEntries == null)
        options.lazyEntries = false;
      if (options.decodeStrings == null)
        options.decodeStrings = true;
      if (options.validateEntrySizes == null)
        options.validateEntrySizes = true;
      if (options.strictFileNames == null)
        options.strictFileNames = false;
      if (callback == null)
        callback = defaultCallback;
      fs4.fstat(fd, function(err, stats) {
        if (err)
          return callback(err);
        var reader = fd_slicer.createFromFd(fd, { autoClose: true });
        fromRandomAccessReader(reader, stats.size, options, callback);
      });
    }
    function fromBuffer(buffer, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      if (options == null)
        options = {};
      options.autoClose = false;
      if (options.lazyEntries == null)
        options.lazyEntries = false;
      if (options.decodeStrings == null)
        options.decodeStrings = true;
      if (options.validateEntrySizes == null)
        options.validateEntrySizes = true;
      if (options.strictFileNames == null)
        options.strictFileNames = false;
      var reader = fd_slicer.createFromBuffer(buffer, { maxChunkSize: 65536 });
      fromRandomAccessReader(reader, buffer.length, options, callback);
    }
    function fromRandomAccessReader(reader, totalSize, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = null;
      }
      if (options == null)
        options = {};
      if (options.autoClose == null)
        options.autoClose = true;
      if (options.lazyEntries == null)
        options.lazyEntries = false;
      if (options.decodeStrings == null)
        options.decodeStrings = true;
      var decodeStrings = !!options.decodeStrings;
      if (options.validateEntrySizes == null)
        options.validateEntrySizes = true;
      if (options.strictFileNames == null)
        options.strictFileNames = false;
      if (callback == null)
        callback = defaultCallback;
      if (typeof totalSize !== "number")
        throw new Error("expected totalSize parameter to be a number");
      if (totalSize > Number.MAX_SAFE_INTEGER) {
        throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
      }
      reader.ref();
      var eocdrWithoutCommentSize = 22;
      var maxCommentSize = 65535;
      var bufferSize = Math.min(eocdrWithoutCommentSize + maxCommentSize, totalSize);
      var buffer = newBuffer(bufferSize);
      var bufferReadStart = totalSize - buffer.length;
      readAndAssertNoEof(reader, buffer, 0, bufferSize, bufferReadStart, function(err) {
        if (err)
          return callback(err);
        for (var i = bufferSize - eocdrWithoutCommentSize; i >= 0; i -= 1) {
          if (buffer.readUInt32LE(i) !== 101010256)
            continue;
          var eocdrBuffer = buffer.slice(i);
          var diskNumber = eocdrBuffer.readUInt16LE(4);
          if (diskNumber !== 0) {
            return callback(new Error("multi-disk zip files are not supported: found disk number: " + diskNumber));
          }
          var entryCount = eocdrBuffer.readUInt16LE(10);
          var centralDirectoryOffset = eocdrBuffer.readUInt32LE(16);
          var commentLength = eocdrBuffer.readUInt16LE(20);
          var expectedCommentLength = eocdrBuffer.length - eocdrWithoutCommentSize;
          if (commentLength !== expectedCommentLength) {
            return callback(new Error("invalid comment length. expected: " + expectedCommentLength + ". found: " + commentLength));
          }
          var comment = decodeStrings ? decodeBuffer(eocdrBuffer, 22, eocdrBuffer.length, false) : eocdrBuffer.slice(22);
          if (!(entryCount === 65535 || centralDirectoryOffset === 4294967295)) {
            return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
          }
          var zip64EocdlBuffer = newBuffer(20);
          var zip64EocdlOffset = bufferReadStart + i - zip64EocdlBuffer.length;
          readAndAssertNoEof(reader, zip64EocdlBuffer, 0, zip64EocdlBuffer.length, zip64EocdlOffset, function(err2) {
            if (err2)
              return callback(err2);
            if (zip64EocdlBuffer.readUInt32LE(0) !== 117853008) {
              return callback(new Error("invalid zip64 end of central directory locator signature"));
            }
            var zip64EocdrOffset = readUInt64LE(zip64EocdlBuffer, 8);
            var zip64EocdrBuffer = newBuffer(56);
            readAndAssertNoEof(reader, zip64EocdrBuffer, 0, zip64EocdrBuffer.length, zip64EocdrOffset, function(err3) {
              if (err3)
                return callback(err3);
              if (zip64EocdrBuffer.readUInt32LE(0) !== 101075792) {
                return callback(new Error("invalid zip64 end of central directory record signature"));
              }
              entryCount = readUInt64LE(zip64EocdrBuffer, 32);
              centralDirectoryOffset = readUInt64LE(zip64EocdrBuffer, 48);
              return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
            });
          });
          return;
        }
        callback(new Error("end of central directory record signature not found"));
      });
    }
    util2.inherits(ZipFile, EventEmitter2);
    function ZipFile(reader, centralDirectoryOffset, fileSize, entryCount, comment, autoClose, lazyEntries, decodeStrings, validateEntrySizes, strictFileNames) {
      var self2 = this;
      EventEmitter2.call(self2);
      self2.reader = reader;
      self2.reader.on("error", function(err) {
        emitError(self2, err);
      });
      self2.reader.once("close", function() {
        self2.emit("close");
      });
      self2.readEntryCursor = centralDirectoryOffset;
      self2.fileSize = fileSize;
      self2.entryCount = entryCount;
      self2.comment = comment;
      self2.entriesRead = 0;
      self2.autoClose = !!autoClose;
      self2.lazyEntries = !!lazyEntries;
      self2.decodeStrings = !!decodeStrings;
      self2.validateEntrySizes = !!validateEntrySizes;
      self2.strictFileNames = !!strictFileNames;
      self2.isOpen = true;
      self2.emittedError = false;
      if (!self2.lazyEntries)
        self2._readEntry();
    }
    ZipFile.prototype.close = function() {
      if (!this.isOpen)
        return;
      this.isOpen = false;
      this.reader.unref();
    };
    function emitErrorAndAutoClose(self2, err) {
      if (self2.autoClose)
        self2.close();
      emitError(self2, err);
    }
    function emitError(self2, err) {
      if (self2.emittedError)
        return;
      self2.emittedError = true;
      self2.emit("error", err);
    }
    ZipFile.prototype.readEntry = function() {
      if (!this.lazyEntries)
        throw new Error("readEntry() called without lazyEntries:true");
      this._readEntry();
    };
    ZipFile.prototype._readEntry = function() {
      var self2 = this;
      if (self2.entryCount === self2.entriesRead) {
        setImmediate(function() {
          if (self2.autoClose)
            self2.close();
          if (self2.emittedError)
            return;
          self2.emit("end");
        });
        return;
      }
      if (self2.emittedError)
        return;
      var buffer = newBuffer(46);
      readAndAssertNoEof(self2.reader, buffer, 0, buffer.length, self2.readEntryCursor, function(err) {
        if (err)
          return emitErrorAndAutoClose(self2, err);
        if (self2.emittedError)
          return;
        var entry = new Entry();
        var signature = buffer.readUInt32LE(0);
        if (signature !== 33639248)
          return emitErrorAndAutoClose(self2, new Error("invalid central directory file header signature: 0x" + signature.toString(16)));
        entry.versionMadeBy = buffer.readUInt16LE(4);
        entry.versionNeededToExtract = buffer.readUInt16LE(6);
        entry.generalPurposeBitFlag = buffer.readUInt16LE(8);
        entry.compressionMethod = buffer.readUInt16LE(10);
        entry.lastModFileTime = buffer.readUInt16LE(12);
        entry.lastModFileDate = buffer.readUInt16LE(14);
        entry.crc32 = buffer.readUInt32LE(16);
        entry.compressedSize = buffer.readUInt32LE(20);
        entry.uncompressedSize = buffer.readUInt32LE(24);
        entry.fileNameLength = buffer.readUInt16LE(28);
        entry.extraFieldLength = buffer.readUInt16LE(30);
        entry.fileCommentLength = buffer.readUInt16LE(32);
        entry.internalFileAttributes = buffer.readUInt16LE(36);
        entry.externalFileAttributes = buffer.readUInt32LE(38);
        entry.relativeOffsetOfLocalHeader = buffer.readUInt32LE(42);
        if (entry.generalPurposeBitFlag & 64)
          return emitErrorAndAutoClose(self2, new Error("strong encryption is not supported"));
        self2.readEntryCursor += 46;
        buffer = newBuffer(entry.fileNameLength + entry.extraFieldLength + entry.fileCommentLength);
        readAndAssertNoEof(self2.reader, buffer, 0, buffer.length, self2.readEntryCursor, function(err2) {
          if (err2)
            return emitErrorAndAutoClose(self2, err2);
          if (self2.emittedError)
            return;
          var isUtf8 = (entry.generalPurposeBitFlag & 2048) !== 0;
          entry.fileName = self2.decodeStrings ? decodeBuffer(buffer, 0, entry.fileNameLength, isUtf8) : buffer.slice(0, entry.fileNameLength);
          var fileCommentStart = entry.fileNameLength + entry.extraFieldLength;
          var extraFieldBuffer = buffer.slice(entry.fileNameLength, fileCommentStart);
          entry.extraFields = [];
          var i = 0;
          while (i < extraFieldBuffer.length - 3) {
            var headerId = extraFieldBuffer.readUInt16LE(i + 0);
            var dataSize = extraFieldBuffer.readUInt16LE(i + 2);
            var dataStart = i + 4;
            var dataEnd = dataStart + dataSize;
            if (dataEnd > extraFieldBuffer.length)
              return emitErrorAndAutoClose(self2, new Error("extra field length exceeds extra field buffer size"));
            var dataBuffer = newBuffer(dataSize);
            extraFieldBuffer.copy(dataBuffer, 0, dataStart, dataEnd);
            entry.extraFields.push({
              id: headerId,
              data: dataBuffer
            });
            i = dataEnd;
          }
          entry.fileComment = self2.decodeStrings ? decodeBuffer(buffer, fileCommentStart, fileCommentStart + entry.fileCommentLength, isUtf8) : buffer.slice(fileCommentStart, fileCommentStart + entry.fileCommentLength);
          entry.comment = entry.fileComment;
          self2.readEntryCursor += buffer.length;
          self2.entriesRead += 1;
          if (entry.uncompressedSize === 4294967295 || entry.compressedSize === 4294967295 || entry.relativeOffsetOfLocalHeader === 4294967295) {
            var zip64EiefBuffer = null;
            for (var i = 0; i < entry.extraFields.length; i++) {
              var extraField = entry.extraFields[i];
              if (extraField.id === 1) {
                zip64EiefBuffer = extraField.data;
                break;
              }
            }
            if (zip64EiefBuffer == null) {
              return emitErrorAndAutoClose(self2, new Error("expected zip64 extended information extra field"));
            }
            var index = 0;
            if (entry.uncompressedSize === 4294967295) {
              if (index + 8 > zip64EiefBuffer.length) {
                return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include uncompressed size"));
              }
              entry.uncompressedSize = readUInt64LE(zip64EiefBuffer, index);
              index += 8;
            }
            if (entry.compressedSize === 4294967295) {
              if (index + 8 > zip64EiefBuffer.length) {
                return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include compressed size"));
              }
              entry.compressedSize = readUInt64LE(zip64EiefBuffer, index);
              index += 8;
            }
            if (entry.relativeOffsetOfLocalHeader === 4294967295) {
              if (index + 8 > zip64EiefBuffer.length) {
                return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include relative header offset"));
              }
              entry.relativeOffsetOfLocalHeader = readUInt64LE(zip64EiefBuffer, index);
              index += 8;
            }
          }
          if (self2.decodeStrings) {
            for (var i = 0; i < entry.extraFields.length; i++) {
              var extraField = entry.extraFields[i];
              if (extraField.id === 28789) {
                if (extraField.data.length < 6) {
                  continue;
                }
                if (extraField.data.readUInt8(0) !== 1) {
                  continue;
                }
                var oldNameCrc32 = extraField.data.readUInt32LE(1);
                if (crc32.unsigned(buffer.slice(0, entry.fileNameLength)) !== oldNameCrc32) {
                  continue;
                }
                entry.fileName = decodeBuffer(extraField.data, 5, extraField.data.length, true);
                break;
              }
            }
          }
          if (self2.validateEntrySizes && entry.compressionMethod === 0) {
            var expectedCompressedSize = entry.uncompressedSize;
            if (entry.isEncrypted()) {
              expectedCompressedSize += 12;
            }
            if (entry.compressedSize !== expectedCompressedSize) {
              var msg = "compressed/uncompressed size mismatch for stored file: " + entry.compressedSize + " != " + entry.uncompressedSize;
              return emitErrorAndAutoClose(self2, new Error(msg));
            }
          }
          if (self2.decodeStrings) {
            if (!self2.strictFileNames) {
              entry.fileName = entry.fileName.replace(/\\/g, "/");
            }
            var errorMessage = validateFileName(entry.fileName, self2.validateFileNameOptions);
            if (errorMessage != null)
              return emitErrorAndAutoClose(self2, new Error(errorMessage));
          }
          self2.emit("entry", entry);
          if (!self2.lazyEntries)
            self2._readEntry();
        });
      });
    };
    ZipFile.prototype.openReadStream = function(entry, options, callback) {
      var self2 = this;
      var relativeStart = 0;
      var relativeEnd = entry.compressedSize;
      if (callback == null) {
        callback = options;
        options = {};
      } else {
        if (options.decrypt != null) {
          if (!entry.isEncrypted()) {
            throw new Error("options.decrypt can only be specified for encrypted entries");
          }
          if (options.decrypt !== false)
            throw new Error("invalid options.decrypt value: " + options.decrypt);
          if (entry.isCompressed()) {
            if (options.decompress !== false)
              throw new Error("entry is encrypted and compressed, and options.decompress !== false");
          }
        }
        if (options.decompress != null) {
          if (!entry.isCompressed()) {
            throw new Error("options.decompress can only be specified for compressed entries");
          }
          if (!(options.decompress === false || options.decompress === true)) {
            throw new Error("invalid options.decompress value: " + options.decompress);
          }
        }
        if (options.start != null || options.end != null) {
          if (entry.isCompressed() && options.decompress !== false) {
            throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
          }
          if (entry.isEncrypted() && options.decrypt !== false) {
            throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
          }
        }
        if (options.start != null) {
          relativeStart = options.start;
          if (relativeStart < 0)
            throw new Error("options.start < 0");
          if (relativeStart > entry.compressedSize)
            throw new Error("options.start > entry.compressedSize");
        }
        if (options.end != null) {
          relativeEnd = options.end;
          if (relativeEnd < 0)
            throw new Error("options.end < 0");
          if (relativeEnd > entry.compressedSize)
            throw new Error("options.end > entry.compressedSize");
          if (relativeEnd < relativeStart)
            throw new Error("options.end < options.start");
        }
      }
      if (!self2.isOpen)
        return callback(new Error("closed"));
      if (entry.isEncrypted()) {
        if (options.decrypt !== false)
          return callback(new Error("entry is encrypted, and options.decrypt !== false"));
      }
      self2.reader.ref();
      var buffer = newBuffer(30);
      readAndAssertNoEof(self2.reader, buffer, 0, buffer.length, entry.relativeOffsetOfLocalHeader, function(err) {
        try {
          if (err)
            return callback(err);
          var signature = buffer.readUInt32LE(0);
          if (signature !== 67324752) {
            return callback(new Error("invalid local file header signature: 0x" + signature.toString(16)));
          }
          var fileNameLength = buffer.readUInt16LE(26);
          var extraFieldLength = buffer.readUInt16LE(28);
          var localFileHeaderEnd = entry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
          var decompress;
          if (entry.compressionMethod === 0) {
            decompress = false;
          } else if (entry.compressionMethod === 8) {
            decompress = options.decompress != null ? options.decompress : true;
          } else {
            return callback(new Error("unsupported compression method: " + entry.compressionMethod));
          }
          var fileDataStart = localFileHeaderEnd;
          var fileDataEnd = fileDataStart + entry.compressedSize;
          if (entry.compressedSize !== 0) {
            if (fileDataEnd > self2.fileSize) {
              return callback(new Error("file data overflows file bounds: " + fileDataStart + " + " + entry.compressedSize + " > " + self2.fileSize));
            }
          }
          var readStream = self2.reader.createReadStream({
            start: fileDataStart + relativeStart,
            end: fileDataStart + relativeEnd
          });
          var endpointStream = readStream;
          if (decompress) {
            var destroyed = false;
            var inflateFilter = zlib.createInflateRaw();
            readStream.on("error", function(err2) {
              setImmediate(function() {
                if (!destroyed)
                  inflateFilter.emit("error", err2);
              });
            });
            readStream.pipe(inflateFilter);
            if (self2.validateEntrySizes) {
              endpointStream = new AssertByteCountStream(entry.uncompressedSize);
              inflateFilter.on("error", function(err2) {
                setImmediate(function() {
                  if (!destroyed)
                    endpointStream.emit("error", err2);
                });
              });
              inflateFilter.pipe(endpointStream);
            } else {
              endpointStream = inflateFilter;
            }
            endpointStream.destroy = function() {
              destroyed = true;
              if (inflateFilter !== endpointStream)
                inflateFilter.unpipe(endpointStream);
              readStream.unpipe(inflateFilter);
              readStream.destroy();
            };
          }
          callback(null, endpointStream);
        } finally {
          self2.reader.unref();
        }
      });
    };
    function Entry() {
    }
    Entry.prototype.getLastModDate = function() {
      return dosDateTimeToDate(this.lastModFileDate, this.lastModFileTime);
    };
    Entry.prototype.isEncrypted = function() {
      return (this.generalPurposeBitFlag & 1) !== 0;
    };
    Entry.prototype.isCompressed = function() {
      return this.compressionMethod === 8;
    };
    function dosDateTimeToDate(date, time) {
      var day = date & 31;
      var month = (date >> 5 & 15) - 1;
      var year = (date >> 9 & 127) + 1980;
      var millisecond = 0;
      var second = (time & 31) * 2;
      var minute = time >> 5 & 63;
      var hour = time >> 11 & 31;
      return new Date(year, month, day, hour, minute, second, millisecond);
    }
    function validateFileName(fileName) {
      if (fileName.indexOf("\\") !== -1) {
        return "invalid characters in fileName: " + fileName;
      }
      if (/^[a-zA-Z]:/.test(fileName) || /^\//.test(fileName)) {
        return "absolute path: " + fileName;
      }
      if (fileName.split("/").indexOf("..") !== -1) {
        return "invalid relative path: " + fileName;
      }
      return null;
    }
    function readAndAssertNoEof(reader, buffer, offset, length, position, callback) {
      if (length === 0) {
        return setImmediate(function() {
          callback(null, newBuffer(0));
        });
      }
      reader.read(buffer, offset, length, position, function(err, bytesRead) {
        if (err)
          return callback(err);
        if (bytesRead < length) {
          return callback(new Error("unexpected EOF"));
        }
        callback();
      });
    }
    util2.inherits(AssertByteCountStream, Transform);
    function AssertByteCountStream(byteCount) {
      Transform.call(this);
      this.actualByteCount = 0;
      this.expectedByteCount = byteCount;
    }
    AssertByteCountStream.prototype._transform = function(chunk, encoding, cb) {
      this.actualByteCount += chunk.length;
      if (this.actualByteCount > this.expectedByteCount) {
        var msg = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
        return cb(new Error(msg));
      }
      cb(null, chunk);
    };
    AssertByteCountStream.prototype._flush = function(cb) {
      if (this.actualByteCount < this.expectedByteCount) {
        var msg = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
        return cb(new Error(msg));
      }
      cb();
    };
    util2.inherits(RandomAccessReader, EventEmitter2);
    function RandomAccessReader() {
      EventEmitter2.call(this);
      this.refCount = 0;
    }
    RandomAccessReader.prototype.ref = function() {
      this.refCount += 1;
    };
    RandomAccessReader.prototype.unref = function() {
      var self2 = this;
      self2.refCount -= 1;
      if (self2.refCount > 0)
        return;
      if (self2.refCount < 0)
        throw new Error("invalid unref");
      self2.close(onCloseDone);
      function onCloseDone(err) {
        if (err)
          return self2.emit("error", err);
        self2.emit("close");
      }
    };
    RandomAccessReader.prototype.createReadStream = function(options) {
      var start = options.start;
      var end = options.end;
      if (start === end) {
        var emptyStream = new PassThrough();
        setImmediate(function() {
          emptyStream.end();
        });
        return emptyStream;
      }
      var stream = this._readStreamForRange(start, end);
      var destroyed = false;
      var refUnrefFilter = new RefUnrefFilter(this);
      stream.on("error", function(err) {
        setImmediate(function() {
          if (!destroyed)
            refUnrefFilter.emit("error", err);
        });
      });
      refUnrefFilter.destroy = function() {
        stream.unpipe(refUnrefFilter);
        refUnrefFilter.unref();
        stream.destroy();
      };
      var byteCounter = new AssertByteCountStream(end - start);
      refUnrefFilter.on("error", function(err) {
        setImmediate(function() {
          if (!destroyed)
            byteCounter.emit("error", err);
        });
      });
      byteCounter.destroy = function() {
        destroyed = true;
        refUnrefFilter.unpipe(byteCounter);
        refUnrefFilter.destroy();
      };
      return stream.pipe(refUnrefFilter).pipe(byteCounter);
    };
    RandomAccessReader.prototype._readStreamForRange = function(start, end) {
      throw new Error("not implemented");
    };
    RandomAccessReader.prototype.read = function(buffer, offset, length, position, callback) {
      var readStream = this.createReadStream({ start: position, end: position + length });
      var writeStream = new Writable();
      var written = 0;
      writeStream._write = function(chunk, encoding, cb) {
        chunk.copy(buffer, offset + written, 0, chunk.length);
        written += chunk.length;
        cb();
      };
      writeStream.on("finish", callback);
      readStream.on("error", function(error) {
        callback(error);
      });
      readStream.pipe(writeStream);
    };
    RandomAccessReader.prototype.close = function(callback) {
      setImmediate(callback);
    };
    util2.inherits(RefUnrefFilter, PassThrough);
    function RefUnrefFilter(context) {
      PassThrough.call(this);
      this.context = context;
      this.context.ref();
      this.unreffedYet = false;
    }
    RefUnrefFilter.prototype._flush = function(cb) {
      this.unref();
      cb();
    };
    RefUnrefFilter.prototype.unref = function(cb) {
      if (this.unreffedYet)
        return;
      this.unreffedYet = true;
      this.context.unref();
    };
    var cp437 = "\0\u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0\xA0";
    function decodeBuffer(buffer, start, end, isUtf8) {
      if (isUtf8) {
        return buffer.toString("utf8", start, end);
      } else {
        var result = "";
        for (var i = start; i < end; i++) {
          result += cp437[buffer[i]];
        }
        return result;
      }
    }
    function readUInt64LE(buffer, offset) {
      var lower32 = buffer.readUInt32LE(offset);
      var upper32 = buffer.readUInt32LE(offset + 4);
      return upper32 * 4294967296 + lower32;
    }
    var newBuffer;
    if (typeof Buffer.allocUnsafe === "function") {
      newBuffer = function(len) {
        return Buffer.allocUnsafe(len);
      };
    } else {
      newBuffer = function(len) {
        return new Buffer(len);
      };
    }
    function defaultCallback(err) {
      if (err)
        throw err;
    }
  }
});

// ../testeranto/node_modules/extract-zip/index.js
var require_extract_zip = __commonJS({
  "../testeranto/node_modules/extract-zip/index.js"(exports, module) {
    init_cjs_shim();
    var debug2 = require_src()("extract-zip");
    var { createWriteStream: createWriteStream2, promises: fs4 } = __require("fs");
    var getStream = require_get_stream();
    var path5 = __require("path");
    var { promisify: promisify3 } = __require("util");
    var stream = __require("stream");
    var yauzl = require_yauzl();
    var openZip = promisify3(yauzl.open);
    var pipeline = promisify3(stream.pipeline);
    var Extractor = class {
      constructor(zipPath, opts) {
        this.zipPath = zipPath;
        this.opts = opts;
      }
      async extract() {
        debug2("opening", this.zipPath, "with opts", this.opts);
        this.zipfile = await openZip(this.zipPath, { lazyEntries: true });
        this.canceled = false;
        return new Promise((resolve2, reject) => {
          this.zipfile.on("error", (err) => {
            this.canceled = true;
            reject(err);
          });
          this.zipfile.readEntry();
          this.zipfile.on("close", () => {
            if (!this.canceled) {
              debug2("zip extraction complete");
              resolve2();
            }
          });
          this.zipfile.on("entry", async (entry) => {
            if (this.canceled) {
              debug2("skipping entry", entry.fileName, { cancelled: this.canceled });
              return;
            }
            debug2("zipfile entry", entry.fileName);
            if (entry.fileName.startsWith("__MACOSX/")) {
              this.zipfile.readEntry();
              return;
            }
            const destDir = path5.dirname(path5.join(this.opts.dir, entry.fileName));
            try {
              await fs4.mkdir(destDir, { recursive: true });
              const canonicalDestDir = await fs4.realpath(destDir);
              const relativeDestDir = path5.relative(this.opts.dir, canonicalDestDir);
              if (relativeDestDir.split(path5.sep).includes("..")) {
                throw new Error(`Out of bound path "${canonicalDestDir}" found while processing file ${entry.fileName}`);
              }
              await this.extractEntry(entry);
              debug2("finished processing", entry.fileName);
              this.zipfile.readEntry();
            } catch (err) {
              this.canceled = true;
              this.zipfile.close();
              reject(err);
            }
          });
        });
      }
      async extractEntry(entry) {
        if (this.canceled) {
          debug2("skipping entry extraction", entry.fileName, { cancelled: this.canceled });
          return;
        }
        if (this.opts.onEntry) {
          this.opts.onEntry(entry, this.zipfile);
        }
        const dest = path5.join(this.opts.dir, entry.fileName);
        const mode = entry.externalFileAttributes >> 16 & 65535;
        const IFMT = 61440;
        const IFDIR = 16384;
        const IFLNK = 40960;
        const symlink = (mode & IFMT) === IFLNK;
        let isDir = (mode & IFMT) === IFDIR;
        if (!isDir && entry.fileName.endsWith("/")) {
          isDir = true;
        }
        const madeBy = entry.versionMadeBy >> 8;
        if (!isDir)
          isDir = madeBy === 0 && entry.externalFileAttributes === 16;
        debug2("extracting entry", { filename: entry.fileName, isDir, isSymlink: symlink });
        const procMode = this.getExtractedMode(mode, isDir) & 511;
        const destDir = isDir ? dest : path5.dirname(dest);
        const mkdirOptions = { recursive: true };
        if (isDir) {
          mkdirOptions.mode = procMode;
        }
        debug2("mkdir", { dir: destDir, ...mkdirOptions });
        await fs4.mkdir(destDir, mkdirOptions);
        if (isDir)
          return;
        debug2("opening read stream", dest);
        const readStream = await promisify3(this.zipfile.openReadStream.bind(this.zipfile))(entry);
        if (symlink) {
          const link = await getStream(readStream);
          debug2("creating symlink", link, dest);
          await fs4.symlink(link, dest);
        } else {
          await pipeline(readStream, createWriteStream2(dest, { mode: procMode }));
        }
      }
      getExtractedMode(entryMode, isDir) {
        let mode = entryMode;
        if (mode === 0) {
          if (isDir) {
            if (this.opts.defaultDirMode) {
              mode = parseInt(this.opts.defaultDirMode, 10);
            }
            if (!mode) {
              mode = 493;
            }
          } else {
            if (this.opts.defaultFileMode) {
              mode = parseInt(this.opts.defaultFileMode, 10);
            }
            if (!mode) {
              mode = 420;
            }
          }
        }
        return mode;
      }
    };
    module.exports = async function(zipPath, opts) {
      debug2("creating target directory", opts.dir);
      if (!path5.isAbsolute(opts.dir)) {
        throw new Error("Target directory is expected to be absolute");
      }
      await fs4.mkdir(opts.dir, { recursive: true });
      opts.dir = await fs4.realpath(opts.dir);
      return new Extractor(zipPath, opts).extract();
    };
  }
});

// ../testeranto/node_modules/agent-base/dist/src/promisify.js
var require_promisify = __commonJS({
  "../testeranto/node_modules/agent-base/dist/src/promisify.js"(exports) {
    "use strict";
    init_cjs_shim();
    Object.defineProperty(exports, "__esModule", { value: true });
    function promisify3(fn) {
      return function(req, opts) {
        return new Promise((resolve2, reject) => {
          fn.call(this, req, opts, (err, rtn) => {
            if (err) {
              reject(err);
            } else {
              resolve2(rtn);
            }
          });
        });
      };
    }
    exports.default = promisify3;
  }
});

// ../testeranto/node_modules/agent-base/dist/src/index.js
var require_src2 = __commonJS({
  "../testeranto/node_modules/agent-base/dist/src/index.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var events_1 = __require("events");
    var debug_1 = __importDefault(require_src());
    var promisify_1 = __importDefault(require_promisify());
    var debug2 = debug_1.default("agent-base");
    function isAgent(v) {
      return Boolean(v) && typeof v.addRequest === "function";
    }
    function isSecureEndpoint() {
      const { stack } = new Error();
      if (typeof stack !== "string")
        return false;
      return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
    }
    function createAgent(callback, opts) {
      return new createAgent.Agent(callback, opts);
    }
    (function(createAgent2) {
      class Agent extends events_1.EventEmitter {
        constructor(callback, _opts) {
          super();
          let opts = _opts;
          if (typeof callback === "function") {
            this.callback = callback;
          } else if (callback) {
            opts = callback;
          }
          this.timeout = null;
          if (opts && typeof opts.timeout === "number") {
            this.timeout = opts.timeout;
          }
          this.maxFreeSockets = 1;
          this.maxSockets = 1;
          this.maxTotalSockets = Infinity;
          this.sockets = {};
          this.freeSockets = {};
          this.requests = {};
          this.options = {};
        }
        get defaultPort() {
          if (typeof this.explicitDefaultPort === "number") {
            return this.explicitDefaultPort;
          }
          return isSecureEndpoint() ? 443 : 80;
        }
        set defaultPort(v) {
          this.explicitDefaultPort = v;
        }
        get protocol() {
          if (typeof this.explicitProtocol === "string") {
            return this.explicitProtocol;
          }
          return isSecureEndpoint() ? "https:" : "http:";
        }
        set protocol(v) {
          this.explicitProtocol = v;
        }
        callback(req, opts, fn) {
          throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
        }
        /**
         * Called by node-core's "_http_client.js" module when creating
         * a new HTTP request with this Agent instance.
         *
         * @api public
         */
        addRequest(req, _opts) {
          const opts = Object.assign({}, _opts);
          if (typeof opts.secureEndpoint !== "boolean") {
            opts.secureEndpoint = isSecureEndpoint();
          }
          if (opts.host == null) {
            opts.host = "localhost";
          }
          if (opts.port == null) {
            opts.port = opts.secureEndpoint ? 443 : 80;
          }
          if (opts.protocol == null) {
            opts.protocol = opts.secureEndpoint ? "https:" : "http:";
          }
          if (opts.host && opts.path) {
            delete opts.path;
          }
          delete opts.agent;
          delete opts.hostname;
          delete opts._defaultAgent;
          delete opts.defaultPort;
          delete opts.createConnection;
          req._last = true;
          req.shouldKeepAlive = false;
          let timedOut = false;
          let timeoutId = null;
          const timeoutMs = opts.timeout || this.timeout;
          const onerror = (err) => {
            if (req._hadError)
              return;
            req.emit("error", err);
            req._hadError = true;
          };
          const ontimeout = () => {
            timeoutId = null;
            timedOut = true;
            const err = new Error(`A "socket" was not created for HTTP request before ${timeoutMs}ms`);
            err.code = "ETIMEOUT";
            onerror(err);
          };
          const callbackError = (err) => {
            if (timedOut)
              return;
            if (timeoutId !== null) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            onerror(err);
          };
          const onsocket = (socket) => {
            if (timedOut)
              return;
            if (timeoutId != null) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            if (isAgent(socket)) {
              debug2("Callback returned another Agent instance %o", socket.constructor.name);
              socket.addRequest(req, opts);
              return;
            }
            if (socket) {
              socket.once("free", () => {
                this.freeSocket(socket, opts);
              });
              req.onSocket(socket);
              return;
            }
            const err = new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
            onerror(err);
          };
          if (typeof this.callback !== "function") {
            onerror(new Error("`callback` is not defined"));
            return;
          }
          if (!this.promisifiedCallback) {
            if (this.callback.length >= 3) {
              debug2("Converting legacy callback function to promise");
              this.promisifiedCallback = promisify_1.default(this.callback);
            } else {
              this.promisifiedCallback = this.callback;
            }
          }
          if (typeof timeoutMs === "number" && timeoutMs > 0) {
            timeoutId = setTimeout(ontimeout, timeoutMs);
          }
          if ("port" in opts && typeof opts.port !== "number") {
            opts.port = Number(opts.port);
          }
          try {
            debug2("Resolving socket for %o request: %o", opts.protocol, `${req.method} ${req.path}`);
            Promise.resolve(this.promisifiedCallback(req, opts)).then(onsocket, callbackError);
          } catch (err) {
            Promise.reject(err).catch(callbackError);
          }
        }
        freeSocket(socket, opts) {
          debug2("Freeing socket %o %o", socket.constructor.name, opts);
          socket.destroy();
        }
        destroy() {
          debug2("Destroying agent %o", this.constructor.name);
        }
      }
      createAgent2.Agent = Agent;
      createAgent2.prototype = createAgent2.Agent.prototype;
    })(createAgent || (createAgent = {}));
    module.exports = createAgent;
  }
});

// ../testeranto/node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = __commonJS({
  "../testeranto/node_modules/https-proxy-agent/dist/parse-proxy-response.js"(exports) {
    "use strict";
    init_cjs_shim();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = __importDefault(require_src());
    var debug2 = debug_1.default("https-proxy-agent:parse-proxy-response");
    function parseProxyResponse(socket) {
      return new Promise((resolve2, reject) => {
        let buffersLength = 0;
        const buffers = [];
        function read() {
          const b = socket.read();
          if (b)
            ondata(b);
          else
            socket.once("readable", read);
        }
        function cleanup() {
          socket.removeListener("end", onend);
          socket.removeListener("error", onerror);
          socket.removeListener("close", onclose);
          socket.removeListener("readable", read);
        }
        function onclose(err) {
          debug2("onclose had error %o", err);
        }
        function onend() {
          debug2("onend");
        }
        function onerror(err) {
          cleanup();
          debug2("onerror %o", err);
          reject(err);
        }
        function ondata(b) {
          buffers.push(b);
          buffersLength += b.length;
          const buffered = Buffer.concat(buffers, buffersLength);
          const endOfHeaders = buffered.indexOf("\r\n\r\n");
          if (endOfHeaders === -1) {
            debug2("have not received end of HTTP headers yet...");
            read();
            return;
          }
          const firstLine = buffered.toString("ascii", 0, buffered.indexOf("\r\n"));
          const statusCode = +firstLine.split(" ")[1];
          debug2("got proxy server response: %o", firstLine);
          resolve2({
            statusCode,
            buffered
          });
        }
        socket.on("error", onerror);
        socket.on("close", onclose);
        socket.on("end", onend);
        read();
      });
    }
    exports.default = parseProxyResponse;
  }
});

// ../testeranto/node_modules/https-proxy-agent/dist/agent.js
var require_agent = __commonJS({
  "../testeranto/node_modules/https-proxy-agent/dist/agent.js"(exports) {
    "use strict";
    init_cjs_shim();
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var net_1 = __importDefault(__require("net"));
    var tls_1 = __importDefault(__require("tls"));
    var url_1 = __importDefault(__require("url"));
    var assert_1 = __importDefault(__require("assert"));
    var debug_1 = __importDefault(require_src());
    var agent_base_1 = require_src2();
    var parse_proxy_response_1 = __importDefault(require_parse_proxy_response());
    var debug2 = debug_1.default("https-proxy-agent:agent");
    var HttpsProxyAgent = class extends agent_base_1.Agent {
      constructor(_opts) {
        let opts;
        if (typeof _opts === "string") {
          opts = url_1.default.parse(_opts);
        } else {
          opts = _opts;
        }
        if (!opts) {
          throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");
        }
        debug2("creating new HttpsProxyAgent instance: %o", opts);
        super(opts);
        const proxy = Object.assign({}, opts);
        this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);
        proxy.host = proxy.hostname || proxy.host;
        if (typeof proxy.port === "string") {
          proxy.port = parseInt(proxy.port, 10);
        }
        if (!proxy.port && proxy.host) {
          proxy.port = this.secureProxy ? 443 : 80;
        }
        if (this.secureProxy && !("ALPNProtocols" in proxy)) {
          proxy.ALPNProtocols = ["http 1.1"];
        }
        if (proxy.host && proxy.path) {
          delete proxy.path;
          delete proxy.pathname;
        }
        this.proxy = proxy;
      }
      /**
       * Called when the node-core HTTP client library is creating a
       * new HTTP request.
       *
       * @api protected
       */
      callback(req, opts) {
        return __awaiter(this, void 0, void 0, function* () {
          const { proxy, secureProxy } = this;
          let socket;
          if (secureProxy) {
            debug2("Creating `tls.Socket`: %o", proxy);
            socket = tls_1.default.connect(proxy);
          } else {
            debug2("Creating `net.Socket`: %o", proxy);
            socket = net_1.default.connect(proxy);
          }
          const headers = Object.assign({}, proxy.headers);
          const hostname = `${opts.host}:${opts.port}`;
          let payload = `CONNECT ${hostname} HTTP/1.1\r
`;
          if (proxy.auth) {
            headers["Proxy-Authorization"] = `Basic ${Buffer.from(proxy.auth).toString("base64")}`;
          }
          let { host, port, secureEndpoint } = opts;
          if (!isDefaultPort(port, secureEndpoint)) {
            host += `:${port}`;
          }
          headers.Host = host;
          headers.Connection = "close";
          for (const name of Object.keys(headers)) {
            payload += `${name}: ${headers[name]}\r
`;
          }
          const proxyResponsePromise = parse_proxy_response_1.default(socket);
          socket.write(`${payload}\r
`);
          const { statusCode, buffered } = yield proxyResponsePromise;
          if (statusCode === 200) {
            req.once("socket", resume);
            if (opts.secureEndpoint) {
              debug2("Upgrading socket connection to TLS");
              const servername = opts.servername || opts.host;
              return tls_1.default.connect(Object.assign(Object.assign({}, omit(opts, "host", "hostname", "path", "port")), {
                socket,
                servername
              }));
            }
            return socket;
          }
          socket.destroy();
          const fakeSocket = new net_1.default.Socket({ writable: false });
          fakeSocket.readable = true;
          req.once("socket", (s) => {
            debug2("replaying proxy buffer for failed request");
            assert_1.default(s.listenerCount("data") > 0);
            s.push(buffered);
            s.push(null);
          });
          return fakeSocket;
        });
      }
    };
    exports.default = HttpsProxyAgent;
    function resume(socket) {
      socket.resume();
    }
    function isDefaultPort(port, secure) {
      return Boolean(!secure && port === 80 || secure && port === 443);
    }
    function isHTTPS(protocol) {
      return typeof protocol === "string" ? /^https:?$/i.test(protocol) : false;
    }
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
  }
});

// ../testeranto/node_modules/https-proxy-agent/dist/index.js
var require_dist = __commonJS({
  "../testeranto/node_modules/https-proxy-agent/dist/index.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var agent_1 = __importDefault(require_agent());
    function createHttpsProxyAgent2(opts) {
      return new agent_1.default(opts);
    }
    (function(createHttpsProxyAgent3) {
      createHttpsProxyAgent3.HttpsProxyAgent = agent_1.default;
      createHttpsProxyAgent3.prototype = agent_1.default.prototype;
    })(createHttpsProxyAgent2 || (createHttpsProxyAgent2 = {}));
    module.exports = createHttpsProxyAgent2;
  }
});

// ../testeranto/node_modules/proxy-from-env/index.js
var require_proxy_from_env = __commonJS({
  "../testeranto/node_modules/proxy-from-env/index.js"(exports) {
    "use strict";
    init_cjs_shim();
    var parseUrl = __require("url").parse;
    var DEFAULT_PORTS = {
      ftp: 21,
      gopher: 70,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443
    };
    var stringEndsWith = String.prototype.endsWith || function(s) {
      return s.length <= this.length && this.indexOf(s, this.length - s.length) !== -1;
    };
    function getProxyForUrl2(url) {
      var parsedUrl = typeof url === "string" ? parseUrl(url) : url || {};
      var proto = parsedUrl.protocol;
      var hostname = parsedUrl.host;
      var port = parsedUrl.port;
      if (typeof hostname !== "string" || !hostname || typeof proto !== "string") {
        return "";
      }
      proto = proto.split(":", 1)[0];
      hostname = hostname.replace(/:\d*$/, "");
      port = parseInt(port) || DEFAULT_PORTS[proto] || 0;
      if (!shouldProxy(hostname, port)) {
        return "";
      }
      var proxy = getEnv("npm_config_" + proto + "_proxy") || getEnv(proto + "_proxy") || getEnv("npm_config_proxy") || getEnv("all_proxy");
      if (proxy && proxy.indexOf("://") === -1) {
        proxy = proto + "://" + proxy;
      }
      return proxy;
    }
    function shouldProxy(hostname, port) {
      var NO_PROXY = (getEnv("npm_config_no_proxy") || getEnv("no_proxy")).toLowerCase();
      if (!NO_PROXY) {
        return true;
      }
      if (NO_PROXY === "*") {
        return false;
      }
      return NO_PROXY.split(/[,\s]/).every(function(proxy) {
        if (!proxy) {
          return true;
        }
        var parsedProxy = proxy.match(/^(.+):(\d+)$/);
        var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
        var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
        if (parsedProxyPort && parsedProxyPort !== port) {
          return true;
        }
        if (!/^[.*]/.test(parsedProxyHostname)) {
          return hostname !== parsedProxyHostname;
        }
        if (parsedProxyHostname.charAt(0) === "*") {
          parsedProxyHostname = parsedProxyHostname.slice(1);
        }
        return !stringEndsWith.call(hostname, parsedProxyHostname);
      });
    }
    function getEnv(key) {
      return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
    }
    exports.getProxyForUrl = getProxyForUrl2;
  }
});

// ../testeranto/node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "../testeranto/node_modules/fs.realpath/old.js"(exports) {
    init_cjs_shim();
    var pathModule = __require("path");
    var isWindows = process.platform === "win32";
    var fs4 = __require("fs");
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize = pathModule.normalize;
    if (isWindows) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports.realpathSync = function realpathSync(p, cache) {
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return cache[p];
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs4.lstatSync(base);
          knownHard[base] = true;
        }
      }
      while (pos < p.length) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          resolvedLink = cache[base];
        } else {
          var stat = fs4.lstatSync(base);
          if (!stat.isSymbolicLink()) {
            knownHard[base] = true;
            if (cache)
              cache[base] = base;
            continue;
          }
          var linkTarget = null;
          if (!isWindows) {
            var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
            if (seenLinks.hasOwnProperty(id)) {
              linkTarget = seenLinks[id];
            }
          }
          if (linkTarget === null) {
            fs4.statSync(base);
            linkTarget = fs4.readlinkSync(base);
          }
          resolvedLink = pathModule.resolve(previous, linkTarget);
          if (cache)
            cache[base] = resolvedLink;
          if (!isWindows)
            seenLinks[id] = linkTarget;
        }
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
      if (cache)
        cache[original] = p;
      return p;
    };
    exports.realpath = function realpath(p, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return process.nextTick(cb.bind(null, null, cache[p]));
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs4.lstat(base, function(err) {
            if (err)
              return cb(err);
            knownHard[base] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos >= p.length) {
          if (cache)
            cache[original] = p;
          return cb(null, p);
        }
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          return gotResolvedLink(cache[base]);
        }
        return fs4.lstat(base, gotStat);
      }
      function gotStat(err, stat) {
        if (err)
          return cb(err);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          return process.nextTick(LOOP);
        }
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            return gotTarget(null, seenLinks[id], base);
          }
        }
        fs4.stat(base, function(err2) {
          if (err2)
            return cb(err2);
          fs4.readlink(base, function(err3, target) {
            if (!isWindows)
              seenLinks[id] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err)
          return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        if (cache)
          cache[base2] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
    };
  }
});

// ../testeranto/node_modules/fs.realpath/index.js
var require_fs = __commonJS({
  "../testeranto/node_modules/fs.realpath/index.js"(exports, module) {
    init_cjs_shim();
    module.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs4 = __require("fs");
    var origRealpath = fs4.realpath;
    var origRealpathSync = fs4.realpathSync;
    var version = process.version;
    var ok = /^v[0-5]\./.test(version);
    var old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok) {
        return origRealpath(p, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
          old.realpath(p, cache, cb);
        } else {
          cb(er, result);
        }
      });
    }
    function realpathSync(p, cache) {
      if (ok) {
        return origRealpathSync(p, cache);
      }
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er)) {
          return old.realpathSync(p, cache);
        } else {
          throw er;
        }
      }
    }
    function monkeypatch() {
      fs4.realpath = realpath;
      fs4.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs4.realpath = origRealpath;
      fs4.realpathSync = origRealpathSync;
    }
  }
});

// ../testeranto/node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "../testeranto/node_modules/concat-map/index.js"(exports, module) {
    init_cjs_shim();
    module.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x))
          res.push.apply(res, x);
        else
          res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// ../testeranto/node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "../testeranto/node_modules/balanced-match/index.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    module.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// ../testeranto/node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "../testeranto/node_modules/brace-expansion/index.js"(exports, module) {
    init_cjs_shim();
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre))
        return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// ../testeranto/node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "../testeranto/node_modules/minimatch/minimatch.js"(exports, module) {
    init_cjs_shim();
    module.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path5 = function() {
      try {
        return __require("path");
      } catch (e) {
      }
    }() || {
      sep: "/"
    };
    minimatch.sep = path5.sep;
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      b = b || {};
      var t = {};
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return minimatch;
      }
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      m.Minimatch.defaults = function defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      };
      m.filter = function filter2(pattern, options) {
        return orig.filter(pattern, ext(def, options));
      };
      m.defaults = function defaults(options) {
        return orig.defaults(ext(def, options));
      };
      m.makeRe = function makeRe2(pattern, options) {
        return orig.makeRe(pattern, ext(def, options));
      };
      m.braceExpand = function braceExpand2(pattern, options) {
        return orig.braceExpand(pattern, ext(def, options));
      };
      m.match = function(list, pattern, options) {
        return orig.match(list, pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      assertValidPattern(pattern);
      if (!options)
        options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      assertValidPattern(pattern);
      if (!options)
        options = {};
      pattern = pattern.trim();
      if (!options.allowWindowsEscape && path5.sep !== "/") {
        pattern = pattern.split(path5.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = function debug2() {
          console.error.apply(console, arguments);
        };
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate)
        return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      assertValidPattern(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return expand(pattern);
    }
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = function(pattern) {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    Minimatch.prototype.parse = parse2;
    var SUBPARSE = {};
    function parse2(pattern, isSub) {
      assertValidPattern(pattern);
      var options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "")
        return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self2 = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self2.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case "/": {
            return false;
          }
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1)
                c = "^";
              re += c;
              continue;
            }
            self2.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext)
              clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case "[":
        case ".":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = function match(f, partial) {
      if (typeof partial === "undefined")
        partial = this.partial;
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      var options = this.options;
      if (path5.sep !== "/") {
        f = f.split(path5.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    };
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug(
        "matchOne",
        { "this": this, file, pattern }
      );
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// ../testeranto/node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "../testeranto/node_modules/inherits/inherits_browser.js"(exports, module) {
    init_cjs_shim();
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// ../testeranto/node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "../testeranto/node_modules/inherits/inherits.js"(exports, module) {
    init_cjs_shim();
    try {
      util2 = __require("util");
      if (typeof util2.inherits !== "function")
        throw "";
      module.exports = util2.inherits;
    } catch (e) {
      module.exports = require_inherits_browser();
    }
    var util2;
  }
});

// ../testeranto/node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "../testeranto/node_modules/path-is-absolute/index.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    function posix(path5) {
      return path5.charAt(0) === "/";
    }
    function win32(path5) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path5);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module.exports = process.platform === "win32" ? win32 : posix;
    module.exports.posix = posix;
    module.exports.win32 = win32;
  }
});

// ../testeranto/node_modules/rimraf/node_modules/glob/common.js
var require_common = __commonJS({
  "../testeranto/node_modules/rimraf/node_modules/glob/common.js"(exports) {
    init_cjs_shim();
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var fs4 = __require("fs");
    var path5 = __require("path");
    var minimatch = require_minimatch();
    var isAbsolute = require_path_is_absolute();
    var Minimatch = minimatch.Minimatch;
    function alphasort(a, b) {
      return a.localeCompare(b, "en");
    }
    function setupIgnores(self2, options) {
      self2.ignore = options.ignore || [];
      if (!Array.isArray(self2.ignore))
        self2.ignore = [self2.ignore];
      if (self2.ignore.length) {
        self2.ignore = self2.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self2, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self2.silent = !!options.silent;
      self2.pattern = pattern;
      self2.strict = options.strict !== false;
      self2.realpath = !!options.realpath;
      self2.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self2.follow = !!options.follow;
      self2.dot = !!options.dot;
      self2.mark = !!options.mark;
      self2.nodir = !!options.nodir;
      if (self2.nodir)
        self2.mark = true;
      self2.sync = !!options.sync;
      self2.nounique = !!options.nounique;
      self2.nonull = !!options.nonull;
      self2.nosort = !!options.nosort;
      self2.nocase = !!options.nocase;
      self2.stat = !!options.stat;
      self2.noprocess = !!options.noprocess;
      self2.absolute = !!options.absolute;
      self2.fs = options.fs || fs4;
      self2.maxLength = options.maxLength || Infinity;
      self2.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self2.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self2.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self2, options);
      self2.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self2.cwd = cwd;
      else {
        self2.cwd = path5.resolve(options.cwd);
        self2.changedCwd = self2.cwd !== cwd;
      }
      self2.root = options.root || path5.resolve(self2.cwd, "/");
      self2.root = path5.resolve(self2.root);
      if (process.platform === "win32")
        self2.root = self2.root.replace(/\\/g, "/");
      self2.cwdAbs = isAbsolute(self2.cwd) ? self2.cwd : makeAbs(self2, self2.cwd);
      if (process.platform === "win32")
        self2.cwdAbs = self2.cwdAbs.replace(/\\/g, "/");
      self2.nomount = !!options.nomount;
      options.nonegate = true;
      options.nocomment = true;
      options.allowWindowsEscape = false;
      self2.minimatch = new Minimatch(pattern, options);
      self2.options = self2.minimatch.options;
    }
    function finish(self2) {
      var nou = self2.nounique;
      var all = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self2.matches.length; i < l; i++) {
        var matches = self2.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self2.nonull) {
            var literal = self2.minimatch.globSet[i];
            if (nou)
              all.push(literal);
            else
              all[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all.push.apply(all, m);
          else
            m.forEach(function(m2) {
              all[m2] = true;
            });
        }
      }
      if (!nou)
        all = Object.keys(all);
      if (!self2.nosort)
        all = all.sort(alphasort);
      if (self2.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self2._mark(all[i]);
        }
        if (self2.nodir) {
          all = all.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c = self2.cache[e] || self2.cache[makeAbs(self2, e)];
            if (notDir && c)
              notDir = c !== "DIR" && !Array.isArray(c);
            return notDir;
          });
        }
      }
      if (self2.ignore.length)
        all = all.filter(function(m2) {
          return !isIgnored(self2, m2);
        });
      self2.found = all;
    }
    function mark(self2, p) {
      var abs = makeAbs(self2, p);
      var c = self2.cache[abs];
      var m = p;
      if (c) {
        var isDir = c === "DIR" || Array.isArray(c);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self2, m);
          self2.statCache[mabs] = self2.statCache[abs];
          self2.cache[mabs] = self2.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self2, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path5.join(self2.root, f);
      } else if (isAbsolute(f) || f === "") {
        abs = f;
      } else if (self2.changedCwd) {
        abs = path5.resolve(self2.cwd, f);
      } else {
        abs = path5.resolve(f);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self2, path6) {
      if (!self2.ignore.length)
        return false;
      return self2.ignore.some(function(item) {
        return item.matcher.match(path6) || !!(item.gmatcher && item.gmatcher.match(path6));
      });
    }
    function childrenIgnored(self2, path6) {
      if (!self2.ignore.length)
        return false;
      return self2.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path6));
      });
    }
  }
});

// ../testeranto/node_modules/rimraf/node_modules/glob/sync.js
var require_sync = __commonJS({
  "../testeranto/node_modules/rimraf/node_modules/glob/sync.js"(exports, module) {
    init_cjs_shim();
    module.exports = globSync;
    globSync.GlobSync = GlobSync;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob().Glob;
    var util2 = __require("util");
    var path5 = __require("path");
    var assert2 = __require("assert");
    var isAbsolute = require_path_is_absolute();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert2.ok(this instanceof GlobSync);
      if (this.realpath) {
        var self2 = this;
        this.matches.forEach(function(matchset, index) {
          var set = self2.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self2._makeAbs(p);
              var real = rp.realpathSync(p, self2.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self2._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert2.ok(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path5.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = this.fs.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, this.fs.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            throw error;
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path5.join(this.root, prefix);
        } else {
          prefix = path5.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return c;
        if (needDir && c === "FILE")
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = this.fs.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat = this.fs.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return false;
      return c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// ../testeranto/node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "../testeranto/node_modules/inflight/inflight.js"(exports, module) {
    init_cjs_shim();
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once = require_once();
    module.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++)
        array[i] = args[i];
      return array;
    }
  }
});

// ../testeranto/node_modules/rimraf/node_modules/glob/glob.js
var require_glob = __commonJS({
  "../testeranto/node_modules/rimraf/node_modules/glob/glob.js"(exports, module) {
    init_cjs_shim();
    module.exports = glob;
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits = require_inherits();
    var EE = __require("events").EventEmitter;
    var path5 = __require("path");
    var assert2 = __require("assert");
    var isAbsolute = require_path_is_absolute();
    var globSync = require_sync();
    var common = require_common();
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util2 = __require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob(pattern, options, cb) {
      if (typeof options === "function")
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob.sync = globSync;
    var GlobSync = glob.GlobSync = globSync.GlobSync;
    glob.glob = glob;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self2 = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self2._processing;
        if (self2._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self2._finish();
            });
          } else {
            self2._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert2(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self2 = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self2._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self2 = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self2._makeAbs(p);
        rp.realpath(p, self2.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self2.emit("error", er);
          if (--n === 0) {
            self2.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert2(this instanceof Glob);
      assert2(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.map(function(p) {
        return typeof p === "string" ? p : "[*]";
      }).join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self2 = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self2._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path5.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self2 = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        self2.fs.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self2.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self2.cache[abs] = "FILE";
          cb();
        } else
          self2._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return cb();
        if (Array.isArray(c))
          return cb(null, c);
      }
      var self2 = this;
      self2.fs.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self2, abs, cb) {
      return function(er, entries) {
        if (er)
          self2._readdirError(abs, er, cb);
        else
          self2._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error = new Error(er.code + " invalid cwd " + this.cwd);
            error.path = this.cwd;
            error.code = er.code;
            this.emit("error", error);
            this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self2 = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self2._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self2 = this;
      this._stat(prefix, function(er, exists) {
        self2._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path5.join(this.root, prefix);
        } else {
          prefix = path5.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return cb(null, c);
        if (needDir && c === "FILE")
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self2 = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        self2.fs.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return self2.fs.stat(abs, function(er2, stat2) {
            if (er2)
              self2._stat2(f, abs, null, lstat, cb);
            else
              self2._stat2(f, abs, er2, stat2, cb);
          });
        } else {
          self2._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat;
      if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
        return cb(null, false, stat);
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return cb();
      return cb(null, c, stat);
    };
  }
});

// ../testeranto/node_modules/rimraf/rimraf.js
var require_rimraf = __commonJS({
  "../testeranto/node_modules/rimraf/rimraf.js"(exports, module) {
    init_cjs_shim();
    var assert2 = __require("assert");
    var path5 = __require("path");
    var fs4 = __require("fs");
    var glob = void 0;
    try {
      glob = require_glob();
    } catch (_err) {
    }
    var defaultGlobOpts = {
      nosort: true,
      silent: true
    };
    var timeout = 0;
    var isWindows = process.platform === "win32";
    var defaults = (options) => {
      const methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach((m) => {
        options[m] = options[m] || fs4[m];
        m = m + "Sync";
        options[m] = options[m] || fs4[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
      options.emfileWait = options.emfileWait || 1e3;
      if (options.glob === false) {
        options.disableGlob = true;
      }
      if (options.disableGlob !== true && glob === void 0) {
        throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
      }
      options.disableGlob = options.disableGlob || false;
      options.glob = options.glob || defaultGlobOpts;
    };
    var rimraf = (p, options, cb) => {
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert2(p, "rimraf: missing path");
      assert2.equal(typeof p, "string", "rimraf: path should be a string");
      assert2.equal(typeof cb, "function", "rimraf: callback function required");
      assert2(options, "rimraf: invalid options argument provided");
      assert2.equal(typeof options, "object", "rimraf: options should be object");
      defaults(options);
      let busyTries = 0;
      let errState = null;
      let n = 0;
      const next = (er) => {
        errState = errState || er;
        if (--n === 0)
          cb(errState);
      };
      const afterGlob = (er, results) => {
        if (er)
          return cb(er);
        n = results.length;
        if (n === 0)
          return cb();
        results.forEach((p2) => {
          const CB = (er2) => {
            if (er2) {
              if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
                busyTries++;
                return setTimeout(() => rimraf_(p2, options, CB), busyTries * 100);
              }
              if (er2.code === "EMFILE" && timeout < options.emfileWait) {
                return setTimeout(() => rimraf_(p2, options, CB), timeout++);
              }
              if (er2.code === "ENOENT")
                er2 = null;
            }
            timeout = 0;
            next(er2);
          };
          rimraf_(p2, options, CB);
        });
      };
      if (options.disableGlob || !glob.hasMagic(p))
        return afterGlob(null, [p]);
      options.lstat(p, (er, stat) => {
        if (!er)
          return afterGlob(null, [p]);
        glob(p, options.glob, afterGlob);
      });
    };
    var rimraf_ = (p, options, cb) => {
      assert2(p);
      assert2(options);
      assert2(typeof cb === "function");
      options.lstat(p, (er, st) => {
        if (er && er.code === "ENOENT")
          return cb(null);
        if (er && er.code === "EPERM" && isWindows)
          fixWinEPERM(p, options, er, cb);
        if (st && st.isDirectory())
          return rmdir(p, options, er, cb);
        options.unlink(p, (er2) => {
          if (er2) {
            if (er2.code === "ENOENT")
              return cb(null);
            if (er2.code === "EPERM")
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            if (er2.code === "EISDIR")
              return rmdir(p, options, er2, cb);
          }
          return cb(er2);
        });
      });
    };
    var fixWinEPERM = (p, options, er, cb) => {
      assert2(p);
      assert2(options);
      assert2(typeof cb === "function");
      options.chmod(p, 438, (er2) => {
        if (er2)
          cb(er2.code === "ENOENT" ? null : er);
        else
          options.stat(p, (er3, stats) => {
            if (er3)
              cb(er3.code === "ENOENT" ? null : er);
            else if (stats.isDirectory())
              rmdir(p, options, er, cb);
            else
              options.unlink(p, cb);
          });
      });
    };
    var fixWinEPERMSync = (p, options, er) => {
      assert2(p);
      assert2(options);
      try {
        options.chmodSync(p, 438);
      } catch (er2) {
        if (er2.code === "ENOENT")
          return;
        else
          throw er;
      }
      let stats;
      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT")
          return;
        else
          throw er;
      }
      if (stats.isDirectory())
        rmdirSync(p, options, er);
      else
        options.unlinkSync(p);
    };
    var rmdir = (p, options, originalEr, cb) => {
      assert2(p);
      assert2(options);
      assert2(typeof cb === "function");
      options.rmdir(p, (er) => {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
          rmkids(p, options, cb);
        else if (er && er.code === "ENOTDIR")
          cb(originalEr);
        else
          cb(er);
      });
    };
    var rmkids = (p, options, cb) => {
      assert2(p);
      assert2(options);
      assert2(typeof cb === "function");
      options.readdir(p, (er, files) => {
        if (er)
          return cb(er);
        let n = files.length;
        if (n === 0)
          return options.rmdir(p, cb);
        let errState;
        files.forEach((f) => {
          rimraf(path5.join(p, f), options, (er2) => {
            if (errState)
              return;
            if (er2)
              return cb(errState = er2);
            if (--n === 0)
              options.rmdir(p, cb);
          });
        });
      });
    };
    var rimrafSync = (p, options) => {
      options = options || {};
      defaults(options);
      assert2(p, "rimraf: missing path");
      assert2.equal(typeof p, "string", "rimraf: path should be a string");
      assert2(options, "rimraf: missing options");
      assert2.equal(typeof options, "object", "rimraf: options should be object");
      let results;
      if (options.disableGlob || !glob.hasMagic(p)) {
        results = [p];
      } else {
        try {
          options.lstatSync(p);
          results = [p];
        } catch (er) {
          results = glob.sync(p, options.glob);
        }
      }
      if (!results.length)
        return;
      for (let i = 0; i < results.length; i++) {
        const p2 = results[i];
        let st;
        try {
          st = options.lstatSync(p2);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM" && isWindows)
            fixWinEPERMSync(p2, options, er);
        }
        try {
          if (st && st.isDirectory())
            rmdirSync(p2, options, null);
          else
            options.unlinkSync(p2);
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          if (er.code === "EPERM")
            return isWindows ? fixWinEPERMSync(p2, options, er) : rmdirSync(p2, options, er);
          if (er.code !== "EISDIR")
            throw er;
          rmdirSync(p2, options, er);
        }
      }
    };
    var rmdirSync = (p, options, originalEr) => {
      assert2(p);
      assert2(options);
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "ENOTDIR")
          throw originalEr;
        if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
          rmkidsSync(p, options);
      }
    };
    var rmkidsSync = (p, options) => {
      assert2(p);
      assert2(options);
      options.readdirSync(p).forEach((f) => rimrafSync(path5.join(p, f), options));
      const retries = isWindows ? 100 : 1;
      let i = 0;
      do {
        let threw = true;
        try {
          const ret = options.rmdirSync(p, options);
          threw = false;
          return ret;
        } finally {
          if (++i < retries && threw)
            continue;
        }
      } while (true);
    };
    module.exports = rimraf;
    rimraf.sync = rimrafSync;
  }
});

// ../testeranto/node_modules/chownr/chownr.js
var require_chownr = __commonJS({
  "../testeranto/node_modules/chownr/chownr.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var fs4 = __require("fs");
    var path5 = __require("path");
    var LCHOWN = fs4.lchown ? "lchown" : "chown";
    var LCHOWNSYNC = fs4.lchownSync ? "lchownSync" : "chownSync";
    var needEISDIRHandled = fs4.lchown && !process.version.match(/v1[1-9]+\./) && !process.version.match(/v10\.[6-9]/);
    var lchownSync = (path6, uid, gid) => {
      try {
        return fs4[LCHOWNSYNC](path6, uid, gid);
      } catch (er) {
        if (er.code !== "ENOENT")
          throw er;
      }
    };
    var chownSync = (path6, uid, gid) => {
      try {
        return fs4.chownSync(path6, uid, gid);
      } catch (er) {
        if (er.code !== "ENOENT")
          throw er;
      }
    };
    var handleEISDIR = needEISDIRHandled ? (path6, uid, gid, cb) => (er) => {
      if (!er || er.code !== "EISDIR")
        cb(er);
      else
        fs4.chown(path6, uid, gid, cb);
    } : (_, __, ___, cb) => cb;
    var handleEISDirSync = needEISDIRHandled ? (path6, uid, gid) => {
      try {
        return lchownSync(path6, uid, gid);
      } catch (er) {
        if (er.code !== "EISDIR")
          throw er;
        chownSync(path6, uid, gid);
      }
    } : (path6, uid, gid) => lchownSync(path6, uid, gid);
    var nodeVersion = process.version;
    var readdir2 = (path6, options, cb) => fs4.readdir(path6, options, cb);
    var readdirSync2 = (path6, options) => fs4.readdirSync(path6, options);
    if (/^v4\./.test(nodeVersion))
      readdir2 = (path6, options, cb) => fs4.readdir(path6, cb);
    var chown = (cpath, uid, gid, cb) => {
      fs4[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, (er) => {
        cb(er && er.code !== "ENOENT" ? er : null);
      }));
    };
    var chownrKid = (p, child, uid, gid, cb) => {
      if (typeof child === "string")
        return fs4.lstat(path5.resolve(p, child), (er, stats) => {
          if (er)
            return cb(er.code !== "ENOENT" ? er : null);
          stats.name = child;
          chownrKid(p, stats, uid, gid, cb);
        });
      if (child.isDirectory()) {
        chownr(path5.resolve(p, child.name), uid, gid, (er) => {
          if (er)
            return cb(er);
          const cpath = path5.resolve(p, child.name);
          chown(cpath, uid, gid, cb);
        });
      } else {
        const cpath = path5.resolve(p, child.name);
        chown(cpath, uid, gid, cb);
      }
    };
    var chownr = (p, uid, gid, cb) => {
      readdir2(p, { withFileTypes: true }, (er, children) => {
        if (er) {
          if (er.code === "ENOENT")
            return cb();
          else if (er.code !== "ENOTDIR" && er.code !== "ENOTSUP")
            return cb(er);
        }
        if (er || !children.length)
          return chown(p, uid, gid, cb);
        let len = children.length;
        let errState = null;
        const then = (er2) => {
          if (errState)
            return;
          if (er2)
            return cb(errState = er2);
          if (--len === 0)
            return chown(p, uid, gid, cb);
        };
        children.forEach((child) => chownrKid(p, child, uid, gid, then));
      });
    };
    var chownrKidSync = (p, child, uid, gid) => {
      if (typeof child === "string") {
        try {
          const stats = fs4.lstatSync(path5.resolve(p, child));
          stats.name = child;
          child = stats;
        } catch (er) {
          if (er.code === "ENOENT")
            return;
          else
            throw er;
        }
      }
      if (child.isDirectory())
        chownrSync(path5.resolve(p, child.name), uid, gid);
      handleEISDirSync(path5.resolve(p, child.name), uid, gid);
    };
    var chownrSync = (p, uid, gid) => {
      let children;
      try {
        children = readdirSync2(p, { withFileTypes: true });
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        else if (er.code === "ENOTDIR" || er.code === "ENOTSUP")
          return handleEISDirSync(p, uid, gid);
        else
          throw er;
      }
      if (children && children.length)
        children.forEach((child) => chownrKidSync(p, child, uid, gid));
      return handleEISDirSync(p, uid, gid);
    };
    module.exports = chownr;
    chownr.sync = chownrSync;
  }
});

// ../testeranto/node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/internal/streams/stream.js"(exports, module) {
    init_cjs_shim();
    module.exports = __require("stream");
  }
});

// ../testeranto/node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source2 = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source2), true).forEach(function(key) {
          _defineProperty(target, key, source2[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2)) : ownKeys(Object(source2)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var _require = __require("buffer");
    var Buffer2 = _require.Buffer;
    var _require2 = __require("util");
    var inspect = _require2.inspect;
    var custom = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer2.prototype.copy.call(src, target, offset);
    }
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join5(s) {
          if (this.length === 0)
            return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next)
            ret += s + p.data;
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0)
            return Buffer2.alloc(0);
          var ret = Buffer2.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
        // Consumes a specified amount of bytes or characters from the buffered data.
      }, {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
        // Consumes a specified amount of characters from the buffered data.
      }, {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next)
                  this.head = p.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Consumes a specified amount of bytes from the buffered data.
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer2.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next)
                  this.head = p.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
        // Make sure the linked list only shows the minimal necessary information.
      }, {
        key: custom,
        value: function value(_, options) {
          return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
            // Only inspect one level.
            depth: 0,
            // It should not recurse.
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  }
});

// ../testeranto/node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            process.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            process.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            process.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            process.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          process.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});

// ../testeranto/node_modules/readable-stream/errors.js
var require_errors = __commonJS({
  "../testeranto/node_modules/readable-stream/errors.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var codes = {};
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      class NodeError extends Base {
        constructor(arg1, arg2, arg3) {
          super(getMessage(arg1, arg2, arg3));
        }
      }
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i) => String(i));
        if (len > 2) {
          return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
        } else if (len === 2) {
          return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        } else {
          return `of ${thing} ${expected[0]}`;
        }
      } else {
        return `of ${thing} ${String(expected)}`;
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      let determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      let msg;
      if (endsWith(name, " argument")) {
        msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
      } else {
        const type = includes(name, ".") ? "property" : "argument";
        msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
      }
      msg += `. Received type ${typeof actual}`;
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});

// ../testeranto/node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var ERR_INVALID_OPT_VALUE = require_errors().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module.exports = {
      getHighWaterMark
    };
  }
});

// ../testeranto/node_modules/util-deprecate/node.js
var require_node = __commonJS({
  "../testeranto/node_modules/util-deprecate/node.js"(exports, module) {
    init_cjs_shim();
    module.exports = __require("util").deprecate;
  }
});

// ../testeranto/node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/_stream_writable.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    module.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: require_node()
    };
    var Stream = require_stream();
    var Buffer2 = __require("buffer").Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    require_inherits()(Writable, Stream);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable)
            return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this))
        return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      process.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        process.nextTick(cb, er);
        process.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          process.nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          process.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          process.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});

// ../testeranto/node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/_stream_duplex.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj)
        keys2.push(key);
      return keys2;
    };
    module.exports = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    require_inherits()(Duplex, Readable);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method])
          Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended)
        return;
      process.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  }
});

// ../testeranto/node_modules/string_decoder/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "../testeranto/node_modules/string_decoder/node_modules/safe-buffer/index.js"(exports, module) {
    init_cjs_shim();
    var buffer = __require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// ../testeranto/node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "../testeranto/node_modules/string_decoder/lib/string_decoder.js"(exports) {
    "use strict";
    init_cjs_shim();
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding = Buffer2.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc)
        return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried)
              return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
        throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0)
        return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0)
          return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length)
        return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127)
        return 0;
      else if (byte >> 5 === 6)
        return 2;
      else if (byte >> 4 === 14)
        return 3;
      else if (byte >> 3 === 30)
        return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i)
        return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2)
            nb = 0;
          else
            self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0)
        return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed)
        return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0)
        return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});

// ../testeranto/node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream2 = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var ERR_STREAM_PREMATURE_CLOSE = require_errors().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop2() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop2);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module.exports = eos;
  }
});

// ../testeranto/node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var finished = require_end_of_stream2();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve2 = iter[kLastResolve];
      if (resolve2 !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve2(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      process.nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve2, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve2(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve2, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve2, reject) {
            process.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve2(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve2, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve2(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve2, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve2(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve2;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve2 = iterator[kLastResolve];
        if (resolve2 !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve2(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module.exports = createReadableStreamAsyncIterator;
  }
});

// ../testeranto/node_modules/readable-stream/lib/internal/streams/from.js
var require_from = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/internal/streams/from.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    function asyncGeneratorStep(gen, resolve2, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve2(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self2 = this, args = arguments;
        return new Promise(function(resolve2, reject) {
          var gen = fn.apply(self2, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve2, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source2 = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source2), true).forEach(function(key) {
          _defineProperty(target, key, source2[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2)) : ownKeys(Object(source2)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var ERR_INVALID_ARG_TYPE = require_errors().codes.ERR_INVALID_ARG_TYPE;
    function from(Readable, iterable, opts) {
      var iterator;
      if (iterable && typeof iterable.next === "function") {
        iterator = iterable;
      } else if (iterable && iterable[Symbol.asyncIterator])
        iterator = iterable[Symbol.asyncIterator]();
      else if (iterable && iterable[Symbol.iterator])
        iterator = iterable[Symbol.iterator]();
      else
        throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
      var readable = new Readable(_objectSpread({
        objectMode: true
      }, opts));
      var reading = false;
      readable._read = function() {
        if (!reading) {
          reading = true;
          next();
        }
      };
      function next() {
        return _next2.apply(this, arguments);
      }
      function _next2() {
        _next2 = _asyncToGenerator(function* () {
          try {
            var _yield$iterator$next = yield iterator.next(), value = _yield$iterator$next.value, done = _yield$iterator$next.done;
            if (done) {
              readable.push(null);
            } else if (readable.push(yield value)) {
              next();
            } else {
              reading = false;
            }
          } catch (err) {
            readable.destroy(err);
          }
        });
        return _next2.apply(this, arguments);
      }
      return readable;
    }
    module.exports = from;
  }
});

// ../testeranto/node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/_stream_readable.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    module.exports = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = __require("events").EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream = require_stream();
    var Buffer2 = __require("buffer").Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = __require("util");
    var debug2;
    if (debugUtil && debugUtil.debuglog) {
      debug2 = debugUtil.debuglog("stream");
    } else {
      debug2 = function debug3() {
      };
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    require_inherits()(Readable, Stream);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable))
        return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug2("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p = this._readableState.buffer.head;
      var content = "";
      while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n !== n) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length)
        return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug2("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0)
        state.emittedReadable = false;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug2("reading or ended", doRead);
      } else if (doRead) {
        debug2("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug2("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug2("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug2("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        process.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug2("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug2("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        var ret = dest.write(chunk);
        debug2("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug2("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug2("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++)
          dests[i].emit("unpipe", this, {
            hasUnpiped: false
          });
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug2("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            process.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug2("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null)
        ;
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug2("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug2("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug2("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug2("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug2("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x)
          return i;
      }
      return -1;
    }
  }
});

// ../testeranto/node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/_stream_transform.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    module.exports = Transform;
    var _require$codes = require_errors().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    require_inherits()(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function")
          this._transform = options.transform;
        if (typeof options.flush === "function")
          this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err, cb) {
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er)
        return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length)
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming)
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  }
});

// ../testeranto/node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    module.exports = PassThrough;
    var Transform = require_stream_transform();
    require_inherits()(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough))
        return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// ../testeranto/node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS({
  "../testeranto/node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var eos;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    var _require$codes = require_errors().codes;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop2(err) {
      if (err)
        throw err;
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0)
        eos = require_end_of_stream2();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isRequest(stream))
          return stream.abort();
        if (typeof stream.destroy === "function")
          return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    function call(fn) {
      fn();
    }
    function pipe(from, to) {
      return from.pipe(to);
    }
    function popCallback(streams) {
      if (!streams.length)
        return noop2;
      if (typeof streams[streams.length - 1] !== "function")
        return noop2;
      return streams.pop();
    }
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error)
            error = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    module.exports = pipeline;
  }
});

// ../testeranto/node_modules/readable-stream/readable.js
var require_readable = __commonJS({
  "../testeranto/node_modules/readable-stream/readable.js"(exports, module) {
    init_cjs_shim();
    var Stream = __require("stream");
    if (process.env.READABLE_STREAM === "disable" && Stream) {
      module.exports = Stream.Readable;
      Object.assign(module.exports, Stream);
      module.exports.Stream = Stream;
    } else {
      exports = module.exports = require_stream_readable();
      exports.Stream = Stream || exports;
      exports.Readable = exports;
      exports.Writable = require_stream_writable();
      exports.Duplex = require_stream_duplex();
      exports.Transform = require_stream_transform();
      exports.PassThrough = require_stream_passthrough();
      exports.finished = require_end_of_stream2();
      exports.pipeline = require_pipeline();
    }
  }
});

// ../testeranto/node_modules/bl/BufferList.js
var require_BufferList = __commonJS({
  "../testeranto/node_modules/bl/BufferList.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var { Buffer: Buffer2 } = __require("buffer");
    var symbol = Symbol.for("BufferList");
    function BufferList(buf) {
      if (!(this instanceof BufferList)) {
        return new BufferList(buf);
      }
      BufferList._init.call(this, buf);
    }
    BufferList._init = function _init(buf) {
      Object.defineProperty(this, symbol, { value: true });
      this._bufs = [];
      this.length = 0;
      if (buf) {
        this.append(buf);
      }
    };
    BufferList.prototype._new = function _new(buf) {
      return new BufferList(buf);
    };
    BufferList.prototype._offset = function _offset(offset) {
      if (offset === 0) {
        return [0, 0];
      }
      let tot = 0;
      for (let i = 0; i < this._bufs.length; i++) {
        const _t = tot + this._bufs[i].length;
        if (offset < _t || i === this._bufs.length - 1) {
          return [i, offset - tot];
        }
        tot = _t;
      }
    };
    BufferList.prototype._reverseOffset = function(blOffset) {
      const bufferId = blOffset[0];
      let offset = blOffset[1];
      for (let i = 0; i < bufferId; i++) {
        offset += this._bufs[i].length;
      }
      return offset;
    };
    BufferList.prototype.get = function get(index) {
      if (index > this.length || index < 0) {
        return void 0;
      }
      const offset = this._offset(index);
      return this._bufs[offset[0]][offset[1]];
    };
    BufferList.prototype.slice = function slice(start, end) {
      if (typeof start === "number" && start < 0) {
        start += this.length;
      }
      if (typeof end === "number" && end < 0) {
        end += this.length;
      }
      return this.copy(null, 0, start, end);
    };
    BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
      if (typeof srcStart !== "number" || srcStart < 0) {
        srcStart = 0;
      }
      if (typeof srcEnd !== "number" || srcEnd > this.length) {
        srcEnd = this.length;
      }
      if (srcStart >= this.length) {
        return dst || Buffer2.alloc(0);
      }
      if (srcEnd <= 0) {
        return dst || Buffer2.alloc(0);
      }
      const copy2 = !!dst;
      const off = this._offset(srcStart);
      const len = srcEnd - srcStart;
      let bytes = len;
      let bufoff = copy2 && dstStart || 0;
      let start = off[1];
      if (srcStart === 0 && srcEnd === this.length) {
        if (!copy2) {
          return this._bufs.length === 1 ? this._bufs[0] : Buffer2.concat(this._bufs, this.length);
        }
        for (let i = 0; i < this._bufs.length; i++) {
          this._bufs[i].copy(dst, bufoff);
          bufoff += this._bufs[i].length;
        }
        return dst;
      }
      if (bytes <= this._bufs[off[0]].length - start) {
        return copy2 ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
      }
      if (!copy2) {
        dst = Buffer2.allocUnsafe(len);
      }
      for (let i = off[0]; i < this._bufs.length; i++) {
        const l = this._bufs[i].length - start;
        if (bytes > l) {
          this._bufs[i].copy(dst, bufoff, start);
          bufoff += l;
        } else {
          this._bufs[i].copy(dst, bufoff, start, start + bytes);
          bufoff += l;
          break;
        }
        bytes -= l;
        if (start) {
          start = 0;
        }
      }
      if (dst.length > bufoff)
        return dst.slice(0, bufoff);
      return dst;
    };
    BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
      start = start || 0;
      end = typeof end !== "number" ? this.length : end;
      if (start < 0) {
        start += this.length;
      }
      if (end < 0) {
        end += this.length;
      }
      if (start === end) {
        return this._new();
      }
      const startOffset = this._offset(start);
      const endOffset = this._offset(end);
      const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
      if (endOffset[1] === 0) {
        buffers.pop();
      } else {
        buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
      }
      if (startOffset[1] !== 0) {
        buffers[0] = buffers[0].slice(startOffset[1]);
      }
      return this._new(buffers);
    };
    BufferList.prototype.toString = function toString(encoding, start, end) {
      return this.slice(start, end).toString(encoding);
    };
    BufferList.prototype.consume = function consume(bytes) {
      bytes = Math.trunc(bytes);
      if (Number.isNaN(bytes) || bytes <= 0)
        return this;
      while (this._bufs.length) {
        if (bytes >= this._bufs[0].length) {
          bytes -= this._bufs[0].length;
          this.length -= this._bufs[0].length;
          this._bufs.shift();
        } else {
          this._bufs[0] = this._bufs[0].slice(bytes);
          this.length -= bytes;
          break;
        }
      }
      return this;
    };
    BufferList.prototype.duplicate = function duplicate() {
      const copy = this._new();
      for (let i = 0; i < this._bufs.length; i++) {
        copy.append(this._bufs[i]);
      }
      return copy;
    };
    BufferList.prototype.append = function append(buf) {
      if (buf == null) {
        return this;
      }
      if (buf.buffer) {
        this._appendBuffer(Buffer2.from(buf.buffer, buf.byteOffset, buf.byteLength));
      } else if (Array.isArray(buf)) {
        for (let i = 0; i < buf.length; i++) {
          this.append(buf[i]);
        }
      } else if (this._isBufferList(buf)) {
        for (let i = 0; i < buf._bufs.length; i++) {
          this.append(buf._bufs[i]);
        }
      } else {
        if (typeof buf === "number") {
          buf = buf.toString();
        }
        this._appendBuffer(Buffer2.from(buf));
      }
      return this;
    };
    BufferList.prototype._appendBuffer = function appendBuffer(buf) {
      this._bufs.push(buf);
      this.length += buf.length;
    };
    BufferList.prototype.indexOf = function(search, offset, encoding) {
      if (encoding === void 0 && typeof offset === "string") {
        encoding = offset;
        offset = void 0;
      }
      if (typeof search === "function" || Array.isArray(search)) {
        throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
      } else if (typeof search === "number") {
        search = Buffer2.from([search]);
      } else if (typeof search === "string") {
        search = Buffer2.from(search, encoding);
      } else if (this._isBufferList(search)) {
        search = search.slice();
      } else if (Array.isArray(search.buffer)) {
        search = Buffer2.from(search.buffer, search.byteOffset, search.byteLength);
      } else if (!Buffer2.isBuffer(search)) {
        search = Buffer2.from(search);
      }
      offset = Number(offset || 0);
      if (isNaN(offset)) {
        offset = 0;
      }
      if (offset < 0) {
        offset = this.length + offset;
      }
      if (offset < 0) {
        offset = 0;
      }
      if (search.length === 0) {
        return offset > this.length ? this.length : offset;
      }
      const blOffset = this._offset(offset);
      let blIndex = blOffset[0];
      let buffOffset = blOffset[1];
      for (; blIndex < this._bufs.length; blIndex++) {
        const buff = this._bufs[blIndex];
        while (buffOffset < buff.length) {
          const availableWindow = buff.length - buffOffset;
          if (availableWindow >= search.length) {
            const nativeSearchResult = buff.indexOf(search, buffOffset);
            if (nativeSearchResult !== -1) {
              return this._reverseOffset([blIndex, nativeSearchResult]);
            }
            buffOffset = buff.length - search.length + 1;
          } else {
            const revOffset = this._reverseOffset([blIndex, buffOffset]);
            if (this._match(revOffset, search)) {
              return revOffset;
            }
            buffOffset++;
          }
        }
        buffOffset = 0;
      }
      return -1;
    };
    BufferList.prototype._match = function(offset, search) {
      if (this.length - offset < search.length) {
        return false;
      }
      for (let searchOffset = 0; searchOffset < search.length; searchOffset++) {
        if (this.get(offset + searchOffset) !== search[searchOffset]) {
          return false;
        }
      }
      return true;
    };
    (function() {
      const methods = {
        readDoubleBE: 8,
        readDoubleLE: 8,
        readFloatBE: 4,
        readFloatLE: 4,
        readInt32BE: 4,
        readInt32LE: 4,
        readUInt32BE: 4,
        readUInt32LE: 4,
        readInt16BE: 2,
        readInt16LE: 2,
        readUInt16BE: 2,
        readUInt16LE: 2,
        readInt8: 1,
        readUInt8: 1,
        readIntBE: null,
        readIntLE: null,
        readUIntBE: null,
        readUIntLE: null
      };
      for (const m in methods) {
        (function(m2) {
          if (methods[m2] === null) {
            BufferList.prototype[m2] = function(offset, byteLength) {
              return this.slice(offset, offset + byteLength)[m2](0, byteLength);
            };
          } else {
            BufferList.prototype[m2] = function(offset = 0) {
              return this.slice(offset, offset + methods[m2])[m2](0);
            };
          }
        })(m);
      }
    })();
    BufferList.prototype._isBufferList = function _isBufferList(b) {
      return b instanceof BufferList || BufferList.isBufferList(b);
    };
    BufferList.isBufferList = function isBufferList(b) {
      return b != null && b[symbol];
    };
    module.exports = BufferList;
  }
});

// ../testeranto/node_modules/bl/bl.js
var require_bl = __commonJS({
  "../testeranto/node_modules/bl/bl.js"(exports, module) {
    "use strict";
    init_cjs_shim();
    var DuplexStream = require_readable().Duplex;
    var inherits = require_inherits();
    var BufferList = require_BufferList();
    function BufferListStream(callback) {
      if (!(this instanceof BufferListStream)) {
        return new BufferListStream(callback);
      }
      if (typeof callback === "function") {
        this._callback = callback;
        const piper = function piper2(err) {
          if (this._callback) {
            this._callback(err);
            this._callback = null;
          }
        }.bind(this);
        this.on("pipe", function onPipe(src) {
          src.on("error", piper);
        });
        this.on("unpipe", function onUnpipe(src) {
          src.removeListener("error", piper);
        });
        callback = null;
      }
      BufferList._init.call(this, callback);
      DuplexStream.call(this);
    }
    inherits(BufferListStream, DuplexStream);
    Object.assign(BufferListStream.prototype, BufferList.prototype);
    BufferListStream.prototype._new = function _new(callback) {
      return new BufferListStream(callback);
    };
    BufferListStream.prototype._write = function _write(buf, encoding, callback) {
      this._appendBuffer(buf);
      if (typeof callback === "function") {
        callback();
      }
    };
    BufferListStream.prototype._read = function _read(size) {
      if (!this.length) {
        return this.push(null);
      }
      size = Math.min(size, this.length);
      this.push(this.slice(0, size));
      this.consume(size);
    };
    BufferListStream.prototype.end = function end(chunk) {
      DuplexStream.prototype.end.call(this, chunk);
      if (this._callback) {
        this._callback(null, this.slice());
        this._callback = null;
      }
    };
    BufferListStream.prototype._destroy = function _destroy(err, cb) {
      this._bufs.length = 0;
      this.length = 0;
      cb(err);
    };
    BufferListStream.prototype._isBufferList = function _isBufferList(b) {
      return b instanceof BufferListStream || b instanceof BufferList || BufferListStream.isBufferList(b);
    };
    BufferListStream.isBufferList = BufferList.isBufferList;
    module.exports = BufferListStream;
    module.exports.BufferListStream = BufferListStream;
    module.exports.BufferList = BufferList;
  }
});

// ../testeranto/node_modules/tar-stream/headers.js
var require_headers = __commonJS({
  "../testeranto/node_modules/tar-stream/headers.js"(exports) {
    init_cjs_shim();
    var alloc = Buffer.alloc;
    var ZEROS = "0000000000000000000";
    var SEVENS = "7777777777777777777";
    var ZERO_OFFSET = "0".charCodeAt(0);
    var USTAR_MAGIC = Buffer.from("ustar\0", "binary");
    var USTAR_VER = Buffer.from("00", "binary");
    var GNU_MAGIC = Buffer.from("ustar ", "binary");
    var GNU_VER = Buffer.from(" \0", "binary");
    var MASK = parseInt("7777", 8);
    var MAGIC_OFFSET = 257;
    var VERSION_OFFSET = 263;
    var clamp = function(index, len, defaultValue) {
      if (typeof index !== "number")
        return defaultValue;
      index = ~~index;
      if (index >= len)
        return len;
      if (index >= 0)
        return index;
      index += len;
      if (index >= 0)
        return index;
      return 0;
    };
    var toType = function(flag) {
      switch (flag) {
        case 0:
          return "file";
        case 1:
          return "link";
        case 2:
          return "symlink";
        case 3:
          return "character-device";
        case 4:
          return "block-device";
        case 5:
          return "directory";
        case 6:
          return "fifo";
        case 7:
          return "contiguous-file";
        case 72:
          return "pax-header";
        case 55:
          return "pax-global-header";
        case 27:
          return "gnu-long-link-path";
        case 28:
        case 30:
          return "gnu-long-path";
      }
      return null;
    };
    var toTypeflag = function(flag) {
      switch (flag) {
        case "file":
          return 0;
        case "link":
          return 1;
        case "symlink":
          return 2;
        case "character-device":
          return 3;
        case "block-device":
          return 4;
        case "directory":
          return 5;
        case "fifo":
          return 6;
        case "contiguous-file":
          return 7;
        case "pax-header":
          return 72;
      }
      return 0;
    };
    var indexOf = function(block, num, offset, end) {
      for (; offset < end; offset++) {
        if (block[offset] === num)
          return offset;
      }
      return end;
    };
    var cksum = function(block) {
      var sum = 8 * 32;
      for (var i = 0; i < 148; i++)
        sum += block[i];
      for (var j = 156; j < 512; j++)
        sum += block[j];
      return sum;
    };
    var encodeOct = function(val, n) {
      val = val.toString(8);
      if (val.length > n)
        return SEVENS.slice(0, n) + " ";
      else
        return ZEROS.slice(0, n - val.length) + val + " ";
    };
    function parse256(buf) {
      var positive;
      if (buf[0] === 128)
        positive = true;
      else if (buf[0] === 255)
        positive = false;
      else
        return null;
      var tuple = [];
      for (var i = buf.length - 1; i > 0; i--) {
        var byte = buf[i];
        if (positive)
          tuple.push(byte);
        else
          tuple.push(255 - byte);
      }
      var sum = 0;
      var l = tuple.length;
      for (i = 0; i < l; i++) {
        sum += tuple[i] * Math.pow(256, i);
      }
      return positive ? sum : -1 * sum;
    }
    var decodeOct = function(val, offset, length) {
      val = val.slice(offset, offset + length);
      offset = 0;
      if (val[offset] & 128) {
        return parse256(val);
      } else {
        while (offset < val.length && val[offset] === 32)
          offset++;
        var end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
        while (offset < end && val[offset] === 0)
          offset++;
        if (end === offset)
          return 0;
        return parseInt(val.slice(offset, end).toString(), 8);
      }
    };
    var decodeStr = function(val, offset, length, encoding) {
      return val.slice(offset, indexOf(val, 0, offset, offset + length)).toString(encoding);
    };
    var addLength = function(str) {
      var len = Buffer.byteLength(str);
      var digits = Math.floor(Math.log(len) / Math.log(10)) + 1;
      if (len + digits >= Math.pow(10, digits))
        digits++;
      return len + digits + str;
    };
    exports.decodeLongPath = function(buf, encoding) {
      return decodeStr(buf, 0, buf.length, encoding);
    };
    exports.encodePax = function(opts) {
      var result = "";
      if (opts.name)
        result += addLength(" path=" + opts.name + "\n");
      if (opts.linkname)
        result += addLength(" linkpath=" + opts.linkname + "\n");
      var pax = opts.pax;
      if (pax) {
        for (var key in pax) {
          result += addLength(" " + key + "=" + pax[key] + "\n");
        }
      }
      return Buffer.from(result);
    };
    exports.decodePax = function(buf) {
      var result = {};
      while (buf.length) {
        var i = 0;
        while (i < buf.length && buf[i] !== 32)
          i++;
        var len = parseInt(buf.slice(0, i).toString(), 10);
        if (!len)
          return result;
        var b = buf.slice(i + 1, len - 1).toString();
        var keyIndex = b.indexOf("=");
        if (keyIndex === -1)
          return result;
        result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1);
        buf = buf.slice(len);
      }
      return result;
    };
    exports.encode = function(opts) {
      var buf = alloc(512);
      var name = opts.name;
      var prefix = "";
      if (opts.typeflag === 5 && name[name.length - 1] !== "/")
        name += "/";
      if (Buffer.byteLength(name) !== name.length)
        return null;
      while (Buffer.byteLength(name) > 100) {
        var i = name.indexOf("/");
        if (i === -1)
          return null;
        prefix += prefix ? "/" + name.slice(0, i) : name.slice(0, i);
        name = name.slice(i + 1);
      }
      if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155)
        return null;
      if (opts.linkname && Buffer.byteLength(opts.linkname) > 100)
        return null;
      buf.write(name);
      buf.write(encodeOct(opts.mode & MASK, 6), 100);
      buf.write(encodeOct(opts.uid, 6), 108);
      buf.write(encodeOct(opts.gid, 6), 116);
      buf.write(encodeOct(opts.size, 11), 124);
      buf.write(encodeOct(opts.mtime.getTime() / 1e3 | 0, 11), 136);
      buf[156] = ZERO_OFFSET + toTypeflag(opts.type);
      if (opts.linkname)
        buf.write(opts.linkname, 157);
      USTAR_MAGIC.copy(buf, MAGIC_OFFSET);
      USTAR_VER.copy(buf, VERSION_OFFSET);
      if (opts.uname)
        buf.write(opts.uname, 265);
      if (opts.gname)
        buf.write(opts.gname, 297);
      buf.write(encodeOct(opts.devmajor || 0, 6), 329);
      buf.write(encodeOct(opts.devminor || 0, 6), 337);
      if (prefix)
        buf.write(prefix, 345);
      buf.write(encodeOct(cksum(buf), 6), 148);
      return buf;
    };
    exports.decode = function(buf, filenameEncoding, allowUnknownFormat) {
      var typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET;
      var name = decodeStr(buf, 0, 100, filenameEncoding);
      var mode = decodeOct(buf, 100, 8);
      var uid = decodeOct(buf, 108, 8);
      var gid = decodeOct(buf, 116, 8);
      var size = decodeOct(buf, 124, 12);
      var mtime = decodeOct(buf, 136, 12);
      var type = toType(typeflag);
      var linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding);
      var uname = decodeStr(buf, 265, 32);
      var gname = decodeStr(buf, 297, 32);
      var devmajor = decodeOct(buf, 329, 8);
      var devminor = decodeOct(buf, 337, 8);
      var c = cksum(buf);
      if (c === 8 * 32)
        return null;
      if (c !== decodeOct(buf, 148, 8))
        throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
      if (USTAR_MAGIC.compare(buf, MAGIC_OFFSET, MAGIC_OFFSET + 6) === 0) {
        if (buf[345])
          name = decodeStr(buf, 345, 155, filenameEncoding) + "/" + name;
      } else if (GNU_MAGIC.compare(buf, MAGIC_OFFSET, MAGIC_OFFSET + 6) === 0 && GNU_VER.compare(buf, VERSION_OFFSET, VERSION_OFFSET + 2) === 0) {
      } else {
        if (!allowUnknownFormat) {
          throw new Error("Invalid tar header: unknown format.");
        }
      }
      if (typeflag === 0 && name && name[name.length - 1] === "/")
        typeflag = 5;
      return {
        name,
        mode,
        uid,
        gid,
        size,
        mtime: new Date(1e3 * mtime),
        type,
        linkname,
        uname,
        gname,
        devmajor,
        devminor
      };
    };
  }
});

// ../testeranto/node_modules/tar-stream/extract.js
var require_extract = __commonJS({
  "../testeranto/node_modules/tar-stream/extract.js"(exports, module) {
    init_cjs_shim();
    var util2 = __require("util");
    var bl = require_bl();
    var headers = require_headers();
    var Writable = require_readable().Writable;
    var PassThrough = require_readable().PassThrough;
    var noop2 = function() {
    };
    var overflow = function(size) {
      size &= 511;
      return size && 512 - size;
    };
    var emptyStream = function(self2, offset) {
      var s = new Source(self2, offset);
      s.end();
      return s;
    };
    var mixinPax = function(header, pax) {
      if (pax.path)
        header.name = pax.path;
      if (pax.linkpath)
        header.linkname = pax.linkpath;
      if (pax.size)
        header.size = parseInt(pax.size, 10);
      header.pax = pax;
      return header;
    };
    var Source = function(self2, offset) {
      this._parent = self2;
      this.offset = offset;
      PassThrough.call(this, { autoDestroy: false });
    };
    util2.inherits(Source, PassThrough);
    Source.prototype.destroy = function(err) {
      this._parent.destroy(err);
    };
    var Extract = function(opts) {
      if (!(this instanceof Extract))
        return new Extract(opts);
      Writable.call(this, opts);
      opts = opts || {};
      this._offset = 0;
      this._buffer = bl();
      this._missing = 0;
      this._partial = false;
      this._onparse = noop2;
      this._header = null;
      this._stream = null;
      this._overflow = null;
      this._cb = null;
      this._locked = false;
      this._destroyed = false;
      this._pax = null;
      this._paxGlobal = null;
      this._gnuLongPath = null;
      this._gnuLongLinkPath = null;
      var self2 = this;
      var b = self2._buffer;
      var oncontinue = function() {
        self2._continue();
      };
      var onunlock = function(err) {
        self2._locked = false;
        if (err)
          return self2.destroy(err);
        if (!self2._stream)
          oncontinue();
      };
      var onstreamend = function() {
        self2._stream = null;
        var drain = overflow(self2._header.size);
        if (drain)
          self2._parse(drain, ondrain);
        else
          self2._parse(512, onheader);
        if (!self2._locked)
          oncontinue();
      };
      var ondrain = function() {
        self2._buffer.consume(overflow(self2._header.size));
        self2._parse(512, onheader);
        oncontinue();
      };
      var onpaxglobalheader = function() {
        var size = self2._header.size;
        self2._paxGlobal = headers.decodePax(b.slice(0, size));
        b.consume(size);
        onstreamend();
      };
      var onpaxheader = function() {
        var size = self2._header.size;
        self2._pax = headers.decodePax(b.slice(0, size));
        if (self2._paxGlobal)
          self2._pax = Object.assign({}, self2._paxGlobal, self2._pax);
        b.consume(size);
        onstreamend();
      };
      var ongnulongpath = function() {
        var size = self2._header.size;
        this._gnuLongPath = headers.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
        b.consume(size);
        onstreamend();
      };
      var ongnulonglinkpath = function() {
        var size = self2._header.size;
        this._gnuLongLinkPath = headers.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
        b.consume(size);
        onstreamend();
      };
      var onheader = function() {
        var offset = self2._offset;
        var header;
        try {
          header = self2._header = headers.decode(b.slice(0, 512), opts.filenameEncoding, opts.allowUnknownFormat);
        } catch (err) {
          self2.emit("error", err);
        }
        b.consume(512);
        if (!header) {
          self2._parse(512, onheader);
          oncontinue();
          return;
        }
        if (header.type === "gnu-long-path") {
          self2._parse(header.size, ongnulongpath);
          oncontinue();
          return;
        }
        if (header.type === "gnu-long-link-path") {
          self2._parse(header.size, ongnulonglinkpath);
          oncontinue();
          return;
        }
        if (header.type === "pax-global-header") {
          self2._parse(header.size, onpaxglobalheader);
          oncontinue();
          return;
        }
        if (header.type === "pax-header") {
          self2._parse(header.size, onpaxheader);
          oncontinue();
          return;
        }
        if (self2._gnuLongPath) {
          header.name = self2._gnuLongPath;
          self2._gnuLongPath = null;
        }
        if (self2._gnuLongLinkPath) {
          header.linkname = self2._gnuLongLinkPath;
          self2._gnuLongLinkPath = null;
        }
        if (self2._pax) {
          self2._header = header = mixinPax(header, self2._pax);
          self2._pax = null;
        }
        self2._locked = true;
        if (!header.size || header.type === "directory") {
          self2._parse(512, onheader);
          self2.emit("entry", header, emptyStream(self2, offset), onunlock);
          return;
        }
        self2._stream = new Source(self2, offset);
        self2.emit("entry", header, self2._stream, onunlock);
        self2._parse(header.size, onstreamend);
        oncontinue();
      };
      this._onheader = onheader;
      this._parse(512, onheader);
    };
    util2.inherits(Extract, Writable);
    Extract.prototype.destroy = function(err) {
      if (this._destroyed)
        return;
      this._destroyed = true;
      if (err)
        this.emit("error", err);
      this.emit("close");
      if (this._stream)
        this._stream.emit("close");
    };
    Extract.prototype._parse = function(size, onparse) {
      if (this._destroyed)
        return;
      this._offset += size;
      this._missing = size;
      if (onparse === this._onheader)
        this._partial = false;
      this._onparse = onparse;
    };
    Extract.prototype._continue = function() {
      if (this._destroyed)
        return;
      var cb = this._cb;
      this._cb = noop2;
      if (this._overflow)
        this._write(this._overflow, void 0, cb);
      else
        cb();
    };
    Extract.prototype._write = function(data, enc, cb) {
      if (this._destroyed)
        return;
      var s = this._stream;
      var b = this._buffer;
      var missing = this._missing;
      if (data.length)
        this._partial = true;
      if (data.length < missing) {
        this._missing -= data.length;
        this._overflow = null;
        if (s)
          return s.write(data, cb);
        b.append(data);
        return cb();
      }
      this._cb = cb;
      this._missing = 0;
      var overflow2 = null;
      if (data.length > missing) {
        overflow2 = data.slice(missing);
        data = data.slice(0, missing);
      }
      if (s)
        s.end(data);
      else
        b.append(data);
      this._overflow = overflow2;
      this._onparse();
    };
    Extract.prototype._final = function(cb) {
      if (this._partial)
        return this.destroy(new Error("Unexpected end of data"));
      cb();
    };
    module.exports = Extract;
  }
});

// ../testeranto/node_modules/fs-constants/index.js
var require_fs_constants = __commonJS({
  "../testeranto/node_modules/fs-constants/index.js"(exports, module) {
    init_cjs_shim();
    module.exports = __require("fs").constants || __require("constants");
  }
});

// ../testeranto/node_modules/tar-stream/pack.js
var require_pack = __commonJS({
  "../testeranto/node_modules/tar-stream/pack.js"(exports, module) {
    init_cjs_shim();
    var constants = require_fs_constants();
    var eos = require_end_of_stream();
    var inherits = require_inherits();
    var alloc = Buffer.alloc;
    var Readable = require_readable().Readable;
    var Writable = require_readable().Writable;
    var StringDecoder = __require("string_decoder").StringDecoder;
    var headers = require_headers();
    var DMODE = parseInt("755", 8);
    var FMODE = parseInt("644", 8);
    var END_OF_TAR = alloc(1024);
    var noop2 = function() {
    };
    var overflow = function(self2, size) {
      size &= 511;
      if (size)
        self2.push(END_OF_TAR.slice(0, 512 - size));
    };
    function modeToType(mode) {
      switch (mode & constants.S_IFMT) {
        case constants.S_IFBLK:
          return "block-device";
        case constants.S_IFCHR:
          return "character-device";
        case constants.S_IFDIR:
          return "directory";
        case constants.S_IFIFO:
          return "fifo";
        case constants.S_IFLNK:
          return "symlink";
      }
      return "file";
    }
    var Sink = function(to) {
      Writable.call(this);
      this.written = 0;
      this._to = to;
      this._destroyed = false;
    };
    inherits(Sink, Writable);
    Sink.prototype._write = function(data, enc, cb) {
      this.written += data.length;
      if (this._to.push(data))
        return cb();
      this._to._drain = cb;
    };
    Sink.prototype.destroy = function() {
      if (this._destroyed)
        return;
      this._destroyed = true;
      this.emit("close");
    };
    var LinkSink = function() {
      Writable.call(this);
      this.linkname = "";
      this._decoder = new StringDecoder("utf-8");
      this._destroyed = false;
    };
    inherits(LinkSink, Writable);
    LinkSink.prototype._write = function(data, enc, cb) {
      this.linkname += this._decoder.write(data);
      cb();
    };
    LinkSink.prototype.destroy = function() {
      if (this._destroyed)
        return;
      this._destroyed = true;
      this.emit("close");
    };
    var Void = function() {
      Writable.call(this);
      this._destroyed = false;
    };
    inherits(Void, Writable);
    Void.prototype._write = function(data, enc, cb) {
      cb(new Error("No body allowed for this entry"));
    };
    Void.prototype.destroy = function() {
      if (this._destroyed)
        return;
      this._destroyed = true;
      this.emit("close");
    };
    var Pack = function(opts) {
      if (!(this instanceof Pack))
        return new Pack(opts);
      Readable.call(this, opts);
      this._drain = noop2;
      this._finalized = false;
      this._finalizing = false;
      this._destroyed = false;
      this._stream = null;
    };
    inherits(Pack, Readable);
    Pack.prototype.entry = function(header, buffer, callback) {
      if (this._stream)
        throw new Error("already piping an entry");
      if (this._finalized || this._destroyed)
        return;
      if (typeof buffer === "function") {
        callback = buffer;
        buffer = null;
      }
      if (!callback)
        callback = noop2;
      var self2 = this;
      if (!header.size || header.type === "symlink")
        header.size = 0;
      if (!header.type)
        header.type = modeToType(header.mode);
      if (!header.mode)
        header.mode = header.type === "directory" ? DMODE : FMODE;
      if (!header.uid)
        header.uid = 0;
      if (!header.gid)
        header.gid = 0;
      if (!header.mtime)
        header.mtime = /* @__PURE__ */ new Date();
      if (typeof buffer === "string")
        buffer = Buffer.from(buffer);
      if (Buffer.isBuffer(buffer)) {
        header.size = buffer.length;
        this._encode(header);
        var ok = this.push(buffer);
        overflow(self2, header.size);
        if (ok)
          process.nextTick(callback);
        else
          this._drain = callback;
        return new Void();
      }
      if (header.type === "symlink" && !header.linkname) {
        var linkSink = new LinkSink();
        eos(linkSink, function(err) {
          if (err) {
            self2.destroy();
            return callback(err);
          }
          header.linkname = linkSink.linkname;
          self2._encode(header);
          callback();
        });
        return linkSink;
      }
      this._encode(header);
      if (header.type !== "file" && header.type !== "contiguous-file") {
        process.nextTick(callback);
        return new Void();
      }
      var sink = new Sink(this);
      this._stream = sink;
      eos(sink, function(err) {
        self2._stream = null;
        if (err) {
          self2.destroy();
          return callback(err);
        }
        if (sink.written !== header.size) {
          self2.destroy();
          return callback(new Error("size mismatch"));
        }
        overflow(self2, header.size);
        if (self2._finalizing)
          self2.finalize();
        callback();
      });
      return sink;
    };
    Pack.prototype.finalize = function() {
      if (this._stream) {
        this._finalizing = true;
        return;
      }
      if (this._finalized)
        return;
      this._finalized = true;
      this.push(END_OF_TAR);
      this.push(null);
    };
    Pack.prototype.destroy = function(err) {
      if (this._destroyed)
        return;
      this._destroyed = true;
      if (err)
        this.emit("error", err);
      this.emit("close");
      if (this._stream && this._stream.destroy)
        this._stream.destroy();
    };
    Pack.prototype._encode = function(header) {
      if (!header.pax) {
        var buf = headers.encode(header);
        if (buf) {
          this.push(buf);
          return;
        }
      }
      this._encodePax(header);
    };
    Pack.prototype._encodePax = function(header) {
      var paxHeader = headers.encodePax({
        name: header.name,
        linkname: header.linkname,
        pax: header.pax
      });
      var newHeader = {
        name: "PaxHeader",
        mode: header.mode,
        uid: header.uid,
        gid: header.gid,
        size: paxHeader.length,
        mtime: header.mtime,
        type: "pax-header",
        linkname: header.linkname && "PaxHeader",
        uname: header.uname,
        gname: header.gname,
        devmajor: header.devmajor,
        devminor: header.devminor
      };
      this.push(headers.encode(newHeader));
      this.push(paxHeader);
      overflow(this, paxHeader.length);
      newHeader.size = header.size;
      newHeader.type = header.type;
      this.push(headers.encode(newHeader));
    };
    Pack.prototype._read = function(n) {
      var drain = this._drain;
      this._drain = noop2;
      drain();
    };
    module.exports = Pack;
  }
});

// ../testeranto/node_modules/tar-stream/index.js
var require_tar_stream = __commonJS({
  "../testeranto/node_modules/tar-stream/index.js"(exports) {
    init_cjs_shim();
    exports.extract = require_extract();
    exports.pack = require_pack();
  }
});

// ../testeranto/node_modules/mkdirp-classic/index.js
var require_mkdirp_classic = __commonJS({
  "../testeranto/node_modules/mkdirp-classic/index.js"(exports, module) {
    init_cjs_shim();
    var path5 = __require("path");
    var fs4 = __require("fs");
    var _0777 = parseInt("0777", 8);
    module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
    function mkdirP(p, opts, f, made) {
      if (typeof opts === "function") {
        f = opts;
        opts = {};
      } else if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      var mode = opts.mode;
      var xfs = opts.fs || fs4;
      if (mode === void 0) {
        mode = _0777 & ~process.umask();
      }
      if (!made)
        made = null;
      var cb = f || function() {
      };
      p = path5.resolve(p);
      xfs.mkdir(p, mode, function(er) {
        if (!er) {
          made = made || p;
          return cb(null, made);
        }
        switch (er.code) {
          case "ENOENT":
            mkdirP(path5.dirname(p), opts, function(er2, made2) {
              if (er2)
                cb(er2, made2);
              else
                mkdirP(p, opts, cb, made2);
            });
            break;
          default:
            xfs.stat(p, function(er2, stat) {
              if (er2 || !stat.isDirectory())
                cb(er, made);
              else
                cb(null, made);
            });
            break;
        }
      });
    }
    mkdirP.sync = function sync(p, opts, made) {
      if (!opts || typeof opts !== "object") {
        opts = { mode: opts };
      }
      var mode = opts.mode;
      var xfs = opts.fs || fs4;
      if (mode === void 0) {
        mode = _0777 & ~process.umask();
      }
      if (!made)
        made = null;
      p = path5.resolve(p);
      try {
        xfs.mkdirSync(p, mode);
        made = made || p;
      } catch (err0) {
        switch (err0.code) {
          case "ENOENT":
            made = sync(path5.dirname(p), opts, made);
            sync(p, opts, made);
            break;
          default:
            var stat;
            try {
              stat = xfs.statSync(p);
            } catch (err1) {
              throw err0;
            }
            if (!stat.isDirectory())
              throw err0;
            break;
        }
      }
      return made;
    };
  }
});

// ../testeranto/node_modules/tar-fs/index.js
var require_tar_fs = __commonJS({
  "../testeranto/node_modules/tar-fs/index.js"(exports) {
    init_cjs_shim();
    var chownr = require_chownr();
    var tar2 = require_tar_stream();
    var pump = require_pump();
    var mkdirp = require_mkdirp_classic();
    var fs4 = __require("fs");
    var path5 = __require("path");
    var os5 = __require("os");
    var win32 = os5.platform() === "win32";
    var noop2 = function() {
    };
    var echo = function(name) {
      return name;
    };
    var normalize = !win32 ? echo : function(name) {
      return name.replace(/\\/g, "/").replace(/[:?<>|]/g, "_");
    };
    var statAll = function(fs5, stat, cwd, ignore, entries, sort) {
      var queue = entries || ["."];
      return function loop(callback) {
        if (!queue.length)
          return callback();
        var next = queue.shift();
        var nextAbs = path5.join(cwd, next);
        stat.call(fs5, nextAbs, function(err, stat2) {
          if (err)
            return callback(err);
          if (!stat2.isDirectory())
            return callback(null, next, stat2);
          fs5.readdir(nextAbs, function(err2, files) {
            if (err2)
              return callback(err2);
            if (sort)
              files.sort();
            for (var i = 0; i < files.length; i++) {
              if (!ignore(path5.join(cwd, next, files[i])))
                queue.push(path5.join(next, files[i]));
            }
            callback(null, next, stat2);
          });
        });
      };
    };
    var strip = function(map, level) {
      return function(header) {
        header.name = header.name.split("/").slice(level).join("/");
        var linkname = header.linkname;
        if (linkname && (header.type === "link" || path5.isAbsolute(linkname))) {
          header.linkname = linkname.split("/").slice(level).join("/");
        }
        return map(header);
      };
    };
    exports.pack = function(cwd, opts) {
      if (!cwd)
        cwd = ".";
      if (!opts)
        opts = {};
      var xfs = opts.fs || fs4;
      var ignore = opts.ignore || opts.filter || noop2;
      var map = opts.map || noop2;
      var mapStream = opts.mapStream || echo;
      var statNext = statAll(xfs, opts.dereference ? xfs.stat : xfs.lstat, cwd, ignore, opts.entries, opts.sort);
      var strict = opts.strict !== false;
      var umask = typeof opts.umask === "number" ? ~opts.umask : ~processUmask();
      var dmode = typeof opts.dmode === "number" ? opts.dmode : 0;
      var fmode = typeof opts.fmode === "number" ? opts.fmode : 0;
      var pack = opts.pack || tar2.pack();
      var finish = opts.finish || noop2;
      if (opts.strip)
        map = strip(map, opts.strip);
      if (opts.readable) {
        dmode |= parseInt(555, 8);
        fmode |= parseInt(444, 8);
      }
      if (opts.writable) {
        dmode |= parseInt(333, 8);
        fmode |= parseInt(222, 8);
      }
      var onsymlink = function(filename, header) {
        xfs.readlink(path5.join(cwd, filename), function(err, linkname) {
          if (err)
            return pack.destroy(err);
          header.linkname = normalize(linkname);
          pack.entry(header, onnextentry);
        });
      };
      var onstat = function(err, filename, stat) {
        if (err)
          return pack.destroy(err);
        if (!filename) {
          if (opts.finalize !== false)
            pack.finalize();
          return finish(pack);
        }
        if (stat.isSocket())
          return onnextentry();
        var header = {
          name: normalize(filename),
          mode: (stat.mode | (stat.isDirectory() ? dmode : fmode)) & umask,
          mtime: stat.mtime,
          size: stat.size,
          type: "file",
          uid: stat.uid,
          gid: stat.gid
        };
        if (stat.isDirectory()) {
          header.size = 0;
          header.type = "directory";
          header = map(header) || header;
          return pack.entry(header, onnextentry);
        }
        if (stat.isSymbolicLink()) {
          header.size = 0;
          header.type = "symlink";
          header = map(header) || header;
          return onsymlink(filename, header);
        }
        header = map(header) || header;
        if (!stat.isFile()) {
          if (strict)
            return pack.destroy(new Error("unsupported type for " + filename));
          return onnextentry();
        }
        var entry = pack.entry(header, onnextentry);
        if (!entry)
          return;
        var rs = mapStream(xfs.createReadStream(path5.join(cwd, filename), { start: 0, end: header.size > 0 ? header.size - 1 : header.size }), header);
        rs.on("error", function(err2) {
          entry.destroy(err2);
        });
        pump(rs, entry);
      };
      var onnextentry = function(err) {
        if (err)
          return pack.destroy(err);
        statNext(onstat);
      };
      onnextentry();
      return pack;
    };
    var head = function(list) {
      return list.length ? list[list.length - 1] : null;
    };
    var processGetuid = function() {
      return process.getuid ? process.getuid() : -1;
    };
    var processUmask = function() {
      return process.umask ? process.umask() : 0;
    };
    exports.extract = function(cwd, opts) {
      if (!cwd)
        cwd = ".";
      if (!opts)
        opts = {};
      var xfs = opts.fs || fs4;
      var ignore = opts.ignore || opts.filter || noop2;
      var map = opts.map || noop2;
      var mapStream = opts.mapStream || echo;
      var own = opts.chown !== false && !win32 && processGetuid() === 0;
      var extract = opts.extract || tar2.extract();
      var stack = [];
      var now = /* @__PURE__ */ new Date();
      var umask = typeof opts.umask === "number" ? ~opts.umask : ~processUmask();
      var dmode = typeof opts.dmode === "number" ? opts.dmode : 0;
      var fmode = typeof opts.fmode === "number" ? opts.fmode : 0;
      var strict = opts.strict !== false;
      if (opts.strip)
        map = strip(map, opts.strip);
      if (opts.readable) {
        dmode |= parseInt(555, 8);
        fmode |= parseInt(444, 8);
      }
      if (opts.writable) {
        dmode |= parseInt(333, 8);
        fmode |= parseInt(222, 8);
      }
      var utimesParent = function(name, cb) {
        var top;
        while ((top = head(stack)) && name.slice(0, top[0].length) !== top[0])
          stack.pop();
        if (!top)
          return cb();
        xfs.utimes(top[0], now, top[1], cb);
      };
      var utimes = function(name, header, cb) {
        if (opts.utimes === false)
          return cb();
        if (header.type === "directory")
          return xfs.utimes(name, now, header.mtime, cb);
        if (header.type === "symlink")
          return utimesParent(name, cb);
        xfs.utimes(name, now, header.mtime, function(err) {
          if (err)
            return cb(err);
          utimesParent(name, cb);
        });
      };
      var chperm = function(name, header, cb) {
        var link = header.type === "symlink";
        var chmod2 = link ? xfs.lchmod : xfs.chmod;
        var chown = link ? xfs.lchown : xfs.chown;
        if (!chmod2)
          return cb();
        var mode = (header.mode | (header.type === "directory" ? dmode : fmode)) & umask;
        if (chown && own)
          chown.call(xfs, name, header.uid, header.gid, onchown);
        else
          onchown(null);
        function onchown(err) {
          if (err)
            return cb(err);
          if (!chmod2)
            return cb();
          chmod2.call(xfs, name, mode, cb);
        }
      };
      extract.on("entry", function(header, stream, next) {
        header = map(header) || header;
        header.name = normalize(header.name);
        var name = path5.join(cwd, path5.join("/", header.name));
        if (ignore(name, header)) {
          stream.resume();
          return next();
        }
        var stat = function(err) {
          if (err)
            return next(err);
          utimes(name, header, function(err2) {
            if (err2)
              return next(err2);
            if (win32)
              return next();
            chperm(name, header, next);
          });
        };
        var onsymlink = function() {
          if (win32)
            return next();
          xfs.unlink(name, function() {
            xfs.symlink(header.linkname, name, stat);
          });
        };
        var onlink = function() {
          if (win32)
            return next();
          xfs.unlink(name, function() {
            var srcpath = path5.join(cwd, path5.join("/", header.linkname));
            xfs.link(srcpath, name, function(err) {
              if (err && err.code === "EPERM" && opts.hardlinkAsFilesFallback) {
                stream = xfs.createReadStream(srcpath);
                return onfile();
              }
              stat(err);
            });
          });
        };
        var onfile = function() {
          var ws = xfs.createWriteStream(name);
          var rs = mapStream(stream, header);
          ws.on("error", function(err) {
            rs.destroy(err);
          });
          pump(rs, ws, function(err) {
            if (err)
              return next(err);
            ws.on("close", stat);
          });
        };
        if (header.type === "directory") {
          stack.push([name, header.mtime]);
          return mkdirfix(name, {
            fs: xfs,
            own,
            uid: header.uid,
            gid: header.gid
          }, stat);
        }
        var dir = path5.dirname(name);
        validate(xfs, dir, path5.join(cwd, "."), function(err, valid) {
          if (err)
            return next(err);
          if (!valid)
            return next(new Error(dir + " is not a valid path"));
          mkdirfix(dir, {
            fs: xfs,
            own,
            uid: header.uid,
            gid: header.gid
          }, function(err2) {
            if (err2)
              return next(err2);
            switch (header.type) {
              case "file":
                return onfile();
              case "link":
                return onlink();
              case "symlink":
                return onsymlink();
            }
            if (strict)
              return next(new Error("unsupported type for " + name + " (" + header.type + ")"));
            stream.resume();
            next();
          });
        });
      });
      if (opts.finish)
        extract.on("finish", opts.finish);
      return extract;
    };
    function validate(fs5, name, root, cb) {
      if (name === root)
        return cb(null, true);
      fs5.lstat(name, function(err, st) {
        if (err && err.code !== "ENOENT")
          return cb(err);
        if (err || st.isDirectory())
          return validate(fs5, path5.join(name, ".."), root, cb);
        cb(null, false);
      });
    }
    function mkdirfix(name, opts, cb) {
      mkdirp(name, { fs: opts.fs }, function(err, made) {
        if (!err && made && opts.own) {
          chownr(made, opts.uid, opts.gid, cb);
        } else {
          cb(err);
        }
      });
    }
  }
});

// ../testeranto/node_modules/through/index.js
var require_through = __commonJS({
  "../testeranto/node_modules/through/index.js"(exports, module) {
    init_cjs_shim();
    var Stream = __require("stream");
    exports = module.exports = through;
    through.through = through;
    function through(write, end, opts) {
      write = write || function(data) {
        this.queue(data);
      };
      end = end || function() {
        this.queue(null);
      };
      var ended = false, destroyed = false, buffer = [], _ended = false;
      var stream = new Stream();
      stream.readable = stream.writable = true;
      stream.paused = false;
      stream.autoDestroy = !(opts && opts.autoDestroy === false);
      stream.write = function(data) {
        write.call(this, data);
        return !stream.paused;
      };
      function drain() {
        while (buffer.length && !stream.paused) {
          var data = buffer.shift();
          if (null === data)
            return stream.emit("end");
          else
            stream.emit("data", data);
        }
      }
      stream.queue = stream.push = function(data) {
        if (_ended)
          return stream;
        if (data === null)
          _ended = true;
        buffer.push(data);
        drain();
        return stream;
      };
      stream.on("end", function() {
        stream.readable = false;
        if (!stream.writable && stream.autoDestroy)
          process.nextTick(function() {
            stream.destroy();
          });
      });
      function _end() {
        stream.writable = false;
        end.call(stream);
        if (!stream.readable && stream.autoDestroy)
          stream.destroy();
      }
      stream.end = function(data) {
        if (ended)
          return;
        ended = true;
        if (arguments.length)
          stream.write(data);
        _end();
        return stream;
      };
      stream.destroy = function() {
        if (destroyed)
          return;
        destroyed = true;
        ended = true;
        buffer.length = 0;
        stream.writable = stream.readable = false;
        stream.emit("close");
        return stream;
      };
      stream.pause = function() {
        if (stream.paused)
          return;
        stream.paused = true;
        return stream;
      };
      stream.resume = function() {
        if (stream.paused) {
          stream.paused = false;
          stream.emit("resume");
        }
        drain();
        if (!stream.paused)
          stream.emit("drain");
        return stream;
      };
      return stream;
    }
  }
});

// ../testeranto/node_modules/unbzip2-stream/lib/bzip2.js
var require_bzip2 = __commonJS({
  "../testeranto/node_modules/unbzip2-stream/lib/bzip2.js"(exports, module) {
    init_cjs_shim();
    function Bzip2Error(message2) {
      this.name = "Bzip2Error";
      this.message = message2;
      this.stack = new Error().stack;
    }
    Bzip2Error.prototype = new Error();
    var message = {
      Error: function(message2) {
        throw new Bzip2Error(message2);
      }
    };
    var bzip2 = {};
    bzip2.Bzip2Error = Bzip2Error;
    bzip2.crcTable = [
      0,
      79764919,
      159529838,
      222504665,
      319059676,
      398814059,
      445009330,
      507990021,
      638119352,
      583659535,
      797628118,
      726387553,
      890018660,
      835552979,
      1015980042,
      944750013,
      1276238704,
      1221641927,
      1167319070,
      1095957929,
      1595256236,
      1540665371,
      1452775106,
      1381403509,
      1780037320,
      1859660671,
      1671105958,
      1733955601,
      2031960084,
      2111593891,
      1889500026,
      1952343757,
      2552477408,
      2632100695,
      2443283854,
      2506133561,
      2334638140,
      2414271883,
      2191915858,
      2254759653,
      3190512472,
      3135915759,
      3081330742,
      3009969537,
      2905550212,
      2850959411,
      2762807018,
      2691435357,
      3560074640,
      3505614887,
      3719321342,
      3648080713,
      3342211916,
      3287746299,
      3467911202,
      3396681109,
      4063920168,
      4143685023,
      4223187782,
      4286162673,
      3779000052,
      3858754371,
      3904687514,
      3967668269,
      881225847,
      809987520,
      1023691545,
      969234094,
      662832811,
      591600412,
      771767749,
      717299826,
      311336399,
      374308984,
      453813921,
      533576470,
      25881363,
      88864420,
      134795389,
      214552010,
      2023205639,
      2086057648,
      1897238633,
      1976864222,
      1804852699,
      1867694188,
      1645340341,
      1724971778,
      1587496639,
      1516133128,
      1461550545,
      1406951526,
      1302016099,
      1230646740,
      1142491917,
      1087903418,
      2896545431,
      2825181984,
      2770861561,
      2716262478,
      3215044683,
      3143675388,
      3055782693,
      3001194130,
      2326604591,
      2389456536,
      2200899649,
      2280525302,
      2578013683,
      2640855108,
      2418763421,
      2498394922,
      3769900519,
      3832873040,
      3912640137,
      3992402750,
      4088425275,
      4151408268,
      4197601365,
      4277358050,
      3334271071,
      3263032808,
      3476998961,
      3422541446,
      3585640067,
      3514407732,
      3694837229,
      3640369242,
      1762451694,
      1842216281,
      1619975040,
      1682949687,
      2047383090,
      2127137669,
      1938468188,
      2001449195,
      1325665622,
      1271206113,
      1183200824,
      1111960463,
      1543535498,
      1489069629,
      1434599652,
      1363369299,
      622672798,
      568075817,
      748617968,
      677256519,
      907627842,
      853037301,
      1067152940,
      995781531,
      51762726,
      131386257,
      177728840,
      240578815,
      269590778,
      349224269,
      429104020,
      491947555,
      4046411278,
      4126034873,
      4172115296,
      4234965207,
      3794477266,
      3874110821,
      3953728444,
      4016571915,
      3609705398,
      3555108353,
      3735388376,
      3664026991,
      3290680682,
      3236090077,
      3449943556,
      3378572211,
      3174993278,
      3120533705,
      3032266256,
      2961025959,
      2923101090,
      2868635157,
      2813903052,
      2742672763,
      2604032198,
      2683796849,
      2461293480,
      2524268063,
      2284983834,
      2364738477,
      2175806836,
      2238787779,
      1569362073,
      1498123566,
      1409854455,
      1355396672,
      1317987909,
      1246755826,
      1192025387,
      1137557660,
      2072149281,
      2135122070,
      1912620623,
      1992383480,
      1753615357,
      1816598090,
      1627664531,
      1707420964,
      295390185,
      358241886,
      404320391,
      483945776,
      43990325,
      106832002,
      186451547,
      266083308,
      932423249,
      861060070,
      1041341759,
      986742920,
      613929101,
      542559546,
      756411363,
      701822548,
      3316196985,
      3244833742,
      3425377559,
      3370778784,
      3601682597,
      3530312978,
      3744426955,
      3689838204,
      3819031489,
      3881883254,
      3928223919,
      4007849240,
      4037393693,
      4100235434,
      4180117107,
      4259748804,
      2310601993,
      2373574846,
      2151335527,
      2231098320,
      2596047829,
      2659030626,
      2470359227,
      2550115596,
      2947551409,
      2876312838,
      2788305887,
      2733848168,
      3165939309,
      3094707162,
      3040238851,
      2985771188
    ];
    bzip2.array = function(bytes) {
      var bit = 0, byte = 0;
      var BITMASK = [0, 1, 3, 7, 15, 31, 63, 127, 255];
      return function(n) {
        var result = 0;
        while (n > 0) {
          var left = 8 - bit;
          if (n >= left) {
            result <<= left;
            result |= BITMASK[left] & bytes[byte++];
            bit = 0;
            n -= left;
          } else {
            result <<= n;
            result |= (bytes[byte] & BITMASK[n] << 8 - n - bit) >> 8 - n - bit;
            bit += n;
            n = 0;
          }
        }
        return result;
      };
    };
    bzip2.simple = function(srcbuffer, stream) {
      var bits = bzip2.array(srcbuffer);
      var size = bzip2.header(bits);
      var ret = false;
      var bufsize = 1e5 * size;
      var buf = new Int32Array(bufsize);
      do {
        ret = bzip2.decompress(bits, stream, buf, bufsize);
      } while (!ret);
    };
    bzip2.header = function(bits) {
      this.byteCount = new Int32Array(256);
      this.symToByte = new Uint8Array(256);
      this.mtfSymbol = new Int32Array(256);
      this.selectors = new Uint8Array(32768);
      if (bits(8 * 3) != 4348520)
        message.Error("No magic number found");
      var i = bits(8) - 48;
      if (i < 1 || i > 9)
        message.Error("Not a BZIP archive");
      return i;
    };
    bzip2.decompress = function(bits, stream, buf, bufsize, streamCRC) {
      var MAX_HUFCODE_BITS = 20;
      var MAX_SYMBOLS = 258;
      var SYMBOL_RUNA = 0;
      var SYMBOL_RUNB = 1;
      var GROUP_SIZE = 50;
      var crc = 0 ^ -1;
      for (var h = "", i = 0; i < 6; i++)
        h += bits(8).toString(16);
      if (h == "177245385090") {
        var finalCRC = bits(32) | 0;
        if (finalCRC !== streamCRC)
          message.Error("Error in bzip2: crc32 do not match");
        bits(null);
        return null;
      }
      if (h != "314159265359")
        message.Error("eek not valid bzip data");
      var crcblock = bits(32) | 0;
      if (bits(1))
        message.Error("unsupported obsolete version");
      var origPtr = bits(24);
      if (origPtr > bufsize)
        message.Error("Initial position larger than buffer size");
      var t = bits(16);
      var symTotal = 0;
      for (i = 0; i < 16; i++) {
        if (t & 1 << 15 - i) {
          var k = bits(16);
          for (j = 0; j < 16; j++) {
            if (k & 1 << 15 - j) {
              this.symToByte[symTotal++] = 16 * i + j;
            }
          }
        }
      }
      var groupCount = bits(3);
      if (groupCount < 2 || groupCount > 6)
        message.Error("another error");
      var nSelectors = bits(15);
      if (nSelectors == 0)
        message.Error("meh");
      for (var i = 0; i < groupCount; i++)
        this.mtfSymbol[i] = i;
      for (var i = 0; i < nSelectors; i++) {
        for (var j = 0; bits(1); j++)
          if (j >= groupCount)
            message.Error("whoops another error");
        var uc = this.mtfSymbol[j];
        for (var k = j - 1; k >= 0; k--) {
          this.mtfSymbol[k + 1] = this.mtfSymbol[k];
        }
        this.mtfSymbol[0] = uc;
        this.selectors[i] = uc;
      }
      var symCount = symTotal + 2;
      var groups = [];
      var length = new Uint8Array(MAX_SYMBOLS), temp = new Uint16Array(MAX_HUFCODE_BITS + 1);
      var hufGroup;
      for (var j = 0; j < groupCount; j++) {
        t = bits(5);
        for (var i = 0; i < symCount; i++) {
          while (true) {
            if (t < 1 || t > MAX_HUFCODE_BITS)
              message.Error("I gave up a while ago on writing error messages");
            if (!bits(1))
              break;
            if (!bits(1))
              t++;
            else
              t--;
          }
          length[i] = t;
        }
        var minLen, maxLen;
        minLen = maxLen = length[0];
        for (var i = 1; i < symCount; i++) {
          if (length[i] > maxLen)
            maxLen = length[i];
          else if (length[i] < minLen)
            minLen = length[i];
        }
        hufGroup = groups[j] = {};
        hufGroup.permute = new Int32Array(MAX_SYMBOLS);
        hufGroup.limit = new Int32Array(MAX_HUFCODE_BITS + 1);
        hufGroup.base = new Int32Array(MAX_HUFCODE_BITS + 1);
        hufGroup.minLen = minLen;
        hufGroup.maxLen = maxLen;
        var base = hufGroup.base;
        var limit = hufGroup.limit;
        var pp = 0;
        for (var i = minLen; i <= maxLen; i++)
          for (var t = 0; t < symCount; t++)
            if (length[t] == i)
              hufGroup.permute[pp++] = t;
        for (i = minLen; i <= maxLen; i++)
          temp[i] = limit[i] = 0;
        for (i = 0; i < symCount; i++)
          temp[length[i]]++;
        pp = t = 0;
        for (i = minLen; i < maxLen; i++) {
          pp += temp[i];
          limit[i] = pp - 1;
          pp <<= 1;
          base[i + 1] = pp - (t += temp[i]);
        }
        limit[maxLen] = pp + temp[maxLen] - 1;
        base[minLen] = 0;
      }
      for (var i = 0; i < 256; i++) {
        this.mtfSymbol[i] = i;
        this.byteCount[i] = 0;
      }
      var runPos, count, symCount, selector;
      runPos = count = symCount = selector = 0;
      while (true) {
        if (!symCount--) {
          symCount = GROUP_SIZE - 1;
          if (selector >= nSelectors)
            message.Error("meow i'm a kitty, that's an error");
          hufGroup = groups[this.selectors[selector++]];
          base = hufGroup.base;
          limit = hufGroup.limit;
        }
        i = hufGroup.minLen;
        j = bits(i);
        while (true) {
          if (i > hufGroup.maxLen)
            message.Error("rawr i'm a dinosaur");
          if (j <= limit[i])
            break;
          i++;
          j = j << 1 | bits(1);
        }
        j -= base[i];
        if (j < 0 || j >= MAX_SYMBOLS)
          message.Error("moo i'm a cow");
        var nextSym = hufGroup.permute[j];
        if (nextSym == SYMBOL_RUNA || nextSym == SYMBOL_RUNB) {
          if (!runPos) {
            runPos = 1;
            t = 0;
          }
          if (nextSym == SYMBOL_RUNA)
            t += runPos;
          else
            t += 2 * runPos;
          runPos <<= 1;
          continue;
        }
        if (runPos) {
          runPos = 0;
          if (count + t > bufsize)
            message.Error("Boom.");
          uc = this.symToByte[this.mtfSymbol[0]];
          this.byteCount[uc] += t;
          while (t--)
            buf[count++] = uc;
        }
        if (nextSym > symTotal)
          break;
        if (count >= bufsize)
          message.Error("I can't think of anything. Error");
        i = nextSym - 1;
        uc = this.mtfSymbol[i];
        for (var k = i - 1; k >= 0; k--) {
          this.mtfSymbol[k + 1] = this.mtfSymbol[k];
        }
        this.mtfSymbol[0] = uc;
        uc = this.symToByte[uc];
        this.byteCount[uc]++;
        buf[count++] = uc;
      }
      if (origPtr < 0 || origPtr >= count)
        message.Error("I'm a monkey and I'm throwing something at someone, namely you");
      var j = 0;
      for (var i = 0; i < 256; i++) {
        k = j + this.byteCount[i];
        this.byteCount[i] = j;
        j = k;
      }
      for (var i = 0; i < count; i++) {
        uc = buf[i] & 255;
        buf[this.byteCount[uc]] |= i << 8;
        this.byteCount[uc]++;
      }
      var pos = 0, current = 0, run = 0;
      if (count) {
        pos = buf[origPtr];
        current = pos & 255;
        pos >>= 8;
        run = -1;
      }
      count = count;
      var copies, previous, outbyte;
      while (count) {
        count--;
        previous = current;
        pos = buf[pos];
        current = pos & 255;
        pos >>= 8;
        if (run++ == 3) {
          copies = current;
          outbyte = previous;
          current = -1;
        } else {
          copies = 1;
          outbyte = current;
        }
        while (copies--) {
          crc = (crc << 8 ^ this.crcTable[(crc >> 24 ^ outbyte) & 255]) & 4294967295;
          stream(outbyte);
        }
        if (current != previous)
          run = 0;
      }
      crc = (crc ^ -1) >>> 0;
      if ((crc | 0) != (crcblock | 0))
        message.Error("Error in bzip2: crc32 do not match");
      streamCRC = (crc ^ (streamCRC << 1 | streamCRC >>> 31)) & 4294967295;
      return streamCRC;
    };
    module.exports = bzip2;
  }
});

// ../testeranto/node_modules/unbzip2-stream/lib/bit_iterator.js
var require_bit_iterator = __commonJS({
  "../testeranto/node_modules/unbzip2-stream/lib/bit_iterator.js"(exports, module) {
    init_cjs_shim();
    var BITMASK = [0, 1, 3, 7, 15, 31, 63, 127, 255];
    module.exports = function bitIterator(nextBuffer) {
      var bit = 0, byte = 0;
      var bytes = nextBuffer();
      var f = function(n) {
        if (n === null && bit != 0) {
          bit = 0;
          byte++;
          return;
        }
        var result = 0;
        while (n > 0) {
          if (byte >= bytes.length) {
            byte = 0;
            bytes = nextBuffer();
          }
          var left = 8 - bit;
          if (bit === 0 && n > 0)
            f.bytesRead++;
          if (n >= left) {
            result <<= left;
            result |= BITMASK[left] & bytes[byte++];
            bit = 0;
            n -= left;
          } else {
            result <<= n;
            result |= (bytes[byte] & BITMASK[n] << 8 - n - bit) >> 8 - n - bit;
            bit += n;
            n = 0;
          }
        }
        return result;
      };
      f.bytesRead = 0;
      return f;
    };
  }
});

// ../testeranto/node_modules/unbzip2-stream/index.js
var require_unbzip2_stream = __commonJS({
  "../testeranto/node_modules/unbzip2-stream/index.js"(exports, module) {
    init_cjs_shim();
    var through = require_through();
    var bz2 = require_bzip2();
    var bitIterator = require_bit_iterator();
    module.exports = unbzip2Stream;
    function unbzip2Stream() {
      var bufferQueue = [];
      var hasBytes = 0;
      var blockSize = 0;
      var broken = false;
      var done = false;
      var bitReader = null;
      var streamCRC = null;
      function decompressBlock(push) {
        if (!blockSize) {
          blockSize = bz2.header(bitReader);
          streamCRC = 0;
          return true;
        } else {
          var bufsize = 1e5 * blockSize;
          var buf = new Int32Array(bufsize);
          var chunk = [];
          var f = function(b) {
            chunk.push(b);
          };
          streamCRC = bz2.decompress(bitReader, f, buf, bufsize, streamCRC);
          if (streamCRC === null) {
            blockSize = 0;
            return false;
          } else {
            push(Buffer.from(chunk));
            return true;
          }
        }
      }
      var outlength = 0;
      function decompressAndQueue(stream) {
        if (broken)
          return;
        try {
          return decompressBlock(function(d) {
            stream.queue(d);
            if (d !== null) {
              outlength += d.length;
            } else {
            }
          });
        } catch (e) {
          stream.emit("error", e);
          broken = true;
          return false;
        }
      }
      return through(
        function write(data) {
          bufferQueue.push(data);
          hasBytes += data.length;
          if (bitReader === null) {
            bitReader = bitIterator(function() {
              return bufferQueue.shift();
            });
          }
          while (!broken && hasBytes - bitReader.bytesRead + 1 >= (25e3 + 1e5 * blockSize || 4)) {
            decompressAndQueue(this);
          }
        },
        function end(x) {
          while (!broken && bitReader && hasBytes > bitReader.bytesRead) {
            decompressAndQueue(this);
          }
          if (!broken) {
            if (streamCRC !== null)
              this.emit("error", new Error("input stream ended prematurely"));
            this.queue(null);
          }
        }
      );
    }
  }
});

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Device.js
init_cjs_shim();
var knownDevices = [
  {
    name: "Blackberry PlayBook",
    userAgent: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+",
    viewport: {
      width: 600,
      height: 1024,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Blackberry PlayBook landscape",
    userAgent: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+",
    viewport: {
      width: 1024,
      height: 600,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "BlackBerry Z30",
    userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "BlackBerry Z30 landscape",
    userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Note 3",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Note 3 landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Note II",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Note II landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S III",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S III landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S5",
    userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S8",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 740,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S8 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
    viewport: {
      width: 740,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S9+",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36",
    viewport: {
      width: 320,
      height: 658,
      deviceScaleFactor: 4.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S9+ landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36",
    viewport: {
      width: 658,
      height: 320,
      deviceScaleFactor: 4.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Tab S4",
    userAgent: "Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36",
    viewport: {
      width: 712,
      height: 1138,
      deviceScaleFactor: 2.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Tab S4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36",
    viewport: {
      width: 1138,
      height: 712,
      deviceScaleFactor: 2.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad (gen 6)",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad (gen 6) landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad (gen 7)",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 810,
      height: 1080,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad (gen 7) landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1080,
      height: 810,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Mini",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Mini landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Pro",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 1366,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Pro landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1366,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Pro 11",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 834,
      height: 1194,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Pro 11 landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1194,
      height: 834,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 4",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53",
    viewport: {
      width: 320,
      height: 480,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 4 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53",
    viewport: {
      width: 480,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 5",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 320,
      height: 568,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 5 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 568,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 6",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 6 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 6 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 6 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 7",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 7 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 7 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 7 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 8",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 8 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 8 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 8 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone SE",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 320,
      height: 568,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone SE landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 568,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone X",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone X landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone XR",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 896,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone XR landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 896,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 828,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 828,
      height: 414,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 896,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 896,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 428,
      height: 926,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 926,
      height: 428,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Mini",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Mini landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 428,
      height: 926,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 926,
      height: 428,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Mini",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Mini landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "JioPhone 2",
    userAgent: "Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5",
    viewport: {
      width: 240,
      height: 320,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "JioPhone 2 landscape",
    userAgent: "Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5",
    viewport: {
      width: 320,
      height: 240,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Kindle Fire HDX",
    userAgent: "Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true",
    viewport: {
      width: 800,
      height: 1280,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Kindle Fire HDX landscape",
    userAgent: "Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true",
    viewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "LG Optimus L70",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 384,
      height: 640,
      deviceScaleFactor: 1.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "LG Optimus L70 landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 384,
      deviceScaleFactor: 1.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Microsoft Lumia 550",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Microsoft Lumia 950",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 4,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Microsoft Lumia 950 landscape",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 4,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 10",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 800,
      height: 1280,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 10 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 4",
    userAgent: "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 384,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 384,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 5",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 5X",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 5X landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 6",
    userAgent: "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 6 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 6P",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 6P landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 7",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 600,
      height: 960,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 7 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 960,
      height: 600,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nokia Lumia 520",
    userAgent: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)",
    viewport: {
      width: 320,
      height: 533,
      deviceScaleFactor: 1.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nokia Lumia 520 landscape",
    userAgent: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)",
    viewport: {
      width: 533,
      height: 320,
      deviceScaleFactor: 1.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nokia N9",
    userAgent: "Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13",
    viewport: {
      width: 480,
      height: 854,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nokia N9 landscape",
    userAgent: "Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13",
    viewport: {
      width: 854,
      height: 480,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 2",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 411,
      height: 731,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 2 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 731,
      height: 411,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 2 XL",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 411,
      height: 823,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 2 XL landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 823,
      height: 411,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 3",
    userAgent: "Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36",
    viewport: {
      width: 393,
      height: 786,
      deviceScaleFactor: 2.75,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 3 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36",
    viewport: {
      width: 786,
      height: 393,
      deviceScaleFactor: 2.75,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 4",
    userAgent: "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36",
    viewport: {
      width: 353,
      height: 745,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36",
    viewport: {
      width: 745,
      height: 353,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 4a (5G)",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 4a (5G)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 353,
      height: 745,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 4a (5G) landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 4a (5G)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 745,
      height: 353,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 5",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 393,
      height: 851,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 851,
      height: 393,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Moto G4",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Moto G4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  }
];
var knownDevicesByName = {};
for (const device of knownDevices) {
  knownDevicesByName[device.name] = device;
}
var KnownDevices = Object.freeze(knownDevicesByName);

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Errors.js
init_cjs_shim();
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ProtocolError_code;
var _ProtocolError_originalMessage;
var CustomError = class extends Error {
  /**
   * @internal
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
var TimeoutError = class extends CustomError {
};
var ProtocolError = class extends CustomError {
  constructor() {
    super(...arguments);
    _ProtocolError_code.set(this, void 0);
    _ProtocolError_originalMessage.set(this, "");
  }
  /**
   * @internal
   */
  set code(code) {
    __classPrivateFieldSet(this, _ProtocolError_code, code, "f");
  }
  /**
   * @public
   */
  get code() {
    return __classPrivateFieldGet(this, _ProtocolError_code, "f");
  }
  /**
   * @internal
   */
  set originalMessage(originalMessage) {
    __classPrivateFieldSet(this, _ProtocolError_originalMessage, originalMessage, "f");
  }
  /**
   * @public
   */
  get originalMessage() {
    return __classPrivateFieldGet(this, _ProtocolError_originalMessage, "f");
  }
};
_ProtocolError_code = /* @__PURE__ */ new WeakMap(), _ProtocolError_originalMessage = /* @__PURE__ */ new WeakMap();
var errors = Object.freeze({
  TimeoutError,
  ProtocolError
});

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/PredefinedNetworkConditions.js
init_cjs_shim();
var PredefinedNetworkConditions = Object.freeze({
  "Slow 3G": {
    download: 500 * 1e3 / 8 * 0.8,
    upload: 500 * 1e3 / 8 * 0.8,
    latency: 400 * 5
  },
  "Fast 3G": {
    download: 1.6 * 1e3 * 1e3 / 8 * 0.9,
    upload: 750 * 1e3 / 8 * 0.9,
    latency: 150 * 3.75
  }
});

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Puppeteer.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/BrowserConnector.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/util.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/environment.js
init_cjs_shim();
var isNode = !!(typeof process !== "undefined" && process.version);
var DEFERRED_PROMISE_DEBUG_TIMEOUT = typeof process !== "undefined" && typeof process.env["PUPPETEER_DEFERRED_PROMISE_DEBUG_TIMEOUT"] !== "undefined" ? Number(process.env["PUPPETEER_DEFERRED_PROMISE_DEBUG_TIMEOUT"]) : -1;

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/util/assert.js
init_cjs_shim();
var assert = (value, message) => {
  if (!value) {
    throw new Error(message);
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/util/ErrorLike.js
init_cjs_shim();
function isErrorLike(obj) {
  return typeof obj === "object" && obj !== null && "name" in obj && "message" in obj;
}
function isErrnoException(obj) {
  return isErrorLike(obj) && ("errno" in obj || "code" in obj || "path" in obj || "syscall" in obj);
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Debug.js
init_cjs_shim();
var debugModule = null;
async function importDebug() {
  if (!debugModule) {
    debugModule = (await import("./src-EQYA4BOJ.mjs")).default;
  }
  return debugModule;
}
var debug = (prefix) => {
  if (isNode) {
    return async (...logArgs) => {
      (await importDebug())(prefix)(logArgs);
    };
  }
  return (...logArgs) => {
    const debugLevel = globalThis.__PUPPETEER_DEBUG;
    if (!debugLevel) {
      return;
    }
    const everythingShouldBeLogged = debugLevel === "*";
    const prefixMatchesDebugLevel = everythingShouldBeLogged || /**
     * If the debug level is `foo*`, that means we match any prefix that
     * starts with `foo`. If the level is `foo`, we match only the prefix
     * `foo`.
     */
    (debugLevel.endsWith("*") ? prefix.startsWith(debugLevel) : prefix === debugLevel);
    if (!prefixMatchesDebugLevel) {
      return;
    }
    console.log(`${prefix}:`, ...logArgs);
  };
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/ElementHandle.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/JSHandle.js
init_cjs_shim();
var __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JSHandle_disposed;
var _JSHandle_context;
var _JSHandle_remoteObject;
var JSHandle = class {
  /**
   * @internal
   */
  constructor(context, remoteObject) {
    _JSHandle_disposed.set(this, false);
    _JSHandle_context.set(this, void 0);
    _JSHandle_remoteObject.set(this, void 0);
    __classPrivateFieldSet2(this, _JSHandle_context, context, "f");
    __classPrivateFieldSet2(this, _JSHandle_remoteObject, remoteObject, "f");
  }
  /**
   * @internal
   */
  get client() {
    return __classPrivateFieldGet2(this, _JSHandle_context, "f")._client;
  }
  /**
   * @internal
   */
  get disposed() {
    return __classPrivateFieldGet2(this, _JSHandle_disposed, "f");
  }
  /**
   * @internal
   */
  executionContext() {
    return __classPrivateFieldGet2(this, _JSHandle_context, "f");
  }
  /**
   * Evaluates the given function with the current handle as its first argument.
   *
   * @see {@link ExecutionContext.evaluate} for more details.
   */
  async evaluate(pageFunction, ...args) {
    return await this.executionContext().evaluate(pageFunction, this, ...args);
  }
  /**
   * Evaluates the given function with the current handle as its first argument.
   *
   * @see {@link ExecutionContext.evaluateHandle} for more details.
   */
  async evaluateHandle(pageFunction, ...args) {
    return await this.executionContext().evaluateHandle(pageFunction, this, ...args);
  }
  async getProperty(propertyName) {
    return this.evaluateHandle((object, propertyName2) => {
      return object[propertyName2];
    }, propertyName);
  }
  /**
   * Gets a map of handles representing the properties of the current handle.
   *
   * @example
   *
   * ```ts
   * const listHandle = await page.evaluateHandle(() => document.body.children);
   * const properties = await listHandle.getProperties();
   * const children = [];
   * for (const property of properties.values()) {
   *   const element = property.asElement();
   *   if (element) {
   *     children.push(element);
   *   }
   * }
   * children; // holds elementHandles to all children of document.body
   * ```
   */
  async getProperties() {
    assert(__classPrivateFieldGet2(this, _JSHandle_remoteObject, "f").objectId);
    const response = await this.client.send("Runtime.getProperties", {
      objectId: __classPrivateFieldGet2(this, _JSHandle_remoteObject, "f").objectId,
      ownProperties: true
    });
    const result = /* @__PURE__ */ new Map();
    for (const property of response.result) {
      if (!property.enumerable || !property.value) {
        continue;
      }
      result.set(property.name, createJSHandle(__classPrivateFieldGet2(this, _JSHandle_context, "f"), property.value));
    }
    return result;
  }
  /**
   * @returns A vanilla object representing the serializable portions of the
   * referenced object.
   * @throws Throws if the object cannot be serialized due to circularity.
   *
   * @remarks
   * If the object has a `toJSON` function, it **will not** be called.
   */
  async jsonValue() {
    if (!__classPrivateFieldGet2(this, _JSHandle_remoteObject, "f").objectId) {
      return valueFromRemoteObject(__classPrivateFieldGet2(this, _JSHandle_remoteObject, "f"));
    }
    const value = await this.evaluate((object) => {
      return object;
    });
    if (value === void 0) {
      throw new Error("Could not serialize referenced object");
    }
    return value;
  }
  /**
   * @returns Either `null` or the handle itself if the handle is an
   * instance of {@link ElementHandle}.
   */
  asElement() {
    return null;
  }
  /**
   * Releases the object referenced by the handle for garbage collection.
   */
  async dispose() {
    if (__classPrivateFieldGet2(this, _JSHandle_disposed, "f")) {
      return;
    }
    __classPrivateFieldSet2(this, _JSHandle_disposed, true, "f");
    await releaseObject(this.client, __classPrivateFieldGet2(this, _JSHandle_remoteObject, "f"));
  }
  /**
   * Returns a string representation of the JSHandle.
   *
   * @remarks
   * Useful during debugging.
   */
  toString() {
    if (!__classPrivateFieldGet2(this, _JSHandle_remoteObject, "f").objectId) {
      return "JSHandle:" + valueFromRemoteObject(__classPrivateFieldGet2(this, _JSHandle_remoteObject, "f"));
    }
    const type = __classPrivateFieldGet2(this, _JSHandle_remoteObject, "f").subtype || __classPrivateFieldGet2(this, _JSHandle_remoteObject, "f").type;
    return "JSHandle@" + type;
  }
  /**
   * Provides access to the
   * [Protocol.Runtime.RemoteObject](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject)
   * backing this handle.
   */
  remoteObject() {
    return __classPrivateFieldGet2(this, _JSHandle_remoteObject, "f");
  }
};
_JSHandle_disposed = /* @__PURE__ */ new WeakMap(), _JSHandle_context = /* @__PURE__ */ new WeakMap(), _JSHandle_remoteObject = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/QueryHandler.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/AriaQueryHandler.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Frame.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/IsolatedWorld.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/generated/injected.js
init_cjs_shim();
var source = '"use strict";\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __export = (target, all) => {\n  for (var name in all)\n    __defProp(target, name, { get: all[name], enumerable: true });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === "object" || typeof from === "function") {\n    for (let key of __getOwnPropNames(from))\n      if (!__hasOwnProp.call(to, key) && key !== except)\n        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n  }\n  return to;\n};\nvar __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);\n\n// src/injected/injected.ts\nvar injected_exports = {};\n__export(injected_exports, {\n  default: () => injected_default\n});\nmodule.exports = __toCommonJS(injected_exports);\n\n// src/common/Errors.ts\nvar CustomError = class extends Error {\n  constructor(message) {\n    super(message);\n    this.name = this.constructor.name;\n    Error.captureStackTrace(this, this.constructor);\n  }\n};\nvar TimeoutError = class extends CustomError {\n};\nvar ProtocolError = class extends CustomError {\n  #code;\n  #originalMessage = "";\n  set code(code) {\n    this.#code = code;\n  }\n  get code() {\n    return this.#code;\n  }\n  set originalMessage(originalMessage) {\n    this.#originalMessage = originalMessage;\n  }\n  get originalMessage() {\n    return this.#originalMessage;\n  }\n};\nvar errors = Object.freeze({\n  TimeoutError,\n  ProtocolError\n});\n\n// src/util/DeferredPromise.ts\nfunction createDeferredPromise(opts) {\n  let isResolved = false;\n  let isRejected = false;\n  let resolver;\n  let rejector;\n  const taskPromise = new Promise((resolve, reject) => {\n    resolver = resolve;\n    rejector = reject;\n  });\n  const timeoutId = opts && opts.timeout > 0 ? setTimeout(() => {\n    isRejected = true;\n    rejector(new TimeoutError(opts.message));\n  }, opts.timeout) : void 0;\n  return Object.assign(taskPromise, {\n    resolved: () => {\n      return isResolved;\n    },\n    finished: () => {\n      return isResolved || isRejected;\n    },\n    resolve: (value) => {\n      if (timeoutId) {\n        clearTimeout(timeoutId);\n      }\n      isResolved = true;\n      resolver(value);\n    },\n    reject: (err) => {\n      clearTimeout(timeoutId);\n      isRejected = true;\n      rejector(err);\n    }\n  });\n}\n\n// src/util/assert.ts\nvar assert = (value, message) => {\n  if (!value) {\n    throw new Error(message);\n  }\n};\n\n// src/injected/Poller.ts\nvar MutationPoller = class {\n  #fn;\n  #root;\n  #observer;\n  #promise;\n  constructor(fn, root) {\n    this.#fn = fn;\n    this.#root = root;\n  }\n  async start() {\n    const promise = this.#promise = createDeferredPromise();\n    const result = await this.#fn();\n    if (result) {\n      promise.resolve(result);\n      return;\n    }\n    this.#observer = new MutationObserver(async () => {\n      const result2 = await this.#fn();\n      if (!result2) {\n        return;\n      }\n      promise.resolve(result2);\n      await this.stop();\n    });\n    this.#observer.observe(this.#root, {\n      childList: true,\n      subtree: true,\n      attributes: true\n    });\n  }\n  async stop() {\n    assert(this.#promise, "Polling never started.");\n    if (!this.#promise.finished()) {\n      this.#promise.reject(new Error("Polling stopped"));\n    }\n    if (this.#observer) {\n      this.#observer.disconnect();\n      this.#observer = void 0;\n    }\n  }\n  result() {\n    assert(this.#promise, "Polling never started.");\n    return this.#promise;\n  }\n};\nvar RAFPoller = class {\n  #fn;\n  #promise;\n  constructor(fn) {\n    this.#fn = fn;\n  }\n  async start() {\n    const promise = this.#promise = createDeferredPromise();\n    const result = await this.#fn();\n    if (result) {\n      promise.resolve(result);\n      return;\n    }\n    const poll = async () => {\n      if (promise.finished()) {\n        return;\n      }\n      const result2 = await this.#fn();\n      if (!result2) {\n        window.requestAnimationFrame(poll);\n        return;\n      }\n      promise.resolve(result2);\n      await this.stop();\n    };\n    window.requestAnimationFrame(poll);\n  }\n  async stop() {\n    assert(this.#promise, "Polling never started.");\n    if (!this.#promise.finished()) {\n      this.#promise.reject(new Error("Polling stopped"));\n    }\n  }\n  result() {\n    assert(this.#promise, "Polling never started.");\n    return this.#promise;\n  }\n};\nvar IntervalPoller = class {\n  #fn;\n  #ms;\n  #interval;\n  #promise;\n  constructor(fn, ms) {\n    this.#fn = fn;\n    this.#ms = ms;\n  }\n  async start() {\n    const promise = this.#promise = createDeferredPromise();\n    const result = await this.#fn();\n    if (result) {\n      promise.resolve(result);\n      return;\n    }\n    this.#interval = setInterval(async () => {\n      const result2 = await this.#fn();\n      if (!result2) {\n        return;\n      }\n      promise.resolve(result2);\n      await this.stop();\n    }, this.#ms);\n  }\n  async stop() {\n    assert(this.#promise, "Polling never started.");\n    if (!this.#promise.finished()) {\n      this.#promise.reject(new Error("Polling stopped"));\n    }\n    if (this.#interval) {\n      clearInterval(this.#interval);\n      this.#interval = void 0;\n    }\n  }\n  result() {\n    assert(this.#promise, "Polling never started.");\n    return this.#promise;\n  }\n};\n\n// src/injected/TextContent.ts\nvar TRIVIAL_VALUE_INPUT_TYPES = /* @__PURE__ */ new Set(["checkbox", "image", "radio"]);\nvar isNonTrivialValueNode = (node) => {\n  if (node instanceof HTMLSelectElement) {\n    return true;\n  }\n  if (node instanceof HTMLTextAreaElement) {\n    return true;\n  }\n  if (node instanceof HTMLInputElement && !TRIVIAL_VALUE_INPUT_TYPES.has(node.type)) {\n    return true;\n  }\n  return false;\n};\nvar UNSUITABLE_NODE_NAMES = /* @__PURE__ */ new Set(["SCRIPT", "STYLE"]);\nvar isSuitableNodeForTextMatching = (node) => {\n  return !UNSUITABLE_NODE_NAMES.has(node.nodeName) && !document.head?.contains(node);\n};\nvar textContentCache = /* @__PURE__ */ new WeakMap();\nvar eraseFromCache = (node) => {\n  while (node) {\n    textContentCache.delete(node);\n    if (node instanceof ShadowRoot) {\n      node = node.host;\n    } else {\n      node = node.parentNode;\n    }\n  }\n};\nvar observedNodes = /* @__PURE__ */ new WeakSet();\nvar textChangeObserver = new MutationObserver((mutations) => {\n  for (const mutation of mutations) {\n    eraseFromCache(mutation.target);\n  }\n});\nvar createTextContent = (root) => {\n  let value = textContentCache.get(root);\n  if (value) {\n    return value;\n  }\n  value = { full: "", immediate: [] };\n  if (!isSuitableNodeForTextMatching(root)) {\n    return value;\n  }\n  let currentImmediate = "";\n  if (isNonTrivialValueNode(root)) {\n    value.full = root.value;\n    value.immediate.push(root.value);\n    root.addEventListener(\n      "input",\n      (event) => {\n        eraseFromCache(event.target);\n      },\n      { once: true, capture: true }\n    );\n  } else {\n    for (let child = root.firstChild; child; child = child.nextSibling) {\n      if (child.nodeType === Node.TEXT_NODE) {\n        value.full += child.nodeValue ?? "";\n        currentImmediate += child.nodeValue ?? "";\n        continue;\n      }\n      if (currentImmediate) {\n        value.immediate.push(currentImmediate);\n      }\n      currentImmediate = "";\n      if (child.nodeType === Node.ELEMENT_NODE) {\n        value.full += createTextContent(child).full;\n      }\n    }\n    if (currentImmediate) {\n      value.immediate.push(currentImmediate);\n    }\n    if (root instanceof Element && root.shadowRoot) {\n      value.full += createTextContent(root.shadowRoot).full;\n    }\n    if (!observedNodes.has(root)) {\n      textChangeObserver.observe(root, {\n        childList: true,\n        characterData: true\n      });\n      observedNodes.add(root);\n    }\n  }\n  textContentCache.set(root, value);\n  return value;\n};\n\n// src/injected/TextQuerySelector.ts\nvar TextQuerySelector_exports = {};\n__export(TextQuerySelector_exports, {\n  textQuerySelector: () => textQuerySelector,\n  textQuerySelectorAll: () => textQuerySelectorAll\n});\nvar textQuerySelector = (root, selector) => {\n  for (const node of root.childNodes) {\n    if (node instanceof Element && isSuitableNodeForTextMatching(node)) {\n      let matchedNode;\n      if (node.shadowRoot) {\n        matchedNode = textQuerySelector(node.shadowRoot, selector);\n      } else {\n        matchedNode = textQuerySelector(node, selector);\n      }\n      if (matchedNode) {\n        return matchedNode;\n      }\n    }\n  }\n  if (root instanceof Element) {\n    const textContent = createTextContent(root);\n    if (textContent.full.includes(selector)) {\n      return root;\n    }\n  }\n  return null;\n};\nvar textQuerySelectorAll = (root, selector) => {\n  let results = [];\n  for (const node of root.childNodes) {\n    if (node instanceof Element) {\n      let matchedNodes;\n      if (node.shadowRoot) {\n        matchedNodes = textQuerySelectorAll(node.shadowRoot, selector);\n      } else {\n        matchedNodes = textQuerySelectorAll(node, selector);\n      }\n      results = results.concat(matchedNodes);\n    }\n  }\n  if (results.length > 0) {\n    return results;\n  }\n  if (root instanceof Element) {\n    const textContent = createTextContent(root);\n    if (textContent.full.includes(selector)) {\n      return [root];\n    }\n  }\n  return [];\n};\n\n// src/injected/XPathQuerySelector.ts\nvar XPathQuerySelector_exports = {};\n__export(XPathQuerySelector_exports, {\n  xpathQuerySelector: () => xpathQuerySelector,\n  xpathQuerySelectorAll: () => xpathQuerySelectorAll\n});\nvar xpathQuerySelector = (root, selector) => {\n  const doc = root.ownerDocument || document;\n  const result = doc.evaluate(\n    selector,\n    root,\n    null,\n    XPathResult.FIRST_ORDERED_NODE_TYPE\n  );\n  return result.singleNodeValue;\n};\nvar xpathQuerySelectorAll = (root, selector) => {\n  const doc = root.ownerDocument || document;\n  const iterator = doc.evaluate(\n    selector,\n    root,\n    null,\n    XPathResult.ORDERED_NODE_ITERATOR_TYPE\n  );\n  const array = [];\n  let item;\n  while (item = iterator.iterateNext()) {\n    array.push(item);\n  }\n  return array;\n};\n\n// src/injected/PierceQuerySelector.ts\nvar PierceQuerySelector_exports = {};\n__export(PierceQuerySelector_exports, {\n  pierceQuerySelector: () => pierceQuerySelector,\n  pierceQuerySelectorAll: () => pierceQuerySelectorAll\n});\nvar pierceQuerySelector = (root, selector) => {\n  let found = null;\n  const search = (root2) => {\n    const iter = document.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT);\n    do {\n      const currentNode = iter.currentNode;\n      if (currentNode.shadowRoot) {\n        search(currentNode.shadowRoot);\n      }\n      if (currentNode instanceof ShadowRoot) {\n        continue;\n      }\n      if (currentNode !== root2 && !found && currentNode.matches(selector)) {\n        found = currentNode;\n      }\n    } while (!found && iter.nextNode());\n  };\n  if (root instanceof Document) {\n    root = root.documentElement;\n  }\n  search(root);\n  return found;\n};\nvar pierceQuerySelectorAll = (element, selector) => {\n  const result = [];\n  const collect = (root) => {\n    const iter = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);\n    do {\n      const currentNode = iter.currentNode;\n      if (currentNode.shadowRoot) {\n        collect(currentNode.shadowRoot);\n      }\n      if (currentNode instanceof ShadowRoot) {\n        continue;\n      }\n      if (currentNode !== root && currentNode.matches(selector)) {\n        result.push(currentNode);\n      }\n    } while (iter.nextNode());\n  };\n  if (element instanceof Document) {\n    element = element.documentElement;\n  }\n  collect(element);\n  return result;\n};\n\n// src/injected/util.ts\nvar util_exports = {};\n__export(util_exports, {\n  checkVisibility: () => checkVisibility,\n  createFunction: () => createFunction\n});\nvar createdFunctions = /* @__PURE__ */ new Map();\nvar createFunction = (functionValue) => {\n  let fn = createdFunctions.get(functionValue);\n  if (fn) {\n    return fn;\n  }\n  fn = new Function(`return ${functionValue}`)();\n  createdFunctions.set(functionValue, fn);\n  return fn;\n};\nvar HIDDEN_VISIBILITY_VALUES = ["hidden", "collapse"];\nvar checkVisibility = (node, visible) => {\n  if (!node) {\n    return visible === false;\n  }\n  if (visible === void 0) {\n    return node;\n  }\n  const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;\n  const style = window.getComputedStyle(element);\n  const isVisible = style && !HIDDEN_VISIBILITY_VALUES.includes(style.visibility) && isBoundingBoxVisible(element);\n  return visible === isVisible ? node : false;\n};\nfunction isBoundingBoxVisible(element) {\n  const rect = element.getBoundingClientRect();\n  return rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.bottom > 0;\n}\n\n// src/injected/injected.ts\nvar PuppeteerUtil = Object.freeze({\n  ...util_exports,\n  ...TextQuerySelector_exports,\n  ...XPathQuerySelector_exports,\n  ...PierceQuerySelector_exports,\n  createDeferredPromise,\n  createTextContent,\n  IntervalPoller,\n  isSuitableNodeForTextMatching,\n  MutationPoller,\n  RAFPoller\n});\nvar injected_default = PuppeteerUtil;\n';

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/util/DeferredPromise.js
init_cjs_shim();
function createDeferredPromise(opts) {
  let isResolved = false;
  let isRejected = false;
  let resolver;
  let rejector;
  const taskPromise = new Promise((resolve2, reject) => {
    resolver = resolve2;
    rejector = reject;
  });
  const timeoutId = opts && opts.timeout > 0 ? setTimeout(() => {
    isRejected = true;
    rejector(new TimeoutError(opts.message));
  }, opts.timeout) : void 0;
  return Object.assign(taskPromise, {
    resolved: () => {
      return isResolved;
    },
    finished: () => {
      return isResolved || isRejected;
    },
    resolve: (value) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      isResolved = true;
      resolver(value);
    },
    reject: (err) => {
      clearTimeout(timeoutId);
      isRejected = true;
      rejector(err);
    }
  });
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/LazyArg.js
init_cjs_shim();
var __classPrivateFieldSet3 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LazyArg_get;
var LazyArg = class {
  constructor(get) {
    _LazyArg_get.set(this, void 0);
    __classPrivateFieldSet3(this, _LazyArg_get, get, "f");
  }
  get() {
    return __classPrivateFieldGet3(this, _LazyArg_get, "f").call(this);
  }
};
_LazyArg_get = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/LifecycleWatcher.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/FrameManager.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Connection.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/EventEmitter.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/third_party/mitt/index.js
init_cjs_shim();
function mitt_es(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i && i.push(e) || n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && i.splice(i.indexOf(e) >>> 0, 1);
  }, emit: function(t, e) {
    (n.get(t) || []).slice().map(function(n2) {
      n2(e);
    }), (n.get("*") || []).slice().map(function(n2) {
      n2(t, e);
    });
  } };
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/EventEmitter.js
var EventEmitter = class {
  /**
   * @internal
   */
  constructor() {
    this.eventsMap = /* @__PURE__ */ new Map();
    this.emitter = mitt_es(this.eventsMap);
  }
  /**
   * Bind an event listener to fire when an event occurs.
   * @param event - the event type you'd like to listen to. Can be a string or symbol.
   * @param handler - the function to be called when the event occurs.
   * @returns `this` to enable you to chain method calls.
   */
  on(event, handler) {
    this.emitter.on(event, handler);
    return this;
  }
  /**
   * Remove an event listener from firing.
   * @param event - the event type you'd like to stop listening to.
   * @param handler - the function that should be removed.
   * @returns `this` to enable you to chain method calls.
   */
  off(event, handler) {
    this.emitter.off(event, handler);
    return this;
  }
  /**
   * Remove an event listener.
   * @deprecated please use {@link EventEmitter.off} instead.
   */
  removeListener(event, handler) {
    this.off(event, handler);
    return this;
  }
  /**
   * Add an event listener.
   * @deprecated please use {@link EventEmitter.on} instead.
   */
  addListener(event, handler) {
    this.on(event, handler);
    return this;
  }
  /**
   * Emit an event and call any associated listeners.
   *
   * @param event - the event you'd like to emit
   * @param eventData - any data you'd like to emit with the event
   * @returns `true` if there are any listeners, `false` if there are not.
   */
  emit(event, eventData) {
    this.emitter.emit(event, eventData);
    return this.eventListenersCount(event) > 0;
  }
  /**
   * Like `on` but the listener will only be fired once and then it will be removed.
   * @param event - the event you'd like to listen to
   * @param handler - the handler function to run when the event occurs
   * @returns `this` to enable you to chain method calls.
   */
  once(event, handler) {
    const onceHandler = (eventData) => {
      handler(eventData);
      this.off(event, onceHandler);
    };
    return this.on(event, onceHandler);
  }
  /**
   * Gets the number of listeners for a given event.
   *
   * @param event - the event to get the listener count for
   * @returns the number of listeners bound to the given event
   */
  listenerCount(event) {
    return this.eventListenersCount(event);
  }
  /**
   * Removes all listeners. If given an event argument, it will remove only
   * listeners for that event.
   * @param event - the event to remove listeners for.
   * @returns `this` to enable you to chain method calls.
   */
  removeAllListeners(event) {
    if (event) {
      this.eventsMap.delete(event);
    } else {
      this.eventsMap.clear();
    }
    return this;
  }
  eventListenersCount(event) {
    var _a2;
    return ((_a2 = this.eventsMap.get(event)) === null || _a2 === void 0 ? void 0 : _a2.length) || 0;
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Connection.js
var __classPrivateFieldSet4 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Connection_instances;
var _Connection_url;
var _Connection_transport;
var _Connection_delay;
var _Connection_lastId;
var _Connection_sessions;
var _Connection_closed;
var _Connection_callbacks;
var _Connection_manuallyAttached;
var _Connection_onClose;
var _CDPSessionImpl_sessionId;
var _CDPSessionImpl_targetType;
var _CDPSessionImpl_callbacks;
var _CDPSessionImpl_connection;
var debugProtocolSend = debug("puppeteer:protocol:SEND \u25BA");
var debugProtocolReceive = debug("puppeteer:protocol:RECV \u25C0");
var ConnectionEmittedEvents = {
  Disconnected: Symbol("Connection.Disconnected")
};
var Connection = class extends EventEmitter {
  constructor(url, transport, delay = 0) {
    super();
    _Connection_instances.add(this);
    _Connection_url.set(this, void 0);
    _Connection_transport.set(this, void 0);
    _Connection_delay.set(this, void 0);
    _Connection_lastId.set(this, 0);
    _Connection_sessions.set(this, /* @__PURE__ */ new Map());
    _Connection_closed.set(this, false);
    _Connection_callbacks.set(this, /* @__PURE__ */ new Map());
    _Connection_manuallyAttached.set(this, /* @__PURE__ */ new Set());
    __classPrivateFieldSet4(this, _Connection_url, url, "f");
    __classPrivateFieldSet4(this, _Connection_delay, delay, "f");
    __classPrivateFieldSet4(this, _Connection_transport, transport, "f");
    __classPrivateFieldGet4(this, _Connection_transport, "f").onmessage = this.onMessage.bind(this);
    __classPrivateFieldGet4(this, _Connection_transport, "f").onclose = __classPrivateFieldGet4(this, _Connection_instances, "m", _Connection_onClose).bind(this);
  }
  static fromSession(session) {
    return session.connection();
  }
  /**
   * @internal
   */
  get _closed() {
    return __classPrivateFieldGet4(this, _Connection_closed, "f");
  }
  /**
   * @internal
   */
  get _sessions() {
    return __classPrivateFieldGet4(this, _Connection_sessions, "f");
  }
  /**
   * @param sessionId - The session id
   * @returns The current CDP session if it exists
   */
  session(sessionId) {
    return __classPrivateFieldGet4(this, _Connection_sessions, "f").get(sessionId) || null;
  }
  url() {
    return __classPrivateFieldGet4(this, _Connection_url, "f");
  }
  send(method, ...paramArgs) {
    const params = paramArgs.length ? paramArgs[0] : void 0;
    const id = this._rawSend({ method, params });
    return new Promise((resolve2, reject) => {
      __classPrivateFieldGet4(this, _Connection_callbacks, "f").set(id, {
        resolve: resolve2,
        reject,
        error: new ProtocolError(),
        method
      });
    });
  }
  /**
   * @internal
   */
  _rawSend(message) {
    var _a2;
    const id = __classPrivateFieldSet4(this, _Connection_lastId, (_a2 = __classPrivateFieldGet4(this, _Connection_lastId, "f"), ++_a2), "f");
    const stringifiedMessage = JSON.stringify(Object.assign({}, message, { id }));
    debugProtocolSend(stringifiedMessage);
    __classPrivateFieldGet4(this, _Connection_transport, "f").send(stringifiedMessage);
    return id;
  }
  /**
   * @internal
   */
  async onMessage(message) {
    if (__classPrivateFieldGet4(this, _Connection_delay, "f")) {
      await new Promise((f) => {
        return setTimeout(f, __classPrivateFieldGet4(this, _Connection_delay, "f"));
      });
    }
    debugProtocolReceive(message);
    const object = JSON.parse(message);
    if (object.method === "Target.attachedToTarget") {
      const sessionId = object.params.sessionId;
      const session = new CDPSessionImpl(this, object.params.targetInfo.type, sessionId);
      __classPrivateFieldGet4(this, _Connection_sessions, "f").set(sessionId, session);
      this.emit("sessionattached", session);
      const parentSession = __classPrivateFieldGet4(this, _Connection_sessions, "f").get(object.sessionId);
      if (parentSession) {
        parentSession.emit("sessionattached", session);
      }
    } else if (object.method === "Target.detachedFromTarget") {
      const session = __classPrivateFieldGet4(this, _Connection_sessions, "f").get(object.params.sessionId);
      if (session) {
        session._onClosed();
        __classPrivateFieldGet4(this, _Connection_sessions, "f").delete(object.params.sessionId);
        this.emit("sessiondetached", session);
        const parentSession = __classPrivateFieldGet4(this, _Connection_sessions, "f").get(object.sessionId);
        if (parentSession) {
          parentSession.emit("sessiondetached", session);
        }
      }
    }
    if (object.sessionId) {
      const session = __classPrivateFieldGet4(this, _Connection_sessions, "f").get(object.sessionId);
      if (session) {
        session._onMessage(object);
      }
    } else if (object.id) {
      const callback = __classPrivateFieldGet4(this, _Connection_callbacks, "f").get(object.id);
      if (callback) {
        __classPrivateFieldGet4(this, _Connection_callbacks, "f").delete(object.id);
        if (object.error) {
          callback.reject(createProtocolError(callback.error, callback.method, object));
        } else {
          callback.resolve(object.result);
        }
      }
    } else {
      this.emit(object.method, object.params);
    }
  }
  dispose() {
    __classPrivateFieldGet4(this, _Connection_instances, "m", _Connection_onClose).call(this);
    __classPrivateFieldGet4(this, _Connection_transport, "f").close();
  }
  /**
   * @internal
   */
  isAutoAttached(targetId) {
    return !__classPrivateFieldGet4(this, _Connection_manuallyAttached, "f").has(targetId);
  }
  /**
   * @internal
   */
  async _createSession(targetInfo, isAutoAttachEmulated = true) {
    if (!isAutoAttachEmulated) {
      __classPrivateFieldGet4(this, _Connection_manuallyAttached, "f").add(targetInfo.targetId);
    }
    const { sessionId } = await this.send("Target.attachToTarget", {
      targetId: targetInfo.targetId,
      flatten: true
    });
    __classPrivateFieldGet4(this, _Connection_manuallyAttached, "f").delete(targetInfo.targetId);
    const session = __classPrivateFieldGet4(this, _Connection_sessions, "f").get(sessionId);
    if (!session) {
      throw new Error("CDPSession creation failed.");
    }
    return session;
  }
  /**
   * @param targetInfo - The target info
   * @returns The CDP session that is created
   */
  async createSession(targetInfo) {
    return await this._createSession(targetInfo, false);
  }
};
_Connection_url = /* @__PURE__ */ new WeakMap(), _Connection_transport = /* @__PURE__ */ new WeakMap(), _Connection_delay = /* @__PURE__ */ new WeakMap(), _Connection_lastId = /* @__PURE__ */ new WeakMap(), _Connection_sessions = /* @__PURE__ */ new WeakMap(), _Connection_closed = /* @__PURE__ */ new WeakMap(), _Connection_callbacks = /* @__PURE__ */ new WeakMap(), _Connection_manuallyAttached = /* @__PURE__ */ new WeakMap(), _Connection_instances = /* @__PURE__ */ new WeakSet(), _Connection_onClose = function _Connection_onClose2() {
  if (__classPrivateFieldGet4(this, _Connection_closed, "f")) {
    return;
  }
  __classPrivateFieldSet4(this, _Connection_closed, true, "f");
  __classPrivateFieldGet4(this, _Connection_transport, "f").onmessage = void 0;
  __classPrivateFieldGet4(this, _Connection_transport, "f").onclose = void 0;
  for (const callback of __classPrivateFieldGet4(this, _Connection_callbacks, "f").values()) {
    callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
  }
  __classPrivateFieldGet4(this, _Connection_callbacks, "f").clear();
  for (const session of __classPrivateFieldGet4(this, _Connection_sessions, "f").values()) {
    session._onClosed();
  }
  __classPrivateFieldGet4(this, _Connection_sessions, "f").clear();
  this.emit(ConnectionEmittedEvents.Disconnected);
};
var CDPSessionEmittedEvents = {
  Disconnected: Symbol("CDPSession.Disconnected")
};
var CDPSession = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  connection() {
    throw new Error("Not implemented");
  }
  send() {
    throw new Error("Not implemented");
  }
  /**
   * Detaches the cdpSession from the target. Once detached, the cdpSession object
   * won't emit any events and can't be used to send messages.
   */
  async detach() {
    throw new Error("Not implemented");
  }
  /**
   * Returns the session's id.
   */
  id() {
    throw new Error("Not implemented");
  }
};
var CDPSessionImpl = class extends CDPSession {
  /**
   * @internal
   */
  constructor(connection, targetType, sessionId) {
    super();
    _CDPSessionImpl_sessionId.set(this, void 0);
    _CDPSessionImpl_targetType.set(this, void 0);
    _CDPSessionImpl_callbacks.set(this, /* @__PURE__ */ new Map());
    _CDPSessionImpl_connection.set(this, void 0);
    __classPrivateFieldSet4(this, _CDPSessionImpl_connection, connection, "f");
    __classPrivateFieldSet4(this, _CDPSessionImpl_targetType, targetType, "f");
    __classPrivateFieldSet4(this, _CDPSessionImpl_sessionId, sessionId, "f");
  }
  connection() {
    return __classPrivateFieldGet4(this, _CDPSessionImpl_connection, "f");
  }
  send(method, ...paramArgs) {
    if (!__classPrivateFieldGet4(this, _CDPSessionImpl_connection, "f")) {
      return Promise.reject(new Error(`Protocol error (${method}): Session closed. Most likely the ${__classPrivateFieldGet4(this, _CDPSessionImpl_targetType, "f")} has been closed.`));
    }
    const params = paramArgs.length ? paramArgs[0] : void 0;
    const id = __classPrivateFieldGet4(this, _CDPSessionImpl_connection, "f")._rawSend({
      sessionId: __classPrivateFieldGet4(this, _CDPSessionImpl_sessionId, "f"),
      method,
      params
    });
    return new Promise((resolve2, reject) => {
      __classPrivateFieldGet4(this, _CDPSessionImpl_callbacks, "f").set(id, {
        resolve: resolve2,
        reject,
        error: new ProtocolError(),
        method
      });
    });
  }
  /**
   * @internal
   */
  _onMessage(object) {
    const callback = object.id ? __classPrivateFieldGet4(this, _CDPSessionImpl_callbacks, "f").get(object.id) : void 0;
    if (object.id && callback) {
      __classPrivateFieldGet4(this, _CDPSessionImpl_callbacks, "f").delete(object.id);
      if (object.error) {
        callback.reject(createProtocolError(callback.error, callback.method, object));
      } else {
        callback.resolve(object.result);
      }
    } else {
      assert(!object.id);
      this.emit(object.method, object.params);
    }
  }
  /**
   * Detaches the cdpSession from the target. Once detached, the cdpSession object
   * won't emit any events and can't be used to send messages.
   */
  async detach() {
    if (!__classPrivateFieldGet4(this, _CDPSessionImpl_connection, "f")) {
      throw new Error(`Session already detached. Most likely the ${__classPrivateFieldGet4(this, _CDPSessionImpl_targetType, "f")} has been closed.`);
    }
    await __classPrivateFieldGet4(this, _CDPSessionImpl_connection, "f").send("Target.detachFromTarget", {
      sessionId: __classPrivateFieldGet4(this, _CDPSessionImpl_sessionId, "f")
    });
  }
  /**
   * @internal
   */
  _onClosed() {
    for (const callback of __classPrivateFieldGet4(this, _CDPSessionImpl_callbacks, "f").values()) {
      callback.reject(rewriteError(callback.error, `Protocol error (${callback.method}): Target closed.`));
    }
    __classPrivateFieldGet4(this, _CDPSessionImpl_callbacks, "f").clear();
    __classPrivateFieldSet4(this, _CDPSessionImpl_connection, void 0, "f");
    this.emit(CDPSessionEmittedEvents.Disconnected);
  }
  /**
   * Returns the session's id.
   */
  id() {
    return __classPrivateFieldGet4(this, _CDPSessionImpl_sessionId, "f");
  }
};
_CDPSessionImpl_sessionId = /* @__PURE__ */ new WeakMap(), _CDPSessionImpl_targetType = /* @__PURE__ */ new WeakMap(), _CDPSessionImpl_callbacks = /* @__PURE__ */ new WeakMap(), _CDPSessionImpl_connection = /* @__PURE__ */ new WeakMap();
function createProtocolError(error, method, object) {
  let message = `Protocol error (${method}): ${object.error.message}`;
  if ("data" in object.error) {
    message += ` ${object.error.data}`;
  }
  return rewriteError(error, message, object.error.message);
}
function rewriteError(error, message, originalMessage) {
  error.message = message;
  error.originalMessage = originalMessage !== null && originalMessage !== void 0 ? originalMessage : error.originalMessage;
  return error;
}
function isTargetClosedError(err) {
  return err.message.includes("Target closed") || err.message.includes("Session closed");
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/ExecutionContext.js
init_cjs_shim();
var __classPrivateFieldGet5 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ExecutionContext_instances;
var _ExecutionContext_evaluate;
var EVALUATION_SCRIPT_URL = "pptr://__puppeteer_evaluation_script__";
var SOURCE_URL_REGEX = /^[\040\t]*\/\/[@#] sourceURL=\s*(\S*?)\s*$/m;
var ExecutionContext = class {
  /**
   * @internal
   */
  constructor(client, contextPayload, world) {
    _ExecutionContext_instances.add(this);
    this._client = client;
    this._world = world;
    this._contextId = contextPayload.id;
    this._contextName = contextPayload.name;
  }
  /**
   * Evaluates the given function.
   *
   * @example
   *
   * ```ts
   * const executionContext = await page.mainFrame().executionContext();
   * const result = await executionContext.evaluate(() => Promise.resolve(8 * 7))* ;
   * console.log(result); // prints "56"
   * ```
   *
   * @example
   * A string can also be passed in instead of a function:
   *
   * ```ts
   * console.log(await executionContext.evaluate('1 + 2')); // prints "3"
   * ```
   *
   * @example
   * Handles can also be passed as `args`. They resolve to their referenced object:
   *
   * ```ts
   * const oneHandle = await executionContext.evaluateHandle(() => 1);
   * const twoHandle = await executionContext.evaluateHandle(() => 2);
   * const result = await executionContext.evaluate(
   *   (a, b) => a + b,
   *   oneHandle,
   *   twoHandle
   * );
   * await oneHandle.dispose();
   * await twoHandle.dispose();
   * console.log(result); // prints '3'.
   * ```
   *
   * @param pageFunction - The function to evaluate.
   * @param args - Additional arguments to pass into the function.
   * @returns The result of evaluating the function. If the result is an object,
   * a vanilla object containing the serializable properties of the result is
   * returned.
   */
  async evaluate(pageFunction, ...args) {
    return await __classPrivateFieldGet5(this, _ExecutionContext_instances, "m", _ExecutionContext_evaluate).call(this, true, pageFunction, ...args);
  }
  /**
   * Evaluates the given function.
   *
   * Unlike {@link ExecutionContext.evaluate | evaluate}, this method returns a
   * handle to the result of the function.
   *
   * This method may be better suited if the object cannot be serialized (e.g.
   * `Map`) and requires further manipulation.
   *
   * @example
   *
   * ```ts
   * const context = await page.mainFrame().executionContext();
   * const handle: JSHandle<typeof globalThis> = await context.evaluateHandle(
   *   () => Promise.resolve(self)
   * );
   * ```
   *
   * @example
   * A string can also be passed in instead of a function.
   *
   * ```ts
   * const handle: JSHandle<number> = await context.evaluateHandle('1 + 2');
   * ```
   *
   * @example
   * Handles can also be passed as `args`. They resolve to their referenced object:
   *
   * ```ts
   * const bodyHandle: ElementHandle<HTMLBodyElement> =
   *   await context.evaluateHandle(() => {
   *     return document.body;
   *   });
   * const stringHandle: JSHandle<string> = await context.evaluateHandle(
   *   body => body.innerHTML,
   *   body
   * );
   * console.log(await stringHandle.jsonValue()); // prints body's innerHTML
   * // Always dispose your garbage! :)
   * await bodyHandle.dispose();
   * await stringHandle.dispose();
   * ```
   *
   * @param pageFunction - The function to evaluate.
   * @param args - Additional arguments to pass into the function.
   * @returns A {@link JSHandle | handle} to the result of evaluating the
   * function. If the result is a `Node`, then this will return an
   * {@link ElementHandle | element handle}.
   */
  async evaluateHandle(pageFunction, ...args) {
    return __classPrivateFieldGet5(this, _ExecutionContext_instances, "m", _ExecutionContext_evaluate).call(this, false, pageFunction, ...args);
  }
};
_ExecutionContext_instances = /* @__PURE__ */ new WeakSet(), _ExecutionContext_evaluate = async function _ExecutionContext_evaluate2(returnByValue, pageFunction, ...args) {
  const suffix = `//# sourceURL=${EVALUATION_SCRIPT_URL}`;
  if (isString(pageFunction)) {
    const contextId = this._contextId;
    const expression = pageFunction;
    const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression) ? expression : expression + "\n" + suffix;
    const { exceptionDetails: exceptionDetails2, result: remoteObject2 } = await this._client.send("Runtime.evaluate", {
      expression: expressionWithSourceUrl,
      contextId,
      returnByValue,
      awaitPromise: true,
      userGesture: true
    }).catch(rewriteError2);
    if (exceptionDetails2) {
      throw new Error("Evaluation failed: " + getExceptionMessage(exceptionDetails2));
    }
    return returnByValue ? valueFromRemoteObject(remoteObject2) : createJSHandle(this, remoteObject2);
  }
  let functionText = pageFunction.toString();
  try {
    new Function("(" + functionText + ")");
  } catch (error) {
    if (functionText.startsWith("async ")) {
      functionText = "async function " + functionText.substring("async ".length);
    } else {
      functionText = "function " + functionText;
    }
    try {
      new Function("(" + functionText + ")");
    } catch (error2) {
      throw new Error("Passed function is not well-serializable!");
    }
  }
  let callFunctionOnPromise;
  try {
    callFunctionOnPromise = this._client.send("Runtime.callFunctionOn", {
      functionDeclaration: functionText + "\n" + suffix + "\n",
      executionContextId: this._contextId,
      arguments: await Promise.all(args.map(convertArgument.bind(this))),
      returnByValue,
      awaitPromise: true,
      userGesture: true
    });
  } catch (error) {
    if (error instanceof TypeError && error.message.startsWith("Converting circular structure to JSON")) {
      error.message += " Recursive objects are not allowed.";
    }
    throw error;
  }
  const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError2);
  if (exceptionDetails) {
    throw new Error("Evaluation failed: " + getExceptionMessage(exceptionDetails));
  }
  return returnByValue ? valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);
  async function convertArgument(arg) {
    if (arg instanceof LazyArg) {
      arg = await arg.get();
    }
    if (typeof arg === "bigint") {
      return { unserializableValue: `${arg.toString()}n` };
    }
    if (Object.is(arg, -0)) {
      return { unserializableValue: "-0" };
    }
    if (Object.is(arg, Infinity)) {
      return { unserializableValue: "Infinity" };
    }
    if (Object.is(arg, -Infinity)) {
      return { unserializableValue: "-Infinity" };
    }
    if (Object.is(arg, NaN)) {
      return { unserializableValue: "NaN" };
    }
    const objectHandle = arg && arg instanceof JSHandle ? arg : null;
    if (objectHandle) {
      if (objectHandle.executionContext() !== this) {
        throw new Error("JSHandles can be evaluated only in the context they were created!");
      }
      if (objectHandle.disposed) {
        throw new Error("JSHandle is disposed!");
      }
      if (objectHandle.remoteObject().unserializableValue) {
        return {
          unserializableValue: objectHandle.remoteObject().unserializableValue
        };
      }
      if (!objectHandle.remoteObject().objectId) {
        return { value: objectHandle.remoteObject().value };
      }
      return { objectId: objectHandle.remoteObject().objectId };
    }
    return { value: arg };
  }
};
var rewriteError2 = (error) => {
  if (error.message.includes("Object reference chain is too long")) {
    return { result: { type: "undefined" } };
  }
  if (error.message.includes("Object couldn't be returned by value")) {
    return { result: { type: "undefined" } };
  }
  if (error.message.endsWith("Cannot find context with specified id") || error.message.endsWith("Inspected target navigated or closed")) {
    throw new Error("Execution context was destroyed, most likely because of a navigation.");
  }
  throw error;
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/FrameTree.js
init_cjs_shim();
var __classPrivateFieldGet6 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet5 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _FrameTree_frames;
var _FrameTree_parentIds;
var _FrameTree_childIds;
var _FrameTree_mainFrame;
var _FrameTree_waitRequests;
var FrameTree = class {
  constructor() {
    _FrameTree_frames.set(this, /* @__PURE__ */ new Map());
    _FrameTree_parentIds.set(this, /* @__PURE__ */ new Map());
    _FrameTree_childIds.set(this, /* @__PURE__ */ new Map());
    _FrameTree_mainFrame.set(this, void 0);
    _FrameTree_waitRequests.set(this, /* @__PURE__ */ new Map());
  }
  getMainFrame() {
    return __classPrivateFieldGet6(this, _FrameTree_mainFrame, "f");
  }
  getById(frameId) {
    return __classPrivateFieldGet6(this, _FrameTree_frames, "f").get(frameId);
  }
  /**
   * Returns a promise that is resolved once the frame with
   * the given ID is added to the tree.
   */
  waitForFrame(frameId) {
    const frame = this.getById(frameId);
    if (frame) {
      return Promise.resolve(frame);
    }
    const deferred = createDeferredPromise();
    const callbacks = __classPrivateFieldGet6(this, _FrameTree_waitRequests, "f").get(frameId) || /* @__PURE__ */ new Set();
    callbacks.add(deferred);
    return deferred;
  }
  frames() {
    return Array.from(__classPrivateFieldGet6(this, _FrameTree_frames, "f").values());
  }
  addFrame(frame) {
    var _a2;
    __classPrivateFieldGet6(this, _FrameTree_frames, "f").set(frame._id, frame);
    if (frame._parentId) {
      __classPrivateFieldGet6(this, _FrameTree_parentIds, "f").set(frame._id, frame._parentId);
      if (!__classPrivateFieldGet6(this, _FrameTree_childIds, "f").has(frame._parentId)) {
        __classPrivateFieldGet6(this, _FrameTree_childIds, "f").set(frame._parentId, /* @__PURE__ */ new Set());
      }
      __classPrivateFieldGet6(this, _FrameTree_childIds, "f").get(frame._parentId).add(frame._id);
    } else {
      __classPrivateFieldSet5(this, _FrameTree_mainFrame, frame, "f");
    }
    (_a2 = __classPrivateFieldGet6(this, _FrameTree_waitRequests, "f").get(frame._id)) === null || _a2 === void 0 ? void 0 : _a2.forEach((request3) => {
      return request3.resolve(frame);
    });
  }
  removeFrame(frame) {
    var _a2;
    __classPrivateFieldGet6(this, _FrameTree_frames, "f").delete(frame._id);
    __classPrivateFieldGet6(this, _FrameTree_parentIds, "f").delete(frame._id);
    if (frame._parentId) {
      (_a2 = __classPrivateFieldGet6(this, _FrameTree_childIds, "f").get(frame._parentId)) === null || _a2 === void 0 ? void 0 : _a2.delete(frame._id);
    } else {
      __classPrivateFieldSet5(this, _FrameTree_mainFrame, void 0, "f");
    }
  }
  childFrames(frameId) {
    const childIds = __classPrivateFieldGet6(this, _FrameTree_childIds, "f").get(frameId);
    if (!childIds) {
      return [];
    }
    return Array.from(childIds).map((id) => {
      return this.getById(id);
    }).filter((frame) => {
      return frame !== void 0;
    });
  }
  parentFrame(frameId) {
    const parentId = __classPrivateFieldGet6(this, _FrameTree_parentIds, "f").get(frameId);
    return parentId ? this.getById(parentId) : void 0;
  }
};
_FrameTree_frames = /* @__PURE__ */ new WeakMap(), _FrameTree_parentIds = /* @__PURE__ */ new WeakMap(), _FrameTree_childIds = /* @__PURE__ */ new WeakMap(), _FrameTree_mainFrame = /* @__PURE__ */ new WeakMap(), _FrameTree_waitRequests = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/NetworkManager.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/HTTPRequest.js
init_cjs_shim();
var __classPrivateFieldSet6 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet7 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTTPRequest_instances;
var _HTTPRequest_client;
var _HTTPRequest_isNavigationRequest;
var _HTTPRequest_allowInterception;
var _HTTPRequest_interceptionHandled;
var _HTTPRequest_url;
var _HTTPRequest_resourceType;
var _HTTPRequest_method;
var _HTTPRequest_postData;
var _HTTPRequest_headers;
var _HTTPRequest_frame;
var _HTTPRequest_continueRequestOverrides;
var _HTTPRequest_responseForRequest;
var _HTTPRequest_abortErrorReason;
var _HTTPRequest_interceptResolutionState;
var _HTTPRequest_interceptHandlers;
var _HTTPRequest_initiator;
var _HTTPRequest_continue;
var _HTTPRequest_respond;
var _HTTPRequest_abort;
var HTTPRequest = class {
  /**
   * @internal
   */
  constructor(client, frame, interceptionId, allowInterception, event, redirectChain) {
    _HTTPRequest_instances.add(this);
    this._failureText = null;
    this._response = null;
    this._fromMemoryCache = false;
    _HTTPRequest_client.set(this, void 0);
    _HTTPRequest_isNavigationRequest.set(this, void 0);
    _HTTPRequest_allowInterception.set(this, void 0);
    _HTTPRequest_interceptionHandled.set(this, false);
    _HTTPRequest_url.set(this, void 0);
    _HTTPRequest_resourceType.set(this, void 0);
    _HTTPRequest_method.set(this, void 0);
    _HTTPRequest_postData.set(this, void 0);
    _HTTPRequest_headers.set(this, {});
    _HTTPRequest_frame.set(this, void 0);
    _HTTPRequest_continueRequestOverrides.set(this, void 0);
    _HTTPRequest_responseForRequest.set(this, null);
    _HTTPRequest_abortErrorReason.set(this, null);
    _HTTPRequest_interceptResolutionState.set(this, {
      action: InterceptResolutionAction.None
    });
    _HTTPRequest_interceptHandlers.set(this, void 0);
    _HTTPRequest_initiator.set(this, void 0);
    __classPrivateFieldSet6(this, _HTTPRequest_client, client, "f");
    this._requestId = event.requestId;
    __classPrivateFieldSet6(this, _HTTPRequest_isNavigationRequest, event.requestId === event.loaderId && event.type === "Document", "f");
    this._interceptionId = interceptionId;
    __classPrivateFieldSet6(this, _HTTPRequest_allowInterception, allowInterception, "f");
    __classPrivateFieldSet6(this, _HTTPRequest_url, event.request.url, "f");
    __classPrivateFieldSet6(this, _HTTPRequest_resourceType, (event.type || "other").toLowerCase(), "f");
    __classPrivateFieldSet6(this, _HTTPRequest_method, event.request.method, "f");
    __classPrivateFieldSet6(this, _HTTPRequest_postData, event.request.postData, "f");
    __classPrivateFieldSet6(this, _HTTPRequest_frame, frame, "f");
    this._redirectChain = redirectChain;
    __classPrivateFieldSet6(this, _HTTPRequest_continueRequestOverrides, {}, "f");
    __classPrivateFieldSet6(this, _HTTPRequest_interceptHandlers, [], "f");
    __classPrivateFieldSet6(this, _HTTPRequest_initiator, event.initiator, "f");
    for (const [key, value] of Object.entries(event.request.headers)) {
      __classPrivateFieldGet7(this, _HTTPRequest_headers, "f")[key.toLowerCase()] = value;
    }
  }
  /**
   * Warning! Using this client can break Puppeteer. Use with caution.
   *
   * @experimental
   */
  get client() {
    return __classPrivateFieldGet7(this, _HTTPRequest_client, "f");
  }
  /**
   * @returns the URL of the request
   */
  url() {
    return __classPrivateFieldGet7(this, _HTTPRequest_url, "f");
  }
  /**
   * @returns the `ContinueRequestOverrides` that will be used
   * if the interception is allowed to continue (ie, `abort()` and
   * `respond()` aren't called).
   */
  continueRequestOverrides() {
    assert(__classPrivateFieldGet7(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    return __classPrivateFieldGet7(this, _HTTPRequest_continueRequestOverrides, "f");
  }
  /**
   * @returns The `ResponseForRequest` that gets used if the
   * interception is allowed to respond (ie, `abort()` is not called).
   */
  responseForRequest() {
    assert(__classPrivateFieldGet7(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    return __classPrivateFieldGet7(this, _HTTPRequest_responseForRequest, "f");
  }
  /**
   * @returns the most recent reason for aborting the request
   */
  abortErrorReason() {
    assert(__classPrivateFieldGet7(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    return __classPrivateFieldGet7(this, _HTTPRequest_abortErrorReason, "f");
  }
  /**
   * @returns An InterceptResolutionState object describing the current resolution
   * action and priority.
   *
   * InterceptResolutionState contains:
   * action: InterceptResolutionAction
   * priority?: number
   *
   * InterceptResolutionAction is one of: `abort`, `respond`, `continue`,
   * `disabled`, `none`, or `already-handled`.
   */
  interceptResolutionState() {
    if (!__classPrivateFieldGet7(this, _HTTPRequest_allowInterception, "f")) {
      return { action: InterceptResolutionAction.Disabled };
    }
    if (__classPrivateFieldGet7(this, _HTTPRequest_interceptionHandled, "f")) {
      return { action: InterceptResolutionAction.AlreadyHandled };
    }
    return { ...__classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f") };
  }
  /**
   * @returns `true` if the intercept resolution has already been handled,
   * `false` otherwise.
   */
  isInterceptResolutionHandled() {
    return __classPrivateFieldGet7(this, _HTTPRequest_interceptionHandled, "f");
  }
  /**
   * Adds an async request handler to the processing queue.
   * Deferred handlers are not guaranteed to execute in any particular order,
   * but they are guaranteed to resolve before the request interception
   * is finalized.
   */
  enqueueInterceptAction(pendingHandler) {
    __classPrivateFieldGet7(this, _HTTPRequest_interceptHandlers, "f").push(pendingHandler);
  }
  /**
   * Awaits pending interception handlers and then decides how to fulfill
   * the request interception.
   */
  async finalizeInterceptions() {
    await __classPrivateFieldGet7(this, _HTTPRequest_interceptHandlers, "f").reduce((promiseChain, interceptAction) => {
      return promiseChain.then(interceptAction);
    }, Promise.resolve());
    const { action } = this.interceptResolutionState();
    switch (action) {
      case "abort":
        return __classPrivateFieldGet7(this, _HTTPRequest_instances, "m", _HTTPRequest_abort).call(this, __classPrivateFieldGet7(this, _HTTPRequest_abortErrorReason, "f"));
      case "respond":
        if (__classPrivateFieldGet7(this, _HTTPRequest_responseForRequest, "f") === null) {
          throw new Error("Response is missing for the interception");
        }
        return __classPrivateFieldGet7(this, _HTTPRequest_instances, "m", _HTTPRequest_respond).call(this, __classPrivateFieldGet7(this, _HTTPRequest_responseForRequest, "f"));
      case "continue":
        return __classPrivateFieldGet7(this, _HTTPRequest_instances, "m", _HTTPRequest_continue).call(this, __classPrivateFieldGet7(this, _HTTPRequest_continueRequestOverrides, "f"));
    }
  }
  /**
   * Contains the request's resource type as it was perceived by the rendering
   * engine.
   */
  resourceType() {
    return __classPrivateFieldGet7(this, _HTTPRequest_resourceType, "f");
  }
  /**
   * @returns the method used (`GET`, `POST`, etc.)
   */
  method() {
    return __classPrivateFieldGet7(this, _HTTPRequest_method, "f");
  }
  /**
   * @returns the request's post body, if any.
   */
  postData() {
    return __classPrivateFieldGet7(this, _HTTPRequest_postData, "f");
  }
  /**
   * @returns an object with HTTP headers associated with the request. All
   * header names are lower-case.
   */
  headers() {
    return __classPrivateFieldGet7(this, _HTTPRequest_headers, "f");
  }
  /**
   * @returns A matching `HTTPResponse` object, or null if the response has not
   * been received yet.
   */
  response() {
    return this._response;
  }
  /**
   * @returns the frame that initiated the request, or null if navigating to
   * error pages.
   */
  frame() {
    return __classPrivateFieldGet7(this, _HTTPRequest_frame, "f");
  }
  /**
   * @returns true if the request is the driver of the current frame's navigation.
   */
  isNavigationRequest() {
    return __classPrivateFieldGet7(this, _HTTPRequest_isNavigationRequest, "f");
  }
  /**
   * @returns the initiator of the request.
   */
  initiator() {
    return __classPrivateFieldGet7(this, _HTTPRequest_initiator, "f");
  }
  /**
   * A `redirectChain` is a chain of requests initiated to fetch a resource.
   * @remarks
   *
   * `redirectChain` is shared between all the requests of the same chain.
   *
   * For example, if the website `http://example.com` has a single redirect to
   * `https://example.com`, then the chain will contain one request:
   *
   * ```ts
   * const response = await page.goto('http://example.com');
   * const chain = response.request().redirectChain();
   * console.log(chain.length); // 1
   * console.log(chain[0].url()); // 'http://example.com'
   * ```
   *
   * If the website `https://google.com` has no redirects, then the chain will be empty:
   *
   * ```ts
   * const response = await page.goto('https://google.com');
   * const chain = response.request().redirectChain();
   * console.log(chain.length); // 0
   * ```
   *
   * @returns the chain of requests - if a server responds with at least a
   * single redirect, this chain will contain all requests that were redirected.
   */
  redirectChain() {
    return this._redirectChain.slice();
  }
  /**
   * Access information about the request's failure.
   *
   * @remarks
   *
   * @example
   *
   * Example of logging all failed requests:
   *
   * ```ts
   * page.on('requestfailed', request => {
   *   console.log(request.url() + ' ' + request.failure().errorText);
   * });
   * ```
   *
   * @returns `null` unless the request failed. If the request fails this can
   * return an object with `errorText` containing a human-readable error
   * message, e.g. `net::ERR_FAILED`. It is not guaranteed that there will be
   * failure text if the request fails.
   */
  failure() {
    if (!this._failureText) {
      return null;
    }
    return {
      errorText: this._failureText
    };
  }
  /**
   * Continues request with optional request overrides.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled.
   *
   * @example
   *
   * ```ts
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   // Override headers
   *   const headers = Object.assign({}, request.headers(), {
   *     foo: 'bar', // set "foo" header
   *     origin: undefined, // remove "origin" header
   *   });
   *   request.continue({headers});
   * });
   * ```
   *
   * @param overrides - optional overrides to apply to the request.
   * @param priority - If provided, intercept is resolved using
   * cooperative handling rules. Otherwise, intercept is resolved
   * immediately.
   */
  async continue(overrides = {}, priority) {
    if (__classPrivateFieldGet7(this, _HTTPRequest_url, "f").startsWith("data:")) {
      return;
    }
    assert(__classPrivateFieldGet7(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    assert(!__classPrivateFieldGet7(this, _HTTPRequest_interceptionHandled, "f"), "Request is already handled!");
    if (priority === void 0) {
      return __classPrivateFieldGet7(this, _HTTPRequest_instances, "m", _HTTPRequest_continue).call(this, overrides);
    }
    __classPrivateFieldSet6(this, _HTTPRequest_continueRequestOverrides, overrides, "f");
    if (__classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").priority === void 0 || priority > __classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      __classPrivateFieldSet6(this, _HTTPRequest_interceptResolutionState, {
        action: InterceptResolutionAction.Continue,
        priority
      }, "f");
      return;
    }
    if (priority === __classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      if (__classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").action === "abort" || __classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").action === "respond") {
        return;
      }
      __classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").action = InterceptResolutionAction.Continue;
    }
    return;
  }
  /**
   * Fulfills a request with the given response.
   *
   * @remarks
   *
   * To use this, request
   * interception should be enabled with {@link Page.setRequestInterception}.
   *
   * Exception is immediately thrown if the request interception is not enabled.
   *
   * @example
   * An example of fulfilling all requests with 404 responses:
   *
   * ```ts
   * await page.setRequestInterception(true);
   * page.on('request', request => {
   *   request.respond({
   *     status: 404,
   *     contentType: 'text/plain',
   *     body: 'Not Found!',
   *   });
   * });
   * ```
   *
   * NOTE: Mocking responses for dataURL requests is not supported.
   * Calling `request.respond` for a dataURL request is a noop.
   *
   * @param response - the response to fulfill the request with.
   * @param priority - If provided, intercept is resolved using
   * cooperative handling rules. Otherwise, intercept is resolved
   * immediately.
   */
  async respond(response, priority) {
    if (__classPrivateFieldGet7(this, _HTTPRequest_url, "f").startsWith("data:")) {
      return;
    }
    assert(__classPrivateFieldGet7(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    assert(!__classPrivateFieldGet7(this, _HTTPRequest_interceptionHandled, "f"), "Request is already handled!");
    if (priority === void 0) {
      return __classPrivateFieldGet7(this, _HTTPRequest_instances, "m", _HTTPRequest_respond).call(this, response);
    }
    __classPrivateFieldSet6(this, _HTTPRequest_responseForRequest, response, "f");
    if (__classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").priority === void 0 || priority > __classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      __classPrivateFieldSet6(this, _HTTPRequest_interceptResolutionState, {
        action: InterceptResolutionAction.Respond,
        priority
      }, "f");
      return;
    }
    if (priority === __classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      if (__classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").action === "abort") {
        return;
      }
      __classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").action = InterceptResolutionAction.Respond;
    }
  }
  /**
   * Aborts a request.
   *
   * @remarks
   * To use this, request interception should be enabled with
   * {@link Page.setRequestInterception}. If it is not enabled, this method will
   * throw an exception immediately.
   *
   * @param errorCode - optional error code to provide.
   * @param priority - If provided, intercept is resolved using
   * cooperative handling rules. Otherwise, intercept is resolved
   * immediately.
   */
  async abort(errorCode = "failed", priority) {
    if (__classPrivateFieldGet7(this, _HTTPRequest_url, "f").startsWith("data:")) {
      return;
    }
    const errorReason = errorReasons[errorCode];
    assert(errorReason, "Unknown error code: " + errorCode);
    assert(__classPrivateFieldGet7(this, _HTTPRequest_allowInterception, "f"), "Request Interception is not enabled!");
    assert(!__classPrivateFieldGet7(this, _HTTPRequest_interceptionHandled, "f"), "Request is already handled!");
    if (priority === void 0) {
      return __classPrivateFieldGet7(this, _HTTPRequest_instances, "m", _HTTPRequest_abort).call(this, errorReason);
    }
    __classPrivateFieldSet6(this, _HTTPRequest_abortErrorReason, errorReason, "f");
    if (__classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").priority === void 0 || priority >= __classPrivateFieldGet7(this, _HTTPRequest_interceptResolutionState, "f").priority) {
      __classPrivateFieldSet6(this, _HTTPRequest_interceptResolutionState, {
        action: InterceptResolutionAction.Abort,
        priority
      }, "f");
      return;
    }
  }
};
_HTTPRequest_client = /* @__PURE__ */ new WeakMap(), _HTTPRequest_isNavigationRequest = /* @__PURE__ */ new WeakMap(), _HTTPRequest_allowInterception = /* @__PURE__ */ new WeakMap(), _HTTPRequest_interceptionHandled = /* @__PURE__ */ new WeakMap(), _HTTPRequest_url = /* @__PURE__ */ new WeakMap(), _HTTPRequest_resourceType = /* @__PURE__ */ new WeakMap(), _HTTPRequest_method = /* @__PURE__ */ new WeakMap(), _HTTPRequest_postData = /* @__PURE__ */ new WeakMap(), _HTTPRequest_headers = /* @__PURE__ */ new WeakMap(), _HTTPRequest_frame = /* @__PURE__ */ new WeakMap(), _HTTPRequest_continueRequestOverrides = /* @__PURE__ */ new WeakMap(), _HTTPRequest_responseForRequest = /* @__PURE__ */ new WeakMap(), _HTTPRequest_abortErrorReason = /* @__PURE__ */ new WeakMap(), _HTTPRequest_interceptResolutionState = /* @__PURE__ */ new WeakMap(), _HTTPRequest_interceptHandlers = /* @__PURE__ */ new WeakMap(), _HTTPRequest_initiator = /* @__PURE__ */ new WeakMap(), _HTTPRequest_instances = /* @__PURE__ */ new WeakSet(), _HTTPRequest_continue = async function _HTTPRequest_continue2(overrides = {}) {
  const { url, method, postData, headers } = overrides;
  __classPrivateFieldSet6(this, _HTTPRequest_interceptionHandled, true, "f");
  const postDataBinaryBase64 = postData ? Buffer.from(postData).toString("base64") : void 0;
  if (this._interceptionId === void 0) {
    throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.continueRequest");
  }
  await __classPrivateFieldGet7(this, _HTTPRequest_client, "f").send("Fetch.continueRequest", {
    requestId: this._interceptionId,
    url,
    method,
    postData: postDataBinaryBase64,
    headers: headers ? headersArray(headers) : void 0
  }).catch((error) => {
    __classPrivateFieldSet6(this, _HTTPRequest_interceptionHandled, false, "f");
    return handleError(error);
  });
}, _HTTPRequest_respond = async function _HTTPRequest_respond2(response) {
  __classPrivateFieldSet6(this, _HTTPRequest_interceptionHandled, true, "f");
  const responseBody = response.body && isString(response.body) ? Buffer.from(response.body) : response.body || null;
  const responseHeaders = {};
  if (response.headers) {
    for (const header of Object.keys(response.headers)) {
      const value = response.headers[header];
      responseHeaders[header.toLowerCase()] = Array.isArray(value) ? value.map((item) => {
        return String(item);
      }) : String(value);
    }
  }
  if (response.contentType) {
    responseHeaders["content-type"] = response.contentType;
  }
  if (responseBody && !("content-length" in responseHeaders)) {
    responseHeaders["content-length"] = String(Buffer.byteLength(responseBody));
  }
  const status = response.status || 200;
  if (this._interceptionId === void 0) {
    throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.fulfillRequest");
  }
  await __classPrivateFieldGet7(this, _HTTPRequest_client, "f").send("Fetch.fulfillRequest", {
    requestId: this._interceptionId,
    responseCode: status,
    responsePhrase: STATUS_TEXTS[status],
    responseHeaders: headersArray(responseHeaders),
    body: responseBody ? responseBody.toString("base64") : void 0
  }).catch((error) => {
    __classPrivateFieldSet6(this, _HTTPRequest_interceptionHandled, false, "f");
    return handleError(error);
  });
}, _HTTPRequest_abort = async function _HTTPRequest_abort2(errorReason) {
  __classPrivateFieldSet6(this, _HTTPRequest_interceptionHandled, true, "f");
  if (this._interceptionId === void 0) {
    throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.failRequest");
  }
  await __classPrivateFieldGet7(this, _HTTPRequest_client, "f").send("Fetch.failRequest", {
    requestId: this._interceptionId,
    errorReason: errorReason || "Failed"
  }).catch(handleError);
};
var InterceptResolutionAction;
(function(InterceptResolutionAction2) {
  InterceptResolutionAction2["Abort"] = "abort";
  InterceptResolutionAction2["Respond"] = "respond";
  InterceptResolutionAction2["Continue"] = "continue";
  InterceptResolutionAction2["Disabled"] = "disabled";
  InterceptResolutionAction2["None"] = "none";
  InterceptResolutionAction2["AlreadyHandled"] = "already-handled";
})(InterceptResolutionAction || (InterceptResolutionAction = {}));
var errorReasons = {
  aborted: "Aborted",
  accessdenied: "AccessDenied",
  addressunreachable: "AddressUnreachable",
  blockedbyclient: "BlockedByClient",
  blockedbyresponse: "BlockedByResponse",
  connectionaborted: "ConnectionAborted",
  connectionclosed: "ConnectionClosed",
  connectionfailed: "ConnectionFailed",
  connectionrefused: "ConnectionRefused",
  connectionreset: "ConnectionReset",
  internetdisconnected: "InternetDisconnected",
  namenotresolved: "NameNotResolved",
  timedout: "TimedOut",
  failed: "Failed"
};
function headersArray(headers) {
  const result = [];
  for (const name in headers) {
    const value = headers[name];
    if (!Object.is(value, void 0)) {
      const values = Array.isArray(value) ? value : [value];
      result.push(...values.map((value2) => {
        return { name, value: value2 + "" };
      }));
    }
  }
  return result;
}
async function handleError(error) {
  if (["Invalid header"].includes(error.originalMessage)) {
    throw error;
  }
  debugError(error);
}
var STATUS_TEXTS = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "306": "Switch Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/HTTPResponse.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/SecurityDetails.js
init_cjs_shim();
var __classPrivateFieldSet7 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet8 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SecurityDetails_subjectName;
var _SecurityDetails_issuer;
var _SecurityDetails_validFrom;
var _SecurityDetails_validTo;
var _SecurityDetails_protocol;
var _SecurityDetails_sanList;
var SecurityDetails = class {
  /**
   * @internal
   */
  constructor(securityPayload) {
    _SecurityDetails_subjectName.set(this, void 0);
    _SecurityDetails_issuer.set(this, void 0);
    _SecurityDetails_validFrom.set(this, void 0);
    _SecurityDetails_validTo.set(this, void 0);
    _SecurityDetails_protocol.set(this, void 0);
    _SecurityDetails_sanList.set(this, void 0);
    __classPrivateFieldSet7(this, _SecurityDetails_subjectName, securityPayload.subjectName, "f");
    __classPrivateFieldSet7(this, _SecurityDetails_issuer, securityPayload.issuer, "f");
    __classPrivateFieldSet7(this, _SecurityDetails_validFrom, securityPayload.validFrom, "f");
    __classPrivateFieldSet7(this, _SecurityDetails_validTo, securityPayload.validTo, "f");
    __classPrivateFieldSet7(this, _SecurityDetails_protocol, securityPayload.protocol, "f");
    __classPrivateFieldSet7(this, _SecurityDetails_sanList, securityPayload.sanList, "f");
  }
  /**
   * @returns The name of the issuer of the certificate.
   */
  issuer() {
    return __classPrivateFieldGet8(this, _SecurityDetails_issuer, "f");
  }
  /**
   * @returns {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
   * marking the start of the certificate's validity.
   */
  validFrom() {
    return __classPrivateFieldGet8(this, _SecurityDetails_validFrom, "f");
  }
  /**
   * @returns {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
   * marking the end of the certificate's validity.
   */
  validTo() {
    return __classPrivateFieldGet8(this, _SecurityDetails_validTo, "f");
  }
  /**
   * @returns The security protocol being used, e.g. "TLS 1.2".
   */
  protocol() {
    return __classPrivateFieldGet8(this, _SecurityDetails_protocol, "f");
  }
  /**
   * @returns The name of the subject to which the certificate was issued.
   */
  subjectName() {
    return __classPrivateFieldGet8(this, _SecurityDetails_subjectName, "f");
  }
  /**
   * @returns The list of {@link https://en.wikipedia.org/wiki/Subject_Alternative_Name | subject alternative names (SANs)} of the certificate.
   */
  subjectAlternativeNames() {
    return __classPrivateFieldGet8(this, _SecurityDetails_sanList, "f");
  }
};
_SecurityDetails_subjectName = /* @__PURE__ */ new WeakMap(), _SecurityDetails_issuer = /* @__PURE__ */ new WeakMap(), _SecurityDetails_validFrom = /* @__PURE__ */ new WeakMap(), _SecurityDetails_validTo = /* @__PURE__ */ new WeakMap(), _SecurityDetails_protocol = /* @__PURE__ */ new WeakMap(), _SecurityDetails_sanList = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/HTTPResponse.js
var __classPrivateFieldSet8 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet9 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTTPResponse_instances;
var _HTTPResponse_client;
var _HTTPResponse_request;
var _HTTPResponse_contentPromise;
var _HTTPResponse_bodyLoadedPromise;
var _HTTPResponse_bodyLoadedPromiseFulfill;
var _HTTPResponse_remoteAddress;
var _HTTPResponse_status;
var _HTTPResponse_statusText;
var _HTTPResponse_url;
var _HTTPResponse_fromDiskCache;
var _HTTPResponse_fromServiceWorker;
var _HTTPResponse_headers;
var _HTTPResponse_securityDetails;
var _HTTPResponse_timing;
var _HTTPResponse_parseStatusTextFromExtrInfo;
var HTTPResponse = class {
  /**
   * @internal
   */
  constructor(client, request3, responsePayload, extraInfo) {
    _HTTPResponse_instances.add(this);
    _HTTPResponse_client.set(this, void 0);
    _HTTPResponse_request.set(this, void 0);
    _HTTPResponse_contentPromise.set(this, null);
    _HTTPResponse_bodyLoadedPromise.set(this, void 0);
    _HTTPResponse_bodyLoadedPromiseFulfill.set(this, () => {
    });
    _HTTPResponse_remoteAddress.set(this, void 0);
    _HTTPResponse_status.set(this, void 0);
    _HTTPResponse_statusText.set(this, void 0);
    _HTTPResponse_url.set(this, void 0);
    _HTTPResponse_fromDiskCache.set(this, void 0);
    _HTTPResponse_fromServiceWorker.set(this, void 0);
    _HTTPResponse_headers.set(this, {});
    _HTTPResponse_securityDetails.set(this, void 0);
    _HTTPResponse_timing.set(this, void 0);
    __classPrivateFieldSet8(this, _HTTPResponse_client, client, "f");
    __classPrivateFieldSet8(this, _HTTPResponse_request, request3, "f");
    __classPrivateFieldSet8(this, _HTTPResponse_bodyLoadedPromise, new Promise((fulfill) => {
      __classPrivateFieldSet8(this, _HTTPResponse_bodyLoadedPromiseFulfill, fulfill, "f");
    }), "f");
    __classPrivateFieldSet8(this, _HTTPResponse_remoteAddress, {
      ip: responsePayload.remoteIPAddress,
      port: responsePayload.remotePort
    }, "f");
    __classPrivateFieldSet8(this, _HTTPResponse_statusText, __classPrivateFieldGet9(this, _HTTPResponse_instances, "m", _HTTPResponse_parseStatusTextFromExtrInfo).call(this, extraInfo) || responsePayload.statusText, "f");
    __classPrivateFieldSet8(this, _HTTPResponse_url, request3.url(), "f");
    __classPrivateFieldSet8(this, _HTTPResponse_fromDiskCache, !!responsePayload.fromDiskCache, "f");
    __classPrivateFieldSet8(this, _HTTPResponse_fromServiceWorker, !!responsePayload.fromServiceWorker, "f");
    __classPrivateFieldSet8(this, _HTTPResponse_status, extraInfo ? extraInfo.statusCode : responsePayload.status, "f");
    const headers = extraInfo ? extraInfo.headers : responsePayload.headers;
    for (const [key, value] of Object.entries(headers)) {
      __classPrivateFieldGet9(this, _HTTPResponse_headers, "f")[key.toLowerCase()] = value;
    }
    __classPrivateFieldSet8(this, _HTTPResponse_securityDetails, responsePayload.securityDetails ? new SecurityDetails(responsePayload.securityDetails) : null, "f");
    __classPrivateFieldSet8(this, _HTTPResponse_timing, responsePayload.timing || null, "f");
  }
  /**
   * @internal
   */
  _resolveBody(err) {
    if (err) {
      return __classPrivateFieldGet9(this, _HTTPResponse_bodyLoadedPromiseFulfill, "f").call(this, err);
    }
    return __classPrivateFieldGet9(this, _HTTPResponse_bodyLoadedPromiseFulfill, "f").call(this);
  }
  /**
   * @returns The IP address and port number used to connect to the remote
   * server.
   */
  remoteAddress() {
    return __classPrivateFieldGet9(this, _HTTPResponse_remoteAddress, "f");
  }
  /**
   * @returns The URL of the response.
   */
  url() {
    return __classPrivateFieldGet9(this, _HTTPResponse_url, "f");
  }
  /**
   * @returns True if the response was successful (status in the range 200-299).
   */
  ok() {
    return __classPrivateFieldGet9(this, _HTTPResponse_status, "f") === 0 || __classPrivateFieldGet9(this, _HTTPResponse_status, "f") >= 200 && __classPrivateFieldGet9(this, _HTTPResponse_status, "f") <= 299;
  }
  /**
   * @returns The status code of the response (e.g., 200 for a success).
   */
  status() {
    return __classPrivateFieldGet9(this, _HTTPResponse_status, "f");
  }
  /**
   * @returns The status text of the response (e.g. usually an "OK" for a
   * success).
   */
  statusText() {
    return __classPrivateFieldGet9(this, _HTTPResponse_statusText, "f");
  }
  /**
   * @returns An object with HTTP headers associated with the response. All
   * header names are lower-case.
   */
  headers() {
    return __classPrivateFieldGet9(this, _HTTPResponse_headers, "f");
  }
  /**
   * @returns {@link SecurityDetails} if the response was received over the
   * secure connection, or `null` otherwise.
   */
  securityDetails() {
    return __classPrivateFieldGet9(this, _HTTPResponse_securityDetails, "f");
  }
  /**
   * @returns Timing information related to the response.
   */
  timing() {
    return __classPrivateFieldGet9(this, _HTTPResponse_timing, "f");
  }
  /**
   * @returns Promise which resolves to a buffer with response body.
   */
  buffer() {
    if (!__classPrivateFieldGet9(this, _HTTPResponse_contentPromise, "f")) {
      __classPrivateFieldSet8(this, _HTTPResponse_contentPromise, __classPrivateFieldGet9(this, _HTTPResponse_bodyLoadedPromise, "f").then(async (error) => {
        if (error) {
          throw error;
        }
        try {
          const response = await __classPrivateFieldGet9(this, _HTTPResponse_client, "f").send("Network.getResponseBody", {
            requestId: __classPrivateFieldGet9(this, _HTTPResponse_request, "f")._requestId
          });
          return Buffer.from(response.body, response.base64Encoded ? "base64" : "utf8");
        } catch (error2) {
          if (error2 instanceof ProtocolError && error2.originalMessage === "No resource with given identifier found") {
            throw new ProtocolError("Could not load body for this request. This might happen if the request is a preflight request.");
          }
          throw error2;
        }
      }), "f");
    }
    return __classPrivateFieldGet9(this, _HTTPResponse_contentPromise, "f");
  }
  /**
   * @returns Promise which resolves to a text representation of response body.
   */
  async text() {
    const content = await this.buffer();
    return content.toString("utf8");
  }
  /**
   *
   * @returns Promise which resolves to a JSON representation of response body.
   *
   * @remarks
   *
   * This method will throw if the response body is not parsable via
   * `JSON.parse`.
   */
  async json() {
    const content = await this.text();
    return JSON.parse(content);
  }
  /**
   * @returns A matching {@link HTTPRequest} object.
   */
  request() {
    return __classPrivateFieldGet9(this, _HTTPResponse_request, "f");
  }
  /**
   * @returns True if the response was served from either the browser's disk
   * cache or memory cache.
   */
  fromCache() {
    return __classPrivateFieldGet9(this, _HTTPResponse_fromDiskCache, "f") || __classPrivateFieldGet9(this, _HTTPResponse_request, "f")._fromMemoryCache;
  }
  /**
   * @returns True if the response was served by a service worker.
   */
  fromServiceWorker() {
    return __classPrivateFieldGet9(this, _HTTPResponse_fromServiceWorker, "f");
  }
  /**
   * @returns A {@link Frame} that initiated this response, or `null` if
   * navigating to error pages.
   */
  frame() {
    return __classPrivateFieldGet9(this, _HTTPResponse_request, "f").frame();
  }
};
_HTTPResponse_client = /* @__PURE__ */ new WeakMap(), _HTTPResponse_request = /* @__PURE__ */ new WeakMap(), _HTTPResponse_contentPromise = /* @__PURE__ */ new WeakMap(), _HTTPResponse_bodyLoadedPromise = /* @__PURE__ */ new WeakMap(), _HTTPResponse_bodyLoadedPromiseFulfill = /* @__PURE__ */ new WeakMap(), _HTTPResponse_remoteAddress = /* @__PURE__ */ new WeakMap(), _HTTPResponse_status = /* @__PURE__ */ new WeakMap(), _HTTPResponse_statusText = /* @__PURE__ */ new WeakMap(), _HTTPResponse_url = /* @__PURE__ */ new WeakMap(), _HTTPResponse_fromDiskCache = /* @__PURE__ */ new WeakMap(), _HTTPResponse_fromServiceWorker = /* @__PURE__ */ new WeakMap(), _HTTPResponse_headers = /* @__PURE__ */ new WeakMap(), _HTTPResponse_securityDetails = /* @__PURE__ */ new WeakMap(), _HTTPResponse_timing = /* @__PURE__ */ new WeakMap(), _HTTPResponse_instances = /* @__PURE__ */ new WeakSet(), _HTTPResponse_parseStatusTextFromExtrInfo = function _HTTPResponse_parseStatusTextFromExtrInfo2(extraInfo) {
  if (!extraInfo || !extraInfo.headersText) {
    return;
  }
  const firstLine = extraInfo.headersText.split("\r", 1)[0];
  if (!firstLine) {
    return;
  }
  const match = firstLine.match(/[^ ]* [^ ]* (.*)/);
  if (!match) {
    return;
  }
  const statusText = match[1];
  if (!statusText) {
    return;
  }
  return statusText;
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/NetworkEventManager.js
init_cjs_shim();
var __classPrivateFieldGet10 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NetworkEventManager_requestWillBeSentMap;
var _NetworkEventManager_requestPausedMap;
var _NetworkEventManager_httpRequestsMap;
var _NetworkEventManager_responseReceivedExtraInfoMap;
var _NetworkEventManager_queuedRedirectInfoMap;
var _NetworkEventManager_queuedEventGroupMap;
var NetworkEventManager = class {
  constructor() {
    _NetworkEventManager_requestWillBeSentMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_requestPausedMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_httpRequestsMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_responseReceivedExtraInfoMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_queuedRedirectInfoMap.set(this, /* @__PURE__ */ new Map());
    _NetworkEventManager_queuedEventGroupMap.set(this, /* @__PURE__ */ new Map());
  }
  forget(networkRequestId) {
    __classPrivateFieldGet10(this, _NetworkEventManager_requestWillBeSentMap, "f").delete(networkRequestId);
    __classPrivateFieldGet10(this, _NetworkEventManager_requestPausedMap, "f").delete(networkRequestId);
    __classPrivateFieldGet10(this, _NetworkEventManager_queuedEventGroupMap, "f").delete(networkRequestId);
    __classPrivateFieldGet10(this, _NetworkEventManager_queuedRedirectInfoMap, "f").delete(networkRequestId);
    __classPrivateFieldGet10(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").delete(networkRequestId);
  }
  responseExtraInfo(networkRequestId) {
    if (!__classPrivateFieldGet10(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").has(networkRequestId)) {
      __classPrivateFieldGet10(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").set(networkRequestId, []);
    }
    return __classPrivateFieldGet10(this, _NetworkEventManager_responseReceivedExtraInfoMap, "f").get(networkRequestId);
  }
  queuedRedirectInfo(fetchRequestId) {
    if (!__classPrivateFieldGet10(this, _NetworkEventManager_queuedRedirectInfoMap, "f").has(fetchRequestId)) {
      __classPrivateFieldGet10(this, _NetworkEventManager_queuedRedirectInfoMap, "f").set(fetchRequestId, []);
    }
    return __classPrivateFieldGet10(this, _NetworkEventManager_queuedRedirectInfoMap, "f").get(fetchRequestId);
  }
  queueRedirectInfo(fetchRequestId, redirectInfo) {
    this.queuedRedirectInfo(fetchRequestId).push(redirectInfo);
  }
  takeQueuedRedirectInfo(fetchRequestId) {
    return this.queuedRedirectInfo(fetchRequestId).shift();
  }
  numRequestsInProgress() {
    return [...__classPrivateFieldGet10(this, _NetworkEventManager_httpRequestsMap, "f")].filter(([, request3]) => {
      return !request3.response();
    }).length;
  }
  storeRequestWillBeSent(networkRequestId, event) {
    __classPrivateFieldGet10(this, _NetworkEventManager_requestWillBeSentMap, "f").set(networkRequestId, event);
  }
  getRequestWillBeSent(networkRequestId) {
    return __classPrivateFieldGet10(this, _NetworkEventManager_requestWillBeSentMap, "f").get(networkRequestId);
  }
  forgetRequestWillBeSent(networkRequestId) {
    __classPrivateFieldGet10(this, _NetworkEventManager_requestWillBeSentMap, "f").delete(networkRequestId);
  }
  getRequestPaused(networkRequestId) {
    return __classPrivateFieldGet10(this, _NetworkEventManager_requestPausedMap, "f").get(networkRequestId);
  }
  forgetRequestPaused(networkRequestId) {
    __classPrivateFieldGet10(this, _NetworkEventManager_requestPausedMap, "f").delete(networkRequestId);
  }
  storeRequestPaused(networkRequestId, event) {
    __classPrivateFieldGet10(this, _NetworkEventManager_requestPausedMap, "f").set(networkRequestId, event);
  }
  getRequest(networkRequestId) {
    return __classPrivateFieldGet10(this, _NetworkEventManager_httpRequestsMap, "f").get(networkRequestId);
  }
  storeRequest(networkRequestId, request3) {
    __classPrivateFieldGet10(this, _NetworkEventManager_httpRequestsMap, "f").set(networkRequestId, request3);
  }
  forgetRequest(networkRequestId) {
    __classPrivateFieldGet10(this, _NetworkEventManager_httpRequestsMap, "f").delete(networkRequestId);
  }
  getQueuedEventGroup(networkRequestId) {
    return __classPrivateFieldGet10(this, _NetworkEventManager_queuedEventGroupMap, "f").get(networkRequestId);
  }
  queueEventGroup(networkRequestId, event) {
    __classPrivateFieldGet10(this, _NetworkEventManager_queuedEventGroupMap, "f").set(networkRequestId, event);
  }
  forgetQueuedEventGroup(networkRequestId) {
    __classPrivateFieldGet10(this, _NetworkEventManager_queuedEventGroupMap, "f").delete(networkRequestId);
  }
};
_NetworkEventManager_requestWillBeSentMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_requestPausedMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_httpRequestsMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_responseReceivedExtraInfoMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_queuedRedirectInfoMap = /* @__PURE__ */ new WeakMap(), _NetworkEventManager_queuedEventGroupMap = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/util/DebuggableDeferredPromise.js
init_cjs_shim();
function createDebuggableDeferredPromise(message) {
  if (DEFERRED_PROMISE_DEBUG_TIMEOUT > 0) {
    return createDeferredPromise({
      message,
      timeout: DEFERRED_PROMISE_DEBUG_TIMEOUT
    });
  }
  return createDeferredPromise();
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/NetworkManager.js
var __classPrivateFieldSet9 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet11 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NetworkManager_instances;
var _NetworkManager_client;
var _NetworkManager_ignoreHTTPSErrors;
var _NetworkManager_frameManager;
var _NetworkManager_networkEventManager;
var _NetworkManager_extraHTTPHeaders;
var _NetworkManager_credentials;
var _NetworkManager_attemptedAuthentications;
var _NetworkManager_userRequestInterceptionEnabled;
var _NetworkManager_protocolRequestInterceptionEnabled;
var _NetworkManager_userCacheDisabled;
var _NetworkManager_emulatedNetworkConditions;
var _NetworkManager_deferredInitPromise;
var _NetworkManager_updateNetworkConditions;
var _NetworkManager_updateProtocolRequestInterception;
var _NetworkManager_cacheDisabled;
var _NetworkManager_updateProtocolCacheDisabled;
var _NetworkManager_onRequestWillBeSent;
var _NetworkManager_onAuthRequired;
var _NetworkManager_onRequestPaused;
var _NetworkManager_patchRequestEventHeaders;
var _NetworkManager_onRequest;
var _NetworkManager_onRequestServedFromCache;
var _NetworkManager_handleRequestRedirect;
var _NetworkManager_emitResponseEvent;
var _NetworkManager_onResponseReceived;
var _NetworkManager_onResponseReceivedExtraInfo;
var _NetworkManager_forgetRequest;
var _NetworkManager_onLoadingFinished;
var _NetworkManager_emitLoadingFinished;
var _NetworkManager_onLoadingFailed;
var _NetworkManager_emitLoadingFailed;
var NetworkManagerEmittedEvents = {
  Request: Symbol("NetworkManager.Request"),
  RequestServedFromCache: Symbol("NetworkManager.RequestServedFromCache"),
  Response: Symbol("NetworkManager.Response"),
  RequestFailed: Symbol("NetworkManager.RequestFailed"),
  RequestFinished: Symbol("NetworkManager.RequestFinished")
};
var NetworkManager = class extends EventEmitter {
  constructor(client, ignoreHTTPSErrors, frameManager) {
    super();
    _NetworkManager_instances.add(this);
    _NetworkManager_client.set(this, void 0);
    _NetworkManager_ignoreHTTPSErrors.set(this, void 0);
    _NetworkManager_frameManager.set(this, void 0);
    _NetworkManager_networkEventManager.set(this, new NetworkEventManager());
    _NetworkManager_extraHTTPHeaders.set(this, {});
    _NetworkManager_credentials.set(this, void 0);
    _NetworkManager_attemptedAuthentications.set(this, /* @__PURE__ */ new Set());
    _NetworkManager_userRequestInterceptionEnabled.set(this, false);
    _NetworkManager_protocolRequestInterceptionEnabled.set(this, false);
    _NetworkManager_userCacheDisabled.set(this, false);
    _NetworkManager_emulatedNetworkConditions.set(this, {
      offline: false,
      upload: -1,
      download: -1,
      latency: 0
    });
    _NetworkManager_deferredInitPromise.set(this, void 0);
    __classPrivateFieldSet9(this, _NetworkManager_client, client, "f");
    __classPrivateFieldSet9(this, _NetworkManager_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
    __classPrivateFieldSet9(this, _NetworkManager_frameManager, frameManager, "f");
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").on("Fetch.requestPaused", __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onRequestPaused).bind(this));
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").on("Fetch.authRequired", __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onAuthRequired).bind(this));
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").on("Network.requestWillBeSent", __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onRequestWillBeSent).bind(this));
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").on("Network.requestServedFromCache", __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onRequestServedFromCache).bind(this));
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").on("Network.responseReceived", __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onResponseReceived).bind(this));
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").on("Network.loadingFinished", __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onLoadingFinished).bind(this));
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").on("Network.loadingFailed", __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onLoadingFailed).bind(this));
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").on("Network.responseReceivedExtraInfo", __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onResponseReceivedExtraInfo).bind(this));
  }
  /**
   * Initialize calls should avoid async dependencies between CDP calls as those
   * might not resolve until after the target is resumed causing a deadlock.
   */
  initialize() {
    if (__classPrivateFieldGet11(this, _NetworkManager_deferredInitPromise, "f")) {
      return __classPrivateFieldGet11(this, _NetworkManager_deferredInitPromise, "f");
    }
    __classPrivateFieldSet9(this, _NetworkManager_deferredInitPromise, createDebuggableDeferredPromise("NetworkManager initialization timed out"), "f");
    const init = Promise.all([
      __classPrivateFieldGet11(this, _NetworkManager_ignoreHTTPSErrors, "f") ? __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Security.setIgnoreCertificateErrors", {
        ignore: true
      }) : null,
      __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Network.enable")
    ]);
    const deferredInitPromise = __classPrivateFieldGet11(this, _NetworkManager_deferredInitPromise, "f");
    init.then(() => {
      deferredInitPromise.resolve();
    }).catch((err) => {
      deferredInitPromise.reject(err);
    });
    return __classPrivateFieldGet11(this, _NetworkManager_deferredInitPromise, "f");
  }
  async authenticate(credentials) {
    __classPrivateFieldSet9(this, _NetworkManager_credentials, credentials, "f");
    await __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolRequestInterception).call(this);
  }
  async setExtraHTTPHeaders(extraHTTPHeaders) {
    __classPrivateFieldSet9(this, _NetworkManager_extraHTTPHeaders, {}, "f");
    for (const key of Object.keys(extraHTTPHeaders)) {
      const value = extraHTTPHeaders[key];
      assert(isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
      __classPrivateFieldGet11(this, _NetworkManager_extraHTTPHeaders, "f")[key.toLowerCase()] = value;
    }
    await __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Network.setExtraHTTPHeaders", {
      headers: __classPrivateFieldGet11(this, _NetworkManager_extraHTTPHeaders, "f")
    });
  }
  extraHTTPHeaders() {
    return Object.assign({}, __classPrivateFieldGet11(this, _NetworkManager_extraHTTPHeaders, "f"));
  }
  numRequestsInProgress() {
    return __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").numRequestsInProgress();
  }
  async setOfflineMode(value) {
    __classPrivateFieldGet11(this, _NetworkManager_emulatedNetworkConditions, "f").offline = value;
    await __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_updateNetworkConditions).call(this);
  }
  async emulateNetworkConditions(networkConditions) {
    __classPrivateFieldGet11(this, _NetworkManager_emulatedNetworkConditions, "f").upload = networkConditions ? networkConditions.upload : -1;
    __classPrivateFieldGet11(this, _NetworkManager_emulatedNetworkConditions, "f").download = networkConditions ? networkConditions.download : -1;
    __classPrivateFieldGet11(this, _NetworkManager_emulatedNetworkConditions, "f").latency = networkConditions ? networkConditions.latency : 0;
    await __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_updateNetworkConditions).call(this);
  }
  async setUserAgent(userAgent, userAgentMetadata) {
    await __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Network.setUserAgentOverride", {
      userAgent,
      userAgentMetadata
    });
  }
  async setCacheEnabled(enabled) {
    __classPrivateFieldSet9(this, _NetworkManager_userCacheDisabled, !enabled, "f");
    await __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this);
  }
  async setRequestInterception(value) {
    __classPrivateFieldSet9(this, _NetworkManager_userRequestInterceptionEnabled, value, "f");
    await __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolRequestInterception).call(this);
  }
};
_NetworkManager_client = /* @__PURE__ */ new WeakMap(), _NetworkManager_ignoreHTTPSErrors = /* @__PURE__ */ new WeakMap(), _NetworkManager_frameManager = /* @__PURE__ */ new WeakMap(), _NetworkManager_networkEventManager = /* @__PURE__ */ new WeakMap(), _NetworkManager_extraHTTPHeaders = /* @__PURE__ */ new WeakMap(), _NetworkManager_credentials = /* @__PURE__ */ new WeakMap(), _NetworkManager_attemptedAuthentications = /* @__PURE__ */ new WeakMap(), _NetworkManager_userRequestInterceptionEnabled = /* @__PURE__ */ new WeakMap(), _NetworkManager_protocolRequestInterceptionEnabled = /* @__PURE__ */ new WeakMap(), _NetworkManager_userCacheDisabled = /* @__PURE__ */ new WeakMap(), _NetworkManager_emulatedNetworkConditions = /* @__PURE__ */ new WeakMap(), _NetworkManager_deferredInitPromise = /* @__PURE__ */ new WeakMap(), _NetworkManager_instances = /* @__PURE__ */ new WeakSet(), _NetworkManager_updateNetworkConditions = async function _NetworkManager_updateNetworkConditions2() {
  await __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Network.emulateNetworkConditions", {
    offline: __classPrivateFieldGet11(this, _NetworkManager_emulatedNetworkConditions, "f").offline,
    latency: __classPrivateFieldGet11(this, _NetworkManager_emulatedNetworkConditions, "f").latency,
    uploadThroughput: __classPrivateFieldGet11(this, _NetworkManager_emulatedNetworkConditions, "f").upload,
    downloadThroughput: __classPrivateFieldGet11(this, _NetworkManager_emulatedNetworkConditions, "f").download
  });
}, _NetworkManager_updateProtocolRequestInterception = async function _NetworkManager_updateProtocolRequestInterception2() {
  const enabled = __classPrivateFieldGet11(this, _NetworkManager_userRequestInterceptionEnabled, "f") || !!__classPrivateFieldGet11(this, _NetworkManager_credentials, "f");
  if (enabled === __classPrivateFieldGet11(this, _NetworkManager_protocolRequestInterceptionEnabled, "f")) {
    return;
  }
  __classPrivateFieldSet9(this, _NetworkManager_protocolRequestInterceptionEnabled, enabled, "f");
  if (enabled) {
    await Promise.all([
      __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this),
      __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Fetch.enable", {
        handleAuthRequests: true,
        patterns: [{ urlPattern: "*" }]
      })
    ]);
  } else {
    await Promise.all([
      __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_updateProtocolCacheDisabled).call(this),
      __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Fetch.disable")
    ]);
  }
}, _NetworkManager_cacheDisabled = function _NetworkManager_cacheDisabled2() {
  return __classPrivateFieldGet11(this, _NetworkManager_userCacheDisabled, "f");
}, _NetworkManager_updateProtocolCacheDisabled = async function _NetworkManager_updateProtocolCacheDisabled2() {
  await __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Network.setCacheDisabled", {
    cacheDisabled: __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_cacheDisabled).call(this)
  });
}, _NetworkManager_onRequestWillBeSent = function _NetworkManager_onRequestWillBeSent2(event) {
  if (__classPrivateFieldGet11(this, _NetworkManager_userRequestInterceptionEnabled, "f") && !event.request.url.startsWith("data:")) {
    const { requestId: networkRequestId } = event;
    __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").storeRequestWillBeSent(networkRequestId, event);
    const requestPausedEvent = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getRequestPaused(networkRequestId);
    if (requestPausedEvent) {
      const { requestId: fetchRequestId } = requestPausedEvent;
      __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_patchRequestEventHeaders).call(this, event, requestPausedEvent);
      __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, event, fetchRequestId);
      __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").forgetRequestPaused(networkRequestId);
    }
    return;
  }
  __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, event, void 0);
}, _NetworkManager_onAuthRequired = function _NetworkManager_onAuthRequired2(event) {
  let response = "Default";
  if (__classPrivateFieldGet11(this, _NetworkManager_attemptedAuthentications, "f").has(event.requestId)) {
    response = "CancelAuth";
  } else if (__classPrivateFieldGet11(this, _NetworkManager_credentials, "f")) {
    response = "ProvideCredentials";
    __classPrivateFieldGet11(this, _NetworkManager_attemptedAuthentications, "f").add(event.requestId);
  }
  const { username, password } = __classPrivateFieldGet11(this, _NetworkManager_credentials, "f") || {
    username: void 0,
    password: void 0
  };
  __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Fetch.continueWithAuth", {
    requestId: event.requestId,
    authChallengeResponse: { response, username, password }
  }).catch(debugError);
}, _NetworkManager_onRequestPaused = function _NetworkManager_onRequestPaused2(event) {
  if (!__classPrivateFieldGet11(this, _NetworkManager_userRequestInterceptionEnabled, "f") && __classPrivateFieldGet11(this, _NetworkManager_protocolRequestInterceptionEnabled, "f")) {
    __classPrivateFieldGet11(this, _NetworkManager_client, "f").send("Fetch.continueRequest", {
      requestId: event.requestId
    }).catch(debugError);
  }
  const { networkId: networkRequestId, requestId: fetchRequestId } = event;
  if (!networkRequestId) {
    return;
  }
  const requestWillBeSentEvent = (() => {
    const requestWillBeSentEvent2 = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getRequestWillBeSent(networkRequestId);
    if (requestWillBeSentEvent2 && (requestWillBeSentEvent2.request.url !== event.request.url || requestWillBeSentEvent2.request.method !== event.request.method)) {
      __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").forgetRequestWillBeSent(networkRequestId);
      return;
    }
    return requestWillBeSentEvent2;
  })();
  if (requestWillBeSentEvent) {
    __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_patchRequestEventHeaders).call(this, requestWillBeSentEvent, event);
    __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, requestWillBeSentEvent, fetchRequestId);
  } else {
    __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").storeRequestPaused(networkRequestId, event);
  }
}, _NetworkManager_patchRequestEventHeaders = function _NetworkManager_patchRequestEventHeaders2(requestWillBeSentEvent, requestPausedEvent) {
  requestWillBeSentEvent.request.headers = {
    ...requestWillBeSentEvent.request.headers,
    // includes extra headers, like: Accept, Origin
    ...requestPausedEvent.request.headers
  };
}, _NetworkManager_onRequest = function _NetworkManager_onRequest2(event, fetchRequestId) {
  let redirectChain = [];
  if (event.redirectResponse) {
    let redirectResponseExtraInfo = null;
    if (event.redirectHasExtraInfo) {
      redirectResponseExtraInfo = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).shift();
      if (!redirectResponseExtraInfo) {
        __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").queueRedirectInfo(event.requestId, {
          event,
          fetchRequestId
        });
        return;
      }
    }
    const request4 = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
    if (request4) {
      __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_handleRequestRedirect).call(this, request4, event.redirectResponse, redirectResponseExtraInfo);
      redirectChain = request4._redirectChain;
    }
  }
  const frame = event.frameId ? __classPrivateFieldGet11(this, _NetworkManager_frameManager, "f").frame(event.frameId) : null;
  const request3 = new HTTPRequest(__classPrivateFieldGet11(this, _NetworkManager_client, "f"), frame, fetchRequestId, __classPrivateFieldGet11(this, _NetworkManager_userRequestInterceptionEnabled, "f"), event, redirectChain);
  __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").storeRequest(event.requestId, request3);
  this.emit(NetworkManagerEmittedEvents.Request, request3);
  request3.finalizeInterceptions();
}, _NetworkManager_onRequestServedFromCache = function _NetworkManager_onRequestServedFromCache2(event) {
  const request3 = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
  if (request3) {
    request3._fromMemoryCache = true;
  }
  this.emit(NetworkManagerEmittedEvents.RequestServedFromCache, request3);
}, _NetworkManager_handleRequestRedirect = function _NetworkManager_handleRequestRedirect2(request3, responsePayload, extraInfo) {
  const response = new HTTPResponse(__classPrivateFieldGet11(this, _NetworkManager_client, "f"), request3, responsePayload, extraInfo);
  request3._response = response;
  request3._redirectChain.push(request3);
  response._resolveBody(new Error("Response body is unavailable for redirect responses"));
  __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request3, false);
  this.emit(NetworkManagerEmittedEvents.Response, response);
  this.emit(NetworkManagerEmittedEvents.RequestFinished, request3);
}, _NetworkManager_emitResponseEvent = function _NetworkManager_emitResponseEvent2(responseReceived, extraInfo) {
  const request3 = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getRequest(responseReceived.requestId);
  if (!request3) {
    return;
  }
  const extraInfos = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(responseReceived.requestId);
  if (extraInfos.length) {
    debugError(new Error("Unexpected extraInfo events for request " + responseReceived.requestId));
  }
  const response = new HTTPResponse(__classPrivateFieldGet11(this, _NetworkManager_client, "f"), request3, responseReceived.response, extraInfo);
  request3._response = response;
  this.emit(NetworkManagerEmittedEvents.Response, response);
}, _NetworkManager_onResponseReceived = function _NetworkManager_onResponseReceived2(event) {
  const request3 = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
  let extraInfo = null;
  if (request3 && !request3._fromMemoryCache && event.hasExtraInfo) {
    extraInfo = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).shift();
    if (!extraInfo) {
      __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").queueEventGroup(event.requestId, {
        responseReceivedEvent: event
      });
      return;
    }
  }
  __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_emitResponseEvent).call(this, event, extraInfo);
}, _NetworkManager_onResponseReceivedExtraInfo = function _NetworkManager_onResponseReceivedExtraInfo2(event) {
  const redirectInfo = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").takeQueuedRedirectInfo(event.requestId);
  if (redirectInfo) {
    __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).push(event);
    __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_onRequest).call(this, redirectInfo.event, redirectInfo.fetchRequestId);
    return;
  }
  const queuedEvents = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
  if (queuedEvents) {
    __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").forgetQueuedEventGroup(event.requestId);
    __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_emitResponseEvent).call(this, queuedEvents.responseReceivedEvent, event);
    if (queuedEvents.loadingFinishedEvent) {
      __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFinished).call(this, queuedEvents.loadingFinishedEvent);
    }
    if (queuedEvents.loadingFailedEvent) {
      __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFailed).call(this, queuedEvents.loadingFailedEvent);
    }
    return;
  }
  __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").responseExtraInfo(event.requestId).push(event);
}, _NetworkManager_forgetRequest = function _NetworkManager_forgetRequest2(request3, events) {
  const requestId = request3._requestId;
  const interceptionId = request3._interceptionId;
  __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").forgetRequest(requestId);
  interceptionId !== void 0 && __classPrivateFieldGet11(this, _NetworkManager_attemptedAuthentications, "f").delete(interceptionId);
  if (events) {
    __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").forget(requestId);
  }
}, _NetworkManager_onLoadingFinished = function _NetworkManager_onLoadingFinished2(event) {
  const queuedEvents = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
  if (queuedEvents) {
    queuedEvents.loadingFinishedEvent = event;
  } else {
    __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFinished).call(this, event);
  }
}, _NetworkManager_emitLoadingFinished = function _NetworkManager_emitLoadingFinished2(event) {
  var _a2;
  const request3 = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
  if (!request3) {
    return;
  }
  if (request3.response()) {
    (_a2 = request3.response()) === null || _a2 === void 0 ? void 0 : _a2._resolveBody(null);
  }
  __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request3, true);
  this.emit(NetworkManagerEmittedEvents.RequestFinished, request3);
}, _NetworkManager_onLoadingFailed = function _NetworkManager_onLoadingFailed2(event) {
  const queuedEvents = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getQueuedEventGroup(event.requestId);
  if (queuedEvents) {
    queuedEvents.loadingFailedEvent = event;
  } else {
    __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_emitLoadingFailed).call(this, event);
  }
}, _NetworkManager_emitLoadingFailed = function _NetworkManager_emitLoadingFailed2(event) {
  const request3 = __classPrivateFieldGet11(this, _NetworkManager_networkEventManager, "f").getRequest(event.requestId);
  if (!request3) {
    return;
  }
  request3._failureText = event.errorText;
  const response = request3.response();
  if (response) {
    response._resolveBody(null);
  }
  __classPrivateFieldGet11(this, _NetworkManager_instances, "m", _NetworkManager_forgetRequest).call(this, request3, true);
  this.emit(NetworkManagerEmittedEvents.RequestFailed, request3);
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/FrameManager.js
var __classPrivateFieldSet10 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet12 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FrameManager_instances;
var _FrameManager_page;
var _FrameManager_networkManager;
var _FrameManager_timeoutSettings;
var _FrameManager_contextIdToContext;
var _FrameManager_isolatedWorlds;
var _FrameManager_client;
var _FrameManager_onLifecycleEvent;
var _FrameManager_onFrameStartedLoading;
var _FrameManager_onFrameStoppedLoading;
var _FrameManager_handleFrameTree;
var _FrameManager_onFrameAttached;
var _FrameManager_onFrameNavigated;
var _FrameManager_createIsolatedWorld;
var _FrameManager_onFrameNavigatedWithinDocument;
var _FrameManager_onFrameDetached;
var _FrameManager_onExecutionContextCreated;
var _FrameManager_onExecutionContextDestroyed;
var _FrameManager_onExecutionContextsCleared;
var _FrameManager_removeFramesRecursively;
var UTILITY_WORLD_NAME = "__puppeteer_utility_world__";
var FrameManagerEmittedEvents = {
  FrameAttached: Symbol("FrameManager.FrameAttached"),
  FrameNavigated: Symbol("FrameManager.FrameNavigated"),
  FrameDetached: Symbol("FrameManager.FrameDetached"),
  FrameSwapped: Symbol("FrameManager.FrameSwapped"),
  LifecycleEvent: Symbol("FrameManager.LifecycleEvent"),
  FrameNavigatedWithinDocument: Symbol("FrameManager.FrameNavigatedWithinDocument"),
  ExecutionContextCreated: Symbol("FrameManager.ExecutionContextCreated"),
  ExecutionContextDestroyed: Symbol("FrameManager.ExecutionContextDestroyed")
};
var FrameManager = class extends EventEmitter {
  constructor(client, page, ignoreHTTPSErrors, timeoutSettings) {
    super();
    _FrameManager_instances.add(this);
    _FrameManager_page.set(this, void 0);
    _FrameManager_networkManager.set(this, void 0);
    _FrameManager_timeoutSettings.set(this, void 0);
    _FrameManager_contextIdToContext.set(this, /* @__PURE__ */ new Map());
    _FrameManager_isolatedWorlds.set(this, /* @__PURE__ */ new Set());
    _FrameManager_client.set(this, void 0);
    this._frameTree = new FrameTree();
    __classPrivateFieldSet10(this, _FrameManager_client, client, "f");
    __classPrivateFieldSet10(this, _FrameManager_page, page, "f");
    __classPrivateFieldSet10(this, _FrameManager_networkManager, new NetworkManager(client, ignoreHTTPSErrors, this), "f");
    __classPrivateFieldSet10(this, _FrameManager_timeoutSettings, timeoutSettings, "f");
    this.setupEventListeners(__classPrivateFieldGet12(this, _FrameManager_client, "f"));
  }
  get timeoutSettings() {
    return __classPrivateFieldGet12(this, _FrameManager_timeoutSettings, "f");
  }
  get networkManager() {
    return __classPrivateFieldGet12(this, _FrameManager_networkManager, "f");
  }
  get client() {
    return __classPrivateFieldGet12(this, _FrameManager_client, "f");
  }
  setupEventListeners(session) {
    session.on("Page.frameAttached", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onFrameAttached).call(this, session, event.frameId, event.parentFrameId);
    });
    session.on("Page.frameNavigated", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigated).call(this, event.frame);
    });
    session.on("Page.navigatedWithinDocument", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigatedWithinDocument).call(this, event.frameId, event.url);
    });
    session.on("Page.frameDetached", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onFrameDetached).call(this, event.frameId, event.reason);
    });
    session.on("Page.frameStartedLoading", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onFrameStartedLoading).call(this, event.frameId);
    });
    session.on("Page.frameStoppedLoading", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onFrameStoppedLoading).call(this, event.frameId);
    });
    session.on("Runtime.executionContextCreated", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextCreated).call(this, event.context, session);
    });
    session.on("Runtime.executionContextDestroyed", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextDestroyed).call(this, event.executionContextId, session);
    });
    session.on("Runtime.executionContextsCleared", () => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onExecutionContextsCleared).call(this, session);
    });
    session.on("Page.lifecycleEvent", (event) => {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onLifecycleEvent).call(this, event);
    });
  }
  async initialize(client = __classPrivateFieldGet12(this, _FrameManager_client, "f")) {
    try {
      const result = await Promise.all([
        client.send("Page.enable"),
        client.send("Page.getFrameTree")
      ]);
      const { frameTree } = result[1];
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_handleFrameTree).call(this, client, frameTree);
      await Promise.all([
        client.send("Page.setLifecycleEventsEnabled", { enabled: true }),
        client.send("Runtime.enable").then(() => {
          return __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_createIsolatedWorld).call(this, client, UTILITY_WORLD_NAME);
        }),
        // TODO: Network manager is not aware of OOP iframes yet.
        client === __classPrivateFieldGet12(this, _FrameManager_client, "f") ? __classPrivateFieldGet12(this, _FrameManager_networkManager, "f").initialize() : Promise.resolve()
      ]);
    } catch (error) {
      if (isErrorLike(error) && isTargetClosedError(error)) {
        return;
      }
      throw error;
    }
  }
  executionContextById(contextId, session = __classPrivateFieldGet12(this, _FrameManager_client, "f")) {
    const key = `${session.id()}:${contextId}`;
    const context = __classPrivateFieldGet12(this, _FrameManager_contextIdToContext, "f").get(key);
    assert(context, "INTERNAL ERROR: missing context with id = " + contextId);
    return context;
  }
  page() {
    return __classPrivateFieldGet12(this, _FrameManager_page, "f");
  }
  mainFrame() {
    const mainFrame = this._frameTree.getMainFrame();
    assert(mainFrame, "Requesting main frame too early!");
    return mainFrame;
  }
  frames() {
    return Array.from(this._frameTree.frames());
  }
  frame(frameId) {
    return this._frameTree.getById(frameId) || null;
  }
  onAttachedToTarget(target) {
    if (target._getTargetInfo().type !== "iframe") {
      return;
    }
    const frame = this.frame(target._getTargetInfo().targetId);
    if (frame) {
      frame.updateClient(target._session());
    }
    this.setupEventListeners(target._session());
    this.initialize(target._session());
  }
  onDetachedFromTarget(target) {
    const frame = this.frame(target._targetId);
    if (frame && frame.isOOPFrame()) {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, frame);
    }
  }
};
_FrameManager_page = /* @__PURE__ */ new WeakMap(), _FrameManager_networkManager = /* @__PURE__ */ new WeakMap(), _FrameManager_timeoutSettings = /* @__PURE__ */ new WeakMap(), _FrameManager_contextIdToContext = /* @__PURE__ */ new WeakMap(), _FrameManager_isolatedWorlds = /* @__PURE__ */ new WeakMap(), _FrameManager_client = /* @__PURE__ */ new WeakMap(), _FrameManager_instances = /* @__PURE__ */ new WeakSet(), _FrameManager_onLifecycleEvent = function _FrameManager_onLifecycleEvent2(event) {
  const frame = this.frame(event.frameId);
  if (!frame) {
    return;
  }
  frame._onLifecycleEvent(event.loaderId, event.name);
  this.emit(FrameManagerEmittedEvents.LifecycleEvent, frame);
}, _FrameManager_onFrameStartedLoading = function _FrameManager_onFrameStartedLoading2(frameId) {
  const frame = this.frame(frameId);
  if (!frame) {
    return;
  }
  frame._onLoadingStarted();
}, _FrameManager_onFrameStoppedLoading = function _FrameManager_onFrameStoppedLoading2(frameId) {
  const frame = this.frame(frameId);
  if (!frame) {
    return;
  }
  frame._onLoadingStopped();
  this.emit(FrameManagerEmittedEvents.LifecycleEvent, frame);
}, _FrameManager_handleFrameTree = function _FrameManager_handleFrameTree2(session, frameTree) {
  if (frameTree.frame.parentId) {
    __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onFrameAttached).call(this, session, frameTree.frame.id, frameTree.frame.parentId);
  }
  __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_onFrameNavigated).call(this, frameTree.frame);
  if (!frameTree.childFrames) {
    return;
  }
  for (const child of frameTree.childFrames) {
    __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_handleFrameTree2).call(this, session, child);
  }
}, _FrameManager_onFrameAttached = function _FrameManager_onFrameAttached2(session, frameId, parentFrameId) {
  let frame = this.frame(frameId);
  if (frame) {
    if (session && frame.isOOPFrame()) {
      frame.updateClient(session);
    }
    return;
  }
  frame = new Frame(this, frameId, parentFrameId, session);
  this._frameTree.addFrame(frame);
  this.emit(FrameManagerEmittedEvents.FrameAttached, frame);
}, _FrameManager_onFrameNavigated = async function _FrameManager_onFrameNavigated2(framePayload) {
  const frameId = framePayload.id;
  const isMainFrame = !framePayload.parentId;
  let frame = this._frameTree.getById(frameId);
  if (frame) {
    for (const child of frame.childFrames()) {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, child);
    }
  }
  if (isMainFrame) {
    if (frame) {
      this._frameTree.removeFrame(frame);
      frame._id = frameId;
    } else {
      frame = new Frame(this, frameId, void 0, __classPrivateFieldGet12(this, _FrameManager_client, "f"));
    }
    this._frameTree.addFrame(frame);
  }
  frame = await this._frameTree.waitForFrame(frameId);
  frame._navigated(framePayload);
  this.emit(FrameManagerEmittedEvents.FrameNavigated, frame);
}, _FrameManager_createIsolatedWorld = async function _FrameManager_createIsolatedWorld2(session, name) {
  const key = `${session.id()}:${name}`;
  if (__classPrivateFieldGet12(this, _FrameManager_isolatedWorlds, "f").has(key)) {
    return;
  }
  await session.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `//# sourceURL=${EVALUATION_SCRIPT_URL}`,
    worldName: name
  });
  await Promise.all(this.frames().filter((frame) => {
    return frame._client() === session;
  }).map((frame) => {
    return session.send("Page.createIsolatedWorld", {
      frameId: frame._id,
      worldName: name,
      grantUniveralAccess: true
    }).catch(debugError);
  }));
  __classPrivateFieldGet12(this, _FrameManager_isolatedWorlds, "f").add(key);
}, _FrameManager_onFrameNavigatedWithinDocument = function _FrameManager_onFrameNavigatedWithinDocument2(frameId, url) {
  const frame = this.frame(frameId);
  if (!frame) {
    return;
  }
  frame._navigatedWithinDocument(url);
  this.emit(FrameManagerEmittedEvents.FrameNavigatedWithinDocument, frame);
  this.emit(FrameManagerEmittedEvents.FrameNavigated, frame);
}, _FrameManager_onFrameDetached = function _FrameManager_onFrameDetached2(frameId, reason) {
  const frame = this.frame(frameId);
  if (reason === "remove") {
    if (frame) {
      __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively).call(this, frame);
    }
  } else if (reason === "swap") {
    this.emit(FrameManagerEmittedEvents.FrameSwapped, frame);
  }
}, _FrameManager_onExecutionContextCreated = function _FrameManager_onExecutionContextCreated2(contextPayload, session) {
  const auxData = contextPayload.auxData;
  const frameId = auxData && auxData.frameId;
  const frame = typeof frameId === "string" ? this.frame(frameId) : void 0;
  let world;
  if (frame) {
    if (frame._client() !== session) {
      return;
    }
    if (contextPayload.auxData && !!contextPayload.auxData["isDefault"]) {
      world = frame.worlds[MAIN_WORLD];
    } else if (contextPayload.name === UTILITY_WORLD_NAME && !frame.worlds[PUPPETEER_WORLD].hasContext()) {
      world = frame.worlds[PUPPETEER_WORLD];
    }
  }
  const context = new ExecutionContext((frame === null || frame === void 0 ? void 0 : frame._client()) || __classPrivateFieldGet12(this, _FrameManager_client, "f"), contextPayload, world);
  if (world) {
    world.setContext(context);
  }
  const key = `${session.id()}:${contextPayload.id}`;
  __classPrivateFieldGet12(this, _FrameManager_contextIdToContext, "f").set(key, context);
}, _FrameManager_onExecutionContextDestroyed = function _FrameManager_onExecutionContextDestroyed2(executionContextId, session) {
  const key = `${session.id()}:${executionContextId}`;
  const context = __classPrivateFieldGet12(this, _FrameManager_contextIdToContext, "f").get(key);
  if (!context) {
    return;
  }
  __classPrivateFieldGet12(this, _FrameManager_contextIdToContext, "f").delete(key);
  if (context._world) {
    context._world.clearContext();
  }
}, _FrameManager_onExecutionContextsCleared = function _FrameManager_onExecutionContextsCleared2(session) {
  for (const [key, context] of __classPrivateFieldGet12(this, _FrameManager_contextIdToContext, "f").entries()) {
    if (context._client !== session) {
      continue;
    }
    if (context._world) {
      context._world.clearContext();
    }
    __classPrivateFieldGet12(this, _FrameManager_contextIdToContext, "f").delete(key);
  }
}, _FrameManager_removeFramesRecursively = function _FrameManager_removeFramesRecursively2(frame) {
  for (const child of frame.childFrames()) {
    __classPrivateFieldGet12(this, _FrameManager_instances, "m", _FrameManager_removeFramesRecursively2).call(this, child);
  }
  frame._detach();
  this._frameTree.removeFrame(frame);
  this.emit(FrameManagerEmittedEvents.FrameDetached, frame);
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/LifecycleWatcher.js
var __classPrivateFieldSet11 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet13 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LifecycleWatcher_instances;
var _LifecycleWatcher_expectedLifecycle;
var _LifecycleWatcher_frameManager;
var _LifecycleWatcher_frame;
var _LifecycleWatcher_timeout;
var _LifecycleWatcher_navigationRequest;
var _LifecycleWatcher_eventListeners;
var _LifecycleWatcher_initialLoaderId;
var _LifecycleWatcher_sameDocumentNavigationCompleteCallback;
var _LifecycleWatcher_sameDocumentNavigationPromise;
var _LifecycleWatcher_lifecycleCallback;
var _LifecycleWatcher_lifecyclePromise;
var _LifecycleWatcher_newDocumentNavigationCompleteCallback;
var _LifecycleWatcher_newDocumentNavigationPromise;
var _LifecycleWatcher_terminationCallback;
var _LifecycleWatcher_terminationPromise;
var _LifecycleWatcher_timeoutPromise;
var _LifecycleWatcher_maximumTimer;
var _LifecycleWatcher_hasSameDocumentNavigation;
var _LifecycleWatcher_swapped;
var _LifecycleWatcher_navigationResponseReceived;
var _LifecycleWatcher_onRequest;
var _LifecycleWatcher_onRequestFailed;
var _LifecycleWatcher_onResponse;
var _LifecycleWatcher_onFrameDetached;
var _LifecycleWatcher_terminate;
var _LifecycleWatcher_createTimeoutPromise;
var _LifecycleWatcher_navigatedWithinDocument;
var _LifecycleWatcher_navigated;
var _LifecycleWatcher_frameSwapped;
var _LifecycleWatcher_checkLifecycleComplete;
var puppeteerToProtocolLifecycle = /* @__PURE__ */ new Map([
  ["load", "load"],
  ["domcontentloaded", "DOMContentLoaded"],
  ["networkidle0", "networkIdle"],
  ["networkidle2", "networkAlmostIdle"]
]);
var noop = () => {
};
var LifecycleWatcher = class {
  constructor(frameManager, frame, waitUntil, timeout) {
    _LifecycleWatcher_instances.add(this);
    _LifecycleWatcher_expectedLifecycle.set(this, void 0);
    _LifecycleWatcher_frameManager.set(this, void 0);
    _LifecycleWatcher_frame.set(this, void 0);
    _LifecycleWatcher_timeout.set(this, void 0);
    _LifecycleWatcher_navigationRequest.set(this, null);
    _LifecycleWatcher_eventListeners.set(this, void 0);
    _LifecycleWatcher_initialLoaderId.set(this, void 0);
    _LifecycleWatcher_sameDocumentNavigationCompleteCallback.set(this, noop);
    _LifecycleWatcher_sameDocumentNavigationPromise.set(this, new Promise((fulfill) => {
      __classPrivateFieldSet11(this, _LifecycleWatcher_sameDocumentNavigationCompleteCallback, fulfill, "f");
    }));
    _LifecycleWatcher_lifecycleCallback.set(this, noop);
    _LifecycleWatcher_lifecyclePromise.set(this, new Promise((fulfill) => {
      __classPrivateFieldSet11(this, _LifecycleWatcher_lifecycleCallback, fulfill, "f");
    }));
    _LifecycleWatcher_newDocumentNavigationCompleteCallback.set(this, noop);
    _LifecycleWatcher_newDocumentNavigationPromise.set(this, new Promise((fulfill) => {
      __classPrivateFieldSet11(this, _LifecycleWatcher_newDocumentNavigationCompleteCallback, fulfill, "f");
    }));
    _LifecycleWatcher_terminationCallback.set(this, noop);
    _LifecycleWatcher_terminationPromise.set(this, new Promise((fulfill) => {
      __classPrivateFieldSet11(this, _LifecycleWatcher_terminationCallback, fulfill, "f");
    }));
    _LifecycleWatcher_timeoutPromise.set(this, void 0);
    _LifecycleWatcher_maximumTimer.set(this, void 0);
    _LifecycleWatcher_hasSameDocumentNavigation.set(this, void 0);
    _LifecycleWatcher_swapped.set(this, void 0);
    _LifecycleWatcher_navigationResponseReceived.set(this, void 0);
    if (Array.isArray(waitUntil)) {
      waitUntil = waitUntil.slice();
    } else if (typeof waitUntil === "string") {
      waitUntil = [waitUntil];
    }
    __classPrivateFieldSet11(this, _LifecycleWatcher_initialLoaderId, frame._loaderId, "f");
    __classPrivateFieldSet11(this, _LifecycleWatcher_expectedLifecycle, waitUntil.map((value) => {
      const protocolEvent = puppeteerToProtocolLifecycle.get(value);
      assert(protocolEvent, "Unknown value for options.waitUntil: " + value);
      return protocolEvent;
    }), "f");
    __classPrivateFieldSet11(this, _LifecycleWatcher_frameManager, frameManager, "f");
    __classPrivateFieldSet11(this, _LifecycleWatcher_frame, frame, "f");
    __classPrivateFieldSet11(this, _LifecycleWatcher_timeout, timeout, "f");
    __classPrivateFieldSet11(this, _LifecycleWatcher_eventListeners, [
      addEventListener(frameManager.client, CDPSessionEmittedEvents.Disconnected, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_terminate).bind(this, new Error("Navigation failed because browser has disconnected!"))),
      addEventListener(__classPrivateFieldGet13(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.LifecycleEvent, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).bind(this)),
      addEventListener(__classPrivateFieldGet13(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigatedWithinDocument, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_navigatedWithinDocument).bind(this)),
      addEventListener(__classPrivateFieldGet13(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigated, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_navigated).bind(this)),
      addEventListener(__classPrivateFieldGet13(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameSwapped, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_frameSwapped).bind(this)),
      addEventListener(__classPrivateFieldGet13(this, _LifecycleWatcher_frameManager, "f"), FrameManagerEmittedEvents.FrameDetached, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onFrameDetached).bind(this)),
      addEventListener(__classPrivateFieldGet13(this, _LifecycleWatcher_frameManager, "f").networkManager, NetworkManagerEmittedEvents.Request, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onRequest).bind(this)),
      addEventListener(__classPrivateFieldGet13(this, _LifecycleWatcher_frameManager, "f").networkManager, NetworkManagerEmittedEvents.Response, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onResponse).bind(this)),
      addEventListener(__classPrivateFieldGet13(this, _LifecycleWatcher_frameManager, "f").networkManager, NetworkManagerEmittedEvents.RequestFailed, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_onRequestFailed).bind(this))
    ], "f");
    __classPrivateFieldSet11(this, _LifecycleWatcher_timeoutPromise, __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_createTimeoutPromise).call(this), "f");
    __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
  }
  async navigationResponse() {
    var _a2;
    await ((_a2 = __classPrivateFieldGet13(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _a2 === void 0 ? void 0 : _a2.catch(() => {
    }));
    return __classPrivateFieldGet13(this, _LifecycleWatcher_navigationRequest, "f") ? __classPrivateFieldGet13(this, _LifecycleWatcher_navigationRequest, "f").response() : null;
  }
  sameDocumentNavigationPromise() {
    return __classPrivateFieldGet13(this, _LifecycleWatcher_sameDocumentNavigationPromise, "f");
  }
  newDocumentNavigationPromise() {
    return __classPrivateFieldGet13(this, _LifecycleWatcher_newDocumentNavigationPromise, "f");
  }
  lifecyclePromise() {
    return __classPrivateFieldGet13(this, _LifecycleWatcher_lifecyclePromise, "f");
  }
  timeoutOrTerminationPromise() {
    return Promise.race([__classPrivateFieldGet13(this, _LifecycleWatcher_timeoutPromise, "f"), __classPrivateFieldGet13(this, _LifecycleWatcher_terminationPromise, "f")]);
  }
  dispose() {
    removeEventListeners(__classPrivateFieldGet13(this, _LifecycleWatcher_eventListeners, "f"));
    __classPrivateFieldGet13(this, _LifecycleWatcher_maximumTimer, "f") !== void 0 && clearTimeout(__classPrivateFieldGet13(this, _LifecycleWatcher_maximumTimer, "f"));
  }
};
_LifecycleWatcher_expectedLifecycle = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_frameManager = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_frame = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_timeout = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_navigationRequest = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_eventListeners = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_initialLoaderId = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_sameDocumentNavigationCompleteCallback = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_sameDocumentNavigationPromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_lifecycleCallback = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_lifecyclePromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_newDocumentNavigationCompleteCallback = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_newDocumentNavigationPromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_terminationCallback = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_terminationPromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_timeoutPromise = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_maximumTimer = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_hasSameDocumentNavigation = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_swapped = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_navigationResponseReceived = /* @__PURE__ */ new WeakMap(), _LifecycleWatcher_instances = /* @__PURE__ */ new WeakSet(), _LifecycleWatcher_onRequest = function _LifecycleWatcher_onRequest2(request3) {
  var _a2, _b;
  if (request3.frame() !== __classPrivateFieldGet13(this, _LifecycleWatcher_frame, "f") || !request3.isNavigationRequest()) {
    return;
  }
  __classPrivateFieldSet11(this, _LifecycleWatcher_navigationRequest, request3, "f");
  (_a2 = __classPrivateFieldGet13(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _a2 === void 0 ? void 0 : _a2.resolve();
  __classPrivateFieldSet11(this, _LifecycleWatcher_navigationResponseReceived, createDeferredPromise(), "f");
  if (request3.response() !== null) {
    (_b = __classPrivateFieldGet13(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _b === void 0 ? void 0 : _b.resolve();
  }
}, _LifecycleWatcher_onRequestFailed = function _LifecycleWatcher_onRequestFailed2(request3) {
  var _a2, _b;
  if (((_a2 = __classPrivateFieldGet13(this, _LifecycleWatcher_navigationRequest, "f")) === null || _a2 === void 0 ? void 0 : _a2._requestId) !== request3._requestId) {
    return;
  }
  (_b = __classPrivateFieldGet13(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _b === void 0 ? void 0 : _b.resolve();
}, _LifecycleWatcher_onResponse = function _LifecycleWatcher_onResponse2(response) {
  var _a2, _b;
  if (((_a2 = __classPrivateFieldGet13(this, _LifecycleWatcher_navigationRequest, "f")) === null || _a2 === void 0 ? void 0 : _a2._requestId) !== response.request()._requestId) {
    return;
  }
  (_b = __classPrivateFieldGet13(this, _LifecycleWatcher_navigationResponseReceived, "f")) === null || _b === void 0 ? void 0 : _b.resolve();
}, _LifecycleWatcher_onFrameDetached = function _LifecycleWatcher_onFrameDetached2(frame) {
  if (__classPrivateFieldGet13(this, _LifecycleWatcher_frame, "f") === frame) {
    __classPrivateFieldGet13(this, _LifecycleWatcher_terminationCallback, "f").call(null, new Error("Navigating frame was detached"));
    return;
  }
  __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_terminate = function _LifecycleWatcher_terminate2(error) {
  __classPrivateFieldGet13(this, _LifecycleWatcher_terminationCallback, "f").call(null, error);
}, _LifecycleWatcher_createTimeoutPromise = async function _LifecycleWatcher_createTimeoutPromise2() {
  if (!__classPrivateFieldGet13(this, _LifecycleWatcher_timeout, "f")) {
    return new Promise(noop);
  }
  const errorMessage = "Navigation timeout of " + __classPrivateFieldGet13(this, _LifecycleWatcher_timeout, "f") + " ms exceeded";
  await new Promise((fulfill) => {
    return __classPrivateFieldSet11(this, _LifecycleWatcher_maximumTimer, setTimeout(fulfill, __classPrivateFieldGet13(this, _LifecycleWatcher_timeout, "f")), "f");
  });
  return new TimeoutError(errorMessage);
}, _LifecycleWatcher_navigatedWithinDocument = function _LifecycleWatcher_navigatedWithinDocument2(frame) {
  if (frame !== __classPrivateFieldGet13(this, _LifecycleWatcher_frame, "f")) {
    return;
  }
  __classPrivateFieldSet11(this, _LifecycleWatcher_hasSameDocumentNavigation, true, "f");
  __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_navigated = function _LifecycleWatcher_navigated2(frame) {
  if (frame !== __classPrivateFieldGet13(this, _LifecycleWatcher_frame, "f")) {
    return;
  }
  __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_frameSwapped = function _LifecycleWatcher_frameSwapped2(frame) {
  if (frame !== __classPrivateFieldGet13(this, _LifecycleWatcher_frame, "f")) {
    return;
  }
  __classPrivateFieldSet11(this, _LifecycleWatcher_swapped, true, "f");
  __classPrivateFieldGet13(this, _LifecycleWatcher_instances, "m", _LifecycleWatcher_checkLifecycleComplete).call(this);
}, _LifecycleWatcher_checkLifecycleComplete = function _LifecycleWatcher_checkLifecycleComplete2() {
  if (!checkLifecycle(__classPrivateFieldGet13(this, _LifecycleWatcher_frame, "f"), __classPrivateFieldGet13(this, _LifecycleWatcher_expectedLifecycle, "f"))) {
    return;
  }
  __classPrivateFieldGet13(this, _LifecycleWatcher_lifecycleCallback, "f").call(this);
  if (__classPrivateFieldGet13(this, _LifecycleWatcher_hasSameDocumentNavigation, "f")) {
    __classPrivateFieldGet13(this, _LifecycleWatcher_sameDocumentNavigationCompleteCallback, "f").call(this);
  }
  if (__classPrivateFieldGet13(this, _LifecycleWatcher_swapped, "f") || __classPrivateFieldGet13(this, _LifecycleWatcher_frame, "f")._loaderId !== __classPrivateFieldGet13(this, _LifecycleWatcher_initialLoaderId, "f")) {
    __classPrivateFieldGet13(this, _LifecycleWatcher_newDocumentNavigationCompleteCallback, "f").call(this);
  }
  function checkLifecycle(frame, expectedLifecycle) {
    for (const event of expectedLifecycle) {
      if (!frame._lifecycleEvents.has(event)) {
        return false;
      }
    }
    for (const child of frame.childFrames()) {
      if (child._hasStartedLoading && !checkLifecycle(child, expectedLifecycle)) {
        return false;
      }
    }
    return true;
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/WaitTask.js
init_cjs_shim();
var __classPrivateFieldSet12 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet14 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WaitTask_world;
var _WaitTask_bindings;
var _WaitTask_polling;
var _WaitTask_root;
var _WaitTask_fn;
var _WaitTask_args;
var _WaitTask_timeout;
var _WaitTask_result;
var _WaitTask_poller;
var _TaskManager_tasks;
var WaitTask = class {
  constructor(world, options, fn, ...args) {
    var _a2;
    _WaitTask_world.set(this, void 0);
    _WaitTask_bindings.set(this, void 0);
    _WaitTask_polling.set(this, void 0);
    _WaitTask_root.set(this, void 0);
    _WaitTask_fn.set(this, void 0);
    _WaitTask_args.set(this, void 0);
    _WaitTask_timeout.set(this, void 0);
    _WaitTask_result.set(this, createDeferredPromise());
    _WaitTask_poller.set(this, void 0);
    __classPrivateFieldSet12(this, _WaitTask_world, world, "f");
    __classPrivateFieldSet12(this, _WaitTask_bindings, (_a2 = options.bindings) !== null && _a2 !== void 0 ? _a2 : /* @__PURE__ */ new Map(), "f");
    __classPrivateFieldSet12(this, _WaitTask_polling, options.polling, "f");
    __classPrivateFieldSet12(this, _WaitTask_root, options.root, "f");
    switch (typeof fn) {
      case "string":
        __classPrivateFieldSet12(this, _WaitTask_fn, `() => {return (${fn});}`, "f");
        break;
      default:
        __classPrivateFieldSet12(this, _WaitTask_fn, fn.toString(), "f");
        break;
    }
    __classPrivateFieldSet12(this, _WaitTask_args, args, "f");
    __classPrivateFieldGet14(this, _WaitTask_world, "f").taskManager.add(this);
    if (options.timeout) {
      __classPrivateFieldSet12(this, _WaitTask_timeout, setTimeout(() => {
        this.terminate(new TimeoutError(`Waiting failed: ${options.timeout}ms exceeded`));
      }, options.timeout), "f");
    }
    if (__classPrivateFieldGet14(this, _WaitTask_bindings, "f").size !== 0) {
      for (const [name, fn2] of __classPrivateFieldGet14(this, _WaitTask_bindings, "f")) {
        __classPrivateFieldGet14(this, _WaitTask_world, "f")._boundFunctions.set(name, fn2);
      }
    }
    this.rerun();
  }
  get result() {
    return __classPrivateFieldGet14(this, _WaitTask_result, "f");
  }
  async rerun() {
    try {
      if (__classPrivateFieldGet14(this, _WaitTask_bindings, "f").size !== 0) {
        const context = await __classPrivateFieldGet14(this, _WaitTask_world, "f").executionContext();
        await Promise.all([...__classPrivateFieldGet14(this, _WaitTask_bindings, "f")].map(async ([name]) => {
          return await __classPrivateFieldGet14(this, _WaitTask_world, "f")._addBindingToContext(context, name);
        }));
      }
      switch (__classPrivateFieldGet14(this, _WaitTask_polling, "f")) {
        case "raf":
          __classPrivateFieldSet12(this, _WaitTask_poller, await __classPrivateFieldGet14(this, _WaitTask_world, "f").evaluateHandle(({ RAFPoller, createFunction }, fn, ...args) => {
            const fun = createFunction(fn);
            return new RAFPoller(() => {
              return fun(...args);
            });
          }, await __classPrivateFieldGet14(this, _WaitTask_world, "f").puppeteerUtil, __classPrivateFieldGet14(this, _WaitTask_fn, "f"), ...__classPrivateFieldGet14(this, _WaitTask_args, "f")), "f");
          break;
        case "mutation":
          __classPrivateFieldSet12(this, _WaitTask_poller, await __classPrivateFieldGet14(this, _WaitTask_world, "f").evaluateHandle(({ MutationPoller, createFunction }, root, fn, ...args) => {
            const fun = createFunction(fn);
            return new MutationPoller(() => {
              return fun(...args);
            }, root || document);
          }, await __classPrivateFieldGet14(this, _WaitTask_world, "f").puppeteerUtil, __classPrivateFieldGet14(this, _WaitTask_root, "f"), __classPrivateFieldGet14(this, _WaitTask_fn, "f"), ...__classPrivateFieldGet14(this, _WaitTask_args, "f")), "f");
          break;
        default:
          __classPrivateFieldSet12(this, _WaitTask_poller, await __classPrivateFieldGet14(this, _WaitTask_world, "f").evaluateHandle(({ IntervalPoller, createFunction }, ms, fn, ...args) => {
            const fun = createFunction(fn);
            return new IntervalPoller(() => {
              return fun(...args);
            }, ms);
          }, await __classPrivateFieldGet14(this, _WaitTask_world, "f").puppeteerUtil, __classPrivateFieldGet14(this, _WaitTask_polling, "f"), __classPrivateFieldGet14(this, _WaitTask_fn, "f"), ...__classPrivateFieldGet14(this, _WaitTask_args, "f")), "f");
          break;
      }
      await __classPrivateFieldGet14(this, _WaitTask_poller, "f").evaluate((poller) => {
        poller.start();
      });
      const result = await __classPrivateFieldGet14(this, _WaitTask_poller, "f").evaluateHandle((poller) => {
        return poller.result();
      });
      __classPrivateFieldGet14(this, _WaitTask_result, "f").resolve(result);
      await this.terminate();
    } catch (error) {
      const badError = this.getBadError(error);
      if (badError) {
        await this.terminate(badError);
      }
    }
  }
  async terminate(error) {
    __classPrivateFieldGet14(this, _WaitTask_world, "f").taskManager.delete(this);
    if (__classPrivateFieldGet14(this, _WaitTask_timeout, "f")) {
      clearTimeout(__classPrivateFieldGet14(this, _WaitTask_timeout, "f"));
    }
    if (error && !__classPrivateFieldGet14(this, _WaitTask_result, "f").finished()) {
      __classPrivateFieldGet14(this, _WaitTask_result, "f").reject(error);
    }
    if (__classPrivateFieldGet14(this, _WaitTask_poller, "f")) {
      try {
        await __classPrivateFieldGet14(this, _WaitTask_poller, "f").evaluateHandle(async (poller) => {
          await poller.stop();
        });
        if (__classPrivateFieldGet14(this, _WaitTask_poller, "f")) {
          await __classPrivateFieldGet14(this, _WaitTask_poller, "f").dispose();
          __classPrivateFieldSet12(this, _WaitTask_poller, void 0, "f");
        }
      } catch {
      }
    }
  }
  /**
   * Not all errors lead to termination. They usually imply we need to rerun the task.
   */
  getBadError(error) {
    if (error instanceof Error) {
      if (error.message.includes("Execution context is not available in detached frame")) {
        return new Error("Waiting failed: Frame detached");
      }
      if (error.message.includes("Execution context was destroyed")) {
        return;
      }
      if (error.message.includes("Cannot find context with specified id")) {
        return;
      }
    }
    return error;
  }
};
_WaitTask_world = /* @__PURE__ */ new WeakMap(), _WaitTask_bindings = /* @__PURE__ */ new WeakMap(), _WaitTask_polling = /* @__PURE__ */ new WeakMap(), _WaitTask_root = /* @__PURE__ */ new WeakMap(), _WaitTask_fn = /* @__PURE__ */ new WeakMap(), _WaitTask_args = /* @__PURE__ */ new WeakMap(), _WaitTask_timeout = /* @__PURE__ */ new WeakMap(), _WaitTask_result = /* @__PURE__ */ new WeakMap(), _WaitTask_poller = /* @__PURE__ */ new WeakMap();
var TaskManager = class {
  constructor() {
    _TaskManager_tasks.set(this, /* @__PURE__ */ new Set());
  }
  add(task) {
    __classPrivateFieldGet14(this, _TaskManager_tasks, "f").add(task);
  }
  delete(task) {
    __classPrivateFieldGet14(this, _TaskManager_tasks, "f").delete(task);
  }
  terminateAll(error) {
    for (const task of __classPrivateFieldGet14(this, _TaskManager_tasks, "f")) {
      task.terminate(error);
    }
    __classPrivateFieldGet14(this, _TaskManager_tasks, "f").clear();
  }
  async rerunAll() {
    await Promise.all([...__classPrivateFieldGet14(this, _TaskManager_tasks, "f")].map((task) => {
      return task.rerun();
    }));
  }
};
_TaskManager_tasks = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/IsolatedWorld.js
var __classPrivateFieldSet13 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet15 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IsolatedWorld_instances;
var _a;
var _IsolatedWorld_frame;
var _IsolatedWorld_document;
var _IsolatedWorld_context;
var _IsolatedWorld_detached;
var _IsolatedWorld_ctxBindings;
var _IsolatedWorld_boundFunctions;
var _IsolatedWorld_taskManager;
var _IsolatedWorld_puppeteerUtil;
var _IsolatedWorld_bindingIdentifier;
var _IsolatedWorld_client_get;
var _IsolatedWorld_frameManager_get;
var _IsolatedWorld_timeoutSettings_get;
var _IsolatedWorld_injectPuppeteerUtil;
var _IsolatedWorld_settingUpBinding;
var _IsolatedWorld_onBindingCalled;
var MAIN_WORLD = Symbol("mainWorld");
var PUPPETEER_WORLD = Symbol("puppeteerWorld");
var IsolatedWorld = class {
  constructor(frame) {
    _IsolatedWorld_instances.add(this);
    _IsolatedWorld_frame.set(this, void 0);
    _IsolatedWorld_document.set(this, void 0);
    _IsolatedWorld_context.set(this, createDeferredPromise());
    _IsolatedWorld_detached.set(this, false);
    _IsolatedWorld_ctxBindings.set(this, /* @__PURE__ */ new Set());
    _IsolatedWorld_boundFunctions.set(this, /* @__PURE__ */ new Map());
    _IsolatedWorld_taskManager.set(this, new TaskManager());
    _IsolatedWorld_puppeteerUtil.set(this, createDeferredPromise());
    _IsolatedWorld_settingUpBinding.set(this, null);
    _IsolatedWorld_onBindingCalled.set(this, async (event) => {
      let payload;
      if (!this.hasContext()) {
        return;
      }
      const context = await this.executionContext();
      try {
        payload = JSON.parse(event.payload);
      } catch {
        return;
      }
      const { type, name, seq, args } = payload;
      if (type !== "internal" || !__classPrivateFieldGet15(this, _IsolatedWorld_ctxBindings, "f").has(__classPrivateFieldGet15(IsolatedWorld, _a, "f", _IsolatedWorld_bindingIdentifier).call(IsolatedWorld, name, context._contextId))) {
        return;
      }
      if (context._contextId !== event.executionContextId) {
        return;
      }
      try {
        const fn = this._boundFunctions.get(name);
        if (!fn) {
          throw new Error(`Bound function $name is not found`);
        }
        const result = await fn(...args);
        await context.evaluate((name2, seq2, result2) => {
          const callbacks = self[name2].callbacks;
          callbacks.get(seq2).resolve(result2);
          callbacks.delete(seq2);
        }, name, seq, result);
      } catch (error) {
        if (error.message.includes("Protocol error")) {
          return;
        }
        debugError(error);
      }
    });
    __classPrivateFieldSet13(this, _IsolatedWorld_frame, frame, "f");
    __classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_client_get).on("Runtime.bindingCalled", __classPrivateFieldGet15(this, _IsolatedWorld_onBindingCalled, "f"));
  }
  get puppeteerUtil() {
    return __classPrivateFieldGet15(this, _IsolatedWorld_puppeteerUtil, "f");
  }
  get taskManager() {
    return __classPrivateFieldGet15(this, _IsolatedWorld_taskManager, "f");
  }
  get _boundFunctions() {
    return __classPrivateFieldGet15(this, _IsolatedWorld_boundFunctions, "f");
  }
  frame() {
    return __classPrivateFieldGet15(this, _IsolatedWorld_frame, "f");
  }
  clearContext() {
    __classPrivateFieldSet13(this, _IsolatedWorld_document, void 0, "f");
    __classPrivateFieldSet13(this, _IsolatedWorld_puppeteerUtil, createDeferredPromise(), "f");
    __classPrivateFieldSet13(this, _IsolatedWorld_context, createDeferredPromise(), "f");
  }
  setContext(context) {
    __classPrivateFieldGet15(this, _IsolatedWorld_instances, "m", _IsolatedWorld_injectPuppeteerUtil).call(this, context);
    __classPrivateFieldGet15(this, _IsolatedWorld_ctxBindings, "f").clear();
    __classPrivateFieldGet15(this, _IsolatedWorld_context, "f").resolve(context);
  }
  hasContext() {
    return __classPrivateFieldGet15(this, _IsolatedWorld_context, "f").resolved();
  }
  _detach() {
    __classPrivateFieldSet13(this, _IsolatedWorld_detached, true, "f");
    __classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_client_get).off("Runtime.bindingCalled", __classPrivateFieldGet15(this, _IsolatedWorld_onBindingCalled, "f"));
    __classPrivateFieldGet15(this, _IsolatedWorld_taskManager, "f").terminateAll(new Error("waitForFunction failed: frame got detached."));
  }
  executionContext() {
    if (__classPrivateFieldGet15(this, _IsolatedWorld_detached, "f")) {
      throw new Error(`Execution context is not available in detached frame "${__classPrivateFieldGet15(this, _IsolatedWorld_frame, "f").url()}" (are you trying to evaluate?)`);
    }
    if (__classPrivateFieldGet15(this, _IsolatedWorld_context, "f") === null) {
      throw new Error(`Execution content promise is missing`);
    }
    return __classPrivateFieldGet15(this, _IsolatedWorld_context, "f");
  }
  async evaluateHandle(pageFunction, ...args) {
    const context = await this.executionContext();
    return context.evaluateHandle(pageFunction, ...args);
  }
  async evaluate(pageFunction, ...args) {
    const context = await this.executionContext();
    return context.evaluate(pageFunction, ...args);
  }
  async $(selector) {
    const document2 = await this.document();
    return document2.$(selector);
  }
  async $$(selector) {
    const document2 = await this.document();
    return document2.$$(selector);
  }
  async document() {
    if (__classPrivateFieldGet15(this, _IsolatedWorld_document, "f")) {
      return __classPrivateFieldGet15(this, _IsolatedWorld_document, "f");
    }
    const context = await this.executionContext();
    __classPrivateFieldSet13(this, _IsolatedWorld_document, await context.evaluateHandle(() => {
      return document;
    }), "f");
    return __classPrivateFieldGet15(this, _IsolatedWorld_document, "f");
  }
  async $x(expression) {
    const document2 = await this.document();
    return document2.$x(expression);
  }
  async $eval(selector, pageFunction, ...args) {
    const document2 = await this.document();
    return document2.$eval(selector, pageFunction, ...args);
  }
  async $$eval(selector, pageFunction, ...args) {
    const document2 = await this.document();
    return document2.$$eval(selector, pageFunction, ...args);
  }
  async content() {
    return await this.evaluate(() => {
      let retVal = "";
      if (document.doctype) {
        retVal = new XMLSerializer().serializeToString(document.doctype);
      }
      if (document.documentElement) {
        retVal += document.documentElement.outerHTML;
      }
      return retVal;
    });
  }
  async setContent(html, options = {}) {
    const { waitUntil = ["load"], timeout = __classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_timeoutSettings_get).navigationTimeout() } = options;
    await this.evaluate((html2) => {
      document.open();
      document.write(html2);
      document.close();
    }, html);
    const watcher = new LifecycleWatcher(__classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_frameManager_get), __classPrivateFieldGet15(this, _IsolatedWorld_frame, "f"), waitUntil, timeout);
    const error = await Promise.race([
      watcher.timeoutOrTerminationPromise(),
      watcher.lifecyclePromise()
    ]);
    watcher.dispose();
    if (error) {
      throw error;
    }
  }
  async click(selector, options) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.click(options);
    await handle.dispose();
  }
  async focus(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.focus();
    await handle.dispose();
  }
  async hover(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.hover();
    await handle.dispose();
  }
  async select(selector, ...values) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    const result = await handle.select(...values);
    await handle.dispose();
    return result;
  }
  async tap(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.tap();
    await handle.dispose();
  }
  async type(selector, text, options) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.type(text, options);
    await handle.dispose();
  }
  async _addBindingToContext(context, name) {
    if (__classPrivateFieldGet15(this, _IsolatedWorld_ctxBindings, "f").has(__classPrivateFieldGet15(IsolatedWorld, _a, "f", _IsolatedWorld_bindingIdentifier).call(IsolatedWorld, name, context._contextId))) {
      return;
    }
    if (__classPrivateFieldGet15(this, _IsolatedWorld_settingUpBinding, "f")) {
      await __classPrivateFieldGet15(this, _IsolatedWorld_settingUpBinding, "f");
      return this._addBindingToContext(context, name);
    }
    const bind = async (name2) => {
      const expression = pageBindingInitString("internal", name2);
      try {
        await context._client.send("Runtime.addBinding", {
          name: name2,
          executionContextName: context._contextName
        });
        await context.evaluate(expression);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("Execution context was destroyed")) {
            return;
          }
          if (error.message.includes("Cannot find context with specified id")) {
            return;
          }
        }
        debugError(error);
        return;
      }
      __classPrivateFieldGet15(this, _IsolatedWorld_ctxBindings, "f").add(__classPrivateFieldGet15(IsolatedWorld, _a, "f", _IsolatedWorld_bindingIdentifier).call(IsolatedWorld, name2, context._contextId));
    };
    __classPrivateFieldSet13(this, _IsolatedWorld_settingUpBinding, bind(name), "f");
    await __classPrivateFieldGet15(this, _IsolatedWorld_settingUpBinding, "f");
    __classPrivateFieldSet13(this, _IsolatedWorld_settingUpBinding, null, "f");
  }
  async _waitForSelectorInPage(queryOne2, root, selector, options, bindings = /* @__PURE__ */ new Map()) {
    const { visible: waitForVisible = false, hidden: waitForHidden = false, timeout = __classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_timeoutSettings_get).timeout() } = options;
    try {
      const handle = await this.waitForFunction(async (PuppeteerUtil, query, selector2, root2, visible) => {
        if (!PuppeteerUtil) {
          return;
        }
        const node = await PuppeteerUtil.createFunction(query)(root2 || document, selector2, PuppeteerUtil);
        return PuppeteerUtil.checkVisibility(node, visible);
      }, {
        bindings,
        polling: waitForVisible || waitForHidden ? "raf" : "mutation",
        root,
        timeout
      }, new LazyArg(async () => {
        try {
          return await this.puppeteerUtil;
        } catch {
          return void 0;
        }
      }), queryOne2.toString(), selector, root, waitForVisible ? true : waitForHidden ? false : void 0);
      const elementHandle = handle.asElement();
      if (!elementHandle) {
        await handle.dispose();
        return null;
      }
      return elementHandle;
    } catch (error) {
      if (!isErrorLike(error)) {
        throw error;
      }
      error.message = `Waiting for selector \`${selector}\` failed: ${error.message}`;
      throw error;
    }
  }
  waitForFunction(pageFunction, options = {}, ...args) {
    const { polling = "raf", timeout = __classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_timeoutSettings_get).timeout(), bindings, root } = options;
    if (typeof polling === "number" && polling < 0) {
      throw new Error("Cannot poll with non-positive interval");
    }
    const waitTask = new WaitTask(this, {
      bindings,
      polling,
      root,
      timeout
    }, pageFunction, ...args);
    return waitTask.result;
  }
  async title() {
    return this.evaluate(() => {
      return document.title;
    });
  }
  async adoptBackendNode(backendNodeId) {
    const executionContext = await this.executionContext();
    const { object } = await __classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_client_get).send("DOM.resolveNode", {
      backendNodeId,
      executionContextId: executionContext._contextId
    });
    return createJSHandle(executionContext, object);
  }
  async adoptHandle(handle) {
    const executionContext = await this.executionContext();
    assert(handle.executionContext() !== executionContext, "Cannot adopt handle that already belongs to this execution context");
    const nodeInfo = await __classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_client_get).send("DOM.describeNode", {
      objectId: handle.remoteObject().objectId
    });
    return await this.adoptBackendNode(nodeInfo.node.backendNodeId);
  }
  async transferHandle(handle) {
    const result = await this.adoptHandle(handle);
    await handle.dispose();
    return result;
  }
};
_a = IsolatedWorld, _IsolatedWorld_frame = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_document = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_context = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_detached = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_ctxBindings = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_boundFunctions = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_taskManager = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_puppeteerUtil = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_settingUpBinding = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_onBindingCalled = /* @__PURE__ */ new WeakMap(), _IsolatedWorld_instances = /* @__PURE__ */ new WeakSet(), _IsolatedWorld_client_get = function _IsolatedWorld_client_get2() {
  return __classPrivateFieldGet15(this, _IsolatedWorld_frame, "f")._client();
}, _IsolatedWorld_frameManager_get = function _IsolatedWorld_frameManager_get2() {
  return __classPrivateFieldGet15(this, _IsolatedWorld_frame, "f")._frameManager;
}, _IsolatedWorld_timeoutSettings_get = function _IsolatedWorld_timeoutSettings_get2() {
  return __classPrivateFieldGet15(this, _IsolatedWorld_instances, "a", _IsolatedWorld_frameManager_get).timeoutSettings;
}, _IsolatedWorld_injectPuppeteerUtil = async function _IsolatedWorld_injectPuppeteerUtil2(context) {
  try {
    __classPrivateFieldGet15(this, _IsolatedWorld_puppeteerUtil, "f").resolve(await context.evaluateHandle(`(() => {
              const module = {};
              ${source}
              return module.exports.default;
            })()`));
    __classPrivateFieldGet15(this, _IsolatedWorld_taskManager, "f").rerunAll();
  } catch (error) {
    debugError(error);
  }
};
_IsolatedWorld_bindingIdentifier = { value: (name, contextId) => {
  return `${name}_${contextId}`;
} };

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Frame.js
var __classPrivateFieldSet14 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet16 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Frame_url;
var _Frame_detached;
var _Frame_client;
var Frame = class {
  /**
   * @internal
   */
  constructor(frameManager, frameId, parentFrameId, client) {
    _Frame_url.set(this, "");
    _Frame_detached.set(this, false);
    _Frame_client.set(this, void 0);
    this._loaderId = "";
    this._hasStartedLoading = false;
    this._lifecycleEvents = /* @__PURE__ */ new Set();
    this._frameManager = frameManager;
    __classPrivateFieldSet14(this, _Frame_url, "", "f");
    this._id = frameId;
    this._parentId = parentFrameId;
    __classPrivateFieldSet14(this, _Frame_detached, false, "f");
    this._loaderId = "";
    this.updateClient(client);
  }
  /**
   * @internal
   */
  updateClient(client) {
    __classPrivateFieldSet14(this, _Frame_client, client, "f");
    this.worlds = {
      [MAIN_WORLD]: new IsolatedWorld(this),
      [PUPPETEER_WORLD]: new IsolatedWorld(this)
    };
  }
  /**
   * @returns The page associated with the frame.
   */
  page() {
    return this._frameManager.page();
  }
  /**
   * @returns `true` if the frame is an out-of-process (OOP) frame. Otherwise,
   * `false`.
   */
  isOOPFrame() {
    return __classPrivateFieldGet16(this, _Frame_client, "f") !== this._frameManager.client;
  }
  /**
   * Navigates a frame to the given url.
   *
   * @remarks
   * Navigation to `about:blank` or navigation to the same URL with a different
   * hash will succeed and return `null`.
   *
   * :::warning
   *
   * Headless mode doesn't support navigation to a PDF document. See the {@link
   * https://bugs.chromium.org/p/chromium/issues/detail?id=761295 | upstream
   * issue}.
   *
   * :::
   *
   * @param url - the URL to navigate the frame to. This should include the
   * scheme, e.g. `https://`.
   * @param options - navigation options. `waitUntil` is useful to define when
   * the navigation should be considered successful - see the docs for
   * {@link PuppeteerLifeCycleEvent} for more details.
   *
   * @returns A promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect.
   * @throws This method will throw an error if:
   *
   * - there's an SSL error (e.g. in case of self-signed certificates).
   * - target URL is invalid.
   * - the `timeout` is exceeded during navigation.
   * - the remote server does not respond or is unreachable.
   * - the main resource failed to load.
   *
   * This method will not throw an error when any valid HTTP status code is
   * returned by the remote server, including 404 "Not Found" and 500 "Internal
   * Server Error". The status code for such responses can be retrieved by
   * calling {@link HTTPResponse.status}.
   */
  async goto(url, options = {}) {
    const { referer = this._frameManager.networkManager.extraHTTPHeaders()["referer"], waitUntil = ["load"], timeout = this._frameManager.timeoutSettings.navigationTimeout() } = options;
    let ensureNewDocumentNavigation = false;
    const watcher = new LifecycleWatcher(this._frameManager, this, waitUntil, timeout);
    let error = await Promise.race([
      navigate(__classPrivateFieldGet16(this, _Frame_client, "f"), url, referer, this._id),
      watcher.timeoutOrTerminationPromise()
    ]);
    if (!error) {
      error = await Promise.race([
        watcher.timeoutOrTerminationPromise(),
        ensureNewDocumentNavigation ? watcher.newDocumentNavigationPromise() : watcher.sameDocumentNavigationPromise()
      ]);
    }
    try {
      if (error) {
        throw error;
      }
      return await watcher.navigationResponse();
    } finally {
      watcher.dispose();
    }
    async function navigate(client, url2, referrer, frameId) {
      try {
        const response = await client.send("Page.navigate", {
          url: url2,
          referrer,
          frameId
        });
        ensureNewDocumentNavigation = !!response.loaderId;
        return response.errorText ? new Error(`${response.errorText} at ${url2}`) : null;
      } catch (error2) {
        if (isErrorLike(error2)) {
          return error2;
        }
        throw error2;
      }
    }
  }
  /**
   * Waits for the frame to navigate. It is useful for when you run code which
   * will indirectly cause the frame to navigate.
   *
   * Usage of the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API | History API}
   * to change the URL is considered a navigation.
   *
   * @example
   *
   * ```ts
   * const [response] = await Promise.all([
   *   // The navigation promise resolves after navigation has finished
   *   frame.waitForNavigation(),
   *   // Clicking the link will indirectly cause a navigation
   *   frame.click('a.my-link'),
   * ]);
   * ```
   *
   * @param options - options to configure when the navigation is consided
   * finished.
   * @returns a promise that resolves when the frame navigates to a new URL.
   */
  async waitForNavigation(options = {}) {
    const { waitUntil = ["load"], timeout = this._frameManager.timeoutSettings.navigationTimeout() } = options;
    const watcher = new LifecycleWatcher(this._frameManager, this, waitUntil, timeout);
    const error = await Promise.race([
      watcher.timeoutOrTerminationPromise(),
      watcher.sameDocumentNavigationPromise(),
      watcher.newDocumentNavigationPromise()
    ]);
    try {
      if (error) {
        throw error;
      }
      return await watcher.navigationResponse();
    } finally {
      watcher.dispose();
    }
  }
  /**
   * @internal
   */
  _client() {
    return __classPrivateFieldGet16(this, _Frame_client, "f");
  }
  /**
   * @internal
   */
  executionContext() {
    return this.worlds[MAIN_WORLD].executionContext();
  }
  /**
   * Behaves identically to {@link Page.evaluateHandle} except it's run within
   * the context of this frame.
   *
   * @see {@link Page.evaluateHandle} for details.
   */
  async evaluateHandle(pageFunction, ...args) {
    return this.worlds[MAIN_WORLD].evaluateHandle(pageFunction, ...args);
  }
  /**
   * Behaves identically to {@link Page.evaluate} except it's run within the
   * the context of this frame.
   *
   * @see {@link Page.evaluate} for details.
   */
  async evaluate(pageFunction, ...args) {
    return this.worlds[MAIN_WORLD].evaluate(pageFunction, ...args);
  }
  /**
   * Queries the frame for an element matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns A {@link ElementHandle | element handle} to the first element
   * matching the given selector. Otherwise, `null`.
   */
  async $(selector) {
    return this.worlds[MAIN_WORLD].$(selector);
  }
  /**
   * Queries the frame for all elements matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns An array of {@link ElementHandle | element handles} that point to
   * elements matching the given selector.
   */
  async $$(selector) {
    return this.worlds[MAIN_WORLD].$$(selector);
  }
  /**
   * Runs the given function on the first element matching the given selector in
   * the frame.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   *
   * ```ts
   * const searchValue = await frame.$eval('#search', el => el.value);
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in the frame's context.
   * The first element matching the selector will be passed to the function as
   * its first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $eval(selector, pageFunction, ...args) {
    return this.worlds[MAIN_WORLD].$eval(selector, pageFunction, ...args);
  }
  /**
   * Runs the given function on an array of elements matching the given selector
   * in the frame.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   *
   * ```js
   * const divsCounts = await frame.$$eval('div', divs => divs.length);
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in the frame's context.
   * An array of elements matching the given selector will be passed to the
   * function as its first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $$eval(selector, pageFunction, ...args) {
    return this.worlds[MAIN_WORLD].$$eval(selector, pageFunction, ...args);
  }
  /**
   * @deprecated Use {@link Frame.$$} with the `xpath` prefix.
   *
   * Example: `await frame.$$('xpath/' + xpathExpression)`
   *
   * This method evaluates the given XPath expression and returns the results.
   * If `xpath` starts with `//` instead of `.//`, the dot will be appended
   * automatically.
   * @param expression - the XPath expression to evaluate.
   */
  async $x(expression) {
    return this.worlds[MAIN_WORLD].$x(expression);
  }
  /**
   * Waits for an element matching the given selector to appear in the frame.
   *
   * This method works across navigations.
   *
   * @example
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .mainFrame()
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - The selector to query and wait for.
   * @param options - Options for customizing waiting behavior.
   * @returns An element matching the given selector.
   * @throws Throws if an element matching the given selector doesn't appear.
   */
  async waitForSelector(selector, options = {}) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.waitFor, "Query handler does not support waiting");
    return await queryHandler.waitFor(this, updatedSelector, options);
  }
  /**
   * @deprecated Use {@link Frame.waitForSelector} with the `xpath` prefix.
   *
   * Example: `await frame.waitForSelector('xpath/' + xpathExpression)`
   *
   * The method evaluates the XPath expression relative to the Frame.
   * If `xpath` starts with `//` instead of `.//`, the dot will be appended
   * automatically.
   *
   * Wait for the `xpath` to appear in page. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the xpath doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * For a code example, see the example for {@link Frame.waitForSelector}. That
   * function behaves identically other than taking a CSS selector rather than
   * an XPath.
   *
   * @param xpath - the XPath expression to wait for.
   * @param options - options to configure the visiblity of the element and how
   * long to wait before timing out.
   */
  async waitForXPath(xpath, options = {}) {
    if (xpath.startsWith("//")) {
      xpath = `.${xpath}`;
    }
    return this.waitForSelector(`xpath/${xpath}`, options);
  }
  /**
   * @example
   * The `waitForFunction` can be used to observe viewport size change:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   *
   * (async () => {
   * .  const browser = await puppeteer.launch();
   * .  const page = await browser.newPage();
   * .  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
   * .  page.setViewport({width: 50, height: 50});
   * .  await watchDog;
   * .  await browser.close();
   * })();
   * ```
   *
   * To pass arguments from Node.js to the predicate of `page.waitForFunction` function:
   *
   * ```ts
   * const selector = '.foo';
   * await frame.waitForFunction(
   *   selector => !!document.querySelector(selector),
   *   {}, // empty options object
   *   selector
   * );
   * ```
   *
   * @param pageFunction - the function to evaluate in the frame context.
   * @param options - options to configure the polling method and timeout.
   * @param args - arguments to pass to the `pageFunction`.
   * @returns the promise which resolve when the `pageFunction` returns a truthy value.
   */
  waitForFunction(pageFunction, options = {}, ...args) {
    return this.worlds[MAIN_WORLD].waitForFunction(pageFunction, options, ...args);
  }
  /**
   * @returns The full HTML contents of the frame, including the DOCTYPE.
   */
  async content() {
    return this.worlds[PUPPETEER_WORLD].content();
  }
  /**
   * Set the content of the frame.
   *
   * @param html - HTML markup to assign to the page.
   * @param options - Options to configure how long before timing out and at
   * what point to consider the content setting successful.
   */
  async setContent(html, options = {}) {
    return this.worlds[PUPPETEER_WORLD].setContent(html, options);
  }
  /**
   * @returns The frame's `name` attribute as specified in the tag.
   *
   * @remarks
   * If the name is empty, it returns the `id` attribute instead.
   *
   * @remarks
   * This value is calculated once when the frame is created, and will not
   * update if the attribute is changed later.
   */
  name() {
    return this._name || "";
  }
  /**
   * @returns The frame's URL.
   */
  url() {
    return __classPrivateFieldGet16(this, _Frame_url, "f");
  }
  /**
   * @returns The parent frame, if any. Detached and main frames return `null`.
   */
  parentFrame() {
    return this._frameManager._frameTree.parentFrame(this._id) || null;
  }
  /**
   * @returns An array of child frames.
   */
  childFrames() {
    return this._frameManager._frameTree.childFrames(this._id);
  }
  /**
   * @returns `true` if the frame has been detached. Otherwise, `false`.
   */
  isDetached() {
    return __classPrivateFieldGet16(this, _Frame_detached, "f");
  }
  /**
   * Adds a `<script>` tag into the page with the desired url or content.
   *
   * @param options - Options for the script.
   * @returns An {@link ElementHandle | element handle} to the injected
   * `<script>` element.
   */
  async addScriptTag(options) {
    let { content = "", type } = options;
    const { path: path5 } = options;
    if (+!!options.url + +!!path5 + +!!content !== 1) {
      throw new Error("Exactly one of `url`, `path`, or `content` must be specified.");
    }
    if (path5) {
      let fs4;
      try {
        fs4 = (await import("fs")).promises;
      } catch (error) {
        if (error instanceof TypeError) {
          throw new Error("Can only pass a file path in a Node-like environment.");
        }
        throw error;
      }
      content = await fs4.readFile(path5, "utf8");
      content += `//# sourceURL=${path5.replace(/\n/g, "")}`;
    }
    type = type !== null && type !== void 0 ? type : "text/javascript";
    return this.worlds[MAIN_WORLD].transferHandle(await this.worlds[PUPPETEER_WORLD].evaluateHandle(async ({ createDeferredPromise: createDeferredPromise2 }, { url, id, type: type2, content: content2 }) => {
      const promise = createDeferredPromise2();
      const script = document.createElement("script");
      script.type = type2;
      script.text = content2;
      if (url) {
        script.src = url;
        script.addEventListener("load", () => {
          return promise.resolve();
        }, { once: true });
        script.addEventListener("error", (event) => {
          var _a2;
          promise.reject(new Error((_a2 = event.message) !== null && _a2 !== void 0 ? _a2 : "Could not load script"));
        }, { once: true });
      } else {
        promise.resolve();
      }
      if (id) {
        script.id = id;
      }
      document.head.appendChild(script);
      await promise;
      return script;
    }, await this.worlds[PUPPETEER_WORLD].puppeteerUtil, { ...options, type, content }));
  }
  async addStyleTag(options) {
    let { content = "" } = options;
    const { path: path5 } = options;
    if (+!!options.url + +!!path5 + +!!content !== 1) {
      throw new Error("Exactly one of `url`, `path`, or `content` must be specified.");
    }
    if (path5) {
      let fs4;
      try {
        fs4 = (await importFS()).promises;
      } catch (error) {
        if (error instanceof TypeError) {
          throw new Error("Can only pass a file path in a Node-like environment.");
        }
        throw error;
      }
      content = await fs4.readFile(path5, "utf8");
      content += "/*# sourceURL=" + path5.replace(/\n/g, "") + "*/";
      options.content = content;
    }
    return this.worlds[MAIN_WORLD].transferHandle(await this.worlds[PUPPETEER_WORLD].evaluateHandle(async ({ createDeferredPromise: createDeferredPromise2 }, { url, content: content2 }) => {
      const promise = createDeferredPromise2();
      let element;
      if (!url) {
        element = document.createElement("style");
        element.appendChild(document.createTextNode(content2));
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        element = link;
      }
      element.addEventListener("load", () => {
        promise.resolve();
      }, { once: true });
      element.addEventListener("error", (event) => {
        var _a2;
        promise.reject(new Error((_a2 = event.message) !== null && _a2 !== void 0 ? _a2 : "Could not load style"));
      }, { once: true });
      document.head.appendChild(element);
      await promise;
      return element;
    }, await this.worlds[PUPPETEER_WORLD].puppeteerUtil, options));
  }
  /**
   * Clicks the first element found that matches `selector`.
   *
   * @remarks
   * If `click()` triggers a navigation event and there's a separate
   * `page.waitForNavigation()` promise to be resolved, you may end up with a
   * race condition that yields unexpected results. The correct pattern for
   * click and wait for navigation is the following:
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(waitOptions),
   *   frame.click(selector, clickOptions),
   * ]);
   * ```
   *
   * @param selector - The selector to query for.
   */
  async click(selector, options = {}) {
    return this.worlds[PUPPETEER_WORLD].click(selector, options);
  }
  /**
   * Focuses the first element that matches the `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  async focus(selector) {
    return this.worlds[PUPPETEER_WORLD].focus(selector);
  }
  /**
   * Hovers the pointer over the center of the first element that matches the
   * `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  async hover(selector) {
    return this.worlds[PUPPETEER_WORLD].hover(selector);
  }
  /**
   * Selects a set of value on the first `<select>` element that matches the
   * `selector`.
   *
   * @example
   *
   * ```ts
   * frame.select('select#colors', 'blue'); // single selection
   * frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param selector - The selector to query for.
   * @param values - The array of values to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first
   * one is taken into account.
   * @returns the list of values that were successfully selected.
   * @throws Throws if there's no `<select>` matching `selector`.
   */
  select(selector, ...values) {
    return this.worlds[PUPPETEER_WORLD].select(selector, ...values);
  }
  /**
   * Taps the first element that matches the `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  async tap(selector) {
    return this.worlds[PUPPETEER_WORLD].tap(selector);
  }
  /**
   * Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character
   * in the text.
   *
   * @remarks
   * To press a special key, like `Control` or `ArrowDown`, use
   * {@link Keyboard.press}.
   *
   * @example
   *
   * ```ts
   * await frame.type('#mytextarea', 'Hello'); // Types instantly
   * await frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
   * ```
   *
   * @param selector - the selector for the element to type into. If there are
   * multiple the first will be used.
   * @param text - text to type into the element
   * @param options - takes one option, `delay`, which sets the time to wait
   * between key presses in milliseconds. Defaults to `0`.
   */
  async type(selector, text, options) {
    return this.worlds[PUPPETEER_WORLD].type(selector, text, options);
  }
  /**
   * @deprecated Replace with `new Promise(r => setTimeout(r, milliseconds));`.
   *
   * Causes your script to wait for the given number of milliseconds.
   *
   * @remarks
   * It's generally recommended to not wait for a number of seconds, but instead
   * use {@link Frame.waitForSelector}, {@link Frame.waitForXPath} or
   * {@link Frame.waitForFunction} to wait for exactly the conditions you want.
   *
   * @example
   *
   * Wait for 1 second:
   *
   * ```ts
   * await frame.waitForTimeout(1000);
   * ```
   *
   * @param milliseconds - the number of milliseconds to wait.
   */
  waitForTimeout(milliseconds) {
    return new Promise((resolve2) => {
      setTimeout(resolve2, milliseconds);
    });
  }
  /**
   * @returns the frame's title.
   */
  async title() {
    return this.worlds[PUPPETEER_WORLD].title();
  }
  /**
   * @internal
   */
  _navigated(framePayload) {
    this._name = framePayload.name;
    __classPrivateFieldSet14(this, _Frame_url, `${framePayload.url}${framePayload.urlFragment || ""}`, "f");
  }
  /**
   * @internal
   */
  _navigatedWithinDocument(url) {
    __classPrivateFieldSet14(this, _Frame_url, url, "f");
  }
  /**
   * @internal
   */
  _onLifecycleEvent(loaderId, name) {
    if (name === "init") {
      this._loaderId = loaderId;
      this._lifecycleEvents.clear();
    }
    this._lifecycleEvents.add(name);
  }
  /**
   * @internal
   */
  _onLoadingStopped() {
    this._lifecycleEvents.add("DOMContentLoaded");
    this._lifecycleEvents.add("load");
  }
  /**
   * @internal
   */
  _onLoadingStarted() {
    this._hasStartedLoading = true;
  }
  /**
   * @internal
   */
  _detach() {
    __classPrivateFieldSet14(this, _Frame_detached, true, "f");
    this.worlds[MAIN_WORLD]._detach();
    this.worlds[PUPPETEER_WORLD]._detach();
  }
};
_Frame_url = /* @__PURE__ */ new WeakMap(), _Frame_detached = /* @__PURE__ */ new WeakMap(), _Frame_client = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/AriaQueryHandler.js
async function queryAXTree(client, element, accessibleName, role) {
  const { nodes } = await client.send("Accessibility.queryAXTree", {
    objectId: element.remoteObject().objectId,
    accessibleName,
    role
  });
  const filteredNodes = nodes.filter((node) => {
    return !node.role || node.role.value !== "StaticText";
  });
  return filteredNodes;
}
var normalizeValue = (value) => {
  return value.replace(/ +/g, " ").trim();
};
var knownAttributes = /* @__PURE__ */ new Set(["name", "role"]);
var attributeRegexp = /\[\s*(?<attribute>\w+)\s*=\s*(?<quote>"|')(?<value>\\.|.*?(?=\k<quote>))\k<quote>\s*\]/g;
function isKnownAttribute(attribute) {
  return knownAttributes.has(attribute);
}
function parseAriaSelector(selector) {
  const queryOptions = {};
  const defaultName = selector.replace(attributeRegexp, (_, attribute, _quote, value) => {
    attribute = attribute.trim();
    assert(isKnownAttribute(attribute), `Unknown aria attribute "${attribute}" in selector`);
    queryOptions[attribute] = normalizeValue(value);
    return "";
  });
  if (defaultName && !queryOptions.name) {
    queryOptions.name = normalizeValue(defaultName);
  }
  return queryOptions;
}
var queryOneId = async (element, selector) => {
  const { name, role } = parseAriaSelector(selector);
  const res = await queryAXTree(element.client, element, name, role);
  if (!res[0] || !res[0].backendDOMNodeId) {
    return null;
  }
  return res[0].backendDOMNodeId;
};
var queryOne = async (element, selector) => {
  const id = await queryOneId(element, selector);
  if (!id) {
    return null;
  }
  return await element.frame.worlds[MAIN_WORLD].adoptBackendNode(id);
};
var waitFor = async (elementOrFrame, selector, options) => {
  let frame;
  let element;
  if (elementOrFrame instanceof Frame) {
    frame = elementOrFrame;
  } else {
    frame = elementOrFrame.frame;
    element = await frame.worlds[PUPPETEER_WORLD].adoptHandle(elementOrFrame);
  }
  const ariaQuerySelector = async (selector2) => {
    const id = await queryOneId(element || await frame.worlds[PUPPETEER_WORLD].document(), selector2);
    if (!id) {
      return null;
    }
    return await frame.worlds[PUPPETEER_WORLD].adoptBackendNode(id);
  };
  const result = await frame.worlds[PUPPETEER_WORLD]._waitForSelectorInPage((_, selector2) => {
    return globalThis.ariaQuerySelector(selector2);
  }, element, selector, options, /* @__PURE__ */ new Map([["ariaQuerySelector", ariaQuerySelector]]));
  if (element) {
    await element.dispose();
  }
  if (!(result instanceof ElementHandle)) {
    await (result === null || result === void 0 ? void 0 : result.dispose());
    return null;
  }
  return result.frame.worlds[MAIN_WORLD].transferHandle(result);
};
var queryAll = async (element, selector) => {
  const exeCtx = element.executionContext();
  const { name, role } = parseAriaSelector(selector);
  const res = await queryAXTree(exeCtx._client, element, name, role);
  const world = exeCtx._world;
  return Promise.all(res.map((axNode) => {
    return world.adoptBackendNode(axNode.backendDOMNodeId);
  }));
};
var ariaHandler = {
  queryOne,
  waitFor,
  queryAll
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/QueryHandler.js
function createPuppeteerQueryHandler(handler) {
  const internalHandler = {};
  if (handler.queryOne) {
    const queryOne2 = handler.queryOne;
    internalHandler.queryOne = async (element, selector) => {
      const jsHandle = await element.evaluateHandle(queryOne2, selector, await element.executionContext()._world.puppeteerUtil);
      const elementHandle = jsHandle.asElement();
      if (elementHandle) {
        return elementHandle;
      }
      await jsHandle.dispose();
      return null;
    };
    internalHandler.waitFor = async (elementOrFrame, selector, options) => {
      let frame;
      let element;
      if (elementOrFrame instanceof Frame) {
        frame = elementOrFrame;
      } else {
        frame = elementOrFrame.frame;
        element = await frame.worlds[PUPPETEER_WORLD].adoptHandle(elementOrFrame);
      }
      const result = await frame.worlds[PUPPETEER_WORLD]._waitForSelectorInPage(queryOne2, element, selector, options);
      if (element) {
        await element.dispose();
      }
      if (!result) {
        return null;
      }
      if (!(result instanceof ElementHandle)) {
        await result.dispose();
        return null;
      }
      return frame.worlds[MAIN_WORLD].transferHandle(result);
    };
  }
  if (handler.queryAll) {
    const queryAll2 = handler.queryAll;
    internalHandler.queryAll = async (element, selector) => {
      const jsHandle = await element.evaluateHandle(queryAll2, selector, await element.executionContext()._world.puppeteerUtil);
      const properties = await jsHandle.getProperties();
      await jsHandle.dispose();
      const result = [];
      for (const property of properties.values()) {
        const elementHandle = property.asElement();
        if (elementHandle) {
          result.push(elementHandle);
        }
      }
      return result;
    };
  }
  return internalHandler;
}
var defaultHandler = createPuppeteerQueryHandler({
  queryOne: (element, selector) => {
    if (!("querySelector" in element)) {
      throw new Error(`Could not invoke \`querySelector\` on node of type ${element.nodeName}.`);
    }
    return element.querySelector(selector);
  },
  queryAll: (element, selector) => {
    if (!("querySelectorAll" in element)) {
      throw new Error(`Could not invoke \`querySelectorAll\` on node of type ${element.nodeName}.`);
    }
    return [
      ...element.querySelectorAll(selector)
    ];
  }
});
var pierceHandler = createPuppeteerQueryHandler({
  queryOne: (element, selector, { pierceQuerySelector }) => {
    return pierceQuerySelector(element, selector);
  },
  queryAll: (element, selector, { pierceQuerySelectorAll }) => {
    return pierceQuerySelectorAll(element, selector);
  }
});
var xpathHandler = createPuppeteerQueryHandler({
  queryOne: (element, selector, { xpathQuerySelector }) => {
    return xpathQuerySelector(element, selector);
  },
  queryAll: (element, selector, { xpathQuerySelectorAll }) => {
    return xpathQuerySelectorAll(element, selector);
  }
});
var textQueryHandler = createPuppeteerQueryHandler({
  queryOne: (element, selector, { textQuerySelector }) => {
    return textQuerySelector(element, selector);
  },
  queryAll: (element, selector, { textQuerySelectorAll }) => {
    return textQuerySelectorAll(element, selector);
  }
});
var INTERNAL_QUERY_HANDLERS = /* @__PURE__ */ new Map([
  ["aria", { handler: ariaHandler }],
  ["pierce", { handler: pierceHandler }],
  ["xpath", { handler: xpathHandler }],
  ["text", { handler: textQueryHandler }]
]);
var QUERY_HANDLERS = /* @__PURE__ */ new Map();
function registerCustomQueryHandler(name, handler) {
  if (INTERNAL_QUERY_HANDLERS.has(name)) {
    throw new Error(`A query handler named "${name}" already exists`);
  }
  if (QUERY_HANDLERS.has(name)) {
    throw new Error(`A custom query handler named "${name}" already exists`);
  }
  const isValidName = /^[a-zA-Z]+$/.test(name);
  if (!isValidName) {
    throw new Error(`Custom query handler names may only contain [a-zA-Z]`);
  }
  QUERY_HANDLERS.set(name, { handler: createPuppeteerQueryHandler(handler) });
}
function unregisterCustomQueryHandler(name) {
  QUERY_HANDLERS.delete(name);
}
function customQueryHandlerNames() {
  return [...QUERY_HANDLERS.keys()];
}
function clearCustomQueryHandlers() {
  QUERY_HANDLERS.clear();
}
var CUSTOM_QUERY_SEPARATORS = ["=", "/"];
function getQueryHandlerAndSelector(selector) {
  for (const handlerMap of [QUERY_HANDLERS, INTERNAL_QUERY_HANDLERS]) {
    for (const [name, { handler: queryHandler, transformSelector }] of handlerMap) {
      for (const separator of CUSTOM_QUERY_SEPARATORS) {
        const prefix = `${name}${separator}`;
        if (selector.startsWith(prefix)) {
          selector = selector.slice(prefix.length);
          if (transformSelector) {
            selector = transformSelector(selector);
          }
          return { updatedSelector: selector, queryHandler };
        }
      }
    }
  }
  return { updatedSelector: selector, queryHandler: defaultHandler };
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/ElementHandle.js
var __classPrivateFieldSet15 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet17 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ElementHandle_instances;
var _ElementHandle_frame;
var _ElementHandle_frameManager_get;
var _ElementHandle_page_get;
var _ElementHandle_scrollIntoViewIfNeeded;
var _ElementHandle_getOOPIFOffsets;
var _ElementHandle_getBoxModel;
var _ElementHandle_fromProtocolQuad;
var _ElementHandle_intersectQuadWithViewport;
var applyOffsetsToQuad = (quad, offsetX, offsetY) => {
  return quad.map((part) => {
    return { x: part.x + offsetX, y: part.y + offsetY };
  });
};
var ElementHandle = class extends JSHandle {
  /**
   * @internal
   */
  constructor(context, remoteObject, frame) {
    super(context, remoteObject);
    _ElementHandle_instances.add(this);
    _ElementHandle_frame.set(this, void 0);
    __classPrivateFieldSet15(this, _ElementHandle_frame, frame, "f");
  }
  get frame() {
    return __classPrivateFieldGet17(this, _ElementHandle_frame, "f");
  }
  /**
   * Queries the current element for an element matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns A {@link ElementHandle | element handle} to the first element
   * matching the given selector. Otherwise, `null`.
   */
  async $(selector) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.queryOne, "Cannot handle queries for a single element with the given selector");
    return await queryHandler.queryOne(this, updatedSelector);
  }
  /**
   * Queries the current element for all elements matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns An array of {@link ElementHandle | element handles} that point to
   * elements matching the given selector.
   */
  async $$(selector) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.queryAll, "Cannot handle queries for a multiple element with the given selector");
    return await queryHandler.queryAll(this, updatedSelector);
  }
  /**
   * Runs the given function on the first element matching the given selector in
   * the current element.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   *
   * ```ts
   * const tweetHandle = await page.$('.tweet');
   * expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe(
   *   '100'
   * );
   * expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe(
   *   '10'
   * );
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in this element's page's
   * context. The first element matching the selector will be passed in as the
   * first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $eval(selector, pageFunction, ...args) {
    const elementHandle = await this.$(selector);
    if (!elementHandle) {
      throw new Error(`Error: failed to find element matching selector "${selector}"`);
    }
    const result = await elementHandle.evaluate(pageFunction, ...args);
    await elementHandle.dispose();
    return result;
  }
  /**
   * Runs the given function on an array of elements matching the given selector
   * in the current element.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   * HTML:
   *
   * ```html
   * <div class="feed">
   *   <div class="tweet">Hello!</div>
   *   <div class="tweet">Hi!</div>
   * </div>
   * ```
   *
   * JavaScript:
   *
   * ```js
   * const feedHandle = await page.$('.feed');
   * expect(
   *   await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText))
   * ).toEqual(['Hello!', 'Hi!']);
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in the element's page's
   * context. An array of elements matching the given selector will be passed to
   * the function as its first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $$eval(selector, pageFunction, ...args) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.queryAll, "Cannot handle queries for a multiple element with the given selector");
    const handles = await queryHandler.queryAll(this, updatedSelector);
    const elements = await this.evaluateHandle((_, ...elements2) => {
      return elements2;
    }, ...handles);
    const [result] = await Promise.all([
      elements.evaluate(pageFunction, ...args),
      ...handles.map((handle) => {
        return handle.dispose();
      })
    ]);
    await elements.dispose();
    return result;
  }
  /**
   * @deprecated Use {@link ElementHandle.$$} with the `xpath` prefix.
   *
   * Example: `await elementHandle.$$('xpath/' + xpathExpression)`
   *
   * The method evaluates the XPath expression relative to the elementHandle.
   * If `xpath` starts with `//` instead of `.//`, the dot will be appended
   * automatically.
   *
   * If there are no such elements, the method will resolve to an empty array.
   * @param expression - Expression to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate | evaluate}
   */
  async $x(expression) {
    if (expression.startsWith("//")) {
      expression = `.${expression}`;
    }
    return this.$$(`xpath/${expression}`);
  }
  /**
   * Wait for an element matching the given selector to appear in the current
   * element.
   *
   * Unlike {@link Frame.waitForSelector}, this method does not work across
   * navigations or if the element is detached from DOM.
   *
   * @example
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .mainFrame()
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - The selector to query and wait for.
   * @param options - Options for customizing waiting behavior.
   * @returns An element matching the given selector.
   * @throws Throws if an element matching the given selector doesn't appear.
   */
  async waitForSelector(selector, options = {}) {
    const { updatedSelector, queryHandler } = getQueryHandlerAndSelector(selector);
    assert(queryHandler.waitFor, "Query handler does not support waiting");
    return await queryHandler.waitFor(this, updatedSelector, options);
  }
  /**
   * @deprecated Use {@link ElementHandle.waitForSelector} with the `xpath`
   * prefix.
   *
   * Example: `await elementHandle.waitForSelector('xpath/' + xpathExpression)`
   *
   * The method evaluates the XPath expression relative to the elementHandle.
   *
   * Wait for the `xpath` within the element. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the `xpath` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * If `xpath` starts with `//` instead of `.//`, the dot will be appended
   * automatically.
   *
   * This method works across navigation.
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForXPath('//img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param xpath - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/XPath | xpath} of an
   * element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by xpath string is
   * added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is
   * not found in DOM.
   * @remarks
   * The optional Argument `options` have properties:
   *
   * - `visible`: A boolean to wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: A boolean wait for element to not be found in the DOM or to be
   *   hidden, i.e. have `display: none` or `visibility: hidden` CSS properties.
   *   Defaults to `false`.
   *
   * - `timeout`: A number which is maximum time to wait for in milliseconds.
   *   Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The
   *   default value can be changed by using the {@link Page.setDefaultTimeout}
   *   method.
   */
  async waitForXPath(xpath, options = {}) {
    if (xpath.startsWith("//")) {
      xpath = `.${xpath}`;
    }
    return this.waitForSelector(`xpath/${xpath}`, options);
  }
  asElement() {
    return this;
  }
  /**
   * Resolves to the content frame for element handles referencing
   * iframe nodes, or null otherwise
   */
  async contentFrame() {
    const nodeInfo = await this.client.send("DOM.describeNode", {
      objectId: this.remoteObject().objectId
    });
    if (typeof nodeInfo.node.frameId !== "string") {
      return null;
    }
    return __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_frameManager_get).frame(nodeInfo.node.frameId);
  }
  /**
   * Returns the middle point within an element unless a specific offset is provided.
   */
  async clickablePoint(offset) {
    const [result, layoutMetrics] = await Promise.all([
      this.client.send("DOM.getContentQuads", {
        objectId: this.remoteObject().objectId
      }).catch(debugError),
      __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get)._client().send("Page.getLayoutMetrics")
    ]);
    if (!result || !result.quads.length) {
      throw new Error("Node is either not clickable or not an HTMLElement");
    }
    const { clientWidth, clientHeight } = layoutMetrics.cssLayoutViewport || layoutMetrics.layoutViewport;
    const { offsetX, offsetY } = await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, __classPrivateFieldGet17(this, _ElementHandle_frame, "f"));
    const quads = result.quads.map((quad2) => {
      return __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, quad2);
    }).map((quad2) => {
      return applyOffsetsToQuad(quad2, offsetX, offsetY);
    }).map((quad2) => {
      return __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_intersectQuadWithViewport).call(this, quad2, clientWidth, clientHeight);
    }).filter((quad2) => {
      return computeQuadArea(quad2) > 1;
    });
    if (!quads.length) {
      throw new Error("Node is either not clickable or not an HTMLElement");
    }
    const quad = quads[0];
    if (offset) {
      let minX = Number.MAX_SAFE_INTEGER;
      let minY = Number.MAX_SAFE_INTEGER;
      for (const point of quad) {
        if (point.x < minX) {
          minX = point.x;
        }
        if (point.y < minY) {
          minY = point.y;
        }
      }
      if (minX !== Number.MAX_SAFE_INTEGER && minY !== Number.MAX_SAFE_INTEGER) {
        return {
          x: minX + offset.x,
          y: minY + offset.y
        };
      }
    }
    let x = 0;
    let y = 0;
    for (const point of quad) {
      x += point.x;
      y += point.y;
    }
    return {
      x: x / 4,
      y: y / 4
    };
  }
  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page.mouse} to hover over the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async hover() {
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const { x, y } = await this.clickablePoint();
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.move(x, y);
  }
  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page.mouse} to click in the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async click(options = {}) {
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const { x, y } = await this.clickablePoint(options.offset);
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.click(x, y, options);
  }
  /**
   * This method creates and captures a dragevent from the element.
   */
  async drag(target) {
    assert(__classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).isDragInterceptionEnabled(), "Drag Interception is not enabled!");
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const start = await this.clickablePoint();
    return await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.drag(start, target);
  }
  /**
   * This method creates a `dragenter` event on the element.
   */
  async dragEnter(data = { items: [], dragOperationsMask: 1 }) {
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const target = await this.clickablePoint();
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.dragEnter(target, data);
  }
  /**
   * This method creates a `dragover` event on the element.
   */
  async dragOver(data = { items: [], dragOperationsMask: 1 }) {
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const target = await this.clickablePoint();
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.dragOver(target, data);
  }
  /**
   * This method triggers a drop on the element.
   */
  async drop(data = { items: [], dragOperationsMask: 1 }) {
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const destination = await this.clickablePoint();
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.drop(destination, data);
  }
  /**
   * This method triggers a dragenter, dragover, and drop on the element.
   */
  async dragAndDrop(target, options) {
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const startPoint = await this.clickablePoint();
    const targetPoint = await target.clickablePoint();
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).mouse.dragAndDrop(startPoint, targetPoint, options);
  }
  /**
   * Triggers a `change` and `input` event once all the provided options have been
   * selected. If there's no `<select>` element matching `selector`, the method
   * throws an error.
   *
   * @example
   *
   * ```ts
   * handle.select('blue'); // single selection
   * handle.select('red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param values - Values of options to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first
   * one is taken into account.
   */
  async select(...values) {
    for (const value of values) {
      assert(isString(value), 'Values must be strings. Found value "' + value + '" of type "' + typeof value + '"');
    }
    return this.evaluate((element, vals) => {
      const values2 = new Set(vals);
      if (!(element instanceof HTMLSelectElement)) {
        throw new Error("Element is not a <select> element.");
      }
      const selectedValues = /* @__PURE__ */ new Set();
      if (!element.multiple) {
        for (const option of element.options) {
          option.selected = false;
        }
        for (const option of element.options) {
          if (values2.has(option.value)) {
            option.selected = true;
            selectedValues.add(option.value);
            break;
          }
        }
      } else {
        for (const option of element.options) {
          option.selected = values2.has(option.value);
          if (option.selected) {
            selectedValues.add(option.value);
          }
        }
      }
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      return [...selectedValues.values()];
    }, values);
  }
  /**
   * This method expects `elementHandle` to point to an
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input | input element}.
   *
   * @param filePaths - Sets the value of the file input to these paths.
   * If a path is relative, then it is resolved against the
   * {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
   * Note for locals script connecting to remote chrome environments,
   * paths must be absolute.
   */
  async uploadFile(...filePaths) {
    const isMultiple = await this.evaluate((element) => {
      return element.multiple;
    });
    assert(filePaths.length <= 1 || isMultiple, "Multiple file uploads only work with <input type=file multiple>");
    let path5;
    try {
      path5 = await import("path");
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(`JSHandle#uploadFile can only be used in Node-like environments.`);
      }
      throw error;
    }
    const files = filePaths.map((filePath) => {
      if (path5.win32.isAbsolute(filePath) || path5.posix.isAbsolute(filePath)) {
        return filePath;
      } else {
        return path5.resolve(filePath);
      }
    });
    const { objectId } = this.remoteObject();
    const { node } = await this.client.send("DOM.describeNode", { objectId });
    const { backendNodeId } = node;
    if (files.length === 0) {
      await this.evaluate((element) => {
        element.files = new DataTransfer().files;
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      });
    } else {
      await this.client.send("DOM.setFileInputFiles", {
        objectId,
        files,
        backendNodeId
      });
    }
  }
  /**
   * This method scrolls element into view if needed, and then uses
   * {@link Touchscreen.tap} to tap in the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async tap() {
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    const { x, y } = await this.clickablePoint();
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).touchscreen.tap(x, y);
  }
  /**
   * Calls {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus | focus} on the element.
   */
  async focus() {
    await this.evaluate((element) => {
      if (!(element instanceof HTMLElement)) {
        throw new Error("Cannot focus non-HTMLElement");
      }
      return element.focus();
    });
  }
  /**
   * Focuses the element, and then sends a `keydown`, `keypress`/`input`, and
   * `keyup` event for each character in the text.
   *
   * To press a special key, like `Control` or `ArrowDown`,
   * use {@link ElementHandle.press}.
   *
   * @example
   *
   * ```ts
   * await elementHandle.type('Hello'); // Types instantly
   * await elementHandle.type('World', {delay: 100}); // Types slower, like a user
   * ```
   *
   * @example
   * An example of typing into a text field and then submitting the form:
   *
   * ```ts
   * const elementHandle = await page.$('input');
   * await elementHandle.type('some text');
   * await elementHandle.press('Enter');
   * ```
   */
  async type(text, options) {
    await this.focus();
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).keyboard.type(text, options);
  }
  /**
   * Focuses the element, and then uses {@link Keyboard.down} and {@link Keyboard.up}.
   *
   * @remarks
   * If `key` is a single character and no modifier keys besides `Shift`
   * are being held down, a `keypress`/`input` event will also be generated.
   * The `text` option can be specified to force an input event to be generated.
   *
   * **NOTE** Modifier keys DO affect `elementHandle.press`. Holding down `Shift`
   * will type the text in upper case.
   *
   * @param key - Name of key to press, such as `ArrowLeft`.
   * See {@link KeyInput} for a list of all key names.
   */
  async press(key, options) {
    await this.focus();
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).keyboard.press(key, options);
  }
  /**
   * This method returns the bounding box of the element (relative to the main frame),
   * or `null` if the element is not visible.
   */
  async boundingBox() {
    const result = await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_getBoxModel).call(this);
    if (!result) {
      return null;
    }
    const { offsetX, offsetY } = await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, __classPrivateFieldGet17(this, _ElementHandle_frame, "f"));
    const quad = result.model.border;
    const x = Math.min(quad[0], quad[2], quad[4], quad[6]);
    const y = Math.min(quad[1], quad[3], quad[5], quad[7]);
    const width = Math.max(quad[0], quad[2], quad[4], quad[6]) - x;
    const height = Math.max(quad[1], quad[3], quad[5], quad[7]) - y;
    return { x: x + offsetX, y: y + offsetY, width, height };
  }
  /**
   * This method returns boxes of the element, or `null` if the element is not visible.
   *
   * @remarks
   *
   * Boxes are represented as an array of points;
   * Each Point is an object `{x, y}`. Box points are sorted clock-wise.
   */
  async boxModel() {
    const result = await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_getBoxModel).call(this);
    if (!result) {
      return null;
    }
    const { offsetX, offsetY } = await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_getOOPIFOffsets).call(this, __classPrivateFieldGet17(this, _ElementHandle_frame, "f"));
    const { content, padding, border, margin, width, height } = result.model;
    return {
      content: applyOffsetsToQuad(__classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, content), offsetX, offsetY),
      padding: applyOffsetsToQuad(__classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, padding), offsetX, offsetY),
      border: applyOffsetsToQuad(__classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, border), offsetX, offsetY),
      margin: applyOffsetsToQuad(__classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, margin), offsetX, offsetY),
      width,
      height
    };
  }
  /**
   * This method scrolls element into view if needed, and then uses
   * {@link Page.screenshot} to take a screenshot of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async screenshot(options = {}) {
    let needsViewportReset = false;
    let boundingBox = await this.boundingBox();
    assert(boundingBox, "Node is either not visible or not an HTMLElement");
    const viewport = __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).viewport();
    if (viewport && (boundingBox.width > viewport.width || boundingBox.height > viewport.height)) {
      const newViewport = {
        width: Math.max(viewport.width, Math.ceil(boundingBox.width)),
        height: Math.max(viewport.height, Math.ceil(boundingBox.height))
      };
      await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).setViewport(Object.assign({}, viewport, newViewport));
      needsViewportReset = true;
    }
    await __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_scrollIntoViewIfNeeded).call(this);
    boundingBox = await this.boundingBox();
    assert(boundingBox, "Node is either not visible or not an HTMLElement");
    assert(boundingBox.width !== 0, "Node has 0 width.");
    assert(boundingBox.height !== 0, "Node has 0 height.");
    const layoutMetrics = await this.client.send("Page.getLayoutMetrics");
    const { pageX, pageY } = layoutMetrics.cssVisualViewport || layoutMetrics.layoutViewport;
    const clip = Object.assign({}, boundingBox);
    clip.x += pageX;
    clip.y += pageY;
    const imageData = await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).screenshot(Object.assign({}, {
      clip
    }, options));
    if (needsViewportReset && viewport) {
      await __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).setViewport(viewport);
    }
    return imageData;
  }
  /**
   * Resolves to true if the element is visible in the current viewport.
   */
  async isIntersectingViewport(options) {
    const { threshold = 0 } = options !== null && options !== void 0 ? options : {};
    return await this.evaluate(async (element, threshold2) => {
      const visibleRatio = await new Promise((resolve2) => {
        const observer = new IntersectionObserver((entries) => {
          resolve2(entries[0].intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
      });
      return threshold2 === 1 ? visibleRatio === 1 : visibleRatio > threshold2;
    }, threshold);
  }
};
_ElementHandle_frame = /* @__PURE__ */ new WeakMap(), _ElementHandle_instances = /* @__PURE__ */ new WeakSet(), _ElementHandle_frameManager_get = function _ElementHandle_frameManager_get2() {
  return __classPrivateFieldGet17(this, _ElementHandle_frame, "f")._frameManager;
}, _ElementHandle_page_get = function _ElementHandle_page_get2() {
  return __classPrivateFieldGet17(this, _ElementHandle_frame, "f").page();
}, _ElementHandle_scrollIntoViewIfNeeded = async function _ElementHandle_scrollIntoViewIfNeeded2() {
  const error = await this.evaluate(async (element) => {
    if (!element.isConnected) {
      return "Node is detached from document";
    }
    if (element.nodeType !== Node.ELEMENT_NODE) {
      return "Node is not of type HTMLElement";
    }
    return;
  });
  if (error) {
    throw new Error(error);
  }
  try {
    await this.client.send("DOM.scrollIntoViewIfNeeded", {
      objectId: this.remoteObject().objectId
    });
  } catch (_err) {
    await this.evaluate(async (element, pageJavascriptEnabled) => {
      const visibleRatio = async () => {
        return await new Promise((resolve2) => {
          const observer = new IntersectionObserver((entries) => {
            resolve2(entries[0].intersectionRatio);
            observer.disconnect();
          });
          observer.observe(element);
        });
      };
      if (!pageJavascriptEnabled || await visibleRatio() !== 1) {
        element.scrollIntoView({
          block: "center",
          inline: "center",
          // @ts-expect-error Chrome still supports behavior: instant but
          // it's not in the spec so TS shouts We don't want to make this
          // breaking change in Puppeteer yet so we'll ignore the line.
          behavior: "instant"
        });
      }
    }, __classPrivateFieldGet17(this, _ElementHandle_instances, "a", _ElementHandle_page_get).isJavaScriptEnabled());
  }
}, _ElementHandle_getOOPIFOffsets = async function _ElementHandle_getOOPIFOffsets2(frame) {
  let offsetX = 0;
  let offsetY = 0;
  let currentFrame = frame;
  while (currentFrame && currentFrame.parentFrame()) {
    const parent = currentFrame.parentFrame();
    if (!currentFrame.isOOPFrame() || !parent) {
      currentFrame = parent;
      continue;
    }
    const { backendNodeId } = await parent._client().send("DOM.getFrameOwner", {
      frameId: currentFrame._id
    });
    const result = await parent._client().send("DOM.getBoxModel", {
      backendNodeId
    });
    if (!result) {
      break;
    }
    const contentBoxQuad = result.model.content;
    const topLeftCorner = __classPrivateFieldGet17(this, _ElementHandle_instances, "m", _ElementHandle_fromProtocolQuad).call(this, contentBoxQuad)[0];
    offsetX += topLeftCorner.x;
    offsetY += topLeftCorner.y;
    currentFrame = parent;
  }
  return { offsetX, offsetY };
}, _ElementHandle_getBoxModel = function _ElementHandle_getBoxModel2() {
  const params = {
    objectId: this.remoteObject().objectId
  };
  return this.client.send("DOM.getBoxModel", params).catch((error) => {
    return debugError(error);
  });
}, _ElementHandle_fromProtocolQuad = function _ElementHandle_fromProtocolQuad2(quad) {
  return [
    { x: quad[0], y: quad[1] },
    { x: quad[2], y: quad[3] },
    { x: quad[4], y: quad[5] },
    { x: quad[6], y: quad[7] }
  ];
}, _ElementHandle_intersectQuadWithViewport = function _ElementHandle_intersectQuadWithViewport2(quad, width, height) {
  return quad.map((point) => {
    return {
      x: Math.min(Math.max(point.x, 0), width),
      y: Math.min(Math.max(point.y, 0), height)
    };
  });
};
function computeQuadArea(quad) {
  let area = 0;
  for (let i = 0; i < quad.length; ++i) {
    const p1 = quad[i];
    const p2 = quad[(i + 1) % quad.length];
    area += (p1.x * p2.y - p2.x * p1.y) / 2;
  }
  return Math.abs(area);
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/util.js
var debugError = debug("puppeteer:error");
function getExceptionMessage(exceptionDetails) {
  if (exceptionDetails.exception) {
    return exceptionDetails.exception.description || exceptionDetails.exception.value;
  }
  let message = exceptionDetails.text;
  if (exceptionDetails.stackTrace) {
    for (const callframe of exceptionDetails.stackTrace.callFrames) {
      const location = callframe.url + ":" + callframe.lineNumber + ":" + callframe.columnNumber;
      const functionName = callframe.functionName || "<anonymous>";
      message += `
    at ${functionName} (${location})`;
    }
  }
  return message;
}
function valueFromRemoteObject(remoteObject) {
  assert(!remoteObject.objectId, "Cannot extract value when objectId is given");
  if (remoteObject.unserializableValue) {
    if (remoteObject.type === "bigint" && typeof BigInt !== "undefined") {
      return BigInt(remoteObject.unserializableValue.replace("n", ""));
    }
    switch (remoteObject.unserializableValue) {
      case "-0":
        return -0;
      case "NaN":
        return NaN;
      case "Infinity":
        return Infinity;
      case "-Infinity":
        return -Infinity;
      default:
        throw new Error("Unsupported unserializable value: " + remoteObject.unserializableValue);
    }
  }
  return remoteObject.value;
}
async function releaseObject(client, remoteObject) {
  if (!remoteObject.objectId) {
    return;
  }
  await client.send("Runtime.releaseObject", { objectId: remoteObject.objectId }).catch((error) => {
    debugError(error);
  });
}
function addEventListener(emitter, eventName, handler) {
  emitter.on(eventName, handler);
  return { emitter, eventName, handler };
}
function removeEventListeners(listeners) {
  for (const listener of listeners) {
    listener.emitter.removeListener(listener.eventName, listener.handler);
  }
  listeners.length = 0;
}
var isString = (obj) => {
  return typeof obj === "string" || obj instanceof String;
};
var isNumber = (obj) => {
  return typeof obj === "number" || obj instanceof Number;
};
async function waitForEvent(emitter, eventName, predicate, timeout, abortPromise) {
  let eventTimeout;
  let resolveCallback;
  let rejectCallback;
  const promise = new Promise((resolve2, reject) => {
    resolveCallback = resolve2;
    rejectCallback = reject;
  });
  const listener = addEventListener(emitter, eventName, async (event) => {
    if (!await predicate(event)) {
      return;
    }
    resolveCallback(event);
  });
  if (timeout) {
    eventTimeout = setTimeout(() => {
      rejectCallback(new TimeoutError("Timeout exceeded while waiting for event"));
    }, timeout);
  }
  function cleanup() {
    removeEventListeners([listener]);
    clearTimeout(eventTimeout);
  }
  const result = await Promise.race([promise, abortPromise]).then((r) => {
    cleanup();
    return r;
  }, (error) => {
    cleanup();
    throw error;
  });
  if (isErrorLike(result)) {
    throw result;
  }
  return result;
}
function createJSHandle(context, remoteObject) {
  if (remoteObject.subtype === "node" && context._world) {
    return new ElementHandle(context, remoteObject, context._world.frame());
  }
  return new JSHandle(context, remoteObject);
}
function evaluationString(fun, ...args) {
  if (isString(fun)) {
    assert(args.length === 0, "Cannot evaluate a string with arguments");
    return fun;
  }
  function serializeArgument(arg) {
    if (Object.is(arg, void 0)) {
      return "undefined";
    }
    return JSON.stringify(arg);
  }
  return `(${fun})(${args.map(serializeArgument).join(",")})`;
}
function pageBindingInitString(type, name) {
  function addPageBinding(type2, name2) {
    const callCDP = self[name2];
    Object.assign(self, {
      [name2](...args) {
        var _a2, _b;
        const callPuppeteer = self[name2];
        (_a2 = callPuppeteer.callbacks) !== null && _a2 !== void 0 ? _a2 : callPuppeteer.callbacks = /* @__PURE__ */ new Map();
        const seq = ((_b = callPuppeteer.lastSeq) !== null && _b !== void 0 ? _b : 0) + 1;
        callPuppeteer.lastSeq = seq;
        callCDP(JSON.stringify({ type: type2, name: name2, seq, args }));
        return new Promise((resolve2, reject) => {
          callPuppeteer.callbacks.set(seq, { resolve: resolve2, reject });
        });
      }
    });
  }
  return evaluationString(addPageBinding, type, name);
}
function pageBindingDeliverResultString(name, seq, result) {
  function deliverResult(name2, seq2, result2) {
    window[name2].callbacks.get(seq2).resolve(result2);
    window[name2].callbacks.delete(seq2);
  }
  return evaluationString(deliverResult, name, seq, result);
}
function pageBindingDeliverErrorString(name, seq, message, stack) {
  function deliverError(name2, seq2, message2, stack2) {
    const error = new Error(message2);
    error.stack = stack2;
    window[name2].callbacks.get(seq2).reject(error);
    window[name2].callbacks.delete(seq2);
  }
  return evaluationString(deliverError, name, seq, message, stack);
}
function pageBindingDeliverErrorValueString(name, seq, value) {
  function deliverErrorValue(name2, seq2, value2) {
    window[name2].callbacks.get(seq2).reject(value2);
    window[name2].callbacks.delete(seq2);
  }
  return evaluationString(deliverErrorValue, name, seq, value);
}
async function waitWithTimeout(promise, taskName, timeout) {
  let reject;
  const timeoutError = new TimeoutError(`waiting for ${taskName} failed: timeout ${timeout}ms exceeded`);
  const timeoutPromise = new Promise((_res, rej) => {
    return reject = rej;
  });
  let timeoutTimer = null;
  if (timeout) {
    timeoutTimer = setTimeout(() => {
      return reject(timeoutError);
    }, timeout);
  }
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }
  }
}
var fs = null;
async function importFS() {
  if (!fs) {
    fs = await import("fs");
  }
  return fs;
}
async function getReadableAsBuffer(readable, path5) {
  const buffers = [];
  if (path5) {
    let fs4;
    try {
      fs4 = (await importFS()).promises;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Cannot write to a path outside of a Node-like environment.");
      }
      throw error;
    }
    const fileHandle = await fs4.open(path5, "w+");
    for await (const chunk of readable) {
      buffers.push(chunk);
      await fileHandle.writeFile(chunk);
    }
    await fileHandle.close();
  } else {
    for await (const chunk of readable) {
      buffers.push(chunk);
    }
  }
  try {
    return Buffer.concat(buffers);
  } catch (error) {
    return null;
  }
}
async function getReadableFromProtocolStream(client, handle) {
  if (!isNode) {
    throw new Error("Cannot create a stream outside of Node.js environment.");
  }
  const { Readable } = await import("stream");
  let eof = false;
  return new Readable({
    async read(size) {
      if (eof) {
        return;
      }
      const response = await client.send("IO.read", { handle, size });
      this.push(response.data, response.base64Encoded ? "base64" : void 0);
      if (response.eof) {
        eof = true;
        await client.send("IO.close", { handle });
        this.push(null);
      }
    }
  });
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Browser.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Target.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/WebWorker.js
init_cjs_shim();
var __classPrivateFieldSet16 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet18 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WebWorker_executionContext;
var _WebWorker_client;
var _WebWorker_url;
var WebWorker = class extends EventEmitter {
  /**
   * @internal
   */
  constructor(client, url, consoleAPICalled, exceptionThrown) {
    super();
    _WebWorker_executionContext.set(this, createDeferredPromise());
    _WebWorker_client.set(this, void 0);
    _WebWorker_url.set(this, void 0);
    __classPrivateFieldSet16(this, _WebWorker_client, client, "f");
    __classPrivateFieldSet16(this, _WebWorker_url, url, "f");
    __classPrivateFieldGet18(this, _WebWorker_client, "f").once("Runtime.executionContextCreated", async (event) => {
      const context = new ExecutionContext(client, event.context);
      __classPrivateFieldGet18(this, _WebWorker_executionContext, "f").resolve(context);
    });
    __classPrivateFieldGet18(this, _WebWorker_client, "f").on("Runtime.consoleAPICalled", async (event) => {
      const context = await __classPrivateFieldGet18(this, _WebWorker_executionContext, "f");
      return consoleAPICalled(event.type, event.args.map((object) => {
        return new JSHandle(context, object);
      }), event.stackTrace);
    });
    __classPrivateFieldGet18(this, _WebWorker_client, "f").on("Runtime.exceptionThrown", (exception) => {
      return exceptionThrown(exception.exceptionDetails);
    });
    __classPrivateFieldGet18(this, _WebWorker_client, "f").send("Runtime.enable").catch(debugError);
  }
  /**
   * @internal
   */
  async executionContext() {
    return __classPrivateFieldGet18(this, _WebWorker_executionContext, "f");
  }
  /**
   * @returns The URL of this web worker.
   */
  url() {
    return __classPrivateFieldGet18(this, _WebWorker_url, "f");
  }
  /**
   * If the function passed to the `worker.evaluate` returns a Promise, then
   * `worker.evaluate` would wait for the promise to resolve and return its
   * value. If the function passed to the `worker.evaluate` returns a
   * non-serializable value, then `worker.evaluate` resolves to `undefined`.
   * DevTools Protocol also supports transferring some additional values that
   * are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and
   * bigint literals.
   * Shortcut for `await worker.executionContext()).evaluate(pageFunction, ...args)`.
   *
   * @param pageFunction - Function to be evaluated in the worker context.
   * @param args - Arguments to pass to `pageFunction`.
   * @returns Promise which resolves to the return value of `pageFunction`.
   */
  async evaluate(pageFunction, ...args) {
    const context = await __classPrivateFieldGet18(this, _WebWorker_executionContext, "f");
    return context.evaluate(pageFunction, ...args);
  }
  /**
   * The only difference between `worker.evaluate` and `worker.evaluateHandle`
   * is that `worker.evaluateHandle` returns in-page object (JSHandle). If the
   * function passed to the `worker.evaluateHandle` returns a `Promise`, then
   * `worker.evaluateHandle` would wait for the promise to resolve and return
   * its value. Shortcut for
   * `await worker.executionContext()).evaluateHandle(pageFunction, ...args)`
   *
   * @param pageFunction - Function to be evaluated in the page context.
   * @param args - Arguments to pass to `pageFunction`.
   * @returns Promise which resolves to the return value of `pageFunction`.
   */
  async evaluateHandle(pageFunction, ...args) {
    const context = await __classPrivateFieldGet18(this, _WebWorker_executionContext, "f");
    return context.evaluateHandle(pageFunction, ...args);
  }
};
_WebWorker_executionContext = /* @__PURE__ */ new WeakMap(), _WebWorker_client = /* @__PURE__ */ new WeakMap(), _WebWorker_url = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Page.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/api/Page.js
init_cjs_shim();
var __classPrivateFieldGet19 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Page_handlerMap;
var Page = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
    _Page_handlerMap.set(this, /* @__PURE__ */ new WeakMap());
  }
  /**
   * @returns `true` if drag events are being intercepted, `false` otherwise.
   */
  isDragInterceptionEnabled() {
    throw new Error("Not implemented");
  }
  /**
   * @returns `true` if the page has JavaScript enabled, `false` otherwise.
   */
  isJavaScriptEnabled() {
    throw new Error("Not implemented");
  }
  /**
   * Listen to page events.
   *
   * :::note
   *
   * This method exists to define event typings and handle proper wireup of
   * cooperative request interception. Actual event listening and dispatching is
   * delegated to {@link EventEmitter}.
   *
   * :::
   */
  on(eventName, handler) {
    if (eventName === "request") {
      const wrap = __classPrivateFieldGet19(this, _Page_handlerMap, "f").get(handler) || ((event) => {
        event.enqueueInterceptAction(() => {
          return handler(event);
        });
      });
      __classPrivateFieldGet19(this, _Page_handlerMap, "f").set(handler, wrap);
      return super.on(eventName, wrap);
    }
    return super.on(eventName, handler);
  }
  once(eventName, handler) {
    return super.once(eventName, handler);
  }
  off(eventName, handler) {
    if (eventName === "request") {
      handler = __classPrivateFieldGet19(this, _Page_handlerMap, "f").get(handler) || handler;
    }
    return super.off(eventName, handler);
  }
  waitForFileChooser() {
    throw new Error("Not implemented");
  }
  async setGeolocation() {
    throw new Error("Not implemented");
  }
  /**
   * @returns A target this page was created from.
   */
  target() {
    throw new Error("Not implemented");
  }
  /**
   * Get the browser the page belongs to.
   */
  browser() {
    throw new Error("Not implemented");
  }
  /**
   * Get the browser context that the page belongs to.
   */
  browserContext() {
    throw new Error("Not implemented");
  }
  /**
   * @returns The page's main frame.
   *
   * @remarks
   * Page is guaranteed to have a main frame which persists during navigations.
   */
  mainFrame() {
    throw new Error("Not implemented");
  }
  get keyboard() {
    throw new Error("Not implemented");
  }
  get touchscreen() {
    throw new Error("Not implemented");
  }
  get coverage() {
    throw new Error("Not implemented");
  }
  get tracing() {
    throw new Error("Not implemented");
  }
  get accessibility() {
    throw new Error("Not implemented");
  }
  /**
   * @returns An array of all frames attached to the page.
   */
  frames() {
    throw new Error("Not implemented");
  }
  /**
   * @returns all of the dedicated {@link
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API |
   * WebWorkers} associated with the page.
   *
   * @remarks
   * This does not contain ServiceWorkers
   */
  workers() {
    throw new Error("Not implemented");
  }
  async setRequestInterception() {
    throw new Error("Not implemented");
  }
  async setDragInterception() {
    throw new Error("Not implemented");
  }
  setOfflineMode() {
    throw new Error("Not implemented");
  }
  emulateNetworkConditions() {
    throw new Error("Not implemented");
  }
  setDefaultNavigationTimeout() {
    throw new Error("Not implemented");
  }
  setDefaultTimeout() {
    throw new Error("Not implemented");
  }
  /**
   * @returns Maximum time in milliseconds.
   */
  getDefaultTimeout() {
    throw new Error("Not implemented");
  }
  async $() {
    throw new Error("Not implemented");
  }
  async $$() {
    throw new Error("Not implemented");
  }
  async evaluateHandle() {
    throw new Error("Not implemented");
  }
  async queryObjects() {
    throw new Error("Not implemented");
  }
  async $eval() {
    throw new Error("Not implemented");
  }
  async $$eval() {
    throw new Error("Not implemented");
  }
  async $x() {
    throw new Error("Not implemented");
  }
  async cookies() {
    throw new Error("Not implemented");
  }
  async deleteCookie() {
    throw new Error("Not implemented");
  }
  async setCookie() {
    throw new Error("Not implemented");
  }
  async addScriptTag() {
    throw new Error("Not implemented");
  }
  async addStyleTag() {
    throw new Error("Not implemented");
  }
  async exposeFunction() {
    throw new Error("Not implemented");
  }
  async authenticate() {
    throw new Error("Not implemented");
  }
  async setExtraHTTPHeaders() {
    throw new Error("Not implemented");
  }
  async setUserAgent() {
    throw new Error("Not implemented");
  }
  /**
   * @returns Object containing metrics as key/value pairs.
   *
   * - `Timestamp` : The timestamp when the metrics sample was taken.
   *
   * - `Documents` : Number of documents in the page.
   *
   * - `Frames` : Number of frames in the page.
   *
   * - `JSEventListeners` : Number of events in the page.
   *
   * - `Nodes` : Number of DOM nodes in the page.
   *
   * - `LayoutCount` : Total number of full or partial page layout.
   *
   * - `RecalcStyleCount` : Total number of page style recalculations.
   *
   * - `LayoutDuration` : Combined durations of all page layouts.
   *
   * - `RecalcStyleDuration` : Combined duration of all page style
   *   recalculations.
   *
   * - `ScriptDuration` : Combined duration of JavaScript execution.
   *
   * - `TaskDuration` : Combined duration of all tasks performed by the browser.
   *
   * - `JSHeapUsedSize` : Used JavaScript heap size.
   *
   * - `JSHeapTotalSize` : Total JavaScript heap size.
   *
   * @remarks
   * All timestamps are in monotonic time: monotonically increasing time
   * in seconds since an arbitrary point in the past.
   */
  async metrics() {
    throw new Error("Not implemented");
  }
  /**
   *
   * @returns
   * @remarks Shortcut for
   * {@link Frame.url | page.mainFrame().url()}.
   */
  url() {
    throw new Error("Not implemented");
  }
  async content() {
    throw new Error("Not implemented");
  }
  async setContent() {
    throw new Error("Not implemented");
  }
  async goto() {
    throw new Error("Not implemented");
  }
  async reload() {
    throw new Error("Not implemented");
  }
  async waitForNavigation() {
    throw new Error("Not implemented");
  }
  async waitForRequest() {
    throw new Error("Not implemented");
  }
  async waitForResponse() {
    throw new Error("Not implemented");
  }
  async waitForNetworkIdle() {
    throw new Error("Not implemented");
  }
  async waitForFrame() {
    throw new Error("Not implemented");
  }
  async goBack() {
    throw new Error("Not implemented");
  }
  async goForward() {
    throw new Error("Not implemented");
  }
  /**
   * Brings page to front (activates tab).
   */
  async bringToFront() {
    throw new Error("Not implemented");
  }
  /**
   * Emulates a given device's metrics and user agent.
   *
   * To aid emulation, Puppeteer provides a list of known devices that can be
   * via {@link KnownDevices}.
   *
   * @remarks
   * This method is a shortcut for calling two methods:
   * {@link Page.setUserAgent} and {@link Page.setViewport}.
   *
   * @remarks
   * This method will resize the page. A lot of websites don't expect phones to
   * change size, so you should emulate before navigating to the page.
   *
   * @example
   *
   * ```ts
   * import {KnownDevices} from 'puppeteer';
   * const iPhone = KnownDevices['iPhone 6'];
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   await page.emulate(iPhone);
   *   await page.goto('https://www.google.com');
   *   // other actions...
   *   await browser.close();
   * })();
   * ```
   */
  async emulate(device) {
    await Promise.all([
      this.setUserAgent(device.userAgent),
      this.setViewport(device.viewport)
    ]);
  }
  async setJavaScriptEnabled() {
    throw new Error("Not implemented");
  }
  async setBypassCSP() {
    throw new Error("Not implemented");
  }
  async emulateMediaType() {
    throw new Error("Not implemented");
  }
  async emulateCPUThrottling() {
    throw new Error("Not implemented");
  }
  async emulateMediaFeatures() {
    throw new Error("Not implemented");
  }
  async emulateTimezone() {
    throw new Error("Not implemented");
  }
  async emulateIdleState() {
    throw new Error("Not implemented");
  }
  async emulateVisionDeficiency() {
    throw new Error("Not implemented");
  }
  async setViewport() {
    throw new Error("Not implemented");
  }
  /**
   * @returns
   *
   * - `width`: page's width in pixels
   *
   * - `height`: page's height in pixels
   *
   * - `deviceScalarFactor`: Specify device scale factor (can be though of as
   *   dpr). Defaults to `1`.
   *
   * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
   *   to `false`.
   *
   * - `hasTouch`: Specifies if viewport supports touch events. Defaults to
   *   `false`.
   *
   * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to
   *   `false`.
   */
  viewport() {
    throw new Error("Not implemented");
  }
  async evaluate() {
    throw new Error("Not implemented");
  }
  async evaluateOnNewDocument() {
    throw new Error("Not implemented");
  }
  async setCacheEnabled() {
    throw new Error("Not implemented");
  }
  async screenshot() {
    throw new Error("Not implemented");
  }
  async createPDFStream() {
    throw new Error("Not implemented");
  }
  async pdf() {
    throw new Error("Not implemented");
  }
  /**
   * @returns The page's title
   * @remarks
   * Shortcut for {@link Frame.title | page.mainFrame().title()}.
   */
  async title() {
    throw new Error("Not implemented");
  }
  async close() {
    throw new Error("Not implemented");
  }
  /**
   * Indicates that the page has been closed.
   * @returns
   */
  isClosed() {
    throw new Error("Not implemented");
  }
  get mouse() {
    throw new Error("Not implemented");
  }
  click() {
    throw new Error("Not implemented");
  }
  focus() {
    throw new Error("Not implemented");
  }
  hover() {
    throw new Error("Not implemented");
  }
  select() {
    throw new Error("Not implemented");
  }
  tap() {
    throw new Error("Not implemented");
  }
  type() {
    throw new Error("Not implemented");
  }
  waitForTimeout() {
    throw new Error("Not implemented");
  }
  async waitForSelector() {
    throw new Error("Not implemented");
  }
  waitForXPath() {
    throw new Error("Not implemented");
  }
  waitForFunction() {
    throw new Error("Not implemented");
  }
};
_Page_handlerMap = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Accessibility.js
init_cjs_shim();
var __classPrivateFieldSet17 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet20 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Accessibility_client;
var _AXNode_instances;
var _AXNode_richlyEditable;
var _AXNode_editable;
var _AXNode_focusable;
var _AXNode_hidden;
var _AXNode_name;
var _AXNode_role;
var _AXNode_ignored;
var _AXNode_cachedHasFocusableChild;
var _AXNode_isPlainTextField;
var _AXNode_isTextOnlyObject;
var _AXNode_hasFocusableChild;
var Accessibility = class {
  /**
   * @internal
   */
  constructor(client) {
    _Accessibility_client.set(this, void 0);
    __classPrivateFieldSet17(this, _Accessibility_client, client, "f");
  }
  /**
   * Captures the current state of the accessibility tree.
   * The returned object represents the root accessible node of the page.
   *
   * @remarks
   *
   * **NOTE** The Chromium accessibility tree contains nodes that go unused on
   * most platforms and by most screen readers. Puppeteer will discard them as
   * well for an easier to process tree, unless `interestingOnly` is set to
   * `false`.
   *
   * @example
   * An example of dumping the entire accessibility tree:
   *
   * ```ts
   * const snapshot = await page.accessibility.snapshot();
   * console.log(snapshot);
   * ```
   *
   * @example
   * An example of logging the focused node's name:
   *
   * ```ts
   * const snapshot = await page.accessibility.snapshot();
   * const node = findFocusedNode(snapshot);
   * console.log(node && node.name);
   *
   * function findFocusedNode(node) {
   *   if (node.focused) return node;
   *   for (const child of node.children || []) {
   *     const foundNode = findFocusedNode(child);
   *     return foundNode;
   *   }
   *   return null;
   * }
   * ```
   *
   * @returns An AXNode object representing the snapshot.
   */
  async snapshot(options = {}) {
    var _a2, _b;
    const { interestingOnly = true, root = null } = options;
    const { nodes } = await __classPrivateFieldGet20(this, _Accessibility_client, "f").send("Accessibility.getFullAXTree");
    let backendNodeId;
    if (root) {
      const { node } = await __classPrivateFieldGet20(this, _Accessibility_client, "f").send("DOM.describeNode", {
        objectId: root.remoteObject().objectId
      });
      backendNodeId = node.backendNodeId;
    }
    const defaultRoot = AXNode.createTree(nodes);
    let needle = defaultRoot;
    if (backendNodeId) {
      needle = defaultRoot.find((node) => {
        return node.payload.backendDOMNodeId === backendNodeId;
      });
      if (!needle) {
        return null;
      }
    }
    if (!interestingOnly) {
      return (_a2 = this.serializeTree(needle)[0]) !== null && _a2 !== void 0 ? _a2 : null;
    }
    const interestingNodes = /* @__PURE__ */ new Set();
    this.collectInterestingNodes(interestingNodes, defaultRoot, false);
    if (!interestingNodes.has(needle)) {
      return null;
    }
    return (_b = this.serializeTree(needle, interestingNodes)[0]) !== null && _b !== void 0 ? _b : null;
  }
  serializeTree(node, interestingNodes) {
    const children = [];
    for (const child of node.children) {
      children.push(...this.serializeTree(child, interestingNodes));
    }
    if (interestingNodes && !interestingNodes.has(node)) {
      return children;
    }
    const serializedNode = node.serialize();
    if (children.length) {
      serializedNode.children = children;
    }
    return [serializedNode];
  }
  collectInterestingNodes(collection, node, insideControl) {
    if (node.isInteresting(insideControl)) {
      collection.add(node);
    }
    if (node.isLeafNode()) {
      return;
    }
    insideControl = insideControl || node.isControl();
    for (const child of node.children) {
      this.collectInterestingNodes(collection, child, insideControl);
    }
  }
};
_Accessibility_client = /* @__PURE__ */ new WeakMap();
var AXNode = class {
  constructor(payload) {
    _AXNode_instances.add(this);
    this.children = [];
    _AXNode_richlyEditable.set(this, false);
    _AXNode_editable.set(this, false);
    _AXNode_focusable.set(this, false);
    _AXNode_hidden.set(this, false);
    _AXNode_name.set(this, void 0);
    _AXNode_role.set(this, void 0);
    _AXNode_ignored.set(this, void 0);
    _AXNode_cachedHasFocusableChild.set(this, void 0);
    this.payload = payload;
    __classPrivateFieldSet17(this, _AXNode_name, this.payload.name ? this.payload.name.value : "", "f");
    __classPrivateFieldSet17(this, _AXNode_role, this.payload.role ? this.payload.role.value : "Unknown", "f");
    __classPrivateFieldSet17(this, _AXNode_ignored, this.payload.ignored, "f");
    for (const property of this.payload.properties || []) {
      if (property.name === "editable") {
        __classPrivateFieldSet17(this, _AXNode_richlyEditable, property.value.value === "richtext", "f");
        __classPrivateFieldSet17(this, _AXNode_editable, true, "f");
      }
      if (property.name === "focusable") {
        __classPrivateFieldSet17(this, _AXNode_focusable, property.value.value, "f");
      }
      if (property.name === "hidden") {
        __classPrivateFieldSet17(this, _AXNode_hidden, property.value.value, "f");
      }
    }
  }
  find(predicate) {
    if (predicate(this)) {
      return this;
    }
    for (const child of this.children) {
      const result = child.find(predicate);
      if (result) {
        return result;
      }
    }
    return null;
  }
  isLeafNode() {
    if (!this.children.length) {
      return true;
    }
    if (__classPrivateFieldGet20(this, _AXNode_instances, "m", _AXNode_isPlainTextField).call(this) || __classPrivateFieldGet20(this, _AXNode_instances, "m", _AXNode_isTextOnlyObject).call(this)) {
      return true;
    }
    switch (__classPrivateFieldGet20(this, _AXNode_role, "f")) {
      case "doc-cover":
      case "graphics-symbol":
      case "img":
      case "Meter":
      case "scrollbar":
      case "slider":
      case "separator":
      case "progressbar":
        return true;
      default:
        break;
    }
    if (__classPrivateFieldGet20(this, _AXNode_instances, "m", _AXNode_hasFocusableChild).call(this)) {
      return false;
    }
    if (__classPrivateFieldGet20(this, _AXNode_focusable, "f") && __classPrivateFieldGet20(this, _AXNode_name, "f")) {
      return true;
    }
    if (__classPrivateFieldGet20(this, _AXNode_role, "f") === "heading" && __classPrivateFieldGet20(this, _AXNode_name, "f")) {
      return true;
    }
    return false;
  }
  isControl() {
    switch (__classPrivateFieldGet20(this, _AXNode_role, "f")) {
      case "button":
      case "checkbox":
      case "ColorWell":
      case "combobox":
      case "DisclosureTriangle":
      case "listbox":
      case "menu":
      case "menubar":
      case "menuitem":
      case "menuitemcheckbox":
      case "menuitemradio":
      case "radio":
      case "scrollbar":
      case "searchbox":
      case "slider":
      case "spinbutton":
      case "switch":
      case "tab":
      case "textbox":
      case "tree":
      case "treeitem":
        return true;
      default:
        return false;
    }
  }
  isInteresting(insideControl) {
    const role = __classPrivateFieldGet20(this, _AXNode_role, "f");
    if (role === "Ignored" || __classPrivateFieldGet20(this, _AXNode_hidden, "f") || __classPrivateFieldGet20(this, _AXNode_ignored, "f")) {
      return false;
    }
    if (__classPrivateFieldGet20(this, _AXNode_focusable, "f") || __classPrivateFieldGet20(this, _AXNode_richlyEditable, "f")) {
      return true;
    }
    if (this.isControl()) {
      return true;
    }
    if (insideControl) {
      return false;
    }
    return this.isLeafNode() && !!__classPrivateFieldGet20(this, _AXNode_name, "f");
  }
  serialize() {
    const properties = /* @__PURE__ */ new Map();
    for (const property of this.payload.properties || []) {
      properties.set(property.name.toLowerCase(), property.value.value);
    }
    if (this.payload.name) {
      properties.set("name", this.payload.name.value);
    }
    if (this.payload.value) {
      properties.set("value", this.payload.value.value);
    }
    if (this.payload.description) {
      properties.set("description", this.payload.description.value);
    }
    const node = {
      role: __classPrivateFieldGet20(this, _AXNode_role, "f")
    };
    const userStringProperties = [
      "name",
      "value",
      "description",
      "keyshortcuts",
      "roledescription",
      "valuetext"
    ];
    const getUserStringPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const userStringProperty of userStringProperties) {
      if (!properties.has(userStringProperty)) {
        continue;
      }
      node[userStringProperty] = getUserStringPropertyValue(userStringProperty);
    }
    const booleanProperties = [
      "disabled",
      "expanded",
      "focused",
      "modal",
      "multiline",
      "multiselectable",
      "readonly",
      "required",
      "selected"
    ];
    const getBooleanPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const booleanProperty of booleanProperties) {
      if (booleanProperty === "focused" && __classPrivateFieldGet20(this, _AXNode_role, "f") === "RootWebArea") {
        continue;
      }
      const value = getBooleanPropertyValue(booleanProperty);
      if (!value) {
        continue;
      }
      node[booleanProperty] = getBooleanPropertyValue(booleanProperty);
    }
    const tristateProperties = ["checked", "pressed"];
    for (const tristateProperty of tristateProperties) {
      if (!properties.has(tristateProperty)) {
        continue;
      }
      const value = properties.get(tristateProperty);
      node[tristateProperty] = value === "mixed" ? "mixed" : value === "true" ? true : false;
    }
    const numericalProperties = [
      "level",
      "valuemax",
      "valuemin"
    ];
    const getNumericalPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const numericalProperty of numericalProperties) {
      if (!properties.has(numericalProperty)) {
        continue;
      }
      node[numericalProperty] = getNumericalPropertyValue(numericalProperty);
    }
    const tokenProperties = [
      "autocomplete",
      "haspopup",
      "invalid",
      "orientation"
    ];
    const getTokenPropertyValue = (key) => {
      return properties.get(key);
    };
    for (const tokenProperty of tokenProperties) {
      const value = getTokenPropertyValue(tokenProperty);
      if (!value || value === "false") {
        continue;
      }
      node[tokenProperty] = getTokenPropertyValue(tokenProperty);
    }
    return node;
  }
  static createTree(payloads) {
    const nodeById = /* @__PURE__ */ new Map();
    for (const payload of payloads) {
      nodeById.set(payload.nodeId, new AXNode(payload));
    }
    for (const node of nodeById.values()) {
      for (const childId of node.payload.childIds || []) {
        node.children.push(nodeById.get(childId));
      }
    }
    return nodeById.values().next().value;
  }
};
_AXNode_richlyEditable = /* @__PURE__ */ new WeakMap(), _AXNode_editable = /* @__PURE__ */ new WeakMap(), _AXNode_focusable = /* @__PURE__ */ new WeakMap(), _AXNode_hidden = /* @__PURE__ */ new WeakMap(), _AXNode_name = /* @__PURE__ */ new WeakMap(), _AXNode_role = /* @__PURE__ */ new WeakMap(), _AXNode_ignored = /* @__PURE__ */ new WeakMap(), _AXNode_cachedHasFocusableChild = /* @__PURE__ */ new WeakMap(), _AXNode_instances = /* @__PURE__ */ new WeakSet(), _AXNode_isPlainTextField = function _AXNode_isPlainTextField2() {
  if (__classPrivateFieldGet20(this, _AXNode_richlyEditable, "f")) {
    return false;
  }
  if (__classPrivateFieldGet20(this, _AXNode_editable, "f")) {
    return true;
  }
  return __classPrivateFieldGet20(this, _AXNode_role, "f") === "textbox" || __classPrivateFieldGet20(this, _AXNode_role, "f") === "searchbox";
}, _AXNode_isTextOnlyObject = function _AXNode_isTextOnlyObject2() {
  const role = __classPrivateFieldGet20(this, _AXNode_role, "f");
  return role === "LineBreak" || role === "text" || role === "InlineTextBox";
}, _AXNode_hasFocusableChild = function _AXNode_hasFocusableChild2() {
  if (__classPrivateFieldGet20(this, _AXNode_cachedHasFocusableChild, "f") === void 0) {
    __classPrivateFieldSet17(this, _AXNode_cachedHasFocusableChild, false, "f");
    for (const child of this.children) {
      if (__classPrivateFieldGet20(child, _AXNode_focusable, "f") || __classPrivateFieldGet20(child, _AXNode_instances, "m", _AXNode_hasFocusableChild2).call(child)) {
        __classPrivateFieldSet17(this, _AXNode_cachedHasFocusableChild, true, "f");
        break;
      }
    }
  }
  return __classPrivateFieldGet20(this, _AXNode_cachedHasFocusableChild, "f");
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/ConsoleMessage.js
init_cjs_shim();
var __classPrivateFieldSet18 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet21 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ConsoleMessage_type;
var _ConsoleMessage_text;
var _ConsoleMessage_args;
var _ConsoleMessage_stackTraceLocations;
var ConsoleMessage = class {
  /**
   * @public
   */
  constructor(type, text, args, stackTraceLocations) {
    _ConsoleMessage_type.set(this, void 0);
    _ConsoleMessage_text.set(this, void 0);
    _ConsoleMessage_args.set(this, void 0);
    _ConsoleMessage_stackTraceLocations.set(this, void 0);
    __classPrivateFieldSet18(this, _ConsoleMessage_type, type, "f");
    __classPrivateFieldSet18(this, _ConsoleMessage_text, text, "f");
    __classPrivateFieldSet18(this, _ConsoleMessage_args, args, "f");
    __classPrivateFieldSet18(this, _ConsoleMessage_stackTraceLocations, stackTraceLocations, "f");
  }
  /**
   * @returns The type of the console message.
   */
  type() {
    return __classPrivateFieldGet21(this, _ConsoleMessage_type, "f");
  }
  /**
   * @returns The text of the console message.
   */
  text() {
    return __classPrivateFieldGet21(this, _ConsoleMessage_text, "f");
  }
  /**
   * @returns An array of arguments passed to the console.
   */
  args() {
    return __classPrivateFieldGet21(this, _ConsoleMessage_args, "f");
  }
  /**
   * @returns The location of the console message.
   */
  location() {
    var _a2;
    return (_a2 = __classPrivateFieldGet21(this, _ConsoleMessage_stackTraceLocations, "f")[0]) !== null && _a2 !== void 0 ? _a2 : {};
  }
  /**
   * @returns The array of locations on the stack of the console message.
   */
  stackTrace() {
    return __classPrivateFieldGet21(this, _ConsoleMessage_stackTraceLocations, "f");
  }
};
_ConsoleMessage_type = /* @__PURE__ */ new WeakMap(), _ConsoleMessage_text = /* @__PURE__ */ new WeakMap(), _ConsoleMessage_args = /* @__PURE__ */ new WeakMap(), _ConsoleMessage_stackTraceLocations = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Coverage.js
init_cjs_shim();
var __classPrivateFieldSet19 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet22 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Coverage_jsCoverage;
var _Coverage_cssCoverage;
var _JSCoverage_instances;
var _JSCoverage_client;
var _JSCoverage_enabled;
var _JSCoverage_scriptURLs;
var _JSCoverage_scriptSources;
var _JSCoverage_eventListeners;
var _JSCoverage_resetOnNavigation;
var _JSCoverage_reportAnonymousScripts;
var _JSCoverage_includeRawScriptCoverage;
var _JSCoverage_onExecutionContextsCleared;
var _JSCoverage_onScriptParsed;
var _CSSCoverage_instances;
var _CSSCoverage_client;
var _CSSCoverage_enabled;
var _CSSCoverage_stylesheetURLs;
var _CSSCoverage_stylesheetSources;
var _CSSCoverage_eventListeners;
var _CSSCoverage_resetOnNavigation;
var _CSSCoverage_onExecutionContextsCleared;
var _CSSCoverage_onStyleSheet;
var Coverage = class {
  constructor(client) {
    _Coverage_jsCoverage.set(this, void 0);
    _Coverage_cssCoverage.set(this, void 0);
    __classPrivateFieldSet19(this, _Coverage_jsCoverage, new JSCoverage(client), "f");
    __classPrivateFieldSet19(this, _Coverage_cssCoverage, new CSSCoverage(client), "f");
  }
  /**
   * @param options - Set of configurable options for coverage defaults to
   * `resetOnNavigation : true, reportAnonymousScripts : false,`
   * `includeRawScriptCoverage : false, useBlockCoverage : true`
   * @returns Promise that resolves when coverage is started.
   *
   * @remarks
   * Anonymous scripts are ones that don't have an associated url. These are
   * scripts that are dynamically created on the page using `eval` or
   * `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous
   * scripts URL will start with `debugger://VM` (unless a magic //# sourceURL
   * comment is present, in which case that will the be URL).
   */
  async startJSCoverage(options = {}) {
    return await __classPrivateFieldGet22(this, _Coverage_jsCoverage, "f").start(options);
  }
  /**
   * @returns Promise that resolves to the array of coverage reports for
   * all scripts.
   *
   * @remarks
   * JavaScript Coverage doesn't include anonymous scripts by default.
   * However, scripts with sourceURLs are reported.
   */
  async stopJSCoverage() {
    return await __classPrivateFieldGet22(this, _Coverage_jsCoverage, "f").stop();
  }
  /**
   * @param options - Set of configurable options for coverage, defaults to
   * `resetOnNavigation : true`
   * @returns Promise that resolves when coverage is started.
   */
  async startCSSCoverage(options = {}) {
    return await __classPrivateFieldGet22(this, _Coverage_cssCoverage, "f").start(options);
  }
  /**
   * @returns Promise that resolves to the array of coverage reports
   * for all stylesheets.
   * @remarks
   * CSS Coverage doesn't include dynamically injected style tags
   * without sourceURLs.
   */
  async stopCSSCoverage() {
    return await __classPrivateFieldGet22(this, _Coverage_cssCoverage, "f").stop();
  }
};
_Coverage_jsCoverage = /* @__PURE__ */ new WeakMap(), _Coverage_cssCoverage = /* @__PURE__ */ new WeakMap();
var JSCoverage = class {
  constructor(client) {
    _JSCoverage_instances.add(this);
    _JSCoverage_client.set(this, void 0);
    _JSCoverage_enabled.set(this, false);
    _JSCoverage_scriptURLs.set(this, /* @__PURE__ */ new Map());
    _JSCoverage_scriptSources.set(this, /* @__PURE__ */ new Map());
    _JSCoverage_eventListeners.set(this, []);
    _JSCoverage_resetOnNavigation.set(this, false);
    _JSCoverage_reportAnonymousScripts.set(this, false);
    _JSCoverage_includeRawScriptCoverage.set(this, false);
    __classPrivateFieldSet19(this, _JSCoverage_client, client, "f");
  }
  async start(options = {}) {
    assert(!__classPrivateFieldGet22(this, _JSCoverage_enabled, "f"), "JSCoverage is already enabled");
    const { resetOnNavigation = true, reportAnonymousScripts = false, includeRawScriptCoverage = false, useBlockCoverage = true } = options;
    __classPrivateFieldSet19(this, _JSCoverage_resetOnNavigation, resetOnNavigation, "f");
    __classPrivateFieldSet19(this, _JSCoverage_reportAnonymousScripts, reportAnonymousScripts, "f");
    __classPrivateFieldSet19(this, _JSCoverage_includeRawScriptCoverage, includeRawScriptCoverage, "f");
    __classPrivateFieldSet19(this, _JSCoverage_enabled, true, "f");
    __classPrivateFieldGet22(this, _JSCoverage_scriptURLs, "f").clear();
    __classPrivateFieldGet22(this, _JSCoverage_scriptSources, "f").clear();
    __classPrivateFieldSet19(this, _JSCoverage_eventListeners, [
      addEventListener(__classPrivateFieldGet22(this, _JSCoverage_client, "f"), "Debugger.scriptParsed", __classPrivateFieldGet22(this, _JSCoverage_instances, "m", _JSCoverage_onScriptParsed).bind(this)),
      addEventListener(__classPrivateFieldGet22(this, _JSCoverage_client, "f"), "Runtime.executionContextsCleared", __classPrivateFieldGet22(this, _JSCoverage_instances, "m", _JSCoverage_onExecutionContextsCleared).bind(this))
    ], "f");
    await Promise.all([
      __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Profiler.enable"),
      __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Profiler.startPreciseCoverage", {
        callCount: __classPrivateFieldGet22(this, _JSCoverage_includeRawScriptCoverage, "f"),
        detailed: useBlockCoverage
      }),
      __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Debugger.enable"),
      __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Debugger.setSkipAllPauses", { skip: true })
    ]);
  }
  async stop() {
    assert(__classPrivateFieldGet22(this, _JSCoverage_enabled, "f"), "JSCoverage is not enabled");
    __classPrivateFieldSet19(this, _JSCoverage_enabled, false, "f");
    const result = await Promise.all([
      __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Profiler.takePreciseCoverage"),
      __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Profiler.stopPreciseCoverage"),
      __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Profiler.disable"),
      __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Debugger.disable")
    ]);
    removeEventListeners(__classPrivateFieldGet22(this, _JSCoverage_eventListeners, "f"));
    const coverage = [];
    const profileResponse = result[0];
    for (const entry of profileResponse.result) {
      let url = __classPrivateFieldGet22(this, _JSCoverage_scriptURLs, "f").get(entry.scriptId);
      if (!url && __classPrivateFieldGet22(this, _JSCoverage_reportAnonymousScripts, "f")) {
        url = "debugger://VM" + entry.scriptId;
      }
      const text = __classPrivateFieldGet22(this, _JSCoverage_scriptSources, "f").get(entry.scriptId);
      if (text === void 0 || url === void 0) {
        continue;
      }
      const flattenRanges = [];
      for (const func of entry.functions) {
        flattenRanges.push(...func.ranges);
      }
      const ranges = convertToDisjointRanges(flattenRanges);
      if (!__classPrivateFieldGet22(this, _JSCoverage_includeRawScriptCoverage, "f")) {
        coverage.push({ url, ranges, text });
      } else {
        coverage.push({ url, ranges, text, rawScriptCoverage: entry });
      }
    }
    return coverage;
  }
};
_JSCoverage_client = /* @__PURE__ */ new WeakMap(), _JSCoverage_enabled = /* @__PURE__ */ new WeakMap(), _JSCoverage_scriptURLs = /* @__PURE__ */ new WeakMap(), _JSCoverage_scriptSources = /* @__PURE__ */ new WeakMap(), _JSCoverage_eventListeners = /* @__PURE__ */ new WeakMap(), _JSCoverage_resetOnNavigation = /* @__PURE__ */ new WeakMap(), _JSCoverage_reportAnonymousScripts = /* @__PURE__ */ new WeakMap(), _JSCoverage_includeRawScriptCoverage = /* @__PURE__ */ new WeakMap(), _JSCoverage_instances = /* @__PURE__ */ new WeakSet(), _JSCoverage_onExecutionContextsCleared = function _JSCoverage_onExecutionContextsCleared2() {
  if (!__classPrivateFieldGet22(this, _JSCoverage_resetOnNavigation, "f")) {
    return;
  }
  __classPrivateFieldGet22(this, _JSCoverage_scriptURLs, "f").clear();
  __classPrivateFieldGet22(this, _JSCoverage_scriptSources, "f").clear();
}, _JSCoverage_onScriptParsed = async function _JSCoverage_onScriptParsed2(event) {
  if (event.url === EVALUATION_SCRIPT_URL) {
    return;
  }
  if (!event.url && !__classPrivateFieldGet22(this, _JSCoverage_reportAnonymousScripts, "f")) {
    return;
  }
  try {
    const response = await __classPrivateFieldGet22(this, _JSCoverage_client, "f").send("Debugger.getScriptSource", {
      scriptId: event.scriptId
    });
    __classPrivateFieldGet22(this, _JSCoverage_scriptURLs, "f").set(event.scriptId, event.url);
    __classPrivateFieldGet22(this, _JSCoverage_scriptSources, "f").set(event.scriptId, response.scriptSource);
  } catch (error) {
    debugError(error);
  }
};
var CSSCoverage = class {
  constructor(client) {
    _CSSCoverage_instances.add(this);
    _CSSCoverage_client.set(this, void 0);
    _CSSCoverage_enabled.set(this, false);
    _CSSCoverage_stylesheetURLs.set(this, /* @__PURE__ */ new Map());
    _CSSCoverage_stylesheetSources.set(this, /* @__PURE__ */ new Map());
    _CSSCoverage_eventListeners.set(this, []);
    _CSSCoverage_resetOnNavigation.set(this, false);
    __classPrivateFieldSet19(this, _CSSCoverage_client, client, "f");
  }
  async start(options = {}) {
    assert(!__classPrivateFieldGet22(this, _CSSCoverage_enabled, "f"), "CSSCoverage is already enabled");
    const { resetOnNavigation = true } = options;
    __classPrivateFieldSet19(this, _CSSCoverage_resetOnNavigation, resetOnNavigation, "f");
    __classPrivateFieldSet19(this, _CSSCoverage_enabled, true, "f");
    __classPrivateFieldGet22(this, _CSSCoverage_stylesheetURLs, "f").clear();
    __classPrivateFieldGet22(this, _CSSCoverage_stylesheetSources, "f").clear();
    __classPrivateFieldSet19(this, _CSSCoverage_eventListeners, [
      addEventListener(__classPrivateFieldGet22(this, _CSSCoverage_client, "f"), "CSS.styleSheetAdded", __classPrivateFieldGet22(this, _CSSCoverage_instances, "m", _CSSCoverage_onStyleSheet).bind(this)),
      addEventListener(__classPrivateFieldGet22(this, _CSSCoverage_client, "f"), "Runtime.executionContextsCleared", __classPrivateFieldGet22(this, _CSSCoverage_instances, "m", _CSSCoverage_onExecutionContextsCleared).bind(this))
    ], "f");
    await Promise.all([
      __classPrivateFieldGet22(this, _CSSCoverage_client, "f").send("DOM.enable"),
      __classPrivateFieldGet22(this, _CSSCoverage_client, "f").send("CSS.enable"),
      __classPrivateFieldGet22(this, _CSSCoverage_client, "f").send("CSS.startRuleUsageTracking")
    ]);
  }
  async stop() {
    assert(__classPrivateFieldGet22(this, _CSSCoverage_enabled, "f"), "CSSCoverage is not enabled");
    __classPrivateFieldSet19(this, _CSSCoverage_enabled, false, "f");
    const ruleTrackingResponse = await __classPrivateFieldGet22(this, _CSSCoverage_client, "f").send("CSS.stopRuleUsageTracking");
    await Promise.all([
      __classPrivateFieldGet22(this, _CSSCoverage_client, "f").send("CSS.disable"),
      __classPrivateFieldGet22(this, _CSSCoverage_client, "f").send("DOM.disable")
    ]);
    removeEventListeners(__classPrivateFieldGet22(this, _CSSCoverage_eventListeners, "f"));
    const styleSheetIdToCoverage = /* @__PURE__ */ new Map();
    for (const entry of ruleTrackingResponse.ruleUsage) {
      let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
      if (!ranges) {
        ranges = [];
        styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
      }
      ranges.push({
        startOffset: entry.startOffset,
        endOffset: entry.endOffset,
        count: entry.used ? 1 : 0
      });
    }
    const coverage = [];
    for (const styleSheetId of __classPrivateFieldGet22(this, _CSSCoverage_stylesheetURLs, "f").keys()) {
      const url = __classPrivateFieldGet22(this, _CSSCoverage_stylesheetURLs, "f").get(styleSheetId);
      assert(typeof url !== "undefined", `Stylesheet URL is undefined (styleSheetId=${styleSheetId})`);
      const text = __classPrivateFieldGet22(this, _CSSCoverage_stylesheetSources, "f").get(styleSheetId);
      assert(typeof text !== "undefined", `Stylesheet text is undefined (styleSheetId=${styleSheetId})`);
      const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
      coverage.push({ url, ranges, text });
    }
    return coverage;
  }
};
_CSSCoverage_client = /* @__PURE__ */ new WeakMap(), _CSSCoverage_enabled = /* @__PURE__ */ new WeakMap(), _CSSCoverage_stylesheetURLs = /* @__PURE__ */ new WeakMap(), _CSSCoverage_stylesheetSources = /* @__PURE__ */ new WeakMap(), _CSSCoverage_eventListeners = /* @__PURE__ */ new WeakMap(), _CSSCoverage_resetOnNavigation = /* @__PURE__ */ new WeakMap(), _CSSCoverage_instances = /* @__PURE__ */ new WeakSet(), _CSSCoverage_onExecutionContextsCleared = function _CSSCoverage_onExecutionContextsCleared2() {
  if (!__classPrivateFieldGet22(this, _CSSCoverage_resetOnNavigation, "f")) {
    return;
  }
  __classPrivateFieldGet22(this, _CSSCoverage_stylesheetURLs, "f").clear();
  __classPrivateFieldGet22(this, _CSSCoverage_stylesheetSources, "f").clear();
}, _CSSCoverage_onStyleSheet = async function _CSSCoverage_onStyleSheet2(event) {
  const header = event.header;
  if (!header.sourceURL) {
    return;
  }
  try {
    const response = await __classPrivateFieldGet22(this, _CSSCoverage_client, "f").send("CSS.getStyleSheetText", {
      styleSheetId: header.styleSheetId
    });
    __classPrivateFieldGet22(this, _CSSCoverage_stylesheetURLs, "f").set(header.styleSheetId, header.sourceURL);
    __classPrivateFieldGet22(this, _CSSCoverage_stylesheetSources, "f").set(header.styleSheetId, response.text);
  } catch (error) {
    debugError(error);
  }
};
function convertToDisjointRanges(nestedRanges) {
  const points = [];
  for (const range of nestedRanges) {
    points.push({ offset: range.startOffset, type: 0, range });
    points.push({ offset: range.endOffset, type: 1, range });
  }
  points.sort((a, b) => {
    if (a.offset !== b.offset) {
      return a.offset - b.offset;
    }
    if (a.type !== b.type) {
      return b.type - a.type;
    }
    const aLength = a.range.endOffset - a.range.startOffset;
    const bLength = b.range.endOffset - b.range.startOffset;
    if (a.type === 0) {
      return bLength - aLength;
    }
    return aLength - bLength;
  });
  const hitCountStack = [];
  const results = [];
  let lastOffset = 0;
  for (const point of points) {
    if (hitCountStack.length && lastOffset < point.offset && hitCountStack[hitCountStack.length - 1] > 0) {
      const lastResult = results[results.length - 1];
      if (lastResult && lastResult.end === lastOffset) {
        lastResult.end = point.offset;
      } else {
        results.push({ start: lastOffset, end: point.offset });
      }
    }
    lastOffset = point.offset;
    if (point.type === 0) {
      hitCountStack.push(point.range.count);
    } else {
      hitCountStack.pop();
    }
  }
  return results.filter((range) => {
    return range.end - range.start > 0;
  });
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Dialog.js
init_cjs_shim();
var __classPrivateFieldSet20 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet23 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Dialog_client;
var _Dialog_type;
var _Dialog_message;
var _Dialog_defaultValue;
var _Dialog_handled;
var Dialog = class {
  /**
   * @internal
   */
  constructor(client, type, message, defaultValue = "") {
    _Dialog_client.set(this, void 0);
    _Dialog_type.set(this, void 0);
    _Dialog_message.set(this, void 0);
    _Dialog_defaultValue.set(this, void 0);
    _Dialog_handled.set(this, false);
    __classPrivateFieldSet20(this, _Dialog_client, client, "f");
    __classPrivateFieldSet20(this, _Dialog_type, type, "f");
    __classPrivateFieldSet20(this, _Dialog_message, message, "f");
    __classPrivateFieldSet20(this, _Dialog_defaultValue, defaultValue, "f");
  }
  /**
   * @returns The type of the dialog.
   */
  type() {
    return __classPrivateFieldGet23(this, _Dialog_type, "f");
  }
  /**
   * @returns The message displayed in the dialog.
   */
  message() {
    return __classPrivateFieldGet23(this, _Dialog_message, "f");
  }
  /**
   * @returns The default value of the prompt, or an empty string if the dialog
   * is not a `prompt`.
   */
  defaultValue() {
    return __classPrivateFieldGet23(this, _Dialog_defaultValue, "f");
  }
  /**
   * @param promptText - optional text that will be entered in the dialog
   * prompt. Has no effect if the dialog's type is not `prompt`.
   *
   * @returns A promise that resolves when the dialog has been accepted.
   */
  async accept(promptText) {
    assert(!__classPrivateFieldGet23(this, _Dialog_handled, "f"), "Cannot accept dialog which is already handled!");
    __classPrivateFieldSet20(this, _Dialog_handled, true, "f");
    await __classPrivateFieldGet23(this, _Dialog_client, "f").send("Page.handleJavaScriptDialog", {
      accept: true,
      promptText
    });
  }
  /**
   * @returns A promise which will resolve once the dialog has been dismissed
   */
  async dismiss() {
    assert(!__classPrivateFieldGet23(this, _Dialog_handled, "f"), "Cannot dismiss dialog which is already handled!");
    __classPrivateFieldSet20(this, _Dialog_handled, true, "f");
    await __classPrivateFieldGet23(this, _Dialog_client, "f").send("Page.handleJavaScriptDialog", {
      accept: false
    });
  }
};
_Dialog_client = /* @__PURE__ */ new WeakMap(), _Dialog_type = /* @__PURE__ */ new WeakMap(), _Dialog_message = /* @__PURE__ */ new WeakMap(), _Dialog_defaultValue = /* @__PURE__ */ new WeakMap(), _Dialog_handled = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/EmulationManager.js
init_cjs_shim();
var __classPrivateFieldSet21 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet24 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmulationManager_client;
var _EmulationManager_emulatingMobile;
var _EmulationManager_hasTouch;
var EmulationManager = class {
  constructor(client) {
    _EmulationManager_client.set(this, void 0);
    _EmulationManager_emulatingMobile.set(this, false);
    _EmulationManager_hasTouch.set(this, false);
    __classPrivateFieldSet21(this, _EmulationManager_client, client, "f");
  }
  async emulateViewport(viewport) {
    const mobile = viewport.isMobile || false;
    const width = viewport.width;
    const height = viewport.height;
    const deviceScaleFactor = viewport.deviceScaleFactor || 1;
    const screenOrientation = viewport.isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
    const hasTouch = viewport.hasTouch || false;
    await Promise.all([
      __classPrivateFieldGet24(this, _EmulationManager_client, "f").send("Emulation.setDeviceMetricsOverride", {
        mobile,
        width,
        height,
        deviceScaleFactor,
        screenOrientation
      }),
      __classPrivateFieldGet24(this, _EmulationManager_client, "f").send("Emulation.setTouchEmulationEnabled", {
        enabled: hasTouch
      })
    ]);
    const reloadNeeded = __classPrivateFieldGet24(this, _EmulationManager_emulatingMobile, "f") !== mobile || __classPrivateFieldGet24(this, _EmulationManager_hasTouch, "f") !== hasTouch;
    __classPrivateFieldSet21(this, _EmulationManager_emulatingMobile, mobile, "f");
    __classPrivateFieldSet21(this, _EmulationManager_hasTouch, hasTouch, "f");
    return reloadNeeded;
  }
};
_EmulationManager_client = /* @__PURE__ */ new WeakMap(), _EmulationManager_emulatingMobile = /* @__PURE__ */ new WeakMap(), _EmulationManager_hasTouch = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/FileChooser.js
init_cjs_shim();
var __classPrivateFieldSet22 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet25 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FileChooser_element;
var _FileChooser_multiple;
var _FileChooser_handled;
var FileChooser = class {
  /**
   * @internal
   */
  constructor(element, event) {
    _FileChooser_element.set(this, void 0);
    _FileChooser_multiple.set(this, void 0);
    _FileChooser_handled.set(this, false);
    __classPrivateFieldSet22(this, _FileChooser_element, element, "f");
    __classPrivateFieldSet22(this, _FileChooser_multiple, event.mode !== "selectSingle", "f");
  }
  /**
   * Whether file chooser allow for
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple | multiple}
   * file selection.
   */
  isMultiple() {
    return __classPrivateFieldGet25(this, _FileChooser_multiple, "f");
  }
  /**
   * Accept the file chooser request with given paths.
   *
   * @param filePaths - If some of the `filePaths` are relative paths, then
   * they are resolved relative to the
   * {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
   */
  async accept(filePaths) {
    assert(!__classPrivateFieldGet25(this, _FileChooser_handled, "f"), "Cannot accept FileChooser which is already handled!");
    __classPrivateFieldSet22(this, _FileChooser_handled, true, "f");
    await __classPrivateFieldGet25(this, _FileChooser_element, "f").uploadFile(...filePaths);
  }
  /**
   * Closes the file chooser without selecting any files.
   */
  cancel() {
    assert(!__classPrivateFieldGet25(this, _FileChooser_handled, "f"), "Cannot cancel FileChooser which is already handled!");
    __classPrivateFieldSet22(this, _FileChooser_handled, true, "f");
  }
};
_FileChooser_element = /* @__PURE__ */ new WeakMap(), _FileChooser_multiple = /* @__PURE__ */ new WeakMap(), _FileChooser_handled = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Input.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/USKeyboardLayout.js
init_cjs_shim();
var _keyDefinitions = {
  "0": { keyCode: 48, key: "0", code: "Digit0" },
  "1": { keyCode: 49, key: "1", code: "Digit1" },
  "2": { keyCode: 50, key: "2", code: "Digit2" },
  "3": { keyCode: 51, key: "3", code: "Digit3" },
  "4": { keyCode: 52, key: "4", code: "Digit4" },
  "5": { keyCode: 53, key: "5", code: "Digit5" },
  "6": { keyCode: 54, key: "6", code: "Digit6" },
  "7": { keyCode: 55, key: "7", code: "Digit7" },
  "8": { keyCode: 56, key: "8", code: "Digit8" },
  "9": { keyCode: 57, key: "9", code: "Digit9" },
  Power: { key: "Power", code: "Power" },
  Eject: { key: "Eject", code: "Eject" },
  Abort: { keyCode: 3, code: "Abort", key: "Cancel" },
  Help: { keyCode: 6, code: "Help", key: "Help" },
  Backspace: { keyCode: 8, code: "Backspace", key: "Backspace" },
  Tab: { keyCode: 9, code: "Tab", key: "Tab" },
  Numpad5: {
    keyCode: 12,
    shiftKeyCode: 101,
    key: "Clear",
    code: "Numpad5",
    shiftKey: "5",
    location: 3
  },
  NumpadEnter: {
    keyCode: 13,
    code: "NumpadEnter",
    key: "Enter",
    text: "\r",
    location: 3
  },
  Enter: { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  "\r": { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  "\n": { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  ShiftLeft: { keyCode: 16, code: "ShiftLeft", key: "Shift", location: 1 },
  ShiftRight: { keyCode: 16, code: "ShiftRight", key: "Shift", location: 2 },
  ControlLeft: {
    keyCode: 17,
    code: "ControlLeft",
    key: "Control",
    location: 1
  },
  ControlRight: {
    keyCode: 17,
    code: "ControlRight",
    key: "Control",
    location: 2
  },
  AltLeft: { keyCode: 18, code: "AltLeft", key: "Alt", location: 1 },
  AltRight: { keyCode: 18, code: "AltRight", key: "Alt", location: 2 },
  Pause: { keyCode: 19, code: "Pause", key: "Pause" },
  CapsLock: { keyCode: 20, code: "CapsLock", key: "CapsLock" },
  Escape: { keyCode: 27, code: "Escape", key: "Escape" },
  Convert: { keyCode: 28, code: "Convert", key: "Convert" },
  NonConvert: { keyCode: 29, code: "NonConvert", key: "NonConvert" },
  Space: { keyCode: 32, code: "Space", key: " " },
  Numpad9: {
    keyCode: 33,
    shiftKeyCode: 105,
    key: "PageUp",
    code: "Numpad9",
    shiftKey: "9",
    location: 3
  },
  PageUp: { keyCode: 33, code: "PageUp", key: "PageUp" },
  Numpad3: {
    keyCode: 34,
    shiftKeyCode: 99,
    key: "PageDown",
    code: "Numpad3",
    shiftKey: "3",
    location: 3
  },
  PageDown: { keyCode: 34, code: "PageDown", key: "PageDown" },
  End: { keyCode: 35, code: "End", key: "End" },
  Numpad1: {
    keyCode: 35,
    shiftKeyCode: 97,
    key: "End",
    code: "Numpad1",
    shiftKey: "1",
    location: 3
  },
  Home: { keyCode: 36, code: "Home", key: "Home" },
  Numpad7: {
    keyCode: 36,
    shiftKeyCode: 103,
    key: "Home",
    code: "Numpad7",
    shiftKey: "7",
    location: 3
  },
  ArrowLeft: { keyCode: 37, code: "ArrowLeft", key: "ArrowLeft" },
  Numpad4: {
    keyCode: 37,
    shiftKeyCode: 100,
    key: "ArrowLeft",
    code: "Numpad4",
    shiftKey: "4",
    location: 3
  },
  Numpad8: {
    keyCode: 38,
    shiftKeyCode: 104,
    key: "ArrowUp",
    code: "Numpad8",
    shiftKey: "8",
    location: 3
  },
  ArrowUp: { keyCode: 38, code: "ArrowUp", key: "ArrowUp" },
  ArrowRight: { keyCode: 39, code: "ArrowRight", key: "ArrowRight" },
  Numpad6: {
    keyCode: 39,
    shiftKeyCode: 102,
    key: "ArrowRight",
    code: "Numpad6",
    shiftKey: "6",
    location: 3
  },
  Numpad2: {
    keyCode: 40,
    shiftKeyCode: 98,
    key: "ArrowDown",
    code: "Numpad2",
    shiftKey: "2",
    location: 3
  },
  ArrowDown: { keyCode: 40, code: "ArrowDown", key: "ArrowDown" },
  Select: { keyCode: 41, code: "Select", key: "Select" },
  Open: { keyCode: 43, code: "Open", key: "Execute" },
  PrintScreen: { keyCode: 44, code: "PrintScreen", key: "PrintScreen" },
  Insert: { keyCode: 45, code: "Insert", key: "Insert" },
  Numpad0: {
    keyCode: 45,
    shiftKeyCode: 96,
    key: "Insert",
    code: "Numpad0",
    shiftKey: "0",
    location: 3
  },
  Delete: { keyCode: 46, code: "Delete", key: "Delete" },
  NumpadDecimal: {
    keyCode: 46,
    shiftKeyCode: 110,
    code: "NumpadDecimal",
    key: "\0",
    shiftKey: ".",
    location: 3
  },
  Digit0: { keyCode: 48, code: "Digit0", shiftKey: ")", key: "0" },
  Digit1: { keyCode: 49, code: "Digit1", shiftKey: "!", key: "1" },
  Digit2: { keyCode: 50, code: "Digit2", shiftKey: "@", key: "2" },
  Digit3: { keyCode: 51, code: "Digit3", shiftKey: "#", key: "3" },
  Digit4: { keyCode: 52, code: "Digit4", shiftKey: "$", key: "4" },
  Digit5: { keyCode: 53, code: "Digit5", shiftKey: "%", key: "5" },
  Digit6: { keyCode: 54, code: "Digit6", shiftKey: "^", key: "6" },
  Digit7: { keyCode: 55, code: "Digit7", shiftKey: "&", key: "7" },
  Digit8: { keyCode: 56, code: "Digit8", shiftKey: "*", key: "8" },
  Digit9: { keyCode: 57, code: "Digit9", shiftKey: "(", key: "9" },
  KeyA: { keyCode: 65, code: "KeyA", shiftKey: "A", key: "a" },
  KeyB: { keyCode: 66, code: "KeyB", shiftKey: "B", key: "b" },
  KeyC: { keyCode: 67, code: "KeyC", shiftKey: "C", key: "c" },
  KeyD: { keyCode: 68, code: "KeyD", shiftKey: "D", key: "d" },
  KeyE: { keyCode: 69, code: "KeyE", shiftKey: "E", key: "e" },
  KeyF: { keyCode: 70, code: "KeyF", shiftKey: "F", key: "f" },
  KeyG: { keyCode: 71, code: "KeyG", shiftKey: "G", key: "g" },
  KeyH: { keyCode: 72, code: "KeyH", shiftKey: "H", key: "h" },
  KeyI: { keyCode: 73, code: "KeyI", shiftKey: "I", key: "i" },
  KeyJ: { keyCode: 74, code: "KeyJ", shiftKey: "J", key: "j" },
  KeyK: { keyCode: 75, code: "KeyK", shiftKey: "K", key: "k" },
  KeyL: { keyCode: 76, code: "KeyL", shiftKey: "L", key: "l" },
  KeyM: { keyCode: 77, code: "KeyM", shiftKey: "M", key: "m" },
  KeyN: { keyCode: 78, code: "KeyN", shiftKey: "N", key: "n" },
  KeyO: { keyCode: 79, code: "KeyO", shiftKey: "O", key: "o" },
  KeyP: { keyCode: 80, code: "KeyP", shiftKey: "P", key: "p" },
  KeyQ: { keyCode: 81, code: "KeyQ", shiftKey: "Q", key: "q" },
  KeyR: { keyCode: 82, code: "KeyR", shiftKey: "R", key: "r" },
  KeyS: { keyCode: 83, code: "KeyS", shiftKey: "S", key: "s" },
  KeyT: { keyCode: 84, code: "KeyT", shiftKey: "T", key: "t" },
  KeyU: { keyCode: 85, code: "KeyU", shiftKey: "U", key: "u" },
  KeyV: { keyCode: 86, code: "KeyV", shiftKey: "V", key: "v" },
  KeyW: { keyCode: 87, code: "KeyW", shiftKey: "W", key: "w" },
  KeyX: { keyCode: 88, code: "KeyX", shiftKey: "X", key: "x" },
  KeyY: { keyCode: 89, code: "KeyY", shiftKey: "Y", key: "y" },
  KeyZ: { keyCode: 90, code: "KeyZ", shiftKey: "Z", key: "z" },
  MetaLeft: { keyCode: 91, code: "MetaLeft", key: "Meta", location: 1 },
  MetaRight: { keyCode: 92, code: "MetaRight", key: "Meta", location: 2 },
  ContextMenu: { keyCode: 93, code: "ContextMenu", key: "ContextMenu" },
  NumpadMultiply: {
    keyCode: 106,
    code: "NumpadMultiply",
    key: "*",
    location: 3
  },
  NumpadAdd: { keyCode: 107, code: "NumpadAdd", key: "+", location: 3 },
  NumpadSubtract: {
    keyCode: 109,
    code: "NumpadSubtract",
    key: "-",
    location: 3
  },
  NumpadDivide: { keyCode: 111, code: "NumpadDivide", key: "/", location: 3 },
  F1: { keyCode: 112, code: "F1", key: "F1" },
  F2: { keyCode: 113, code: "F2", key: "F2" },
  F3: { keyCode: 114, code: "F3", key: "F3" },
  F4: { keyCode: 115, code: "F4", key: "F4" },
  F5: { keyCode: 116, code: "F5", key: "F5" },
  F6: { keyCode: 117, code: "F6", key: "F6" },
  F7: { keyCode: 118, code: "F7", key: "F7" },
  F8: { keyCode: 119, code: "F8", key: "F8" },
  F9: { keyCode: 120, code: "F9", key: "F9" },
  F10: { keyCode: 121, code: "F10", key: "F10" },
  F11: { keyCode: 122, code: "F11", key: "F11" },
  F12: { keyCode: 123, code: "F12", key: "F12" },
  F13: { keyCode: 124, code: "F13", key: "F13" },
  F14: { keyCode: 125, code: "F14", key: "F14" },
  F15: { keyCode: 126, code: "F15", key: "F15" },
  F16: { keyCode: 127, code: "F16", key: "F16" },
  F17: { keyCode: 128, code: "F17", key: "F17" },
  F18: { keyCode: 129, code: "F18", key: "F18" },
  F19: { keyCode: 130, code: "F19", key: "F19" },
  F20: { keyCode: 131, code: "F20", key: "F20" },
  F21: { keyCode: 132, code: "F21", key: "F21" },
  F22: { keyCode: 133, code: "F22", key: "F22" },
  F23: { keyCode: 134, code: "F23", key: "F23" },
  F24: { keyCode: 135, code: "F24", key: "F24" },
  NumLock: { keyCode: 144, code: "NumLock", key: "NumLock" },
  ScrollLock: { keyCode: 145, code: "ScrollLock", key: "ScrollLock" },
  AudioVolumeMute: {
    keyCode: 173,
    code: "AudioVolumeMute",
    key: "AudioVolumeMute"
  },
  AudioVolumeDown: {
    keyCode: 174,
    code: "AudioVolumeDown",
    key: "AudioVolumeDown"
  },
  AudioVolumeUp: { keyCode: 175, code: "AudioVolumeUp", key: "AudioVolumeUp" },
  MediaTrackNext: {
    keyCode: 176,
    code: "MediaTrackNext",
    key: "MediaTrackNext"
  },
  MediaTrackPrevious: {
    keyCode: 177,
    code: "MediaTrackPrevious",
    key: "MediaTrackPrevious"
  },
  MediaStop: { keyCode: 178, code: "MediaStop", key: "MediaStop" },
  MediaPlayPause: {
    keyCode: 179,
    code: "MediaPlayPause",
    key: "MediaPlayPause"
  },
  Semicolon: { keyCode: 186, code: "Semicolon", shiftKey: ":", key: ";" },
  Equal: { keyCode: 187, code: "Equal", shiftKey: "+", key: "=" },
  NumpadEqual: { keyCode: 187, code: "NumpadEqual", key: "=", location: 3 },
  Comma: { keyCode: 188, code: "Comma", shiftKey: "<", key: "," },
  Minus: { keyCode: 189, code: "Minus", shiftKey: "_", key: "-" },
  Period: { keyCode: 190, code: "Period", shiftKey: ">", key: "." },
  Slash: { keyCode: 191, code: "Slash", shiftKey: "?", key: "/" },
  Backquote: { keyCode: 192, code: "Backquote", shiftKey: "~", key: "`" },
  BracketLeft: { keyCode: 219, code: "BracketLeft", shiftKey: "{", key: "[" },
  Backslash: { keyCode: 220, code: "Backslash", shiftKey: "|", key: "\\" },
  BracketRight: { keyCode: 221, code: "BracketRight", shiftKey: "}", key: "]" },
  Quote: { keyCode: 222, code: "Quote", shiftKey: '"', key: "'" },
  AltGraph: { keyCode: 225, code: "AltGraph", key: "AltGraph" },
  Props: { keyCode: 247, code: "Props", key: "CrSel" },
  Cancel: { keyCode: 3, key: "Cancel", code: "Abort" },
  Clear: { keyCode: 12, key: "Clear", code: "Numpad5", location: 3 },
  Shift: { keyCode: 16, key: "Shift", code: "ShiftLeft", location: 1 },
  Control: { keyCode: 17, key: "Control", code: "ControlLeft", location: 1 },
  Alt: { keyCode: 18, key: "Alt", code: "AltLeft", location: 1 },
  Accept: { keyCode: 30, key: "Accept" },
  ModeChange: { keyCode: 31, key: "ModeChange" },
  " ": { keyCode: 32, key: " ", code: "Space" },
  Print: { keyCode: 42, key: "Print" },
  Execute: { keyCode: 43, key: "Execute", code: "Open" },
  "\0": { keyCode: 46, key: "\0", code: "NumpadDecimal", location: 3 },
  a: { keyCode: 65, key: "a", code: "KeyA" },
  b: { keyCode: 66, key: "b", code: "KeyB" },
  c: { keyCode: 67, key: "c", code: "KeyC" },
  d: { keyCode: 68, key: "d", code: "KeyD" },
  e: { keyCode: 69, key: "e", code: "KeyE" },
  f: { keyCode: 70, key: "f", code: "KeyF" },
  g: { keyCode: 71, key: "g", code: "KeyG" },
  h: { keyCode: 72, key: "h", code: "KeyH" },
  i: { keyCode: 73, key: "i", code: "KeyI" },
  j: { keyCode: 74, key: "j", code: "KeyJ" },
  k: { keyCode: 75, key: "k", code: "KeyK" },
  l: { keyCode: 76, key: "l", code: "KeyL" },
  m: { keyCode: 77, key: "m", code: "KeyM" },
  n: { keyCode: 78, key: "n", code: "KeyN" },
  o: { keyCode: 79, key: "o", code: "KeyO" },
  p: { keyCode: 80, key: "p", code: "KeyP" },
  q: { keyCode: 81, key: "q", code: "KeyQ" },
  r: { keyCode: 82, key: "r", code: "KeyR" },
  s: { keyCode: 83, key: "s", code: "KeyS" },
  t: { keyCode: 84, key: "t", code: "KeyT" },
  u: { keyCode: 85, key: "u", code: "KeyU" },
  v: { keyCode: 86, key: "v", code: "KeyV" },
  w: { keyCode: 87, key: "w", code: "KeyW" },
  x: { keyCode: 88, key: "x", code: "KeyX" },
  y: { keyCode: 89, key: "y", code: "KeyY" },
  z: { keyCode: 90, key: "z", code: "KeyZ" },
  Meta: { keyCode: 91, key: "Meta", code: "MetaLeft", location: 1 },
  "*": { keyCode: 106, key: "*", code: "NumpadMultiply", location: 3 },
  "+": { keyCode: 107, key: "+", code: "NumpadAdd", location: 3 },
  "-": { keyCode: 109, key: "-", code: "NumpadSubtract", location: 3 },
  "/": { keyCode: 111, key: "/", code: "NumpadDivide", location: 3 },
  ";": { keyCode: 186, key: ";", code: "Semicolon" },
  "=": { keyCode: 187, key: "=", code: "Equal" },
  ",": { keyCode: 188, key: ",", code: "Comma" },
  ".": { keyCode: 190, key: ".", code: "Period" },
  "`": { keyCode: 192, key: "`", code: "Backquote" },
  "[": { keyCode: 219, key: "[", code: "BracketLeft" },
  "\\": { keyCode: 220, key: "\\", code: "Backslash" },
  "]": { keyCode: 221, key: "]", code: "BracketRight" },
  "'": { keyCode: 222, key: "'", code: "Quote" },
  Attn: { keyCode: 246, key: "Attn" },
  CrSel: { keyCode: 247, key: "CrSel", code: "Props" },
  ExSel: { keyCode: 248, key: "ExSel" },
  EraseEof: { keyCode: 249, key: "EraseEof" },
  Play: { keyCode: 250, key: "Play" },
  ZoomOut: { keyCode: 251, key: "ZoomOut" },
  ")": { keyCode: 48, key: ")", code: "Digit0" },
  "!": { keyCode: 49, key: "!", code: "Digit1" },
  "@": { keyCode: 50, key: "@", code: "Digit2" },
  "#": { keyCode: 51, key: "#", code: "Digit3" },
  $: { keyCode: 52, key: "$", code: "Digit4" },
  "%": { keyCode: 53, key: "%", code: "Digit5" },
  "^": { keyCode: 54, key: "^", code: "Digit6" },
  "&": { keyCode: 55, key: "&", code: "Digit7" },
  "(": { keyCode: 57, key: "(", code: "Digit9" },
  A: { keyCode: 65, key: "A", code: "KeyA" },
  B: { keyCode: 66, key: "B", code: "KeyB" },
  C: { keyCode: 67, key: "C", code: "KeyC" },
  D: { keyCode: 68, key: "D", code: "KeyD" },
  E: { keyCode: 69, key: "E", code: "KeyE" },
  F: { keyCode: 70, key: "F", code: "KeyF" },
  G: { keyCode: 71, key: "G", code: "KeyG" },
  H: { keyCode: 72, key: "H", code: "KeyH" },
  I: { keyCode: 73, key: "I", code: "KeyI" },
  J: { keyCode: 74, key: "J", code: "KeyJ" },
  K: { keyCode: 75, key: "K", code: "KeyK" },
  L: { keyCode: 76, key: "L", code: "KeyL" },
  M: { keyCode: 77, key: "M", code: "KeyM" },
  N: { keyCode: 78, key: "N", code: "KeyN" },
  O: { keyCode: 79, key: "O", code: "KeyO" },
  P: { keyCode: 80, key: "P", code: "KeyP" },
  Q: { keyCode: 81, key: "Q", code: "KeyQ" },
  R: { keyCode: 82, key: "R", code: "KeyR" },
  S: { keyCode: 83, key: "S", code: "KeyS" },
  T: { keyCode: 84, key: "T", code: "KeyT" },
  U: { keyCode: 85, key: "U", code: "KeyU" },
  V: { keyCode: 86, key: "V", code: "KeyV" },
  W: { keyCode: 87, key: "W", code: "KeyW" },
  X: { keyCode: 88, key: "X", code: "KeyX" },
  Y: { keyCode: 89, key: "Y", code: "KeyY" },
  Z: { keyCode: 90, key: "Z", code: "KeyZ" },
  ":": { keyCode: 186, key: ":", code: "Semicolon" },
  "<": { keyCode: 188, key: "<", code: "Comma" },
  _: { keyCode: 189, key: "_", code: "Minus" },
  ">": { keyCode: 190, key: ">", code: "Period" },
  "?": { keyCode: 191, key: "?", code: "Slash" },
  "~": { keyCode: 192, key: "~", code: "Backquote" },
  "{": { keyCode: 219, key: "{", code: "BracketLeft" },
  "|": { keyCode: 220, key: "|", code: "Backslash" },
  "}": { keyCode: 221, key: "}", code: "BracketRight" },
  '"': { keyCode: 222, key: '"', code: "Quote" },
  SoftLeft: { key: "SoftLeft", code: "SoftLeft", location: 4 },
  SoftRight: { key: "SoftRight", code: "SoftRight", location: 4 },
  Camera: { keyCode: 44, key: "Camera", code: "Camera", location: 4 },
  Call: { key: "Call", code: "Call", location: 4 },
  EndCall: { keyCode: 95, key: "EndCall", code: "EndCall", location: 4 },
  VolumeDown: {
    keyCode: 182,
    key: "VolumeDown",
    code: "VolumeDown",
    location: 4
  },
  VolumeUp: { keyCode: 183, key: "VolumeUp", code: "VolumeUp", location: 4 }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Input.js
var __classPrivateFieldSet23 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet26 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Keyboard_instances;
var _Keyboard_client;
var _Keyboard_pressedKeys;
var _Keyboard_modifierBit;
var _Keyboard_keyDescriptionForString;
var _Mouse_client;
var _Mouse_keyboard;
var _Mouse_x;
var _Mouse_y;
var _Mouse_button;
var _Touchscreen_client;
var _Touchscreen_keyboard;
var Keyboard = class {
  /**
   * @internal
   */
  constructor(client) {
    _Keyboard_instances.add(this);
    _Keyboard_client.set(this, void 0);
    _Keyboard_pressedKeys.set(this, /* @__PURE__ */ new Set());
    this._modifiers = 0;
    __classPrivateFieldSet23(this, _Keyboard_client, client, "f");
  }
  /**
   * Dispatches a `keydown` event.
   *
   * @remarks
   * If `key` is a single character and no modifier keys besides `Shift`
   * are being held down, a `keypress`/`input` event will also generated.
   * The `text` option can be specified to force an input event to be generated.
   * If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`,
   * subsequent key presses will be sent with that modifier active.
   * To release the modifier key, use {@link Keyboard.up}.
   *
   * After the key is pressed once, subsequent calls to
   * {@link Keyboard.down} will have
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat | repeat}
   * set to true. To release the key, use {@link Keyboard.up}.
   *
   * Modifier keys DO influence {@link Keyboard.down}.
   * Holding down `Shift` will type the text in upper case.
   *
   * @param key - Name of key to press, such as `ArrowLeft`.
   * See {@link KeyInput} for a list of all key names.
   *
   * @param options - An object of options. Accepts text which, if specified,
   * generates an input event with this text.
   */
  async down(key, options = { text: void 0 }) {
    const description = __classPrivateFieldGet26(this, _Keyboard_instances, "m", _Keyboard_keyDescriptionForString).call(this, key);
    const autoRepeat = __classPrivateFieldGet26(this, _Keyboard_pressedKeys, "f").has(description.code);
    __classPrivateFieldGet26(this, _Keyboard_pressedKeys, "f").add(description.code);
    this._modifiers |= __classPrivateFieldGet26(this, _Keyboard_instances, "m", _Keyboard_modifierBit).call(this, description.key);
    const text = options.text === void 0 ? description.text : options.text;
    await __classPrivateFieldGet26(this, _Keyboard_client, "f").send("Input.dispatchKeyEvent", {
      type: text ? "keyDown" : "rawKeyDown",
      modifiers: this._modifiers,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      key: description.key,
      text,
      unmodifiedText: text,
      autoRepeat,
      location: description.location,
      isKeypad: description.location === 3
    });
  }
  /**
   * Dispatches a `keyup` event.
   *
   * @param key - Name of key to release, such as `ArrowLeft`.
   * See {@link KeyInput | KeyInput}
   * for a list of all key names.
   */
  async up(key) {
    const description = __classPrivateFieldGet26(this, _Keyboard_instances, "m", _Keyboard_keyDescriptionForString).call(this, key);
    this._modifiers &= ~__classPrivateFieldGet26(this, _Keyboard_instances, "m", _Keyboard_modifierBit).call(this, description.key);
    __classPrivateFieldGet26(this, _Keyboard_pressedKeys, "f").delete(description.code);
    await __classPrivateFieldGet26(this, _Keyboard_client, "f").send("Input.dispatchKeyEvent", {
      type: "keyUp",
      modifiers: this._modifiers,
      key: description.key,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      location: description.location
    });
  }
  /**
   * Dispatches a `keypress` and `input` event.
   * This does not send a `keydown` or `keyup` event.
   *
   * @remarks
   * Modifier keys DO NOT effect {@link Keyboard.sendCharacter | Keyboard.sendCharacter}.
   * Holding down `Shift` will not type the text in upper case.
   *
   * @example
   *
   * ```ts
   * page.keyboard.sendCharacter('嗨');
   * ```
   *
   * @param char - Character to send into the page.
   */
  async sendCharacter(char) {
    await __classPrivateFieldGet26(this, _Keyboard_client, "f").send("Input.insertText", { text: char });
  }
  charIsKey(char) {
    return !!_keyDefinitions[char];
  }
  /**
   * Sends a `keydown`, `keypress`/`input`,
   * and `keyup` event for each character in the text.
   *
   * @remarks
   * To press a special key, like `Control` or `ArrowDown`,
   * use {@link Keyboard.press}.
   *
   * Modifier keys DO NOT effect `keyboard.type`.
   * Holding down `Shift` will not type the text in upper case.
   *
   * @example
   *
   * ```ts
   * await page.keyboard.type('Hello'); // Types instantly
   * await page.keyboard.type('World', {delay: 100}); // Types slower, like a user
   * ```
   *
   * @param text - A text to type into a focused element.
   * @param options - An object of options. Accepts delay which,
   * if specified, is the time to wait between `keydown` and `keyup` in milliseconds.
   * Defaults to 0.
   */
  async type(text, options = {}) {
    const delay = options.delay || void 0;
    for (const char of text) {
      if (this.charIsKey(char)) {
        await this.press(char, { delay });
      } else {
        if (delay) {
          await new Promise((f) => {
            return setTimeout(f, delay);
          });
        }
        await this.sendCharacter(char);
      }
    }
  }
  /**
   * Shortcut for {@link Keyboard.down}
   * and {@link Keyboard.up}.
   *
   * @remarks
   * If `key` is a single character and no modifier keys besides `Shift`
   * are being held down, a `keypress`/`input` event will also generated.
   * The `text` option can be specified to force an input event to be generated.
   *
   * Modifier keys DO effect {@link Keyboard.press}.
   * Holding down `Shift` will type the text in upper case.
   *
   * @param key - Name of key to press, such as `ArrowLeft`.
   * See {@link KeyInput} for a list of all key names.
   *
   * @param options - An object of options. Accepts text which, if specified,
   * generates an input event with this text. Accepts delay which,
   * if specified, is the time to wait between `keydown` and `keyup` in milliseconds.
   * Defaults to 0.
   */
  async press(key, options = {}) {
    const { delay = null } = options;
    await this.down(key, options);
    if (delay) {
      await new Promise((f) => {
        return setTimeout(f, options.delay);
      });
    }
    await this.up(key);
  }
};
_Keyboard_client = /* @__PURE__ */ new WeakMap(), _Keyboard_pressedKeys = /* @__PURE__ */ new WeakMap(), _Keyboard_instances = /* @__PURE__ */ new WeakSet(), _Keyboard_modifierBit = function _Keyboard_modifierBit2(key) {
  if (key === "Alt") {
    return 1;
  }
  if (key === "Control") {
    return 2;
  }
  if (key === "Meta") {
    return 4;
  }
  if (key === "Shift") {
    return 8;
  }
  return 0;
}, _Keyboard_keyDescriptionForString = function _Keyboard_keyDescriptionForString2(keyString) {
  const shift = this._modifiers & 8;
  const description = {
    key: "",
    keyCode: 0,
    code: "",
    text: "",
    location: 0
  };
  const definition = _keyDefinitions[keyString];
  assert(definition, `Unknown key: "${keyString}"`);
  if (definition.key) {
    description.key = definition.key;
  }
  if (shift && definition.shiftKey) {
    description.key = definition.shiftKey;
  }
  if (definition.keyCode) {
    description.keyCode = definition.keyCode;
  }
  if (shift && definition.shiftKeyCode) {
    description.keyCode = definition.shiftKeyCode;
  }
  if (definition.code) {
    description.code = definition.code;
  }
  if (definition.location) {
    description.location = definition.location;
  }
  if (description.key.length === 1) {
    description.text = description.key;
  }
  if (definition.text) {
    description.text = definition.text;
  }
  if (shift && definition.shiftText) {
    description.text = definition.shiftText;
  }
  if (this._modifiers & ~8) {
    description.text = "";
  }
  return description;
};
var Mouse = class {
  /**
   * @internal
   */
  constructor(client, keyboard) {
    _Mouse_client.set(this, void 0);
    _Mouse_keyboard.set(this, void 0);
    _Mouse_x.set(this, 0);
    _Mouse_y.set(this, 0);
    _Mouse_button.set(this, "none");
    __classPrivateFieldSet23(this, _Mouse_client, client, "f");
    __classPrivateFieldSet23(this, _Mouse_keyboard, keyboard, "f");
  }
  /**
   * Dispatches a `mousemove` event.
   * @param x - Horizontal position of the mouse.
   * @param y - Vertical position of the mouse.
   * @param options - Optional object. If specified, the `steps` property
   * sends intermediate `mousemove` events when set to `1` (default).
   */
  async move(x, y, options = {}) {
    const { steps = 1 } = options;
    const fromX = __classPrivateFieldGet26(this, _Mouse_x, "f"), fromY = __classPrivateFieldGet26(this, _Mouse_y, "f");
    __classPrivateFieldSet23(this, _Mouse_x, x, "f");
    __classPrivateFieldSet23(this, _Mouse_y, y, "f");
    for (let i = 1; i <= steps; i++) {
      await __classPrivateFieldGet26(this, _Mouse_client, "f").send("Input.dispatchMouseEvent", {
        type: "mouseMoved",
        button: __classPrivateFieldGet26(this, _Mouse_button, "f"),
        x: fromX + (__classPrivateFieldGet26(this, _Mouse_x, "f") - fromX) * (i / steps),
        y: fromY + (__classPrivateFieldGet26(this, _Mouse_y, "f") - fromY) * (i / steps),
        modifiers: __classPrivateFieldGet26(this, _Mouse_keyboard, "f")._modifiers
      });
    }
  }
  /**
   * Shortcut for `mouse.move`, `mouse.down` and `mouse.up`.
   * @param x - Horizontal position of the mouse.
   * @param y - Vertical position of the mouse.
   * @param options - Optional `MouseOptions`.
   */
  async click(x, y, options = {}) {
    const { delay = null } = options;
    if (delay !== null) {
      await this.move(x, y);
      await this.down(options);
      await new Promise((f) => {
        return setTimeout(f, delay);
      });
      await this.up(options);
    } else {
      await this.move(x, y);
      await this.down(options);
      await this.up(options);
    }
  }
  /**
   * Dispatches a `mousedown` event.
   * @param options - Optional `MouseOptions`.
   */
  async down(options = {}) {
    const { button = "left", clickCount = 1 } = options;
    __classPrivateFieldSet23(this, _Mouse_button, button, "f");
    await __classPrivateFieldGet26(this, _Mouse_client, "f").send("Input.dispatchMouseEvent", {
      type: "mousePressed",
      button,
      x: __classPrivateFieldGet26(this, _Mouse_x, "f"),
      y: __classPrivateFieldGet26(this, _Mouse_y, "f"),
      modifiers: __classPrivateFieldGet26(this, _Mouse_keyboard, "f")._modifiers,
      clickCount
    });
  }
  /**
   * Dispatches a `mouseup` event.
   * @param options - Optional `MouseOptions`.
   */
  async up(options = {}) {
    const { button = "left", clickCount = 1 } = options;
    __classPrivateFieldSet23(this, _Mouse_button, "none", "f");
    await __classPrivateFieldGet26(this, _Mouse_client, "f").send("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      button,
      x: __classPrivateFieldGet26(this, _Mouse_x, "f"),
      y: __classPrivateFieldGet26(this, _Mouse_y, "f"),
      modifiers: __classPrivateFieldGet26(this, _Mouse_keyboard, "f")._modifiers,
      clickCount
    });
  }
  /**
   * Dispatches a `mousewheel` event.
   * @param options - Optional: `MouseWheelOptions`.
   *
   * @example
   * An example of zooming into an element:
   *
   * ```ts
   * await page.goto(
   *   'https://mdn.mozillademos.org/en-US/docs/Web/API/Element/wheel_event$samples/Scaling_an_element_via_the_wheel?revision=1587366'
   * );
   *
   * const elem = await page.$('div');
   * const boundingBox = await elem.boundingBox();
   * await page.mouse.move(
   *   boundingBox.x + boundingBox.width / 2,
   *   boundingBox.y + boundingBox.height / 2
   * );
   *
   * await page.mouse.wheel({deltaY: -100});
   * ```
   */
  async wheel(options = {}) {
    const { deltaX = 0, deltaY = 0 } = options;
    await __classPrivateFieldGet26(this, _Mouse_client, "f").send("Input.dispatchMouseEvent", {
      type: "mouseWheel",
      x: __classPrivateFieldGet26(this, _Mouse_x, "f"),
      y: __classPrivateFieldGet26(this, _Mouse_y, "f"),
      deltaX,
      deltaY,
      modifiers: __classPrivateFieldGet26(this, _Mouse_keyboard, "f")._modifiers,
      pointerType: "mouse"
    });
  }
  /**
   * Dispatches a `drag` event.
   * @param start - starting point for drag
   * @param target - point to drag to
   */
  async drag(start, target) {
    const promise = new Promise((resolve2) => {
      __classPrivateFieldGet26(this, _Mouse_client, "f").once("Input.dragIntercepted", (event) => {
        return resolve2(event.data);
      });
    });
    await this.move(start.x, start.y);
    await this.down();
    await this.move(target.x, target.y);
    return promise;
  }
  /**
   * Dispatches a `dragenter` event.
   * @param target - point for emitting `dragenter` event
   * @param data - drag data containing items and operations mask
   */
  async dragEnter(target, data) {
    await __classPrivateFieldGet26(this, _Mouse_client, "f").send("Input.dispatchDragEvent", {
      type: "dragEnter",
      x: target.x,
      y: target.y,
      modifiers: __classPrivateFieldGet26(this, _Mouse_keyboard, "f")._modifiers,
      data
    });
  }
  /**
   * Dispatches a `dragover` event.
   * @param target - point for emitting `dragover` event
   * @param data - drag data containing items and operations mask
   */
  async dragOver(target, data) {
    await __classPrivateFieldGet26(this, _Mouse_client, "f").send("Input.dispatchDragEvent", {
      type: "dragOver",
      x: target.x,
      y: target.y,
      modifiers: __classPrivateFieldGet26(this, _Mouse_keyboard, "f")._modifiers,
      data
    });
  }
  /**
   * Performs a dragenter, dragover, and drop in sequence.
   * @param target - point to drop on
   * @param data - drag data containing items and operations mask
   */
  async drop(target, data) {
    await __classPrivateFieldGet26(this, _Mouse_client, "f").send("Input.dispatchDragEvent", {
      type: "drop",
      x: target.x,
      y: target.y,
      modifiers: __classPrivateFieldGet26(this, _Mouse_keyboard, "f")._modifiers,
      data
    });
  }
  /**
   * Performs a drag, dragenter, dragover, and drop in sequence.
   * @param start - point to drag from
   * @param target - point to drop on
   * @param options - An object of options. Accepts delay which,
   * if specified, is the time to wait between `dragover` and `drop` in milliseconds.
   * Defaults to 0.
   */
  async dragAndDrop(start, target, options = {}) {
    const { delay = null } = options;
    const data = await this.drag(start, target);
    await this.dragEnter(target, data);
    await this.dragOver(target, data);
    if (delay) {
      await new Promise((resolve2) => {
        return setTimeout(resolve2, delay);
      });
    }
    await this.drop(target, data);
    await this.up();
  }
};
_Mouse_client = /* @__PURE__ */ new WeakMap(), _Mouse_keyboard = /* @__PURE__ */ new WeakMap(), _Mouse_x = /* @__PURE__ */ new WeakMap(), _Mouse_y = /* @__PURE__ */ new WeakMap(), _Mouse_button = /* @__PURE__ */ new WeakMap();
var Touchscreen = class {
  /**
   * @internal
   */
  constructor(client, keyboard) {
    _Touchscreen_client.set(this, void 0);
    _Touchscreen_keyboard.set(this, void 0);
    __classPrivateFieldSet23(this, _Touchscreen_client, client, "f");
    __classPrivateFieldSet23(this, _Touchscreen_keyboard, keyboard, "f");
  }
  /**
   * Dispatches a `touchstart` and `touchend` event.
   * @param x - Horizontal position of the tap.
   * @param y - Vertical position of the tap.
   */
  async tap(x, y) {
    const touchPoints = [{ x: Math.round(x), y: Math.round(y) }];
    await __classPrivateFieldGet26(this, _Touchscreen_client, "f").send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints,
      modifiers: __classPrivateFieldGet26(this, _Touchscreen_keyboard, "f")._modifiers
    });
    await __classPrivateFieldGet26(this, _Touchscreen_client, "f").send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
      modifiers: __classPrivateFieldGet26(this, _Touchscreen_keyboard, "f")._modifiers
    });
  }
};
_Touchscreen_client = /* @__PURE__ */ new WeakMap(), _Touchscreen_keyboard = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/PDFOptions.js
init_cjs_shim();
var _paperFormats = {
  letter: { width: 8.5, height: 11 },
  legal: { width: 8.5, height: 14 },
  tabloid: { width: 11, height: 17 },
  ledger: { width: 17, height: 11 },
  a0: { width: 33.1, height: 46.8 },
  a1: { width: 23.4, height: 33.1 },
  a2: { width: 16.54, height: 23.4 },
  a3: { width: 11.7, height: 16.54 },
  a4: { width: 8.27, height: 11.7 },
  a5: { width: 5.83, height: 8.27 },
  a6: { width: 4.13, height: 5.83 }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/TimeoutSettings.js
init_cjs_shim();
var __classPrivateFieldSet24 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet27 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TimeoutSettings_defaultTimeout;
var _TimeoutSettings_defaultNavigationTimeout;
var DEFAULT_TIMEOUT = 3e4;
var TimeoutSettings = class {
  constructor() {
    _TimeoutSettings_defaultTimeout.set(this, void 0);
    _TimeoutSettings_defaultNavigationTimeout.set(this, void 0);
    __classPrivateFieldSet24(this, _TimeoutSettings_defaultTimeout, null, "f");
    __classPrivateFieldSet24(this, _TimeoutSettings_defaultNavigationTimeout, null, "f");
  }
  setDefaultTimeout(timeout) {
    __classPrivateFieldSet24(this, _TimeoutSettings_defaultTimeout, timeout, "f");
  }
  setDefaultNavigationTimeout(timeout) {
    __classPrivateFieldSet24(this, _TimeoutSettings_defaultNavigationTimeout, timeout, "f");
  }
  navigationTimeout() {
    if (__classPrivateFieldGet27(this, _TimeoutSettings_defaultNavigationTimeout, "f") !== null) {
      return __classPrivateFieldGet27(this, _TimeoutSettings_defaultNavigationTimeout, "f");
    }
    if (__classPrivateFieldGet27(this, _TimeoutSettings_defaultTimeout, "f") !== null) {
      return __classPrivateFieldGet27(this, _TimeoutSettings_defaultTimeout, "f");
    }
    return DEFAULT_TIMEOUT;
  }
  timeout() {
    if (__classPrivateFieldGet27(this, _TimeoutSettings_defaultTimeout, "f") !== null) {
      return __classPrivateFieldGet27(this, _TimeoutSettings_defaultTimeout, "f");
    }
    return DEFAULT_TIMEOUT;
  }
};
_TimeoutSettings_defaultTimeout = /* @__PURE__ */ new WeakMap(), _TimeoutSettings_defaultNavigationTimeout = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Tracing.js
init_cjs_shim();
var __classPrivateFieldSet25 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet28 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tracing_client;
var _Tracing_recording;
var _Tracing_path;
var Tracing = class {
  /**
   * @internal
   */
  constructor(client) {
    _Tracing_client.set(this, void 0);
    _Tracing_recording.set(this, false);
    _Tracing_path.set(this, void 0);
    __classPrivateFieldSet25(this, _Tracing_client, client, "f");
  }
  /**
   * Starts a trace for the current page.
   * @remarks
   * Only one trace can be active at a time per browser.
   *
   * @param options - Optional `TracingOptions`.
   */
  async start(options = {}) {
    assert(!__classPrivateFieldGet28(this, _Tracing_recording, "f"), "Cannot start recording trace while already recording trace.");
    const defaultCategories = [
      "-*",
      "devtools.timeline",
      "v8.execute",
      "disabled-by-default-devtools.timeline",
      "disabled-by-default-devtools.timeline.frame",
      "toplevel",
      "blink.console",
      "blink.user_timing",
      "latencyInfo",
      "disabled-by-default-devtools.timeline.stack",
      "disabled-by-default-v8.cpu_profiler"
    ];
    const { path: path5, screenshots = false, categories = defaultCategories } = options;
    if (screenshots) {
      categories.push("disabled-by-default-devtools.screenshot");
    }
    const excludedCategories = categories.filter((cat) => {
      return cat.startsWith("-");
    }).map((cat) => {
      return cat.slice(1);
    });
    const includedCategories = categories.filter((cat) => {
      return !cat.startsWith("-");
    });
    __classPrivateFieldSet25(this, _Tracing_path, path5, "f");
    __classPrivateFieldSet25(this, _Tracing_recording, true, "f");
    await __classPrivateFieldGet28(this, _Tracing_client, "f").send("Tracing.start", {
      transferMode: "ReturnAsStream",
      traceConfig: {
        excludedCategories,
        includedCategories
      }
    });
  }
  /**
   * Stops a trace started with the `start` method.
   * @returns Promise which resolves to buffer with trace data.
   */
  async stop() {
    let resolve2;
    let reject;
    const contentPromise = new Promise((x, y) => {
      resolve2 = x;
      reject = y;
    });
    __classPrivateFieldGet28(this, _Tracing_client, "f").once("Tracing.tracingComplete", async (event) => {
      try {
        const readable = await getReadableFromProtocolStream(__classPrivateFieldGet28(this, _Tracing_client, "f"), event.stream);
        const buffer = await getReadableAsBuffer(readable, __classPrivateFieldGet28(this, _Tracing_path, "f"));
        resolve2(buffer !== null && buffer !== void 0 ? buffer : void 0);
      } catch (error) {
        if (isErrorLike(error)) {
          reject(error);
        } else {
          reject(new Error(`Unknown error: ${error}`));
        }
      }
    });
    await __classPrivateFieldGet28(this, _Tracing_client, "f").send("Tracing.end");
    __classPrivateFieldSet25(this, _Tracing_recording, false, "f");
    return contentPromise;
  }
};
_Tracing_client = /* @__PURE__ */ new WeakMap(), _Tracing_recording = /* @__PURE__ */ new WeakMap(), _Tracing_path = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Page.js
var __classPrivateFieldSet26 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet29 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CDPPage_instances;
var _CDPPage_closed;
var _CDPPage_client;
var _CDPPage_target;
var _CDPPage_keyboard;
var _CDPPage_mouse;
var _CDPPage_timeoutSettings;
var _CDPPage_touchscreen;
var _CDPPage_accessibility;
var _CDPPage_frameManager;
var _CDPPage_emulationManager;
var _CDPPage_tracing;
var _CDPPage_pageBindings;
var _CDPPage_coverage;
var _CDPPage_javascriptEnabled;
var _CDPPage_viewport;
var _CDPPage_screenshotTaskQueue;
var _CDPPage_workers;
var _CDPPage_fileChooserPromises;
var _CDPPage_disconnectPromise;
var _CDPPage_userDragInterceptionEnabled;
var _CDPPage_onDetachedFromTarget;
var _CDPPage_onAttachedToTarget;
var _CDPPage_initialize;
var _CDPPage_onFileChooser;
var _CDPPage_onTargetCrashed;
var _CDPPage_onLogEntryAdded;
var _CDPPage_emitMetrics;
var _CDPPage_buildMetricsObject;
var _CDPPage_handleException;
var _CDPPage_onConsoleAPI;
var _CDPPage_onBindingCalled;
var _CDPPage_addConsoleMessage;
var _CDPPage_onDialog;
var _CDPPage_resetDefaultBackgroundColor;
var _CDPPage_setTransparentBackgroundColor;
var _CDPPage_sessionClosePromise;
var _CDPPage_go;
var _CDPPage_screenshotTask;
var CDPPage = class extends Page {
  /**
   * @internal
   */
  constructor(client, target, ignoreHTTPSErrors, screenshotTaskQueue) {
    super();
    _CDPPage_instances.add(this);
    _CDPPage_closed.set(this, false);
    _CDPPage_client.set(this, void 0);
    _CDPPage_target.set(this, void 0);
    _CDPPage_keyboard.set(this, void 0);
    _CDPPage_mouse.set(this, void 0);
    _CDPPage_timeoutSettings.set(this, new TimeoutSettings());
    _CDPPage_touchscreen.set(this, void 0);
    _CDPPage_accessibility.set(this, void 0);
    _CDPPage_frameManager.set(this, void 0);
    _CDPPage_emulationManager.set(this, void 0);
    _CDPPage_tracing.set(this, void 0);
    _CDPPage_pageBindings.set(this, /* @__PURE__ */ new Map());
    _CDPPage_coverage.set(this, void 0);
    _CDPPage_javascriptEnabled.set(this, true);
    _CDPPage_viewport.set(this, void 0);
    _CDPPage_screenshotTaskQueue.set(this, void 0);
    _CDPPage_workers.set(this, /* @__PURE__ */ new Map());
    _CDPPage_fileChooserPromises.set(this, /* @__PURE__ */ new Set());
    _CDPPage_disconnectPromise.set(this, void 0);
    _CDPPage_userDragInterceptionEnabled.set(this, false);
    _CDPPage_onDetachedFromTarget.set(this, (target2) => {
      var _a2;
      const sessionId = (_a2 = target2._session()) === null || _a2 === void 0 ? void 0 : _a2.id();
      __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").onDetachedFromTarget(target2);
      const worker = __classPrivateFieldGet29(this, _CDPPage_workers, "f").get(sessionId);
      if (!worker) {
        return;
      }
      __classPrivateFieldGet29(this, _CDPPage_workers, "f").delete(sessionId);
      this.emit("workerdestroyed", worker);
    });
    _CDPPage_onAttachedToTarget.set(this, async (createdTarget) => {
      __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").onAttachedToTarget(createdTarget);
      if (createdTarget._getTargetInfo().type === "worker") {
        const session = createdTarget._session();
        assert(session);
        const worker = new WebWorker(session, createdTarget.url(), __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_addConsoleMessage).bind(this), __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_handleException).bind(this));
        __classPrivateFieldGet29(this, _CDPPage_workers, "f").set(session.id(), worker);
        this.emit("workercreated", worker);
      }
      if (createdTarget._session()) {
        __classPrivateFieldGet29(this, _CDPPage_target, "f")._targetManager().addTargetInterceptor(createdTarget._session(), __classPrivateFieldGet29(this, _CDPPage_onAttachedToTarget, "f"));
      }
    });
    __classPrivateFieldSet26(this, _CDPPage_client, client, "f");
    __classPrivateFieldSet26(this, _CDPPage_target, target, "f");
    __classPrivateFieldSet26(this, _CDPPage_keyboard, new Keyboard(client), "f");
    __classPrivateFieldSet26(this, _CDPPage_mouse, new Mouse(client, __classPrivateFieldGet29(this, _CDPPage_keyboard, "f")), "f");
    __classPrivateFieldSet26(this, _CDPPage_touchscreen, new Touchscreen(client, __classPrivateFieldGet29(this, _CDPPage_keyboard, "f")), "f");
    __classPrivateFieldSet26(this, _CDPPage_accessibility, new Accessibility(client), "f");
    __classPrivateFieldSet26(this, _CDPPage_frameManager, new FrameManager(client, this, ignoreHTTPSErrors, __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f")), "f");
    __classPrivateFieldSet26(this, _CDPPage_emulationManager, new EmulationManager(client), "f");
    __classPrivateFieldSet26(this, _CDPPage_tracing, new Tracing(client), "f");
    __classPrivateFieldSet26(this, _CDPPage_coverage, new Coverage(client), "f");
    __classPrivateFieldSet26(this, _CDPPage_screenshotTaskQueue, screenshotTaskQueue, "f");
    __classPrivateFieldSet26(this, _CDPPage_viewport, null, "f");
    __classPrivateFieldGet29(this, _CDPPage_target, "f")._targetManager().addTargetInterceptor(__classPrivateFieldGet29(this, _CDPPage_client, "f"), __classPrivateFieldGet29(this, _CDPPage_onAttachedToTarget, "f"));
    __classPrivateFieldGet29(this, _CDPPage_target, "f")._targetManager().on("targetGone", __classPrivateFieldGet29(this, _CDPPage_onDetachedFromTarget, "f"));
    __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").on(FrameManagerEmittedEvents.FrameAttached, (event) => {
      return this.emit("frameattached", event);
    });
    __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").on(FrameManagerEmittedEvents.FrameDetached, (event) => {
      return this.emit("framedetached", event);
    });
    __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").on(FrameManagerEmittedEvents.FrameNavigated, (event) => {
      return this.emit("framenavigated", event);
    });
    const networkManager = __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager;
    networkManager.on(NetworkManagerEmittedEvents.Request, (event) => {
      return this.emit("request", event);
    });
    networkManager.on(NetworkManagerEmittedEvents.RequestServedFromCache, (event) => {
      return this.emit("requestservedfromcache", event);
    });
    networkManager.on(NetworkManagerEmittedEvents.Response, (event) => {
      return this.emit("response", event);
    });
    networkManager.on(NetworkManagerEmittedEvents.RequestFailed, (event) => {
      return this.emit("requestfailed", event);
    });
    networkManager.on(NetworkManagerEmittedEvents.RequestFinished, (event) => {
      return this.emit("requestfinished", event);
    });
    client.on("Page.domContentEventFired", () => {
      return this.emit(
        "domcontentloaded"
        /* PageEmittedEvents.DOMContentLoaded */
      );
    });
    client.on("Page.loadEventFired", () => {
      return this.emit(
        "load"
        /* PageEmittedEvents.Load */
      );
    });
    client.on("Runtime.consoleAPICalled", (event) => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_onConsoleAPI).call(this, event);
    });
    client.on("Runtime.bindingCalled", (event) => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_onBindingCalled).call(this, event);
    });
    client.on("Page.javascriptDialogOpening", (event) => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_onDialog).call(this, event);
    });
    client.on("Runtime.exceptionThrown", (exception) => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_handleException).call(this, exception.exceptionDetails);
    });
    client.on("Inspector.targetCrashed", () => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_onTargetCrashed).call(this);
    });
    client.on("Performance.metrics", (event) => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_emitMetrics).call(this, event);
    });
    client.on("Log.entryAdded", (event) => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_onLogEntryAdded).call(this, event);
    });
    client.on("Page.fileChooserOpened", (event) => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_onFileChooser).call(this, event);
    });
    __classPrivateFieldGet29(this, _CDPPage_target, "f")._isClosedPromise.then(() => {
      __classPrivateFieldGet29(this, _CDPPage_target, "f")._targetManager().removeTargetInterceptor(__classPrivateFieldGet29(this, _CDPPage_client, "f"), __classPrivateFieldGet29(this, _CDPPage_onAttachedToTarget, "f"));
      __classPrivateFieldGet29(this, _CDPPage_target, "f")._targetManager().off("targetGone", __classPrivateFieldGet29(this, _CDPPage_onDetachedFromTarget, "f"));
      this.emit(
        "close"
        /* PageEmittedEvents.Close */
      );
      __classPrivateFieldSet26(this, _CDPPage_closed, true, "f");
    });
  }
  /**
   * @internal
   */
  static async _create(client, target, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
    const page = new CDPPage(client, target, ignoreHTTPSErrors, screenshotTaskQueue);
    await __classPrivateFieldGet29(page, _CDPPage_instances, "m", _CDPPage_initialize).call(page);
    if (defaultViewport) {
      try {
        await page.setViewport(defaultViewport);
      } catch (err) {
        if (isErrorLike(err) && isTargetClosedError(err)) {
          debugError(err);
        } else {
          throw err;
        }
      }
    }
    return page;
  }
  /**
   * @returns `true` if drag events are being intercepted, `false` otherwise.
   */
  isDragInterceptionEnabled() {
    return __classPrivateFieldGet29(this, _CDPPage_userDragInterceptionEnabled, "f");
  }
  /**
   * @returns `true` if the page has JavaScript enabled, `false` otherwise.
   */
  isJavaScriptEnabled() {
    return __classPrivateFieldGet29(this, _CDPPage_javascriptEnabled, "f");
  }
  /**
   * This method is typically coupled with an action that triggers file
   * choosing.
   *
   * :::caution
   *
   * This must be called before the file chooser is launched. It will not return
   * a currently active file chooser.
   *
   * :::
   *
   * @remarks
   * In non-headless Chromium, this method results in the native file picker
   * dialog `not showing up` for the user.
   *
   * @example
   * The following example clicks a button that issues a file chooser
   * and then responds with `/tmp/myfile.pdf` as if a user has selected this file.
   *
   * ```ts
   * const [fileChooser] = await Promise.all([
   *   page.waitForFileChooser(),
   *   page.click('#upload-file-button'),
   *   // some button that triggers file selection
   * ]);
   * await fileChooser.accept(['/tmp/myfile.pdf']);
   * ```
   */
  waitForFileChooser(options = {}) {
    const needsEnable = __classPrivateFieldGet29(this, _CDPPage_fileChooserPromises, "f").size === 0;
    const { timeout = __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
    const promise = createDeferredPromise({
      message: `Waiting for \`FileChooser\` failed: ${timeout}ms exceeded`,
      timeout
    });
    __classPrivateFieldGet29(this, _CDPPage_fileChooserPromises, "f").add(promise);
    let enablePromise;
    if (needsEnable) {
      enablePromise = __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.setInterceptFileChooserDialog", {
        enabled: true
      });
    }
    return Promise.all([promise, enablePromise]).then(([result]) => {
      return result;
    }).catch((error) => {
      __classPrivateFieldGet29(this, _CDPPage_fileChooserPromises, "f").delete(promise);
      throw error;
    });
  }
  /**
   * Sets the page's geolocation.
   *
   * @remarks
   * Consider using {@link BrowserContext.overridePermissions} to grant
   * permissions for the page to read its geolocation.
   *
   * @example
   *
   * ```ts
   * await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
   * ```
   */
  async setGeolocation(options) {
    const { longitude, latitude, accuracy = 0 } = options;
    if (longitude < -180 || longitude > 180) {
      throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
    }
    if (latitude < -90 || latitude > 90) {
      throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
    }
    if (accuracy < 0) {
      throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
    }
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setGeolocationOverride", {
      longitude,
      latitude,
      accuracy
    });
  }
  /**
   * @returns A target this page was created from.
   */
  target() {
    return __classPrivateFieldGet29(this, _CDPPage_target, "f");
  }
  /**
   * @internal
   */
  _client() {
    return __classPrivateFieldGet29(this, _CDPPage_client, "f");
  }
  /**
   * Get the browser the page belongs to.
   */
  browser() {
    return __classPrivateFieldGet29(this, _CDPPage_target, "f").browser();
  }
  /**
   * Get the browser context that the page belongs to.
   */
  browserContext() {
    return __classPrivateFieldGet29(this, _CDPPage_target, "f").browserContext();
  }
  /**
   * @returns The page's main frame.
   *
   * @remarks
   * Page is guaranteed to have a main frame which persists during navigations.
   */
  mainFrame() {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").mainFrame();
  }
  get keyboard() {
    return __classPrivateFieldGet29(this, _CDPPage_keyboard, "f");
  }
  get touchscreen() {
    return __classPrivateFieldGet29(this, _CDPPage_touchscreen, "f");
  }
  get coverage() {
    return __classPrivateFieldGet29(this, _CDPPage_coverage, "f");
  }
  get tracing() {
    return __classPrivateFieldGet29(this, _CDPPage_tracing, "f");
  }
  get accessibility() {
    return __classPrivateFieldGet29(this, _CDPPage_accessibility, "f");
  }
  /**
   * @returns An array of all frames attached to the page.
   */
  frames() {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").frames();
  }
  /**
   * @returns all of the dedicated {@link
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API |
   * WebWorkers} associated with the page.
   *
   * @remarks
   * This does not contain ServiceWorkers
   */
  workers() {
    return Array.from(__classPrivateFieldGet29(this, _CDPPage_workers, "f").values());
  }
  /**
   * Activating request interception enables {@link HTTPRequest.abort},
   * {@link HTTPRequest.continue} and {@link HTTPRequest.respond} methods. This
   * provides the capability to modify network requests that are made by a page.
   *
   * Once request interception is enabled, every request will stall unless it's
   * continued, responded or aborted; or completed using the browser cache.
   *
   * Enabling request interception disables page caching.
   *
   * See the
   * {@link https://pptr.dev/next/guides/request-interception|Request interception guide}
   * for more details.
   *
   * @example
   * An example of a naïve request interceptor that aborts all image requests:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   await page.setRequestInterception(true);
   *   page.on('request', interceptedRequest => {
   *     if (
   *       interceptedRequest.url().endsWith('.png') ||
   *       interceptedRequest.url().endsWith('.jpg')
   *     )
   *       interceptedRequest.abort();
   *     else interceptedRequest.continue();
   *   });
   *   await page.goto('https://example.com');
   *   await browser.close();
   * })();
   * ```
   *
   * @param value - Whether to enable request interception.
   */
  async setRequestInterception(value) {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager.setRequestInterception(value);
  }
  /**
   * @param enabled - Whether to enable drag interception.
   *
   * @remarks
   * Activating drag interception enables the `Input.drag`,
   * methods This provides the capability to capture drag events emitted
   * on the page, which can then be used to simulate drag-and-drop.
   */
  async setDragInterception(enabled) {
    __classPrivateFieldSet26(this, _CDPPage_userDragInterceptionEnabled, enabled, "f");
    return __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Input.setInterceptDrags", { enabled });
  }
  setOfflineMode(enabled) {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager.setOfflineMode(enabled);
  }
  emulateNetworkConditions(networkConditions) {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager.emulateNetworkConditions(networkConditions);
  }
  /**
   * This setting will change the default maximum navigation time for the
   * following methods and related shortcuts:
   *
   * - {@link Page.goBack | page.goBack(options)}
   *
   * - {@link Page.goForward | page.goForward(options)}
   *
   * - {@link Page.goto | page.goto(url,options)}
   *
   * - {@link Page.reload | page.reload(options)}
   *
   * - {@link Page.setContent | page.setContent(html,options)}
   *
   * - {@link Page.waitForNavigation | page.waitForNavigation(options)}
   *   @param timeout - Maximum navigation time in milliseconds.
   */
  setDefaultNavigationTimeout(timeout) {
    __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f").setDefaultNavigationTimeout(timeout);
  }
  /**
   * @param timeout - Maximum time in milliseconds.
   */
  setDefaultTimeout(timeout) {
    __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f").setDefaultTimeout(timeout);
  }
  /**
   * @returns Maximum time in milliseconds.
   */
  getDefaultTimeout() {
    return __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f").timeout();
  }
  /**
   * Runs `document.querySelector` within the page. If no element matches the
   * selector, the return value resolves to `null`.
   *
   * @param selector - A `selector` to query page for
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query page for.
   */
  async $(selector) {
    return this.mainFrame().$(selector);
  }
  /**
   * The method runs `document.querySelectorAll` within the page. If no elements
   * match the selector, the return value resolves to `[]`.
   * @remarks
   * Shortcut for {@link Frame.$$ | Page.mainFrame().$$(selector) }.
   * @param selector - A `selector` to query page for
   */
  async $$(selector) {
    return this.mainFrame().$$(selector);
  }
  /**
   * @remarks
   *
   * The only difference between {@link Page.evaluate | page.evaluate} and
   * `page.evaluateHandle` is that `evaluateHandle` will return the value
   * wrapped in an in-page object.
   *
   * If the function passed to `page.evaluteHandle` returns a Promise, the
   * function will wait for the promise to resolve and return its value.
   *
   * You can pass a string instead of a function (although functions are
   * recommended as they are easier to debug and use with TypeScript):
   *
   * @example
   *
   * ```ts
   * const aHandle = await page.evaluateHandle('document');
   * ```
   *
   * @example
   * {@link JSHandle} instances can be passed as arguments to the `pageFunction`:
   *
   * ```ts
   * const aHandle = await page.evaluateHandle(() => document.body);
   * const resultHandle = await page.evaluateHandle(
   *   body => body.innerHTML,
   *   aHandle
   * );
   * console.log(await resultHandle.jsonValue());
   * await resultHandle.dispose();
   * ```
   *
   * Most of the time this function returns a {@link JSHandle},
   * but if `pageFunction` returns a reference to an element,
   * you instead get an {@link ElementHandle} back:
   *
   * @example
   *
   * ```ts
   * const button = await page.evaluateHandle(() =>
   *   document.querySelector('button')
   * );
   * // can call `click` because `button` is an `ElementHandle`
   * await button.click();
   * ```
   *
   * The TypeScript definitions assume that `evaluateHandle` returns
   * a `JSHandle`, but if you know it's going to return an
   * `ElementHandle`, pass it as the generic argument:
   *
   * ```ts
   * const button = await page.evaluateHandle<ElementHandle>(...);
   * ```
   *
   * @param pageFunction - a function that is run within the page
   * @param args - arguments to be passed to the pageFunction
   */
  async evaluateHandle(pageFunction, ...args) {
    const context = await this.mainFrame().executionContext();
    return context.evaluateHandle(pageFunction, ...args);
  }
  /**
   * This method iterates the JavaScript heap and finds all objects with the
   * given prototype.
   *
   * @example
   *
   * ```ts
   * // Create a Map object
   * await page.evaluate(() => (window.map = new Map()));
   * // Get a handle to the Map object prototype
   * const mapPrototype = await page.evaluateHandle(() => Map.prototype);
   * // Query all map instances into an array
   * const mapInstances = await page.queryObjects(mapPrototype);
   * // Count amount of map objects in heap
   * const count = await page.evaluate(maps => maps.length, mapInstances);
   * await mapInstances.dispose();
   * await mapPrototype.dispose();
   * ```
   *
   * @param prototypeHandle - a handle to the object prototype.
   * @returns Promise which resolves to a handle to an array of objects with
   * this prototype.
   */
  async queryObjects(prototypeHandle) {
    const context = await this.mainFrame().executionContext();
    assert(!prototypeHandle.disposed, "Prototype JSHandle is disposed!");
    const remoteObject = prototypeHandle.remoteObject();
    assert(remoteObject.objectId, "Prototype JSHandle must not be referencing primitive value");
    const response = await context._client.send("Runtime.queryObjects", {
      prototypeObjectId: remoteObject.objectId
    });
    return createJSHandle(context, response.objects);
  }
  /**
   * This method runs `document.querySelector` within the page and passes the
   * result as the first argument to the `pageFunction`.
   *
   * @remarks
   *
   * If no element is found matching `selector`, the method will throw an error.
   *
   * If `pageFunction` returns a promise `$eval` will wait for the promise to
   * resolve and then return its value.
   *
   * @example
   *
   * ```ts
   * const searchValue = await page.$eval('#search', el => el.value);
   * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
   * const html = await page.$eval('.main-container', el => el.outerHTML);
   * ```
   *
   * If you are using TypeScript, you may have to provide an explicit type to the
   * first argument of the `pageFunction`.
   * By default it is typed as `Element`, but you may need to provide a more
   * specific sub-type:
   *
   * @example
   *
   * ```ts
   * // if you don't provide HTMLInputElement here, TS will error
   * // as `value` is not on `Element`
   * const searchValue = await page.$eval(
   *   '#search',
   *   (el: HTMLInputElement) => el.value
   * );
   * ```
   *
   * The compiler should be able to infer the return type
   * from the `pageFunction` you provide. If it is unable to, you can use the generic
   * type to tell the compiler what return type you expect from `$eval`:
   *
   * @example
   *
   * ```ts
   * // The compiler can infer the return type in this case, but if it can't
   * // or if you want to be more explicit, provide it as the generic type.
   * const searchValue = await page.$eval<string>(
   *   '#search',
   *   (el: HTMLInputElement) => el.value
   * );
   * ```
   *
   * @param selector - the
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query for
   * @param pageFunction - the function to be evaluated in the page context.
   * Will be passed the result of `document.querySelector(selector)` as its
   * first argument.
   * @param args - any additional arguments to pass through to `pageFunction`.
   *
   * @returns The result of calling `pageFunction`. If it returns an element it
   * is wrapped in an {@link ElementHandle}, else the raw value itself is
   * returned.
   */
  async $eval(selector, pageFunction, ...args) {
    return this.mainFrame().$eval(selector, pageFunction, ...args);
  }
  /**
   * This method runs `Array.from(document.querySelectorAll(selector))` within
   * the page and passes the result as the first argument to the `pageFunction`.
   *
   * @remarks
   * If `pageFunction` returns a promise `$$eval` will wait for the promise to
   * resolve and then return its value.
   *
   * @example
   *
   * ```ts
   * // get the amount of divs on the page
   * const divCount = await page.$$eval('div', divs => divs.length);
   *
   * // get the text content of all the `.options` elements:
   * const options = await page.$$eval('div > span.options', options => {
   *   return options.map(option => option.textContent);
   * });
   * ```
   *
   * If you are using TypeScript, you may have to provide an explicit type to the
   * first argument of the `pageFunction`.
   * By default it is typed as `Element[]`, but you may need to provide a more
   * specific sub-type:
   *
   * @example
   *
   * ```ts
   * // if you don't provide HTMLInputElement here, TS will error
   * // as `value` is not on `Element`
   * await page.$$eval('input', (elements: HTMLInputElement[]) => {
   *   return elements.map(e => e.value);
   * });
   * ```
   *
   * The compiler should be able to infer the return type
   * from the `pageFunction` you provide. If it is unable to, you can use the generic
   * type to tell the compiler what return type you expect from `$$eval`:
   *
   * @example
   *
   * ```ts
   * // The compiler can infer the return type in this case, but if it can't
   * // or if you want to be more explicit, provide it as the generic type.
   * const allInputValues = await page.$$eval<string[]>(
   *   'input',
   *   (elements: HTMLInputElement[]) => elements.map(e => e.textContent)
   * );
   * ```
   *
   * @param selector - the
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query for
   * @param pageFunction - the function to be evaluated in the page context.
   * Will be passed the result of
   * `Array.from(document.querySelectorAll(selector))` as its first argument.
   * @param args - any additional arguments to pass through to `pageFunction`.
   *
   * @returns The result of calling `pageFunction`. If it returns an element it
   * is wrapped in an {@link ElementHandle}, else the raw value itself is
   * returned.
   */
  async $$eval(selector, pageFunction, ...args) {
    return this.mainFrame().$$eval(selector, pageFunction, ...args);
  }
  /**
   * The method evaluates the XPath expression relative to the page document as
   * its context node. If there are no such elements, the method resolves to an
   * empty array.
   *
   * @remarks
   * Shortcut for {@link Frame.$x | Page.mainFrame().$x(expression) }.
   *
   * @param expression - Expression to evaluate
   */
  async $x(expression) {
    return this.mainFrame().$x(expression);
  }
  /**
   * If no URLs are specified, this method returns cookies for the current page
   * URL. If URLs are specified, only cookies for those URLs are returned.
   */
  async cookies(...urls) {
    const originalCookies = (await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Network.getCookies", {
      urls: urls.length ? urls : [this.url()]
    })).cookies;
    const unsupportedCookieAttributes = ["priority"];
    const filterUnsupportedAttributes = (cookie) => {
      for (const attr of unsupportedCookieAttributes) {
        delete cookie[attr];
      }
      return cookie;
    };
    return originalCookies.map(filterUnsupportedAttributes);
  }
  async deleteCookie(...cookies) {
    const pageURL = this.url();
    for (const cookie of cookies) {
      const item = Object.assign({}, cookie);
      if (!cookie.url && pageURL.startsWith("http")) {
        item.url = pageURL;
      }
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Network.deleteCookies", item);
    }
  }
  /**
   * @example
   *
   * ```ts
   * await page.setCookie(cookieObject1, cookieObject2);
   * ```
   */
  async setCookie(...cookies) {
    const pageURL = this.url();
    const startsWithHTTP = pageURL.startsWith("http");
    const items = cookies.map((cookie) => {
      const item = Object.assign({}, cookie);
      if (!item.url && startsWithHTTP) {
        item.url = pageURL;
      }
      assert(item.url !== "about:blank", `Blank page can not have cookie "${item.name}"`);
      assert(!String.prototype.startsWith.call(item.url || "", "data:"), `Data URL page can not have cookie "${item.name}"`);
      return item;
    });
    await this.deleteCookie(...items);
    if (items.length) {
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Network.setCookies", { cookies: items });
    }
  }
  /**
   * Adds a `<script>` tag into the page with the desired URL or content.
   *
   * @remarks
   * Shortcut for
   * {@link Frame.addScriptTag | page.mainFrame().addScriptTag(options)}.
   *
   * @param options - Options for the script.
   * @returns An {@link ElementHandle | element handle} to the injected
   * `<script>` element.
   */
  async addScriptTag(options) {
    return this.mainFrame().addScriptTag(options);
  }
  async addStyleTag(options) {
    return this.mainFrame().addStyleTag(options);
  }
  /**
   * The method adds a function called `name` on the page's `window` object.
   * When called, the function executes `puppeteerFunction` in node.js and
   * returns a `Promise` which resolves to the return value of
   * `puppeteerFunction`.
   *
   * If the puppeteerFunction returns a `Promise`, it will be awaited.
   *
   * :::note
   *
   * Functions installed via `page.exposeFunction` survive navigations.
   *
   * :::note
   *
   * @example
   * An example of adding an `md5` function into the page:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * const crypto = require('crypto');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   page.on('console', msg => console.log(msg.text()));
   *   await page.exposeFunction('md5', text =>
   *     crypto.createHash('md5').update(text).digest('hex')
   *   );
   *   await page.evaluate(async () => {
   *     // use window.md5 to compute hashes
   *     const myString = 'PUPPETEER';
   *     const myHash = await window.md5(myString);
   *     console.log(`md5 of ${myString} is ${myHash}`);
   *   });
   *   await browser.close();
   * })();
   * ```
   *
   * @example
   * An example of adding a `window.readfile` function into the page:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * const fs = require('fs');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   page.on('console', msg => console.log(msg.text()));
   *   await page.exposeFunction('readfile', async filePath => {
   *     return new Promise((resolve, reject) => {
   *       fs.readFile(filePath, 'utf8', (err, text) => {
   *         if (err) reject(err);
   *         else resolve(text);
   *       });
   *     });
   *   });
   *   await page.evaluate(async () => {
   *     // use window.readfile to read contents of a file
   *     const content = await window.readfile('/etc/hosts');
   *     console.log(content);
   *   });
   *   await browser.close();
   * })();
   * ```
   *
   * @param name - Name of the function on the window object
   * @param pptrFunction - Callback function which will be called in Puppeteer's
   * context.
   */
  async exposeFunction(name, pptrFunction) {
    if (__classPrivateFieldGet29(this, _CDPPage_pageBindings, "f").has(name)) {
      throw new Error(`Failed to add page binding with name ${name}: window['${name}'] already exists!`);
    }
    let exposedFunction;
    switch (typeof pptrFunction) {
      case "function":
        exposedFunction = pptrFunction;
        break;
      default:
        exposedFunction = pptrFunction.default;
        break;
    }
    __classPrivateFieldGet29(this, _CDPPage_pageBindings, "f").set(name, exposedFunction);
    const expression = pageBindingInitString("exposedFun", name);
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Runtime.addBinding", { name });
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.addScriptToEvaluateOnNewDocument", {
      source: expression
    });
    await Promise.all(this.frames().map((frame) => {
      return frame.evaluate(expression).catch(debugError);
    }));
  }
  /**
   * Provide credentials for `HTTP authentication`.
   *
   * @remarks
   * To disable authentication, pass `null`.
   */
  async authenticate(credentials) {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager.authenticate(credentials);
  }
  /**
   * The extra HTTP headers will be sent with every request the page initiates.
   *
   * :::tip
   *
   * All HTTP header names are lowercased. (HTTP headers are
   * case-insensitive, so this shouldn’t impact your server code.)
   *
   * :::
   *
   * :::note
   *
   * page.setExtraHTTPHeaders does not guarantee the order of headers in
   * the outgoing requests.
   *
   * :::
   *
   * @param headers - An object containing additional HTTP headers to be sent
   * with every request. All header values must be strings.
   */
  async setExtraHTTPHeaders(headers) {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager.setExtraHTTPHeaders(headers);
  }
  /**
   * @param userAgent - Specific user agent to use in this page
   * @param userAgentData - Specific user agent client hint data to use in this
   * page
   * @returns Promise which resolves when the user agent is set.
   */
  async setUserAgent(userAgent, userAgentMetadata) {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager.setUserAgent(userAgent, userAgentMetadata);
  }
  /**
   * @returns Object containing metrics as key/value pairs.
   *
   * - `Timestamp` : The timestamp when the metrics sample was taken.
   *
   * - `Documents` : Number of documents in the page.
   *
   * - `Frames` : Number of frames in the page.
   *
   * - `JSEventListeners` : Number of events in the page.
   *
   * - `Nodes` : Number of DOM nodes in the page.
   *
   * - `LayoutCount` : Total number of full or partial page layout.
   *
   * - `RecalcStyleCount` : Total number of page style recalculations.
   *
   * - `LayoutDuration` : Combined durations of all page layouts.
   *
   * - `RecalcStyleDuration` : Combined duration of all page style
   *   recalculations.
   *
   * - `ScriptDuration` : Combined duration of JavaScript execution.
   *
   * - `TaskDuration` : Combined duration of all tasks performed by the browser.
   *
   * - `JSHeapUsedSize` : Used JavaScript heap size.
   *
   * - `JSHeapTotalSize` : Total JavaScript heap size.
   *
   * @remarks
   * All timestamps are in monotonic time: monotonically increasing time
   * in seconds since an arbitrary point in the past.
   */
  async metrics() {
    const response = await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Performance.getMetrics");
    return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_buildMetricsObject).call(this, response.metrics);
  }
  /**
   *
   * @returns
   * @remarks Shortcut for
   * {@link Frame.url | page.mainFrame().url()}.
   */
  url() {
    return this.mainFrame().url();
  }
  async content() {
    return await __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").mainFrame().content();
  }
  /**
   * @param html - HTML markup to assign to the page.
   * @param options - Parameters that has some properties.
   * @remarks
   * The parameter `options` might have the following options.
   *
   * - `timeout` : Maximum time in milliseconds for resources to load, defaults
   *   to 30 seconds, pass `0` to disable timeout. The default value can be
   *   changed by using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil`: When to consider setting markup succeeded, defaults to
   *   `load`. Given an array of event strings, setting content is considered
   *   to be successful after all events have been fired. Events can be
   *   either:<br/>
   * - `load` : consider setting content to be finished when the `load` event
   *   is fired.<br/>
   * - `domcontentloaded` : consider setting content to be finished when the
   *   `DOMContentLoaded` event is fired.<br/>
   * - `networkidle0` : consider setting content to be finished when there are
   *   no more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider setting content to be finished when there are
   *   no more than 2 network connections for at least `500` ms.
   */
  async setContent(html, options = {}) {
    await __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").mainFrame().setContent(html, options);
  }
  /**
   * @param url - URL to navigate page to. The URL should include scheme, e.g.
   * `https://`
   * @param options - Navigation Parameter
   * @returns Promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect.
   * @remarks
   * The argument `options` might have the following properties:
   *
   * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
   *   seconds, pass 0 to disable timeout. The default value can be changed by
   *   using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil`:When to consider navigation succeeded, defaults to `load`.
   *   Given an array of event strings, navigation is considered to be
   *   successful after all events have been fired. Events can be either:<br/>
   * - `load` : consider navigation to be finished when the load event is
   *   fired.<br/>
   * - `domcontentloaded` : consider navigation to be finished when the
   *   DOMContentLoaded event is fired.<br/>
   * - `networkidle0` : consider navigation to be finished when there are no
   *   more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider navigation to be finished when there are no
   *   more than 2 network connections for at least `500` ms.
   *
   * - `referer` : Referer header value. If provided it will take preference
   *   over the referer header value set by
   *   {@link Page.setExtraHTTPHeaders |page.setExtraHTTPHeaders()}.
   *
   * `page.goto` will throw an error if:
   *
   * - there's an SSL error (e.g. in case of self-signed certificates).
   * - target URL is invalid.
   * - the timeout is exceeded during navigation.
   * - the remote server does not respond or is unreachable.
   * - the main resource failed to load.
   *
   * `page.goto` will not throw an error when any valid HTTP status code is
   * returned by the remote server, including 404 "Not Found" and 500
   * "Internal Server Error". The status code for such responses can be
   * retrieved by calling response.status().
   *
   * NOTE: `page.goto` either throws an error or returns a main resource
   * response. The only exceptions are navigation to about:blank or navigation
   * to the same URL with a different hash, which would succeed and return null.
   *
   * NOTE: Headless mode doesn't support navigation to a PDF document. See the
   * {@link https://bugs.chromium.org/p/chromium/issues/detail?id=761295 |
   * upstream issue}.
   *
   * Shortcut for {@link Frame.goto | page.mainFrame().goto(url, options)}.
   */
  async goto(url, options = {}) {
    return await __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").mainFrame().goto(url, options);
  }
  /**
   * @param options - Navigation parameters which might have the following
   * properties:
   * @returns Promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect.
   * @remarks
   * The argument `options` might have the following properties:
   *
   * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
   *   seconds, pass 0 to disable timeout. The default value can be changed by
   *   using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil`: When to consider navigation succeeded, defaults to `load`.
   *   Given an array of event strings, navigation is considered to be
   *   successful after all events have been fired. Events can be either:<br/>
   * - `load` : consider navigation to be finished when the load event is
   *   fired.<br/>
   * - `domcontentloaded` : consider navigation to be finished when the
   *   DOMContentLoaded event is fired.<br/>
   * - `networkidle0` : consider navigation to be finished when there are no
   *   more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider navigation to be finished when there are no
   *   more than 2 network connections for at least `500` ms.
   */
  async reload(options) {
    const result = await Promise.all([
      this.waitForNavigation(options),
      __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.reload")
    ]);
    return result[0];
  }
  /**
   * Waits for the page to navigate to a new URL or to reload. It is useful when
   * you run code that will indirectly cause the page to navigate.
   *
   * @example
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(), // The promise resolves after navigation has finished
   *   page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
   * ]);
   * ```
   *
   * @remarks
   * Usage of the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API | History API}
   * to change the URL is considered a navigation.
   *
   * @param options - Navigation parameters which might have the following
   * properties:
   * @returns A `Promise` which resolves to the main resource response.
   *
   * - In case of multiple redirects, the navigation will resolve with the
   *   response of the last redirect.
   * - In case of navigation to a different anchor or navigation due to History
   *   API usage, the navigation will resolve with `null`.
   */
  async waitForNavigation(options = {}) {
    return await __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").mainFrame().waitForNavigation(options);
  }
  /**
   * @param urlOrPredicate - A URL or predicate to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves to the matched response
   * @example
   *
   * ```ts
   * const firstResponse = await page.waitForResponse(
   *   'https://example.com/resource'
   * );
   * const finalResponse = await page.waitForResponse(
   *   response =>
   *     response.url() === 'https://example.com' && response.status() === 200
   * );
   * const finalResponse = await page.waitForResponse(async response => {
   *   return (await response.text()).includes('<html>');
   * });
   * return finalResponse.ok();
   * ```
   *
   * @remarks
   * Optional Waiting Parameters have:
   *
   * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds, pass
   *   `0` to disable the timeout. The default value can be changed by using the
   *   {@link Page.setDefaultTimeout} method.
   */
  async waitForRequest(urlOrPredicate, options = {}) {
    const { timeout = __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
    return waitForEvent(__classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager, NetworkManagerEmittedEvents.Request, async (request3) => {
      if (isString(urlOrPredicate)) {
        return urlOrPredicate === request3.url();
      }
      if (typeof urlOrPredicate === "function") {
        return !!await urlOrPredicate(request3);
      }
      return false;
    }, timeout, __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_sessionClosePromise).call(this));
  }
  /**
   * @param urlOrPredicate - A URL or predicate to wait for.
   * @param options - Optional waiting parameters
   * @returns Promise which resolves to the matched response.
   * @example
   *
   * ```ts
   * const firstResponse = await page.waitForResponse(
   *   'https://example.com/resource'
   * );
   * const finalResponse = await page.waitForResponse(
   *   response =>
   *     response.url() === 'https://example.com' && response.status() === 200
   * );
   * const finalResponse = await page.waitForResponse(async response => {
   *   return (await response.text()).includes('<html>');
   * });
   * return finalResponse.ok();
   * ```
   *
   * @remarks
   * Optional Parameter have:
   *
   * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds,
   *   pass `0` to disable the timeout. The default value can be changed by using
   *   the {@link Page.setDefaultTimeout} method.
   */
  async waitForResponse(urlOrPredicate, options = {}) {
    const { timeout = __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
    return waitForEvent(__classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager, NetworkManagerEmittedEvents.Response, async (response) => {
      if (isString(urlOrPredicate)) {
        return urlOrPredicate === response.url();
      }
      if (typeof urlOrPredicate === "function") {
        return !!await urlOrPredicate(response);
      }
      return false;
    }, timeout, __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_sessionClosePromise).call(this));
  }
  /**
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when network is idle
   */
  async waitForNetworkIdle(options = {}) {
    const { idleTime = 500, timeout = __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
    const networkManager = __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager;
    let idleResolveCallback;
    const idlePromise = new Promise((resolve2) => {
      idleResolveCallback = resolve2;
    });
    let abortRejectCallback;
    const abortPromise = new Promise((_, reject) => {
      abortRejectCallback = reject;
    });
    let idleTimer;
    const onIdle = () => {
      return idleResolveCallback();
    };
    const cleanup = () => {
      idleTimer && clearTimeout(idleTimer);
      abortRejectCallback(new Error("abort"));
    };
    const evaluate = () => {
      idleTimer && clearTimeout(idleTimer);
      if (networkManager.numRequestsInProgress() === 0) {
        idleTimer = setTimeout(onIdle, idleTime);
      }
    };
    evaluate();
    const eventHandler = () => {
      evaluate();
      return false;
    };
    const listenToEvent = (event) => {
      return waitForEvent(networkManager, event, eventHandler, timeout, abortPromise);
    };
    const eventPromises = [
      listenToEvent(NetworkManagerEmittedEvents.Request),
      listenToEvent(NetworkManagerEmittedEvents.Response)
    ];
    await Promise.race([
      idlePromise,
      ...eventPromises,
      __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_sessionClosePromise).call(this)
    ]).then((r) => {
      cleanup();
      return r;
    }, (error) => {
      cleanup();
      throw error;
    });
  }
  /**
   * @param urlOrPredicate - A URL or predicate to wait for.
   * @param options - Optional waiting parameters
   * @returns Promise which resolves to the matched frame.
   * @example
   *
   * ```ts
   * const frame = await page.waitForFrame(async frame => {
   *   return frame.name() === 'Test';
   * });
   * ```
   *
   * @remarks
   * Optional Parameter have:
   *
   * - `timeout`: Maximum wait time in milliseconds, defaults to `30` seconds,
   *   pass `0` to disable the timeout. The default value can be changed by using
   *   the {@link Page.setDefaultTimeout} method.
   */
  async waitForFrame(urlOrPredicate, options = {}) {
    const { timeout = __classPrivateFieldGet29(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
    let predicate;
    if (isString(urlOrPredicate)) {
      predicate = (frame) => {
        return Promise.resolve(urlOrPredicate === frame.url());
      };
    } else {
      predicate = (frame) => {
        const value = urlOrPredicate(frame);
        if (typeof value === "boolean") {
          return Promise.resolve(value);
        }
        return value;
      };
    }
    const eventRace = Promise.race([
      waitForEvent(__classPrivateFieldGet29(this, _CDPPage_frameManager, "f"), FrameManagerEmittedEvents.FrameAttached, predicate, timeout, __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_sessionClosePromise).call(this)),
      waitForEvent(__classPrivateFieldGet29(this, _CDPPage_frameManager, "f"), FrameManagerEmittedEvents.FrameNavigated, predicate, timeout, __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_sessionClosePromise).call(this)),
      ...this.frames().map(async (frame) => {
        if (await predicate(frame)) {
          return frame;
        }
        return await eventRace;
      })
    ]);
    return eventRace;
  }
  /**
   * This method navigate to the previous page in history.
   * @param options - Navigation parameters
   * @returns Promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect. If can not go back, resolves to `null`.
   * @remarks
   * The argument `options` might have the following properties:
   *
   * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
   *   seconds, pass 0 to disable timeout. The default value can be changed by
   *   using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil` : When to consider navigation succeeded, defaults to `load`.
   *   Given an array of event strings, navigation is considered to be
   *   successful after all events have been fired. Events can be either:<br/>
   * - `load` : consider navigation to be finished when the load event is
   *   fired.<br/>
   * - `domcontentloaded` : consider navigation to be finished when the
   *   DOMContentLoaded event is fired.<br/>
   * - `networkidle0` : consider navigation to be finished when there are no
   *   more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider navigation to be finished when there are no
   *   more than 2 network connections for at least `500` ms.
   */
  async goBack(options = {}) {
    return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_go).call(this, -1, options);
  }
  /**
   * This method navigate to the next page in history.
   * @param options - Navigation Parameter
   * @returns Promise which resolves to the main resource response. In case of
   * multiple redirects, the navigation will resolve with the response of the
   * last redirect. If can not go forward, resolves to `null`.
   * @remarks
   * The argument `options` might have the following properties:
   *
   * - `timeout` : Maximum navigation time in milliseconds, defaults to 30
   *   seconds, pass 0 to disable timeout. The default value can be changed by
   *   using the {@link Page.setDefaultNavigationTimeout} or
   *   {@link Page.setDefaultTimeout} methods.
   *
   * - `waitUntil`: When to consider navigation succeeded, defaults to `load`.
   *   Given an array of event strings, navigation is considered to be
   *   successful after all events have been fired. Events can be either:<br/>
   * - `load` : consider navigation to be finished when the load event is
   *   fired.<br/>
   * - `domcontentloaded` : consider navigation to be finished when the
   *   DOMContentLoaded event is fired.<br/>
   * - `networkidle0` : consider navigation to be finished when there are no
   *   more than 0 network connections for at least `500` ms.<br/>
   * - `networkidle2` : consider navigation to be finished when there are no
   *   more than 2 network connections for at least `500` ms.
   */
  async goForward(options = {}) {
    return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_go).call(this, 1, options);
  }
  /**
   * Brings page to front (activates tab).
   */
  async bringToFront() {
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.bringToFront");
  }
  /**
   * @param enabled - Whether or not to enable JavaScript on the page.
   * @returns
   * @remarks
   * NOTE: changing this value won't affect scripts that have already been run.
   * It will take full effect on the next navigation.
   */
  async setJavaScriptEnabled(enabled) {
    if (__classPrivateFieldGet29(this, _CDPPage_javascriptEnabled, "f") === enabled) {
      return;
    }
    __classPrivateFieldSet26(this, _CDPPage_javascriptEnabled, enabled, "f");
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setScriptExecutionDisabled", {
      value: !enabled
    });
  }
  /**
   * Toggles bypassing page's Content-Security-Policy.
   * @param enabled - sets bypassing of page's Content-Security-Policy.
   * @remarks
   * NOTE: CSP bypassing happens at the moment of CSP initialization rather than
   * evaluation. Usually, this means that `page.setBypassCSP` should be called
   * before navigating to the domain.
   */
  async setBypassCSP(enabled) {
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.setBypassCSP", { enabled });
  }
  /**
   * @param type - Changes the CSS media type of the page. The only allowed
   * values are `screen`, `print` and `null`. Passing `null` disables CSS media
   * emulation.
   * @example
   *
   * ```ts
   * await page.evaluate(() => matchMedia('screen').matches);
   * // → true
   * await page.evaluate(() => matchMedia('print').matches);
   * // → false
   *
   * await page.emulateMediaType('print');
   * await page.evaluate(() => matchMedia('screen').matches);
   * // → false
   * await page.evaluate(() => matchMedia('print').matches);
   * // → true
   *
   * await page.emulateMediaType(null);
   * await page.evaluate(() => matchMedia('screen').matches);
   * // → true
   * await page.evaluate(() => matchMedia('print').matches);
   * // → false
   * ```
   */
  async emulateMediaType(type) {
    assert(type === "screen" || type === "print" || (type !== null && type !== void 0 ? type : void 0) === void 0, "Unsupported media type: " + type);
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setEmulatedMedia", {
      media: type || ""
    });
  }
  /**
   * Enables CPU throttling to emulate slow CPUs.
   * @param factor - slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).
   */
  async emulateCPUThrottling(factor) {
    assert(factor === null || factor >= 1, "Throttling rate should be greater or equal to 1");
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setCPUThrottlingRate", {
      rate: factor !== null ? factor : 1
    });
  }
  /**
   * @param features - `<?Array<Object>>` Given an array of media feature
   * objects, emulates CSS media features on the page. Each media feature object
   * must have the following properties:
   * @example
   *
   * ```ts
   * await page.emulateMediaFeatures([
   *   {name: 'prefers-color-scheme', value: 'dark'},
   * ]);
   * await page.evaluate(
   *   () => matchMedia('(prefers-color-scheme: dark)').matches
   * );
   * // → true
   * await page.evaluate(
   *   () => matchMedia('(prefers-color-scheme: light)').matches
   * );
   * // → false
   *
   * await page.emulateMediaFeatures([
   *   {name: 'prefers-reduced-motion', value: 'reduce'},
   * ]);
   * await page.evaluate(
   *   () => matchMedia('(prefers-reduced-motion: reduce)').matches
   * );
   * // → true
   * await page.evaluate(
   *   () => matchMedia('(prefers-reduced-motion: no-preference)').matches
   * );
   * // → false
   *
   * await page.emulateMediaFeatures([
   *   {name: 'prefers-color-scheme', value: 'dark'},
   *   {name: 'prefers-reduced-motion', value: 'reduce'},
   * ]);
   * await page.evaluate(
   *   () => matchMedia('(prefers-color-scheme: dark)').matches
   * );
   * // → true
   * await page.evaluate(
   *   () => matchMedia('(prefers-color-scheme: light)').matches
   * );
   * // → false
   * await page.evaluate(
   *   () => matchMedia('(prefers-reduced-motion: reduce)').matches
   * );
   * // → true
   * await page.evaluate(
   *   () => matchMedia('(prefers-reduced-motion: no-preference)').matches
   * );
   * // → false
   *
   * await page.emulateMediaFeatures([{name: 'color-gamut', value: 'p3'}]);
   * await page.evaluate(() => matchMedia('(color-gamut: srgb)').matches);
   * // → true
   * await page.evaluate(() => matchMedia('(color-gamut: p3)').matches);
   * // → true
   * await page.evaluate(() => matchMedia('(color-gamut: rec2020)').matches);
   * // → false
   * ```
   */
  async emulateMediaFeatures(features) {
    if (!features) {
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setEmulatedMedia", {});
    }
    if (Array.isArray(features)) {
      for (const mediaFeature of features) {
        const name = mediaFeature.name;
        assert(/^(?:prefers-(?:color-scheme|reduced-motion)|color-gamut)$/.test(name), "Unsupported media feature: " + name);
      }
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setEmulatedMedia", {
        features
      });
    }
  }
  /**
   * @param timezoneId - Changes the timezone of the page. See
   * {@link https://source.chromium.org/chromium/chromium/deps/icu.git/+/faee8bc70570192d82d2978a71e2a615788597d1:source/data/misc/metaZones.txt | ICU’s metaZones.txt}
   * for a list of supported timezone IDs. Passing
   * `null` disables timezone emulation.
   */
  async emulateTimezone(timezoneId) {
    try {
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setTimezoneOverride", {
        timezoneId: timezoneId || ""
      });
    } catch (error) {
      if (isErrorLike(error) && error.message.includes("Invalid timezone")) {
        throw new Error(`Invalid timezone ID: ${timezoneId}`);
      }
      throw error;
    }
  }
  /**
   * Emulates the idle state.
   * If no arguments set, clears idle state emulation.
   *
   * @example
   *
   * ```ts
   * // set idle emulation
   * await page.emulateIdleState({isUserActive: true, isScreenUnlocked: false});
   *
   * // do some checks here
   * ...
   *
   * // clear idle emulation
   * await page.emulateIdleState();
   * ```
   *
   * @param overrides - Mock idle state. If not set, clears idle overrides
   */
  async emulateIdleState(overrides) {
    if (overrides) {
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setIdleOverride", {
        isUserActive: overrides.isUserActive,
        isScreenUnlocked: overrides.isScreenUnlocked
      });
    } else {
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.clearIdleOverride");
    }
  }
  /**
   * Simulates the given vision deficiency on the page.
   *
   * @example
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   await page.goto('https://v8.dev/blog/10-years');
   *
   *   await page.emulateVisionDeficiency('achromatopsia');
   *   await page.screenshot({path: 'achromatopsia.png'});
   *
   *   await page.emulateVisionDeficiency('deuteranopia');
   *   await page.screenshot({path: 'deuteranopia.png'});
   *
   *   await page.emulateVisionDeficiency('blurredVision');
   *   await page.screenshot({path: 'blurred-vision.png'});
   *
   *   await browser.close();
   * })();
   * ```
   *
   * @param type - the type of deficiency to simulate, or `'none'` to reset.
   */
  async emulateVisionDeficiency(type) {
    const visionDeficiencies = /* @__PURE__ */ new Set([
      "none",
      "achromatopsia",
      "blurredVision",
      "deuteranopia",
      "protanopia",
      "tritanopia"
    ]);
    try {
      assert(!type || visionDeficiencies.has(type), `Unsupported vision deficiency: ${type}`);
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setEmulatedVisionDeficiency", {
        type: type || "none"
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * `page.setViewport` will resize the page. A lot of websites don't expect
   * phones to change size, so you should set the viewport before navigating to
   * the page.
   *
   * In the case of multiple pages in a single browser, each page can have its
   * own viewport size.
   * @example
   *
   * ```ts
   * const page = await browser.newPage();
   * await page.setViewport({
   *   width: 640,
   *   height: 480,
   *   deviceScaleFactor: 1,
   * });
   * await page.goto('https://example.com');
   * ```
   *
   * @param viewport -
   * @remarks
   * Argument viewport have following properties:
   *
   * - `width`: page width in pixels. required
   *
   * - `height`: page height in pixels. required
   *
   * - `deviceScaleFactor`: Specify device scale factor (can be thought of as
   *   DPR). Defaults to `1`.
   *
   * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
   *   to `false`.
   *
   * - `hasTouch`: Specifies if viewport supports touch events. Defaults to `false`
   *
   * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to false.
   *
   * NOTE: in certain cases, setting viewport will reload the page in order to
   * set the isMobile or hasTouch properties.
   */
  async setViewport(viewport) {
    const needsReload = await __classPrivateFieldGet29(this, _CDPPage_emulationManager, "f").emulateViewport(viewport);
    __classPrivateFieldSet26(this, _CDPPage_viewport, viewport, "f");
    if (needsReload) {
      await this.reload();
    }
  }
  /**
   * @returns
   *
   * - `width`: page's width in pixels
   *
   * - `height`: page's height in pixels
   *
   * - `deviceScalarFactor`: Specify device scale factor (can be though of as
   *   dpr). Defaults to `1`.
   *
   * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
   *   to `false`.
   *
   * - `hasTouch`: Specifies if viewport supports touch events. Defaults to
   *   `false`.
   *
   * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to
   *   `false`.
   */
  viewport() {
    return __classPrivateFieldGet29(this, _CDPPage_viewport, "f");
  }
  /**
   * Evaluates a function in the page's context and returns the result.
   *
   * If the function passed to `page.evaluteHandle` returns a Promise, the
   * function will wait for the promise to resolve and return its value.
   *
   * @example
   *
   * ```ts
   * const result = await frame.evaluate(() => {
   *   return Promise.resolve(8 * 7);
   * });
   * console.log(result); // prints "56"
   * ```
   *
   * You can pass a string instead of a function (although functions are
   * recommended as they are easier to debug and use with TypeScript):
   *
   * @example
   *
   * ```ts
   * const aHandle = await page.evaluate('1 + 2');
   * ```
   *
   * To get the best TypeScript experience, you should pass in as the
   * generic the type of `pageFunction`:
   *
   * ```ts
   * const aHandle = await page.evaluate(() => 2);
   * ```
   *
   * @example
   *
   * {@link ElementHandle} instances (including {@link JSHandle}s) can be passed
   * as arguments to the `pageFunction`:
   *
   * ```ts
   * const bodyHandle = await page.$('body');
   * const html = await page.evaluate(body => body.innerHTML, bodyHandle);
   * await bodyHandle.dispose();
   * ```
   *
   * @param pageFunction - a function that is run within the page
   * @param args - arguments to be passed to the pageFunction
   *
   * @returns the return value of `pageFunction`.
   */
  async evaluate(pageFunction, ...args) {
    return __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").mainFrame().evaluate(pageFunction, ...args);
  }
  /**
   * Adds a function which would be invoked in one of the following scenarios:
   *
   * - whenever the page is navigated
   *
   * - whenever the child frame is attached or navigated. In this case, the
   *   function is invoked in the context of the newly attached frame.
   *
   * The function is invoked after the document was created but before any of
   * its scripts were run. This is useful to amend the JavaScript environment,
   * e.g. to seed `Math.random`.
   * @param pageFunction - Function to be evaluated in browser context
   * @param args - Arguments to pass to `pageFunction`
   * @example
   * An example of overriding the navigator.languages property before the page loads:
   *
   * ```ts
   * // preload.js
   *
   * // overwrite the `languages` property to use a custom getter
   * Object.defineProperty(navigator, 'languages', {
   *   get: function () {
   *     return ['en-US', 'en', 'bn'];
   *   },
   * });
   *
   * // In your puppeteer script, assuming the preload.js file is
   * // in same folder of our script.
   * const preloadFile = fs.readFileSync('./preload.js', 'utf8');
   * await page.evaluateOnNewDocument(preloadFile);
   * ```
   */
  async evaluateOnNewDocument(pageFunction, ...args) {
    const source2 = evaluationString(pageFunction, ...args);
    await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.addScriptToEvaluateOnNewDocument", {
      source: source2
    });
  }
  /**
   * Toggles ignoring cache for each request based on the enabled state. By
   * default, caching is enabled.
   * @param enabled - sets the `enabled` state of cache
   */
  async setCacheEnabled(enabled = true) {
    await __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").networkManager.setCacheEnabled(enabled);
  }
  /**
   * @remarks
   * Options object which might have the following properties:
   *
   * - `path` : The file path to save the image to. The screenshot type
   *   will be inferred from file extension. If `path` is a relative path, then
   *   it is resolved relative to
   *   {@link https://nodejs.org/api/process.html#process_process_cwd
   *   | current working directory}.
   *   If no path is provided, the image won't be saved to the disk.
   *
   * - `type` : Specify screenshot type, can be either `jpeg` or `png`.
   *   Defaults to 'png'.
   *
   * - `quality` : The quality of the image, between 0-100. Not
   *   applicable to `png` images.
   *
   * - `fullPage` : When true, takes a screenshot of the full
   *   scrollable page. Defaults to `false`.
   *
   * - `clip` : An object which specifies clipping region of the page.
   *   Should have the following fields:<br/>
   * - `x` : x-coordinate of top-left corner of clip area.<br/>
   * - `y` : y-coordinate of top-left corner of clip area.<br/>
   * - `width` : width of clipping area.<br/>
   * - `height` : height of clipping area.
   *
   * - `omitBackground` : Hides default white background and allows
   *   capturing screenshots with transparency. Defaults to `false`.
   *
   * - `encoding` : The encoding of the image, can be either base64 or
   *   binary. Defaults to `binary`.
   *
   * - `captureBeyondViewport` : When true, captures screenshot
   *   {@link https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot
   *   | beyond the viewport}. When false, falls back to old behaviour,
   *   and cuts the screenshot by the viewport size. Defaults to `true`.
   *
   * - `fromSurface` : When true, captures screenshot
   *   {@link https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot
   *   | from the surface rather than the view}. When false, works only in
   *   headful mode and ignores page viewport (but not browser window's
   *   bounds). Defaults to `true`.
   *
   * NOTE: Screenshots take at least 1/6 second on OS X. See
   * {@link https://crbug.com/741689} for discussion.
   * @returns Promise which resolves to buffer or a base64 string (depending on
   * the value of `encoding`) with captured screenshot.
   */
  async screenshot(options = {}) {
    let screenshotType = "png";
    if (options.type) {
      screenshotType = options.type;
    } else if (options.path) {
      const filePath = options.path;
      const extension = filePath.slice(filePath.lastIndexOf(".") + 1).toLowerCase();
      switch (extension) {
        case "png":
          screenshotType = "png";
          break;
        case "jpeg":
        case "jpg":
          screenshotType = "jpeg";
          break;
        case "webp":
          screenshotType = "webp";
          break;
        default:
          throw new Error(`Unsupported screenshot type for extension \`.${extension}\``);
      }
    }
    if (options.quality) {
      assert(screenshotType === "jpeg" || screenshotType === "webp", "options.quality is unsupported for the " + screenshotType + " screenshots");
      assert(typeof options.quality === "number", "Expected options.quality to be a number but found " + typeof options.quality);
      assert(Number.isInteger(options.quality), "Expected options.quality to be an integer");
      assert(options.quality >= 0 && options.quality <= 100, "Expected options.quality to be between 0 and 100 (inclusive), got " + options.quality);
    }
    assert(!options.clip || !options.fullPage, "options.clip and options.fullPage are exclusive");
    if (options.clip) {
      assert(typeof options.clip.x === "number", "Expected options.clip.x to be a number but found " + typeof options.clip.x);
      assert(typeof options.clip.y === "number", "Expected options.clip.y to be a number but found " + typeof options.clip.y);
      assert(typeof options.clip.width === "number", "Expected options.clip.width to be a number but found " + typeof options.clip.width);
      assert(typeof options.clip.height === "number", "Expected options.clip.height to be a number but found " + typeof options.clip.height);
      assert(options.clip.width !== 0, "Expected options.clip.width not to be 0.");
      assert(options.clip.height !== 0, "Expected options.clip.height not to be 0.");
    }
    return __classPrivateFieldGet29(this, _CDPPage_screenshotTaskQueue, "f").postTask(() => {
      return __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_screenshotTask).call(this, screenshotType, options);
    });
  }
  /**
   * Generates a PDF of the page with the `print` CSS media type.
   * @remarks
   *
   * NOTE: PDF generation is only supported in Chrome headless mode.
   *
   * To generate a PDF with the `screen` media type, call
   * {@link Page.emulateMediaType | `page.emulateMediaType('screen')`} before
   * calling `page.pdf()`.
   *
   * By default, `page.pdf()` generates a pdf with modified colors for printing.
   * Use the
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust | `-webkit-print-color-adjust`}
   * property to force rendering of exact colors.
   *
   * @param options - options for generating the PDF.
   */
  async createPDFStream(options = {}) {
    const { scale = 1, displayHeaderFooter = false, headerTemplate = "", footerTemplate = "", printBackground = false, landscape = false, pageRanges = "", preferCSSPageSize = false, margin = {}, omitBackground = false, timeout = 3e4 } = options;
    let paperWidth = 8.5;
    let paperHeight = 11;
    if (options.format) {
      const format2 = _paperFormats[options.format.toLowerCase()];
      assert(format2, "Unknown paper format: " + options.format);
      paperWidth = format2.width;
      paperHeight = format2.height;
    } else {
      paperWidth = convertPrintParameterToInches(options.width) || paperWidth;
      paperHeight = convertPrintParameterToInches(options.height) || paperHeight;
    }
    const marginTop = convertPrintParameterToInches(margin.top) || 0;
    const marginLeft = convertPrintParameterToInches(margin.left) || 0;
    const marginBottom = convertPrintParameterToInches(margin.bottom) || 0;
    const marginRight = convertPrintParameterToInches(margin.right) || 0;
    if (omitBackground) {
      await __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_setTransparentBackgroundColor).call(this);
    }
    const printCommandPromise = __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.printToPDF", {
      transferMode: "ReturnAsStream",
      landscape,
      displayHeaderFooter,
      headerTemplate,
      footerTemplate,
      printBackground,
      scale,
      paperWidth,
      paperHeight,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      pageRanges,
      preferCSSPageSize
    });
    const result = await waitWithTimeout(printCommandPromise, "Page.printToPDF", timeout);
    if (omitBackground) {
      await __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_resetDefaultBackgroundColor).call(this);
    }
    assert(result.stream, "`stream` is missing from `Page.printToPDF");
    return getReadableFromProtocolStream(__classPrivateFieldGet29(this, _CDPPage_client, "f"), result.stream);
  }
  /**
   * @param options -
   * @returns
   */
  async pdf(options = {}) {
    const { path: path5 = void 0 } = options;
    const readable = await this.createPDFStream(options);
    const buffer = await getReadableAsBuffer(readable, path5);
    assert(buffer, "Could not create buffer");
    return buffer;
  }
  /**
   * @returns The page's title
   * @remarks
   * Shortcut for {@link Frame.title | page.mainFrame().title()}.
   */
  async title() {
    return this.mainFrame().title();
  }
  async close(options = { runBeforeUnload: void 0 }) {
    const connection = __classPrivateFieldGet29(this, _CDPPage_client, "f").connection();
    assert(connection, "Protocol error: Connection closed. Most likely the page has been closed.");
    const runBeforeUnload = !!options.runBeforeUnload;
    if (runBeforeUnload) {
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.close");
    } else {
      await connection.send("Target.closeTarget", {
        targetId: __classPrivateFieldGet29(this, _CDPPage_target, "f")._targetId
      });
      await __classPrivateFieldGet29(this, _CDPPage_target, "f")._isClosedPromise;
    }
  }
  /**
   * Indicates that the page has been closed.
   * @returns
   */
  isClosed() {
    return __classPrivateFieldGet29(this, _CDPPage_closed, "f");
  }
  get mouse() {
    return __classPrivateFieldGet29(this, _CDPPage_mouse, "f");
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page.mouse} to click in the center of the
   * element. If there's no element matching `selector`, the method throws an
   * error.
   * @remarks Bear in mind that if `click()` triggers a navigation event and
   * there's a separate `page.waitForNavigation()` promise to be resolved, you
   * may end up with a race condition that yields unexpected results. The
   * correct pattern for click and wait for navigation is the following:
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(waitOptions),
   *   page.click(selector, clickOptions),
   * ]);
   * ```
   *
   * Shortcut for {@link Frame.click | page.mainFrame().click(selector[, options]) }.
   * @param selector - A `selector` to search for element to click. If there are
   * multiple elements satisfying the `selector`, the first will be clicked
   * @param options - `Object`
   * @returns Promise which resolves when the element matching `selector` is
   * successfully clicked. The Promise will be rejected if there is no element
   * matching `selector`.
   */
  click(selector, options = {}) {
    return this.mainFrame().click(selector, options);
  }
  /**
   * This method fetches an element with `selector` and focuses it. If there's no
   * element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector }
   * of an element to focus. If there are multiple elements satisfying the
   * selector, the first will be focused.
   * @returns Promise which resolves when the element matching selector is
   * successfully focused. The promise will be rejected if there is no element
   * matching selector.
   * @remarks
   * Shortcut for {@link Frame.focus | page.mainFrame().focus(selector)}.
   */
  focus(selector) {
    return this.mainFrame().focus(selector);
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page.mouse} to hover over the center of the element.
   * If there's no element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to search for element to hover. If there are multiple elements satisfying
   * the selector, the first will be hovered.
   * @returns Promise which resolves when the element matching `selector` is
   * successfully hovered. Promise gets rejected if there's no element matching
   * `selector`.
   * @remarks
   * Shortcut for {@link Page.hover | page.mainFrame().hover(selector)}.
   */
  hover(selector) {
    return this.mainFrame().hover(selector);
  }
  /**
   * Triggers a `change` and `input` event once all the provided options have been
   * selected. If there's no `<select>` element matching `selector`, the method
   * throws an error.
   *
   * @example
   *
   * ```ts
   * page.select('select#colors', 'blue'); // single selection
   * page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | Selector}
   * to query the page for
   * @param values - Values of options to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first one
   * is taken into account.
   * @returns
   *
   * @remarks
   * Shortcut for {@link Frame.select | page.mainFrame().select()}
   */
  select(selector, ...values) {
    return this.mainFrame().select(selector, ...values);
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page.touchscreen} to tap in the center of the element.
   * If there's no element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | Selector}
   * to search for element to tap. If there are multiple elements satisfying the
   * selector, the first will be tapped.
   * @returns
   * @remarks
   * Shortcut for {@link Frame.tap | page.mainFrame().tap(selector)}.
   */
  tap(selector) {
    return this.mainFrame().tap(selector);
  }
  /**
   * Sends a `keydown`, `keypress/input`, and `keyup` event for each character
   * in the text.
   *
   * To press a special key, like `Control` or `ArrowDown`, use {@link Keyboard.press}.
   * @example
   *
   * ```ts
   * await page.type('#mytextarea', 'Hello');
   * // Types instantly
   * await page.type('#mytextarea', 'World', {delay: 100});
   * // Types slower, like a user
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * of an element to type into. If there are multiple elements satisfying the
   * selector, the first will be used.
   * @param text - A text to type into a focused element.
   * @param options - have property `delay` which is the Time to wait between
   * key presses in milliseconds. Defaults to `0`.
   * @returns
   * @remarks
   */
  type(selector, text, options) {
    return this.mainFrame().type(selector, text, options);
  }
  /**
   * @deprecated Replace with `new Promise(r => setTimeout(r, milliseconds));`.
   *
   * Causes your script to wait for the given number of milliseconds.
   *
   * @remarks
   * It's generally recommended to not wait for a number of seconds, but instead
   * use {@link Frame.waitForSelector}, {@link Frame.waitForXPath} or
   * {@link Frame.waitForFunction} to wait for exactly the conditions you want.
   *
   * @example
   *
   * Wait for 1 second:
   *
   * ```ts
   * await page.waitForTimeout(1000);
   * ```
   *
   * @param milliseconds - the number of milliseconds to wait.
   */
  waitForTimeout(milliseconds) {
    return this.mainFrame().waitForTimeout(milliseconds);
  }
  /**
   * Wait for the `selector` to appear in page. If at the moment of calling the
   * method the `selector` already exists, the method will return immediately. If
   * the `selector` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * This method works across navigations:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * of an element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by selector string
   * is added to DOM. Resolves to `null` if waiting for hidden: `true` and
   * selector is not found in DOM.
   * @remarks
   * The optional Parameter in Arguments `options` are :
   *
   * - `Visible`: A boolean wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: Wait for element to not be found in the DOM or to be hidden,
   *   i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to
   *   `false`.
   *
   * - `timeout`: maximum time to wait for in milliseconds. Defaults to `30000`
   *   (30 seconds). Pass `0` to disable timeout. The default value can be changed
   *   by using the {@link Page.setDefaultTimeout} method.
   */
  async waitForSelector(selector, options = {}) {
    return await this.mainFrame().waitForSelector(selector, options);
  }
  /**
   * Wait for the `xpath` to appear in page. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the `xpath` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * This method works across navigation
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForXPath('//img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param xpath - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/XPath | xpath} of an
   * element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by xpath string is
   * added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is
   * not found in DOM.
   * @remarks
   * The optional Argument `options` have properties:
   *
   * - `visible`: A boolean to wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: A boolean wait for element to not be found in the DOM or to be
   *   hidden, i.e. have `display: none` or `visibility: hidden` CSS properties.
   *   Defaults to `false`.
   *
   * - `timeout`: A number which is maximum time to wait for in milliseconds.
   *   Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default
   *   value can be changed by using the {@link Page.setDefaultTimeout} method.
   */
  waitForXPath(xpath, options = {}) {
    return this.mainFrame().waitForXPath(xpath, options);
  }
  /**
   * Waits for a function to finish evaluating in the page's context.
   *
   * @example
   * The {@link Page.waitForFunction} can be used to observe viewport size change:
   *
   * ```ts
   * const puppeteer = require('puppeteer');
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   const watchDog = page.waitForFunction('window.innerWidth < 100');
   *   await page.setViewport({width: 50, height: 50});
   *   await watchDog;
   *   await browser.close();
   * })();
   * ```
   *
   * @example
   * To pass arguments from node.js to the predicate of
   * {@link Page.waitForFunction} function:
   *
   * ```ts
   * const selector = '.foo';
   * await page.waitForFunction(
   *   selector => !!document.querySelector(selector),
   *   {},
   *   selector
   * );
   * ```
   *
   * @example
   * The predicate of {@link Page.waitForFunction} can be asynchronous too:
   *
   * ```ts
   * const username = 'github-username';
   * await page.waitForFunction(
   *   async username => {
   *     const githubResponse = await fetch(
   *       `https://api.github.com/users/${username}`
   *     );
   *     const githubUser = await githubResponse.json();
   *     // show the avatar
   *     const img = document.createElement('img');
   *     img.src = githubUser.avatar_url;
   *     // wait 3 seconds
   *     await new Promise((resolve, reject) => setTimeout(resolve, 3000));
   *     img.remove();
   *   },
   *   {},
   *   username
   * );
   * ```
   *
   * @param pageFunction - Function to be evaluated in browser context
   * @param options - Options for configuring waiting behavior.
   */
  waitForFunction(pageFunction, options = {}, ...args) {
    return this.mainFrame().waitForFunction(pageFunction, options, ...args);
  }
};
_CDPPage_closed = /* @__PURE__ */ new WeakMap(), _CDPPage_client = /* @__PURE__ */ new WeakMap(), _CDPPage_target = /* @__PURE__ */ new WeakMap(), _CDPPage_keyboard = /* @__PURE__ */ new WeakMap(), _CDPPage_mouse = /* @__PURE__ */ new WeakMap(), _CDPPage_timeoutSettings = /* @__PURE__ */ new WeakMap(), _CDPPage_touchscreen = /* @__PURE__ */ new WeakMap(), _CDPPage_accessibility = /* @__PURE__ */ new WeakMap(), _CDPPage_frameManager = /* @__PURE__ */ new WeakMap(), _CDPPage_emulationManager = /* @__PURE__ */ new WeakMap(), _CDPPage_tracing = /* @__PURE__ */ new WeakMap(), _CDPPage_pageBindings = /* @__PURE__ */ new WeakMap(), _CDPPage_coverage = /* @__PURE__ */ new WeakMap(), _CDPPage_javascriptEnabled = /* @__PURE__ */ new WeakMap(), _CDPPage_viewport = /* @__PURE__ */ new WeakMap(), _CDPPage_screenshotTaskQueue = /* @__PURE__ */ new WeakMap(), _CDPPage_workers = /* @__PURE__ */ new WeakMap(), _CDPPage_fileChooserPromises = /* @__PURE__ */ new WeakMap(), _CDPPage_disconnectPromise = /* @__PURE__ */ new WeakMap(), _CDPPage_userDragInterceptionEnabled = /* @__PURE__ */ new WeakMap(), _CDPPage_onDetachedFromTarget = /* @__PURE__ */ new WeakMap(), _CDPPage_onAttachedToTarget = /* @__PURE__ */ new WeakMap(), _CDPPage_instances = /* @__PURE__ */ new WeakSet(), _CDPPage_initialize = async function _CDPPage_initialize2() {
  try {
    await Promise.all([
      __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").initialize(),
      __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Performance.enable"),
      __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Log.enable")
    ]);
  } catch (err) {
    if (isErrorLike(err) && isTargetClosedError(err)) {
      debugError(err);
    } else {
      throw err;
    }
  }
}, _CDPPage_onFileChooser = async function _CDPPage_onFileChooser2(event) {
  if (!__classPrivateFieldGet29(this, _CDPPage_fileChooserPromises, "f").size) {
    return;
  }
  const frame = __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").frame(event.frameId);
  assert(frame, "This should never happen.");
  const handle = await frame.worlds[MAIN_WORLD].adoptBackendNode(event.backendNodeId);
  const fileChooser = new FileChooser(handle, event);
  for (const promise of __classPrivateFieldGet29(this, _CDPPage_fileChooserPromises, "f")) {
    promise.resolve(fileChooser);
  }
  __classPrivateFieldGet29(this, _CDPPage_fileChooserPromises, "f").clear();
}, _CDPPage_onTargetCrashed = function _CDPPage_onTargetCrashed2() {
  this.emit("error", new Error("Page crashed!"));
}, _CDPPage_onLogEntryAdded = function _CDPPage_onLogEntryAdded2(event) {
  const { level, text, args, source: source2, url, lineNumber } = event.entry;
  if (args) {
    args.map((arg) => {
      return releaseObject(__classPrivateFieldGet29(this, _CDPPage_client, "f"), arg);
    });
  }
  if (source2 !== "worker") {
    this.emit("console", new ConsoleMessage(level, text, [], [{ url, lineNumber }]));
  }
}, _CDPPage_emitMetrics = function _CDPPage_emitMetrics2(event) {
  this.emit("metrics", {
    title: event.title,
    metrics: __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_buildMetricsObject).call(this, event.metrics)
  });
}, _CDPPage_buildMetricsObject = function _CDPPage_buildMetricsObject2(metrics) {
  const result = {};
  for (const metric of metrics || []) {
    if (supportedMetrics.has(metric.name)) {
      result[metric.name] = metric.value;
    }
  }
  return result;
}, _CDPPage_handleException = function _CDPPage_handleException2(exceptionDetails) {
  const message = getExceptionMessage(exceptionDetails);
  const err = new Error(message);
  err.stack = "";
  this.emit("pageerror", err);
}, _CDPPage_onConsoleAPI = async function _CDPPage_onConsoleAPI2(event) {
  if (event.executionContextId === 0) {
    return;
  }
  const context = __classPrivateFieldGet29(this, _CDPPage_frameManager, "f").executionContextById(event.executionContextId, __classPrivateFieldGet29(this, _CDPPage_client, "f"));
  const values = event.args.map((arg) => {
    return createJSHandle(context, arg);
  });
  __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_addConsoleMessage).call(this, event.type, values, event.stackTrace);
}, _CDPPage_onBindingCalled = async function _CDPPage_onBindingCalled2(event) {
  let payload;
  try {
    payload = JSON.parse(event.payload);
  } catch {
    return;
  }
  const { type, name, seq, args } = payload;
  if (type !== "exposedFun" || !__classPrivateFieldGet29(this, _CDPPage_pageBindings, "f").has(name)) {
    return;
  }
  let expression = null;
  try {
    const pageBinding = __classPrivateFieldGet29(this, _CDPPage_pageBindings, "f").get(name);
    assert(pageBinding);
    const result = await pageBinding(...args);
    expression = pageBindingDeliverResultString(name, seq, result);
  } catch (error) {
    if (isErrorLike(error)) {
      expression = pageBindingDeliverErrorString(name, seq, error.message, error.stack);
    } else {
      expression = pageBindingDeliverErrorValueString(name, seq, error);
    }
  }
  __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Runtime.evaluate", {
    expression,
    contextId: event.executionContextId
  }).catch(debugError);
}, _CDPPage_addConsoleMessage = function _CDPPage_addConsoleMessage2(eventType, args, stackTrace) {
  if (!this.listenerCount(
    "console"
    /* PageEmittedEvents.Console */
  )) {
    args.forEach((arg) => {
      return arg.dispose();
    });
    return;
  }
  const textTokens = [];
  for (const arg of args) {
    const remoteObject = arg.remoteObject();
    if (remoteObject.objectId) {
      textTokens.push(arg.toString());
    } else {
      textTokens.push(valueFromRemoteObject(remoteObject));
    }
  }
  const stackTraceLocations = [];
  if (stackTrace) {
    for (const callFrame of stackTrace.callFrames) {
      stackTraceLocations.push({
        url: callFrame.url,
        lineNumber: callFrame.lineNumber,
        columnNumber: callFrame.columnNumber
      });
    }
  }
  const message = new ConsoleMessage(eventType, textTokens.join(" "), args, stackTraceLocations);
  this.emit("console", message);
}, _CDPPage_onDialog = function _CDPPage_onDialog2(event) {
  let dialogType = null;
  const validDialogTypes = /* @__PURE__ */ new Set([
    "alert",
    "confirm",
    "prompt",
    "beforeunload"
  ]);
  if (validDialogTypes.has(event.type)) {
    dialogType = event.type;
  }
  assert(dialogType, "Unknown javascript dialog type: " + event.type);
  const dialog = new Dialog(__classPrivateFieldGet29(this, _CDPPage_client, "f"), dialogType, event.message, event.defaultPrompt);
  this.emit("dialog", dialog);
}, _CDPPage_resetDefaultBackgroundColor = /**
 * Resets default white background
 */
async function _CDPPage_resetDefaultBackgroundColor2() {
  await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setDefaultBackgroundColorOverride");
}, _CDPPage_setTransparentBackgroundColor = /**
 * Hides default white background
 */
async function _CDPPage_setTransparentBackgroundColor2() {
  await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 0, g: 0, b: 0, a: 0 }
  });
}, _CDPPage_sessionClosePromise = function _CDPPage_sessionClosePromise2() {
  if (!__classPrivateFieldGet29(this, _CDPPage_disconnectPromise, "f")) {
    __classPrivateFieldSet26(this, _CDPPage_disconnectPromise, new Promise((fulfill) => {
      return __classPrivateFieldGet29(this, _CDPPage_client, "f").once(CDPSessionEmittedEvents.Disconnected, () => {
        return fulfill(new Error("Target closed"));
      });
    }), "f");
  }
  return __classPrivateFieldGet29(this, _CDPPage_disconnectPromise, "f");
}, _CDPPage_go = async function _CDPPage_go2(delta, options) {
  const history = await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.getNavigationHistory");
  const entry = history.entries[history.currentIndex + delta];
  if (!entry) {
    return null;
  }
  const result = await Promise.all([
    this.waitForNavigation(options),
    __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.navigateToHistoryEntry", { entryId: entry.id })
  ]);
  return result[0];
}, _CDPPage_screenshotTask = async function _CDPPage_screenshotTask2(format2, options = {}) {
  var _a2, _b;
  await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Target.activateTarget", {
    targetId: __classPrivateFieldGet29(this, _CDPPage_target, "f")._targetId
  });
  let clip = options.clip ? processClip(options.clip) : void 0;
  let captureBeyondViewport = (_a2 = options.captureBeyondViewport) !== null && _a2 !== void 0 ? _a2 : true;
  const fromSurface = options.fromSurface;
  if (options.fullPage) {
    const metrics = await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.getLayoutMetrics");
    const { width, height } = metrics.cssContentSize || metrics.contentSize;
    clip = void 0;
    if (!captureBeyondViewport) {
      const { isMobile = false, deviceScaleFactor = 1, isLandscape = false } = __classPrivateFieldGet29(this, _CDPPage_viewport, "f") || {};
      const screenOrientation = isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
      await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Emulation.setDeviceMetricsOverride", {
        mobile: isMobile,
        width,
        height,
        deviceScaleFactor,
        screenOrientation
      });
    }
  } else if (!clip) {
    captureBeyondViewport = false;
  }
  const shouldSetDefaultBackground = options.omitBackground && (format2 === "png" || format2 === "webp");
  if (shouldSetDefaultBackground) {
    await __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_setTransparentBackgroundColor).call(this);
  }
  const result = await __classPrivateFieldGet29(this, _CDPPage_client, "f").send("Page.captureScreenshot", {
    format: format2,
    quality: options.quality,
    clip: clip && {
      ...clip,
      scale: (_b = clip.scale) !== null && _b !== void 0 ? _b : 1
    },
    captureBeyondViewport,
    fromSurface
  });
  if (shouldSetDefaultBackground) {
    await __classPrivateFieldGet29(this, _CDPPage_instances, "m", _CDPPage_resetDefaultBackgroundColor).call(this);
  }
  if (options.fullPage && __classPrivateFieldGet29(this, _CDPPage_viewport, "f")) {
    await this.setViewport(__classPrivateFieldGet29(this, _CDPPage_viewport, "f"));
  }
  const buffer = options.encoding === "base64" ? result.data : Buffer.from(result.data, "base64");
  if (options.path) {
    try {
      const fs4 = (await importFS()).promises;
      await fs4.writeFile(options.path, buffer);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Screenshots can only be written to a file path in a Node-like environment.");
      }
      throw error;
    }
  }
  return buffer;
  function processClip(clip2) {
    const x = Math.round(clip2.x);
    const y = Math.round(clip2.y);
    const width = Math.round(clip2.width + clip2.x - x);
    const height = Math.round(clip2.height + clip2.y - y);
    return { x, y, width, height, scale: clip2.scale };
  }
};
var supportedMetrics = /* @__PURE__ */ new Set([
  "Timestamp",
  "Documents",
  "Frames",
  "JSEventListeners",
  "Nodes",
  "LayoutCount",
  "RecalcStyleCount",
  "LayoutDuration",
  "RecalcStyleDuration",
  "ScriptDuration",
  "TaskDuration",
  "JSHeapUsedSize",
  "JSHeapTotalSize"
]);
var unitToPixels = {
  px: 1,
  in: 96,
  cm: 37.8,
  mm: 3.78
};
function convertPrintParameterToInches(parameter) {
  if (typeof parameter === "undefined") {
    return void 0;
  }
  let pixels;
  if (isNumber(parameter)) {
    pixels = parameter;
  } else if (isString(parameter)) {
    const text = parameter;
    let unit = text.substring(text.length - 2).toLowerCase();
    let valueText = "";
    if (unit in unitToPixels) {
      valueText = text.substring(0, text.length - 2);
    } else {
      unit = "px";
      valueText = text;
    }
    const value = Number(valueText);
    assert(!isNaN(value), "Failed to parse parameter value: " + text);
    pixels = value * unitToPixels[unit];
  } else {
    throw new Error("page.pdf() Cannot handle parameter type: " + typeof parameter);
  }
  return pixels / 96;
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Target.js
var __classPrivateFieldSet27 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet30 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Target_browserContext;
var _Target_session;
var _Target_targetInfo;
var _Target_sessionFactory;
var _Target_ignoreHTTPSErrors;
var _Target_defaultViewport;
var _Target_pagePromise;
var _Target_workerPromise;
var _Target_screenshotTaskQueue;
var _Target_targetManager;
var Target = class {
  /**
   * @internal
   */
  constructor(targetInfo, session, browserContext, targetManager, sessionFactory, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue, isPageTargetCallback) {
    _Target_browserContext.set(this, void 0);
    _Target_session.set(this, void 0);
    _Target_targetInfo.set(this, void 0);
    _Target_sessionFactory.set(this, void 0);
    _Target_ignoreHTTPSErrors.set(this, void 0);
    _Target_defaultViewport.set(this, void 0);
    _Target_pagePromise.set(this, void 0);
    _Target_workerPromise.set(this, void 0);
    _Target_screenshotTaskQueue.set(this, void 0);
    _Target_targetManager.set(this, void 0);
    __classPrivateFieldSet27(this, _Target_session, session, "f");
    __classPrivateFieldSet27(this, _Target_targetManager, targetManager, "f");
    __classPrivateFieldSet27(this, _Target_targetInfo, targetInfo, "f");
    __classPrivateFieldSet27(this, _Target_browserContext, browserContext, "f");
    this._targetId = targetInfo.targetId;
    __classPrivateFieldSet27(this, _Target_sessionFactory, sessionFactory, "f");
    __classPrivateFieldSet27(this, _Target_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
    __classPrivateFieldSet27(this, _Target_defaultViewport, defaultViewport !== null && defaultViewport !== void 0 ? defaultViewport : void 0, "f");
    __classPrivateFieldSet27(this, _Target_screenshotTaskQueue, screenshotTaskQueue, "f");
    this._isPageTargetCallback = isPageTargetCallback;
    this._initializedPromise = new Promise((fulfill) => {
      return this._initializedCallback = fulfill;
    }).then(async (success) => {
      if (!success) {
        return false;
      }
      const opener = this.opener();
      if (!opener || !__classPrivateFieldGet30(opener, _Target_pagePromise, "f") || this.type() !== "page") {
        return true;
      }
      const openerPage = await __classPrivateFieldGet30(opener, _Target_pagePromise, "f");
      if (!openerPage.listenerCount(
        "popup"
        /* PageEmittedEvents.Popup */
      )) {
        return true;
      }
      const popupPage = await this.page();
      openerPage.emit("popup", popupPage);
      return true;
    });
    this._isClosedPromise = new Promise((fulfill) => {
      return this._closedCallback = fulfill;
    });
    this._isInitialized = !this._isPageTargetCallback(__classPrivateFieldGet30(this, _Target_targetInfo, "f")) || __classPrivateFieldGet30(this, _Target_targetInfo, "f").url !== "";
    if (this._isInitialized) {
      this._initializedCallback(true);
    }
  }
  /**
   * @internal
   */
  _session() {
    return __classPrivateFieldGet30(this, _Target_session, "f");
  }
  /**
   * Creates a Chrome Devtools Protocol session attached to the target.
   */
  createCDPSession() {
    return __classPrivateFieldGet30(this, _Target_sessionFactory, "f").call(this, false);
  }
  /**
   * @internal
   */
  _targetManager() {
    return __classPrivateFieldGet30(this, _Target_targetManager, "f");
  }
  /**
   * @internal
   */
  _getTargetInfo() {
    return __classPrivateFieldGet30(this, _Target_targetInfo, "f");
  }
  /**
   * If the target is not of type `"page"` or `"background_page"`, returns `null`.
   */
  async page() {
    var _a2;
    if (this._isPageTargetCallback(__classPrivateFieldGet30(this, _Target_targetInfo, "f")) && !__classPrivateFieldGet30(this, _Target_pagePromise, "f")) {
      __classPrivateFieldSet27(this, _Target_pagePromise, (__classPrivateFieldGet30(this, _Target_session, "f") ? Promise.resolve(__classPrivateFieldGet30(this, _Target_session, "f")) : __classPrivateFieldGet30(this, _Target_sessionFactory, "f").call(this, true)).then((client) => {
        var _a3;
        return CDPPage._create(client, this, __classPrivateFieldGet30(this, _Target_ignoreHTTPSErrors, "f"), (_a3 = __classPrivateFieldGet30(this, _Target_defaultViewport, "f")) !== null && _a3 !== void 0 ? _a3 : null, __classPrivateFieldGet30(this, _Target_screenshotTaskQueue, "f"));
      }), "f");
    }
    return (_a2 = await __classPrivateFieldGet30(this, _Target_pagePromise, "f")) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /**
   * If the target is not of type `"service_worker"` or `"shared_worker"`, returns `null`.
   */
  async worker() {
    if (__classPrivateFieldGet30(this, _Target_targetInfo, "f").type !== "service_worker" && __classPrivateFieldGet30(this, _Target_targetInfo, "f").type !== "shared_worker") {
      return null;
    }
    if (!__classPrivateFieldGet30(this, _Target_workerPromise, "f")) {
      __classPrivateFieldSet27(this, _Target_workerPromise, (__classPrivateFieldGet30(this, _Target_session, "f") ? Promise.resolve(__classPrivateFieldGet30(this, _Target_session, "f")) : __classPrivateFieldGet30(this, _Target_sessionFactory, "f").call(this, false)).then((client) => {
        return new WebWorker(
          client,
          __classPrivateFieldGet30(this, _Target_targetInfo, "f").url,
          () => {
          },
          () => {
          }
          /* exceptionThrown */
        );
      }), "f");
    }
    return __classPrivateFieldGet30(this, _Target_workerPromise, "f");
  }
  url() {
    return __classPrivateFieldGet30(this, _Target_targetInfo, "f").url;
  }
  /**
   * Identifies what kind of target this is.
   *
   * @remarks
   *
   * See {@link https://developer.chrome.com/extensions/background_pages | docs} for more info about background pages.
   */
  type() {
    const type = __classPrivateFieldGet30(this, _Target_targetInfo, "f").type;
    if (type === "page" || type === "background_page" || type === "service_worker" || type === "shared_worker" || type === "browser" || type === "webview") {
      return type;
    }
    return "other";
  }
  /**
   * Get the browser the target belongs to.
   */
  browser() {
    return __classPrivateFieldGet30(this, _Target_browserContext, "f").browser();
  }
  /**
   * Get the browser context the target belongs to.
   */
  browserContext() {
    return __classPrivateFieldGet30(this, _Target_browserContext, "f");
  }
  /**
   * Get the target that opened this target. Top-level targets return `null`.
   */
  opener() {
    const { openerId } = __classPrivateFieldGet30(this, _Target_targetInfo, "f");
    if (!openerId) {
      return;
    }
    return this.browser()._targets.get(openerId);
  }
  /**
   * @internal
   */
  _targetInfoChanged(targetInfo) {
    __classPrivateFieldSet27(this, _Target_targetInfo, targetInfo, "f");
    if (!this._isInitialized && (!this._isPageTargetCallback(__classPrivateFieldGet30(this, _Target_targetInfo, "f")) || __classPrivateFieldGet30(this, _Target_targetInfo, "f").url !== "")) {
      this._isInitialized = true;
      this._initializedCallback(true);
      return;
    }
  }
};
_Target_browserContext = /* @__PURE__ */ new WeakMap(), _Target_session = /* @__PURE__ */ new WeakMap(), _Target_targetInfo = /* @__PURE__ */ new WeakMap(), _Target_sessionFactory = /* @__PURE__ */ new WeakMap(), _Target_ignoreHTTPSErrors = /* @__PURE__ */ new WeakMap(), _Target_defaultViewport = /* @__PURE__ */ new WeakMap(), _Target_pagePromise = /* @__PURE__ */ new WeakMap(), _Target_workerPromise = /* @__PURE__ */ new WeakMap(), _Target_screenshotTaskQueue = /* @__PURE__ */ new WeakMap(), _Target_targetManager = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/TaskQueue.js
init_cjs_shim();
var __classPrivateFieldSet28 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet31 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TaskQueue_chain;
var TaskQueue = class {
  constructor() {
    _TaskQueue_chain.set(this, void 0);
    __classPrivateFieldSet28(this, _TaskQueue_chain, Promise.resolve(), "f");
  }
  postTask(task) {
    const result = __classPrivateFieldGet31(this, _TaskQueue_chain, "f").then(task);
    __classPrivateFieldSet28(this, _TaskQueue_chain, result.then(() => {
      return void 0;
    }, () => {
      return void 0;
    }), "f");
    return result;
  }
};
_TaskQueue_chain = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/ChromeTargetManager.js
init_cjs_shim();
var __classPrivateFieldSet29 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet32 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChromeTargetManager_instances;
var _ChromeTargetManager_connection;
var _ChromeTargetManager_discoveredTargetsByTargetId;
var _ChromeTargetManager_attachedTargetsByTargetId;
var _ChromeTargetManager_attachedTargetsBySessionId;
var _ChromeTargetManager_ignoredTargets;
var _ChromeTargetManager_targetFilterCallback;
var _ChromeTargetManager_targetFactory;
var _ChromeTargetManager_targetInterceptors;
var _ChromeTargetManager_attachedToTargetListenersBySession;
var _ChromeTargetManager_detachedFromTargetListenersBySession;
var _ChromeTargetManager_initializeCallback;
var _ChromeTargetManager_initializePromise;
var _ChromeTargetManager_targetsIdsForInit;
var _ChromeTargetManager_storeExistingTargetsForInit;
var _ChromeTargetManager_setupAttachmentListeners;
var _ChromeTargetManager_removeAttachmentListeners;
var _ChromeTargetManager_onSessionDetached;
var _ChromeTargetManager_onTargetCreated;
var _ChromeTargetManager_onTargetDestroyed;
var _ChromeTargetManager_onTargetInfoChanged;
var _ChromeTargetManager_onAttachedToTarget;
var _ChromeTargetManager_finishInitializationIfReady;
var _ChromeTargetManager_onDetachedFromTarget;
var ChromeTargetManager = class extends EventEmitter {
  constructor(connection, targetFactory, targetFilterCallback) {
    super();
    _ChromeTargetManager_instances.add(this);
    _ChromeTargetManager_connection.set(this, void 0);
    _ChromeTargetManager_discoveredTargetsByTargetId.set(this, /* @__PURE__ */ new Map());
    _ChromeTargetManager_attachedTargetsByTargetId.set(this, /* @__PURE__ */ new Map());
    _ChromeTargetManager_attachedTargetsBySessionId.set(this, /* @__PURE__ */ new Map());
    _ChromeTargetManager_ignoredTargets.set(this, /* @__PURE__ */ new Set());
    _ChromeTargetManager_targetFilterCallback.set(this, void 0);
    _ChromeTargetManager_targetFactory.set(this, void 0);
    _ChromeTargetManager_targetInterceptors.set(this, /* @__PURE__ */ new WeakMap());
    _ChromeTargetManager_attachedToTargetListenersBySession.set(this, /* @__PURE__ */ new WeakMap());
    _ChromeTargetManager_detachedFromTargetListenersBySession.set(this, /* @__PURE__ */ new WeakMap());
    _ChromeTargetManager_initializeCallback.set(this, () => {
    });
    _ChromeTargetManager_initializePromise.set(this, new Promise((resolve2) => {
      __classPrivateFieldSet29(this, _ChromeTargetManager_initializeCallback, resolve2, "f");
    }));
    _ChromeTargetManager_targetsIdsForInit.set(this, /* @__PURE__ */ new Set());
    _ChromeTargetManager_storeExistingTargetsForInit.set(this, () => {
      for (const [targetId, targetInfo] of __classPrivateFieldGet32(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").entries()) {
        if ((!__classPrivateFieldGet32(this, _ChromeTargetManager_targetFilterCallback, "f") || __classPrivateFieldGet32(this, _ChromeTargetManager_targetFilterCallback, "f").call(this, targetInfo)) && targetInfo.type !== "browser") {
          __classPrivateFieldGet32(this, _ChromeTargetManager_targetsIdsForInit, "f").add(targetId);
        }
      }
    });
    _ChromeTargetManager_onSessionDetached.set(this, (session) => {
      __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_removeAttachmentListeners).call(this, session);
      __classPrivateFieldGet32(this, _ChromeTargetManager_targetInterceptors, "f").delete(session);
    });
    _ChromeTargetManager_onTargetCreated.set(this, async (event) => {
      __classPrivateFieldGet32(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").set(event.targetInfo.targetId, event.targetInfo);
      this.emit("targetDiscovered", event.targetInfo);
      if (event.targetInfo.type === "browser" && event.targetInfo.attached) {
        if (__classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(event.targetInfo.targetId)) {
          return;
        }
        const target = __classPrivateFieldGet32(this, _ChromeTargetManager_targetFactory, "f").call(this, event.targetInfo, void 0);
        __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").set(event.targetInfo.targetId, target);
      }
    });
    _ChromeTargetManager_onTargetDestroyed.set(this, (event) => {
      const targetInfo = __classPrivateFieldGet32(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").get(event.targetId);
      __classPrivateFieldGet32(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").delete(event.targetId);
      __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this, event.targetId);
      if ((targetInfo === null || targetInfo === void 0 ? void 0 : targetInfo.type) === "service_worker" && __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(event.targetId)) {
        const target = __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").get(event.targetId);
        this.emit("targetGone", target);
        __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").delete(event.targetId);
      }
    });
    _ChromeTargetManager_onTargetInfoChanged.set(this, (event) => {
      __classPrivateFieldGet32(this, _ChromeTargetManager_discoveredTargetsByTargetId, "f").set(event.targetInfo.targetId, event.targetInfo);
      if (__classPrivateFieldGet32(this, _ChromeTargetManager_ignoredTargets, "f").has(event.targetInfo.targetId) || !__classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(event.targetInfo.targetId) || !event.targetInfo.attached) {
        return;
      }
      const target = __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").get(event.targetInfo.targetId);
      this.emit("targetChanged", {
        target,
        targetInfo: event.targetInfo
      });
    });
    _ChromeTargetManager_onAttachedToTarget.set(this, async (parentSession, event) => {
      const targetInfo = event.targetInfo;
      const session = __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").session(event.sessionId);
      if (!session) {
        throw new Error(`Session ${event.sessionId} was not created.`);
      }
      const silentDetach = async () => {
        await session.send("Runtime.runIfWaitingForDebugger").catch(debugError);
        await parentSession.send("Target.detachFromTarget", {
          sessionId: session.id()
        }).catch(debugError);
      };
      if (!__classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").isAutoAttached(targetInfo.targetId)) {
        return;
      }
      if (targetInfo.type === "service_worker" && __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").isAutoAttached(targetInfo.targetId)) {
        __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this, targetInfo.targetId);
        await silentDetach();
        if (__classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(targetInfo.targetId)) {
          return;
        }
        const target2 = __classPrivateFieldGet32(this, _ChromeTargetManager_targetFactory, "f").call(this, targetInfo);
        __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").set(targetInfo.targetId, target2);
        this.emit("targetAvailable", target2);
        return;
      }
      if (__classPrivateFieldGet32(this, _ChromeTargetManager_targetFilterCallback, "f") && !__classPrivateFieldGet32(this, _ChromeTargetManager_targetFilterCallback, "f").call(this, targetInfo)) {
        __classPrivateFieldGet32(this, _ChromeTargetManager_ignoredTargets, "f").add(targetInfo.targetId);
        __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this, targetInfo.targetId);
        await silentDetach();
        return;
      }
      const existingTarget = __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").has(targetInfo.targetId);
      const target = existingTarget ? __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").get(targetInfo.targetId) : __classPrivateFieldGet32(this, _ChromeTargetManager_targetFactory, "f").call(this, targetInfo, session);
      __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_setupAttachmentListeners).call(this, session);
      if (existingTarget) {
        __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").set(session.id(), __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").get(targetInfo.targetId));
      } else {
        __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").set(targetInfo.targetId, target);
        __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").set(session.id(), target);
      }
      for (const interceptor of __classPrivateFieldGet32(this, _ChromeTargetManager_targetInterceptors, "f").get(parentSession) || []) {
        if (!(parentSession instanceof Connection)) {
          assert(__classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").has(parentSession.id()));
        }
        await interceptor(target, parentSession instanceof Connection ? null : __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").get(parentSession.id()));
      }
      __classPrivateFieldGet32(this, _ChromeTargetManager_targetsIdsForInit, "f").delete(target._targetId);
      if (!existingTarget) {
        this.emit("targetAvailable", target);
      }
      __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this);
      await Promise.all([
        session.send("Target.setAutoAttach", {
          waitForDebuggerOnStart: true,
          flatten: true,
          autoAttach: true
        }),
        session.send("Runtime.runIfWaitingForDebugger")
      ]).catch(debugError);
    });
    _ChromeTargetManager_onDetachedFromTarget.set(this, (_parentSession, event) => {
      const target = __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").get(event.sessionId);
      __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsBySessionId, "f").delete(event.sessionId);
      if (!target) {
        return;
      }
      __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f").delete(target._targetId);
      this.emit("targetGone", target);
    });
    __classPrivateFieldSet29(this, _ChromeTargetManager_connection, connection, "f");
    __classPrivateFieldSet29(this, _ChromeTargetManager_targetFilterCallback, targetFilterCallback, "f");
    __classPrivateFieldSet29(this, _ChromeTargetManager_targetFactory, targetFactory, "f");
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").on("Target.targetCreated", __classPrivateFieldGet32(this, _ChromeTargetManager_onTargetCreated, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").on("Target.targetDestroyed", __classPrivateFieldGet32(this, _ChromeTargetManager_onTargetDestroyed, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").on("Target.targetInfoChanged", __classPrivateFieldGet32(this, _ChromeTargetManager_onTargetInfoChanged, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").on("sessiondetached", __classPrivateFieldGet32(this, _ChromeTargetManager_onSessionDetached, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_setupAttachmentListeners).call(this, __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").send("Target.setDiscoverTargets", {
      discover: true,
      filter: [{ type: "tab", exclude: true }, {}]
    }).then(__classPrivateFieldGet32(this, _ChromeTargetManager_storeExistingTargetsForInit, "f")).catch(debugError);
  }
  async initialize() {
    await __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").send("Target.setAutoAttach", {
      waitForDebuggerOnStart: true,
      flatten: true,
      autoAttach: true
    });
    __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_finishInitializationIfReady).call(this);
    await __classPrivateFieldGet32(this, _ChromeTargetManager_initializePromise, "f");
  }
  dispose() {
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").off("Target.targetCreated", __classPrivateFieldGet32(this, _ChromeTargetManager_onTargetCreated, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").off("Target.targetDestroyed", __classPrivateFieldGet32(this, _ChromeTargetManager_onTargetDestroyed, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").off("Target.targetInfoChanged", __classPrivateFieldGet32(this, _ChromeTargetManager_onTargetInfoChanged, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f").off("sessiondetached", __classPrivateFieldGet32(this, _ChromeTargetManager_onSessionDetached, "f"));
    __classPrivateFieldGet32(this, _ChromeTargetManager_instances, "m", _ChromeTargetManager_removeAttachmentListeners).call(this, __classPrivateFieldGet32(this, _ChromeTargetManager_connection, "f"));
  }
  getAvailableTargets() {
    return __classPrivateFieldGet32(this, _ChromeTargetManager_attachedTargetsByTargetId, "f");
  }
  addTargetInterceptor(session, interceptor) {
    const interceptors = __classPrivateFieldGet32(this, _ChromeTargetManager_targetInterceptors, "f").get(session) || [];
    interceptors.push(interceptor);
    __classPrivateFieldGet32(this, _ChromeTargetManager_targetInterceptors, "f").set(session, interceptors);
  }
  removeTargetInterceptor(client, interceptor) {
    const interceptors = __classPrivateFieldGet32(this, _ChromeTargetManager_targetInterceptors, "f").get(client) || [];
    __classPrivateFieldGet32(this, _ChromeTargetManager_targetInterceptors, "f").set(client, interceptors.filter((currentInterceptor) => {
      return currentInterceptor !== interceptor;
    }));
  }
};
_ChromeTargetManager_connection = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_discoveredTargetsByTargetId = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_attachedTargetsByTargetId = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_attachedTargetsBySessionId = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_ignoredTargets = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_targetFilterCallback = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_targetFactory = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_targetInterceptors = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_attachedToTargetListenersBySession = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_detachedFromTargetListenersBySession = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_initializeCallback = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_initializePromise = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_targetsIdsForInit = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_storeExistingTargetsForInit = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onSessionDetached = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onTargetCreated = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onTargetDestroyed = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onTargetInfoChanged = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onAttachedToTarget = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_onDetachedFromTarget = /* @__PURE__ */ new WeakMap(), _ChromeTargetManager_instances = /* @__PURE__ */ new WeakSet(), _ChromeTargetManager_setupAttachmentListeners = function _ChromeTargetManager_setupAttachmentListeners2(session) {
  const listener = (event) => {
    return __classPrivateFieldGet32(this, _ChromeTargetManager_onAttachedToTarget, "f").call(this, session, event);
  };
  assert(!__classPrivateFieldGet32(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").has(session));
  __classPrivateFieldGet32(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").set(session, listener);
  session.on("Target.attachedToTarget", listener);
  const detachedListener = (event) => {
    return __classPrivateFieldGet32(this, _ChromeTargetManager_onDetachedFromTarget, "f").call(this, session, event);
  };
  assert(!__classPrivateFieldGet32(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").has(session));
  __classPrivateFieldGet32(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").set(session, detachedListener);
  session.on("Target.detachedFromTarget", detachedListener);
}, _ChromeTargetManager_removeAttachmentListeners = function _ChromeTargetManager_removeAttachmentListeners2(session) {
  if (__classPrivateFieldGet32(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").has(session)) {
    session.off("Target.attachedToTarget", __classPrivateFieldGet32(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").get(session));
    __classPrivateFieldGet32(this, _ChromeTargetManager_attachedToTargetListenersBySession, "f").delete(session);
  }
  if (__classPrivateFieldGet32(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").has(session)) {
    session.off("Target.detachedFromTarget", __classPrivateFieldGet32(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").get(session));
    __classPrivateFieldGet32(this, _ChromeTargetManager_detachedFromTargetListenersBySession, "f").delete(session);
  }
}, _ChromeTargetManager_finishInitializationIfReady = function _ChromeTargetManager_finishInitializationIfReady2(targetId) {
  targetId !== void 0 && __classPrivateFieldGet32(this, _ChromeTargetManager_targetsIdsForInit, "f").delete(targetId);
  if (__classPrivateFieldGet32(this, _ChromeTargetManager_targetsIdsForInit, "f").size === 0) {
    __classPrivateFieldGet32(this, _ChromeTargetManager_initializeCallback, "f").call(this);
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/FirefoxTargetManager.js
init_cjs_shim();
var __classPrivateFieldSet30 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet33 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FirefoxTargetManager_instances;
var _FirefoxTargetManager_connection;
var _FirefoxTargetManager_discoveredTargetsByTargetId;
var _FirefoxTargetManager_availableTargetsByTargetId;
var _FirefoxTargetManager_availableTargetsBySessionId;
var _FirefoxTargetManager_ignoredTargets;
var _FirefoxTargetManager_targetFilterCallback;
var _FirefoxTargetManager_targetFactory;
var _FirefoxTargetManager_targetInterceptors;
var _FirefoxTargetManager_attachedToTargetListenersBySession;
var _FirefoxTargetManager_initializeCallback;
var _FirefoxTargetManager_initializePromise;
var _FirefoxTargetManager_targetsIdsForInit;
var _FirefoxTargetManager_onSessionDetached;
var _FirefoxTargetManager_onTargetCreated;
var _FirefoxTargetManager_onTargetDestroyed;
var _FirefoxTargetManager_onAttachedToTarget;
var _FirefoxTargetManager_finishInitializationIfReady;
var FirefoxTargetManager = class extends EventEmitter {
  constructor(connection, targetFactory, targetFilterCallback) {
    super();
    _FirefoxTargetManager_instances.add(this);
    _FirefoxTargetManager_connection.set(this, void 0);
    _FirefoxTargetManager_discoveredTargetsByTargetId.set(this, /* @__PURE__ */ new Map());
    _FirefoxTargetManager_availableTargetsByTargetId.set(this, /* @__PURE__ */ new Map());
    _FirefoxTargetManager_availableTargetsBySessionId.set(this, /* @__PURE__ */ new Map());
    _FirefoxTargetManager_ignoredTargets.set(this, /* @__PURE__ */ new Set());
    _FirefoxTargetManager_targetFilterCallback.set(this, void 0);
    _FirefoxTargetManager_targetFactory.set(this, void 0);
    _FirefoxTargetManager_targetInterceptors.set(this, /* @__PURE__ */ new WeakMap());
    _FirefoxTargetManager_attachedToTargetListenersBySession.set(this, /* @__PURE__ */ new WeakMap());
    _FirefoxTargetManager_initializeCallback.set(this, () => {
    });
    _FirefoxTargetManager_initializePromise.set(this, new Promise((resolve2) => {
      __classPrivateFieldSet30(this, _FirefoxTargetManager_initializeCallback, resolve2, "f");
    }));
    _FirefoxTargetManager_targetsIdsForInit.set(this, /* @__PURE__ */ new Set());
    _FirefoxTargetManager_onSessionDetached.set(this, (session) => {
      this.removeSessionListeners(session);
      __classPrivateFieldGet33(this, _FirefoxTargetManager_targetInterceptors, "f").delete(session);
      __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsBySessionId, "f").delete(session.id());
    });
    _FirefoxTargetManager_onTargetCreated.set(this, async (event) => {
      if (__classPrivateFieldGet33(this, _FirefoxTargetManager_discoveredTargetsByTargetId, "f").has(event.targetInfo.targetId)) {
        return;
      }
      __classPrivateFieldGet33(this, _FirefoxTargetManager_discoveredTargetsByTargetId, "f").set(event.targetInfo.targetId, event.targetInfo);
      if (event.targetInfo.type === "browser" && event.targetInfo.attached) {
        const target2 = __classPrivateFieldGet33(this, _FirefoxTargetManager_targetFactory, "f").call(this, event.targetInfo, void 0);
        __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").set(event.targetInfo.targetId, target2);
        __classPrivateFieldGet33(this, _FirefoxTargetManager_instances, "m", _FirefoxTargetManager_finishInitializationIfReady).call(this, target2._targetId);
        return;
      }
      if (__classPrivateFieldGet33(this, _FirefoxTargetManager_targetFilterCallback, "f") && !__classPrivateFieldGet33(this, _FirefoxTargetManager_targetFilterCallback, "f").call(this, event.targetInfo)) {
        __classPrivateFieldGet33(this, _FirefoxTargetManager_ignoredTargets, "f").add(event.targetInfo.targetId);
        __classPrivateFieldGet33(this, _FirefoxTargetManager_instances, "m", _FirefoxTargetManager_finishInitializationIfReady).call(this, event.targetInfo.targetId);
        return;
      }
      const target = __classPrivateFieldGet33(this, _FirefoxTargetManager_targetFactory, "f").call(this, event.targetInfo, void 0);
      __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").set(event.targetInfo.targetId, target);
      this.emit("targetAvailable", target);
      __classPrivateFieldGet33(this, _FirefoxTargetManager_instances, "m", _FirefoxTargetManager_finishInitializationIfReady).call(this, target._targetId);
    });
    _FirefoxTargetManager_onTargetDestroyed.set(this, (event) => {
      __classPrivateFieldGet33(this, _FirefoxTargetManager_discoveredTargetsByTargetId, "f").delete(event.targetId);
      __classPrivateFieldGet33(this, _FirefoxTargetManager_instances, "m", _FirefoxTargetManager_finishInitializationIfReady).call(this, event.targetId);
      const target = __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").get(event.targetId);
      if (target) {
        this.emit("targetGone", target);
        __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").delete(event.targetId);
      }
    });
    _FirefoxTargetManager_onAttachedToTarget.set(this, async (parentSession, event) => {
      const targetInfo = event.targetInfo;
      const session = __classPrivateFieldGet33(this, _FirefoxTargetManager_connection, "f").session(event.sessionId);
      if (!session) {
        throw new Error(`Session ${event.sessionId} was not created.`);
      }
      const target = __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").get(targetInfo.targetId);
      assert(target, `Target ${targetInfo.targetId} is missing`);
      this.setupAttachmentListeners(session);
      __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsBySessionId, "f").set(session.id(), __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsByTargetId, "f").get(targetInfo.targetId));
      for (const hook of __classPrivateFieldGet33(this, _FirefoxTargetManager_targetInterceptors, "f").get(parentSession) || []) {
        if (!(parentSession instanceof Connection)) {
          assert(__classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsBySessionId, "f").has(parentSession.id()));
        }
        await hook(target, parentSession instanceof Connection ? null : __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsBySessionId, "f").get(parentSession.id()));
      }
    });
    __classPrivateFieldSet30(this, _FirefoxTargetManager_connection, connection, "f");
    __classPrivateFieldSet30(this, _FirefoxTargetManager_targetFilterCallback, targetFilterCallback, "f");
    __classPrivateFieldSet30(this, _FirefoxTargetManager_targetFactory, targetFactory, "f");
    __classPrivateFieldGet33(this, _FirefoxTargetManager_connection, "f").on("Target.targetCreated", __classPrivateFieldGet33(this, _FirefoxTargetManager_onTargetCreated, "f"));
    __classPrivateFieldGet33(this, _FirefoxTargetManager_connection, "f").on("Target.targetDestroyed", __classPrivateFieldGet33(this, _FirefoxTargetManager_onTargetDestroyed, "f"));
    __classPrivateFieldGet33(this, _FirefoxTargetManager_connection, "f").on("sessiondetached", __classPrivateFieldGet33(this, _FirefoxTargetManager_onSessionDetached, "f"));
    this.setupAttachmentListeners(__classPrivateFieldGet33(this, _FirefoxTargetManager_connection, "f"));
  }
  addTargetInterceptor(client, interceptor) {
    const interceptors = __classPrivateFieldGet33(this, _FirefoxTargetManager_targetInterceptors, "f").get(client) || [];
    interceptors.push(interceptor);
    __classPrivateFieldGet33(this, _FirefoxTargetManager_targetInterceptors, "f").set(client, interceptors);
  }
  removeTargetInterceptor(client, interceptor) {
    const interceptors = __classPrivateFieldGet33(this, _FirefoxTargetManager_targetInterceptors, "f").get(client) || [];
    __classPrivateFieldGet33(this, _FirefoxTargetManager_targetInterceptors, "f").set(client, interceptors.filter((currentInterceptor) => {
      return currentInterceptor !== interceptor;
    }));
  }
  setupAttachmentListeners(session) {
    const listener = (event) => {
      return __classPrivateFieldGet33(this, _FirefoxTargetManager_onAttachedToTarget, "f").call(this, session, event);
    };
    assert(!__classPrivateFieldGet33(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").has(session));
    __classPrivateFieldGet33(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").set(session, listener);
    session.on("Target.attachedToTarget", listener);
  }
  removeSessionListeners(session) {
    if (__classPrivateFieldGet33(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").has(session)) {
      session.off("Target.attachedToTarget", __classPrivateFieldGet33(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").get(session));
      __classPrivateFieldGet33(this, _FirefoxTargetManager_attachedToTargetListenersBySession, "f").delete(session);
    }
  }
  getAvailableTargets() {
    return __classPrivateFieldGet33(this, _FirefoxTargetManager_availableTargetsByTargetId, "f");
  }
  dispose() {
    __classPrivateFieldGet33(this, _FirefoxTargetManager_connection, "f").off("Target.targetCreated", __classPrivateFieldGet33(this, _FirefoxTargetManager_onTargetCreated, "f"));
    __classPrivateFieldGet33(this, _FirefoxTargetManager_connection, "f").off("Target.targetDestroyed", __classPrivateFieldGet33(this, _FirefoxTargetManager_onTargetDestroyed, "f"));
  }
  async initialize() {
    await __classPrivateFieldGet33(this, _FirefoxTargetManager_connection, "f").send("Target.setDiscoverTargets", { discover: true });
    __classPrivateFieldSet30(this, _FirefoxTargetManager_targetsIdsForInit, new Set(__classPrivateFieldGet33(this, _FirefoxTargetManager_discoveredTargetsByTargetId, "f").keys()), "f");
    await __classPrivateFieldGet33(this, _FirefoxTargetManager_initializePromise, "f");
  }
};
_FirefoxTargetManager_connection = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_discoveredTargetsByTargetId = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_availableTargetsByTargetId = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_availableTargetsBySessionId = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_ignoredTargets = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_targetFilterCallback = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_targetFactory = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_targetInterceptors = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_attachedToTargetListenersBySession = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_initializeCallback = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_initializePromise = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_targetsIdsForInit = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_onSessionDetached = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_onTargetCreated = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_onTargetDestroyed = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_onAttachedToTarget = /* @__PURE__ */ new WeakMap(), _FirefoxTargetManager_instances = /* @__PURE__ */ new WeakSet(), _FirefoxTargetManager_finishInitializationIfReady = function _FirefoxTargetManager_finishInitializationIfReady2(targetId) {
  __classPrivateFieldGet33(this, _FirefoxTargetManager_targetsIdsForInit, "f").delete(targetId);
  if (__classPrivateFieldGet33(this, _FirefoxTargetManager_targetsIdsForInit, "f").size === 0) {
    __classPrivateFieldGet33(this, _FirefoxTargetManager_initializeCallback, "f").call(this);
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/api/Browser.js
init_cjs_shim();
var WEB_PERMISSION_TO_PROTOCOL_PERMISSION = /* @__PURE__ */ new Map([
  ["geolocation", "geolocation"],
  ["midi", "midi"],
  ["notifications", "notifications"],
  // TODO: push isn't a valid type?
  // ['push', 'push'],
  ["camera", "videoCapture"],
  ["microphone", "audioCapture"],
  ["background-sync", "backgroundSync"],
  ["ambient-light-sensor", "sensors"],
  ["accelerometer", "sensors"],
  ["gyroscope", "sensors"],
  ["magnetometer", "sensors"],
  ["accessibility-events", "accessibilityEvents"],
  ["clipboard-read", "clipboardReadWrite"],
  ["clipboard-write", "clipboardReadWrite"],
  ["payment-handler", "paymentHandler"],
  ["persistent-storage", "durableStorage"],
  ["idle-detection", "idleDetection"],
  // chrome-specific permissions we have.
  ["midi-sysex", "midiSysex"]
]);
var Browser = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * @internal
   */
  _attach() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  _detach() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  get _targets() {
    throw new Error("Not implemented");
  }
  /**
   * The spawned browser process. Returns `null` if the browser instance was created with
   * {@link Puppeteer.connect}.
   */
  process() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  _getIsPageTargetCallback() {
    throw new Error("Not implemented");
  }
  createIncognitoBrowserContext() {
    throw new Error("Not implemented");
  }
  /**
   * Returns an array of all open browser contexts. In a newly created browser, this will
   * return a single instance of {@link BrowserContext}.
   */
  browserContexts() {
    throw new Error("Not implemented");
  }
  /**
   * Returns the default browser context. The default browser context cannot be closed.
   */
  defaultBrowserContext() {
    throw new Error("Not implemented");
  }
  _disposeContext() {
    throw new Error("Not implemented");
  }
  /**
   * The browser websocket endpoint which can be used as an argument to
   * {@link Puppeteer.connect}.
   *
   * @returns The Browser websocket url.
   *
   * @remarks
   *
   * The format is `ws://${host}:${port}/devtools/browser/<id>`.
   *
   * You can find the `webSocketDebuggerUrl` from `http://${host}:${port}/json/version`.
   * Learn more about the
   * {@link https://chromedevtools.github.io/devtools-protocol | devtools protocol} and
   * the {@link
   * https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target
   * | browser endpoint}.
   */
  wsEndpoint() {
    throw new Error("Not implemented");
  }
  /**
   * Promise which resolves to a new {@link Page} object. The Page is created in
   * a default browser context.
   */
  newPage() {
    throw new Error("Not implemented");
  }
  _createPageInContext() {
    throw new Error("Not implemented");
  }
  /**
   * All active targets inside the Browser. In case of multiple browser contexts, returns
   * an array with all the targets in all browser contexts.
   */
  targets() {
    throw new Error("Not implemented");
  }
  /**
   * The target associated with the browser.
   */
  target() {
    throw new Error("Not implemented");
  }
  waitForTarget() {
    throw new Error("Not implemented");
  }
  /**
   * An array of all open pages inside the Browser.
   *
   * @remarks
   *
   * In case of multiple browser contexts, returns an array with all the pages in all
   * browser contexts. Non-visible pages, such as `"background_page"`, will not be listed
   * here. You can find them using {@link Target.page}.
   */
  pages() {
    throw new Error("Not implemented");
  }
  /**
   * A string representing the browser name and version.
   *
   * @remarks
   *
   * For headless Chromium, this is similar to `HeadlessChrome/61.0.3153.0`. For
   * non-headless, this is similar to `Chrome/61.0.3153.0`.
   *
   * The format of browser.version() might change with future releases of Chromium.
   */
  version() {
    throw new Error("Not implemented");
  }
  /**
   * The browser's original user agent. Pages can override the browser user agent with
   * {@link Page.setUserAgent}.
   */
  userAgent() {
    throw new Error("Not implemented");
  }
  /**
   * Closes Chromium and all of its pages (if any were opened). The {@link Browser} object
   * itself is considered to be disposed and cannot be used anymore.
   */
  close() {
    throw new Error("Not implemented");
  }
  /**
   * Disconnects Puppeteer from the browser, but leaves the Chromium process running.
   * After calling `disconnect`, the {@link Browser} object is considered disposed and
   * cannot be used anymore.
   */
  disconnect() {
    throw new Error("Not implemented");
  }
  /**
   * Indicates that the browser is connected.
   */
  isConnected() {
    throw new Error("Not implemented");
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/api/BrowserContext.js
init_cjs_shim();
var BrowserContext = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * An array of all active targets inside the browser context.
   */
  targets() {
    throw new Error("Not implemented");
  }
  waitForTarget() {
    throw new Error("Not implemented");
  }
  /**
   * An array of all pages inside the browser context.
   *
   * @returns Promise which resolves to an array of all open pages.
   * Non visible pages, such as `"background_page"`, will not be listed here.
   * You can find them using {@link Target.page | the target page}.
   */
  pages() {
    throw new Error("Not implemented");
  }
  /**
   * Returns whether BrowserContext is incognito.
   * The default browser context is the only non-incognito browser context.
   *
   * @remarks
   * The default browser context cannot be closed.
   */
  isIncognito() {
    throw new Error("Not implemented");
  }
  overridePermissions() {
    throw new Error("Not implemented");
  }
  /**
   * Clears all permission overrides for the browser context.
   *
   * @example
   *
   * ```ts
   * const context = browser.defaultBrowserContext();
   * context.overridePermissions('https://example.com', ['clipboard-read']);
   * // do stuff ..
   * context.clearPermissionOverrides();
   * ```
   */
  clearPermissionOverrides() {
    throw new Error("Not implemented");
  }
  /**
   * Creates a new page in the browser context.
   */
  newPage() {
    throw new Error("Not implemented");
  }
  /**
   * The browser this browser context belongs to.
   */
  browser() {
    throw new Error("Not implemented");
  }
  /**
   * Closes the browser context. All the targets that belong to the browser context
   * will be closed.
   *
   * @remarks
   * Only incognito browser contexts can be closed.
   */
  close() {
    throw new Error("Not implemented");
  }
  get id() {
    return void 0;
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Browser.js
var __classPrivateFieldSet31 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet34 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CDPBrowser_instances;
var _CDPBrowser_ignoreHTTPSErrors;
var _CDPBrowser_defaultViewport;
var _CDPBrowser_process;
var _CDPBrowser_connection;
var _CDPBrowser_closeCallback;
var _CDPBrowser_targetFilterCallback;
var _CDPBrowser_isPageTargetCallback;
var _CDPBrowser_defaultContext;
var _CDPBrowser_contexts;
var _CDPBrowser_screenshotTaskQueue;
var _CDPBrowser_targetManager;
var _CDPBrowser_emitDisconnected;
var _CDPBrowser_setIsPageTargetCallback;
var _CDPBrowser_createTarget;
var _CDPBrowser_onAttachedToTarget;
var _CDPBrowser_onDetachedFromTarget;
var _CDPBrowser_onTargetChanged;
var _CDPBrowser_onTargetDiscovered;
var _CDPBrowser_getVersion;
var _CDPBrowserContext_connection;
var _CDPBrowserContext_browser;
var _CDPBrowserContext_id;
var CDPBrowser = class extends Browser {
  /**
   * @internal
   */
  constructor(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback) {
    super();
    _CDPBrowser_instances.add(this);
    _CDPBrowser_ignoreHTTPSErrors.set(this, void 0);
    _CDPBrowser_defaultViewport.set(this, void 0);
    _CDPBrowser_process.set(this, void 0);
    _CDPBrowser_connection.set(this, void 0);
    _CDPBrowser_closeCallback.set(this, void 0);
    _CDPBrowser_targetFilterCallback.set(this, void 0);
    _CDPBrowser_isPageTargetCallback.set(this, void 0);
    _CDPBrowser_defaultContext.set(this, void 0);
    _CDPBrowser_contexts.set(this, void 0);
    _CDPBrowser_screenshotTaskQueue.set(this, void 0);
    _CDPBrowser_targetManager.set(this, void 0);
    _CDPBrowser_emitDisconnected.set(this, () => {
      this.emit(
        "disconnected"
        /* BrowserEmittedEvents.Disconnected */
      );
    });
    _CDPBrowser_createTarget.set(this, (targetInfo, session) => {
      var _a2;
      const { browserContextId } = targetInfo;
      const context = browserContextId && __classPrivateFieldGet34(this, _CDPBrowser_contexts, "f").has(browserContextId) ? __classPrivateFieldGet34(this, _CDPBrowser_contexts, "f").get(browserContextId) : __classPrivateFieldGet34(this, _CDPBrowser_defaultContext, "f");
      if (!context) {
        throw new Error("Missing browser context");
      }
      return new Target(targetInfo, session, context, __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f"), (isAutoAttachEmulated) => {
        return __classPrivateFieldGet34(this, _CDPBrowser_connection, "f")._createSession(targetInfo, isAutoAttachEmulated);
      }, __classPrivateFieldGet34(this, _CDPBrowser_ignoreHTTPSErrors, "f"), (_a2 = __classPrivateFieldGet34(this, _CDPBrowser_defaultViewport, "f")) !== null && _a2 !== void 0 ? _a2 : null, __classPrivateFieldGet34(this, _CDPBrowser_screenshotTaskQueue, "f"), __classPrivateFieldGet34(this, _CDPBrowser_isPageTargetCallback, "f"));
    });
    _CDPBrowser_onAttachedToTarget.set(this, async (target) => {
      if (await target._initializedPromise) {
        this.emit("targetcreated", target);
        target.browserContext().emit("targetcreated", target);
      }
    });
    _CDPBrowser_onDetachedFromTarget.set(this, async (target) => {
      target._initializedCallback(false);
      target._closedCallback();
      if (await target._initializedPromise) {
        this.emit("targetdestroyed", target);
        target.browserContext().emit("targetdestroyed", target);
      }
    });
    _CDPBrowser_onTargetChanged.set(this, ({ target, targetInfo }) => {
      const previousURL = target.url();
      const wasInitialized = target._isInitialized;
      target._targetInfoChanged(targetInfo);
      if (wasInitialized && previousURL !== target.url()) {
        this.emit("targetchanged", target);
        target.browserContext().emit("targetchanged", target);
      }
    });
    _CDPBrowser_onTargetDiscovered.set(this, (targetInfo) => {
      this.emit("targetdiscovered", targetInfo);
    });
    product = product || "chrome";
    __classPrivateFieldSet31(this, _CDPBrowser_ignoreHTTPSErrors, ignoreHTTPSErrors, "f");
    __classPrivateFieldSet31(this, _CDPBrowser_defaultViewport, defaultViewport, "f");
    __classPrivateFieldSet31(this, _CDPBrowser_process, process2, "f");
    __classPrivateFieldSet31(this, _CDPBrowser_screenshotTaskQueue, new TaskQueue(), "f");
    __classPrivateFieldSet31(this, _CDPBrowser_connection, connection, "f");
    __classPrivateFieldSet31(this, _CDPBrowser_closeCallback, closeCallback || function() {
    }, "f");
    __classPrivateFieldSet31(this, _CDPBrowser_targetFilterCallback, targetFilterCallback || (() => {
      return true;
    }), "f");
    __classPrivateFieldGet34(this, _CDPBrowser_instances, "m", _CDPBrowser_setIsPageTargetCallback).call(this, isPageTargetCallback);
    if (product === "firefox") {
      __classPrivateFieldSet31(this, _CDPBrowser_targetManager, new FirefoxTargetManager(connection, __classPrivateFieldGet34(this, _CDPBrowser_createTarget, "f"), __classPrivateFieldGet34(this, _CDPBrowser_targetFilterCallback, "f")), "f");
    } else {
      __classPrivateFieldSet31(this, _CDPBrowser_targetManager, new ChromeTargetManager(connection, __classPrivateFieldGet34(this, _CDPBrowser_createTarget, "f"), __classPrivateFieldGet34(this, _CDPBrowser_targetFilterCallback, "f")), "f");
    }
    __classPrivateFieldSet31(this, _CDPBrowser_defaultContext, new CDPBrowserContext(__classPrivateFieldGet34(this, _CDPBrowser_connection, "f"), this), "f");
    __classPrivateFieldSet31(this, _CDPBrowser_contexts, /* @__PURE__ */ new Map(), "f");
    for (const contextId of contextIds) {
      __classPrivateFieldGet34(this, _CDPBrowser_contexts, "f").set(contextId, new CDPBrowserContext(__classPrivateFieldGet34(this, _CDPBrowser_connection, "f"), this, contextId));
    }
  }
  /**
   * @internal
   */
  static async _create(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback) {
    const browser = new CDPBrowser(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback);
    await browser._attach();
    return browser;
  }
  /**
   * @internal
   */
  get _targets() {
    return __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").getAvailableTargets();
  }
  /**
   * @internal
   */
  async _attach() {
    __classPrivateFieldGet34(this, _CDPBrowser_connection, "f").on(ConnectionEmittedEvents.Disconnected, __classPrivateFieldGet34(this, _CDPBrowser_emitDisconnected, "f"));
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").on("targetAvailable", __classPrivateFieldGet34(this, _CDPBrowser_onAttachedToTarget, "f"));
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").on("targetGone", __classPrivateFieldGet34(this, _CDPBrowser_onDetachedFromTarget, "f"));
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").on("targetChanged", __classPrivateFieldGet34(this, _CDPBrowser_onTargetChanged, "f"));
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").on("targetDiscovered", __classPrivateFieldGet34(this, _CDPBrowser_onTargetDiscovered, "f"));
    await __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").initialize();
  }
  /**
   * @internal
   */
  _detach() {
    __classPrivateFieldGet34(this, _CDPBrowser_connection, "f").off(ConnectionEmittedEvents.Disconnected, __classPrivateFieldGet34(this, _CDPBrowser_emitDisconnected, "f"));
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").off("targetAvailable", __classPrivateFieldGet34(this, _CDPBrowser_onAttachedToTarget, "f"));
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").off("targetGone", __classPrivateFieldGet34(this, _CDPBrowser_onDetachedFromTarget, "f"));
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").off("targetChanged", __classPrivateFieldGet34(this, _CDPBrowser_onTargetChanged, "f"));
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").off("targetDiscovered", __classPrivateFieldGet34(this, _CDPBrowser_onTargetDiscovered, "f"));
  }
  /**
   * The spawned browser process. Returns `null` if the browser instance was created with
   * {@link Puppeteer.connect}.
   */
  process() {
    var _a2;
    return (_a2 = __classPrivateFieldGet34(this, _CDPBrowser_process, "f")) !== null && _a2 !== void 0 ? _a2 : null;
  }
  /**
   * @internal
   */
  _targetManager() {
    return __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f");
  }
  /**
   * @internal
   */
  _getIsPageTargetCallback() {
    return __classPrivateFieldGet34(this, _CDPBrowser_isPageTargetCallback, "f");
  }
  /**
   * Creates a new incognito browser context. This won't share cookies/cache with other
   * browser contexts.
   *
   * @example
   *
   * ```ts
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   // Create a new incognito browser context.
   *   const context = await browser.createIncognitoBrowserContext();
   *   // Create a new page in a pristine context.
   *   const page = await context.newPage();
   *   // Do stuff
   *   await page.goto('https://example.com');
   * })();
   * ```
   */
  async createIncognitoBrowserContext(options = {}) {
    const { proxyServer, proxyBypassList } = options;
    const { browserContextId } = await __classPrivateFieldGet34(this, _CDPBrowser_connection, "f").send("Target.createBrowserContext", {
      proxyServer,
      proxyBypassList: proxyBypassList && proxyBypassList.join(",")
    });
    const context = new CDPBrowserContext(__classPrivateFieldGet34(this, _CDPBrowser_connection, "f"), this, browserContextId);
    __classPrivateFieldGet34(this, _CDPBrowser_contexts, "f").set(browserContextId, context);
    return context;
  }
  /**
   * Returns an array of all open browser contexts. In a newly created browser, this will
   * return a single instance of {@link BrowserContext}.
   */
  browserContexts() {
    return [__classPrivateFieldGet34(this, _CDPBrowser_defaultContext, "f"), ...Array.from(__classPrivateFieldGet34(this, _CDPBrowser_contexts, "f").values())];
  }
  /**
   * Returns the default browser context. The default browser context cannot be closed.
   */
  defaultBrowserContext() {
    return __classPrivateFieldGet34(this, _CDPBrowser_defaultContext, "f");
  }
  /**
   * @internal
   */
  async _disposeContext(contextId) {
    if (!contextId) {
      return;
    }
    await __classPrivateFieldGet34(this, _CDPBrowser_connection, "f").send("Target.disposeBrowserContext", {
      browserContextId: contextId
    });
    __classPrivateFieldGet34(this, _CDPBrowser_contexts, "f").delete(contextId);
  }
  /**
   * The browser websocket endpoint which can be used as an argument to
   * {@link Puppeteer.connect}.
   *
   * @returns The Browser websocket url.
   *
   * @remarks
   *
   * The format is `ws://${host}:${port}/devtools/browser/<id>`.
   *
   * You can find the `webSocketDebuggerUrl` from `http://${host}:${port}/json/version`.
   * Learn more about the
   * {@link https://chromedevtools.github.io/devtools-protocol | devtools protocol} and
   * the {@link
   * https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target
   * | browser endpoint}.
   */
  wsEndpoint() {
    return __classPrivateFieldGet34(this, _CDPBrowser_connection, "f").url();
  }
  /**
   * Promise which resolves to a new {@link Page} object. The Page is created in
   * a default browser context.
   */
  async newPage() {
    return __classPrivateFieldGet34(this, _CDPBrowser_defaultContext, "f").newPage();
  }
  /**
   * @internal
   */
  async _createPageInContext(contextId) {
    const { targetId } = await __classPrivateFieldGet34(this, _CDPBrowser_connection, "f").send("Target.createTarget", {
      url: "about:blank",
      browserContextId: contextId || void 0
    });
    const target = __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").getAvailableTargets().get(targetId);
    if (!target) {
      throw new Error(`Missing target for page (id = ${targetId})`);
    }
    const initialized = await target._initializedPromise;
    if (!initialized) {
      throw new Error(`Failed to create target for page (id = ${targetId})`);
    }
    const page = await target.page();
    if (!page) {
      throw new Error(`Failed to create a page for context (id = ${contextId})`);
    }
    return page;
  }
  /**
   * All active targets inside the Browser. In case of multiple browser contexts, returns
   * an array with all the targets in all browser contexts.
   */
  targets() {
    return Array.from(__classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").getAvailableTargets().values()).filter((target) => {
      return target._isInitialized;
    });
  }
  /**
   * The target associated with the browser.
   */
  target() {
    const browserTarget = this.targets().find((target) => {
      return target.type() === "browser";
    });
    if (!browserTarget) {
      throw new Error("Browser target is not found");
    }
    return browserTarget;
  }
  /**
   * Searches for a target in all browser contexts.
   *
   * @param predicate - A function to be run for every target.
   * @returns The first target found that matches the `predicate` function.
   *
   * @example
   *
   * An example of finding a target for a page opened via `window.open`:
   *
   * ```ts
   * await page.evaluate(() => window.open('https://www.example.com/'));
   * const newWindowTarget = await browser.waitForTarget(
   *   target => target.url() === 'https://www.example.com/'
   * );
   * ```
   */
  async waitForTarget(predicate, options = {}) {
    const { timeout = 3e4 } = options;
    let resolve2;
    let isResolved = false;
    const targetPromise = new Promise((x) => {
      return resolve2 = x;
    });
    this.on("targetcreated", check);
    this.on("targetchanged", check);
    try {
      this.targets().forEach(check);
      if (!timeout) {
        return await targetPromise;
      }
      return await waitWithTimeout(targetPromise, "target", timeout);
    } finally {
      this.off("targetcreated", check);
      this.off("targetchanged", check);
    }
    async function check(target) {
      if (await predicate(target) && !isResolved) {
        isResolved = true;
        resolve2(target);
      }
    }
  }
  /**
   * An array of all open pages inside the Browser.
   *
   * @remarks
   *
   * In case of multiple browser contexts, returns an array with all the pages in all
   * browser contexts. Non-visible pages, such as `"background_page"`, will not be listed
   * here. You can find them using {@link Target.page}.
   */
  async pages() {
    const contextPages = await Promise.all(this.browserContexts().map((context) => {
      return context.pages();
    }));
    return contextPages.reduce((acc, x) => {
      return acc.concat(x);
    }, []);
  }
  /**
   * A string representing the browser name and version.
   *
   * @remarks
   *
   * For headless Chromium, this is similar to `HeadlessChrome/61.0.3153.0`. For
   * non-headless, this is similar to `Chrome/61.0.3153.0`.
   *
   * The format of browser.version() might change with future releases of Chromium.
   */
  async version() {
    const version = await __classPrivateFieldGet34(this, _CDPBrowser_instances, "m", _CDPBrowser_getVersion).call(this);
    return version.product;
  }
  /**
   * The browser's original user agent. Pages can override the browser user agent with
   * {@link Page.setUserAgent}.
   */
  async userAgent() {
    const version = await __classPrivateFieldGet34(this, _CDPBrowser_instances, "m", _CDPBrowser_getVersion).call(this);
    return version.userAgent;
  }
  /**
   * Closes Chromium and all of its pages (if any were opened). The
   * {@link CDPBrowser} object itself is considered to be disposed and cannot be
   * used anymore.
   */
  async close() {
    await __classPrivateFieldGet34(this, _CDPBrowser_closeCallback, "f").call(null);
    this.disconnect();
  }
  /**
   * Disconnects Puppeteer from the browser, but leaves the Chromium process running.
   * After calling `disconnect`, the {@link CDPBrowser} object is considered disposed and
   * cannot be used anymore.
   */
  disconnect() {
    __classPrivateFieldGet34(this, _CDPBrowser_targetManager, "f").dispose();
    __classPrivateFieldGet34(this, _CDPBrowser_connection, "f").dispose();
  }
  /**
   * Indicates that the browser is connected.
   */
  isConnected() {
    return !__classPrivateFieldGet34(this, _CDPBrowser_connection, "f")._closed;
  }
};
_CDPBrowser_ignoreHTTPSErrors = /* @__PURE__ */ new WeakMap(), _CDPBrowser_defaultViewport = /* @__PURE__ */ new WeakMap(), _CDPBrowser_process = /* @__PURE__ */ new WeakMap(), _CDPBrowser_connection = /* @__PURE__ */ new WeakMap(), _CDPBrowser_closeCallback = /* @__PURE__ */ new WeakMap(), _CDPBrowser_targetFilterCallback = /* @__PURE__ */ new WeakMap(), _CDPBrowser_isPageTargetCallback = /* @__PURE__ */ new WeakMap(), _CDPBrowser_defaultContext = /* @__PURE__ */ new WeakMap(), _CDPBrowser_contexts = /* @__PURE__ */ new WeakMap(), _CDPBrowser_screenshotTaskQueue = /* @__PURE__ */ new WeakMap(), _CDPBrowser_targetManager = /* @__PURE__ */ new WeakMap(), _CDPBrowser_emitDisconnected = /* @__PURE__ */ new WeakMap(), _CDPBrowser_createTarget = /* @__PURE__ */ new WeakMap(), _CDPBrowser_onAttachedToTarget = /* @__PURE__ */ new WeakMap(), _CDPBrowser_onDetachedFromTarget = /* @__PURE__ */ new WeakMap(), _CDPBrowser_onTargetChanged = /* @__PURE__ */ new WeakMap(), _CDPBrowser_onTargetDiscovered = /* @__PURE__ */ new WeakMap(), _CDPBrowser_instances = /* @__PURE__ */ new WeakSet(), _CDPBrowser_setIsPageTargetCallback = function _CDPBrowser_setIsPageTargetCallback2(isPageTargetCallback) {
  __classPrivateFieldSet31(this, _CDPBrowser_isPageTargetCallback, isPageTargetCallback || ((target) => {
    return target.type === "page" || target.type === "background_page" || target.type === "webview";
  }), "f");
}, _CDPBrowser_getVersion = function _CDPBrowser_getVersion2() {
  return __classPrivateFieldGet34(this, _CDPBrowser_connection, "f").send("Browser.getVersion");
};
var CDPBrowserContext = class extends BrowserContext {
  /**
   * @internal
   */
  constructor(connection, browser, contextId) {
    super();
    _CDPBrowserContext_connection.set(this, void 0);
    _CDPBrowserContext_browser.set(this, void 0);
    _CDPBrowserContext_id.set(this, void 0);
    __classPrivateFieldSet31(this, _CDPBrowserContext_connection, connection, "f");
    __classPrivateFieldSet31(this, _CDPBrowserContext_browser, browser, "f");
    __classPrivateFieldSet31(this, _CDPBrowserContext_id, contextId, "f");
  }
  get id() {
    return __classPrivateFieldGet34(this, _CDPBrowserContext_id, "f");
  }
  /**
   * An array of all active targets inside the browser context.
   */
  targets() {
    return __classPrivateFieldGet34(this, _CDPBrowserContext_browser, "f").targets().filter((target) => {
      return target.browserContext() === this;
    });
  }
  /**
   * This searches for a target in this specific browser context.
   *
   * @example
   * An example of finding a target for a page opened via `window.open`:
   *
   * ```ts
   * await page.evaluate(() => window.open('https://www.example.com/'));
   * const newWindowTarget = await browserContext.waitForTarget(
   *   target => target.url() === 'https://www.example.com/'
   * );
   * ```
   *
   * @param predicate - A function to be run for every target
   * @param options - An object of options. Accepts a timout,
   * which is the maximum wait time in milliseconds.
   * Pass `0` to disable the timeout. Defaults to 30 seconds.
   * @returns Promise which resolves to the first target found
   * that matches the `predicate` function.
   */
  waitForTarget(predicate, options = {}) {
    return __classPrivateFieldGet34(this, _CDPBrowserContext_browser, "f").waitForTarget((target) => {
      return target.browserContext() === this && predicate(target);
    }, options);
  }
  /**
   * An array of all pages inside the browser context.
   *
   * @returns Promise which resolves to an array of all open pages.
   * Non visible pages, such as `"background_page"`, will not be listed here.
   * You can find them using {@link Target.page | the target page}.
   */
  async pages() {
    const pages = await Promise.all(this.targets().filter((target) => {
      var _a2;
      return target.type() === "page" || target.type() === "other" && ((_a2 = __classPrivateFieldGet34(this, _CDPBrowserContext_browser, "f")._getIsPageTargetCallback()) === null || _a2 === void 0 ? void 0 : _a2(target._getTargetInfo()));
    }).map((target) => {
      return target.page();
    }));
    return pages.filter((page) => {
      return !!page;
    });
  }
  /**
   * Returns whether BrowserContext is incognito.
   * The default browser context is the only non-incognito browser context.
   *
   * @remarks
   * The default browser context cannot be closed.
   */
  isIncognito() {
    return !!__classPrivateFieldGet34(this, _CDPBrowserContext_id, "f");
  }
  /**
   * @example
   *
   * ```ts
   * const context = browser.defaultBrowserContext();
   * await context.overridePermissions('https://html5demos.com', [
   *   'geolocation',
   * ]);
   * ```
   *
   * @param origin - The origin to grant permissions to, e.g. "https://example.com".
   * @param permissions - An array of permissions to grant.
   * All permissions that are not listed here will be automatically denied.
   */
  async overridePermissions(origin, permissions) {
    const protocolPermissions = permissions.map((permission) => {
      const protocolPermission = WEB_PERMISSION_TO_PROTOCOL_PERMISSION.get(permission);
      if (!protocolPermission) {
        throw new Error("Unknown permission: " + permission);
      }
      return protocolPermission;
    });
    await __classPrivateFieldGet34(this, _CDPBrowserContext_connection, "f").send("Browser.grantPermissions", {
      origin,
      browserContextId: __classPrivateFieldGet34(this, _CDPBrowserContext_id, "f") || void 0,
      permissions: protocolPermissions
    });
  }
  /**
   * Clears all permission overrides for the browser context.
   *
   * @example
   *
   * ```ts
   * const context = browser.defaultBrowserContext();
   * context.overridePermissions('https://example.com', ['clipboard-read']);
   * // do stuff ..
   * context.clearPermissionOverrides();
   * ```
   */
  async clearPermissionOverrides() {
    await __classPrivateFieldGet34(this, _CDPBrowserContext_connection, "f").send("Browser.resetPermissions", {
      browserContextId: __classPrivateFieldGet34(this, _CDPBrowserContext_id, "f") || void 0
    });
  }
  /**
   * Creates a new page in the browser context.
   */
  newPage() {
    return __classPrivateFieldGet34(this, _CDPBrowserContext_browser, "f")._createPageInContext(__classPrivateFieldGet34(this, _CDPBrowserContext_id, "f"));
  }
  /**
   * The browser this browser context belongs to.
   */
  browser() {
    return __classPrivateFieldGet34(this, _CDPBrowserContext_browser, "f");
  }
  /**
   * Closes the browser context. All the targets that belong to the browser context
   * will be closed.
   *
   * @remarks
   * Only incognito browser contexts can be closed.
   */
  async close() {
    assert(__classPrivateFieldGet34(this, _CDPBrowserContext_id, "f"), "Non-incognito profiles cannot be closed!");
    await __classPrivateFieldGet34(this, _CDPBrowserContext_browser, "f")._disposeContext(__classPrivateFieldGet34(this, _CDPBrowserContext_id, "f"));
  }
};
_CDPBrowserContext_connection = /* @__PURE__ */ new WeakMap(), _CDPBrowserContext_browser = /* @__PURE__ */ new WeakMap(), _CDPBrowserContext_id = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/fetch.js
init_cjs_shim();
var getFetch = async () => {
  return globalThis.fetch || (await import("./node-ponyfill-IUDHPXVP.mjs")).fetch;
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/BrowserConnector.js
var getWebSocketTransportClass = async () => {
  return isNode ? (await import("./NodeWebSocketTransport-34DTIRU5.mjs")).NodeWebSocketTransport : (await import("./BrowserWebSocketTransport-CYQW4DLU.mjs")).BrowserWebSocketTransport;
};
async function _connectToCDPBrowser(options) {
  const { browserWSEndpoint, browserURL, ignoreHTTPSErrors = false, defaultViewport = { width: 800, height: 600 }, transport, slowMo = 0, targetFilter, _isPageTarget: isPageTarget } = options;
  assert(Number(!!browserWSEndpoint) + Number(!!browserURL) + Number(!!transport) === 1, "Exactly one of browserWSEndpoint, browserURL or transport must be passed to puppeteer.connect");
  let connection;
  if (transport) {
    connection = new Connection("", transport, slowMo);
  } else if (browserWSEndpoint) {
    const WebSocketClass = await getWebSocketTransportClass();
    const connectionTransport = await WebSocketClass.create(browserWSEndpoint);
    connection = new Connection(browserWSEndpoint, connectionTransport, slowMo);
  } else if (browserURL) {
    const connectionURL = await getWSEndpoint(browserURL);
    const WebSocketClass = await getWebSocketTransportClass();
    const connectionTransport = await WebSocketClass.create(connectionURL);
    connection = new Connection(connectionURL, connectionTransport, slowMo);
  }
  const version = await connection.send("Browser.getVersion");
  const product = version.product.toLowerCase().includes("firefox") ? "firefox" : "chrome";
  const { browserContextIds } = await connection.send("Target.getBrowserContexts");
  const browser = await CDPBrowser._create(product || "chrome", connection, browserContextIds, ignoreHTTPSErrors, defaultViewport, void 0, () => {
    return connection.send("Browser.close").catch(debugError);
  }, targetFilter, isPageTarget);
  return browser;
}
async function getWSEndpoint(browserURL) {
  const endpointURL = new URL("/json/version", browserURL);
  const fetch = await getFetch();
  try {
    const result = await fetch(endpointURL.toString(), {
      method: "GET"
    });
    if (!result.ok) {
      throw new Error(`HTTP ${result.statusText}`);
    }
    const data = await result.json();
    return data.webSocketDebuggerUrl;
  } catch (error) {
    if (isErrorLike(error)) {
      error.message = `Failed to fetch browser webSocket URL from ${endpointURL}: ` + error.message;
    }
    throw error;
  }
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/Puppeteer.js
var Puppeteer = class {
  /**
   * @internal
   */
  constructor(settings) {
    this._changedProduct = false;
    this._isPuppeteerCore = settings.isPuppeteerCore;
    this.connect = this.connect.bind(this);
  }
  /**
   * Registers a {@link CustomQueryHandler | custom query handler}.
   *
   * @remarks
   * After registration, the handler can be used everywhere where a selector is
   * expected by prepending the selection string with `<name>/`. The name is only
   * allowed to consist of lower- and upper case latin letters.
   *
   * @example
   *
   * ```
   * puppeteer.registerCustomQueryHandler('text', { … });
   * const aHandle = await page.$('text/…');
   * ```
   *
   * @param name - The name that the custom query handler will be registered
   * under.
   * @param queryHandler - The {@link CustomQueryHandler | custom query handler}
   * to register.
   *
   * @public
   */
  static registerCustomQueryHandler(name, queryHandler) {
    return registerCustomQueryHandler(name, queryHandler);
  }
  /**
   * Unregisters a custom query handler for a given name.
   */
  static unregisterCustomQueryHandler(name) {
    return unregisterCustomQueryHandler(name);
  }
  /**
   * Gets the names of all custom query handlers.
   */
  static customQueryHandlerNames() {
    return customQueryHandlerNames();
  }
  /**
   * Unregisters all custom query handlers.
   */
  static clearCustomQueryHandlers() {
    return clearCustomQueryHandlers();
  }
  /**
   * This method attaches Puppeteer to an existing browser instance.
   *
   * @remarks
   *
   * @param options - Set of configurable options to set on the browser.
   * @returns Promise which resolves to browser instance.
   */
  connect(options) {
    return _connectToCDPBrowser(options);
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/BrowserFetcher.js
init_cjs_shim();
var import_extract_zip = __toESM(require_extract_zip(), 1);
var import_https_proxy_agent = __toESM(require_dist(), 1);
var import_proxy_from_env = __toESM(require_proxy_from_env(), 1);
var import_rimraf = __toESM(require_rimraf(), 1);
var import_tar_fs = __toESM(require_tar_fs(), 1);
var import_unbzip2_stream = __toESM(require_unbzip2_stream(), 1);
import { exec as execChildProcess } from "child_process";
import { createReadStream, createWriteStream, existsSync, readdirSync } from "fs";
import { chmod, mkdir, readdir, unlink } from "fs/promises";
import * as http from "http";
import * as https from "https";
import * as os from "os";
import * as path from "path";
import * as URL2 from "url";
import * as util from "util";
import { promisify } from "util";
var __classPrivateFieldSet32 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet35 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowserFetcher_instances;
var _BrowserFetcher_product;
var _BrowserFetcher_downloadPath;
var _BrowserFetcher_downloadHost;
var _BrowserFetcher_platform;
var _BrowserFetcher_getFolderPath;
var debugFetcher = debug("puppeteer:fetcher");
var downloadURLs = {
  chrome: {
    linux: "%s/chromium-browser-snapshots/Linux_x64/%d/%s.zip",
    mac: "%s/chromium-browser-snapshots/Mac/%d/%s.zip",
    mac_arm: "%s/chromium-browser-snapshots/Mac_Arm/%d/%s.zip",
    win32: "%s/chromium-browser-snapshots/Win/%d/%s.zip",
    win64: "%s/chromium-browser-snapshots/Win_x64/%d/%s.zip"
  },
  firefox: {
    linux: "%s/firefox-%s.en-US.%s-x86_64.tar.bz2",
    mac: "%s/firefox-%s.en-US.%s.dmg",
    win32: "%s/firefox-%s.en-US.%s.zip",
    win64: "%s/firefox-%s.en-US.%s.zip"
  }
};
var browserConfig = {
  chrome: {
    host: "https://storage.googleapis.com"
  },
  firefox: {
    host: "https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central"
  }
};
var exec = promisify(execChildProcess);
function archiveName(product, platform2, revision) {
  switch (product) {
    case "chrome":
      switch (platform2) {
        case "linux":
          return "chrome-linux";
        case "mac_arm":
        case "mac":
          return "chrome-mac";
        case "win32":
        case "win64":
          return parseInt(revision, 10) > 591479 ? "chrome-win" : "chrome-win32";
      }
    case "firefox":
      return platform2;
  }
}
function downloadURL(product, platform2, host, revision) {
  const url = util.format(downloadURLs[product][platform2], host, revision, archiveName(product, platform2, revision));
  return url;
}
function handleArm64() {
  let exists = existsSync("/usr/bin/chromium-browser");
  if (exists) {
    return;
  }
  exists = existsSync("/usr/bin/chromium");
  if (exists) {
    return;
  }
  console.error("The chromium binary is not available for arm64.\nIf you are on Ubuntu, you can install with: \n\n sudo apt install chromium\n\n\n sudo apt install chromium-browser\n");
  throw new Error();
}
var BrowserFetcher = class {
  /**
   * Constructs a browser fetcher for the given options.
   */
  constructor(options) {
    var _a2, _b;
    _BrowserFetcher_instances.add(this);
    _BrowserFetcher_product.set(this, void 0);
    _BrowserFetcher_downloadPath.set(this, void 0);
    _BrowserFetcher_downloadHost.set(this, void 0);
    _BrowserFetcher_platform.set(this, void 0);
    __classPrivateFieldSet32(this, _BrowserFetcher_product, (_a2 = options.product) !== null && _a2 !== void 0 ? _a2 : "chrome", "f");
    __classPrivateFieldSet32(this, _BrowserFetcher_downloadPath, options.path, "f");
    __classPrivateFieldSet32(this, _BrowserFetcher_downloadHost, (_b = options.host) !== null && _b !== void 0 ? _b : browserConfig[__classPrivateFieldGet35(this, _BrowserFetcher_product, "f")].host, "f");
    if (options.platform) {
      __classPrivateFieldSet32(this, _BrowserFetcher_platform, options.platform, "f");
    } else {
      const platform2 = os.platform();
      switch (platform2) {
        case "darwin":
          switch (__classPrivateFieldGet35(this, _BrowserFetcher_product, "f")) {
            case "chrome":
              __classPrivateFieldSet32(this, _BrowserFetcher_platform, os.arch() === "arm64" && options.useMacOSARMBinary ? "mac_arm" : "mac", "f");
              break;
            case "firefox":
              __classPrivateFieldSet32(this, _BrowserFetcher_platform, "mac", "f");
              break;
          }
          break;
        case "linux":
          __classPrivateFieldSet32(this, _BrowserFetcher_platform, "linux", "f");
          break;
        case "win32":
          __classPrivateFieldSet32(this, _BrowserFetcher_platform, os.arch() === "x64" || // Windows 11 for ARM supports x64 emulation
          os.arch() === "arm64" && isWindows11(os.release()) ? "win64" : "win32", "f");
          return;
        default:
          assert(false, "Unsupported platform: " + platform2);
      }
    }
    assert(downloadURLs[__classPrivateFieldGet35(this, _BrowserFetcher_product, "f")][__classPrivateFieldGet35(this, _BrowserFetcher_platform, "f")], "Unsupported platform: " + __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f"));
  }
  /**
   * @returns Returns the current `Platform`, which is one of `mac`, `linux`,
   * `win32` or `win64`.
   */
  platform() {
    return __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f");
  }
  /**
   * @returns Returns the current `Product`, which is one of `chrome` or
   * `firefox`.
   */
  product() {
    return __classPrivateFieldGet35(this, _BrowserFetcher_product, "f");
  }
  /**
   * @returns The download host being used.
   */
  host() {
    return __classPrivateFieldGet35(this, _BrowserFetcher_downloadHost, "f");
  }
  /**
   * Initiates a HEAD request to check if the revision is available.
   * @remarks
   * This method is affected by the current `product`.
   * @param revision - The revision to check availability for.
   * @returns A promise that resolves to `true` if the revision could be downloaded
   * from the host.
   */
  canDownload(revision) {
    const url = downloadURL(__classPrivateFieldGet35(this, _BrowserFetcher_product, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_downloadHost, "f"), revision);
    return new Promise((resolve2) => {
      const request3 = httpRequest(url, "HEAD", (response) => {
        resolve2(response.statusCode === 200);
      }, false);
      request3.on("error", (error) => {
        console.error(error);
        resolve2(false);
      });
    });
  }
  /**
   * Initiates a GET request to download the revision from the host.
   * @remarks
   * This method is affected by the current `product`.
   * @param revision - The revision to download.
   * @param progressCallback - A function that will be called with two arguments:
   * How many bytes have been downloaded and the total number of bytes of the download.
   * @returns A promise with revision information when the revision is downloaded
   * and extracted.
   */
  async download(revision, progressCallback = () => {
  }) {
    const url = downloadURL(__classPrivateFieldGet35(this, _BrowserFetcher_product, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_downloadHost, "f"), revision);
    const fileName = url.split("/").pop();
    assert(fileName, `A malformed download URL was found: ${url}.`);
    const archivePath = path.join(__classPrivateFieldGet35(this, _BrowserFetcher_downloadPath, "f"), fileName);
    const outputPath = __classPrivateFieldGet35(this, _BrowserFetcher_instances, "m", _BrowserFetcher_getFolderPath).call(this, revision);
    if (existsSync(outputPath)) {
      return this.revisionInfo(revision);
    }
    if (!existsSync(__classPrivateFieldGet35(this, _BrowserFetcher_downloadPath, "f"))) {
      await mkdir(__classPrivateFieldGet35(this, _BrowserFetcher_downloadPath, "f"), { recursive: true });
    }
    if (os.platform() === "linux" && os.arch() === "arm64") {
      handleArm64();
      return;
    }
    try {
      await _downloadFile(url, archivePath, progressCallback);
      await install(archivePath, outputPath);
    } finally {
      if (existsSync(archivePath)) {
        await unlink(archivePath);
      }
    }
    const revisionInfo = this.revisionInfo(revision);
    if (revisionInfo) {
      await chmod(revisionInfo.executablePath, 493);
    }
    return revisionInfo;
  }
  /**
   * @remarks
   * This method is affected by the current `product`.
   * @returns A list of all revision strings (for the current `product`)
   * available locally on disk.
   */
  localRevisions() {
    if (!existsSync(__classPrivateFieldGet35(this, _BrowserFetcher_downloadPath, "f"))) {
      return [];
    }
    const fileNames = readdirSync(__classPrivateFieldGet35(this, _BrowserFetcher_downloadPath, "f"));
    return fileNames.map((fileName) => {
      return parseFolderPath(__classPrivateFieldGet35(this, _BrowserFetcher_product, "f"), fileName);
    }).filter((entry) => {
      var _a2;
      return (_a2 = entry && entry.platform === __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f")) !== null && _a2 !== void 0 ? _a2 : false;
    }).map((entry) => {
      return entry.revision;
    });
  }
  /**
   * @remarks
   * This method is affected by the current `product`.
   * @param revision - A revision to remove for the current `product`.
   * @returns A promise that resolves when the revision has been removes or
   * throws if the revision has not been downloaded.
   */
  async remove(revision) {
    const folderPath = __classPrivateFieldGet35(this, _BrowserFetcher_instances, "m", _BrowserFetcher_getFolderPath).call(this, revision);
    assert(existsSync(folderPath), `Failed to remove: revision ${revision} is not downloaded`);
    await new Promise((fulfill) => {
      return (0, import_rimraf.default)(folderPath, fulfill);
    });
  }
  /**
   * @param revision - The revision to get info for.
   * @returns The revision info for the given revision.
   */
  revisionInfo(revision) {
    const folderPath = __classPrivateFieldGet35(this, _BrowserFetcher_instances, "m", _BrowserFetcher_getFolderPath).call(this, revision);
    let executablePath2 = "";
    switch (__classPrivateFieldGet35(this, _BrowserFetcher_product, "f")) {
      case "chrome":
        switch (__classPrivateFieldGet35(this, _BrowserFetcher_platform, "f")) {
          case "mac":
          case "mac_arm":
            executablePath2 = path.join(folderPath, archiveName(__classPrivateFieldGet35(this, _BrowserFetcher_product, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f"), revision), "Chromium.app", "Contents", "MacOS", "Chromium");
            break;
          case "linux":
            executablePath2 = path.join(folderPath, archiveName(__classPrivateFieldGet35(this, _BrowserFetcher_product, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f"), revision), "chrome");
            break;
          case "win32":
          case "win64":
            executablePath2 = path.join(folderPath, archiveName(__classPrivateFieldGet35(this, _BrowserFetcher_product, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f"), revision), "chrome.exe");
            break;
        }
        break;
      case "firefox":
        switch (__classPrivateFieldGet35(this, _BrowserFetcher_platform, "f")) {
          case "mac":
          case "mac_arm":
            executablePath2 = path.join(folderPath, "Firefox Nightly.app", "Contents", "MacOS", "firefox");
            break;
          case "linux":
            executablePath2 = path.join(folderPath, "firefox", "firefox");
            break;
          case "win32":
          case "win64":
            executablePath2 = path.join(folderPath, "firefox", "firefox.exe");
            break;
        }
    }
    const url = downloadURL(__classPrivateFieldGet35(this, _BrowserFetcher_product, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_platform, "f"), __classPrivateFieldGet35(this, _BrowserFetcher_downloadHost, "f"), revision);
    const local = existsSync(folderPath);
    debugFetcher({
      revision,
      executablePath: executablePath2,
      folderPath,
      local,
      url,
      product: __classPrivateFieldGet35(this, _BrowserFetcher_product, "f")
    });
    return {
      revision,
      executablePath: executablePath2,
      folderPath,
      local,
      url,
      product: __classPrivateFieldGet35(this, _BrowserFetcher_product, "f")
    };
  }
};
_BrowserFetcher_product = /* @__PURE__ */ new WeakMap(), _BrowserFetcher_downloadPath = /* @__PURE__ */ new WeakMap(), _BrowserFetcher_downloadHost = /* @__PURE__ */ new WeakMap(), _BrowserFetcher_platform = /* @__PURE__ */ new WeakMap(), _BrowserFetcher_instances = /* @__PURE__ */ new WeakSet(), _BrowserFetcher_getFolderPath = function _BrowserFetcher_getFolderPath2(revision) {
  return path.resolve(__classPrivateFieldGet35(this, _BrowserFetcher_downloadPath, "f"), `${__classPrivateFieldGet35(this, _BrowserFetcher_platform, "f")}-${revision}`);
};
function parseFolderPath(product, folderPath) {
  const name = path.basename(folderPath);
  const splits = name.split("-");
  if (splits.length !== 2) {
    return;
  }
  const [platform2, revision] = splits;
  if (!revision || !platform2 || !(platform2 in downloadURLs[product])) {
    return;
  }
  return { product, platform: platform2, revision };
}
function isWindows11(version) {
  const parts = version.split(".");
  if (parts.length > 2) {
    const major = parseInt(parts[0], 10);
    const minor = parseInt(parts[1], 10);
    const patch = parseInt(parts[2], 10);
    return major > 10 || major === 10 && minor > 0 || major === 10 && minor === 0 && patch >= 22e3;
  }
  return false;
}
function _downloadFile(url, destinationPath, progressCallback) {
  debugFetcher(`Downloading binary from ${url}`);
  let fulfill;
  let reject;
  const promise = new Promise((x, y) => {
    fulfill = x;
    reject = y;
  });
  let downloadedBytes = 0;
  let totalBytes = 0;
  const request3 = httpRequest(url, "GET", (response) => {
    if (response.statusCode !== 200) {
      const error = new Error(`Download failed: server returned code ${response.statusCode}. URL: ${url}`);
      response.resume();
      reject(error);
      return;
    }
    const file = createWriteStream(destinationPath);
    file.on("finish", () => {
      return fulfill();
    });
    file.on("error", (error) => {
      return reject(error);
    });
    response.pipe(file);
    totalBytes = parseInt(response.headers["content-length"], 10);
    if (progressCallback) {
      response.on("data", onData);
    }
  });
  request3.on("error", (error) => {
    return reject(error);
  });
  return promise;
  function onData(chunk) {
    downloadedBytes += chunk.length;
    progressCallback(downloadedBytes, totalBytes);
  }
}
async function install(archivePath, folderPath) {
  debugFetcher(`Installing ${archivePath} to ${folderPath}`);
  if (archivePath.endsWith(".zip")) {
    await (0, import_extract_zip.default)(archivePath, { dir: folderPath });
  } else if (archivePath.endsWith(".tar.bz2")) {
    await extractTar(archivePath, folderPath);
  } else if (archivePath.endsWith(".dmg")) {
    await mkdir(folderPath);
    await installDMG(archivePath, folderPath);
  } else {
    throw new Error(`Unsupported archive format: ${archivePath}`);
  }
}
function extractTar(tarPath, folderPath) {
  return new Promise((fulfill, reject) => {
    const tarStream = import_tar_fs.default.extract(folderPath);
    tarStream.on("error", reject);
    tarStream.on("finish", fulfill);
    const readStream = createReadStream(tarPath);
    readStream.pipe((0, import_unbzip2_stream.default)()).pipe(tarStream);
  });
}
async function installDMG(dmgPath, folderPath) {
  const { stdout } = await exec(`hdiutil attach -nobrowse -noautoopen "${dmgPath}"`);
  const volumes = stdout.match(/\/Volumes\/(.*)/m);
  if (!volumes) {
    throw new Error(`Could not find volume path in ${stdout}`);
  }
  const mountPath = volumes[0];
  try {
    const fileNames = await readdir(mountPath);
    const appName = fileNames.find((item) => {
      return typeof item === "string" && item.endsWith(".app");
    });
    if (!appName) {
      throw new Error(`Cannot find app in ${mountPath}`);
    }
    const mountedPath = path.join(mountPath, appName);
    debugFetcher(`Copying ${mountedPath} to ${folderPath}`);
    await exec(`cp -R "${mountedPath}" "${folderPath}"`);
  } finally {
    debugFetcher(`Unmounting ${mountPath}`);
    await exec(`hdiutil detach "${mountPath}" -quiet`);
  }
}
function httpRequest(url, method, response, keepAlive = true) {
  const urlParsed = URL2.parse(url);
  let options = {
    ...urlParsed,
    method,
    headers: keepAlive ? { Connection: "keep-alive" } : void 0
  };
  const proxyURL = (0, import_proxy_from_env.getProxyForUrl)(url);
  if (proxyURL) {
    if (url.startsWith("http:")) {
      const proxy = URL2.parse(proxyURL);
      options = {
        path: options.href,
        host: proxy.hostname,
        port: proxy.port
      };
    } else {
      const parsedProxyURL = URL2.parse(proxyURL);
      const proxyOptions = {
        ...parsedProxyURL,
        secureProxy: parsedProxyURL.protocol === "https:"
      };
      options.agent = (0, import_https_proxy_agent.default)(proxyOptions);
      options.rejectUnauthorized = false;
    }
  }
  const requestCallback = (res) => {
    if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      httpRequest(res.headers.location, method, response);
    } else {
      response(res);
    }
  };
  const request3 = options.protocol === "https:" ? https.request(options, requestCallback) : http.request(options, requestCallback);
  request3.end();
  return request3;
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/PuppeteerNode.js
init_cjs_shim();
import { join as join4 } from "path";

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/revisions.js
init_cjs_shim();
var PUPPETEER_REVISIONS = Object.freeze({
  chromium: "1056772",
  firefox: "latest"
});

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/ChromeLauncher.js
init_cjs_shim();
import { accessSync } from "fs";
import { mkdtemp } from "fs/promises";
import os3 from "os";
import path3 from "path";

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/BrowserRunner.js
init_cjs_shim();
var import_rimraf2 = __toESM(require_rimraf(), 1);
import * as childProcess from "child_process";
import * as fs2 from "fs";
import * as path2 from "path";
import * as readline from "readline";
import { promisify as promisify2 } from "util";

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/bidi/Connection.js
init_cjs_shim();
var __classPrivateFieldSet33 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet36 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Connection_instances2;
var _Connection_transport2;
var _Connection_delay2;
var _Connection_lastId2;
var _Connection_closed2;
var _Connection_callbacks2;
var _Connection_onClose3;
var debugProtocolSend2 = debug("puppeteer:webDriverBiDi:SEND \u25BA");
var debugProtocolReceive2 = debug("puppeteer:webDriverBiDi:RECV \u25C0");
var Connection2 = class extends EventEmitter {
  constructor(transport, delay = 0) {
    super();
    _Connection_instances2.add(this);
    _Connection_transport2.set(this, void 0);
    _Connection_delay2.set(this, void 0);
    _Connection_lastId2.set(this, 0);
    _Connection_closed2.set(this, false);
    _Connection_callbacks2.set(this, /* @__PURE__ */ new Map());
    __classPrivateFieldSet33(this, _Connection_delay2, delay, "f");
    __classPrivateFieldSet33(this, _Connection_transport2, transport, "f");
    __classPrivateFieldGet36(this, _Connection_transport2, "f").onmessage = this.onMessage.bind(this);
    __classPrivateFieldGet36(this, _Connection_transport2, "f").onclose = __classPrivateFieldGet36(this, _Connection_instances2, "m", _Connection_onClose3).bind(this);
  }
  get closed() {
    return __classPrivateFieldGet36(this, _Connection_closed2, "f");
  }
  send(method, params) {
    var _a2;
    const id = __classPrivateFieldSet33(this, _Connection_lastId2, (_a2 = __classPrivateFieldGet36(this, _Connection_lastId2, "f"), ++_a2), "f");
    const stringifiedMessage = JSON.stringify({
      id,
      method,
      params
    });
    debugProtocolSend2(stringifiedMessage);
    __classPrivateFieldGet36(this, _Connection_transport2, "f").send(stringifiedMessage);
    return new Promise((resolve2, reject) => {
      __classPrivateFieldGet36(this, _Connection_callbacks2, "f").set(id, {
        resolve: resolve2,
        reject,
        error: new ProtocolError(),
        method
      });
    });
  }
  /**
   * @internal
   */
  async onMessage(message) {
    if (__classPrivateFieldGet36(this, _Connection_delay2, "f")) {
      await new Promise((f) => {
        return setTimeout(f, __classPrivateFieldGet36(this, _Connection_delay2, "f"));
      });
    }
    debugProtocolReceive2(message);
    const object = JSON.parse(message);
    if ("id" in object) {
      const callback = __classPrivateFieldGet36(this, _Connection_callbacks2, "f").get(object.id);
      if (callback) {
        __classPrivateFieldGet36(this, _Connection_callbacks2, "f").delete(object.id);
        if ("error" in object) {
          callback.reject(createProtocolError2(callback.error, callback.method, object));
        } else {
          callback.resolve(object.result);
        }
      }
    } else {
      this.emit(object.method, object.params);
    }
  }
  dispose() {
    __classPrivateFieldGet36(this, _Connection_instances2, "m", _Connection_onClose3).call(this);
    __classPrivateFieldGet36(this, _Connection_transport2, "f").close();
  }
};
_Connection_transport2 = /* @__PURE__ */ new WeakMap(), _Connection_delay2 = /* @__PURE__ */ new WeakMap(), _Connection_lastId2 = /* @__PURE__ */ new WeakMap(), _Connection_closed2 = /* @__PURE__ */ new WeakMap(), _Connection_callbacks2 = /* @__PURE__ */ new WeakMap(), _Connection_instances2 = /* @__PURE__ */ new WeakSet(), _Connection_onClose3 = function _Connection_onClose4() {
  if (__classPrivateFieldGet36(this, _Connection_closed2, "f")) {
    return;
  }
  __classPrivateFieldSet33(this, _Connection_closed2, true, "f");
  __classPrivateFieldGet36(this, _Connection_transport2, "f").onmessage = void 0;
  __classPrivateFieldGet36(this, _Connection_transport2, "f").onclose = void 0;
  for (const callback of __classPrivateFieldGet36(this, _Connection_callbacks2, "f").values()) {
    callback.reject(rewriteError3(callback.error, `Protocol error (${callback.method}): Connection closed.`));
  }
  __classPrivateFieldGet36(this, _Connection_callbacks2, "f").clear();
};
function rewriteError3(error, message, originalMessage) {
  error.message = message;
  error.originalMessage = originalMessage !== null && originalMessage !== void 0 ? originalMessage : error.originalMessage;
  return error;
}
function createProtocolError2(error, method, object) {
  let message = `Protocol error (${method}): ${object.error} ${object.message}`;
  if (object.stacktrace) {
    message += ` ${object.stacktrace}`;
  }
  return rewriteError3(error, message, object.message);
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/PipeTransport.js
init_cjs_shim();
var __classPrivateFieldSet34 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet37 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PipeTransport_instances;
var _PipeTransport_pipeWrite;
var _PipeTransport_eventListeners;
var _PipeTransport_isClosed;
var _PipeTransport_pendingMessage;
var _PipeTransport_dispatch;
var PipeTransport = class {
  constructor(pipeWrite, pipeRead) {
    _PipeTransport_instances.add(this);
    _PipeTransport_pipeWrite.set(this, void 0);
    _PipeTransport_eventListeners.set(this, void 0);
    _PipeTransport_isClosed.set(this, false);
    _PipeTransport_pendingMessage.set(this, "");
    __classPrivateFieldSet34(this, _PipeTransport_pipeWrite, pipeWrite, "f");
    __classPrivateFieldSet34(this, _PipeTransport_eventListeners, [
      addEventListener(pipeRead, "data", (buffer) => {
        return __classPrivateFieldGet37(this, _PipeTransport_instances, "m", _PipeTransport_dispatch).call(this, buffer);
      }),
      addEventListener(pipeRead, "close", () => {
        if (this.onclose) {
          this.onclose.call(null);
        }
      }),
      addEventListener(pipeRead, "error", debugError),
      addEventListener(pipeWrite, "error", debugError)
    ], "f");
  }
  send(message) {
    assert(!__classPrivateFieldGet37(this, _PipeTransport_isClosed, "f"), "`PipeTransport` is closed.");
    __classPrivateFieldGet37(this, _PipeTransport_pipeWrite, "f").write(message);
    __classPrivateFieldGet37(this, _PipeTransport_pipeWrite, "f").write("\0");
  }
  close() {
    __classPrivateFieldSet34(this, _PipeTransport_isClosed, true, "f");
    removeEventListeners(__classPrivateFieldGet37(this, _PipeTransport_eventListeners, "f"));
  }
};
_PipeTransport_pipeWrite = /* @__PURE__ */ new WeakMap(), _PipeTransport_eventListeners = /* @__PURE__ */ new WeakMap(), _PipeTransport_isClosed = /* @__PURE__ */ new WeakMap(), _PipeTransport_pendingMessage = /* @__PURE__ */ new WeakMap(), _PipeTransport_instances = /* @__PURE__ */ new WeakSet(), _PipeTransport_dispatch = function _PipeTransport_dispatch2(buffer) {
  assert(!__classPrivateFieldGet37(this, _PipeTransport_isClosed, "f"), "`PipeTransport` is closed.");
  let end = buffer.indexOf("\0");
  if (end === -1) {
    __classPrivateFieldSet34(this, _PipeTransport_pendingMessage, __classPrivateFieldGet37(this, _PipeTransport_pendingMessage, "f") + buffer.toString(), "f");
    return;
  }
  const message = __classPrivateFieldGet37(this, _PipeTransport_pendingMessage, "f") + buffer.toString(void 0, 0, end);
  if (this.onmessage) {
    this.onmessage.call(null, message);
  }
  let start = end + 1;
  end = buffer.indexOf("\0", start);
  while (end !== -1) {
    if (this.onmessage) {
      this.onmessage.call(null, buffer.toString(void 0, start, end));
    }
    start = end + 1;
    end = buffer.indexOf("\0", start);
  }
  __classPrivateFieldSet34(this, _PipeTransport_pendingMessage, buffer.toString(void 0, start), "f");
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/BrowserRunner.js
var __classPrivateFieldSet35 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet38 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowserRunner_product;
var _BrowserRunner_executablePath;
var _BrowserRunner_processArguments;
var _BrowserRunner_userDataDir;
var _BrowserRunner_isTempUserDataDir;
var _BrowserRunner_closed;
var _BrowserRunner_listeners;
var _BrowserRunner_processClosing;
var removeFolderAsync = promisify2(import_rimraf2.default);
var renameAsync = promisify2(fs2.rename);
var unlinkAsync = promisify2(fs2.unlink);
var debugLauncher = debug("puppeteer:launcher");
var PROCESS_ERROR_EXPLANATION = `Puppeteer was unable to kill the process which ran the browser binary.
This means that, on future Puppeteer launches, Puppeteer might not be able to launch the browser.
Please check your open processes and ensure that the browser processes that Puppeteer launched have been killed.
If you think this is a bug, please report it on the Puppeteer issue tracker.`;
var BrowserRunner = class {
  constructor(product, executablePath2, processArguments, userDataDir, isTempUserDataDir) {
    _BrowserRunner_product.set(this, void 0);
    _BrowserRunner_executablePath.set(this, void 0);
    _BrowserRunner_processArguments.set(this, void 0);
    _BrowserRunner_userDataDir.set(this, void 0);
    _BrowserRunner_isTempUserDataDir.set(this, void 0);
    _BrowserRunner_closed.set(this, true);
    _BrowserRunner_listeners.set(this, []);
    _BrowserRunner_processClosing.set(this, void 0);
    __classPrivateFieldSet35(this, _BrowserRunner_product, product, "f");
    __classPrivateFieldSet35(this, _BrowserRunner_executablePath, executablePath2, "f");
    __classPrivateFieldSet35(this, _BrowserRunner_processArguments, processArguments, "f");
    __classPrivateFieldSet35(this, _BrowserRunner_userDataDir, userDataDir, "f");
    __classPrivateFieldSet35(this, _BrowserRunner_isTempUserDataDir, isTempUserDataDir, "f");
  }
  start(options) {
    var _a2, _b;
    const { handleSIGINT, handleSIGTERM, handleSIGHUP, dumpio, env, pipe } = options;
    let stdio;
    if (pipe) {
      if (dumpio) {
        stdio = ["ignore", "pipe", "pipe", "pipe", "pipe"];
      } else {
        stdio = ["ignore", "ignore", "ignore", "pipe", "pipe"];
      }
    } else {
      if (dumpio) {
        stdio = ["pipe", "pipe", "pipe"];
      } else {
        stdio = ["pipe", "ignore", "pipe"];
      }
    }
    assert(!this.proc, "This process has previously been started.");
    debugLauncher(`Calling ${__classPrivateFieldGet38(this, _BrowserRunner_executablePath, "f")} ${__classPrivateFieldGet38(this, _BrowserRunner_processArguments, "f").join(" ")}`);
    this.proc = childProcess.spawn(__classPrivateFieldGet38(this, _BrowserRunner_executablePath, "f"), __classPrivateFieldGet38(this, _BrowserRunner_processArguments, "f"), {
      // On non-windows platforms, `detached: true` makes child process a
      // leader of a new process group, making it possible to kill child
      // process tree with `.kill(-pid)` command. @see
      // https://nodejs.org/api/child_process.html#child_process_options_detached
      detached: process.platform !== "win32",
      env,
      stdio
    });
    if (dumpio) {
      (_a2 = this.proc.stderr) === null || _a2 === void 0 ? void 0 : _a2.pipe(process.stderr);
      (_b = this.proc.stdout) === null || _b === void 0 ? void 0 : _b.pipe(process.stdout);
    }
    __classPrivateFieldSet35(this, _BrowserRunner_closed, false, "f");
    __classPrivateFieldSet35(this, _BrowserRunner_processClosing, new Promise((fulfill, reject) => {
      this.proc.once("exit", async () => {
        __classPrivateFieldSet35(this, _BrowserRunner_closed, true, "f");
        if (__classPrivateFieldGet38(this, _BrowserRunner_isTempUserDataDir, "f")) {
          try {
            await removeFolderAsync(__classPrivateFieldGet38(this, _BrowserRunner_userDataDir, "f"));
            fulfill();
          } catch (error) {
            debugError(error);
            reject(error);
          }
        } else {
          if (__classPrivateFieldGet38(this, _BrowserRunner_product, "f") === "firefox") {
            try {
              await unlinkAsync(path2.join(__classPrivateFieldGet38(this, _BrowserRunner_userDataDir, "f"), "user.js"));
              const prefsBackupPath = path2.join(__classPrivateFieldGet38(this, _BrowserRunner_userDataDir, "f"), "prefs.js.puppeteer");
              if (fs2.existsSync(prefsBackupPath)) {
                const prefsPath = path2.join(__classPrivateFieldGet38(this, _BrowserRunner_userDataDir, "f"), "prefs.js");
                await unlinkAsync(prefsPath);
                await renameAsync(prefsBackupPath, prefsPath);
              }
            } catch (error) {
              debugError(error);
              reject(error);
            }
          }
          fulfill();
        }
      });
    }), "f");
    __classPrivateFieldSet35(this, _BrowserRunner_listeners, [addEventListener(process, "exit", this.kill.bind(this))], "f");
    if (handleSIGINT) {
      __classPrivateFieldGet38(this, _BrowserRunner_listeners, "f").push(addEventListener(process, "SIGINT", () => {
        this.kill();
        process.exit(130);
      }));
    }
    if (handleSIGTERM) {
      __classPrivateFieldGet38(this, _BrowserRunner_listeners, "f").push(addEventListener(process, "SIGTERM", this.close.bind(this)));
    }
    if (handleSIGHUP) {
      __classPrivateFieldGet38(this, _BrowserRunner_listeners, "f").push(addEventListener(process, "SIGHUP", this.close.bind(this)));
    }
  }
  close() {
    if (__classPrivateFieldGet38(this, _BrowserRunner_closed, "f")) {
      return Promise.resolve();
    }
    if (__classPrivateFieldGet38(this, _BrowserRunner_isTempUserDataDir, "f")) {
      this.kill();
    } else if (this.connection) {
      this.connection.send("Browser.close").catch((error) => {
        debugError(error);
        this.kill();
      });
    }
    removeEventListeners(__classPrivateFieldGet38(this, _BrowserRunner_listeners, "f"));
    return __classPrivateFieldGet38(this, _BrowserRunner_processClosing, "f");
  }
  kill() {
    if (this.proc && this.proc.pid && pidExists(this.proc.pid)) {
      const proc = this.proc;
      try {
        if (process.platform === "win32") {
          childProcess.exec(`taskkill /pid ${this.proc.pid} /T /F`, (error) => {
            if (error) {
              proc.kill();
            }
          });
        } else {
          const processGroupId = -this.proc.pid;
          try {
            process.kill(processGroupId, "SIGKILL");
          } catch (error) {
            proc.kill("SIGKILL");
          }
        }
      } catch (error) {
        throw new Error(`${PROCESS_ERROR_EXPLANATION}
Error cause: ${isErrorLike(error) ? error.stack : error}`);
      }
    }
    try {
      if (__classPrivateFieldGet38(this, _BrowserRunner_isTempUserDataDir, "f")) {
        import_rimraf2.default.sync(__classPrivateFieldGet38(this, _BrowserRunner_userDataDir, "f"));
      }
    } catch (error) {
    }
    removeEventListeners(__classPrivateFieldGet38(this, _BrowserRunner_listeners, "f"));
  }
  async setupWebDriverBiDiConnection(options) {
    assert(this.proc, "BrowserRunner not started.");
    const { timeout, slowMo, preferredRevision } = options;
    let browserWSEndpoint = await waitForWSEndpoint(this.proc, timeout, preferredRevision, /^WebDriver BiDi listening on (ws:\/\/.*)$/);
    browserWSEndpoint += "/session";
    const transport = await NodeWebSocketTransport.create(browserWSEndpoint);
    return new Connection2(transport, slowMo);
  }
  async setupConnection(options) {
    assert(this.proc, "BrowserRunner not started.");
    const { usePipe, timeout, slowMo, preferredRevision } = options;
    if (!usePipe) {
      const browserWSEndpoint = await waitForWSEndpoint(this.proc, timeout, preferredRevision);
      const transport = await NodeWebSocketTransport.create(browserWSEndpoint);
      this.connection = new Connection(browserWSEndpoint, transport, slowMo);
    } else {
      const { 3: pipeWrite, 4: pipeRead } = this.proc.stdio;
      const transport = new PipeTransport(pipeWrite, pipeRead);
      this.connection = new Connection("", transport, slowMo);
    }
    return this.connection;
  }
};
_BrowserRunner_product = /* @__PURE__ */ new WeakMap(), _BrowserRunner_executablePath = /* @__PURE__ */ new WeakMap(), _BrowserRunner_processArguments = /* @__PURE__ */ new WeakMap(), _BrowserRunner_userDataDir = /* @__PURE__ */ new WeakMap(), _BrowserRunner_isTempUserDataDir = /* @__PURE__ */ new WeakMap(), _BrowserRunner_closed = /* @__PURE__ */ new WeakMap(), _BrowserRunner_listeners = /* @__PURE__ */ new WeakMap(), _BrowserRunner_processClosing = /* @__PURE__ */ new WeakMap();
function waitForWSEndpoint(browserProcess, timeout, preferredRevision, regex = /^DevTools listening on (ws:\/\/.*)$/) {
  assert(browserProcess.stderr, "`browserProcess` does not have stderr.");
  const rl = readline.createInterface(browserProcess.stderr);
  let stderr = "";
  return new Promise((resolve2, reject) => {
    const listeners = [
      addEventListener(rl, "line", onLine),
      addEventListener(rl, "close", () => {
        return onClose();
      }),
      addEventListener(browserProcess, "exit", () => {
        return onClose();
      }),
      addEventListener(browserProcess, "error", (error) => {
        return onClose(error);
      })
    ];
    const timeoutId = timeout ? setTimeout(onTimeout, timeout) : 0;
    function onClose(error) {
      cleanup();
      reject(new Error([
        "Failed to launch the browser process!" + (error ? " " + error.message : ""),
        stderr,
        "",
        "TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md",
        ""
      ].join("\n")));
    }
    function onTimeout() {
      cleanup();
      reject(new TimeoutError(`Timed out after ${timeout} ms while trying to connect to the browser! Only Chrome at revision r${preferredRevision} is guaranteed to work.`));
    }
    function onLine(line) {
      stderr += line + "\n";
      const match = line.match(regex);
      if (!match) {
        return;
      }
      cleanup();
      resolve2(match[1]);
    }
    function cleanup() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      removeEventListeners(listeners);
    }
  });
}
function pidExists(pid) {
  try {
    return process.kill(pid, 0);
  } catch (error) {
    if (isErrnoException(error)) {
      if (error.code && error.code === "ESRCH") {
        return false;
      }
    }
    throw error;
  }
}

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/ProductLauncher.js
init_cjs_shim();
import { existsSync as existsSync3 } from "fs";
import os2, { tmpdir } from "os";
import { join as join3 } from "path";
var __classPrivateFieldSet36 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet39 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ProductLauncher_product;
var ProductLauncher = class {
  /**
   * @internal
   */
  constructor(puppeteer2, product) {
    _ProductLauncher_product.set(this, void 0);
    this.puppeteer = puppeteer2;
    __classPrivateFieldSet36(this, _ProductLauncher_product, product, "f");
  }
  get product() {
    return __classPrivateFieldGet39(this, _ProductLauncher_product, "f");
  }
  launch() {
    throw new Error("Not implemented");
  }
  executablePath() {
    throw new Error("Not implemented");
  }
  defaultArgs() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  getProfilePath() {
    var _a2;
    return join3((_a2 = this.puppeteer.configuration.temporaryDirectory) !== null && _a2 !== void 0 ? _a2 : tmpdir(), `puppeteer_dev_${this.product}_profile-`);
  }
  /**
   * @internal
   */
  resolveExecutablePath() {
    const executablePath2 = this.puppeteer.configuration.executablePath;
    if (executablePath2) {
      if (!existsSync3(executablePath2)) {
        throw new Error(`Tried to find the browser at the configured path (${executablePath2}), but no executable was found.`);
      }
      return executablePath2;
    }
    const ubuntuChromiumPath = "/usr/bin/chromium-browser";
    if (this.product === "chrome" && os2.platform() !== "darwin" && os2.arch() === "arm64" && existsSync3(ubuntuChromiumPath)) {
      return ubuntuChromiumPath;
    }
    const browserFetcher = new BrowserFetcher({
      product: this.product,
      path: this.puppeteer.defaultDownloadPath
    });
    const revisionInfo = browserFetcher.revisionInfo(this.puppeteer.browserRevision);
    if (!revisionInfo.local) {
      if (this.puppeteer.configuration.browserRevision) {
        throw new Error(`Tried to find the browser at the configured path (${revisionInfo.executablePath}) for revision ${this.puppeteer.browserRevision}, but no executable was found.`);
      }
      switch (this.product) {
        case "chrome":
          throw new Error(`Could not find Chromium (rev. ${this.puppeteer.browserRevision}). This can occur if either
 1. you did not perform an installation before running the script (e.g. \`npm install\`) or
 2. your cache path is incorrectly configured (which is: ${this.puppeteer.configuration.cacheDirectory}).
For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.`);
        case "firefox":
          throw new Error(`Could not find Firefox (rev. ${this.puppeteer.browserRevision}). This can occur if either
 1. you did not perform an installation for Firefox before running the script (e.g. \`PUPPETEER_PRODUCT=firefox npm install\`) or
 2. your cache path is incorrectly configured (which is: ${this.puppeteer.configuration.cacheDirectory}).
For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.`);
      }
    }
    return revisionInfo.executablePath;
  }
};
_ProductLauncher_product = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/ChromeLauncher.js
var __classPrivateFieldGet40 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChromeLauncher_instances;
var _ChromeLauncher_executablePathForChannel;
var ChromeLauncher = class extends ProductLauncher {
  constructor(puppeteer2) {
    super(puppeteer2, "chrome");
    _ChromeLauncher_instances.add(this);
  }
  async launch(options = {}) {
    const { ignoreDefaultArgs = false, args = [], dumpio = false, channel, executablePath: executablePath2, pipe = false, env = process.env, handleSIGINT = true, handleSIGTERM = true, handleSIGHUP = true, ignoreHTTPSErrors = false, defaultViewport = { width: 800, height: 600 }, slowMo = 0, timeout = 3e4, waitForInitialPage = true, debuggingPort } = options;
    const chromeArguments = [];
    if (!ignoreDefaultArgs) {
      chromeArguments.push(...this.defaultArgs(options));
    } else if (Array.isArray(ignoreDefaultArgs)) {
      chromeArguments.push(...this.defaultArgs(options).filter((arg) => {
        return !ignoreDefaultArgs.includes(arg);
      }));
    } else {
      chromeArguments.push(...args);
    }
    if (!chromeArguments.some((argument) => {
      return argument.startsWith("--remote-debugging-");
    })) {
      if (pipe) {
        assert(!debuggingPort, "Browser should be launched with either pipe or debugging port - not both.");
        chromeArguments.push("--remote-debugging-pipe");
      } else {
        chromeArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
      }
    }
    let isTempUserDataDir = false;
    let userDataDirIndex = chromeArguments.findIndex((arg) => {
      return arg.startsWith("--user-data-dir");
    });
    if (userDataDirIndex < 0) {
      isTempUserDataDir = true;
      chromeArguments.push(`--user-data-dir=${await mkdtemp(this.getProfilePath())}`);
      userDataDirIndex = chromeArguments.length - 1;
    }
    const userDataDir = chromeArguments[userDataDirIndex].split("=", 2)[1];
    assert(typeof userDataDir === "string", "`--user-data-dir` is malformed");
    let chromeExecutable = executablePath2;
    if (!chromeExecutable) {
      assert(channel || !this.puppeteer._isPuppeteerCore, `An \`executablePath\` or \`channel\` must be specified for \`puppeteer-core\``);
      chromeExecutable = this.executablePath(channel);
    }
    const usePipe = chromeArguments.includes("--remote-debugging-pipe");
    const runner = new BrowserRunner(this.product, chromeExecutable, chromeArguments, userDataDir, isTempUserDataDir);
    runner.start({
      handleSIGHUP,
      handleSIGTERM,
      handleSIGINT,
      dumpio,
      env,
      pipe: usePipe
    });
    let browser;
    try {
      const connection = await runner.setupConnection({
        usePipe,
        timeout,
        slowMo,
        preferredRevision: this.puppeteer.browserRevision
      });
      browser = await CDPBrowser._create(this.product, connection, [], ignoreHTTPSErrors, defaultViewport, runner.proc, runner.close.bind(runner), options.targetFilter);
    } catch (error) {
      runner.kill();
      throw error;
    }
    if (waitForInitialPage) {
      try {
        await browser.waitForTarget((t) => {
          return t.type() === "page";
        }, { timeout });
      } catch (error) {
        await browser.close();
        throw error;
      }
    }
    return browser;
  }
  defaultArgs(options = {}) {
    const chromeArguments = [
      "--allow-pre-commit-input",
      "--disable-background-networking",
      "--enable-features=NetworkServiceInProcess2",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-breakpad",
      "--disable-client-side-phishing-detection",
      "--disable-component-extensions-with-background-pages",
      "--disable-default-apps",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      // TODO: remove AvoidUnnecessaryBeforeUnloadCheckSync below
      // once crbug.com/1324138 is fixed and released.
      // AcceptCHFrame disabled because of crbug.com/1348106.
      "--disable-features=Translate,BackForwardCache,AcceptCHFrame,AvoidUnnecessaryBeforeUnloadCheckSync",
      "--disable-hang-monitor",
      "--disable-ipc-flooding-protection",
      "--disable-popup-blocking",
      "--disable-prompt-on-repost",
      "--disable-renderer-backgrounding",
      "--disable-sync",
      "--force-color-profile=srgb",
      "--metrics-recording-only",
      "--no-first-run",
      "--enable-automation",
      "--password-store=basic",
      "--use-mock-keychain",
      // TODO(sadym): remove '--enable-blink-features=IdleDetection'
      // once IdleDetection is turned on by default.
      "--enable-blink-features=IdleDetection",
      "--export-tagged-pdf"
    ];
    const { devtools = false, headless = !devtools, args = [], userDataDir } = options;
    if (userDataDir) {
      chromeArguments.push(`--user-data-dir=${path3.resolve(userDataDir)}`);
    }
    if (devtools) {
      chromeArguments.push("--auto-open-devtools-for-tabs");
    }
    if (headless) {
      chromeArguments.push(headless === "chrome" ? "--headless=chrome" : "--headless", "--hide-scrollbars", "--mute-audio");
    }
    if (args.every((arg) => {
      return arg.startsWith("-");
    })) {
      chromeArguments.push("about:blank");
    }
    chromeArguments.push(...args);
    return chromeArguments;
  }
  executablePath(channel) {
    if (channel) {
      return __classPrivateFieldGet40(this, _ChromeLauncher_instances, "m", _ChromeLauncher_executablePathForChannel).call(this, channel);
    } else {
      return this.resolveExecutablePath();
    }
  }
};
_ChromeLauncher_instances = /* @__PURE__ */ new WeakSet(), _ChromeLauncher_executablePathForChannel = function _ChromeLauncher_executablePathForChannel2(channel) {
  const platform2 = os3.platform();
  let chromePath;
  switch (platform2) {
    case "win32":
      switch (channel) {
        case "chrome":
          chromePath = `${process.env["PROGRAMFILES"]}\\Google\\Chrome\\Application\\chrome.exe`;
          break;
        case "chrome-beta":
          chromePath = `${process.env["PROGRAMFILES"]}\\Google\\Chrome Beta\\Application\\chrome.exe`;
          break;
        case "chrome-canary":
          chromePath = `${process.env["PROGRAMFILES"]}\\Google\\Chrome SxS\\Application\\chrome.exe`;
          break;
        case "chrome-dev":
          chromePath = `${process.env["PROGRAMFILES"]}\\Google\\Chrome Dev\\Application\\chrome.exe`;
          break;
      }
      break;
    case "darwin":
      switch (channel) {
        case "chrome":
          chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
          break;
        case "chrome-beta":
          chromePath = "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta";
          break;
        case "chrome-canary":
          chromePath = "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary";
          break;
        case "chrome-dev":
          chromePath = "/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev";
          break;
      }
      break;
    case "linux":
      switch (channel) {
        case "chrome":
          chromePath = "/opt/google/chrome/chrome";
          break;
        case "chrome-beta":
          chromePath = "/opt/google/chrome-beta/chrome";
          break;
        case "chrome-dev":
          chromePath = "/opt/google/chrome-unstable/chrome";
          break;
      }
      break;
  }
  if (!chromePath) {
    throw new Error(`Unable to detect browser executable path for '${channel}' on ${platform2}.`);
  }
  try {
    accessSync(chromePath);
  } catch (error) {
    throw new Error(`Could not find Google Chrome executable for channel '${channel}' at '${chromePath}'.`);
  }
  return chromePath;
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/FirefoxLauncher.js
init_cjs_shim();
import fs3 from "fs";
import os4 from "os";
import path4 from "path";

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/bidi/Browser.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/bidi/BrowserContext.js
init_cjs_shim();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/bidi/Page.js
init_cjs_shim();
var __classPrivateFieldSet37 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet41 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Page_connection;
var _Page_contextId;
var Page2 = class extends Page {
  constructor(connection, contextId) {
    super();
    _Page_connection.set(this, void 0);
    _Page_contextId.set(this, void 0);
    __classPrivateFieldSet37(this, _Page_connection, connection, "f");
    __classPrivateFieldSet37(this, _Page_contextId, contextId, "f");
  }
  async close() {
    await __classPrivateFieldGet41(this, _Page_connection, "f").send("browsingContext.close", {
      context: __classPrivateFieldGet41(this, _Page_contextId, "f")
    });
  }
  async evaluate(pageFunction, ..._args) {
    const str = `(${pageFunction.toString()})()`;
    const result = await __classPrivateFieldGet41(this, _Page_connection, "f").send("script.evaluate", {
      expression: str,
      target: { context: __classPrivateFieldGet41(this, _Page_contextId, "f") },
      awaitPromise: true
    });
    return result.result.value;
  }
};
_Page_connection = /* @__PURE__ */ new WeakMap(), _Page_contextId = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/bidi/BrowserContext.js
var __classPrivateFieldSet38 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet42 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BrowserContext_connection;
var BrowserContext2 = class extends BrowserContext {
  constructor(connection) {
    super();
    _BrowserContext_connection.set(this, void 0);
    __classPrivateFieldSet38(this, _BrowserContext_connection, connection, "f");
  }
  async newPage() {
    const result = await __classPrivateFieldGet42(this, _BrowserContext_connection, "f").send("browsingContext.create", {
      type: "tab"
    });
    return new Page2(__classPrivateFieldGet42(this, _BrowserContext_connection, "f"), result.context);
  }
  async close() {
  }
};
_BrowserContext_connection = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/common/bidi/Browser.js
var __classPrivateFieldSet39 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet43 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Browser_process;
var _Browser_closeCallback;
var _Browser_connection;
var Browser2 = class extends Browser {
  /**
   * @internal
   */
  constructor(opts) {
    super();
    _Browser_process.set(this, void 0);
    _Browser_closeCallback.set(this, void 0);
    _Browser_connection.set(this, void 0);
    __classPrivateFieldSet39(this, _Browser_process, opts.process, "f");
    __classPrivateFieldSet39(this, _Browser_closeCallback, opts.closeCallback, "f");
    __classPrivateFieldSet39(this, _Browser_connection, opts.connection, "f");
  }
  /**
   * @internal
   */
  static async create(opts) {
    await opts.connection.send("session.new", {});
    return new Browser2(opts);
  }
  async close() {
    var _a2;
    await ((_a2 = __classPrivateFieldGet43(this, _Browser_closeCallback, "f")) === null || _a2 === void 0 ? void 0 : _a2.call(null));
    __classPrivateFieldGet43(this, _Browser_connection, "f").dispose();
  }
  isConnected() {
    return !__classPrivateFieldGet43(this, _Browser_connection, "f").closed;
  }
  process() {
    var _a2;
    return (_a2 = __classPrivateFieldGet43(this, _Browser_process, "f")) !== null && _a2 !== void 0 ? _a2 : null;
  }
  async createIncognitoBrowserContext(_options) {
    return new BrowserContext2(__classPrivateFieldGet43(this, _Browser_connection, "f"));
  }
};
_Browser_process = /* @__PURE__ */ new WeakMap(), _Browser_closeCallback = /* @__PURE__ */ new WeakMap(), _Browser_connection = /* @__PURE__ */ new WeakMap();

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/FirefoxLauncher.js
var FirefoxLauncher = class extends ProductLauncher {
  constructor(puppeteer2) {
    super(puppeteer2, "firefox");
  }
  async launch(options = {}) {
    const { ignoreDefaultArgs = false, args = [], dumpio = false, executablePath: executablePath2, pipe = false, env = process.env, handleSIGINT = true, handleSIGTERM = true, handleSIGHUP = true, ignoreHTTPSErrors = false, defaultViewport = { width: 800, height: 600 }, slowMo = 0, timeout = 3e4, extraPrefsFirefox = {}, waitForInitialPage = true, debuggingPort = null, protocol = "cdp" } = options;
    const firefoxArguments = [];
    if (!ignoreDefaultArgs) {
      firefoxArguments.push(...this.defaultArgs(options));
    } else if (Array.isArray(ignoreDefaultArgs)) {
      firefoxArguments.push(...this.defaultArgs(options).filter((arg) => {
        return !ignoreDefaultArgs.includes(arg);
      }));
    } else {
      firefoxArguments.push(...args);
    }
    if (!firefoxArguments.some((argument) => {
      return argument.startsWith("--remote-debugging-");
    })) {
      if (pipe) {
        assert(debuggingPort === null, "Browser should be launched with either pipe or debugging port - not both.");
      }
      firefoxArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
    }
    let userDataDir;
    let isTempUserDataDir = true;
    const profileArgIndex = firefoxArguments.findIndex((arg) => {
      return ["-profile", "--profile"].includes(arg);
    });
    if (profileArgIndex !== -1) {
      userDataDir = firefoxArguments[profileArgIndex + 1];
      if (!userDataDir || !fs3.existsSync(userDataDir)) {
        throw new Error(`Firefox profile not found at '${userDataDir}'`);
      }
      isTempUserDataDir = false;
      const prefs = this.defaultPreferences(extraPrefsFirefox);
      this.writePreferences(prefs, userDataDir);
    } else {
      userDataDir = await this._createProfile(extraPrefsFirefox);
      firefoxArguments.push("--profile");
      firefoxArguments.push(userDataDir);
    }
    let firefoxExecutable;
    if (this.puppeteer._isPuppeteerCore || executablePath2) {
      assert(executablePath2, `An \`executablePath\` must be specified for \`puppeteer-core\``);
      firefoxExecutable = executablePath2;
    } else {
      firefoxExecutable = this.executablePath();
    }
    const runner = new BrowserRunner(this.product, firefoxExecutable, firefoxArguments, userDataDir, isTempUserDataDir);
    runner.start({
      handleSIGHUP,
      handleSIGTERM,
      handleSIGINT,
      dumpio,
      env,
      pipe
    });
    if (protocol === "webDriverBiDi") {
      let browser2;
      try {
        const connection = await runner.setupWebDriverBiDiConnection({
          timeout,
          slowMo,
          preferredRevision: this.puppeteer.browserRevision
        });
        browser2 = await Browser2.create({
          connection,
          closeCallback: runner.close.bind(runner),
          process: runner.proc
        });
      } catch (error) {
        runner.kill();
        throw error;
      }
      return browser2;
    }
    let browser;
    try {
      const connection = await runner.setupConnection({
        usePipe: pipe,
        timeout,
        slowMo,
        preferredRevision: this.puppeteer.browserRevision
      });
      browser = await CDPBrowser._create(this.product, connection, [], ignoreHTTPSErrors, defaultViewport, runner.proc, runner.close.bind(runner), options.targetFilter);
    } catch (error) {
      runner.kill();
      throw error;
    }
    if (waitForInitialPage) {
      try {
        await browser.waitForTarget((t) => {
          return t.type() === "page";
        }, { timeout });
      } catch (error) {
        await browser.close();
        throw error;
      }
    }
    return browser;
  }
  executablePath() {
    if (this.puppeteer.browserRevision === "latest") {
      const browserFetcher = new BrowserFetcher({
        product: this.product,
        path: this.puppeteer.defaultDownloadPath
      });
      const localRevisions = browserFetcher.localRevisions();
      if (localRevisions[0]) {
        this.puppeteer.configuration.browserRevision = localRevisions[0];
      }
    }
    return this.resolveExecutablePath();
  }
  defaultArgs(options = {}) {
    const { devtools = false, headless = !devtools, args = [], userDataDir = null } = options;
    const firefoxArguments = ["--no-remote"];
    switch (os4.platform()) {
      case "darwin":
        firefoxArguments.push("--foreground");
        break;
      case "win32":
        firefoxArguments.push("--wait-for-browser");
        break;
    }
    if (userDataDir) {
      firefoxArguments.push("--profile");
      firefoxArguments.push(userDataDir);
    }
    if (headless) {
      firefoxArguments.push("--headless");
    }
    if (devtools) {
      firefoxArguments.push("--devtools");
    }
    if (args.every((arg) => {
      return arg.startsWith("-");
    })) {
      firefoxArguments.push("about:blank");
    }
    firefoxArguments.push(...args);
    return firefoxArguments;
  }
  defaultPreferences(extraPrefs) {
    const server = "dummy.test";
    const defaultPrefs = {
      // Make sure Shield doesn't hit the network.
      "app.normandy.api_url": "",
      // Disable Firefox old build background check
      "app.update.checkInstallTime": false,
      // Disable automatically upgrading Firefox
      "app.update.disabledForTesting": true,
      // Increase the APZ content response timeout to 1 minute
      "apz.content_response_timeout": 6e4,
      // Prevent various error message on the console
      // jest-puppeteer asserts that no error message is emitted by the console
      "browser.contentblocking.features.standard": "-tp,tpPrivate,cookieBehavior0,-cm,-fp",
      // Enable the dump function: which sends messages to the system
      // console
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1543115
      "browser.dom.window.dump.enabled": true,
      // Disable topstories
      "browser.newtabpage.activity-stream.feeds.system.topstories": false,
      // Always display a blank page
      "browser.newtabpage.enabled": false,
      // Background thumbnails in particular cause grief: and disabling
      // thumbnails in general cannot hurt
      "browser.pagethumbnails.capturing_disabled": true,
      // Disable safebrowsing components.
      "browser.safebrowsing.blockedURIs.enabled": false,
      "browser.safebrowsing.downloads.enabled": false,
      "browser.safebrowsing.malware.enabled": false,
      "browser.safebrowsing.passwords.enabled": false,
      "browser.safebrowsing.phishing.enabled": false,
      // Disable updates to search engines.
      "browser.search.update": false,
      // Do not restore the last open set of tabs if the browser has crashed
      "browser.sessionstore.resume_from_crash": false,
      // Skip check for default browser on startup
      "browser.shell.checkDefaultBrowser": false,
      // Disable newtabpage
      "browser.startup.homepage": "about:blank",
      // Do not redirect user when a milstone upgrade of Firefox is detected
      "browser.startup.homepage_override.mstone": "ignore",
      // Start with a blank page about:blank
      "browser.startup.page": 0,
      // Do not allow background tabs to be zombified on Android: otherwise for
      // tests that open additional tabs: the test harness tab itself might get
      // unloaded
      "browser.tabs.disableBackgroundZombification": false,
      // Do not warn when closing all other open tabs
      "browser.tabs.warnOnCloseOtherTabs": false,
      // Do not warn when multiple tabs will be opened
      "browser.tabs.warnOnOpen": false,
      // Disable the UI tour.
      "browser.uitour.enabled": false,
      // Turn off search suggestions in the location bar so as not to trigger
      // network connections.
      "browser.urlbar.suggest.searches": false,
      // Disable first run splash page on Windows 10
      "browser.usedOnWindows10.introURL": "",
      // Do not warn on quitting Firefox
      "browser.warnOnQuit": false,
      // Defensively disable data reporting systems
      "datareporting.healthreport.documentServerURI": `http://${server}/dummy/healthreport/`,
      "datareporting.healthreport.logging.consoleEnabled": false,
      "datareporting.healthreport.service.enabled": false,
      "datareporting.healthreport.service.firstRun": false,
      "datareporting.healthreport.uploadEnabled": false,
      // Do not show datareporting policy notifications which can interfere with tests
      "datareporting.policy.dataSubmissionEnabled": false,
      "datareporting.policy.dataSubmissionPolicyBypassNotification": true,
      // DevTools JSONViewer sometimes fails to load dependencies with its require.js.
      // This doesn't affect Puppeteer but spams console (Bug 1424372)
      "devtools.jsonview.enabled": false,
      // Disable popup-blocker
      "dom.disable_open_during_load": false,
      // Enable the support for File object creation in the content process
      // Required for |Page.setFileInputFiles| protocol method.
      "dom.file.createInChild": true,
      // Disable the ProcessHangMonitor
      "dom.ipc.reportProcessHangs": false,
      // Disable slow script dialogues
      "dom.max_chrome_script_run_time": 0,
      "dom.max_script_run_time": 0,
      // Only load extensions from the application and user profile
      // AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
      "extensions.autoDisableScopes": 0,
      "extensions.enabledScopes": 5,
      // Disable metadata caching for installed add-ons by default
      "extensions.getAddons.cache.enabled": false,
      // Disable installing any distribution extensions or add-ons.
      "extensions.installDistroAddons": false,
      // Disabled screenshots extension
      "extensions.screenshots.disabled": true,
      // Turn off extension updates so they do not bother tests
      "extensions.update.enabled": false,
      // Turn off extension updates so they do not bother tests
      "extensions.update.notifyUser": false,
      // Make sure opening about:addons will not hit the network
      "extensions.webservice.discoverURL": `http://${server}/dummy/discoveryURL`,
      // Temporarily force disable BFCache in parent (https://bit.ly/bug-1732263)
      "fission.bfcacheInParent": false,
      // Force all web content to use a single content process
      "fission.webContentIsolationStrategy": 0,
      // Allow the application to have focus even it runs in the background
      "focusmanager.testmode": true,
      // Disable useragent updates
      "general.useragent.updates.enabled": false,
      // Always use network provider for geolocation tests so we bypass the
      // macOS dialog raised by the corelocation provider
      "geo.provider.testing": true,
      // Do not scan Wifi
      "geo.wifi.scan": false,
      // No hang monitor
      "hangmonitor.timeout": 0,
      // Show chrome errors and warnings in the error console
      "javascript.options.showInConsole": true,
      // Disable download and usage of OpenH264: and Widevine plugins
      "media.gmp-manager.updateEnabled": false,
      // Prevent various error message on the console
      // jest-puppeteer asserts that no error message is emitted by the console
      "network.cookie.cookieBehavior": 0,
      // Disable experimental feature that is only available in Nightly
      "network.cookie.sameSite.laxByDefault": false,
      // Do not prompt for temporary redirects
      "network.http.prompt-temp-redirect": false,
      // Disable speculative connections so they are not reported as leaking
      // when they are hanging around
      "network.http.speculative-parallel-limit": 0,
      // Do not automatically switch between offline and online
      "network.manage-offline-status": false,
      // Make sure SNTP requests do not hit the network
      "network.sntp.pools": server,
      // Disable Flash.
      "plugin.state.flash": 0,
      "privacy.trackingprotection.enabled": false,
      // Can be removed once Firefox 89 is no longer supported
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1710839
      "remote.enabled": true,
      // Don't do network connections for mitm priming
      "security.certerrors.mitm.priming.enabled": false,
      // Local documents have access to all other local documents,
      // including directory listings
      "security.fileuri.strict_origin_policy": false,
      // Do not wait for the notification button security delay
      "security.notification_enable_delay": 0,
      // Ensure blocklist updates do not hit the network
      "services.settings.server": `http://${server}/dummy/blocklist/`,
      // Do not automatically fill sign-in forms with known usernames and
      // passwords
      "signon.autofillForms": false,
      // Disable password capture, so that tests that include forms are not
      // influenced by the presence of the persistent doorhanger notification
      "signon.rememberSignons": false,
      // Disable first-run welcome page
      "startup.homepage_welcome_url": "about:blank",
      // Disable first-run welcome page
      "startup.homepage_welcome_url.additional": "",
      // Disable browser animations (tabs, fullscreen, sliding alerts)
      "toolkit.cosmeticAnimations.enabled": false,
      // Prevent starting into safe mode after application crashes
      "toolkit.startup.max_resumed_crashes": -1
    };
    return Object.assign(defaultPrefs, extraPrefs);
  }
  /**
   * Populates the user.js file with custom preferences as needed to allow
   * Firefox's CDP support to properly function. These preferences will be
   * automatically copied over to prefs.js during startup of Firefox. To be
   * able to restore the original values of preferences a backup of prefs.js
   * will be created.
   *
   * @param prefs - List of preferences to add.
   * @param profilePath - Firefox profile to write the preferences to.
   */
  async writePreferences(prefs, profilePath) {
    const lines = Object.entries(prefs).map(([key, value]) => {
      return `user_pref(${JSON.stringify(key)}, ${JSON.stringify(value)});`;
    });
    await fs3.promises.writeFile(path4.join(profilePath, "user.js"), lines.join("\n"));
    const prefsPath = path4.join(profilePath, "prefs.js");
    if (fs3.existsSync(prefsPath)) {
      const prefsBackupPath = path4.join(profilePath, "prefs.js.puppeteer");
      await fs3.promises.copyFile(prefsPath, prefsBackupPath);
    }
  }
  async _createProfile(extraPrefs) {
    const temporaryProfilePath = await fs3.promises.mkdtemp(this.getProfilePath());
    const prefs = this.defaultPreferences(extraPrefs);
    await this.writePreferences(prefs, temporaryProfilePath);
    return temporaryProfilePath;
  }
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/node/PuppeteerNode.js
var __classPrivateFieldSet40 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet44 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PuppeteerNode_instances;
var _PuppeteerNode__launcher;
var _PuppeteerNode_lastLaunchedProduct;
var _PuppeteerNode_launcher_get;
var PuppeteerNode = class extends Puppeteer {
  /**
   * @internal
   */
  constructor(settings) {
    const { configuration, ...commonSettings } = settings;
    super(commonSettings);
    _PuppeteerNode_instances.add(this);
    _PuppeteerNode__launcher.set(this, void 0);
    _PuppeteerNode_lastLaunchedProduct.set(this, void 0);
    this.configuration = {};
    if (configuration) {
      this.configuration = configuration;
    }
    switch (this.configuration.defaultProduct) {
      case "firefox":
        this.defaultBrowserRevision = PUPPETEER_REVISIONS.firefox;
        break;
      default:
        this.configuration.defaultProduct = "chrome";
        this.defaultBrowserRevision = PUPPETEER_REVISIONS.chromium;
        break;
    }
    this.connect = this.connect.bind(this);
    this.launch = this.launch.bind(this);
    this.executablePath = this.executablePath.bind(this);
    this.defaultArgs = this.defaultArgs.bind(this);
    this.createBrowserFetcher = this.createBrowserFetcher.bind(this);
  }
  /**
   * This method attaches Puppeteer to an existing browser instance.
   *
   * @param options - Set of configurable options to set on the browser.
   * @returns Promise which resolves to browser instance.
   *
   * @public
   */
  connect(options) {
    return super.connect(options);
  }
  /**
   * Launches a browser instance with given arguments and options when
   * specified.
   *
   * When using with `puppeteer-core`,
   * {@link LaunchOptions.executablePath | options.executablePath} or
   * {@link LaunchOptions.channel | options.channel} must be provided.
   *
   * @example
   * You can use {@link LaunchOptions.ignoreDefaultArgs | options.ignoreDefaultArgs}
   * to filter out `--mute-audio` from default arguments:
   *
   * ```ts
   * const browser = await puppeteer.launch({
   *   ignoreDefaultArgs: ['--mute-audio'],
   * });
   * ```
   *
   * @remarks
   * Puppeteer can also be used to control the Chrome browser, but it works best
   * with the version of Chromium downloaded by default by Puppeteer. There is
   * no guarantee it will work with any other version. If Google Chrome (rather
   * than Chromium) is preferred, a
   * {@link https://www.google.com/chrome/browser/canary.html | Chrome Canary}
   * or
   * {@link https://www.chromium.org/getting-involved/dev-channel | Dev Channel}
   * build is suggested. See
   * {@link https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/ | this article}
   * for a description of the differences between Chromium and Chrome.
   * {@link https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md | This article}
   * describes some differences for Linux users.
   *
   * @param options - Options to configure launching behavior.
   *
   * @public
   */
  launch(options = {}) {
    const { product = this.defaultProduct } = options;
    __classPrivateFieldSet40(this, _PuppeteerNode_lastLaunchedProduct, product, "f");
    return __classPrivateFieldGet44(this, _PuppeteerNode_instances, "a", _PuppeteerNode_launcher_get).launch(options);
  }
  /**
   * @returns The default executable path.
   *
   * @public
   */
  executablePath(channel) {
    return __classPrivateFieldGet44(this, _PuppeteerNode_instances, "a", _PuppeteerNode_launcher_get).executablePath(channel);
  }
  /**
   * @internal
   */
  get browserRevision() {
    var _a2;
    return (_a2 = this.configuration.browserRevision) !== null && _a2 !== void 0 ? _a2 : this.defaultBrowserRevision;
  }
  /**
   * @returns The default download path for puppeteer. For puppeteer-core, this
   * code should never be called as it is never defined.
   *
   * @internal
   */
  get defaultDownloadPath() {
    var _a2;
    return (_a2 = this.configuration.downloadPath) !== null && _a2 !== void 0 ? _a2 : join4(this.configuration.cacheDirectory, this.product);
  }
  /**
   * @returns The name of the browser that was last launched.
   *
   * @public
   */
  get lastLaunchedProduct() {
    var _a2;
    return (_a2 = __classPrivateFieldGet44(this, _PuppeteerNode_lastLaunchedProduct, "f")) !== null && _a2 !== void 0 ? _a2 : this.defaultProduct;
  }
  /**
   * @returns The name of the browser that will be launched by default. For
   * `puppeteer`, this is influenced by your configuration. Otherwise, it's
   * `chrome`.
   *
   * @public
   */
  get defaultProduct() {
    var _a2;
    return (_a2 = this.configuration.defaultProduct) !== null && _a2 !== void 0 ? _a2 : "chrome";
  }
  /**
   * @deprecated Do not use as this field as it does not take into account
   * multiple browsers of different types. Use
   * {@link PuppeteerNode.defaultProduct | defaultProduct} or
   * {@link PuppeteerNode.lastLaunchedProduct | lastLaunchedProduct}.
   *
   * @returns The name of the browser that is under automation.
   *
   * @public
   */
  get product() {
    return __classPrivateFieldGet44(this, _PuppeteerNode_instances, "a", _PuppeteerNode_launcher_get).product;
  }
  /**
   * @param options - Set of configurable options to set on the browser.
   *
   * @returns The default flags that Chromium will be launched with.
   *
   * @public
   */
  defaultArgs(options = {}) {
    return __classPrivateFieldGet44(this, _PuppeteerNode_instances, "a", _PuppeteerNode_launcher_get).defaultArgs(options);
  }
  /**
   * @deprecated If you are using `puppeteer-core`, do not use this method. Just
   * construct {@link BrowserFetcher} manually.
   *
   * @param options - Set of configurable options to specify the settings of the
   * BrowserFetcher.
   *
   * @returns A new BrowserFetcher instance.
   */
  createBrowserFetcher(options) {
    var _a2;
    const downloadPath = this.defaultDownloadPath;
    if (downloadPath) {
      options.path = downloadPath;
    }
    if (!options.path) {
      throw new Error("A `path` must be specified for `puppeteer-core`.");
    }
    if ((_a2 = this.configuration.experiments) === null || _a2 === void 0 ? void 0 : _a2.macArmChromiumEnabled) {
      options.useMacOSARMBinary = true;
    }
    if (this.configuration.downloadHost) {
      options.host = this.configuration.downloadHost;
    }
    return new BrowserFetcher(options);
  }
};
_PuppeteerNode__launcher = /* @__PURE__ */ new WeakMap(), _PuppeteerNode_lastLaunchedProduct = /* @__PURE__ */ new WeakMap(), _PuppeteerNode_instances = /* @__PURE__ */ new WeakSet(), _PuppeteerNode_launcher_get = function _PuppeteerNode_launcher_get2() {
  if (__classPrivateFieldGet44(this, _PuppeteerNode__launcher, "f") && __classPrivateFieldGet44(this, _PuppeteerNode__launcher, "f").product === this.lastLaunchedProduct) {
    return __classPrivateFieldGet44(this, _PuppeteerNode__launcher, "f");
  }
  switch (this.lastLaunchedProduct) {
    case "chrome":
      this.defaultBrowserRevision = PUPPETEER_REVISIONS.chromium;
      __classPrivateFieldSet40(this, _PuppeteerNode__launcher, new ChromeLauncher(this), "f");
      break;
    case "firefox":
      this.defaultBrowserRevision = PUPPETEER_REVISIONS.firefox;
      __classPrivateFieldSet40(this, _PuppeteerNode__launcher, new FirefoxLauncher(this), "f");
      break;
    default:
      throw new Error(`Unknown product: ${__classPrivateFieldGet44(this, _PuppeteerNode_lastLaunchedProduct, "f")}`);
  }
  return __classPrivateFieldGet44(this, _PuppeteerNode__launcher, "f");
};

// ../testeranto/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js
var puppeteer = new PuppeteerNode({
  isPuppeteerCore: true
});
var {
  connect,
  /**
   * @deprecated Construct {@link BrowserFetcher} manually.
   *
   * @public
   */
  createBrowserFetcher,
  defaultArgs,
  executablePath,
  launch
} = puppeteer;
var puppeteer_core_default = puppeteer;

export {
  puppeteer_core_default
};
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
