import { JavaMath } from "HelperClasses/Math";

export class Integer implements NumberBase<Integer> {

  private bits!: TypeInt32;

  constructor(data: TypeNumericString | TypeInt32 | TypeInt64 | number) {
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

  // Booth's algorithm
  multiply(num: Integer): Integer {
    let a = [...this.bits] as TypeInt32;
    let b = [...num.getBits()] as TypeInt32;
    const sign = a[0]! ^ b[0]!;

    if (a[0]) {
      a = a.map(x => (x ^ 1) as TypeBit) as TypeInt32;
      a = JavaMath.bitwiseAdd(a, [...Array(31).fill(0), 1] as TypeInt32);
    }
    if (b[0]) {
      b = b.map(x => (x ^ 1) as TypeBit) as TypeInt32;
      b = JavaMath.bitwiseAdd(b, [...Array(31).fill(0), 1] as TypeInt32);
    }

    let result = new Array(64).fill(0) as TypeInt64;
    for (let i = 31; i >= 0; i--) {
      if (b[i]) {
        result = JavaMath.bitwiseAdd(result, (JavaMath.leftShift([...Array(32).fill(a[0]) as TypeInt32, ...a], 31-i)));
      }
    }
    
    if (sign) {
      result = result.map(x => (x ^ 1) as TypeBit) as TypeInt64;
      result = JavaMath.bitwiseAdd(result, [...Array(63).fill(0), 1] as TypeInt64);
    }

    return new Integer(result);
  }
}