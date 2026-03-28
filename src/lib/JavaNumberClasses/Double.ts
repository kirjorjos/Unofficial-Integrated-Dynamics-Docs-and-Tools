import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "lib/JavaNumberClasses/Integer";
import { Long } from "lib/JavaNumberClasses/Long";
import { ParsedSignature } from "lib/HelperClasses/ParsedSignature";
import { Named } from "lib/IntegratedDynamicsClasses/Named";
import { iString } from "lib/IntegratedDynamicsClasses/typeWrappers/iString";

export class Double implements NumberBase<Double>, Named {
  private _signatureCache: ParsedSignature | null = null;
  private num: number;

  constructor(data: string | number | Double) {
    if (data instanceof Double) data = data.num;
    if (typeof data === "string") data = Double.parseDouble(data);
    this.num = data;
  }

  static ZERO = new Double(0);

  getType(): "Double" {
    return "Double";
  }

  getOrder(): 2 {
    return 2;
  }

  toDecimal() {
    return `${this.num}`;
  }

  // Double → Double
  toLong(): Long {
    return new Long(this.num);
  }

  // Double → Integer
  toInteger(): Integer {
    return new Integer(this.num);
  }

  toDouble(): Double {
    return new Double(this.num);
  }

  toString(): TypeNumericString {
    return `${this.num}`;
  }

  leftShift(num: Integer): Double {
    return new Double(this.num << num.toJSNumber());
  }

  add(num: TypeNumber): Double {
    return new Double(this.num + num.toJSNumber());
  }

  subtract(num: TypeNumber): Double {
    return new Double(this.num - num.toJSNumber());
  }

  multiply(num: TypeNumber): Double {
    return new Double(this.num * num.toJSNumber());
  }

  divide(num: TypeNumber): Double {
    if (num.toJSNumber() === 0) {
      throw new Error("Division by zero");
    }
    return new Double(this.num / num.toJSNumber());
  }

  mod(num: TypeNumber): Double {
    if (num.toJSNumber() === 0) {
      throw new Error("Division by zero");
    }
    return new Double(this.num % num.toJSNumber());
  }

  sqrt(): Double {
    return new Double(Math.sqrt(this.num));
  }

  pow(exponent: TypeNumber): Double {
    return new Double(Math.pow(this.num, exponent.toJSNumber()));
  }

  max(num: TypeNumber): Double {
    return this.gt(num) ? this : num.toDouble();
  }

  min(num: TypeNumber): Double {
    return this.lt(num) ? this : num.toDouble();
  }

  lt(num: TypeNumber): boolean {
    return this.num < num.toJSNumber();
  }

  lte(num: TypeNumber): boolean {
    return this.num <= num.toJSNumber();
  }

  gt(num: TypeNumber): boolean {
    return this.num > num.toJSNumber();
  }

  gte(num: TypeNumber): boolean {
    return this.num >= num.toJSNumber();
  }

  equals(num: IntegratedValue): iBoolean {
    if (!(num instanceof Double)) return new iBoolean(false);
    return new iBoolean(this.num === num.num);
  }

  round(): Integer {
    return new Integer(Math.round(this.num));
  }

  ceil(): Integer {
    return new Integer(Math.ceil(this.num));
  }

  floor(): Integer {
    return new Integer(Math.floor(this.num));
  }

  getSignatureNode(): ParsedSignature {
    if (this._signatureCache) {
      return this._signatureCache;
    }
    const newSignature = new ParsedSignature({ type: "Double" }, false);
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

  private static parseDouble(s: string): number {
    s = s.trim();
    if (s.length === 0) {
      throw new Error("Zero length string");
    }

    const infinityMatch = s.match(/^([+-])?\s*(Infinity|inf|\u221e)$/i);
    if (infinityMatch) {
      const sign = infinityMatch[1] === "-" ? -1 : 1;
      return sign * Infinity;
    }

    let negative = false;
    let numPart = s;
    if (s.startsWith("-")) {
      negative = true;
      numPart = s.substring(1);
    } else if (s.startsWith("+")) {
      numPart = s.substring(1);
    }

    if (numPart.startsWith("#")) {
      numPart = "0x" + numPart.substring(1);
    }

    const result = Number(numPart);

    if (isNaN(result)) {
      throw new Error(`Invalid number format for string "${s}"`);
    }

    return negative ? -result : result;
  }
}
