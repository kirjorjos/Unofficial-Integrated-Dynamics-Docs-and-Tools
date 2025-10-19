import { JavaMath } from "HelperClasses/Math";

export class Integer implements NumberBase<Integer> {

  bits!: TypeInt32;

  constructor(data: TypeNumericString | TypeInt32 | number) {
    if (!Array.isArray(data)) this.bits = this.initializeBits(data);
    if (Array.isArray(data)) this.bits = data;
  }

  initializeBits(decimal: TypeNumericString | number): TypeInt32 {
    if (typeof decimal === "number") {
      decimal = decimal.toString() as TypeNumericString;
    }
    const negative = decimal.startsWith("-");
    const abs = negative
      ? (decimal.slice(1) as TypeNumericString)
      : (decimal as TypeNumericString);

    let bin = JavaMath.decimalToBinary(abs).padStart(32, "0");
    if (bin.length > 32) bin = bin.slice(-32);

    let bits = bin.split("").map((d) => (d === "1" ? 1 : 0)) as TypeBit[];

    if (negative) bits = JavaMath.twosComplement(bits);

    return bits as TypeInt32;
  }

  getBits(): TypeInt32 {
    return this.bits;
  }

  getType(): "Integer" {
    return "Integer"
  }

  getOrder(): 0 {
    return 0;
  }

  // Integer → Long
  toLong(): Promise<Long> {
    const sign = this.bits[0];
    const longBits = Array(32)
      .fill(sign as 0 | 1)
      .concat(this.bits) as TypeInt64;
    return import("./Long").then(obj => {return new obj.Long(longBits)});
  }

  // Integer → Double
  toDouble(): Promise<Double> {
    const n = JavaMath.bitsToSignedDecimal(this.bits) as TypeNumericString; // safe, 32-bit fits in JS Number
    return import("./Double").then(obj => {return new obj.Double(n)});
  }

  toInteger(): Promise<Integer> {
    return new Promise(resolve => 
      resolve(new Integer(this.bits as TypeInt32))
    )
  }

  add(num: Integer): Integer {
    const a = num.getBits() as TypeInt32;
    const b = this.getBits() as TypeInt32;
    const result = Integer.bitwiseAdd(a, b);
    return new Integer(result);
  }

  private static bitwiseAdd(a: TypeInt32, b: TypeInt32): TypeInt32 {
    const result: TypeBit[] = new Array(32).fill(0);

    let carry = 0;
    for (let i = 31; i >= 0; i--) {
      const sum = (a[i] as TypeBit) + (b[i] as TypeBit) + carry;
      result[i] = (sum & 1) as TypeBit;
      carry = sum >> 1;
    }

    return result as TypeInt32;
  }

  subtract(num: Integer): Integer {
    const a = num.getBits() as TypeInt32;
    let b = this.getBits() as TypeInt32;
    b = b.map((x: number) => x ^ 1) as TypeInt32;
    const bPlus1 = Integer.bitwiseAdd(b, [
      ...Array(31).fill(0),
      1,
    ] as unknown as TypeInt32);
    return new Integer(Integer.bitwiseAdd(a, bPlus1));
  }
}