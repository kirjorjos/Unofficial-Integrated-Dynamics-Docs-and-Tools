import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "./Integer";
import { Long } from "./Long";

export class Double implements NumberBase<Double> {
  value: number;

  constructor(decimal: TypeNumericString | number | Double) {
    if (decimal instanceof Double) decimal = decimal.toDecimal();
    if (typeof decimal === "number") {
      this.value = decimal;
    } else {
      this.value = parseInt(decimal);
    }
    this.initializeBits();
  }

  initializeBits(): TypeInt64 {
    return new Array(64).fill(0) as TypeInt64;
  }

  getBits(): TypeInt64 {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, this.value, false);

    const bits: number[] = [];
    for (let byteIndex = 0; byteIndex < 8; byteIndex++) {
      const byte = view.getUint8(byteIndex);
      for (let bitIndex = 7; bitIndex >= 0; bitIndex--) {
        bits.push((byte >> bitIndex) & 1);
      }
    }

    return bits as TypeInt64;
  }

  getType(): "Double" {
    return "Double";
  }

  getOrder(): 2 {
    return 2;
  }

  // Double → Double
  toLong(): Long {
    const n = Math.trunc(this.value); // Java semantics: truncate toward zero
    return new Long(n.toString() as TypeNumericString);
  }

  // Double → Integer
  toInteger(): Integer {
    const n = Math.trunc(this.value); // safe for 32-bit
    return new Integer(n.toString() as TypeNumericString);
  }

  toDouble(): Double {
    return new Double(`${this.value}` as TypeNumericString);
  }

  toDecimal(): TypeNumericString {
    return `${this.value}`;
  }

  leftShift(num: Integer): Double {
    return new Double(this.value << num.toJSNumber());
  }

  add(num: Double): Double {
    return new Double(this.value + num.toJSNumber());
  }

  subtract(num: Double): Double {
    return new Double(this.value - num.toJSNumber());
  }

  multiply(num: Double): Double {
    return new Double(this.value * num.toJSNumber());
  }

  divide(num: Double): Double {
    return new Double(this.value / num.toJSNumber());
  }

  mod(num: Double): Double {
    return new Double(this.value % num.toJSNumber());
  }

  sqrt(): Double {
    return new Double(Math.sqrt(this.value));
  }

  pow(exponent: Double): Double {
    return new Double(Math.pow(this.value, exponent.toJSNumber()));
  }

  max(num: Double): Double {
    return this.gt(num) ? this : num;
  }

  min(num: Double): Double {
    return this.lt(num) ? this : num;
  }

  lt(num: Double): boolean {
    return this.value < num.toJSNumber();
  }

  lte(num: Double): boolean {
    return this.value <= num.toJSNumber();
  }

  gt(num: Double): boolean {
    return this.value > num.toJSNumber();
  }

  gte(num: Double): boolean {
    return this.value >= num.toJSNumber();
  }

  equals(num: IntegratedValue): iBoolean {
    if (!(num instanceof Double)) return new iBoolean(false);
    return new iBoolean(`${this.value}` === num.toDecimal());
  }

  round(): Integer {
    return new Integer(Math.round(this.value));
  }

  ceil(): Integer {
    return new Integer(Math.ceil(this.value));
  }

  floor(): Integer {
    return new Integer(Math.floor(this.value));
  }

  getSignatureNode(): { type: "Double" } {
    return { type: "Double" };
  }

  toJSNumber(): number {
    return this.value;
  }
}
