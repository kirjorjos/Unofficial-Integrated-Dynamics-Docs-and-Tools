import { JavaMath } from "HelperClasses/Math";

export class Long implements NumberBase<Long> {

  bits!: TypeInt64;

  constructor(data: TypeNumericString | TypeInt64 | number) {
    if (!Array.isArray(data)) this.bits = this.initializeBits(data);
    if (Array.isArray(data)) this.bits = data;
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
    return import("./Integer").then(obj => {return new obj.Integer(intBits)});
  }

  // Long → Double
  toDouble(): Promise<Double> {
    const num = JavaMath.toDecimal(this.bits);
    return import("./Double").then(obj => {return new obj.Double(num)});
  }

  toLong(): Promise<Long> {
    return new Promise(resolve => 
      resolve(new Long(this.bits as TypeInt64))
    )
  }

  add(num: Long): Long {
    const a = num.getBits() as TypeInt64;
    const b = this.getBits() as TypeInt64;
    const result = JavaMath.bitwiseAdd(a, b);
    return new Long(result);
  }

  subtract(num: Long): Long {
    const a = num.getBits() as TypeInt64;
    let b = this.getBits() as TypeInt64;
    b = b.map((x: number) => x ^ 1) as TypeInt64;
    const bPlus1 = JavaMath.bitwiseAdd(b, [
      ...Array(31).fill(0),
      1,
    ] as unknown as TypeInt64);
    return new Long(JavaMath.bitwiseAdd(a, bPlus1));
  }
}

