import type { Integer } from "JavaNumberClasses/Integer"
import type { Long } from "JavaNumberClasses/Long"
import type { Double } from "JavaNumberClasses/Double"

declare global {

	type Integer = InstanceType<typeof Integer>
	type Long = InstanceType<typeof Long>
	type Double = InstanceType<typeof Double>

  interface NumberBase<Self extends NumberBase<Self>> {
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
    max(num: Self): Self;
    min(num: Self): Self;
    mod(num: Self): Self;
    gt(num: Self): boolean;
    lt(num: Self): boolean;
    gte(num: Self): boolean;
    lte(num: Self): boolean;
	}

  type TypeNumber =
    | Integer
    | Long
    | Double;
}