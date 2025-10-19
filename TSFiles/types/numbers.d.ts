import type { Integer } from "JavaNumberClasses/Integer"
import type { Long } from "JavaNumberClasses/Long"
import type { Double } from "JavaNumberClasses/Double"

declare global {

	type Integer = InstanceType<typeof Integer>
	type Long = InstanceType<typeof Long>
	type Double = InstanceType<typeof Double>

  interface NumberBase<Self extends NumberBase<Self>> {
    add(num1: Self, num2: Self): Self;
    subtract(num1: Self, num2: Self): Self;
    getType(): "Integer" | "Long" | "Double";
    getOrder(): 0 | 1 | 2;
    getBits(): TypeInt32 | TypeInt64;
    toInteger(): Promise<Integer>;
    toLong(): Promise<Long>;
    toDouble(): Promise<Double>;
	}

  type TypeNumber =
    | Integer
    | Long
    | Double;
}