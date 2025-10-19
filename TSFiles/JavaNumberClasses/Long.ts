import { JavaMath } from "HelperClasses/Math";

export class Long implements NumberBase<Long> {

  bits!: TypeInt64;

  constructor(data: TypeNumericString | TypeInt64) {
    if (!Array.isArray(data)) this.bits = this.initializeBits(data);
    if (Array.isArray(data)) this.bits = data;
  }

  initializeBits(decimal: string): TypeInt64 {
    const negative = decimal.startsWith("-");
    const abs = negative
      ? (decimal.slice(1) as TypeNumericString)
      : (decimal as TypeNumericString);

    let bin = JavaMath.decimalToBinary(abs).padStart(64, "0");
    if (bin.length > 64) bin = bin.slice(-64);

    let bits = bin.split("").map((d) => (d === "1" ? 1 : 0)) as TypeInt64;

    if (negative) bits = JavaMath.twosComplement(bits) as TypeInt64;

    return bits;
  }

  getBits(): TypeInt64 {
    return this.bits;
  }

  getType(): "Long" {
    return "Long";
  }

  getOrder(): 1 {
    return 1;
  }

  // Long → Integer
  toInteger(): Promise<Integer> {
    const intBits = this.bits.slice(32) as TypeInt32; // low 32 bits
    return import("./Integer").then(obj => {return new obj.Integer(intBits)});
  }

  // Long → Double
  toDouble(): Promise<Double> {
    const n = JavaMath.bitsToSignedDecimal(this.bits) as TypeNumericString;
    return import("./Double").then(obj => {return new obj.Double(n)});
  }

  toLong(): Promise<Long> {
    return new Promise(resolve => 
      resolve(new Long(this.bits as TypeInt64))
    )
  }

  add(num: Long): Long {
    const a = num.getBits() as TypeInt64;
    const b = this.getBits() as TypeInt64;
    const result = Long.bitwiseAdd(a, b);
    return new Long(result);
  }

  private static bitwiseAdd(a: TypeInt64, b: TypeInt64): TypeInt64 {
    const result: TypeBit[] = new Array(64).fill(0);

    let carry = 0;
    for (let i = 63; i >= 0; i--) {
      const sum = (a[i] as TypeBit) + (b[i] as TypeBit) + carry;
      result[i] = (sum & 1) as TypeBit;
      carry = sum >> 1;
    }

    return result as TypeInt64;
  }

  subtract(num: Long): Long {
    const a = num.getBits() as TypeInt64;
    let b = this.getBits() as TypeInt64;
    b = b.map((x: number) => x ^ 1) as TypeInt64;
    const bPlus1 = Long.bitwiseAdd(b, [
      ...Array(31).fill(0),
      1,
    ] as unknown as TypeInt64);
    return new Long(Long.bitwiseAdd(a, bPlus1));
  }
}

