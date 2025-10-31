import { JavaMath } from "HelperClasses/Math";

export class Integer implements NumberBase<Integer> {

  bits!: TypeInt32;

  constructor(data: TypeNumericString | TypeInt32 | number) {
    if (!Array.isArray(data)) this.bits = this.initializeBits(data);
    if (Array.isArray(data)) this.bits = data;
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

  add(num: Integer): Integer {
    const a = num.getBits() as TypeInt32;
    const b = this.getBits() as TypeInt32;
    const result = JavaMath.bitwiseAdd(a, b);
    return new Integer(result);
  }

  subtract(num: Integer): Integer {
    const a = num.getBits() as TypeInt32;
    let b = this.getBits() as TypeInt32;
    b = b.map((x: number) => x ^ 1) as TypeInt32;
    const bPlus1 = JavaMath.bitwiseAdd(b, [
      ...Array(31).fill(0),
      1,
    ] as unknown as TypeInt32);
    return new Integer(JavaMath.bitwiseAdd(a, bPlus1));
  }
}