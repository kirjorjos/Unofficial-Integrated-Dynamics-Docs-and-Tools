import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Double } from "./Double";
import { Integer } from "./Integer";

export class Long implements NumberBase<Long> {
  private num: bigint;

  constructor(data: string | bigint | Long | number) {
    if (typeof data === "string") data = Long.parseLong(data);
    if (data instanceof Long) data = data.num;

    if (typeof data === "number") {
      this.num = Long.limitToLong(data);
    } else {
      this.num = BigInt.asIntN(64, BigInt(data));
    }
  }

  private static limitToLong(num: number | bigint): bigint {
    return BigInt.asIntN(64, BigInt(num));
  }

  static ZERO = new Long(0);

  getType(): "Long" {
    return "Long";
  }

  getOrder(): 1 {
    return 1;
  }

  toType(value: TypeNumber) {
    return value.toLong();
  }

  toDecimal() {
    return `${this.num}`;
  }

  // Long → Integer
  toInteger(): Integer {
    return new Integer(this.toString());
  }

  // Long → Double
  toDouble(): Double {
    return new Double(this.toString());
  }

  toLong(): Long {
    return new Long(this.num);
  }

  toString(): TypeNumericString {
    return this.num.toString() as TypeNumericString;
  }

  add(num: TypeNumber): Long {
    return new Long(this.num + num.toLong().num);
  }

  subtract(num: TypeNumber): Long {
    return new Long(this.num - num.toLong().num);
  }

  multiply(num: TypeNumber): Long {
    return new Long(this.num * num.toLong().num);
  }

  divide(num: TypeNumber): Long {
    return new Long(this.num / num.toLong().num);
  }

  mod(num: TypeNumber): Long {
    return new Long(this.num % num.toLong().num);
  }

  max(num: TypeNumber): Long {
    return this.gt(num) ? this : num.toLong();
  }

  min(num: TypeNumber): Long {
    return this.lt(num) ? this : num.toLong();
  }

  leftShift(num: Integer): Long {
    return new Long(this.num << num.toLong().num);
  }

  lt(num: TypeNumber): boolean {
    return this.num < num.toLong().num;
  }

  lte(num: TypeNumber): boolean {
    return this.num <= num.toLong().num;
  }

  gt(num: TypeNumber): boolean {
    return this.num > num.toLong().num;
  }

  gte(num: TypeNumber): boolean {
    return this.num >= num.toLong().num;
  }

  equals(num: IntegratedValue): iBoolean {
    if (!(num instanceof Long)) return new iBoolean(false);
    return new iBoolean(this.num === num.toLong().num);
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

  getSignatureNode(): { type: "Long" } {
    return { type: "Long" };
  }

  toJSNumber(): number {
    return parseInt(this.num.toString());
  }

  compact(): string {
    const n = this.toJSNumber();
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

  private static parseLong(s: string): bigint {
    s = s.trim();
    if (s.length === 0) {
      throw new Error("Zero length string");
    }
    let i = 0;
    let negative = false;
    const firstChar = s.charAt(0);
    if (firstChar === "-") {
      negative = true;
      i++;
    } else if (firstChar === "+") {
      i++;
    }

    let numStr = s.substring(i);
    let radix = 10;

    if (numStr.toLowerCase().startsWith("0x")) {
      radix = 16;
    } else if (numStr.startsWith("#")) {
      radix = 16;
      numStr = "0x" + numStr.substring(1);
    } else if (numStr.startsWith("0") && numStr.length > 1) {
      let isOctal = true;
      for (const char of numStr) {
        if (char < "0" || char > "7") {
          isOctal = false;
          break;
        }
      }
      if (isOctal) {
        radix = 8;
        numStr = "0o" + numStr;
      }
    }

    let result: bigint;
    try {
      result = BigInt(numStr);
    } catch (e) {
      throw new Error(`Invalid number format for string "${s}"`);
    }

    if (negative) {
      result = -result;
    }

    if (radix === 10) {
      const minLong = -9223372036854775808n;
      const maxLong = 9223372036854775807n;
      if (result < minLong || result > maxLong) {
        throw new Error(`Value "${s}" is out of range for a 64-bit long`);
      }
    }
    return result;
  }
}
