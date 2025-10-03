import { TypeBit, TypeInt32, TypeInt64, TypeNumericString } from "../types";
import { Double } from "./Double";
import { Integer } from "./Integer";
import { NumberBase } from "./NumberBase";

export class Long extends NumberBase {
  public constructor(data: TypeNumericString | TypeInt64) {
    super();
    if (!Array.isArray(data)) this.bits = this.initializeBits(data);
    if (Array.isArray(data)) this.bits = data;
    this.type = "Long";
    this.order = 1;
  }

  protected initializeBits(decimal: string): TypeInt64 {
    const negative = decimal.startsWith("-");
    const abs = negative
      ? (decimal.slice(1) as TypeNumericString)
      : (decimal as TypeNumericString);

    let bin = Long.decimalToBinary(abs).padStart(64, "0");
    if (bin.length > 64) bin = bin.slice(-64);

    let bits = bin.split("").map((d) => (d === "1" ? 1 : 0)) as TypeInt64;

    if (negative) bits = Long.twosComplement(bits) as TypeInt64;

    return bits;
  }

  // Long → Integer
  public toInteger(): Integer {
    const intBits = this.bits.slice(32) as TypeInt32; // low 32 bits
    return new Integer(intBits);
  }

  // Long → Double
  public toDouble(): Double {
    const n = Long.bitsToSignedDecimal(this.bits) as TypeNumericString;
    return new Double(n);
  }

  public static add(rawNum1: NumberBase, rawNum2: NumberBase): Long {
    let num1 = rawNum1 as Long;
    let num2 = rawNum2 as Long;
    const a = rawNum1.getBits() as TypeInt64;
    const b = rawNum2.getBits() as TypeInt64;
    const result = Long.bitwiseAdd(a, b);
    return new Long(result);
  }

  private static bitwiseAdd(a: TypeInt64, b: TypeInt64): TypeInt64 {
    const result: TypeBit[] = new Array(64).fill(0);

    let carry = 0;
    for (let i = 63; i >= 0; i--) {
      const sum = a[i] + b[i] + carry;
      result[i] = (sum & 1) as TypeBit;
      carry = sum >> 1;
    }

    return result as TypeInt64;
  }

  public static subtract(rawNum1: NumberBase, rawNum2: NumberBase): Long {
    let num1 = rawNum1 as Long;
    let num2 = rawNum2 as Long;
    const a = rawNum1.getBits() as TypeInt64;
    let b = rawNum2.getBits() as TypeInt64;
    b = b.map((x) => x ^ 1) as TypeInt64;
    const bPlus1 = Long.bitwiseAdd(b, [
      ...Array(31).fill(0),
      1,
    ] as unknown as TypeInt64);
    return new Long(Long.bitwiseAdd(a, bPlus1));
  }
}
