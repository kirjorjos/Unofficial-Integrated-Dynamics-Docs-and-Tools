import { Integer } from "./Integer";

export class Double implements NumberBase<Double> {
  value: number;

  constructor(decimal: TypeNumericString | number) {
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
  toLong(): Promise<Long> {
    const n = Math.trunc(this.value); // Java semantics: truncate toward zero
    return import("./Long").then((obj) => {
      return new obj.Long(n.toString() as TypeNumericString);
    });
  }

  // Double → Integer
  toInteger(): Promise<Integer> {
    const n = Math.trunc(this.value); // safe for 32-bit
    return import("./Integer").then((obj) => {
      return new obj.Integer(n.toString() as TypeNumericString);
    });
  }

  toDouble(): Promise<Double> {
    return new Promise((resolve) =>
      resolve(new Double(`${this.value}` as TypeNumericString))
    );
  }

  toDecimal(): TypeNumericString {
    return `${this.value}`;
  }

  leftShift(num: Integer): Double {
    return new Double(this.value << parseInt(num.toDecimal()));
  }

  add(num: Double): Double {
    return new Double(this.value + parseInt(num.toDecimal()));
  }

  subtract(num: Double): Double {
    return new Double(this.value - parseInt(num.toDecimal()));
  }

  multiply(num: Double): Double {
    return new Double(this.value * parseInt(num.toDecimal()));
  }

  divide(num: Double): Double {
    return new Double(this.value / parseInt(num.toDecimal()));
  }

  mod(num: Double): Double {
    return new Double(this.value % parseInt(num.toDecimal()));
  }

  sqrt(): Double {
    return new Double(Math.sqrt(this.value));
  }

  pow(exponent: Double): Double {
    return new Double(Math.pow(this.value, parseInt(exponent.toDecimal())));
  }

  async max(num: Double): Promise<Double> {
    return (await this.gt(num)) ? this : num;
  }

  async min(num: Double): Promise<Double> {
    return (await this.lt(num)) ? this : num;
  }

  async lt(num: Double): Promise<boolean> {
    return this.value < parseInt(num.toDecimal());
  }

  async lte(num: Double): Promise<boolean> {
    return this.value <= parseInt(num.toDecimal());
  }

  async gt(num: Double): Promise<boolean> {
    return this.value > parseInt(num.toDecimal());
  }

  async gte(num: Double): Promise<boolean> {
    return this.value >= parseInt(num.toDecimal());
  }

  equals(num: Double): boolean {
    return `${this.value}` === num.toDecimal();
  }

  async round(): Promise<Integer> {
    return new Integer(Math.round(this.value));
  }

  async ceil(): Promise<Integer> {
    return new Integer(Math.ceil(this.value));
  }

  async floor(): Promise<Integer> {
    return new Integer(Math.floor(this.value));
  }
}
