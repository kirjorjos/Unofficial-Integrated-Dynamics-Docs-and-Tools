import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "./Integer";
import { Long } from "./Long";

export class Double implements NumberBase<Double> {
  private num: number;

  constructor(data: TypeNumericString | number | Double) {
    if (data instanceof Double) data = data.num;
    if (typeof data === "string") data = parseFloat(data);
    this.num = data;
  }

  static ZERO = new Double(0);

  getType(): "Double" {
    return "Double";
  }

  getOrder(): 2 {
    return 2;
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
    return new Double(this.num / num.toJSNumber());
  }

  mod(num: TypeNumber): Double {
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

  getSignatureNode(): { type: "Double" } {
    return { type: "Double" };
  }

  toJSNumber(): number {
    return this.num;
  }
}
