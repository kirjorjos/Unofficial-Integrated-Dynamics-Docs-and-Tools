"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // TSFiles/HelperClasses/Math.ts
  var JavaMath;
  var init_Math = __esm({
    "TSFiles/HelperClasses/Math.ts"() {
      "use strict";
      ((JavaMath2) => {
        const bitMap32 = [
          "1073741824",
          "536870912",
          "268435456",
          "134217728",
          "67108864",
          "33554432",
          "16777216",
          "8388608",
          "4194304",
          "2097152",
          "1048576",
          "524288",
          "262144",
          "131072",
          "65536",
          "32768",
          "16384",
          "8192",
          "4096",
          "2048",
          "1024",
          "512",
          "256",
          "128",
          "64",
          "32",
          "16",
          "8",
          "4",
          "2",
          "1"
        ];
        const bitMap64 = [
          "4611686018427387904",
          "2305843009213693952",
          "1152921504606846976",
          "576460752303423488",
          "288230376151711744",
          "144115188075855872",
          "72057594037927936",
          "36028797018963968",
          "18014398509481984",
          "9007199254740992",
          "4503599627370496",
          "2251799813685248",
          "1125899906842624",
          "562949953421312",
          "281474976710656",
          "140737488355328",
          "70368744177664",
          "35184372088832",
          "17592186044416",
          "8796093022208",
          "4398046511104",
          "2199023255552",
          "1099511627776",
          "549755813888",
          "274877906944",
          "137438953472",
          "68719476736",
          "34359738368",
          "17179869184",
          "8589934592",
          "4294967296",
          "2147483648",
          "1073741824",
          "536870912",
          "268435456",
          "134217728",
          "67108864",
          "33554432",
          "16777216",
          "8388608",
          "4194304",
          "2097152",
          "1048576",
          "524288",
          "262144",
          "131072",
          "65536",
          "32768",
          "16384",
          "8192",
          "4096",
          "2048",
          "1024",
          "512",
          "256",
          "128",
          "64",
          "32",
          "16",
          "8",
          "4",
          "2",
          "1"
        ];
        function stringGt(a, b) {
          const maxLength = Math.max(a.length, b.length);
          a = a.padStart(maxLength, "0");
          b = b.padStart(maxLength, "0");
          for (let i = 0; i < maxLength; i++) {
            if (parseInt(a[i]) > parseInt(b[i])) return true;
            else if (a[i] === b[i]) continue;
            else return false;
          }
          return false;
        }
        function stringAdd(a, b) {
          const maxLength = Math.max(a.length, b.length);
          a = a.padStart(maxLength, "0");
          b = b.padStart(maxLength, "0");
          let arrA = a.split("").reverse();
          let arrB = b.split("").reverse();
          let result = [];
          let carry = 0;
          for (let i = 0; i < maxLength; i++) {
            let digit1 = parseInt(arrA[i]);
            let digit2 = parseInt(arrB[i]);
            let sum = digit1 + digit2 + carry;
            carry = Math.floor(sum / 10);
            result.push(`${sum % 10}`);
          }
          return result.reverse().join("");
        }
        function decimalToBinary(decimal, length) {
          let bits = new Array(length).fill(0);
          let abs = decimal;
          if (decimal.startsWith("-")) abs = decimal.slice(1);
          let runningTotal = "0";
          for (const [index, value] of (length === 32 ? bitMap32 : bitMap64).entries()) {
            let oldTotal = runningTotal;
            if (stringGt(value, abs)) {
              bits[index + 1] = 0;
            } else {
              runningTotal = stringAdd(runningTotal, value);
              if (!stringGt(runningTotal, abs)) {
                bits[index + 1] = 1;
              } else {
                bits[index + 1] = 0;
                runningTotal = oldTotal;
              }
            }
          }
          if (decimal.startsWith("-")) {
            for (let i = 0; i < bits.length; i++) {
              bits[i] = bits[i] ^ 1;
            }
            bits = bitwiseAdd(
              bits,
              "1".padStart(length, "0").split("").map((str) => parseInt(str))
            );
          }
          return bits;
        }
        JavaMath2.decimalToBinary = decimalToBinary;
        function bitwiseAdd(a, b) {
          const result = new Array(a.length).fill(0);
          let carry = 0;
          for (let i = a.length - 1; i >= 0; i--) {
            const sum = a[i] + b[i] + carry;
            result[i] = sum & 1;
            carry = sum >> 1;
          }
          return result;
        }
        JavaMath2.bitwiseAdd = bitwiseAdd;
        function toDecimal(bits) {
          bits = [...bits];
          const isMinValue = bits[0] && !bits.slice(1).includes(1);
          if (isMinValue)
            return bits.length === 64 ? "-9223372036854775808" : "-2147483648";
          if (bits[0]) {
            for (let i = 0; i < bits.length; i++) {
              bits[i] = bits[i] ^ 1;
            }
            bits = bitwiseAdd(
              bits,
              "1".padStart(bits.length, "0").split("").map((str) => parseInt(str))
            );
            return toDecimal(bits);
          } else {
            let runningTotal = "0";
            let bitMap = bits.length === 32 ? bitMap32 : bitMap64;
            for (let i = 1; i < bits.length; i++) {
              runningTotal = bits[i] ? stringAdd(runningTotal, bitMap[i]) : runningTotal;
            }
            return runningTotal;
          }
        }
        JavaMath2.toDecimal = toDecimal;
        function leftShift(a, num) {
          let result = new Array(a.length).fill(0);
          for (let i = 0; i < a.length; i++) {
            result[i] = i + num < a.length ? a[i + num] : 0;
          }
          return result;
        }
        JavaMath2.leftShift = leftShift;
        async function dispatchMethod(num1, num2, method) {
          const higherOrderNum = num1.getOrder() < num2.getOrder() ? num2 : num1;
          switch (higherOrderNum.getType()) {
            case "Integer":
              num1 = await num1.toInteger();
              num2 = await num2.toInteger();
              return num1[method](num2);
            case "Long":
              num1 = await num1.toLong();
              num2 = await num2.toLong();
              return num1[method](num2);
            case "Double":
              num1 = await num1.toDouble();
              num2 = await num2.toDouble();
              return num1[method](num2);
          }
        }
        async function add(num1, num2) {
          return dispatchMethod(num1, num2, "add");
        }
        JavaMath2.add = add;
        async function subtract(num1, num2) {
          return dispatchMethod(num1, num2, "subtract");
        }
        JavaMath2.subtract = subtract;
        async function multiply(num1, num2) {
          return dispatchMethod(num1, num2, "multiply");
        }
        JavaMath2.multiply = multiply;
        async function divide(num1, num2) {
          return dispatchMethod(num1, num2, "divide");
        }
        JavaMath2.divide = divide;
        async function max(num1, num2) {
          return dispatchMethod(num1, num2, "max");
        }
        JavaMath2.max = max;
        async function min(num1, num2) {
          return dispatchMethod(num1, num2, "min");
        }
        JavaMath2.min = min;
        async function mod(num1, num2) {
          return dispatchMethod(num1, num2, "mod");
        }
        JavaMath2.mod = mod;
        async function gt(num1, num2) {
          return dispatchMethod(num1, num2, "gt");
        }
        JavaMath2.gt = gt;
        async function lt(num1, num2) {
          return dispatchMethod(num1, num2, "lt");
        }
        JavaMath2.lt = lt;
        async function gte(num1, num2) {
          return dispatchMethod(num1, num2, "gte");
        }
        JavaMath2.gte = gte;
        async function lte(num1, num2) {
          return dispatchMethod(num1, num2, "lte");
        }
        JavaMath2.lte = lte;
        async function equals(num1, num2) {
          return dispatchMethod(num1, num2, "equals");
        }
        JavaMath2.equals = equals;
      })(JavaMath || (JavaMath = {}));
    }
  });

  // TSFiles/HelperClasses/IntLongMath.ts
  var IntLongMath;
  var init_IntLongMath = __esm({
    "TSFiles/HelperClasses/IntLongMath.ts"() {
      "use strict";
      init_Math();
      ((IntLongMath2) => {
        function add(num1, num2) {
          let temp = num1.getBits();
          let a = [...temp];
          let b = [...num2.getBits()];
          const result = JavaMath.bitwiseAdd(a, b);
          const classConstructor = num1.constructor;
          return new classConstructor(result);
        }
        IntLongMath2.add = add;
        function subtract(num1, num2) {
          let temp = num1.getBits();
          const length = temp.length;
          let a = [...temp];
          let b = [...num2.getBits()];
          b = b.map((x) => x ^ 1);
          b = JavaMath.bitwiseAdd(b, [
            ...Array(length - 1).fill(0),
            1
          ]);
          const classConstructor = num1.constructor;
          return new classConstructor(JavaMath.bitwiseAdd(a, b));
        }
        IntLongMath2.subtract = subtract;
        function multiply(num1, num2) {
          let temp = num1.getBits();
          const length = temp.length;
          let a = [...temp];
          let b = [...num2.getBits()];
          const sign = a[0] ^ b[0];
          if (a[0]) {
            a = a.map((x) => x ^ 1);
            a = JavaMath.bitwiseAdd(a, [
              ...Array(length - 1).fill(0),
              1
            ]);
          }
          if (b[0]) {
            b = b.map((x) => x ^ 1);
            b = JavaMath.bitwiseAdd(b, [
              ...Array(length - 1).fill(0),
              1
            ]);
          }
          let result = new Array(length * 2).fill(0);
          for (let i = length - 1; i >= 0; i--) {
            if (b[i]) {
              result = JavaMath.bitwiseAdd(
                result,
                JavaMath.leftShift(
                  [...Array(length).fill(a[0]), ...a],
                  length - 1 - i
                )
              );
            }
          }
          if (sign) {
            result = result.map((x) => x ^ 1);
            result = JavaMath.bitwiseAdd(result, [
              ...Array(length * 2 - 1).fill(0),
              1
            ]);
          }
          const classConstructor = num1.constructor;
          return new classConstructor(result);
        }
        IntLongMath2.multiply = multiply;
        function divide(num1, num2) {
          let temp = num1.getBits();
          const length = temp.length;
          let a = [...temp];
          let b = [...num2.getBits()];
          const sign = a[0] ^ b[0];
          if (a[0]) {
            a = a.map((x) => x ^ 1);
            a = JavaMath.bitwiseAdd(a, [
              ...Array(length - 1).fill(0),
              1
            ]);
          }
          if (b[0]) {
            b = b.map((x) => x ^ 1);
            b = JavaMath.bitwiseAdd(b, [
              ...Array(length - 1).fill(0),
              1
            ]);
          }
          let quotient = new Array(length).fill(0);
          let remainder = new Array(length).fill(0);
          for (let i = 0; i < length; i++) {
            remainder = JavaMath.leftShift(remainder, 1);
            remainder[length - 1] = a[i];
            let tempB = b.map((x) => x ^ 1);
            tempB = JavaMath.bitwiseAdd(tempB, [
              ...Array(length - 1).fill(0),
              1
            ]);
            let temp2 = JavaMath.bitwiseAdd(remainder, tempB);
            if (temp2[0]) {
              quotient[i] = 0;
            } else {
              quotient[i] = 1;
              remainder = temp2;
            }
          }
          if (sign) {
            quotient = quotient.map((x) => x ^ 1);
            quotient = JavaMath.bitwiseAdd(quotient, [
              ...Array(length - 1).fill(0),
              1
            ]);
          }
          const classConstructor = num1.constructor;
          return new classConstructor(quotient);
        }
        IntLongMath2.divide = divide;
        function mod(num1, num2) {
          const quotient = divide(num1, num2);
          const product = multiply(num2, quotient);
          return subtract(num1, product);
        }
        IntLongMath2.mod = mod;
        function binaryAnd(num1, num2) {
          let temp = num1.getBits();
          const length = temp.length;
          let a = [...temp];
          let b = [...num2.getBits()];
          let result = new Array(length).fill(0);
          for (let i = 0; i < length; i++) {
            result[i] = a[i] & b[i];
          }
          const classConstructor = num1.constructor;
          return new classConstructor(result);
        }
        IntLongMath2.binaryAnd = binaryAnd;
        function binaryOr(num1, num2) {
          let temp = num1.getBits();
          const length = temp.length;
          let a = [...temp];
          let b = [...num2.getBits()];
          let result = new Array(length).fill(0);
          for (let i = 0; i < length; i++) {
            result[i] = a[i] | b[i];
          }
          const classConstructor = num1.constructor;
          return new classConstructor(result);
        }
        IntLongMath2.binaryOr = binaryOr;
        function binaryXor(num1, num2) {
          let temp = num1.getBits();
          const length = temp.length;
          let a = [...temp];
          let b = [...num2.getBits()];
          let result = new Array(length).fill(0);
          for (let i = 0; i < length; i++) {
            result[i] = a[i] ^ b[i];
          }
          const classConstructor = num1.constructor;
          return new classConstructor(result);
        }
        IntLongMath2.binaryXor = binaryXor;
        function binaryComplement(num) {
          let temp = num.getBits();
          const length = temp.length;
          let a = [...temp];
          let result = new Array(length).fill(0);
          for (let i = 0; i < length; i++) {
            result[i] = a[i] ^ 1;
          }
          const classConstructor = num.constructor;
          return new classConstructor(result);
        }
        IntLongMath2.binaryComplement = binaryComplement;
        function rightShift(num, places) {
          const bits = num.getBits();
          const sign = bits[0];
          let result = unsignedRightShift(bits, places);
          result[0] = sign;
          const classConstructor = num.constructor;
          return new classConstructor(result);
        }
        IntLongMath2.rightShift = rightShift;
        function unsignedRightShift(bits, places) {
          return [...bits, ...Array(parseInt(places.toDecimal())).fill(0)].slice(
            -bits.length
          );
        }
        IntLongMath2.unsignedRightShift = unsignedRightShift;
        async function lt(num1, num2) {
          const a = num1.getBits();
          const b = num2.getBits();
          if (a[0] !== b[0]) {
            if (a[0]) return true;
            return false;
          }
          for (let i = 1; i < a.length; i++) {
            if (a[i] !== b[i]) {
              if (a[i]) return false;
              return true;
            }
          }
          return false;
        }
        IntLongMath2.lt = lt;
        async function gt(num1, num2) {
          return lt(num2, num1);
        }
        IntLongMath2.gt = gt;
        async function gte(num1, num2) {
          return await JavaMath.equals(num1, num2) || await lt(num2, num1);
        }
        IntLongMath2.gte = gte;
        async function lte(num1, num2) {
          return await JavaMath.equals(num1, num2) || await lt(num1, num2);
        }
        IntLongMath2.lte = lte;
      })(IntLongMath || (IntLongMath = {}));
    }
  });

  // TSFiles/JavaNumberClasses/Double.ts
  var Double_exports = {};
  __export(Double_exports, {
    Double: () => Double
  });
  var Double;
  var init_Double = __esm({
    "TSFiles/JavaNumberClasses/Double.ts"() {
      "use strict";
      init_Integer();
      Double = class _Double {
        value;
        constructor(decimal) {
          if (typeof decimal === "number") {
            this.value = decimal;
          } else {
            this.value = parseInt(decimal);
          }
          this.initializeBits();
        }
        initializeBits() {
          return new Array(64).fill(0);
        }
        getBits() {
          const buffer = new ArrayBuffer(8);
          const view = new DataView(buffer);
          view.setFloat64(0, this.value, false);
          const bits = [];
          for (let byteIndex = 0; byteIndex < 8; byteIndex++) {
            const byte = view.getUint8(byteIndex);
            for (let bitIndex = 7; bitIndex >= 0; bitIndex--) {
              bits.push(byte >> bitIndex & 1);
            }
          }
          return bits;
        }
        getType() {
          return "Double";
        }
        getOrder() {
          return 2;
        }
        // Double → Double
        toLong() {
          const n = Math.trunc(this.value);
          return Promise.resolve().then(() => (init_Long(), Long_exports)).then((obj) => {
            return new obj.Long(n.toString());
          });
        }
        // Double → Integer
        toInteger() {
          const n = Math.trunc(this.value);
          return Promise.resolve().then(() => (init_Integer(), Integer_exports)).then((obj) => {
            return new obj.Integer(n.toString());
          });
        }
        toDouble() {
          return new Promise(
            (resolve) => resolve(new _Double(`${this.value}`))
          );
        }
        toDecimal() {
          return `${this.value}`;
        }
        leftShift(num) {
          return new _Double(this.value << parseInt(num.toDecimal()));
        }
        add(num) {
          return new _Double(this.value + parseInt(num.toDecimal()));
        }
        subtract(num) {
          return new _Double(this.value - parseInt(num.toDecimal()));
        }
        multiply(num) {
          return new _Double(this.value * parseInt(num.toDecimal()));
        }
        divide(num) {
          return new _Double(this.value / parseInt(num.toDecimal()));
        }
        mod(num) {
          return new _Double(this.value % parseInt(num.toDecimal()));
        }
        sqrt() {
          return new _Double(Math.sqrt(this.value));
        }
        pow(exponent) {
          return new _Double(Math.pow(this.value, parseInt(exponent.toDecimal())));
        }
        async max(num) {
          return await this.gt(num) ? this : num;
        }
        async min(num) {
          return await this.lt(num) ? this : num;
        }
        async lt(num) {
          return this.value < parseInt(num.toDecimal());
        }
        async lte(num) {
          return this.value <= parseInt(num.toDecimal());
        }
        async gt(num) {
          return this.value > parseInt(num.toDecimal());
        }
        async gte(num) {
          return this.value >= parseInt(num.toDecimal());
        }
        equals(num) {
          return `${this.value}` === num.toDecimal();
        }
        async round() {
          return new Integer(Math.round(this.value));
        }
        async ceil() {
          return new Integer(Math.ceil(this.value));
        }
        async floor() {
          return new Integer(Math.floor(this.value));
        }
      };
    }
  });

  // TSFiles/JavaNumberClasses/Long.ts
  var Long_exports = {};
  __export(Long_exports, {
    Long: () => Long
  });
  var Long;
  var init_Long = __esm({
    "TSFiles/JavaNumberClasses/Long.ts"() {
      "use strict";
      init_IntLongMath();
      init_Math();
      Long = class _Long {
        bits;
        constructor(data) {
          if (!Array.isArray(data)) this.bits = this.initializeBits(data);
          if (Array.isArray(data)) this.bits = data.slice(-64);
        }
        initializeBits(decimal) {
          return JavaMath.decimalToBinary(`${decimal}`, 64);
        }
        getBits() {
          return this.bits;
        }
        getType() {
          return "Long";
        }
        getOrder() {
          return 1;
        }
        // Long → Integer
        toInteger() {
          const intBits = this.bits.slice(32);
          return Promise.resolve().then(() => (init_Integer(), Integer_exports)).then((obj) => {
            return new obj.Integer(intBits);
          });
        }
        // Long → Double
        toDouble() {
          const num = JavaMath.toDecimal(this.bits);
          return Promise.resolve().then(() => (init_Double(), Double_exports)).then((obj) => {
            return new obj.Double(num);
          });
        }
        toLong() {
          return new Promise((resolve) => resolve(new _Long(this.bits)));
        }
        toDecimal() {
          return JavaMath.toDecimal(this.bits);
        }
        leftShift(num) {
          return new _Long(JavaMath.leftShift(this.bits, parseInt(num.toDecimal())));
        }
        add(num) {
          return IntLongMath.add(this, num);
        }
        subtract(num) {
          return IntLongMath.subtract(this, num);
        }
        multiply(num) {
          return IntLongMath.multiply(this, num);
        }
        divide(num) {
          return IntLongMath.divide(this, num);
        }
        mod(num) {
          return IntLongMath.mod(this, num);
        }
        async max(num) {
          return await this.gt(num) ? this : num;
        }
        async min(num) {
          return await this.lt(num) ? this : num;
        }
        async lt(num) {
          return IntLongMath.lt(this, num);
        }
        async lte(num) {
          return IntLongMath.lte(this, num);
        }
        async gt(num) {
          return IntLongMath.gt(this, num);
        }
        async gte(num) {
          return IntLongMath.gte(this, num);
        }
        equals(num) {
          return num.getBits().every((bit, i) => bit === this.bits[i]);
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
      };
    }
  });

  // TSFiles/JavaNumberClasses/Integer.ts
  var Integer_exports = {};
  __export(Integer_exports, {
    Integer: () => Integer
  });
  var Integer;
  var init_Integer = __esm({
    "TSFiles/JavaNumberClasses/Integer.ts"() {
      "use strict";
      init_IntLongMath();
      init_Math();
      Integer = class _Integer {
        bits;
        constructor(data) {
          if (!Array.isArray(data)) this.bits = this.initializeBits(data);
          if (Array.isArray(data)) this.bits = data.slice(-32);
        }
        initializeBits(decimal) {
          return JavaMath.decimalToBinary(`${decimal}`, 32);
        }
        getBits() {
          return this.bits;
        }
        getType() {
          return "Integer";
        }
        getOrder() {
          return 0;
        }
        // Integer → Long
        toLong() {
          const sign = this.bits[0];
          const longBits = Array(32).fill(sign).concat(this.bits);
          return Promise.resolve().then(() => (init_Long(), Long_exports)).then((obj) => {
            return new obj.Long(longBits);
          });
        }
        // Integer → Double
        toDouble() {
          const num = JavaMath.toDecimal(this.bits);
          return Promise.resolve().then(() => (init_Double(), Double_exports)).then((obj) => {
            return new obj.Double(num);
          });
        }
        toInteger() {
          return new Promise(
            (resolve) => resolve(new _Integer(this.bits))
          );
        }
        toDecimal() {
          return JavaMath.toDecimal(this.bits);
        }
        leftShift(num) {
          return new _Integer(
            JavaMath.leftShift(this.bits, parseInt(num.toDecimal()))
          );
        }
        add(num) {
          return IntLongMath.add(this, num);
        }
        subtract(num) {
          return IntLongMath.subtract(this, num);
        }
        multiply(num) {
          return IntLongMath.multiply(this, num);
        }
        divide(num) {
          return IntLongMath.divide(this, num);
        }
        mod(num) {
          return IntLongMath.mod(this, num);
        }
        binaryAnd(num) {
          return IntLongMath.binaryAnd(this, num);
        }
        binaryOr(num) {
          return IntLongMath.binaryOr(this, num);
        }
        binaryXor(num) {
          return IntLongMath.binaryXor(this, num);
        }
        binaryComplement() {
          return IntLongMath.binaryComplement(this);
        }
        rightShift(places) {
          return IntLongMath.rightShift(this, places);
        }
        unsignedRightShift(places) {
          return IntLongMath.unsignedRightShift(this.bits, places);
        }
        async max(num) {
          return await this.gt(num) ? this : num;
        }
        async min(num) {
          return await this.lt(num) ? this : num;
        }
        async lt(num) {
          return IntLongMath.lt(this, num);
        }
        async lte(num) {
          return IntLongMath.lte(this, num);
        }
        async gt(num) {
          return IntLongMath.gt(this, num);
        }
        async gte(num) {
          return IntLongMath.gte(this, num);
        }
        equals(num) {
          return num.getBits().every((bit, i) => bit === this.bits[i]);
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
      };
    }
  });

  // TSFiles/IntegratedDynamicsClasses/Properties.ts
  var Properties;
  var init_Properties = __esm({
    "TSFiles/IntegratedDynamicsClasses/Properties.ts"() {
      "use strict";
      Properties = class {
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
      };
    }
  });

  // TSFiles/IntegratedDynamicsClasses/Fluid.ts
  var Fluid_exports = {};
  __export(Fluid_exports, {
    Fluid: () => Fluid
  });
  var Fluid;
  var init_Fluid = __esm({
    "TSFiles/IntegratedDynamicsClasses/Fluid.ts"() {
      "use strict";
      init_Integer();
      init_Properties();
      Fluid = class _Fluid {
        static defaultProps = new Properties({
          uname: "",
          amount: new Integer(0),
          // block: new Block(),
          lightLevel: new Integer(0),
          density: new Integer(0),
          temperature: new Integer(0),
          viscosity: new Integer(0),
          lighterThanAir: false,
          rarity: "",
          bucketEmptySound: "",
          fluidVaporizeSound: "",
          bucketFillSound: "",
          // bucket: new Item(),
          modName: "",
          nbt: null,
          tagNames: []
        });
        props;
        constructor(newProps, oldFluid) {
          let props = _Fluid.defaultProps;
          props.setAll(newProps);
          if (oldFluid) props.setAll(oldFluid.getProperties());
          Promise.all([Promise.resolve().then(() => (init_Item(), Item_exports)), Promise.resolve().then(() => (init_Fluid(), Fluid_exports))]).then((values) => {
            if (!props.has("item"))
              props.set("item", new values[0].Item(new Properties({})));
            if (!props.has("fluid"))
              props.set("fluid", new values[1].Fluid(new Properties({})));
          });
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
        getLighterThanAir() {
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
      };
    }
  });

  // TSFiles/IntegratedDynamicsClasses/Item.ts
  var Item_exports = {};
  __export(Item_exports, {
    Item: () => Item
  });
  var Item;
  var init_Item = __esm({
    "TSFiles/IntegratedDynamicsClasses/Item.ts"() {
      "use strict";
      init_Integer();
      init_Properties();
      Item = class _Item {
        props;
        static defaultProps = new Properties({
          size: new Integer(1),
          maxSize: new Integer(64),
          stackable: true,
          damageable: false,
          damage: new Integer(0),
          maxDamage: new Integer(0),
          enchanted: false,
          enchantable: false,
          repairCost: new Integer(0),
          rarity: "",
          // fluid: new Fluid(),
          fluidCapacity: new Integer(0),
          NBT: null,
          uname: "",
          modName: "",
          fuelBurnTime: new Integer(0),
          fuel: false,
          tagNames: [],
          feContainer: false,
          feStored: new Integer(0),
          feCapacity: new Integer(0),
          inventory: [],
          tooltip: [],
          itemName: ""
          // block: new Block()
        });
        constructor(newProps, oldItem) {
          let props = _Item.defaultProps;
          props.setAll(newProps);
          if (oldItem) props.setAll(oldItem.getProperties());
          Promise.all([Promise.resolve().then(() => (init_Block(), Block_exports)), Promise.resolve().then(() => (init_Fluid(), Fluid_exports))]).then((values) => {
            if (!props.has("block"))
              props.set("block", new values[0].Block(new Properties({})));
            if (!props.has("fluid"))
              props.set("fluid", new values[1].Fluid(new Properties({})));
          });
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
        getTooltip() {
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
        async getStrengthVsBlock(block) {
          let { Block: Block2 } = await Promise.resolve().then(() => (init_Block(), Block_exports));
          if (!(block instanceof Block2)) throw new Error("block is not a Block");
          throw new Error("getStrengthVsBlock method not implemented");
        }
        canHarvestBlock() {
          throw new Error("canHarvestBlock method not implemented");
        }
        equals(other) {
          if (!(other instanceof _Item)) return false;
          return JSON.stringify(this) === JSON.stringify(other);
        }
        toString() {
          return this.props.get("itemName");
        }
      };
    }
  });

  // TSFiles/IntegratedDynamicsClasses/Block.ts
  var Block_exports = {};
  __export(Block_exports, {
    Block: () => Block
  });
  var Block;
  var init_Block = __esm({
    "TSFiles/IntegratedDynamicsClasses/Block.ts"() {
      "use strict";
      init_Integer();
      init_Properties();
      Block = class _Block {
        static defaultProps = new Properties({
          opaque: true,
          // item: new Item(),
          modName: "",
          breakSound: "",
          placeSound: "",
          stepSound: "",
          shearable: false,
          plantAge: new Integer(-1),
          // fluid: new Fluid(),
          fluidCapacity: new Integer(0),
          uname: "",
          tagNames: [],
          feContainer: false,
          feCapacity: new Integer(0),
          feStored: new Integer(0),
          inventory: null,
          blockName: ""
        });
        props;
        constructor(newProps, oldBlock) {
          let props = _Block.defaultProps;
          props.setAll(newProps);
          if (oldBlock) props.setAll(oldBlock.getProperties());
          Promise.all([Promise.resolve().then(() => (init_Item(), Item_exports)), Promise.resolve().then(() => (init_Fluid(), Fluid_exports))]).then((values) => {
            if (!props.has("item"))
              props.set("item", new values[0].Item(new Properties({})));
            if (!props.has("fluid"))
              props.set("fluid", new values[1].Fluid(new Properties({})));
          });
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
          return JSON.stringify(this) === JSON.stringify(other);
        }
        toString() {
          return this.props.get("blockName");
        }
      };
    }
  });

  // TSFiles/IntegratedDynamicsClasses/Operator.ts
  var Operator_exports = {};
  __export(Operator_exports, {
    Operator: () => Operator
  });
  var Operator;
  var init_Operator = __esm({
    "TSFiles/IntegratedDynamicsClasses/Operator.ts"() {
      "use strict";
      init_TypeMap();
      Operator = class _Operator extends Function {
        fn;
        parsedSignature;
        typeMap;
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
          serializer
        }) {
          super("...args", "return this.__call__(...args)");
          this.fn = fn;
          this.typeMap = new TypeMap(parsedSignature.getAST());
          this.parsedSignature = parsedSignature;
          this.internalName = internalName;
          this.nicknames = nicknames;
          this.symbol = symbol;
          this.interactName = interactName;
          this.serializer = serializer;
        }
        __call__(...args) {
          if (args.length !== this.parsedSignature.getArity()) {
            throw new Error(
              `Operator expected ${this.parsedSignature.getArity()} args, got ${args.length}`
            );
          }
          return this.fn(...args);
        }
        apply(arg) {
          const parsedSignature = this.parsedSignature.apply(arg);
          const newFn = (...rest) => this.fn(arg, ...rest);
          if (this.parsedSignature.getArity() === 1) {
            return this.fn(arg);
          }
          return new _Operator({
            internalName: this.internalName,
            nicknames: this.nicknames,
            parsedSignature,
            symbol: this.symbol,
            interactName: this.interactName,
            function: newFn
          });
        }
      };
    }
  });

  // TSFiles/HelperClasses/TypeMap.ts
  var TypeMap;
  var init_TypeMap = __esm({
    "TSFiles/HelperClasses/TypeMap.ts"() {
      "use strict";
      TypeMap = class {
        aliases;
        constructor(ast) {
          this.aliases = /* @__PURE__ */ new Map();
          if (ast) {
            this.extractTypeIDs(ast);
          }
        }
        extractTypeIDs(node) {
          if (node.type === "Any") {
            this.aliases.set(node.typeID, "Any");
          }
          if (node.type === "Function") {
            this.extractTypeIDs(node.from);
            this.extractTypeIDs(node.to);
          }
          if (node.type === "List") {
            this.extractTypeIDs(node.listType);
          }
        }
        find(typeID) {
          while (this.aliases.has(typeID)) {
            typeID = this.aliases.get(typeID);
          }
          return typeID;
        }
        async unify(a, b) {
          const { Operator: Operator2 } = await Promise.resolve().then(() => (init_Operator(), Operator_exports));
          if (typeof a === "boolean" || typeof b === "boolean") {
            return;
          }
          if (!(a instanceof Operator2 && b instanceof Operator2)) {
            if (a.type === "Any" && b.type === "Any") {
              this.aliases.set(this.find(a.typeID), this.find(b.typeID));
              return;
            }
            if (a.type === "Any" && b.type !== "Any") {
              this.aliases.set(this.find(a.typeID), b);
              return;
            }
            if (b.type === "Any" && a.type !== "Any") {
              this.aliases.set(this.find(b.typeID), a);
              return;
            }
            if (a.type === "List" && b.type === "List") {
              if (typeof a.listType !== "string" && typeof b.listType !== "string")
                this.unify(a.listType, b.listType);
              return;
            }
            if (a.type !== b.type) {
              throw new Error(`Type mismatch: ${a.type} vs ${b.type}`);
            }
            if (a.type === "Function" && b.type === "Function") {
              this.unify(a.from, b.from);
              this.unify(a.to, b.to);
              return;
            }
          }
          if (a instanceof Operator2 && b instanceof Operator2) {
            return this.unify(a.parsedSignature.getAST(), b.parsedSignature.getAST());
          }
          throw new Error(
            `Unhandled unify case: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`
          );
        }
        rewrite(node) {
          if (node.type === "Any" && node.typeID) {
            return { ...node, typeID: this.find(node.typeID) };
          }
          if (node.type === "Function") {
            return {
              type: "Function",
              from: this.rewrite(node.from),
              to: this.rewrite(node.to)
            };
          }
          if (node.type === "List") {
            return {
              type: "List",
              listType: this.rewrite(node.listType)
            };
          }
          return node;
        }
        resolve(node) {
          if (node.type === "Any") {
            const alias = this.aliases.get(node.typeID);
            if (alias) {
              return this.resolve(alias);
            }
            return node;
          }
          if (node.type === "Function") {
            return {
              type: "Function",
              from: this.resolve(node.from),
              to: this.resolve(node.to)
            };
          }
          if (node.type === "List") {
            return {
              type: "List",
              listType: this.resolve(node.listType)
            };
          }
          return node;
        }
      };
    }
  });

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
      var quit_ = function(status, toThrow) {
        throw toThrow;
      };
      var ENVIRONMENT_IS_WEB = false;
      var ENVIRONMENT_IS_WORKER = false;
      var ENVIRONMENT_IS_NODE = false;
      var ENVIRONMENT_IS_SHELL = false;
      ENVIRONMENT_IS_WEB = typeof window === "object";
      ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
      ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
      ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
      if (Module["ENVIRONMENT"]) {
        throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
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
        quit_ = function(status) {
          process["exit"](status);
        };
        Module["inspect"] = function() {
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
          quit_ = function(status) {
            quit(status);
          };
        }
        if (typeof print !== "undefined") {
          if (typeof console === "undefined") console = /** @type{!Console} */
          {};
          console.log = /** @type{!function(this:Console, ...*): undefined} */
          print;
          console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */
          typeof printErr !== "undefined" ? printErr : print;
        }
      } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (typeof document !== "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
          scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
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
              if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                onload(xhr.response);
                return;
              }
              onerror();
            };
            xhr.onerror = onerror;
            xhr.send(null);
          };
        }
        setWindowTitle = function(title) {
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
      if (!Object.getOwnPropertyDescriptor(Module, "arguments")) Object.defineProperty(Module, "arguments", { configurable: true, get: function() {
        abort("Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
      if (!Object.getOwnPropertyDescriptor(Module, "thisProgram")) Object.defineProperty(Module, "thisProgram", { configurable: true, get: function() {
        abort("Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      if (Module["quit"]) quit_ = Module["quit"];
      if (!Object.getOwnPropertyDescriptor(Module, "quit")) Object.defineProperty(Module, "quit", { configurable: true, get: function() {
        abort("Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      assert(typeof Module["memoryInitializerPrefixURL"] === "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
      assert(typeof Module["pthreadMainPrefixURL"] === "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
      assert(typeof Module["cdInitializerPrefixURL"] === "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
      assert(typeof Module["filePackagePrefixURL"] === "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
      assert(typeof Module["read"] === "undefined", "Module.read option was removed (modify read_ in JS)");
      assert(typeof Module["readAsync"] === "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
      assert(typeof Module["readBinary"] === "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
      assert(typeof Module["setWindowTitle"] === "undefined", "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
      assert(typeof Module["TOTAL_MEMORY"] === "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
      if (!Object.getOwnPropertyDescriptor(Module, "read")) Object.defineProperty(Module, "read", { configurable: true, get: function() {
        abort("Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      if (!Object.getOwnPropertyDescriptor(Module, "readAsync")) Object.defineProperty(Module, "readAsync", { configurable: true, get: function() {
        abort("Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      if (!Object.getOwnPropertyDescriptor(Module, "readBinary")) Object.defineProperty(Module, "readBinary", { configurable: true, get: function() {
        abort("Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      if (!Object.getOwnPropertyDescriptor(Module, "setWindowTitle")) Object.defineProperty(Module, "setWindowTitle", { configurable: true, get: function() {
        abort("Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      function warnOnce(text) {
        if (!warnOnce.shown) warnOnce.shown = {};
        if (!warnOnce.shown[text]) {
          warnOnce.shown[text] = 1;
          err(text);
        }
      }
      var tempRet0 = 0;
      var setTempRet0 = function(value) {
        tempRet0 = value;
      };
      var wasmBinary;
      if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
      if (!Object.getOwnPropertyDescriptor(Module, "wasmBinary")) Object.defineProperty(Module, "wasmBinary", { configurable: true, get: function() {
        abort("Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      var noExitRuntime;
      if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
      if (!Object.getOwnPropertyDescriptor(Module, "noExitRuntime")) Object.defineProperty(Module, "noExitRuntime", { configurable: true, get: function() {
        abort("Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
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
      var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : void 0;
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
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }
            var u2 = heap[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte 0x" + u0.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!");
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
        }
        return str;
      }
      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      }
      function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0))
          return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx) break;
            if (u >= 2097152) warnOnce("Invalid Unicode code point 0x" + u.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).");
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      }
      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      }
      function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
          if (u <= 127) ++len;
          else if (u <= 2047) len += 2;
          else if (u <= 65535) len += 3;
          else len += 4;
        }
        return len;
      }
      var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : void 0;
      function UTF16ToString(ptr, maxBytesToRead) {
        assert(ptr % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
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
            var codeUnit = HEAP16[ptr + i * 2 >> 1];
            if (codeUnit == 0) break;
            str += String.fromCharCode(codeUnit);
          }
          return str;
        }
      }
      function stringToUTF16(str, outPtr, maxBytesToWrite) {
        assert(outPtr % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
        assert(typeof maxBytesToWrite == "number", "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
        if (maxBytesToWrite === void 0) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 2) return 0;
        maxBytesToWrite -= 2;
        var startPtr = outPtr;
        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
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
        assert(ptr % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
        var i = 0;
        var str = "";
        while (!(i >= maxBytesToRead / 4)) {
          var utf32 = HEAP32[ptr + i * 4 >> 2];
          if (utf32 == 0) break;
          ++i;
          if (utf32 >= 65536) {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          } else {
            str += String.fromCharCode(utf32);
          }
        }
        return str;
      }
      function stringToUTF32(str, outPtr, maxBytesToWrite) {
        assert(outPtr % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
        assert(typeof maxBytesToWrite == "number", "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
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
            codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
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
        assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
        HEAP8.set(array, buffer2);
      }
      function writeAsciiToMemory(str, buffer2, dontAddNull) {
        for (var i = 0; i < str.length; ++i) {
          assert(str.charCodeAt(i) === str.charCodeAt(i) & 255);
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
      if (Module["TOTAL_STACK"]) assert(TOTAL_STACK === Module["TOTAL_STACK"], "the stack size can no longer be determined at runtime");
      var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
      if (!Object.getOwnPropertyDescriptor(Module, "INITIAL_MEMORY")) Object.defineProperty(Module, "INITIAL_MEMORY", { configurable: true, get: function() {
        abort("Module.INITIAL_MEMORY has been replaced with plain INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
      } });
      assert(INITIAL_MEMORY >= TOTAL_STACK, "INITIAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
      assert(
        typeof Int32Array !== "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray !== void 0 && Int32Array.prototype.set !== void 0,
        "JS engine does not provide full typed array support"
      );
      if (Module["wasmMemory"]) {
        wasmMemory = Module["wasmMemory"];
      } else {
        wasmMemory = new WebAssembly.Memory({
          "initial": INITIAL_MEMORY / 65536,
          "maximum": INITIAL_MEMORY / 65536
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
          abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + cookie2.toString(16) + " " + cookie1.toString(16));
        }
        if (HEAP32[0] !== 1668509029) abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
      }
      (function() {
        var h16 = new Int16Array(1);
        var h8 = new Int8Array(h16.buffer);
        h16[0] = 25459;
        if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian!";
      })();
      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATMAIN__ = [];
      var __ATPOSTRUN__ = [];
      var runtimeInitialized = false;
      var runtimeExited = false;
      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
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
          if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
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
      assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
      assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
      assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
      assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
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
          if (runDependencyWatcher === null && typeof setInterval !== "undefined") {
            runDependencyWatcher = setInterval(function() {
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
        error: function() {
          abort("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1");
        },
        init: function() {
          FS.error();
        },
        createDataFile: function() {
          FS.error();
        },
        createPreloadedFile: function() {
          FS.error();
        },
        createLazyFile: function() {
          FS.error();
        },
        open: function() {
          FS.error();
        },
        mkdev: function() {
          FS.error();
        },
        registerDevice: function() {
          FS.error();
        },
        analyzePath: function() {
          FS.error();
        },
        loadFilesFromDB: function() {
          FS.error();
        },
        ErrnoError: function ErrnoError() {
          FS.error();
        }
      };
      Module["FS_createDataFile"] = FS.createDataFile;
      Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
      function hasPrefix(str, prefix) {
        return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0;
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
        return function() {
          var displayName = name;
          var asm2 = fixedasm;
          if (!fixedasm) {
            asm2 = Module["asm"];
          }
          assert(runtimeInitialized, "native function `" + displayName + "` called before runtime initialization");
          assert(!runtimeExited, "native function `" + displayName + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
          if (!asm2[name]) {
            assert(asm2[name], "exported native function `" + displayName + "` not found");
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
        if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
          return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
            if (!response["ok"]) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            }
            return response["arrayBuffer"]();
          }).catch(function() {
            return getBinary();
          });
        }
        return Promise.resolve().then(getBinary);
      }
      function createWasm() {
        var info = {
          "env": asmLibraryArg,
          "wasi_snapshot_preview1": asmLibraryArg
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
          assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
          trueModule = null;
          receiveInstance(output["instance"]);
        }
        function instantiateArrayBuffer(receiver) {
          return getBinaryPromise().then(function(binary) {
            return WebAssembly.instantiate(binary, info);
          }).then(receiver, function(reason) {
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
            if (str.indexOf("imported Memory") >= 0 || str.indexOf("memory import") >= 0) {
              err("Memory size incompatibility issues may be due to changing INITIAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set INITIAL_MEMORY at runtime to something smaller than it was at compile time).");
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
        warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
        return func;
      }
      function demangleAll(text) {
        var regex = /\b_Z[\w\d_]+/g;
        return text.replace(
          regex,
          function(x) {
            var y = demangle(x);
            return x === y ? x : y + " [" + x + "]";
          }
        );
      }
      function dynCallLegacy(sig, ptr, args) {
        assert("dynCall_" + sig in Module, "bad function pointer type - no table for sig '" + sig + "'");
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
        abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
      }
      var ExceptionInfoAttrs = { DESTRUCTOR_OFFSET: 0, REFCOUNT_OFFSET: 4, TYPE_OFFSET: 8, CAUGHT_OFFSET: 12, RETHROWN_OFFSET: 13, SIZE: 16 };
      function ___cxa_allocate_exception(size) {
        return _malloc(size + ExceptionInfoAttrs.SIZE) + ExceptionInfoAttrs.SIZE;
      }
      function _atexit(func, arg) {
      }
      function ___cxa_atexit(a0, a1) {
        return _atexit(a0, a1);
      }
      function ExceptionInfo(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - ExceptionInfoAttrs.SIZE;
        this.set_type = function(type) {
          HEAP32[this.ptr + ExceptionInfoAttrs.TYPE_OFFSET >> 2] = type;
        };
        this.get_type = function() {
          return HEAP32[this.ptr + ExceptionInfoAttrs.TYPE_OFFSET >> 2];
        };
        this.set_destructor = function(destructor) {
          HEAP32[this.ptr + ExceptionInfoAttrs.DESTRUCTOR_OFFSET >> 2] = destructor;
        };
        this.get_destructor = function() {
          return HEAP32[this.ptr + ExceptionInfoAttrs.DESTRUCTOR_OFFSET >> 2];
        };
        this.set_refcount = function(refcount) {
          HEAP32[this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET >> 2] = refcount;
        };
        this.set_caught = function(caught) {
          caught = caught ? 1 : 0;
          HEAP8[this.ptr + ExceptionInfoAttrs.CAUGHT_OFFSET >> 0] = caught;
        };
        this.get_caught = function() {
          return HEAP8[this.ptr + ExceptionInfoAttrs.CAUGHT_OFFSET >> 0] != 0;
        };
        this.set_rethrown = function(rethrown) {
          rethrown = rethrown ? 1 : 0;
          HEAP8[this.ptr + ExceptionInfoAttrs.RETHROWN_OFFSET >> 0] = rethrown;
        };
        this.get_rethrown = function() {
          return HEAP8[this.ptr + ExceptionInfoAttrs.RETHROWN_OFFSET >> 0] != 0;
        };
        this.init = function(type, destructor) {
          this.set_type(type);
          this.set_destructor(destructor);
          this.set_refcount(0);
          this.set_caught(false);
          this.set_rethrown(false);
        };
        this.add_ref = function() {
          var value = HEAP32[this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET >> 2];
          HEAP32[this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET >> 2] = value + 1;
        };
        this.release_ref = function() {
          var prev = HEAP32[this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET >> 2];
          HEAP32[this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET >> 2] = prev - 1;
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
        throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
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
          "return function " + name + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
        )(body);
      }
      function extendError(baseErrorType, errorName) {
        var errorClass = createNamedFunction(errorName, function(message) {
          this.name = errorName;
          this.message = message;
          var stack = new Error(message).stack;
          if (stack !== void 0) {
            this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
          }
        });
        errorClass.prototype = Object.create(baseErrorType.prototype);
        errorClass.prototype.constructor = errorClass;
        errorClass.prototype.toString = function() {
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
      function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
        myTypes.forEach(function(type) {
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
        dependentTypes.forEach(function(dt, i) {
          if (registeredTypes.hasOwnProperty(dt)) {
            typeConverters[i] = registeredTypes[dt];
          } else {
            unregisteredTypes.push(dt);
            if (!awaitingDependencies.hasOwnProperty(dt)) {
              awaitingDependencies[dt] = [];
            }
            awaitingDependencies[dt].push(function() {
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
          throw new TypeError("registerType registeredInstance requires argPackAdvance");
        }
        var name = registeredInstance.name;
        if (!rawType) {
          throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
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
          callbacks.forEach(function(cb) {
            cb();
          });
        }
      }
      function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, {
          name,
          "fromWireType": function(wt) {
            return !!wt;
          },
          "toWireType": function(destructors, o) {
            return o ? trueValue : falseValue;
          },
          "argPackAdvance": 8,
          "readValueFromPointer": function(pointer) {
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
          destructorFunction: null
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
          smartPtrType: o.smartPtrType
        };
      }
      function throwInstanceAlreadyDeleted(obj) {
        function getInstanceTypeName(handle) {
          return handle.$$.ptrType.registeredClass.name;
        }
        throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
      }
      var finalizationGroup = false;
      function detachFinalizer(handle) {
      }
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
          attachFinalizer = function(handle2) {
            return handle2;
          };
          return handle;
        }
        finalizationGroup = new FinalizationGroup(function(iter) {
          for (var result = iter.next(); !result.done; result = iter.next()) {
            var $$ = result.value;
            if (!$$.ptr) {
              console.warn("object already deleted: " + $$.ptr);
            } else {
              releaseClassHandle($$);
            }
          }
        });
        attachFinalizer = function(handle2) {
          finalizationGroup.register(handle2, handle2.$$, handle2.$$);
          return handle2;
        };
        detachFinalizer = function(handle2) {
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
          var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
            $$: {
              value: shallowCopyInternalPointer(this.$$)
            }
          }));
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
      function ClassHandle() {
      }
      var registeredPointers = {};
      function ensureOverloadTable(proto, methodName, humanName) {
        if (void 0 === proto[methodName].overloadTable) {
          var prevFunc = proto[methodName];
          proto[methodName] = function() {
            if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
              throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
            }
            return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
          };
          proto[methodName].overloadTable = [];
          proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
        }
      }
      function exposePublicSymbol(name, value, numArguments) {
        if (Module.hasOwnProperty(name)) {
          if (void 0 === numArguments || void 0 !== Module[name].overloadTable && void 0 !== Module[name].overloadTable[numArguments]) {
            throwBindingError("Cannot register public name '" + name + "' twice");
          }
          ensureOverloadTable(Module, name, name);
          if (Module.hasOwnProperty(numArguments)) {
            throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
          }
          Module[name].overloadTable[numArguments] = value;
        } else {
          Module[name] = value;
          if (void 0 !== numArguments) {
            Module[name].numArguments = numArguments;
          }
        }
      }
      function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
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
            throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
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
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
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
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        if (!this.isConst && handle.$$.ptrType.isConst) {
          throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        if (this.isSmartPointer) {
          if (void 0 === handle.$$.smartPtr) {
            throwBindingError("Passing raw pointer to smart pointer is illegal");
          }
          switch (this.sharingPolicy) {
            case 0:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
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
                  __emval_register(function() {
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
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        if (handle.$$.ptrType.isConst) {
          throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
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
          throwInternalError("Both smartPtrType and smartPtr must be specified");
        }
        record.count = { value: 1 };
        return attachFinalizer(Object.create(prototype, {
          $$: {
            value: record
          }
        }));
      }
      function RegisteredPointer_fromWireType(ptr) {
        var rawPointer = this.getPointee(ptr);
        if (!rawPointer) {
          this.destructor(ptr);
          return null;
        }
        var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
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
              smartPtr: ptr
            });
          } else {
            return makeClassHandle(this.registeredClass.instancePrototype, {
              ptrType: this,
              ptr
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
            smartPtr: ptr
          });
        } else {
          return makeClassHandle(toType.registeredClass.instancePrototype, {
            ptrType: toType,
            ptr: dp
          });
        }
      }
      function init_RegisteredPointer() {
        RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
        RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
        RegisteredPointer.prototype["argPackAdvance"] = 8;
        RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
        RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
        RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType;
      }
      function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
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
        assert(sig.indexOf("j") >= 0, "getDynCaller should only be called with i64 sigs");
        var argCache = [];
        return function() {
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
          throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
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
        throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "]));
      }
      function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
        name = readLatin1String(name);
        getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
        if (upcast) {
          upcast = embind__requireFunction(upcastSignature, upcast);
        }
        if (downcast) {
          downcast = embind__requireFunction(downcastSignature, downcast);
        }
        rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
        var legalFunctionName = makeLegalFunctionName(name);
        exposePublicSymbol(legalFunctionName, function() {
          throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [baseClassRawType]);
        });
        whenDependentTypesAreResolved(
          [rawType, rawPointerType, rawConstPointerType],
          baseClassRawType ? [baseClassRawType] : [],
          function(base) {
            base = base[0];
            var baseClass;
            var basePrototype;
            if (baseClassRawType) {
              baseClass = base.registeredClass;
              basePrototype = baseClass.instancePrototype;
            } else {
              basePrototype = ClassHandle.prototype;
            }
            var constructor = createNamedFunction(legalFunctionName, function() {
              if (Object.getPrototypeOf(this) !== instancePrototype) {
                throw new BindingError("Use 'new' to construct " + name);
              }
              if (void 0 === registeredClass.constructor_body) {
                throw new BindingError(name + " has no accessible constructor");
              }
              var body = registeredClass.constructor_body[arguments.length];
              if (void 0 === body) {
                throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
              }
              return body.apply(this, arguments);
            });
            var instancePrototype = Object.create(basePrototype, {
              constructor: { value: constructor }
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
              constPointerType: constPointerConverter
            };
            replacePublicSymbol(legalFunctionName, constructor);
            return [referenceConverter, pointerConverter, constPointerConverter];
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
      function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
        assert(argCount > 0);
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        invoker = embind__requireFunction(invokerSignature, invoker);
        var args = [rawConstructor];
        var destructors = [];
        whenDependentTypesAreResolved([], [rawClassType], function(classType) {
          classType = classType[0];
          var humanName = "constructor " + classType.name;
          if (void 0 === classType.registeredClass.constructor_body) {
            classType.registeredClass.constructor_body = [];
          }
          if (void 0 !== classType.registeredClass.constructor_body[argCount - 1]) {
            throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
          }
          classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() {
            throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes);
          };
          whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
            classType.registeredClass.constructor_body[argCount - 1] = function constructor_body() {
              if (arguments.length !== argCount - 1) {
                throwBindingError(humanName + " called with " + arguments.length + " arguments, expected " + (argCount - 1));
              }
              destructors.length = 0;
              args.length = argCount;
              for (var i = 1; i < argCount; ++i) {
                args[i] = argTypes[i]["toWireType"](destructors, arguments[i - 1]);
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
          throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function");
        }
        var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {
        });
        dummy.prototype = constructor.prototype;
        var obj = new dummy();
        var r = constructor.apply(obj, argumentList);
        return r instanceof Object ? r : obj;
      }
      function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
        var argCount = argTypes.length;
        if (argCount < 2) {
          throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
        }
        var isClassMethodFunc = argTypes[1] !== null && classType !== null;
        var needsDestructorStack = false;
        for (var i = 1; i < argTypes.length; ++i) {
          if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) {
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
        var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\nif (arguments.length !== " + (argCount - 2) + ") {\nthrowBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n}\n";
        if (needsDestructorStack) {
          invokerFnBody += "var destructors = [];\n";
        }
        var dtorStack = needsDestructorStack ? "destructors" : "null";
        var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
        var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
        if (isClassMethodFunc) {
          invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
        }
        for (var i = 0; i < argCount - 2; ++i) {
          invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
          args1.push("argType" + i);
          args2.push(argTypes[i + 2]);
        }
        if (isClassMethodFunc) {
          argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
        }
        invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
        if (needsDestructorStack) {
          invokerFnBody += "runDestructors(destructors);\n";
        } else {
          for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
            var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
            if (argTypes[i].destructorFunction !== null) {
              invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
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
      function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual) {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [rawClassType], function(classType) {
          classType = classType[0];
          var humanName = classType.name + "." + methodName;
          if (isPureVirtual) {
            classType.registeredClass.pureVirtualFunctions.push(methodName);
          }
          function unboundTypesHandler() {
            throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
          }
          var proto = classType.registeredClass.instancePrototype;
          var method = proto[methodName];
          if (void 0 === method || void 0 === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
            unboundTypesHandler.argCount = argCount - 2;
            unboundTypesHandler.className = classType.name;
            proto[methodName] = unboundTypesHandler;
          } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
          }
          whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
            var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context);
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
      var emval_handle_array = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }];
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
            var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
            emval_handle_array[handle] = { refcount: 1, value };
            return handle;
          }
        }
      }
      function __embind_register_emval(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, {
          name,
          "fromWireType": function(handle) {
            var rv = emval_handle_array[handle].value;
            __emval_decref(handle);
            return rv;
          },
          "toWireType": function(destructors, value) {
            return __emval_register(value);
          },
          "argPackAdvance": 8,
          "readValueFromPointer": simpleReadValueFromPointer,
          destructorFunction: null
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
            return function(pointer) {
              return this["fromWireType"](HEAPF32[pointer >> 2]);
            };
          case 3:
            return function(pointer) {
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
          "fromWireType": function(value) {
            return value;
          },
          "toWireType": function(destructors, value) {
            if (typeof value !== "number" && typeof value !== "boolean") {
              throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
            }
            return value;
          },
          "argPackAdvance": 8,
          "readValueFromPointer": floatReadValueFromPointer(name, shift),
          destructorFunction: null
          // This type does not need a destructor
        });
      }
      function integerReadValueFromPointer(name, shift, signed) {
        switch (shift) {
          case 0:
            return signed ? function readS8FromPointer(pointer) {
              return HEAP8[pointer];
            } : function readU8FromPointer(pointer) {
              return HEAPU8[pointer];
            };
          case 1:
            return signed ? function readS16FromPointer(pointer) {
              return HEAP16[pointer >> 1];
            } : function readU16FromPointer(pointer) {
              return HEAPU16[pointer >> 1];
            };
          case 2:
            return signed ? function readS32FromPointer(pointer) {
              return HEAP32[pointer >> 2];
            } : function readU32FromPointer(pointer) {
              return HEAPU32[pointer >> 2];
            };
          default:
            throw new TypeError("Unknown integer type: " + name);
        }
      }
      function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
        name = readLatin1String(name);
        if (maxRange === -1) {
          maxRange = 4294967295;
        }
        var shift = getShiftFromSize(size);
        var fromWireType = function(value) {
          return value;
        };
        if (minRange === 0) {
          var bitshift = 32 - 8 * size;
          fromWireType = function(value) {
            return value << bitshift >>> bitshift;
          };
        }
        var isUnsignedType = name.indexOf("unsigned") != -1;
        registerType(primitiveType, {
          name,
          "fromWireType": fromWireType,
          "toWireType": function(destructors, value) {
            if (typeof value !== "number" && typeof value !== "boolean") {
              throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
            }
            if (value < minRange || value > maxRange) {
              throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!");
            }
            return isUnsignedType ? value >>> 0 : value | 0;
          },
          "argPackAdvance": 8,
          "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
          destructorFunction: null
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
          Float64Array
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
        registerType(rawType, {
          name,
          "fromWireType": decodeMemoryView,
          "argPackAdvance": 8,
          "readValueFromPointer": decodeMemoryView
        }, {
          ignoreDuplicateRegistrations: true
        });
      }
      function __embind_register_smart_ptr(rawType, rawPointeeType, name, sharingPolicy, getPointeeSignature, rawGetPointee, constructorSignature, rawConstructor, shareSignature, rawShare, destructorSignature, rawDestructor) {
        name = readLatin1String(name);
        rawGetPointee = embind__requireFunction(getPointeeSignature, rawGetPointee);
        rawConstructor = embind__requireFunction(constructorSignature, rawConstructor);
        rawShare = embind__requireFunction(shareSignature, rawShare);
        rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
        whenDependentTypesAreResolved([rawType], [rawPointeeType], function(pointeeType) {
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
        });
      }
      function __embind_register_std_string(rawType, name) {
        name = readLatin1String(name);
        var stdStringIsUTF8 = name === "std::string";
        registerType(rawType, {
          name,
          "fromWireType": function(value) {
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
          "toWireType": function(destructors, value) {
            if (value instanceof ArrayBuffer) {
              value = new Uint8Array(value);
            }
            var getLength;
            var valueIsOfTypeString = typeof value === "string";
            if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
              throwBindingError("Cannot pass non-string to std::string");
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              getLength = function() {
                return lengthBytesUTF8(value);
              };
            } else {
              getLength = function() {
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
                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
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
          "argPackAdvance": 8,
          "readValueFromPointer": simpleReadValueFromPointer,
          destructorFunction: function(ptr) {
            _free(ptr);
          }
        });
      }
      function __embind_register_std_wstring(rawType, charSize, name) {
        name = readLatin1String(name);
        var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
        if (charSize === 2) {
          decodeString = UTF16ToString;
          encodeString = stringToUTF16;
          lengthBytesUTF = lengthBytesUTF16;
          getHeap = function() {
            return HEAPU16;
          };
          shift = 1;
        } else if (charSize === 4) {
          decodeString = UTF32ToString;
          encodeString = stringToUTF32;
          lengthBytesUTF = lengthBytesUTF32;
          getHeap = function() {
            return HEAPU32;
          };
          shift = 2;
        }
        registerType(rawType, {
          name,
          "fromWireType": function(value) {
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
          "toWireType": function(destructors, value) {
            if (!(typeof value === "string")) {
              throwBindingError("Cannot pass non-string to C++ string type " + name);
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
          "argPackAdvance": 8,
          "readValueFromPointer": simpleReadValueFromPointer,
          destructorFunction: function(ptr) {
            _free(ptr);
          }
        });
      }
      function __embind_register_void(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, {
          isVoid: true,
          // void return values can be optimized out sometimes
          name,
          "argPackAdvance": 0,
          "fromWireType": function() {
            return void 0;
          },
          "toWireType": function(destructors, o) {
            return void 0;
          }
        });
      }
      function requireRegisteredType(rawType, humanName) {
        var impl = registeredTypes[rawType];
        if (void 0 === impl) {
          throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
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
        abort("Cannot enlarge memory arrays to size " + requestedSize + " bytes (OOM). Either (1) compile with  -s INITIAL_MEMORY=X  with X higher than the current value " + HEAP8.length + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
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
          var lang = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
          var env = {
            "USER": "web_user",
            "LOGNAME": "web_user",
            "PATH": "/",
            "PWD": "/",
            "HOME": "/home/web_user",
            "LANG": lang,
            "_": getExecutableName()
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
      var SYSCALLS = { mappings: {}, buffers: [null, [], []], printChar: function(stream, curr) {
        var buffer2 = SYSCALLS.buffers[stream];
        assert(buffer2);
        if (curr === 0 || curr === 10) {
          (stream === 1 ? out : err)(UTF8ArrayToString(buffer2, 0));
          buffer2.length = 0;
        } else {
          buffer2.push(curr);
        }
      }, varargs: void 0, get: function() {
        assert(SYSCALLS.varargs != void 0);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret;
      }, getStr: function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      }, get64: function(low, high) {
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      } };
      function _environ_get(__environ, environ_buf) {
        var bufSize = 0;
        getEnvStrings().forEach(function(string, i) {
          var ptr = environ_buf + bufSize;
          HEAP32[__environ + i * 4 >> 2] = ptr;
          writeAsciiToMemory(string, ptr);
          bufSize += string.length + 1;
        });
        return 0;
      }
      function _environ_sizes_get(penviron_count, penviron_buf_size) {
        var strings = getEnvStrings();
        HEAP32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach(function(string) {
          bufSize += string.length + 1;
        });
        HEAP32[penviron_buf_size >> 2] = bufSize;
        return 0;
      }
      function _fd_close(fd) {
        abort("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM");
        return 0;
      }
      function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        abort("it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM");
      }
      function _fd_write(fd, iov, iovcnt, pnum) {
        var num = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[iov + i * 8 >> 2];
          var len = HEAP32[iov + (i * 8 + 4) >> 2];
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
        for (var i = 0; i <= index; sum += array[i++]) {
        }
        return sum;
      }
      var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function __addDays(date, days) {
        var newDate = new Date(date.getTime());
        while (days > 0) {
          var leap = __isLeapYear(newDate.getFullYear());
          var currentMonth = newDate.getMonth();
          var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
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
        var tm_zone = HEAP32[tm + 40 >> 2];
        var date = {
          tm_sec: HEAP32[tm >> 2],
          tm_min: HEAP32[tm + 4 >> 2],
          tm_hour: HEAP32[tm + 8 >> 2],
          tm_mday: HEAP32[tm + 12 >> 2],
          tm_mon: HEAP32[tm + 16 >> 2],
          tm_year: HEAP32[tm + 20 >> 2],
          tm_wday: HEAP32[tm + 24 >> 2],
          tm_yday: HEAP32[tm + 28 >> 2],
          tm_isdst: HEAP32[tm + 32 >> 2],
          tm_gmtoff: HEAP32[tm + 36 >> 2],
          tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
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
          "%Oy": "%y"
          // Replaced by the year (offset from %C ) using the locale's alternative numeric symbols.
        };
        for (var rule in EXPANSION_RULES_1) {
          pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
        }
        var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
          if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
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
          var thisDate = __addDays(new Date(date2.tm_year + 1900, 0, 1), date2.tm_yday);
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
          "%a": function(date2) {
            return WEEKDAYS[date2.tm_wday].substring(0, 3);
          },
          "%A": function(date2) {
            return WEEKDAYS[date2.tm_wday];
          },
          "%b": function(date2) {
            return MONTHS[date2.tm_mon].substring(0, 3);
          },
          "%B": function(date2) {
            return MONTHS[date2.tm_mon];
          },
          "%C": function(date2) {
            var year = date2.tm_year + 1900;
            return leadingNulls(year / 100 | 0, 2);
          },
          "%d": function(date2) {
            return leadingNulls(date2.tm_mday, 2);
          },
          "%e": function(date2) {
            return leadingSomething(date2.tm_mday, 2, " ");
          },
          "%g": function(date2) {
            return getWeekBasedYear(date2).toString().substring(2);
          },
          "%G": function(date2) {
            return getWeekBasedYear(date2);
          },
          "%H": function(date2) {
            return leadingNulls(date2.tm_hour, 2);
          },
          "%I": function(date2) {
            var twelveHour = date2.tm_hour;
            if (twelveHour == 0) twelveHour = 12;
            else if (twelveHour > 12) twelveHour -= 12;
            return leadingNulls(twelveHour, 2);
          },
          "%j": function(date2) {
            return leadingNulls(date2.tm_mday + __arraySum(__isLeapYear(date2.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date2.tm_mon - 1), 3);
          },
          "%m": function(date2) {
            return leadingNulls(date2.tm_mon + 1, 2);
          },
          "%M": function(date2) {
            return leadingNulls(date2.tm_min, 2);
          },
          "%n": function() {
            return "\n";
          },
          "%p": function(date2) {
            if (date2.tm_hour >= 0 && date2.tm_hour < 12) {
              return "AM";
            } else {
              return "PM";
            }
          },
          "%S": function(date2) {
            return leadingNulls(date2.tm_sec, 2);
          },
          "%t": function() {
            return "	";
          },
          "%u": function(date2) {
            return date2.tm_wday || 7;
          },
          "%U": function(date2) {
            var janFirst = new Date(date2.tm_year + 1900, 0, 1);
            var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
            var endDate = new Date(date2.tm_year + 1900, date2.tm_mon, date2.tm_mday);
            if (compareByDay(firstSunday, endDate) < 0) {
              var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
              var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
              var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
              return leadingNulls(Math.ceil(days / 7), 2);
            }
            return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
          },
          "%V": function(date2) {
            var janFourthThisYear = new Date(date2.tm_year + 1900, 0, 4);
            var janFourthNextYear = new Date(date2.tm_year + 1901, 0, 4);
            var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
            var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
            var endDate = __addDays(new Date(date2.tm_year + 1900, 0, 1), date2.tm_yday);
            if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
              return "53";
            }
            if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
              return "01";
            }
            var daysDifference;
            if (firstWeekStartThisYear.getFullYear() < date2.tm_year + 1900) {
              daysDifference = date2.tm_yday + 32 - firstWeekStartThisYear.getDate();
            } else {
              daysDifference = date2.tm_yday + 1 - firstWeekStartThisYear.getDate();
            }
            return leadingNulls(Math.ceil(daysDifference / 7), 2);
          },
          "%w": function(date2) {
            return date2.tm_wday;
          },
          "%W": function(date2) {
            var janFirst = new Date(date2.tm_year, 0, 1);
            var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
            var endDate = new Date(date2.tm_year + 1900, date2.tm_mon, date2.tm_mday);
            if (compareByDay(firstMonday, endDate) < 0) {
              var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
              var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
              var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
              return leadingNulls(Math.ceil(days / 7), 2);
            }
            return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
          },
          "%y": function(date2) {
            return (date2.tm_year + 1900).toString().substring(2);
          },
          "%Y": function(date2) {
            return date2.tm_year + 1900;
          },
          "%z": function(date2) {
            var off = date2.tm_gmtoff;
            var ahead = off >= 0;
            off = Math.abs(off) / 60;
            off = off / 60 * 100 + off % 60;
            return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
          },
          "%Z": function(date2) {
            return date2.tm_zone;
          },
          "%%": function() {
            return "%";
          }
        };
        for (var rule in EXPANSION_RULES_2) {
          if (pattern.indexOf(rule) >= 0) {
            pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
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
      BindingError = Module["BindingError"] = extendError(Error, "BindingError");
      InternalError = Module["InternalError"] = extendError(Error, "InternalError");
      init_ClassHandle();
      init_RegisteredPointer();
      init_embind();
      UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
      init_emval();
      function intArrayFromString(stringy, dontAddNull, length) {
        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull) u8array.length = numBytesWritten;
        return u8array;
      }
      __ATINIT__.push({ func: function() {
        ___wasm_call_ctors();
      } });
      var asmLibraryArg = {
        "__assert_fail": ___assert_fail,
        "__cxa_allocate_exception": ___cxa_allocate_exception,
        "__cxa_atexit": ___cxa_atexit,
        "__cxa_throw": ___cxa_throw,
        "_embind_register_bool": __embind_register_bool,
        "_embind_register_class": __embind_register_class,
        "_embind_register_class_constructor": __embind_register_class_constructor,
        "_embind_register_class_function": __embind_register_class_function,
        "_embind_register_emval": __embind_register_emval,
        "_embind_register_float": __embind_register_float,
        "_embind_register_integer": __embind_register_integer,
        "_embind_register_memory_view": __embind_register_memory_view,
        "_embind_register_smart_ptr": __embind_register_smart_ptr,
        "_embind_register_std_string": __embind_register_std_string,
        "_embind_register_std_wstring": __embind_register_std_wstring,
        "_embind_register_void": __embind_register_void,
        "_emval_call": __emval_call,
        "_emval_decref": __emval_decref,
        "_emval_incref": __emval_incref,
        "_emval_new_array": __emval_new_array,
        "_emval_new_cstring": __emval_new_cstring,
        "_emval_new_object": __emval_new_object,
        "_emval_set_property": __emval_set_property,
        "_emval_take_value": __emval_take_value,
        "abort": _abort,
        "emscripten_memcpy_big": _emscripten_memcpy_big,
        "emscripten_resize_heap": _emscripten_resize_heap,
        "environ_get": _environ_get,
        "environ_sizes_get": _environ_sizes_get,
        "fd_close": _fd_close,
        "fd_seek": _fd_seek,
        "fd_write": _fd_write,
        "memory": wasmMemory,
        "pthread_rwlock_destroy": _pthread_rwlock_destroy,
        "pthread_rwlock_init": _pthread_rwlock_init,
        "pthread_rwlock_rdlock": _pthread_rwlock_rdlock,
        "pthread_rwlock_unlock": _pthread_rwlock_unlock,
        "pthread_rwlock_wrlock": _pthread_rwlock_wrlock,
        "setTempRet0": _setTempRet0,
        "strftime_l": _strftime_l
      };
      var asm = createWasm();
      var ___wasm_call_ctors = Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors", asm);
      var _malloc = Module["_malloc"] = createExportWrapper("malloc", asm);
      var ___errno_location = Module["___errno_location"] = createExportWrapper("__errno_location", asm);
      var ___getTypeName = Module["___getTypeName"] = createExportWrapper("__getTypeName", asm);
      var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = createExportWrapper("__embind_register_native_and_builtin_types", asm);
      var _fflush = Module["_fflush"] = createExportWrapper("fflush", asm);
      var stackSave = Module["stackSave"] = createExportWrapper("stackSave", asm);
      var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore", asm);
      var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc", asm);
      var _emscripten_stack_init = Module["_emscripten_stack_init"] = asm["emscripten_stack_init"];
      var _emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = asm["emscripten_stack_get_free"];
      var _emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = asm["emscripten_stack_get_end"];
      var _setThrew = Module["_setThrew"] = createExportWrapper("setThrew", asm);
      var _free = Module["_free"] = createExportWrapper("free", asm);
      var dynCall_viijii = Module["dynCall_viijii"] = createExportWrapper("dynCall_viijii", asm);
      var dynCall_iiiij = Module["dynCall_iiiij"] = createExportWrapper("dynCall_iiiij", asm);
      var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji", asm);
      var dynCall_iiiiij = Module["dynCall_iiiiij"] = createExportWrapper("dynCall_iiiiij", asm);
      var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = createExportWrapper("dynCall_iiiiijj", asm);
      var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = createExportWrapper("dynCall_iiiiiijj", asm);
      if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromString")) Module["intArrayFromString"] = function() {
        abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "intArrayToString")) Module["intArrayToString"] = function() {
        abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ccall")) Module["ccall"] = function() {
        abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "cwrap")) Module["cwrap"] = function() {
        abort("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "setValue")) Module["setValue"] = function() {
        abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getValue")) Module["getValue"] = function() {
        abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "allocate")) Module["allocate"] = function() {
        abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString")) Module["UTF8ArrayToString"] = function() {
        abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF8ToString")) Module["UTF8ToString"] = function() {
        abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array")) Module["stringToUTF8Array"] = function() {
        abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8")) Module["stringToUTF8"] = function() {
        abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8")) Module["lengthBytesUTF8"] = function() {
        abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() {
        abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun")) Module["addOnPreRun"] = function() {
        abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnInit")) Module["addOnInit"] = function() {
        abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain")) Module["addOnPreMain"] = function() {
        abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnExit")) Module["addOnExit"] = function() {
        abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun")) Module["addOnPostRun"] = function() {
        abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeStringToMemory")) Module["writeStringToMemory"] = function() {
        abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory")) Module["writeArrayToMemory"] = function() {
        abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory")) Module["writeAsciiToMemory"] = function() {
        abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "addRunDependency")) Module["addRunDependency"] = function() {
        abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "removeRunDependency")) Module["removeRunDependency"] = function() {
        abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createFolder")) Module["FS_createFolder"] = function() {
        abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createPath")) Module["FS_createPath"] = function() {
        abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createDataFile")) Module["FS_createDataFile"] = function() {
        abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createPreloadedFile")) Module["FS_createPreloadedFile"] = function() {
        abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createLazyFile")) Module["FS_createLazyFile"] = function() {
        abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createLink")) Module["FS_createLink"] = function() {
        abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createDevice")) Module["FS_createDevice"] = function() {
        abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_unlink")) Module["FS_unlink"] = function() {
        abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getLEB")) Module["getLEB"] = function() {
        abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables")) Module["getFunctionTables"] = function() {
        abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables")) Module["alignFunctionTables"] = function() {
        abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions")) Module["registerFunctions"] = function() {
        abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "addFunction")) Module["addFunction"] = function() {
        abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "removeFunction")) Module["removeFunction"] = function() {
        abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() {
        abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint")) Module["prettyPrint"] = function() {
        abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "makeBigInt")) Module["makeBigInt"] = function() {
        abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() {
        abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting")) Module["getCompilerSetting"] = function() {
        abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "print")) Module["print"] = function() {
        abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "printErr")) Module["printErr"] = function() {
        abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0")) Module["getTempRet0"] = function() {
        abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0")) Module["setTempRet0"] = function() {
        abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "callMain")) Module["callMain"] = function() {
        abort("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "abort")) Module["abort"] = function() {
        abort("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8")) Module["stringToNewUTF8"] = function() {
        abort("'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "setFileTime")) Module["setFileTime"] = function() {
        abort("'setFileTime' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "abortOnCannotGrowMemory")) Module["abortOnCannotGrowMemory"] = function() {
        abort("'abortOnCannotGrowMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer")) Module["emscripten_realloc_buffer"] = function() {
        abort("'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ENV")) Module["ENV"] = function() {
        abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES")) Module["ERRNO_CODES"] = function() {
        abort("'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES")) Module["ERRNO_MESSAGES"] = function() {
        abort("'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "setErrNo")) Module["setErrNo"] = function() {
        abort("'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "DNS")) Module["DNS"] = function() {
        abort("'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getHostByName")) Module["getHostByName"] = function() {
        abort("'getHostByName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES")) Module["GAI_ERRNO_MESSAGES"] = function() {
        abort("'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "Protocols")) Module["Protocols"] = function() {
        abort("'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "Sockets")) Module["Sockets"] = function() {
        abort("'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getRandomDevice")) Module["getRandomDevice"] = function() {
        abort("'getRandomDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "traverseStack")) Module["traverseStack"] = function() {
        abort("'traverseStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE")) Module["UNWIND_CACHE"] = function() {
        abort("'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "withBuiltinMalloc")) Module["withBuiltinMalloc"] = function() {
        abort("'withBuiltinMalloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgsArray")) Module["readAsmConstArgsArray"] = function() {
        abort("'readAsmConstArgsArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs")) Module["readAsmConstArgs"] = function() {
        abort("'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "mainThreadEM_ASM")) Module["mainThreadEM_ASM"] = function() {
        abort("'mainThreadEM_ASM' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "jstoi_q")) Module["jstoi_q"] = function() {
        abort("'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "jstoi_s")) Module["jstoi_s"] = function() {
        abort("'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getExecutableName")) Module["getExecutableName"] = function() {
        abort("'getExecutableName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "listenOnce")) Module["listenOnce"] = function() {
        abort("'listenOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "autoResumeAudioContext")) Module["autoResumeAudioContext"] = function() {
        abort("'autoResumeAudioContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCallLegacy")) Module["dynCallLegacy"] = function() {
        abort("'dynCallLegacy' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getDynCaller")) Module["getDynCaller"] = function() {
        abort("'getDynCaller' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() {
        abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "callRuntimeCallbacks")) Module["callRuntimeCallbacks"] = function() {
        abort("'callRuntimeCallbacks' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "abortStackOverflow")) Module["abortStackOverflow"] = function() {
        abort("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "reallyNegative")) Module["reallyNegative"] = function() {
        abort("'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "unSign")) Module["unSign"] = function() {
        abort("'unSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "reSign")) Module["reSign"] = function() {
        abort("'reSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "formatString")) Module["formatString"] = function() {
        abort("'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "PATH")) Module["PATH"] = function() {
        abort("'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "PATH_FS")) Module["PATH_FS"] = function() {
        abort("'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "SYSCALLS")) Module["SYSCALLS"] = function() {
        abort("'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "syscallMmap2")) Module["syscallMmap2"] = function() {
        abort("'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "syscallMunmap")) Module["syscallMunmap"] = function() {
        abort("'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "JSEvents")) Module["JSEvents"] = function() {
        abort("'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets")) Module["specialHTMLTargets"] = function() {
        abort("'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "maybeCStringToJsString")) Module["maybeCStringToJsString"] = function() {
        abort("'maybeCStringToJsString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "findEventTarget")) Module["findEventTarget"] = function() {
        abort("'findEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "findCanvasEventTarget")) Module["findCanvasEventTarget"] = function() {
        abort("'findCanvasEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "polyfillSetImmediate")) Module["polyfillSetImmediate"] = function() {
        abort("'polyfillSetImmediate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "demangle")) Module["demangle"] = function() {
        abort("'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "demangleAll")) Module["demangleAll"] = function() {
        abort("'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "jsStackTrace")) Module["jsStackTrace"] = function() {
        abort("'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() {
        abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getEnvStrings")) Module["getEnvStrings"] = function() {
        abort("'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "checkWasiClock")) Module["checkWasiClock"] = function() {
        abort("'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "flush_NO_FILESYSTEM")) Module["flush_NO_FILESYSTEM"] = function() {
        abort("'flush_NO_FILESYSTEM' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64")) Module["writeI53ToI64"] = function() {
        abort("'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped")) Module["writeI53ToI64Clamped"] = function() {
        abort("'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling")) Module["writeI53ToI64Signaling"] = function() {
        abort("'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped")) Module["writeI53ToU64Clamped"] = function() {
        abort("'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling")) Module["writeI53ToU64Signaling"] = function() {
        abort("'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "readI53FromI64")) Module["readI53FromI64"] = function() {
        abort("'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "readI53FromU64")) Module["readI53FromU64"] = function() {
        abort("'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53")) Module["convertI32PairToI53"] = function() {
        abort("'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53")) Module["convertU32PairToI53"] = function() {
        abort("'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "uncaughtExceptionCount")) Module["uncaughtExceptionCount"] = function() {
        abort("'uncaughtExceptionCount' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "exceptionLast")) Module["exceptionLast"] = function() {
        abort("'exceptionLast' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "exceptionCaught")) Module["exceptionCaught"] = function() {
        abort("'exceptionCaught' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfoAttrs")) Module["ExceptionInfoAttrs"] = function() {
        abort("'ExceptionInfoAttrs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfo")) Module["ExceptionInfo"] = function() {
        abort("'ExceptionInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "CatchInfo")) Module["CatchInfo"] = function() {
        abort("'CatchInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "exception_addRef")) Module["exception_addRef"] = function() {
        abort("'exception_addRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "exception_decRef")) Module["exception_decRef"] = function() {
        abort("'exception_decRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "Browser")) Module["Browser"] = function() {
        abort("'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "funcWrappers")) Module["funcWrappers"] = function() {
        abort("'funcWrappers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() {
        abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "setMainLoop")) Module["setMainLoop"] = function() {
        abort("'setMainLoop' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "FS")) Module["FS"] = function() {
        abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "mmapAlloc")) Module["mmapAlloc"] = function() {
        abort("'mmapAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "MEMFS")) Module["MEMFS"] = function() {
        abort("'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "TTY")) Module["TTY"] = function() {
        abort("'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "PIPEFS")) Module["PIPEFS"] = function() {
        abort("'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "SOCKFS")) Module["SOCKFS"] = function() {
        abort("'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "tempFixedLengthArray")) Module["tempFixedLengthArray"] = function() {
        abort("'tempFixedLengthArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "miniTempWebGLFloatBuffers")) Module["miniTempWebGLFloatBuffers"] = function() {
        abort("'miniTempWebGLFloatBuffers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "heapObjectForWebGLType")) Module["heapObjectForWebGLType"] = function() {
        abort("'heapObjectForWebGLType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "heapAccessShiftForWebGLHeap")) Module["heapAccessShiftForWebGLHeap"] = function() {
        abort("'heapAccessShiftForWebGLHeap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "GL")) Module["GL"] = function() {
        abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet")) Module["emscriptenWebGLGet"] = function() {
        abort("'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "computeUnpackAlignedImageSize")) Module["computeUnpackAlignedImageSize"] = function() {
        abort("'computeUnpackAlignedImageSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetTexPixelData")) Module["emscriptenWebGLGetTexPixelData"] = function() {
        abort("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform")) Module["emscriptenWebGLGetUniform"] = function() {
        abort("'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetVertexAttrib")) Module["emscriptenWebGLGetVertexAttrib"] = function() {
        abort("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "writeGLArray")) Module["writeGLArray"] = function() {
        abort("'writeGLArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "AL")) Module["AL"] = function() {
        abort("'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_unicode")) Module["SDL_unicode"] = function() {
        abort("'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext")) Module["SDL_ttfContext"] = function() {
        abort("'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_audio")) Module["SDL_audio"] = function() {
        abort("'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL")) Module["SDL"] = function() {
        abort("'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_gfx")) Module["SDL_gfx"] = function() {
        abort("'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "GLUT")) Module["GLUT"] = function() {
        abort("'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "EGL")) Module["EGL"] = function() {
        abort("'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "GLFW_Window")) Module["GLFW_Window"] = function() {
        abort("'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "GLFW")) Module["GLFW"] = function() {
        abort("'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "GLEW")) Module["GLEW"] = function() {
        abort("'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "IDBStore")) Module["IDBStore"] = function() {
        abort("'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError")) Module["runAndAbortIfError"] = function() {
        abort("'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_handle_array")) Module["emval_handle_array"] = function() {
        abort("'emval_handle_array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_free_list")) Module["emval_free_list"] = function() {
        abort("'emval_free_list' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_symbols")) Module["emval_symbols"] = function() {
        abort("'emval_symbols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "init_emval")) Module["init_emval"] = function() {
        abort("'init_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "count_emval_handles")) Module["count_emval_handles"] = function() {
        abort("'count_emval_handles' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "get_first_emval")) Module["get_first_emval"] = function() {
        abort("'get_first_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getStringOrSymbol")) Module["getStringOrSymbol"] = function() {
        abort("'getStringOrSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "requireHandle")) Module["requireHandle"] = function() {
        abort("'requireHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_newers")) Module["emval_newers"] = function() {
        abort("'emval_newers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "craftEmvalAllocator")) Module["craftEmvalAllocator"] = function() {
        abort("'craftEmvalAllocator' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_get_global")) Module["emval_get_global"] = function() {
        abort("'emval_get_global' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "emval_methodCallers")) Module["emval_methodCallers"] = function() {
        abort("'emval_methodCallers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "InternalError")) Module["InternalError"] = function() {
        abort("'InternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "BindingError")) Module["BindingError"] = function() {
        abort("'BindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "UnboundTypeError")) Module["UnboundTypeError"] = function() {
        abort("'UnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "PureVirtualError")) Module["PureVirtualError"] = function() {
        abort("'PureVirtualError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "init_embind")) Module["init_embind"] = function() {
        abort("'init_embind' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "throwInternalError")) Module["throwInternalError"] = function() {
        abort("'throwInternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "throwBindingError")) Module["throwBindingError"] = function() {
        abort("'throwBindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "throwUnboundTypeError")) Module["throwUnboundTypeError"] = function() {
        abort("'throwUnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ensureOverloadTable")) Module["ensureOverloadTable"] = function() {
        abort("'ensureOverloadTable' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "exposePublicSymbol")) Module["exposePublicSymbol"] = function() {
        abort("'exposePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "replacePublicSymbol")) Module["replacePublicSymbol"] = function() {
        abort("'replacePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "extendError")) Module["extendError"] = function() {
        abort("'extendError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "createNamedFunction")) Module["createNamedFunction"] = function() {
        abort("'createNamedFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "registeredInstances")) Module["registeredInstances"] = function() {
        abort("'registeredInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getBasestPointer")) Module["getBasestPointer"] = function() {
        abort("'getBasestPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "registerInheritedInstance")) Module["registerInheritedInstance"] = function() {
        abort("'registerInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "unregisterInheritedInstance")) Module["unregisterInheritedInstance"] = function() {
        abort("'unregisterInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getInheritedInstance")) Module["getInheritedInstance"] = function() {
        abort("'getInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getInheritedInstanceCount")) Module["getInheritedInstanceCount"] = function() {
        abort("'getInheritedInstanceCount' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getLiveInheritedInstances")) Module["getLiveInheritedInstances"] = function() {
        abort("'getLiveInheritedInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "registeredTypes")) Module["registeredTypes"] = function() {
        abort("'registeredTypes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "awaitingDependencies")) Module["awaitingDependencies"] = function() {
        abort("'awaitingDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "typeDependencies")) Module["typeDependencies"] = function() {
        abort("'typeDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "registeredPointers")) Module["registeredPointers"] = function() {
        abort("'registeredPointers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "registerType")) Module["registerType"] = function() {
        abort("'registerType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "whenDependentTypesAreResolved")) Module["whenDependentTypesAreResolved"] = function() {
        abort("'whenDependentTypesAreResolved' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "embind_charCodes")) Module["embind_charCodes"] = function() {
        abort("'embind_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "embind_init_charCodes")) Module["embind_init_charCodes"] = function() {
        abort("'embind_init_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "readLatin1String")) Module["readLatin1String"] = function() {
        abort("'readLatin1String' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getTypeName")) Module["getTypeName"] = function() {
        abort("'getTypeName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "heap32VectorToArray")) Module["heap32VectorToArray"] = function() {
        abort("'heap32VectorToArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "requireRegisteredType")) Module["requireRegisteredType"] = function() {
        abort("'requireRegisteredType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "getShiftFromSize")) Module["getShiftFromSize"] = function() {
        abort("'getShiftFromSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "integerReadValueFromPointer")) Module["integerReadValueFromPointer"] = function() {
        abort("'integerReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "enumReadValueFromPointer")) Module["enumReadValueFromPointer"] = function() {
        abort("'enumReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "floatReadValueFromPointer")) Module["floatReadValueFromPointer"] = function() {
        abort("'floatReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "simpleReadValueFromPointer")) Module["simpleReadValueFromPointer"] = function() {
        abort("'simpleReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "runDestructors")) Module["runDestructors"] = function() {
        abort("'runDestructors' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "new_")) Module["new_"] = function() {
        abort("'new_' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "craftInvokerFunction")) Module["craftInvokerFunction"] = function() {
        abort("'craftInvokerFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "embind__requireFunction")) Module["embind__requireFunction"] = function() {
        abort("'embind__requireFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "tupleRegistrations")) Module["tupleRegistrations"] = function() {
        abort("'tupleRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "structRegistrations")) Module["structRegistrations"] = function() {
        abort("'structRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "genericPointerToWireType")) Module["genericPointerToWireType"] = function() {
        abort("'genericPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "constNoSmartPtrRawPointerToWireType")) Module["constNoSmartPtrRawPointerToWireType"] = function() {
        abort("'constNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "nonConstNoSmartPtrRawPointerToWireType")) Module["nonConstNoSmartPtrRawPointerToWireType"] = function() {
        abort("'nonConstNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "init_RegisteredPointer")) Module["init_RegisteredPointer"] = function() {
        abort("'init_RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer")) Module["RegisteredPointer"] = function() {
        abort("'RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_getPointee")) Module["RegisteredPointer_getPointee"] = function() {
        abort("'RegisteredPointer_getPointee' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_destructor")) Module["RegisteredPointer_destructor"] = function() {
        abort("'RegisteredPointer_destructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_deleteObject")) Module["RegisteredPointer_deleteObject"] = function() {
        abort("'RegisteredPointer_deleteObject' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "RegisteredPointer_fromWireType")) Module["RegisteredPointer_fromWireType"] = function() {
        abort("'RegisteredPointer_fromWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "runDestructor")) Module["runDestructor"] = function() {
        abort("'runDestructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "releaseClassHandle")) Module["releaseClassHandle"] = function() {
        abort("'releaseClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "finalizationGroup")) Module["finalizationGroup"] = function() {
        abort("'finalizationGroup' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "detachFinalizer_deps")) Module["detachFinalizer_deps"] = function() {
        abort("'detachFinalizer_deps' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "detachFinalizer")) Module["detachFinalizer"] = function() {
        abort("'detachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "attachFinalizer")) Module["attachFinalizer"] = function() {
        abort("'attachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "makeClassHandle")) Module["makeClassHandle"] = function() {
        abort("'makeClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "init_ClassHandle")) Module["init_ClassHandle"] = function() {
        abort("'init_ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle")) Module["ClassHandle"] = function() {
        abort("'ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_isAliasOf")) Module["ClassHandle_isAliasOf"] = function() {
        abort("'ClassHandle_isAliasOf' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "throwInstanceAlreadyDeleted")) Module["throwInstanceAlreadyDeleted"] = function() {
        abort("'throwInstanceAlreadyDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_clone")) Module["ClassHandle_clone"] = function() {
        abort("'ClassHandle_clone' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_delete")) Module["ClassHandle_delete"] = function() {
        abort("'ClassHandle_delete' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "deletionQueue")) Module["deletionQueue"] = function() {
        abort("'deletionQueue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_isDeleted")) Module["ClassHandle_isDeleted"] = function() {
        abort("'ClassHandle_isDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "ClassHandle_deleteLater")) Module["ClassHandle_deleteLater"] = function() {
        abort("'ClassHandle_deleteLater' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "flushPendingDeletes")) Module["flushPendingDeletes"] = function() {
        abort("'flushPendingDeletes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "delayFunction")) Module["delayFunction"] = function() {
        abort("'delayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "setDelayFunction")) Module["setDelayFunction"] = function() {
        abort("'setDelayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "RegisteredClass")) Module["RegisteredClass"] = function() {
        abort("'RegisteredClass' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "shallowCopyInternalPointer")) Module["shallowCopyInternalPointer"] = function() {
        abort("'shallowCopyInternalPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "downcastPointer")) Module["downcastPointer"] = function() {
        abort("'downcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "upcastPointer")) Module["upcastPointer"] = function() {
        abort("'upcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "validateThis")) Module["validateThis"] = function() {
        abort("'validateThis' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "char_0")) Module["char_0"] = function() {
        abort("'char_0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "char_9")) Module["char_9"] = function() {
        abort("'char_9' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "makeLegalFunctionName")) Module["makeLegalFunctionName"] = function() {
        abort("'makeLegalFunctionName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "warnOnce")) Module["warnOnce"] = function() {
        abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stackSave")) Module["stackSave"] = function() {
        abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stackRestore")) Module["stackRestore"] = function() {
        abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc")) Module["stackAlloc"] = function() {
        abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "AsciiToString")) Module["AsciiToString"] = function() {
        abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii")) Module["stringToAscii"] = function() {
        abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF16ToString")) Module["UTF16ToString"] = function() {
        abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF16")) Module["stringToUTF16"] = function() {
        abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16")) Module["lengthBytesUTF16"] = function() {
        abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF32ToString")) Module["UTF32ToString"] = function() {
        abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF32")) Module["stringToUTF32"] = function() {
        abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32")) Module["lengthBytesUTF32"] = function() {
        abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8")) Module["allocateUTF8"] = function() {
        abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack")) Module["allocateUTF8OnStack"] = function() {
        abort("'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      };
      Module["writeStackCookie"] = writeStackCookie;
      Module["checkStackCookie"] = checkStackCookie;
      if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL")) Object.defineProperty(Module, "ALLOC_NORMAL", { configurable: true, get: function() {
        abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      } });
      if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK")) Object.defineProperty(Module, "ALLOC_STACK", { configurable: true, get: function() {
        abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
      } });
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
          assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
          postRun();
        }
        if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(function() {
            setTimeout(function() {
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
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].pop()();
        }
      }
      noExitRuntime = true;
      run();
    }
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
                      result.push("\\x", HEX[Math.floor(alphaIndex / 16)], HEX[alphaIndex % 16]);
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
                      for (let j = 0; j < 3 && i < pattern.length && isHexadecimal(pattern[i]); i++, j++) {
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
      var RE22 = class _RE2 {
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
              flags = flags !== null && flags !== void 0 ? flags : pattern.flags;
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
            throw new Error('RE2 only works in unicode mode. The "u" flag must be passed when constructing a RE2 instance');
          }
          this.pattern = pattern;
          this.wrapper = new re2_1.WrappedRE2(translateRegExp(pattern, this._multiline), this._ignoreCase, this._multiline, this._dotAll);
          if (!this.wrapper.ok()) {
            throw new SyntaxError(`Invalid regular expression: /${pattern}/${flags}: ${this.wrapper.error()}`);
          }
          const groupNames = this.wrapper.capturingGroupNames();
          const groupNumbers = groupNames.keys();
          for (let i = 0; i < groupNumbers.size(); i++) {
            const num = groupNumbers.get(i);
            const name = groupNames.get(num);
            if (name in this.namedGroups) {
              throw new SyntaxError(`Invalid regular expression: /${pattern}/${flags}: Duplicate capture group name`);
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
          return (this._global ? "g" : "") + (this._ignoreCase ? "i" : "") + (this._multiline ? "m" : "") + (this._dotAll ? "s" : "") + (this._unicode ? "u" : "") + (this._sticky ? "y" : "");
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
          return match.index === searchStart || !this._sticky && match.index >= 0;
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
          for (const [groupName, groupNum] of Object.entries(this.namedGroups)) {
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
          const match = this.wrapper.match(input, this.getMaybeStickyIndex(), false);
          this.maybeUpdateLastIndex(match, startIndex);
          return this.isMatchSuccessful(match, startIndex);
        }
        compile() {
          throw new Error("Deprecated RegExp method compile is not implemented in RE2.");
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
              success = match.index === nextIndex || !this._sticky && match.index >= 0;
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
                      result += (_a = match.groups[this.namedGroups[groupName] - 1]) !== null && _a !== void 0 ? _a : "";
                    }
                    i = endCaret;
                    break;
                  }
                  default: {
                    let groupNum;
                    if ("123456789".includes(replacer[i + 1])) {
                      if ("0123456789".includes(replacer[i + 2])) {
                        groupNum = Number.parseInt(replacer.substring(i + 1, i + 3)) - 1;
                        i += 2;
                      } else {
                        groupNum = Number.parseInt(replacer[i + 1]) - 1;
                        i++;
                      }
                    } else {
                      throw new Error("Invalid replacement string");
                    }
                    if (groupNum < match.groups.length) {
                      result += (_b = match.groups[groupNum]) !== null && _b !== void 0 ? _b : "";
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
            return replacer(match.match, ...match.groups, match.index, input, this.getNamedGroups(match));
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
              success = match.index === nextIndex || !this._sticky && match.index >= 0;
              if (success) {
                result += input.substring(nextIndex, match.index) + this.replaceMatch(input, match, replacer);
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
              return input.substring(0, match.index) + this.replaceMatch(input, match, replacer) + input.substring(match.index + match.match.length);
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
      exports.RE2 = RE22;
    }
  });

  // TSFiles/HelperClasses/InfiniteList.ts
  var InfiniteList = class _InfiniteList extends Array {
    constructor(initial, func) {
      super();
      this.initial = initial;
      this.func = func;
      super.push(initial);
      return new Proxy(this, {
        get: (target, prop, receiver) => {
          if (typeof prop === "string" && !isNaN(Number(prop))) {
            const index = Number(prop);
            return _InfiniteList.lazyAt(target, index, func, receiver.transforms);
          }
          if (prop === Symbol.iterator) {
            return function* () {
              let index = 0;
              while (true) {
                yield _InfiniteList.lazyAt(
                  target,
                  index++,
                  func,
                  receiver.transforms
                );
              }
            };
          }
          if (prop === "map") {
            return (fn) => {
              const newList = new _InfiniteList(initial, func);
              for (let i = 0; i < target.length; i++) {
                newList[i] = target[i];
              }
              newList.transforms = [...receiver.transforms, fn];
              return newList;
            };
          }
          if (prop === "slice") {
            return (start, end) => {
              const s = start ?? 0;
              const e = end ?? target.length;
              const result = [];
              for (let i = s; i < e; i++) {
                result.push(
                  _InfiniteList.lazyAt(target, i, func, receiver.transforms)
                );
              }
              return result;
            };
          }
          const value = Reflect.get(target, prop, receiver);
          return typeof value === "function" ? value.bind(target) : value;
        }
      });
    }
    transforms = [];
    static lazyAt(target, index, func, transforms) {
      if (index < 0) throw new RangeError("Index must be >= 0");
      while (target.length <= index) {
        const prev = target[target.length - 1];
        target.push(func(prev));
      }
      let value = target[index];
      for (const f of transforms) {
        value = f(value);
      }
      return value;
    }
    take(n) {
      const result = [];
      for (let i = 0; i < n; i++) {
        result.push(this[i]);
      }
      return result;
    }
  };

  // TSFiles/operatorRegistry.ts
  init_Block();
  init_Item();
  init_TypeMap();
  init_Double();
  init_Integer();
  init_Fluid();
  init_Math();
  var import_re2_wasm = __toESM(require_re22());
  init_Long();

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
  };

  // TSFiles/operatorRegistry.ts
  init_Properties();

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
    constructor() {
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
      return null;
    }
    getTypeAsString() {
      return "NullTag";
    }
    equals(tag) {
      return tag.getType() == Tag.TAG_NULL;
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag.ts
  init_Integer();

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
      return this.data.length;
    }
    get(index) {
      return this.data[index];
    }
    getArray() {
      return [...this.data];
    }
    add(tag) {
      this.data.push(tag);
    }
    getTypeAsString() {
      return "ListTag";
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_LIST) return false;
      for (const [i, e] of Object.entries(tag.getArray())) {
        if (!e.equals(this.get(parseInt(i)))) return false;
      }
      return true;
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
      return parseInt(this.data.toDecimal());
    }
    getTypeAsString() {
      return "IntTag";
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_BYTE) return false;
      return this.valueOf() == tag.valueOf();
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
      return parseInt(this.data.toDecimal());
    }
    getTypeAsString() {
      return "ByteTag";
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_BYTE) return false;
      return this.valueOf() == tag.valueOf();
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag.ts
  init_Long();

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
      return parseInt(this.data.toDecimal());
    }
    getTypeAsString() {
      return "LongTag";
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_BYTE) return false;
      return this.valueOf() == tag.valueOf();
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag.ts
  init_Double();

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
      return parseInt(this.data.toDecimal());
    }
    getTypeAsString() {
      return "DoubleTag";
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_DOUBLE) return false;
      return this.getAsDouble() == tag.getAsDouble();
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
      return Object.keys(this.data);
    }
    get(key) {
      return this.data[key];
    }
    has(key) {
      return key in this.data;
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
        data[key] = value;
      }
      return new _CompoundTag(data);
    }
    without(key) {
      let data = { ...this.data };
      delete data[key];
      return new _CompoundTag(data);
    }
    getTypeAsString() {
      return "CompoundTag";
    }
    toJSON() {
      let obj = {};
      function mapTagArray(value) {
        value.getArray().map((e) => {
          if (e instanceof _CompoundTag) return e.toJSON();
          if (e instanceof ListTag) return mapTagArray(e);
          let innerValue = value.valueOf();
          while (innerValue instanceof Object && innerValue.constructor.name != "Object") {
            innerValue = innerValue.toJSON();
          }
        });
      }
      for (const [key, value] of Object.entries(this.data)) {
        if (!(value instanceof _CompoundTag || value instanceof ListTag)) {
          let innerValue = value.valueOf();
          findBase: while (innerValue instanceof Object && innerValue.constructor.name != "Object") {
            if (!("toJSON" in innerValue)) break findBase;
            innerValue = innerValue["toJSON"]();
          }
          obj[key] = innerValue;
        } else if (value instanceof _CompoundTag) obj[key] = value.toJSON();
        else obj[key] = mapTagArray(value);
      }
    }
    static fromJSON(data) {
      const jsonStr = data.replace(/([{,]\s*)([A-Za-z_]+)(\s*:)/g, '$1"$2"$3').replace(
        /(:\s*)([A-Za-z0-9_]*[A-Za-z][A-Za-z0-9_]*)(?=\s*[,}])/g,
        '$1"$2"'
      ).replace(
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
                obj[key] = new DoubleTag(new Double(parseInt(str.slice(0, -1))));
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
          if (Array.isArray(v)) arr[i] = new ListTag(arrayCase(v));
          else if (v instanceof Object) arr[i] = objectCase(v);
          else arr[i] = baseCase(v);
        }
        return arr;
      }
      return objectCase(json);
    }
    compoundSubset(subset) {
      for (const key of subset.getAllKeys()) {
        const subValue = subset.get(key);
        const superValue = this.get(key);
        if (superValue === void 0) return false;
        if (subValue instanceof _CompoundTag && superValue instanceof _CompoundTag) {
          if (!superValue.compoundSubset(subValue)) return false;
        } else if (subValue instanceof ListTag && superValue instanceof ListTag) {
          let subValueArr = subValue.valueOf();
          let superValueArr = superValue.valueOf();
          if (subValueArr.length !== superValueArr.length) return false;
          if (subValueArr.every((v, i) => superValueArr[i]?.equals(v)))
            return true;
          return false;
        }
      }
      return true;
    }
    compoundUnion(other) {
      const keys = [];
      const values = [];
      for (const key of other.getAllKeys()) {
        const thisValue = this.get(key);
        const otherValue = other.get(key);
        if (thisValue instanceof _CompoundTag && otherValue instanceof _CompoundTag) {
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
      for (const key of this.getAllKeys()) {
        const thisValue = this.get(key);
        const otherValue = other.get(key);
        if (thisValue instanceof _CompoundTag && otherValue instanceof _CompoundTag) {
          const sub = thisValue.compoundIntersection(otherValue);
          if (sub.getAllKeys().length > 0) result[key] = sub;
        } else if (thisValue.equals(otherValue)) {
          result[key] = thisValue;
        }
      }
      return new _CompoundTag(result);
    }
    compoundMinus(other) {
      const result = {};
      for (const key of this.getAllKeys()) {
        const thisValue = this.get(key);
        const otherValue = other.get(key);
        if (thisValue instanceof _CompoundTag && otherValue instanceof _CompoundTag) {
          const sub = thisValue.compoundMinus(otherValue);
          if (sub.getAllKeys().length > 0) result[key] = sub;
        } else if (!thisValue.equals(otherValue)) {
          result[key] = thisValue;
        }
      }
      return new _CompoundTag(result);
    }
    equals(tag) {
      if (tag.getType() != Tag.TAG_COMPOUND) return false;
      let compoundTag = tag;
      for (const key of Object.values(
        /* @__PURE__ */ new Set([...this.getAllKeys(), ...compoundTag.getAllKeys()])
      )) {
        if (this.get(key) !== compoundTag.get(key)) return false;
      }
      return true;
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
      return "StringTag";
    }
    equals(other) {
      if (other.getType() != Tag.TAG_STRING) return false;
      return this.data == other.valueOf();
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
        return false;
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
      return this.match([nbts[0]]).getMatches().filter(
        (tag) => tag.getType() != Tag.TAG_BYTE || parseInt(tag.valueOf().toDecimal()) == 1
      ).length != 0;
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
    constructor() {
    }
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
      static INSTANCE = new _NbtPathExpressionParseHandlerAllChildren.Expression();
      matchContexts(executionContexts) {
        return new NbtPathExpressionMatches(
          executionContexts.flatMap((executionContext) => {
            let nbt = executionContext.getCurrentTag();
            if (nbt.getType() === Tag.TAG_LIST) {
              let tag = nbt;
              return tag.getArray().map(
                (subTag) => new NbtPathExpressionExecutionContext(
                  subTag,
                  executionContext
                )
              );
            } else if (nbt.getType() === Tag.TAG_COMPOUND) {
              let tag = nbt;
              return tag.getAllKeys().map(
                (key) => new NbtPathExpressionExecutionContext(
                  tag.get(key),
                  executionContext
                )
              );
            }
            return null;
          }).filter((e) => !(e === null))
        );
      }
      asNavigation(child) {
        return child == child ? new NbtPathNavigationLinkWildcard(child) : NbtPathNavigationLeafWildcard.INSTANCE;
      }
    };
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerBooleanRelationalAdapter.ts
  init_Integer();
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
                  ) ? 1 : 0
                )
              ),
              executionContext
            );
          }
          return new NbtPathExpressionExecutionContext(
            ByteTag.valueOf(new Integer(0)),
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
      if (nbtPathExpression.charAt(pos) != "." || nbtPathExpression.length <= pos + 1) {
        return HandleResult.INVALID;
      }
      const region = nbtPathExpression.slice(pos + 1);
      const match = region.match(this.REGEX_CHILDNAME);
      if (!match) {
        return HandleResult.INVALID;
      }
      let childName = match[0];
      return new HandleResult(new Expression2(childName), 1 + childName.length);
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
        executionContexts.map((executionContext) => {
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
        }).filter((e) => e != null)
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
      static FAIL = new StringParseResult(
        false,
        0,
        ""
      );
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
      let resultBuilder = "";
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
                resultBuilder + escapeName;
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
            resultBuilder + character;
        }
      }
    }
  };

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerChildBrackets.ts
  var NbtPathExpressionParseHandlerChildBrackets = class {
    handlePrefixOf(nbtPathExpression, pos) {
      if (pos >= nbtPathExpression.length || nbtPathExpression.charAt(pos) != "[") {
        return HandleResult.INVALID;
      }
      let parseResult = NbtPathStringParser.parse(nbtPathExpression, pos + 1);
      if (!parseResult.isSuccess()) {
        return HandleResult.INVALID;
      }
      let closingBracketIndex = pos + parseResult.getConsumed() + 1;
      if (closingBracketIndex >= nbtPathExpression.length || nbtPathExpression.charAt(closingBracketIndex) != "]") {
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
        executionContexts.map((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_LIST) {
            let tag = nbt;
            let newTagList = new ListTag([]);
            tag.getArray().filter((subTag) => this.getExpression().test(subTag)).forEach((subTag) => newTagList.add(subTag));
            return new NbtPathExpressionExecutionContext(
              newTagList,
              executionContext
            );
          } else if (nbt.getType() == Tag.TAG_COMPOUND) {
            let tag = nbt;
            let newTagList = new ListTag([]);
            Array.from(tag.getAllKeys()).map((key) => tag.get(key)).filter((subTag) => this.getExpression().test(subTag)).forEach((subTag) => newTagList.add(subTag));
            return new NbtPathExpressionExecutionContext(
              newTagList,
              executionContext
            );
          }
          return null;
        }).filter((e) => e != null)
      );
    }
  };
  NbtPathExpressionParseHandlerFilterExpression.Expression = Expression4;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerLength.ts
  init_Integer();
  var NbtPathExpressionParseHandlerLength = class {
    handlePrefixOf(nbtPathExpression, pos) {
      if (nbtPathExpression.substring(
        pos,
        Math.min(pos + 7, nbtPathExpression.length)
      ) != ".length") {
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
        executionContexts.map((executionContext) => {
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
              IntTag.valueOf(new Integer(tag.getAllKeys().length)),
              executionContext
            );
          }
          return null;
        }).filter((e) => e != null)
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
      return this.childIndex;
    }
    matchContexts(executionContexts) {
      return new NbtPathExpressionMatches(
        executionContexts.map((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_LIST) {
            let tag = nbt;
            if (this.childIndex < tag.size()) {
              let childTag = tag.get(this.getChildIndex());
              return new NbtPathExpressionExecutionContext(
                childTag,
                executionContext
              );
            }
          }
          return null;
        }).filter((e) => e != null)
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
        new _NbtPathExpressionParseHandlerListSlice.Expression(start, end, step),
        3 + startString.length + endString.length + (stepString == null ? 0 : 1 + stepString.length)
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
        executionContexts.flatMap((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (nbt.getType() == Tag.TAG_LIST) {
            let tag = nbt;
            let start = this.getStart();
            let actualEnd = this.getEnd() > -1 ? Math.min(tag.size() - 1, this.getEnd()) : tag.size() - 1;
            let step = this.getStep();
            return NbtPathExpressionParseHandlerListSlice.newStartEndStepStream(
              start,
              actualEnd,
              step
            ).map(
              (i) => new NbtPathExpressionExecutionContext(
                tag.get(i),
                executionContext
              )
            );
          }
          return null;
        }).filter((e) => e != null)
      );
    }
  };
  NbtPathExpressionParseHandlerListSlice.Expression = Expression7;

  // TSFiles/IntegratedDynamicsClasses/NBTFunctions/parse/NbtPathExpressionParseHandlerParent.ts
  var NbtPathExpressionParseHandlerParent = class _NbtPathExpressionParseHandlerParent {
    handlePrefixOf(nbtPathExpression, pos) {
      if (nbtPathExpression.length <= pos + 1 || nbtPathExpression.charAt(pos) != "." || nbtPathExpression.charAt(pos + 1) != ".") {
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
        executionContexts.map((e) => e.getParentContext()).filter((e) => e != null)
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
  init_Integer();
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
      if (nbtPathExpression.charAt(currentPos) != "=" || nbtPathExpression.charAt(currentPos + 1) != "=") {
        return HandleResult.INVALID;
      }
      currentPos = _NbtPathExpressionParseHandlerStringEqual.skipSpaces(
        nbtPathExpression,
        currentPos + 2
      );
      let parseResult = NbtPathStringParser.parse(nbtPathExpression, currentPos);
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
                new Integer(+(this.getTargetString() == tag.valueOf()))
              ),
              executionContext
            );
          }
          return new NbtPathExpressionExecutionContext(
            ByteTag.valueOf(new Integer(0)),
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
          childNames.push(match2);
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
        executionContexts.flatMap((executionContext) => {
          let nbt = executionContext.getCurrentTag();
          if (!(this.getChildIndexes().length == 0) && nbt.getType() == Tag.TAG_LIST) {
            let tag = nbt;
            return this.getChildIndexes().map((i) => tag.get(i)).filter((subTag) => subTag.getId() != 0).map(
              (subTag) => new NbtPathExpressionExecutionContext(
                subTag,
                executionContext
              )
            );
          } else if (!(this.getChildNames().length == 0) && nbt.getType() == Tag.TAG_COMPOUND) {
            let tag = nbt;
            return this.getChildNames().map((e) => tag.get(e)).filter((e) => e != null).map(
              (subTag) => new NbtPathExpressionExecutionContext(
                subTag,
                executionContext
              )
            );
          }
          return null;
        }).filter((e) => e != null)
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
      new NbtPathExpressionParseHandlerFilterExpression()
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

  // TSFiles/HelperClasses/operatorRegistry.ts
  init_Operator();

  // TSFiles/HelperClasses/ParsedSignature.ts
  init_TypeMap();
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
            to: normalize(node2.to)
          };
        }
        if (node2.type === "List") {
          return {
            type: "List",
            listType: normalize(node2.listType)
          };
        }
        if (node2.type === "Any") {
          baseIDs.add(node2.typeID);
          return {
            type: "Any",
            typeID: node2.typeID + toAdd
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
            listType: renameNode(node.listType)
          });
        }
        if (node.type === "Any") {
          const key = node.typeID;
          if (mapping[key]) {
            return {
              type: mapping[key]
            };
          } else return node;
        }
        if (node.type === "Function") {
          return {
            ...node,
            from: renameNode(node.from),
            to: renameNode(node.to)
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
        to: other.getOutput()
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
          to: c
        }
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

  // TSFiles/HelperClasses/operatorRegistry.ts
  var OperatorRegistry = class {
    data;
    constructor() {
      this.data = {};
    }
    register(k, {
      internalName,
      nicknames,
      symbol,
      parsedSignature,
      interactName,
      function: Function2,
      serializer
    }, globalMap2) {
      let data = {
        internalName,
        nicknames,
        symbol,
        interactName,
        function: Function2,
        serializer
      };
      data["parsedSignature"] = new ParsedSignature(parsedSignature, globalMap2);
      this.data[k] = new Operator(data);
    }
    find(fn) {
      for (const [_, o] of Object.entries(this.data)) {
        if (fn(o)) return o;
      }
      throw new Error("Unknown Operator");
    }
  };

  // TSFiles/operatorRegistry.ts
  var globalMap = new TypeMap();
  var operatorRegistryRawData = {
    and: {
      internalName: "integrateddynamics:logical_and",
      nicknames: ["logicalAnd"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Boolean"
        },
        to: {
          type: "Function",
          from: {
            type: "Boolean"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "&&",
      interactName: "booleanAnd",
      function: (bool1) => {
        return (bool2) => {
          return bool1 && bool2;
        };
      }
    },
    or: {
      internalName: "integrateddynamics:logical_or",
      nicknames: ["logicalOr"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Boolean"
        },
        to: {
          type: "Function",
          from: {
            type: "Boolean"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "||",
      interactName: "booleanOr",
      function: (bool1) => {
        return (bool2) => {
          return bool1 || bool2;
        };
      }
    },
    not: {
      internalName: "integrateddynamics:logical_not",
      nicknames: ["logicalNot"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Boolean"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "!",
      interactName: "booleanNot",
      function: (bool) => {
        return !bool;
      }
    },
    nand: {
      internalName: "integrateddynamics:logical_nand",
      nicknames: ["logicalNand"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Boolean"
        },
        to: {
          type: "Function",
          from: {
            type: "Boolean"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "!&&",
      interactName: "booleanNand",
      function: (func1) => {
        return (func2) => {
          return (input) => {
            return !(func1(input) && func2(input));
          };
        };
      }
    },
    nor: {
      internalName: "integrateddynamics:logical_nor",
      nicknames: ["logicalNor"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Boolean"
        },
        to: {
          type: "Function",
          from: {
            type: "Boolean"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "!||",
      interactName: "booleanNor",
      function: (func1) => {
        return (func2) => {
          return (input) => {
            return !(func1(input) || func2(input));
          };
        };
      }
    },
    add: {
      internalName: "integrateddynamics:arithmetic_addition",
      nicknames: ["arithmeticAddition"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Number"
          }
        }
      },
      symbol: "+",
      interactName: "numberAdd",
      function: async (num1) => {
        return async (num2) => {
          return JavaMath.add(num1, num2);
        };
      }
    },
    subtract: {
      internalName: "integrateddynamics:arithmetic_subtraction",
      nicknames: ["arithmeticSubtraction"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Number"
          }
        }
      },
      symbol: "-",
      interactName: "numberSubtract",
      function: (num1) => {
        return (num2) => {
          return JavaMath.subtract(num1, num2);
        };
      }
    },
    multiply: {
      internalName: "integrateddynamics:arithmetic_multiplication",
      nicknames: ["arithmeticMultiplication"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Number"
          }
        }
      },
      symbol: "*",
      interactName: "numberMultiply",
      function: (num1) => {
        return (num2) => {
          return JavaMath.multiply(num1, num2);
        };
      }
    },
    divide: {
      internalName: "integrateddynamics:arithmetic_division",
      nicknames: ["arithmeticDivision"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Number"
          }
        }
      },
      symbol: "/",
      interactName: "numberDivide",
      function: (num1) => {
        return (num2) => {
          return JavaMath.divide(num1, num2);
        };
      }
    },
    max: {
      internalName: "integrateddynamics:arithmetic_maximum",
      nicknames: ["arithmeticMaximum"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Number"
          }
        }
      },
      symbol: "max",
      interactName: "numberMax",
      function: (num1) => {
        return (num2) => {
          return JavaMath.max(num1, num2);
        };
      }
    },
    min: {
      internalName: "integrateddynamics:arithmetic_minimum",
      nicknames: ["arithmeticMinimum"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Number"
          }
        }
      },
      symbol: "min",
      interactName: "numberMin",
      function: (num1) => {
        return (num2) => {
          return JavaMath.min(num1, num2);
        };
      }
    },
    increment: {
      internalName: "integrateddynamics:arithmetic_increment",
      nicknames: ["arithmeticIncrement"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Number"
        }
      },
      symbol: "++",
      interactName: "numberIncrement",
      function: async (num1) => {
        return JavaMath.add(num1, new Integer(1));
      }
    },
    decrement: {
      internalName: "integrateddynamics:arithmetic_decrement",
      nicknames: ["arithmeticDecrement"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Number"
        }
      },
      symbol: "--",
      interactName: "numberDecrement",
      function: async (num1) => {
        return JavaMath.subtract(num1, new Integer(1));
      }
    },
    modulus: {
      internalName: "integrateddynamics:arithmetic_modulus",
      nicknames: ["arithmeticModulus"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Number"
          }
        }
      },
      symbol: "%",
      interactName: "numberModulus",
      function: (num1) => {
        return (num2) => {
          return JavaMath.mod(num1, num2);
        };
      }
    },
    doubleSqrt: {
      internalName: "integrateddynamics:double_sqrt",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Double"
        },
        to: {
          type: "Double"
        }
      },
      symbol: "sqrt",
      interactName: "doubleSqrt",
      function: (double) => {
        return double.sqrt();
      }
    },
    doublePow: {
      internalName: "integrateddynamics:double_pow",
      nicknames: ["doublePow"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Double"
        },
        to: {
          type: "Function",
          from: {
            type: "Double"
          },
          to: {
            type: "Double"
          }
        }
      },
      symbol: "pow",
      interactName: "doublePow",
      function: (base) => {
        return (exponent) => {
          return base.pow(exponent);
        };
      }
    },
    "==": {
      internalName: "integrateddynamics:relational_equals",
      nicknames: ["relationalEquals"],
      parsedSignature: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "==",
      interactName: "anyEquals",
      function: (value1) => {
        return (value2) => {
          try {
            return value1.equals(value2);
          } catch (e) {
            return value1 === value2;
          }
        };
      }
    },
    ">": {
      internalName: "integrateddynamics:relational_gt",
      nicknames: ["relationalGt"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: ">",
      interactName: "numberGreaterThan",
      function: (num1) => {
        return (num2) => {
          return JavaMath.gt(num1, num2);
        };
      }
    },
    "<": {
      internalName: "integrateddynamics:relational_lt",
      nicknames: ["relationalLt"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "<",
      interactName: "numberLessThan",
      function: (num1) => {
        return (num2) => {
          return JavaMath.lt(num1, num2);
        };
      }
    },
    "!=": {
      internalName: "integrateddynamics:relational_notequals",
      nicknames: ["relationalNotequals"],
      parsedSignature: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "!=",
      interactName: "anyNotEquals",
      function: (value1) => {
        return (value2) => {
          try {
            return !value1.equals(value2);
          } catch (e) {
            return value1 !== value2;
          }
        };
      }
    },
    ">=": {
      internalName: "integrateddynamics:relational_ge",
      nicknames: ["relationalGe"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: ">=",
      interactName: "anyGreaterThanOrEquals",
      function: (num1) => {
        return (num2) => {
          return JavaMath.gte(num1, num2);
        };
      }
    },
    "<=": {
      internalName: "integrateddynamics:relational_le",
      nicknames: ["relationalLe"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Function",
          from: {
            type: "Number"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "<=",
      interactName: "anyLessThanOrEquals",
      function: (num1) => {
        return (num2) => {
          return JavaMath.lte(num1, num2);
        };
      }
    },
    binaryAnd: {
      internalName: "integrateddynamics:binary_and",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "&",
      interactName: "integerBinaryAnd",
      function: (int1) => {
        return (int2) => {
          return int1.binaryAnd(int2);
        };
      }
    },
    binaryOr: {
      internalName: "integrateddynamics:binary_or",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "|",
      interactName: "integerBinaryOr",
      function: (int1) => {
        return (int2) => {
          return int1.binaryOr(int2);
        };
      }
    },
    binaryXor: {
      internalName: "integrateddynamics:binary_xor",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "^",
      interactName: "integerXor",
      function: (int1) => {
        return (int2) => {
          return int1.binaryXor(int2);
        };
      }
    },
    binaryComplement: {
      internalName: "integrateddynamics:binary_complement",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "~",
      interactName: "integerComplement",
      function: (int) => {
        return int.binaryComplement();
      }
    },
    "<<": {
      internalName: "integrateddynamics:binary_lshift",
      nicknames: ["binaryLshift"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "<<",
      interactName: "integerLeftShift",
      function: (int1) => {
        return (int2) => {
          return int1.leftShift(int2);
        };
      }
    },
    ">>": {
      internalName: "integrateddynamics:binary_rshift",
      nicknames: ["binaryRshift"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: ">>",
      interactName: "integerRightShift",
      function: (int1) => {
        return (int2) => {
          return int1.rightShift(int2);
        };
      }
    },
    ">>>": {
      internalName: "integrateddynamics:binary_rzshift",
      nicknames: ["binaryRzshift"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: ">>>",
      interactName: "integerUnsignedRightShift",
      function: (int1) => {
        return (int2) => {
          return new Integer(int1.unsignedRightShift(int2));
        };
      }
    },
    stringLength: {
      internalName: "integrateddynamics:string_length",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "len",
      interactName: "stringLength",
      function: (str) => {
        return new Integer(str.length);
      }
    },
    stringConcat: {
      internalName: "integrateddynamics:string_concat",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "String"
          }
        }
      },
      symbol: "+",
      interactName: "stringConcat",
      function: (str1) => {
        return (str2) => {
          return str1.concat(str2);
        };
      }
    },
    stringContains: {
      internalName: "integrateddynamics:string_contains",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "contains",
      interactName: "stringContains",
      function: (substring) => {
        return (fullString) => {
          return fullString.includes(substring);
        };
      }
    },
    containsRegex: {
      internalName: "integrateddynamics:string_contains_regex",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "contains_regex",
      interactName: "stringContainsRegex",
      function: (regexString) => {
        return (fullString) => {
          const regex = new import_re2_wasm.RE2(regexString, "u");
          return regex.test(fullString);
        };
      }
    },
    matchesRegex: {
      internalName: "integrateddynamics:string_matches_regex",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "matches_regex",
      interactName: "stringMatchesRegex",
      function: (regexString) => {
        return (fullString) => {
          if (regexString.startsWith("^")) regexString = regexString.slice(1);
          if (regexString.endsWith("$")) regexString = regexString.slice(0, -1);
          const regex = new import_re2_wasm.RE2(`^(?:${regexString})$`, "u");
          return regex.test(fullString);
        };
      }
    },
    stringIndexOf: {
      internalName: "integrateddynamics:string_index_of",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "index_of",
      interactName: "stringIndexOf",
      function: (substring) => {
        return (fullString) => {
          return new Integer(fullString.indexOf(substring));
        };
      }
    },
    indexOfRegex: {
      internalName: "integrateddynamics:string_index_of_regex",
      nicknames: ["stringIndexOfRegex"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "index_of_regex",
      interactName: "stringIndexOfRegex",
      function: (regexString) => {
        return (fullString) => {
          const regex = new import_re2_wasm.RE2(regexString, "u");
          return new Integer(fullString.search(regex));
        };
      }
    },
    startsWith: {
      internalName: "integrateddynamics:string_starts_with",
      nicknames: ["stringStartsWith"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "starts_with",
      interactName: "stringStartsWith",
      function: (substring) => {
        return (fullString) => {
          return fullString.startsWith(substring);
        };
      }
    },
    endsWith: {
      internalName: "integrateddynamics:string_ends_with",
      nicknames: ["stringEndsWith"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "ends_with",
      interactName: "stringEndsWith",
      function: (substring) => {
        return (fullString) => {
          return fullString.endsWith(substring);
        };
      }
    },
    stringSplitOn: {
      internalName: "integrateddynamics:string_split_on",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: { type: "List", listType: { type: "String" } }
        }
      },
      symbol: "split_on",
      interactName: "stringSplitOn",
      function: (delimiter) => {
        return (fullString) => {
          return fullString.split(delimiter);
        };
      }
    },
    stringSplitOnRegex: {
      internalName: "integrateddynamics:string_split_on_regex",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: { type: "List", listType: { type: "String" } }
        }
      },
      symbol: "split_on_regex",
      interactName: "stringSplitOnRegex",
      function: (regexString) => {
        return (fullString) => {
          const regex = new import_re2_wasm.RE2(regexString, "u");
          return regex.split(fullString);
        };
      }
    },
    substring: {
      internalName: "integrateddynamics:string_substring",
      nicknames: ["stringSubstring"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Function",
            from: {
              type: "String"
            },
            to: {
              type: "String"
            }
          }
        }
      },
      symbol: "substring",
      interactName: "integerSubstring",
      function: (start) => {
        return (end) => {
          return (fullString) => {
            return fullString.substring(
              parseInt(start.toDecimal()),
              parseInt(end.toDecimal())
            );
          };
        };
      }
    },
    stringRegexGroup: {
      internalName: "integrateddynamics:string_regex_group",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Function",
            from: {
              type: "String"
            },
            to: {
              type: "String"
            }
          }
        }
      },
      symbol: "regex_group",
      interactName: "stringRegexGroup",
      function: (regexString) => {
        return (groupIndex) => {
          return (fullString) => {
            const regex = new import_re2_wasm.RE2(regexString, "u");
            const match = regex.exec(fullString);
            if (match && match[parseInt(groupIndex.toDecimal())] !== void 0) {
              return match[parseInt(groupIndex.toDecimal())];
            } else {
              throw new Error(
                `No match found for group index ${groupIndex.toDecimal()} in regex "${regexString}" on string "${fullString}"`
              );
            }
          };
        };
      }
    },
    stringRegexGroups: {
      internalName: "integrateddynamics:string_regex_groups",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: { type: "List", listType: { type: "String" } }
        }
      },
      symbol: "regex_groups",
      interactName: "stringRegexGroups",
      function: (regexString) => {
        return (fullString) => {
          const regex = new import_re2_wasm.RE2(regexString, "u");
          const match = regex.exec(fullString);
          if (match) {
            return match;
          } else {
            throw new Error(
              `No match found for group in regex "${regexString}" on string "${fullString}"`
            );
          }
        };
      }
    },
    stringRegexScan: {
      internalName: "integrateddynamics:string_regex_scan",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Function",
            from: {
              type: "String"
            },
            to: { type: "List", listType: { type: "String" } }
          }
        }
      },
      symbol: "regex_scan",
      interactName: "stringRegexScan",
      function: (regexString) => {
        return (groupIndex) => {
          return (fullString) => {
            const regex = new import_re2_wasm.RE2(regexString, "gu");
            let results = [];
            let match;
            regex.lastIndex = 0;
            while ((match = regex.exec(fullString)) !== null) {
              const groupValue = match[parseInt(groupIndex.toDecimal())];
              if (groupValue !== void 0 && groupValue !== null) {
                results.push(groupValue);
              }
            }
            return results;
          };
        };
      }
    },
    stringReplace: {
      internalName: "integrateddynamics:string_replace",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "String"
            },
            to: {
              type: "String"
            }
          }
        }
      },
      symbol: "replace",
      interactName: "stringReplace",
      function: (searchString) => {
        return (replacementString) => {
          return (fullString) => {
            return fullString.replace(searchString, replacementString);
          };
        };
      }
    },
    stringReplaceRegex: {
      internalName: "integrateddynamics:string_replace_regex",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "String"
            },
            to: {
              type: "String"
            }
          }
        }
      },
      symbol: "replace_regex",
      interactName: "stringReplaceRegex",
      function: (regexString) => {
        return (replacementString) => {
          return (fullString) => {
            const regex = new import_re2_wasm.RE2(regexString, "u");
            return fullString.replace(regex, replacementString);
          };
        };
      }
    },
    stringJoin: {
      internalName: "integrateddynamics:string_join",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "String" } },
          to: {
            type: "String"
          }
        }
      },
      symbol: "join",
      interactName: "stringJoin",
      function: (delimiter) => {
        return (stringList) => {
          if (stringList.some((item) => typeof item !== "string")) {
            throw new Error("stringJoin expects a list of strings");
          }
          return stringList.join(delimiter);
        };
      }
    },
    name: {
      internalName: "integrateddynamics:string_name",
      nicknames: ["namedName", "toString"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Named"
        },
        to: {
          type: "String"
        }
      },
      symbol: "name",
      interactName: "namedName",
      function: (named) => {
        return named.toString();
      }
    },
    uname: {
      internalName: "integrateddynamics:string_unique_name",
      nicknames: ["uniquelynamedUniquename"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "UniquelyNamed"
        },
        to: {
          type: "String"
        }
      },
      symbol: "uname",
      interactName: "uniquely_namedUniqueName",
      function: (uniquelyNamed) => {
        return uniquelyNamed.getUniqueName();
      }
    },
    error: {
      internalName: "integrateddynamics:string_string_error",
      nicknames: ["string_error"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: { type: "Any", typeID: 1 }
      },
      symbol: "error",
      interactName: "stringStringError",
      function: (message) => {
        throw new Error(`Error: ${message}`);
      }
    },
    round: {
      internalName: "integrateddynamics:number_round",
      nicknames: ["numberRound"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "|| ||",
      interactName: "numberRound",
      function: (number) => {
        return number.round();
      }
    },
    ceil: {
      internalName: "integrateddynamics:number_ceil",
      nicknames: ["numberCeil"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "\u2308 \u2309",
      interactName: "numberCeil",
      function: (number) => {
        return number.ceil();
      }
    },
    floor: {
      internalName: "integrateddynamics:number_floor",
      nicknames: ["numberFloor"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "\u230A \u230B",
      interactName: "numberFloor",
      function: (number) => {
        return number.floor();
      }
    },
    compact: {
      internalName: "integrateddynamics:number_compact",
      nicknames: ["numberCompact"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Number"
        },
        to: {
          type: "String"
        }
      },
      symbol: "compact",
      interactName: "numberCompact",
      function: (number) => {
        return number.toDecimal().toString();
      }
    },
    isNull: {
      internalName: "integrateddynamics:general_isnull",
      nicknames: ["nullableIsnull"],
      parsedSignature: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Boolean"
        }
      },
      symbol: "o",
      interactName: "anyIsNull",
      function: (value) => {
        return value === null || value === void 0;
      }
    },
    isNotNull: {
      internalName: "integrateddynamics:general_isnotnull",
      nicknames: ["nullableIsnotnull"],
      parsedSignature: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Boolean"
        }
      },
      symbol: "\u2205",
      interactName: "anyIsNotNull",
      function: (value) => {
        return value !== null && value !== void 0;
      }
    },
    listLength: {
      internalName: "integrateddynamics:list_length",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Integer"
        }
      },
      symbol: "| |",
      interactName: "listLength",
      function: (list) => {
        return list.length;
      }
    },
    listEmpty: {
      internalName: "integrateddynamics:list_empty",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Boolean"
        }
      },
      symbol: "\u2205",
      interactName: "listIsEmpty",
      function: (list) => {
        return list.length === 0;
      }
    },
    listNotEmpty: {
      internalName: "integrateddynamics:list_notempty",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Boolean"
        }
      },
      symbol: "o",
      interactName: "listIsNotEmpty",
      function: (list) => {
        return list.length > 0;
      }
    },
    get: {
      internalName: "integrateddynamics:list_get",
      nicknames: ["listElement"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: { type: "Any", typeID: 1 }
        }
      },
      symbol: "get",
      interactName: "listGet",
      function: (index) => {
        return async (list) => {
          if (await index.lt(new Integer(0)) || await index.lte(new Integer(list.length))) {
            throw new Error(
              `Index ${index} out of bounds for list of length ${list.length}`
            );
          }
          return list[parseInt(index.toDecimal())];
        };
      }
    },
    getOrDefault: {
      internalName: "integrateddynamics:list_get_or_default",
      nicknames: ["listElementDefault", "get_or_default"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 1 }
          }
        }
      },
      symbol: "get_or_default",
      interactName: "listGetOrDefault",
      function: async (list) => {
        return async (index) => {
          return async (defaultValue) => {
            if (await JavaMath.lt(index, new Integer(0)) || await JavaMath.gte(index, new Integer(list.length))) {
              return defaultValue;
            }
            return list[parseInt(index.toDecimal())];
          };
        };
      }
    },
    listContains: {
      internalName: "integrateddynamics:list_contains",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "contains",
      interactName: "listContains",
      function: (list) => {
        return (element) => {
          return list.includes(element);
        };
      }
    },
    listContainsPredicate: {
      internalName: "integrateddynamics:list_contains_p",
      nicknames: ["listContainsP"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean"
            }
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "contains_p",
      interactName: "listContainsPredicate",
      function: (predicate) => {
        return (list) => {
          return list.some((item) => predicate.apply(item));
        };
      }
    },
    listCount: {
      internalName: "integrateddynamics:list_count",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "count",
      interactName: "listCount",
      function: (list) => {
        return (element) => {
          return new Integer(list.filter((item) => item === element).length);
        };
      }
    },
    listCountPredicate: {
      internalName: "integrateddynamics:list_count_p",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean"
            }
          },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "count_p",
      interactName: "listCountPredicate",
      function: (list) => {
        return (predicate) => {
          return new Integer(list.filter((item) => predicate.apply(item)).length);
        };
      }
    },
    append: {
      internalName: "integrateddynamics:list_append",
      nicknames: ["listAppend"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "List", listType: { type: "Any", typeID: 1 } }
        }
      },
      symbol: "append",
      interactName: "listAppend",
      function: (list) => {
        return (element) => {
          return [...list, element];
        };
      }
    },
    listConcat: {
      internalName: "integrateddynamics:list_concat",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } }
        }
      },
      symbol: "concat",
      interactName: "listConcat",
      function: (list1) => {
        return (list2) => {
          return [...list1, ...list2];
        };
      }
    },
    lazybuilt: {
      internalName: "integrateddynamics:list_lazybuilt",
      nicknames: ["listLazybuilt"],
      parsedSignature: {
        type: "Function",
        from: { type: "Any", typeID: 1 },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "List",
                listType: { type: "Any", typeID: 1 }
              }
            }
          },
          to: { type: "List", listType: { type: "Any", typeID: 1 } }
        }
      },
      symbol: "lazybuilt",
      interactName: "anyLazyBuilt",
      function: (initial) => {
        return (builder) => {
          return new InfiniteList(initial, builder);
        };
      }
    },
    head: {
      internalName: "integrateddynamics:list_head",
      nicknames: ["listHead"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: { type: "Any", typeID: 1 }
      },
      symbol: "head",
      interactName: "listHead",
      function: (list) => {
        if (list.length === 0) {
          throw new Error("head called on an empty list");
        }
        return list[0];
      }
    },
    tail: {
      internalName: "integrateddynamics:list_tail",
      nicknames: ["listTail"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: { type: "List", listType: { type: "Any", typeID: 1 } }
      },
      symbol: "tail",
      interactName: "listTail",
      function: (list) => {
        if (list.length === 0) {
          throw new Error("tail called on an empty list");
        }
        return list.slice(1);
      }
    },
    listUniqPredicate: {
      internalName: "integrateddynamics:list_uniq_p",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: {
                type: "Boolean"
              }
            }
          },
          to: { type: "List", listType: { type: "Any", typeID: 1 } }
        }
      },
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
      }
    },
    listUniq: {
      internalName: "integrateddynamics:list_uniq",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: { type: "List", listType: { type: "Any", typeID: 1 } }
      },
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
      }
    },
    slice: {
      internalName: "integrateddynamics:list_slice",
      nicknames: ["listSlice"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Function",
            from: {
              type: "Integer"
            },
            to: { type: "List", listType: { type: "Any", typeID: 1 } }
          }
        }
      },
      symbol: "slice",
      interactName: "listSlice",
      function: async (list) => {
        return async (start) => {
          return async (end) => {
            if (await JavaMath.lt(start, new Integer(0)) || await JavaMath.gt(end, new Integer(list.length)) || await JavaMath.gt(start, end)) {
              throw new Error(
                `Invalid slice range: [${start.toDecimal()}, ${end.toDecimal()}) for list of length ${list.length}`
              );
            }
            return list.slice(
              parseInt(start.toDecimal()),
              parseInt(end.toDecimal())
            );
          };
        };
      }
    },
    intersection: {
      internalName: "integrateddynamics:list_intersection",
      nicknames: ["listIntersection"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "List", listType: { type: "Any", typeID: 1 } }
        }
      },
      symbol: "\u2229",
      interactName: "listIntersection",
      function: (list1) => {
        return (list2) => {
          const set1 = new Set(list1);
          return list2.filter((item) => set1.has(item));
        };
      }
    },
    equalsSet: {
      internalName: "integrateddynamics:list_equals_set",
      nicknames: ["listEqualsSet"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "=set=",
      interactName: "listEquals_set",
      function: (list1) => {
        return (list2) => {
          const set1 = new Set(list1);
          const set2 = new Set(list2);
          if (set1.size !== set2.size || set1.size !== (/* @__PURE__ */ new Set([...set1, ...set2])).size)
            return false;
          return true;
        };
      }
    },
    equalsMultiset: {
      internalName: "integrateddynamics:list_equals_multiset",
      nicknames: ["listEqualsMultiset"],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Any", typeID: 1 } },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "=multiset=",
      interactName: "listEquals_multiset",
      function: (list1) => {
        return (list2) => {
          const newList1 = [...list1].sort();
          const newList2 = [...list2].sort();
          if (newList1.length !== newList2.length) {
            return false;
          }
          for (let i = 0; i < newList1.length; i++) {
            if (!newList1[i] || !newList2[i]) {
              return false;
            } else if ("equals" in newList1[i] && typeof newList1[i].equals === "function") {
              if (!newList1[i].equals(newList2[i])) {
                return false;
              }
            } else if (newList1[i] !== newList2[i]) {
              return false;
            }
          }
          return true;
        };
      }
    },
    opaque: {
      internalName: "integrateddynamics:block_opaque",
      nicknames: ["BlockOpaque"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "opaque",
      interactName: "blockIsOpaque",
      function: (block) => {
        return block.isOpaque();
      }
    },
    blockItem: {
      internalName: "integrateddynamics:block_itemstack",
      nicknames: [
        "BlockItemstack",
        "block_item",
        "blockItemstack",
        "block_itemstack"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "Item"
        }
      },
      symbol: "itemstack",
      interactName: "blockItemStack",
      function: (block) => {
        return block.getItem();
      }
    },
    blockMod: {
      internalName: "integrateddynamics:block_mod",
      nicknames: ["BlockModname", "block_mod", "blockMod", "block_modname"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "String"
        }
      },
      symbol: "mod",
      interactName: "blockMod",
      function: (block) => {
        return block.getModName();
      }
    },
    breakSound: {
      internalName: "integrateddynamics:block_breaksound",
      nicknames: ["BlockBreaksound", "block_break_sound", "blockBreakSound"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "String"
        }
      },
      symbol: "break_sound",
      interactName: "blockBreakSound",
      function: (block) => {
        return block.getBreakSound();
      }
    },
    placeSound: {
      internalName: "integrateddynamics:block_placesound",
      nicknames: ["BlockPlacesound", "blockPlaceSound", "block_place_sound"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "String"
        }
      },
      symbol: "place_sound",
      interactName: "blockPlaceSound",
      function: (block) => {
        return block.getPlaceSound();
      }
    },
    stepSound: {
      internalName: "integrateddynamics:block_stepsound",
      nicknames: ["BlockStepsound", "blockStepSound", "block_step_sound"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "String"
        }
      },
      symbol: "step_sound",
      interactName: "blockStepSound",
      function: (block) => {
        return block.getStepSound();
      }
    },
    blockIsShearable: {
      internalName: "integrateddynamics:block_isshearable",
      nicknames: ["BlockIsshearable", "block_is_shearable", "blockIsShearable"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_shearable",
      interactName: "blockIsShearable",
      function: (block) => {
        return block.isShearable();
      }
    },
    plantAge: {
      internalName: "integrateddynamics:block_plantage",
      nicknames: ["BlockPlantage", "block_plant_age", "blockPlantAge"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "plant_age",
      interactName: "blockPlantAge",
      function: (block) => {
        return block.getPlantAge();
      }
    },
    blockByName: {
      internalName: "integrateddynamics:block_blockbyname",
      nicknames: ["BlockByName", "block_by_name"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Block"
        }
      },
      symbol: "block_by_name",
      interactName: "stringBlockByName",
      function: () => {
        throw new Error(
          "Block by name is infeasible without a registry. This is a placeholder function."
        );
      }
    },
    blockProperties: {
      internalName: "integrateddynamics:block_blockproperties",
      nicknames: ["BlockProperties", "block_properties"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "block_props",
      interactName: "blockProperties",
      function: (block) => {
        return block.getProperties();
      }
    },
    blockWithProperties: {
      internalName: "integrateddynamics:block_blockfromproperties",
      nicknames: ["BlockWithProperties", "block_with_properties"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "Function",
          from: {
            type: "NBT"
          },
          to: {
            type: "Block"
          }
        }
      },
      symbol: "block_with_props",
      interactName: "blockWithProperties",
      function: (block) => {
        return (properties) => {
          return new Block(properties, block);
        };
      }
    },
    blockPossibleProperties: {
      internalName: "integrateddynamics:block_blockpossibleproperties",
      nicknames: ["BlockPossibleProperties", "block_possible_properties"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "block_all_props",
      interactName: "blockPossibleProperties",
      function: () => {
        throw new Error(
          "Block possible properties is infeasible without a registry. This is a placeholder function."
        );
      }
    },
    blockTag: {
      internalName: "integrateddynamics:block_tag",
      nicknames: ["BlockTag"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Block"
        },
        to: { type: "List", listType: { type: "String" } }
      },
      symbol: "block_tag_names",
      interactName: "blockTags",
      function: (block) => {
        return block.getTagNames();
      }
    },
    blockTagStacks: {
      internalName: "integrateddynamics:string_blocktag",
      nicknames: ["BlockTagStacks", "block_tag_stacks"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: { type: "List", listType: { type: "Block" } }
      },
      symbol: "block_tag_values",
      interactName: "stringBlocksByTag",
      function: () => {
        throw new Error(
          "Block tag values is infeasible without a registry. This is a placeholder function."
        );
      }
    },
    size: {
      internalName: "integrateddynamics:itemstack_size",
      nicknames: ["ItemstackSize", "itemstack_size", "itemstackSize"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "size",
      interactName: "itemstackSize",
      function: (item) => {
        return item.getSize();
      }
    },
    maxSize: {
      internalName: "integrateddynamics:itemstack_maxsize",
      nicknames: ["ItemstackMaxsize", "itemstack_max_size", "itemstackMaxSize"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "maxsize",
      interactName: "itemstackMaxSize",
      function: (item) => {
        return item.getMaxSize();
      }
    },
    isStackable: {
      internalName: "integrateddynamics:itemstack_stackable",
      nicknames: [
        "ItemstackIsstackable",
        "itemstack_is_stackable",
        "itemstackIsStackable"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "stackable",
      interactName: "itemstackIsStackable",
      function: (item) => {
        return item.isStackable();
      }
    },
    isDamageable: {
      internalName: "integrateddynamics:itemstack_damageable",
      nicknames: [
        "ItemstackIsdamageable",
        "itemstack_is_damageable",
        "itemstackIsDamageable"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "damageable",
      interactName: "itemstackIsDamageable",
      function: (item) => {
        return item.isDamageable();
      }
    },
    damage: {
      internalName: "integrateddynamics:itemstack_damage",
      nicknames: ["ItemstackDamage", "itemstack_damage", "itemstackDamage"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "damage",
      interactName: "itemstackDamage",
      function: (item) => {
        return item.getDamage();
      }
    },
    maxDamage: {
      internalName: "integrateddynamics:itemstack_maxdamage",
      nicknames: [
        "ItemstackMaxdamage",
        "itemstack_max_damage",
        "itemstackMaxDamage"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "max_damage",
      interactName: "itemstackMaxDamage",
      function: (item) => {
        return item.getMaxDamage();
      }
    },
    enchanted: {
      internalName: "integrateddynamics:itemstack_enchanted",
      nicknames: [
        "ItemstackIsenchanted",
        "itemstack_is_enchanted",
        "itemstackIsEnchanted",
        "isEnchanted"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "enchanted",
      interactName: "itemstackIsEnchanted",
      function: (item) => {
        return item.isEnchanted();
      }
    },
    enchantable: {
      internalName: "integrateddynamics:itemstack_enchantable",
      nicknames: [
        "ItemstackIsenchantable",
        "itemstack_is_enchantable",
        "itemstackIsEnchantable",
        "isEnchantable"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "enchantable",
      interactName: "itemstackIsEnchantable",
      function: (item) => {
        return item.isEnchantable();
      }
    },
    repairCost: {
      internalName: "integrateddynamics:itemstack_repaircost",
      nicknames: [
        "ItemstackRepaircost",
        "itemstack_repair_cost",
        "itemstackRepairCost"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "repair_cost",
      interactName: "itemstackRepairCost",
      function: (item) => {
        return item.getRepairCost();
      }
    },
    rarity: {
      internalName: "integrateddynamics:itemstack_rarity",
      nicknames: ["ItemstackRarity", "itemstack_rarity", "itemstackRarity"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "String"
        }
      },
      symbol: "rarity",
      interactName: "itemstackRarity",
      function: (item) => {
        return item.getRarity();
      }
    },
    strengthVsBlock: {
      internalName: "integrateddynamics:itemstack_strength",
      nicknames: [
        "ItemstackStrengthVsBlock",
        "itemstack_strength_vs_block",
        "itemstackStrengthVsBlock"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Function",
          from: {
            type: "Block"
          },
          to: {
            type: "Double"
          }
        }
      },
      symbol: "strength",
      interactName: "itemstackStrength",
      function: (item) => {
        return (block) => {
          return item.getStrengthVsBlock(block);
        };
      }
    },
    canHarvestBlock: {
      internalName: "integrateddynamics:itemstack_canharvest",
      nicknames: [
        "ItemstackCanHarvestBlock",
        "itemstack_can_harvest_block",
        "itemstackCanHarvestBlock"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Function",
          from: {
            type: "Block"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "can_harvest",
      interactName: "itemstackCanHarvest",
      function: (item) => {
        return () => {
          return item.canHarvestBlock();
        };
      }
    },
    itemBlock: {
      internalName: "integrateddynamics:itemstack_block",
      nicknames: ["ItemstackBlock", "itemstack_block", "itemstackBlock"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Block"
        }
      },
      symbol: "block",
      interactName: "itemstackBlock",
      function: (item) => {
        return new Block(new Properties({}), item.getBlock());
      }
    },
    isFluidstack: {
      internalName: "integrateddynamics:itemstack_isfluidstack",
      nicknames: [
        "ItemstackIsfluidstack",
        "itemstack_is_fluidstack",
        "itemstackIsFluidstack",
        "itemHasFluid"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_fluidstack",
      interactName: "itemstackIsFluidStack",
      function: (item) => {
        return item.getFluid() !== null;
      }
    },
    itemFluid: {
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
        "itemstackFluid"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Fluid"
        }
      },
      symbol: "fluidstack",
      interactName: "itemstackFluidStack",
      function: (item) => {
        return item.getFluid();
      }
    },
    fluidCapacity: {
      internalName: "integrateddynamics:itemstack_fluidstackcapacity",
      nicknames: [
        "ItemstackFluidstackcapacity",
        "itemstack_fluidstack_capacity",
        "itemstackFluidstackCapacity",
        "item_fluid_capacity",
        "itemFluidCapacity",
        "item_fluidstack_capacity",
        "itemFluidstackCapacity"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "fluidstack_capacity",
      interactName: "itemstackFluidCapacity",
      function: (item) => {
        return item.getFluidCapacity();
      }
    },
    "=NBT=": {
      internalName: "integrateddynamics:itemstack_isnbtequal",
      nicknames: [
        "ItemstackIsdataequal",
        "itemstack_is_dataequal",
        "itemstackIsDataequal"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Function",
          from: {
            type: "Item"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "=NBT=",
      interactName: "itemstackIsNbtEqual",
      function: (item1) => {
        return (item2) => {
          return item1.getNBT().equals(item2.getNBT());
        };
      }
    },
    "=NoNBT=": {
      internalName: "integrateddynamics:itemstack_isitemequalnonbt",
      nicknames: [
        "ItemstackIsitemequalnodata",
        "itemstack_is_itemequalnodata",
        "itemstackIsItemequalnodata"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Function",
          from: {
            type: "Item"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "=NoNBT=",
      interactName: "itemstackIsEqualNonNbt",
      function: (item1) => {
        return (item2) => {
          return item1.getUniqueName() === item2.getUniqueName() && item1.getSize() === item2.getSize();
        };
      }
    },
    rawItemEquals: {
      internalName: "integrateddynamics:itemstack_israwitemequal",
      nicknames: [
        "ItemstackIsrawitemequal",
        "itemstack_is_rawitemequal",
        "itemstackIsRawitemequal"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Function",
          from: {
            type: "Item"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "=Raw=",
      interactName: "itemstackIsEqualRaw",
      function: (item1) => {
        return (item2) => {
          return item1.getUniqueName() === item2.getUniqueName();
        };
      }
    },
    itemMod: {
      internalName: "integrateddynamics:itemstack_mod",
      nicknames: ["ItemstackModname", "item_mod", "itemModname"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "String"
        }
      },
      symbol: "mod",
      interactName: "itemstackMod",
      function: (item) => {
        return item.getModName();
      }
    },
    fuelBurnTime: {
      internalName: "integrateddynamics:itemstack_burntime",
      nicknames: [
        "ItemstackFuelburntime",
        "item_fuel_burn_time",
        "itemFuelBurnTime"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "burn_time",
      interactName: "itemstackBurnTime",
      function: (item) => {
        return item.getFuelBurnTime();
      }
    },
    isFuel: {
      internalName: "integrateddynamics:itemstack_canburn",
      nicknames: [
        "ItemstackCanburn",
        "item_can_burn",
        "itemCanBurn",
        "item_is_fuel",
        "itemIsFuel"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "can_burn",
      interactName: "itemstackCanBurn",
      function: (item) => {
        return item.isFuel();
      }
    },
    itemTagNames: {
      internalName: "integrateddynamics:itemstack_tag",
      nicknames: [
        "ItemstackTag",
        "itemstack_tag_names",
        "itemstackTagNames",
        "item_tag_names"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: { type: "List", listType: { type: "String" } }
      },
      symbol: "item_tag_names",
      interactName: "itemstackTags",
      function: (item) => {
        return item.getTagNames();
      }
    },
    itemTagValues: {
      internalName: "integrateddynamics:string_tag",
      nicknames: [
        "ItemstackTagStacks",
        "itemstack_tag_values",
        "itemstackTagValues",
        "item_tag_values"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: { type: "List", listType: { type: "Item" } }
      },
      symbol: "item_tag_values",
      interactName: "stringItemsByTag",
      function: () => {
        throw new Error(
          "Item tag values is infeasible without a registry. This is a placeholder function."
        );
      }
    },
    itemWithSize: {
      internalName: "integrateddynamics:itemstack_withsize",
      nicknames: [
        "ItemstackWithsize",
        "itemstack_with_size",
        "itemstackWithSize",
        "item_with_size"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Item"
          }
        }
      },
      symbol: "with_size",
      interactName: "itemstackWithSize",
      function: (item) => {
        return (size) => {
          return new Item(new Properties({ size }), item);
        };
      }
    },
    isFeContainer: {
      internalName: "integrateddynamics:itemstack_isfecontainer",
      nicknames: [
        "ItemstackIsfecontainer",
        "itemstack_is_fe_container",
        "itemstackIsFecontainer",
        "item_is_fe_container",
        "itemIsFecontainer"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_fe_container",
      interactName: "itemstackIsFeContainer",
      function: (item) => {
        return item.isFeContainer();
      }
    },
    storedFe: {
      internalName: "integrateddynamics:itemstack_storedfe",
      nicknames: [
        "ItemstackStoredfe",
        "itemstack_stored_fe",
        "itemstackStoredFe",
        "item_stored_fe",
        "itemStoredFe"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "stored_fe",
      interactName: "itemstackFeStored",
      function: (item) => {
        return item.getFeStored();
      }
    },
    feCapacity: {
      internalName: "integrateddynamics:itemstack_fecapacity",
      nicknames: [
        "ItemstackFecapacity",
        "itemstack_fe_capacity",
        "itemstackFeCapacity",
        "item_fe_capacity",
        "itemFeCapacity"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "capacity_fe",
      interactName: "itemstackFeCapacity",
      function: (item) => {
        return item.getFeCapacity();
      }
    },
    hasInventory: {
      internalName: "integrateddynamics:itemstack_hasinventory",
      nicknames: [
        "ItemstackHasinventory",
        "itemstack_has_inventory",
        "itemstackHasInventory",
        "item_has_inventory",
        "itemHasInventory"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "has_inventory",
      interactName: "itemstackHasInventory",
      function: (item) => {
        return item.getInventory() !== null;
      }
    },
    inventorySize: {
      internalName: "integrateddynamics:itemstack_inventorysize",
      nicknames: [
        "ItemstackInventorysize",
        "itemstack_inventory_size",
        "itemstackInventorySize",
        "item_inventory_size",
        "itemInventorySize"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "inventory_size",
      interactName: "itemstackInventorySize",
      function: (item) => {
        return new Integer(item.getInventory()?.length || 0);
      }
    },
    itemInventory: {
      internalName: "integrateddynamics:itemstack_inventory",
      nicknames: [
        "ItemstackInventory",
        "itemstack_inventory",
        "itemstackInventory",
        "item_inventory"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: { type: "List", listType: { type: "Item" } }
      },
      symbol: "inventory",
      interactName: "itemstackInventory",
      function: (item) => {
        return item.getInventory();
      }
    },
    itemByName: {
      internalName: "integrateddynamics:itemstack_itembyname",
      nicknames: [
        "ItemstackByName",
        "itemstack_by_name",
        "itemstackByName",
        "item_by_name"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Item"
        }
      },
      symbol: "item_by_name",
      interactName: "stringItemByName",
      function: () => {
        throw new Error(
          "Item by name is infeasible without a registry. This is a placeholder function."
        );
      }
    },
    itemListCount: {
      internalName: "integrateddynamics:itemstack_itemlistcount",
      nicknames: [
        "ItemstackListCount",
        "itemstack_list_count",
        "itemstackListCount",
        "item_list_count"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "List",
          listType: { type: "Item" }
        },
        to: {
          type: "Function",
          from: { type: "Item" },
          to: {
            type: "Integer"
          }
        }
      },
      symbol: "item_list_count",
      interactName: "listItemListCount",
      function: (items) => {
        return (item) => {
          return new Integer(
            items.filter((i) => {
              try {
                return i.equals(item);
              } catch (e) {
                return false;
              }
            }).length
          );
        };
      }
    },
    itemNBT: {
      internalName: "integrateddynamics:itemstack_nbt",
      nicknames: [
        "ItemstackData",
        "itemstack_data",
        "itemstackData",
        "item_data",
        "itemData"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT()",
      interactName: "itemstackNbt",
      function: (item) => {
        return item.getNBT();
      }
    },
    hasNBT: {
      internalName: "integrateddynamics:itemstack_hasnbt",
      nicknames: [
        "ItemstackHasdata",
        "itemstack_has_data",
        "itemstackHasData",
        "item_has_data",
        "itemHasData"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "has_nbt",
      interactName: "itemstackHasNbt",
      function: (item) => {
        return item.getNBT() !== null && item.getNBT() !== void 0;
      }
    },
    itemNBTKeys: {
      internalName: "integrateddynamics:itemstack_datakeys",
      nicknames: [
        "ItemstackDataKeys",
        "itemstack_data_keys",
        "itemstackDataKeys",
        "item_data_keys",
        "itemDataKeys"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: { type: "List", listType: { type: "String" } }
      },
      symbol: "data_keys",
      interactName: "itemstackDataKeys",
      function: (item) => {
        const nbt = item.getNBT();
        if (!nbt) {
          return [];
        }
        return Object.keys(nbt).filter((key) => nbt.has(key));
      }
    },
    itemNBTValue: {
      internalName: "integrateddynamics:itemstack_datavalue",
      nicknames: [
        "ItemstackDataValue",
        "itemstack_data_value",
        "itemstackDataValue",
        "item_data_value",
        "itemDataValue"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "NBT"
          }
        }
      },
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
      }
    },
    itemWithNBT: {
      internalName: "integrateddynamics:itemstack_withdata",
      nicknames: [
        "ItemstackWithData",
        "itemstack_with_data",
        "itemstackWithData",
        "item_with_data",
        "itemWithData"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "NBT"
            },
            to: {
              type: "Item"
            }
          }
        }
      },
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
      }
    },
    itemTooltip: {
      internalName: "integrateddynamics:itemstack_tooltip",
      nicknames: [
        "ItemstackTooltip",
        "itemstack_tooltip",
        "itemstackTooltip",
        "item_tooltip"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Item"
        },
        to: { type: "List", listType: { type: "String" } }
      },
      symbol: "tooltip",
      interactName: "itemstackTooltip",
      function: (item) => {
        return item.getTooltip();
      }
    },
    itemEntityTooltip: {
      internalName: "integrateddynamics:entity_entityitemtooltip",
      nicknames: [
        "ItemstackEntityTooltip",
        "itemstack_entity_tooltip",
        "itemstackEntityTooltip",
        "item_entity_tooltip"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Function",
          from: {
            type: "Item"
          },
          to: { type: "List", listType: { type: "String" } }
        }
      },
      symbol: "entity_item_tooltip",
      interactName: "entityEntityItemTooltip",
      function: () => {
        return (item) => {
          console.warn(
            "Entity item tooltip is not fully supported. Returning item tooltip only."
          );
          return item.getTooltip();
        };
      }
    },
    isMob: {
      internalName: "integrateddynamics:entity_ismob",
      nicknames: ["EntityIsmob", "entity_is_mob", "entityIsMob"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_mob",
      interactName: "entityIsMob",
      function: (entity) => {
        return entity.isMob();
      }
    },
    isAnimal: {
      internalName: "integrateddynamics:entity_isanimal",
      nicknames: ["EntityIsanimal", "entity_is_animal", "entityIsAnimal"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_animal",
      interactName: "entityIsAnimal",
      function: (entity) => {
        return entity.isAnimal();
      }
    },
    isItem: {
      internalName: "integrateddynamics:entity_isitem",
      nicknames: ["EntityIsitem", "entity_is_item", "entityIsItem"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_item",
      interactName: "entityIsItem",
      function: (entity) => {
        return entity.isItem();
      }
    },
    isPlayer: {
      internalName: "integrateddynamics:entity_isplayer",
      nicknames: ["EntityIsplayer", "entity_is_player", "entityIsPlayer"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_player",
      interactName: "entityIsPlayer",
      function: (entity) => {
        return entity.isPlayer();
      }
    },
    isMinecart: {
      internalName: "integrateddynamics:entity_isminecart",
      nicknames: ["EntityIsminecart", "entity_is_minecart", "entityIsMinecart"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_minecart",
      interactName: "entityIsMinecart",
      function: (entity) => {
        return entity.isMinecart();
      }
    },
    entityItem: {
      internalName: "integrateddynamics:entity_item",
      nicknames: [
        "EntityItemstack",
        "entity_itemstack",
        "entityItemstack",
        "entity_item_stack",
        "entityItemStack",
        "entity_item"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Item"
        }
      },
      symbol: "item",
      interactName: "entityItem",
      function: (entity) => {
        if (entity.isItem()) {
          return entity.getItem();
        } else {
          throw new Error("Entity is not an item entity.");
        }
      }
    },
    entityHealth: {
      internalName: "integrateddynamics:entity_health",
      nicknames: [
        "EntityHealth",
        "entity_health",
        "entity_health_value",
        "entityHealthValue"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Double"
        }
      },
      symbol: "health",
      interactName: "entityHealth",
      function: (entity) => {
        return entity.getHealth();
      }
    },
    entityWidth: {
      internalName: "integrateddynamics:entity_width",
      nicknames: ["EntityWidth", "entity_width"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Double"
        }
      },
      symbol: "width",
      interactName: "entityWidth",
      function: (entity) => {
        return entity.getWidth();
      }
    },
    entityHeight: {
      internalName: "integrateddynamics:entity_height",
      nicknames: ["EntityHeight", "entity_height"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Double"
        }
      },
      symbol: "height",
      interactName: "entityHeight",
      function: (entity) => {
        return entity.getHeight();
      }
    },
    isBurning: {
      internalName: "integrateddynamics:entity_isburning",
      nicknames: ["EntityIsburning", "entity_is_burning", "entityIsBurning"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_burning",
      interactName: "entityEntityIsBurning",
      function: (entity) => {
        return entity.isBurning();
      }
    },
    isWet: {
      internalName: "integrateddynamics:entity_iswet",
      nicknames: ["EntityIswet", "entity_is_wet", "entityIsWet"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_wet",
      interactName: "entityIsWet",
      function: (entity) => {
        return entity.isWet();
      }
    },
    isCrouching: {
      internalName: "integrateddynamics:entity_iscrouching",
      nicknames: [
        "EntityIscrouching",
        "entity_is_crouching",
        "entityIsCrouching"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_crouching",
      interactName: "entityIsCrouching",
      function: (entity) => {
        return entity.isCrouching();
      }
    },
    isEating: {
      internalName: "integrateddynamics:entity_iseating",
      nicknames: ["EntityIseating", "entity_is_eating", "entityIsEating"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_eating",
      interactName: "entityIsEating",
      function: (entity) => {
        return entity.isEating();
      }
    },
    entityArmor: {
      internalName: "integrateddynamics:entity_armorinventory",
      nicknames: [
        "EntityArmorinventory",
        "entity_armor_inventory",
        "entityArmorInventory",
        "entity_armor"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: { type: "List", listType: { type: "Item" } }
      },
      symbol: "armor_inventory",
      interactName: "entityArmorInventory",
      function: (entity) => {
        return entity.getArmorInventory();
      }
    },
    entityInventoryContents: {
      internalName: "integrateddynamics:entity_inventory",
      nicknames: [
        "EntityInventory",
        "entity_inventory",
        "entityInventory",
        "entity_inventory_contents",
        "entityInventoryContents"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: { type: "List", listType: { type: "Item" } }
      },
      symbol: "inventory",
      interactName: "entityInventory",
      function: (entity) => {
        return entity.getInventory();
      }
    },
    entityModName: {
      internalName: "integrateddynamics:entity_mod",
      nicknames: ["EntityModname", "entity_mod_name", "entityModName"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "String"
        }
      },
      symbol: "mod",
      interactName: "entityMod",
      function: (entity) => {
        return entity.getModName();
      }
    },
    playerTargetBlock: {
      internalName: "integrateddynamics:entity_targetblock",
      nicknames: ["PlayerTargetblock", "player_target_block"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Block"
        }
      },
      symbol: "target_block",
      interactName: "entityTargetBlock",
      function: (entity) => {
        return entity.getTargetBlock();
      }
    },
    playerTargetEntity: {
      internalName: "integrateddynamics:entity_targetentity",
      nicknames: ["PlayerTargetentity", "player_target_entity"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Entity"
        }
      },
      symbol: "target_entity",
      interactName: "entityTargetEntity",
      function: (entity) => {
        return entity.getTargetEntity();
      }
    },
    playerHasGuiOpen: {
      internalName: "integrateddynamics:entity_hasguiopen",
      nicknames: ["PlayerHasguiopen", "player_has_gui_open"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "has_gui_open",
      interactName: "entityHasGuiOpen",
      function: (entity) => {
        return entity.hasGuiOpen();
      }
    },
    heldItemMain: {
      internalName: "integrateddynamics:entity_helditem",
      nicknames: [
        "EntityHelditemMain",
        "entity_held_item_main",
        "entityHeldItemMain"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Item"
        }
      },
      symbol: "held_item_1",
      interactName: "entityHeldItem",
      function: (entity) => {
        return entity.getHeldItemMain();
      }
    },
    heldItemOff: {
      internalName: "integrateddynamics:entity_helditemoffhand",
      nicknames: [
        "EntityHelditemOff",
        "entity_held_item_off",
        "entityHeldItemOff"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Item"
        }
      },
      symbol: "held_item_2",
      interactName: "entityHeldItemOffHand",
      function: (entity) => {
        return entity.getHeldItemOffHand();
      }
    },
    entitysMounted: {
      internalName: "integrateddynamics:entity_mounted",
      nicknames: ["EntityMounted", "entitys_mounted"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: { type: "List", listType: { type: "Entity" } }
      },
      symbol: "mounted",
      interactName: "entityMounted",
      function: (entity) => {
        return entity.isEntityMounted();
      }
    },
    itemFrameContents: {
      internalName: "integrateddynamics:entity_itemframeconte)nts",
      nicknames: [
        "ItemframeContents",
        "itemframe_contents",
        "itemframeContents",
        "item_frame_contents"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Item"
        }
      },
      symbol: "itemframe_contents",
      interactName: "entityItemFrameContents",
      function: (entity) => {
        if (entity.isItemFrame()) {
          return entity.getItemFrameContents();
        } else {
          throw new Error("Entity is not an item frame.");
        }
      }
    },
    itemFrameRotation: {
      internalName: "integrateddynamics:entity_itemframerotation",
      nicknames: [
        "ItemframeRotation",
        "itemframe_rotation",
        "itemframeRotation",
        "item_frame_rotation"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "itemframe_rotation",
      interactName: "entityItemFrameRotation",
      function: (entity) => {
        if (entity.isItemFrame()) {
          return entity.getItemFrameRotation();
        } else {
          throw new Error("Entity is not an item frame.");
        }
      }
    },
    entityHurtSound: {
      internalName: "integrateddynamics:entity_hurtsound",
      nicknames: ["EntityHurtsound", "entity_hurt_sound"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "String"
        }
      },
      symbol: "hurtsound",
      interactName: "entityHurtSound",
      function: (entity) => {
        return entity.getHurtSound();
      }
    },
    entityDeathSound: {
      internalName: "integrateddynamics:entity_deathsound",
      nicknames: ["EntityDeathsound", "entity_death_sound"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "String"
        }
      },
      symbol: "deathsound",
      interactName: "entityDeathSound",
      function: (entity) => {
        return entity.getDeathSound();
      }
    },
    entityAge: {
      internalName: "integrateddynamics:entity_age",
      nicknames: ["EntityAge", "entity_age"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "age",
      interactName: "entityAge",
      function: (entity) => {
        return entity.getAge();
      }
    },
    isChild: {
      internalName: "integrateddynamics:entity_ischild",
      nicknames: ["EntityIschild", "entity_is_child", "entityIsChild"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_child",
      interactName: "entityIsChild",
      function: (entity) => {
        return entity.isChild();
      }
    },
    canBreed: {
      internalName: "integrateddynamics:entity_canbreed",
      nicknames: ["EntityCanbreed", "entity_can_breed", "entityCanBreed"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "canbreed",
      interactName: "entityCanBreed",
      function: (entity) => {
        return entity.canBreed();
      }
    },
    isInLove: {
      internalName: "integrateddynamics:entity_isinlove",
      nicknames: ["EntityIsinlove", "entity_is_in_love", "entityIsInLove"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_in_love",
      interactName: "entityIsInLove",
      function: (entity) => {
        return entity.isInLove();
      }
    },
    canBreedWith: {
      internalName: "integrateddynamics:entity_canbreedwith",
      nicknames: [
        "EntityCanbreedwith",
        "entity_can_breed_with",
        "entityCanBreedWith"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Function",
          from: {
            type: "Entity"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "can_breed_with",
      interactName: "entityCanBreedWith",
      function: (entity1) => {
        return (entity2) => {
          return entity1.getBreadableList().includes(entity2.getUniqueName());
        };
      }
    },
    entityIsShearable: {
      internalName: "integrateddynamics:entity_isshearable",
      nicknames: [
        "EntityIsshearable",
        "entity_is_shearable",
        "entityIsShearable"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "is_shearable",
      interactName: "entityIsShearable",
      function: (entity) => {
        return entity.isShearable();
      }
    },
    entityNBT: {
      internalName: "integrateddynamics:entity_nbt",
      nicknames: ["EntityNbt", "entity_nbt"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT()",
      interactName: "entityNbt",
      function: (entity) => {
        return entity.getNBT();
      }
    },
    entityType: {
      internalName: "integrateddynamics:entity_entitytype",
      nicknames: ["EntityType", "entity_type"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "String"
        }
      },
      symbol: "entity_type",
      interactName: "entityType",
      function: (entity) => {
        return entity.getEntityType();
      }
    },
    entityItemList: {
      internalName: "integrateddynamics:entity_entityitems",
      nicknames: [
        "EntityItems",
        "entity_items",
        "entityItems",
        "entity_item_list"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: { type: "List", listType: { type: "Item" } }
      },
      symbol: "entity_items",
      interactName: "entityItems",
      function: (entity) => {
        return entity.getItemList();
      }
    },
    entityFluids: {
      internalName: "integrateddynamics:entity_entityfluids",
      nicknames: ["EntityFluids", "entity_fluids"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: { type: "List", listType: { type: "Fluid" } }
      },
      symbol: "entity_fluids",
      interactName: "entityFluids",
      function: (entity) => {
        return entity.getFluids();
      }
    },
    entityEnergyStored: {
      internalName: "integrateddynamics:entity_entityenergystored",
      nicknames: ["EntityEnergyStored", "entity_energy_stored"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "entity_stored_fe",
      interactName: "entityEnergy",
      function: (entity) => {
        return entity.getEnergyStored();
      }
    },
    entityEnergyCapacity: {
      internalName: "integrateddynamics:entity_entityenergycapacity",
      nicknames: ["EntityEnergyCapacity", "entity_energy_capacity"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Entity"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "entity_capacity_fe",
      interactName: "entityEnergyCapacity",
      function: (entity) => {
        return entity.getEnergyCapacity();
      }
    },
    fluidAmount: {
      internalName: "integrateddynamics:fluidstack_amount",
      nicknames: [
        "FluidstackAmount",
        "fluidstackAmount",
        "fluid_stack_amount",
        "fluidStackAmount",
        "fluid_stack_amount",
        "fluid_amount"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "amount",
      interactName: "fluidstackAmount",
      function: (fluid) => {
        return fluid.getAmount();
      }
    },
    fluidBlock: {
      internalName: "integrateddynamics:fluidstack_block",
      nicknames: [
        "FluidstackBlock",
        "fluidstackBlock",
        "fluid_stack_block",
        "fluidStackBlock",
        "fluid_stack_block",
        "fluid_block"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Block"
        }
      },
      symbol: "block",
      interactName: "fluidstackBlock",
      function: (fluid) => {
        return fluid.getBlock();
      }
    },
    fluidLightLevel: {
      internalName: "integrateddynamics:fluidstack_light_level",
      nicknames: [
        "FluidstackLightLevel",
        "fluidstackLightLevel",
        "fluid_stack_light_level",
        "fluidStackLightLevel",
        "fluid_stack_light_level",
        "fluid_light_level"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "light_level",
      interactName: "fluidstackLightLevel",
      function: (fluid) => {
        return fluid.getLightLevel();
      }
    },
    fluidDensity: {
      internalName: "integrateddynamics:fluidstack_density",
      nicknames: [
        "FluidstackDensity",
        "fluidstackDensity",
        "fluid_stack_density",
        "fluidStackDensity",
        "fluid_stack_density",
        "fluid_density"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "density",
      interactName: "fluidstackDensity",
      function: (fluid) => {
        return fluid.getDensity();
      }
    },
    fluidTemperature: {
      internalName: "integrateddynamics:fluidstack_temperature",
      nicknames: [
        "FluidstackTemperature",
        "fluidstackTemperature",
        "fluid_stack_temperature",
        "fluidStackTemperature",
        "fluid_stack_temperature",
        "fluid_temperature"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "temperature",
      interactName: "fluidstackTemperature",
      function: (fluid) => {
        return fluid.getTemperature();
      }
    },
    fluidViscosity: {
      internalName: "integrateddynamics:fluidstack_viscosity",
      nicknames: [
        "FluidstackViscosity",
        "fluidstackViscosity",
        "fluid_stack_viscosity",
        "fluidStackViscosity",
        "fluid_stack_viscosity",
        "fluid_viscosity"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "viscosity",
      interactName: "fluidstackViscosity",
      function: (fluid) => {
        return fluid.getViscosity();
      }
    },
    isLighterThanAir: {
      internalName: "integrateddynamics:fluidstack_lighter_than_air",
      nicknames: [
        "FluidstackIsLighterThanAir",
        "fluidstackIsLighterThanAir",
        "fluid_stack_is_lighter_than_air",
        "fluidStackIsLighterThanAir",
        "fluid_stack_is_lighter_than_air",
        "fluid_is_lighter_than_air",
        "fluidIsLighterThanAir"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "lighter_than_air",
      interactName: "fluidstackIsLighterThanAir",
      function: (fluid) => {
        return fluid.getLighterThanAir();
      }
    },
    fluidRarity: {
      internalName: "integrateddynamics:fluidstack_rarity",
      nicknames: [
        "FluidstackRarity",
        "fluidstackRarity",
        "fluid_stack_rarity",
        "fluidStackRarity",
        "fluid_stack_rarity",
        "fluid_rarity"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "String"
        }
      },
      symbol: "rarity",
      interactName: "fluidstackRarity",
      function: (fluid) => {
        return fluid.getRarity();
      }
    },
    fluidSoundBucketEmpty: {
      internalName: "integrateddynamics:fluidstack_sound_bucket_empty",
      nicknames: [
        "FluidstackSoundBucketEmpty",
        "fluidstackSoundBucketEmpty",
        "fluid_stack_sound_bucket_empty",
        "fluidStackSoundBucketEmpty",
        "fluid_stack_sound_bucket_empty",
        "fluid_sound_bucket_empty"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "String"
        }
      },
      symbol: "sound_bucket_empty",
      interactName: "fluidstackBucketEmptySound",
      function: (fluid) => {
        return fluid.getBucketEmptySound();
      }
    },
    fluidSoundFluidVaporize: {
      internalName: "integrateddynamics:fluidstack_sound_fluid_vaporize",
      nicknames: [
        "FluidstackSoundFluidVaporize",
        "fluidstackSoundFluidVaporize",
        "fluid_stack_sound_fluid_vaporize",
        "fluidStackSoundFluidVaporize",
        "fluid_stack_sound_fluid_vaporize",
        "fluid_sound_fluid_vaporize"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "String"
        }
      },
      symbol: "sound_fluid_vaporize",
      interactName: "fluidstackFluidVaporizeSound",
      function: (fluid) => {
        return fluid.getFluidVaporizeSound();
      }
    },
    fluidSoundBucketFill: {
      internalName: "integrateddynamics:fluidstack_sound_bucket_fill",
      nicknames: [
        "FluidstackSoundBucketFill",
        "fluidstackSoundBucketFill",
        "fluid_stack_sound_bucket_fill",
        "fluidStackSoundBucketFill",
        "fluid_stack_sound_bucket_fill",
        "fluid_sound_bucket_fill"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "String"
        }
      },
      symbol: "sound_bucket_fill",
      interactName: "fluidstackBucketFillSound",
      function: (fluid) => {
        return fluid.getBucketFillSound();
      }
    },
    fluidBucket: {
      internalName: "integrateddynamics:fluidstack_bucket",
      nicknames: [
        "FluidstackBucket",
        "fluidstackBucket",
        "fluid_stack_bucket",
        "fluidStackBucket",
        "fluid_stack_bucket",
        "fluid_bucket"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Item"
        }
      },
      symbol: "bucket",
      interactName: "fluidstackBucket",
      function: (fluid) => {
        return fluid.getBucket();
      }
    },
    rawFluidEquals: {
      internalName: "integrateddynamics:fluidstack_israwfluidequal",
      nicknames: [
        "FluidstackIsrawfluidequal",
        "fluidstackIsrawfluidequal",
        "fluid_stack_israwfluidequal",
        "fluidStackIsrawfluidequal",
        "fluid_stack_israwfluidequal",
        "fluid_israwfluidequal",
        "isRawFluidEqual"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Function",
          from: {
            type: "Fluid"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "=Raw=",
      interactName: "fluidstackIsRawEqual",
      function: (fluid1) => {
        return (fluid2) => {
          return fluid1.getUname().replace(new RegExp("\\s\\d+$"), "").toLowerCase() === fluid2.getUname().replace(new RegExp("\\s\\d+$"), "").toLowerCase();
        };
      }
    },
    fluidModName: {
      internalName: "integrateddynamics:fluidstack_mod",
      nicknames: [
        "FluidstackModname",
        "fluidstackModname",
        "fluid_stack_modname",
        "fluidStackModname",
        "fluid_stack_modname",
        "fluid_mod_name"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "String"
        }
      },
      symbol: "mod",
      interactName: "fluidstackMod",
      function: (fluid) => {
        return fluid.getModName();
      }
    },
    fluidNBT: {
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
        "fluidstackNBT"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT()",
      interactName: "fluidstackNbt",
      function: (fluid) => {
        return fluid.getNBT();
      }
    },
    fluidWithAmount: {
      internalName: "integrateddynamics:fluidstack_with_amount",
      nicknames: [
        "FluidstackWithAmount",
        "fluidstackWithAmount",
        "fluid_stack_with_amount",
        "fluidStackWithAmount",
        "fluid_stack_with_amount",
        "fluid_with_amount"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Fluid"
          }
        }
      },
      symbol: "with_amount",
      interactName: "fluidstackWithAmount",
      function: (fluid) => {
        return (amount) => {
          return new Fluid(new Properties({ amount }), fluid);
        };
      }
    },
    fluidNBTKeys: {
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
        "fluidstackNBTKeys"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: { type: "List", listType: { type: "String" } }
      },
      symbol: "data_keys",
      interactName: "fluidstackDataKeys",
      function: (fluid) => {
        const nbt = fluid.getNBT();
        if (!nbt) {
          return [];
        }
        return Object.keys(nbt).filter((key) => nbt.has(key));
      }
    },
    fluidNBTValue: {
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
        "fluidstackNBTValue"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "NBT"
          }
        }
      },
      symbol: "data_value",
      interactName: "fluidstackDataValue",
      function: (fluid) => {
        return (key) => {
          const nbt = fluid.getNBT();
          if (!nbt || !nbt.hasOwnProperty(key)) {
            return new NullTag();
          }
          return nbt.get(key);
        };
      }
    },
    fluidWithNBT: {
      internalName: "integrateddynamics:itemstack_withdata",
      nicknames: [
        "FluidstackWithData",
        "fluidstackWithData",
        "fluid_stack_with_data",
        "fluidStackWithData"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "NBT"
            },
            to: {
              type: "Fluid"
            }
          }
        }
      },
      symbol: "with_data",
      interactName: "fluidstackWithData",
      function: (fluid) => {
        return (key) => {
          return (value) => {
            let nbt = fluid.getNBT() || {};
            nbt = nbt.set(key, value);
            return new Fluid(new Properties({ nbt }), fluid);
          };
        };
      }
    },
    fluidTag: {
      internalName: "integrateddynamics:fluidstack_tag",
      nicknames: [
        "FluidstackTag",
        "fluidstackTag",
        "fluidstackTagStacks",
        "fluidstackTagStack"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Fluid"
        },
        to: { type: "List", listType: { type: "String" } }
      },
      symbol: "fluid_tag_names",
      interactName: "fluidstackTags",
      function: (fluid) => {
        return fluid.getTagNames();
      }
    },
    fluidTagStacks: {
      internalName: "integrateddynamics:string_fluidtag",
      nicknames: [
        "FluidstackTagStacks",
        "fluidStackTagStacks",
        "fluid_stack_tag_stacks"
      ],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: { type: "List", listType: { type: "Fluid" } }
      },
      symbol: "fluid_tag_values",
      interactName: "stringFluidsByTag",
      function: () => {
        throw new Error(
          "Fluid tag values is infeasible without a registry. This is a placeholder function."
        );
      }
    },
    apply: {
      internalName: "integrateddynamics:operator_apply",
      nicknames: ["operatorApply"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 2 }
        },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 2 }
        }
      },
      symbol: "apply",
      interactName: "operatorApply",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return (arg) => {
          globalMap.unify(op.parsedSignature.getInput(0), arg);
          return op.apply(arg);
        };
      }
    },
    apply2: {
      internalName: "integrateddynamics:operator_apply2",
      nicknames: ["operatorApply_2"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 2 },
            to: { type: "Any", typeID: 3 }
          }
        },
        to: {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 2
            },
            to: {
              type: "Any",
              typeID: 3
            }
          }
        }
      },
      symbol: "apply2",
      interactName: "operatorApply2",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return (arg1) => {
          return (arg2) => {
            globalMap.unify(op.parsedSignature.getInput(0), arg1);
            globalMap.unify(op.parsedSignature.getInput(1), arg2);
            return op.apply(arg1).apply(arg2);
          };
        };
      }
    },
    apply3: {
      internalName: "integrateddynamics:operator_apply3",
      nicknames: ["operatorApply_3"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 2 },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 3 },
              to: { type: "Any", typeID: 4 }
            }
          }
        },
        to: {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 2
            },
            to: {
              type: "Function",
              from: {
                type: "Any",
                typeID: 3
              },
              to: {
                type: "Any",
                typeID: 4
              }
            }
          }
        }
      },
      symbol: "apply3",
      interactName: "operatorApply3",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return (arg1) => {
          return (arg2) => {
            return (arg3) => {
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(0),
                arg1
              );
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(1),
                arg2
              );
              op.parsedSignature.typeMap.unify(
                op.parsedSignature.getInput(2),
                arg3
              );
              return op.apply(arg1).apply(arg2).apply(arg3);
            };
          };
        };
      }
    },
    applyn: {
      internalName: "integrateddynamics:operator_apply_n",
      nicknames: ["operatorApplyN"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 2 }
        },
        to: {
          type: "Function",
          from: {
            type: "List",
            listType: {
              type: "Any",
              typeID: 1
            }
          },
          to: { type: "Any", typeID: 3 }
        }
      },
      symbol: "apply_n",
      interactName: "operatorApply_n",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return (args) => {
          args.forEach((arg, i) => {
            if (arg === void 0 || arg === null) {
              throw new Error(
                "applyn requires all arguments to be defined and non-null."
              );
            }
            op.parsedSignature.typeMap.unify(op.parsedSignature.getInput(i), arg);
            op = op.apply(arg);
          });
          return op;
        };
      }
    },
    apply0: {
      internalName: "integrateddynamics:operator_apply0",
      nicknames: ["operatorApply_0"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 1
        },
        to: { type: "Any", typeID: 1 }
      },
      symbol: "apply0",
      interactName: "operatorApply0",
      serializer: "integrateddynamics:curry",
      function: (op) => {
        return () => {
          return op.apply(void 0);
        };
      }
    },
    map: {
      internalName: "integrateddynamics:operator_map",
      nicknames: ["operatorMap"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 2 }
        },
        to: {
          type: "Function",
          from: {
            type: "List",
            listType: { type: "Any", typeID: 1 }
          },
          to: {
            type: "List",
            listType: { type: "Any", typeID: 2 }
          }
        }
      },
      symbol: "map",
      interactName: "operatorMap",
      function: (op) => {
        return (list) => {
          return list.map((item) => op.apply(item));
        };
      }
    },
    filter: {
      internalName: "integrateddynamics:operator_filter",
      nicknames: ["operatorFilter"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean"
          }
        },
        to: {
          type: "Function",
          from: {
            type: "List",
            listType: {
              type: "Any",
              typeID: 1
            }
          },
          to: {
            type: "List",
            listType: {
              type: "Any",
              typeID: 1
            }
          }
        }
      },
      symbol: "filter",
      interactName: "operatorFilter",
      function: (predicate) => {
        return (list) => {
          return list.filter((item) => predicate.apply(item));
        };
      }
    },
    conjunction: {
      internalName: "integrateddynamics:operator_conjunction",
      nicknames: ["operatorConjunction"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean"
          }
        },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean"
            }
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean"
            }
          }
        }
      },
      symbol: ".&&.",
      interactName: "operatorConjunction",
      function: (predicate1) => {
        return (predicate2) => {
          return (input) => {
            return predicate1.apply(input) && predicate2.apply(input);
          };
        };
      }
    },
    disjunction: {
      internalName: "integrateddynamics:operator_disjunction",
      nicknames: ["operatorDisjunction"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean"
          }
        },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean"
            }
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: {
              type: "Boolean"
            }
          }
        }
      },
      symbol: ".||.",
      interactName: "operatorDisjunction",
      function: (predicate1) => {
        return (predicate2) => {
          return (input) => {
            return predicate1.apply(input) || predicate2.apply(input);
          };
        };
      }
    },
    negation: {
      internalName: "integrateddynamics:operator_negation",
      nicknames: ["operatorNegation"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean"
          }
        },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "!.",
      interactName: "operatorNegation",
      function: (predicate) => {
        return (input) => {
          return !predicate.apply(input);
        };
      }
    },
    pipe: {
      internalName: "integrateddynamics:operator_pipe",
      nicknames: ["operatorPipe"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 2 }
        },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 2 },
            to: { type: "Any", typeID: 3 }
          },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 3 }
          }
        }
      },
      symbol: ".",
      interactName: "operatorPipe",
      serializer: "integrateddynamics:combined.pipe",
      function: (f) => {
        return (g) => {
          f.parsedSignature.pipe(g.parsedSignature);
          return (x) => {
            return g.apply(f.apply(x));
          };
        };
      }
    },
    "pipe.2": {
      internalName: "integrateddynamics:operator_pipe2",
      nicknames: ["operatorPipe2", "pipe2"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 2 }
        },
        to: {
          type: "Function",
          from: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 3 }
          },
          to: {
            type: "Function",
            from: {
              type: "Function",
              from: { type: "Any", typeID: 2 },
              to: {
                type: "Function",
                from: { type: "Any", typeID: 3 },
                to: { type: "Any", typeID: 4 }
              }
            },
            to: {
              type: "Function",
              from: { type: "Any", typeID: 1 },
              to: { type: "Any", typeID: 4 }
            }
          }
        }
      },
      symbol: ".2",
      interactName: "operatorPipe2",
      serializer: "integrateddynamics:combined.pipe",
      function: (f) => {
        return (g) => {
          return (h) => {
            f.parsedSignature.typeMap.unify(
              f.parsedSignature.getOutput(),
              h.parsedSignature.getInput(0)
            );
            g.parsedSignature.typeMap.unify(
              g.parsedSignature.getOutput(),
              h.parsedSignature.getInput(1)
            );
            return (x) => {
              return h.apply(f.apply(x)).apply(g.apply(x));
            };
          };
        };
      }
    },
    flip: {
      internalName: "integrateddynamics:operator_flip",
      nicknames: ["operatorFlip"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 2 },
            to: { type: "Any", typeID: 3 }
          }
        },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 2 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 3 }
          }
        }
      },
      symbol: "flip",
      interactName: "operatorFlip",
      serializer: "integrateddynamics:combined.flip",
      function: (op) => {
        return (arg1) => {
          return (arg2) => {
            return op.apply(arg2).apply(arg1);
          };
        };
      }
    },
    reduce: {
      internalName: "integrateddynamics:operator_reduce",
      nicknames: ["operatorReduce"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 1 }
          }
        },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 1 }
          }
        }
      },
      symbol: "reduce",
      interactName: "operatorReduce",
      function: (op) => {
        return (list) => {
          return (startingValue) => {
            let result = startingValue;
            for (let item of list) {
              result = op.apply(result).apply(item);
            }
            return result;
          };
        };
      }
    },
    reduce1: {
      internalName: "integrateddynamics:operator_reduce1",
      nicknames: ["operatorReduce1"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: {
            type: "Function",
            from: { type: "Any", typeID: 1 },
            to: { type: "Any", typeID: 1 }
          }
        },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Any", typeID: 1 } },
          to: { type: "Any", typeID: 1 }
        }
      },
      symbol: "reduce1",
      interactName: "operatorReduce1",
      function: (op) => {
        return (list) => {
          list = [...list];
          let result = list.shift();
          for (let item of list) {
            result = op.apply(result).apply(item);
          }
          return result;
        };
      }
    },
    opByName: {
      internalName: "integrateddynamics:operator_by_name",
      nicknames: ["operatorByName"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: { type: "Any", typeID: 1 },
          to: { type: "Any", typeID: 2 }
        }
      },
      symbol: "op_by_name",
      interactName: "stringOperatorByName",
      function: (name) => {
        return operatorRegistry.find((op) => op.internalName === name);
      }
    },
    NBTSize: {
      internalName: "integrateddynamics:nbt_compound_size",
      nicknames: ["nbtCompoundSize"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "NBT{}.size",
      interactName: "nbtSize",
      function: (nbt) => {
        return new Integer(nbt.getAllKeys().length);
      }
    },
    NBTKeys: {
      internalName: "integrateddynamics:nbt_compound_keys",
      nicknames: ["nbtCompoundKeys"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: { type: "List", listType: { type: "String" } }
      },
      symbol: "NBT{}.keys",
      interactName: "nbtKeys",
      function: (nbt) => {
        return nbt.getAllKeys();
      }
    },
    NBTHasKey: {
      internalName: "integrateddynamics:nbt_compound_haskey",
      nicknames: ["nbtCompoundHaskey"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "NBT{}.has_key",
      interactName: "nbtHasKey",
      function: (nbt) => {
        return (key) => {
          return nbt.has(key);
        };
      }
    },
    NBTValueType: {
      internalName: "integrateddynamics:nbt_compound_type",
      nicknames: ["nbtCompoundValueType"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "String"
          }
        }
      },
      symbol: "NBT{}.type",
      interactName: "nbtType",
      function: (nbt) => {
        return (key) => {
          if (!nbt.has(key)) {
            throw new Error(`${key} does not exist in ${JSON.stringify(nbt)}`);
          }
          return nbt.get(key).getTypeAsString();
        };
      }
    },
    compoundValueAny: {
      internalName: "integrateddynamics:nbt_compound_value_tag",
      nicknames: ["nbtCompoundValueTag"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "NBT"
          }
        }
      },
      symbol: "NBT{}.get_tag",
      interactName: "nbtGetTag",
      function: (nbt) => {
        return (key) => {
          return nbt.get(key);
        };
      }
    },
    compoundValueBoolean: {
      internalName: "integrateddynamics:nbt_compound_value_boolean",
      nicknames: ["nbtCompoundValueBoolean"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "NBT{}.get_boolean",
      interactName: "nbtGetBoolean",
      function: (nbt) => {
        return (key) => {
          return nbt.get(key).valueOf();
        };
      }
    },
    compoundValueInteger: {
      internalName: "integrateddynamics:nbt_compound_value_integer",
      nicknames: ["nbtCompoundValueInteger"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Integer"
          }
        }
      },
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
      }
    },
    compoundValueLong: {
      internalName: "integrateddynamics:nbt_compound_value_long",
      nicknames: ["nbtCompoundValueLong"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Long"
          }
        }
      },
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
      }
    },
    compoundValueDouble: {
      internalName: "integrateddynamics:nbt_compound_value_double",
      nicknames: ["nbtCompoundValueDouble"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Double"
          }
        }
      },
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
      }
    },
    compoundValueString: {
      internalName: "integrateddynamics:nbt_compound_value_string",
      nicknames: ["nbtCompoundValueString"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "String"
          }
        }
      },
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
      }
    },
    compoundValueNBT: {
      internalName: "integrateddynamics:nbt_compound_value_compound",
      nicknames: ["nbtCompoundValueCompound"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "NBT"
          }
        }
      },
      symbol: "NBT{}.get_compound",
      interactName: "nbtGetCompound",
      function: (nbt) => {
        return (key) => {
          let value = nbt.get(key);
          if (value.getType() === Tag.TAG_COMPOUND) {
            return value.valueOf();
          }
          throw new Error(
            `${key} is not a Compound in ${JSON.stringify(nbt.toJSON())}`
          );
        };
      }
    },
    compoundValueListNBT: {
      internalName: "integrateddynamics:nbt_compound_value_list_tag",
      nicknames: ["nbtCompoundValueListTag", "nbtCompoundValueList"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: { type: "List", listType: { type: "NBT" } }
        }
      },
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
      }
    },
    compoundValueListByte: {
      internalName: "integrateddynamics:nbt_compound_value_list_byte",
      nicknames: ["nbtCompoundValueListByte"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: { type: "List", listType: { type: "Integer" } }
        }
      },
      symbol: "NBT{}.get_list_byte",
      interactName: "nbtGetListByte",
      function: (nbt) => {
        return (key) => {
          let value = nbt.get(key);
          let list = value.valueOf();
          if (value.getType() != Tag.TAG_BYTE)
            throw new Error(
              `${key} is not a list of byte in ${JSON.stringify(nbt.toJSON())}`
            );
          return list;
        };
      }
    },
    compoundValueListInteger: {
      internalName: "integrateddynamics:nbt_compound_value_list_int",
      nicknames: ["nbtCompoundValueListInt"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: { type: "List", listType: { type: "Integer" } }
        }
      },
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
          return list.map((e) => {
            if (e.getType() != Tag.TAG_INT)
              throw new Error(
                `${key} is not a list of int in ${JSON.stringify(nbt.toJSON())}`
              );
            return e.valueOf();
          });
        };
      }
    },
    compoundValueListLong: {
      internalName: "integrateddynamics:nbt_compound_value_list_long",
      nicknames: ["nbtCompoundValueListLong"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: { type: "List", listType: { type: "Long" } }
        }
      },
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
          return list.map((e) => {
            if (e.getType() != Tag.TAG_LONG)
              throw new Error(
                `${key} is not a list of long in ${JSON.stringify(nbt.toJSON())}`
              );
            return e.valueOf();
          });
        };
      }
    },
    NBTWithout: {
      internalName: "integrateddynamics:nbt_compound_without",
      nicknames: ["nbtCompoundWithout"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "NBT"
          }
        }
      },
      symbol: "NBT{}.without",
      interactName: "nbtWithout",
      function: (nbt) => {
        return (key) => {
          return nbt.without(key);
        };
      }
    },
    NBTWithBoolean: {
      internalName: "integrateddynamics:nbt_compound_with_boolean",
      nicknames: ["nbtCompoundWithBoolean"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "Boolean"
            },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_boolean",
      interactName: "nbtWithBoolean",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, new ByteTag(new Integer(+value)));
          };
        };
      }
    },
    NBTWithShort: {
      internalName: "integrateddynamics:nbt_compound_with_short",
      nicknames: ["nbtCompoundWithShort"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "Integer"
            },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_short",
      interactName: "nbtWithShort",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithInteger: {
      internalName: "integrateddynamics:nbt_compound_with_integer",
      nicknames: ["nbtCompoundWithInteger"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "Integer"
            },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_integer",
      interactName: "nbtWithInteger",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithLong: {
      internalName: "integrateddynamics:nbt_compound_with_long",
      nicknames: ["nbtCompoundWithLong"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "Long"
            },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_long",
      interactName: "nbtWithLong",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithDouble: {
      internalName: "integrateddynamics:nbt_compound_with_double",
      nicknames: ["nbtCompoundWithDouble"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "Double"
            },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_double",
      interactName: "nbtWithDouble",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithFloat: {
      internalName: "integrateddynamics:nbt_compound_with_float",
      nicknames: ["nbtCompoundWithFloat"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "Double"
            },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_float",
      interactName: "nbtWithFloat",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithString: {
      internalName: "integrateddynamics:nbt_compound_with_string",
      nicknames: ["nbtCompoundWithString"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "String"
            },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_string",
      interactName: "nbtWithString",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithNBT: {
      internalName: "integrateddynamics:nbt_compound_with_tag",
      nicknames: ["nbtCompoundWithCompound"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: {
              type: "NBT"
            },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_tag",
      interactName: "nbtWithTag",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithNBTList: {
      internalName: "integrateddynamics:nbt_compound_with_list_tag",
      nicknames: ["nbtCompoundWithListTag"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "NBT" } },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_tag_list",
      interactName: "nbtWithTagList",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithByteList: {
      internalName: "integrateddynamics:nbt_compound_with_list_byte",
      nicknames: ["nbtCompoundWithListByte"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Integer" } },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_byte_list",
      interactName: "nbtWithByteList",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithIntegerList: {
      internalName: "integrateddynamics:nbt_compound_with_list_int",
      nicknames: ["nbtCompoundWithListInt"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Integer" } },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_int_list",
      interactName: "nbtWithIntList",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTWithLongList: {
      internalName: "integrateddynamics:nbt_compound_with_list_long",
      nicknames: ["nbtCompoundWithListLong"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "String"
          },
          to: {
            type: "Function",
            from: { type: "List", listType: { type: "Long" } },
            to: {
              type: "NBT"
            }
          }
        }
      },
      symbol: "NBT{}.with_list_long",
      interactName: "nbtWithListLong",
      function: (nbt) => {
        return (key) => {
          return (value) => {
            return nbt.set(key, value);
          };
        };
      }
    },
    NBTSubset: {
      internalName: "integrateddynamics:nbt_compound_subset",
      nicknames: ["nbtCompoundSubset"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "NBT"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "NBT{}.\u2286",
      interactName: "nbtIsSubset",
      function: (subSet) => {
        return (superSet) => {
          return superSet.compoundSubset(subSet);
        };
      }
    },
    NBTUnion: {
      internalName: "integrateddynamics:nbt_compound_union",
      nicknames: ["nbtCompoundUnion"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "NBT"
          },
          to: {
            type: "NBT"
          }
        }
      },
      symbol: "NBT{}.\u222A",
      interactName: "nbtUnion",
      function: (nbt1) => {
        return (nbt2) => {
          return nbt1.compoundUnion(nbt2);
        };
      }
    },
    NBTIntersection: {
      internalName: "integrateddynamics:nbt_compound_intersection",
      nicknames: ["nbtCompoundIntersection"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "NBT"
          },
          to: {
            type: "NBT"
          }
        }
      },
      symbol: "NBT{}.\u2229",
      interactName: "nbtIntersection",
      function: (nbt1) => {
        return (nbt2) => {
          return nbt1.compoundIntersection(nbt2);
        };
      }
    },
    NBTMinus: {
      internalName: "integrateddynamics:nbt_compound_minus",
      nicknames: ["nbtCompoundMinus"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Function",
          from: {
            type: "NBT"
          },
          to: {
            type: "NBT"
          }
        }
      },
      symbol: "NBT{}.\u2216",
      interactName: "nbtMinus",
      function: (nbt1) => {
        return (nbt2) => {
          return nbt1.compoundMinus(nbt2);
        };
      }
    },
    nbtAsBoolean: {
      internalName: "integrateddynamics:nbt_as_boolean",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "NBT.as_boolean",
      interactName: "nbtAsBoolean",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_BYTE) {
          return !!parseInt(nbt.valueOf().toDecimal());
        } else {
          return false;
        }
      }
    },
    nbtAsByte: {
      internalName: "integrateddynamics:nbt_as_byte",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "NBT.as_byte",
      interactName: "nbtAsByte",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_INT) {
          return nbt.valueOf();
        } else {
          return new Integer(0);
        }
      }
    },
    nbtAsShort: {
      internalName: "integrateddynamics:nbt_as_short",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "NBT.as_short",
      interactName: "nbtAsShort",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_INT) {
          return nbt.valueOf();
        } else {
          return new Integer(0);
        }
      }
    },
    nbtAsInt: {
      internalName: "integrateddynamics:nbt_as_int",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "NBT.as_int",
      interactName: "nbtAsInt",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_INT) {
          return nbt.valueOf();
        } else {
          return new Integer(0);
        }
      }
    },
    nbtAsLong: {
      internalName: "integrateddynamics:nbt_as_long",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Long"
        }
      },
      symbol: "NBT.as_long",
      interactName: "nbtAsLong",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_LONG) {
          return nbt.valueOf();
        } else {
          return new Long(0);
        }
      }
    },
    nbtAsDouble: {
      internalName: "integrateddynamics:nbt_as_double",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Double"
        }
      },
      symbol: "NBT.as_double",
      interactName: "nbtAsDouble",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_DOUBLE) {
          return nbt.valueOf();
        } else {
          return new Double(0);
        }
      }
    },
    nbtAsFloat: {
      internalName: "integrateddynamics:nbt_as_float",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "Double"
        }
      },
      symbol: "NBT.as_float",
      interactName: "nbtAsFloat",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_DOUBLE) {
          return nbt.valueOf();
        } else {
          return new Double(0);
        }
      }
    },
    nbtAsString: {
      internalName: "integrateddynamics:nbt_as_string",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: {
          type: "String"
        }
      },
      symbol: "NBT.as_string",
      interactName: "nbtAsString",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_STRING) {
          return nbt.valueOf();
        } else {
          return "";
        }
      }
    },
    nbtAsTagList: {
      internalName: "integrateddynamics:nbt_as_tag_list",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: { type: "List", listType: { type: "NBT" } }
      },
      symbol: "NBT.as_tag_list",
      interactName: "nbtAsTagList",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_LIST) {
          return nbt.valueOf();
        } else {
          return new Array();
        }
      }
    },
    nbtAsByteList: {
      internalName: "integrateddynamics:nbt_as_byte_list",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: { type: "List", listType: { type: "Integer" } }
      },
      symbol: "NBT.as_byte_list",
      interactName: "nbtAsByteList",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_LIST) {
          const list = nbt.valueOf();
          if (!list.every((e) => e.getType() == Tag.TAG_INT))
            return new Array();
          return list.map((e) => e.valueOf());
        } else {
          return new Array();
        }
      }
    },
    nbtAsIntList: {
      internalName: "integrateddynamics:nbt_as_int_list",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: { type: "List", listType: { type: "Integer" } }
      },
      symbol: "NBT.as_int_list",
      interactName: "nbtAsIntList",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_LIST) {
          const list = nbt.valueOf();
          if (!list.every((e) => e.getType() == Tag.TAG_INT))
            return new Array();
          return list.map((e) => e.valueOf());
        } else {
          return new Array();
        }
      }
    },
    nbtAsLongList: {
      internalName: "integrateddynamics:nbt_as_long_list",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "NBT"
        },
        to: { type: "List", listType: { type: "Long" } }
      },
      symbol: "NBT.as_long_list",
      interactName: "nbtAsLongList",
      function: (nbt) => {
        if (nbt.getType() === Tag.TAG_LIST) {
          const list = nbt.valueOf();
          if (!list.every((e) => e.getType() == Tag.TAG_LONG))
            return new Array();
          return list.map((e) => e.valueOf());
        } else {
          return new Array();
        }
      }
    },
    nbtFromBoolean: {
      internalName: "integrateddynamics:nbt_from_boolean",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Boolean"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_boolean",
      interactName: "booleanAsNbt",
      function: (bool) => {
        return new ByteTag(new Integer(+bool));
      }
    },
    nbtFromShort: {
      internalName: "integrateddynamics:nbt_from_short",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_short",
      interactName: "shortAsNbt",
      function: (short) => {
        return new IntTag(short);
      }
    },
    nbtFromByte: {
      internalName: "integrateddynamics:nbt_from_byte",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_byte",
      interactName: "byteAsNbt",
      function: (byte) => {
        return new IntTag(byte);
      }
    },
    nbtFromInt: {
      internalName: "integrateddynamics:nbt_from_int",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_int",
      interactName: "integerAsNbt",
      function: (int) => {
        return new IntTag(int);
      }
    },
    nbtFromLong: {
      internalName: "integrateddynamics:nbt_from_long",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Long"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_long",
      interactName: "longAsNbt",
      function: (long) => {
        return new LongTag(long);
      }
    },
    nbtFromDouble: {
      internalName: "integrateddynamics:nbt_from_double",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Double"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_double",
      interactName: "doubleAsNbt",
      function: (double) => {
        return new DoubleTag(double);
      }
    },
    nbtFromFloat: {
      internalName: "integrateddynamics:nbt_from_float",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Double"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_float",
      interactName: "floatAsNbt",
      function: (float) => {
        return new DoubleTag(float);
      }
    },
    nbtFromString: {
      internalName: "integrateddynamics:nbt_from_string",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_string",
      interactName: "stringAsNbt",
      function: (str) => {
        return new StringTag(str);
      }
    },
    nbtFromTagList: {
      internalName: "integrateddynamics:nbt_from_tag_list",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "NBT" } },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_tag_list",
      interactName: "tagListAsNbt",
      function: (tagList) => {
        return new ListTag(tagList);
      }
    },
    nbtFromByteList: {
      internalName: "integrateddynamics:nbt_from_byte_list",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Integer" } },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_byte_list",
      interactName: "byteListAsNbt",
      function: (byteList) => {
        return new ListTag(byteList.map((e) => new IntTag(e)));
      }
    },
    nbtFromIntList: {
      internalName: "integrateddynamics:nbt_from_int_list",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Integer" } },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_int_list",
      interactName: "intListAsNbt",
      function: (intList) => {
        return new ListTag(intList.map((e) => new IntTag(e)));
      }
    },
    nbtFromLongList: {
      internalName: "integrateddynamics:nbt_from_long_list",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: { type: "List", listType: { type: "Long" } },
        to: {
          type: "NBT"
        }
      },
      symbol: "NBT.from_long_list",
      interactName: "longListAsNbt",
      function: (longList) => {
        return new ListTag(longList.map((e) => new LongTag(e)));
      }
    },
    nbtPathMatchFirst: {
      internalName: "integrateddynamics:nbt_path_match_first",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "NBT"
          },
          to: {
            type: "NBT"
          }
        }
      },
      symbol: "NBT.path_match_first",
      interactName: "stringNbtPathMatchFirst",
      function: (path) => {
        return (nbt) => {
          let expression = NbtPath.parse(path);
          if (!expression) throw new Error(`Invalid path: ${path}`);
          return expression.match(nbt).getMatches()[0] ?? new NullTag();
        };
      }
    },
    nbtPathMatchAll: {
      internalName: "integrateddynamics:nbt_path_match_all",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "NBT"
          },
          to: { type: "List", listType: { type: "NBT" } }
        }
      },
      symbol: "NBT.path_match_all",
      interactName: "stringNbtPathMatchAll",
      function: (path) => {
        return (nbt) => {
          let expression = NbtPath.parse(path);
          if (!expression) throw new Error(`Invalid path: ${path}`);
          return expression.match(nbt).getMatches();
        };
      }
    },
    NBTPathTest: {
      internalName: "integrateddynamics:nbt_path_test",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Function",
          from: {
            type: "NBT"
          },
          to: {
            type: "Boolean"
          }
        }
      },
      symbol: "NBT.path_test",
      interactName: "stringNbtPathTest",
      function: (path) => {
        return (nbt) => {
          let expression = NbtPath.parse(path);
          if (!expression) throw new Error(`Invalid path: ${path}`);
          return expression.test(nbt);
        };
      }
    },
    ingredientsItems: {
      internalName: "integrateddynamics:ingredients_items",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: { type: "List", listType: { type: "Item" } }
      },
      symbol: "Ingr.items",
      interactName: "ingredientsItems",
      function: (ingredients) => {
        return ingredients.getItems();
      }
    },
    ingredientsFluids: {
      internalName: "integrateddynamics:ingredients_fluids",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: { type: "List", listType: { type: "Fluid" } }
      },
      symbol: "Ingr.fluids",
      interactName: "ingredientsFluids",
      function: (ingredients) => {
        return ingredients.getFluids();
      }
    },
    ingredientsEnergies: {
      internalName: "integrateddynamics:ingredients_energies",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: { type: "List", listType: { type: "Long" } }
      },
      symbol: "Ingr.energies",
      interactName: "ingredientsEnergies",
      function: (ingredients) => {
        return ingredients.getEnergies();
      }
    },
    ingredientsWithItem: {
      internalName: "integrateddynamics:ingredients_with_item",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Function",
            from: {
              type: "Item"
            },
            to: {
              type: "Ingredients"
            }
          }
        }
      },
      symbol: "Ingr.with_item",
      interactName: "ingredientsWithItem",
      function: (ingredients) => {
        return (index) => {
          return (item) => {
            return ingredients.setItem(item, index);
          };
        };
      }
    },
    ingredientsWithFluid: {
      internalName: "integrateddynamics:ingredients_with_fluid",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Function",
            from: {
              type: "Fluid"
            },
            to: {
              type: "Ingredients"
            }
          }
        }
      },
      symbol: "Ingr.with_fluid",
      interactName: "ingredientsWithFluid",
      function: (ingredients) => {
        return (index) => {
          return (fluid) => {
            return ingredients.setFluid(fluid, index);
          };
        };
      }
    },
    ingredientsWithEnergy: {
      internalName: "integrateddynamics:ingredients_with_energy",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: {
          type: "Function",
          from: {
            type: "Integer"
          },
          to: {
            type: "Function",
            from: {
              type: "Long"
            },
            to: {
              type: "Ingredients"
            }
          }
        }
      },
      symbol: "Ingr.with_energy",
      interactName: "ingredientsWithEnergy",
      function: (ingredients) => {
        return (index) => {
          return (energy) => {
            return ingredients.setEnergy(energy, index);
          };
        };
      }
    },
    ingredientsWithItems: {
      internalName: "integrateddynamics:ingredients_with_items",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Item" } },
          to: {
            type: "Ingredients"
          }
        }
      },
      symbol: "Ingr.with_items",
      interactName: "ingredientsWithItems",
      function: (ingredients) => {
        return (itemList) => {
          return ingredients.appendItems(itemList);
        };
      }
    },
    ingredientsWithFluids: {
      internalName: "integrateddynamics:ingredients_with_fluids",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Fluid" } },
          to: {
            type: "Ingredients"
          }
        }
      },
      symbol: "Ingr.with_fluids",
      interactName: "ingredientsWithFluids",
      function: (ingredients) => {
        return (fluidList) => {
          return ingredients.appendFluids(fluidList);
        };
      }
    },
    ingredientsWithEnergies: {
      internalName: "integrateddynamics:ingredients_with_energies",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: {
          type: "Function",
          from: { type: "List", listType: { type: "Long" } },
          to: {
            type: "Ingredients"
          }
        }
      },
      symbol: "Ingr.with_energies",
      interactName: "ingredientsWithEnergies",
      function: (ingredients) => {
        return (energyList) => {
          return ingredients.appendEnergies(energyList);
        };
      }
    },
    recipeInput: {
      internalName: "integrateddynamics:recipe_input",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Recipe"
        },
        to: {
          type: "Ingredients"
        }
      },
      symbol: "recipe_in",
      interactName: "recipeInput",
      function: (recipe) => {
        return recipe.getInput();
      }
    },
    recipeOutput: {
      internalName: "integrateddynamics:recipe_output",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Recipe"
        },
        to: {
          type: "Ingredients"
        }
      },
      symbol: "recipe_out",
      interactName: "recipeOutput",
      function: (recipe) => {
        return recipe.getOutput();
      }
    },
    recipeWithInput: {
      internalName: "integrateddynamics:recipe_with_input",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Recipe"
        },
        to: {
          type: "Function",
          from: {
            type: "Ingredients"
          },
          to: {
            type: "Recipe"
          }
        }
      },
      symbol: "Recipe.with_in",
      interactName: "recipeWithInput",
      function: (recipe) => {
        return (ingredients) => {
          return recipe.setInput(ingredients);
        };
      }
    },
    recipeWithOutput: {
      internalName: "integrateddynamics:recipe_with_output",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Recipe"
        },
        to: {
          type: "Function",
          from: {
            type: "Ingredients"
          },
          to: {
            type: "Recipe"
          }
        }
      },
      symbol: "Recipe.with_out",
      interactName: "recipeWithOutput",
      function: (recipe) => {
        return (ingredients) => {
          return recipe.setOutput(ingredients);
        };
      }
    },
    recipeWithInputOutput: {
      internalName: "integrateddynamics:recipe_with_input_output",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Ingredients"
        },
        to: {
          type: "Function",
          from: {
            type: "Ingredients"
          },
          to: {
            type: "Recipe"
          }
        }
      },
      symbol: "Recipe.with_io",
      interactName: "ingredientsWithInputOutput",
      function: (input) => {
        return (output) => {
          return new Recipe(input, output);
        };
      }
    },
    parseBoolean: {
      internalName: "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.boolean",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "Boolean"
        }
      },
      symbol: "parse_boolean",
      interactName: "stringParseAsBoolean",
      function: (value) => {
        const matchArr = new import_re2_wasm.RE2("(F(alse)?|[+-]?(0x|#)?0+|)", "i").match(value) ?? [];
        return !!matchArr[0];
      }
    },
    parseDouble: {
      internalName: "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.double",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 1
        },
        to: {
          type: "Double"
        }
      },
      symbol: "parse_double",
      interactName: "stringParseAsDouble",
      function: (data) => {
        try {
          return new Double(data);
        } catch (e) {
          return new Double(0);
        }
      }
    },
    parseInteger: {
      internalName: "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.integer",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 1
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "parse_integer",
      interactName: "stringParseAsInteger",
      function: (data) => {
        try {
          return new Integer(data);
        } catch (e) {
          return new Integer(0);
        }
      }
    },
    parseLong: {
      internalName: "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.long",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 1
        },
        to: {
          type: "Long"
        }
      },
      symbol: "parse_long",
      interactName: "stringParseAsLong",
      function: (data) => {
        try {
          return new Long(data);
        } catch (e) {
          return new Long(0);
        }
      }
    },
    parseNBT: {
      internalName: "integrateddynamics:operator.integrateddynamics.parse.valuetype.integrateddynamics.nbt",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "String"
        },
        to: {
          type: "NBT"
        }
      },
      symbol: "parse_nbt",
      interactName: "stringParseAsNbt",
      function: (data) => {
        return CompoundTag.fromJSON(data);
      }
    },
    choice: {
      internalName: "integrateddynamics:general_choice",
      nicknames: ["generalChoice"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Boolean"
        },
        to: {
          type: "Function",
          from: {
            type: "Any",
            typeID: 1
          },
          to: {
            type: "Function",
            from: {
              type: "Any",
              typeID: 1
            },
            to: {
              type: "Any",
              typeID: 1
            }
          }
        }
      },
      symbol: "?",
      interactName: "booleanChoice",
      function: (bool) => {
        return (trueValue) => {
          return (falseValue) => {
            return bool ? trueValue : falseValue;
          };
        };
      }
    },
    generalIdentity: {
      internalName: "integrateddynamics:general_identity",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 1
        },
        to: {
          type: "Any",
          typeID: 1
        }
      },
      symbol: "id",
      interactName: "anyIdentity",
      function: (value) => {
        return value;
      }
    },
    generalConstant: {
      internalName: "integrateddynamics:general_constant",
      nicknames: [],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Any",
          typeID: 1
        },
        to: {
          type: "Function",
          from: {
            type: "Any",
            typeID: 2
          },
          to: {
            type: "Any",
            typeID: 1
          }
        }
      },
      symbol: "K",
      interactName: "anyConstant",
      function: (value) => {
        return () => {
          return value;
        };
      }
    },
    integerToDouble: {
      internalName: "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_double",
      nicknames: ["intToDouble", "integerDouble"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Double"
        }
      },
      symbol: "()",
      interactName: "integerIntegerToDouble",
      function: (int) => {
        return int.toDouble();
      }
    },
    integerToLong: {
      internalName: "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_integer__integrateddynamics_long",
      nicknames: ["intToLong", "integerLong"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Integer"
        },
        to: {
          type: "Long"
        }
      },
      symbol: "()",
      interactName: "integerIntegerToLong",
      function: (int) => {
        return int.toLong();
      }
    },
    doubleToInteger: {
      internalName: "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_integer",
      nicknames: ["doubleToInt", "doubleInteger"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Double"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "()",
      interactName: "doubleDoubleToInteger",
      function: (double) => {
        return double.toInteger();
      }
    },
    doubleToLong: {
      internalName: "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_double__integrateddynamics_long",
      nicknames: ["doubleToLong"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Double"
        },
        to: {
          type: "Long"
        }
      },
      symbol: "()",
      interactName: "doubleDoubleToLong",
      function: (double) => {
        return double.toLong();
      }
    },
    longToInteger: {
      internalName: "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_integer",
      nicknames: ["longToInt", "longInteger"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Long"
        },
        to: {
          type: "Integer"
        }
      },
      symbol: "()",
      interactName: "longLongToInteger",
      function: (long) => {
        return long.toInteger();
      }
    },
    longToDouble: {
      internalName: "integrateddynamics:operator.integrateddynamics.castintegrateddynamics_long__integrateddynamics_double",
      nicknames: ["longToDouble", "longDouble"],
      parsedSignature: {
        type: "Function",
        from: {
          type: "Long"
        },
        to: {
          type: "Double"
        }
      },
      symbol: "()",
      interactName: "longLongToDouble",
      function: (long) => {
        return long.toDouble();
      }
    }
  };
  var operatorRegistry = new OperatorRegistry();
  for (const [k, v] of Object.entries(operatorRegistryRawData)) {
    operatorRegistry.register(k, v, globalMap);
  }

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
