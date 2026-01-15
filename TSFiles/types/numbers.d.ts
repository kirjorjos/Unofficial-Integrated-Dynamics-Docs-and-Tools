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
    toInteger(): Integer;
    toLong(): Long;
    toDouble(): Double;
    toString(): TypeNumericString;
    leftShift(num: Integer): Self;
    add(num: TypeNumber): TypeNumber;
    subtract(num: TypeNumber): TypeNumber;
    multiply(num: TypeNumber): TypeNumber;
    divide(num: TypeNumber): TypeNumber;
    max(num: TypeNumber): TypeNumber;
    min(num: TypeNumber): TypeNumber;
    mod(num: TypeNumber): TypeNumber;
    gt(num: TypeNumber): boolean;
    lt(num: TypeNumber): boolean;
    gte(num: TypeNumber): boolean;
    lte(num: TypeNumber): boolean;
    equals(num: Self): iBoolean;
    round(): Integer;
    ceil(): Integer;
    floor(): Integer;
    getSignatureNode(): { type: "Integer" | "Long" | "Double" };
    toJSNumber(): number;
  }

  type TypeNumber = Integer | Long | Double;
}
