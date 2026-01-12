import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Long } from "./Long";
import { Double } from "./Double";

export class Integer implements NumberBase<Integer> {
  readonly num: number;

  constructor(num: TypeNumericString | number | Integer) {
    if (num instanceof Integer) num = num.toJSNumber();
    if (typeof num === "string") num = parseInt(num);
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
    return new Integer(this.toJSNumber() / num.toJSNumber());
  }

  mod(num: TypeNumber): Integer {
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

  getSignatureNode(): { type: "Integer" } {
    return { type: "Integer" };
  }

  toJSNumber(): number {
    return this.toJSNumber();
  }
}
