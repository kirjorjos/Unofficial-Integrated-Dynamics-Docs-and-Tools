import { IntLongMath } from "HelperClasses/IntLongMath";
import { JavaMath } from "HelperClasses/Math";

export class Integer implements NumberBase<Integer> {

  private bits!: TypeInt32;

  constructor(data: TypeNumericString | TypeInt32 | TypeInt64 | TypeInt128 | number) {
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
    return "Integer"
  }

  getOrder(): 0 {
    return 0;
  }

  // Integer → Long
  toLong(): Promise<Long> {
    const sign = this.bits[0];
    const longBits = Array(32)
      .fill(sign as 0 | 1)
      .concat(this.bits) as TypeInt64;
    return import("./Long").then(obj => {return new obj.Long(longBits)});
  }

  // Integer → Double
  toDouble(): Promise<Double> {
    const num = JavaMath.toDecimal(this.bits);
    return import("./Double").then(obj => {return new obj.Double(num)});
  }

  toInteger(): Promise<Integer> {
    return new Promise(resolve => 
      resolve(new Integer(this.bits as TypeInt32))
    )
  }

  toDecimal(): TypeNumericString {
    return JavaMath.toDecimal(this.bits);
  }

  leftShift(num: Integer): Integer {
    return new Integer(JavaMath.leftShift(this.bits, parseInt(num.toDecimal())))
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

  async max(num: Integer): Promise<Integer> {
    return ((await this.gt(num) ? this : num));
  }

  async min(num: Integer): Promise<Integer> {
    return ((await this.lt(num) ? this : num));
  }

  async lt(num: Integer): Promise<boolean> {
    return IntLongMath.lt(this, num);
  }

  async lte(num: Integer): Promise<boolean> {
    return IntLongMath.lte(this, num);
  }

  async gt(num: Integer): Promise<boolean> {
    return IntLongMath.gt(this, num);
  }

  async gte(num: Integer): Promise<boolean> {
    return IntLongMath.gte(this, num);
  }

  equals(num: Integer): boolean {
    return (num.getBits().every((bit, i) => bit === this.bits[i]));
  }
}