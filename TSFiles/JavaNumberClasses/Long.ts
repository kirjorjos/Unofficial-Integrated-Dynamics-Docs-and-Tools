import { IntLongMath } from "HelperClasses/IntLongMath";
import { JavaMath } from "HelperClasses/Math";

export class Long implements NumberBase<Long> {
  private bits!: TypeInt64;

  constructor(data: TypeNumericString | TypeInt64 | TypeInt128 | number) {
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
  toInteger(): Promise<Integer> {
    const intBits = this.bits.slice(32) as TypeInt32; // low 32 bits
    return import("./Integer").then((obj) => {
      return new obj.Integer(intBits);
    });
  }

  // Long → Double
  toDouble(): Promise<Double> {
    const num = JavaMath.toDecimal(this.bits);
    return import("./Double").then((obj) => {
      return new obj.Double(num);
    });
  }

  toLong(): Promise<Long> {
    return new Promise((resolve) => resolve(new Long(this.bits as TypeInt64)));
  }

  toDecimal(): TypeNumericString {
    return JavaMath.toDecimal(this.bits);
  }

  leftShift(num: Integer): Long {
    return new Long(JavaMath.leftShift(this.bits, parseInt(num.toDecimal())));
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

  async max(num: Long): Promise<Long> {
    return (await this.gt(num)) ? this : num;
  }

  async min(num: Long): Promise<Long> {
    return (await this.lt(num)) ? this : num;
  }

  async lt(num: Long): Promise<boolean> {
    return IntLongMath.lt(this, num);
  }

  async lte(num: Long): Promise<boolean> {
    return IntLongMath.lte(this, num);
  }

  async gt(num: Long): Promise<boolean> {
    return IntLongMath.gt(this, num);
  }

  async gte(num: Long): Promise<boolean> {
    return IntLongMath.gte(this, num);
  }

  equals(num: Long): boolean {
    return num.getBits().every((bit, i) => bit === this.bits[i]);
  }

  round(): Promise<Integer> {
    return this.toInteger();
  }

  ceil(): Promise<Integer> {
    return this.toInteger();
  }

  floor(): Promise<Integer> {
    return this.toInteger();
  }
}
