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
    return "".padStart(64, "0").split("") as unknown as TypeInt64;
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

  // Double → Long
  toLong(): Promise<Long> {
    const n = Math.trunc(this.value); // Java semantics: truncate toward zero
    return import("./Long").then(obj => {return new obj.Long(n.toString() as TypeNumericString)});
  }

  // Double → Integer
  toInteger(): Promise<Integer> {
    const n = Math.trunc(this.value); // safe for 32-bit
    return import("./Integer").then(obj => {return new obj.Integer(n.toString() as TypeNumericString)});
  }

  toDouble(): Promise<Double> {
    return new Promise(resolve =>
      resolve(new Double(`${this.value}` as TypeNumericString))
    )
  }

  toDecimal(): number {
    return this.value;
  }

  add(num: Double): Double {
    return new Double((num.value + this.value + "") as TypeNumericString);
  }

  subtract(num: Double): Double {
    return new Double((num.value - this.value + "") as TypeNumericString)
  }
}
