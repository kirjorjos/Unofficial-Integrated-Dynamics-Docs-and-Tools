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
    toInteger(): Promise<Integer>;
    toLong(): Promise<Long>;
    toDouble(): Promise<Double>;
    toDecimal(): TypeNumericString;
    leftShift(num: Integer): Self;
    add(num: Self): Self;
    subtract(num: Self): Self;
    multiply(num: Self): Self;
    divide(num: Self): Self;
    max(num: Self): Promise<Self>;
    min(num: Self): Promise<Self>;
    mod(num: Self): Self;
    gt(num: Self): Promise<boolean>;
    lt(num: Self): Promise<boolean>;
    gte(num: Self): Promise<boolean>;
    lte(num: Self): Promise<boolean>;
    equals(num: Self): iBoolean;
    round(): Promise<Integer>;
    ceil(): Promise<Integer>;
    floor(): Promise<Integer>;
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
