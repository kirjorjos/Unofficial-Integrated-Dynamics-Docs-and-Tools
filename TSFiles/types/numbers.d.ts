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
    max(num: Self): Promise<Self>;
    min(num: Self): Promise<Self>;
    mod(num: Self): Self;
    gt(num: Self): Promise<boolean>;
    lt(num: Self): Promise<boolean>;
    gte(num: Self): Promise<boolean>;
    lte(num: Self): Promise<boolean>;
    equals(num: Self): boolean;
	}

  type TypeNumber =
    | Integer
    | Long
    | Double;
}