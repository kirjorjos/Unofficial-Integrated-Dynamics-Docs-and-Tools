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

  toDecimal(): TypeNumericString {
    return JavaMath.toDecimal(this.bits);
  }

  leftShift(num: Integer): Long {
    return new Long(JavaMath.leftShift(this.bits, parseInt(num.toDecimal())))
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

  // Booth's algorithm
  multiply(num: Long): Long {
    let a = [...this.bits] as TypeInt64;
    let b = [...num.getBits()] as TypeInt64;
    const sign = a[0]! ^ b[0]!;

    if (a[0]) {
      a = a.map(x => (x ^ 1) as TypeBit) as TypeInt64;
      a = JavaMath.bitwiseAdd(a, [...Array(63).fill(0), 1] as TypeInt64);
    }
    if (b[0]) {
      b = b.map(x => (x ^ 1) as TypeBit) as TypeInt64;
      b = JavaMath.bitwiseAdd(b, [...Array(63).fill(0), 1] as TypeInt64);
    }

    let result = new Array(128).fill(0) as TypeInt128;
    for (let i = 63; i >= 0; i--) {
      if (b[i]) {
        result = JavaMath.bitwiseAdd(result, (JavaMath.leftShift([...Array(64).fill(a[0]) as TypeInt64, ...a], 63-i)));
      }
    }
    
    if (sign) {
      result = result.map(x => (x ^ 1) as TypeBit) as TypeInt128;
      result = JavaMath.bitwiseAdd(result, [...Array(127).fill(0), 1] as TypeInt128);
    }

    return new Long(result);
  }
}

