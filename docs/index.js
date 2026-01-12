"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) =>
    typeof require !== "undefined"
      ? require
      : typeof Proxy !== "undefined"
        ? new Proxy(x, {
            get: (a, b) => (typeof require !== "undefined" ? require : a)[b],
          })
        : x)(function (x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) =>
    function __require2() {
      return (
        mod ||
          (0, cb[__getOwnPropNames(cb)[0]])(
            (mod = { exports: {} }).exports,
            mod
          ),
        mod.exports
      );
    };
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from[key],
            enumerable:
              !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule
        ? __defProp(target, "default", { value: mod, enumerable: true })
        : target,
      mod
    )
  );

  // node_modules/re2-wasm/build/wasm/re2.js
  var require_re2 = __commonJS({
    "node_modules/re2-wasm/build/wasm/re2.js"(exports, module) {
      var Module = typeof Module !== "undefined" ? Module : {};
      var moduleOverrides = {};
      var key;
      for (key in Module) {
        if (Module.hasOwnProperty(key)) {
          moduleOverrides[key] = Module[key];
        }
      }
      var arguments_ = [];
      var thisProgram = "./this.program";
      var quit_ = function (status, toThrow) {
        throw toThrow;
      };
      var ENVIRONMENT_IS_WEB = false;
      var ENVIRONMENT_IS_WORKER = false;
      var ENVIRONMENT_IS_NODE = false;
      var ENVIRONMENT_IS_SHELL = false;
      ENVIRONMENT_IS_WEB = typeof window === "object";
      ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
      ENVIRONMENT_IS_NODE =
        typeof process === "object" &&
        typeof process.versions === "object" &&
        typeof process.versions.node === "string";
      ENVIRONMENT_IS_SHELL =
        !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
      if (Module["ENVIRONMENT"]) {
        throw new Error(
          "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)"
        );
      }
      var scriptDirectory = "";
      function locateFile(path) {
        if (Module["locateFile"]) {
          return Module["locateFile"](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }
      var read_;
      var readAsync;
      var readBinary;
      var setWindowTitle;
      var nodeFS;
      var nodePath;
      if (ENVIRONMENT_IS_NODE) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = __require("path").dirname(scriptDirectory) + "/";
        } else {
          scriptDirectory = __dirname + "/";
        }
        read_ = function shell_read(filename, binary) {
          if (!nodeFS) nodeFS = __require("fs");
          if (!nodePath) nodePath = __require("path");
          filename = nodePath["normalize"](filename);
          return nodeFS["readFileSync"](filename, binary ? null : "utf8");
        };
        readBinary = function readBinary2(filename) {
          var ret = read_(filename, true);
          if (!ret.buffer) {
            ret = new Uint8Array(ret);
          }
          assert(ret.buffer);
          return ret;
        };
        if (process["argv"].length > 1) {
          thisProgram = process["argv"][1].replace(/\\/g, "/");
        }
        arguments_ = process["argv"].slice(2);
        if (typeof module !== "undefined") {
          module["exports"] = Module;
        }
        quit_ = function (status) {
          process["exit"](status);
        };
        Module["inspect"] = function () {
          return "[Emscripten Module object]";
        };
      } else if (ENVIRONMENT_IS_SHELL) {
        if (typeof read != "undefined") {
          read_ = function shell_read(f) {
            return read(f);
          };
        }
        readBinary = function readBinary2(f) {
          var data;
          if (typeof readbuffer === "function") {
            return new Uint8Array(readbuffer(f));
          }
          data = read(f, "binary");
          assert(typeof data === "object");
          return data;
        };
        if (typeof scriptArgs != "undefined") {
          arguments_ = scriptArgs;
        } else if (typeof arguments != "undefined") {
          arguments_ = arguments;
        }
        if (typeof quit === "function") {
          quit_ = function (status) {
            quit(status);
          };
        }
        if (typeof print !== "undefined") {
          if (typeof console === "undefined")
            console = /** @type{!Console} */ {};
          console.log =
            /** @type{!function(this:Console, ...*): undefined} */
            print;
          console.warn = console.error =
            /** @type{!function(this:Console, ...*): undefined} */
            typeof printErr !== "undefined" ? printErr : print;
        }
      } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (typeof document !== "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
          scriptDirectory = scriptDirectory.substr(
            0,
            scriptDirectory.lastIndexOf("/") + 1
          );
        } else {
          scriptDirectory = "";
        }
        {
          read_ = function shell_read(url) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText;
          };
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = function readBinary2(url) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(
                /** @type{!ArrayBuffer} */
                xhr.response
              );
            };
          }
          readAsync = function readAsync2(url, onload, onerror) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function xhr_onload() {
              if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
                onload(xhr.response);
                return;
              }
              onerror();
            };
            xhr.onerror = onerror;
            xhr.send(null);
          };
        }
        setWindowTitle = function (title) {
          document.title = title;
        };
      } else {
        throw new Error("environment detection error");
      }
      var out = Module["print"] || console.log.bind(console);
      var err = Module["printErr"] || console.warn.bind(console);
      for (key in moduleOverrides) {
        if (moduleOverrides.hasOwnProperty(key)) {
          Module[key] = moduleOverrides[key];
        }
      }
      moduleOverrides = null;
      if (Module["arguments"]) arguments_ = Module["arguments"];
      if (!Object.getOwnPropertyDescriptor(Module, "arguments"))
        Object.defineProperty(Module, "arguments", {
          configurable: true,
          get: function () {
            abort(
              "Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
      if (!Object.getOwnPropertyDescriptor(Module, "thisProgram"))
        Object.defineProperty(Module, "thisProgram", {
          configurable: true,
          get: function () {
            abort(
              "Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      if (Module["quit"]) quit_ = Module["quit"];
      if (!Object.getOwnPropertyDescriptor(Module, "quit"))
        Object.defineProperty(Module, "quit", {
          configurable: true,
          get: function () {
            abort(
              "Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      assert(
        typeof Module["memoryInitializerPrefixURL"] === "undefined",
        "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"
      );
      assert(
        typeof Module["pthreadMainPrefixURL"] === "undefined",
        "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"
      );
      assert(
        typeof Module["cdInitializerPrefixURL"] === "undefined",
        "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"
      );
      assert(
        typeof Module["filePackagePrefixURL"] === "undefined",
        "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"
      );
      assert(
        typeof Module["read"] === "undefined",
        "Module.read option was removed (modify read_ in JS)"
      );
      assert(
        typeof Module["readAsync"] === "undefined",
        "Module.readAsync option was removed (modify readAsync in JS)"
      );
      assert(
        typeof Module["readBinary"] === "undefined",
        "Module.readBinary option was removed (modify readBinary in JS)"
      );
      assert(
        typeof Module["setWindowTitle"] === "undefined",
        "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"
      );
      assert(
        typeof Module["TOTAL_MEMORY"] === "undefined",
        "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"
      );
      if (!Object.getOwnPropertyDescriptor(Module, "read"))
        Object.defineProperty(Module, "read", {
          configurable: true,
          get: function () {
            abort(
              "Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      if (!Object.getOwnPropertyDescriptor(Module, "readAsync"))
        Object.defineProperty(Module, "readAsync", {
          configurable: true,
          get: function () {
            abort(
              "Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      if (!Object.getOwnPropertyDescriptor(Module, "readBinary"))
        Object.defineProperty(Module, "readBinary", {
          configurable: true,
          get: function () {
            abort(
              "Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      if (!Object.getOwnPropertyDescriptor(Module, "setWindowTitle"))
        Object.defineProperty(Module, "setWindowTitle", {
          configurable: true,
          get: function () {
            abort(
              "Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      function warnOnce(text) {
        if (!warnOnce.shown) warnOnce.shown = {};
        if (!warnOnce.shown[text]) {
          warnOnce.shown[text] = 1;
          err(text);
        }
      }
      var tempRet0 = 0;
      var setTempRet0 = function (value) {
        tempRet0 = value;
      };
      var wasmBinary;
      if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
      if (!Object.getOwnPropertyDescriptor(Module, "wasmBinary"))
        Object.defineProperty(Module, "wasmBinary", {
          configurable: true,
          get: function () {
            abort(
              "Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      var noExitRuntime;
      if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
      if (!Object.getOwnPropertyDescriptor(Module, "noExitRuntime"))
        Object.defineProperty(Module, "noExitRuntime", {
          configurable: true,
          get: function () {
            abort(
              "Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      if (typeof WebAssembly !== "object") {
        abort("no native wasm support detected");
      }
      var wasmMemory;
      var ABORT = false;
      var EXITSTATUS = 0;
      function assert(condition, text) {
        if (!condition) {
          abort("Assertion failed: " + text);
        }
      }
      var UTF8Decoder =
        typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
      function UTF8ArrayToString(heap, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
        if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
          return UTF8Decoder.decode(heap.subarray(idx, endPtr));
        } else {
          var str = "";
          while (idx < endPtr) {
            var u0 = heap[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }
            var u1 = heap[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode(((u0 & 31) << 6) | u1);
              continue;
            }
            var u2 = heap[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
            } else {
              if ((u0 & 248) != 240)
                warnOnce(
                  "Invalid UTF-8 leading byte 0x" +
                    u0.toString(16) +
                    " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!"
                );
              u0 =
                ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(
                55296 | (ch >> 10),
                56320 | (ch & 1023)
              );
            }
          }
        }
        return str;
      }
      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      }
      function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0)) return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
          }
          if (u <= 127) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | (u >> 6);
            heap[outIdx++] = 128 | (u & 63);
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | (u >> 12);
            heap[outIdx++] = 128 | ((u >> 6) & 63);
            heap[outIdx++] = 128 | (u & 63);
          } else {
            if (outIdx + 3 >= endIdx) break;
            if (u >= 2097152)
              warnOnce(
                "Invalid Unicode code point 0x" +
                  u.toString(16) +
                  " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF)."
              );
            heap[outIdx++] = 240 | (u >> 18);
            heap[outIdx++] = 128 | ((u >> 12) & 63);
            heap[outIdx++] = 128 | ((u >> 6) & 63);
            heap[outIdx++] = 128 | (u & 63);
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      }
      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        assert(
          typeof maxBytesToWrite == "number",
          "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
        );
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      }
      function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343)
            u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
          if (u <= 127) ++len;
          else if (u <= 2047) len += 2;
          else if (u <= 65535) len += 3;
          else len += 4;
        }
        return len;
      }
      var UTF16Decoder =
        typeof TextDecoder !== "undefined"
          ? new TextDecoder("utf-16le")
          : void 0;
      function UTF16ToString(ptr, maxBytesToRead) {
        assert(
          ptr % 2 == 0,
          "Pointer passed to UTF16ToString must be aligned to two bytes!"
        );
        var endPtr = ptr;
        var idx = endPtr >> 1;
        var maxIdx = idx + maxBytesToRead / 2;
        while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
        endPtr = idx << 1;
        if (endPtr - ptr > 32 && UTF16Decoder) {
          return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
        } else {
          var str = "";
          for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
            var codeUnit = HEAP16[(ptr + i * 2) >> 1];
            if (codeUnit == 0) break;
            str += String.fromCharCode(codeUnit);
          }
          return str;
        }
      }
      function stringToUTF16(str, outPtr, maxBytesToWrite) {
        assert(
          outPtr % 2 == 0,
          "Pointer passed to stringToUTF16 must be aligned to two bytes!"
        );
        assert(
          typeof maxBytesToWrite == "number",
          "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
        );
        if (maxBytesToWrite === void 0) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 2) return 0;
        maxBytesToWrite -= 2;
        var startPtr = outPtr;
        var numCharsToWrite =
          maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
        for (var i = 0; i < numCharsToWrite; ++i) {
          var codeUnit = str.charCodeAt(i);
          HEAP16[outPtr >> 1] = codeUnit;
          outPtr += 2;
        }
        HEAP16[outPtr >> 1] = 0;
        return outPtr - startPtr;
      }
      function lengthBytesUTF16(str) {
        return str.length * 2;
      }
      function UTF32ToString(ptr, maxBytesToRead) {
        assert(
          ptr % 4 == 0,
          "Pointer passed to UTF32ToString must be aligned to four bytes!"
        );
        var i = 0;
        var str = "";
        while (!(i >= maxBytesToRead / 4)) {
          var utf32 = HEAP32[(ptr + i * 4) >> 2];
          if (utf32 == 0) break;
          ++i;
          if (utf32 >= 65536) {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
          } else {
            str += String.fromCharCode(utf32);
          }
        }
        return str;
      }
      function stringToUTF32(str, outPtr, maxBytesToWrite) {
        assert(
          outPtr % 4 == 0,
          "Pointer passed to stringToUTF32 must be aligned to four bytes!"
        );
        assert(
          typeof maxBytesToWrite == "number",
          "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
        );
        if (maxBytesToWrite === void 0) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 4) return 0;
        var startPtr = outPtr;
        var endPtr = startPtr + maxBytesToWrite - 4;
        for (var i = 0; i < str.length; ++i) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit >= 55296 && codeUnit <= 57343) {
            var trailSurrogate = str.charCodeAt(++i);
            codeUnit =
              (65536 + ((codeUnit & 1023) << 10)) | (trailSurrogate & 1023);
          }
          HEAP32[outPtr >> 2] = codeUnit;
          outPtr += 4;
          if (outPtr + 4 > endPtr) break;
        }
        HEAP32[outPtr >> 2] = 0;
        return outPtr - startPtr;
      }
      function lengthBytesUTF32(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
          len += 4;
        }
        return len;
      }
      function writeArrayToMemory(array, buffer2) {
        assert(
          array.length >= 0,
          "writeArrayToMemory array must have a length (should be an array or typed array)"
        );
        HEAP8.set(array, buffer2);
      }
      function writeAsciiToMemory(str, buffer2, dontAddNull) {
        for (var i = 0; i < str.length; ++i) {
          assert((str.charCodeAt(i) === str.charCodeAt(i)) & 255);
          HEAP8[buffer2++ >> 0] = str.charCodeAt(i);
        }
        if (!dontAddNull) HEAP8[buffer2 >> 0] = 0;
      }
      var buffer;
      var HEAP8;
      var HEAPU8;
      var HEAP16;
      var HEAPU16;
      var HEAP32;
      var HEAPU32;
      var HEAPF32;
      var HEAPF64;
      function updateGlobalBufferAndViews(buf) {
        buffer = buf;
        Module["HEAP8"] = HEAP8 = new Int8Array(buf);
        Module["HEAP16"] = HEAP16 = new Int16Array(buf);
        Module["HEAP32"] = HEAP32 = new Int32Array(buf);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
      }
      var TOTAL_STACK = 5242880;
      if (Module["TOTAL_STACK"])
        assert(
          TOTAL_STACK === Module["TOTAL_STACK"],
          "the stack size can no longer be determined at runtime"
        );
      var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
      if (!Object.getOwnPropertyDescriptor(Module, "INITIAL_MEMORY"))
        Object.defineProperty(Module, "INITIAL_MEMORY", {
          configurable: true,
          get: function () {
            abort(
              "Module.INITIAL_MEMORY has been replaced with plain INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          },
        });
      assert(
        INITIAL_MEMORY >= TOTAL_STACK,
        "INITIAL_MEMORY should be larger than TOTAL_STACK, was " +
          INITIAL_MEMORY +
          "! (TOTAL_STACK=" +
          TOTAL_STACK +
          ")"
      );
      assert(
        typeof Int32Array !== "undefined" &&
          typeof Float64Array !== "undefined" &&
          Int32Array.prototype.subarray !== void 0 &&
          Int32Array.prototype.set !== void 0,
        "JS engine does not provide full typed array support"
      );
      if (Module["wasmMemory"]) {
        wasmMemory = Module["wasmMemory"];
      } else {
        wasmMemory = new WebAssembly.Memory({
          initial: INITIAL_MEMORY / 65536,
          maximum: INITIAL_MEMORY / 65536,
        });
      }
      if (wasmMemory) {
        buffer = wasmMemory.buffer;
      }
      INITIAL_MEMORY = buffer.byteLength;
      assert(INITIAL_MEMORY % 65536 === 0);
      updateGlobalBufferAndViews(buffer);
      var wasmTable;
      function writeStackCookie() {
        var max = _emscripten_stack_get_end();
        assert((max & 3) == 0);
        HEAPU32[(max >> 2) + 1] = 34821223;
        HEAPU32[(max >> 2) + 2] = 2310721022;
        HEAP32[0] = 1668509029;
      }
      function checkStackCookie() {
        if (ABORT) return;
        var max = _emscripten_stack_get_end();
        var cookie1 = HEAPU32[(max >> 2) + 1];
        var cookie2 = HEAPU32[(max >> 2) + 2];
        if (cookie1 != 34821223 || cookie2 != 2310721022) {
          abort(
            "Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" +
              cookie2.toString(16) +
              " " +
              cookie1.toString(16)
          );
        }
        if (HEAP32[0] !== 1668509029)
          abort(
            "Runtime error: The application has corrupted its heap memory area (address zero)!"
          );
      }
      (function () {
        var h16 = new Int16Array(1);
        var h8 = new Int8Array(h16.buffer);
        h16[0] = 25459;
        if (h8[0] !== 115 || h8[1] !== 99)
          throw "Runtime error: expected the system to be little-endian!";
      })();
      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATMAIN__ = [];
      var __ATPOSTRUN__ = [];
      var runtimeInitialized = false;
      var runtimeExited = false;
      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function")
            Module["preRun"] = [Module["preRun"]];
          while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPRERUN__);
      }
      function initRuntime() {
        checkStackCookie();
        assert(!runtimeInitialized);
        runtimeInitialized = true;
        callRuntimeCallbacks(__ATINIT__);
      }
      function preMain() {
        checkStackCookie();
        callRuntimeCallbacks(__ATMAIN__);
      }
      function postRun() {
        checkStackCookie();
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function")
            Module["postRun"] = [Module["postRun"]];
          while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPOSTRUN__);
      }
      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }
      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }
      assert(
        Math.imul,
        "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
      );
      assert(
        Math.fround,
        "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
      );
      assert(
        Math.clz32,
        "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
      );
      assert(
        Math.trunc,
        "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
      );
      var runDependencies = 0;
      var runDependencyWatcher = null;
      var dependenciesFulfilled = null;
      var runDependencyTracking = {};
      function addRunDependency(id) {
        runDependencies++;
        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
        if (id) {
          assert(!runDependencyTracking[id]);
          runDependencyTracking[id] = 1;
          if (
            runDependencyWatcher === null &&
            typeof setInterval !== "undefined"
          ) {
            runDependencyWatcher = setInterval(function () {
              if (ABORT) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
                return;
              }
              var shown = false;
              for (var dep in runDependencyTracking) {
                if (!shown) {
                  shown = true;
                  err("still waiting on run dependencies:");
                }
                err("dependency: " + dep);
              }
              if (shown) {
                err("(end of list)");
              }
            }, 1e4);
          }
        } else {
          err("warning: run dependency added without ID");
        }
      }
      function removeRunDependency(id) {
        runDependencies--;
        if (Module["monitorRunDependencies"]) {
          Module["monitorRunDependencies"](runDependencies);
        }
        if (id) {
          assert(runDependencyTracking[id]);
          delete runDependencyTracking[id];
        } else {
          err("warning: run dependency removed without ID");
        }
        if (runDependencies == 0) {
          if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
          }
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      Module["preloadedImages"] = {};
      Module["preloadedAudios"] = {};
      function abort(what) {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }
        what += "";
        err(what);
        ABORT = true;
        EXITSTATUS = 1;
        var output = "abort(" + what + ") at " + stackTrace();
        what = output;
        var e = new WebAssembly.RuntimeError(what);
        throw e;
      }
      var FS = {
        error: function () {
          abort(
            "Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1"
          );
        },
        init: function () {
          FS.error();
        },
        createDataFile: function () {
          FS.error();
        },
        createPreloadedFile: function () {
          FS.error();
        },
        createLazyFile: function () {
          FS.error();
        },
        open: function () {
          FS.error();
        },
        mkdev: function () {
          FS.error();
        },
        registerDevice: function () {
          FS.error();
        },
        analyzePath: function () {
          FS.error();
        },
        loadFilesFromDB: function () {
          FS.error();
        },
        ErrnoError: function ErrnoError() {
          FS.error();
        },
      };
      Module["FS_createDataFile"] = FS.createDataFile;
      Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
      function hasPrefix(str, prefix) {
        return String.prototype.startsWith
          ? str.startsWith(prefix)
          : str.indexOf(prefix) === 0;
      }
      var dataURIPrefix = "data:application/octet-stream;base64,";
      function isDataURI(filename) {
        return hasPrefix(filename, dataURIPrefix);
      }
      var fileURIPrefix = "file://";
      function isFileURI(filename) {
        return hasPrefix(filename, fileURIPrefix);
      }
      function createExportWrapper(name, fixedasm) {
        return function () {
          var displayName = name;
          var asm2 = fixedasm;
          if (!fixedasm) {
            asm2 = Module["asm"];
          }
          assert(
            runtimeInitialized,
            "native function `" +
              displayName +
              "` called before runtime initialization"
          );
          assert(
            !runtimeExited,
            "native function `" +
              displayName +
              "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)"
          );
          if (!asm2[name]) {
            assert(
              asm2[name],
              "exported native function `" + displayName + "` not found"
            );
          }
          return asm2[name].apply(null, arguments);
        };
      }
      var wasmBinaryFile = "re2.wasm";
      if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile);
      }
      function getBinary() {
        try {
          if (wasmBinary) {
            return new Uint8Array(wasmBinary);
          }
          if (readBinary) {
            return readBinary(wasmBinaryFile);
          } else {
            throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
          }
        } catch (err2) {
          abort(err2);
        }
      }
      function getBinaryPromise() {
        if (
          !wasmBinary &&
          (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) &&
          typeof fetch === "function" &&
          !isFileURI(wasmBinaryFile)
        ) {
          return fetch(wasmBinaryFile, { credentials: "same-origin" })
            .then(function (response) {
              if (!response["ok"]) {
                throw (
                  "failed to load wasm binary file at '" + wasmBinaryFile + "'"
                );
              }
              return response["arrayBuffer"]();
            })
            .catch(function () {
              return getBinary();
            });
        }
        return Promise.resolve().then(getBinary);
      }
      function createWasm() {
        var info = {
          env: asmLibraryArg,
          wasi_snapshot_preview1: asmLibraryArg,
        };
        function receiveInstance(instance, module2) {
          var exports3 = instance.exports;
          Module["asm"] = exports3;
          wasmTable = Module["asm"]["__indirect_function_table"];
          assert(wasmTable, "table not found in wasm exports");
          removeRunDependency("wasm-instantiate");
        }
        addRunDependency("wasm-instantiate");
        var trueModule = Module;
        function receiveInstantiatedSource(output) {
          assert(
            Module === trueModule,
            "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"
          );
          trueModule = null;
          receiveInstance(output["instance"]);
        }
        function instantiateArrayBuffer(receiver) {
          return getBinaryPromise()
            .then(function (binary) {
              return WebAssembly.instantiate(binary, info);
            })
            .then(receiver, function (reason) {
              err("failed to asynchronously prepare wasm: " + reason);
              abort(reason);
            });
        }
        function instantiateSync() {
          var instance;
          var module2;
          var binary;
          try {
            binary = getBinary();
            module2 = new WebAssembly.Module(binary);
            instance = new WebAssembly.Instance(module2, info);
          } catch (e) {
            var str = e.toString();
            err("failed to compile wasm module: " + str);
            if (
              str.indexOf("imported Memory") >= 0 ||
              str.indexOf("memory import") >= 0
            ) {
              err(
                "Memory size incompatibility issues may be due to changing INITIAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set INITIAL_MEMORY at runtime to something smaller than it was at compile time)."
              );
            }
            throw e;
          }
          receiveInstance(instance, module2);
        }
        if (Module["instantiateWasm"]) {
          try {
            var exports2 = Module["instantiateWasm"](info, receiveInstance);
            return exports2;
          } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false;
          }
        }
        instantiateSync();
        return Module["asm"];
      }
      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();
          if (typeof callback == "function") {
            callback(Module);
            continue;
          }
          var func = callback.func;
          if (typeof func === "number") {
            if (callback.arg === void 0) {
              wasmTable.get(func)();
            } else {
              wasmTable.get(func)(callback.arg);
            }
          } else {
            func(callback.arg === void 0 ? null : callback.arg);
          }
        }
      }
      function demangle(func) {
        warnOnce(
          "warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"
        );
        return func;
      }
      function demangleAll(text) {
        var regex = /\b_Z[\w\d_]+/g;
        return text.replace(regex, function (x) {
          var y = demangle(x);
          return x === y ? x : y + " [" + x + "]";
        });
      }
      function dynCallLegacy(sig, ptr, args) {
        assert(
          "dynCall_" + sig in Module,
          "bad function pointer type - no table for sig '" + sig + "'"
        );
        if (args && args.length) {
          assert(args.length === sig.substring(1).replace(/j/g, "--").length);
        } else {
          assert(sig.length == 1);
        }
        if (args && args.length) {
          return Module["dynCall_" + sig].apply(null, [ptr].concat(args));
        }
        return Module["dynCall_" + sig].call(null, ptr);
      }
      function dynCall(sig, ptr, args) {
        if (sig.indexOf("j") != -1) {
          return dynCallLegacy(sig, ptr, args);
        }
        assert(wasmTable.get(ptr), "missing table entry in dynCall: " + ptr);
        return wasmTable.get(ptr).apply(null, args);
      }
      function jsStackTrace() {
        var error = new Error();
        if (!error.stack) {
          try {
            throw new Error();
          } catch (e) {
            error = e;
          }
          if (!error.stack) {
            return "(no stack trace available)";
          }
        }
        return error.stack.toString();
      }
      function stackTrace() {
        var js = jsStackTrace();
        if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
        return demangleAll(js);
      }
      function ___assert_fail(condition, filename, line, func) {
        abort(
          "Assertion failed: " +
            UTF8ToString(condition) +
            ", at: " +
            [
              filename ? UTF8ToString(filename) : "unknown filename",
              line,
              func ? UTF8ToString(func) : "unknown function",
            ]
        );
      }
      var ExceptionInfoAttrs = {
        DESTRUCTOR_OFFSET: 0,
        REFCOUNT_OFFSET: 4,
        TYPE_OFFSET: 8,
        CAUGHT_OFFSET: 12,
        RETHROWN_OFFSET: 13,
        SIZE: 16,
      };
      function ___cxa_allocate_exception(size) {
        return (
          _malloc(size + ExceptionInfoAttrs.SIZE) + ExceptionInfoAttrs.SIZE
        );
      }
      function _atexit(func, arg) {}
      function ___cxa_atexit(a0, a1) {
        return _atexit(a0, a1);
      }
      function ExceptionInfo(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - ExceptionInfoAttrs.SIZE;
        this.set_type = function (type) {
          HEAP32[(this.ptr + ExceptionInfoAttrs.TYPE_OFFSET) >> 2] = type;
        };
        this.get_type = function () {
          return HEAP32[(this.ptr + ExceptionInfoAttrs.TYPE_OFFSET) >> 2];
        };
        this.set_destructor = function (destructor) {
          HEAP32[(this.ptr + ExceptionInfoAttrs.DESTRUCTOR_OFFSET) >> 2] =
            destructor;
        };
        this.get_destructor = function () {
          return HEAP32[(this.ptr + ExceptionInfoAttrs.DESTRUCTOR_OFFSET) >> 2];
        };
        this.set_refcount = function (refcount) {
          HEAP32[(this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET) >> 2] =
            refcount;
        };
        this.set_caught = function (caught) {
          caught = caught ? 1 : 0;
          HEAP8[(this.ptr + ExceptionInfoAttrs.CAUGHT_OFFSET) >> 0] = caught;
        };
        this.get_caught = function () {
          return HEAP8[(this.ptr + ExceptionInfoAttrs.CAUGHT_OFFSET) >> 0] != 0;
        };
        this.set_rethrown = function (rethrown) {
          rethrown = rethrown ? 1 : 0;
          HEAP8[(this.ptr + ExceptionInfoAttrs.RETHROWN_OFFSET) >> 0] =
            rethrown;
        };
        this.get_rethrown = function () {
          return (
            HEAP8[(this.ptr + ExceptionInfoAttrs.RETHROWN_OFFSET) >> 0] != 0
          );
        };
        this.init = function (type, destructor) {
          this.set_type(type);
          this.set_destructor(destructor);
          this.set_refcount(0);
          this.set_caught(false);
          this.set_rethrown(false);
        };
        this.add_ref = function () {
          var value =
            HEAP32[(this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET) >> 2];
          HEAP32[(this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET) >> 2] =
            value + 1;
        };
        this.release_ref = function () {
          var prev =
            HEAP32[(this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET) >> 2];
          HEAP32[(this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET) >> 2] =
            prev - 1;
          assert(prev > 0);
          return prev === 1;
        };
      }
      var exceptionLast = 0;
      var uncaughtExceptionCount = 0;
      function ___cxa_throw(ptr, type, destructor) {
        var info = new ExceptionInfo(ptr);
        info.init(type, destructor);
        exceptionLast = ptr;
        uncaughtExceptionCount++;
        throw (
          ptr +
          " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."
        );
      }
      function getShiftFromSize(size) {
        switch (size) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError("Unknown type size: " + size);
        }
      }
      function embind_init_charCodes() {
        var codes = new Array(256);
        for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
        }
        embind_charCodes = codes;
      }
      var embind_charCodes = void 0;
      function readLatin1String(ptr) {
        var ret = "";
        var c = ptr;
        while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
        }
        return ret;
      }
      var awaitingDependencies = {};
      var registeredTypes = {};
      var typeDependencies = {};
      var char_0 = 48;
      var char_9 = 57;
      function makeLegalFunctionName(name) {
        if (void 0 === name) {
          return "_unknown";
        }
        name = name.replace(/[^a-zA-Z0-9_]/g, "$");
        var f = name.charCodeAt(0);
        if (f >= char_0 && f <= char_9) {
          return "_" + name;
        } else {
          return name;
        }
      }
      function createNamedFunction(name, body) {
        name = makeLegalFunctionName(name);
        return new Function(
          "body",
          "return function " +
            name +
            '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
        )(body);
      }
      function extendError(baseErrorType, errorName) {
        var errorClass = createNamedFunction(errorName, function (message) {
          this.name = errorName;
          this.message = message;
          var stack = new Error(message).stack;
          if (stack !== void 0) {
            this.stack =
              this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
          }
        });
        errorClass.prototype = Object.create(baseErrorType.prototype);
        errorClass.prototype.constructor = errorClass;
        errorClass.prototype.toString = function () {
          if (this.message === void 0) {
            return this.name;
          } else {
            return this.name + ": " + this.message;
          }
        };
        return errorClass;
      }
      var BindingError = void 0;
      function throwBindingError(message) {
        throw new BindingError(message);
      }
      var InternalError = void 0;
      function throwInternalError(message) {
        throw new InternalError(message);
      }
      function whenDependentTypesAreResolved(
        myTypes,
        dependentTypes,
        getTypeConverters
      ) {
        myTypes.forEach(function (type) {
          typeDependencies[type] = dependentTypes;
        });
        function onComplete(typeConverters2) {
          var myTypeConverters = getTypeConverters(typeConverters2);
          if (myTypeConverters.length !== myTypes.length) {
            throwInternalError("Mismatched type converter count");
          }
          for (var i = 0; i < myTypes.length; ++i) {
            registerType(myTypes[i], myTypeConverters[i]);
          }
        }
        var typeConverters = new Array(dependentTypes.length);
        var unregisteredTypes = [];
        var registered = 0;
        dependentTypes.forEach(function (dt, i) {
          if (registeredTypes.hasOwnProperty(dt)) {
            typeConverters[i] = registeredTypes[dt];
          } else {
            unregisteredTypes.push(dt);
            if (!awaitingDependencies.hasOwnProperty(dt)) {
              awaitingDependencies[dt] = [];
            }
            awaitingDependencies[dt].push(function () {
              typeConverters[i] = registeredTypes[dt];
              ++registered;
              if (registered === unregisteredTypes.length) {
                onComplete(typeConverters);
              }
            });
          }
        });
        if (0 === unregisteredTypes.length) {
          onComplete(typeConverters);
        }
      }
      function registerType(rawType, registeredInstance, options) {
        options = options || {};
        if (!("argPackAdvance" in registeredInstance)) {
          throw new TypeError(
            "registerType registeredInstance requires argPackAdvance"
          );
        }
        var name = registeredInstance.name;
        if (!rawType) {
          throwBindingError(
            'type "' + name + '" must have a positive integer typeid pointer'
          );
        }
        if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
            return;
          } else {
            throwBindingError("Cannot register type '" + name + "' twice");
          }
        }
        registeredTypes[rawType] = registeredInstance;
        delete typeDependencies[rawType];
        if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach(function (cb) {
            cb();
          });
        }
      }
      function __embind_register_bool(
        rawType,
        name,
        size,
        trueValue,
        falseValue
      ) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, {
          name,
          fromWireType: function (wt) {
            return !!wt;
          },
          toWireType: function (destructors, o) {
            return o ? trueValue : falseValue;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (pointer) {
            var heap;
            if (size === 1) {
              heap = HEAP8;
            } else if (size === 2) {
              heap = HEAP16;
            } else if (size === 4) {
              heap = HEAP32;
            } else {
              throw new TypeError("Unknown boolean type size: " + name);
            }
            return this["fromWireType"](heap[pointer >> shift]);
          },
          destructorFunction: null,
          // This type does not need a destructor
        });
      }
      function ClassHandle_isAliasOf(other) {
        if (!(this instanceof ClassHandle)) {
          return false;
        }
        if (!(other instanceof ClassHandle)) {
          return false;
        }
        var leftClass = this.$$.ptrType.registeredClass;
        var left = this.$$.ptr;
        var rightClass = other.$$.ptrType.registeredClass;
        var right = other.$$.ptr;
        while (leftClass.baseClass) {
          left = leftClass.upcast(left);
          leftClass = leftClass.baseClass;
        }
        while (rightClass.baseClass) {
          right = rightClass.upcast(right);
          rightClass = rightClass.baseClass;
        }
        return leftClass === rightClass && left === right;
      }
      function shallowCopyInternalPointer(o) {
        return {
          count: o.count,
          deleteScheduled: o.deleteScheduled,
          preservePointerOnDelete: o.preservePointerOnDelete,
          ptr: o.ptr,
          ptrType: o.ptrType,
          smartPtr: o.smartPtr,
          smartPtrType: o.smartPtrType,
        };
      }
      function throwInstanceAlreadyDeleted(obj) {
        function getInstanceTypeName(handle) {
          return handle.$$.ptrType.registeredClass.name;
        }
        throwBindingError(
          getInstanceTypeName(obj) + " instance already deleted"
        );
      }
      var finalizationGroup = false;
      function detachFinalizer(handle) {}
      function runDestructor($$) {
        if ($$.smartPtr) {
          $$.smartPtrType.rawDestructor($$.smartPtr);
        } else {
          $$.ptrType.registeredClass.rawDestructor($$.ptr);
        }
      }
      function releaseClassHandle($$) {
        $$.count.value -= 1;
        var toDelete = 0 === $$.count.value;
        if (toDelete) {
          runDestructor($$);
        }
      }
      function attachFinalizer(handle) {
        if ("undefined" === typeof FinalizationGroup) {
          attachFinalizer = function (handle2) {
            return handle2;
          };
          return handle;
        }
        finalizationGroup = new FinalizationGroup(function (iter) {
          for (var result = iter.next(); !result.done; result = iter.next()) {
            var $$ = result.value;
            if (!$$.ptr) {
              console.warn("object already deleted: " + $$.ptr);
            } else {
              releaseClassHandle($$);
            }
          }
        });
        attachFinalizer = function (handle2) {
          finalizationGroup.register(handle2, handle2.$$, handle2.$$);
          return handle2;
        };
        detachFinalizer = function (handle2) {
          finalizationGroup.unregister(handle2.$$);
        };
        return attachFinalizer(handle);
      }
      function ClassHandle_clone() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.preservePointerOnDelete) {
          this.$$.count.value += 1;
          return this;
        } else {
          var clone = attachFinalizer(
            Object.create(Object.getPrototypeOf(this), {
              $$: {
                value: shallowCopyInternalPointer(this.$$),
              },
            })
          );
          clone.$$.count.value += 1;
          clone.$$.deleteScheduled = false;
          return clone;
        }
      }
      function ClassHandle_delete() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        detachFinalizer(this);
        releaseClassHandle(this.$$);
        if (!this.$$.preservePointerOnDelete) {
          this.$$.smartPtr = void 0;
          this.$$.ptr = void 0;
        }
      }
      function ClassHandle_isDeleted() {
        return !this.$$.ptr;
      }
      var delayFunction = void 0;
      var deletionQueue = [];
      function flushPendingDeletes() {
        while (deletionQueue.length) {
          var obj = deletionQueue.pop();
          obj.$$.deleteScheduled = false;
          obj["delete"]();
        }
      }
      function ClassHandle_deleteLater() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        deletionQueue.push(this);
        if (deletionQueue.length === 1 && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
        this.$$.deleteScheduled = true;
        return this;
      }
      function init_ClassHandle() {
        ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
        ClassHandle.prototype["clone"] = ClassHandle_clone;
        ClassHandle.prototype["delete"] = ClassHandle_delete;
        ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
        ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
      }
      function ClassHandle() {}
      var registeredPointers = {};
      function ensureOverloadTable(proto, methodName, humanName) {
        if (void 0 === proto[methodName].overloadTable) {
          var prevFunc = proto[methodName];
          proto[methodName] = function () {
            if (
              !proto[methodName].overloadTable.hasOwnProperty(arguments.length)
            ) {
              throwBindingError(
                "Function '" +
                  humanName +
                  "' called with an invalid number of arguments (" +
                  arguments.length +
                  ") - expects one of (" +
                  proto[methodName].overloadTable +
                  ")!"
              );
            }
            return proto[methodName].overloadTable[arguments.length].apply(
              this,
              arguments
            );
          };
          proto[methodName].overloadTable = [];
          proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
        }
      }
      function exposePublicSymbol(name, value, numArguments) {
        if (Module.hasOwnProperty(name)) {
          if (
            void 0 === numArguments ||
            (void 0 !== Module[name].overloadTable &&
              void 0 !== Module[name].overloadTable[numArguments])
          ) {
            throwBindingError(
              "Cannot register public name '" + name + "' twice"
            );
          }
          ensureOverloadTable(Module, name, name);
          if (Module.hasOwnProperty(numArguments)) {
            throwBindingError(
              "Cannot register multiple overloads of a function with the same number of arguments (" +
                numArguments +
                ")!"
            );
          }
          Module[name].overloadTable[numArguments] = value;
        } else {
          Module[name] = value;
          if (void 0 !== numArguments) {
            Module[name].numArguments = numArguments;
          }
        }
      }
      function RegisteredClass(
        name,
        constructor,
        instancePrototype,
        rawDestructor,
        baseClass,
        getActualType,
        upcast,
        downcast
      ) {
        this.name = name;
        this.constructor = constructor;
        this.instancePrototype = instancePrototype;
        this.rawDestructor = rawDestructor;
        this.baseClass = baseClass;
        this.getActualType = getActualType;
        this.upcast = upcast;
        this.downcast = downcast;
        this.pureVirtualFunctions = [];
      }
      function upcastPointer(ptr, ptrClass, desiredClass) {
        while (ptrClass !== desiredClass) {
          if (!ptrClass.upcast) {
            throwBindingError(
              "Expected null or instance of " +
                desiredClass.name +
                ", got an instance of " +
                ptrClass.name
            );
          }
          ptr = ptrClass.upcast(ptr);
          ptrClass = ptrClass.baseClass;
        }
        return ptr;
      }
      function constNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          return 0;
        }
        if (!handle.$$) {
          throwBindingError(
            'Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name
          );
        }
        if (!handle.$$.ptr) {
          throwBindingError(
            "Cannot pass deleted object as a pointer of type " + this.name
          );
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(
          handle.$$.ptr,
          handleClass,
          this.registeredClass
        );
        return ptr;
      }
      function genericPointerToWireType(destructors, handle) {
        var ptr;
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          if (this.isSmartPointer) {
            ptr = this.rawConstructor();
            if (destructors !== null) {
              destructors.push(this.rawDestructor, ptr);
            }
            return ptr;
          } else {
            return 0;
          }
        }
        if (!handle.$$) {
          throwBindingError(
            'Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name
          );
        }
        if (!handle.$$.ptr) {
          throwBindingError(
            "Cannot pass deleted object as a pointer of type " + this.name
          );
        }
        if (!this.isConst && handle.$$.ptrType.isConst) {
          throwBindingError(
            "Cannot convert argument of type " +
              (handle.$$.smartPtrType
                ? handle.$$.smartPtrType.name
                : handle.$$.ptrType.name) +
              " to parameter type " +
              this.name
          );
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        if (this.isSmartPointer) {
          if (void 0 === handle.$$.smartPtr) {
            throwBindingError(
              "Passing raw pointer to smart pointer is illegal"
            );
          }
          switch (this.sharingPolicy) {
            case 0:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                throwBindingError(
                  "Cannot convert argument of type " +
                    (handle.$$.smartPtrType
                      ? handle.$$.smartPtrType.name
                      : handle.$$.ptrType.name) +
                    " to parameter type " +
                    this.name
                );
              }
              break;
            case 1:
              ptr = handle.$$.smartPtr;
              break;
            case 2:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                var clonedHandle = handle["clone"]();
                ptr = this.rawShare(
                  ptr,
                  __emval_register(function () {
                    clonedHandle["delete"]();
                  })
                );
                if (destructors !== null) {
                  destructors.push(this.rawDestructor, ptr);
                }
              }
              break;
            default:
              throwBindingError("Unsupporting sharing policy");
          }
        }
        return ptr;
      }
      function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          return 0;
        }
        if (!handle.$$) {
          throwBindingError(
            'Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name
          );
        }
        if (!handle.$$.ptr) {
          throwBindingError(
            "Cannot pass deleted object as a pointer of type " + this.name
          );
        }
        if (handle.$$.ptrType.isConst) {
          throwBindingError(
            "Cannot convert argument of type " +
              handle.$$.ptrType.name +
              " to parameter type " +
              this.name
          );
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(
          handle.$$.ptr,
          handleClass,
          this.registeredClass
        );
        return ptr;
      }
      function simpleReadValueFromPointer(pointer) {
        return this["fromWireType"](HEAPU32[pointer >> 2]);
      }
      function RegisteredPointer_getPointee(ptr) {
        if (this.rawGetPointee) {
          ptr = this.rawGetPointee(ptr);
        }
        return ptr;
      }
      function RegisteredPointer_destructor(ptr) {
        if (this.rawDestructor) {
          this.rawDestructor(ptr);
        }
      }
      function RegisteredPointer_deleteObject(handle) {
        if (handle !== null) {
          handle["delete"]();
        }
      }
      function downcastPointer(ptr, ptrClass, desiredClass) {
        if (ptrClass === desiredClass) {
          return ptr;
        }
        if (void 0 === desiredClass.baseClass) {
          return null;
        }
        var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
        if (rv === null) {
          return null;
        }
        return desiredClass.downcast(rv);
      }
      function getInheritedInstanceCount() {
        return Object.keys(registeredInstances).length;
      }
      function getLiveInheritedInstances() {
        var rv = [];
        for (var k in registeredInstances) {
          if (registeredInstances.hasOwnProperty(k)) {
            rv.push(registeredInstances[k]);
          }
        }
        return rv;
      }
      function setDelayFunction(fn) {
        delayFunction = fn;
        if (deletionQueue.length && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
      }
      function init_embind() {
        Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
        Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
        Module["flushPendingDeletes"] = flushPendingDeletes;
        Module["setDelayFunction"] = setDelayFunction;
      }
      var registeredInstances = {};
      function getBasestPointer(class_, ptr) {
        if (ptr === void 0) {
          throwBindingError("ptr should not be undefined");
        }
        while (class_.baseClass) {
          ptr = class_.upcast(ptr);
          class_ = class_.baseClass;
        }
        return ptr;
      }
      function getInheritedInstance(class_, ptr) {
        ptr = getBasestPointer(class_, ptr);
        return registeredInstances[ptr];
      }
      function makeClassHandle(prototype, record) {
        if (!record.ptrType || !record.ptr) {
          throwInternalError("makeClassHandle requires ptr and ptrType");
        }
        var hasSmartPtrType = !!record.smartPtrType;
        var hasSmartPtr = !!record.smartPtr;
        if (hasSmartPtrType !== hasSmartPtr) {
          throwInternalError(
            "Both smartPtrType and smartPtr must be specified"
          );
        }
        record.count = { value: 1 };
        return attachFinalizer(
          Object.create(prototype, {
            $$: {
              value: record,
            },
          })
        );
      }
      function RegisteredPointer_fromWireType(ptr) {
        var rawPointer = this.getPointee(ptr);
        if (!rawPointer) {
          this.destructor(ptr);
          return null;
        }
        var registeredInstance = getInheritedInstance(
          this.registeredClass,
          rawPointer
        );
        if (void 0 !== registeredInstance) {
          if (0 === registeredInstance.$$.count.value) {
            registeredInstance.$$.ptr = rawPointer;
            registeredInstance.$$.smartPtr = ptr;
            return registeredInstance["clone"]();
          } else {
            var rv = registeredInstance["clone"]();
            this.destructor(ptr);
            return rv;
          }
        }
        function makeDefaultHandle() {
          if (this.isSmartPointer) {
            return makeClassHandle(this.registeredClass.instancePrototype, {
              ptrType: this.pointeeType,
              ptr: rawPointer,
              smartPtrType: this,
              smartPtr: ptr,
            });
          } else {
            return makeClassHandle(this.registeredClass.instancePrototype, {
              ptrType: this,
              ptr,
            });
          }
        }
        var actualType = this.registeredClass.getActualType(rawPointer);
        var registeredPointerRecord = registeredPointers[actualType];
        if (!registeredPointerRecord) {
          return makeDefaultHandle.call(this);
        }
        var toType;
        if (this.isConst) {
          toType = registeredPointerRecord.constPointerType;
        } else {
          toType = registeredPointerRecord.pointerType;
        }
        var dp = downcastPointer(
          rawPointer,
          this.registeredClass,
          toType.registeredClass
        );
        if (dp === null) {
          return makeDefaultHandle.call(this);
        }
        if (this.isSmartPointer) {
          return makeClassHandle(toType.registeredClass.instancePrototype, {
            ptrType: toType,
            ptr: dp,
            smartPtrType: this,
            smartPtr: ptr,
          });
        } else {
          return makeClassHandle(toType.registeredClass.instancePrototype, {
            ptrType: toType,
            ptr: dp,
          });
        }
      }
      function init_RegisteredPointer() {
        RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
        RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
        RegisteredPointer.prototype["argPackAdvance"] = 8;
        RegisteredPointer.prototype["readValueFromPointer"] =
          simpleReadValueFromPointer;
        RegisteredPointer.prototype["deleteObject"] =
          RegisteredPointer_deleteObject;
        RegisteredPointer.prototype["fromWireType"] =
          RegisteredPointer_fromWireType;
      }
      function RegisteredPointer(
        name,
        registeredClass,
        isReference,
        isConst,
        isSmartPointer,
        pointeeType,
        sharingPolicy,
        rawGetPointee,
        rawConstructor,
        rawShare,
        rawDestructor
      ) {
        this.name = name;
        this.registeredClass = registeredClass;
        this.isReference = isReference;
        this.isConst = isConst;
        this.isSmartPointer = isSmartPointer;
        this.pointeeType = pointeeType;
        this.sharingPolicy = sharingPolicy;
        this.rawGetPointee = rawGetPointee;
        this.rawConstructor = rawConstructor;
        this.rawShare = rawShare;
        this.rawDestructor = rawDestructor;
        if (!isSmartPointer && registeredClass.baseClass === void 0) {
          if (isConst) {
            this["toWireType"] = constNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          } else {
            this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          }
        } else {
          this["toWireType"] = genericPointerToWireType;
        }
      }
      function replacePublicSymbol(name, value, numArguments) {
        if (!Module.hasOwnProperty(name)) {
          throwInternalError("Replacing nonexistant public symbol");
        }
        if (void 0 !== Module[name].overloadTable && void 0 !== numArguments) {
          Module[name].overloadTable[numArguments] = value;
        } else {
          Module[name] = value;
          Module[name].argCount = numArguments;
        }
      }
      function getDynCaller(sig, ptr) {
        assert(
          sig.indexOf("j") >= 0,
          "getDynCaller should only be called with i64 sigs"
        );
        var argCache = [];
        return function () {
          argCache.length = arguments.length;
          for (var i = 0; i < arguments.length; i++) {
            argCache[i] = arguments[i];
          }
          return dynCall(sig, ptr, argCache);
        };
      }
      function embind__requireFunction(signature, rawFunction) {
        signature = readLatin1String(signature);
        function makeDynCaller() {
          if (signature.indexOf("j") != -1) {
            return getDynCaller(signature, rawFunction);
          }
          return wasmTable.get(rawFunction);
        }
        var fp = makeDynCaller();
        if (typeof fp !== "function") {
          throwBindingError(
            "unknown function pointer with signature " +
              signature +
              ": " +
              rawFunction
          );
        }
        return fp;
      }
      var UnboundTypeError = void 0;
      function getTypeName(type) {
        var ptr = ___getTypeName(type);
        var rv = readLatin1String(ptr);
        _free(ptr);
        return rv;
      }
      function throwUnboundTypeError(message, types) {
        var unboundTypes = [];
        var seen = {};
        function visit(type) {
          if (seen[type]) {
            return;
          }
          if (registeredTypes[type]) {
            return;
          }
          if (typeDependencies[type]) {
            typeDependencies[type].forEach(visit);
            return;
          }
          unboundTypes.push(type);
          seen[type] = true;
        }
        types.forEach(visit);
        throw new UnboundTypeError(
          message + ": " + unboundTypes.map(getTypeName).join([", "])
        );
      }
      function __embind_register_class(
        rawType,
        rawPointerType,
        rawConstPointerType,
        baseClassRawType,
        getActualTypeSignature,
        getActualType,
        upcastSignature,
        upcast,
        downcastSignature,
        downcast,
        name,
        destructorSignature,
        rawDestructor
      ) {
        name = readLatin1String(name);
        getActualType = embind__requireFunction(
          getActualTypeSignature,
          getActualType
        );
        if (upcast) {
          upcast = embind__requireFunction(upcastSignature, upcast);
        }
        if (downcast) {
          downcast = embind__requireFunction(downcastSignature, downcast);
        }
        rawDestructor = embind__requireFunction(
          destructorSignature,
          rawDestructor
        );
        var legalFunctionName = makeLegalFunctionName(name);
        exposePublicSymbol(legalFunctionName, function () {
          throwUnboundTypeError(
            "Cannot construct " + name + " due to unbound types",
            [baseClassRawType]
          );
        });
        whenDependentTypesAreResolved(
          [rawType, rawPointerType, rawConstPointerType],
          baseClassRawType ? [baseClassRawType] : [],
          function (base) {
            base = base[0];
            var baseClass;
            var basePrototype;
            if (baseClassRawType) {
              baseClass = base.registeredClass;
              basePrototype = baseClass.instancePrototype;
            } else {
              basePrototype = ClassHandle.prototype;
            }
            var constructor = createNamedFunction(
              legalFunctionName,
              function () {
                if (Object.getPrototypeOf(this) !== instancePrototype) {
                  throw new BindingError("Use 'new' to construct " + name);
                }
                if (void 0 === registeredClass.constructor_body) {
                  throw new BindingError(
                    name + " has no accessible constructor"
                  );
                }
                var body = registeredClass.constructor_body[arguments.length];
                if (void 0 === body) {
                  throw new BindingError(
                    "Tried to invoke ctor of " +
                      name +
                      " with invalid number of parameters (" +
                      arguments.length +
                      ") - expected (" +
                      Object.keys(registeredClass.constructor_body).toString() +
                      ") parameters instead!"
                  );
                }
                return body.apply(this, arguments);
              }
            );
            var instancePrototype = Object.create(basePrototype, {
              constructor: { value: constructor },
            });
            constructor.prototype = instancePrototype;
            var registeredClass = new RegisteredClass(
              name,
              constructor,
              instancePrototype,
              rawDestructor,
              baseClass,
              getActualType,
              upcast,
              downcast
            );
            var referenceConverter = new RegisteredPointer(
              name,
              registeredClass,
              true,
              false,
              false
            );
            var pointerConverter = new RegisteredPointer(
              name + "*",
              registeredClass,
              false,
              false,
              false
            );
            var constPointerConverter = new RegisteredPointer(
              name + " const*",
              registeredClass,
              false,
              true,
              false
            );
            registeredPointers[rawType] = {
              pointerType: pointerConverter,
              constPointerType: constPointerConverter,
            };
            replacePublicSymbol(legalFunctionName, constructor);
            return [
              referenceConverter,
              pointerConverter,
              constPointerConverter,
            ];
          }
        );
      }
      function heap32VectorToArray(count, firstElement) {
        var array = [];
        for (var i = 0; i < count; i++) {
          array.push(HEAP32[(firstElement >> 2) + i]);
        }
        return array;
      }
      function runDestructors(destructors) {
        while (destructors.length) {
          var ptr = destructors.pop();
          var del = destructors.pop();
          del(ptr);
        }
      }
      function __embind_register_class_constructor(
        rawClassType,
        argCount,
        rawArgTypesAddr,
        invokerSignature,
        invoker,
        rawConstructor
      ) {
        assert(argCount > 0);
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        invoker = embind__requireFunction(invokerSignature, invoker);
        var args = [rawConstructor];
        var destructors = [];
        whenDependentTypesAreResolved([], [rawClassType], function (classType) {
          classType = classType[0];
          var humanName = "constructor " + classType.name;
          if (void 0 === classType.registeredClass.constructor_body) {
            classType.registeredClass.constructor_body = [];
          }
          if (
            void 0 !== classType.registeredClass.constructor_body[argCount - 1]
          ) {
            throw new BindingError(
              "Cannot register multiple constructors with identical number of parameters (" +
                (argCount - 1) +
                ") for class '" +
                classType.name +
                "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
            );
          }
          classType.registeredClass.constructor_body[argCount - 1] =
            function unboundTypeHandler() {
              throwUnboundTypeError(
                "Cannot construct " + classType.name + " due to unbound types",
                rawArgTypes
              );
            };
          whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
            classType.registeredClass.constructor_body[argCount - 1] =
              function constructor_body() {
                if (arguments.length !== argCount - 1) {
                  throwBindingError(
                    humanName +
                      " called with " +
                      arguments.length +
                      " arguments, expected " +
                      (argCount - 1)
                  );
                }
                destructors.length = 0;
                args.length = argCount;
                for (var i = 1; i < argCount; ++i) {
                  args[i] = argTypes[i]["toWireType"](
                    destructors,
                    arguments[i - 1]
                  );
                }
                var ptr = invoker.apply(null, args);
                runDestructors(destructors);
                return argTypes[0]["fromWireType"](ptr);
              };
            return [];
          });
          return [];
        });
      }
      function new_(constructor, argumentList) {
        if (!(constructor instanceof Function)) {
          throw new TypeError(
            "new_ called with constructor type " +
              typeof constructor +
              " which is not a function"
          );
        }
        var dummy = createNamedFunction(
          constructor.name || "unknownFunctionName",
          function () {}
        );
        dummy.prototype = constructor.prototype;
        var obj = new dummy();
        var r = constructor.apply(obj, argumentList);
        return r instanceof Object ? r : obj;
      }
      function craftInvokerFunction(
        humanName,
        argTypes,
        classType,
        cppInvokerFunc,
        cppTargetFunc
      ) {
        var argCount = argTypes.length;
        if (argCount < 2) {
          throwBindingError(
            "argTypes array size mismatch! Must at least get return value and 'this' types!"
          );
        }
        var isClassMethodFunc = argTypes[1] !== null && classType !== null;
        var needsDestructorStack = false;
        for (var i = 1; i < argTypes.length; ++i) {
          if (
            argTypes[i] !== null &&
            argTypes[i].destructorFunction === void 0
          ) {
            needsDestructorStack = true;
            break;
          }
        }
        var returns = argTypes[0].name !== "void";
        var argsList = "";
        var argsListWired = "";
        for (var i = 0; i < argCount - 2; ++i) {
          argsList += (i !== 0 ? ", " : "") + "arg" + i;
          argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
        }
        var invokerFnBody =
          "return function " +
          makeLegalFunctionName(humanName) +
          "(" +
          argsList +
          ") {\nif (arguments.length !== " +
          (argCount - 2) +
          ") {\nthrowBindingError('function " +
          humanName +
          " called with ' + arguments.length + ' arguments, expected " +
          (argCount - 2) +
          " args!');\n}\n";
        if (needsDestructorStack) {
          invokerFnBody += "var destructors = [];\n";
        }
        var dtorStack = needsDestructorStack ? "destructors" : "null";
        var args1 = [
          "throwBindingError",
          "invoker",
          "fn",
          "runDestructors",
          "retType",
          "classParam",
        ];
        var args2 = [
          throwBindingError,
          cppInvokerFunc,
          cppTargetFunc,
          runDestructors,
          argTypes[0],
          argTypes[1],
        ];
        if (isClassMethodFunc) {
          invokerFnBody +=
            "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
        }
        for (var i = 0; i < argCount - 2; ++i) {
          invokerFnBody +=
            "var arg" +
            i +
            "Wired = argType" +
            i +
            ".toWireType(" +
            dtorStack +
            ", arg" +
            i +
            "); // " +
            argTypes[i + 2].name +
            "\n";
          args1.push("argType" + i);
          args2.push(argTypes[i + 2]);
        }
        if (isClassMethodFunc) {
          argsListWired =
            "thisWired" +
            (argsListWired.length > 0 ? ", " : "") +
            argsListWired;
        }
        invokerFnBody +=
          (returns ? "var rv = " : "") +
          "invoker(fn" +
          (argsListWired.length > 0 ? ", " : "") +
          argsListWired +
          ");\n";
        if (needsDestructorStack) {
          invokerFnBody += "runDestructors(destructors);\n";
        } else {
          for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
            var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
            if (argTypes[i].destructorFunction !== null) {
              invokerFnBody +=
                paramName +
                "_dtor(" +
                paramName +
                "); // " +
                argTypes[i].name +
                "\n";
              args1.push(paramName + "_dtor");
              args2.push(argTypes[i].destructorFunction);
            }
          }
        }
        if (returns) {
          invokerFnBody += "var ret = retType.fromWireType(rv);\nreturn ret;\n";
        } else {
        }
        invokerFnBody += "}\n";
        args1.push(invokerFnBody);
        var invokerFunction = new_(Function, args1).apply(null, args2);
        return invokerFunction;
      }
      function __embind_register_class_function(
        rawClassType,
        methodName,
        argCount,
        rawArgTypesAddr,
        invokerSignature,
        rawInvoker,
        context,
        isPureVirtual
      ) {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [rawClassType], function (classType) {
          classType = classType[0];
          var humanName = classType.name + "." + methodName;
          if (isPureVirtual) {
            classType.registeredClass.pureVirtualFunctions.push(methodName);
          }
          function unboundTypesHandler() {
            throwUnboundTypeError(
              "Cannot call " + humanName + " due to unbound types",
              rawArgTypes
            );
          }
          var proto = classType.registeredClass.instancePrototype;
          var method = proto[methodName];
          if (
            void 0 === method ||
            (void 0 === method.overloadTable &&
              method.className !== classType.name &&
              method.argCount === argCount - 2)
          ) {
            unboundTypesHandler.argCount = argCount - 2;
            unboundTypesHandler.className = classType.name;
            proto[methodName] = unboundTypesHandler;
          } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
          }
          whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
            var memberFunction = craftInvokerFunction(
              humanName,
              argTypes,
              classType,
              rawInvoker,
              context
            );
            if (void 0 === proto[methodName].overloadTable) {
              memberFunction.argCount = argCount - 2;
              proto[methodName] = memberFunction;
            } else {
              proto[methodName].overloadTable[argCount - 2] = memberFunction;
            }
            return [];
          });
          return [];
        });
      }
      var emval_free_list = [];
      var emval_handle_array = [
        {},
        { value: void 0 },
        { value: null },
        { value: true },
        { value: false },
      ];
      function __emval_decref(handle) {
        if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
          emval_handle_array[handle] = void 0;
          emval_free_list.push(handle);
        }
      }
      function count_emval_handles() {
        var count = 0;
        for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== void 0) {
            ++count;
          }
        }
        return count;
      }
      function get_first_emval() {
        for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== void 0) {
            return emval_handle_array[i];
          }
        }
        return null;
      }
      function init_emval() {
        Module["count_emval_handles"] = count_emval_handles;
        Module["get_first_emval"] = get_first_emval;
      }
      function __emval_register(value) {
        switch (value) {
          case void 0: {
            return 1;
          }
          case null: {
            return 2;
          }
          case true: {
            return 3;
          }
          case false: {
            return 4;
          }
          default: {
            var handle = emval_free_list.length
              ? emval_free_list.pop()
              : emval_handle_array.length;
            emval_handle_array[handle] = { refcount: 1, value };
            return handle;
          }
        }
      }
      function __embind_register_emval(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, {
          name,
          fromWireType: function (handle) {
            var rv = emval_handle_array[handle].value;
            __emval_decref(handle);
            return rv;
          },
          toWireType: function (destructors, value) {
            return __emval_register(value);
          },
          argPackAdvance: 8,
          readValueFromPointer: simpleReadValueFromPointer,
          destructorFunction: null,
          // This type does not need a destructor
          // TODO: do we need a deleteObject here?  write a test where
          // emval is passed into JS via an interface
        });
      }
      function _embind_repr(v) {
        if (v === null) {
          return "null";
        }
        var t = typeof v;
        if (t === "object" || t === "array" || t === "function") {
          return v.toString();
        } else {
          return "" + v;
        }
      }
      function floatReadValueFromPointer(name, shift) {
        switch (shift) {
          case 2:
            return function (pointer) {
              return this["fromWireType"](HEAPF32[pointer >> 2]);
            };
          case 3:
            return function (pointer) {
              return this["fromWireType"](HEAPF64[pointer >> 3]);
            };
          default:
            throw new TypeError("Unknown float type: " + name);
        }
      }
      function __embind_register_float(rawType, name, size) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, {
          name,
          fromWireType: function (value) {
            return value;
          },
          toWireType: function (destructors, value) {
            if (typeof value !== "number" && typeof value !== "boolean") {
              throw new TypeError(
                'Cannot convert "' + _embind_repr(value) + '" to ' + this.name
              );
            }
            return value;
          },
          argPackAdvance: 8,
          readValueFromPointer: floatReadValueFromPointer(name, shift),
          destructorFunction: null,
          // This type does not need a destructor
        });
      }
      function integerReadValueFromPointer(name, shift, signed) {
        switch (shift) {
          case 0:
            return signed
              ? function readS8FromPointer(pointer) {
                  return HEAP8[pointer];
                }
              : function readU8FromPointer(pointer) {
                  return HEAPU8[pointer];
                };
          case 1:
            return signed
              ? function readS16FromPointer(pointer) {
                  return HEAP16[pointer >> 1];
                }
              : function readU16FromPointer(pointer) {
                  return HEAPU16[pointer >> 1];
                };
          case 2:
            return signed
              ? function readS32FromPointer(pointer) {
                  return HEAP32[pointer >> 2];
                }
              : function readU32FromPointer(pointer) {
                  return HEAPU32[pointer >> 2];
                };
          default:
            throw new TypeError("Unknown integer type: " + name);
        }
      }
      function __embind_register_integer(
        primitiveType,
        name,
        size,
        minRange,
        maxRange
      ) {
        name = readLatin1String(name);
        if (maxRange === -1) {
          maxRange = 4294967295;
        }
        var shift = getShiftFromSize(size);
        var fromWireType = function (value) {
          return value;
        };
        if (minRange === 0) {
          var bitshift = 32 - 8 * size;
          fromWireType = function (value) {
            return (value << bitshift) >>> bitshift;
          };
        }
        var isUnsignedType = name.indexOf("unsigned") != -1;
        registerType(primitiveType, {
          name,
          fromWireType: fromWireType,
          toWireType: function (destructors, value) {
            if (typeof value !== "number" && typeof value !== "boolean") {
              throw new TypeError(
                'Cannot convert "' + _embind_repr(value) + '" to ' + this.name
              );
            }
            if (value < minRange || value > maxRange) {
              throw new TypeError(
                'Passing a number "' +
                  _embind_repr(value) +
                  '" from JS side to C/C++ side to an argument of type "' +
                  name +
                  '", which is outside the valid range [' +
                  minRange +
                  ", " +
                  maxRange +
                  "]!"
              );
            }
            return isUnsignedType ? value >>> 0 : value | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: integerReadValueFromPointer(
            name,
            shift,
            minRange !== 0
          ),
          destructorFunction: null,
          // This type does not need a destructor
        });
      }
      function __embind_register_memory_view(rawType, dataTypeIndex, name) {
        var typeMapping = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
        ];
        var TA = typeMapping[dataTypeIndex];
        function decodeMemoryView(handle) {
          handle = handle >> 2;
          var heap = HEAPU32;
          var size = heap[handle];
          var data = heap[handle + 1];
          return new TA(buffer, data, size);
        }
        name = readLatin1String(name);
        registerType(
          rawType,
          {
            name,
            fromWireType: decodeMemoryView,
            argPackAdvance: 8,
            readValueFromPointer: decodeMemoryView,
          },
          {
            ignoreDuplicateRegistrations: true,
          }
        );
      }
      function __embind_register_smart_ptr(
        rawType,
        rawPointeeType,
        name,
        sharingPolicy,
        getPointeeSignature,
        rawGetPointee,
        constructorSignature,
        rawConstructor,
        shareSignature,
        rawShare,
        destructorSignature,
        rawDestructor
      ) {
        name = readLatin1String(name);
        rawGetPointee = embind__requireFunction(
          getPointeeSignature,
          rawGetPointee
        );
        rawConstructor = embind__requireFunction(
          constructorSignature,
          rawConstructor
        );
        rawShare = embind__requireFunction(shareSignature, rawShare);
        rawDestructor = embind__requireFunction(
          destructorSignature,
          rawDestructor
        );
        whenDependentTypesAreResolved(
          [rawType],
          [rawPointeeType],
          function (pointeeType) {
            pointeeType = pointeeType[0];
            var registeredPointer = new RegisteredPointer(
              name,
              pointeeType.registeredClass,
              false,
              false,
              // smart pointer properties
              true,
              pointeeType,
              sharingPolicy,
              rawGetPointee,
              rawConstructor,
              rawShare,
              rawDestructor
            );
            return [registeredPointer];
          }
        );
      }
      function __embind_register_std_string(rawType, name) {
        name = readLatin1String(name);
        var stdStringIsUTF8 = name === "std::string";
        registerType(rawType, {
          name,
          fromWireType: function (value) {
            var length = HEAPU32[value >> 2];
            var str;
            if (stdStringIsUTF8) {
              var decodeStartPtr = value + 4;
              for (var i = 0; i <= length; ++i) {
                var currentBytePtr = value + 4 + i;
                if (i == length || HEAPU8[currentBytePtr] == 0) {
                  var maxRead = currentBytePtr - decodeStartPtr;
                  var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                  if (str === void 0) {
                    str = stringSegment;
                  } else {
                    str += String.fromCharCode(0);
                    str += stringSegment;
                  }
                  decodeStartPtr = currentBytePtr + 1;
                }
              }
            } else {
              var a = new Array(length);
              for (var i = 0; i < length; ++i) {
                a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
              }
              str = a.join("");
            }
            _free(value);
            return str;
          },
          toWireType: function (destructors, value) {
            if (value instanceof ArrayBuffer) {
              value = new Uint8Array(value);
            }
            var getLength;
            var valueIsOfTypeString = typeof value === "string";
            if (
              !(
                valueIsOfTypeString ||
                value instanceof Uint8Array ||
                value instanceof Uint8ClampedArray ||
                value instanceof Int8Array
              )
            ) {
              throwBindingError("Cannot pass non-string to std::string");
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              getLength = function () {
                return lengthBytesUTF8(value);
              };
            } else {
              getLength = function () {
                return value.length;
              };
            }
            var length = getLength();
            var ptr = _malloc(4 + length + 1);
            HEAPU32[ptr >> 2] = length;
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              stringToUTF8(value, ptr + 4, length + 1);
            } else {
              if (valueIsOfTypeString) {
                for (var i = 0; i < length; ++i) {
                  var charCode = value.charCodeAt(i);
                  if (charCode > 255) {
                    _free(ptr);
                    throwBindingError(
                      "String has UTF-16 code units that do not fit in 8 bits"
                    );
                  }
                  HEAPU8[ptr + 4 + i] = charCode;
                }
              } else {
                for (var i = 0; i < length; ++i) {
                  HEAPU8[ptr + 4 + i] = value[i];
                }
              }
            }
            if (destructors !== null) {
              destructors.push(_free, ptr);
            }
            return ptr;
          },
          argPackAdvance: 8,
          readValueFromPointer: simpleReadValueFromPointer,
          destructorFunction: function (ptr) {
            _free(ptr);
          },
        });
      }
      function __embind_register_std_wstring(rawType, charSize, name) {
        name = readLatin1String(name);
        var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
        if (charSize === 2) {
          decodeString = UTF16ToString;
          encodeString = stringToUTF16;
          lengthBytesUTF = lengthBytesUTF16;
          getHeap = function () {
            return HEAPU16;
          };
          shift = 1;
        } else if (charSize === 4) {
          decodeString = UTF32ToString;
          encodeString = stringToUTF32;
          lengthBytesUTF = lengthBytesUTF32;
          getHeap = function () {
            return HEAPU32;
          };
          shift = 2;
        }
        registerType(rawType, {
          name,
          fromWireType: function (value) {
            var length = HEAPU32[value >> 2];
            var HEAP2 = getHeap();
            var str;
            var decodeStartPtr = value + 4;
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = value + 4 + i * charSize;
              if (i == length || HEAP2[currentBytePtr >> shift] == 0) {
                var maxReadBytes = currentBytePtr - decodeStartPtr;
                var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                if (str === void 0) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + charSize;
              }
            }
            _free(value);
            return str;
          },
          toWireType: function (destructors, value) {
            if (!(typeof value === "string")) {
              throwBindingError(
                "Cannot pass non-string to C++ string type " + name
              );
            }
            var length = lengthBytesUTF(value);
            var ptr = _malloc(4 + length + charSize);
            HEAPU32[ptr >> 2] = length >> shift;
            encodeString(value, ptr + 4, length + charSize);
            if (destructors !== null) {
              destructors.push(_free, ptr);
            }
            return ptr;
          },
          argPackAdvance: 8,
          readValueFromPointer: simpleReadValueFromPointer,
          destructorFunction: function (ptr) {
            _free(ptr);
          },
        });
      }
      function __embind_register_void(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, {
          isVoid: true,
          // void return values can be optimized out sometimes
          name,
          argPackAdvance: 0,
          fromWireType: function () {
            return void 0;
          },
          toWireType: function (destructors, o) {
            return void 0;
          },
        });
      }
      function requireRegisteredType(rawType, humanName) {
        var impl = registeredTypes[rawType];
        if (void 0 === impl) {
          throwBindingError(
            humanName + " has unknown type " + getTypeName(rawType)
          );
        }
        return impl;
      }
      function __emval_lookupTypes(argCount, argTypes) {
        var a = new Array(argCount);
        for (var i = 0; i < argCount; ++i) {
          a[i] = requireRegisteredType(
            HEAP32[(argTypes >> 2) + i],
            "parameter " + i
          );
        }
        return a;
      }
      function requireHandle(handle) {
        if (!handle) {
          throwBindingError("Cannot use deleted val. handle = " + handle);
        }
        return emval_handle_array[handle].value;
      }
      function __emval_call(handle, argCount, argTypes, argv) {
        handle = requireHandle(handle);
        var types = __emval_lookupTypes(argCount, argTypes);
        var args = new Array(argCount);
        for (var i = 0; i < argCount; ++i) {
          var type = types[i];
          args[i] = type["readValueFromPointer"](argv);
          argv += type["argPackAdvance"];
        }
        var rv = handle.apply(void 0, args);
        return __emval_register(rv);
      }
      function __emval_incref(handle) {
        if (handle > 4) {
          emval_handle_array[handle].refcount += 1;
        }
      }
      function __emval_new_array() {
        return __emval_register([]);
      }
      var emval_symbols = {};
      function getStringOrSymbol(address) {
        var symbol = emval_symbols[address];
        if (symbol === void 0) {
          return readLatin1String(address);
        } else {
          return symbol;
        }
      }
      function __emval_new_cstring(v) {
        return __emval_register(getStringOrSymbol(v));
      }
      function __emval_new_object() {
        return __emval_register({});
      }
      function __emval_set_property(handle, key2, value) {
        handle = requireHandle(handle);
        key2 = requireHandle(key2);
        value = requireHandle(value);
        handle[key2] = value;
      }
      function __emval_take_value(type, argv) {
        type = requireRegisteredType(type, "_emval_take_value");
        var v = type["readValueFromPointer"](argv);
        return __emval_register(v);
      }
      function _abort() {
        abort();
      }
      function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.copyWithin(dest, src, src + num);
      }
      function abortOnCannotGrowMemory(requestedSize) {
        abort(
          "Cannot enlarge memory arrays to size " +
            requestedSize +
            " bytes (OOM). Either (1) compile with  -s INITIAL_MEMORY=X  with X higher than the current value " +
            HEAP8.length +
            ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "
        );
      }
      function _emscripten_resize_heap(requestedSize) {
        requestedSize = requestedSize >>> 0;
        abortOnCannotGrowMemory(requestedSize);
      }
      var ENV = {};
      function getExecutableName() {
        return thisProgram || "./this.program";
      }
      function getEnvStrings() {
        if (!getEnvStrings.strings) {
          var lang =
            (
              (typeof navigator === "object" &&
                navigator.languages &&
                navigator.languages[0]) ||
              "C"
            ).replace("-", "_") + ".UTF-8";
          var env = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG: lang,
            _: getExecutableName(),
          };
          for (var x in ENV) {
            env[x] = ENV[x];
          }
          var strings = [];
          for (var x in env) {
            strings.push(x + "=" + env[x]);
          }
          getEnvStrings.strings = strings;
        }
        return getEnvStrings.strings;
      }
      var SYSCALLS = {
        mappings: {},
        buffers: [null, [], []],
        printChar: function (stream, curr) {
          var buffer2 = SYSCALLS.buffers[stream];
          assert(buffer2);
          if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer2, 0));
            buffer2.length = 0;
          } else {
            buffer2.push(curr);
          }
        },
        varargs: void 0,
        get: function () {
          assert(SYSCALLS.varargs != void 0);
          SYSCALLS.varargs += 4;
          var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
          return ret;
        },
        getStr: function (ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        },
        get64: function (low, high) {
          if (low >= 0) assert(high === 0);
          else assert(high === -1);
          return low;
        },
      };
      function _environ_get(__environ, environ_buf) {
        var bufSize = 0;
        getEnvStrings().forEach(function (string, i) {
          var ptr = environ_buf + bufSize;
          HEAP32[(__environ + i * 4) >> 2] = ptr;
          writeAsciiToMemory(string, ptr);
          bufSize += string.length + 1;
        });
        return 0;
      }
      function _environ_sizes_get(penviron_count, penviron_buf_size) {
        var strings = getEnvStrings();
        HEAP32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach(function (string) {
          bufSize += string.length + 1;
        });
        HEAP32[penviron_buf_size >> 2] = bufSize;
        return 0;
      }
      function _fd_close(fd) {
        abort(
          "it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM"
        );
        return 0;
      }
      function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        abort(
          "it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM"
        );
      }
      function _fd_write(fd, iov, iovcnt, pnum) {
        var num = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(iov + i * 8) >> 2];
          var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
          for (var j = 0; j < len; j++) {
            SYSCALLS.printChar(fd, HEAPU8[ptr + j]);
          }
          num += len;
        }
        HEAP32[pnum >> 2] = num;
        return 0;
      }
      function _pthread_rwlock_destroy() {
        return 0;
      }
      function _pthread_rwlock_init() {
        return 0;
      }
      function _pthread_rwlock_rdlock() {
        return 0;
      }
      function _pthread_rwlock_unlock() {
        return 0;
      }
      function _pthread_rwlock_wrlock() {
        return 0;
      }
      function _setTempRet0($i) {
        setTempRet0($i | 0);
      }
      function __isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      }
      function __arraySum(array, index) {
        var sum = 0;
        for (var i = 0; i <= index; sum += array[i++]) {}
        return sum;
      }
      var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var __MONTH_DAYS_REGULAR = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
      ];
      function __addDays(date, days) {
        var newDate = new Date(date.getTime());
        while (days > 0) {
          var leap = __isLeapYear(newDate.getFullYear());
          var currentMonth = newDate.getMonth();
          var daysInCurrentMonth = (
            leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR
          )[currentMonth];
          if (days > daysInCurrentMonth - newDate.getDate()) {
            days -= daysInCurrentMonth - newDate.getDate() + 1;
            newDate.setDate(1);
            if (currentMonth < 11) {
              newDate.setMonth(currentMonth + 1);
            } else {
              newDate.setMonth(0);
              newDate.setFullYear(newDate.getFullYear() + 1);
            }
          } else {
            newDate.setDate(newDate.getDate() + days);
            return newDate;
          }
        }
        return newDate;
      }
      function _strftime(s, maxsize, format, tm) {
        var tm_zone = HEAP32[(tm + 40) >> 2];
        var date = {
          tm_sec: HEAP32[tm >> 2],
          tm_min: HEAP32[(tm + 4) >> 2],
          tm_hour: HEAP32[(tm + 8) >> 2],
          tm_mday: HEAP32[(tm + 12) >> 2],
          tm_mon: HEAP32[(tm + 16) >> 2],
          tm_year: HEAP32[(tm + 20) >> 2],
          tm_wday: HEAP32[(tm + 24) >> 2],
          tm_yday: HEAP32[(tm + 28) >> 2],
          tm_isdst: HEAP32[(tm + 32) >> 2],
          tm_gmtoff: HEAP32[(tm + 36) >> 2],
          tm_zone: tm_zone ? UTF8ToString(tm_zone) : "",
        };
        var pattern = UTF8ToString(format);
        var EXPANSION_RULES_1 = {
          "%c": "%a %b %d %H:%M:%S %Y",
          // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
          "%D": "%m/%d/%y",
          // Equivalent to %m / %d / %y
          "%F": "%Y-%m-%d",
          // Equivalent to %Y - %m - %d
          "%h": "%b",
          // Equivalent to %b
          "%r": "%I:%M:%S %p",
          // Replaced by the time in a.m. and p.m. notation
          "%R": "%H:%M",
          // Replaced by the time in 24-hour notation
          "%T": "%H:%M:%S",
          // Replaced by the time
          "%x": "%m/%d/%y",
          // Replaced by the locale's appropriate date representation
          "%X": "%H:%M:%S",
          // Replaced by the locale's appropriate time representation
          // Modified Conversion Specifiers
          "%Ec": "%c",
          // Replaced by the locale's alternative appropriate date and time representation.
          "%EC": "%C",
          // Replaced by the name of the base year (period) in the locale's alternative representation.
          "%Ex": "%m/%d/%y",
          // Replaced by the locale's alternative date representation.
          "%EX": "%H:%M:%S",
          // Replaced by the locale's alternative time representation.
          "%Ey": "%y",
          // Replaced by the offset from %EC (year only) in the locale's alternative representation.
          "%EY": "%Y",
          // Replaced by the full alternative year representation.
          "%Od": "%d",
          // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading zeros if there is any alternative symbol for zero; otherwise, with leading <space> characters.
          "%Oe": "%e",
          // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading <space> characters.
          "%OH": "%H",
          // Replaced by the hour (24-hour clock) using the locale's alternative numeric symbols.
          "%OI": "%I",
          // Replaced by the hour (12-hour clock) using the locale's alternative numeric symbols.
          "%Om": "%m",
          // Replaced by the month using the locale's alternative numeric symbols.
          "%OM": "%M",
          // Replaced by the minutes using the locale's alternative numeric symbols.
          "%OS": "%S",
          // Replaced by the seconds using the locale's alternative numeric symbols.
          "%Ou": "%u",
          // Replaced by the weekday as a number in the locale's alternative representation (Monday=1).
          "%OU": "%U",
          // Replaced by the week number of the year (Sunday as the first day of the week, rules corresponding to %U ) using the locale's alternative numeric symbols.
          "%OV": "%V",
          // Replaced by the week number of the year (Monday as the first day of the week, rules corresponding to %V ) using the locale's alternative numeric symbols.
          "%Ow": "%w",
          // Replaced by the number of the weekday (Sunday=0) using the locale's alternative numeric symbols.
          "%OW": "%W",
          // Replaced by the week number of the year (Monday as the first day of the week) using the locale's alternative numeric symbols.
          "%Oy": "%y",
          // Replaced by the year (offset from %C ) using the locale's alternative numeric symbols.
        };
        for (var rule in EXPANSION_RULES_1) {
          pattern = pattern.replace(
            new RegExp(rule, "g"),
            EXPANSION_RULES_1[rule]
          );
        }
        var WEEKDAYS = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        var MONTHS = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        function leadingSomething(value, digits, character) {
          var str = typeof value === "number" ? value.toString() : value || "";
          while (str.length < digits) {
            str = character[0] + str;
          }
          return str;
        }
        function leadingNulls(value, digits) {
          return leadingSomething(value, digits, "0");
        }
        function compareByDay(date1, date2) {
          function sgn(value) {
            return value < 0 ? -1 : value > 0 ? 1 : 0;
          }
          var compare;
          if (
            (compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0
          ) {
            if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
              compare = sgn(date1.getDate() - date2.getDate());
            }
          }
          return compare;
        }
        function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0:
              return new Date(janFourth.getFullYear() - 1, 11, 29);
            case 1:
              return janFourth;
            case 2:
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3:
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4:
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5:
              return new Date(janFourth.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(janFourth.getFullYear() - 1, 11, 30);
          }
        }
        function getWeekBasedYear(date2) {
          var thisDate = __addDays(
            new Date(date2.tm_year + 1900, 0, 1),
            date2.tm_yday
          );
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear() + 1;
            } else {
              return thisDate.getFullYear();
            }
          } else {
            return thisDate.getFullYear() - 1;
          }
        }
        var EXPANSION_RULES_2 = {
          "%a": function (date2) {
            return WEEKDAYS[date2.tm_wday].substring(0, 3);
          },
          "%A": function (date2) {
            return WEEKDAYS[date2.tm_wday];
          },
          "%b": function (date2) {
            return MONTHS[date2.tm_mon].substring(0, 3);
          },
          "%B": function (date2) {
            return MONTHS[date2.tm_mon];
          },
          "%C": function (date2) {
            var year = date2.tm_year + 1900;
            return leadingNulls((year / 100) | 0, 2);
          },
          "%d": function (date2) {
            return leadingNulls(date2.tm_mday, 2);
          },
          "%e": function (date2) {
            return leadingSomething(date2.tm_mday, 2, " ");
          },
          "%g": function (date2) {
            return getWeekBasedYear(date2).toString().substring(2);
          },
          "%G": function (date2) {
            return getWeekBasedYear(date2);
          },
          "%H": function (date2) {
            return leadingNulls(date2.tm_hour, 2);
          },
          "%I": function (date2) {
            var twelveHour = date2.tm_hour;
            if (twelveHour == 0) twelveHour = 12;
            else if (twelveHour > 12) twelveHour -= 12;
            return leadingNulls(twelveHour, 2);
          },
          "%j": function (date2) {
            return leadingNulls(
              date2.tm_mday +
                __arraySum(
                  __isLeapYear(date2.tm_year + 1900)
                    ? __MONTH_DAYS_LEAP
                    : __MONTH_DAYS_REGULAR,
                  date2.tm_mon - 1
                ),
              3
            );
          },
          "%m": function (date2) {
            return leadingNulls(date2.tm_mon + 1, 2);
          },
          "%M": function (date2) {
            return leadingNulls(date2.tm_min, 2);
          },
          "%n": function () {
            return "\n";
          },
          "%p": function (date2) {
            if (date2.tm_hour >= 0 && date2.tm_hour < 12) {
              return "AM";
            } else {
              return "PM";
            }
          },
          "%S": function (date2) {
            return leadingNulls(date2.tm_sec, 2);
          },
          "%t": function () {
            return "	";
          },
          "%u": function (date2) {
            return date2.tm_wday || 7;
          },
          "%U": function (date2) {
            var janFirst = new Date(date2.tm_year + 1900, 0, 1);
            var firstSunday =
              janFirst.getDay() === 0
                ? janFirst
                : __addDays(janFirst, 7 - janFirst.getDay());
            var endDate = new Date(
              date2.tm_year + 1900,
              date2.tm_mon,
              date2.tm_mday
            );
            if (compareByDay(firstSunday, endDate) < 0) {
              var februaryFirstUntilEndMonth =
                __arraySum(
                  __isLeapYear(endDate.getFullYear())
                    ? __MONTH_DAYS_LEAP
                    : __MONTH_DAYS_REGULAR,
                  endDate.getMonth() - 1
                ) - 31;
              var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
              var days =
                firstSundayUntilEndJanuary +
                februaryFirstUntilEndMonth +
                endDate.getDate();
              return leadingNulls(Math.ceil(days / 7), 2);
            }
            return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
          },
          "%V": function (date2) {
            var janFourthThisYear = new Date(date2.tm_year + 1900, 0, 4);
            var janFourthNextYear = new Date(date2.tm_year + 1901, 0, 4);
            var firstWeekStartThisYear =
              getFirstWeekStartDate(janFourthThisYear);
            var firstWeekStartNextYear =
              getFirstWeekStartDate(janFourthNextYear);
            var endDate = __addDays(
              new Date(date2.tm_year + 1900, 0, 1),
              date2.tm_yday
            );
            if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
              return "53";
            }
            if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
              return "01";
            }
            var daysDifference;
            if (firstWeekStartThisYear.getFullYear() < date2.tm_year + 1900) {
              daysDifference =
                date2.tm_yday + 32 - firstWeekStartThisYear.getDate();
            } else {
              daysDifference =
                date2.tm_yday + 1 - firstWeekStartThisYear.getDate();
            }
            return leadingNulls(Math.ceil(daysDifference / 7), 2);
          },
          "%w": function (date2) {
            return date2.tm_wday;
          },
          "%W": function (date2) {
            var janFirst = new Date(date2.tm_year, 0, 1);
            var firstMonday =
              janFirst.getDay() === 1
                ? janFirst
                : __addDays(
                    janFirst,
                    janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1
                  );
            var endDate = new Date(
              date2.tm_year + 1900,
              date2.tm_mon,
              date2.tm_mday
            );
            if (compareByDay(firstMonday, endDate) < 0) {
              var februaryFirstUntilEndMonth =
                __arraySum(
                  __isLeapYear(endDate.getFullYear())
                    ? __MONTH_DAYS_LEAP
                    : __MONTH_DAYS_REGULAR,
                  endDate.getMonth() - 1
                ) - 31;
              var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
              var days =
                firstMondayUntilEndJanuary +
                februaryFirstUntilEndMonth +
                endDate.getDate();
              return leadingNulls(Math.ceil(days / 7), 2);
            }
            return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
          },
          "%y": function (date2) {
            return (date2.tm_year + 1900).toString().substring(2);
          },
          "%Y": function (date2) {
            return date2.tm_year + 1900;
          },
          "%z": function (date2) {
            var off = date2.tm_gmtoff;
            var ahead = off >= 0;
            off = Math.abs(off) / 60;
            off = (off / 60) * 100 + (off % 60);
            return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
          },
          "%Z": function (date2) {
            return date2.tm_zone;
          },
          "%%": function () {
            return "%";
          },
        };
        for (var rule in EXPANSION_RULES_2) {
          if (pattern.indexOf(rule) >= 0) {
            pattern = pattern.replace(
              new RegExp(rule, "g"),
              EXPANSION_RULES_2[rule](date)
            );
          }
        }
        var bytes = intArrayFromString(pattern, false);
        if (bytes.length > maxsize) {
          return 0;
        }
        writeArrayToMemory(bytes, s);
        return bytes.length - 1;
      }
      function _strftime_l(s, maxsize, format, tm) {
        return _strftime(s, maxsize, format, tm);
      }
      embind_init_charCodes();
      BindingError = Module["BindingError"] = extendError(
        Error,
        "BindingError"
      );
      InternalError = Module["InternalError"] = extendError(
        Error,
        "InternalError"
      );
      init_ClassHandle();
      init_RegisteredPointer();
      init_embind();
      UnboundTypeError = Module["UnboundTypeError"] = extendError(
        Error,
        "UnboundTypeError"
      );
      init_emval();
      function intArrayFromString(stringy, dontAddNull, length) {
        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(
          stringy,
          u8array,
          0,
          u8array.length
        );
        if (dontAddNull) u8array.length = numBytesWritten;
        return u8array;
      }
      __ATINIT__.push({
        func: function () {
          ___wasm_call_ctors();
        },
      });
      var asmLibraryArg = {
        __assert_fail: ___assert_fail,
        __cxa_allocate_exception: ___cxa_allocate_exception,
        __cxa_atexit: ___cxa_atexit,
        __cxa_throw: ___cxa_throw,
        _embind_register_bool: __embind_register_bool,
        _embind_register_class: __embind_register_class,
        _embind_register_class_constructor: __embind_register_class_constructor,
        _embind_register_class_function: __embind_register_class_function,
        _embind_register_emval: __embind_register_emval,
        _embind_register_float: __embind_register_float,
        _embind_register_integer: __embind_register_integer,
        _embind_register_memory_view: __embind_register_memory_view,
        _embind_register_smart_ptr: __embind_register_smart_ptr,
        _embind_register_std_string: __embind_register_std_string,
        _embind_register_std_wstring: __embind_register_std_wstring,
        _embind_register_void: __embind_register_void,
        _emval_call: __emval_call,
        _emval_decref: __emval_decref,
        _emval_incref: __emval_incref,
        _emval_new_array: __emval_new_array,
        _emval_new_cstring: __emval_new_cstring,
        _emval_new_object: __emval_new_object,
        _emval_set_property: __emval_set_property,
        _emval_take_value: __emval_take_value,
        abort: _abort,
        emscripten_memcpy_big: _emscripten_memcpy_big,
        emscripten_resize_heap: _emscripten_resize_heap,
        environ_get: _environ_get,
        environ_sizes_get: _environ_sizes_get,
        fd_close: _fd_close,
        fd_seek: _fd_seek,
        fd_write: _fd_write,
        memory: wasmMemory,
        pthread_rwlock_destroy: _pthread_rwlock_destroy,
        pthread_rwlock_init: _pthread_rwlock_init,
        pthread_rwlock_rdlock: _pthread_rwlock_rdlock,
        pthread_rwlock_unlock: _pthread_rwlock_unlock,
        pthread_rwlock_wrlock: _pthread_rwlock_wrlock,
        setTempRet0: _setTempRet0,
        strftime_l: _strftime_l,
      };
      var asm = createWasm();
      var ___wasm_call_ctors = (Module["___wasm_call_ctors"] =
        createExportWrapper("__wasm_call_ctors", asm));
      var _malloc = (Module["_malloc"] = createExportWrapper("malloc", asm));
      var ___errno_location = (Module["___errno_location"] =
        createExportWrapper("__errno_location", asm));
      var ___getTypeName = (Module["___getTypeName"] = createExportWrapper(
        "__getTypeName",
        asm
      ));
      var ___embind_register_native_and_builtin_types = (Module[
        "___embind_register_native_and_builtin_types"
      ] = createExportWrapper(
        "__embind_register_native_and_builtin_types",
        asm
      ));
      var _fflush = (Module["_fflush"] = createExportWrapper("fflush", asm));
      var stackSave = (Module["stackSave"] = createExportWrapper(
        "stackSave",
        asm
      ));
      var stackRestore = (Module["stackRestore"] = createExportWrapper(
        "stackRestore",
        asm
      ));
      var stackAlloc = (Module["stackAlloc"] = createExportWrapper(
        "stackAlloc",
        asm
      ));
      var _emscripten_stack_init = (Module["_emscripten_stack_init"] =
        asm["emscripten_stack_init"]);
      var _emscripten_stack_get_free = (Module["_emscripten_stack_get_free"] =
        asm["emscripten_stack_get_free"]);
      var _emscripten_stack_get_end = (Module["_emscripten_stack_get_end"] =
        asm["emscripten_stack_get_end"]);
      var _setThrew = (Module["_setThrew"] = createExportWrapper(
        "setThrew",
        asm
      ));
      var _free = (Module["_free"] = createExportWrapper("free", asm));
      var dynCall_viijii = (Module["dynCall_viijii"] = createExportWrapper(
        "dynCall_viijii",
        asm
      ));
      var dynCall_iiiij = (Module["dynCall_iiiij"] = createExportWrapper(
        "dynCall_iiiij",
        asm
      ));
      var dynCall_jiji = (Module["dynCall_jiji"] = createExportWrapper(
        "dynCall_jiji",
        asm
      ));
      var dynCall_iiiiij = (Module["dynCall_iiiiij"] = createExportWrapper(
        "dynCall_iiiiij",
        asm
      ));
      var dynCall_iiiiijj = (Module["dynCall_iiiiijj"] = createExportWrapper(
        "dynCall_iiiiijj",
        asm
      ));
      var dynCall_iiiiiijj = (Module["dynCall_iiiiiijj"] = createExportWrapper(
        "dynCall_iiiiiijj",
        asm
      ));
      if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromString"))
        Module["intArrayFromString"] = function () {
          abort(
            "'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "intArrayToString"))
        Module["intArrayToString"] = function () {
          abort(
            "'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ccall"))
        Module["ccall"] = function () {
          abort(
            "'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "cwrap"))
        Module["cwrap"] = function () {
          abort(
            "'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "setValue"))
        Module["setValue"] = function () {
          abort(
            "'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getValue"))
        Module["getValue"] = function () {
          abort(
            "'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "allocate"))
        Module["allocate"] = function () {
          abort(
            "'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString"))
        Module["UTF8ArrayToString"] = function () {
          abort(
            "'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF8ToString"))
        Module["UTF8ToString"] = function () {
          abort(
            "'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array"))
        Module["stringToUTF8Array"] = function () {
          abort(
            "'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8"))
        Module["stringToUTF8"] = function () {
          abort(
            "'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8"))
        Module["lengthBytesUTF8"] = function () {
          abort(
            "'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stackTrace"))
        Module["stackTrace"] = function () {
          abort(
            "'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun"))
        Module["addOnPreRun"] = function () {
          abort(
            "'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnInit"))
        Module["addOnInit"] = function () {
          abort(
            "'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain"))
        Module["addOnPreMain"] = function () {
          abort(
            "'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnExit"))
        Module["addOnExit"] = function () {
          abort(
            "'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun"))
        Module["addOnPostRun"] = function () {
          abort(
            "'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeStringToMemory"))
        Module["writeStringToMemory"] = function () {
          abort(
            "'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory"))
        Module["writeArrayToMemory"] = function () {
          abort(
            "'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory"))
        Module["writeAsciiToMemory"] = function () {
          abort(
            "'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "addRunDependency"))
        Module["addRunDependency"] = function () {
          abort(
            "'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "removeRunDependency"))
        Module["removeRunDependency"] = function () {
          abort(
            "'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createFolder"))
        Module["FS_createFolder"] = function () {
          abort(
            "'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createPath"))
        Module["FS_createPath"] = function () {
          abort(
            "'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createDataFile"))
        Module["FS_createDataFile"] = function () {
          abort(
            "'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createPreloadedFile"))
        Module["FS_createPreloadedFile"] = function () {
          abort(
            "'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createLazyFile"))
        Module["FS_createLazyFile"] = function () {
          abort(
            "'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createLink"))
        Module["FS_createLink"] = function () {
          abort(
            "'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createDevice"))
        Module["FS_createDevice"] = function () {
          abort(
            "'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_unlink"))
        Module["FS_unlink"] = function () {
          abort(
            "'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getLEB"))
        Module["getLEB"] = function () {
          abort(
            "'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables"))
        Module["getFunctionTables"] = function () {
          abort(
            "'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables"))
        Module["alignFunctionTables"] = function () {
          abort(
            "'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions"))
        Module["registerFunctions"] = function () {
          abort(
            "'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "addFunction"))
        Module["addFunction"] = function () {
          abort(
            "'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "removeFunction"))
        Module["removeFunction"] = function () {
          abort(
            "'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper"))
        Module["getFuncWrapper"] = function () {
          abort(
            "'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint"))
        Module["prettyPrint"] = function () {
          abort(
            "'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "makeBigInt"))
        Module["makeBigInt"] = function () {
          abort(
            "'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCall"))
        Module["dynCall"] = function () {
          abort(
            "'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting"))
        Module["getCompilerSetting"] = function () {
          abort(
            "'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "print"))
        Module["print"] = function () {
          abort(
            "'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "printErr"))
        Module["printErr"] = function () {
          abort(
            "'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0"))
        Module["getTempRet0"] = function () {
          abort(
            "'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0"))
        Module["setTempRet0"] = function () {
          abort(
            "'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "callMain"))
        Module["callMain"] = function () {
          abort(
            "'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "abort"))
        Module["abort"] = function () {
          abort(
            "'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8"))
        Module["stringToNewUTF8"] = function () {
          abort(
            "'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "setFileTime"))
        Module["setFileTime"] = function () {
          abort(
            "'setFileTime' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "abortOnCannotGrowMemory"))
        Module["abortOnCannotGrowMemory"] = function () {
          abort(
            "'abortOnCannotGrowMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer"))
        Module["emscripten_realloc_buffer"] = function () {
          abort(
            "'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ENV"))
        Module["ENV"] = function () {
          abort(
            "'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES"))
        Module["ERRNO_CODES"] = function () {
          abort(
            "'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES"))
        Module["ERRNO_MESSAGES"] = function () {
          abort(
            "'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "setErrNo"))
        Module["setErrNo"] = function () {
          abort(
            "'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "DNS"))
        Module["DNS"] = function () {
          abort(
            "'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getHostByName"))
        Module["getHostByName"] = function () {
          abort(
            "'getHostByName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES"))
        Module["GAI_ERRNO_MESSAGES"] = function () {
          abort(
            "'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "Protocols"))
        Module["Protocols"] = function () {
          abort(
            "'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "Sockets"))
        Module["Sockets"] = function () {
          abort(
            "'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getRandomDevice"))
        Module["getRandomDevice"] = function () {
          abort(
            "'getRandomDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "traverseStack"))
        Module["traverseStack"] = function () {
          abort(
            "'traverseStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE"))
        Module["UNWIND_CACHE"] = function () {
          abort(
            "'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "withBuiltinMalloc"))
        Module["withBuiltinMalloc"] = function () {
          abort(
            "'withBuiltinMalloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgsArray"))
        Module["readAsmConstArgsArray"] = function () {
          abort(
            "'readAsmConstArgsArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs"))
        Module["readAsmConstArgs"] = function () {
          abort(
            "'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "mainThreadEM_ASM"))
        Module["mainThreadEM_ASM"] = function () {
          abort(
            "'mainThreadEM_ASM' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "jstoi_q"))
        Module["jstoi_q"] = function () {
          abort(
            "'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "jstoi_s"))
        Module["jstoi_s"] = function () {
          abort(
            "'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getExecutableName"))
        Module["getExecutableName"] = function () {
          abort(
            "'getExecutableName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "listenOnce"))
        Module["listenOnce"] = function () {
          abort(
            "'listenOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "autoResumeAudioContext"))
        Module["autoResumeAudioContext"] = function () {
          abort(
            "'autoResumeAudioContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCallLegacy"))
        Module["dynCallLegacy"] = function () {
          abort(
            "'dynCallLegacy' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getDynCaller"))
        Module["getDynCaller"] = function () {
          abort(
            "'getDynCaller' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCall"))
        Module["dynCall"] = function () {
          abort(
            "'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "callRuntimeCallbacks"))
        Module["callRuntimeCallbacks"] = function () {
          abort(
            "'callRuntimeCallbacks' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "abortStackOverflow"))
        Module["abortStackOverflow"] = function () {
          abort(
            "'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "reallyNegative"))
        Module["reallyNegative"] = function () {
          abort(
            "'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "unSign"))
        Module["unSign"] = function () {
          abort(
            "'unSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "reSign"))
        Module["reSign"] = function () {
          abort(
            "'reSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "formatString"))
        Module["formatString"] = function () {
          abort(
            "'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "PATH"))
        Module["PATH"] = function () {
          abort(
            "'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "PATH_FS"))
        Module["PATH_FS"] = function () {
          abort(
            "'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "SYSCALLS"))
        Module["SYSCALLS"] = function () {
          abort(
            "'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "syscallMmap2"))
        Module["syscallMmap2"] = function () {
          abort(
            "'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "syscallMunmap"))
        Module["syscallMunmap"] = function () {
          abort(
            "'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "JSEvents"))
        Module["JSEvents"] = function () {
          abort(
            "'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets"))
        Module["specialHTMLTargets"] = function () {
          abort(
            "'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "maybeCStringToJsString"))
        Module["maybeCStringToJsString"] = function () {
          abort(
            "'maybeCStringToJsString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "findEventTarget"))
        Module["findEventTarget"] = function () {
          abort(
            "'findEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "findCanvasEventTarget"))
        Module["findCanvasEventTarget"] = function () {
          abort(
            "'findCanvasEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "polyfillSetImmediate"))
        Module["polyfillSetImmediate"] = function () {
          abort(
            "'polyfillSetImmediate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "demangle"))
        Module["demangle"] = function () {
          abort(
            "'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "demangleAll"))
        Module["demangleAll"] = function () {
          abort(
            "'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "jsStackTrace"))
        Module["jsStackTrace"] = function () {
          abort(
            "'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stackTrace"))
        Module["stackTrace"] = function () {
          abort(
            "'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getEnvStrings"))
        Module["getEnvStrings"] = function () {
          abort(
            "'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "checkWasiClock"))
        Module["checkWasiClock"] = function () {
          abort(
            "'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "flush_NO_FILESYSTEM"))
        Module["flush_NO_FILESYSTEM"] = function () {
          abort(
            "'flush_NO_FILESYSTEM' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64"))
        Module["writeI53ToI64"] = function () {
          abort(
            "'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped"))
        Module["writeI53ToI64Clamped"] = function () {
          abort(
            "'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling"))
        Module["writeI53ToI64Signaling"] = function () {
          abort(
            "'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped"))
        Module["writeI53ToU64Clamped"] = function () {
          abort(
            "'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling"))
        Module["writeI53ToU64Signaling"] = function () {
          abort(
            "'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "readI53FromI64"))
        Module["readI53FromI64"] = function () {
          abort(
            "'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "readI53FromU64"))
        Module["readI53FromU64"] = function () {
          abort(
            "'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53"))
        Module["convertI32PairToI53"] = function () {
          abort(
            "'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53"))
        Module["convertU32PairToI53"] = function () {
          abort(
            "'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "uncaughtExceptionCount"))
        Module["uncaughtExceptionCount"] = function () {
          abort(
            "'uncaughtExceptionCount' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "exceptionLast"))
        Module["exceptionLast"] = function () {
          abort(
            "'exceptionLast' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "exceptionCaught"))
        Module["exceptionCaught"] = function () {
          abort(
            "'exceptionCaught' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfoAttrs"))
        Module["ExceptionInfoAttrs"] = function () {
          abort(
            "'ExceptionInfoAttrs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfo"))
        Module["ExceptionInfo"] = function () {
          abort(
            "'ExceptionInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "CatchInfo"))
        Module["CatchInfo"] = function () {
          abort(
            "'CatchInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "exception_addRef"))
        Module["exception_addRef"] = function () {
          abort(
            "'exception_addRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "exception_decRef"))
        Module["exception_decRef"] = function () {
          abort(
            "'exception_decRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "Browser"))
        Module["Browser"] = function () {
          abort(
            "'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "funcWrappers"))
        Module["funcWrappers"] = function () {
          abort(
            "'funcWrappers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper"))
        Module["getFuncWrapper"] = function () {
          abort(
            "'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "setMainLoop"))
        Module["setMainLoop"] = function () {
          abort(
            "'setMainLoop' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "FS"))
        Module["FS"] = function () {
          abort(
            "'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "mmapAlloc"))
        Module["mmapAlloc"] = function () {
          abort(
            "'mmapAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "MEMFS"))
        Module["MEMFS"] = function () {
          abort(
            "'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "TTY"))
        Module["TTY"] = function () {
          abort(
            "'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "PIPEFS"))
        Module["PIPEFS"] = function () {
          abort(
            "'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "SOCKFS"))
        Module["SOCKFS"] = function () {
          abort(
            "'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "tempFixedLengthArray"))
        Module["tempFixedLengthArray"] = function () {
          abort(
            "'tempFixedLengthArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "miniTempWebGLFloatBuffers"))
        Module["miniTempWebGLFloatBuffers"] = function () {
          abort(
            "'miniTempWebGLFloatBuffers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "heapObjectForWebGLType"))
        Module["heapObjectForWebGLType"] = function () {
          abort(
            "'heapObjectForWebGLType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(Module, "heapAccessShiftForWebGLHeap")
      )
        Module["heapAccessShiftForWebGLHeap"] = function () {
          abort(
            "'heapAccessShiftForWebGLHeap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "GL"))
        Module["GL"] = function () {
          abort(
            "'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet"))
        Module["emscriptenWebGLGet"] = function () {
          abort(
            "'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(
          Module,
          "computeUnpackAlignedImageSize"
        )
      )
        Module["computeUnpackAlignedImageSize"] = function () {
          abort(
            "'computeUnpackAlignedImageSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(
          Module,
          "emscriptenWebGLGetTexPixelData"
        )
      )
        Module["emscriptenWebGLGetTexPixelData"] = function () {
          abort(
            "'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform"))
        Module["emscriptenWebGLGetUniform"] = function () {
          abort(
            "'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(
          Module,
          "emscriptenWebGLGetVertexAttrib"
        )
      )
        Module["emscriptenWebGLGetVertexAttrib"] = function () {
          abort(
            "'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "writeGLArray"))
        Module["writeGLArray"] = function () {
          abort(
            "'writeGLArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "AL"))
        Module["AL"] = function () {
          abort(
            "'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_unicode"))
        Module["SDL_unicode"] = function () {
          abort(
            "'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext"))
        Module["SDL_ttfContext"] = function () {
          abort(
            "'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_audio"))
        Module["SDL_audio"] = function () {
          abort(
            "'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL"))
        Module["SDL"] = function () {
          abort(
            "'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_gfx"))
        Module["SDL_gfx"] = function () {
          abort(
            "'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "GLUT"))
        Module["GLUT"] = function () {
          abort(
            "'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "EGL"))
        Module["EGL"] = function () {
          abort(
            "'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "GLFW_Window"))
        Module["GLFW_Window"] = function () {
          abort(
            "'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "GLFW"))
        Module["GLFW"] = function () {
          abort(
            "'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "GLEW"))
        Module["GLEW"] = function () {
          abort(
            "'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "IDBStore"))
        Module["IDBStore"] = function () {
          abort(
            "'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError"))
        Module["runAndAbortIfError"] = function () {
          abort(
            "'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_handle_array"))
        Module["emval_handle_array"] = function () {
          abort(
            "'emval_handle_array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_free_list"))
        Module["emval_free_list"] = function () {
          abort(
            "'emval_free_list' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_symbols"))
        Module["emval_symbols"] = function () {
          abort(
            "'emval_symbols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "init_emval"))
        Module["init_emval"] = function () {
          abort(
            "'init_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "count_emval_handles"))
        Module["count_emval_handles"] = function () {
          abort(
            "'count_emval_handles' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "get_first_emval"))
        Module["get_first_emval"] = function () {
          abort(
            "'get_first_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getStringOrSymbol"))
        Module["getStringOrSymbol"] = function () {
          abort(
            "'getStringOrSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "requireHandle"))
        Module["requireHandle"] = function () {
          abort(
            "'requireHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_newers"))
        Module["emval_newers"] = function () {
          abort(
            "'emval_newers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "craftEmvalAllocator"))
        Module["craftEmvalAllocator"] = function () {
          abort(
            "'craftEmvalAllocator' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_get_global"))
        Module["emval_get_global"] = function () {
          abort(
            "'emval_get_global' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_methodCallers"))
        Module["emval_methodCallers"] = function () {
          abort(
            "'emval_methodCallers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "InternalError"))
        Module["InternalError"] = function () {
          abort(
            "'InternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "BindingError"))
        Module["BindingError"] = function () {
          abort(
            "'BindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "UnboundTypeError"))
        Module["UnboundTypeError"] = function () {
          abort(
            "'UnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "PureVirtualError"))
        Module["PureVirtualError"] = function () {
          abort(
            "'PureVirtualError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "init_embind"))
        Module["init_embind"] = function () {
          abort(
            "'init_embind' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "throwInternalError"))
        Module["throwInternalError"] = function () {
          abort(
            "'throwInternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "throwBindingError"))
        Module["throwBindingError"] = function () {
          abort(
            "'throwBindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "throwUnboundTypeError"))
        Module["throwUnboundTypeError"] = function () {
          abort(
            "'throwUnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ensureOverloadTable"))
        Module["ensureOverloadTable"] = function () {
          abort(
            "'ensureOverloadTable' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "exposePublicSymbol"))
        Module["exposePublicSymbol"] = function () {
          abort(
            "'exposePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "replacePublicSymbol"))
        Module["replacePublicSymbol"] = function () {
          abort(
            "'replacePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "extendError"))
        Module["extendError"] = function () {
          abort(
            "'extendError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "createNamedFunction"))
        Module["createNamedFunction"] = function () {
          abort(
            "'createNamedFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "registeredInstances"))
        Module["registeredInstances"] = function () {
          abort(
            "'registeredInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getBasestPointer"))
        Module["getBasestPointer"] = function () {
          abort(
            "'getBasestPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "registerInheritedInstance"))
        Module["registerInheritedInstance"] = function () {
          abort(
            "'registerInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(Module, "unregisterInheritedInstance")
      )
        Module["unregisterInheritedInstance"] = function () {
          abort(
            "'unregisterInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getInheritedInstance"))
        Module["getInheritedInstance"] = function () {
          abort(
            "'getInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getInheritedInstanceCount"))
        Module["getInheritedInstanceCount"] = function () {
          abort(
            "'getInheritedInstanceCount' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getLiveInheritedInstances"))
        Module["getLiveInheritedInstances"] = function () {
          abort(
            "'getLiveInheritedInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "registeredTypes"))
        Module["registeredTypes"] = function () {
          abort(
            "'registeredTypes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "awaitingDependencies"))
        Module["awaitingDependencies"] = function () {
          abort(
            "'awaitingDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "typeDependencies"))
        Module["typeDependencies"] = function () {
          abort(
            "'typeDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "registeredPointers"))
        Module["registeredPointers"] = function () {
          abort(
            "'registeredPointers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "registerType"))
        Module["registerType"] = function () {
          abort(
            "'registerType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(
          Module,
          "whenDependentTypesAreResolved"
        )
      )
        Module["whenDependentTypesAreResolved"] = function () {
          abort(
            "'whenDependentTypesAreResolved' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "embind_charCodes"))
        Module["embind_charCodes"] = function () {
          abort(
            "'embind_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "embind_init_charCodes"))
        Module["embind_init_charCodes"] = function () {
          abort(
            "'embind_init_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "readLatin1String"))
        Module["readLatin1String"] = function () {
          abort(
            "'readLatin1String' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getTypeName"))
        Module["getTypeName"] = function () {
          abort(
            "'getTypeName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "heap32VectorToArray"))
        Module["heap32VectorToArray"] = function () {
          abort(
            "'heap32VectorToArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "requireRegisteredType"))
        Module["requireRegisteredType"] = function () {
          abort(
            "'requireRegisteredType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "getShiftFromSize"))
        Module["getShiftFromSize"] = function () {
          abort(
            "'getShiftFromSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(Module, "integerReadValueFromPointer")
      )
        Module["integerReadValueFromPointer"] = function () {
          abort(
            "'integerReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "enumReadValueFromPointer"))
        Module["enumReadValueFromPointer"] = function () {
          abort(
            "'enumReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "floatReadValueFromPointer"))
        Module["floatReadValueFromPointer"] = function () {
          abort(
            "'floatReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(Module, "simpleReadValueFromPointer")
      )
        Module["simpleReadValueFromPointer"] = function () {
          abort(
            "'simpleReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "runDestructors"))
        Module["runDestructors"] = function () {
          abort(
            "'runDestructors' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "new_"))
        Module["new_"] = function () {
          abort(
            "'new_' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "craftInvokerFunction"))
        Module["craftInvokerFunction"] = function () {
          abort(
            "'craftInvokerFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "embind__requireFunction"))
        Module["embind__requireFunction"] = function () {
          abort(
            "'embind__requireFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "tupleRegistrations"))
        Module["tupleRegistrations"] = function () {
          abort(
            "'tupleRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "structRegistrations"))
        Module["structRegistrations"] = function () {
          abort(
            "'structRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "genericPointerToWireType"))
        Module["genericPointerToWireType"] = function () {
          abort(
            "'genericPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(
          Module,
          "constNoSmartPtrRawPointerToWireType"
        )
      )
        Module["constNoSmartPtrRawPointerToWireType"] = function () {
          abort(
            "'constNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(
          Module,
          "nonConstNoSmartPtrRawPointerToWireType"
        )
      )
        Module["nonConstNoSmartPtrRawPointerToWireType"] = function () {
          abort(
            "'nonConstNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "init_RegisteredPointer"))
        Module["init_RegisteredPointer"] = function () {
          abort(
            "'init_RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer"))
        Module["RegisteredPointer"] = function () {
          abort(
            "'RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_getPointee")
      )
        Module["RegisteredPointer_getPointee"] = function () {
          abort(
            "'RegisteredPointer_getPointee' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_destructor")
      )
        Module["RegisteredPointer_destructor"] = function () {
          abort(
            "'RegisteredPointer_destructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(
          Module,
          "RegisteredPointer_deleteObject"
        )
      )
        Module["RegisteredPointer_deleteObject"] = function () {
          abort(
            "'RegisteredPointer_deleteObject' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(
          Module,
          "RegisteredPointer_fromWireType"
        )
      )
        Module["RegisteredPointer_fromWireType"] = function () {
          abort(
            "'RegisteredPointer_fromWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "runDestructor"))
        Module["runDestructor"] = function () {
          abort(
            "'runDestructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "releaseClassHandle"))
        Module["releaseClassHandle"] = function () {
          abort(
            "'releaseClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "finalizationGroup"))
        Module["finalizationGroup"] = function () {
          abort(
            "'finalizationGroup' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "detachFinalizer_deps"))
        Module["detachFinalizer_deps"] = function () {
          abort(
            "'detachFinalizer_deps' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "detachFinalizer"))
        Module["detachFinalizer"] = function () {
          abort(
            "'detachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "attachFinalizer"))
        Module["attachFinalizer"] = function () {
          abort(
            "'attachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "makeClassHandle"))
        Module["makeClassHandle"] = function () {
          abort(
            "'makeClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "init_ClassHandle"))
        Module["init_ClassHandle"] = function () {
          abort(
            "'init_ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle"))
        Module["ClassHandle"] = function () {
          abort(
            "'ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_isAliasOf"))
        Module["ClassHandle_isAliasOf"] = function () {
          abort(
            "'ClassHandle_isAliasOf' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(Module, "throwInstanceAlreadyDeleted")
      )
        Module["throwInstanceAlreadyDeleted"] = function () {
          abort(
            "'throwInstanceAlreadyDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_clone"))
        Module["ClassHandle_clone"] = function () {
          abort(
            "'ClassHandle_clone' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_delete"))
        Module["ClassHandle_delete"] = function () {
          abort(
            "'ClassHandle_delete' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "deletionQueue"))
        Module["deletionQueue"] = function () {
          abort(
            "'deletionQueue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_isDeleted"))
        Module["ClassHandle_isDeleted"] = function () {
          abort(
            "'ClassHandle_isDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_deleteLater"))
        Module["ClassHandle_deleteLater"] = function () {
          abort(
            "'ClassHandle_deleteLater' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "flushPendingDeletes"))
        Module["flushPendingDeletes"] = function () {
          abort(
            "'flushPendingDeletes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "delayFunction"))
        Module["delayFunction"] = function () {
          abort(
            "'delayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "setDelayFunction"))
        Module["setDelayFunction"] = function () {
          abort(
            "'setDelayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "RegisteredClass"))
        Module["RegisteredClass"] = function () {
          abort(
            "'RegisteredClass' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (
        !Object.getOwnPropertyDescriptor(Module, "shallowCopyInternalPointer")
      )
        Module["shallowCopyInternalPointer"] = function () {
          abort(
            "'shallowCopyInternalPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "downcastPointer"))
        Module["downcastPointer"] = function () {
          abort(
            "'downcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "upcastPointer"))
        Module["upcastPointer"] = function () {
          abort(
            "'upcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "validateThis"))
        Module["validateThis"] = function () {
          abort(
            "'validateThis' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "char_0"))
        Module["char_0"] = function () {
          abort(
            "'char_0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "char_9"))
        Module["char_9"] = function () {
          abort(
            "'char_9' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "makeLegalFunctionName"))
        Module["makeLegalFunctionName"] = function () {
          abort(
            "'makeLegalFunctionName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "warnOnce"))
        Module["warnOnce"] = function () {
          abort(
            "'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stackSave"))
        Module["stackSave"] = function () {
          abort(
            "'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stackRestore"))
        Module["stackRestore"] = function () {
          abort(
            "'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc"))
        Module["stackAlloc"] = function () {
          abort(
            "'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "AsciiToString"))
        Module["AsciiToString"] = function () {
          abort(
            "'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii"))
        Module["stringToAscii"] = function () {
          abort(
            "'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF16ToString"))
        Module["UTF16ToString"] = function () {
          abort(
            "'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF16"))
        Module["stringToUTF16"] = function () {
          abort(
            "'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16"))
        Module["lengthBytesUTF16"] = function () {
          abort(
            "'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF32ToString"))
        Module["UTF32ToString"] = function () {
          abort(
            "'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF32"))
        Module["stringToUTF32"] = function () {
          abort(
            "'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32"))
        Module["lengthBytesUTF32"] = function () {
          abort(
            "'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8"))
        Module["allocateUTF8"] = function () {
          abort(
            "'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack"))
        Module["allocateUTF8OnStack"] = function () {
          abort(
            "'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
          );
        };
      Module["writeStackCookie"] = writeStackCookie;
      Module["checkStackCookie"] = checkStackCookie;
      if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL"))
        Object.defineProperty(Module, "ALLOC_NORMAL", {
          configurable: true,
          get: function () {
            abort(
              "'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
            );
          },
        });
      if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK"))
        Object.defineProperty(Module, "ALLOC_STACK", {
          configurable: true,
          get: function () {
            abort(
              "'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
            );
          },
        });
      var calledRun;
      dependenciesFulfilled = function runCaller() {
        if (!calledRun) run();
        if (!calledRun) dependenciesFulfilled = runCaller;
      };
      function run(args) {
        args = args || arguments_;
        if (runDependencies > 0) {
          return;
        }
        _emscripten_stack_init();
        writeStackCookie();
        preRun();
        if (runDependencies > 0) return;
        function doRun() {
          if (calledRun) return;
          calledRun = true;
          Module["calledRun"] = true;
          if (ABORT) return;
          initRuntime();
          preMain();
          if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
          assert(
            !Module["_main"],
            'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'
          );
          postRun();
        }
        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(function () {
            setTimeout(function () {
              Module["setStatus"]("");
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
        checkStackCookie();
      }
      Module["run"] = run;
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function")
          Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      noExitRuntime = true;
      run();
    },
  });

  // node_modules/re2-wasm/build/src/re2.js
  var require_re22 = __commonJS({
    "node_modules/re2-wasm/build/src/re2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RE2 = void 0;
      var re2_1 = require_re2();
      var ALPHA_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var HEX = "0123456789ABCDEF";
      function isHexadecimal(char) {
        return HEX.indexOf(char.toUpperCase()) !== -1;
      }
      function translateRegExp(pattern, multiline) {
        const result = [];
        if (pattern === "") {
          return "(?:)";
        } else if (multiline) {
          result.push("(?m)");
        }
        for (let i = 0; i < pattern.length; ) {
          if (pattern[i] === "\\") {
            if (i + 1 < pattern.length) {
              switch (pattern[i + 1]) {
                case "\\":
                  result.push("\\\\");
                  i += 2;
                  break;
                case "c":
                  if (i + 2 < pattern.length) {
                    const alphaIndex = ALPHA_UPPER.indexOf(pattern[i + 2]) + 1;
                    if (alphaIndex >= 0) {
                      result.push(
                        "\\x",
                        HEX[Math.floor(alphaIndex / 16)],
                        HEX[alphaIndex % 16]
                      );
                      i += 3;
                      break;
                    }
                  }
                  result.push("\\c");
                  i += 2;
                  break;
                case "u":
                  if (i + 2 < pattern.length) {
                    const ch2 = pattern[i + 2];
                    if (isHexadecimal(ch2)) {
                      result.push("\\x{");
                      result.push(ch2);
                      i += 3;
                      for (
                        let j = 0;
                        j < 3 &&
                        i < pattern.length &&
                        isHexadecimal(pattern[i]);
                        i++, j++
                      ) {
                        result.push(pattern[i]);
                      }
                      result.push("}");
                      break;
                    } else if (ch2 === "{") {
                      result.push("\\x");
                      i += 2;
                      break;
                    }
                  }
                  result.push("\\u");
                  i += 2;
                  break;
                default:
                  result.push("\\", pattern[i + 1]);
                  i += 2;
              }
              continue;
            }
          } else if (pattern[i] === "/") {
            result.push("\\/");
            i += 1;
            continue;
          } else if (pattern.substring(i, i + 3) === "(?<") {
            if (pattern[i + 3] !== "=" && pattern[i + 3] !== "!") {
              result.push("(?P<");
              i += 3;
              continue;
            }
          }
          result.push(pattern[i]);
          i += 1;
        }
        return result.join("");
      }
      function escapeRegExp(pattern) {
        return pattern.replace(/(^|[^\\])((?:\\\\)*)\//g, "$1$2\\/");
      }
      var RE210 = class _RE2 {
        constructor(pattern, flags) {
          this._global = false;
          this._ignoreCase = false;
          this._multiline = false;
          this._dotAll = false;
          this._unicode = false;
          this._sticky = false;
          this.lastIndex = 0;
          this.pattern = "(?:)";
          this.groupNames = {};
          this.namedGroups = {};
          if (typeof pattern !== "string") {
            if (pattern instanceof RegExp || pattern instanceof _RE2) {
              flags =
                flags !== null && flags !== void 0 ? flags : pattern.flags;
              pattern = pattern.source;
            } else {
              if (pattern === void 0) {
                pattern = "(?:)";
              } else {
                pattern = pattern + "";
              }
            }
          }
          if (pattern === "") {
            pattern = "(?:)";
          }
          pattern = escapeRegExp(pattern);
          flags = flags !== null && flags !== void 0 ? flags : "";
          for (const flag of flags) {
            switch (flag) {
              case "g":
                this._global = true;
                break;
              case "i":
                this._ignoreCase = true;
                break;
              case "m":
                this._multiline = true;
                break;
              case "s":
                this._dotAll = true;
                break;
              case "u":
                this._unicode = true;
                break;
              case "y":
                this._sticky = true;
                break;
            }
          }
          if (!this._unicode) {
            throw new Error(
              'RE2 only works in unicode mode. The "u" flag must be passed when constructing a RE2 instance'
            );
          }
          this.pattern = pattern;
          this.wrapper = new re2_1.WrappedRE2(
            translateRegExp(pattern, this._multiline),
            this._ignoreCase,
            this._multiline,
            this._dotAll
          );
          if (!this.wrapper.ok()) {
            throw new SyntaxError(
              `Invalid regular expression: /${pattern}/${flags}: ${this.wrapper.error()}`
            );
          }
          const groupNames = this.wrapper.capturingGroupNames();
          const groupNumbers = groupNames.keys();
          for (let i = 0; i < groupNumbers.size(); i++) {
            const num = groupNumbers.get(i);
            const name = groupNames.get(num);
            if (name in this.namedGroups) {
              throw new SyntaxError(
                `Invalid regular expression: /${pattern}/${flags}: Duplicate capture group name`
              );
            }
            this.groupNames[num] = name;
            this.namedGroups[name] = num;
          }
        }
        get source() {
          return this.pattern;
        }
        get internalSource() {
          return this.wrapper.pattern();
        }
        get flags() {
          return (
            (this._global ? "g" : "") +
            (this._ignoreCase ? "i" : "") +
            (this._multiline ? "m" : "") +
            (this._dotAll ? "s" : "") +
            (this._unicode ? "u" : "") +
            (this._sticky ? "y" : "")
          );
        }
        get global() {
          return this._global;
        }
        get ignoreCase() {
          return this._ignoreCase;
        }
        get multiline() {
          return this._multiline;
        }
        get dotAll() {
          return this._dotAll;
        }
        get unicode() {
          return this._unicode;
        }
        get sticky() {
          return this._sticky;
        }
        toString() {
          return `/${this.pattern}/${this.flags}`;
        }
        getMaybeStickyIndex() {
          if (this._global || this._sticky) {
            return this.lastIndex;
          } else {
            return 0;
          }
        }
        isMatchSuccessful(match, searchStart) {
          return (
            match.index === searchStart || (!this._sticky && match.index >= 0)
          );
        }
        maybeUpdateLastIndex(match, start) {
          if (this._global || this._sticky) {
            if (this.isMatchSuccessful(match, start)) {
              this.lastIndex = match.index + match.match.length;
            } else {
              this.lastIndex = 0;
            }
          }
        }
        getNamedGroups(match) {
          const groups = {};
          for (const [groupName, groupNum] of Object.entries(
            this.namedGroups
          )) {
            if (match.groups[groupNum - 1] !== void 0) {
              groups[groupName] = match.groups[groupNum - 1];
            }
          }
          return groups;
        }
        exec(input) {
          if (typeof input !== "string") {
            input = input + "";
          }
          const startIndex = this.getMaybeStickyIndex();
          const match = this.wrapper.match(input, startIndex, true);
          this.maybeUpdateLastIndex(match, startIndex);
          if (!this.isMatchSuccessful(match, startIndex)) {
            return null;
          }
          const result = [match.match, ...match.groups];
          result.index = match.index;
          result.input = input;
          const groups = this.getNamedGroups(match);
          if (Object.keys(groups).length > 0) {
            result.groups = groups;
          }
          return result;
        }
        test(input) {
          if (typeof input !== "string") {
            input = input + "";
          }
          const startIndex = this.getMaybeStickyIndex();
          const match = this.wrapper.match(
            input,
            this.getMaybeStickyIndex(),
            false
          );
          this.maybeUpdateLastIndex(match, startIndex);
          return this.isMatchSuccessful(match, startIndex);
        }
        compile() {
          throw new Error(
            "Deprecated RegExp method compile is not implemented in RE2."
          );
        }
        [Symbol.match](input) {
          if (typeof input !== "string") {
            input = input + "";
          }
          if (this._global) {
            const result = [];
            let nextIndex = 0;
            let success;
            do {
              const match = this.wrapper.match(input, nextIndex, false);
              success =
                match.index === nextIndex ||
                (!this._sticky && match.index >= 0);
              if (success) {
                result.push(match.match);
                nextIndex = match.index + match.match.length;
              }
            } while (success);
            if (result.length === 0) {
              return null;
            } else {
              return result;
            }
          } else {
            const startIndex = this.getMaybeStickyIndex();
            const match = this.wrapper.match(input, startIndex, true);
            this.maybeUpdateLastIndex(match, startIndex);
            if (!this.isMatchSuccessful(match, startIndex)) {
              return null;
            }
            const result = [match.match, ...match.groups];
            result.index = match.index;
            result.input = input;
            const groups = this.getNamedGroups(match);
            if (Object.keys(groups).length > 0) {
              result.groups = groups;
            }
            return result;
          }
        }
        match(input) {
          return this[Symbol.match](input);
        }
        /**
         * Outputs the replacement for the matched part of the string
         * @param input
         * @param match
         * @param replacer
         */
        replaceMatch(input, match, replacer) {
          var _a, _b;
          if (typeof replacer === "string") {
            let result = "";
            for (let i = 0; i < replacer.length; i++) {
              if (replacer[i] === "$") {
                switch (replacer[i + 1]) {
                  case "$":
                    result += "$";
                    i++;
                    break;
                  case "&":
                    result += match.match;
                    i++;
                    break;
                  case "`":
                    result += input.substring(0, match.index);
                    i++;
                    break;
                  case "'":
                    result += input.substring(match.index + match.match.length);
                    i++;
                    break;
                  case "<": {
                    const endCaret = replacer.indexOf(">", i);
                    if (endCaret < 0) {
                      throw new Error("Invalid named group replacement");
                    }
                    const groupName = replacer.substring(i + 2, endCaret);
                    if (groupName in this.namedGroups) {
                      result +=
                        (_a = match.groups[this.namedGroups[groupName] - 1]) !==
                          null && _a !== void 0
                          ? _a
                          : "";
                    }
                    i = endCaret;
                    break;
                  }
                  default: {
                    let groupNum;
                    if ("123456789".includes(replacer[i + 1])) {
                      if ("0123456789".includes(replacer[i + 2])) {
                        groupNum =
                          Number.parseInt(replacer.substring(i + 1, i + 3)) - 1;
                        i += 2;
                      } else {
                        groupNum = Number.parseInt(replacer[i + 1]) - 1;
                        i++;
                      }
                    } else {
                      throw new Error("Invalid replacement string");
                    }
                    if (groupNum < match.groups.length) {
                      result +=
                        (_b = match.groups[groupNum]) !== null && _b !== void 0
                          ? _b
                          : "";
                    } else {
                      result += "$" + groupNum;
                    }
                  }
                }
              } else {
                result += replacer[i];
              }
            }
            return result;
          } else {
            return replacer(
              match.match,
              ...match.groups,
              match.index,
              input,
              this.getNamedGroups(match)
            );
          }
        }
        [Symbol.replace](input, replacer) {
          if (typeof input !== "string") {
            input = input + "";
          }
          if (typeof replacer !== "function") {
            replacer = replacer + "";
          }
          if (this._global) {
            let result = "";
            let nextIndex = 0;
            let success;
            do {
              const match = this.wrapper.match(input, nextIndex, true);
              success =
                match.index === nextIndex ||
                (!this._sticky && match.index >= 0);
              if (success) {
                result +=
                  input.substring(nextIndex, match.index) +
                  this.replaceMatch(input, match, replacer);
                nextIndex = match.index + match.match.length;
              }
            } while (success);
            result += input.substring(nextIndex);
            this.lastIndex = 0;
            return result;
          } else {
            const startIndex = this.getMaybeStickyIndex();
            const match = this.wrapper.match(input, startIndex, true);
            this.maybeUpdateLastIndex(match, startIndex);
            if (this.isMatchSuccessful(match, startIndex)) {
              return (
                input.substring(0, match.index) +
                this.replaceMatch(input, match, replacer) +
                input.substring(match.index + match.match.length)
              );
            } else {
              return input;
            }
          }
        }
        replace(input, replacer) {
          return this[Symbol.replace](input, replacer);
        }
        [Symbol.search](input) {
          if (typeof input !== "string") {
            input = input + "";
          }
          const result = this.wrapper.match(input, 0, false).index;
          if (this._sticky && result !== 0) {
            return -1;
          } else {
            return result;
          }
        }
        search(input) {
          return this[Symbol.search](input);
        }
        [Symbol.split](input, limit) {
          if (typeof input !== "string") {
            input = input + "";
          }
          const output = [];
          let nextIndex = 0;
          limit = limit !== null && limit !== void 0 ? limit : Infinity;
          while (output.length < limit) {
            const nextMatch = this.wrapper.match(input, nextIndex, true);
            if (nextMatch.index >= 0) {
              if (nextMatch.match.length === 0) {
                output.push(input.substring(nextIndex, nextIndex + 1));
                nextIndex = nextIndex + 1;
              } else {
                output.push(input.substring(nextIndex, nextMatch.index));
                nextIndex = nextMatch.index + nextMatch.match.length;
              }
              for (const group of nextMatch.groups) {
                if (output.length >= limit) {
                  break;
                }
                output.push(group);
              }
            } else {
              output.push(input.substring(nextIndex));
              break;
            }
          }
          return output;
        }
        split(input, limit) {
          return this[Symbol.split](input, limit);
        }
      };
      exports.RE2 = RE210;
    },
  });

  // TSFiles/HelperClasses/TypeMap.ts
  var TypeMap = class {
    aliases;
    constructor() {
      this.aliases = /* @__PURE__ */ new Map();
    }
    findBaseID(typeID) {
      while (this.aliases.has(typeID)) {
        let newValue = this.aliases.get(typeID);
        if (typeof newValue != "number") break;
        typeID = newValue;
      }
      return typeID;
    }
    unify(a, b) {
      if (a.type === "Any" && b.type === "Any") {
        this.aliases.set(this.findBaseID(a.typeID), this.findBaseID(b.typeID));
        return;
      }
      if (a.type === "Any" && b.type !== "Any") {
        this.aliases.set(this.findBaseID(a.typeID), b);
        return;
      }
      if (a.type !== "Any" && b.type === "Any") {
        this.aliases.set(this.findBaseID(b.typeID), a);
        return;
      }
      if (a.type === "List" && b.type === "List") {
        this.unify(a.listType, b.listType);
      }
      if (a.type === "Function" && b.type === "Function") {
        this.unify(a.from, b.from);
        this.unify(a.to, b.to);
        return;
      }
      if (a.type === "Operator" && b.type === "Operator") {
        this.unify(a.obscured, b.obscured);
        return;
      }
      if (a.type !== b.type) {
        throw new Error(`Type mismatch: ${a.type} vs ${b.type}`);
      }
      return;
    }
    rewrite(node) {
      if (node.type === "Any") {
        return { type: "Any", typeID: this.findBaseID(node.typeID) };
      }
      if (node.type === "Function") {
        return {
          type: "Function",
          from: this.rewrite(node.from),
          to: this.rewrite(node.to),
        };
      }
      if (node.type === "Operator") {
        return {
          type: "Operator",
          obscured: this.rewrite(node.obscured),
        };
      }
      if (node.type === "List") {
        return {
          type: "List",
          listType: this.rewrite(node.listType),
        };
      }
      return node;
    }
    resolve(node) {
      if (node.type === "Any") {
        let alias = this.aliases.get(node.typeID);
        if (alias) {
          if (typeof alias === "number") {
            alias = this.findBaseID(alias);
            alias = this.aliases.get(alias);
            if (typeof alias === "number") return node;
          }
          return this.resolve(alias);
        }
        return node;
      }
      if (node.type === "Function") {
        return {
          type: "Function",
          from: this.resolve(node.from),
          to: this.resolve(node.to),
        };
      }
      if (node.type === "List") {
        return {
          type: "List",
          listType: this.resolve(node.listType),
        };
      }
      if (node.type === "Operator") {
        return {
          type: "Operator",
          obscured: this.resolve(node.obscured),
        };
      }
      return node;
    }
  };

  // TSFiles/HelperClasses/ParsedSignature.ts
  var ParsedSignature = class _ParsedSignature {
    ast;
    TypeIDCounter;
    typeMap;
    flatArgs;
    constructor(ast, typeMap = new TypeMap()) {
      this.ast = this._normalize(ast);
      this.TypeIDCounter = 0;
      this.typeMap = typeMap;
      this.flatArgs = this.toFlatSignature();
    }
    getTypeMap() {
      return this.typeMap;
    }
    getAST() {
      return JSON.parse(JSON.stringify(this.ast));
    }
    _normalize(node) {
      let baseIDs = /* @__PURE__ */ new Set();
      let toAdd = this.TypeIDCounter;
      function normalize(node2) {
        if (node2.type === "Function") {
          return {
            type: "Function",
            from: normalize(node2.from),
            to: normalize(node2.to),
          };
        }
        if (node2.type === "List") {
          return {
            type: "List",
            listType: normalize(node2.listType),
          };
        }
        if (node2.type === "Any") {
          baseIDs.add(node2.typeID);
          return {
            type: "Any",
            typeID: node2.typeID + toAdd,
          };
        }
        return node2;
      }
      node = normalize(node);
      this.TypeIDCounter += baseIDs.size;
      return node;
    }
    rename(mapping) {
      const renameNode = (node) => {
        if (!node) return node;
        if (node.type === "List") {
          return Object.assign({}, node, {
            listType: renameNode(node.listType),
          });
        }
        if (node.type === "Any") {
          const key = node.typeID;
          if (mapping[key]) {
            return {
              type: mapping[key],
            };
          } else return node;
        }
        if (node.type === "Function") {
          return {
            ...node,
            from: renameNode(node.from),
            to: renameNode(node.to),
          };
        }
        return node;
      };
      return new _ParsedSignature(renameNode(this.ast), this.typeMap);
    }
    clone() {
      return new _ParsedSignature(
        JSON.parse(JSON.stringify(this.ast)),
        this.typeMap
      );
    }
    getArity() {
      if (this.ast.type === "Function") {
        let count = 0;
        let current = this.ast;
        while (current.type === "Function") {
          count++;
          current = current.to;
        }
        return count;
      }
      return 0;
    }
    getInput(index = 0) {
      let current = this.ast;
      for (let i = 0; i < index; i++) {
        if (current.to && current.to.type === "Function") {
          current = current.to;
        } else {
          throw new Error(
            `No input at index ${index} in signature: ${JSON.stringify(this.ast, null, 2)}`
          );
        }
      }
      return this.typeMap.resolve(current.from);
    }
    getOutput(index = 0) {
      let current = this.ast;
      for (let i = 0; i < index; i++) {
        if (current.to && current.to.type === "Function") {
          current = current.to;
        } else {
          throw new Error(
            `Expected index less than arity, got index ${index} and arity ${this.getArity()} in signature: ${JSON.stringify(this.ast, null, 2)}`
          );
        }
      }
      return this.typeMap.resolve(current.to);
    }
    pipe(other) {
      if (this.ast.type !== "Function" || other.ast.type !== "Function") {
        throw new Error("Can only pipe operators, not values");
      }
      const out = this.getOutput();
      const input = other.getInput();
      this.typeMap.unify(out, input);
      const newAST = Object.assign({}, this.ast, {
        type: "Function",
        from: this.ast.from,
        to: other.getOutput(),
      });
      return new _ParsedSignature(newAST, this.typeMap);
    }
    apply(argType) {
      if (this.ast.type !== "Function") {
        throw new Error("Cannot apply to a value");
      }
      const expected = this.getInput();
      this.typeMap.unify(argType, expected);
      const newAst = this.typeMap.rewrite(this.ast.to);
      return new _ParsedSignature(newAst, this.typeMap);
    }
    flip() {
      if (this.ast.type !== "Function" || this.ast.to.type !== "Function") {
        throw new Error('Flip needs 2 "inputs".');
      }
      const a = this.ast.from;
      const b = this.ast.to.from;
      const c = this.ast.to.to;
      const flipped = Object.assign({}, this.ast, {
        kind: "Function",
        from: b,
        to: {
          kind: "Function",
          from: a,
          to: c,
        },
      });
      return new _ParsedSignature(flipped, this.typeMap);
    }
    toFlatSignature() {
      const arr = [];
      let current = this.ast;
      while (current.type === "Function") {
        arr.push(current.from.type);
        current = current.to;
      }
      arr.push(current.type);
      return arr;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/typeWrappers/iBoolean.ts
  var iBoolean = class _iBoolean {
    bool;
    constructor(bool) {
      this.bool = bool;
    }
    valueOf() {
      return this.bool;
    }
    getSignatureNode() {
      return { type: "Boolean" };
    }
    equals(other) {
      if (!(other instanceof _iBoolean)) return new _iBoolean(false);
      return new _iBoolean(this.bool == other.valueOf());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/Operator.ts
  var Operator = class _Operator {
    fn;
    parsedSignature;
    typeMap;
    _output;
    constructor({ parsedSignature, function: fn }) {
      this.fn = fn;
      this.typeMap = parsedSignature.getTypeMap();
      this.parsedSignature = parsedSignature;
    }
    apply(arg) {
      this.typeMap.unify(
        this.parsedSignature.getInput(0),
        arg.getSignatureNode()
      );
      const parsedSignature = this.parsedSignature.apply(
        arg.getSignatureNode()
      );
      let newOp = this.fn(arg);
      if ("_setSignature" in newOp) newOp._setSignature(parsedSignature);
      return newOp;
    }
    pipe(otherOp) {
      const newFn = (x) => {
        return otherOp.apply(this.apply(x));
      };
      const newSignature = this.parsedSignature.pipe(otherOp.parsedSignature);
      return new _Operator({
        parsedSignature: newSignature,
        function: newFn,
      });
    }
    getFn() {
      return this.fn;
    }
    getSignatureNode() {
      return this.parsedSignature.ast;
    }
    _setSignature(signature) {
      this.parsedSignature = signature;
    }
    equals(other) {
      if (!(other instanceof _Operator)) return new iBoolean(false);
      return new iBoolean(this.fn.toString() == other.getFn().toString());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/BaseOperator.ts
  var BaseOperator = class extends Operator {
    internalName;
    nicknames;
    symbol;
    interactName;
    serializer;
    constructor({
      internalName,
      nicknames,
      parsedSignature,
      symbol,
      interactName,
      function: fn,
      serializer,
    }) {
      super({ parsedSignature, function: fn });
      this.fn = fn;
      this.typeMap = parsedSignature.getTypeMap();
      this.parsedSignature = parsedSignature;
      this.internalName = internalName;
      this.nicknames = nicknames;
      this.symbol = symbol;
      this.interactName = interactName;
      this.serializer = serializer;
    }
    evaluate(...args) {
      const arity = this.parsedSignature.getArity();
      if (args.length !== arity) {
        throw new Error(`Operator expected ${arity} args, got ${args.length}`);
      }
      args = args.reverse();
      let result = this.fn(args.pop());
      while (args.length > 0) {
        result = result.fn(args.pop());
      }
      return result;
    }
    getUname() {
      return this.internalName;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_ADDITION.ts
  var OPERATOR_ARITHMETIC_ADDITION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_addition",
        nicknames: ["add", "arithmeticAddition", "+", "numberAdd"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Number",
              },
            },
          },
          globalMap2
        ),
        symbol: "+",
        interactName: "numberAdd",
        function: (num1) => {
          return (num2) => {
            return num1.add(num2);
          };
        },
      });
    }
  };

  // TSFiles/JavaNumberClasses/Double.ts
  var Double = class _Double {
    num;
    constructor(data) {
      if (data instanceof _Double) data = data.num;
      if (typeof data === "string") data = parseFloat(data);
      this.num = data;
    }
    static ZERO = new _Double(0);
    getType() {
      return "Double";
    }
    getOrder() {
      return 2;
    }
    // Double → Double
    toLong() {
      return new Long(this.num);
    }
    // Double → Integer
    toInteger() {
      return new Integer(this.num);
    }
    toDouble() {
      return new _Double(this.num);
    }
    toString() {
      return `${this.num}`;
    }
    leftShift(num) {
      return new _Double(this.num << num.toJSNumber());
    }
    add(num) {
      return new _Double(this.num + num.toJSNumber());
    }
    subtract(num) {
      return new _Double(this.num - num.toJSNumber());
    }
    multiply(num) {
      return new _Double(this.num * num.toJSNumber());
    }
    divide(num) {
      return new _Double(this.num / num.toJSNumber());
    }
    mod(num) {
      return new _Double(this.num % num.toJSNumber());
    }
    sqrt() {
      return new _Double(Math.sqrt(this.num));
    }
    pow(exponent) {
      return new _Double(Math.pow(this.num, exponent.toJSNumber()));
    }
    max(num) {
      return this.gt(num) ? this : num.toDouble();
    }
    min(num) {
      return this.lt(num) ? this : num.toDouble();
    }
    lt(num) {
      return this.num < num.toJSNumber();
    }
    lte(num) {
      return this.num <= num.toJSNumber();
    }
    gt(num) {
      return this.num > num.toJSNumber();
    }
    gte(num) {
      return this.num >= num.toJSNumber();
    }
    equals(num) {
      if (!(num instanceof _Double)) return new iBoolean(false);
      return new iBoolean(this.num === num.num);
    }
    round() {
      return new Integer(Math.round(this.num));
    }
    ceil() {
      return new Integer(Math.ceil(this.num));
    }
    floor() {
      return new Integer(Math.floor(this.num));
    }
    getSignatureNode() {
      return { type: "Double" };
    }
    toJSNumber() {
      return this.num;
    }
  };

  // TSFiles/JavaNumberClasses/Long.ts
  var Long = class _Long {
    num;
    constructor(data) {
      if (data instanceof _Long) data = data.num;
      if (typeof data === "number") {
        this.num = _Long.limitToLong(data);
      } else {
        this.num = BigInt.asIntN(64, BigInt(data));
      }
    }
    static limitToLong(num) {
      return BigInt.asIntN(64, BigInt(num));
    }
    static ZERO = new _Long(0);
    getType() {
      return "Long";
    }
    getOrder() {
      return 1;
    }
    toType(value) {
      return value.toLong();
    }
    // Long → Integer
    toInteger() {
      return new Integer(this.toString());
    }
    // Long → Double
    toDouble() {
      return new Double(this.toString());
    }
    toLong() {
      return new _Long(this.num);
    }
    toString() {
      return this.num.toString();
    }
    add(num) {
      return new _Long(this.num + num.toLong().num);
    }
    subtract(num) {
      return new _Long(this.num - num.toLong().num);
    }
    multiply(num) {
      return new _Long(this.num * num.toLong().num);
    }
    divide(num) {
      return new _Long(this.num / num.toLong().num);
    }
    mod(num) {
      return new _Long(this.num % num.toLong().num);
    }
    max(num) {
      return this.gt(num) ? this : num.toLong();
    }
    min(num) {
      return this.lt(num) ? this : num.toLong();
    }
    leftShift(num) {
      return new _Long(this.num << num.toLong().num);
    }
    lt(num) {
      return this.num < num.toLong().num;
    }
    lte(num) {
      return this.num <= num.toLong().num;
    }
    gt(num) {
      return this.num > num.toLong().num;
    }
    gte(num) {
      return this.num >= num.toLong().num;
    }
    equals(num) {
      if (!(num instanceof _Long)) return new iBoolean(false);
      return new iBoolean(this.num === num.toLong().num);
    }
    round() {
      return this.toInteger();
    }
    ceil() {
      return this.toInteger();
    }
    floor() {
      return this.toInteger();
    }
    getSignatureNode() {
      return { type: "Long" };
    }
    toJSNumber() {
      return parseInt(this.num.toString());
    }
  };

  // TSFiles/JavaNumberClasses/Integer.ts
  var Integer = class _Integer {
    num;
    constructor(num) {
      if (num instanceof _Integer) num = num.toJSNumber();
      if (typeof num === "string") num = parseInt(num);
      this.num = _Integer.limitToInteger(num);
    }
    static limitToInteger(num) {
      if (!Number.isFinite(num)) return 0;
      return Math.trunc(num) >> 0;
    }
    static ZERO = new _Integer(0);
    static ONE = new _Integer(1);
    static SIXTY_FOUR = new _Integer(64);
    static MAX_INT = new _Integer(2147483647);
    getType() {
      return "Integer";
    }
    getOrder() {
      return 0;
    }
    toType(value) {
      return value.toInteger();
    }
    // Integer → Long
    toLong() {
      return new Long(BigInt(this.toJSNumber()));
    }
    // Integer → Double
    toDouble() {
      return new Double(this.toJSNumber());
    }
    toInteger() {
      return new _Integer(this.toJSNumber());
    }
    toString() {
      return `${this.toJSNumber()}`;
    }
    add(num) {
      return new _Integer(this.toJSNumber() + num.toJSNumber());
    }
    subtract(num) {
      return new _Integer(this.toJSNumber() - num.toJSNumber());
    }
    multiply(num) {
      return new _Integer(this.toJSNumber() * num.toJSNumber());
    }
    divide(num) {
      return new _Integer(this.toJSNumber() / num.toJSNumber());
    }
    mod(num) {
      return new _Integer(this.toJSNumber() % num.toJSNumber());
    }
    binaryAnd(num) {
      return new _Integer(this.toJSNumber() & num.toJSNumber());
    }
    binaryOr(num) {
      return new _Integer(this.toJSNumber() | num.toJSNumber());
    }
    binaryXor(num) {
      return new _Integer(this.toJSNumber() ^ num.toJSNumber());
    }
    binaryComplement() {
      return new _Integer(~this.toJSNumber());
    }
    leftShift(num) {
      return new _Integer(this.toJSNumber() << num.toJSNumber());
    }
    rightShift(places) {
      return new _Integer(this.toJSNumber() >> places.num);
    }
    unsignedRightShift(places) {
      return new _Integer(this.toJSNumber() >>> places.num);
    }
    max(num) {
      return this.gt(num) ? this : num.toInteger();
    }
    min(num) {
      return this.lt(num) ? this : num.toInteger();
    }
    lt(num) {
      return this.toJSNumber() < num.toJSNumber();
    }
    lte(num) {
      return this.toJSNumber() <= num.toJSNumber();
    }
    gt(num) {
      return this.toJSNumber() > num.toJSNumber();
    }
    gte(num) {
      return this.toJSNumber() >= num.toJSNumber();
    }
    equals(num) {
      if (!(num instanceof _Integer)) return new iBoolean(false);
      return new iBoolean(this.toJSNumber() === num.toJSNumber());
    }
    round() {
      return this.toInteger();
    }
    ceil() {
      return this.toInteger();
    }
    floor() {
      return this.toInteger();
    }
    getSignatureNode() {
      return { type: "Integer" };
    }
    toJSNumber() {
      return this.toJSNumber();
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_DECREMENT.ts
  var OPERATOR_ARITHMETIC_DECREMENT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_decrement",
        nicknames: [
          "arithmeticDecrement",
          "decrement",
          "--",
          "numberDecrement",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
          globalMap2
        ),
        symbol: "--",
        interactName: "numberDecrement",
        function: (num1) => {
          return num1.subtract(Integer.ONE);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_DIVISION.ts
  var OPERATOR_ARITHMETIC_DIVISION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_division",
        nicknames: ["divide", "arithmeticDivision", "/", "numberDivide"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Number",
              },
            },
          },
          globalMap2
        ),
        symbol: "/",
        interactName: "numberDivide",
        function: (num1) => {
          return (num2) => {
            return num1.divide(num2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_INCREMENT.ts
  var OPERATOR_ARITHMETIC_INCREMENT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_increment",
        nicknames: [
          "increment",
          "arithmeticIncrement",
          "++",
          "numberIncrement",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Number",
            },
          },
          globalMap2
        ),
        symbol: "++",
        interactName: "numberIncrement",
        function: (num1) => {
          return num1.add(Integer.ONE);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_MAXIMUM.ts
  var OPERATOR_ARITHMETIC_MAXIMUM = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_maximum",
        nicknames: ["max", "arithmeticMaximum", "max", "numberMax"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Number",
              },
            },
          },
          globalMap2
        ),
        symbol: "max",
        interactName: "numberMax",
        function: (num1) => {
          return (num2) => {
            return num1.max(num2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_MINIMUM.ts
  var OPERATOR_ARITHMETIC_MINIMUM = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_minimum",
        nicknames: ["min", "arithmeticMinimum", "numberMin"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Number",
              },
            },
          },
          globalMap2
        ),
        symbol: "min",
        interactName: "numberMin",
        function: (num1) => {
          return (num2) => {
            return num1.min(num2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_MODULUS.ts
  var OPERATOR_ARITHMETIC_MODULUS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_modulus",
        nicknames: ["modulus", "arithmeticModulus", "%", "numberModulus"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Number",
              },
            },
          },
          globalMap2
        ),
        symbol: "%",
        interactName: "numberModulus",
        function: (num1) => {
          return (num2) => {
            return num1.mod(num2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_MULTIPLICATION.ts
  var OPERATOR_ARITHMETIC_MULTIPLICATION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_multiplication",
        nicknames: [
          "multiply",
          "arithmeticMultiplication",
          "*",
          "numberMultiply",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Number",
              },
            },
          },
          globalMap2
        ),
        symbol: "*",
        interactName: "numberMultiply",
        function: (num1) => {
          return (num2) => {
            return num1.multiply(num2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ARITHMETIC_SUBTRACTION.ts
  var OPERATOR_ARITHMETIC_SUBTRACTION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:arithmetic_subtraction",
        nicknames: ["subtract", "arithmeticSubtraction"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Number",
              },
            },
          },
          globalMap2
        ),
        symbol: "-",
        interactName: "numberSubtract",
        function: (num1) => {
          return (num2) => {
            return num1.subtract(num2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/BINARY_AND.ts
  var OPERATOR_BINARY_AND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:binary_and",
        nicknames: ["binaryAnd", "&", "integerBinaryAnd"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "&",
        interactName: "integerBinaryAnd",
        function: (int1) => {
          return (int2) => {
            return int1.binaryAnd(int2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/BINARY_COMPLEMENT.ts
  var OPERATOR_BINARY_COMPLEMENT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:binary_complement",
        nicknames: ["binaryComplement", "~", "integerComplement"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "~",
        interactName: "integerComplement",
        function: (int) => {
          return int.binaryComplement();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/BINARY_LSHIFT.ts
  var OPERATOR_BINARY_LSHIFT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:binary_lshift",
        nicknames: ["<<", "binaryLshift", "integerLeftShift"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "<<",
        interactName: "integerLeftShift",
        function: (int1) => {
          return (int2) => {
            return int1.leftShift(int2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/BINARY_OR.ts
  var OPERATOR_BINARY_OR = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:binary_or",
        nicknames: ["binaryOr", "|", "integerBinaryOr"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "|",
        interactName: "integerBinaryOr",
        function: (int1) => {
          return (int2) => {
            return int1.binaryOr(int2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/BINARY_RSHIFT.ts
  var OPERATOR_BINARY_RSHIFT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:binary_rshift",
        nicknames: [">>", "binaryRshift", "integerRightShift"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: ">>",
        interactName: "integerRightShift",
        function: (int1) => {
          return (int2) => {
            return int1.rightShift(int2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/BINARY_XOR.ts
  var OPERATOR_BINARY_XOR = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:binary_xor",
        nicknames: ["binaryXor", "^", "integerXor"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "^",
        interactName: "integerXor",
        function: (int1) => {
          return (int2) => {
            return int1.binaryXor(int2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/DOUBLE_POW.ts
  var OPERATOR_DOUBLE_POW = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:double_pow",
        nicknames: ["doublePow", "pow"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "Function",
              from: {
                type: "Double",
              },
              to: {
                type: "Double",
              },
            },
          },
          globalMap2
        ),
        symbol: "pow",
        interactName: "doublePow",
        function: (base) => {
          return (exponent) => {
            return base.pow(exponent);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/DOUBLE_SQRT.ts
  var OPERATOR_DOUBLE_SQRT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:double_sqrt",
        nicknames: ["doubleSqrt", "sqrt"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "sqrt",
        interactName: "doubleSqrt",
        function: (double) => {
          return double.sqrt();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/DOUBLE_TO_INTEGER.ts
  var OPERATOR_DOUBLE_TO_INTEGER = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer",
        nicknames: ["doubleToInt", "doubleInteger"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "()",
        interactName: "doubleDoubleToInteger",
        function: (double) => {
          return double.toInteger();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/DOUBLE_TO_LONG.ts
  var OPERATOR_DOUBLE_TO_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long",
        nicknames: ["doubleToLong"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "Long",
            },
          },
          globalMap2
        ),
        symbol: "()",
        interactName: "doubleDoubleToLong",
        function: (double) => {
          return double.toLong();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ENTITY_ARMORINVENTORY.ts
  var OPERATOR_ENTITY_ARMORINVENTORY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_armorinventory",
        nicknames: [
          "EntityArmorinventory",
          "entity_armor_inventory",
          "entityArmorInventory",
          "entity_armor",
          "entityArmor",
          "armor_inventory",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: { type: "List", listType: { type: "Item" } },
          },
          globalMap2
        ),
        symbol: "armor_inventory",
        interactName: "entityArmorInventory",
        function: (entity) => {
          return entity.getArmorInventory();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ENTITY_HASGUIOPEN.ts
  var OPERATOR_ENTITY_HASGUIOPEN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_hasguiopen",
        nicknames: [
          "PlayerHasguiopen",
          "player_has_gui_open",
          "playerHasGuiOpen",
          "has_gui_open",
          "entityHasGuiOpen",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "has_gui_open",
        interactName: "entityHasGuiOpen",
        function: (entity) => {
          return entity.hasGuiOpen();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ENTITY_HEALTH.ts
  var OPERATOR_ENTITY_HEALTH = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_health",
        nicknames: [
          "EntityHealth",
          "entity_health",
          "entity_health_value",
          "entityHealthValue",
          "entityHealth",
          "health",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "health",
        interactName: "entityHealth",
        function: (entity) => {
          return entity.getHealth();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ENTITY_HELDITEM.ts
  var OPERATOR_ENTITY_HELDITEM = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_helditem",
        nicknames: [
          "EntityHelditemMain",
          "entity_held_item_main",
          "entityHeldItemMain",
          "heldItemMain",
          "held_item_1",
          "entityHeldItem",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Item",
            },
          },
          globalMap2
        ),
        symbol: "held_item_1",
        interactName: "entityHeldItem",
        function: (entity) => {
          return entity.getHeldItemMain();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ENTITY_HELDITEMOFFHAND.ts
  var OPERATOR_ENTITY_HELDITEMOFFHAND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_helditemoffhand",
        nicknames: [
          "EntityHelditemOff",
          "entity_held_item_off",
          "entityHeldItemOff",
          "heldItemOff",
          "entityHeldItemOffHand",
          "held_item_2",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Item",
            },
          },
          globalMap2
        ),
        symbol: "held_item_2",
        interactName: "entityHeldItemOffHand",
        function: (entity) => {
          return entity.getHeldItemOffHand();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ENTITY_ISMINECART.ts
  var OPERATOR_ENTITY_ISMINECART = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_isminecart",
        nicknames: [
          "EntityIsminecart",
          "entity_is_minecart",
          "entityIsMinecart",
          "isMinecart",
          "is_minecart",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_minecart",
        interactName: "entityIsMinecart",
        function: (entity) => {
          return entity.isMinecart();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ENTITY_ITEM.ts
  var OPERATOR_ENTITY_ITEM = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_item",
        nicknames: [
          "EntityItemstack",
          "entity_itemstack",
          "entityItemstack",
          "entity_item_stack",
          "entityItemStack",
          "entity_item",
          "entityItem",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Item",
            },
          },
          globalMap2
        ),
        symbol: "item",
        interactName: "entityItem",
        function: (entity) => {
          if (entity.isItem()) {
            return entity.getItem();
          } else {
            throw new Error("Entity is not an item entity.");
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ENTITY_WIDTH.ts
  var OPERATOR_ENTITY_WIDTH = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_width",
        nicknames: ["EntityWidth", "entity_width", "entityWidth", "width"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "width",
        interactName: "entityWidth",
        function: (entity) => {
          return entity.getWidth();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/GENERAL_CHOICE.ts
  var OPERATOR_GENERAL_CHOICE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:general_choice",
        nicknames: [
          "generalChoice",
          "choice",
          "booleanChoice",
          "?",
          "if",
          "ifElse",
          "if_else",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 1,
              },
              to: {
                type: "Function",
                from: {
                  type: "Any",
                  typeID: 1,
                },
                to: {
                  type: "Any",
                  typeID: 1,
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "?",
        interactName: "booleanChoice",
        function: (bool) => {
          return (trueValue) => {
            return (falseValue) => {
              return bool ? trueValue : falseValue;
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/GENERAL_CONSTANT.ts
  var OPERATOR_GENERAL_CONSTANT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:general_constant",
        nicknames: ["generalConstant", "const", "constant", "anyConstant", "K"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 2,
              },
              to: {
                type: "Any",
                typeID: 1,
              },
            },
          },
          globalMap2
        ),
        symbol: "K",
        interactName: "anyConstant",
        function: (value) => {
          return () => {
            return value;
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/GENERAL_IDENTITY.ts
  var OPERATOR_GENERAL_IDENTITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:general_identity",
        nicknames: ["generalIdentity", "id", "identity", "anyIdentity"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Any",
              typeID: 1,
            },
          },
          globalMap2
        ),
        symbol: "id",
        interactName: "anyIdentity",
        function: (value) => {
          return value;
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_ENERGIES.ts
  var OPERATOR_INGREDIENTS_ENERGIES = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_energies",
        nicknames: ["ingredientsEnergies", "Ingr.energies"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: { type: "List", listType: { type: "Long" } },
          },
          globalMap2
        ),
        symbol: "Ingr.energies",
        interactName: "ingredientsEnergies",
        function: (ingredients) => {
          return ingredients.getEnergies();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_FLUIDS.ts
  var OPERATOR_INGREDIENTS_FLUIDS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_fluids",
        nicknames: ["ingredientsFluids", "Ingr.fluids"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: { type: "List", listType: { type: "Fluid" } },
          },
          globalMap2
        ),
        symbol: "Ingr.fluids",
        interactName: "ingredientsFluids",
        function: (ingredients) => {
          return ingredients.getFluids();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_ITEMS.ts
  var OPERATOR_INGREDIENTS_ITEMS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_items",
        nicknames: ["ingredientsItems", "Ingr.items"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: { type: "List", listType: { type: "Item" } },
          },
          globalMap2
        ),
        symbol: "Ingr.items",
        interactName: "ingredientsItems",
        function: (ingredients) => {
          return ingredients.getItems();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_WITH_ENERGIES.ts
  var OPERATOR_INGREDIENTS_WITH_ENERGIES = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_with_energies",
        nicknames: ["ingredientsWithEnergies", "Ingr.with_energies"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Long" } },
              to: {
                type: "Ingredients",
              },
            },
          },
          globalMap2
        ),
        symbol: "Ingr.with_energies",
        interactName: "ingredientsWithEnergies",
        function: (ingredients) => {
          return (energyList) => {
            return ingredients.appendEnergies(energyList);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_WITH_ENERGY.ts
  var OPERATOR_INGREDIENTS_WITH_ENERGY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_with_energy",
        nicknames: ["ingredientsWithEnergy", "Ingr.with_energy"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Function",
                from: {
                  type: "Long",
                },
                to: {
                  type: "Ingredients",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "Ingr.with_energy",
        interactName: "ingredientsWithEnergy",
        function: (ingredients) => {
          return (index) => {
            return (energy) => {
              return ingredients.setEnergy(energy, index);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_WITH_FLUID.ts
  var OPERATOR_INGREDIENTS_WITH_FLUID = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_with_fluid",
        nicknames: ["ingredientsWithFluid", "Ingr.with_fluid"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Function",
                from: {
                  type: "Fluid",
                },
                to: {
                  type: "Ingredients",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "Ingr.with_fluid",
        interactName: "ingredientsWithFluid",
        function: (ingredients) => {
          return (index) => {
            return (fluid) => {
              return ingredients.setFluid(fluid, index);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_WITH_FLUIDS.ts
  var OPERATOR_INGREDIENTS_WITH_FLUIDS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_with_fluids",
        nicknames: ["ingredientsWithFluids", "Ingr.with_fluids"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Fluid" } },
              to: {
                type: "Ingredients",
              },
            },
          },
          globalMap2
        ),
        symbol: "Ingr.with_fluids",
        interactName: "ingredientsWithFluids",
        function: (ingredients) => {
          return (fluidList) => {
            return ingredients.appendFluids(fluidList);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_WITH_ITEM.ts
  var OPERATOR_INGREDIENTS_WITH_ITEM = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_with_item",
        nicknames: ["ingredientsWithItem", "Ingr.with_item"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Function",
                from: {
                  type: "Item",
                },
                to: {
                  type: "Ingredients",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "Ingr.with_item",
        interactName: "ingredientsWithItem",
        function: (ingredients) => {
          return (index) => {
            return (item) => {
              return ingredients.setItem(item, index);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INGREDIENTS_WITH_ITEMS.ts
  var OPERATOR_INGREDIENTS_WITH_ITEMS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:ingredients_with_items",
        nicknames: ["ingredientsWithItems", "Ingr.with_items"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Item" } },
              to: {
                type: "Ingredients",
              },
            },
          },
          globalMap2
        ),
        symbol: "Ingr.with_items",
        interactName: "ingredientsWithItems",
        function: (ingredients) => {
          return (itemList) => {
            return ingredients.appendItems(itemList);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INTEGER_TO_DOUBLE.ts
  var OPERATOR_INTEGER_TO_DOUBLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double",
        nicknames: ["intToDouble", "integerToDouble", "integerIntegerToDouble"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "()",
        interactName: "integerIntegerToDouble",
        function: (int) => {
          return int.toDouble();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/INTEGER_TO_LONG.ts
  var OPERATOR_INTEGER_TO_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long",
        nicknames: ["intToLong", "integerLong", "integerIntegerToLong"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Long",
            },
          },
          globalMap2
        ),
        symbol: "()",
        interactName: "integerIntegerToLong",
        function: (int) => {
          return int.toLong();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ITEMSTACK_CANBURN.ts
  var OPERATOR_ITEMSTACK_CANBURN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_canburn",
        nicknames: [
          "ItemstackCanburn",
          "item_can_burn",
          "itemCanBurn",
          "item_is_fuel",
          "itemIsFuel",
          "isFuel",
          "can_burn",
          "itemstackCanBurn",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "can_burn",
        interactName: "itemstackCanBurn",
        function: (item) => {
          return item.isFuel();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/typeWrappers/iNull.ts
  var iNull = class _iNull {
    constructor() {}
    valueOf() {
      return null;
    }
    getSignatureNode() {
      return { type: "Null" };
    }
    equals(other) {
      if (!(other instanceof _iNull)) return new iBoolean(false);
      return new iBoolean(null === other.valueOf());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/Tag.ts
  var Tag = class {
    static TAG_LIST = 0;
    static TAG_COMPOUND = 1;
    static TAG_STRING = 2;
    static TAG_NUMERIC = 3;
    static TAG_BYTE = 4;
    static TAG_DOUBLE = 5;
    static TAG_NULL = 6;
    static TAG_INT = 7;
    static TAG_LONG = 7;
    static TAG_FLOAT = 8;
    static TAG_Short = 9;
    constructor() {}
    getSignatureNode() {
      return {
        type: "NBT",
      };
    }
  };

  // TSFiles/IntegratedDynamicsClasses/typeWrappers/iString.ts
  var iString = class _iString {
    str;
    constructor(str) {
      this.str = str;
    }
    valueOf() {
      return this.str;
    }
    getSignatureNode() {
      return { type: "String" };
    }
    equals(other) {
      if (!(other instanceof _iString)) return new iBoolean(false);
      return new iBoolean(this.str == other.valueOf());
    }
    add(other) {
      return new _iString(this.str + other);
    }
    length() {
      return this.str.length;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NullTag.ts
  var NullTag = class extends Tag {
    constructor() {
      super();
    }
    getType() {
      return Tag.TAG_NULL;
    }
    valueOf() {
      return new iNull();
    }
    getTypeAsString() {
      return new iString("NullTag");
    }
    equals(tag) {
      return new iBoolean(tag.getType() == Tag.TAG_NULL);
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ITEMSTACK_DATAVALUE.ts
  var OPERATOR_ITEMSTACK_DATAVALUE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_datavalue",
        nicknames: [
          "ItemstackDataValue",
          "itemstack_data_value",
          "itemstackDataValue",
          "item_data_value",
          "itemDataValue",
          "itemNBTValue",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "data_value",
        interactName: "itemstackDataValue",
        function: (item) => {
          return (key) => {
            const nbt = item.getNBT();
            if (!nbt || !nbt.has(key)) {
              return new NullTag();
            }
            return nbt.get(key);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ITEMSTACK_ISFECONTAINER.ts
  var OPERATOR_ITEMSTACK_ISFECONTAINER = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_isfecontainer",
        nicknames: [
          "ItemstackIsfecontainer",
          "itemstack_is_fe_container",
          "itemstackIsFecontainer",
          "item_is_fe_container",
          "itemIsFecontainer",
          "isFeContainer",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_fe_container",
        interactName: "itemstackIsFeContainer",
        function: (item) => {
          return item.isFeContainer();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ITEMSTACK_ITEMBYNAME.ts
  var OPERATOR_ITEMSTACK_ITEMBYNAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_itembyname",
        nicknames: [
          "ItemstackByName",
          "itemstack_by_name",
          "itemstackByName",
          "item_by_name",
          "itemByName",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Item",
            },
          },
          globalMap2
        ),
        symbol: "item_by_name",
        interactName: "stringItemByName",
        function: () => {
          throw new Error(
            "Item by name is infeasible without a registry. This is a placeholder function."
          );
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ITEMSTACK_ITEMLISTCOUNT.ts
  var OPERATOR_ITEMSTACK_ITEMLISTCOUNT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_itemlistcount",
        nicknames: [
          "ItemstackListCount",
          "itemstack_list_count",
          "itemstackListCount",
          "item_list_count",
          "itemListCount",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "List",
              listType: { type: "Item" },
            },
            to: {
              type: "Function",
              from: { type: "Item" },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "item_list_count",
        interactName: "listItemListCount",
        function: (items) => {
          return (item) => {
            return items
              .filter((i) => {
                try {
                  return i.equals(item);
                } catch (e) {
                  return false;
                }
              })
              .size();
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ITEMSTACK_TAG.ts
  var OPERATOR_ITEMSTACK_TAG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_tag",
        nicknames: [
          "ItemstackTag",
          "itemstack_tag_names",
          "itemstackTagNames",
          "item_tag_names",
          "itemTagNames",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: { type: "List", listType: { type: "String" } },
          },
          globalMap2
        ),
        symbol: "item_tag_names",
        interactName: "itemstackTags",
        function: (item) => {
          return item.getTagNames();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ITEMSTACK_TOOLTIP.ts
  var OPERATOR_ITEMSTACK_TOOLTIP = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_tooltip",
        nicknames: [
          "ItemstackTooltip",
          "itemstack_tooltip",
          "itemstackTooltip",
          "item_tooltip",
          "itemTooltip",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: { type: "List", listType: { type: "String" } },
          },
          globalMap2
        ),
        symbol: "tooltip",
        interactName: "itemstackTooltip",
        function: (item) => {
          return item.getTooltip();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/typeWrappers/iArrayLazy.ts
  var iArrayLazy = class _iArrayLazy {
    mapOp;
    initial;
    generatorOp;
    arr;
    constructor(initial, generatorOp, mapOp) {
      this.initial = initial;
      this.generatorOp = generatorOp;
      this.mapOp = mapOp;
      this.arr = [initial];
    }
    append(_element) {
      return new _iArrayLazy(this.initial, this.generatorOp, this.mapOp);
    }
    some(_fn) {
      throw new Error("Some not supported on infinite list");
    }
    every(_fn) {
      throw new Error("Every not supported on infinite list");
    }
    map(mapOp) {
      const returnValue = new _iArrayLazy(
        this.initial,
        this.generatorOp,
        this.mapOp.pipe(mapOp)
      );
      returnValue.arr = [...this.arr];
      return returnValue;
    }
    filter(_fn) {
      throw new Error("Filter not supported on infinite list");
    }
    size() {
      return Integer.MAX_INT;
    }
    trueSize() {
      return new Integer(this.arr.length);
    }
    getOrDefault(index, _backup) {
      return this.get(index);
    }
    get(index) {
      if (this.trueSize().lte(index)) {
        this.get(index.subtract(Integer.ONE));
      }
      const i = index.toJSNumber();
      if (this.arr.length == i)
        this.arr[i] = this.generatorOp.apply(this.arr[i - 1]);
      let baseValue = this.arr[i];
      return this.mapOp.apply(baseValue);
    }
    includes(_element) {
      throw new Error("Includes not supported on an Infinite List");
    }
    concat(_arr) {
      return new iArrayEager([]);
    }
    slice(start, end) {
      let newArrRaw = [];
      for (let i = start; i.lt(end); i = i.add(Integer.ONE)) {
        newArrRaw.push(this.get(i));
      }
      return new iArrayEager(newArrRaw);
    }
    equals(other) {
      if (!(other instanceof _iArrayLazy)) return new iBoolean(false);
      if (!other.initial.equals(this.initial)) return new iBoolean(false);
      if (!other.generatorOp.equals(this.generatorOp))
        return new iBoolean(false);
      if (!other.mapOp.equals(this.mapOp)) return new iBoolean(false);
      return new iBoolean(true);
    }
    getSignatureNode() {
      return {
        type: "List",
        listType: this.mapOp.apply(this.initial).getSignatureNode(),
      };
    }
    valueOf() {
      throw new Error("Value of not supported for Infinite List");
    }
  };

  // TSFiles/IntegratedDynamicsClasses/typeWrappers/iArrayEager.ts
  var iArrayEager = class _iArrayEager {
    arr;
    constructor(arr) {
      this.arr = arr;
    }
    valueOf() {
      console.warn("Calling this is probally a bug, ensure you're sure");
      return this.arr;
    }
    append(element) {
      let returnValue = [...this.arr];
      returnValue.push(element);
      return new _iArrayEager(returnValue);
    }
    some(fn) {
      return new iBoolean(this.arr.some(fn));
    }
    every(fn) {
      return new iBoolean(this.arr.every(fn));
    }
    map(mapOp) {
      return new _iArrayEager(this.arr.map((e) => mapOp.apply(e)));
    }
    filter(fn) {
      return new _iArrayEager(this.arr.filter(fn));
    }
    size() {
      return new Integer(this.arr.length);
    }
    getOrDefault(index, backup) {
      if (this.size().lte(index)) return backup;
      return this.get(index);
    }
    get(index) {
      if (this.size().lte(index))
        throw new Error(`Index out of bounds: ${index.toString()}`);
      const i = index.toJSNumber();
      return this.arr[i];
    }
    includes(element) {
      return this.some((e) => e.equals(element));
    }
    concat(arr) {
      if (this instanceof iArrayLazy || arr instanceof iArrayLazy)
        return new _iArrayEager([]);
      return new _iArrayEager([...this.arr, ...arr.valueOf()]);
    }
    slice(startInt, endInt) {
      const start = startInt.toJSNumber();
      const end = endInt ? endInt.toJSNumber() : void 0;
      return new _iArrayEager(this.arr.slice(start, end));
    }
    getSignatureNode() {
      return { type: "Boolean" };
    }
    equals(other) {
      if (!(other instanceof _iArrayEager)) return new iBoolean(false);
      const otherArr = other.valueOf();
      if (this.arr.length !== otherArr.length) return new iBoolean(false);
      return new iBoolean(this.arr.every((e, i) => e.equals(otherArr[i])));
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag.ts
  var ListTag = class _ListTag extends Tag {
    data;
    constructor(data) {
      super();
      this.data = data;
    }
    getType() {
      return Tag.TAG_LIST;
    }
    static valueOf(value) {
      return new _ListTag(value);
    }
    valueOf() {
      return this.data;
    }
    size() {
      return this.data.size();
    }
    get(index) {
      return this.data.get(index) ?? new NullTag();
    }
    getArray() {
      return new iArrayEager([...this.data.valueOf()]);
    }
    add(tag) {
      this.data.append(tag);
    }
    getTypeAsString() {
      return new iString("ListTag");
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_LIST) return new iBoolean(false);
      for (const [i, e] of Object.entries(tag.getArray())) {
        if (!e.equals(this.get(new Integer(i)))) return new iBoolean(false);
      }
      return new iBoolean(true);
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/NumericTag.ts
  var NumericTag = class extends Tag {
    constructor() {
      super();
    }
    getType() {
      return Tag.TAG_NUMERIC;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag.ts
  var IntTag = class _IntTag extends NumericTag {
    data;
    constructor(data) {
      super();
      this.data = data;
    }
    getType() {
      return Tag.TAG_BYTE;
    }
    static valueOf(value) {
      return new _IntTag(value);
    }
    valueOf() {
      return this.data;
    }
    getAsDouble() {
      return this.data.toJSNumber();
    }
    getTypeAsString() {
      return new iString("IntTag");
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_BYTE) return new iBoolean(false);
      return new iBoolean(this.valueOf() == tag.valueOf());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteTag.ts
  var ByteTag = class _ByteTag extends NumericTag {
    data;
    constructor(data) {
      super();
      this.data = data;
    }
    getType() {
      return Tag.TAG_BYTE;
    }
    static valueOf(value) {
      return new _ByteTag(value);
    }
    valueOf() {
      return this.data;
    }
    getAsDouble() {
      return this.data.toJSNumber();
    }
    getTypeAsString() {
      return new iString("ByteTag");
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_BYTE) return new iBoolean(false);
      return new iBoolean(this.valueOf() == tag.valueOf());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/LongTag.ts
  var LongTag = class _LongTag extends NumericTag {
    data;
    constructor(data) {
      super();
      this.data = data;
    }
    getType() {
      return Tag.TAG_BYTE;
    }
    static valueOf(value) {
      return new _LongTag(value);
    }
    valueOf() {
      return this.data;
    }
    getAsDouble() {
      return this.data.toJSNumber();
    }
    getTypeAsString() {
      return new iString("LongTag");
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_BYTE) return new iBoolean(false);
      return new iBoolean(this.valueOf() == tag.valueOf());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/DoubleTag.ts
  var DoubleTag = class _DoubleTag extends NumericTag {
    data;
    getType() {
      return Tag.TAG_DOUBLE;
    }
    constructor(data) {
      super();
      this.data = data;
    }
    static valueOf(value) {
      return new _DoubleTag(value);
    }
    valueOf() {
      return this.data;
    }
    getAsDouble() {
      return this.data.toJSNumber();
    }
    getTypeAsString() {
      return new iString("DoubleTag");
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_DOUBLE) return new iBoolean(false);
      return new iBoolean(this.getAsDouble() == tag.getAsDouble());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag.ts
  var CompoundTag = class _CompoundTag extends Tag {
    data;
    constructor(data) {
      super();
      this.data = data;
    }
    getType() {
      return Tag.TAG_COMPOUND;
    }
    static valueOf(value) {
      return new _CompoundTag(value);
    }
    valueOf() {
      return this.data;
    }
    getAllKeys() {
      return new iArrayEager(Object.keys(this.data).map((e) => new iString(e)));
    }
    get(key) {
      return this.data[key.valueOf()] ?? new NullTag();
    }
    has(key) {
      return key.valueOf() in this.data;
    }
    set(key, value) {
      let data = { ...this.data };
      data[key] = value;
      return new _CompoundTag(data);
    }
    setAll(keys, values) {
      if (keys.length != values.length)
        throw new Error(
          `Keys (length ${keys.length}) is not the same as values (${values.length})`
        );
      let data = { ...this.data };
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = values[i];
        data[key.valueOf()] = value;
      }
      return new _CompoundTag(data);
    }
    without(key) {
      let data = { ...this.data };
      delete data[key];
      return new _CompoundTag(data);
    }
    getTypeAsString() {
      return new iString("CompoundTag");
    }
    toJSON() {
      let obj = {};
      function mapTagArray(value) {
        value
          .getArray()
          .valueOf()
          .map((e) => {
            if (e instanceof _CompoundTag) return e.toJSON();
            if (e instanceof ListTag) return mapTagArray(e);
            let innerValue = value.valueOf();
            while (
              innerValue instanceof Object &&
              innerValue.constructor.name != "Object"
            ) {
              innerValue = innerValue.toJSON();
            }
          });
      }
      for (const [key, value] of Object.entries(this.data)) {
        if (!(value instanceof _CompoundTag || value instanceof ListTag)) {
          let innerValue = value.valueOf();
          findBase: while (
            innerValue instanceof Object &&
            innerValue.constructor.name != "Object"
          ) {
            if (!("toJSON" in innerValue)) break findBase;
            innerValue = innerValue["toJSON"]();
          }
          obj[key] = innerValue;
        } else if (value instanceof _CompoundTag) obj[key] = value.toJSON();
        else obj[key] = mapTagArray(value);
      }
    }
    static fromJSON(data) {
      const jsonStr = data
        .replace(/([{,]\s*)([A-Za-z_]+)(\s*:)/g, '$1"$2"$3')
        .replace(
          /(:\s*)([A-Za-z0-9_]*[A-Za-z][A-Za-z0-9_]*)(?=\s*[,}])/g,
          '$1"$2"'
        )
        .replace(
          /\[(?<type>[BIL]);(?<values>-?\d+[bl]?(?:,-?\d+[bl]?)*?)\]/g,
          (_, type, values) => {
            const arr = values.split(",");
            return JSON.stringify({ type, values: arr });
          }
        );
      const json = JSON.parse(jsonStr);
      function objectCase(obj) {
        for (const key of Object.keys(obj)) {
          if (Array.isArray(obj[key])) obj[key] = arrayCase(obj[key]);
          if (obj[key] instanceof Object) obj[key] = objectCase(obj[key]);
          else obj[key] = baseCase(obj[key]);
        }
        return new _CompoundTag(obj);
      }
      function baseCase(obj) {
        for (const key of Object.keys(obj)) {
          switch (typeof obj[key]) {
            case "number":
              obj[key] = new IntTag(new Integer(obj[key]));
              break;
            case "boolean":
              obj[key] = new ByteTag(new Integer(+obj[key]));
              break;
            case "string":
              const str = obj[key];
              if (str.match(/\d*[Bb]/))
                obj[key] = new ByteTag(new Integer(parseInt(str.slice(0, -1))));
              if (str.match(/\d*[Ss]/))
                obj[key] = new IntTag(new Integer(parseInt(str.slice(0, -1))));
              else if (str.match(/\d*[Ll]/))
                obj[key] = new LongTag(new Long(parseInt(str.slice(0, -1))));
              else if (str.match(/\d*[FfDd]/))
                obj[key] = new DoubleTag(
                  new Double(parseFloat(str.slice(0, -1)))
                );
              else if (str.match(/d{1,}/))
                obj[key] = new IntTag(new Integer(parseInt(obj[key])));
              break;
            default:
              throw new Error(`Unknown type: ${typeof obj[key]}`);
          }
        }
        return new _CompoundTag(obj);
      }
      function arrayCase(arr) {
        for (const [k, v] of Object.entries(arr)) {
          const i = parseInt(k);
          if (Array.isArray(v))
            arr[i] = new ListTag(new iArrayEager(arrayCase(v)));
          else if (v instanceof Object) arr[i] = objectCase(v);
          else arr[i] = baseCase(v);
        }
        return arr;
      }
      return objectCase(json);
    }
    compoundSubset(subset) {
      for (const key of subset.getAllKeys().valueOf()) {
        const subValue = subset.get(key);
        const superValue = this.get(key);
        if (superValue === void 0) return false;
        if (
          subValue instanceof _CompoundTag &&
          superValue instanceof _CompoundTag
        ) {
          if (!superValue.compoundSubset(subValue)) return false;
        } else if (
          subValue instanceof ListTag &&
          superValue instanceof ListTag
        ) {
          let subValueArr = subValue.valueOf();
          let superValueArr = superValue.valueOf();
          if (!subValueArr.size().equals(superValueArr.size())) return false;
          if (
            subValueArr.every((v, i) => superValueArr.valueOf()[i]?.equals(v))
          )
            return true;
          return false;
        }
      }
      return true;
    }
    compoundUnion(other) {
      const keys = [];
      const values = [];
      for (const key of other.getAllKeys().valueOf()) {
        const thisValue = this.get(key);
        const otherValue = other.get(key);
        if (
          thisValue instanceof _CompoundTag &&
          otherValue instanceof _CompoundTag
        ) {
          keys.push(key);
          values.push(thisValue.compoundUnion(otherValue));
        } else {
          keys.push(key);
          values.push(otherValue);
        }
      }
      return this.setAll(keys, values);
    }
    compoundIntersection(other) {
      const result = {};
      for (const key of this.getAllKeys().valueOf()) {
        const thisValue = this.get(key);
        const otherValue = other.get(key);
        if (
          thisValue instanceof _CompoundTag &&
          otherValue instanceof _CompoundTag
        ) {
          const sub = thisValue.compoundIntersection(otherValue);
          if (sub.getAllKeys().size().gt(Integer.ZERO))
            result[key.valueOf()] = sub;
        } else if (thisValue.equals(otherValue ?? new _CompoundTag({}))) {
          result[key.valueOf()] = thisValue;
        }
      }
      return new _CompoundTag(result);
    }
    compoundMinus(other) {
      const result = {};
      for (const key of this.getAllKeys().valueOf()) {
        const thisValue = this.get(key);
        const otherValue = other.get(key);
        if (
          thisValue instanceof _CompoundTag &&
          otherValue instanceof _CompoundTag
        ) {
          const sub = thisValue.compoundMinus(otherValue);
          if (sub.getAllKeys().size().gt(Integer.ZERO))
            result[key.valueOf()] = sub;
        } else if (!thisValue.equals(otherValue ?? new _CompoundTag({}))) {
          result[key.valueOf()] = thisValue;
        }
      }
      return new _CompoundTag(result);
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_COMPOUND) return new iBoolean(false);
      let compoundTag = tag;
      for (const key of Object.values(
        /* @__PURE__ */ new Set([
          ...this.getAllKeys().valueOf(),
          ...compoundTag.getAllKeys().valueOf(),
        ])
      )) {
        if (this.get(key) !== compoundTag.get(key)) return new iBoolean(false);
      }
      return new iBoolean(true);
    }
  };

  // TSFiles/IntegratedDynamicsClasses/Properties.ts
  var Properties = class {
    data;
    constructor(data) {
      this.data = data;
    }
    has(key) {
      return key in this.data;
    }
    set(key, value) {
      this.data[key] = value;
    }
    setAll(newData) {
      for (const [k, v] of newData.getItterator()) {
        this.data[k] = v;
      }
    }
    getItterator() {
      return Object.entries(this.data);
    }
    get(key) {
      return this.data[key];
    }
    toCompoundTag() {
      let result = {};
      for (const [k, v] of Object.entries(this.data)) {
        result[k] = v;
      }
      return new CompoundTag(result);
    }
  };

  // TSFiles/IntegratedDynamicsClasses/Fluid.ts
  var Fluid = class _Fluid {
    static defaultProps = new Properties({
      uname: "",
      amount: Integer.ZERO,
      // block: new Block(),
      lightLevel: Integer.ZERO,
      density: Integer.ZERO,
      temperature: Integer.ZERO,
      viscosity: Integer.ZERO,
      lighterThanAir: new iBoolean(false),
      rarity: "",
      bucketEmptySound: "",
      fluidVaporizeSound: "",
      bucketFillSound: "",
      // bucket: new Item(),
      modName: "",
      nbt: null,
      tagNames: [],
    });
    props;
    constructor(newProps, oldFluid) {
      let props = _Fluid.defaultProps;
      props.setAll(newProps);
      if (oldFluid) props.setAll(oldFluid.getProperties());
      if (!props.has("block"))
        props.set("block", new Block(new Properties({})));
      if (!props.has("item")) props.set("item", new Item(new Properties({})));
      this.props = props;
    }
    getUniqueName() {
      return this.props.get("uname");
    }
    getAmount() {
      return this.props.get("amount");
    }
    getBlock() {
      return this.props.get("block");
    }
    getLightLevel() {
      return this.props.get("lightLevel");
    }
    getDensity() {
      return this.props.get("density");
    }
    getTemperature() {
      return this.props.get("temperature");
    }
    getViscosity() {
      return this.props.get("viscosity");
    }
    isLighterThanAir() {
      return this.props.get("lighterThanAir");
    }
    getRarity() {
      return this.props.get("rarity");
    }
    getBucketEmptySound() {
      return this.props.get("bucketEmptySound");
    }
    getFluidVaporizeSound() {
      return this.props.get("fluidVaporizeSound");
    }
    getBucketFillSound() {
      return this.props.get("bucketFillSound");
    }
    getBucket() {
      return this.props.get("bucket");
    }
    getUname() {
      return this.props.get("uname");
    }
    getModName() {
      return this.props.get("modName");
    }
    getNBT() {
      return this.props.get("nbt");
    }
    getTagNames() {
      return this.props.get("tagNames");
    }
    getProperties() {
      return this.props;
    }
    getSignatureNode() {
      return {
        type: "Fluid",
      };
    }
    equals(other) {
      if (!(other instanceof _Fluid)) return new iBoolean(false);
      else {
        for (const key of Object.keys(this)) {
          if (key == "equals") continue;
          if (this[key] instanceof Function) {
            const thisResult = this[key]();
            const otherResult = other[key]();
            if (!thisResult.equals(otherResult).valueOf())
              return new iBoolean(false);
          }
        }
        return new iBoolean(true);
      }
    }
  };

  // TSFiles/IntegratedDynamicsClasses/Block.ts
  var Block = class _Block {
    static defaultProps = new Properties({
      opaque: new iBoolean(true),
      // item: new Item(),
      modName: "",
      breakSound: "",
      placeSound: "",
      stepSound: "",
      shearable: new iBoolean(false),
      plantAge: new Integer(-1),
      // fluid: new Fluid(),
      fluidCapacity: Integer.ZERO,
      uname: "",
      tagNames: new iArrayEager([]),
      feContainer: new iBoolean(false),
      feCapacity: Integer.ZERO,
      feStored: Integer.ZERO,
      inventory: new iArrayEager([]),
      blockName: "",
    });
    props;
    constructor(newProps, oldBlock) {
      let props = _Block.defaultProps;
      props.setAll(newProps);
      if (oldBlock) props.setAll(oldBlock.getProperties());
      if (!props.has("item")) props.set("item", new Item(new Properties({})));
      if (!props.has("fluid"))
        props.set("fluid", new Fluid(new Properties({})));
      this.props = props;
    }
    isOpaque() {
      return this.props.get("opaque");
    }
    getItem() {
      return this.props.get("item");
    }
    getModName() {
      return this.props.get("modName");
    }
    getBreakSound() {
      return this.props.get("breakSound");
    }
    getPlaceSound() {
      return this.props.get("placeSound");
    }
    getStepSound() {
      return this.props.get("stepSound");
    }
    isShearable() {
      return this.props.get("shearable");
    }
    getPlantAge() {
      return this.props.get("plantAge");
    }
    getProperties() {
      return this.props;
    }
    getFluid() {
      return this.props.get("fluid");
    }
    getFluidCapacity() {
      return this.props.get("fluidCapacity");
    }
    getUniqueName() {
      return this.props.get("uname");
    }
    getTagNames() {
      return this.props.get("tagNames");
    }
    isFeContainer() {
      return this.props.get("feContainer");
    }
    getFeCapacity() {
      return this.props.get("feCapacity");
    }
    getFeStored() {
      return this.props.get("feStored");
    }
    getInventory() {
      return this.props.get("inventory");
    }
    getBlockName() {
      return this.props.get("blockName");
    }
    getStrengthVsBlock() {
      throw new Error("getStrengthVsBlock method not implemented");
    }
    canHarvestBlock() {
      throw new Error("canHarvestBlock method not implemented");
    }
    equals(other) {
      if (!(other instanceof _Block)) return new iBoolean(false);
      else {
        for (const key of Object.keys(this)) {
          if (key == "equals") continue;
          if (this[key] instanceof Function) {
            const thisResult = this[key]();
            const otherResult = other[key]();
            if (!thisResult.equals(otherResult).valueOf())
              return new iBoolean(false);
          }
        }
        return new iBoolean(true);
      }
    }
    getSignatureNode() {
      return {
        type: "Block",
      };
    }
    toString() {
      return this.props.get("blockName");
    }
  };

  // TSFiles/IntegratedDynamicsClasses/Item.ts
  var Item = class _Item {
    props;
    static defaultProps = new Properties({
      size: Integer.ONE,
      maxSize: Integer.SIXTY_FOUR,
      stackable: new iBoolean(true),
      damageable: new iBoolean(false),
      damage: Integer.ZERO,
      maxDamage: Integer.ZERO,
      enchanted: new iBoolean(false),
      enchantable: new iBoolean(false),
      repairCost: Integer.ZERO,
      rarity: new iString(""),
      // fluid: new Fluid(),
      fluidCapacity: Integer.ZERO,
      NBT: new NullTag(),
      uname: new iString(""),
      modName: new iString(""),
      fuelBurnTime: Integer.ZERO,
      fuel: new iBoolean(false),
      tagNames: new iArrayEager([]),
      feContainer: new iBoolean(false),
      feStored: Integer.ZERO,
      feCapacity: Integer.ZERO,
      inventory: new iArrayEager([]),
      tooltip: new iArrayEager([]),
      itemName: new iString(""),
      // block: new Block()
    });
    constructor(newProps, oldItem) {
      let props = _Item.defaultProps;
      props.setAll(newProps);
      if (oldItem) props.setAll(oldItem.getProperties());
      if (!props.has("block"))
        props.set("block", new Block(new Properties({})));
      if (!props.has("fluid"))
        props.set("fluid", new Fluid(new Properties({})));
      this.props = props;
    }
    getSize() {
      return this.props.get("size");
    }
    getMaxSize() {
      return this.props.get("maxSize");
    }
    isStackable() {
      return this.props.get("stackable");
    }
    isDamageable() {
      return this.props.get("damageable");
    }
    getDamage() {
      return this.props.get("damage");
    }
    getMaxDamage() {
      return this.props.get("maxDamage");
    }
    isEnchanted() {
      return this.props.get("enchanted");
    }
    isEnchantable() {
      return this.props.get("enchantable");
    }
    getRepairCost() {
      return this.props.get("repairCost");
    }
    getRarity() {
      return this.props.get("rarity");
    }
    getFluid() {
      return this.props.get("fluid");
    }
    getFluidCapacity() {
      return this.props.get("fluidCapacity");
    }
    getNBT() {
      return this.props.get("NBT");
    }
    getUniqueName() {
      return this.props.get("uname");
    }
    getModName() {
      return this.props.get("modName");
    }
    getFuelBurnTime() {
      return this.props.get("fuelBurnTime");
    }
    isFuel() {
      return this.props.get("fuel");
    }
    getTagNames() {
      return this.props.get("tagNames");
    }
    isFeContainer() {
      return this.props.get("feContainer");
    }
    getFeStored() {
      return this.props.get("feStored");
    }
    getFeCapacity() {
      return this.props.get("feCapacity");
    }
    getInventory() {
      return this.props.get("inventory") || [];
    }
    getTooltip(_player) {
      return this.props.get("tooltip");
    }
    getItemName() {
      return this.props.get("itemName");
    }
    getBlock() {
      return this.props.get("block");
    }
    getProperties() {
      return this.props;
    }
    getStrengthVsBlock(block) {
      if (!(block instanceof Block)) throw new Error("block is not a Block");
      throw new Error("getStrengthVsBlock method not implemented");
    }
    canHarvestBlock(_block) {
      throw new Error("canHarvestBlock method not implemented");
    }
    equals(other) {
      if (!(other instanceof _Item)) return new iBoolean(false);
      else {
        for (const key of Object.keys(this)) {
          if (key == "equals") continue;
          if (this[key] instanceof Function) {
            const thisResult = this[key]();
            const otherResult = other[key]();
            if (!thisResult.equals(otherResult).valueOf())
              return new iBoolean(false);
          }
        }
        return new iBoolean(true);
      }
    }
    getSignatureNode() {
      return {
        type: "Entity",
      };
    }
    toString() {
      return this.props.get("itemName");
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/ITEMSTACK_WITHDATA.ts
  var OPERATOR_ITEMSTACK_WITHDATA = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_withdata",
        nicknames: [
          "ItemstackWithData",
          "itemstack_with_data",
          "itemstackWithData",
          "item_with_data",
          "itemWithData",
          "itemWithNBT",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "NBT",
                },
                to: {
                  type: "Item",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "with_data",
        interactName: "itemstackWithData",
        function: (item) => {
          return (key) => {
            return (value) => {
              let nbt = item.getNBT() || {};
              nbt = nbt.set(key, value);
              return new Item(new Properties({ nbt }), item);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_APPEND.ts
  var OPERATOR_LIST_APPEND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_append",
        nicknames: ["listAppend", "append"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "List", listType: { type: "Any", typeID: 1 } },
            },
          },
          globalMap2
        ),
        symbol: "append",
        interactName: "listAppend",
        function: (list) => {
          return (element) => {
            return list.append(element);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_CONCAT.ts
  var OPERATOR_LIST_CONCAT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_concat",
        nicknames: ["listConcat", "concat"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Any", typeID: 1 } },
              to: { type: "List", listType: { type: "Any", typeID: 1 } },
            },
          },
          globalMap2
        ),
        symbol: "concat",
        interactName: "listConcat",
        function: (list1) => {
          return (list2) => {
            return list1.concat(list2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_CONTAINS.ts
  var OPERATOR_LIST_CONTAINS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_contains",
        nicknames: ["listContains", "contains"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "contains",
        interactName: "listContains",
        function: (list) => {
          return (element) => {
            return list.includes(element);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_CONTAINS_PREDICATE.ts
  var OPERATOR_LIST_CONTAINS_PREDICATE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_contains_p",
        nicknames: [
          "listContainsP",
          "listContainsPredicate",
          "containsPredicate",
          "containsP",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: {
                    type: "Boolean",
                  },
                },
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "contains_p",
        interactName: "listContainsPredicate",
        function: (predicate) => {
          return (list) => {
            return list.some((item) => predicate.apply(item).valueOf());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_COUNT.ts
  var OPERATOR_LIST_COUNT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_count",
        nicknames: ["listCount", "count"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "count",
        interactName: "listCount",
        function: (list) => {
          return (element) => {
            return list.filter((item) => item.equals(element).valueOf()).size();
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_COUNT_PREDICATE.ts
  var OPERATOR_LIST_COUNT_PREDICATE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_count_p",
        nicknames: ["listCountPredicate", "listCountP"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: {
                    type: "Boolean",
                  },
                },
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "count_p",
        interactName: "listCountPredicate",
        function: (list) => {
          return (predicate) => {
            return list.filter((item) => predicate.apply(item)).size();
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_ELEMENT.ts
  var OPERATOR_LIST_ELEMENT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_get",
        nicknames: ["listElement", "get", "listGet"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: { type: "Any", typeID: 1 },
            },
          },
          globalMap2
        ),
        symbol: "get",
        interactName: "listGet",
        function: (index) => {
          return (list) => {
            return list.get(index);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_ELEMENT_DEFAULT.ts
  var OPERATOR_LIST_ELEMENT_DEFAULT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_get_or_default",
        nicknames: [
          "listElementDefault",
          "get_or_default",
          "getOrDefault",
          "listGetOrDefault",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 1 },
              },
            },
          },
          globalMap2
        ),
        symbol: "get_or_default",
        interactName: "listGetOrDefault",
        function: (list) => {
          return (index) => {
            return (defaultValue) => {
              return list.getOrDefault(index, defaultValue);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_EMPTY.ts
  var OPERATOR_LIST_EMPTY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_empty",
        nicknames: ["listEmpty", "listIsEmpty"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "\u2205",
        interactName: "listIsEmpty",
        function: (list) => {
          return list.size().equals(Integer.ZERO);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_EQUALS_MULTISET.ts
  var OPERATOR_LIST_EQUALS_MULTISET = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_equals_multiset",
        nicknames: ["listEqualsMultiset", "equalsMultiset"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Any", typeID: 1 } },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "=multiset=",
        interactName: "listEquals_multiset",
        function: (list1) => {
          return (list2) => {
            if (list1 instanceof iArrayLazy || list2 instanceof iArrayLazy)
              throw new Error(
                "Equals Multiset not supported for infinite lists."
              );
            const newList1 = [...list1.valueOf()].sort();
            const newList2 = [...list2.valueOf()].sort();
            if (newList1.length !== newList2.length) {
              return new iBoolean(false);
            }
            for (let i = 0; i < newList1.length; i++) {
              if (!newList1[i] || !newList2[i]) {
                return new iBoolean(false);
              } else {
                if (!newList1[i].equals(newList2[i])) {
                  return new iBoolean(false);
                }
              }
            }
            return new iBoolean(true);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_EQUALS_SET.ts
  var OPERATOR_LIST_EQUALS_SET = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_equals_set",
        nicknames: ["listEqualsSet", "equalsSet"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Any", typeID: 1 } },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "=set=",
        interactName: "listEquals_set",
        function: (list1) => {
          return (list2) => {
            if (list1 instanceof iArrayLazy || list2 instanceof iArrayLazy)
              throw new Error("Equals Set not supported for infinite lists.");
            const set1 = new Set(list1.valueOf());
            const set2 = new Set(list2.valueOf());
            if (
              set1.size !== set2.size ||
              set1.size !== /* @__PURE__ */ new Set([...set1, ...set2]).size
            )
              return new iBoolean(false);
            return new iBoolean(true);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_HEAD.ts
  var OPERATOR_LIST_HEAD = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_head",
        nicknames: ["listHead", "head"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: { type: "Any", typeID: 1 },
          },
          globalMap2
        ),
        symbol: "head",
        interactName: "listHead",
        function: (list) => {
          if (list.size().equals(Integer.ZERO)) {
            throw new Error("head called on an empty list");
          }
          return list.get(Integer.ZERO);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_INTERSECTION.ts
  var OPERATOR_LIST_INTERSECTION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_intersection",
        nicknames: ["listIntersection", "intersection"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "Any", typeID: 1 } },
              to: { type: "List", listType: { type: "Any", typeID: 1 } },
            },
          },
          globalMap2
        ),
        symbol: "\u2229",
        interactName: "listIntersection",
        function: (list1) => {
          return (list2) => {
            const set1 = new Set(list1.valueOf());
            return list2.filter((item) => set1.has(item));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_LENGTH.ts
  var OPERATOR_LIST_LENGTH = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_length",
        nicknames: ["listLength"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "| |",
        interactName: "listLength",
        function: (list) => {
          return list.size();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_NOT_EMPTY.ts
  var OPERATOR_LIST_NOT_EMPTY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_notempty",
        nicknames: ["listNotEmpty", "listIsNotEmpty"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "o",
        interactName: "listIsNotEmpty",
        function: (list) => {
          return new iBoolean(list.size().gte(Integer.ZERO));
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_SLICE.ts
  var OPERATOR_LIST_SLICE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_slice",
        nicknames: ["listSlice", "slice"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Function",
                from: {
                  type: "Integer",
                },
                to: { type: "List", listType: { type: "Any", typeID: 1 } },
              },
            },
          },
          globalMap2
        ),
        symbol: "slice",
        interactName: "listSlice",
        function: (list) => {
          return (start) => {
            return (end) => {
              if (
                start.lt(Integer.ZERO) ||
                end.gt(list.size()) ||
                start.gt(end)
              ) {
                throw new Error(
                  `Invalid slice range: [${start.toString()}, ${end.toString()}) for list of length ${list.size().toString()}`
                );
              }
              return list.slice(start, end);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_TAIL.ts
  var OPERATOR_LIST_TAIL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_tail",
        nicknames: ["listTail", "tail"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
          globalMap2
        ),
        symbol: "tail",
        interactName: "listTail",
        function: (list) => {
          if (list.size().equals(Integer.ZERO)) {
            throw new Error("tail called on an empty list");
          }
          return list.slice(Integer.ONE);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_UNIQ.ts
  var OPERATOR_LIST_UNIQ = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_uniq",
        nicknames: ["listUniq"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: { type: "List", listType: { type: "Any", typeID: 1 } },
          },
          globalMap2
        ),
        symbol: "uniq",
        interactName: "listUnique",
        function: (list) => {
          const seen = /* @__PURE__ */ new Set();
          return list.filter((item) => {
            if (seen.has(item)) {
              return false;
            } else {
              seen.add(item);
              return true;
            }
          });
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_UNIQ_PREDICATE.ts
  var OPERATOR_LIST_UNIQ_PREDICATE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_uniq_p",
        nicknames: ["listUniqPredicate", "uniq_p", "list_uniq_p"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Any", typeID: 1 } },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: {
                    type: "Function",
                    from: { type: "Any", typeID: 1 },
                    to: {
                      type: "Boolean",
                    },
                  },
                },
              },
              to: { type: "List", listType: { type: "Any", typeID: 1 } },
            },
          },
          globalMap2
        ),
        symbol: "uniq_p",
        interactName: "listUniquePredicate",
        function: (list) => {
          return (predicate) => {
            const seen = /* @__PURE__ */ new Set();
            return list.filter((item) => {
              const key = predicate.apply(item);
              if (seen.has(key)) {
                return false;
              } else {
                seen.add(key);
                return true;
              }
            });
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LOGICAL_AND.ts
  var OPERATOR_LOGICAL_AND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:logical_and",
        nicknames: ["and", "logicalAnd"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Function",
              from: {
                type: "Boolean",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "&&",
        interactName: "booleanAnd",
        function: (bool1) => {
          return (bool2) => {
            return new iBoolean(bool1.valueOf() && bool2.valueOf());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LOGICAL_NAND.ts
  var OPERATOR_LOGICAL_NAND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:logical_nand",
        nicknames: ["nand", "logicalNand"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Function",
              from: {
                type: "Boolean",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "!&&",
        interactName: "booleanNand",
        function: (bool1) => {
          return (bool2) => {
            return new iBoolean(!(bool1.valueOf() && bool2.valueOf()));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LOGICAL_NOR.ts
  var OPERATOR_LOGICAL_NOR = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:logical_nor",
        nicknames: ["nor", "logicalNor"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Function",
              from: {
                type: "Boolean",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "!||",
        interactName: "booleanNor",
        function: (bool1) => {
          return (bool2) => {
            return new iBoolean(!(bool1.valueOf() || bool2.valueOf()));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LOGICAL_NOT.ts
  var OPERATOR_LOGICAL_NOT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:logical_not",
        nicknames: ["not", "logicalNot"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "!",
        interactName: "booleanNot",
        function: (bool) => {
          return new iBoolean(!bool.valueOf());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LOGICAL_OR.ts
  var OPERATOR_LOGICAL_OR = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:logical_or",
        nicknames: ["or", "logicalOr"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "Function",
              from: {
                type: "Boolean",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "||",
        interactName: "booleanOr",
        function: (bool1) => {
          return (bool2) => {
            return new iBoolean(bool1.valueOf() || bool2.valueOf());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LONG_TO_DOUBLE.ts
  var OPERATOR_LONG_TO_DOUBLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double",
        nicknames: ["longToDouble", "longDouble", "longLongToDouble"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Long",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "()",
        interactName: "longLongToDouble",
        function: (long) => {
          return long.toDouble();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LONG_TO_INTEGER.ts
  var OPERATOR_LONG_TO_INTEGER = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer",
        nicknames: ["longToInt", "longInteger", "longToInteger"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Long",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "()",
        interactName: "longLongToInteger",
        function: (long) => {
          return long.toInteger();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NAMED_NAME.ts
  var OPERATOR_NAMED_NAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_name",
        nicknames: ["name", "namedName", "toString"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Named",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "name",
        interactName: "namedName",
        function: (named) => {
          return new iString(named.toString());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_BOOLEAN.ts
  var OPERATOR_NBT_AS_BOOLEAN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_iBoolean",
        nicknames: ["nbtAsBoolean"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "NBT.as_iBoolean",
        interactName: "nbtAsBoolean",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_BYTE) {
            return new iBoolean(!!nbt.valueOf().toJSNumber());
          } else {
            return new iBoolean(false);
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_BYTE.ts
  var OPERATOR_NBT_AS_BYTE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_byte",
        nicknames: ["nbtAsByte"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "NBT.as_byte",
        interactName: "nbtAsByte",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_INT) {
            return nbt.valueOf();
          } else {
            return Integer.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_BYTE_LIST.ts
  var OPERATOR_NBT_AS_BYTE_LIST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_byte_list",
        nicknames: ["nbtAsByteList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: { type: "List", listType: { type: "Integer" } },
          },
          globalMap2
        ),
        symbol: "NBT.as_byte_list",
        interactName: "nbtAsByteList",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_LIST) {
            const list = nbt.valueOf();
            if (!list.every((e) => e.getType() == Tag.TAG_INT))
              return new iArrayEager([]);
            return list.map(
              new Operator({
                function: (e) => e.valueOf(),
                parsedSignature: new ParsedSignature(
                  {
                    type: "Function",
                    from: { type: "Any", typeID: 1 },
                    to: { type: "Any", typeID: 2 },
                  },
                  globalMap2
                ),
              })
            );
          } else {
            return new iArrayEager([]);
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_DOUBLE.ts
  var OPERATOR_NBT_AS_DOUBLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_double",
        nicknames: ["nbtAsDouble"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "NBT.as_double",
        interactName: "nbtAsDouble",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_DOUBLE) {
            return nbt.valueOf();
          } else {
            return Double.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_FLOAT.ts
  var OPERATOR_NBT_AS_FLOAT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_float",
        nicknames: ["nbtAsFloat"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "NBT.as_float",
        interactName: "nbtAsFloat",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_DOUBLE) {
            return nbt.valueOf();
          } else {
            return Double.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_INT.ts
  var OPERATOR_NBT_AS_INT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_int",
        nicknames: ["nbtAsInt"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "NBT.as_int",
        interactName: "nbtAsInt",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_INT) {
            return nbt.valueOf();
          } else {
            return Integer.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_INT_LIST.ts
  var OPERATOR_NBT_AS_INT_LIST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_int_list",
        nicknames: ["nbtAsIntList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: { type: "List", listType: { type: "Integer" } },
          },
          globalMap2
        ),
        symbol: "NBT.as_int_list",
        interactName: "nbtAsIntList",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_LIST) {
            const list = nbt.valueOf();
            if (!list.every((e) => e.getType() == Tag.TAG_INT))
              return new iArrayEager([]);
            return list.map(
              new Operator({
                function: (e) => e.valueOf(),
                parsedSignature: new ParsedSignature(
                  {
                    type: "Function",
                    from: { type: "Any", typeID: 1 },
                    to: { type: "Any", typeID: 2 },
                  },
                  globalMap2
                ),
              })
            );
          } else {
            return new iArrayEager([]);
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_LONG.ts
  var OPERATOR_NBT_AS_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_long",
        nicknames: ["nbtAsLong"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Long",
            },
          },
          globalMap2
        ),
        symbol: "NBT.as_long",
        interactName: "nbtAsLong",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_LONG) {
            return nbt.valueOf();
          } else {
            return Long.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_LONG_LIST.ts
  var OPERATOR_NBT_AS_LONG_LIST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_long_list",
        nicknames: ["nbtAsLongList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: { type: "List", listType: { type: "Long" } },
          },
          globalMap2
        ),
        symbol: "NBT.as_long_list",
        interactName: "nbtAsLongList",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_LIST) {
            const list = nbt.valueOf();
            if (!list.every((e) => e.getType() == Tag.TAG_LONG))
              return new iArrayEager([]);
            return list.map(
              new Operator({
                function: (e) => e.valueOf(),
                parsedSignature: new ParsedSignature(
                  {
                    type: "Function",
                    from: { type: "Any", typeID: 1 },
                    to: { type: "Any", typeID: 2 },
                  },
                  globalMap2
                ),
              })
            );
          } else {
            return new iArrayEager([]);
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_SHORT.ts
  var OPERATOR_NBT_AS_SHORT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_short",
        nicknames: ["nbtAsShort"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "NBT.as_short",
        interactName: "nbtAsShort",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_INT) {
            return nbt.valueOf();
          } else {
            return Integer.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_STRING.ts
  var OPERATOR_NBT_AS_STRING = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_string",
        nicknames: ["nbtAsString"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "NBT.as_string",
        interactName: "nbtAsString",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_STRING) {
            return nbt.valueOf();
          } else {
            return new iString("");
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_AS_TAG_LIST.ts
  var OPERATOR_NBT_AS_TAG_LIST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_as_tag_list",
        nicknames: ["nbtAsTagList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: { type: "List", listType: { type: "NBT" } },
          },
          globalMap2
        ),
        symbol: "NBT.as_tag_list",
        interactName: "nbtAsTagList",
        function: (nbt) => {
          if (nbt.getType() === Tag.TAG_LIST) {
            return nbt.valueOf();
          } else {
            return new iArrayEager([]);
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_HASKEY.ts
  var OPERATOR_NBT_COMPOUND_HASKEY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_haskey",
        nicknames: ["nbtCompoundHaskey", "NBTHasKey"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.has_key",
        interactName: "nbtHasKey",
        function: (nbt) => {
          return (key) => {
            return new iBoolean(nbt.has(key));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_INTERSECTION.ts
  var OPERATOR_NBT_COMPOUND_INTERSECTION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_intersection",
        nicknames: ["nbtCompoundIntersection", "NBTIntersection"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.\u2229",
        interactName: "nbtIntersection",
        function: (nbt1) => {
          return (nbt2) => {
            return nbt1.compoundIntersection(nbt2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_KEYS.ts
  var OPERATOR_NBT_COMPOUND_KEYS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_keys",
        nicknames: ["nbtCompoundKeys", "NBTKeys"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: { type: "List", listType: { type: "String" } },
          },
          globalMap2
        ),
        symbol: "NBT{}.keys",
        interactName: "nbtKeys",
        function: (nbt) => {
          return nbt.getAllKeys();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_MINUS.ts
  var OPERATOR_NBT_COMPOUND_MINUS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_minus",
        nicknames: ["nbtCompoundMinus", "NBTMinus"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.\u2216",
        interactName: "nbtMinus",
        function: (nbt1) => {
          return (nbt2) => {
            return nbt1.compoundMinus(nbt2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_SIZE.ts
  var OPERATOR_NBT_COMPOUND_SIZE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_size",
        nicknames: ["nbtCompoundSize", "NBTSize"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.size",
        interactName: "nbtSize",
        function: (nbt) => {
          return nbt.getAllKeys().size();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_SUBSET.ts
  var OPERATOR_NBT_COMPOUND_SUBSET = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_subset",
        nicknames: ["nbtCompoundSubset", "NBTSubset"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.\u2286",
        interactName: "nbtIsSubset",
        function: (subSet) => {
          return (superSet) => {
            return new iBoolean(superSet.compoundSubset(subSet));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_UNION.ts
  var OPERATOR_NBT_COMPOUND_UNION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_union",
        nicknames: ["nbtCompoundUnion", "NBTUnion"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.\u222A",
        interactName: "nbtUnion",
        function: (nbt1) => {
          return (nbt2) => {
            return nbt1.compoundUnion(nbt2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_BOOLEAN.ts
  var OPERATOR_NBT_COMPOUND_VALUE_BOOLEAN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_iBoolean",
        nicknames: ["nbtCompoundValueBoolean", "compoundValueBoolean"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_iBoolean",
        interactName: "nbtGetBoolean",
        function: (nbt) => {
          return (key) => {
            const result = nbt.get(key).valueOf();
            if (!(result instanceof iBoolean)) return new iBoolean(false);
            return result;
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_COMPOUND.ts
  var OPERATOR_NBT_COMPOUND_VALUE_COMPOUND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_compound",
        nicknames: ["nbtCompoundValueCompound", "compoundValueNBT"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_compound",
        interactName: "nbtGetCompound",
        function: (nbt) => {
          return (key) => {
            let value = nbt.get(key);
            if (value.getType() === Tag.TAG_COMPOUND) {
              return value;
            }
            throw new Error(
              `${key} is not a Compound in ${JSON.stringify(nbt.toJSON())}`
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_DOUBLE.ts
  var OPERATOR_NBT_COMPOUND_VALUE_DOUBLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_double",
        nicknames: ["nbtCompoundValueDouble", "compoundValueDouble"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Double",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_double",
        interactName: "nbtGetDouble",
        function: (nbt) => {
          return (key) => {
            let value = nbt.get(key);
            if (value.getType() === Tag.TAG_DOUBLE) {
              return value.valueOf();
            }
            throw new Error(
              `${key} is not a double in ${JSON.stringify(nbt.toJSON())}`
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_INTEGER.ts
  var OPERATOR_NBT_COMPOUND_VALUE_INTEGER = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_integer",
        nicknames: ["nbtCompoundValueInteger", "compoundValueInteger"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_integer",
        interactName: "nbtGetInteger",
        function: (nbt) => {
          return (key) => {
            let value = nbt.get(key);
            if (value.getType() != Tag.TAG_INT)
              throw new Error(
                `${key} is not an integer in ${JSON.stringify(nbt.toJSON())}`
              );
            return value.valueOf();
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_LIST_BYTE.ts
  var OPERATOR_NBT_COMPOUND_VALUE_LIST_BYTE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_list_byte",
        nicknames: ["nbtCompoundValueListByte", "compoundValueListByte"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "Integer" } },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_list_byte",
        interactName: "nbtGetListByte",
        function: (nbt) => {
          return (key) => {
            let value = nbt.get(key);
            if (value.getType() !== Tag.TAG_LIST)
              return new iArrayEager([Integer.ZERO]);
            let list = value.valueOf();
            return list.map(
              new Operator({
                function: (e) => e.valueOf(),
                parsedSignature: new ParsedSignature(
                  {
                    type: "Function",
                    from: { type: "NBT" },
                    to: { type: "Integer" },
                  },
                  globalMap2
                ),
              })
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_LIST_INT.ts
  var OPERATOR_NBT_COMPOUND_VALUE_LIST_INT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_list_int",
        nicknames: ["nbtCompoundValueListInt", "compoundValueListInteger"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "Integer" } },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_list_int",
        interactName: "nbtGetListInt",
        function: (nbt) => {
          return (key) => {
            let value = nbt.get(key);
            if (value.getType() != Tag.TAG_LIST)
              throw new Error(
                `${key} is not a list of int in ${JSON.stringify(nbt.toJSON())}`
              );
            let list = value.getArray();
            if (!list.every((e) => e.getType() == Tag.TAG_INT))
              throw new Error(
                `${key} is not a list of int in ${JSON.stringify(nbt.toJSON())}`
              );
            return list.map(
              new Operator({
                function: (e) => e.valueOf(),
                parsedSignature: new ParsedSignature(
                  {
                    type: "Function",
                    from: { type: "NBT" },
                    to: { type: "Integer" },
                  },
                  globalMap2
                ),
              })
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_LIST_LONG.ts
  var OPERATOR_NBT_COMPOUND_VALUE_LIST_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_list_long",
        nicknames: ["nbtCompoundValueListLong", "compoundValueListLong"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "Long" } },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_list_long",
        interactName: "nbtGetListLong",
        function: (nbt) => {
          return (key) => {
            let value = nbt.get(key);
            if (value.getType() != Tag.TAG_LIST)
              throw new Error(
                `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
              );
            let list = value.getArray();
            if (!list.every((e) => e.getType() == Tag.TAG_LONG))
              throw new Error(
                `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
              );
            return list.map(
              new Operator({
                function: (e) => e.valueOf(),
                parsedSignature: new ParsedSignature(
                  {
                    type: "Function",
                    from: { type: "NBT" },
                    to: { type: "Long" },
                  },
                  globalMap2
                ),
              })
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_LIST_TAG.ts
  var OPERATOR_NBT_COMPOUND_VALUE_LIST_TAG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_list_tag",
        nicknames: [
          "nbtCompoundValueListTag",
          "nbtCompoundValueList",
          "compoundValueListNBT",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "NBT" } },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_list_tag",
        interactName: "nbtGetListTag",
        function: (nbt) => {
          return (key) => {
            if (!nbt.has(key))
              throw new Error(
                `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
              );
            let listTag = nbt.get(key);
            if (listTag.getType() != Tag.TAG_LIST)
              throw new Error(
                `${key} is not a list of NBT in ${JSON.stringify(nbt.toJSON())}`
              );
            return listTag.getArray();
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_LONG.ts
  var OPERATOR_NBT_COMPOUND_VALUE_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_long",
        nicknames: ["nbtCompoundValueLong", "compoundValueLong"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Long",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_long",
        interactName: "nbtGetLong",
        function: (nbt) => {
          return (key) => {
            let value = nbt.get(key);
            if (value.getType() === Tag.TAG_LONG) {
              return value.valueOf();
            }
            throw new Error(
              `${key} is not a long in ${JSON.stringify(nbt.toJSON())}`
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_STRING.ts
  var OPERATOR_NBT_COMPOUND_VALUE_STRING = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_string",
        nicknames: ["nbtCompoundValueString", "compoundValueString"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_string",
        interactName: "nbtGetString",
        function: (nbt) => {
          return (key) => {
            let value = nbt.get(key);
            if (value.getType() === Tag.TAG_STRING) {
              return value.valueOf();
            }
            throw new Error(
              `${key} is not a string in ${JSON.stringify(nbt.toJSON())}`
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_TAG.ts
  var OPERATOR_NBT_COMPOUND_VALUE_TAG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_value_tag",
        nicknames: ["nbtCompoundValueTag", "compoundValueAny"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.get_tag",
        interactName: "nbtGetTag",
        function: (nbt) => {
          return (key) => {
            return nbt.get(key);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_VALUE_TYPE.ts
  var OPERATOR_NBT_COMPOUND_VALUE_TYPE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_type",
        nicknames: ["nbtCompoundValueType", "NBTValueType"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.type",
        interactName: "nbtType",
        function: (nbt) => {
          return (key) => {
            if (!nbt.has(key)) {
              throw new Error(
                `${key} does not exist in ${JSON.stringify(nbt)}`
              );
            }
            return nbt.get(key).getTypeAsString();
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_BOOLEAN.ts
  var OPERATOR_NBT_COMPOUND_WITH_BOOLEAN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_iBoolean",
        nicknames: ["nbtCompoundWithBoolean", "NBTWithBoolean"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "Boolean",
                },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_iBoolean",
        interactName: "nbtWithBoolean",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(
                key.valueOf(),
                new ByteTag(new Integer(+value.valueOf()))
              );
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_COMPOUND.ts
  var OPERATOR_NBT_COMPOUND_WITH_COMPOUND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_tag",
        nicknames: ["nbtCompoundWithCompound", "NBTWithNBT"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "NBT",
                },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_tag",
        interactName: "nbtWithTag",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(key.valueOf(), value);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_DOUBLE.ts
  var OPERATOR_NBT_COMPOUND_WITH_DOUBLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_double",
        nicknames: ["nbtCompoundWithDouble", "NBTWithDouble"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "Double",
                },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_double",
        interactName: "nbtWithDouble",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(key.valueOf(), new DoubleTag(value));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/FloatTag.ts
  var FloatTag = class _FloatTag extends NumericTag {
    data;
    getType() {
      return Tag.TAG_FLOAT;
    }
    constructor(data) {
      super();
      this.data = data;
    }
    static valueOf(value) {
      return new _FloatTag(value);
    }
    valueOf() {
      return this.data;
    }
    getAsDouble() {
      return this.data.toJSNumber();
    }
    getTypeAsString() {
      return new iString("FloatTag");
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_FLOAT) return new iBoolean(false);
      return new iBoolean(this.getAsDouble() == tag.getAsDouble());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_FLOAT.ts
  var OPERATOR_NBT_COMPOUND_WITH_FLOAT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_float",
        nicknames: ["nbtCompoundWithFloat", "NBTWithFloat"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "Double",
                },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_float",
        interactName: "nbtWithFloat",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(key.valueOf(), new FloatTag(value));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_INTEGER.ts
  var OPERATOR_NBT_COMPOUND_WITH_INTEGER = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_integer",
        nicknames: ["nbtCompoundWithInteger", "NBTWithInteger"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "Integer",
                },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_integer",
        interactName: "nbtWithInteger",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(key.valueOf(), new IntTag(value));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_LIST_BYTE.ts
  var OPERATOR_NBT_COMPOUND_WITH_LIST_BYTE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_list_byte",
        nicknames: ["nbtCompoundWithListByte", "NBTWithByteList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: { type: "List", listType: { type: "Integer" } },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_byte_list",
        interactName: "nbtWithByteList",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              const nativeArray = value.valueOf();
              const mappedTags = nativeArray.map((e) => new ByteTag(e));
              const tagArray = new iArrayEager(mappedTags);
              return nbt.set(key.valueOf(), new ListTag(tagArray));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_LIST_INT.ts
  var OPERATOR_NBT_COMPOUND_WITH_LIST_INT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_list_int",
        nicknames: ["nbtCompoundWithListInt", "NBTWithIntegerList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: { type: "List", listType: { type: "Integer" } },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_int_list",
        interactName: "nbtWithIntList",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              const nativeArray = value.valueOf();
              const mappedTags = nativeArray.map((e) => new IntTag(e));
              const tagArray = new iArrayEager(mappedTags);
              return nbt.set(key.valueOf(), new ListTag(tagArray));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_LIST_LONG.ts
  var OPERATOR_NBT_COMPOUND_WITH_LIST_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_list_long",
        nicknames: ["nbtCompoundWithListLong", "NBTWithLongList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: { type: "List", listType: { type: "Long" } },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_list_long",
        interactName: "nbtWithListLong",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              const nativeArray = value.valueOf();
              const mappedTags = nativeArray.map((e) => new LongTag(e));
              const tagArray = new iArrayEager(mappedTags);
              return nbt.set(key.valueOf(), new ListTag(tagArray));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_LIST_TAG.ts
  var OPERATOR_NBT_COMPOUND_WITH_LIST_TAG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_list_tag",
        nicknames: ["nbtCompoundWithListTag", "NBTWithNBTList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: { type: "List", listType: { type: "NBT" } },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_tag_list",
        interactName: "nbtWithTagList",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(key.valueOf(), value);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_LONG.ts
  var OPERATOR_NBT_COMPOUND_WITH_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_long",
        nicknames: ["nbtCompoundWithLong", "NBTWithLong"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "Long",
                },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_long",
        interactName: "nbtWithLong",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(key.valueOf(), new LongTag(value));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ShortTag.ts
  var ShortTag = class _ShortTag extends NumericTag {
    data;
    constructor(data) {
      super();
      this.data = data;
    }
    getType() {
      return Tag.TAG_Short;
    }
    static valueOf(value) {
      return new _ShortTag(value);
    }
    valueOf() {
      return this.data;
    }
    getAsDouble() {
      return this.data.toJSNumber();
    }
    getTypeAsString() {
      return new iString("ShortTag");
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_Short) return new iBoolean(false);
      return new iBoolean(this.valueOf() == tag.valueOf());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_SHORT.ts
  var OPERATOR_NBT_COMPOUND_WITH_SHORT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_short",
        nicknames: ["nbtCompoundWithShort", "NBTWithShort"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "Integer",
                },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_short",
        interactName: "nbtWithShort",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(key.valueOf(), new ShortTag(value));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/StringTag.ts
  var StringTag = class extends Tag {
    data;
    constructor(data) {
      super();
      this.data = data;
    }
    getType() {
      return Tag.TAG_STRING;
    }
    valueOf() {
      return this.data;
    }
    getTypeAsString() {
      return new iString("StringTag");
    }
    equals(other) {
      if (other.getType() != Tag.TAG_STRING) return new iBoolean(false);
      return new iBoolean(this.data == other.valueOf());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITH_STRING.ts
  var OPERATOR_NBT_COMPOUND_WITH_STRING = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_with_string",
        nicknames: ["nbtCompoundWithString", "NBTWithString"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "String",
                },
                to: {
                  type: "NBT",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.with_string",
        interactName: "nbtWithString",
        function: (nbt) => {
          return (key) => {
            return (value) => {
              return nbt.set(key.valueOf(), new StringTag(value));
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_COMPOUND_WITHOUT.ts
  var OPERATOR_NBT_COMPOUND_WITHOUT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_compound_without",
        nicknames: ["nbtCompoundWithout", "NBTWithout"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "NBT",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT{}.without",
        interactName: "nbtWithout",
        function: (nbt) => {
          return (key) => {
            return nbt.without(key.valueOf());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_BOOLEAN.ts
  var OPERATOR_NBT_FROM_BOOLEAN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_iBoolean",
        nicknames: ["nbtFromBoolean"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Boolean",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_iBoolean",
        interactName: "booleanAsNbt",
        function: (bool) => {
          return new ByteTag(new Integer(+bool.valueOf()));
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_BYTE.ts
  var OPERATOR_NBT_FROM_BYTE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_byte",
        nicknames: ["nbtFromByte"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_byte",
        interactName: "byteAsNbt",
        function: (byte) => {
          return new IntTag(byte);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_BYTE_LIST.ts
  var OPERATOR_NBT_FROM_BYTE_LIST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_byte_list",
        nicknames: ["nbtFromByteList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Integer" } },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_byte_list",
        interactName: "byteListAsNbt",
        function: (byteList) => {
          const nativeArray = byteList.valueOf();
          const mappedTags = nativeArray.map((e) => new ByteTag(e));
          const tagArray = new iArrayEager(mappedTags);
          return new ListTag(tagArray);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_DOUBLE.ts
  var OPERATOR_NBT_FROM_DOUBLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_double",
        nicknames: ["nbtFromDouble"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_double",
        interactName: "doubleAsNbt",
        function: (double) => {
          return new DoubleTag(double);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_FLOAT.ts
  var OPERATOR_NBT_FROM_FLOAT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_float",
        nicknames: ["nbtFromFloat"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Double",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_float",
        interactName: "floatAsNbt",
        function: (float) => {
          return new FloatTag(float);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_INT.ts
  var OPERATOR_NBT_FROM_INT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_int",
        nicknames: ["nbtFromInt"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_int",
        interactName: "integerAsNbt",
        function: (int) => {
          return new IntTag(int);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_INT_LIST.ts
  var OPERATOR_NBT_FROM_INT_LIST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_int_list",
        nicknames: ["nbtFromIntList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Integer" } },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_int_list",
        interactName: "intListAsNbt",
        function: (intList) => {
          const nativeArray = intList.valueOf();
          const mappedTags = nativeArray.map((e) => new IntTag(e));
          const tagArray = new iArrayEager(mappedTags);
          return new ListTag(tagArray);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_LONG.ts
  var OPERATOR_NBT_FROM_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_long",
        nicknames: ["nbtFromLong"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Long",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_long",
        interactName: "longAsNbt",
        function: (long) => {
          return new LongTag(long);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_LONG_LIST.ts
  var OPERATOR_NBT_FROM_LONG_LIST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_long_list",
        nicknames: ["nbtFromLongList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "Long" } },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_long_list",
        interactName: "longListAsNbt",
        function: (longList) => {
          const nativeArray = longList.valueOf();
          const mappedTags = nativeArray.map((e) => new LongTag(e));
          const tagArray = new iArrayEager(mappedTags);
          return new ListTag(tagArray);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_SHORT.ts
  var OPERATOR_NBT_FROM_SHORT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_short",
        nicknames: ["nbtFromShort"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_short",
        interactName: "shortAsNbt",
        function: (short) => {
          return new ShortTag(short);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_STRING.ts
  var OPERATOR_NBT_FROM_STRING = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_string",
        nicknames: ["nbtFromString"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_string",
        interactName: "stringAsNbt",
        function: (str) => {
          return new StringTag(str);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_FROM_TAG_LIST.ts
  var OPERATOR_NBT_FROM_TAG_LIST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_from_tag_list",
        nicknames: ["nbtFromTagList"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "List", listType: { type: "NBT" } },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT.from_tag_list",
        interactName: "tagListAsNbt",
        function: (tagList) => {
          return new ListTag(tagList);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NBTPathExecutionContext.ts
  var NbtPathExpressionExecutionContext = class _NbtPathExpressionExecutionContext {
    currentTag;
    parentContext;
    constructor(currentTag, parentContext) {
      this.currentTag = currentTag;
      this.parentContext = parentContext;
    }
    getCurrentTag() {
      return this.currentTag;
    }
    getParentContext() {
      return this.parentContext;
    }
    getRootContext() {
      const parent = this.getParentContext();
      return parent ? parent.getRootContext() : this;
    }
    equals(obj) {
      if (!(obj instanceof _NbtPathExpressionExecutionContext)) {
        return new iBoolean(false);
      }
      let that = obj;
      return this.getCurrentTag().equals(that.getCurrentTag());
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/NbtParseException.ts
  var NbtParseException = class extends Error {
    constructor(msg) {
      super(msg);
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/INbtPathExpression.ts
  var INbtPathExpression = class {
    /**
     * Find all matches for the given stream of NBT tags or a single tag.
     * @param nbts A stream of NBT tags or tag.
     * @return The matches.
     */
    match(nbts) {
      if (Array.isArray(nbts))
        return this.matchContexts(
          nbts.map((nbt) => new NbtPathExpressionExecutionContext(nbt))
        );
      else return this.match([nbts]);
    }
    /**
     * Test if any of the given NBT tags or tag in the given stream match with the expression.
     * @param nbts A stream of NBT tags or singular tag.
     * @return True if there is at least one match.
     */
    test(nbts) {
      if (!Array.isArray(nbts)) return this.test([nbts]);
      return (
        this.match([nbts[0]])
          .getMatches()
          .filter(
            (tag) =>
              tag.getType() != Tag.TAG_BYTE || tag.valueOf().toJSNumber() === 1
          ).length != 0
      );
    }
    /**
     * Find all matches for the given stream of NBT tags.
     * @param executionContexts A stream of NBT execution contexts.
     * @return The matches.
     */
    matchContexts(_executionContexts) {
      throw new Error(
        "matchContexts from INbtPathExpression.ts should not have been called!"
      );
    }
    /**
     * Create a navigation for this expression with the given navigation as child.
     * If a null child is passed, the created navigation is a leaf.
     * @param child An option child.
     * @return A navigation path.
     * @throws NbtParseException If this expression can not be expressed as a navigation.
     */
    asNavigation(_child) {
      if (arguments.length === 0) return this.asNavigation();
      throw new NbtParseException(
        "This NBT Path expression has no navigation keys."
      );
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/NbtPathExpressionMatches.ts
  var NbtPathExpressionMatches = class _NbtPathExpressionMatches {
    EMPTY = _NbtPathExpressionMatches.forAll();
    matches;
    constructor(matches) {
      this.matches = matches;
    }
    getContexts() {
      return this.matches;
    }
    getMatches() {
      return this.getContexts().map((e) => e.getCurrentTag());
    }
    static forAll(...nbts) {
      return new _NbtPathExpressionMatches(nbts);
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/NbtPathExpressionList.ts
  var NbtPathExpressionList = class extends INbtPathExpression {
    subExpressions;
    constructor(...subExpressions) {
      super();
      this.subExpressions = subExpressions;
    }
    matchContexts(executionContexts) {
      let matches = new NbtPathExpressionMatches(executionContexts);
      for (const subExpression of this.subExpressions) {
        matches = subExpression.matchContexts(matches.getContexts());
      }
      return matches;
    }
    getSubExpressions() {
      return this.subExpressions;
    }
    asNavigation(_child) {
      let current;
      for (let i = this.subExpressions.length - 1; i >= 0; i--) {
        if (current) {
          current = this.subExpressions[i].asNavigation(current);
        } else {
          current = this.subExpressions[i].asNavigation();
        }
      }
      return current;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/INbtPathExpressionParseHandler.ts
  var HandleResult = class _HandleResult {
    static INVALID = new _HandleResult(void 0, 0);
    prefixExpression;
    consumedExpressionLength;
    constructor(prefixExpression, consumedExpressionLength) {
      this.prefixExpression = prefixExpression;
      this.consumedExpressionLength = consumedExpressionLength;
    }
    /**
     * @return If the handler could produce a valid expression.
     */
    isValid() {
      return this.getPrefixExpression() != null;
    }
    /**
     * @return The expression (for a part) of the given string expression.
     */
    getPrefixExpression() {
      return this.prefixExpression;
    }
    /**
     * @return The length of the string expression that was consumed.
     */
    getConsumedExpressionLength() {
      return this.consumedExpressionLength;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/navigate/NbtPathNavigationLinkWildcard.ts
  var NbtPathNavigationLinkWildcard = class {
    child;
    constructor(child) {
      this.child = child;
    }
    isLeafKey(_key) {
      return false;
    }
    getNext(_key) {
      return this.child;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/navigate/NbtPathNavigationLeafWildcard.ts
  var NbtPathNavigationLeafWildcard = class _NbtPathNavigationLeafWildcard {
    static INSTANCE = new _NbtPathNavigationLeafWildcard();
    constructor() {}
    isLeafKey(_key) {
      return true;
    }
    getNext(_key) {
      return void 0;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerAllChildren.ts
  var NbtPathExpressionParseHandlerAllChildren = class _NbtPathExpressionParseHandlerAllChildren {
    handlePrefixOf(nbtPathExpression, pos) {
      if (nbtPathExpression.charAt(pos) != "*") {
        return HandleResult.INVALID;
      }
      return new HandleResult(
        _NbtPathExpressionParseHandlerAllChildren.Expression.INSTANCE,
        1
      );
    }
    static Expression = class Expression extends INbtPathExpression {
      static INSTANCE =
        new _NbtPathExpressionParseHandlerAllChildren.Expression();
      matchContexts(executionContexts) {
        return new NbtPathExpressionMatches(
          executionContexts
            .flatMap((executionContext) => {
              let nbt = executionContext.getCurrentTag();
              if (nbt.getType() === Tag.TAG_LIST) {
                let tag = nbt;
                return tag
                  .getArray()
                  .valueOf()
                  .map(
                    (subTag) =>
                      new NbtPathExpressionExecutionContext(
                        subTag,
                        executionContext
                      )
                  );
              } else if (nbt.getType() === Tag.TAG_COMPOUND) {
                let tag = nbt;
                return tag
                  .getAllKeys()
                  .valueOf()
                  .map(
                    (key) =>
                      new NbtPathExpressionExecutionContext(
                        tag.get(key),
                        executionContext
                      )
                  );
              }
              return null;
            })
            .filter((e) => !(e === null))
        );
      }
      asNavigation(child) {
        return child == child
          ? new NbtPathNavigationLinkWildcard(child)
          : NbtPathNavigationLeafWildcard.INSTANCE;
      }
    };
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalAdapter.ts
  var NbtPathExpressionParseHandlerBooleanRelationalAdapter = class _NbtPathExpressionParseHandlerBooleanRelationalAdapter {
    regex;
    constructor(relation) {
      this.regex = new RegExp(`^ *${relation} *([0-9]+(\\.[0-9]+)?)`);
    }
    handlePrefixOf(nbtPathExpression, pos) {
      let match = this.regex.exec(nbtPathExpression.slice(pos));
      if (!match) {
        return HandleResult.INVALID;
      }
      let targetDoubleString = match[1];
      let targetDouble = Number(targetDoubleString);
      return new HandleResult(
        new _NbtPathExpressionParseHandlerBooleanRelationalAdapter.Expression(
          targetDouble,
          this
        ),
        match[0].length
      );
    }
    static Expression;
  };
  var Expression = class extends INbtPathExpression {
    targetDouble;
    handler;
    constructor(targetDouble, handler) {
      super();
      this.targetDouble = targetDouble;
      this.handler = handler;
    }
    getTargetDouble() {
      return this.targetDouble;
    }
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts.map((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt instanceof NumericTag) {
            let tag = nbt;
            return new NbtPathExpressionExecutionContext(
              ByteTag.valueOf(
                new Integer(
                  this.handler.getRelationalValue(
                    tag.getAsDouble(),
                    this.getTargetDouble()
                  )
                    ? 1
                    : 0
                )
              ),
              executionContext
            );
          }
          return new NbtPathExpressionExecutionContext(
            ByteTag.valueOf(Integer.ZERO),
            executionContext
          );
        })
      );
    }
  };
  NbtPathExpressionParseHandlerBooleanRelationalAdapter.Expression = Expression;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalEqual.ts
  var NbtPathExpressionParseHandlerBooleanRelationalEqual = class extends NbtPathExpressionParseHandlerBooleanRelationalAdapter {
    constructor() {
      super("==");
    }
    getRelationalValue(left, right) {
      return left == right;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalGreaterThan.ts
  var NbtPathExpressionParseHandlerBooleanRelationalGreaterThan = class extends NbtPathExpressionParseHandlerBooleanRelationalAdapter {
    constructor() {
      super(">");
    }
    getRelationalValue(left, right) {
      return left > right;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalGreaterThanOrEqual.ts
  var NbtPathExpressionParseHandlerBooleanRelationalGreaterThanOrEqual = class extends NbtPathExpressionParseHandlerBooleanRelationalAdapter {
    constructor() {
      super(">=");
    }
    getRelationalValue(left, right) {
      return left >= right;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalLessThan.ts
  var NbtPathExpressionParseHandlerBooleanRelationalLessThan = class extends NbtPathExpressionParseHandlerBooleanRelationalAdapter {
    constructor() {
      super("<");
    }
    getRelationalValue(left, right) {
      return left < right;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual.ts
  var NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual = class extends NbtPathExpressionParseHandlerBooleanRelationalAdapter {
    constructor() {
      super("<=");
    }
    getRelationalValue(left, right) {
      return left <= right;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/navigate/NbtPathNavigationAdapter.ts
  var NbtPathNavigationAdapter = class {
    keys;
    child;
    constructor(keys, child) {
      if (!Array.isArray(keys)) keys = [keys];
      this.keys = keys;
      this.child = child;
    }
    isLeaf() {
      return this.child == null;
    }
    isLeafKey(key) {
      return this.isLeaf() && this.keys.includes(key);
    }
    getNext(key) {
      return !this.isLeaf() && this.keys.includes(key) ? this.child : void 0;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerChild.ts
  var NbtPathExpressionParseHandlerChild = class {
    REGEX_CHILDNAME = new RegExp("^[a-zA-Z_0-9]+");
    handlePrefixOf(nbtPathExpression, pos) {
      if (
        nbtPathExpression.charAt(pos) != "." ||
        nbtPathExpression.length <= pos + 1
      ) {
        return HandleResult.INVALID;
      }
      const region = nbtPathExpression.slice(pos + 1);
      const match = region.match(this.REGEX_CHILDNAME);
      if (!match) {
        return HandleResult.INVALID;
      }
      let childName = new iString(match[0]);
      return new HandleResult(
        new Expression2(childName),
        1 + childName.length()
      );
    }
    static Expression;
  };
  var Expression2 = class extends INbtPathExpression {
    childName;
    constructor(childName) {
      super();
      this.childName = childName;
    }
    getChildName() {
      return this.childName;
    }
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts
          .map((executionContext) => {
            let nbt = executionContext.getCurrentTag();
            if (nbt.getType() == Tag.TAG_COMPOUND) {
              let tag = nbt;
              let childTag = tag.get(this.childName);
              if (childTag != null) {
                return new NbtPathExpressionExecutionContext(
                  childTag,
                  executionContext
                );
              }
            }
            return null;
          })
          .filter((e) => e != null)
      );
    }
    asNavigation(child) {
      return new NbtPathNavigationAdapter(this.getChildName(), child);
    }
  };
  NbtPathExpressionParseHandlerChild.Expression = Expression2;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathStringParser.ts
  var NbtPathStringParser = class {
    static StringParseResult = class StringParseResult {
      static FAIL = new StringParseResult(false, 0, new iString(""));
      successVal;
      consumed;
      result;
      constructor(success, consumed, result) {
        this.successVal = success;
        this.consumed = consumed;
        this.result = result;
      }
      isSuccess() {
        return this.successVal;
      }
      getConsumed() {
        return this.consumed;
      }
      getResult() {
        return this.result;
      }
      static success(consumed, result) {
        return new StringParseResult(true, consumed, result);
      }
      static fail() {
        return this.FAIL;
      }
    };
    /**
     * Parse a string that starts and ends with doubles quotes and; Can handle escape sequences
     * within that string.
     * @param source The source string
     * @param pos Where to start parse; The index of the opening double quote
     * @return Parse result
     */
    static parse(source, pos) {
      if (pos >= source.length || source.charAt(pos) != '"') {
        return this.StringParseResult.fail();
      }
      let resultBuilder = new iString("");
      let currentPos = pos + 1;
      while (true) {
        if (currentPos >= source.length) {
          return this.StringParseResult.fail();
        }
        let character = source.charAt(currentPos);
        currentPos++;
        switch (character) {
          case "\\": {
            if (currentPos >= source.length) {
              return this.StringParseResult.fail();
            }
            let escapeName = source.charAt(currentPos);
            currentPos++;
            switch (escapeName) {
              case "\\":
              // For \\
              case '"':
                resultBuilder.add(escapeName);
                continue;
              default:
                return this.StringParseResult.fail();
            }
          }
          case '"':
            return this.StringParseResult.success(
              currentPos - pos,
              resultBuilder
            );
          default:
            resultBuilder.add(character);
        }
      }
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerChildBrackets.ts
  var NbtPathExpressionParseHandlerChildBrackets = class {
    handlePrefixOf(nbtPathExpression, pos) {
      if (
        pos >= nbtPathExpression.length ||
        nbtPathExpression.charAt(pos) != "["
      ) {
        return HandleResult.INVALID;
      }
      let parseResult = NbtPathStringParser.parse(nbtPathExpression, pos + 1);
      if (!parseResult.isSuccess()) {
        return HandleResult.INVALID;
      }
      let closingBracketIndex = pos + parseResult.getConsumed() + 1;
      if (
        closingBracketIndex >= nbtPathExpression.length ||
        nbtPathExpression.charAt(closingBracketIndex) != "]"
      ) {
        return HandleResult.INVALID;
      }
      return new HandleResult(
        new NbtPathExpressionParseHandlerChild.Expression(
          parseResult.getResult()
        ),
        2 + parseResult.getConsumed()
      );
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerCurrent.ts
  var NbtPathExpressionParseHandlerCurrent = class _NbtPathExpressionParseHandlerCurrent {
    handlePrefixOf(nbtPathExpression, pos) {
      if (nbtPathExpression.charAt(pos) != "@") {
        return HandleResult.INVALID;
      }
      return new HandleResult(
        _NbtPathExpressionParseHandlerCurrent.Expression.INSTANCE,
        1
      );
    }
    static Expression;
  };
  var Expression3 = class _Expression extends INbtPathExpression {
    static INSTANCE = new _Expression();
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(executionContexts);
    }
  };
  NbtPathExpressionParseHandlerCurrent.Expression = Expression3;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerFilterExpression.ts
  var NbtPathExpressionParseHandlerFilterExpression = class _NbtPathExpressionParseHandlerFilterExpression {
    REGEX_EXPRESSION = new RegExp("^\\[\\?\\(([^\\)^\\(]+)\\)\\]");
    handlePrefixOf(nbtPathExpression, pos) {
      const match = this.REGEX_EXPRESSION.exec(nbtPathExpression.slice(pos));
      if (!match) {
        return HandleResult.INVALID;
      }
      let expressionString = match[1];
      try {
        let expression = NbtPath.parse(expressionString);
        return new HandleResult(
          new _NbtPathExpressionParseHandlerFilterExpression.Expression(
            expression
          ),
          5 + expressionString.length
        );
      } catch (e) {
        if (!(e instanceof NbtParseException)) throw e;
        return HandleResult.INVALID;
      }
    }
    static Expression;
  };
  var Expression4 = class extends INbtPathExpression {
    expression;
    constructor(expression) {
      super();
      this.expression = expression;
    }
    getExpression() {
      return this.expression;
    }
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts
          .map((executionContext) => {
            let nbt = executionContext.getCurrentTag();
            if (nbt.getType() == Tag.TAG_LIST) {
              let tag = nbt;
              let newTagList = new ListTag(new iArrayEager([]));
              tag
                .getArray()
                .valueOf()
                .filter((subTag) => this.getExpression().test(subTag))
                .forEach((subTag) => newTagList.add(subTag));
              return new NbtPathExpressionExecutionContext(
                newTagList,
                executionContext
              );
            } else if (nbt.getType() == Tag.TAG_COMPOUND) {
              let tag = nbt;
              let newTagList = new ListTag(new iArrayEager([]));
              Array.from(tag.getAllKeys().valueOf())
                .map((key) => tag.get(key))
                .filter((subTag) => this.getExpression().test(subTag))
                .forEach((subTag) => newTagList.add(subTag));
              return new NbtPathExpressionExecutionContext(
                newTagList,
                executionContext
              );
            }
            return null;
          })
          .filter((e) => e != null)
      );
    }
  };
  NbtPathExpressionParseHandlerFilterExpression.Expression = Expression4;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerLength.ts
  var NbtPathExpressionParseHandlerLength = class {
    handlePrefixOf(nbtPathExpression, pos) {
      if (
        nbtPathExpression.substring(
          pos,
          Math.min(pos + 7, nbtPathExpression.length)
        ) != ".length"
      ) {
        return HandleResult.INVALID;
      }
      return new HandleResult(Expression5.INSTANCE, 7);
    }
    static Expression;
  };
  var Expression5 = class extends INbtPathExpression {
    static INSTANCE = new NbtPathExpressionParseHandlerLength.Expression();
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts
          .map((executionContext) => {
            let nbt = executionContext.getCurrentTag();
            if (nbt.getType() == Tag.TAG_LIST) {
              let tag = nbt;
              return new NbtPathExpressionExecutionContext(
                IntTag.valueOf(new Integer(tag.size())),
                executionContext
              );
            } else if (nbt.getType() == Tag.TAG_COMPOUND) {
              let tag = nbt;
              return new NbtPathExpressionExecutionContext(
                IntTag.valueOf(new Integer(tag.getAllKeys().size())),
                executionContext
              );
            }
            return null;
          })
          .filter((e) => e != null)
      );
    }
  };
  NbtPathExpressionParseHandlerLength.Expression = Expression5;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerListElement.ts
  var NbtPathExpressionParseHandlerListElement = class {
    REGEX_ELEMENTINDEX = new RegExp("^\\[([0-9]+)\\]");
    handlePrefixOf(nbtPathExpression, pos) {
      const region = nbtPathExpression.slice(pos);
      const match = region.match(this.REGEX_ELEMENTINDEX);
      if (!match) {
        return HandleResult.INVALID;
      }
      const childIndexString = match[1];
      const childIndex = parseInt(childIndexString);
      return new HandleResult(
        new Expression6(childIndex),
        2 + childIndexString.length
      );
    }
    static Expression;
  };
  var Expression6 = class extends INbtPathExpression {
    childIndex;
    constructor(childIndex) {
      super();
      this.childIndex = childIndex;
    }
    getChildIndex() {
      return new Integer(this.childIndex);
    }
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts
          .map((executionContext) => {
            let nbt = executionContext.getCurrentTag();
            if (nbt.getType() == Tag.TAG_LIST) {
              let tag = nbt;
              if (new Integer(this.childIndex).lt(tag.size())) {
                let childTag = tag.get(this.getChildIndex());
                return new NbtPathExpressionExecutionContext(
                  childTag,
                  executionContext
                );
              }
            }
            return null;
          })
          .filter((e) => e != null)
      );
    }
  };
  NbtPathExpressionParseHandlerListElement.Expression = Expression6;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerListSlice.ts
  var NbtPathExpressionParseHandlerListSlice = class _NbtPathExpressionParseHandlerListSlice {
    REGEX_RANGE = new RegExp("^\\[([0-9]*):([0-9]*)(:([0-9]+))?\\]");
    handlePrefixOf(nbtPathExpression, pos) {
      const region = nbtPathExpression.slice(pos);
      const match = region.match(this.REGEX_RANGE);
      if (!match) {
        return HandleResult.INVALID;
      }
      const startString = match[1] ?? "";
      const endString = match[2] ?? "";
      const stepString = match[4] ?? null;
      const start = startString !== "" ? parseInt(startString, 10) : 0;
      const end = endString !== "" ? parseInt(endString, 10) : -1;
      const step = stepString !== null ? parseInt(stepString, 10) : 1;
      if (step === 0) {
        return HandleResult.INVALID;
      }
      return new HandleResult(
        new _NbtPathExpressionParseHandlerListSlice.Expression(
          start,
          end,
          step
        ),
        3 +
          startString.length +
          endString.length +
          (stepString == null ? 0 : 1 + stepString.length)
      );
    }
    static newStartEndStepStream(start, end, step) {
      end -= start - 1;
      let endScaled = end / step;
      let endMod = end % step > 0 ? 1 : 0;
      let countingArr = [];
      for (let i = 0; i < endScaled + endMod; i++) countingArr.push(i);
      return countingArr.map((i) => i * step + start);
    }
    static Expression;
  };
  var Expression7 = class extends INbtPathExpression {
    start;
    end;
    step;
    constructor(start, end, step) {
      super();
      this.start = start;
      this.end = end;
      this.step = step;
    }
    getStart() {
      return this.start;
    }
    getEnd() {
      return this.end;
    }
    getStep() {
      return this.step;
    }
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts
          .flatMap((executionContext) => {
            let nbt = executionContext.getCurrentTag();
            if (nbt.getType() == Tag.TAG_LIST) {
              let tag = nbt;
              let start = this.getStart();
              let actualEnd =
                this.getEnd() > -1
                  ? Math.min(tag.size().toJSNumber() - 1, this.getEnd())
                  : tag.size().toJSNumber() - 1;
              let step = this.getStep();
              return NbtPathExpressionParseHandlerListSlice.newStartEndStepStream(
                start,
                actualEnd,
                step
              ).map(
                (i) =>
                  new NbtPathExpressionExecutionContext(
                    tag.get(new Integer(i)),
                    executionContext
                  )
              );
            }
            return null;
          })
          .filter((e) => e != null)
      );
    }
  };
  NbtPathExpressionParseHandlerListSlice.Expression = Expression7;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerParent.ts
  var NbtPathExpressionParseHandlerParent = class _NbtPathExpressionParseHandlerParent {
    handlePrefixOf(nbtPathExpression, pos) {
      if (
        nbtPathExpression.length <= pos + 1 ||
        nbtPathExpression.charAt(pos) != "." ||
        nbtPathExpression.charAt(pos + 1) != "."
      ) {
        return HandleResult.INVALID;
      }
      return new HandleResult(
        _NbtPathExpressionParseHandlerParent.Expression.INSTANCE,
        2
      );
    }
    static Expression;
  };
  var Expression8 = class _Expression extends INbtPathExpression {
    static INSTANCE = new _Expression();
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts
          .map((e) => e.getParentContext())
          .filter((e) => e != null)
      );
    }
  };
  NbtPathExpressionParseHandlerParent.Expression = Expression8;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerRoot.ts
  var NbtPathExpressionParseHandlerRoot = class _NbtPathExpressionParseHandlerRoot {
    handlePrefixOf(nbtPathExpression, pos) {
      if (nbtPathExpression.charAt(pos) != "$") {
        return HandleResult.INVALID;
      }
      return new HandleResult(
        _NbtPathExpressionParseHandlerRoot.Expression.INSTANCE,
        1
      );
    }
    static Expression = class Expression11 extends INbtPathExpression {
      static INSTANCE = new Expression11();
      matchContexts(executionContexts) {
        return new NbtPathExpressionMatches(
          executionContexts.map((e) => e.getRootContext())
        );
      }
      asNavigation(child) {
        return child;
      }
    };
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerStringEqual.ts
  var NbtPathExpressionParseHandlerStringEqual = class _NbtPathExpressionParseHandlerStringEqual {
    /**
     * Skips all consecutive spaces.
     * @param str Source string
     * @param pos Index of the first potential space
     * @return Index of first encountered non space character
     */
    static skipSpaces(str, pos) {
      while (pos < str.length && str.charAt(pos) == " ") {
        pos++;
      }
      return pos;
    }
    handlePrefixOf(nbtPathExpression, pos) {
      let currentPos = _NbtPathExpressionParseHandlerStringEqual.skipSpaces(
        nbtPathExpression,
        pos
      );
      if (currentPos + 1 >= nbtPathExpression.length) {
        return HandleResult.INVALID;
      }
      if (
        nbtPathExpression.charAt(currentPos) != "=" ||
        nbtPathExpression.charAt(currentPos + 1) != "="
      ) {
        return HandleResult.INVALID;
      }
      currentPos = _NbtPathExpressionParseHandlerStringEqual.skipSpaces(
        nbtPathExpression,
        currentPos + 2
      );
      let parseResult = NbtPathStringParser.parse(
        nbtPathExpression,
        currentPos
      );
      if (!parseResult.isSuccess()) {
        return HandleResult.INVALID;
      }
      return new HandleResult(
        new _NbtPathExpressionParseHandlerStringEqual.Expression(
          parseResult.getResult()
        ),
        currentPos - pos + parseResult.getConsumed()
      );
    }
    static Expression;
  };
  var Expression9 = class extends INbtPathExpression {
    targetString;
    constructor(targetString) {
      super();
      this.targetString = targetString;
    }
    getTargetString() {
      return this.targetString;
    }
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts.map((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_STRING) {
            let tag = nbt;
            return new NbtPathExpressionExecutionContext(
              ByteTag.valueOf(
                new Integer(+this.getTargetString().equals(tag.valueOf()))
              ),
              executionContext
            );
          }
          return new NbtPathExpressionExecutionContext(
            ByteTag.valueOf(Integer.ZERO),
            executionContext
          );
        })
      );
    }
  };
  NbtPathExpressionParseHandlerStringEqual.Expression = Expression9;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NBTPathExpressionParseHandlerUnion.ts
  var NbtPathExpressionParseHandlerUnion = class {
    REGEX_BRACKETS = new RegExp("^\\[([^\\]]+(,[^\\]]+)+)\\]");
    handlePrefixOf(nbtPathExpression, pos) {
      const match = this.REGEX_BRACKETS.exec(nbtPathExpression.slice(pos));
      if (!match) {
        return HandleResult.INVALID;
      }
      let contents = match[1].split(",");
      let childNames = [];
      let childIndexes = [];
      let expressionLength = 1;
      for (const match2 of contents) {
        expressionLength += 1 + match2.length;
        try {
          childIndexes.push(parseInt(match2));
          if (!(childNames.length == 0)) {
            return HandleResult.INVALID;
          }
        } catch (e) {
          childNames.push(new iString(match2));
          if (!(childIndexes.length == 0)) {
            return HandleResult.INVALID;
          }
        }
      }
      return new HandleResult(
        new Expression10(childNames, childIndexes),
        expressionLength
      );
    }
    static Expression;
  };
  var Expression10 = class extends INbtPathExpression {
    childNames;
    childIndexes;
    constructor(childNames, childIndexes) {
      super();
      this.childNames = childNames;
      this.childIndexes = childIndexes;
    }
    getChildNames() {
      return this.childNames;
    }
    getChildIndexes() {
      return this.childIndexes;
    }
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts
          .flatMap((executionContext) => {
            let nbt = executionContext.getCurrentTag();
            if (
              !(this.getChildIndexes().length == 0) &&
              nbt.getType() == Tag.TAG_LIST
            ) {
              let tag = nbt;
              return this.getChildIndexes()
                .map((i) => tag.get(new Integer(i)))
                .filter((subTag) => subTag.getType() == Tag.TAG_COMPOUND)
                .map(
                  (subTag) =>
                    new NbtPathExpressionExecutionContext(
                      subTag,
                      executionContext
                    )
                );
            } else if (
              !(this.getChildNames().length == 0) &&
              nbt.getType() == Tag.TAG_COMPOUND
            ) {
              let tag = nbt;
              return this.getChildNames()
                .map((e) => tag.get(e))
                .filter((e) => e != null)
                .map(
                  (subTag) =>
                    new NbtPathExpressionExecutionContext(
                      subTag,
                      executionContext
                    )
                );
            }
            return null;
          })
          .filter((e) => e != null)
      );
    }
    asNavigation(child) {
      if (!(this.getChildNames().length == 0)) {
        return new NbtPathNavigationAdapter(this.getChildNames(), child);
      } else {
        throw new Error(
          "NbtPathExpressionParseHandlerUnion.Expression#asNavigation is not implemented for lists"
        );
      }
    }
  };
  NbtPathExpressionParseHandlerUnion.Expression = Expression10;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/NbtPath.ts
  var NbtPath = class _NbtPath {
    static PARSE_HANDLERS = [
      new NbtPathExpressionParseHandlerRoot(),
      new NbtPathExpressionParseHandlerLength(),
      new NbtPathExpressionParseHandlerChild(),
      new NbtPathExpressionParseHandlerChildBrackets(),
      new NbtPathExpressionParseHandlerParent(),
      new NbtPathExpressionParseHandlerAllChildren(),
      new NbtPathExpressionParseHandlerCurrent(),
      new NbtPathExpressionParseHandlerListElement(),
      new NbtPathExpressionParseHandlerListSlice(),
      new NbtPathExpressionParseHandlerUnion(),
      new NbtPathExpressionParseHandlerBooleanRelationalLessThan(),
      new NbtPathExpressionParseHandlerBooleanRelationalLessThanOrEqual(),
      new NbtPathExpressionParseHandlerBooleanRelationalGreaterThan(),
      new NbtPathExpressionParseHandlerBooleanRelationalGreaterThanOrEqual(),
      new NbtPathExpressionParseHandlerBooleanRelationalEqual(),
      new NbtPathExpressionParseHandlerStringEqual(),
      new NbtPathExpressionParseHandlerFilterExpression(),
    ];
    /**
     * Parse an NBT path expression string into an in-memory representation.
     * @param nbtPathExpression An NBT path expression string
     * @return An in-memory representation of the given expression.
     * @throws NbtParseException An exception that can be thrown if parsing failed.
     */
    static parse(nbtPathExpression) {
      let expressions = [];
      let pos = 0;
      while (pos < nbtPathExpression.length) {
        let handled = false;
        for (const parseHandler of _NbtPath.PARSE_HANDLERS) {
          let handleResult = parseHandler.handlePrefixOf(
            nbtPathExpression,
            pos
          );
          if (handleResult.isValid()) {
            pos += handleResult.getConsumedExpressionLength();
            expressions.push(handleResult.getPrefixExpression());
            handled = true;
            break;
          }
        }
        if (!handled) {
          throw new Error(
            `Failed to parse expression at pos '${pos}': ${nbtPathExpression}`
          );
        }
        return new NbtPathExpressionList(...expressions);
      }
      return void 0;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_PATH_MATCH_ALL.ts
  var OPERATOR_NBT_PATH_MATCH_ALL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_path_match_all",
        nicknames: ["nbtPathMatchAll"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: { type: "List", listType: { type: "NBT" } },
            },
          },
          globalMap2
        ),
        symbol: "NBT.path_match_all",
        interactName: "stringNbtPathMatchAll",
        function: (path) => {
          return (nbt) => {
            let expression = NbtPath.parse(path.valueOf());
            if (!expression) throw new Error(`Invalid path: ${path.valueOf()}`);
            return new iArrayEager(expression.match(nbt).getMatches());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_PATH_MATCH_FIRST.ts
  var OPERATOR_NBT_PATH_MATCH_FIRST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_path_match_first",
        nicknames: ["nbtPathMatchFirst"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT.path_match_first",
        interactName: "stringNbtPathMatchFirst",
        function: (path) => {
          return (nbt) => {
            let expression = NbtPath.parse(path.valueOf());
            if (!expression) throw new Error(`Invalid path: ${path.valueOf()}`);
            return expression.match(nbt).getMatches()[0] ?? new NullTag();
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NBT_PATH_TEST.ts
  var OPERATOR_NBT_PATH_TEST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:nbt_path_test",
        nicknames: ["NBTPathTest"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "NBT.path_test",
        interactName: "stringNbtPathTest",
        function: (path) => {
          return (nbt) => {
            let expression = NbtPath.parse(path.valueOf());
            if (!expression) throw new Error(`Invalid path: ${path.valueOf()}`);
            return new iBoolean(expression.test(nbt));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NULLABLE_ISNOTNULL.ts
  var OPERATOR_NULLABLE_ISNOTNULL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:general_isnotnull",
        nicknames: ["isNotNull", "nullableIsnotnull"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "\u2205",
        interactName: "anyIsNotNull",
        function: (value) => {
          return new iBoolean(value !== null && value !== void 0);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NULLABLE_ISNULL.ts
  var OPERATOR_NULLABLE_ISNULL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:general_isnull",
        nicknames: ["isNull", "nullableIsnull", "GENERAL_IS_NULL"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "o",
        interactName: "anyIsNull",
        function: (value) => {
          return new iBoolean(value === null || value === void 0);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NUMBER_CEIL.ts
  var OPERATOR_NUMBER_CEIL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:number_ceil",
        nicknames: ["ceil", "numberCeil"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "\u2308 \u2309",
        interactName: "numberCeil",
        function: (number) => {
          return number.ceil();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NUMBER_COMPACT.ts
  var OPERATOR_NUMBER_COMPACT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:number_compact",
        nicknames: ["compact", "numberCompact"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "compact",
        interactName: "numberCompact",
        function: (number) => {
          return new iString(number.toString());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NUMBER_FLOOR.ts
  var OPERATOR_NUMBER_FLOOR = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:number_floor",
        nicknames: ["floor", "numberFloor"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "\u230A \u230B",
        interactName: "numberFloor",
        function: (number) => {
          return number.floor();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/NUMBER_ROUND.ts
  var OPERATOR_NUMBER_ROUND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:number_round",
        nicknames: ["round", "numberRound"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "|| ||",
        interactName: "numberRound",
        function: (number) => {
          return number.round();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_BREAKSOUND.ts
  var OPERATOR_OBJECT_BLOCK_BREAKSOUND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_breaksound",
        nicknames: [
          "BlockBreaksound",
          "block_break_sound",
          "blockBreakSound",
          "breakSound",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "break_sound",
        interactName: "blockBreakSound",
        function: (block) => {
          return block.getBreakSound();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_BY_NAME.ts
  var OPERATOR_OBJECT_BLOCK_BY_NAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_blockbyname",
        nicknames: ["BlockByName", "block_by_name", "blockByName"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Block",
            },
          },
          globalMap2
        ),
        symbol: "block_by_name",
        interactName: "stringBlockByName",
        function: (_name) => {
          throw new Error(
            "Block by name is infeasible without a registry. This is a placeholder function."
          );
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_ISSHEARABLE.ts
  var OPERATOR_OBJECT_BLOCK_ISSHEARABLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_isshearable",
        nicknames: [
          "BlockIsshearable",
          "block_is_shearable",
          "blockIsShearable",
          "blockIsShearable",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_shearable",
        interactName: "blockIsShearable",
        function: (block) => {
          return block.isShearable();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_ITEMSTACK.ts
  var OPERATOR_OBJECT_BLOCK_ITEMSTACK = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_itemstack",
        nicknames: [
          "BlockItemstack",
          "block_item",
          "blockItemstack",
          "block_itemstack",
          "blockItem",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "Item",
            },
          },
          globalMap2
        ),
        symbol: "itemstack",
        interactName: "blockItemStack",
        function: (block) => {
          return block.getItem();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_MODNAME.ts
  var OPERATOR_OBJECT_BLOCK_MODNAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_mod",
        nicknames: [
          "BlockItemstack",
          "block_item",
          "blockItemstack",
          "block_itemstack",
          "blockItem",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "mod",
        interactName: "blockMod",
        function: (block) => {
          return block.getModName();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_OPAQUE.ts
  var OPERATOR_OBJECT_BLOCK_OPAQUE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_opaque",
        nicknames: ["BlockOpaque", "opaque"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "opaque",
        interactName: "blockIsOpaque",
        function: (block) => {
          return block.isOpaque();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_PLACESOUND.ts
  var OPERATOR_OBJECT_BLOCK_PLACESOUND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_placesound",
        nicknames: [
          "BlockPlacesound",
          "blockPlaceSound",
          "block_place_sound",
          "placeSound",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "place_sound",
        interactName: "blockPlaceSound",
        function: (block) => {
          return block.getPlaceSound();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_PLANTAGE.ts
  var OPERATOR_OBJECT_BLOCK_PLANTAGE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_plantage",
        nicknames: [
          "BlockPlantage",
          "block_plant_age",
          "blockPlantAge",
          "plantAge",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "plant_age",
        interactName: "blockPlantAge",
        function: (block) => {
          return block.getPlantAge();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_POSSIBLE_PROPERTIES.ts
  var OPERATOR_OBJECT_BLOCK_POSSIBLE_PROPERTIES = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_blockpossibleproperties",
        nicknames: [
          "BlockPossibleProperties",
          "block_possible_properties",
          "blockPossibleProperties",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "block_all_props",
        interactName: "blockPossibleProperties",
        function: (_block) => {
          throw new Error(
            "Block possible properties is infeasible without a registry. This is a placeholder function."
          );
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_PROPERTIES.ts
  var OPERATOR_OBJECT_BLOCK_PROPERTIES = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_blockproperties",
        nicknames: ["BlockProperties", "block_properties", "blockProperties"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "block_props",
        interactName: "blockProperties",
        function: (block) => {
          return block.getProperties().toCompoundTag();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_STEPSOUND.ts
  var OPERATOR_OBJECT_BLOCK_STEPSOUND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_stepsound",
        nicknames: [
          "BlockStepsound",
          "blockStepSound",
          "block_step_sound",
          "stepSound",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "step_sound",
        interactName: "blockStepSound",
        function: (block) => {
          return block.getStepSound();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_TAG.ts
  var OPERATOR_OBJECT_BLOCK_TAG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_tag",
        nicknames: ["BlockTag", "blockTag"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: { type: "List", listType: { type: "String" } },
          },
          globalMap2
        ),
        symbol: "block_tag_names",
        interactName: "blockTags",
        function: (block) => {
          return block.getTagNames();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_TAG_STACKS.ts
  var OPERATOR_OBJECT_BLOCK_TAG_STACKS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_blocktag",
        nicknames: ["BlockTagStacks", "block_tag_stacks", "blockTagStacks"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "Block" } },
          },
          globalMap2
        ),
        symbol: "block_tag_values",
        interactName: "stringBlocksByTag",
        function: (_name) => {
          throw new Error(
            "Block tag values is infeasible without a registry. This is a placeholder function."
          );
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_BLOCK_WITH_PROPERTIES.ts
  var OPERATOR_OBJECT_BLOCK_WITH_PROPERTIES = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:block_blockfromproperties",
        nicknames: [
          "BlockWithProperties",
          "block_with_properties",
          "blockWithProperties",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Block",
            },
            to: {
              type: "Function",
              from: {
                type: "NBT",
              },
              to: {
                type: "Block",
              },
            },
          },
          globalMap2
        ),
        symbol: "block_with_props",
        interactName: "blockWithProperties",
        function: (block) => {
          return (nbtProperties) => {
            const properties = new Properties(nbtProperties.toJSON());
            return new Block(properties, block);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_AGE.ts
  var OPERATOR_OBJECT_ENTITY_AGE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_age",
        nicknames: ["EntityAge", "entity_age", "entityAge"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "age",
        interactName: "entityAge",
        function: (entity) => {
          return entity.getAge();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_CANBREED.ts
  var OPERATOR_OBJECT_ENTITY_CANBREED = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_canbreed",
        nicknames: [
          "EntityCanbreed",
          "entity_can_breed",
          "entityCanBreed",
          "canBreed",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "canbreed",
        interactName: "entityCanBreed",
        function: (entity) => {
          return entity.canBreed();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_CANBREEDWITH.ts
  var OPERATOR_OBJECT_ENTITY_CANBREEDWITH = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_canbreedwith",
        nicknames: [
          "EntityCanbreedwith",
          "entity_can_breed_with",
          "entityCanBreedWith",
          "canBreedWith",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Function",
              from: {
                type: "Entity",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "can_breed_with",
        interactName: "entityCanBreedWith",
        function: (entity1) => {
          return (entity2) => {
            return entity1.getBreadableList().includes(entity2.getUniqueName());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_DEATHSOUND.ts
  var OPERATOR_OBJECT_ENTITY_DEATHSOUND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_deathsound",
        nicknames: [
          "entityDeathSound",
          "EntityDeathsound",
          "entity_death_sound",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "deathsound",
        interactName: "entityDeathSound",
        function: (entity) => {
          return entity.getDeathSound();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ENERGY_CAPACITY.ts
  var OPERATOR_OBJECT_ENTITY_ENERGY_CAPACITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_entityenergystored",
        nicknames: [
          "EntityEnergyCapacity",
          "entity_energy_capacity",
          "entityEnergyCapacity",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "entity_capacity_fe",
        interactName: "entityEnergyCapacity",
        function: (entity) => {
          return entity.getEnergyCapacity();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ENERGY_STORED.ts
  var OPERATOR_OBJECT_ENTITY_ENERGY_STORED = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_entityenergystored",
        nicknames: [
          "EntityEnergyStored",
          "entity_energy_stored",
          "entityEnergyStored",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "entity_stored_fe",
        interactName: "entityEnergy",
        function: (entity) => {
          return entity.getEnergyStored();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ENTITYITEMTOOLTIP.ts
  var OPERATOR_OBJECT_ENTITY_ENTITYITEMTOOLTIP = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_entityitemtooltip",
        nicknames: [
          "ItemstackEntityTooltip",
          "itemstack_entity_tooltip",
          "itemstackEntityTooltip",
          "item_entity_tooltip",
          "itemEntityTooltip",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Function",
              from: {
                type: "Item",
              },
              to: { type: "List", listType: { type: "String" } },
            },
          },
          globalMap2
        ),
        symbol: "entity_item_tooltip",
        interactName: "entityEntityItemTooltip",
        function: (entity) => {
          return (item) => {
            if (entity.isPlayer().valueOf()) {
              return item.getTooltip(entity);
            }
            console.warn(
              "Entity item tooltip is not fully supported for non-player entities. Returning item tooltip only."
            );
            return item.getTooltip();
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_FLUIDS.ts
  var OPERATOR_OBJECT_ENTITY_FLUIDS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_entityfluids",
        nicknames: ["EntityFluids", "entity_fluids", "entityFluids"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: { type: "List", listType: { type: "Fluid" } },
          },
          globalMap2
        ),
        symbol: "entity_fluids",
        interactName: "entityFluids",
        function: (entity) => {
          return new iArrayEager(entity.getFluids());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_HEIGHT.ts
  var OPERATOR_OBJECT_ENTITY_HEIGHT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_height",
        nicknames: [
          "EntityHeight",
          "entity_height",
          "entityHeight",
          "entityHeight",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "height",
        interactName: "entityHeight",
        function: (entity) => {
          return entity.getHeight();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_HURTSOUND.ts
  var OPERATOR_OBJECT_ENTITY_HURTSOUND = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_hurtsound",
        nicknames: ["EntityHurtsound", "entity_hurt_sound", "entityHurtSound"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "hurtsound",
        interactName: "entityHurtSound",
        function: (entity) => {
          return entity.getHurtSound();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_INVENTORY.ts
  var OPERATOR_OBJECT_ENTITY_INVENTORY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_inventory",
        nicknames: [
          "EntityInventoryContents",
          "entity_inventory_contents",
          "entityInventoryContents",
          "entityInventoryContents",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: { type: "List", listType: { type: "Item" } },
          },
          globalMap2
        ),
        symbol: "entity_inventory",
        interactName: "entityInventory",
        function: (entity) => {
          return entity.getInventory();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISANIMAL.ts
  var OPERATOR_OBJECT_ENTITY_ISANIMAL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_isanimal",
        nicknames: [
          "EntityIsanimal",
          "entity_is_animal",
          "entityIsAnimal",
          "isAnimal",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_animal",
        interactName: "entityIsAnimal",
        function: (entity) => {
          return entity.isAnimal();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISBURNING.ts
  var OPERATOR_OBJECT_ENTITY_ISBURNING = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_isburning",
        nicknames: [
          "EntityIsburning",
          "entity_is_burning",
          "entityIsBurning",
          "isBurning",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_burning",
        interactName: "entityIsBurning",
        function: (entity) => {
          return entity.isBurning();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISCHILD.ts
  var OPERATOR_OBJECT_ENTITY_ISCHILD = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_ischild",
        nicknames: [
          "isChild",
          "EntityIschild",
          "entity_is_child",
          "entityIsChild",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_child",
        interactName: "entityIsChild",
        function: (entity) => {
          return entity.isChild();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISCROUCHING.ts
  var OPERATOR_OBJECT_ENTITY_ISCROUCHING = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_iscrouching",
        nicknames: [
          "EntityIscrouching",
          "entity_is_crouching",
          "entityIsCrouching",
          "isCrouching",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_crouching",
        interactName: "entityIsCrouching",
        function: (entity) => {
          return entity.isCrouching();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISEATING.ts
  var OPERATOR_OBJECT_ENTITY_ISEATING = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_iseating",
        nicknames: [
          "EntityIseating",
          "entity_is_eating",
          "entityIsEating",
          "isEating",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_eating",
        interactName: "entityIsEating",
        function: (entity) => {
          return entity.isEating();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISINLOVE.ts
  var OPERATOR_OBJECT_ENTITY_ISINLOVE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_isinlove",
        nicknames: [
          "EntityIsinlove",
          "entity_is_in_love",
          "entityIsInLove",
          "isInLove",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_in_love",
        interactName: "entityIsInLove",
        function: (entity) => {
          return entity.isInLove();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISITEM.ts
  var OPERATOR_OBJECT_ENTITY_ISITEM = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_isitem",
        nicknames: ["EntityIsitem", "entity_is_item", "entityIsItem", "isItem"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_item",
        interactName: "entityIsItem",
        function: (entity) => {
          return entity.isItem();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISMOB.ts
  var OPERATOR_OBJECT_ENTITY_ISMOB = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_ismob",
        nicknames: ["EntityIsmob", "entity_is_mob", "entityIsMob", "isMob"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_mob",
        interactName: "entityIsMob",
        function: (entity) => {
          return entity.isMob();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISPLAYER.ts
  var OPERATOR_OBJECT_ENTITY_ISPLAYER = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_isplayer",
        nicknames: [
          "EntityIsplayer",
          "entity_is_player",
          "entityIsPlayer",
          "isPlayer",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_player",
        interactName: "entityIsPlayer",
        function: (entity) => {
          return entity.isPlayer();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISSHEARABLE.ts
  var OPERATOR_OBJECT_ENTITY_ISSHEARABLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_isshearable",
        nicknames: [
          "EntityIsshearable",
          "entity_is_shearable",
          "entityIsShearable",
          "entityIsShearable",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_shearable",
        interactName: "entityIsShearable",
        function: (entity) => {
          return entity.isShearable();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ISWET.ts
  var OPERATOR_OBJECT_ENTITY_ISWET = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_iswet",
        nicknames: ["EntityIswet", "entity_is_wet", "entityIsWet", "isWet"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_wet",
        interactName: "entityIsWet",
        function: (entity) => {
          return entity.isWet();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_ITEMS.ts
  var OPERATOR_OBJECT_ENTITY_ITEMS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_entityitems",
        nicknames: [
          "EntityItems",
          "entity_items",
          "entityItems",
          "entity_item_list",
          "entityItemList",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: { type: "List", listType: { type: "Item" } },
          },
          globalMap2
        ),
        symbol: "entity_items",
        interactName: "entityItems",
        function: (entity) => {
          return new iArrayEager(entity.getItemList());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_MODNAME.ts
  var OPERATOR_OBJECT_ENTITY_MODNAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_mod",
        nicknames: ["EntityMod", "entity_mod", "entityMod", "entityModName"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "entity_mod",
        interactName: "entityMod",
        function: (entity) => {
          return entity.getModName();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_MOUNTED.ts
  var OPERATOR_OBJECT_ENTITY_MOUNTED = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_mounted",
        nicknames: ["EntityMounted", "entitys_mounted", "entitysMounted"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: { type: "Boolean" },
          },
          globalMap2
        ),
        symbol: "mounted",
        interactName: "entityMounted",
        function: (entity) => {
          return entity.isEntityMounted();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_NBT.ts
  var OPERATOR_OBJECT_ENTITY_NBT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_nbt",
        nicknames: ["EntityNbt", "entity_nbt", "canBreed", "entityNBT"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT()",
        interactName: "entityNbt",
        function: (entity) => {
          return entity.getNBT();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_TYPE.ts
  var OPERATOR_OBJECT_ENTITY_TYPE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_entitytype",
        nicknames: ["EntityType", "entity_type", "entityType"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "entity_type",
        interactName: "entityType",
        function: (entity) => {
          return entity.getEntityType();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ENTITY_WIDTH.ts
  var OPERATOR_OBJECT_ENTITY_WIDTH = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_width",
        nicknames: [
          "EntityWidth",
          "entity_width",
          "entityWidth",
          "entityWidth",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "width",
        interactName: "entityWidth",
        function: (entity) => {
          return entity.getWidth();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_AMOUNT.ts
  var OPERATOR_OBJECT_FLUIDSTACK_AMOUNT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_amount",
        nicknames: [
          "FluidstackAmount",
          "fluidstackAmount",
          "fluid_stack_amount",
          "fluidStackAmount",
          "fluid_stack_amount",
          "fluid_amount",
          "fluidAmount",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "amount",
        interactName: "fluidstackAmount",
        function: (fluid) => {
          return fluid.getAmount();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_BLOCK.ts
  var OPERATOR_OBJECT_FLUIDSTACK_BLOCK = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_block",
        nicknames: [
          "FluidstackBlock",
          "fluidstackBlock",
          "fluid_stack_block",
          "fluidStackBlock",
          "fluid_stack_block",
          "fluid_block",
          "fluidBlock",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Block",
            },
          },
          globalMap2
        ),
        symbol: "block",
        interactName: "fluidstackBlock",
        function: (fluid) => {
          return fluid.getBlock();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_BUCKET.ts
  var OPERATOR_OBJECT_FLUIDSTACK_BUCKET = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_bucket",
        nicknames: [
          "FluidstackBucket",
          "fluidstackBucket",
          "fluid_stack_bucket",
          "fluidStackBucket",
          "fluid_stack_bucket",
          "fluid_bucket",
          "fluidBucket",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Item",
            },
          },
          globalMap2
        ),
        symbol: "bucket",
        interactName: "fluidstackBucket",
        function: (fluid) => {
          return fluid.getBucket();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_BY_NAME.ts
  var OPERATOR_OBJECT_FLUIDSTACK_BY_NAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_by_name",
        nicknames: [
          "FluidstackByName",
          "fluidstack_by_name",
          "fluidstackByName",
          "fluid_by_name",
          "fluidByName",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Fluid",
            },
          },
          globalMap2
        ),
        symbol: "fluid_by_name",
        interactName: "stringFluidByName",
        function: (_name) => {
          throw new Error(
            "Fluid by name is infeasible without a registry. This is a placeholder function."
          );
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_DATA.ts
  var OPERATOR_OBJECT_FLUIDSTACK_DATA = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_nbt",
        nicknames: [
          "FluidstackData",
          "fluidstackData",
          "fluid_stack_data",
          "fluidStackData",
          "fluid_stack_data",
          "fluid_data",
          "fluidData",
          "fluid_NBT",
          "fluidStackNBT",
          "fluid_stack_NBT",
          "fluidstack_NBT",
          "fluidstackNBT",
          "fluidNBT",
          "fluidNBTKeys",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "NBT()",
        interactName: "fluidstackNbt",
        function: (fluid) => {
          return fluid.getNBT();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_DATA_VALUE.ts
  var OPERATOR_OBJECT_FLUIDSTACK_DATA_VALUE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_datavalue",
        nicknames: [
          "FluidstackDataValue",
          "fluidstackDataValue",
          "fluid_stack_data_value",
          "fluidStackDataValue",
          "fluid_stack_data_value",
          "fluid_data_value",
          "fluidDataValue",
          "fluid_NBT_value",
          "fluidStackNBTValue",
          "fluid_stack_NBT_value",
          "fluidstack_NBT_value",
          "fluidstackNBTValue",
          "fluidNBTValue",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "NBT",
              },
            },
          },
          globalMap2
        ),
        symbol: "data_value",
        interactName: "fluidstackDataValue",
        function: (fluid) => {
          return (key) => {
            const nbt = fluid.getNBT();
            if (!(nbt instanceof CompoundTag) || !nbt.has(key)) {
              return new NullTag();
            }
            return nbt.get(key);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_DATAKEYS.ts
  var OPERATOR_OBJECT_FLUIDSTACK_DATAKEYS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_datakeys",
        nicknames: [
          "FluidstackDataKeys",
          "fluidstackDataKeys",
          "fluid_stack_data_keys",
          "fluidStackDataKeys",
          "fluid_stack_data_keys",
          "fluid_data_keys",
          "fluidDataKeys",
          "fluid_NBT_keys",
          "fluidStackNBTKeys",
          "fluid_stack_NBT_keys",
          "fluidstack_NBT_keys",
          "fluidstackNBTKeys",
          "fluidNBTKeys",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: { type: "List", listType: { type: "String" } },
          },
          globalMap2
        ),
        symbol: "data_keys",
        interactName: "fluidstackDataKeys",
        function: (fluid) => {
          const nbt = fluid.getNBT();
          if (nbt instanceof CompoundTag) {
            return nbt.getAllKeys();
          }
          return new iArrayEager([]);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_DENSITY.ts
  var OPERATOR_OBJECT_FLUIDSTACK_DENSITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_density",
        nicknames: [
          "FluidstackDensity",
          "fluidstackDensity",
          "fluid_stack_density",
          "fluidStackDensity",
          "fluid_stack_density",
          "fluid_density",
          "fluidDensity",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "density",
        interactName: "fluidstackDensity",
        function: (fluid) => {
          return fluid.getDensity();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR.ts
  var OPERATOR_OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_lighter_than_air",
        nicknames: [
          "FluidstackIsLighterThanAir",
          "fluidstackIsLighterThanAir",
          "fluid_stack_is_lighter_than_air",
          "fluidStackIsLighterThanAir",
          "fluid_stack_is_lighter_than_air",
          "fluid_is_lighter_than_air",
          "fluidIsLighterThanAir",
          "isLighterThanAir",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "lighter_than_air",
        interactName: "fluidstackIsLighterThanAir",
        function: (fluid) => {
          return fluid.isLighterThanAir();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL.ts
  var OPERATOR_OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_israwfluidequal",
        nicknames: [
          "FluidstackIsrawfluidequal",
          "fluidstackIsrawfluidequal",
          "fluid_stack_israwfluidequal",
          "fluidStackIsrawfluidequal",
          "fluid_stack_israwfluidequal",
          "fluid_israwfluidequal",
          "isRawFluidEqual",
          "rawFluidEquals",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Function",
              from: {
                type: "Fluid",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "=Raw=",
        interactName: "fluidstackIsRawEqual",
        function: (fluid1) => {
          return (fluid2) => {
            return new iBoolean(
              fluid1
                .getUname()
                .replace(new RegExp("\\s\\d+$"), "")
                .toLowerCase() ===
                fluid2
                  .getUname()
                  .replace(new RegExp("\\s\\d+$"), "")
                  .toLowerCase()
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_LIGHT_LEVEL.ts
  var OPERATOR_OBJECT_FLUIDSTACK_LIGHT_LEVEL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_light_level",
        nicknames: [
          "FluidstackLightLevel",
          "fluidstackLightLevel",
          "fluid_stack_light_level",
          "fluidStackLightLevel",
          "fluid_stack_light_level",
          "fluid_light_level",
          "fluidLightLevel",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "light_level",
        interactName: "fluidstackLightLevel",
        function: (fluid) => {
          return fluid.getLightLevel();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_MODNAME.ts
  var OPERATOR_OBJECT_FLUIDSTACK_MODNAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_mod",
        nicknames: [
          "FluidstackModname",
          "fluidstackModname",
          "fluid_stack_modname",
          "fluidStackModname",
          "fluid_stack_modname",
          "fluid_mod_name",
          "fluidModName",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "mod",
        interactName: "fluidstackMod",
        function: (fluid) => {
          return new iString(fluid.getModName());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_RARITY.ts
  var OPERATOR_OBJECT_FLUIDSTACK_RARITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_rarity",
        nicknames: [
          "FluidstackRarity",
          "fluidstackRarity",
          "fluid_stack_rarity",
          "fluidStackRarity",
          "fluid_stack_rarity",
          "fluid_rarity",
          "fluidRarity",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "rarity",
        interactName: "fluidstackRarity",
        function: (fluid) => {
          return new iString(fluid.getRarity());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY.ts
  var OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_sound_bucket_empty",
        nicknames: [
          "FluidstackSoundBucketEmpty",
          "fluidstackSoundBucketEmpty",
          "fluid_stack_sound_bucket_empty",
          "fluidStackSoundBucketEmpty",
          "fluid_stack_sound_bucket_empty",
          "fluid_sound_bucket_empty",
          "fluidSoundBucketEmpty",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "sound_bucket_empty",
        interactName: "fluidstackBucketEmptySound",
        function: (fluid) => {
          return new iString(fluid.getBucketEmptySound());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL.ts
  var OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_sound_bucket_fill",
        nicknames: [
          "FluidstackSoundBucketFill",
          "fluidstackSoundBucketFill",
          "fluid_stack_sound_bucket_fill",
          "fluidStackSoundBucketFill",
          "fluid_stack_sound_bucket_fill",
          "fluid_sound_bucket_fill",
          "fluidSoundBucketFill",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "sound_bucket_fill",
        interactName: "fluidstackBucketFillSound",
        function: (fluid) => {
          return new iString(fluid.getBucketFillSound());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE.ts
  var OPERATOR_OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_sound_fluid_vaporize",
        nicknames: [
          "FluidstackSoundFluidVaporize",
          "fluidstackSoundFluidVaporize",
          "fluid_stack_sound_fluid_vaporize",
          "fluidStackSoundFluidVaporize",
          "fluid_stack_sound_fluid_vaporize",
          "fluid_sound_fluid_vaporize",
          "fluidSoundFluidVaporize",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "sound_fluid_vaporize",
        interactName: "fluidstackFluidVaporizeSound",
        function: (fluid) => {
          return new iString(fluid.getFluidVaporizeSound());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_TAG.ts
  var OPERATOR_OBJECT_FLUIDSTACK_TAG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_tag",
        nicknames: [
          "FluidstackTag",
          "fluidstackTag",
          "fluidstackTagStacks",
          "fluidstackTagStack",
          "fluidTag",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: { type: "List", listType: { type: "String" } },
          },
          globalMap2
        ),
        symbol: "fluid_tag_names",
        interactName: "fluidstackTags",
        function: (fluid) => {
          return new iArrayEager(
            fluid.getTagNames().map((e) => new iString(e))
          );
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_TAG_STACKS.ts
  var OPERATOR_OBJECT_FLUIDSTACK_TAG_STACKS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_fluidtag",
        nicknames: [
          "FluidstackTagStacks",
          "fluidStackTagStacks",
          "fluid_stack_tag_stacks",
          "fluidTagStacks",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "Fluid" } },
          },
          globalMap2
        ),
        symbol: "fluid_tag_values",
        interactName: "stringFluidsByTag",
        function: (_name) => {
          throw new Error(
            "Fluid tag values is infeasible without a registry. This is a placeholder function."
          );
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_TEMPERATURE.ts
  var OPERATOR_OBJECT_FLUIDSTACK_TEMPERATURE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_temperature",
        nicknames: [
          "FluidstackTemperature",
          "fluidstackTemperature",
          "fluid_stack_temperature",
          "fluidStackTemperature",
          "fluid_stack_temperature",
          "fluid_temperature",
          "fluidTemperature",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "temperature",
        interactName: "fluidstackTemperature",
        function: (fluid) => {
          return fluid.getTemperature();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_VISCOSITY.ts
  var OPERATOR_OBJECT_FLUIDSTACK_VISCOSITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_viscosity",
        nicknames: [
          "FluidstackViscosity",
          "fluidstackViscosity",
          "fluid_stack_viscosity",
          "fluidStackViscosity",
          "fluid_stack_viscosity",
          "fluid_viscosity",
          "fluidViscosity",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "viscosity",
        interactName: "fluidstackViscosity",
        function: (fluid) => {
          return fluid.getViscosity();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_WITH_AMOUNT.ts
  var OPERATOR_OBJECT_FLUIDSTACK_WITH_AMOUNT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_with_amount",
        nicknames: [
          "FluidstackWithAmount",
          "fluidstackWithAmount",
          "fluid_stack_with_amount",
          "fluidStackWithAmount",
          "fluid_stack_with_amount",
          "fluid_with_amount",
          "fluidWithAmount",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Fluid",
              },
            },
          },
          globalMap2
        ),
        symbol: "with_amount",
        interactName: "fluidstackWithAmount",
        function: (fluid) => {
          return (amount) => {
            return new Fluid(new Properties({ amount }), fluid);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_FLUIDSTACK_WITH_DATA.ts
  var OPERATOR_OBJECT_FLUIDSTACK_WITH_DATA = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:fluidstack_withdata",
        nicknames: [
          "FluidstackWithData",
          "fluidstackWithData",
          "fluid_stack_with_data",
          "fluidStackWithData",
          "fluidWithNBT",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Fluid",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "NBT",
                },
                to: {
                  type: "Fluid",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "with_data",
        interactName: "fluidstackWithData",
        function: (fluid) => {
          return (key) => {
            return (value) => {
              let nbt =
                fluid.getNBT() instanceof NullTag
                  ? new CompoundTag({})
                  : fluid.getNBT();
              nbt = nbt.set(key.valueOf(), value);
              return new Fluid(new Properties({ nbt }), fluid);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMFRAME_CONTENTS.ts
  var OPERATOR_OBJECT_ITEMFRAME_CONTENTS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_itemframecontents",
        nicknames: [
          "ItemframeContents",
          "itemframe_contents",
          "itemframeContents",
          "item_frame_contents",
          "itemFrameContents",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Item",
            },
          },
          globalMap2
        ),
        symbol: "itemframe_contents",
        interactName: "entityItemFrameContents",
        function: (entity) => {
          if (entity.isItemFrame().valueOf()) {
            return entity.getItemFrameContents();
          } else {
            throw new Error("Entity is not an item frame.");
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMFRAME_ROTATION.ts
  var OPERATOR_OBJECT_ITEMFRAME_ROTATION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_itemframerotation",
        nicknames: [
          "ItemframeRotation",
          "itemframe_rotation",
          "itemframeRotation",
          "item_frame_rotation",
          "itemFrameRotation",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "itemframe_rotation",
        interactName: "entityItemFrameRotation",
        function: (entity) => {
          if (entity.isItemFrame().valueOf()) {
            return entity.getItemFrameRotation();
          } else {
            throw new Error("Entity is not an item frame.");
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_BLOCK.ts
  var OPERATOR_OBJECT_ITEMSTACK_BLOCK = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_block",
        nicknames: [
          "ItemstackBlock",
          "itemstack_block",
          "itemstackBlock",
          "itemBlock",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Block",
            },
          },
          globalMap2
        ),
        symbol: "block",
        interactName: "itemstackBlock",
        function: (item) => {
          return new Block(new Properties({}), item.getBlock());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_CANHARVESTBLOCK.ts
  var OPERATOR_OBJECT_ITEMSTACK_CANHARVESTBLOCK = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_canharvest",
        nicknames: [
          "ItemstackCanHarvestBlock",
          "itemstack_can_harvest_block",
          "itemstackCanHarvestBlock",
          "canHarvestBlock",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Function",
              from: {
                type: "Block",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "can_harvest",
        interactName: "itemstackCanHarvest",
        function: (_item) => {
          return (_block) => {
            throw new Error("Can harvest block not currently implemented");
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_DAMAGE.ts
  var OPERATOR_OBJECT_ITEMSTACK_DAMAGE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_damage",
        nicknames: [
          "ItemstackDamage",
          "itemstack_damage",
          "itemstackDamage",
          "damage",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "damage",
        interactName: "itemstackDamage",
        function: (item) => {
          return item.getDamage();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_DATA_KEYS.ts
  var OPERATOR_OBJECT_ITEMSTACK_DATA_KEYS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_datakeys",
        nicknames: [
          "ItemstackDatakeys",
          "itemstack_data_keys",
          "itemstackDataKeys",
          "itemNBTKeys",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: { type: "List", listType: { type: "String" } },
          },
          globalMap2
        ),
        symbol: "data_keys",
        interactName: "itemStackDataKeys",
        function: (item) => {
          return item.getNBT().getAllKeys();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_FE_CAPACITY.ts
  var OPERATOR_OBJECT_ITEMSTACK_FE_CAPACITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_fecapacity",
        nicknames: [
          "ItemstackFecapacity",
          "itemstack_fe_capacity",
          "itemstackFECapacity",
          "feCapacity",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "fe_capacity",
        interactName: "itemstackFECapacity",
        function: (item) => {
          return item.getFeCapacity();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_FLUIDSTACK.ts
  var OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACK = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_fluidstack",
        nicknames: [
          "ItemstackFluidstack",
          "itemstack_fluidstack",
          "itemstackFluidstack",
          "itemFluidstack",
          "item_fluidstack",
          "itemFluid",
          "item_fluid",
          "itemstack_fluid",
          "itemstackFluid",
          "itemFluid",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Fluid",
            },
          },
          globalMap2
        ),
        symbol: "fluidstack",
        interactName: "itemstackFluidStack",
        function: (item) => {
          return item.getFluid();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY.ts
  var OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_fluidstackcapacity",
        nicknames: [
          "ItemstackFluidstackcapacity",
          "itemstack_fluidstack_capacity",
          "itemstackFluidstackCapacity",
          "item_fluid_capacity",
          "itemFluidCapacity",
          "item_fluidstack_capacity",
          "itemFluidstackCapacity",
          "fluidCapatity",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "fluidstack_capacity",
        interactName: "itemstackFluidCapacity",
        function: (item) => {
          return item.getFluidCapacity();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_FUELBURNTIME.ts
  var OPERATOR_OBJECT_ITEMSTACK_FUELBURNTIME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_burntime",
        nicknames: [
          "ItemstackFuelburntime",
          "item_fuel_burn_time",
          "itemFuelBurnTime",
          "fuelBurnTime",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "burn_time",
        interactName: "itemstackBurnTime",
        function: (item) => {
          return item.getFuelBurnTime();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_HASINVENTORY.ts
  var OPERATOR_OBJECT_ITEMSTACK_HASINVENTORY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_hasinventory",
        nicknames: [
          "ItemstackHasinventory",
          "itemstack_has_inventory",
          "itemstackHasInventory",
          "hasInventory",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "has_inventory",
        interactName: "itemstackHasInventory",
        function: (item) => {
          return new iBoolean(item.getInventory().size().gt(Integer.ZERO));
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_HASNBT.ts
  var OPERATOR_OBJECT_ITEMSTACK_HASNBT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_hasnbt",
        nicknames: [
          "ItemstackHasnbt",
          "itemstack_has_nbt",
          "itemstackHasNBT",
          "hasNBT",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "has_nbt",
        interactName: "itemStackHasNBT",
        function: (item) => {
          return new iBoolean(item.getNBT().getType() != Tag.TAG_NULL);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_INVENTORY.ts
  var OPERATOR_OBJECT_ITEMSTACK_INVENTORY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_inventory",
        nicknames: [
          "ItemstackInventory",
          "itemstack_inventory",
          "itemstackInventory",
          "item_inventory",
          "itemInventory",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: { type: "List", listType: { type: "Item" } },
          },
          globalMap2
        ),
        symbol: "inventory",
        interactName: "itemstackInventory",
        function: (item) => {
          return item.getInventory();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_INVENTORYSIZE.ts
  var OPERATOR_OBJECT_ITEMSTACK_INVENTORYSIZE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_inventorysize",
        nicknames: [
          "ItemstackInventorysize",
          "itemstack_inventory_size",
          "itemstackInventorySize",
          "item_inventory_size",
          "itemInventorySize",
          "inventorySize",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "inventory_size",
        interactName: "itemstackInventorySize",
        function: (item) => {
          return item.getInventory().size();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_ISDAMAGEABLE.ts
  var OPERATOR_OBJECT_ITEMSTACK_ISDAMAGEABLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_damageable",
        nicknames: [
          "ItemstackIsdamageable",
          "itemstack_is_damageable",
          "itemstackIsDamageable",
          "isDamageable",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "damageable",
        interactName: "itemstackIsDamageable",
        function: (item) => {
          return item.isDamageable();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_ISDATAEQUAL.ts
  var OPERATOR_OBJECT_ITEMSTACK_ISDATAEQUAL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_isnbtequal",
        nicknames: [
          "ItemstackIsdataequal",
          "itemstack_is_dataequal",
          "itemstackIsDataequal",
          "=NBT=",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Function",
              from: {
                type: "Item",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "=NBT=",
        interactName: "itemstackIsNbtEqual",
        function: (item1) => {
          return (item2) => {
            return item1.getNBT().equals(item2.getNBT());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_ISENCHANTABLE.ts
  var OPERATOR_OBJECT_ITEMSTACK_ISENCHANTABLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_enchantable",
        nicknames: [
          "ItemstackIsenchantable",
          "itemstack_is_enchantable",
          "itemstackIsEnchantable",
          "enchantable",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "enchantable",
        interactName: "itemstackIsEnchantable",
        function: (item) => {
          return item.isEnchantable();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_ISENCHANTED.ts
  var OPERATOR_OBJECT_ITEMSTACK_ISENCHANTED = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_enchanted",
        nicknames: [
          "ItemstackIsenchanted",
          "itemstack_is_enchanted",
          "itemstackIsEnchanted",
          "isEnchanted",
          "enchanted",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "enchanted",
        interactName: "itemstackIsEnchanted",
        function: (item) => {
          return item.isEnchanted();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_ISFLUIDSTACK.ts
  var OPERATOR_OBJECT_ITEMSTACK_ISFLUIDSTACK = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_isfluidstack",
        nicknames: [
          "ItemstackIsfluidstack",
          "itemstack_is_fluidstack",
          "itemstackIsFluidstack",
          "itemHasFluid",
          "isFluidstack",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "is_fluidstack",
        interactName: "itemstackIsFluidStack",
        function: (item) => {
          return new iBoolean(item.getFluid().getAmount().gt(Integer.ZERO));
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_ISITEMEQUALNODATA.ts
  var OPERATOR_OBJECT_ITEMSTACK_ISITEMEQUALNODATA = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_isnbtequal",
        nicknames: [
          "ItemstackIsitemequalnodata",
          "itemstack_is_itemequalnodata",
          "itemstackIsItemequalnodata",
          "=NoNBT=",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Function",
              from: {
                type: "Item",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "=NoNBT=",
        interactName: "itemstackIsNbtEqual",
        function: (item1) => {
          return (item2) => {
            return new iBoolean(
              item1.getUniqueName().valueOf() ===
                item2.getUniqueName().valueOf() &&
                item1.getSize().equals(item2.getSize()).valueOf()
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_ISRAWITEMEQUAL.ts
  var OPERATOR_OBJECT_ITEMSTACK_ISRAWITEMEQUAL = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_israwitemequal",
        nicknames: [
          "ItemstackIsrawitemequal",
          "itemstack_is_rawitemequal",
          "itemstackIsRawitemequal",
          "rawItemEquals",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Function",
              from: {
                type: "Item",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "=Raw=",
        interactName: "itemstackIsEqualRaw",
        function: (item1) => {
          return (item2) => {
            return new iBoolean(
              item1.getUniqueName().valueOf() ===
                item2.getUniqueName().valueOf()
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_ISSTACKABLE.ts
  var OPERATOR_OBJECT_ITEMSTACK_ISSTACKABLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_stackable",
        nicknames: [
          "ItemstackIsstackable",
          "itemstack_is_stackable",
          "itemstackIsStackable",
          "isStackable",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "stackable",
        interactName: "itemstackIsStackable",
        function: (item) => {
          return item.isStackable();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_MAXDAMAGE.ts
  var OPERATOR_OBJECT_ITEMSTACK_MAXDAMAGE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_maxdamage",
        nicknames: [
          "ItemstackMaxdamage",
          "itemstack_max_damage",
          "itemstackMaxDamage",
          "maxDamage",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "max_damage",
        interactName: "itemstackMaxDamage",
        function: (item) => {
          return item.getMaxDamage();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_MAXSIZE.ts
  var OPERATOR_OBJECT_ITEMSTACK_MAXSIZE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_maxsize",
        nicknames: [
          "ItemstackMaxsize",
          "itemstack_max_size",
          "itemstackMaxSize",
          "maxSize",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "maxsize",
        interactName: "itemstackMaxSize",
        function: (item) => {
          return item.getMaxSize();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_MODNAME.ts
  var OPERATOR_OBJECT_ITEMSTACK_MODNAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_mod",
        nicknames: ["ItemstackModname", "item_mod", "itemModname", "itemMod"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "mod",
        interactName: "itemstackMod",
        function: (item) => {
          return item.getModName();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_NBT.ts
  var OPERATOR_OBJECT_ITEMSTACK_NBT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_nbt",
        nicknames: ["ItemstackNbt", "itemstack_nbt", "itemstackNBT", "itemNBT"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "nbt",
        interactName: "itemStackNBT",
        function: (item) => {
          return item.getNBT();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_RARITY.ts
  var OPERATOR_OBJECT_ITEMSTACK_RARITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_rarity",
        nicknames: [
          "ItemstackRarity",
          "itemstack_rarity",
          "itemstackRarity",
          "rarity",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "rarity",
        interactName: "itemstackRarity",
        function: (item) => {
          return item.getRarity();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_REPAIRCOST.ts
  var OPERATOR_OBJECT_ITEMSTACK_REPAIRCOST = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_repaircost",
        nicknames: [
          "ItemstackRepaircost",
          "itemstack_repair_cost",
          "itemstackRepairCost",
          "repairCost",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "repair_cost",
        interactName: "itemstackRepairCost",
        function: (item) => {
          return item.getRepairCost();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_SIZE.ts
  var OPERATOR_OBJECT_ITEMSTACK_SIZE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_size",
        nicknames: ["ItemstackSize", "itemstack_size", "itemstackSize", "size"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "size",
        interactName: "itemstackSize",
        function: (item) => {
          return item.getSize();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_STORED_FE.ts
  var OPERATOR_OBJECT_ITEMSTACK_STORED_FE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_storedfe",
        nicknames: [
          "ItemstackStoredfe",
          "itemstack_stored_fe",
          "itemstackStoredFe",
          "item_stored_fe",
          "itemStoredFe",
          "storedFe",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "stored_fe",
        interactName: "itemstackFeStored",
        function: (item) => {
          return item.getFeStored();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK.ts
  var OPERATOR_OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_strength",
        nicknames: [
          "ItemstackStrengthVsBlock",
          "itemstack_strength_vs_block",
          "itemstackStrengthVsBlock",
          "strengthVsBlock",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Function",
              from: {
                type: "Block",
              },
              to: {
                type: "Double",
              },
            },
          },
          globalMap2
        ),
        symbol: "strength",
        interactName: "itemstackStrength",
        function: (_item) => {
          return (_block) => {
            throw new Error("Strength vs Block not currently implemented");
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_TAG_STACKS.ts
  var OPERATOR_OBJECT_ITEMSTACK_TAG_STACKS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_tags",
        nicknames: [
          "ItemstackTags",
          "itemstack_tag_values",
          "itemstackTagValues",
          "item_tag_names",
          "itemTagNames",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "List",
              listType: {
                type: "String",
              },
            },
          },
          globalMap2
        ),
        symbol: "item_tag_val",
        interactName: "itemstackTagVal",
        function: (item) => {
          return item.getTagNames();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_ITEMSTACK_WITHSIZE.ts
  var OPERATOR_OBJECT_ITEMSTACK_WITHSIZE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:itemstack_withsize",
        nicknames: [
          "ItemstackWithSize",
          "itemstack_with_size",
          "itemstackWithSize",
          "itemWithSize",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Item",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Item",
              },
            },
          },
          globalMap2
        ),
        symbol: "with_size",
        interactName: "itemstackWithSize",
        function: (item) => {
          return (size) => {
            return new Item(new Properties({ size }), item);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_PLAYER_TARGETBLOCK.ts
  var OPERATOR_OBJECT_PLAYER_TARGETBLOCK = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_targetblock",
        nicknames: [
          "PlayerTargetblock",
          "player_target_block",
          "playerTargetBlock",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Block",
            },
          },
          globalMap2
        ),
        symbol: "target_block",
        interactName: "entityTargetBlock",
        function: (entity) => {
          return entity.getTargetBlock();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OBJECT_PLAYER_TARGETENTITY.ts
  var OPERATOR_OBJECT_PLAYER_TARGETENTITY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:entity_targetentity",
        nicknames: [
          "EntityTargetentity",
          "entity_target_entity",
          "entityTargetEntity",
          "playerTargetEntity",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Entity",
            },
            to: {
              type: "Entity",
            },
          },
          globalMap2
        ),
        symbol: "target_entity",
        interactName: "entityTargetEntity",
        function: (entity) => {
          return entity.getTargetEntity();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_APPLY.ts
  var OPERATOR_OPERATOR_APPLY = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_apply",
        nicknames: ["operatorApply", "apply"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 2 },
              },
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 2 },
            },
          },
          globalMap2
        ),
        symbol: "apply",
        interactName: "operatorApply",
        serializer: "integrateddynamics:curry",
        function: (op) => {
          return (arg) => {
            return op.apply(arg);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_APPLY_0.ts
  var OPERATOR_OPERATOR_APPLY_0 = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_apply0",
        nicknames: ["operatorApply_0", "apply0"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 2 },
              },
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 3 },
              to: { type: "Any", typeID: 2 },
            },
          },
          globalMap2
        ),
        symbol: "apply0",
        interactName: "operatorApply0",
        serializer: "integrateddynamics:curry",
        function: (_op) => {
          return () => {
            throw new Error(`apply0 doesn't make sense to implement`);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_APPLY_2.ts
  var OPERATOR_OPERATOR_APPLY_2 = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_apply2",
        nicknames: ["operatorApply_2", "apply2"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 2 },
                  to: { type: "Any", typeID: 3 },
                },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 1,
              },
              to: {
                type: "Function",
                from: {
                  type: "Any",
                  typeID: 2,
                },
                to: {
                  type: "Any",
                  typeID: 3,
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "apply2",
        interactName: "operatorApply2",
        serializer: "integrateddynamics:curry",
        function: (op) => {
          return (arg1) => {
            return (arg2) => {
              return op.apply(arg1).apply(arg2);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_APPLY_3.ts
  var OPERATOR_OPERATOR_APPLY_3 = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_apply3",
        nicknames: ["operatorApply_3", "apply3"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 2 },
                  to: {
                    type: "Function",
                    from: { type: "Any", typeID: 3 },
                    to: { type: "Any", typeID: 4 },
                  },
                },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 1,
              },
              to: {
                type: "Function",
                from: {
                  type: "Any",
                  typeID: 2,
                },
                to: {
                  type: "Function",
                  from: {
                    type: "Any",
                    typeID: 3,
                  },
                  to: {
                    type: "Any",
                    typeID: 4,
                  },
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "apply3",
        interactName: "operatorApply3",
        serializer: "integrateddynamics:curry",
        function: (op) => {
          return (arg1) => {
            return (arg2) => {
              return (arg3) => {
                return op.apply(arg1).apply(arg2).apply(arg3);
              };
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_APPLY_N.ts
  var OPERATOR_OPERATOR_APPLY_N = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_apply_n",
        nicknames: ["operatorApplyN", "applyn", "applyN"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 2 },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "List",
                listType: {
                  type: "Any",
                  typeID: 1,
                },
              },
              to: { type: "Any", typeID: 2 },
            },
          },
          globalMap2
        ),
        symbol: "apply_n",
        interactName: "operatorApply_n",
        serializer: "integrateddynamics:curry",
        function: (op) => {
          return (args) => {
            let result = op;
            for (const arg of args.valueOf()) {
              if (arg === void 0 || arg === null) {
                throw new Error(
                  "applyn requires all arguments to be defined and non-null."
                );
              }
              if (!(result instanceof Operator)) {
                throw new Error(`apply_n got too big a list`);
              }
              result = result.apply(arg);
            }
            return result;
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_BY_NAME.ts
  var OPERATOR_OPERATOR_BY_NAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_by_name",
        nicknames: ["operatorByName", "opByName"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 2 },
            },
          },
          globalMap2
        ),
        symbol: "op_by_name",
        interactName: "stringOperatorByName",
        function: (name) => {
          const result = operatorRegistry.find(name.valueOf());
          if (!result) throw new Error(`No operator found: ${name.valueOf()}`);
          return result;
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_CONJUNCTION.ts
  var OPERATOR_OPERATOR_CONJUNCTION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_conjunction",
        nicknames: ["operatorConjunction", "conjunction"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Boolean" },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Boolean" },
                },
              },
              to: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Boolean" },
                },
              },
            },
          },
          globalMap2
        ),
        symbol: ".&&.",
        interactName: "operatorConjunction",
        function: (predicate1) => {
          return (predicate2) => {
            return (input) => {
              return new iBoolean(
                predicate1.apply(input).valueOf() &&
                  predicate2.apply(input).valueOf()
              );
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_DISJUNCTION.ts
  var OPERATOR_OPERATOR_DISJUNCTION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_disjunction",
        nicknames: ["operatorDisjunction", "disjunction"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Boolean" },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Boolean" },
                },
              },
              to: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Boolean" },
                },
              },
            },
          },
          globalMap2
        ),
        symbol: ".||.",
        interactName: "operatorDisjunction",
        function: (predicate1) => {
          return (predicate2) => {
            return (input) => {
              return new iBoolean(
                predicate1.apply(input).valueOf() ||
                  predicate2.apply(input).valueOf()
              );
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_FILTER.ts
  var OPERATOR_OPERATOR_FILTER = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_filter",
        nicknames: ["operatorFilter", "filter"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Boolean" },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "List",
                listType: { type: "Any", typeID: 1 },
              },
              to: {
                type: "List",
                listType: { type: "Any", typeID: 1 },
              },
            },
          },
          globalMap2
        ),
        symbol: "filter",
        interactName: "operatorFilter",
        function: (predicate) => {
          return (list) => {
            return list.filter((item) => predicate.apply(item).valueOf());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_FLIP.ts
  var OPERATOR_OPERATOR_FLIP = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_flip",
        nicknames: ["operatorFlip", "flip"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 2 },
                  to: { type: "Any", typeID: 3 },
                },
              },
            },
            to: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 2 },
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 3 },
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "flip",
        interactName: "operatorFlip",
        serializer: "integrateddynamics:combined.flip",
        function: (op) => {
          return (arg1) => {
            return (arg2) => {
              return op.apply(arg2).apply(arg1);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_MAP.ts
  var OPERATOR_OPERATOR_MAP = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_map",
        nicknames: ["operatorMap", "map"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 2 },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "List",
                listType: { type: "Any", typeID: 1 },
              },
              to: {
                type: "List",
                listType: { type: "Any", typeID: 2 },
              },
            },
          },
          globalMap2
        ),
        symbol: "map",
        interactName: "operatorMap",
        function: (op) => {
          return (list) => {
            return list.map(op);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_NEGATION.ts
  var OPERATOR_OPERATOR_NEGATION = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_negation",
        nicknames: ["operatorNegation", "negation"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Boolean" },
              },
            },
            to: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Boolean" },
              },
            },
          },
          globalMap2
        ),
        symbol: "!.",
        interactName: "operatorNegation",
        function: (predicate) => {
          return (input) => {
            return new iBoolean(!predicate.apply(input).valueOf());
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_PIPE.ts
  var OPERATOR_OPERATOR_PIPE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_pipe",
        nicknames: ["operatorPipe", "pipe"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 2 },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 2 },
                  to: { type: "Any", typeID: 3 },
                },
              },
              to: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 3 },
                },
              },
            },
          },
          globalMap2
        ),
        symbol: ".",
        interactName: "operatorPipe",
        serializer: "integrateddynamics:combined.pipe",
        function: (f) => {
          return (g) => {
            return f.pipe(g);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_PIPE2.ts
  var OPERATOR_OPERATOR_PIPE2 = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_pipe2",
        nicknames: ["operatorPipe2", "pipe.2", "pipe2"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 2 },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 3 },
                },
              },
              to: {
                type: "Function",
                from: {
                  type: "Operator",
                  obscured: {
                    type: "Function",
                    from: { type: "Any", typeID: 2 },
                    to: {
                      type: "Function",
                      from: { type: "Any", typeID: 3 },
                      to: { type: "Any", typeID: 4 },
                    },
                  },
                },
                to: {
                  type: "Operator",
                  obscured: {
                    type: "Function",
                    from: { type: "Any", typeID: 1 },
                    to: { type: "Any", typeID: 4 },
                  },
                },
              },
            },
          },
          globalMap2
        ),
        symbol: ".2",
        interactName: "operatorPipe2",
        serializer: "integrateddynamics:combined.pipe",
        function: (f) => {
          return (g) => {
            return (h) => {
              return (x) => {
                return h.apply(f.apply(x)).apply(g.apply(x));
              };
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_REDUCE.ts
  var OPERATOR_OPERATOR_REDUCE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_reduce",
        nicknames: ["operatorReduce", "reduce"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 1 },
                },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "List",
                listType: { type: "Any", typeID: 1 },
              },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: { type: "Any", typeID: 1 },
              },
            },
          },
          globalMap2
        ),
        symbol: "reduce",
        interactName: "operatorReduce",
        function: (op) => {
          return (list) => {
            return (startingValue) => {
              return list
                .valueOf()
                .reduce(
                  (acc, current) => op.apply(acc).apply(current),
                  startingValue
                );
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/OPERATOR_REDUCE1.ts
  var OPERATOR_OPERATOR_REDUCE1 = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:operator_reduce1",
        nicknames: ["operatorReduce1", "reduce1"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Operator",
              obscured: {
                type: "Function",
                from: { type: "Any", typeID: 1 },
                to: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 1 },
                },
              },
            },
            to: {
              type: "Function",
              from: {
                type: "List",
                listType: { type: "Any", typeID: 1 },
              },
              to: { type: "Any", typeID: 1 },
            },
          },
          globalMap2
        ),
        symbol: "reduce1",
        interactName: "operatorReduce1",
        function: (op) => {
          return (list) => {
            return list
              .valueOf()
              .reduce((acc, current) => op.apply(acc).apply(current));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/PARSE_BOOLEAN.ts
  var import_re2_wasm = __toESM(require_re22());
  var OPERATOR_PARSE_BOOLEAN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.iBoolean",
        nicknames: ["parseBoolean"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Boolean",
            },
          },
          globalMap2
        ),
        symbol: "parse_iBoolean",
        interactName: "stringParseAsBoolean",
        function: (value) => {
          const matchArr =
            new import_re2_wasm.RE2("(F(alse)?|[+-]?(0x|#)?0+|)", "i").match(
              value.valueOf()
            ) ?? [];
          return new iBoolean(!!matchArr[0]);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/PARSE_DOUBLE.ts
  var OPERATOR_PARSE_DOUBLE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",
        nicknames: ["parseDouble"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Double",
            },
          },
          globalMap2
        ),
        symbol: "parse_double",
        interactName: "stringParseAsDouble",
        function: (data) => {
          try {
            return new Double(data);
          } catch (e) {
            return Double.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/PARSE_INTEGER.ts
  var OPERATOR_PARSE_INTEGER = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer",
        nicknames: ["parseInteger"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "parse_integer",
        interactName: "stringParseAsInteger",
        function: (data) => {
          try {
            return new Integer(data);
          } catch (e) {
            return Integer.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/PARSE_LONG.ts
  var OPERATOR_PARSE_LONG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long",
        nicknames: ["parseLong"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1,
            },
            to: {
              type: "Long",
            },
          },
          globalMap2
        ),
        symbol: "parse_long",
        interactName: "stringParseAsLong",
        function: (data) => {
          try {
            return new Long(data);
          } catch (e) {
            return Long.ZERO;
          }
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/PARSE_NBT.ts
  var OPERATOR_PARSE_NBT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName:
          "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt",
        nicknames: ["parseNBT"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "NBT",
            },
          },
          globalMap2
        ),
        symbol: "parse_nbt",
        interactName: "stringParseAsNbt",
        function: (data) => {
          return CompoundTag.fromJSON(data.valueOf());
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RECIPE_INPUT.ts
  var OPERATOR_RECIPE_INPUT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:recipe_input",
        nicknames: ["recipeInput", "recipeWithInput"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Recipe",
            },
            to: {
              type: "Ingredients",
            },
          },
          globalMap2
        ),
        symbol: "recipe_in",
        interactName: "recipeInput",
        function: (recipe) => {
          return recipe.getInput();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RECIPE_OUTPUT.ts
  var OPERATOR_RECIPE_OUTPUT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:recipe_output",
        nicknames: ["recipeOutput"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Recipe",
            },
            to: {
              type: "Ingredients",
            },
          },
          globalMap2
        ),
        symbol: "recipe_out",
        interactName: "recipeOutput",
        function: (recipe) => {
          return recipe.getOutput();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RECIPE_WITH_INPUT.ts
  var OPERATOR_RECIPE_WITH_INPUT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:recipe_with_input",
        nicknames: ["Recipe.with_in", "recipeWithInput"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Recipe",
            },
            to: {
              type: "Function",
              from: {
                type: "Ingredients",
              },
              to: {
                type: "Recipe",
              },
            },
          },
          globalMap2
        ),
        symbol: "Recipe.with_in",
        interactName: "recipeWithInput",
        function: (recipe) => {
          return (ingredients) => {
            return recipe.setInput(ingredients);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/Recipe.ts
  var Recipe = class _Recipe {
    input;
    output;
    constructor(input, output) {
      this.input = input;
      this.output = output;
    }
    getInput() {
      return this.input;
    }
    setInput(value) {
      return new _Recipe(value, this.output);
    }
    getOutput() {
      return this.output;
    }
    setOutput(value) {
      return new _Recipe(this.input, value);
    }
    equals(other) {
      if (!(other instanceof _Recipe)) return new iBoolean(false);
      if (!this.input.equals(other.input)) return new iBoolean(false);
      if (!this.output.equals(other.output)) return new iBoolean(false);
      return new iBoolean(true);
    }
    getSignatureNode() {
      return {
        type: "Recipe",
      };
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RECIPE_WITH_INPUT_OUTPUT.ts
  var OPERATOR_RECIPE_WITH_INPUT_OUTPUT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:recipe_with_input_output",
        nicknames: ["recipeWithInputOutput"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Ingredients",
            },
            to: {
              type: "Function",
              from: {
                type: "Ingredients",
              },
              to: {
                type: "Recipe",
              },
            },
          },
          globalMap2
        ),
        symbol: "Recipe.with_io",
        interactName: "ingredientsWithInputOutput",
        function: (input) => {
          return (output) => {
            return new Recipe(input, output);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RECIPE_WITH_OUTPUT.ts
  var OPERATOR_RECIPE_WITH_OUTPUT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:recipe_with_output",
        nicknames: ["recipeWithOutput"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Recipe",
            },
            to: {
              type: "Function",
              from: {
                type: "Ingredients",
              },
              to: {
                type: "Recipe",
              },
            },
          },
          globalMap2
        ),
        symbol: "Recipe.with_out",
        interactName: "recipeWithOutput",
        function: (recipe) => {
          return (ingredients) => {
            return recipe.setOutput(ingredients);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RELATIONAL_EQUALS.ts
  var OPERATOR_RELATIONAL_EQUALS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:relational_equals",
        nicknames: ["==", "relationalEquals"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "==",
        interactName: "anyEquals",
        function: (value1) => {
          return (value2) => {
            return value1.equals(value2);
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RELATIONAL_GE.ts
  var OPERATOR_RELATIONAL_GE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:relational_ge",
        nicknames: ["relationalGe", ">="],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: ">=",
        interactName: "anyGreaterThanOrEquals",
        function: (num1) => {
          return (num2) => {
            return new iBoolean(num1.gte(num2));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RELATIONAL_GT.ts
  var OPERATOR_RELATIONAL_GT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:relational_gt",
        nicknames: ["relationalGt", ">"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: ">",
        interactName: "numberGreaterThan",
        function: (num1) => {
          return (num2) => {
            return new iBoolean(num1.gt(num2));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RELATIONAL_LE.ts
  var OPERATOR_RELATIONAL_LE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:relational_le",
        nicknames: ["relationalLe", "<="],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "<=",
        interactName: "anyLessThanOrEquals",
        function: (num1) => {
          return (num2) => {
            return new iBoolean(num1.lte(num2));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RELATIONAL_LT.ts
  var OPERATOR_RELATIONAL_LT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:relational_lt",
        nicknames: ["relationalLt", "<"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Number",
            },
            to: {
              type: "Function",
              from: {
                type: "Number",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "<",
        interactName: "numberLessThan",
        function: (num1) => {
          return (num2) => {
            return new iBoolean(num1.lt(num2));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/RELATIONAL_NOTEQUALS.ts
  var OPERATOR_RELATIONAL_NOTEQUALS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:relational_notequals",
        nicknames: ["relationalNotequals", "!="],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "!=",
        interactName: "anyNotEquals",
        function: (value1) => {
          return (value2) => {
            return new iBoolean(!value1.equals(value2));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_CONCAT.ts
  var OPERATOR_STRING_CONCAT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_concat",
        nicknames: ["stringConcat"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "String",
              },
            },
          },
          globalMap2
        ),
        symbol: "+",
        interactName: "stringConcat",
        function: (str1) => {
          return (str2) => {
            return new iString(str1.valueOf().concat(str2.valueOf()));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_CONTAINS.ts
  var OPERATOR_STRING_CONTAINS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_contains",
        nicknames: ["stringContains"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "contains",
        interactName: "stringContains",
        function: (substring) => {
          return (fullString) => {
            return new iBoolean(
              fullString.valueOf().includes(substring.valueOf())
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_CONTAINS_REGEX.ts
  var import_re2_wasm2 = __toESM(require_re22());
  var OPERATOR_STRING_CONTAINS_REGEX = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_contains_regex",
        nicknames: ["containsRegex"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "contains_regex",
        interactName: "stringContainsRegex",
        function: (regexString) => {
          return (fullString) => {
            const regex = new import_re2_wasm2.RE2(regexString.valueOf(), "u");
            return new iBoolean(regex.test(fullString.valueOf()));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_ENDS_WITH.ts
  var OPERATOR_STRING_ENDS_WITH = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_ends_with",
        nicknames: ["endsWith", "stringEndsWith"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "ends_with",
        interactName: "stringEndsWith",
        function: (substring) => {
          return (fullString) => {
            return new iBoolean(
              fullString.valueOf().endsWith(substring.valueOf())
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_ERROR.ts
  var OPERATOR_STRING_ERROR = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_string_error",
        nicknames: ["error", "string_error"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "Any", typeID: 1 },
          },
          globalMap2
        ),
        symbol: "error",
        interactName: "stringStringError",
        function: (message) => {
          throw new Error(`Error: ${message.valueOf()}`);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_INDEX_OF.ts
  var OPERATOR_STRING_INDEX_OF = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_index_of",
        nicknames: ["stringIndexOf"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "index_of",
        interactName: "stringIndexOf",
        function: (substring) => {
          return (fullString) => {
            return new Integer(
              fullString.valueOf().indexOf(substring.valueOf())
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_INDEX_OF_REGEX.ts
  var import_re2_wasm3 = __toESM(require_re22());
  var OPERATOR_STRING_INDEX_OF_REGEX = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_index_of_regex",
        nicknames: ["indexOfRegex", "stringIndexOfRegex"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: "index_of_regex",
        interactName: "stringIndexOfRegex",
        function: (regexString) => {
          return (fullString) => {
            const regex = new import_re2_wasm3.RE2(regexString.valueOf(), "u");
            return new Integer(fullString.valueOf().search(regex));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_JOIN.ts
  var OPERATOR_STRING_JOIN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_join",
        nicknames: ["stringJoin"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: { type: "List", listType: { type: "String" } },
              to: {
                type: "String",
              },
            },
          },
          globalMap2
        ),
        symbol: "join",
        interactName: "stringJoin",
        function: (delimiter) => {
          return (stringList) => {
            if (
              stringList
                .valueOf()
                .some((item) => typeof item.valueOf() !== "string")
            ) {
              throw new Error("stringJoin expects a list of strings");
            }
            return new iString(
              stringList
                .valueOf()
                .map((s) => s.valueOf())
                .join(delimiter.valueOf())
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_LENGTH.ts
  var OPERATOR_STRING_LENGTH = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_length",
        nicknames: ["stringLength"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Integer",
            },
          },
          globalMap2
        ),
        symbol: "len",
        interactName: "stringLength",
        function: (str) => {
          return new Integer(str.valueOf().length);
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_MATCHES_REGEX.ts
  var import_re2_wasm4 = __toESM(require_re22());
  var OPERATOR_STRING_MATCHES_REGEX = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_matches_regex",
        nicknames: ["matchesRegex"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "matches_regex",
        interactName: "stringMatchesRegex",
        function: (regexString) => {
          return (fullString) => {
            let regex = regexString.valueOf();
            if (regex.startsWith("^")) regex = regex.slice(1);
            if (regex.endsWith("$")) regex = regex.slice(0, -1);
            const re2 = new import_re2_wasm4.RE2(`^(?:${regex})$`, "u");
            return new iBoolean(re2.test(fullString.valueOf()));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_REGEX_GROUP.ts
  var import_re2_wasm5 = __toESM(require_re22());
  var OPERATOR_STRING_REGEX_GROUP = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_regex_group",
        nicknames: ["stringRegexGroup"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Function",
                from: {
                  type: "String",
                },
                to: {
                  type: "String",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "regex_group",
        interactName: "stringRegexGroup",
        function: (regexString) => {
          return (groupIndex) => {
            return (fullString) => {
              const regex = new import_re2_wasm5.RE2(
                regexString.valueOf(),
                "u"
              );
              const match = regex.exec(fullString.valueOf());
              if (match && match[groupIndex.toJSNumber()] !== void 0) {
                return new iString(match[groupIndex.toJSNumber()]);
              } else {
                throw new Error(
                  `No match found for group index ${groupIndex.valueOf()} in regex "${regexString.valueOf()}" on string "${fullString.valueOf()}"`
                );
              }
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_REGEX_GROUPS.ts
  var import_re2_wasm6 = __toESM(require_re22());
  var OPERATOR_STRING_REGEX_GROUPS = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_regex_groups",
        nicknames: ["stringRegexGroups", "stringRegexGroups"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "String" } },
            },
          },
          globalMap2
        ),
        symbol: "regex_groups",
        interactName: "stringRegexGroups",
        function: (regexString) => {
          return (fullString) => {
            const regex = new import_re2_wasm6.RE2(regexString.valueOf(), "u");
            const match = regex.exec(fullString.valueOf());
            if (match) {
              return new iArrayEager(match.map((m) => new iString(m)));
            } else {
              throw new Error(
                `No match found for group in regex "${regexString.valueOf()}" on string "${fullString.valueOf()}"`
              );
            }
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_REGEX_SCAN.ts
  var import_re2_wasm7 = __toESM(require_re22());
  var OPERATOR_STRING_REGEX_SCAN = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_regex_scan",
        nicknames: ["stringRegexScan"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Function",
                from: {
                  type: "String",
                },
                to: { type: "List", listType: { type: "String" } },
              },
            },
          },
          globalMap2
        ),
        symbol: "regex_scan",
        interactName: "stringRegexScan",
        function: (regexString) => {
          return (groupIndex) => {
            return (fullString) => {
              const regex = new import_re2_wasm7.RE2(
                regexString.valueOf(),
                "gu"
              );
              let results = [];
              let match;
              regex.lastIndex = 0;
              while ((match = regex.exec(fullString.valueOf())) !== null) {
                const groupValue = match[groupIndex.toJSNumber()];
                if (groupValue !== void 0 && groupValue !== null) {
                  results.push(new iString(groupValue));
                }
              }
              return new iArrayEager(results);
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_REPLACE.ts
  var OPERATOR_STRING_REPLACE = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_replace",
        nicknames: ["stringReplace"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "String",
                },
                to: {
                  type: "String",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "replace",
        interactName: "stringReplace",
        function: (searchString) => {
          return (replacementString) => {
            return (fullString) => {
              return new iString(
                fullString
                  .valueOf()
                  .replace(searchString.valueOf(), replacementString.valueOf())
              );
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_REPLACE_REGEX.ts
  var import_re2_wasm8 = __toESM(require_re22());
  var OPERATOR_STRING_REPLACE_REGEX = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_replace_regex",
        nicknames: ["stringReplaceRegex"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Function",
                from: {
                  type: "String",
                },
                to: {
                  type: "String",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "replace_regex",
        interactName: "stringReplaceRegex",
        function: (regexString) => {
          return (replacementString) => {
            return (fullString) => {
              const regex = new import_re2_wasm8.RE2(
                regexString.valueOf(),
                "u"
              );
              return new iString(
                fullString.valueOf().replace(regex, replacementString.valueOf())
              );
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_SPLIT_ON.ts
  var OPERATOR_STRING_SPLIT_ON = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_split_on",
        nicknames: ["stringSplitOn"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "String" } },
            },
          },
          globalMap2
        ),
        symbol: "split_on",
        interactName: "stringSplitOn",
        function: (delimiter) => {
          return (fullString) => {
            return new iArrayEager(
              fullString
                .valueOf()
                .split(delimiter.valueOf())
                .map((s) => new iString(s))
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_SPLIT_ON_REGEX.ts
  var import_re2_wasm9 = __toESM(require_re22());
  var OPERATOR_STRING_SPLIT_ON_REGEX = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_split_on_regex",
        nicknames: ["stringSplitOnRegex"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: { type: "List", listType: { type: "String" } },
            },
          },
          globalMap2
        ),
        symbol: "split_on_regex",
        interactName: "stringSplitOnRegex",
        function: (regexString) => {
          return (fullString) => {
            const regex = new import_re2_wasm9.RE2(regexString.valueOf(), "u");
            return new iArrayEager(
              regex.split(fullString.valueOf()).map((s) => new iString(s))
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_STARTS_WITH.ts
  var OPERATOR_STRING_STARTS_WITH = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_starts_with",
        nicknames: ["startsWith", "stringStartsWith"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: {
              type: "Function",
              from: {
                type: "String",
              },
              to: {
                type: "Boolean",
              },
            },
          },
          globalMap2
        ),
        symbol: "starts_with",
        interactName: "stringStartsWith",
        function: (substring) => {
          return (fullString) => {
            return new iBoolean(
              fullString.valueOf().startsWith(substring.valueOf())
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_SUBSTRING.ts
  var OPERATOR_STRING_SUBSTRING = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_substring",
        nicknames: ["substring", "stringSubstring"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Function",
                from: {
                  type: "String",
                },
                to: {
                  type: "String",
                },
              },
            },
          },
          globalMap2
        ),
        symbol: "substring",
        interactName: "integerSubstring",
        function: (start) => {
          return (end) => {
            return (fullString) => {
              let endNum = end.toJSNumber();
              if (isNaN(endNum)) endNum = void 0;
              return new iString(
                fullString.valueOf().substring(start.toJSNumber(), endNum)
              );
            };
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/STRING_TAG.ts
  var OPERATOR_STRING_TAG = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_tag",
        nicknames: [
          "ItemstackTagStacks",
          "itemstack_tag_values",
          "itemstackTagValues",
          "item_tag_names",
          "itemTagNames",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "String",
            },
            to: { type: "List", listType: { type: "Item" } },
          },
          globalMap2
        ),
        symbol: "item_tag_values",
        interactName: "stringItemsByTag",
        function: () => {
          throw new Error(
            "Item tag values is infeasible without a registry. This is a placeholder function."
          );
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/UNIQUELY_NAMED_UNIQUE_NAME.ts
  var OPERATOR_UNIQUELY_NAMED_UNIQUE_NAME = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:string_unique_name",
        nicknames: ["uname", "uniquelynamedUniquename"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "UniquelyNamed",
            },
            to: {
              type: "String",
            },
          },
          globalMap2
        ),
        symbol: "uname",
        interactName: "uniquely_namedUniqueName",
        function: (uniquelyNamed) => {
          return uniquelyNamed.getUniqueName();
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/BINARY_RZSHIFT.ts
  var OPERATOR_BINARY_RZSHIFT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:binary_rzshift",
        nicknames: [
          ">>>",
          "binaryRzshift",
          "integerUnsignedRightShift",
          "binaryUnsignedRightShift",
          "integerRzshift",
        ],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: {
              type: "Integer",
            },
            to: {
              type: "Function",
              from: {
                type: "Integer",
              },
              to: {
                type: "Integer",
              },
            },
          },
          globalMap2
        ),
        symbol: ">>>",
        interactName: "integerUnsignedRightShift",
        function: (int1) => {
          return (int2) => {
            return new Integer(int1.unsignedRightShift(int2));
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operators/LIST_LAZYBUILT.ts
  var OPERATOR_LIST_LAZYBUILT = class extends BaseOperator {
    constructor(globalMap2) {
      super({
        internalName: "integrateddynamics:list_lazybuilt",
        nicknames: ["listLazybuilt", "lazybuilt", "anyLazyBuilt"],
        parsedSignature: new ParsedSignature(
          {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: {
                type: "Operator",
                obscured: {
                  type: "Function",
                  from: { type: "Any", typeID: 1 },
                  to: { type: "Any", typeID: 1 },
                },
              },
              to: { type: "List", listType: { type: "Any", typeID: 1 } },
            },
          },
          globalMap2
        ),
        symbol: "lazybuilt",
        interactName: "anyLazyBuilt",
        function: (initial) => {
          return (builder) => {
            return new iArrayLazy(
              initial,
              builder,
              new OPERATOR_GENERAL_IDENTITY(globalMap2)
            );
          };
        },
      });
    }
  };

  // TSFiles/IntegratedDynamicsClasses/operators/operatorRegistry.ts
  var globalMap = new TypeMap();
  var operatorRegistryClass = class {
    constructor() {}
    find = (uname) => {
      for (const value of Object.values(this)) {
        if (typeof value === "function") continue;
        if (value.getUname() === uname) return value;
      }
    };
    LOGICAL_AND = new OPERATOR_LOGICAL_AND(globalMap);
    LOGICAL_OR = new OPERATOR_LOGICAL_OR(globalMap);
    LOGICAL_NOT = new OPERATOR_LOGICAL_NOT(globalMap);
    LOGICAL_NAND = new OPERATOR_LOGICAL_NAND(globalMap);
    LOGICAL_NOR = new OPERATOR_LOGICAL_NOR(globalMap);
    ARITHMETIC_ADDITION = new OPERATOR_ARITHMETIC_ADDITION(globalMap);
    ARITHMETIC_SUBTRACTION = new OPERATOR_ARITHMETIC_SUBTRACTION(globalMap);
    ARITHMETIC_MULTIPLICATION = new OPERATOR_ARITHMETIC_MULTIPLICATION(
      globalMap
    );
    ARITHMETIC_DIVISION = new OPERATOR_ARITHMETIC_DIVISION(globalMap);
    ARITHMETIC_MAXIMUM = new OPERATOR_ARITHMETIC_MAXIMUM(globalMap);
    ARITHMETIC_MINIMUM = new OPERATOR_ARITHMETIC_MINIMUM(globalMap);
    ARITHMETIC_INCREMENT = new OPERATOR_ARITHMETIC_INCREMENT(globalMap);
    ARITHMETIC_DECREMENT = new OPERATOR_ARITHMETIC_DECREMENT(globalMap);
    ARITHMETIC_MODULUS = new OPERATOR_ARITHMETIC_MODULUS(globalMap);
    DOUBLE_SQRT = new OPERATOR_DOUBLE_SQRT(globalMap);
    DOUBLE_POW = new OPERATOR_DOUBLE_POW(globalMap);
    RELATIONAL_EQUALS = new OPERATOR_RELATIONAL_EQUALS(globalMap);
    RELATIONAL_GT = new OPERATOR_RELATIONAL_GT(globalMap);
    RELATIONAL_LT = new OPERATOR_RELATIONAL_LT(globalMap);
    RELATIONAL_NOTEQUALS = new OPERATOR_RELATIONAL_NOTEQUALS(globalMap);
    RELATIONAL_GE = new OPERATOR_RELATIONAL_GE(globalMap);
    RELATIONAL_LE = new OPERATOR_RELATIONAL_LE(globalMap);
    BINARY_AND = new OPERATOR_BINARY_AND(globalMap);
    BINARY_OR = new OPERATOR_BINARY_OR(globalMap);
    BINARY_XOR = new OPERATOR_BINARY_XOR(globalMap);
    BINARY_COMPLEMENT = new OPERATOR_BINARY_COMPLEMENT(globalMap);
    BINARY_LSHIFT = new OPERATOR_BINARY_LSHIFT(globalMap);
    BINARY_RSHIFT = new OPERATOR_BINARY_RSHIFT(globalMap);
    BINARY_RZSHIFT = new OPERATOR_BINARY_RZSHIFT(globalMap);
    STRING_LENGTH = new OPERATOR_STRING_LENGTH(globalMap);
    STRING_CONCAT = new OPERATOR_STRING_CONCAT(globalMap);
    STRING_CONTAINS = new OPERATOR_STRING_CONTAINS(globalMap);
    STRING_CONTAINS_REGEX = new OPERATOR_STRING_CONTAINS_REGEX(globalMap);
    STRING_MATCHES_REGEX = new OPERATOR_STRING_MATCHES_REGEX(globalMap);
    STRING_INDEX_OF = new OPERATOR_STRING_INDEX_OF(globalMap);
    STRING_INDEX_OF_REGEX = new OPERATOR_STRING_INDEX_OF_REGEX(globalMap);
    STRING_STARTS_WITH = new OPERATOR_STRING_STARTS_WITH(globalMap);
    STRING_ENDS_WITH = new OPERATOR_STRING_ENDS_WITH(globalMap);
    STRING_SPLIT_ON = new OPERATOR_STRING_SPLIT_ON(globalMap);
    STRING_SPLIT_ON_REGEX = new OPERATOR_STRING_SPLIT_ON_REGEX(globalMap);
    STRING_SUBSTRING = new OPERATOR_STRING_SUBSTRING(globalMap);
    STRING_REGEX_GROUP = new OPERATOR_STRING_REGEX_GROUP(globalMap);
    STRING_REGEX_GROUPS = new OPERATOR_STRING_REGEX_GROUPS(globalMap);
    STRING_REGEX_SCAN = new OPERATOR_STRING_REGEX_SCAN(globalMap);
    STRING_REPLACE = new OPERATOR_STRING_REPLACE(globalMap);
    STRING_REPLACE_REGEX = new OPERATOR_STRING_REPLACE_REGEX(globalMap);
    STRING_JOIN = new OPERATOR_STRING_JOIN(globalMap);
    NAMED_NAME = new OPERATOR_NAMED_NAME(globalMap);
    UNIQUELY_NAMED_UNIQUE_NAME = new OPERATOR_UNIQUELY_NAMED_UNIQUE_NAME(
      globalMap
    );
    STRING_ERROR = new OPERATOR_STRING_ERROR(globalMap);
    NUMBER_ROUND = new OPERATOR_NUMBER_ROUND(globalMap);
    NUMBER_CEIL = new OPERATOR_NUMBER_CEIL(globalMap);
    NUMBER_FLOOR = new OPERATOR_NUMBER_FLOOR(globalMap);
    NUMBER_COMPACT = new OPERATOR_NUMBER_COMPACT(globalMap);
    NULLABLE_ISNULL = new OPERATOR_NULLABLE_ISNULL(globalMap);
    NULLABLE_ISNOTNULL = new OPERATOR_NULLABLE_ISNOTNULL(globalMap);
    LIST_LENGTH = new OPERATOR_LIST_LENGTH(globalMap);
    LIST_EMPTY = new OPERATOR_LIST_EMPTY(globalMap);
    LIST_NOT_EMPTY = new OPERATOR_LIST_NOT_EMPTY(globalMap);
    LIST_ELEMENT = new OPERATOR_LIST_ELEMENT(globalMap);
    LIST_ELEMENT_DEFAULT = new OPERATOR_LIST_ELEMENT_DEFAULT(globalMap);
    LIST_CONTAINS = new OPERATOR_LIST_CONTAINS(globalMap);
    LIST_CONTAINS_PREDICATE = new OPERATOR_LIST_CONTAINS_PREDICATE(globalMap);
    LIST_COUNT = new OPERATOR_LIST_COUNT(globalMap);
    LIST_COUNT_PREDICATE = new OPERATOR_LIST_COUNT_PREDICATE(globalMap);
    LIST_APPEND = new OPERATOR_LIST_APPEND(globalMap);
    LIST_CONCAT = new OPERATOR_LIST_CONCAT(globalMap);
    LIST_LAZYBUILT = new OPERATOR_LIST_LAZYBUILT(globalMap);
    LIST_HEAD = new OPERATOR_LIST_HEAD(globalMap);
    LIST_TAIL = new OPERATOR_LIST_TAIL(globalMap);
    LIST_UNIQ_PREDICATE = new OPERATOR_LIST_UNIQ_PREDICATE(globalMap);
    LIST_UNIQ = new OPERATOR_LIST_UNIQ(globalMap);
    LIST_SLICE = new OPERATOR_LIST_SLICE(globalMap);
    LIST_INTERSECTION = new OPERATOR_LIST_INTERSECTION(globalMap);
    LIST_EQUALS_SET = new OPERATOR_LIST_EQUALS_SET(globalMap);
    LIST_EQUALS_MULTISET = new OPERATOR_LIST_EQUALS_MULTISET(globalMap);
    OBJECT_BLOCK_OPAQUE = new OPERATOR_OBJECT_BLOCK_OPAQUE(globalMap);
    OBJECT_BLOCK_ITEMSTACK = new OPERATOR_OBJECT_BLOCK_ITEMSTACK(globalMap);
    OBJECT_BLOCK_MODNAME = new OPERATOR_OBJECT_BLOCK_MODNAME(globalMap);
    OBJECT_BLOCK_BREAKSOUND = new OPERATOR_OBJECT_BLOCK_BREAKSOUND(globalMap);
    OBJECT_BLOCK_PLACESOUND = new OPERATOR_OBJECT_BLOCK_PLACESOUND(globalMap);
    OBJECT_BLOCK_STEPSOUND = new OPERATOR_OBJECT_BLOCK_STEPSOUND(globalMap);
    OBJECT_BLOCK_ISSHEARABLE = new OPERATOR_OBJECT_BLOCK_ISSHEARABLE(globalMap);
    OBJECT_BLOCK_PLANTAGE = new OPERATOR_OBJECT_BLOCK_PLANTAGE(globalMap);
    OBJECT_BLOCK_BY_NAME = new OPERATOR_OBJECT_BLOCK_BY_NAME(globalMap);
    OBJECT_BLOCK_PROPERTIES = new OPERATOR_OBJECT_BLOCK_PROPERTIES(globalMap);
    OBJECT_BLOCK_WITH_PROPERTIES = new OPERATOR_OBJECT_BLOCK_WITH_PROPERTIES(
      globalMap
    );
    OBJECT_BLOCK_POSSIBLE_PROPERTIES =
      new OPERATOR_OBJECT_BLOCK_POSSIBLE_PROPERTIES(globalMap);
    OBJECT_BLOCK_TAG = new OPERATOR_OBJECT_BLOCK_TAG(globalMap);
    OBJECT_BLOCK_TAG_STACKS = new OPERATOR_OBJECT_BLOCK_TAG_STACKS(globalMap);
    OBJECT_ITEMSTACK_SIZE = new OPERATOR_OBJECT_ITEMSTACK_SIZE(globalMap);
    OBJECT_ITEMSTACK_MAXSIZE = new OPERATOR_OBJECT_ITEMSTACK_MAXSIZE(globalMap);
    OBJECT_ITEMSTACK_ISSTACKABLE = new OPERATOR_OBJECT_ITEMSTACK_ISSTACKABLE(
      globalMap
    );
    OBJECT_ITEMSTACK_ISDAMAGEABLE = new OPERATOR_OBJECT_ITEMSTACK_ISDAMAGEABLE(
      globalMap
    );
    OBJECT_ITEMSTACK_DAMAGE = new OPERATOR_OBJECT_ITEMSTACK_DAMAGE(globalMap);
    OBJECT_ITEMSTACK_MAXDAMAGE = new OPERATOR_OBJECT_ITEMSTACK_MAXDAMAGE(
      globalMap
    );
    OBJECT_ITEMSTACK_ISENCHANTED = new OPERATOR_OBJECT_ITEMSTACK_ISENCHANTED(
      globalMap
    );
    OBJECT_ITEMSTACK_ISENCHANTABLE =
      new OPERATOR_OBJECT_ITEMSTACK_ISENCHANTABLE(globalMap);
    OBJECT_ITEMSTACK_REPAIRCOST = new OPERATOR_OBJECT_ITEMSTACK_REPAIRCOST(
      globalMap
    );
    OBJECT_ITEMSTACK_RARITY = new OPERATOR_OBJECT_ITEMSTACK_RARITY(globalMap);
    OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK =
      new OPERATOR_OBJECT_ITEMSTACK_STRENGTH_VS_BLOCK(globalMap);
    OBJECT_ITEMSTACK_CANHARVESTBLOCK =
      new OPERATOR_OBJECT_ITEMSTACK_CANHARVESTBLOCK(globalMap);
    OBJECT_ITEMSTACK_BLOCK = new OPERATOR_OBJECT_ITEMSTACK_BLOCK(globalMap);
    OBJECT_ITEMSTACK_ISFLUIDSTACK = new OPERATOR_OBJECT_ITEMSTACK_ISFLUIDSTACK(
      globalMap
    );
    OBJECT_ITEMSTACK_FLUIDSTACK = new OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACK(
      globalMap
    );
    OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY =
      new OPERATOR_OBJECT_ITEMSTACK_FLUIDSTACKCAPACITY(globalMap);
    OBJECT_ITEMSTACK_ISDATAEQUAL = new OPERATOR_OBJECT_ITEMSTACK_ISDATAEQUAL(
      globalMap
    );
    OBJECT_ITEMSTACK_ISITEMEQUALNODATA =
      new OPERATOR_OBJECT_ITEMSTACK_ISITEMEQUALNODATA(globalMap);
    OBJECT_ITEMSTACK_ISRAWITEMEQUAL =
      new OPERATOR_OBJECT_ITEMSTACK_ISRAWITEMEQUAL(globalMap);
    OBJECT_ITEMSTACK_MODNAME = new OPERATOR_OBJECT_ITEMSTACK_MODNAME(globalMap);
    OBJECT_ITEMSTACK_FUELBURNTIME = new OPERATOR_OBJECT_ITEMSTACK_FUELBURNTIME(
      globalMap
    );
    ITEMSTACK_CANBURN = new OPERATOR_ITEMSTACK_CANBURN(globalMap);
    ITEMSTACK_TAG = new OPERATOR_ITEMSTACK_TAG(globalMap);
    STRING_TAG = new OPERATOR_STRING_TAG(globalMap);
    OBJECT_ITEMSTACK_TAG_STACKS = new OPERATOR_OBJECT_ITEMSTACK_TAG_STACKS(
      globalMap
    );
    OBJECT_ITEMSTACK_WITHSIZE = new OPERATOR_OBJECT_ITEMSTACK_WITHSIZE(
      globalMap
    );
    ITEMSTACK_ISFECONTAINER = new OPERATOR_ITEMSTACK_ISFECONTAINER(globalMap);
    OBJECT_ITEMSTACK_STORED_FE = new OPERATOR_OBJECT_ITEMSTACK_STORED_FE(
      globalMap
    );
    OBJECT_ITEMSTACK_FE_CAPACITY = new OPERATOR_OBJECT_ITEMSTACK_FE_CAPACITY(
      globalMap
    );
    OBJECT_ITEMSTACK_HASINVENTORY = new OPERATOR_OBJECT_ITEMSTACK_HASINVENTORY(
      globalMap
    );
    OBJECT_ITEMSTACK_INVENTORYSIZE =
      new OPERATOR_OBJECT_ITEMSTACK_INVENTORYSIZE(globalMap);
    OBJECT_ITEMSTACK_INVENTORY = new OPERATOR_OBJECT_ITEMSTACK_INVENTORY(
      globalMap
    );
    ITEMSTACK_ITEMBYNAME = new OPERATOR_ITEMSTACK_ITEMBYNAME(globalMap);
    ITEMSTACK_ITEMLISTCOUNT = new OPERATOR_ITEMSTACK_ITEMLISTCOUNT(globalMap);
    OBJECT_ITEMSTACK_NBT = new OPERATOR_OBJECT_ITEMSTACK_NBT(globalMap);
    OBJECT_ITEMSTACK_HASNBT = new OPERATOR_OBJECT_ITEMSTACK_HASNBT(globalMap);
    OBJECT_ITEMSTACK_DATA_KEYS = new OPERATOR_OBJECT_ITEMSTACK_DATA_KEYS(
      globalMap
    );
    ITEMSTACK_DATAVALUE = new OPERATOR_ITEMSTACK_DATAVALUE(globalMap);
    ITEMSTACK_WITHDATA = new OPERATOR_ITEMSTACK_WITHDATA(globalMap);
    ITEMSTACK_TOOLTIP = new OPERATOR_ITEMSTACK_TOOLTIP(globalMap);
    OBJECT_ENTITY_ENTITYITEMTOOLTIP =
      new OPERATOR_OBJECT_ENTITY_ENTITYITEMTOOLTIP(globalMap);
    OBJECT_ENTITY_ISMOB = new OPERATOR_OBJECT_ENTITY_ISMOB(globalMap);
    OBJECT_ENTITY_ISANIMAL = new OPERATOR_OBJECT_ENTITY_ISANIMAL(globalMap);
    OBJECT_ENTITY_ISITEM = new OPERATOR_OBJECT_ENTITY_ISITEM(globalMap);
    OBJECT_ENTITY_ISPLAYER = new OPERATOR_OBJECT_ENTITY_ISPLAYER(globalMap);
    ENTITY_ISMINECART = new OPERATOR_ENTITY_ISMINECART(globalMap);
    ENTITY_ITEM = new OPERATOR_ENTITY_ITEM(globalMap);
    ENTITY_HEALTH = new OPERATOR_ENTITY_HEALTH(globalMap);
    ENTITY_WIDTH = new OPERATOR_ENTITY_WIDTH(globalMap);
    OBJECT_ENTITY_WIDTH = new OPERATOR_OBJECT_ENTITY_WIDTH(globalMap);
    OBJECT_ENTITY_HEIGHT = new OPERATOR_OBJECT_ENTITY_HEIGHT(globalMap);
    OBJECT_ENTITY_ISBURNING = new OPERATOR_OBJECT_ENTITY_ISBURNING(globalMap);
    OBJECT_ENTITY_ISWET = new OPERATOR_OBJECT_ENTITY_ISWET(globalMap);
    OBJECT_ENTITY_ISCROUCHING = new OPERATOR_OBJECT_ENTITY_ISCROUCHING(
      globalMap
    );
    OBJECT_ENTITY_ISEATING = new OPERATOR_OBJECT_ENTITY_ISEATING(globalMap);
    ENTITY_ARMORINVENTORY = new OPERATOR_ENTITY_ARMORINVENTORY(globalMap);
    OBJECT_ENTITY_INVENTORY = new OPERATOR_OBJECT_ENTITY_INVENTORY(globalMap);
    OBJECT_ENTITY_MODNAME = new OPERATOR_OBJECT_ENTITY_MODNAME(globalMap);
    OBJECT_PLAYER_TARGETBLOCK = new OPERATOR_OBJECT_PLAYER_TARGETBLOCK(
      globalMap
    );
    OBJECT_PLAYER_TARGETENTITY = new OPERATOR_OBJECT_PLAYER_TARGETENTITY(
      globalMap
    );
    ENTITY_HASGUIOPEN = new OPERATOR_ENTITY_HASGUIOPEN(globalMap);
    ENTITY_HELDITEM = new OPERATOR_ENTITY_HELDITEM(globalMap);
    ENTITY_HELDITEMOFFHAND = new OPERATOR_ENTITY_HELDITEMOFFHAND(globalMap);
    OBJECT_ENTITY_MOUNTED = new OPERATOR_OBJECT_ENTITY_MOUNTED(globalMap);
    OBJECT_ITEMFRAME_CONTENTS = new OPERATOR_OBJECT_ITEMFRAME_CONTENTS(
      globalMap
    );
    OBJECT_ITEMFRAME_ROTATION = new OPERATOR_OBJECT_ITEMFRAME_ROTATION(
      globalMap
    );
    OBJECT_ENTITY_HURTSOUND = new OPERATOR_OBJECT_ENTITY_HURTSOUND(globalMap);
    OBJECT_ENTITY_DEATHSOUND = new OPERATOR_OBJECT_ENTITY_DEATHSOUND(globalMap);
    OBJECT_ENTITY_AGE = new OPERATOR_OBJECT_ENTITY_AGE(globalMap);
    OBJECT_ENTITY_ISCHILD = new OPERATOR_OBJECT_ENTITY_ISCHILD(globalMap);
    OBJECT_ENTITY_CANBREED = new OPERATOR_OBJECT_ENTITY_CANBREED(globalMap);
    OBJECT_ENTITY_ISINLOVE = new OPERATOR_OBJECT_ENTITY_ISINLOVE(globalMap);
    OBJECT_ENTITY_CANBREEDWITH = new OPERATOR_OBJECT_ENTITY_CANBREEDWITH(
      globalMap
    );
    OBJECT_ENTITY_ISSHEARABLE = new OPERATOR_OBJECT_ENTITY_ISSHEARABLE(
      globalMap
    );
    OBJECT_ENTITY_NBT = new OPERATOR_OBJECT_ENTITY_NBT(globalMap);
    OBJECT_ENTITY_TYPE = new OPERATOR_OBJECT_ENTITY_TYPE(globalMap);
    OBJECT_ENTITY_ITEMS = new OPERATOR_OBJECT_ENTITY_ITEMS(globalMap);
    OBJECT_ENTITY_FLUIDS = new OPERATOR_OBJECT_ENTITY_FLUIDS(globalMap);
    OBJECT_ENTITY_ENERGY_STORED = new OPERATOR_OBJECT_ENTITY_ENERGY_STORED(
      globalMap
    );
    OBJECT_ENTITY_ENERGY_CAPACITY = new OPERATOR_OBJECT_ENTITY_ENERGY_CAPACITY(
      globalMap
    );
    OBJECT_FLUIDSTACK_AMOUNT = new OPERATOR_OBJECT_FLUIDSTACK_AMOUNT(globalMap);
    OBJECT_FLUIDSTACK_BLOCK = new OPERATOR_OBJECT_FLUIDSTACK_BLOCK(globalMap);
    OBJECT_FLUIDSTACK_LIGHT_LEVEL = new OPERATOR_OBJECT_FLUIDSTACK_LIGHT_LEVEL(
      globalMap
    );
    OBJECT_FLUIDSTACK_DENSITY = new OPERATOR_OBJECT_FLUIDSTACK_DENSITY(
      globalMap
    );
    OBJECT_FLUIDSTACK_TEMPERATURE = new OPERATOR_OBJECT_FLUIDSTACK_TEMPERATURE(
      globalMap
    );
    OBJECT_FLUIDSTACK_VISCOSITY = new OPERATOR_OBJECT_FLUIDSTACK_VISCOSITY(
      globalMap
    );
    OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR =
      new OPERATOR_OBJECT_FLUIDSTACK_IS_LIGHTER_THAN_AIR(globalMap);
    OBJECT_FLUIDSTACK_RARITY = new OPERATOR_OBJECT_FLUIDSTACK_RARITY(globalMap);
    OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY =
      new OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_EMPTY(globalMap);
    OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE =
      new OPERATOR_OBJECT_FLUIDSTACK_SOUND_FLUID_VAPORIZE(globalMap);
    OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL =
      new OPERATOR_OBJECT_FLUIDSTACK_SOUND_BUCKET_FILL(globalMap);
    OBJECT_FLUIDSTACK_BUCKET = new OPERATOR_OBJECT_FLUIDSTACK_BUCKET(globalMap);
    OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL =
      new OPERATOR_OBJECT_FLUIDSTACK_ISRAWFLUIDEQUAL(globalMap);
    OBJECT_FLUIDSTACK_MODNAME = new OPERATOR_OBJECT_FLUIDSTACK_MODNAME(
      globalMap
    );
    OBJECT_FLUIDSTACK_DATA = new OPERATOR_OBJECT_FLUIDSTACK_DATA(globalMap);
    OBJECT_FLUIDSTACK_WITH_AMOUNT = new OPERATOR_OBJECT_FLUIDSTACK_WITH_AMOUNT(
      globalMap
    );
    OBJECT_FLUIDSTACK_DATAKEYS = new OPERATOR_OBJECT_FLUIDSTACK_DATAKEYS(
      globalMap
    );
    OBJECT_FLUIDSTACK_DATA_VALUE = new OPERATOR_OBJECT_FLUIDSTACK_DATA_VALUE(
      globalMap
    );
    OBJECT_FLUIDSTACK_WITH_DATA = new OPERATOR_OBJECT_FLUIDSTACK_WITH_DATA(
      globalMap
    );
    OBJECT_FLUIDSTACK_BY_NAME = new OPERATOR_OBJECT_FLUIDSTACK_BY_NAME(
      globalMap
    );
    OBJECT_FLUIDSTACK_TAG = new OPERATOR_OBJECT_FLUIDSTACK_TAG(globalMap);
    OBJECT_FLUIDSTACK_TAG_STACKS = new OPERATOR_OBJECT_FLUIDSTACK_TAG_STACKS(
      globalMap
    );
    OPERATOR_APPLY = new OPERATOR_OPERATOR_APPLY(globalMap);
    OPERATOR_APPLY_2 = new OPERATOR_OPERATOR_APPLY_2(globalMap);
    OPERATOR_APPLY_3 = new OPERATOR_OPERATOR_APPLY_3(globalMap);
    OPERATOR_APPLY_N = new OPERATOR_OPERATOR_APPLY_N(globalMap);
    OPERATOR_APPLY_0 = new OPERATOR_OPERATOR_APPLY_0(globalMap);
    OPERATOR_MAP = new OPERATOR_OPERATOR_MAP(globalMap);
    OPERATOR_FILTER = new OPERATOR_OPERATOR_FILTER(globalMap);
    OPERATOR_CONJUNCTION = new OPERATOR_OPERATOR_CONJUNCTION(globalMap);
    OPERATOR_DISJUNCTION = new OPERATOR_OPERATOR_DISJUNCTION(globalMap);
    OPERATOR_NEGATION = new OPERATOR_OPERATOR_NEGATION(globalMap);
    OPERATOR_PIPE = new OPERATOR_OPERATOR_PIPE(globalMap);
    OPERATOR_PIPE2 = new OPERATOR_OPERATOR_PIPE2(globalMap);
    OPERATOR_FLIP = new OPERATOR_OPERATOR_FLIP(globalMap);
    OPERATOR_REDUCE = new OPERATOR_OPERATOR_REDUCE(globalMap);
    OPERATOR_REDUCE1 = new OPERATOR_OPERATOR_REDUCE1(globalMap);
    OPERATOR_BY_NAME = new OPERATOR_OPERATOR_BY_NAME(globalMap);
    NBT_COMPOUND_SIZE = new OPERATOR_NBT_COMPOUND_SIZE(globalMap);
    NBT_COMPOUND_KEYS = new OPERATOR_NBT_COMPOUND_KEYS(globalMap);
    NBT_COMPOUND_HASKEY = new OPERATOR_NBT_COMPOUND_HASKEY(globalMap);
    NBT_COMPOUND_VALUE_TYPE = new OPERATOR_NBT_COMPOUND_VALUE_TYPE(globalMap);
    NBT_COMPOUND_VALUE_TAG = new OPERATOR_NBT_COMPOUND_VALUE_TAG(globalMap);
    NBT_COMPOUND_VALUE_BOOLEAN = new OPERATOR_NBT_COMPOUND_VALUE_BOOLEAN(
      globalMap
    );
    NBT_COMPOUND_VALUE_INTEGER = new OPERATOR_NBT_COMPOUND_VALUE_INTEGER(
      globalMap
    );
    NBT_COMPOUND_VALUE_LONG = new OPERATOR_NBT_COMPOUND_VALUE_LONG(globalMap);
    NBT_COMPOUND_VALUE_DOUBLE = new OPERATOR_NBT_COMPOUND_VALUE_DOUBLE(
      globalMap
    );
    NBT_COMPOUND_VALUE_STRING = new OPERATOR_NBT_COMPOUND_VALUE_STRING(
      globalMap
    );
    NBT_COMPOUND_VALUE_COMPOUND = new OPERATOR_NBT_COMPOUND_VALUE_COMPOUND(
      globalMap
    );
    NBT_COMPOUND_VALUE_LIST_TAG = new OPERATOR_NBT_COMPOUND_VALUE_LIST_TAG(
      globalMap
    );
    NBT_COMPOUND_VALUE_LIST_BYTE = new OPERATOR_NBT_COMPOUND_VALUE_LIST_BYTE(
      globalMap
    );
    NBT_COMPOUND_VALUE_LIST_INT = new OPERATOR_NBT_COMPOUND_VALUE_LIST_INT(
      globalMap
    );
    NBT_COMPOUND_VALUE_LIST_LONG = new OPERATOR_NBT_COMPOUND_VALUE_LIST_LONG(
      globalMap
    );
    NBT_COMPOUND_WITHOUT = new OPERATOR_NBT_COMPOUND_WITHOUT(globalMap);
    NBT_COMPOUND_WITH_BOOLEAN = new OPERATOR_NBT_COMPOUND_WITH_BOOLEAN(
      globalMap
    );
    NBT_COMPOUND_WITH_SHORT = new OPERATOR_NBT_COMPOUND_WITH_SHORT(globalMap);
    NBT_COMPOUND_WITH_INTEGER = new OPERATOR_NBT_COMPOUND_WITH_INTEGER(
      globalMap
    );
    NBT_COMPOUND_WITH_LONG = new OPERATOR_NBT_COMPOUND_WITH_LONG(globalMap);
    NBT_COMPOUND_WITH_DOUBLE = new OPERATOR_NBT_COMPOUND_WITH_DOUBLE(globalMap);
    NBT_COMPOUND_WITH_FLOAT = new OPERATOR_NBT_COMPOUND_WITH_FLOAT(globalMap);
    NBT_COMPOUND_WITH_STRING = new OPERATOR_NBT_COMPOUND_WITH_STRING(globalMap);
    NBT_COMPOUND_WITH_COMPOUND = new OPERATOR_NBT_COMPOUND_WITH_COMPOUND(
      globalMap
    );
    NBT_COMPOUND_WITH_LIST_TAG = new OPERATOR_NBT_COMPOUND_WITH_LIST_TAG(
      globalMap
    );
    NBT_COMPOUND_WITH_LIST_BYTE = new OPERATOR_NBT_COMPOUND_WITH_LIST_BYTE(
      globalMap
    );
    NBT_COMPOUND_WITH_LIST_INT = new OPERATOR_NBT_COMPOUND_WITH_LIST_INT(
      globalMap
    );
    NBT_COMPOUND_WITH_LIST_LONG = new OPERATOR_NBT_COMPOUND_WITH_LIST_LONG(
      globalMap
    );
    NBT_COMPOUND_SUBSET = new OPERATOR_NBT_COMPOUND_SUBSET(globalMap);
    NBT_COMPOUND_UNION = new OPERATOR_NBT_COMPOUND_UNION(globalMap);
    NBT_COMPOUND_INTERSECTION = new OPERATOR_NBT_COMPOUND_INTERSECTION(
      globalMap
    );
    NBT_COMPOUND_MINUS = new OPERATOR_NBT_COMPOUND_MINUS(globalMap);
    NBT_AS_BOOLEAN = new OPERATOR_NBT_AS_BOOLEAN(globalMap);
    NBT_AS_BYTE = new OPERATOR_NBT_AS_BYTE(globalMap);
    NBT_AS_SHORT = new OPERATOR_NBT_AS_SHORT(globalMap);
    NBT_AS_INT = new OPERATOR_NBT_AS_INT(globalMap);
    NBT_AS_LONG = new OPERATOR_NBT_AS_LONG(globalMap);
    NBT_AS_DOUBLE = new OPERATOR_NBT_AS_DOUBLE(globalMap);
    NBT_AS_FLOAT = new OPERATOR_NBT_AS_FLOAT(globalMap);
    NBT_AS_STRING = new OPERATOR_NBT_AS_STRING(globalMap);
    NBT_AS_TAG_LIST = new OPERATOR_NBT_AS_TAG_LIST(globalMap);
    NBT_AS_BYTE_LIST = new OPERATOR_NBT_AS_BYTE_LIST(globalMap);
    NBT_AS_INT_LIST = new OPERATOR_NBT_AS_INT_LIST(globalMap);
    NBT_AS_LONG_LIST = new OPERATOR_NBT_AS_LONG_LIST(globalMap);
    NBT_FROM_BOOLEAN = new OPERATOR_NBT_FROM_BOOLEAN(globalMap);
    NBT_FROM_SHORT = new OPERATOR_NBT_FROM_SHORT(globalMap);
    NBT_FROM_BYTE = new OPERATOR_NBT_FROM_BYTE(globalMap);
    NBT_FROM_INT = new OPERATOR_NBT_FROM_INT(globalMap);
    NBT_FROM_LONG = new OPERATOR_NBT_FROM_LONG(globalMap);
    NBT_FROM_DOUBLE = new OPERATOR_NBT_FROM_DOUBLE(globalMap);
    NBT_FROM_FLOAT = new OPERATOR_NBT_FROM_FLOAT(globalMap);
    NBT_FROM_STRING = new OPERATOR_NBT_FROM_STRING(globalMap);
    NBT_FROM_TAG_LIST = new OPERATOR_NBT_FROM_TAG_LIST(globalMap);
    NBT_FROM_BYTE_LIST = new OPERATOR_NBT_FROM_BYTE_LIST(globalMap);
    NBT_FROM_INT_LIST = new OPERATOR_NBT_FROM_INT_LIST(globalMap);
    NBT_FROM_LONG_LIST = new OPERATOR_NBT_FROM_LONG_LIST(globalMap);
    NBT_PATH_MATCH_FIRST = new OPERATOR_NBT_PATH_MATCH_FIRST(globalMap);
    NBT_PATH_MATCH_ALL = new OPERATOR_NBT_PATH_MATCH_ALL(globalMap);
    NBT_PATH_TEST = new OPERATOR_NBT_PATH_TEST(globalMap);
    INGREDIENTS_ITEMS = new OPERATOR_INGREDIENTS_ITEMS(globalMap);
    INGREDIENTS_FLUIDS = new OPERATOR_INGREDIENTS_FLUIDS(globalMap);
    INGREDIENTS_ENERGIES = new OPERATOR_INGREDIENTS_ENERGIES(globalMap);
    INGREDIENTS_WITH_ITEM = new OPERATOR_INGREDIENTS_WITH_ITEM(globalMap);
    INGREDIENTS_WITH_FLUID = new OPERATOR_INGREDIENTS_WITH_FLUID(globalMap);
    INGREDIENTS_WITH_ENERGY = new OPERATOR_INGREDIENTS_WITH_ENERGY(globalMap);
    INGREDIENTS_WITH_ITEMS = new OPERATOR_INGREDIENTS_WITH_ITEMS(globalMap);
    INGREDIENTS_WITH_FLUIDS = new OPERATOR_INGREDIENTS_WITH_FLUIDS(globalMap);
    INGREDIENTS_WITH_ENERGIES = new OPERATOR_INGREDIENTS_WITH_ENERGIES(
      globalMap
    );
    RECIPE_INPUT = new OPERATOR_RECIPE_INPUT(globalMap);
    RECIPE_OUTPUT = new OPERATOR_RECIPE_OUTPUT(globalMap);
    RECIPE_WITH_INPUT = new OPERATOR_RECIPE_WITH_INPUT(globalMap);
    RECIPE_WITH_OUTPUT = new OPERATOR_RECIPE_WITH_OUTPUT(globalMap);
    RECIPE_WITH_INPUT_OUTPUT = new OPERATOR_RECIPE_WITH_INPUT_OUTPUT(globalMap);
    PARSE_BOOLEAN = new OPERATOR_PARSE_BOOLEAN(globalMap);
    PARSE_DOUBLE = new OPERATOR_PARSE_DOUBLE(globalMap);
    PARSE_INTEGER = new OPERATOR_PARSE_INTEGER(globalMap);
    PARSE_LONG = new OPERATOR_PARSE_LONG(globalMap);
    PARSE_NBT = new OPERATOR_PARSE_NBT(globalMap);
    GENERAL_CHOICE = new OPERATOR_GENERAL_CHOICE(globalMap);
    GENERAL_IDENTITY = new OPERATOR_GENERAL_IDENTITY(globalMap);
    GENERAL_CONSTANT = new OPERATOR_GENERAL_CONSTANT(globalMap);
    INTEGER_TO_DOUBLE = new OPERATOR_INTEGER_TO_DOUBLE(globalMap);
    INTEGER_TO_LONG = new OPERATOR_INTEGER_TO_LONG(globalMap);
    DOUBLE_TO_INTEGER = new OPERATOR_DOUBLE_TO_INTEGER(globalMap);
    DOUBLE_TO_LONG = new OPERATOR_DOUBLE_TO_LONG(globalMap);
    LONG_TO_INTEGER = new OPERATOR_LONG_TO_INTEGER(globalMap);
    LONG_TO_DOUBLE = new OPERATOR_LONG_TO_DOUBLE(globalMap);
  };
  var operatorRegistry = new operatorRegistryClass();

  // TSFiles/index.ts
  window.operatorRegistry = operatorRegistry;
  window.addEventListener("DOMContentLoaded", () => {
    const astBtn = document.getElementById("ast-btn");
    const nbtBtn = document.getElementById("nbt-btn");
    const astTextArea = document.getElementById("ast");
    const nbtTextArea = document.getElementById("nbt");
    if (astBtn) {
      astBtn.addEventListener("click", () => {
        nbtTextArea.value = "AST parsing is temporarily disabled.";
      });
    }
    if (nbtBtn) {
      nbtBtn.addEventListener("click", () => {
        astTextArea.value = "NBT parsing is temporarily disabled.";
      });
    }
  });
})();
