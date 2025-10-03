import { TypeBit, TypeInt32, TypeInt64, TypeNumericString } from "../types";
import { Double } from "./Double";
import { Long } from "./Long";
import { NumberBase } from "./NumberBase";

export class Integer extends NumberBase {
  public constructor(data: TypeNumericString | TypeInt32) {
    super();
    if (!Array.isArray(data)) this.bits = this.initializeBits(data);
    if (Array.isArray(data)) this.bits = data;
    this.type = "Integer";
    this.order = 0;
  }

  protected initializeBits(decimal: TypeNumericString): TypeInt32 {
    const negative = decimal.startsWith("-");
    const abs = negative
      ? (decimal.slice(1) as TypeNumericString)
      : (decimal as TypeNumericString);

    let bin = NumberBase.decimalToBinary(abs).padStart(32, "0");
    if (bin.length > 32) bin = bin.slice(-32);

    let bits = bin.split("").map((d) => (d === "1" ? 1 : 0)) as TypeBit[];

    if (negative) bits = NumberBase.twosComplement(bits);

    return bits as TypeInt32;
  }

  // Integer → Long
  public toLong(): Long {
    const sign = this.bits[0];
    const longBits = Array(32)
      .fill(sign as 0 | 1)
      .concat(this.bits) as TypeInt64;
    return new Long(longBits);
  }

  // Integer → Double
  public toDouble(): Double {
    const n = Integer.bitsToSignedDecimal(this.bits) as TypeNumericString; // safe, 32-bit fits in JS Number
    return new Double(n);
  }

  public static add(rawNum1: NumberBase, rawNum2: NumberBase): Integer {
    let num1 = rawNum1 as Integer;
    let num2 = rawNum2 as Integer;
    const a = rawNum1.getBits() as TypeInt32;
    const b = rawNum2.getBits() as TypeInt32;
    const result = Integer.bitwiseAdd(a, b);
    return new Integer(result);
  }

  private static bitwiseAdd(a: TypeInt32, b: TypeInt32): TypeInt32 {
    const result: TypeBit[] = new Array(32).fill(0);

    let carry = 0;
    for (let i = 31; i >= 0; i--) {
      const sum = a[i] + b[i] + carry;
      result[i] = (sum & 1) as TypeBit;
      carry = sum >> 1;
    }

    return result as TypeInt32;
  }

  public static subtract(rawNum1: NumberBase, rawNum2: NumberBase): Integer {
    let num1 = rawNum1 as Integer;
    let num2 = rawNum2 as Integer;
    const a = rawNum1.getBits() as TypeInt32;
    let b = rawNum2.getBits() as TypeInt32;
    b = b.map((x) => x ^ 1) as TypeInt32;
    const bPlus1 = Integer.bitwiseAdd(b, [
      ...Array(31).fill(0),
      1,
    ] as unknown as TypeInt32);
    return new Integer(Integer.bitwiseAdd(a, bPlus1));
  }
}
