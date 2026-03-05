import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Long } from "./Long";
import { Double } from "./Double";
import { ParsedSignature } from "HelperClasses/ParsedSignature";
import { Named } from "IntegratedDynamicsClasses/Named";
import { iString } from "IntegratedDynamicsClasses/typeWrappers/iString";

export class Integer implements NumberBase<Integer>, Named {
  private _signatureCache: ParsedSignature | null = null;
  readonly num: number;

  constructor(num: string | number | Integer) {
    if (num instanceof Integer) num = num.toJSNumber();
    if (typeof num === "string") num = Integer.parseInteger(num);
    this.num = Integer.limitToInteger(num);
  }

  private static limitToInteger(num: number) {
    if (!Number.isFinite(num)) return 0;
    return Math.trunc(num) >> 0;
  }

  static ZERO = new Integer(0);
  static ONE = new Integer(1);
  static SIXTY_FOUR = new Integer(64);
  static MAX_INT = new Integer(2147483647);

  getType(): "Integer" {
    return "Integer";
  }

  getOrder(): 0 {
    return 0;
  }

  toType(value: TypeNumber) {
    return value.toInteger();
  }

  toDecimal() {
    return `${this.num}`;
  }

  // Integer → Long
  toLong(): Long {
    return new Long(BigInt(this.toJSNumber()));
  }

  // Integer → Double
  toDouble(): Double {
    return new Double(this.toJSNumber());
  }

  toInteger(): Integer {
    return new Integer(this.toJSNumber());
  }

  toString(): TypeNumericString {
    return `${this.toJSNumber()}`;
  }

  add(num: TypeNumber): Integer {
    return new Integer(this.toJSNumber() + num.toJSNumber());
  }

  subtract(num: TypeNumber): Integer {
    return new Integer(this.toJSNumber() - num.toJSNumber());
  }

  multiply(num: TypeNumber): Integer {
    return new Integer(this.toJSNumber() * num.toJSNumber());
  }

  divide(num: TypeNumber): Integer {
    if (num.toJSNumber() === 0) {
      throw new Error("Division by zero");
    }
    return new Integer(this.toJSNumber() / num.toJSNumber());
  }

  mod(num: TypeNumber): Integer {
    if (num.toJSNumber() === 0) {
      throw new Error("Division by zero");
    }
    return new Integer(this.toJSNumber() % num.toJSNumber());
  }

  binaryAnd(num: Integer): Integer {
    return new Integer(this.toJSNumber() & num.toJSNumber());
  }

  binaryOr(num: Integer): Integer {
    return new Integer(this.toJSNumber() | num.toJSNumber());
  }

  binaryXor(num: Integer): Integer {
    return new Integer(this.toJSNumber() ^ num.toJSNumber());
  }

  binaryComplement(): Integer {
    return new Integer(~this.toJSNumber());
  }

  leftShift(num: Integer): Integer {
    return new Integer(this.toJSNumber() << num.toJSNumber());
  }

  rightShift(places: Integer) {
    return new Integer(this.toJSNumber() >> places.num);
  }

  unsignedRightShift(places: Integer) {
    return new Integer(this.toJSNumber() >>> places.num);
  }

  max(num: TypeNumber): Integer {
    return this.gt(num) ? this : num.toInteger();
  }

  min(num: TypeNumber): Integer {
    return this.lt(num) ? this : num.toInteger();
  }

  lt(num: TypeNumber): boolean {
    return this.toJSNumber() < num.toJSNumber();
  }

  lte(num: TypeNumber): boolean {
    return this.toJSNumber() <= num.toJSNumber();
  }

  gt(num: TypeNumber): boolean {
    return this.toJSNumber() > num.toJSNumber();
  }

  gte(num: TypeNumber): boolean {
    return this.toJSNumber() >= num.toJSNumber();
  }

  equals(num: IntegratedValue): iBoolean {
    if (!(num instanceof Integer)) return new iBoolean(false);
    return new iBoolean(this.toJSNumber() === num.toJSNumber());
  }

  round(): Integer {
    return this.toInteger();
  }

  ceil(): Integer {
    return this.toInteger();
  }

  floor(): Integer {
    return this.toInteger();
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Integer" }, false);
    this._signatureCache = newSignature;
    return newSignature;
  }

  getName(): iString {
    return new iString(this.compact());
  }

  toJSNumber(): number {
    return this.num;
  }

  compact(): string {
    const n = this.num;
    if (n >= 1000000) {
      const val = n / 1000000;
      return val.toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (n >= 1000) {
      const val = n / 1000;
      return val.toFixed(1).replace(/\.0$/, "") + "K";
    }
    return n.toString();
  }

  private static parseInteger(s: string): number {
    s = s.trim();
    if (s.length === 0) {
      throw new Error("Zero length string");
    }
    let i = 0;
    let radix = 10;
    let negative = false;

    const firstChar = s.charAt(0);
    if (firstChar === "-") {
      negative = true;
      i++;
    } else if (firstChar === "+") {
      i++;
    }

    if (s.toLowerCase().startsWith("0x", i)) {
      i += 2;
      radix = 16;
    } else if (s.startsWith("#", i)) {
      i++;
      radix = 16;
    } else if (s.startsWith("0", i) && s.length > i + 1) {
      i++;
      radix = 8;
    }

    const numStr = s.substring(i);
    const result = parseInt(numStr, radix);

    if (isNaN(result)) {
      throw new Error("Invalid number format");
    }

    const finalResult = negative ? -result : result;

    if ((finalResult | 0) !== finalResult) {
      throw new Error(`Value "${s}" is out of range for a 32-bit integer`);
    }

    return finalResult;
  }
}
