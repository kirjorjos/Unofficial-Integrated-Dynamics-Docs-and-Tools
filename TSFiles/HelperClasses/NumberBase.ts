import {
  TypeBit,
  TypeInt32,
  TypeInt64,
  TypeNumber,
  TypeNumericString,
} from "../types.ts";
import { Double } from "../JavaNumberClasses/Double.ts";
import { Integer } from "../JavaNumberClasses/Integer.ts";
import { Long } from "../JavaNumberClasses/Long.ts";

type TypeNumberClassName = "Integer" | "Long" | "Double";

export abstract class NumberBase {
  protected type!: TypeNumberClassName;
  protected order!: 0 | 1 | 2;
  protected bits!: TypeInt32 | TypeInt64;
  private static classMap = { Integer, Long, Double } as const;

  protected abstract initializeBits(
    decimal: TypeNumericString
  ): TypeInt32 | TypeInt64;

  protected static divmod2(
    decimal: TypeNumericString
  ): [TypeNumericString, number] {
    let quotient = "";
    let carry = 0;
    for (let i = 0; i < decimal.length; i++) {
      const digit = carry * 10 + parseInt(decimal[i], 10);
      const q = Math.floor(digit / 2);
      carry = digit % 2;
      if (!(quotient === "" && q === 0)) quotient += q.toString();
    }
    return [quotient === "" ? "0" : (quotient as TypeNumericString), carry];
  }

  protected static decimalToBinary(decimal: TypeNumericString): string {
    let n = decimal;
    let bits = "";
    while (n !== "0") {
      const [q, r] = this.divmod2(n);
      bits = r.toString() + bits;
      n = q;
    }
    return bits === "" ? "0" : bits;
  }

  protected static twosComplement(bits: TypeBit[]): TypeInt64 | TypeInt32 {
    let flipped = bits.map((b) => (b === 0 ? 1 : 0)) as TypeBit[];
    let carry = 1;
    for (let i = flipped.length - 1; i >= 0; i--) {
      if (flipped[i] === 1 && carry === 1) {
        flipped[i] = 0;
        carry = 1;
      } else {
        flipped[i] = (flipped[i] + carry) as TypeBit;
        carry = 0;
      }
    }
    return flipped as TypeInt64 | TypeInt32;
  }

  /**
   * Multiply a decimal string by 2 and add a small digit (0 or 1).
   */
  private static mul2Add(
    decimal: TypeNumericString,
    bit: 0 | 1
  ): TypeNumericString {
    let carry = bit;
    let result = "";
    for (let i = decimal.length - 1; i >= 0; i--) {
      const d = decimal.charCodeAt(i) - 48;
      const prod = d * 2 + carry;
      result = (String.fromCharCode(48 + (prod % 10)) +
        result) as TypeNumericString;
      carry = Math.floor(prod / 10) as TypeBit;
    }
    if (carry > 0) result = (carry.toString() + result) as TypeNumericString;
    return result as TypeNumericString;
  }

  /**
   * Invert a two’s complement bit array and add 1 (for negatives).
   */
  private static twosComplementToPositive(bits: TypeBit[]): TypeBit[] {
    const inverted = bits.map((b) => (b === 0 ? 1 : 0)) as TypeBit[];
    let carry = 1;
    for (let i = inverted.length - 1; i >= 0; i--) {
      const sum = inverted[i] + carry;
      inverted[i] = (sum & 1) as TypeBit;
      carry = sum >> 1;
    }
    return inverted;
  }

  /**
   * Convert a two’s complement bit array into a signed decimal string.
   */
  protected static bitsToSignedDecimal(bits: TypeBit[]): TypeNumericString {
    const sign = bits[0];
    let absBits: TypeBit[];

    if (sign === 0) {
      absBits = bits;
    } else {
      absBits = NumberBase.twosComplementToPositive(bits);
    }

    // Convert binary (absBits) → decimal string
    let decimal = "0" as TypeNumericString;
    for (let i = 0; i < absBits.length; i++) {
      decimal = NumberBase.mul2Add(decimal, absBits[i]);
    }

    return sign === 1 && decimal !== "0"
      ? (("-" + decimal) as TypeNumericString)
      : decimal;
  }

  public getType() {
    return this.type;
  }

  public getOrder() {
    return this.order;
  }

  public getBits(): TypeInt32 | TypeInt64 {
    return this.bits.join("").split("") as unknown as TypeInt32 | TypeInt32;
  }

  public static add(num1: TypeNumber, num2: TypeNumber): TypeNumber {
    let [higherOrderNum, lowerOrderNum] =
      num1.getOrder() < num2.getOrder() ? [num2, num1] : [num1, num2];
    num2 = (lowerOrderNum as any)["to" + higherOrderNum.getType()]();
    num1 = higherOrderNum as any as Integer | Long | Double;
    let classInstance = this.classMap[num1.getType() as TypeNumberClassName];
    return classInstance.add(num1, num2);
  }

  public static subtract(num1: TypeNumber, num2: TypeNumber): TypeNumber {
    let [higherOrderNum, lowerOrderNum] =
      num1.getOrder() < num2.getOrder() ? [num2, num1] : [num1, num2];
    num2 = (lowerOrderNum as any)["to" + higherOrderNum.getType()]();
    num1 = higherOrderNum as any as Integer | Long | Double;
    let classInstance = this.classMap[num1.getType() as TypeNumberClassName];
    return classInstance.subtract(num1, num2);
  }
}
