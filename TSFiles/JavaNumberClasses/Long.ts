import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Double } from "./Double";
import { Integer } from "./Integer";

export class Long implements NumberBase<Long> {
  private num: bigint;

  constructor(data: TypeNumericString | bigint | Long | number) {
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

  getType(): "Long" {
    return "Long";
  }

  getOrder(): 1 {
    return 1;
  }

  toType(value: TypeNumber) {
    return value.toLong();
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
}
