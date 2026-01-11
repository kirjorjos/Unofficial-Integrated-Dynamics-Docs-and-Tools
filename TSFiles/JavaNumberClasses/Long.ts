import { IntLongMath } from "HelperClasses/IntLongMath";
import { JavaMath } from "HelperClasses/Math";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Double } from "./Double";
import { Integer } from "./Integer";

export class Long implements NumberBase<Long> {
  private bits!: TypeInt64;

  constructor(
    data: TypeNumericString | TypeInt64 | TypeInt128 | number | Long
  ) {
    if (data instanceof Long) data = data.bits;
    if (!Array.isArray(data)) this.bits = this.initializeBits(data);
    if (Array.isArray(data)) this.bits = data.slice(-64) as TypeInt64;
  }

  initializeBits(decimal: TypeNumericString | number): TypeInt64 {
    return JavaMath.decimalToBinary(`${decimal}`, 64) as TypeInt64;
  }

  getBits(): TypeInt64 {
    return this.bits;
  }

  getType(): "Long" {
    return "Long";
  }

  getOrder(): 1 {
    return 1;
  }

  // Long → Integer
  toInteger(): Integer {
    const intBits = this.bits.slice(32) as TypeInt32; // low 32 bits
    return new Integer(intBits);
  }

  // Long → Double
  toDouble(): Double {
    const num = JavaMath.toDecimal(this.bits);
    return new Double(num);
  }

  toLong(): Long {
    return new Long(this.bits as TypeInt64);
  }

  toDecimal(): TypeNumericString {
    return JavaMath.toDecimal(this.bits);
  }

  leftShift(num: Integer): Long {
    return new Long(JavaMath.leftShift(this.bits, num.toJSNumber()));
  }

  add(num: Long): Long {
    return IntLongMath.add(this, num);
  }

  subtract(num: Long): Long {
    return IntLongMath.subtract(this, num);
  }

  multiply(num: Long): Long {
    return IntLongMath.multiply(this, num);
  }

  divide(num: Long): Long {
    return IntLongMath.divide(this, num);
  }

  mod(num: Long): Long {
    return IntLongMath.mod(this, num);
  }

  max(num: Long): Long {
    return this.gt(num) ? this : num;
  }

  min(num: Long): Long {
    return this.lt(num) ? this : num;
  }

  lt(num: Long): boolean {
    return IntLongMath.lt(this, num);
  }

  lte(num: Long): boolean {
    return IntLongMath.lte(this, num);
  }

  gt(num: Long): boolean {
    return IntLongMath.gt(this, num);
  }

  gte(num: Long): boolean {
    return IntLongMath.gte(this, num);
  }

  equals(num: IntegratedValue): iBoolean {
    if (!(num instanceof Long)) return new iBoolean(false);
    return new iBoolean(num.getBits().every((bit, i) => bit === this.bits[i]));
  }

  round(): Integer {
    return this.toInteger();
  }

  ceil(): Integer {
    return this.toInteger();
  }

  floor(): Integer {
    return this.toInteger();
  }

  getSignatureNode(): { type: "Long" } {
    return { type: "Long" };
  }

  toJSNumber(): number {
    return parseInt(JavaMath.toDecimal(this.bits));
  }
}
