import { IntLongMath } from "HelperClasses/IntLongMath";
import { JavaMath } from "HelperClasses/Math";
import { iBoolean } from "IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Long } from "./Long";
import { Double } from "./Double";

export class Integer implements NumberBase<Integer> {
  private bits!: TypeInt32;

  constructor(
    data:
      | TypeNumericString
      | TypeInt32
      | TypeInt64
      | TypeInt128
      | number
      | Integer
  ) {
    if (data instanceof Integer) data = data.bits;
    if (!Array.isArray(data)) this.bits = this.initializeBits(data);
    if (Array.isArray(data)) this.bits = data.slice(-32) as TypeInt32;
  }

  initializeBits(decimal: TypeNumericString | number): TypeInt32 {
    return JavaMath.decimalToBinary(`${decimal}`, 32) as TypeInt32;
  }

  getBits(): TypeInt32 {
    return this.bits;
  }

  getType(): "Integer" {
    return "Integer";
  }

  getOrder(): 0 {
    return 0;
  }

  // Integer → Long
  toLong(): Long {
    const sign = this.bits[0];
    const longBits = Array(32)
      .fill(sign as 0 | 1)
      .concat(this.bits) as TypeInt64;
    return new Long(longBits);
  }

  // Integer → Double
  toDouble(): Double {
    const num = JavaMath.toDecimal(this.bits);
    return new Double(num);
  }

  toInteger(): Integer {
    return new Integer(this.bits as TypeInt32);
  }

  toDecimal(): TypeNumericString {
    return JavaMath.toDecimal(this.bits);
  }

  leftShift(num: Integer): Integer {
    return new Integer(JavaMath.leftShift(this.bits, num.toJSNumber()));
  }

  add(num: Integer): Integer {
    return IntLongMath.add(this, num);
  }

  subtract(num: Integer): Integer {
    return IntLongMath.subtract(this, num);
  }

  multiply(num: Integer): Integer {
    return IntLongMath.multiply(this, num);
  }

  divide(num: Integer): Integer {
    return IntLongMath.divide(this, num);
  }

  mod(num: Integer): Integer {
    return IntLongMath.mod(this, num);
  }

  binaryAnd(num: Integer): Integer {
    return IntLongMath.binaryAnd(this, num);
  }

  binaryOr(num: Integer): Integer {
    return IntLongMath.binaryOr(this, num);
  }

  binaryXor(num: Integer): Integer {
    return IntLongMath.binaryXor(this, num);
  }

  binaryComplement(): Integer {
    return IntLongMath.binaryComplement(this);
  }

  rightShift(places: Integer) {
    return IntLongMath.rightShift(this, places);
  }

  unsignedRightShift(places: Integer) {
    return IntLongMath.unsignedRightShift(this.bits, places);
  }

  max(num: Integer): Integer {
    return this.gt(num) ? this : num;
  }

  min(num: Integer): Integer {
    return this.lt(num) ? this : num;
  }

  lt(num: Integer): boolean {
    return IntLongMath.lt(this, num);
  }

  lte(num: Integer): boolean {
    return IntLongMath.lte(this, num);
  }

  gt(num: Integer): boolean {
    return IntLongMath.gt(this, num);
  }

  gte(num: Integer): boolean {
    return IntLongMath.gte(this, num);
  }

  equals(num: IntegratedValue): iBoolean {
    if (!(num instanceof Integer)) return new iBoolean(false);
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

  getSignatureNode(): { type: "Integer" } {
    return { type: "Integer" };
  }

  toJSNumber(): number {
    return parseInt(JavaMath.toDecimal(this.bits));
  }
}
