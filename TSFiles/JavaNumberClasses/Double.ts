import { TypeInt64, TypeNumericString } from "../types";
import { Integer } from "./Integer";
import { Long } from "./Long";
import { NumberBase } from "../HelperClasses/NumberBase";

export class Double extends NumberBase {
  value: number;

  public constructor(decimal: TypeNumericString) {
    super();
    this.value = parseInt(decimal, 2);
    this.type = "Double";
    this.order = 2;
  }

  protected initializeBits(decimal: string): TypeInt64 {
    return "".padStart(64, "0").split("") as unknown as TypeInt64;
  }

  // Double → Long
  public toLong(): Long {
    const n = Math.trunc(this.value); // Java semantics: truncate toward zero
    return new Long(n.toString() as TypeNumericString);
  }

  // Double → Integer
  public toInteger(): Integer {
    const n = Math.trunc(this.value); // safe for 32-bit
    return new Integer(n.toString() as TypeNumericString);
  }

  public add(rawNum1: NumberBase, rawNum2: NumberBase): Double {
    let num1 = rawNum1 as Double;
    let num2 = rawNum2 as Double;
    return new Double((num1.value + num2.value + "") as TypeNumericString);
  }

  public subtract(rawNum1: NumberBase, rawNum2: NumberBase): Double {
    let num1 = rawNum1 as Double;
    let num2 = rawNum2 as Double;
    return new Double((num1.value - num2.value + "") as TypeNumericString);
  }
}
