import type { Integer } from "JavaNumberClasses/Integer";
import type { Long } from "JavaNumberClasses/Long";
import type { Double } from "JavaNumberClasses/Double";

declare global {
  type Integer = InstanceType<typeof Integer>;
  type Long = InstanceType<typeof Long>;
  type Double = InstanceType<typeof Double>;

  interface NumberBase<Self extends NumberBase<Self>> extends IntegratedValue {
    getType(): "Integer" | "Long" | "Double";
    getOrder(): 0 | 1 | 2;
    getBits(): TypeInt32 | TypeInt64;
    toInteger(): Integer;
    toLong(): Long;
    toDouble(): Double;
    toDecimal(): TypeNumericString;
    leftShift(num: Integer): Self;
    add(num: Self): Self;
    subtract(num: Self): Self;
    multiply(num: Self): Self;
    divide(num: Self): Self;
    max(num: Self): Self;
    min(num: Self): Self;
    mod(num: Self): Self;
    gt(num: Self): boolean;
    lt(num: Self): boolean;
    gte(num: Self): boolean;
    lte(num: Self): boolean;
    equals(num: Self): iBoolean;
    round(): Integer;
    ceil(): Integer;
    floor(): Integer;
    getSignatureNode(): { type: "Integer" | "Long" | "Double" };
  }

  type TypeNumber = Integer | Long | Double;

  type TypeDigitString = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
  type TypeBit = 0 | 1;
  type TypeInt4 = [TypeBit, TypeBit, TypeBit, TypeBit];
  type TypeInt8 = [...TypeInt4, ...TypeInt4];
  type TypeInt16 = [...TypeInt8, ...TypeInt8];
  type TypeInt32 = [...TypeInt16, ...TypeInt16];
  type TypeInt64 = [...TypeInt32, ...TypeInt32];
  type TypeInt128 = [...TypeInt64, ...TypeInt64];
}
